import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What types of fake data can I generate?',
    a: 'The generator supports: full name, first name, last name, email address, phone number, street address, city, country, postal code, company name, job title, username, UUID (v4), integer, float, boolean, date, URL, IP address (v4), colour (hex), and lorem ipsum paragraph. You can combine any fields in a single dataset.',
  },
  {
    q: 'How realistic is the generated data?',
    a: 'Names, cities, and companies are drawn from large curated lists of real-world values to produce believable test data. Emails are constructed from the generated name + a realistic domain. Phone numbers follow common national formats. The goal is plausible-looking data for UI testing and database seeding — not data that passes real-world validation.',
  },
  {
    q: 'What output formats are supported?',
    a: 'You can export as JSON (array of objects) or CSV. JSON is best for seeding APIs and databases. CSV opens directly in Excel and Google Sheets. Future formats (SQL INSERT statements, TypeScript types) are planned.',
  },
  {
    q: 'Can I generate data with a consistent seed?',
    a: 'The generator uses the browser\'s Math.random(), which is not seeded. If you need reproducible datasets for testing, generate the data once, download the file, and commit it to your test fixtures. Alternatively, use a seeded library like Faker.js in your test setup for programmatic reproducibility.',
  },
  {
    q: 'How many rows can I generate?',
    a: 'Up to 1 000 rows per generation. For datasets larger than ~500 rows, use the Download button rather than copying from the preview — large text areas can be slow to scroll and copy reliably.',
  },
  {
    q: 'Are generated emails valid for sending?',
    a: 'No. Generated emails like alice.johnson@example.com use domains such as example.com, example.org, and test.dev — domains that are reserved or unlikely to have real mailboxes. They are safe for UI testing, database seeding, and demos without accidentally emailing real people.',
  },
  {
    q: 'Can I use the generated data in my application?',
    a: 'Yes — freely. The generated data is random and not bound by any licence. It is intended for development, testing, demos, database seeding, and UI mockups. Do not use generated data to mislead anyone about the existence of real people or organisations.',
  },
  {
    q: 'Is my data sent anywhere?',
    a: 'No. All generation happens locally in your browser using JavaScript. No data is sent to a server. You can use this tool offline — disconnect from the internet and it works identically.',
  },
];

export const sidebarInfo = [
  { label: 'Max rows',  value: '1 000 per generation' },
  { label: 'Formats',   value: 'JSON · CSV' },
  { label: 'Field types', value: '20+ field types' },
  { label: 'Privacy',   value: '100% local — no server' },
];
