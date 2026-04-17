export default function JsonToYamlContent() {
    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
            <div>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        What is YAML?
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        YAML (YAML Ain't Markup Language — a recursive acronym) is a human-readable data serialization language designed to be easy to write and understand. It was created in 2001 as a simpler alternative to XML and has become the dominant format for configuration files across the software industry. Docker Compose, Kubernetes, GitHub Actions, Ansible, Helm charts, and most CI/CD platforms all use YAML as their primary configuration language.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        Unlike JSON, which uses curly braces and square brackets to denote structure, YAML expresses hierarchy through <strong style={{ color: 'var(--ink)' }}>indentation</strong>. A child key is simply indented two spaces further than its parent. This approach eliminates most of the punctuation noise in JSON, making YAML documents far easier to scan and edit by hand.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
                        YAML 1.2 is formally a superset of JSON — every valid JSON document can be parsed by a YAML 1.2 parser without modification. This makes YAML an excellent migration path: you can start with valid JSON and gradually adopt YAML conventions like comments and block scalars.
                    </p>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        JSON vs YAML — detailed comparison
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
                        Understanding the specific differences between the two formats helps you choose the right tool and avoid common conversion pitfalls.
                    </p>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                                    {['Feature', 'JSON', 'YAML'].map(h => (
                                        <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['Comments',       'Not supported',                          '# lines are comments'],
                                    ['Strings',        'Always double-quoted',                   'Unquoted, single, or double quoted'],
                                    ['Booleans',       'true / false only',                      'true, false, yes, no, on, off'],
                                    ['Null',           'null only',                              'null or ~'],
                                    ['Multiline',      'Escape \\n in strings',                  '| (literal) or > (folded) blocks'],
                                    ['Anchors',        'Not supported',                          '&anchor and *alias for reuse'],
                                    ['Structure',      'Braces {} and brackets []',              'Indentation (2 spaces per level)'],
                                    ['Trailing comma', 'Not allowed (syntax error)',             'N/A — no commas used'],
                                    ['File extension', '.json',                                  '.yaml or .yml'],
                                    ['Spec',           'RFC 8259 (2017)',                        'YAML 1.2 (2009)'],
                                ].map(([feat, json, yaml], i) => (
                                    <tr key={feat} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--ink)' }}>{feat}</td>
                                        <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{json}</td>
                                        <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)' }}>{yaml}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        When to use YAML vs JSON
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginBottom: 20 }}>
                        <div style={{ padding: '20px', background: 'var(--green-lt)', border: '1px solid var(--green-mid)', borderRadius: 'var(--r-l)' }}>
                            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>Choose YAML for…</div>
                            <ul style={{ paddingLeft: 18, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.9, margin: 0 }}>
                                <li>Kubernetes manifests and Helm values</li>
                                <li>GitHub Actions and GitLab CI pipelines</li>
                                <li>Docker Compose files</li>
                                <li>Ansible playbooks and inventories</li>
                                <li>Application config (Django, Rails, Spring)</li>
                                <li>OpenAPI / Swagger API specifications</li>
                                <li>Any file humans frequently read and edit</li>
                            </ul>
                        </div>
                        <div style={{ padding: '20px', background: 'var(--blue-lt)', border: '1px solid rgba(37,99,235,.2)', borderRadius: 'var(--r-l)' }}>
                            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>Choose JSON for…</div>
                            <ul style={{ paddingLeft: 18, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.9, margin: 0 }}>
                                <li>REST API request and response bodies</li>
                                <li>Browser localStorage and sessionStorage</li>
                                <li>package.json, tsconfig.json</li>
                                <li>Database JSON/JSONB columns</li>
                                <li>Machine-to-machine data exchange</li>
                                <li>WebSocket and SSE message payloads</li>
                                <li>Any data parsed programmatically at high volume</li>
                            </ul>
                        </div>
                    </div>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
                        The general rule: use YAML when humans write it, use JSON when machines exchange it. YAML's indentation sensitivity and its many boolean synonyms (yes/no/on/off) make it error-prone to generate programmatically, while JSON's strict syntax makes it trivial to serialize from any programming language.
                    </p>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        YAML syntax reference
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
                        YAML has several core constructs that every developer working with configuration files needs to understand:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                            {
                                label: 'Scalars — plain, quoted, and block',
                                code: `# Plain string (no quotes needed)
name: Alice

# Quoted string (required when value contains : or #)
message: "Hello: world"

# Literal block scalar — preserves newlines
script: |
  echo "Starting deploy"
  npm install
  npm run build

# Folded block scalar — folds newlines into spaces
description: >
  This is a long description
  that spans multiple lines
  but will be one paragraph.`,
                                note: 'Single-quoted strings use \'\' to escape a literal apostrophe. Double-quoted strings support \\n, \\t, \\\\ escapes just like JSON.',
                            },
                            {
                                label: 'Sequences (arrays)',
                                code: `# Block sequence
fruits:
  - apple
  - banana
  - cherry

# Flow sequence (JSON-style, valid YAML)
colors: [red, green, blue]

# Sequence of objects
users:
  - name: Alice
    role: admin
  - name: Bob
    role: viewer`,
                                note: 'Each - item is one array element. Objects inside an array are indented further. Flow sequences use JSON bracket syntax and are valid in YAML.',
                            },
                            {
                                label: 'Mappings (objects)',
                                code: `# Block mapping
server:
  host: localhost
  port: 8080
  tls: true

# Flow mapping (JSON-style)
point: {x: 10, y: 20}

# Nested mappings
app:
  database:
    host: db.example.com
    port: 5432`,
                                note: 'Indentation defines nesting. Two spaces is the standard. Tabs cause parse errors — always use spaces.',
                            },
                            {
                                label: 'Anchors and aliases — reusing values',
                                code: `# Define an anchor
defaults: &defaults
  replicas: 3
  env: production
  timeout: 30

# Merge with <<: *alias
web:
  <<: *defaults
  port: 80

api:
  <<: *defaults
  port: 3000
  replicas: 5  # override the anchored value`,
                                note: 'Anchors (&name) mark a node, aliases (*name) reuse it. The merge key (<<) copies all key-value pairs from the aliased mapping — think of it as YAML\'s object spread. Aliases are resolved to their values when converting to JSON.',
                            },
                        ].map(({ label, code, note }) => (
                            <div key={label} style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>{label}</div>
                                <pre style={{ margin: '0 0 10px', padding: '12px 14px', background: 'var(--page-bg)', borderRadius: 'var(--r-m)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', overflowX: 'auto', lineHeight: 1.7 }}>{code}</pre>
                                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>{note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Common YAML mistakes
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            { error: 'Tabs instead of spaces', example: 'key:\\n\\t value: 123', fix: 'YAML forbids tab characters for indentation. Use spaces only. Configure your editor to insert spaces when you press Tab in .yaml files.' },
                            { error: 'Unquoted boolean-like strings', example: 'country: NO  # parsed as false!', fix: 'The strings yes, no, true, false, on, off are parsed as booleans. Quote them: country: "NO". Norway\'s country code has caused real YAML bugs.' },
                            { error: 'Duplicate keys', example: 'host: localhost\\nhost: 127.0.0.1', fix: 'YAML parsers may accept duplicate keys but behavior varies — some take the last value, others the first. Use unique keys or use an anchor/alias.' },
                            { error: 'Missing space after colon', example: 'key:value  # parse error', fix: 'A key-value pair requires a space after the colon: key: value. Without the space, the entire string is treated as a plain scalar.' },
                            { error: 'Inconsistent indentation', example: 'parent:\\n  child: 1\\n   another: 2', fix: 'All sibling keys at the same level must have the same indentation. Mixing 2-space and 3-space indent siblings causes parse errors.' },
                        ].map(({ error, example, fix }) => (
                            <div key={error} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', background: 'var(--red-lt)', padding: '2px 8px', borderRadius: 99 }}>{error}</span>
                                    <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)', background: 'var(--page-bg)', padding: '2px 8px', borderRadius: 4 }}>{example}</code>
                                </div>
                                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>{fix}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Converting between formats in different languages
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                            {
                                label: 'Python — PyYAML',
                                code: `import yaml, json

# JSON → YAML
with open('data.json') as f:
    data = json.load(f)
yaml_str = yaml.dump(data, default_flow_style=False, sort_keys=False)

# YAML → JSON
with open('config.yaml') as f:
    data = yaml.safe_load(f)  # use safe_load, not load!
json_str = json.dumps(data, indent=2)`,
                                note: 'Always use yaml.safe_load() instead of yaml.load() to prevent arbitrary code execution via malicious YAML files (a known security vulnerability in PyYAML).',
                            },
                            {
                                label: 'Node.js — js-yaml',
                                code: `const yaml = require('js-yaml');
const fs = require('fs');

// JSON → YAML
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const yamlStr = yaml.dump(data);

// YAML → JSON
const yamlContent = fs.readFileSync('config.yaml', 'utf8');
const parsed = yaml.load(yamlContent);
const jsonStr = JSON.stringify(parsed, null, 2);`,
                                note: 'js-yaml is the most popular YAML library in the Node.js ecosystem. Install with: npm install js-yaml. It also provides a CLI: js-yaml input.yaml > output.json',
                            },
                            {
                                label: 'Go — gopkg.in/yaml.v3',
                                code: `package main

import (
    "encoding/json"
    "gopkg.in/yaml.v3"
)

// YAML → JSON via intermediate struct
var data interface{}
yaml.Unmarshal(yamlBytes, &data)
jsonBytes, _ := json.MarshalIndent(data, "", "  ")

// JSON → YAML via intermediate struct
var obj interface{}
json.Unmarshal(jsonBytes, &obj)
yamlBytes, _ := yaml.Marshal(obj)`,
                                note: 'Go\'s encoding/json and yaml.v3 both work with interface{} as an intermediate. Note that yaml.v3 uses map[string]interface{} for objects, compatible with encoding/json.',
                            },
                        ].map(({ label, code, note }) => (
                            <div key={label} style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>{label}</div>
                                <pre style={{ margin: '0 0 10px', padding: '12px 14px', background: 'var(--page-bg)', borderRadius: 'var(--r-m)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', overflowX: 'auto', lineHeight: 1.7 }}>{code}</pre>
                                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>{note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        YAML in CI/CD — practical examples
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
                        YAML configuration is central to modern DevOps workflows. Here's what real YAML usage looks like in common platforms:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {[
                            { platform: 'GitHub Actions', detail: 'Workflow files live in .github/workflows/. Each file defines triggers (on: push, pull_request), jobs with runs-on environments, and steps that either run shell commands or call reusable actions. The uses: keyword references an action; the with: mapping passes inputs.' },
                            { platform: 'Kubernetes', detail: 'Every Kubernetes resource — Pod, Deployment, Service, ConfigMap, Ingress — is defined in YAML. The four mandatory fields are apiVersion, kind, metadata, and spec. kubectl apply -f manifest.yaml creates or updates the resource. Helm charts wrap these manifests in templates with {{ .Values.xxx }} placeholders.' },
                            { platform: 'Docker Compose', detail: 'docker-compose.yml defines multi-container applications: service names, image references, port mappings, volume mounts, environment variables, and dependencies between services. The depends_on key controls startup order, while networks and volumes are declared at the top level and referenced by services.' },
                            { platform: 'OpenAPI / Swagger', detail: 'API specifications in YAML describe endpoints (paths:), request parameters, request bodies, and response schemas. YAML\'s multi-line strings and anchors make OpenAPI specs more readable than JSON equivalents — anchors eliminate duplication of shared schemas across multiple endpoints.' },
                        ].map(({ platform, detail }, i) => (
                            <div key={platform} style={{ padding: '14px 16px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{platform}</div>
                                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{detail}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
