'use client';
import { useState, useCallback } from 'react';

function formatBytes(n: number): string {
  if (n < 1024) return n + ' B';
  return (n / 1024).toFixed(1) + ' KB';
}

// ── Tokenizer ────────────────────────────────────────────────────────
type TokType = 'doctype' | 'comment' | 'open' | 'close' | 'selfclose' | 'text' | 'rawcontent';
interface Tok { type: TokType; val: string; tag: string }

const VOID  = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
const RAW   = new Set(['script','style','pre','textarea','xmp']);
const BLOCK = new Set(['address','article','aside','blockquote','body','caption','col','colgroup','dd','details','dialog','div','dl','dt','fieldset','figcaption','figure','footer','form','h1','h2','h3','h4','h5','h6','head','header','hgroup','html','hr','legend','li','link','main','meta','nav','noscript','ol','p','pre','script','section','style','summary','table','tbody','td','template','tfoot','th','thead','title','tr','ul']);

function tagName(raw: string): string {
  const m = raw.match(/^<\/?([a-zA-Z][a-zA-Z0-9:-]*)/);
  return m ? m[1].toLowerCase() : '';
}

function tokenize(html: string): Tok[] {
  const toks: Tok[] = [];
  let i = 0;

  while (i < html.length) {
    if (html.startsWith('<!--', i)) {
      const e = html.indexOf('-->', i + 4);
      const end = e < 0 ? html.length : e + 3;
      toks.push({ type: 'comment', val: html.slice(i, end), tag: '' });
      i = end; continue;
    }
    if (html.startsWith('<!', i) || html.startsWith('<?', i)) {
      const e = html.indexOf('>', i);
      const end = e < 0 ? html.length : e + 1;
      toks.push({ type: 'doctype', val: html.slice(i, end), tag: '' });
      i = end; continue;
    }
    if (html.startsWith('</', i)) {
      const e = html.indexOf('>', i);
      const end = e < 0 ? html.length : e + 1;
      const raw = html.slice(i, end);
      toks.push({ type: 'close', val: raw, tag: tagName(raw) });
      i = end; continue;
    }
    if (html[i] === '<' && /[a-zA-Z]/.test(html[i + 1] ?? '')) {
      let j = i + 1;
      while (j < html.length && html[j] !== '>') {
        const c = html[j];
        if (c === '"') { j++; while (j < html.length && html[j] !== '"') j++; }
        else if (c === "'") { j++; while (j < html.length && html[j] !== "'") j++; }
        j++;
      }
      const end = j < html.length ? j + 1 : j;
      const raw = html.slice(i, end);
      const tag = tagName(raw);
      const isSelf = raw.endsWith('/>') || VOID.has(tag);
      toks.push({ type: isSelf ? 'selfclose' : 'open', val: raw, tag });
      i = end;
      if (!isSelf && RAW.has(tag)) {
        const closeStr = '</' + tag;
        const ci = html.toLowerCase().indexOf(closeStr, i);
        if (ci < 0) {
          toks.push({ type: 'rawcontent', val: html.slice(i), tag });
          i = html.length;
        } else {
          toks.push({ type: 'rawcontent', val: html.slice(i, ci), tag });
          i = ci;
        }
      }
      continue;
    }
    const ni = html.indexOf('<', i);
    const end = ni < 0 ? html.length : ni;
    if (end > i) toks.push({ type: 'text', val: html.slice(i, end), tag: '' });
    i = end === i ? i + 1 : end;
  }

  return toks;
}

// ── Minify ───────────────────────────────────────────────────────────
function minifyHTML(html: string): string {
  const toks = tokenize(html);
  const parts: string[] = [];

  for (const { type, val, tag } of toks) {
    switch (type) {
      case 'comment': break;
      case 'text':
        parts.push(val.replace(/[ \t]*\r?\n[ \t]*/g, '').replace(/[ \t]{2,}/g, ' '));
        break;
      case 'rawcontent':
        if (tag === 'pre' || tag === 'textarea') parts.push(val);
        else parts.push(val.trim() ? '\n' + val.trim() + '\n' : '');
        break;
      default:
        parts.push(val);
    }
  }

  return parts.join('').replace(/>\s+</g, '><').trim();
}

// ── Beautify ─────────────────────────────────────────────────────────
function beautifyHTML(html: string): string {
  const toks = tokenize(html);
  let depth = 0;
  const parts: string[] = [];
  const ind = () => '  '.repeat(depth);
  const newline = (s: string) => parts.push('\n' + ind() + s);
  const inline  = (s: string) => parts.push(s);

  for (const { type, val, tag } of toks) {
    switch (type) {
      case 'doctype':
        newline(val); break;
      case 'comment':
        newline(val.replace(/\n/g, '\n' + ind())); break;
      case 'open':
        if (BLOCK.has(tag)) { newline(val); depth++; }
        else inline(val);
        break;
      case 'close':
        if (BLOCK.has(tag)) { depth = Math.max(0, depth - 1); newline(val); }
        else inline(val);
        break;
      case 'selfclose':
        if (BLOCK.has(tag)) newline(val);
        else inline(val);
        break;
      case 'rawcontent': {
        const lines = val.split('\n').map(l => l.trim()).filter(l => l);
        for (const l of lines) newline(l);
        break;
      }
      case 'text': {
        const t = val.replace(/\s+/g, ' ').trim();
        if (t) newline(t);
        break;
      }
    }
  }

  return parts.join('').trim();
}

// ── Sample ────────────────────────────────────────────────────────────
const SAMPLE = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
    <!-- Page styles -->
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header class="site-header">
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>
    </header>
    <main>
      <h1>Welcome</h1>
      <p>This is a <strong>sample</strong> HTML document for testing the minifier.</p>
    </main>
  </body>
</html>`;

type Mode = 'minify' | 'beautify';

export default function HtmlMinifier() {
  const [input,  setInput]  = useState(SAMPLE);
  const [output, setOutput] = useState('');
  const [mode,   setMode]   = useState<Mode>('minify');
  const [copied, setCopied] = useState(false);

  const run = useCallback(() => {
    setOutput(mode === 'minify' ? minifyHTML(input) : beautifyHTML(input));
  }, [input, mode]);

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const clear = () => { setInput(''); setOutput(''); };

  const origBytes = new TextEncoder().encode(input).length;
  const outBytes  = new TextEncoder().encode(output).length;
  const saved = mode === 'minify' && origBytes > 0 && output
    ? Math.round((1 - outBytes / origBytes) * 100) : null;
  const statColor = saved !== null && saved >= 10 ? 'var(--green)' : 'var(--ink-3)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <label style={{ fontSize: 13, color: 'var(--ink-2)', whiteSpace: 'nowrap' }}>Mode</label>
        {(['minify', 'beautify'] as Mode[]).map(m => (
          <button key={m} onClick={() => setMode(m)}
            style={{ padding: '5px 16px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
              border: '1.5px solid', borderColor: mode === m ? 'var(--green)' : 'var(--border)',
              background: mode === m ? 'var(--green-lt)' : 'var(--white)',
              color: mode === m ? 'var(--green)' : 'var(--ink-2)',
              fontWeight: mode === m ? 600 : 400, minHeight: 36 }}>
            {m === 'minify' ? 'Minify' : 'Beautify'}
          </button>
        ))}
      </div>

      {output && (
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13, color: 'var(--ink-2)' }}>
          <span>Original: <strong style={{ color: 'var(--ink)' }}>{formatBytes(origBytes)}</strong></span>
          <span>Output: <strong style={{ color: 'var(--ink)' }}>{formatBytes(outBytes)}</strong></span>
          {saved !== null && (
            <span>Saved: <strong style={{ color: statColor }}>{saved}%</strong></span>
          )}
        </div>
      )}

      <div className="tk-token-split">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Input HTML</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            spellCheck={false}
            placeholder="Paste your HTML here…"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.6,
              padding: 12, border: '1.5px solid var(--border)', borderRadius: 8,
              resize: 'vertical', minHeight: 260, background: 'var(--surface)',
              color: 'var(--ink)', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {mode === 'minify' ? 'Minified Output' : 'Beautified Output'}
          </label>
          <textarea
            readOnly
            value={output}
            spellCheck={false}
            placeholder={`${mode === 'minify' ? 'Minified' : 'Beautified'} HTML appears here…`}
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.6,
              padding: 12, border: '1.5px solid var(--border)', borderRadius: 8,
              resize: 'vertical', minHeight: 260, background: 'var(--surface)',
              color: 'var(--ink)', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button onClick={run}
          style={{ padding: '9px 22px', borderRadius: 8, background: 'var(--bg-accent)', color: '#fff',
            border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', minHeight: 44 }}>
          {mode === 'minify' ? 'Minify →' : 'Beautify →'}
        </button>
        <button onClick={copy} disabled={!output}
          style={{ padding: '9px 18px', borderRadius: 8, border: '1.5px solid var(--border)',
            background: 'var(--white)', color: 'var(--ink-2)', fontWeight: 500, fontSize: 13,
            cursor: output ? 'pointer' : 'not-allowed', opacity: output ? 1 : 0.5, minHeight: 44 }}>
          {copied ? 'Copied!' : 'Copy HTML'}
        </button>
        <button onClick={clear}
          style={{ padding: '9px 18px', borderRadius: 8, border: '1.5px solid var(--border)',
            background: 'var(--white)', color: 'var(--ink-2)', fontWeight: 500, fontSize: 13,
            cursor: 'pointer', minHeight: 44 }}>
          Clear
        </button>
      </div>
    </div>
  );
}