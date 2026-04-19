---
title: "Unix Timestamps Explained: Epoch Time, Time Zones, and the Year 2038 Bug"
description: "How Unix time really works, why JavaScript uses milliseconds while Python uses seconds, and the time-zone gotchas that ship bugs to production."
category: "Developer Tools"
tools: ["timestamp-converter"]
tags: ["timestamps", "date", "epoch", "time-zones", "y2038"]
publishedAt: "2026-04-19"
author: "olivia-bennett"
---

## What "Unix Time" Actually Is

Unix time is a count of **seconds elapsed since 00:00:00 UTC on 1 January 1970** — a reference point called the *Unix epoch*. That's it. A number. No time zone, no calendar, no DST — just an integer that tells you how much time has passed since a single agreed-upon moment.

When you see a timestamp like `1767225600`, that's 25,600 seconds after midnight UTC on 1 January 2026. It means exactly the same moment in Kyiv, Tokyo, and São Paulo; it's just displayed differently.

This is why servers store time in Unix seconds (or milliseconds) and only convert to human-readable strings at the last moment, usually in the user's browser. Comparing, sorting, and doing arithmetic on Unix time is just integer math — no calendar logic, no timezone database lookups.

You can convert between Unix time and any formatted date with the [Timestamp Converter](/tools/timestamp-converter) — paste a number in, get an ISO string out (or vice versa).

## Seconds vs Milliseconds — the One Gotcha That Hurts

Unix time as specified uses **seconds**. But JavaScript broke with that convention: `Date.now()` returns **milliseconds** since the epoch. Python's `time.time()` returns seconds (as a float); Java's `System.currentTimeMillis()` uses milliseconds. Go's `time.Now().Unix()` returns seconds; `.UnixMilli()` returns milliseconds.

So a timestamp like `1767225600` is late December 2025 if interpreted as seconds, but 14 January 1970 if interpreted as milliseconds. The number `1767225600000` (three zeros appended) is the millisecond version of the same moment.

Two practical rules:

- A Unix timestamp in **seconds** for any year between 2001 and 2286 is a **10-digit** number.
- A Unix timestamp in **milliseconds** for the same range is a **13-digit** number.

If you receive a timestamp from an API and you're not sure which unit it's in, count the digits. 10 → seconds, 13 → ms.

## Time Zones Are a Display Concern

A timestamp has no time zone. What has a time zone is the *representation* you show the user. The moment `1767225600` is:

- `2025-12-31T12:00:00Z` in UTC
- `2025-12-31T14:00:00+02:00` in Kyiv
- `2026-01-01T03:00:00+15:00` in Kiribati

Same moment. Different clocks on different walls.

The rule most backend teams arrive at after one too many DST bugs: **store UTC, display local**. Never write `2025-12-31 14:00` to a database without knowing and recording the zone. Always convert to UTC on input, store as UTC (or as a Unix timestamp), and convert to local only when rendering.

When displaying, prefer the user's browser time zone (via `Intl.DateTimeFormat().resolvedOptions().timeZone` or the server `Accept-Language` header) over guessing based on IP.

## ISO 8601: The Human-Readable Companion

When you need a timestamp that's both unambiguous *and* readable, use ISO 8601:

```
2026-04-19T14:30:00Z
2026-04-19T17:30:00+03:00
```

The trailing `Z` means UTC (historically short for "Zulu"). A `+03:00` offset means three hours ahead of UTC. Never omit the zone suffix — without it, readers must guess, and guessers are often wrong.

Most languages parse ISO 8601 correctly. In JavaScript: `new Date("2026-04-19T14:30:00Z")` gives you a `Date` object. In Python: `datetime.fromisoformat("2026-04-19T14:30:00+00:00")` (note: Python < 3.11 doesn't parse `Z` directly).

## The Year 2038 Problem

On many legacy systems, Unix time is stored as a **signed 32-bit integer**. That's big enough for dates from December 1901 to **03:14:07 UTC on 19 January 2038** — and then it rolls over to the most negative 32-bit number, placing the clock back in 1901.

Any system still running a 32-bit `time_t` in 2038 will malfunction. Most modern OSes, databases, and language runtimes have moved to 64-bit timestamps, which push the overflow to the year 292,277,026,596 — well beyond any reasonable planning horizon. But embedded systems, old filesystems (ext3's timestamps are 32-bit), and binary file formats written before the migration are still vulnerable.

If you're choosing a column type today, pick `BIGINT` (64-bit) in MySQL or Postgres, not `INTEGER`. The storage cost is 4 extra bytes per row and the bug goes away.

## Leap Seconds (and Why You Can Usually Ignore Them)

Earth's rotation is slightly irregular. To keep atomic time aligned with astronomical time, the IERS occasionally inserts a "leap second" — an extra second added at the end of a UTC day.

Unix time **ignores leap seconds by definition**. A Unix day is always exactly 86,400 seconds, even on days that had 86,401 by the clock. Different systems handle the resulting mismatch differently:

- **Smearing** (Google, Amazon) — spread the extra second across 24 hours so the clock never actually ticks 60. Most production systems use some variant.
- **Repeating 59** — the second `23:59:60` becomes `23:59:59` twice.
- **Stepping back** — some systems step the clock back one second.

Leap seconds have broken things in the past (Reddit outage 2012, Cloudflare DNS 2017). In 2022, the General Conference on Weights and Measures voted to retire leap seconds by 2035 — so the problem is on the way out. Until then: store timestamps with millisecond precision at most, and assume adjacent seconds can be fuzzy.

## Other Epochs You'll Occasionally Meet

Unix is the dominant epoch, but not the only one:

| Epoch | Used by |
|---|---|
| 1 Jan 1970 UTC | Unix, POSIX, most languages |
| 1 Jan 1601 UTC | Windows `FILETIME` (100 ns ticks) |
| 1 Jan 1900 UTC | NTP protocol |
| 1 Jan 2001 UTC | Apple Cocoa (`CFAbsoluteTime`) |
| 6 Jan 1980 UTC | GPS time |

If you're ever interoperating with Windows event logs or old network protocols, double-check the epoch before interpreting the number.

## Common Mistakes

- **Mixing seconds and milliseconds.** 10 vs 13 digits. Check before converting.
- **Storing local time as a string.** Impossible to compare across zones. Store UTC.
- **Assuming `+0000` = `Z`.** They're equal in value but some parsers are picky about format.
- **Sorting ISO strings lexicographically works — for UTC.** The moment you introduce offsets, sort by the Unix equivalent instead.
- **Ignoring DST at compute time.** Use a timezone library (Luxon, date-fns-tz, pytz/zoneinfo) for anything involving a specific zone's calendar.

## Try It Now

Convert any Unix timestamp (seconds or milliseconds) to ISO 8601 and every common zone with the [Timestamp Converter](/tools/timestamp-converter). Useful for debugging API responses, checking cookie `Expires` values, or sanity-checking a log line from 03:17:42 UTC last Tuesday.
