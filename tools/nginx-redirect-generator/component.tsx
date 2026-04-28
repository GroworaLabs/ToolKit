'use client';
import { useState, useMemo } from 'react';

type RedirectType = '301' | '302' | '307' | '308';
type Method = 'location' | 'rewrite' | 'return';

interface RedirectRule {
  id: number;
  from: string;
  to: string;
}

const REDIRECT_LABELS: Record<RedirectType, string> = {
  '301': '301 — Permanent',
  '302': '302 — Temporary (Found)',
  '307': '307 — Temporary (Preserve Method)',
  '308': '308 — Permanent (Preserve Method)',
};

const METHOD_LABELS: Record<Method, string> = {
  'return':   'return (simplest)',
  'location': 'location block',
  'rewrite':  'rewrite directive',
};

const PRESETS: { label: string; from: string; to: string; desc: string }[] = [
  { label: 'HTTP → HTTPS',          from: 'http://example.com',           to: 'https://example.com$request_uri',     desc: 'Force HTTPS on all pages' },
  { label: 'www → non-www',         from: 'http://www.example.com',       to: 'https://example.com$request_uri',     desc: 'Canonical non-www domain' },
  { label: 'non-www → www',         from: 'http://example.com',           to: 'https://www.example.com$request_uri', desc: 'Canonical www domain' },
  { label: 'Old page → New page',   from: '/old-blog-post',               to: '/blog/new-post',                      desc: 'Single page redirect' },
  { label: 'Directory → Directory', from: '/old-section/',                to: '/new-section/',                       desc: 'Redirect entire directory' },
  { label: 'Domain migration',      from: 'http://old-domain.com',       to: 'https://new-domain.com$request_uri',  desc: 'Move to a new domain' },
];

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isFullUrl(s: string): boolean {
  return /^https?:\/\//.test(s);
}

function extractPath(s: string): string {
  try {
    if (isFullUrl(s)) return new URL(s).pathname;
  } catch { /* */ }
  return s;
}

function extractHost(s: string): string {
  try {
    if (isFullUrl(s)) return new URL(s).hostname;
  } catch { /* */ }
  return '';
}

function generateConfig(
  rules: RedirectRule[],
  redirectType: RedirectType,
  method: Method,
  matchDomain: boolean,
  preserveQuery: boolean,
  useRegex: boolean,
): string {
  const blocks: string[] = [];

  for (const rule of rules) {
    if (!rule.from.trim() || !rule.to.trim()) continue;

    const fromHost = extractHost(rule.from);
    const fromPath = extractPath(rule.from) || '/';
    const toFull = rule.to.trim();
    const queryPart = preserveQuery ? '$is_args$args' : '';

    if (matchDomain && fromHost) {
      blocks.push(`server {`);
      blocks.push(`    listen 80;`);
      blocks.push(`    listen 443 ssl;`);
      blocks.push(`    server_name ${fromHost};`);
      blocks.push('');

      if (method === 'return') {
        if (fromPath === '/') {
          blocks.push(`    return ${redirectType} ${toFull}${queryPart};`);
        } else {
          blocks.push(`    location = ${fromPath} {`);
          blocks.push(`        return ${redirectType} ${toFull}${queryPart};`);
          blocks.push(`    }`);
        }
      } else if (method === 'rewrite') {
        const pattern = useRegex ? fromPath : `^${escapeRegex(fromPath)}$`;
        const flags = redirectType === '301' || redirectType === '308' ? 'permanent' : 'redirect';
        blocks.push(`    rewrite ${pattern} ${toFull}${preserveQuery ? '' : '?'} ${flags};`);
      } else {
        blocks.push(`    location = ${fromPath} {`);
        blocks.push(`        return ${redirectType} ${toFull}${queryPart};`);
        blocks.push(`    }`);
      }

      blocks.push('}');
    } else {
      if (method === 'return') {
        if (fromPath === '/') {
          blocks.push(`return ${redirectType} ${toFull}${queryPart};`);
        } else {
          blocks.push(`location = ${fromPath} {`);
          blocks.push(`    return ${redirectType} ${toFull}${queryPart};`);
          blocks.push(`}`);
        }
      } else if (method === 'rewrite') {
        const pattern = useRegex ? fromPath : `^${escapeRegex(fromPath)}$`;
        const flags = redirectType === '301' || redirectType === '308' ? 'permanent' : 'redirect';
        blocks.push(`rewrite ${pattern} ${toFull}${preserveQuery ? '' : '?'} ${flags};`);
      } else {
        blocks.push(`location = ${fromPath} {`);
        blocks.push(`    return ${redirectType} ${toFull}${queryPart};`);
        blocks.push(`}`);
      }
    }

    blocks.push('');
  }

  return blocks.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

let nextId = 2;

export default function NginxRedirectGenerator() {
  const [rules, setRules] = useState<RedirectRule[]>([
    { id: 1, from: '/old-page', to: '/new-page' },
  ]);
  const [redirectType, setRedirectType] = useState<RedirectType>('301');
  const [method, setMethod]       = useState<Method>('return');
  const [matchDomain, setMatchDomain]     = useState(false);
  const [preserveQuery, setPreserveQuery] = useState(true);
  const [useRegex, setUseRegex]           = useState(false);
  const [copied, setCopied] = useState(false);

  const output = useMemo(
    () => generateConfig(rules, redirectType, method, matchDomain, preserveQuery, useRegex),
    [rules, redirectType, method, matchDomain, preserveQuery, useRegex],
  );

  const addRule = () => {
    setRules(r => [...r, { id: nextId++, from: '', to: '' }]);
  };

  const removeRule = (id: number) => {
    setRules(r => r.length > 1 ? r.filter(x => x.id !== id) : r);
  };

  const updateRule = (id: number, field: 'from' | 'to', value: string) => {
    setRules(r => r.map(x => x.id === id ? { ...x, [field]: value } : x));
  };

  const applyPreset = (p: typeof PRESETS[0]) => {
    setRules([{ id: nextId++, from: p.from, to: p.to }]);
    if (isFullUrl(p.from)) setMatchDomain(true);
  };

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const chipStyle = (active: boolean): React.CSSProperties => ({
    padding: '5px 12px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
    border: '1.5px solid', borderColor: active ? 'var(--green)' : 'var(--border)',
    background: active ? 'var(--green-lt)' : 'var(--white)',
    color: active ? 'var(--green)' : 'var(--ink-2)', fontWeight: active ? 600 : 400,
  });

  const checkStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--ink-2)', cursor: 'pointer', userSelect: 'none',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Presets */}
      <div>
        <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8, display: 'block' }}>
          Quick Presets
        </label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {PRESETS.map(p => (
            <button key={p.label} onClick={() => applyPreset(p)} title={p.desc}
              style={{ padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
                border: '1.5px solid var(--border)', background: 'var(--white)', color: 'var(--ink-2)',
                transition: 'border-color 0.15s',
              }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rules */}
      <div>
        <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8, display: 'block' }}>
          Redirect Rules
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {rules.map((rule, i) => (
            <div key={rule.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: 'var(--ink-3)', minWidth: 18, textAlign: 'right' }}>{i + 1}.</span>
              <input
                value={rule.from}
                onChange={e => updateRule(rule.id, 'from', e.target.value)}
                placeholder="From: /old-path or https://old.com/path"
                style={{ flex: 1, padding: '8px 10px', borderRadius: 6, border: '1.5px solid var(--border)',
                  fontSize: 13, fontFamily: 'JetBrains Mono, monospace', background: 'var(--surface)', color: 'var(--ink)', outline: 'none' }}
              />
              <span style={{ fontSize: 14, color: 'var(--ink-3)' }}>&rarr;</span>
              <input
                value={rule.to}
                onChange={e => updateRule(rule.id, 'to', e.target.value)}
                placeholder="To: /new-path or https://new.com/path"
                style={{ flex: 1, padding: '8px 10px', borderRadius: 6, border: '1.5px solid var(--border)',
                  fontSize: 13, fontFamily: 'JetBrains Mono, monospace', background: 'var(--surface)', color: 'var(--ink)', outline: 'none' }}
              />
              <button onClick={() => removeRule(rule.id)} disabled={rules.length <= 1}
                title="Remove rule"
                style={{ width: 28, height: 28, borderRadius: 6, border: '1.5px solid var(--border)',
                  background: 'var(--white)', color: 'var(--ink-3)', cursor: rules.length > 1 ? 'pointer' : 'not-allowed',
                  fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: rules.length > 1 ? 1 : 0.4 }}>
                &times;
              </button>
            </div>
          ))}
        </div>
        <button onClick={addRule}
          style={{ marginTop: 8, padding: '6px 14px', borderRadius: 6, border: '1.5px dashed var(--border)',
            background: 'transparent', color: 'var(--ink-2)', fontSize: 13, cursor: 'pointer' }}>
          + Add rule
        </button>
      </div>

      {/* Options row */}
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Redirect type */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, display: 'block' }}>
            Status Code
          </label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {(Object.keys(REDIRECT_LABELS) as RedirectType[]).map(code => (
              <button key={code} onClick={() => setRedirectType(code)} style={chipStyle(redirectType === code)}>
                {REDIRECT_LABELS[code]}
              </button>
            ))}
          </div>
        </div>

        {/* Method */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, display: 'block' }}>
            Directive Method
          </label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {(Object.keys(METHOD_LABELS) as Method[]).map(m => (
              <button key={m} onClick={() => setMethod(m)} style={chipStyle(method === m)}>
                {METHOD_LABELS[m]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Checkboxes */}
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <label style={checkStyle}>
          <input type="checkbox" checked={matchDomain} onChange={e => setMatchDomain(e.target.checked)} />
          Wrap in server block (match domain)
        </label>
        <label style={checkStyle}>
          <input type="checkbox" checked={preserveQuery} onChange={e => setPreserveQuery(e.target.checked)} />
          Preserve query parameters
        </label>
        <label style={checkStyle}>
          <input type="checkbox" checked={useRegex} onChange={e => setUseRegex(e.target.checked)} />
          Treat source as regex (rewrite only)
        </label>
      </div>

      {/* Output */}
      <div>
        <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8, display: 'block' }}>
          Generated Nginx Config
        </label>
        <textarea readOnly value={output} spellCheck={false}
          style={{ width: '100%', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.6,
            padding: 12, border: '1.5px solid var(--border)', borderRadius: 8, resize: 'vertical',
            minHeight: 160, background: 'var(--surface)', color: 'var(--ink)', outline: 'none' }} />
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={copy} disabled={!output}
          style={{ padding: '9px 22px', borderRadius: 8, background: 'var(--bg-accent)', color: '#fff',
            border: 'none', fontWeight: 600, fontSize: 14, cursor: output ? 'pointer' : 'not-allowed',
            opacity: output ? 1 : 0.5 }}>
          {copied ? 'Copied!' : 'Copy Config'}
        </button>
      </div>
    </div>
  );
}