import { useState, useCallback, useMemo } from 'react';

export type JsonMode = 'prettify' | 'minify' | 'validate';

export function useJsonFormatter() {
    const [input,  setInput]  = useState('');
    const [mode,   setMode]   = useState<JsonMode>('prettify');
    const [indent, setIndent] = useState(2);
    const [copied, setCopied] = useState(false);

    const result = useMemo(() => {
        if (!input.trim()) return { output: '', error: null, valid: null };
        try {
            const parsed = JSON.parse(input);
            if (mode === 'minify')   return { output: JSON.stringify(parsed), error: null, valid: true };
            if (mode === 'validate') return { output: '✓ Valid JSON', error: null, valid: true };
            return { output: JSON.stringify(parsed, null, indent), error: null, valid: true };
        } catch (e) {
            const msg = e instanceof SyntaxError ? e.message : 'Invalid JSON';
            return { output: '', error: msg, valid: false };
        }
    }, [input, mode, indent]);

    const copy = useCallback(async () => {
        if (!result.output || result.error) return;
        try {
            await navigator.clipboard.writeText(result.output);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch { /* ignore */ }
    }, [result]);

    const clear = useCallback(() => setInput(''), []);

    const format = useCallback(() => {
        if (!input.trim()) return;
        try {
            const parsed = JSON.parse(input);
            setInput(JSON.stringify(parsed, null, indent));
        } catch { /* ignore */ }
    }, [input, indent]);

    return { input, setInput, mode, setMode, indent, setIndent, result, copy, copied, clear, format };
}