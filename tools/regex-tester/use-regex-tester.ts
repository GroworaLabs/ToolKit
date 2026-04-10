import { useState, useMemo } from 'react';

export type RegexFlag = 'g' | 'i' | 'm' | 's';

export interface RegexMatch {
  value:    string;
  index:    number;
  end:      number;
  groups:   Record<string, string> | null;
}

export interface RegexResult {
  matches:    RegexMatch[];
  error:      string | null;
  isValid:    boolean;
  matchCount: number;
  replaced:   string | null;
}

export const FLAG_INFO: { flag: RegexFlag; label: string; desc: string }[] = [
  { flag: 'g', label: 'Global',     desc: 'Find all matches, not just the first' },
  { flag: 'i', label: 'Insensitive',desc: 'Case-insensitive matching'            },
  { flag: 'm', label: 'Multiline',  desc: '^ and $ match line boundaries'        },
  { flag: 's', label: 'Dotall',     desc: '. matches newline characters too'     },
];

const DEFAULT_PATTERN = '\\b\\w+\\b';
const DEFAULT_TEXT    = 'The quick brown fox jumps over the lazy dog.\nRegex makes pattern matching easy and powerful.';

export function useRegexTester() {
  const [pattern,     setPattern]     = useState(DEFAULT_PATTERN);
  const [testText,    setTestText]    = useState(DEFAULT_TEXT);
  const [flags,       setFlags]       = useState<Set<RegexFlag>>(new Set(['g']));
  const [replacement, setReplacement] = useState('');
  const [showReplace, setShowReplace] = useState(false);

  const toggleFlag = (flag: RegexFlag) => {
    setFlags(prev => {
      const next = new Set(prev);
      next.has(flag) ? next.delete(flag) : next.add(flag);
      return next;
    });
  };

  const flagString = Array.from(flags).join('');

  const result = useMemo<RegexResult>(() => {
    if (!pattern) return { matches: [], error: null, isValid: true, matchCount: 0, replaced: null };

    let regex: RegExp;
    try {
      regex = new RegExp(pattern, flagString);
    } catch (e) {
      return {
        matches: [], matchCount: 0, replaced: null,
        isValid: false,
        error: e instanceof Error ? e.message : 'Invalid regular expression',
      };
    }

    const matches: RegexMatch[] = [];

    if (flags.has('g')) {
      let match: RegExpExecArray | null;
      let safety = 0;
      const r = new RegExp(pattern, flagString);
      while ((match = r.exec(testText)) !== null && safety++ < 1000) {
        matches.push({
          value:  match[0],
          index:  match.index,
          end:    match.index + match[0].length,
          groups: match.groups ?? null,
        });
        if (match[0].length === 0) r.lastIndex++; // prevent infinite loop on zero-length match
      }
    } else {
      const match = regex.exec(testText);
      if (match) {
        matches.push({
          value:  match[0],
          index:  match.index,
          end:    match.index + match[0].length,
          groups: match.groups ?? null,
        });
      }
    }

    let replaced: string | null = null;
    if (showReplace && pattern) {
      try {
        replaced = testText.replace(new RegExp(pattern, flagString), replacement);
      } catch {
        replaced = null;
      }
    }

    return { matches, matchCount: matches.length, error: null, isValid: true, replaced };
  }, [pattern, testText, flagString, replacement, showReplace]);

  // Build highlighted HTML from matches
  const highlightedHtml = useMemo(() => {
    if (!testText) return '';
    if (result.error || result.matches.length === 0) {
      return escHtml(testText);
    }

    let out = '';
    let cursor = 0;
    const colors = ['#d97706', '#2563eb', '#7c3aed', '#059669', '#dc2626'];

    for (let i = 0; i < result.matches.length; i++) {
      const m = result.matches[i];
      if (m.index > cursor) out += escHtml(testText.slice(cursor, m.index));
      const bg = hexToRgba(colors[i % colors.length], 0.22);
      const border = colors[i % colors.length];
      out += `<mark style="background:${bg};border-bottom:2px solid ${border};border-radius:2px;padding:0 1px;">${escHtml(m.value)}</mark>`;
      cursor = m.end;
    }
    if (cursor < testText.length) out += escHtml(testText.slice(cursor));
    return out.replace(/\n/g, '<br>');
  }, [testText, result]);

  return {
    pattern, setPattern,
    testText, setTestText,
    flags, toggleFlag,
    replacement, setReplacement,
    showReplace, setShowReplace,
    result, highlightedHtml,
  };
}

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
