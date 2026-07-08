---
type: Quality Guide
title: Quality Principles
description: Shared principles for the layout-gallery quality gate layer.
---

# Quality Principles

These principles govern the `quality/` layer. They sit beside the layout pattern contract and do not change the scope of reusable pattern CSS.

## Principles

1. Principles before evidence
   - A source, screenshot, scan, or token file becomes useful only when attached to a clear claim.
   - Do not use evidence pages as a link dump or hidden rulebook.

2. Layout remains spatial
   - Layout gates own structure, flow, sizing, alignment, spacing mechanics, scrolling, ratio, containment, source order, and focus order.
   - Brand, typography voice, color expression, shadow, animation, decoration, and product visual identity stay outside reusable pattern CSS.

3. Accessibility precedes taste
   - Accessibility and task completion outrank visual preference.
   - Automated accessibility scans assist evaluation; they do not determine accessibility by themselves.

4. Visual QA evidence precedes visual judgment
   - Rendered captures, state screenshots, and visual diffs should exist before visual critique claims.
   - Screenshot diffs show rendered change, not usability.

5. Subjective review needs a warrant
   - A subjective objection can block only when tied to a principle, task, brief, persona, accessibility risk, provenance risk, or missing evidence.
   - Otherwise it is a review note or design debt, not a gate failure.

6. Tokens are contract surfaces
   - Design tokens can support consistency, portability, and source lineage.
   - A token file does not prove visual quality.

7. Debt stays visible
   - Accepted design or accessibility debt must name the affected users, evidence gap, owner, and review trigger.
   - Critical accessibility or task-completion failures are not ordinary debt.

## Outcomes

- `pass`: evidence satisfies the gate within its stated boundary.
- `review_required`: evidence exists, but human judgment is required.
- `blocked`: a principle, accessibility requirement, task requirement, provenance boundary, or evidence requirement is violated.
- `informational`: useful reference, but not an admissible quality claim.

## Guardrail Vocabulary

- `accessibility precedence`: accessibility and task completion outrank taste.
- `visual QA limits`: rendered evidence supports review but does not decide design quality alone.
- `screenshot diff limits`: screenshot diffs show rendered change, not usability.
- `automated accessibility scan limits`: automated scans assist evaluation, not determine accessibility.
