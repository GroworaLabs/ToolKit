import { useState, useCallback } from 'react';

type Unit = 'bit' | 'B' | 'KB' | 'KiB' | 'MB' | 'MiB' | 'GB' | 'GiB' | 'TB' | 'TiB' | 'PB' | 'PiB';

interface UnitDef { label: string; toB: number; group: string; }

const UNIT_DEFS: Record<Unit, UnitDef> = {
  bit: { label: 'Bit (b)',           toB: 0.125,                  group: 'Base' },
  B:   { label: 'Byte (B)',          toB: 1,                      group: 'Base' },
  KB:  { label: 'Kilobyte (KB)',     toB: 1_000,                  group: 'SI (decimal)' },
  KiB: { label: 'Kibibyte (KiB)',    toB: 1_024,                  group: 'IEC (binary)' },
  MB:  { label: 'Megabyte (MB)',     toB: 1_000_000,              group: 'SI (decimal)' },
  MiB: { label: 'Mebibyte (MiB)',    toB: 1_048_576,              group: 'IEC (binary)' },
  GB:  { label: 'Gigabyte (GB)',     toB: 1_000_000_000,          group: 'SI (decimal)' },
  GiB: { label: 'Gibibyte (GiB)',    toB: 1_073_741_824,          group: 'IEC (binary)' },
  TB:  { label: 'Terabyte (TB)',     toB: 1_000_000_000_000,      group: 'SI (decimal)' },
  TiB: { label: 'Tebibyte (TiB)',    toB: 1_099_511_627_776,      group: 'IEC (binary)' },
  PB:  { label: 'Petabyte (PB)',     toB: 1_000_000_000_000_000,  group: 'SI (decimal)' },
  PiB: { label: 'Pebibyte (PiB)',    toB: 1_125_899_906_842_624,  group: 'IEC (binary)' },
};

const UNITS = Object.keys(UNIT_DEFS) as Unit[];

function fmt(n: number): string {
  if (!isFinite(n) || isNaN(n)) return '—';
  if (n === 0) return '0';
  const abs = Math.abs(n);
  if (abs >= 0.001 && abs < 1e15) return parseFloat(n.toPrecision(7)).toString();
  return n.toExponential(4);
}

function Row({ unit, value, active, onChange }: {
  unit: Unit; value: string; active: boolean; onChange: (u: Unit, v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const def = UNIT_DEFS[unit];
  const isBinary = def.group.includes('IEC') || unit === 'bit' || unit === 'B';
  const groupColor = def.group.includes('SI') ? 'var(--blue)' : def.group.includes('IEC') ? 'var(--amber)' : 'var(--ink-4)';

  return (
    <div className="conv-row">
      <label className="conv-row-label" style={{ width: 210, fontSize: 13, fontWeight: 600, color: active ? 'var(--green)' : 'var(--ink)', lineHeight: 1.3, cursor: 'pointer' }}>
        {def.label}
        <span style={{ display: 'block', fontSize: 11, fontWeight: 400, color: groupColor }}>{def.group}</span>
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

export default function DataStorageConverterWidget() {
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
    const inBytes = num * UNIT_DEFS[unit].toB;
    setValues(Object.fromEntries(
      UNITS.map(u => [u, u === unit ? raw : fmt(inBytes / UNIT_DEFS[u].toB)])
    ) as Record<Unit, string>);
  }, []);

  const hasValue = UNITS.some(u => values[u] !== '');

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--ink-3)' }}>
          <span style={{ color: 'var(--blue)', fontWeight: 600 }}>SI (decimal, ×1000)</span>
          <span style={{ color: 'var(--amber)', fontWeight: 600 }}>IEC (binary, ×1024)</span>
        </div>
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
      <p style={{ fontSize: 12, color: 'var(--ink-4)', marginTop: 8 }}>
        Type a value in any field — all other units update instantly
      </p>
    </div>
  );
}
