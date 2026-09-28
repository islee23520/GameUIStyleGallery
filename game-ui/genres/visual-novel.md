---
type: Domain Guide
title: Visual Novel Game UI
description: Bounded visual observations and a proposed visual novel wireframe.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# Visual Novel Game UI

Primary role: genre-specific game-interface brief.

## Repository Boundary

Locally authored analysis from three itch.io game pages opened through Aside on 2026-09-28. Store tags overlap; stills do not establish input behavior, timing, or prevalence. The wireframe is a proposal, not a reconstruction.

## Reusable Method

1. Name the player task using [Game UI Element Patterns](../elements.md).
2. Compare the observations with this game's actual task; reject unsupported regions.
3. Choose an [input and screen target](../platforms/index.md), then test the proposal in the running game.

## Observed Screens

- The Freak Circus puts character illustration above a full-width bottom dialogue strip with speaker name and text; decorative controls stay along the bottom edge.
- ERROR143's computer/chat simulation uses a multi-pane app shell with contact list, messages, status and actions rather than the character-over-dialogue composition.
- A Date with Death has an illustrated chat/choice layout and a separate messaging-history view.
- The genre has at least two distinct UI shapes: illustrated character plus bottom dialogue and diegetic desktop/chat UI. A universal dialogue wireframe would miss the latter.

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

- [Game page 1](https://garula.itch.io/the-freak-circus)
- [Game page 2](https://jennyvipham.itch.io/error143)
- [Game page 3](https://twoandahalfstudios.itch.io/a-date-with-death)

## IA Navigation

Parent: [Genre Guide Index](index.md).
Next: [Input And Screen Targets](../platforms/index.md).
