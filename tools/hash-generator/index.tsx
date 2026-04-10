import {FaqItem} from "@/lib/types";


export const faq: FaqItem[] = [
    { q: 'What is a hash function?', a: 'A hash function takes any input and produces a fixed-length string called a digest. The same input always produces the same output, but you cannot reverse the process to recover the original text from the hash.' },
    { q: 'What is the difference between SHA-1, SHA-256, and SHA-512?', a: 'They differ in output length and security. SHA-1 (160-bit) is deprecated for security use. SHA-256 (256-bit) is the current standard for most applications. SHA-512 (512-bit) offers higher security and is faster on 64-bit systems.' },
    { q: 'Can I use this to hash passwords?', a: 'No. SHA functions are fast by design, making them unsuitable for password storage. For passwords, use bcrypt, Argon2, or scrypt — slow hashing algorithms designed to resist brute-force attacks.' },
    { q: 'What are hashes used for?', a: 'File integrity verification (checksums), digital signatures, data deduplication, API request signing (HMAC), storing non-sensitive identifiers, and verifying downloaded files.' },
    { q: 'Is my data safe?', a: 'Yes. All hashing is done locally in your browser using the Web Crypto API. Nothing is transmitted to any server.' },
    { q: 'What is the difference between hashing and encryption?', a: 'Hashing is one-way — you cannot recover the original input from a hash. Encryption is two-way — with the right key you can decrypt back to the original. Use hashing to verify integrity (checksums, passwords). Use encryption to protect data that must be recovered later (stored secrets, transmissions).' },
    { q: 'What is MD5 and why should I avoid it?', a: 'MD5 produces a 128-bit hash and was widely used through the 1990s. It is now considered cryptographically broken — MD5 collisions (two different inputs producing the same hash) can be generated in seconds. Avoid MD5 for any security purpose. It is still acceptable for non-security use cases like basic file change detection in trusted environments.' },
    { q: 'How do I verify a downloaded file using a hash?', a: 'After downloading the file, generate its SHA-256 hash and compare it against the checksum published by the software provider. On macOS/Linux: shasum -a 256 filename. On Windows PowerShell: Get-FileHash filename -Algorithm SHA256. If the hashes match exactly, the file is authentic and unmodified. A single character difference means the file is corrupted or tampered with.' },
];

export const sidebarInfo = [
    { label: 'SHA-1',   value: '160-bit',  desc: 'Deprecated — do not use for security'   },
    { label: 'SHA-256', value: '256-bit',  desc: 'Current standard — use for most needs'  },
    { label: 'SHA-384', value: '384-bit',  desc: 'Intermediate option for TLS'            },
    { label: 'SHA-512', value: '512-bit',  desc: 'Highest strength, fast on 64-bit CPUs'  },
];