import { useState, useMemo, useCallback } from 'react';

export interface WhitespaceOptions {
  trimLines:        boolean;
  collapseSpaces:   boolean;
  removeBlankLines: boolean;
  removeTabs:       boolean;
}

export function useRemoveWhitespace() {
  const [text, setText] = useState('');
  const [options, setOptions] = useState<WhitespaceOptions>({
    trimLines:        true,
    collapseSpaces:   true,
    removeBlankLines: false,
    removeTabs:       true,
  });

  const output = useMemo<string>(() => {
    if (!text) return '';
    let result = text;
    if (options.removeTabs)       result = result.replace(/\t/g, ' ');
    if (options.collapseSpaces)   result = result.replace(/ {2,}/g, ' ');
    if (options.trimLines)        result = result.split('\n').map(l => l.trim()).join('\n');
    if (options.removeBlankLines) result = result.split('\n').filter(l => l.trim().length > 0).join('\n');
    return result;
  }, [text, options]);

  const toggle = useCallback((key: keyof WhitespaceOptions) =>
    setOptions(prev => ({ ...prev, [key]: !prev[key] })), []);

  const clear = useCallback(() => setText(''), []);

  const removed = text.length - output.length;

  return { text, setText, output, options, toggle, clear, removed };
}
