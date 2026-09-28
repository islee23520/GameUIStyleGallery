---
type: Domain Guide
title: Adventure Game UI
description: Bounded visual observations and a proposed adventure wireframe.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# Adventure Game UI

Primary role: genre-specific game-interface brief.

## Repository Boundary

Locally authored analysis from three itch.io game pages opened through Aside on 2026-09-28. Store tags overlap; stills do not establish input behavior, timing, or prevalence. The wireframe is a proposal, not a reconstruction.

## Reusable Method

1. Name the player task using [Game UI Element Patterns](../elements.md).
2. Compare the observations with this game's actual task; reject unsupported regions.
3. Choose an [input and screen target](../platforms/index.md), then test the proposal in the running game.

## Observed Screens

- The Additional Dimension and ANATOMY prioritize environment framing and atmospheric type with little or no persistent HUD in the sampled frames.
- To Eat a God includes a full-screen illustrated choice/dialogue composition, where narrative text and options are the screen rather than an overlay on a combat HUD.

## Opinionated Guidance

an empty world view plus an authored dialogue state. Do not add health, minimap, or quest tracker as a default when the sample provides none.

## Platform-Specific Guidance

No device support is inferred from screenshots. Choose the target's navigation, text scale, and safe area from [Input And Screen Targets](../platforms/index.md).

## Unsupported Absolutes

- Three pages do not represent a genre census.
- A still does not prove input support, focus order, or tween timing.
- Tags overlap, so a title may also fit another page here.

## Verification Contract

Capture default and exceptional states from a real build; exercise each supported input method and record where this proposal does and does not apply.

## Source, License, And Attribution

Only page links are cited. No screenshot, store record, or media is committed. Observations and wireframes are locally authored.

- [Game page 1](https://notsospecialgames.itch.io/the-additional-dimension)
- [Game page 2](https://kittyhorrorshow.itch.io/anatomy)
- [Game page 3](https://soffis-mbm.itch.io/to-eat-a-god)

## IA Navigation

Parent: [Genre Guide Index](index.md).
Next: [Input And Screen Targets](../platforms/index.md).
