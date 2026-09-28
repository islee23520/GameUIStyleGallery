---
type: Domain Guide
title: Music Game UI
description: Bounded visual observations and a proposed music wireframe.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# Music Game UI

Primary role: genre-specific game-interface brief.

## Repository Boundary

Locally authored analysis from three itch.io game pages opened through Aside on 2026-09-28. Store tags overlap; stills do not establish input behavior, timing, or prevalence. The wireframe is a proposal, not a reconstruction.

## Reusable Method

1. Name the player task using [Game UI Element Patterns](../elements.md).
2. Compare the observations with this game's actual task; reject unsupported regions.
3. Choose an [input and screen target](../platforms/index.md), then test the proposal in the running game.

## Observed Screens

- Friday Night Funkin' shows four directional note columns arranged across the top and character performance in the middle. A bottom health/performance bar separates two player icons.
- Lightners Live Plus makes its note lane the central task surface with score/combo readouts at the perimeter.
- A Dance of Fire and Ice keeps the timing path itself central and largely omits conventional HUD bars in the sampled frames.

## Opinionated Guidance

define a note/lane-first layout and a path-first layout; combo feedback is transient. Static images cannot establish timing windows or latency behavior.

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

- [Game page 1](https://ninja-muffin24.itch.io/funkin)
- [Game page 2](https://ezioeagle.itch.io/lightners-live-plus)
- [Game page 3](https://fizzd.itch.io/a-dance-of-fire-and-ice)

## IA Navigation

Parent: [Genre Guide Index](index.md).
Next: [Input And Screen Targets](../platforms/index.md).
