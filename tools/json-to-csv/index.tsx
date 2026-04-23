import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What JSON structure can be converted to CSV?',
    a: 'This tool accepts a JSON array of objects, where each object represents one row. Keys from the union of all objects become column headers. If objects have different keys, missing values appear as empty cells. A top-level object with an array property is also accepted — the tool will unwrap it automatically.',
  },
  {
    q: 'What delimiter options are available?',
    a: 'You can choose comma (,), semicolon (;), or tab (\\t) as the delimiter. Semicolons are standard in European locales where commas serve as decimal separators. Tab-separated values (TSV) open cleanly in Excel and Google Sheets without any import wizard.',
  },
  {
    q: 'How are special characters handled?',
    a: 'Values that contain the delimiter, double quotes, or newlines are wrapped in double quotes per RFC 4180. Double quotes inside a value are escaped by doubling them (a single " becomes ""). This ensures the output is safe to open in any spreadsheet application.',
  },
  {
    q: 'What happens with null or missing values?',
    a: 'Null and undefined values are converted to empty strings. If a row is missing a key that exists in other rows, the cell is left empty. The column structure is always determined by the full union of keys across all rows, so no data is silently lost.',
  },
  {
    q: 'Can I convert nested JSON objects?',
    a: 'Yes. Nested objects are flattened using dot notation. For example, {"user":{"name":"Alice","age":30}} becomes two columns: user.name and user.age. Arrays inside objects are serialised to a JSON string within the cell, since CSV has no native array type.',
  },
  {
    q: 'How do I open the CSV in Excel or Google Sheets?',
    a: 'For Excel on Windows: double-click a comma-delimited CSV, or use Data → From Text/CSV for other delimiters. For Google Sheets: File → Import → Upload, then choose "Custom separator" if you used semicolons or tabs. UTF-8 encoding is used so international characters display correctly.',
  },
  {
    q: 'Is there a row limit?',
    a: 'There is no enforced limit — the converter processes your full JSON array. Very large datasets (50 000+ rows) may slow the browser preview. In that case, use the Download button to get the full CSV file without rendering a large textarea.',
  },
  {
    q: 'Is my data sent anywhere?',
    a: 'No. All conversion runs entirely in your browser using JavaScript. Your JSON data never leaves your machine, is never sent to a server, and is never logged. You can verify this by going offline — the tool works identically without an internet connection.',
  },
];

export const sidebarInfo = [
  { label: 'Input',      value: 'JSON array of objects' },
  { label: 'Output',     value: 'RFC 4180 CSV / TSV' },
  { label: 'Delimiters', value: 'Comma · Semicolon · Tab' },
  { label: 'Encoding',   value: 'UTF-8' },
];
