---
type: Domain Guide
title: Survival Game UI
description: Bounded visual observations and a proposed survival wireframe.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# Survival Game UI

Primary role: genre-specific game-interface brief.

## Repository Boundary

Locally authored analysis from three itch.io game pages opened through Aside on 2026-09-28. Store tags overlap; stills do not establish input behavior, timing, or prevalence. The wireframe is a proposal, not a reconstruction.

## Reusable Method

1. Name the player task using [Game UI Element Patterns](../elements.md).
2. Compare the observations with this game's actual task; reject unsupported regions.
3. Choose an [input and screen target](../platforms/index.md), then test the proposal in the running game.

## Observed Screens

- Nun Massacre's scene shows little persistent chrome; a separate title/options screen is typographic and sparse.
- Project Aether uses first-person weapon framing with little or no visible HUD.
- TOUCHSTARVED is a visual novel appearing under the survival tag and is not suitable evidence for survival resource displays.
- These frames support a minimal, atmosphere-first variant. Health, hunger, crafting inventory and other resource meters require more evidence; do not assert them as observed here.

## Opinionated Guidance

Keep only regions that serve this game; these stills do not establish a default HUD.

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

- [Game page 1](https://puppetcombo.itch.io/nun-massacre)
- [Game page 2](https://redspringstudio.itch.io/touchstarved)
- [Game page 3](https://verrial.itch.io/projectaether)

## IA Navigation

Parent: [Genre Guide Index](index.md).
Next: [Input And Screen Targets](../platforms/index.md).
