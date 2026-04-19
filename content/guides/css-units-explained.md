---
title: "CSS Units Explained: px, em, rem, vw, and When to Use Each"
description: "A practical decision guide for CSS sizing — what each unit is really relative to, why rem won the typography war, and the accessibility mistake px font-size makes."
category: "Developer Tools"
tools: ["css-unit-converter"]
tags: ["css", "web-design", "accessibility", "responsive", "typography"]
publishedAt: "2026-04-19"
author: "olivia-bennett"
---

## There Are More Than You Think

Modern CSS has over 20 length units. Most devs use four or five and ignore the rest. But the difference between `em`, `rem`, `vh`, and `%` is not style — it changes how your layout responds to user zoom, container queries, and mobile browser chrome. Pick wrong and your site breaks accessibility or shifts awkwardly on every phone.

This guide sorts the units into the groups that actually matter, gives you a practical "use this for that" table, and flags the traps.

## Absolute vs Relative — the Big Divide

The fundamental split: **absolute** units are a fixed size; **relative** units depend on something else in the document.

**Absolute:**
- `px` — device pixel (sort of — more on this below)
- `pt`, `pc`, `in`, `cm`, `mm`, `Q` — print units. Rarely useful for screen.

**Relative to font:**
- `em` — the current element's `font-size`
- `rem` — the *root* element's `font-size` (i.e., `<html>`'s)
- `ch` — width of the `0` character in the current font
- `ex` — x-height of the current font (rarely used)

**Relative to viewport:**
- `vw`, `vh` — 1% of viewport width/height
- `vmin`, `vmax` — 1% of the smaller/larger viewport dimension
- `svh`, `lvh`, `dvh` — small, large, and dynamic viewport height (mobile-friendly alternatives to `vh`)

**Relative to container (CSS Container Queries, 2023+):**
- `cqw`, `cqh`, `cqmin`, `cqmax` — 1% of the container's width/height/etc.

**Percentage:**
- `%` — depends on the property. For `width`, it's the parent's width. For `font-size`, it's the parent's font-size. For `line-height`, it's the element's own font-size.

## The px Question

Most devs think `px` is a physical pixel. It's not — it's a **CSS pixel**, an abstraction the browser scales based on the device's pixel density. On a typical mobile phone, one `px` equals roughly two or three physical pixels. That's why your CSS renders at a sensible size on high-DPI screens without you doing anything.

`1px` is defined as `1/96th of an inch` at a standard viewing distance. That specification is more historical than rigid — browsers round aggressively — but it means that `px` is effectively a fixed-size unit from your CSS's perspective.

**When to use `px`:** borders, hairlines, box-shadow offsets, icon sizes, and other decoration where you want an exact rendered size regardless of user font preferences. `border: 1px solid #ccc` is correct; `border: 0.0625rem solid #ccc` is pedantic.

**When NOT to use `px`:** `font-size`. More below.

## Why `rem` Won Typography

Browsers let users set a default font size in preferences (Chrome, Firefox, Safari all have this setting). `16px` is the default, but a user with a vision impairment may set it to `20px` or `24px`. If you write `font-size: 16px`, your text ignores that preference entirely — you've hard-coded 16px no matter what the user wants.

`rem` solves this. `1rem` means "one root font-size" — whatever the user's browser is configured to. If they set `20px` in preferences, `1rem` becomes `20px`, and your entire typography scales with it.

```css
html {
  /* Don't override this. Let the user's browser set it. */
}

body {
  font-size: 1rem;        /* inherits user's preference */
}

h1 {
  font-size: 2.5rem;      /* scales with user's preference */
}
```

Setting `html { font-size: 16px }` is the common mistake that defeats the whole point. Leave the root alone.

If you need to tune the base size *without* breaking user preferences, use a percentage at the root: `html { font-size: 100% }` (the default, but explicit). Some teams use the "62.5% trick" — `html { font-size: 62.5% }` to make `1rem = 10px` — which makes math easier but still breaks user zoom. Avoid it.

## `em` vs `rem` — When Each Wins

They look similar. They compound differently.

```css
.parent { font-size: 1.5rem; }         /* 24px if root is 16 */
.parent .child { font-size: 1.5em; }    /* 1.5 × 24 = 36px */
.parent .child .grandchild { font-size: 1.5em; }  /* 1.5 × 36 = 54px */
```

`em` inherits from the parent element, so nesting compounds. Accidentally nest three `1.5em` elements and your text balloons.

Rules of thumb:

- **`rem` for font-size.** Scales with user preference, no compounding.
- **`em` for padding/margin *inside a component*** that should scale with the component's own font-size. A button with `padding: 0.5em 1em` looks proportional whether the button's text is 14px or 20px.
- **`rem` for global spacing rhythm** — section padding, grid gaps, container margins.

## Viewport Units and the Mobile Problem

`vh` means "1% of viewport height." `100vh` should be the full screen. On desktop, it is. On mobile, it's broken.

Mobile browsers have a dynamic address bar that shows when you scroll up and hides when you scroll down. For years, `100vh` equaled the *largest* possible viewport (address bar hidden) — so an element sized `100vh` was taller than the visible screen when the bar was showing, causing content to be clipped or pushed offscreen.

CSS fixed this in 2022 with three new units:

- `svh` — **small** viewport height. The size when browser UI is at its maximum (bar visible). Safe minimum.
- `lvh` — **large** viewport height. The size when browser UI is collapsed. What `vh` traditionally was.
- `dvh` — **dynamic** viewport height. Changes as the browser UI shows/hides. What you usually want.

For full-screen heroes and modals, prefer `dvh` over `vh` in 2026. Browser support is now universal.

## Quick Decision Table

| Use case | Unit |
|---|---|
| `font-size` for body and headings | `rem` |
| `font-size` inside a tightly-grouped component | `em` |
| Padding/margin that should scale with the component font | `em` |
| Global spacing rhythm | `rem` |
| Borders, hairlines, icon sizes | `px` |
| Container width inside a layout | `%` |
| Full-screen hero on mobile | `dvh` (was `vh`) |
| Fluid font sizes | `clamp(1rem, 2vw + 0.5rem, 2rem)` |
| Input width by character count | `ch` |
| Card padding inside a container query | `cqw` |

## Common Mistakes

- **`font-size: 14px`** — breaks user zoom. Use `rem`.
- **`html { font-size: 62.5% }`** — feels clever, defeats the whole rem accessibility win.
- **`height: 100vh` on a mobile hero** — clipped by the address bar. Use `dvh`.
- **Over-using `em` for margins** — unexpected compounding. Prefer `rem` for layout.
- **`width: 100%` + `padding: 1rem`** — overflows unless you set `box-sizing: border-box`.

## Try It Now

Convert between any CSS units (px ↔ rem ↔ em with a configurable root font-size) with the [CSS Unit Converter](/tools/css-unit-converter). Handy when translating a Figma spec in px to a codebase that uses rem, or verifying that `0.5em` inside a specific component actually equals what you think it does.
