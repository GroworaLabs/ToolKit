import { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What are the three reversal modes?',
    a: 'Character mode reverses every character in the entire text (including spaces) so the whole string reads backwards. Word mode reverses the order of words while keeping the characters within each word intact. Line mode reverses the order of lines while keeping the words within each line unchanged.',
  },
  {
    q: 'Is reversed text readable by people?',
    a: 'Character-reversed text is generally not directly readable by humans — it requires deliberately reading backwards. However, word-reversed and line-reversed outputs are still made up of normal words; only the order changes. Mirror text (character reversal) is sometimes used in art, typography, and brain-training exercises.',
  },
  {
    q: 'What is mirror text and how is it different from reversed text?',
    a: 'Mirror text typically combines character reversal with Unicode mirror characters (like ɑ ʇ ɐ) so the text looks visually flipped. Character reversal alone just reverses character order — it does not swap letter shapes. This tool performs character-order reversal. For full visual mirroring with flipped Unicode characters, a dedicated fancy text generator would be needed.',
  },
  {
    q: 'Does reversing text work with emoji and special characters?',
    a: 'Yes for most cases. The tool uses Unicode-aware string splitting that treats multi-code-point emoji (like compound emoji using zero-width joiners) as single units where possible. Basic emoji and special characters reverse correctly. Extremely complex compound sequences may split differently on some systems depending on browser Unicode support.',
  },
  {
    q: 'Can I reverse text for a creative writing or design project?',
    a: 'Absolutely. Reversed text is used in album artwork, movie titles, riddles, escape room puzzles, graffiti, and logo design. Character-reversed text creates an immediate visual surprise effect. Word-reversed text creates an interesting poetic inversion — "the quick brown fox" becomes "fox brown quick the".',
  },
  {
    q: 'Does word reversal preserve punctuation?',
    a: 'Yes. Punctuation attached to a word (like commas, periods, and exclamation marks) is kept with that word. So "Hello, world!" reversed by words becomes "world! Hello," — the punctuation travels with its word. This is a deliberate choice to preserve natural reading of individual words.',
  },
  {
    q: 'What is line reversal used for?',
    a: 'Line reversal is useful for reversing the order of steps in a process (reading a list from bottom to top), reversing a chronological log to show newest entries first, or inverting the order of stanzas in a poem. It is a quick way to flip the reading order of any structured multi-line content.',
  },
  {
    q: 'Does it work with multi-line text in all modes?',
    a: 'Yes. Character mode reverses across all lines treating the entire text as one string (line breaks included). Word mode reverses across all words in all lines. Line mode reverses the sequence of lines while preserving each line\'s internal content. Choose the mode that matches what you want reversed.',
  },
];

export const reverseModes = [
  { mode: 'Characters', example: '"Hello" → "olleH"',       desc: 'Reverses every character in the entire text'           },
  { mode: 'Words',      example: '"foo bar" → "bar foo"',    desc: 'Reverses word order; characters within words unchanged' },
  { mode: 'Lines',      example: '"Line1\\nLine2" → "Line2\\nLine1"', desc: 'Reverses line order; each line unchanged'  },
];
