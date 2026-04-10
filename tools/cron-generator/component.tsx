import { useState, useMemo } from 'react';

const IcoCopy  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

/* ── Presets ─────────────────────────────────────────────── */
const PRESETS = [
  { label: 'Every minute',     expr: '* * * * *'    },
  { label: 'Every 5 min',      expr: '*/5 * * * *'  },
  { label: 'Every 30 min',     expr: '*/30 * * * *' },
  { label: 'Every hour',       expr: '0 * * * *'    },
  { label: 'Daily midnight',   expr: '0 0 * * *'    },
  { label: 'Daily 9am',        expr: '0 9 * * *'    },
  { label: 'Weekdays 9am',     expr: '0 9 * * 1-5'  },
  { label: 'Weekly Sunday',    expr: '0 0 * * 0'    },
  { label: 'Monthly 1st',      expr: '0 0 1 * *'    },
];

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS_W  = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

/* ── Cron parser / human description ────────────────────── */
function describeField(val: string, unit: string, names?: string[]): string {
  if (val === '*') return `every ${unit}`;
  if (val.startsWith('*/')) return `every ${val.slice(2)} ${unit}s`;
  if (val.includes('-') && !val.includes(',')) {
    const [a, b] = val.split('-');
    const la = names ? names[+a] ?? a : a;
    const lb = names ? names[+b] ?? b : b;
    return `from ${la} to ${lb}`;
  }
  if (val.includes(',')) {
    const parts = val.split(',').map(v => names ? names[+v] ?? v : v);
    return parts.join(', ');
  }
  return names ? (names[+val] ?? val) : val;
}

function humanCron(expr: string): string {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return 'Invalid expression — enter 5 fields';
  const [min, hr, dom, mon, dow] = parts;

  const minuteDesc = describeField(min, 'minute');
  const hourDesc   = describeField(hr,  'hour');
  const domDesc    = describeField(dom, 'day of month');
  const monDesc    = describeField(mon, 'month', MONTHS);
  const dowDesc    = describeField(dow, 'day of week', DAYS_W);

  if (expr === '* * * * *') return 'Runs every minute';
  if (min === '*' && hr === '*') return `Runs every minute of every hour, ${domDesc === 'every day of month' ? '' : 'on ' + domDesc + ', '}${monDesc === 'every month' ? '' : 'in ' + monDesc + ', '}${dowDesc === 'every day of week' ? '' : 'on ' + dowDesc}`.replace(/,\s*$/, '').replace(/\s+/, ' ').trim();

  const parts2: string[] = [];
  if (min !== '*' || hr !== '*') {
    if (min.startsWith('*/'))  parts2.push(`every ${min.slice(2)} minutes`);
    else if (hr === '*')       parts2.push(`at minute ${min} of every hour`);
    else                       parts2.push(`at ${hr.padStart(2,'0')}:${min.padStart(2,'0')}`);
  }
  if (dow !== '*') parts2.push(`every ${dowDesc}`);
  else if (dom !== '*') parts2.push(`on day ${domDesc}`);
  if (mon !== '*') parts2.push(`in ${monDesc}`);
  return 'Runs ' + (parts2.join(', ') || 'on schedule');
}

/* ── Next runs ───────────────────────────────────────────── */
function nextRuns(expr: string, count = 5): Date[] {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return [];
  const [minF, hrF, domF, monF, dowF] = parts;

  function matches(val: string, n: number, max: number): boolean {
    if (val === '*') return true;
    if (val.startsWith('*/')) { const s = +val.slice(2); return n % s === 0; }
    return val.split(',').some(part => {
      if (part.includes('-')) { const [a, b] = part.split('-').map(Number); return n >= a && n <= b; }
      return +part === n;
    });
  }

  const results: Date[] = [];
  const start = new Date();
  start.setSeconds(0, 0);
  start.setMinutes(start.getMinutes() + 1);

  for (let i = 0; i < 60 * 24 * 366 && results.length < count; i++) {
    const d = new Date(start.getTime() + i * 60_000);
    if (
      matches(monF, d.getMonth() + 1, 12) &&
      (dowF === '*' ? matches(domF, d.getDate(), 31) : matches(dowF, d.getDay(), 6)) &&
      matches(hrF, d.getHours(), 23) &&
      matches(minF, d.getMinutes(), 59)
    ) results.push(d);
  }
  return results;
}

/* ── Field selector ──────────────────────────────────────── */
function FieldEditor({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint: string }) {
  const [focused, setFocused] = useState(false);
  const isValid = value.trim() !== '';
  return (
    <div style={{ flex: '1 1 0', minWidth: 0 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</label>
      <input
        value={value} onChange={e => onChange(e.target.value)}
        style={{ width: '100%', padding: 'clamp(5px, 1.5vw, 8px) clamp(4px, 1.5vw, 10px)', border: `1.5px solid ${focused ? 'var(--green)' : isValid ? 'var(--border-md)' : 'var(--border)'}`, borderRadius: 'var(--r-m)', fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(12px, 3vw, 15px)', fontWeight: 700, textAlign: 'center', color: 'var(--ink)', background: 'var(--page-bg)', outline: 'none', boxSizing: 'border-box', transition: 'border-color .15s', boxShadow: focused ? '0 0 0 3px rgba(5,150,105,.09)' : 'none' }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <div style={{ fontSize: 10, color: 'var(--ink-4)', marginTop: 3, textAlign: 'center', fontFamily: 'JetBrains Mono, monospace' }}>{hint}</div>
    </div>
  );
}

export default function CronWidget() {
  const [fields, setFields] = useState({ min: '*', hr: '*', dom: '*', mon: '*', dow: '*' });
  const [copied, setCopied] = useState(false);

  const expr = `${fields.min} ${fields.hr} ${fields.dom} ${fields.mon} ${fields.dow}`;
  const desc  = useMemo(() => humanCron(expr), [expr]);
  const runs  = useMemo(() => nextRuns(expr), [expr]);

  const setField = (key: keyof typeof fields) => (v: string) => setFields(f => ({ ...f, [key]: v || '*' }));

  const applyPreset = (e: string) => {
    const [min, hr, dom, mon, dow] = e.split(' ');
    setFields({ min, hr, dom, mon, dow });
  };

  const copy = () => {
    navigator.clipboard.writeText(expr).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div>
      {/* Presets */}
      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 7 }}>Presets</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {PRESETS.map(p => (
            <button key={p.expr} onClick={() => applyPreset(p.expr)}
              style={{ padding: '5px 10px', border: `1.5px solid ${expr === p.expr ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-s)', background: expr === p.expr ? 'var(--green-lt)' : 'var(--white)', color: expr === p.expr ? 'var(--green)' : 'var(--ink-3)', fontSize: 12, fontWeight: 500, cursor: 'pointer', transition: 'all .14s' }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Field editors */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 8, marginBottom: 12 }}>
        <FieldEditor label="Minute"       value={fields.min} onChange={setField('min')} hint="0-59" />
        <FieldEditor label="Hour"         value={fields.hr}  onChange={setField('hr')}  hint="0-23" />
        <FieldEditor label="Day (month)"  value={fields.dom} onChange={setField('dom')} hint="1-31" />
        <FieldEditor label="Month"        value={fields.mon} onChange={setField('mon')} hint="1-12" />
        <FieldEditor label="Day (week)"   value={fields.dow} onChange={setField('dow')} hint="0-6" />
      </div>

      {/* Expression + copy */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: 'var(--ink)', borderRadius: 'var(--r-m)', marginBottom: 12 }}>
        <code style={{ flex: 1, fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(13px, 3.5vw, 18px)', fontWeight: 700, color: '#fff', letterSpacing: '0.05em', wordBreak: 'break-all', minWidth: 0 }}>{expr}</code>
        <button onClick={copy} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', background: copied ? 'var(--green)' : 'rgba(255,255,255,.12)', color: '#fff', border: 'none', borderRadius: 'var(--r-s)', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all .14s', flexShrink: 0 }}>
          {copied ? <IcoCheck /> : <IcoCopy />} {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Human description */}
      <div style={{ padding: '12px 16px', background: 'var(--green-lt)', border: '1px solid rgba(5,150,105,.2)', borderRadius: 'var(--r-m)', marginBottom: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Meaning — </span>
        <span style={{ fontSize: 14, color: 'var(--ink)', fontWeight: 500 }}>{desc}</span>
      </div>

      {/* Next runs */}
      {runs.length > 0 && (
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 8 }}>Next {runs.length} runs (local time)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {runs.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 12px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-s)' }}>
                <span style={{ fontSize: 11, color: 'var(--ink-4)', minWidth: 16, fontWeight: 700 }}>#{i+1}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(11px, 2.8vw, 13px)', color: 'var(--ink)', wordBreak: 'break-word' }}>{d.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
