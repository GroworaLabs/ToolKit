import { useState, useCallback } from 'react';
import { IcoCopy, IcoX } from '@/components/icons';
import { convert, LAYOUT_OPTIONS, type LayoutPair } from './layouts';

const IcoDone = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IcoSwap = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 16V4m0 0L3 8m4-4l4 4" />
    <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
  </svg>
);

export default function KeyboardLayoutConverterWidget() {
  const [input, setInput] = useState('');
  const [pair, setPair] = useState<LayoutPair>('en→ua');
  const [copied, setCopied] = useState(false);

  const output = input ? convert(input, pair) : '';
  const hasText = input.length > 0;

  const copy = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [output]);

  const clear = useCallback(() => {
    setInput('');
    setCopied(false);
  }, []);

  const swapDirection = useCallback(() => {
    setPair(p => {
      const swaps: Record<LayoutPair, LayoutPair> = {
        'en→ua': 'ua→en',
        'ua→en': 'en→ua',
        'en→ru': 'ru→en',
        'ru→en': 'en→ru',
      };
      const next = swaps[p];
      if (output) setInput(output);
      return next;
    });
  }, [output]);

  const currentOpt = LAYOUT_OPTIONS.find(o => o.id === pair)!;

  return (
    <div>
      {/* Layout selector */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {LAYOUT_OPTIONS.map(opt => (
          <button
            key={opt.id}
            onClick={() => setPair(opt.id)}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--r-s)',
              border: `1.5px solid ${pair === opt.id ? 'var(--green)' : 'var(--border)'}`,
              background: pair === opt.id ? 'var(--green-lt)' : 'var(--white)',
              color: pair === opt.id ? 'var(--green-dk, var(--green))' : 'var(--ink-2)',
              fontSize: 13,
              fontWeight: pair === opt.id ? 600 : 500,
              cursor: 'pointer',
              transition: 'all .14s',
              whiteSpace: 'nowrap',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Direction indicator + swap */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, fontSize: 13, color: 'var(--ink-3)' }}>
        <span style={{ fontWeight: 600, color: 'var(--ink-2)' }}>{currentOpt.from}</span>
        <button
          onClick={swapDirection}
          title="Swap direction"
          style={{
            background: 'none',
            border: '1.5px solid var(--border)',
            borderRadius: 'var(--r-s)',
            cursor: 'pointer',
            color: 'var(--ink-3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            padding: 0,
            transition: 'all .14s',
          }}
        >
          <IcoSwap />
        </button>
        <span style={{ fontWeight: 600, color: 'var(--ink-2)' }}>{currentOpt.to}</span>
      </div>

      <div className="rule" />

      {/* Two-panel: input → output */}
      <div className="cc-panels">
        {/* Input */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)' }}>Input</label>
            {hasText && (
              <button
                onClick={clear}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-4)', display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, padding: 0 }}
              >
                <IcoX size={11} /> Clear
              </button>
            )}
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste mistyped text here..."
            spellCheck={false}
            style={{
              width: '100%',
              minHeight: 160,
              padding: 14,
              borderRadius: 'var(--r-m)',
              border: '1.5px solid var(--border)',
              background: 'var(--white)',
              color: 'var(--ink)',
              fontSize: 15,
              lineHeight: 1.7,
              resize: 'vertical',
              fontFamily: 'inherit',
              outline: 'none',
              transition: 'border-color .14s',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--green)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>

        {/* Output */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)' }}>Result</label>
            {hasText && (
              <button
                onClick={copy}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: copied ? 'var(--green)' : 'var(--ink-4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 12,
                  fontWeight: 500,
                  padding: 0,
                  transition: 'color .14s',
                }}
              >
                {copied ? <><IcoDone /> Copied</> : <><IcoCopy size={12} /> Copy</>}
              </button>
            )}
          </div>
          <div
            style={{
              width: '100%',
              minHeight: 160,
              padding: 14,
              borderRadius: 'var(--r-m)',
              border: '1.5px solid var(--border)',
              background: 'var(--surface, var(--bg-tool))',
              color: 'var(--ink)',
              fontSize: 15,
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontFamily: 'inherit',
            }}
          >
            {output || <span style={{ color: 'var(--ink-4)' }}>Converted text will appear here...</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
