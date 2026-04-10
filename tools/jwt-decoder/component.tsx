import { useState } from 'react';

const IcoCopy  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

function b64urlDecode(str: string): string {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  return decodeURIComponent(
    atob(padded)
      .split('')
      .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  );
}

function parseJwt(token: string) {
  const parts = token.trim().split('.');
  if (parts.length !== 3) return { error: 'Invalid JWT — expected exactly 3 dot-separated parts.', header: null, payload: null, sig: parts[2] ?? '' };
  try {
    const header  = JSON.parse(b64urlDecode(parts[0]));
    const payload = JSON.parse(b64urlDecode(parts[1]));
    return { error: null, header, payload, sig: parts[2] };
  } catch {
    return { error: 'Could not decode JWT — check that it is a valid Base64url-encoded token.', header: null, payload: null, sig: '' };
  }
}

function fmtDate(ts: number) {
  return new Date(ts * 1000).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

function JsonBlock({ data, label, color }: { data: object; label: string; color: string }) {
  const [copied, setCopied] = useState(false);
  const text = JSON.stringify(data, null, 2);
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color }}>{label}</span>
        <button className={`btn-icon${copied ? ' copied' : ''}`} onClick={copy} style={{ padding: '3px 8px', fontSize: 11 }}>
          {copied ? <IcoCheck /> : <IcoCopy />}
        </button>
      </div>
      <pre style={{ margin: 0, padding: '12px 14px', background: 'var(--page-bg)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)', overflowX: 'auto', lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{text}</pre>
    </div>
  );
}

const SAMPLE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEyMyIsIm5hbWUiOiJBbGljZSBTbWl0aCIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjo5OTk5OTk5OTk5fQ.signature';

export default function JwtDecoderWidget() {
  const [input, setInput] = useState('');
  const token = input.trim() || SAMPLE;
  const { error, header, payload, sig } = parseJwt(token);

  const now = Math.floor(Date.now() / 1000);
  const exp  = payload && typeof payload === 'object' && 'exp'  in payload ? (payload as Record<string, number>).exp  : null;
  const iat  = payload && typeof payload === 'object' && 'iat'  in payload ? (payload as Record<string, number>).iat  : null;
  const nbf  = payload && typeof payload === 'object' && 'nbf'  in payload ? (payload as Record<string, number>).nbf  : null;
  const isExpired = exp !== null && exp < now;
  const isNotYet  = nbf !== null && nbf > now;

  return (
    <div>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Paste your JWT token here…"
        spellCheck={false}
        style={{ width: '100%', minHeight: 90, padding: '12px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)', background: 'var(--white)', resize: 'vertical', outline: 'none', boxSizing: 'border-box', lineHeight: 1.6, wordBreak: 'break-all' }}
      />
      {!input && <p style={{ fontSize: 12, color: 'var(--ink-4)', margin: '4px 0 12px', fontStyle: 'italic' }}>Showing sample token — paste yours above to decode it.</p>}

      {error ? (
        <div style={{ padding: '12px 14px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 'var(--r-m)', fontSize: 13, color: '#dc2626', marginTop: 8 }}>{error}</div>
      ) : (
        <div style={{ marginTop: 14 }}>
          {/* Status badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
            {exp !== null && (
              <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99, background: isExpired ? '#fef2f2' : 'var(--green-lt)', color: isExpired ? '#dc2626' : 'var(--green)', border: `1px solid ${isExpired ? '#fca5a5' : 'rgba(5,150,105,.3)'}` }}>
                {isExpired ? `Expired ${fmtDate(exp)}` : `Expires ${fmtDate(exp)}`}
              </span>
            )}
            {iat !== null && (
              <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: 'var(--page-bg)', color: 'var(--ink-3)', border: '1px solid var(--border)' }}>
                Issued {fmtDate(iat)}
              </span>
            )}
            {isNotYet && nbf !== null && (
              <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99, background: '#fffbeb', color: '#d97706', border: '1px solid #fcd34d' }}>
                Not valid until {fmtDate(nbf)}
              </span>
            )}
          </div>

          {header  && <JsonBlock data={header}  label="Header"    color="#7c3aed" />}
          {payload && <JsonBlock data={payload} label="Payload"   color="var(--green)" />}

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2563eb', marginBottom: 6 }}>Signature</div>
            <div style={{ padding: '10px 14px', background: 'var(--page-bg)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-3)', wordBreak: 'break-all', lineHeight: 1.7 }}>
              {sig || '—'}
            </div>
            <p style={{ fontSize: 12, color: 'var(--ink-4)', margin: '6px 0 0', lineHeight: 1.5 }}>
              Signature is not verified — this tool only decodes. Verify server-side with your secret key.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
