<script>
  let description = $state('');
  let email = $state('');
  let submitted = $state(false);
  let error = $state('');
  let sending = $state(false);

  async function send() {
    error = '';
    if (description.trim().length < 20) {
      error = 'Tell us a bit more about your use case (at least 20 chars).';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error = 'Enter a valid email so we can send the report.';
      return;
    }
    sending = true;
    await new Promise(r => setTimeout(r, 600));
    sending = false;
    submitted = true;
  }
</script>

<section id="describe" class="section">
  <div class="container">
    <div class="eyebrow">// lead gen</div>
    <h2 class="section-title">Let us analyze your use case.</h2>
    <p class="section-sub">
      Paste a short description of what your bot does, your current model, and rough volume.
      We'll send back a free optimization report — recommended models, expected savings, and a
      migration sketch. No sales call.
    </p>

    {#if submitted}
      <div class="success">
        <div class="success-icon">✓</div>
        <h3>Got it. Report incoming.</h3>
        <p>We'll email <span class="mono">{email}</span> within 24 hours with your optimization report.</p>
        <button class="btn-ghost" onclick={() => { submitted = false; description=''; email=''; }}>
          Submit another
        </button>
      </div>
    {:else}
      <form class="terminal" onsubmit={e => { e.preventDefault(); send(); }}>
        <div class="term-bar">
          <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
          <span class="term-path">cheaperai://analyze</span>
        </div>
        <div class="term-body">
          <label class="t-label" for="desc">describe your product</label>
          <textarea
            id="desc"
            bind:value={description}
            placeholder="// e.g. We run a customer-support bot on GPT-4o handling ~2k tickets/day, does RAG over docs, uses function calling to look up orders..."
            rows="6"
          ></textarea>

          <div class="row">
            <div class="email-field">
              <label class="t-label" for="email">email for the report</label>
              <input id="email" type="email" bind:value={email} placeholder="you@company.com" />
            </div>
            <button type="submit" class="send-btn" disabled={sending}>
              {sending ? 'Sending…' : 'Get your free optimization report →'}
            </button>
          </div>

          {#if error}
            <div class="error">{error}</div>
          {/if}
        </div>
      </form>
    {/if}
  </div>
</section>

<style>
  .terminal {
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
    background: var(--surface);
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .terminal:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 1px var(--accent), 0 0 40px rgba(16,185,129,0.1);
  }
  .term-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    background: var(--surface-2);
    border-bottom: 1px solid var(--border);
  }
  .dot { width: 11px; height: 11px; border-radius: 50%; }
  .dot.r { background: #FF5F57; }
  .dot.y { background: #FEBC2E; }
  .dot.g { background: #28C840; }
  .term-path {
    margin-left: 10px;
    font-family: var(--mono);
    font-size: 12px;
    color: var(--text-muted);
  }
  .term-body { padding: 22px; }

  .t-label {
    display: block;
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 8px;
  }
  textarea, input {
    width: 100%;
    background: var(--bg-soft);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 12px 14px;
    font-size: 14px;
    resize: vertical;
    transition: border-color 0.2s;
  }
  textarea {
    font-family: var(--mono);
    line-height: 1.6;
  }
  textarea::placeholder, input::placeholder { color: var(--text-muted); }
  textarea:focus, input:focus {
    outline: none;
    border-color: var(--accent);
  }

  .row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 16px;
    align-items: end;
    margin-top: 18px;
  }
  @media (max-width: 640px) {
    .row { grid-template-columns: 1fr; }
  }
  .email-field { min-width: 0; }

  .send-btn {
    background: var(--accent);
    color: #04130d;
    font-weight: 600;
    padding: 13px 22px;
    border-radius: 10px;
    white-space: nowrap;
    transition: background 0.2s, transform 0.2s, opacity 0.2s;
  }
  .send-btn:hover:not(:disabled) { background: var(--accent-bright); transform: translateY(-1px); }
  .send-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .error {
    margin-top: 14px;
    color: var(--danger);
    font-size: 13px;
    font-family: var(--mono);
  }

  .success {
    border: 1px solid var(--accent);
    border-radius: 14px;
    padding: 40px;
    text-align: center;
    background: rgba(16,185,129,0.04);
  }
  .success-icon {
    width: 48px; height: 48px;
    margin: 0 auto 16px;
    border-radius: 50%;
    background: var(--accent);
    color: #04130d;
    font-size: 24px;
    font-weight: 700;
    display: flex; align-items: center; justify-content: center;
  }
  .success h3 { font-size: 22px; margin-bottom: 8px; }
  .success p { color: var(--text-dim); margin-bottom: 22px; }
  .mono { font-family: var(--mono); color: var(--accent); }
  .btn-ghost {
    border: 1px solid var(--border);
    padding: 10px 18px;
    border-radius: 10px;
    color: var(--text-dim);
  }
  .btn-ghost:hover { border-color: #333; color: var(--text); }
</style>
