---
title: "Cron Expressions Explained: Scheduling Jobs the Right Way"
description: "The five fields of a cron expression, the shortcuts everyone forgets, and the timezone mistakes that cause 3 AM pages."
category: "Developer Tools"
tools: ["cron-generator", "timestamp-converter"]
tags: ["cron", "scheduling", "devops", "jobs"]
publishedAt: "2026-04-14"
author: "olivia-bennett"
---

## Cron, in One Line

A cron expression is a five-field string that says **"run this at these times."** It answers the question "when should this job fire?" in a compact, portable format that every scheduler — from Unix `cron` to Kubernetes `CronJob` to serverless platforms — understands.

The syntax is terse enough to misread. This guide covers the fields, the shorthand, and the mistakes that cause incidents.

## The Five Fields

```
┌── minute (0–59)
│  ┌── hour (0–23)
│  │  ┌── day of month (1–31)
│  │  │  ┌── month (1–12, or JAN–DEC)
│  │  │  │  ┌── day of week (0–7, or SUN–SAT; 0 and 7 both mean Sunday)
│  │  │  │  │
*  *  *  *  *   command
```

Each field accepts a number, a range (`1-5`), a list (`1,3,5`), a step (`*/15`), or a wildcard (`*`). Generating and validating expressions is faster in the [Cron Expression Generator](/tools/cron-generator) than memorising every combination.

## The Expressions You'll Actually Write

| Expression | Meaning |
|---|---|
| `* * * * *` | Every minute |
| `*/5 * * * *` | Every 5 minutes |
| `0 * * * *` | Every hour, on the hour |
| `0 0 * * *` | Every day at midnight |
| `0 9 * * *` | Every day at 09:00 |
| `0 9 * * 1-5` | Every weekday at 09:00 |
| `0 0 1 * *` | First day of every month at midnight |
| `0 0 * * 0` | Every Sunday at midnight |
| `30 2 * * *` | Every day at 02:30 |
| `0 */6 * * *` | Every 6 hours |
| `0 9-17 * * 1-5` | Every hour from 09:00 to 17:00 on weekdays |

## Named Shortcuts

Most modern crons accept named shortcuts that are easier to read than the raw expression:

| Shortcut | Equivalent |
|---|---|
| `@yearly` / `@annually` | `0 0 1 1 *` |
| `@monthly` | `0 0 1 * *` |
| `@weekly` | `0 0 * * 0` |
| `@daily` / `@midnight` | `0 0 * * *` |
| `@hourly` | `0 * * * *` |

Use them when they express your intent — `@daily` is clearer to a reader than `0 0 * * *`.

## The Two-Field Gotcha

Day-of-month and day-of-week both appear in cron. What happens when both are specified?

```
0 0 15 * 1    → runs on the 15th OR on Monday, whichever comes first
```

This is the single most misread part of cron syntax. Vixie cron (the one most Linuxes ship) uses **OR** when both fields are set. Quartz cron (used by many Java schedulers) uses **AND** and requires `?` as a placeholder in one of the two fields.

The safe pattern: only constrain one of the two fields at a time. If you need "the 15th of the month, but only on a Monday," handle that check inside your job code instead of trying to encode it in cron.

## The Timezone Trap

Your cron expression has no timezone. The scheduler decides.

- System `cron` on Linux runs in the server's local timezone.
- Kubernetes `CronJob` defaults to UTC (unless `.spec.timeZone` is set — available from Kubernetes 1.27+).
- Most cloud schedulers default to UTC.
- GitHub Actions `schedule:` always runs in UTC.

If your team is spread across time zones, pick **UTC** and stick to it. Document the intent in the job name: `daily-report-0900-london-0000-utc`. Daylight saving time is also a trap — jobs scheduled at 02:30 local time can fire twice on "fall back" days and not at all on "spring forward" days. UTC avoids both.

Use the [Timestamp Converter](/tools/timestamp-converter) to translate between UTC and local when verifying a schedule.

## Overlap and Catch-Up

Two subtle behaviours worth knowing:

**Overlap.** If your job takes longer than the interval — a daily backup that sometimes runs 26 hours — the next invocation fires while the previous one is still running. System cron happily starts overlapping copies. Add a lockfile (`flock`) or set `concurrencyPolicy: Forbid` in Kubernetes to prevent this.

**Catch-up.** If the scheduler was down when a scheduled run should have fired, what happens when it comes back up? Most crons skip the missed run entirely. Kubernetes `CronJob` can be configured to run missed jobs within a `startingDeadlineSeconds` window. Decide explicitly: if "hourly analytics roll-up" misses two hours because of a reboot, do you want one catch-up run or two separate backfill runs or none?

## Quick Authoring Checklist

Before deploying a cron job, answer these:

1. **What timezone does the scheduler use?** Write the expression in that timezone.
2. **What happens if the job runs twice?** Make it idempotent, or prevent overlap.
3. **What happens if the job misses a run?** Document the catch-up behaviour.
4. **Where does the output go?** System cron emails stdout to the user by default — usually unread. Redirect to a log file.
5. **What monitors it?** A scheduled job that silently fails is worse than no job at all. Use a dead-man's-switch service (Healthchecks, Cronitor) or alerting on missed runs.

## Try It Now

Build and decode any cron expression visually with the [Cron Expression Generator](/tools/cron-generator) — it explains each field in plain English and previews the next 10 fire times. For debugging timezone issues, convert timestamps across zones with the [Timestamp Converter](/tools/timestamp-converter).
