---
title: "SHA-256 vs MD5: When to Use Which Hash Algorithm"
description: "MD5 is fast but broken. SHA-256 is the safe default. Here's when each shows up in production, and why checksum use cases are the only reason MD5 still exists."
category: "Security"
tools: ["hash-generator", "hmac-generator"]
tags: ["hashing", "security", "sha-256", "md5"]
publishedAt: "2026-04-14"
---

## What a Hash Function Does

A cryptographic hash function turns input of any size into a fixed-length fingerprint. The same input always produces the same output; a single-bit change produces a completely different output; and given the output, you cannot feasibly reconstruct the input.

Three properties matter for security:

- **Pre-image resistance** — given a hash, it should be infeasible to find any input that produces it.
- **Second pre-image resistance** — given an input, it should be infeasible to find a *different* input with the same hash.
- **Collision resistance** — it should be infeasible to find *any two* different inputs that hash to the same value.

MD5 fails at collision resistance. That's what "broken" means in 2026.

## The Hashes You'll Meet

| Algorithm | Output size | Status | Typical use |
|---|---|---|---|
| MD5 | 128 bits (32 hex) | Cryptographically broken | Legacy checksums, cache keys |
| SHA-1 | 160 bits (40 hex) | Collision attacks demonstrated | Legacy (Git object IDs, old certificates) |
| SHA-256 | 256 bits (64 hex) | Secure | Default cryptographic hash in 2026 |
| SHA-512 | 512 bits (128 hex) | Secure | When longer output helps (HMAC keys, some blockchains) |
| BLAKE3 | Variable | Secure, very fast | Modern high-performance hashing |

You can hash anything with the [Hash Generator](/tools/hash-generator) and compare MD5, SHA-1, SHA-256, SHA-384, and SHA-512 side by side.

## Why MD5 Is Broken

In 2004, Wang et al. demonstrated practical MD5 collisions — two different inputs that produce the same hash. By 2008, researchers had forged an SSL certificate using MD5 collisions. In 2012, the Flame malware used a chosen-prefix MD5 collision to impersonate Microsoft's Windows Update signing key.

A modern laptop can find MD5 collisions in seconds. That makes MD5 unusable for any purpose where an attacker benefits from forging matching hashes — digital signatures, password hashing, certificate authorities, content authenticity.

## Why SHA-1 Followed

SHA-1 lasted longer but fell the same way. In 2017, Google and CWI Amsterdam demonstrated **SHAttered**, a practical SHA-1 collision, using roughly 6,500 years of CPU time compressed onto GPUs. By 2020 the cost had dropped into the tens of thousands of dollars — within reach of well-funded attackers.

SHA-1 is still used in some legacy systems. Git uses SHA-1 for object addressing, but the project is slowly migrating to SHA-256. TLS certificates signed with SHA-1 have been deprecated since 2017.

## Where MD5 Still Legitimately Appears

MD5 is broken for **adversarial** use cases. For non-adversarial checksums — "did this 4 GB file download correctly?" — MD5 still works, because the failure mode is random bit flips, not a motivated attacker.

Legitimate remaining uses:

- **Integrity checks against accidental corruption** — download verification, file deduplication.
- **Cache keys** — hashing a URL or cache entry identifier to a short bucket.
- **ETags** — browsers don't care if you can forge a collision, they just need a quick fingerprint.
- **Git's `git-annex` and some database content addressing** — where the content is inherently self-verifying.

The rule of thumb: **if an attacker benefits from finding a collision, MD5 is wrong**. If collisions only happen by accident, MD5 is fine — and it's fast.

## When to Use SHA-256

SHA-256 is the default for anything security-sensitive in 2026:

- **Digital signatures** — signing documents, code, firmware, certificates.
- **File verification** where the publisher is signing the hash — npm tarballs, Linux package repos.
- **Blockchain and Merkle trees** — Bitcoin, Ethereum before the merge, Git's next object format.
- **Content addressing** — IPFS, some backup systems.
- **TLS certificates** — all modern TLS certs use SHA-256 or better.
- **Hash-based key derivation inputs** — usually wrapped in HKDF or HMAC.

## When *Not* to Use SHA-256

Two important anti-patterns.

**Password hashing.** SHA-256 is too fast. A modern GPU computes billions of SHA-256 hashes per second, so an attacker with a leaked password database can try billions of guesses per second. Use a purpose-built password hash — **Argon2id**, **scrypt**, or **bcrypt**. These are deliberately slow and memory-hard to defeat brute-force.

**Message authentication.** A plain SHA-256 of `(secret || message)` is vulnerable to length-extension attacks. Use **HMAC-SHA-256** instead. The [HMAC Generator](/tools/hmac-generator) shows how keyed hashing differs from plain hashing.

## Quick Decision Table

| Use case | Right tool |
|---|---|
| Verifying an OS ISO download | SHA-256 (MD5 only if that's all the mirror publishes) |
| Password storage | Argon2id / bcrypt — **not** any SHA |
| API request signing | HMAC-SHA-256 |
| TLS certificate signature | SHA-256 (SHA-384 for high-assurance) |
| Cache key from a URL | MD5 or SHA-1 — collisions just mean cache misses |
| Git object ID today | SHA-1 (migrating to SHA-256) |
| File deduplication | SHA-256 for safety, BLAKE3 for speed |

## Try It Now

Hash any text or file in the browser with the [Hash Generator](/tools/hash-generator) — it produces MD5, SHA-1, SHA-256, SHA-384, and SHA-512 side by side using the Web Crypto API. For keyed hashing on the same input, use the [HMAC Generator](/tools/hmac-generator).
