---
title: "JSON Schema Validation: A Practical Guide for API Developers"
description: "JSON Schema turns the implicit contract of your API into an explicit, testable specification. This guide covers the full schema syntax, validation in Node.js and Python, and how to use schemas for documentation, form validation, and database constraints."
category: "Developer Tools"
tools: ["json-formatter"]
tags: ["json schema", "json", "api", "validation", "typescript", "openapi", "data validation"]
publishedAt: "2026-05-20"
author: "olivia-bennett"
---

Every API has an implicit contract: the shape of the data it accepts and returns. When that contract exists only in a developer's head or in an outdated Confluence page, things break silently. A field that was optional becomes required. A string field starts accepting integers. An object that was always present is now sometimes null. The consumer finds out at runtime, in production, when a user submits a form.

JSON Schema is the tooling that makes the contract explicit and machine-readable. Write the schema once and you get: validation in your API handler, documentation in your Swagger UI, type generation for TypeScript, and test fixtures that reflect real data shapes.

---

## What JSON Schema Is

JSON Schema is a specification (currently Draft 2020-12) for describing the structure of JSON data. A schema is itself a JSON document that declares what valid data looks like:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "username": { "type": "string", "minLength": 3, "maxLength": 30 },
    "email":    { "type": "string", "format": "email" },
    "age":      { "type": "integer", "minimum": 13 }
  },
  "required": ["username", "email"],
  "additionalProperties": false
}
```

This schema accepts `{"username": "alice", "email": "alice@example.com"}` and rejects `{"username": "a"}` (too short), `{"email": "not-an-email"}` (bad format), or `{"username": "alice", "email": "alice@example.com", "extra": "field"}` (additional property not allowed).

Use the [JSON Formatter](/tools/json-formatter) to validate and prettify your JSON data before running it through a schema validator — it catches syntax errors like missing commas and unquoted keys before validation begins.

---

## Core Keywords

**Type system:**

```json
{ "type": "string" }
{ "type": "number" }
{ "type": "integer" }
{ "type": "boolean" }
{ "type": "null" }
{ "type": "array" }
{ "type": "object" }
{ "type": ["string", "null"] }   // multiple types: string or null
```

**String constraints:**

```json
{
  "type": "string",
  "minLength": 1,
  "maxLength": 255,
  "pattern": "^[a-zA-Z0-9_-]+$",
  "format": "email"   // email | date | date-time | uri | uuid | ipv4 | ipv6
}
```

**Number constraints:**

```json
{
  "type": "number",
  "minimum": 0,
  "maximum": 100,
  "exclusiveMinimum": 0,   // strictly greater than 0
  "multipleOf": 0.01       // must be a multiple of this value
}
```

**Array constraints:**

```json
{
  "type": "array",
  "items": { "type": "string" },      // all items must be strings
  "minItems": 1,
  "maxItems": 10,
  "uniqueItems": true                  // no duplicate values
}
```

**Object constraints:**

```json
{
  "type": "object",
  "properties": {
    "id":    { "type": "string", "format": "uuid" },
    "name":  { "type": "string" },
    "email": { "type": "string", "format": "email" }
  },
  "required": ["id", "name"],
  "additionalProperties": false,
  "minProperties": 1,
  "maxProperties": 10
}
```

`additionalProperties: false` is the strictest setting — it rejects any key not listed in `properties`. Use it in input validation; be more lenient in response schemas where APIs may add new fields in future versions.

---

## Enum, Const, and Fixed Values

```json
{ "enum": ["pending", "active", "suspended", "deleted"] }
// Accepts only one of these four values

{ "const": "v2" }
// Accepts only this exact value — useful for versioned schemas
```

---

## Schema Composition: anyOf, oneOf, allOf, not

These keywords let you combine schemas:

```json
{
  "anyOf": [
    { "type": "string" },
    { "type": "number" }
  ]
}
// Passes if at least one sub-schema matches (string OR number)

{
  "oneOf": [
    { "type": "string" },
    { "type": "number" }
  ]
}
// Passes if exactly one sub-schema matches (cannot be both)

{
  "allOf": [
    { "type": "object", "required": ["id"] },
    { "properties": { "name": { "type": "string" } } }
  ]
}
// Must match all sub-schemas (composition / intersection)
```

`oneOf` is the right keyword for discriminated unions — a shape that can be one of several different structures depending on a type field:

```json
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "type":  { "const": "email" },
        "email": { "type": "string", "format": "email" }
      },
      "required": ["type", "email"]
    },
    {
      "type": "object",
      "properties": {
        "type":  { "const": "phone" },
        "phone": { "type": "string", "pattern": "^\\+[1-9]\\d{7,14}$" }
      },
      "required": ["type", "phone"]
    }
  ]
}
```

---

## `$ref` and Schema Reuse

`$ref` references another schema by JSON Pointer, avoiding duplication:

```json
{
  "$defs": {
    "Address": {
      "type": "object",
      "properties": {
        "street": { "type": "string" },
        "city":   { "type": "string" },
        "zip":    { "type": "string" }
      },
      "required": ["street", "city"]
    },
    "User": {
      "type": "object",
      "properties": {
        "name":            { "type": "string" },
        "billingAddress":  { "$ref": "#/$defs/Address" },
        "shippingAddress": { "$ref": "#/$defs/Address" }
      },
      "required": ["name", "billingAddress"]
    }
  }
}
```

In real projects, schemas are typically split across multiple files:

```json
{ "$ref": "./address.schema.json" }
{ "$ref": "https://example.com/schemas/address.json" }
```

---

## Validation in Node.js with Ajv

Ajv is the most widely used JSON Schema validator for JavaScript and TypeScript, with near-universal adoption in the Node.js ecosystem.

```bash
npm install ajv ajv-formats
```

```javascript
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true });  // collect all errors, not just the first
addFormats(ajv);  // adds support for: email, date, uri, uuid, etc.

const userSchema = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 3, maxLength: 30 },
    email:    { type: 'string', format: 'email' },
    age:      { type: 'integer', minimum: 13 },
  },
  required: ['username', 'email'],
  additionalProperties: false,
};

const validate = ajv.compile(userSchema);  // compile once, reuse

function validateUser(data) {
  const valid = validate(data);
  if (!valid) {
    return { ok: false, errors: validate.errors };
  }
  return { ok: true };
}

// Example usage in an Express handler
app.post('/users', (req, res) => {
  const result = validateUser(req.body);
  if (!result.ok) {
    return res.status(400).json({
      error: 'Validation failed',
      details: result.errors.map(e => ({
        field: e.instancePath,
        message: e.message,
      })),
    });
  }
  // req.body is valid — proceed
});
```

**Error messages with Ajv:**

```javascript
// Ajv's default error for a missing required field:
{ instancePath: '', keyword: 'required', params: { missingProperty: 'email' }, message: "must have required property 'email'" }

// For a format violation:
{ instancePath: '/email', keyword: 'format', params: { format: 'email' }, message: 'must match format "email"' }
```

For user-facing error messages, map `instancePath` (the dot-path to the field) and `message` (Ajv's description of the problem) into a format your UI can display.

---

## Validation in Python with jsonschema

```bash
pip install jsonschema
```

```python
import jsonschema
from jsonschema import validate, ValidationError, Draft202012Validator

user_schema = {
    "type": "object",
    "properties": {
        "username": {"type": "string", "minLength": 3},
        "email":    {"type": "string", "format": "email"},
        "age":      {"type": "integer", "minimum": 13},
    },
    "required": ["username", "email"],
    "additionalProperties": False,
}

def validate_user(data: dict) -> list[str]:
    validator = Draft202012Validator(user_schema)
    errors = sorted(validator.iter_errors(data), key=lambda e: e.path)
    return [f"{'.'.join(str(p) for p in e.path) or 'root'}: {e.message}" for e in errors]

# Usage in a Flask handler
@app.route('/users', methods=['POST'])
def create_user():
    errors = validate_user(request.json)
    if errors:
        return jsonify({"error": "Validation failed", "details": errors}), 400
    # proceed
```

For format validation (email, date-time, uri) in Python, install `jsonschema[format-nongpl]`:

```bash
pip install jsonschema[format-nongpl]
```

---

## TypeScript Type Generation

If you write schemas first, you can auto-generate TypeScript types from them instead of maintaining both manually:

```bash
npm install --save-dev json-schema-to-typescript
npx json2ts user.schema.json > user.types.ts
```

Or inline with `@sinclair/typebox`, which bridges JSON Schema and TypeScript types:

```typescript
import { Type, Static } from '@sinclair/typebox';
import Ajv from 'ajv';

const UserSchema = Type.Object({
  username: Type.String({ minLength: 3, maxLength: 30 }),
  email:    Type.String({ format: 'email' }),
  age:      Type.Optional(Type.Integer({ minimum: 13 })),
});

type User = Static<typeof UserSchema>;  // automatically derived TypeScript type
// { username: string; email: string; age?: number }

const ajv = new Ajv();
const validate = ajv.compile(UserSchema);
// Works as a standard Ajv schema AND as a TypeScript type guard
```

---

## OpenAPI Integration

JSON Schema is the type system for OpenAPI (Swagger). Every `schema:` block in an OpenAPI spec is a JSON Schema:

```yaml
# openapi.yaml
paths:
  /users:
    post:
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUserRequest'
      responses:
        '201':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'

components:
  schemas:
    CreateUserRequest:
      type: object
      properties:
        username:
          type: string
          minLength: 3
        email:
          type: string
          format: email
      required: [username, email]
      additionalProperties: false
```

From a single OpenAPI file you can generate: Swagger UI documentation, client SDKs in any language, server-side validation middleware, and TypeScript types. Tools like `openapi-typescript`, `openapi-generator`, and `swagger-codegen` handle the generation.

---

## Testing with Schema-Generated Fixtures

Schemas are also useful for generating realistic test data that matches your constraints. If your schema says a field has `minLength: 3` and `maxLength: 30`, your test should include a value at exactly 3 characters, at exactly 30, and both boundaries ± 1.

A schema-aware test matrix for a string field with `minLength: 3`:

| Input | Expected | Why |
|---|---|---|
| `""` (empty) | Invalid | Below minimum |
| `"ab"` (2 chars) | Invalid | Below minimum |
| `"abc"` (3 chars) | Valid | Exactly at minimum |
| `"hello"` | Valid | Within range |
| 30-char string | Valid | Exactly at maximum |
| 31-char string | Invalid | Above maximum |
| `null` | Invalid | Wrong type |
| `123` (integer) | Invalid | Wrong type |

Multiply this across every field in your schema and you have a comprehensive validation test suite. The [JSON Formatter](/tools/json-formatter)'s validation feature helps catch malformed JSON before schema validation, saving a round-trip to the validator.

---

## Conditional Validation: if / then / else

JSON Schema Draft 7 introduced `if`/`then`/`else` for conditional validation — validating part of a schema only when a condition is met. This is the right tool for schemas where the required fields depend on the value of another field.

```json
{
  "type": "object",
  "properties": {
    "paymentMethod": { "type": "string", "enum": ["card", "bank_transfer", "crypto"] },
    "cardNumber":    { "type": "string" },
    "iban":          { "type": "string" },
    "walletAddress": { "type": "string" }
  },
  "required": ["paymentMethod"],
  "if":   { "properties": { "paymentMethod": { "const": "card" } } },
  "then": { "required": ["cardNumber"] },
  "else": {
    "if":   { "properties": { "paymentMethod": { "const": "bank_transfer" } } },
    "then": { "required": ["iban"] },
    "else": { "required": ["walletAddress"] }
  }
}
```

This schema requires `cardNumber` for card payments, `iban` for bank transfers, and `walletAddress` for crypto — without any of those fields being globally required. The nested `if`/`else` handles three cases cleanly.

In Ajv, `if`/`then`/`else` is supported in Draft 7 mode (the default for Ajv 8):

```javascript
const ajv = new Ajv({ allErrors: true });
// Works out of the box — no extra configuration needed
const validate = ajv.compile(paymentSchema);
```

---

## Validating API Responses (Not Just Inputs)

Most developers use JSON Schema for input validation — checking what comes *into* the API. Response validation — checking what comes *out* — is underused but valuable in two contexts:

**1. Testing API contracts:** When writing integration tests against a third-party API or a microservice, validate that the response matches your expected schema. A breaking change in a dependency shows up as a schema validation failure before it causes a runtime error in production.

```javascript
// In a test file
const responseSchema = {
  type: 'object',
  properties: {
    id:    { type: 'string', format: 'uuid' },
    name:  { type: 'string' },
    email: { type: 'string', format: 'email' },
  },
  required: ['id', 'name', 'email'],
};

const validate = ajv.compile(responseSchema);

test('GET /users/:id returns a valid user', async () => {
  const res = await fetch('/users/123');
  const data = await res.json();
  const valid = validate(data);
  expect(valid).toBe(true);
  if (!valid) console.log(validate.errors);
});
```

**2. SDK type safety:** If you publish an SDK for your API, generate TypeScript types from your response schemas using `json-schema-to-typescript`. Your SDK consumers get compile-time type safety that mirrors the runtime schema — and when you update the schema, the generated types update automatically.

---

## Schema Storage and Distribution

For large applications, schemas live in multiple places: the API repository, client SDKs, documentation, database constraints. Keeping them in sync is a maintenance problem.

**Single source of truth approaches:**

- **Schema registry:** A versioned store (AWS Glue Schema Registry, Confluent Schema Registry, or a simple S3 bucket with versioned JSON files) that all services reference at startup.
- **OpenAPI spec as canonical source:** Maintain one `openapi.yaml`; generate validation schemas, client types, and documentation from it as a build step.
- **Shared npm/PyPI package:** Publish your domain schemas as a versioned package consumed by all services. Schema updates trigger a version bump and a coordinated deploy.

The [JSON Formatter](/tools/json-formatter) is useful during schema development — paste a schema or a sample payload, verify it is valid JSON, and format it to check the structure before feeding it to a validator.

---

## Common Mistakes

**Using `type: "number"` when you mean `type: "integer"`.** JSON Schema's `number` includes decimals. `integer` rejects `1.5`. Use `integer` for IDs, counts, and ages.

**Not adding `additionalProperties: false` on input schemas.** Without it, your API silently accepts unknown fields. A user who sends `{"admin": true}` alongside a valid payload will have that field ignored — or worse, processed if your handler naively spreads `req.body` into a database insert.

**Using `format` without a format validator plugin.** The `format` keyword in Ajv is a no-op by default — it only validates if you have added a format validator (via `ajv-formats`). Your schema appears to be validating email format but is not.

**Overly strict schemas on response payloads.** If your client validates server responses against a schema with `additionalProperties: false`, a server-side addition of a new optional field will break all existing clients. Responses should be validated more permissively than inputs.
