export default function HmacGeneratorContent() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
      <div>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            What is HMAC?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            HMAC (Hash-based Message Authentication Code) is a cryptographic mechanism that combines a secret key with a hash function to produce a message authentication code. It answers two questions simultaneously: <strong style={{ color: 'var(--ink)' }}>did this message come from someone with the secret key?</strong> and <strong style={{ color: 'var(--ink)' }}>has the message been altered in transit?</strong>
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            HMAC is defined in <a href="https://www.rfc-editor.org/rfc/rfc2104" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'underline' }}>RFC 2104</a> and is used everywhere in modern security infrastructure: webhook signature verification (Stripe, GitHub, Twilio), JWT signing (HS256 is HMAC-SHA256), cookie integrity checks, API request signing (AWS Signature Version 4 uses HMAC-SHA256 internally), and TOTP one-time password generation.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            This tool computes HMAC-SHA256 and HMAC-SHA512 entirely in your browser using the <strong style={{ color: 'var(--ink)' }}>Web Crypto SubtleCrypto API</strong>. Your message and secret key never leave your device.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            How HMAC works
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            The HMAC construction takes three inputs: a hash function H (e.g. SHA-256), a secret key K, and a message M. The formula is:
          </p>
          <div style={{ padding: '14px 20px', background: 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--ink)', marginBottom: 16, overflowX: 'auto' }}>
            HMAC(K, M) = H((K ⊕ opad) || H((K ⊕ ipad) || M))
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            In plain terms: the key is XOR-mixed with two padding constants (inner pad and outer pad), then used in two nested hash operations. This double-hashing structure prevents length extension attacks — a vulnerability in plain hashing where an attacker can append data to a message and produce a valid hash without knowing the key.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            The security of HMAC depends on the hash function's collision resistance and the secrecy of the key. HMAC-SHA256 with a 256-bit key provides 256 bits of security — far beyond what any feasible attack can break. Even HMAC-SHA1 (deprecated for plain SHA-1 usage) remains secure in the HMAC construction, though HMAC-SHA256 or HMAC-SHA512 are preferred for new systems.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            HMAC vs plain hash — the critical difference
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 12, marginBottom: 16 }}>
            {[
              {
                title: 'Plain hash (SHA-256)',
                color: '#dc2626',
                bg: '#fef2f2',
                points: [
                  'No key required — anyone can compute it',
                  'Proves data integrity only (not altered in transit)',
                  'Cannot prove origin — attacker can re-hash modified data',
                  'Vulnerable to length extension attacks (SHA-256, SHA-512)',
                  'Use for: checksums, content addressing, password hashing input',
                ],
              },
              {
                title: 'HMAC-SHA256',
                color: 'var(--green)',
                bg: 'var(--green-lt)',
                points: [
                  'Requires secret key — only key holders can verify or generate',
                  'Proves both integrity AND authenticity',
                  'Attacker cannot forge valid HMAC without the key',
                  'Immune to length extension attacks by construction',
                  'Use for: webhook verification, API auth, JWT signing, cookies',
                ],
              },
            ].map(({ title, color, bg, points }) => (
              <div key={title} style={{ padding: '16px 20px', background: bg, border: `1px solid ${color}33`, borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color, marginBottom: 10 }}>{title}</div>
                <ul style={{ paddingLeft: 16, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {points.map(p => <li key={p} style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55 }}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Webhook signature verification with HMAC
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            The most common use of HMAC in web development is verifying that webhook payloads were sent by the expected service. Stripe, GitHub, Twilio, Shopify, and most major platforms use HMAC-SHA256 for this. The pattern is always the same:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {[
              { step: '1', title: 'Service signs the payload', desc: 'The webhook provider computes HMAC-SHA256(raw_request_body, your_webhook_secret) and includes the result in a request header (e.g. X-Stripe-Signature, X-Hub-Signature-256).' },
              { step: '2', title: 'Your server receives the webhook', desc: 'Read the raw request body before any parsing. JSON parsing may alter whitespace or key order, changing the HMAC. You must compute the HMAC of the exact bytes received.' },
              { step: '3', title: 'Compute your own HMAC', desc: 'Compute HMAC-SHA256(raw_body, your_webhook_secret) on your server using the same secret configured in the provider dashboard.' },
              { step: '4', title: 'Compare using constant-time equality', desc: 'Compare your computed HMAC to the one in the header using a constant-time comparison function. Never use == or ===, which leak timing information that attackers can exploit to forge signatures character by character.' },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '12px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{step}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{title}</div>
                  <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '12px 16px', background: 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Node.js example</div>
            <pre style={{ margin: 0, fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)', lineHeight: 1.7, overflowX: 'auto', whiteSpace: 'pre-wrap' }}>{`const crypto = require('crypto');

function verifyWebhook(rawBody, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');
  // Constant-time comparison — prevents timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(signature)
  );
}`}</pre>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            HMAC use cases for developers
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: 10 }}>
            {[
              { title: 'Webhook verification',       desc: 'Verify that incoming webhooks from Stripe, GitHub, Twilio, or any HMAC-signed provider were not tampered with or spoofed.' },
              { title: 'JWT signing (HS256)',         desc: 'JWT tokens signed with HS256 are HMAC-SHA256 of the header and payload. Use this tool to manually verify JWT signatures during debugging.' },
              { title: 'Cookie integrity',            desc: 'Sign cookie values with HMAC to detect client-side tampering without full encryption. Flask and Ruby on Rails use this pattern for session cookies.' },
              { title: 'API request signing',         desc: 'AWS Signature Version 4 uses a chain of HMAC-SHA256 operations to sign API requests. Many internal APIs use similar signing to verify request authenticity.' },
              { title: 'TOTP generation',             desc: 'TOTP (time-based one-time passwords) are built on HOTP, which uses HMAC-SHA1 of a counter and shared secret. The TOTP algorithm (RFC 6238) uses HMAC-SHA1, SHA-256, or SHA-512.' },
              { title: 'Message integrity in queues', desc: 'Sign messages put onto Kafka, SQS, or RabbitMQ queues with HMAC so consumers can verify that messages were not altered by the queue infrastructure.' },
            ].map(({ title, desc }) => (
              <div key={title} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55 }}>{desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            HMAC in different programming languages
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { lang: 'Node.js',  code: `crypto.createHmac('sha256', key).update(message).digest('hex')` },
              { lang: 'Python',   code: `import hmac, hashlib\nhmac.new(key.encode(), message.encode(), hashlib.sha256).hexdigest()` },
              { lang: 'Go',       code: `mac := hmac.New(sha256.New, []byte(key))\nmac.Write([]byte(message))\nhex.EncodeToString(mac.Sum(nil))` },
              { lang: 'PHP',      code: `hash_hmac('sha256', $message, $key)` },
              { lang: 'Ruby',     code: `OpenSSL::HMAC.hexdigest('SHA256', key, message)` },
              { lang: 'Java',     code: `Mac mac = Mac.getInstance("HmacSHA256");\nmac.init(new SecretKeySpec(key.getBytes(), "HmacSHA256"));\nHex.encodeHexString(mac.doFinal(message.getBytes()))` },
            ].map(({ lang, code }) => (
              <div key={lang} style={{ padding: '12px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{lang}</div>
                <pre style={{ margin: 0, fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--green)', background: 'var(--green-lt)', padding: '8px 10px', borderRadius: 'var(--r-s)', overflowX: 'auto', lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{code}</pre>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginTop: 16 }}>
            To generate a cryptographically secure HMAC key, use the <a href="/tools/random-token-generator" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Random Token Generator</a> (32 bytes, hex format gives a 64-character key). To compute plain SHA-256 hashes without a key, use the <a href="/tools/hash-generator" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Hash Generator</a>.
          </p>
        </section>

      </div>
    </div>
  );
}
