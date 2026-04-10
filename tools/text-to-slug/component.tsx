import { useState, useMemo } from 'react';

const IcoCopy  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoX     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

function slugify(text: string, separator: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, separator)
    .replace(new RegExp(`^${separator.replace(/[-]/g, '\\-')}+|${separator.replace(/[-]/g, '\\-')}+$`, 'g'), '');
}

export default function TextToSlugWidget() {
  const [input,     setInput]     = useState('');
  const [separator, setSeparator] = useState<'-' | '_'>('-');
  const [copied,    setCopied]    = useState(false);

  const slug = useMemo(() => slugify(input, separator), [input, separator]);

  const copy = () => {
    if (!slug) return;
    navigator.clipboard.writeText(slug).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const clear = () => { setInput(''); setCopied(false); };

  const btnBase: React.CSSProperties = {
    padding: '5px 12px',
    borderRadius: 'var(--r-s)',
    border: '1.5px solid var(--border)',
    background: 'var(--white)',
    color: 'var(--ink-2)',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all .14s',
  };
  const btnActive: React.CSSProperties = {
    ...btnBase,
    border: '1.5px solid var(--green)',
    background: 'var(--green-lt)',
    color: 'var(--green)',
    fontWeight: 600,
  };

  return (
    <div>
      {/* Separator toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Separator</span>
        <button onClick={() => setSeparator('-')} style={separator === '-' ? btnActive : btnBase}>hyphen  —</button>
        <button onClick={() => setSeparator('_')} style={separator === '_' ? btnActive : btnBase}>underscore  _</button>
      </div>

      {/* Input */}
      <div style={{ position: 'relative', marginBottom: 14 }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Paste or type your text here…"
          rows={3}
          style={{
            width: '100%', boxSizing: 'border-box',
            padding: '12px 38px 12px 14px',
            border: '1.5px solid var(--border)',
            borderRadius: 'var(--r-m)',
            background: 'var(--white)',
            color: 'var(--ink)',
            fontSize: 14,
            lineHeight: 1.6,
            resize: 'vertical',
            outline: 'none',
            fontFamily: 'inherit',
          }}
        />
        {input && (
          <button
            onClick={clear}
            title="Clear"
            style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-4)', padding: 4 }}
          >
            <IcoX />
          </button>
        )}
      </div>

      {/* Output */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 14px',
        background: slug ? 'var(--green-lt)' : 'var(--page-bg)',
        border: `1.5px solid ${slug ? 'var(--green-mid, var(--green))' : 'var(--border)'}`,
        borderRadius: 'var(--r-m)',
        minHeight: 44,
      }}>
        <span style={{
          flex: 1,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 14,
          color: slug ? 'var(--green)' : 'var(--ink-4)',
          wordBreak: 'break-all',
        }}>
          {slug || 'slug will appear here'}
        </span>
        <button
          onClick={copy}
          disabled={!slug}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '6px 12px',
            borderRadius: 'var(--r-s)',
            border: 'none',
            background: copied ? 'var(--green)' : 'var(--ink)',
            color: '#fff',
            fontSize: 12,
            fontWeight: 600,
            cursor: slug ? 'pointer' : 'not-allowed',
            opacity: slug ? 1 : 0.4,
            transition: 'background .15s',
            flexShrink: 0,
          }}
        >
          {copied ? <IcoCheck /> : <IcoCopy />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Stats */}
      {slug && (
        <div style={{ display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap' }}>
          {[
            { label: 'Characters', value: slug.length },
            { label: 'Words',      value: slug.split(separator).filter(Boolean).length },
          ].map(({ label, value }) => (
            <div key={label} style={{ fontSize: 12, color: 'var(--ink-3)' }}>
              <span style={{ fontWeight: 700, color: 'var(--ink)', fontFamily: 'JetBrains Mono, monospace' }}>{value}</span>
              {' '}{label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
