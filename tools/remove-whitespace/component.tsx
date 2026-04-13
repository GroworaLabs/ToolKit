import { useState } from 'react';
import { useRemoveWhitespace } from './use-remove-whitespace';
import type { WhitespaceOptions } from './use-remove-whitespace';
import { IcoX, IcoCopy, IcoCheck, IcoTrim } from '@/components/icons';

const OPTION_LABELS: { key: keyof WhitespaceOptions; label: string; desc: string }[] = [
  { key: 'trimLines',        label: 'Trim line edges',    desc: 'Remove leading & trailing spaces from every line' },
  { key: 'collapseSpaces',   label: 'Collapse spaces',    desc: 'Replace multiple consecutive spaces with one'      },
  { key: 'removeTabs',       label: 'Convert tabs',       desc: 'Replace tab characters with a single space'        },
  { key: 'removeBlankLines', label: 'Remove blank lines', desc: 'Delete empty or whitespace-only lines'             },
];

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      role="switch"
      aria-checked={on}
      style={{
        width: 40, height: 22, borderRadius: 99, border: 'none', cursor: 'pointer',
        background: on ? 'var(--green)' : 'var(--border-md)',
        position: 'relative', flexShrink: 0, transition: 'background .15s',
      }}
    >
      <span style={{
        position: 'absolute', top: 3, left: on ? 20 : 3,
        width: 16, height: 16, borderRadius: '50%', background: '#fff',
        transition: 'left .15s', boxShadow: '0 1px 3px rgba(0,0,0,.2)',
      }} />
    </button>
  );
}

export default function RemoveWhitespaceWidget() {
  const { text, setText, output, options, toggle, clear, removed } = useRemoveWhitespace();
  const [copied, setCopied] = useState(false);

  const hasOutput = output.length > 0;

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Options */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 8 }}>
        {OPTION_LABELS.map(({ key, label, desc }) => (
          <div
            key={key}
            onClick={() => toggle(key)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 12px',
              background: options[key] ? 'var(--green-lt)' : 'var(--page-bg)',
              border: `1.5px solid ${options[key] ? 'rgba(5,150,105,.25)' : 'var(--border)'}`,
              borderRadius: 'var(--r-m)', cursor: 'pointer',
              transition: 'background .15s, border-color .15s',
            }}
          >
            <Toggle on={options[key]} onClick={() => toggle(key)} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2, lineHeight: 1.4 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.04em' }}>
          Input text
        </label>
        <div style={{ position: 'relative' }}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste text with extra spaces, tabs or blank lines…"
            rows={6}
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '12px 40px 12px 12px',
              background: 'var(--page-bg)', border: '1.5px solid var(--border)',
              borderRadius: 'var(--r-m)', resize: 'vertical',
              font: '14px/1.6 JetBrains Mono, monospace', color: 'var(--ink)', outline: 'none',
              transition: 'border-color .15s, box-shadow .15s',
              wordBreak: 'break-all', overflowWrap: 'anywhere',
            }}
            onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
            onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
          />
          {text && (
            <button onClick={clear} title="Clear" style={{ position: 'absolute', top: 9, right: 9, background: 'var(--border)', border: 'none', borderRadius: 6, width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-3)', cursor: 'pointer' }}>
              <IcoX size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Stats bar */}
      {text && (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', padding: '10px 14px', background: 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-m)' }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <IcoTrim size={13} />
            <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>
              {removed > 0
                ? <><b style={{ color: 'var(--green)', fontFamily: 'JetBrains Mono, monospace' }}>{removed}</b> characters removed</>
                : <span style={{ color: 'var(--ink-4)' }}>No whitespace to remove</span>
              }
            </span>
          </div>
          <div style={{ width: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>
            <b style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)' }}>{text.length}</b> → <b style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)' }}>{output.length}</b> chars
          </span>
        </div>
      )}

      {/* Output */}
      {hasOutput && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.04em' }}>
              Clean output
            </span>
            <button
              onClick={handleCopy}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '5px 12px', border: 'none', borderRadius: 'var(--r-s)',
                background: copied ? 'var(--green-lt)' : 'var(--border)',
                color: copied ? 'var(--green)' : 'var(--ink-3)',
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
                transition: 'background .15s, color .15s',
              }}
            >
              {copied ? <IcoCheck size={13} /> : <IcoCopy size={13} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <textarea
            readOnly
            value={output}
            rows={6}
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '12px',
              background: 'var(--page-bg)', border: '1.5px solid var(--border)',
              borderRadius: 'var(--r-m)', resize: 'vertical',
              font: '14px/1.6 JetBrains Mono, monospace', color: 'var(--ink)',
              outline: 'none', wordBreak: 'break-all', overflowWrap: 'anywhere',
            }}
          />
        </div>
      )}

      {!text && (
        <p style={{ fontSize: 12, color: 'var(--ink-4)', textAlign: 'right' }}>
          Paste text above — output updates instantly
        </p>
      )}
    </div>
  );
}
