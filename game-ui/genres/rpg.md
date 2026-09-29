---
type: Domain Guide
title: Role-playing Game UI
description: Bounded visual observations and a proposed role-playing wireframe.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# Role-playing Game UI

Primary role: genre-specific game-interface brief.

## Repository Boundary

Locally authored analysis from three itch.io game pages opened through Aside on 2026-09-28. Store tags overlap; stills do not establish input behavior, timing, or prevalence. The wireframe is a proposal, not a reconstruction.

## Reusable Method

1. Name the player task using [Game UI Element Patterns](../elements.md).
2. Compare the observations with this game's actual task; reject unsupported regions.
3. Choose an [input and screen target](../platforms/index.md), then test the proposal in the running game.

## Observed Screens

- The botting-themed RPG screenshot shows a bottom action bar, two large circular resource orbs, a compact text objective/list at upper left, and a configuration dialog overlay with many toggles in the other frame. This is an atypical RPG sample, not a genre default.
- Amoris shows a drawn notebook spread as a full-screen narrative interface and a bottom dialogue panel over a pixel room. It does not support a universal RPG hotbar claim.
- Lancer Tactics overlaps strategy and RPG: grid tactics with a selected-cell outline, not the same UI grammar as either of the above.

## Opinionated Guidance

branch the RPG wireframe into action/ability, narrative/dialogue, and tactical/selection variants. Do not infer input behavior from these stills.

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

- [Game page 1](https://yaxworks.itch.io/game-about-botting-in-an-mmorpg)
- [Game page 2](https://xiaonur.itch.io/amoris)
- [Game page 3](https://wick.itch.io/lancer-tactics)

## IA Navigation

Parent: [Genre Guide Index](index.md).
Next: [Input And Screen Targets](../platforms/index.md).
