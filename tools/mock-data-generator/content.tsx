export default function MockDataGeneratorContent() {
  return (
    <div className="tool-content">
      <h2>Mock Data Generation: Why It Matters and How to Use It</h2>
      <p>
        Realistic test data is one of the most undervalued assets in software development. Developers frequently test with trivial datasets — one user named "Test User" with email "test@test.com" — that fail to surface real bugs. Production data is too sensitive to use in development, and developers rarely have time to hand-craft representative datasets. Mock data generators fill this gap: they produce plausible, diverse, and privacy-safe data that exercises code paths which trivial test data misses.
      </p>

      <h3>Why Realistic Mock Data Matters</h3>
      <p>
        Several categories of bugs only appear with realistic data:
      </p>
      <ul>
        <li><strong>Encoding and character set bugs:</strong> A name field that always contains "Alice Smith" will never reveal that your app crashes on "José García" or "王小明". Realistic names from diverse cultures surface encoding bugs in UTF-8 handling, database collation, and string truncation.</li>
        <li><strong>Layout bugs:</strong> Short names never reveal that a 40-character company name overflows a UI card. Realistic variation in string lengths exposes layout issues early.</li>
        <li><strong>Edge cases in sorting and pagination:</strong> A dataset of 3 users never reveals that your pagination breaks at 100 results, or that sorting by name is case-sensitive when it shouldn't be.</li>
        <li><strong>Performance regressions:</strong> Loading 10 test records is fast even if your query is O(n²). Load 10 000 mock records and a poorly-indexed query becomes immediately obvious.</li>
        <li><strong>Validation bugs:</strong> Test data that always matches the happy path never reveals that your email validator rejects valid plus-addressing (user+tag@example.com) or your phone validator fails on international formats.</li>
      </ul>

      <h3>Generated Field Types Explained</h3>
      <p>
        <strong>UUID v4:</strong> Randomly generated universally unique identifiers in the format <code>xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code>. The <code>4</code> in position 13 indicates version 4 (random). These are appropriate for use as primary keys in distributed systems where auto-increment integers would cause conflicts between nodes. Generated using the Web Crypto API for cryptographic randomness.
      </p>
      <p>
        <strong>Email addresses:</strong> Generated emails use realistic first/last name combinations paired with fictional domains (<code>example.com</code>, <code>test.dev</code>, <code>sample.org</code>). These domains either don't have real mailboxes or are explicitly reserved for documentation purposes, so there is no risk of accidentally emailing real people. Plus-addressing and subaddressing are not included by default to avoid triggering validation edge cases — add them manually if you want to test those paths.
      </p>
      <p>
        <strong>Phone numbers:</strong> Generated in a US format (+1-NXX-NXX-XXXX). If your application handles international numbers, you may want to add country codes and vary the format. Common international formats to test: UK (+44 7700 900xxx), German (+49 30 12345678), Australian (+61 4xx xxx xxx).
      </p>
      <p>
        <strong>Dates (ISO 8601):</strong> Generated as <code>YYYY-MM-DD</code> strings covering a 10-year range backwards from today. If your application uses Unix timestamps, full ISO 8601 datetime strings, or locale-formatted dates, adjust the format in your seeding script.
      </p>
      <p>
        <strong>IP addresses (IPv4):</strong> Generated as dotted-decimal notation in the valid public range. Useful for testing audit logs, access control, geolocation lookups, and rate limiting code. For IPv6 testing, you'll need to generate those separately — the format is significantly different (eight colon-separated groups of four hex digits, with possible double-colon compression for zero runs).
      </p>
      <p>
        <strong>Boolean values:</strong> Random 50/50 true/false. If your application logic depends on a certain ratio of active vs. inactive users (for example), generate two separate datasets and combine them, or post-process to set a specific ratio.
      </p>

      <h3>Generating Mock Data Programmatically</h3>
      <p>
        For larger datasets or CI integration, programmatic generation is more practical than a browser tool. The leading library in the JavaScript/TypeScript ecosystem is <strong>Faker.js</strong> (formerly faker.js, now <code>@faker-js/faker</code> on npm):
      </p>
      <pre><code>{`import { faker } from '@faker-js/faker';

function generateUser() {
  return {
    id:        faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName:  faker.person.lastName(),
    email:     faker.internet.email(),
    phone:     faker.phone.number(),
    company:   faker.company.name(),
    jobTitle:  faker.person.jobTitle(),
    city:      faker.location.city(),
    country:   faker.location.country(),
    createdAt: faker.date.past({ years: 2 }).toISOString(),
  };
}

// Generate 1000 users
const users = faker.helpers.multiple(generateUser, { count: 1000 });
console.log(JSON.stringify(users, null, 2));`}</code></pre>
      <p>
        Faker.js supports seeded generation for reproducible datasets:
      </p>
      <pre><code>{`faker.seed(42); // same seed → same data every run
const user = generateUser(); // deterministic output`}</code></pre>
      <p>
        For Python projects, the equivalent library is <strong>Faker</strong>:
      </p>
      <pre><code>{`from faker import Faker
import json

fake = Faker()
Faker.seed(42)  # reproducible

users = [
    {
        "id":         str(fake.uuid4()),
        "first_name": fake.first_name(),
        "last_name":  fake.last_name(),
        "email":      fake.email(),
        "phone":      fake.phone_number(),
        "company":    fake.company(),
        "city":       fake.city(),
        "country":    fake.country(),
        "created_at": fake.date_time_this_decade().isoformat(),
    }
    for _ in range(1000)
]
print(json.dumps(users, indent=2))`}</code></pre>

      <h3>Database Seeding Strategies</h3>
      <p>
        <strong>Seed scripts in your repository:</strong> Keep a <code>scripts/seed.ts</code> (or <code>seed.py</code>) file that populates a development database with representative data. Run it as part of local setup (<code>npm run db:seed</code>). This ensures every developer starts with the same baseline data.
      </p>
      <p>
        <strong>Fixtures:</strong> Store small, curated datasets as JSON or CSV files in <code>test/fixtures/</code>. These are committed to version control and loaded by tests. Unlike randomly generated data, fixtures are deterministic — the same inputs produce the same test results. Use fixtures for unit and integration tests; use generated data for load testing and exploratory testing.
      </p>
      <p>
        <strong>Factory functions:</strong> Rather than seeding a database upfront, define factory functions that create records on demand during tests:
      </p>
      <pre><code>{`// TypeScript / Prisma example
import { faker } from '@faker-js/faker';
import { prisma } from '@/lib/db';

export async function createUser(overrides = {}) {
  return prisma.user.create({
    data: {
      email:    faker.internet.email(),
      name:     faker.person.fullName(),
      password: faker.internet.password({ length: 16 }),
      ...overrides, // allow test-specific values
    },
  });
}

// In a test:
const user = await createUser({ email: 'specific@example.com' });
const admin = await createUser({ role: 'admin' });`}</code></pre>
      <p>
        Factory functions are more flexible than static fixtures — each test creates exactly the data it needs, with only the relevant fields overridden. Libraries like <strong>fishery</strong> and <strong>factory-bot</strong> formalise this pattern.
      </p>

      <h3>Testing With Production-Like Data Volumes</h3>
      <p>
        Performance bugs rarely surface at development data volumes. A database query that returns 10 rows in 5ms might take 30 seconds when the table has 10 million rows and the index is missing or the query plan degrades.
      </p>
      <p>
        Generating large datasets efficiently:
      </p>
      <pre><code>{`-- PostgreSQL: generate_series for bulk inserts
INSERT INTO users (id, name, email, created_at)
SELECT
  gen_random_uuid(),
  'User ' || i,
  'user' || i || '@example.com',
  NOW() - (random() * INTERVAL '2 years')
FROM generate_series(1, 1000000) AS s(i);`}</code></pre>
      <pre><code>{`# Python: batch inserts for better performance
from faker import Faker
import psycopg2

fake = Faker()
conn = psycopg2.connect("postgresql://localhost/mydb")
cur = conn.cursor()

BATCH_SIZE = 1000
for batch in range(1000):  # 1 million rows total
    data = [
        (fake.name(), fake.email(), fake.date_time_this_decade())
        for _ in range(BATCH_SIZE)
    ]
    cur.executemany("INSERT INTO users (name, email, created_at) VALUES (%s, %s, %s)", data)
    conn.commit()
    print(f"Inserted {(batch+1) * BATCH_SIZE} rows")`}</code></pre>

      <h3>Privacy and GDPR Considerations</h3>
      <p>
        Using production data in development environments is a significant GDPR and privacy risk. Key requirements:
      </p>
      <ul>
        <li><strong>Data minimisation:</strong> Development environments should not have access to more personal data than necessary. Mock data satisfies this requirement entirely — no real personal data is processed.</li>
        <li><strong>Anonymisation vs. pseudonymisation:</strong> If you must use production data (for example, to reproduce a specific bug), anonymise it first. Replace real names and emails with generated values, but preserve the structure and relationships. This is pseudonymisation if the mapping is reversible; anonymisation if it is not.</li>
        <li><strong>Data residency:</strong> Mock data generated in the browser never leaves the browser — no GDPR concerns. This tool generates all data locally using JavaScript without any server communication.</li>
        <li><strong>Staging environments:</strong> Production data in staging is a common GDPR gap. Use the same mock data generation approach for staging as for local development. Staging should look like production in volume and structure, not in actual personal data.</li>
      </ul>

      <h3>Output Formats: JSON vs. CSV</h3>
      <p>
        <strong>JSON</strong> is best when: seeding APIs or databases directly, working with JavaScript/TypeScript code, or importing into document databases (MongoDB, Firestore, DynamoDB). JSON preserves types (numbers stay numbers, booleans stay booleans, null is distinct from empty string).
      </p>
      <p>
        <strong>CSV</strong> is best when: importing into SQL databases via COPY/LOAD DATA, opening in Excel or Google Sheets, passing to data analysis pipelines (Pandas, R), or sharing with non-developers. Note that CSV doesn't distinguish between types — everything is a string, and your import process must handle type conversion.
      </p>
      <p>
        Choosing the right format upfront saves a conversion step. If you're seeding a PostgreSQL table, generate CSV and use <code>COPY</code> for the fastest import. If you're writing a Jest seed script, generate JSON and parse it directly.
      </p>
    </div>
  );
}
