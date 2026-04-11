import { useState, useMemo } from 'react';

const SEMVER_RE = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?(\+[0-9A-Za-z.-]+)?$/;

function parseSemver(v: string) {
    const [main, ...rest] = v.split('+');
    const build = rest.join('+');
    const [ver, ...pre] = main.split('-');
    const [major, minor, patch] = ver.split('.').map(Number);
    const prerelease = pre.join('-');
    return { major, minor, patch, prerelease, build };
}

function compareSemver(a: string, b: string): number {
    const pa = parseSemver(a), pb = parseSemver(b);
    if (pa.major !== pb.major) return pa.major - pb.major;
    if (pa.minor !== pb.minor) return pa.minor - pb.minor;
    if (pa.patch !== pb.patch) return pa.patch - pb.patch;
    if (!pa.prerelease && pb.prerelease) return 1;
    if (pa.prerelease && !pb.prerelease) return -1;
    if (pa.prerelease && pb.prerelease) {
        const aParts = pa.prerelease.split('.');
        const bParts = pb.prerelease.split('.');
        for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
            if (i >= aParts.length) return -1;
            if (i >= bParts.length) return 1;
            const aNum = /^\d+$/.test(aParts[i]);
            const bNum = /^\d+$/.test(bParts[i]);
            if (aNum && bNum) {
                const diff = Number(aParts[i]) - Number(bParts[i]);
                if (diff !== 0) return diff;
            } else if (aNum) return -1;
            else if (bNum) return 1;
            else {
                const sc = aParts[i].localeCompare(bParts[i]);
                if (sc !== 0) return sc;
            }
        }
    }
    return 0;
}

const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', border: '1.5px solid var(--border)',
    borderRadius: 'var(--r-m)', fontSize: 15, color: 'var(--ink)',
    background: 'var(--page-bg)', outline: 'none', fontFamily: 'JetBrains Mono, monospace',
    boxSizing: 'border-box', transition: 'border-color .15s',
};

function VersionBadge({ label, version, valid }: { label: string; version: string; valid: boolean }) {
    if (!version) return null;
    const p = valid ? parseSemver(version) : null;
    return (
        <div style={{ flex: 1, padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-4)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
            {p ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {[
                        { lbl: 'Major', val: String(p.major), color: 'var(--green)' },
                        { lbl: 'Minor', val: String(p.minor), color: '#2563eb' },
                        { lbl: 'Patch', val: String(p.patch), color: '#b45309' },
                        ...(p.prerelease ? [{ lbl: 'Pre-release', val: p.prerelease, color: 'var(--red)' }] : []),
                        ...(p.build ? [{ lbl: 'Build', val: p.build, color: 'var(--ink-4)' }] : []),
                    ].map(({ lbl, val, color }) => (
                        <div key={lbl} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '6px 10px', background: 'var(--page-bg)', borderRadius: 'var(--r-m)', border: '1px solid var(--border)' }}>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, fontWeight: 700, color }}>{val}</span>
                            <span style={{ fontSize: 10, color: 'var(--ink-4)', marginTop: 2 }}>{lbl}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <span style={{ fontSize: 13, color: 'var(--red)' }}>Invalid semver</span>
            )}
        </div>
    );
}

export default function SemverComparatorWidget() {
    const [versionA, setVersionA] = useState('1.2.3');
    const [versionB, setVersionB] = useState('1.2.4-beta.1');

    const validA = SEMVER_RE.test(versionA.trim());
    const validB = SEMVER_RE.test(versionB.trim());

    const result = useMemo(() => {
        if (!validA || !validB) return null;
        return compareSemver(versionA.trim(), versionB.trim());
    }, [versionA, versionB, validA, validB]);

    const symbol = result === null ? null : result > 0 ? '>' : result < 0 ? '<' : '=';
    const label  = result === null ? null : result > 0 ? 'A is greater' : result < 0 ? 'B is greater' : 'Equal';
    const resultColor = result === null ? 'var(--ink-3)' : result === 0 ? 'var(--green)' : result > 0 ? '#2563eb' : '#b45309';

    return (
        <div>
            {/* Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'flex-end', marginBottom: 20 }}>
                <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Version A</label>
                    <input
                        type="text"
                        value={versionA}
                        onChange={e => setVersionA(e.target.value)}
                        placeholder="1.0.0"
                        style={{ ...inputStyle, borderColor: versionA && !validA ? 'var(--red)' : 'var(--border)' }}
                        onFocus={e => { if (validA || !versionA) { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; } }}
                        onBlur={e  => { e.target.style.borderColor = versionA && !validA ? 'var(--red)' : 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                    />
                    {versionA && !validA && <div style={{ fontSize: 11, color: 'var(--red)', marginTop: 4 }}>Invalid semver format</div>}
                </div>

                <div style={{ fontSize: 24, fontWeight: 700, color: resultColor, fontFamily: 'JetBrains Mono, monospace', paddingBottom: versionA && !validA ? 22 : 4, textAlign: 'center', minWidth: 28 }}>
                    {symbol ?? '?'}
                </div>

                <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Version B</label>
                    <input
                        type="text"
                        value={versionB}
                        onChange={e => setVersionB(e.target.value)}
                        placeholder="1.0.0"
                        style={{ ...inputStyle, borderColor: versionB && !validB ? 'var(--red)' : 'var(--border)' }}
                        onFocus={e => { if (validB || !versionB) { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; } }}
                        onBlur={e  => { e.target.style.borderColor = versionB && !validB ? 'var(--red)' : 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                    />
                    {versionB && !validB && <div style={{ fontSize: 11, color: 'var(--red)', marginTop: 4 }}>Invalid semver format</div>}
                </div>
            </div>

            {/* Result banner */}
            {result !== null && (
                <div style={{ padding: '14px 20px', background: result === 0 ? 'var(--green-lt)' : 'var(--blue-lt)', border: `1.5px solid ${result === 0 ? 'var(--green-mid)' : 'rgba(37,99,235,.2)'}`, borderRadius: 'var(--r-l)', textAlign: 'center', marginBottom: 20 }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 700, color: resultColor }}>
                        {versionA.trim()} {symbol} {versionB.trim()}
                    </span>
                    <span style={{ fontSize: 13, color: 'var(--ink-3)', marginLeft: 12 }}>— {label}</span>
                </div>
            )}

            {/* Version breakdown */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <VersionBadge label="Version A" version={versionA.trim()} valid={validA} />
                <VersionBadge label="Version B" version={versionB.trim()} valid={validB} />
            </div>

            {/* Pre-release ordering hint */}
            <div style={{ marginTop: 20, padding: '12px 14px', background: 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 6 }}>Pre-release precedence</div>
                <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--green)', lineHeight: 1.8, display: 'block' }}>
                    1.0.0-alpha {'<'} 1.0.0-alpha.1 {'<'} 1.0.0-alpha.beta {'<'} 1.0.0-beta {'<'} 1.0.0-beta.2 {'<'} 1.0.0-rc.1 {'<'} 1.0.0
                </code>
            </div>
        </div>
    );
}
