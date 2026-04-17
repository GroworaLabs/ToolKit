const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
    {children}
  </h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>{children}</p>
);

export default function RemoveWhitespaceContent() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>

      {/* ── What is whitespace removal ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>What is whitespace removal and why does it matter?</H2>
        <P>
          Whitespace is any character in a text document that takes up space without producing a visible glyph.
          The most common whitespace characters are the space, the tab, and various forms of line breaks. When
          you type a document, whitespace is intentional — you press the spacebar to separate words, Tab to
          indent, and Enter to start a new line. But in many real-world scenarios, whitespace accumulates
          unintentionally and causes problems in every downstream system that processes the text.
        </P>
        <P>
          Text copied from PDF documents is one of the most common sources of unwanted whitespace. PDFs store
          text as positioned glyphs on a coordinate plane rather than as a continuous string, so when a PDF
          reader reconstructs text for clipboard copying, it estimates spacing by measuring gaps between glyph
          positions. This often results in multiple consecutive spaces where a single space should appear,
          leading spaces before lines, and trailing spaces after the last visible character on each line.
          Similar problems arise when copying from web pages with complex CSS layouts, from spreadsheet cells
          that pad with spaces, or from legacy systems that store data in fixed-width field formats.
        </P>
        <P>
          Data professionals, developers, and writers encounter whitespace problems constantly. A database import
          fails because a field value has a trailing space that creates a uniqueness violation. A string
          comparison in code returns false because one value has a leading space and the other does not. A word
          count appears higher than expected because blank lines are counted as content. This tool gives you
          four independent controls to remove exactly the whitespace you want without touching anything else.
        </P>
      </section>

      {/* ── How to use ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>How to use the whitespace remover — step by step</H2>
        <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            {
              n: '1',
              title: 'Paste your text',
              desc: 'Type or paste the text you want to clean into the input area. The tool handles any text — plain prose, code snippets, CSV data, email body text, or content extracted from PDFs and scanned documents. There is no strict character limit, though very large pastes may slow down rendering on older devices.',
            },
            {
              n: '2',
              title: 'Enable the operations you need',
              desc: 'Four toggle switches control which whitespace operations are applied. You can enable any combination independently. The tool always applies them in the same fixed order: tabs are converted first, then multiple spaces are collapsed, then line edges are trimmed, then blank lines are removed. This order prevents operations from interfering with each other — see the section below for why it matters.',
            },
            {
              n: '3',
              title: 'Preview the output instantly',
              desc: 'The cleaned text appears immediately in the output field as you change any setting. No button press required. Toggle operations on and off to compare before and after, so you understand exactly what each one does to your specific content before committing.',
            },
            {
              n: '4',
              title: 'Copy the result',
              desc: 'Click the Copy button to send the cleaned text to your clipboard. The button shows the character count so you can confirm the output size and verify that whitespace removal reduced the count as expected before pasting into another application.',
            },
          ].map(({ n, title, desc }) => (
            <li key={n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--bg-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{n}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{title}</div>
                <P>{desc}</P>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Operation reference ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>The four operations — what each one does</H2>
        <P>
          Each operation targets a distinct type of whitespace problem. Understanding what each one does
          prevents you from accidentally removing whitespace that carries meaning in your context.
        </P>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['Operation', 'What it targets', 'Best for', 'Avoid when'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Trim line edges',    'Leading and trailing spaces on every line', 'PDF extraction, copy-paste artifacts, fixed-width data', 'Code where indentation is meaningful'],
                ['Collapse spaces',   'Sequences of 2+ spaces → single space',     'Prose cleanup, OCR output, manual double-spacing',       'ASCII art, fixed-width formatted output'],
                ['Convert tabs',      'Tab characters → single space',              'Code pasted into prose context, TSV normalization',      'TSV files where tabs delimit columns'],
                ['Remove blank lines','Empty and whitespace-only lines deleted',    'Per-line imports, dense output formatting',              'Prose documents with intentional paragraphs'],
              ].map(([op, what, best, avoid], i) => (
                <tr key={op} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{op}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)', fontSize: 13 }}>{what}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--green)', fontSize: 13 }}>{best}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-3)', fontSize: 13 }}>{avoid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Processing order ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>Why processing order matters</H2>
        <P>
          The tool applies the four operations in a specific sequence: tab conversion first, space collapsing
          second, edge trimming third, and blank line removal last. This order is not arbitrary — applying
          operations in a different sequence can produce incorrect or unexpected results.
        </P>
        <P>
          Consider a line that starts with a tab followed by two spaces. If edge trimming ran before tab
          conversion, the trim would encounter a tab character at the start of the line. Depending on the
          environment, a tab may or may not be treated as trimmable whitespace in the same pass as spaces.
          Converting tabs to spaces first ensures that the edge trim always operates on a uniform set of
          ASCII space characters regardless of what the original input contained. Similarly, collapsing
          multiple spaces before trimming means a line starting with ten spaces is first reduced to one
          space, and then that single leading space is removed by the trim — a reliable two-pass approach.
        </P>
        <P>
          Blank line removal runs last because earlier operations can create new blank lines. A line
          containing only tab characters is not an empty line. After tab conversion it becomes a line
          containing only a single space, which still is not technically empty. After edge trimming, that
          space is removed and the line becomes genuinely empty. Only at that point does blank line removal
          correctly identify and delete it. Running blank line removal first would miss this originally-tab-only
          line entirely. The fixed processing order makes every combination of toggles behave predictably.
        </P>
      </section>

      {/* ── Use cases ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>Common use cases in detail</H2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              title: 'Cleaning text extracted from PDF documents',
              body: 'PDF-to-text extraction is notoriously noisy. The copy engine reconstructs a linear string from positioned glyphs and estimates spacing by measuring coordinate gaps between characters. This frequently produces multiple consecutive spaces, leading spaces on lines from left-margin positioning, and trailing spaces from glyph bounding boxes. Enabling Trim line edges and Collapse spaces together handles the most common PDF extraction artifacts. For multi-column PDFs where text from adjacent columns is intermixed, blank line removal also helps eliminate the separator lines that appear between column segments.',
            },
            {
              title: 'Normalizing data before database import',
              body: 'When importing text data from spreadsheets, CSV exports, or legacy systems, field values often contain leading or trailing spaces that silently corrupt data quality. A product name stored as "Widget A " (with a trailing space) is treated as a different value from "Widget A" by most databases and programming languages. This causes uniqueness constraint violations during import, lookup failures in application code, and incorrect sort order in queries. Running Trim line edges on the text before import eliminates these silent issues without writing custom pre-processing scripts.',
            },
            {
              title: 'Preparing text for string comparison',
              body: 'Software tests and data validation logic frequently compare strings, and whitespace differences cause false failures that are difficult to diagnose. If you receive a JSON payload where a field was serialized with a trailing space, your equality check fails even though the visible content is logically identical. Normalizing both strings before comparison eliminates whitespace as a variable. This tool helps you manually inspect what a cleaned version of a string looks like before writing the normalization logic in your application code.',
            },
            {
              title: 'Fitting text within character limits',
              body: 'Database columns, API request fields, and CMS text fields sometimes have character limits. A bio or description field might allow 500 characters, but if the extracted text contains blank lines and doubled spaces, much of that budget is wasted on invisible characters. Enabling all four operations together can significantly reduce the character count of extracted text, making content fit within limits without manually editing it. The output character count shown by the Copy button lets you verify the final size before pasting.',
            },
            {
              title: 'Processing code pasted into non-code contexts',
              body: 'When copying code snippets from an IDE into a plain-text email, a project management comment, or a documentation system that does not preserve code formatting, tab indentation often becomes a mix of tabs and spaces with varying widths. Converting tabs to spaces normalizes the representation so the code is readable even in environments that render tabs at unexpected widths. Pair this with edge trimming to strip leading indentation from snippets that were copied from deeply-nested blocks where indentation is part of the structure rather than part of the content.',
            },
            {
              title: 'Cleaning OCR output from scanned documents',
              body: 'Optical character recognition software frequently introduces extra spaces at character boundaries where confidence is low, leading spaces on lines that were slightly misaligned during scanning, and blank lines between content blocks from the segmentation algorithm. These artifacts are a normal byproduct of the recognition process. Running trim, collapse, and optionally blank line removal produces a much cleaner OCR result closer to the original document. This is especially useful when the OCR output will be imported into a CMS, indexed for search, or compared against other text.',
            },
          ].map(({ title, body }) => (
            <div key={title} style={{ padding: '18px 20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>{title}</div>
              <P>{body}</P>
            </div>
          ))}
        </div>
      </section>

      {/* ── Whitespace in HTML and SQL ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>Whitespace in HTML, SQL, and JavaScript</H2>
        <P>
          Different technologies treat whitespace very differently, and knowing the rules for your target
          environment helps you decide which operations to apply.
        </P>
        <P>
          In HTML, browsers collapse multiple consecutive whitespace characters to a single space in normal
          flow according to the default CSS white-space value of "normal". Extra spaces in your HTML source
          are invisible to end users and whitespace cleanup is often unnecessary for correct rendering.
          However, elements with white-space: pre or white-space: pre-wrap preserve all whitespace literally,
          making extra spaces visible. Attribute values are also whitespace-sensitive — extra spaces in a
          class attribute string can cause class-matching failures in older JavaScript libraries that do
          exact-string comparisons rather than token splitting.
        </P>
        <P>
          In SQL, most databases perform trailing-space-insensitive comparisons for CHAR columns but are
          fully whitespace-sensitive for VARCHAR and TEXT columns. A WHERE clause filtering by name = 'John'
          will not match a stored value of 'John ' in PostgreSQL or SQLite even though the names look
          identical when printed. Always trim and normalize user-supplied strings before storing them to
          a database so that queries, unique indexes, and foreign key constraints work correctly without
          needing to normalize at query time.
        </P>
        <P>
          In JavaScript, the strict equality operator === is fully whitespace-sensitive. The string 'Hello'
          does not equal ' Hello' or 'Hello '. Form input values read via element.value automatically
          contain whatever the user typed, including accidental leading or trailing spaces. The standard
          practice is to call str.trim() on any user-supplied string before comparison, storage, or
          validation. When building search functionality, normalize both the query and the stored values
          so that whitespace differences do not cause missed matches.
        </P>
      </section>

      {/* ── Programming reference ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>Whitespace normalization in code — language reference</H2>
        <P>
          For automated pipelines, the language-native approach is more efficient than a browser tool.
          The patterns below cover the most common whitespace operations in six major languages.
        </P>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
          {[
            { lang: 'JavaScript', trim: 'str.trim()',                    collapse: 'str.replace(/  +/g, " ")' },
            { lang: 'Python',     trim: 's.strip()',                     collapse: '" ".join(s.split())' },
            { lang: 'Java',       trim: 's.strip()  // Java 11+',        collapse: 's.replaceAll("\\\\s+", " ")' },
            { lang: 'Go',         trim: 'strings.TrimSpace(s)',          collapse: 'regexp compile + ReplaceAllString' },
            { lang: 'Ruby',       trim: 'str.strip',                     collapse: 'str.gsub(/  +/, " ")' },
            { lang: 'PHP',        trim: 'trim($str)',                    collapse: 'preg_replace("/  +/", " ", $str)' },
          ].map(({ lang, trim, collapse }) => (
            <div key={lang} style={{ padding: '14px', background: 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-m)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.04em' }}>{lang}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-4)', marginBottom: 4 }}>Trim edges:</div>
              <code style={{ display: 'block', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--green)', background: 'var(--green-lt)', padding: '4px 8px', borderRadius: 4, marginBottom: 8, wordBreak: 'break-all' }}>{trim}</code>
              <div style={{ fontSize: 11, color: 'var(--ink-4)', marginBottom: 4 }}>Collapse spaces:</div>
              <code style={{ display: 'block', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)', background: 'var(--border)', padding: '4px 8px', borderRadius: 4, wordBreak: 'break-all' }}>{collapse}</code>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tips ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>Tips for effective whitespace cleanup</H2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
          {[
            { tip: 'Enable one at a time', desc: 'Toggle operations individually to isolate which one changes what. This helps you understand the input before applying all operations at once, especially with unfamiliar content.' },
            { tip: 'Keep blank lines for prose', desc: 'If your text has intentional paragraph breaks, leave Remove blank lines disabled. Enable only Trim and Collapse to clean up space artifacts while preserving paragraph structure.' },
            { tip: 'Never trim code indentation', desc: 'Trim line edges will destroy meaningful indentation in source code files. Use this tool only on prose text or data extracted from non-code sources where leading spaces are noise.' },
            { tip: 'Check character counts', desc: 'Compare the character count before and after cleaning. A large reduction means significant whitespace artifacts were present. A small reduction on short text may indicate the input was already clean.' },
            { tip: 'Mind TSV columns', desc: 'Do not enable Convert tabs when cleaning tab-separated values — it will collapse the column delimiters to spaces and destroy the table structure. Enable tabs only for prose content.' },
            { tip: 'Chain with other tools', desc: 'Whitespace removal is often step one of a pipeline. After cleaning, paste into a word counter, duplicate line remover, or sort tool. A clean baseline makes all downstream operations more reliable.' },
          ].map(({ tip, desc }) => (
            <div key={tip} style={{ padding: '14px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 6 }}>{tip}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
