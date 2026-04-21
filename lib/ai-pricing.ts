export type TokenizerKind = 'o200k' | 'cl100k' | 'claude' | 'gemini' | 'deepseek';

export interface AiModel {
  id:             string;
  provider:       'OpenAI' | 'Anthropic' | 'Google' | 'xAI' | 'DeepSeek';
  name:           string;
  tokenizer:      TokenizerKind;
  contextWindow:  number;
  tier:           'frontier' | 'mid' | 'fast';
}

export const AI_MODELS: AiModel[] = [
  { id: 'gpt-5',              provider: 'OpenAI',    name: 'GPT-5',              tokenizer: 'o200k',    contextWindow: 400_000, tier: 'frontier' },
  { id: 'gpt-4o',             provider: 'OpenAI',    name: 'GPT-4o',             tokenizer: 'o200k',    contextWindow: 128_000, tier: 'mid'      },
  { id: 'gpt-4o-mini',        provider: 'OpenAI',    name: 'GPT-4o mini',        tokenizer: 'o200k',    contextWindow: 128_000, tier: 'fast'     },
  { id: 'o1',                 provider: 'OpenAI',    name: 'o1',                 tokenizer: 'o200k',    contextWindow: 200_000, tier: 'frontier' },
  { id: 'claude-opus-4-7',    provider: 'Anthropic', name: 'Claude Opus 4.7',    tokenizer: 'claude',   contextWindow: 200_000, tier: 'frontier' },
  { id: 'claude-sonnet-4-6',  provider: 'Anthropic', name: 'Claude Sonnet 4.6',  tokenizer: 'claude',   contextWindow: 200_000, tier: 'mid'      },
  { id: 'claude-haiku-4-5',   provider: 'Anthropic', name: 'Claude Haiku 4.5',   tokenizer: 'claude',   contextWindow: 200_000, tier: 'fast'     },
  { id: 'gemini-2.5-pro',     provider: 'Google',    name: 'Gemini 2.5 Pro',     tokenizer: 'gemini',   contextWindow: 2_000_000, tier: 'frontier' },
  { id: 'gemini-2.0-flash',   provider: 'Google',    name: 'Gemini 2.0 Flash',   tokenizer: 'gemini',   contextWindow: 1_000_000, tier: 'fast'     },
  { id: 'deepseek-v3',        provider: 'DeepSeek',  name: 'DeepSeek V3',        tokenizer: 'deepseek', contextWindow: 128_000, tier: 'mid'      },
];

export const PRICING_UPDATED = '2026-04-21';

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
