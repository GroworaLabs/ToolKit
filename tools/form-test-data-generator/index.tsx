import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is the difference between this tool and a mock data generator?',
    a: 'A mock data generator produces many rows of realistic-looking data for the same fields (e.g., 100 users). This tool produces 12 test case categories for the same fields — one row per scenario. The goal is not volume but coverage: valid input, invalid format, boundary values, security payloads, empty strings, and Unicode edge cases. Use mock data for database seeding; use this tool for writing test cases.',
  },
  {
    q: 'What are boundary minimum and maximum test cases?',
    a: 'Boundary testing (also called boundary value analysis) tests the exact edges of the allowed range, not just the middle. For a field with minLength=3 and maxLength=20, boundary min sends exactly 3 characters and boundary max sends exactly 20. These are the values most likely to expose off-by-one errors in validation logic — validators often fail at exactly the boundary while passing values just inside it.',
  },
  {
    q: 'Why does the tool generate XSS and SQL injection payloads?',
    a: 'Security fields are part of a complete form test suite. XSS payloads (like <script>alert(1)</script>) test whether your application escapes output properly before rendering it in HTML. SQL injection strings (like \' OR \'1\'=\'1) test whether your database queries use parameterized statements. These are the two most common injection vulnerabilities in web forms (OWASP Top 10). Always run these against a test environment, never against production.',
  },
  {
    q: 'How do I use the CSV export in Cypress or Playwright?',
    a: 'Download the CSV, place it in your test fixtures folder, then load it in your test: in Cypress use cy.fixture(\'test-data.csv\') or a CSV parse library; in Playwright use fs.readFileSync and a CSV parser like papaparse. Each row in the CSV is one test case category. Iterate over rows with a data-driven test (cy.wrap or test.each in Playwright) to run all 12 scenarios automatically without hand-writing each case.',
  },
  {
    q: 'What does the "oversized" test case check?',
    a: 'The oversized case sends 10 000 characters (or 309 digits for number fields) to test that your application handles input longer than any reasonable real-world value. Validators that only check minimum length often forget maximum length. Databases with VARCHAR(255) columns will truncate or throw errors on oversized input. Some servers have default request body size limits (e.g., 1MB in Express) that oversized payloads can trigger.',
  },
  {
    q: 'Why is Unicode / emoji a separate test category?',
    a: 'Unicode characters expose a class of bugs that ASCII-only test data never surfaces: multi-byte UTF-8 sequences can break string length calculations (JavaScript\'s .length counts UTF-16 code units, not visual characters), right-to-left text can break UI layout, zero-width characters (U+200B, U+200C, U+200D) are invisible but still present, and some databases reject certain Unicode ranges depending on collation. Emoji like 😀 are encoded as surrogate pairs in UTF-16, which breaks naive string slicing.',
  },
  {
    q: 'Can I add custom field types not in the dropdown?',
    a: 'The current field types cover the most common HTML form inputs: text, email, password, number, phone, URL, date, select, textarea, and checkbox. Custom field types like IBAN, credit card, postcode, or colour pickers are not yet available. For these, use the "text" type with the appropriate min/max length constraints and supplement with manually written test cases for the format-specific rules.',
  },
  {
    q: 'Is any data I enter sent to a server?',
    a: 'No. The tool runs entirely in your browser using JavaScript. Field names, types, and constraints are never sent anywhere. You can verify this by opening DevTools → Network while using the tool — you will see zero outbound requests. The tool works offline.',
  },
];

export const sidebarInfo = [
  { label: 'Test categories', value: '12 per field' },
  { label: 'Field types',     value: '10 types' },
  { label: 'Max fields',      value: '10 fields' },
  { label: 'Export formats',  value: 'CSV · JSON · Markdown' },
  { label: 'Privacy',         value: '100% local — no server' },
];
