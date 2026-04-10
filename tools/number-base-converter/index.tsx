import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is a number base?',
    a: 'A number base (or radix) defines how many unique digits a positional number system uses. Decimal uses 10 digits (0–9), binary uses 2 (0–1), octal uses 8 (0–7), and hexadecimal uses 16 (0–9 plus A–F). The base determines the value of each digit position as a power of that base.',
  },
  {
    q: 'Why do computers use binary instead of decimal?',
    a: 'Electronic circuits have two stable states: on (high voltage) and off (low voltage). Binary maps directly to this physical reality — 1 for on, 0 for off. Using more than two states per circuit would require much more precise hardware and make error detection significantly harder. Binary is the simplest system that maps cleanly to transistor logic.',
  },
  {
    q: 'Why is hexadecimal so common in programming?',
    a: 'Each hexadecimal digit represents exactly 4 binary bits (a nibble), so two hex digits map perfectly to one byte. This makes hex a compact, human-readable shorthand for binary data. Memory addresses, colour codes, byte values, and hash outputs are all expressed in hex because it\'s far shorter than binary while remaining unambiguous.',
  },
  {
    q: 'How do I convert binary to decimal manually?',
    a: 'Write out each binary digit from right to left. Multiply each digit (0 or 1) by 2 raised to its position number (starting at 0 for the rightmost). Sum all the results. For example, binary 1011 = (1×8) + (0×4) + (1×2) + (1×1) = 8 + 0 + 2 + 1 = 11 in decimal.',
  },
  {
    q: 'What is two\'s complement and why does it matter?',
    a: 'Two\'s complement is the standard way computers represent negative integers in binary. To negate a number you flip all bits and add 1. The most significant bit acts as the sign bit — 0 for positive, 1 for negative. This representation allows a single set of addition circuits to handle both positive and negative numbers without special-casing.',
  },
  {
    q: 'When would I use octal in modern programming?',
    a: 'Octal is mostly encountered in Unix file permission notation. The chmod command uses octal digits where each digit represents three bits: read (4), write (2), execute (1). So chmod 755 means owner has rwx (7), group has r-x (5), and others have r-x (5). Outside of file permissions, octal is rarely used in modern code.',
  },
  {
    q: 'How many hexadecimal digits does it take to represent a 32-bit integer?',
    a: 'Exactly 8 hex digits. Each hex digit represents 4 bits, so 32 bits ÷ 4 bits per digit = 8 digits. A 64-bit integer requires 16 hex digits. This is why memory addresses on a 64-bit system are typically shown as 16 hex characters prefixed with 0x.',
  },
  {
    q: 'What is the difference between 0x prefix and # prefix for hex values?',
    a: '0x is the standard prefix for hexadecimal literals in most programming languages (C, C++, JavaScript, Python, Go, Rust, Java). The # prefix is used specifically for CSS colour codes and HTML colour values. Both refer to hexadecimal numbers — the prefix is purely contextual convention, not a mathematical difference.',
  },
  {
    q: 'Can this converter handle floating-point numbers?',
    a: 'This tool converts integers between bases. Floating-point base conversion is considerably more complex because fractions in one base often produce repeating digits in another (just as 1/3 is a repeating decimal). For integer conversions — which cover the vast majority of programming use cases like addresses, flags, and byte values — this tool handles all common bases.',
  },
];

export const sidebarInfo = [
  { label: 'Supported bases', value: '2 · 8 · 10 · 16' },
  { label: 'Max integer',     value: '2⁵³ − 1 (safe JS)' },
  { label: 'Negative values', value: 'Two\'s complement' },
  { label: 'Output formats',  value: 'With/without prefix' },
];
