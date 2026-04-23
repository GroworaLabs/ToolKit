import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is a JWT and what is it used for?',
    a: 'A JSON Web Token (JWT) is a compact, URL-safe token format defined in RFC 7519. It contains three Base64url-encoded parts: a header (algorithm + type), a payload (claims), and a signature. JWTs are commonly used for stateless authentication — a server signs a token containing the user\'s identity and permissions, then the client presents that token on every subsequent request without the server needing to query a session store.',
  },
  {
    q: 'What is the difference between HS256, HS384, and HS512?',
    a: 'All three are HMAC-based symmetric algorithms defined in RFC 7518. The number refers to the SHA hash length used: 256, 384, or 512 bits. HS256 is the most common and sufficient for most applications. HS384 and HS512 produce longer signatures and are marginally more collision-resistant, but the practical security difference is negligible for HMAC — the bottleneck is key length, not hash size. Use HS256 unless your requirements specify otherwise.',
  },
  {
    q: 'What claims should every JWT include?',
    a: 'The most important standard claims (defined in RFC 7519 Section 4.1) are: iss (issuer — who created the token), sub (subject — who the token represents), aud (audience — who the token is intended for), exp (expiration time — Unix timestamp after which the token is invalid), iat (issued-at time), and jti (JWT ID — unique identifier to prevent replay). At minimum, always include sub and exp to limit the blast radius if a token is leaked.',
  },
  {
    q: 'Is a JWT encrypted?',
    a: 'No — a JWT signed with HS256/384/512 is only signed, not encrypted. The header and payload are Base64url-encoded (reversible), so anyone who intercepts the token can read its contents. Never put sensitive data (passwords, credit card numbers, SSNs) in a JWT payload. If you need confidentiality, use JWE (JSON Web Encryption) or a different mechanism.',
  },
  {
    q: 'What is the difference between signing and encrypting a JWT?',
    a: 'Signing (JWS) proves that the token was created by someone who knows the secret key and that it has not been modified. Anyone can read the payload — signing does not hide it. Encrypting (JWE) hides the payload so only the intended recipient can read it. Most applications use JWS (signed JWTs) for authentication; JWE is less common and requires more infrastructure.',
  },
  {
    q: 'Should I store JWTs in localStorage or cookies?',
    a: 'Both have tradeoffs. localStorage is accessible to JavaScript, making JWTs vulnerable to XSS attacks. HttpOnly cookies are immune to JavaScript access, preventing XSS theft, but require CSRF protection (e.g. SameSite=Strict or a CSRF token). The current industry consensus is HttpOnly cookies with SameSite=Strict for web apps. For mobile or API clients, short-lived JWTs in memory (not persisted) are preferred.',
  },
  {
    q: 'How long should a JWT\'s expiry (exp) be?',
    a: 'Keep access token lifetimes short — 15 minutes to 1 hour is common. Short expiry limits damage if a token is leaked. Use a separate, longer-lived refresh token (7–30 days) to obtain new access tokens without requiring the user to log in again. Never issue non-expiring JWTs for production authentication flows.',
  },
  {
    q: 'Is my secret key safe when using this tool?',
    a: 'Yes. All signing happens locally in your browser using the Web Crypto API. Your secret key and payload are never sent to any server, never stored, and never logged. You can verify this by going offline — the generator works identically without an internet connection.',
  },
];

export const sidebarInfo = [
  { label: 'Standard',   value: 'RFC 7519 (JWT) + RFC 7518 (JWA)' },
  { label: 'Algorithms', value: 'HS256 · HS384 · HS512' },
  { label: 'Crypto',     value: 'Web Crypto API (browser-native)' },
  { label: 'Output',     value: 'header.payload.signature' },
];
