import { useState, useMemo } from 'react';

const IcoCopy  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoX     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

type Mode = 'characters' | 'words' | 'lines';

function reverseText(text: string, mode: Mode): string {
  if (!text) return '';
  if (mode === 'characters') {
    return [...text].reverse().join('');
  }
  if (mode === 'words') {
    return text.split(/(\s+)/).reverse().join('');
  }
  // lines
  return text.split('\n').reverse().join('\n');
}

const MODES: { id: Mode; label: string; desc: string }[] = [
  { id: 'characters', label: 'Characters', desc: 'Reverse every character' },
  { id: 'words',      label: 'Words',      desc: 'Reverse word order'      },
  { id: 'lines',      label: 'Lines',      desc: 'Reverse line order'      },
];

export default function ReverseTextWidget() {
  const [input,  setInput]  = useState('');
  const [mode,   setMode]   = useState<Mode>('characters');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => reverseText(input, mode), [input, mode]);

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const btnBase: React.CSSProperties = {
    padding: '7px 14px', borderRadius: 'var(--r-s)',
    border: '1.5px solid var(--border)', background: 'var(--white)',
    color: 'var(--ink-2)', fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all .14s',
  };
  const btnActive: React.CSSProperties = {
    ...btnBase, border: '1.5px solid var(--green)', background: 'var(--green-lt)',
    color: 'var(--green)', fontWeight: 600,
  };

  return (
    <div>
      {/* Mode selector */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Reversal mode</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {MODES.map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={mode === m.id ? btnActive : btnBase}
              title={m.desc}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div style={{ position: 'relative', marginBottom: 14 }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type or paste text to reverse…"
          rows={4}
          style={{
            width: '100%', boxSizing: 'border-box',
            padding: '12px 38px 12px 14px',
            border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
            background: 'var(--white)', color: 'var(--ink)',
            fontSize: 14, lineHeight: 1.6, resize: 'vertical', outline: 'none', fontFamily: 'inherit',
          }}
        />
        {input && (
          <button onClick={() => setInput('')} title="Clear"
            style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-4)', padding: 4 }}>
            <IcoX />
          </button>
        )}
      </div>

      {/* Output */}
      <div style={{ position: 'relative', marginBottom: 10 }}>
        <div style={{
          padding: '12px 14px',
          background: output ? 'var(--green-lt)' : 'var(--page-bg)',
          border: `1.5px solid ${output ? 'var(--green-mid, var(--green))' : 'var(--border)'}`,
          borderRadius: 'var(--r-m)',
          minHeight: 80,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          fontSize: 14,
          lineHeight: 1.6,
          color: output ? 'var(--ink)' : 'var(--ink-4)',
          fontFamily: mode === 'characters' ? 'JetBrains Mono, monospace' : 'inherit',
        }}>
          {output || 'Reversed text appears here'}
        </div>
        <button
          onClick={copy} disabled={!output}
          style={{
            position: 'absolute', top: 10, right: 10,
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '5px 10px', borderRadius: 'var(--r-s)', border: 'none',
            background: copied ? 'var(--green)' : 'var(--ink)', color: '#fff',
            fontSize: 12, fontWeight: 600, cursor: output ? 'pointer' : 'not-allowed', opacity: output ? 1 : 0.4,
            transition: 'background .15s',
          }}
        >
          {copied ? <IcoCheck /> : <IcoCopy />} {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Example */}
      {!input && (
        <div style={{ fontSize: 12, color: 'var(--ink-4)', display: 'flex', gap: 8, alignItems: 'center' }}>
          <span>Example:</span>
          {[
            { mode: 'characters', ex: '"Hello World" → "dlroW olleH"' },
            { mode: 'words',      ex: '"Hello World" → "World Hello"' },
            { mode: 'lines',      ex: '"Line 1\\nLine 2" → "Line 2\\nLine 1"' },
          ].find(e => e.mode === mode) && (
            <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>
              {[
                { mode: 'characters', ex: '"Hello World" → "dlroW olleH"' },
                { mode: 'words',      ex: '"Hello World" → "World Hello"' },
                { mode: 'lines',      ex: '"Line 1 / Line 2" → "Line 2 / Line 1"' },
              ].find(e => e.mode === mode)?.ex}
            </code>
          )}
        </div>
      )}
    </div>
  );
}
