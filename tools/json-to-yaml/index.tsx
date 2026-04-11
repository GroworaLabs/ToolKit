import { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
    { q: 'What is YAML?', a: 'YAML (YAML Ain\'t Markup Language) is a human-friendly data serialization format. Unlike JSON, it uses indentation to express structure instead of brackets and braces, making it easier to read and write for configuration files. YAML is a superset of JSON — every valid JSON document is also valid YAML.' },
    { q: 'What is the difference between JSON and YAML?', a: 'JSON uses curly braces, square brackets, and quotation marks to define structure. YAML relies on indentation and colons, omitting most punctuation. YAML supports comments (lines starting with #), multi-line strings, and anchors/aliases for reusing values — none of which exist in JSON. JSON is better for APIs and data exchange; YAML is better for human-edited config files.' },
    { q: 'Is YAML a superset of JSON?', a: 'Yes — YAML 1.2 is a strict superset of JSON. Any valid JSON can be parsed by a YAML parser. However, YAML allows constructs that are not valid JSON (comments, unquoted strings, block scalars, anchors). When converting YAML to JSON, those YAML-only features must be stripped or converted.' },
    { q: 'Why does indentation matter in YAML?', a: 'YAML uses indentation (spaces only — never tabs) to express nesting and hierarchy. Two spaces per level is the convention. Mixing tabs and spaces causes parse errors. The indentation level determines whether a key belongs to the parent object or is a sibling.' },
    { q: 'When should I use YAML instead of JSON?', a: 'Use YAML for files that humans frequently edit: CI/CD pipeline configs (GitHub Actions, GitLab CI), Docker Compose, Kubernetes manifests, Ansible playbooks, and application settings. Use JSON for API payloads, localStorage, and machine-to-machine data exchange where performance and strict parsing matter more than readability.' },
    { q: 'Can YAML have comments?', a: 'Yes — YAML supports comments starting with #. Comments can appear on their own line or after a value. For example: port: 8080 # HTTP port. Comments are ignored by YAML parsers and are stripped when converting to JSON, since JSON has no comment syntax.' },
    { q: 'What are YAML anchors and aliases?', a: 'Anchors (&name) let you label a YAML node, and aliases (*name) let you reference it later. This avoids repetition in config files. For example: defaults: &defaults\n  env: production\n  replicas: 3\nweb:\n  <<: *defaults\n  port: 80. When converting to JSON, anchors and aliases are resolved into their final values.' },
    { q: 'Why do some strings need quotes in YAML?', a: 'Strings that look like other YAML types (numbers, booleans, null) must be quoted to be treated as strings. For example, "true", "null", "1.0", and "yes" are all interpreted as non-string scalars unless quoted. Strings containing colons, hashes, or brackets also need quotes to avoid parse errors.' },
    { q: 'Is my data safe when using this converter?', a: 'Yes. All conversion happens entirely in your browser using pure TypeScript/JavaScript. No data is sent to any server. The conversion logic runs locally — your configuration files, secrets, and API keys never leave your device.' },
];

export const sidebarInfo = [
    { label: 'Indentation',    desc: 'Use 2 spaces per level — tabs are not allowed in YAML' },
    { label: 'Comments',       desc: 'Lines starting with # are ignored by YAML parsers'      },
    { label: 'Booleans',       desc: 'true/false/yes/no/on/off — quote them if you mean strings' },
    { label: 'Null values',    desc: 'null and ~ both mean null in YAML'                       },
    { label: 'Multiline',      desc: '| preserves newlines, > folds them into spaces'          },
];
