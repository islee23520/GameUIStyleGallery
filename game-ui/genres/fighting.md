---
type: Domain Guide
title: Fighting Game UI
description: Bounded visual observations and a proposed fighting wireframe.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# Fighting Game UI

Primary role: genre-specific game-interface brief.

## Repository Boundary

Locally authored analysis from three itch.io game pages opened through Aside on 2026-09-28. Store tags overlap; stills do not establish input behavior, timing, or prevalence. The wireframe is a proposal, not a reconstruction.

## Reusable Method

1. Name the player task using [Game UI Element Patterns](../elements.md).
2. Compare the observations with this game's actual task; reject unsupported regions.
3. Choose an [input and screen target](../platforms/index.md), then test the proposal in the running game.

## Observed Screens

- First Cut presents two sword fighters on a mostly empty side-view stage. No persistent mirrored health bars or timer are visible in either sampled frame.
- Half Sword likewise puts two fighters and the arena first; the sampled frames do not establish a conventional fighting-game HUD.
- Sharpest Spear has a tiny bottom-edge meter in gameplay and replaces it with a large centered “VICTORY” result. Its result is a separate state, not a persistent HUD layer.

## Opinionated Guidance

distinguish arena-first swordplay, health-meter bouts, and result overlays. Do not claim mirrored health bars or a round timer from these three samples.

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

- [Game page 1](https://drasnus.itch.io/first-cut)
- [Game page 2](https://knives-frank.itch.io/halfsword)
- [Game page 3](https://npjarcade.itch.io/sharpest-spear)

## IA Navigation

Parent: [Genre Guide Index](index.md).
Next: [Input And Screen Targets](../platforms/index.md).
