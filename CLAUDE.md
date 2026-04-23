# ToolKit — project context for Claude

This file is the portable project context. It lives in git, so it follows the repo across machines. Keep it updated as work progresses (see **Maintenance** at the bottom).

**Companion plan:** [`TOOLS_PLAN.md`](./TOOLS_PLAN.md) — prioritized roadmap for all `live: false` tools + the new AI category. Read it before planning any new tool work.

**Categories guide:** [`CATEGORIES_GUIDE.md`](./CATEGORIES_GUIDE.md) — the 8-touchpoint algorithm for adding a new category (type union, CATEGORY_SLUGS, CategoryMeta, Layout icon + desc, pillar page stub, sitemap, tool opt-ins, plan/docs). Read this before introducing a new category — skipping any touchpoint means the category silently half-ships.

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
- `2026-04-19` 5 new guides published — bcrypt-vs-argon2-vs-scrypt, totp-and-2fa-explained, cidr-and-subnetting-explained, http-status-codes-that-matter, semver-explained. Each 900–1200 words, tight unique angles (OWASP 2024 params, RFC citations, cloud-specific gotchas, SemVer 0.x edge cases). Each links back to 1–2 existing tools. Guides total now 17 vs ~50 tools — closer to the 20+ target before AdSense re-submit. **Note:** bcrypt-generator, totp-generator, and ip-cidr-calculator are referenced but not yet live (`live: false` in registry) — will 404 until those tools ship.
- `2026-04-19` 5 more guides published (live-tool-linked only) — unix-timestamps-explained, css-units-explained, api-keys-generate-rotate-store, url-slugs-that-dont-hurt-seo, number-bases-explained. 900–1400 words each. All link only to tools with `live: true`: timestamp-converter, css-unit-converter, api-key-generator + random-token-generator + password-strength-checker, text-to-slug, number-base-converter. Guides total: **22** — hit the 20+ target for AdSense re-submit.
- `2026-04-19` 5 more guides + pagination on `/guides`. New guides: qr-codes-explained (Marcus, qr-code-generator), naming-conventions-compared (Olivia, case-converter), favicons-in-2026 (Olivia, favicon-generator), csv-parsing-pitfalls (Olivia, csv-to-json), text-diff-algorithms-explained (Olivia, text-diff) — all linked tools verified `live: true`. `/guides` now paginates at 9 per page with Prev/1/2/3/Next nav, ellipsis support for future growth, resets to page 1 on category change, smooth-scrolls to grid on page change. Guide count line now shows "· page X of Y". Full `ItemList` JSON-LD still lists all guides for SEO. Guides total: **27**.
- `2026-04-20` First comparison guide — best-password-managers-for-developers-2026 (Marcus). ~2000 words comparing Bitwarden / 1Password / Proton Pass / Dashlane / KeePassXC on dev-specific criteria (CLI, SSH agent, self-hosting, team features). Opinionated recommendations per use case. New `Reviews` category introduced (added `GuideCategory = ToolCategory | 'Reviews'` in `lib/types.ts` — ToolCategory stays pure). Category auto-appears as filter tab on `/guides`. Affiliate disclosure block at top of guide (no live affiliate links yet — added when partner programs signed). Links only to live tools: password-generator, password-strength-checker. Guides total: **28**.
- `2026-04-20` 2 more comparison guides — best-hosting-for-side-projects-2026 (Olivia, ~2400 words: Vercel / Netlify / Railway / Fly.io / Cloudflare / Render / Hetzner / DO) and bitwarden-vs-1password-2026 (Marcus, ~2200 words: deep 1:1 dive — CLI, SSH agent, self-hosting, team features, security architecture). Hosting guide has `tools: []` (no direct tool tie-in — sidebar auto-hides when empty per `pages/guides/[slug].tsx:172`). Both carry affiliate disclosure. Guides total: **30**, with 3 in the Reviews category.
- `2026-04-21` **AI category + Token Counter shipped** — new `'AI'` entry in `ToolCategory`. Token Counter upgraded into a tiktokenizer-style visualizer: real `js-tiktoken` BPE runs in browser for OpenAI models (GPT-5/4o/4o-mini/o1) with per-token colored visualization, ChatML chat mode for exact billed counts, linked hover between token and its ID, collapsible Token IDs and Compare-across-models panels. Claude/Gemini/DeepSeek fall back to honest empirical estimates (marked with `~`). Widget uses a new wide layout (`.tool-grid--wide` opt-in for `WIDE_TOOLS` set in `pages/tools/[slug].tsx`) — sidebar drops below widget to give tokenizer room to breathe, without touching the other ~50 tools. AI category now fully exposed in header nav per user override of the "2+ tools before exposing" rule: added `CATEGORY_SLUGS['AI'] = '/tools/ai'`, full `CategoryMeta` in `lib/categories.ts`, icon + desc in `Layout.tsx`, pillar stub at `pages/tools/ai/index.tsx`, sitemap entry, and cross-links from all other categories. Algorithm for future category additions captured in `CATEGORIES_GUIDE.md`.
- `2026-04-22` **AI API Cost Calculator shipped** (`ai-cost-calculator`, AI category — second AI tool, satisfies the original "2+ tools before exposing tab" rule retroactively). Per-call + monthly cost across all 10 models in `AI_MODELS`, sorted cheapest first with multiplier vs cheapest. Inputs: input/output tokens per call, calls per day, pricing mode (Standard / Prompt cache hit / Batch API 50% off). Six workload presets (chatbot, summarizer, RAG, codegen, batch, agent loop) seed realistic token + traffic shapes. `lib/ai-pricing.ts` extended with `ModelPricing` (input/output/cached/batch $/1M) and `computeCost(model, inTok, outTok, mode)` — reusable foundation for future AI tools. Wide layout via `WIDE_TOOLS`. Token Counter input-field special-token bug fixed in same release (`enc.encode(text, allowSpecial ? 'all' : [], [])` — third arg `disallowedSpecial: []` so literal `<|im_start|>` sequences tokenize as plain text in Plain mode instead of throwing); Token IDs panel scroll-loop fixed by tracking `hoverSource: 'viz' \| 'ids'` so hovering inside the IDs panel no longer hijacks its own scroll, and bidirectional hover→scroll now works (hover token → scrolls IDs panel, hover ID → scrolls viz panel).
- `2026-04-22` **Agent Rules Generator shipped** (`agent-rules-generator`, AI category — third AI tool). Form-based builder that emits `CLAUDE.md` (Claude Code), `AGENTS.md` (Codex/Aider/Goose de-facto standard), `.cursorrules` (Cursor), `.windsurfrules` (Windsurf/Codeium), and `.clinerules` (Cline VS Code ext) from a single source of truth. Five format chips adapt the file header; body sections (Stack / Run commands / Conventions / Architecture / Do / Don't / Never touch / Notes) are format-agnostic. Four starter presets fully populate the form: web app (Next.js + Drizzle + Clerk), CLI tool (Node + Commander), library/SDK (tsup + changesets), data/ML (Python + Polars + DuckDB + uv). Live markdown preview with line + char count, Copy to clipboard, Download as the right filename per format. Reuses existing `.tk-token-split` class for side-by-side form + sticky preview, `WIDE_TOOLS` layout so preview has room. New `IcoAgentRules` icon. 100% client-side; internal conventions and architecture never leave the browser.
- `2026-04-23` **4 live tools shipped to fix 404s from site scan** — `totp-generator` (Security, RFC 6238 TOTP via Web Crypto API, SHA-1/256/512, 6/8 digits, 30/60s period, live countdown), `ip-cidr-calculator` (Developer Tools, pure-JS IPv4 subnet math: network/broadcast/mask/wildcard/host range/binary breakdown), `length-converter` (Value Converter, 10 units: m/km/cm/mm/µm/mi/ft/in/yd/nmi), `data-storage-converter` (Value Converter, 12 units: both SI decimal and IEC binary, colour-coded). All 4 follow the standard 3-file pattern (component/index/content), have SSR content + 8 FAQ + new icons (IcoOtp, IcoNetwork, IcoLength, IcoHardDrive), and are wired into `pages/tools/[slug].tsx`.
- `2026-04-23` **6 Tier-1 Developer Tools shipped** — `jwt-generator` (HS256/384/512 via Web Crypto, 3-part coloured token display, RFC 7519 claims), `sql-formatter` (pure-JS tokeniser + formatter, UPPER/lower/preserve keyword case, 2-/4-space/tab indent), `gitignore-generator` (19 templates across 5 groups: Languages, Frameworks, Editors, OS, Tools — tag-chip selector, merge + download), `json-to-csv` (RFC 4180, nested object flattening, comma/semicolon/tab delimiter, header toggle, download), `color-contrast-checker` (WCAG 2.1 exact luminance formula, AA+AAA badges, live preview, CSS colour input, 5 presets), `mock-data-generator` (23 field types across 5 groups, 1–1000 rows, JSON/CSV export). All 6: 3-file pattern, 1500+ word SSR content, 8 FAQ, new icons (IcoJwtSign, IcoDatabase, IcoGitBranch, IcoTableArrow, IcoContrast, IcoPersonCard).
- `2026-04-23` **AI Model Comparison shipped** (`ai-model-comparison`, AI category — 4th AI tool). 19 models across 7 providers (OpenAI GPT-5/4o/o3/o4-mini, Anthropic Claude Opus/Sonnet/Haiku 4.x, Google Gemini 2.5 Pro/Flash/2.0 Flash, xAI Grok 3/mini, DeepSeek V3/R1, Meta Llama 4 Maverick/Scout, Mistral Large/Small). Filter chips (All / Frontier / Mid / Fast / Reasoning / Open Weights), sort by input price / output price / context / name, dual view (card grid + sortable table), select up to 3 models → sticky compare bar → side-by-side breakdown with ★ best highlights per metric. Capabilities tracked: vision, tool use, thinking/CoT, JSON mode, batch API, fine-tuning, open weights. `IcoModelCompare` icon. Wide layout via `WIDE_TOOLS`. 1500-word SSR content + 12 FAQ entries.

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
