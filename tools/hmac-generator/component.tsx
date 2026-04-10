import { useState, useEffect } from 'react';

const IcoCopy  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

const ALGOS = ['SHA-256', 'SHA-512'] as const;
type Algo = typeof ALGOS[number];

async function computeHmac(message: string, key: string, algo: Algo): Promise<{ hex: string; b64: string } | null> {
  if (!message || !key) return null;
  const enc = new TextEncoder();
  const k   = await crypto.subtle.importKey('raw', enc.encode(key), { name: 'HMAC', hash: algo }, false, ['sign']);
  const sig  = await crypto.subtle.sign('HMAC', k, enc.encode(message));
  const bytes = new Uint8Array(sig);
  const hex  = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  const b64  = btoa(String.fromCharCode(...Array.from(bytes)));
  return { hex, b64 };
}

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{label}</span>
        <button className={`btn-icon${copied ? ' copied' : ''}`} onClick={copy} style={{ padding: '3px 8px', fontSize: 11 }}>
          {copied ? <IcoCheck /> : <IcoCopy />}
        </button>
      </div>
      <div style={{ padding: '10px 14px', background: 'var(--page-bg)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)', wordBreak: 'break-all', lineHeight: 1.6 }}>
        {value}
      </div>
    </div>
  );
}

export default function HmacGeneratorWidget() {
  const [message, setMessage] = useState('');
  const [key,     setKey]     = useState('');
  const [algo,    setAlgo]    = useState<Algo>('SHA-256');
  const [result,  setResult]  = useState<{ hex: string; b64: string } | null>(null);
  const [error,   setError]   = useState('');

  useEffect(() => {
    if (!message || !key) { setResult(null); setError(''); return; }
    computeHmac(message, key, algo)
      .then(r => { setResult(r); setError(''); })
      .catch(e => setError(String(e)));
  }, [message, key, algo]);

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
    fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)', background: 'var(--white)',
    outline: 'none', boxSizing: 'border-box', lineHeight: 1.6,
  };

  return (
    <div>
      {/* Algorithm */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>Algorithm</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {ALGOS.map(a => (
            <button key={a} onClick={() => setAlgo(a)} style={{
              padding: '7px 16px', border: `1.5px solid ${algo === a ? 'rgba(5,150,105,.35)' : 'var(--border)'}`,
              borderRadius: 'var(--r-s)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: algo === a ? 'var(--green-lt)' : 'var(--white)', color: algo === a ? 'var(--green)' : 'var(--ink-2)',
              fontFamily: 'JetBrains Mono, monospace',
            }}>{a}</button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', display: 'block', marginBottom: 6 }}>Message</label>
        <textarea
          value={message} onChange={e => setMessage(e.target.value)}
          placeholder="Enter the message to sign…"
          style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
          spellCheck={false}
        />
      </div>

      {/* Key */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', display: 'block', marginBottom: 6 }}>Secret key</label>
        <input
          type="text" value={key} onChange={e => setKey(e.target.value)}
          placeholder="Enter your secret key…"
          style={inputStyle}
          spellCheck={false}
          autoComplete="off"
        />
      </div>

      {/* Output */}
      {error && <div style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 'var(--r-m)', fontSize: 13, color: '#dc2626', marginBottom: 12 }}>{error}</div>}

      {result ? (
        <>
          <CopyRow label={`HMAC-${algo} (hex)`}    value={result.hex} />
          <CopyRow label={`HMAC-${algo} (Base64)`} value={result.b64} />
        </>
      ) : (
        <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--ink-4)', fontSize: 13, background: 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-m)' }}>
          Enter a message and secret key to generate the HMAC signature.
        </div>
      )}

      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontSize: 12, color: 'var(--ink-4)' }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Computed via Web Crypto API · runs in your browser
      </div>
    </div>
  );
}
