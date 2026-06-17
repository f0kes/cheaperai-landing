# cheaperAI — Client Acquisition / Outreach Pipeline

The highest-signal leads are **people already in pain** (complaining about API bills) and **companies already building on LLMs** (so they have spend to cut). Build a 3-layer pipeline: signals → enrichment → outreach.

## Signal sources (ranked by signal quality)

### A. Complaint mining (warmest — they self-declared the pain)
- Twitter/X advanced search: `"openai bill" OR "anthropic invoice" OR "token cost" OR "API spend" min_faves:5 lang:en` — run daily, dump to a sheet.
- Reddit API: `r/LocalLLaMA`, `r/OpenAI`, `r/SaaS`, `r/MachineLearning` — search titles/comments for "bill", "expensive", "cost", "cheap alternative". Sort by recency. These subs are full of eng leads venting.
- Hacker News: scrape `Ask HN` + comments for cost complaints; also the monthly "Who is hiring" threads (companies hiring LLM engineers = spending on LLMs).

### B. GitHub Code Search (best technical signal — proves they ship LLM code)
Use the GitHub code-search API (GraphQL) for:
- `import openai` / `from anthropic` / `import { Anthropic }` in repos
- `anthropic.messages.create` / `openai.chat.completions` (proves real usage, not a tutorial)
- Filter: org-owned repos (not personal), pushed in last 90 days, >5 contributors, has a `package.json`/`requirements.txt` suggesting production
- Cross-reference the org's domain → that's your target company. Engineering-led companies have public repos; this catches startups agencies miss.

### C. Job-post scraping (companies scaling = spend scaling)
- Wellfound (AngelList), YC "Work at a Startup", LinkedIn, Homerun. Grep postings for `GPT-4`, `Claude`, `RAG`, `function calling`, `LangChain`, `customer support bot`, `agent`. A company hiring its 2nd AI engineer is about to 5x its token bill — perfect timing.
- These postings often name the stack ("we use GPT-4o for X") — that's your qualification data for free.

### D. Live AI-feature detection
- BuiltWith / Wappalyzer API: detect sites running Intercom AI, custom chat widgets, Dialogflow, Voiceflow. A support page with an AI chatbot = a measurable token faucet.
- Crawl the site's chatbot, characterize it (does it do RAG? tools?), estimate volume from SimilarWeb traffic × conversation rate.

### E. ProductHunt + recent launches
- Anything launched in "AI" in the last 60 days with traction. They're burning runway on tokens and haven't optimized yet.

## Enrichment layer
For each signal hit, enrich (Apollo.io, Clay, Clearbit, or just `curl` their `/about` + LinkedIn):
- Domain, headcount, funding stage, tech stack
- Eng lead / founder / CTO email (Apollo is cheapest for this)
- **Estimate monthly LLM spend** with a crude model: `monthly_visits × conversation_rate × avg_tokens × blended_rate`. Even a ±50% estimate lets you rank leads and write a credible opener.

## Outreach (the benchmark IS the pitch)
Don't send generic "we save you money" emails. Send a **mini-audit**:
> "Ran your support bot's public transcripts through 4 open-source models. DeepSeek V3 + our parser matched GPT-4o on 94% of cases at 1/14 the cost — that's ~$3.2k/mo at your volume. Full table + failure cases attached. Want the harness?"

This is why building the benchmark harness is step zero — it's both your product demo *and* your cold-outreach asset. Inbound (the calculator producing a real report) and outbound (the mini-audit email) share the same engine.

## The one shortcut
If you do nothing else: **scrape r/LocalLLaMA + r/OpenAI + X complaints for one week**, enrich the ones that look like companies (not hobbyists), and email each a personalized mini-audit. 10 hours of work, highest-converting channel for this exact offer. Gateways can't compete with someone who shows up with the other person's actual numbers.
