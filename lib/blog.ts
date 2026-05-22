import fs   from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { BlogPost, BlogPostWithContent } from './types';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const slug    = filename.replace(/\.md$/, '');
      const raw     = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8');
      const { data } = matter(raw);
      return {
        slug,
        title:       data.title       ?? '',
        description: data.description ?? '',
        tags:        data.tags        ?? [],
        publishedAt: data.publishedAt ?? '',
        author:      data.author      ?? 'olivia-bennett',
        tools:       data.tools       ?? [],
      } satisfies BlogPost;
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getBlogPostBySlug(slug: string): BlogPostWithContent | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw               = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const contentHtml       = marked(content) as string;

  return {
    slug,
    title:       data.title       ?? '',
    description: data.description ?? '',
    tags:        data.tags        ?? [],
    publishedAt: data.publishedAt ?? '',
    author:      data.author      ?? 'olivia-bennett',
    tools:       data.tools       ?? [],
    contentHtml,
  };
}

export function getPostsByTool(toolSlug: string): BlogPost[] {
  return getAllBlogPosts().filter(p => p.tools.includes(toolSlug));
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''));
}
