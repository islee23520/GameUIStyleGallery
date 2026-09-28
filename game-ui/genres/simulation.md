---
type: Domain Guide
title: Simulation Game UI
description: Bounded visual observations and a proposed simulation wireframe.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# Simulation Game UI

Primary role: genre-specific game-interface brief.

## Repository Boundary

Locally authored analysis from three itch.io game pages opened through Aside on 2026-09-28. Store tags overlap; stills do not establish input behavior, timing, or prevalence. The wireframe is a proposal, not a reconstruction.

## Reusable Method

1. Name the player task using [Game UI Element Patterns](../elements.md).
2. Compare the observations with this game's actual task; reject unsupported regions.
3. Choose an [input and screen target](../platforms/index.md), then test the proposal in the running game.

## Observed Screens

- Voices Of The Void shows a diegetic workstation screen with a numeric readout and monitor controls; its other sampled frame is an environment view with minimal persistent HUD.
- Dressmaker shows a clothing/mannequin composition view with selection swatches and a side tool/choice region. It is a customization simulation, not evidence for resource-management HUDs.
- The botting-themed MMO simulator shows a character and action bar with configuration windows. It is a meta-simulation and overlaps RPG; its windows cannot establish a default sim HUD.

## Opinionated Guidance

offer separate management, craft/customization, and diegetic-workstation layouts; do not collapse them into a single top-resource-bar template.

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

- [Game page 1](https://mrdrnose.itch.io/votv)
- [Game page 2](https://elyaradine.itch.io/dressmaker)
- [Game page 3](https://yaxworks.itch.io/game-about-botting-in-an-mmorpg)

## IA Navigation

Parent: [Genre Guide Index](index.md).
Next: [Input And Screen Targets](../platforms/index.md).
