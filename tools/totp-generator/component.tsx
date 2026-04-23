import { useState, useEffect, useCallback, useRef } from 'react';

type Algorithm = 'SHA-1' | 'SHA-256' | 'SHA-512';

const BASE32_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function base32Decode(input: string): Uint8Array<ArrayBuffer> {
  const clean = input.toUpperCase().replace(/\s+/g, '').replace(/=+$/, '');
  const out: number[] = [];
  let buffer = 0, bitsLeft = 0;
  for (const ch of clean) {
    const idx = BASE32_CHARS.indexOf(ch);
    if (idx === -1) throw new Error(`Invalid character: ${ch}`);
    buffer = (buffer << 5) | idx;
    bitsLeft += 5;
    if (bitsLeft >= 8) {
      out.push((buffer >>> (bitsLeft - 8)) & 0xff);
      bitsLeft -= 8;
    }
  }
  const buf = new ArrayBuffer(out.length);
  const view = new Uint8Array(buf);
  out.forEach((b, i) => { view[i] = b; });
  return view;
}

async function computeTOTP(
  secret: string,
  digits: number,
  period: number,
  algorithm: Algorithm,
): Promise<string> {
  const keyBytes = base32Decode(secret);
  const counter  = Math.floor(Date.now() / 1000 / period);

  const buf = new ArrayBuffer(8);
  const dv  = new DataView(buf);
  dv.setUint32(0, Math.floor(counter / 0x100000000), false);
  dv.setUint32(4, counter >>> 0, false);

  const cryptoKey = await crypto.subtle.importKey(
    'raw', keyBytes,
    { name: 'HMAC', hash: algorithm },
    false, ['sign'],
  );
  const sig  = await crypto.subtle.sign('HMAC', cryptoKey, buf);
  const hmac = new Uint8Array(sig);

  const offset = hmac[hmac.length - 1] & 0x0f;
  const code   =
    ((hmac[offset]     & 0x7f) * 16777216) + // << 24
    ((hmac[offset + 1] & 0xff) * 65536)     + // << 16
    ((hmac[offset + 2] & 0xff) * 256)       + // << 8
     (hmac[offset + 3] & 0xff);

  return (code % Math.pow(10, digits)).toString().padStart(digits, '0');
}

const IcoCopy  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

const DEMO_SECRET = 'JBSWY3DPEHPK3PXP';

export default function TotpGeneratorWidget() {
  const [secret,    setSecret]    = useState(DEMO_SECRET);
  const [digits,    setDigits]    = useState(6);
  const [period,    setPeriod]    = useState(30);
  const [algorithm, setAlgorithm] = useState<Algorithm>('SHA-1');
  const [code,      setCode]      = useState('');
  const [timeLeft,  setTimeLeft]  = useState(30);
  const [error,     setError]     = useState('');
  const [copied,    setCopied]    = useState(false);

  const generateCode = useCallback(async (sec: string, digs: number, per: number, algo: Algorithm) => {
    if (!sec.trim()) { setCode(''); setError(''); return; }
    try {
      const result = await computeTOTP(sec.trim(), digs, per, algo);
      setCode(result);
      setError('');
    } catch (e) {
      setCode('');
      setError(e instanceof Error ? e.message : 'Invalid secret key');
    }
  }, []);

  useEffect(() => {
    generateCode(secret, digits, period, algorithm);

    const tick = () => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = period - (now % period);
      setTimeLeft(remaining);

      if (remaining === period || remaining === 0) {
        generateCode(secret, digits, period, algorithm);
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [secret, digits, period, algorithm, generateCode]);

  const copy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const progress = ((period - timeLeft) / period) * 100;
  const progressColor = timeLeft <= 5 ? 'var(--red)' : timeLeft <= 10 ? 'var(--amber)' : 'var(--green)';

  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: '6px 14px', border: `1.5px solid ${active ? 'rgba(5,150,105,.35)' : 'var(--border)'}`,
    borderRadius: 'var(--r-s)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
    background: active ? 'var(--green-lt)' : 'var(--white)', color: active ? 'var(--green)' : 'var(--ink-2)',
    fontFamily: 'JetBrains Mono, monospace',
  });

  return (
    <div>
      {/* Secret key */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', display: 'block', marginBottom: 6 }}>
          TOTP Secret Key <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--ink-3)' }}>(Base32 encoded)</span>
        </label>
        <input
          type="text"
          value={secret}
          onChange={e => setSecret(e.target.value)}
          placeholder="e.g. JBSWY3DPEHPK3PXP"
          style={{
            width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)',
            borderRadius: 'var(--r-m)', fontSize: 14, fontFamily: 'JetBrains Mono, monospace',
            color: 'var(--ink)', background: 'var(--white)', outline: 'none', boxSizing: 'border-box',
            letterSpacing: 1,
          }}
          spellCheck={false}
          autoComplete="off"
        />
        <button
          onClick={() => setSecret(DEMO_SECRET)}
          style={{ fontSize: 12, color: 'var(--ink-3)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', marginTop: 4 }}>
          Use demo secret
        </button>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', gap: 20, marginBottom: 20, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Digits</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[6, 8].map(d => (
              <button key={d} onClick={() => setDigits(d)} style={btnStyle(digits === d)}>{d}</button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Period</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[30, 60].map(p => (
              <button key={p} onClick={() => setPeriod(p)} style={btnStyle(period === p)}>{p}s</button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Algorithm</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['SHA-1', 'SHA-256', 'SHA-512'] as Algorithm[]).map(a => (
              <button key={a} onClick={() => setAlgorithm(a)} style={btnStyle(algorithm === a)}>{a}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{ padding: '10px 14px', background: 'var(--red-lt)', border: '1px solid var(--red)', borderRadius: 'var(--r-m)', fontSize: 13, color: 'var(--red)', marginBottom: 16 }}>
          {error}
        </div>
      )}

      {/* Code display */}
      {code && !error && (
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', padding: '24px 20px', boxShadow: 'var(--sh-xs)', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 12 }}>Current code</div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 20 }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(36px, 8vw, 56px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '0.15em', lineHeight: 1 }}>
              {code}
            </div>
            <button onClick={copy}
              style={{ padding: '8px 12px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', background: 'var(--page-bg)', cursor: 'pointer', color: copied ? 'var(--green)' : 'var(--ink-3)', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600 }}>
              {copied ? <IcoCheck /> : <IcoCopy />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Countdown */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ width: '100%', height: 6, background: 'var(--border)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: progressColor, borderRadius: 99, transition: 'width 1s linear, background .3s' }} />
            </div>
          </div>
          <div style={{ fontSize: 13, color: timeLeft <= 5 ? 'var(--red)' : 'var(--ink-3)', fontWeight: timeLeft <= 5 ? 700 : 400 }}>
            Refreshes in <strong style={{ fontFamily: 'JetBrains Mono, monospace' }}>{timeLeft}s</strong>
          </div>
        </div>
      )}

      {!code && !error && (
        <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--ink-4)', fontSize: 13, background: 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
          Enter a Base32 secret key above to generate a TOTP code
        </div>
      )}

      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontSize: 12, color: 'var(--ink-4)' }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        RFC 6238 · computed via Web Crypto API · secret never leaves your browser
      </div>
    </div>
  );
}
