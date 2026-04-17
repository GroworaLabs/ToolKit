import { useState } from 'react';
import { useTextToMorse } from './use-text-to-morse';
import type { Direction } from './use-text-to-morse';
import { IcoX, IcoCopy, IcoCheck, IcoMorse } from '@/components/icons';

export default function TextToMorseWidget() {
  const { text, setText, direction, setDirection, output, clear } = useTextToMorse();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const dirs: { value: Direction; label: string; hint: string }[] = [
    { value: 'encode', label: 'Text → Morse', hint: 'Letters separated by space, words by /'  },
    { value: 'decode', label: 'Morse → Text', hint: 'Letters by space, words by space+/+space' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {dirs.map(d => (
          <button
            key={d.value}
            onClick={() => { setDirection(d.value); clear(); }}
            style={{
              padding: '7px 16px', border: 'none', borderRadius: 'var(--r-m)',
              background: direction === d.value ? 'var(--bg-accent)' : 'var(--border)',
              color: direction === d.value ? '#fff' : 'var(--ink-3)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              transition: 'background .15s, color .15s',
            }}
          >
            {d.label}
          </button>
        ))}
        <span style={{ fontSize: 12, color: 'var(--ink-4)', alignSelf: 'center', marginLeft: 4, flexShrink: 1, minWidth: 0 }}>
          {dirs.find(d => d.value === direction)?.hint}
        </span>
      </div>

      {/* Input */}
      <div>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.04em' }}>
          {direction === 'encode' ? 'Plain text' : 'Morse code'}
        </label>
        <div style={{ position: 'relative' }}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={
              direction === 'encode'
                ? 'Type or paste text to convert to Morse code…'
                : 'Paste Morse code — e.g. .... . .-.. .-.. --- / .-- --- .-. .-.. -..'
            }
            rows={4}
            spellCheck={direction === 'encode'}
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '12px 40px 12px 12px',
              background: 'var(--page-bg)', border: '1.5px solid var(--border)',
              borderRadius: 'var(--r-m)', resize: 'vertical',
              font: direction === 'decode'
                ? '14px/1.6 JetBrains Mono, monospace'
                : '15px/1.6 Outfit, system-ui, sans-serif',
              color: 'var(--ink)', outline: 'none',
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

      {/* Output */}
      {output && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <IcoMorse size={14} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.04em' }}>
                {direction === 'encode' ? 'Morse output' : 'Decoded text'}
              </span>
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

          <div style={{
            padding: '14px', maxHeight: 260, overflowY: 'auto',
            background: 'var(--page-bg)', border: '1.5px solid var(--border)',
            borderRadius: 'var(--r-m)',
            fontFamily: direction === 'encode' ? 'JetBrains Mono, monospace' : 'Outfit, system-ui, sans-serif',
            fontSize: direction === 'encode' ? 15 : 16,
            lineHeight: 1.8, color: 'var(--ink)',
            wordBreak: 'break-all', overflowWrap: 'anywhere',
          }}>
            {output}
          </div>
        </div>
      )}

      {!text && (
        <p style={{ fontSize: 12, color: 'var(--ink-4)', textAlign: 'right' }}>
          Results update as you type — no button needed
        </p>
      )}
    </div>
  );
}
