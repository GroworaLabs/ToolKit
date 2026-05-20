'use client';
import { useState, useCallback, useMemo, useRef } from 'react';

type Framework = 'jest' | 'playwright' | 'pytest' | 'supertest' | 'restassured';
type Mode      = 'exact' | 'type' | 'schema';

/* ── helpers ──────────────────────────────────────── */

function jsDotPath(path: string[]): string {
  return path.reduce((acc, key, i) => {
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)) return i === 0 ? key : `${acc}.${key}`;
    return `${acc}["${key}"]`;
  }, '');
}

function pyBracketPath(path: string[]): string {
  return path.reduce((acc, key) => `${acc}["${key}"]`, 'data');
}

function jsLit(v: unknown): string {
  if (v === null)              return 'null';
  if (v === undefined)         return 'undefined';
  if (typeof v === 'string')   return JSON.stringify(v);
  if (typeof v === 'boolean')  return String(v);
  if (typeof v === 'number')   return String(v);
  if (Array.isArray(v))        return `[${(v as unknown[]).slice(0, 3).map(jsLit).join(', ')}${v.length > 3 ? ', ...' : ''}]`;
  return JSON.stringify(v);
}

function pyLit(v: unknown): string {
  if (v === null)              return 'None';
  if (typeof v === 'string')   return JSON.stringify(v);
  if (typeof v === 'boolean')  return v ? 'True' : 'False';
  if (typeof v === 'number')   return String(v);
  return JSON.stringify(v);
}

function jsExpectAny(v: unknown): string {
  if (v === null)              return 'null';
  if (Array.isArray(v))        return 'expect.any(Array)';
  if (typeof v === 'string')   return 'expect.any(String)';
  if (typeof v === 'number')   return 'expect.any(Number)';
  if (typeof v === 'boolean')  return 'expect.any(Boolean)';
  if (typeof v === 'object')   return 'expect.any(Object)';
  return 'undefined';
}

function pyType(v: unknown): string {
  if (v === null)              return 'type(None)';
  if (Array.isArray(v))        return 'list';
  if (typeof v === 'string')   return 'str';
  if (typeof v === 'boolean')  return 'bool';
  if (typeof v === 'number')   return Number.isInteger(v as number) ? 'int' : 'float';
  if (typeof v === 'object')   return 'dict';
  return 'object';
}

interface PathEntry { path: string[]; value: unknown; }

function flattenPaths(obj: unknown, prefix: string[], out: PathEntry[], maxDepth = 4): void {
  if (prefix.length >= maxDepth || obj === null || typeof obj !== 'object') {
    out.push({ path: prefix, value: obj });
    return;
  }
  if (Array.isArray(obj)) {
    out.push({ path: prefix, value: obj });
    return;
  }
  for (const [key, val] of Object.entries(obj as Record<string, unknown>)) {
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      flattenPaths(val, [...prefix, key], out, maxDepth);
    } else {
      out.push({ path: [...prefix, key], value: val });
    }
  }
}

function buildJestSchema(v: unknown, depth = 0): string {
  const pad = (n: number) => ' '.repeat(n * 2);
  if (v === null)             return 'null';
  if (Array.isArray(v)) {
    if (v.length === 0) return '[]';
    const inner = typeof v[0] === 'object' && v[0] !== null
      ? `expect.arrayContaining([\n${pad(depth + 1)}${buildJestSchema(v[0], depth + 1)}\n${pad(depth)}])`
      : `expect.arrayContaining([${jsExpectAny(v[0])}])`;
    return inner;
  }
  if (typeof v === 'object') {
    const entries = Object.entries(v as Record<string, unknown>)
      .map(([k, val]) => `${pad(depth + 1)}${/^[a-z_$]/i.test(k) ? k : `"${k}"`}: ${buildJestSchema(val, depth + 1)}`);
    return `{\n${entries.join(',\n')}\n${pad(depth)}}`;
  }
  return jsExpectAny(v);
}

/* ── generators ────────────────────────────────────── */

function genJest(data: unknown, status: number, mode: Mode): string {
  const lines: string[] = [];
  lines.push(`// Status`);
  lines.push(`expect(response.status).toBe(${status});`);
  lines.push('');
  lines.push(`const data = await response.json();`);
  lines.push('');

  if (mode === 'schema') {
    lines.push('// Response structure');
    lines.push(`expect(data).toMatchObject(${buildJestSchema(data)});`);
    return lines.join('\n');
  }

  const paths: PathEntry[] = [];
  flattenPaths(data, [], paths);

  lines.push('// Field assertions');
  for (const { path, value } of paths) {
    if (path.length === 0) continue;
    const acc = 'data.' + jsDotPath(path);
    if (Array.isArray(value)) {
      lines.push(`expect(${acc}).toHaveLength(${(value as unknown[]).length});`);
    } else if (mode === 'exact') {
      lines.push(`expect(${acc}).toBe(${jsLit(value)});`);
    } else {
      lines.push(`expect(${acc}).toEqual(${jsExpectAny(value)});`);
    }
  }
  return lines.join('\n');
}

function genPlaywright(data: unknown, status: number, mode: Mode): string {
  const lines: string[] = [];
  lines.push(`// Status & headers`);
  lines.push(`expect(response.status()).toBe(${status});`);
  lines.push(`expect(response.headers()['content-type']).toContain('application/json');`);
  lines.push('');
  lines.push(`const data = await response.json();`);
  lines.push('');

  if (mode === 'schema') {
    lines.push('// Response structure');
    lines.push(`expect(data).toMatchObject(${buildJestSchema(data)});`);
    return lines.join('\n');
  }

  const paths: PathEntry[] = [];
  flattenPaths(data, [], paths);

  lines.push('// Field assertions');
  for (const { path, value } of paths) {
    if (path.length === 0) continue;
    const acc = 'data.' + jsDotPath(path);
    if (Array.isArray(value)) {
      lines.push(`expect(${acc}).toHaveLength(${(value as unknown[]).length});`);
    } else if (mode === 'exact') {
      lines.push(`expect(${acc}).toBe(${jsLit(value)});`);
    } else {
      lines.push(`expect(${acc}).toEqual(${jsExpectAny(value)});`);
    }
  }
  return lines.join('\n');
}

function genPytest(data: unknown, status: number, mode: Mode): string {
  const lines: string[] = [];
  lines.push('# Status & headers');
  lines.push(`assert response.status_code == ${status}`);
  lines.push(`assert "application/json" in response.headers.get("content-type", "")`);
  lines.push('');
  lines.push('data = response.json()');
  lines.push('');

  if (mode === 'schema') {
    lines.push('# Structure assertions');
    function pySchema(v: unknown, depth = 0): void {
      if (typeof v !== 'object' || v === null) return;
      if (Array.isArray(v)) return;
      for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
        lines.push(`assert "${k}" in data`);
        if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
          for (const [k2] of Object.entries(val as Record<string, unknown>)) {
            lines.push(`assert "${k2}" in data["${k}"]`);
          }
        }
      }
    }
    pySchema(data);
    return lines.join('\n');
  }

  const paths: PathEntry[] = [];
  flattenPaths(data, [], paths);

  lines.push('# Field assertions');
  for (const { path, value } of paths) {
    if (path.length === 0) continue;
    const acc = pyBracketPath(path);
    if (Array.isArray(value)) {
      lines.push(`assert isinstance(${acc}, list)`);
      lines.push(`assert len(${acc}) == ${(value as unknown[]).length}`);
    } else if (mode === 'exact') {
      lines.push(`assert ${acc} == ${pyLit(value)}`);
    } else {
      lines.push(`assert isinstance(${acc}, ${pyType(value)})`);
    }
  }
  return lines.join('\n');
}

function genSupertest(data: unknown, status: number, mode: Mode): string {
  const lines: string[] = [];
  lines.push(`const response = await request(app)`);
  lines.push(`  .get('/your-endpoint')`);
  lines.push(`  .expect(${status})`);
  lines.push(`  .expect('Content-Type', /json/);`);
  lines.push('');
  lines.push(`const data = response.body;`);
  lines.push('');

  if (mode === 'schema') {
    lines.push('// Response structure');
    lines.push(`expect(data).toMatchObject(${buildJestSchema(data)});`);
    return lines.join('\n');
  }

  const paths: PathEntry[] = [];
  flattenPaths(data, [], paths);

  lines.push('// Field assertions');
  for (const { path, value } of paths) {
    if (path.length === 0) continue;
    const acc = 'data.' + jsDotPath(path);
    if (Array.isArray(value)) {
      lines.push(`expect(${acc}).toHaveLength(${(value as unknown[]).length});`);
    } else if (mode === 'exact') {
      lines.push(`expect(${acc}).toBe(${jsLit(value)});`);
    } else {
      lines.push(`expect(${acc}).toEqual(${jsExpectAny(value)});`);
    }
  }
  return lines.join('\n');
}

/* ── RestAssured (Java / Hamcrest) ────────────────── */

function raLit(v: unknown): string {
  if (v === null)             return 'nullValue()';
  if (typeof v === 'boolean') return `equalTo(${v})`;
  if (typeof v === 'string')  return `equalTo("${v.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}")`;
  if (typeof v === 'number')  return Number.isInteger(v) ? `equalTo(${v})` : `equalTo(${v}f)`;
  return `equalTo(${JSON.stringify(v)})`;
}

function raType(v: unknown): string {
  if (v === null)             return 'nullValue()';
  if (Array.isArray(v))       return 'instanceOf(List.class)';
  if (typeof v === 'string')  return 'instanceOf(String.class)';
  if (typeof v === 'number')  return Number.isInteger(v) ? 'instanceOf(Integer.class)' : 'instanceOf(Float.class)';
  if (typeof v === 'boolean') return 'instanceOf(Boolean.class)';
  return 'instanceOf(Map.class)';
}

function genRestAssured(data: unknown, status: number, mode: Mode): string {
  const body: string[] = [];

  if (mode === 'schema') {
    if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
      for (const key of Object.keys(data as Record<string, unknown>)) {
        body.push(`  .body("$", hasKey("${key}"))`);
      }
    }
  } else {
    const paths: PathEntry[] = [];
    flattenPaths(data, [], paths);
    for (const { path, value } of paths) {
      if (path.length === 0) continue;
      const gpath = path.join('.');
      if (Array.isArray(value)) {
        body.push(`  .body("${gpath}", hasSize(${(value as unknown[]).length}))`);
      } else if (mode === 'exact') {
        body.push(`  .body("${gpath}", ${raLit(value)})`);
      } else {
        body.push(`  .body("${gpath}", ${raType(value)})`);
      }
    }
  }

  // Chain: all lines except last have no semicolon; last line gets semicolon
  const chain = [
    'given()',
    '.when()',
    '  .get("/your-endpoint")',
    '.then()',
    `  .statusCode(${status})`,
    '  .contentType("application/json")',
    ...body,
  ];
  chain[chain.length - 1] += ';';
  return chain.join('\n');
}

function generate(json: string, status: number, fw: Framework, mode: Mode): { code: string; error: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json.trim());
  } catch {
    return { code: '', error: 'Invalid JSON — fix the syntax and try again.' };
  }
  let code = '';
  if (fw === 'jest')         code = genJest(parsed, status, mode);
  if (fw === 'playwright')   code = genPlaywright(parsed, status, mode);
  if (fw === 'pytest')       code = genPytest(parsed, status, mode);
  if (fw === 'supertest')    code = genSupertest(parsed, status, mode);
  if (fw === 'restassured')  code = genRestAssured(parsed, status, mode);
  return { code, error: '' };
}

/* ── component ────────────────────────────────────── */

const PLACEHOLDER = `{
  "id": "usr_01HXQR2A",
  "name": "Alice",
  "email": "alice@example.com",
  "role": "admin",
  "verified": true,
  "score": 4.8,
  "tags": ["dev", "beta"],
  "address": {
    "city": "Berlin",
    "zip": "10115"
  }
}`;

const FW_OPTIONS: { id: Framework; label: string }[] = [
  { id: 'jest',         label: 'Jest'         },
  { id: 'playwright',   label: 'Playwright'   },
  { id: 'pytest',       label: 'pytest'       },
  { id: 'supertest',    label: 'Supertest'    },
  { id: 'restassured',  label: 'RestAssured'  },
];

const MODE_OPTIONS: { id: Mode; label: string; tip: string }[] = [
  { id: 'exact',  label: 'Exact values',  tip: 'Assert the exact value of every field' },
  { id: 'type',   label: 'Type-safe',     tip: 'Assert types, not specific values — for dynamic data' },
  { id: 'schema', label: 'Schema only',   tip: 'Generate a single toMatchObject / assertIn block' },
];

export default function ApiAssertionBuilder() {
  const [json,       setJson]      = useState('');
  const [status,     setStatus]    = useState(200);
  const [framework,  setFramework] = useState<Framework>('jest');
  const [mode,       setMode]      = useState<Mode>('exact');
  const [copied,     setCopied]    = useState(false);
  const [fileError,  setFileError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const { code, error } = useMemo(
    () => generate(json || PLACEHOLDER, status, framework, mode),
    [json, status, framework, mode]
  );

  const copy = useCallback(() => {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }, [code]);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith('.json') && file.type !== 'application/json') {
      setFileError('Only .json files are supported.');
      e.target.value = '';
      return;
    }
    setFileError('');
    const reader = new FileReader();
    reader.onload = ev => {
      const text = ev.target?.result as string;
      try {
        const pretty = JSON.stringify(JSON.parse(text), null, 2);
        setJson(pretty);
      } catch {
        setFileError('File is not valid JSON.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }, []);

  const chip = (active: boolean) => ({
    padding:      '5px 13px',
    borderRadius: 6,
    border:       `1px solid ${active ? 'var(--bg-accent)' : 'var(--border)'}`,
    background:   active ? 'var(--bg-accent)' : 'var(--surface)',
    color:        active ? '#fff' : 'var(--ink-1)',
    fontSize:     13,
    cursor:       'pointer',
    fontWeight:   active ? 600 : 400,
    transition:   'all .15s',
  } as React.CSSProperties);

  return (
    <div className="tk-token-split" style={{ marginTop: 8 }}>
      {/* ── LEFT: inputs ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* JSON textarea */}
        <div>
          <div className="assert-upload-row">
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', textTransform: 'uppercase', letterSpacing: '.04em' }}>
              JSON Response Body
            </label>
            <button
              type="button"
              className="assert-upload-btn"
              onClick={() => fileRef.current?.click()}
              style={{
                padding:      '4px 10px',
                borderRadius: 6,
                border:       '1px solid var(--border)',
                background:   'var(--surface)',
                color:        'var(--ink-2)',
                fontSize:     12,
                cursor:       'pointer',
                fontWeight:   500,
                display:      'flex',
                alignItems:   'center',
                gap:          5,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12v2h12v-2M8 2v8M5 5l3-3 3 3"/>
              </svg>
              Upload .json
            </button>
            <input ref={fileRef} type="file" accept=".json,application/json" onChange={onFileChange} style={{ display: 'none' }} />
          </div>
          <textarea
            value={json}
            onChange={e => setJson(e.target.value)}
            placeholder={PLACEHOLDER}
            spellCheck={false}
            rows={18}
            style={{
              width:       '100%',
              boxSizing:   'border-box',
              fontFamily:  'var(--font-mono, monospace)',
              fontSize:    12,
              lineHeight:  1.55,
              padding:     12,
              borderRadius: 8,
              border:      '1px solid var(--border)',
              background:  'var(--surface)',
              color:       'var(--ink-1)',
              resize:      'vertical',
              outline:     'none',
            }}
          />
          {fileError && (
            <p style={{ marginTop: 6, fontSize: 12, color: '#c53030' }}>{fileError}</p>
          )}
          {error && (
            <p style={{ marginTop: 6, fontSize: 12, color: '#c53030' }}>{error}</p>
          )}
        </div>

        {/* Status code */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.04em' }}>
            Expected Status Code
          </label>
          <input
            type="number"
            value={status}
            min={100}
            max={599}
            onChange={e => {
              const v = parseInt(e.target.value, 10);
              if (v >= 100 && v <= 599) setStatus(v);
            }}
            style={{
              width:        100,
              padding:      '6px 10px',
              borderRadius: 6,
              border:       '1px solid var(--border)',
              background:   'var(--surface)',
              color:        'var(--ink-1)',
              fontSize:     14,
              outline:      'none',
            }}
          />
        </div>

        {/* Framework */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.04em' }}>
            Framework
          </label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {FW_OPTIONS.map(fw => (
              <button key={fw.id} style={chip(framework === fw.id)} onClick={() => setFramework(fw.id)}>
                {fw.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mode */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.04em' }}>
            Assertion Mode
          </label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {MODE_OPTIONS.map(m => (
              <button key={m.id} title={m.tip} style={chip(mode === m.id)} onClick={() => setMode(m.id)}>
                {m.label}
              </button>
            ))}
          </div>
          <p style={{ marginTop: 6, fontSize: 12, color: 'var(--ink-3)' }}>
            {MODE_OPTIONS.find(m => m.id === mode)?.tip}
          </p>
        </div>
      </div>

      {/* ── RIGHT: output ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', textTransform: 'uppercase', letterSpacing: '.04em' }}>
            Generated Assertions
          </label>
          <button
            onClick={copy}
            disabled={!code}
            style={{
              padding:      '5px 14px',
              borderRadius: 6,
              border:       '1px solid var(--border)',
              background:   copied ? 'var(--green-lt, #f0fff4)' : 'var(--surface)',
              color:        copied ? 'var(--green, #276749)' : 'var(--ink-1)',
              fontSize:     12,
              cursor:       code ? 'pointer' : 'default',
              fontWeight:   600,
              transition:   'all .15s',
            }}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <pre style={{
          flex:        1,
          margin:      0,
          padding:     14,
          borderRadius: 8,
          border:      `1px solid ${error ? '#fed7d7' : 'var(--border)'}`,
          background:  'var(--surface)',
          fontFamily:  'var(--font-mono, monospace)',
          fontSize:    12,
          lineHeight:  1.6,
          color:       'var(--ink-1)',
          overflowX:   'auto',
          overflowY:   'auto',
          maxHeight:   520,
          minHeight:   320,
          whiteSpace:  'pre',
          wordBreak:   'keep-all',
        }}>
          {error ? <span style={{ color: '#c53030' }}>{error}</span> : (code || '// Paste JSON on the left to generate assertions')}
        </pre>
      </div>
    </div>
  );
}
