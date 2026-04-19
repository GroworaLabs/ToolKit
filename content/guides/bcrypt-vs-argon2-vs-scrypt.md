---
title: "bcrypt vs Argon2 vs scrypt: Which Password Hash Should You Use?"
description: "A practical comparison of the three password-hashing algorithms devs actually reach for, with current OWASP parameters and the gotchas that bite in production."
category: "Security"
tools: ["bcrypt-generator", "password-strength-checker"]
tags: ["password-hashing", "cryptography", "security", "bcrypt", "argon2"]
publishedAt: "2026-04-19"
author: "marcus-chen"
---

## Why "Just Use SHA-256" Is Wrong

Plain hashes — SHA-256, SHA-3, even SHA-512 — are too fast for passwords. A modern GPU can compute billions of SHA-256 hashes per second. Feed it a 10-billion-entry password dictionary and it finishes in seconds. Password hashing algorithms are deliberately *slow* to make that impossible.

All three algorithms in this guide — **bcrypt**, **scrypt**, and **Argon2** — were designed for this job. They take seconds or milliseconds per hash by design, salt every input to defeat rainbow tables, and expose tunable cost parameters so you can raise the price as hardware gets faster.

The question isn't "which is strongest in theory." It's "which should I pick in 2026, and with what parameters?"

## The Three Contenders

**bcrypt** (1999, Niels Provos and David Mazières) is built on the Blowfish cipher. It has one knob — the *cost factor*, a base-2 logarithm of the number of iterations. `cost = 12` means 2^12 key-setup rounds. It's CPU-bound with no memory-hardness: a well-funded attacker with many cores can parallelise it cheaply.

**scrypt** (2009, Colin Percival) was the first widely-adopted *memory-hard* algorithm. Attackers can't just buy more cores to speed it up — they have to buy more RAM. That makes GPU and ASIC attacks materially more expensive. Scrypt ships three parameters: `N` (work), `r` (block size), `p` (parallelism).

**Argon2** (2015) won the Password Hashing Competition, a multi-year public cryptanalysis event. It comes in three variants:
- **Argon2d** — faster, data-dependent memory access, resistant to GPU attacks but not side-channel.
- **Argon2i** — data-independent, side-channel resistant, slower.
- **Argon2id** — a hybrid; resistant to both. This is the one you should use.

## OWASP Recommendations (2024)

OWASP's current password storage cheat sheet gives a priority order. If your platform supports it, pick the first one available:

| Algorithm | Recommended parameters |
|---|---|
| Argon2id | `m=19 MiB, t=2, p=1` minimum — higher memory preferred |
| scrypt | `N=2^17, r=8, p=1` |
| bcrypt | cost ≥ 10 (12 is a common default) |
| PBKDF2-HMAC-SHA-256 | 600,000 iterations (only if FIPS compliance demands it) |

Tuning target: a single hash should take **~500 ms to 1 s** of server CPU at expected peak load. Measure on your actual hardware — a laptop benchmark won't match an overloaded t3.medium under traffic.

## The Gotchas That Bite in Production

**bcrypt has a 72-byte input limit.** Anything beyond byte 72 is silently ignored. A 200-character passphrase and "the first 72 characters of that passphrase" hash identically. Worse, some libraries truncate at the first null byte, so binary secrets or pre-hashed inputs can collide. The usual mitigation is to pre-hash long passwords with SHA-256 and then bcrypt the hex output — but that introduces its own subtle issues (leaking pre-hash through timing). Argon2 and scrypt have no such limit.

**scrypt memory tuning is hard.** At OWASP parameters (`N=2^17, r=8`) scrypt uses about 64 MiB of RAM per hash. Fine on a dedicated server; a problem inside a 128-MiB AWS Lambda or a Cloudflare Worker. If you can't afford that memory at concurrent peak, you either lower parameters (weakening security) or pick a different algorithm.

**Argon2 parallelism should be 1 in web apps.** The `p` parameter lets one hash spread across multiple cores. Useful on a dedicated box, counter-productive inside a container that's already serving many requests — you'll starve other threads. Leave `p=1` and raise `m` (memory) instead.

**All three include the salt in the output.** A bcrypt string like `$2b$12$KIXqz…` embeds the algorithm, cost, salt, and digest in one blob. Never store the raw digest separately. Libraries like `bcrypt`, `passlib`, and `argon2-cffi` handle this for you — use them.

You can generate a properly-formatted bcrypt hash with the [bcrypt Generator](/tools/bcrypt-generator) and see the structure yourself.

## Which One Should You Pick?

- **New projects, no constraints** — Argon2id. It's the modern standard and has the strongest security proof.
- **Existing bcrypt codebase** — keep it, but raise the cost factor as hardware gets faster. Rehash passwords on successful login to migrate gradually.
- **Memory-constrained environments** (Lambda under 256 MiB, embedded systems) — bcrypt with cost 12+ is still acceptable.
- **FIPS-certified environments** — PBKDF2-SHA-256 at 600k+ iterations. It's the weakest of the four but the only one FIPS 140-2 blesses.
- **Don't use SHA-256, MD5, or "double SHA-256"** directly. They're too fast. This isn't an opinion — it's the industry baseline.

## How to Migrate Without Breaking Users

You can't rehash a password without the plaintext. The standard lazy migration works like this:

1. Store the existing bcrypt hash as `legacy_hash`.
2. On successful login, compute a new Argon2id hash from the plaintext the user just typed.
3. Replace `legacy_hash` with the Argon2id hash and set `algorithm = "argon2id"` on the row.
4. Users who never log in stay on bcrypt indefinitely — that's fine, bcrypt-12 isn't broken. It just isn't state-of-the-art.

After 12 months, users who haven't logged in can be force-reset via email link.

## Verifying Your Setup

Two quick sanity checks after deploying a password hashing change:

1. **Time a single hash.** If it finishes in under 100 ms, your parameters are too weak. If it takes longer than 2 s, you'll DOS yourself under traffic.
2. **Run a real password through the [Password Strength Checker](/tools/password-strength-checker)** before storing it. Strong hashing doesn't save you from users choosing `password123`.

## Try It Now

Hash any password with configurable cost in the [bcrypt Generator](/tools/bcrypt-generator) — useful when seeding test databases or verifying that your backend library output matches expectation. For checking whether a plaintext password is worth hashing at all, the [Password Strength Checker](/tools/password-strength-checker) estimates crack time against modern attacker hardware.
