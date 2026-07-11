---
type: Quality Gate
title: Layout Gate
description: Mechanical quality gate for StyleGallery Layout spatial pattern claims.
---

# Layout Gate

The layout gate is the existing pattern contract made explicit as a quality gate.

## Scope

Layout owns:

- semantic structure where it affects layout;
- source order and focus order;
- flow, sizing, alignment, spacing mechanics, scrolling, ratio, and containment;
- explicit constraints and change points;
- viewport, container, content, direction, writing-mode, and interaction stress.

Layout does not own brand, typography voice, color expression, shadow, animation, decoration, or product visual identity.

## Evidence

Accepted layout evidence includes:

- pattern frontmatter and required sections;
- HTML and CSS snippets;
- required core properties and break-if-removed notes;
- constraints and scroll ownership;
- accessibility and source-order notes;
- validator output from `scripts/validate-patterns.mjs`;
- manual stress checks from the repository verification matrix.

## Blocking Conditions

Block a layout claim when:

- the pattern solves more than one primary spatial problem without being marked as a composite;
- required contract sections are missing;
- reusable CSS includes decorative properties without a layout-specific reason;
- source order, focus order, or scroll ownership is unclear;
- reflow claims are unsupported by the CSS mechanism.

## Boundary

Visual polish is not a layout pass/fail condition. If a concern is about color, typography voice, surface treatment, motion, or brand fit, route it to the design claim gate.

## IA Navigation

Parent: [Gate Contracts](index.md).
Next: [Evidence References](../evidence/index.md) when a gate needs admissible support.
