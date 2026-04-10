import { useEffect, CSSProperties } from 'react';
import { usePasswordGenerator } from './use-password-generator';
import type { CheckboxOption, PasswordOptions } from '@/lib/types';
import { IcoCheck, IcoCopy, IcoRefresh, IcoShield, IcoZap } from '@/components/icons';

const CB_OPTS: CheckboxOption[] = [
    { key: 'uppercase', label: 'Uppercase', example: 'A–Z'  },
    { key: 'lowercase', label: 'Lowercase', example: 'a–z'  },
    { key: 'numbers',   label: 'Numbers',   example: '0–9'  },
    { key: 'symbols',   label: 'Symbols',   example: '!@#$' },
];

const IcoDone = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
    </svg>
);

interface Props {
    initialOptions?: Partial<PasswordOptions>;
}

export default function PasswordGeneratorWidget({ initialOptions }: Props = {}) {
    const { password, options, strength, copied, generate, copy, toggleOption, setLength } =
        usePasswordGenerator(initialOptions);

    useEffect(() => { generate(); }, []); // eslint-disable-line

    const fillPct = ((options.length - 8) / (64 - 8)) * 100;

    return (
        <div>
            {/* Output */}
            <div className={`pw-box${password ? ' filled' : ''}`}>
        <span className={`pw-text${password ? '' : ' empty'}`}>
          {password || 'Your password will appear here'}
        </span>
                <div style={{ display: 'flex', gap: 5 }}>
                    <button className="btn-icon" onClick={generate} title="Regenerate"><IcoRefresh size={14} /></button>
                    <button className={`btn-icon${copied ? ' copied' : ''}`} onClick={copy} title={copied ? 'Copied!' : 'Copy'}>
                        {copied ? <IcoDone /> : <IcoCopy size={14} />}
                    </button>
                </div>
            </div>

            {/* Strength */}
            <div style={{ marginTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 500 }}>Password strength</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: strength.color || 'var(--ink-4)' }}>{strength.label || '—'}</span>
                </div>
                <div className="str-track">
                    <div className="str-fill" style={{ width: `${strength.score}%`, background: strength.color || 'var(--border)' }} />
                </div>
            </div>

            <div className="rule" />

            {/* Length */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Password length</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 600, color: 'var(--green)', background: 'var(--green-lt)', padding: '2px 9px', borderRadius: 99 }}>
            {options.length}
          </span>
                </div>
                <input
                    type="range" min={8} max={64} value={options.length}
                    onChange={e => setLength(e.target.value)}
                    className="range"
                    style={{ '--fill': `${fillPct}%` } as CSSProperties}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                    <span style={{ fontSize: 11, color: 'var(--ink-4)' }}>8 chars</span>
                    <span style={{ fontSize: 11, color: 'var(--ink-4)' }}>64 chars</span>
                </div>
            </div>

            {/* Char types */}
            <div style={{ marginTop: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 9 }}>Include characters</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
                    {CB_OPTS.map(({ key, label, example }) => {
                        const isOn = options[key] as boolean;
                        return (
                            <label key={key} className={`tog${isOn ? ' on' : ''}`} onClick={() => toggleOption(key)}>
                                <div className="tog-box">{isOn && <IcoCheck size={10} />}</div>
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>{label}</div>
                                    <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'JetBrains Mono, monospace', marginTop: 3 }}>{example}</div>
                                </div>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Generate */}
            <div style={{ marginTop: 18 }}>
                <button className="btn-main" onClick={generate}>
                    <IcoZap size={14} />
                    Generate password
                </button>
            </div>

            <div style={{ marginTop: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontSize: 12, color: 'var(--ink-4)' }}>
                <IcoShield size={11} />
                Generated locally · never sent to a server
            </div>
        </div>
    );
}