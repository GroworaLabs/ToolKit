---
title: "Base64 Encoding Explained"
description: "What Base64 is, how it works, when to use it, and common pitfalls — with practical examples you can test right away."
category: "Developer Tools"
tools: ["base64", "url-encoder"]
tags: ["base64", "encoding", "web development", "api"]
publishedAt: "2026-04-08"
---

## What Is Base64?

Base64 is an encoding scheme that converts binary data into a string of 64 printable ASCII characters. It was designed to safely transport data through systems that only handle text — like email protocols or URL parameters.

It is **not encryption**. Base64 is fully reversible without any key. Anyone who sees a Base64 string can decode it instantly.

## How It Works

Every 3 bytes of input (24 bits) become 4 Base64 characters (6 bits each). The 64 characters used are:

```
A–Z  (26 characters)
a–z  (26 characters)
0–9  (10 characters)
+  /  ( 2 characters)
=    (padding)
```

**Example:**

```
Input:   Hello
Binary:  01001000 01100101 01101100 01101100 01101111
Base64:  SGVsbG8=
```

The `=` at the end is padding to make the output length a multiple of 4.

## When to Use Base64

| Use case | Why Base64 helps |
|---|---|
| Embedding images in HTML/CSS | `<img src="data:image/png;base64,...">` avoids extra HTTP requests |
| JSON payloads with binary data | JSON is text-only; Base64 wraps binary safely |
| Basic Auth headers | Credentials are Base64-encoded in `Authorization: Basic ...` |
| Data URIs | Inline fonts, SVGs, or small files in stylesheets |
| JWT tokens | The header and payload parts are Base64url-encoded |

## Base64 vs Base64url

Standard Base64 uses `+` and `/`, which are special characters in URLs. **Base64url** replaces them with `-` and `_` and omits padding — safe to use directly in URLs and JWT tokens without percent-encoding.

## Common Pitfalls

**1. Treating it as encryption**  
Base64 provides zero security. Never use it to "hide" sensitive data.

**2. Expecting smaller output**  
Base64 output is ~33% larger than the input. Encoding a 1 MB image produces ~1.35 MB of text.

**3. Double-encoding**  
If you encode an already-Base64 string, you get garbage. Decode first, then re-encode if needed.

**4. Forgetting padding**  
Some libraries drop the `=` padding. If decoding fails, try appending `=` characters until the length is a multiple of 4.

## Try It Now

Use the [Base64 Encoder / Decoder](/tools/base64) to encode or decode any string instantly in your browser — nothing is sent to a server.

For URL-safe encoding of query parameters, the [URL Encoder](/tools/url-encoder) handles percent-encoding which is often a better fit than Base64 in that context.
