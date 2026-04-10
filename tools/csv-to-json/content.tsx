export default function CsvToJsonContent() {
  const codeStyle: React.CSSProperties = {
    fontFamily: 'JetBrains Mono, monospace', fontSize: 13,
    background: 'var(--border)', padding: '1px 5px', borderRadius: 3,
  };
  const linkStyle: React.CSSProperties = {
    color: 'var(--green)', textDecoration: 'underline',
  };
  const h2Style: React.CSSProperties = {
    fontFamily: 'Outfit, sans-serif', fontWeight: 700,
    fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)',
    letterSpacing: '-0.02em', marginBottom: 16,
  };
  const pStyle: React.CSSProperties = {
    fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14,
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
      <div>

        {/* ── What is CSV ─────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={h2Style}>What is CSV and when does it fall short?</h2>
          <p style={pStyle}>
            CSV (Comma-Separated Values) is the oldest and most universal data interchange format in computing. Every spreadsheet application — Microsoft Excel, Google Sheets, LibreOffice Calc, Apple Numbers — can export to CSV with a single click. Database tools, payment processors, CRM systems, and analytics platforms all produce CSV reports. It is the lowest common denominator of structured data: plain text, human-readable, and trivially portable.
          </p>
          <p style={pStyle}>
            But CSV has hard limits that become painful the moment data leaves the spreadsheet world. It has no native type system — every value is a string. It cannot represent nested structures: a customer with multiple addresses, an order with multiple line items, a user with an array of tags. It has no standard for null vs empty string, no built-in schema, and no universally agreed encoding for special characters. Most importantly, the web ecosystem speaks JSON, not CSV.
          </p>
          <p style={pStyle}>
            REST APIs, NoSQL databases like MongoDB and Firestore, front-end frameworks, charting libraries, and configuration tools all expect JSON. The moment you need to import a CSV export from your accounting software into an API endpoint, or use a spreadsheet as seed data for a test suite, or load a dataset into a D3.js visualisation, you need to convert CSV to JSON. That is exactly what this tool does — instantly, in your browser, without sending your data anywhere.
          </p>
        </section>

        {/* ── What is JSON ────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={h2Style}>What is JSON and why is it the standard?</h2>
          <p style={pStyle}>
            JSON (JavaScript Object Notation) is a lightweight text format for structured data. It was formalised in <a href="https://www.rfc-editor.org/rfc/rfc8259" target="_blank" rel="noopener noreferrer" style={linkStyle}>RFC 8259</a> and is now the dominant serialisation format for web APIs, configuration files, and document-oriented databases. Unlike CSV, JSON has a rich type system: strings, numbers, booleans, null, arrays, and nested objects are all first-class citizens.
          </p>
          <p style={pStyle}>
            A CSV row like <code style={codeStyle}>Alice,30,true</code> has no inherent types — a CSV parser cannot know whether 30 is a string or an integer, or whether <code style={codeStyle}>true</code> is meant to be a boolean or the word "true". In JSON, the equivalent <code style={codeStyle}>{`{"name":"Alice","age":30,"active":true}`}</code> is unambiguous. This precision prevents downstream type coercion bugs that are notoriously hard to debug — especially when feeding data into a typed language like TypeScript, Go, or Rust, or when writing it to a relational database with strict column types.
          </p>
          <p style={pStyle}>
            Once your data is in JSON you can also validate it, format it with a dedicated tool like the <a href="/tools/json-formatter" style={linkStyle}>JSON Formatter</a> on this site, or minify it before sending over the network. JSON also compresses well with gzip, making it efficient for API responses.
          </p>
        </section>

        {/* ── How the converter works ──────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={h2Style}>How the CSV to JSON converter works</h2>
          <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              {
                n: '1', title: 'Paste or type your CSV',
                desc: 'Paste CSV text into the input area directly from the clipboard. You can copy rows from Excel, Google Sheets, or any CSV file opened in a text editor.',
              },
              {
                n: '2', title: 'Choose your delimiter',
                desc: 'Select comma (the default for most English-locale exports), semicolon (common in European Excel exports where comma is the decimal separator), tab (used by Google Sheets "TSV" export and many database tools), or pipe.',
              },
              {
                n: '3', title: 'Toggle header row',
                desc: 'When Headers is enabled, the first row is used as JSON object keys — giving you an array of named objects. When disabled, you get an array of arrays, which is useful for data without column names.',
              },
              {
                n: '4', title: 'Copy or download',
                desc: 'Click Copy to write the JSON to your clipboard, or Download to save a .json file. The Pretty toggle controls indentation — useful for readability, or disable it to minimise payload size.',
              },
            ].map(({ n, title, desc }) => (
              <li key={n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{n}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{title}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-3)', margin: 0 }}>{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── CSV syntax explained ─────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={h2Style}>CSV syntax rules you need to know</h2>
          <p style={pStyle}>
            CSV looks simple but has several edge cases that trip up naive parsers. This converter implements the full <a href="https://www.rfc-editor.org/rfc/rfc4180" target="_blank" rel="noopener noreferrer" style={linkStyle}>RFC 4180</a> specification so you don't have to worry about them, but understanding the rules helps you write valid CSV manually:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                rule: 'Quoting fields with commas',
                example: '"New York, NY",35',
                desc: 'A field that contains the delimiter must be wrapped in double quotes. Without quoting, the parser would split "New York, NY" into two separate fields.',
              },
              {
                rule: 'Escaping double quotes',
                example: '"He said ""hello""",28',
                desc: 'A literal double-quote inside a quoted field is represented as two consecutive double-quotes. This is the only escape sequence in RFC 4180 CSV.',
              },
              {
                rule: 'Multi-line fields',
                example: '"Line one\nLine two",30',
                desc: 'A quoted field may span multiple lines. The embedded newline is part of the field value, not a row separator. This parser handles it correctly.',
              },
              {
                rule: 'Trailing newline',
                example: 'Alice,30\nBob,25\n',
                desc: 'A trailing newline at the end of the file is optional and is silently discarded — it does not produce an empty last row.',
              },
              {
                rule: 'Consistent column count',
                example: 'name,age\nAlice,30\nBob',
                desc: 'RFC 4180 recommends consistent column counts per row. When a row is shorter than the header, missing fields are filled with empty string. Longer rows include extra fields under auto-generated keys.',
              },
            ].map(({ rule, example, desc }) => (
              <div key={rule} style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{rule}</span>
                  <code style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', background: 'var(--green-lt)', color: 'var(--green)', padding: '2px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>{example}</code>
                </div>
                <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CSV vs JSON comparison ───────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={h2Style}>CSV vs JSON: when to use each format</h2>
          <p style={pStyle}>
            Both formats have their place. Knowing when to use each prevents unnecessary conversions and keeps your data pipeline simple.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                  {['Criterion', 'CSV', 'JSON'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { criterion: 'Human readability',         csv: 'Easy for flat tables',         json: 'Easy for nested structures'  },
                  { criterion: 'Type support',              csv: 'Strings only (by default)',     json: 'String, number, boolean, null, array, object' },
                  { criterion: 'Nested data',               csv: 'Not supported',                 json: 'First-class support'         },
                  { criterion: 'Spreadsheet import/export', csv: 'Native in Excel, Sheets',       json: 'Requires plugin or scripting' },
                  { criterion: 'REST API payloads',         csv: 'Rarely used',                   json: 'Universal standard'          },
                  { criterion: 'Database imports',          csv: 'Widely supported (SQL tools)',  json: 'Native in MongoDB, Firestore, DynamoDB' },
                  { criterion: 'File size (uncompressed)',  csv: 'Smaller for wide tables',       json: 'Larger due to key repetition' },
                  { criterion: 'Schema enforcement',        csv: 'None',                          json: 'Via JSON Schema or TypeScript' },
                ].map(({ criterion, csv, json }, i) => (
                  <tr key={criterion} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{criterion}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{csv}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{json}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Developer use cases ──────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={h2Style}>Common developer use cases</h2>
          <p style={pStyle}>
            CSV-to-JSON conversion comes up in nearly every kind of software project. Here are the scenarios developers reach for this tool most often:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: 10 }}>
            {[
              {
                title: 'Database seeding',
                desc: 'Export a spreadsheet of test users, products, or locations as CSV, convert to JSON, and import into MongoDB, SQLite, or Postgres with a simple script. Much faster than writing INSERT statements by hand.',
              },
              {
                title: 'API integration',
                desc: 'Turn a CSV export from a CRM, payment processor, or analytics dashboard into a JSON array that you can POST directly to a REST API endpoint or a webhook.',
              },
              {
                title: 'Front-end data files',
                desc: 'React, Vue, and Next.js projects often need static data files (product lists, FAQ entries, country codes). Maintain them as a spreadsheet, export to CSV, convert here, and commit the JSON to your repo.',
              },
              {
                title: 'Unit test fixtures',
                desc: 'Convert a representative sample of real data to JSON for use as test fixtures. Real data finds edge cases that hand-crafted fixtures miss — quoted commas, Unicode characters, empty fields.',
              },
              {
                title: 'Data visualisation',
                desc: 'Libraries like D3.js, Vega-Lite, Chart.js, and Recharts accept JSON arrays natively. Convert your CSV dataset here and drop the output directly into your visualisation code.',
              },
              {
                title: 'Webhook & automation payloads',
                desc: 'Tools like Zapier, Make (Integromat), and n8n accept JSON for custom actions. Converting a CSV export to JSON lets you trigger bulk operations from spreadsheet data.',
              },
            ].map(({ title, desc }) => (
              <div key={title} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55 }}>{desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Type coercion ────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={h2Style}>Automatic type coercion: numbers and booleans</h2>
          <p style={pStyle}>
            One of the most valuable features of this converter is automatic type detection. In a raw CSV file everything is text, but JSON consumers expect proper types. When you convert <code style={codeStyle}>42</code> in a CSV column, the output JSON should contain the number <code style={codeStyle}>42</code>, not the string <code style={codeStyle}>"42"</code> — otherwise TypeScript interfaces fail, database drivers insert wrong types, and arithmetic operations silently concatenate strings.
          </p>
          <p style={pStyle}>
            The coercion logic follows three simple rules, applied in order:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                input: '"true" or "false" (case-insensitive)',
                output: 'JSON boolean: true or false',
                note: 'Covers TRUE, False, FALSE — common in database exports.',
              },
              {
                input: 'Any string parseable as a finite number',
                output: 'JSON number: integer or float',
                note: '"42" → 42, "3.14" → 3.14, "-7" → -7. NaN and Infinity remain strings.',
              },
              {
                input: 'Anything else',
                output: 'JSON string (unchanged)',
                note: 'Dates ("2024-01-15"), UUIDs, URLs, and free text stay as strings.',
              },
            ].map(({ input, output, note }) => (
              <div key={input} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', display: 'flex', gap: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', flexShrink: 0, marginTop: 6 }} />
                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'baseline', marginBottom: 4 }}>
                    <code style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', background: 'var(--border)', padding: '1px 6px', borderRadius: 3 }}>{input}</code>
                    <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>→</span>
                    <code style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', background: 'var(--green-lt)', color: 'var(--green)', padding: '1px 6px', borderRadius: 3 }}>{output}</code>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>{note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── What to do with the output ───────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={h2Style}>What to do with the JSON output</h2>
          <p style={pStyle}>
            After converting your CSV, the JSON output is ready to use in several ways — and other free tools on this site can help with the next steps:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                title: 'Validate and format',
                desc: (
                  <>
                    Paste the JSON into the <a href="/tools/json-formatter" style={linkStyle}>JSON Formatter</a> to check for syntax errors, prettify with consistent indentation, or minify it before committing to a repository or sending as an API payload.
                  </>
                ),
              },
              {
                title: 'Encode for URLs or headers',
                desc: (
                  <>
                    If you need to pass the JSON as a URL query parameter or in an HTTP header, use the <a href="/tools/url-encoder" style={linkStyle}>URL Encoder</a> to percent-encode the special characters so it transmits correctly.
                  </>
                ),
              },
              {
                title: 'Hash for integrity checks',
                desc: (
                  <>
                    Before storing or distributing a JSON data file, you can generate a checksum with the <a href="/tools/hash-generator" style={linkStyle}>Hash Generator</a> (SHA-256 or SHA-512). This lets consumers verify the file hasn't been tampered with.
                  </>
                ),
              },
              {
                title: 'Embed as a data URI',
                desc: (
                  <>
                    To embed small JSON datasets directly in HTML or as a <code style={codeStyle}>data:</code> URI in a script tag, encode the JSON output with the <a href="/tools/base64" style={linkStyle}>Base64 encoder</a>.
                  </>
                ),
              },
            ].map(({ title, desc }) => (
              <div key={title} style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', display: 'flex', gap: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', flexShrink: 0, marginTop: 6 }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                  <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ── Common pitfalls ──────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={h2Style}>Common pitfalls and how to avoid them</h2>
          <div style={{ padding: '20px 24px', background: 'var(--amber-lt)', border: '1px solid rgba(217,119,6,.25)', borderRadius: 'var(--r-l)' }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--ink)', marginBottom: 12 }}>
              Watch out for these when working with CSV data
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                {
                  issue: 'BOM character at start of file',
                  fix: 'Some Windows tools add a UTF-8 BOM (\\uFEFF) to the first field name. If your first key looks like "﻿name" instead of "name", open the file in VS Code, change encoding from "UTF-8 with BOM" to "UTF-8", and save again.',
                },
                {
                  issue: 'Inconsistent quoting',
                  fix: 'Excel sometimes produces inconsistently quoted output — some cells quoted, others not. This converter tolerates mixed quoting, but deliberately malformed CSV (unmatched quotes) will produce a parse error.',
                },
                {
                  issue: 'Numbers that should stay strings',
                  fix: 'Phone numbers, ZIP codes, and leading-zero identifiers like "007" or "01234" will be coerced to numbers (7, 1234), losing the leading zeros. Quote these fields in the CSV if preservation is required.',
                },
                {
                  issue: 'Date fields',
                  fix: 'Dates like "2024-01-15" are left as strings (they\'re not valid numbers or booleans). This is correct — date parsing is locale-dependent and should be handled explicitly by the consuming application.',
                },
              ].map(({ issue, fix }) => (
                <div key={issue}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 3 }}>{issue}</div>
                  <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6, margin: 0 }}>{fix}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
