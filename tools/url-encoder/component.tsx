import { useUrlEncoder } from './use-url-encoder';

const IcoCopy  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoSwap  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>;
const IcoX     = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

const ta: React.CSSProperties = {
    width: '100%', minHeight: 130, padding: '12px',
    border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
    font: '13px/1.6 JetBrains Mono, monospace',
    color: 'var(--ink)', background: 'var(--page-bg)', outline: 'none',
    resize: 'vertical', transition: 'border-color .15s', boxSizing: 'border-box',
};

export default function UrlEncoderWidget() {
    const { input, setInput, mode, setMode, output, isError, copy, copied, swap, clear } = useUrlEncoder();

    return (
        <div>
            {/* Mode toggle */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                {(['encode', 'decode'] as const).map(m => (
                    <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: '8px', border: `1.5px solid ${mode === m ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-s)', background: mode === m ? 'var(--green-lt)' : 'var(--white)', color: mode === m ? 'var(--green)' : 'var(--ink-2)', fontSize: 14, fontWeight: mode === m ? 700 : 500, cursor: 'pointer', textTransform: 'capitalize', transition: 'all .14s' }}>
                        {m}
                    </button>
                ))}
            </div>

            {/* Input */}
            <div style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)' }}>
                        {mode === 'encode' ? 'Text to encode' : 'Encoded URL'}
                    </label>
                    {input && <button onClick={clear} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-4)', display: 'flex', alignItems: 'center', gap: 3, fontSize: 12 }}><IcoX /> Clear</button>}
                </div>
                <textarea value={input} onChange={e => setInput(e.target.value)}
                          placeholder={mode === 'encode' ? 'https://example.com/search?q=hello world&lang=en' : 'https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world'}
                          style={ta}
                          onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
                          onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                />
            </div>

            {/* Swap */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
                <button onClick={swap} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 14px', background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', cursor: 'pointer' }}>
                    <IcoSwap /> Swap
                </button>
            </div>

            {/* Output */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)' }}>
                        {mode === 'encode' ? 'Encoded output' : 'Decoded text'}
                    </label>
                    <button onClick={copy} disabled={!output || isError} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: copied ? 'var(--green)' : 'var(--white)', color: copied ? '#fff' : 'var(--ink-3)', border: `1.5px solid ${copied ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-s)', fontSize: 12, fontWeight: 600, cursor: output && !isError ? 'pointer' : 'default', opacity: output && !isError ? 1 : 0.4, transition: 'all .14s' }}>
                        {copied ? <IcoCheck /> : <IcoCopy />} {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                <div style={{ minHeight: 80, padding: '12px', background: output && !isError ? 'var(--white)' : 'var(--page-bg)', border: `1.5px solid ${isError ? 'var(--red)' : output ? 'var(--border-md)' : 'var(--border)'}`, borderRadius: 'var(--r-m)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, lineHeight: 1.6, color: isError ? 'var(--red)' : 'var(--ink)', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                    {output || <span style={{ color: 'var(--ink-4)' }}>Output will appear here…</span>}
                </div>
            </div>
        </div>
    );
}