---
title: "UUID vs ULID vs NanoID: Picking the Right ID for Your App"
description: "Four ID formats compared — what each looks like, how they sort, how much entropy they carry, and which fits which use case."
category: "Developer Tools"
tools: ["uuid-generator", "random-token-generator"]
tags: ["uuid", "ulid", "ids", "databases"]
publishedAt: "2026-04-14"
---

## Why the Choice Matters

The ID format you pick shapes a surprising amount of your system: how fast inserts are, whether IDs leak business information, whether they sort by creation time, how safe they are to use in URLs. The default "just use UUIDv4" is fine for a lot of cases — but "fine" hides real trade-offs when your table crosses 100 million rows or your IDs show up in customer-visible URLs.

This guide walks through the four formats you'll actually consider in 2026: **UUIDv4**, **UUIDv7**, **ULID**, and **NanoID**.

## Format at a Glance

| Format | Example | Length | Sortable | Entropy |
|---|---|---|---|---|
| UUIDv4 | `550e8400-e29b-41d4-a716-446655440000` | 36 chars | No | 122 bits |
| UUIDv7 | `01890a5d-ac96-774b-bcce-b302099a8057` | 36 chars | Yes (by time) | 74 bits |
| ULID | `01ARZ3NDEKTSV4RRFFQ69G5FAV` | 26 chars | Yes (by time) | 80 bits |
| NanoID | `V1StGXR8_Z5jdHi6B-myT` | 21 chars (default) | No | 126 bits |

All of these are collision-safe at practical scale — generating billions per second for decades before a realistic collision.

## UUIDv4 — the Safe Default

A random 122-bit identifier, formatted as 32 hex digits with 4 hyphens. Used everywhere, supported natively in most languages and databases. Generate one with the [UUID Generator](/tools/uuid-generator).

**Good for:** public-facing IDs where sort order doesn't matter, cross-service deduplication, anything where "random and unique" is enough.

**Downside:** random IDs fragment database indexes. Every insert lands in an unpredictable part of the B-tree, causing page splits and poor cache locality. At high write volume, this shows up as slower inserts and bigger indexes on disk.

## UUIDv7 — Time-Ordered UUID

Same 36-character format as UUIDv4, but the first 48 bits are a millisecond timestamp. The remaining 74 bits are random. UUIDv7 was standardised in RFC 9562 (2024) and is now supported by most databases and major ORMs.

**Good for:** primary keys in high-volume databases. Because the high bits increase over time, sequential inserts hit adjacent index pages — dramatically better write performance than UUIDv4.

**Trade-off:** the timestamp is recoverable from the ID, which leaks creation time. Fine for internal IDs, not ideal for tokens you'd rather not have timed.

## ULID — Sortable, Compact, Case-Safe

ULIDs are 26 characters of Crockford Base32 — no `I`, `L`, `O`, or `U`, so they're unambiguous when typed or read aloud. First 10 characters encode a 48-bit millisecond timestamp, last 16 encode 80 bits of randomness.

**Good for:** user-visible IDs in URLs, customer support ("can you read me your order ID?"), log correlation. Shorter than UUID, sortable like UUIDv7, but much more human-friendly.

**Trade-off:** fewer native database types — in Postgres you'd store ULIDs as `text` or a custom domain, not as the built-in `uuid` type.

## NanoID — the Short, URL-Safe ID

NanoID generates short random IDs from a URL-safe alphabet (`A-Za-z0-9_-`). At the default 21 characters it carries 126 bits of entropy — higher than UUIDv4 — in far less space.

**Good for:** short sharing URLs (pastebins, magic links, public shareable IDs), tokens you want compact, invite codes. Looks clean in URLs: `/p/V1StGXR8_Z5jdHi6B` vs `/p/550e8400-e29b-41d4-a716-446655440000`.

**Trade-off:** not sortable. Like UUIDv4, random order means index fragmentation at very high write rates.

## Decision Matrix

| Need | Pick |
|---|---|
| Database primary keys, high write volume | **UUIDv7** |
| Database primary keys, moderate write volume | **UUIDv4** (simplest, widely supported) |
| User-visible IDs in URLs | **ULID** or **NanoID** |
| Need to sort by creation time | **UUIDv7** or **ULID** |
| Cannot leak creation time | **UUIDv4** or **NanoID** |
| Invite codes, share links, short tokens | **NanoID** |
| Cross-language compatibility is critical | **UUIDv4** |

## Anti-Patterns

**Sequential integers as public IDs.** `/orders/1042` tells a competitor you've had 1,042 orders — and lets anyone enumerate `/orders/1041`, `/orders/1040`, etc. Use a UUID or NanoID on the public boundary even if the database key is an integer.

**Short random IDs for unique identity.** Four random alphanumeric characters isn't enough entropy at any reasonable volume. Collisions happen faster than people expect — the birthday paradox is real. Use at least 72 bits of entropy (12 URL-safe characters) for anything that must be unique across users.

**Mixing formats in one column.** If you migrate from UUIDv4 to UUIDv7, keep old IDs and only issue the new format going forward. Rewriting existing IDs breaks every integration that stored them.

## Try It Now

Generate any of these formats instantly in the browser with the [UUID Generator](/tools/uuid-generator) (supports v1, v4, v7), or use the [Random Token Generator](/tools/random-token-generator) to produce NanoID-style URL-safe identifiers at any length.
