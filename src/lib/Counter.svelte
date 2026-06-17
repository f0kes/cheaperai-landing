<script>
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  let { value = 0, duration = 600, prefix = '', suffix = '' } = $props();

  const displayed = tweened(0, { duration, easing: cubicOut });
  $effect(() => displayed.set(value));

  function format(n) {
    return Math.round(n).toLocaleString('en-US');
  }
</script>

<span class="mono">{prefix}{format($displayed)}{suffix}</span>

<style>
  .mono {
    font-family: var(--mono);
    font-variant-numeric: tabular-nums;
  }
</style>
