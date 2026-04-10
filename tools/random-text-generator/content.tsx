export default function RandomTextContent() {
  const h2Style: React.CSSProperties = {
    fontFamily: 'Outfit, sans-serif',
    fontWeight: 700,
    fontSize: 'clamp(18px, 2.5vw, 24px)',
    color: 'var(--ink)',
    letterSpacing: '-0.02em',
    marginBottom: 16,
  };

  const pStyle: React.CSSProperties = {
    fontSize: 15,
    lineHeight: 1.75,
    color: 'var(--ink-2)',
    marginBottom: 14,
  };

  const codeStyle: React.CSSProperties = {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 13,
    background: 'var(--border)',
    padding: '1px 5px',
    borderRadius: 3,
  };

  const linkStyle: React.CSSProperties = {
    color: 'var(--green)',
    textDecoration: 'underline',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: 48,
  };

  const cardStyle: React.CSSProperties = {
    padding: '14px 16px',
    background: 'var(--white)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--r-l)',
    boxShadow: 'var(--sh-xs)',
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>

      {/* ── Section 1: What is a random text generator ────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What is a random text generator?</h2>
        <p style={pStyle}>
          A random text generator produces sequences of words, sentences, or paragraphs that are linguistically valid but semantically meaningless — real words arranged in ways that do not form coherent ideas. Unlike a language model that tries to generate meaningful prose, a random text generator is explicitly designed to produce neutral, contentless placeholder text for design mockups, development testing, and database seeding.
        </p>
        <p style={pStyle}>
          The most famous placeholder text is Lorem Ipsum — a scrambled extract from Cicero's <em>de Finibus Bonorum et Malorum</em> that has been the default filler in publishing since the 1500s and in digital design since the 1980s. Lorem Ipsum is Latin, which makes it visually distinct from actual content. That distinctiveness is simultaneously its greatest strength and its greatest weakness.
        </p>
        <p style={pStyle}>
          Random English text generators take a different approach: they draw from a vocabulary of common English words and assemble them into grammatically plausible structures using simple rules or Markov-chain-style transitions. The output looks like real content at a glance — enough to let stakeholders evaluate a layout — but contains no actual information, so reviewers cannot mistake placeholder copy for final approved content.
        </p>
        <p style={pStyle}>
          In software development, random text generators serve a second important role beyond visual placeholders: generating test data. When you need a database table populated with thousands of rows, an API endpoint exercised with variable-length inputs, or a UI tested against edge-case string lengths, a random text generator can produce exactly the volume and variability of text you need — on demand, in seconds, without writing a custom script.
        </p>
        <p style={{ ...pStyle, marginBottom: 0 }}>
          This tool generates random English words, sentences, and paragraphs in configurable quantities. You can copy the output directly into a design file, paste it into a database seeding script, use it as a request body in an API test, or pipe it into any other workflow that needs realistic-looking but content-free text.
        </p>
      </section>

      {/* ── Section 2: Random text vs Lorem Ipsum ─────────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Random text vs Lorem Ipsum: when to use each</h2>
        <p style={pStyle}>
          Both random English text and Lorem Ipsum fill the same conceptual role — neutral placeholder content — but they behave differently in practice. Choosing the wrong one for your context creates friction: clients who cannot evaluate layouts because they are confused by Latin, or QA engineers whose spell-checkers flag every word in a test report. Here is a direct comparison.
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 14 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                {['Criterion', 'Random English', 'Lorem Ipsum'].map((h) => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                [
                  'Language recognition',
                  'Immediately readable — feels like real content',
                  'Visually distinct — nobody mistakes it for final copy',
                ],
                [
                  'Word length variation',
                  'Natural variation across short and long words',
                  'Fixed corpus — same word lengths repeat predictably',
                ],
                [
                  'Client readability',
                  'Non-technical clients can engage with layouts naturally',
                  'Clients sometimes find Latin off-putting or confusing',
                ],
                [
                  'Spell-check interference',
                  'Real words pass spell-check; no false positives',
                  'Triggers spell-check warnings in every editor',
                ],
                [
                  'Cultural appropriateness',
                  'Works globally for English-language projects',
                  'Western/Latin bias; may feel inappropriate in some markets',
                ],
                [
                  'Realism for user testing',
                  'Better for usability testing — users read naturally',
                  'Users mentally skip Lorem Ipsum; less realistic behaviour',
                ],
              ].map(([criterion, randomEnglish, loremIpsum], i) => (
                <tr key={criterion} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{criterion}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{randomEnglish}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-3)' }}>{loremIpsum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ ...pStyle, marginBottom: 0 }}>
          The practical rule of thumb: use Lorem Ipsum when you need reviewers to clearly recognise placeholder content and treat it as such (internal design reviews, print proofs, slide decks where you will definitely replace the text before publishing). Use random English when you need content to feel realistic — usability testing, database seeding, performance benchmarks, or any context where the goal is to simulate real-world usage rather than communicate "this is temporary".
        </p>
      </section>

      {/* ── Section 3: Use cases in software development ──────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Use cases for random text in software development</h2>
        <p style={pStyle}>
          Developers reach for random text generators in more situations than most people realise. Here are the six most common use cases across frontend, backend, and QA engineering.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          {[
            {
              title: 'UI mockups and prototypes',
              detail: 'Filling wireframes and Figma components with random English text gives stakeholders a realistic sense of how content will flow through a layout — card titles, table cells, body copy, sidebar labels. It prevents the common problem of designing around a perfect short placeholder that breaks completely when real content arrives.',
            },
            {
              title: 'Database seeding',
              detail: 'Seeding a development or staging database with realistic-looking string data is essential for catching layout bugs, pagination edge cases, and indexing performance issues that do not appear with an empty or near-empty database. Factories and seeders in frameworks like Laravel, Django, or Rails often call a random text source for string columns.',
            },
            {
              title: 'Performance testing',
              detail: 'Load testing an API endpoint that processes text input requires sending realistic-length payloads. Sending thousands of identical strings is less useful than sending variable-length random text, because real-world inputs vary and some length ranges expose performance cliffs that identical inputs miss entirely.',
            },
            {
              title: 'Load testing text fields',
              detail: 'Form validation, database column constraints, and frontend display logic all need to be tested against boundary conditions: empty strings, single characters, the maximum allowed length, and inputs that exceed the maximum. Random text generators let you quickly produce strings of any target length for these boundary tests.',
            },
            {
              title: 'Accessibility testing (screen readers)',
              detail: 'Testing a screen reader or text-to-speech implementation with Lorem Ipsum produces misleading results because the reader will not know how to pronounce or stress Latin words. Random English text is far more useful for verifying that announcements, ARIA labels, and live regions are read back in a natural, intelligible way.',
            },
            {
              title: 'Snapshot testing',
              detail: 'Snapshot tests that include rendered text content can be brittle if the test data is too carefully crafted. Seeding snapshot tests with random text makes them more robust against accidental coupling between content and layout — the snapshot captures structure, not specific words, which is what you actually want to test.',
            },
          ].map(({ title, detail }) => (
            <div key={title} style={cardStyle}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>{title}</div>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--ink-3)', margin: 0 }}>{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 4: Seed a test database ───────────────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How to seed a test database with random text</h2>
        <p style={pStyle}>
          Populating a development database with believable string data is a multi-step process. Here is a repeatable workflow that takes you from generated text to importable structured data, without writing a custom script.
        </p>
        <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
          {[
            {
              n: '1',
              title: 'Decide your schema',
              detail: 'Before generating text, know which columns need string data and what constraints apply. Common string columns in typical applications include: post titles (short, ~5–10 words), body text (long, ~100–300 words), usernames (1–30 characters), and comments (medium, ~20–80 words). Write these down as a column-by-column spec.',
            },
            {
              n: '2',
              title: 'Generate the text in bulk',
              detail: <>Use this tool to generate the volume of text you need for each column type. For body text columns, generate 50–100 paragraphs. For title columns, generate sentences and trim them. Use the word count mode to produce precise-length strings for fixed-width columns. Copy each batch to your clipboard or a scratch file.</>,
            },
            {
              n: '3',
              title: 'Structure the data as CSV',
              detail: <>Arrange your generated text into a CSV file with one row per database record and column headers matching your table schema. For example: <code style={codeStyle}>id,title,body,author</code> followed by rows with your generated text in each field. CSV is the most portable format for bulk database imports — accepted by PostgreSQL, MySQL, SQLite, and every major BI tool.</>,
            },
            {
              n: '4',
              title: 'Convert to JSON for API-based seeding',
              detail: <>If your seeding workflow uses an API or an ORM seeder that expects JSON, paste your CSV directly into the <a href="/tools/csv-to-json" style={linkStyle}>CSV to JSON converter</a>. It transforms your structured CSV into a JSON array of objects in one click — ready to paste into a seed file, a Postman collection, or a fixture file for your test suite.</>,
            },
            {
              n: '5',
              title: 'Import or run the seeder',
              detail: <>Use your database\'s native import command — <code style={codeStyle}>COPY</code> in PostgreSQL, <code style={codeStyle}>LOAD DATA INFILE</code> in MySQL, or <code style={codeStyle}>.import</code> in SQLite — to load the CSV directly. For JSON, paste it into your framework\'s seeder file and run <code style={codeStyle}>db:seed</code> or equivalent. Verify the row count after import to confirm all records loaded successfully.</>,
            },
            {
              n: '6',
              title: 'Refresh between test runs',
              detail: 'For repeatable tests, do not use the same seed data every run — regenerate it or use a seeder that calls the random text generator programmatically. Varied inputs across test runs catch bugs that identical inputs would never surface, particularly in sorting, filtering, and full-text search features.',
            },
          ].map(({ n, title, detail }) => (
            <li key={n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{n}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{title}</div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-3)', margin: 0 }}>{detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <div style={{ ...cardStyle, background: 'var(--green-lt)', border: '1px solid var(--green-mid)' }}>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-2)', margin: 0 }}>
            <strong style={{ color: 'var(--ink)' }}>Tip:</strong> if your application has a public API, write a small shell script that calls the API endpoint with your generated JSON payload using <code style={codeStyle}>curl</code> or <code style={codeStyle}>httpie</code>. This seeds the database through the same code path that real users will use — which means you also test validation, transformation, and event hooks as part of the seeding process, not just raw SQL inserts.
          </p>
        </div>
      </section>

      {/* ── Section 5: Random text for UI/UX design ───────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Random text for UI/UX design</h2>
        <p style={pStyle}>
          One of the most persistent failure modes in UI design is optimising a layout for the placeholder text used during design and then discovering that real content breaks everything. A card component designed with a two-word username ("John D") collapses when a real user registers as "Bartholomew-Christoforos Papadimitriou". A sidebar designed with a three-sentence bio truncates badly when a power user writes fifteen sentences. These are not hypothetical edge cases — they are the most common class of UI bug reported by QA engineers on live products.
        </p>
        <p style={pStyle}>
          The solution is variable-length testing: deliberately exercising your UI with text at the shortest possible value, a typical medium value, and the maximum allowed value. Random text generators make this easy because you can produce strings of exactly the length you need. Want to test a username field that accepts 3 to 40 characters? Generate a 3-character string, a 20-character string, and a 40-character string, and paste each into your component. Do this in Storybook, in Figma with the Content Reel plugin, or in a live development environment — whichever gives you the fastest feedback loop.
        </p>
        <p style={pStyle}>
          Pay particular attention to how your layout handles text at the linguistic boundaries: very short words versus very long compound words, text in all-uppercase versus mixed case, strings with punctuation, and strings with numbers embedded in them. Random English text naturally produces some of this variation, but for systematic boundary testing you may need to manually craft specific inputs.
        </p>
        <p style={{ ...pStyle, marginBottom: 0 }}>
          If your project is in an early ideation phase where the content strategy is not yet decided and you need generic visual placeholders rather than length-specific test strings, the <a href="/tools/lorem-ipsum" style={linkStyle}>Lorem Ipsum generator</a> is a faster choice — it produces industry-standard placeholder paragraphs that every designer and developer immediately recognises as placeholder content, reducing the chance that a stakeholder will mistake draft copy for approved text.
        </p>
      </section>


      {/* ── Section 6: Limitations ────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Limitations of random text generators</h2>
        <p style={pStyle}>
          Random text generators are powerful tools for a specific set of tasks, but they are frequently misused. Understanding what they cannot do is as important as knowing what they can.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            {
              label: 'Not suitable for NLP or machine learning training',
              detail: 'Training a natural language model on randomly assembled words produces a model that learns random word co-occurrences — which is the opposite of what you want. NLP models need real human-written text to learn semantic relationships, syntax patterns, and pragmatic conventions. Random text contains none of these. If you need text data for ML training, use datasets like Common Crawl, Wikipedia dumps, or licensed corpora — not a random text generator.',
            },
            {
              label: 'No semantic coherence',
              detail: 'Random text does not tell a story, make an argument, or convey information. This is a feature when you want neutral placeholders, but it makes random text inappropriate for any scenario where the content itself needs to be evaluated — user research sessions where participants read and respond to content, copywriting tests, localisation reviews, or editorial quality assessments. For these, you need either real content or purpose-written sample content.',
            },
            {
              label: 'Not appropriate for public-facing placeholder text',
              detail: 'Publishing random text on a live website — even a staging environment accessible to the public — creates reputational and SEO risk. Search engines may index the page and associate your domain with nonsensical content. Users who stumble onto a staging site see an unprofessional experience. Always use environment controls (password protection, robots.txt disallow, or access IP restrictions) to prevent public indexing of pages containing placeholder text of any kind.',
            },
            {
              label: 'Does not reflect your actual content distribution',
              detail: 'Real user-generated content has a distribution: most usernames are short, most comments are between 50 and 200 characters, most post titles are between 5 and 12 words. Random text generators by default produce uniformly random lengths, which may over-represent extreme values compared to what real users will write. For the most representative testing, sample from real data distributions when possible, and use random text only where real data is unavailable.',
            },
            {
              label: 'Not a substitute for real copy in usability testing',
              detail: 'If your usability test involves participants reading, evaluating, or acting on textual content — a checkout flow, an onboarding sequence, a help article — placeholder text of any kind will distort the results. Participants will read real copy more carefully, respond to it emotionally, and interact with it more naturally than they will with obvious placeholder text. For any usability test that involves reading, use final or near-final copy.',
            },
          ].map(({ label, detail }) => (
            <div key={label} style={{ ...cardStyle, borderLeft: '3px solid var(--amber, #f59e0b)' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{label}</div>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--ink-3)', margin: 0 }}>{detail}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
