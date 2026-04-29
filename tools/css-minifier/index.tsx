import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What does the CSS minifier remove?',
    a: 'The minifier removes all CSS comments (/* ... */), collapses consecutive whitespace (spaces, tabs, newlines) to the minimum required, removes spaces around structural characters like { } : ; , > + ~, and eliminates trailing semicolons before closing braces. Property values, selector names, and quoted strings are preserved exactly.',
  },
  {
    q: 'What is the beautify mode?',
    a: 'Beautify mode does the opposite of minification — it takes compressed or single-line CSS and expands it with readable indentation and line breaks. Each rule block is indented two spaces, each property appears on its own line, and selector lists are separated onto individual lines. Useful when you receive minified CSS from a third party and need to read or edit it.',
  },
  {
    q: 'Does the minifier handle @media queries and nested rules?',
    a: 'Yes. The minifier processes all standard CSS including @media, @keyframes, @supports, and @layer blocks. The beautifier tracks brace depth so nested rules are indented correctly. Custom properties (CSS variables) and calc() expressions are passed through unchanged.',
  },
  {
    q: 'How much size reduction can I expect?',
    a: 'CSS minification typically saves 20–35% compared to developer-formatted source. Removing comments alone can save 5–15% in documentation-heavy files. The gains stack well with server compression: a 50 KB stylesheet minified to 33 KB and then Brotli-compressed might transfer as 8 KB.',
  },
  {
    q: 'Does it remove vendor prefixes or unused rules?',
    a: 'No. This is a safe, structure-preserving minifier — it only removes whitespace and comments. It does not analyse which rules are used in your HTML, and it does not strip -webkit-, -moz-, or other vendor prefixes. For unused CSS removal, use tools like PurgeCSS or the browser devtools Coverage panel.',
  },
  {
    q: 'Is my CSS sent to a server?',
    a: 'No. All processing runs entirely in your browser. Your stylesheets are never uploaded, transmitted, or stored anywhere. The tool works offline once the page is loaded.',
  },
  {
    q: 'Should I use this instead of a PostCSS or build tool?',
    a: 'For production projects, CSS minification belongs in your build pipeline: PostCSS with cssnano, Vite (built-in), or Webpack with css-minimizer-webpack-plugin. Use this tool for quick one-off minification, for CSS snippets outside your main project, or to check how much a file could save before setting up build integration.',
  },
  {
    q: 'Can it handle SCSS or Less?',
    a: 'No — this tool only processes standard CSS. SCSS and Less must be compiled to CSS first (using sass, lessc, or your build tool). The compiled .css output can then be minified here.',
  },
];

export const sidebarInfo = [
  { label: 'Modes',     value: 'Minify · Beautify' },
  { label: 'Removes',   value: 'Comments · whitespace' },
  { label: 'Supports',  value: '@media · @keyframes · variables' },
  { label: 'Privacy',   value: '100% local — no server' },
];
