import { useRegexTester, FLAG_INFO } from './use-regex-tester';

const IcoCopy  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

import { useState, useCallback } from 'react';

/* ── Quick patterns ─────────────────────────────────── */
const QUICK: { label: string; pattern: string; desc: string }[] = [
  { label: 'Email',    pattern: '[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}', desc: 'Match email addresses' },
  { label: 'URL',      pattern: 'https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+[\\w\\-._~:/?#[\\]@!$&\'()*+,;=]*', desc: 'Match URLs' },
  { label: 'IPv4',     pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', desc: 'Match IPv4 addresses' },
  { label: 'Digits',   pattern: '\\d+', desc: 'Match sequences of digits' },
  { label: 'Words',    pattern: '\\b\\w+\\b', desc: 'Match words' },
  { label: 'Hex',      pattern: '#[0-9a-fA-F]{3,6}\\b', desc: 'Match hex color codes' },
  { label: 'Date',     pattern: '\\d{4}-\\d{2}-\\d{2}', desc: 'Match YYYY-MM-DD dates' },
  { label: 'Spaces',   pattern: '\\s+', desc: 'Match whitespace' },
];

export default function RegexTesterWidget() {
  const {
    pattern, setPattern,
    testText, setTestText,
    flags, toggleFlag,
    result, highlightedHtml,
  } = useRegexTester();

  const [copiedPattern, setCopiedPattern] = useState(false);

  const copyPattern = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`/${pattern}/${Array.from(flags).join('')}`);
      setCopiedPattern(true);
      setTimeout(() => setCopiedPattern(false), 1800);
    } catch { /* ignore */ }
  }, [pattern, flags]);

  const inputStyle = {
    width: '100%', padding: '10px 12px', outline: 'none', boxSizing: 'border-box' as const,
    border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
    font: '13px/1.5 JetBrains Mono, monospace', color: 'var(--ink)',
    background: 'var(--page-bg)', transition: 'border-color .15s',
  };

  return (
      <div>

        {/* Pattern input */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6, gap: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', flex: 1 }}>Regular Expression</label>
            {result.isValid && pattern && (
                <span style={{ fontSize: 11, color: 'var(--green)', fontWeight: 600 }}>
              {result.matchCount} match{result.matchCount !== 1 ? 'es' : ''}
            </span>
            )}
            <button onClick={copyPattern} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-4)', fontSize: 12 }}>
              {copiedPattern ? <IcoCheck /> : <IcoCopy />}
            </button>
          </div>

          {/* Pattern + flags row */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-4)', fontFamily: 'JetBrains Mono, monospace', fontSize: 16, pointerEvents: 'none' }}>/</span>
              <input
                  type="text"
                  value={pattern}
                  onChange={e => setPattern(e.target.value)}
                  placeholder="\\b\\w+\\b"
                  style={{ ...inputStyle, paddingLeft: 24, paddingRight: 24, borderColor: result.error ? 'var(--red)' : pattern ? 'var(--border-md)' : 'var(--border)' }}
                  onFocus={e  => { e.target.style.borderColor = result.error ? 'var(--red)' : 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
                  onBlur={e   => { e.target.style.borderColor = result.error ? 'var(--red)' : 'var(--border)'; e.target.style.boxShadow = 'none'; }}
              />
              <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-4)', fontFamily: 'JetBrains Mono, monospace', fontSize: 16, pointerEvents: 'none' }}>/</span>
            </div>

            {/* Flags */}
            <div style={{ display: 'flex', gap: 4 }}>
              {FLAG_INFO.map(({ flag, label, desc }) => (
                  <div key={flag} style={{ position: 'relative' }}>
                    <button
                        onClick={() => toggleFlag(flag)}
                        style={{
                          width: 30, height: 36,
                          border: `1.5px solid ${flags.has(flag) ? 'var(--green)' : 'var(--border)'}`,
                          borderRadius: 'var(--r-s)',
                          background: flags.has(flag) ? 'var(--green-lt)' : 'var(--white)',
                          color: flags.has(flag) ? 'var(--green)' : 'var(--ink-3)',
                          fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600,
                          cursor: 'pointer', transition: 'all .14s',
                        }}
                        onMouseEnter={e => {
                          const tip = e.currentTarget.nextElementSibling as HTMLElement;
                          if (tip) tip.style.opacity = '1';
                        }}
                        onMouseLeave={e => {
                          const tip = e.currentTarget.nextElementSibling as HTMLElement;
                          if (tip) tip.style.opacity = '0';
                        }}
                    >
                      {flag}
                    </button>
                    {/* Tooltip */}
                    <div style={{
                      position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--ink)', color: '#fff',
                      padding: '6px 10px', borderRadius: 'var(--r-m)',
                      fontSize: 12, lineHeight: 1.45, whiteSpace: 'nowrap',
                      pointerEvents: 'none', opacity: 0,
                      transition: 'opacity .15s',
                      zIndex: 50, boxShadow: 'var(--sh-m)',
                      textAlign: 'center', minWidth: 140,
                    }}>
                      <div style={{ fontWeight: 700, marginBottom: 2 }}>{flag} — {label}</div>
                      <div style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Outfit, sans-serif', fontSize: 11 }}>{desc}</div>
                      {/* Arrow */}
                      <div style={{
                        position: 'absolute', top: '100%', left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0, height: 0,
                        borderLeft: '5px solid transparent',
                        borderRight: '5px solid transparent',
                        borderTop: '5px solid var(--ink)',
                      }} />
                    </div>
                  </div>
              ))}
            </div>
          </div>

          {/* Error */}
          {result.error && (
              <div style={{ marginTop: 6, fontSize: 12, color: 'var(--red)', fontFamily: 'JetBrains Mono, monospace', padding: '6px 10px', background: 'var(--red-lt)', borderRadius: 'var(--r-s)' }}>
                {result.error}
              </div>
          )}
        </div>

        {/* Quick patterns */}
        <div style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-4)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 7 }}>Quick patterns</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {QUICK.map(q => (
                <button
                    key={q.label}
                    onClick={() => setPattern(q.pattern)}
                    title={q.desc}
                    style={{
                      padding: '4px 10px',
                      border: `1.5px solid ${pattern === q.pattern ? 'var(--green)' : 'var(--border)'}`,
                      borderRadius: 'var(--r-s)',
                      background: pattern === q.pattern ? 'var(--green-lt)' : 'var(--white)',
                      color: pattern === q.pattern ? 'var(--green)' : 'var(--ink-3)',
                      fontSize: 12, fontWeight: 500, cursor: 'pointer', transition: 'all .14s',
                    }}
                >
                  {q.label}
                </button>
            ))}
          </div>
        </div>

        <div className="rule" />

        {/* Test text input */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 6 }}>Test String</label>
          <textarea
              value={testText}
              onChange={e => setTestText(e.target.value)}
              rows={5}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }}
              onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
              onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>

        {/* Highlighted result */}
        {testText && (
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 6 }}>Highlighted matches</label>
              <div
                  style={{
                    padding: '12px', background: 'var(--white)',
                    border: '1.5px solid var(--border-md)', borderRadius: 'var(--r-m)',
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 13, lineHeight: 1.7,
                    wordBreak: 'break-all', boxShadow: 'var(--sh-xs)',
                    minHeight: 48,
                  }}
                  dangerouslySetInnerHTML={{ __html: highlightedHtml || '<span style="color:var(--ink-4)">No matches</span>' }}
              />
            </div>
        )}

        {/* Match details */}
        {result.matches.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)' }}>
                  Match details ({result.matchCount})
                </p>
                <button
                    onClick={() => {
                      const hasGroups = result.matches.some(m => m.groups && Object.keys(m.groups).length > 0);
                      const groupKeys = hasGroups
                          ? Array.from(new Set(result.matches.flatMap(m => m.groups ? Object.keys(m.groups) : [])))
                          : [];

                      const header = ['#', 'match', 'start', 'end', 'length', ...groupKeys].join(',');
                      const rows = result.matches.map((m, i) => {
                        const base = [
                          i + 1,
                          `"${m.value.replace(/"/g, '""')}"`,
                          m.index,
                          m.end,
                          m.value.length,
                        ];
                        const groups = groupKeys.map(k => `"${(m.groups?.[k] ?? '').replace(/"/g, '""')}"`);
                        return [...base, ...groups].join(',');
                      });

                      const csv = [header, ...rows].join('\n');
                      const blob = new Blob([csv], { type: 'text/csv' });
                      const url  = URL.createObjectURL(blob);
                      const a    = document.createElement('a');
                      a.href     = url;
                      a.download = 'regex-matches.csv';
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      padding: '4px 10px',
                      background: 'var(--white)', color: 'var(--ink-3)',
                      border: '1.5px solid var(--border)', borderRadius: 'var(--r-s)',
                      fontSize: 12, fontWeight: 600, cursor: 'pointer',
                      transition: 'all .14s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.color = 'var(--green)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)';  e.currentTarget.style.color = 'var(--ink-3)'; }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Export CSV
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, maxHeight: 220, overflowY: 'auto' }}>
                {result.matches.slice(0, 50).map((m, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-s)' }}>
                      <span style={{ fontSize: 11, color: 'var(--ink-4)', minWidth: 22, textAlign: 'right', flexShrink: 0 }}>#{i + 1}</span>
                      <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--ink)', fontWeight: 500, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {m.value || '(empty)'}
                      </code>
                      <span style={{ fontSize: 11, color: 'var(--ink-4)', flexShrink: 0 }}>
                  [{m.index}–{m.end}]
                </span>
                      {m.groups && Object.keys(m.groups).length > 0 && (
                          <span style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {JSON.stringify(m.groups)}
                  </span>
                      )}
                    </div>
                ))}
                {result.matches.length > 50 && (
                    <p style={{ fontSize: 12, color: 'var(--ink-4)', textAlign: 'center', padding: '4px 0' }}>
                      Showing first 50 of {result.matchCount} matches
                    </p>
                )}
              </div>
            </div>
        )}

      </div>
  );
}