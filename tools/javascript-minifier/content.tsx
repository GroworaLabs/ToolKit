export default function JavaScriptMinifierContent() {
  return (
    <div className="tool-content">
      <h2>JavaScript Minification: What It Is and When to Use It</h2>
      <p>
        JavaScript minification is the process of removing characters from source code that are not required for execution — comments, whitespace, newlines, and indentation. The result is a smaller file that a browser downloads faster, parses faster, and executes identically to the original. Minification is one of the cheapest performance wins in web development: a script that takes 200 ms to download over a slow connection might take 120 ms after minification, with no changes to functionality or correctness.
      </p>

      <h3>What a Whitespace Minifier Does</h3>
      <p>
        This tool performs whitespace-only minification — the foundational layer of any JavaScript minifier:
      </p>
      <ul>
        <li><strong>Removes single-line comments</strong> — lines and trailing remarks starting with <code>//</code> are stripped entirely.</li>
        <li><strong>Removes block comments</strong> — everything between <code>{'/*'}</code> and <code>{'*/'}</code> is removed, including multi-line JSDoc blocks.</li>
        <li><strong>Collapses whitespace</strong> — multiple spaces, tabs, and blank lines are collapsed to the minimum required. A single space is preserved only where JavaScript syntax requires it (between two adjacent identifiers like <code>return value</code> or <code>typeof x</code>).</li>
        <li><strong>Preserves string content</strong> — whitespace inside string literals, template literals, and regular expressions is left exactly as written. The parser handles single quotes, double quotes, backtick template literals, and nested <code>${'{}'}</code> expressions.</li>
      </ul>
      <p>
        A 500-line, well-commented JavaScript file typically minifies from 12 KB to 7–8 KB — a 35–40% reduction with zero change in runtime behaviour.
      </p>

      <h3>Whitespace Minification vs. Full Minification</h3>
      <p>
        Production-grade minifiers like <strong>Terser</strong>, <strong>esbuild</strong>, and the Closure Compiler go further than whitespace removal:
      </p>
      <ul>
        <li><strong>Identifier mangling</strong> — renames local variables from descriptive names (<code>userProfileData</code>) to one-letter names (<code>a</code>). This is the biggest size win for logic-heavy code, often reducing file size by an additional 20–30% on top of whitespace removal.</li>
        <li><strong>Dead code elimination</strong> — removes code paths that can never execute: unreachable branches, constant-falsy conditionals, unused exports in module-aware bundlers.</li>
        <li><strong>Constant folding</strong> — evaluates constant expressions at compile time. <code>const MS_PER_DAY = 24 * 60 * 60 * 1000</code> becomes <code>const MS_PER_DAY = 86400000</code>, saving one multiplication per page load.</li>
        <li><strong>Function inlining</strong> — small functions called once may be inlined at their call site, eliminating function-call overhead and enabling further optimisation.</li>
        <li><strong>Property key shortening</strong> — advanced tools can shorten long object keys if they control the full scope of access.</li>
      </ul>
      <p>
        Full minification with mangling typically achieves 50–70% reduction on unminified source. Whitespace-only achieves 20–40%. The gap matters for large applications; for small scripts under 10 KB, whitespace-only minification is often sufficient and carries zero risk of behavioural change.
      </p>

      <h3>When to Use This Tool</h3>
      <p>
        Most modern projects use bundlers (Webpack, Vite, esbuild, Rollup) that minify automatically as part of <code>npm run build</code>. You rarely need to manually minify code that passes through a bundler. This tool is most useful for:
      </p>
      <ul>
        <li><strong>CDN-hosted scripts</strong> — a standalone utility script loaded from a <code>{'<script>'}</code> tag, outside the main bundle, where a build step would be disproportionate.</li>
        <li><strong>Bookmarklets</strong> — browser bookmarklets must be a single line of JavaScript. Minification compresses them to a manageable URL length. Prepend <code>javascript:</code> to the output and drag to your bookmarks bar.</li>
        <li><strong>Inline <code>{'<script>'}</code> blocks</strong> — scripts embedded directly in HTML for critical path rendering, analytics, or third-party snippet integration.</li>
        <li><strong>Quick size estimation</strong> — checking how much a file could save before committing to a full build-tool integration.</li>
        <li><strong>Legacy codebases</strong> — projects without a build step that serve raw JavaScript files directly.</li>
        <li><strong>Copy-paste snippets</strong> — condensing a code snippet to share in a chat, comment, or documentation.</li>
      </ul>

      <h3>How the Minifier Handles JavaScript Syntax</h3>
      <p>
        Minifying JavaScript correctly is harder than it looks because the same characters mean different things in different positions. Two cases that trip up naive implementations:
      </p>
      <p>
        <strong>String literals</strong> — <code>// not a comment</code> inside a string, regex, or template literal must not be stripped. This minifier uses a state machine that enters "string mode" when it encounters a quote and stays there until the matching closing quote, respecting escape sequences (<code>\'</code>, <code>\\"</code>, <code>\\n</code>).
      </p>
      <p>
        <strong>Regex literals vs. division</strong> — the same <code>/</code> character starts a regex literal after operators and keywords (<code>return /pattern/</code>, <code>= /pattern/</code>) but is a division operator after values (<code>count / 2</code>, <code>array.length / 2</code>). This minifier tracks the last emitted identifier and checks it against the set of keywords that precede regex literals (<code>return</code>, <code>typeof</code>, <code>void</code>, <code>delete</code>, <code>throw</code>, <code>new</code>, <code>in</code>, <code>instanceof</code>, <code>of</code>, <code>case</code>) to make the distinction in O(1) per character.
      </p>
      <p>
        <strong>Template literals</strong> — backtick strings may contain <code>{'${...}'}</code> interpolations that themselves contain arbitrary JavaScript expressions, including nested template literals. The minifier tracks brace depth to correctly identify the end of each interpolation block.
      </p>

      <h3>Minifying for Bookmarklets</h3>
      <p>
        Bookmarklets are a perfect use case for a browser-based minifier. A bookmarklet is a browser bookmark whose URL is a <code>javascript:</code> URI. The URL must be a single unbroken line — no newlines, no comments. Paste your script, click Minify, prepend <code>javascript:</code> to the output, and drag it to your bookmarks bar:
      </p>
      <pre><code>{`// Before minification (multi-line, with comments)
javascript:(function() {
  // Highlight all external links on the page
  const links = document.querySelectorAll('a[href^="http"]');
  links.forEach(function(link) {
    link.style.outline = '2px solid red';
  });
})();

// After minification
javascript:(function(){const links=document.querySelectorAll('a[href^="http"]');links.forEach(function(link){link.style.outline='2px solid red';});})();`}</code></pre>

      <h3>Minification and Source Maps</h3>
      <p>
        Minification makes debugging production errors harder because line numbers and variable names no longer match the source. Source maps solve this: a <code>.map</code> file links each position in the minified output back to the original source line and column. DevTools in Chrome and Firefox load source maps transparently, showing you the original unminified code even when debugging a production bundle.
      </p>
      <p>
        This tool does not generate source maps. If you need source map support, use your project's build tool or the Terser CLI:
      </p>
      <pre><code>{`npx terser input.js --compress --mangle --source-map -o output.min.js`}</code></pre>
      <p>
        For Webpack, source maps are controlled by the <code>devtool</code> option in <code>webpack.config.js</code>. The <code>'source-map'</code> value generates a full external source map; <code>'hidden-source-map'</code> generates the file but does not reference it in the bundle (useful for error monitoring services like Sentry that upload source maps separately).
      </p>

      <h3>Measuring Minification Impact</h3>
      <p>
        Not all files benefit equally from minification. Variables affecting the gain:
      </p>
      <ul>
        <li><strong>Comment density</strong> — heavily commented code (JSDoc on every function, section headers, inline explanations) saves 10–20% from comment removal alone.</li>
        <li><strong>Indentation style</strong> — 4-space indentation on deeply nested code saves more than 2-space.</li>
        <li><strong>Identifier length</strong> — descriptive variable names like <code>calculateUserSubscriptionExpiry</code> save nothing from whitespace minification, but save significantly from mangling.</li>
        <li><strong>Already-minified input</strong> — if you paste code that is already minified (a vendor library, for example), this tool will produce no change.</li>
      </ul>
      <p>
        The stats panel above the output shows original size, minified size, and percentage saved, giving you an immediate measure of the impact.
      </p>

      <h3>JavaScript Minifiers at a Glance</h3>
      <p>
        For automated, production-grade minification:
      </p>
      <ul>
        <li><strong>esbuild</strong> — the fastest JavaScript/TypeScript bundler and minifier. Used internally by Vite and many other build tools. Minification is near-instant even for large bundles. Run with <code>esbuild input.js --minify --outfile=output.min.js</code>.</li>
        <li><strong>Terser</strong> — the most configurable JavaScript minifier. Successor to UglifyJS. Default minifier in Webpack 5. Supports ES2015+ and has fine-grained control over what transformations to apply. Slower than esbuild but produces slightly smaller output.</li>
        <li><strong>SWC</strong> — Rust-based compiler/minifier, used by Next.js 12+ as its default minifier. TypeScript-native, very fast, drop-in replacement for Babel + Terser in many configurations.</li>
        <li><strong>Rollup + terser plugin</strong> — common for library authors who want full control over the output module format and bundle structure, with Terser handling the final size reduction.</li>
        <li><strong>Google Closure Compiler</strong> — the most aggressive minifier; its ADVANCED_OPTIMIZATIONS mode can dramatically reduce size but requires annotations and type safety. Used by Google for its own large-scale production code.</li>
      </ul>

      <h3>Tree Shaking vs. Minification</h3>
      <p>
        Two distinct techniques are often conflated: tree shaking and minification. They are complementary, not interchangeable.
      </p>
      <p>
        <strong>Tree shaking</strong> removes entire exported functions and modules that are imported but never called. If you import <code>{'import { debounce } from "lodash-es"'}</code> but only use <code>debounce</code>, tree shaking drops all the other lodash functions from your bundle. It operates at the module graph level and requires ES module (<code>import</code>/<code>export</code>) syntax to work. CommonJS (<code>require</code>/<code>module.exports</code>) is not tree-shakeable.
      </p>
      <p>
        <strong>Minification</strong> removes characters from the code that is actually included in the bundle. It does not remove unused exports — that is tree shaking's job.
      </p>
      <p>
        In a typical Vite or Webpack build, tree shaking runs first (during bundling), then minification runs on the resulting bundle. Both steps are necessary for the smallest possible output.
      </p>

      <h3>Minification Best Practices</h3>
      <ul>
        <li><strong>Always minify in production, never in development</strong> — minified code is nearly impossible to debug. Use unminified builds locally and let your CI/CD pipeline apply minification before deployment.</li>
        <li><strong>Preserve licence comments</strong> — some open-source licences require the copyright notice to remain in the distributed file. Terser preserves comments starting with <code>/*!</code> by default; configure other tools similarly.</li>
        <li><strong>Combine with GZIP or Brotli</strong> — server compression and minification compound. A file minified from 100 KB to 60 KB then Brotli-compressed might transfer as 14 KB — a 7× improvement over the original uncompressed. Most CDNs and hosting providers (Vercel, Netlify, Cloudflare) apply Brotli automatically.</li>
        <li><strong>Set appropriate cache headers</strong> — a minified, content-hashed file like <code>main.a3f9c2.js</code> can be cached indefinitely (<code>Cache-Control: max-age=31536000, immutable</code>). This makes minification a one-time cost per deploy, not per request.</li>
        <li><strong>Never edit minified output manually</strong> — treat it as a build artefact. Fix the source and re-minify.</li>
      </ul>
    </div>
  );
}
