# ToolKit — project context for Claude

This file is the portable project context. It lives in git, so it follows the repo across machines. Keep it updated as work progresses (see **Maintenance** at the bottom).

---

## Product

ToolKit (**www.webtoolkit.tech**) — free browser-based utilities for developers and designers.

**Positioning (do not break):**
- 100% client-side — no data sent to a server, ever
- No accounts, no tracking by default
- Free forever
- Dev-focused tools (JSON, regex, Base64, hashes, encoders, converters, etc.)

Current scope: ~50 live tools across 5 categories (Security, Developer Tools, Text & Writing, Design, Value Converter), plus a small guides section.

## Stack

- Next.js (pages router) + TypeScript
- Plain CSS in `styles/globals.css` (CSS variables, no Tailwind runtime)
- Static generation for tool and guide pages
- Deployed on Vercel
- Tool widgets loaded via `dynamic(..., { ssr: false })` — the widget area is empty in the initial SSR HTML

Domain: apex `webtoolkit.tech` → 307 → `www.webtoolkit.tech`.

## Primary goal: monetization

The site was built for future monetization. Product decisions should be evaluated against traffic growth and revenue paths.

**Agreed strategy (ordered by viability for dev audience):**
1. Affiliate links inside guides (password managers, hosting, dev tools)
2. Sponsored tool listings in "related tools" — viable only after ~50k pageviews/month
3. Pro tier: bulk processing, API access, history, file operations — $5–10/mo, optional
4. AdSense / Mediavine on **guides only**, never on tool pages

**Anti-patterns — do not suggest:**
- Ads on tool pages (dev adblock rate is high, kills UX)
- Paywalled core tools (breaks the free positioning)
- Pop-ups, exit-intent modals
- Accounts required for basic usage
- Newsletter signup without a reason (OK only as "notify me when X launches")

## AdSense state

**Publisher ID:** `ca-pub-1948452989342011`
**Status:** Rejected 2× — latest 2026-04-07, dashboard status "Потребує уваги / Не знайдено" ("Requires attention / Not found").

**Root causes diagnosed 2026-04-14:**
1. `ads.txt` returned 404 — direct trigger for "Not found".
2. Thin content — ~50 tools vs 2 guides; tool pages are widget + FAQ.
3. Tool widgets are client-only (`ssr: false`) — reviewers see empty widget area.

**Do not re-submit AdSense immediately.** Google tracks repeated rejections. Deploy the technical fixes, wait 2–4 weeks, address content depth, then request review.

**Alternatives if AdSense fails a third time:** Ezoic, Mediavine Journey, affiliate-only (no ad-network approval).

## Consent / privacy plumbing

- `components/ui/CookieConsent.tsx` — GDPR banner, choice in `localStorage.tk_consent`. Exports `openCookiePreferences()` and `getConsent()`.
- `_app.tsx` — Google Analytics loads **only** when `consent.analytics === true`, with `anonymize_ip: true`.
- Custom event `tk:consent-changed` fires on decision; listen on it to gate ads/affiliate scripts when added.
- Reopen the banner from anywhere: `openCookiePreferences()` (already wired to "Cookie preferences" button in footer).

**When adding ads or affiliate scripts later:** gate them on `consent.marketing === true`, not just load them unconditionally.

## Foundation progress

Running status of the Month 1–2 foundation from the monetization roadmap. Update these lists as work completes.

### Done
- `2026-04-14` Terms of Service (`pages/terms.tsx`)
- `2026-04-14` Cookie Policy (`pages/cookies.tsx`)
- `2026-04-14` GDPR cookie consent banner + GA gated on consent
- `2026-04-14` Footer Legal column + "Cookie preferences" button
- `2026-04-14` Privacy Policy refreshed for consent-gated model
- `2026-04-14` `public/ads.txt` created (was 404 — direct cause of AdSense rejection)
- `2026-04-14` `google-adsense-account` meta tag in `_document.tsx`
- `2026-04-14` Sitemap expanded: `/guides`, `/contact`, all guide detail pages
- `2026-04-14` Mobile layout fixes on guide pages (overflowing tables, `min-width: 0` on grid children, site-wide `text-align: justify` with exceptions)
- `2026-04-14` Deployed to production; verified live: `ads.txt` returns 200, `google-adsense-account` meta tag present, sitemap lists 87 URLs including all guides
- `2026-04-14` Tool pages — content + FAQ now SSR-rendered. Dropped `{ ssr: false }` from `TOOL_CONTENT`; moved FAQ data into `getStaticProps` so `FaqSection` + FAQPage JSON-LD render at build time. Every tool page now ships ~500 words + ~8 Q&A + schema in initial HTML (was: one sentence + empty widget placeholder). Only the interactive widget itself stays client-only.

### Pending — blocks AdSense re-submission
- Google Search Console: verify ownership, submit sitemap, monitor indexing
- Write ≥10 more guides (600–800 words each)
- Author byline + E-E-A-T signals on guides (name, photo, bio, social links)
- Expand About page — founder story, expertise

### Pending — foundation (non-blocking)
- Privacy-friendly analytics (Plausible or Fathom) — cookieless, no consent friction
- Dynamic OG images via `@vercel/og`
- Email capture on soon-tools ("notify me when this launches")

### Deferred
- Favorites / Recent tools (localStorage)
- 404 page with search
- Keyboard shortcuts, dark mode, RSS for guides
- Comparison pages ("Best X 2026", "X vs Y")
- Wire ads/affiliate scripts behind `consent.marketing` (plumbing ready)

## Conventions

- No comments in code unless a hidden constraint or invariant needs explaining. Identifiers do the documenting.
- No backwards-compat shims for code that isn't public API. Just change it.
- Don't add mock tests for code that hits real logic — integration over mocks.
- Styling: inline `style={}` is fine for one-offs; CSS classes in `globals.css` for shared patterns.
- Tool registry: `lib/registry.ts`. Guides: `content/guides/*.md` + `lib/guides.ts`.

## Maintenance

**This file is a living document.** After completing a meaningful chunk of work, update the relevant section:
- Move items from **Pending** → **Done** with the date.
- If a decision recorded here was superseded, edit it in-place (do not leave stale guidance).
- Add new blockers under the correct Pending list as they emerge.
- Keep it concise — this file loads into context every session, so verbose history belongs in git log or memory, not here.

More detailed / personal context (that shouldn't be in git) lives in the local Claude memory at `~/.claude/projects/<project>/memory/`. That memory is machine-local and not synced.
