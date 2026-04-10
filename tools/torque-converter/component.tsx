import { useState, useCallback } from 'react';

type Unit = 'Nm' | 'kNm' | 'ftlb' | 'inlb' | 'inoz' | 'kgfm' | 'kgfcm' | 'dyncm';

interface UnitDef { label: string; toNm: number; }

const UNIT_DEFS: Record<Unit, UnitDef> = {
  Nm:    { label: 'Newton-metre (N·m)',              toNm: 1 },
  kNm:   { label: 'Kilonewton-metre (kN·m)',         toNm: 1000 },
  ftlb:  { label: 'Foot-pound (ft·lb)',              toNm: 1.3558179483 },
  inlb:  { label: 'Inch-pound (in·lb)',              toNm: 0.1129848290 },
  inoz:  { label: 'Inch-ounce (in·oz)',              toNm: 0.0070615518 },
  kgfm:  { label: 'Kilogram-force metre (kgf·m)',   toNm: 9.80665 },
  kgfcm: { label: 'Kilogram-force cm (kgf·cm)',     toNm: 0.0980665 },
  dyncm: { label: 'Dyne-centimetre (dyn·cm)',        toNm: 0.0000001 },
};

const UNITS = Object.keys(UNIT_DEFS) as Unit[];

function fmt(n: number): string {
  if (!isFinite(n) || isNaN(n)) return '—';
  if (n === 0) return '0';
  const abs = Math.abs(n);
  if (abs >= 0.0001 && abs < 1e10) return parseFloat(n.toPrecision(7)).toString();
  return n.toExponential(4);
}

function Row({ unit, value, active, onChange }: {
  unit: Unit; value: string; active: boolean; onChange: (u: Unit, v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="conv-row">
      <label className="conv-row-label" style={{ width: 240, fontSize: 13, fontWeight: 600, color: active ? 'var(--green)' : 'var(--ink)', cursor: 'pointer' }}>
        {UNIT_DEFS[unit].label}
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

export default function TorqueConverterWidget() {
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
    const inNm = num * UNIT_DEFS[unit].toNm;
    setValues(Object.fromEntries(
      UNITS.map(u => [u, u === unit ? raw : fmt(inNm / UNIT_DEFS[u].toNm)])
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

      {/* Common torque specs */}
      <div style={{ marginTop: 24 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>Common torque specifications</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ minWidth: 420, borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                {['Application', 'N·m', 'ft·lb'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Spark plug (alum. head)', '20–30',   '15–22'],
                ['Wheel nut (car)',         '100–130', '74–96'],
                ['Bike stem bolt',          '4–6',     '3–4.4'],
                ['Cylinder head',           '80–120',  '59–89'],
                ['Brake caliper',           '25–50',   '18–37'],
              ].map(([app, nm, ftlb], i) => (
                <tr key={app} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '6px 12px', color: 'var(--ink-2)' }}>{app}</td>
                  <td style={{ padding: '6px 12px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, color: 'var(--green)' }}>{nm}</td>
                  <td style={{ padding: '6px 12px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-3)' }}>{ftlb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
