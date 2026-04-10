import { useState, useCallback, useRef, DragEvent } from 'react';

const IcoCopy     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoX        = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IcoDownload = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const IcoUpload   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;

type Delimiter = ',' | ';' | '\t' | '|';

const DELIMITERS: { label: string; value: Delimiter }[] = [
  { label: 'Comma  ,',     value: ','  },
  { label: 'Semicolon ;',  value: ';'  },
  { label: 'Tab  ↹',       value: '\t' },
  { label: 'Pipe  |',      value: '|'  },
];

function coerce(val: string): string | number | boolean {
  const trimmed = val.trim();
  if (trimmed.toLowerCase() === 'true')  return true;
  if (trimmed.toLowerCase() === 'false') return false;
  if (trimmed !== '' && !isNaN(Number(trimmed))) return Number(trimmed);
  return val;
}

function parseCSV(raw: string, delimiter: Delimiter): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  let i = 0;

  while (i < raw.length) {
    const ch = raw[i];

    if (inQuotes) {
      if (ch === '"') {
        if (raw[i + 1] === '"') { field += '"'; i += 2; continue; }
        inQuotes = false; i++; continue;
      }
      field += ch; i++; continue;
    }

    if (ch === '"') { inQuotes = true; i++; continue; }

    if (ch === delimiter) {
      row.push(field); field = ''; i++; continue;
    }

    if (ch === '\r' && raw[i + 1] === '\n') {
      row.push(field); rows.push(row); row = []; field = ''; i += 2; continue;
    }
    if (ch === '\n') {
      row.push(field); rows.push(row); row = []; field = ''; i++; continue;
    }

    field += ch; i++;
  }

  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  // Drop trailing empty row
  if (rows.length > 0 && rows[rows.length - 1].every(c => c === '')) {
    rows.pop();
  }

  return rows;
}

function csvToJson(raw: string, delimiter: Delimiter, hasHeaders: boolean, pretty: boolean): { output: string; error: string | null; rowCount: number } {
  if (!raw.trim()) return { output: '', error: null, rowCount: 0 };

  try {
    const rows = parseCSV(raw, delimiter);
    if (rows.length === 0) return { output: '[]', error: null, rowCount: 0 };

    let result: unknown;

    if (hasHeaders) {
      const headers = rows[0].map(h => h.trim());
      const dataRows = rows.slice(1);
      result = dataRows.map(row => {
        const obj: Record<string, unknown> = {};
        headers.forEach((h, idx) => {
          obj[h] = coerce(row[idx] ?? '');
        });
        return obj;
      });
    } else {
      result = rows.map(row => row.map(coerce));
    }

    const output = pretty
      ? JSON.stringify(result, null, 2)
      : JSON.stringify(result);

    return { output, error: null, rowCount: hasHeaders ? rows.length - 1 : rows.length };
  } catch (e) {
    return { output: '', error: String(e), rowCount: 0 };
  }
}

const taStyle: React.CSSProperties = {
  width: '100%', padding: '12px', resize: 'vertical', outline: 'none',
  border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
  font: '13px/1.6 JetBrains Mono, monospace',
  color: 'var(--ink)', background: 'var(--page-bg)',
  transition: 'border-color .15s', boxSizing: 'border-box',
};

const PLACEHOLDER = `name,age,city
Alice,30,New York
Bob,25,London
Carol,35,Tokyo`;

export default function CsvToJsonWidget() {
  const [input,      setInput]      = useState('');
  const [fileName,   setFileName]   = useState('');
  const [delimiter,  setDelimiter]  = useState<Delimiter>(',');
  const [hasHeaders, setHasHeaders] = useState(true);
  const [pretty,     setPretty]     = useState(true);
  const [copied,     setCopied]     = useState(false);
  const [dragOver,   setDragOver]   = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { output, error, rowCount } = csvToJson(input, delimiter, hasHeaders, pretty);

  const loadFile = useCallback((file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target?.result as string;
      // Strip UTF-8 BOM if present
      setInput(text.startsWith('\uFEFF') ? text.slice(1) : text);
      setFileName(file.name);
    };
    reader.readAsText(file, 'UTF-8');
  }, []);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
    e.target.value = '';
  }, [loadFile]);

  const onDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  }, [loadFile]);

  const copy = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }, [output]);

  const download = useCallback(() => {
    if (!output) return;
    const baseName = fileName ? fileName.replace(/\.csv$/i, '') : 'output';
    const blob = new Blob([output], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `${baseName}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [output, fileName]);

  const clear = () => { setInput(''); setFileName(''); };

  return (
    <div>
      {/* ── Options bar ───────────────────────────────── */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>

        {/* Delimiter */}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {DELIMITERS.map(d => (
            <button
              key={d.value}
              onClick={() => setDelimiter(d.value)}
              style={{
                padding: '6px 11px',
                border: `1.5px solid ${delimiter === d.value ? 'var(--green)' : 'var(--border)'}`,
                borderRadius: 'var(--r-s)',
                background: delimiter === d.value ? 'var(--green-lt)' : 'var(--white)',
                color: delimiter === d.value ? 'var(--green)' : 'var(--ink-2)',
                fontSize: 12, fontWeight: delimiter === d.value ? 700 : 500,
                cursor: 'pointer', transition: 'all .14s',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Toggles */}
        <div style={{ display: 'flex', gap: 6, marginLeft: 'auto', flexWrap: 'wrap' }}>
          <button
            onClick={() => setHasHeaders(v => !v)}
            style={{
              padding: '6px 11px', fontSize: 12, fontWeight: 600,
              border: `1.5px solid ${hasHeaders ? 'var(--green)' : 'var(--border)'}`,
              borderRadius: 'var(--r-s)',
              background: hasHeaders ? 'var(--green-lt)' : 'var(--white)',
              color: hasHeaders ? 'var(--green)' : 'var(--ink-3)',
              cursor: 'pointer', transition: 'all .14s',
            }}
          >
            Headers
          </button>
          <button
            onClick={() => setPretty(v => !v)}
            style={{
              padding: '6px 11px', fontSize: 12, fontWeight: 600,
              border: `1.5px solid ${pretty ? 'var(--green)' : 'var(--border)'}`,
              borderRadius: 'var(--r-s)',
              background: pretty ? 'var(--green-lt)' : 'var(--white)',
              color: pretty ? 'var(--green)' : 'var(--ink-3)',
              cursor: 'pointer', transition: 'all .14s',
            }}
          >
            Pretty
          </button>
        </div>
      </div>

      {/* ── File upload zone ──────────────────────────── */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.tsv,.txt"
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '12px 16px', marginBottom: 10,
          border: `1.5px dashed ${dragOver ? 'var(--green)' : 'var(--border)'}`,
          borderRadius: 'var(--r-m)',
          background: dragOver ? 'var(--green-lt)' : 'var(--page-bg)',
          cursor: 'pointer', transition: 'all .15s',
        }}
      >
        <IcoUpload />
        {fileName ? (
          <span style={{ fontSize: 13, color: 'var(--green)', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>
            {fileName}
          </span>
        ) : (
          <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>
            Drop a <strong style={{ color: 'var(--ink-2)' }}>.csv</strong> file here or <strong style={{ color: 'var(--ink-2)' }}>click to browse</strong>
          </span>
        )}
      </div>

      {/* ── CSV Input ─────────────────────────────────── */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)' }}>CSV input</label>
          {input && (
            <button onClick={clear} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-4)', display: 'flex', alignItems: 'center', gap: 3, fontSize: 12 }}>
              <IcoX /> Clear
            </button>
          )}
        </div>
        <textarea
          value={input}
          onChange={e => { setInput(e.target.value); setFileName(''); }}
          placeholder={PLACEHOLDER}
          style={{ ...taStyle, minHeight: 160 }}
          onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
          onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
        />
      </div>

      {/* ── JSON Output ───────────────────────────────── */}
      {input.trim() && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)' }}>JSON output</label>
              {!error && rowCount > 0 && (
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--green)', background: 'var(--green-lt)', padding: '2px 8px', borderRadius: 99 }}>
                  {rowCount} row{rowCount !== 1 ? 's' : ''}
                </span>
              )}
              {error && (
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--red,#dc2626)', background: '#fef2f2', padding: '2px 8px', borderRadius: 99 }}>
                  Parse error
                </span>
              )}
            </div>
            {output && !error && (
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={copy}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px',
                    background: copied ? 'var(--green)' : 'var(--white)',
                    color: copied ? '#fff' : 'var(--ink-3)',
                    border: `1.5px solid ${copied ? 'var(--green)' : 'var(--border)'}`,
                    borderRadius: 'var(--r-s)', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all .14s',
                  }}
                >
                  {copied ? <IcoCheck /> : <IcoCopy />} {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={download}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px',
                    background: 'var(--white)', color: 'var(--ink-3)',
                    border: '1.5px solid var(--border)',
                    borderRadius: 'var(--r-s)', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  <IcoDownload /> Download
                </button>
              </div>
            )}
          </div>

          {error ? (
            <div style={{ padding: '12px 14px', background: '#fef2f2', border: '1.5px solid rgba(220,38,38,.2)', borderRadius: 'var(--r-m)', fontSize: 13, color: 'var(--red,#dc2626)', fontFamily: 'JetBrains Mono, monospace' }}>
              {error}
            </div>
          ) : (
            <div style={{ padding: '12px', background: 'var(--white)', border: '1.5px solid var(--border-md)', borderRadius: 'var(--r-m)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, lineHeight: 1.6, color: 'var(--ink)', wordBreak: 'break-all', whiteSpace: 'pre-wrap', maxHeight: 400, overflowY: 'auto', boxShadow: 'var(--sh-xs)' }}>
              {output}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
