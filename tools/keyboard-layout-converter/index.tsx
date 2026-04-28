import { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What does this keyboard layout converter do?',
    a: 'It fixes text that was typed in the wrong keyboard layout. For example, if you meant to type in Ukrainian but your keyboard was set to English, "ghbdsn" becomes "привіт". It maps each character to its physical key equivalent in the target layout.',
  },
  {
    q: 'Which keyboard layouts are supported?',
    a: 'Currently: English (QWERTY) ↔ Ukrainian (ЙЦУКЕН) and English (QWERTY) ↔ Russian (ЙЦУКЕН). These cover the most common layout-switching mistakes for Cyrillic users.',
  },
  {
    q: 'How does it work technically?',
    a: 'Each physical key on a keyboard produces a different character depending on the active layout. The tool maintains a character-by-character mapping between layouts based on physical key positions. When you paste mistyped text, it replaces each character with the one the same key would produce in the correct layout.',
  },
  {
    q: 'Does it handle uppercase and special characters?',
    a: 'Yes. The mapping includes both lowercase and uppercase letters, as well as all punctuation and special characters that differ between layouts. Characters that are the same in both layouts (like digits and spaces) pass through unchanged.',
  },
  {
    q: 'Can I convert from Ukrainian/Russian to English?',
    a: 'Yes. The tool supports bidirectional conversion. If you typed English text with a Cyrillic layout active — for example "пшефги" instead of "github" — select the Ukrainian → English or Russian → English direction to fix it.',
  },
  {
    q: 'Why do some characters stay unchanged after conversion?',
    a: 'Characters that don\'t exist in the source layout\'s mapping (like digits, spaces, or emojis) are passed through as-is. This is by design — only characters that actually differ between the two layouts are converted.',
  },
  {
    q: 'Is this the same as transliteration?',
    a: 'No. Transliteration converts characters phonetically — for example, "ш" → "sh". This tool converts by physical key position — the "a" key produces "ф" in Ukrainian layout. The difference matters: transliteration creates readable romanized text, while layout conversion fixes typing mistakes.',
  },
  {
    q: 'Does the tool send my text to a server?',
    a: 'No. All conversion happens entirely in your browser using JavaScript. Your text never leaves your device — there is no network request involved.',
  },
];
