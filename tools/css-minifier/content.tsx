export default function CssMinifierContent() {
  return (
    <div className="tool-content">
      <h2>CSS Minification and Beautification: A Practical Guide</h2>
      <p>
        CSS minification removes characters from a stylesheet that the browser does not need to parse and apply the rules correctly — comments, whitespace, and redundant semicolons. A developer-formatted stylesheet with consistent indentation, spacing, and documentation might be 50 KB; the minified equivalent is typically 32–38 KB. When combined with server-side Brotli compression, the same stylesheet might transfer as only 7–9 KB. Minification is a zero-risk, no-code performance improvement that every production website should apply.
      </p>

      <h3>What Gets Removed During Minification</h3>
      <p>
        A CSS minifier applies the following transformations:
      </p>
      <ul>
        <li><strong>Comments stripped</strong> — <code>{'/* ... */'}</code> blocks are removed entirely. This includes section dividers, documentation comments, and TODO notes. Comment content is never rendered and the browser ignores it completely.</li>
        <li><strong>Whitespace collapsed</strong> — spaces, tabs, and newlines around structural characters (<code>{'{'}</code>, <code>{'}'}</code>, <code>:</code>, <code>;</code>, <code>,</code>, <code>{'>'}</code>, <code>+</code>, <code>~</code>) are removed. The indentation and line breaks that make your stylesheet readable are unnecessary for the browser's CSS parser.</li>
        <li><strong>Trailing semicolons removed</strong> — CSS allows the final declaration in a rule block to omit its trailing semicolon. The minifier removes it, saving one byte per rule. <code>color: red;</code> before <code>{'}'}</code> becomes <code>color:red</code>.</li>
        <li><strong>String content preserved</strong> — values inside quotes (<code>content: "→ "</code>, <code>url('image.png')</code>, <code>font-family: "Times New Roman"</code>) are never modified. The parser protects all quoted strings.</li>
      </ul>

      <h3>CSS Beautification</h3>
      <p>
        The beautify mode reverses minification — it takes compressed or single-line CSS and reformats it with consistent indentation and line breaks. This is useful when you receive minified third-party CSS (a plugin, a component library, a CDN stylesheet) and need to read or modify it.
      </p>
      <p>
        The beautifier expands the minified form by:
      </p>
      <ul>
        <li>Opening each rule block on a new line with a space before <code>{'{'}</code></li>
        <li>Indenting each declaration two spaces inside its rule block</li>
        <li>Placing each declaration on its own line ending with a semicolon</li>
        <li>Separating each rule block with a blank line for scanability</li>
        <li>Splitting selector lists so each selector in a group appears on its own line</li>
      </ul>
      <pre><code>{`/* Minified */
.btn{display:inline-flex;align-items:center;padding:8px 16px;border-radius:6px;font-weight:600;cursor:pointer}

/* Beautified */
.btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}`}</code></pre>
      <p>
        Use beautify when auditing a third-party stylesheet, writing overrides, debugging specificity conflicts, or adapting a component's styles to your own design system.
      </p>

      <h3>What This Tool Does Not Do</h3>
      <p>
        Some CSS optimisers go further than whitespace removal. This tool intentionally does not:
      </p>
      <ul>
        <li><strong>Remove unused rules</strong> — detecting which selectors match elements in your HTML requires a full DOM analysis. Tools like PurgeCSS, the Vite plugin <code>vite-plugin-purgecss</code>, or Tailwind's JIT compiler perform this at build time.</li>
        <li><strong>Merge shorthand properties</strong> — converting four <code>margin-*</code> declarations into <code>margin: 0</code> requires understanding CSS cascade and property interaction rules. This is handled by cssnano's advanced preset.</li>
        <li><strong>Normalise colours</strong> — reducing <code>#ffffff</code> to <code>#fff</code> or <code>rgb(0,0,0)</code> to <code>#000</code> is safe but requires a CSS-aware AST parser. cssnano applies these transforms automatically.</li>
        <li><strong>Strip vendor prefixes</strong> — removing obsolete <code>-webkit-</code> or <code>-moz-</code> prefixes requires a browser-compatibility database. Autoprefixer manages this based on your Browserslist configuration.</li>
        <li><strong>Deduplicate rules</strong> — identifying and merging duplicate declarations across a large stylesheet requires full rule analysis.</li>
      </ul>

      <h3>CSS Minification in a Build Pipeline</h3>
      <p>
        For production projects, CSS minification belongs in your automated build, not as a manual step:
      </p>
      <ul>
        <li><strong>Vite</strong> — minifies CSS automatically in production builds using esbuild (default from Vite 3) or Lightning CSS (opt-in from Vite 4.4). Zero configuration required for standard setups.</li>
        <li><strong>Webpack</strong> — use <code>css-minimizer-webpack-plugin</code> which wraps cssnano. Add it to <code>optimization.minimizer</code> in your Webpack configuration.</li>
        <li><strong>PostCSS + cssnano</strong> — the most configurable CSS minifier. cssnano runs as a PostCSS plugin with two presets: <code>default</code> (safe, widely used) and <code>advanced</code> (more aggressive, may occasionally change visual output for edge-case rules).</li>
        <li><strong>Next.js</strong> — minifies CSS by default in production builds via SWC. No configuration needed.</li>
        <li><strong>Lightning CSS</strong> — Rust-based CSS processor that handles minification, autoprefixing, and modern CSS transforms in a single pass. Significantly faster than PostCSS on large stylesheets and produces excellent output.</li>
      </ul>
      <p>
        Adding cssnano to a PostCSS pipeline:
      </p>
      <pre><code>{`// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer'),
    process.env.NODE_ENV === 'production' && require('cssnano')({
      preset: ['default', { discardComments: { removeAll: true } }],
    }),
  ].filter(Boolean),
};`}</code></pre>

      <h3>Critical CSS and Inline Styles</h3>
      <p>
        Critical CSS is the subset of your stylesheet required to render above-the-fold content without a render-blocking external stylesheet request. Inlining it in a <code>{'<style>'}</code> tag in the HTML <code>{'<head>'}</code> lets the browser paint the initial viewport immediately, while the full stylesheet loads asynchronously.
      </p>
      <p>
        Minifying the critical CSS block is essential — every byte inlined adds to your HTML response size, which affects Time to First Byte (TTFB) and Largest Contentful Paint (LCP). A 4 KB critical CSS block minified to 2.5 KB and Brotli-compressed becomes roughly 600 bytes.
      </p>
      <p>
        Tools that extract critical CSS automatically:
      </p>
      <ul>
        <li><strong>Critters</strong> — a Webpack plugin (also used by Angular CLI) that inlines critical CSS by rendering pages in a virtual browser and capturing the styles used for visible elements.</li>
        <li><strong>critical</strong> (npm package) — a standalone tool that integrates with Gulp, Grunt, or custom build scripts. Configurable viewport size and screen dimensions for multi-breakpoint critical extraction.</li>
        <li><strong>Penthouse</strong> — the underlying engine used by most critical CSS tools. Can be run directly from the command line or Node.js API.</li>
      </ul>

      <h3>CSS Variables and Custom Properties</h3>
      <p>
        CSS custom properties (<code>--primary-color: #3b82f6</code>, <code>--spacing-md: 16px</code>) are fully supported by the minifier. Their values can contain arbitrary strings including spaces, so whitespace inside a custom property value is preserved exactly. Only the surrounding whitespace in the declaration itself is collapsed:
      </p>
      <pre><code>{`/* Input */
:root {
  --primary-color: #3b82f6;
  --font-stack: "Inter", "Helvetica Neue", sans-serif;
  --grid-gap: clamp(16px, 2vw, 32px);
}

/* Minified */
:root{--primary-color:#3b82f6;--font-stack:"Inter","Helvetica Neue",sans-serif;--grid-gap:clamp(16px,2vw,32px)}`}</code></pre>

      <h3>@media Queries and Nested Rules</h3>
      <p>
        The minifier handles all standard CSS at-rules, including <code>@media</code>, <code>@keyframes</code>, <code>@supports</code>, <code>@layer</code>, and <code>@container</code>. Nested braces are tracked so rule bodies are correctly identified and trailing semicolons are only removed where safe (before a closing <code>{'}'}</code>, not inside <code>@keyframes</code> percentage blocks where they're required).
      </p>
      <pre><code>{`/* Input */
@media (max-width: 768px) {
  .container {
    padding: 0 16px;
    flex-direction: column;
  }
}

/* Minified */
@media (max-width:768px){.container{padding:0 16px;flex-direction:column}}`}</code></pre>
      <p>
        The beautifier handles nested rules correctly by tracking brace depth, so <code>@media</code> blocks are indented, and the rules inside them are double-indented.
      </p>

      <h3>Measuring the Impact</h3>
      <p>
        Use the stats panel in this tool to see the immediate size reduction for any file you paste. For ongoing monitoring:
      </p>
      <ul>
        <li><strong>Browser DevTools → Network</strong> — filter by CSS, check the "Size" column for compressed transfer size vs. uncompressed resource size.</li>
        <li><strong>Lighthouse</strong> — the "Minify CSS" audit flags stylesheets that contain whitespace and comments. Running Lighthouse in Chrome DevTools or CI gives you a direct measurement of potential savings.</li>
        <li><strong>Coverage panel</strong> — DevTools → More tools → Coverage shows what percentage of each CSS file is actually applied on the current page. High unused-CSS percentages are a signal to investigate PurgeCSS or split your stylesheets by route.</li>
        <li><strong>WebPageTest</strong> — provides waterfall charts and compression analysis, showing gzip/Brotli savings alongside raw file sizes.</li>
      </ul>

      <h3>CSS-in-JS and Styled Components</h3>
      <p>
        If your project uses CSS-in-JS libraries (styled-components, Emotion, vanilla-extract, Stitches), the CSS is generated at build time or runtime from JavaScript. Minification in this case is handled differently:
      </p>
      <ul>
        <li><strong>Build-time extraction</strong> — tools like vanilla-extract and Linaria extract CSS to static files at build time, which are then minified by your standard CSS pipeline (PostCSS/cssnano).</li>
        <li><strong>Runtime libraries</strong> — styled-components and Emotion inject styles as <code>{'<style>'}</code> tags at runtime. Minification of the template literals in your JavaScript components is handled by your JS minifier. styled-components v6 includes a built-in minifier for template literal CSS.</li>
        <li><strong>Atomic CSS (Tailwind, UnoCSS)</strong> — generated utility classes are already minimal by design; the JIT compiler only emits classes actually used in your HTML/JS. The resulting stylesheet is small to begin with, typically 5–20 KB before compression.</li>
      </ul>
      <p>
        This tool is most useful for projects with traditional external stylesheets, component-scoped CSS files in frameworks like Vue SFCs, or any CSS that falls outside an automated build pipeline.
      </p>

      <h3>Combining Minification with Compression</h3>
      <p>
        Minification and server-side compression are complementary and both should be applied. Minification removes redundant characters before the file is served; GZIP or Brotli compression then encodes the minified text more efficiently. The reason both matter is that compression works on patterns of repeated byte sequences — minified CSS has fewer unique sequences, which makes compression more effective.
      </p>
      <p>
        Typical real-world results for a 50 KB stylesheet:
      </p>
      <ul>
        <li>Original, uncompressed: 50 KB</li>
        <li>Minified only: ~33 KB (34% reduction)</li>
        <li>Original + GZIP: ~12 KB</li>
        <li>Minified + GZIP: ~8.5 KB (83% total reduction from original)</li>
        <li>Minified + Brotli: ~7 KB (86% total reduction)</li>
      </ul>
      <p>
        Most static hosting platforms (Vercel, Netlify, Cloudflare Pages) serve Brotli-compressed assets automatically. Ensure your server is not serving uncompressed CSS — check the <code>Content-Encoding: br</code> or <code>Content-Encoding: gzip</code> header in the Network panel.
      </p>
    </div>
  );
}
