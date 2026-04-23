'use client';
import { useState, useEffect, useCallback } from 'react';

function hexToRgb(hex: string): [number, number, number] | null {
  const h = hex.replace('#', '');
  if (h.length === 3) {
    const r = parseInt(h[0] + h[0], 16);
    const g = parseInt(h[1] + h[1], 16);
    const b = parseInt(h[2] + h[2], 16);
    return [r, g, b];
  }
  if (h.length === 6) {
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  return null;
}

function parseCssColor(input: string): [number, number, number] | null {
  const s = input.trim().toLowerCase();
  if (s.startsWith('#')) return hexToRgb(s);
  const m = s.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
  if (m) return [+m[1], +m[2], +m[3]];
  // Use canvas to parse named colours / hsl
  try {
    const ctx = document.createElement('canvas').getContext('2d')!;
    ctx.fillStyle = '#000';
    ctx.fillStyle = input;
    const col = ctx.fillStyle;
    if (col === '#000000' && input.toLowerCase() !== 'black' && input !== '#000' && input !== '#000000') return null;
    return hexToRgb(col);
  } catch { return null; }
}

function linearise(c: number): number {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance(r: number, g: number, b: number): number {
  return 0.2126 * linearise(r) + 0.7152 * linearise(g) + 0.0722 * linearise(b);
}

function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker  = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

type Result = {
  ratio: number;
  aa_normal: boolean;
  aa_large:  boolean;
  aaa_normal: boolean;
  aaa_large:  boolean;
  fgHex: string;
  bgHex: string;
};

const PRESETS: { label: string; fg: string; bg: string }[] = [
  { label: 'Black on White',  fg: '#000000', bg: '#ffffff' },
  { label: 'White on Black',  fg: '#ffffff', bg: '#000000' },
  { label: 'White on Blue',   fg: '#ffffff', bg: '#1d4ed8' },
  { label: 'Dark on Yellow',  fg: '#1a1a1a', bg: '#fef08a' },
  { label: 'Fail (grey)',     fg: '#888888', bg: '#bbbbbb' },
];

function Badge({ pass, label }: { pass: boolean; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px',
      borderRadius: 8, background: pass ? '#f0fdf4' : '#fef2f2',
      border: `1.5px solid ${pass ? '#86efac' : '#fca5a5'}` }}>
      <span style={{ fontSize: 16, lineHeight: 1 }}>{pass ? '✓' : '✗'}</span>
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: pass ? '#15803d' : '#dc2626' }}>{pass ? 'Pass' : 'Fail'}</div>
        <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{label}</div>
      </div>
    </div>
  );
}

export default function ColorContrastChecker() {
  const [fg,     setFg]     = useState('#1a1a1a');
  const [bg,     setBg]     = useState('#ffffff');
  const [fgText, setFgText] = useState('#1a1a1a');
  const [bgText, setBgText] = useState('#ffffff');
  const [result, setResult] = useState<Result | null>(null);

  const compute = useCallback((fgVal: string, bgVal: string) => {
    const fgRgb = parseCssColor(fgVal);
    const bgRgb = parseCssColor(bgVal);
    if (!fgRgb || !bgRgb) { setResult(null); return; }
    const lFg = relativeLuminance(...fgRgb);
    const lBg = relativeLuminance(...bgRgb);
    const ratio = contrastRatio(lFg, lBg);
    setResult({
      ratio,
      aa_normal:  ratio >= 4.5,
      aa_large:   ratio >= 3.0,
      aaa_normal: ratio >= 7.0,
      aaa_large:  ratio >= 4.5,
      fgHex: rgbToHex(...fgRgb),
      bgHex: rgbToHex(...bgRgb),
    });
  }, []);

  useEffect(() => { compute(fg, bg); }, [fg, bg, compute]);

  const handleFgText = (v: string) => {
    setFgText(v);
    const rgb = parseCssColor(v);
    if (rgb) { const h = rgbToHex(...rgb); setFg(h); }
  };
  const handleBgText = (v: string) => {
    setBgText(v);
    const rgb = parseCssColor(v);
    if (rgb) { const h = rgbToHex(...rgb); setBg(h); }
  };
  const handleFgPick = (v: string) => { setFg(v); setFgText(v); };
  const handleBgPick = (v: string) => { setBg(v); setBgText(v); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Presets */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {PRESETS.map(p => (
          <button key={p.label} onClick={() => { handleFgPick(p.fg); handleBgPick(p.bg); }}
            style={{ padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
              border: '1.5px solid var(--border)', background: p.bg, color: p.fg, fontWeight: 600 }}>
            {p.label}
          </button>
        ))}
      </div>

      {/* Colour pickers */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {[
          { label: 'Foreground (text)', val: fg, textVal: fgText, onPick: handleFgPick, onText: handleFgText },
          { label: 'Background',        val: bg, textVal: bgText, onPick: handleBgPick, onText: handleBgText },
        ].map(({ label, val, textVal, onPick, onText }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>{label}</label>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="color" value={val} onChange={e => onPick(e.target.value)}
                style={{ width: 44, height: 44, border: 'none', borderRadius: 8, cursor: 'pointer', padding: 2, background: 'transparent' }} />
              <input type="text" value={textVal} onChange={e => onText(e.target.value)}
                placeholder="#000000"
                style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1.5px solid var(--border)',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--surface)', color: 'var(--ink)' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Preview */}
      {result && (
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1.5px solid var(--border)' }}>
          <div style={{ background: result.bgHex, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <p style={{ margin: 0, color: result.fgHex, fontSize: 24, fontWeight: 700, lineHeight: 1.3 }}>The quick brown fox</p>
            <p style={{ margin: 0, color: result.fgHex, fontSize: 16, lineHeight: 1.5 }}>Regular text — 16px (AA normal threshold)</p>
            <p style={{ margin: 0, color: result.fgHex, fontSize: 13, lineHeight: 1.5 }}>Small text — 13px</p>
          </div>
        </div>
      )}

      {/* Ratio + badges */}
      {result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 48, fontWeight: 800, color: 'var(--ink)', fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '-0.02em' }}>
              {result.ratio.toFixed(2)}
            </span>
            <span style={{ fontSize: 22, color: 'var(--ink-3)', marginLeft: 4 }}>:1</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Badge pass={result.aa_normal}  label="AA — Normal text (4.5:1)" />
            <Badge pass={result.aa_large}   label="AA — Large text (3:1)" />
            <Badge pass={result.aaa_normal} label="AAA — Normal text (7:1)" />
            <Badge pass={result.aaa_large}  label="AAA — Large text (4.5:1)" />
          </div>
        </div>
      )}

      {!result && (
        <p style={{ color: 'var(--ink-3)', fontSize: 13, margin: 0 }}>Enter valid CSS colours to see the contrast ratio.</p>
      )}
    </div>
  );
}
