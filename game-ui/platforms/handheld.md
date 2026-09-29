---
type: Domain Guide
title: Handheld Game UI
description: Input and screen-target constraints for handheld game interfaces.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# Handheld Game UI

Primary role: input and viewing-target brief.

## Repository Boundary

This target describes an input/viewing context, not a store-exclusive platform, game, or universal layout. Genre and player task still own the primary composition. The practical guidance below is locally authored and bounded by the named official sources.

## Reusable Method

1. Choose the game task from [Element Patterns](../elements.md) and an applicable [Genre Guide](../genres/index.md).
2. Answer the target question: Do the same tasks remain readable and operable on a small screen?
3. Exercise the verification cases on the actual device and in Unity Play Mode.

## Opinionated Guidance

Reflow crowded HUDs and side panels instead of uniformly shrinking a desktop layout. Test 16:10 and taller or wider formats; leave room for safe areas and an on-screen keyboard.

## Platform-Specific Guidance

Default controller configuration should reach all functions; text fields should summon an on-screen keyboard. Mixed trackpad/mouse and controller input should not lock each other out.

## Unsupported Absolutes

- A screenshot does not establish the supported input modes.
- This target does not imply an exclusive storefront or operating system.
- A single reference resolution is not evidence of responsive behavior.

## Verification Contract

- Small-screen labels, text size and button reach
- On-screen keyboard opens for text input
- Mixed input and controller glyph changes without navigation loss

## Source, License, And Attribution

The recommendations are locally authored from these official sources, rechecked on 2026-09-28. No source images are stored.

- [Steam Deck recommendations](https://partner.steamgames.com/doc/steamhardware/recommendations)
- [Xbox text readability](https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/101)
- [Apple designing for games](https://developer.apple.com/design/human-interface-guidelines/designing-for-games)

## IA Navigation

Parent: [Input And Screen Targets](index.md).
Next: [Genre Guide Index](../genres/index.md).
