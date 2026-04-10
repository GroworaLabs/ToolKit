import type { FaqItem } from '@/lib/types';

export interface CategoryMeta {
    slug:        string;          // URL segment: "security"
    name:        string;          // "Security"
    registryKey: string;          // matches tool.category in registry
    seoTitle:    string;
    seoH1:       string;
    seoDescription: string;
    intro:       string;          // hero paragraph
    contentH2:   string;          // first content section heading
    contentBody: string[];        // paragraphs (JSX-safe strings)
    tips:        { title: string; desc: string }[];
    faq:         FaqItem[];
    otherCategories: { href: string; label: string }[];
}

export const CATEGORIES: CategoryMeta[] = [
    /* ── Security ─────────────────────────────────────────── */
    {
        slug:        'security',
        name:        'Security',
        registryKey: 'Security',
        seoTitle:    'Free Online Security Tools — Password Generator, Hash Generator & More | ToolKit',
        seoH1:       'Free Online Security Tools',
        seoDescription: 'Free browser-based security tools: password generator, SHA-256 hash generator, bcrypt generator, JWT decoder and QR code generator. No signup, 100% client-side.',
        intro: 'Browser-based security utilities that run entirely on your device. Generate cryptographically strong passwords, compute SHA hashes, decode JWT tokens, and create QR codes — without sending any data to a server.',
        contentH2: 'Why use browser-based security tools?',
        contentBody: [
            'Every security tool on ToolKit runs 100% in your browser using the Web Crypto API. This means your passwords, plaintext inputs, and cryptographic keys never leave your device — there is no server to breach, no logs to leak, and no third party involved.',
            'This is especially important for security-related operations. When you generate a password or compute a hash on a server-based tool, you\'re trusting that the operator doesn\'t log your input. With client-side tools, you don\'t need to trust anyone — the code runs locally and you can verify it using your browser\'s developer tools.',
            'The OWASP Top 10 consistently lists broken authentication and cryptographic failures as the most critical web application security risks. Strong, unique passwords and proper hashing are the first line of defense against both.',
        ],
        tips: [
            { title: 'Unique password per account', desc: 'A single compromised password should never expose other accounts. Use a password manager to store unique generated passwords for every service.' },
            { title: 'Use SHA-256, not SHA-1', desc: 'SHA-1 is deprecated and cryptographically broken. Use SHA-256 or SHA-512 for all new implementations.' },
            { title: 'Never hash passwords with SHA', desc: 'SHA is too fast for password storage. Use bcrypt, Argon2id, or scrypt — algorithms designed to resist GPU brute-force attacks.' },
            { title: 'Verify file integrity with checksums', desc: 'When downloading sensitive software, verify the SHA-256 checksum provided by the publisher against the hash you compute locally.' },
        ],
        faq: [
            { q: 'Are these security tools safe to use?', a: 'Yes. Every tool runs entirely in your browser using the Web Crypto API. No data — passwords, hashes, or keys — is ever sent to a server, stored, or logged.' },
            { q: 'What is the difference between hashing and encryption?', a: 'Hashing is one-way — you cannot reverse a hash. Encryption is two-way — data can be decrypted with the right key. Use hashing for integrity verification and password storage. Use encryption for data that needs to be recovered.' },
            { q: 'How long should a secure password be?', a: 'NIST recommends at least 15 characters for general accounts. For high-value accounts use 20+ characters with uppercase, lowercase, numbers, and symbols. Length matters more than complexity.' },
            { q: 'Should I use SHA-256 for storing passwords?', a: 'No. SHA-256 is too fast — attackers can try billions of guesses per second. Use bcrypt, Argon2, or scrypt for password storage.' },
            { q: 'What is a QR code used for in security?', a: 'QR codes are used for 2FA setup, sharing WiFi credentials, and encoding URLs. Use a client-side generator so sensitive data never leaves your device.' },
        ],
        otherCategories: [
            { href: '/tools/developer',       label: 'Developer Tools'  },
            { href: '/tools/text',            label: 'Text & Writing'   },
            { href: '/tools/design',          label: 'Design'           },
            { href: '/tools/value-converter', label: 'Value Converter'  },
        ],
    },

    /* ── Developer Tools ──────────────────────────────────── */
    {
        slug:        'developer',
        name:        'Developer Tools',
        registryKey: 'Developer Tools',
        seoTitle:    'Free Online Developer Tools — JSON Formatter, Base64, UUID & More | ToolKit',
        seoH1:       'Free Online Developer Tools',
        seoDescription: 'Free browser-based developer utilities: JSON formatter, Base64 encoder/decoder, UUID generator, URL encoder, hash generator, regex tester and more. No signup, 100% client-side.',
        intro: 'Essential utilities for developers that run entirely in your browser. Format JSON, encode Base64, generate UUIDs, test regular expressions, and encode URLs — all client-side with no data sent to any server.',
        contentH2: 'Why developer tools should run in the browser',
        contentBody: [
            'Server-based developer tools introduce unnecessary risk — your API keys, JWT tokens, database passwords, and sensitive payloads are transmitted to a third-party server every time you paste them into an online tool. Browser-based tools eliminate this risk entirely.',
            'Every tool on this page uses only browser-native APIs: JSON.parse() for formatting, TextEncoder for Base64, crypto.randomUUID() for UUIDs, and the RegExp engine for regex testing. No npm packages, no network requests, no external dependencies.',
            'Performance is also better — client-side tools respond instantly with no round-trip latency. Large JSON files, long Base64 strings, and complex regex patterns all process at native JavaScript speed.',
        ],
        tips: [
            { title: 'Never paste secrets into server-based tools', desc: 'API keys, JWT tokens, and database passwords pasted into online tools may be logged. Always use client-side alternatives for sensitive data.' },
            { title: 'Use UUIDs for idempotency keys', desc: 'UUID v4 identifiers are ideal for idempotency keys in payment systems, API requests, and distributed systems to prevent duplicate operations.' },
            { title: 'Minify JSON for production', desc: 'Minified JSON reduces payload size and improves API response times. Prettify for debugging, minify before deploying.' },
            { title: 'Test regex before deploying', desc: 'A regex that works in testing may catastrophically backtrack on real input. Always test with edge cases: empty strings, special characters, very long inputs.' },
        ],
        faq: [
            { q: 'Is it safe to paste API keys into these tools?', a: 'Yes — these tools run entirely in your browser. Your input is never transmitted anywhere. You can verify by opening DevTools → Network tab and confirming zero network requests while using the tools.' },
            { q: 'What is the difference between Base64 encode and URL encode?', a: 'Base64 converts binary data to ASCII text using 64 printable characters. URL encoding converts special characters to percent-encoded sequences safe for URLs. They serve different purposes and are not interchangeable.' },
            { q: 'When should I use UUID v4?', a: 'Use UUID v4 for database primary keys, session tokens, file names, and any identifier that must be unique without a central authority. UUID v4 is randomly generated with 122 bits of entropy — collision probability is negligible.' },
            { q: 'What JSON indentation should I use?', a: '2 spaces is the JavaScript/Node.js convention. 4 spaces is common in Python and Java. Both are valid — consistency within a project matters more than the specific choice.' },
            { q: 'What regex flags does the tester support?', a: 'The tester uses JavaScript\'s ECMAScript RegExp engine and supports all standard flags: g (global), i (case-insensitive), m (multiline), s (dotAll), u (unicode), and y (sticky).' },
        ],
        otherCategories: [
            { href: '/tools/security',        label: 'Security'        },
            { href: '/tools/text',            label: 'Text & Writing'  },
            { href: '/tools/design',          label: 'Design'          },
            { href: '/tools/value-converter', label: 'Value Converter' },
        ],
    },

    /* ── Text & Writing ───────────────────────────────────── */
    {
        slug:        'text',
        name:        'Text & Writing',
        registryKey: 'Text & Writing',
        seoTitle:    'Free Online Text & Writing Tools — Word Counter, Case Converter & More | ToolKit',
        seoH1:       'Free Online Text & Writing Tools',
        seoDescription: 'Free browser-based text tools: word counter, case converter, lorem ipsum generator, markdown editor and more. No signup, instant results, 100% client-side.',
        intro: 'Text utilities for writers, developers, and content creators. Count words and characters, convert text case, generate placeholder content, and preview Markdown — all in your browser with no data sent anywhere.',
        contentH2: 'Text tools for every workflow',
        contentBody: [
            'Whether you\'re writing a college essay, optimizing SEO content, building a UI mockup, or formatting code identifiers — having the right text tool at hand saves time and prevents errors.',
            'These tools cover the most common text manipulation tasks: measuring content length against platform limits, converting between naming conventions, generating realistic placeholder text, and rendering Markdown with live preview.',
            'All processing happens locally in your browser. Your documents, drafts, and notes are never transmitted to any server.',
        ],
        tips: [
            { title: 'Word count ≠ quality', desc: 'Google does not rank pages by word count directly. Write until you\'ve covered the topic thoroughly — typically 1,500–2,500 words for competitive queries.' },
            { title: 'Character limits by platform', desc: 'Twitter: 280 chars. Instagram caption: 2,200. LinkedIn post: 3,000. Google meta description: 150–160. Always check before publishing.' },
            { title: 'Use Lorem Ipsum for layout testing', desc: 'Placeholder text reveals layout issues — line breaks, overflow, and font rendering — before real content is ready. Always use realistic-length placeholder text.' },
            { title: 'camelCase for JS, snake_case for Python', desc: 'Follow the naming convention of your language or framework. JavaScript uses camelCase for variables and PascalCase for classes. Python uses snake_case for everything.' },
        ],
        faq: [
            { q: 'How is reading time calculated?', a: 'Reading time is calculated at 238 words per minute — the average adult silent reading speed from a 2019 meta-analysis of 190 studies. Technical content is typically read 20–30% slower.' },
            { q: 'What is keyword density?', a: 'Keyword density is the percentage of times a target word appears relative to total word count. A density of 1–2% for your primary keyword is a healthy range. Higher densities can appear spammy.' },
            { q: 'What Markdown syntax is supported?', a: 'The editor follows the CommonMark specification and GitHub Flavored Markdown (GFM): headings, bold, italic, code blocks, inline code, links, images, lists, blockquotes, and tables.' },
            { q: 'What is Lorem Ipsum and where does it come from?', a: 'Lorem Ipsum is scrambled Latin text from Cicero\'s De Finibus Bonorum et Malorum (45 BC). It has been the standard design placeholder text since the 1960s when Letraset popularized it for typesetting.' },
            { q: 'What is the difference between camelCase and PascalCase?', a: 'camelCase starts with a lowercase letter (myVariable). PascalCase starts with an uppercase letter (MyComponent). Both use uppercase letters to delimit words with no spaces.' },
        ],
        otherCategories: [
            { href: '/tools/security',        label: 'Security'        },
            { href: '/tools/developer',       label: 'Developer Tools' },
            { href: '/tools/design',          label: 'Design'          },
            { href: '/tools/value-converter', label: 'Value Converter' },
        ],
    },

    /* ── Design ───────────────────────────────────────────── */
    {
        slug:        'design',
        name:        'Design',
        registryKey: 'Design',
        seoTitle:    'Free Online Design Tools — Color Palette Generator, Color Converter & More | ToolKit',
        seoH1:       'Free Online Design Tools',
        seoDescription: 'Free browser-based design utilities: color palette generator, color converter (HEX/RGB/HSL/CMYK), username generator and more. No signup, 100% client-side.',
        intro: 'Color and design utilities for designers, developers, and creators. Generate harmonious color palettes, convert between HEX, RGB, HSL and CMYK, and create unique usernames — all in your browser.',
        contentH2: 'Design tools that work in your browser',
        contentBody: [
            'Good design starts with the right colors. Whether you\'re building a brand palette, matching colors across formats, or generating usernames for a new product — these tools handle the repetitive parts so you can focus on the creative decisions.',
            'Color conversion between HEX, RGB, HSL, HSV, and CMYK is a constant friction point in design workflows. HEX is what you get from Figma, RGB is what CSS expects, HSL is what makes theming intuitive, and CMYK is what printers require.',
            'All tools run locally in your browser. Colors, palette data, and usernames are never transmitted to any server.',
        ],
        tips: [
            { title: 'Use HSL for design systems', desc: 'HSL is the most intuitive format for creating color scales. Adjust only the lightness value to create tints and shades from a single hue — perfect for design tokens.' },
            { title: 'Verify WCAG contrast before shipping', desc: 'WCAG 2.2 requires a contrast ratio of 4.5:1 for normal text and 3:1 for large text. Low-contrast designs fail accessibility audits and exclude users with visual impairments.' },
            { title: 'Design in RGB, export CMYK for print', desc: 'Always design in RGB (screen) and convert to CMYK only when submitting to a printer. Some vivid RGB colors cannot be reproduced in CMYK.' },
            { title: 'The 60-30-10 color rule', desc: 'A balanced palette: 60% dominant color (backgrounds), 30% secondary color (surfaces, cards), 10% accent color (buttons, links, highlights).' },
        ],
        faq: [
            { q: 'What is the difference between HEX, RGB, and HSL?', a: 'HEX (#rrggbb) is shorthand for RGB in base-16, used in HTML and CSS. RGB mixes three light channels (0–255 each). HSL describes colors by hue, saturation, and lightness — more intuitive for design work.' },
            { q: 'What color harmony modes are available?', a: 'The palette generator supports: Analogous (adjacent colors), Complementary (opposite colors), Triadic (three equidistant colors), Split-Complementary, Tetradic (four colors), Monochromatic, and Random.' },
            { q: 'What is CMYK and when is it used?', a: 'CMYK (Cyan, Magenta, Yellow, Black) is a subtractive color model used in print. Unlike RGB which adds light, CMYK subtracts light with ink. Use CMYK values when submitting designs to a printer.' },
            { q: 'Can I use HSL colors directly in CSS?', a: 'Yes. Modern CSS fully supports hsl(h, s%, l%) and the newer space-separated syntax hsl(h s% l%). HSL is preferred for CSS theming because you can create lighter/darker variants by adjusting only the lightness value.' },
            { q: 'How do I create a consistent username style?', a: 'Choose one style and stick to it: professional (firstlast or first.last), minimal (short, single word), fun (adjective + noun), or gamer (compact, no separators). Consistency matters more than creativity for brand usernames.' },
        ],
        otherCategories: [
            { href: '/tools/security',         label: 'Security'         },
            { href: '/tools/developer',         label: 'Developer Tools'  },
            { href: '/tools/text',              label: 'Text & Writing'   },
            { href: '/tools/value-converter',   label: 'Value Converter'  },
        ],
    },

    /* ── Value Converter ──────────────────────────────────── */
    {
        slug:        'value-converter',
        name:        'Value Converter',
        registryKey: 'Value Converter',
        seoTitle:    'Free Online Value Converter Tools — Time, Units & More | ToolKit',
        seoH1:       'Free Online Value Converter Tools',
        seoDescription: 'Free browser-based value converters: time converter (seconds, minutes, hours, days, weeks, years) and more. Instant results, no signup, 100% client-side.',
        intro: 'Instant unit and value conversion tools that run entirely in your browser. Convert time durations, numeric values, and units between any format — no calculations needed, no data sent to any server.',
        contentH2: 'Why use a browser-based converter?',
        contentBody: [
            'Value converters are some of the most frequently needed utilities in everyday computing — yet most online converters are cluttered with ads, require page refreshes, or send your input to a server. Every converter on ToolKit runs locally in your browser with zero network requests.',
            'Whether you\'re a developer calculating cache TTLs in seconds, a project manager converting sprint durations to days, or a student converting between units — instant, clean results without friction is what matters.',
            'All conversion logic is handled by pure JavaScript in your browser tab. There is nothing to install, no signup required, and no rate limits.',
        ],
        tips: [
            { title: 'Use seconds as the common denominator', desc: 'When working across multiple time units in code, store durations in seconds. Convert to human-readable units only for display — it prevents off-by-one errors and timezone confusion.' },
            { title: 'Days vs calendar months', desc: 'A month is not a fixed unit — it can have 28, 29, 30 or 31 days. Use days or weeks for precise duration calculations rather than "months" wherever possible.' },
            { title: 'Know your year length', desc: 'A standard year has 365 days, a leap year 366. For precise calculations over multi-year periods, always account for leap years rather than assuming 365 days × N.' },
            { title: 'Milliseconds for code, seconds for humans', desc: 'APIs and databases typically store timestamps as milliseconds (Unix ms). Human-readable displays should use seconds or larger units. Keep the conversion explicit in your code.' },
        ],
        faq: [
            { q: 'How many seconds are in a day?', a: 'There are exactly 86,400 seconds in a day: 60 seconds × 60 minutes × 24 hours = 86,400.' },
            { q: 'How many seconds are in a year?', a: 'A standard year has 31,536,000 seconds (365 × 86,400). A leap year has 31,622,400 seconds (366 × 86,400).' },
            { q: 'How many weeks are in a year?', a: 'A year has 52 weeks and 1 day (or 2 days in a leap year). Precisely: 52.1775 weeks on average when accounting for the leap year cycle.' },
            { q: 'Are these converters accurate for programming?', a: 'Yes. The converters use exact integer arithmetic for whole-unit conversions. Fractional results are shown to sufficient decimal precision for most use cases.' },
            { q: 'Do these tools work offline?', a: 'Once the page is loaded, all conversion logic runs in your browser with no network requests. You can save the page and use it offline.' },
        ],
        otherCategories: [
            { href: '/tools/security',  label: 'Security'        },
            { href: '/tools/developer', label: 'Developer Tools' },
            { href: '/tools/text',      label: 'Text & Writing'  },
            { href: '/tools/design',    label: 'Design'          },
        ],
    },
];

export const getCategoryBySlug = (slug: string) =>
    CATEGORIES.find(c => c.slug === slug) ?? null;

export const getAllCategorySlugs = () =>
    CATEGORIES.map(c => c.slug);