---
title: "HMAC Authentication: How to Verify API Request Integrity"
description: "HMAC turns a shared secret into a tamper-proof signature for every API call. This guide explains how webhooks and payment APIs use it, how to implement it correctly, and the mistakes that make it useless."
category: "Security"
tools: ["hmac-generator"]
tags: ["hmac", "api security", "webhooks", "authentication", "cryptography", "integrity"]
publishedAt: "2026-05-20"
author: "marcus-chen"
---

Payment providers, webhook senders, and internal microservice networks all face the same problem: how does a receiving service know that the message it just received actually came from the sender it trusts, and was not tampered with in transit?

TLS solves eavesdropping — it encrypts the data in flight. But TLS does not prove that the message originated from a specific party. A man-in-the-middle who has compromised a network hop can still replay old messages, or a misconfigured proxy can forward a request from the wrong source. HMAC solves the origin and integrity problem that TLS does not.

This guide explains how HMAC authentication works, how major APIs implement it, and how to implement it correctly in your own services.

---

## What HMAC Actually Does

HMAC stands for Hash-based Message Authentication Code. It is a construction that uses a cryptographic hash function (typically SHA-256 or SHA-512) with a shared secret key to produce a fixed-length signature of a message.

The formula is:

```
HMAC(K, m) = H((K' ⊕ opad) || H((K' ⊕ ipad) || m))
```

Where `H` is the hash function, `K'` is the key padded to the block size, `opad` and `ipad` are fixed padding constants, and `||` is concatenation. You do not need to understand this formula to use HMAC — but the key properties it produces are important:

1. **Deterministic.** The same key and message always produce the same signature.
2. **Unforgeable without the key.** Without the secret, an attacker cannot produce a valid signature — even knowing the message and the signature.
3. **Tamper-evident.** Any change to the message, even a single byte, produces a completely different signature.
4. **Fast.** HMAC-SHA256 can sign millions of messages per second on modern hardware.

Use the [HMAC Generator](/tools/hmac-generator) to compute HMAC-SHA256 and HMAC-SHA512 signatures directly in the browser — useful for debugging webhook implementations or verifying expected values in test suites.

---

## How Webhooks Use HMAC

Webhooks are HTTP callbacks: your server sends an HTTP POST to a customer's URL when an event occurs. Without verification, anyone who discovers that URL can send fake events — fake payment confirmations, fake order completions, fake password resets.

HMAC webhook signatures solve this. The flow:

1. You and the customer agree on a shared secret (provided in your dashboard).
2. When sending a webhook, your server computes `HMAC-SHA256(secret, request_body)`.
3. You include the signature in a request header: `X-Signature: sha256=<hex_digest>`.
4. The customer's server receives the request, computes the same HMAC using the same secret and the raw request body, and compares it to the header value.
5. If they match, the request is authentic. If they do not, it is rejected.

```
Sender                              Receiver
  │                                    │
  │  POST /webhooks/payment            │
  │  X-Signature: sha256=a3b2c1...     │
  │  Body: {"event":"payment.success"} │
  │ ─────────────────────────────────► │
  │                                    │ 1. Compute HMAC(secret, body)
  │                                    │ 2. Compare to X-Signature header
  │                                    │ 3. If match: process event
  │                                    │    If no match: return 401
```

### Stripe's Webhook Signature

Stripe is the canonical example. Their `Stripe-Signature` header contains a timestamp and multiple signatures:

```
Stripe-Signature: t=1492774577,v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a05bd539
```

The `t=` timestamp is critical — it prevents replay attacks. Stripe signs `timestamp + "." + request_body`, so even if an attacker captures a valid webhook, they cannot replay it after the tolerance window (typically 300 seconds):

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/webhooks/stripe', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,          // raw Buffer — must not be parsed before this point
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Event is verified — process it
  switch (event.type) {
    case 'payment_intent.succeeded':
      handlePaymentSuccess(event.data.object);
      break;
  }

  res.json({ received: true });
});
```

**The critical detail:** you must use the raw body, not the parsed JSON body. Express's `express.json()` middleware parses and re-serialises the body, which can change whitespace and key ordering and break the HMAC. Always use `express.raw()` or the equivalent for webhook routes.

---

## Implementing HMAC in Your Own API

If you are building an API that needs request authentication — an internal service-to-service API, a webhook sender, or a public API with strict security requirements — here is a production-grade implementation pattern.

### The Signature Scheme

A minimal scheme:

```
signature = HMAC-SHA256(secret, method + "\n" + path + "\n" + timestamp + "\n" + body)
```

A more robust scheme (similar to AWS Signature Version 4):

```
string_to_sign = timestamp + "\n" + hex(SHA256(canonical_request))
canonical_request = method + "\n" + path + "\n" + sorted_query_params + "\n" + sorted_headers + "\n" + hex(SHA256(body))
signature = HMAC-SHA256(derived_key, string_to_sign)
```

For most internal APIs, the minimal scheme is sufficient. The AWS-style scheme is appropriate when you need to handle large request bodies, multiple signed headers, and query parameter signing.

### Node.js Implementation

```javascript
const crypto = require('crypto');

// Signing a request (sender side)
function signRequest(secret, method, path, timestamp, body) {
  const payload = [method.toUpperCase(), path, timestamp, body].join('\n');
  return crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');
}

// Attaching the signature to an outgoing request
async function callProtectedAPI(url, body) {
  const method = 'POST';
  const path = new URL(url).pathname;
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const bodyStr = JSON.stringify(body);

  const signature = signRequest(
    process.env.API_SHARED_SECRET,
    method, path, timestamp, bodyStr
  );

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Timestamp': timestamp,
      'X-Signature': `sha256=${signature}`,
    },
    body: bodyStr,
  });

  return response.json();
}
```

```javascript
// Verifying a request (receiver side)
function verifyRequest(req) {
  const signature = req.headers['x-signature']?.replace('sha256=', '');
  const timestamp = req.headers['x-timestamp'];
  const body = req.rawBody;  // must be raw string, not parsed

  if (!signature || !timestamp) return false;

  // Reject requests older than 5 minutes (replay attack prevention)
  const age = Math.floor(Date.now() / 1000) - parseInt(timestamp, 10);
  if (age > 300 || age < -30) return false;

  const expected = signRequest(
    process.env.API_SHARED_SECRET,
    req.method,
    req.path,
    timestamp,
    body
  );

  // Timing-safe comparison — prevents timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expected, 'hex')
  );
}
```

### Python Implementation

```python
import hmac
import hashlib
import time

def sign_request(secret: str, method: str, path: str, timestamp: str, body: str) -> str:
    payload = '\n'.join([method.upper(), path, timestamp, body])
    return hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()

def verify_request(secret: str, method: str, path: str, timestamp: str,
                   body: str, received_signature: str) -> bool:
    # Reject stale requests
    age = int(time.time()) - int(timestamp)
    if not (-30 <= age <= 300):
        return False

    expected = sign_request(secret, method, path, timestamp, body)

    # Constant-time comparison
    return hmac.compare_digest(expected, received_signature)
```

---

## Critical Security Details

### Use `timingSafeEqual` for Comparison

Never compare HMAC signatures with `===` or `==`. Naive string comparison short-circuits as soon as it finds a mismatch — this leaks information about how many characters matched (a timing attack). Measure how long the comparison takes and you can learn the signature one character at a time.

```javascript
// Insecure — timing attack possible
if (receivedSignature === expectedSignature) { ... }

// Secure — always takes the same time regardless of match position
const received = Buffer.from(receivedSignature, 'hex');
const expected = Buffer.from(expectedSignature, 'hex');
if (received.length === expected.length && crypto.timingSafeEqual(received, expected)) { ... }
```

### Include a Timestamp and Reject Replays

Without a timestamp, HMAC only proves authenticity, not freshness. An attacker who captures a valid request can replay it indefinitely. Always include a timestamp in the signed payload and reject any request where the timestamp is more than 5 minutes old.

### Protect the Shared Secret

The security of HMAC depends entirely on the secrecy of the key. Treat HMAC secrets with the same care as passwords:

- Generate them with a cryptographically secure random number generator (use the [Random Token Generator](/tools/random-token-generator) for 256-bit keys).
- Store them in a secret manager, not in source code or `.env` committed to git.
- Rotate them on a schedule and immediately if compromised.
- Use different secrets for different customers and services — never share the same key.

### HMAC vs. Asymmetric Signatures

HMAC requires both parties to know the secret key — if you sign with a key, you can also forge with it. For webhooks where you are the sender, this is fine: you control the secret.

For situations where you need to prove a message came from a specific party without sharing a secret — for example, a customer signing requests to your API — use asymmetric signatures (Ed25519 or RSA-PSS). The sender holds a private key; you verify with their public key. The public key can be shared freely.

---

## Common HMAC Implementations Across Major APIs

| Service | Header | Algorithm | Extras |
|---|---|---|---|
| Stripe | `Stripe-Signature` | HMAC-SHA256 | Timestamp + replay window |
| GitHub Webhooks | `X-Hub-Signature-256` | HMAC-SHA256 | — |
| Shopify | `X-Shopify-Hmac-Sha256` | HMAC-SHA256 | Base64-encoded |
| Twilio | `X-Twilio-Signature` | HMAC-SHA1 | URL + sorted params |
| AWS SNS | SNS signature | RSA-SHA1 (not HMAC) | Certificate-based |
| Slack | `X-Slack-Signature` | HMAC-SHA256 | Version prefix + timestamp |

**Slack's format as a representative example:**

```javascript
// Slack constructs: "v0:" + timestamp + ":" + body
const baseString = `v0:${timestamp}:${rawBody}`;
const expected = 'v0=' + crypto.createHmac('sha256', signingSecret)
  .update(baseString).digest('hex');

const isValid = crypto.timingSafeEqual(
  Buffer.from(slackSignatureHeader),
  Buffer.from(expected)
);
```

---

## End-to-End Example: GitHub Webhook Verification

GitHub sends a webhook for every repository event — push, pull request, issue comment, workflow run. Each POST includes an `X-Hub-Signature-256` header containing `sha256=<HMAC-SHA256 signature>`. Here is a complete Express handler that verifies it correctly:

```javascript
const express = require('express');
const crypto = require('crypto');

const app = express();

// Webhook route: use raw body parser, not JSON
app.post('/webhooks/github', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-hub-signature-256'];
  const secret = process.env.GITHUB_WEBHOOK_SECRET;

  if (!signature || !secret) {
    return res.status(401).json({ error: 'Missing signature or secret' });
  }

  // Compute expected signature
  const expected = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(req.body)   // req.body is a Buffer when using express.raw()
    .digest('hex');

  // Constant-time comparison
  let isValid = false;
  try {
    isValid = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expected)
    );
  } catch {
    // timingSafeEqual throws if buffers differ in length
    isValid = false;
  }

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Safe to parse and process the event
  const event = JSON.parse(req.body.toString());
  const eventType = req.headers['x-github-event'];

  console.log(`Received GitHub event: ${eventType}`);

  switch (eventType) {
    case 'push':
      handlePush(event);
      break;
    case 'pull_request':
      handlePullRequest(event);
      break;
    default:
      console.log(`Unhandled event type: ${eventType}`);
  }

  res.status(200).json({ ok: true });
});
```

Two details worth highlighting: First, `timingSafeEqual` throws if the two buffers have different lengths — wrapping it in try/catch handles the case where the header value is malformed. Second, the body must be the raw `Buffer` from `express.raw()` — if you use `express.json()` on this route, the body is re-serialised and the signature will not match.

**Setting up the webhook secret:**

```bash
# Generate a strong secret — 256 bits of randomness
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# → paste this value into GitHub Settings → Webhooks → Secret
# → and into your environment as GITHUB_WEBHOOK_SECRET
```

Use the [HMAC Generator](/tools/hmac-generator) to manually verify: paste your secret and the raw request body (from GitHub's webhook delivery log), select SHA-256, and confirm the output matches the `X-Hub-Signature-256` header value. This is the fastest way to confirm your implementation is correct without deploying.

---

## Debugging HMAC Issues

When a signature check fails in development, the most common culprits are:

1. **Parsed body vs raw body.** If the body is parsed (JSON → object → re-serialised), whitespace and key order may change.
2. **Encoding mismatch.** One side encodes the signature as hex, the other as base64.
3. **Key encoding.** The secret is UTF-8 encoded on one side and hex-decoded on the other.
4. **Newline differences.** `\n` vs `\r\n` in the signed payload.
5. **Trailing newline.** Some `body` strings include a trailing newline; others do not.

Use the [HMAC Generator](/tools/hmac-generator) to compute the expected value manually with specific inputs and compare against what your code produces — it is the fastest way to isolate which variable is wrong.
