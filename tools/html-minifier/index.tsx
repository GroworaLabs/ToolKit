import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What does the HTML minifier remove?',
    a: 'The minifier removes HTML comments (<!-- ... -->), collapses whitespace-only text nodes between block elements, and trims redundant newlines and indentation from inline text. Tag names, attribute names, attribute values, and all content inside <pre>, <textarea>, <script>, and <style> blocks are preserved exactly.',
  },
  {
    q: 'Is it safe to remove HTML comments?',
    a: 'For virtually all production HTML, yes. HTML comments are never rendered by the browser. The one historical exception — IE conditional comments (<!--[if lt IE 9]>) — is irrelevant for any browser released after 2016. The minifier removes all standard HTML comments unconditionally.',
  },
  {
    q: 'What is the beautify mode?',
    a: 'Beautify mode takes minified or poorly-indented HTML and reformats it with proper indentation. Block-level elements (div, section, p, ul, li, table, tr, td, h1–h6, etc.) each get their own line with depth-based two-space indentation. Inline elements (a, span, strong, em, img, code) stay on the same line as their surrounding content.',
  },
  {
    q: 'Does minification affect page rendering?',
    a: "No, when done correctly. The HTML parser treats whitespace-only text nodes between block elements as insignificant. Text content inside paragraphs and inline elements preserves a single space where runs of whitespace were collapsed. Content inside <pre> and <textarea> is always preserved exactly, since those elements are whitespace-sensitive by specification.",
  },
  {
    q: 'How much size reduction can I expect?',
    a: 'Typical HTML minification saves 5–20% depending on how much indentation and how many comments your source has. For heavily commented, deeply-indented templates, savings can reach 25–30%. The gains compound with server compression: a 30 KB page minified to 24 KB and Brotli-compressed might transfer as only 4–5 KB.',
  },
  {
    q: 'How does the tool handle <script> and <style> blocks?',
    a: 'The tokenizer recognises <script> and <style> as raw content blocks. In minify mode their content is passed through with only leading and trailing whitespace trimmed. For full minification of embedded JavaScript, run the script content through the JavaScript Minifier; for embedded CSS, use the CSS Minifier.',
  },
  {
    q: 'Is my HTML sent to a server?',
    a: 'No. All processing runs entirely in your browser. Your markup is never uploaded, transmitted, or stored anywhere. The tool works offline once the page is loaded.',
  },
  {
    q: 'Should I use this instead of a build tool?',
    a: 'For production Next.js, Nuxt, SvelteKit, or Astro projects, HTML minification is handled automatically at build time by the framework. Use this tool for one-off tasks: optimising a standalone static HTML file, reading compressed HTML received from a third party, checking how much a template could save, or learning what minification actually does to your markup.',
  },
];

export const sidebarInfo = [
  { label: 'Modes',     value: 'Minify · Beautify' },
  { label: 'Removes',   value: 'Comments · whitespace' },
  { label: 'Preserves', value: '<pre> · <script> · <style>' },
  { label: 'Privacy',   value: '100% local — no server' },
];