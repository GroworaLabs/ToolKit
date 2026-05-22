---
title: "Why Every Page on ToolKit Is Statically Generated"
description: "We build every tool page, guide, and index at deploy time — no server rendering on request. Here's why that decision holds up even as the site grows past 100 pages."
tags: ["engineering", "next.js", "performance"]
publishedAt: "2026-04-30"
author: "ryan-fletcher"
---

ToolKit is a Next.js app running on Vercel. We use the pages router with `getStaticProps` and `getStaticPaths` everywhere — no `getServerSideProps`, no API routes that process requests, no server-side rendering on the hot path.

This is a deliberate choice, and it has stayed the right choice as the site has grown from 10 tools to 70+.

## Why static generation

**Speed.** A statically generated page served from a CDN edge node is as fast as a web page gets. There's no server processing time, no database query, no cold start. Vercel's edge network handles the rest.

**SEO.** Our tool pages carry 1,500+ words of content, FAQ sections, and JSON-LD schema — all of it in the initial HTML. Crawlers don't need to execute JavaScript to index it. This was a specific choice to address our AdSense content review: the page has to look like content to a crawler, not just to a browser.

**Cost.** Static pages served from a CDN are essentially free at the traffic levels we're at. Server-rendering every request would cost money and add latency without adding value for our use case.

## What we still run client-side

The actual tool widgets are loaded dynamically with `{ ssr: false }`. The JSON formatter, the token counter, the hash generator — all of these run in the browser, after the static HTML has loaded. The user gets the content immediately, and the widget appears once the JavaScript bundle evaluates.

This split — static content + client-side widget — is the architecture that lets us be both SEO-friendly and client-side-only. The content is indexed, and the computation stays in the browser.

## The tradeoff

Build times. With 70+ tool pages, 60 guide pages, variant pages, and static paths, the build takes longer than a simple site. We cache aggressively and only regenerate what changed.

It's a good tradeoff. A slower build that produces fast, indexable pages is better than a fast build that produces slow, hard-to-index pages.
