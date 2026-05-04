import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What does the HTML beautifier do?',
    a: 'The beautifier parses HTML and reformats it with consistent depth-based indentation. Block-level elements (div, section, article, p, ul, li, table, tr, td, h1–h6, head, body, etc.) each appear on their own line, indented by their nesting depth. Inline elements (a, span, strong, em, img, code) stay on the same line as adjacent content to avoid introducing visible whitespace into rendered text.',
  },
  {
    q: 'When would I need to beautify HTML?',
    a: 'Common scenarios: reading minified HTML from a CMS, email template, or API response; debugging a layout issue where the nesting structure is unclear; auditing HTML output from a server-side renderer or third-party widget; reviewing scraped content; understanding an inherited codebase where templates were committed without formatting.',
  },
  {
    q: 'What indent style should I choose?',
    a: 'Two spaces is the most common convention for HTML (used by Prettier\'s default HTML formatter, Google\'s HTML style guide, and most web frameworks). Four spaces is common in teams that use four-space indentation throughout their codebase. Tabs are preferred by developers who use variable-width tab display and rely on editor tab-width settings to control visual indentation.',
  },
  {
    q: 'How does the beautifier handle <script> and <style> blocks?',
    a: 'Script and style content is treated as raw text. The beautifier indents each non-empty line of script/style content to the current depth, which gives a rough structural alignment. For full JavaScript or CSS formatting, copy the content of those blocks into the JavaScript Minifier (beautify mode) or CSS Minifier (beautify mode).',
  },
  {
    q: 'Does it handle inline elements correctly?',
    a: 'Yes. Inline elements — a, span, strong, em, b, i, u, s, code, kbd, samp, small, sub, sup, abbr, cite, q, mark, time, var, label, button, img, input, select, textarea — stay inline with their surrounding text. Moving them to new lines would introduce visible whitespace between words in the rendered page.',
  },
  {
    q: 'Does the beautifier validate or fix broken HTML?',
    a: 'No. The beautifier reformats what it receives without correcting structural errors. Unclosed tags, mismatched tags, and invalid nesting are passed through as-is. For HTML validation, use the W3C Markup Validation Service (validator.w3.org) or the HTML validation built into browser DevTools.',
  },
  {
    q: 'Can I use this on HTML email templates?',
    a: 'Yes. Email clients often send minified HTML. Pasting it into this tool will reformat it so you can read the structure, identify problematic elements, or adapt the layout. Note that email HTML often uses table-based layouts with inline styles — the beautifier handles these correctly.',
  },
  {
    q: 'Is my HTML sent to a server?',
    a: 'No. All processing runs entirely in your browser using a pure JavaScript tokenizer. Your markup is never uploaded, transmitted, or stored anywhere. The tool works offline once the page is loaded.',
  },
];

export const sidebarInfo = [
  { label: 'Indent',    value: '2 spaces · 4 spaces · Tab' },
  { label: 'Block tags', value: 'New line + indent' },
  { label: 'Inline tags', value: 'Stay in-line' },
  { label: 'Privacy',   value: '100% local — no server' },
];