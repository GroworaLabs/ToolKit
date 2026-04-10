import { useState, useMemo } from 'react';

const IcoEye     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IcoEyeOff  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;

function calcEntropy(pw: string): number {
  if (!pw) return 0;
  let cs = 0;
  if (/[a-z]/.test(pw)) cs += 26;
  if (/[A-Z]/.test(pw)) cs += 26;
  if (/[0-9]/.test(pw)) cs += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) cs += 32;
  return Math.log2(cs) * pw.length;
}

function crackTime(bits: number): string {
  const secs = Math.pow(2, Math.min(bits, 256)) / 1e10; // 10B guesses/s
  if (secs < 0.001)    return 'instantly';
  if (secs < 1)        return 'less than a second';
  if (secs < 60)       return `${Math.round(secs)} seconds`;
  if (secs < 3600)     return `${Math.round(secs / 60)} minutes`;
  if (secs < 86400)    return `${Math.round(secs / 3600)} hours`;
  if (secs < 2592000)  return `${Math.round(secs / 86400)} days`;
  if (secs < 31536000) return `${Math.round(secs / 2592000)} months`;
  if (secs < 1e9)      return `${Math.round(secs / 31536000)} years`;
  if (secs < 1e18)     return 'millions of years';
  return 'practically uncrackable';
}

function analyze(pw: string) {
  const entropy = calcEntropy(pw);
  const score   = Math.min(100, Math.round((entropy / 80) * 100));
  let label = 'Very weak'; let color = '#dc2626';
  if (entropy >= 60)      { label = 'Strong';      color = 'var(--green)'; }
  else if (entropy >= 45) { label = 'Good';        color = '#10b981'; }
  else if (entropy >= 30) { label = 'Moderate';    color = '#f59e0b'; }
  else if (entropy >= 15) { label = 'Weak';        color = '#ef4444'; }

  const checks = [
    { label: 'At least 12 characters',       pass: pw.length >= 12 },
    { label: 'At least 16 characters',       pass: pw.length >= 16 },
    { label: 'Uppercase letters (A–Z)',       pass: /[A-Z]/.test(pw) },
    { label: 'Lowercase letters (a–z)',       pass: /[a-z]/.test(pw) },
    { label: 'Numbers (0–9)',                 pass: /[0-9]/.test(pw) },
    { label: 'Symbols (!@#$…)',               pass: /[^a-zA-Z0-9]/.test(pw) },
    { label: 'No repeated characters (aaa)', pass: !/(.)\1{2}/.test(pw) },
    { label: 'No common sequences (123, abc)',pass: !/(?:012|123|234|345|456|567|678|789|abc|bcd|cde|qwerty|password|letmein)/i.test(pw) },
  ];

  return { entropy, score, label, color, crack: crackTime(entropy), checks };
}

export default function PasswordStrengthWidget() {
  const [pw, setPw]     = useState('');
  const [show, setShow] = useState(false);
  const res = useMemo(() => analyze(pw), [pw]);

  return (
    <div>
      {/* Input */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <input
          type={show ? 'text' : 'password'}
          value={pw}
          onChange={e => setPw(e.target.value)}
          placeholder="Enter a password to analyse…"
          style={{ width: '100%', padding: '12px 44px 12px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', fontSize: 14, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)', background: 'var(--white)', outline: 'none', boxSizing: 'border-box' }}
          autoComplete="off"
          spellCheck={false}
        />
        <button onClick={() => setShow(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-4)', display: 'flex', padding: 4 }}>
          {show ? <IcoEyeOff /> : <IcoEye />}
        </button>
      </div>

      {pw ? (
        <>
          {/* Strength bar */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
              <span style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 500 }}>Strength</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: res.color }}>{res.label}</span>
            </div>
            <div className="str-track"><div className="str-fill" style={{ width: `${res.score}%`, background: res.color }} /></div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
            {[
              { label: 'Entropy',      value: `${res.entropy.toFixed(1)} bits` },
              { label: 'Length',       value: `${pw.length} chars` },
              { label: 'Crack time',   value: res.crack },
              { label: 'Score',        value: `${res.score} / 100` },
            ].map(({ label, value }) => (
              <div key={label} style={{ padding: '10px 14px', background: 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-m)' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-4)', marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)' }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {res.checks.map(({ label, pass }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: pass ? 'var(--green)' : 'var(--border)', color: '#fff', fontSize: 10, fontWeight: 700 }}>
                  {pass ? '✓' : '✗'}
                </div>
                <span style={{ color: pass ? 'var(--ink-2)' : 'var(--ink-4)' }}>{label}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--ink-4)', fontSize: 14 }}>
          Type or paste a password above to see its strength analysis.
        </div>
      )}

      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontSize: 12, color: 'var(--ink-4)' }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Analysed locally · never sent to any server
      </div>
    </div>
  );
}
