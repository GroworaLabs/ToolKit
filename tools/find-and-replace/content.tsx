export default function FindAndReplaceContent() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
      <div>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            What is a find and replace tool?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            A find and replace tool scans a block of text for a specified pattern — either a plain string or a regular expression — and substitutes every match with replacement text. It is the same operation available in every text editor (Ctrl+H / Cmd+H), but available online without needing to open any application, and with regex support built in.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            The web-based version is especially useful for quick one-off replacements on pasted content, where opening a code editor would be slower than opening a browser tab. Writers use it to swap out brand names, fix recurring typos, and reformat copy. Developers use it to transform data formats, rewrite identifiers, and clean imported text files. Data analysts use it to normalize spreadsheet exports before further processing.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            This tool supports four flags — regex mode, case-insensitive, global replacement, and multiline — which can be combined freely to match any text transformation scenario. The output and match count update in real time as you type.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            How to use the find and replace tool
          </h2>
          <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { n: '1', title: 'Paste your text', desc: 'Paste the text you want to modify into the left input panel. The right panel shows the result with replacements applied.' },
              { n: '2', title: 'Type your find pattern', desc: 'Enter the word, phrase, or regex pattern you want to find. In plain text mode, every character is treated literally. In regex mode, use standard regular expression syntax.' },
              { n: '3', title: 'Enter replacement text', desc: 'Type the replacement in the Replace field. Leave it empty to delete all matches. In regex mode, use $1, $2 to reference capture groups from the find pattern.' },
              { n: '4', title: 'Set flags and copy', desc: 'Toggle Global (replace all vs first only), Case-insensitive, Regex, and Multiline as needed. When the output looks correct, click Copy to grab it.' },
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
            Regular expression quick reference
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
            Regular expressions (regex) are patterns that describe sets of strings. They unlock powerful transformations that plain text search cannot perform — matching any digit, any whitespace, patterns of varying length, or specific positions in the text. This tool uses JavaScript regex syntax (compatible with ECMAScript / PCRE-like patterns):
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                  {['Pattern', 'Meaning', 'Example match'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['.',          'Any character except newline',          '"h.llo" matches "hello", "hXllo"'],
                  ['\\d',        'Any digit (0–9)',                       '"\\d+" matches "42", "007", "2024"'],
                  ['\\w',        'Word character (a-z, A-Z, 0-9, _)',    '"\\w+" matches "hello", "user_name"'],
                  ['\\s',        'Whitespace (space, tab, newline)',      '"\\s+" matches sequences of spaces/tabs'],
                  ['+',          'One or more of the preceding',         '"a+" matches "a", "aa", "aaa"'],
                  ['*',          'Zero or more of the preceding',        '"a*" matches "", "a", "aaaa"'],
                  ['?',          'Zero or one (optional)',                '"colou?r" matches "color" and "colour"'],
                  ['^',          'Start of line (with multiline flag)',   '"^Hello" matches "Hello" at line start'],
                  ['$',          'End of line (with multiline flag)',     '"world$" matches "world" at line end'],
                  ['[aeiou]',    'Any character in the set',              '"[aeiou]" matches any single vowel'],
                  ['[^aeiou]',   'Any character NOT in the set',         '"[^aeiou]" matches any non-vowel'],
                  ['(x)',        'Capture group',                         '"(\\w+)@" captures username in email'],
                  ['x|y',        'Match x or y',                         '"cat|dog" matches "cat" or "dog"'],
                  ['\\b',        'Word boundary',                        '"\\bword\\b" matches whole word only'],
                ].map(([pattern, meaning, example], i) => (
                  <tr key={pattern} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: 'var(--green)', fontSize: 13 }}>{pattern}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{meaning}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-3)', fontSize: 13, fontStyle: 'italic' }}>{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Practical examples with regex
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              {
                task: 'Remove all blank lines',
                find: '^\\s*$\\n?',
                replace: '',
                flags: 'Regex + Global + Multiline',
                desc: 'Matches lines containing only whitespace (including completely empty lines) and deletes them. Useful for cleaning up pasted text with excessive spacing.',
              },
              {
                task: 'Swap first and last name',
                find: '(\\w+)\\s+(\\w+)',
                replace: '$2, $1',
                flags: 'Regex + Global',
                desc: 'Captures two words and outputs them reversed with a comma. Turns "John Smith" into "Smith, John". Useful for normalizing name lists for mail merges or CRM imports.',
              },
              {
                task: 'Remove HTML tags',
                find: '<[^>]+>',
                replace: '',
                flags: 'Regex + Global',
                desc: 'Matches any HTML tag (opening or closing) and removes it, leaving only the text content. Useful for extracting plain text from copied web content.',
              },
              {
                task: 'Add http:// to bare URLs',
                find: '(?<!https?://)\\bwww\\.\\S+',
                replace: 'https://$&',
                flags: 'Regex + Global',
                desc: 'Finds URLs starting with "www." that do not already have a protocol and prepends "https://". Useful for normalizing link lists in content.',
              },
            ].map(({ task, find, replace, flags, desc }) => (
              <div key={task} style={{ padding: '18px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>{task}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>Find</div>
                    <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', background: 'var(--green-lt)', padding: '3px 8px', borderRadius: 4, display: 'block', wordBreak: 'break-all' }}>{find}</code>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>Replace</div>
                    <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink)', background: 'var(--border)', padding: '3px 8px', borderRadius: 4, display: 'block' }}>{replace || '(empty)'}</code>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--ink-4)', marginBottom: 4 }}>Flags: <strong style={{ color: 'var(--ink-3)' }}>{flags}</strong></div>
                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Find and replace vs. text editor: when to use which
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            Most code editors (VS Code, Sublime Text, Notepad++) have built-in find-and-replace with regex support. This tool is not a replacement for those — it is a supplement for cases where opening an editor adds unnecessary friction:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ padding: '18px', background: 'var(--green-lt)', border: '1px solid var(--green-mid, rgba(5,150,105,.2))', borderRadius: 'var(--r-l)' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green)', marginBottom: 10 }}>Use this web tool when</div>
              <ul style={{ paddingLeft: 18, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.85, margin: 0 }}>
                <li>You need a quick one-off replacement on pasted content</li>
                <li>You are on a machine without your usual editor installed</li>
                <li>You want to share the transformation with a non-technical colleague</li>
                <li>You are working on a phone or tablet</li>
                <li>You do not want to save an intermediate file</li>
              </ul>
            </div>
            <div style={{ padding: '18px', background: 'var(--blue-lt)', border: '1px solid rgba(37,99,235,.2)', borderRadius: 'var(--r-l)' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>Use a text editor when</div>
              <ul style={{ paddingLeft: 18, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.85, margin: 0 }}>
                <li>You need to replace across multiple files at once</li>
                <li>Your input is a large file (megabytes of text)</li>
                <li>You need a preview of each match before replacing</li>
                <li>You need undo history for multiple replacement operations</li>
                <li>You are working on production code that needs version control</li>
              </ul>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Related text tools
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
            {[
              { href: '/tools/duplicate-line-remover', label: 'Duplicate Line Remover', desc: 'Remove repeated lines — simpler alternative when you just need to deduplicate, no pattern matching required' },
              { href: '/tools/sort-lines',             label: 'Sort Lines',             desc: 'Sort text lines alphabetically, by length, or numerically with optional deduplication' },
              { href: '/tools/text-to-slug',           label: 'Text to Slug',           desc: 'Convert any text to a clean URL slug — strips special characters and formats for web use' },
              { href: '/tools/case-converter',         label: 'Case Converter',         desc: 'Change text case in bulk — to UPPERCASE, lowercase, Title Case, camelCase, and more' },
            ].map(({ href, label, desc }) => (
              <a key={href} href={href} style={{ display: 'block', padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', textDecoration: 'none', transition: 'border-color .13s' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5 }}>{desc}</div>
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
