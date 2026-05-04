export default function HtmlBeautifierContent() {
  return (
    <div className="tool-content">
      <h2>HTML Beautifier: Reading and Reformatting HTML Markup</h2>
      <p>
        HTML beautification is the process of taking compressed, inconsistently indented, or machine-generated HTML and reformatting it with clean, depth-based indentation that makes the document's structure immediately readable. Minified HTML is optimal for production delivery — it transfers faster and reduces Time to First Byte — but it is nearly impossible to read or debug. The HTML Beautifier converts it back into a structured, human-readable form in one step.
      </p>

      <h3>When You Need to Beautify HTML</h3>
      <p>
        The need to reformat HTML arises in several common developer scenarios:
      </p>
      <ul>
        <li><strong>CMS and framework output</strong> — content management systems, static site generators, and server-side frameworks often produce minified HTML in production. When debugging a rendering issue, reading the raw response is much easier after formatting.</li>
        <li><strong>Third-party widgets and embeds</strong> — chat widgets, analytics dashboards, and marketing tools inject minified HTML into your page. Beautifying the injected markup helps you understand what they're adding and why it might conflict with your styles.</li>
        <li><strong>Email templates</strong> — HTML email clients receive minified templates. Reformatting them makes it possible to trace which table cell corresponds to which visual element and to identify deliverability issues.</li>
        <li><strong>API responses and scraped content</strong> — some APIs return HTML fragments or full pages. Beautifying the response makes it possible to identify the data you need and write accurate selectors.</li>
        <li><strong>Inherited codebases</strong> — templates committed without formatting, or formatted with a different style guide, benefit from a clean reformat before editing.</li>
      </ul>

      <h3>Block vs Inline Elements: The Core Distinction</h3>
      <p>
        The most important decision an HTML formatter makes is whether to place each element on its own line or keep it inline with adjacent content. This decision is not arbitrary — it follows the HTML specification's block/inline model.
      </p>
      <p>
        <strong>Block elements</strong> are elements that the browser renders in their own layout box: <code>div</code>, <code>section</code>, <code>article</code>, <code>aside</code>, <code>header</code>, <code>footer</code>, <code>main</code>, <code>nav</code>, <code>p</code>, <code>ul</code>, <code>ol</code>, <code>li</code>, <code>table</code>, <code>tr</code>, <code>td</code>, <code>th</code>, all heading levels (<code>h1</code>–<code>h6</code>), <code>form</code>, <code>fieldset</code>, <code>blockquote</code>, <code>pre</code>, <code>figure</code>, and more. Placing these on their own lines with indentation makes the document's structural hierarchy visible at a glance.
      </p>
      <p>
        <strong>Inline elements</strong> are elements that flow within text: <code>a</code>, <code>span</code>, <code>strong</code>, <code>em</code>, <code>b</code>, <code>i</code>, <code>code</code>, <code>kbd</code>, <code>abbr</code>, <code>cite</code>, <code>time</code>, <code>mark</code>, <code>label</code>, <code>img</code>, <code>input</code>, <code>button</code>. Placing these on new lines would introduce whitespace text nodes between them and adjacent text, which the browser renders as visible spaces. A link moved to its own line would appear with a space before and after it in rendered output.
      </p>
      <pre><code>{`<!-- Breaking an inline element onto its own line changes rendered output -->
<!-- Before beautification (correct rendering): -->
<p>Visit <a href="/docs">documentation</a> for details.</p>

<!-- Incorrect beautification (adds unwanted spaces): -->
<p>
  Visit
  <a href="/docs">documentation</a>
  for details.
</p>

<!-- Correct beautification (inline stays inline): -->
<p>Visit <a href="/docs">documentation</a> for details.</p>`}</code></pre>

      <h3>Indentation Styles</h3>
      <p>
        The beautifier supports three indentation styles, matching the conventions used by different teams and tools:
      </p>
      <ul>
        <li><strong>2 spaces</strong> — the default for most web projects and frameworks. Used by Prettier (the most widely adopted code formatter), Google's HTML style guide, and the majority of open-source front-end codebases. Minimises indentation depth for deeply nested HTML.</li>
        <li><strong>4 spaces</strong> — common in teams that use four-space indentation across all languages. Provides more visual separation between indent levels at the cost of wider lines in deep nesting.</li>
        <li><strong>Tabs</strong> — preferred by developers who configure their editor's tab width individually. A team using tabs can each view the same file with their preferred visual indent width (2 for compact display, 4 for traditional, 8 for maximum separation). Tabs also compress better — a 16-space indent (four levels × four spaces) is one byte as a tab.</li>
      </ul>
      <p>
        If you are reformatting HTML to commit to a repository, use whichever style is enforced by your project's EditorConfig or Prettier configuration.
      </p>

      <h3>Script and Style Blocks</h3>
      <p>
        Embedded <code>{'<script>'}</code> and <code>{'<style>'}</code> blocks contain JavaScript and CSS respectively. The HTML beautifier treats their content as raw text and indents each non-empty line to the current nesting depth, which gives a rough structural alignment with the surrounding HTML. The content itself is not parsed or reformatted as code.
      </p>
      <p>
        For full formatting of embedded scripts and styles, copy their content into the dedicated tools: the JavaScript Minifier (beautify mode) for JavaScript, and the CSS Minifier (beautify mode) for CSS. You can then paste the formatted content back into the appropriate block.
      </p>

      <h3>HTML Validation vs Beautification</h3>
      <p>
        Beautification is a purely cosmetic operation — it changes indentation and line breaks without modifying the document's content or structure. It does not validate your HTML, fix broken markup, or correct nesting errors. A document with unclosed tags, duplicate IDs, or invalid element nesting will be reformatted with the same errors present.
      </p>
      <p>
        If you suspect structural errors in your HTML, use the W3C Markup Validation Service at validator.w3.org. For accessibility issues (missing alt attributes, heading level skips, unlabelled form controls), use the axe DevTools browser extension or the accessibility audit in Chrome DevTools Lighthouse.
      </p>

      <h3>Prettierrc and Editor Formatting</h3>
      <p>
        If your goal is to establish consistent HTML formatting across a project rather than a one-off reformat, the right tool is Prettier with a <code>.prettierrc</code> configuration file. Prettier integrates with VS Code, WebStorm, and most other editors via extensions, and can be run as a pre-commit hook via lint-staged.
      </p>
      <pre><code>{`// .prettierrc
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "htmlWhitespaceSensitivity": "css"
}`}</code></pre>
      <p>
        The <code>htmlWhitespaceSensitivity</code> option controls how Prettier handles inline element whitespace — the same block vs inline distinction described above. The <code>"css"</code> value (default) uses the element's CSS <code>display</code> property to determine whether it is block or inline, which is the most accurate approach.
      </p>

      <h3>Reading Minified HTML from DevTools</h3>
      <p>
        When inspecting a page in Chrome DevTools, the Elements panel always shows formatted HTML regardless of what was delivered over the network — the browser's DOM representation is always structured. If you want to see the raw HTML as delivered, use the Network panel, find the document request, and click the Response tab. That response is often minified. Paste it into this beautifier to read it with the same structural clarity as the Elements panel.
      </p>
      <p>
        The Source panel in DevTools also shows the raw HTML source. Right-click the page → View Page Source for a new tab with the unformatted response, which you can then paste directly into the beautifier.
      </p>

      <h3>HTML Formatting in Build Pipelines</h3>
      <p>
        Consistent HTML formatting in a team context is best enforced automatically rather than manually:
      </p>
      <ul>
        <li><strong>Prettier with lint-staged</strong> — run <code>prettier --write '**/*.html'</code> as a pre-commit hook on staged files using lint-staged and Husky. Every committed HTML file is formatted according to the project's Prettier configuration.</li>
        <li><strong>EditorConfig</strong> — an <code>.editorconfig</code> file at the repository root sets indent style, indent size, line endings, and trailing newline behaviour for all file types including HTML. Most editors respect EditorConfig without plugins.</li>
        <li><strong>CI formatting check</strong> — run <code>prettier --check .</code> in CI to fail the build if any file is not formatted. This enforces the standard without requiring developers to remember to format before pushing.</li>
      </ul>
    </div>
  );
}