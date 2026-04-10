import { useColorPalette, HARMONY_OPTIONS } from './use-color-palette';
import type { HarmonyMode } from './use-color-palette';

/* ── Icons ─────────────────────────────────────────────── */
const IcoLock = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
);
const IcoUnlock = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 019.9-1"/>
    </svg>
);
const IcoCopy = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2"/>
        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
    </svg>
);
const IcoRefresh = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"/>
        <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
    </svg>
);
const IcoCode = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
);
const IcoCheck = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
    </svg>
);

/* ── Contrast helper: white or black text ──────────────── */
function textColor(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.55 ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.9)';
}

/* ── Component ─────────────────────────────────────────── */
export default function ColorPaletteWidget() {
    const { swatches, mode, generate, toggleLock, copyHex, copyCss, copiedHex } = useColorPalette();

    return (
        <div>

            {/* Harmony mode selector */}
            <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                    Color harmony
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {HARMONY_OPTIONS.map(opt => (
                        <button
                            key={opt.id}
                            onClick={() => generate(opt.id as HarmonyMode)}
                            title={opt.desc}
                            style={{
                                padding: '5px 11px',
                                borderRadius: 'var(--r-s)',
                                border: `1.5px solid ${mode === opt.id ? 'var(--green)' : 'var(--border)'}`,
                                background: mode === opt.id ? 'var(--green-lt)' : 'var(--white)',
                                color: mode === opt.id ? 'var(--green-dk, var(--green))' : 'var(--ink-2)',
                                fontSize: 12,
                                fontWeight: mode === opt.id ? 600 : 500,
                                cursor: 'pointer',
                                transition: 'all .14s',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Palette swatches */}
            <div className="palette-swatches" style={{ marginBottom: 16 }}>
                {swatches.map((swatch, i) => {
                    const fg = textColor(swatch.hex);
                    const isCopied = copiedHex === swatch.hex;
                    return (
                        <div
                            key={i}
                            className="palette-swatch"
                            style={{
                                flex: 1,
                                background: swatch.hex,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                padding: '10px 8px',
                                gap: 6,
                                position: 'relative',
                                transition: 'flex .2s cubic-bezier(.22,1,.36,1)',
                                cursor: 'pointer',
                            }}
                            onClick={() => copyHex(swatch.hex)}
                            onMouseEnter={e => (e.currentTarget.style.flex = '1.35')}
                            onMouseLeave={e => (e.currentTarget.style.flex = '1')}
                        >
                            {/* Lock button */}
                            <button
                                onClick={e => { e.stopPropagation(); toggleLock(i); }}
                                title={swatch.locked ? 'Unlock' : 'Lock this color'}
                                style={{
                                    position: 'absolute', top: 8, right: 8,
                                    background: swatch.locked ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.15)',
                                    border: 'none', borderRadius: 6,
                                    width: 26, height: 26,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#fff', cursor: 'pointer',
                                    transition: 'background .15s',
                                    opacity: swatch.locked ? 1 : 0.6,
                                }}
                                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                                onMouseLeave={e => (e.currentTarget.style.opacity = swatch.locked ? '1' : '0.6')}
                            >
                                {swatch.locked ? <IcoLock /> : <IcoUnlock />}
                            </button>

                            {/* Hex label */}
                            <div style={{
                                background: 'rgba(0,0,0,0.18)',
                                backdropFilter: 'blur(4px)',
                                borderRadius: 6,
                                padding: '4px 8px',
                                display: 'flex', alignItems: 'center', gap: 5,
                                color: '#fff',
                            }}>
                                {isCopied
                                    ? <><IcoCheck /><span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>Copied!</span></>
                                    : <><IcoCopy /><span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{swatch.hex}</span></>
                                }
                            </div>

                            {/* Color name */}
                            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: 500, letterSpacing: '0.03em' }}>
                {swatch.name}
              </span>
                        </div>
                    );
                })}
            </div>

            {/* Actions row */}
            <div style={{ display: 'flex', gap: 8 }}>
                <button
                    onClick={() => generate()}
                    style={{
                        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                        padding: '11px 16px',
                        background: 'var(--ink)', color: '#fff',
                        border: 'none', borderRadius: 'var(--r-m)',
                        fontSize: 14, fontWeight: 600, cursor: 'pointer',
                        transition: 'background .13s, transform .11s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#2e2c22'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.transform = ''; }}
                >
                    <IcoRefresh /> Generate palette
                </button>

                <button
                    onClick={copyCss}
                    title="Copy as CSS variables"
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '11px 14px',
                        background: copiedHex === 'css' ? 'var(--green)' : 'var(--white)',
                        color: copiedHex === 'css' ? '#fff' : 'var(--ink-2)',
                        border: `1.5px solid ${copiedHex === 'css' ? 'var(--green)' : 'var(--border)'}`,
                        borderRadius: 'var(--r-m)',
                        fontSize: 13, fontWeight: 600, cursor: 'pointer',
                        transition: 'all .14s', whiteSpace: 'nowrap',
                    }}
                >
                    {copiedHex === 'css' ? <IcoCheck /> : <IcoCode />}
                    {copiedHex === 'css' ? 'Copied!' : 'Copy CSS'}
                </button>
            </div>

            {/* Color details table */}
            <div style={{ marginTop: 20 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 10 }}>Color values</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border)', borderRadius: 'var(--r-m)', overflow: 'hidden' }}>
                    {swatches.map((s, i) => (
                        <div key={i} style={{
                            display: 'grid',
                            gridTemplateColumns: '32px 1fr 1fr 1fr',
                            alignItems: 'center',
                            gap: 12,
                            padding: '10px 14px',
                            borderBottom: i < swatches.length - 1 ? '1px solid var(--border)' : 'none',
                            background: 'var(--white)',
                        }}>
                            {/* Swatch dot */}
                            <div style={{ width: 24, height: 24, borderRadius: 6, background: s.hex, border: '1px solid var(--border)', flexShrink: 0 }} />
                            {/* HEX */}
                            <button
                                onClick={() => copyHex(s.hex)}
                                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                            >
                                <span style={{ fontSize: 11, color: 'var(--ink-4)', display: 'block' }}>HEX</span>
                                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', fontFamily: 'JetBrains Mono, monospace' }}>{s.hex}</span>
                            </button>
                            {/* RGB */}
                            <div>
                                <span style={{ fontSize: 11, color: 'var(--ink-4)', display: 'block' }}>RGB</span>
                                <span style={{ fontSize: 12, color: 'var(--ink-2)', fontFamily: 'JetBrains Mono, monospace' }}>
                  {s.rgb.r}, {s.rgb.g}, {s.rgb.b}
                </span>
                            </div>
                            {/* HSL */}
                            <div>
                                <span style={{ fontSize: 11, color: 'var(--ink-4)', display: 'block' }}>HSL</span>
                                <span style={{ fontSize: 12, color: 'var(--ink-2)', fontFamily: 'JetBrains Mono, monospace' }}>
                  {s.hsl.h}°, {s.hsl.s}%, {s.hsl.l}%
                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <p style={{ marginTop: 12, fontSize: 12, color: 'var(--ink-4)', textAlign: 'center' }}>
                Click any color to copy HEX · Lock 🔒 to keep it while generating
            </p>
        </div>
    );
}