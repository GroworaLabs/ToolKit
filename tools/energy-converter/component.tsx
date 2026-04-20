import { useState, useCallback } from 'react';

type Unit = 'J' | 'kJ' | 'MJ' | 'GJ' | 'cal' | 'kcal' | 'Wh' | 'kWh' | 'MWh' | 'BTU' | 'therm' | 'eV' | 'ft_lbf' | 'erg';

interface UnitDef { label: string; toJ: number; group: string; }

const UNIT_DEFS: Record<Unit, UnitDef> = {
  J:      { label: 'Joule (J)',                    toJ: 1,                   group: 'SI' },
  kJ:     { label: 'Kilojoule (kJ)',               toJ: 1_000,              group: 'SI' },
  MJ:     { label: 'Megajoule (MJ)',               toJ: 1_000_000,          group: 'SI' },
  GJ:     { label: 'Gigajoule (GJ)',               toJ: 1_000_000_000,      group: 'SI' },
  cal:    { label: 'Calorie (cal)',                 toJ: 4.1868,             group: 'Thermal' },
  kcal:   { label: 'Kilocalorie (kcal)',            toJ: 4_186.8,            group: 'Thermal' },
  Wh:     { label: 'Watt-hour (Wh)',               toJ: 3_600,              group: 'Electrical' },
  kWh:    { label: 'Kilowatt-hour (kWh)',           toJ: 3_600_000,          group: 'Electrical' },
  MWh:    { label: 'Megawatt-hour (MWh)',           toJ: 3_600_000_000,      group: 'Electrical' },
  BTU:    { label: 'British Thermal Unit (BTU)',    toJ: 1_055.06,           group: 'Imperial' },
  therm:  { label: 'Therm',                         toJ: 105_505_600,        group: 'Imperial' },
  eV:     { label: 'Electronvolt (eV)',             toJ: 1.602176634e-19,    group: 'Physics' },
  ft_lbf: { label: 'Foot-pound (ft·lbf)',          toJ: 1.3558179,          group: 'Imperial' },
  erg:    { label: 'Erg',                           toJ: 1e-7,              group: 'CGS' },
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
      <label className="conv-row-label" style={{ width: 220, fontSize: 13, fontWeight: 600, color: active ? 'var(--green)' : 'var(--ink)', lineHeight: 1.3, cursor: 'pointer' }}>
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

export default function EnergyConverterWidget() {
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
    const inJoules = num * UNIT_DEFS[unit].toJ;
    setValues(Object.fromEntries(
      UNITS.map(u => [u, u === unit ? raw : fmt(inJoules / UNIT_DEFS[u].toJ)])
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
