import { useState, useMemo } from 'react';

const IcoCopy  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

type InputMode = 'text' | 'count';
type SpeedPreset = 'slow' | 'average' | 'fast' | 'custom';

const PRESETS: { id: SpeedPreset; label: string; wpm: number }[] = [
  { id: 'slow',    label: 'Slow',    wpm: 150 },
  { id: 'average', label: 'Average', wpm: 238 },
  { id: 'fast',    label: 'Fast',    wpm: 350 },
  { id: 'custom',  label: 'Custom',  wpm: 238 },
];

function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function formatTime(minutes: number): string {
  if (minutes < 1) return 'less than a minute';
  const m = Math.round(minutes);
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return rem > 0 ? `${h} h ${rem} min` : `${h} h`;
}

const STAT_CARD = (label: string, value: string, sub?: string): React.ReactNode => (
  <div style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', textAlign: 'center', flex: '1 1 120px', minWidth: 0 }}>
    <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', fontFamily: 'Outfit, sans-serif', lineHeight: 1.1 }}>{value}</div>
    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', marginTop: 4 }}>{label}</div>
    {sub && <div style={{ fontSize: 11, color: 'var(--ink-4)', marginTop: 2 }}>{sub}</div>}
  </div>
);

export default function ReadingTimeWidget() {
  const [mode,        setMode]        = useState<InputMode>('text');
  const [text,        setText]        = useState('');
  const [wordCountIn, setWordCountIn] = useState('');
  const [preset,      setPreset]      = useState<SpeedPreset>('average');
  const [customWpm,   setCustomWpm]   = useState(238);
  const [speakWpm,    setSpeakWpm]    = useState(140);
  const [copied,      setCopied]      = useState(false);

  const readWpm   = preset === 'custom' ? customWpm : PRESETS.find(p => p.id === preset)!.wpm;
  const wordCount = mode === 'text' ? countWords(text) : (parseInt(wordCountIn) || 0);
  const charCount = mode === 'text' ? text.length : 0;
  const charNoSp  = mode === 'text' ? text.replace(/\s/g, '').length : 0;
  const readMin   = wordCount / readWpm;
  const speakMin  = wordCount / speakWpm;

  const summary = useMemo(() => {
    if (!wordCount) return '';
    return `${wordCount.toLocaleString()} words · Reading: ${formatTime(readMin)} · Speaking: ${formatTime(speakMin)}`;
  }, [wordCount, readMin, speakMin]);

  const copy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div>
      {/* Mode tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
        {(['text', 'count'] as InputMode[]).map(m => (
          <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: '8px', border: `1.5px solid ${mode === m ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-s)', background: mode === m ? 'var(--green-lt)' : 'var(--white)', color: mode === m ? 'var(--green)' : 'var(--ink-2)', fontSize: 13, fontWeight: mode === m ? 700 : 500, cursor: 'pointer', transition: 'all .14s' }}>
            {m === 'text' ? 'Paste text' : 'Word count'}
          </button>
        ))}
      </div>

      {/* Input */}
      {mode === 'text' ? (
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste your article or any text here…"
          style={{ width: '100%', minHeight: 140, padding: '12px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', font: '14px/1.65 inherit', color: 'var(--ink)', background: 'var(--page-bg)', outline: 'none', resize: 'vertical', boxSizing: 'border-box', transition: 'border-color .15s' }}
          onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
          onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
        />
      ) : (
        <div style={{ marginBottom: 4 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', display: 'block', marginBottom: 6 }}>Number of words</label>
          <input
            type="number" min={0} value={wordCountIn}
            onChange={e => setWordCountIn(e.target.value)}
            placeholder="e.g. 1200"
            style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', fontSize: 16, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)', background: 'var(--page-bg)', outline: 'none', boxSizing: 'border-box', transition: 'border-color .15s' }}
            onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
            onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
      )}

      {/* Speed presets */}
      <div style={{ marginTop: 14, marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 8 }}>Reading speed</div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {PRESETS.map(p => (
            <button key={p.id} onClick={() => setPreset(p.id)} style={{ padding: '6px 12px', border: `1.5px solid ${preset === p.id ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-s)', background: preset === p.id ? 'var(--green-lt)' : 'var(--white)', color: preset === p.id ? 'var(--green)' : 'var(--ink-2)', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all .14s' }}>
              {p.label}{p.id !== 'custom' ? ` · ${p.wpm} WPM` : ''}
            </button>
          ))}
        </div>
        {preset === 'custom' && (
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
            <input type="range" min={50} max={600} value={customWpm} onChange={e => setCustomWpm(+e.target.value)} style={{ flex: 1, accentColor: 'var(--green)' }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 700, color: 'var(--ink)', minWidth: 64 }}>{customWpm} WPM</span>
          </div>
        )}
      </div>

      {/* Results */}
      {wordCount > 0 && (
        <>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
            {STAT_CARD('Reading time', formatTime(readMin), `${readWpm} WPM`)}
            {STAT_CARD('Speaking time', formatTime(speakMin), `${speakWpm} WPM`)}
            {STAT_CARD('Words', wordCount.toLocaleString())}
            {mode === 'text' && STAT_CARD('Characters', charCount.toLocaleString(), `${charNoSp.toLocaleString()} no spaces`)}
          </div>

          {/* Speaking speed control */}
          <div style={{ marginBottom: 14, padding: '12px 16px', background: 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-m)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)' }}>Speaking speed</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 700, color: 'var(--ink)' }}>{speakWpm} WPM</span>
            </div>
            <input type="range" min={80} max={250} value={speakWpm} onChange={e => setSpeakWpm(+e.target.value)} style={{ width: '100%', marginTop: 8, accentColor: 'var(--green)' }} />
          </div>

          <button onClick={copy} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', background: copied ? 'var(--green)' : 'var(--white)', color: copied ? '#fff' : 'var(--ink-3)', border: `1.5px solid ${copied ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-s)', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all .14s' }}>
            {copied ? <IcoCheck /> : <IcoCopy />} {copied ? 'Copied!' : 'Copy summary'}
          </button>
        </>
      )}
    </div>
  );
}
