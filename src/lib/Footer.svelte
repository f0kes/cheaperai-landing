<script>
  const year = new Date().getFullYear();
</script>

<footer id="contact" class="section">
  <div class="container">
    <div class="footer-inner">
      <div class="left">
        <div class="logo">
          <span class="logo-mark">⌁</span>
          cheaper<span class="accent">AI</span>
        </div>
        <p class="pitch">
          Still have questions? We're engineers, not salespeople. Let's talk.
        </p>
        <a href="mailto:founders@cheaperAI.com" class="email">founders@cheaperAI.com</a>
        <div class="socials">
          <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 .1.8 1 .8 1 .6 1 1.6.7 2 .5.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.5 18.3 4.8 18.3 4.8c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noreferrer" aria-label="Twitter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.2h3.7l-8 9.1 9.4 12.5h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9zm-1.3 19.6h2L6.5 3.3H4.3l13.3 17.5z"/></svg>
          </a>
        </div>
      </div>

      <div class="right">
        <div class="col">
          <div class="col-title">Product</div>
          <a href="#calculator">Calculator</a>
          <a href="#describe">Get Report</a>
          <a href="#top">How it works</a>
        </div>
        <div class="col">
          <div class="col-title">Contact</div>
          <a href="mailto:founders@cheaperAI.com">founders@cheaperAI.com</a>
          <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://twitter.com/" target="_blank" rel="noreferrer">Twitter</a>
        </div>
      </div>
    </div>

    <div class="bottom">
      <span>© {year} cheaperAI. We count every token.</span>
      <span class="mono">Built with Svelte.</span>
    </div>
  </div>
</footer>

<style>
  footer {
    border-top: 1px solid var(--border);
    background: linear-gradient(180deg, transparent, rgba(16,185,129,0.03));
  }
  .footer-inner {
    display: flex;
    justify-content: space-between;
    gap: 48px;
    flex-wrap: wrap;
    margin-bottom: 48px;
  }
  .logo {
    font-weight: 800;
    font-size: 22px;
    margin-bottom: 14px;
    display: flex; align-items: center; gap: 8px;
  }
  .logo-mark { color: var(--accent); }
  .accent { color: var(--accent); }
  .pitch {
    color: var(--text-dim);
    max-width: 320px;
    margin-bottom: 16px;
  }
  .email {
    font-family: var(--mono);
    color: var(--accent);
    font-size: 18px;
    display: inline-block;
    margin-bottom: 18px;
    transition: color 0.2s;
  }
  .email:hover { color: var(--accent-bright); }
  .socials { display: flex; gap: 14px; }
  .socials a {
    color: var(--text-muted);
    transition: color 0.2s;
  }
  .socials a:hover { color: var(--text); }

  .right { display: flex; gap: 64px; }
  .col { display: flex; flex-direction: column; gap: 10px; }
  .col-title {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 6px;
  }
  .col a { color: var(--text-dim); font-size: 14px; transition: color 0.15s; }
  .col a:hover { color: var(--text); }

  .bottom {
    display: flex;
    justify-content: space-between;
    padding-top: 24px;
    border-top: 1px solid var(--border);
    font-size: 13px;
    color: var(--text-muted);
  }
  .mono { font-family: var(--mono); }

  @media (max-width: 640px) {
    .right { gap: 40px; }
    .bottom { flex-direction: column; gap: 8px; }
  }
</style>
