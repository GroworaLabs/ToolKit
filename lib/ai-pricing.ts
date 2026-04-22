export type TokenizerKind = 'o200k' | 'cl100k' | 'claude' | 'gemini' | 'deepseek';

export interface ModelPricing {
  inputPerM:        number;
  outputPerM:       number;
  cachedInputPerM?: number;
  batchInputPerM?:  number;
  batchOutputPerM?: number;
}

export interface AiModel {
  id:             string;
  provider:       'OpenAI' | 'Anthropic' | 'Google' | 'xAI' | 'DeepSeek';
  name:           string;
  tokenizer:      TokenizerKind;
  contextWindow:  number;
  tier:           'frontier' | 'mid' | 'fast';
  pricing:        ModelPricing;
}

export const AI_MODELS: AiModel[] = [
  { id: 'gpt-5',              provider: 'OpenAI',    name: 'GPT-5',              tokenizer: 'o200k',    contextWindow:   400_000, tier: 'frontier', pricing: { inputPerM:  5.00, outputPerM: 20.00, cachedInputPerM: 0.50,  batchInputPerM:  2.50, batchOutputPerM: 10.00 } },
  { id: 'gpt-4o',             provider: 'OpenAI',    name: 'GPT-4o',             tokenizer: 'o200k',    contextWindow:   128_000, tier: 'mid',      pricing: { inputPerM:  2.50, outputPerM: 10.00, cachedInputPerM: 1.25,  batchInputPerM:  1.25, batchOutputPerM:  5.00 } },
  { id: 'gpt-4o-mini',        provider: 'OpenAI',    name: 'GPT-4o mini',        tokenizer: 'o200k',    contextWindow:   128_000, tier: 'fast',     pricing: { inputPerM:  0.15, outputPerM:  0.60, cachedInputPerM: 0.075, batchInputPerM:  0.075, batchOutputPerM: 0.30 } },
  { id: 'o1',                 provider: 'OpenAI',    name: 'o1',                 tokenizer: 'o200k',    contextWindow:   200_000, tier: 'frontier', pricing: { inputPerM: 15.00, outputPerM: 60.00, cachedInputPerM: 7.50,  batchInputPerM:  7.50, batchOutputPerM: 30.00 } },
  { id: 'claude-opus-4-7',    provider: 'Anthropic', name: 'Claude Opus 4.7',    tokenizer: 'claude',   contextWindow:   200_000, tier: 'frontier', pricing: { inputPerM: 15.00, outputPerM: 75.00, cachedInputPerM: 1.50,  batchInputPerM:  7.50, batchOutputPerM: 37.50 } },
  { id: 'claude-sonnet-4-6',  provider: 'Anthropic', name: 'Claude Sonnet 4.6',  tokenizer: 'claude',   contextWindow:   200_000, tier: 'mid',      pricing: { inputPerM:  3.00, outputPerM: 15.00, cachedInputPerM: 0.30,  batchInputPerM:  1.50, batchOutputPerM:  7.50 } },
  { id: 'claude-haiku-4-5',   provider: 'Anthropic', name: 'Claude Haiku 4.5',   tokenizer: 'claude',   contextWindow:   200_000, tier: 'fast',     pricing: { inputPerM:  1.00, outputPerM:  5.00, cachedInputPerM: 0.10,  batchInputPerM:  0.50, batchOutputPerM:  2.50 } },
  { id: 'gemini-2.5-pro',     provider: 'Google',    name: 'Gemini 2.5 Pro',     tokenizer: 'gemini',   contextWindow: 2_000_000, tier: 'frontier', pricing: { inputPerM:  1.25, outputPerM: 10.00, cachedInputPerM: 0.31,  batchInputPerM:  0.625, batchOutputPerM: 5.00 } },
  { id: 'gemini-2.0-flash',   provider: 'Google',    name: 'Gemini 2.0 Flash',   tokenizer: 'gemini',   contextWindow: 1_000_000, tier: 'fast',     pricing: { inputPerM:  0.10, outputPerM:  0.40, cachedInputPerM: 0.025, batchInputPerM:  0.05,  batchOutputPerM: 0.20 } },
  { id: 'deepseek-v3',        provider: 'DeepSeek',  name: 'DeepSeek V3',        tokenizer: 'deepseek', contextWindow:   128_000, tier: 'mid',      pricing: { inputPerM:  0.27, outputPerM:  1.10, cachedInputPerM: 0.07 } },
];

export const PRICING_UPDATED = '2026-04-22';

export interface CostBreakdown {
  inputCost:  number;
  outputCost: number;
  total:      number;
}

export function computeCost(
  model:        AiModel,
  inputTokens:  number,
  outputTokens: number,
  mode:         'standard' | 'cached' | 'batch' = 'standard',
): CostBreakdown {
  const p = model.pricing;
  const inputRate =
    mode === 'cached' ? (p.cachedInputPerM ?? p.inputPerM) :
    mode === 'batch'  ? (p.batchInputPerM  ?? p.inputPerM) :
                        p.inputPerM;
  const outputRate =
    mode === 'batch'  ? (p.batchOutputPerM ?? p.outputPerM) :
                        p.outputPerM;
  const inputCost  = (inputTokens  / 1_000_000) * inputRate;
  const outputCost = (outputTokens / 1_000_000) * outputRate;
  return { inputCost, outputCost, total: inputCost + outputCost };
}

const BASE_RATIOS: Record<TokenizerKind, number> = {
  o200k:    3.8,
  cl100k:   4.0,
  claude:   3.5,
  gemini:   4.0,
  deepseek: 3.5,
};

export function estimateTokens(text: string, kind: TokenizerKind): number {
  if (!text) return 0;

  const chars = text.length;
  const words = text.trim().split(/\s+/).filter(Boolean).length || 1;
  const avgWord = chars / words;

  let ratio = BASE_RATIOS[kind];

  const codeSignal =
    /[{};]|=>|\bfunction\b|\bconst\b|\blet\b|\bimport\b|\bdef\b|\breturn\b/.test(text);
  if (codeSignal) ratio -= 0.4;

  const nonAscii = /[^\x00-\x7F]/.test(text);
  if (nonAscii) ratio -= 0.6;

  const shortWords = avgWord < 3.5;
  if (shortWords) ratio -= 0.2;

  ratio = Math.max(1.8, ratio);

  return Math.max(1, Math.round(chars / ratio));
}
