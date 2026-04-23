export default function JwtGeneratorContent() {
  return (
    <div className="tool-content">
      <h2>JWT Generator: How JWTs Work and How to Use Them Securely</h2>
      <p>
        JSON Web Tokens (JWTs) are the most widely used token format for stateless authentication in modern web applications. From REST API authorization to single sign-on (SSO) systems, JWTs appear in virtually every production backend. This guide explains the specification, the signing algorithms, the security properties, and the common pitfalls that cause production incidents.
      </p>

      <h3>Anatomy of a JWT</h3>
      <p>
        A JWT is a string of three Base64url-encoded segments separated by dots:
      </p>
      <pre><code>{`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIiwiaWF0IjoxNzE0MDAwMDAwLCJleHAiOjE3MTQwMDM2MDB9.abc123...`}</code></pre>
      <p>
        <strong>Part 1 — Header:</strong> A JSON object specifying the algorithm (<code>alg</code>) and token type (<code>typ</code>). Base64url-decoding the first segment above gives:
      </p>
      <pre><code>{`{ "alg": "HS256", "typ": "JWT" }`}</code></pre>
      <p>
        <strong>Part 2 — Payload:</strong> A JSON object containing claims — statements about the entity (typically a user) and additional data. Base64url-decoding gives:
      </p>
      <pre><code>{`{
  "sub": "1234567890",
  "name": "Alice",
  "iat": 1714000000,
  "exp": 1714003600
}`}</code></pre>
      <p>
        <strong>Part 3 — Signature:</strong> The HMAC (or RSA/ECDSA) signature over <code>base64url(header).base64url(payload)</code> using the secret key. The signature ensures the token has not been tampered with.
      </p>
      <p>
        The key point: the header and payload are <strong>not encrypted</strong> — they are merely encoded. Anyone who receives the token can read the payload. The signature only proves authenticity (the token was created by someone with the secret) and integrity (the payload has not been modified). Never put sensitive data in the payload.
      </p>

      <h3>Standard Claims (RFC 7519 Section 4)</h3>
      <p>
        The JWT specification defines a set of registered claim names. All are optional, but each serves a specific purpose:
      </p>
      <table>
        <thead>
          <tr><th>Claim</th><th>Name</th><th>Type</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>iss</code></td><td>Issuer</td><td>String</td><td>Who created the token (e.g. "https://auth.example.com")</td></tr>
          <tr><td><code>sub</code></td><td>Subject</td><td>String</td><td>Who the token is about (e.g. user ID "u-1234")</td></tr>
          <tr><td><code>aud</code></td><td>Audience</td><td>String/Array</td><td>Who should accept the token (e.g. "api.example.com")</td></tr>
          <tr><td><code>exp</code></td><td>Expiration</td><td>NumericDate</td><td>Unix timestamp after which the token is invalid</td></tr>
          <tr><td><code>nbf</code></td><td>Not Before</td><td>NumericDate</td><td>Unix timestamp before which the token must not be accepted</td></tr>
          <tr><td><code>iat</code></td><td>Issued At</td><td>NumericDate</td><td>Unix timestamp when the token was issued</td></tr>
          <tr><td><code>jti</code></td><td>JWT ID</td><td>String</td><td>Unique identifier; used to prevent replay attacks</td></tr>
        </tbody>
      </table>
      <p>
        Minimum viable JWT for authentication: include <code>sub</code> (who is authenticated), <code>iat</code> (when issued), and <code>exp</code> (when it expires). Always include <code>exp</code> — tokens without expiry are valid indefinitely, meaning a leaked token provides permanent access.
      </p>

      <h3>Signing Algorithms: HS256, HS384, HS512</h3>
      <p>
        HMAC-SHA algorithms use a single shared secret key for both signing and verification. The number indicates the SHA hash length used internally:
      </p>
      <ul>
        <li><strong>HS256</strong> — HMAC with SHA-256, 256-bit output. Most common; supported by all JWT libraries. Use this unless you have specific requirements.</li>
        <li><strong>HS384</strong> — HMAC with SHA-384, 384-bit output. Marginally more collision-resistant; rarely used.</li>
        <li><strong>HS512</strong> — HMAC with SHA-512, 512-bit output. Longest signature; best for high-security applications but the added security over HS256 is negligible for HMAC.</li>
      </ul>
      <p>
        For HMAC algorithms, the bottleneck is key length, not hash size. A 256-bit secret with HS256 provides the same security as a 256-bit secret with HS512. The difference only matters if your secret is shorter than the hash output length (which it should not be in production).
      </p>
      <p>
        <strong>Asymmetric alternatives</strong> (not implemented in this tool, but important to know):
      </p>
      <ul>
        <li><strong>RS256</strong> — RSA with SHA-256. Sign with a private key; verify with a public key. Essential for distributed systems where multiple services need to verify tokens without access to the signing secret.</li>
        <li><strong>ES256</strong> — ECDSA with SHA-256 and P-256 curve. Shorter signatures than RSA, faster verification. Preferred over RS256 for new systems.</li>
        <li><strong>EdDSA</strong> — Ed25519 signatures. Fastest and most secure asymmetric option; supported by modern libraries.</li>
      </ul>

      <h3>Secret Key Requirements</h3>
      <p>
        For HS256, your secret should be at least 256 bits (32 bytes) of random data. This matches the SHA-256 output size. A shorter key is technically valid per the spec but provides less security — a 64-bit key means only 2^64 possible keys, vulnerable to offline brute force.
      </p>
      <p>
        Generating a secure secret (use one of these approaches):
      </p>
      <pre><code>{`# Using OpenSSL (32 bytes = 256 bits, hex encoded)
openssl rand -hex 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using Python
python3 -c "import secrets; print(secrets.token_hex(32))"

# Using a password manager (e.g. 1Password) — generate a random 64-character string`}</code></pre>
      <p>
        Store the secret in environment variables (<code>JWT_SECRET</code>), a secrets manager (AWS Secrets Manager, HashiCorp Vault, Doppler), or a key management service (AWS KMS, Google Cloud KMS). Never hardcode it in source code.
      </p>

      <h3>Implementing JWT Verification (Server Side)</h3>
      <p>
        Generating a JWT is only half the story. Verification on the server is where security is enforced. Always use a well-maintained library rather than implementing verification yourself:
      </p>
      <pre><code>{`// Node.js — jsonwebtoken library
import jwt from 'jsonwebtoken';

// Verification (always verify before trusting claims)
try {
  const payload = jwt.verify(token, process.env.JWT_SECRET, {
    algorithms: ['HS256'],  // explicitly allowlist algorithms
    audience:   'api.example.com',
    issuer:     'https://auth.example.com',
  });
  console.log(payload.sub); // trusted user ID
} catch (err) {
  // TokenExpiredError, JsonWebTokenError, NotBeforeError
  return res.status(401).json({ error: 'Invalid token' });
}`}</code></pre>
      <pre><code>{`# Python — PyJWT library
import jwt

try:
    payload = jwt.decode(
        token,
        secret,
        algorithms=["HS256"],
        audience="api.example.com",
        issuer="https://auth.example.com",
    )
    user_id = payload["sub"]
except jwt.ExpiredSignatureError:
    raise HTTPException(status_code=401, detail="Token expired")
except jwt.InvalidTokenError:
    raise HTTPException(status_code=401, detail="Invalid token")`}</code></pre>

      <h3>The "alg: none" Vulnerability</h3>
      <p>
        One of the most infamous JWT security vulnerabilities: some early implementations accepted tokens with <code>"alg": "none"</code> in the header — meaning no signature was required. An attacker could modify the payload and set <code>alg</code> to <code>none</code> to bypass signature verification entirely.
      </p>
      <p>
        Mitigation: always explicitly specify which algorithms your verification code accepts, as shown in the examples above (<code>algorithms: ['HS256']</code>). Never use a library that defaults to accepting <code>alg: none</code>.
      </p>

      <h3>Access Tokens vs. Refresh Tokens</h3>
      <p>
        Production authentication systems use a two-token pattern:
      </p>
      <ul>
        <li><strong>Access token:</strong> Short-lived (15 minutes to 1 hour). Sent with every API request. If leaked, the damage window is limited to the token's remaining lifetime. Typically a JWT stored in memory (not persisted).</li>
        <li><strong>Refresh token:</strong> Long-lived (7–30 days). Stored securely (HttpOnly cookie). Used only to obtain new access tokens when the current one expires. Not sent with every API request — only to the token endpoint. If leaked, it can be revoked server-side by invalidating its record in the database.</li>
      </ul>
      <p>
        This pattern is sometimes called the "sliding session" or "silent refresh" pattern. The user appears to stay logged in indefinitely (because access tokens are silently refreshed), but the server can log out any user at any time by deleting their refresh token record.
      </p>

      <h3>JWT Storage: Cookies vs. localStorage</h3>
      <p>
        The right storage mechanism depends on your threat model:
      </p>
      <table>
        <thead>
          <tr><th>Storage</th><th>XSS resistant</th><th>CSRF resistant</th><th>Recommended for</th></tr>
        </thead>
        <tbody>
          <tr><td>HttpOnly + Secure cookie</td><td>Yes (JS can't read it)</td><td>No (needs SameSite or CSRF token)</td><td>Web apps</td></tr>
          <tr><td>SameSite=Strict cookie</td><td>Yes</td><td>Yes (same-site only)</td><td>Web apps (same origin)</td></tr>
          <tr><td>localStorage</td><td>No (XSS can steal it)</td><td>Yes (not sent automatically)</td><td>Not recommended</td></tr>
          <tr><td>Memory (JS variable)</td><td>Yes (not persisted)</td><td>Yes</td><td>SPAs with refresh tokens in cookies</td></tr>
        </tbody>
      </table>
      <p>
        The current industry consensus: use <strong>HttpOnly, Secure, SameSite=Strict cookies</strong> for the refresh token, and keep the access token in JavaScript memory only (lost on page refresh, refreshed silently). This prevents both XSS theft and CSRF attacks.
      </p>

      <h3>Token Revocation</h3>
      <p>
        A pure JWT system has no built-in revocation mechanism — once a token is issued, it's valid until it expires. To implement revocation:
      </p>
      <ul>
        <li><strong>Short access token lifetimes:</strong> If tokens expire in 15 minutes, a revoked user regains access for at most 15 minutes.</li>
        <li><strong>Token blocklist:</strong> Store revoked JTI (JWT ID) values in Redis until their <code>exp</code>. Check the blocklist on each request. Adds one Redis lookup per request.</li>
        <li><strong>Token versioning:</strong> Store a <code>token_version</code> field in the user record. Include the version in the JWT. If the stored version increments (on password change, logout, forced logout), existing tokens with the old version are rejected.</li>
        <li><strong>Refresh token revocation:</strong> Deleting a refresh token record effectively logs out the user at next access token expiry. Combined with short access token lifetimes, this is the most practical approach.</li>
      </ul>
    </div>
  );
}
