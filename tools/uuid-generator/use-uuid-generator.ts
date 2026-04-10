import { useState, useCallback } from 'react';

export type UuidVersion = 'v4' | 'v1-like';

export function generateUuidV4(): string {
    if (typeof window !== 'undefined' && window.crypto?.randomUUID) {
        return window.crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}

export function useUuidGenerator() {
    const [uuids,   setUuids]   = useState<string[]>(() => [generateUuidV4()]);
    const [count,   setCount]   = useState(1);
    const [copied,  setCopied]  = useState<string | null>(null);
    const [uppercase, setUppercase] = useState(false);

    const generate = useCallback(() => {
        setUuids(Array.from({ length: count }, generateUuidV4));
    }, [count]);

    const format = (uuid: string) => uppercase ? uuid.toUpperCase() : uuid;

    const copy = useCallback(async (uuid: string) => {
        try {
            await navigator.clipboard.writeText(format(uuid));
            setCopied(uuid);
            setTimeout(() => setCopied(null), 1800);
        } catch { /* ignore */ }
    }, [uppercase]);

    const copyAll = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(uuids.map(format).join('\n'));
            setCopied('all');
            setTimeout(() => setCopied(null), 1800);
        } catch { /* ignore */ }
    }, [uuids, uppercase]);

    return { uuids, count, setCount, generate, copy, copyAll, copied, uppercase, setUppercase, format };
}