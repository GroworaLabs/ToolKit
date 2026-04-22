import { useEffect, useMemo, useRef, useState } from 'react';
import { AI_MODELS, computeCost, PRICING_UPDATED, type AiModel } from '@/lib/ai-pricing';

type Mode = 'standard' | 'cached' | 'batch';

interface ModeOption {
  value: Mode;
  label: string;
  hint:  string;
  badge: string | null;
  badgeColor: string;
  badgeBg:    string;
}

const MODE_OPTIONS: ModeOption[] = [
  { value: 'standard', label: 'Standard',          hint: 'List API prices',                badge: null,        badgeColor: 'var(--ink-3)', badgeBg: 'var(--border)'   },
  { value: 'cached',   label: 'Prompt cache hit',  hint: 'Cached input rate (when supported)', badge: 'up to −90%', badgeColor: 'var(--green)', badgeBg: 'var(--green-lt)' },
  { value: 'batch',    label: 'Batch API',         hint: '24 h turnaround on supported tiers', badge: '−50%',       badgeColor: 'var(--amber)', badgeBg: 'var(--amber-lt)' },
];

function ModeDropdown({ value, onChange }: { value: Mode; onChange: (v: Mode) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const current = MODE_OPTIONS.find(o => o.value === value) ?? MODE_OPTIONS[0];

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', padding: '9px 10px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
          fontSize: 13, fontWeight: 700, color: 'var(--ink)',
          background: 'var(--white)',
          border: '1.5px solid', borderColor: open ? 'var(--green)' : 'var(--border)',
          borderRadius: 'var(--r-s)', cursor: 'pointer',
          fontFamily: 'inherit', textAlign: 'left',
          transition: 'border-color 0.12s',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{current.label}</span>
          {current.badge && (
            <span style={{
              fontSize: 10, fontWeight: 800, letterSpacing: '0.04em',
              padding: '2px 6px', borderRadius: 4,
              background: current.badgeBg, color: current.badgeColor,
              fontFamily: 'JetBrains Mono, monospace', whiteSpace: 'nowrap',
            }}>
              {current.badge}
            </span>
          )}
        </span>
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: 'var(--ink-3)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', flexShrink: 0 }}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <div
          role="listbox"
          style={{
            position: 'absolute', zIndex: 20, top: 'calc(100% + 4px)', left: 0, right: 0,
            background: 'var(--white)',
            border: '1.5px solid var(--border)',
            borderRadius: 'var(--r-s)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)',
            overflow: 'hidden', padding: 4,
          }}
        >
          {MODE_OPTIONS.map(opt => {
            const active = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'var(--page-bg)'; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                style={{
                  width: '100%', padding: '9px 10px',
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: active ? 'var(--green-lt)' : 'transparent',
                  border: 'none', borderRadius: 'var(--r-xs, 4px)',
                  cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                  transition: 'background 0.1s',
                }}
              >
                <span style={{
                  width: 14, height: 14, flexShrink: 0,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: active ? 'var(--green)' : 'transparent',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{opt.label}</span>
                    {opt.badge && (
                      <span style={{
                        fontSize: 10, fontWeight: 800, letterSpacing: '0.04em',
                        padding: '1px 6px', borderRadius: 4,
                        background: opt.badgeBg, color: opt.badgeColor,
                        fontFamily: 'JetBrains Mono, monospace',
                      }}>
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2, lineHeight: 1.4 }}>
                    {opt.hint}
                  </div>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface Preset {
  id:           string;
  label:        string;
  desc:         string;
  inputTokens:  number;
  outputTokens: number;
  callsPerDay:  number;
}

const PRESETS: Preset[] = [
  { id: 'chatbot',    label: 'Customer chatbot',  desc: 'Short Q&A, ~6-message context, concise replies.',     inputTokens:  1_500, outputTokens:   400, callsPerDay:  5_000 },
  { id: 'summarizer', label: 'Article summarizer',desc: 'Long-form input, short structured summary.',          inputTokens:  6_000, outputTokens:   500, callsPerDay:    500 },
  { id: 'rag',        label: 'RAG assistant',     desc: 'System prompt + 8 retrieved chunks + answer.',        inputTokens:  8_000, outputTokens:   600, callsPerDay:  2_000 },
  { id: 'codegen',    label: 'Code copilot',      desc: 'File context in, multi-line code out.',               inputTokens:  4_000, outputTokens: 1_200, callsPerDay: 10_000 },
  { id: 'batch',      label: 'Nightly batch',     desc: '10k docs/night, classification-style outputs.',       inputTokens:  3_000, outputTokens:   200, callsPerDay: 10_000 },
  { id: 'agent',      label: 'Long agent loop',   desc: 'Big tool-call traces, frontier model reasoning.',     inputTokens: 30_000, outputTokens: 4_000, callsPerDay:    200 },
];

const PROVIDER_COLORS: Record<AiModel['provider'], { fg: string; bg: string }> = {
  OpenAI:    { fg: 'var(--green)', bg: 'var(--green-lt)' },
  Anthropic: { fg: 'var(--amber)', bg: 'var(--amber-lt)' },
  Google:    { fg: 'var(--blue)',  bg: 'var(--blue-lt)'  },
  xAI:       { fg: 'var(--ink-2)', bg: 'var(--border)'   },
  DeepSeek:  { fg: 'var(--ink-2)', bg: 'var(--border)'   },
};

const TIER_LABEL: Record<AiModel['tier'], string> = {
  frontier: 'Frontier',
  mid:      'Mid',
  fast:     'Fast',
};

function formatNum(n: number): string {
  return n.toLocaleString('en-US');
}

function formatMoney(n: number, digits = 2): string {
  if (!isFinite(n)) return '$0';
  if (n >= 100_000) return `$${Math.round(n).toLocaleString('en-US')}`;
  if (n >= 1_000)   return `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  if (n >= 1)       return `$${n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
  if (n >= 0.01)    return `$${n.toFixed(3)}`;
  if (n > 0)        return `$${n.toFixed(5)}`;
  return '$0';
}

function NumberField({ label, suffix, value, onChange, step = 1 }: {
  label:    string;
  suffix?:  string;
  value:    number;
  onChange: (n: number) => void;
  step?:    number;
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
      <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{label}</span>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 0,
        border: '1.5px solid var(--border)', borderRadius: 'var(--r-s)',
        background: 'var(--white)', overflow: 'hidden',
      }}>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={e => onChange(Math.max(0, Number(e.target.value) || 0))}
          style={{
            flex: 1, minWidth: 0,
            padding: '9px 10px', border: 'none', outline: 'none',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 700,
            color: 'var(--ink)', background: 'transparent',
          }}
        />
        {suffix && (
          <span style={{
            padding: '0 10px', fontSize: 11, fontWeight: 700,
            color: 'var(--ink-4)', background: 'var(--page-bg)',
            borderLeft: '1px solid var(--border)', height: '100%',
            display: 'inline-flex', alignItems: 'center',
          }}>
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

export default function AiCostCalculatorWidget() {
  const [presetId,     setPresetId]     = useState<string>('chatbot');
  const [inputTokens,  setInputTokens]  = useState<number>(PRESETS[0].inputTokens);
  const [outputTokens, setOutputTokens] = useState<number>(PRESETS[0].outputTokens);
  const [callsPerDay,  setCallsPerDay]  = useState<number>(PRESETS[0].callsPerDay);
  const [mode,         setMode]         = useState<Mode>('standard');
  const [primaryId,    setPrimaryId]    = useState<string>('claude-sonnet-4-6');

  const applyPreset = (id: string) => {
    const p = PRESETS.find(p => p.id === id);
    if (!p) return;
    setPresetId(id);
    setInputTokens(p.inputTokens);
    setOutputTokens(p.outputTokens);
    setCallsPerDay(p.callsPerDay);
  };

  const callsPerMonth   = callsPerDay * 30;
  const inputPerMonth   = inputTokens  * callsPerMonth;
  const outputPerMonth  = outputTokens * callsPerMonth;

  const rows = useMemo(() => {
    return AI_MODELS.map(model => {
      const perCall  = computeCost(model, inputTokens,    outputTokens,    mode);
      const perMonth = computeCost(model, inputPerMonth,  outputPerMonth,  mode);
      return { model, perCall, perMonth };
    }).sort((a, b) => a.perMonth.total - b.perMonth.total);
  }, [inputTokens, outputTokens, inputPerMonth, outputPerMonth, mode]);

  const cheapest = rows[0]?.perMonth.total ?? 0;
  const maxMonth = rows.reduce((m, r) => Math.max(m, r.perMonth.total), 0);
  const primary  = rows.find(r => r.model.id === primaryId) ?? rows[0];

  const primaryRate = useMemo(() => {
    const p = primary.model.pricing;
    if (mode === 'cached') return { i: p.cachedInputPerM ?? p.inputPerM, o: p.outputPerM };
    if (mode === 'batch')  return { i: p.batchInputPerM  ?? p.inputPerM, o: p.batchOutputPerM ?? p.outputPerM };
    return { i: p.inputPerM, o: p.outputPerM };
  }, [primary, mode]);

  return (
    <div>
      {/* ─── Inputs row ─────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(170px, 100%), 1fr))',
        gap: 12, padding: 14, marginBottom: 12,
        background: 'var(--white)', border: '1.5px solid var(--border)',
        borderRadius: 'var(--r-m)',
      }}>
        <NumberField label="Input tokens / call"  suffix="tok"  value={inputTokens}  onChange={setInputTokens}  step={100} />
        <NumberField label="Output tokens / call" suffix="tok"  value={outputTokens} onChange={setOutputTokens} step={100} />
        <NumberField label="Calls per day"        suffix="/day" value={callsPerDay}  onChange={setCallsPerDay}  step={100} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>Pricing mode</span>
          <ModeDropdown value={mode} onChange={setMode} />
        </div>
      </div>

      {/* ─── Presets ───────────────────────────── */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14,
      }}>
        {PRESETS.map(p => {
          const active = presetId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => applyPreset(p.id)}
              title={p.desc}
              style={{
                padding: '6px 12px', fontSize: 12, fontWeight: 700,
                border: '1.5px solid',
                borderColor: active ? 'var(--green)'   : 'var(--border)',
                background:  active ? 'var(--green-lt)' : 'var(--white)',
                color:       active ? 'var(--green)'   : 'var(--ink-2)',
                borderRadius: 999, cursor: 'pointer',
                fontFamily: 'inherit', transition: 'all 0.12s',
              }}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* ─── Volume summary strip ──────────────── */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 18, alignItems: 'center',
        padding: '10px 14px', marginBottom: 12,
        background: 'var(--page-bg)', border: '1px solid var(--border)',
        borderRadius: 'var(--r-m)',
        fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-3)',
      }}>
        <span><strong style={{ color: 'var(--ink)' }}>{formatNum(callsPerMonth)}</strong> calls/mo</span>
        <span style={{ color: 'var(--border)' }}>·</span>
        <span><strong style={{ color: 'var(--ink)' }}>{formatNum(inputPerMonth)}</strong> input tok/mo</span>
        <span style={{ color: 'var(--border)' }}>·</span>
        <span><strong style={{ color: 'var(--ink)' }}>{formatNum(outputPerMonth)}</strong> output tok/mo</span>
        <span style={{ flex: 1 }} />
        <span style={{ fontFamily: 'inherit', fontSize: 11, color: 'var(--ink-4)' }}>
          Pricing as of {PRICING_UPDATED}
        </span>
      </div>

      {/* ─── Primary headline card ─────────────── */}
      <div style={{
        padding: '16px 18px', marginBottom: 14,
        background: 'var(--white)', border: '1.5px solid var(--border)',
        borderRadius: 'var(--r-m)',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) auto',
        gap: 16, alignItems: 'center',
      }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: 6 }}>
            Selected model
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
            <span style={{
              width: 10, height: 10, borderRadius: '50%',
              background: PROVIDER_COLORS[primary.model.provider].fg,
            }} />
            <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink)' }}>{primary.model.name}</span>
            <span style={{
              fontSize: 10, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase',
              padding: '2px 7px', borderRadius: 4,
              background: PROVIDER_COLORS[primary.model.provider].bg,
              color:      PROVIDER_COLORS[primary.model.provider].fg,
            }}>
              {primary.model.provider} · {TIER_LABEL[primary.model.tier]}
            </span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'JetBrains Mono, monospace' }}>
            ${primaryRate.i.toFixed(primaryRate.i < 1 ? 3 : 2)} in · ${primaryRate.o.toFixed(primaryRate.o < 1 ? 3 : 2)} out · per 1M tokens
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: 4 }}>
            Per month
          </div>
          <div style={{
            fontSize: 30, fontWeight: 900, color: 'var(--ink)',
            fontFamily: 'JetBrains Mono, monospace', lineHeight: 1,
          }}>
            {formatMoney(primary.perMonth.total)}
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'JetBrains Mono, monospace', marginTop: 6 }}>
            {formatMoney(primary.perCall.total, 4)} / call
          </div>
        </div>
      </div>

      {/* ─── Comparison table ──────────────────── */}
      <div style={{
        background: 'var(--white)', border: '1.5px solid var(--border)',
        borderRadius: 'var(--r-m)', overflow: 'hidden',
      }}>
        <div style={{
          padding: '10px 14px', borderBottom: '1px solid var(--border)',
          background: 'var(--page-bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)',
        }}>
          <span>Compare across {AI_MODELS.length} models</span>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0, textTransform: 'none', color: 'var(--ink-4)' }}>
            sorted cheapest first · click to select
          </span>
        </div>
        <div role="table">
          {rows.map(({ model, perCall, perMonth }, i) => {
            const col      = PROVIDER_COLORS[model.provider];
            const isActive = model.id === primaryId;
            const barPct   = maxMonth > 0 ? (perMonth.total / maxMonth) * 100 : 0;
            const vsBest   = cheapest > 0 ? perMonth.total / cheapest : 1;
            return (
              <button
                key={model.id}
                onClick={() => setPrimaryId(model.id)}
                role="row"
                className="tk-cost-row"
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 11px',
                  borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none',
                  background: isActive ? 'var(--page-bg)' : 'var(--white)',
                  cursor: 'pointer',
                  border: 'none', borderLeftWidth: 3, borderLeftStyle: 'solid',
                  borderLeftColor: isActive ? col.fg : 'transparent',
                  textAlign: 'left', fontFamily: 'inherit',
                }}
              >
                <div className="tk-cost-model" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: col.fg, flexShrink: 0 }} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.25, wordBreak: 'break-word' }}>
                      {model.name}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--ink-4)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: 2 }}>
                      {model.provider} · {TIER_LABEL[model.tier]}
                    </div>
                  </div>
                </div>
                <div className="tk-cost-call" style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', fontFamily: 'JetBrains Mono, monospace', whiteSpace: 'nowrap' }}>
                  {formatMoney(perCall.total, 4)}
                  <div style={{ fontSize: 10, color: 'var(--ink-4)', fontWeight: 500, marginTop: 2 }}>per call</div>
                </div>
                <div className="tk-cost-month" style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', fontFamily: 'JetBrains Mono, monospace', whiteSpace: 'nowrap' }}>
                  {formatMoney(perMonth.total)}
                  <div style={{ fontSize: 10, color: i === 0 ? 'var(--green)' : 'var(--ink-4)', fontWeight: 700, marginTop: 2 }}>
                    {i === 0 ? 'cheapest' : `${vsBest.toFixed(vsBest >= 10 ? 0 : 1)}× cheapest`}
                  </div>
                </div>
                <div className="tk-cost-bar">
                  <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${barPct}%`, background: col.fg, transition: 'width 0.2s' }} />
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--ink-4)', fontFamily: 'JetBrains Mono, monospace', marginTop: 4 }}>
                    {formatNum(model.contextWindow / 1000)}k ctx
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Footnote ──────────────────────────── */}
      <p style={{ fontSize: 12, color: 'var(--ink-4)', margin: '14px 2px 0', lineHeight: 1.6 }}>
        Estimates based on published list prices. Real bills depend on cache hit rate, batch usage, image/audio
        modalities, and tier discounts. Switch <strong style={{ color: 'var(--ink)' }}>Pricing mode</strong> to see
        the impact of <strong style={{ color: 'var(--ink)' }}>prompt caching</strong> (up to 90% off input on cache hits)
        and the <strong style={{ color: 'var(--ink)' }}>Batch API</strong> (50% off both directions for 24h-tolerant workloads).
        Nothing leaves your browser.
      </p>
    </div>
  );
}
