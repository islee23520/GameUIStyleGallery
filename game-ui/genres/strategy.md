---
type: Domain Guide
title: Strategy Game UI
description: Bounded visual observations and a proposed strategy wireframe.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# Strategy Game UI

Primary role: genre-specific game-interface brief.

## Repository Boundary

Locally authored analysis from three itch.io game pages opened through Aside on 2026-09-28. Store tags overlap; stills do not establish input behavior, timing, or prevalence. The wireframe is a proposal, not a reconstruction.

## Reusable Method

1. Name the player task using [Game UI Element Patterns](../elements.md).
2. Compare the observations with this game's actual task; reject unsupported regions.
3. Choose an [input and screen target](../platforms/index.md), then test the proposal in the running game.

## Observed Screens

- Terraformer Wars shows a top-corner wave/count numeral and small bottom-center resource bars over a dark, nearly full-bleed battlefield. This is an action/defense hybrid, not evidence for every strategy UI.
- Mindustry's screenshots emphasize a dense top-down factory grid with colored production paths; these two sampled frames have little legible chrome. They do not establish resource-bar or command-panel placement.
- Lancer Tactics shows a turn-based hex/grid battlefield with outlined selected cells and units. One frame highlights a target area. The samples do not show a complete unit inspector or menu.

## Opinionated Guidance

- Inferred design direction for a local wireframe: leave the board dominant, provide an optional resource/turn strip and context panel, and distinguish selected cells. Test each variant rather than claiming those controls were observed in all three games.

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

- [Game page 1](https://wick.itch.io/lancer-tactics)
- [Game page 2](https://16bitnights.itch.io/terraformer-wars)
- [Game page 3](https://anuke.itch.io/mindustry)

## IA Navigation

Parent: [Genre Guide Index](index.md).
Next: [Input And Screen Targets](../platforms/index.md).
