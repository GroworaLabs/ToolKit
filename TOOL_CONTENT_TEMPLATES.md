# Tool page content templates

Six content templates for `content.tsx` files, grouped by tool type. Every new tool must use the matching template. Every existing tool being rewritten for AdSense compliance must also follow its template.

**Why templates matter:** AdSense "Low value content" rejection (2026-05-14) was caused by all 70 tool pages having identical generic FAQ structure. These templates enforce unique, type-specific content sections that cannot be copy-pasted across tools.

**Rule:** FAQ questions must be specific to THIS tool, not generic ("Is it free?", "What is X?"). Each template below lists the kinds of questions that belong in that tool's FAQ.

---

## Template 1: Security / Crypto

**Tools:** bcrypt-generator, jwt-generator, totp-generator, password-generator, hash tools (MD5, SHA-256, SHA-512, HMAC), api-key-generator, encryption-tool, ssl-certificate-decoder, random-token-generator

**Required sections (in order after widget):**

```
[Widget]

## How [tool name] works
  - Algorithm steps, internals, math — unique to each tool
  - E.g. for bcrypt: the Blowfish key schedule, what cost factor controls
  - E.g. for JWT: header.payload.signature structure, base64url encoding

## Code examples
  - Show real implementation in Node.js + Python (minimum two languages)
  - For generators: show how to VERIFY / USE the output, not just generate it
  - E.g. for JWT: how to verify a token server-side with jsonwebtoken / PyJWT

## [Tool name] vs alternatives
  - Comparison table: this tool's algorithm vs 2–3 alternatives
  - Columns: speed, security level, use case, standard/RFC
  - E.g. bcrypt vs argon2 vs scrypt; MD5 vs SHA-256 vs SHA-512; TOTP vs HOTP

## Security best practices
  - OWASP / RFC recommendations relevant to this specific algorithm
  - Common developer mistakes and how to avoid them
  - What NOT to use this tool for

[FAQ — 5 questions specific to this tool's algorithm and security properties]
```

---

## Template 2: Formatter / Validator

**Tools:** sql-formatter, json-formatter, html-beautifier, html-minifier, javascript-minifier, css-minifier, markdown-to-html, html-to-markdown, xml-to-json, json-to-yaml, json-schema-generator

**Required sections:**

```
[Widget]

## Formatting rules this tool applies
  - Explicit list of rules: indentation, keyword casing, line breaks, etc.
  - Not generic — describe THIS formatter's specific behavior
  - E.g. for SQL: UPPER keyword casing, newline before each clause, indent subqueries

## Before and after example
  - Show a realistic messy input (inline code block)
  - Show the formatted output (inline code block)
  - Briefly explain what changed and why it matters for readability

## Integration in your workflow
  - How to use this in a real project: IDE plugin, CLI equivalent, CI/CD hook
  - E.g. for SQL: "add sqlfluff to your pre-commit hooks to enforce this automatically"
  - E.g. for JSON: "use prettier --parser json in your CI pipeline"

## Common syntax errors this formatter catches
  - 3–5 real examples of mistakes the formatter surfaces or fixes
  - With before/after code snippets

[FAQ — 5 questions specific to this format's rules and edge cases]
```

---

## Template 3: Generator

**Tools:** gitignore-generator, mock-data-generator, agent-rules-generator, nginx-redirect-generator, robots-txt-generator, htaccess-generator, lorem-json, password-generator (overlap with Security), qr-code-generator, favicon-generator

**Required sections:**

```
[Widget]

## What gets generated and why this format
  - Explain the output format: what each part means
  - Why this specific format/standard is used (RFC, convention, platform requirement)

## Step-by-step: from generation to use
  - Numbered tutorial: generate → copy/download → where to place it → verify it works
  - Include the actual command or config snippet to verify
  - E.g. for gitignore: "git status should no longer show node_modules"
  - E.g. for nginx redirect: "nginx -t && nginx -s reload to apply"

## Use case scenarios
  - 3–4 specific real-world scenarios with different settings
  - E.g. for gitignore: Next.js monorepo, Python + venv, Docker project
  - E.g. for mock data: seeding a dev DB, Postman collection, load testing

## What to customize for your project
  - What settings to change from the defaults and why
  - Common mistakes when configuring the output

[FAQ — 5 questions about the generated format and common configuration choices]
```

---

## Template 4: Converter

**Tools:** All unit converters (length, weight, temperature, area, volume, speed, pressure, frequency, angle, fuel-economy, cooking, data-storage), number-base-converter, css-unit-converter, pixel-rem-converter, timestamp-converter, roman-numeral-converter, currency-converter, color-converter

**Required sections:**

```
[Widget]

## Conversion reference table
  - Full table of all supported units with conversion factors / formulas
  - This is standalone useful content — a reference a developer can bookmark
  - Include both directions where relevant (px→rem and rem→px)

## The formula
  - Show the exact conversion formula in plain math and as a code snippet
  - E.g. for px→rem: rem = px / base-font-size (default 16px)
  - E.g. for temperature: °F = (°C × 9/5) + 32

## When developers encounter this
  - Specific real-world scenarios where this conversion is needed
  - Edge cases: floating point precision, integer overflow, Unicode for text converters
  - Platform-specific quirks (CSS rem vs em, Unix timestamps in seconds vs ms)

## Code snippet
  - One-liner implementation in JavaScript or Python
  - Shows developers how to do this programmatically in their own code

[FAQ — 5 questions about precision, edge cases, and platform differences]
```

---

## Template 5: Analyzer / Checker

**Tools:** color-contrast-checker, password-strength-checker, token-counter, ai-cost-calculator, ai-model-comparison, reading-time-calculator, text-statistics

**Required sections:**

```
[Widget]

## What is being measured and how
  - The exact methodology, formula, or standard used
  - E.g. for contrast: WCAG 2.1 relative luminance formula with the full equation
  - E.g. for token counter: BPE tokenization, why the same text gives different counts per model
  - E.g. for password strength: which entropy formula, what constitutes a character set

## Score / result scale explained
  - What each result level means in practice
  - Benchmark examples: "a score of X means roughly Y"
  - E.g. for contrast: AA vs AAA, what 4.5:1 looks like visually
  - E.g. for password strength: how many bits of entropy for "secure" in 2026

## Real-world examples
  - 3–4 concrete examples showing bad → good results
  - With the actual values so the reader can benchmark their own work

## How to use this in automated testing / CI
  - A code snippet or tool command to check this programmatically
  - E.g. for contrast: axe-core in jest, pa11y in CI
  - E.g. for token count: tiktoken Python library usage

[FAQ — 5 questions about the scoring methodology and how to improve results]
```

---

## Template 6: Reference / Lookup

**Tools:** http-status-codes, html-entities, mime-types, ascii-table, unicode-lookup, user-agent-parser, keyboard-layout-converter, semver-comparator

**Required sections:**

```
[Widget / interactive table]

## The most important entries and why
  - Editorial: pick 5–8 most commonly misused or misunderstood entries
  - E.g. for HTTP status codes: "400 vs 422 — most developers confuse these"
  - E.g. for HTML entities: "the 5 you will actually use vs the ones you should use Unicode for"
  - This section is the editorial voice that separates the page from a Wikipedia table

## Grouped reference with context
  - Organize the reference into logical groups with brief editorial notes per group
  - Not just a raw table — add a sentence explaining when each group applies

## Common mistakes in the wild
  - 3–5 real examples of misuse this tool helps avoid
  - With before/after code snippets showing the wrong and right approach

## Usage in real HTTP / code context
  - Show the entry in its natural habitat (HTTP response header, HTML attribute, JS code)
  - At least 2 code examples

[FAQ — 5 questions about the most commonly looked-up entries and edge cases]
```

---

## Template 7: Constructor / Builder

**Tools:** form-test-data-generator, agent-rules-generator (partially), any tool where the user assembles a structure and receives generated output based on that structure

**Core UX pattern:**
- Left panel: builder (user adds/removes/configures items dynamically)
- Right panel: live output (updates as user builds)
- Export button: download in one or more formats

**What makes this template different from Template 3 (Generator):**
Template 3 has fixed inputs → fixed output format. Template 7 has a *dynamic schema* the user constructs — the output structure itself changes based on what the user built.

**Required sections (in order after widget):**

```
[Widget — full wide layout, left builder + right output]

## What test cases are generated and why
  - Explain each category of generated output (valid, invalid, boundary, security, etc.)
  - For each category: what it tests, why it matters, real bug it can catch
  - This is the editorial core — not generic, specific to THIS tool's domain

## How to use the generated data
  - Step-by-step: build form → export → paste into test runner / Postman / spreadsheet
  - Show a concrete example: a 3-field form → the resulting test data table
  - Include a code snippet showing how to feed the CSV/JSON into Cypress or Playwright

## Field types and what gets generated per type
  - Table: field type | valid example | invalid example | edge case | security payload
  - This table IS the reference content — bookmark-worthy, not just tool documentation

## Edge cases your form validation should handle
  - Developer-focused checklist of cases that break most custom validators
  - Unicode, emoji, RTL text, zero-width characters, oversized inputs, null bytes
  - Why these matter and what happens if validation misses them

[FAQ — 5 questions about test data categories, export formats, and integration with test frameworks]
```

---

## Assignment table

When adding a new tool or rewriting an existing one, look up its slug here:

| Template | Tool slugs |
|---|---|
| 1 Security/Crypto | bcrypt-generator, jwt-generator, totp-generator, password-generator, md5-hash, sha256-hash, sha512-hash, hmac-generator, api-key-generator, encryption-tool, ssl-certificate-decoder, random-token-generator |
| 2 Formatter/Validator | sql-formatter, json-formatter, html-beautifier, html-minifier, javascript-minifier, css-minifier, markdown-to-html, html-to-markdown, xml-to-json, json-to-yaml, json-schema-generator, cron-generator |
| 3 Generator | gitignore-generator, mock-data-generator, nginx-redirect-generator, robots-txt-generator, htaccess-generator, lorem-json, qr-code-generator, favicon-generator |
| 4 Converter | length-converter, weight-converter, temperature-converter, area-converter, volume-converter, speed-converter, pressure-converter, frequency-converter, angle-converter, fuel-economy-converter, cooking-converter, data-storage-converter, number-base-converter, css-unit-converter, pixel-rem-converter, timestamp-converter, roman-numeral-converter, currency-converter, color-converter |
| 5 Analyzer/Checker | color-contrast-checker, password-strength-checker, token-counter, ai-cost-calculator, ai-model-comparison, reading-time-calculator, text-statistics |
| 6 Reference/Lookup | http-status-codes, html-entities, mime-types, ascii-table, unicode-lookup, user-agent-parser, keyboard-layout-converter, semver-comparator, ip-cidr-calculator |
| 7 Constructor/Builder | form-test-data-generator, agent-rules-generator |

Tools not in the table (text utilities, design tools) — use the closest matching template or combine Template 2 + 3.

---

## Maintenance

When a tool is rewritten to follow its template, note it in CLAUDE.md Foundation progress → Done with the date.
When a new tool is built, always check this file first to pick the correct template before writing `content.tsx`.
