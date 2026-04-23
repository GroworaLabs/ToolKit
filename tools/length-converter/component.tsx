import { useState, useCallback } from 'react';

type Unit = 'm' | 'km' | 'cm' | 'mm' | 'um' | 'mi' | 'ft' | 'in' | 'yd' | 'nmi';

interface UnitDef { label: string; toM: number; group: string; }

const UNIT_DEFS: Record<Unit, UnitDef> = {
  m:   { label: 'Metre (m)',           toM: 1,           group: 'SI' },
  km:  { label: 'Kilometre (km)',      toM: 1_000,       group: 'SI' },
  cm:  { label: 'Centimetre (cm)',     toM: 0.01,        group: 'SI' },
  mm:  { label: 'Millimetre (mm)',     toM: 0.001,       group: 'SI' },
  um:  { label: 'Micrometre (µm)',     toM: 1e-6,        group: 'SI' },
  mi:  { label: 'Mile (mi)',          toM: 1609.344,    group: 'Imperial' },
  ft:  { label: 'Foot (ft)',          toM: 0.3048,      group: 'Imperial' },
  in:  { label: 'Inch (in)',          toM: 0.0254,      group: 'Imperial' },
  yd:  { label: 'Yard (yd)',          toM: 0.9144,      group: 'Imperial' },
  nmi: { label: 'Nautical Mile (nmi)',toM: 1852,         group: 'Maritime' },
};

const UNITS = Object.keys(UNIT_DEFS) as Unit[];

function fmt(n: number): string {
  if (!isFinite(n) || isNaN(n)) return '—';
  if (n === 0) return '0';
  const abs = Math.abs(n);
  if (abs >= 0.001 && abs < 1e12) return parseFloat(n.toPrecision(7)).toString();
  return n.toExponential(4);
}

function Row({ unit, value, active, onChange }: {
  unit: Unit; value: string; active: boolean; onChange: (u: Unit, v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const def = UNIT_DEFS[unit];
  return (
    <div className="conv-row">
      <label className="conv-row-label" style={{ width: 200, fontSize: 13, fontWeight: 600, color: active ? 'var(--green)' : 'var(--ink)', lineHeight: 1.3, cursor: 'pointer' }}>
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

export default function LengthConverterWidget() {
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
    const inMetres = num * UNIT_DEFS[unit].toM;
    setValues(Object.fromEntries(
      UNITS.map(u => [u, u === unit ? raw : fmt(inMetres / UNIT_DEFS[u].toM)])
    ) as Record<Unit, string>);
  }, []);

  const hasValue = UNITS.some(u => values[u] !== '');

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
    </div>
  );
}
