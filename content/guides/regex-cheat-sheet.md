---
title: "Regex Cheat Sheet for Developers"
description: "The regex patterns you actually use in real code — anchors, character classes, quantifiers, groups, and the gotchas that cost an afternoon."
category: "Developer Tools"
tools: ["regex-tester", "find-and-replace"]
tags: ["regex", "regular expressions", "text processing", "cheat sheet"]
publishedAt: "2026-04-14"
author: "olivia-bennett"
---

## Why Regex Still Matters

Every developer reaches for regex a few times a month — validating input, extracting data from logs, bulk-renaming files, scrubbing CSV. Knowing the core syntax saves hours compared to looking it up every time. This cheat sheet covers the ~90% of regex you'll actually use, plus the pitfalls that make patterns fail silently.

Open the [Regex Tester](/tools/regex-tester) in another tab and try each pattern as you read — the fastest way to build a real mental model.

## Anchors

Anchors match positions, not characters.

| Pattern | Matches |
|---|---|
| `^` | Start of string (or start of line in multiline mode) |
| `$` | End of string (or end of line in multiline mode) |
| `\b` | Word boundary — between a word and non-word character |
| `\B` | Non-word boundary |

`^hello$` matches the exact string `hello`. `\bcat\b` matches `cat` but not `catalog`.

## Character Classes

| Pattern | Matches |
|---|---|
| `.` | Any character except newline (unless `s` flag) |
| `\d` | Digit — same as `[0-9]` |
| `\D` | Non-digit |
| `\w` | Word character — letters, digits, underscore |
| `\W` | Non-word character |
| `\s` | Whitespace — space, tab, newline, etc. |
| `\S` | Non-whitespace |
| `[abc]` | Any one of a, b, or c |
| `[^abc]` | Anything except a, b, c |
| `[a-z]` | Any lowercase letter |

## Quantifiers

| Pattern | Meaning |
|---|---|
| `*` | Zero or more |
| `+` | One or more |
| `?` | Zero or one (optional) |
| `{n}` | Exactly n |
| `{n,}` | n or more |
| `{n,m}` | Between n and m |
| `*?`, `+?`, `??`, `{n,m}?` | Lazy (non-greedy) versions |

Greedy vs lazy is the regex concept that trips up the most people. `<.+>` on `<b>hi</b>` matches the entire string — it's greedy and swallows as much as it can. `<.+?>` matches just `<b>` because the lazy version stops as soon as it can.

## Groups and Alternation

| Pattern | Purpose |
|---|---|
| `(abc)` | Capturing group — referenceable as `$1` |
| `(?:abc)` | Non-capturing group — same matching, no backreference |
| `(?<name>abc)` | Named group — reference as `$<name>` |
| `\|` | Alternation — match either side |
| `\1` | Backreference to first group |

`(\w+)\s+\1` finds doubled words: matches `the the` because `\1` must equal whatever `(\w+)` captured.

## Lookarounds

Lookarounds match positions based on context, without consuming characters.

| Pattern | Meaning |
|---|---|
| `(?=abc)` | Positive lookahead — followed by abc |
| `(?!abc)` | Negative lookahead — not followed by abc |
| `(?<=abc)` | Positive lookbehind — preceded by abc |
| `(?<!abc)` | Negative lookbehind — not preceded by abc |

`\d+(?=px)` matches the number in `400px` but leaves `px` in place. Useful for extracting values from units, prefixes, or suffixes.

## Flags You'll Actually Use

| Flag | Effect |
|---|---|
| `i` | Case-insensitive |
| `g` | Global — find all matches, not just the first |
| `m` | Multiline — `^` and `$` match per line |
| `s` | Dotall — `.` matches newlines too |
| `u` | Unicode — treat the pattern as Unicode code points |

## Patterns Worth Memorising

```
Email (simple):         ^[\w.+-]+@[\w-]+\.[\w.-]+$
Integer:                ^-?\d+$
Decimal:                ^-?\d+(\.\d+)?$
URL (basic):            ^https?:\/\/[\w.-]+(?:\/[\w.-]*)*\/?$
Hex colour:             ^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$
IPv4:                   ^(\d{1,3}\.){3}\d{1,3}$   (loose)
Whitespace line:        ^\s*$
Trailing whitespace:    \s+$
```

## Common Pitfalls

**Forgetting to escape special characters.** `.` matches any character — to match a literal dot, write `\.`. Characters that need escaping outside character classes: `. * + ? ^ $ ( ) [ ] { } | \ /`.

**Catastrophic backtracking.** Nested quantifiers like `(a+)+` on long input can take minutes or crash the regex engine. If a pattern hangs, look for a quantifier on a group that itself contains a quantifier.

**Using regex to parse HTML or JSON.** Don't. Use a real parser. Regex handles flat text — hierarchical or nested structures eat regex for breakfast.

**Assuming `.` matches newlines.** By default it does not. Add the `s` flag if you need it to.

**Anchors in multiline input.** Without the `m` flag, `^` only matches position zero, not the start of every line.

## Try It Now

Paste any pattern into the [Regex Tester](/tools/regex-tester) to see matches highlighted live, plus a breakdown of each capture group. For one-off search-and-replace across a text block, the [Find and Replace](/tools/find-and-replace) tool handles full regex too.
