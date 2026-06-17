<script>
  // An inline editable number that looks like a label but becomes an input on focus.
  // While editing it shows the raw value; on blur it shows the formatted version
  // (e.g. "5M" for tokens, "$15.00/1M" for a rate).
  let {
    value = $bindable(0),
    format = (v) => String(v),
    parse = (s) => Number(s.replace(/[^\d.]/g, '')) || 0,
    placeholder = '',
    ariaLabel = '',
    onchange = null,
  } = $props();

  let editing = $state(false);
  let draft = $state('');

  const displayValue = $derived(editing ? draft : format(value));

  function handleFocus() {
    draft = String(value ?? '');
    editing = true;
  }
  function handleInput(e) {
    draft = e.target.value;
    const n = parse(draft);
    if (isFinite(n) && n >= 0) value = n;
  }
  function handleBlur() {
    editing = false;
    const n = parse(draft);
    value = isFinite(n) && n >= 0 ? n : 0;
    if (onchange) onchange(value);
  }
</script>

<input
  class="editable-num"
  class:editing
  type="text"
  inputmode="decimal"
  value={displayValue}
  {placeholder}
  {ariaLabel}
  title="Click to edit"
  onfocus={handleFocus}
  onblur={handleBlur}
  oninput={handleInput}
/>

<style>
  .editable-num {
    font-family: var(--mono);
    font-variant-numeric: tabular-nums;
    font-size: 16px;
    font-weight: 600;
    color: var(--accent);
    background: transparent;
    border: none;
    border-bottom: 1px dashed rgba(16, 185, 129, 0.45);
    border-radius: 0;
    padding: 1px 5px 2px;
    text-align: right;
    min-width: 5ch;
    cursor: text;
    transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
    outline: none;
  }
  .editable-num:hover {
    background: rgba(16, 185, 129, 0.1);
    border-bottom-color: var(--accent);
  }
  .editable-num.editing {
    background: rgba(16, 185, 129, 0.14);
    border-bottom: 1px solid var(--accent);
    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.12);
    color: var(--accent-bright);
  }
  .editable-num::placeholder { color: var(--text-muted); }
</style>
