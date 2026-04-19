---
title: "Semantic Versioning in Practice: Beyond MAJOR.MINOR.PATCH"
description: "What 1.2.3 actually means, how npm's caret and tilde ranges work, why 0.x versions follow different rules, and where SemVer quietly breaks down."
category: "Developer Tools"
tools: ["semver-comparator"]
tags: ["semver", "versioning", "npm", "dependencies", "package-management"]
publishedAt: "2026-04-19"
author: "olivia-bennett"
---

## The Rules, in One Paragraph

Semantic Versioning — SemVer 2.0, defined at [semver.org](https://semver.org) — gives each release a three-part number `MAJOR.MINOR.PATCH`. The rules are:

- Bump **PATCH** for backwards-compatible bug fixes.
- Bump **MINOR** for backwards-compatible new features. Reset PATCH to 0.
- Bump **MAJOR** for breaking changes. Reset MINOR and PATCH to 0.

So `1.4.2 → 1.4.3` is a bug fix, `1.4.2 → 1.5.0` adds a feature safely, `1.4.2 → 2.0.0` may break your code on upgrade. That's the contract you're promising your users.

The hard part isn't the rule — it's that the boundary between "breaking" and "non-breaking" is rarely as clean as it sounds, and the tooling that consumes SemVer (npm, Cargo, pip) has quirks every dev trips over at least once.

## Pre-releases and Build Metadata

SemVer allows two optional suffixes:

```
1.0.0-alpha
1.0.0-alpha.1
1.0.0-beta.2
1.0.0-rc.1
1.0.0
1.0.0+20251230.sha.abc123
```

The dash introduces a **pre-release** identifier. Pre-releases sort *before* the plain version: `1.0.0-alpha < 1.0.0-beta < 1.0.0-rc < 1.0.0`. Within a prefix, identifiers are compared lexically and numerically: `1.0.0-alpha.2 > 1.0.0-alpha.1`.

The plus introduces **build metadata**. Unlike pre-release tags, build metadata is **ignored for precedence** — `1.0.0+build.1` and `1.0.0+build.2` are considered equal. It's there for human readability (commit SHAs, build numbers), not for ordering.

You can verify precedence between any two versions with the [SemVer Comparator](/tools/semver-comparator) — it implements the official precedence rules end to end.

## The 0.x Exception

Here's the rule most people miss: **0.x.y versions are explicitly exempt from the stability contract**. The spec says, verbatim: "Anything may change at any time. The public API should not be considered stable."

That means `0.2.0 → 0.3.0` can be breaking — and often is. Libraries signal that they're still iterating rapidly on their API by staying below 1.0. When a library hits `1.0.0`, it's making a promise.

## npm Range Operators

npm — and most package managers that followed it — layer range operators on top of SemVer. The two common ones:

**Caret (`^`)** — "compatible with the listed version, up to but not including the next MAJOR."

```
^1.2.3  →  >=1.2.3 <2.0.0
^1.0.0  →  >=1.0.0 <2.0.0
```

For `0.x.y`, caret behaves differently because of the 0.x instability rule:

```
^0.2.3  →  >=0.2.3 <0.3.0     (locks MINOR)
^0.0.3  →  >=0.0.3 <0.0.4     (locks PATCH)
```

**Tilde (`~`)** — "approximately equivalent; patch-level changes only."

```
~1.2.3  →  >=1.2.3 <1.3.0
~1.2    →  >=1.2.0 <1.3.0
~1      →  >=1.0.0 <2.0.0
```

Other managers use the same notation with subtly different semantics — Cargo's caret matches npm's exactly, but pip doesn't use caret or tilde at all; it uses `~=` (compatible release) with different rules under PEP 440.

**Practical rules of thumb:**
- `^` is the npm default. Suitable for most dependencies.
- `~` when you want tighter control — you trust patch bumps but want to review minor upgrades.
- Pin exactly (`"react": "18.3.1"`) when you need deterministic installs without lockfiles. Rarely needed if you commit your lockfile.

## Lockfiles: The Real Source of Truth

`package.json` says "I want something compatible with `^1.2.3`." `package-lock.json` says "and right now that's exactly `1.2.7`." Every modern package manager has a lockfile for the same reason: without one, `npm install` on two machines a week apart can produce different dependency trees — not because your code changed, but because upstream released a patch.

**Commit your lockfile** — even for libraries. (Older advice said "libraries shouldn't commit lockfiles"; current consensus is to commit them so CI is deterministic. Consumers install with their own ranges and their own lockfiles.)

## Where SemVer Quietly Breaks Down

The spec is unambiguous; the real world isn't.

**"Breaking" is subjective.** A new TypeScript library that tightens its generic constraints is breaking for some consumers and invisible to others. Is the next version `1.1.0` or `2.0.0`? Ecosystems disagree: Rust is famously strict; JavaScript is more forgiving; DefinitelyTyped explicitly versions type packages against their runtime counterparts.

**Unintentional breaking changes happen.** Someone refactors an internal helper that was technically exported, and one consumer's build breaks on a patch release. This is why lockfiles exist: they let you upgrade on your schedule, not the publisher's.

**"Just read the changelog" is not a strategy.** A 12-service monorepo with 300 dependencies can't read every changelog. Automated scanners (Renovate, Dependabot) plus end-to-end tests are the only defence that scales.

## Alternatives You'll Encounter

**Calendar versioning (CalVer)** — `2025.11.3`, `24.04`, Chrome's `127.0.6533.119`. Popular for tools whose users think in "when was this released" rather than "does this break." Ubuntu (`24.04`), Node.js LTS cycles, and JetBrains products lean this way.

**ZeroVer** — the informal term for staying below 1.0 forever. ZeroMQ and many Python libraries have shipped `0.x` for years. Officially "unstable"; in practice, production-grade.

**Hash-based versioning** — Go modules use `v1.2.3` but also support a pseudo-version like `v0.0.0-20250115120000-abcdef123456` for commits without tags. Not a SemVer replacement, a SemVer compatibility layer.

## A Practical Workflow

For libraries you publish:

1. Use SemVer 2.0 strictly.
2. Stay `0.x` while the API is in flux. Don't rush to 1.0 just to "look stable."
3. When you hit 1.0, mean it. Treat breaking changes as rare events that need migration docs.
4. Ship changelogs in a predictable format (Keep a Changelog, conventional-commits-driven).

For applications you maintain:

1. Commit the lockfile.
2. Let Renovate/Dependabot propose upgrades.
3. Let CI catch what reading can't.
4. When a dependency ships a major bump, read its changelog or migration guide before clicking merge.

## Try It Now

Compare any two SemVer strings — including pre-release and build-metadata edge cases — with the [SemVer Comparator](/tools/semver-comparator). Great for settling "is `1.2.0-rc.1` newer than `1.2.0-beta.3`?" arguments before you ship the wrong thing.
