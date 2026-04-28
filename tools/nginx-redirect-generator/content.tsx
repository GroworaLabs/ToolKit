export default function NginxRedirectGeneratorContent() {
  return (
    <div className="tool-content">
      <h2>Nginx Redirect Configuration: A Complete Guide</h2>
      <p>
        Nginx handles millions of redirects per second across the web — from enforcing HTTPS to migrating entire domains. Getting redirect configuration right is critical for both SEO (search engines need correct status codes to transfer link equity) and user experience (broken redirects mean lost visitors). This tool generates production-ready Nginx redirect configurations from simple inputs, so you can focus on what goes where rather than on syntax.
      </p>

      <h3>When to Use Each Redirect Status Code</h3>
      <p>
        HTTP defines four redirect status codes, each with different semantics. Choosing the wrong one can hurt SEO or break API clients.
      </p>
      <ul>
        <li><strong>301 Moved Permanently:</strong> The canonical choice for permanent URL changes — domain migrations, slug restructures, HTTP→HTTPS. Browsers and proxies cache 301s aggressively, and search engines transfer ~90–99% of link equity to the target URL. Use this when the old URL will never come back.</li>
        <li><strong>302 Found (Temporary):</strong> Tells browsers and search engines that the original URL is still the canonical one. Use for A/B tests, geo-routing, maintenance pages, or any redirect you plan to remove. Note: some older clients change POST to GET on 302.</li>
        <li><strong>307 Temporary Redirect:</strong> Like 302 but guarantees the HTTP method is preserved — a POST request stays a POST. Use for API endpoints or form submissions that are temporarily relocated.</li>
        <li><strong>308 Permanent Redirect:</strong> Like 301 but preserves the HTTP method. Use for API endpoints that have permanently moved but must continue to accept POST/PUT/DELETE requests. Relatively new (RFC 7538, 2015) — older HTTP/1.0 clients may not understand it.</li>
      </ul>

      <h3>Three Ways to Redirect in Nginx</h3>
      <p>
        Nginx offers three mechanisms for redirects. They differ in flexibility and performance:
      </p>
      <h4><code>return</code> — Fastest and Simplest</h4>
      <pre><code>{`location = /old-page {
    return 301 /new-page;
}`}</code></pre>
      <p>
        The <code>return</code> directive is processed immediately — Nginx does not evaluate any regular expressions or walk the location tree further. It is the fastest redirect method and should be your default choice for exact-path redirects. It can be placed at the server level (applies to all URIs) or inside a <code>location</code> block.
      </p>

      <h4><code>rewrite</code> — Pattern Matching with Regex</h4>
      <pre><code>{`rewrite ^/blog/(.*)$ /articles/$1 permanent;`}</code></pre>
      <p>
        The <code>rewrite</code> directive evaluates a PCRE regular expression against the URI. Use it when you need to capture parts of the old URL and insert them into the new URL — for example, redirecting an entire directory while preserving the slug. The <code>permanent</code> flag sends a 301; <code>redirect</code> sends a 302. Important: <code>rewrite</code> appends the original query string automatically unless you add a trailing <code>?</code> to the replacement.
      </p>

      <h4><code>location</code> block — Scoped Configuration</h4>
      <pre><code>{`location = /old-page {
    return 301 https://example.com/new-page;
}

location ^~ /old-section/ {
    return 301 https://example.com/new-section$request_uri;
}`}</code></pre>
      <p>
        A <code>location</code> block confines the redirect to a specific URI or prefix. Use <code>=</code> for exact match (fastest), <code>^~</code> for prefix match (skips regex locations), or <code>~</code>/<code>~*</code> for regex match. Inside the block you typically use <code>return</code>.
      </p>

      <h3>Query String Handling</h3>
      <p>
        How query parameters are handled depends on the directive:
      </p>
      <ul>
        <li><strong>With <code>return</code>:</strong> Query strings are <em>not</em> appended automatically. To preserve them, append <code>$is_args$args</code> to the target URL. <code>$is_args</code> outputs <code>?</code> only if a query string exists, avoiding a trailing <code>?</code> on clean URLs.</li>
        <li><strong>With <code>rewrite</code>:</strong> Query strings are appended automatically. To <em>strip</em> them, add a trailing <code>?</code> to the replacement URL (e.g., <code>rewrite ^/old$ /new? permanent;</code>).</li>
      </ul>

      <h3>Common Redirect Patterns</h3>
      <h4>Force HTTPS</h4>
      <pre><code>{`server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$host$request_uri;
}`}</code></pre>
      <p>
        This catches all HTTP traffic on port 80 and redirects to the same host and URI on HTTPS. The <code>$host</code> variable preserves whether the user visited <code>example.com</code> or <code>www.example.com</code>.
      </p>

      <h4>Canonical Domain (www vs non-www)</h4>
      <pre><code>{`server {
    listen 443 ssl;
    server_name www.example.com;
    return 301 https://example.com$request_uri;
}`}</code></pre>
      <p>
        Pick one canonical form — <code>www</code> or non-<code>www</code> — and redirect the other to it. This prevents duplicate content in search indexes and consolidates link equity on one domain.
      </p>

      <h4>Trailing Slash Normalization</h4>
      <pre><code>{`rewrite ^([^.]*[^/])$ $1/ permanent;`}</code></pre>
      <p>
        Adds a trailing slash to all URLs that don't have one and don't contain a file extension. Consistent trailing-slash behavior prevents duplicate content issues and avoids relative-path breakage in HTML.
      </p>

      <h3>Testing and Debugging Redirects</h3>
      <p>
        Before deploying any redirect configuration:
      </p>
      <ul>
        <li><strong>Validate syntax:</strong> Run <code>nginx -t</code> to check for configuration errors before reloading.</li>
        <li><strong>Test with curl:</strong> Use <code>curl -I http://example.com/old-page</code> to inspect the response headers. Look for the correct <code>Location</code> header and status code.</li>
        <li><strong>Check redirect chains:</strong> Ensure there are no redirect loops (A→B→A) or chains (A→B→C→D). Each hop adds latency and may cause search engines to drop the page. Aim for a single redirect from source to final destination.</li>
        <li><strong>Clear browser cache:</strong> Browsers cache 301 redirects indefinitely. Use incognito mode or <code>curl</code> when testing to avoid stale cached redirects.</li>
        <li><strong>Monitor 404s:</strong> After deploying redirects, check your access logs for 404s on the old URLs — they indicate rules that are not matching.</li>
      </ul>

      <h3>SEO Considerations for Redirects</h3>
      <p>
        Redirects directly affect how search engines treat your URLs:
      </p>
      <ul>
        <li><strong>301 passes link equity.</strong> Google has confirmed that 301 redirects pass full PageRank to the target URL (as of 2016). This makes 301 the right choice for permanent moves.</li>
        <li><strong>Avoid redirect chains.</strong> Google follows up to 10 redirects, but each hop dilutes crawl budget. Consolidate chains into single hops where possible.</li>
        <li><strong>Update internal links.</strong> After setting up redirects, update your site's internal links to point directly to the new URLs. Redirects are for external links and bookmarks — your own site should link to the canonical URL.</li>
        <li><strong>Keep redirects for at least 1 year.</strong> Search engines may take months to recrawl and update their index. Removing redirects too early means losing the link equity from external backlinks.</li>
      </ul>
    </div>
  );
}
