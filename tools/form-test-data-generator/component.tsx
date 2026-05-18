'use client';
import { useState, useMemo, useCallback } from 'react';
import Select from '@/components/ui/Select';

type FieldType = 'text' | 'email' | 'password' | 'number' | 'phone' | 'url' | 'date' | 'select' | 'textarea' | 'checkbox';

interface FieldDef {
  id:      string;
  name:    string;
  type:    FieldType;
  minLen:  number;
  maxLen:  number;
  minVal:  number;
  maxVal:  number;
  integer: boolean;
  options: string;
}

interface Cat { id: string; label: string; badge: string; color: string; bg: string; }

const CATS: Cat[] = [
  { id: 'valid',     label: 'Valid (happy path)',  badge: '✓', color: '#276749', bg: '#f0fff4' },
  { id: 'invalid',   label: 'Invalid format',      badge: '✗', color: '#c53030', bg: '#fff5f5' },
  { id: 'bound_min', label: 'Boundary — minimum',  badge: '▾', color: '#b7791f', bg: '#fffbeb' },
  { id: 'bound_max', label: 'Boundary — maximum',  badge: '▴', color: '#b7791f', bg: '#fffbeb' },
  { id: 'below_min', label: 'Below minimum',       badge: '↓', color: '#c53030', bg: '#fff5f5' },
  { id: 'above_max', label: 'Above maximum',       badge: '↑', color: '#c53030', bg: '#fff5f5' },
  { id: 'empty',     label: 'Empty / null',        badge: '∅', color: '#718096', bg: '#f7fafc' },
  { id: 'special',   label: 'Special characters',  badge: '⚙', color: '#2b6cb0', bg: '#ebf8ff' },
  { id: 'xss',       label: 'XSS payload',         badge: '⚠', color: '#c05621', bg: '#fffaf0' },
  { id: 'sql',       label: 'SQL injection',       badge: '⚠', color: '#c05621', bg: '#fffaf0' },
  { id: 'oversized', label: 'Oversized input',     badge: '»', color: '#c53030', bg: '#fff5f5' },
  { id: 'unicode',   label: 'Unicode / emoji',     badge: '✦', color: '#553c9a', bg: '#faf5ff' },
];

const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: 'text',     label: 'Text'     },
  { value: 'email',    label: 'Email'    },
  { value: 'password', label: 'Password' },
  { value: 'number',   label: 'Number'   },
  { value: 'phone',    label: 'Phone'    },
  { value: 'url',      label: 'URL'      },
  { value: 'date',     label: 'Date'     },
  { value: 'select',   label: 'Select'   },
  { value: 'textarea', label: 'Textarea' },
  { value: 'checkbox', label: 'Checkbox' },
];

const NA = '—';

function repeat(ch: string, n: number) { return n > 0 ? ch.repeat(Math.min(n, 10000)) : ''; }

function genValue(f: FieldDef, catId: string): string {
  const { type, minLen, maxLen, minVal, maxVal, integer, options } = f;
  const opts = options.split(',').map(s => s.trim()).filter(Boolean);
  const mid  = integer ? Math.floor((minVal + maxVal) / 2) : +((minVal + maxVal) / 2).toFixed(2);

  switch (catId) {
    case 'valid':
      switch (type) {
        case 'text':     return 'Hello World';
        case 'email':    return 'user@example.com';
        case 'password': return 'Tr0ub4dor&3';
        case 'number':   return String(mid);
        case 'phone':    return '+1-555-123-4567';
        case 'url':      return 'https://example.com';
        case 'date':     return '2024-06-15';
        case 'select':   return opts[0] ?? 'option1';
        case 'textarea': return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        case 'checkbox': return 'true';
      }
      break;

    case 'invalid':
      switch (type) {
        case 'text':     return '   ';
        case 'email':    return 'notanemail';
        case 'password': return '123';
        case 'number':   return 'abc';
        case 'phone':    return '123';
        case 'url':      return 'not a url';
        case 'date':     return '32-13-2024';
        case 'select':   return 'INVALID_OPTION';
        case 'textarea': return '   ';
        case 'checkbox': return 'maybe';
      }
      break;

    case 'bound_min':
      switch (type) {
        case 'text':     return repeat('a', Math.max(1, minLen));
        case 'email':    return 'a@b.co';
        case 'password': return repeat('a', Math.max(1, minLen));
        case 'number':   return String(minVal);
        case 'phone':    return '+1-200-100-1000';
        case 'url':      return 'https://a.io';
        case 'date':     return '2000-01-01';
        case 'select':   return opts[0] ?? 'option1';
        case 'textarea': return repeat('a', Math.max(1, minLen));
        case 'checkbox': return 'false';
      }
      break;

    case 'bound_max':
      switch (type) {
        case 'text':     return repeat('a', Math.min(maxLen, 500));
        case 'email':    return repeat('a', 248) + '@b.com'; // 254 chars — RFC 5321 max
        case 'password': return repeat('A', Math.min(maxLen, 128));
        case 'number':   return String(maxVal);
        case 'phone':    return '+1-999-999-9999';
        case 'url':      return 'https://example.com/' + repeat('path/', 40);
        case 'date':     return '9999-12-31';
        case 'select':   return opts[opts.length - 1] ?? opts[0] ?? 'option1';
        case 'textarea': return repeat('A', Math.min(maxLen, 1000));
        case 'checkbox': return 'true';
      }
      break;

    case 'below_min':
      switch (type) {
        case 'text':     return minLen > 1 ? repeat('a', minLen - 1) : '';
        case 'email':    return 'a@b'; // no TLD
        case 'password': return minLen > 1 ? repeat('a', minLen - 1) : 'a';
        case 'number':   return String(minVal - 1);
        case 'phone':    return '123';
        case 'url':      return 'http://';
        case 'date':     return '1899-12-31';
        case 'select':   return NA;
        case 'textarea': return minLen > 1 ? repeat('a', minLen - 1) : '';
        case 'checkbox': return NA;
      }
      break;

    case 'above_max':
      switch (type) {
        case 'text':     return repeat('a', Math.min(maxLen + 1, 10000));
        case 'email':    return repeat('a', 249) + '@b.com'; // 255 chars — above RFC limit
        case 'password': return repeat('A', Math.min(maxLen + 1, 10000));
        case 'number':   return String(maxVal + 1);
        case 'phone':    return '+1-555-123-4567-890-12345';
        case 'url':      return 'https://example.com/' + repeat('a', 2001);
        case 'date':     return '10000-01-01';
        case 'select':   return NA;
        case 'textarea': return repeat('a', Math.min(maxLen + 1, 10000));
        case 'checkbox': return NA;
      }
      break;

    case 'empty':
      if (type === 'checkbox') return 'false';
      return '';

    case 'special':
      switch (type) {
        case 'text':     return `<script>"'&\\/;{}`;
        case 'email':    return `test+tag+<>&@example.com`;
        case 'password': return `P@$$w0rd!<>"'\``;
        case 'number':   return `1e308`;
        case 'phone':    return `+1 (555) 123-4567 ext. 1`;
        case 'url':      return `https://example.com/path?q=<>&"'`;
        case 'date':     return `2024-02-29`; // leap year edge case
        case 'select':   return opts[0] ?? 'option1';
        case 'textarea': return `Line1\nLine2\r\nLine3\tTabbed`;
        case 'checkbox': return `1`;
      }
      break;

    case 'xss':
      switch (type) {
        case 'email':    return `"><script>alert(1)</script>@x.com`;
        case 'number':   return `<img src=x onerror=alert(1)>`;
        case 'url':      return `javascript:alert('xss')`;
        case 'select':   return `<script>alert(1)</script>`;
        case 'checkbox': return `<script>alert(1)</script>`;
        default:         return `<script>alert('xss')</script>`;
      }

    case 'sql':
      switch (type) {
        case 'email':    return `'; DROP TABLE users--@x.com`;
        case 'number':   return `1 OR 1=1`;
        case 'date':     return `2024-01-01'; DROP TABLE logs--`;
        case 'select':   return `'; DROP TABLE options--`;
        case 'checkbox': return `1; DROP TABLE users--`;
        default:         return `' OR '1'='1`;
      }

    case 'oversized':
      if (type === 'number')   return repeat('9', 309);
      if (type === 'checkbox') return repeat('A', 10000);
      return repeat('A', 10000);

    case 'unicode':
      switch (type) {
        case 'text':     return `こんにちは 🌍 مرحبا Привіт`;
        case 'email':    return `用户@例子.广告`;
        case 'password': return `P@$$w0rd™️🔐`;
        case 'number':   return `１２３`;
        case 'phone':    return `+٩٦٢-٥٥-١٢٣٤٥٦٧`;
        case 'url':      return `https://例子.广告/path?q=日本語`;
        case 'date':     return `٢٠٢٤-٠١-١٥`;
        case 'select':   return opts[0] ?? '日本語';
        case 'textarea': return `RTL: ‫مرحبا‬ ​‌‍ (zero-width chars)`;
        case 'checkbox': return `☑`;
      }
      break;
  }
  return '';
}

function truncate(s: string, max = 42): string {
  if (s.length <= max) return s;
  return s.slice(0, max) + '…';
}

function toCSV(fields: FieldDef[]): string {
  const names = fields.map(f => f.name || `field`);
  const header = ['Category', ...names].map(v => `"${v.replace(/"/g, '""')}"`).join(',');
  const rows = CATS.map(cat => {
    const cells = [cat.label, ...fields.map(f => genValue(f, cat.id))];
    return cells.map(v => {
      const s = v.replace(/"/g, '""');
      return `"${s}"`;
    }).join(',');
  });
  return [header, ...rows].join('\r\n');
}

function toJSON(fields: FieldDef[]): string {
  const data = CATS.map(cat => {
    const row: Record<string, string> = { _category: cat.label };
    fields.forEach(f => { row[f.name || 'field'] = genValue(f, cat.id); });
    return row;
  });
  return JSON.stringify(data, null, 2);
}

function toMarkdown(fields: FieldDef[]): string {
  const names = fields.map(f => f.name || 'field');
  const header = `| Category | ${names.join(' | ')} |`;
  const sep    = `| --- | ${names.map(() => '---').join(' | ')} |`;
  const rows   = CATS.map(cat => {
    const cells = fields.map(f => truncate(genValue(f, cat.id), 30).replace(/\|/g, '\\|'));
    return `| ${cat.badge} ${cat.label} | ${cells.join(' | ')} |`;
  });
  return [header, sep, ...rows].join('\n');
}

let uid = 0;
const nextId = () => String(++uid);

const DEFAULT_FIELDS: FieldDef[] = [
  { id: nextId(), name: 'username', type: 'text',   minLen: 3,  maxLen: 20,  minVal: 0,  maxVal: 100, integer: true,  options: '' },
  { id: nextId(), name: 'email',    type: 'email',  minLen: 6,  maxLen: 254, minVal: 0,  maxVal: 100, integer: true,  options: '' },
  { id: nextId(), name: 'age',      type: 'number', minLen: 1,  maxLen: 3,   minVal: 18, maxVal: 120, integer: true,  options: '' },
];

const inputSt: React.CSSProperties = {
  border: '1.5px solid var(--border)', borderRadius: 6,
  backgroundColor: 'var(--white)', color: 'var(--ink)',
  fontSize: 13, fontFamily: 'inherit', outline: 'none',
  padding: '5px 8px', boxSizing: 'border-box',
};

const numInput: React.CSSProperties = { ...inputSt, width: 64, textAlign: 'right' };

function FieldRow({ f, onChange, onRemove, isOnly }: {
  f: FieldDef;
  onChange: (patch: Partial<FieldDef>) => void;
  onRemove: () => void;
  isOnly: boolean;
}) {
  const hasLen  = f.type === 'text' || f.type === 'password' || f.type === 'textarea';
  const hasNum  = f.type === 'number';
  const hasOpts = f.type === 'select';

  return (
    <div className="ftdg-row">
      <input
        className="ftdg-name"
        value={f.name}
        onChange={e => onChange({ name: e.target.value })}
        placeholder="Field name"
        style={{ ...inputSt, fontWeight: 600 }}
      />

      <div className="ftdg-type">
        <Select
          value={f.type}
          onChange={v => onChange({ type: v as FieldType })}
          items={FIELD_TYPES}
          style={{ fontSize: 13, minHeight: 34 }}
        />
      </div>

      <button
        className="ftdg-rm"
        onClick={onRemove}
        disabled={isOnly}
        title="Remove field"
        style={{
          width: 34, height: 34, borderRadius: 5, fontSize: 14,
          border: '1.5px solid var(--border)', background: 'transparent',
          color: isOnly ? 'var(--border)' : 'var(--ink-3)',
          cursor: isOnly ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        ✕
      </button>

      {hasLen && (
        <div className="ftdg-con" style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>min</span>
          <input type="number" min={0} value={f.minLen} onChange={e => onChange({ minLen: Math.max(0, +e.target.value) })} style={numInput} />
          <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>max</span>
          <input type="number" min={1} value={f.maxLen} onChange={e => onChange({ maxLen: Math.max(1, +e.target.value) })} style={numInput} />
          <span style={{ fontSize: 11, color: 'var(--ink-4)' }}>chars</span>
        </div>
      )}

      {hasNum && (
        <div className="ftdg-con" style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>min</span>
          <input type="number" value={f.minVal} onChange={e => onChange({ minVal: +e.target.value })} style={numInput} />
          <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>max</span>
          <input type="number" value={f.maxVal} onChange={e => onChange({ maxVal: +e.target.value })} style={numInput} />
          <button
            onClick={() => onChange({ integer: !f.integer })}
            style={{
              padding: '4px 10px', borderRadius: 5, fontSize: 12, cursor: 'pointer',
              border: '1.5px solid',
              borderColor: f.integer ? 'var(--green)' : 'var(--border)',
              background:  f.integer ? 'var(--green-lt)' : 'var(--white)',
              color:       f.integer ? 'var(--green)' : 'var(--ink-3)',
              fontWeight: 600,
            }}
          >
            Int
          </button>
        </div>
      )}

      {hasOpts && (
        <input
          className="ftdg-con"
          value={f.options}
          onChange={e => onChange({ options: e.target.value })}
          placeholder="opt1, opt2, opt3"
          style={{ ...inputSt }}
        />
      )}
    </div>
  );
}

export default function FormTestDataGenerator() {
  const [fields, setFields] = useState<FieldDef[]>(DEFAULT_FIELDS);
  const [format, setFormat] = useState<'csv' | 'json' | 'md'>('csv');
  const [copied, setCopied] = useState<string | null>(null); // cell key or 'export'

  const updateField = useCallback((id: string, patch: Partial<FieldDef>) => {
    setFields(prev => prev.map(f => f.id === id ? { ...f, ...patch } : f));
  }, []);

  const removeField = useCallback((id: string) => {
    setFields(prev => prev.filter(f => f.id !== id));
  }, []);

  const addField = useCallback(() => {
    setFields(prev => [...prev, {
      id: nextId(), name: '', type: 'text',
      minLen: 1, maxLen: 255, minVal: 0, maxVal: 100, integer: true, options: '',
    }]);
  }, []);

  const exportText = useMemo(() => {
    if (format === 'csv') return toCSV(fields);
    if (format === 'json') return toJSON(fields);
    return toMarkdown(fields);
  }, [fields, format]);

  const copyExport = () => {
    navigator.clipboard.writeText(exportText).then(() => {
      setCopied('export');
      setTimeout(() => setCopied(null), 1800);
    });
  };

  const downloadExport = () => {
    const ext  = format === 'json' ? 'json' : format === 'md' ? 'md' : 'csv';
    const mime = format === 'json' ? 'application/json' : 'text/plain';
    const blob = new Blob([exportText], { type: mime });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `test-data.${ext}`; a.click();
    URL.revokeObjectURL(url);
  };

  const copyCell = (key: string, value: string) => {
    if (value === NA || value === '') return;
    navigator.clipboard.writeText(value).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1200);
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* ── Field builder ── */}
      <div>
        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 8 }}>
          Form fields
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {fields.map(f => (
            <FieldRow
              key={f.id}
              f={f}
              onChange={patch => updateField(f.id, patch)}
              onRemove={() => removeField(f.id)}
              isOnly={fields.length === 1}
            />
          ))}
        </div>
        <button
          onClick={addField}
          disabled={fields.length >= 10}
          style={{
            marginTop: 8, padding: '7px 16px', borderRadius: 7, fontSize: 13, fontWeight: 600,
            border: '1.5px dashed var(--border)', background: 'transparent',
            color: fields.length >= 10 ? 'var(--ink-4)' : 'var(--ink-2)',
            cursor: fields.length >= 10 ? 'not-allowed' : 'pointer',
          }}
        >
          + Add field {fields.length >= 10 ? '(max 10)' : ''}
        </button>
      </div>

      {/* ── Export controls ── */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600 }}>Export as</span>
        {(['csv', 'json', 'md'] as const).map(f => (
          <button key={f} onClick={() => setFormat(f)} style={{
            padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            border: '1.5px solid',
            borderColor: format === f ? 'var(--green)' : 'var(--border)',
            background:  format === f ? 'var(--green-lt)' : 'var(--white)',
            color:       format === f ? 'var(--green)' : 'var(--ink-2)',
          }}>
            {f.toUpperCase()}
          </button>
        ))}
        <button onClick={copyExport} style={{
          padding: '5px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
          border: '1.5px solid',
          borderColor: copied === 'export' ? 'var(--green)' : 'var(--border)',
          background:  copied === 'export' ? 'var(--green-lt)' : 'var(--white)',
          color:       copied === 'export' ? 'var(--green)' : 'var(--ink-2)',
        }}>
          {copied === 'export' ? 'Copied!' : 'Copy'}
        </button>
        <button onClick={downloadExport} style={{
          padding: '5px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
          border: 'none', background: 'var(--bg-accent)', color: '#fff',
        }}>
          Download
        </button>
        <span style={{ fontSize: 11, color: 'var(--ink-4)' }}>Click any cell to copy full value</span>
      </div>

      {/* ── Results table ── */}
      <div style={{ overflowX: 'auto', border: '1.5px solid var(--border)', borderRadius: 8 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              <th style={{
                padding: '10px 14px', textAlign: 'left', background: 'var(--surface)',
                borderBottom: '2px solid var(--border)', fontWeight: 700, fontSize: 11,
                letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-2)',
                whiteSpace: 'nowrap', minWidth: 170,
              }}>
                Test category
              </th>
              {fields.map(f => (
                <th key={f.id} style={{
                  padding: '10px 14px', textAlign: 'left', background: 'var(--surface)',
                  borderBottom: '2px solid var(--border)', fontWeight: 700, fontSize: 12,
                  color: 'var(--ink)', whiteSpace: 'nowrap', minWidth: 120,
                  borderLeft: '1px solid var(--border)',
                }}>
                  {f.name || <span style={{ color: 'var(--ink-4)', fontStyle: 'italic' }}>unnamed</span>}
                  <span style={{ fontSize: 10, color: 'var(--ink-4)', fontWeight: 400, marginLeft: 5 }}>
                    {f.type}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CATS.map((cat, ri) => (
              <tr key={cat.id} style={{ background: ri % 2 === 0 ? 'var(--white)' : 'var(--surface)' }}>
                <td style={{ padding: '8px 14px', whiteSpace: 'nowrap', borderBottom: '1px solid var(--border)' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '2px 8px', borderRadius: 4,
                    background: cat.bg, color: cat.color,
                    fontSize: 12, fontWeight: 700,
                  }}>
                    <span>{cat.badge}</span>
                    <span>{cat.label}</span>
                  </span>
                </td>
                {fields.map(f => {
                  const full = genValue(f, cat.id);
                  const key  = `${cat.id}-${f.id}`;
                  const isNA = full === NA || full === '';
                  const wasCopied = copied === key;
                  return (
                    <td
                      key={f.id}
                      onClick={() => copyCell(key, full)}
                      title={isNA ? undefined : full}
                      style={{
                        padding: '8px 14px',
                        borderBottom: '1px solid var(--border)',
                        borderLeft: '1px solid var(--border)',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 12, lineHeight: 1.4,
                        color: isNA ? 'var(--ink-4)' : wasCopied ? 'var(--green)' : 'var(--ink)',
                        cursor: isNA ? 'default' : 'pointer',
                        maxWidth: 220, overflow: 'hidden',
                        background: wasCopied ? 'var(--green-lt)' : 'transparent',
                        transition: 'background 0.15s',
                        whiteSpace: 'pre',
                      }}
                    >
                      {wasCopied ? '✓ copied' : (isNA ? NA : truncate(full))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: 11, color: 'var(--ink-4)', margin: 0, lineHeight: 1.6 }}>
        All data is generated locally in your browser — nothing is sent to a server.
        Oversized values are truncated in the table; the full 10 000-character string is included in the export.
      </p>
    </div>
  );
}
