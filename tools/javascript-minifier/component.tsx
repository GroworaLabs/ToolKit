'use client';
import { useState, useCallback } from 'react';

function formatBytes(n: number): string {
  if (n < 1024) return n + ' B';
  return (n / 1024).toFixed(1) + ' KB';
}

const REGEX_KEYWORDS = new Set([
  'return', 'typeof', 'void', 'delete', 'throw', 'new', 'in', 'instanceof', 'of', 'case',
]);

const isIdentChar = (c: string) => /[a-zA-Z0-9_$]/.test(c);

function minifyJS(src: string): string {
  let out = '';
  let i = 0;
  const len = src.length;
  let lastWord = ''; // last identifier token — O(1) keyword lookup

  const couldBeRegex = (): boolean => {
    if (!out) return true;
    const last = out[out.length - 1];
    if (last === ')' || last === ']') return false;
    if (/[0-9]/.test(last)) return false;
    if (isIdentChar(last)) return REGEX_KEYWORDS.has(lastWord);
    return true; // after operator/punctuation
  };

  while (i < len) {
    const ch = src[i];

    // Line comment — always a comment, never regex
    if (ch === '/' && src[i + 1] === '/') {
      while (i < len && src[i] !== '\n') i++;
      continue;
    }

    // Block comment
    if (ch === '/' && src[i + 1] === '*') {
      i += 2;
      while (i < len - 1 && !(src[i] === '*' && src[i + 1] === '/')) i++;
      i += 2;
      continue;
    }

    // String double-quote
    if (ch === '"') {
      out += '"'; i++;
      while (i < len && src[i] !== '"') {
        if (src[i] === '\\') { out += src[i] + (src[i + 1] ?? ''); i += 2; continue; }
        out += src[i++];
      }
      if (i < len) { out += '"'; i++; }
      lastWord = '';
      continue;
    }

    // String single-quote
    if (ch === "'") {
      out += "'"; i++;
      while (i < len && src[i] !== "'") {
        if (src[i] === '\\') { out += src[i] + (src[i + 1] ?? ''); i += 2; continue; }
        out += src[i++];
      }
      if (i < len) { out += "'"; i++; }
      lastWord = '';
      continue;
    }

    // Template literal
    if (ch === '`') {
      out += '`'; i++;
      while (i < len) {
        if (src[i] === '\\') { out += src[i] + (src[i + 1] ?? ''); i += 2; continue; }
        if (src[i] === '$' && src[i + 1] === '{') {
          out += '${'; i += 2;
          let depth = 1;
          while (i < len && depth > 0) {
            if (src[i] === '{') depth++;
            else if (src[i] === '}') { depth--; if (depth === 0) break; }
            out += src[i++];
          }
          out += '}'; if (i < len) i++;
          continue;
        }
        if (src[i] === '`') { out += '`'; i++; break; }
        out += src[i++];
      }
      lastWord = '';
      continue;
    }

    // Regex literal
    if (ch === '/' && src[i + 1] !== '/' && src[i + 1] !== '*' && couldBeRegex()) {
      out += '/'; i++;
      while (i < len && src[i] !== '/' && src[i] !== '\n') {
        if (src[i] === '\\') { out += src[i] + (src[i + 1] ?? ''); i += 2; continue; }
        if (src[i] === '[') {
          out += '['; i++;
          while (i < len && src[i] !== ']') {
            if (src[i] === '\\') { out += src[i] + (src[i + 1] ?? ''); i += 2; continue; }
            out += src[i++];
          }
          if (i < len) { out += src[i++]; }
          continue;
        }
        out += src[i++];
      }
      if (i < len && src[i] === '/') { out += '/'; i++; }
      while (i < len && /[gimsuy]/.test(src[i])) { out += src[i++]; }
      lastWord = '';
      continue;
    }

    // Whitespace — collapse, keep one space between adjacent identifiers
    if (/\s/.test(ch)) {
      while (i < len && /\s/.test(src[i])) i++;
      const nextCh = src[i] ?? '';
      const lastCh = out[out.length - 1] ?? '';
      if (lastCh && nextCh && isIdentChar(lastCh) && isIdentChar(nextCh)) out += ' ';
      continue;
    }

    // Identifier — track as lastWord for regex detection
    if (isIdentChar(ch)) {
      let word = '';
      while (i < len && isIdentChar(src[i])) { word += src[i++]; }
      out += word;
      lastWord = word;
      continue;
    }

    // Everything else — operator, punctuation
    out += ch;
    lastWord = '';
    i++;
  }

  return out.trim();
}

const SAMPLE = `// Calculate fibonacci numbers
function fibonacci(n) {
  /* Base cases */
  if (n <= 0) return 0;
  if (n === 1) return 1;

  // Iterative approach for performance
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  return curr;
}

const results = Array.from({ length: 10 }, (_, i) => fibonacci(i));
console.log('Fibonacci sequence:', results);
`;

export default function JavaScriptMinifier() {
  const [input,  setInput]  = useState(SAMPLE);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error,  setError]  = useState('');

  const run = useCallback(() => {
    setError('');
    try {
      setOutput(minifyJS(input));
    } catch (e) {
      setError(String(e));
    }
  }, [input]);

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const clear = () => { setInput(''); setOutput(''); setError(''); };

  const origBytes = new TextEncoder().encode(input).length;
  const minBytes  = new TextEncoder().encode(output).length;
  const saved     = origBytes > 0 && output ? Math.round((1 - minBytes / origBytes) * 100) : 0;
  const statColor = saved >= 20 ? 'var(--green)' : 'var(--ink-3)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {output && (
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--ink-2)' }}>
          <span>Original: <strong style={{ color: 'var(--ink)' }}>{formatBytes(origBytes)}</strong></span>
          <span>Minified: <strong style={{ color: 'var(--ink)' }}>{formatBytes(minBytes)}</strong></span>
          <span>Saved: <strong style={{ color: statColor }}>{saved}%</strong></span>
        </div>
      )}

      <div className="tk-token-split">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Input JS</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            spellCheck={false}
            placeholder="Paste your JavaScript here…"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.6,
              padding: 12, border: '1.5px solid var(--border)', borderRadius: 8,
              resize: 'vertical', minHeight: 260, background: 'var(--surface)',
              color: 'var(--ink)', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Minified Output</label>
          <textarea
            readOnly
            value={output}
            spellCheck={false}
            placeholder="Minified code appears here…"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.6,
              padding: 12, border: '1.5px solid var(--border)', borderRadius: 8,
              resize: 'vertical', minHeight: 260, background: 'var(--surface)',
              color: 'var(--ink)', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
        </div>
      </div>

      {error && <p style={{ margin: 0, color: '#c0392b', fontSize: 13 }}>{error}</p>}

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button onClick={run}
          style={{ padding: '9px 22px', borderRadius: 8, background: 'var(--bg-accent)', color: '#fff',
            border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', minHeight: 44 }}>
          Minify →
        </button>
        <button onClick={copy} disabled={!output}
          style={{ padding: '9px 18px', borderRadius: 8, border: '1.5px solid var(--border)',
            background: 'var(--white)', color: 'var(--ink-2)', fontWeight: 500, fontSize: 13,
            cursor: output ? 'pointer' : 'not-allowed', opacity: output ? 1 : 0.5, minHeight: 44 }}>
          {copied ? 'Copied!' : 'Copy JS'}
        </button>
        <button onClick={clear}
          style={{ padding: '9px 18px', borderRadius: 8, border: '1.5px solid var(--border)',
            background: 'var(--white)', color: 'var(--ink-2)', fontWeight: 500, fontSize: 13,
            cursor: 'pointer', minHeight: 44 }}>
          Clear
        </button>
      </div>
    </div>
  );
}
