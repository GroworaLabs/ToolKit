import { useState, useMemo } from 'react';

const IcoCopy  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoX     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

type SortMode = 'alpha-asc' | 'alpha-desc' | 'len-asc' | 'len-desc' | 'num-asc' | 'num-desc';

function getLeadingNum(s: string): number {
  const m = s.match(/^-?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : Infinity;
}

function sortLines(text: string, mode: SortMode, ci: boolean, removeDups: boolean, removeBlank: boolean): string {
  let lines = text.split('\n');
  if (removeBlank) lines = lines.filter(l => l.trim() !== '');

  lines.sort((a, b) => {
    const ka = ci ? a.toLowerCase() : a;
    const kb = ci ? b.toLowerCase() : b;
    switch (mode) {
      case 'alpha-asc':  return ka.localeCompare(kb);
      case 'alpha-desc': return kb.localeCompare(ka);
      case 'len-asc':    return a.length - b.length || ka.localeCompare(kb);
      case 'len-desc':   return b.length - a.length || ka.localeCompare(kb);
      case 'num-asc':    return getLeadingNum(a) - getLeadingNum(b);
      case 'num-desc':   return getLeadingNum(b) - getLeadingNum(a);
      default:           return 0;
    }
  });

  if (removeDups) {
    const seen = new Set<string>();
    lines = lines.filter(l => {
      const key = ci ? l.toLowerCase() : l;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  return lines.join('\n');
}

const MODES: { id: SortMode; label: string }[] = [
  { id: 'alpha-asc',  label: 'A → Z'          },
  { id: 'alpha-desc', label: 'Z → A'          },
  { id: 'len-asc',    label: 'Shortest first' },
  { id: 'len-desc',   label: 'Longest first'  },
  { id: 'num-asc',    label: 'Numeric ↑'      },
  { id: 'num-desc',   label: 'Numeric ↓'      },
];

export default function SortLinesWidget() {
  const [input,       setInput]       = useState('');
  const [mode,        setMode]        = useState<SortMode>('alpha-asc');
  const [ci,          setCi]          = useState(false);
  const [removeDups,  setRemoveDups]  = useState(false);
  const [removeBlank, setRemoveBlank] = useState(false);
  const [copied,      setCopied]      = useState(false);

  const output = useMemo(
    () => input ? sortLines(input, mode, ci, removeDups, removeBlank) : '',
    [input, mode, ci, removeDups, removeBlank]
  );

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const btnBase: React.CSSProperties = {
    padding: '5px 10px', borderRadius: 'var(--r-s)',
    border: '1.5px solid var(--border)', background: 'var(--white)',
    color: 'var(--ink-2)', fontSize: 12, fontWeight: 500, cursor: 'pointer', transition: 'all .14s',
  };
  const btnActive: React.CSSProperties = {
    ...btnBase, border: '1.5px solid var(--green)', background: 'var(--green-lt)',
    color: 'var(--green)', fontWeight: 600,
  };
  const toggleStyle = (active: boolean): React.CSSProperties =>
    active ? btnActive : btnBase;

  return (
    <div>
      {/* Sort mode */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Sort mode</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {MODES.map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={mode === m.id ? btnActive : btnBase}>{m.label}</button>
          ))}
        </div>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        <button onClick={() => setCi(!ci)}           style={toggleStyle(ci)}>Case-insensitive</button>
        <button onClick={() => setRemoveDups(!removeDups)} style={toggleStyle(removeDups)}>Remove duplicates</button>
        <button onClick={() => setRemoveBlank(!removeBlank)} style={toggleStyle(removeBlank)}>Remove blank lines</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* Input */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Input</span>
            {input && (
              <button onClick={() => setInput('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-4)', padding: 2, display: 'flex' }}>
                <IcoX />
              </button>
            )}
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={"banana\napple\ncherry\ndate\napple"}
            rows={10}
            style={{
              width: '100%', boxSizing: 'border-box', padding: '10px 12px',
              border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
              background: 'var(--white)', color: 'var(--ink)', fontSize: 13,
              lineHeight: 1.6, resize: 'vertical', outline: 'none',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          />
        </div>

        {/* Output */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Output</span>
            <button
              onClick={copy} disabled={!output}
              style={{
                display: 'flex', alignItems: 'center', gap: 4, padding: '3px 10px',
                borderRadius: 'var(--r-s)', border: 'none',
                background: copied ? 'var(--green)' : 'var(--ink)', color: '#fff',
                fontSize: 11, fontWeight: 600, cursor: output ? 'pointer' : 'not-allowed', opacity: output ? 1 : 0.4,
              }}
            >
              {copied ? <IcoCheck /> : <IcoCopy />} {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <textarea
            readOnly value={output}
            placeholder="Sorted result appears here…"
            rows={10}
            style={{
              width: '100%', boxSizing: 'border-box', padding: '10px 12px',
              border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
              background: 'var(--page-bg)', color: 'var(--ink)', fontSize: 13,
              lineHeight: 1.6, resize: 'vertical', outline: 'none',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          />
        </div>
      </div>

      {output && (
        <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
          <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>
            <span style={{ fontWeight: 700, color: 'var(--ink)', fontFamily: 'JetBrains Mono, monospace' }}>
              {output.split('\n').filter(Boolean).length}
            </span>{' '}lines
          </div>
        </div>
      )}
    </div>
  );
}
