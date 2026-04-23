export default function ColorContrastCheckerContent() {
  return (
    <div className="tool-content">
      <h2>WCAG Colour Contrast: The Complete Developer Guide</h2>
      <p>
        Colour contrast is one of the most commonly failed accessibility requirements on the web. According to the WebAIM Million report — an annual automated audit of the top one million home pages — low-contrast text is consistently the single most common WCAG failure, appearing on over 80% of pages tested. This guide explains the standard, the maths behind it, and how to make design decisions that pass both AA and AAA requirements.
      </p>

      <h3>Why Contrast Matters</h3>
      <p>
        Approximately 2.2 billion people worldwide have some form of vision impairment. Of these, around 300 million have colour blindness (colour vision deficiency) and hundreds of millions experience reduced contrast sensitivity due to conditions like cataracts, glaucoma, or simply ageing. Sufficient contrast between text and its background ensures readable content for:
      </p>
      <ul>
        <li>Users with low vision who have not yet been diagnosed or do not use screen magnification</li>
        <li>Users in bright-light environments (outdoor mobile use, direct sunlight on screens)</li>
        <li>Users on low-quality displays, projectors, or aged monitors with reduced contrast</li>
        <li>Users with partial colour blindness who may not distinguish foreground from background by hue alone</li>
        <li>Users with photophobia (light sensitivity) who use high-contrast modes</li>
      </ul>

      <h3>The WCAG 2.1 Contrast Requirements</h3>
      <p>
        The Web Content Accessibility Guidelines (WCAG) 2.1, published by the W3C, define contrast requirements in Success Criteria 1.4.3 (Contrast Minimum, Level AA) and 1.4.6 (Contrast Enhanced, Level AAA):
      </p>
      <table>
        <thead>
          <tr><th>Level</th><th>Text size</th><th>Required ratio</th></tr>
        </thead>
        <tbody>
          <tr><td>AA</td><td>Normal text (&lt;18pt / &lt;14pt bold)</td><td>4.5:1</td></tr>
          <tr><td>AA</td><td>Large text (≥18pt / ≥14pt bold)</td><td>3:1</td></tr>
          <tr><td>AA</td><td>UI components &amp; graphical objects (SC 1.4.11)</td><td>3:1</td></tr>
          <tr><td>AAA</td><td>Normal text</td><td>7:1</td></tr>
          <tr><td>AAA</td><td>Large text</td><td>4.5:1</td></tr>
        </tbody>
      </table>
      <p>
        Level AA is the legal baseline in most jurisdictions: the Americans with Disabilities Act (ADA), the European Accessibility Act (EAA / EN 301 549), the UK Equality Act, and Section 508 of the US Rehabilitation Act all reference or incorporate WCAG 2.1 AA. Level AAA is aspirational — meeting it everywhere is difficult due to design constraints, but it's the right target for critical content (legal disclosures, medical instructions, financial data).
      </p>

      <h3>What Counts as "Large Text"?</h3>
      <p>
        WCAG defines large text as:
      </p>
      <ul>
        <li>At least <strong>18pt (24px)</strong> for regular weight text</li>
        <li>At least <strong>14pt (approximately 18.67px)</strong> for bold text</li>
      </ul>
      <p>
        The conversion is: 1pt = 1.333… CSS px (because 1pt = 1/72 inch, and CSS assumes 96px/inch, so 1pt = 96/72 = 1.333px). Therefore:
      </p>
      <ul>
        <li>18pt = 24px (regular)</li>
        <li>14pt ≈ 18.67px, typically rounded to 19px (bold)</li>
      </ul>
      <p>
        CSS <code>font-weight: 700</code> or higher qualifies as bold. Heading elements (h1–h3) typically meet the large text threshold in standard designs. Navigation items, buttons, and body text typically do not.
      </p>

      <h3>The Maths: How Contrast Ratio Is Calculated</h3>
      <p>
        The contrast ratio formula from WCAG is:
      </p>
      <pre><code>{`contrast_ratio = (L1 + 0.05) / (L2 + 0.05)`}</code></pre>
      <p>
        Where L1 is the relative luminance of the lighter colour and L2 is the relative luminance of the darker colour. Relative luminance measures how much light a colour reflects relative to a white surface, accounting for how the human eye perceives brightness.
      </p>
      <p>
        Relative luminance from an sRGB colour:
      </p>
      <pre><code>{`L = 0.2126 × R_lin + 0.7152 × G_lin + 0.0722 × B_lin`}</code></pre>
      <p>
        Where R_lin, G_lin, B_lin are the <strong>linearised</strong> channel values. sRGB uses gamma encoding to match how CRT displays worked, so the raw channel values (0–255) must be converted back to linear light first:
      </p>
      <pre><code>{`// For each channel C in [0, 1]:
C_lin = C / 12.92                      if C ≤ 0.04045
C_lin = ((C + 0.055) / 1.055) ^ 2.4   if C > 0.04045`}</code></pre>
      <p>
        The coefficients 0.2126, 0.7152, and 0.0722 reflect the eye's relative sensitivity to the three primary colours. The human eye is most sensitive to green (0.7152), moderately sensitive to red (0.2126), and least sensitive to blue (0.0722). This is why yellow (#ffff00) appears extremely bright — it combines maximum red and green signals, producing near-maximum luminance.
      </p>
      <p>
        Examples of relative luminance values:
      </p>
      <table>
        <thead>
          <tr><th>Colour</th><th>Hex</th><th>Luminance</th></tr>
        </thead>
        <tbody>
          <tr><td>White</td><td>#ffffff</td><td>1.000</td></tr>
          <tr><td>Yellow</td><td>#ffff00</td><td>0.928</td></tr>
          <tr><td>Light grey</td><td>#cccccc</td><td>0.600</td></tr>
          <tr><td>Medium grey</td><td>#888888</td><td>0.216</td></tr>
          <tr><td>Brand blue (#1d4ed8)</td><td>#1d4ed8</td><td>0.070</td></tr>
          <tr><td>Dark grey</td><td>#333333</td><td>0.033</td></tr>
          <tr><td>Black</td><td>#000000</td><td>0.000</td></tr>
        </tbody>
      </table>

      <h3>Reading the Contrast Ratio</h3>
      <p>
        Contrast ratios range from 1:1 (no contrast — identical colours) to 21:1 (maximum contrast — black on white). Common design targets:
      </p>
      <ul>
        <li><strong>1:1</strong> — invisible (same colour)</li>
        <li><strong>2:1</strong> — very low contrast, fails all WCAG criteria (light grey on white)</li>
        <li><strong>3:1</strong> — minimum for large text / UI components (AA large)</li>
        <li><strong>4.5:1</strong> — minimum for body text (AA normal, and AAA large)</li>
        <li><strong>7:1</strong> — AAA normal text — very accessible</li>
        <li><strong>21:1</strong> — maximum — black text on white</li>
      </ul>

      <h3>Colour Blindness and Contrast</h3>
      <p>
        The WCAG luminance formula accounts for typical colour perception, so it partially handles colour blindness — a high-luminance-contrast pair is likely readable regardless of the type of colour blindness. However, there are failure modes:
      </p>
      <ul>
        <li><strong>Red-green pairs:</strong> A red (#ff0000) on green (#008000) combination has a contrast ratio of about 2.9:1 — already failing AA normal text. But even higher-contrast red-green combinations can be indistinguishable for people with deuteranopia (red-green colour blindness). The luminance formula does not fully capture this — simulate with a colour blindness simulator.</li>
        <li><strong>Same-hue, different-saturation:</strong> A saturated blue (#0000ff) on a desaturated blue (#6060a0) may have acceptable luminance contrast but look identical to someone with tritanopia (blue-yellow colour blindness).</li>
        <li><strong>Status colours:</strong> Never use colour alone to convey status (red = error, green = success). Always pair colour with an icon, text label, or pattern. This addresses WCAG SC 1.4.1 (Use of Colour).</li>
      </ul>

      <h3>Practical Colour Recommendations</h3>
      <p>
        <strong>For dark text on light backgrounds (most common):</strong>
      </p>
      <ul>
        <li><code>#000000</code> on <code>#ffffff</code> → 21:1 (always passes)</li>
        <li><code>#1a1a1a</code> on <code>#ffffff</code> → ~19:1 (near-black, visually softer)</li>
        <li><code>#374151</code> on <code>#ffffff</code> → ~10:1 (Tailwind gray-700 on white)</li>
        <li><code>#6b7280</code> on <code>#ffffff</code> → ~5:7:1 (passes AA normal)</li>
        <li><code>#9ca3af</code> on <code>#ffffff</code> → ~2.5:1 (fails AA — too light for body text)</li>
      </ul>
      <p>
        <strong>For light text on dark backgrounds (dark mode):</strong>
      </p>
      <ul>
        <li><code>#ffffff</code> on <code>#1a1a1a</code> → ~19:1 (passes all)</li>
        <li><code>#e5e7eb</code> on <code>#111827</code> → ~14:1 (Tailwind gray-200 on gray-900)</li>
        <li><code>#d1d5db</code> on <code>#374151</code> → ~5:1 (passes AA normal)</li>
        <li><code>#9ca3af</code> on <code>#374151</code> → ~2.7:1 (fails AA)</li>
      </ul>
      <p>
        <strong>For coloured text on white (links, labels):</strong>
      </p>
      <ul>
        <li><code>#1d4ed8</code> (blue-700) on white → ~7:1 (passes AAA)</li>
        <li><code>#2563eb</code> (blue-600) on white → ~5:1 (passes AA)</li>
        <li><code>#3b82f6</code> (blue-500) on white → ~3:1 (fails AA normal, passes large)</li>
        <li><code>#dc2626</code> (red-600) on white → ~5.9:1 (passes AA)</li>
        <li><code>#16a34a</code> (green-600) on white → ~5.1:1 (passes AA)</li>
      </ul>

      <h3>Non-Text Contrast (SC 1.4.11)</h3>
      <p>
        WCAG 2.1 added Success Criterion 1.4.11 (Non-text Contrast), which requires a 3:1 contrast ratio for:
      </p>
      <ul>
        <li><strong>UI component boundaries:</strong> The border or outline of input fields, buttons, checkboxes, radio buttons, and dropdowns against the adjacent background.</li>
        <li><strong>State indicators:</strong> The focused state ring, selected state colour, hover underline.</li>
        <li><strong>Informational graphics:</strong> Chart lines, icon paths that convey meaning (a checkmark icon in a form validation message, for instance).</li>
      </ul>
      <p>
        Note: decorative icons (purely aesthetic) are exempt. Disabled controls are also exempt — the visual indication that a control is disabled deliberately reduces contrast.
      </p>

      <h3>WCAG 3.0 and APCA</h3>
      <p>
        The upcoming WCAG 3.0 is expected to replace the simple luminance-based contrast ratio with APCA — the Advanced Perceptual Contrast Algorithm — developed by Andrew Somers. APCA accounts for:
      </p>
      <ul>
        <li>The polarity of contrast (light text on dark differs from dark on light)</li>
        <li>Font size and weight in a continuous model (not just a binary large/small split)</li>
        <li>Spatial frequency effects (thin strokes need more contrast than thick ones)</li>
        <li>The different reading environment of body text vs. large headings vs. UI labels</li>
      </ul>
      <p>
        WCAG 3.0 is still in development (as of 2025) and is not yet a legal requirement anywhere. Use the WCAG 2.1 formula for compliance — this is what this tool implements — and optionally check APCA for additional guidance on fine-grained design decisions.
      </p>

      <h3>Testing Contrast in Practice</h3>
      <p>
        <strong>Browser DevTools:</strong> Chrome, Firefox, and Edge DevTools all show contrast ratio warnings inline in the Elements panel when inspecting text nodes. Chrome's "CSS Overview" tab provides a site-wide contrast audit.
      </p>
      <p>
        <strong>Axe / Lighthouse:</strong> Automated accessibility audits (axe-core, Lighthouse, Pa11y) catch most contrast failures in a single scan. Run them as part of CI with <code>@axe-core/playwright</code> or <code>axe-core/jest</code> to prevent regressions.
      </p>
      <p>
        <strong>Figma:</strong> The "Contrast" plugin and the built-in A11y annotation kit show contrast ratios directly in your designs before implementation.
      </p>
      <p>
        <strong>Windows High Contrast Mode / Forced Colours:</strong> Windows users can enable a system-wide colour override that forces all colours through a user-defined palette. Use the CSS media feature <code>forced-colors: active</code> to detect this mode and ensure your UI remains functional when colours are overridden.
      </p>
    </div>
  );
}
