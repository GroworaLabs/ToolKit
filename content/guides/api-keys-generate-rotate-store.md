---
title: "API Keys: How to Generate, Rotate, and Store Them Securely"
description: "Why Stripe keys have prefixes, how much entropy a key really needs, and the storage practices that prevent the next GitHub secret leak."
category: "Security"
tools: ["api-key-generator", "random-token-generator", "password-strength-checker"]
tags: ["api-keys", "secrets", "security", "authentication"]
publishedAt: "2026-04-19"
author: "marcus-chen"
---

## What Makes an API Key Actually Good

An API key is a long random string that authenticates a machine (service, script, app) to an API. Unlike passwords — which humans have to type and remember — API keys can be as long and random as you want. That means they should be *much* harder to guess than any password.

Four properties make a key trustworthy:

1. **High entropy** — at least 128 random bits, preferably more. Below that, brute force becomes plausible at internet scale.
2. **Generated with a CSPRNG** — `crypto.randomBytes` in Node, `secrets` in Python, `crypto/rand` in Go. **Never** `Math.random()` or time-seeded RNGs.
3. **Opaque** — no user ID, no timestamp, no metadata in the key itself. If the key carries structure, attackers can narrow their guesses.
4. **Distinguishable** — the format should identify the key type at a glance and trip automated leak scanners.

You can generate one that meets all four with the [API Key Generator](/tools/api-key-generator) (configurable prefix, length, and character set) or the lower-level [Random Token Generator](/tools/random-token-generator).

## Why Modern Keys Have Prefixes

Look at real keys in the wild:

```
sk_live_51MQx...        Stripe secret key
pk_live_51MQx...        Stripe publishable key
ghp_aKH8...             GitHub personal access token
gho_aKH8...             GitHub OAuth token
ghs_aKH8...             GitHub server-to-server
xoxb-3-abc...           Slack bot token
AKIA...                 AWS access key (20 chars)
```

Every prefix is a deliberate design choice. It tells you:

- **What type of key this is.** `sk_` → secret, handle carefully. `pk_` → publishable, fine in frontend code.
- **What environment it belongs to.** `_live_` vs `_test_` in Stripe prevents you from running tests against production.
- **That it's a key at all.** Automated scanners (GitHub Secret Scanning, TruffleHog) match these patterns and alert when someone commits one.

Stripe and GitHub both run detection services that scan public repos, pastebins, and package publishes for their known prefixes. When a real key leaks, they notify the owner (and sometimes auto-revoke) within minutes. That system only works because the key has an unambiguous shape.

**If you're designing an API today, use a prefix.** `yourapp_sk_live_` plus 32+ random characters is a good template. When (not if) a customer leaks one on GitHub, they'll get the same courtesy email Stripe sends.

## The Entropy Math

A random key of length `n` drawn from an alphabet of size `A` has `n × log2(A)` bits of entropy.

| Alphabet | Bits per character |
|---|---|
| 16 (hex) | 4 |
| 32 (Base32) | 5 |
| 36 (alphanumeric lowercase) | 5.17 |
| 62 (alphanumeric mixed case) | 5.95 |
| 64 (Base64) | 6 |

To reach **128 bits of entropy** — the usual minimum — you need:

- 32 hex characters, or
- 26 Base32 characters, or
- 22 Base64 characters, or
- 25 alphanumeric mixed-case characters.

Most published keys sit comfortably above this — typically 40–64 characters of `[A-Za-z0-9]`, which is 200–380 bits. Overkill is free; under-kill isn't.

## Storing Keys Server-Side

When a user creates an API key in your dashboard, the flow should look like this:

1. Generate 32+ bytes from a CSPRNG.
2. Format as `prefix + encoding(bytes)`.
3. **Hash the key** (SHA-256 is fine — unlike passwords, the input is already high-entropy, so slow hashing buys nothing).
4. Store the hash and a short *key-id prefix* (first 8–12 chars, for display).
5. Show the full key to the user **exactly once**.
6. On every API request, hash the incoming key and compare to the stored hash with constant-time equality.

Never store the plaintext key. If your database is compromised, the attacker gets hashes — same logic as password storage, just faster. And when the user loses their key, the only answer is to generate a new one.

The [Password Strength Checker](/tools/password-strength-checker) isn't designed for API keys (the entropy is off the charts), but it's a useful sanity check when a developer insists on using a "memorable" key.

## Storing Keys Client-Side — Don't

There is no secure way to embed a secret API key in a client you don't control. A "secret" in a JavaScript bundle, a mobile app binary, or a desktop Electron app is not secret — extracting it takes minutes with standard tools.

Accepted patterns:

- **Backend proxy.** Client calls your server; your server holds the secret key and forwards the request to the third-party API. Works for every API; adds a hop.
- **Narrowly-scoped publishable keys.** Stripe's `pk_*` keys are safe to ship in frontend code because they can only do harmless operations (tokenise a card, not charge it). If the API you're using has this concept, use it.
- **Short-lived tokens via OAuth.** The server exchanges long-term credentials for a short-lived access token that the client uses directly. Standard for Google APIs, GitHub Apps, etc.

If you find yourself writing `const API_KEY = "sk_live_..."` in anything that ships to a browser or an app store, stop and find one of the three patterns above.

## Rotation: Plan It Before You Need It

Every key will eventually leak. Rotation is the control that limits the blast radius.

**Design for rotation from day one:**

- Let users have multiple active keys at once. Generate the new one, give them time to update their code, then revoke the old one.
- Include a "last used" timestamp in your UI so owners can spot stale keys.
- Provide an audit log: when was each key created, used, and revoked.
- For automated systems, support key rotation without downtime (read old and new; write new).

**When to rotate:**

- Immediately on leak.
- When an employee with access leaves.
- On a schedule — 90 days for infra keys, 30 days for high-risk services.
- After any security incident, even if the key wasn't directly exposed.

## Where Keys Should Live

| Environment | Where | Why |
|---|---|---|
| Local development | `.env` file, gitignored | Works offline; no cloud roundtrip |
| CI/CD | Provider's secret store (GitHub Actions secrets, GitLab variables) | Never visible in logs if masked correctly |
| Production (small) | Platform env vars (Vercel, Fly, Railway) | Simple; encrypted at rest |
| Production (larger) | Secret manager — AWS Secrets Manager, GCP Secret Manager, HashiCorp Vault, Doppler, 1Password Connect | Audit log, rotation, fine-grained access control |
| Mobile / desktop apps | A backend proxy | See previous section |

## Common Mistakes

- **Committing `.env` to git.** Once pushed, assume the key is public — rotation is the only fix.
- **Logging full keys.** Mask all but the last 4 characters in logs and error messages.
- **Reusing the same key across environments.** Prod and staging should have separate keys; leaking staging shouldn't compromise prod.
- **No expiration.** A key without an expiry is a future liability.
- **Checking by `==`.** Use constant-time comparison on the hash — timing attacks are real.

## Try It Now

Generate production-quality API keys with a custom prefix, length, and alphabet using the [API Key Generator](/tools/api-key-generator). For raw random tokens without the prefix structure, the [Random Token Generator](/tools/random-token-generator) produces CSPRNG output in hex, Base64, or Base32.
