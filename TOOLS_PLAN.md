# ToolKit — tools roadmap

Prioritized plan for the ~57 `live: false` tools in `lib/registry.ts` plus a new **AI** category. Priority is driven by search volume, dev-audience relevance, monetization potential (affiliate/commercial intent), and whether the tool unblocks existing guides that currently link to 404 pages.

**Hard constraint:** every tool must run 100% client-side. No server-side inference, no API key handling on our backend.

---

## STRATEGIC TRACK — team call decisions 2026-05-12

These are structural/strategic items that must be resolved **before or alongside** new tool shipments. They are not tools — they are improvements to the platform itself.

### Phase A — Foundation (do in order)

**A1. Category revision** ← do first, before any code changes
Current categories are too coarse — "Developer Tools" is a catch-all with 20+ tools. Proposed new structure (finalize before implementing):

| New category | What moves there |
|---|---|
| Security & Crypto | hashes, passwords, JWT, TOTP, HMAC, bcrypt, AES |
| Code & Dev | formatters, minifiers, linters, generators (gitignore, nginx, robots.txt) |
| Network & Web | IP/CIDR, URL encoder/decoder, HTTP status codes, user-agent parser |
| Data & Format | JSON, CSV, XML, YAML, Base64, image-to-base64 |
| Text | slug, case converter, diff, markdown, lorem ipsum |
| Design & Media | colors, contrast, favicon — and future image/video/GIF tools |
| AI | already live |
| Converters | units, numbers, timestamps — or dissolve into relevant categories above |

Decision: finalize the category list as a separate doc/discussion, then implement.

**A2. Multi-category support** ← implement after A1 is decided
Change `category: ToolCategory` → `categories: ToolCategory[]` in `lib/registry.ts`. One is designated `primary` (for breadcrumbs, canonical URL, og tags). All listed categories receive the tool on their listing pages.

Rules to enforce:
- Maximum 2 categories per tool (avoid dilution)
- `categories[0]` = primary
- Update: registry schema, `getStaticProps` on category pages, sitemap, breadcrumbs, tool cards

**Known re-assignments to make when A2 ships:**
- `form-test-data-generator` → primary: `Developer Tools`, secondary: new `Testing` category (or `QA & Testing`). This tool is the seed for the Testing vertical — plan additional QA tools around it (test case manager, API response validator, regex test runner, etc.)

**A3. Internal linking** ← implement alongside A2 or as a small standalone sprint
Add `relatedGuides: string[]` to registry entries (mirrors existing `relatedTools`). Wire it into tool `content.tsx` pages as a "Related guides" inline link block — not just the sidebar. Google treats in-body links more heavily than navigation links.

Benefit: every tool page passes authority to guides; every guide already links back to tools. Creates a closed loop.

---

### Phase D — AdSense "Low value content" fix (2026-05-14 rejection)

**Priority: CRITICAL — do before any new tool shipments or category refactor.**

Google rejected the site for "Low value content" (3rd rejection, 2026-05-14). Root cause: 70 indexed tool pages with identical templated structure outnumber 30 editorial guides 2:1. AdSense reviewers see a utility site, not a content site.

**D1. Upgrade tool page content** ← highest impact
The root problem is that 70 tool pages share an identical structure (description → widget → FAQ×8). Even at 1500 words, AdSense reviewers flag this as templated. Fix: make each top-traffic tool page genuinely unique by replacing the generic FAQ with editorial H2 sections specific to that tool.

Priority: pick the 10–15 tool pages with the most GSC impressions and add:
- Real code examples (Node.js / Python / bash snippets showing the concept in code)
- "When to use X" vs "When not to use X" comparison
- Platform-specific notes (AWS / GitHub Actions / Docker variations)
- Step-by-step tutorial with the tool embedded in context
- A comparison table vs alternatives (if applicable)

This approach fixes AdSense AND improves SEO ranking simultaneously — Google reads H2 diversity as topical depth.

**D2. Apply to alternative ad networks NOW** ← parallel track, no AdSense dependency
- **Carbon Ads** — carbonads.com, dev-focused, single tasteful unit, no content review, ~$2–6 RPM.
- **Ethical Ads** — ethicalads.io, developer/tech audience (ReadTheDocs), GDPR-native, $2–4 RPM.

Apply to both this week. These can run on guides immediately and provide revenue while AdSense fix plays out.

**D3. Content sprint — guides to 60+ at 2000+ words average**
Current: 30 guides, ~1100 words average. Target: 60 guides, 2000+ words average.

Prioritize guide types that Google scores as high-value editorial content:
1. **"How to" tutorials** using the tool with code examples — e.g., "How to validate JWT tokens in Node.js", "How to format SQL queries for readability". These reference the tool but stand alone as editorial.
2. **Comparison/versus** — "X vs Y for developers", "When to use X over Y" — highest E-E-A-T signal.
3. **Explainer + reference combos** — combine theory (what is X) + reference table (here are all the values) + tutorial (here's how to do it). 2000–3000 words.
4. **Affiliate-linked reviews** — "Best X for developers 2026" with real affiliate links (Bitwarden, 1Password, Vercel, Railway). These have commercial intent and high RPM if affiliate converts.

**D4. Add a blog / developer updates section**
Route: `/blog` — a simple page list like `/guides` but for short-form posts (200–500 words). Content:
- Tool release notes ("We shipped JWT Generator — here's what it does and why")
- Developer tips ("5 ways to use the Token Counter")
- Behind-the-scenes ("How we built the SQL formatter in pure JS")

Benefit: shows Google an active editorial team producing original content — the opposite of auto-generated. 8–10 posts are enough to change the signal.

---

### Phase B — SEO cycle (ongoing, every 1–2 weeks)

Framework proven by cron-generator uplift (2026-05-11). Process:

1. Open GSC → filter by tool pages → sort by impressions → focus on **positions 10–60 with growing trend**
2. Update `seoTitle`, `seoDescription`, `keywords` in registry
3. Add 1–2 new H2 sections to `content.tsx` (comparison tables, platform-specific notes, how-to steps)
4. Expand or create the linked guide to 1200+ words with matching H2s
5. Log result in CLAUDE.md after 2–3 weeks of GSC data

Priority tiers for GSC work:
- **Positions 10–30, >100 impressions/week** = highest ROI (one nudge can hit page 1)
- **Positions 30–60, growing trend** = next in queue

---

### Phase C — New tool vertical: Image & Media

**C1. Image tools** ← ship after A1/A2, before video
All Canvas API — no heavy deps, consistent with 100% client-side promise.

Prioritized by dev relevance (not general audience):
1. `image-converter` — PNG/JPG/WebP/AVIF conversion + quality slider, size before/after. Dev use: web perf optimization.
2. `image-resizer` — resize by px or %, preserve aspect ratio, download. Dev use: thumbnails, avatars.
3. `svg-optimizer` — SVGO WASM in browser. Dev use: clean up exported SVGs from Figma/Illustrator.
4. `exif-viewer` + `exif-stripper` — view/remove EXIF metadata from images. Dev use: privacy, file size.
5. `image-to-base64` — already in Tier 2 list, promote here.

Category: `Design & Media` (post-revision). These tools naturally group with favicon-generator and color tools.

**C2. Video & GIF tools** ← defer, plan first
High strategic value: video processing = long session time = ideal for display ads (future Mediavine/AdSense). This is one of the strongest ad-revenue surfaces on the roadmap.

Deferred because:
- FFmpeg WASM = 30MB cold load — conflicts with fast/lightweight positioning
- Needs lazy loading strategy + loading UX (progress bar, cancel)
- Legal/privacy copy must be explicit ("video never leaves your browser")

When ready to plan: decide scope first (video→GIF only? trim? compress? format convert?). Start with the lightest path: `video-to-gif` using MediaRecorder API or a <2MB WASM slice — not full FFmpeg.

**Do not forget:** video tools = high time-on-page = the best surface for display ads when AdSense/Mediavine is live. Prioritize this vertical once the ad revenue channel is confirmed.

---

Update this file as tools ship: move items from **Planned** → **Shipped** with the date, or delete them from the plan once live.

---

## NEW tool: Form Test Data Generator

**Status: SHIPPED 2026-05-17**

**Slug:** `form-test-data-generator`
**Category:** Developer Tools (or future Testing subcategory)
**Template:** 7 — Constructor/Builder (see `TOOL_CONTENT_TEMPLATES.md`)
**Priority:** Tier 1 — ship soon, high differentiation, no direct competitor in free tools space

**Concept:** User constructs a form (add fields, set type + validation rules), tool generates a test data table with one row per test case category and one column per field.

**Field types to support:**
- Text (with optional min/max length, regex pattern)
- Email
- Password
- Number (integer / float, min / max)
- Phone
- URL
- Date / datetime
- Select (user enters comma-separated options)
- Textarea (long text)
- File (generates filename + MIME type test cases)
- Checkbox / boolean

**Generated test case categories per field:**
| Category | What it tests |
|---|---|
| Valid | Happy path — correct format, mid-range value |
| Invalid format | Wrong type, wrong pattern |
| Boundary min | Exact minimum value / length |
| Boundary max | Exact maximum value / length |
| Below min | min − 1 (or empty when min = 0) |
| Above max | max + 1 / max + 1 char |
| Empty / null | Blank string, null, whitespace-only |
| Special characters | `<>'"&\\/` — breaks naive escaping |
| XSS payload | `<script>alert(1)</script>`, `"><img onerror=...>` |
| SQL injection | `' OR 1=1--`, `; DROP TABLE users;` |
| Oversized | 10 000-character string |
| Unicode / emoji | `用户`, `😀`, RTL text, zero-width char |

**Export formats:** CSV, JSON, Markdown table, copy as plain text

**UX layout:** Wide layout (WIDE_TOOLS). Left: field builder (add field → name + type + rules). Right: live generated table. Export bar at bottom.

**Why it's different from mock-data-generator:** Mock data generates realistic rows (N rows × M fields). This generates test case categories (12 categories × M fields) — one row per scenario, not per record. Target user is a QA engineer or developer testing their own form, not someone seeding a database.

**SEO targets:** "form test data generator", "test data for forms", "form validation test cases", "generate test data for form fields", "QA form testing tool"

---

## NEW category: AI

Rationale: dev audience is flooded with LLM usage; tooling *around* prompts, tokens, and costs is in high demand and monetizable via affiliate links to API providers (Anthropic, OpenAI via OpenRouter, etc.). None of these require actual inference — all are metadata, math, or formatting on text the user pastes in.

Requires adding `'AI'` to `ToolCategory` in `lib/types.ts` (currently: Security / Text & Writing / Developer Tools / Design / Value Converter).

### Tier 1 — ship first
1. ~~**Token Counter**~~ — **shipped 2026-04-21** (see Shipped section below).
2. ~~**AI API Cost Calculator**~~ — **shipped 2026-04-22** (see Shipped section below).

### Tier 2 — ship after Tier 1 validates traffic
3. ~~**CLAUDE.md / .cursorrules / AGENTS.md Generator**~~ — **shipped 2026-04-22** (see Shipped section below).
4. **Prompt Template Builder** — `{{variable}}` interpolation + export as JSON/text. Useful for devs testing prompts.
5. **ChatGPT / Claude Export Cleaner** — paste exported JSON → clean Markdown transcript. Real search demand ("clean chatgpt export", "chatgpt json to markdown").
6. **Context Window Visualizer** — paste text, show "X / 200k tokens used" per model with visual bar.
7. **Prompt Diff** — two prompts side-by-side with highlighted differences. Specialized text-diff for prompt engineering A/B tests.

---

## Coming-soon tools (already in registry as `live: false`)

Prioritized by demand + strategic value. Each entry = slug, category, one-line rationale.

### Tier 1 — HIGH priority (ship these first)

**Unblocks existing guides / fixes current 404s from guide links:**
- ~~`totp-generator`~~ — **shipped 2026-04-23**
- ~~`ip-cidr-calculator`~~ — **shipped 2026-04-23**
- ~~`bcrypt-generator`~~ — **already live** (was incorrectly flagged as missing from registry)

**High-volume dev tools (strong SEO, low friction):**
- ~~`jwt-generator`~~ — **shipped 2026-04-23**
- ~~`sql-formatter`~~ — **shipped 2026-04-23**
- ~~`gitignore-generator`~~ — **shipped 2026-04-23**
- ~~`json-to-csv`~~ — **shipped 2026-04-23**
- ~~`color-contrast-checker`~~ — **shipped 2026-04-23**
- ~~`mock-data-generator`~~ — **shipped 2026-04-23**

### Tier 2 — MEDIUM priority (solid SEO, ship after Tier 1)

**Dev / code tools:**
- ~~`javascript-minifier`~~ — **shipped 2026-04-29**
- ~~`css-minifier`~~ — **shipped 2026-04-29** (includes beautify mode)
- `html-minifier` (Developer Tools) — next in the minifier trio
- `html-beautifier` (Developer Tools) — pairs with html-minifier
- `xml-to-json` (Developer Tools)
- `json-schema-generator` (Developer Tools)
- `markdown-to-html` (Developer Tools)
- `html-to-markdown` (Text & Writing)
- `svg-optimizer` (Developer Tools)
- `image-to-base64` (Developer Tools)
- `encryption-tool` (Security) — AES-256-GCM, complements existing hash tools
- `ssl-certificate-decoder` (Security)

**Converters with real dev/design use:**
- `pixel-rem-converter` (Value Converter) — frontend dev staple
- `currency-converter` (Value Converter) — very high search volume, but needs live rates (pick a free API or cache daily; static fallback OK)

### Tier 3 — LOWER priority (fillers, ship opportunistically)

**Reference lookups:**
- `user-agent-parser`, `mime-types`, `ascii-table`, `unicode-lookup` (Developer Tools)
- `csv-viewer`, `toml-to-json`, `robots-txt-generator`, `htaccess-generator`, `lorem-json` (Developer Tools)

**Text utilities:**
- `text-statistics`, `text-to-html`, `palindrome-checker`, `emoji-picker`, `number-to-words` (Text & Writing)

**Converters (moderate demand, low monetization):**
- ~~`length-converter`~~ — **shipped 2026-04-23**; ~~`data-storage-converter`~~ — **shipped 2026-04-23**; `weight-converter`, `temperature-converter`, `area-converter`, `volume-converter`, `speed-converter`, `pressure-converter`, `frequency-converter`, `angle-converter`, `fuel-economy-converter`, `cooking-converter`, `roman-numeral-converter` (Value Converter) — decent SEO but low dev relevance; batch-ship as one sprint

**Design:**
- `gradient-generator`, `box-shadow-generator` (Design) — popular but commoditized

### Tier 4 — LOWEST priority (fun/niche, low strategic value)

- `text-to-binary`, `superscript-converter`, `zalgo-generator`, `fancy-text-generator` (Text & Writing) — novelty, low dev relevance
- `color-name-finder` (Developer Tools) — niche

---

## Implementation notes

- Every new tool needs: widget + FAQ (≥8 Q&A) + SEO description (≥500 words in initial HTML, not `ssr: false`-gated). Pattern established during the 2026-04-14 SSR uplift.
- **Icon is mandatory.** Every new tool must have an icon mapped in `TOOL_ICONS` (`components/icons/index.tsx`) by its slug. Reuse an existing `Ico*` component if one fits, otherwise add a new 24×24 stroked SVG in the same visual style (stroke-width 2, round caps/joins, `currentColor`) and wire it into `TOOL_ICONS`. A missing entry falls back to an empty placeholder, which leaves a blank square on tool cards and in the header — not acceptable, including for `live: false` tools (they render on `/tools` and in the home grid).
- When a tool referenced by a live guide ships, update the guide's "Related tools" block and verify the link renders (no 404).
- If a tool requires a large client-side dependency (tiktoken WASM ~1–2 MB, SQL formatter, etc.), lazy-load the widget, not the whole page.
- For a **new category** (AI category was the first since launch): follow the 8-touchpoint algorithm in [`CATEGORIES_GUIDE.md`](./CATEGORIES_GUIDE.md). Skipping any step silently half-ships — the category shows up in some places and not others.
- Keep the "100% client-side, no data sent anywhere" promise visible on AI tool pages — it's a key differentiator vs online prompt tools that log everything.

---

## Shipped

- `2026-04-21` **Token Counter** (`token-counter`, AI category) — counts tokens across 10 major LLMs (GPT-5/4o/4o-mini/o1, Claude Opus/Sonnet/Haiku 4.x, Gemini 2.5 Pro/2.0 Flash, DeepSeek V3) with context-window % usage bar per model. Empirical per-tokenizer ratios with code/non-ASCII/word-length adjustments — ~±5% vs official tokenizers on English prose, wider on CJK/minified code. No external deps (pure JS). Model list + tokenizer routing lives in `lib/ai-pricing.ts` (reusable by AI Cost Calculator). AI category added to `ToolCategory` type but intentionally not exposed as a nav tab (no `CATEGORY_SLUGS` entry, no `lib/categories.ts` config) — waiting on Cost Calculator per "2+ tools before exposing tab" rule.
- `2026-04-22` **AI API Cost Calculator** (`ai-cost-calculator`, AI category) — per-call + monthly cost across all 10 models in `AI_MODELS`, sorted cheapest first with multiplier vs cheapest. Inputs: input tokens / call, output tokens / call, calls per day, pricing mode (Standard / Prompt cache hit / Batch API 50%-off). Six workload presets (chatbot, summarizer, RAG, codegen, batch, agent loop). `lib/ai-pricing.ts` extended with `ModelPricing` (input/output/cached/batch $/1M) and `computeCost(model, inTok, outTok, mode)` helper — reusable by future AI tools. Wide layout (`WIDE_TOOLS`) for the comparison table. WIDE layout, no custom sidebar (consistent with Token Counter). 100% client-side; pricing is a static snapshot dated `PRICING_UPDATED`.
- `2026-04-22` **Agent Rules Generator** (`agent-rules-generator`, AI category) — form-based builder that emits `CLAUDE.md`, `AGENTS.md`, `.cursorrules`, `.windsurfrules`, and `.clinerules` from a single source of truth. Five format chips (one per target tool) adapt the file header; body sections (Stack / Run commands / Conventions / Architecture / Do / Don't / Never touch / Notes) are format-agnostic. Four starter presets: web app (Next.js + Drizzle + Clerk), CLI tool (Node + Commander), library/SDK (tsup + changesets), data/ML (Python + Polars + DuckDB + uv). Live markdown preview with line + char count, Copy to clipboard, Download with the right filename per format. Uses existing `.tk-token-split` class for side-by-side form + preview, `WIDE_TOOLS` layout so the preview has room. 100% client-side.
- **Live tools confirmed in registry (not previously logged):** `bcrypt-generator` (Security), `keyboard-layout-converter` (Developer Tools), `energy-converter`, `time-converter`, `power-converter`, `torque-converter`, `pace-converter`, `bitrate-converter` (Value Converter), `color-converter` (Design), `nginx-redirect-generator` (Developer Tools), `semver-comparator` (Developer Tools), `json-to-yaml` (Developer Tools), `http-status-codes` (Developer Tools), `html-entities` (Developer Tools), `random-text-generator` (Text & Writing), `reading-time-calculator` (Text & Writing).
