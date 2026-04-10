import { useState, useCallback } from 'react';

/* ── Conversion ratios relative to seconds ──────────────── */
const TO_SECONDS: Record<string, number> = {
  seconds: 1,
  minutes: 60,
  hours:   3_600,
  days:    86_400,
  weeks:   604_800,
  years:   31_536_000,
};

const UNITS = ['seconds', 'minutes', 'hours', 'days', 'weeks', 'years'] as const;
type Unit = typeof UNITS[number];

const LABELS: Record<Unit, string> = {
  seconds: 'Seconds',
  minutes: 'Minutes',
  hours:   'Hours',
  days:    'Days',
  weeks:   'Weeks',
  years:   'Years',
};

const EXAMPLES: Record<Unit, string> = {
  seconds: 'e.g. 3600',
  minutes: 'e.g. 60',
  hours:   'e.g. 24',
  days:    'e.g. 7',
  weeks:   'e.g. 52',
  years:   'e.g. 1',
};

function fmt(n: number): string {
  if (!isFinite(n)) return '—';
  if (n === 0) return '0';
  // Show up to 6 significant digits for large numbers, strip trailing zeros
  if (Math.abs(n) >= 1) {
    const s = parseFloat(n.toPrecision(10)).toString();
    return s;
  }
  return parseFloat(n.toPrecision(6)).toString();
}

interface RowProps {
  unit:     Unit;
  value:    string;
  active:   boolean;
  onChange: (unit: Unit, val: string) => void;
}

function Row({ unit, value, active, onChange }: RowProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="tc-row">
      <label
        htmlFor={`tc-${unit}`}
        style={{ fontSize: 13, fontWeight: 600, color: active ? 'var(--green)' : 'var(--ink)', transition: 'color .15s' }}
      >
        {LABELS[unit]}
      </label>
      <input
        id={`tc-${unit}`}
        type="number"
        inputMode="decimal"
        value={value}
        placeholder={EXAMPLES[unit]}
        onChange={e => onChange(unit, e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '9px 12px',
          background: active ? 'var(--green-lt)' : 'var(--page-bg)',
          border: `1.5px solid ${focused ? 'var(--green)' : active ? 'rgba(5,150,105,.3)' : 'var(--border)'}`,
          borderRadius: 'var(--r-m)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 14,
          color: 'var(--ink)',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color .15s, background .15s',
          boxShadow: focused ? '0 0 0 3px rgba(5,150,105,.09)' : 'none',
        }}
      />
    </div>
  );
}

export default function TimeConverterWidget() {
  const [values,      setValues]      = useState<Record<Unit, string>>({ seconds: '', minutes: '', hours: '', days: '', weeks: '', years: '' });
  const [activeUnit,  setActiveUnit]  = useState<Unit | null>(null);

  const handleChange = useCallback((unit: Unit, raw: string) => {
    setActiveUnit(unit);
    if (raw === '' || raw === '-') {
      setValues({ seconds: '', minutes: '', hours: '', days: '', weeks: '', years: '' });
      return;
    }
    const num = parseFloat(raw);
    if (isNaN(num)) return;

    const inSeconds = num * TO_SECONDS[unit];
    const next = {} as Record<Unit, string>;
    for (const u of UNITS) {
      const converted = inSeconds / TO_SECONDS[u];
      next[u] = u === unit ? raw : fmt(converted);
    }
    setValues(next);
  }, []);

  const handleClear = () => {
    setValues({ seconds: '', minutes: '', hours: '', days: '', weeks: '', years: '' });
    setActiveUnit(null);
  };

  const hasValue = UNITS.some(u => values[u] !== '');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <p style={{ fontSize: 13, color: 'var(--ink-3)', margin: 0 }}>
          Type a value in any field — all units update instantly
        </p>
        {hasValue && (
          <button
            onClick={handleClear}
            style={{
              fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', background: 'none',
              border: '1px solid var(--border)', borderRadius: 'var(--r-m)',
              padding: '4px 10px', cursor: 'pointer',
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Conversion rows */}
      <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', padding: '4px 16px', boxShadow: 'var(--sh-xs)' }}>
        {UNITS.map(unit => (
          <Row
            key={unit}
            unit={unit}
            value={values[unit]}
            active={activeUnit === unit}
            onChange={handleChange}
          />
        ))}
      </div>

      {/* Reference table */}
      <div style={{ marginTop: 24 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>Common reference values</p>
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table style={{ minWidth: 480, borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                {['Duration', 'Seconds', 'Minutes', 'Hours', 'Days'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: '1 minute',  s: 60,          m: 1,          h: '0.0167',    d: '0.000694' },
                { label: '1 hour',    s: 3_600,        m: 60,         h: 1,           d: '0.0417'   },
                { label: '1 day',     s: 86_400,       m: 1_440,      h: 24,          d: 1          },
                { label: '1 week',    s: 604_800,      m: 10_080,     h: 168,         d: 7          },
                { label: '30 days',   s: 2_592_000,    m: 43_200,     h: 720,         d: 30         },
                { label: '1 year',    s: 31_536_000,   m: 525_600,    h: 8_760,       d: 365        },
              ].map(({ label, s, m, h, d }, i) => (
                <tr key={label} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--ink)' }}>{label}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-2)' }}>{s.toLocaleString()}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-2)' }}>{typeof m === 'number' ? m.toLocaleString() : m}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-2)' }}>{h}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-2)' }}>{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
