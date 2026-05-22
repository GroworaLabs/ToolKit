---
title: "5 Tools We Built Because We Kept Needing Them"
description: "The best tools come from real frustration. Here are five ToolKit tools that started as 'I'll just build this quickly' and became permanent fixtures in our workflow."
tags: ["behind the scenes", "tools"]
tools: ["jwt-decoder", "cron-generator", "color-contrast-checker", "gitignore-generator", "totp-generator"]
publishedAt: "2026-05-01"
author: "olivia-bennett"
---

Most of ToolKit's tools exist because someone on the team had the same problem twice and decided to fix it properly the second time.

Here are five tools that started that way.

## 1. JWT Decoder

Every time a JWT-related bug came up, someone would paste the token into jwt.io — and then immediately wonder if they'd just sent a production token to a third-party server.

The [JWT Decoder](/tools/jwt-decoder) does the same thing, locally. It decodes the header and payload, verifies the signature if you provide a secret, and shows you the claims. Your tokens stay in your browser.

## 2. Cron Generator

Cron syntax is not difficult once you know it, but "once every weekday at 9 AM except on the first of the month" takes longer to write correctly than it should. The validation feedback loop — edit, wait for the next scheduled run, find out it was wrong — is painful.

The [Cron Generator](/tools/cron-generator) gives you a visual builder and instant human-readable feedback: "At 09:00 on every day-of-week from Monday through Friday." No waiting for the next job run to find out if your syntax was right.

## 3. Color Contrast Checker

WCAG compliance checking used to mean looking up the luminance formula, computing it by hand for two colors, and checking the ratio. Or opening a separate browser extension.

The [Color Contrast Checker](/tools/color-contrast-checker) runs the WCAG 2.1 formula live as you adjust colors — AA and AAA badges update instantly, and the preview shows what the combination actually looks like. It's become the default tool for any accessibility review.

## 4. Gitignore Generator

The alternative to the [Gitignore Generator](/tools/gitignore-generator) is remembering the URL for gitignore.io, or copying a gitignore from a previous project and manually editing it, or forgetting to add one at all and committing `node_modules` on the first push.

19 templates across languages, frameworks, editors, and operating systems. Select any combination, merge them, copy or download the result.

## 5. TOTP Generator

Testing two-factor authentication flows manually is tedious — open the authenticator app, read the code before it expires, switch back to the browser, type it in. Repeat for every test scenario.

The [TOTP Generator](/tools/totp-generator) runs the RFC 6238 algorithm directly in the browser. Paste a TOTP secret, get the current code, watch it count down and refresh. Useful for automation, debugging, and avoiding the authenticator app context-switch during development.

---

All five are free, no account required, and fully client-side. The code for everything we generate or compute stays in your browser.
