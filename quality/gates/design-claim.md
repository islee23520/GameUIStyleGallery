---
type: Quality Gate
title: Design Claim Gate
description: Contract for admitting non-layout design claims.
---

# Design Claim Gate

The design claim gate prevents evidence from becoming unsupported authority.

## Required Contract

Every non-layout design claim should state:

```txt
Principle:
Claim:
Context:
Warrant:
Evidence family:
Verification protocol:
Boundary or limitation:
Debt or escalation:
Decision:
```

## Evidence Families

- `mechanical`: file shape, headings, frontmatter, source lineage, token structure.
- `rendered`: screenshots, visual diffs, state captures, viewport captures.
- `accessibility`: WCAG/ACT checks, keyboard checks, contrast checks, assistive-technology/manual review.
- `interpretive`: heuristic evaluation, cognitive walkthrough, persona or task review.
- `empirical`: user testing, validated visual-aesthetics instruments, participant evidence.

## Blocking Conditions

Block a design claim when:

- it has evidence but no warrant;
- it treats a screenshot diff as proof of usability;
- it treats an automated accessibility scan as proof of accessibility;
- it cites public design systems as proof of universal quality;
- it conflicts with accessibility or task completion;
- it requires changes inside generated layout pattern surfaces.

## Boundary

This gate admits claims. It does not prescribe a product brand, palette, illustration style, typeface, animation system, or component library.
