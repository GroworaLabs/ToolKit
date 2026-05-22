---
title: "CSS Selectors: The Complete Guide for Frontend Developers"
description: "A practical reference to every CSS selector — from basic type and class selectors to pseudo-elements, combinators, and the :has() parent selector. Includes specificity rules, performance notes, and real-world patterns."
category: "Design"
tools: ["css-selector-generator"]
tags: ["css", "selectors", "frontend", "web development", "specificity", "styling"]
publishedAt: "2026-05-22"
author: "sophie-larkin"
---

CSS selectors are the mechanism by which styles find their targets. Writing a selector is easy — any valid selector applies styles. Writing the *right* selector — one that is specific enough to style what you intend, general enough to handle edge cases, and simple enough that the next developer can read it — is a skill that takes time to develop.

This guide covers every selector type with examples, the specificity calculation that determines which styles win when multiple selectors match the same element, and the patterns that experienced frontend developers reach for most.

---

## Basic Selectors

### Type selector

Matches all elements of a given HTML tag:

```css
p { line-height: 1.6; }
h1 { font-size: 2rem; }
button { cursor: pointer; }
```

Type selectors have the lowest specificity (0,0,1). Useful for base styles but should not be used for component-specific styles — changing global `p` styles affects every paragraph on the page.

### Class selector

Matches elements that include the given class in their `class` attribute:

```css
.btn { padding: 0.5rem 1rem; border-radius: 4px; }
.btn-primary { background-color: var(--blue); color: white; }
.is-hidden { display: none; }
```

The class selector (0,1,0 specificity) is the workhorse of most CSS methodologies. BEM, utility-first CSS, and CSS Modules all build on class selectors. Prefer classes over IDs for styling.

### ID selector

Matches a single element by its `id` attribute:

```css
#main-nav { position: sticky; top: 0; }
```

ID selectors have high specificity (1,0,0) and target a unique element. This makes them hard to override later. Reserve IDs for JavaScript hooks and anchor links, not styles.

### Universal selector

Matches every element:

```css
* { box-sizing: border-box; }
*, *::before, *::after { box-sizing: inherit; }
```

The universal selector has zero specificity (0,0,0). The `box-sizing: border-box` reset is its most common legitimate use.

### Attribute selector

Matches elements based on their attributes or attribute values:

```css
/* Has the attribute (any value) */
[disabled] { opacity: 0.5; cursor: not-allowed; }

/* Exact value */
[type="text"] { border: 1px solid var(--gray-300); }

/* Starts with */
[href^="https"] { /* secure links */ }

/* Ends with */
[href$=".pdf"]::after { content: " (PDF)"; }

/* Contains */
[class*="icon-"] { display: inline-flex; align-items: center; }

/* Word in space-separated list */
[class~="featured"] { border: 2px solid gold; }

/* Starts with value or value- (useful for language codes) */
[lang|="en"] { font-family: Georgia, serif; }

/* Case-insensitive matching */
[href$=".PDF" i] { /* matches .pdf, .PDF, .Pdf */ }
```

Attribute selectors are particularly useful for styling form elements without adding classes, and for targeting data attributes:

```css
[data-theme="dark"] {
  --bg: #0f172a;
  --text: #f1f5f9;
}
```

---

## Combinators

Combinators express relationships between selectors.

### Descendant combinator (space)

Matches all descendants, regardless of nesting depth:

```css
/* All paragraphs inside .content, at any depth */
.content p { max-width: 65ch; }

/* All links inside nav */
nav a { text-decoration: none; color: var(--nav-link); }
```

### Child combinator `>`

Matches only direct children:

```css
/* Only li elements that are direct children of ul */
ul > li { list-style: disc; }

/* Only direct children of .card */
.card > * { padding: 1rem; }
```

Use `>` instead of the descendant combinator when nesting matters — it is more precise and performs better in large DOMs.

### Adjacent sibling combinator `+`

Matches the element immediately after the specified element:

```css
/* h2 followed immediately by p — remove top margin */
h2 + p { margin-top: 0; }

/* First li after a heading inside a nav */
nav h3 + li { border-top: 1px solid var(--divider); }

/* Label immediately after an input */
input:checked + label { font-weight: bold; }
```

The `+` combinator is powerful for styling element relationships without adding wrapper classes. The checkbox toggle pattern uses it extensively.

### General sibling combinator `~`

Matches all elements after the specified element that share the same parent:

```css
/* All p elements after an h2, within the same parent */
h2 ~ p { color: var(--text-secondary); }

/* All list items after a checked checkbox */
input:checked ~ .dropdown-menu { display: block; }
```

---

## Pseudo-classes

Pseudo-classes target elements based on their state, position, or relationship to other elements.

### User interaction states

```css
a:hover { color: var(--link-hover); }
a:active { opacity: 0.7; }
a:visited { color: var(--link-visited); }
a:focus { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
a:focus-visible { /* Only shows on keyboard focus, not click */ }
```

Prefer `:focus-visible` over `:focus` for removing focus rings — it applies the ring only when navigating by keyboard, which preserves accessibility without the visually awkward ring on mouse clicks.

### Form states

```css
input:enabled { background: white; }
input:disabled { background: var(--gray-100); cursor: not-allowed; }
input:read-only { border-color: transparent; }
input:required { border-color: var(--red); }
input:optional { border-color: var(--gray-300); }
input:valid { border-color: var(--green); }
input:invalid { border-color: var(--red); }
input:placeholder-shown { /* input has placeholder text visible — value is empty */ }
input:checked { /* checkbox or radio is checked */ }
input:indeterminate { /* checkbox in indeterminate state */ }
```

```css
/* Style validation only after the user has interacted (not on fresh page load) */
input:not(:placeholder-shown):invalid {
  border-color: var(--red);
  background-image: url("data:image/svg+xml,...");
}
```

### Structural pseudo-classes

```css
/* First and last */
li:first-child { border-top: none; }
li:last-child { border-bottom: none; }

/* By position */
tr:nth-child(odd) { background: var(--stripe); }   /* zebra stripes */
tr:nth-child(even) { background: white; }
li:nth-child(3) { font-weight: bold; }              /* exactly the 3rd */
li:nth-child(3n) { /* every 3rd: 3, 6, 9, ... */ }
li:nth-child(3n+1) { /* every 3rd starting at 1: 1, 4, 7, ... */ }

/* First/last of a type within the parent */
h2:first-of-type { margin-top: 0; }
p:last-of-type { margin-bottom: 0; }

/* Only child */
.card:only-child { width: 100%; }

/* Negation */
li:not(:last-child) { border-bottom: 1px solid var(--divider); }
input:not([type="submit"]):not([type="reset"]) { /* all text-like inputs */ }

/* Empty */
.placeholder:empty::before { content: "No items yet."; color: var(--muted); }
```

### The `:is()` and `:where()` selectors

`:is()` matches any element that matches any selector in the list:

```css
/* Without :is() — repetitive */
h1 a, h2 a, h3 a, h4 a, h5 a, h6 a { text-decoration: none; }

/* With :is() — clean */
:is(h1, h2, h3, h4, h5, h6) a { text-decoration: none; }
```

`:where()` is identical but contributes zero specificity — useful for low-specificity base styles:

```css
/* These resets have 0 specificity — easy to override anywhere */
:where(h1, h2, h3, h4, h5, h6) { font-weight: 600; line-height: 1.2; }
```

---

## The `:has()` Parent Selector

`:has()` is one of the most significant additions to CSS in years. It selects an element *based on what it contains* — something that required JavaScript before.

```css
/* Card that contains an image — give it no padding on the image side */
.card:has(img) { padding: 0; }

/* Form that has any invalid input — show a warning */
form:has(:invalid) .form-error-summary { display: block; }

/* Figure that has a figcaption — add bottom padding for the caption */
figure:has(figcaption) { padding-bottom: 2rem; }

/* Label that wraps a checked checkbox */
label:has(input:checked) { font-weight: bold; color: var(--green); }

/* Section that has an h2 directly inside it */
section:has(> h2) { border-top: 2px solid var(--accent); }

/* Article without an image — apply a background colour instead */
article:not(:has(img)) { background: var(--surface-alt); }
```

`:has()` has broad browser support as of 2024. Check caniuse.com for specific versions if you need IE11 support (you do not need IE11 support — it is end of life).

---

## Pseudo-elements

Pseudo-elements target a specific part of an element's content or create generated content:

### `::before` and `::after`

Insert generated content before or after an element's content:

```css
/* Decorative bullet */
.feature-list li::before {
  content: "→ ";
  color: var(--accent);
}

/* External link indicator */
a[href^="http"]::after {
  content: " ↗";
  font-size: 0.75em;
}

/* Clearfix (modern CSS uses display: flow-root instead, but useful to know) */
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```

### `::placeholder`, `::selection`, `::marker`

```css
input::placeholder {
  color: var(--gray-400);
  font-style: italic;
}

/* Text selection highlight */
::selection {
  background: var(--accent);
  color: white;
}

/* List item marker (bullet or number) */
li::marker {
  color: var(--accent);
  font-size: 0.875em;
}
```

### `::first-line` and `::first-letter`

```css
/* Drop cap */
.article-intro::first-letter {
  float: left;
  font-size: 3.5rem;
  line-height: 0.8;
  margin: 0.1em 0.1em 0 0;
  font-weight: bold;
  color: var(--accent);
}

p::first-line {
  font-variant: small-caps;
}
```

---

## Specificity

When multiple selectors match the same element, the most specific one wins. Specificity is calculated as three numbers: (ID count, class/attribute/pseudo-class count, type/pseudo-element count).

| Selector | IDs | Classes | Types | Specificity |
|---|---|---|---|---|
| `p` | 0 | 0 | 1 | 0,0,1 |
| `.btn` | 0 | 1 | 0 | 0,1,0 |
| `p.intro` | 0 | 1 | 1 | 0,1,1 |
| `nav a:hover` | 0 | 1 | 2 | 0,1,2 |
| `#header` | 1 | 0 | 0 | 1,0,0 |
| `#header .nav a` | 1 | 1 | 1 | 1,1,1 |
| `style=""` | — | — | — | Inline (beats all) |
| `!important` | — | — | — | Beats inline |

Specificity is compared left to right. `0,1,0` beats `0,0,99` — any ID beats any number of classes.

**Practical rules:**
- Keep specificity flat. Avoid ID selectors in stylesheets. Avoid chaining more than 2–3 classes.
- If you are overriding with `!important`, you have a specificity problem. Fix the selector, not the override.
- `:is()` takes the specificity of its most specific argument. `:where()` always contributes zero.
- Inline styles beat all selectors except `!important`.

---

## Selector Performance

Modern browsers parse stylesheets once and build internal optimised structures. For most applications, selector performance is not a bottleneck. The cases where it matters:

- **Avoid deeply nested descendant selectors** on large DOMs — `.wrapper .container .content .article p.intro`. Three levels is the practical limit.
- **Avoid universal selectors in combination** — `* + *` forces the browser to check every element pair.
- **Attribute substring selectors are slower** — `[class*="icon"]` requires scanning every attribute on every element. Use a class directly.

The [CSS Selector Generator](/tools/css-selector-generator) generates efficient, unique selectors for any element on a page — useful when writing Playwright or Cypress tests, building scrapers, or working with dynamically generated content where you cannot modify the HTML.

---

## Real-World Patterns

### The lobotomised owl (Alex Sandoval's spacing pattern)

```css
/* Every element that follows any element gets top margin */
* + * { margin-top: 1rem; }

/* Scoped to a prose container */
.prose * + * { margin-top: 0.75em; }
```

Handles spacing between mixed content types (headings, paragraphs, lists, code blocks) without targeting each combination individually.

### Focus styles that do not break design

```css
/* Remove default ring on click, keep it for keyboard */
:focus:not(:focus-visible) { outline: none; }
:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 4px; }
```

### Quantity queries with `nth-child`

```css
/* Style the container differently based on how many children it has */
/* Exactly 1 item */
ul li:only-child { text-align: center; }

/* 4 or more items — switch to grid */
ul li:nth-child(4) ~ li,
ul li:nth-child(4) { /* parent has 4+ children */ }
```

### Dark mode via `:has()`

```css
/* Toggle dark mode by checking a hidden checkbox */
html:has(#dark-mode-toggle:checked) {
  --bg: #0f172a;
  --text: #f1f5f9;
}
```

Use the [CSS Selector Generator](/tools/css-selector-generator) to build and test complex selectors against real page structure without having to inspect the DOM manually.
