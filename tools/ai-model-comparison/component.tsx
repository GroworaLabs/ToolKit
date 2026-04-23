'use client';
import { useState, useMemo, useEffect } from 'react';

type Provider = 'OpenAI' | 'Anthropic' | 'Google' | 'Meta' | 'Mistral' | 'DeepSeek' | 'xAI';
type Tier     = 'frontier' | 'mid' | 'fast';
type ViewMode = 'cards' | 'table';
type SortKey  = 'inPerM' | 'outPerM' | 'ctxK' | 'name';
type FilterId = 'all' | 'frontier' | 'mid' | 'fast' | 'reasoning' | 'open';

interface Model {
  id: string; provider: Provider; name: string; tier: Tier;
  inPerM: number; outPerM: number; ctxK: number;
  openWeights: boolean; cutoff: string; reasoning: boolean;
  vision: boolean; tools: boolean; thinking: boolean;
  json: boolean; batch: boolean; fineTune: boolean;
  bestFor: string[];
}


const PROVIDER_COLORS: Record<Provider, string> = {
  OpenAI:    '#10a37f',
  Anthropic: '#d4760c',
  Google:    '#4285f4',
  Meta:      '#1877f2',
  Mistral:   '#e05a3a',
  DeepSeek:  '#7c3aed',
  xAI:       '#555',
};

const TIER_META: Record<Tier, { label: string; color: string; bg: string }> = {
  frontier: { label: 'Frontier', color: '#7c3aed', bg: '#ede9fe' },
  mid:      { label: 'Mid',      color: '#0369a1', bg: '#e0f2fe' },
  fast:     { label: 'Fast',     color: '#15803d', bg: '#dcfce7' },
};

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all',       label: 'All models' },
  { id: 'frontier',  label: 'Frontier' },
  { id: 'mid',       label: 'Mid-tier' },
  { id: 'fast',      label: 'Fast / Cheap' },
  { id: 'reasoning', label: 'Reasoning' },
  { id: 'open',      label: 'Open weights' },
];

const SORTS: { id: SortKey; label: string }[] = [
  { id: 'inPerM',  label: 'Input price ↑' },
  { id: 'outPerM', label: 'Output price ↑' },
  { id: 'ctxK',    label: 'Context window ↓' },
  { id: 'name',    label: 'Name A–Z' },
];

function fmtPrice(n: number): string {
  return '$' + (n < 1 ? n.toFixed(2) : n.toFixed(2));
}

function fmtCtx(k: number): string {
  if (k >= 1000) return (k / 1000).toFixed(k % 1000 === 0 ? 0 : 1).replace(/\.0$/, '') + 'M';
  return k + 'K';
}

function CheckOrX({ v }: { v: boolean }) {
  return <span style={{ color: v ? '#16a34a' : '#9ca3af', fontSize: 15, fontWeight: 700 }}>{v ? '✓' : '–'}</span>;
}

function Cap({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <span style={{
      fontSize: 11, padding: '2px 7px', borderRadius: 20,
      background: accent ? 'var(--green-lt)' : 'var(--surface)',
      border: `1px solid ${accent ? 'var(--green)' : 'var(--border)'}`,
      color: accent ? 'var(--green)' : 'var(--ink-2)', fontWeight: accent ? 600 : 400,
    }}>
      {label}
    </span>
  );
}

function CardsView({ models, selected, onToggle }: { models: Model[]; selected: Set<string>; onToggle: (id: string) => void }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 12 }}>
      {models.map(m => {
        const isSel = selected.has(m.id);
        const isOff = !isSel && selected.size >= 3;
        const tier  = TIER_META[m.tier];
        return (
          <div key={m.id}
            onClick={() => !isOff && onToggle(m.id)}
            style={{
              border: `2px solid ${isSel ? 'var(--green)' : 'var(--border)'}`,
              borderRadius: 12, padding: '14px 16px',
              background: isSel ? 'var(--green-lt)' : 'var(--white)',
              cursor: isOff ? 'not-allowed' : 'pointer', opacity: isOff ? 0.45 : 1,
              display: 'flex', flexDirection: 'column', gap: 11,
              transition: 'border-color 0.12s, background 0.12s',
            }}>

            {/* Header row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 5 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: PROVIDER_COLORS[m.provider], flexShrink: 0 }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {m.provider}
                  </span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.25 }}>{m.name}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20, color: tier.color, background: tier.bg }}>
                  {tier.label}
                </span>
                {m.openWeights && (
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20, color: '#0369a1', background: '#e0f2fe' }}>
                    Open
                  </span>
                )}
                {m.reasoning && !m.openWeights && (
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20, color: '#7c3aed', background: '#ede9fe' }}>
                    Reasoning
                  </span>
                )}
              </div>
            </div>

            {/* Price row */}
            <div style={{ display: 'flex', gap: 14 }}>
              <div>
                <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 1 }}>In / 1M</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)', fontFamily: 'JetBrains Mono, monospace' }}>{fmtPrice(m.inPerM)}</div>
              </div>
              <div>
                <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 1 }}>Out / 1M</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)', fontFamily: 'JetBrains Mono, monospace' }}>{fmtPrice(m.outPerM)}</div>
              </div>
              <div>
                <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 1 }}>Context</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)', fontFamily: 'JetBrains Mono, monospace' }}>{fmtCtx(m.ctxK)}</div>
              </div>
            </div>

            {/* Capability pills */}
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {m.vision   && <Cap label="Vision" />}
              {m.tools    && <Cap label="Tools" />}
              {m.thinking && <Cap label="Thinking" accent />}
              {m.batch    && <Cap label="Batch" />}
              {m.fineTune && <Cap label="Fine-tune" />}
            </div>

            {/* Best-for tags */}
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {m.bestFor.slice(0, 4).map(tag => (
                <span key={tag} style={{ fontSize: 11, padding: '2px 7px', borderRadius: 20, background: 'var(--page-bg)', border: '1px solid var(--border)', color: 'var(--ink-2)' }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div style={{ fontSize: 11, color: 'var(--ink-3)', borderTop: '1px solid var(--border)', paddingTop: 8, marginTop: 'auto' }}>
              Knowledge cutoff: {m.cutoff}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TableView({ models, selected, onToggle }: { models: Model[]; selected: Set<string>; onToggle: (id: string) => void }) {
  const COL_HEADS = ['', 'Model', 'Provider', 'Tier', 'In / 1M', 'Out / 1M', 'Context', 'Vision', 'Tools', 'Thinking', 'Batch', 'Open', 'Cutoff'];
  return (
    <div style={{ overflowX: 'auto', borderRadius: 10, border: '1.5px solid var(--border)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: 'var(--surface)' }}>
            {COL_HEADS.map((h, i) => (
              <th key={i} style={{ textAlign: i <= 3 ? 'left' : 'center', padding: '9px 12px', fontWeight: 600, color: 'var(--ink-2)', whiteSpace: 'nowrap', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1.5px solid var(--border)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {models.map((m, i) => {
            const isSel = selected.has(m.id);
            const isOff = !isSel && selected.size >= 3;
            const tier  = TIER_META[m.tier];
            return (
              <tr key={m.id} onClick={() => !isOff && onToggle(m.id)}
                style={{ borderBottom: '1px solid var(--border)', cursor: isOff ? 'not-allowed' : 'pointer',
                  background: isSel ? 'var(--green-lt)' : i % 2 === 0 ? 'var(--white)' : 'var(--surface)',
                  opacity: isOff ? 0.45 : 1 }}>
                <td style={{ padding: '9px 12px', textAlign: 'center' }}>
                  <input type="checkbox" checked={isSel} readOnly style={{ cursor: 'inherit', accentColor: 'var(--green)' }} />
                </td>
                <td style={{ padding: '9px 12px', fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{m.name}</td>
                <td style={{ padding: '9px 12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: PROVIDER_COLORS[m.provider], flexShrink: 0 }} />
                    <span style={{ color: 'var(--ink-2)' }}>{m.provider}</span>
                  </span>
                </td>
                <td style={{ padding: '9px 12px' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20, color: tier.color, background: tier.bg }}>
                    {tier.label}
                  </span>
                </td>
                <td style={{ padding: '9px 12px', fontFamily: 'JetBrains Mono, monospace', whiteSpace: 'nowrap', textAlign: 'center' }}>{fmtPrice(m.inPerM)}</td>
                <td style={{ padding: '9px 12px', fontFamily: 'JetBrains Mono, monospace', whiteSpace: 'nowrap', textAlign: 'center' }}>{fmtPrice(m.outPerM)}</td>
                <td style={{ padding: '9px 12px', fontFamily: 'JetBrains Mono, monospace', whiteSpace: 'nowrap', textAlign: 'center' }}>{fmtCtx(m.ctxK)}</td>
                <td style={{ padding: '9px 12px', textAlign: 'center' }}><CheckOrX v={m.vision} /></td>
                <td style={{ padding: '9px 12px', textAlign: 'center' }}><CheckOrX v={m.tools} /></td>
                <td style={{ padding: '9px 12px', textAlign: 'center' }}><CheckOrX v={m.thinking} /></td>
                <td style={{ padding: '9px 12px', textAlign: 'center' }}><CheckOrX v={m.batch} /></td>
                <td style={{ padding: '9px 12px', textAlign: 'center' }}><CheckOrX v={m.openWeights} /></td>
                <td style={{ padding: '9px 12px', color: 'var(--ink-3)', whiteSpace: 'nowrap', textAlign: 'center' }}>{m.cutoff}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function CompareView({ models, onClose }: { models: Model[]; onClose: () => void }) {
  const minIn  = Math.min(...models.map(m => m.inPerM));
  const minOut = Math.min(...models.map(m => m.outPerM));
  const maxCtx = Math.max(...models.map(m => m.ctxK));

  type RowDef = { label: string; render: (m: Model) => React.ReactNode; best?: (m: Model) => boolean };
  const rows: RowDef[] = [
    { label: 'Provider', render: m => (
      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: PROVIDER_COLORS[m.provider], flexShrink: 0 }} />
        <span style={{ fontWeight: 600 }}>{m.provider}</span>
      </span>
    )},
    { label: 'Tier', render: m => {
      const t = TIER_META[m.tier];
      return <span style={{ fontSize: 12, fontWeight: 600, padding: '2px 8px', borderRadius: 20, color: t.color, background: t.bg }}>{t.label}</span>;
    }},
    {
      label: 'Input / 1M tokens',
      render: m => <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>{fmtPrice(m.inPerM)}</span>,
      best:  m => m.inPerM === minIn,
    },
    {
      label: 'Output / 1M tokens',
      render: m => <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>{fmtPrice(m.outPerM)}</span>,
      best:  m => m.outPerM === minOut,
    },
    {
      label: 'Context window',
      render: m => <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>{fmtCtx(m.ctxK)}</span>,
      best:  m => m.ctxK === maxCtx,
    },
    { label: 'Vision',         render: m => <CheckOrX v={m.vision} /> },
    { label: 'Tool use',       render: m => <CheckOrX v={m.tools} /> },
    { label: 'Thinking / CoT', render: m => <CheckOrX v={m.thinking} /> },
    { label: 'JSON mode',      render: m => <CheckOrX v={m.json} /> },
    { label: 'Batch API',      render: m => <CheckOrX v={m.batch} /> },
    { label: 'Fine-tuning',    render: m => <CheckOrX v={m.fineTune} /> },
    { label: 'Reasoning model',render: m => <CheckOrX v={m.reasoning} /> },
    { label: 'Open weights',   render: m => <CheckOrX v={m.openWeights} /> },
    { label: 'Knowledge cutoff', render: m => <span style={{ color: 'var(--ink-2)' }}>{m.cutoff}</span> },
    { label: 'Best for', render: m => (
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {m.bestFor.map(t => (
          <span key={t} style={{ fontSize: 11, padding: '2px 7px', borderRadius: 20, background: 'var(--page-bg)', border: '1px solid var(--border)', color: 'var(--ink-2)' }}>{t}</span>
        ))}
      </div>
    )},
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>
          Side-by-side comparison — {models.map(m => m.name).join(' vs ')}
        </h3>
        <button onClick={onClose}
          style={{ padding: '6px 14px', borderRadius: 8, border: '1.5px solid var(--border)',
            background: 'var(--white)', color: 'var(--ink-2)', fontSize: 13, cursor: 'pointer' }}>
          ← Back to list
        </button>
      </div>

      <div style={{ overflowX: 'auto', borderRadius: 10, border: '1.5px solid var(--border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--surface)' }}>
              <th style={{ textAlign: 'left', padding: '10px 14px', width: 170, fontWeight: 600, color: 'var(--ink-3)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1.5px solid var(--border)' }}>
                Attribute
              </th>
              {models.map(m => (
                <th key={m.id} style={{ textAlign: 'left', padding: '10px 14px', minWidth: 170, borderBottom: '1.5px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: PROVIDER_COLORS[m.provider], flexShrink: 0 }} />
                    <span style={{ fontWeight: 700, color: 'var(--ink)', fontSize: 14 }}>{m.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'var(--white)' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', color: 'var(--ink-3)', fontWeight: 600, fontSize: 12, whiteSpace: 'nowrap' }}>{row.label}</td>
                {models.map(m => {
                  const isBest = row.best?.(m) ?? false;
                  return (
                    <td key={m.id} style={{ padding: '10px 14px', background: isBest ? 'rgba(22,163,74,0.08)' : undefined }}>
                      {isBest && <span style={{ fontSize: 10, fontWeight: 700, color: '#16a34a', marginRight: 5 }}>★ best</span>}
                      {row.render(m)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AiModelComparison() {
  const [models,    setModels]    = useState<Model[]>([]);
  const [updatedAt, setUpdatedAt] = useState('');
  const [loading,   setLoading]   = useState(true);
  const [filter,    setFilter]    = useState<FilterId>('all');
  const [sort,      setSort]      = useState<SortKey>('inPerM');
  const [view,      setView]      = useState<ViewMode>('cards');
  const [selected,  setSelected]  = useState<Set<string>>(new Set());
  const [comparing, setComparing] = useState(false);

  useEffect(() => {
    fetch('/ai-models.json')
      .then(r => r.json())
      .then(data => { setModels(data.models); setUpdatedAt(data.updatedAt); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    let list = models;
    if (filter === 'frontier')  list = list.filter(m => m.tier === 'frontier');
    else if (filter === 'mid')  list = list.filter(m => m.tier === 'mid');
    else if (filter === 'fast') list = list.filter(m => m.tier === 'fast');
    else if (filter === 'reasoning') list = list.filter(m => m.reasoning);
    else if (filter === 'open') list = list.filter(m => m.openWeights);
    return [...list].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'ctxK') return b.ctxK - a.ctxK;
      return a[sort] - b[sort];
    });
  }, [filter, sort, models]);

  const compareModels = useMemo(() => models.filter(m => selected.has(m.id)), [models, selected]);

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < 3) next.add(id);
      return next;
    });
  };

  const clearAndBack = () => { setComparing(false); setSelected(new Set()); };

  if (loading) return (
    <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--ink-3)', fontSize: 14 }}>
      Loading models…
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Controls */}
      {!comparing && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            {FILTERS.map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)}
                style={{ padding: '5px 13px', borderRadius: 20, fontSize: 13, cursor: 'pointer', border: '1.5px solid',
                  borderColor: filter === f.id ? 'var(--green)' : 'var(--border)',
                  background: filter === f.id ? 'var(--green-lt)' : 'var(--white)',
                  color: filter === f.id ? 'var(--green)' : 'var(--ink-2)',
                  fontWeight: filter === f.id ? 600 : 400 }}>
                {f.label}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            <select value={sort} onChange={e => setSort(e.target.value as SortKey)}
              style={{ padding: '5px 10px', borderRadius: 8, border: '1.5px solid var(--border)',
                background: 'var(--white)', color: 'var(--ink-2)', fontSize: 13, cursor: 'pointer' }}>
              {SORTS.map(s => <option key={s.id} value={s.id}>Sort: {s.label}</option>)}
            </select>
            {(['cards', 'table'] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                style={{ padding: '5px 13px', borderRadius: 8, fontSize: 13, cursor: 'pointer', border: '1.5px solid',
                  borderColor: view === v ? 'var(--green)' : 'var(--border)',
                  background: view === v ? 'var(--green-lt)' : 'var(--white)',
                  color: view === v ? 'var(--green)' : 'var(--ink-2)',
                  fontWeight: view === v ? 600 : 400 }}>
                {v === 'cards' ? '⊞ Cards' : '⊟ Table'}
              </button>
            ))}
          </div>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--ink-3)' }}>
            {filtered.length} model{filtered.length !== 1 ? 's' : ''}
            {' · '}click to select (up to 3) · then hit Compare
            {selected.size > 0 && ` · ${selected.size} selected`}
          </p>
        </div>
      )}

      {/* Main content */}
      {comparing ? (
        <CompareView models={compareModels} onClose={clearAndBack} />
      ) : view === 'cards' ? (
        <CardsView models={filtered} selected={selected} onToggle={toggleSelect} />
      ) : (
        <TableView models={filtered} selected={selected} onToggle={toggleSelect} />
      )}

      {/* Compare bar — sticky at bottom when models are selected */}
      {selected.size > 0 && !comparing && (
        <div style={{
          position: 'sticky', bottom: 16, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
          background: '#18181b', color: '#fff', padding: '10px 16px', borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.35)', zIndex: 10,
        }}>
          <span style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap' }}>
            {selected.size === 1 ? '1 selected — pick 1–2 more' : `${selected.size} models selected`}
          </span>
          <div style={{ display: 'flex', gap: 6, flex: 1, flexWrap: 'wrap' }}>
            {compareModels.map(m => (
              <span key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, background: 'rgba(255,255,255,0.12)', padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.15)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: PROVIDER_COLORS[m.provider] }} />
                {m.name}
                <button onClick={e => { e.stopPropagation(); toggleSelect(m.id); }}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 13, padding: '0 0 0 2px', lineHeight: 1 }}>×</button>
              </span>
            ))}
          </div>
          {selected.size >= 2 && (
            <button onClick={() => setComparing(true)}
              style={{ padding: '8px 18px', borderRadius: 8, background: 'var(--green)', color: '#fff',
                border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Compare →
            </button>
          )}
          <button onClick={() => setSelected(new Set())}
            style={{ padding: '7px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.1)', color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)', fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            Clear
          </button>
        </div>
      )}

      {/* Pricing note */}
      {!comparing && (
        <p style={{ margin: 0, fontSize: 11, color: 'var(--ink-3)', lineHeight: 1.6 }}>
          Prices as of {updatedAt}. Open-weights model pricing shown is typical API rate from Groq/Fireworks/Together; self-hosting is free.
          Always verify against the provider's official pricing page before committing a budget.
        </p>
      )}
    </div>
  );
}
