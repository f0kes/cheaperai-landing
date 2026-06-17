# cheaperAI — Review

I read the full project: `prompt.md` (concept), the Svelte landing page (Nav, Hero, Calculator, SellingPoints, LeadGen, Footer), and `src/lib/calc.js` (pricing logic). Here's an honest take on both the **business idea** and the **landing page execution**.

---

## What the business actually is

A "routing layer" / consultancy that replaces a customer's Claude/ChatGPT API calls with cheaper open-source models (DeepSeek, GLM, etc.), keeping quality via prompt engineering + parsers, and picking the right model per task. Monetization seems to be: **lead gen → custom optimization report → (presumably) managed routing or a paid engagement.**

Important caveat: the repo is a **landing page only**. There is no routing engine, no model benchmarking, no token accounting backend. The lead form is a fake `setTimeout(600)` that pretends to send. So the "product" doesn't exist yet — this is a positioning test / demand-capture site.

---

## Pros

### Business / concept
1. **Real, sharp pain point.** LLM API spend is a top-3 complaint of anyone shipping agents/RAG in 2025-2026. Cost optimization is one of the few AI infra niches where buyers actively want to talk to you.
2. **Strong timing.** Open-source models (DeepSeek V3/R1, GLM 4.6, Qwen, Llama) genuinely reached near-parity on many tasks. The "swap the model, keep the quality" pitch is now defensible, not hypothetical.
3. **Clear, quantifiable value prop.** "Cut your bill by 80%" is a hard number you can prove with the calculator — exactly the kind of messaging that converts engineers/CTOs.
4. **The calculator is the right core asset.** An interactive, reactive savings calculator is far more convincing than a feature grid. It doubles as a qualification tool (you learn their volume + tasks before the call).
5. **"We pick the model per task using quantitative metrics"** is a defensible moat *if true* — it positions you as the expert, not a reseller. The SellingPoints copy ("You own the model. We own the routing.") is genuinely good.
6. **Provider-independence angle** is a real strategic sell: de-risking vendor lock-in / price hikes / outages resonates with procurement and infra teams.
7. **No capital-intensive moat to start.** No model training, no GPU fleet — it's an integration/consulting/routing play. Low burn to validate.

### Landing page execution
- Design language is on-point for the developer-SaaS audience: dark mode, emerald accent, JetBrains Mono for numbers, terminal-style lead form. Matches Vercel/Linear/Supabase aesthetic exactly as specified.
- Calculator is genuinely reactive and the plan-recommendation logic in `calc.js` is non-trivial (tolerance tiers, tools escalation, volume gating) — it feels considered, not faked.
- Editable rates on plan cards (with reset) is a smart touch — it preempts "but your rate is wrong" objections.
- Copy is tight and engineer-targeted ("We're engineers, not salespeople", "We count every token"). Good tone fit.

---

## Cons / Weaknesses

### Business
1. **No defensible tech moat as described.** "Prompt engineering + catch-all parsers + pick-the-right-model" is know-how, not IP. The moment OpenRouter, Portkey, Braintrust, or a managed LLM gateway bundles this, your edge shrinks. Routers (OpenRouter, Helicone, Cloudflare AI Gateway) are already converging on cost-aware routing.
2. **"Quality on par" is the entire risk surface.** This is the line every cost-optimization vendor says, and it's where deals die. For customer support / RAG / function-calling, even small quality regressions cause real damage (wrong refunds, hallucinated policy answers). You're selling cost savings against *quality risk you absorb* — that's a hard SLA to write.
3. **Open-source models are closing the price gap themselves.** DeepSeek's API is already absurdly cheap; Anthropic/OpenAI are shipping cheap tiers (Haiku, GPT-4o-mini, Gemini Flash). If the incumbents keep cutting, your delta shrinks. The pitch depends on a persistent price gap.
4. **Unclear revenue model.** Landing page implies "free report" then… what? Managed service? SaaS seat? Margin on routed tokens? % of savings? Without this, the page converts curiosity but not money. The form collects zero info about willingness-to-pay.
5. **Compliance/PII gap not addressed.** Many customers use Claude/GPT precisely because of the enterprise data terms. Routing to open-source models hosted "where"? Self-hosted? Third-party GPU clouds? That's a procurement blocker the page doesn't touch — and it's often the *real* reason people pay premium rates.
6. **"Bring your own keys or use ours"** is mentioned but unresolved — it's two very different businesses (consulting vs. infrastructure).
7. **No proof / no logos / no case study.** A cost-savings pitch with no named customer or before/after benchmark reads as aspirational. Engineers will want to see a benchmark table, not a slider.

### Landing page execution
1. **The "savings" number is a turnkey fiction.** Rates are hardcoded constants (`chatgpt: 15.0`, `flash: 0.27`). Real rates fluctuate daily and depend on cached vs. uncached, vision, batching. An engineer who knows current pricing will instantly smell that the numbers are stale/rounded, which undermines trust in the *one asset* meant to build trust.
2. **`pickPlan` logic is hand-tuned heuristics**, not "quantitative metrics." If a sophisticated buyer reads the calculator, the recommendation ("high tolerance → Pro") is obviously a rule tree, not a benchmark. It may over-promise the sophistication of the actual service.
3. **Lead form collects too little to qualify.** Just `description` + `email`. No company size, current monthly spend, region, hosting constraints. You'll get noise with the signal. The "free optimization report" promise also creates a manual labor commitment per lead — fine at low volume, a trap at scale.
4. **No privacy policy, no terms, no real contact address** beyond a Gmail-style `founders@cheaperAI.com`. Github/Twitter links are empty (`https://github.com/`). For a B2B trust play, these gaps read as "not real company yet."
5. **No analytics, no backend, no email capture to a CRM.** Submissions go nowhere. The `dist/` is committed but there's no deploy config (Vercel/Netlify/CF Pages). It's a static artifact, not a shipped funnel.
6. **Accessibility gaps:** toggle and pills are `aria-pressed` (good) but the toggle is a `<button>` with no `role="switch"`; the savings odometer and typed-text aren't announced; color (emerald) is the only differentiator on the recommended card.
7. **Mobile layout is decent but the hero "typed" badge reserves `min-width: 13ch`** which can cause horizontal overflow on very narrow screens with the subtitle wrapping.

---

## Risks (ranked)

1. **Quality-regression liability (highest).** A single bad routing decision on a customer-support bot (wrong refund amount, leaked PII via parser failure) becomes *your* incident. You have no quality-monitoring story on the page and presumably none built yet.
2. **Commoditization by gateways.** OpenRouter, Portkey, Helicone, and the model providers themselves are racing toward exactly this. You're selling a layer the platforms want to own. Window is maybe 12–24 months before "cost-aware routing" is a checkbox in every gateway.
3. **Price-gap erosion.** If Anthropic/OpenAI/Google keep dropping mini-tier prices, the 80% headline becomes 40%, then 20%. Your marketing is built on a delta you don't control.
4. **Hosting/compliance unknowns.** Open-source ≠ self-hosted. If you route through a third-party GPU cloud, customers' DPA/SOC2/HIPAA obligations kick in. Not addressing this = lost enterprise deals.
5. **Support burden as a service.** Parsers break when models update; open-source models change behavior between releases. "We own the routing" = "we own the breakage at 3am." This is an operational treadmill, not set-and-forget.
6. **Misleading calculator → reputational risk.** If a prospect plugs in real numbers, gets "$4,250/mo savings," and the actual migration yields 30%, you've burned trust at the moment of highest intent. The calculator should show *ranges* and cite sources, not a single confident figure.
7. **Single-founder / no-team signal.** "founders@cheaperAI.com" + empty socials + no case studies = looks like a side project. B2B buyers route to side projects last.

---

## Possible advantages / strategic moves

- **Lead with a benchmark, not a slider.** Publish a transparent, reproducible table: "On 1,000 real customer-support transcripts, DeepSeek V3 + our parser matched GPT-4o at 94% quality, 1/18 cost." One real table > any calculator. It's also defensible: gateways won't publish your vertical-specific evals.
- **Verticalize.** "cheaperAI for support bots," "cheaperAI for RAG." General routing is a commodity; vertical-specific parsers + evals are not. Pick one niche, own its quality bar, expand.
- **Sell the monitoring, not just the swap.** The recurring-revenue, moat-building version of this business is "continuous eval + auto-rollback": you run their traffic through the cheap model, shadow-score against a frontier model, and auto-fallback on quality dips. That's a product gateways won't build well and enterprises will pay for. The page should pitch *this*, not just "we pick a model."
- **Charge % of savings, not a SaaS seat.** Aligns incentives, removes pricing friction, and is defensible because you're sharing real measured savings (you need metering anyway). The calculator already teases this number.
- **Make the calculator honest and it becomes your best salesperson.** Add a "source" footnote per rate, a quality-confidence band ("safe / monitor / risky"), and an export-to-report button that turns the slider state into the lead-gen payload. Closes the qualification gap.
- **Self-hosting/finetuning upsell.** Once routing is validated, the natural next tier is "we'll fine-tune a 7B on your traffic and host it — 1/50th the cost." That's where margin and moat actually live; the current page doesn't hint at it.
- **Open-source the parser/eval harness.** Counterintuitive but strong: open-source the catch-all parsers and the per-task eval suite, keep the managed routing + dashboards closed. Developers trust what they can read; it becomes a top-of-funnel moat against the gateways.

---

## Bottom line

**As a business thesis:** B+ idea, real pain, right timing, but currently a *positioning* play with no moat and an unaddressed quality/liability core. The window before gateways commoditize this is short. Survival depends on moving from "we pick a cheaper model" (commodity) to "we guarantee quality on your traffic and share the savings" (productized service).

**As a landing page:** A-/B+ execution — the design and copy are genuinely good and on-audience, the calculator is the right centerpiece, but it's undermined by (a) hardcoded/fictional pricing, (b) no proof/case studies, (c) a fake submission with no backend, (d) no compliance story, and (e) a qualification form too thin to feed a real sales process. It's a strong *demo* of the pitch, not yet a *funnel* for the business.

Highest-leverage fixes, in order:
1. add one real benchmark table,
2. make the calculator cite live rates + show a quality-risk band,
3. wire the form to a real backend + collect spend/region/hosting,
4. add a "continuous monitoring / auto-rollback" product tier to the messaging,
5. pick one vertical and rewrite the hero around it.
