---
type: Domain Guide
title: First-person shooter Game UI
description: Bounded visual observations and a proposed first-person shooter wireframe.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# First-person shooter Game UI

Primary role: genre-specific game-interface brief.

## Repository Boundary

Locally authored analysis from three itch.io game pages opened through Aside on 2026-09-28. Store tags overlap; stills do not establish input behavior, timing, or prevalence. The wireframe is a proposal, not a reconstruction.

## Reusable Method

1. Name the player task using [Game UI Element Patterns](../elements.md).
2. Compare the observations with this game's actual task; reject unsupported regions.
3. Choose an [input and screen target](../platforms/index.md), then test the proposal in the running game.

## Observed Screens

- Arcade FPS (ULTRAKILL 1-2): weapon silhouette icon + health bar with numeric value (75, 100) + secondary resource bar stacked bottom-left; center kept clear.
- Style-rank callout on the right edge ("BRUTAL", "ANARCHIC") with a decaying meter bar under it and a "+ KILL" event log line; score multiplier readout ("MULTIPLIER 0.00") mid-right.
- Boss health bar as a wide bar across the top with the boss name centered in it (ULTRAKILL 2).
- Horror FPS (Grandfather's Estate 3-4): near-zero HUD; only a small ammo readout "01 | 2" with the weapon name ("Old Shotgun") bottom-right, and nothing at all when exploring with a melee item.
- Military/realistic FPS (Project Aether 5-6): no HUD visible in marketing shots; the weapon model carries the screen.

## Opinionated Guidance

HUD density tracks the sub-genre: arcade shooters stack meters and score callouts, horror and realistic shooters strip down to ammo only or nothing.

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

- [Game page 1](https://hakita.itch.io/ultrakill-prelude)
- [Game page 2](https://notsospecialgames.itch.io/grandfathers-estate)
- [Game page 3](https://verrial.itch.io/projectaether)

## IA Navigation

Parent: [Genre Guide Index](index.md).
Next: [Input And Screen Targets](../platforms/index.md).
