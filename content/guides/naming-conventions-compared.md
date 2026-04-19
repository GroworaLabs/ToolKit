---
title: "camelCase vs snake_case vs kebab-case: A Dev's Guide to Naming"
description: "Where each naming convention came from, which one your language actually expects, and how to translate between them at the boundary between systems."
category: "Developer Tools"
tools: ["case-converter"]
tags: ["naming", "conventions", "programming", "style-guide"]
publishedAt: "2026-04-19"
author: "olivia-bennett"
---

## The Cast of Characters

Every programming language picks one or two casing conventions and makes them the norm. The choice isn't arbitrary — each style has history, and each has places where it works and places where it doesn't. Knowing them all by name makes it easier to move between languages without your code looking off.

The common set:

| Style | Example |
|---|---|
| camelCase (aka lowerCamelCase) | `firstName`, `getUserById` |
| PascalCase (aka UpperCamelCase) | `FirstName`, `UserProfile` |
| snake_case | `first_name`, `get_user_by_id` |
| SCREAMING_SNAKE_CASE | `FIRST_NAME`, `MAX_RETRIES` |
| kebab-case (aka spinal-case) | `first-name`, `my-component` |
| Train-Case | `First-Name`, `Content-Type` |
| flatcase | `firstname` (rare, usually unintentional) |

## Where They Came From

**camelCase** traces back to Smalltalk in the 1970s and became mainstream through Java in the 1990s. The shape is meant to mimic humped camels — the capital letters stand out visually.

**snake_case** is older, born of programming languages that ran on terminals where text was often uppercase-only. Underscores survived as a lowercase-friendly separator. C popularised it through its standard library (`printf`, `strcpy`), Python cemented it in PEP 8.

**kebab-case** comes from Lisp, which allowed hyphens in identifiers because Lisp's parser treats `-` as a token separator only outside symbol names. Modern languages can't use it inside identifiers — `first-name` would parse as `first minus name` — so it lives on in places outside the compiler: CSS, HTML attributes, URLs.

**PascalCase** is named after Pascal (the language), which used it for types. Most modern languages borrowed it specifically for class and type names: `UserProfile`, `HttpClient`.

## What Each Language Expects

The single most useful piece of advice: **follow your language's default convention**. Fighting it creates friction every time you read or write code.

| Language | Variables/functions | Classes/types | Constants |
|---|---|---|---|
| JavaScript / TypeScript | camelCase | PascalCase | SCREAMING_SNAKE_CASE |
| Python | snake_case | PascalCase | SCREAMING_SNAKE_CASE |
| Java | camelCase | PascalCase | SCREAMING_SNAKE_CASE |
| C# | PascalCase (public) / camelCase (private) | PascalCase | PascalCase |
| Ruby | snake_case | PascalCase | SCREAMING_SNAKE_CASE |
| Rust | snake_case | PascalCase | SCREAMING_SNAKE_CASE |
| Go | camelCase (private) / PascalCase (exported) | PascalCase | camelCase or PascalCase |
| Swift | camelCase | PascalCase | camelCase |
| Kotlin | camelCase | PascalCase | SCREAMING_SNAKE_CASE |
| SQL | snake_case (most dialects) | snake_case | snake_case |
| HTML / CSS | kebab-case | — | — |

**Go** is the odd one out: it uses capitalisation to indicate *visibility*. `userName` is package-private; `UserName` is exported. There's no `public`/`private` keyword — case is the API.

**C#** uses PascalCase for method names (`GetUser`), which trips up devs coming from Java or JavaScript. It's a Microsoft house-style decision from the early .NET days.

## Translating at the Boundary

Real projects usually cross these conventions at a system boundary. A Python backend (snake_case) might serve a JavaScript frontend (camelCase), store data in SQL (snake_case), and emit HTTP headers (Train-Case). Each layer wants its own style.

**The right place to translate is the serialisation boundary.** Let the Python code use `user_id`, let the JavaScript code use `userId`, and convert between them at the JSON serialiser. Trying to force one convention end-to-end ("everyone uses camelCase because frontend") creates awkward code in the language that has to bend.

Most ORMs and frameworks will do this automatically. Prisma, Sequelize, and Django all understand how to map `user_id` SQL columns to `userId` in user-facing code. HTTP client libraries (Axios, requests) can be configured to translate keys on the way in and out.

The [Case Converter](/tools/case-converter) handles any pair of conventions in both directions — useful when writing a one-off migration script or renaming a large set of identifiers.

## The Acronym Problem

Capitalising an acronym inside an identifier has no correct answer.

```
HTTPServer  →  PascalCase treats letters uniformly
HttpServer  →  Treats acronyms as regular words
```

Microsoft's .NET framework guidelines prefer `HttpServer` — treat acronyms over two letters as words. Java is inconsistent: `HTTPServer` in some APIs, `HttpServer` in others. Google's Java style guide matches Microsoft: `Html`, not `HTML`.

In practice: **pick one rule per project and stick with it**. Converting `HTTPServer` to kebab-case produces `h-t-t-p-server` unless your converter knows to treat "HTTP" as a single token — which it usually doesn't. Writing `HttpServer` sidesteps the problem.

## The Underscore-vs-Hyphen Rule

Identifiers in almost every language cannot contain hyphens, because `-` is the subtraction operator. So:

```text
const first-name = "Alice";   // ❌ parsed as: first minus name
const first_name = "Alice";   // ✓
const firstName  = "Alice";   // ✓
```

That's why snake_case and camelCase won the language-level war, and why kebab-case is confined to identifier-free contexts: URL slugs, CSS class names, HTML attributes, file names, command-line flags (`--dry-run`).

One exception: **Lisp family** (Common Lisp, Scheme, Clojure) — where `first-name` is a valid symbol because the parser uses whitespace, not hyphens, to separate tokens.

## SCREAMING_SNAKE_CASE Is for Constants, Not Shouting

A common mistake in new codebases: using SCREAMING_SNAKE_CASE for regular variables because "it looks important." The convention is for **compile-time constants** — values that don't change during program execution:

```python
MAX_RETRIES = 3
API_BASE_URL = "https://api.example.com"
```

Configuration values loaded from environment variables usually also get SCREAMING names at the top of a module, even though they're technically runtime values. That's fine; the convention is about the *role* of the value, not when it's assigned.

## File Names Follow Different Rules

File naming doesn't inherit from language conventions — it follows the file system and tooling:

- **JavaScript / TypeScript** — usually `kebab-case.ts`, sometimes `PascalCase.tsx` for React components.
- **Python** — `snake_case.py`. Module names become Python identifiers, so they have to obey identifier rules.
- **Ruby** — `snake_case.rb`, matching the class name's `snake_case_of_PascalCase`.
- **Go** — `snake_case.go` conventionally, though single-word lowercase (`reader.go`) is more common.
- **Rust** — `snake_case.rs`, with `lib.rs` and `mod.rs` as special names.
- **Shell scripts** — `kebab-case.sh` or `snake_case.sh`; no strong convention.

When in doubt, match the files already in the project.

## Try It Now

Convert any identifier between camelCase, snake_case, kebab-case, PascalCase, and SCREAMING_SNAKE_CASE with the [Case Converter](/tools/case-converter). Useful when pulling a column list from SQL into a JavaScript schema, or flipping a whole settings block from one format to another in bulk.
