import { useState, useMemo } from 'react';

const IcoCopy  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoX     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

interface ReplaceResult {
  output: string;
  count: number;
  error: string | null;
}

function doReplace(text: string, find: string, replace: string, useRegex: boolean, caseInsensitive: boolean, global: boolean, multiline: boolean): ReplaceResult {
  if (!text || !find) return { output: text, count: 0, error: null };
  try {
    let flags = '';
    if (global)         flags += 'g';
    if (caseInsensitive) flags += 'i';
    if (multiline)       flags += 'm';
    const pattern = useRegex ? find : find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(pattern, flags);
    let count = 0;
    const output = text.replace(re, (m, ...args) => { count++; return replace.replace(/\$(\d+)/g, (_, n) => args[parseInt(n) - 1] ?? ''); });
    return { output, count, error: null };
  } catch (e) {
    return { output: text, count: 0, error: (e as Error).message };
  }
}

export default function FindAndReplaceWidget() {
  const [input,     setInput]     = useState('');
  const [find,      setFind]      = useState('');
  const [replace,   setReplace]   = useState('');
  const [useRegex,  setUseRegex]  = useState(false);
  const [ciFlag,    setCiFlag]    = useState(false);
  const [globalFlag, setGlobalFlag] = useState(true);
  const [multiline,  setMultiline]  = useState(false);
  const [copied,    setCopied]    = useState(false);

  const result = useMemo(
    () => doReplace(input, find, replace, useRegex, ciFlag, globalFlag, multiline),
    [input, find, replace, useRegex, ciFlag, globalFlag, multiline]
  );

  const copy = () => {
    if (!result.output) return;
    navigator.clipboard.writeText(result.output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const toggleStyle = (active: boolean): React.CSSProperties => ({
    padding: '4px 10px', borderRadius: 'var(--r-s)',
    border: `1.5px solid ${active ? 'var(--green)' : 'var(--border)'}`,
    background: active ? 'var(--green-lt)' : 'var(--white)',
    color: active ? 'var(--green)' : 'var(--ink-2)',
    fontSize: 12, fontWeight: active ? 600 : 500, cursor: 'pointer', transition: 'all .14s',
  });

  const fieldStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    padding: '8px 12px', border: '1.5px solid var(--border)',
    borderRadius: 'var(--r-m)', background: 'var(--white)',
    color: 'var(--ink)', fontSize: 13, outline: 'none',
    fontFamily: useRegex ? 'JetBrains Mono, monospace' : 'inherit',
    transition: 'border-color .15s',
  };

  return (
    <div>
      {/* Find / Replace fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 5 }}>Find</label>
          <input
            value={find} onChange={e => setFind(e.target.value)}
            placeholder={useRegex ? 'regex pattern…' : 'search text…'}
            style={{ ...fieldStyle, borderColor: result.error ? '#dc2626' : 'var(--border)' }}
          />
          {result.error && <div style={{ fontSize: 11, color: '#dc2626', marginTop: 4 }}>{result.error}</div>}
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 5 }}>Replace with</label>
          <input
            value={replace} onChange={e => setReplace(e.target.value)}
            placeholder={useRegex ? 'replacement ($1, $2…)' : 'replacement text…'}
            style={fieldStyle}
          />
        </div>
      </div>

      {/* Flags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 14 }}>
        <button onClick={() => setUseRegex(!useRegex)}   style={toggleStyle(useRegex)}>Regex</button>
        <button onClick={() => setCiFlag(!ciFlag)}         style={toggleStyle(ciFlag)}>Case-insensitive</button>
        <button onClick={() => setGlobalFlag(!globalFlag)} style={toggleStyle(globalFlag)}>Global (all)</button>
        <button onClick={() => setMultiline(!multiline)}   style={toggleStyle(multiline)}>Multiline (^$)</button>
      </div>

      {/* Input / Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
            value={input} onChange={e => setInput(e.target.value)}
            placeholder="Paste your text here…"
            rows={10}
            style={{
              width: '100%', boxSizing: 'border-box', padding: '10px 12px',
              border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
              background: 'var(--white)', color: 'var(--ink)', fontSize: 13,
              lineHeight: 1.6, resize: 'vertical', outline: 'none', fontFamily: 'inherit',
            }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Output</span>
            <button
              onClick={copy} disabled={!result.output || !!result.error}
              style={{
                display: 'flex', alignItems: 'center', gap: 4, padding: '3px 10px',
                borderRadius: 'var(--r-s)', border: 'none',
                background: copied ? 'var(--green)' : 'var(--ink)', color: '#fff',
                fontSize: 11, fontWeight: 600, cursor: (result.output && !result.error) ? 'pointer' : 'not-allowed',
                opacity: (result.output && !result.error) ? 1 : 0.4,
              }}
            >
              {copied ? <IcoCheck /> : <IcoCopy />} {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <textarea
            readOnly value={result.error ? '' : result.output}
            placeholder="Result appears here…"
            rows={10}
            style={{
              width: '100%', boxSizing: 'border-box', padding: '10px 12px',
              border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
              background: 'var(--page-bg)', color: 'var(--ink)', fontSize: 13,
              lineHeight: 1.6, resize: 'vertical', outline: 'none', fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* Stats */}
      {result.count > 0 && !result.error && (
        <div style={{ marginTop: 10, fontSize: 12, color: 'var(--ink-3)' }}>
          <span style={{ fontWeight: 700, color: 'var(--green)', fontFamily: 'JetBrains Mono, monospace' }}>{result.count}</span>
          {' '}replacement{result.count !== 1 ? 's' : ''} made
        </div>
      )}
    </div>
  );
}
