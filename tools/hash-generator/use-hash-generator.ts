import { useState, useCallback } from 'react';

export type HashAlgo = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

export const ALGORITHMS: HashAlgo[] = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];

async function computeHash(text: string, algo: HashAlgo): Promise<string> {
    const encoder = new TextEncoder();
    const data    = encoder.encode(text);
    const buffer  = await window.crypto.subtle.digest(algo, data);
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

export function useHashGenerator() {
    const [input,   setInput]   = useState('');
    const [algo,    setAlgo]    = useState<HashAlgo>('SHA-256');
    const [hashes,  setHashes]  = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [copied,  setCopied]  = useState<string | null>(null);
    const [uppercase, setUppercase] = useState(false);

    const generate = useCallback(async () => {
        if (!input) return;
        setLoading(true);
        try {
            const results: Record<string, string> = {};
            for (const a of ALGORITHMS) {
                results[a] = await computeHash(input, a);
            }
            setHashes(results);
        } finally {
            setLoading(false);
        }
    }, [input]);

    const copy = useCallback(async (hash: string) => {
        const val = uppercase ? hash.toUpperCase() : hash;
        try {
            await navigator.clipboard.writeText(val);
            setCopied(hash);
            setTimeout(() => setCopied(null), 1800);
        } catch { /* ignore */ }
    }, [uppercase]);

    const fmt = (h: string) => uppercase ? h.toUpperCase() : h;

    return { input, setInput, algo, setAlgo, hashes, loading, generate, copy, copied, uppercase, setUppercase, fmt };
}