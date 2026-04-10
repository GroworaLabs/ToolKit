export default function ColorConverterContent() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
      <div>

        {/* ── What is ─────────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            What is a color converter?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            A color converter translates a color value from one format to another — for example, from a HEX code used in CSS to an RGB triplet used in JavaScript, or to a CMYK value needed by a print designer. All these formats describe the same color, just using different mathematical models and different number ranges.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            This tool converts between <strong style={{ color: 'var(--ink)' }}>HEX</strong>, <strong style={{ color: 'var(--ink)' }}>RGB</strong>, <strong style={{ color: 'var(--ink)' }}>HSL</strong>, <strong style={{ color: 'var(--ink)' }}>HSV</strong>, and <strong style={{ color: 'var(--ink)' }}>CMYK</strong> — the five formats you'll encounter in web development, UI design, and print. It also outputs CSS-ready strings (<code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>rgb()</code>, <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>hsl()</code>) and a CSS custom property declaration ready to paste into your stylesheet.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            Everything runs in your browser — no API calls, no data transmitted, instant results as you type.
          </p>
        </section>

        {/* ── Format comparison table ──────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Color formats explained — HEX, RGB, HSL, HSV, CMYK
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
            Every format describes a color differently. Understanding when to use each one prevents frustration when working across design, development, and print:
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                  {['Format', 'Range / Syntax', 'Used in', 'Best for'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['HEX',  '#rrggbb or #rgb',              'HTML, CSS, design tools',         'Sharing colors, CSS stylesheets'],
                  ['RGB',  'r: 0–255, g: 0–255, b: 0–255', 'CSS, JavaScript, Canvas API',     'Programmatic color manipulation'],
                  ['HSL',  'h: 0–360°, s: 0–100%, l: 0–100%', 'CSS, design systems',         'Theming, lightness/darkness variants'],
                  ['HSV',  'h: 0–360°, s: 0–100%, v: 0–100%', 'Photoshop, Figma, design apps', 'Color pickers, visual design'],
                  ['CMYK', 'c/m/y/k: 0–100%',              'Print, offset printing',          'Business cards, posters, physical print'],
                ].map(([fmt, range, usedIn, bestFor], i) => (
                  <tr key={fmt} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--ink)', fontFamily: 'JetBrains Mono, monospace' }}>{fmt}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)' }}>{range}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{usedIn}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-3)' }}>{bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── HSL vs HSV ──────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            HSL vs HSV — which should you use?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            Both HSL and HSV use the same Hue and Saturation components, but differ in how they describe brightness. This distinction matters depending on your tool and use case.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, marginBottom: 14 }}>
            <div style={{ padding: '20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>HSL — Lightness</div>
              <ul style={{ paddingLeft: 18, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.8, margin: 0 }}>
                <li>0% lightness = <strong>black</strong></li>
                <li>50% lightness = <strong>pure color</strong></li>
                <li>100% lightness = <strong>white</strong></li>
                <li>Native in CSS: <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, background: 'var(--border)', padding: '1px 4px', borderRadius: 3 }}>hsl()</code></li>
                <li>Best for design tokens and theming</li>
              </ul>
            </div>
            <div style={{ padding: '20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>HSV — Value (Brightness)</div>
              <ul style={{ paddingLeft: 18, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.8, margin: 0 }}>
                <li>0% value = <strong>black</strong></li>
                <li>100% value = <strong>full brightness</strong></li>
                <li>100% value + 0% sat = <strong>white</strong></li>
                <li>Used in Figma, Photoshop, Sketch</li>
                <li>Best for color pickers and design tools</li>
              </ul>
            </div>
          </div>
          <div style={{ padding: '14px 18px', background: 'var(--green-lt)', border: '1px solid var(--green-mid)', borderRadius: 'var(--r-l)' }}>
            <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: 0, lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--ink)' }}>Rule of thumb:</strong> use <strong>HSL</strong> when writing CSS or building a design system. Use <strong>HSV</strong> when working inside a design tool like Figma or Photoshop. They describe the same color differently — neither is "better".
            </p>
          </div>
        </section>

        {/* ── RGB vs CMYK ─────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            RGB vs CMYK — screen vs print
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            RGB and CMYK use fundamentally different physics to produce color. RGB is <strong style={{ color: 'var(--ink)' }}>additive</strong> — it adds light. CMYK is <strong style={{ color: 'var(--ink)' }}>subtractive</strong> — it absorbs light with ink. This is why some bright screen colors cannot be exactly reproduced in print.
          </p>
          <div style={{ overflowX: 'auto', marginBottom: 14 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                  {['', 'RGB', 'CMYK'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Model',         'Additive light',                'Subtractive ink'],
                  ['Medium',        'Screens, monitors, TVs',        'Printers, offset press'],
                  ['White',         'All channels at max (255,255,255)', 'All channels at 0% (blank paper)'],
                  ['Black',         'All channels at 0 (0,0,0)',     'K channel at 100%'],
                  ['Color gamut',   'Larger — more colors possible', 'Smaller — limited by ink'],
                  ['File formats',  'PNG, JPG, SVG, WebP',           'PDF (print-ready), TIFF'],
                  ['Design tools',  'Figma, CSS, browser',           'Adobe InDesign, Illustrator'],
                ].map(([aspect, rgb, cmyk], i) => (
                  <tr key={aspect} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{aspect}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{rgb}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{cmyk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 14, color: 'var(--ink-3)', fontStyle: 'italic' }}>
            Always design in RGB and convert to CMYK only before submitting to a printer. Never design in CMYK for digital output.
          </p>
        </section>

        {/* ── CSS usage ───────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Using colors in CSS — which format to choose?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
            Modern CSS supports all color formats. The best choice depends on how you plan to use the color:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                fmt: 'HEX (#3b82f6)',
                when: 'Static colors, brand colors, when you got the value from a design tool',
                note: 'Most compact. Use 3-digit shorthand (#fff) where possible.',
                code: 'color: #3b82f6;',
              },
              {
                fmt: 'RGB (rgb(59, 130, 246))',
                when: 'When you need transparency — use rgba() with a 4th alpha channel',
                note: 'rgba(59, 130, 246, 0.5) gives 50% opacity.',
                code: 'background: rgba(59, 130, 246, 0.15);',
              },
              {
                fmt: 'HSL (hsl(217, 91%, 60%))',
                when: 'Design systems, theming, creating tints and shades',
                note: 'Easiest to create a lighter variant: just increase the L value.',
                code: 'color: hsl(217, 91%, 60%);\n--light: hsl(217, 91%, 90%);',
              },
              {
                fmt: 'CSS Variable (--color: #3b82f6)',
                when: 'Any color used more than once in your stylesheet',
                note: 'Define once in :root, use everywhere with var(--color).',
                code: ':root { --primary: #3b82f6; }\na { color: var(--primary); }',
              },
            ].map(({ fmt, when, note, code }) => (
              <div key={fmt} style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 8 }}>{fmt}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-2)', marginBottom: 6 }}><strong>Use when:</strong> {when}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 8 }}>{note}</div>
                <pre style={{ margin: 0, padding: '8px 12px', background: 'var(--page-bg)', borderRadius: 'var(--r-s)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', lineHeight: 1.6 }}>{code}</pre>
              </div>
            ))}
          </div>
        </section>

        {/* ── Accessibility and color contrast ─────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Color accessibility — contrast ratios and WCAG
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            Converting a color to the right format is only half the job. Before using any color for text or interactive elements, verify that it meets <strong style={{ color: 'var(--ink)' }}>WCAG 2.2 contrast requirements</strong>. Low-contrast colors are the most common accessibility failure on the web, and they make content unreadable for users with low vision or in bright sunlight.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            The contrast ratio is calculated from the <strong style={{ color: 'var(--ink)' }}>relative luminance</strong> of two colors — a value derived from their linear RGB components. The luminance calculation uses non-linear gamma correction to match human visual perception, which is why two colors that look similar in HEX can have very different luminance values.
          </p>
          <div style={{ overflowX: 'auto', marginBottom: 14 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                  {['WCAG Level', 'Min contrast ratio', 'Applies to', 'Passes?'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['AA (normal text)',  '4.5:1', 'Text under 18px regular / 14px bold', '✅ Minimum required'],
                  ['AA (large text)',   '3:1',   'Text 18px+ regular or 14px+ bold',    '✅ Minimum required'],
                  ['AA (UI components)','3:1',   'Buttons, inputs, icons, focus rings',  '✅ Minimum required'],
                  ['AAA (enhanced)',    '7:1',   'Normal text — highest accessibility',  '⭐ Gold standard'],
                ].map(([level, ratio, applies, status], i) => (
                  <tr key={level} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{level}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--green)', fontWeight: 700 }}>{ratio}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{applies}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-3)' }}>{status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-3)' }}>
            After converting your colors with this tool, test your text/background combinations with a dedicated contrast checker. Use <a href="/tools/color-palette" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Color Palette Generator</a> to generate accessible color combinations from the start.
          </p>
        </section>

        {/* ── Color spaces beyond the browser ─────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Color spaces beyond the browser — LAB, LCH, and P3
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            HEX, RGB, HSL, HSV, and CMYK cover the majority of developer workflows, but modern CSS is expanding into perceptually uniform color spaces that were previously limited to professional design software. Understanding the landscape helps you choose the right tool for the job.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            {[
              { name: 'sRGB', note: 'The standard color space for web and most screens. HEX, RGB, and HSL operate in sRGB. Covers about 35% of visible colors.', tag: 'Standard' },
              { name: 'Display P3', note: 'Apple\'s wide-gamut color space, available on iPhone, iPad, and Mac displays since 2015. Covers ~50% of visible colors — 25% wider than sRGB. Supported in CSS via color(display-p3 r g b).', tag: 'Wide gamut' },
              { name: 'LAB / OKLAB', note: 'Perceptually uniform: equal numeric steps produce equal perceived color changes. OKLAB is an improved version used by tools like Figma and the CSS oklch() function. Great for generating smooth gradients and color scales.', tag: 'Perceptual' },
              { name: 'LCH / OKLCH', note: 'The cylindrical form of LAB — Lightness, Chroma, Hue. More intuitive than LAB for designers. CSS oklch() is now supported in all modern browsers and is the recommended format for new design systems.', tag: 'Modern CSS' },
              { name: 'Rec. 2020', note: 'Ultra-wide gamut color space used in 4K HDR video production. Not yet practical for web UI design but increasingly relevant for video streaming and high-end displays.', tag: 'HDR / Video' },
            ].map(({ name, note, tag }) => (
              <div key={name} style={{ display: 'flex', gap: 14, padding: '12px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', flexWrap: 'wrap' }}>
                <div style={{ minWidth: 100 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', fontFamily: 'JetBrains Mono, monospace', background: 'var(--green-lt)', padding: '2px 8px', borderRadius: 4 }}>{name}</span>
                  <div style={{ fontSize: 11, color: 'var(--ink-4)', marginTop: 4 }}>{tag}</div>
                </div>
                <div style={{ flex: 1, minWidth: 200, fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)' }}>{note}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            For new projects targeting modern browsers, consider using <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>oklch()</code> in your CSS for its superior perceptual uniformity and wide-gamut capability. Use this converter to get the sRGB values for cross-browser fallbacks.
          </p>
        </section>

        {/* ── Practical CSS color workflows ────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Practical color workflow tips for web developers
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
            Color conversion is rarely a one-off task — it is part of a repeatable workflow. Here are the patterns that experienced developers follow to avoid inconsistency and save time:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { title: 'Store design tokens in HSL', body: 'Define your brand colors as CSS custom properties in HSL: --brand-hue: 220; --brand: hsl(var(--brand-hue), 80%, 55%). This lets you generate tints, shades, and tones with a single hue value. Changing the hue updates your entire palette in one edit.' },
              { title: 'Convert HEX to HSL for theme scaling', body: 'When a designer hands you a HEX color (#3b82f6), convert it to HSL to understand its hue, saturation, and lightness. Then build your full color scale by adjusting only the L value in 10% increments from 10% to 90%. The result is a consistent 9-stop color ramp ready for a design system.' },
              { title: 'Use RGB for JavaScript manipulation', body: 'RGB is the easiest format to manipulate mathematically in JavaScript. Lightening a color is as simple as increasing all three channels by the same amount. For canvas drawing, WebGL shaders, and the Canvas 2D API, RGB values map directly to the underlying data model.' },
              { title: 'Always specify CMYK with an ICC profile for print', body: 'A raw CMYK conversion (C=20, M=5, Y=0, K=0) means nothing to a print shop without specifying the ICC profile. The same CMYK values produce different printed colors on coated versus uncoated paper. Always send RGB source files to professional printers and let them convert using the target ICC profile.' },
              { title: 'Test color contrast during design, not after', body: 'Convert your color combinations early and check WCAG contrast ratios before you get attached to a palette. Failing contrast is more painful to fix after a design is approved and sliced into components. Use this converter to check HSL lightness values — a minimum lightness difference of ~40% between text and background is a useful rough heuristic for passing AA.' },
              { title: 'Use browser DevTools as a secondary converter', body: 'Chrome and Firefox DevTools let you click any CSS color value to cycle between HEX, RGB, and HSL representations in the inspector. This is useful for quick conversions when reviewing a live page. For batch conversion or CMYK output, a dedicated tool is more reliable.' },
            ].map(({ title, body }, i) => (
              <div key={title} style={{ padding: '14px 16px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>


      </div>
    </div>
  );
}
