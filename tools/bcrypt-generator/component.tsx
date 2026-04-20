import { useState, useCallback } from 'react';
import bcrypt from 'bcryptjs';

const IcoCopy  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

const COST_OPTIONS = [4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function BcryptGeneratorWidget() {
  const [mode, setMode] = useState<'hash' | 'verify'>('hash');

  // Hash state
  const [password, setPassword] = useState('');
  const [cost, setCost] = useState(10);
  const [hashResult, setHashResult] = useState('');
  const [hashing, setHashing] = useState(false);

  // Verify state
  const [verifyPassword, setVerifyPassword] = useState('');
  const [verifyHash, setVerifyHash] = useState('');
  const [verifyResult, setVerifyResult] = useState<null | boolean>(null);
  const [verifying, setVerifying] = useState(false);

  const [copied, setCopied] = useState('');

  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(''), 1500);
  }, []);

  const handleHash = useCallback(async () => {
    if (!password) return;
    setHashing(true);
    setHashResult('');
    try {
      const salt = await bcrypt.genSalt(cost);
      const hash = await bcrypt.hash(password, salt);
      setHashResult(hash);
    } catch {
      setHashResult('Error generating hash');
    }
    setHashing(false);
  }, [password, cost]);

  const handleVerify = useCallback(async () => {
    if (!verifyPassword || !verifyHash) return;
    setVerifying(true);
    setVerifyResult(null);
    try {
      const match = await bcrypt.compare(verifyPassword, verifyHash);
      setVerifyResult(match);
    } catch {
      setVerifyResult(false);
    }
    setVerifying(false);
  }, [verifyPassword, verifyHash]);

  const label = { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 6 } as const;
  const input = {
    width: '100%', padding: '12px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
    font: '14px/1.6 "JetBrains Mono", monospace', color: 'var(--ink)', background: 'var(--page-bg)',
    outline: 'none', boxSizing: 'border-box' as const, transition: 'border-color .15s',
  };
  const focusIn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'var(--green)';
    e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)';
  };
  const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'var(--border)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div>
      {/* Mode tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 20, borderRadius: 'var(--r-m)', overflow: 'hidden', border: '1.5px solid var(--border)' }}>
        {(['hash', 'verify'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            style={{
              flex: 1, padding: '10px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', textAlign: 'center' as const, lineHeight: 1,
              background: mode === m ? 'var(--bg-accent)' : 'var(--white)',
              color: mode === m ? '#fff' : 'var(--ink-3)',
              transition: 'background .15s, color .15s',
            }}>
            {m === 'hash' ? 'Generate Hash' : 'Verify Password'}
          </button>
        ))}
      </div>

      {mode === 'hash' ? (
        <div>
          {/* Password input */}
          <div style={{ marginBottom: 12 }}>
            <label style={label}>Password</label>
            <input
              type="text"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleHash(); }}
              placeholder="Enter password to hash…"
              style={input}
              onFocus={focusIn}
              onBlur={focusOut}
            />
          </div>

          {/* Cost factor */}
          <div style={{ marginBottom: 16 }}>
            <label style={label}>Cost factor (rounds = 2^cost)</label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {COST_OPTIONS.map(c => (
                <button key={c} onClick={() => setCost(c)}
                  style={{
                    padding: '6px 12px', fontSize: 13, fontWeight: 600, borderRadius: 'var(--r-m)', cursor: 'pointer',
                    border: `1.5px solid ${cost === c ? 'var(--green)' : 'var(--border)'}`,
                    background: cost === c ? 'var(--green-lt)' : 'var(--white)',
                    color: cost === c ? 'var(--green)' : 'var(--ink-3)',
                    transition: 'all .13s',
                  }}>
                  {c}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 11, color: 'var(--ink-4)', marginTop: 6, marginBottom: 0 }}>
              Cost {cost} = {Math.pow(2, cost).toLocaleString()} rounds.{' '}
              {cost <= 6 && 'Very fast — for development/testing only.'}
              {cost >= 7 && cost <= 9 && 'Fast — acceptable for low-sensitivity use.'}
              {cost === 10 && 'Default — good balance of security and speed.'}
              {cost === 11 && 'Stronger — recommended for most production apps.'}
              {cost === 12 && 'Strong — noticeable delay but high security.'}
            </p>
          </div>

          {/* Generate button */}
          <button
            onClick={handleHash}
            disabled={!password || hashing}
            style={{
              width: '100%', padding: '12px', border: 'none', borderRadius: 'var(--r-m)',
              background: !password || hashing ? 'var(--border)' : 'var(--bg-accent)',
              color: '#fff', fontSize: 14, fontWeight: 600,
              cursor: password && !hashing ? 'pointer' : 'default',
              marginBottom: 16, transition: 'background .13s',
            }}>
            {hashing ? 'Hashing…' : 'Generate Bcrypt Hash'}
          </button>

          {/* Result */}
          {hashResult && (
            <div style={{ padding: '14px 16px', background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', boxShadow: 'var(--sh-xs)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '0.05em' }}>BCRYPT HASH</span>
                <button onClick={() => copy(hashResult)}
                  style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: copied === hashResult ? 'var(--green)' : 'var(--ink-4)', fontSize: 12, fontWeight: 600 }}>
                  {copied === hashResult ? <IcoCheck /> : <IcoCopy />}
                  {copied === hashResult ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--ink)', wordBreak: 'break-all', lineHeight: 1.6 }}>
                {hashResult}
              </div>
              <div style={{ marginTop: 10, fontSize: 11, color: 'var(--ink-4)', lineHeight: 1.5 }}>
                <span style={{ fontWeight: 600 }}>Algorithm:</span> 2a &nbsp;|&nbsp;{' '}
                <span style={{ fontWeight: 600 }}>Cost:</span> {cost} &nbsp;|&nbsp;{' '}
                <span style={{ fontWeight: 600 }}>Length:</span> 60 chars
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Password to verify */}
          <div style={{ marginBottom: 12 }}>
            <label style={label}>Password</label>
            <input
              type="text"
              value={verifyPassword}
              onChange={e => { setVerifyPassword(e.target.value); setVerifyResult(null); }}
              placeholder="Enter plain-text password…"
              style={input}
              onFocus={focusIn}
              onBlur={focusOut}
            />
          </div>

          {/* Hash to verify against */}
          <div style={{ marginBottom: 16 }}>
            <label style={label}>Bcrypt hash</label>
            <input
              type="text"
              value={verifyHash}
              onChange={e => { setVerifyHash(e.target.value); setVerifyResult(null); }}
              onKeyDown={e => { if (e.key === 'Enter') handleVerify(); }}
              placeholder="$2a$10$..."
              style={input}
              onFocus={focusIn}
              onBlur={focusOut}
            />
          </div>

          {/* Verify button */}
          <button
            onClick={handleVerify}
            disabled={!verifyPassword || !verifyHash || verifying}
            style={{
              width: '100%', padding: '12px', border: 'none', borderRadius: 'var(--r-m)',
              background: !verifyPassword || !verifyHash || verifying ? 'var(--border)' : 'var(--bg-accent)',
              color: '#fff', fontSize: 14, fontWeight: 600,
              cursor: verifyPassword && verifyHash && !verifying ? 'pointer' : 'default',
              marginBottom: 16, transition: 'background .13s',
            }}>
            {verifying ? 'Verifying…' : 'Verify Password'}
          </button>

          {/* Verify result */}
          {verifyResult !== null && (
            <div style={{
              padding: '16px 20px', borderRadius: 'var(--r-m)',
              background: verifyResult ? 'rgba(5,150,105,.08)' : 'rgba(239,68,68,.08)',
              border: `1.5px solid ${verifyResult ? 'rgba(5,150,105,.3)' : 'rgba(239,68,68,.3)'}`,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: verifyResult ? 'var(--green)' : '#ef4444',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, fontWeight: 700, flexShrink: 0,
              }}>
                {verifyResult ? '\u2713' : '\u2717'}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: verifyResult ? 'var(--green)' : '#ef4444', marginBottom: 2 }}>
                  {verifyResult ? 'Match — password is correct' : 'No match — password does not match hash'}
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>
                  {verifyResult
                    ? 'The plain-text password produces the same bcrypt hash.'
                    : 'The plain-text password does not produce this bcrypt hash. Check for typos or the wrong hash.'}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
