export default function TextToSlugContent() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
      <div>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            What is a URL slug?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            A URL slug is the human-readable portion of a web address that identifies a specific page. In the URL <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 6px', borderRadius: 4 }}>https://example.com/blog/how-to-bake-bread</code>, the slug is <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 6px', borderRadius: 4 }}>how-to-bake-bread</code>. Slugs replace spaces with hyphens, strip special characters, and enforce lowercase — producing clean, linkable, and search-engine-friendly URLs.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            Every major content management system — WordPress, Ghost, Webflow, Shopify, and others — generates a slug from your page title automatically. However, auto-generated slugs often include stop words, redundant characters, or unoptimized phrasing. This converter lets you craft the exact slug you want and preview it instantly before publishing.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            Developers working with routing frameworks (Next.js, Nuxt, Laravel, Django) also use slug generators to normalize file names, route paths, and database keys that must be URL-safe. Consistent slug formatting across a project reduces routing bugs and improves codebase maintainability.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            How to use the slug converter
          </h2>
          <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { n: '1', title: 'Choose your separator', desc: 'Select hyphen (-) or underscore (_). Hyphens are recommended for public URLs — Google treats them as word separators. Use underscores only if your codebase or framework convention requires them.' },
              { n: '2', title: 'Paste or type your text', desc: 'Enter your page title, product name, or any text. The converter handles mixed case, accented characters, numbers, and special symbols automatically.' },
              { n: '3', title: 'Copy the result', desc: 'Your slug appears instantly in the green output box. Click Copy to grab it, then paste directly into your CMS, router config, or file name.' },
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
            Slug best practices and SEO impact
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
            URL structure is a confirmed on-page SEO factor. While slugs are not a primary ranking signal, a well-crafted slug improves click-through rates from search results, makes links more shareable, and helps Google understand page content before even crawling it.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                  {['Practice', 'Recommended', 'Avoid', 'Reason'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Word separator', 'hyphens (my-page)', 'underscores (my_page)', 'Google reads hyphens as spaces; underscores join words'],
                  ['Case',           'all lowercase',     'Mixed or UPPER case',   'Case differences create duplicate content on most servers'],
                  ['Length',         '3–6 keywords',      'Full sentence slugs',   'Long slugs get truncated in search results'],
                  ['Stop words',     'Remove "a", "the"', 'Keep all words',        'Shorter slugs read better and pass more link equity'],
                  ['Special chars',  'alphanumeric only', '@, #, %, &, !',         'Non-ASCII chars require percent-encoding'],
                  ['Accents',        'transliterate (e)', 'Encode (%C3%A9)',        'ASCII slugs are cleaner and more portable'],
                ].map(([practice, rec, avoid, reason], i) => (
                  <tr key={practice} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{practice}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--green)', fontWeight: 500 }}>{rec}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-3)' }}>{avoid}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-3)', fontSize: 13 }}>{reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            How slug generation works under the hood
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            The slugification algorithm runs through four transformation steps in sequence:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            {[
              { step: '1', label: 'Unicode normalization (NFD)', desc: 'Decomposes characters like é into base character e + combining accent ́. This separates the letter from its diacritic so the accent can be stripped cleanly.' },
              { step: '2', label: 'Strip diacritics', desc: 'Removes all Unicode combining marks (U+0300–U+036F) — the accents, cedillas, umlauts, and tildes — leaving only the base Latin characters.' },
              { step: '3', label: 'Lowercase and clean', desc: 'Converts to lowercase, then replaces every character that is not a-z, 0-9, or a space with a space (preparing for separator replacement).' },
              { step: '4', label: 'Replace separators', desc: 'Collapses all runs of spaces into the chosen separator (hyphen or underscore), then trims leading and trailing separators for a clean result.' },
            ].map(({ step, label, desc }) => (
              <div key={step} style={{ display: 'flex', gap: 14, padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-m)' }}>
                <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--green)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{step}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            Example transformation: <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 6px', borderRadius: 4 }}>"Héllo Wörld! 2024"</code> → <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--green-lt)', color: 'var(--green)', padding: '1px 6px', borderRadius: 4 }}>"hello-world-2024"</code>
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Slugs in different frameworks and platforms
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
            Different frameworks and platforms use slugs in slightly different ways. Understanding the conventions of your platform helps you generate the right format:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
            {[
              { platform: 'WordPress / Ghost', fmt: 'hyphen-lowercase', note: 'Auto-generated from post title; editable before publish' },
              { platform: 'Next.js / Nuxt',    fmt: '[slug].tsx / [slug].vue', note: 'File names and dynamic route params; conventionally hyphenated' },
              { platform: 'Django / Flask',    fmt: 'SlugField',        note: 'Built-in slugify() function; stored in database as hyphenated string' },
              { platform: 'Shopify',           fmt: 'product handle',   note: 'Product URL identifier; lowercase hyphen convention' },
              { platform: 'Webflow',           fmt: 'Page slug',        note: 'Editable in page settings; defaults to page name slugified' },
              { platform: 'GitHub',            fmt: 'Repo / branch names', note: 'Hyphens preferred; underscores also common for repos' },
            ].map(({ platform, fmt, note }) => (
              <div key={platform} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{platform}</div>
                <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', display: 'block', marginBottom: 4 }}>{fmt}</code>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>{note}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Common slug mistakes to avoid
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            <div style={{ padding: '20px', background: '#fef2f2', border: '1px solid rgba(220,38,38,.2)', borderRadius: 'var(--r-l)' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#dc2626', marginBottom: 12 }}>Mistakes that hurt SEO</div>
              <ul style={{ paddingLeft: 18, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.85, margin: 0 }}>
                <li>Using query parameters instead of clean slugs (?id=123)</li>
                <li>Keeping stop words that dilute keyword signals</li>
                <li>Changing slugs after indexing without 301 redirects</li>
                <li>Duplicate slugs causing content conflicts</li>
              </ul>
            </div>
            <div style={{ padding: '20px', background: 'var(--green-lt)', border: '1px solid var(--green-mid, rgba(5,150,105,.2))', borderRadius: 'var(--r-l)' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green)', marginBottom: 12 }}>Good slug habits</div>
              <ul style={{ paddingLeft: 18, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.85, margin: 0 }}>
                <li>Include the primary keyword near the start of the slug</li>
                <li>Keep slugs stable — avoid unnecessary renaming</li>
                <li>Use hyphens consistently across your entire site</li>
                <li>Preview slugs before publishing to catch issues early</li>
              </ul>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Related text tools
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
            Once you have your slug, these tools help you with the next steps in writing and publishing workflow:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
            {[
              { href: '/tools/case-converter',   label: 'Case Converter',       desc: 'Convert text to camelCase, PascalCase, snake_case, and more naming formats' },
              { href: '/tools/word-counter',     label: 'Word Counter',         desc: 'Count words, characters and reading time — useful for meta description writing' },
              { href: '/tools/find-and-replace', label: 'Find and Replace',     desc: 'Bulk-replace text patterns with regex support — great for cleaning content before slugifying' },
              { href: '/tools/markdown-editor',  label: 'Markdown Editor',      desc: 'Write and preview Markdown — perfect for blog posts that need clean slugs' },
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
