---
type: Domain Guide
title: Racing Game UI
description: Bounded visual observations and a proposed racing wireframe.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# Racing Game UI

Primary role: genre-specific game-interface brief.

## Repository Boundary

Locally authored analysis from three itch.io game pages opened through Aside on 2026-09-28. Store tags overlap; stills do not establish input behavior, timing, or prevalence. The wireframe is a proposal, not a reconstruction.

## Reusable Method

1. Name the player task using [Game UI Element Patterns](../elements.md).
2. Compare the observations with this game's actual task; reject unsupported regions.
3. Choose an [input and screen target](../platforms/index.md), then test the proposal in the running game.

## Observed Screens

- PolyTrack's race frame keeps track and vehicle dominant, with a compact timer and small HUD along the bottom. Another screenshot is a track editor with a top tool row and a right component palette; do not mistake editor controls for race HUD.
- Pico World Race uses a tiny pixel-art viewport with place/lap or time indicators at the screen edges. At this scale the exact numerals are not reliably readable in the contact sheet.
- HELP! NO BRAKE's two sampled frames are minimal title or level graphics, not useful evidence for speedometer placement.

## Opinionated Guidance

compact time and position near the perimeter; editor mode is a distinct screen from racing. A tachometer is not established by this sample.

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

- [Game page 1](https://kodub.itch.io/polytrack)
- [Game page 2](https://edgarmendoza.itch.io/help-no-brake)
- [Game page 3](https://pak-9.itch.io/pico-world-race)

## IA Navigation

Parent: [Genre Guide Index](index.md).
Next: [Input And Screen Targets](../platforms/index.md).
