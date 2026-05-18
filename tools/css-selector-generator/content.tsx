export default function CssSelectorGeneratorContent() {
  return (
    <div className="tool-content">
      <h2>Playwright, Cypress, Selenium, and CSS Selector Strategies Compared</h2>
      <p>
        The selector you choose is the single biggest factor in how often your tests break on legitimate UI changes. A test that fails because a developer renamed a CSS class is a false positive — it costs time, erodes trust in the test suite, and eventually gets deleted. A test that fails because the "Submit" button disappeared from the page is a true positive — exactly what automation is for.
      </p>
      <p>
        This tool generates selectors from your actual HTML and rates each one by resilience. Paste a snippet, click an element, and get ranked selectors for Playwright, Cypress, Selenium, CSS, and XPath — each labelled <strong>Best</strong>, <strong>Good</strong>, <strong>OK</strong>, or <strong>Fragile</strong> with a plain-English reason.
      </p>

      <h2>Playwright Locator Priority — From Most to Least Resilient</h2>
      <p>
        Playwright's official documentation defines a locator priority. Every locator lower on the list breaks more often in practice:
      </p>
      <table>
        <thead>
          <tr>
            <th>Locator</th>
            <th>Example</th>
            <th>Resilience</th>
            <th>Best for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>getByRole()</code></td>
            <td><code>page.getByRole('button', {'{ name: \'Submit\' }'})</code></td>
            <td><strong>Best</strong></td>
            <td>Any interactive element — buttons, links, inputs, checkboxes</td>
          </tr>
          <tr>
            <td><code>getByLabel()</code></td>
            <td><code>page.getByLabel('Email address')</code></td>
            <td><strong>Best</strong></td>
            <td>Form fields with associated <code>&lt;label&gt;</code> elements</td>
          </tr>
          <tr>
            <td><code>getByPlaceholder()</code></td>
            <td><code>page.getByPlaceholder('Enter email')</code></td>
            <td>Good</td>
            <td>Inputs without labels; breaks if placeholder text is localized</td>
          </tr>
          <tr>
            <td><code>getByText()</code></td>
            <td><code>page.getByText('Forgot password?')</code></td>
            <td>Good</td>
            <td>Static visible text in links, labels, paragraphs</td>
          </tr>
          <tr>
            <td><code>getByAltText()</code></td>
            <td><code>page.getByAltText('Company logo')</code></td>
            <td>Good</td>
            <td>Images; alt text changes rarely</td>
          </tr>
          <tr>
            <td><code>getByTestId()</code></td>
            <td><code>page.getByTestId('login-btn')</code></td>
            <td><strong>Best</strong></td>
            <td>When role/label is ambiguous; requires adding <code>data-testid</code></td>
          </tr>
          <tr>
            <td><code>locator(css)</code></td>
            <td><code>page.locator('#submit-btn')</code></td>
            <td>Good (id) / OK (class)</td>
            <td>IDs are reliable; class selectors break when styles change</td>
          </tr>
          <tr>
            <td><code>locator(xpath)</code></td>
            <td><code>page.locator('//button[1]')</code></td>
            <td>Fragile</td>
            <td>Last resort; structural paths break on layout changes</td>
          </tr>
        </tbody>
      </table>

      <h2>How to Add data-testid to Your Components</h2>
      <p>
        The fastest way to make your markup testable is to add <code>data-testid</code> to interactive elements. Name them in <code>kebab-case</code>, scoped to the feature:
      </p>
      <pre><code>{`<!-- HTML -->
<button data-testid="checkout-place-order">Place order</button>

<!-- React -->
<Button data-testid="checkout-place-order">Place order</Button>

<!-- Vue -->
<button :data-testid="testId">Place order</button>

<!-- Playwright -->
await page.getByTestId('checkout-place-order').click();

<!-- Cypress -->
cy.get('[data-testid="checkout-place-order"]').click();`}</code></pre>
      <p>
        Keep a naming convention: <code>{'{feature}-{element}-{role}'}</code>. This prevents two teams independently creating <code>data-testid="submit"</code> on different forms in the same page. If you use a component library, add testId as a prop passed through to the root element.
      </p>

      <h2>CSS Selector Quality — What Makes a Selector Stable</h2>
      <p>
        Not all CSS selectors are equal. Their resilience depends on how likely the targeted attribute is to change when a developer touches the component:
      </p>
      <table>
        <thead>
          <tr>
            <th>Selector type</th>
            <th>Example</th>
            <th>Why it breaks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>data-testid</code></td>
            <td><code>[data-testid="email-input"]</code></td>
            <td>Never — dedicated test attribute, only changes intentionally</td>
          </tr>
          <tr>
            <td><code>id</code></td>
            <td><code>#email</code></td>
            <td>Rarely — IDs change when feature is renamed or refactored</td>
          </tr>
          <tr>
            <td><code>aria-label</code></td>
            <td><code>[aria-label="Search"]</code></td>
            <td>Rarely — accessibility attribute, treated seriously by teams</td>
          </tr>
          <tr>
            <td><code>name</code></td>
            <td><code>input[name="email"]</code></td>
            <td>Occasionally — form name changes when API schema changes</td>
          </tr>
          <tr>
            <td>Semantic class</td>
            <td><code>button.btn-primary</code></td>
            <td>Frequently — class names change with design system updates</td>
          </tr>
          <tr>
            <td>Utility class</td>
            <td><code>button.flex.items-center</code></td>
            <td>Very often — Tailwind/utility classes are layout-only, not identity</td>
          </tr>
          <tr>
            <td>Structural path</td>
            <td><code>form &gt; div:nth-of-type(2) &gt; input</code></td>
            <td>Any layout change — adding a wrapper div breaks it silently</td>
          </tr>
        </tbody>
      </table>

      <h2>XPath — When to Use It and When to Avoid It</h2>
      <p>
        XPath is more powerful than CSS but less readable and slower to execute. Use it only when CSS cannot express the relationship you need:
      </p>
      <ul>
        <li><strong>Parent selection:</strong> XPath can find a parent — <code>//label[contains(., 'Email')]/..</code> selects the container of a label. CSS has no parent selector.</li>
        <li><strong>Text anywhere in subtree:</strong> <code>//button[contains(., 'Submit')]</code> matches a button whose text is nested inside a <code>&lt;span&gt;</code>. CSS <code>:has()</code> is an alternative but has limited browser support in older test runners.</li>
        <li><strong>Attribute value matching:</strong> <code>//input[starts-with(@id, 'user-')]</code> matches dynamic IDs with a known prefix.</li>
      </ul>
      <p>
        Avoid absolute XPath like <code>/html/body/div[1]/form/div[2]/input</code> — it encodes the full DOM structure and breaks on any layout change. Use relative XPath starting with <code>//</code> and filter by attribute whenever possible.
      </p>

      <h2>Cypress Best Practices for Selectors</h2>
      <p>
        Cypress's official testing practices mirror Playwright's: prefer attributes that survive refactoring over structural paths. The Cypress team recommends <code>data-cy</code> or <code>data-testid</code> as explicit test hooks:
      </p>
      <pre><code>{`// Best — dedicated attribute
cy.get('[data-testid="login-btn"]').click();

// Good — ID selector
cy.get('#login-btn').click();

// Good — text match with tag narrowing
cy.contains('button', 'Sign in').click();

// OK — class selector (breaks if styles change)
cy.get('.btn-primary').click();

// Avoid — structural nth-child
cy.get('form > div:nth-child(3) > button').click();`}</code></pre>
      <p>
        The <code>cy.contains(tag, text)</code> form is more reliable than bare <code>cy.contains(text)</code> because it narrows the match to a specific element type, preventing false matches on other text nodes in the page.
      </p>

      <h2>ARIA Roles and Accessible Names — Why They Matter for Tests</h2>
      <p>
        When Playwright's <code>getByRole('button', {'{ name: \'Sign in\' }'})</code> fails to find an element, it usually means one of three things: the element is genuinely missing, the element lost its accessible name (a bug), or the element's ARIA role is wrong (also a bug). This is the key advantage of role-based locators — they make your test suite a passive accessibility audit.
      </p>
      <p>
        Every HTML element has an implicit ARIA role. Interactive elements have these defaults:
      </p>
      <table>
        <thead>
          <tr><th>HTML element</th><th>Implicit role</th><th>Name source</th></tr>
        </thead>
        <tbody>
          <tr><td><code>&lt;button&gt;</code></td><td>button</td><td>Text content or aria-label</td></tr>
          <tr><td><code>&lt;a href&gt;</code></td><td>link</td><td>Text content or aria-label</td></tr>
          <tr><td><code>&lt;input type="text"&gt;</code></td><td>textbox</td><td>Associated label or aria-label</td></tr>
          <tr><td><code>&lt;input type="checkbox"&gt;</code></td><td>checkbox</td><td>Associated label or aria-label</td></tr>
          <tr><td><code>&lt;select&gt;</code></td><td>combobox</td><td>Associated label or aria-label</td></tr>
          <tr><td><code>&lt;img&gt;</code></td><td>img</td><td>alt attribute</td></tr>
          <tr><td><code>&lt;nav&gt;</code></td><td>navigation</td><td>aria-label</td></tr>
          <tr><td><code>&lt;h1&gt;–&lt;h6&gt;</code></td><td>heading</td><td>Text content</td></tr>
        </tbody>
      </table>

      <h2>Workflow: From DevTools to Test</h2>
      <ol>
        <li>Open your application and navigate to the page under test.</li>
        <li>Open DevTools (F12 → Elements), right-click the element you want to test, and choose <strong>Copy → Copy outerHTML</strong>.</li>
        <li>Paste the HTML into the input above and click <strong>Parse HTML</strong>.</li>
        <li>Click the target element in the tree. Switch between Playwright, Cypress, Selenium, CSS, and XPath tabs to see all available selectors.</li>
        <li>Pick a <strong>Best</strong>-rated option if one exists. If not, use a <strong>Good</strong>-rated selector and consider adding a <code>data-testid</code> to the component to get a Best-rated selector in the future.</li>
        <li>Click <strong>Copy</strong> and paste directly into your test file.</li>
      </ol>
    </div>
  );
}
