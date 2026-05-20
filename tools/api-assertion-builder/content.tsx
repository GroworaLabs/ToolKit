export default function ApiAssertionBuilderContent() {
  return (
    <div className="tool-content">
      <h2>What the API Assertion Builder Generates</h2>
      <p>
        Manual API testing usually ends with a few <code>console.log</code> calls and a visual inspection of the response. That approach misses the point of automated testing: a test that checks nothing cannot tell you when the API regresses. This tool turns any JSON response body into a ready-to-use assertion block for four testing frameworks — in the mode that fits your use case.
      </p>
      <table>
        <thead>
          <tr>
            <th>Assertion mode</th>
            <th>What it checks</th>
            <th>Best for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Exact values</strong></td>
            <td>The precise value of every field — <code>"Alice"</code>, <code>25</code>, <code>true</code></td>
            <td>Known fixture data, deterministic responses, snapshot regression</td>
          </tr>
          <tr>
            <td><strong>Type-safe</strong></td>
            <td>The type of every field — <code>String</code>, <code>Number</code>, <code>Boolean</code></td>
            <td>Dynamic data (user IDs, timestamps, random tokens) that changes between runs</td>
          </tr>
          <tr>
            <td><strong>Schema only</strong></td>
            <td>A single <code>toMatchObject</code> block with expected structure</td>
            <td>Contract testing, checking shape without caring about values</td>
          </tr>
        </tbody>
      </table>

      <h2>Framework Reference</h2>

      <h3>Jest — Fetch or Axios</h3>
      <p>
        Jest is the standard test runner for Node.js and React applications. The generated assertions use <code>expect(data.field).toBe(value)</code> syntax and work with both <code>fetch</code> and <code>axios</code>:
      </p>
      <pre><code>{`it('returns valid user', async () => {
  const response = await fetch('/api/users/123');
  const data = await response.json();

  // paste generated assertions here
  expect(response.status).toBe(200);
  expect(data.id).toBe("usr_01HXQR2A");
  expect(data.name).toBe("Alice");
  expect(data.verified).toBe(true);
});`}</code></pre>

      <h3>Playwright — APIRequestContext</h3>
      <p>
        Playwright's <code>APIRequestContext</code> makes HTTP requests from within a Playwright test. This lets you test the API layer and the browser UI in the same test suite, sharing authentication state between API setup calls and browser interactions:
      </p>
      <pre><code>{`test('API returns valid user', async ({ request }) => {
  const response = await request.get('/api/users/123');

  // paste generated assertions here
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');

  const data = await response.json();
  expect(data.name).toBe("Alice");
});`}</code></pre>

      <h3>pytest — Requests Library</h3>
      <p>
        For Python backends, the <code>requests</code> library is the standard HTTP client for tests. The generated assertions use plain <code>assert</code> statements compatible with pytest's output formatting and failure messages:
      </p>
      <pre><code>{`import requests

def test_user_endpoint():
    response = requests.get("http://localhost:8000/api/users/123")
    data = response.json()

    # paste generated assertions here
    assert response.status_code == 200
    assert "application/json" in response.headers.get("content-type", "")
    assert data["name"] == "Alice"
    assert isinstance(data["score"], float)`}</code></pre>

      <h3>Supertest — Express Integration</h3>
      <p>
        Supertest wraps an Express app for in-process HTTP testing — no server port needed. It pairs with Jest for assertions on the response body:
      </p>
      <pre><code>{`const request = require('supertest');
const app = require('../src/app');

it('returns valid user', async () => {
  const response = await request(app)
    .get('/api/users/123')
    .expect(200)
    .expect('Content-Type', /json/);

  const data = response.body;
  // paste generated assertions here
  expect(data.name).toBe("Alice");
});`}</code></pre>

      <h3>RestAssured — Java / Spring Boot</h3>
      <p>
        RestAssured is the standard REST testing library for Java. It is widely used in Spring Boot projects alongside JUnit 5, and is the natural choice for teams that also use Selenium WebDriver for browser automation — both libraries share the same Maven/Gradle dependency chain and test runner. The generated assertions use RestAssured's fluent BDD API with Hamcrest matchers:
      </p>
      <pre><code>{`import io.restassured.RestAssured;
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

@Test
void returnsValidUser() {
    given()
    .when()
      .get("/api/users/123")
    .then()
      .statusCode(200)
      .contentType("application/json")
      .body("name", equalTo("Alice"))
      .body("verified", equalTo(true))
      .body("score", equalTo(4.8f))
      .body("tags", hasSize(2))
      .body("address.city", equalTo("Berlin"));
}`}</code></pre>
      <p>
        Add these dependencies to your <code>pom.xml</code> or <code>build.gradle</code> to use RestAssured:
      </p>
      <pre><code>{`<!-- Maven -->
<dependency>
  <groupId>io.rest-assured</groupId>
  <artifactId>rest-assured</artifactId>
  <version>5.5.0</version>
  <scope>test</scope>
</dependency>

// Gradle
testImplementation 'io.rest-assured:rest-assured:5.5.0'`}</code></pre>

      <h2>Assertion Depth: When to Use Each Mode</h2>
      <p>
        The right mode depends on what the API is returning and what you are trying to verify.
      </p>
      <p>
        Use <strong>Exact values</strong> when testing against seeded fixture data — a user with a known ID and known fields. These assertions are the most specific and catch the most regressions, but they require the response data to be deterministic.
      </p>
      <p>
        Use <strong>Type-safe</strong> when the response contains dynamic values — UUIDs generated at runtime, timestamps, incrementing counters, or any field whose value legitimately changes between test runs. Type assertions verify that the field exists and has the right type without breaking on different values.
      </p>
      <p>
        Use <strong>Schema only</strong> for contract tests — tests that verify the API adheres to its documented interface without testing specific business logic. A <code>toMatchObject</code> schema test is stable across data changes and appropriate for integration tests between microservices.
      </p>

      <h2>Testing Patterns for Common Response Shapes</h2>

      <h3>Paginated list responses</h3>
      <pre><code>{`// Typical pagination envelope
{
  "data": [{ "id": "1", "name": "Alice" }, { "id": "2", "name": "Bob" }],
  "total": 42,
  "page": 1,
  "perPage": 20
}

// Generated assertions (Exact mode)
expect(data.total).toBe(42);
expect(data.page).toBe(1);
expect(data.data).toHaveLength(2);`}</code></pre>

      <h3>Error responses</h3>
      <pre><code>{`// Paste the error body and set status to 400 or 422
{
  "error": "Validation failed",
  "details": [
    { "field": "email", "message": "must be a valid email" }
  ]
}

// Generated assertions
expect(response.status).toBe(422);
expect(data.error).toBe("Validation failed");
expect(data.details).toHaveLength(1);`}</code></pre>

      <h3>Empty responses</h3>
      <p>
        For endpoints that return <code>204 No Content</code> or an empty body, set the status code to 204 and leave the JSON input empty. The tool will generate only the status assertion without any body checks.
      </p>

      <h2>Integrating with CI/CD</h2>
      <p>
        API tests generated with this tool can run as part of any CI pipeline. A minimal GitHub Actions workflow for Jest + Supertest:
      </p>
      <pre><code>{`# .github/workflows/test.yml
name: API Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm test`}</code></pre>
      <p>
        For Playwright API tests, the <code>playwright/test</code> runner handles parallel execution and retries automatically. Run with <code>npx playwright test --project=api</code> to target only the API test project defined in your Playwright config.
      </p>

      <h2>Privacy</h2>
      <p>
        All JSON parsing and assertion generation runs entirely in your browser. The response body you paste — which may contain personally identifiable data from development or staging environments — is never sent to any server. The tool works fully offline after the page loads.
      </p>
    </div>
  );
}
