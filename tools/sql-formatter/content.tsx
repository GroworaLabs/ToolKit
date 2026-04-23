export default function SqlFormatterContent() {
  return (
    <div className="tool-content">
      <h2>SQL Formatting: Best Practices and Style Guide</h2>
      <p>
        SQL is one of the oldest and most widely used languages in computing, yet it has no universally enforced style standard. Different teams write SQL in wildly different styles — uppercase keywords, lowercase keywords, all on one line, spread across dozens of lines, keywords left-aligned, keywords right-aligned. A SQL formatter enforces consistency so that code reviews focus on logic rather than style, and so that queries are readable to every member of the team.
      </p>

      <h3>Why SQL Formatting Matters</h3>
      <p>
        Unformatted or inconsistently formatted SQL creates real problems:
      </p>
      <ul>
        <li><strong>Review overhead:</strong> A code reviewer who has to mentally parse a 200-character single-line query is spending cognitive effort on formatting rather than correctness.</li>
        <li><strong>Debugging difficulty:</strong> A properly indented <code>WHERE</code> clause with one condition per line makes it immediately obvious which conditions are combined with <code>AND</code> and which with <code>OR</code>. A single-line query with mixed <code>AND/OR</code> is a source of bugs.</li>
        <li><strong>Operator precedence:</strong> SQL evaluates <code>AND</code> before <code>OR</code>. A query like <code>WHERE a = 1 OR b = 2 AND c = 3</code> is parsed as <code>WHERE a = 1 OR (b = 2 AND c = 3)</code> — which may not be what was intended. Formatting with explicit parentheses and one condition per line makes the intent clear.</li>
        <li><strong>Version control diffs:</strong> A properly formatted query that changes one condition produces a one-line diff. An unformatted query produces a meaningless full-query diff even for a one-word change.</li>
      </ul>

      <h3>Keyword Casing Conventions</h3>
      <p>
        The most debated style question in SQL is keyword casing. Three schools of thought:
      </p>
      <p>
        <strong>ALL CAPS keywords (most common):</strong>
      </p>
      <pre><code>{`SELECT u.id, u.name, o.total
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.active = TRUE
ORDER BY o.total DESC;`}</code></pre>
      <p>
        The argument for uppercase keywords: they visually separate language constructs from user-defined identifiers (table names, column names, aliases). When scanning a query, your eye immediately finds <code>SELECT</code>, <code>FROM</code>, and <code>WHERE</code> as structural landmarks. This is the convention used by most database documentation and textbooks.
      </p>
      <p>
        <strong>lowercase keywords (growing trend):</strong>
      </p>
      <pre><code>{`select u.id, u.name, o.total
from users u
join orders o on u.id = o.user_id
where u.active = true
order by o.total desc;`}</code></pre>
      <p>
        The argument for lowercase: SQL keywords are identifiable by their position in the statement, not by their case. Lowercase is faster to type and looks more natural alongside lowercase table/column names in modern style guides (like the GitLab SQL Style Guide). This is increasingly common in teams with strong Python/Ruby influence.
      </p>
      <p>
        <strong>Preserve original casing:</strong> Useful when reformatting queries that mix cases intentionally (for example, in stored procedures where the original author's style should be preserved).
      </p>
      <p>
        Pick one convention and enforce it with your formatter — the most important thing is consistency within a codebase.
      </p>

      <h3>Indentation and Alignment Strategies</h3>
      <p>
        Two main approaches to SQL indentation:
      </p>
      <p>
        <strong>Right-aligned keywords (railway style):</strong>
      </p>
      <pre><code>{`  SELECT u.id,
         u.name,
         o.total
    FROM users u
    JOIN orders o ON u.id = o.user_id
   WHERE u.active = TRUE
ORDER BY o.total DESC;`}</code></pre>
      <p>
        This style right-aligns keywords so they form a vertical column. The data (column names, table names, conditions) all start at the same horizontal position. Advocated by Joe Celko's SQL Style Guide and used by many DBAs. Very readable for individual queries; harder to implement consistently in code generation.
      </p>
      <p>
        <strong>Left-aligned keywords (more common in code):</strong>
      </p>
      <pre><code>{`SELECT
  u.id,
  u.name,
  o.total
FROM users u
JOIN orders o
  ON u.id = o.user_id
WHERE
  u.active = TRUE
ORDER BY o.total DESC;`}</code></pre>
      <p>
        This style starts keywords at the left margin and indents the content. It's easier to implement in formatters and ORMs, and is the approach used by most automated formatters. The formatter in this tool uses left-aligned keywords.
      </p>

      <h3>SELECT List Formatting</h3>
      <p>
        For queries with many columns, put each selected expression on its own line:
      </p>
      <pre><code>{`SELECT
  u.id,
  u.first_name,
  u.last_name,
  u.email,
  u.created_at,
  COUNT(o.id) AS order_count,
  SUM(o.total) AS lifetime_value
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.first_name, u.last_name, u.email, u.created_at;`}</code></pre>
      <p>
        Avoid <code>SELECT *</code> in production queries — it retrieves all columns including ones you don't need, increases network transfer, defeats covering indexes, and breaks when columns are added or reordered. Always name the columns you need.
      </p>

      <h3>WHERE Clause Formatting</h3>
      <p>
        The <code>WHERE</code> clause is where bugs most commonly hide. Format it with one condition per line, making operator precedence explicit:
      </p>
      <pre><code>{`WHERE
  u.active = TRUE
  AND u.role IN ('admin', 'editor')
  AND (
    u.last_login > '2024-01-01'
    OR u.subscription_tier = 'premium'
  )
  AND u.deleted_at IS NULL;`}</code></pre>
      <p>
        Notice the explicit parentheses around the <code>OR</code> group. Without them, SQL evaluates <code>AND</code> before <code>OR</code>, and this query's semantics would change. Adding parentheses makes the intent unambiguous, regardless of whether they are strictly necessary.
      </p>

      <h3>JOIN Formatting</h3>
      <p>
        Format each JOIN on its own line, with the <code>ON</code> condition on the next line:
      </p>
      <pre><code>{`FROM users u
JOIN orders o
  ON u.id = o.user_id
LEFT JOIN order_items i
  ON o.id = i.order_id
  AND i.deleted_at IS NULL
LEFT JOIN products p
  ON i.product_id = p.id;`}</code></pre>
      <p>
        Always specify the JOIN type explicitly. Use <code>INNER JOIN</code> (or <code>JOIN</code> for brevity) when you want only matched rows. Use <code>LEFT JOIN</code> when you want all rows from the left table even if there is no match on the right. Never use implicit cross joins (comma-separated table names in <code>FROM</code>) — they produce cartesian products and are easy to misread.
      </p>

      <h3>Subqueries and CTEs</h3>
      <p>
        <strong>Common Table Expressions (CTEs)</strong> with <code>WITH</code> dramatically improve readability compared to deeply nested subqueries:
      </p>
      <pre><code>{`-- Hard to read: nested subquery
SELECT *
FROM (
  SELECT u.id, COUNT(o.id) AS cnt
  FROM users u
  LEFT JOIN orders o ON u.id = o.user_id
  GROUP BY u.id
) sub
WHERE sub.cnt > 5;

-- Much better: CTE
WITH user_order_counts AS (
  SELECT
    u.id,
    COUNT(o.id) AS cnt
  FROM users u
  LEFT JOIN orders o ON u.id = o.user_id
  GROUP BY u.id
)
SELECT *
FROM user_order_counts
WHERE cnt > 5;`}</code></pre>
      <p>
        CTEs are named, appear before the main query, and can reference each other. They make complex queries readable like prose — each CTE is a named step in the data transformation pipeline. Most modern databases (PostgreSQL, MySQL 8+, SQL Server, SQLite 3.35+) support CTEs.
      </p>

      <h3>SQL in Application Code</h3>
      <p>
        SQL embedded in application code has additional formatting considerations:
      </p>
      <p>
        <strong>Tagged template literals (JavaScript/TypeScript):</strong>
      </p>
      <pre><code>{`// Using a tagged template literal with a library like sql-template-strings
const result = await db.query(sql\`
  SELECT
    u.id,
    u.email,
    COUNT(o.id) AS order_count
  FROM users u
  LEFT JOIN orders o ON u.id = o.user_id
  WHERE u.id = \${userId}
  GROUP BY u.id, u.email
\`);`}</code></pre>
      <p>
        <strong>Python (f-strings + parameterisation):</strong>
      </p>
      <pre><code>{`# Always use parameterised queries — never f-string interpolation for user input
cursor.execute("""
    SELECT
        u.id,
        u.email,
        COUNT(o.id) AS order_count
    FROM users u
    LEFT JOIN orders o ON u.id = o.user_id
    WHERE u.id = %s
    GROUP BY u.id, u.email
""", (user_id,))`}</code></pre>
      <p>
        <strong>Never</strong> construct SQL by string concatenation of user input — this leads directly to SQL injection. Use parameterised queries or prepared statements. The placeholder syntax varies by driver: <code>?</code> in SQLite/MySQL, <code>%s</code> in psycopg2, <code>$1</code>/<code>$2</code> in node-postgres.
      </p>

      <h3>SQL Style Guides</h3>
      <p>
        Several well-known SQL style guides provide comprehensive conventions:
      </p>
      <ul>
        <li><strong>GitLab SQL Style Guide</strong> — lowercase keywords, underscored identifiers, explicit joins, no abbreviations. Used internally at GitLab and publicly documented.</li>
        <li><strong>Mazur SQL Style Guide</strong> — lowercase keywords, trailing commas, CTEs over subqueries. Popular in the analytics/dbt community.</li>
        <li><strong>Joe Celko's SQL for Smarties</strong> — uppercase keywords, right-aligned style, very strict. Traditional DBA perspective.</li>
        <li><strong>dbt Labs style</strong> — lowercase keywords, CTEs preferred, consistent with Mazur. Used by most dbt-based data teams.</li>
      </ul>
      <p>
        For data engineering and analytics teams using dbt, the dbt/Mazur style (lowercase keywords, CTEs everywhere, trailing commas) has become a de facto standard. For application developers writing SQL in backend code, GitLab's guide or your team's own documented conventions work well.
      </p>

      <h3>SQL Linting and Formatting in CI</h3>
      <p>
        To enforce SQL style automatically:
      </p>
      <ul>
        <li><strong>SQLFluff</strong> — the most capable SQL linter and formatter. Supports multiple dialects, configurable rules, and CI integration. Install with <code>pip install sqlfluff</code>; run with <code>sqlfluff fix .</code>.</li>
        <li><strong>sqlfmt</strong> — a formatting-only tool (no linting) in the dbt style. Opinionated and fast. Install with <code>pip install shandy-sqlfmt</code>.</li>
        <li><strong>pgFormatter</strong> — a Perl-based formatter for PostgreSQL SQL with many options. Available as a VS Code extension.</li>
        <li><strong>prettier-plugin-sql</strong> — adds SQL formatting to Prettier, the JavaScript/TypeScript formatter. Useful if your codebase already uses Prettier.</li>
      </ul>
    </div>
  );
}
