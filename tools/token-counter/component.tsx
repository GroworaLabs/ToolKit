import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { AI_MODELS, estimateTokens, type AiModel } from '@/lib/ai-pricing';
import { tokenize, composeChatML, hasExactTokenizer, type Token } from '@/lib/tokenizers';

const IcoCopy    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoChevron = ({ open }: { open: boolean }) => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s' }}><polyline points="9 18 15 12 9 6"/></svg>;

const SAMPLE_PLAIN = `You are a senior software engineer. When answering, be terse and cite file:line. Prefer editing existing files to creating new ones. Don't add features beyond what was asked.

Write a Python function that merges two sorted lists into one sorted list, in O(n) time. Include a docstring.`;

const SAMPLE_CHAT = {
  system:    'You are a senior software engineer. Be terse. Cite file:line.',
  user:      'Write a Python function that merges two sorted lists in O(n) time.',
  assistant: '',
};

type Mode = 'plain' | 'chat';

const TOKEN_PALETTE = [
  '#fecaca', '#fed7aa', '#fde68a', '#d9f99d', '#a7f3d0',
  '#a5f3fc', '#bfdbfe', '#c7d2fe', '#ddd6fe', '#f5d0fe',
  '#fbcfe8', '#fecdd3',
];
const TOKEN_PALETTE_DARK = [
  '#7f1d1d', '#7c2d12', '#78350f', '#365314', '#064e3b',
  '#164e63', '#1e3a8a', '#312e81', '#4c1d95', '#701a75',
  '#831843', '#881337',
];

const PROVIDER_COLORS: Record<AiModel['provider'], { fg: string; bg: string }> = {
  OpenAI:    { fg: 'var(--green)', bg: 'var(--green-lt)' },
  Anthropic: { fg: 'var(--amber)', bg: 'var(--amber-lt)' },
  Google:    { fg: 'var(--blue)',  bg: 'var(--blue-lt)'  },
  xAI:       { fg: 'var(--ink-2)', bg: 'var(--border)'   },
  DeepSeek:  { fg: 'var(--ink-2)', bg: 'var(--border)'   },
};

const PANEL_HEIGHT = 380;
const MAX_VIZ_TOKENS = 2000;
const MAX_VIZ_IDS    = 5000;

function formatNum(n: number): string {
  return n.toLocaleString('en-US');
}

function formatWindow(n: number): string {
  if (n >= 1_000_000) return `${n / 1_000_000}M`;
  if (n >= 1_000)     return `${n / 1_000}k`;
  return `${n}`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]!));
}

function renderWhitespace(s: string): string {
  return escapeHtml(s)
    .replace(/ /g, '\u00B7')
    .replace(/\t/g, '\u2192   ')
    .replace(/\n/g, '\u21B5\n');
}

export default function TokenCounterWidget() {
  const [mode,      setMode]      = useState<Mode>('plain');
  const [modelId,   setModelId]   = useState<string>('gpt-5');
  const [plainText, setPlainText] = useState<string>('');
  const [system,    setSystem]    = useState<string>('');
  const [user,      setUser]      = useState<string>('');
  const [assistant, setAssistant] = useState<string>('');
  const [isDark,    setIsDark]    = useState<boolean>(false);
  const [idsOpen,   setIdsOpen]   = useState<boolean>(false);
  const [compareOpen, setCompareOpen] = useState<boolean>(false);
  const [copied,    setCopied]    = useState<string | null>(null);
  const [result,    setResult]    = useState<{ tokens: Token[]; ids: number[]; count: number; isExact: boolean; truncated: boolean } | null>(null);
  const [loading,   setLoading]   = useState<boolean>(false);
  const [hoverIdx,    setHoverIdx]    = useState<number | null>(null);
  const [hoverSource, setHoverSource] = useState<'viz' | 'ids' | null>(null);
  const idsContainerRef = useRef<HTMLDivElement | null>(null);
  const activeIdRef     = useRef<HTMLSpanElement | null>(null);
  const vizContainerRef = useRef<HTMLDivElement | null>(null);
  const activeTokenRef  = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (hoverIdx === null) return;
    const scrollInto = (el: HTMLElement | null, container: HTMLElement | null) => {
      if (!el || !container) return;
      const elRect = el.getBoundingClientRect();
      const cRect  = container.getBoundingClientRect();
      if (elRect.top < cRect.top)         container.scrollTop -= (cRect.top - elRect.top) + 12;
      else if (elRect.bottom > cRect.bottom) container.scrollTop += (elRect.bottom - cRect.bottom) + 12;
    };
    if (hoverSource === 'viz' && idsOpen) scrollInto(activeIdRef.current,    idsContainerRef.current);
    if (hoverSource === 'ids')            scrollInto(activeTokenRef.current, vizContainerRef.current);
  }, [hoverIdx, hoverSource, idsOpen]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const update = () => setIsDark(document.documentElement.classList.contains('dark'));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const rawPlain = plainText || (mode === 'plain' ? SAMPLE_PLAIN : '');
  const rawSys   = system    || (mode === 'chat'  ? SAMPLE_CHAT.system    : '');
  const rawUser  = user      || (mode === 'chat'  ? SAMPLE_CHAT.user      : '');
  const rawAsst  = assistant || (mode === 'chat'  ? SAMPLE_CHAT.assistant : '');
  const isSample = mode === 'plain' ? !plainText : (!system && !user && !assistant);

  const composed = mode === 'chat'
    ? composeChatML(rawSys, rawUser, rawAsst)
    : rawPlain;

  const deferredText    = useDeferredValue(composed);
  const deferredModelId = useDeferredValue(modelId);
  const deferredMode    = useDeferredValue(mode);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    tokenize(deferredText, deferredModelId, deferredMode === 'chat', MAX_VIZ_TOKENS).then(r => {
      if (!cancelled) {
        setResult(r);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [deferredText, deferredModelId, deferredMode]);

  const chars = composed.length;
  const words = useMemo(() => (composed.match(/\S+/g) || []).length, [composed]);
  const activeModel = AI_MODELS.find(m => m.id === modelId) ?? AI_MODELS[0];

  const multiModel = useMemo(() => {
    return AI_MODELS.map(m => ({
      model: m,
      count: hasExactTokenizer(m.tokenizer) && m.id === modelId && result?.isExact
        ? result.count
        : estimateTokens(deferredText, m.tokenizer),
    }));
  }, [deferredText, modelId, result]);

  const copy = (value: string, key: string) => {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1600);
  };

  const palette     = isDark ? TOKEN_PALETTE_DARK : TOKEN_PALETTE;
  const textColor   = isDark ? '#f1f5f9' : '#0f172a';
  const specialFg   = '#fff';
  const specialBg   = '#ef4444';

  const tokens      = result?.tokens ?? [];
  const tokenIds    = result?.ids    ?? [];
  const supportsViz = hasExactTokenizer(activeModel.tokenizer);
  const count       = result?.count ?? 0;
  const isExact     = result?.isExact ?? false;
  const truncated   = result?.truncated ?? false;
  const pct         = (count / activeModel.contextWindow) * 100;
  const activeCol   = PROVIDER_COLORS[activeModel.provider];
  const idsToShow   = Math.min(tokenIds.length, MAX_VIZ_IDS);

  const providerGroups: Record<AiModel['provider'], AiModel[]> = {
    OpenAI: [], Anthropic: [], Google: [], xAI: [], DeepSeek: [],
  };
  AI_MODELS.forEach(m => providerGroups[m.provider].push(m));

  return (
    <div>
      {/* ─── Toolbar ───────────────────────────────── */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center',
        padding: '10px 12px', marginBottom: 14,
        background: 'var(--white)', border: '1.5px solid var(--border)',
        borderRadius: 'var(--r-m)',
      }}>
        <select
          value={modelId}
          onChange={e => setModelId(e.target.value)}
          aria-label="Model"
          style={{
            padding: '7px 10px', fontSize: 13, fontWeight: 700,
            border: '1.5px solid var(--border)', borderRadius: 'var(--r-s)',
            background: 'var(--white)', color: 'var(--ink)', outline: 'none',
            fontFamily: 'inherit', cursor: 'pointer',
          }}
        >
          {(Object.keys(providerGroups) as AiModel['provider'][]).map(prov => (
            providerGroups[prov].length > 0 && (
              <optgroup key={prov} label={prov}>
                {providerGroups[prov].map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </optgroup>
            )
          ))}
        </select>

        <div style={{
          display: 'inline-flex', padding: 2,
          background: 'var(--page-bg)', borderRadius: 'var(--r-s)',
          border: '1px solid var(--border)',
        }}>
          {(['plain', 'chat'] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: '5px 12px', fontSize: 12, fontWeight: 700,
                background: mode === m ? 'var(--white)' : 'transparent',
                color:      mode === m ? 'var(--ink)'   : 'var(--ink-3)',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                borderRadius: 'var(--r-xs, 4px)',
                boxShadow: mode === m ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.12s',
              }}
            >
              {m === 'plain' ? 'Plain' : 'Chat'}
            </button>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
        }}>
          <span style={{ color: 'var(--ink-4)' }}>{formatNum(chars)} chars</span>
          <span style={{ color: 'var(--ink-5, var(--border))' }}>·</span>
          <span style={{ color: 'var(--ink-4)' }}>{formatNum(words)} words</span>
          <span style={{ color: 'var(--ink-5, var(--border))' }}>·</span>
          <span style={{
            padding: '4px 10px', borderRadius: 999,
            background: isExact ? 'var(--green-lt)' : 'var(--amber-lt)',
            color:      isExact ? 'var(--green)'    : 'var(--amber)',
            fontWeight: 800, fontSize: 12,
          }}>
            {isExact ? '' : '~'}{formatNum(count)} tokens
          </span>
        </div>
      </div>

      {/* ─── Main split: editor | visualization ───── */}
      <div className="tk-token-split">
        {/* Editor */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
          background: 'var(--white)', overflow: 'hidden',
          height: PANEL_HEIGHT,
        }}>
          <div style={{
            padding: '8px 12px', borderBottom: '1px solid var(--border)',
            background: 'var(--page-bg)',
            fontSize: 10, fontWeight: 800, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--ink-3)',
          }}>
            {mode === 'plain' ? 'Input' : 'Messages'}
          </div>

          {mode === 'plain' ? (
            <textarea
              value={plainText}
              onChange={e => setPlainText(e.target.value)}
              placeholder="Paste your prompt here…"
              spellCheck={false}
              style={{
                flex: 1, width: '100%', padding: '12px 14px',
                border: 'none', outline: 'none', resize: 'none',
                fontSize: 13, fontFamily: 'JetBrains Mono, monospace',
                color: 'var(--ink)', background: 'var(--white)',
                boxSizing: 'border-box', lineHeight: 1.6,
              }}
            />
          ) : (
            <div style={{ flex: 1, overflowY: 'auto', padding: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'System',    value: system,    set: setSystem,    placeholder: SAMPLE_CHAT.system, minH: 60 },
                { label: 'User',      value: user,      set: setUser,      placeholder: SAMPLE_CHAT.user,   minH: 80 },
                { label: 'Assistant', value: assistant, set: setAssistant, placeholder: '(optional)',      minH: 50 },
              ].map(({ label, value, set, placeholder, minH }) => (
                <div key={label} style={{
                  border: '1px solid var(--border)', borderRadius: 'var(--r-s)',
                  overflow: 'hidden', background: 'var(--white)',
                }}>
                  <div style={{
                    padding: '4px 10px', background: 'var(--page-bg)',
                    borderBottom: '1px solid var(--border)',
                    fontSize: 10, fontWeight: 800, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: 'var(--ink-3)',
                  }}>{label}</div>
                  <textarea
                    value={value}
                    onChange={e => set(e.target.value)}
                    placeholder={placeholder}
                    spellCheck={false}
                    style={{
                      width: '100%', minHeight: minH,
                      padding: '8px 10px', border: 'none', outline: 'none', resize: 'vertical',
                      fontSize: 13, fontFamily: 'JetBrains Mono, monospace',
                      color: 'var(--ink)', background: 'var(--white)',
                      boxSizing: 'border-box', lineHeight: 1.5,
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Visualization */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
          background: 'var(--page-bg)', overflow: 'hidden',
          height: PANEL_HEIGHT,
        }}>
          <div style={{
            padding: '8px 12px', borderBottom: '1px solid var(--border)',
            background: 'var(--white)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
            fontSize: 10, fontWeight: 800, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--ink-3)',
          }}>
            <span>Tokens · {activeModel.name}</span>
            {supportsViz && tokens.length > 0 && (
              <span style={{
                fontSize: 11, fontWeight: 700,
                fontFamily: 'JetBrains Mono, monospace',
                letterSpacing: 0, textTransform: 'none',
                fontVariantNumeric: 'tabular-nums',
                padding: '2px 8px', borderRadius: 999,
                minWidth: 92, height: 20, boxSizing: 'border-box',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: hoverIdx !== null ? 'var(--page-bg)' : 'transparent',
                border: '1px solid',
                borderColor: hoverIdx !== null ? 'var(--border)' : 'transparent',
                color: hoverIdx !== null && tokens[hoverIdx] ? 'var(--ink)' : 'var(--ink-4)',
                transition: 'background 0.1s, border-color 0.1s, color 0.1s',
              }}>
                {hoverIdx !== null && tokens[hoverIdx]
                  ? <>id&nbsp;{tokens[hoverIdx].id}{tokens[hoverIdx].special && <span style={{ color: specialBg, marginLeft: 5 }}>·special</span>}</>
                  : <span style={{ fontSize: 10, letterSpacing: '0.04em' }}>HOVER FOR ID</span>
                }
              </span>
            )}
          </div>

          <div ref={vizContainerRef} style={{
            flex: 1, padding: '12px 14px', overflow: 'auto',
            fontSize: 13, fontFamily: 'JetBrains Mono, monospace',
            lineHeight: 1.9, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
          }}>
            {!supportsViz ? (
              <div style={{ color: 'var(--ink-3)', fontFamily: 'inherit', lineHeight: 1.6 }}>
                <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>
                  Per-token view unavailable for {activeModel.provider}
                </p>
                <p style={{ margin: 0, fontSize: 12 }}>
                  {activeModel.provider} doesn&apos;t publish a client-side tokenizer, so token boundaries
                  can&apos;t be drawn honestly — the count above is a ±5–10% empirical estimate.
                </p>
                <p style={{ margin: '10px 0 0', fontSize: 12 }}>
                  For the visualization, pick an <strong>OpenAI model</strong> (GPT-5 / 4o / o1).
                </p>
              </div>
            ) : loading && tokens.length === 0 ? (
              <div style={{ color: 'var(--ink-3)', fontSize: 12, fontStyle: 'italic' }}>Loading tokenizer…</div>
            ) : tokens.length === 0 ? (
              <div style={{ color: 'var(--ink-4)', fontSize: 12, fontStyle: 'italic' }}>
                {mode === 'chat' ? 'Fill in the fields to see tokens.' : 'Start typing to see tokens.'}
              </div>
            ) : (
              tokens.map((tok, i) => {
                const isHover = hoverIdx === i;
                const onEnter = () => { setHoverIdx(i); setHoverSource('viz'); };
                const onLeave = () => { setHoverIdx(null); setHoverSource(null); };
                if (tok.special) {
                  return (
                    <span
                      key={i}
                      ref={isHover ? activeTokenRef : undefined}
                      title={`id ${tok.id} · special`}
                      onMouseEnter={onEnter}
                      onMouseLeave={onLeave}
                      style={{
                        background: specialBg, color: specialFg,
                        padding: '1px 4px', margin: '0 1px', borderRadius: 3,
                        fontWeight: 700, fontSize: 11, cursor: 'default',
                        outline: isHover ? '2px solid var(--ink)' : 'none',
                        outlineOffset: isHover ? 1 : 0,
                        boxShadow: isHover ? '0 0 0 1px #fff inset' : 'none',
                      }}
                    >
                      {tok.text}
                    </span>
                  );
                }
                const bg = palette[i % palette.length];
                return (
                  <span
                    key={i}
                    ref={isHover ? activeTokenRef : undefined}
                    title={`id ${tok.id}`}
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                    style={{
                      background: bg, color: textColor,
                      padding: '1px 0', margin: '0 0.5px', borderRadius: 2,
                      cursor: 'default',
                      outline: isHover ? '2px solid var(--ink)' : 'none',
                      outlineOffset: isHover ? 1 : 0,
                    }}
                    dangerouslySetInnerHTML={{ __html: renderWhitespace(tok.text) }}
                  />
                );
              })
            )}
            {truncated && (
              <div style={{
                marginTop: 12, padding: '8px 10px',
                border: '1px dashed var(--border)', borderRadius: 'var(--r-s)',
                background: 'var(--white)',
                fontFamily: 'inherit', fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5,
              }}>
                Showing first <strong style={{ color: 'var(--ink)' }}>{formatNum(MAX_VIZ_TOKENS)}</strong> of <strong style={{ color: 'var(--ink)' }}>{formatNum(count)}</strong> tokens.
                The total count above is exact — visualization is capped to keep the page responsive on huge inputs.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Context usage bar (subtle) ─────────── */}
      <div style={{
        marginTop: 14, display: 'flex', alignItems: 'center', gap: 12,
        padding: '8px 12px',
        background: 'var(--white)', border: '1px solid var(--border)',
        borderRadius: 'var(--r-m)',
      }}>
        <span style={{
          fontSize: 11, fontWeight: 700, color: 'var(--ink-3)',
          fontFamily: 'JetBrains Mono, monospace', whiteSpace: 'nowrap',
        }}>
          {isExact ? '' : '~'}{formatNum(count)} / {formatWindow(activeModel.contextWindow)}
        </span>
        <div style={{ flex: 1, height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${Math.min(100, pct)}%`,
            background: pct > 100 ? 'var(--red)' : activeCol.fg,
            transition: 'width 0.2s',
          }}/>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 700, color: 'var(--ink-4)',
          fontFamily: 'JetBrains Mono, monospace', minWidth: 48, textAlign: 'right',
        }}>
          {pct < 0.01 ? '<0.01' : pct.toFixed(pct < 1 ? 2 : 1)}%
        </span>
      </div>

      {isSample && (
        <p style={{ fontSize: 12, color: 'var(--ink-4)', margin: '10px 2px 0', fontStyle: 'italic' }}>
          Showing a sample {mode === 'chat' ? 'chat' : 'prompt'} — edit above to tokenize your own.
        </p>
      )}

      {/* ─── Collapsible: Token IDs ─────────────── */}
      {supportsViz && tokens.length > 0 && (
        <div style={{
          marginTop: 10, background: 'var(--white)',
          border: '1px solid var(--border)', borderRadius: 'var(--r-m)',
          overflow: 'hidden',
        }}>
          <div
            onClick={() => setIdsOpen(v => !v)}
            style={{
              padding: '10px 14px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              fontSize: 12, fontWeight: 700, letterSpacing: '0.04em',
              textTransform: 'uppercase', color: 'var(--ink-3)',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <IcoChevron open={idsOpen} />
              Token IDs <span style={{ color: 'var(--ink-4)', fontWeight: 600 }}>({formatNum(count)})</span>
            </span>
            <button
              onClick={e => { e.stopPropagation(); copy(JSON.stringify(tokenIds), 'ids'); }}
              title="Copy IDs as JSON array"
              style={{
                height: 30, padding: '0 14px',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                fontSize: 12, fontWeight: 700, letterSpacing: '0.02em',
                fontFamily: 'inherit', cursor: 'pointer',
                border: '1.5px solid',
                borderColor: copied === 'ids' ? 'var(--green)'   : 'var(--border)',
                background:  copied === 'ids' ? 'var(--green)'   : 'var(--white)',
                color:       copied === 'ids' ? 'var(--white)'   : 'var(--ink-2)',
                borderRadius: 'var(--r-s)',
                transition: 'all 0.13s',
              }}
              onMouseEnter={e => {
                if (copied === 'ids') return;
                e.currentTarget.style.borderColor = 'var(--green)';
                e.currentTarget.style.color       = 'var(--green)';
                e.currentTarget.style.background  = 'var(--green-lt)';
              }}
              onMouseLeave={e => {
                if (copied === 'ids') return;
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color       = 'var(--ink-2)';
                e.currentTarget.style.background  = 'var(--white)';
              }}
            >
              {copied === 'ids' ? <IcoCheck /> : <IcoCopy />}
              <span>{copied === 'ids' ? 'Copied' : 'Copy JSON'}</span>
            </button>
          </div>
          {idsOpen && (
            <div
              ref={idsContainerRef}
              style={{
                padding: '10px 14px',
                borderTop: '1px solid var(--border)',
                background: 'var(--page-bg)',
                fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
                color: 'var(--ink-3)', maxHeight: 180, overflow: 'auto',
                wordBreak: 'break-all', lineHeight: 1.8,
              }}
            >
              <span style={{ color: 'var(--ink-4)' }}>[ </span>
              {tokenIds.slice(0, idsToShow).map((id, i) => {
                const isHover = hoverIdx === i;
                return (
                  <span key={i}>
                    <span
                      ref={isHover ? activeIdRef : undefined}
                      onMouseEnter={() => { setHoverIdx(i); setHoverSource('ids'); }}
                      onMouseLeave={() => { setHoverIdx(null); setHoverSource(null); }}
                      style={{
                        padding: '1px 4px', borderRadius: 3,
                        background: isHover ? 'var(--ink)'  : 'transparent',
                        color:      isHover ? 'var(--white)' : 'var(--ink-2)',
                        fontWeight: isHover ? 700 : 500,
                        cursor: 'default',
                        transition: 'background 0.1s, color 0.1s',
                      }}
                    >{id}</span>
                    {i < idsToShow - 1 && <span style={{ color: 'var(--ink-4)' }}>, </span>}
                  </span>
                );
              })}
              {tokenIds.length > idsToShow && (
                <span style={{ color: 'var(--ink-4)' }}>, <em style={{ fontStyle: 'normal', color: 'var(--ink-3)' }}>…+{formatNum(tokenIds.length - idsToShow)} more</em></span>
              )}
              <span style={{ color: 'var(--ink-4)' }}> ]</span>
            </div>
          )}
        </div>
      )}

      {/* ─── Collapsible: model comparison ──────── */}
      <div style={{
        marginTop: 10, background: 'var(--white)',
        border: '1px solid var(--border)', borderRadius: 'var(--r-m)',
        overflow: 'hidden',
      }}>
        <div
          onClick={() => setCompareOpen(v => !v)}
          style={{
            padding: '10px 14px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontSize: 12, fontWeight: 700, letterSpacing: '0.04em',
            textTransform: 'uppercase', color: 'var(--ink-3)',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <IcoChevron open={compareOpen} />
            Compare across models
          </span>
          <span style={{ fontSize: 11, color: 'var(--ink-4)', fontWeight: 600, textTransform: 'none', letterSpacing: 0 }}>
            click a row to switch
          </span>
        </div>
        {compareOpen && (
          <div style={{ borderTop: '1px solid var(--border)' }}>
            {multiModel.map(({ model, count: c }, i) => {
              const col      = PROVIDER_COLORS[model.provider];
              const barPct   = Math.min(100, (c / model.contextWindow) * 100);
              const exact    = hasExactTokenizer(model.tokenizer);
              const isActive = model.id === modelId;
              return (
                <button
                  key={model.id}
                  onClick={() => setModelId(model.id)}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 11px',
                    borderBottom: i < multiModel.length - 1 ? '1px solid var(--border)' : 'none',
                    borderLeft: `3px solid ${isActive ? col.fg : 'transparent'}`,
                    background: isActive ? 'var(--page-bg)' : 'var(--white)',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1.6fr) minmax(70px, 0.6fr) minmax(0, 1.2fr)',
                    gap: 12, alignItems: 'center', cursor: 'pointer',
                    border: 'none', borderLeftWidth: 3, borderLeftStyle: 'solid',
                    borderLeftColor: isActive ? col.fg : 'transparent',
                    textAlign: 'left', fontFamily: 'inherit',
                  }}
                >
                  <div style={{ minWidth: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: col.fg, flexShrink: 0,
                    }} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{model.name}</div>
                      <div style={{ fontSize: 10, color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                        {model.provider}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    fontSize: 14, fontWeight: 700, color: 'var(--ink)',
                    fontFamily: 'JetBrains Mono, monospace', textAlign: 'right',
                    whiteSpace: 'nowrap',
                  }}>
                    {exact ? '' : '~'}{formatNum(c)}
                  </div>
                  <div>
                    <div style={{ height: 5, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${barPct}%`, background: col.fg }}/>
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--ink-4)', fontFamily: 'JetBrains Mono, monospace', marginTop: 3 }}>
                      of {formatWindow(model.contextWindow)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── Disclaimer ─────────────────────────── */}
      <p style={{ fontSize: 12, color: 'var(--ink-4)', margin: '14px 2px 0', lineHeight: 1.6 }}>
        <strong style={{ color: 'var(--green)' }}>Exact counts</strong> for OpenAI (tiktoken runs locally). <strong style={{ color: 'var(--amber)' }}>~Estimates</strong> for Anthropic, Google, DeepSeek —
        no public tokenizer, typically ±5–10% off. Nothing leaves your browser.
      </p>
    </div>
  );
}
