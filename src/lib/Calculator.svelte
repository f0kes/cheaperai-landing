<script>
  import { fly } from 'svelte/transition';
  import Counter from './Counter.svelte';
  import EditableNumber from './EditableNumber.svelte';
  import {
    PLANS, TASKS, pickPlan, monthlyCost, findCurrentModel, CURRENT_MODELS,
  } from './calc.js';

  let tokens = $state(5000000); // tokens / month
  let currentModelId = $state('chatgpt');
  let tools = $state(true);
  let selectedTaskIds = $state(new Set(['support', 'extract']));

  // user can override any plan's $/1M rate via the editable number
  let customRates = $state({}); // id -> rate

  const selectedTasks = $derived(TASKS.filter(t => selectedTaskIds.has(t.id)));
  const currentModel = $derived(findCurrentModel(currentModelId));

  // effective rate per plan (custom override if set, else plan default; current uses selected model)
  const rateFor = $derived((plan) => {
    if (customRates[plan.id] != null) return customRates[plan.id];
    if (plan.id === 'current') return currentModel.rate;
    return plan.rate;
  });

  const baselineCost = $derived(monthlyCost(rateFor(PLANS[0]), tokens));
  const recommended = $derived(pickPlan({ selectedTasks, tools, tokens }));
  const recommendedCost = $derived(monthlyCost(rateFor(recommended), tokens));
  const savings = $derived(Math.max(0, baselineCost - recommendedCost));
  const savingsPct = $derived(
    baselineCost > 0 ? Math.round((savings / baselineCost) * 100) : 0
  );

  function toggle(id) {
    const next = new Set(selectedTaskIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    selectedTaskIds = next;
  }

  function fmtTokens(n) {
    if (!isFinite(n) || n < 0) n = 0;
    if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
    if (n >= 1e3) return Math.round(n / 1e3) + 'K';
    return String(Math.round(n));
  }

  function fmtCost(n) {
    if (!isFinite(n) || n < 0) n = 0;
    return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  function fmtRate(r) {
    return `$${r.toFixed(2)}/1M`;
  }
  function parseRate(s) {
    const n = parseFloat(s.replace(/[^\d.]/g, '')) || 0;
    return n;
  }
  function setRate(id, v) {
    customRates = { ...customRates, [id]: v };
  }
  function resetRate(id) {
    const { [id]: _, ...rest } = customRates;
    customRates = rest;
  }
</script>

<section id="calculator" class="section calc-section">
  <div class="container">
    <div class="top-row">
      <div class="header-col">
        <div class="eyebrow">// the core</div>
        <h2 class="section-title">Calculator + plans</h2>
        <p class="section-sub">
          Drag the slider or type a value. Pick your tasks. Watch the recommended model update in real
          time — and see exactly how much you save per month versus your current API.
        </p>
      </div>
      <div class="save-hero" class:dimmed={savings <= 0}>
        <div class="save-hero-label">you save vs {currentModel.label}</div>
        <div class="save-hero-value">
          $<Counter value={savings} /><span class="save-hero-unit">/mo</span>
        </div>
        <div class="save-hero-pct">↓ {savingsPct}% on this workload</div>
      </div>
    </div>

    <div class="grid">
      <!-- LEFT: Calculator -->
      <div class="calc-panel">
        <div class="panel-head">
          <span class="panel-label">inputs</span>
          <span class="panel-tag">live</span>
        </div>

        <!-- tokens / month: editable number + slider -->
        <div class="field">
          <div class="field-top">
            <label for="f-tokens">Tokens spent / month</label>
            <span class="num">
              <EditableNumber
                bind:value={tokens}
                format={fmtTokens}
                parse={(s) => {
                  let v = parseFloat(s.replace(/[^\d.]/g, '')) || 0;
                  const up = s.toLowerCase();
                  if (up.includes('b')) v *= 1e9;
                  else if (up.includes('m')) v *= 1e6;
                  else if (up.includes('k')) v *= 1e3;
                  return v;
                }}
                placeholder="5M"
                ariaLabel="Tokens per month"
              />
            </span>
          </div>
          <input id="f-tokens" type="range" min="100000" max="1000000000" step="100000" bind:value={tokens} />
          <div class="range-meta"><span>100K</span><span>1B</span></div>
          <div class="hint">Tip: type <code>5M</code>, <code>2.5B</code> or <code>750000</code> — the value syncs with the slider.</div>
        </div>

        <!-- current model -->
        <div class="field">
          <div class="field-top">
            <label for="f-model">Model used today</label>
            <span class="num">{fmtRate(currentModel.rate)}</span>
          </div>
          <select id="f-model" bind:value={currentModelId}>
            {#each CURRENT_MODELS as m (m.id)}
              <option value={m.id}>{m.label}</option>
            {/each}
          </select>
          <div class="hint">The expensive baseline we replace. Rate is editable on the plan card →</div>
        </div>

        <!-- tools toggle -->
        <div class="field toggle-field">
          <div class="toggle-info">
            <label for="f-tools">Tools executed</label>
            <span class="hint">Function calling / tool-use overhead</span>
          </div>
          <button id="f-tools" class="switch" class:on={tools} onclick={() => tools = !tools} aria-pressed={tools} aria-label="Toggle tools executed">
            <span class="knob"></span>
          </button>
        </div>

        <!-- task pills -->
        <div class="field">
          <span class="block-label">Tasks the bot performs</span>
          <div class="pills">
            {#each TASKS as task (task.id)}
              <button
                class="pill"
                class:on={selectedTaskIds.has(task.id)}
                onclick={() => toggle(task.id)}
                aria-pressed={selectedTaskIds.has(task.id)}
              >
                {task.label}
              </button>
            {/each}
          </div>
        </div>

        <div class="token-readout">
          <div class="tr-label">your monthly spend today</div>
          <div class="tr-value">${fmtCost(baselineCost)}</div>
          <div class="tr-bar">
            <div class="tr-bar-fill" style="width: {Math.min(100, (tokens / 1e9) * 100)}%"></div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Plans -->
      <div class="plans-panel">
        <div class="panel-head">
          <span class="panel-label">plans</span>
          <span class="panel-tag accent">recommended updates live</span>
        </div>

        <div class="plans-list">
          {#each PLANS as plan (plan.id)}
            {@const rate = rateFor(plan)}
            {@const isRec = plan.id === recommended.id}
            {@const isCurrent = plan.id === 'current'}
            <div class="plan-card" class:recommended={isRec}>
              {#if isRec}
                <div class="rec-flag">RECOMMENDED</div>
              {/if}
              <div class="plan-top">
                <div class="plan-name">{isCurrent ? currentModel.label : plan.name}</div>
                <div class="plan-tag" style="--c: {plan.color}">{plan.tag}</div>
              </div>
              <div class="plan-rate">
                <EditableNumber
                  value={rate}
                  format={fmtRate}
                  parse={parseRate}
                  onchange={(v) => setRate(plan.id, v)}
                  ariaLabel="Edit rate per 1M tokens"
                />
                <span class="reset" role="button" tabindex="0"
                  onclick={() => resetRate(plan.id)}
                  onkeydown={(e) => e.key === 'Enter' && resetRate(plan.id)}
                  title="Reset to default">↺</span>
              </div>
              <div class="plan-cost">
                <span class="cost-label">your monthly cost</span>
                <span class="cost-val" class:baseline={isCurrent && !isRec}>
                  ${fmtCost(monthlyCost(rate, tokens))}
                </span>
              </div>
              <p class="plan-blurb">{plan.blurb}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .calc-section {
    padding-top: 90px;
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  .calc-section > .container { width: 100%; }

  .top-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 48px;
    align-items: center;
    margin-bottom: 32px;
  }
  .header-col { min-width: 0; }
  .save-hero {
    text-align: right;
    padding: 24px 32px;
    border: 1px solid var(--accent);
    border-radius: 16px;
    background: rgba(16, 185, 129, 0.06);
    box-shadow: 0 0 30px rgba(16, 185, 129, 0.12);
    transition: opacity 0.25s;
    min-width: 280px;
  }
  .save-hero.dimmed { opacity: 0.4; }
  .save-hero-label {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent-bright);
    margin-bottom: 6px;
  }
  .save-hero-value {
    font-family: var(--mono);
    font-size: clamp(36px, 5.5vw, 58px);
    font-weight: 800;
    color: var(--accent);
    letter-spacing: -0.03em;
    line-height: 1;
  }
  .save-hero-unit { font-size: 0.45em; font-weight: 600; color: var(--accent-bright); }
  .save-hero-pct {
    font-family: var(--mono);
    font-size: 13px;
    color: var(--accent-bright);
    margin-top: 8px;
  }
  @media (max-width: 760px) {
    .top-row { grid-template-columns: 1fr; gap: 20px; }
    .save-hero { text-align: left; min-width: 0; }
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
    align-items: start;
  }
  @media (max-width: 900px) {
    .grid { grid-template-columns: 1fr; }
  }

  .panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  .panel-label {
    font-family: var(--mono);
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-muted);
  }
  .panel-tag {
    font-family: var(--mono);
    font-size: 11px;
    padding: 3px 8px;
    border-radius: 6px;
    background: var(--surface-2);
    border: 1px solid var(--border);
    color: var(--text-dim);
  }
  .panel-tag.accent { color: var(--accent); border-color: rgba(16,185,129,0.3); }

  .calc-panel, .plans-panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 20px;
  }

  .field { margin-bottom: 18px; }
  .field-top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 10px;
    gap: 10px;
  }
  .field-top label, .block-label {
    font-size: 14px;
    font-weight: 500;
    color: var(--text);
  }
  .num {
    font-family: var(--mono);
    font-weight: 600;
    color: var(--accent);
  }

  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    background: var(--border);
    border-radius: 4px;
    outline: none;
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px; height: 18px;
    border-radius: 50%;
    background: var(--accent);
    cursor: pointer;
    border: 3px solid var(--bg);
    box-shadow: 0 0 0 1px var(--accent), 0 0 12px var(--accent-glow);
    transition: transform 0.1s;
  }
  input[type="range"]::-webkit-slider-thumb:hover { transform: scale(1.15); }
  input[type="range"]::-moz-range-thumb {
    width: 18px; height: 18px;
    border-radius: 50%;
    background: var(--accent);
    cursor: pointer;
    border: 3px solid var(--bg);
    box-shadow: 0 0 0 1px var(--accent);
  }
  .range-meta {
    display: flex;
    justify-content: space-between;
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 6px;
  }

  select {
    width: 100%;
    background: var(--bg-soft);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 12px 14px;
    font-size: 16px;
    font-family: var(--mono);
    color: var(--text);
    transition: border-color 0.2s;
    -webkit-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2310B981' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    cursor: pointer;
  }
  select:focus { outline: none; border-color: var(--accent); }
  select option { background: var(--surface); color: var(--text); }

  .hint { font-size: 12px; color: var(--text-muted); margin-top: 6px; display: block; }
  code {
    font-family: var(--mono);
    background: var(--surface-2);
    padding: 1px 5px;
    border-radius: 4px;
    color: var(--accent-bright);
  }

  .toggle-field {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-info { display: flex; flex-direction: column; gap: 2px; }
  .switch {
    width: 46px; height: 26px;
    border-radius: 999px;
    background: var(--surface-2);
    border: 1px solid var(--border);
    position: relative;
    transition: background 0.2s, border-color 0.2s;
    flex-shrink: 0;
  }
  .switch.on { background: rgba(16,185,129,0.2); border-color: var(--accent); }
  .knob {
    position: absolute;
    top: 2px; left: 2px;
    width: 20px; height: 20px;
    border-radius: 50%;
    background: var(--text-dim);
    transition: transform 0.2s, background 0.2s;
  }
  .switch.on .knob { transform: translateX(20px); background: var(--accent); }

  .block-label { display: block; margin-bottom: 12px; }
  .pills { display: flex; flex-wrap: wrap; gap: 8px; }
  .pill {
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--surface-2);
    color: var(--text-dim);
    font-size: 13px;
    transition: all 0.15s;
  }
  .pill:hover { border-color: #333; color: var(--text); }
  .pill.on {
    background: rgba(16,185,129,0.12);
    border-color: var(--accent);
    color: var(--accent-bright);
  }

  .token-readout {
    margin-top: 8px;
    padding: 16px 18px;
    border-radius: 12px;
    background: var(--bg-soft);
    border: 1px solid var(--border-soft);
  }
  .tr-label {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 6px;
  }
  .tr-value {
    font-family: var(--mono);
    font-size: 26px;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.02em;
  }
  .tr-bar {
    margin-top: 10px;
    height: 4px;
    background: var(--border);
    border-radius: 4px;
    overflow: hidden;
  }
  .tr-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--accent-bright));
    transition: width 0.4s ease;
  }

  /* Plans */
  .plans-list { display: flex; flex-direction: column; gap: 10px; }
  .plan-card {
    position: relative;
    padding: 14px 18px;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: var(--surface-2);
    transition: border-color 0.3s, box-shadow 0.3s, opacity 0.3s, transform 0.3s;
    opacity: 0.55;
  }
  .plan-card.recommended {
    border-color: var(--accent);
    box-shadow: 0 0 0 1px var(--accent), 0 12px 40px rgba(16,185,129,0.18);
    opacity: 1;
    transform: translateY(-2px);
  }
  .rec-flag {
    position: absolute;
    top: -10px; right: 18px;
    font-family: var(--mono);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    padding: 4px 10px;
    border-radius: 6px;
    background: var(--accent);
    color: #04130d;
  }
  .plan-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  .plan-name { font-size: 15px; font-weight: 700; }
  .plan-tag {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--c, var(--text-dim));
    padding: 3px 8px;
    border-radius: 6px;
    background: rgba(255,255,255,0.04);
  }
  .plan-rate {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .reset {
    font-size: 14px;
    color: var(--text-muted);
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.15s, color 0.15s;
  }
  .plan-rate:hover .reset { opacity: 1; }
  .reset:hover { color: var(--accent); }
  .plan-cost {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: 6px 0;
    border-top: 1px dashed var(--border);
    border-bottom: 1px dashed var(--border);
    margin-bottom: 8px;
  }
  .cost-label { font-size: 11px; color: var(--text-muted); }
  .cost-val {
    font-family: var(--mono);
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
  }
  .cost-val.baseline { color: var(--text-dim); text-decoration: line-through; text-decoration-color: var(--text-muted); }
  .plan-blurb { font-size: 12px; color: var(--text-dim); line-height: 1.4; margin: 0; }
</style>
