import { useJsonFormatter } from './use-json-formatter';
import type { JsonMode } from './use-json-formatter';

const IcoCopy  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoX     = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

const MODES: { id: JsonMode; label: string }[] = [
    { id: 'prettify', label: 'Prettify' },
    { id: 'minify',   label: 'Minify'   },
    { id: 'validate', label: 'Validate' },
];

const taStyle: React.CSSProperties = {
    width: '100%', padding: '12px', resize: 'vertical', outline: 'none',
    border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
    font: '13px/1.6 JetBrains Mono, monospace',
    color: 'var(--ink)', background: 'var(--page-bg)',
    transition: 'border-color .15s', boxSizing: 'border-box',
};

export default function JsonFormatterWidget() {
    const { input, setInput, mode, setMode, indent, setIndent, result, copy, copied, clear } = useJsonFormatter();

    return (
        <div>
            {/* Mode + indent */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 5 }}>
                    {MODES.map(m => (
                        <button key={m.id} onClick={() => setMode(m.id)} style={{ padding: '7px 14px', border: `1.5px solid ${mode === m.id ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-s)', background: mode === m.id ? 'var(--green-lt)' : 'var(--white)', color: mode === m.id ? 'var(--green)' : 'var(--ink-2)', fontSize: 13, fontWeight: mode === m.id ? 600 : 500, cursor: 'pointer', transition: 'all .14s' }}>
                            {m.label}
                        </button>
                    ))}
                </div>
                {mode === 'prettify' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto' }}>
                        <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>Indent</span>
                        {[2, 4].map(n => (
                            <button key={n} onClick={() => setIndent(n)} style={{ padding: '4px 10px', border: `1.5px solid ${indent === n ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-s)', background: indent === n ? 'var(--green-lt)' : 'var(--white)', color: indent === n ? 'var(--green)' : 'var(--ink-3)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                                {n}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Input */}
            <div style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)' }}>JSON input</label>
                    {input && <button onClick={clear} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-4)', display: 'flex', alignItems: 'center', gap: 3, fontSize: 12 }}><IcoX /> Clear</button>}
                </div>
                <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={'{\n  "paste": "your JSON here"\n}'} style={{ ...taStyle, minHeight: 160 }}
                          onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
                          onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                />
            </div>

            {/* Output */}
            {input.trim() && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)' }}>Output</label>
                            {result.valid === true && !result.error && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: 'var(--green)', background: 'var(--green-lt)', padding: '2px 8px', borderRadius: 99 }}>
                  <IcoCheck /> Valid
                </span>
                            )}
                            {result.valid === false && (
                                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--red,#dc2626)', background: '#fef2f2', padding: '2px 8px', borderRadius: 99 }}>
                  Invalid
                </span>
                            )}
                        </div>
                        {result.output && !result.error && mode !== 'validate' && (
                            <button onClick={copy} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: copied ? 'var(--green)' : 'var(--white)', color: copied ? '#fff' : 'var(--ink-3)', border: `1.5px solid ${copied ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-s)', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all .14s' }}>
                                {copied ? <IcoCheck /> : <IcoCopy />} {copied ? 'Copied!' : 'Copy'}
                            </button>
                        )}
                    </div>

                    {result.error ? (
                        <div style={{ padding: '12px 14px', background: '#fef2f2', border: '1.5px solid rgba(220,38,38,.2)', borderRadius: 'var(--r-m)', fontSize: 13, color: 'var(--red,#dc2626)', fontFamily: 'JetBrains Mono, monospace' }}>
                            {result.error}
                        </div>
                    ) : (
                        <div style={{ padding: '12px', background: 'var(--white)', border: '1.5px solid var(--border-md)', borderRadius: 'var(--r-m)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, lineHeight: 1.6, color: mode === 'validate' ? 'var(--green)' : 'var(--ink)', wordBreak: 'break-all', whiteSpace: 'pre-wrap', maxHeight: 360, overflowY: 'auto', boxShadow: 'var(--sh-xs)' }}>
                            {result.output}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}