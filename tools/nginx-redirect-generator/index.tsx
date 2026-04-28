import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is the difference between a 301 and 302 redirect in Nginx?',
    a: 'A 301 redirect is permanent — browsers and search engines cache it, and link equity passes to the new URL. A 302 redirect is temporary — browsers re-check the original URL on every visit, and search engines keep indexing the old URL. Use 301 when the move is final (domain migration, URL restructure) and 302 when the redirect is short-lived (A/B test, maintenance page).',
  },
  {
    q: 'Should I use return, rewrite, or a location block for redirects?',
    a: 'The `return` directive is the simplest and most efficient — Nginx processes it without evaluating regular expressions. Use it when you know the exact source path. The `rewrite` directive is necessary when you need regex pattern matching (e.g. redirecting an entire directory with a wildcard). A `location` block wrapping a `return` is useful when the redirect applies only to a specific URI or prefix. For simple path-to-path redirects, `return` is the recommended choice.',
  },
  {
    q: 'How do I preserve query parameters during a redirect?',
    a: 'With the `return` directive, append `$is_args$args` to the target URL — this passes the query string only if one exists. With `rewrite`, Nginx appends query parameters automatically unless you add a trailing `?` to the replacement URL (which strips them). This tool handles both behaviors with the "Preserve query parameters" checkbox.',
  },
  {
    q: 'What is the difference between 307 and 308 redirects?',
    a: '307 (Temporary Redirect) and 308 (Permanent Redirect) guarantee that the HTTP method is preserved — a POST stays a POST. Standard 301 and 302 redirects may (and in practice do) change POST requests to GET. Use 307/308 for API endpoints or form submissions where the method matters.',
  },
  {
    q: 'How do I redirect an entire domain to a new domain in Nginx?',
    a: 'Create a dedicated `server` block that listens for the old domain and returns a 301 redirect to the new domain with `$request_uri` appended to preserve the path. Use the "Domain migration" preset in this tool to generate the configuration. Place this server block before your main server block in the Nginx config.',
  },
  {
    q: 'Where do I put redirect rules in the Nginx config file?',
    a: 'Redirects go inside a `server` block in your Nginx configuration (typically `/etc/nginx/sites-available/your-site.conf` or `/etc/nginx/conf.d/your-site.conf`). Domain-level redirects (HTTP→HTTPS, www→non-www) get their own `server` block. Path-level redirects go inside the existing `server` block that handles the domain. Always run `nginx -t` to test configuration syntax before reloading.',
  },
  {
    q: 'How do I redirect HTTP to HTTPS in Nginx?',
    a: 'Create a separate server block listening on port 80 that returns a 301 redirect to the HTTPS version: `return 301 https://$host$request_uri;`. This tool generates the complete server block when you use the "HTTP → HTTPS" preset. Make sure your SSL certificate is configured in the port 443 server block before enabling this redirect.',
  },
  {
    q: 'Can I use regex in Nginx redirects?',
    a: 'Yes — the `rewrite` directive supports PCRE regular expressions. For example, `rewrite ^/blog/(.*)$ /articles/$1 permanent;` redirects all URLs under /blog/ to /articles/ while preserving the path. The `location` directive also supports regex with the `~` (case-sensitive) or `~*` (case-insensitive) modifiers. Enable the "Treat source as regex" option in this tool to use your pattern as-is without auto-escaping.',
  },
];

export const sidebarInfo = [
  { label: 'Status codes', value: '301 · 302 · 307 · 308' },
  { label: 'Methods',      value: 'return · rewrite · location' },
  { label: 'Features',     value: 'Domain match · Query params · Regex' },
  { label: 'Privacy',      value: '100% local — no server' },
];