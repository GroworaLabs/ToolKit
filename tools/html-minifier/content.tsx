export default function HtmlMinifierContent() {
  return (
    <div className="tool-content">
      <h2>HTML Minification and Beautification: A Developer's Guide</h2>
      <p>
        HTML minification is the process of removing characters from an HTML document that the browser does not need to parse and render it correctly — specifically comments, redundant whitespace, and unnecessary newlines. A template file with consistent four-space indentation, blank lines between sections, and inline documentation comments might be 40 KB; the minified equivalent is typically 30–35 KB. When combined with server-side Brotli compression, the same page might transfer as only 5–7 KB. Minification is a straightforward, zero-risk performance improvement for any HTML served over the internet.
      </p>

      <h3>What Gets Removed During Minification</h3>
      <p>
        A well-implemented HTML minifier applies three categories of transformation:
      </p>
      <ul>
        <li><strong>Comments stripped</strong> — <code>{'<!-- ... -->'}</code> blocks are removed entirely. Comments are ignored by browsers and search engines alike. They serve only the developer reading the source — and minified HTML is not meant to be read.</li>
        <li><strong>Whitespace collapsed</strong> — consecutive spaces, tabs, and newlines between tags are collapsed. The HTML specification defines most inter-element whitespace as insignificant for block-level elements. A <code>{'<div>'}</code> followed by four spaces and a newline before another <code>{'<div>'}</code> renders identically to two adjacent <code>{'<div>'}</code> tags.</li>
        <li><strong>Indentation removed</strong> — the two-space or four-space indentation that makes source readable is pure overhead for the browser. Removing it from a deeply-nested template can save 2–5% of file size on its own.</li>
      </ul>
      <p>
        What a safe minifier deliberately does <em>not</em> touch: attribute values, class names, IDs, data attributes, inline event handlers, URL paths, and all text content visible to users. The minifier works at the structural level, never at the semantic level.
      </p>

      <h3>Whitespace-Sensitive Elements</h3>
      <p>
        Not all HTML whitespace is insignificant. Three element types require their internal whitespace to be preserved exactly:
      </p>
      <ul>
        <li><code>{'<pre>'}</code> — preformatted text. Spaces, tabs, and newlines inside a <code>{'<pre>'}</code> block are rendered as-is. This is how code examples and ASCII art work. Collapsing whitespace inside <code>{'<pre>'}</code> would change the visual output.</li>
        <li><code>{'<textarea>'}</code> — the initial value of a text area includes all whitespace in the source. Minifying it would change the form field's default content.</li>
        <li><code>{'<script>'}</code> and <code>{'<style>'}</code> — while their internal whitespace is not rendered, the content is code, not markup. Whitespace inside JavaScript or CSS has semantic meaning (string literals, regex, multiline selectors). The HTML minifier passes these blocks through unchanged and defers their minification to language-specific tools.</li>
      </ul>

      <h3>Beautify Mode — Reformatting Compressed HTML</h3>
      <p>
        The beautifier reverses minification. It takes compressed or inconsistently indented HTML and reformats it with structured, depth-based indentation. Common use cases:
      </p>
      <ul>
        <li>Auditing HTML output from a CMS, server-side renderer, or third-party widget where the source is not human-readable</li>
        <li>Debugging layout issues in generated markup by making the nesting structure visible</li>
        <li>Reading email HTML templates, which are typically minified for deliverability</li>
        <li>Reviewing server responses when building a scraper or integration</li>
      </ul>
      <p>
        The beautifier distinguishes between block-level and inline elements. Block elements — <code>div</code>, <code>section</code>, <code>article</code>, <code>p</code>, <code>ul</code>, <code>li</code>, <code>table</code>, <code>tr</code>, <code>td</code>, all heading levels — each get their own line with depth-based indentation. Inline elements — <code>a</code>, <code>span</code>, <code>strong</code>, <code>em</code>, <code>code</code>, <code>img</code> — stay on the same line as adjacent content, because moving them to new lines would introduce visible whitespace into rendered text.
      </p>

      <h3>Block vs Inline Elements: Why It Matters</h3>
      <p>
        The distinction between block and inline elements is not just a layout concern — it affects how the HTML parser treats whitespace. Between two block elements, whitespace-only text nodes are ignored. Between two inline elements inside a paragraph, a single space is preserved and rendered as a word separator.
      </p>
      <p>
        Consider this fragment:
      </p>
      <pre><code>{`<p>
  Visit our <a href="/docs">documentation</a>
  for more details.
</p>`}</code></pre>
      <p>
        A naive minifier that collapses all inter-tag whitespace would produce <code>{'<p>Visit our<a href="/docs">documentation</a>for more details.</p>'}</code> — removing the spaces around the link text. A correct minifier collapses the newlines and indentation around the <code>{'<a>'}</code> to a single space, preserving the word boundaries: <code>{'<p>Visit our <a href="/docs">documentation</a> for more details.</p>'}</code>.
      </p>

      <h3>HTML Minification in Build Pipelines</h3>
      <p>
        For production projects, HTML minification should be automated, not manual:
      </p>
      <ul>
        <li><strong>Next.js</strong> — minifies HTML output automatically in production builds. The <code>swcMinify</code> option (default since Next.js 13) handles JS and CSS; HTML whitespace is collapsed by the React server renderer.</li>
        <li><strong>Vite + html-minifier-terser</strong> — the <code>vite-plugin-html</code> package wraps the popular <code>html-minifier-terser</code> library. Add it to your Vite config with options for comment removal, whitespace collapsing, and optional tag omission.</li>
        <li><strong>Webpack + html-minimizer-webpack-plugin</strong> — for Webpack projects, this plugin applies <code>html-minifier-terser</code> to HTML assets in production mode.</li>
        <li><strong>Astro</strong> — minifies HTML at build time by default in production. The output is already optimised when you run <code>astro build</code>.</li>
        <li><strong>Static site generators</strong> — Hugo, Eleventy, and Jekyll all have HTML minification plugins or built-in options. Hugo's <code>minify</code> config key handles HTML, CSS, JS, JSON, SVG, and XML in a single pass.</li>
      </ul>

      <h3>How Much Does HTML Minification Save?</h3>
      <p>
        Savings depend heavily on the source. Benchmarks on typical web pages:
      </p>
      <ul>
        <li>A Next.js page with moderate indentation: 8–12% reduction</li>
        <li>A template-heavy CMS page with verbose indentation: 15–25% reduction</li>
        <li>A heavily-commented HTML file with deep nesting: up to 35% reduction</li>
        <li>An already-minified file: 0–2% (nothing left to remove)</li>
      </ul>
      <p>
        The savings are most impactful for the initial HTML document, which is render-blocking. Every kilobyte removed from the HTML response directly improves Time to First Byte (TTFB) and Largest Contentful Paint (LCP) — two Core Web Vitals that affect Google search ranking.
      </p>

      <h3>Optional Tag Omission</h3>
      <p>
        The HTML5 specification allows certain closing tags to be omitted when the parser can unambiguously infer them. The most common examples: <code>{'</li>'}</code> before another <code>{'<li>'}</code>, <code>{'</p>'}</code> before a block element, <code>{'</td>'}</code> before another <code>{'</td>'}</code> or <code>{'</tr>'}</code>. Advanced minifiers like html-minifier-terser can remove these optional tags, saving additional bytes. This tool does not perform optional tag omission — it only removes comments and whitespace — which makes it safe for all HTML including edge cases where tag omission changes parse tree structure.
      </p>

      <h3>Attribute Optimisation</h3>
      <p>
        Some minifiers also optimise attributes: removing quotes from attribute values that do not require them (<code>class=nav</code> instead of <code>class="nav"</code>), collapsing boolean attributes (<code>disabled</code> instead of <code>disabled="disabled"</code>), and normalising case. This tool does not modify attributes. Attribute optimisation, while safe for most HTML, can break third-party scripts that query attributes by their quoted value, and is not worth the complexity for the marginal byte savings.
      </p>

      <h3>Minification vs Compression</h3>
      <p>
        Minification and server-side compression (GZIP or Brotli) are complementary and both should be applied. Minification removes redundant characters before the file is served; compression then encodes the resulting text more efficiently. Minified HTML has fewer unique byte sequences, which makes the compression algorithm's dictionary more effective.
      </p>
      <p>
        Typical results for a 40 KB HTML page:
      </p>
      <ul>
        <li>Original, uncompressed: 40 KB</li>
        <li>Minified only: ~32 KB (20% reduction)</li>
        <li>Original + Brotli: ~10 KB</li>
        <li>Minified + Brotli: ~7.5 KB (81% total reduction from original)</li>
      </ul>
      <p>
        Most CDNs and static hosts (Vercel, Netlify, Cloudflare Pages) serve Brotli-compressed responses automatically. Check the <code>Content-Encoding: br</code> header in the Network panel to confirm your HTML is being compressed in production.
      </p>
    </div>
  );
}
