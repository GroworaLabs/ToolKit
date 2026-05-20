---
title: "SQL Injection Prevention: A Developer's Complete Guide"
description: "SQL injection has topped the OWASP Top 10 for over a decade. This guide explains how attacks work at the query level, the defences that actually stop them, and how to test your own code for vulnerabilities."
category: "Security"
tools: ["form-test-data-generator"]
tags: ["sql injection", "security", "databases", "owasp", "prepared statements", "orm", "web security"]
publishedAt: "2026-05-20"
author: "marcus-chen"
---

SQL injection is the oldest web vulnerability still causing breaches in 2026. It has featured in the OWASP Top 10 every year since the list was created. The 2021 edition merged it into "Injection" — now the third most critical category — because the underlying issue extends beyond SQL to NoSQL, LDAP, XPath, and OS commands. But SQL injection remains the most prevalent form.

The reason it persists is not that developers do not know about it. It is that the vulnerable patterns are often easier to write than the safe ones, and the consequences are not visible until an attack occurs. This guide covers how attacks work, the defences that reliably stop them, and how to test your own application before an attacker does.

---

## How SQL Injection Works

SQL injection works because many applications construct database queries by concatenating user input directly into a SQL string. The database has no way to distinguish between the SQL the developer intended and SQL smuggled inside the user's data.

The classic example — a login form:

```sql
-- Developer's intended query, with user input substituted
SELECT * FROM users WHERE username = 'alice' AND password = 'secret123';

-- Attacker enters: ' OR '1'='1' -- as the username
SELECT * FROM users WHERE username = '' OR '1'='1' -- ' AND password = 'anything';
-- The -- starts a comment. Everything after it is ignored.
-- '1'='1' is always true. This returns all rows in the users table.
-- First row returned is typically the admin account.
```

The attacker bypassed authentication without knowing a single valid password. This is the simplest form. More sophisticated attacks extract data:

```sql
-- Attacker enters: ' UNION SELECT username, password, null FROM users --
SELECT id, name, email FROM products WHERE id = '' 
  UNION SELECT username, password, null FROM users --
-- Returns the username and password hash of every user.
```

Or drop entire tables:

```sql
-- Attacker enters: '; DROP TABLE users; --
SELECT * FROM orders WHERE id = ''; DROP TABLE users; --';
```

Whether `DROP TABLE` works in a single call depends on the database driver and whether multi-statement execution is enabled, but the extraction attacks work universally against vulnerable code.

---

## The One Reliable Defence: Parameterised Queries

The reason SQL injection is possible is that the database parses a string that contains both the SQL structure and the user data together, with no way to tell them apart. The fix is to send the SQL structure and the data separately, so the database can never confuse one for the other.

This is called a **parameterised query**, **prepared statement**, or **bound parameter** — the same concept with different names across different libraries and databases.

**Node.js with pg (PostgreSQL):**

```javascript
// Vulnerable — never do this
const result = await client.query(
  `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`
);

// Safe — parameterised query
const result = await client.query(
  'SELECT * FROM users WHERE username = $1 AND password = $2',
  [username, password]
);
// The database receives the SQL structure and [username, password] as separate items.
// username and password are treated as data, not SQL, regardless of what they contain.
```

**Node.js with mysql2:**

```javascript
// Safe
const [rows] = await connection.execute(
  'SELECT * FROM users WHERE username = ? AND password = ?',
  [username, password]
);
```

**Python with psycopg2:**

```python
# Vulnerable
cursor.execute(f"SELECT * FROM users WHERE username = '{username}'")

# Safe — use %s placeholders, pass values as tuple
cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s",
               (username, password))
```

**Python with SQLAlchemy:**

```python
from sqlalchemy import text

# Safe — use :param syntax
result = db.execute(
    text("SELECT * FROM users WHERE username = :username"),
    {"username": username}
)

# Or use the ORM (parameterised by default)
user = db.query(User).filter(User.username == username).first()
```

**Java with JDBC:**

```java
// Vulnerable
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery("SELECT * FROM users WHERE id = " + userId);

// Safe
PreparedStatement ps = conn.prepareStatement(
    "SELECT * FROM users WHERE id = ?"
);
ps.setInt(1, userId);
ResultSet rs = ps.executeQuery();
```

The rule is absolute: **user input never goes directly into a SQL string, ever.** Not for IDs, not for search terms, not for sort order, not for anything that a user could influence.

---

## ORMs: Mostly Safe, With Caveats

Object-relational mappers (Prisma, TypeORM, Sequelize, SQLAlchemy, Django ORM, ActiveRecord) generate parameterised queries by default. Using the ORM's standard query API is safe:

```javascript
// Prisma — safe
const user = await prisma.user.findFirst({
  where: { username: username, password: hashedPassword }
});

// TypeORM — safe
const user = await userRepository.findOne({
  where: { username, password: hashedPassword }
});
```

The danger is when you step outside the ORM's query builder to use raw SQL — which is sometimes necessary for complex queries:

```javascript
// Prisma raw query — vulnerable if string-concatenated
const result = await prisma.$queryRaw(
  `SELECT * FROM users WHERE username = '${username}'` // WRONG
);

// Prisma raw query — safe using tagged template literal
const result = await prisma.$queryRaw`
  SELECT * FROM users WHERE username = ${username}
`;
// Prisma's tagged template literal automatically parameterises the values.
```

Every ORM that supports raw queries also supports parameterised raw queries. Always use the parameterised form.

---

## Where Parameterisation Has Limits

Parameterised queries handle values — strings, numbers, dates. They cannot parameterise SQL identifiers: table names, column names, and sort direction keywords (`ASC`, `DESC`).

If your application needs to accept dynamic column names or sort order from user input:

```javascript
// Cannot do this with parameters
const result = await client.query(
  'SELECT * FROM orders ORDER BY $1 $2',  // Does not work — identifiers cannot be parameterised
  [sortColumn, sortDirection]
);
```

The safe approach for identifiers is an **allowlist**:

```javascript
const ALLOWED_COLUMNS = ['created_at', 'total_amount', 'status', 'customer_name'];
const ALLOWED_DIRECTIONS = ['ASC', 'DESC'];

function buildSortClause(column, direction) {
  const safeColumn = ALLOWED_COLUMNS.includes(column) ? column : 'created_at';
  const safeDirection = ALLOWED_DIRECTIONS.includes(direction?.toUpperCase())
    ? direction.toUpperCase()
    : 'ASC';
  return `ORDER BY ${safeColumn} ${safeDirection}`;  // Safe — both values come from allowlist
}

const result = await client.query(
  `SELECT * FROM orders ${buildSortClause(userSortColumn, userSortDirection)}`
);
```

The allowlist approach: accept only values you know are safe column names. Reject anything else. Never use a blocklist (trying to strip out dangerous characters) — it is impossible to enumerate all possible attack vectors.

---

## Testing Your Own Application for SQL Injection

Static code review catches obvious vulnerabilities but misses complex cases. Dynamic testing — actually sending injection payloads against a running application — is more reliable.

**Using the Form Test Data Generator:**

The [Form Test Data Generator](/tools/form-test-data-generator) produces SQL injection test payloads automatically for any form field. Add a text field, select "SQL injection" as a test case category, and it generates a comprehensive set of attack strings including:

- `' OR '1'='1`
- `'; DROP TABLE users; --`
- `' UNION SELECT null, null --`
- `1; SELECT sleep(5) --` (time-based blind injection)
- `' AND 1=CONVERT(int,'a') --` (error-based injection)

Run these inputs through your form and observe the response. A vulnerable application will either return unexpected data, throw a database error, or (for time-based payloads) take longer to respond.

**Automated scanning:**

`sqlmap` is the standard open-source tool for automated SQL injection testing. It should only be run against applications you have explicit permission to test:

```bash
# Test a specific parameter
sqlmap -u "https://yourapp.local/search?q=test" --dbs

# Test a POST request
sqlmap -u "https://yourapp.local/login" \
  --data "username=test&password=test" \
  --level 3 --risk 2
```

**Manual testing checklist:**

For each user-controlled input that reaches a database query:
- Append a single quote `'` — does the application return a database error?
- Append `' OR '1'='1` — does it return more records than expected?
- Append `'; SELECT sleep(5)--` — does the response take 5+ seconds longer?

Any of these responses indicates a vulnerability.

---

## Second-Order SQL Injection

A less obvious variant: second-order injection occurs when user input is stored safely but then retrieved and used unsafely in a subsequent query.

```javascript
// Registration — safely stores a malicious username
await db.query('INSERT INTO users (username) VALUES ($1)', [username]);
// username = "admin'--" is stored safely in the database

// Later, password-change flow — retrieves username and uses it unsafely
const user = await db.query(`SELECT * FROM users WHERE username = '${username}'`);
// The malicious username is now extracted from the DB and injected into a new query
```

The defence is the same: always use parameterised queries when you read data back out of the database and use it in another query. The fact that data came from your own database does not make it safe to concatenate into SQL.

---

## Beyond SQL: NoSQL and Other Injection Types

MongoDB and other NoSQL databases have their own injection variants. MongoDB queries are JavaScript objects — sending `{ "$gt": "" }` as a field value can bypass equality checks:

```javascript
// Vulnerable MongoDB query
const user = await db.collection('users').findOne({
  username: req.body.username,
  password: req.body.password  // If password is { "$gt": "" }, this matches any user
});
```

```javascript
// Safe — validate that input is a string before using it
const { username, password } = req.body;
if (typeof username !== 'string' || typeof password !== 'string') {
  return res.status(400).json({ error: 'Invalid input' });
}
```

For MongoDB, always validate that inputs are the expected type before passing them to queries. Libraries like `mongoose` provide schema-level type coercion that prevents object injection if used correctly.

---

## The LIKE Operator: A Common Edge Case

Parameterised queries protect against injection, but the SQL `LIKE` operator has its own special characters that need escaping even inside a parameter: `%` (match any sequence) and `_` (match any single character). If a user searches for `50%` and you do not escape the `%`, the LIKE query will treat it as a wildcard.

```javascript
// Parameterised but not LIKE-escaped — user can use % and _ as wildcards
const result = await client.query(
  'SELECT * FROM products WHERE name ILIKE $1',
  [`%${searchTerm}%`]
);

// Safe: escape LIKE special characters before embedding in the pattern
function escapeLike(str) {
  return str.replace(/[%_\\]/g, c => `\\${c}`);
}

const result = await client.query(
  "SELECT * FROM products WHERE name ILIKE $1 ESCAPE '\\'",
  [`%${escapeLike(searchTerm)}%`]
);
```

For full-text search, consider using your database's native full-text search instead of `LIKE`: `tsvector`/`tsquery` in PostgreSQL, `MATCH...AGAINST` in MySQL, or a dedicated search index (Elasticsearch, Typesense, Meilisearch) for production-scale search.

---

## What to Do When You Find Vulnerable Code

When a security audit or penetration test finds SQL injection in your application, the remediation path depends on how pervasive the vulnerability is.

**Targeted fix (isolated vulnerability):**
1. Replace the concatenated query with a parameterised one.
2. Add a test case that sends a single quote `'` as input and asserts the query succeeds (rather than throwing a database error or returning unexpected results).
3. Deploy immediately — do not wait for the next release cycle.
4. Review similar code in the same module or written by the same author — a vulnerability in one place often has siblings.

**Widespread vulnerability (many queries to fix):**
1. Add a WAF rule to detect the most common injection patterns as a temporary mitigation while the code is fixed.
2. Create a static analysis rule (ESLint, Semgrep, CodeQL) that flags string concatenation in database query functions. Block on this rule in CI.
3. Prioritise fixes by query criticality — login, payment, admin queries first.
4. Rotate any database credentials that may have been exfiltrated.

**Semgrep rule for detecting concatenated SQL:**

```yaml
# .semgrep.yml
rules:
  - id: sql-injection-string-concat
    patterns:
      - pattern: db.query("..." + ...)
      - pattern: db.execute("..." + ...)
    message: "Possible SQL injection: string concatenation in query"
    severity: ERROR
    languages: [javascript, typescript]
```

---

## Defence in Depth

Parameterised queries are the primary defence. Secondary layers reduce the impact if a vulnerability is ever found:

- **Least privilege** — the database user your application connects with should only have the permissions it needs. A read-only reporting connection should not have `DROP TABLE` permissions.
- **Web application firewall (WAF)** — CloudFlare, AWS WAF, and Fastly all include SQL injection detection rules. Not a replacement for fixing the code, but a useful additional layer.
- **Error handling** — never return raw database errors to the client. They expose table names, column names, and database type, all of which help an attacker. Log the full error server-side; return a generic message to the user.
- **Regular dependency updates** — ORM and database driver vulnerabilities are occasionally discovered. Keep dependencies current.
