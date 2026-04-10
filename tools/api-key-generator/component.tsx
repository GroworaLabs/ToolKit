import { useState, useCallback } from 'react';

const IcoCopy    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoRefresh = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>;

const FORMATS = [
  { id: 'prefixed',  label: 'Prefixed',     example: 'sk_a1b2c3d4e5f6…',    desc: 'Stripe-style prefixed key' },
  { id: 'uuid',      label: 'UUID v4',       example: 'xxxxxxxx-xxxx-4xxx…',  desc: '128-bit random UUID' },
  { id: 'hex32',     label: 'Hex 32',        example: 'a1b2c3d4e5f6…(32ch)', desc: '128-bit hex string' },
  { id: 'hex64',     label: 'Hex 64',        example: 'a1b2c3d4e5f6…(64ch)', desc: '256-bit hex string' },
  { id: 'base64url', label: 'Base64url',     example: 'A1B2C3-D4E5_F6…',     desc: 'URL-safe Base64, no padding' },
];

function randHex(bytes: number) {
  return Array.from(crypto.getRandomValues(new Uint8Array(bytes))).map(b => b.toString(16).padStart(2, '0')).join('');
}

function makeKey(format: string, prefix: string): string {
  const pfx = (prefix || 'sk').replace(/[^a-zA-Z0-9_]/g, '').slice(0, 12) || 'sk';
  switch (format) {
    case 'prefixed':  return `${pfx}_${randHex(24)}`;
    case 'uuid':      return crypto.randomUUID();
    case 'hex32':     return randHex(16);
    case 'hex64':     return randHex(32);
    case 'base64url': {
      const bytes = crypto.getRandomValues(new Uint8Array(32));
      return btoa(String.fromCharCode(...Array.from(bytes))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    default: return randHex(32);
  }
}

export default function ApiKeyGeneratorWidget() {
  const [format,   setFormat]   = useState('prefixed');
  const [prefix,   setPrefix]   = useState('sk');
  const [count,    setCount]    = useState(1);
  const [countStr, setCountStr] = useState('1');
  const [keys,     setKeys]     = useState<string[]>(() => [makeKey('prefixed', 'sk')]);
  const [copied,   setCopied]   = useState<string | null>(null);

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

  const generate = useCallback(() => {
    setKeys(Array.from({ length: count }, () => makeKey(format, prefix)));
    setCopied(null);
  }, [format, prefix, count]);

  const copy = (k: string) => { navigator.clipboard.writeText(k); setCopied(k); setTimeout(() => setCopied(null), 1800); };
  const copyAll = () => { navigator.clipboard.writeText(keys.join('\n')); setCopied('all'); setTimeout(() => setCopied(null), 1800); };

  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: '8px 12px', border: `1.5px solid ${active ? 'rgba(5,150,105,.35)' : 'var(--border)'}`,
    borderRadius: 'var(--r-s)', fontSize: 12, fontWeight: 600, cursor: 'pointer', textAlign: 'left',
    background: active ? 'var(--green-lt)' : 'var(--white)', color: active ? 'var(--green)' : 'var(--ink-2)',
    transition: 'all .12s',
  });

  return (
    <div>
      {/* Format grid */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>Format</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 6 }}>
          {FORMATS.map(f => (
            <button key={f.id} onClick={() => setFormat(f.id)} style={btnStyle(format === f.id)}>
              <div style={{ fontSize: 13 }}>{f.label}</div>
              <div style={{ fontSize: 10, fontWeight: 400, marginTop: 2, color: format === f.id ? 'var(--green)' : 'var(--ink-4)', fontFamily: 'JetBrains Mono, monospace' }}>{f.example}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Prefix (shown only for prefixed format) */}
      {format === 'prefixed' && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', display: 'block', marginBottom: 6 }}>
            Prefix <span style={{ color: 'var(--ink-4)', fontWeight: 400 }}>(e.g. sk, pk, api, live)</span>
          </label>
          <input
            type="text" value={prefix} onChange={e => setPrefix(e.target.value.replace(/[^a-zA-Z0-9_]/g, '').slice(0, 12))}
            placeholder="sk"
            style={{ width: '100%', padding: '9px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)', background: 'var(--white)', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
      )}

      {/* Count */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Count</span>
        <input
          type="number" min={1} max={20}
          value={countStr}
          onChange={handleCountChange}
          onBlur={handleCountBlur}
          inputMode="numeric"
          style={{ width: 64, padding: '7px 10px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-s)', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)', background: 'var(--white)', outline: 'none' }}
        />
      </div>

      <button className="btn-main" onClick={generate} style={{ marginBottom: 14 }}>
        <IcoRefresh /> Generate
      </button>

      {/* Keys list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
        {keys.map((k, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'var(--page-bg)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)' }}>
            <span style={{ flex: 1, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink)', wordBreak: 'break-all', lineHeight: 1.5 }}>{k}</span>
            <button onClick={() => copy(k)} className={`btn-icon${copied === k ? ' copied' : ''}`} style={{ flexShrink: 0 }}>
              {copied === k ? <IcoCheck /> : <IcoCopy />}
            </button>
          </div>
        ))}
      </div>
      {keys.length > 1 && (
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
