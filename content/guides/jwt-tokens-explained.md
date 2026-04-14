---
title: "JWT Tokens Explained: Structure, Security, and Common Mistakes"
description: "How JSON Web Tokens are built, what the header and payload really contain, and the security mistakes that bite production apps."
category: "Security"
tools: ["jwt-decoder", "base64", "hmac-generator"]
tags: ["jwt", "authentication", "security", "api"]
publishedAt: "2026-04-14"
---

## What Is a JWT?

A **JSON Web Token** (JWT) is a compact, URL-safe format for passing signed claims between two parties — typically between an API server and a client. A JWT lets a server say "I verified this user 20 minutes ago; here's what I know about them" without storing session state anywhere.

The claims are just JSON. The signature is what makes them trustworthy: only the server holding the signing key can produce a valid token, so anyone who presents one proves the server issued it.

## Anatomy of a Token

A JWT is three [Base64url-encoded](/tools/base64) segments joined by dots:

```
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiQW5uYSJ9.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U
│────────header────│─────────payload──────────│──────────────signature───────────────│
```

- **Header** — which signing algorithm was used (`HS256`, `RS256`, etc.) and the token type (`JWT`).
- **Payload** — the claims. Standard ones include `sub` (subject / user id), `exp` (expiration), `iat` (issued at), `iss` (issuer). You can add custom claims too.
- **Signature** — the header and payload are concatenated, then signed with the server's secret or private key.

You can paste any JWT into the [JWT Decoder](/tools/jwt-decoder) to inspect its header and claims instantly — no server call needed.

## What JWT Is Not

JWTs are **signed, not encrypted** (unless you explicitly use JWE). Anyone who has the token can read every claim inside it by Base64-decoding the payload. That means:

- Never put passwords, API keys, or PII in a JWT payload.
- Treat the payload as public metadata with a tamper-proof signature.

## How Signing Works

For `HS256` (symmetric), the server computes:

```
signature = HMAC-SHA256(secret, base64url(header) + "." + base64url(payload))
```

The client sends the token back on every request. The server recomputes the signature with its secret and rejects the request if it doesn't match. You can see HMAC in action with the [HMAC Generator](/tools/hmac-generator).

For `RS256` (asymmetric), the server signs with a private key and consumers verify with the public key — useful when many services need to verify tokens without holding the secret.

## Common Mistakes

| Mistake | Why it matters |
|---|---|
| Accepting `alg: none` | Some libraries honoured an unsigned header as valid. Always pin the expected algorithm server-side. |
| Storing access tokens in localStorage | Any XSS on your origin can exfiltrate them. Keep access tokens in memory; use HttpOnly cookies for refresh tokens. |
| No `exp` claim | Tokens without expiration live forever. Stolen token = permanent compromise. |
| Long-lived access tokens | 24-hour access tokens give attackers a long window. Use 5–15 minute access tokens + a rotating refresh token. |
| Weak HS256 secrets | HS256 is only as strong as the secret. Use at least 256 random bits — never a word, slug, or environment name. |
| Trusting `iss` or `aud` without checking | Always validate issuer and audience claims against an allowlist. |

## When to Use JWTs (and When Not To)

JWTs shine when you need stateless verification — an API gateway can validate a token without a database lookup, a downstream microservice can read claims without calling auth. That makes them ideal for service-to-service auth, short-lived API access, and mobile clients.

They're a bad fit when you need **immediate revocation**. Once issued, a JWT is valid until its `exp` — there is no "log this user out everywhere" button that works instantly. If you need that, a traditional session store (Redis, database) with opaque session IDs gives you a cleaner revocation story. Hybrid systems are common: short access JWTs + a refresh token the server can blacklist.

## A Practical Debugging Workflow

When a JWT-based endpoint returns 401:

1. Copy the token from the request header.
2. Paste it into the [JWT Decoder](/tools/jwt-decoder) — confirm the payload matches the user you think is calling.
3. Check `exp` — expired?
4. Check `iss` and `aud` — do they match what the API expects?
5. Check the `alg` — is the server expecting `HS256` but receiving `RS256`? Algorithm confusion is a common root cause.

## Try It Now

Drop any JWT into the [JWT Decoder](/tools/jwt-decoder) to see the decoded header, payload, and signature. For generating the underlying signatures yourself, the [HMAC Generator](/tools/hmac-generator) produces the same output your backend library does — handy for verifying tests and debugging CI pipelines.
