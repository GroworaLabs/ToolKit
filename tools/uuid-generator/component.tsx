import { useEffect } from 'react';
import { useUuidGenerator } from './use-uuid-generator';

const IcoCopy = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoRefresh = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>;

export default function UuidGeneratorWidget() {
    const { uuids, count, setCount, generate, copy, copyAll, copied, uppercase, setUppercase, format } = useUuidGenerator();

    useEffect(() => { generate(); }, []);

    const tog: React.CSSProperties = {
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '7px 12px', borderRadius: 'var(--r-s)',
        border: '1.5px solid var(--border)', background: 'var(--white)',
        fontSize: 13, fontWeight: 500, cursor: 'pointer', color: 'var(--ink-2)',
        transition: 'all .14s', userSelect: 'none',
    };

    return (
        <div>
            {/* Options */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 18, alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Count</label>
                    <input
                        type="number" min={1} max={50} value={count}
                        onChange={e => setCount(Math.min(50, Math.max(1, +e.target.value)))}
                        style={{ width: 64, padding: '6px 10px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-s)', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', outline: 'none', color: 'var(--ink)', background: 'var(--white)' }}
                    />
                </div>
                <label
                    style={{ ...tog, borderColor: uppercase ? 'var(--green)' : 'var(--border)', background: uppercase ? 'var(--green-lt)' : 'var(--white)', color: uppercase ? 'var(--green)' : 'var(--ink-2)' }}
                    onClick={() => setUppercase(!uppercase)}
                >
                    UPPERCASE
                </label>
            </div>

            {/* UUID list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                {uuids.map((uuid, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'var(--page-bg)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)' }}>
            <span style={{ flex: 1, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--ink)', letterSpacing: '0.02em', wordBreak: 'break-all' }}>
              {format(uuid)}
            </span>
                        <button onClick={() => copy(uuid)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied === uuid ? 'var(--green)' : 'var(--ink-4)', flexShrink: 0, display: 'flex' }}>
                            {copied === uuid ? <IcoCheck /> : <IcoCopy />}
                        </button>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={generate} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '12px', background: 'var(--ink)', color: '#fff', border: 'none', borderRadius: 'var(--r-m)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                    <IcoRefresh /> Generate
                </button>
                {uuids.length > 1 && (
                    <button onClick={copyAll} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 16px', background: copied === 'all' ? 'var(--green)' : 'var(--white)', color: copied === 'all' ? '#fff' : 'var(--ink-2)', border: `1.5px solid ${copied === 'all' ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-m)', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        {copied === 'all' ? <IcoCheck /> : <IcoCopy />} Copy all
                    </button>
                )}
            </div>
        </div>
    );
}