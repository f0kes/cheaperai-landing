<script>
  import { onMount } from 'svelte';
  import Counter from './Counter.svelte';

  const phrases = ['ChatGPT API', 'Claude API', 'GPT-4o', 'Claude Sonnet'];
  let idx = 0;
  let current = phrases[0];
  let typing = $state('');
  let saving = 4250;

  onMount(() => {
    let typingTimer;
    const typeLoop = () => {
      const word = phrases[idx];
      let i = 0;
      typing = '';
      const tick = () => {
        typing = word.slice(0, i++);
        if (i <= word.length) {
          typingTimer = setTimeout(tick, 70);
        } else {
          typingTimer = setTimeout(() => {
            idx = (idx + 1) % phrases.length;
            current = phrases[idx];
            typeLoop();
          }, 2400);
        }
      };
      tick();
    };
    typeLoop();
    return () => clearTimeout(typingTimer);
  });
</script>

<section id="top" class="hero">
  <div class="container hero-inner">
    <div class="badge">
      <span class="dot"></span>
      Open-source models · prompt engineering · token accounting
    </div>
    <h1 class="title">
      Cut Your LLM Bill by <span class="accent">80%</span>.
      <br />Keep the Quality.
    </h1>
    <p class="subtitle">
      Replace <span class="typed">{typing || current}<span class="caret"></span></span> with
      cheaper open-source models — DeepSeek, GLM, smaller tuned models. We pick the right model
      per task using quantitative metrics and bulletproof catch-all parsers, so your quality stays on par.
    </p>

    <div class="hero-actions">
      <a href="#calculator" class="btn-primary">Run the calculator →</a>
      <a href="#describe" class="btn-ghost">Get a free optimization report</a>
    </div>

    <div class="savings-banner">
      <div class="savings-label">Average monthly savings vs. ChatGPT</div>
      <div class="savings-value">
        $<Counter value={saving} />/mo
      </div>
    </div>
  </div>

  <a href="#calculator" class="scroll-prompt" aria-label="Scroll down">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </a>
</section>

<style>
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 120px 0 80px;
    background:
      radial-gradient(900px 500px at 50% -10%, rgba(16,185,129,0.10), transparent 70%),
      radial-gradient(600px 400px at 85% 20%, rgba(16,185,129,0.05), transparent 70%);
  }
  .hero-inner {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 7px 14px;
    border: 1px solid var(--border);
    border-radius: 999px;
    font-size: 13px;
    color: var(--text-dim);
    background: rgba(18,18,18,0.6);
    margin-bottom: 28px;
  }
  .dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 10px var(--accent-glow);
  }
  .title {
    font-size: clamp(36px, 6.5vw, 72px);
    font-weight: 900;
    letter-spacing: -0.035em;
    line-height: 1.04;
    margin-bottom: 24px;
  }
  .accent { color: var(--accent); }
  .subtitle {
    max-width: 680px;
    color: var(--text-dim);
    font-size: clamp(16px, 2vw, 20px);
    margin-bottom: 36px;
  }
  .typed {
    color: var(--text);
    font-family: var(--mono);
    font-size: 0.92em;
    padding: 2px 7px;
    background: rgba(16,185,129,0.08);
    border: 1px solid rgba(16,185,129,0.2);
    border-radius: 6px;
    display: inline-block;
    vertical-align: baseline;
    /* reserve space for the longest word ("Claude Sonnet" = 13ch) so the
       surrounding paragraph never reflows while the typed word changes */
    min-width: 13ch;
    text-align: left;
  }
  .caret {
    display: inline-block;
    width: 2px;
    height: 1em;
    background: var(--accent);
    margin-left: 2px;
    vertical-align: -2px;
    animation: blink 1s steps(2) infinite;
  }
  @keyframes blink { 50% { opacity: 0; } }

  .hero-actions {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 56px;
  }
  .btn-primary {
    background: var(--accent);
    color: #04130d;
    font-weight: 600;
    padding: 13px 22px;
    border-radius: 10px;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 0 0 0 var(--accent-glow);
  }
  .btn-primary:hover {
    background: var(--accent-bright);
    transform: translateY(-1px);
    box-shadow: 0 8px 30px var(--accent-glow);
  }
  .btn-ghost {
    border: 1px solid var(--border);
    padding: 13px 22px;
    border-radius: 10px;
    color: var(--text-dim);
    transition: border-color 0.2s, color 0.2s;
  }
  .btn-ghost:hover { border-color: #333; color: var(--text); }

  .savings-banner {
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 22px 36px;
    background: rgba(18,18,18,0.5);
    backdrop-filter: blur(8px);
  }
  .savings-label {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 6px;
  }
  .savings-value {
    font-family: var(--mono);
    font-size: clamp(32px, 5vw, 46px);
    font-weight: 700;
    color: var(--accent);
    letter-spacing: -0.02em;
  }

  .scroll-prompt {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--text-muted);
    animation: bounce 2s infinite;
  }
  @keyframes bounce {
    0%, 100% { transform: translate(-50%, 0); }
    50% { transform: translate(-50%, 8px); }
  }
</style>
