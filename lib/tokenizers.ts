import type { Tiktoken as TiktokenType } from 'js-tiktoken/lite';
import { AI_MODELS, estimateTokens, type AiModel, type TokenizerKind } from './ai-pricing';

export interface Token {
  id:      number;
  text:    string;
  special: boolean;
}

export interface TokenizeResult {
  tokens:  Token[];
  count:   number;
  isExact: boolean;
}

const CL100K_SPECIAL: Record<string, number> = {
  '<|endoftext|>':   100257,
  '<|fim_prefix|>':  100258,
  '<|fim_middle|>':  100259,
  '<|fim_suffix|>':  100260,
  '<|endofprompt|>': 100276,
  '<|im_start|>':    100264,
  '<|im_end|>':      100265,
  '<|im_sep|>':      100266,
};

const O200K_SPECIAL: Record<string, number> = {
  '<|endoftext|>':   199999,
  '<|endofprompt|>': 200018,
  '<|im_start|>':    200264,
  '<|im_end|>':      200265,
  '<|im_sep|>':      200266,
};

const SPECIAL_ID_TO_TEXT: Record<number, string> = {};
for (const [text, id] of Object.entries(CL100K_SPECIAL)) SPECIAL_ID_TO_TEXT[id] = text;
for (const [text, id] of Object.entries(O200K_SPECIAL))  SPECIAL_ID_TO_TEXT[id] = text;

const encoderCache = new Map<TokenizerKind, TiktokenType>();

async function getEncoder(kind: TokenizerKind): Promise<TiktokenType | null> {
  if (kind !== 'o200k' && kind !== 'cl100k') return null;

  const cached = encoderCache.get(kind);
  if (cached) return cached;

  const { Tiktoken } = await import('js-tiktoken/lite');

  if (kind === 'o200k') {
    const { default: ranks } = await import('js-tiktoken/ranks/o200k_base');
    const enc = new Tiktoken(ranks, O200K_SPECIAL);
    encoderCache.set(kind, enc);
    return enc;
  }
  const { default: ranks } = await import('js-tiktoken/ranks/cl100k_base');
  const enc = new Tiktoken(ranks, CL100K_SPECIAL);
  encoderCache.set(kind, enc);
  return enc;
}

export function hasExactTokenizer(kind: TokenizerKind): boolean {
  return kind === 'o200k' || kind === 'cl100k';
}

export function getModelById(id: string): AiModel {
  return AI_MODELS.find(m => m.id === id) ?? AI_MODELS[0];
}

export async function tokenize(
  text:       string,
  modelId:    string,
  allowSpecial = false,
): Promise<TokenizeResult> {
  const model = getModelById(modelId);

  if (!hasExactTokenizer(model.tokenizer)) {
    return {
      tokens:  [],
      count:   estimateTokens(text, model.tokenizer),
      isExact: false,
    };
  }

  if (!text) return { tokens: [], count: 0, isExact: true };

  const enc = await getEncoder(model.tokenizer);
  if (!enc) return { tokens: [], count: estimateTokens(text, model.tokenizer), isExact: false };

  const ids = enc.encode(text, allowSpecial ? 'all' : []);

  const tokens: Token[] = ids.map(id => {
    const specialText = SPECIAL_ID_TO_TEXT[id];
    if (specialText) return { id, text: specialText, special: true };
    return { id, text: enc.decode([id]), special: false };
  });

  return { tokens, count: ids.length, isExact: true };
}

export async function countTokens(text: string, modelId: string, allowSpecial = false): Promise<{ count: number; isExact: boolean }> {
  const model = getModelById(modelId);
  if (!hasExactTokenizer(model.tokenizer)) {
    return { count: estimateTokens(text, model.tokenizer), isExact: false };
  }
  if (!text) return { count: 0, isExact: true };
  const enc = await getEncoder(model.tokenizer);
  if (!enc) return { count: estimateTokens(text, model.tokenizer), isExact: false };
  return { count: enc.encode(text, allowSpecial ? 'all' : []).length, isExact: true };
}

export function composeChatML(system: string, user: string, assistant: string): string {
  const parts: string[] = [];
  if (system.trim())    parts.push(`<|im_start|>system\n${system}<|im_end|>`);
  if (user.trim())      parts.push(`<|im_start|>user\n${user}<|im_end|>`);
  if (assistant.trim()) parts.push(`<|im_start|>assistant\n${assistant}<|im_end|>`);
  return parts.join('\n');
}
