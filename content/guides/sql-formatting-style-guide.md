---
title: "SQL Formatting: A Style Guide for Readable Queries"
description: "Consistent SQL formatting makes queries easier to review, debug, and share. This guide covers indentation, keyword casing, aliasing, and the tools that enforce style automatically."
category: "Developer Tools"
tools: ["sql-formatter"]
tags: ["sql", "databases", "code style", "readability"]
publishedAt: "2026-05-18"
author: "olivia-bennett"
---

## Why SQL Formatting Matters

SQL queries start small — a two-line `SELECT` is easy to read however you write it. But most production queries are not two lines. By the time you have multiple joins, subqueries, window functions, and conditional aggregations, the gap between well-formatted and poorly-formatted SQL is the difference between a query you can review in two minutes and one that takes twenty.

The problem is that SQL has no standardized style guide the way Python has PEP 8 or JavaScript has Prettier defaults. Different teams, different databases, and different ORMs produce wildly inconsistent outputs. When a query passes through four engineers' hands over two years, it often accumulates four different indentation styles, two keyword-casing conventions, and zero consistency.

This guide covers the patterns that experienced engineers agree on, explains why each one exists, and points to the tools that enforce them automatically.

---

## Keyword Casing: Uppercase Is the Standard

The most visible SQL formatting choice is whether SQL keywords (`SELECT`, `FROM`, `WHERE`, `JOIN`) are uppercase or lowercase. Both are valid syntactically. Uppercase is conventional.

The reason uppercase became standard is historical: early SQL environments highlighted keywords by capitalizing them to distinguish them from identifiers (table names, column names). Although modern SQL editors do this with syntax highlighting, the uppercase convention persists because it makes the structural grammar of the query immediately scannable.

```sql
-- Preferred: keywords in uppercase, identifiers in lowercase
SELECT
    u.id,
    u.email,
    COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id, u.email
ORDER BY order_count DESC;

-- Avoid: all lowercase — harder to scan structure
select u.id, u.email, count(o.id) as order_count from users u left join orders o on o.user_id = u.id where u.created_at > '2024-01-01' group by u.id, u.email order by order_count desc;
```

Some teams prefer consistent lowercase throughout (including keywords). This is acceptable if enforced uniformly — the anti-pattern is mixed casing where `SELECT` and `from` appear in the same query.

---

## Indentation: Align Clauses, Indent Conditions

The standard SQL indentation pattern puts major clauses (`SELECT`, `FROM`, `WHERE`, `GROUP BY`, `HAVING`, `ORDER BY`) at the same indent level, with continuation lines indented under them.

```sql
-- Each selected column on its own line
SELECT
    account_id,
    SUM(amount) AS total_revenue,
    COUNT(DISTINCT customer_id) AS unique_customers,
    AVG(amount) AS avg_order_value
FROM orders
WHERE
    status = 'completed'
    AND created_at BETWEEN '2024-01-01' AND '2024-12-31'
    AND deleted_at IS NULL
GROUP BY account_id
HAVING SUM(amount) > 1000
ORDER BY total_revenue DESC
LIMIT 100;
```

**Why separate columns onto their own lines?** When adding a column, you make a one-line change. In code review, this shows up as a single-line diff rather than a change to a long comma-separated string. Git blame can trace each column back to when it was added.

**Why align `AND`/`OR` conditions?** Placing `AND` at the start of each line (rather than the end of the previous line) makes it visually obvious that each condition is independent and can be commented out or removed without touching adjacent lines.

---

## Aliases: When to Use Them and How to Name Them

Aliases (`AS`) make long expressions readable and let you reference derived values. Rules that experienced SQL writers follow:

**Always alias aggregations and expressions.**

```sql
-- Good: clear names for computed columns
SELECT
    user_id,
    COUNT(*) AS event_count,
    MAX(created_at) AS last_event_at,
    DATEDIFF(MAX(created_at), MIN(created_at)) AS days_active

-- Avoid: unnamed expressions
SELECT user_id, COUNT(*), MAX(created_at), DATEDIFF(MAX(created_at), MIN(created_at))
```

**Use short, meaningful table aliases.** Single-letter aliases are fine when the table is obvious in context (`u` for `users`, `o` for `orders`), but avoid reusing the same letter for different tables in the same query. When joining five tables, use two-letter acronyms.

**Always use `AS` explicitly.** Both `table t` and `table AS t` are valid in most databases, but the explicit `AS` is clearer for readers who are not sure whether a word is an alias or a SQL keyword.

---

## JOIN Formatting: Explicit Over Implicit

Write joins explicitly with `LEFT JOIN`, `INNER JOIN`, `RIGHT JOIN`, `FULL OUTER JOIN`. Avoid implicit joins using comma-separated tables in the `FROM` clause — they predate the SQL 92 standard and mix filtering logic with join logic in ways that are hard to read.

```sql
-- Good: explicit join with ON clause
SELECT u.email, COUNT(o.id) AS order_count
FROM users u
INNER JOIN orders o ON o.user_id = u.id
GROUP BY u.email;

-- Avoid: implicit join using WHERE
SELECT u.email, COUNT(o.id) AS order_count
FROM users u, orders o
WHERE o.user_id = u.id
GROUP BY u.email;
```

**Always specify join type.** The unqualified `JOIN` defaults to `INNER JOIN` in all major databases, but writing `INNER JOIN` explicitly removes ambiguity for readers. When you want to keep all rows from one table regardless of matches, `LEFT JOIN` is explicit and intentional.

---

## Subqueries vs CTEs: Prefer CTEs for Readability

Common Table Expressions (`WITH` clauses) name subqueries so they can be referenced like tables. For any query with more than one derived dataset, CTEs are dramatically easier to read than nested subqueries.

```sql
-- Hard to read: deeply nested subquery
SELECT user_id, revenue
FROM (
    SELECT user_id, SUM(amount) AS revenue
    FROM (
        SELECT user_id, amount
        FROM orders
        WHERE status = 'completed'
    ) completed_orders
    GROUP BY user_id
) user_revenue
WHERE revenue > 500;

-- Clear: CTE names each step
WITH completed_orders AS (
    SELECT user_id, amount
    FROM orders
    WHERE status = 'completed'
),
user_revenue AS (
    SELECT user_id, SUM(amount) AS revenue
    FROM completed_orders
    GROUP BY user_id
)
SELECT user_id, revenue
FROM user_revenue
WHERE revenue > 500;
```

Most major databases support CTEs: PostgreSQL, MySQL 8.0+, SQL Server, SQLite 3.35+, BigQuery, Snowflake. The CTE version also makes it easier to debug by running each named step independently.

---

## Trailing Commas vs Leading Commas

Two camps exist on comma placement in column lists. Both are defensible.

**Trailing commas** (the default for most people):
```sql
SELECT
    user_id,
    email,
    created_at
FROM users;
```

**Leading commas** (popular in data warehousing teams):
```sql
SELECT
    user_id
  , email
  , created_at
FROM users;
```

Leading commas align all commas vertically and make it easy to comment out any column without touching adjacent lines. Trailing commas match every other programming language convention. Pick one and enforce it consistently — the worst outcome is a mixture of both in the same codebase.

---

## NULL Handling and Explicit Comparisons

SQL's three-valued logic (`TRUE`, `FALSE`, `NULL`) produces surprises for developers from other languages. Explicit NULL handling makes your intent clear:

```sql
-- Use IS NULL / IS NOT NULL, not = NULL
WHERE deleted_at IS NULL
WHERE last_login IS NOT NULL

-- COALESCE to replace NULLs with a default
SELECT COALESCE(phone, 'no phone') AS phone_display

-- NULLIF to turn a value into NULL
SELECT NULLIF(division_denominator, 0)  -- returns NULL instead of divide-by-zero error
```

**Never use `= NULL` or `<> NULL`.** These comparisons always evaluate to `NULL` (not `TRUE` or `FALSE`), so rows are silently excluded from results. This is one of the most common sources of subtle bugs in SQL queries.

---

## Semicolons and Statement Termination

Always end SQL statements with a semicolon. Some SQL environments execute without them, but semicolons are required when running multiple statements in a single script, using stored procedures, or working with migration tools.

---

## Automating SQL Formatting

Formatting SQL by hand is tedious. Use the [SQL Formatter](/tools/sql-formatter) to instantly reformat a query with consistent keyword casing, indentation, and line breaks. Paste your query, choose your preferred settings, and copy the reformatted version back to your codebase.

For project-wide enforcement, several tools integrate with editors and CI pipelines:

- **sqlfluff** — a configurable SQL linter and formatter that supports PostgreSQL, MySQL, BigQuery, Snowflake, and others. Install with `pip install sqlfluff` and run `sqlfluff format your-query.sql`. Configure style rules in `.sqlfluff`.
- **pgFormatter** — a PostgreSQL-specific formatter (also handles standard SQL well). Available as a command-line tool and as a plugin for popular text editors.
- **dbt** — if your team uses dbt for data transformations, the dbt-core formatter handles SQL style within `.sql` model files.
- **IntelliJ / DataGrip** — built-in SQL formatter with configurable style rules under Code Style → SQL.

---

## A Quick Reference: Common Style Rules

| Rule | Preferred | Avoid |
|------|-----------|-------|
| Keyword casing | `SELECT`, `FROM`, `WHERE` | `select`, `from`, `where` |
| Column list | One per line | All on one line |
| Join type | `INNER JOIN`, `LEFT JOIN` | `JOIN` (ambiguous) |
| NULL comparison | `IS NULL`, `IS NOT NULL` | `= NULL`, `<> NULL` |
| Aliases | Always use `AS` | `table t` without `AS` |
| Subqueries | Use CTEs (`WITH`) | Deeply nested inline |
| Statement end | Semicolon `;` | No terminator |
| Comments | `-- explanation` before the clause | No comments |

Consistent SQL style reduces review friction, makes queries easier to debug, and helps new team members read unfamiliar schemas faster. The [SQL Formatter](/tools/sql-formatter) handles the mechanical work — you focus on writing the logic.
