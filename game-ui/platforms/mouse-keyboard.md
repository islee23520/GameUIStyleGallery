---
type: Domain Guide
title: Mouse And Keyboard Game UI
description: Input and screen-target constraints for mouse and keyboard game interfaces.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# Mouse And Keyboard Game UI

Primary role: input and viewing-target brief.

## Repository Boundary

This target describes an input/viewing context, not a store-exclusive platform, game, or universal layout. Genre and player task still own the primary composition. The practical guidance below is locally authored and bounded by the named official sources.

## Reusable Method

1. Choose the game task from [Element Patterns](../elements.md) and an applicable [Genre Guide](../genres/index.md).
2. Answer the target question: How does the player switch between precise pointer targeting, hotkeys, and sequential keyboard navigation?
3. Exercise the verification cases on the actual device and in Unity Play Mode.

## Opinionated Guidance

Allow dense but resizable panels beside the playfield; keep hover details available by focus or click as well. Do not impose one HUD on FPS, strategy and narrative games.

## Platform-Specific Guidance

Support both pointer and keyboard-only traversal. Maintain a logical focus order when panels move, remap commands in settings, and show current key labels rather than fixed glyphs.

## Unsupported Absolutes

- A screenshot does not establish the supported input modes.
- This target does not imply an exclusive storefront or operating system.
- A single reference resolution is not evidence of responsive behavior.

## Verification Contract

- Pointer hover and click for every interactive region
- Keyboard-only path through controls and an exit from each modal
- Text scaling without two-direction scrolling

## Source, License, And Attribution

The recommendations are locally authored from these official sources, rechecked on 2026-09-28. No source images are stored.

- [Xbox UI navigation](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/112)
- [Xbox text readability](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/101)

## IA Navigation

Parent: [Input And Screen Targets](index.md).
Next: [Genre Guide Index](../genres/index.md).
