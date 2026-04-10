import { useHashGenerator, ALGORITHMS } from './use-hash-generator';

const IcoCopy  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

export default function HashGeneratorWidget() {
    const { input, setInput, hashes, loading, generate, copy, copied, uppercase, setUppercase, fmt } = useHashGenerator();

    return (
        <div>
            {/* Input */}
            <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 6 }}>Input text</label>
                <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) generate(); }}
                    placeholder="Enter text to hash…"
                    rows={4}
                    style={{ width: '100%', padding: '12px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', font: '14px/1.6 Outfit, sans-serif', color: 'var(--ink)', background: 'var(--page-bg)', outline: 'none', resize: 'vertical', boxSizing: 'border-box', transition: 'border-color .15s' }}
                    onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
                    onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                />
            </div>

            {/* Options row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
                <label
                    onClick={() => setUppercase(!uppercase)}
                    style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', userSelect: 'none', fontSize: 13, color: 'var(--ink-2)' }}
                >
                    <div style={{ width: 17, height: 17, borderRadius: 4, border: `1.5px solid ${uppercase ? 'var(--green)' : 'var(--border-md)'}`, background: uppercase ? 'var(--green)' : 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {uppercase && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    Uppercase output
                </label>
                <span style={{ fontSize: 12, color: 'var(--ink-4)' }}></span>
            </div>

            {/* Generate */}
            <button
                onClick={generate}
                disabled={!input || loading}
                style={{ width: '100%', padding: '12px', background: !input || loading ? 'var(--border)' : 'var(--ink)', color: '#fff', border: 'none', borderRadius: 'var(--r-m)', fontSize: 14, fontWeight: 600, cursor: input && !loading ? 'pointer' : 'default', marginBottom: 20, transition: 'background .13s' }}
            >
                {loading ? 'Hashing…' : 'Generate Hashes'}
            </button>

            {/* Hash results */}
            {Object.keys(hashes).length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {ALGORITHMS.map(a => (
                        <div key={a} style={{ padding: '12px 14px', background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', boxShadow: 'var(--sh-xs)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '0.05em' }}>{a}</span>
                                <button
                                    onClick={() => copy(hashes[a])}
                                    style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: copied === hashes[a] ? 'var(--green)' : 'var(--ink-4)', fontSize: 12, fontWeight: 600 }}
                                >
                                    {copied === hashes[a] ? <IcoCheck /> : <IcoCopy />}
                                    {copied === hashes[a] ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink)', wordBreak: 'break-all', lineHeight: 1.5 }}>
                                {fmt(hashes[a])}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}