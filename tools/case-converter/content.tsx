export default function CaseConverterContent() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
      <div>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            What is a case converter?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            A case converter transforms text between different capitalization formats instantly. It handles everything from simple uppercase/lowercase conversion to developer-specific naming conventions like camelCase, snake_case, and kebab-case — in one click, with no manual editing.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            Developers use case converters to reformat variable names when switching languages, normalize database column names, or convert copy from content teams into code-safe identifiers. Writers use them to fix accidental caps lock, apply consistent headline capitalization, and prepare text for different publishing platforms.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            How to use the case converter
          </h2>
          <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { n: '1', title: 'Type or paste your text', desc: 'Enter any text in the left input field. The converter handles multi-line input, mixed cases, and text with numbers or symbols.' },
              { n: '2', title: 'Select a conversion format', desc: 'Click any format button — Text group (Sentence, lower, UPPER, Title, Capitalized), Code group (camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE), or Fun group (aLtErNaTiNg, iNVERSE).' },
              { n: '3', title: 'View the result', desc: 'The converted text appears instantly in the right panel. Code formats (camelCase, snake_case, etc.) use a monospace font for better readability.' },
              { n: '4', title: 'Copy the output', desc: 'Click Copy to grab the converted text. Switch between formats without re-entering your text.' },
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
            Naming convention guide for developers
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
            Different programming languages and contexts have established naming conventions. Following them makes code more readable and consistent with the ecosystem:
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                  {['Format', 'Example', 'Use case'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['camelCase',      'getUserData',           'JavaScript, TypeScript, Java, Swift — variables & functions'],
                  ['PascalCase',     'UserDataService',       'React components, class names, TypeScript types & interfaces'],
                  ['snake_case',     'get_user_data',         'Python (PEP 8), Ruby, SQL column names'],
                  ['kebab-case',     'get-user-data',         'URLs, CSS class names, HTML attributes, file names'],
                  ['CONSTANT_CASE',  'MAX_RETRY_COUNT',       'Constants and environment variables in most languages'],
                  ['Title Case',     'Get User Data',         'Article headlines, UI headings, email subjects'],
                  ['Sentence case',  'Get user data',         'Body text, UI labels, most modern web interfaces'],
                ].map(([fmt, example, use], i) => (
                  <tr key={fmt} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 14px' }}>
                      <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600, color: 'var(--green)' }}>{fmt}</code>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--ink)' }}>{example}</code>
                    </td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-3)' }}>{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Real-world examples ─────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Real-world case conversion scenarios
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
            These are the most common situations where you need a case converter — each requires a specific transformation:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { scenario: 'API response to JavaScript variables', from: 'user_first_name (snake_case)', to: 'userFirstName (camelCase)', why: 'REST APIs and databases commonly use snake_case. JavaScript code should use camelCase per language convention.' },
              { scenario: 'Database column names from UI labels', from: 'First Name (Title Case)', to: 'first_name (snake_case)', why: 'SQL column names use snake_case. Converting UI copy to database identifiers is a daily task for backend developers.' },
              { scenario: 'React component names from file names', from: 'user-profile-card (kebab-case)', to: 'UserProfileCard (PascalCase)', why: 'React component names must be PascalCase to distinguish them from HTML elements. File names often use kebab-case.' },
              { scenario: 'CSS class names from design tokens', from: 'primaryButtonHover (camelCase)', to: 'primary-button-hover (kebab-case)', why: 'CSS class names use kebab-case. Design tokens in JavaScript use camelCase. You convert when bridging the two.' },
              { scenario: 'Environment variable names', from: 'database_host (snake_case)', to: 'DATABASE_HOST (CONSTANT_CASE)', why: 'Environment variables and constants use UPPER_SNAKE_CASE across virtually all languages and platforms.' },
              { scenario: 'Blog headlines from draft notes', from: 'how to build a rest api', to: 'How to Build a REST API (Title Case)', why: 'Title case for article headlines is standard in English publishing. The converter handles common style rules automatically.' },
            ].map(({ scenario, from, to, why }) => (
              <div key={scenario} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>{scenario}</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                  <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, background: 'var(--page-bg)', padding: '2px 8px', borderRadius: 4, color: 'var(--ink-3)' }}>{from}</code>
                  <span style={{ color: 'var(--ink-4)', fontSize: 12 }}>→</span>
                  <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, background: 'var(--green-lt)', padding: '2px 8px', borderRadius: 4, color: 'var(--green)' }}>{to}</code>
                </div>
                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>{why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Title case rules ────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Title case rules — which words to capitalize
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            Title case is more complex than simply capitalizing every word. Different style guides disagree on edge cases, but the most widely followed rules (AP Style, Chicago Manual) agree on the basics:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            <div style={{ padding: '18px', background: 'var(--green-lt)', border: '1px solid var(--green-mid)', borderRadius: 'var(--r-l)' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>Always capitalize</div>
              <ul style={{ paddingLeft: 18, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.8, margin: 0 }}>
                <li>The first and last word</li>
                <li>Nouns, verbs, adjectives, adverbs</li>
                <li>Pronouns (I, He, She, They)</li>
                <li>Subordinating conjunctions (Because, Although)</li>
              </ul>
            </div>
            <div style={{ padding: '18px', background: 'var(--blue-lt)', border: '1px solid rgba(37,99,235,.2)', borderRadius: 'var(--r-l)' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>Usually lowercase</div>
              <ul style={{ paddingLeft: 18, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.8, margin: 0 }}>
                <li>Articles: a, an, the</li>
                <li>Short prepositions: in, on, at, to, by</li>
                <li>Coordinating conjunctions: and, but, or, nor</li>
                <li>The "to" in infinitives</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Naming conventions across tech stacks ─────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Naming conventions across popular tech stacks
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
            Each ecosystem has community-wide conventions baked into linters, code review expectations, and standard library design. Following them makes your code feel native to the stack and avoids friction during code review:
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                  {['Tech stack', 'Variables / Functions', 'Classes / Types', 'Constants', 'Files'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['JavaScript / TypeScript', 'camelCase', 'PascalCase', 'UPPER_SNAKE_CASE', 'kebab-case'],
                  ['React components', 'camelCase', 'PascalCase', 'UPPER_SNAKE_CASE', 'PascalCase.tsx'],
                  ['Python (PEP 8)', 'snake_case', 'PascalCase', 'UPPER_SNAKE_CASE', 'snake_case.py'],
                  ['Go', 'camelCase', 'PascalCase (exported)', 'camelCase or UPPER', 'snake_case.go'],
                  ['Rust', 'snake_case', 'PascalCase', 'UPPER_SNAKE_CASE', 'snake_case.rs'],
                  ['Java / Kotlin', 'camelCase', 'PascalCase', 'UPPER_SNAKE_CASE', 'PascalCase.java'],
                  ['C# (.NET)', 'camelCase (local), PascalCase (members)', 'PascalCase', 'PascalCase', 'PascalCase.cs'],
                  ['Ruby on Rails', 'snake_case', 'PascalCase', 'UPPER_SNAKE_CASE', 'snake_case.rb'],
                  ['CSS / SCSS classes', 'kebab-case', '—', '—', 'kebab-case.css'],
                  ['SQL (PostgreSQL)', 'snake_case', '—', 'UPPER_SNAKE_CASE', 'snake_case.sql'],
                ].map(([stack, vars, classes, consts, files], i) => (
                  <tr key={stack} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{stack}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)' }}>{vars}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-2)' }}>{classes}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{consts}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-4)' }}>{files}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Automated case transformation ─────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Automating case transformations in your codebase
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            Manual case conversion does not scale. When you are building APIs, transforming database schemas to JavaScript objects, or processing user-generated content, you need programmatic solutions. Here are the standard approaches:
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            <strong style={{ color: 'var(--ink)' }}>API response normalization</strong> is one of the most common use cases. REST APIs from different backends use different conventions — a Python/Django API returns snake_case keys, a Java API returns camelCase or PascalCase, and some legacy APIs return UPPER_CASE. Libraries like <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>camelcase-keys</code> (npm) automatically convert all keys in a JSON response to camelCase, preventing inconsistent property names in your frontend codebase.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            <strong style={{ color: 'var(--ink)' }}>Linters enforce naming conventions</strong> automatically during development. ESLint's <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>camelcase</code> and <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>@typescript-eslint/naming-convention</code> rules report violations in your IDE as you type. Python's Flake8 and Pylint enforce PEP 8 naming. Setting these up once ensures all team members follow the same conventions without code review comments about naming.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            <strong style={{ color: 'var(--ink)' }}>Database-to-code mapping</strong> is another friction point. SQL tables and columns use snake_case by convention, but JavaScript objects typically use camelCase. ORMs like Prisma handle this automatically (a column <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>created_at</code> becomes <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>createdAt</code> in the Prisma client). If you write raw SQL, consider a lightweight mapping utility to keep both layers idiomatic.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            <strong style={{ color: 'var(--ink)' }}>File rename migrations</strong> occasionally require batch case conversion. Renaming a directory of React components from kebab-case to PascalCase, or standardizing a Python package's module files to snake_case, can be done with a shell script using <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>rename</code> (Linux/macOS) or the <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>rename-cli</code> npm package. Always run these with a dry-run flag first and update your import statements with a global find-and-replace afterward.
          </p>
        </section>



          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Choosing the right case for different contexts
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              The correct case convention is not just a style preference — it communicates intent and context to anyone reading your code. Using the wrong case creates cognitive friction and can even introduce bugs (for example, CSS class names with uppercase letters will not match, and Linux file paths are case-sensitive while Windows ones are not).
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              <strong style={{ color: 'var(--ink)' }}>For UI copy (buttons, labels, navigation):</strong> Use sentence case as the default. Modern UI guidelines from Apple (Human Interface Guidelines), Google (Material Design), and Microsoft (Fluent Design) all recommend sentence case for labels and buttons because it reads more naturally and feels less formal. Reserve Title Case for page headings and dialog titles that function like document titles.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              <strong style={{ color: 'var(--ink)' }}>For API design:</strong> Choose one convention and apply it consistently across all endpoints. The most common REST API convention is camelCase for JSON property names (matching JavaScript object conventions) and kebab-case for URL path segments (/user-profiles not /userProfiles). GraphQL schemas use camelCase for field names and PascalCase for type names.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
              <strong style={{ color: 'var(--ink)' }}>For file and folder naming:</strong> kebab-case is the safest choice for web projects because it is URL-safe, works consistently across Linux, macOS, and Windows, and avoids case collision issues when files are moved between operating systems. Component files in React projects are a common exception — PascalCase.tsx matches the component name and makes imports readable.
            </p>
          </section>

      </div>
    </div>
  );
}
