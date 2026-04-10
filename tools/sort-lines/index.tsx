import { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What sort modes are available?',
    a: 'The tool offers four sort modes: Alphabetical (A→Z), Reverse Alphabetical (Z→A), By Length (shortest to longest, with alphabetical tie-breaking), and Numeric (sorts lines that start with a number by their numeric value, not lexicographically). You can also reverse any mode to get descending order.',
  },
  {
    q: 'What is the difference between alphabetical and numeric sorting?',
    a: 'Alphabetical sorting compares characters from left to right, so "10" comes before "2" (because "1" < "2"). Numeric sorting extracts the leading number from each line and compares by value, so "2" comes before "10". Use numeric sort for version numbers, rankings, scores, and any list where numbers should sort by value.',
  },
  {
    q: 'Can I sort case-insensitively?',
    a: 'Yes. By default, uppercase letters sort before lowercase (A–Z before a–z). With case-insensitive sorting enabled, "banana" and "Banana" are treated identically, producing a more natural alphabetical order. The output preserves the original casing of each line.',
  },
  {
    q: 'Does the sort preserve blank lines?',
    a: 'By default blank lines are included in the sort (they sort to the top since empty strings sort before any character). Enable the Remove blank lines option to strip them before sorting for cleaner output.',
  },
  {
    q: 'Can I remove duplicates while sorting?',
    a: 'Yes. The Remove duplicates option deduplicates lines after sorting, keeping only the first occurrence of each line. For a fully clean sorted unique list, enable both Remove duplicates and Sort lines together.',
  },
  {
    q: 'Is this the same as the Unix sort command?',
    a: 'Alphabetical sort corresponds to `sort` (case-sensitive) or `sort -f` (case-insensitive). Numeric sort corresponds to `sort -n`. Reverse corresponds to the -r flag. The Remove duplicates option corresponds to `sort -u`. The primary difference is that this tool runs in your browser with no installation and works on any operating system.',
  },
  {
    q: 'How does length-based sorting work with ties?',
    a: 'When two lines have the same length, they are sorted alphabetically as a tiebreaker. This means length-sorted output is fully deterministic — the same input always produces the same output regardless of how the lines were ordered in the input.',
  },
  {
    q: 'Can I sort a list of numbers stored as text?',
    a: 'Yes, use Numeric sort mode. It extracts the leading number from each line (e.g., "42 apples" → 42, "7 bananas" → 7) and sorts by that value. Lines with no leading number are sorted to the end. This is useful for sorting numbered lists, version strings, and ranked exports.',
  },
  {
    q: 'What is the maximum number of lines this tool can sort?',
    a: 'The tool runs entirely in your browser using JavaScript\'s built-in array sort. It can handle hundreds of thousands of lines limited only by available browser memory. Sorting 100,000 lines typically completes in under 100 milliseconds.',
  },
];

export const sortModes = [
  { mode: 'A → Z',       desc: 'Standard alphabetical order, case-sensitive'              },
  { mode: 'Z → A',       desc: 'Reverse alphabetical — good for descending name lists'    },
  { mode: 'Shortest first', desc: 'Lines sorted by character count, shortest to longest'  },
  { mode: 'Longest first',  desc: 'Lines sorted by character count, longest to shortest'  },
  { mode: 'Numeric ↑',   desc: 'Sort by leading number value, ascending'                  },
  { mode: 'Numeric ↓',   desc: 'Sort by leading number value, descending'                 },
];
