---
type: Shared Infrastructure Contract
title: Consumer Reference Receiver Contract
description: Required handoff seam for optional consumer-owned reference records.
lifecycle: stable
---

# Consumer Reference Receiver Contract

Every implementation handoff includes the consumer-reference field. Applicability is optional: a handoff either declares one record or states why no record applies.

## Handoff Shape

Declared reference:

```txt
Consumer reference: declared
Consumer reference record: consumer-reference/path/to/record.json
```

Not applicable:

```txt
Consumer reference: not_applicable
Consumer reference reason: This handoff does not require consumer-specific visual or component guidance.
```

`not_applicable` requires a sentence reason. A declared handoff points to exactly one canonical record and does not duplicate its owner, maturity, support, scope, or artifact data.

## Repository-Local Record Boundary

`declared` accepts only a normalized POSIX repository-relative path ending in `.json`. The path must exist beneath the current repository root and contain valid JSON. Absolute paths, URI schemes, network paths, query or fragment redirects, `..` segments, non-normalized paths, filesystem redirects, and symlink escapes are rejected.

External consumers keep their canonical record in their own repository and apply the same rule relative to that repository root. A StyleGallery handoff never resolves a network record.

## Record Semantics

- `maturity` describes lifecycle: `experimental`, `stable`, or `deprecated`.
- `artifact_mode` describes how the artifact is held: `schema_only`, `consumer_local`, `governed_local`, or `external_consumer`.
- Maturity and artifact mode are separate fields and cannot substitute for one another.
- `stable` cannot have ended support. `deprecated` requires a replacement and removal trigger.
- Repository-owned fixtures disclose `fixture_independence: "related"`; they do not count as independent consumers.
- Current ownership truth is `owner.enforcement: "placeholder"` and `review_independence: "single_account"`. Boolean aliases are not accepted.

## Ownership And Dependency

Consumer-reference infrastructure is owned by repository governance and validation review, currently represented by the same `@changeroa` placeholder account. This is one account, not independent review.

Dependency flows from a consumer or profile to Layout. `layout/**`, `patterns/**`, `scripts/pattern-data.mjs`, and `CATALOG.md` must not import consumer-reference records, profile data, tokens, decorative values, or themes.

The no-dependency validator blocks direct spellings and literal fragments assembled through concatenation, template literals, or `path.join`. This bounded static check does not claim general JavaScript data-flow analysis; guarded sources must not hide reference paths behind variables or runtime computation.

## IA Navigation

Parent: [Consumer Reference](index.md).
Next: [Executable Evidence Coverage](../quality/evidence/executable-evidence.md).
