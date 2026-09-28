---
type: Domain Guide
title: Crusader Kings III PC UI State Brief
description: Original PC-first map, character, realm and event wireframe states with explicit evidence limits.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# Crusader Kings III PC UI State Brief

Primary role: original PC-first strategy screen and state example.

## Repository Boundary

The [official overview](https://www.paradoxinteractive.com/games/crusader-kings-iii/about) describes dynasties, playable rulers, character traits, titles, realm management, armies and dynamic events. It does **not** validate the layout, labels, controls, timings or exceptional states in this example. The HTML wireframe contains no copied art, UI assets, screenshots or game data. The [console UI diary](https://www.paradoxinteractive.com/games/crusader-kings-iii/news/ck3-console-dev-diary-3-uiux-and-controls) illustrates why a controller adaptation needs its own route; this brief prioritizes PC pointer/keyboard use.

## Reusable Method

1. Keep the political map as persistent spatial context while one task-owned pane inspects a selection.
2. Give character, council, succession and war separate task states; do not bury all decisions in one generic overlay.
3. Treat an event and a war confirmation as blocking modal states with a safe exit and consequence text.
4. Build loading, empty and error routes even though no claim is made that the shipped game presents them this way.
5. Verify each action and return path in a real game; the site's buttons only demonstrate a state transition.

## State Examples

| State ID | Player question | Main ownership | Suggested exit |
| --- | --- | --- | --- |
| `realm` | What needs my attention in my realm? | Map, resource/time strip, outliner and alerts. | Select a ruler or task. |
| `character` | Who is this ruler and what can I do? | Portrait placeholder, traits, relationships and claims beside map. | Close selection. |
| `council` | What task should this role perform? | Council role, assigned task, progress and expected effect. | Return to map. |
| `scheme` | What is the risk and progress? | Target, participants and risk/progress context. | Confirm or cancel. |
| `dynasty` | Who succeeds and which titles move? | Lineage, heir order, titles and warnings. | Return to map. |
| `event` | Which consequence do I accept? | Blocking narrative choice above a dimmed map. | Choose or back. |
| `war` | Is the goal and army ready? | War target, goal, readiness and costs. | Confirm or cancel. |
| `confirm` | Am I declaring the intended war? | Blocking consequence summary; cancel first. | Cancel or confirm. |
| `loading` | Is a new realm context loading? | System progress replacing stale controls. | Wait. |
| `empty` | Why are there no council tasks? | Explanation and filter reset. | Reset or return. |
| `error` | What failed and can I recover? | Preserve last valid context, retry or return. | Retry or return. |

## Opinionated Guidance

The map is the visual anchor, but the active decision owns focus and action controls. Separate the persistent map, transient selection detail and blocking modal so clicking the map cannot silently commit an event decision. Prefer a shallow inspect–decide–return path over deep nested windows. Give long trait and consequence text an independently bounded scroll region in a real implementation.

## Platform-Specific Guidance

For PC, allow map pointer selection plus a keyboard path through the active pane; test large text and resizable panels without losing the selected ruler. [Mouse and keyboard target](../platforms/mouse-keyboard.md) owns the input constraints. Do not use this PC diagram as proof of a console radial menu or touch adaptation.

## Unsupported Absolutes

- Exact positions, wording and progression metrics are illustrative.
- Official game descriptions do not prove shipped UI focus or panel lifetime.
- The loading, empty and error states are product-design examples, not observed screenshots.

## Verification Contract

On the [interactive CK3 example](https://gameuigallery.linalab.io/strategy/crusader-kings-iii/), switch through all eleven states. Confirm the state heading, distinct pane contents and safe cancel/return. On a real PC game, test pointer and keyboard navigation, pane scroll ownership, event blocking, repeated opening/closing, long localized names and narrow-window fallback.

## Source, License, And Attribution

The source links above establish game themes only. All regions and interactions here are original StyleGallery proposals. No protected screenshot, logo, icon or UI asset is stored or re-created.

## IA Navigation

Parent: [PC Strategy State Studies](index.md).
Next: [Total War: WARHAMMER III](total-war-warhammer-iii.md).
