import { useState, useCallback, useMemo } from 'react';

/* ── Types ─────────────────────────────────────────────── */

export type CaseType =
  | 'sentence'
  | 'lower'
  | 'upper'
  | 'title'
  | 'capitalized'
  | 'camel'
  | 'pascal'
  | 'snake'
  | 'kebab'
  | 'constant'
  | 'alternating'
  | 'inverse';

export interface CaseOption {
  id:      CaseType;
  label:   string;
  example: string;
  group:   'text' | 'code' | 'fun';
}

/* ── Case options config ───────────────────────────────── */

export const CASE_OPTIONS: CaseOption[] = [
  // Text
  { id: 'sentence',    label: 'Sentence case',    example: 'The quick brown fox',  group: 'text' },
  { id: 'lower',       label: 'lowercase',        example: 'the quick brown fox',  group: 'text' },
  { id: 'upper',       label: 'UPPERCASE',        example: 'THE QUICK BROWN FOX',  group: 'text' },
  { id: 'title',       label: 'Title Case',       example: 'The Quick Brown Fox',  group: 'text' },
  { id: 'capitalized', label: 'Capitalized Words',example: 'The Quick Brown Fox',  group: 'text' },
  // Code
  { id: 'camel',       label: 'camelCase',        example: 'theQuickBrownFox',     group: 'code' },
  { id: 'pascal',      label: 'PascalCase',       example: 'TheQuickBrownFox',     group: 'code' },
  { id: 'snake',       label: 'snake_case',       example: 'the_quick_brown_fox',  group: 'code' },
  { id: 'kebab',       label: 'kebab-case',       example: 'the-quick-brown-fox',  group: 'code' },
  { id: 'constant',    label: 'CONSTANT_CASE',    example: 'THE_QUICK_BROWN_FOX',  group: 'code' },
  // Fun
  { id: 'alternating', label: 'aLtErNaTiNg',      example: 'tHe qUiCk bRoWn fOx',  group: 'fun' },
  { id: 'inverse',     label: 'iNVERSE',          example: 'tHE QUICK BROWN fOX',   group: 'fun' },
];

/* ── Title case: small words that stay lowercase ───────── */
const TITLE_SMALL = new Set([
  'a','an','the','and','but','or','for','nor','on','at','to','by',
  'in','of','up','as','is','it','its',
]);

/* ── Conversion logic ──────────────────────────────────── */

function toWords(text: string): string[] {
  // Split on spaces, underscores, hyphens, and camelCase boundaries
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')   // camelCase → camel Case
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // ABCDef → ABC Def
    .split(/[\s_\-]+/)
    .filter(Boolean);
}

function convert(text: string, type: CaseType): string {
  if (!text) return '';

  switch (type) {
    case 'lower':
      return text.toLowerCase();

    case 'upper':
      return text.toUpperCase();

    case 'sentence':
      return text
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase());

    case 'title': {
      const words = text.toLowerCase().split(/\s+/);
      return words
        .map((w, i) => {
          if (i === 0 || i === words.length - 1) return capitalize(w);
          return TITLE_SMALL.has(w) ? w : capitalize(w);
        })
        .join(' ');
    }

    case 'capitalized':
      return text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

    case 'camel': {
      const words = toWords(text);
      return words
        .map((w, i) => i === 0 ? w.toLowerCase() : capitalize(w.toLowerCase()))
        .join('');
    }

    case 'pascal':
      return toWords(text).map(w => capitalize(w.toLowerCase())).join('');

    case 'snake':
      return toWords(text).map(w => w.toLowerCase()).join('_');

    case 'kebab':
      return toWords(text).map(w => w.toLowerCase()).join('-');

    case 'constant':
      return toWords(text).map(w => w.toUpperCase()).join('_');

    case 'alternating':
      return text
        .split('')
        .map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase())
        .join('');

    case 'inverse':
      return text
        .split('')
        .map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())
        .join('');

    default:
      return text;
  }
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ── Hook ──────────────────────────────────────────────── */

export function useCaseConverter() {
  const [input,       setInput]       = useState('');
  const [activeCase,  setActiveCase]  = useState<CaseType>('sentence');
  const [copied,      setCopied]      = useState(false);

  const output = useMemo(
    () => convert(input, activeCase),
    [input, activeCase],
  );

  const copy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  }, [output]);

  const clear = useCallback(() => setInput(''), []);

  const convertTo = useCallback((type: CaseType) => {
    setActiveCase(type);
  }, []);

  return { input, setInput, output, activeCase, convertTo, copy, copied, clear };
}
