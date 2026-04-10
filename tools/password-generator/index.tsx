import {FaqItem} from "@/lib/types";


export const faq: FaqItem[] = [
  {
    q: 'Is this password generator safe to use?',
    a: 'Yes — completely. Everything runs in your browser via the Web Crypto API (the same standard that powers HTTPS). No password ever leaves your device.',
  },
  {
    q: 'How long should my password be?',
    a: 'At least 16 characters for everyday accounts. For banking or email, use 20+ characters with symbols enabled.',
  },
  {
    q: 'Can I reuse passwords across sites?',
    a: 'Never. One breach exposes every account that shares it. Generate a unique password per site and store them in a password manager.',
  },
  {
    q: 'Where should I store generated passwords?',
    a: 'A dedicated password manager — Bitwarden (free & open-source), 1Password, or similar. Avoid plain-text files or browser autofill for sensitive accounts.',
  },
  {
    q: 'What actually makes a password strong?',
    a: 'Length matters most. A 24-character lowercase-only password is statistically stronger than an 8-character one with every character type. Prioritise length, then add variety.',
  },
  {
    q: 'What is password entropy and why does it matter?',
    a: 'Entropy measures how unpredictable a password is, expressed in bits. Higher entropy means more possible combinations an attacker must try. A password drawn from a 94-character set (letters + digits + symbols) at 16 characters has ~105 bits of entropy — effectively unbreakable by brute force. Adding length increases entropy more efficiently than adding character types.',
  },
  {
    q: 'Should I include symbols in my passwords?',
    a: 'Yes, when the service allows it. Symbols add to the character set size, increasing entropy. However, some systems restrict which symbols are allowed, and symbols can be harder to type on mobile keyboards. If a site rejects certain symbols, use a longer password with letters and digits instead — length compensates for reduced character variety.',
  },
  {
    q: 'How often should I change my passwords?',
    a: 'NIST guidelines (updated 2020) no longer recommend forced periodic changes. Changing strong, unique passwords on a schedule creates more risk — users tend to choose weaker passwords when forced to change frequently. Instead, change a password immediately if: you suspect it was compromised, the service reports a breach, or you shared it with someone who no longer needs access.',
  },
];

export const sidebarFeatures = [
  { label: 'Cryptographically secure', desc: 'Uses Web Crypto API — same randomness source as your OS.', color: 'var(--green)', bg: 'var(--green-lt)'  },
  { label: 'Zero data collection',     desc: 'Generated in your browser. Nothing is ever sent to a server.', color: 'var(--blue)',  bg: 'var(--blue-lt)'   },
  { label: 'Fully customisable',       desc: 'Length 8–64 chars. Toggle uppercase, numbers, symbols.', color: 'var(--amber)', bg: 'var(--amber-lt)' },
  { label: 'Instant & free',           desc: 'No account, no rate limits, no ads. Always free.', color: 'var(--ink-2)', bg: 'var(--border)'    },
];
