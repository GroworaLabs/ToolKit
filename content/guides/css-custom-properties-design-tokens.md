---
title: "CSS Custom Properties: The Complete Guide to Design Tokens in CSS"
description: "CSS custom properties do more than store color values. This guide covers everything from basic variables to dynamic theming, component variants, dark mode, and building a real design token system that scales."
category: "Design"
tools: ["color-palette", "color-contrast-checker", "color-converter"]
tags: ["css", "design tokens", "design systems", "custom properties", "css variables", "dark mode", "theming"]
publishedAt: "2026-05-20"
author: "sophie-larkin"
---

CSS custom properties — commonly called CSS variables — were introduced in the CSS Custom Properties specification and became widely supported around 2016. Eight years later, they are the foundation of virtually every modern design system, and they enable patterns that were previously only possible with Sass variables, JavaScript-in-CSS, or build-time tokens.

This guide goes beyond the basics. The goal is to understand how CSS custom properties actually work — scoping, inheritance, computed value resolution — so you can use them confidently for anything from simple color aliases to fully dynamic component theming.

---

## The Mechanics: More Than Variable Substitution

The first thing to understand is that CSS custom properties are **not** like Sass variables. Sass variables are resolved at compile time — the compiled CSS contains no trace of them. CSS custom properties exist at runtime, in the computed style of every element, and they follow CSS's inheritance rules.

```css
/* Sass variable — resolved at compile time */
$primary: #2563eb;
.button { background: $primary; }  /* compiles to: background: #2563eb; */

/* CSS custom property — resolved at runtime */
:root { --color-primary: #2563eb; }
.button { background: var(--color-primary); }  /* stays as-is in the browser */
```

This distinction has real consequences. With CSS custom properties, you can change a value at runtime — via JavaScript, via a media query, via a class toggle — and every element that uses the property updates instantly, without re-downloading a stylesheet or re-parsing any CSS.

**Syntax:**

```css
/* Declaration (always starts with --) */
:root {
  --font-size-base: 16px;
  --color-brand: #2563eb;
  --spacing-unit: 8px;
}

/* Usage */
body {
  font-size: var(--font-size-base);
}

/* With a fallback value */
.button {
  background: var(--button-bg, var(--color-brand));
  /* If --button-bg is not defined, falls back to --color-brand */
}
```

The fallback in `var()` can itself be another `var()`, enabling chains. The fallback only fires if the property is undefined; it does not fire if the property is defined but set to an invalid value for that context.

---

## Scoping and Inheritance

Custom properties inherit through the DOM tree, following the same cascade rules as any other inherited CSS property. This is what makes them powerful for component-level theming.

```css
:root {
  --bg: white;
  --text: #1a1a1a;
}

/* Override for a specific component tree */
.card--dark {
  --bg: #1e293b;
  --text: #f1f5f9;
}

.card {
  background: var(--bg);
  color: var(--text);
}
```

Any `.card` element inside a `.card--dark` container will use the dark values; every other `.card` uses the root defaults. The key insight: **you are not creating separate `.card--dark` style rules — you are changing the token values, and the existing `.card` rules pick up the change automatically.**

This scales to arbitrarily deep component trees. A single class change on an ancestor element can retheme everything inside it.

---

## Building a Design Token System

Design tokens are the named values that define your visual language: colors, spacing, typography, shadows, border radii, motion durations. A token system maps semantic names to visual values, with multiple layers of indirection.

**Primitive tokens → Semantic tokens → Component tokens:**

```css
/* Layer 1: Primitive tokens — raw values */
:root {
  /* Colors */
  --blue-500: #2563eb;
  --blue-600: #1d4ed8;
  --blue-50:  #eff6ff;
  --gray-900: #111827;
  --gray-100: #f3f4f6;
  --white:    #ffffff;

  /* Typography */
  --font-sans: system-ui, -apple-system, sans-serif;
  --font-mono: 'Fira Code', 'Cascadia Code', monospace;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-full: 9999px;
}

/* Layer 2: Semantic tokens — meaning, not specific values */
:root {
  --color-primary:        var(--blue-500);
  --color-primary-hover:  var(--blue-600);
  --color-primary-subtle: var(--blue-50);

  --color-background:     var(--white);
  --color-surface:        var(--gray-100);
  --color-text:           var(--gray-900);
  --color-text-muted:     #6b7280;
  --color-border:         #e5e7eb;

  --font-body:   var(--font-sans);
  --font-code:   var(--font-mono);
  --text-body:   var(--text-base);
  --text-small:  var(--text-sm);
  --text-heading: var(--text-xl);
}

/* Layer 3: Component tokens — specific to a UI component */
.button {
  --button-bg:           var(--color-primary);
  --button-bg-hover:     var(--color-primary-hover);
  --button-text:         var(--white);
  --button-radius:       var(--radius-md);
  --button-padding-x:    var(--space-4);
  --button-padding-y:    var(--space-2);

  background: var(--button-bg);
  color:      var(--button-text);
  padding:    var(--button-padding-y) var(--button-padding-x);
  border-radius: var(--button-radius);
  transition: background 150ms ease;
}

.button:hover {
  background: var(--button-bg-hover);
}
```

The three layers serve different purposes. Primitive tokens are reference values — you change these when you need to update a raw colour or spacing unit. Semantic tokens abstract meaning from values — a dark mode switch overrides semantic tokens without touching primitives. Component tokens enable local overrides — a `.button--large` variant only needs to override `--button-padding-x` and `--button-padding-y`.

---

## Dark Mode: The Cleanest Implementation

CSS custom properties make dark mode implementation fundamentally simpler than any pre-custom-properties approach. Instead of duplicating selector blocks with overrides, you override the tokens:

```css
/* Default (light) tokens */
:root {
  --color-background: #ffffff;
  --color-surface:    #f8fafc;
  --color-text:       #0f172a;
  --color-text-muted: #64748b;
  --color-border:     #e2e8f0;
  --color-primary:    #2563eb;
}

/* Dark mode — system preference */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0f172a;
    --color-surface:    #1e293b;
    --color-text:       #f1f5f9;
    --color-text-muted: #94a3b8;
    --color-border:     #334155;
    --color-primary:    #3b82f6;  /* slightly lighter blue for better contrast on dark bg */
  }
}

/* Manual toggle — user overrides system preference */
:root[data-theme="dark"] {
  --color-background: #0f172a;
  /* ... same values */
}

:root[data-theme="light"] {
  --color-background: #ffffff;
  /* ... same values */
}
```

With JavaScript, toggling dark mode is one DOM attribute change:

```javascript
function toggleDarkMode() {
  const current = document.documentElement.dataset.theme;
  document.documentElement.dataset.theme = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', document.documentElement.dataset.theme);
}

// Restore preference before first paint (inline script in <head>)
const saved = localStorage.getItem('theme');
if (saved) document.documentElement.dataset.theme = saved;
```

Always verify contrast ratios in both light and dark mode. A color that passes WCAG AA in light mode may fail in dark mode if you are using a blue that becomes too dark against a dark background. Use the [Color Contrast Checker](/tools/color-contrast-checker) with both your light and dark token values.

---

## Accessible Color Palette Generation

When building your color scale, generate it with accessibility in mind from the start rather than retrofitting. The [Color Palette Generator](/tools/color-palette) creates harmonious multi-step scales; the [Color Converter](/tools/color-converter) converts between hex, RGB, HSL, and oklch so you can work in whichever color space your workflow uses.

A practical approach: choose 9–11 steps for each hue (50 through 950 in Tailwind's convention). The text color should use 800–950 range values on light backgrounds; the background color should use 50–100 range values. The 500 step is typically the base brand color. Verify that:

- 900 on 50 background achieves ≥7:1 (AAA)
- 800 on 100 background achieves ≥4.5:1 (AA)
- 600 on white achieves ≥3:1 (minimum for large text and UI components)

---

## JavaScript Integration

CSS custom properties are accessible from JavaScript, enabling dynamic theming driven by user input or runtime data:

```javascript
// Read a custom property value
const root = document.documentElement;
const primary = getComputedStyle(root).getPropertyValue('--color-primary').trim();
// → '#2563eb'

// Set a custom property
root.style.setProperty('--color-primary', '#7c3aed');  // Override with purple

// Remove an inline override (falls back to stylesheet value)
root.style.removeProperty('--color-primary');
```

This pattern enables themes driven by user-selected brand colors:

```javascript
function applyBrandColor(hex) {
  // Validate the hex value
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return;

  document.documentElement.style.setProperty('--color-primary', hex);
  // Every element using --color-primary updates immediately
}
```

---

## Responsive Custom Properties

Custom properties can change value at different breakpoints, enabling responsive design tokens:

```css
:root {
  --container-padding: 16px;
  --text-heading: 1.5rem;
  --grid-columns: 1;
}

@media (min-width: 768px) {
  :root {
    --container-padding: 32px;
    --text-heading: 2rem;
    --grid-columns: 2;
  }
}

@media (min-width: 1280px) {
  :root {
    --container-padding: 48px;
    --text-heading: 2.5rem;
    --grid-columns: 3;
  }
}

.container {
  padding-inline: var(--container-padding);
}

.grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
}
```

Changing the token at the `:root` level means every element using that token updates at the same breakpoint — no need to write media queries inside every component.

---

## Animating Custom Properties

Custom properties can be transitioned, but with an important limitation: the browser can only interpolate between custom property values if it knows their type. The `@property` at-rule registers a custom property with an explicit type, enabling smooth animations:

```css
@property --gradient-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.animated-gradient {
  background: linear-gradient(var(--gradient-angle), #2563eb, #7c3aed);
  animation: spin 4s linear infinite;
}

@keyframes spin {
  to { --gradient-angle: 360deg; }
}
```

Without `@property`, the animation would jump rather than rotate. The `syntax` field tells the browser how to interpolate — supported types include `<color>`, `<length>`, `<percentage>`, `<number>`, `<integer>`, and `<angle>`.

Browser support for `@property` is Chrome 85+, Edge 85+, Safari 16.4+, Firefox 128+. For older browser support, use JavaScript-driven animations instead.

---

## Debugging Custom Properties in DevTools

Chrome and Firefox DevTools make it easy to inspect, override, and trace the inheritance of custom properties — a workflow that saves significant time when a token change is not propagating as expected.

**Inspecting computed values:**

1. Select an element in the Elements panel.
2. Open the **Computed** tab (not the Styles tab).
3. Type `--` in the filter box. Every custom property computed for this element is listed with its resolved value.

This shows you not just the property's value but whether it was inherited or set directly — the element it was inherited from is listed alongside the value.

**Overriding a token for testing:**

In the Styles panel, click inside any `var(--some-property)` value. Chrome auto-completes custom property names. You can type a new value directly — the override is applied to the page immediately, scoped to that element's inline style. This is the fastest way to test "what would this component look like if the primary color were purple" without editing any files.

**Tracing inheritance:**

When a custom property has an unexpected value, the issue is usually one of three things: it was overridden at a lower scope than you expected; a media query changed it; or it was never defined and is resolving to an invalid value. Use the **Sources** panel's search (Ctrl+Shift+F) to find all definitions of `--your-property-name` across all loaded stylesheets.

---

## Performance Considerations

CSS custom properties have negligible runtime performance cost in steady-state — the browser resolves them once per style recalculation and caches the result. The performance questions come up in two specific scenarios.

**Animating with `@property` (registered properties):**

Registered custom properties (those declared with `@property`) can be composited by the GPU when animating values that map to transform or opacity. Unregistered properties cannot be composited — the browser must do a full style recalculation on every frame. For smooth 60fps animations involving custom properties, register them with `@property`.

**Many overrides on deeply nested elements:**

If you override dozens of custom properties on every child of a large list, the browser must resolve each one for every list item. In practice this is only measurable on very large lists (thousands of items). For these cases, use a single class toggle on the parent and resolve the tokens at the parent level rather than overriding on each child.

**CSS custom properties vs inline styles:**

Inline `style="color: #2563eb"` is faster per-element than `style="--color: #2563eb"` + `color: var(--color)` because the inline value skips the custom property resolution step. But the difference is measured in microseconds. The architectural benefits of tokens — dark mode, theming, single source of truth — far outweigh the overhead for any realistic application.

---

## Common Mistakes

**Using custom properties for non-varying values.** If a value never changes — a specific border width used in one place — a custom property adds indirection without benefit. Use custom properties for values that vary by context (theme, component variant, breakpoint) or that appear in many places.

**Forgetting that undefined custom properties produce an invalid value.** If `--button-bg` is never defined and has no fallback, `background: var(--button-bg)` resolves to the initial value of `background` — transparent — not to nothing. This can cause unexpected invisible elements.

**Not setting `color-scheme`.** When implementing dark mode, declare `color-scheme: dark` so the browser renders native UI elements (scrollbars, form controls, system fonts) in their dark variants:

```css
:root[data-theme="dark"] {
  color-scheme: dark;
}
```

**Putting too many tokens at `:root`.** Large design systems sometimes put hundreds of tokens on `:root`. This is fine for performance but makes the token list hard to navigate. Group related tokens with comments, and consider a naming convention that makes structure scannable: `--[category]-[variant]-[state]` → `--color-text-muted`, `--color-primary-hover`.
