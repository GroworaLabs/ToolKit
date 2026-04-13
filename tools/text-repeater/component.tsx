import { useState } from 'react';
import { useTextRepeater } from './use-text-repeater';
import type { Separator } from './use-text-repeater';
import { IcoX, IcoCopy, IcoCheck, IcoRepeatText } from '@/components/icons';

const SEPARATORS: { value: Separator; label: string }[] = [
  { value: 'newline', label: 'New line'   },
  { value: 'none',    label: 'No separator' },
  { value: 'space',   label: 'Space'      },
  { value: 'comma',   label: 'Comma (, )' },
  { value: 'pipe',    label: 'Pipe ( | )' },
  { value: 'custom',  label: 'Custom…'    },
];

export default function TextRepeaterWidget() {
  const {
    text, setText,
    count, setCount,
    separator, setSeparator,
    customSep, setCustomSep,
    output, safeCount, outputChars, clear,
  } = useTextRepeater();

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const hasOutput = output.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Input */}
      <div style={{ position: 'relative' }}>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.04em' }}>
          Text to repeat
        </label>
        <div style={{ position: 'relative' }}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type or paste the text you want to repeat…"
            rows={3}
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '12px 40px 12px 12px',
              background: 'var(--page-bg)', border: '1.5px solid var(--border)',
              borderRadius: 'var(--r-m)', resize: 'vertical',
              font: '15px/1.6 Outfit, system-ui, sans-serif', color: 'var(--ink)', outline: 'none',
              transition: 'border-color .15s, box-shadow .15s',
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

      {/* Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
        {/* Count */}
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.04em' }}>
            Repeat count
          </label>
          <input
            type="number"
            min={1}
            max={1000}
            value={count}
            onChange={e => setCount(Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)))}
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '10px 12px', background: 'var(--page-bg)',
              border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
              font: '15px/1 Outfit, system-ui, sans-serif', color: 'var(--ink)', outline: 'none',
            }}
            onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
            onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>

        {/* Separator */}
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.04em' }}>
            Separator
          </label>
          <select
            value={separator}
            onChange={e => setSeparator(e.target.value as Separator)}
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '10px 12px', background: 'var(--page-bg)',
              border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
              font: '15px/1 Outfit, system-ui, sans-serif', color: 'var(--ink)', outline: 'none',
              cursor: 'pointer',
            }}
            onFocus={e => { e.target.style.borderColor = 'var(--green)'; }}
            onBlur={e  => { e.target.style.borderColor = 'var(--border)'; }}
          >
            {SEPARATORS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        {/* Custom separator */}
        {separator === 'custom' && (
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.04em' }}>
              Custom separator
            </label>
            <input
              type="text"
              value={customSep}
              onChange={e => setCustomSep(e.target.value)}
              placeholder=", or | or ;"
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '10px 12px', background: 'var(--page-bg)',
                border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
                font: '15px/1 Outfit, system-ui, sans-serif', color: 'var(--ink)', outline: 'none',
              }}
              onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
              onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
        )}
      </div>

      {/* Output */}
      {hasOutput && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <IcoRepeatText size={14} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.04em' }}>
                Result
              </span>
              <span style={{ fontSize: 11, color: 'var(--ink-4)', background: 'var(--border)', padding: '1px 7px', borderRadius: 99 }}>
                {safeCount}× · {outputChars.toLocaleString()} chars
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

          <textarea
            readOnly
            value={output}
            rows={Math.min(safeCount + 1, 10)}
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '12px',
              background: 'var(--page-bg)', border: '1.5px solid var(--border)',
              borderRadius: 'var(--r-m)', resize: 'vertical',
              font: '14px/1.6 JetBrains Mono, monospace', color: 'var(--ink)',
              outline: 'none',
              wordBreak: 'break-all', overflowWrap: 'anywhere',
            }}
          />
        </div>
      )}

      {!text && (
        <p style={{ fontSize: 12, color: 'var(--ink-4)', textAlign: 'right', marginTop: 4 }}>
          Type text above — result updates instantly
        </p>
      )}
    </div>
  );
}
