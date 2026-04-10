import { useUsernameGenerator } from './use-username-generator';
import type { UsernameStyle } from './use-username-generator';

const IcoCopy    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoRefresh = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>;

const STYLES: { id: UsernameStyle; label: string; example: string }[] = [
    { id: 'fun',          label: 'Fun',         example: 'wild_apex_392' },
    { id: 'professional', label: 'Professional',example: 'BoldNova'      },
    { id: 'gamer',        label: 'Gamer',       example: 'swiftnova847'  },
    { id: 'minimal',      label: 'Minimal',     example: 'calmweb'       },
];

export default function UsernameGeneratorWidget() {
    const { style, usernames, generateNew, copy, copied } = useUsernameGenerator();

    return (
        <div>
            {/* Style selector */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 18, flexWrap: 'wrap' }}>
                {STYLES.map(s => (
                    <button key={s.id} onClick={() => generateNew(s.id)} title={s.example} style={{ padding: '7px 14px', border: `1.5px solid ${style === s.id ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-s)', background: style === s.id ? 'var(--green-lt)' : 'var(--white)', color: style === s.id ? 'var(--green)' : 'var(--ink-2)', fontSize: 13, fontWeight: style === s.id ? 600 : 500, cursor: 'pointer', transition: 'all .14s' }}>
                        {s.label}
                    </button>
                ))}
            </div>

            {/* Grid of usernames */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginBottom: 14 }}>
                {usernames.map((name, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '10px 12px', background: 'var(--page-bg)', border: `1.5px solid ${copied === name ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-m)', transition: 'border-color .14s', cursor: 'pointer' }}
                         onClick={() => copy(name)}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--ink)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {name}
            </span>
                        <span style={{ color: copied === name ? 'var(--green)' : 'var(--ink-4)', flexShrink: 0 }}>
              {copied === name ? <IcoCheck /> : <IcoCopy />}
            </span>
                    </div>
                ))}
            </div>

            <button onClick={() => generateNew()} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '12px', background: 'var(--ink)', color: '#fff', border: 'none', borderRadius: 'var(--r-m)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                <IcoRefresh /> Generate new
            </button>

            <p style={{ marginTop: 10, fontSize: 12, color: 'var(--ink-4)', textAlign: 'center' }}>
                Click any username to copy
            </p>
        </div>
    );
}