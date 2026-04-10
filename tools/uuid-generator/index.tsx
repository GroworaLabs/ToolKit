import {FaqItem} from "@/lib/types";


export const faq: FaqItem[] = [
    { q: 'What is a UUID?', a: 'UUID (Universally Unique Identifier) is a 128-bit label used to uniquely identify objects in computer systems. The standard format is 32 hex digits split by hyphens: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.' },
    { q: 'What is UUID v4?', a: 'Version 4 UUIDs are randomly generated. They use cryptographically secure randomness, making collisions astronomically unlikely — roughly 1 in 5.3 × 10³⁶ chance for any two v4 UUIDs to match.' },
    { q: 'Are these UUIDs unique?', a: 'Yes. This tool uses window.crypto.randomUUID() — the same Web Crypto API your browser uses for secure operations. All generation is local; nothing is stored or transmitted.' },
    { q: 'When should I use UUIDs?', a: 'UUIDs are ideal for database primary keys, session tokens, file names, API resource IDs, and anywhere you need a globally unique identifier without a central authority.' },
    { q: 'What is the difference between uppercase and lowercase UUIDs?', a: 'They are functionally identical — UUID is case-insensitive by specification. Lowercase is the most common convention in modern systems, but some legacy systems expect uppercase.' },
    { q: 'What is the difference between UUID v1, v4, and v7?', a: 'UUID v1 encodes the current timestamp and MAC address — sortable but leaks machine identity. UUID v4 is fully random — no ordering, maximum privacy. UUID v7 (2024 draft standard) encodes a millisecond timestamp in the first 48 bits plus random data, making it both random and time-sortable. For new database primary keys, UUID v7 is increasingly recommended because it maintains index locality.' },
    { q: 'Should I use UUIDs or auto-increment integers as database primary keys?', a: 'Both have valid uses. Auto-increment integers are smaller (4–8 bytes vs 16 bytes), more readable, and slightly faster to index. UUIDs are globally unique across databases and services, making them ideal for distributed systems, multi-tenant databases, and anywhere IDs are exposed in public URLs (integers reveal row counts). UUID v7 reduces the index fragmentation downside of v4.' },
    { q: 'How do I generate UUIDs in code without a library?', a: 'In modern environments: JavaScript/Node.js: crypto.randomUUID(). Python 3.x: import uuid; str(uuid.uuid4()). Go: use the github.com/google/uuid package. Rust: use the uuid crate. In PostgreSQL, use gen_random_uuid() (built-in since v13) or uuid_generate_v4() from the uuid-ossp extension. All of these use cryptographically secure randomness.' },
];

export const sidebarInfo = [
    { label: 'Format',      value: '32 hex chars + 4 hyphens'      },
    { label: 'Total length',value: '36 characters'                  },
    { label: 'Version',     value: 'v4 (random)'                   },
    { label: 'Entropy',     value: '122 bits of randomness'         },
    { label: 'Collisions',  value: '~1 in 5.3 × 10³⁶'              },
    { label: 'RFC',         value: 'RFC 4122'                       },
];