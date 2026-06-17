# cheaperAI — Eval Harness + Benchmark Table Guide

## What you already have (and how it maps)

| Your asset | Role in the benchmark |
|---|---|
| Modular openrouter script | Multi-model runner — same prompt → N models ✓ |
| Catch-all parsers | Robustness layer — score *parse success* per model ✓ |
| Token counter/limiter | Cost computation — exact tokens × rate ✓ |
| Looping agent script | Eval driver — iterate over the dataset, retry on parse fail ✓ |

## What you're missing (the actual work)
1. **A quality scorer** — the one gap. Without it you only have "did it parse", not "was it good".
2. **A dataset** — real or representative traffic.
3. **An aggregation + reporting layer** — turns runs into the table.
4. **Statistical rigor** — variance, CIs, failure examples (not just means).

## The quality scorer (pick one, in order of honesty)
- **For structured tasks** (extraction, classification, function-calling args): exact-match / F1 / JSON-schema validity against a gold answer. Cheap, objective, no judge bias. Use this wherever possible — it's your most defensible number.
- **LLM-as-judge** for free-text tasks (support replies, creative): send `(prompt, model_output, reference_output)` to a strong frontier model (Claude Opus / GPT-4o) with a rubric, get a 0–5 score. Document the judge model + rubric + temperature in the table footer. Always include a **reference/baseline output** so the judge scores relative to the incumbent, not in a vacuum.
- **Human spot-check** on ~50 random samples per model to calibrate the judge. Cite inter-annotator agreement if you can. This is what separates "marketing table" from "credible table".

## The dataset
- **Ideal:** the client gives you 500–2k anonymized real prompts + their current model's outputs as the gold reference. Sign an NDA first (have a 1-page MSA/NDA template ready — this is the legal prep for client #1).
- **If they won't share yet:** build a *proxy dataset* — 200 hand-written prompts representative of their bot's task mix (use their public docs/FAQ as source material). Label it clearly as "proxy, not your traffic" in the report. This is what you send in the cold-audit email.

## Eval harness — concrete structure
```
eval/
  datasets/
    client_acme.jsonl          # {id, prompt, gold_answer, task_type}
  runners/
    openrouter_runner.py       # your existing script, wrapped: input -> raw output + usage
  parsers/
    catchall.py                # your existing parsers, return {parsed, ok, error}
  scorers/
    exact_match.py             # for structured tasks
    llm_judge.py               # rubric + frontier judge
  cost.py                      # tokens (from your counter) × rate -> $
  aggregate.py                 # per-model: mean score, p50/p95 cost, parse_rate, CIs
  report.py                    # -> markdown table + failure samples
```

Run pipeline per model: `prompt → runner → parser → scorer → (tokens, score, ok)` → `aggregate` → `report`. Seed everything, temperature=0 for reproducibility, log raw outputs for audit.

## The clean benchmark table — what it must contain

| Model | Quality (vs GPT-4o) | Parse success | Cost / 1M tok (in/out) | Avg cost / req | p95 latency | Failures (n) |
|---|---|---|---|---|---|---|
| GPT-4o (baseline) | 100% | 100% | $2.50/$10.00 | $0.014 | 2.1s | — |
| Claude Sonnet | 99.2% | 100% | $3/$15 | $0.016 | 2.4s | 4 |
| DeepSeek V3 + parser | 94.1% | 98.4% | $0.27/$1.10 | $0.0011 | 3.1s | 23 |
| GLM 4.6 + parser | 91.7% | 97.1% | … | … | … | 41 |

### Footer (the honesty layer — this is what makes it credible, not marketing)
- Dataset: N=1,000 prompts, source (client traffic / proxy), task mix.
- Judge: `claude-opus-4`, rubric v1.2, temperature 0, link to rubric.
- Cost rates: as of YYYY-MM-DD, source = openrouter.ai/pricing.
- Parse failures included in quality score as 0 (worst case), not dropped.
- 95% CI on quality score shown (±X%).
- Failure examples: 5 representative bad outputs per model, linked.
- Reproducibility: commit hash, seeds, `make reproduce` command.

## First-client deliverables checklist
1. **1-page NDA + 1-page MSA** (use a template — don't lawyer it to death pre-revenue).
2. **The eval harness above**, runnable on their data within a day of signing.
3. **A report template** (the table + a 1-page narrative: recommended model, expected savings range, migration sketch, monitoring plan).
4. **A monitoring/rollback sketch** — even if not built, a 1-pager: "we shadow-run, score, auto-fallback on quality dip below threshold T". This is the tier-2 upsell and the moat.
5. **A pricing model** — % of measured savings (e.g., 20% of delta, first 30 days free to prove it). Have the number ready.
6. **A "bring your own keys vs. we route" decision doc** — two integration paths, one paragraph each, so the client can pick in the first call.
7. **A live demo** — run the harness on a synthetic dataset *during* the sales call, show the table populate. This is what closes.

## The honest rule that makes it all work
**Never publish a single savings number.** Publish a range with a quality-risk band. "DeepSeek V3: 88–96% quality vs baseline, $2.1k–$4.3k/mo saved at your volume, **monitor** risk tier (auto-fallback recommended for 12% of traffic)." One sentence like that beats any slider — and it's the thing gateways can't fake because they don't have your vertical evals.
