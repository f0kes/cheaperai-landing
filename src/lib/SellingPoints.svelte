<script>
  const points = [
    {
      title: 'Provider independence',
      body: 'No single model owns your stack. If a provider raises prices, rate-limits you, or goes down, we reroute to an equivalent open-source model the same hour — your prompts and parsers are portable, not locked to one vendor.',
    },
    {
      title: 'Switch at any time',
      body: "Don't like how a model behaves on your traffic? Flip it. We keep a quality baseline per task, so promoting a smarter model or dropping to a cheaper one is one toggle — no rewrite, no migration sprint.",
    },
    {
      title: 'Newest models, the day they ship',
      body: 'New open-source model drops? It\'s benchmarked against your workload and offered in your dashboard within days. You get frontier-tier quality at open-source prices without ever touching an integration again.',
    },
  ];
</script>

<section id="why" class="section full-height">
  <div class="container inner">
    <div class="eyebrow">// why cheaperAI</div>
    <h2 class="section-title">You own the model. We own the routing.</h2>
    <p class="section-sub">
      We're not a model provider — we're the intelligence layer that picks, swaps, and parses.
      Bring your own keys or use ours. Either way the savings stay yours.
    </p>

    <div class="rows">
      {#each points as p, i (p.title)}
        <div class="row" class:flip={i % 2 === 1}>
          <div class="head-cell">
            <h3 class="head">{p.title}</h3>
          </div>
          <div class="cell body-cell">
            <p>{p.body}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .full-height {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 80px 0;
  }
  .inner { width: 100%; }
  .rows {
    display: flex;
    flex-direction: column;
    gap: 0;
    border-top: 1px solid var(--border);
  }
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
    padding: 54px 0;
    border-bottom: 1px solid var(--border);
  }
  /* alternate: even rows keep order, odd rows flip */
  .row.flip .head-cell { order: 2; text-align: left; }
  .row.flip .body-cell { order: 1; }

  .cell { min-width: 0; }
  .head-cell {
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-align: right;
  }
  .row.flip .head-cell { text-align: left; }

  .head {
    font-size: clamp(26px, 4vw, 42px);
    font-weight: 800;
    color: var(--accent);
    letter-spacing: -0.02em;
    line-height: 1.1;
  }
  .body-cell p {
    color: var(--text-dim);
    font-size: 17px;
    line-height: 1.65;
    max-width: 520px;
  }
  .row:not(.flip) .body-cell { margin-left: auto; }
  .row.flip .body-cell p { margin-left: 0; margin-right: auto; }

  @media (max-width: 760px) {
    .row {
      grid-template-columns: 1fr;
      gap: 14px;
    }
    .row.flip .head-cell,
    .head-cell { order: 1 !important; text-align: left !important; }
    .row.flip .body-cell,
    .body-cell { order: 2 !important; }
    .row:not(.flip) .body-cell { margin-left: 0; }
  }
</style>
