---
title: "URL Encoding Explained: Percent-Encoding, When You Need It, and Common Bugs"
description: "Why spaces become %20, when to encode path segments vs query parameters, and why double-encoding is the most common URL bug."
category: "Developer Tools"
tools: ["url-encoder", "base64"]
tags: ["url encoding", "web development", "http", "percent encoding"]
publishedAt: "2026-04-14"
---

## Why URLs Need Encoding

A URL is a text format, but it uses certain characters — `/`, `?`, `#`, `&`, `=` — to mean specific structural things. A path separator, a query string boundary, a fragment identifier, a parameter delimiter. If your data contains one of these characters, you need a way to say "this `&` is part of my value, not a separator."

That is what **percent-encoding** (a.k.a. URL encoding) does. It replaces any character that would confuse the URL parser with a `%` followed by two hex digits representing the byte.

## The Encoding Table You Actually Need

| Character | Encoded | Why |
|---|---|---|
| Space | `%20` or `+` (in query strings) | Spaces aren't allowed in URLs |
| `!` | `%21` | Reserved in some contexts |
| `#` | `%23` | Fragment identifier |
| `$` | `%24` | Reserved |
| `&` | `%26` | Query parameter separator |
| `+` | `%2B` | Alternative space encoding — encode if literal |
| `,` | `%2C` | Reserved |
| `/` | `%2F` | Path separator |
| `:` | `%3A` | Scheme separator |
| `;` | `%3B` | Reserved |
| `=` | `%3D` | Query parameter value separator |
| `?` | `%3F` | Query string start |
| `@` | `%40` | User info separator |
| Non-ASCII | Multi-byte UTF-8 then percent-encoded | e.g. `é` → `%C3%A9` |

Letters, digits, and the four "unreserved" marks (`-`, `_`, `.`, `~`) never need encoding.

Encode or decode any string with the [URL Encoder / Decoder](/tools/url-encoder) — useful for debugging query strings or fixing broken redirects.

## Path vs Query vs Fragment

URL encoding rules differ by **where** in the URL the character appears. This catches a lot of people off guard.

```
https://example.com/users/jane%20doe?q=hello%20world#section-1
        │─host─│──path segment──│──query─────│─fragment──│
```

- In the **path**, `/` is a separator. A literal `/` inside a single path segment must be `%2F`.
- In the **query string**, `&`, `=`, and `+` have special meaning. A literal `&` in a value becomes `%26`. A `+` traditionally means a space.
- In the **fragment**, most characters are allowed because fragments aren't sent to the server — but non-ASCII still needs encoding.

Most web frameworks handle this correctly if you use their URL builder. Building a URL with string concatenation (`` `/search?q=${userInput}` ``) is where bugs appear.

## Query Strings: `+` vs `%20`

Both decode to a space, but only in a query string. In a path segment, a literal `+` is a plus sign.

```
/search?q=hello+world   →  q = "hello world"
/search?q=hello%20world →  q = "hello world"
/path/a+b               →  path segment "a+b"
/path/a%20b             →  path segment "a b"
```

Modern parsers all accept both `+` and `%20` in query strings. When generating URLs, either works — be consistent so your logs and analytics aggregate cleanly.

## UTF-8 and Non-ASCII Characters

URLs can only safely contain ASCII. Non-ASCII characters are first encoded to UTF-8 bytes, then each byte is percent-encoded:

```
é           → UTF-8 bytes: C3 A9 → %C3%A9
日本         → UTF-8 bytes: E6 97 A5 E6 9C AC → %E6%97%A5%E6%9C%AC
```

Most modern browsers will display non-ASCII characters in the address bar (via **IDN** — internationalised domain names and IRI support) but transmit the percent-encoded form over HTTP.

## Double-Encoding — The Most Common Bug

You encode a URL once. Another layer encodes it again. Now `%20` becomes `%2520` (because `%` itself gets encoded to `%25`).

```
Original:      hello world
Encoded once:  hello%20world
Encoded twice: hello%2520world   ← almost always a bug
```

Watch for this pattern when:

- A client library encodes a query string, then you concatenate with another already-encoded URL.
- You pass a URL as a query parameter (OAuth redirect URIs, log aggregation UIs). Encode the value exactly once.
- Framework middleware encodes automatically, but your code encodes too.

If you see `%25` sprinkled through a URL where you don't expect it, you're double-encoding somewhere upstream.

## URL Encoding vs Base64 vs JWT

Three encodings that look similar but solve different problems:

| Encoding | Character set | Purpose |
|---|---|---|
| URL encoding | ASCII + `%XX` escapes | Safely include arbitrary text inside a URL |
| Base64 | `A-Z a-z 0-9 + / =` | Represent binary data as ASCII text |
| Base64url | `A-Z a-z 0-9 - _` (no padding) | Base64 that's URL-safe — used in JWTs |

If you need to put binary data in a URL, **Base64url** is the right tool — it skips the characters (`+`, `/`, `=`) that would need further URL-encoding. If you need to put text with special characters in a URL, **percent-encoding** is the right tool. The [Base64 Encoder / Decoder](/tools/base64) supports Base64url specifically.

## Practical Checklist

When a URL-related bug appears, walk this list:

1. **Who encodes?** The client library, your application code, or both?
2. **What's the original input?** Unquoted console output of the string — before any encoding — is usually the clearest diagnostic.
3. **Check each layer.** Browsers, load balancers, CDNs, and frameworks all touch URLs.
4. **Decode fully.** If decoding once still looks encoded, you have double-encoding somewhere.
5. **Distinguish path from query.** The rules are different; `/` in a path segment must be `%2F`, but `/` in a query value usually doesn't need encoding.

## Try It Now

Encode or decode any string in the [URL Encoder / Decoder](/tools/url-encoder). It handles full UTF-8, shows character-by-character substitution, and is the fastest way to identify whether a URL is missing encoding or double-encoded.
