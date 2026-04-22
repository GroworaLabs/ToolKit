# ToolKit — tools roadmap

Prioritized plan for the ~57 `live: false` tools in `lib/registry.ts` plus a new **AI** category. Priority is driven by search volume, dev-audience relevance, monetization potential (affiliate/commercial intent), and whether the tool unblocks existing guides that currently link to 404 pages.

**Hard constraint:** every tool must run 100% client-side. No server-side inference, no API key handling on our backend.

Update this file as tools ship: move items from **Planned** → **Shipped** with the date, or delete them from the plan once live.

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
- `totp-generator` (Security) — **referenced by live guide** `totp-and-2fa-explained`, currently 404s
- `ip-cidr-calculator` (Developer Tools) — **referenced by live guide** `cidr-and-subnetting-explained`, currently 404s
- `bcrypt-generator` (not yet in registry) — **referenced by live guide** `bcrypt-vs-argon2-vs-scrypt`, currently 404s. Add to registry first.

**High-volume dev tools (strong SEO, low friction):**
- `jwt-generator` (Developer Tools) — pairs with existing jwt-decoder; high search volume
- `sql-formatter` (Developer Tools) — massive dev audience, commoditized but expected
- `gitignore-generator` (Developer Tools) — high SEO volume (gitignore.io competitor)
- `json-to-csv` (Developer Tools) — very common conversion need
- `color-contrast-checker` (Developer Tools) — strong a11y/WCAG keyword traffic
- `mock-data-generator` (Developer Tools) — devs use this constantly for testing

### Tier 2 — MEDIUM priority (solid SEO, ship after Tier 1)

**Dev / code tools:**
- `javascript-minifier`, `css-minifier`, `html-minifier` (Developer Tools) — popular triad, ship together
- `html-beautifier` (Developer Tools) — pairs with minifiers
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
- `length-converter`, `weight-converter`, `temperature-converter`, `area-converter`, `volume-converter`, `speed-converter`, `data-storage-converter`, `pressure-converter`, `frequency-converter`, `angle-converter`, `fuel-economy-converter`, `cooking-converter`, `roman-numeral-converter` (Value Converter) — decent SEO but low dev relevance; batch-ship as one sprint

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
