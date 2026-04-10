import { useState, useCallback } from 'react';

const IcoCopy    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoRefresh = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>;

const FORMATS = [
  { id: 'hex',          label: 'Hex',        desc: 'Lowercase hex (0–9, a–f)' },
  { id: 'base64',       label: 'Base64',     desc: 'Standard Base64 (A–Z, a–z, 0–9, +, /)' },
  { id: 'base64url',    label: 'Base64url',  desc: 'URL-safe Base64 (no +, /, = padding)' },
  { id: 'alphanumeric', label: 'Alphanum',   desc: 'Letters and digits only (A–Z, a–z, 0–9)' },
];

const LENGTHS = [16, 24, 32, 48, 64];

function generateToken(bytes: number, format: string): string {
  const arr = crypto.getRandomValues(new Uint8Array(bytes));
  if (format === 'hex')  return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
  if (format === 'base64') return btoa(String.fromCharCode(...Array.from(arr)));
  if (format === 'base64url') return btoa(String.fromCharCode(...Array.from(arr))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  if (format === 'alphanumeric') {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(arr).map(b => chars[b % chars.length]).join('');
  }
  return '';
}

export default function RandomTokenWidget() {
  const [bytes,     setBytes]     = useState(32);
  const [format,    setFormat]    = useState('hex');
  const [tokens,    setTokens]    = useState<string[]>(() => [generateToken(32, 'hex')]);
  const [count,     setCount]     = useState(1);
  const [countStr,  setCountStr]  = useState('1');
  const [copied,    setCopied]    = useState<string | null>(null);

  const generate = useCallback(() => {
    setTokens(Array.from({ length: count }, () => generateToken(bytes, format)));
  }, [bytes, format, count]);

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountStr(e.target.value);
    const n = parseInt(e.target.value, 10);
    if (!isNaN(n) && n >= 1 && n <= 20) setCount(n);
  };

  const handleCountBlur = () => {
    const n = parseInt(countStr, 10);
    const clamped = isNaN(n) ? 1 : Math.min(20, Math.max(1, n));
    setCountStr(String(clamped));
    setCount(clamped);
  };

  const copy = (t: string) => { navigator.clipboard.writeText(t); setCopied(t); setTimeout(() => setCopied(null), 1800); };
  const copyAll = () => { navigator.clipboard.writeText(tokens.join('\n')); setCopied('all'); setTimeout(() => setCopied(null), 1800); };

  const entropy = Math.round(bytes * 8);

  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: '6px 12px', border: `1.5px solid ${active ? 'rgba(5,150,105,.35)' : 'var(--border)'}`,
    borderRadius: 'var(--r-s)', fontSize: 12, fontWeight: 600, cursor: 'pointer',
    background: active ? 'var(--green-lt)' : 'var(--white)', color: active ? 'var(--green)' : 'var(--ink-2)',
    transition: 'all .12s',
  });

  return (
    <div>
      {/* Byte length */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>
          Bytes &nbsp;<span style={{ fontSize: 11, fontWeight: 500, color: 'var(--ink-4)' }}>({entropy} bits of entropy)</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {LENGTHS.map(n => (
            <button key={n} style={btnStyle(bytes === n)} onClick={() => setBytes(n)}>{n}</button>
          ))}
          <input
            type="number" min={8} max={256} value={bytes}
            onChange={e => setBytes(Math.min(256, Math.max(8, +e.target.value)))}
            style={{ width: 72, padding: '6px 10px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-s)', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)', background: 'var(--white)', outline: 'none' }}
            placeholder="custom"
          />
        </div>
      </div>

      {/* Format */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>Format</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 6 }}>
          {FORMATS.map(f => (
            <button key={f.id} onClick={() => setFormat(f.id)} style={{ ...btnStyle(format === f.id), textAlign: 'left', padding: '8px 12px' }}>
              <div>{f.label}</div>
              <div style={{ fontSize: 10, fontWeight: 400, color: format === f.id ? 'var(--green)' : 'var(--ink-4)', marginTop: 2, lineHeight: 1.4 }}>{f.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Count</span>
        <input
          type="number" min={1} max={20}
          value={countStr}
          onChange={handleCountChange}
          onBlur={handleCountBlur}
          inputMode="numeric"
          style={{ width: 64, padding: '6px 10px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-s)', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)', background: 'var(--white)', outline: 'none' }}
        />
      </div>

      {/* Generate */}
      <button className="btn-main" onClick={generate} style={{ marginBottom: 14 }}>
        <IcoRefresh /> Generate
      </button>

      {/* Tokens */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
        {tokens.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'var(--page-bg)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)' }}>
            <span style={{ flex: 1, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink)', wordBreak: 'break-all', lineHeight: 1.5 }}>{t}</span>
            <button onClick={() => copy(t)} className={`btn-icon${copied === t ? ' copied' : ''}`} style={{ flexShrink: 0 }}>
              {copied === t ? <IcoCheck /> : <IcoCopy />}
            </button>
          </div>
        ))}
      </div>
      {tokens.length > 1 && (
        <button
          onClick={copyAll}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '8px 16px',
            border: `1.5px solid ${copied === 'all' ? 'var(--green)' : 'var(--border)'}`,
            borderRadius: 'var(--r-m)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            background: copied === 'all' ? 'var(--green)' : 'var(--white)',
            color: copied === 'all' ? '#fff' : 'var(--ink-2)',
            whiteSpace: 'nowrap', transition: 'all .14s',
          }}
        >
          {copied === 'all' ? <IcoCheck /> : <IcoCopy />}
          {copied === 'all' ? 'Copied!' : 'Copy all'}
        </button>
      )}

      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontSize: 12, color: 'var(--ink-4)' }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Generated via Web Crypto API · never sent to a server
      </div>
    </div>
  );
}
