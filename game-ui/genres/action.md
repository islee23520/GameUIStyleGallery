---
type: Domain Guide
title: Action Game UI
description: Bounded visual observations and a proposed action wireframe.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# Action Game UI

Primary role: genre-specific game-interface brief.

## Repository Boundary

Locally authored analysis from three itch.io game pages opened through Aside on 2026-09-28. Store tags overlap; stills do not establish input behavior, timing, or prevalence. The wireframe is a proposal, not a reconstruction.

## Reusable Method

1. Name the player task using [Game UI Element Patterns](../elements.md).
2. Compare the observations with this game's actual task; reject unsupported regions.
3. Choose an [input and screen target](../platforms/index.md), then test the proposal in the running game.

## Observed Screens

- X-YZE places a short resource/life mark at the bottom-left and a compact action slot at the bottom-center, leaving its small arena mostly visible.
- Grandfather's Estate uses horror-FPS restraint (ammo-only in one frame, absent HUD in another); it should be classified by its shooter subgenre, not generalized to all action games.
- The botting-themed RPG uses a bottom ability row and large corner resource orbs plus optional configuration windows. Its action tag overlaps simulation and RPG.

## Opinionated Guidance

action is an umbrella filter; choose the shooter, arena, or ability-driven layout before drawing any HUD. No universal action HUD follows from these screenshots.

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

- [Game page 1](https://darkfairyrune.itch.io/x-yze)
- [Game page 2](https://notsospecialgames.itch.io/grandfathers-estate)
- [Game page 3](https://yaxworks.itch.io/game-about-botting-in-an-mmorpg)

## IA Navigation

Parent: [Genre Guide Index](index.md).
Next: [Input And Screen Targets](../platforms/index.md).
