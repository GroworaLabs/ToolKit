import { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
    { q: 'What are HTML entities?', a: 'HTML entities are sequences of characters used to represent special characters in HTML markup. They begin with an ampersand (&) and end with a semicolon (;). For example, &lt; represents the less-than sign <. Entities are necessary when you need to display characters that HTML would otherwise interpret as markup — like < and >.' },
    { q: 'Which HTML characters must be escaped?', a: 'Three characters are required to be escaped in HTML content: & (ampersand → &amp;), < (less-than → &lt;), and > (greater-than → &gt;). Inside HTML attribute values, you also need to escape the quote character being used: " (→ &quot;) for double-quoted attributes. The apostrophe \' (→ &apos;) must be escaped in single-quoted attributes. Forgetting to escape these is the root cause of most HTML injection vulnerabilities.' },
    { q: 'What is the difference between named and numeric HTML entities?', a: 'Named entities use a descriptive name: &amp; for &, &lt; for <, &copy; for ©. Numeric entities use either decimal (&#38; for &) or hexadecimal (&#x26; for &) Unicode code points. Named entities are more readable; numeric entities work for any Unicode character, including those without a named entity. All three forms produce identical output.' },
    { q: 'Why do I need to encode HTML entities?', a: 'Encoding prevents HTML injection and XSS (Cross-Site Scripting) attacks. If a user inputs <script>alert(1)</script> and your application renders it without encoding, the browser executes the script. By encoding < as &lt; and > as &gt;, the browser displays the literal characters instead of interpreting them as tags. This is one of the most critical security practices in web development.' },
    { q: 'What is &nbsp;?', a: '&nbsp; (non-breaking space) is a whitespace character that prevents line breaks. Unlike a regular space, text separated by &nbsp; will not wrap onto a new line. It is also not collapsed by HTML\'s whitespace normalization. Use &nbsp; between values that should stay together: "10&nbsp;km", "Dr.&nbsp;Smith", "Fig.&nbsp;1".' },
    { q: 'What is the difference between &lt; and &#60;?', a: '&lt; is a named entity for the less-than sign <. &#60; is the decimal numeric entity for the same character (Unicode code point 60). &#x3C; is the hexadecimal equivalent. All three produce exactly the same character in the browser. Named entities are preferred for readability, but numeric entities are universal for any Unicode code point.' },
    { q: 'Do I need to encode special characters in HTML attributes?', a: 'Yes. Inside attribute values, you must encode the quote delimiter. In double-quoted attributes, encode " as &quot;. In single-quoted attributes, encode \' as &apos; or &#39;. You should also always encode & as &amp; inside attribute values, especially in URLs (href, src, action). Failure to do so can break attribute parsing or enable injection attacks.' },
    { q: 'What is XSS and how does HTML encoding prevent it?', a: 'XSS (Cross-Site Scripting) is an attack where malicious scripts are injected into web pages viewed by other users. The most common vector is rendering user input as raw HTML. HTML encoding converts dangerous characters (<, >, &, ", \') into their entity equivalents, so the browser displays them as text instead of parsing them as HTML. Always encode any data from external sources before rendering it in HTML.' },
];

export const sidebarInfo = [
    { label: '&amp;',  desc: '& — ampersand (always encode)'            },
    { label: '&lt;',   desc: '< — less-than sign (required in HTML)'    },
    { label: '&gt;',   desc: '> — greater-than sign (required in HTML)' },
    { label: '&quot;', desc: '" — quotation mark (attributes)'          },
    { label: '&apos;', desc: "' — apostrophe (single-quoted attributes)" },
    { label: '&nbsp;', desc: ' — non-breaking space'                    },
    { label: '&copy;', desc: '© — copyright symbol'                     },
    { label: '&mdash;',desc: '— — em dash'                              },
];
