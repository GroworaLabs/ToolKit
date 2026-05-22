---
title: "How We Keep All 70+ Tools Running 100% Client-Side"
description: "Every tool on ToolKit runs entirely in your browser — no servers, no API calls, no data leaving your machine. Here's the architecture that makes that possible."
tags: ["engineering", "privacy", "architecture"]
publishedAt: "2026-04-25"
author: "olivia-bennett"
---

ToolKit's core promise is simple: your data never leaves your browser. No server sees your JWT payload, your password candidates, your source code, or anything else you paste into our tools.

That constraint is easy to state and harder to maintain as you add tools. Here's how we think about it.

## The rule

Every computation happens in the browser. If a feature requires a server — for example, fetching live exchange rates or querying a remote API — we don't ship it. We build the offline version instead.

This means our currency converter works with rates baked into the build. Our IP/CIDR calculator does pure JavaScript subnet math. Our hash generator uses the [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API), which every modern browser ships natively.

## How we handle heavy computation

Some things that seem like they'd need a server don't. The token counter runs the full BPE tokenizer in the browser using a WebAssembly-compiled version of tiktoken. The SQL formatter does its own tokenization and formatting in pure JavaScript.

For things that are genuinely expensive, we use web workers to keep the main thread responsive. The result renders progressively rather than blocking the UI.

## The cost of this approach

We can't do things that need a server. No saved history (unless the user opts into localStorage), no shareable links for stateful tools, no real-time data that changes outside our build cycle.

We think those are the right trade-offs for developer tools. When you're debugging a JWT or checking a password's entropy, the last thing you want is to wonder whether someone logged your input.

## What we use

- **Web Crypto API** — hashing, HMAC, random token generation, TOTP
- **WebAssembly** — tiktoken (BPE tokenizer for token counting)
- **Canvas API** — QR code generation
- **File API** — downloads (CSV, JSON, files)
- All in a Next.js static export, so there's no server process handling requests

The architecture isn't complicated — it's just a constraint we apply consistently. Every new tool gets rejected if it can't run offline.
