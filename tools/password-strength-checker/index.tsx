import { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'Is my password stored or sent anywhere?',
    a: 'No. The entire strength analysis runs in JavaScript inside your browser tab. Your password is never sent to any server, never logged, and never stored. You can verify this by disconnecting from the internet and opening the tool — it works fully offline.',
  },
  {
    q: 'What is password entropy and why does it matter?',
    a: 'Entropy measures how unpredictable a password is, expressed in bits. It is calculated as: log2(charset size) × length. Higher entropy means more possible combinations an attacker must try. A password from a 95-character set at 16 characters has ~105 bits of entropy — at 10 billion guesses per second, this would take longer than the age of the universe to brute-force.',
  },
  {
    q: 'How is the crack time estimate calculated?',
    a: 'Crack time is estimated assuming an attacker can try 10 billion passwords per second — the approximate speed of a modern GPU cluster running bcrypt or Argon2. The actual time depends on the hashing algorithm used to store the password: bcrypt at cost 12 reduces this to about 1,000 hashes/second. Our estimate assumes no hashing (worst case) to be conservative.',
  },
  {
    q: 'Why is length more important than complexity?',
    a: 'Adding one character to a password multiplies the search space by the charset size. Going from 8 to 12 characters (same charset) increases the search space by ~10 million times. Adding symbols to an 8-character password is far less effective than just making it longer. A 20-character lowercase-only passphrase is statistically stronger than a 10-character password with all character types.',
  },
  {
    q: 'What score is considered a strong password?',
    a: 'This tool rates passwords as: Very weak (under 15 bits), Weak (15–29 bits), Moderate (30–44 bits), Good (45–59 bits), and Strong (60+ bits). Security researchers generally recommend at least 60–80 bits of entropy for passwords protecting important accounts. For critical accounts, aim for 80+ bits.',
  },
  {
    q: 'Does this detect dictionary words and common passwords?',
    a: 'This tool checks for simple patterns like repeated characters and sequential strings (123, abc, qwerty), but does not check against a full dictionary or the haveibeenpwned breach database. For comprehensive breach checking, use the Have I Been Pwned Passwords API, which uses k-anonymity so your actual password is never transmitted.',
  },
  {
    q: 'Should I use passphrases instead of passwords?',
    a: 'Passphrases (4+ random words like "correct-horse-battery-staple") are excellent: they are long (high entropy), easy to remember, and easy to type. A 4-word passphrase from a 7,776-word list has ~51 bits of entropy; 6 words gives ~77 bits. They score very well in this tool because entropy grows with length. Use a password manager to generate and store truly random passwords for sites that require them.',
  },
  {
    q: 'How often should I change a strong password?',
    a: 'NIST guidelines (SP 800-63B, updated 2020) no longer recommend mandatory periodic password changes. Changing strong, unique passwords on a schedule tends to make them weaker — users pick predictable variations. Change a password immediately if: you know or suspect it was compromised, the service reports a data breach, or you shared it with someone who no longer needs access.',
  },
];

export const sidebarFeatures = [
  { label: 'Real-time analysis',   desc: 'Strength updates instantly as you type — no submit button needed.', color: 'var(--green)', bg: 'var(--green-lt)' },
  { label: 'Entropy calculation',  desc: 'Shows bits of entropy, not just a vague weak/strong label.', color: 'var(--blue)',  bg: 'var(--blue-lt)'  },
  { label: 'Crack time estimate',  desc: 'Estimated time to brute-force at 10B guesses per second.', color: 'var(--amber)', bg: 'var(--amber-lt)' },
  { label: 'Zero data collection', desc: 'Runs entirely in your browser. Password never leaves your device.', color: 'var(--ink-2)', bg: 'var(--border)'   },
];
