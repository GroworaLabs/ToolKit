import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'How many seconds are in a day?',
    a: 'There are exactly 86,400 seconds in a day. This comes from 60 seconds × 60 minutes × 24 hours = 86,400 seconds.',
  },
  {
    q: 'How many seconds are in a year?',
    a: 'A standard (non-leap) year contains 31,536,000 seconds (365 days × 86,400 seconds/day). A leap year has 31,622,400 seconds (366 × 86,400). This converter uses 365 days for a standard year.',
  },
  {
    q: 'How many weeks are in a year?',
    a: 'A year has exactly 52 weeks and 1 extra day (2 in a leap year). The average across the 400-year Gregorian calendar cycle is 52.1775 weeks per year.',
  },
  {
    q: 'Why is a month not shown as a conversion unit?',
    a: 'Months are not a fixed-length unit — they range from 28 to 31 days. For precise calculations, days or weeks are always preferred. If you need months, use 30.4375 days as the average (365.25 ÷ 12).',
  },
  {
    q: 'Does this converter account for leap years?',
    a: 'The converter uses 365 days per year as the standard. For calculations spanning multiple years where leap years matter, add 1 day every 4 years (roughly 0.0068% correction).',
  },
  {
    q: 'How do I convert seconds to hours in code?',
    a: 'Divide by 3,600 (60 × 60). For example: hours = seconds / 3600. In most languages, use integer division if you want whole hours: hours = Math.floor(seconds / 3600).',
  },
  {
    q: 'What is the difference between a day and 86,400 seconds in practice?',
    a: 'For most purposes they are identical. However, some days have 86,401 seconds due to leap seconds inserted by international timekeeping standards (UTC). For software, it is almost always safe to treat a day as exactly 86,400 seconds.',
  },
  {
    q: 'Can I use this converter for programming cache TTLs?',
    a: 'Yes — this is one of the most common use cases. Many caches (Redis, HTTP headers, CDNs) require TTL in seconds. Enter the number of days, hours, or weeks and read off the seconds value directly.',
  },
];

export const sidebarFeatures = [
  { label: 'All units at once',    desc: 'Enter any value and see seconds, minutes, hours, days, weeks and years simultaneously.', color: 'var(--green)', bg: 'var(--green-lt)'  },
  { label: 'Bidirectional',        desc: 'Convert from any unit — not just seconds. Start from days, hours, or weeks.', color: 'var(--blue)',  bg: 'var(--blue-lt)'   },
  { label: 'Instant results',      desc: 'No button to click — results update live as you type.', color: 'var(--amber)', bg: 'var(--amber-lt)' },
  { label: 'Zero data collection', desc: 'All conversion runs locally in your browser. Nothing is transmitted to any server.', color: 'var(--ink-2)', bg: 'var(--border)' },
];
