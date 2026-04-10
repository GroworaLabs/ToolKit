export default function ReadingTimeContent() {
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

      {/* ── Section 1: What is reading time ───────────────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What is reading time and why does it matter?</h2>
        <p style={pStyle}>
          Reading time is an estimate of how long it will take a person to read a piece of text from start to finish. It is calculated by dividing the total word count by an assumed reading speed, measured in words per minute (WPM). The result is typically displayed in minutes — sometimes rounded to the nearest half-minute, sometimes shown as a range — and appears at the top of articles, blog posts, and documentation pages worldwide.
        </p>
        <p style={pStyle}>
          The metric matters for a surprisingly psychological reason: people decide whether to start reading based on how long they think it will take. A reader scanning a news feed makes a split-second judgement — if an article says "14 min read" and they have two minutes to spare, they skip it. If it says "3 min read", they click. Publishing platforms understood this early, which is why Medium started displaying reading times in 2013. The feature was quickly copied by Substack, dev.to, Ghost, and virtually every modern CMS.
        </p>
        <p style={pStyle}>
          For writers and content strategists, reading time is a proxy for commitment. A 1-minute read is a snack — low friction, high shareability. A 10-minute read is a meal — it demands attention and signals depth. Neither is inherently better; the right length depends entirely on what you are asking the reader to invest in and what you are giving them in return.
        </p>
        <p style={pStyle}>
          Reading time also affects engagement metrics. Pages where the estimated reading time matches the actual time users spend on the page tend to have lower bounce rates. When readers arrive expecting a 3-minute article and get a 12-minute wall of text, they leave immediately — and that bounce signals a mismatch to search engines. Accurate reading time labels set honest expectations and attract readers who are genuinely willing to spend that time, which keeps your engagement numbers healthy.
        </p>
        <p style={{ ...pStyle, marginBottom: 0 }}>
          Beyond the web, reading time estimates are useful in editorial planning, email marketing (subject lines like "3-minute read inside" improve open rates), course content design, and accessibility planning for users with cognitive load considerations.
        </p>
      </section>

      {/* ── Section 2: How reading time is calculated ─────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How reading time is calculated</h2>
        <p style={pStyle}>
          The formula is straightforward: <code style={codeStyle}>reading time = word count ÷ words per minute</code>. If a blog post contains 1,500 words and the assumed WPM is 238, the result is approximately 6.3 minutes. Most tools round this to "6 min read" or display it as "6–7 min".
        </p>
        <p style={pStyle}>
          What counts as a word? In practice, most calculators use whitespace tokenisation — any sequence of characters separated by a space or newline counts as one word. This means <code style={codeStyle}>hello</code>, <code style={codeStyle}>hello-world</code>, <code style={codeStyle}>https://example.com/very/long/url</code>, and <code style={codeStyle}>$49.99</code> each count as one word. HTML tags stripped from the content do not count. Numbers count as words. Code snippets embedded in technical articles are typically counted but are read more slowly than prose — a nuance that basic calculators do not account for.
        </p>
        <p style={pStyle}>
          The 238 WPM benchmark comes from a landmark 2019 meta-analysis by Marc Brysbaert, published in the Journal of Memory and Language, which aggregated data from 190 individual studies covering 17,887 participants reading in 17 languages. For English specifically, the median silent reading speed was <strong style={{ color: 'var(--ink)' }}>238 words per minute</strong>. This replaced the older commonly cited figure of 200–250 WPM, which was based on much smaller and less rigorous samples.
        </p>
        <p style={pStyle}>
          WPM is not a fixed property of a person — it varies with content type, fatigue, purpose, and environment. The same reader might skim a news headline at 600 WPM and plod through a legal contract at 80 WPM. The 238 WPM figure represents silent, comprehension-oriented reading of narrative or journalistic prose — the kind of reading most blog and article audiences do. It is a reasonable default but should be treated as an approximation.
        </p>
        <p style={{ ...pStyle, marginBottom: 0 }}>
          Some calculators add extra time for images — Medium, for example, historically added 12 seconds for the first image and 3 seconds for each subsequent image in the post. Code blocks in technical articles are often treated at a slower rate (around 200 WPM or less) because parsing syntax takes longer than reading sentences. This tool uses the standard 238 WPM prose baseline, which is appropriate for most content types.
        </p>
      </section>

      {/* ── Section 3: Average reading speeds by audience ─────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Average reading speeds by audience</h2>
        <p style={pStyle}>
          Not all readers move at the same pace. Age, reading proficiency, and the medium of delivery all influence how quickly content is consumed. Understanding this helps you calibrate reading time estimates for your specific audience — a technical reference aimed at expert developers can safely assume a faster reader than a general-interest health blog.
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 14 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                {['Audience', 'Speed (WPM)', 'Use case'].map((h) => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Child (8–10 years old)', '~150 WPM', 'Children\'s books, educational content, early readers'],
                ['Average adult', '238 WPM', 'General blogs, news articles, email newsletters'],
                ['Proficient reader', '~300 WPM', 'Long-form journalism, books, academic reading'],
                ['Speed reader (trained)', '400+ WPM', 'Research scanning, competitive readers'],
                ['Presentation / speech delivery', '~140 WPM', 'Slide decks, conference talks, paced narration'],
                ['Podcast / audio narration', '~150 WPM', 'Conversational podcasts, audiobooks, voiceovers'],
              ].map(([audience, speed, useCase], i) => (
                <tr key={audience} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 500, color: 'var(--ink)' }}>{audience}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--green)', fontWeight: 700 }}>{speed}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-3)' }}>{useCase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ ...pStyle, marginBottom: 0 }}>
          Note that speed readers achieving 400+ WPM in controlled tests often show significantly reduced comprehension at those speeds. For content that needs to be understood and remembered — instructions, legal copy, technical specifications — slower, deliberate reading at 150–200 WPM is more realistic and should be assumed when estimating reading time for high-stakes content.
        </p>
      </section>

      {/* ── Section 4: Reading time for content types ─────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Reading time for different content types</h2>
        <p style={pStyle}>
          The "right" reading time is not universal — it depends on format, audience intent, and platform norms. Here is how reading time breaks down across the most common content categories, assuming a reader at 238 WPM.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          {[
            {
              type: 'Blog post',
              length: '800–2,000 words',
              time: '3–8 min',
              note: 'The sweet spot for SEO and reader engagement. Posts under 1,000 words are considered short-form; over 2,000 words enter long-form or pillar page territory.',
            },
            {
              type: 'Technical documentation',
              length: '500–5,000+ words per page',
              time: '2–20+ min',
              note: 'Docs are typically scanned and referenced rather than read end-to-end. Reading time is less meaningful here — navigation and search matter more.',
            },
            {
              type: 'Academic paper',
              length: '4,000–10,000 words',
              time: '17–42 min',
              note: 'Dense vocabulary and specialised notation significantly reduce effective WPM. Practical reading time is often 50–100% longer than the formula suggests.',
            },
            {
              type: 'Fiction (novel chapter)',
              length: '2,000–5,000 words',
              time: '8–21 min',
              note: 'Fiction readers read for pleasure and often re-read passages. The 238 WPM baseline applies reasonably well to narrative prose.',
            },
            {
              type: 'Email newsletter',
              length: '200–600 words',
              time: '1–2.5 min',
              note: 'Newsletters that exceed 3 minutes have measurably lower completion rates. Keep them tight or use a "Read more" link to a full article.',
            },
            {
              type: 'Social media post',
              length: '50–280 characters (~10–50 words)',
              time: 'Under 15 seconds',
              note: 'At this length, reading time becomes irrelevant — engagement is driven by the hook in the first few words, not overall length.',
            },
          ].map(({ type, length, time, note }) => (
            <div key={type} style={cardStyle}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{type}</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--green)', fontWeight: 600, background: 'var(--green-lt)', padding: '2px 7px', borderRadius: 4 }}>{length}</span>
                <span style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)', fontWeight: 600, background: 'var(--border)', padding: '2px 7px', borderRadius: 4 }}>{time}</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--ink-3)', margin: 0 }}>{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 5: How major platforms calculate reading time ─ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>How major platforms calculate reading time</h2>
        <p style={pStyle}>
          Reading time estimates are not standardised across publishing platforms — each makes its own assumptions about reader speed, image handling, and content type. This means the same article can show different reading times depending on where it is hosted.
        </p>
        <p style={pStyle}>
          <strong style={{ color: 'var(--ink)' }}>Medium</strong> uses <code style={codeStyle}>265 WPM</code> as its prose reading speed, slightly above the research average. It adds time for images: 12 seconds for the first image, then decreasing seconds for each subsequent image, eventually reaching a floor of 3 seconds per image. Code blocks are counted at a lower effective rate. Medium displays the result rounded to the nearest whole minute and has shown reading time on every post since 2013. Their rationale was simple: they found users were more likely to start reading when they knew how long it would take.
        </p>
        <p style={pStyle}>
          <strong style={{ color: 'var(--ink)' }}>Substack</strong> uses a more conservative estimate — approximately <code style={codeStyle}>200 WPM</code> — which means Substack reading times run noticeably longer than Medium's for the same article. Substack's audience skews toward long-form newsletters, so a slightly longer reading time estimate may actually serve as a quality signal rather than a deterrent, communicating depth and seriousness of content.
        </p>
        <p style={pStyle}>
          <strong style={{ color: 'var(--ink)' }}>dev.to</strong> uses <code style={codeStyle}>250 WPM</code> for prose and applies a flat multiplier for code blocks, treating them as taking longer to parse. The platform targets a developer audience that is comfortable with technical content but still benefits from the expectation-setting that reading time provides.
        </p>
        <p style={{ ...pStyle, marginBottom: 0 }}>
          The takeaway: if you are writing for a specific platform, use that platform's own reading time display as your reference rather than a generic calculator. For general-purpose estimation — drafting content before choosing a platform, planning editorial calendars, or setting reader expectations in your own CMS — the 238 WPM standard is the most defensible baseline, as it comes from the largest and most rigorous research base available.
        </p>
      </section>


      {/* ── Section 6: Tips for writers ───────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Tips for writers: optimising for reading time</h2>
        <p style={pStyle}>
          Reading time is not just a vanity metric — it is a design constraint. Knowing your target reading time before you write helps you structure content appropriately and avoid the two most common length mistakes: writing too little to cover the topic, or padding to hit an arbitrary word count with filler.
        </p>
        <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
          {[
            {
              tip: 'Match reading time to platform norms',
              detail: 'Email newsletters perform best at 1–2 minutes (250–500 words). Twitter threads top out at around 3 minutes before engagement drops. LinkedIn long-form posts work at 3–5 minutes. Medium articles see the highest completion rates at 7 minutes. Know your platform before you set a target length.',
            },
            {
              tip: 'Use reading time as an editorial brief',
              detail: 'Before writing, decide your target. A 4-minute read at 238 WPM means roughly 950 words. That constraint forces you to prioritise — every section has to earn its place. Writers who work without a word target tend to over-explain the easy parts and under-explain the hard parts.',
            },
            {
              tip: 'Front-load your value for longer pieces',
              detail: 'Readers decide whether to continue within the first 10–15% of a piece. For a 10-minute article, that\'s your first minute — roughly your introduction and first section. Put your most compelling insight, surprising fact, or clearest statement of the problem up front, not in your conclusion.',
            },
            {
              tip: 'Break long reads into scannable sections',
              detail: 'A 12-minute read feels more approachable when it is clearly structured with descriptive headings. Readers mentally chunk it into pieces ("I can read the first two sections now and come back later"). Clear H2s and H3s also help screen readers and search engines parse content hierarchy.',
            },
            {
              tip: 'Check your word count as you draft',
              detail: <>Use a dedicated <a href="/tools/word-counter" style={linkStyle}>Word Counter</a> to track your progress in real time. Seeing your live word count prevents the common mistake of writing 1,200 words when you needed 2,000 — and discovering the gap only after you think you are done. The word counter also shows reading time, so you can validate your estimate as you write.</>,
            },
          ].map(({ tip, detail }) => (
            <li key={tip} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', flexShrink: 0, marginTop: 8 }} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{tip}</div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-3)', margin: 0 }}>{detail}</p>
              </div>
            </li>
          ))}
        </ul>
        <div style={{ ...cardStyle, background: 'var(--green-lt)', border: '1px solid var(--green-mid)' }}>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-2)', margin: 0 }}>
            <strong style={{ color: 'var(--ink)' }}>Quick reference:</strong> at 238 WPM — 500 words ≈ 2 min, 1,000 words ≈ 4 min, 1,500 words ≈ 6 min, 2,000 words ≈ 8 min, 2,500 words ≈ 10 min, 3,000 words ≈ 13 min. Use this as a mental shortcut when planning content before you open a blank document.
          </p>
        </div>
      </section>

    </div>
  );
}
