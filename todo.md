# cheaperAI — Landing Page Pivot TODO

Pivot from "we pick a cheaper model" (commodity) to "we guarantee quality on your traffic and share the savings" (productized service). Rebuild the landing page around proof, monitoring, and honest pricing.

## Hero
- [ ] Single-vertical headline: "Cut your support-bot LLM bill by 70%. Quality guaranteed — or we pay the difference."
- [ ] Subhead: continuous eval + auto-rollback · open-source eval harness · % of savings pricing
- [ ] Pick ONE vertical for the hero (support bots first)

## Section 1 — Benchmark table (replaces hero fiction)
- [ ] One honest, reproducible table: 1,000 real transcripts × N models
- [ ] Columns: quality score, cost, p95 latency
- [ ] Cite the dataset + method
- [ ] No sliders in the hero — proof first

## Section 2 — How it works (3 steps, not "3 plans")
- [ ] Step 1: Shadow-run your traffic on cheaper models alongside your current one
- [ ] Step 2: Eval every response against your quality bar; below threshold auto-falls back to frontier model
- [ ] Step 3: Pay % of measured savings. No fallback cost to you
- [ ] Remove the old three-plan card layout entirely

## Section 3 — Honest calculator (kept, downgraded)
- [ ] Keep the sliders
- [ ] Rates cite a source + date (no hardcoded constants)
- [ ] Output is a range, not a single number ("$2.1k–$4.3k/mo saved")
- [ ] Add quality-risk band per recommended model (safe / monitor / risky)
- [ ] "Export to report" button turns slider state into the lead-gen payload

## Section 4 — Open-source trust wedge
- [ ] Copy: "The eval harness is open-source. Read it, run it on your data, then decide."
- [ ] Link to the repo
- [ ] Position as moat vs. gateways + developer trust in one move

## Section 5 — Lead form (thicker qualification)
- [ ] Fields: company, current monthly spend, region, hosting constraints (self-host / GPU cloud / BYO keys), use-case description
- [ ] Wire to a real backend (replace the fake setTimeout)
- [ ] Output: a real, sourced optimization report — not a fake confirmation

## Footer / trust
- [ ] Real contact address (not founders@ Gmail-style)
- [ ] Real GitHub / Twitter links (not bare https://github.com/)
- [ ] Privacy policy
- [ ] Terms
- [ ] Keep "We count every token" tagline

## P0 (do first, in order)
1. [ ] Add one real benchmark table
2. [ ] Make the calculator cite live rates + show quality-risk band
3. [ ] Wire the form to a real backend + collect spend/region/hosting
4. [ ] Add "continuous monitoring / auto-rollback" tier to the messaging
5. [ ] Pick one vertical and rewrite the hero around it
