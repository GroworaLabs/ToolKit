import { useCaseConverter, CASE_OPTIONS } from './use-case-converter';
import type { CaseType } from './use-case-converter';
import {IcoCopy, IcoX} from "@/components/icons";

const IcoDone = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
    </svg>
);

const GROUP_LABELS: Record<string, string> = {
    text: 'Text',
    code: 'Code & Dev',
    fun:  'Fun',
};

export default function CaseConverterWidget() {
    const { input, setInput, output, activeCase, convertTo, copy, copied, clear } = useCaseConverter();
    const hasText = input.length > 0;

    const groups = ['text', 'code', 'fun'] as const;

    return (
        <div>

            {/* Case selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                {groups.map(group => (
                    <div key={group}>
                        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 7 }}>
                            {GROUP_LABELS[group]}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {CASE_OPTIONS.filter(o => o.group === group).map(opt => (
                                <button
                                    key={opt.id}
                                    onClick={() => convertTo(opt.id as CaseType)}
                                    style={{
                                        padding: '6px 12px',
                                        borderRadius: 'var(--r-s)',
                                        border: `1.5px solid ${activeCase === opt.id ? 'var(--green)' : 'var(--border)'}`,
                                        background: activeCase === opt.id ? 'var(--green-lt)' : 'var(--white)',
                                        color: activeCase === opt.id ? 'var(--green-dk, var(--green))' : 'var(--ink-2)',
                                        fontSize: 13,
                                        fontWeight: activeCase === opt.id ? 600 : 500,
                                        cursor: 'pointer',
                                        transition: 'all .14s',
                                        fontFamily: group === 'code' ? 'JetBrains Mono, monospace' : 'inherit',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="rule" />

            {/* Two-panel: input → output */}
            <div className="cc-panels">

                {/* Input */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                        <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)' }}>Input</label>
                        {hasText && (
                            <button
                                onClick={clear}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-4)', display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, padding: 0 }}
                            >
                                <IcoX size={11} /> Clear
                            </button>
                        )}
                    </div>
                    <textarea
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type or paste text here…"
                        spellCheck={false}
                        style={{
                            width: '100%', minHeight: 160,
                            padding: '12px', resize: 'vertical',
                            background: 'var(--page-bg)',
                            border: '1.5px solid var(--border)',
                            borderRadius: 'var(--r-m)',
                            font: '14px/1.6 Outfit, system-ui, sans-serif',
                            color: 'var(--ink)', outline: 'none',
                            transition: 'border-color .15s, box-shadow .15s',
                            boxSizing: 'border-box',
                        }}
                        onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
                        onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                    />
                </div>

                {/* Output */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                        <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)' }}>Output</label>
                        <button
                            onClick={copy}
                            disabled={!output}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 5,
                                padding: '4px 10px',
                                background: copied ? 'var(--green)' : 'var(--white)',
                                border: `1.5px solid ${copied ? 'var(--green)' : 'var(--border)'}`,
                                borderRadius: 'var(--r-s)',
                                color: copied ? '#fff' : 'var(--ink-3)',
                                fontSize: 12, fontWeight: 600,
                                cursor: output ? 'pointer' : 'default',
                                opacity: output ? 1 : 0.4,
                                transition: 'all .14s',
                            }}
                        >
                            {copied ? <IcoDone /> : <IcoCopy size={12} />}
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                    <div
                        style={{
                            minHeight: 160, padding: '12px',
                            background: output ? 'var(--white)' : 'var(--page-bg)',
                            border: `1.5px solid ${output ? 'var(--border-md)' : 'var(--border)'}`,
                            borderRadius: 'var(--r-m)',
                            fontSize: 14, lineHeight: 1.6,
                            color: output ? 'var(--ink)' : 'var(--ink-4)',
                            wordBreak: 'break-all',
                            fontFamily: ['camel','pascal','snake','kebab','constant'].includes(activeCase)
                                ? 'JetBrains Mono, monospace' : 'inherit',
                            whiteSpace: 'pre-wrap',
                            boxShadow: output ? 'var(--sh-xs)' : 'none',
                            transition: 'all .15s',
                        }}
                    >
                        {output || 'Converted text will appear here'}
                    </div>
                </div>
            </div>

            {/* Live example under selected case */}
            {(() => {
                const opt = CASE_OPTIONS.find(o => o.id === activeCase);
                if (!opt) return null;
                return (
                    <p style={{ marginTop: 12, fontSize: 12, color: 'var(--ink-4)', textAlign: 'center' }}>
                        Example: <span style={{ fontFamily: opt.group === 'code' ? 'JetBrains Mono, monospace' : 'inherit', color: 'var(--ink-3)', fontWeight: 500 }}>{opt.example}</span>
                    </p>
                );
            })()}

        </div>
    );
}