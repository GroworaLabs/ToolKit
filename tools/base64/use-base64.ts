import { useState, useCallback, useMemo } from 'react';

export type Base64Mode = 'encode' | 'decode';

export function useBase64() {
    const [input,  setInput]  = useState('');
    const [mode,   setMode]   = useState<Base64Mode>('encode');
    const [copied, setCopied] = useState(false);

    const output = useMemo(() => {
        if (!input) return '';
        try {
            if (mode === 'encode') return btoa(unescape(encodeURIComponent(input)));
            return decodeURIComponent(escape(atob(input.trim())));
        } catch {
            return '⚠️ Invalid input for ' + mode;
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
                return mode === 'encode' ? btoa(unescape(encodeURIComponent(prev))) : decodeURIComponent(escape(atob(prev.trim())));
            } catch { return ''; }
        });
    }, [mode]);

    const clear = useCallback(() => setInput(''), []);

    return { input, setInput, mode, setMode, output, isError, copy, copied, swap, clear };
}