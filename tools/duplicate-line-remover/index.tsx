import { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'How does the duplicate line remover work?',
    a: 'The tool splits your text into lines, tracks which lines it has already seen, and outputs only the first occurrence of each line. Subsequent duplicates are discarded. Everything runs locally in your browser — no text is sent to any server.',
  },
  {
    q: 'What is case-sensitive vs case-insensitive matching?',
    a: 'With case-sensitive matching (default), "Apple" and "apple" are treated as two different lines and both kept. With case-insensitive matching, they are treated as the same line and only the first occurrence is kept. The output preserves the original casing of the first occurrence regardless of the setting.',
  },
  {
    q: 'Does it remove blank lines too?',
    a: 'You can choose. By default, blank lines between content are preserved since they often represent intentional structure. Toggle the "Remove blank lines" option to strip all empty lines from the output. Blank lines that appear twice (like double paragraph breaks) are deduplicated just like content lines.',
  },
  {
    q: 'Can I sort the output while removing duplicates?',
    a: 'Yes. The sort option sorts lines alphabetically after deduplication. This is useful for cleaning up word lists, email lists, config files, and CSV data where sorted output makes further processing easier. Sorting is applied after deduplication, not before.',
  },
  {
    q: 'What is the maximum text size this tool can handle?',
    a: 'The tool runs entirely in your browser and can handle millions of characters limited only by your browser\'s memory. For very large files (hundreds of thousands of lines), processing may take a second or two. There is no server-side limit.',
  },
  {
    q: 'Will leading or trailing spaces cause lines to not be deduplicated?',
    a: 'Yes, by default. "  apple  " and "apple" are treated as different lines because of the leading/trailing spaces. Enable the "Trim whitespace" option to normalize spacing before comparison, so lines that differ only in surrounding spaces are treated as duplicates.',
  },
  {
    q: 'What is a practical use case for removing duplicate lines?',
    a: 'Common uses include: cleaning email lists before a campaign send, deduplicating keyword lists for SEO campaigns, normalizing config files with accidental repeated entries, removing duplicate items from imported spreadsheet data, and cleaning grep/log output that has repeated matches.',
  },
  {
    q: 'Can I use this to deduplicate CSV files?',
    a: 'Yes, for row-level deduplication. If your CSV has duplicate entire rows (same values across all columns), this tool will remove them cleanly. For column-specific deduplication (e.g., remove rows with a duplicate email column while keeping other columns), a spreadsheet tool or the CSV to JSON converter with scripting would be more appropriate.',
  },
  {
    q: 'Is there a difference between removing duplicates and removing similar lines?',
    a: 'This tool removes exact duplicates (optionally case-insensitive). It does not perform fuzzy matching — "apple" and "apples" are considered different and both kept. For fuzzy or semantic deduplication, you would need a more specialized tool.',
  },
];

export const useCases = [
  { label: 'Email & contact lists',  desc: 'Remove repeated email addresses before a campaign send'    },
  { label: 'Keyword research',        desc: 'Deduplicate keyword lists merged from multiple sources'      },
  { label: 'Log file cleanup',        desc: 'Collapse repeated error log entries for easier analysis'     },
  { label: 'CSV row deduplication',   desc: 'Remove identical rows from exported spreadsheet data'       },
  { label: 'Config files',            desc: 'Normalize config with accidental repeated directives'        },
  { label: 'Word & vocabulary lists', desc: 'Clean up wordlists before use in scripts or generators'     },
];
