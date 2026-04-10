import { CSSProperties } from 'react';
import { useColorConverter } from './use-color-converter';
import type { ColorFormat } from './use-color-converter';

const IcoCopy = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
);
const IcoCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const FORMATS: { value: ColorFormat; label: string; placeholder: string }[] = [
  { value: 'hex',  label: 'HEX',  placeholder: '#3b82f6' },
  { value: 'rgb',  label: 'RGB',  placeholder: '59, 130, 246' },
  { value: 'hsl',  label: 'HSL',  placeholder: '217, 91, 60' },
  { value: 'hsv',  label: 'HSV',  placeholder: '217, 76, 96' },
  { value: 'cmyk', label: 'CMYK', placeholder: '76, 47, 0, 4' },
];

export default function ColorConverterWidget() {
  const {
    inputFormat, setInputFormat,
    rawInput, setRawInput,
    pickerColor, handlePickerChange,
    colors, isInvalid, copied, copy,
  } = useColorConverter();

  const inputStyle: CSSProperties = {
    flex: 1, padding: '9px 12px',
    border: '1.5px solid var(--border)', borderRadius: 'var(--r-s)',
    fontSize: 14, color: 'var(--ink)', background: 'var(--white)',
    outline: 'none', fontFamily: 'JetBrains Mono, monospace',
    boxSizing: 'border-box',
  };

  const labelStyle: CSSProperties = {
    fontSize: 12, fontWeight: 600, color: 'var(--ink-3)',
    letterSpacing: '0.05em', textTransform: 'uppercase',
    marginBottom: 6, display: 'block',
  };

  return (
    <div>
      {/* Color picker + preview */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'stretch' }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{
            width: 80, height: 80, borderRadius: 'var(--r-l)',
            background: pickerColor,
            border: '1.5px solid var(--border)', cursor: 'pointer',
            boxShadow: 'var(--sh-xs)',
          }} />
          <input
            type="color"
            value={pickerColor}
            onChange={e => handlePickerChange(e.target.value)}
            style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.02em' }}>
            {colors.hex.toUpperCase()}
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>{colors.css}</div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>{colors.cssHsl}</div>
          {/* Brightness strip */}
          <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
            {[...Array(9)].map((_, i) => (
              <div key={i} style={{ flex: 1, height: 10, borderRadius: 2, background: `hsl(${colors.hsl.h}, ${colors.hsl.s}%, ${(i + 1) * 10}%)` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Format selector + input */}
      <div style={{ marginBottom: 20 }}>
        <span style={labelStyle}>Input format</span>
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          {FORMATS.map(f => {
            const active = inputFormat === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setInputFormat(f.value)}
                style={{
                  padding: '4px 12px', borderRadius: 99, fontSize: 12, fontWeight: 700,
                  border: `1.5px solid ${active ? 'var(--green)' : 'var(--border)'}`,
                  background: active ? 'var(--green-lt)' : 'var(--white)',
                  color: active ? 'var(--green)' : 'var(--ink-2)',
                  cursor: 'pointer', transition: 'all .13s', letterSpacing: '0.04em',
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <input
          type="text"
          value={rawInput}
          onChange={e => setRawInput(e.target.value)}
          placeholder={FORMATS.find(f => f.value === inputFormat)?.placeholder}
          style={{ ...inputStyle, width: '100%', borderColor: isInvalid ? 'var(--red)' : 'var(--border)' }}
        />
        {isInvalid && (
          <p style={{ fontSize: 12, color: 'var(--red)', marginTop: 6 }}>
            Invalid {inputFormat.toUpperCase()} — check the placeholder for an example
          </p>
        )}
      </div>

      {/* Output rows */}
      <div className="rule" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { key: 'hex',    label: 'HEX',         value: colors.hex.toUpperCase() },
          { key: 'css',    label: 'CSS RGB',      value: colors.css },
          { key: 'csshsl', label: 'CSS HSL',      value: colors.cssHsl },
          { key: 'rgb',    label: 'RGB',          value: `${colors.rgb.r}, ${colors.rgb.g}, ${colors.rgb.b}` },
          { key: 'hsl',    label: 'HSL',          value: `${colors.hsl.h}°, ${colors.hsl.s}%, ${colors.hsl.l}%` },
          { key: 'hsv',    label: 'HSV',          value: `${colors.hsv.h}°, ${colors.hsv.s}%, ${colors.hsv.v}%` },
          { key: 'cmyk',   label: 'CMYK',         value: `${colors.cmyk.c}%, ${colors.cmyk.m}%, ${colors.cmyk.y}%, ${colors.cmyk.k}%` },
          { key: 'cssvar', label: 'CSS Variable', value: `--color: ${colors.hex};` },
        ].map(({ key, label, value }) => (
          <div
            key={key}
            onClick={() => copy(value, key)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 14px', cursor: 'pointer',
              background: copied === key ? 'var(--green-lt)' : 'var(--page-bg)',
              border: `1.5px solid ${copied === key ? 'var(--green-mid)' : 'var(--border)'}`,
              borderRadius: 'var(--r-m)', transition: 'all .15s',
            }}
          >
            <div style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0, background: colors.hex, border: '1px solid var(--border)' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-4)', minWidth: 68, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</span>
            <span style={{ flex: 1, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--ink)' }}>{value}</span>
            <span style={{ color: copied === key ? 'var(--green)' : 'var(--ink-4)', flexShrink: 0 }}>
              {copied === key ? <IcoCheck /> : <IcoCopy />}
            </span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontSize: 12, color: 'var(--ink-4)' }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        Instant conversion · click any row to copy · no data sent
      </div>
    </div>
  );
}
