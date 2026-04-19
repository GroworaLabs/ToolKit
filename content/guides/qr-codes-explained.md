---
title: "QR Codes Explained: How They Work and the Rise of Quishing"
description: "The clever structure behind those little black squares, what vCard and Wi-Fi codes really encode, and why QR phishing became the scam of 2024–2025."
category: "Security"
tools: ["qr-code-generator"]
tags: ["qr-codes", "security", "phishing", "mobile"]
publishedAt: "2026-04-19"
author: "marcus-chen"
---

## From Car Factories to Everyone's Phone

QR codes — "Quick Response" codes — were invented in 1994 at Denso Wave, a Toyota subsidiary, by an engineer named Masahiro Hara. The problem he was solving was mundane: the standard 1D barcode held about 20 characters, not enough to track complex automotive parts. QR codes could hold thousands.

Nobody outside Japan used them for two decades. Then in 2017 Apple added native QR scanning to the iPhone camera app, Android followed, and the pandemic pushed restaurants, museums, and parking meters onto QR menus. By 2023 they were unavoidable. By 2024 they had become one of the fastest-growing phishing vectors on the internet.

This guide covers what's actually inside a QR code, what the common content formats do, and how the same properties that make them convenient also make them dangerous.

## The Structure of a QR Code

Every QR code has three big squares in the corners — the **finder patterns**. They let the camera find the code regardless of rotation. A fourth, smaller square near the bottom-right is the **alignment pattern**, which corrects for the angle you're holding the phone at.

The rest of the code is split between:

- **Timing patterns** — lines of alternating black and white between the finder squares, used to calibrate grid spacing.
- **Format information** — tells the decoder which error-correction level was used and which masking pattern was applied.
- **Data** — the payload, encoded in one of four modes (numeric, alphanumeric, byte, Kanji).
- **Error correction** — extra bytes computed via Reed–Solomon coding, allowing the decoder to recover the message even when part of the code is damaged, covered, or unreadable.

## Error Correction Has Four Levels

Reed–Solomon error correction is what makes QR codes feel magical — you can cover a chunk of the code with a logo and it still scans. The tradeoff is data capacity: more correction means less room for the actual payload.

| Level | Recovery | Data capacity |
|---|---|---|
| L (Low) | ~7% | Highest |
| M (Medium) | ~15% | Default for most generators |
| Q (Quartile) | ~25% | Often used when adding a centre logo |
| H (High) | ~30% | Used when the code will be printed small or outdoors |

A version-40 (the largest) code at level L holds about 4,296 alphanumeric characters or 2,953 bytes — enough for a small essay. Real-world use rarely goes past version 10 or so; anything more becomes too dense to scan from a normal reading distance.

## What the Codes Actually Contain

The magic of QR codes is that the content is just text. What the phone *does* with the text depends on prefixes the industry agreed on:

```
https://example.com                                   Open URL
mailto:alice@example.com?subject=Hi                   Compose email
tel:+14155551234                                      Dial number
SMSTO:+14155551234:Text here                          Compose SMS
WIFI:T:WPA;S:MyNetwork;P:supersecret;H:false;;       Join Wi-Fi network
geo:37.774929,-122.419416                             Open in Maps
BEGIN:VCARD\nVERSION:3.0\nFN:Alice\n...END:VCARD     Save contact
BEGIN:VEVENT\nSUMMARY:Meeting\nDTSTART:...            Add to calendar
```

Any content without a recognised prefix is treated as plain text — the phone will offer to copy it, search it, or share it, but nothing fancier.

You can encode any of these formats with the [QR Code Generator](/tools/qr-code-generator) — paste in a URL, vCard, or Wi-Fi string and the generator produces a scannable image you can download or print.

## The Size and Printing Math

For a QR code to reliably scan, the smallest square (called a "module") needs to be at least 0.33 mm at a typical reading distance of 30 cm. Scale linearly from there: at 1 m (posters on a wall) you need modules of at least 1 mm; at 10 m (billboards) roughly 1 cm.

A version-3 code has a 29 × 29 module grid, so a scannable print of that code at 30 cm distance needs at least 10 mm × 10 mm. Most generators pad with a "quiet zone" — the minimum white border around the code — of 4 modules. Skipping the quiet zone is the single most common printing mistake; a QR code touching other graphics often fails to scan.

## Logos, Colour, and Contrast

The ~30% error correction of level H means you can place a logo in the centre covering up to that fraction of the code and it'll still scan. This is how every "branded" QR code works — the logo replaces a chunk of data, but the Reed–Solomon codewords recover from it.

Contrast matters more than colour. Dark on light is the convention, but dark-blue on white, or white on dark-red, both scan fine. Low-contrast pairs (grey on silver, light-blue on white) fail. Always test-scan with an actual phone, not just a decoder library.

## The Quishing Problem

QR phishing — nicknamed **quishing** — is a 2023–2025 attack wave that exploited two properties no other phishing vector has:

- **Cameras bypass security infrastructure.** Email filters, URL scanners, and corporate proxies can inspect a link in an email. They can't OCR an image of a QR code reliably — and even if they could, the QR image often has to be manually photographed with a different phone.
- **Users trust physical surfaces.** A QR sticker on a parking meter or a restaurant table carries implicit authority. People who would never click a sketchy email link happily scan a sketchy sticker.

Real cases: fake parking-fine stickers placed on meters that redirect to card-skimming sites. Phishing emails that embed a QR image pointing to a credential-harvest page, because the email spam filter doesn't decode the image. Conference badges with tampered QR codes. In mid-2023, the FBI, FTC, and UK's National Cyber Security Centre all issued public advisories about quishing.

## How to Scan Safely

Every modern phone camera shows a preview of the decoded URL before opening it. **Always look at the preview.** A legitimate business QR code will show a recognisable domain (`mcdonalds.com`, `starbucks.com`). A phishing code will show something subtly off: `mcdonalds-offer.com`, `parking-paynow.xyz`, `bit.ly/xxxxx`.

Other practical rules:

- Don't scan QR codes from physical surfaces (tables, meters, posters) without verifying the URL preview.
- Don't scan QR codes embedded in emails, even ones that "look" official. Open the company's app or website directly.
- Businesses placing QR codes in the wild should use branded short URLs (e.g., `qr.yourcompany.com/menu`) so users can verify visually.
- If the QR code has been covered by a sticker, assume it's been tampered with. Report it to the venue.

## Design for Your Use Case

For internal posters, handouts, or pages where scanning is frictionless, keep codes simple:

- **URL redirects** with a level M correction are almost always enough.
- Use a short URL rather than a full long URL — fewer modules, easier to scan at small sizes.
- If you add a centre logo, bump to correction level Q or H.

For long-form payloads (vCards, calendar events), accept that the code will be denser. Print bigger and give a larger quiet zone.

## Try It Now

Generate QR codes for URLs, vCards, Wi-Fi credentials, or arbitrary text with the [QR Code Generator](/tools/qr-code-generator). Handy for restaurant menus, event badges, business-card contacts, and letting guests join Wi-Fi without reading out a password.
