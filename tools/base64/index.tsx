import {FaqItem} from "@/lib/types";


export const faq: FaqItem[] = [
    { q: 'What is Base64?', a: 'Base64 is an encoding scheme that converts binary data into ASCII text using 64 printable characters (A–Z, a–z, 0–9, +, /). It\'s not encryption — it\'s a way to safely transmit binary data over text-only channels.' },
    { q: 'Why is Base64 used?', a: 'Base64 is used to embed binary data in text formats — for example, images in HTML/CSS data URIs, file attachments in email (MIME), tokens in JWTs, and API payloads that must remain text-safe.' },
    { q: 'Does Base64 make data secure?', a: 'No. Base64 is not encryption. Anyone can decode it instantly. Do not use Base64 to hide sensitive data — use proper encryption (AES, RSA) for that purpose.' },
    { q: 'Why does Base64 output end with "=="?', a: 'Base64 works in 3-byte chunks. If the input length isn\'t divisible by 3, padding characters (=) are added to complete the last chunk. One = means 1 padding byte, == means 2.' },
    { q: 'What is the size overhead of Base64?', a: 'Base64 encoded output is approximately 33% larger than the original input, because 3 bytes of binary become 4 ASCII characters.' },
    { q: 'What is Base64url and how does it differ from standard Base64?', a: 'Base64url replaces the two characters that are unsafe in URLs: + becomes - and / becomes _. Padding (=) is also typically omitted. This makes the output safe to use directly in URLs and HTTP headers without percent-encoding. JWT tokens use Base64url for both the header and payload sections.' },
    { q: 'What do btoa() and atob() do in JavaScript?', a: 'btoa() (binary to ASCII) encodes a string to Base64. atob() (ASCII to binary) decodes a Base64 string back to the original. Both are built into browsers and Node.js 16+. Limitation: btoa() only handles ASCII/Latin-1 characters — for UTF-8 strings with emojis or accents, use: btoa(encodeURIComponent(str)) to encode and decodeURIComponent(atob(encoded)) to decode.' },
    { q: 'Can I use Base64 to encode images for CSS?', a: 'Yes. A Base64-encoded image can be used as a CSS background: background-image: url("data:image/png;base64,iVBORw0KGgo..."). This eliminates an HTTP request, which is useful for tiny icons and loading spinners. However, Base64 images are ~33% larger than binary, cannot be cached separately, and increase CSS file size — only use this for images under 1 KB.' },
];

export const sidebarInfo = [
    { label: 'Character set', value: 'A–Z, a–z, 0–9, +, /' },
    { label: 'Padding',       value: '= or =='              },
    { label: 'Size overhead', value: '~33% larger'          },
    { label: 'RFC',           value: 'RFC 4648'             },
    { label: 'Use cases',     value: 'JWT, data URIs, MIME' },
];