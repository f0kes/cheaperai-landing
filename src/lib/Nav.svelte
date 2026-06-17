<script>
  import { onMount } from 'svelte';

  let scrolled = $state(false);
  let hidden = $state(false);

  onMount(() => {
    const calc = document.getElementById('calculator');
    const onScroll = () => {
      scrolled = window.scrollY > 20;
      if (calc) {
        const rect = calc.getBoundingClientRect();
        // hide nav once the calculator top passes under the nav bar,
        // show again once its bottom has scrolled past
        hidden = rect.top <= 0;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  });
</script>

<header class:scrolled class:hidden>
  <div class="container nav-inner">
    <a href="#top" class="logo">
      <span class="logo-mark">⌁</span>
      cheaper<span class="logo-accent">AI</span>
    </a>
    <nav class="links">
      <a href="#calculator">Calculator</a>
      <a href="#describe">Get Report</a>
      <a href="#contact">Contact</a>
    </nav>
    <a href="#describe" class="cta">Get Free Report</a>
  </div>
</header>

<style>
  header {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    transition: background 0.25s, border-color 0.25s, backdrop-filter 0.25s,
                transform 0.35s ease, opacity 0.25s;
    border-bottom: 1px solid transparent;
  }
  header.scrolled {
    background: rgba(10, 10, 10, 0.7);
    backdrop-filter: blur(14px);
    border-bottom-color: var(--border);
  }
  header.hidden {
    transform: translateY(-100%);
    opacity: 0;
  }
  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
  }
  .logo {
    font-weight: 800;
    font-size: 20px;
    letter-spacing: -0.02em;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .logo-mark {
    color: var(--accent);
    font-size: 22px;
    line-height: 1;
  }
  .logo-accent { color: var(--accent); }
  .links {
    display: flex;
    gap: 28px;
    font-size: 14px;
    color: var(--text-dim);
  }
  .links a:hover { color: var(--text); }
  .cta {
    font-size: 14px;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 8px;
    background: var(--accent);
    color: #04130d;
    transition: background 0.2s, transform 0.2s;
  }
  .cta:hover { background: var(--accent-bright); transform: translateY(-1px); }
  @media (max-width: 768px) {
    .links { display: none; }
  }
</style>
