---
title: "Nginx Redirect Configuration: 301, 302, and rewrite Explained"
description: "A practical guide to Nginx redirect configuration — when to use return vs rewrite, how 301 and 302 affect SEO and caching, common patterns like HTTPS enforcement and canonical domains, and how to avoid redirect loops."
category: "Developer Tools"
tools: ["nginx-redirect-generator"]
tags: ["nginx", "redirects", "web server", "seo", "devops"]
publishedAt: "2026-05-18"
author: "marcus-chen"
---

## Why Redirect Configuration Gets Complicated

A redirect looks simple from the outside — the browser asks for URL A and ends up at URL B. But the details matter enormously for SEO, caching, performance, and API compatibility. Use a 302 where you need a 301 and you will slowly drain link equity from pages that have been permanently moved. Use `rewrite` where `return` would work and you add unnecessary processing overhead to every request. Configure redirect chains where single hops are possible and you waste crawl budget and add latency.

This guide covers the decisions behind Nginx redirect configuration so you understand not just how to write the rules, but why they should be written the way they are. Use the [Nginx Redirect Generator](/tools/nginx-redirect-generator) to generate production-ready configurations from the patterns described here.

---

## Understanding the Four Redirect Status Codes

### 301 Moved Permanently

The browser caches a 301 forever (no expiry unless `Cache-Control` says otherwise) and sends all subsequent requests for the old URL directly to the new URL, skipping the server entirely. Search engines transfer most accumulated link equity (PageRank) from the old URL to the new URL.

**Use 301 when:** The move is final — a domain migration, a URL restructure, an HTTP→HTTPS upgrade that will never be reverted. Any external links pointing to the old URL should have their equity passed to the new URL.

**Warning:** Because browsers cache 301s aggressively, if you use a 301 for a temporary redirect and then need to change the destination, users who have already visited will get the cached destination until they clear their browser cache. This makes 301 mistakes expensive to fix.

### 302 Found (Temporary)

Browsers do not cache 302 responses (absent explicit cache headers). They make a full round-trip to the server for every request to the original URL. Search engines keep indexing the original URL as the canonical one.

**Use 302 when:** The redirect is genuinely temporary — an A/B test landing page, a maintenance page, geographic routing, a feature flag that will be removed. Anything where you want the original URL to remain the indexed canonical.

### 307 Temporary Redirect

Identical to 302 in terms of browser caching and SEO treatment, but with one crucial difference: the original HTTP method is preserved. A POST to `/old-endpoint` gets redirected as a POST to `/new-endpoint`. Standard 302 allows (and browsers typically do) downgrade POST to GET.

**Use 307 when:** You are temporarily redirecting an API endpoint that receives non-GET requests and the method must be preserved.

### 308 Permanent Redirect

The permanent equivalent of 307 — like 301 but method-preserving. A POST redirected with 308 stays a POST to the new destination.

**Use 308 when:** An API endpoint has moved permanently and receives non-GET requests. Less widely supported than 301 (defined in RFC 7538, 2015), so check client compatibility before using 308 in production.

---

## `return` vs `rewrite`: Choose `return` by Default

Nginx provides two mechanisms for performing redirects: `return` and `rewrite`. They are not interchangeable — they have different performance characteristics and different use cases.

### `return` — The Fast Path

```nginx
location = /old-page {
    return 301 /new-page;
}
```

The `return` directive is processed immediately. Nginx does not evaluate any regular expressions, does not walk the location tree further, and does not execute any `rewrite` modules. It is the most efficient redirect method in Nginx.

Use `return` for:
- Exact path redirects (specific old URL → specific new URL)
- Domain-level redirects (all HTTP → HTTPS, all www → non-www)
- Redirect rules where the destination is a fixed URL or simple variable substitution

### `rewrite` — For Pattern Matching

```nginx
rewrite ^/blog/(.*)$ /articles/$1 permanent;
```

`rewrite` evaluates a PCRE regular expression against the request URI. Use it when you need to capture parts of the old URL and use them in the new URL — redirecting an entire directory while preserving the slug, for example.

The `permanent` flag sends a 301; `redirect` sends a 302. Important: `rewrite` automatically appends the original query string to the redirected URL unless you add a trailing `?` to the replacement to suppress it.

`rewrite` is significantly slower than `return` for simple cases because Nginx must evaluate the regex for every matching request. For high-traffic servers, prefer `return` whenever the destination URL does not depend on a captured part of the source URL.

---

## Common Redirect Patterns

### Force HTTPS

The canonical HTTPS redirect — every HTTP request to any page gets permanently redirected to HTTPS:

```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name example.com www.example.com;
    # ... SSL configuration and location blocks
}
```

The `$host` variable preserves whether the request was for `example.com` or `www.example.com`, so the HTTPS redirect goes to the correct host. The `$request_uri` includes the path and query string.

**Use 301, not 302.** HTTPS enforcement is permanent. A 302 would cause every single HTTP request — including from crawlers — to make an additional round-trip to the server rather than the browser handling it directly from cache.

### Canonical Domain (www vs non-www)

Choose one canonical form for your domain and redirect the other to it. Both are valid; the important thing is consistency for both users and search engines.

**Redirect www → non-www:**

```nginx
server {
    listen 443 ssl;
    server_name www.example.com;
    return 301 https://example.com$request_uri;
}

server {
    listen 443 ssl;
    server_name example.com;
    # main server configuration
}
```

**Redirect non-www → www:**

```nginx
server {
    listen 443 ssl;
    server_name example.com;
    return 301 https://www.example.com$request_uri;
}
```

Set your preference in Google Search Console (the "preferred domain" setting) to inform Googlebot which canonical form to use for credit consolidation.

### Domain Migration

When moving an entire site to a new domain — `old-domain.com` → `new-domain.com` — redirect all URLs on the old domain to their equivalents on the new domain:

```nginx
server {
    listen 443 ssl;
    server_name old-domain.com www.old-domain.com;
    return 301 https://new-domain.com$request_uri;
}
```

The `$request_uri` variable includes the full path and query string, so `/page?id=123` on the old domain becomes `https://new-domain.com/page?id=123`. This preserves all existing deep links and their SEO equity.

Keep this redirect in place for **at least 12 months**. Removing it earlier means that external links still pointing to the old domain will 404 instead of redirecting, losing the accumulated link equity.

### Redirecting a Section of a Site

Use `rewrite` when redirecting an entire directory while preserving slugs:

```nginx
server {
    listen 443 ssl;
    server_name example.com;
    
    # Redirect all /blog/* URLs to /articles/*
    rewrite ^/blog/(.+)$ /articles/$1 permanent;
    
    # Redirect the blog index separately (no trailing slug to capture)
    location = /blog {
        return 301 /articles;
    }
}
```

The `(.+)` capture group matches one or more characters (requiring at least one path segment). The `$1` inserts the captured group into the new URL.

### Trailing Slash Normalization

Inconsistent trailing slashes create duplicate content. Pick a convention and enforce it:

**Add trailing slashes:**

```nginx
rewrite ^([^.]*[^/])$ $1/ permanent;
```

This regex matches URLs that do not end in `/` and do not contain a file extension (the `[^.]` prevents applying this to `/file.css` or `/file.js`).

**Remove trailing slashes:**

```nginx
rewrite ^/(.*)/$ /$1 permanent;
```

Removes a trailing slash from any URL. Be careful: some frameworks expect trailing slashes on routes. Test thoroughly.

---

## Query String Handling

How Nginx handles query strings differs between `return` and `rewrite`:

**With `return`:** Query strings are **not** appended automatically. To preserve them:

```nginx
return 301 /new-path$is_args$args;
```

`$is_args` outputs `?` only if a query string exists; `$args` outputs the query string parameters. Together they produce clean URLs: `/new-path` when there is no query string, and `/new-path?id=123` when there is one.

**With `rewrite`:** Query strings are appended automatically. To strip them:

```nginx
rewrite ^/old-path$ /new-path? permanent;
```

The trailing `?` tells Nginx not to append the original query string.

---

## Avoiding Redirect Loops

A redirect loop (A → B → A, or A → B → C → A) causes browsers to display an error after a few hops and search engines to stop following the chain. The most common cause is a server block that matches its own redirect destination.

**Self-referential redirect:**

```nginx
# BROKEN: redirects all HTTP requests, including ones to example.com itself
server {
    listen 80;
    return 301 https://example.com$request_uri;
}
```

This works only if Nginx listens on port 80 for the old domain and on port 443 for the new domain — the `listen` directive prevents the loop. If both server blocks listen on 443, the redirect would loop.

**Testing for loops:**

```bash
# Follow all redirects and show each hop
curl -IL https://example.com/old-page

# Test from the command line without browser caching
curl -I -L --max-redirs 10 https://example.com/old-page
```

Look for repeated URLs in the output. Any URL that appears twice indicates a loop.

---

## Redirect Chains and Performance

Every redirect adds a round-trip: the browser makes a request, receives a redirect response, makes a new request. A single redirect adds 100–300 ms of latency depending on network conditions. A chain of three redirects adds 300–900 ms — a noticeable delay.

Search engines also follow redirect chains (up to ~10 hops in Google's case), but each hop dilutes crawl budget slightly. More practically, the final destination URL is what accumulates link equity — a chain `old-url → intermediate → final` passes equity from `old-url` to `final`, but there is some dilution at each hop.

**Optimize redirect chains to single hops.** When you restructure URLs multiple times over years, you often end up with chains: `/2021-url → /2022-url → /current-url`. Update old redirects to point directly to the current URL whenever you create a new redirect.

---

## Generating Redirect Configurations

Rather than writing Nginx redirect rules from scratch, use the [Nginx Redirect Generator](/tools/nginx-redirect-generator) to:

1. Select the redirect type (301, 302, 307, or 308)
2. Enter the source URL or pattern
3. Enter the destination URL
4. Choose the method (return, rewrite, or location block)
5. Configure query string handling and regex options
6. Copy the generated configuration block

The generator outputs production-ready configuration that you can paste directly into your `server` block or a dedicated includes file. Always test with `nginx -t` before reloading Nginx.

```bash
# Test configuration syntax
sudo nginx -t

# Reload without downtime (graceful reload)
sudo systemctl reload nginx

# Or, if using nginx directly:
sudo nginx -s reload
```
