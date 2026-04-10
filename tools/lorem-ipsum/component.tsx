import { useEffect } from 'react';
import { useLoremIpsum } from './use-lorem-ipsum';
import type { LoremUnit } from './use-lorem-ipsum';

const IcoCopy = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoZap = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;

const UNITS: { id: LoremUnit; label: string }[] = [
    { id: 'paragraphs', label: 'Paragraphs' },
    { id: 'sentences',  label: 'Sentences'  },
    { id: 'words',      label: 'Words'      },
];

const QUICK = [1, 3, 5, 10];

export default function LoremIpsumWidget() {
    const { unit, setUnit, amount, setAmount, startWithLorem, setStartWithLorem, output, generate, copy, copied } = useLoremIpsum();

    useEffect(() => { generate(); }, []);

    return (
        <div>
            {/* Unit selector */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                {UNITS.map(u => (
                    <button key={u.id} onClick={() => setUnit(u.id)} style={{ flex: 1, padding: '8px', border: `1.5px solid ${unit === u.id ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-s)', background: unit === u.id ? 'var(--green-lt)' : 'var(--white)', color: unit === u.id ? 'var(--green)' : 'var(--ink-2)', fontSize: 13, fontWeight: unit === u.id ? 600 : 500, cursor: 'pointer', transition: 'all .14s' }}>
                        {u.label}
                    </button>
                ))}
            </div>

            {/* Amount row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Amount</label>
                <input type="number" min={1} max={50} value={amount} onChange={e => setAmount(Math.min(50, Math.max(1, +e.target.value)))}
                       style={{ width: 64, padding: '6px 10px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-s)', fontSize: 13, outline: 'none', color: 'var(--ink)', background: 'var(--white)' }} />
                <div style={{ display: 'flex', gap: 5 }}>
                    {QUICK.map(n => (
                        <button key={n} onClick={() => setAmount(n)} style={{ padding: '5px 10px', border: `1.5px solid ${amount === n ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-s)', background: amount === n ? 'var(--green-lt)' : 'var(--white)', color: amount === n ? 'var(--green)' : 'var(--ink-3)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                            {n}
                        </button>
                    ))}
                </div>
            </div>

            {/* Start with lorem option */}
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, cursor: 'pointer', userSelect: 'none' }}
                   onClick={() => setStartWithLorem(!startWithLorem)}>
                <div style={{ width: 17, height: 17, borderRadius: 4, border: `1.5px solid ${startWithLorem ? 'var(--green)' : 'var(--border-md)'}`, background: startWithLorem ? 'var(--green)' : 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .14s', flexShrink: 0 }}>
                    {startWithLorem && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>Start with "Lorem ipsum…"</span>
            </label>

            {/* Output */}
            <div style={{ position: 'relative' }}>
                <div style={{ minHeight: 140, maxHeight: 320, overflowY: 'auto', padding: '14px', background: output ? 'var(--white)' : 'var(--page-bg)', border: `1.5px solid ${output ? 'var(--border-md)' : 'var(--border)'}`, borderRadius: 'var(--r-m)', fontSize: 14, lineHeight: 1.7, color: output ? 'var(--ink-2)' : 'var(--ink-4)', whiteSpace: 'pre-wrap', boxShadow: output ? 'var(--sh-xs)' : 'none' }}>
                    {output || 'Generated text will appear here…'}
                </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button onClick={generate} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '12px', background: 'var(--ink)', color: '#fff', border: 'none', borderRadius: 'var(--r-m)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                    <IcoZap /> Generate
                </button>
                <button onClick={copy} disabled={!output} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 16px', background: copied ? 'var(--green)' : 'var(--white)', color: copied ? '#fff' : 'var(--ink-2)', border: `1.5px solid ${copied ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-m)', fontSize: 13, fontWeight: 600, cursor: output ? 'pointer' : 'default', opacity: output ? 1 : 0.4 }}>
                    {copied ? <IcoCheck /> : <IcoCopy />} {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
        </div>
    );
}