import {FaqItem} from "@/lib/types";


export const faq: FaqItem[] = [
    { q: 'What Markdown syntax is supported?', a: 'Headings (# to ######), bold (**text**), italic (*text*), inline code (`code`), code blocks (```), links, images, unordered lists (- item), ordered lists (1. item), blockquotes (> text), and horizontal rules (---).' },
    { q: 'Can I export the HTML?', a: 'Yes. Click "Copy HTML" to copy the rendered HTML to your clipboard, ready to paste into any website, CMS, or email template.' },
    { q: 'Is my content saved?', a: 'Content is not persisted between sessions. If you need to save your work, copy it before closing the browser tab.' },
    { q: 'What is Markdown used for?', a: 'Markdown is the standard writing format for README files, GitHub, documentation, blog posts (Ghost, Jekyll, Hugo), note-taking apps (Notion, Obsidian), and comment systems. It converts to clean HTML.' },
    { q: 'How do I create a table in Markdown?', a: 'Use pipes and hyphens: | Column 1 | Column 2 | on one line, then | --- | --- | to define the header separator, then data rows in the same format. Alignment is controlled by colons: |:---| left-aligns, |---:| right-aligns, |:---:| centers. Table support is a GFM (GitHub Flavored Markdown) extension, not part of the original spec.' },
    { q: 'What is the difference between Markdown flavors?', a: 'The original Markdown spec (2004) is minimal. CommonMark is the standardized, unambiguous version used by most modern tools. GitHub Flavored Markdown (GFM) adds tables, task lists, strikethrough, and auto-links. MultiMarkdown and Pandoc add footnotes, citations, and other academic features. This editor uses CommonMark-compatible rendering.' },
    { q: 'How do I add syntax highlighting to code blocks?', a: 'Use a fenced code block with the language name after the opening backticks: ```javascript on the first line. Supported language identifiers include javascript, typescript, python, bash, json, css, html, sql, rust, and many more. The renderer applies syntax highlighting automatically based on the language tag.' },
    { q: 'Can I use HTML inside Markdown?', a: 'Yes — most Markdown renderers allow inline HTML. You can use <div>, <span>, <br>, <details>, <summary>, and other tags directly in your Markdown. However, some platforms (like GitHub comments) strip unsafe HTML tags for security. For maximum compatibility, prefer Markdown syntax over raw HTML wherever possible.' },
];

export const cheatSheet = [
    { syntax: '# Heading',        output: 'H1–H6 headings'     },
    { syntax: '**bold**',         output: 'Bold text'           },
    { syntax: '*italic*',         output: 'Italic text'         },
    { syntax: '`code`',           output: 'Inline code'         },
    { syntax: '```\\nblock\\n```', output: 'Code block'          },
    { syntax: '- item',           output: 'Unordered list'      },
    { syntax: '1. item',          output: 'Ordered list'        },
    { syntax: '> quote',          output: 'Blockquote'          },
    { syntax: '[text](url)',       output: 'Link'                },
    { syntax: '![alt](url)',       output: 'Image'               },
    { syntax: '---',               output: 'Horizontal rule'    },
];