---
title: "Data Storage Units Explained: Bits, Bytes, Megabytes, and the SI vs IEC Confusion"
description: "1 GB can mean 1 000 000 000 bytes or 1 073 741 824 bytes depending on who is writing the spec. This guide explains why, covers all storage and transfer rate units, and helps you convert correctly between them."
category: "Value Converter"
tools: ["data-storage-converter", "bitrate-converter"]
tags: ["data storage", "units", "bytes", "megabytes", "gigabytes", "bitrate", "conversion", "networking"]
publishedAt: "2026-05-22"
author: "olivia-bennett"
---

Buy a 1 TB hard drive. Format it and check the available space: 931 GB. Buy a 1 Gbps internet connection. Run a speed test during a file download: 125 MB/s. Both numbers are correct. Both involve the same confusion — the ambiguity between decimal and binary definitions of the same unit names.

This confusion has caused real problems: a 2007 class action lawsuit against major hard drive manufacturers was settled for $45 million because consumers felt misled by the marketing vs. formatted capacity discrepancy. Understanding the distinction is not pedantry — it is the difference between spec sheets that match reality and ones that don't.

---

## The Fundamental Units

**Bit (b):** the smallest unit of digital information. A single binary value: 0 or 1.

**Byte (B):** 8 bits. The smallest addressable unit in most computer architectures. A single ASCII character is 1 byte. The distinction between bits (lowercase b) and bytes (uppercase B) matters enormously in network contexts — missing it leads to 8× errors.

```
1 byte = 8 bits
A 100 Mbps network connection transfers 100 megabits per second
= 12.5 megabytes per second (not 100 MB/s)
```

---

## SI Prefixes (Decimal) vs IEC Prefixes (Binary)

The core confusion: storage manufacturers use SI (International System of Units) decimal prefixes, where 1 kilo = 1 000. Operating systems traditionally used the same prefix names but with binary values, where 1 kilo = 1 024.

### SI (decimal) prefixes — what storage manufacturers use

| Prefix | Symbol | Value | Bytes |
|---|---|---|---|
| Kilobyte | KB | 10³ | 1 000 |
| Megabyte | MB | 10⁶ | 1 000 000 |
| Gigabyte | GB | 10⁹ | 1 000 000 000 |
| Terabyte | TB | 10¹² | 1 000 000 000 000 |
| Petabyte | PB | 10¹⁵ | 1 000 000 000 000 000 |

### IEC (binary) prefixes — what OSes traditionally report

| Prefix | Symbol | Value | Bytes |
|---|---|---|---|
| Kibibyte | KiB | 2¹⁰ | 1 024 |
| Mebibyte | MiB | 2²⁰ | 1 048 576 |
| Gibibyte | GiB | 2³⁰ | 1 073 741 824 |
| Tebibyte | TiB | 2⁴⁰ | 1 099 511 627 776 |
| Pebibyte | PiB | 2⁵⁰ | 1 125 899 906 842 624 |

The IEC binary prefixes (kibibyte, mebibyte, gibibyte) were standardised in 1998 precisely to resolve this ambiguity. They have not been universally adopted — most people still say "gigabyte" when they mean "gibibyte" — but the prefixes exist if you need to be unambiguous.

### The capacity gap grows with scale

| Advertised | Binary (GiB) | Difference |
|---|---|---|
| 1 GB | 0.931 GiB | 6.9% less |
| 500 GB | 465.7 GiB | 6.9% less |
| 1 TB | 931.3 GiB | 6.9% less |
| 4 TB | 3 725 GiB | 6.9% less |

The gap is always approximately 6.9% for TB, 7.4% for TiB — which is why a 1 TB drive shows ~931 GB available after formatting. The drive contains exactly 1 000 000 000 000 bytes; your OS reported it as 931 GiB (which it calls "GB").

Use the [Data Storage Converter](/tools/data-storage-converter) to convert between SI and IEC units accurately, including the decimal/binary distinction.

---

## OS Behaviour by Platform

Different operating systems have made different choices about which definition to use when displaying "GB":

| OS | Display convention | Example |
|---|---|---|
| Windows (traditional) | Reports binary GiB, labels as "GB" | 1 TB drive → "931 GB" |
| macOS (10.6+, 2009) | Switched to decimal GB | 1 TB drive → "1 TB" |
| Linux | Varies by distro and tool; `df -h` uses binary, `df -H` uses decimal | |
| iOS / Android | Use decimal GB | |
| Hard drive packaging | Decimal GB | |

This is why the same 1 TB drive shows "931 GB" in Windows and "1 TB" in macOS — they are both correct, just using different definitions.

---

## Storage Unit Conversion Table

| Unit | Bytes | Notes |
|---|---|---|
| 1 bit | 0.125 bytes | 1/8 of a byte |
| 1 byte | 8 bits | |
| 1 KB (decimal) | 1 000 bytes | Marketing, ISPs, macOS |
| 1 KiB (binary) | 1 024 bytes | RAM, OS file sizes (Windows) |
| 1 MB (decimal) | 1 000 000 bytes | File sizes in marketing |
| 1 MiB (binary) | 1 048 576 bytes | ~4.9% larger than 1 MB |
| 1 GB (decimal) | 1 000 000 000 bytes | Storage capacity |
| 1 GiB (binary) | 1 073 741 824 bytes | ~7.4% larger than 1 GB |
| 1 TB (decimal) | 1 000 000 000 000 bytes | Drive packaging |
| 1 TiB (binary) | 1 099 511 627 776 bytes | ~9.95% larger than 1 TB |

---

## Network Transfer Rates: Bits Per Second

Network speeds are almost always specified in bits per second (bps), not bytes per second. This is the most common source of 8× errors when calculating transfer times.

### Transfer rate units

| Unit | Symbol | Value |
|---|---|---|
| Kilobits per second | Kbps or kb/s | 1 000 bits/s |
| Megabits per second | Mbps or Mb/s | 1 000 000 bits/s |
| Gigabits per second | Gbps or Gb/s | 1 000 000 000 bits/s |
| Kilobytes per second | KB/s | 8 000 bits/s |
| Megabytes per second | MB/s | 8 000 000 bits/s |
| Gigabytes per second | GB/s | 8 000 000 000 bits/s |

**The conversion:** divide Mbps by 8 to get MB/s.

```
100 Mbps ÷ 8 = 12.5 MB/s
1 Gbps ÷ 8 = 125 MB/s
```

### Real-world transfer time calculation

```
File size: 1 GB (decimal) = 1 000 000 000 bytes = 8 000 000 000 bits
Connection speed: 100 Mbps = 100 000 000 bits/second

Transfer time = 8 000 000 000 ÷ 100 000 000 = 80 seconds
```

In practice, add ~20–30% overhead for TCP/IP headers, protocol handshaking, and line utilisation:

```
Realistic transfer time ≈ 80 × 1.25 = 100 seconds
```

Use the [Bitrate Converter](/tools/bitrate-converter) to convert between bps, Kbps, Mbps, Gbps, and the corresponding byte rates.

### Connection speed contexts

| Context | Typical speed | MB/s equivalent |
|---|---|---|
| 4G LTE (average) | 20–50 Mbps | 2.5–6.25 MB/s |
| 5G (mid-band) | 100–900 Mbps | 12.5–112 MB/s |
| Home broadband (100Mbps) | 100 Mbps | 12.5 MB/s |
| Home broadband (1Gbps) | 1 Gbps | 125 MB/s |
| Wi-Fi 5 (802.11ac) | Up to 3.5 Gbps | 437 MB/s (theoretical) |
| SATA SSD read | ~550 MB/s | 4.4 Gbps |
| NVMe SSD read | 3 500–7 000 MB/s | 28–56 Gbps |
| USB 3.0 | 5 Gbps | 625 MB/s |
| USB 4 | 40 Gbps | 5 GB/s |
| PCIe 4.0 ×4 | 64 Gbps | 8 GB/s |

---

## Common Calculation Mistakes

**Mistake 1: Using bits where bytes are needed (or vice versa)**

```
Wrong: "My 1 Gbps connection can transfer 1 GB in 1 second"
Right: 1 Gbps = 125 MB/s; transferring 1 GB takes ~8 seconds (plus overhead)
```

**Mistake 2: Mixing SI and binary without acknowledgement**

```
Wrong: "This function returns size in MB" — which MB?
Right: document clearly: decimal MB (÷ 1 000 000) or binary MiB (÷ 1 048 576)
```

**Mistake 3: Forgetting that "kilo" means 1 000 in networking**

Networking units use SI decimal prefixes universally. 1 Kbps = 1 000 bps, not 1 024 bps. This is different from memory addressing where KiB = 1 024.

**Mistake 4: Confusing storage capacity with throughput**

"This NVMe drive is rated at 7 GB/s" is a throughput rating (how fast data can be read). "This drive is 2 TB" is a capacity rating. They measure different things.

---

## Programmatic Conversion

### JavaScript

```javascript
const UNITS = {
  // SI decimal (storage marketing)
  KB: 1e3, MB: 1e6, GB: 1e9, TB: 1e12, PB: 1e15,
  // IEC binary (OS file system)
  KiB: 1024, MiB: 1024**2, GiB: 1024**3, TiB: 1024**4, PiB: 1024**5,
};

function convertStorage(value, from, to) {
  const bytes = value * UNITS[from];
  return bytes / UNITS[to];
}

convertStorage(1, 'TB', 'GiB');  // 931.32... (the "missing" storage)
convertStorage(1, 'Gbps', 'MB'); // 125 (Gbps ÷ 8 = MB/s, but unit is not here)
```

### Python

```python
def bytes_to_human(n: int, binary: bool = False) -> str:
    """Format bytes as human-readable size."""
    if binary:
        units = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB']
        factor = 1024
    else:
        units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
        factor = 1000

    for unit in units[:-1]:
        if abs(n) < factor:
            return f"{n:.1f} {unit}"
        n /= factor
    return f"{n:.1f} {units[-1]}"

bytes_to_human(1_000_000_000)           # "1.0 GB" (decimal)
bytes_to_human(1_000_000_000, binary=True)  # "953.7 MiB" (binary)
bytes_to_human(1_073_741_824, binary=True)  # "1.0 GiB"
```

### When to use which in code

- **User-facing displays**: match the platform convention. On macOS, use decimal (GB). On Windows, use binary but label as GiB if you want to be accurate, or use binary and label as GB to match Windows Explorer.
- **Networking and APIs**: always use bits per second for transfer rates; bytes per second for bandwidth limits in code.
- **Database storage**: bytes as integers; convert to human-readable only at the display layer.
- **Documentation and specs**: use IEC prefixes (GiB) if you mean binary, SI (GB) if you mean decimal. If you write "GB", be aware that readers may assume either.
