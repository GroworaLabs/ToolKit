import { useState, useCallback } from 'react';
import type {
  PasswordOptions,
  PasswordStrength,
  UsePasswordGeneratorReturn,
} from '@/lib/types';

const CHARSETS: Record<keyof Omit<PasswordOptions, 'length'>, string> = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers:   '0123456789',
  symbols:   '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

const DEFAULT_OPTIONS: PasswordOptions = {
  length: 16, uppercase: true, lowercase: true, numbers: true, symbols: false,
};

function calculateStrength(pw: string, opts: PasswordOptions): PasswordStrength {
  if (!pw) return { score: 0, label: '', color: '' };
  let s = 0;
  if (pw.length >= 12) s++;
  if (pw.length >= 16) s++;
  if (pw.length >= 20) s++;
  if (opts.uppercase) s++;
  if (opts.numbers)   s++;
  if (opts.symbols)   s += 2;

  if (s <= 2) return { score: 20,  label: 'Weak',        color: '#ff5c3a' };
  if (s <= 3) return { score: 45,  label: 'Fair',        color: '#f5a623' };
  if (s <= 5) return { score: 72,  label: 'Strong',      color: '#00a8d6' };
  return             { score: 100, label: 'Very Strong', color: '#00c17a' };
}

function secureRandInt(max: number): number {
  if (typeof window !== 'undefined' && window.crypto) {
    const buf = new Uint32Array(1);
    window.crypto.getRandomValues(buf);
    return buf[0] % max;
  }
  return Math.floor(Math.random() * max);
}

export function usePasswordGenerator(
    initialOptions?: Partial<PasswordOptions>
): UsePasswordGeneratorReturn {
  const [password, setPassword] = useState('');
  const [copied,   setCopied]   = useState(false);
  const [options,  setOptions]  = useState<PasswordOptions>({
    ...DEFAULT_OPTIONS,
    ...initialOptions,
  });

  const generate = useCallback(() => {
    const { length, uppercase, lowercase, numbers, symbols } = options;
    let charset = '';
    if (uppercase) charset += CHARSETS.uppercase;
    if (lowercase) charset += CHARSETS.lowercase;
    if (numbers)   charset += CHARSETS.numbers;
    if (symbols)   charset += CHARSETS.symbols;
    if (!charset)  charset  = CHARSETS.lowercase;

    const guaranteed: string[] = [];
    if (uppercase) guaranteed.push(CHARSETS.uppercase[secureRandInt(CHARSETS.uppercase.length)]);
    if (lowercase) guaranteed.push(CHARSETS.lowercase[secureRandInt(CHARSETS.lowercase.length)]);
    if (numbers)   guaranteed.push(CHARSETS.numbers[secureRandInt(CHARSETS.numbers.length)]);
    if (symbols)   guaranteed.push(CHARSETS.symbols[secureRandInt(CHARSETS.symbols.length)]);

    const rest = Array.from(
        { length: length - guaranteed.length },
        () => charset[secureRandInt(charset.length)],
    );

    const result = [...guaranteed, ...rest]
        .sort(() => Math.random() - 0.5)
        .join('');

    setPassword(result);
    setCopied(false);
  }, [options]);

  const copy = useCallback(async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  }, [password]);

  const toggleOption = useCallback((key: keyof Omit<PasswordOptions, 'length'>) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const setLength = useCallback((val: number | string) => {
    setOptions(prev => ({ ...prev, length: Number(val) }));
  }, []);

  return {
    password, options, strength: calculateStrength(password, options),
    copied, generate, copy, toggleOption, setLength,
  };
}