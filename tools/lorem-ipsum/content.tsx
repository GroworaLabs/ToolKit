export default function LoremIpsumContent() {
  return (
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
        <div>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              What is Lorem Ipsum?
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              Lorem Ipsum is scrambled Latin text derived from <em>De Finibus Bonorum et Malorum</em>, written by the Roman philosopher Cicero in 45 BC. It has been the industry standard placeholder text in publishing and graphic design since the 1960s, when Letraset popularized it on dry-transfer sheets used for typesetting and layout design.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
              The key advantage of Lorem Ipsum over real text is that it has a natural-looking distribution of letters without meaningful content — which prevents reviewers from focusing on the copy instead of the layout. It looks like real language at a glance, making it ideal for mocking up typographic and spacing decisions.
            </p>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              How to generate Lorem Ipsum text
            </h2>
            <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { n: '1', title: 'Choose a unit', desc: 'Select Paragraphs for full blocks of text (ideal for body copy mockups), Sentences for shorter content, or Words for labels, headings, and button text.' },
                { n: '2', title: 'Set the amount', desc: 'Use the number input or quick-select buttons (1, 3, 5, 10) to choose how much text to generate. For a single card or section, 1–2 paragraphs is usually enough.' },
                { n: '3', title: 'Toggle "Start with Lorem ipsum…"', desc: 'Enable this to begin with the classic opening sentence. Disable it for fully randomized text that doesn\'t start with the recognizable Lorem ipsum pattern.' },
                { n: '4', title: 'Generate and copy', desc: 'Click Generate then Copy to grab the text. Paste directly into Figma, your code editor, CMS, or any design tool.' },
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
              How much Lorem Ipsum do you need?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
              {[
                { context: 'Single card / widget',   amount: '1 paragraph',   words: '~60 words' },
                { context: 'Landing page section',   amount: '2–3 paragraphs', words: '~150 words' },
                { context: 'Blog post mockup',        amount: '5–8 paragraphs', words: '~500 words' },
                { context: 'Heading / button text',  amount: '3–7 words',     words: '' },
                { context: 'Card subtitle',           amount: '1–2 sentences', words: '~15 words' },
                { context: 'Full page layout',        amount: '10+ paragraphs',words: '~700 words' },
              ].map(({ context, amount, words }) => (
                  <div key={context} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{context}</div>
                    <div style={{ fontSize: 13, color: 'var(--green)', fontWeight: 600 }}>{amount}</div>
                    {words && <div style={{ fontSize: 12, color: 'var(--ink-4)', marginTop: 2 }}>{words}</div>}
                  </div>
              ))}
            </div>
          </section>

          {/* ── History extended ──────────────────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              The origin and history of Lorem Ipsum
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              The standard Lorem Ipsum passage begins with <em>"Lorem ipsum dolor sit amet, consectetur adipiscing elit..."</em> — a scrambled excerpt from sections 1.10.32 and 1.10.33 of Cicero's philosophical text <em>De Finibus Bonorum et Malorum</em> (On the Ends of Good and Evil), written in 45 BC. The original Latin reads <em>"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet..."</em> — meaning "Nor is there anyone who loves pain itself because it is pain."
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              The Lorem Ipsum passage as we know it today gained widespread use in the 1960s through Letraset, a British company that produced dry-transfer sheets for graphic designers. The sheets featured the Lorem Ipsum text as filler to demonstrate typefaces. The adoption by desktop publishing software — particularly Aldus PageMaker in the 1980s — cemented its status as the universal placeholder text of the design industry.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
              Today, Lorem Ipsum is built into virtually every design tool, CMS, and prototyping application. Despite being 2,000 years old in origin, it serves exactly the same purpose as when Letraset first used it: it looks like real text without containing any meaningful message, allowing viewers to evaluate layout and typography without being distracted by actual content.
            </p>
          </section>

          {/* ── When NOT to use Lorem Ipsum ──────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              When NOT to use Lorem Ipsum
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              Despite its widespread use, Lorem Ipsum is the wrong choice in certain situations. Real text reveals layout problems that placeholder text hides:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { situation: 'User testing and usability research', why: 'Test participants can\'t evaluate whether content helps them complete a task if the text is gibberish. Real or realistic content is essential for any test that involves comprehension or navigation.' },
                { situation: 'Content-heavy components (cards, tables, lists)', why: 'Lorem Ipsum obscures how varying content lengths affect layout. A card with a 3-word title looks different from one with a 12-word title. Test with both extremes.' },
                { situation: 'Presentations to stakeholders and clients', why: 'Non-technical stakeholders often misread Lorem Ipsum as a sign the product is unfinished. Use realistic representative content for client presentations, even if it\'s placeholder.' },
                { situation: 'Navigation and menu items', why: 'Menu labels should reflect actual terminology. "Lorem ipsum" in a navigation item makes it impossible to evaluate whether the information architecture is clear.' },
                { situation: 'Error messages and system text', why: 'Error messages are critical UI elements. Design and test them with real text — the emotional tone and length of "Something went wrong. Please try again." matters for the design.' },
              ].map(({ situation, why }) => (
                <div key={situation} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{situation}</div>
                  <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>{why}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Lorem Ipsum alternatives ──────────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Lorem Ipsum alternatives for specific contexts
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
              Sometimes you need placeholder text that fits a specific context better than Latin. These alternatives are more appropriate for certain design scenarios:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
              {[
                { type: 'Cupcake Ipsum', context: 'Food, lifestyle, e-commerce', example: '"Cupcake ipsum dolor sit amet chocolate bar lollipop."' },
                { type: 'Bacon Ipsum', context: 'Food, restaurant, casual', example: '"Bacon ipsum dolor amet strip steak pancetta brisket."' },
                { type: 'Random Text Generator', context: 'Any context needing English text', desc: 'Generates readable English-like text using common word patterns. Use the Random Text Generator on this site.' },
                { type: 'Corporate Ipsum', context: 'Business, SaaS, enterprise', example: '"Synergize core competencies to leverage actionable insights."' },
                { type: 'Hipster Ipsum', context: 'Creative, indie, lifestyle brands', example: '"Artisan chia tattooed, vegan poutine craft beer."' },
                { type: 'Actual content drafts', context: 'User testing, stakeholder reviews', desc: 'Write rough content for the most important 2–3 screens. Even imperfect real text beats placeholder text for evaluation.' },
              ].map(({ type, context, example, desc }) => (
                <div key={type} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{type}</div>
                  <div style={{ fontSize: 11, color: 'var(--green)', fontWeight: 600, marginBottom: 6 }}>{context}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-4)', lineHeight: 1.5, fontStyle: example ? 'italic' : 'normal' }}>{example || desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Lorem Ipsum in design systems ─────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Lorem Ipsum in design systems and component libraries
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              When building reusable component libraries and design systems, placeholder text serves a specific purpose: it lets you test component robustness across different content lengths before real content exists. Here is how to use it strategically:
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              <strong style={{ color: 'var(--ink)' }}>Test edge cases, not just the happy path.</strong> Components break on boundary content — very short text (a single word), very long text (400+ characters), text with special characters, text with line breaks. Use generated placeholder text at various lengths to stress-test truncation, overflow handling, and wrapping in cards, buttons, tooltips, and badges. A component that only looks good with medium-length Lorem Ipsum will fail in production.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              <strong style={{ color: 'var(--ink)' }}>Use real content structure in Storybook stories.</strong> In component documentation (Storybook, Ladle, Histoire), the "Default" story should show Lorem Ipsum that realistically represents the intended use case. A "LongContent" story should show text long enough to trigger overflow. A "ShortContent" story should show minimal text. This documents implicit content assumptions and prevents regressions when the component is refactored.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              <strong style={{ color: 'var(--ink)' }}>Never ship Lorem Ipsum in production builds.</strong> Add a CI check or linter rule that fails if Lorem Ipsum text is detected in rendered output. The string "Lorem ipsum dolor sit amet" appearing in a production deployment is a signal that placeholder content was not replaced — and a potential embarrassment in client demos or live environments.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
              <strong style={{ color: 'var(--ink)' }}>Internationalization (i18n) testing requires language-specific placeholders.</strong> If your application supports multiple languages, test your UI with text in those languages — not Latin. Right-to-left languages (Arabic, Hebrew) require mirrored layout. CJK languages (Chinese, Japanese, Korean) have different word-wrap rules and no spaces between words. Placeholder Latin text will not expose these layout bugs.
            </p>
          </section>

          {/* ── Placeholder content strategy ─────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Choosing the right placeholder content strategy
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
              Not every situation calls for Lorem Ipsum. Different project phases and audience types call for different placeholder strategies:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { strategy: 'Lorem Ipsum (Latin placeholder)', when: 'Early wireframes, internal prototypes, component library development', why: 'Instantly recognizable as placeholder — prevents stakeholders from commenting on copy instead of design' },
                { strategy: 'Realistic dummy content', when: 'Client presentations, usability testing, stakeholder reviews', why: 'Helps reviewers evaluate whether the design solves the actual use case — copy affects readability and hierarchy judgements' },
                { strategy: 'Production-representative content', when: 'Final design approval, content audits, editorial design', why: 'The only way to validate line lengths, heading hierarchy, image aspect ratios, and reading flow for the actual content' },
                { strategy: 'Random English text', when: 'SEO testing, readability tools, NLP/text processing testing', why: 'Latin text bypasses word count, readability scores, and language detection — English placeholder avoids false tool readings' },
                { strategy: 'Seed data from production', when: 'Load testing, performance profiling, end-to-end tests', why: 'Realistic data volume and distribution — synthetic data can mask performance issues that only appear at real scale' },
                { strategy: 'Redacted/anonymized production data', when: 'Staging environments, developer demos, bug reproduction', why: 'Preserves data structure and edge cases while protecting user privacy — best for reproducing production-specific layout bugs' },
              ].map(({ strategy, when, why }, i) => (
                <div key={strategy} style={{ padding: '14px 16px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{strategy}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 4 }}><strong>When:</strong> {when}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-2)' }}><strong>Why:</strong> {why}</div>
                </div>
              ))}
            </div>
          </section>


        </div>
      </div>
  );
}