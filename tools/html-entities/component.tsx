import { useState, useCallback, useEffect } from 'react';

const IcoCopy  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoSwap  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>;
const IcoX     = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

function encodeNumeric(str: string): string {
    return str.replace(/[&<>"']/g, c => {
        const map: Record<string, string> = { '&': '&#38;', '<': '&#60;', '>': '&#62;', '"': '&#34;', "'": '&#39;' };
        return map[c] ?? c;
    }).replace(/[\u0080-\uFFFF]/g, c => `&#${c.charCodeAt(0)};`);
}

const COMMON_ENTITIES = [
    { char: '&',   named: '&amp;',   numeric: '&#38;',   desc: 'Ampersand'        },
    { char: '<',   named: '&lt;',    numeric: '&#60;',   desc: 'Less-than'        },
    { char: '>',   named: '&gt;',    numeric: '&#62;',   desc: 'Greater-than'     },
    { char: '"',   named: '&quot;',  numeric: '&#34;',   desc: 'Quotation mark'   },
    { char: "'",   named: '&apos;',  numeric: '&#39;',   desc: 'Apostrophe'       },
    { char: '\u00A0', named: '&nbsp;', numeric: '&#160;', desc: 'Non-breaking space' },
    { char: '©',   named: '&copy;',  numeric: '&#169;',  desc: 'Copyright'        },
    { char: '®',   named: '&reg;',   numeric: '&#174;',  desc: 'Registered'       },
    { char: '™',   named: '&trade;', numeric: '&#8482;', desc: 'Trademark'        },
    { char: '—',   named: '&mdash;', numeric: '&#8212;', desc: 'Em dash'          },
    { char: '–',   named: '&ndash;', numeric: '&#8211;', desc: 'En dash'          },
    { char: '…',   named: '&hellip;',numeric: '&#8230;', desc: 'Ellipsis'         },
    { char: '€',   named: '&euro;',  numeric: '&#8364;', desc: 'Euro sign'        },
    { char: '£',   named: '&pound;', numeric: '&#163;',  desc: 'Pound sign'       },
    { char: '¥',   named: '&yen;',   numeric: '&#165;',  desc: 'Yen sign'         },
    { char: '«',   named: '&laquo;', numeric: '&#171;',  desc: 'Left angle quote' },
    { char: '»',   named: '&raquo;', numeric: '&#187;',  desc: 'Right angle quote'},
    { char: '°',   named: '&deg;',   numeric: '&#176;',  desc: 'Degree sign'      },
    { char: '½',   named: '&frac12;',numeric: '&#189;',  desc: 'Fraction 1/2'     },
    { char: '×',   named: '&times;', numeric: '&#215;',  desc: 'Multiplication'   },
];

const ta: React.CSSProperties = {
    width: '100%', minHeight: 110, padding: '12px',
    border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
    font: '13px/1.6 JetBrains Mono, monospace',
    color: 'var(--ink)', background: 'var(--page-bg)', outline: 'none',
    resize: 'vertical', transition: 'border-color .15s', boxSizing: 'border-box',
};

export default function HtmlEntitiesWidget() {
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [input, setInput] = useState('<h1>Hello & "World"</h1>');
    const [numeric, setNumeric] = useState(false);
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (!mounted) return;
        if (!input.trim()) { setOutput(''); return; }
        try {
            if (mode === 'encode') {
                if (numeric) {
                    setOutput(encodeNumeric(input));
                } else {
                    const el = document.createElement('div');
                    el.appendChild(document.createTextNode(input));
                    setOutput(el.innerHTML);
                }
            } else {
                const el = document.createElement('div');
                el.innerHTML = input;
                setOutput(el.textContent ?? '');
            }
        } catch {
            setOutput('');
        }
    }, [input, mode, numeric, mounted]);

    const swap = useCallback(() => {
        const nextMode = mode === 'encode' ? 'decode' : 'encode';
        setMode(nextMode);
        setInput(output || '');
    }, [mode, output]);

    const copy = useCallback(() => {
        if (!output) return;
        navigator.clipboard.writeText(output).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        });
    }, [output]);

    const clear = () => setInput('');

    return (
        <div style={{ minWidth: 0, overflow: 'hidden' }}>
            {/* Mode toggle */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                {(['encode', 'decode'] as const).map(m => (
                    <button key={m} onClick={() => setMode(m)}
                        style={{ flex: 1, padding: '8px', border: `1.5px solid ${mode === m ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-s)', background: mode === m ? 'var(--green-lt)' : 'var(--white)', color: mode === m ? 'var(--green)' : 'var(--ink-2)', fontSize: 14, fontWeight: mode === m ? 700 : 500, cursor: 'pointer', textTransform: 'capitalize', transition: 'all .14s' }}>
                        {m}
                    </button>
                ))}
            </div>

            {/* Numeric toggle — only shown in encode mode */}
            {mode === 'encode' && (
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, cursor: 'pointer', fontSize: 13, color: 'var(--ink-2)' }}>
                    <input type="checkbox" checked={numeric} onChange={e => setNumeric(e.target.checked)}
                        style={{ accentColor: 'var(--green)', width: 15, height: 15 }} />
                    Use numeric entities (&#60; instead of &lt;)
                </label>
            )}

            {/* Input */}
            <div style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)' }}>
                        {mode === 'encode' ? 'Text to encode' : 'Encoded HTML'}
                    </label>
                    {input && <button onClick={clear} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-4)', display: 'flex', alignItems: 'center', gap: 3, fontSize: 12 }}><IcoX /> Clear</button>}
                </div>
                <textarea value={input} onChange={e => setInput(e.target.value)}
                    placeholder={mode === 'encode' ? '<h1>Hello & "World"</h1>' : '&lt;h1&gt;Hello &amp; &quot;World&quot;&lt;/h1&gt;'}
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
            <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)' }}>
                        {mode === 'encode' ? 'Encoded output' : 'Decoded text'}
                    </label>
                    <button onClick={copy} disabled={!output}
                        style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: copied ? 'var(--green)' : 'var(--white)', color: copied ? '#fff' : 'var(--ink-3)', border: `1.5px solid ${copied ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-s)', fontSize: 12, fontWeight: 600, cursor: output ? 'pointer' : 'default', opacity: output ? 1 : 0.4, transition: 'all .14s' }}>
                        {copied ? <IcoCheck /> : <IcoCopy />} {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                <div style={{ minHeight: 80, padding: '12px', background: output ? 'var(--white)' : 'var(--page-bg)', border: `1.5px solid ${output ? 'var(--border-md)' : 'var(--border)'}`, borderRadius: 'var(--r-m)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, lineHeight: 1.6, color: 'var(--ink)', wordBreak: 'break-all', whiteSpace: 'pre-wrap', overflowX: 'auto', maxWidth: '100%' }}>
                    {output || <span style={{ color: 'var(--ink-4)' }}>Output will appear here…</span>}
                </div>
            </div>

            {/* Quick reference table */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Common entities reference</p>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                            <tr style={{ background: 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                                {['Char', 'Named', 'Numeric', 'Description'].map(h => (
                                    <th key={h} style={{ padding: '6px 10px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {COMMON_ENTITIES.map(({ char, named, numeric: num, desc }, i) => (
                                <tr key={named} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '5px 10px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>{char}</td>
                                    <td style={{ padding: '5px 10px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)' }}>{named}</td>
                                    <td style={{ padding: '5px 10px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{num}</td>
                                    <td style={{ padding: '5px 10px', fontSize: 12, color: 'var(--ink-3)' }}>{desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
