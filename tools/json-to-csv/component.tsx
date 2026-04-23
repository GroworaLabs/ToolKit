'use client';
import { useState, useCallback } from 'react';

function flattenObject(obj: unknown, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  if (obj === null || obj === undefined) return result;
  if (typeof obj !== 'object' || Array.isArray(obj)) {
    result[prefix] = Array.isArray(obj) ? JSON.stringify(obj) : String(obj);
    return result;
  }
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(result, flattenObject(v, key));
    } else {
      result[key] = v === null || v === undefined ? '' : Array.isArray(v) ? JSON.stringify(v) : String(v);
    }
  }
  return result;
}

function escapeCell(val: string, delim: string): string {
  if (val.includes(delim) || val.includes('"') || val.includes('\n') || val.includes('\r')) {
    return '"' + val.replace(/"/g, '""') + '"';
  }
  return val;
}

function jsonToCsv(json: string, delim: string, header: boolean): string {
  let data: unknown;
  try { data = JSON.parse(json); } catch { throw new Error('Invalid JSON'); }

  if (!Array.isArray(data)) {
    const entries = Object.values(data as Record<string, unknown>);
    const firstArr = entries.find(Array.isArray);
    if (firstArr) data = firstArr;
    else throw new Error('Input must be a JSON array of objects');
  }

  const arr = data as unknown[];
  if (arr.length === 0) return '';

  const rows = arr.map(r => flattenObject(r));
  const keys = [...new Set(rows.flatMap(r => Object.keys(r)))];

  const lines: string[] = [];
  if (header) lines.push(keys.map(k => escapeCell(k, delim)).join(delim));
  for (const row of rows) {
    lines.push(keys.map(k => escapeCell(row[k] ?? '', delim)).join(delim));
  }
  return lines.join('\r\n');
}

const SAMPLE = `[
  { "id": 1, "name": "Alice Johnson", "email": "alice@example.com", "age": 30, "active": true },
  { "id": 2, "name": "Bob Smith",     "email": "bob@example.com",   "age": 25, "active": false },
  { "id": 3, "name": "Carol White",   "email": "carol@example.com", "age": 35, "active": true }
]`;

export default function JsonToCsvComponent() {
  const [input,  setInput]  = useState(SAMPLE);
  const [delim,  setDelim]  = useState(',');
  const [header, setHeader] = useState(true);
  const [output, setOutput] = useState('');
  const [error,  setError]  = useState('');
  const [copied, setCopied] = useState(false);

  const convert = useCallback(() => {
    try {
      const csv = jsonToCsv(input.trim(), delim, header);
      setOutput(csv);
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  }, [input, delim, header]);

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const download = () => {
    if (!output) return;
    const ext = delim === '\t' ? 'tsv' : 'csv';
    const blob = new Blob([output], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `data.${ext}`; a.click();
    URL.revokeObjectURL(url);
  };

  const rowCount = output ? output.split('\r\n').length - (header ? 1 : 0) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <label style={{ fontSize: 13, color: 'var(--ink-2)', whiteSpace: 'nowrap' }}>Delimiter</label>
          {[{ label: 'Comma (,)', value: ',' }, { label: 'Semicolon (;)', value: ';' }, { label: 'Tab', value: '\t' }].map(d => (
            <button key={d.value} onClick={() => setDelim(d.value)}
              style={{ padding: '5px 12px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
                border: '1.5px solid', borderColor: delim === d.value ? 'var(--green)' : 'var(--border)',
                background: delim === d.value ? 'var(--green-lt)' : 'var(--white)',
                color: delim === d.value ? 'var(--green)' : 'var(--ink-2)', fontWeight: delim === d.value ? 600 : 400 }}>
              {d.label}
            </button>
          ))}
        </div>
        <label style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13, color: 'var(--ink-2)', cursor: 'pointer' }}>
          <input type="checkbox" checked={header} onChange={e => setHeader(e.target.checked)} />
          Include header row
        </label>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>JSON Input</label>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            spellCheck={false}
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.6, padding: 12,
              border: '1.5px solid var(--border)', borderRadius: 8, resize: 'vertical', minHeight: 280,
              background: 'var(--surface)', color: 'var(--ink)', outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            CSV Output {output && <span style={{ fontWeight: 400, color: 'var(--ink-3)' }}>— {rowCount} row{rowCount !== 1 ? 's' : ''}</span>}
          </label>
          <textarea readOnly value={error || output}
            spellCheck={false}
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.6, padding: 12,
              border: `1.5px solid ${error ? 'var(--red,#e53)' : 'var(--border)'}`, borderRadius: 8,
              resize: 'vertical', minHeight: 280, background: error ? '#fff5f5' : 'var(--surface)',
              color: error ? 'var(--red,#c33)' : 'var(--ink)', outline: 'none' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={convert}
          style={{ padding: '9px 22px', borderRadius: 8, background: 'var(--bg-accent)', color: '#fff',
            border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
          Convert →
        </button>
        <button onClick={copy} disabled={!output}
          style={{ padding: '9px 18px', borderRadius: 8, border: '1.5px solid var(--border)',
            background: 'var(--white)', color: 'var(--ink-2)', fontWeight: 500, fontSize: 13,
            cursor: output ? 'pointer' : 'not-allowed', opacity: output ? 1 : 0.5 }}>
          {copied ? 'Copied!' : 'Copy CSV'}
        </button>
        <button onClick={download} disabled={!output}
          style={{ padding: '9px 18px', borderRadius: 8, border: '1.5px solid var(--border)',
            background: 'var(--white)', color: 'var(--ink-2)', fontWeight: 500, fontSize: 13,
            cursor: output ? 'pointer' : 'not-allowed', opacity: output ? 1 : 0.5 }}>
          Download
        </button>
      </div>
    </div>
  );
}
