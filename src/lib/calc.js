// Pricing + model selection logic.

// The model the user currently runs (the expensive baseline being replaced).
export const CURRENT_MODELS = [
  { id: 'chatgpt', label: 'ChatGPT API', rate: 15.0 },
  { id: 'claude', label: 'Claude API', rate: 15.0 },
  { id: 'gpt4o', label: 'GPT-4o', rate: 10.0 },
  { id: 'sonnet', label: 'Claude Sonnet', rate: 15.0 },
];

// The cheaperAI plans (open-source). Plan 1 mirrors the user's current model
// so the card list reads naturally; the recommended pick is always Pro or Flash.
export const PLANS = [
  {
    id: 'current',
    name: 'Your current model',
    tag: 'Baseline',
    rate: 15.0, // overridden by the selected current model at runtime
    color: '#9A9A9A',
    blurb: 'What you pay today with a premium closed-source API. This is the bill we replace.',
  },
  {
    id: 'pro',
    name: 'GLM 4.6 / DeepSeek Pro',
    tag: 'Balanced',
    rate: 1.1,
    color: '#34D399',
    blurb: 'Strong open-source models, near-parity on most tasks at ~1/14 the cost.',
  },
  {
    id: 'flash',
    name: 'DeepSeek Flash',
    tag: 'Ultra-cheap',
    rate: 0.27,
    color: '#F59E0B',
    blurb: 'Fastest, cheapest tier. Best for high-volume structured tasks and simple replies.',
  },
];

export const PRO = PLANS[1];
export const FLASH = PLANS[2];

// per-task tolerance drives which plan is safe to recommend
export const TASKS = [
  { id: 'support', label: 'Customer Support', tokens: 1800, tolerance: 'low' },
  { id: 'extract', label: 'Data Extraction', tokens: 900, tolerance: 'low' },
  { id: 'writing', label: 'Creative Writing', tokens: 2600, tolerance: 'mid' },
  { id: 'rag', label: 'RAG / Knowledge QA', tokens: 3200, tolerance: 'mid' },
  { id: 'coding', label: 'Code Generation', tokens: 3500, tolerance: 'high' },
  { id: 'classify', label: 'Classification', tokens: 400, tolerance: 'low' },
];

// Recommend a cheaperAI plan from inputs.
// Default: cheap Flash plan. Only escalate to Pro when a task truly needs it.
// - any high-tolerance task (e.g. code gen) => Pro for safety
// - tools executed => Pro (reliable function calling)
// - creative-writing / RAG at low volume => Pro for quality
export function pickPlan({ selectedTasks, tools, tokens }) {
  if (selectedTasks.length === 0) return FLASH;
  const hasHigh = selectedTasks.some(t => t.tolerance === 'high');
  const hasMid = selectedTasks.some(t => t.tolerance === 'mid');

  if (hasHigh) return PRO;
  if (tools) return PRO;
  if (hasMid && tokens <= 8_000_000) return PRO;
  return FLASH;
}

export function monthlyCost(rate, tokens) {
  return (tokens / 1_000_000) * rate;
}

export function findCurrentModel(id) {
  return CURRENT_MODELS.find(m => m.id === id) ?? CURRENT_MODELS[0];
}
