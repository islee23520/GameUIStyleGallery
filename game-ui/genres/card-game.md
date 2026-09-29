---
type: Domain Guide
title: Card Game Game UI
description: Bounded visual observations and a proposed card game wireframe.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# Card Game Game UI

Primary role: genre-specific game-interface brief.

## Repository Boundary

Locally authored analysis from three itch.io game pages opened through Aside on 2026-09-28. Store tags overlap; stills do not establish input behavior, timing, or prevalence. The wireframe is a proposal, not a reconstruction.

## Reusable Method

1. Name the player task using [Game UI Element Patterns](../elements.md).
2. Compare the observations with this game's actual task; reject unsupported regions.
3. Choose an [input and screen target](../platforms/index.md), then test the proposal in the running game.

## Observed Screens

- Die in the Dungeon frames a central board with compact resource/status tokens around it and a row of selectable pieces or cards along the bottom. The second sampled frame puts a status overlay on that same board.
- Neo Forge uses opposing board halves and a bottom hand; its other frame is a dense card-collection grid. These are distinct play and collection surfaces.
- FloppyScryption uses a central 3-by-3 board, side explanatory text, and a bottom hand or draw region; the second frame changes the available pieces without changing the board's ownership.

## Opinionated Guidance

keep board, hand, opponent, and status regions distinct, and provide a separate collection/deck-builder mode. No timing or input behavior is established by stills.

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

- [Game page 1](https://alarts.itch.io/die-in-the-dungeon)
- [Game page 2](https://dokkodolabs.itch.io/neo-forge)
- [Game page 3](https://femboyashy.itch.io/floppyscryption)

## IA Navigation

Parent: [Genre Guide Index](index.md).
Next: [Input And Screen Targets](../platforms/index.md).
