import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is the best locator strategy for Playwright?',
    a: 'Playwright recommends this priority order: (1) getByRole — uses ARIA role + accessible name, survives most UI refactors; (2) getByLabel — ideal for form fields linked to a label element; (3) getByPlaceholder — fallback for inputs without labels; (4) getByText — for visible text in buttons and links; (5) getByTestId — explicit test attribute, requires adding data-testid to your markup; (6) locator() with CSS/XPath — last resort. The top three strategies are resilient because they reflect how users perceive the UI rather than its DOM structure.',
  },
  {
    q: 'When should I use data-testid instead of getByRole?',
    a: 'Use data-testid when: (1) the element has no meaningful ARIA role or accessible name; (2) you have multiple identical elements (e.g., three identical "Delete" buttons in a list) and need to target a specific one by its position or context; (3) your markup changes frequently and you want an explicit, stable anchor that test engineers control. For most interactive elements — buttons, links, form fields — getByRole or getByLabel is preferred because it doubles as an accessibility audit: if the locator breaks, it usually means your markup lost its accessible name too.',
  },
  {
    q: 'How do I add stable selectors to my React or Vue components?',
    a: 'The simplest approach is to add data-testid attributes to key interactive elements: <button data-testid="submit-order">Place order</button>. For React you can pass testId as a prop from your design system. For Vue, use :data-testid="testId" in the template. In a monorepo, keep testId values kebab-case and scoped to the feature (e.g., "checkout-submit-btn") to avoid collisions. Avoid using auto-generated IDs from CSS-in-JS libraries as selectors — they change on every build.',
  },
  {
    q: 'What is the difference between CSS selectors and XPath?',
    a: 'CSS selectors traverse the DOM top-down and cannot select parent elements — they only move forward in the document. XPath is an expression language that can traverse in any direction: parent, ancestor, sibling, and can filter by text content natively (//button[contains(., "Submit")]). CSS selectors are faster in browsers because the engine is heavily optimised for them. XPath is more powerful for complex relationships but less readable. In Playwright and Cypress, CSS selectors are preferred for performance and readability; XPath is useful for legacy test suites or when you need to select by text in a context where getByText is not available.',
  },
  {
    q: 'Why does the generator show a "Fragile" warning on the full CSS path?',
    a: 'A full structural path like form > div:nth-of-type(2) > input encodes the exact position of the element in the DOM tree. Any change to the surrounding layout — adding a new wrapper div, reordering sections, or inserting a component above the target — silently breaks the selector without changing the element itself. The element still exists and still works, but your test can no longer find it. Use structural paths only as a last resort when no attribute-based selector exists.',
  },
  {
    q: 'Can I use this tool for dynamically generated elements?',
    a: 'Yes — paste the HTML that the page renders at the time you want to test it. Open DevTools → Elements, right-click the element, Copy → Copy outerHTML, then paste it here. If the element is rendered by JavaScript after a user action (click, API response), capture the HTML after that action. The tool generates selectors based on the attributes present in the pasted HTML; if your app generates elements with dynamic IDs or random class names, those will appear as "Fragile" — the recommendation is to add a data-testid to the component that renders that element.',
  },
  {
    q: 'What is aria-label and why does Playwright prefer it?',
    a: 'aria-label is an HTML attribute that provides a text label for an element that screen readers announce to users. Playwright\'s getByRole and getByLabel both use it to identify elements — an <input aria-label="Search products" /> is found by page.getByRole("textbox", { name: "Search products" }). Preferring ARIA attributes as selectors has a useful side effect: if your test can\'t find an element, it often means the element is also invisible to screen reader users, which is an accessibility bug. Writing tests this way makes your test suite a lightweight accessibility checker.',
  },
  {
    q: 'Is the HTML I paste sent to a server?',
    a: 'No. The entire tool runs in your browser using JavaScript\'s built-in DOMParser API. Your HTML never leaves your device — there are no server requests, no logging, and no analytics on the content you paste. You can verify this by opening DevTools → Network while using the tool. The tool also works fully offline once the page is loaded.',
  },
];

export const sidebarInfo = [
  { label: 'Frameworks',     value: 'Playwright · Cypress' },
  { label: 'Selector types', value: 'CSS · XPath · ARIA'   },
  { label: 'Quality rating', value: 'Best → Good → OK → Fragile' },
  { label: 'Privacy',        value: '100% local — no server' },
];
