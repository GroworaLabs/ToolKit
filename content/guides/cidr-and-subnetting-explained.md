---
title: "CIDR and Subnetting Explained: A Practical Guide for Cloud Engineers"
description: "What /24 actually means, how to carve a VPC into subnets without painting yourself into a corner, and the cloud-specific gotchas AWS and GCP don't explain up front."
category: "Developer Tools"
tools: ["ip-cidr-calculator"]
tags: ["networking", "cidr", "ip", "aws", "vpc"]
publishedAt: "2026-04-19"
author: "olivia-bennett"
---

## What CIDR Replaced

Before 1993, IP addresses were allocated in rigid classes: Class A (8-bit network), Class B (16-bit), Class C (24-bit). You could have 256 hosts or 65,536 hosts — nothing in between. That worked for a few research networks. It was ruinous at internet scale: organisations that needed 400 addresses got a Class B with 65,000 and wasted the rest.

**CIDR** — Classless Inter-Domain Routing, RFC 4632 — dropped the fixed boundaries and let any prefix length from `/1` to `/32` define a network. `10.0.0.0/24` means "the first 24 bits are the network, the last 8 are hosts." Changing the prefix changes the subnet size:

| Prefix | Netmask | Addresses | Usable (cloud) |
|---|---|---|---|
| /16 | 255.255.0.0 | 65,536 | ~65,530 |
| /20 | 255.255.240.0 | 4,096 | ~4,090 |
| /24 | 255.255.255.0 | 256 | 251 |
| /28 | 255.255.255.240 | 16 | 11 |
| /30 | 255.255.255.252 | 4 | 2 |
| /32 | 255.255.255.255 | 1 | 1 (single host) |

The formula: a `/N` has **2^(32 − N)** addresses.

You can confirm any of these — netmask, first/last address, host count — with the [IP CIDR Calculator](/tools/ip-cidr-calculator).

## Private Ranges You Should Memorise

RFC 1918 reserves three ranges for private networks. Every VPC, home router, and corporate LAN lives inside these:

- `10.0.0.0/8` — 16.7M addresses
- `172.16.0.0/12` — 1M addresses
- `192.168.0.0/16` — 65K addresses

Public routing equipment will drop packets addressed to these ranges, which is exactly the point. Inside your VPC you can slice them however you like.

A fourth range worth knowing: `100.64.0.0/10` (RFC 6598, "carrier-grade NAT"). Some cloud providers use it for internal services; avoid it for your own networks unless you have a specific reason.

## How to Plan a VPC

The common mistake is picking your VPC range too small and running out of subnet room six months in. AWS VPCs can't be resized after creation; you'd have to rebuild.

**Pick your VPC at `/16`** unless you have a hard reason not to. That gives you 65,536 addresses and room for dozens of subnets.

**Pick your subnets at `/24` by default.** 256 addresses per subnet is generous for most workloads and leaves routing tables readable. Going smaller (`/28`, `/27`) saves address space but creates operational pain when one subnet fills up. Going bigger (`/20`) limits how many availability zones you can spread across.

Example layout for a three-AZ VPC at `10.0.0.0/16`:

```
10.0.0.0/16       VPC
├── 10.0.0.0/24   Public subnet AZ-a    (ALB, NAT gateway)
├── 10.0.1.0/24   Public subnet AZ-b
├── 10.0.2.0/24   Public subnet AZ-c
├── 10.0.10.0/24  Private app subnet AZ-a
├── 10.0.11.0/24  Private app subnet AZ-b
├── 10.0.12.0/24  Private app subnet AZ-c
├── 10.0.20.0/24  Private DB subnet AZ-a
└── ...
```

Gap the subnet numbers (0–9 public, 10–19 app, 20–29 db) so you can insert new tiers later without renumbering.

## The Cloud-Specific Gotchas

**AWS reserves 5 IPs per subnet.** A `/28` has 16 total addresses, but AWS reserves `.0` (network), `.1` (VPC router), `.2` (DNS resolver), `.3` (future use), and `.15` (broadcast). That leaves 11 usable. A `/28` subnet is usually too small for anything real — /27 is the practical minimum.

**GCP reserves 4 IPs per subnet.** Similar idea, different count. Check your provider's docs.

**VPC peering requires non-overlapping ranges.** If VPC A is `10.0.0.0/16` and VPC B is `10.0.0.0/16`, you cannot peer them. Plan for this up front — if you run multiple VPCs, give each a distinct `/16` out of `10.0.0.0/8`: `10.0.0.0/16`, `10.1.0.0/16`, `10.2.0.0/16`.

**VPN to on-prem.** If your on-prem network uses `192.168.0.0/24`, avoid that range in your VPC. Routing conflicts will break connectivity in both directions.

## Reading a CIDR Quickly

Two tricks that make CIDR math instant without a calculator:

**Host count.** `32 − prefix = bits for hosts`. `/20` → 12 host bits → 2^12 = 4,096 addresses.

**Aggregation.** `10.0.0.0/24` and `10.0.1.0/24` both fit inside `10.0.0.0/23`. Whenever two adjacent subnets share the same prefix one bit shorter, you can summarise them. Useful when writing route tables or firewall rules.

**Is an address inside a CIDR?** Compare the prefix bits. `10.0.5.17` inside `10.0.0.0/16`? The first 16 bits of `10.0.5.17` are `10.0`, same as the CIDR — yes. Inside `10.0.0.0/24`? First 24 bits are `10.0.5`, CIDR's first 24 are `10.0.0` — no.

The [IP CIDR Calculator](/tools/ip-cidr-calculator) checks any of these in one click.

## IPv6 Uses the Same Notation

IPv6 prefixes work identically, just with longer addresses: `2001:db8::/32`. The numbers get absurd — a `/64` contains 2^64 addresses, more than the entire IPv4 space squared — but the mental model is unchanged. A typical LAN is `/64`; a site allocation from an ISP is usually `/48` or `/56`.

## Special Prefixes Worth Knowing

- `0.0.0.0/0` — "everything." Used in route tables as the default route.
- `127.0.0.0/8` — loopback. `127.0.0.1` is just the most famous member.
- `169.254.0.0/16` — link-local. If your laptop shows an address in this range, DHCP failed.
- `/32` on a route — a specific host, not a network. Common in BGP.
- `/31` — a special-case point-to-point link (RFC 3021), 2 usable addresses instead of 0.

## Try It Now

Plug any CIDR into the [IP CIDR Calculator](/tools/ip-cidr-calculator) to see the netmask, first and last addresses, total count, and usable count (with cloud-reserved IPs accounted for). Great for sanity-checking a VPC layout before you commit it to Terraform.
