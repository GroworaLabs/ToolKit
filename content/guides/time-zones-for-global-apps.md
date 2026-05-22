---
title: "Time Zone Handling for Global Web Applications"
description: "Time zones are the source of some of the most subtle and costly bugs in software. This guide covers UTC-first design, IANA time zone identifiers, daylight saving edge cases, and how to handle timestamps correctly across every layer of your stack."
category: "Developer Tools"
tools: ["timestamp-converter", "time-converter"]
tags: ["time zones", "utc", "timestamps", "internationalization", "javascript", "python", "datetime"]
publishedAt: "2026-05-22"
author: "ryan-fletcher"
---

Time zone bugs are unusually expensive bugs to fix. They are rarely caught in tests because test environments often run in UTC. They show up in production when a user in a different time zone interacts with a feature the developer only tested locally. And they cause data integrity problems — duplicate appointments, missed deadlines, events that appear to happen before they were created — that are hard to diagnose retroactively.

The good news is that the rules for handling time zones correctly are simple, consistent, and learnable. Most time zone bugs come from a handful of repeated mistakes. This guide covers the rules and the mistakes.

---

## The Foundational Rule: Store UTC, Display Local

Every timestamp that enters your system should be converted to UTC immediately and stored as UTC. Every timestamp that is displayed to a user should be converted from UTC to the user's local time zone at the moment of display.

This rule eliminates the most common time zone bugs:

- No ambiguity about what "5:00 PM" means in your database
- No confusion when your servers change time zones (they should not, but deployments move)
- No problems when a user moves from New York to Berlin
- No daylight saving transition errors on stored data

```
User input (local time) → Convert to UTC → Store in database
Database (UTC) → Retrieve → Convert to user's local time → Display
```

Never store local time. Never store a time without an associated time zone.

---

## UTC vs. Unix Timestamps vs. ISO 8601

There are three common timestamp representations:

**Unix timestamp (Unix time / POSIX time)**: the number of seconds (or milliseconds) since 1970-01-01 00:00:00 UTC. No time zone ambiguity — it is always UTC. Maximum interoperability across languages and systems.

```
1716384000        → 2026-05-22 12:00:00 UTC
1716384000000     → same, in milliseconds (JavaScript Date)
```

**ISO 8601 with offset**: a human-readable string that includes a time zone offset:

```
2026-05-22T12:00:00Z         → UTC (Z = +00:00)
2026-05-22T14:00:00+02:00    → UTC+2 (e.g., Central European Summer Time)
2026-05-22T08:00:00-04:00    → UTC-4 (e.g., US Eastern Daylight Time)
```

**ISO 8601 without offset** (avoid):

```
2026-05-22T12:00:00   → ambiguous — which time zone?
```

Never store ISO 8601 strings without an offset. "2026-05-22 12:00:00" in your database is useless unless you have documented and enforced a convention that all timestamps are UTC — and that convention will eventually be violated.

Use the [Timestamp Converter](/tools/timestamp-converter) to convert between Unix timestamps, ISO 8601, and other formats, and to verify that your conversions are correct.

---

## IANA Time Zone Database

The IANA (Internet Assigned Numbers Authority) maintains the canonical database of time zone rules: `America/New_York`, `Europe/London`, `Asia/Tokyo`, and ~600 others. This is the time zone identifier format you should use in application code and user settings.

**Do not use UTC offsets as identifiers.** "UTC+5" is ambiguous — there are multiple time zones at +5 offset that observe DST differently. `Asia/Karachi` and `Asia/Tashkent` are both "UTC+5" but have different historical transition rules.

**Do not use abbreviations.** "EST" is used for both US Eastern Standard Time (UTC-5) and Australian Eastern Standard Time (UTC+10). "IST" means Indian Standard Time, Irish Standard Time, and Israel Standard Time. Abbreviations are presentation only, never for storage or computation.

### Common IANA time zone identifiers

| Region | IANA Identifier | Standard offset | DST offset |
|---|---|---|---|
| US Eastern | `America/New_York` | UTC-5 | UTC-4 |
| US Pacific | `America/Los_Angeles` | UTC-8 | UTC-7 |
| US Central | `America/Chicago` | UTC-6 | UTC-5 |
| UK | `Europe/London` | UTC+0 | UTC+1 |
| Germany | `Europe/Berlin` | UTC+1 | UTC+2 |
| India | `Asia/Kolkata` | UTC+5:30 | no DST |
| Japan | `Asia/Tokyo` | UTC+9 | no DST |
| Australia Eastern | `Australia/Sydney` | UTC+10 | UTC+11 |
| China | `Asia/Shanghai` | UTC+8 | no DST |
| Brazil | `America/Sao_Paulo` | UTC-3 | UTC-2 |

---

## Daylight Saving Time: The Source of Most Bugs

DST transitions happen twice a year in many time zones. On the spring transition clock moves forward (clocks skip an hour), and on the autumn transition clocks move back (an hour repeats). Both transitions create bugs.

### Spring forward: the skipped hour

In the US Eastern time zone, on the second Sunday of March at 2:00 AM, clocks jump to 3:00 AM. The hour from 2:00 to 3:00 does not exist.

```
2:00 AM → 3:00 AM (skipped)
```

If you have a scheduled job that runs at 2:30 AM, it does not run on that day. If a user schedules an event at 2:30 AM, that time does not exist and the event's local time is ambiguous.

**Fix:** store UTC. "2:30 AM Eastern" becomes a UTC time that either exists or does not. Schedule on UTC, and accept that the local-time presentation may shift.

### Fall back: the repeated hour

In the US Eastern time zone, on the first Sunday of November at 2:00 AM, clocks fall back to 1:00 AM. The hour from 1:00 to 2:00 happens twice.

```
1:00 AM → 1:59 AM → 1:00 AM (again) → 1:59 AM → 2:00 AM
```

A timestamp of "1:30 AM Eastern" on this day is ambiguous — it happened twice. Unix timestamps are never ambiguous (1:30 AM EST ≠ 1:30 AM EDT), but ISO 8601 strings without offsets are.

**Common bug:** a `UNIQUE` constraint on appointment times stored as local time strings allows two appointments at "1:30 AM" — the database sees two different strings that map to the same UTC time.

### DST transition testing

Test dates to keep in the memory of every date/time test suite:

| Date | Event | Zone |
|---|---|---|
| 2026-03-08 02:00 | US spring forward | `America/New_York` |
| 2026-11-01 01:00 | US fall back | `America/New_York` |
| 2026-03-29 01:00 | EU spring forward | `Europe/London`, `Europe/Berlin` |
| 2026-10-25 01:00 | EU fall back | `Europe/London`, `Europe/Berlin` |
| 2026-10-04 02:00 | Australia spring forward | `Australia/Sydney` |

---

## Language-Specific Implementation

### JavaScript

JavaScript's built-in `Date` is UTC-based internally (stores a Unix timestamp in ms), but has inconsistent local-time behaviour. For reliable time zone work, use the `Temporal` API (stage 3 proposal, available via polyfill) or the `date-fns-tz` / `luxon` libraries.

```javascript
// Native Date — UTC operations
const now = new Date();
now.toISOString();          // "2026-05-22T12:00:00.000Z" — always UTC
now.getTime();              // Unix timestamp in ms
Date.now();                 // Same

// Intl.DateTimeFormat — display in any IANA time zone
const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  dateStyle: 'full',
  timeStyle: 'long',
});
formatter.format(now);
// "Thursday, May 22, 2026 at 8:00:00 AM Eastern Daylight Time"

// Convert a local time string to UTC (using date-fns-tz)
import { fromZonedTime, toZonedTime, format } from 'date-fns-tz';

// User entered "2026-05-22 14:00" in Berlin
const utcDate = fromZonedTime('2026-05-22 14:00', 'Europe/Berlin');
utcDate.toISOString();  // "2026-05-22T12:00:00.000Z"

// Display UTC date in Tokyo
const tokyoDate = toZonedTime(utcDate, 'Asia/Tokyo');
format(tokyoDate, 'yyyy-MM-dd HH:mm zzz', { timeZone: 'Asia/Tokyo' });
// "2026-05-22 21:00 GMT+9"
```

### Python

```python
from datetime import datetime, timezone, timedelta
import zoneinfo  # Python 3.9+ (backport: pip install backports.zoneinfo)

# Always create timezone-aware datetimes — never naive
utcnow = datetime.now(timezone.utc)
utcnow.isoformat()
# '2026-05-22T12:00:00.000000+00:00'

# Convert to a specific time zone
berlin = zoneinfo.ZoneInfo('Europe/Berlin')
berlin_time = utcnow.astimezone(berlin)
berlin_time.isoformat()
# '2026-05-22T14:00:00.000000+02:00'

# Parse a user-submitted ISO 8601 string
user_input = '2026-05-22T14:00:00+02:00'
dt = datetime.fromisoformat(user_input)
dt_utc = dt.astimezone(timezone.utc)
# → datetime(2026, 5, 22, 12, 0, tzinfo=timezone.utc)

# Store as Unix timestamp
timestamp = dt_utc.timestamp()  # 1716379200.0
```

**Never use naive datetimes** (`datetime.now()` without timezone) in production code. Python's `datetime.now()` returns local time with no timezone info attached — it is impossible to know what timezone it represents.

### PostgreSQL

```sql
-- Use TIMESTAMPTZ (timestamp with time zone), not TIMESTAMP
-- TIMESTAMPTZ stores UTC internally, converts on retrieval
CREATE TABLE events (
  id BIGINT PRIMARY KEY,
  starts_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert with explicit offset — PostgreSQL converts to UTC on write
INSERT INTO events (starts_at) VALUES ('2026-05-22 14:00:00+02:00');

-- Retrieve in a specific timezone (for display)
SELECT starts_at AT TIME ZONE 'America/New_York' AS local_start FROM events;

-- Search by time in a user's timezone
SELECT * FROM events
WHERE starts_at AT TIME ZONE 'Europe/Berlin' >= '2026-05-22 00:00:00'
  AND starts_at AT TIME ZONE 'Europe/Berlin' < '2026-05-23 00:00:00';
```

---

## User Time Zone Detection

**In the browser:**

```javascript
// IANA identifier of the browser's time zone
Intl.DateTimeFormat().resolvedOptions().timeZone;
// "America/New_York"

// UTC offset in minutes (negative = behind UTC)
new Date().getTimezoneOffset();  // 240 for EDT (UTC-4)
```

**Best practice:** use the IANA identifier, not the offset. The offset changes with DST; the IANA identifier does not.

**Storing user time zones:** store the IANA identifier in the user record and use it for all display operations. Never store UTC offsets.

```javascript
// On first login or in user settings
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
await updateUser({ timezone: userTimezone });

// On display
const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: user.timezone,
  dateStyle: 'medium',
  timeStyle: 'short',
});
```

---

## Common Mistakes

**Assuming the server is in the same time zone as users.** Your server may be in UTC, your CI in US Eastern, your laptop in Central European Time. Code that calls `new Date()` and treats it as user time fails on any machine that is not in the user's zone.

**Storing the UTC offset instead of the IANA identifier.** An offset of `-05:00` does not tell you whether DST applies. `America/New_York` does.

**Using `Date.toLocaleDateString()` without a `timeZone` option.** This uses the browser's system time zone, which is correct for the current user but wrong for data that represents another user's events.

**Comparing dates without normalising to UTC.** "Is today's appointments before midnight?" — "today" and "midnight" must both be in the same time zone.

**Not testing DST transitions.** Write a test that creates an event at 1:30 AM on the fall-back date and verify it resolves to the correct UTC time. This test will catch DST bugs before they reach production.

Use the [Timestamp Converter](/tools/timestamp-converter) to verify conversions between Unix timestamps and human-readable times in specific time zones, and the [Time Converter](/tools/time-converter) to understand what a given UTC time corresponds to across multiple regions simultaneously.
