export default function CssUnitConverterContent() {
    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
            <div>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Absolute vs relative CSS units
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        CSS units fall into two fundamental categories. <strong style={{ color: 'var(--ink)' }}>Absolute units</strong> are fixed and do not change based on context — px, pt, cm, mm, and in all produce the same visual size regardless of parent elements, viewport, or user preferences. <strong style={{ color: 'var(--ink)' }}>Relative units</strong> — rem, em, %, vw, vh — scale based on some reference: a font size, a parent's dimension, or the viewport.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        In CSS, even "absolute" units like px are device-independent. On a high-DPI (HiDPI/Retina) display, one CSS px might equal two or more physical device pixels. The browser's devicePixelRatio determines this relationship. This is why px is called a <em>reference pixel</em> — it represents a pixel at 96 DPI regardless of the actual display density.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
                        The choice between absolute and relative units has significant implications for accessibility and responsive design. Browsers allow users to set their preferred base font size — a user who sets 20px as their base benefits from rem-based layouts but not from px-based ones. Modern best practice is to use px only for fine details (borders, box shadows) and rem for everything else.
                    </p>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        When to use rem vs px vs em — a practical guide
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                        {[
                            { unit: 'rem', color: 'var(--green)', use: 'Font sizes, spacing, layout dimensions, max-width, gap', why: 'Scales with root font size. Respects user\'s browser preference. Consistent across nested components. 1rem = 16px by default.' },
                            { unit: 'px',  color: '#2563eb',     use: 'Borders (1px), box-shadow blur/spread, outline offsets, transform values', why: 'Pixel-perfect control for fine details. Does not scale with font preferences — intentional for borders and decorative elements.' },
                            { unit: 'em',  color: '#b45309',     use: 'Padding inside buttons/badges (scaled to the component\'s own text), letter-spacing', why: 'Relative to the element\'s own font-size, not the root. Useful when a spacing value should grow proportionally with the component\'s text.' },
                            { unit: '%',   color: '#7c3aed',     use: 'Widths inside flex/grid, responsive images (max-width: 100%), padding-top hacks for aspect ratios', why: 'Relative to parent\'s dimension. For width/height, references parent\'s size. Note: padding and margin % always reference parent\'s width, even for vertical values.' },
                        ].map(({ unit, color, use, why }) => (
                            <div key={unit} style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 15, fontWeight: 700, color }}>{unit}</span>
                                    <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>— Best for: {use}</span>
                                </div>
                                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>{why}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ padding: '16px 20px', background: 'var(--green-lt)', border: '1px solid var(--green-mid)', borderRadius: 'var(--r-l)' }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>Recommended baseline setup</div>
                        <pre style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', margin: 0, lineHeight: 1.7, overflowX: 'auto', maxWidth: '100%' }}>{`html { font-size: 16px; } /* keep browser default */
body { font-size: 1rem; }  /* inherit from root */

/* Use rem everywhere else */
.heading { font-size: 2rem; }       /* 32px */
.subheading { font-size: 1.25rem; } /* 20px */
.body-text { font-size: 1rem; }     /* 16px */
.small { font-size: 0.875rem; }     /* 14px */`}</pre>
                    </div>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        The cascade and how em units accumulate
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        The most important thing to understand about em units is that they compound through the DOM. Each em value is calculated relative to the <em>computed</em> font size of the element itself (for font-size) or the element's own computed font size (for other properties). This creates a compounding effect in nested elements.
                    </p>
                    <div style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', marginBottom: 16 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>em compounding example</div>
                        <pre style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', margin: 0, lineHeight: 1.7, overflowX: 'auto', maxWidth: '100%' }}>{`/* Root: 16px */
.parent { font-size: 1.5em; }   /* 1.5 × 16 = 24px */
.child { font-size: 1.5em; }    /* 1.5 × 24 = 36px */
.grandchild { font-size: 1.5em; } /* 1.5 × 36 = 54px */

/* With rem — no compounding */
.parent { font-size: 1.5rem; }      /* 1.5 × 16 = 24px always */
.child { font-size: 1.5rem; }       /* 1.5 × 16 = 24px always */
.grandchild { font-size: 1.5rem; }  /* 1.5 × 16 = 24px always */`}</pre>
                    </div>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        This compounding is precisely why rem was introduced in CSS3. With rem, every value is anchored to the document root, making it predictable regardless of nesting depth.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
                        Em is still useful when you <em>want</em> proportional scaling within a component. For example, a button's padding set in em will scale proportionally as the button's font size changes — making it trivial to create small, medium, and large button variants by only changing <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>font-size</code>.
                    </p>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Viewport units — vw, vh, dvh, svh, lvh
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
                        Viewport units measure percentages of the browser viewport. The classic vw and vh units have been available since CSS3, but mobile browsing created a fundamental problem: the browser's address bar and toolbar take up space, causing vh to produce an inaccurate measurement on mobile devices.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                        {[
                            { unit: 'vw',  desc: '1% of viewport width. Stable — width doesn\'t change with UI chrome. Safe to use everywhere.' },
                            { unit: 'vh',  desc: '1% of viewport height. On mobile, this is calculated from the "large" viewport (browser UI hidden). Can cause elements to be taller than visible screen.' },
                            { unit: 'svh', desc: 'Small viewport height — calculated with all browser UI visible. Most conservative: an element sized to 100svh will always fit on screen.' },
                            { unit: 'dvh', desc: 'Dynamic viewport height — updates as the browser UI shows/hides. Best for full-screen mobile layouts, but can cause layout reflow during scrolling.' },
                            { unit: 'lvh', desc: 'Large viewport height — same as the original vh behavior. Browser UI is excluded from the measurement.' },
                        ].map(({ unit, desc }, i) => (
                            <div key={unit} style={{ display: 'flex', gap: 12, padding: '10px 14px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                                <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 700, color: 'var(--green)', flexShrink: 0, minWidth: 48 }}>{unit}</code>
                                <span style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6 }}>{desc}</span>
                            </div>
                        ))}
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-3)' }}>
                        For full-screen mobile layouts, the modern recommendation is: <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>min-height: 100svh</code> as a safe fallback, with <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>min-height: 100dvh</code> for the ideal dynamic behavior where supported.
                    </p>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Print units — pt, cm, mm, in
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
                        Physical units are primarily used inside <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>@media print</code> rules to create accurately-sized printed documents. On screen, the browser resolves them at 96 DPI.
                    </p>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                                    {['Unit', 'Full name', 'In pixels (96 DPI)', 'Use case'].map(h => (
                                        <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['pt', 'Point',      '1.333px',  'Font sizes in print (12pt body, 14pt headings)'],
                                    ['pc', 'Pica',       '16px',     '1pc = 12pt. Legacy typographic unit'],
                                    ['cm', 'Centimetre', '37.795px', 'Margins, page gutters in print'],
                                    ['mm', 'Millimetre', '3.7795px', 'Fine-grained print measurements'],
                                    ['in', 'Inch',       '96px',     'US letter/legal page dimensions'],
                                ].map(([unit, name, px, use], i) => (
                                    <tr key={unit} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: 'var(--green)' }}>{unit}</td>
                                        <td style={{ padding: '10px 14px', color: 'var(--ink)' }}>{name}</td>
                                        <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{px}</td>
                                        <td style={{ padding: '10px 14px', color: 'var(--ink-3)', fontSize: 13 }}>{use}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Responsive design strategies and fluid typography with clamp()
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
                        Modern CSS provides powerful tools for fluid layouts that adapt continuously across viewport sizes, without discrete breakpoint jumps.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                            {
                                label: 'Fluid typography with clamp()',
                                code: `/* Syntax: clamp(minimum, preferred, maximum) */
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
  /* minimum: 24px, fluid between, maximum: 48px */
}

p {
  font-size: clamp(1rem, 1rem + 0.5vw, 1.25rem);
  /* Stays 1rem on small screens, grows slightly */
}`,
                                note: 'clamp() eliminates the need for font-size media queries. The middle value (preferred) is typically a vw-based expression. Use rem for min and max to ensure accessibility.',
                            },
                            {
                                label: 'Fluid spacing with CSS custom properties',
                                code: `:root {
  --space-s: clamp(0.75rem, 2vw, 1rem);
  --space-m: clamp(1rem, 3vw, 1.5rem);
  --space-l: clamp(1.5rem, 5vw, 2.5rem);
}

.card {
  padding: var(--space-m);
  gap: var(--space-s);
  margin-bottom: var(--space-l);
}`,
                                note: 'Define a fluid spacing scale in :root using clamp(), then reference those custom properties throughout your CSS. Everything scales proportionally with viewport size.',
                            },
                            {
                                label: '62.5% root trick for easier rem math',
                                code: `html {
  font-size: 62.5%; /* makes 1rem = 10px */
}

body {
  font-size: 1.6rem; /* = 16px — restore readable default */
}

/* Now rem math is trivial */
h1 { font-size: 3.2rem; } /* = 32px */
.card { padding: 2.4rem; } /* = 24px */`,
                                note: 'Setting 62.5% makes rem values map cleanly to px: 1.6rem = 16px, 2.4rem = 24px, 4.8rem = 48px. Controversial because it overrides the user\'s font size preference — consider if accessibility is a priority.',
                            },
                        ].map(({ label, code, note }) => (
                            <div key={label} style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>{label}</div>
                                <pre style={{ margin: '0 0 10px', padding: '12px 14px', background: 'var(--page-bg)', borderRadius: 'var(--r-m)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', overflowX: 'auto', lineHeight: 1.7 }}>{code}</pre>
                                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>{note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        CSS custom properties and unit best practices
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
                        Design systems increasingly encode their spacing, typography, and sizing scales as CSS custom properties. This approach separates the scale's values from their application, making global adjustments (like changing the base spacing unit) a one-line change.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {[
                            { rule: 'Use rem for font sizes', desc: 'Always. This respects user font preferences and creates consistent visual hierarchy.' },
                            { rule: 'Use rem for spacing', desc: 'Margins, padding, and gaps set in rem scale with the document\'s font size, maintaining proportional rhythm.' },
                            { rule: 'Use px for borders', desc: '1px borders are intentionally thin regardless of font size. Scaling borders with rem produces unintended thick borders for large-font users.' },
                            { rule: 'Use vw/vh sparingly', desc: 'Good for hero sections, full-bleed images, and fluid typography. Avoid for body text padding — 5vw padding becomes unwieldy on ultrawide monitors.' },
                            { rule: 'Avoid em for spacing', desc: 'Em compounding makes spacing unpredictable in nested components. Prefer rem for spacing, and em only inside components where proportional scaling is desired.' },
                            { rule: 'Test at 200% font size', desc: 'WCAG Success Criterion 1.4.4 requires text to be resizable to 200% without loss of content. Test your layouts at 200% browser zoom to catch px-based layouts that break.' },
                        ].map(({ rule, desc }, i) => (
                            <div key={rule} style={{ display: 'flex', gap: 14, padding: '12px 14px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', flexShrink: 0, marginTop: 8 }} />
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 3 }}>{rule}</div>
                                    <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6 }}>{desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
