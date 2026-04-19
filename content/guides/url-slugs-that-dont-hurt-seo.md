---
title: "URL Slugs That Don't Hurt Your SEO: A Practical Guide"
description: "What a good URL slug looks like, why Google treats underscores differently from hyphens, and how to handle non-Latin characters without breaking shares."
category: "Developer Tools"
tools: ["text-to-slug"]
tags: ["seo", "urls", "slugs", "web-development", "content"]
publishedAt: "2026-04-19"
author: "olivia-bennett"
---

## What a Slug Is (and Why It Matters)

A **slug** is the human-readable part of a URL — the `/how-to-make-pasta` in `example.com/blog/how-to-make-pasta`. It identifies a piece of content in a way that's shareable, memorable, and (when done right) good for search rankings.

Slugs matter more than most devs think. Google's ranking guidelines explicitly call out URL clarity as a ranking signal. Users deciding whether to click a search result glance at the URL first. Social media unfurls show the full URL under the title. And inside a company, "send me the link to that post" is far nicer when the link contains actual words.

This guide covers what a good slug looks like, where the subtle rules come from, and how to handle edge cases — non-Latin characters, long titles, stale URLs — without creating SEO debt.

## The Rules, in Priority Order

**1. Lowercase only.** Some servers treat `/About` and `/about` as different URLs. Case-sensitivity is a footgun; sidestep it entirely.

**2. Hyphens, not underscores.** Google officially treats hyphens as word separators and underscores as word joiners. `blue-shoes` is indexed as "blue" and "shoes"; `blue_shoes` is indexed as the single word `blue_shoes`. This has been the rule since 2005 and hasn't changed.

**3. ASCII characters.** URLs can technically contain UTF-8, but the moment a social platform encodes them, you get `caf%C3%A9` in place of `café`. Transliterate to ASCII. `café → cafe`, `żyrafa → zyrafa`, `москва → moskva`.

**4. Short but descriptive.** Aim for three to five words. Any longer and the slug gets truncated in search snippets, social cards, and browser tabs. Include your primary keyword; drop stop words that don't carry meaning (`a`, `the`, `and`, `of`) unless removing them changes the meaning.

**5. No special characters.** Strip or replace `'`, `"`, `(`, `)`, `[`, `]`, `&`, `#`, `@`, `?`. Replace `&` with `and`; remove the rest.

**6. No trailing punctuation or dashes.** `/how-to-cook-pasta-` looks like a typo. Trim leading/trailing hyphens after generation.

You can apply all six rules in one pass with the [Text to Slug](/tools/text-to-slug) converter — paste any title, get a production-ready slug.

## The Underscore Myth Check

Every few years someone posts "actually underscores are fine now." Check the source. Google has updated nothing public on this. The 2005 advice from Matt Cutts ("use hyphens") has been re-confirmed in Search Central documentation and John Mueller's Q&A videos as recently as 2023.

Even if the algorithm has since become lenient, other systems haven't. Markdown auto-linking, terminal copy-paste detection, Slack link parsing — they all have small differences around underscores that hyphens don't trigger. Stick with hyphens.

## Handling Titles with Punctuation

Transformations that work for most title-to-slug conversions:

```
"How to Cook Pasta: A Guide"          → how-to-cook-pasta-a-guide
"5 Tips & Tricks for Faster Code"     → 5-tips-and-tricks-for-faster-code
"Can't Believe It's Not TypeScript!"  → cant-believe-its-not-typescript
"The A–Z of Rust (2026 Edition)"      → the-a-z-of-rust-2026-edition
"Café → Coffee Shop"                  → cafe-coffee-shop
"Back to Basics (Part I/II)"          → back-to-basics-part-i-ii
```

The consistent pattern: `&` becomes `and`, apostrophes are removed without replacement, em/en dashes become hyphens, parentheses are stripped, diacritics are flattened, and any sequence of non-alphanumeric characters collapses to a single hyphen.

## Non-Latin Languages

If your content is in Ukrainian, Arabic, Mandarin, or any non-Latin script, you have three choices:

**1. Transliterate.** `москва → moskva`, `北京 → beijing`, `القاهرة → al-qahira`. Most consumer-facing sites do this. Wikipedia, Medium, and Substack all transliterate non-Latin slugs by default.

**2. Keep the native script.** Browsers render `/москва` correctly. Percent-encoding happens on the wire, but URL bars show the decoded form. This is what Wikipedia does for its Russian and Chinese editions. SEO-wise it's fine; sharing through platforms that don't decode well is where it hurts.

**3. Use an opaque ID + slug.** `/articles/42-moskva-guide`. The ID guarantees uniqueness; the slug provides readability. This also solves the "what if two articles have the same title" problem.

For a site mixing multiple scripts, option 3 is usually the cleanest — no transliteration debates, no broken shares.

## Length and Keyword Placement

Search result snippets display about 60 characters of URL, including the domain. `https://yoursite.com/blog/` already eats 28. That leaves ~30 characters for the slug itself — roughly three to five words.

Longer slugs aren't penalised; they're just less useful. A 15-word slug in search results becomes `...yoursite.com/blog/how-to-build-a-complete-react-applicat...`, which helps no one.

Put your primary keyword early. `how-to-cook-pasta` is better than `our-complete-beginner-guide-to-how-to-cook-pasta`. Search engines weigh earlier tokens more.

## Stability: Don't Change Slugs

Once a slug is published and indexed, treat it as immutable. Every change costs you:

- Any external links to the old URL now 404.
- Google removes the old URL from its index, and the new one may take weeks to regain rank.
- Social shares of the old URL keep displaying your 404 page.

If you must rename — because the original slug has a typo, or the article's scope has expanded — issue a **301 Moved Permanently** redirect from the old URL to the new one. Search engines merge the old URL's authority into the new one over time. Keep the redirect forever; there's no safe time to remove it.

The 301-redirect rule is the single most important thing about slug hygiene. One project-wide find/replace that "cleans up old ugly URLs" can vaporise months of organic traffic overnight.

## When to Append an ID

Slugs alone can collide: two articles titled "Welcome Back" both slug to `welcome-back`. Common solutions:

- **`/blog/welcome-back`** — disallow duplicates at publish time. Forces author to pick a distinct title.
- **`/blog/welcome-back-2`** — auto-disambiguate with a counter. Simple, slightly ugly.
- **`/blog/42/welcome-back`** — ID-first, slug-as-description. Unique forever; works even if the author renames the post (the ID persists; the slug can change without redirect complexity).
- **`/blog/welcome-back-a7f3`** — short random suffix. A compromise; keeps the slug clean.

GitHub uses `/user/repo/issues/42` (numeric ID only — no slug). Stack Overflow uses `/questions/1234/why-is-this-broken` (ID + slug, slug ignored for routing). Medium uses `/the-slug-a1b2c3d4e5f6` (slug + hash).

The "ID + slug, slug is decoration" pattern is the most forgiving: stale slugs still resolve to the right content via the ID.

## Try It Now

Convert any title into a clean, SEO-friendly slug — with transliteration, stop-word removal, and configurable separator — using the [Text to Slug](/tools/text-to-slug) tool. Handy when migrating CMS content, drafting article URLs in advance, or bulk-renaming a blog archive.
