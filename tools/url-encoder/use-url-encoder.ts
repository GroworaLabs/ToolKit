import { useState, useCallback, useMemo } from 'react';

export type UrlMode = 'encode' | 'decode';

export function useUrlEncoder() {
    const [input,  setInput]  = useState('');
    const [mode,   setMode]   = useState<UrlMode>('encode');
    const [copied, setCopied] = useState(false);

    const output = useMemo(() => {
        if (!input) return '';
        try {
            return mode === 'encode'
                ? encodeURIComponent(input)
                : decodeURIComponent(input);
        } catch {
            return '⚠️ Invalid encoded string';
        }
    }, [input, mode]);

    const isError = output.startsWith('⚠️');

    const copy = useCallback(async () => {
        if (!output || isError) return;
        try {
            await navigator.clipboard.writeText(output);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch { /* ignore */ }
    }, [output, isError]);

    const swap = useCallback(() => {
        setMode(m => m === 'encode' ? 'decode' : 'encode');
        setInput(prev => {
            try {
                return mode === 'encode' ? encodeURIComponent(prev) : decodeURIComponent(prev);
            } catch { return ''; }
        });
    }, [mode]);

    const clear = useCallback(() => setInput(''), []);

    return { input, setInput, mode, setMode, output, isError, copy, copied, swap, clear };
}