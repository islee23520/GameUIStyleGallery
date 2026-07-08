---
type: Evidence Reference
title: Token Evidence
description: Design token contract surfaces and boundaries.
---

# Token Evidence

Tokens are contract surfaces for reusable design decisions.

## Can Support

- a value has a stable name and source lineage;
- related surfaces share a consistent value;
- a design decision can travel across tools or codebases;
- token categories and aliases are inspectable.

## Cannot Prove

- visual quality;
- accessibility;
- brand fit;
- motion comfort;
- task success.

## Boundary

Use tokens for shared design intent. Keep browser and layout mechanics such as `auto`, percentages, intrinsic sizing, and container-query units in CSS when they are layout behavior rather than design intent.
