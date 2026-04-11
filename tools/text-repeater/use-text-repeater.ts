import { useState, useMemo, useCallback } from 'react';

export type Separator = 'none' | 'newline' | 'space' | 'comma' | 'pipe' | 'custom';

export function useTextRepeater() {
  const [text, setText]         = useState('');
  const [count, setCount]       = useState(3);
  const [separator, setSeparator] = useState<Separator>('newline');
  const [customSep, setCustomSep] = useState(' | ');

  const sepChar = useMemo<string>(() => {
    switch (separator) {
      case 'none':    return '';
      case 'newline': return '\n';
      case 'space':   return ' ';
      case 'comma':   return ', ';
      case 'pipe':    return ' | ';
      case 'custom':  return customSep;
    }
  }, [separator, customSep]);

  const safeCount = Math.min(Math.max(1, count), 1000);

  const output = useMemo<string>(() => {
    if (!text || safeCount < 1) return '';
    return Array(safeCount).fill(text).join(sepChar);
  }, [text, safeCount, sepChar]);

  const clear = useCallback(() => setText(''), []);

  return {
    text, setText,
    count, setCount,
    separator, setSeparator,
    customSep, setCustomSep,
    output,
    safeCount,
    outputChars: output.length,
    clear,
  };
}
