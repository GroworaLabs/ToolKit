export default function TimeConverterContent() {
    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
            <div>

                {/* ── What is ─────────────────────────────────── */}
                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        What is a time converter?
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        A time converter is a tool that translates a duration expressed in one unit — seconds, minutes, hours, days, weeks, or years — into all the equivalent values in other units simultaneously. Instead of doing sequential mental arithmetic or chaining multiple calculations, you enter a single value and instantly see the complete picture.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        This might sound trivial, but time unit conversions are one of the most error-prone calculations in software development. Mixing up seconds and milliseconds causes bugs that only surface in production. Miscounting days in a multi-week deadline leads to missed deliveries. Entering a cache TTL in minutes instead of seconds silently breaks cache behavior. A reliable converter eliminates these mistakes.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
                        This converter is entirely browser-based. Every conversion runs locally in your JavaScript engine — nothing is sent to a server, and results appear instantly as you type, with no button to press.
                    </p>
                </section>

                {/* ── The units ───────────────────────────────── */}
                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Time units explained
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
                        Understanding the precise relationship between time units prevents bugs and miscommunication. Here are the exact definitions used by this converter:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            {
                                unit: 'Second (s)',
                                def:  'The SI base unit of time. Defined by the International System of Units as 9,192,631,770 oscillations of a caesium-133 atom. All other units in this converter are derived from the second.',
                                key:  '1 second = 1 s',
                            },
                            {
                                unit: 'Minute (min)',
                                def:  'Exactly 60 seconds. The minute is not an SI unit but is accepted for use with it. A minute of arc (1/60 of a degree) shares the name but is unrelated to time.',
                                key:  '1 minute = 60 s',
                            },
                            {
                                unit: 'Hour (h)',
                                def:  'Exactly 60 minutes or 3,600 seconds. Hours are used universally for scheduling, work durations, and speed calculations (km/h, mph).',
                                key:  '1 hour = 3,600 s',
                            },
                            {
                                unit: 'Day (d)',
                                def:  'Exactly 24 hours or 86,400 seconds. A solar day is the time between successive solar noons — very close to 86,400 s but not identical due to Earth\'s orbital variation. For timekeeping, a day is defined as exactly 86,400 seconds.',
                                key:  '1 day = 86,400 s',
                            },
                            {
                                unit: 'Week (wk)',
                                def:  'Exactly 7 days or 604,800 seconds. The 7-day week is almost universal in modern calendars, derived from ancient Babylonian astronomy and adopted into the Julian and Gregorian calendars.',
                                key:  '1 week = 604,800 s',
                            },
                            {
                                unit: 'Year (yr)',
                                def:  'This converter uses 365 days (31,536,000 seconds) as one year — the standard non-leap year. A tropical year (one orbit of the Earth) is 365.2422 days. The Gregorian calendar\'s leap year system averages 365.2425 days per year over 400 years.',
                                key:  '1 year = 31,536,000 s',
                            },
                        ].map(({ unit, def, key }) => (
                            <div key={unit} style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{unit}</span>
                                    <code style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', background: 'var(--green-lt)', color: 'var(--green)', padding: '2px 8px', borderRadius: 4 }}>{key}</code>
                                </div>
                                <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.65, margin: 0 }}>{def}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Developer use cases ─────────────────────── */}
                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Time conversion for developers
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
                        Time unit conversions come up constantly in software engineering. These are the most common scenarios where a quick, accurate converter is invaluable:
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: 10 }}>
                        {[
                            {
                                title: 'Cache TTLs',
                                desc:  'Redis, Memcached, HTTP Cache-Control, and CDN rules all express expiry in seconds. Enter your intended duration in days or hours and read off the seconds value directly.',
                            },
                            {
                                title: 'JWT / Session expiry',
                                desc:  'JSON Web Tokens use "exp" as a Unix timestamp and "iat" as issued-at. Calculating expiry windows in seconds from human-readable durations is a daily task.',
                            },
                            {
                                title: 'Rate limiting',
                                desc:  'Rate limiters typically work in windows of seconds or minutes. Converting "100 requests per hour" to the seconds window is trivial with a converter.',
                            },
                            {
                                title: 'Cron job scheduling',
                                desc:  'Understanding how many seconds are in a weekly or monthly window helps you verify cron expressions and avoid scheduling drift.',
                            },
                            {
                                title: 'Retry back-off',
                                desc:  'Exponential back-off strategies are implemented in milliseconds. Converting upper-bound limits (e.g. "no more than 5 minutes") to milliseconds prevents silent overflow bugs.',
                            },
                            {
                                title: 'SLA calculations',
                                desc:  'Service Level Agreements express uptime as a percentage. Converting downtime budgets ("99.9% uptime = X minutes/year") requires precise seconds-to-minutes conversions.',
                            },
                        ].map(({ title, desc }) => (
                            <div key={title} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                                <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55 }}>{desc}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Common conversions table ─────────────────── */}
                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Quick reference: seconds in common durations
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
                        These values appear so frequently in software that many developers memorise them. Bookmark this section or use the converter above whenever you need them.
                    </p>
                    <div style={{ overflowX: 'auto', width: '100%' }}>
                        <table style={{ minWidth: 420, borderCollapse: 'collapse', fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                                    {['Duration', 'Seconds', 'Minutes', 'Hours'].map(h => (
                                        <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { d: '1 minute',        s: '60',            m: '1',         h: '0.0167'     },
                                    { d: '5 minutes',       s: '300',           m: '5',         h: '0.0833'     },
                                    { d: '15 minutes',      s: '900',           m: '15',        h: '0.25'       },
                                    { d: '30 minutes',      s: '1,800',         m: '30',        h: '0.5'        },
                                    { d: '1 hour',          s: '3,600',         m: '60',        h: '1'          },
                                    { d: '6 hours',         s: '21,600',        m: '360',       h: '6'          },
                                    { d: '12 hours',        s: '43,200',        m: '720',       h: '12'         },
                                    { d: '1 day',           s: '86,400',        m: '1,440',     h: '24'         },
                                    { d: '3 days',          s: '259,200',       m: '4,320',     h: '72'         },
                                    { d: '1 week',          s: '604,800',       m: '10,080',    h: '168'        },
                                    { d: '2 weeks',         s: '1,209,600',     m: '20,160',    h: '336'        },
                                    { d: '30 days',         s: '2,592,000',     m: '43,200',    h: '720'        },
                                    { d: '90 days',         s: '7,776,000',     m: '129,600',   h: '2,160'      },
                                    { d: '1 year (365 d)',  s: '31,536,000',    m: '525,600',   h: '8,760'      },
                                ].map(({ d, s, m, h }, i) => (
                                    <tr key={d} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{d}</td>
                                        <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-2)' }}>{s}</td>
                                        <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-2)' }}>{m}</td>
                                        <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-2)' }}>{h}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* ── Uptime SLA reference ─────────────────────── */}
                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        SLA uptime: what "nines" mean in downtime minutes
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
                        Service Level Agreements express reliability as a percentage of uptime. The table below shows how many minutes and hours of allowed downtime correspond to each SLA level per year — useful for understanding what your uptime commitment actually means in practice.
                    </p>
                    <div style={{ overflowX: 'auto', width: '100%' }}>
                        <table style={{ minWidth: 520, borderCollapse: 'collapse', fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                                    {['Uptime SLA', 'Downtime / year', 'Downtime / month', 'Downtime / week'].map(h => (
                                        <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { sla: '99%   (2 nines)',    yr: '3 d 15 h 36 m',  mo: '7 h 18 m',   wk: '1 h 41 m' },
                                    { sla: '99.5%',              yr: '1 d 19 h 48 m',  mo: '3 h 39 m',   wk: '50 m 24 s' },
                                    { sla: '99.9%  (3 nines)',   yr: '8 h 45 m 57 s',  mo: '43 m 49 s',  wk: '10 m 4 s' },
                                    { sla: '99.95%',             yr: '4 h 22 m 58 s',  mo: '21 m 54 s',  wk: '5 m 2 s' },
                                    { sla: '99.99% (4 nines)',   yr: '52 m 35 s',       mo: '4 m 22 s',   wk: '1 m 0 s' },
                                    { sla: '99.999% (5 nines)',  yr: '5 m 15 s',        mo: '26 s',       wk: '6 s' },
                                ].map(({ sla, yr, mo, wk }, i) => (
                                    <tr key={sla} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>{sla}</td>
                                        <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{yr}</td>
                                        <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{mo}</td>
                                        <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{wk}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--ink-4)', marginTop: 10, fontStyle: 'italic' }}>
                        Based on 365.25 days per year average (accounting for leap years).
                    </p>
                </section>


                {/* ── Tips for accurate conversions ────────────── */}
                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Tips for accurate time calculations
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            {
                                title: 'Always store durations in seconds (or milliseconds)',
                                desc:  'In application code, store time durations as a single integer in the smallest relevant unit (seconds for most use cases, milliseconds for high-resolution timing). Convert to human-readable units only at the presentation layer. This prevents accumulation of rounding errors.',
                            },
                            {
                                title: 'Never treat a month as 30 days in financial code',
                                desc:  'Calendar months range from 28 to 31 days. For billing, subscription, and financial calculations, use calendar-aware date libraries (date-fns, Luxon, Temporal) instead of fixed-day approximations. An off-by-one-day error compounds over 12 months.',
                            },
                            {
                                title: 'Distinguish between elapsed time and calendar time',
                                desc:  'Elapsed time (duration) is a count of seconds. Calendar time is a specific point on a timeline. A "90-day trial" is an elapsed duration; "the trial ends on July 4th" is a calendar point. Confusing them leads to timezone and daylight saving bugs.',
                            },
                            {
                                title: 'Account for leap seconds in long-duration calculations',
                                desc:  'International timekeeping occasionally inserts a "leap second" to keep UTC synchronized with Earth\'s rotation. Between 1972 and 2016, 27 leap seconds were added. For durations spanning decades, this may be relevant — but for most software, treating a day as exactly 86,400 seconds is correct.',
                            },
                            {
                                title: 'Use Unix timestamps for storage, local time for display',
                                desc:  'Store all timestamps as UTC Unix time (seconds since 1970-01-01T00:00:00Z). Convert to local time only when displaying to a user. This ensures your data is timezone-unambiguous and immune to daylight saving transitions.',
                            },
                        ].map(({ title, desc }) => (
                            <div key={title} style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', display: 'flex', gap: 14 }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', flexShrink: 0, marginTop: 6 }} />
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                                    <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>


                {/* ── Time zones and UTC ──────────────────── */}
                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Milliseconds, microseconds, and nanoseconds in software
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
                        This converter covers seconds to years — the units you use when discussing durations in human terms. But software also works with sub-second units that are critical for performance measurement, timestamps, and high-frequency operations:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                        {[
                            {
                                unit: 'Millisecond (ms)',
                                val: '1 s = 1,000 ms',
                                uses: 'JavaScript Date.now(), setTimeout/setInterval arguments, HTTP response time logging, animation frame budgets (16ms per frame at 60 fps), database query timeouts, Redis TTL in some clients.',
                            },
                            {
                                unit: 'Microsecond (μs)',
                                val: '1 s = 1,000,000 μs',
                                uses: 'Linux system call latency, CPU cache miss cost, network packet round-trip within a data center, performance.now() in browsers (1μs resolution), PostgreSQL query planning statistics.',
                            },
                            {
                                unit: 'Nanosecond (ns)',
                                val: '1 s = 1,000,000,000 ns',
                                uses: 'CPU clock cycles (a 3GHz CPU executes one cycle in ~0.33 ns), memory access latency (L1 cache: ~1ns, RAM: ~100ns), Go time.Duration, Java System.nanoTime(), high-frequency trading timestamps.',
                            },
                        ].map(({ unit, val, uses }) => (
                            <div key={unit} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{unit}</span>
                                    <code style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', background: 'var(--green-lt)', color: 'var(--green)', padding: '2px 8px', borderRadius: 4 }}>{val}</code>
                                </div>
                                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.65, margin: 0 }}><strong style={{ color: 'var(--ink-2)' }}>Used in:</strong> {uses}</p>
                            </div>
                        ))}
                    </div>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        The most dangerous unit mismatch in web development is <strong style={{ color: 'var(--ink)' }}>seconds vs milliseconds</strong>. Unix timestamps are in seconds; JavaScript's Date.now() returns milliseconds; many APIs (including AWS and Stripe webhooks) use seconds; but setTimeout() uses milliseconds. Always check the unit before using a numeric timestamp, and name your variables accordingly: <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>expiresAtSeconds</code> vs <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>delayMs</code>.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
                        For performance measurement in Node.js, prefer <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>process.hrtime.bigint()</code> over Date.now() — it returns nanoseconds as a BigInt and is not affected by system clock adjustments. In the browser, use <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>performance.now()</code> for sub-millisecond resolution.
                    </p>
                </section>

            </div>
        </div>
    );
}
