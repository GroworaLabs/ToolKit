export default function JsonToCsvContent() {
  return (
    <div className="tool-content">
      <h2>JSON to CSV Conversion: A Practical Guide</h2>
      <p>
        JSON and CSV are two of the most common data interchange formats in software development. JSON (JavaScript Object Notation) is the lingua franca of modern APIs — flexible, self-describing, and human-readable. CSV (Comma-Separated Values) is the lingua franca of spreadsheets and data science tools — tabular, compact, and supported by every analytics platform on the planet. Converting between them is a routine task, but one with several important subtleties that this guide covers in depth.
      </p>

      <h3>Why Convert JSON to CSV?</h3>
      <p>
        The most common reasons developers need JSON-to-CSV conversion:
      </p>
      <ul>
        <li><strong>Spreadsheet analysis:</strong> Export API data to Excel or Google Sheets for pivot tables, charts, or sharing with non-technical stakeholders.</li>
        <li><strong>Database import:</strong> Many databases and ETL tools accept CSV files for bulk insert operations. PostgreSQL's <code>COPY</code> command, MySQL's <code>LOAD DATA INFILE</code>, and Snowflake's <code>COPY INTO</code> all support CSV natively.</li>
        <li><strong>Machine learning:</strong> Pandas, NumPy, and most ML frameworks load CSVs trivially. Converting API JSON responses to CSV is a standard step in data preparation pipelines.</li>
        <li><strong>Reporting tools:</strong> Tableau, Power BI, Looker, and Metabase all have first-class CSV import. JSON requires custom connectors or ETL.</li>
        <li><strong>Email and sharing:</strong> A CSV file opens in Excel on any machine without configuration. A JSON file requires a developer or a specialised viewer.</li>
      </ul>

      <h3>The RFC 4180 Standard</h3>
      <p>
        CSV has no single formal standard for its full lifetime — it predates most of the internet. RFC 4180 (published 2005) is the closest thing to a definitive specification. Key rules that every correct CSV implementation must follow:
      </p>
      <ul>
        <li><strong>Fields containing the delimiter, double quotes, or newlines must be wrapped in double quotes.</strong> A field like <code>Smith, John</code> using a comma delimiter must be written as <code>"Smith, John"</code>.</li>
        <li><strong>Double quotes inside a quoted field must be escaped by doubling them.</strong> The value <code>He said "hello"</code> must be written as <code>"He said ""hello"""</code>.</li>
        <li><strong>Each record ends with CRLF (carriage return + line feed): <code>\r\n</code>.</strong> Some tools accept LF alone; Excel historically requires CRLF on Windows.</li>
        <li><strong>The first record may be a header row.</strong> Headers are optional but strongly recommended for any human-readable dataset.</li>
        <li><strong>All records must have the same number of fields.</strong> If a row is missing a value, the cell is empty but the delimiter is still present.</li>
      </ul>
      <p>
        This converter produces RFC 4180-compliant output, including CRLF line endings and proper quoting, so the output is safe to open in any spreadsheet application including Excel, LibreOffice Calc, and Numbers.
      </p>

      <h3>Delimiters: Comma, Semicolon, or Tab?</h3>
      <p>
        The choice of delimiter depends on your region and target application:
      </p>
      <ul>
        <li><strong>Comma (,):</strong> The most common delimiter in English-speaking countries. Works in all spreadsheet applications by default. Problematic if your data contains commas (addresses, descriptions) — the tool handles this automatically by quoting affected fields.</li>
        <li><strong>Semicolon (;):</strong> Standard in European locales (Germany, France, Netherlands, Poland, etc.) where commas serve as decimal separators. If you export a CSV with commas from Excel in these locales, it uses semicolons instead. Match the delimiter to your target environment.</li>
        <li><strong>Tab (\t):</strong> Tab-separated values (TSV) avoid quoting issues entirely since tabs almost never appear in data. TSV files open cleanly in Excel and Google Sheets without needing an import wizard, and are preferred by bioinformatics and genomics tools. The file extension is typically <code>.tsv</code>, though <code>.txt</code> is also common.</li>
      </ul>

      <h3>Handling Nested JSON Objects</h3>
      <p>
        CSV is inherently flat — every cell contains a scalar value. JSON can nest objects and arrays to arbitrary depth. This tool handles nesting through <strong>dot-notation flattening</strong>:
      </p>
      <p>
        Given this input:
      </p>
      <pre><code>{`[{
  "id": 1,
  "user": {
    "name": "Alice",
    "address": {
      "city": "London",
      "country": "UK"
    }
  }
}]`}</code></pre>
      <p>
        The tool produces these columns: <code>id</code>, <code>user.name</code>, <code>user.address.city</code>, <code>user.address.country</code>. Each level of nesting is represented by a dot-separated key. This is the same convention used by Elasticsearch, MongoDB projections, and many logging systems.
      </p>
      <p>
        Arrays nested inside objects (e.g. a <code>tags</code> array) are serialised as a JSON string within the cell. There is no universally agreed way to represent arrays in CSV — some tools repeat rows, some use pipe-separated values, some use JSON. This converter uses JSON serialisation, which is lossless and parseable.
      </p>

      <h3>Handling Missing and Null Values</h3>
      <p>
        Real-world JSON from APIs is rarely uniform. One object might have a <code>phone</code> field; the next might not. This converter handles heterogeneous data by:
      </p>
      <ol>
        <li>Collecting all unique keys across all objects in the array (the union of all keys).</li>
        <li>Using these as the column headers.</li>
        <li>For each row, filling in the value if it exists, or leaving the cell empty if the key is absent.</li>
        <li>Converting JSON <code>null</code> to an empty string.</li>
      </ol>
      <p>
        This approach preserves all data without silent loss. The resulting CSV always has the same number of columns in every row, which is required by RFC 4180 and expected by all spreadsheet and database import tools.
      </p>

      <h3>Importing the CSV Into Popular Tools</h3>
      <p>
        <strong>Microsoft Excel:</strong> On Windows, double-clicking a CSV file typically opens it directly. If columns are not parsed correctly (a common issue with semicolons or Unicode data), use <em>Data → From Text/CSV</em> and configure the delimiter explicitly. Always verify that the first column is not garbled — this is a sign of encoding mismatch. This converter uses UTF-8, which Excel 2016+ handles correctly when using the CSV import wizard.
      </p>
      <p>
        <strong>Google Sheets:</strong> <em>File → Import → Upload</em>, then choose <em>Custom separator</em> if you used semicolons or tabs. For comma-delimited files, Sheets usually auto-detects the format. UTF-8 encoding is fully supported.
      </p>
      <p>
        <strong>PostgreSQL:</strong> Use the <code>COPY</code> command:
      </p>
      <pre><code>{`COPY users (id, name, email)
FROM '/path/to/data.csv'
WITH (FORMAT csv, HEADER true, DELIMITER ',', ENCODING 'UTF8');`}</code></pre>
      <p>
        <strong>Pandas (Python):</strong>
      </p>
      <pre><code>{`import pandas as pd
df = pd.read_csv('data.csv', encoding='utf-8')
print(df.head())`}</code></pre>
      <p>
        <strong>MySQL:</strong>
      </p>
      <pre><code>{`LOAD DATA INFILE '/path/to/data.csv'
INTO TABLE users
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\\r\\n'
IGNORE 1 ROWS;`}</code></pre>

      <h3>Command-Line Alternatives</h3>
      <p>
        For automation and large files, the command line is often faster than a browser tool:
      </p>
      <ul>
        <li><strong>jq + awk:</strong> <code>jq -r '(.[0] | keys_unsorted) as $keys | $keys, (.[] | [.[$keys[]]] | @csv)' data.json</code> — produces RFC 4180 CSV using jq's built-in <code>@csv</code> formatter.</li>
        <li><strong>Python one-liner:</strong> <code>python3 -c "import json,csv,sys; data=json.load(open('data.json')); w=csv.DictWriter(sys.stdout, fieldnames=data[0].keys()); w.writeheader(); w.writerows(data)"</code></li>
        <li><strong>csvkit:</strong> <code>in2csv data.json &gt; output.csv</code> — a Python library with excellent type inference and schema detection.</li>
        <li><strong>miller (mlr):</strong> <code>mlr --ijson --ocsv cat data.json</code> — a powerful stream-processing tool that handles nested JSON natively.</li>
      </ul>

      <h3>Performance Considerations</h3>
      <p>
        For datasets under 50 000 rows, the browser is a perfectly capable converter. This tool processes the full JSON array in memory and renders the output in a textarea. For larger datasets:
      </p>
      <ul>
        <li>Use the <strong>Download</strong> button rather than copying from the textarea — writing a large string to the clipboard is more reliable than selecting text in a large textarea.</li>
        <li>For files over 100 MB, prefer a command-line tool (jq, Python, or miller) which can stream the input without loading it all into memory.</li>
        <li>If you need to process JSON line-delimited (NDJSON / jsonl format), each line is a separate JSON object — preprocess by wrapping in an array first, or use miller which handles NDJSON natively.</li>
      </ul>

      <h3>Common Pitfalls</h3>
      <p>
        <strong>Date formatting:</strong> JSON has no native date type — dates are usually strings (ISO 8601: <code>2024-01-15T10:30:00Z</code>) or Unix timestamps (integers). In CSV, these are still strings. Excel may auto-format ISO dates as locale-specific date strings when opening the file — verify the format didn't change if dates are critical.
      </p>
      <p>
        <strong>Large integers:</strong> JavaScript's <code>JSON.parse</code> loses precision for integers larger than 2^53 (9 007 199 254 740 991). If your JSON contains very large IDs (common with distributed systems using 64-bit snowflake IDs), use a streaming JSON parser that supports BigInt, or treat the large numbers as strings in your source system.
      </p>
      <p>
        <strong>Boolean values:</strong> JSON booleans (<code>true</code>/<code>false</code>) are converted to the strings <code>true</code>/<code>false</code> in CSV. If your target database expects <code>1</code>/<code>0</code> or <code>Y</code>/<code>N</code>, transform the column after import.
      </p>
      <p>
        <strong>Encoding:</strong> This converter uses UTF-8. If you open the CSV in Excel and see garbled characters (particularly for non-Latin scripts like Chinese, Arabic, or Cyrillic), try adding a UTF-8 BOM. Excel interprets files with a BOM as UTF-8. In code: prefix the file content with <code>﻿</code> before creating the Blob.
      </p>

      <h3>JSON vs CSV: When to Use Each</h3>
      <table>
        <thead>
          <tr><th>Criterion</th><th>JSON</th><th>CSV</th></tr>
        </thead>
        <tbody>
          <tr><td>Nested data</td><td>Native support</td><td>Requires flattening</td></tr>
          <tr><td>Typed values</td><td>string, number, boolean, null, array, object</td><td>Everything is a string</td></tr>
          <tr><td>Spreadsheet support</td><td>Requires conversion</td><td>Direct open</td></tr>
          <tr><td>File size (same data)</td><td>Larger (keys repeated)</td><td>Smaller (keys in header once)</td></tr>
          <tr><td>Streaming large files</td><td>NDJSON works well</td><td>Works well</td></tr>
          <tr><td>API data exchange</td><td>Universal</td><td>Uncommon (but used in some REST APIs)</td></tr>
          <tr><td>Database import</td><td>Varies by DB</td><td>Universal support</td></tr>
        </tbody>
      </table>

      <h3>Security Considerations</h3>
      <p>
        A subtle security issue called <strong>CSV injection</strong> (also called formula injection) occurs when CSV data is imported into a spreadsheet and a cell value begins with <code>=</code>, <code>+</code>, <code>-</code>, or <code>@</code>. Spreadsheet applications interpret these as formulas. A malicious value like <code>=HYPERLINK("http://attacker.com","Click me")</code> becomes a clickable link in Excel.
      </p>
      <p>
        To prevent this, sanitise cell values that start with formula characters before exporting. If you control the import side (e.g. building an admin panel that exports user-submitted data), prefix potentially dangerous values with a tab or single quote to prevent formula evaluation. This tool does not sanitise for CSV injection — if your data may contain user-submitted strings, add your own sanitisation layer before exporting to CSV that will be opened in a spreadsheet.
      </p>
    </div>
  );
}
