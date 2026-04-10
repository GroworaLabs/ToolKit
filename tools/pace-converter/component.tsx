import { useState } from 'react';

/* ── Helpers ───────────────────────────────────────────── */

const KM_PER_MILE = 1.609344;

function parsePace(val: string): number | null {
  val = val.trim();
  if (!val) return null;
  if (val.includes(':')) {
    const parts = val.split(':');
    const m = parseInt(parts[0], 10);
    const s = parseInt(parts[1], 10);
    if (isNaN(m) || isNaN(s) || s >= 60) return null;
    return m * 60 + s;
  }
  const n = parseFloat(val);
  return isNaN(n) ? null : n * 60;
}

function fmtPace(totalSec: number): string {
  if (!isFinite(totalSec) || totalSec <= 0) return '—';
  const m = Math.floor(totalSec / 60);
  const s = Math.round(totalSec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function fmtTime(totalSec: number): string {
  if (!isFinite(totalSec) || totalSec <= 0) return '—';
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = Math.round(totalSec % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function fmtSpeed(kmh: number): string {
  return isFinite(kmh) && kmh > 0 ? parseFloat(kmh.toPrecision(5)).toString() : '—';
}

const RACES = [
  { name: '5 K',           dist: 5 },
  { name: '10 K',          dist: 10 },
  { name: 'Half marathon', dist: 21.0975 },
  { name: 'Marathon',      dist: 42.195 },
];

/* ── Single field row ───────────────────────────────────── */
interface FieldRowProps {
  label:    string;
  hint:     string;
  value:    string;
  active:   boolean;
  onChange: (v: string) => void;
}

function FieldRow({ label, hint, value, active, onChange }: FieldRowProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="conv-row" style={{ padding: '12px 0' }}>
      <label className="conv-row-label" style={{ width: 140, fontSize: 13, fontWeight: 600, color: active ? 'var(--green)' : 'var(--ink)' }}>
        {label}
      </label>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        placeholder={hint}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1, padding: '8px 12px',
          background: active ? 'var(--green-lt)' : 'var(--page-bg)',
          border: `1.5px solid ${focused ? 'var(--green)' : active ? 'rgba(5,150,105,.3)' : 'var(--border)'}`,
          borderRadius: 'var(--r-m)',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: 'var(--ink)',
          outline: 'none', boxSizing: 'border-box' as const,
          transition: 'border-color .15s, background .15s',
          boxShadow: focused ? '0 0 0 3px rgba(5,150,105,.09)' : 'none',
        }}
      />
    </div>
  );
}

/* ── Main component ─────────────────────────────────────── */
export default function PaceConverterWidget() {
  const [minKm,   setMinKm]   = useState('');
  const [minMile, setMinMile] = useState('');
  const [kmh,     setKmh]     = useState('');
  const [mph,     setMph]     = useState('');
  const [active,  setActive]  = useState<'minKm' | 'minMile' | 'kmh' | 'mph' | null>(null);

  function fromPaceKm(raw: string) {
    setActive('minKm'); setMinKm(raw);
    const sec = parsePace(raw);
    if (!sec) { setMinMile(''); setKmh(''); setMph(''); return; }
    setMinMile(fmtPace(sec * KM_PER_MILE));
    setKmh(fmtSpeed(3600 / sec));
    setMph(fmtSpeed(3600 / (sec * KM_PER_MILE)));
  }

  function fromPaceMile(raw: string) {
    setActive('minMile'); setMinMile(raw);
    const sec = parsePace(raw);
    if (!sec) { setMinKm(''); setKmh(''); setMph(''); return; }
    const secKm = sec / KM_PER_MILE;
    setMinKm(fmtPace(secKm));
    setKmh(fmtSpeed(3600 / secKm));
    setMph(fmtSpeed(3600 / sec));
  }

  function fromKmh(raw: string) {
    setActive('kmh'); setKmh(raw);
    const n = parseFloat(raw);
    if (!n || n <= 0) { setMinKm(''); setMinMile(''); setMph(''); return; }
    const secKm = 3600 / n;
    setMinKm(fmtPace(secKm));
    setMinMile(fmtPace(secKm * KM_PER_MILE));
    setMph(fmtSpeed(n / KM_PER_MILE));
  }

  function fromMph(raw: string) {
    setActive('mph'); setMph(raw);
    const n = parseFloat(raw);
    if (!n || n <= 0) { setMinKm(''); setMinMile(''); setKmh(''); return; }
    const kmhVal = n * KM_PER_MILE;
    const secKm  = 3600 / kmhVal;
    setMinKm(fmtPace(secKm));
    setMinMile(fmtPace(3600 / n));
    setKmh(fmtSpeed(kmhVal));
  }

  const hasValue = minKm || minMile || kmh || mph;
  const secPerKmVal = parsePace(minKm);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <p style={{ fontSize: 13, color: 'var(--ink-3)', margin: 0 }}>Enter pace as m:ss or decimal. All fields update instantly.</p>
        {hasValue && (
          <button onClick={() => { setMinKm(''); setMinMile(''); setKmh(''); setMph(''); setActive(null); }}
            style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', background: 'none', border: '1px solid var(--border)', borderRadius: 'var(--r-m)', padding: '4px 10px', cursor: 'pointer' }}>
            Clear
          </button>
        )}
      </div>

      <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', padding: '0 16px', boxShadow: 'var(--sh-xs)' }}>
        <FieldRow label="Pace (min/km)"  hint="e.g. 5:30" value={minKm}   active={active === 'minKm'}   onChange={fromPaceKm}   />
        <FieldRow label="Pace (min/mile)" hint="e.g. 8:51" value={minMile} active={active === 'minMile'} onChange={fromPaceMile} />
        <FieldRow label="Speed (km/h)"   hint="e.g. 10.9" value={kmh}     active={active === 'kmh'}     onChange={fromKmh}     />
        <FieldRow label="Speed (mph)"    hint="e.g. 6.78" value={mph}     active={active === 'mph'}     onChange={fromMph}     />
      </div>

      {secPerKmVal && secPerKmVal > 0 && (
        <div style={{ marginTop: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>Estimated finish times at this pace</p>
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', overflow: 'hidden', boxShadow: 'var(--sh-xs)' }}>
            {RACES.map(({ name, dist }, i) => (
              <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: i < RACES.length - 1 ? '1px solid var(--border)' : 'none', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{name}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 700, color: 'var(--green)' }}>
                  {fmtTime(secPerKmVal * dist)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
