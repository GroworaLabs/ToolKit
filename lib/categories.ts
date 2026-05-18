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
            { href: '/tools/code-dev',        label: 'Code & Dev'       },
            { href: '/tools/network-web',     label: 'Network & Web'    },
            { href: '/tools/data-format',     label: 'Data & Format'    },
            { href: '/tools/qa-testing',      label: 'QA & Testing'     },
            { href: '/tools/text',            label: 'Text & Writing'   },
            { href: '/tools/design',          label: 'Design & Media'   },
            { href: '/tools/value-converter', label: 'Value Converter'  },
            { href: '/tools/ai',              label: 'AI'               },
        ],
    },

    /* ── Code & Dev ───────────────────────────────────────── */
    {
        slug:        'code-dev',
        name:        'Code & Dev',
        registryKey: 'Code & Dev',
        seoTitle:    'Free Online Code & Dev Tools — Formatter, Minifier, Regex, UUID & More | ToolKit',
        seoH1:       'Free Online Code & Dev Tools',
        seoDescription: 'Free browser-based code tools: JSON formatter, SQL formatter, HTML/CSS/JS minifiers, regex tester, UUID generator, cron expression builder, Base64 encoder and more. No signup, 100% client-side.',
        intro: 'Code utilities for developers that run entirely in your browser. Format and minify code, test regex patterns, generate UUIDs, encode Base64, build cron schedules, and compare semver strings — with no data sent to any server.',
        contentH2: 'Why code tools should run in the browser',
        contentBody: [
            'Server-based code tools introduce unnecessary risk — JWT tokens, database passwords, sensitive SQL queries, and API keys are transmitted to a third-party server every time you paste them into an online tool. Browser-based tools eliminate this entirely: your code stays in your browser tab.',
            'Every tool on this page uses only browser-native APIs and pure JavaScript logic. JSON.parse() for formatting, native RegExp for regex testing, crypto.randomUUID() for UUIDs, TextEncoder for Base64. No server, no network requests, no external dependencies.',
            'Performance is better too — client-side tools respond instantly with no round-trip latency. Large JSON files, complex SQL queries, and thousand-line CSS stylesheets all process at native speed.',
        ],
        tips: [
            { title: 'Never paste secrets into server-based tools', desc: 'JWT tokens, database passwords, and API keys pasted into server-side formatters may be logged. Always use client-side alternatives for sensitive data.' },
            { title: 'Test regex with edge cases', desc: 'A regex that works in testing can catastrophically backtrack on real input. Always test with empty strings, special characters, very long inputs, and Unicode sequences before deploying.' },
            { title: 'Use UUIDs for idempotency keys', desc: 'UUID v4 identifiers are ideal for idempotency keys in payment systems and distributed systems to prevent duplicate operations. UUID v4 has 122 bits of entropy — collision probability is negligible.' },
            { title: 'Pin cron schedules to UTC', desc: 'Server crons should always run in UTC to avoid DST surprises. A "midnight" job in a local timezone will shift by 1 hour twice a year if not pinned to UTC.' },
        ],
        faq: [
            { q: 'Is it safe to paste API keys or JWT tokens into these tools?', a: 'Yes — these tools run entirely in your browser. Your input is never transmitted anywhere. Verify by opening DevTools → Network tab and confirming zero network requests while using the tools.' },
            { q: 'What is the difference between Base64 and URL encoding?', a: 'Base64 converts binary data to ASCII text using 64 printable characters. URL encoding converts special characters to percent-encoded sequences safe for URLs. They serve different purposes and are not interchangeable.' },
            { q: 'When should I use UUID v4 vs UUID v1?', a: 'UUID v4 is randomly generated — use it for database primary keys, session tokens, and idempotency keys. UUID v1 embeds a MAC address and timestamp — useful when sortability matters, but reveals machine identity.' },
            { q: 'What SQL dialects does the formatter support?', a: 'The SQL formatter handles standard SQL including MySQL, PostgreSQL, SQLite, and SQL Server. It targets ANSI SQL as the baseline — dialect-specific syntax may not be perfectly formatted but will be valid output.' },
            { q: 'What cron syntax platforms are supported?', a: 'The cron generator supports Unix/Linux (5 fields), Quartz/Spring (6–7 fields), AWS EventBridge, GitHub Actions, and Kubernetes CronJobs. Each platform has slightly different rules — select your platform to see the correct syntax.' },
        ],
        otherCategories: [
            { href: '/tools/security',        label: 'Security'        },
            { href: '/tools/network-web',     label: 'Network & Web'   },
            { href: '/tools/data-format',     label: 'Data & Format'   },
            { href: '/tools/qa-testing',      label: 'QA & Testing'    },
            { href: '/tools/text',            label: 'Text & Writing'  },
            { href: '/tools/design',          label: 'Design & Media'  },
            { href: '/tools/value-converter', label: 'Value Converter' },
            { href: '/tools/ai',              label: 'AI'              },
        ],
    },

    /* ── Network & Web ────────────────────────────────────── */
    {
        slug:        'network-web',
        name:        'Network & Web',
        registryKey: 'Network & Web',
        seoTitle:    'Free Online Network & Web Tools — URL Encoder, IP Calculator, HTTP Status Codes | ToolKit',
        seoH1:       'Free Online Network & Web Tools',
        seoDescription: 'Free browser-based network and web tools: URL encoder/decoder, IP/CIDR subnet calculator, HTTP status code reference, nginx redirect generator, user-agent parser and more. No signup, 100% client-side.',
        intro: 'Browser-based utilities for web and network work. Encode and decode URLs, calculate subnet ranges, look up HTTP status codes, generate nginx redirects, and parse user-agent strings — all locally with no data sent to a server.',
        contentH2: 'Network and web tools for developers',
        contentBody: [
            'Web development involves constant juggling of URLs, HTTP codes, subnet ranges, and server configuration files. Having a reliable reference and generator for each of these reduces errors and speeds up debugging.',
            'URL encoding is one of the most misunderstood web concepts. RFC 3986 defines which characters must be percent-encoded in a URL — and the rules differ between the path component, the query string, and fragment identifiers. The URL encoder on this page applies the correct rules for each context.',
            'Subnet calculation is a common point of friction for developers who work with cloud infrastructure. CIDR notation like 10.0.0.0/24 is compact but requires mental math for ranges and host counts. The IP/CIDR calculator decodes every field instantly.',
        ],
        tips: [
            { title: 'Encode query values, not full URLs', desc: 'URL-encode individual query parameter values, not the entire URL. Encoding & or = in the wrong place breaks the query string structure. Use encodeURIComponent() in JavaScript, not encodeURI().' },
            { title: 'Know your 4xx vs 5xx codes', desc: '4xx errors are client mistakes (bad URL, missing auth, wrong method). 5xx errors are server failures. A 404 means the resource was not found — a 503 means the server is overwhelmed. Monitoring systems should alert differently for each.' },
            { title: 'Use /16 subnets for VPCs by default', desc: 'A /16 gives 65,536 addresses — enough to subdivide into many /24 subnets (256 each) for different services and environments. Start broad and subnet down rather than starting too narrow.' },
            { title: 'Prefer 301 for permanent redirects', desc: 'A 301 redirect is permanent — browsers cache it indefinitely. Use 301 only when you are certain the old URL will never be needed again. Use 302 or 307 while testing redirects, then switch to 301 when confirmed.' },
        ],
        faq: [
            { q: 'What is the difference between encodeURI and encodeURIComponent?', a: 'encodeURI() encodes a full URL, leaving characters like /, ?, & and = untouched. encodeURIComponent() encodes a value to be embedded in a URL, encoding those characters too. Always use encodeURIComponent() for individual query values.' },
            { q: 'What is CIDR notation?', a: 'CIDR (Classless Inter-Domain Routing) notation describes a network address and its subnet mask in one compact form: IP/prefix-length. 192.168.1.0/24 means the first 24 bits are the network — giving 256 addresses (254 usable hosts).' },
            { q: 'What HTTP status code means "try again later"?', a: '503 Service Unavailable means the server is temporarily down. The Retry-After header can specify when to try again. 429 Too Many Requests is the rate-limiting equivalent — your client is sending too fast.' },
            { q: 'What is a user-agent string?', a: 'A user-agent string is sent by browsers and HTTP clients in every request. It identifies the browser, version, operating system, and rendering engine. Web servers use it for analytics, content negotiation, and bot detection.' },
            { q: 'What is the difference between robots.txt and a noindex meta tag?', a: 'robots.txt tells crawlers which URLs not to crawl. A noindex meta tag tells crawlers not to index a page in search results even after crawling it. If you want a page out of Google, use noindex — robots.txt alone does not remove existing indexed pages.' },
        ],
        otherCategories: [
            { href: '/tools/security',        label: 'Security'        },
            { href: '/tools/code-dev',        label: 'Code & Dev'      },
            { href: '/tools/data-format',     label: 'Data & Format'   },
            { href: '/tools/qa-testing',      label: 'QA & Testing'    },
            { href: '/tools/text',            label: 'Text & Writing'  },
            { href: '/tools/design',          label: 'Design & Media'  },
            { href: '/tools/value-converter', label: 'Value Converter' },
            { href: '/tools/ai',              label: 'AI'              },
        ],
    },

    /* ── Data & Format ────────────────────────────────────── */
    {
        slug:        'data-format',
        name:        'Data & Format',
        registryKey: 'Data & Format',
        seoTitle:    'Free Online Data & Format Tools — JSON/CSV/YAML Converters, Mock Data | ToolKit',
        seoH1:       'Free Online Data & Format Tools',
        seoDescription: 'Free browser-based data tools: JSON/CSV/YAML/XML converters, JSON schema generator, mock data generator, form test data generator, CSV viewer. No signup, 100% client-side.',
        intro: 'Data format converters and generators that run entirely in your browser. Convert between JSON, CSV, YAML, XML, and TOML, generate realistic mock data for testing, create JSON schemas, and build form test cases — with no data sent to a server.',
        contentH2: 'Data format tools for developers and data engineers',
        contentBody: [
            'Modern applications consume and produce data in JSON, CSV, YAML, XML, TOML, and a dozen other formats. Switching between them is a constant task — for API integration, config file management, database seeding, and test data preparation.',
            'JSON has become the lingua franca of web APIs, but CSV remains dominant for spreadsheets and data pipelines. YAML is preferred for configuration files (Kubernetes, GitHub Actions, Docker Compose) because it is more readable than JSON. Knowing when to use which format — and how to convert between them reliably — is a core developer skill.',
            'All conversion logic runs entirely in your browser with no server round-trip. Large CSV files, complex nested JSON, and multi-document YAML files all process instantly at native JavaScript speed.',
        ],
        tips: [
            { title: 'Validate JSON schema early', desc: 'Generate a JSON Schema from your sample data and validate all incoming payloads against it. Schema validation catches type mismatches, missing required fields, and unexpected nulls before they reach your database.' },
            { title: 'Use YAML for config, JSON for APIs', desc: 'YAML is more readable and supports comments — great for configuration files. JSON is stricter and universally supported — better for API payloads where comments would be stripped anyway.' },
            { title: 'Watch for type coercion in CSV', desc: 'CSV has no native types — everything is a string. Parsers often auto-coerce "1" to a number and "true" to a boolean. Always validate types explicitly when importing CSV data into a typed system.' },
            { title: 'Seed test databases with realistic data', desc: 'Fake names, emails, and phone numbers from a mock data generator produce more useful test results than sequential IDs like "user1", "user2". Edge cases in real data (Unicode, apostrophes, very long values) surface sooner with realistic seeding.' },
        ],
        faq: [
            { q: 'What is the difference between JSON and YAML?', a: 'JSON uses strict syntax — double quotes for keys, no trailing commas, no comments. YAML is a superset of JSON with more relaxed syntax, support for comments, and cleaner multi-line strings. YAML is popular for config files; JSON is the standard for API payloads.' },
            { q: 'How do I convert a CSV with nested data?', a: 'Nested JSON cannot be represented directly in CSV. The JSON to CSV converter flattens nested objects into dot-notation column names (e.g., address.city). For deeply nested structures, consider JSON or YAML instead of CSV.' },
            { q: 'What is JSON Schema?', a: 'JSON Schema is a vocabulary for describing the structure of JSON data. It specifies types, required fields, string patterns, numeric ranges, and array constraints. Use it to validate API request/response bodies and catch schema drift early.' },
            { q: 'What data types does the mock data generator support?', a: 'The mock data generator supports names, emails, phone numbers, addresses, dates, UUIDs, booleans, integers, floats, company names, and custom strings. Export as JSON or CSV for use in tests, database seeding, or Storybook stories.' },
            { q: 'What is TOML and when should I use it?', a: 'TOML (Tom\'s Obvious Minimal Language) is a configuration format designed to be easy to read. It maps cleanly to a hash table and is used by Cargo (Rust), Hugo, and Poetry (Python). Use it when you want a config format that\'s more structured than YAML but simpler than JSON for humans.' },
        ],
        otherCategories: [
            { href: '/tools/security',        label: 'Security'        },
            { href: '/tools/code-dev',        label: 'Code & Dev'      },
            { href: '/tools/network-web',     label: 'Network & Web'   },
            { href: '/tools/qa-testing',      label: 'QA & Testing'    },
            { href: '/tools/text',            label: 'Text & Writing'  },
            { href: '/tools/design',          label: 'Design & Media'  },
            { href: '/tools/value-converter', label: 'Value Converter' },
            { href: '/tools/ai',              label: 'AI'              },
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
            { href: '/tools/code-dev',        label: 'Code & Dev'      },
            { href: '/tools/network-web',     label: 'Network & Web'   },
            { href: '/tools/data-format',     label: 'Data & Format'   },
            { href: '/tools/qa-testing',      label: 'QA & Testing'    },
            { href: '/tools/design',          label: 'Design & Media'  },
            { href: '/tools/value-converter', label: 'Value Converter' },
            { href: '/tools/ai',              label: 'AI'              },
        ],
    },

    /* ── Design & Media ───────────────────────────────────── */
    {
        slug:        'design',
        name:        'Design & Media',
        registryKey: 'Design & Media',
        seoTitle:    'Free Online Design & Media Tools — Color Palette, Contrast Checker, Favicon & More | ToolKit',
        seoH1:       'Free Online Design & Media Tools',
        seoDescription: 'Free browser-based design tools: color palette generator, color converter (HEX/RGB/HSL/CMYK), WCAG contrast checker, favicon generator, SVG optimizer and more. No signup, 100% client-side.',
        intro: 'Color and design utilities for designers and developers. Generate harmonious color palettes, convert between HEX, RGB, HSL and CMYK, check WCAG contrast, generate favicons, and optimize SVGs — all in your browser.',
        contentH2: 'Design and media tools that work in your browser',
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
            { href: '/tools/security',        label: 'Security'        },
            { href: '/tools/code-dev',        label: 'Code & Dev'      },
            { href: '/tools/network-web',     label: 'Network & Web'   },
            { href: '/tools/data-format',     label: 'Data & Format'   },
            { href: '/tools/qa-testing',      label: 'QA & Testing'    },
            { href: '/tools/text',            label: 'Text & Writing'  },
            { href: '/tools/value-converter', label: 'Value Converter' },
            { href: '/tools/ai',              label: 'AI'              },
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
            { href: '/tools/security',        label: 'Security'        },
            { href: '/tools/code-dev',        label: 'Code & Dev'      },
            { href: '/tools/network-web',     label: 'Network & Web'   },
            { href: '/tools/data-format',     label: 'Data & Format'   },
            { href: '/tools/qa-testing',      label: 'QA & Testing'    },
            { href: '/tools/text',            label: 'Text & Writing'  },
            { href: '/tools/design',          label: 'Design & Media'  },
            { href: '/tools/ai',              label: 'AI'              },
        ],
    },

    /* ── AI ───────────────────────────────────────────────── */
    {
        slug:        'ai',
        name:        'AI',
        registryKey: 'AI',
        seoTitle:    'Free AI Tools for Developers — Token Counter, Prompt Utilities | ToolKit',
        seoH1:       'Free AI Tools for Developers',
        seoDescription: 'Browser-based utilities for LLM workflows: real tiktoken token counter with per-token visualization, context-window math, prompt tooling. Supports GPT-5, GPT-4o, o1, Claude 4.x, Gemini 2.5, DeepSeek. 100% client-side.',
        intro: 'Client-side utilities for working with large language models. Count tokens exactly for OpenAI models, visualize how GPT splits your prompt, estimate context-window usage across Claude, Gemini and DeepSeek — without sending your prompt to a server.',
        contentH2: 'Why AI tools should run in the browser',
        contentBody: [
            'Most online AI tools proxy your prompt through their own server before returning a result. For token counting, prompt templating, or export cleanup, that\'s unnecessary — and risky. System prompts often contain proprietary instructions, customer data, internal URLs, or API keys embedded in examples. Pasting them into a server-side tool means trusting a third party not to log or train on that content.',
            'Every AI tool on ToolKit runs entirely in your browser. For OpenAI models we load the real tiktoken BPE ranks (o200k_base and cl100k_base) locally and tokenize client-side — counts are exact, identical to what the OpenAI API bills. For Anthropic, Google, and DeepSeek, we fall back to empirical per-tokenizer ratios with adjustments for code and non-Latin scripts, and we label those counts as estimates rather than pretending they\'re exact.',
            'No analytics pings your prompt. No server logs capture your system message. You can verify by opening DevTools → Network tab and confirming zero requests while using the tools.',
        ],
        tips: [
            { title: 'Count before you send',     desc: 'API pricing is per token. A workflow processing 10k tickets at 4k tokens each is 40M tokens — the gap between GPT-4o and GPT-4o mini is thousands of dollars per month. Count the prompt template once, multiply by volume.' },
            { title: 'Reserve output headroom',   desc: 'The context window covers input + output. GPT-4o has 128k total; if your history is at 120k, the model can generate only 8k before hitting the ceiling. Leave 4–16k for responses depending on use case.' },
            { title: 'Chat templates cost tokens',desc: 'ChatML wrappers (<|im_start|>, role, <|im_end|>) add ~3–5 tokens per message before your content. Use Chat mode in the Token Counter to see the real billed count, not just raw text length.' },
            { title: 'Non-Latin text is expensive',desc: 'Most tokenizers are English-biased. CJK, Cyrillic, Arabic, and Hindi tokenize 2–3× less efficiently per character. A 1,000-char Chinese prompt can cost more tokens than 4,000 chars of English.' },
        ],
        faq: [
            { q: 'Are my prompts sent anywhere?', a: 'No. These tools run 100% in your browser using WebAssembly and pure JavaScript. Prompts, system messages, and conversation history never leave your device. Verify in DevTools → Network.' },
            { q: 'Why exact counts only for OpenAI?', a: 'OpenAI open-sourced their tokenizer (tiktoken) with the vocabulary files. Anthropic, Google, and DeepSeek keep their tokenizers closed — there is no published client-side library, so we show an empirical estimate with a visible ~ prefix instead of drawing fabricated token boundaries.' },
            { q: 'How accurate are the estimates for Claude / Gemini / DeepSeek?', a: 'Typically ±5–10% of the official tokenizer for English prose, with wider variance on code, minified JSON, and non-Latin scripts. Good enough for cost planning, context-window sanity checks, and rough budgeting. For production billing accuracy, call each vendor\'s count_tokens endpoint.' },
            { q: 'Do these tools work offline?', a: 'After the page loads once, all tokenization runs locally. The BPE ranks file (~500–700 KB gzipped) is cached on first use, then works offline.' },
            { q: 'Which models are supported?', a: 'GPT-5, GPT-4o, GPT-4o mini, o1, Claude Opus / Sonnet / Haiku 4.x, Gemini 2.5 Pro, Gemini 2.0 Flash, and DeepSeek V3. OpenAI models get exact counts and per-token visualization; the rest use estimates.' },
        ],
        otherCategories: [
            { href: '/tools/security',        label: 'Security'        },
            { href: '/tools/code-dev',        label: 'Code & Dev'      },
            { href: '/tools/network-web',     label: 'Network & Web'   },
            { href: '/tools/data-format',     label: 'Data & Format'   },
            { href: '/tools/qa-testing',      label: 'QA & Testing'    },
            { href: '/tools/text',            label: 'Text & Writing'  },
            { href: '/tools/design',          label: 'Design & Media'  },
            { href: '/tools/value-converter', label: 'Value Converter' },
        ],
    },

    /* ── QA & Testing ────────────────────────────────────── */
    {
        slug:        'qa-testing',
        name:        'QA & Testing',
        registryKey: 'QA & Testing',
        seoTitle:    'Free Online QA & Testing Tools — Test Data Generator, Form Tester & More | ToolKit',
        seoH1:       'Free Online QA & Testing Tools',
        seoDescription: 'Free browser-based QA tools: form test data generator, mock data generator, boundary value testing, XSS and SQL injection payloads. No signup, 100% client-side.',
        intro: 'Browser-based utilities for QA engineers and developers. Generate form test cases with boundary values, XSS payloads, and SQL injection strings. Seed realistic mock data for test databases. All locally with no data sent to a server.',
        contentH2: 'Testing tools that help you ship with confidence',
        contentBody: [
            'Quality assurance starts with the right test data. Manually crafting test inputs for every field type — valid ranges, boundary values, invalid formats, injection payloads — is repetitive and error-prone. Automated test data generators ensure you cover the full equivalence partition space without missing edge cases.',
            'The most common bugs in production are input handling failures: strings that exceed the column length, special characters that break a regex, Unicode that trips up an encoding assumption, and injection strings that expose a security gap. These are exactly the cases a good test data generator surfaces before they reach users.',
            'All tools run entirely in your browser. Test payloads, form schemas, and mock datasets never leave your device.',
        ],
        tips: [
            { title: 'Test boundary values first', desc: 'Most bugs hide at boundaries: minimum - 1, minimum, maximum, maximum + 1. Always test the exact limit, one below, and one above for every numeric and length constraint.' },
            { title: 'Include injection strings in every text field', desc: 'Any field that accepts user input should be tested with XSS payloads (<script>alert(1)</script>) and SQL injection strings (\' OR 1=1--). These are not rare attacks — they are the first things attackers try.' },
            { title: 'Use realistic mock data, not user1/user2', desc: 'Sequential test data like "user1@test.com" rarely exposes bugs that realistic data would. Names with apostrophes, emails with plus signs, and phone numbers with dashes all behave differently in real systems.' },
            { title: 'Cover the empty and null cases', desc: 'Empty string, whitespace-only, and null/undefined are different inputs that many systems handle inconsistently. Always include them in your test matrix for required-field validation.' },
        ],
        faq: [
            { q: 'What test cases does the form test data generator cover?', a: 'The generator produces 12 categories per field: valid input, invalid format, boundary minimum, boundary maximum, below minimum, above maximum, empty/null, whitespace only, special characters, XSS payload, SQL injection, oversized input (10,000 characters), and Unicode/emoji.' },
            { q: 'What is boundary value analysis?', a: 'Boundary value analysis is a black-box testing technique that targets the edges of input domains. If a field accepts 1–100 characters, test with 0, 1, 2, 99, 100, and 101. Most defects appear at or just outside boundary conditions.' },
            { q: 'Why include XSS and SQL injection in test data?', a: 'Injection attacks are the most common class of web vulnerability (OWASP Top 10 #3). Including injection payloads in functional test suites catches security regressions before they reach production — no separate security scan required for basic coverage.' },
            { q: 'What data types does the mock data generator support?', a: 'The mock data generator supports names, emails, phone numbers, addresses, dates, UUIDs, booleans, integers, floats, company names, and custom strings. Export as JSON or CSV for test database seeding, Storybook stories, or API contract testing.' },
            { q: 'Are these tools safe for testing with sensitive schemas?', a: 'Yes. Form schemas, field names, and generated test data all stay in your browser. Nothing is transmitted to any server. You can safely use real field names from your production forms without exposing your data model.' },
        ],
        otherCategories: [
            { href: '/tools/security',        label: 'Security'        },
            { href: '/tools/code-dev',        label: 'Code & Dev'      },
            { href: '/tools/network-web',     label: 'Network & Web'   },
            { href: '/tools/data-format',     label: 'Data & Format'   },
            { href: '/tools/text',            label: 'Text & Writing'  },
            { href: '/tools/design',          label: 'Design & Media'  },
            { href: '/tools/value-converter', label: 'Value Converter' },
            { href: '/tools/ai',              label: 'AI'              },
        ],
    },
];

export const getCategoryBySlug = (slug: string) =>
    CATEGORIES.find(c => c.slug === slug) ?? null;

export const getAllCategorySlugs = () =>
    CATEGORIES.map(c => c.slug);