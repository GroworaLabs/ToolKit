import { useState } from 'react';
import { useRot13Encoder } from './use-rot13-encoder';
import { IcoX, IcoCopy, IcoCheck, IcoCipher, IcoRefresh } from '@/components/icons';

export default function Rot13EncoderWidget() {
  const { text, setText, output, lettersAffected, unchanged, swap, clear } = useRot13Encoder();
  const [copiedInput, setCopiedInput]   = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);

  const handleCopyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopiedOutput(true);
      setTimeout(() => setCopiedOutput(false), 1800);
    });
  };

  const handleCopyInput = () => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedInput(true);
      setTimeout(() => setCopiedInput(false), 1800);
    });
  };

  const boxStyle = {
    width: '100%', boxSizing: 'border-box' as const,
    padding: '14px', minHeight: 160,
    background: 'var(--page-bg)', border: '1.5px solid var(--border)',
    borderRadius: 'var(--r-m)', resize: 'vertical' as const,
    font: '15px/1.65 JetBrains Mono, monospace', color: 'var(--ink)', outline: 'none',
    transition: 'border-color .15s, box-shadow .15s',
    wordBreak: 'break-all' as const, overflowWrap: 'anywhere' as const,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Header note */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', background: 'var(--green-lt)', border: '1px solid rgba(5,150,105,.2)', borderRadius: 'var(--r-m)' }}>
        <IcoCipher size={14} />
        <span style={{ fontSize: 12, color: 'var(--green)', fontWeight: 600 }}>
          ROT13 is its own inverse — encode and decode are the same operation
        </span>
      </div>

      {/* Two-panel layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>

        {/* Input */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.04em' }}>
              Input
            </label>
            <div style={{ display: 'flex', gap: 4 }}>
              {text && (
                <button
                  onClick={handleCopyInput}
                  title="Copy input"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '4px 9px', border: 'none', borderRadius: 'var(--r-s)',
                    background: copiedInput ? 'var(--green-lt)' : 'var(--border)',
                    color: copiedInput ? 'var(--green)' : 'var(--ink-3)',
                    fontSize: 11, fontWeight: 600, cursor: 'pointer',
                    transition: 'background .15s',
                  }}
                >
                  {copiedInput ? <IcoCheck size={11} /> : <IcoCopy size={11} />}
                  {copiedInput ? 'Copied' : 'Copy'}
                </button>
              )}
              {text && (
                <button onClick={clear} title="Clear" style={{ background: 'var(--border)', border: 'none', borderRadius: 6, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-3)', cursor: 'pointer' }}>
                  <IcoX size={12} />
                </button>
              )}
            </div>
          </div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type or paste text to encode / decode with ROT13…"
            style={boxStyle}
            onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
            onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>

        {/* Output */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.04em' }}>
              ROT13 output
            </label>
            {output && (
              <button
                onClick={handleCopyOutput}
                style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  padding: '4px 9px', border: 'none', borderRadius: 'var(--r-s)',
                  background: copiedOutput ? 'var(--green-lt)' : 'var(--border)',
                  color: copiedOutput ? 'var(--green)' : 'var(--ink-3)',
                  fontSize: 11, fontWeight: 600, cursor: 'pointer',
                  transition: 'background .15s',
                }}
              >
                {copiedOutput ? <IcoCheck size={11} /> : <IcoCopy size={11} />}
                {copiedOutput ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
          <div
            style={{
              ...boxStyle,
              border: output ? '1.5px solid rgba(5,150,105,.25)' : '1.5px solid var(--border)',
              background: output ? 'var(--green-lt)' : 'var(--page-bg)',
              display: 'flex', alignItems: output ? 'flex-start' : 'center', justifyContent: output ? 'flex-start' : 'center',
              color: output ? 'var(--ink)' : 'var(--ink-4)',
              fontSize: output ? 15 : 13,
              cursor: 'default',
              overflowY: 'auto',
            }}
          >
            {output || 'Output will appear here…'}
          </div>
        </div>
      </div>

      {/* Swap + stats */}
      {output && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <button
            onClick={swap}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
              background: 'var(--page-bg)', color: 'var(--ink-2)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              transition: 'border-color .15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--green)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <IcoRefresh size={13} />
            Use output as input
          </button>
          <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'var(--ink-3)' }}>
            <span><b style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--green)' }}>{lettersAffected}</b> letters rotated</span>
            <span><b style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)' }}>{unchanged}</b> unchanged</span>
          </div>
        </div>
      )}

      {!text && (
        <p style={{ fontSize: 12, color: 'var(--ink-4)', textAlign: 'right' }}>
          Digits, spaces and symbols are preserved unchanged
        </p>
      )}
    </div>
  );
}
