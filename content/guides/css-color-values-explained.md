---
title: "CSS Color Values: hex, rgb, hsl, and oklch Explained"
description: "CSS gives you five ways to write a color, and each is optimised for a different use case. This guide explains when to use hex, rgb(), hsl(), and the modern oklch() — and how to pick the right format for your design system."
category: "Design"
tools: ["color-palette", "color-contrast-checker"]
tags: ["css", "color", "hex", "rgb", "hsl", "oklch", "design", "design systems", "accessibility"]
publishedAt: "2026-05-20"
author: "sophie-larkin"
---

CSS has supported multiple color formats since the early web, but the past five years have brought the most significant expansion of the color specification in the language's history. We went from `hex` and `rgb()` to `hsl()`, then to `hwb()`, `lab()`, `lch()`, `oklch()`, and `color()` — each targeting a different use case in design systems and color manipulation.

Most developers pick a format by habit and stick with it. That habit is usually `hex` or `rgb()`, which were the only options in the early 2000s. Modern CSS can do better, and this guide explains when it should.

---

## The Five Formats You Will Actually Use

### 1. Hex — `#rgb`, `#rrggbb`, `#rrggbbaa`

Hex is the most common CSS color format and the one you will encounter most often in design tools, documentation, and stack overflow answers.

```css
color: #2563eb;       /* 6-digit hex: #rrggbb */
color: #f00;          /* 3-digit shorthand: same as #ff0000 */
color: #2563ebcc;     /* 8-digit hex with alpha: #rrggbbaa */
```

**Red, green, blue** each map to one byte (0–255), encoded as two hex digits (00–ff). The shorthand `#rgb` expands by doubling each digit: `#f09` → `#ff0099`.

**When to use hex:**

- Copying values from Figma, Sketch, or design tokens
- Writing colors you will not need to programmatically manipulate
- Communicating specific brand colors to other devs

**When not to use hex:**

When you need to understand the color at a glance. `#2563eb` tells you nothing visually. `hsl(221, 83%, 53%)` tells you it is a medium-blue at high saturation.

---

### 2. RGB — `rgb(r g b)`, `rgb(r g b / alpha)`

RGB maps directly to how screens work: mix red, green, and blue light. Each channel is 0–255 (or 0%–100%).

```css
color: rgb(37 99 235);           /* modern space-separated syntax */
color: rgb(37, 99, 235);         /* legacy comma syntax — still valid */
color: rgb(37 99 235 / 0.5);     /* 50% opacity */
color: rgba(37, 99, 235, 0.5);   /* legacy rgba() — identical to above */
```

Note: modern CSS level 4 syntax uses spaces and treats `rgb()` and `rgba()` as the same function. The legacy comma syntax still works everywhere.

**When to use RGB:**

- When you need alpha transparency and are working in a codebase that pre-dates oklch
- When values come from a JavaScript calculation that already works in 0–255 space
- When matching colors from image data (canvas, WebGL)

```javascript
// Reading a pixel from canvas
const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;
element.style.color = `rgb(${r} ${g} ${b} / ${a / 255})`;
```

**When not to use RGB:**

When creating color variations. Adjusting lightness in RGB is not intuitive — to make `rgb(37 99 235)` 20% lighter, you do not simply add 20 to each channel. The resulting color will not look uniformly lighter.

---

### 3. HSL — `hsl(hue saturation lightness)`

HSL was designed to be human-readable and designer-friendly. Instead of mixing channels, you describe a color by its hue (position on the color wheel), saturation (intensity), and lightness.

```css
color: hsl(221 83% 53%);          /* hue: 221°, sat: 83%, light: 53% */
color: hsl(221deg 83% 53%);       /* explicit degree unit */
color: hsl(221 83% 53% / 0.5);    /* 50% opacity */
color: hsla(221, 83%, 53%, 0.5);  /* legacy syntax */
```

**The hue wheel:**

| Hue angle | Color |
|---|---|
| 0° / 360° | Red |
| 30° | Orange |
| 60° | Yellow |
| 120° | Green |
| 180° | Cyan |
| 240° | Blue |
| 270° | Purple |
| 300° | Magenta |

**Generating color scales in HSL:**

The primary strength of HSL is programmatic color generation. To create a tonal scale (the kind used in design systems like Tailwind), you hold hue and saturation constant and vary lightness:

```css
:root {
  --blue-50:  hsl(221 83% 95%);
  --blue-100: hsl(221 83% 90%);
  --blue-200: hsl(221 83% 80%);
  --blue-300: hsl(221 83% 70%);
  --blue-400: hsl(221 83% 62%);
  --blue-500: hsl(221 83% 53%);  /* base */
  --blue-600: hsl(221 83% 43%);
  --blue-700: hsl(221 83% 35%);
  --blue-800: hsl(221 83% 25%);
  --blue-900: hsl(221 83% 15%);
}
```

**The limitation of HSL — perceptual non-uniformity:**

HSL's Achilles' heel is that equal steps in lightness do not produce perceptually equal steps in brightness. `hsl(60 100% 50%)` (yellow) and `hsl(240 100% 50%)` (blue) both have `lightness: 50%`, but yellow looks dramatically brighter to the human eye. This makes WCAG contrast calculations unreliable if done purely in HSL space.

Use the [Color Contrast Checker](/tools/color-contrast-checker) to verify that any color pair meets WCAG 2.1 AA or AAA requirements — the tool uses the WCAG-specified relative luminance formula, which accounts for perceptual non-uniformity.

---

### 4. HWB — `hwb(hue whiteness blackness)`

HWB is a less common but often more intuitive format: start with a pure hue, then mix in white and black.

```css
color: hwb(221 15% 8%);   /* hue: 221°, 15% white, 8% black */
```

When whiteness + blackness = 100%, the result is a grey. When both are 0%, you get the pure hue.

HWB is supported in all modern browsers but rarely appears in production CSS. Design tools do not export it. Worth knowing exists, but not worth adopting unless you specifically need its properties.

---

### 5. oklch — `oklch(lightness chroma hue)`

oklch is the most significant addition to CSS color in years, and the one that solves the limitations of HSL. It is based on the **Oklab** perceptual color space, designed specifically so that equal numerical steps produce perceptually equal visual steps.

```css
color: oklch(60% 0.2 250);        /* lightness: 60%, chroma: 0.2, hue: 250° */
color: oklch(60% 0.2 250 / 0.5);  /* 50% opacity */
```

**Why oklch is better for design systems:**

```css
/* HSL: same lightness, but yellow looks much brighter than blue */
.yellow { color: hsl(60 100% 50%); }
.blue   { color: hsl(240 100% 50%); }

/* oklch: perceptually equivalent lightness */
.yellow { color: oklch(80% 0.17 90); }   /* looks as light as... */
.blue   { color: oklch(80% 0.17 250); }  /* ...this blue */
```

**oklch for tonal scales (with guaranteed contrast ratios):**

```css
:root {
  /* Varying lightness in oklch produces visually uniform steps */
  --brand-50:  oklch(97% 0.03 250);
  --brand-100: oklch(93% 0.07 250);
  --brand-200: oklch(85% 0.12 250);
  --brand-300: oklch(75% 0.16 250);
  --brand-400: oklch(65% 0.19 250);
  --brand-500: oklch(55% 0.21 250);  /* base */
  --brand-600: oklch(45% 0.19 250);
  --brand-700: oklch(37% 0.17 250);
  --brand-800: oklch(29% 0.14 250);
  --brand-900: oklch(20% 0.09 250);
}
```

**Gamut: P3 and beyond**

oklch can express colors outside the sRGB gamut — colors that are visible on modern P3 displays (including most iPhones, MacBooks, and high-end monitors since ~2018) but not representable in hex or hsl.

```css
/* This blue is only visible on P3 displays; clamps gracefully on sRGB */
color: oklch(55% 0.30 250);

/* Target P3 explicitly */
@media (color-gamut: p3) {
  color: color(display-p3 0.1 0.3 0.9);
}
```

**Browser support:** oklch is supported in all modern browsers (Chrome 111+, Firefox 113+, Safari 15.4+). As of 2026, it is safe to use without fallbacks for apps that do not need to support IE or very old Android WebViews.

---

## Choosing a Format for a New Project

| Situation | Recommended format |
|---|---|
| Copying from Figma / Sketch | hex (convert to your chosen format after) |
| Design tokens, brand palette | oklch if 2026+, hsl if legacy browser support required |
| Tonal scale generation | oklch |
| Alpha transparency | Any format with `/` alpha syntax |
| Dynamic JS-calculated colors | hsl or oklch (more intuitive to manipulate) |
| Legacy codebase | Match existing convention |

**A practical approach for a new design system:**

1. Define your core palette in oklch — it gives you perceptually uniform scales.
2. Verify contrast ratios with the [Color Contrast Checker](/tools/color-contrast-checker) — oklch lightness values correlate better with WCAG contrast than HSL lightness, but always verify.
3. Generate your full palette with the [Color Palette Generator](/tools/color-palette) to explore harmonious combinations.
4. Export to hex for any third-party tooling that does not accept oklch yet.

---

## Color in CSS Custom Properties

Custom properties (CSS variables) are the right way to manage colors in any moderately complex project:

```css
:root {
  /* Semantic aliases */
  --color-primary:        oklch(55% 0.21 250);
  --color-primary-hover:  oklch(48% 0.20 250);
  --color-primary-light:  oklch(93% 0.07 250);
  --color-text:           oklch(20% 0.02 250);
  --color-text-muted:     oklch(50% 0.02 250);
  --color-surface:        oklch(99% 0.01 250);
  --color-border:         oklch(88% 0.03 250);
}

/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text:    oklch(95% 0.01 250);
    --color-surface: oklch(18% 0.02 250);
    --color-border:  oklch(30% 0.03 250);
  }
}
```

Semantic naming (`--color-primary` rather than `--blue-500`) means you can update colors globally without hunting for every usage site.

---

## Accessibility: Contrast Ratios

Choosing good colors is not just aesthetic — it is a legal and ethical requirement for most products. WCAG 2.1 specifies:

- **AA (minimum):** 4.5:1 for normal text, 3:1 for large text (18px bold or 24px regular) and UI components
- **AAA (enhanced):** 7:1 for normal text, 4.5:1 for large text

The contrast ratio is calculated from the *relative luminance* of two colors, which is a perceptual model of lightness based on how the human eye responds to different wavelengths. The formula is defined in the WCAG spec and correctly accounts for the gamma-correction in sRGB.

oklch `L` values are a useful approximation — colors with `L` differences of ~40% typically meet AA — but always verify with a tool. Use the [Color Contrast Checker](/tools/color-contrast-checker) to test any color pair, with live previews showing text and UI component contexts.

---

## Quick Reference

```css
/* All five formats expressing approximately the same blue */
color: #2563eb;
color: rgb(37 99 235);
color: hsl(221 83% 53%);
color: hwb(221 15% 8%);
color: oklch(54% 0.22 261);
```

The formats are functionally interchangeable in almost all cases — choose based on readability, tooling, and whether you need perceptual uniformity (oklch) or wide browser compatibility (hex/rgb/hsl).
