import { useState, useCallback } from 'react';

type Unit =
  | 'bps' | 'kbps' | 'Mbps' | 'Gbps' | 'Tbps'
  | 'Bps' | 'KBps' | 'MBps' | 'GBps';

interface UnitDef { label: string; toBps: number; group: string; }

const UNIT_DEFS: Record<Unit, UnitDef> = {
  bps:  { label: 'Bit per second (bps)',        toBps: 1,                group: 'Bits per second' },
  kbps: { label: 'Kilobit per second (kbps)',   toBps: 1_000,            group: 'Bits per second' },
  Mbps: { label: 'Megabit per second (Mbps)',   toBps: 1_000_000,        group: 'Bits per second' },
  Gbps: { label: 'Gigabit per second (Gbps)',   toBps: 1_000_000_000,    group: 'Bits per second' },
  Tbps: { label: 'Terabit per second (Tbps)',   toBps: 1_000_000_000_000,group: 'Bits per second' },
  Bps:  { label: 'Byte per second (B/s)',        toBps: 8,               group: 'Bytes per second' },
  KBps: { label: 'Kilobyte per second (KB/s)',   toBps: 8_000,           group: 'Bytes per second' },
  MBps: { label: 'Megabyte per second (MB/s)',   toBps: 8_000_000,       group: 'Bytes per second' },
  GBps: { label: 'Gigabyte per second (GB/s)',   toBps: 8_000_000_000,   group: 'Bytes per second' },
};

const UNITS = Object.keys(UNIT_DEFS) as Unit[];

function fmt(n: number): string {
  if (!isFinite(n) || isNaN(n)) return '—';
  if (n === 0) return '0';
  const abs = Math.abs(n);
  if (abs >= 0.001 && abs < 1e13) return parseFloat(n.toPrecision(7)).toString();
  return n.toExponential(4);
}

function Row({ unit, value, active, onChange }: {
  unit: Unit; value: string; active: boolean; onChange: (u: Unit, v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const def = UNIT_DEFS[unit];
  return (
    <div className="conv-row">
      <label className="conv-row-label" style={{ width: 230, fontSize: 13, fontWeight: 600, color: active ? 'var(--green)' : 'var(--ink)', lineHeight: 1.3, cursor: 'pointer' }}>
        {def.label}
        <span style={{ display: 'block', fontSize: 11, fontWeight: 400, color: 'var(--ink-3)' }}>{def.group}</span>
      </label>
      <input
        type="number"
        inputMode="decimal"
        value={value}
        placeholder="0"
        onChange={e => onChange(unit, e.target.value)}
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

/* ── Download time calculator ───────────────────────────── */
function DownloadCalc({ bps }: { bps: number | null }) {
  const [fileSizeMB, setFileSizeMB] = useState('');
  if (!bps || bps <= 0) return null;

  const mb = parseFloat(fileSizeMB);
  let result = '';
  if (mb > 0) {
    const sec = (mb * 8_000_000) / bps;
    if (sec < 60)        result = `${Math.ceil(sec)} sec`;
    else if (sec < 3600) result = `${(sec / 60).toFixed(1)} min`;
    else                 result = `${(sec / 3600).toFixed(2)} hr`;
  }

  return (
    <div style={{ marginTop: 20, padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>Download time calculator</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <input
          type="number"
          inputMode="decimal"
          value={fileSizeMB}
          placeholder="File size in MB"
          onChange={e => setFileSizeMB(e.target.value)}
          style={{
            flex: 1, padding: '8px 12px',
            background: 'var(--page-bg)', border: '1.5px solid var(--border)',
            borderRadius: 'var(--r-m)', fontFamily: 'JetBrains Mono, monospace',
            fontSize: 13, color: 'var(--ink)', outline: 'none', boxSizing: 'border-box' as const,
          }}
        />
        <span style={{ fontSize: 12, color: 'var(--ink-3)', flexShrink: 0 }}>MB</span>
        {result && (
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 15, fontWeight: 700, color: 'var(--green)', flexShrink: 0 }}>
            ≈ {result}
          </span>
        )}
      </div>
    </div>
  );
}

export default function BitrateConverterWidget() {
  const [values, setValues] = useState<Record<Unit, string>>(
    () => Object.fromEntries(UNITS.map(u => [u, ''])) as Record<Unit, string>
  );
  const [activeUnit, setActiveUnit] = useState<Unit | null>(null);

  const handleChange = useCallback((unit: Unit, raw: string) => {
    setActiveUnit(unit);
    if (raw === '' || raw === '-') {
      setValues(Object.fromEntries(UNITS.map(u => [u, ''])) as Record<Unit, string>);
      return;
    }
    const num = parseFloat(raw);
    if (isNaN(num)) return;
    const inBps = num * UNIT_DEFS[unit].toBps;
    setValues(Object.fromEntries(
      UNITS.map(u => [u, u === unit ? raw : fmt(inBps / UNIT_DEFS[u].toBps)])
    ) as Record<Unit, string>);
  }, []);

  const hasValue = UNITS.some(u => values[u] !== '');

  // Current speed in bps for download calc
  const bps = activeUnit ? parseFloat(values[activeUnit]) * UNIT_DEFS[activeUnit].toBps : null;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <p style={{ fontSize: 13, color: 'var(--ink-3)', margin: 0 }}>Type a value in any field — all units update instantly</p>
        {hasValue && (
          <button onClick={() => { setValues(Object.fromEntries(UNITS.map(u => [u, ''])) as Record<Unit, string>); setActiveUnit(null); }}
            style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', background: 'none', border: '1px solid var(--border)', borderRadius: 'var(--r-m)', padding: '4px 10px', cursor: 'pointer' }}>
            Clear
          </button>
        )}
      </div>
      <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', padding: '0 16px', boxShadow: 'var(--sh-xs)' }}>
        {UNITS.map(u => (
          <Row key={u} unit={u} value={values[u]} active={activeUnit === u} onChange={handleChange} />
        ))}
      </div>

      <DownloadCalc bps={bps} />
    </div>
  );
}
