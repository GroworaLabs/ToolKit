'use client';
import { useState, useCallback } from 'react';

type KwCase = 'upper' | 'lower' | 'preserve';
type Indent  = '2' | '4' | 'tab';

const TOP_LEVEL_KW = [
  'SELECT','FROM','WHERE','GROUP BY','ORDER BY','HAVING','LIMIT','OFFSET',
  'UNION ALL','UNION','INTERSECT','EXCEPT',
  'INSERT INTO','INSERT','VALUES','UPDATE','SET','DELETE FROM','DELETE',
  'CREATE TABLE','CREATE INDEX','CREATE VIEW','CREATE OR REPLACE',
  'ALTER TABLE','DROP TABLE','DROP INDEX','TRUNCATE',
  'WITH','ON CONFLICT','RETURNING',
];

const INLINE_KW = [
  'LEFT OUTER JOIN','RIGHT OUTER JOIN','FULL OUTER JOIN','CROSS JOIN',
  'INNER JOIN','LEFT JOIN','RIGHT JOIN','FULL JOIN','JOIN',
  'CASE','WHEN','THEN','ELSE','END',
  'AND','OR','NOT','IN','IS NULL','IS NOT NULL','BETWEEN','LIKE','EXISTS',
  'ON','AS','DISTINCT','ALL','TOP',
];

const ALL_KW = [...TOP_LEVEL_KW, ...INLINE_KW];

function tokenise(sql: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  while (i < sql.length) {
    // single-line comment
    if (sql[i] === '-' && sql[i+1] === '-') {
      const end = sql.indexOf('\n', i);
      tokens.push(end === -1 ? sql.slice(i) : sql.slice(i, end + 1));
      i = end === -1 ? sql.length : end + 1;
      continue;
    }
    // multi-line comment
    if (sql[i] === '/' && sql[i+1] === '*') {
      const end = sql.indexOf('*/', i + 2);
      tokens.push(end === -1 ? sql.slice(i) : sql.slice(i, end + 2));
      i = end === -1 ? sql.length : end + 2;
      continue;
    }
    // string literal
    if (sql[i] === "'" || sql[i] === '"' || sql[i] === '`') {
      const q = sql[i];
      let j = i + 1;
      while (j < sql.length) {
        if (sql[j] === q && sql[j+1] === q) { j += 2; continue; }
        if (sql[j] === q) { j++; break; }
        j++;
      }
      tokens.push(sql.slice(i, j));
      i = j;
      continue;
    }
    // whitespace — skip
    if (/\s/.test(sql[i])) { i++; continue; }
    // punctuation
    if ('(),;'.includes(sql[i])) { tokens.push(sql[i]); i++; continue; }
    // operators >=, <=, <>, !=, ::
    if (sql.slice(i, i+2).match(/^(>=|<=|<>|!=|::)/)) { tokens.push(sql.slice(i, i+2)); i+=2; continue; }
    if ('=<>!+-*/%|&^~'.includes(sql[i])) { tokens.push(sql[i]); i++; continue; }
    // word / number
    let j = i;
    while (j < sql.length && !/[\s(),;=<>!+\-*/%|&^~'"`;]/.test(sql[j])) j++;
    if (j === i) { tokens.push(sql[i]); i++; } else { tokens.push(sql.slice(i, j)); i = j; }
  }
  return tokens;
}

function matchKeyword(tokens: string[], i: number): string | null {
  for (const kw of ALL_KW) {
    const words = kw.split(' ');
    if (words.every((w, k) => tokens[i + k]?.toUpperCase() === w)) return kw;
  }
  return null;
}

function applyCase(kw: string, mode: KwCase, original: string): string {
  if (mode === 'upper')    return kw.toUpperCase();
  if (mode === 'lower')    return kw.toLowerCase();
  return original;
}

function format(sql: string, indentStr: string, kwCase: KwCase): string {
  const tokens = tokenise(sql.trim());
  const lines: string[] = [];
  let depth  = 0;
  let cursor = 0;
  let line   = '';
  const indent = () => indentStr.repeat(depth);

  const flush = () => {
    const t = line.trim();
    if (t) lines.push(indent() + t);
    line = '';
  };

  const addSpace = () => { if (line && !line.endsWith(' ')) line += ' '; };

  while (cursor < tokens.length) {
    const tok = tokens[cursor];

    // comments — emit on own line
    if (tok.startsWith('--') || tok.startsWith('/*')) {
      flush();
      lines.push(indent() + tok.trim());
      cursor++;
      continue;
    }

    // multi-word keyword check
    const kw = matchKeyword(tokens, cursor);
    if (kw) {
      const words = kw.split(' ');
      const original = tokens.slice(cursor, cursor + words.length).join(' ');
      const kwStr = applyCase(kw, kwCase, original);
      const isTop = TOP_LEVEL_KW.includes(kw);

      if (isTop) {
        flush();
        line = kwStr;
        cursor += words.length;

        // VALUES, SET — stay on same line as INSERT / UPDATE
        if (kw === 'VALUES' || kw === 'SET' || kw === 'ON CONFLICT' || kw === 'RETURNING') {
          // new line but same indent
        }
      } else {
        // inline keyword: JOIN gets its own line at current depth, AND/OR get indented
        if (['INNER JOIN','LEFT JOIN','RIGHT JOIN','FULL JOIN','CROSS JOIN',
             'LEFT OUTER JOIN','RIGHT OUTER JOIN','FULL OUTER JOIN','JOIN'].includes(kw)) {
          flush();
          line = kwStr;
        } else if (kw === 'AND' || kw === 'OR') {
          flush();
          line = kwStr;
        } else if (kw === 'CASE') {
          addSpace(); line += kwStr; depth++;
        } else if (kw === 'END') {
          depth = Math.max(0, depth - 1);
          flush();
          line = kwStr;
        } else {
          addSpace(); line += kwStr;
        }
        cursor += words.length;
      }
      continue;
    }

    if (tok === '(') {
      addSpace(); line += '('; depth++;
      // if next non-space is SELECT, flush for subquery
      cursor++;
      const next = tokens[cursor];
      if (next && next.toUpperCase() === 'SELECT') {
        flush();
      }
      continue;
    }

    if (tok === ')') {
      flush();
      depth = Math.max(0, depth - 1);
      line = ')';
      cursor++;
      continue;
    }

    if (tok === ',') {
      line += ',';
      flush();
      cursor++;
      continue;
    }

    if (tok === ';') {
      flush();
      lines.push(';');
      lines.push('');
      cursor++;
      continue;
    }

    addSpace(); line += tok;
    cursor++;
  }
  flush();

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

const SAMPLE = `SELECT u.id, u.name, u.email, COUNT(o.id) AS order_count FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.active = 1 AND u.created_at > '2024-01-01' GROUP BY u.id, u.name, u.email HAVING COUNT(o.id) > 0 ORDER BY order_count DESC LIMIT 20;`;

export default function SqlFormatter() {
  const [input,   setInput]   = useState(SAMPLE);
  const [kwCase,  setKwCase]  = useState<KwCase>('upper');
  const [indent,  setIndent]  = useState<Indent>('2');
  const [output,  setOutput]  = useState('');
  const [copied,  setCopied]  = useState(false);

  const indentStr = indent === 'tab' ? '\t' : ' '.repeat(+indent);

  const run = useCallback(() => {
    setOutput(format(input, indentStr, kwCase));
  }, [input, indentStr, kwCase]);

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Options */}
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <label style={{ fontSize: 13, color: 'var(--ink-2)', whiteSpace: 'nowrap' }}>Keywords</label>
          {(['upper','lower','preserve'] as KwCase[]).map(k => (
            <button key={k} onClick={() => setKwCase(k)}
              style={{ padding: '5px 12px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
                border: '1.5px solid', borderColor: kwCase === k ? 'var(--green)' : 'var(--border)',
                background: kwCase === k ? 'var(--green-lt)' : 'var(--white)',
                color: kwCase === k ? 'var(--green)' : 'var(--ink-2)', fontWeight: kwCase === k ? 600 : 400 }}>
              {k === 'upper' ? 'UPPER' : k === 'lower' ? 'lower' : 'Preserve'}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <label style={{ fontSize: 13, color: 'var(--ink-2)', whiteSpace: 'nowrap' }}>Indent</label>
          {([['2','2 spaces'],['4','4 spaces'],['tab','Tab']] as [Indent,string][]).map(([v,l]) => (
            <button key={v} onClick={() => setIndent(v)}
              style={{ padding: '5px 12px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
                border: '1.5px solid', borderColor: indent === v ? 'var(--green)' : 'var(--border)',
                background: indent === v ? 'var(--green-lt)' : 'var(--white)',
                color: indent === v ? 'var(--green)' : 'var(--ink-2)', fontWeight: indent === v ? 600 : 400 }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Input SQL</label>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            spellCheck={false}
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.6, padding: 12,
              border: '1.5px solid var(--border)', borderRadius: 8, resize: 'vertical', minHeight: 260,
              background: 'var(--surface)', color: 'var(--ink)', outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Formatted Output</label>
          <textarea readOnly value={output} spellCheck={false}
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.6, padding: 12,
              border: '1.5px solid var(--border)', borderRadius: 8, resize: 'vertical', minHeight: 260,
              background: 'var(--surface)', color: 'var(--ink)', outline: 'none' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={run}
          style={{ padding: '9px 22px', borderRadius: 8, background: 'var(--bg-accent)', color: '#fff',
            border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
          Format →
        </button>
        <button onClick={copy} disabled={!output}
          style={{ padding: '9px 18px', borderRadius: 8, border: '1.5px solid var(--border)',
            background: 'var(--white)', color: 'var(--ink-2)', fontWeight: 500, fontSize: 13,
            cursor: output ? 'pointer' : 'not-allowed', opacity: output ? 1 : 0.5 }}>
          {copied ? 'Copied!' : 'Copy SQL'}
        </button>
      </div>
    </div>
  );
}
