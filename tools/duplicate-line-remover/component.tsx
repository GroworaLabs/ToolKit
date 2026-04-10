import { useState, useMemo } from 'react';

const IcoCopy  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoX     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

interface Options {
  caseInsensitive: boolean;
  removeBlank: boolean;
  sort: boolean;
  trim: boolean;
}

function deduplicate(text: string, opts: Options): { output: string; removed: number; kept: number } {
  const lines = text.split('\n');
  const seen = new Set<string>();
  const result: string[] = [];
  let removed = 0;

  for (const line of lines) {
    if (opts.removeBlank && line.trim() === '') { removed++; continue; }
    const key = opts.trim
      ? (opts.caseInsensitive ? line.trim().toLowerCase() : line.trim())
      : (opts.caseInsensitive ? line.toLowerCase() : line);
    if (seen.has(key)) { removed++; continue; }
    seen.add(key);
    result.push(line);
  }

  const sorted = opts.sort ? [...result].sort((a, b) => a.localeCompare(b)) : result;
  return { output: sorted.join('\n'), removed, kept: result.length };
}

export default function DuplicateLineRemoverWidget() {
  const [input,           setInput]           = useState('');
  const [caseInsensitive, setCaseInsensitive] = useState(false);
  const [removeBlank,     setRemoveBlank]     = useState(false);
  const [sort,            setSort]            = useState(false);
  const [trim,            setTrim]            = useState(false);
  const [copied,          setCopied]          = useState(false);

  const result = useMemo(
    () => input ? deduplicate(input, { caseInsensitive, removeBlank, sort, trim }) : null,
    [input, caseInsensitive, removeBlank, sort, trim]
  );

  const copy = () => {
    if (!result?.output) return;
    navigator.clipboard.writeText(result.output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const toggleStyle = (active: boolean): React.CSSProperties => ({
    padding: '5px 10px',
    borderRadius: 'var(--r-s)',
    border: `1.5px solid ${active ? 'var(--green)' : 'var(--border)'}`,
    background: active ? 'var(--green-lt)' : 'var(--white)',
    color: active ? 'var(--green)' : 'var(--ink-2)',
    fontSize: 12,
    fontWeight: active ? 600 : 500,
    cursor: 'pointer',
    transition: 'all .14s',
  });

  return (
    <div>
      {/* Options */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        {([
          { label: 'Case-insensitive', value: caseInsensitive, set: setCaseInsensitive },
          { label: 'Remove blank lines', value: removeBlank, set: setRemoveBlank },
          { label: 'Sort output', value: sort, set: setSort },
          { label: 'Trim whitespace', value: trim, set: setTrim },
        ] as const).map(({ label, value, set }) => (
          <button key={label} onClick={() => set(!value)} style={toggleStyle(value)}>{label}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* Input */}
        <div style={{ position: 'relative' }}>
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
            placeholder={"Paste text with duplicate lines…\napple\nbanana\napple\norange\nbanana"}
            rows={10}
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '10px 12px',
              border: '1.5px solid var(--border)',
              borderRadius: 'var(--r-m)',
              background: 'var(--white)',
              color: 'var(--ink)',
              fontSize: 13,
              lineHeight: 1.6,
              resize: 'vertical',
              outline: 'none',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          />
        </div>

        {/* Output */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Output</span>
            <button
              onClick={copy}
              disabled={!result?.output}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '3px 10px',
                borderRadius: 'var(--r-s)',
                border: 'none',
                background: copied ? 'var(--green)' : 'var(--ink)',
                color: '#fff',
                fontSize: 11,
                fontWeight: 600,
                cursor: result?.output ? 'pointer' : 'not-allowed',
                opacity: result?.output ? 1 : 0.4,
              }}
            >
              {copied ? <IcoCheck /> : <IcoCopy />} {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <textarea
            readOnly
            value={result?.output ?? ''}
            placeholder="Result appears here…"
            rows={10}
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '10px 12px',
              border: '1.5px solid var(--border)',
              borderRadius: 'var(--r-m)',
              background: 'var(--page-bg)',
              color: 'var(--ink)',
              fontSize: 13,
              lineHeight: 1.6,
              resize: 'vertical',
              outline: 'none',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          />
        </div>
      </div>

      {/* Stats */}
      {result && (
        <div style={{ display: 'flex', gap: 20, marginTop: 10, flexWrap: 'wrap' }}>
          {[
            { label: 'Lines kept',    value: result.kept,    color: 'var(--green)' },
            { label: 'Duplicates removed', value: result.removed, color: '#dc2626' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ fontSize: 12, color: 'var(--ink-3)' }}>
              <span style={{ fontWeight: 700, color, fontFamily: 'JetBrains Mono, monospace' }}>{value}</span>
              {' '}{label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
