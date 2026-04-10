import { useWordCounter } from './use-word-counter';
import {IcoClock, IcoMic, IcoX} from "@/components/icons";

interface StatCardProps { label: string; value: string | number; sub?: string; accent?: boolean; }

function StatCard({ label, value, accent }: StatCardProps) {
  return (
    <div style={{
      background: accent ? 'var(--green-lt)' : 'var(--page-bg)',
      border: `1.5px solid ${accent ? 'rgba(5,150,105,.25)' : 'var(--border)'}`,
      borderRadius: 'var(--r-m)', padding: '14px 16px',
    }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 22, fontWeight: 600, color: accent ? 'var(--green)' : 'var(--ink)', lineHeight: 1, marginBottom: 6 }}>
        {value}
      </div>
      <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 500 }}>{label}</div>
    </div>
  );
}

export default function WordCounterWidget() {
  const { text, setText, stats, keywords, clear } = useWordCounter();
  const hasText = text.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

      {/* Textarea */}
      <div style={{ position: 'relative' }}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste or type your text here…"
          spellCheck={false}
          style={{
            width: '100%', minHeight: 200, padding: '14px', paddingRight: hasText ? 44 : 14,
            background: 'var(--page-bg)', border: '1.5px solid var(--border)',
            borderRadius: 'var(--r-m)', resize: 'vertical',
            font: '15px/1.65 Outfit, system-ui, sans-serif', color: 'var(--ink)', outline: 'none',
            transition: 'border-color .15s, box-shadow .15s', boxSizing: 'border-box',
          }}
          onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
          onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
        />
        {hasText && (
          <button onClick={clear} title="Clear" style={{ position: 'absolute', top: 10, right: 10, background: 'var(--border)', border: 'none', borderRadius: 6, width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-3)', cursor: 'pointer' }}>
            <IcoX size={13} />
          </button>
        )}
      </div>

      {!hasText && <p style={{ marginTop: 8, fontSize: 12, color: 'var(--ink-4)', textAlign: 'right' }}>Live counting — no button needed</p>}

      {/* Stats */}
      <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 7 }}>
        <StatCard label="Words"        value={stats.words.toLocaleString()}         accent={hasText} />
        <StatCard label="Characters"   value={stats.chars.toLocaleString()} />
        <StatCard label="No spaces"    value={stats.charsNoSpaces.toLocaleString()} />
        <StatCard label="Sentences"    value={stats.sentences.toLocaleString()} />
        <StatCard label="Paragraphs"   value={stats.paragraphs.toLocaleString()} />
        <StatCard label="Unique words" value={stats.uniqueWords.toLocaleString()} />
      </div>

      {/* Time */}
      {hasText && (
        <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
          {[
            { Icon: IcoClock, label: stats.readingTime,  sub: 'at 200 wpm' },
            { Icon: IcoMic,   label: stats.speakingTime, sub: 'at 130 wpm' },
          ].map(({ Icon, label, sub }) => (
            <div key={sub} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-m)' }}>
              <Icon size={14} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{label}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-4)' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Keywords */}
      {keywords.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Top keywords</p>
            <p style={{ fontSize: 11, color: 'var(--ink-4)' }}>stop words excluded</p>
          </div>
          {keywords.map((kw, i) => (
            <div key={kw.word} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
              <span style={{ fontSize: 11, color: 'var(--ink-4)', minWidth: 14, textAlign: 'right' }}>{i + 1}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', minWidth: 90, fontFamily: 'JetBrains Mono, monospace' }}>{kw.word}</span>
              <div style={{ flex: 1, height: 4, background: 'var(--border)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(parseFloat(kw.percent) * 3, 100)}%`, background: i === 0 ? 'var(--green)' : 'var(--border-md)', borderRadius: 99 }} />
              </div>
              <span style={{ fontSize: 12, color: 'var(--ink-3)', minWidth: 60, textAlign: 'right' }}>{kw.count}× · {kw.percent}%</span>
            </div>
          ))}
        </div>
      )}

      {/* Footer stats */}
      {hasText && (
        <div style={{ marginTop: 14, display: 'flex', gap: 20, flexWrap: 'wrap', padding: '10px 14px', background: 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-m)' }}>
          <div>
            <span style={{ fontSize: 11, color: 'var(--ink-4)' }}>Avg word length </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', fontFamily: 'JetBrains Mono, monospace' }}>{stats.avgWordLength} chars</span>
          </div>
          <div style={{ width: 1, background: 'var(--border)' }} />
          <div>
            <span style={{ fontSize: 11, color: 'var(--ink-4)' }}>Unique / total </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', fontFamily: 'JetBrains Mono, monospace' }}>
              {stats.words > 0 ? Math.round((stats.uniqueWords / stats.words) * 100) : 0}% unique
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
