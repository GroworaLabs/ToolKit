import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is a Unix timestamp?',
    a: 'A Unix timestamp (also called epoch time or POSIX time) is the number of seconds that have elapsed since 00:00:00 UTC on 1 January 1970 — the "Unix epoch". It is a timezone-independent, single-integer representation of any moment in time, making it ideal for storage, sorting, and arithmetic in software systems.',
  },
  {
    q: 'What is the difference between seconds and milliseconds timestamps?',
    a: 'Unix timestamps in seconds are 10 digits long (e.g. 1704067200 for 2024-01-01). Millisecond timestamps are 13 digits long (e.g. 1704067200000) and are used in JavaScript (Date.now()), Java, and many APIs. This tool auto-detects which format you\'ve entered based on the number of digits. You can also explicitly select the unit.',
  },
  {
    q: 'What output formats does this converter show?',
    a: 'The converter shows: ISO 8601 (2024-01-01T00:00:00Z — the international standard), RFC 2822 (Mon, 01 Jan 2024 00:00:00 +0000 — used in email headers), UTC date and time, your local date and time in your browser\'s timezone, relative time (e.g. "3 days ago"), and the day of week.',
  },
  {
    q: 'How do I get the current Unix timestamp?',
    a: 'Click the "Now" button to instantly load the current timestamp. The displayed values update in real time while "Now" is active. In code: JavaScript uses Date.now() for milliseconds or Math.floor(Date.now()/1000) for seconds; Python uses time.time(); Go uses time.Now().Unix().',
  },
  {
    q: 'What is the maximum date a Unix timestamp can represent?',
    a: 'A 32-bit signed integer can store timestamps up to 2,147,483,647 — which corresponds to 2038-01-19T03:14:07Z. This is the "Year 2038 problem". Modern systems use 64-bit integers which can represent dates billions of years into the future. This tool uses JavaScript\'s 64-bit floating-point numbers, so it handles any practical date range.',
  },
  {
    q: 'Can I convert a human-readable date to a Unix timestamp?',
    a: 'Yes. Use the date/time input fields on the right side of the converter. Select a date and time and the corresponding Unix timestamp (in both seconds and milliseconds) is shown instantly. The input treats the entered time as your local timezone unless you explicitly enter a UTC offset.',
  },
  {
    q: 'Why do different programming languages give different timestamps for the same moment?',
    a: 'They shouldn\'t if implemented correctly — Unix time is timezone-independent. Common sources of discrepancy: JavaScript\'s Date uses milliseconds while most others use seconds; local time vs UTC confusion; or clock skew between systems. Always store timestamps in UTC and convert to local time only at the display layer.',
  },
  {
    q: 'What is ISO 8601 and why is it preferred?',
    a: 'ISO 8601 is the international standard for date and time representation (e.g. 2024-01-15T09:30:00Z). The trailing "Z" means UTC. It is unambiguous, sortable lexicographically, and universally parseable by every major programming language and database. It is the recommended format for APIs, logs, and data exchange.',
  },
];

export const commonTimestamps = [
  { label: 'Unix epoch (t=0)',     ts: 0,           date: '1970-01-01T00:00:00Z' },
  { label: 'Y2K',                  ts: 946684800,   date: '2000-01-01T00:00:00Z' },
  { label: 'Year 2038 limit',      ts: 2147483647,  date: '2038-01-19T03:14:07Z' },
];
