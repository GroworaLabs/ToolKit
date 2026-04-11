import { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'How does the text repeater work?',
    a: `The text repeater takes any string you provide and concatenates it N times with an optional separator between each repetition. It runs entirely in your browser — nothing is uploaded or sent to a server. As you type or change any setting, the output updates instantly. The separator is injected between each copy of your text, not after the last one, so repeating "Hello" three times with a comma separator produces "Hello, Hello, Hello" rather than "Hello, Hello, Hello,". The tool supports up to 1,000 repetitions at once, which can generate several megabytes of text if needed for bulk test data creation. Common use cases include generating test CSV rows, creating placeholder content for UI mockups, filling database tables with repeated values, and stress-testing text input fields. The tool works with any Unicode text including emojis, CJK characters, Arabic, and Cyrillic scripts.`,
  },
  {
    q: 'What separators can I choose and when should I use each?',
    a: `The tool offers six separator modes. "No separator" joins all copies without any gap — useful for repeating single characters or when you want dense output like "==========". "New line" places each repetition on its own line, which is ideal for generating line-based data, CSV rows, or any content destined for a text editor. "Space" joins with a single space — handy for repeated words in a sentence-like structure. "Comma" adds ", " between each copy so you can quickly build comma-separated lists from a single value. "Pipe" adds " | " and is great for Markdown tables or pipe-delimited data formats. "Custom" lets you enter any character sequence as the separator, including multi-character strings or even other words like " AND " or " OR " for logical expression generation. Choose based on the destination format: for SQL IN clauses use comma, for bash arrays use a space, for markdown cells use pipe.`,
  },
  {
    q: 'What is the maximum number of repetitions and is there a size limit?',
    a: `The tool allows between 1 and 1,000 repetitions. The practical limit is browser memory: repeating a 1,000-character string 1,000 times produces a 1 million character output, which is about 1 MB of text. Most modern browsers handle this without issue. Very large outputs — multiple megabytes — may cause the textarea to render slowly as the browser handles layout for a large amount of text. If you need to generate millions of repetitions for very large datasets, it is more efficient to write a short script in Python, JavaScript, or Bash rather than using a browser-based tool. For typical use cases — filling a form field, creating a short test dataset, building a placeholder string — even 1,000 repetitions is more than enough. Always check that the output fits within your destination system limits before copying.`,
  },
  {
    q: 'How can I use a text repeater to generate test data?',
    a: `Text repeaters are extremely useful for software development and quality assurance. For database testing, you can repeat a template row like "John Doe, john@example.com, New York" with newline separators to generate dozens of CSV records to import. For UI testing, repeat a long word like "Pneumonoultramicroscopicsilicovolcanoconiosis" to test how your interface handles overflow. For API testing, repeat a short JSON snippet to build a large payload and measure how your endpoint performs under load. For security testing, you can repeat special characters like angle brackets or SQL fragments to check how input validation handles repeated injection attempts — always in a safe test environment. For performance benchmarks, repeat a sentence to produce text of a specific word count — for example, 500 repetitions of a 3-word phrase gives you 1,500 words instantly to feed into a readability analyzer or word counter. Combining the text repeater with a separator like newline gives you newline-delimited records that tools like awk, grep, or database importers expect.`,
  },
  {
    q: 'Can I repeat multi-line text or paragraphs?',
    a: `Yes. The text input accepts any text including newlines, tabs, and paragraphs. If you paste a multi-paragraph block and repeat it 5 times with a newline separator, each copy will preserve its internal newlines and you will get 5 copies of the full block separated by an extra blank line. This is useful for generating repeated paragraph content for document templates or for creating test data that mirrors real structured text. One practical tip: if you want a blank line between each repetition rather than just a newline, set the separator to "custom" and enter two newline characters (press Enter twice in the custom field). This creates visually separated blocks suitable for blog-style content or markdown documents. Note that the "no separator" mode is usually not useful for multi-line text since it would concatenate the end of one copy directly onto the start of the next without any gap.`,
  },
  {
    q: 'How is text repetition done in programming languages?',
    a: `Most languages have native or standard-library support for repeating strings. In Python, the expression "abc" * 3 gives "abcabcabc", and ", ".join(["abc"] * 3) gives "abc, abc, abc" with a separator. In JavaScript, "abc".repeat(3) returns "abcabcabc" and Array(3).fill("abc").join(", ") adds separators. In Java, use String.join(", ", Collections.nCopies(3, "abc")). In Go, strings.Repeat("abc", 3) is the idiomatic approach. In Ruby, "abc" * 3 works like Python. In Bash, printf "abc %.0s" {1..3} repeats the string. The browser tool is most useful when you are working with text outside of a programming context — copying from email, web pages, PDFs, word processors — and need a fast, visual repetition without writing any code. For programmatic generation of thousands of repetitions integrated into a data pipeline, the language-native approach is more efficient and maintainable.`,
  },
  {
    q: 'What is the difference between a text repeater and Lorem Ipsum?',
    a: `Lorem Ipsum is a specific block of Latin-derived placeholder text that has been used in typesetting and graphic design since the 1500s. It looks like real text at a glance — words of varying length, punctuation, mixed capitalization — which makes it ideal for showing how a design will look with realistic prose without distracting readable content. A text repeater, on the other hand, repeats whatever text you provide — it does not generate realistic-looking prose. Use Lorem Ipsum when you need realistic-looking filler text for design mockups or print layouts. Use a text repeater when you need a specific repeated string: for example, repeating a known keyword to test keyword density tools, repeating a border character like "─" to build a visual divider, repeating an emoji to stress-test emoji rendering, or repeating a specific data template to build test datasets. The two tools complement each other rather than compete.`,
  },
  {
    q: 'Can I use the tool to build repeated CSS content or SVG patterns?',
    a: `Yes. The text repeater is useful for any text-based output, including CSS and SVG. For CSS content properties, you might repeat a bullet character with a space separator: repeating "• " 10 times gives you a string of decorative bullets. For CSS custom properties or SCSS variable values that need repeated units, the tool can generate them faster than manual typing. For SVG path data, you can repeat arc or line commands to create patterns, though this works best with simple commands. For generating repeated gradient color stops, HTML table cells, or repeated class names in Tailwind CSS, the tool saves time over manual repetition. The pipe separator works well for creating repeated table columns in Markdown: repeating "| Column " five times with no trailing separator gives you a table header structure. After generating the text, paste it directly into your code editor and adjust as needed.`,
  },
  {
    q: 'Does the tool preserve formatting, Unicode, and emoji?',
    a: `Yes. The tool operates on the raw Unicode string without any transformation. All characters — emoji, CJK characters, Arabic script, mathematical symbols, and special characters — are preserved exactly as entered. The output is also Unicode-correct, meaning a family emoji made up of multiple code points joined by zero-width joiners will repeat as a unit rather than being split at the code-point level. The only thing the tool adds is the separator string between repetitions. When you copy the output and paste it into another application, the rendering depends on that application's font and Unicode support. Terminals with limited font coverage may show replacement characters for some emoji, but the underlying Unicode data remains correct and the text will render properly in browsers and modern text editors.`,
  },
  {
    q: 'How do I use the output in Excel or Google Sheets?',
    a: `To use repeated text in a spreadsheet, choose "New line" as the separator to generate one value per row, copy the output, and paste it into the first cell of your target column in Excel or Google Sheets. Both applications will split newline-separated text into individual rows when pasting. If you want to paste across multiple columns instead of rows, use "Tab" as a custom separator (paste a real tab character into the custom separator field) and paste the result — spreadsheet applications interpret tab-separated values as column delimiters. For comma-separated data, you can also import the output via File and then Import in Google Sheets or the Text Import Wizard in Excel, choosing the appropriate delimiter. This approach is much faster than manually copying a cell and dragging it down hundreds of rows, especially for non-numeric placeholder data.`,
  },
];

export const useCases = [
  { label: 'Test data generation',   desc: 'Repeat a row template to fill CSV or database tables for testing' },
  { label: 'UI overflow testing',    desc: 'Repeat long words to test how your interface handles overflow'   },
  { label: 'Visual dividers',        desc: 'Repeat "─" or "=" to build text-based horizontal rules'         },
  { label: 'Keyword density checks', desc: 'Repeat a keyword to test density tool thresholds'                },
  { label: 'API payload sizing',     desc: 'Repeat text snippets to reach a target byte size for load tests' },
  { label: 'Code template repeats',  desc: 'Repeat class names, CSS rules, or HTML elements quickly'        },
];
