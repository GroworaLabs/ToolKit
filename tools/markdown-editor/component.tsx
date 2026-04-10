import { useMarkdownEditor } from './use-markdown-editor';

const IcoCopy  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

const BTN: React.CSSProperties = {
    padding: '5px 11px', fontSize: 12, fontWeight: 500, cursor: 'pointer',
    borderRadius: 'var(--r-s)', border: '1.5px solid var(--border)',
    background: 'var(--white)', color: 'var(--ink-3)', transition: 'all .14s',
};

const PREVIEW_STYLES = `
  .md-preview { font-family: 'Outfit', sans-serif; font-size: 14px; line-height: 1.7; color: var(--ink-2); }
  .md-preview h1,.md-preview h2,.md-preview h3,.md-preview h4 { color: var(--ink); font-weight: 700; margin: 1.2em 0 .5em; letter-spacing: -.01em; }
  .md-preview h1 { font-size: 22px; } .md-preview h2 { font-size: 18px; } .md-preview h3 { font-size: 15px; }
  .md-preview p { margin-bottom: .85em; }
  .md-preview ul,.md-preview ol { padding-left: 1.4em; margin-bottom: .85em; }
  .md-preview li { margin-bottom: .25em; }
  .md-preview code { font-family: 'JetBrains Mono', monospace; font-size: 12px; background: var(--border); padding: 2px 6px; border-radius: 4px; color: var(--ink); }
  .md-preview pre { background: var(--ink); color: #e2e8f0; padding: 14px; border-radius: 8px; overflow-x: auto; margin-bottom: .85em; }
  .md-preview pre code { background: none; padding: 0; color: inherit; font-size: 13px; }
  .md-preview blockquote { border-left: 3px solid var(--green); padding: 6px 14px; color: var(--ink-3); margin: .85em 0; background: var(--green-lt); border-radius: 0 6px 6px 0; }
  .md-preview a { color: var(--green); text-decoration: underline; }
  .md-preview hr { border: none; border-top: 1px solid var(--border); margin: 1.2em 0; }
  .md-preview strong { font-weight: 700; color: var(--ink); }
  .md-preview img { max-width: 100%; border-radius: 6px; }
`;

export default function MarkdownEditorWidget() {
    const { markdown, setMarkdown, html, view, setView, copyHtml, copied, wordCount } = useMarkdownEditor();

    const panelStyle: React.CSSProperties = {
        height: 420, overflow: 'auto', borderRadius: 'var(--r-m)',
        border: '1.5px solid var(--border)',
    };

    return (
        <div>
            <style>{PREVIEW_STYLES}</style>

            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', gap: 4 }}>
                    {(['split', 'source', 'preview'] as const).map(v => (
                        <button key={v} onClick={() => setView(v)} style={{ ...BTN, borderColor: view === v ? 'var(--green)' : 'var(--border)', background: view === v ? 'var(--green-lt)' : 'var(--white)', color: view === v ? 'var(--green)' : 'var(--ink-3)', textTransform: 'capitalize', fontWeight: view === v ? 600 : 500 }}>
                            {v}
                        </button>
                    ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 11, color: 'var(--ink-4)' }}>{wordCount} words</span>
                    <button onClick={copyHtml} style={{ ...BTN, display: 'flex', alignItems: 'center', gap: 5, background: copied ? 'var(--green)' : 'var(--white)', color: copied ? '#fff' : 'var(--ink-3)', borderColor: copied ? 'var(--green)' : 'var(--border)' }}>
                        {copied ? <IcoCheck /> : <IcoCopy />} Copy HTML
                    </button>
                </div>
            </div>

            {/* Editor panels */}
            <div className={`md-panels${view === 'split' ? ' md-panels-split' : ''}`}>

                {/* Source panel */}
                {(view === 'split' || view === 'source') && (
                    <textarea
                        value={markdown}
                        onChange={e => setMarkdown(e.target.value)}
                        spellCheck={false}
                        style={{ ...panelStyle, padding: '14px', font: '13px/1.65 JetBrains Mono, monospace', color: 'var(--ink)', background: 'var(--page-bg)', resize: 'none', outline: 'none', boxSizing: 'border-box' }}
                        onFocus={e => { e.target.style.borderColor = 'var(--green)'; }}
                        onBlur={e  => { e.target.style.borderColor = 'var(--border)'; }}
                    />
                )}

                {/* Preview panel */}
                {(view === 'split' || view === 'preview') && (
                    <div
                        className="md-preview"
                        style={{ ...panelStyle, padding: '14px', background: 'var(--white)' }}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                )}
            </div>
        </div>
    );
}