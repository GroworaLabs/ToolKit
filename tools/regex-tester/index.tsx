import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What regex flavour does this tester use?',
    a: 'This tester uses JavaScript\'s built-in RegExp engine, which follows the ECMAScript specification. It supports most common regex features including lookaheads, named groups (?<name>...), and Unicode. It does not support lookbehinds in all browsers or PCRE-specific syntax.',
  },
  {
    q: 'What do the flags mean?',
    a: 'g (global) — find all matches instead of stopping at the first. i (insensitive) — ignore case when matching. m (multiline) — make ^ and $ match the start/end of each line, not just the whole string. s (dotall) — make . match newline characters as well.',
  },
  {
    q: 'How do I use named capture groups?',
    a: 'Use the syntax (?<name>pattern). For example, (?<year>\\d{4})-(?<month>\\d{2}) will capture year and month as named groups. The match details panel shows captured group names and values.',
  },
  {
    q: 'How does replacement work?',
    a: 'Enable the Replace toggle and enter a replacement string. Use $1, $2... to reference capture groups by number, or $<name> for named groups. For example, replacing (\\w+) (\\w+) with $2 $1 swaps two words.',
  },
  {
    q: 'Why does my regex cause an infinite loop?',
    a: 'Zero-length matches (like \\b or a* on empty input) can cause infinite loops with the global flag. This tester automatically advances the cursor to prevent hanging. If you get unexpected results, try removing the g flag.',
  },
  {
    q: 'What is the difference between greedy and lazy quantifiers?',
    a: 'Greedy quantifiers (*, +, {n,m}) match as much as possible. Lazy quantifiers (*?, +?, {n,m}?) match as little as possible. Example: given "<b>bold</b>", the pattern <.*> greedily matches the entire string, while <.*?> matches only "<b>". Use lazy quantifiers when you need the shortest possible match between delimiters.',
  },
  {
    q: 'How do lookaheads and lookbehinds work?',
    a: 'Lookaheads and lookbehinds are zero-width assertions — they check a position without consuming characters. Positive lookahead (?=...) asserts what follows. Negative lookahead (?!...) asserts what does not follow. Positive lookbehind (?<=...) asserts what precedes. Example: \\d+(?= dollars) matches a number only when followed by " dollars".',
  },
  {
    q: 'How do I match a literal dot, bracket, or other special character?',
    a: 'Escape it with a backslash: \\. matches a literal dot, \\( matches a literal parenthesis, \\$ matches a dollar sign. Inside a character class [ ], most special characters lose their meaning — [.] matches a literal dot without escaping. Characters that must always be escaped outside a class: . * + ? ^ $ { } [ ] ( ) | \\.',
  },
];

export const cheatSheet = [
  { syntax: '.',        desc: 'Any character except newline'              },
  { syntax: '\\d',      desc: 'Digit [0-9]'                              },
  { syntax: '\\w',      desc: 'Word character [a-zA-Z0-9_]'              },
  { syntax: '\\s',      desc: 'Whitespace (space, tab, newline)'         },
  { syntax: '\\b',      desc: 'Word boundary'                            },
  { syntax: '^',        desc: 'Start of string (or line with m flag)'    },
  { syntax: '$',        desc: 'End of string (or line with m flag)'      },
  { syntax: '*',        desc: 'Zero or more (greedy)'                    },
  { syntax: '+',        desc: 'One or more (greedy)'                     },
  { syntax: '?',        desc: 'Zero or one / makes quantifier lazy'      },
  { syntax: '{n,m}',    desc: 'Between n and m repetitions'              },
  { syntax: '[abc]',    desc: 'Character class — a, b or c'              },
  { syntax: '[^abc]',   desc: 'Negated class — not a, b or c'            },
  { syntax: '(abc)',    desc: 'Capture group'                             },
  { syntax: '(?:abc)',  desc: 'Non-capturing group'                       },
  { syntax: '(?<n>...)',desc: 'Named capture group'                       },
  { syntax: 'a|b',      desc: 'Alternation — a or b'                     },
  { syntax: '(?=...)',  desc: 'Positive lookahead'                        },
  { syntax: '(?!...)',  desc: 'Negative lookahead'                        },
];
