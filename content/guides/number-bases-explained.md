---
title: "Binary, Octal, Hex, Decimal: A Dev's Guide to Number Bases"
description: "Why colour codes are hex, why chmod uses octal, and what bit-shifting really does — the number bases every dev eventually bumps into."
category: "Developer Tools"
tools: ["number-base-converter"]
tags: ["binary", "hexadecimal", "octal", "programming-fundamentals", "bitwise"]
publishedAt: "2026-04-19"
author: "olivia-bennett"
---

## Why Devs Care About Bases

A number base is the size of the digit alphabet you count with. Decimal uses ten digits (0–9), binary uses two (0–1), hexadecimal uses sixteen (0–9, a–f). The underlying number is the same — `255`, `0xFF`, and `0b11111111` are three ways to write the same quantity. The base is just notation.

Bases matter to devs because the non-decimal ones show up in places nothing else fits:

- **Binary** — how computers actually store everything.
- **Hex** — compact way to read bytes, colours, hashes, memory addresses.
- **Octal** — Unix file permissions and a few legacy file formats.
- **Base 64** — encoding arbitrary bytes as text (covered in a [separate guide](/guides/base64-encoding-explained)).

Knowing when to read a number in which base is the difference between understanding a stack trace and guessing at it.

## The Conversion Math

Converting between bases is mechanical. From any base to decimal:

```
0xFF = 15 × 16¹ + 15 × 16⁰ = 240 + 15 = 255
0b1010 = 1×8 + 0×4 + 1×2 + 0×1 = 10
0o755 = 7×64 + 5×8 + 5×1 = 493
```

Each digit position is a power of the base.

Decimal to another base: repeated division.

```
255 ÷ 16 = 15 remainder 15  →  F
 15 ÷ 16 =  0 remainder 15  →  F
Read remainders bottom-up: 0xFF
```

The [Number Base Converter](/tools/number-base-converter) does this instantly for any pair of bases from 2 to 36 — useful for sanity-checking when you're reading a hex dump or debugging a bitmask.

## Why Hex Pairs with Bytes

A **byte** is 8 bits. 8 bits can hold 2^8 = 256 values (0–255). Hex has the convenient property that one hex digit = 4 bits = half a byte — called a "nibble." So exactly **two hex digits** encode any byte: `00` through `FF`.

That pairing is why hex shows up everywhere bytes matter:

- **RGB colours** — `#FF5733`. Each pair (FF, 57, 33) is one byte for red, green, blue.
- **MAC addresses** — `3c:22:fb:a1:5e:d4`. Six bytes, each written as two hex digits.
- **SHA hashes** — `e3b0c44298fc1c149afbf4c8996fb924...`. 32 bytes → 64 hex characters.
- **Memory addresses** — `0x7ffe_5c00`. Each nibble displays one debugger-column of memory.
- **UTF-8 bytes** — `U+1F600` for 😀. The codepoint in hex is the universal reference.

Binary would be too long (`#11111111 01010111 00110011` instead of `#FF5733`). Decimal would be unreadable for raw bytes (what's `0xDE` in decimal? 222 — and good luck remembering that).

## Why Octal Survives in Unix Permissions

File permissions on Unix are a 9-bit field: three bits each for *read*, *write*, *execute* on the owner, group, and others. Conveniently, 3 bits = one octal digit, so the whole thing packs into three octal digits:

```
rwx rwx rwx    →    111 111 111    →    777
rwx r-x r--    →    111 101 100    →    754
rw- r-- r--    →    110 100 100    →    644
```

`chmod 755 script.sh` means:
- Owner: rwx (7 = 111)
- Group: r-x (5 = 101)
- Others: r-x (5 = 101)

Octal fits exactly; decimal would need more digits and lose the visual structure. In any other context, octal is mostly a historical curiosity — but every time you `chmod`, you're doing octal.

## Binary Literals in Code

Most modern languages let you write numbers directly in non-decimal bases:

| Language | Binary | Octal | Hex |
|---|---|---|---|
| Python 3 | `0b1010` | `0o755` | `0xFF` |
| JavaScript | `0b1010` | `0o755` | `0xFF` |
| Rust | `0b1010` | `0o755` | `0xff` |
| C / C++ | `0b1010` (C++14+) | `0755` (leading zero) | `0xFF` |
| Java | `0b1010` | `0755` | `0xFF` |
| Go | `0b1010` | `0o755` | `0xFF` |

**Watch the C-style octal.** In C, `0755` is octal (493), not decimal 755. This has bitten generations of devs reading pre-C++14 code. Python 3 deliberately removed the bare leading-zero syntax to prevent the confusion; you must write `0o755`.

Underscores are also common as digit separators: `0xDEAD_BEEF`, `0b1010_1100`. Makes long literals readable without changing their value.

## Bitwise Operations — Where Base Actually Matters

Binary isn't just for display. Bitwise operators work on the actual bit pattern of the number:

```
 0b1100 & 0b1010  =  0b1000     (AND — both bits set)
 0b1100 | 0b1010  =  0b1110     (OR  — either bit set)
 0b1100 ^ 0b1010  =  0b0110     (XOR — exactly one bit set)
~0b1100           =  ...0011    (NOT — flip all bits)
 0b0011 << 2      =  0b1100     (shift left — multiply by 4)
 0b1100 >> 1      =  0b0110     (shift right — divide by 2)
```

Practical uses you'll bump into:

- **Feature flags.** `const CAN_READ = 1; const CAN_WRITE = 2; const CAN_DELETE = 4;` — combine with `|`, check with `&`.
- **Unix permissions** — exactly this pattern.
- **Bitmask color blending** — `(r << 16) | (g << 8) | b`.
- **Optimised math** — `n << 1` is faster than `n * 2` on microcontrollers (modern CPUs make the difference negligible but the idiom persists).

When you're reading code that does bit operations, convert to binary mentally. A value like `0b00110011` is almost self-explanatory; the same value as `51` is opaque.

## Two's Complement — Why -1 Is All 1s

Computers store signed integers in **two's complement**. It looks weird at first: in an 8-bit signed integer, `-1` is `0b11111111` (the same bit pattern as `255` unsigned).

The reason is elegant. Two's complement is designed so that addition and subtraction work *identically* whether the numbers are signed or unsigned — the CPU doesn't need to know. And the sign is just the top bit: `0` = positive, `1` = negative.

Side effects you'll actually encounter:

- `INT_MIN` is one further from zero than `INT_MAX`. In 32-bit: `-2,147,483,648` to `+2,147,483,647`. That's why `abs(INT_MIN)` doesn't fit in an `int32`.
- Bit-shifting a negative number right in C/C++ is implementation-defined (usually arithmetic shift, which preserves the sign).
- In JavaScript, bitwise operators coerce numbers to 32-bit signed ints — `0xFFFFFFFF | 0 === -1`. Surprise.

## When to Pick Which

| Situation | Base |
|---|---|
| Human-facing numbers (age, counts, money) | Decimal |
| Bitmasks, low-level flags, bitwise logic | Binary |
| Colours, bytes, hashes, memory, Unicode | Hex |
| Unix file permissions | Octal |
| Compact binary-to-text encoding | Base64 |

## Try It Now

Convert any number between bases 2 through 36 with the [Number Base Converter](/tools/number-base-converter) — useful when reading hex dumps, decoding bitmasks, or doing the chmod-to-octal math without opening a calculator.
