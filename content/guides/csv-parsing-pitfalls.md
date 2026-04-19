---
title: "CSV Parsing Pitfalls: Why Your Spreadsheet Breaks in Code"
description: "CSV looks like the simplest data format in the world. It isn't — the separator isn't always a comma, Excel mangles leading zeros, and UTF-8 without a BOM becomes gibberish."
category: "Developer Tools"
tools: ["csv-to-json"]
tags: ["csv", "data", "excel", "encoding", "rfc-4180"]
publishedAt: "2026-04-19"
author: "olivia-bennett"
---

## The "Standard" That Isn't

CSV stands for Comma-Separated Values. It looks trivially simple: values joined by commas, rows separated by newlines. You could write a parser in an afternoon.

Then you try to open a real CSV file exported from a real spreadsheet by a real customer, and it turns out:

- The commas are actually semicolons because the user's Excel is in German locale.
- Half the fields are wrapped in quotes, except the ones with apostrophes, which have doubled-up quotes inside.
- The file starts with three mysterious bytes that break your parser.
- The phone-number column is full of `4.15555e+9`-style scientific notation.
- One field contains a line break inside a quoted value, and your row-counting logic is now off by one for the rest of the file.

CSV is specified by RFC 4180 (2005), but the RFC is informational, not normative, and every application that emits CSV treats it as advisory. This guide covers the gotchas in the order they tend to hit you in production.

You can sanity-check any CSV by converting it to JSON with the [CSV to JSON](/tools/csv-to-json) tool — it auto-detects delimiters and shows you parse errors explicitly.

## Gotcha 1: The Separator Isn't Always a Comma

Excel's "Save as CSV" uses the **locale's list separator**. In US/UK English locales that's `,`. In German, French, Italian, and most European locales — where the decimal point is a comma — the list separator is `;`. In some Nordic locales it's a tab.

Open the same file in Excel in two different locales and you'll see different structures. A spreadsheet authored in Germany saved as CSV will be semicolon-delimited; opened in English Excel, every row becomes a single field.

Practical handling:

- **Don't hardcode `,`** — at minimum, allow configuration.
- **Detection heuristics:** count `,`, `;`, `\t`, and `|` in the first line. Pick the most frequent. Most modern parsers (Python `pandas.read_csv` with `sep=None`, Node `papaparse` with auto-detect) do this.
- **Emitting CSV:** decide whether your output is for an international spreadsheet or a machine parser. If it's machine-to-machine, pin to `,`. If users will open it in Excel, consider TSV (tab-separated) instead — fewer locale ambiguities.

## Gotcha 2: Quoting Rules Are Subtle

A field must be quoted if it contains the delimiter, a double-quote, or a newline. Inside a quoted field, a literal double-quote is represented by doubling: `""`.

```
name,note
Alice,"She said ""hi"""
Bob,"Plain note, no quotes"
Charlie,"Line one
line two"
```

Three places parsers get this wrong:

1. **Unquoted fields containing quotes.** `Bob,says "hi"` is ambiguous: is that one field or two? RFC 4180 says: if a field isn't fully quoted, it shouldn't contain quotes at all. Forgiving parsers will treat the quotes as literal characters; strict parsers will error.
2. **Mismatched quote state.** A single stray quote inside a field can throw the parser into "quoted mode" for the rest of the file. Every subsequent comma becomes part of the field; every row ends up as one huge string.
3. **Newlines inside quoted fields.** Splitting the file on `\n` before parsing is the classic bug. Quoted newlines are legal and must be preserved as part of the field.

Always use a real parser, never `split(',')`.

## Gotcha 3: Encoding and the BOM

CSV has no field for declaring encoding. UTF-8 is the 2026 default; older files may be Windows-1252, ISO-8859-1 (Latin-1), Shift-JIS, or something worse.

**Microsoft Excel on Windows** is the pain point. If a UTF-8 file doesn't start with a Byte Order Mark (BOM — the bytes `EF BB BF`), Excel assumes the file is in the user's locale's default encoding (usually Windows-1252 in the US/UK). Result: `café` displays as `cafÃ©`, `москва` becomes garbage.

Options:

- **Emit a BOM** at the start of the file when writing UTF-8 CSV for Excel. It's ugly — the three bytes are visible if the file is opened in a plain text editor — but Excel needs them.
- **Use TSV or a "Unicode CSV" variant.** Excel imports tab-separated UTF-16 files without the BOM dance.
- **Skip Excel entirely** — ship an `.xlsx` file written by a proper library (OpenPyXL, ExcelJS), which has explicit encoding.

Detection: if the first three bytes are `EF BB BF`, strip them before parsing. Most parsers do this automatically, but not all.

## Gotcha 4: Excel Mangles Types

Open a CSV containing a ZIP code `01234` in Excel. Excel guesses it's a number, drops the leading zero, saves it back as `1234`. The same happens to phone numbers with leading zeros, long numeric IDs (stored as scientific notation — `1.23457e+14`), and dates in ambiguous formats.

The most famous case: **human gene names**. The gene `SEPT2` gets auto-converted to the date `2-Sep` because Excel thinks "SEPT" is September. In 2020, geneticists officially renamed 27 genes to avoid this — the tool had beaten the science.

Workarounds when CSV is going to pass through Excel:

- **Import via "Get Data" / "Text Import Wizard"** — explicitly set each column's type. Tedious; users won't do it.
- **Prefix numeric strings with `=""`** — a formula that evaluates to a string. `="01234"`. Ugly but effective.
- **Use `.xlsx` instead of `.csv`** for user-facing data. Excel has never mangled a properly-typed XLSX cell.

## Gotcha 5: Line Endings

RFC 4180 specifies CRLF (`\r\n`) between rows. Unix-authored files typically use LF (`\n`). Old Mac files used bare CR (`\r`).

Most modern parsers handle all three. But when writing CSV from a Unix-based server for download by Windows users, emitting CRLF avoids Notepad displaying the file as one giant line.

## Gotcha 6: Empty Fields vs Missing Values

CSV has no `null`. `a,,c` has an empty middle field — is that empty string, null, or missing? The answer depends on the receiving system.

Conventions in use:

- Empty field = empty string (database VARCHAR).
- Empty field = null (ORMs, Pandas with `na_values`).
- `NULL` / `null` / `N/A` literal = null (some dialects).
- Explicit quoted empty `""` = empty string; unquoted empty = null (Postgres COPY default).

When designing a CSV import, **document the rule and enforce it** — ambiguity here causes silent data corruption.

## Parser Recommendations

- **Python** — `pandas.read_csv()` for analysis; `csv.DictReader` from the stdlib for line-by-line.
- **Node.js** — `papaparse` is the de facto standard; handles every edge case listed above.
- **Go** — `encoding/csv` in stdlib is sufficient for well-formed CSV.
- **Ruby** — `CSV.parse` in stdlib.
- **Java** — Apache Commons CSV or OpenCSV.

Avoid: rolling your own with `split(',')`.

## Common Mistakes

- **Assuming the separator.** Accept it as a parameter or auto-detect.
- **Ignoring the BOM.** Strip on read, add on write when the consumer is Excel.
- **Using `split('\n')` before parsing.** Breaks on quoted newlines.
- **Trusting Excel to round-trip a CSV.** Numeric strings, dates, and gene names all get mangled.
- **No encoding declaration.** Pick UTF-8, document it, emit a BOM for Excel compatibility.

## Try It Now

Convert any CSV to JSON — with automatic delimiter detection, type coercion for numbers and booleans, and explicit error reporting for malformed rows — using the [CSV to JSON](/tools/csv-to-json) tool. Useful for sanity-checking a customer-exported file before you write import code around its quirks.
