import { useState, useMemo, useCallback } from 'react';

function rot13(text: string): string {
  return text.replace(/[a-zA-Z]/g, ch => {
    const base = ch <= 'Z' ? 65 : 97;
    return String.fromCharCode(((ch.charCodeAt(0) - base + 13) % 26) + base);
  });
}

export function useRot13Encoder() {
  const [text, setText] = useState('');

  const output = useMemo<string>(() => {
    if (!text) return '';
    return rot13(text);
  }, [text]);

  // Stats
  const lettersAffected = useMemo(() => (text.match(/[a-zA-Z]/g) ?? []).length, [text]);
  const unchanged       = useMemo(() => text.length - lettersAffected, [text, lettersAffected]);

  const swap = useCallback(() => setText(output), [output]);
  const clear = useCallback(() => setText(''), []);

  return { text, setText, output, lettersAffected, unchanged, swap, clear };
}
