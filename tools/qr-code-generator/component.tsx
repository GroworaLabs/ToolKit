import { useState, CSSProperties } from 'react';
import { useQrGenerator } from './use-qr-generator';
import type { QrErrorLevel } from './use-qr-generator';

const IcoDownload = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
);
const IcoCopy = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
    </svg>
);
const IcoCheck = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
    </svg>
);

const ERROR_LEVELS: { value: QrErrorLevel; label: string; desc: string }[] = [
    { value: 'L', label: 'L — 7%',  desc: 'Low — smallest QR' },
    { value: 'M', label: 'M — 15%', desc: 'Medium — balanced' },
    { value: 'Q', label: 'Q — 25%', desc: 'High — with logo' },
    { value: 'H', label: 'H — 30%', desc: 'Max — most robust' },
];

const SIZES = [128, 192, 256, 384, 512];

const PRESETS = [
    { label: 'URL',   placeholder: 'https://example.com' },
    { label: 'Email', placeholder: 'mailto:hello@example.com' },
    { label: 'Phone', placeholder: 'tel:+1234567890' },
    { label: 'SMS',   placeholder: 'sms:+1234567890?body=Hello' },
    { label: 'WiFi',  placeholder: 'WIFI:T:WPA;S:NetworkName;P:Password;;' },
    { label: 'Text',  placeholder: 'Any plain text' },
];

export default function QrCodeGeneratorWidget() {
    const {
        options, update, canvasRef,
        dataUrl, copied, error,
        downloadPng, downloadSvg, copyImage,
    } = useQrGenerator();

    const [activePreset, setActivePreset] = useState<string>('URL');

    const inputStyle: CSSProperties = {
        width: '100%', padding: '9px 12px',
        border: '1.5px solid var(--border)', borderRadius: 'var(--r-s)',
        fontSize: 14, color: 'var(--ink)', background: 'var(--white)',
        outline: 'none', boxSizing: 'border-box',
    };

    const labelStyle: CSSProperties = {
        fontSize: 12, fontWeight: 600, color: 'var(--ink-3)',
        letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6,
        display: 'block',
    };

    const marginFillPct = (options.margin / 6) * 100;

    return (
        <div>
            {/* Presets */}
            <div style={{ marginBottom: 16 }}>
                <span style={labelStyle}>Content type</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {PRESETS.map(p => {
                        const isActive = activePreset === p.label;
                        return (
                            <button
                                key={p.label}
                                onClick={() => {
                                    setActivePreset(p.label);
                                    update('text', p.placeholder);
                                }}
                                style={{
                                    padding: '4px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600,
                                    border: `1.5px solid ${isActive ? 'var(--green)' : 'var(--border)'}`,
                                    background: isActive ? 'var(--green-lt)' : 'var(--white)',
                                    color: isActive ? 'var(--green)' : 'var(--ink-2)',
                                    cursor: 'pointer', transition: 'all .13s',
                                }}
                            >
                                {p.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Text input */}
            <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Content</label>
                <textarea
                    value={options.text}
                    onChange={e => {
                        update('text', e.target.value);
                        const matchesPreset = PRESETS.find(p => p.placeholder === e.target.value);
                        if (!matchesPreset) setActivePreset('');
                    }}
                    placeholder="Enter URL, text, email, phone..."
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.5 }}
                />
            </div>

            {/* QR Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
                <div style={{
                    padding: 16, background: options.bgColor,
                    border: '1.5px solid var(--border)', borderRadius: 'var(--r-l)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: '100%', maxWidth: 288, minHeight: 160, boxSizing: 'border-box',
                    overflow: 'hidden',
                }}>
                    {error ? (
                        <div style={{ fontSize: 13, color: 'var(--red)', textAlign: 'center', maxWidth: 180 }}>{error}</div>
                    ) : !options.text.trim() ? (
                        <div style={{ fontSize: 13, color: 'var(--ink-4)', textAlign: 'center' }}>Enter content above</div>
                    ) : null}
                    <canvas
                        ref={canvasRef}
                        style={{
                            display: options.text.trim() && !error ? 'block' : 'none',
                            width: '100%', height: 'auto', borderRadius: 4,
                        }}
                    />
                </div>
            </div>

            {/* Download buttons */}
            {dataUrl && (
                <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                    <button onClick={downloadPng} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '11px', background: 'var(--ink)', color: '#fff', border: 'none', borderRadius: 'var(--r-m)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                        <IcoDownload /> Download PNG
                    </button>
                    <button onClick={downloadSvg} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '11px 16px', background: 'var(--white)', color: 'var(--ink-2)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        <IcoDownload /> SVG
                    </button>
                    <button onClick={copyImage} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '11px 14px', background: copied ? 'var(--green-lt)' : 'var(--white)', color: copied ? 'var(--green)' : 'var(--ink-2)', border: `1.5px solid ${copied ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-m)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                        {copied ? <IcoCheck /> : <IcoCopy />}
                    </button>
                </div>
            )}

            <div className="rule" />

            {/* Settings */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>

                <div>
                    <label style={labelStyle}>Output size</label>
                    <select value={options.size} onChange={e => update('size', Number(e.target.value))} style={{ ...inputStyle }}>
                        {SIZES.map(s => (
                            <option key={s} value={s}>{s} × {s}px{s >= 512 ? ' (print)' : s <= 192 ? ' (web)' : ''}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label style={labelStyle}>Error correction</label>
                    <select value={options.errorLevel} onChange={e => update('errorLevel', e.target.value as QrErrorLevel)} style={{ ...inputStyle }}>
                        {ERROR_LEVELS.map(l => (
                            <option key={l.value} value={l.value}>{l.label} — {l.desc}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label style={labelStyle}>QR color</label>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <input type="color" value={options.fgColor} onChange={e => update('fgColor', e.target.value)}
                               style={{ width: 40, height: 36, padding: 2, border: '1.5px solid var(--border)', borderRadius: 'var(--r-s)', cursor: 'pointer', background: 'var(--white)', flexShrink: 0 }} />
                        <input type="text" value={options.fgColor}
                               onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) update('fgColor', e.target.value); }}
                               style={{ ...inputStyle, width: 'auto', flex: 1, fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}
                               maxLength={7} />
                    </div>
                </div>

                <div>
                    <label style={labelStyle}>Background</label>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <input type="color" value={options.bgColor} onChange={e => update('bgColor', e.target.value)}
                               style={{ width: 40, height: 36, padding: 2, border: '1.5px solid var(--border)', borderRadius: 'var(--r-s)', cursor: 'pointer', background: 'var(--white)', flexShrink: 0 }} />
                        <input type="text" value={options.bgColor}
                               onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) update('bgColor', e.target.value); }}
                               style={{ ...inputStyle, width: 'auto', flex: 1, fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}
                               maxLength={7} />
                    </div>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>Quiet zone (margin) — {options.margin} modules</label>
                    <input
                        type="range" min={0} max={6} value={options.margin}
                        onChange={e => update('margin', Number(e.target.value))}
                        className="range"
                        style={{ width: '100%', '--fill': `${marginFillPct}%` } as CSSProperties}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                        <span style={{ fontSize: 11, color: 'var(--ink-4)' }}>0 — no margin</span>
                        <span style={{ fontSize: 11, color: 'var(--ink-4)' }}>6 — large margin</span>
                    </div>
                </div>

            </div>

            <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontSize: 12, color: 'var(--ink-4)' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Generated locally · no data sent to servers · free forever
            </div>
        </div>
    );
}