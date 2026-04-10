import { useState, useCallback } from 'react';

type Base = 'binary' | 'octal' | 'decimal' | 'hex';

const BASES: Base[] = ['binary', 'octal', 'decimal', 'hex'];

const LABELS: Record<Base, string> = {
  binary:  'Binary (base 2)',
  octal:   'Octal (base 8)',
  decimal: 'Decimal (base 10)',
  hex:     'Hexadecimal (base 16)',
};

const PREFIXES: Record<Base, string> = {
  binary:  '0b',
  octal:   '0o',
  decimal: '',
  hex:     '0x',
};

const PLACEHOLDERS: Record<Base, string> = {
  binary:  'e.g. 11111111',
  octal:   'e.g. 377',
  decimal: 'e.g. 255',
  hex:     'e.g. FF',
};

const RADIX: Record<Base, number> = {
  binary: 2, octal: 8, decimal: 10, hex: 16,
};

const VALID: Record<Base, RegExp> = {
  binary:  /^[01]*$/,
  octal:   /^[0-7]*$/,
  decimal: /^[0-9]*$/,
  hex:     /^[0-9a-fA-F]*$/,
};

function toDecimal(val: string, base: Base): bigint | null {
  if (!val) return null;
  try { return BigInt('0x' + parseInt(val, RADIX[base]).toString(16)); } catch { return null; }
}

function fromDecimal(n: bigint, base: Base): string {
  return n.toString(RADIX[base]).toUpperCase();
}

interface RowProps {
  base:     Base;
  value:    string;
  active:   boolean;
  onChange: (base: Base, val: string) => void;
}

function Row({ base, value, active, onChange }: RowProps) {
  const [focused, setFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\s/g, '').toUpperCase();
    if (VALID[base].test(v)) onChange(base, v);
  };

  return (
    <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 160, flexShrink: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: active ? 'var(--green)' : 'var(--ink)', transition: 'color .15s' }}>
          {LABELS[base]}
        </div>
        <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'JetBrains Mono, monospace', marginTop: 2 }}>
          {PREFIXES[base] || 'no prefix'}
        </div>
      </div>
      <input
        type="text"
        spellCheck={false}
        value={value}
        placeholder={PLACEHOLDERS[base]}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1,
          padding: '9px 12px',
          background: active ? 'var(--green-lt)' : 'var(--page-bg)',
          border: `1.5px solid ${focused ? 'var(--green)' : active ? 'rgba(5,150,105,.3)' : 'var(--border)'}`,
          borderRadius: 'var(--r-m)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 14,
          color: 'var(--ink)',
          outline: 'none',
          boxSizing: 'border-box' as const,
          transition: 'border-color .15s, background .15s',
          boxShadow: focused ? '0 0 0 3px rgba(5,150,105,.09)' : 'none',
          letterSpacing: base === 'binary' ? '0.05em' : 'normal',
        }}
      />
    </div>
  );
}

export default function NumberBaseConverterWidget() {
  const [values, setValues] = useState<Record<Base, string>>({
    binary: '', octal: '', decimal: '', hex: '',
  });
  const [activeBase, setActiveBase] = useState<Base | null>(null);

  const handleChange = useCallback((base: Base, raw: string) => {
    setActiveBase(base);
    if (!raw) {
      setValues({ binary: '', octal: '', decimal: '', hex: '' });
      return;
    }
    const n = toDecimal(raw, base);
    if (n === null || n < 0n) return;
    const next = {} as Record<Base, string>;
    for (const b of BASES) {
      next[b] = b === base ? raw.toUpperCase() : fromDecimal(n, b);
    }
    setValues(next);
  }, []);

  const handleClear = () => {
    setValues({ binary: '', octal: '', decimal: '', hex: '' });
    setActiveBase(null);
  };

  const hasValue = BASES.some(b => values[b] !== '');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <p style={{ fontSize: 13, color: 'var(--ink-3)', margin: 0 }}>
          Type in any field — all bases update instantly
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

      <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', padding: '0 16px', boxShadow: 'var(--sh-xs)' }}>
        {BASES.map(base => (
          <Row
            key={base}
            base={base}
            value={values[base]}
            active={activeBase === base}
            onChange={handleChange}
          />
        ))}
      </div>

      {/* Quick reference */}
      <div style={{ marginTop: 24 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>Quick reference</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ minWidth: 460, borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                {['Decimal', 'Binary', 'Octal', 'Hex'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[0,1,2,4,8,10,15,16,32,64,128,255,256,1024,65535].map((n, i) => (
                <tr key={n} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '6px 12px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, color: 'var(--ink)' }}>{n}</td>
                  <td style={{ padding: '6px 12px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-2)', fontSize: 12 }}>{n.toString(2)}</td>
                  <td style={{ padding: '6px 12px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-2)' }}>{n.toString(8)}</td>
                  <td style={{ padding: '6px 12px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--green)', fontWeight: 600 }}>{n.toString(16).toUpperCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
