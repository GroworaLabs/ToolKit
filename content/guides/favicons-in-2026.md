---
title: "Favicons in 2026: The Minimal Set That Actually Works"
description: "You don't need 40 PNG files anymore. Here's the three or four favicon files that cover every modern browser, phone, and PWA — and the HTML tags to reference them."
category: "Design"
tools: ["favicon-generator"]
tags: ["favicons", "web-design", "seo", "pwa"]
publishedAt: "2026-04-19"
author: "olivia-bennett"
---

## The Favicon Mess, and Why It Got Simpler

For roughly a decade, the internet's answer to "what favicons does my site need?" was to generate a folder containing 16×16, 32×32, 48×48, 96×96, 144×144, 152×152, 180×180, 192×192, 512×512 PNGs, a 16/32 multi-size ICO, a browserconfig.xml for Windows tiles, a Safari pinned-tab SVG, an Android manifest referencing every size — and fifteen `<link>` tags in every page head.

That list reflected a moment in the mid-2010s when every OS vendor wanted its own icon slot. Most of those slots are now obsolete. Windows tiles died with Windows 10 Mobile; Safari's pinned-tab feature was replaced by the standard SVG favicon; Chrome and Firefox now prefer scalable SVGs over discrete sizes.

The 2026 minimal set — enough to cover every current browser, mobile home screen, and PWA — is three files and four HTML tags.

## The Three (or Four) Files You Need

**1. `favicon.ico`** — a classic multi-size ICO file containing 16×16, 32×32, and 48×48 raster icons. This exists for legacy reasons: old versions of Internet Explorer, some RSS readers, and Windows bookmark thumbnails still go looking for a file literally named `favicon.ico` at your domain root, with no HTML link required.

**2. `favicon.svg`** — a single vector file. SVG favicons scale crisply to any size, handle high-DPI displays natively, and support dark-mode adaptation via `<style>` inside the SVG. Supported by every current browser.

**3. `apple-touch-icon.png`** — a 180×180 PNG. iOS uses this when a user adds your site to their home screen. Without it, Safari grabs a screenshot of your page, which always looks worse than a deliberate icon.

**4. `manifest.webmanifest`** (optional — include if you want PWA behaviour) — references larger PNGs (192×192 and 512×512) that Android uses for the home-screen icon and splash screen.

You can generate all four files, sized and formatted correctly, with the [Favicon Generator](/tools/favicon-generator) — upload a single source image and it produces the full set.

## The HTML to Reference Them

Put these in `<head>`:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

Browsers pick the best option they can handle. Modern Chrome and Firefox use the SVG. Safari uses the SVG on desktop and the `apple-touch-icon` on iOS home screen. Older browsers fall back to `/favicon.ico`.

## SVG Favicons with Dark Mode

An SVG favicon can adapt to the user's OS theme — so your dark logo stays readable in dark mode tabs without a second file.

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <style>
    path { fill: #000; }
    @media (prefers-color-scheme: dark) {
      path { fill: #fff; }
    }
  </style>
  <path d="M12 2L2 22h20L12 2z"/>
</svg>
```

Safari on macOS and Firefox respect this media query in favicons; Chrome still renders the default colour in tabs (it uses the SVG but doesn't re-evaluate the media query when the user's theme changes). For complete coverage, pick a monogram that reads on both light and dark backgrounds.

## What You Can Stop Shipping

If your current favicon setup has any of these, you can remove them without breaking any current browser or platform:

- `mstile-*.png` and `browserconfig.xml` — Windows 10/11 don't use Metro tiles anymore.
- `safari-pinned-tab.svg` and the `<link rel="mask-icon">` tag — Safari's pinned-tab feature has been deprecated since macOS Monterey; desktop Safari now uses the standard SVG favicon.
- `android-chrome-192x192.png` / `android-chrome-512x512.png` referenced directly from HTML — these should only be referenced from the manifest, not via `<link>` tags.
- 16-size PNGs (16, 32, 48, 64, 96, 128) — ICO file already contains the small sizes; SVG handles the rest.
- `theme-color` meta tag isn't strictly a favicon concern, but if you have one, it still matters for the browser UI chrome on Android and iOS.

A modern production site can comfortably ship four HTML tags in head, three or four small files, and call it done.

## Design for 16×16

Whatever your source logo looks like at 2000px, the most common place it will render is 16×16 — browser tabs with many sites open, bookmark lists, search results. That's an eight-character grid.

Two rules from painful experience:

**Use a simplified mark, not the full logo.** A multi-word wordmark at 16×16 is unreadable pixel soup. Extract a monogram (the first letter, a symbol, a geometric shape) and design for that. Many brands have a separate "favicon logo" alongside their wordmark — Google's "G", Medium's "M", Slack's hash.

**High contrast, minimal detail.** At 16×16 you have roughly 250 pixels to work with. Sub-pixel details vanish. Thin strokes blur. Gradients look like noise. Solid colours, 2–3 pixel strokes minimum, and bold geometric shapes survive the scale-down.

## Testing

Before shipping, test the favicon in these places:

- A browser tab on a high-DPI display (check sharpness).
- A browser tab on a standard-DPI display (check 16×16 legibility).
- Dark mode (if using a dark-adaptive SVG).
- Add to iOS home screen (check the apple-touch-icon).
- Add to Android home screen (check the manifest PNGs).
- Google search results (can take days/weeks to refresh; use Google's favicon rendering URL to preview).
- A bookmark folder (often uses 16×16).

## Common Mistakes

- **No apple-touch-icon.** iOS falls back to a screenshot of your homepage, which is always ugly.
- **Only PNG, no SVG.** Blurry on high-DPI tabs and in scaled browser views.
- **Huge ICO file.** `favicon.ico` should be a few KB, not 200 KB. Use an optimiser.
- **Placing the favicon at `/assets/favicon.ico` only.** Some clients still probe `/favicon.ico` at domain root without HTML hints; serve it there too.
- **Cache invalidation.** Browsers cache favicons aggressively. If you change the icon, some users will see the old one for days. Forcing a refresh via query string (`/favicon.svg?v=2`) helps.

## Try It Now

Generate the full minimal set — ICO, SVG, apple-touch-icon, and manifest-ready PNGs — from a single source image with the [Favicon Generator](/tools/favicon-generator). Great when setting up a new site or refreshing the icon on an existing one without wrestling with 40-file "favicon packages."
