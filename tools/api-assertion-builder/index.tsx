import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is the difference between Exact, Type-safe, and Schema modes?',
    a: 'Exact mode generates assertions with literal values — expect(data.name).toBe("Alice"). Use this when testing against a known fixture response. Type-safe mode generates type assertions — expect(data.name).toEqual(expect.any(String)) — useful when the response values change between test runs (user IDs, timestamps, random tokens). Schema mode generates a single toMatchObject / toMatchSchema block that validates the overall shape without checking specific values — useful for contract testing.',
  },
  {
    q: 'Why does the tool generate a flat list of assertions instead of a single toMatchObject?',
    a: 'Flat assertions have two advantages over a single toMatchObject: they fail with a clear message identifying exactly which field is wrong ("Expected data.user.email to be ..."), and they let you comment out individual assertions without restructuring the whole object. Schema mode gives you the toMatchObject alternative if you prefer it.',
  },
  {
    q: 'Which framework should I use for testing Express.js APIs?',
    a: 'Use Supertest for integration testing Express apps — it lets you import the Express app directly and make requests without starting a real HTTP server. Use Jest for unit testing individual route handlers or middleware in isolation. For end-to-end testing of a deployed API, use Playwright\'s APIRequestContext — it works against any HTTP endpoint and integrates with the same test runner as your browser tests.',
  },
  {
    q: 'When should I use the RestAssured output?',
    a: 'RestAssured is the standard HTTP/REST testing library for Java. It is commonly used in Spring Boot projects alongside JUnit 5, and by teams who also use Selenium for browser automation and want a consistent testing stack. The generated output uses REST-assured\'s fluent BDD API with Hamcrest matchers — given().when().get("/endpoint").then().statusCode(200).body("field", equalTo("value")). Add rest-assured and hamcrest-all to your Maven or Gradle dependencies to use it.',
  },
  {
    q: 'How does this tool handle nested objects and arrays?',
    a: 'Nested objects are recursively flattened up to 4 levels deep. Each leaf value gets its own assertion line — expect(data.user.address.city).toBe("Berlin"). Arrays get a length assertion (expect(data.tags).toHaveLength(2)) but individual array elements are not individually asserted, because the order and content of dynamic arrays varies. For arrays of objects, Schema mode generates an arrayContaining check that validates the structure of array elements.',
  },
  {
    q: 'Should I assert the Content-Type header?',
    a: 'For Playwright and Supertest, yes — header assertions catch misconfigured API servers that return HTML error pages (which parse as plain text) instead of JSON. For Jest-based tests using fetch or axios, the Content-Type assertion is optional since you are calling response.json() which will throw if the body is not JSON.',
  },
  {
    q: 'How do I use the generated assertions in a real test file?',
    a: 'Copy the output and paste it inside a test block. For Jest: inside it("...", async () => { const response = await fetch(...); /* paste here */ }). For Playwright: inside test("...", async ({ request }) => { const response = await request.get(...); /* paste here */ }). For pytest: inside def test_api(): response = requests.get(...) /* paste here */. For Supertest: inside it("...", async () => { /* paste here */ }).',
  },
  {
    q: 'Can I test APIs that return arrays as the root response?',
    a: 'Yes. If the root JSON value is an array (e.g., [{"id": 1}, {"id": 2}]), the tool generates a length assertion and — in Schema mode — an arrayContaining assertion that validates the structure of the first element. Flat mode generates assertions against index 0 to show the expected shape of each item.',
  },
  {
    q: 'Is the JSON I paste sent to a server?',
    a: 'No. All parsing and assertion generation runs entirely in your browser using JavaScript. The JSON body never leaves your machine. You can verify this by opening DevTools → Network while using the tool — you will see no outbound requests. The tool works offline.',
  },
];

export const sidebarInfo = [
  { label: 'Frameworks', value: 'Jest · Playwright · pytest · Supertest · RestAssured' },
  { label: 'Assertion modes', value: 'Exact · Type-safe · Schema' },
  { label: 'Max depth',       value: '4 levels nested' },
  { label: 'Privacy',         value: '100% local — no server' },
];
