---
type: Domain Guide
title: Platformer Game UI
description: Bounded visual observations and a proposed platformer wireframe.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# Platformer Game UI

Primary role: genre-specific game-interface brief.

## Repository Boundary

Locally authored analysis from three itch.io game pages opened through Aside on 2026-09-28. Store tags overlap; stills do not establish input behavior, timing, or prevalence. The wireframe is a proposal, not a reconstruction.

## Reusable Method

1. Name the player task using [Game UI Element Patterns](../elements.md).
2. Compare the observations with this game's actual task; reject unsupported regions.
3. Choose an [input and screen target](../platforms/index.md), then test the proposal in the running game.

## Observed Screens

- Treacherous Trials shows a 2D level with hazards and a tiny stage label near the top; the rest of the screen is the playfield.
- Celeste shows a portrait dialogue box across the top during a story beat, and another frame with the character and level art but no persistent HUD.
- Sheepy shows a near-empty cinematic platforming scene with the player silhouette; no HUD is visible in the sampled frames.

## Opinionated Guidance

start from an unobstructed playfield, add collectible/time widgets only when that game's task needs them, and use a temporary dialogue layer rather than a persistent side panel.

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

- [Game page 1](https://gdcolon.itch.io/treacheroustrials)
- [Game page 2](https://maddymakesgamesinc.itch.io/celeste)
- [Game page 3](https://mrsuicidesheep.itch.io/sheepy)

## IA Navigation

Parent: [Genre Guide Index](index.md).
Next: [Input And Screen Targets](../platforms/index.md).
