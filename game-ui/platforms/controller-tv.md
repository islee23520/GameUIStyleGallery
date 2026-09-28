---
type: Domain Guide
title: Controller And TV Game UI
description: Input and screen-target constraints for controller and tv game interfaces.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# Controller And TV Game UI

Primary role: input and viewing-target brief.

## Repository Boundary

This target describes an input/viewing context, not a store-exclusive platform, game, or universal layout. Genre and player task still own the primary composition. The practical guidance below is locally authored and bounded by the named official sources.

## Reusable Method

1. Choose the game task from [Element Patterns](../elements.md) and an applicable [Genre Guide](../genres/index.md).
2. Answer the target question: Can every decision be reached from a couch without pointer precision?
3. Exercise the verification cases on the actual device and in Unity Play Mode.

## Opinionated Guidance

Prefer strong focus feedback, legible type at viewing distance and a safe-area inset. Make two-player surfaces explicit rather than assuming one active controller.

## Platform-Specific Guidance

Pick initial focus, directional neighbors, confirm, cancel and focus return for each screen. Keep glyphs current with the active controller, and allow remapping.

## Unsupported Absolutes

- A screenshot does not establish the supported input modes.
- This target does not imply an exclusive storefront or operating system.
- A single reference resolution is not evidence of responsive behavior.

## Verification Contract

- Digital D-pad and analog traversal in reading order
- Return from every submenu and modal without focus loss
- Legibility at target viewing distance and configured text scale

## Source, License, And Attribution

The recommendations are locally authored from these official sources, rechecked on 2026-09-28. No source images are stored.

- [Xbox UI navigation](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/112)
- [Xbox text readability](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/101)

## IA Navigation

Parent: [Input And Screen Targets](index.md).
Next: [Genre Guide Index](../genres/index.md).
