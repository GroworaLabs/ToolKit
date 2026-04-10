import { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is the difference between plain text and regex mode?',
    a: 'In plain text mode, the find field is treated as a literal string — every character is searched for exactly as typed, including special characters like . * + ? ( ). In regex mode, the find field is interpreted as a regular expression pattern, allowing wildcard matching, character classes, quantifiers, and capture groups for advanced replacements.',
  },
  {
    q: 'How do I use capture groups in the replacement?',
    a: 'Enable regex mode. In the find field, wrap the part you want to capture in parentheses: (\\d+). In the replace field, reference it with $1, $2, etc. For example, find "(\\w+) (\\w+)" and replace with "$2 $1" to swap two words. This follows standard JavaScript RegExp replacement syntax.',
  },
  {
    q: 'What does the Global flag do?',
    a: 'When Global is enabled (default), every occurrence of the find pattern in the text is replaced. When disabled, only the first match is replaced. This mirrors the behavior of the g flag in regular expressions.',
  },
  {
    q: 'What does case-insensitive mode do?',
    a: 'With case-insensitive mode on, the find pattern matches regardless of letter case. So searching for "apple" would also match "Apple", "APPLE", and "aPpLe". The replacement text is inserted with the exact casing you typed in the replace field — the original case is not preserved.',
  },
  {
    q: 'How do I delete all occurrences of a word?',
    a: 'Leave the replace field empty and type the word (or pattern) you want to remove in the find field. Every match will be replaced with an empty string, effectively deleting it from the output.',
  },
  {
    q: 'Can I use regex to remove all blank lines?',
    a: 'Yes. Enable regex mode and enter ^\\s*$\\n? or ^\\n in the find field with the replace field empty. This matches lines that contain only whitespace (or nothing) followed by an optional newline and removes them. You can also use the Duplicate Line Remover or Whitespace Remover tools for simpler blank-line handling.',
  },
  {
    q: 'Are my changes applied live as I type?',
    a: 'Yes. The output updates in real time as you type in the input, find, or replace fields, and as you toggle any option. There is no button to click — the result is always up to date.',
  },
  {
    q: 'How do I escape special characters in plain text mode?',
    a: 'In plain text mode, you do not need to escape anything — all characters are literal. If you type "user.name" in the find field, it searches for exactly that string including the dot. Only in regex mode do you need to escape special characters by preceding them with a backslash (e.g., \\. to match a literal period).',
  },
  {
    q: 'What is the multiline flag and when do I need it?',
    a: 'The multiline flag (m) changes how ^ and $ work in regex. Without multiline, ^ matches the start of the entire text and $ matches the end. With multiline, ^ matches the start of each line and $ matches the end of each line. Enable it when your pattern uses ^ or $ to target line boundaries rather than text boundaries.',
  },
];

export const regexCheatSheet = [
  { pattern: '.',     desc: 'Any character except newline'     },
  { pattern: '\\d',  desc: 'Any digit (0–9)'                  },
  { pattern: '\\w',  desc: 'Word character (a-z, A-Z, 0-9, _)'},
  { pattern: '\\s',  desc: 'Whitespace (space, tab, newline)'  },
  { pattern: '+',     desc: 'One or more of the preceding'     },
  { pattern: '*',     desc: 'Zero or more of the preceding'    },
  { pattern: '?',     desc: 'Zero or one of the preceding'     },
  { pattern: '^',     desc: 'Start of line (with multiline on)'},
  { pattern: '$',     desc: 'End of line (with multiline on)'  },
  { pattern: '[abc]', desc: 'Any character in the set'         },
  { pattern: '(x)',   desc: 'Capture group — reference as $1'  },
  { pattern: 'x|y',  desc: 'Match x or y'                     },
];
