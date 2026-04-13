import fs   from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { GuideMeta, GuideWithContent } from './types';

const GUIDES_DIR = path.join(process.cwd(), 'content', 'guides');

/* ── Read all guide frontmatter (no content) ────────── */
export function getAllGuides(): GuideMeta[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];

  return fs
    .readdirSync(GUIDES_DIR)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const slug    = filename.replace(/\.md$/, '');
      const raw     = fs.readFileSync(path.join(GUIDES_DIR, filename), 'utf8');
      const { data } = matter(raw);
      return {
        slug,
        title:       data.title       ?? '',
        description: data.description ?? '',
        category:    data.category    ?? 'Developer Tools',
        tools:       data.tools       ?? [],
        tags:        data.tags        ?? [],
        publishedAt: data.publishedAt ?? '',
      } satisfies GuideMeta;
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/* ── Read one guide with rendered HTML content ──────── */
export function getGuideBySlug(slug: string): GuideWithContent | null {
  const filePath = path.join(GUIDES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw              = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const contentHtml      = marked(content) as string;

  return {
    slug,
    title:       data.title       ?? '',
    description: data.description ?? '',
    category:    data.category    ?? 'Developer Tools',
    tools:       data.tools       ?? [],
    tags:        data.tags        ?? [],
    publishedAt: data.publishedAt ?? '',
    contentHtml,
  };
}

/* ── All guide slugs (for getStaticPaths) ───────────── */
export function getGuideSlugs(): string[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''));
}

/* ── Guides related to a specific tool slug ─────────── */
export function getGuidesByTool(toolSlug: string): GuideMeta[] {
  return getAllGuides().filter(g => g.tools.includes(toolSlug));
}

/* ── Guides by category ─────────────────────────────── */
export function getGuidesByCategory(category: string): GuideMeta[] {
  return getAllGuides().filter(g => g.category === category);
}
