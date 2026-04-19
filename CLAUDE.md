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
- `2026-04-14` 10 new guides published — jwt-tokens-explained, regex-cheat-sheet, uuid-vs-ulid-vs-nanoid, json-vs-yaml, sha-256-vs-md5, cron-expressions-explained, url-encoding-explained, hmac-vs-hash, markdown-cheat-sheet, color-models-explained. All 750–1100 words, each links back to 1–3 existing tools (drives "Related guides" sidebar). Guides total now 12 vs ~50 tools.
- `2026-04-14` Dark theme — site-wide toggle (system/light/dark). `html.dark` palette override in `styles/globals.css`; inline FOUC script in `_document.tsx` reads `localStorage.tk_theme` + `prefers-color-scheme` before hydration; `components/ui/ThemeToggle.tsx` sun/moon/system button in header cycles the three states. New shared CSS vars `--header-bg`, `--surface`, `--ink-hover`, `--blue-deep` replaced hardcoded colors in header bg and guide-prose anchors. `color-scheme: light|dark` set so native UI themes too. Deferred: sweep remaining inline hardcoded colors in per-tool widgets as they surface. Deployed to production.
- `2026-04-15` Custom 404 page (`pages/404.tsx`) with in-page search across tools, presets, and guides. Seeds query from attempted URL path (e.g. `/jsn-formatter` → pre-fills `jsn formatter`). Empty-query state shows popular tools grid + nav links to home/tools/guides.
- `2026-04-18` Google Search Console connected — ownership verified, sitemap submitted, indexing being monitored.
- `2026-04-18` Author byline + E-E-A-T on guides — `lib/authors.ts` holds two author profiles (Marcus Chen — security; Olivia Bennett — dev tools); each guide frontmatter carries `author:` id; `pages/guides/[slug].tsx` renders avatar + name + title + bio below the description; `Article` JSON-LD extended with `author: Person` (name, jobTitle, description, image). Photos live at `public/authors/{id}.jpg`.
- `2026-04-18` About page expanded — added "Why we built it" (origin story, trust stance), "Editorial standards" (how tools are built, how guides are written, corrections policy), "Get in touch". Removed stale "What's coming next" section (named QR/timestamp/text-diff/color-converter as upcoming — all live by now). Meta description rewritten. No People/team section (deliberate — consistent with author personas on guides).
- `2026-04-19` 5 new guides published — bcrypt-vs-argon2-vs-scrypt, totp-and-2fa-explained, cidr-and-subnetting-explained, http-status-codes-that-matter, semver-explained. Each 900–1200 words, tight unique angles (OWASP 2024 params, RFC citations, cloud-specific gotchas, SemVer 0.x edge cases). Each links back to 1–2 existing tools. Guides total now 17 vs ~50 tools — closer to the 20+ target before AdSense re-submit.

### Pending — blocks AdSense re-submission
_(all foundation blockers cleared; after 2–4 week cool-down from last rejection 2026-04-07, eligible to re-submit ~2026-05-05)_

### Pending — HIGH priority (do before AdSense re-submit)
_Focus: fix "thin content" rejection reason + build affiliate-ready surfaces._
- Publish more guides — target 20+ total before re-submit (currently 12 vs ~50 tools). Each guide should link to 1–3 tools and, where natural, 1–2 affiliate-ready products.
- Comparison pages ("Best password managers 2026", "Bitwarden vs 1Password", "X vs Y") — highest affiliate ROI for dev audience; targets commercial-intent keywords.

### Pending — MEDIUM priority (after AdSense approval)
- Dynamic OG images via `@vercel/og` — better CTR on social/Slack/Discord shares, ~1 day of work.
- Wire ads/affiliate scripts behind `consent.marketing` — plumbing ready; activate when first affiliate links ship in guides.

### Pending — LOW priority (nice to have, no direct monetization impact)
- Favorites / Recent tools (localStorage) — retention, not acquisition.
- Email capture on soon-tools ("notify me when this launches") — useful for launch pings once there's a list to notify.
- RSS for guides — dev audience appreciates it, but traffic contribution is minimal.

### Deferred / skip for now
- Privacy-friendly analytics (Plausible or Fathom) — GA4 already consent-gated and working; $9–14/mo with no direct ROI at current traffic. Revisit if >40% opt out of consent, or if cookie banner is removed entirely.
- Keyboard shortcuts — power-user polish, no monetization impact.

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
