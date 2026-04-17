export default function SemverComparatorContent() {
    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
            <div>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        What is semantic versioning and why was it created?
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        Semantic Versioning (semver) is a formal specification for version numbers that encodes meaning about the nature of changes between releases. It was created by Tom Preston-Werner, co-founder of GitHub, to solve a fundamental problem in software dependency management: "dependency hell" — the situation where upgrading one package breaks another because version numbers carry no reliable information about compatibility.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        Before semver, version numbers were largely arbitrary. One library might use dates (20240115), another sequential integers (42), another internal codenames (Bionic Beaver). Package managers could not reason about compatibility, so developers either pinned to exact versions (missing security fixes) or used wildcards (risking breakage from major changes).
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
                        Semver's insight is simple but powerful: <strong style={{ color: 'var(--ink)' }}>version numbers are a communication contract between library authors and their users</strong>. A version bump from 1.2.3 to 1.3.0 explicitly promises backward compatibility. A bump to 2.0.0 explicitly warns of breaking changes. This shared language allows package managers to automatically determine safe upgrade ranges.
                    </p>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        The semver specification — MAJOR.MINOR.PATCH rules
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
                        A semver version number has exactly three numeric components separated by dots. Each component has a precise rule for when it must be incremented:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {[
                            {
                                part: 'MAJOR',
                                color: 'var(--red)',
                                bg: 'var(--red-lt)',
                                border: 'rgba(220,38,38,.2)',
                                rule: 'Increment when you make incompatible API changes',
                                examples: ['Removing a public function or method', 'Changing a function signature (adding required parameters)', 'Changing the return type of a function', 'Renaming a public class or module', 'Changing behavior that existing code depends on'],
                                note: 'When major is incremented, minor and patch are reset to zero. 1.4.7 → 2.0.0. Major version 0 (0.y.z) is special: anything may change at any time.',
                            },
                            {
                                part: 'MINOR',
                                color: '#2563eb',
                                bg: 'var(--blue-lt)',
                                border: 'rgba(37,99,235,.2)',
                                rule: 'Increment when you add backward-compatible functionality',
                                examples: ['Adding new public functions or methods', 'Adding new optional parameters with defaults', 'Adding new endpoints to an API', 'Adding new config options', 'Deprecating functionality (but not removing it)'],
                                note: 'When minor is incremented, patch resets to zero. 1.4.7 → 1.5.0. Existing code continues to work without modification.',
                            },
                            {
                                part: 'PATCH',
                                color: 'var(--green)',
                                bg: 'var(--green-lt)',
                                border: 'var(--green-mid)',
                                rule: 'Increment when you make backward-compatible bug fixes',
                                examples: ['Fixing a calculation error', 'Fixing a crash or null pointer exception', 'Fixing a security vulnerability', 'Improving performance without changing the API', 'Fixing incorrect documentation'],
                                note: 'Patch fixes must not change public API behavior in any observable way. If the fix requires an API change, it is a minor or major bump.',
                            },
                        ].map(({ part, color, bg, border, rule, examples, note }) => (
                            <div key={part} style={{ padding: '18px 20px', background: bg, border: `1px solid ${border}`, borderRadius: 'var(--r-l)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 18, fontWeight: 700, color }}>{part}</span>
                                    <span style={{ fontSize: 14, color: 'var(--ink-2)' }}>— {rule}</span>
                                </div>
                                <ul style={{ paddingLeft: 18, fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.8, margin: '0 0 10px' }}>
                                    {examples.map(ex => <li key={ex}>{ex}</li>)}
                                </ul>
                                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>{note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Pre-release versions and build metadata
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
                        Semver supports two optional extensions beyond the three-part version number. Both are appended to the base version:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                        {[
                            {
                                label: 'Pre-release identifiers (- prefix)',
                                code: '1.0.0-alpha\n1.0.0-alpha.1\n1.0.0-0.3.7\n1.0.0-beta.11\n1.0.0-rc.1',
                                desc: 'Pre-release versions indicate the release is unstable. They have lower precedence than the associated normal version: 1.0.0-alpha < 1.0.0. Dot-separated identifiers are compared left to right. Numeric identifiers are compared numerically; alphanumeric are compared lexically. Numeric identifiers always have lower precedence than alphanumeric: alpha.1 < alpha.beta.',
                            },
                            {
                                label: 'Build metadata (+ prefix)',
                                code: '1.0.0+build.1\n1.0.0+20240115\n1.0.0-beta.1+sha.0e3ab4f\n1.0.0+exp.sha.5114f85',
                                desc: 'Build metadata is for identifying specific builds — CI run numbers, commit hashes, timestamps. Critically, build metadata is IGNORED when determining version precedence. 1.0.0+001 and 1.0.0+20240115 are considered equal. Build metadata may appear after either the patch version or after a pre-release identifier.',
                            },
                        ].map(({ label, code, desc }) => (
                            <div key={label} style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>{label}</div>
                                <pre style={{ margin: '0 0 10px', padding: '12px 14px', background: 'var(--page-bg)', borderRadius: 'var(--r-m)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', overflowX: 'auto', lineHeight: 1.7 }}>{code}</pre>
                                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>{desc}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ padding: '14px 20px', background: 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 8 }}>Pre-release precedence ordering (from lowest to highest)</div>
                        <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', lineHeight: 1.9, display: 'block' }}>
                            1.0.0-alpha {'<'} 1.0.0-alpha.1 {'<'} 1.0.0-alpha.beta {'<'} 1.0.0-beta {'<'} 1.0.0-beta.2 {'<'} 1.0.0-beta.11 {'<'} 1.0.0-rc.1 {'<'} 1.0.0
                        </code>
                    </div>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        How package managers interpret semver ranges
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
                        Package managers extend semver with range syntax that allows specifying acceptable version ranges rather than a single version. Understanding these operators is essential for reading and writing package manifests.
                    </p>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                                    {['Operator', 'Example', 'Equivalent range', 'npm / Cargo / pip'].map(h => (
                                        <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['^', '^1.2.3', '>=1.2.3 <2.0.0', 'npm default — safe minor/patch updates'],
                                    ['~', '~1.2.3', '>=1.2.3 <1.3.0', 'npm — patch updates only'],
                                    ['>=', '>=1.2.3', '>=1.2.3', 'Any version at or above'],
                                    ['>', '>1.2.3', '>1.2.3', 'Strictly above (not including)'],
                                    ['=', '=1.2.3', '1.2.3 exactly', 'Exact pin (also written as 1.2.3 in npm)'],
                                    ['x / *', '1.x', '>=1.0.0 <2.0.0', 'Wildcard: any minor/patch'],
                                    ['range', '1.2.3 - 2.3.4', '>=1.2.3 <=2.3.4', 'Inclusive range'],
                                    ['||', '^1.2 || ^2.0', '^1.2 OR ^2.0', 'Union of ranges (npm)'],
                                ].map(([op, ex, range, desc], i) => (
                                    <tr key={op} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 15, fontWeight: 700, color: 'var(--green)' }}>{op}</td>
                                        <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--ink)' }}>{ex}</td>
                                        <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{range}</td>
                                        <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--ink-3)' }}>{desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-3)', marginTop: 14 }}>
                        Rust's Cargo treats 1.2.3 (without a prefix) the same as npm's ^1.2.3 — allowing compatible updates. Python's pip uses == for exact pins and ~= for compatible releases. Go modules use semver with a /vN suffix for major versions above 1 (e.g., github.com/pkg/v2).
                    </p>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Semver in practice — when to bump major vs minor vs patch
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            { scenario: 'Fixed a null pointer exception with no API change', decision: 'PATCH', rationale: 'Bug fix with no observable behavior change for code that was working correctly.' },
                            { scenario: 'Added a new optional filter parameter to an existing function', decision: 'MINOR', rationale: 'Backward-compatible addition — existing callers still work without passing the new parameter.' },
                            { scenario: 'Removed a deprecated function that was marked for removal', decision: 'MAJOR', rationale: 'Removal of a public API is a breaking change regardless of how long it was deprecated.' },
                            { scenario: 'Changed the default value of an optional parameter', decision: 'MAJOR', rationale: 'Code that relies on the default value is broken. Changing defaults is a breaking change.' },
                            { scenario: 'Fixed a security vulnerability that changes output format', decision: 'MAJOR or MINOR', rationale: 'Security fixes are exceptional. If the format change is necessary for security, document it as MINOR with a security advisory, or MAJOR if feasible. Community practice varies.' },
                            { scenario: 'Added a new module that doesn\'t affect existing modules', decision: 'MINOR', rationale: 'Adding new functionality that existing code never encounters cannot break anything.' },
                            { scenario: 'Narrowed the accepted input type (string → number only)', decision: 'MAJOR', rationale: 'Rejecting previously accepted inputs is a breaking change even if the type was technically wrong before.' },
                        ].map(({ scenario, decision, rationale }, i) => (
                            <div key={scenario} style={{ display: 'flex', gap: 14, padding: '12px 14px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', flexWrap: 'wrap' }}>
                                <div style={{ flex: 1, minWidth: 200 }}>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{scenario}</div>
                                    <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.55 }}>{rationale}</div>
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 99, background: decision === 'MAJOR' ? 'var(--red-lt)' : decision === 'MINOR' ? 'var(--blue-lt)' : 'var(--green-lt)', color: decision === 'MAJOR' ? 'var(--red)' : decision === 'MINOR' ? '#2563eb' : 'var(--green)', alignSelf: 'flex-start', flexShrink: 0 }}>{decision}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Semver anti-patterns to avoid
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            { bad: 'Breaking changes in minor releases', why: 'The most damaging anti-pattern. Users who run npm update expecting safe updates suddenly have broken code. Always make breaking changes in major releases, even if they seem small.' },
                            { bad: 'Fear-driven major versions', why: 'Some teams avoid major version bumps to hide the existence of breaking changes, hoping no one notices. Proper semver requires honest signaling — if it breaks, it\'s a major.' },
                            { bad: 'Skipping versions (1.0.0 → 3.0.0)', why: 'Version numbers must be incremented sequentially. Skipping versions creates confusion in changelogs and for package managers. Release 2.0.0 even if it\'s going to be short-lived.' },
                            { bad: 'Never reaching 1.0.0', why: 'Staying on 0.x.x indefinitely is a red flag — it signals the API is never stable. When your library has a stable, committed public API, release 1.0.0 and honor the semver contract.' },
                            { bad: 'Including non-code changes in version bumps', why: 'Documentation changes, README updates, and CI config changes don\'t affect the package\'s behavior and don\'t need a version bump. Only functional code changes to the library\'s behavior warrant a new release.' },
                            { bad: 'Releasing without a changelog', why: 'Semver signals the type of change, but users need to know what actually changed. A machine-readable changelog (CHANGELOG.md following keepachangelog.com format) is essential for maintainable dependencies.' },
                        ].map(({ bad, why }) => (
                            <div key={bad} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                                <div style={{ marginBottom: 8 }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', background: 'var(--red-lt)', padding: '2px 8px', borderRadius: 99 }}>{bad}</span>
                                </div>
                                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>{why}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Breaking change detection in practice
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        Manually reviewing every change for breaking behavior is error-prone. Several tools exist to automate breaking change detection:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {[
                            { tool: 'Conventional Commits', desc: 'A commit message convention that encodes the change type: feat: for features (→ MINOR), fix: for bug fixes (→ PATCH), and feat!: or BREAKING CHANGE: footer for breaking changes (→ MAJOR). Tools like semantic-release parse these commits and automatically determine the correct semver bump and generate changelogs.' },
                            { tool: 'TypeScript API Extractor', desc: 'Microsoft\'s API Extractor tracks the public API surface of TypeScript packages. It generates an .api.md file that can be committed and diff\'d in CI to detect API surface changes, making breaking changes visible in code review.' },
                            { tool: 'go-apidiff / apidiff', desc: 'Go\'s official tool for detecting API incompatibilities between versions of a Go module. It compares the exported identifiers of two versions and reports any removals or incompatible changes.' },
                            { tool: 'next-semver (npm)', desc: 'Analyzes your Git history using Conventional Commits and suggests the next semver version. Integrates with CI pipelines to automate the release process entirely.' },
                        ].map(({ tool, desc }, i) => (
                            <div key={tool} style={{ padding: '14px 16px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{tool}</div>
                                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>{desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
