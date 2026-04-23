import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What SQL dialects does the formatter support?',
    a: 'The formatter handles standard SQL and is compatible with MySQL, PostgreSQL, SQLite, SQL Server (T-SQL), and Oracle. It formats DML statements (SELECT, INSERT, UPDATE, DELETE), DDL (CREATE TABLE, ALTER TABLE, DROP), and common clauses (WHERE, GROUP BY, ORDER BY, HAVING, LIMIT, OFFSET, JOIN variants). Dialect-specific syntax (e.g. PostgreSQL $$ dollar quoting) is preserved as-is.',
  },
  {
    q: 'Does the formatter validate my SQL syntax?',
    a: 'No — the formatter is a pretty-printer, not a validator. It reformats the structure without executing the query or connecting to a database. Syntax errors in your SQL will still be formatted as best as possible; they will not be detected or reported. Use your database client or an online SQL validator to check for syntax errors.',
  },
  {
    q: 'Can I choose between uppercase and lowercase keywords?',
    a: 'Yes. The keyword case option lets you output SQL keywords in UPPER CASE (SELECT, FROM, WHERE), lower case (select, from, where), or preserve the original casing from your input. Most style guides recommend uppercase keywords to visually distinguish them from identifiers, but team conventions vary.',
  },
  {
    q: 'How does the formatter handle comments?',
    a: 'Both single-line (-- comment) and multi-line (/* comment */) SQL comments are preserved in place. The formatter does not strip or reorder comments — they stay attached to the line or clause they preceded.',
  },
  {
    q: 'What indentation options are available?',
    a: 'You can choose 2-space, 4-space, or tab indentation. The formatter increases indentation for clauses inside parentheses (subqueries, function arguments, IN lists) and aligns JOIN conditions with their ON clause.',
  },
  {
    q: 'Does the formatter change my query logic?',
    a: 'No. The formatter is purely cosmetic — it adds or removes whitespace and newlines, and optionally changes keyword case. It never reorders clauses, rewrites expressions, or adds/removes parentheses. The formatted output is semantically identical to the input.',
  },
  {
    q: 'Can it format very long or minified SQL?',
    a: 'Yes — that is the primary use case. Paste a single-line minified query or a multi-page stored procedure and the formatter will add newlines, indentation, and consistent spacing throughout. There is no length limit enforced by the tool.',
  },
  {
    q: 'Is my SQL sent to a server?',
    a: 'No. All formatting runs entirely in your browser using JavaScript. Your queries are never transmitted, stored, or logged. You can use this tool offline and it works identically.',
  },
];

export const sidebarInfo = [
  { label: 'Dialects',  value: 'MySQL · PostgreSQL · SQLite · T-SQL' },
  { label: 'Indent',    value: '2 spaces · 4 spaces · tab' },
  { label: 'Keywords',  value: 'UPPER / lower / preserve' },
  { label: 'Privacy',   value: '100% local — no server' },
];
