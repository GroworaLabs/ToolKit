# ToolKit — how to add a new category

Adding a category touches eight files. If you skip any, the category will either not appear in the nav, 404 on the pillar page, or show a placeholder icon on tool cards. Follow this list in order.

**Prerequisite check before starting:**
- Do you already have ≥1 live tool that belongs in this category? If no — add the tool first with `live: true`. Categories with zero live tools are filtered out of the header nav by `getCategories()` in `lib/registry.ts` (it iterates live tools only), so the nav tab won't render and the pillar page will look empty.
- Is the category conceptually distinct from existing ones? If a tool fits in Developer Tools or Text & Writing, use those. New categories exist for real content surfaces, not taxonomy elegance.

---

## The eight touchpoints

### 1. `lib/types.ts` — add to the union

```ts
export type ToolCategory =
    | 'Security'
    | 'Text & Writing'
    | 'Developer Tools'
    | 'Design'
    | 'Value Converter'
    | 'AI'                  // ← new
    | '<YourCategory>';     // ← add here
```

The literal must match exactly what tools put in `category:` in the registry and what you use as `registryKey` in `lib/categories.ts`. TypeScript will surface any mismatches.

### 2. `lib/registry.ts` — register the URL

```ts
export const CATEGORY_SLUGS: Record<string, string> = {
  ...
  '<YourCategory>': '/tools/<url-slug>',
};
```

Convention: lowercase kebab-case URL slug. No leading/trailing slashes beyond `/tools/`.

### 3. `lib/categories.ts` — add the full `CategoryMeta`

Copy an existing entry (Security is a good template) and edit every field:

- `slug` — matches the URL segment (no `/tools/` prefix).
- `name` — display name, matches `ToolCategory` literal exactly.
- `registryKey` — same as `name`, consumed by `getByCategory()`.
- `seoTitle` — ≤70 chars, ends in `| ToolKit`.
- `seoH1` — display title on the pillar page.
- `seoDescription` — 150–160 chars, used as meta description.
- `intro` — 1–2 sentence hero paragraph, visible above the tools grid.
- `contentH2` + `contentBody` — first content section (≥3 paragraphs, ≥500 words total with tips/FAQ) so the page isn't flagged as thin content by AdSense.
- `tips` — exactly 4 tips, each `title` + `desc` (2–3 sentences).
- `faq` — minimum 5 Q&A pairs. These generate `FAQPage` JSON-LD automatically.
- `otherCategories` — list every **other** category (exclude self). You must also go back and add your new category to the `otherCategories` of every existing category — easy to forget, and it creates broken cross-linking.

### 4. `components/ui/Layout.tsx` — add icon + description

Two flat maps at the top of the file:

```ts
const CAT_ICONS: Record<string, React.ReactNode> = {
  ...
  '<YourCategory>': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* 16×16 SVG, currentColor, stroke-width 2, round caps/joins */}
    </svg>
  ),
};

const CAT_DESCS: Record<string, string> = {
  ...
  '<YourCategory>': 'Short 2–5 word hint shown under the name',
};
```

Missing icon → rendered placeholder (empty/fallback square) in the header dropdown and mobile menu. Missing desc → no sub-label under the name. Both silently degrade; tests won't catch it.

### 5. `pages/tools/<slug>/index.tsx` — create the pillar page stub

```ts
import type { GetStaticProps } from 'next';
import CategoryPage, { makeCategoryProps } from '@/components/ui/CategoryPage';

export const getStaticProps: GetStaticProps = () => makeCategoryProps('<url-slug>');
export default CategoryPage;
```

That's it. `CategoryPage` reads from `lib/categories.ts` by slug and renders the pillar page (hero + tools grid + content + tips + FAQ + other-categories block).

### 6. `pages/sitemap.xml.tsx` — add the pillar URL

```ts
{ url: '/tools/<url-slug>', priority: '0.9', changefreq: 'weekly', lastmod: today },
```

Without this, Google won't index the category pillar even though it renders.

### 7. Tool registry entries — make sure tools opt in

Each tool in `lib/registry.ts` has a `category:` field. Tools that should appear on the new pillar page must use the exact category literal. Forgetting this means the tool renders individually but never shows up in its own category.

### 8. Update `TOOLS_PLAN.md` and `CLAUDE.md`

- `TOOLS_PLAN.md`: document the rationale if the category is a new strategic bucket, and list its Tier 1–4 tools.
- `CLAUDE.md`: add a `Done` entry with the date when the category ships, naming the first tool (the reason the category was exposed in the first place).

---

## Verify end-to-end before merging

Load the dev server and walk through:
1. **Header nav** — hover "Categories" dropdown; the new category appears with its icon and description. Click — navigates to `/tools/<slug>`.
2. **Mobile menu** — same category + icon renders (different code path in Layout.tsx).
3. **Breadcrumb on tool detail** — open a tool in the new category; the middle crumb links to `/tools/<slug>` (not fallback `/tools`).
4. **Pillar page** — loads, shows hero / intro / tools grid / content / tips / FAQ / other-categories. No placeholder, no empty sections.
5. **Home page category cards** — on `/`, the category appears in the category grid (driven by `getByCategory()` via registry).
6. **Sitemap** — visit `/sitemap.xml`, confirm the new pillar URL appears.
7. **Type check** — `npm run type-check` passes clean. Any mismatch between `ToolCategory` union, `registryKey`, or `CATEGORY_SLUGS` key surfaces here.
8. **Other categories' "Explore other" blocks** — open each existing category page, verify the new one appears in its `otherCategories` list.

---

## Common mistakes

- **Forgot to add to existing `otherCategories`** — new category is a dead end, users can't cross-link into it from other category pages.
- **Icon missing** — silent fallback (blank placeholder), ships to production unnoticed.
- **Pillar page stub missing** — category link returns 404.
- **Category exposed before having live tools** — `getCategories()` filters to live-only, so the nav tab simply doesn't render and the pillar page shows an empty grid. **Rule: ship at least one `live: true` tool in the category before exposing.**
- **`registryKey` doesn't match `ToolCategory`** — tools don't appear under the category because `getByCategory()` compares strictly.
