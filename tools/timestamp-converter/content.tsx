export default function TimestampContent() {

    const h2Style: React.CSSProperties = {
        fontFamily: 'Outfit, sans-serif',
        fontWeight: 700,
        fontSize: 'clamp(18px, 2.5vw, 24px)',
        color: 'var(--ink)',
        letterSpacing: '-0.02em',
        marginBottom: 16,
    };

    const pStyle: React.CSSProperties = {
        fontSize: 15,
        lineHeight: 1.75,
        color: 'var(--ink-2)',
        marginBottom: 14,
    };

    const codeStyle: React.CSSProperties = {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 13,
        background: 'var(--border)',
        padding: '1px 5px',
        borderRadius: 3,
    };

    const linkStyle: React.CSSProperties = {
        color: 'var(--green)',
        textDecoration: 'underline',
    };

    const sectionStyle: React.CSSProperties = { marginBottom: 48 };

    const cardStyle: React.CSSProperties = {
        padding: '14px 16px',
        background: 'var(--white)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-l)',
        boxShadow: 'var(--sh-xs)',
    };

    const thStyle: React.CSSProperties = {
        padding: '10px 14px',
        textAlign: 'left',
        fontFamily: 'Outfit, sans-serif',
        fontWeight: 600,
    };

    const tdStyle: React.CSSProperties = {
        padding: '10px 14px',
        color: 'var(--ink-2)',
        fontSize: 14,
        verticalAlign: 'top',
    };

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
            <div>

                {/* ── What is a Unix timestamp ─────────────────── */}
                <section style={sectionStyle}>
                    <h2 style={h2Style}>What is a Unix timestamp?</h2>
                    <p style={pStyle}>
                        A Unix timestamp — also called an epoch timestamp or POSIX time — is a single integer that represents a moment in time as the number of seconds that have elapsed since <strong style={{ color: 'var(--ink)' }}>1970-01-01T00:00:00Z</strong>, a reference point known as the Unix epoch. That reference was chosen when the Unix operating system was being designed in the late 1960s and early 1970s at Bell Labs. It has since become the universal language for expressing time in software.
                    </p>
                    <p style={pStyle}>
                        The most important property of a Unix timestamp is <strong style={{ color: 'var(--ink)' }}>timezone independence</strong>. While a date string like "January 1, 2024, 9:00 AM" is ambiguous — it means completely different absolute moments depending on whether you are in New York, London, or Tokyo — the timestamp <code style={codeStyle}>1704067200</code> always and unambiguously refers to the exact same instant everywhere on Earth: midnight UTC on 1 January 2024. No timezone conversion is needed to compare two timestamps; you subtract one from the other and you have elapsed time in seconds.
                    </p>
                    <p style={pStyle}>
                        This property makes Unix timestamps the backbone of virtually every computing system that needs to record or compare points in time. Relational databases store <code style={codeStyle}>created_at</code> and <code style={codeStyle}>updated_at</code> columns as integers or timestamp types backed by epoch arithmetic. Log aggregation systems like Elasticsearch and Splunk sort events by epoch time. Distributed systems use timestamps for ordering events, detecting clock drift, and implementing leader election algorithms. Every HTTP <code style={codeStyle}>Date</code> header, every JWT expiry, every cache TTL ultimately reduces to epoch arithmetic.
                    </p>
                    <p style={pStyle}>
                        Event sourcing architectures — where the state of an application is derived entirely from an append-only log of events — depend on timestamps to establish causal order. Message queues, stream processors, and time-series databases all store event time as epoch values because integer comparisons are orders of magnitude faster than parsing and comparing formatted date strings. When milliseconds of throughput matter, the Unix timestamp wins every time.
                    </p>
                </section>

                {/* ── Seconds vs milliseconds ──────────────────── */}
                <section style={sectionStyle}>
                    <h2 style={h2Style}>Seconds vs milliseconds: the most common confusion</h2>
                    <p style={pStyle}>
                        The single most common source of timestamp bugs in production software is confusing <strong style={{ color: 'var(--ink)' }}>second-precision timestamps</strong> with <strong style={{ color: 'var(--ink)' }}>millisecond-precision timestamps</strong>. The rule is simple: a Unix timestamp in seconds is a <strong style={{ color: 'var(--ink)' }}>10-digit number</strong> (e.g. <code style={codeStyle}>1704067200</code>), while a millisecond timestamp is a <strong style={{ color: 'var(--ink)' }}>13-digit number</strong> (e.g. <code style={codeStyle}>1704067200000</code>). If you ever see a timestamp and you are not sure which unit it is in, count the digits — ten digits means seconds, thirteen means milliseconds.
                    </p>
                    <p style={pStyle}>
                        Different languages use different defaults, which is the root of the confusion. <strong style={{ color: 'var(--ink)' }}>JavaScript</strong>'s <code style={codeStyle}>Date.now()</code> returns <em>milliseconds</em>. <strong style={{ color: 'var(--ink)' }}>Python</strong>'s <code style={codeStyle}>time.time()</code> returns <em>seconds</em> as a float. <strong style={{ color: 'var(--ink)' }}>Java</strong>'s <code style={codeStyle}>System.currentTimeMillis()</code> returns <em>milliseconds</em>, matching JavaScript. <strong style={{ color: 'var(--ink)' }}>Go</strong>'s <code style={codeStyle}>time.Now().Unix()</code> returns <em>seconds</em>, while <code style={codeStyle}>time.Now().UnixMilli()</code> returns <em>milliseconds</em>. When you pass a JavaScript timestamp to a Python function that expects seconds, the value is 1,000 times too large, and your dates will land roughly in the year 56,000.
                    </p>
                    <div style={{ ...cardStyle, marginBottom: 14, background: 'var(--page-bg)', borderLeft: '3px solid var(--green)' }}>
                        <p style={{ ...pStyle, marginBottom: 0, fontSize: 14 }}>
                            <strong style={{ color: 'var(--ink)' }}>Silent double-division bug:</strong> A particularly insidious variant occurs when a millisecond timestamp is divided by 1,000 twice. The first division is correct and yields a valid seconds timestamp. The second division — perhaps because the value was passed through a function that "normalises" timestamps to seconds — produces a number around <code style={codeStyle}>1,704,067</code>, which corresponds to January 1970. No exception is thrown. The timestamp silently lands in the past and corrupts whatever record it is stored in. Always verify the magnitude of a timestamp before operating on it.
                        </p>
                    </div>
                    <p style={pStyle}>
                        The safest practice is to be explicit at every boundary. Name your variables <code style={codeStyle}>createdAtSeconds</code> or <code style={codeStyle}>createdAtMs</code> rather than a bare <code style={codeStyle}>createdAt</code>. Add a comment to any function that accepts a timestamp specifying which unit it expects. When reading timestamps from an external API, log the raw value and visually verify the digit count before storing it.
                    </p>
                </section>

                {/* ── Common timestamp formats ─────────────────── */}
                <section style={sectionStyle}>
                    <h2 style={h2Style}>Common timestamp formats explained</h2>
                    <p style={pStyle}>
                        Timestamps appear in many formats across different systems and protocols. Understanding which format a given context expects will save you hours of debugging. The table below covers the five formats you will encounter most often.
                    </p>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                                    {['Format', 'Example', 'Used in'].map(h => (
                                        <th key={h} style={thStyle}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    {
                                        fmt: 'Unix seconds',
                                        ex: '1704067200',
                                        use: 'Databases, server-side APIs, POSIX functions, JWT "exp" and "iat" fields, Redis TTLs, cron job scheduling',
                                    },
                                    {
                                        fmt: 'Unix milliseconds',
                                        ex: '1704067200000',
                                        use: 'JavaScript Date object, Java System.currentTimeMillis(), browser performance APIs, Elasticsearch, Kafka message timestamps',
                                    },
                                    {
                                        fmt: 'ISO 8601',
                                        ex: '2024-01-01T00:00:00Z',
                                        use: 'REST API payloads, OpenAPI specs, logs (structured JSON logs), HTML datetime attributes, calendar applications',
                                    },
                                    {
                                        fmt: 'RFC 2822',
                                        ex: 'Mon, 01 Jan 2024 00:00:00 +0000',
                                        use: 'Email headers (Date:), HTTP Date header, RSS/Atom feed timestamps, legacy mail clients',
                                    },
                                    {
                                        fmt: 'Local datetime',
                                        ex: '01/01/2024 12:00:00 AM',
                                        use: 'UI display only — platform and locale specific. Never use for storage or data exchange; contains no timezone information',
                                    },
                                ].map(({ fmt, ex, use }, i) => (
                                    <tr key={fmt} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--ink)' }}>{fmt}</td>
                                        <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, whiteSpace: 'nowrap' }}>{ex}</td>
                                        <td style={tdStyle}>{use}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p style={{ ...pStyle, marginTop: 14 }}>
                        ISO 8601 is the format recommended by most modern API style guides, including the Google API Design Guide and the OpenAPI Specification. Its unambiguous, sortable structure — where lexicographic ordering matches chronological ordering — makes it ideal for log storage and search. Always include the trailing <code style={codeStyle}>Z</code> suffix (indicating UTC) when serialising to ISO 8601; omitting it produces a "local time" string that different parsers may interpret differently.
                    </p>
                </section>

                {/* ── Year 2038 problem ────────────────────────── */}
                <section style={sectionStyle}>
                    <h2 style={h2Style}>The Year 2038 problem</h2>
                    <p style={pStyle}>
                        In many legacy C and POSIX systems, Unix time is stored as a <strong style={{ color: 'var(--ink)' }}>32-bit signed integer</strong>. A signed 32-bit integer can hold values from −2,147,483,648 to 2,147,483,647. That upper limit corresponds to <strong style={{ color: 'var(--ink)' }}>2038-01-19T03:14:07Z</strong>. One second after that moment, the counter will overflow and wrap to its minimum value, causing any system still using 32-bit time to interpret the date as December 13, 1901 — a replay of the Y2K problem, but potentially more severe because many affected systems are deeply embedded.
                    </p>
                    <p style={pStyle}>
                        The systems most at risk are embedded Linux devices — industrial controllers, legacy routers, medical devices, and automotive firmware that were shipped with 32-bit kernels and may never receive an update. Legacy C applications that use the <code style={codeStyle}>time_t</code> type on 32-bit platforms are similarly affected. MySQL's <code style={codeStyle}>TIMESTAMP</code> type was historically limited to the 2038 range (though modern versions use 64-bit storage). File systems that store modification times as 32-bit epoch values, such as older ext2/ext3 variants, will also be affected.
                    </p>
                    <p style={pStyle}>
                        Modern 64-bit systems completely eliminate this issue. A 64-bit signed integer can represent timestamps up to roughly <strong style={{ color: 'var(--ink)' }}>292 billion years</strong> from the epoch — comfortably beyond any reasonable planning horizon. Linux on 64-bit hardware switched to 64-bit <code style={codeStyle}>time_t</code> decades ago. All modern databases — PostgreSQL, MySQL 8+, SQLite, MongoDB — use 64-bit time storage. If you are building new software today, you should use 64-bit integers for all timestamp storage and never use 32-bit <code style={codeStyle}>time_t</code> directly in C/C++ code. The problem is not academic: organisations with long-lived embedded systems should audit them for 32-bit time dependencies before 2038.
                    </p>
                </section>

                {/* ── Best practices ───────────────────────────── */}
                <section style={sectionStyle}>
                    <h2 style={h2Style}>Best practices for timestamps in software</h2>
                    <p style={pStyle}>
                        Consistent timestamp handling across a codebase prevents entire categories of bugs. These are the practices adopted by teams that have learned these lessons the hard way.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            {
                                title: 'Always store UTC',
                                desc: 'Every timestamp stored in a database, message queue, or log should be in UTC. Storing local time in a database is one of the most common sources of subtle, hard-to-reproduce bugs — especially around daylight saving time transitions. UTC has no ambiguous hours and no clock shifts.',
                            },
                            {
                                title: 'Use ISO 8601 for API payloads',
                                desc: 'When exchanging timestamps over HTTP or in JSON, use ISO 8601 with explicit UTC offset: 2024-01-01T00:00:00Z. It is human-readable, unambiguous, and parseable by every modern date library in every language without custom format strings.',
                            },
                            {
                                title: 'Use 64-bit integers for storage',
                                desc: 'Never store Unix timestamps in 32-bit integers. Use BIGINT in SQL, int64 in Go/Rust/C, long in Java, or number in JavaScript (which uses 64-bit floats and can safely represent all epoch values well past the year 9999).',
                            },
                            {
                                title: 'Never store local time in databases',
                                desc: 'A timestamp like "2024-03-10 02:30:00" in the America/New_York timezone is ambiguous — it could refer to two different UTC moments because of the spring DST gap. Storing it as a UTC epoch or UTC ISO string makes it unambiguous.',
                            },
                            {
                                title: 'Display local time only at the UI layer',
                                desc: 'Convert UTC timestamps to the user\'s local timezone only at the point of display, using the browser\'s Intl API or a library like date-fns. Keep every layer below the UI — database, API, business logic — in UTC.',
                            },
                        ].map(({ title, desc }) => (
                            <div key={title} style={{ ...cardStyle, display: 'flex', gap: 14 }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', flexShrink: 0, marginTop: 6 }} />
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                                    <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p style={{ ...pStyle, marginTop: 16 }}>
                        If you frequently work with time durations alongside timestamps, the{' '}
                        <a href="/tools/time-converter" style={linkStyle}>Time Converter</a>
                        {' '}tool on this site lets you instantly convert between seconds, minutes, hours, days, and weeks — useful for setting cache TTLs, JWT expiry windows, and retry back-off limits.
                    </p>
                </section>


                {/* ── How to get the current timestamp ────────── */}
                <section style={sectionStyle}>
                    <h2 style={h2Style}>How to get the current timestamp in different languages</h2>
                    <p style={pStyle}>
                        The table below is a quick-reference cheat sheet for getting the current Unix timestamp — in both seconds and milliseconds — across the most common programming languages. Every snippet returns an integer; fractional seconds are stripped where relevant.
                    </p>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                                    {['Language', 'Seconds', 'Milliseconds'].map(h => (
                                        <th key={h} style={thStyle}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    {
                                        lang: 'JavaScript',
                                        sec: 'Math.floor(Date.now() / 1000)',
                                        ms: 'Date.now()',
                                    },
                                    {
                                        lang: 'Python',
                                        sec: 'int(time.time())',
                                        ms: 'int(time.time() * 1000)',
                                    },
                                    {
                                        lang: 'Go',
                                        sec: 'time.Now().Unix()',
                                        ms: 'time.Now().UnixMilli()',
                                    },
                                    {
                                        lang: 'Rust',
                                        sec: 'SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs()',
                                        ms: 'SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_millis()',
                                    },
                                    {
                                        lang: 'Java',
                                        sec: 'Instant.now().getEpochSecond()',
                                        ms: 'System.currentTimeMillis()',
                                    },
                                    {
                                        lang: 'PHP',
                                        sec: 'time()',
                                        ms: '(int)(microtime(true) * 1000)',
                                    },
                                    {
                                        lang: 'Ruby',
                                        sec: 'Time.now.to_i',
                                        ms: '(Time.now.to_f * 1000).to_i',
                                    },
                                    {
                                        lang: 'SQL (MySQL)',
                                        sec: 'UNIX_TIMESTAMP()',
                                        ms: 'ROUND(UNIX_TIMESTAMP(NOW(3)) * 1000)',
                                    },
                                    {
                                        lang: 'SQL (PostgreSQL)',
                                        sec: 'EXTRACT(EPOCH FROM NOW())::BIGINT',
                                        ms: '(EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT',
                                    },
                                    {
                                        lang: 'C# / .NET',
                                        sec: 'DateTimeOffset.UtcNow.ToUnixTimeSeconds()',
                                        ms: 'DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()',
                                    },
                                ].map(({ lang, sec, ms }, i) => (
                                    <tr key={lang} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{lang}</td>
                                        <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{sec}</td>
                                        <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{ms}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p style={{ ...pStyle, marginTop: 14 }}>
                        Note that Rust requires importing <code style={codeStyle}>std::time::{'{'} SystemTime, UNIX_EPOCH {'}'}</code>, and Python requires <code style={codeStyle}>import time</code> at the top of the file. In Go, <code style={codeStyle}>UnixMilli()</code> was added in Go 1.17; for older versions use <code style={codeStyle}>time.Now().UnixNano() / int64(time.Millisecond)</code>. The SQL variants assume the server clock is set to UTC, which it always should be in production environments.
                    </p>
                </section>

            </div>
        </div>
    );
}
