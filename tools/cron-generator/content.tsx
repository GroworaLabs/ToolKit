export default function CronContent() {

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

    const cronFields = [
        { pos: 1, name: 'Minute',       range: '0–59',      chars: '* , - /' },
        { pos: 2, name: 'Hour',         range: '0–23',      chars: '* , - /' },
        { pos: 3, name: 'Day of Month', range: '1–31',      chars: '* , - / ?' },
        { pos: 4, name: 'Month',        range: '1–12',      chars: '* , - /' },
        { pos: 5, name: 'Day of Week',  range: '0–6 (0=Sun)', chars: '* , - / ?' },
    ];

    const essentialExpressions = [
        { expr: '* * * * *',       meaning: 'Every minute — useful for health-check pings and rapid polling tasks during development' },
        { expr: '0 * * * *',       meaning: 'Every hour on the hour — common for aggregation jobs, reporting roll-ups, and cache warming' },
        { expr: '0 0 * * *',       meaning: 'Every day at midnight UTC — classic for daily digest emails, database backups, and log rotation' },
        { expr: '0 9 * * 1-5',     meaning: 'At 09:00 on every weekday (Mon–Fri) — for business-hours notifications and scheduled reports' },
        { expr: '0 0 * * 0',       meaning: 'Every Sunday at midnight — weekly cleanup tasks, database vacuum, analytics export' },
        { expr: '*/15 * * * *',    meaning: 'Every 15 minutes — frequent polling, metrics collection, and queue drain checks' },
        { expr: '0 0 1 * *',       meaning: 'First day of every month at midnight — monthly invoice generation, billing cycles' },
        { expr: '0 2 * * *',       meaning: 'Every day at 2:00 AM UTC — off-peak maintenance window for migrations and data imports' },
        { expr: '30 23 * * 5',     meaning: 'At 23:30 every Friday — end-of-week report generation before the weekend' },
        { expr: '0 0 1 1 *',       meaning: 'At midnight on January 1st — annual reset jobs, year-over-year analytics initialisation' },
    ];

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
            <div>

                {/* ── What is cron ─────────────────────────────── */}
                <section style={sectionStyle}>
                    <h2 style={h2Style}>What is cron and where is it used?</h2>
                    <p style={pStyle}>
                        Cron is a time-based job scheduler that originated in Unix operating systems in the 1970s. Its name comes from the Greek word <em>chronos</em> (time). The cron daemon — a background process that runs continuously — reads configuration files called <strong style={{ color: 'var(--ink)' }}>crontabs</strong> (cron tables), checks them against the current time every minute, and executes any commands whose schedule matches. For decades, cron was the de facto standard for automating repetitive server tasks: rotating logs, backing up databases, sending digest emails, and pruning stale records.
                    </p>
                    <p style={pStyle}>
                        What began as a Unix utility has since grown into the universal scheduling primitive of the entire software industry. Today, cron expression syntax is used in an enormous range of platforms and services, far beyond the original Unix daemon:
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: 10, marginBottom: 16 }}>
                        {[
                            { title: 'GitHub Actions', desc: 'Scheduled workflows use cron syntax in the on.schedule trigger, allowing CI pipelines to run nightly builds, dependency audits, and stale issue cleanup automatically.' },
                            { title: 'AWS EventBridge', desc: 'Amazon\'s serverless event bus supports both cron expressions and rate expressions for triggering Lambda functions, Step Functions, and ECS tasks on a schedule.' },
                            { title: 'GCP Cloud Scheduler', desc: 'Google Cloud\'s managed cron service uses standard Unix cron syntax to trigger HTTP endpoints, Pub/Sub topics, and App Engine services at any cadence.' },
                            { title: 'Kubernetes CronJobs', desc: 'The CronJob resource in Kubernetes runs Job objects on a schedule defined with cron syntax, enabling periodic batch workloads inside container clusters.' },
                            { title: 'Heroku Scheduler', desc: 'Heroku\'s add-on provides simplified scheduling (every 10 min / hour / day) that maps to cron under the hood, running one-off dynos on a timed basis.' },
                            { title: 'Vercel & Netlify Cron', desc: 'Both platforms support scheduled serverless functions that fire on a cron schedule — Vercel Cron Functions and Netlify Scheduled Functions both use standard cron syntax.' },
                        ].map(({ title, desc }) => (
                            <div key={title} style={cardStyle}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                                <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55 }}>{desc}</div>
                            </div>
                        ))}
                    </div>
                    <p style={pStyle}>
                        Even tools that do not expose raw cron syntax — such as Airflow DAGs, dbt Cloud job schedules, and Celery Beat — use cron expressions internally and accept them in their configuration. Fluency with cron syntax is genuinely one of the most transferable skills in backend and DevOps engineering.
                    </p>
                </section>

                {/* ── Anatomy of a cron expression ─────────────── */}
                <section style={sectionStyle}>
                    <h2 style={h2Style}>Anatomy of a cron expression</h2>
                    <p style={pStyle}>
                        A standard Unix cron expression consists of <strong style={{ color: 'var(--ink)' }}>five fields</strong> separated by spaces. Each field controls a different unit of time. The fields are evaluated left to right, and a job runs only when <em>all five fields</em> match the current time simultaneously.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(160px, 100%), 1fr))', gap: 8, marginBottom: 20 }}>
                        {cronFields.map(({ pos, name, range, chars }) => (
                            <div key={pos} style={{ padding: '12px 14px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', textAlign: 'center' }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Field {pos}</div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{name}</div>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', marginBottom: 4 }}>{range}</div>
                                <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{chars}</div>
                            </div>
                        ))}
                    </div>
                    <p style={pStyle}>
                        Reading the expression <code style={codeStyle}>30 9 * * 1-5</code> from left to right: minute 30, hour 9, any day of month, any month, weekdays Monday through Friday. Combined: "Run at 09:30 every weekday." The asterisk <code style={codeStyle}>*</code> in field 3 and 4 means "match any value", so the day-of-month and month constraints do not restrict which days the job runs — only the day-of-week field does.
                    </p>
                    <p style={pStyle}>
                        Some platforms — notably AWS EventBridge and Quartz Scheduler (Java) — extend the standard five-field format to <strong style={{ color: 'var(--ink)' }}>six or seven fields</strong> by adding a seconds field at the start and optionally a year field at the end. Always check the documentation of the specific platform you are targeting, because the same string may be interpreted differently across systems.
                    </p>
                </section>

                {/* ── Special characters ───────────────────────── */}
                <section style={sectionStyle}>
                    <h2 style={h2Style}>Cron special characters explained</h2>
                    <p style={pStyle}>
                        Each of the five fields accepts a set of special characters in addition to numeric values. These characters dramatically expand the expressiveness of cron expressions without requiring one entry per match.
                    </p>
                    <div style={{ overflowX: 'auto', width: '100%' }}>
                        <table style={{ minWidth: 480, borderCollapse: 'collapse', fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                                    {['Character', 'Name', 'Example', 'Meaning'].map(h => (
                                        <th key={h} style={thStyle}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { char: '*', name: 'Wildcard',       ex: '* in Hour',           meaning: 'Matches every possible value in that field. * in the hour field means "every hour".' },
                                    { char: ',', name: 'List',           ex: '1,15 in Minute',      meaning: 'Matches a list of specific values. 1,15 means "at :01 and at :15".' },
                                    { char: '-', name: 'Range',          ex: '1-5 in Day of Week',  meaning: 'Matches a range of values inclusive. 1-5 means Monday through Friday.' },
                                    { char: '/', name: 'Step',           ex: '*/15 in Minute',      meaning: 'Matches at intervals. */15 means every 15 minutes; 0/30 means every 30 minutes starting at :00.' },
                                    { char: '?', name: 'No specific value', ex: '? in Day of Month', meaning: 'Supported in some systems (Quartz, AWS). Means "no specific value" — used to leave day-of-month or day-of-week unspecified when the other is set.' },
                                ].map(({ char, name, ex, meaning }, i) => (
                                    <tr key={char} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 18, color: 'var(--green)' }}>{char}</td>
                                        <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--ink)' }}>{name}</td>
                                        <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{ex}</td>
                                        <td style={tdStyle}>{meaning}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p style={{ ...pStyle, marginTop: 14 }}>
                        Lists and ranges can be combined freely. The expression <code style={codeStyle}>0 9,12,17 * * 1-5</code> runs at 9 AM, noon, and 5 PM on every weekday — three executions per day, five days a week. Step values can be applied to ranges as well: <code style={codeStyle}>0-30/5 * * * *</code> runs every five minutes within the first half of every hour.
                    </p>
                </section>

                {/* ── 10 essential expressions ─────────────────── */}
                <section style={sectionStyle}>
                    <h2 style={h2Style}>10 essential cron expressions every developer should know</h2>
                    <p style={pStyle}>
                        These expressions cover the vast majority of real-world scheduling needs. Copy them directly into your crontab, GitHub Actions workflow, or cloud scheduler configuration.
                    </p>
                    <div style={{ overflowX: 'auto', width: '100%' }}>
                        <table style={{ minWidth: 360, borderCollapse: 'collapse', fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                                    {['Expression', 'Meaning'].map(h => (
                                        <th key={h} style={thStyle}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {essentialExpressions.map(({ expr, meaning }, i) => (
                                    <tr key={expr} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, wordBreak: 'break-all', color: 'var(--ink)', fontWeight: 600 }}>{expr}</td>
                                        <td style={tdStyle}>{meaning}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* ── Cron vs other approaches ─────────────────── */}
                <section style={sectionStyle}>
                    <h2 style={h2Style}>Cron vs other scheduling approaches</h2>
                    <p style={pStyle}>
                        Cron is the right tool for many tasks, but not all of them. Understanding where it fits in the broader landscape of scheduling mechanisms will help you make the right architectural choice.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            {
                                title: 'Cron vs setInterval (JavaScript)',
                                desc: 'setInterval runs inside a running process and stops when the process dies. It has no persistence, no timezone awareness, and no catch-up on missed executions. Use setInterval only for short-lived, in-process periodic work like polling an internal state every few seconds. Use cron when the task must survive process restarts.',
                            },
                            {
                                title: 'Cron vs setTimeout loops',
                                desc: 'A common pattern is calling setTimeout recursively to create a "polling loop". Like setInterval, this lives and dies with the process and offers no scheduling precision (drift accumulates). For background jobs that need reliable cadence, a process-external scheduler like cron is more robust.',
                            },
                            {
                                title: 'Cron vs message queues (SQS / RabbitMQ delayed messages)',
                                desc: 'Message queues with delayed delivery — such as SQS message timers, RabbitMQ dead-letter queues, or BullMQ delayed jobs — are better when you need per-item scheduling (e.g. "send a reminder email 24 hours after user signup"). Cron is calendar-driven and applies to all items equally; message queues are entity-driven and apply individually. Use both together: a cron job enqueues messages, and workers process them.',
                            },
                            {
                                title: 'Cron vs database-driven schedulers',
                                desc: 'Tools like pg_cron (PostgreSQL extension), Sidekiq-Cron (Ruby), Celery Beat (Python), and Agenda (Node.js) store job schedules in a database and support dynamic schedule changes without redeploying configuration files. They are superior to system cron when schedule management needs to be part of the application itself — for example, when users can configure their own notification schedules.',
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
                        The general rule: cron is ideal for <strong style={{ color: 'var(--ink)' }}>system-level, calendar-driven, stateless tasks</strong>. If the job needs to know about individual records, retry failed items, fan out to many workers, or be managed dynamically, reach for a message queue or a database-backed scheduler instead.
                    </p>
                </section>


                {/* ── Timezone pitfalls ────────────────────────── */}
                <section style={sectionStyle}>
                    <h2 style={h2Style}>Timezone pitfalls with cron</h2>
                    <p style={pStyle}>
                        Timezone handling is the most operationally dangerous aspect of cron scheduling, and it catches even experienced engineers off guard. The core issue is that the <strong style={{ color: 'var(--ink)' }}>traditional Unix cron daemon uses the system clock of the server it runs on</strong>, with no awareness of the timezone in which your users or business operations are located. If your server is in UTC but your business is in New York, a cron job scheduled for <code style={codeStyle}>0 9 * * *</code> will run at 9 AM UTC — which is 4 AM or 5 AM New York time depending on DST.
                    </p>
                    <p style={pStyle}>
                        Daylight Saving Time (DST) introduces a second layer of complexity. When clocks spring forward by one hour, there is a 60-minute gap during which the local time never exists — any cron job scheduled to run during that gap simply does not fire. When clocks fall back by one hour, there is a 60-minute overlap during which the local time exists twice — a cron job scheduled in that window may run twice. These bugs are particularly dangerous because they only surface twice a year, often at off-peak hours when no one is watching dashboards.
                    </p>
                    <div style={{ ...cardStyle, background: 'var(--page-bg)', borderLeft: '3px solid var(--green)', marginBottom: 16 }}>
                        <p style={{ ...pStyle, marginBottom: 0, fontSize: 14 }}>
                            <strong style={{ color: 'var(--ink)' }}>Recommendation:</strong> Always write cron expressions in UTC and configure your scheduler explicitly to use UTC, regardless of where your users are. Most modern cloud schedulers — AWS EventBridge, GCP Cloud Scheduler, GitHub Actions — allow you to specify the timezone for each job. When you must use a non-UTC timezone, use a named IANA timezone (e.g. <code style={codeStyle}>America/New_York</code>) rather than a fixed UTC offset like <code style={codeStyle}>UTC-5</code>, because named timezones include DST rules while fixed offsets do not.
                        </p>
                    </div>
                    <p style={pStyle}>
                        A related pitfall affects containerised workloads. Docker containers inherit the UTC timezone of the host by default, which is usually correct — but if your container image explicitly sets a local timezone via the <code style={codeStyle}>TZ</code> environment variable or by copying <code style={codeStyle}>/etc/localtime</code>, your cron daemon inside the container will use that timezone. When you move the container across cloud regions or providers, the timezone travels with it and may produce unexpected execution times. Keep container images timezone-agnostic and always pass timezone configuration as an environment variable at runtime.
                    </p>
                    <p style={pStyle}>
                        Kubernetes CronJobs offer a <code style={codeStyle}>timeZone</code> field (added in Kubernetes 1.27, graduated to stable in 1.29) that lets you specify an IANA timezone per CronJob. Before that field was available, teams worked around the UTC-only limitation by adjusting their cron expressions to compensate for the offset — a fragile approach that broke every time DST changed. If you are on Kubernetes 1.27 or later, always use the <code style={codeStyle}>timeZone</code> field rather than adjusting expressions manually.
                    </p>
                </section>

            </div>
        </div>
    );
}
