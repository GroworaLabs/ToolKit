---
title: "Introducing the QA & Testing Category"
description: "We've launched a dedicated QA & Testing category with tools built for one specific job: generating test data that actually breaks things."
tags: ["new category", "qa", "testing"]
tools: ["form-test-data-generator", "api-assertion-builder", "mock-data-generator"]
publishedAt: "2026-05-17"
author: "ryan-fletcher"
---

Testing tools are a category we've been building toward since we launched the mock data generator. Today we're making it official: ToolKit now has a [QA & Testing category](/tools/qa-testing).

## What's in it

**[Form Test Data Generator](/tools/form-test-data-generator)** is the primary tool. You build a form schema — up to 10 fields with types like email, phone, date, URL, number — and it generates 12 test case categories for each field automatically:

- Valid input
- Invalid format
- Empty string
- Null / missing
- Boundary values (min length, max length, one over the limit)
- Special characters
- XSS payloads (`<script>alert(1)</script>` and variants)
- SQL injection strings (`'; DROP TABLE users; --`)
- Oversized input (10,000 characters)
- Unicode and emoji

Export the whole test matrix as CSV, JSON, or Markdown and paste it into your test suite or share it with QA.

**[API Assertion Builder](/tools/api-assertion-builder)** is the second tool. Paste a real JSON response from your API and it generates typed assertions for Jest, Playwright, pytest, and Supertest — type-safe by default, with options for exact-value or schema-only modes.

**[Mock Data Generator](/tools/mock-data-generator)** covers the data seeding side — 23 field types, 1–1000 rows, JSON or CSV output.

## Why this category

Testing tools have a different audience than most of our tools. They're not one-person utilities — they feed into team workflows. QA engineers, backend developers writing integration tests, and frontend devs testing form validation all have different needs from the same category of tool.

We built the Form Test Data Generator specifically because manually writing out test cases for a 10-field form is tedious and incomplete. The XSS and SQL injection payloads are the cases most often skipped when writing test cases by hand.

More tools for this category are planned.

[Browse QA & Testing tools →](/tools/qa-testing)
