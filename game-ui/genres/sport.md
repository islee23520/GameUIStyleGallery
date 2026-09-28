---
type: Domain Guide
title: Sport Game UI
description: Bounded visual observations and a proposed sport wireframe.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# Sport Game UI

Primary role: genre-specific game-interface brief.

## Repository Boundary

Locally authored analysis from three itch.io game pages opened through Aside on 2026-09-28. Store tags overlap; stills do not establish input behavior, timing, or prevalence. The wireframe is a proposal, not a reconstruction.

## Reusable Method

1. Name the player task using [Game UI Element Patterns](../elements.md).
2. Compare the observations with this game's actual task; reject unsupported regions.
3. Choose an [input and screen target](../platforms/index.md), then test the proposal in the running game.

## Observed Screens

- Soccer Physics has a tiny score bug centered above the two-goal playfield; its menu uses two large player-count buttons. The screenshots do not show a match clock.
- Klifur's climbing scene leaves most of the frame unobstructed and uses very small bottom-edge controls; a broadcast scoreboard would be inappropriate here.
- The sampled Super Video Golf frame emphasizes the course and player, with no legible persistent HUD in this scaled capture.

## Opinionated Guidance

a compact score-and-state overlay for head-to-head sports, but an optional or hidden HUD for exploratory sports. The sport tag alone does not determine a timer or broadcast layout.

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

- [Game page 1](https://torfi.itch.io/klifur)
- [Game page 2](https://fallahn.itch.io/super-video-golf)
- [Game page 3](https://ottoojala.itch.io/soccer-physics)

## IA Navigation

Parent: [Genre Guide Index](index.md).
Next: [Input And Screen Targets](../platforms/index.md).
