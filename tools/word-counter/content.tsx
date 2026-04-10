export default function WordCounterContent() {
  return (
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
        <div>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              What is a word counter?
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              A word counter is a tool that instantly analyzes text and returns detailed statistics — word count, character count, sentence count, paragraph count, estimated reading time, and keyword density. It processes everything locally in your browser with no data sent to any server.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
              Writers, students, SEO specialists, and developers use word counters daily to check content length requirements, measure readability, and ensure their copy meets platform-specific limits. Whether you're writing a college essay, a tweet, a blog post, or API documentation — knowing your exact word and character count matters.
            </p>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              How to use the word counter
            </h2>
            <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { n: '1', title: 'Paste or type your text', desc: 'Click the text area and start typing, or paste content from anywhere. The counter updates in real time — no button to click.' },
                { n: '2', title: 'Read your statistics', desc: 'Words, characters (with and without spaces), sentences, paragraphs, and reading time all update instantly as you type.' },
                { n: '3', title: 'Check keyword density', desc: 'Scroll down to see which words appear most frequently and what percentage of your total word count they represent. Useful for SEO content optimization.' },
                { n: '4', title: 'Clear and start over', desc: 'Click the X button to clear the text area and reset all counters when you\'re ready to analyze a new piece of content.' },
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
              Word count requirements by platform
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
              Different platforms and content types have specific length requirements. Here are the most common ones:
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                  {['Platform / Content type', 'Limit / Recommendation', 'Notes'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                  ))}
                </tr>
                </thead>
                <tbody>
                {[
                  ['Twitter / X post',       '280 characters',       'Use the character count view'],
                  ['Instagram caption',       '2,200 characters',     'First 125 chars visible before "more"'],
                  ['LinkedIn post',           '3,000 characters',     'Long-form performs well'],
                  ['Google meta description', '150–160 characters',   'Truncated beyond 160'],
                  ['Blog post (SEO)',         '1,500–2,500 words',    'Longer posts tend to rank higher'],
                  ['College essay',           '500–650 words',        'Common App standard'],
                  ['Resume',                  '400–800 words',        'One page = ~500 words'],
                  ['Academic abstract',       '150–250 words',        'Most journals require under 250'],
                ].map(([platform, limit, note], i) => (
                    <tr key={platform} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 500, color: 'var(--ink)' }}>{platform}</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--green)', fontWeight: 600 }}>{limit}</td>
                      <td style={{ padding: '10px 14px', color: 'var(--ink-3)' }}>{note}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Reading time — how it's calculated
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              Reading time is calculated at <strong style={{ color: 'var(--ink)' }}>238 words per minute</strong> — the average silent reading speed for adults according to a <a href="https://www.sciencedirect.com/science/article/abs/pii/S0749596X19300786" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'underline' }}>2019 meta-analysis</a> of 190 studies. Speaking time uses 130 words per minute — appropriate for presentations and audiobooks.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              These are averages. Technical content with complex terminology is typically read 20–30% slower. Use the reading time estimate as a guideline, not an exact figure.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
              For deeper readability analysis, the <strong style={{ color: 'var(--ink)' }}>Flesch-Kincaid Reading Ease</strong> score measures how easy a text is to read on a scale of 0–100. Scores above 60 are considered easy to read for a general audience. Most web content targets a score of 60–70, which corresponds to approximately 8th-grade reading level. Short sentences and common words push the score higher.
            </p>
          </section>

          {/* ── Word count for SEO ──────────────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Word count and SEO — what actually matters
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              Word count is not a direct Google ranking factor — Google has stated this explicitly. However, longer content tends to rank better for competitive queries because it naturally covers more related terms, answers more questions, and earns more backlinks. The correlation is real even if the causation isn't direct.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              For most informational and commercial queries, <strong style={{ color: 'var(--ink)' }}>1,500–2,500 words</strong> hits the sweet spot — long enough to cover the topic thoroughly, short enough to stay focused. Thin content under 300 words rarely ranks for competitive terms because it lacks the semantic depth Google looks for.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
              The most useful metric isn't total word count but <strong style={{ color: 'var(--ink)' }}>keyword density</strong> — how often your target term and related phrases appear relative to total words. A density of 1–2% for your primary keyword is a healthy range. Use the keyword density panel in this tool to check your distribution.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
              {[
                { range: 'Under 300 words',    label: 'Thin content',    color: 'var(--red)',   bg: '#fef2f2', note: 'Rarely ranks for competitive terms' },
                { range: '300–600 words',      label: 'Minimal',         color: 'var(--amber)', bg: '#fffbeb', note: 'OK for simple queries and landing pages' },
                { range: '600–1,500 words',    label: 'Standard',        color: 'var(--blue)',  bg: 'var(--blue-lt)', note: 'Good for most topics and tools' },
                { range: '1,500–2,500 words',  label: 'Comprehensive',   color: 'var(--green)', bg: 'var(--green-lt)', note: 'Best for competitive SEO terms' },
                { range: '2,500+ words',       label: 'In-depth guide',  color: 'var(--green)', bg: 'var(--green-lt)', note: 'Ideal for pillar pages and guides' },
              ].map(({ range, label, color, bg, note }) => (
                  <div key={range} style={{ padding: '14px 16px', background: bg, border: `1px solid ${color}33`, borderRadius: 'var(--r-l)' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color, marginBottom: 4 }}>{range}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>{note}</div>
                  </div>
              ))}
            </div>
          </section>

          {/* ── Character count guide ───────────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Character count guide for social media and ads
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
              Character limits vary significantly across platforms. Going over the limit means your content gets cut off or rejected entirely. Use the character count view in this tool to stay within bounds.
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                  {['Platform', 'Character limit', 'Visible without click', 'Tips'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                  ))}
                </tr>
                </thead>
                <tbody>
                {[
                  ['Twitter / X',         '280',         'All 280 chars',    'Images add no characters; links count as 23'],
                  ['Instagram caption',    '2,200',       'First ~125 chars', 'Put your CTA and hashtags after the fold'],
                  ['Facebook post',        '63,206',      'First ~477 chars', 'Shorter posts (40–80 chars) get higher engagement'],
                  ['LinkedIn post',        '3,000',       'First ~210 chars', 'Long-form (1,000–2,000 chars) performs well'],
                  ['YouTube title',        '100',         'First ~70 chars',  'Put primary keyword in first 60 characters'],
                  ['YouTube description',  '5,000',       'First 157 chars',  'Add timestamps and links in the first 200 chars'],
                  ['Google Ads headline',  '30 per line', '3 headlines shown','Each of the 3 headlines: max 30 characters'],
                  ['Email subject line',   '~60',         'Varies by client',  'Under 50 chars for best mobile display'],
                  ['SMS / text message',   '160',         'Depends on phone',  'Multi-part if over 160 (counts as 2 messages)'],
                  ['TikTok caption',       '2,200',       'First ~100 chars', 'Hashtags included in count'],
                ].map(([platform, limit, visible, tips], i) => (
                    <tr key={platform} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{platform}</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--green)', fontWeight: 700 }}>{limit}</td>
                      <td style={{ padding: '10px 14px', color: 'var(--ink-2)', fontSize: 13 }}>{visible}</td>
                      <td style={{ padding: '10px 14px', color: 'var(--ink-3)', fontSize: 13 }}>{tips}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </section>


          {/* ── Writing tips ────────────────────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              How to improve your word count and readability
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
              Whether you need to add words to hit a minimum or cut words to fit a limit — these techniques help you do it without hurting quality.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
              <div style={{ padding: '20px', background: 'var(--green-lt)', border: '1px solid var(--green-mid)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                  Adding words (too short)</div>
                <ul style={{ paddingLeft: 18, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.85, margin: 0 }}>
                  <li>Add concrete examples for each main point</li>
                  <li>Include a comparison table or use-case list</li>
                  <li>Add a FAQ section answering common questions</li>
                  <li>Expand definitions with "this means that..."</li>
                  <li>Add context about why the topic matters</li>
                </ul>
              </div>
              <div style={{ padding: '20px', background: 'var(--blue-lt)', border: '1px solid rgba(37,99,235,.2)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
                  Cutting words (too long)</div>
                <ul style={{ paddingLeft: 18, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.85, margin: 0 }}>
                  <li>Remove filler phrases ("it is important to note that")</li>
                  <li>Replace passive voice with active voice</li>
                  <li>Cut redundant adjectives and adverbs</li>
                  <li>Merge short sentences where possible</li>
                  <li>Move supporting details to a footnote or aside</li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </div>
  );
}