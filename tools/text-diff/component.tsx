import { useState, useMemo, useCallback } from 'react';

const IcoCopy  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

/* ── LCS-based line diff ────────────────────────────────── */
type DiffLine =
  | { type: 'equal';  value: string; aLine: number; bLine: number }
  | { type: 'delete'; value: string; aLine: number; bLine: null  }
  | { type: 'insert'; value: string; aLine: null;   bLine: number };

function computeDiff(a: string[], b: string[], normA: string[], normB: string[]): DiffLine[] {
  const n = a.length, m = b.length;

  // Build LCS table
  const dp: Uint16Array[] = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      dp[i][j] = normA[i - 1] === normB[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  // Backtrack
  const result: DiffLine[] = [];
  let i = n, j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && normA[i - 1] === normB[j - 1]) {
      result.unshift({ type: 'equal',  value: a[i - 1], aLine: i, bLine: j });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: 'insert', value: b[j - 1], aLine: null, bLine: j });
      j--;
    } else {
      result.unshift({ type: 'delete', value: a[i - 1], aLine: i, bLine: null });
      i--;
    }
  }
  return result;
}

function normalise(line: string, ignoreWs: boolean, ignoreCase: boolean): string {
  let s = line;
  if (ignoreWs)   s = s.trim().replace(/\s+/g, ' ');
  if (ignoreCase) s = s.toLowerCase();
  return s;
}

/* ── Styles ─────────────────────────────────────────────── */
const taBase: React.CSSProperties = {
  width: '100%', padding: '10px 12px', resize: 'vertical', outline: 'none',
  border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
  font: '13px/1.6 JetBrains Mono, monospace',
  color: 'var(--ink)', background: 'var(--page-bg)',
  transition: 'border-color .15s', boxSizing: 'border-box',
  minHeight: 160,
};

const lineNoStyle: React.CSSProperties = {
  display: 'inline-block', minWidth: 36, paddingRight: 10,
  textAlign: 'right', color: 'var(--ink-4)', userSelect: 'none',
  fontSize: 11, flexShrink: 0,
};

const TOGGLE_BTN = (active: boolean): React.CSSProperties => ({
  padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
  border: `1.5px solid ${active ? 'var(--green)' : 'var(--border)'}`,
  borderRadius: 'var(--r-s)',
  background: active ? 'var(--green-lt)' : 'var(--white)',
  color: active ? 'var(--green)' : 'var(--ink-3)',
  transition: 'all .14s',
});

const MAX_LINES = 5000;

/* ── Component ───────────────────────────────────────────── */
export default function TextDiffWidget() {
  const [original,    setOriginal]    = useState('');
  const [modified,    setModified]    = useState('');
  const [ignoreWs,    setIgnoreWs]    = useState(false);
  const [ignoreCase,  setIgnoreCase]  = useState(false);
  const [viewMode,    setViewMode]    = useState<'unified' | 'split'>('unified');
  const [copied,      setCopied]      = useState(false);
  const [showUnchanged, setShowUnchanged] = useState(true);

  const diff = useMemo<DiffLine[] | null>(() => {
    if (!original.trim() && !modified.trim()) return null;
    const aLines = original.split('\n');
    const bLines = modified.split('\n');
    if (aLines.length > MAX_LINES || bLines.length > MAX_LINES) return null;
    const normA = aLines.map(l => normalise(l, ignoreWs, ignoreCase));
    const normB = bLines.map(l => normalise(l, ignoreWs, ignoreCase));
    return computeDiff(aLines, bLines, normA, normB);
  }, [original, modified, ignoreWs, ignoreCase]);

  const stats = useMemo(() => {
    if (!diff) return { added: 0, removed: 0, unchanged: 0 };
    return diff.reduce(
      (acc, d) => {
        if (d.type === 'insert') acc.added++;
        else if (d.type === 'delete') acc.removed++;
        else acc.unchanged++;
        return acc;
      },
      { added: 0, removed: 0, unchanged: 0 }
    );
  }, [diff]);

  const diffText = useMemo(() => {
    if (!diff) return '';
    return diff
      .map(d => (d.type === 'delete' ? '- ' : d.type === 'insert' ? '+ ' : '  ') + d.value)
      .join('\n');
  }, [diff]);

  const copyDiff = useCallback(() => {
    if (!diffText) return;
    navigator.clipboard.writeText(diffText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }, [diffText]);

  const hasDiff  = diff !== null;
  const hasChanges = stats.added > 0 || stats.removed > 0;
  const tooLarge = !diff && (original.split('\n').length > MAX_LINES || modified.split('\n').length > MAX_LINES);

  /* filtered lines for unified view */
  const visibleLines = useMemo(() => {
    if (!diff) return [];
    if (showUnchanged) return diff;
    // Show changed lines + 2 context lines around them
    const changed = new Set<number>();
    diff.forEach((d, i) => { if (d.type !== 'equal') { for (let k = Math.max(0, i - 2); k <= Math.min(diff.length - 1, i + 2); k++) changed.add(k); } });
    const result: (DiffLine | { type: 'separator' })[] = [];
    let lastWasHidden = false;
    diff.forEach((d, i) => {
      if (changed.has(i)) { result.push(d); lastWasHidden = false; }
      else if (!lastWasHidden) { result.push({ type: 'separator' }); lastWasHidden = true; }
    });
    return result;
  }, [diff, showUnchanged]);

  /* split view: pair delete+insert lines */
  const splitLines = useMemo(() => {
    if (!diff) return [];
    type SplitRow =
      | { kind: 'equal';  value: string; aLine: number; bLine: number }
      | { kind: 'change'; aValue: string | null; bValue: string | null; aLine: number | null; bLine: number | null }
      | { kind: 'separator' };

    const rows: SplitRow[] = [];
    let i = 0;
    while (i < diff.length) {
      const d = diff[i];
      if (d.type === 'equal') {
        if (!showUnchanged && i > 0 && diff[i - 1].type !== 'equal') {
          rows.push({ kind: 'separator' });
        }
        if (showUnchanged) {
          rows.push({ kind: 'equal', value: d.value, aLine: d.aLine, bLine: d.bLine });
        }
        i++;
      } else if (d.type === 'delete') {
        // Pair with following inserts
        const dels: DiffLine[] = [];
        const ins: DiffLine[]  = [];
        while (i < diff.length && diff[i].type === 'delete') { dels.push(diff[i]); i++; }
        while (i < diff.length && diff[i].type === 'insert') { ins.push(diff[i]);  i++; }
        const maxLen = Math.max(dels.length, ins.length);
        for (let k = 0; k < maxLen; k++) {
          const del = dels[k];
          const ins_ = ins[k];
          rows.push({
            kind: 'change',
            aValue: del  ? del.value   : null, aLine: del  ? del.aLine  : null,
            bValue: ins_ ? ins_.value  : null, bLine: ins_ ? ins_.bLine : null,
          });
        }
      } else {
        // Standalone insert (shouldn't happen after pairing, but be safe)
        rows.push({ kind: 'change', aValue: null, aLine: null, bValue: d.value, bLine: d.bLine });
        i++;
      }
    }
    return rows;
  }, [diff, showUnchanged]);

  return (
    <div>
      {/* ── Options ─────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          <button onClick={() => setViewMode('unified')} style={TOGGLE_BTN(viewMode === 'unified')}>Unified</button>
          <button onClick={() => setViewMode('split')}   style={TOGGLE_BTN(viewMode === 'split')}>Split</button>
        </div>
        <div style={{ display: 'flex', gap: 4, marginLeft: 8 }}>
          <button onClick={() => setIgnoreWs(v => !v)}   style={TOGGLE_BTN(ignoreWs)}>Ignore whitespace</button>
          <button onClick={() => setIgnoreCase(v => !v)} style={TOGGLE_BTN(ignoreCase)}>Ignore case</button>
        </div>
        {hasDiff && hasChanges && (
          <button onClick={() => setShowUnchanged(v => !v)} style={{ ...TOGGLE_BTN(showUnchanged), marginLeft: 'auto' }}>
            {showUnchanged ? 'Hide unchanged' : 'Show unchanged'}
          </button>
        )}
      </div>

      {/* ── Inputs ──────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 6 }}>Original</label>
          <textarea
            value={original}
            onChange={e => setOriginal(e.target.value)}
            placeholder={"Paste original text here…"}
            style={taBase}
            onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
            onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 6 }}>Modified</label>
          <textarea
            value={modified}
            onChange={e => setModified(e.target.value)}
            placeholder={"Paste modified text here…"}
            style={taBase}
            onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
            onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
      </div>

      {/* ── Too large warning ────────────────────────── */}
      {tooLarge && (
        <div style={{ padding: '12px 16px', background: 'var(--amber-lt)', border: '1px solid rgba(217,119,6,.25)', borderRadius: 'var(--r-m)', fontSize: 13, color: 'var(--ink-2)', marginBottom: 14 }}>
          Text is too large to diff in the browser (limit: {MAX_LINES.toLocaleString()} lines per side). Use <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>diff</code> or <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>git diff</code> in a terminal.
        </div>
      )}

      {/* ── Stats + copy ────────────────────────────── */}
      {hasDiff && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--green)', background: 'var(--green-lt)', padding: '3px 9px', borderRadius: 99 }}>
            +{stats.added} added
          </span>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#dc2626', background: '#fef2f2', padding: '3px 9px', borderRadius: 99 }}>
            −{stats.removed} removed
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', background: 'var(--border)', padding: '3px 9px', borderRadius: 99 }}>
            {stats.unchanged} unchanged
          </span>
          {!hasChanges && (
            <span style={{ fontSize: 12, color: 'var(--ink-3)', fontStyle: 'italic' }}>Texts are identical</span>
          )}
          <div style={{ marginLeft: 'auto' }}>
            <button
              onClick={copyDiff}
              style={{
                display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px',
                background: copied ? 'var(--green)' : 'var(--white)',
                color: copied ? '#fff' : 'var(--ink-3)',
                border: `1.5px solid ${copied ? 'var(--green)' : 'var(--border)'}`,
                borderRadius: 'var(--r-s)', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all .14s',
              }}
            >
              {copied ? <IcoCheck /> : <IcoCopy />} {copied ? 'Copied!' : 'Copy diff'}
            </button>
          </div>
        </div>
      )}

      {/* ── Unified view ────────────────────────────── */}
      {hasDiff && viewMode === 'unified' && (
        <div style={{ border: '1.5px solid var(--border-md)', borderRadius: 'var(--r-m)', background: 'var(--white)', overflow: 'hidden', boxShadow: 'var(--sh-xs)' }}>
          <div style={{ maxHeight: 480, overflowY: 'auto', fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>
            {visibleLines.map((d, idx) => {
              if ('type' in d && d.type === 'separator') {
                return (
                  <div key={`sep-${idx}`} style={{ padding: '4px 12px', background: 'var(--page-bg)', color: 'var(--ink-4)', fontSize: 11, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                    ⋯
                  </div>
                );
              }
              const line = d as DiffLine;
              const isAdd = line.type === 'insert';
              const isDel = line.type === 'delete';
              const bg    = isAdd ? 'rgba(5,150,105,.08)'  : isDel ? 'rgba(220,38,38,.08)'  : 'transparent';
              const color = isAdd ? 'var(--green)'          : isDel ? '#dc2626'               : 'var(--ink-3)';
              const prefix = isAdd ? '+' : isDel ? '−' : ' ';
              return (
                <div key={idx} style={{ display: 'flex', background: bg, borderBottom: '1px solid var(--border)', minHeight: 22 }}>
                  <span style={{ ...lineNoStyle, borderRight: '1px solid var(--border)', padding: '2px 8px 2px 0', lineHeight: '20px', color: isDel ? 'rgba(220,38,38,.5)' : isAdd ? 'rgba(5,150,105,.5)' : 'var(--ink-4)' }}>
                    {line.aLine ?? ''}
                  </span>
                  <span style={{ ...lineNoStyle, borderRight: '1px solid var(--border)', padding: '2px 8px 2px 4px', lineHeight: '20px', color: isDel ? 'rgba(220,38,38,.5)' : isAdd ? 'rgba(5,150,105,.5)' : 'var(--ink-4)' }}>
                    {line.bLine ?? ''}
                  </span>
                  <span style={{ width: 20, textAlign: 'center', flexShrink: 0, color, fontWeight: 700, lineHeight: '24px', fontSize: 13 }}>{prefix}</span>
                  <span style={{ flex: 1, padding: '2px 12px 2px 0', color: isDel ? '#dc2626' : isAdd ? 'var(--green)' : 'var(--ink)', lineHeight: '20px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                    {line.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Split view ──────────────────────────────── */}
      {hasDiff && viewMode === 'split' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, border: '1.5px solid var(--border-md)', borderRadius: 'var(--r-m)', background: 'var(--border-md)', overflow: 'hidden', boxShadow: 'var(--sh-xs)' }}>
          {(['Original', 'Modified'] as const).map(label => (
            <div key={label} style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', background: 'var(--page-bg)', padding: '6px 12px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {label}
            </div>
          ))}
          <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border-md)', maxHeight: 480, overflow: 'hidden' }}>
            <div style={{ overflowY: 'auto', background: 'var(--white)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>
              {splitLines.map((row, idx) => {
                if (row.kind === 'separator') {
                  return <div key={`sep-${idx}`} style={{ padding: '4px 12px', background: 'var(--page-bg)', color: 'var(--ink-4)', fontSize: 11, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>⋯</div>;
                }
                if (row.kind === 'equal') {
                  return (
                    <div key={idx} style={{ display: 'flex', borderBottom: '1px solid var(--border)', minHeight: 22 }}>
                      <span style={{ ...lineNoStyle, borderRight: '1px solid var(--border)', padding: '2px 6px 2px 0', lineHeight: '20px' }}>{row.aLine}</span>
                      <span style={{ flex: 1, padding: '2px 10px', color: 'var(--ink)', lineHeight: '20px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{row.value}</span>
                    </div>
                  );
                }
                const isDel = row.aValue !== null;
                return (
                  <div key={idx} style={{ display: 'flex', background: isDel ? 'rgba(220,38,38,.08)' : 'transparent', borderBottom: '1px solid var(--border)', minHeight: 22 }}>
                    <span style={{ ...lineNoStyle, borderRight: '1px solid var(--border)', padding: '2px 6px 2px 0', lineHeight: '20px', color: isDel ? 'rgba(220,38,38,.5)' : 'var(--ink-4)' }}>{row.aLine ?? ''}</span>
                    <span style={{ flex: 1, padding: '2px 10px', color: isDel ? '#dc2626' : 'var(--ink-4)', lineHeight: '20px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{row.aValue ?? ''}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ overflowY: 'auto', background: 'var(--white)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>
              {splitLines.map((row, idx) => {
                if (row.kind === 'separator') {
                  return <div key={`sep-${idx}`} style={{ padding: '4px 12px', background: 'var(--page-bg)', color: 'var(--ink-4)', fontSize: 11, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>⋯</div>;
                }
                if (row.kind === 'equal') {
                  return (
                    <div key={idx} style={{ display: 'flex', borderBottom: '1px solid var(--border)', minHeight: 22 }}>
                      <span style={{ ...lineNoStyle, borderRight: '1px solid var(--border)', padding: '2px 6px 2px 0', lineHeight: '20px' }}>{row.bLine}</span>
                      <span style={{ flex: 1, padding: '2px 10px', color: 'var(--ink)', lineHeight: '20px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{row.value}</span>
                    </div>
                  );
                }
                const isIns = row.bValue !== null;
                return (
                  <div key={idx} style={{ display: 'flex', background: isIns ? 'rgba(5,150,105,.08)' : 'transparent', borderBottom: '1px solid var(--border)', minHeight: 22 }}>
                    <span style={{ ...lineNoStyle, borderRight: '1px solid var(--border)', padding: '2px 6px 2px 0', lineHeight: '20px', color: isIns ? 'rgba(5,150,105,.5)' : 'var(--ink-4)' }}>{row.bLine ?? ''}</span>
                    <span style={{ flex: 1, padding: '2px 10px', color: isIns ? 'var(--green)' : 'var(--ink-4)', lineHeight: '20px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{row.bValue ?? ''}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
