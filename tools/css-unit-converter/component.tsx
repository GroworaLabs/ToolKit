import { useState, useMemo } from 'react';

type Unit = 'px' | 'rem' | 'em' | '%' | 'vw' | 'vh' | 'pt' | 'cm' | 'mm' | 'in';

const UNITS: Unit[] = ['px', 'rem', 'em', '%', 'vw', 'vh', 'pt', 'cm', 'mm', 'in'];

function toPx(value: number, unit: Unit, base: number, vpW: number, vpH: number): number {
    switch (unit) {
        case 'px':  return value;
        case 'rem': return value * base;
        case 'em':  return value * base;
        case '%':   return (value / 100) * base;
        case 'vw':  return (value / 100) * vpW;
        case 'vh':  return (value / 100) * vpH;
        case 'pt':  return value * (4 / 3);
        case 'cm':  return value * 37.795;
        case 'mm':  return value * 3.7795;
        case 'in':  return value * 96;
    }
}

function fromPx(px: number, unit: Unit, base: number, vpW: number, vpH: number): number {
    switch (unit) {
        case 'px':  return px;
        case 'rem': return px / base;
        case 'em':  return px / base;
        case '%':   return (px / base) * 100;
        case 'vw':  return (px / vpW) * 100;
        case 'vh':  return (px / vpH) * 100;
        case 'pt':  return px * 0.75;
        case 'cm':  return px / 37.795;
        case 'mm':  return px / 3.7795;
        case 'in':  return px / 96;
    }
}

function fmt(n: number): string {
    if (!isFinite(n)) return '—';
    if (Math.abs(n) < 0.0001 && n !== 0) return n.toExponential(3);
    const s = n.toPrecision(6);
    return parseFloat(s).toString();
}

const UNIT_DESC: Record<Unit, string> = {
    px:  'Absolute pixel',
    rem: 'Root font-size relative',
    em:  'Parent font-size relative',
    '%':  'Percentage of parent',
    vw:  'Viewport width %',
    vh:  'Viewport height %',
    pt:  'Points (print)',
    cm:  'Centimetres (print)',
    mm:  'Millimetres (print)',
    in:  'Inches (print)',
};

export default function CssUnitConverterWidget() {
    const [value, setValue] = useState('16');
    const [fromUnit, setFromUnit] = useState<Unit>('px');
    const [base, setBase] = useState('16');
    const [vpW, setVpW] = useState('1440');
    const [vpH, setVpH] = useState('900');

    const results = useMemo(() => {
        const v = parseFloat(value);
        const b = parseFloat(base) || 16;
        const w = parseFloat(vpW) || 1440;
        const h = parseFloat(vpH) || 900;
        if (isNaN(v)) return null;
        const px = toPx(v, fromUnit, b, w, h);
        return UNITS.map(u => ({ unit: u, value: fromPx(px, u, b, w, h) }));
    }, [value, fromUnit, base, vpW, vpH]);

    const inputStyle: React.CSSProperties = {
        padding: '8px 10px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-s)',
        fontSize: 13, color: 'var(--ink)', background: 'var(--page-bg)', outline: 'none',
        fontFamily: 'JetBrains Mono, monospace', width: '100%', boxSizing: 'border-box',
        transition: 'border-color .15s',
    };

    const selectStyle: React.CSSProperties = {
        padding: '8px 10px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-s)',
        fontSize: 13, color: 'var(--ink)', background: 'var(--page-bg)', outline: 'none',
        fontFamily: 'JetBrains Mono, monospace', cursor: 'pointer',
    };

    return (
        <div style={{ minWidth: 0, overflow: 'hidden' }}>
            {/* Main input row */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', display: 'block', marginBottom: 4 }}>VALUE</label>
                    <input type="number" value={value} onChange={e => setValue(e.target.value)}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
                        onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                    />
                </div>
                <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', display: 'block', marginBottom: 4 }}>FROM UNIT</label>
                    <select value={fromUnit} onChange={e => setFromUnit(e.target.value as Unit)} style={selectStyle}>
                        {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
            </div>

            {/* Settings row */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 120 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', display: 'block', marginBottom: 4 }}>BASE FONT (px)</label>
                    <input type="number" value={base} onChange={e => setBase(e.target.value)}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
                        onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                    />
                </div>
                <div style={{ flex: 1, minWidth: 120 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', display: 'block', marginBottom: 4 }}>VIEWPORT W (px)</label>
                    <input type="number" value={vpW} onChange={e => setVpW(e.target.value)}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
                        onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                    />
                </div>
                <div style={{ flex: 1, minWidth: 120 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', display: 'block', marginBottom: 4 }}>VIEWPORT H (px)</label>
                    <input type="number" value={vpH} onChange={e => setVpH(e.target.value)}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
                        onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                    />
                </div>
            </div>

            {/* Results table */}
            {results ? (
                <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--r-l)', overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '52px minmax(0, 1fr) minmax(0, 1fr)', background: 'var(--ink)', color: '#fff', padding: '8px 12px', fontSize: 11, fontWeight: 700, fontFamily: 'Outfit, sans-serif', gap: 8 }}>
                        <span>UNIT</span>
                        <span>VALUE</span>
                        <span>DESCRIPTION</span>
                    </div>
                    {results.map(({ unit, value: v }, i) => (
                        <div key={unit} style={{ display: 'grid', gridTemplateColumns: '52px minmax(0, 1fr) minmax(0, 1fr)', padding: '9px 12px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: i < results.length - 1 ? '1px solid var(--border)' : 'none', gap: 8, alignItems: 'center' }}>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 700, color: unit === fromUnit ? 'var(--green)' : 'var(--ink)' }}>{unit}</span>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink)', wordBreak: 'break-all' }}>{fmt(v)}{unit}</span>
                            <span style={{ fontSize: 12, color: 'var(--ink-4)', wordBreak: 'break-word' }}>{UNIT_DESC[unit]}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ padding: '32px', textAlign: 'center', color: 'var(--ink-4)', fontSize: 14, border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                    Enter a value above to see conversions.
                </div>
            )}
        </div>
    );
}
