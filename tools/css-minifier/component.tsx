'use client';
import { useState, useCallback } from 'react';

function formatBytes(n: number): string {
  if (n < 1024) return n + ' B';
  return (n / 1024).toFixed(1) + ' KB';
}

function minifyCSS(src: string): string {
  let out = '';
  let i = 0;
  const len = src.length;

  while (i < len) {
    // Block comment
    if (src[i] === '/' && src[i + 1] === '*') {
      i += 2;
      while (i < len - 1 && !(src[i] === '*' && src[i + 1] === '/')) i++;
      i += 2;
      continue;
    }

    // String (inside url(), content, etc.)
    if (src[i] === '"' || src[i] === "'") {
      const q = src[i];
      out += q; i++;
      while (i < len && src[i] !== q) {
        if (src[i] === '\\') { out += src[i] + (src[i + 1] ?? ''); i += 2; continue; }
        out += src[i++];
      }
      if (i < len) { out += src[i++]; }
      continue;
    }

    // Whitespace
    if (/\s/.test(src[i])) {
      while (i < len && /\s/.test(src[i])) i++;
      const last = out[out.length - 1] ?? '';
      const next = src[i] ?? '';
      const noSpaceBefore = '{}:;,>+~('.includes(next);
      const noSpaceAfter  = '{}:;,>+~('.includes(last);
      if (!noSpaceBefore && !noSpaceAfter && last && next) out += ' ';
      continue;
    }

    // Strip trailing semicolons before }
    if (src[i] === ';') {
      let j = i + 1;
      while (j < len && /\s/.test(src[j])) j++;
      if (src[j] === '}') { i++; continue; }
      out += ';'; i++;
      continue;
    }

    out += src[i++];
  }

  return out.trim();
}

function beautifyCSS(src: string): string {
  const min = minifyCSS(src);
  let out = '';
  let depth = 0;
  const ind = (d: number) => '  '.repeat(d);

  for (let i = 0; i < min.length; i++) {
    const ch = min[i];

    if (ch === '{') {
      out += ' {\n';
      depth++;
      out += ind(depth);
      continue;
    }

    if (ch === '}') {
      out = out.trimEnd();
      depth = Math.max(0, depth - 1);
      out += '\n' + ind(depth) + '}\n\n';
      continue;
    }

    if (ch === ';') {
      out += ';\n' + ind(depth);
      continue;
    }

    if (ch === ',' && depth === 0) {
      // Selector list — each selector on own line
      out += ',\n';
      continue;
    }

    out += ch;
  }

  return out.trimEnd();
}

const SAMPLE = `/* Navigation styles */
.nav {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.nav__logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  text-decoration: none;
}

/* Responsive breakpoint */
@media (max-width: 768px) {
  .nav {
    flex-direction: column;
    padding: 8px 16px;
  }
}
`;

type Mode = 'minify' | 'beautify';

export default function CssMinifier() {
  const [input,  setInput]  = useState(SAMPLE);
  const [output, setOutput] = useState('');
  const [mode,   setMode]   = useState<Mode>('minify');
  const [copied, setCopied] = useState(false);

  const run = useCallback(() => {
    setOutput(mode === 'minify' ? minifyCSS(input) : beautifyCSS(input));
  }, [input, mode]);

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const clear = () => { setInput(''); setOutput(''); };

  const origBytes = new TextEncoder().encode(input).length;
  const outBytes  = new TextEncoder().encode(output).length;
  const saved     = mode === 'minify' && origBytes > 0 && output
    ? Math.round((1 - outBytes / origBytes) * 100)
    : null;
  const statColor = saved !== null && saved >= 20 ? 'var(--green)' : 'var(--ink-3)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Mode selector */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <label style={{ fontSize: 13, color: 'var(--ink-2)', whiteSpace: 'nowrap' }}>Mode</label>
        {(['minify', 'beautify'] as Mode[]).map(m => (
          <button key={m} onClick={() => setMode(m)}
            style={{ padding: '5px 16px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
              border: '1.5px solid', borderColor: mode === m ? 'var(--green)' : 'var(--border)',
              background: mode === m ? 'var(--green-lt)' : 'var(--white)',
              color: mode === m ? 'var(--green)' : 'var(--ink-2)',
              fontWeight: mode === m ? 600 : 400, minHeight: 36 }}>
            {m === 'minify' ? 'Minify' : 'Beautify'}
          </button>
        ))}
      </div>

      {/* Stats */}
      {output && (
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--ink-2)' }}>
          <span>Original: <strong style={{ color: 'var(--ink)' }}>{formatBytes(origBytes)}</strong></span>
          <span>Output: <strong style={{ color: 'var(--ink)' }}>{formatBytes(outBytes)}</strong></span>
          {saved !== null && (
            <span>Saved: <strong style={{ color: statColor }}>{saved}%</strong></span>
          )}
        </div>
      )}

      {/* Two panels */}
      <div className="tk-token-split">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Input CSS</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            spellCheck={false}
            placeholder="Paste your CSS here…"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.6,
              padding: 12, border: '1.5px solid var(--border)', borderRadius: 8,
              resize: 'vertical', minHeight: 260, background: 'var(--surface)',
              color: 'var(--ink)', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {mode === 'minify' ? 'Minified Output' : 'Beautified Output'}
          </label>
          <textarea
            readOnly
            value={output}
            spellCheck={false}
            placeholder={`${mode === 'minify' ? 'Minified' : 'Beautified'} CSS appears here…`}
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.6,
              padding: 12, border: '1.5px solid var(--border)', borderRadius: 8,
              resize: 'vertical', minHeight: 260, background: 'var(--surface)',
              color: 'var(--ink)', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button onClick={run}
          style={{ padding: '9px 22px', borderRadius: 8, background: 'var(--bg-accent)', color: '#fff',
            border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', minHeight: 44 }}>
          {mode === 'minify' ? 'Minify →' : 'Beautify →'}
        </button>
        <button onClick={copy} disabled={!output}
          style={{ padding: '9px 18px', borderRadius: 8, border: '1.5px solid var(--border)',
            background: 'var(--white)', color: 'var(--ink-2)', fontWeight: 500, fontSize: 13,
            cursor: output ? 'pointer' : 'not-allowed', opacity: output ? 1 : 0.5, minHeight: 44 }}>
          {copied ? 'Copied!' : 'Copy CSS'}
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
