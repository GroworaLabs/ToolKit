import { useState, useCallback } from 'react';

const IcoCopy  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoSwap  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>;
const IcoX     = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

// ── JSON → YAML ─────────────────────────────────────────────────────────────
function jsonToYaml(obj: unknown, indent = 0): string {
    const pad = '  '.repeat(indent);
    if (obj === null) return 'null';
    if (typeof obj === 'boolean') return String(obj);
    if (typeof obj === 'number') return String(obj);
    if (typeof obj === 'string') {
        const needsQuotes =
            obj === '' ||
            /[:#\[\]{},&*?|<>=!%@`\n\t]/.test(obj) ||
            ['true','false','null','yes','no','on','off'].includes(obj.toLowerCase()) ||
            /^\s|\s$/.test(obj) ||
            /^\d/.test(obj);
        return needsQuotes
            ? `"${obj.replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,'\\n')}"`
            : obj;
    }
    if (Array.isArray(obj)) {
        if (!obj.length) return '[]';
        return obj.map(item => {
            if (item !== null && typeof item === 'object') {
                const lines = jsonToYaml(item, indent + 1).split('\n');
                return `${pad}- ${lines[0].slice((indent + 1) * 2)}\n${lines.slice(1).join('\n')}`;
            }
            return `${pad}- ${jsonToYaml(item, 0)}`;
        }).join('\n');
    }
    if (typeof obj === 'object') {
        const keys = Object.keys(obj as object);
        if (!keys.length) return '{}';
        return keys.map(key => {
            const val = (obj as Record<string, unknown>)[key];
            const k = /[:#\[\]{},&*?|<>=!%@`\s]/.test(key) ? `"${key}"` : key;
            if (val === null || typeof val !== 'object') return `${pad}${k}: ${jsonToYaml(val, 0)}`;
            if (Array.isArray(val) && !val.length) return `${pad}${k}: []`;
            if (!Array.isArray(val) && !Object.keys(val as object).length) return `${pad}${k}: {}`;
            return `${pad}${k}:\n${jsonToYaml(val, indent + 1)}`;
        }).join('\n');
    }
    return String(obj);
}

// ── YAML → JSON ─────────────────────────────────────────────────────────────
type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

function parseScalar(s: string): Json {
    s = s.trim();
    if (!s || s === 'null' || s === '~') return null;
    if (s === 'true' || s === 'yes' || s === 'on') return true;
    if (s === 'false' || s === 'no' || s === 'off') return false;
    if (/^-?\d+$/.test(s)) return Number(s);
    if (/^-?\d*\.\d+$/.test(s)) return parseFloat(s);
    if (s.startsWith('"') && s.endsWith('"'))
        return s.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\\\/g, '\\');
    if (s.startsWith("'") && s.endsWith("'"))
        return s.slice(1, -1).replace(/''/g, "'");
    return s;
}

function getIndent(line: string) { return line.match(/^( *)/)?.[1].length ?? 0; }

function findColon(s: string): number {
    let inD = false, inS = false;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '"' && !inS) inD = !inD;
        if (s[i] === "'" && !inD) inS = !inS;
        if (!inD && !inS && s[i] === ':' && (i === s.length - 1 || s[i + 1] === ' ')) return i;
    }
    return -1;
}

function parseBlock(lines: string[], idx: number, baseInd: number): { value: Json; idx: number } {
    while (idx < lines.length && !lines[idx].trim()) idx++;
    if (idx >= lines.length) return { value: null, idx };
    const ind = getIndent(lines[idx]);
    if (ind < baseInd) return { value: null, idx };
    const t = lines[idx].trim();
    if (t.startsWith('- ') || t === '-') return parseArr(lines, idx, ind);
    if (findColon(t) !== -1) return parseObj(lines, idx, ind);
    return { value: parseScalar(t), idx: idx + 1 };
}

function parseObj(lines: string[], idx: number, baseInd: number): { value: Json; idx: number } {
    const obj: { [k: string]: Json } = {};
    while (idx < lines.length) {
        while (idx < lines.length && !lines[idx].trim()) idx++;
        if (idx >= lines.length) break;
        const ind = getIndent(lines[idx]);
        if (ind < baseInd) break;
        const t = lines[idx].trim();
        if (t.startsWith('- ')) break;
        const ci = findColon(t);
        if (ci === -1) { idx++; continue; }
        const key = t.slice(0, ci).trim().replace(/^["']|["']$/g, '');
        const rest = t.slice(ci + 1).trim();
        if (!rest || rest === '|' || rest === '>') {
            idx++;
            while (idx < lines.length && !lines[idx].trim()) idx++;
            if (idx < lines.length && getIndent(lines[idx]) > baseInd) {
                const ni = getIndent(lines[idx]);
                const r = parseBlock(lines, idx, ni);
                obj[key] = r.value; idx = r.idx;
            } else { obj[key] = null; }
        } else { obj[key] = parseScalar(rest); idx++; }
    }
    return { value: obj, idx };
}

function parseArr(lines: string[], idx: number, baseInd: number): { value: Json; idx: number } {
    const arr: Json[] = [];
    while (idx < lines.length) {
        while (idx < lines.length && !lines[idx].trim()) idx++;
        if (idx >= lines.length) break;
        const ind = getIndent(lines[idx]);
        if (ind < baseInd) break;
        const t = lines[idx].trim();
        if (!t.startsWith('- ') && t !== '-') break;
        const valStr = t.startsWith('- ') ? t.slice(2).trim() : '';
        if (!valStr) {
            idx++;
            while (idx < lines.length && !lines[idx].trim()) idx++;
            if (idx < lines.length && getIndent(lines[idx]) > baseInd) {
                const ni = getIndent(lines[idx]);
                const r = parseBlock(lines, idx, ni);
                arr.push(r.value); idx = r.idx;
            } else arr.push(null);
        } else {
            const ci = findColon(valStr);
            if (ci !== -1) {
                const inObj: { [k: string]: Json } = {};
                inObj[valStr.slice(0, ci).trim()] = valStr.slice(ci + 1).trim()
                    ? parseScalar(valStr.slice(ci + 1).trim())
                    : null;
                idx++;
                const pInd = baseInd + 2;
                while (idx < lines.length) {
                    while (idx < lines.length && !lines[idx].trim()) idx++;
                    if (idx >= lines.length) break;
                    const ni = getIndent(lines[idx]);
                    if (ni < pInd) break;
                    const nt = lines[idx].trim();
                    if (nt.startsWith('- ')) break;
                    const nci = findColon(nt);
                    if (nci !== -1) {
                        const pk = nt.slice(0, nci).trim();
                        const pv = nt.slice(nci + 1).trim();
                        if (!pv) {
                            idx++;
                            while (idx < lines.length && !lines[idx].trim()) idx++;
                            if (idx < lines.length && getIndent(lines[idx]) > ni) {
                                const r = parseBlock(lines, idx, getIndent(lines[idx]));
                                inObj[pk] = r.value; idx = r.idx;
                            } else inObj[pk] = null;
                        } else { inObj[pk] = parseScalar(pv); idx++; }
                    } else idx++;
                }
                arr.push(inObj);
            } else { arr.push(parseScalar(valStr)); idx++; }
        }
    }
    return { value: arr, idx };
}

function yamlToJson(yaml: string): Json {
    const lines = yaml
        .split('\n')
        .map(l => l.replace(/\r$/, ''))
        .filter(l => !l.trimStart().startsWith('#'));
    return parseBlock(lines, 0, 0).value;
}

// ── Component ───────────────────────────────────────────────────────────────
const ta: React.CSSProperties = {
    width: '100%', minHeight: 140, padding: '12px',
    border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
    font: '13px/1.6 JetBrains Mono, monospace',
    color: 'var(--ink)', background: 'var(--page-bg)', outline: 'none',
    resize: 'vertical', transition: 'border-color .15s', boxSizing: 'border-box',
};

const JSON_SAMPLE = `{
  "name": "my-app",
  "version": "1.0.0",
  "database": {
    "host": "localhost",
    "port": 5432,
    "ssl": true
  },
  "tags": ["web", "api"]
}`;

const YAML_SAMPLE = `name: my-app
version: 1.0.0
database:
  host: localhost
  port: 5432
  ssl: true
tags:
  - web
  - api`;

export default function JsonToYamlWidget() {
    const [mode, setMode] = useState<'json-to-yaml' | 'yaml-to-json'>('json-to-yaml');
    const [input, setInput] = useState(JSON_SAMPLE);
    const [copied, setCopied] = useState(false);

    const { output, isError } = (() => {
        if (!input.trim()) return { output: '', isError: false };
        try {
            if (mode === 'json-to-yaml') {
                const parsed = JSON.parse(input);
                return { output: jsonToYaml(parsed), isError: false };
            } else {
                const parsed = yamlToJson(input);
                return { output: JSON.stringify(parsed, null, 2), isError: false };
            }
        } catch (e) {
            return { output: e instanceof Error ? e.message : 'Parse error', isError: true };
        }
    })();

    const swap = useCallback(() => {
        const nextMode = mode === 'json-to-yaml' ? 'yaml-to-json' : 'json-to-yaml';
        setMode(nextMode);
        setInput(output && !isError ? output : nextMode === 'json-to-yaml' ? JSON_SAMPLE : YAML_SAMPLE);
    }, [mode, output, isError]);

    const copy = useCallback(() => {
        if (!output || isError) return;
        navigator.clipboard.writeText(output).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        });
    }, [output, isError]);

    const clear = () => setInput('');

    return (
        <div>
            {/* Mode toggle */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                {(['json-to-yaml', 'yaml-to-json'] as const).map(m => (
                    <button key={m} onClick={() => { setMode(m); setInput(m === 'json-to-yaml' ? JSON_SAMPLE : YAML_SAMPLE); }}
                        style={{ flex: 1, padding: '8px', border: `1.5px solid ${mode === m ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-s)', background: mode === m ? 'var(--green-lt)' : 'var(--white)', color: mode === m ? 'var(--green)' : 'var(--ink-2)', fontSize: 13, fontWeight: mode === m ? 700 : 500, cursor: 'pointer', transition: 'all .14s' }}>
                        {m === 'json-to-yaml' ? 'JSON → YAML' : 'YAML → JSON'}
                    </button>
                ))}
            </div>

            {/* Input */}
            <div style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)' }}>
                        {mode === 'json-to-yaml' ? 'JSON input' : 'YAML input'}
                    </label>
                    {input && (
                        <button onClick={clear} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-4)', display: 'flex', alignItems: 'center', gap: 3, fontSize: 12 }}>
                            <IcoX /> Clear
                        </button>
                    )}
                </div>
                <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder={mode === 'json-to-yaml' ? '{"key": "value"}' : 'key: value'}
                    style={ta}
                    onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
                    onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                />
            </div>

            {/* Swap */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
                <button onClick={swap} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 14px', background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', cursor: 'pointer' }}>
                    <IcoSwap /> Swap
                </button>
            </div>

            {/* Output */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)' }}>
                        {mode === 'json-to-yaml' ? 'YAML output' : 'JSON output'}
                    </label>
                    <button onClick={copy} disabled={!output || isError}
                        style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: copied ? 'var(--green)' : 'var(--white)', color: copied ? '#fff' : 'var(--ink-3)', border: `1.5px solid ${copied ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-s)', fontSize: 12, fontWeight: 600, cursor: output && !isError ? 'pointer' : 'default', opacity: output && !isError ? 1 : 0.4, transition: 'all .14s' }}>
                        {copied ? <IcoCheck /> : <IcoCopy />} {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                <div style={{ minHeight: 80, padding: '12px', background: output && !isError ? 'var(--white)' : 'var(--page-bg)', border: `1.5px solid ${isError ? 'var(--red)' : output ? 'var(--border-md)' : 'var(--border)'}`, borderRadius: 'var(--r-m)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, lineHeight: 1.6, color: isError ? 'var(--red)' : 'var(--ink)', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                    {output || <span style={{ color: 'var(--ink-4)' }}>Output will appear here…</span>}
                </div>
            </div>
        </div>
    );
}
