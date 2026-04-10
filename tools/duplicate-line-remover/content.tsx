export default function DuplicateLineRemoverContent() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
      <div>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            What is a duplicate line remover?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            A duplicate line remover scans a block of text line-by-line, identifies repeated lines, and outputs only unique lines — preserving the first occurrence of each. It is the text equivalent of running <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 6px', borderRadius: 4 }}>sort -u</code> or <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 6px', borderRadius: 4 }}>awk '!seen[$0]++'</code> on a Unix terminal, but available instantly in the browser without any setup.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            Data professionals, SEO specialists, developers, and content teams use duplicate line removers to clean imported data, normalize lists, and prepare text files for further processing. Whether you are deduplicating an email marketing list, a keyword research export, a log file, or a config file — this tool handles it in seconds.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            The tool offers four processing options: case-insensitive matching, blank line removal, sorted output, and whitespace trimming before comparison. These options can be combined freely to match any deduplication scenario.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            How to use the duplicate line remover
          </h2>
          <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { n: '1', title: 'Paste your text', desc: 'Paste any multi-line text into the left panel — email lists, keyword exports, config files, or log data. The right panel updates instantly.' },
              { n: '2', title: 'Set matching options', desc: 'Toggle Case-insensitive if you want "Apple" and "apple" treated as the same line. Toggle Trim whitespace to treat "  apple  " and "apple" as duplicates.' },
              { n: '3', title: 'Optionally sort output', desc: 'Enable Sort output to alphabetically sort the deduplicated lines. Combined with Remove blank lines, this produces clean sorted lists ideal for further processing.' },
              { n: '4', title: 'Copy the result', desc: 'Click Copy on the output panel to grab the deduplicated text. The stats below the panels show exactly how many lines were kept and how many duplicates were removed.' },
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
            Deduplication options explained
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
            Each option changes how lines are compared or what the output contains. Here is a precise description of what each option does:
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                  {['Option', 'Default', 'What it does', 'When to use'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Case-insensitive', 'Off', '"Apple" and "apple" count as the same line; first occurrence kept', 'Cleaning email lists, keyword lists, names — any data where case differences are accidental'],
                  ['Remove blank lines', 'Off', 'Empty lines and whitespace-only lines are stripped entirely from output', 'Producing compact lists with no visual gaps between items'],
                  ['Sort output', 'Off', 'Deduplicated lines sorted A→Z alphabetically using locale-aware comparison', 'Generating sorted word lists, sorted keyword files, sorted config keys'],
                  ['Trim whitespace', 'Off', 'Leading and trailing spaces stripped before comparison (output preserves original spacing)', 'CSV exports with inconsistent padding, copy-pasted data from web pages'],
                ].map(([option, def, does, when], i) => (
                  <tr key={option} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{option}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{def}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-2)', fontSize: 13 }}>{does}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-3)', fontSize: 13 }}>{when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Real-world use cases
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
            {[
              {
                title: 'Email marketing list cleanup',
                desc: 'Before importing a contact list into Mailchimp, Klaviyo, or Brevo, run it through the deduplicator with case-insensitive matching enabled. This prevents the same contact from receiving duplicate emails, which damages sender reputation and leads to unsubscribes.',
                color: 'var(--blue-lt)',
                border: 'rgba(37,99,235,.2)',
              },
              {
                title: 'SEO keyword list merging',
                desc: 'When you merge keyword research from Ahrefs, Semrush, and Google Search Console, the combined export always contains duplicates. Drop the merged list here, enable case-insensitive mode, and get a clean deduplicated keyword set ready for content planning.',
                color: 'var(--green-lt)',
                border: 'var(--green-mid, rgba(5,150,105,.2))',
              },
              {
                title: 'Log file analysis',
                desc: 'Server error logs and application logs often repeat the same error message hundreds of times. Removing duplicates collapses the noise, letting you see the distinct error types rather than wading through thousands of identical stack traces.',
                color: '#fffbeb',
                border: 'rgba(217,119,6,.2)',
              },
              {
                title: 'Configuration file cleanup',
                desc: 'nginx configs, .env files, hosts files, and requirements.txt all accumulate duplicate entries over time. Running them through the deduplicator with trim enabled catches entries that appear identical but differ only in trailing spaces.',
                color: 'var(--white)',
                border: 'var(--border)',
              },
            ].map(({ title, desc, color, border }) => (
              <div key={title} style={{ padding: '18px', background: color, border: `1px solid ${border}`, borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>{title}</div>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--ink-2)', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Deduplication vs. sorting — which comes first?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            This tool always deduplicates first, then sorts. This means the first occurrence of each line is the one that survives into the sorted output — not necessarily the alphabetically first version. For most data cleaning tasks this is the correct behavior: you want to preserve original data values, just eliminate repetition.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            If you need to sort without deduplication — for example, to order a list alphabetically while keeping every entry — use the <a href="/tools/sort-lines" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Sort Lines tool</a> instead. It gives you alphabetical, reverse, length-based, and numeric sort modes without removing any content.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            For finding and eliminating specific patterns (not just exact duplicates), the <a href="/tools/find-and-replace" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Find and Replace tool</a> with regex support lets you target and remove any pattern — empty lines matching a specific format, lines starting with a prefix, or lines containing a specific keyword.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Related text tools
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
            {[
              { href: '/tools/sort-lines',        label: 'Sort Lines',          desc: 'Sort text lines alphabetically, by length, or numerically — without removing any content' },
              { href: '/tools/find-and-replace',  label: 'Find and Replace',    desc: 'Replace or delete specific patterns across a text block using plain text or regex' },
              { href: '/tools/word-counter',      label: 'Word Counter',        desc: 'Count words, lines, characters and unique words in any text' },
              { href: '/tools/text-diff',         label: 'Text Diff',           desc: 'Compare two texts and highlight exactly what changed between them' },
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
