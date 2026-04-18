---
title: "Color Models Explained: HEX, RGB, HSL, and When to Use Each"
description: "Three ways to describe the same color, each suited to a different task. HEX for code, RGB for compositing, HSL for design decisions."
category: "Design"
tools: ["color-converter", "color-palette"]
tags: ["color", "css", "design", "frontend"]
publishedAt: "2026-04-14"
author: "olivia-bennett"
---

## Same Color, Three Notations

`#ff5733`, `rgb(255 87 51)`, and `hsl(11 100% 60%)` all describe the exact same orange. They differ in what's convenient to reason about: HEX is compact for code, RGB matches how screens produce light, HSL matches how humans think about colour.

A front-end developer or designer will move between all three. This guide explains when each one is the right tool, and what gets easier when you pick the right notation.

## HEX — Compact, Ubiquitous, Opaque

HEX is two hex digits each for red, green, and blue:

```
#RRGGBB    → six-digit form, e.g. #ff5733
#RGB       → three-digit shorthand, e.g. #f53 (same as #ff5533)
#RRGGBBAA  → eight digits with alpha, e.g. #ff5733cc
```

Why it's everywhere: it's the shortest way to write a color. `#fff` is three characters; `rgb(255 255 255)` is thirteen. In a stylesheet with hundreds of color values, HEX wins on density.

Why it's awful to read: `#4a5568` tells you almost nothing about what color it is. You have to paste it into a picker or the [Color Converter](/tools/color-converter) to see.

HEX is a direct encoding of the RGB byte values — it's not a separate color model, just a notation. Any color picker that shows RGB values can convert to HEX mentally: `255` is `ff`, `128` is `80`, `0` is `00`.

## RGB — How Displays Actually Work

RGB describes color by the intensity of three light emitters: red, green, blue. A screen pixel has three subpixels and drives each to a level between 0 and 255:

```
rgb(255 0 0)       →  pure red
rgb(0 255 0)       →  pure green
rgb(0 0 255)       →  pure blue
rgb(255 255 255)   →  white (all three at max)
rgb(0 0 0)         →  black (all three off)
rgb(255 87 51)     →  same orange as #ff5733
```

Modern CSS syntax uses space-separated values and supports an alpha channel:

```
rgb(255 87 51)          /* opaque */
rgb(255 87 51 / 80%)    /* 80% opacity */
rgb(255 87 51 / 0.8)    /* same, as decimal */
```

RGB is the right mental model when you're thinking about **how colors mix**: stacking translucent layers, blend modes, shader math. If you're computing a gradient or averaging colors, do the math in RGB.

It's the wrong mental model for design decisions. "Make this a bit darker" is hard to express in RGB — you have to lower all three channels, and getting the proportions right so you don't change the hue is tricky.

## HSL — How Designers Think

HSL describes color by three human-friendly properties:

- **Hue** — position on the color wheel, 0–360°. 0° is red, 120° is green, 240° is blue.
- **Saturation** — how vivid, 0–100%. 0% is grey; 100% is the purest version of the hue.
- **Lightness** — how bright, 0–100%. 0% is black, 50% is the "pure" color, 100% is white.

```
hsl(11 100% 60%)           /* that same orange */
hsl(11 100% 60% / 80%)     /* 80% opacity */
```

Why this matters in practice: HSL makes common design operations trivial.

| Operation | HSL change |
|---|---|
| Make the color darker | Decrease L |
| Make the color lighter | Increase L |
| Make it more muted | Decrease S |
| Shift to a related hue | Change H by 10–30° |
| Generate a palette | Fix S and L, vary H across the wheel |

That last point is why HSL shows up in nearly every design system. A neutral gray scale is `hsl(var(--hue) 10% L)` with L varying from 10 to 95. A brand palette rotates H while keeping S and L similar so the colors feel like a family.

Build palettes interactively with the [Color Palette Generator](/tools/color-palette) — it uses exactly this HSL-based logic to produce harmonious color sets.

## The Newer Ones: OKLCH and LCH

CSS Color 4 (shipping in all modern browsers) adds **OKLCH** and **LCH** — perceptually uniform color spaces. The critical property: a 10-point change in lightness looks like roughly the same amount of change regardless of hue, which is not true for HSL.

```
oklch(70% 0.2 30)   /* L, chroma, hue */
```

HSL is "perceived as light" only loosely — `hsl(60 100% 50%)` (yellow) looks much brighter than `hsl(240 100% 50%)` (blue) despite both being 50% lightness. OKLCH fixes that, which is why design tools (Figma's new color engine, Radix, Tailwind's modern palettes) are migrating to it for palette generation.

For most code you write in 2026, HEX and HSL are still the everyday tools. OKLCH is the one to learn when you need palettes that feel consistent across a wide hue range.

## Quick Conversion Reference

| Goal | Right tool |
|---|---|
| Store a color in code concisely | HEX |
| Blend or composite two colors | RGB |
| Adjust lightness or saturation | HSL |
| Generate a palette | HSL or OKLCH |
| Build a perceptually uniform gradient | OKLCH |
| Match a brand color from a print designer | Whatever they give you — convert once |

## Accessibility Note

None of these notations automatically give you accessible contrast. Two colors can look fine side by side to you and fail WCAG AA contrast for someone with low vision. Always check contrast ratios against the surrounding background — tools like Lighthouse or axe report failing pairs, and the contrast ratio is calculated from the RGB values regardless of how you wrote the color.

A good default: body text needs **4.5:1** contrast against its background, large text needs **3:1**, UI controls need **3:1**.

## Try It Now

Convert any color between HEX, RGB, and HSL instantly with the [Color Converter](/tools/color-converter). To generate a full palette from a single starting color, the [Color Palette Generator](/tools/color-palette) offers harmony modes (analogous, complementary, triadic) that demonstrate how HSL hue rotation produces balanced combinations.
