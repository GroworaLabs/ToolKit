import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is a text diff and how does it work?',
    a: 'A diff (from "difference") compares two versions of a text and identifies which lines were added, removed, or remain unchanged. This tool uses the LCS (Longest Common Subsequence) algorithm — the same core approach used by Git, Unix diff, and most code review tools. It finds the largest set of lines common to both texts, then marks everything else as an insertion or deletion.',
  },
  {
    q: 'What is the difference between unified and split view?',
    a: 'Unified view shows both texts merged into a single panel — deletions (red, prefixed with −) and insertions (green, prefixed with +) are interleaved in the order they appear. Split view places the original text on the left and the modified text on the right, aligned line-by-line, which makes it easier to see what changed in each specific area. Both views show the same information; split view is generally more readable for large changes.',
  },
  {
    q: 'What does "ignore whitespace" do?',
    a: 'When enabled, lines are compared after stripping leading/trailing spaces and collapsing internal whitespace sequences to a single space. A line that only differs in indentation or trailing spaces will be treated as equal. The original formatting is still displayed in the output — only the comparison logic changes. This is equivalent to git diff -w.',
  },
  {
    q: 'What does "ignore case" do?',
    a: 'When enabled, uppercase and lowercase letters are treated as identical during comparison. "Hello" and "hello" will be considered the same line. Useful when comparing configs, SQL, or HTML where casing may vary without semantic difference.',
  },
  {
    q: 'Is there a size limit for the texts I can compare?',
    a: 'The LCS algorithm used here is O(n × m) in both time and memory, where n and m are the line counts of each text. For texts up to a few thousand lines each, diffing is instant. For very large files (tens of thousands of lines), the comparison may slow down — in that case, a command-line tool like `diff` or `git diff` is more appropriate.',
  },
  {
    q: 'How do I copy just the diff output?',
    a: 'Click the "Copy diff" button above the output panel. This copies the result in unified diff format — deletions prefixed with "−" and insertions prefixed with "+" — which you can paste into a ticket, Slack message, or documentation.',
  },
  {
    q: 'Can I compare code files with this tool?',
    a: 'Yes. Paste any text — source code, config files, JSON, Markdown, SQL, log excerpts — into the two panels. The tool is language-agnostic. For structured formats like JSON, consider also using the JSON Formatter on this site to normalise indentation before diffing, so formatting differences don\'t obscure logical changes.',
  },
  {
    q: 'What do the statistics (added/removed/unchanged) mean?',
    a: 'Added = lines that appear in the modified text but not in the original. Removed = lines that appear in the original but not in the modified. Unchanged = lines identical in both versions (after applying any active options like ignore whitespace/case). These counts refer to lines, not characters.',
  },
  {
    q: 'How is this different from running `diff` in a terminal?',
    a: 'Functionally similar — both use LCS-based algorithms and produce the same categories of changes. The key differences are convenience: this tool runs in your browser with no installation, shows colour-coded output, and lets you paste text directly. Terminal diff operates on files, supports more flags, and handles very large files more efficiently. For quick comparisons, this tool is faster; for scripting or automation, use the terminal.',
  },
];

export const diffLegend = [
  { symbol: '+', label: 'Added',     desc: 'Line exists in Modified but not in Original', color: 'var(--green)',      bg: 'var(--green-lt)'  },
  { symbol: '−', label: 'Removed',   desc: 'Line exists in Original but not in Modified', color: '#dc2626',           bg: '#fef2f2'           },
  { symbol: ' ', label: 'Unchanged', desc: 'Line is identical in both texts',              color: 'var(--ink-3)',      bg: 'var(--page-bg)'   },
];
