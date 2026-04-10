import {FaqItem} from "@/lib/types";


export const faq: FaqItem[] = [
    { q: 'What is URL encoding?', a: 'URL encoding (percent-encoding) converts characters that are not allowed in URLs into a safe format. Special characters are replaced with a % followed by two hex digits. For example, a space becomes %20.' },
    { q: 'Which characters need encoding?', a: 'Reserved characters like ?, &, =, #, /, +, and non-ASCII characters (like accented letters or emoji) must be encoded. Letters, digits, and - _ . ~ are safe without encoding.' },
    { q: 'What is the difference between encodeURI and encodeURIComponent?', a: 'encodeURI encodes a full URL, leaving structural characters like /, ?, # intact. encodeURIComponent encodes everything including those characters — use it for individual query parameter values.' },
    { q: 'Why does my URL have %20 instead of +?', a: '%20 is the correct percent-encoding for a space in any URL context. The + sign is a legacy encoding for spaces in HTML form submissions (application/x-www-form-urlencoded) only.' },
    { q: 'When should I decode a URL?', a: 'Decode URLs when displaying them to users (readable addresses look cleaner), when parsing query parameter values in server-side code, or when debugging API requests. Never decode a URL before passing it to a fetch() or HTTP client — always keep the encoded form during transmission so reserved characters retain their structural meaning.' },
    { q: 'What is double encoding and why is it a problem?', a: 'Double encoding happens when you encode an already-encoded URL. The % in %20 itself gets encoded to %2520, so a space becomes %2520 instead of %20. This usually happens when encoding is applied twice — for example, encoding a value before inserting it into a string that gets encoded again. Always encode raw values, not already-encoded strings.' },
    { q: 'Which characters are always safe in URLs without encoding?', a: 'The unreserved characters defined in RFC 3986 are always safe: A–Z, a–z, 0–9, hyphen (-), underscore (_), period (.), and tilde (~). Everything else — including spaces, non-ASCII characters, and most punctuation — should be percent-encoded. Encoding the unreserved characters is technically valid but unnecessary and produces longer URLs.' },
    { q: 'How do I encode a URL in JavaScript?', a: 'Use encodeURIComponent() for individual values: encodeURIComponent("hello world") → "hello%20world". Use encodeURI() for a complete URL when you want to preserve the URL structure (slashes, colons, question marks remain unencoded). To decode, use decodeURIComponent() or decodeURI() respectively. Never use the deprecated escape() function.' },
];

export const sidebarInfo = [
    { label: 'Space',         value: '%20'  },
    { label: 'Slash /',       value: '%2F'  },
    { label: 'Question mark', value: '%3F'  },
    { label: 'Ampersand &',   value: '%26'  },
    { label: 'Equals =',      value: '%3D'  },
    { label: 'Hash #',        value: '%23'  },
    { label: 'At sign @',     value: '%40'  },
    { label: 'Plus +',        value: '%2B'  },
];