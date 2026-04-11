const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
    {children}
  </h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>{children}</p>
);

export default function TextRepeaterContent() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>

      {/* ── What is a text repeater ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>What is a text repeater and who uses it?</H2>
        <P>
          A text repeater is a browser-based utility that takes any string of text and duplicates it a
          specified number of times, inserting an optional separator between each copy. It sounds simple,
          but it solves a surprisingly wide range of practical problems for developers, QA engineers,
          writers, and data professionals alike.
        </P>
        <P>
          Software developers use text repeaters to generate bulk test data without writing throwaway
          scripts. QA engineers use them to fill form fields with extremely long strings to discover
          truncation bugs. UI designers paste repeated content into mockups to simulate realistic
          text density. Data analysts use them to produce repeated delimiter-separated values for
          import testing. Writers use them to check keyword density tools by repeating a specific
          phrase a controlled number of times.
        </P>
        <P>
          Everything in this tool runs locally inside your browser using pure JavaScript. No text is
          uploaded to any server, no account is required, and the result appears instantly as you
          adjust any setting. The output can be as short as one character repeated twice or as long
          as a paragraph repeated one thousand times — whatever your task requires.
        </P>
      </section>

      {/* ── How to use ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>How to use the text repeater — step by step</H2>
        <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            {
              n: '1',
              title: 'Enter your source text',
              desc: 'Type or paste any text into the input field. You can enter a single character, a word, a sentence, or even a multi-line paragraph. The tool preserves every character exactly — Unicode letters, emoji, punctuation, line breaks, and accented characters are all supported.',
            },
            {
              n: '2',
              title: 'Set the repeat count',
              desc: 'Use the number input to choose how many times the text should be repeated. You can type any number between 1 and 1,000. The output updates immediately as you change the value, so you can dial in exactly the amount you need without pressing any button.',
            },
            {
              n: '3',
              title: 'Choose your separator',
              desc: 'Select how each copy of the text should be separated from the next one. Six options are available: no separator, new line, space, comma, pipe, and custom. Picking the right separator for your use case saves you post-processing time. For CSV data use comma, for markdown tables use pipe, for line-by-line lists use new line.',
            },
            {
              n: '4',
              title: 'Enter a custom separator if needed',
              desc: 'If none of the presets match your format, select Custom and type any character sequence in the custom field. You can use a tab character, a multi-character delimiter like " AND ", or a combination of punctuation like " ;; ". The custom separator is applied exactly as entered — no trimming or transformation is performed.',
            },
            {
              n: '5',
              title: 'Copy the result',
              desc: 'Click the Copy button to send the repeated text directly to your clipboard. The button shows the total number of repetitions and the exact character count so you know what you are copying before you paste it anywhere.',
            },
          ].map(({ n, title, desc }) => (
            <li key={n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{n}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{title}</div>
                <P>{desc}</P>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Separator reference ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>Separator modes — which one to choose</H2>
        <P>
          The separator is the glue between repetitions. Choosing the wrong separator means extra
          cleanup after pasting. The table below maps each separator to its most common use cases
          and shows what the output looks like for three repetitions of the word "Hello".
        </P>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                {['Separator', 'Output preview', 'Best for'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['New line',        'Hello\\nHello\\nHello',   'CSV rows, line-based lists, text files, grep input'],
                ['No separator',   'HelloHelloHello',           'Dense character strings, border lines, pattern generation'],
                ['Space',          'Hello Hello Hello',         'Inline word repetition, sentence-level content, word lists'],
                ['Comma',          'Hello, Hello, Hello',       'CSV values, SQL IN clauses, array literals, tag lists'],
                ['Pipe',           'Hello | Hello | Hello',     'Markdown tables, pipe-delimited data, bash pipelines'],
                ['Custom',         'Hello [sep] Hello [sep]…',  'Tab-delimited, multi-char delimiters, logic operators'],
              ].map(([sep, preview, use], i) => (
                <tr key={sep} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{sep}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', fontWeight: 600, wordBreak: 'break-all' }}>{preview}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-3)', fontSize: 13 }}>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Use cases ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>Common use cases explained</H2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              title: 'Generating test data for databases and APIs',
              body: 'When building or testing a database import pipeline, you often need dozens or hundreds of realistic-looking rows. Repeating a template record — for example "Alice Smith, alice@test.com, New York, 1980-01-15" — with a newline separator produces a ready-to-import CSV in seconds. For API load testing, repeating a JSON object template builds a payload array that exercises your endpoint under realistic conditions without writing any code.',
            },
            {
              title: 'Testing UI overflow and truncation behavior',
              body: 'Input fields, table cells, notification banners, and card components all have visual limits. Repeating a very long word like "Supercalifragilisticexpialidocious" 10 or 20 times quickly produces a string that overflows most containers, letting you verify that your CSS handles overflow correctly with ellipsis, word-break, or scroll behavior. This is a standard QA technique that catches layout bugs before real users encounter them.',
            },
            {
              title: 'Creating decorative text dividers and borders',
              body: 'Plain-text environments — README files, terminal output, email signatures, comment blocks in code — often use repeated characters to create visual separators. Repeating "─" 60 times produces a clean horizontal rule. Repeating "=" 80 times creates a section divider that fits a standard terminal width. The no-separator mode is perfect for this: the characters are concatenated tightly without gaps to form a solid line.',
            },
            {
              title: 'Building repeated keyword strings for testing density tools',
              body: 'SEO professionals and content writers occasionally need to verify that a keyword density checker or readability analyzer works correctly. By repeating a target keyword a specific number of times with space separators, you can construct a passage with a known keyword density and verify that your analysis tool reports the expected percentage. This is a calibration technique, not a content strategy — keyword stuffing harms rankings.',
            },
            {
              title: 'Filling placeholders in design mockups',
              body: 'When building interactive prototypes or static mockups, you need realistic text content to evaluate visual balance and typography. Repeating a product name, a user comment, or a list item a specific number of times fills a component with believable content that is easier to evaluate than abstract placeholder boxes. Unlike Lorem Ipsum, the repeated text can be domain-specific, which helps stakeholders assess readability in context.',
            },
            {
              title: 'Populating spreadsheet columns quickly',
              body: 'To fill a column in Excel or Google Sheets with a repeated value, repeat the value with newline separators, copy the output, and paste it starting from the first cell of the target column. The spreadsheet application splits the pasted text into individual rows automatically. This is faster than typing a value into one cell and dragging the fill handle, especially when you need to fill non-adjacent columns or want to prevent the spreadsheet from auto-incrementing values.',
            },
          ].map(({ title, body }) => (
            <div key={title} style={{ padding: '18px 20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>{title}</div>
              <P>{body}</P>
            </div>
          ))}
        </div>
      </section>

      {/* ── Performance and limits ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>Performance, limits, and browser memory</H2>
        <P>
          The tool supports up to 1,000 repetitions. For most text inputs, even 1,000 repetitions
          is well within what modern browsers handle without any noticeable slowdown. However, output
          size scales with both the length of the source text and the number of repetitions. A
          1,000-character paragraph repeated 1,000 times produces roughly one megabyte of text.
          Browsers handle this without issue, but textarea rendering for very large strings may
          introduce a brief delay on slower devices.
        </P>
        <P>
          If you need to generate millions of repetitions — for example, creating a multi-gigabyte
          file for performance benchmarking — a purpose-written script in Python, JavaScript, or Bash
          is more appropriate than a browser-based tool. Python's string multiplication operator
          produces a repeated string in a single expression, and writing it to a file with a streaming
          write loop avoids loading the entire content into memory at once.
        </P>
        <P>
          The tool does not impose a character limit on the source text field, but very large paste
          operations may slow down the browser's text rendering. For production data generation
          tasks involving millions of records, use a database seed script or a dedicated data
          generation library appropriate for your technology stack.
        </P>
      </section>

      {/* ── Programming comparison ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>Repeating text in code — language quick reference</H2>
        <P>
          For cases where you need text repetition integrated directly into a script or application,
          every major programming language provides a straightforward approach. The browser tool is
          best for one-off tasks; these code patterns are best when repetition is part of a larger
          automated workflow.
        </P>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
          {[
            { lang: 'Python',     expr: '"abc" * 3',                                      sep: '", ".join(["abc"] * 3)' },
            { lang: 'JavaScript', expr: '"abc".repeat(3)',                                 sep: 'Array(3).fill("abc").join(", ")' },
            { lang: 'Ruby',       expr: '"abc" * 3',                                      sep: '["abc"] * 3).join(", ")' },
            { lang: 'Go',         expr: 'strings.Repeat("abc", 3)',                        sep: 'strings.Join(slice, ", ")' },
            { lang: 'Java',       expr: '"abc".repeat(3)  // Java 11+',                   sep: 'String.join(", ", nCopies(3, "abc"))' },
            { lang: 'Bash',       expr: 'printf "abc%.0s" {1..3}',                        sep: 'printf "%s, " abc abc abc' },
          ].map(({ lang, expr, sep }) => (
            <div key={lang} style={{ padding: '14px', background: 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-m)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.04em' }}>{lang}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-4)', marginBottom: 4 }}>No separator:</div>
              <code style={{ display: 'block', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--green)', background: 'var(--green-lt)', padding: '4px 8px', borderRadius: 4, marginBottom: 8, wordBreak: 'break-all' }}>{expr}</code>
              <div style={{ fontSize: 11, color: 'var(--ink-4)', marginBottom: 4 }}>With separator:</div>
              <code style={{ display: 'block', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)', background: 'var(--border)', padding: '4px 8px', borderRadius: 4, wordBreak: 'break-all' }}>{sep}</code>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tips ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>Tips for getting the most out of the text repeater</H2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
          {[
            { tip: 'Multi-line source text', desc: 'Paste a full paragraph as the source and the tool repeats the entire block, preserving internal line breaks inside each copy.' },
            { tip: 'Blank-line separation', desc: 'Set separator to Custom and press Enter twice in the field to get a blank line between each repetition — useful for separated content blocks.' },
            { tip: 'Emoji and Unicode', desc: 'Emoji, CJK, Arabic, Cyrillic, and mathematical symbols all repeat correctly because the tool works with Unicode code points, not bytes.' },
            { tip: 'Counting output chars', desc: 'The result shows exact character count before you copy. Use this to hit a specific byte target for load testing or protocol buffer sizing.' },
            { tip: 'Tab-delimited output', desc: 'In Custom mode, paste a real tab character into the separator field to generate TSV (tab-separated values) ready for spreadsheet import.' },
            { tip: 'Combine with other tools', desc: 'Repeat a keyword phrase, then paste into the Word Counter to verify keyword density. Or repeat a URL template, then process with Find and Replace.' },
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
