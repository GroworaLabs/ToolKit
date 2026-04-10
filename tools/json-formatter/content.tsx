export default function JsonFormatterContent() {
  return (
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
        <div>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              What is JSON?
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              JSON (JavaScript Object Notation) is a lightweight text format for storing and transmitting structured data. It is the standard data format for <strong style={{ color: 'var(--ink)' }}>REST APIs</strong>, configuration files, and web application data exchange. JSON is language-independent — every major programming language can parse and serialize it.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              <strong style={{ color: 'var(--ink)' }}>Serialization</strong> is the process of converting a data structure into JSON text (e.g. <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>JSON.stringify(obj)</code>). Deserialization is the reverse — parsing JSON text back into a usable object (e.g. <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>JSON.parse(str)</code>). Both operations use the same JSON format defined in <a href="https://www.rfc-editor.org/rfc/rfc8259" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'underline' }}>RFC 8259</a>.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
              JSON uses two structures: <strong style={{ color: 'var(--ink)' }}>objects</strong> (key-value pairs in curly braces) and <strong style={{ color: 'var(--ink)' }}>arrays</strong> (ordered lists in square brackets). Values can be strings, numbers, booleans, null, objects, or arrays — fully nestable.
            </p>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              How to use the JSON formatter
            </h2>
            <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { n: '1', title: 'Paste your JSON', desc: 'Paste any JSON string into the input field — minified, prettified, or broken. The formatter handles all formats.' },
                { n: '2', title: 'Choose a mode', desc: 'Prettify adds indentation and line breaks for human readability. Minify removes all whitespace for production use. Validate checks syntax and highlights errors without transforming.' },
                { n: '3', title: 'Set indentation', desc: 'Choose 2-space or 4-space indentation. JavaScript and Node.js projects typically use 2 spaces. Python and Java projects often use 4.' },
                { n: '4', title: 'Copy the result', desc: 'Click Copy to grab the formatted output. The entire process runs locally in your browser — your API keys and data never leave your device.' },
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

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Common JSON syntax errors
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
              JSON has strict syntax rules. These are the errors developers encounter most often:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { error: 'Trailing comma',       example: '{"key": "value",}',          fix: 'Remove the comma after the last property. JSON does not allow trailing commas, unlike JavaScript.' },
                { error: 'Single quotes',         example: "{\"key\": 'value'}",         fix: 'Use double quotes for all strings and property names. Single quotes are not valid JSON.' },
                { error: 'Unquoted keys',         example: '{key: "value"}',             fix: 'All object keys must be quoted: {"key": "value"}.' },
                { error: 'undefined / NaN',       example: '{"value": undefined}',       fix: 'JSON has no undefined or NaN types. Use null for missing values.' },
                { error: 'Comments',              example: '{"key": "value" // note}',   fix: 'JSON does not support comments. Remove them or use a format like JSONC for config files.' },
              ].map(({ error, example, fix }) => (
                  <div key={error} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', background: 'var(--red-lt)', padding: '2px 8px', borderRadius: 99 }}>{error}</span>
                      <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)', background: 'var(--page-bg)', padding: '2px 8px', borderRadius: 4 }}>{example}</code>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>{fix}</p>
                  </div>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Prettify vs Minify — when to use each
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
              <div style={{ padding: '20px', background: 'var(--green-lt)', border: '1px solid var(--green-mid)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Use Prettify when…</div>
                <ul style={{ paddingLeft: 18, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.8, margin: 0 }}>
                  <li>Debugging API responses</li>
                  <li>Reading config files</li>
                  <li>Code reviews and documentation</li>
                  <li>Exploring unfamiliar data structures</li>
                </ul>
              </div>
              <div style={{ padding: '20px', background: 'var(--blue-lt)', border: '1px solid rgba(37,99,235,.2)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Use Minify when…</div>
                <ul style={{ paddingLeft: 18, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.8, margin: 0 }}>
                  <li>Sending data in API requests</li>
                  <li>Storing in databases</li>
                  <li>Reducing payload size for production</li>
                  <li>Embedding JSON in HTML attributes</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ── JSON data types ─────────────────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              JSON data types — complete reference
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
              JSON supports exactly six value types. Understanding them is essential for writing valid JSON and debugging parse errors.
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                  {['Type', 'Example', 'Notes'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                  ))}
                </tr>
                </thead>
                <tbody>
                {[
                  ['String',  '"Hello, world!"',            'Must use double quotes. Escape special chars: \\" \\n \\t \\\\'],
                  ['Number',  '42  or  3.14  or  -7',       'No integer/float distinction. No NaN or Infinity (invalid in JSON)'],
                  ['Boolean', 'true  or  false',             'Lowercase only. "True" or "TRUE" are invalid'],
                  ['Null',    'null',                        'Represents an absent or unknown value. undefined does not exist in JSON'],
                  ['Object',  '{"key": "value"}',            'Unordered key-value pairs. Keys must be double-quoted strings'],
                  ['Array',   '[1, "two", true, null]',      'Ordered list. Can mix types. Can be nested inside objects'],
                ].map(([type, example, note], i) => (
                    <tr key={type} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--ink)' }}>{type}</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)' }}>{example}</td>
                      <td style={{ padding: '10px 14px', color: 'var(--ink-3)' }}>{note}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── JSON in JavaScript ──────────────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Working with JSON in JavaScript
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
              Two built-in functions handle all JSON operations in JavaScript. Both are synchronous and available in every browser and Node.js environment.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                {
                  label: 'Parse JSON string → JavaScript object',
                  code: `const data = JSON.parse('{"name": "Alice", "age": 30}');\nconsole.log(data.name); // "Alice"`,
                  note: 'Throws SyntaxError if the string is not valid JSON. Always wrap in try/catch when parsing user input or API responses.',
                },
                {
                  label: 'Convert JavaScript object → JSON string',
                  code: `const obj = { name: 'Alice', scores: [95, 87, 92] };\nconst json = JSON.stringify(obj, null, 2); // null = no replacer, 2 = indent`,
                  note: 'The second argument filters keys (pass null to keep all). The third argument sets indentation — use 2 for readability, omit for minified output.',
                },
                {
                  label: 'Fetch API response as JSON',
                  code: `const res = await fetch('https://api.example.com/data');\nconst data = await res.json(); // parses JSON automatically`,
                  note: 'res.json() is shorthand for res.text() → JSON.parse(). It throws if the response body is not valid JSON.',
                },
              ].map(({ label, code, note }) => (
                  <div key={label} style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>{label}</div>
                    <pre style={{ margin: '0 0 10px', padding: '12px 14px', background: 'var(--page-bg)', borderRadius: 'var(--r-m)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', overflowX: 'auto', lineHeight: 1.7 }}>{code}</pre>
                    <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>{note}</p>
                  </div>
              ))}
            </div>
          </section>


          {/* ── JSON vs alternatives ────────────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              JSON vs XML vs YAML vs TOML
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
              JSON is the dominant format for APIs and web applications, but other formats serve different purposes. Here's when each makes sense:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { fmt: 'JSON',  use: 'REST APIs, web app data exchange, config files, localStorage',       pro: 'Universal browser support, fast parsing, compact' },
                { fmt: 'XML',   use: 'Legacy enterprise APIs (SOAP), SVG, HTML, RSS feeds',                pro: 'Supports attributes, namespaces, and document-style data' },
                { fmt: 'YAML',  use: 'Config files (Docker, GitHub Actions, Kubernetes, CI/CD pipelines)', pro: 'Human-friendly, supports comments, less punctuation' },
                { fmt: 'TOML',  use: 'App configuration (Rust Cargo.toml, Python pyproject.toml)',         pro: 'Strongly typed, unambiguous, great for simple configs' },
              ].map(({ fmt, use, pro }) => (
                  <div key={fmt} style={{ display: 'flex', gap: 14, padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', flexWrap: 'wrap' }}>
                    <div style={{ minWidth: 60 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', fontFamily: 'JetBrains Mono, monospace', background: 'var(--green-lt)', padding: '2px 8px', borderRadius: 4 }}>{fmt}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 3 }}>Best for: {use}</div>
                      <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>Why: {pro}</div>
                    </div>
                  </div>
              ))}
            </div>
          </section>

          {/* ── JSON Schema ──────────────────────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              JSON Schema — validating structure and types
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              JSON has no built-in type enforcement — any valid JSON can contain any structure. JSON Schema is a separate vocabulary (itself written in JSON) that describes the expected structure of a JSON document. It is used for API documentation, form validation, config file validation, and code generation.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              A JSON Schema document specifies the <strong style={{ color: 'var(--ink)' }}>type</strong> of each property, whether properties are <strong style={{ color: 'var(--ink)' }}>required</strong>, constraints like <strong style={{ color: 'var(--ink)' }}>minLength</strong>, <strong style={{ color: 'var(--ink)' }}>minimum</strong>, and <strong style={{ color: 'var(--ink)' }}>pattern</strong>, and the structure of nested objects and arrays. Validators like Ajv (JavaScript) and jsonschema (Python) use the schema to validate payloads at runtime — rejecting malformed data before it reaches your business logic.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
              OpenAPI (formerly Swagger) uses JSON Schema as its type system for API definitions. TypeScript tools like <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>json-schema-to-typescript</code> generate TypeScript interfaces directly from a JSON Schema, keeping your API types and validation rules in sync automatically.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { keyword: 'type', purpose: 'Specifies the expected JSON type', example: '"type": "string" | "number" | "boolean" | "array" | "object" | "null"' },
                { keyword: 'required', purpose: 'Lists properties that must be present in an object', example: '"required": ["id", "name", "email"]' },
                { keyword: 'properties', purpose: 'Defines the schema for each named property in an object', example: '"properties": { "age": { "type": "integer", "minimum": 0 } }' },
                { keyword: 'items', purpose: 'Defines the schema for each element in an array', example: '"items": { "type": "string" }' },
                { keyword: 'enum', purpose: 'Restricts a value to a fixed set of allowed values', example: '"enum": ["active", "inactive", "pending"]' },
                { keyword: '$ref', purpose: 'References a reusable schema definition', example: '"$ref": "#/$defs/Address"' },
              ].map(({ keyword, purpose, example }, i) => (
                <div key={keyword} style={{ display: 'flex', gap: 0, border: '1px solid var(--border)', borderRadius: 'var(--r-l)', overflow: 'hidden' }}>
                  <div style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 700, color: 'var(--green)', background: 'var(--green-lt)', minWidth: 110, flexShrink: 0 }}>{keyword}</div>
                  <div style={{ padding: '10px 14px', fontSize: 13, color: 'var(--ink-2)', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', flex: 1, borderLeft: '1px solid var(--border)' }}>
                    <div style={{ fontWeight: 600, color: 'var(--ink)', marginBottom: 3 }}>{purpose}</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{example}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── JSON in the real world ────────────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              JSON in the real world — APIs, config files, databases
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              JSON is everywhere in modern software. Understanding the common patterns helps you work with it more confidently across different contexts:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { ctx: 'REST API responses', detail: 'The dominant format for web API payloads. Content-Type: application/json signals JSON encoding. Most HTTP client libraries (Axios, Fetch API, requests, Guzzle) parse JSON responses automatically. Pagination typically uses a wrapper object with "data", "meta", and "links" keys (JSON:API spec) or a flat response with "items" and "nextCursor".' },
                { ctx: 'package.json (npm)', detail: 'Node.js project configuration and dependency manifest. Uses JSON5-extended rules in some tooling but must be strictly valid JSON. The scripts object defines npm run commands; dependencies and devDependencies use semver ranges. Processed by the npm CLI — never needs to be parsed manually by your code.' },
                { ctx: 'tsconfig.json', detail: 'TypeScript compiler configuration. Unusually, this file supports JavaScript-style comments (// and /* */) and trailing commas despite using the .json extension. TypeScript\'s parser handles these JSON5 extensions internally. This is why linters sometimes complain about tsconfig.json being "invalid JSON".' },
                { ctx: 'localStorage and sessionStorage', detail: 'Browser storage only holds string values. Storing objects requires JSON.stringify() on write and JSON.parse() on read. A common bug is forgetting to parse on retrieval — comparing a stored boolean with true will always fail if the value was stored as the string "true". Always pair storage and retrieval with the same serialization approach.' },
                { ctx: 'PostgreSQL JSONB columns', detail: 'PostgreSQL natively stores and indexes JSON in JSONB (binary JSON) columns. You can query nested properties with -> and ->> operators, index specific keys with GIN indexes, and update individual paths. JSONB is preferred over the older JSON type because it stores data in binary form (faster queries) and deduplicates object keys.' },
                { ctx: 'WebSocket and SSE messages', detail: 'Real-time protocols commonly use JSON-encoded messages. WebSocket frames carry raw bytes — JSON.stringify/parse handles encoding. Server-Sent Events use a "data: {...}\\n\\n" format where the data field contains a JSON string. For high-frequency messages (gaming, financial data), consider MessagePack or Protocol Buffers as more compact binary alternatives.' },
              ].map(({ ctx, detail }, i) => (
                <div key={ctx} style={{ padding: '14px 16px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{ctx}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{detail}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
  );
}