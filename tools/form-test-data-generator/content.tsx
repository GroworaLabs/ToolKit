export default function FormTestDataGeneratorContent() {
  return (
    <div className="tool-content">
      <h2>What Test Cases Are Generated and Why</h2>
      <p>
        Manual form testing typically covers two scenarios: the happy path (valid data that the form accepts) and one or two obvious error cases (empty required field, wrong email format). That leaves ten categories of inputs untested — and those are the ones that cause real production bugs, security vulnerabilities, and database errors.
      </p>
      <p>
        This tool generates 12 test case categories for every field in your form. Each category targets a different class of bug:
      </p>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>What it tests</th>
            <th>Bug class it catches</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>Valid (happy path)</strong></td><td>Correctly formatted input in the middle of the allowed range</td><td>Baseline — should always pass</td></tr>
          <tr><td><strong>Invalid format</strong></td><td>Wrong type (text where number expected, invalid email, non-boolean)</td><td>Missing or incorrect format validation</td></tr>
          <tr><td><strong>Boundary minimum</strong></td><td>Exact minimum value or exact minimum length</td><td>Off-by-one errors in validation (e.g., minLength=3 rejects 3 chars)</td></tr>
          <tr><td><strong>Boundary maximum</strong></td><td>Exact maximum value or exact maximum length</td><td>Off-by-one errors (e.g., maxLength=20 rejects 20 chars)</td></tr>
          <tr><td><strong>Below minimum</strong></td><td>One less than minimum value / one character short</td><td>Validation not enforced at the lower bound</td></tr>
          <tr><td><strong>Above maximum</strong></td><td>One more than maximum value / one character over</td><td>Validation not enforced at the upper bound; database column truncation</td></tr>
          <tr><td><strong>Empty / null</strong></td><td>Empty string, null, false for checkboxes</td><td>Missing required-field validation; null pointer exceptions in backend</td></tr>
          <tr><td><strong>Special characters</strong></td><td>{'<>"\'&\\/;{}'} and control characters</td><td>Improper escaping; broken HTML output; CSV injection</td></tr>
          <tr><td><strong>XSS payload</strong></td><td>{'<script>alert(1)</script>'} and img onerror variants</td><td>Missing output escaping; stored XSS vulnerabilities</td></tr>
          <tr><td><strong>SQL injection</strong></td><td>{"' OR '1'='1"} and DROP TABLE payloads</td><td>Non-parameterized SQL queries; classic injection vulnerabilities</td></tr>
          <tr><td><strong>Oversized</strong></td><td>10 000 characters / 309-digit numbers</td><td>Missing maxLength validation; database VARCHAR overflow; server body size limits</td></tr>
          <tr><td><strong>Unicode / emoji</strong></td><td>CJK characters, Arabic RTL, emoji, zero-width characters</td><td>UTF-8 encoding bugs; incorrect string length counts; broken UI layout with RTL text</td></tr>
        </tbody>
      </table>

      <h2>How to Use the Generated Data</h2>
      <p>
        The most effective workflow depends on whether your team does manual testing or automated testing — or both.
      </p>

      <h3>Manual testing workflow</h3>
      <ol>
        <li>Build your form in the constructor above (add fields, set types and constraints).</li>
        <li>Open your application's form in the browser alongside this tool.</li>
        <li>Click any cell in the table to copy its value to your clipboard.</li>
        <li>Paste it into the corresponding field and submit.</li>
        <li>Verify the application's response matches expectations: valid data is accepted, invalid data shows the correct error message, XSS payloads are not executed.</li>
      </ol>
      <p>
        The table is organized by row (test category) and column (field), so you can run one category across all fields at once, or one field across all categories. Both approaches are valid depending on whether you're doing horizontal (cross-field) or vertical (per-field) test coverage.
      </p>

      <h3>Automated testing with Cypress</h3>
      <p>
        Export the test data as CSV, place it in your <code>cypress/fixtures/</code> folder, then use it in a data-driven test:
      </p>
      <pre><code>{`// cypress/e2e/form.cy.ts
import Papa from 'papaparse';

describe('Registration form', () => {
  before(() => {
    cy.fixture('test-data.csv').then(raw => {
      const { data } = Papa.parse(raw, { header: true });
      Cypress.env('testCases', data);
    });
  });

  it('handles all test categories for email field', () => {
    Cypress.env('testCases').forEach(row => {
      cy.visit('/register');
      cy.get('[name="email"]').type(row.email);
      cy.get('[type="submit"]').click();

      if (row._category === 'Valid (happy path)') {
        cy.url().should('include', '/dashboard');
      } else {
        cy.get('.error-message').should('be.visible');
      }
    });
  });
});`}</code></pre>

      <h3>Automated testing with Playwright</h3>
      <pre><code>{`// tests/form.spec.ts
import { test, expect } from '@playwright/test';
import { parse } from 'papaparse';
import fs from 'fs';

const raw = fs.readFileSync('tests/fixtures/test-data.csv', 'utf-8');
const { data } = parse<Record<string, string>>(raw, { header: true });

for (const row of data) {
  test(\`form — \${row._category}\`, async ({ page }) => {
    await page.goto('/register');
    await page.fill('[name="email"]', row.email);
    await page.fill('[name="username"]', row.username);
    await page.click('[type="submit"]');

    if (row._category === 'Valid (happy path)') {
      await expect(page).toHaveURL(/dashboard/);
    } else {
      await expect(page.locator('.error')).toBeVisible();
    }
  });
}`}</code></pre>

      <h2>Field Types and What Gets Generated Per Type</h2>
      <p>
        Each field type maps to a specific set of test values per category. Here is the reference for the most important field types and their edge-case behaviours:
      </p>

      <h3>Email</h3>
      <p>
        Email validation is notoriously hard to get right. RFC 5321 allows addresses up to 254 characters total, with a 64-character local part and a 255-character domain. Common validator mistakes include: rejecting valid plus-addressing (<code>user+tag@example.com</code>), rejecting subdomains, or accepting strings that are structurally valid but have no TLD. The <em>Boundary max</em> case sends a 254-character address to verify your validator handles the RFC limit, not an arbitrary shorter limit.
      </p>
      <p>
        XSS payload for email: <code>{"\"><script>alert(1)</script>@x.com"}</code> — this tests whether your application escapes the email value before rendering it in HTML (e.g., in a confirmation email preview or admin panel).
      </p>

      <h3>Number</h3>
      <p>
        The boundary and range cases use the exact min and max values you configure. The <em>Invalid format</em> case sends the string <code>abc</code> to test that your backend validates type, not just the frontend. The <em>Special characters</em> case sends <code>1e308</code> (larger than JavaScript's <code>Number.MAX_VALUE</code>) to test floating-point overflow. The <em>Oversized</em> case sends 309 digits — more than a 64-bit float can represent — to test integer overflow in server-side code.
      </p>

      <h3>Password</h3>
      <p>
        The <em>Boundary minimum</em> case sends exactly <code>minLength</code> characters, which is the most common place for off-by-one errors in password validators. The <em>Unicode</em> case sends <code>P@$$w0rd™️🔐</code> — emoji in passwords are valid UTF-8 and should be accepted, but they cause issues with bcrypt implementations that silently truncate at 72 bytes (bcrypt's internal limit), meaning two passwords that look different might hash to the same value.
      </p>

      <h3>Select / dropdown</h3>
      <p>
        The most important test for select fields is the <em>Invalid format</em> case, which sends <code>INVALID_OPTION</code> — a value not in the options list. This tests whether your backend validates the enum value server-side, or whether it trusts the frontend select element. Frontend validation is bypassed trivially with browser DevTools or a direct API call; backend validation is mandatory.
      </p>

      <h2>Edge Cases Your Form Validation Should Handle</h2>
      <p>
        Beyond the 12 generated categories, here is a checklist of edge cases that break most custom validation logic:
      </p>
      <ul>
        <li><strong>Whitespace-only strings:</strong> <code>"   "</code> passes <code>if (value)</code> checks in many languages because a non-empty string is truthy. Always trim and check length after trimming.</li>
        <li><strong>Zero-width characters:</strong> Unicode U+200B (zero-width space), U+200C (zero-width non-joiner), and U+200D (zero-width joiner) are invisible in most UIs but count as characters in string length. A username of <code>"user​"</code> (with zero-width space) and <code>"user"</code> look identical but are different strings.</li>
        <li><strong>Null bytes:</strong> The character U+0000 (null byte) terminates strings in C-based backends. Sending a null byte in a form field can truncate string values or bypass length checks in languages that use C string functions.</li>
        <li><strong>Newlines in single-line fields:</strong> Text inputs accept <code>\n</code> via programmatic input even when the browser UI shows one line. A first-name field containing a newline can break CSV exports, email headers (CRLF injection), and single-line database columns.</li>
        <li><strong>Surrogate pairs:</strong> Emoji like 😀 are encoded as surrogate pairs in UTF-16, so <code>"😀".length === 2</code> in JavaScript despite being one visible character. A maxLength=10 validator using <code>.length</code> will allow 5 emoji (10 code units) even though the user sees only 5 characters, potentially overflowing a database column sized for 10 characters.</li>
        <li><strong>Right-to-left override character:</strong> U+202E forces right-to-left text direction for all following characters. Used in filenames and form fields to disguise <code>gpj.exe</code> as <code>exe.jpg</code> (reversed). Test especially on file name fields and user-display fields.</li>
        <li><strong>The number -0:</strong> In IEEE 754 floating point, <code>-0 === 0</code> is true, but <code>Object.is(-0, 0)</code> is false. Some serializers produce <code>"-0"</code> in JSON; some parsers treat it as zero, others as a negative zero. Test number fields with <code>-0</code> if your backend does financial or physics calculations.</li>
        <li><strong>Date edge cases:</strong> February 29 only exists in leap years. January 1, 1970 (Unix epoch) and December 31, 9999 (common max date) can trigger parsing errors in date libraries that don't handle extremes. Test date fields with <code>2024-02-29</code> (valid leap date), <code>2023-02-29</code> (invalid — 2023 is not a leap year), <code>1970-01-01</code>, and <code>9999-12-31</code>.</li>
      </ul>
    </div>
  );
}
