---
title: "Text Diff Algorithms Explained: How Git Compares Your Code"
description: "What Myers diff, patience diff, and histogram diff actually do, why whitespace changes clutter reviews, and how 3-way merges decide who wins a conflict."
category: "Developer Tools"
tools: ["text-diff"]
tags: ["diff", "git", "algorithms", "version-control"]
publishedAt: "2026-04-19"
author: "olivia-bennett"
---

## Diff Is the Quiet Foundation

Every time you `git diff`, every time GitHub shows a pull request, every time your IDE highlights changed lines in the gutter — a diff algorithm is running. It answers one question: **given two pieces of text, what is the smallest sequence of insertions and deletions that transforms one into the other?**

The answer sounds trivial. Computing it efficiently took decades of research, and the best algorithms still produce output that looks wrong to humans on specific inputs. This guide covers the three algorithms you'll meet in practice, the underlying math that unites them, and the common cases where each one wins.

## The Core Problem: Longest Common Subsequence

At the heart of every line-oriented diff is the **Longest Common Subsequence** problem. Given two sequences of lines, find the longest sequence of lines that appears in both *in the same order* (but not necessarily adjacent).

```
A: apple  banana  cherry  date
B: apple  cherry  date    elderberry
```

Longest common subsequence: `apple`, `cherry`, `date`. Anything not in the LCS is either a deletion (removed from A to get B) or an insertion (added to get from A to B).

Convert the LCS into diff output:

```
  apple
- banana
  cherry
  date
+ elderberry
```

The naive algorithm to find LCS is O(N × M) in time and space, where N and M are the number of lines. For large files, that's unacceptable. Every real-world diff tool uses a smarter approach.

You can see any two pieces of text diffed with the [Text Diff](/tools/text-diff) tool — line-by-line with colour-coded insertions and deletions.

## Myers Algorithm (1986): The Default

Eugene Myers's 1986 paper "An O(ND) Difference Algorithm and Its Variations" is the foundation of modern diff. The key insight: the running time depends on **D**, the edit distance (number of inserts + deletes), not on the file size.

For two files that are mostly similar, `D` is small, and the algorithm runs much faster than O(N × M). For two files that share nothing in common, it degrades to O(N²), which in practice means "the diff between your code and a random essay is slow" — fine, because nobody asks for that diff.

Myers is git's original default, used from 2005 until around 2017. It's still the default in many other tools (BSD `diff`, most IDE inline diffs). What it gets right: speed and correctness. What it sometimes gets wrong: **readability**.

The classic bad case is when a file has repeated blank lines or boilerplate. Myers might pair up blank line 5 of the old file with blank line 17 of the new file, producing a diff that's technically minimal but visually scrambled. A human reading the diff sees edits jumping around; the algorithm sees "fewest lines changed."

## Patience Diff (2006): Built for Readable Code Changes

Bram Cohen — better known as the author of BitTorrent — proposed **patience diff** in 2006, with a different philosophy: produce the most *human-readable* output, not necessarily the shortest.

Patience diff works by finding lines that appear **exactly once** in both files (unique anchors) and using those to structure the output. Between anchors, it recurses with the same approach on the remaining slice.

This handles the boilerplate problem well. If a file has 20 blank lines, none of them are unique, so patience skips them and anchors on actual code lines. The resulting diff shows function-level moves as function-level moves, not as "blank line 3 deleted, blank line 5 inserted."

Where patience wins: refactors that move functions between files, code where many lines are identical (tests with similar assertions), files with lots of repeated syntax.

## Histogram Diff: Git's Current Default

Git introduced **histogram diff** in 2011 and made it the default in 2019 via `diff.algorithm = histogram`. It's patience diff with a smarter strategy for choosing anchors: instead of requiring anchors to appear exactly once, it uses a frequency histogram and prefers rarer lines.

Practical differences between patience and histogram are usually small. Histogram tends to produce slightly cleaner diffs on files with near-repeats (like sequences of `}` braces or `end` keywords). It's meaningfully faster than patience on large files.

**Configuring git to use a specific algorithm:**

```bash
git config --global diff.algorithm histogram    # default since 2.41
git config --global diff.algorithm patience
git config --global diff.algorithm myers        # original default
git config --global diff.algorithm minimal      # Myers + extra work for shorter diffs
```

For a specific command, `git diff --histogram` or `git diff --patience` overrides the default.

## Line vs Word vs Character

Everything so far assumed *line-level* diffing. That's what git uses by default because it's fast, robust, and maps naturally to commits.

But line diffs hide information. A typo fix inside a 120-character line shows the whole line as changed. Word-level and character-level diffs fix that:

- **Word diff** — GitHub's side-by-side view, `git diff --word-diff`. Highlights only the changed words within modified lines.
- **Character diff** — inline editor decorations, some IDE gutters. Marks the exact character range.

Word and character diffs are usually computed on top of a line diff: first find the changed lines, then run a second diff within each changed line. They're more expensive but usually only run on lines that are already known to differ.

## Three-Way Merges

A diff compares two files; a **merge** combines three. When you merge branch A into branch B, git has:

- The **common ancestor** — the commit where A and B diverged.
- **A's changes** — `diff(ancestor, A)`.
- **B's changes** — `diff(ancestor, B)`.

The merge applies both diffs to the ancestor. When A and B changed **different lines**, both changes apply cleanly. When A and B changed **the same lines** differently, you get a conflict — git inserts both versions separated by markers and asks the human to resolve.

Git's merge algorithm (`recursive`, the default) uses line-level diffs to detect conflicts. It can't see that "rename this function" and "use this function by its old name" are semantically incompatible — it only sees line text. That's why some conflicts are trivially resolvable by taking either side, and others require understanding both branches' intent.

## Whitespace, the Constant Annoyance

A codebase with tabs-vs-spaces churn, line-ending churn (CRLF vs LF on Windows), or trailing-whitespace fixes produces diffs where every line is "changed" but nothing meaningful happened.

Git has flags for this:

- `git diff -w` — ignore all whitespace differences.
- `git diff --ignore-space-change` — treat any amount of whitespace as equivalent to a single space.
- `git diff --ignore-blank-lines` — skip added or removed blank lines.

For code review, GitHub and GitLab both have "hide whitespace" toggles that apply these server-side.

The more robust fix is preventing the churn in the first place: `.editorconfig` in the repo, `core.autocrlf` and `.gitattributes` to pin line endings, and a formatter (Prettier, Black, rustfmt) that normalises whitespace automatically.

## Rename Detection

Git's diff output can show a file as a rename (`rename from foo.js to bar.js`) rather than `delete foo.js` + `create bar.js`. That's not stored in the commit — it's inferred heuristically at diff time by comparing file contents.

The threshold is configurable via `diff.renameLimit` and `diff.renames`. By default, git treats files as renames if they share >50% of their content. Pair with `-M90%` on a diff command to require >90% similarity, which catches genuine renames without treating a rewrite as one.

## Common Mistakes

- **Assuming diff shows "what the author did."** Diff shows a minimal edit, not a history. The author may have done something else; the diff is just the shortest path between old and new.
- **Reviewing a whitespace-only diff.** Use `-w`. Every second saved on noise-filtering is a second spent on actual review.
- **Blaming the algorithm for bad output.** If a diff is unreadable, try `--patience` or `--histogram`. Different algorithms give different results.
- **Expecting rename detection to be exact.** Heuristic. Tune with `-M` if it matters.

## Try It Now

Paste any two pieces of text into the [Text Diff](/tools/text-diff) tool to see a line-by-line comparison with insertions, deletions, and context. Useful for comparing configuration files, checking what a refactor actually changed, or spotting differences in pasted error messages.
