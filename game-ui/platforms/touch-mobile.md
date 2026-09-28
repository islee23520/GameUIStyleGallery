---
type: Domain Guide
title: Touch And Mobile Game UI
description: Input and screen-target constraints for touch and mobile game interfaces.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# Touch And Mobile Game UI

Primary role: input and viewing-target brief.

## Repository Boundary

This target describes an input/viewing context, not a store-exclusive platform, game, or universal layout. Genre and player task still own the primary composition. The practical guidance below is locally authored and bounded by the named official sources.

## Reusable Method

1. Choose the game task from [Element Patterns](../elements.md) and an applicable [Genre Guide](../genres/index.md).
2. Answer the target question: Can thumbs reach controls without hiding play or colliding with device cutouts?
3. Exercise the verification cases on the actual device and in Unity Play Mode.

## Opinionated Guidance

Use platform safe areas; place optional virtual controls only when direct touch cannot express movement and actions. Keep essential targets out of the bottom gesture region and verify portrait and landscape separately.

## Platform-Specific Guidance

Test one- and two-thumb reach, gestures, controller coexistence when supported, and accessible alternatives to gestures. Do not infer touch support from a screenshot.

## Unsupported Absolutes

- A screenshot does not establish the supported input modes.
- This target does not imply an exclusive storefront or operating system.
- A single reference resolution is not evidence of responsive behavior.

## Verification Contract

- Safe area on notched devices in portrait and landscape
- Touch controls do not obscure the primary target
- All essential actions accessible without precision taps

## Source, License, And Attribution

The recommendations are locally authored from these official sources, rechecked on 2026-09-28. No source images are stored.

- [Apple game controls](https://developer.apple.com/design/human-interface-guidelines/game-controls)
- [Apple designing for games](https://developer.apple.com/design/human-interface-guidelines/designing-for-games)
- [Xbox UI navigation](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/112)

## IA Navigation

Parent: [Input And Screen Targets](index.md).
Next: [Genre Guide Index](../genres/index.md).
