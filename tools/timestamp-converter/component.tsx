import { useState, useEffect, useCallback } from 'react';

const IcoCopy  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

function toMs(ts: string): number | null {
  const n = Number(ts.trim());
  if (!isFinite(n) || ts.trim() === '') return null;
  // Auto-detect: 13+ digits = milliseconds, otherwise seconds
  return ts.trim().replace('-', '').length >= 13 ? n : n * 1000;
}

function relative(ms: number): string {
  const diff = Math.abs(Date.now() - ms);
  const s = Math.floor(diff / 1000);
  if (s < 60)  return s === 0 ? 'just now' : `${s} second${s !== 1 ? 's' : ''} ${ms < Date.now() ? 'ago' : 'from now'}`;
  const m = Math.floor(s / 60);
  if (m < 60)  return `${m} minute${m !== 1 ? 's' : ''} ${ms < Date.now() ? 'ago' : 'from now'}`;
  const h = Math.floor(m / 60);
  if (h < 24)  return `${h} hour${h !== 1 ? 's' : ''} ${ms < Date.now() ? 'ago' : 'from now'}`;
  const d = Math.floor(h / 24);
  if (d < 365) return `${d} day${d !== 1 ? 's' : ''} ${ms < Date.now() ? 'ago' : 'from now'}`;
  const y = Math.floor(d / 365);
  return `${y} year${y !== 1 ? 's' : ''} ${ms < Date.now() ? 'ago' : 'from now'}`;
}

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function getFormats(ms: number) {
  const d = new Date(ms);
  return [
    { label: 'Unix (seconds)',    value: String(Math.floor(ms / 1000))       },
    { label: 'Unix (ms)',         value: String(ms)                           },
    { label: 'ISO 8601 (UTC)',    value: d.toISOString()                      },
    { label: 'RFC 2822',          value: d.toUTCString()                      },
    { label: 'Local date/time',   value: d.toLocaleString()                   },
    { label: 'UTC date/time',     value: d.toUTCString()                      },
    { label: 'Day of week',       value: DAYS[d.getUTCDay()]                  },
    { label: 'Relative',          value: relative(ms)                         },
  ];
}

function localDatetimeValue(ms: number): string {
  const d = new Date(ms);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function TimestampWidget() {
  const [tsInput,   setTsInput]   = useState('');
  const [dtInput,   setDtInput]   = useState('');
  const [liveMode,  setLiveMode]  = useState(false);
  const [copiedKey, setCopiedKey] = useState('');

  // Live "now" mode
  useEffect(() => {
    if (!liveMode) return;
    const tick = () => {
      const now = Date.now();
      setTsInput(String(Math.floor(now / 1000)));
      setDtInput(localDatetimeValue(now));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [liveMode]);

  const resolvedMs = (() => {
    if (tsInput.trim()) return toMs(tsInput);
    if (dtInput)        return new Date(dtInput).getTime();
    return null;
  })();

  const formats = resolvedMs !== null && isFinite(resolvedMs) ? getFormats(resolvedMs) : [];

  const handleTsChange = (v: string) => { setLiveMode(false); setTsInput(v); setDtInput(''); };
  const handleDtChange = (v: string) => { setLiveMode(false); setDtInput(v); setTsInput(''); };
  const handleNow = () => { setLiveMode(l => { if (!l) { setTsInput(''); setDtInput(''); } return !l; }); };

  const copy = useCallback((label: string, value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedKey(label);
      setTimeout(() => setCopiedKey(''), 1800);
    });
  }, []);

  return (
    <div>
      {/* Inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 10, alignItems: 'end', marginBottom: 14 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', display: 'block', marginBottom: 6 }}>Unix timestamp</label>
          <input
            type="text" inputMode="numeric" value={tsInput}
            onChange={e => handleTsChange(e.target.value)}
            placeholder="e.g. 1704067200"
            style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--ink)', background: 'var(--page-bg)', outline: 'none', boxSizing: 'border-box', transition: 'border-color .15s' }}
            onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
            onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>

        <span style={{ fontSize: 13, color: 'var(--ink-4)', paddingBottom: 10, textAlign: 'center' }}>↔</span>

        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', display: 'block', marginBottom: 6 }}>Date &amp; time</label>
          <input
            type="datetime-local" value={dtInput}
            onChange={e => handleDtChange(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', fontSize: 13, color: 'var(--ink)', background: 'var(--page-bg)', outline: 'none', boxSizing: 'border-box', transition: 'border-color .15s' }}
            onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
            onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
      </div>

      {/* Now button */}
      <button onClick={handleNow} style={{ marginBottom: 16, padding: '7px 16px', border: `1.5px solid ${liveMode ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-m)', background: liveMode ? 'var(--green-lt)' : 'var(--white)', color: liveMode ? 'var(--green)' : 'var(--ink-3)', fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all .14s', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: liveMode ? 'var(--green)' : 'var(--ink-4)', display: 'inline-block', flexShrink: 0 }} />
        {liveMode ? 'Live — current time' : 'Use current time (Now)'}
      </button>

      {/* Output rows */}
      {formats.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, border: '1.5px solid var(--border-md)', borderRadius: 'var(--r-m)', overflow: 'hidden', boxShadow: 'var(--sh-xs)' }}>
          {formats.map(({ label, value }) => (
            <div key={label} onClick={() => copy(label, value)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '10px 14px', background: copiedKey === label ? 'var(--green-lt)' : 'var(--white)', borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background .12s' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', flexShrink: 0, minWidth: 130 }}>{label}</span>
              <span style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)', wordBreak: 'break-all', flex: 1, textAlign: 'right' }}>{value}</span>
              <span style={{ color: copiedKey === label ? 'var(--green)' : 'var(--ink-4)', flexShrink: 0 }}>
                {copiedKey === label ? <IcoCheck /> : <IcoCopy />}
              </span>
            </div>
          ))}
        </div>
      )}

      {!resolvedMs && (
        <div style={{ padding: '24px', border: '1.5px dashed var(--border)', borderRadius: 'var(--r-m)', textAlign: 'center', color: 'var(--ink-4)', fontSize: 13 }}>
          Enter a Unix timestamp or pick a date above
        </div>
      )}
    </div>
  );
}
