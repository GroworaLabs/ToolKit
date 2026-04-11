import { useState } from 'react';
import { useNatoAlphabet } from './use-nato-alphabet';
import type { DisplayMode } from './use-nato-alphabet';
import { IcoX, IcoCopy, IcoCheck, IcoNato } from '@/components/icons';

export default function NatoAlphabetWidget() {
  const { text, setText, tokens, inlineOutput, mode, setMode, clear } = useNatoAlphabet();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const str = mode === 'inline' ? inlineOutput : tokens.map(t => t.word).join(' ');
    if (!str) return;
    navigator.clipboard.writeText(str).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const modes: { value: DisplayMode; label: string }[] = [
    { value: 'table',  label: 'Card view'   },
    { value: 'inline', label: 'Inline text'  },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Input */}
      <div>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.04em' }}>
          Text to spell out
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type letters to convert — e.g. Hello"
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '12px 40px 12px 12px',
              background: 'var(--page-bg)', border: '1.5px solid var(--border)',
              borderRadius: 'var(--r-m)',
              font: '16px/1 Outfit, system-ui, sans-serif', color: 'var(--ink)', outline: 'none',
              transition: 'border-color .15s, box-shadow .15s',
            }}
            onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
            onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
          />
          {text && (
            <button onClick={clear} title="Clear" style={{ position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)', background: 'var(--border)', border: 'none', borderRadius: 6, width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-3)', cursor: 'pointer' }}>
              <IcoX size={13} />
            </button>
          )}
        </div>
      </div>

      {/* View toggle + copy */}
      {tokens.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {modes.map(m => (
              <button
                key={m.value}
                onClick={() => setMode(m.value)}
                style={{
                  padding: '5px 12px', border: 'none', borderRadius: 'var(--r-s)',
                  background: mode === m.value ? 'var(--ink)' : 'var(--border)',
                  color: mode === m.value ? '#fff' : 'var(--ink-3)',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  transition: 'background .15s, color .15s',
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
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
      )}

      {/* Card view */}
      {tokens.length > 0 && mode === 'table' && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {tokens.map((t, i) => (
            t.isBreak ? (
              <div key={i} style={{ width: '100%', height: 6 }} />
            ) : t.isSpace ? (
              <div key={i} style={{ padding: '6px 10px', background: 'var(--border)', borderRadius: 'var(--r-s)', fontSize: 11, color: 'var(--ink-4)', alignSelf: 'center' }}>
                space
              </div>
            ) : (
              <div
                key={i}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  padding: '8px 12px',
                  background: t.unknown ? 'rgba(220,38,38,.06)' : 'var(--green-lt)',
                  border: `1.5px solid ${t.unknown ? 'rgba(220,38,38,.2)' : 'rgba(5,150,105,.2)'}`,
                  borderRadius: 'var(--r-m)', minWidth: 52, maxWidth: 100,
                }}
              >
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 16, color: t.unknown ? '#dc2626' : 'var(--green)', lineHeight: 1 }}>
                  {t.char}
                </span>
                <span style={{ fontSize: 11, color: t.unknown ? '#dc2626' : 'var(--ink-2)', marginTop: 4, textAlign: 'center', wordBreak: 'break-word', lineHeight: 1.3 }}>
                  {t.word}
                </span>
              </div>
            )
          ))}
        </div>
      )}

      {/* Inline view */}
      {tokens.length > 0 && mode === 'inline' && (
        <div style={{
          padding: '14px',
          background: 'var(--page-bg)', border: '1.5px solid var(--border)',
          borderRadius: 'var(--r-m)',
          fontSize: 15, lineHeight: 1.8, color: 'var(--ink)',
          wordBreak: 'break-word', overflowWrap: 'anywhere',
        }}>
          {tokens.map((t, i) => (
            t.isBreak ? <br key={i} /> :
            t.isSpace ? <span key={i} style={{ color: 'var(--ink-4)', margin: '0 4px' }}>—</span> :
            <span key={i} style={{ marginRight: 4 }}>
              <span style={{ fontWeight: 700, color: 'var(--green)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, marginRight: 2 }}>{t.char}</span>
              <span>{t.word}</span>
            </span>
          ))}
        </div>
      )}

      {!text && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px', background: 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-m)' }}>
          <IcoNato size={16} />
          <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>Type any letters or numbers above to see their NATO code words</span>
        </div>
      )}
    </div>
  );
}
