---
title: "How to Generate and Sign JWTs: A Practical Developer Guide"
description: "Step-by-step guide to creating JSON Web Tokens from scratch — choosing the right algorithm, signing securely, setting claims correctly, and avoiding the implementation mistakes that leak data or break authentication."
category: "Security"
tools: ["jwt-generator", "jwt-decoder"]
tags: ["jwt", "authentication", "security", "tokens", "api", "signing"]
publishedAt: "2026-05-22"
author: "marcus-chen"
---

Generating a JWT is three lines of code in any modern framework. Getting JWT generation right — choosing the correct algorithm, setting sensible claims, protecting the signing key, and avoiding the subtle mistakes that make tokens forgeable or leaky — takes considerably more thought.

This guide covers the complete picture: what goes into a JWT, how to generate and sign one in multiple languages, how to decode and verify incoming tokens, and the implementation patterns that engineers get wrong most often.

---

## JWT Structure: What You Are Actually Signing

A JWT is three Base64URL-encoded JSON objects joined by dots:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEyMyIsImlhdCI6MTcxNjM4MDgwMCwiZXhwIjoxNzE2MzgxNDAwfQ.4Hvb8aOmVeVkdS3j1kT0vPcK9WxNqR2mZoLbCsYtDfE
```

**Header** (algorithm and type):

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Payload** (claims — the data you are asserting):

```json
{
  "sub": "user_123",
  "iat": 1716380800,
  "exp": 1716381400
}
```

**Signature** — the HMAC or RSA/EC signature over `base64url(header) + "." + base64url(payload)`.

The signature prevents tampering with the header or payload. It does **not** encrypt the payload — the claims are visible to anyone who holds the token. Never put secrets, passwords, or sensitive PII in a JWT payload unless the token is additionally encrypted (JWE).

Use the [JWT Decoder](/tools/jwt-decoder) to inspect any token's header and claims without needing a key, and the [JWT Generator](/tools/jwt-generator) to create signed tokens directly in the browser for testing.

---

## Choosing a Signing Algorithm

The algorithm choice is the most consequential decision in JWT generation.

### HMAC (HS256, HS384, HS512) — Symmetric

HMAC algorithms use a shared secret. The same key signs and verifies.

```
signature = HMAC-SHA256(base64url(header) + "." + base64url(payload), secret)
```

**Use when:** you control both the token issuer (signs) and the token consumer (verifies), and both run in environments you trust — for example, a stateless API and its own services.

**Do not use when:** multiple services verify the token, or you need to share the verification capability without sharing signing capability. Any party that can verify an HS256 token can also forge one.

**Key size:** at least 256 bits (32 bytes) for HS256, 384 bits for HS384, 512 bits for HS512. The bit count in the algorithm name is the minimum key size for full security.

### RSA (RS256, RS384, RS512) — Asymmetric

RSA algorithms use a private key to sign and a public key to verify.

**Use when:** multiple services need to verify tokens, or you need to publish verification keys (via JWKS endpoint). The verifier never needs the private key.

**Key size:** minimum 2048 bits; 3072 or 4096 bits for long-term security.

**Downside:** RSA key generation and signing are slower than HMAC. For high-throughput systems, this matters.

### ECDSA (ES256, ES384, ES512) — Asymmetric, Smaller Keys

ECDSA provides the same asymmetric property as RSA with much smaller keys:

- ES256 uses P-256 — 256-bit key, roughly equivalent to RSA-3072 in security
- ES384 uses P-384
- ES512 uses P-521

**Use when:** you want asymmetric signing with better performance than RSA and smaller token sizes.

### Algorithm Summary

| Algorithm | Key type | Who can verify | Key size | Speed |
|---|---|---|---|---|
| HS256 | Shared secret | Anyone with the secret | 256+ bits | Very fast |
| HS384 | Shared secret | Anyone with the secret | 384+ bits | Fast |
| HS512 | Shared secret | Anyone with the secret | 512+ bits | Fast |
| RS256 | RSA private/public | Anyone with public key | 2048+ bits | Slower |
| ES256 | ECDSA private/public | Anyone with public key | 256 bits | Fast |

**Practical choice for most projects:** HS256 for internal services with a single verifier; RS256 or ES256 when multiple services verify tokens or you publish a JWKS endpoint.

---

## Generating Tokens in Code

### Node.js with `jsonwebtoken`

```javascript
const jwt = require('jsonwebtoken');

// HS256 — symmetric
const secret = process.env.JWT_SECRET; // 32+ random bytes, from env

const token = jwt.sign(
  {
    sub: 'user_123',        // subject — who the token is about
    name: 'Alice Example',
    role: 'admin',
    // iat (issued-at) is added automatically by default
  },
  secret,
  {
    algorithm: 'HS256',
    expiresIn: '15m',       // use short-lived tokens
    issuer: 'auth.yourapp.com',
    audience: 'api.yourapp.com',
  }
);

console.log(token);
// → eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

```javascript
// RS256 — asymmetric
const fs = require('fs');

const privateKey = fs.readFileSync('private.pem');

const token = jwt.sign(
  { sub: 'user_123', role: 'viewer' },
  privateKey,
  {
    algorithm: 'RS256',
    expiresIn: '1h',
    issuer: 'auth.yourapp.com',
  }
);
```

**Verifying:**

```javascript
// HS256 verification
try {
  const payload = jwt.verify(token, secret, {
    algorithms: ['HS256'],   // always specify — prevents algorithm confusion attack
    issuer: 'auth.yourapp.com',
    audience: 'api.yourapp.com',
  });
  console.log(payload.sub); // 'user_123'
} catch (err) {
  if (err.name === 'TokenExpiredError') {
    // Token has expired — prompt re-login
  } else if (err.name === 'JsonWebTokenError') {
    // Invalid token — reject the request
  }
}
```

```javascript
// RS256 verification — only needs the public key
const publicKey = fs.readFileSync('public.pem');

const payload = jwt.verify(token, publicKey, {
  algorithms: ['RS256'],
});
```

### Python with `PyJWT`

```python
import jwt
import os
from datetime import datetime, timedelta, timezone

secret = os.environ['JWT_SECRET']  # load from environment, never hardcode

# Generate
payload = {
    'sub': 'user_123',
    'name': 'Alice Example',
    'role': 'admin',
    'iat': datetime.now(timezone.utc),
    'exp': datetime.now(timezone.utc) + timedelta(minutes=15),
    'iss': 'auth.yourapp.com',
    'aud': 'api.yourapp.com',
}

token = jwt.encode(payload, secret, algorithm='HS256')

# Verify
try:
    decoded = jwt.decode(
        token,
        secret,
        algorithms=['HS256'],      # always specify
        audience='api.yourapp.com',
        issuer='auth.yourapp.com',
    )
    user_id = decoded['sub']
except jwt.ExpiredSignatureError:
    # Token expired
    pass
except jwt.InvalidTokenError:
    # Invalid token — reject
    pass
```

### Go with `golang-jwt/jwt`

```go
package main

import (
    "fmt"
    "os"
    "time"

    "github.com/golang-jwt/jwt/v5"
)

var secret = []byte(os.Getenv("JWT_SECRET"))

type Claims struct {
    Role string `json:"role"`
    jwt.RegisteredClaims
}

// Generate
func generateToken(userID, role string) (string, error) {
    claims := Claims{
        Role: role,
        RegisteredClaims: jwt.RegisteredClaims{
            Subject:   userID,
            IssuedAt:  jwt.NewNumericDate(time.Now()),
            ExpiresAt: jwt.NewNumericDate(time.Now().Add(15 * time.Minute)),
            Issuer:    "auth.yourapp.com",
            Audience:  []string{"api.yourapp.com"},
        },
    }
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString(secret)
}

// Verify
func verifyToken(tokenStr string) (*Claims, error) {
    token, err := jwt.ParseWithClaims(tokenStr, &Claims{}, func(t *jwt.Token) (interface{}, error) {
        // Reject non-HMAC algorithms — prevents algorithm confusion
        if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
        }
        return secret, nil
    })
    if err != nil {
        return nil, err
    }
    claims, ok := token.Claims.(*Claims)
    if !ok || !token.Valid {
        return nil, fmt.Errorf("invalid token")
    }
    return claims, nil
}
```

---

## Standard Claims: What to Set and Why

JWT defines a set of standard claim names (registered claims). You are not required to use them, but you should — they are what JWT verification libraries know how to check automatically.

| Claim | Name | Format | Purpose |
|---|---|---|---|
| `sub` | Subject | String | User or entity the token represents — usually user ID |
| `iss` | Issuer | String (URI) | Who issued the token — your auth server URL |
| `aud` | Audience | String or array | Who should accept the token — your API or service |
| `exp` | Expiration | NumericDate (Unix) | When the token expires — always set this |
| `iat` | Issued At | NumericDate (Unix) | When the token was issued |
| `nbf` | Not Before | NumericDate (Unix) | Token is not valid before this time |
| `jti` | JWT ID | String | Unique ID for this token — needed for revocation |

**Always set `exp`.** A token without an expiration never expires and cannot be invalidated short of changing the signing key. Typical values:

- Access tokens: 5–15 minutes
- Refresh tokens: 7–30 days (stored server-side or in httpOnly cookie)
- API keys (long-lived JWTs): 90 days maximum, with rotation

**Set `iss` and `aud` and verify them.** Without issuer and audience checks, a token issued for one service can be replayed against a different service that uses the same algorithm and key — an audience confusion attack.

---

## Key Management: The Part That Actually Gets Exploited

The cryptography in JWT signing is sound. The exploited vulnerabilities are almost always in key management:

### Generate keys securely

```bash
# HS256 secret — 32 cryptographically random bytes
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# RSA key pair — 2048-bit minimum, 3072 recommended
openssl genrsa -out private.pem 3072
openssl rsa -in private.pem -pubout -out public.pem

# ECDSA key pair (ES256 — P-256 curve)
openssl ecparam -genkey -name prime256v1 -noout -out ec-private.pem
openssl ec -in ec-private.pem -pubout -out ec-public.pem
```

### Never hardcode keys in source code

```javascript
// Wrong — key committed to git, leaked in every fork and clone
const secret = 'my-super-secret-key-1234';

// Correct — loaded from environment at runtime
const secret = process.env.JWT_SECRET;
if (!secret || secret.length < 32) {
  throw new Error('JWT_SECRET must be set and at least 32 characters');
}
```

Use a secrets manager (AWS Secrets Manager, HashiCorp Vault, Doppler) in production. `.env` files are acceptable in development but should never be committed.

### Rotate keys

Long-lived signing keys are high-value targets. Implement key rotation:

1. Generate a new key and add it to the verification key set (JWKS or config)
2. Start signing new tokens with the new key (set `kid` header to identify which key)
3. Continue accepting tokens signed with the old key until they all expire
4. Remove the old key from the verification set

This allows zero-downtime rotation without invalidating active user sessions.

---

## Critical Security Mistakes

### The `alg: none` attack

Early JWT libraries allowed `alg: none` in the header — meaning the token was not signed at all. An attacker could forge any token by modifying the payload and setting `alg: none`.

All modern libraries disable this by default. But always verify that your verification code specifies the allowed algorithms explicitly:

```javascript
// Wrong — accepts any algorithm, including none
jwt.verify(token, secret);

// Correct — only accepts HS256
jwt.verify(token, secret, { algorithms: ['HS256'] });
```

### Symmetric/asymmetric confusion

Some older implementations accepted either a symmetric or asymmetric key for verification depending on the `alg` header. An attacker could take an RS256 public key (public knowledge) and use it as an HS256 secret to forge tokens that verify successfully.

Always specify the exact algorithm(s) you accept during verification.

### Storing sensitive data in the payload

The JWT payload is Base64URL-encoded, not encrypted. Anyone who holds the token can decode and read every claim. The [JWT Decoder](/tools/jwt-decoder) demonstrates this — paste any JWT and every claim is immediately visible.

Do not store passwords, credit card numbers, government IDs, or other sensitive data in JWT claims. Store a user ID and look up what you need from your database.

### Not checking expiration on the server

Some implementations decode the token but only check the `exp` claim on the client side. Always verify `exp` server-side on every request. JWT libraries do this automatically when you call `verify()` (not `decode()`). Never use `decode()` on untrusted tokens.

### Using JWTs for session revocation without a blocklist

JWTs are stateless by design — the server does not store them. This means you cannot invalidate a token before it expires without additional infrastructure. If a user logs out or their account is compromised, the token remains valid until `exp`.

Solutions:
- Short expiration times + refresh tokens (the standard pattern)
- Token blocklist stored in Redis — store revoked `jti` values until their `exp`, check on every request
- Short expiration with server-side refresh token rotation

---

## Generating Tokens for Testing

Use the [JWT Generator](/tools/jwt-generator) to create signed tokens directly in the browser — useful for:

- Testing API endpoints that require a valid JWT without setting up an auth server
- Verifying your token parsing and claim extraction code with known inputs
- Generating expired or malformed tokens to test your error handling
- Creating tokens with custom claims to exercise your authorisation logic

For production tokens, always generate them in server-side code with keys loaded from environment variables — never in the browser.
