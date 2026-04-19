---
title: "TOTP and 2FA Explained: How Authenticator Apps Actually Work"
description: "What those 6-digit codes in Google Authenticator, Authy, and 1Password really are — how they're generated, why they still use SHA-1, and where TOTP falls short."
category: "Security"
tools: ["totp-generator", "qr-code-generator"]
tags: ["2fa", "totp", "authentication", "security", "hotp"]
publishedAt: "2026-04-19"
author: "marcus-chen"
---

## The 6-Digit Code Is Just Math

When you scan a 2FA QR code and your authenticator app starts spitting out 6-digit codes that rotate every 30 seconds, no magic is happening. Your phone and the server share a secret, both run the same function against the current time, and they arrive at the same number. That function is **TOTP** — Time-based One-Time Password, standardised as RFC 6238.

No network call is involved. An authenticator app works fully offline because the code is deterministic given the secret and the clock. That property is also why the scheme has to be careful about clock drift, replay, and secret storage — there's no server verification step to catch mistakes.

## HOTP Came First

TOTP is a small modification of an older scheme called **HOTP** — HMAC-based One-Time Password (RFC 4226, 2005). HOTP uses a counter: the server and client each track "this is the 17th code we've issued," compute `HMAC-SHA-1(secret, counter=17)`, truncate the result to 6 decimal digits, and compare.

The problem with HOTP is desync. If the client generates code #18 but the server only received up to #16, you end up with a drifting counter that needs a resync window.

TOTP (RFC 6238) solves this by replacing the counter with time:

```
counter = floor(unix_timestamp / 30)
code    = truncate(HMAC-SHA-1(secret, counter)) mod 10^6
```

The counter now advances automatically every 30 seconds on both sides. No desync to manage — just clock drift to tolerate.

## The Full Enrollment Flow

When you enable 2FA on a website, this is what happens under the hood:

1. **Server generates a secret.** Usually 160 bits of random data (the SHA-1 output size), Base32-encoded so it fits in a QR code and is human-typable.
2. **Server encodes the secret in an `otpauth://` URI:**
   ```
   otpauth://totp/Acme:alice@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Acme&algorithm=SHA1&digits=6&period=30
   ```
3. **Server renders that URI as a QR code.** You can produce one yourself with the [QR Code Generator](/tools/qr-code-generator) — paste any `otpauth://` URI and scan the image.
4. **Your authenticator app scans and stores the secret.** From that moment on, it can compute codes without talking to the server.
5. **Server asks you to confirm by entering the current code.** This proves the transfer worked before the server commits the secret to your account.

The entire security of the scheme rests on Step 1 and Step 4 — if anyone else sees the QR code or the Base32 secret, they can generate the same codes forever.

## Why It Still Uses SHA-1

People occasionally panic when they notice `algorithm=SHA1` in the URI. SHA-1 is broken for collision resistance (Shattered, 2017) — so why is authentication built on it?

Because TOTP doesn't need collision resistance. It needs an HMAC that can't be forged without the key. HMAC-SHA-1 is still considered secure for message authentication: every published SHA-1 attack targets the unkeyed hash, not HMAC. And the TOTP output is further truncated from 160 bits to 6 decimal digits — roughly 20 bits. An attacker who could somehow recover the HMAC output gains no advantage.

RFC 6238 allows SHA-256 and SHA-512, and newer apps sometimes default to them. But SHA-1 is still the interoperable default. Most authenticator apps don't even surface the algorithm field in the UI.

## The Gotchas Implementers Hit

**Clock drift.** A user's phone can easily be ±60 seconds off. If the server checks only the current 30-second window, it will reject valid codes from users with drifted clocks. RFC 6238 recommends accepting the previous and next window as well — a ±90 second tolerance. Be explicit about this in your code; many libraries default to a tight window.

**Replay.** A code is valid for up to 90 seconds (with drift tolerance). If an attacker phishes one and reuses it immediately, nothing in the algorithm stops them. The fix is server-side: record the last successfully-used code per user and reject any reuse.

**Backup codes are mandatory.** TOTP secrets can't be "reset." If a user loses their phone and didn't store backup codes or a recovery key, their account is locked. Every 2FA implementation needs a well-designed backup-code flow — single-use, stored hashed, generated in a batch of 8–10 at enrollment.

**Secret storage on the server.** The shared secret is symmetric — losing your database means losing everyone's 2FA. Encrypt TOTP secrets at rest with a KMS key, never with a config-file constant.

You can generate and verify codes for any Base32 secret with the [TOTP Generator](/tools/totp-generator) — handy when debugging enrollment flows or confirming that a server library is computing the same code your app is.

## TOTP vs the Alternatives

| Method | Pros | Cons |
|---|---|---|
| **SMS codes** | Easy; no app | Vulnerable to SIM-swap and SS7 attacks. NIST deprecated SMS 2FA in 2017. |
| **TOTP** | Offline; works everywhere | Shared secret; phishable (user types the code into a fake site). |
| **Push-based** (Duo, Okta Verify) | Better UX; tied to a registered device | Requires an online authenticator and vendor infrastructure. |
| **WebAuthn / Passkeys** | Phishing-resistant; no typed code | Device-bound; slower ecosystem adoption. |

TOTP's remaining weak point is that it's still **phishable** — a look-alike login page can capture the 6-digit code along with the password and replay both within the 30-second window. WebAuthn (FIDO2) is immune to this because the browser signs a challenge bound to the origin. If you're designing a new system in 2026, offer TOTP as a fallback but promote passkeys as the primary second factor.

## Try It Now

Compute the current TOTP code for any Base32 secret with the [TOTP Generator](/tools/totp-generator) — useful when wiring up a new authenticator app or debugging why a user's codes aren't being accepted. To test full enrollment QR codes, the [QR Code Generator](/tools/qr-code-generator) will render any `otpauth://` URI as a scannable image.
