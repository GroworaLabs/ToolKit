import { useState, useMemo, useCallback } from 'react';

// Standard ITU-R Morse code table
const MORSE: Record<string, string> = {
  A: '.-',    B: '-...',  C: '-.-.',  D: '-..',   E: '.',
  F: '..-.',  G: '--.',   H: '....',  I: '..',    J: '.---',
  K: '-.-',   L: '.-..',  M: '--',    N: '-.',    O: '---',
  P: '.--.',  Q: '--.-',  R: '.-.',   S: '...',   T: '-',
  U: '..-',   V: '...-',  W: '.--',   X: '-..-',  Y: '-.--',
  Z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..',  '9': '----.',
  '.':  '.-.-.-', ',': '--..--', '?': '..--..',  "'": '.----.',
  '!':  '-.-.--', '/': '-..-.',  '(': '-.--.',   ')': '-.--.-',
  '&':  '.-...',  ':': '---...', ';': '-.-.-.',   '=': '-...-',
  '+':  '.-.-.',  '-': '-....-', '_': '..__.-',   '"': '.-..-.',
  '$':  '...-..-','@': '.--.-.',
};

const MORSE_REVERSE: Record<string, string> = {};
for (const [letter, code] of Object.entries(MORSE)) {
  MORSE_REVERSE[code] = letter;
}

export type Direction = 'encode' | 'decode';

export function useTextToMorse() {
  const [text, setText]           = useState('');
  const [direction, setDirection] = useState<Direction>('encode');

  const output = useMemo<string>(() => {
    const t = text.trim();
    if (!t) return '';

    if (direction === 'encode') {
      const lines = t.split('\n');
      return lines.map(line =>
        line.toUpperCase().split('').map(ch => {
          if (ch === ' ') return '/';
          return MORSE[ch] ?? '?';
        }).join(' ')
      ).join('\n');
    } else {
      // Each word separated by ' / ', each letter by ' '
      const lines = t.split('\n');
      return lines.map(line =>
        line.trim().split(' / ').map(word =>
          word.trim().split(' ').map(code =>
            code ? (MORSE_REVERSE[code] ?? '?') : ''
          ).join('')
        ).join(' ')
      ).join('\n');
    }
  }, [text, direction]);

  const clear = useCallback(() => setText(''), []);

  return { text, setText, direction, setDirection, output, clear };
}
