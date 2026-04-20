---
title: "Best Hosting for Side Projects 2026: Vercel vs Netlify vs Railway vs Fly.io vs Cloudflare vs Hetzner"
description: "An honest comparison of the platforms side-project devs actually deploy to in 2026 — free tier reality, cold starts, egress bills, and who each one is actually right for."
category: "Reviews"
tools: []
tags: ["hosting", "deployment", "reviews", "vercel", "cloudflare", "fly.io"]
publishedAt: "2026-04-20"
author: "olivia-bennett"
---

> **Disclosure:** We don't currently use affiliate links in this guide, but we may add them to some of the providers mentioned in the future. If we do, we'll earn a small commission when you sign up — at no extra cost to you. It will not change which platform we recommend. We pay for all the services we review.

## TL;DR — Quick Picks

- **Static site or blog:** **Cloudflare Pages.** Free, unlimited bandwidth, global edge. Nothing else is this generous.
- **Next.js side project:** **Vercel** free tier — as long as you understand the egress trap. Cloudflare Pages is the safer choice if you expect traffic.
- **Full-stack app with a database:** **Railway** for ergonomics, **Fly.io** if you already know Docker.
- **You want to learn ops and pay cents per month:** **Hetzner Cloud** — €4/mo for a real VPS you fully control.
- **Edge functions, APIs, scheduled jobs:** **Cloudflare Workers.** The free tier is absurdly generous.
- **Skip for most side projects:** **Netlify, Render, Heroku** — not bad, just outclassed by the above for what we're doing here.

The short version: use **Cloudflare Pages + Workers** until you hit a wall, then move to **Railway** or **Fly.io** for stateful stuff, and rent a **Hetzner** VPS the day you want full control.

## How We Evaluated

Side projects have different requirements than production apps. Criteria below:

1. **Free tier reality.** Is it a permanent free tier, or a 30-day trial? Do you get paused after N hours?
2. **Cold starts.** A side project someone visits once a month needs to not take 10 seconds to wake up.
3. **Deploy speed.** `git push` to live URL — seconds or minutes?
4. **Zero-config for common stacks.** Next.js, Node, Python, static — do you need to write a Dockerfile just to ship?
5. **Egress pricing.** The single biggest gotcha in PaaS billing. One viral post can mean a $500 surprise.
6. **Databases.** Does the platform offer a managed DB, and what does it cost?
7. **Background jobs and cron.** For the side project with scheduled tasks.
8. **Paid-tier predictability.** What happens when you outgrow free? Flat-rate vs metered.

All pricing below is current as of 2026 and changes constantly. Always verify.

## Vercel

**Pricing:** Hobby (free, personal use only, non-commercial). Pro $20/user/mo + metered usage above included quotas.

**Strengths:**

- **Zero-config Next.js deploys.** The framework and the host are made by the same team; it shows. `git push` → live preview URL in 20–40 seconds.
- **Generous free compute.** 100 GB-hours of serverless execution and 100k function invocations included on Hobby.
- **Preview deployments per branch** are the gold standard. Review PRs live, share with stakeholders, throw away.
- **Good analytics and Web Vitals** built in on Pro.
- **Edge Functions** for middleware-style logic close to users.

**Weaknesses:**

- **Egress is the trap.** Hobby includes 100 GB/month. Above that, Pro bills **$0.15 per GB**. A viral Hacker News post with 50k visits can generate 50–100 GB of egress in a day. People have posted screenshots of $500 Vercel bills from a single day of attention. You can set a spend cap — **do it before launch day**.
- **Hobby tier is non-commercial.** If your "side project" has any revenue (even AdSense), you technically need Pro.
- **Lock-in.** Vercel-specific features (Edge Config, Image Optimization pricing, `@vercel/og`) make migration harder the longer you stay.

**Pick it if:** your side project is a Next.js app you don't expect viral traffic on, and preview deployments matter. Set a spend cap on day one.

## Cloudflare Pages + Workers

**Pricing:** Pages is free for personal use, unlimited bandwidth, 500 builds/mo. Workers free tier includes 100k requests/day, 10 ms CPU per request. Paid Workers $5/mo = 10M requests/mo + 30 ms CPU.

**Strengths:**

- **Unlimited bandwidth on the free tier.** Cloudflare has its own global network; egress isn't a cost they pass on. This alone makes Pages the right answer for any static site, blog, or portfolio.
- **Workers are absurdly cheap.** $5/month for 10 million requests is about 100× cheaper than comparable Lambda.
- **Sub-5ms cold starts.** Workers run on V8 isolates, not containers — effectively zero cold start.
- **Global by default.** Every Worker runs in 300+ data centers with no config.
- **Cloudflare D1 (SQLite) and R2 (object storage).** R2 has zero egress charges, a direct shot at S3.

**Weaknesses:**

- **Workers have runtime constraints.** No long-lived TCP connections, no file system, limited Node APIs. Your existing Express app won't "just run" — you port it to Hono, itty-router, or raw fetch handlers.
- **D1 is still maturing.** Great for side projects, not yet at Postgres-on-Supabase parity for complex queries.
- **Build-time quirks.** Pages builds occasionally have dependency surprises you don't see on Vercel or Netlify.

**Pick it if:** you're shipping a static site, a small API, or an edge-rendered app and you expect real traffic someday. The free tier is generous enough that "real traffic" will still cost $0.

## Railway

**Pricing:** Trial gives $5 of credits. After that, Hobby is $5/mo minimum (includes $5 of usage, which covers most small apps). Pro is $20/mo.

**Strengths:**

- **Best developer experience on this list.** Connect a GitHub repo, it detects your stack, gives you a URL. Add Postgres, Redis, or MongoDB from a menu in seconds.
- **Real containers.** No runtime sandbox. If it runs in Docker, it runs on Railway — your existing Express + Postgres stack works unchanged.
- **Great for apps with state.** Side projects that need a real DB and background workers are trivial to stand up.
- **Preview environments** for PRs, with isolated DBs.
- **Clear metered pricing.** You see exactly what you're spending, live.

**Weaknesses:**

- **No permanent free tier** since the 2023 changes. The $5 trial credit is one-time. You're paying $5/mo minimum from month two, even for idle apps.
- **Resource costs add up** for apps that need 512 MB+ of RAM or run 24/7.
- **Not edge-native.** One region per service, though you can deploy to different regions.

**Pick it if:** you want to spin up a full-stack app with a database in five minutes and you're okay paying $5–15/month for it. Best value for stateful side projects.

## Fly.io

**Pricing:** No permanent free tier since October 2024; however, $5/mo in compute credits is included with any paid plan. Small apps run for free within that. Pay-as-you-go beyond.

**Strengths:**

- **Real Docker containers, globally deployable.** Pick regions, run multiple instances, have them talk over Fly's private network.
- **Excellent for stateful workloads.** Fly Volumes give you persistent storage attached to a machine. LiteFS replicates SQLite across regions.
- **Auto-stop / auto-start.** Idle machines scale to zero, wake on request. Cold starts are 1–3 seconds — not great for user-facing pages, fine for APIs.
- **`fly deploy` is snappy** once you're set up. A small Rails or Phoenix app deploys in under a minute.
- **No surprise bandwidth bills** — egress is included up to generous limits, then $0.02/GB (an order of magnitude cheaper than Vercel).

**Weaknesses:**

- **You write a Dockerfile.** Fly generates one for common stacks, but you'll need to understand it when things break.
- **`fly launch` ergonomics** lag Railway — more flags, more gotchas.
- **Status-page reliability** has been shaky at times in 2024. Improved in 2025 but worth knowing.

**Pick it if:** you know Docker, you want control, and you want to run multi-region from day one. Best choice for anyone who treats side projects as a place to learn production patterns.

## Hetzner Cloud

**Pricing:** CX22 shared vCPU VM (2 vCPU, 4 GB RAM, 40 GB disk, 20 TB traffic) — €3.79/month. CAX11 ARM (2 vCPU, 4 GB) — €3.29/month.

**Strengths:**

- **Unbeatable € per GB, € per core.** About 3–5× cheaper than equivalent DigitalOcean or AWS for the same specs. Any serious home-lab or side-project-with-real-workloads math points here.
- **Generous included traffic.** 20 TB/month egress on every VM. You can serve a *lot* of traffic for €4.
- **Datacenter locations** in Germany, Finland, USA (Ashburn, Hillsboro), Singapore.
- **It's a real Linux VM.** Full control. Run anything. Docker, Kubernetes (hetzner-cloud-controller), Coolify, Dokku — your call.

**Weaknesses:**

- **You manage the server.** OS patches, SSH keys, firewall, backups, TLS certs (Certbot / Caddy), reverse proxy. Good learning, but time you didn't have to spend on Railway or Vercel.
- **No free tier** — €4 is still €4/month.
- **No managed databases** at Hetzner itself. Either run Postgres in Docker yourself or use an external provider.
- **Status of your app is your problem.** No built-in alerting or health checks. Set up Uptime Kuma or similar.

**Pick it if:** you want the cheapest serious Linux VPS on the market and you're comfortable in a terminal. Pair with a lightweight PaaS-on-your-server like **Coolify** or **Dokku** and you get 80% of Railway's DX at 10% of the price.

## Netlify

**Pricing:** Starter (free, 100 GB bandwidth). Pro $19/user/mo.

Netlify pioneered the "git push, get a URL" PaaS in 2015 and was great. In 2026 the space has moved on:

- Pages is cheaper and faster on Cloudflare.
- Framework-specific deploys are better on Vercel (for Next.js) or Cloudflare (for most others).
- Netlify Functions are fine but less mature than Vercel's or Workers.

**Pick it if:** you already have a Netlify workflow and no reason to change. Few new projects should start here in 2026.

## Render

**Pricing:** Free web services sleep after 15 minutes of inactivity. Starter $7/mo per service keeps it alive.

Render sold itself as "Heroku but modern" and did a good job of that. The catch:

- The free tier's **15-minute-sleep cold start is 30+ seconds**. Unusable for a demo you want to share.
- To get "always on" you pay $7 per service. A typical full-stack app (frontend + backend + worker) is $21/month — more than Fly.io or Railway for similar shape.

**Pick it if:** you specifically want Heroku ergonomics on a modern platform and the $7-per-always-on trade-off doesn't bother you. Most devs can do better.

## DigitalOcean

**Pricing:** Droplets from $4/mo (1 vCPU, 512 MB RAM, 10 GB disk, 500 GB transfer). App Platform (PaaS) from $5/mo per service.

- **Droplets** are the VPS equivalent of Hetzner — cheaper marketing, more expensive bills. $4 gets you half the RAM and a fifth of the bandwidth of a €4 Hetzner CX22.
- **App Platform** competes with Render / Railway. Priced similarly. No standout advantage.
- **Managed Postgres / Redis** is convenient but starts at $15/mo — roughly Railway territory.

**Pick it if:** you already have DO credits (from a referral or conference), or you need specific DO products (Spaces, their managed Postgres pricing fits you). Otherwise Hetzner wins on price, Fly or Railway win on DX.

## Head-to-Head

| | Free tier | Cold starts | Egress cost | Best for |
|---|---|---|---|---|
| Cloudflare Pages | Unlimited bandwidth | ~0 ms | Free | Static sites, JAMstack |
| Cloudflare Workers | 100k req/day | ~5 ms | Free | Edge APIs |
| Vercel | 100 GB/mo | Warm | $0.15/GB | Next.js |
| Netlify | 100 GB/mo | Warm | $0.55/GB | Legacy JAMstack |
| Railway | $5 trial credit only | None (always on) | Included | Full-stack + DB |
| Fly.io | $5/mo credit with plan | 1–3 s (auto-start) | Included | Docker, multi-region |
| Render | Sleeps after 15 min | 30+ s cold | Included | Hobby, tolerant of cold |
| Hetzner | None | None (always on) | 20 TB included | Learning ops, value |
| DO Droplets | None | None (always on) | 500 GB–5 TB | If you have DO credits |

## What About Databases?

Most side projects need some persistence. Options by platform:

- **Cloudflare:** D1 (SQLite) or KV. D1 free tier is 5 GB storage, 5M reads/day. Good for small apps.
- **Railway:** Postgres, MySQL, Redis, MongoDB — one-click, scales with your plan.
- **Fly.io:** Fly Postgres (managed), or run your own in a Machine. LiteFS for SQLite replication.
- **Supabase / Neon / PlanetScale:** All have generous free tiers. Pair with Vercel/Netlify/Cloudflare for stateful apps.
- **Hetzner / DO:** Run Postgres in Docker yourself, or use an external managed DB.

For most side projects, **Supabase's free tier** (500 MB Postgres + auth + storage) is the right answer regardless of where you host the frontend.

## The Egress Lesson Nobody Learns Until It Hurts

The single most common "surprise bill" post on Hacker News or Reddit: someone deployed to Vercel / Netlify / Heroku, got Slashdotted or Hackernoon'd, woke up to a $300–$3000 bill.

Three rules to avoid this:

1. **Set a spend cap on every paid account.** Vercel, Netlify, Railway, and Fly all let you cap spending. Most default to "bill whatever it takes." Change that.
2. **If you expect real traffic, host on a platform that doesn't charge egress.** Cloudflare is the obvious answer. Hetzner's 20 TB is the other.
3. **Use a CDN in front of everything.** Even on Cloudflare, put Cache-Control headers on static assets so the edge does the work instead of your origin.

## The Real Stack for 99% of Side Projects

If you're starting a new side project tomorrow and want to ship without thinking about infra:

- **Frontend on Cloudflare Pages** — free, unlimited bandwidth, fast.
- **Auth + DB on Supabase** — free tier generous, handles the "I need a user table" problem.
- **Background jobs on Cloudflare Workers** with Cron Triggers, or on Fly.io if they're heavier.
- **Media on Cloudflare R2 or Backblaze B2** — both cheaper than S3 with no egress fees.

Total monthly cost: **$0** until you have real traffic, then maybe $5–20 as you scale. Compare to running the same thing on AWS, where you can spend $40 just on load balancers before anyone visits.

## Bottom Line

For a new side project in 2026, **start on Cloudflare Pages + Workers** plus **Supabase** for data. The free tier is permanent, the bandwidth is unlimited, and if it ever takes off you're not hostage to per-GB egress.

Move to **Railway** or **Fly.io** the day you need something the Workers runtime can't do — long-lived connections, serious compute, or a stack that's too invested in containers to port. Both are priced fairly; pick Railway for ergonomics, Fly for control.

Rent a **Hetzner** VPS the day you want to own your stack and stop paying a PaaS margin. €4/month plus a few evenings learning Caddy and Docker Compose is one of the best investments a developer can make in their own infrastructure literacy.

Skip Vercel for anything with unpredictable traffic. Skip Netlify and Render unless you're already on them. Skip DigitalOcean unless you have credits.
