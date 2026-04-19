---
title: "HTTP Status Codes That Actually Matter: A Dev's Shortlist"
description: "There are over 60 HTTP status codes. About 15 of them do 99% of the work. Here's what each one really means and the subtle gotchas that cause bugs."
category: "Developer Tools"
tools: ["http-status-codes"]
tags: ["http", "api", "rest", "web", "status-codes"]
publishedAt: "2026-04-19"
author: "olivia-bennett"
---

## Five Classes, a Handful of Codes

HTTP status codes group into five classes by the first digit: `1xx` informational, `2xx` success, `3xx` redirect, `4xx` client error, `5xx` server error. The IANA registry lists more than 60 codes, but you can build a correct REST API with about 15 of them — and knowing the subtle differences between a few look-alike pairs prevents most of the bugs.

This guide is the shortlist. The full registry is useful when a niche one comes up (see the [HTTP Status Codes reference](/tools/http-status-codes) for the complete table), but these are the ones that matter day to day.

## 2xx — Success

**200 OK** — the generic "it worked, here's your data." Use it for `GET` and for `POST`/`PUT`/`DELETE` that return a response body.

**201 Created** — a `POST` or `PUT` that created a new resource. Always include a `Location` header pointing to the new resource's URL. `201` without `Location` is technically valid but unhelpful.

**204 No Content** — success, but the response has no body. Correct for `DELETE` and for `PUT` operations that don't echo the resource back. Browsers treat `204` specially: a form submission that returns `204` doesn't navigate or replace the page.

**202 Accepted** — "I'll process this eventually." Use when an operation is queued asynchronously. Include a way to poll or receive the final result — often a `Location` header pointing to a job-status resource.

## 3xx — Redirects (Mind the Method)

This is the class that trips people up. All four common redirects look similar; they behave differently.

| Code | Semantic | Method preserved? |
|---|---|---|
| 301 Moved Permanently | Permanent | **No** — allowed to become GET |
| 302 Found | Temporary | **No** — allowed to become GET |
| 307 Temporary Redirect | Temporary | **Yes** |
| 308 Permanent Redirect | Permanent | **Yes** |

Method preservation is the key axis. `301` and `302` were specified before the web had strong REST conventions; browsers historically turned `POST`-after-redirect into `GET`-after-redirect. `307` and `308` were added to fix that: if you redirect a `POST`, the client re-sends the `POST` to the new URL.

**Practical rules:**
- Use `301` for moved static content (old URL → new URL on GET).
- Use `308` when you genuinely need a permanent redirect that preserves the verb (rare for APIs; common for `www` → apex).
- Use `307` for temporary API redirects (maintenance mode, region-based routing).
- Avoid `302` in APIs — the method-rewriting behaviour is surprising.

**304 Not Modified** — sent in response to a conditional `GET` (`If-None-Match`, `If-Modified-Since`) when the cached copy is still valid. Response has no body. Essential for caching.

## 4xx — Client Errors

**400 Bad Request** — the request is malformed. Use for parse errors (invalid JSON, missing required headers), not for business-rule violations.

**401 Unauthorized** — the biggest naming mistake in HTTP. It means *unauthenticated* — the caller didn't provide credentials or the credentials are invalid. A `401` with a `WWW-Authenticate` header triggers the browser's basic-auth prompt; omit that header if you don't want it.

**403 Forbidden** — authenticated but lacks permission. The caller knows who they are; they just can't access this resource.

**404 Not Found** — resource doesn't exist. Also used for "you don't have permission and we don't want to confirm the resource exists" (e.g., GitHub returns `404` on private repos to non-members, not `403`).

**405 Method Not Allowed** — the resource exists but doesn't support this verb. `DELETE` on a read-only endpoint, for example. Must include an `Allow` header listing the accepted methods.

**409 Conflict** — the request conflicts with the current state of the resource. Classic examples: creating a user with an email that already exists, editing a resource that changed since you last fetched it.

**422 Unprocessable Entity** — well-formed request, semantically wrong. Validation errors typically land here: the JSON parsed fine, but `age: -5` doesn't make sense. Rails and Laravel default to `422` for validation; Express and Spring often use `400`. Both are defensible — pick one per project and be consistent.

**429 Too Many Requests** — rate-limited. Always include a `Retry-After` header (in seconds or as an HTTP date). A `429` without `Retry-After` forces clients to guess the back-off, and they usually guess wrong.

The difference between `400` and `422` is the one most likely to start a code review argument. The working heuristic: can the request be parsed at all? If no → `400`. If yes, but the parsed content fails validation → `422`.

## 5xx — Server Errors

**500 Internal Server Error** — generic. Something went wrong on the server. Avoid exposing stack traces in the response body; log them server-side.

**502 Bad Gateway** — a proxy or gateway got a broken response from upstream. Common when a reverse proxy (nginx, ALB, Cloudflare) sits in front of an app that crashed or returned an invalid HTTP response.

**503 Service Unavailable** — temporary — service is overloaded or down for maintenance. Include `Retry-After` if possible.

**504 Gateway Timeout** — upstream didn't respond in time. Different from `502`: `502` means "got a bad reply," `504` means "got no reply."

`501 Not Implemented` and `505 HTTP Version Not Supported` exist but rarely appear in practice.

## Codes That Don't Mean What You Think

**200 with `{"error": "..."}` in the body.** A common anti-pattern: returning HTTP 200 but signalling failure in the payload. This defeats every HTTP-layer retry, cache, and monitoring tool. Use a real status code.

**401 for "logged in but no access."** That's `403`, not `401`. `401` means "you need to authenticate." `403` means "you're authenticated and the answer is still no."

**418 I'm a teapot.** Defined in RFC 2324 (an April Fool's joke) and preserved in RFC 7168. It's real. Don't use it in production, but appreciate that someone had to specify its behaviour.

**200 on a POST that creates something.** Prefer `201`. `200` is valid, but `201` carries more semantic information — and paired with a `Location` header, the caller immediately knows where to fetch the new resource.

## Try It Now

The full status code table, with canonical descriptions and the RFC each code comes from, is available at the [HTTP Status Codes reference](/tools/http-status-codes). Useful for looking up the less common ones or confirming what `418` actually means.
