<script>
  import { onMount, onDestroy } from 'svelte';
  import Nav from './lib/Nav.svelte';
  import Hero from './lib/Hero.svelte';
  import Calculator from './lib/Calculator.svelte';
  import LeadGen from './lib/LeadGen.svelte';
  import Footer from './lib/Footer.svelte';
</script>

<Nav />
<main>
  <Hero />
  <Calculator />
  <LeadGen />
  <Footer />
</main>
