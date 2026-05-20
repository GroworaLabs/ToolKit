---
title: "Password Policies for Modern Web Apps: What the Research Actually Says"
description: "Most password policies are based on outdated advice. NIST revised its guidelines in 2017 and 2024 — this guide explains what changed, why complexity rules backfire, and how to implement a policy that actually improves security."
category: "Security"
tools: ["password-generator", "password-strength-checker"]
tags: ["passwords", "security", "authentication", "nist", "web app", "hashing", "bcrypt"]
publishedAt: "2026-05-20"
author: "marcus-chen"
---

For two decades, the dominant password policy was: require uppercase, lowercase, a number, and a special character, and force a change every 90 days. This policy is everywhere — banking apps, enterprise software, government systems. It is also, according to NIST's 2017 guidelines and a substantial body of academic research, largely counterproductive.

The 2024 update to NIST SP 800-63B made the new guidance clearer than ever. This guide explains what the research says, what the new guidelines require, and how to implement a policy that genuinely makes your application harder to compromise.

---

## Why the Traditional Policy Backfires

The uppercase-number-symbol requirement was designed with a reasonable intuition: make passwords more complex and they become harder to guess. The problem is how users respond to the requirement.

When forced to include a capital letter, most users capitalise the first character. When forced to include a number, most users append `1` or `123` at the end. When forced to include a symbol, most use `!` or `@`. The result is passwords like `Password1!`, `Welcome2024!`, and `Summer@1` — patterns that automated cracking tools know to target first.

**Complexity requirements reduce entropy in practice.** A truly random 8-character password including uppercase, lowercase, digits, and symbols has about 52 bits of entropy. But the subset of passwords that real users create within those constraints has far less — attackers exploit the predictable transformation patterns directly.

**Mandatory rotation creates predictable sequences.** When users are told to change their password every 90 days, research shows they typically change `Password1!` to `Password2!`, then `Password3!`. The policy that was supposed to limit the damage from a breach instead trains users to make each successive password easier to guess than the last.

---

## What NIST SP 800-63B Actually Recommends

NIST's digital identity guidelines, last updated in 2024, reversed most of the traditional advice:

| Old recommendation | NIST 800-63B position |
|---|---|
| Require complexity (uppercase, symbols, digits) | Do NOT impose complexity requirements |
| Force password rotation on a schedule | Do NOT require periodic rotation without evidence of compromise |
| Maximum password length of 8–12 characters | Minimum 8 characters; allow at least 64 characters |
| Show password strength meters | Should be provided |
| Block common passwords | Required — check against known breached password lists |
| Allow paste into password fields | Required — do not disable paste |

The one addition NIST explicitly requires: **check new passwords against lists of known compromised passwords** (Have I Been Pwned's API, common password lists). A 20-character passphrase is not secure if it is `CorrectHorseBatteryStaple` and appears in every cracking dictionary.

---

## Designing a Policy That Works

**Minimum length: 12–15 characters, not 8.** NIST's minimum is 8, but that is a floor, not a target. Modern GPU-based crackers can exhaust all 8-character passwords in hours. A 12-character minimum significantly raises the bar for offline attacks while still being achievable for most users.

**Maximum length: 64+ characters.** Arbitrary short maximum lengths (some apps cap at 20 characters) hurt users who want to use passphrases or password managers. The only technical reason to limit length is hashing cost — which is controlled separately by bcrypt's work factor.

**Disallow known breached passwords.** The Have I Been Pwned API supports k-anonymity lookups: your app sends the first 5 hex characters of the SHA-1 hash, the API returns all matching hashes, and you check locally. The password never leaves your server.

```javascript
const crypto = require('crypto');

async function isCompromised(password) {
  const hash = crypto.createHash('sha1')
    .update(password)
    .digest('hex')
    .toUpperCase();

  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);

  const response = await fetch(
    `https://api.pwnedpasswords.com/range/${prefix}`,
    { headers: { 'Add-Padding': 'true' } }
  );
  const text = await response.text();

  return text.split('\n').some(line => line.startsWith(suffix));
}

// In your registration/password-change handler:
if (await isCompromised(newPassword)) {
  return res.status(400).json({
    error: 'This password has appeared in a data breach. Please choose a different password.'
  });
}
```

**Show a strength meter, but make it accurate.** A visual strength indicator that reflects actual entropy (not just whether the required characters are present) helps users make better choices. Use the [Password Strength Checker](/tools/password-strength-checker) to see how entropy and crack-time estimates are calculated, or use the [Password Generator](/tools/password-generator) to generate strong passwords for testing your policy.

The `zxcvbn` library (Dropbox, open source) is the industry standard for client-side strength estimation — it analyses patterns, dictionary words, common substitutions, and keyboard sequences:

```javascript
import zxcvbn from 'zxcvbn';

const result = zxcvbn(password);
// result.score: 0 (weak) to 4 (strong)
// result.crack_times_display.offline_slow_hashing_1e4_per_second
// result.feedback.suggestions: ["Add another word or two.", ...]
```

Do not tie the submit button to a specific zxcvbn score — that reintroduces the same problem as complexity requirements (users game the meter). Use it to *inform*, not to *block* beyond a clear minimum threshold.

---

## Storing Passwords: bcrypt, Argon2, scrypt

The most critical implementation decision is how you hash passwords before storing them. This is where many applications make catastrophic mistakes — MD5 and SHA-256 are wrong answers, even when salted.

**Why general-purpose hash functions are wrong for passwords:**

SHA-256 can hash 10 billion passwords per second on a modern GPU. Bcrypt, designed in 1999 specifically to be slow, hashes about 15,000 per second at work factor 12. Argon2 (winner of the Password Hashing Competition, 2015) adds memory hardness — an attacker needs not just time but RAM, which is expensive to parallelise.

**The right options in 2026:**

| Algorithm | Recommended work factor | Notes |
|---|---|---|
| bcrypt | cost 12 (2026), increase as hardware improves | Max 72 bytes input — not suitable for very long passwords without pre-hashing |
| Argon2id | time=2, memory=64MB, parallelism=1 | NIST recommended since 2022; preferred over bcrypt for new systems |
| scrypt | N=32768, r=8, p=1 | Memory-hard; less widely supported in libraries than Argon2 |

```javascript
// bcrypt (Node.js)
const bcrypt = require('bcrypt');

const BCRYPT_ROUNDS = 12;

async function hashPassword(plaintext) {
  return bcrypt.hash(plaintext, BCRYPT_ROUNDS);
}

async function verifyPassword(plaintext, hash) {
  return bcrypt.compare(plaintext, hash);
}
```

```javascript
// Argon2id (Node.js — argon2 package)
const argon2 = require('argon2');

async function hashPassword(plaintext) {
  return argon2.hash(plaintext, {
    type: argon2.argon2id,
    memoryCost: 65536,   // 64 MB
    timeCost: 2,
    parallelism: 1,
  });
}

async function verifyPassword(plaintext, hash) {
  return argon2.verify(hash, plaintext);
}
```

**The bcrypt 72-byte truncation issue:** bcrypt silently truncates input at 72 bytes. A 100-character password and the same 100-character password with an extra character appended will hash identically if both exceed 72 bytes. If you want to support passwords longer than 72 characters with bcrypt, pre-hash with SHA-256 first:

```javascript
async function hashPasswordSafe(plaintext) {
  // Pre-hash to handle inputs longer than 72 bytes
  const prehashed = crypto.createHash('sha256').update(plaintext).digest('base64');
  return bcrypt.hash(prehashed, BCRYPT_ROUNDS);
}
```

---

## Rate Limiting and Account Lockout

Hashing alone is not enough — you also need to prevent online brute-force attacks against your login endpoint.

**Throttling and lockout options:**

```javascript
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

// Hard limit: 10 login attempts per 15 minutes per IP
const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts. Try again in 15 minutes.' },
});

// Soft limit: slow down after 3 attempts (adds 500ms delay per attempt)
const loginSlowDown = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 3,
  delayMs: () => 500,
});

app.post('/login', loginSlowDown, loginRateLimit, handleLogin);
```

**Account lockout vs progressive delay:**

Hard lockout (block after N failures) is vulnerable to denial-of-service — an attacker can lock out any user by deliberately failing logins for that account. Progressive delay (each failure adds wait time) is harder to abuse while still slowing brute-force attacks. Use IP-based rate limiting as the primary defence; per-account lockout only after 100+ failures with a self-service unlock path.

---

## The Password Reset Flow

Password reset is frequently the weakest link in authentication. Common mistakes:

- **Security questions** as a second factor — easily guessable from social media profiles. Remove them entirely.
- **Reset tokens stored in plain text** — if your database is breached, attackers can use all outstanding reset tokens. Hash them the same way you hash passwords, or use a short expiry window.
- **Long-lived reset links** — a reset link valid for 24 hours is 24 hours of exposure. 15–60 minutes is typical; 10 minutes is appropriate for high-security applications.
- **Not invalidating the token after first use** — once a user sets a new password, the reset token should be consumed.

```javascript
const crypto = require('crypto');

async function generateResetToken(userId) {
  const token = crypto.randomBytes(32).toString('hex');
  const hash = crypto.createHash('sha256').update(token).digest('hex');
  const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  await db.passwordResets.create({
    userId,
    tokenHash: hash,
    expiresAt: expiry,
    used: false,
  });

  return token; // Send this in the email — never store the raw token
}
```

---

## Multi-Factor Authentication and Password Policy

NIST's 2024 guidelines make an important connection between MFA and password policy: when users are protected by a second factor, the password policy can and should be relaxed. Specifically, NIST states that if MFA is in use, the password minimum can be as low as 8 characters and complexity rules are even less justified.

The reasoning is straightforward. A 12-character password without MFA is the only barrier. An 8-character password *with* TOTP or hardware key is protected by two independent mechanisms — the attacker must compromise both simultaneously. The overall security is higher than a 16-character password alone.

**Practical policy tiers:**

| MFA status | Minimum password length | Complexity rules | Rotation |
|---|---|---|---|
| No MFA | 12 characters | None — check breach lists | Only on compromise |
| TOTP-based MFA | 8 characters | None | Only on compromise |
| Hardware key (WebAuthn) | Passphrase optional | Not applicable | Not applicable |

Implementing TOTP in your app: the [TOTP Generator](/tools/totp-generator) demonstrates the TOTP algorithm — time-based one-time passwords using RFC 6238, compatible with Google Authenticator, Authy, and hardware tokens. For implementation, the `otplib` library (Node.js) handles enrollment, QR code generation, and verification.

**WebAuthn / Passkeys:** The long-term trajectory of authentication is passwordless. WebAuthn allows users to authenticate with a platform authenticator (Face ID, Touch ID, Windows Hello) or a hardware key (YubiKey). The credential is a public-key pair — there is no shared secret and no password to breach. Support is now in all major browsers and OS platforms. Libraries: `@simplewebauthn/server` (Node.js), `py_webauthn` (Python).

---

## Framework-Specific Implementation Notes

**Django:** Use `django.contrib.auth`'s built-in validators. The `NumericPasswordValidator`, `CommonPasswordValidator`, and `MinimumLengthValidator` are available out of the box. Add a custom validator for Have I Been Pwned checks:

```python
# settings.py
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
     'OPTIONS': {'min_length': 12}},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'myapp.validators.PwnedPasswordValidator'},
]
```

**Rails:** Use `devise` with `pwned` gem for breach checking:

```ruby
# Gemfile
gem 'devise', gem 'pwned'

# User model
class User < ApplicationRecord
  devise :database_authenticatable, :pwned_password
  validates :password, length: { minimum: 12 }
end
```

**Express with Passport.js:** Validation belongs in the route handler, before `passport.authenticate()`. Use `zxcvbn` for strength checking and the `pwned` npm package for breach detection. The `express-rate-limit` middleware, shown earlier in this guide, handles brute-force protection on the login route.

---

## Policy Summary: What to Implement in 2026

- Minimum 12 characters, no maximum below 64
- No complexity requirements beyond minimum length
- No periodic forced rotation — only require change on evidence of compromise
- Check against Have I Been Pwned on registration and password change
- Hash with Argon2id (preferred) or bcrypt cost 12+ — never MD5, SHA-1, or unsalted SHA-256
- Show a password strength meter that reflects actual entropy
- Allow paste into password fields — breaking this breaks password managers
- Rate limit login attempts by IP and user identifier
- Reset tokens expire in 15–60 minutes and are invalidated after first use
