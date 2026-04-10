import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is CSV and why would I convert it to JSON?',
    a: 'CSV (Comma-Separated Values) is a plain-text format for tabular data — rows of values separated by a delimiter (usually a comma). JSON (JavaScript Object Notation) is the standard data format for web APIs, NoSQL databases, and JavaScript applications. Converting CSV to JSON lets you import spreadsheet data directly into APIs, MongoDB, Firebase, or any JavaScript-based pipeline without writing a custom parser.',
  },
  {
    q: 'Does the first row have to be a header row?',
    a: 'No, but using header rows produces much more useful output. When "Use first row as headers" is enabled, each JSON object\'s keys are taken from that header row — giving you {"name":"Alice","age":30} instead of ["Alice","30"]. If your CSV has no headers, disable the option and you\'ll get an array of arrays instead.',
  },
  {
    q: 'What delimiters are supported?',
    a: 'This converter supports comma (,), semicolon (;), tab (\\t), and pipe (|) delimiters. Semicolon-delimited files are common exports from European Excel installations where comma is the decimal separator. Tab-separated values (TSV) are often exported by Google Sheets and database tools.',
  },
  {
    q: 'How are quoted fields handled?',
    a: 'The parser correctly handles RFC 4180 quoting rules. A field wrapped in double quotes can contain commas, newlines, and other special characters without breaking the structure. A literal double-quote inside a quoted field must be escaped as two consecutive double-quotes ("").',
  },
  {
    q: 'What happens to empty fields?',
    a: 'Empty fields between delimiters — such as "Alice,,30" — are preserved as empty strings ("") in the JSON output. This is intentional: silently dropping empty fields would misalign column indexes. If you need null instead of empty string, a small post-processing step in your code can handle that: obj[key] = val === "" ? null : val.',
  },
  {
    q: 'Are numbers and booleans auto-detected?',
    a: 'Yes. The converter attempts to coerce values: numeric strings like "42" and "3.14" become JSON numbers, and "true"/"false" (case-insensitive) become JSON booleans. Everything else stays a string. This matches the behavior of most CSV-to-JSON libraries and prevents downstream type errors when feeding data into APIs or databases.',
  },
  {
    q: 'What is the maximum file size this tool supports?',
    a: 'Because all processing runs locally in your browser, practical limits depend on your device\'s memory. In testing, files up to several megabytes parse in under a second on modern hardware. For very large datasets (tens of MB), consider a server-side tool or a streaming parser like Papa Parse in Node.js.',
  },
  {
    q: 'Is my CSV data sent to any server?',
    a: 'No. The entire conversion runs in JavaScript inside your browser tab. Your CSV content never leaves your device. This makes the tool safe for confidential data — internal reports, user exports, financial spreadsheets — without any privacy risk.',
  },
  {
    q: 'How do I handle CSV files with special characters or non-ASCII text?',
    a: 'Modern browsers handle UTF-8 text natively, so accented characters, CJK characters, and emoji paste correctly from the clipboard. If you\'re reading a file saved in a legacy encoding (Windows-1252, Latin-1), re-open it in your text editor, save it as UTF-8, then paste the content here.',
  },
  {
    q: 'What should I do with the JSON output after converting?',
    a: 'Common next steps: paste it into the JSON Formatter on this site to validate and prettify it before committing to a codebase; use it as a fixture file for unit tests; POST it to an API endpoint; or import it directly into MongoDB with mongoimport --jsonArray. The downloaded .json file can also be used as a data source in tools like D3.js, Vega, or any charting library.',
  },
];

export const sidebarFeatures = [
  { label: 'Auto-detect types',  desc: 'Numbers and booleans are coerced automatically — no post-processing needed.',         color: 'var(--green)',   bg: 'var(--green-lt)'  },
  { label: 'RFC 4180 quoting',   desc: 'Quoted fields with commas, newlines and escaped quotes parse correctly.',             color: 'var(--blue)',    bg: 'var(--blue-lt)'   },
  { label: 'Custom delimiters',  desc: 'Supports comma, semicolon, tab and pipe — covers all common CSV variants.',           color: 'var(--amber)',   bg: 'var(--amber-lt)'  },
  { label: 'Download JSON',      desc: 'Save the result as a .json file directly from your browser.',                         color: 'var(--ink-2)',   bg: 'var(--border)'    },
];
