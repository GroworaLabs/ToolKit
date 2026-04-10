export default function ColorPaletteContent() {
  return (
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
        <div>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              What is a color palette generator?
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              A color palette generator creates sets of harmonious colors based on color theory principles. Instead of guessing which colors look good together, you use mathematical relationships between hues on the color wheel to generate combinations that are visually pleasing by design.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              Colors are generated in <strong style={{ color: 'var(--ink)' }}>HSL format</strong> (Hue, Saturation, Lightness) internally and exported as HEX, RGB, or CSS custom properties. You can lock any color to keep it while regenerating the rest — useful when you have a fixed brand color and need harmonious companions.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
              When choosing colors for the web, always verify contrast ratios against the <a href="https://www.w3.org/WAI/WCAG22/quickref/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'underline' }}>WCAG accessibility guidelines</a>. WCAG 2.2 requires a minimum contrast ratio of 4.5:1 between text and its background for normal text, and 3:1 for large text. Good color choices are both beautiful and accessible.
            </p>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              How to generate a color palette
            </h2>
            <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { n: '1', title: 'Choose a harmony mode', desc: 'Select from 7 harmony types: Random, Analogous, Complementary, Triadic, Split Complementary, Tetradic, or Monochromatic. Each produces a different visual feel.' },
                { n: '2', title: 'Lock colors you want to keep', desc: 'Click the lock icon on any swatch to keep that color fixed. Regenerate as many times as needed — locked colors stay in place.' },
                { n: '3', title: 'Click Generate palette', desc: 'A new palette is generated using the selected harmony mode. Click any swatch to copy its HEX value instantly.' },
                { n: '4', title: 'Copy as CSS variables', desc: 'Click Copy CSS to get a ready-to-use :root { } block with --color-1 through --color-5 variables. Paste directly into your stylesheet.' },
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
              Color harmony modes explained
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { mode: 'Analogous',           feel: 'Calm, cohesive',     desc: 'Uses colors adjacent on the color wheel (±20–40°). Looks natural and harmonious. Common in nature-inspired and wellness brands.' },
                { mode: 'Complementary',        feel: 'Bold, high contrast', desc: 'Uses colors directly opposite on the wheel (180°). Creates strong visual tension and energy. Common in sports and retail.' },
                { mode: 'Triadic',              feel: 'Vibrant, balanced',   desc: 'Three colors equally spaced (120° apart). Rich and dynamic while maintaining balance. Common in playful, creative brands.' },
                { mode: 'Split Complementary', feel: 'Softer contrast',     desc: 'A base color plus two colors adjacent to its complement. More variety than analogous, less tension than complementary.' },
                { mode: 'Tetradic',             feel: 'Rich, complex',       desc: 'Four colors forming a rectangle on the wheel. Maximum variety — harder to balance. Works best with one dominant color.' },
                { mode: 'Monochromatic',        feel: 'Elegant, cohesive',   desc: 'One hue at different lightness values. Easy to get right, always looks polished. Common in premium and minimal brands.' },
              ].map(({ mode, feel, desc }) => (
                  <div key={mode} style={{ display: 'flex', gap: 14, padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', alignItems: 'flex-start' }}>
                    <div style={{ minWidth: 160 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{mode}</div>
                      <div style={{ fontSize: 12, color: 'var(--green)', fontWeight: 600, marginTop: 2 }}>{feel}</div>
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>{desc}</p>
                  </div>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: 48 }}>
            <div style={{ padding: '20px 24px', background: 'var(--green-lt)', border: '1px solid var(--green-mid)', borderRadius: 'var(--r-l)' }}>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--ink)', marginBottom: 8 }}>
                💡 The 60-30-10 rule
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-2)', margin: 0 }}>
                A simple rule for using your palette: use your dominant color for 60% of the design (backgrounds, large areas), a secondary color for 30% (cards, sections), and an accent color for 10% (buttons, highlights, links). This creates visual hierarchy without overwhelming the viewer.
              </p>
            </div>
          </section>

          {/* ── Building a design system palette ─────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Building a design system color palette
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              A well-structured design system palette goes beyond 5 random harmonious colors. It defines a complete color vocabulary that designers and developers can use consistently across an entire product. Most modern design systems use a <strong style={{ color: 'var(--ink)' }}>scale-based approach</strong> where each hue has a range of 10–12 lightness steps (e.g. 50, 100, 200 … 900, 950).
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
              Start by generating your primary brand color palette using this tool, then use the HSL values to create a full scale. For a given hue, keep the hue and saturation constant and vary only the lightness: 950 is near-black, 50 is near-white, and 500 is the pure color. Use <a href="/tools/color-converter" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Color Converter</a> to translate your generated HEX values to HSL for easier scale creation.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {[
                { role: 'Primary', purpose: 'Brand color — buttons, links, active states, primary CTAs', example: 'Blue, Green, Indigo' },
                { role: 'Neutral / Gray', purpose: 'Text, backgrounds, borders, dividers, disabled states', example: 'Slate, Zinc, Stone' },
                { role: 'Semantic: Success', purpose: 'Positive states, confirmations, success messages', example: 'Green hues' },
                { role: 'Semantic: Warning', purpose: 'Caution states, non-blocking alerts, attention indicators', example: 'Amber, Yellow' },
                { role: 'Semantic: Error', purpose: 'Error states, destructive actions, form validation', example: 'Red hues' },
                { role: 'Accent / Secondary', purpose: 'Supporting color for visual interest, highlights, tags', example: 'Complementary to primary' },
              ].map(({ role, purpose, example }) => (
                <div key={role} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{role}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55, marginBottom: 6 }}>{purpose}</div>
                  <div style={{ fontSize: 12, color: 'var(--green)', fontWeight: 600 }}>e.g. {example}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Color and brand identity ──────────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Color psychology in brand and UI design
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
              Color perception is culturally shaped and context-dependent, but certain associations are consistent enough across Western markets to be useful starting points for brand color selection:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { color: 'Blue', feel: 'Trust, reliability, calm, professionalism', used: 'Finance, healthcare, tech (LinkedIn, PayPal, Samsung, Ford)' },
                { color: 'Green', feel: 'Growth, health, sustainability, nature', used: 'Finance (wealth), food, wellness, eco brands (Whole Foods, Robinhood)' },
                { color: 'Red', feel: 'Energy, urgency, passion, appetite stimulation', used: 'Food, retail, entertainment (Coca-Cola, Netflix, YouTube)' },
                { color: 'Yellow / Amber', feel: 'Optimism, warmth, attention-grabbing', used: 'Warnings, food, creative brands (IKEA, McDonald\'s, Snapchat)' },
                { color: 'Purple', feel: 'Creativity, luxury, mystery, wisdom', used: 'Premium products, beauty, creative tools (Cadbury, Hallmark, Twitch)' },
                { color: 'Black / Charcoal', feel: 'Sophistication, premium, authority', used: 'Luxury fashion, high-end tech (Apple, Chanel, Nike)' },
              ].map(({ color, feel, used }) => (
                <div key={color} style={{ display: 'flex', gap: 14, padding: '12px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', flexWrap: 'wrap' }}>
                  <div style={{ minWidth: 80, fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{color}</div>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 2 }}>{feel}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-4)' }}>{used}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Building a color token system ────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              From palette to design token system
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              A generated 5-color palette is a starting point, not a final design system. Production interfaces typically need dozens of named color tokens — semantic roles that map abstract names like "primary" or "danger" to specific values. Here is how to scale a palette into a full token system:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {[
                { step: '1', title: 'Assign semantic roles', desc: 'Map each palette color to a purpose: Primary (main brand actions), Secondary (supporting elements), Accent (highlights, CTAs), Neutral (text, backgrounds, borders), Semantic (success green, warning yellow, error red, info blue). Semantic names let you change the underlying color without updating every component.' },
                { step: '2', title: 'Build a lightness scale for each hue', desc: 'For each brand color, generate a 9-stop lightness ramp from 10% to 90% in HSL. Label them 100 through 900 (like Tailwind CSS or Material Design). Light stops (100–300) work for backgrounds and tints; medium stops (400–600) work for UI elements; dark stops (700–900) work for text on light backgrounds.' },
                { step: '3', title: 'Define component-level tokens', desc: 'Component tokens reference semantic tokens: --button-bg: var(--primary-500); --button-hover: var(--primary-600); --button-text: var(--neutral-50). This two-level system means changing your brand color updates all components at once, and individual component tweaks do not require touching the base palette.' },
                { step: '4', title: 'Add dark mode variants', desc: 'For each semantic token, define a dark mode value. Often this is the inverse lightness: --surface-bg is neutral-50 in light mode and neutral-900 in dark mode. CSS custom properties make this clean: put light values in :root and dark values in [data-theme="dark"] or @media (prefers-color-scheme: dark).' },
                { step: '5', title: 'Document usage guidelines', desc: 'A color system without documentation is a palette that developers use inconsistently. Write usage guidelines: "Primary 500 is for interactive elements only. Never use Primary as a background for large areas." Even a short README prevents color drift across a growing codebase.' },
              ].map(({ step, title, desc }) => (
                <div key={step} style={{ display: 'flex', gap: 14, padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--green)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{step}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{title}</div>
                    <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Dark mode color strategy ──────────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Dark mode color strategy
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              Dark mode is not just inverting your light palette — that approach consistently produces poor results. Colors that look balanced on a white background become garish and oversaturated when placed on a dark background. Here is how to approach dark mode color design correctly:
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              <strong style={{ color: 'var(--ink)' }}>Reduce saturation in dark mode.</strong> Vivid colors that work on white backgrounds feel harsh against dark backgrounds. Reduce saturation by 10–20% for most brand colors in dark mode. The exception is interactive colors like links and buttons, which benefit from slightly higher saturation to remain visible.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              <strong style={{ color: 'var(--ink)' }}>Never use pure black as your dark background.</strong> Pure black (#000000) creates extreme contrast with any content, causing eye strain. Instead, use very dark neutral grays (HSL lightness 7–12%) with a subtle hue tint that matches your brand color. Material Design uses #121212; GitHub uses #0d1117; Linear uses #1b1b1f.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
              <strong style={{ color: 'var(--ink)' }}>Use elevation through lightness.</strong> In dark mode, higher surfaces (modals, cards, tooltips) should be lighter, not darker. This mimics real-world ambient occlusion and creates a clear visual hierarchy without shadows. Increment lightness by 4–8% for each elevation level above your base background.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { rule: 'Brand color in dark mode', light: 'HSL(220, 80%, 55%)', dark: 'HSL(220, 65%, 65%) — higher L, lower S' },
                { rule: 'Text color in dark mode', light: 'HSL(220, 10%, 10%)', dark: 'HSL(220, 10%, 90%) — near-white, never pure white' },
                { rule: 'Surface background', light: 'HSL(0, 0%, 100%)', dark: 'HSL(220, 8%, 10%) — tinted near-black' },
                { rule: 'Card / elevated surface', light: 'HSL(220, 8%, 97%)', dark: 'HSL(220, 8%, 15%) — lighter than base' },
                { rule: 'Border color', light: 'HSL(220, 10%, 88%)', dark: 'HSL(220, 10%, 22%) — subtle, not invisible' },
              ].map(({ rule, light, dark }, i) => (
                <div key={rule} style={{ display: 'flex', gap: 0, border: '1px solid var(--border)', borderRadius: 'var(--r-l)', overflow: 'hidden' }}>
                  <div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 600, color: 'var(--ink)', background: 'var(--white)', minWidth: 160, flexShrink: 0 }}>{rule}</div>
                  <div style={{ padding: '10px 14px', fontSize: 12, color: 'var(--ink-3)', background: 'var(--page-bg)', flex: 1, fontFamily: 'JetBrains Mono, monospace', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>{light}</div>
                  <div style={{ padding: '10px 14px', fontSize: 12, color: 'var(--green)', background: 'var(--page-bg)', flex: 1, fontFamily: 'JetBrains Mono, monospace' }}>{dark}</div>
                </div>
              ))}
            </div>
          </section>


        </div>
      </div>
  );
}