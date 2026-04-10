export default function SortLinesContent() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
      <div>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            What is a line sorter?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            A line sorter rearranges the lines of a text block according to a chosen sort criterion — alphabetically, by character length, or numerically. It is the browser-based equivalent of Unix commands like <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 6px', borderRadius: 4 }}>sort</code>, <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 6px', borderRadius: 4 }}>sort -r</code>, and <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 6px', borderRadius: 4 }}>sort -n</code>, available instantly without a terminal.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            Developers, data analysts, writers, and SEO professionals use line sorters daily to organize keyword lists, normalize configuration files, sort imports in code, prepare sorted CSVs, and arrange content hierarchically. Sorting is a foundational data operation — having it available as a fast, no-install web tool speeds up hundreds of small tasks.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            This tool supports six sort modes, case-insensitive matching, optional duplicate removal, and blank line handling — covering the most common sorting workflows without requiring spreadsheet software or command-line access.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            How to use the line sorter
          </h2>
          <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { n: '1', title: 'Choose a sort mode', desc: 'Pick from A→Z, Z→A, Shortest first, Longest first, Numeric ascending, or Numeric descending. The right panel updates as soon as you select a mode.' },
              { n: '2', title: 'Set options', desc: 'Enable Case-insensitive to treat "Apple" and "apple" as equal. Enable Remove duplicates to eliminate repeated lines after sorting. Enable Remove blank lines for compact output.' },
              { n: '3', title: 'Paste your text', desc: 'Paste any multi-line text into the left panel. The sorted result appears instantly in the right panel with a line count.' },
              { n: '4', title: 'Copy the result', desc: 'Click Copy on the output panel to grab the sorted lines ready for paste into your editor, spreadsheet, or terminal.' },
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
            Sort modes compared
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
            Each sort mode is designed for a different type of data. Here is a guide to which mode to use for common data types:
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                  {['Sort mode', 'Best for', 'Example input', 'Example output'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['A → Z',          'Names, keywords, tags, countries',             'banana, apple, cherry',   'apple, banana, cherry'],
                  ['Z → A',          'Reverse dictionaries, reverse keyword lists',  'apple, banana, cherry',   'cherry, banana, apple'],
                  ['Shortest first', 'Menu items, button labels, tag clouds',         'watermelon, fig, kiwi',   'fig, kiwi, watermelon'],
                  ['Longest first',  'Identifying verbose entries, longest URLs',     'watermelon, fig, kiwi',   'watermelon, kiwi, fig'],
                  ['Numeric ↑',      'Rankings, scores, version numbers, IDs',        '10 items, 2 items, 7',    '2 items, 7, 10 items'],
                  ['Numeric ↓',      'Top-N lists, leaderboards, descending scores',  '10, 2, 7',                '10, 7, 2'],
                ].map(([mode, best, input, output], i) => (
                  <tr key={mode} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--green)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>{mode}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{best}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-3)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{input}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--green)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Alphabetical vs. numeric sorting: why it matters
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            A common mistake is using alphabetical sort on numbers, which produces counter-intuitive results. Alphabetical sort compares characters left-to-right, so <strong style={{ color: 'var(--ink)' }}>"10" sorts before "2"</strong> because the character "1" has a lower ASCII value than "2". This is called lexicographic ordering.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            Numeric sort extracts the leading number from each line and sorts by actual value, so "2" correctly comes before "10". The table below shows the difference:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { title: 'Alphabetical sort (wrong for numbers)', lines: ['1', '10', '100', '2', '20', '3'], color: '#fef2f2', border: 'rgba(220,38,38,.2)', label: 'Lexicographic' },
              { title: 'Numeric sort (correct for numbers)', lines: ['1', '2', '3', '10', '20', '100'], color: 'var(--green-lt)', border: 'var(--green-mid, rgba(5,150,105,.2))', label: 'By value' },
            ].map(({ title, lines, color, border, label }) => (
              <div key={label} style={{ padding: '16px', background: color, border: `1px solid ${border}`, borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>{title}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {lines.map(l => <span key={l} style={{ color: 'var(--ink)' }}>{l}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Practical workflows for line sorting
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
            {[
              { title: 'Sorting Python imports', desc: 'Python style guides (PEP8, isort) require imports sorted alphabetically. Paste your import block, sort A→Z, and copy back — no need to install isort for a quick manual fix.' },
              { title: 'Organizing CSS properties', desc: 'Some teams alphabetize CSS properties within each rule for consistency. Paste the property list, sort A→Z, and reorder. Pair with the case converter for consistent formatting.' },
              { title: 'Preparing keyword lists', desc: 'SEO keyword research exports from Ahrefs or Semrush can have thousands of keywords. Sort alphabetically and enable Remove duplicates for a clean, deduplicated master list ready for content planning.' },
              { title: 'Sorting data for readability', desc: 'Reference tables, feature comparison lists, and changelogs are easier to read when sorted. Use this tool to quickly sort any tabular text data before pasting it into a document or spreadsheet.' },
            ].map(({ title, desc }) => (
              <div key={title} style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>{title}</div>
                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Related text tools
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
            {[
              { href: '/tools/duplicate-line-remover', label: 'Duplicate Line Remover', desc: 'Remove repeated lines from text with case-insensitive matching and trim options' },
              { href: '/tools/find-and-replace',       label: 'Find and Replace',       desc: 'Replace or delete patterns across text using plain strings or regular expressions' },
              { href: '/tools/word-counter',           label: 'Word Counter',           desc: 'Count words, lines, unique words, and reading time in any block of text' },
              { href: '/tools/case-converter',         label: 'Case Converter',         desc: 'Convert text between camelCase, snake_case, Title Case, and more naming styles' },
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
