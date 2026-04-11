import { useState, useMemo, useCallback } from 'react';

const NATO: Record<string, string> = {
  A: 'Alpha',    B: 'Bravo',    C: 'Charlie',  D: 'Delta',   E: 'Echo',
  F: 'Foxtrot',  G: 'Golf',     H: 'Hotel',    I: 'India',   J: 'Juliet',
  K: 'Kilo',     L: 'Lima',     M: 'Mike',     N: 'November',O: 'Oscar',
  P: 'Papa',     Q: 'Quebec',   R: 'Romeo',    S: 'Sierra',  T: 'Tango',
  U: 'Uniform',  V: 'Victor',   W: 'Whiskey',  X: 'X-ray',   Y: 'Yankee',
  Z: 'Zulu',
  '0': 'Zero',   '1': 'One',    '2': 'Two',    '3': 'Three', '4': 'Four',
  '5': 'Five',   '6': 'Six',    '7': 'Seven',  '8': 'Eight', '9': 'Niner',
};

export interface NatoToken {
  char:    string;
  word:    string;
  isSpace: boolean;
  isBreak: boolean;
  unknown: boolean;
}

export type DisplayMode = 'inline' | 'table';

export function useNatoAlphabet() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<DisplayMode>('table');

  const tokens = useMemo<NatoToken[]>(() => {
    if (!text) return [];
    return text.toUpperCase().split('').map(ch => {
      if (ch === '\n') return { char: ch, word: '↵', isSpace: false, isBreak: true,  unknown: false };
      if (ch === ' ')  return { char: ch, word: '⎵ Space',   isSpace: true,  isBreak: false, unknown: false };
      const word = NATO[ch];
      return { char: ch, word: word ?? ch, isSpace: false, isBreak: false, unknown: !word };
    });
  }, [text]);

  const inlineOutput = useMemo(() =>
    tokens
      .filter(t => !t.isBreak)
      .map(t => t.isSpace ? '—' : t.word)
      .join(' '),
    [tokens]
  );

  const clear = useCallback(() => setText(''), []);

  return { text, setText, tokens, inlineOutput, mode, setMode, clear };
}

export { NATO };
