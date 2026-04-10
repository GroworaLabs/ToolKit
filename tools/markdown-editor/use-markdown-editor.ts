import { useState, useCallback, useMemo } from 'react';

// Minimal Markdown → HTML renderer (no external deps)
function render(md: string): string {
    let html = md
        // Escape HTML entities first
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Code blocks (must come before inline)
    html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) =>
        `<pre><code class="language-${lang}">${code.trim()}</code></pre>`
    );

    // Headings
    html = html.replace(/^######\s(.+)$/gm, '<h6>$1</h6>');
    html = html.replace(/^#####\s(.+)$/gm,  '<h5>$1</h5>');
    html = html.replace(/^####\s(.+)$/gm,   '<h4>$1</h4>');
    html = html.replace(/^###\s(.+)$/gm,    '<h3>$1</h3>');
    html = html.replace(/^##\s(.+)$/gm,     '<h2>$1</h2>');
    html = html.replace(/^#\s(.+)$/gm,      '<h1>$1</h1>');

    // Horizontal rule
    html = html.replace(/^---+$/gm, '<hr>');

    // Blockquote
    html = html.replace(/^>\s(.+)$/gm, '<blockquote>$1</blockquote>');

    // Unordered list
    html = html.replace(/^[-*]\s(.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');

    // Ordered list
    html = html.replace(/^\d+\.\s(.+)$/gm, '<oli>$1</oli>');
    html = html.replace(/(<oli>[\s\S]*?<\/oli>)/g, (m) =>
        '<ol>' + m.replace(/<oli>/g, '<li>').replace(/<\/oli>/g, '</li>') + '</ol>'
    );
    // Inline bold, italic, code
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g,    '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g,        '<em>$1</em>');
    html = html.replace(/_(.+?)_/g,          '<em>$1</em>');
    html = html.replace(/`([^`]+)`/g,        '<code>$1</code>');

    // Links and images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g,  '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Paragraphs: wrap non-tagged lines
    html = html.split('\n\n').map(block => {
        block = block.trim();
        if (!block) return '';
        if (/^<(h[1-6]|ul|ol|pre|blockquote|hr)/.test(block)) return block;
        return `<p>${block.replace(/\n/g, '<br>')}</p>`;
    }).join('\n');

    return html;
}

const DEFAULT_MD = `# Hello, Markdown!

Write **bold**, *italic*, or \`inline code\`.

## Features

- Live preview
- GitHub-flavored syntax
- Copy HTML output

## Code block

\`\`\`js
const greet = (name) => \`Hello, \${name}!\`;
\`\`\`

> Blockquotes work too.

[Visit ToolKit](https://www.webtoolkit.tech)
`;

export function useMarkdownEditor() {
    const [markdown, setMarkdown] = useState(DEFAULT_MD);
    const [view,     setView]     = useState<'split' | 'preview' | 'source'>('split');
    const [copied,   setCopied]   = useState(false);

    const html = useMemo(() => render(markdown), [markdown]);

    const copyHtml = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(html);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch { /* ignore */ }
    }, [html]);

    const clear = useCallback(() => setMarkdown(''), []);

    const wordCount = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;

    return { markdown, setMarkdown, html, view, setView, copyHtml, copied, clear, wordCount };
}