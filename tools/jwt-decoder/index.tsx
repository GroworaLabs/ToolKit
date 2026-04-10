import { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'Is it safe to paste my JWT into this tool?',
    a: 'Yes — all decoding happens entirely in your browser. No part of your token is sent to any server. However, be careful about pasting live production tokens with sensitive payload data into any online tool as a general practice.',
  },
  {
    q: 'Does this tool verify the JWT signature?',
    a: 'No. This tool decodes and displays the header and payload, but does not verify the signature. Signature verification requires your secret key or public key and must be done server-side. Never trust a JWT whose signature has not been verified by your application.',
  },
  {
    q: 'What are the three parts of a JWT?',
    a: 'A JWT has three Base64url-encoded parts separated by dots: the Header (algorithm and token type), the Payload (claims — data about the user and token), and the Signature (a cryptographic hash of the header and payload using your secret key). Only the signature is secret; the header and payload are just encoded, not encrypted.',
  },
  {
    q: 'What does "exp" mean in the JWT payload?',
    a: '"exp" is the expiration claim — a Unix timestamp (seconds since 1970-01-01) after which the token must be rejected. This tool highlights expired tokens in red. Other time claims include "iat" (issued at) and "nbf" (not before — the earliest time the token is valid).',
  },
  {
    q: 'What is the difference between JWT and a session token?',
    a: 'A session token is an opaque random string stored server-side — the server looks it up in a database to find the associated user. A JWT is a self-contained token — the server can verify and read the user data directly from the token without a database lookup. JWTs are stateless (no server storage needed) but cannot be revoked without extra infrastructure.',
  },
  {
    q: 'What signing algorithms can a JWT use?',
    a: 'Common algorithms include: HS256/HS384/HS512 (HMAC-SHA — symmetric, uses a shared secret), RS256/RS384/RS512 (RSA — asymmetric, uses a private key to sign and public key to verify), ES256/ES384/ES512 (ECDSA — asymmetric, smaller signatures than RSA), and PS256/PS384/PS512 (RSA-PSS). The algorithm is specified in the JWT header\'s "alg" field. Never accept tokens signed with "alg: none".',
  },
  {
    q: 'Can I decode a JWT without the secret key?',
    a: 'Yes — the header and payload are only Base64url-encoded, not encrypted. Anyone can decode them. This is why you should never store sensitive data like passwords or payment details in a JWT payload. The secret key is only required to verify the signature (to confirm the token was not tampered with).',
  },
  {
    q: 'How long should a JWT access token be valid?',
    a: 'Access tokens should have short expiry times — typically 15 minutes to 1 hour. Short-lived tokens limit the damage if a token is stolen. Use refresh tokens (longer-lived, stored securely) to issue new access tokens without requiring the user to log in again. Never set access token expiry to days or indefinite.',
  },
  {
    q: 'What is a JWT refresh token?',
    a: 'A refresh token is a separate, longer-lived credential (hours to days) used to obtain new access tokens when the access token expires. Refresh tokens should be stored securely (HttpOnly cookies, not localStorage), rotated on each use, and invalidated on logout. This architecture gives you stateless access tokens with the ability to revoke sessions.',
  },
];

export const sidebarFeatures = [
  { label: 'Instant decoding',       desc: 'Header, payload and signature displayed as formatted JSON.', color: 'var(--green)', bg: 'var(--green-lt)' },
  { label: 'Expiry status',          desc: 'Highlights expired, valid, and not-yet-valid tokens.', color: 'var(--blue)',  bg: 'var(--blue-lt)'  },
  { label: 'Zero data transmission', desc: 'Decoding runs in your browser — nothing is sent anywhere.', color: 'var(--amber)', bg: 'var(--amber-lt)' },
  { label: 'All JWT algorithms',     desc: 'Works with HS256, RS256, ES256 and any standard JWT.', color: 'var(--ink-2)', bg: 'var(--border)'   },
];
