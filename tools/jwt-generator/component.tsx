'use client';
import { useState, useCallback } from 'react';

const DEFAULT_PAYLOAD = JSON.stringify({
  sub: '1234567890',
  name: 'Alice Johnson',
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 3600,
}, null, 2);

function base64UrlEncode(data: string | Uint8Array): string {
  let str: string;
  if (typeof data === 'string') {
    str = btoa(unescape(encodeURIComponent(data)));
  } else {
    str = btoa(String.fromCharCode(...data));
  }
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

async function signJwt(payload: string, secret: string, alg: string): Promise<string> {
  const header = { alg, typ: 'JWT' };
  const headerEncoded  = base64UrlEncode(JSON.stringify(header));
  const payloadEncoded = base64UrlEncode(payload);
  const message = `${headerEncoded}.${payloadEncoded}`;

  const hashAlg = { HS256: 'SHA-256', HS384: 'SHA-384', HS512: 'SHA-512' }[alg]!;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: hashAlg },
    false,
    ['sign'],
  );
  const sigBuf = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  const sig = base64UrlEncode(new Uint8Array(sigBuf));
  return `${message}.${sig}`;
}

function PartBadge({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color, wordBreak: 'break-all', lineHeight: 1.5 }}>{value}</span>
    </div>
  );
}

export default function JwtGenerator() {
  const [secret,  setSecret]  = useState('your-256-bit-secret');
  const [payload, setPayload] = useState(DEFAULT_PAYLOAD);
  const [alg,     setAlg]     = useState('HS256');
  const [token,   setToken]   = useState('');
  const [error,   setError]   = useState('');
  const [copied,  setCopied]  = useState(false);

  const generate = useCallback(async () => {
    setError('');
    try {
      JSON.parse(payload);
    } catch {
      setError('Payload is not valid JSON');
      return;
    }
    try {
      const jwt = await signJwt(payload.trim(), secret, alg);
      setToken(jwt);
    } catch (e) {
      setError((e as Error).message);
    }
  }, [payload, secret, alg]);

  const copy = () => {
    if (!token) return;
    navigator.clipboard.writeText(token).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const parts = token.split('.');
  const colors = ['#e11d48', '#16a34a', '#2563eb'];
  const labels = ['Header', 'Payload', 'Signature'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Algorithm selector */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <label style={{ fontSize: 13, color: 'var(--ink-2)', whiteSpace: 'nowrap' }}>Algorithm</label>
        {['HS256', 'HS384', 'HS512'].map(a => (
          <button key={a} onClick={() => setAlg(a)}
            style={{ padding: '5px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
              border: '1.5px solid', borderColor: alg === a ? 'var(--green)' : 'var(--border)',
              background: alg === a ? 'var(--green-lt)' : 'var(--white)',
              color: alg === a ? 'var(--green)' : 'var(--ink-2)', fontWeight: alg === a ? 700 : 400 }}>
            {a}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Secret</label>
          <input type="text" value={secret} onChange={e => setSecret(e.target.value)}
            placeholder="your-secret-key"
            style={{ padding: '9px 12px', borderRadius: 8, border: '1.5px solid var(--border)',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--surface)', color: 'var(--ink)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Payload (JSON)</label>
          <textarea value={payload} onChange={e => setPayload(e.target.value)}
            spellCheck={false} rows={6}
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.6, padding: 12,
              border: '1.5px solid var(--border)', borderRadius: 8, resize: 'vertical',
              background: 'var(--surface)', color: 'var(--ink)', outline: 'none' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={generate}
          style={{ padding: '9px 22px', borderRadius: 8, background: 'var(--bg-accent)', color: '#fff',
            border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
          Sign JWT →
        </button>
      </div>

      {error && <p style={{ color: 'var(--red,#dc2626)', fontSize: 13, margin: 0 }}>{error}</p>}

      {token && (
        <>
          {/* Coloured token display */}
          <div style={{ padding: 14, borderRadius: 10, background: 'var(--surface)', border: '1.5px solid var(--border)',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 12, wordBreak: 'break-all', lineHeight: 1.7 }}>
            {parts.map((p, i) => (
              <span key={i}>
                <span style={{ color: colors[i] }}>{p}</span>
                {i < 2 && <span style={{ color: 'var(--ink-3)' }}>.</span>}
              </span>
            ))}
          </div>

          {/* Part breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {parts.map((p, i) => (
              <div key={i} style={{ padding: 12, borderRadius: 8, border: `1.5px solid ${colors[i]}22`, background: `${colors[i]}08` }}>
                <PartBadge label={labels[i]} value={p} color={colors[i]} />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={copy}
              style={{ padding: '8px 18px', borderRadius: 8, border: '1.5px solid var(--border)',
                background: 'var(--white)', color: 'var(--ink-2)', fontWeight: 500, fontSize: 13, cursor: 'pointer' }}>
              {copied ? 'Copied!' : 'Copy token'}
            </button>
          </div>
          <p style={{ fontSize: 11, color: 'var(--ink-3)', margin: 0 }}>
            RFC 7519 · signed via Web Crypto API · secret never leaves your browser
          </p>
        </>
      )}
    </div>
  );
}
