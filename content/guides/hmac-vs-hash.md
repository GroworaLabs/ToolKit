---
title: "HMAC vs Hash: Why Signing Matters for APIs"
description: "A plain hash proves a message has not changed by accident. HMAC proves it has not changed on purpose. Here's why API signing uses one and not the other."
category: "Security"
tools: ["hmac-generator", "hash-generator"]
tags: ["hmac", "api security", "signing", "webhooks"]
publishedAt: "2026-04-14"
author: "marcus-chen"
---

## Same Tools, Different Jobs

Both plain hashing and HMAC produce a fixed-length fingerprint of some input. They look similar on the outside — you put bytes in, hex comes out. The critical difference is what each one protects you against.

- A **hash** answers "did this data change?" — no key involved, anyone can compute it.
- An **HMAC** answers "did someone with the shared key authorise this data?" — a key is required, so forgery is infeasible without it.

Mix these up and you get security bugs that pass code review and tests but fail under real attack. This guide shows where each belongs and why API platforms (Stripe, GitHub, Slack, AWS) standardised on HMAC for webhook and request signing.

## The Plain-Hash Failure Mode

Suppose a service wants to authenticate a message using a shared secret. A naive approach:

```
signature = SHA-256(secret + message)
```

Send `message` and `signature`. The receiver recomputes and compares. Works in a test — fails against a real attacker.

The problem is called a **length-extension attack**. SHA-256 (and SHA-1, and MD5) are built from an internal state that advances block by block. If you know `SHA-256(secret + message)`, you can append arbitrary data — without knowing the secret — and compute a valid `SHA-256(secret + message + attacker_data)`. The hash function hands you its internal state in the output.

That's not a theoretical concern. It has bitten real systems: early Flickr API signing and other homegrown schemes fell to exactly this pattern.

## What HMAC Does Differently

HMAC wraps a hash function in a specific keyed construction that defeats length extension by design:

```
HMAC(key, message) = H((key ⊕ opad) || H((key ⊕ ipad) || message))
```

Two passes, two padding constants, key mixed in at both ends. You don't need to understand the internals — you need to know that HMAC has been analysed and proved secure against length extension, forgery, and related attacks as long as the underlying hash is sound.

Every modern crypto library ships HMAC. Call `HMAC-SHA-256(key, message)`, get 32 bytes of keyed fingerprint back. You can try it with the [HMAC Generator](/tools/hmac-generator) and compare to a plain [Hash Generator](/tools/hash-generator) on the same input.

## Where Hashes Belong

Plain hashes are the right primitive when no key is involved and no attacker-controlled input is trying to fool you:

- **File integrity** — download checksums. SHA-256 of a release tarball.
- **Deduplication** — content-addressed storage (IPFS, Git objects).
- **Cache keys** — a fingerprint of a request URL or payload.
- **Merkle trees** — blockchain headers, file-system trees.
- **Password hashing inputs** — but always wrapped in Argon2id/bcrypt/scrypt, never direct SHA-256.

## Where HMAC Belongs

HMAC is the right primitive any time two parties share a secret and need to verify a message came from the other party without modification:

- **API request signing** — AWS Signature v4, Stripe idempotency, GitHub webhook `X-Hub-Signature-256`.
- **Webhook verification** — every webhook producer of consequence signs with HMAC-SHA-256.
- **Session tokens** — signing a stateless session cookie so the server can trust its contents (Express's `cookie-session`, Flask's signed cookies).
- **JWT with `HS256`** — the "H" is HMAC.
- **Short-lived upload URLs** — pre-signed URLs in S3, GCS, blob storage all rely on HMAC.

## Verifying an HMAC Signature Correctly

Two mistakes come up repeatedly in implementations:

**1. Comparing with `==`.** Regular string equality short-circuits on the first mismatched character. An attacker can measure timing differences and reconstruct a valid signature byte by byte. Use a **constant-time comparison** — `crypto.timingSafeEqual` in Node, `hmac.compare_digest` in Python, `subtle.ConstantTimeCompare` in Go.

**2. Signing the wrong thing.** Webhook senders sign a specific canonical form — the raw request body, often with a timestamp or nonce prepended. If your framework parses and re-serialises the body before you sign it, the re-serialised bytes won't match. Capture the raw body before any middleware touches it.

Stripe's webhook pattern is a good reference: it signs `timestamp.rawBody` with HMAC-SHA-256, sends both values in the `Stripe-Signature` header, and the receiver recomputes and compares with constant-time equality. Reject if the timestamp is more than five minutes old — prevents replay of captured requests.

## Quick Decision Table

| Question | Use |
|---|---|
| Checksum of a file download | **Hash** (SHA-256) |
| Cache key from a URL | **Hash** (any, even MD5) |
| Signing a webhook payload | **HMAC-SHA-256** |
| Signing an AWS API request | **HMAC-SHA-256** (via Signature v4) |
| Stateless session cookie | **HMAC** or a signed JWT |
| Password storage | Neither — Argon2id / bcrypt / scrypt |
| Public-key digital signature | Neither — RSA / Ed25519 |
| Git object ID | **Hash** (SHA-1 legacy, SHA-256 going forward) |

## Try It Now

Compute HMAC with any shared key and payload instantly with the [HMAC Generator](/tools/hmac-generator) — it supports HMAC-SHA-1, HMAC-SHA-256, HMAC-SHA-384, and HMAC-SHA-512. For plain unkeyed hashing of the same input, the [Hash Generator](/tools/hash-generator) shows you what the output would look like without a key — a quick way to see in practice why the two primitives are not interchangeable.
