---
title: "Markdown Cheat Sheet: Everything You Need in One Page"
description: "Every Markdown element you'll actually use, with copy-paste examples — headings, lists, links, tables, code blocks, and the GitHub-flavoured extensions."
category: "Text & Writing"
tools: ["markdown-editor"]
tags: ["markdown", "writing", "documentation", "cheat sheet"]
publishedAt: "2026-04-14"
author: "olivia-bennett"
---

## Why Markdown Stuck

Markdown succeeded because it reads like plain text. A document full of asterisks, hashes, and backticks is still legible without a renderer — which is why README files, documentation sites, chat platforms, and note-taking apps all converged on it. Learn the core syntax once and you can write comfortable docs anywhere.

This cheat sheet covers the CommonMark baseline plus the GitHub-flavoured extensions that show up on most platforms. Try any of it live in the [Markdown Editor](/tools/markdown-editor) — edit on one side, preview on the other.

## Headings

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

Use one `#` per level. A document should have exactly one `#` (the title) and progress downward from there. Skipping levels (H2 directly to H4) still renders but breaks accessibility and SEO.

## Emphasis

```markdown
*italic* or _italic_
**bold** or __bold__
***bold italic***
~~strikethrough~~
```

Underscores work like asterisks but don't split inside words: `snake_case_variable` renders literally, while `*italic inside a word*` does not.

## Lists

Unordered:

```markdown
- Item one
- Item two
  - Nested item (indent with two spaces)
- Item three
```

Ordered:

```markdown
1. First
2. Second
3. Third
```

The numbers don't have to be sequential — Markdown renumbers them. `1. 1. 1.` still renders as 1, 2, 3. Useful when you insert a new item and don't want to renumber everything.

Task lists (GitHub-flavoured):

```markdown
- [x] Completed
- [ ] Pending
```

## Links and Images

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Hover text")
![Alt text](/path/to/image.png)
```

Reference-style links keep the URLs out of the prose — useful in long documents:

```markdown
See the [official docs][md-spec] for the full specification.

[md-spec]: https://spec.commonmark.org/
```

Always write meaningful alt text on images. `![screenshot](image.png)` is useless to a screen reader and hurts SEO.

## Code

Inline code uses single backticks:

```markdown
Use `npm install` to add a dependency.
```

Code blocks use triple backticks. Add a language hint so syntax highlighting works:

````markdown
```javascript
function hello(name) {
  return `Hello, ${name}!`;
}
```
````

Common language hints: `javascript`, `typescript`, `python`, `bash`, `shell`, `json`, `yaml`, `sql`, `html`, `css`, `markdown`, `diff`, `go`, `rust`.

## Blockquotes

```markdown
> A single-paragraph quote.
>
> A second paragraph inside the same quote block.

> > Nested quote — quoting a quote.
```

## Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|---------:|:--------:|
| Left     |    Right |  Center  |
| Row two  |     3.14 |   OK     |
```

Alignment is controlled by colons in the separator row:

- `|---|` — default (left)
- `|---:|` — right
- `|:---:|` — center
- `|:---|` — explicit left

Tables don't have to be aligned in the source — the pipes only need to match column count. Use a formatter in your editor to keep them readable.

## Horizontal Rule

```markdown
---
```

Three or more hyphens, asterisks, or underscores on their own line. Most editors default to `---`.

## Escape Characters

A backslash escapes any Markdown syntax character. Useful when you need a literal asterisk, bracket, or hash in prose:

```markdown
\*not italic\*
\[not a link\]
\# not a heading
```

Characters you can escape: `\` `` ` `` `*` `_` `{` `}` `[` `]` `(` `)` `#` `+` `-` `.` `!` `|`.

## GitHub-Flavoured Extensions

Everything above is CommonMark — portable across every renderer. The following are GitHub-flavoured Markdown (GFM), supported on GitHub, GitLab, Bitbucket, and most documentation platforms:

- **Task lists** — `- [x]` / `- [ ]`
- **Tables** — as above
- **Strikethrough** — `~~text~~`
- **Autolinks** — bare URLs like `https://example.com` auto-link
- **Footnotes** — `Some text[^1]` with `[^1]: footnote content` elsewhere
- **Emoji shortcodes** — `:rocket:` becomes 🚀 (platform-dependent)

## Frontmatter (for Static Site Generators)

Most static site generators (Hugo, Jekyll, Next.js content files, Astro) read a YAML frontmatter block at the top:

```markdown
---
title: "My Post"
date: 2026-04-14
tags: [markdown, writing]
---

Post body in Markdown starts here.
```

Frontmatter is not part of Markdown itself, but because it's so widely adopted you'll meet it almost immediately when publishing content.

## Common Pitfalls

**Line breaks.** A single newline in the source doesn't create a line break in the output — you need either a blank line (new paragraph) or two trailing spaces on the line (forced break). Most editors hide trailing spaces, so the blank-line style is more reliable.

**Unexpected HTML.** Markdown passes raw HTML through. `<div>` tags render; `<script>` tags are stripped on most platforms for security. If your text contains `<` or `>` that should render as-is, write `&lt;` and `&gt;`.

**Hard-wrapped prose.** Wrapping long paragraphs at 80 characters in the source is fine — Markdown collapses single newlines into spaces. But don't wrap inside a table cell or a code block; those respect the source literally.

## Try It Now

Open the [Markdown Editor](/tools/markdown-editor) to edit Markdown on one side and see the rendered output on the other. Paste any Markdown file into it to visualise how tables, code blocks, and links will render before you commit.
