---
title: "Color Palette Generation for Web Projects: Theory and Practice"
description: "A practical guide to building color palettes that work — covering color models, harmony rules, accessibility contrast, dark mode, and the tools that generate production-ready palettes from a single starting color."
category: "Design"
tools: ["color-palette", "color-contrast-checker", "color-converter"]
tags: ["color", "design", "palette", "web design", "accessibility", "css", "ui"]
publishedAt: "2026-05-22"
author: "sophie-larkin"
---

Every color decision in a web project compounds. A primary brand color chosen without considering its accessible variants forces you to pick a different shade for text, which clashes with the button color, which requires a different hover state, which doesn't work on dark backgrounds. By the time you have 40 components, you have 60 ad-hoc color decisions and no coherent system.

Building a color palette before you build components is the discipline that prevents this. A palette is a constrained set of colors with defined relationships — a primary, a few neutrals, semantic colors for status, and enough tonal steps to handle every UI state. Done once correctly, it eliminates most color decisions for the rest of the project.

---

## Color Theory Foundations

### Color models

**HSL (Hue, Saturation, Lightness)** is the most practical model for UI work:

- **Hue**: the color itself, 0–360° on the color wheel (0=red, 120=green, 240=blue)
- **Saturation**: color intensity, 0%=gray, 100%=fully saturated
- **Lightness**: brightness, 0%=black, 50%=pure color, 100%=white

HSL maps well to how designers think about color. Keeping hue and saturation constant while varying lightness produces a tonal scale. Keeping lightness constant while shifting hue produces harmonious accent colors.

**RGB** (Red, Green, Blue) is how browsers render color. It is less intuitive for manual color picking but necessary for mixing and programmatic manipulation.

**Hex** (`#f5a623`) is RGB in base-16 notation — the format you will use most in CSS. Every hex color maps 1:1 to an RGB value.

Use the [Color Converter](/tools/color-converter) to move between HSL, RGB, hex, and HSB without manual calculation.

### Color harmony rules

**Complementary**: two colors opposite on the color wheel (0° and 180°). High contrast, high tension — good for call-to-action elements, not large areas of competing color.

**Analogous**: three to four colors adjacent on the wheel (e.g., blue, blue-green, green). Low tension, harmonious — good for backgrounds and large surface areas.

**Triadic**: three colors equally spaced (120° apart). Balanced and vibrant when saturations are matched — good for infographics and illustration, harder to use in UI.

**Split-complementary**: a base color plus the two colors adjacent to its complement. Less tension than complementary, more interest than analogous. A practical choice for many UI palettes.

**Monochromatic**: one hue in many lightness steps. The most reliable approach for UI — predictable, flexible, and easy to keep accessible.

Most successful product color palettes are monochromatic (one primary hue in 9–12 lightness steps) plus a neutral scale plus 3–5 semantic colors (success, warning, error, info).

---

## Building a Tonal Scale

A tonal scale takes one hue and generates a range of lightness values — from near-white to near-black. This gives you enough variation to handle every UI context without introducing new hues.

Common scale sizes: 9 steps (100–900) or 11 steps (50–950). Tailwind's default palette uses 11 steps per hue. Material Design uses 10.

**Example: Building a blue scale**

Starting from `hsl(215, 90%, 50%)` (a vibrant mid-blue):

| Step | HSL | Hex | Use |
|---|---|---|---|
| 50 | 215, 90%, 97% | `#f0f6ff` | Page background tints |
| 100 | 215, 85%, 93% | `#daeaff` | Subtle backgrounds |
| 200 | 215, 80%, 84% | `#b0d4ff` | Borders, dividers |
| 300 | 215, 80%, 72% | `#7db9ff` | Decorative elements |
| 400 | 215, 85%, 62% | `#4d9eff` | Light interactive states |
| 500 | 215, 90%, 50% | `#0a7fff` | **Primary** — buttons, links |
| 600 | 215, 90%, 40% | `#0864cc` | Hover states |
| 700 | 215, 85%, 32% | `#064fa3` | Active / pressed states |
| 800 | 215, 80%, 22% | `#03316e` | Dark backgrounds |
| 900 | 215, 75%, 14% | `#011e47` | Deep backgrounds, high-contrast text |

The saturation slightly decreases at both extremes because pure colors at very high or very low lightness look washed out or muddy. Slight saturation adjustments maintain perceived vibrancy across the scale.

Use the [Color Palette Generator](/tools/color-palette) to generate a full tonal scale from a single base color automatically.

---

## Neutral Scale

Neutral colors (grays) are the backbone of any UI palette. They handle body text, backgrounds, borders, disabled states, and secondary elements. You will use neutrals far more than any hue.

A pure gray has 0% saturation. But most design systems use slightly warm or cool neutrals — a 5–10% saturation with a warm or cool hue — because pure gray can look cold and sterile next to a colored primary.

**Warm neutral** (slight red/yellow tint — good with warm primaries like orange, red, gold):

```css
--neutral-50: hsl(30, 15%, 97%);
--neutral-100: hsl(30, 12%, 92%);
--neutral-300: hsl(30, 8%, 75%);
--neutral-500: hsl(30, 6%, 50%);
--neutral-700: hsl(30, 5%, 28%);
--neutral-900: hsl(30, 4%, 10%);
```

**Cool neutral** (slight blue tint — good with blue, purple, or green primaries):

```css
--neutral-50: hsl(215, 20%, 97%);
--neutral-100: hsl(215, 15%, 93%);
--neutral-300: hsl(215, 10%, 74%);
--neutral-500: hsl(215, 6%, 50%);
--neutral-700: hsl(215, 8%, 27%);
--neutral-900: hsl(215, 10%, 8%);
```

Match the hue of your neutral scale to your primary hue for a cohesive palette.

---

## Semantic Colors

Semantic colors convey meaning independent of brand color. Most design systems define at minimum:

| Semantic role | Typical color | Purpose |
|---|---|---|
| Success | Green | Completed actions, valid states, positive feedback |
| Warning | Amber/orange | Attention needed, destructive but recoverable |
| Error / Danger | Red | Failed actions, invalid input, destructive actions |
| Info | Blue (often same as primary) | Neutral information, tips, announcements |

Each semantic color needs the same tonal scale treatment: a light background tint (for banners/alerts), a mid-range for icons and borders, and a dark shade for text on white backgrounds.

**Accessibility constraint:** semantic colors must meet WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text and UI components) when placed on their background. A success green that "looks right" but reads at 2.8:1 contrast on white is an accessibility failure.

Check every text-on-background combination with the [Color Contrast Checker](/tools/color-contrast-checker) before finalising semantic colors.

---

## Accessibility: Contrast and Color Blindness

### WCAG contrast requirements

WCAG 2.1 defines contrast as a ratio between foreground and background luminance:

- **AA normal text**: 4.5:1 minimum
- **AA large text** (18pt+ or 14pt+ bold): 3:1 minimum
- **AA UI components** (borders, icons, input outlines): 3:1 minimum
- **AAA normal text**: 7:1 (enhanced)

Common violations:

- Gray text on white (#999 on #fff = 2.85:1 — fails AA)
- White text on a mid-saturation primary (#fff on #0a7fff = 3.2:1 — fails AA for normal text)
- Light green on white for success states
- Placeholder text lighter than 4.5:1

Run your palette's text combinations through the [Color Contrast Checker](/tools/color-contrast-checker) to identify failures before your design reaches code review.

### Color blindness

8% of men and 0.5% of women have some form of color vision deficiency. The most common is deuteranopia (red-green), which affects ~6% of men.

Implications for UI design:

- **Never use color as the only signal.** Red borders on invalid inputs need an icon or error text alongside the color.
- **Test your palette under simulated color blindness.** Browser DevTools (Chrome: Rendering panel → Emulate vision deficiencies) simulate deuteranopia, protanopia, and tritanopia.
- **Red and green at similar lightness are indistinguishable to many users.** Use different icons, labels, or lightness values alongside color.

---

## Dark Mode Palette

Dark mode is not "invert the colors." Inverting produces garish, eye-straining results. A proper dark palette is designed independently from the light palette, with these principles:

**Backgrounds are not black.** A true `#000000` background with white text is too harsh — the contrast is too extreme (21:1). Most dark themes use `#0f172a` or similar (near-black with slight blue tint, ~5–8% lightness).

**Surface layers use slightly lighter neutrals.** In the light theme, cards are white on a light-gray background. In dark mode, reverse: slightly lighter surfaces on a dark background.

**Saturated colors need desaturation.** Your primary `hsl(215, 90%, 50%)` looks fine on white but too bright on a dark background. Desaturate to `hsl(215, 70%, 55%)` and increase lightness slightly for dark-mode usage.

**A practical dark mode token structure:**

```css
:root {
  /* Light mode */
  --bg-base: hsl(215, 20%, 97%);
  --bg-surface: hsl(0, 0%, 100%);
  --text-primary: hsl(215, 30%, 10%);
  --text-secondary: hsl(215, 15%, 40%);
  --primary: hsl(215, 90%, 50%);
  --primary-text: hsl(0, 0%, 100%);
}

html.dark {
  /* Dark mode overrides */
  --bg-base: hsl(215, 28%, 7%);
  --bg-surface: hsl(215, 25%, 11%);
  --text-primary: hsl(215, 20%, 93%);
  --text-secondary: hsl(215, 12%, 60%);
  --primary: hsl(215, 75%, 62%);      /* lighter, less saturated */
  --primary-text: hsl(215, 30%, 8%);  /* dark text on lighter button */
}
```

---

## CSS Custom Properties for Palette Implementation

Implement your palette as CSS custom properties at two levels: raw color values and semantic tokens.

**Level 1 — raw scale (all values):**

```css
:root {
  /* Blue scale */
  --blue-50: #f0f6ff;
  --blue-100: #daeaff;
  --blue-200: #b0d4ff;
  --blue-300: #7db9ff;
  --blue-400: #4d9eff;
  --blue-500: #0a7fff;
  --blue-600: #0864cc;
  --blue-700: #064fa3;
  --blue-800: #03316e;
  --blue-900: #011e47;

  /* Neutral scale */
  --gray-50: #f8fafc;
  --gray-100: #f1f5f9;
  /* ... */
}
```

**Level 2 — semantic tokens (what components use):**

```css
:root {
  --color-primary: var(--blue-500);
  --color-primary-hover: var(--blue-600);
  --color-primary-subtle: var(--blue-50);
  --color-text: var(--gray-900);
  --color-text-muted: var(--gray-500);
  --color-border: var(--gray-200);
  --color-surface: #ffffff;
  --color-bg: var(--gray-50);
}
```

Components reference semantic tokens, not raw values. This means changing the primary color is a one-line change at the token level, not a find-and-replace across every component.

---

## Extracting Palettes from Images

Starting from an image (logo, brand photo, product shot) instead of a color wheel:

1. **Identify the dominant hue** — the most prominent color in the image
2. **Use it as your primary** — extract the HSL values and build a tonal scale from that hue
3. **Match your neutral** — pull the neutral hue from the image's shadow or background tones
4. **Limit extracted colors** — do not use every color in the image; pick one primary and use your semantic colors for the rest

The [Color Palette Generator](/tools/color-palette) can generate a coordinated palette from a single input color, giving you the full tonal range ready to plug into CSS variables.

---

## Common Mistakes

**Too many hues.** More than 3–4 distinct hues in a UI palette creates visual noise. One primary, one neutral, semantic colors, and optionally one accent is the limit for most products.

**Insufficient tonal range.** If you only define 3 shades of your primary, you will run out of options for hover states, backgrounds, and text. Generate at least 9 steps.

**Not checking contrast during design.** Contrast checking after the palette is locked and components are built requires rework. Run checks during palette creation.

**Choosing colors that work on white but not on your background.** Most palettes are designed on white, but if your app has a light-gray background (`#f5f7fa`), your contrast ratios change. Test on your actual background colors.

**Ignoring semantic meaning.** Using red for non-error states trains users to ignore red. Reserve error-semantic colors for their intended meaning.
