---
type: Reference Record
title: "Into the Breach - cells, sockets and tactical explanation"
description: "Draft reference covering five opened menu, combat, pilot loadout, tutorial and region-map screenshots."
domain: game-ui
lifecycle: experimental
---

# Into the Breach

Primary role: gallery evidence record. Status: draft; static visual evidence only.

## Identity

- Source: Interface In Game, five Into the Breach screenshot posts, all opened with an image-read tool.
- Representative post: https://interfaceingame.com/screenshots/into-the-breach-combat/
- Additional posts: https://interfaceingame.com/screenshots/into-the-breach-main-menu/ ; https://interfaceingame.com/screenshots/into-the-breach-pilot/ ; https://interfaceingame.com/screenshots/into-the-breach-weapon-effects/ ; https://interfaceingame.com/screenshots/into-the-breach-region/
- Research capture/retrieval and inspection: 2026-09-06, reusing saved downloads. Original gameplay capture dates: unknown.
- Main menu visibly reads Steam v. 1.1.22 (11-19-2018). This identifies only that image's displayed version; the other four images' builds and an implementation source revision are unknown.

## Player task

- Primary: `hud` on Combat: read unit condition, grid power, highlighted tiles, attack direction and remaining objectives during play.
- Justified secondary on Combat: `input-surface`, from the composed End Turn, repair and weapon controls. The objective box remains part of `hud`, not a separate invented class.
- Classify independent screens separately: Main menu and Region are `navigation`; Pilot is `inventory` with a justified `progression` secondary in its same-surface XP and health/move/weapon upgrade region; Weapon effects is `tutorial`, using three tile examples to teach push/damage outcomes.
- Classification uses the local Game UI table. Weapon effects is not treated as a small tooltip simply because its source tags include overlay.

## Presentation

- `flat-graphic`: mostly uniform dark panel fills, orthogonal rules and deliberately pixel-edged type/icons recur in combat, loadout and tutorial.
- `framed`: double-line action sockets, portrait boxes and shared loadout boundaries; slanted title tabs and an attached Continue tab create a repeated frame vocabulary.
- `tactical`: the combat board combines visible square-tile seams, green range outlines, a yellow selected tile, red direction/threat marks and small unit condition cells.

## Hierarchy

Visual role analysis, not a verified scene graph:

- Root: full captured game surface.
- Layer: board/map or title illustration behind HUD regions; a dimmed board behind the Weapon effects explanation.
- Screen: menu, combat, pilot/loadout, tutorial overlay and region map are distinct captures.
- Region: Combat's left roster owns pilot/mech identity and tiny health cells; bottom-left selected-unit area owns portrait/name and repair/weapon sockets; top-left owns power and turn controls; top-right owns objectives.
- Component: Pilot shares one outer frame across PILOT, REACTOR, STATS and WEAPONS; Storage is a separate bounded column. Region's place labels/icons and adjacent Library status panel retain map context.
- Control: repair R and weapon 1 hints sit inside their respective framed slots; End Turn has a stronger framed face. Runtime ownership, focus scopes and overlay sorting: unknown.

## Platform

Engine, UI framework, font family/text runtime, packages, OS and hardware: unknown. The Steam version label on Main menu is observed; it is not proof of a particular OS or the implementation of the other captures.

## Surface

- Five evidence images: 1920x1080, 16:9 each.
- Observed relationship: full-screen menu/map; combat board with spatial marks plus screen-edge overlays; tutorial drawn above a darkened board.
- Technical render space, native resolution, safe area, scaling, narrow/wide adaptation and accessibility coverage: unknown.

## Input

- Visible hints/affordances: R/1 on combat sockets, End Turn, Undo Move, Reset Turn, Continue, storage arrows, and loadout controls.
- Supported or exercised input modes: unknown. No keyboard, pointer, gamepad or touch mode was exercised.
- Initial focus, traversal, cancellation, focus return and input capture: unknown. Main menu New Game is emphasized; no claim about why.

## States

- Captured: active combat selection and objective display, open loadout, open three-column tutorial, and Region with a Library destruction explanation.
- Default: complete baseline behavior unknown.
- Selected: brighter menu strip, yellow portrait/selection accents and highlighted board tile observed; exact hover/focus/selection distinctions unknown.
- Disabled: dim Continue, Undo Move/Reset Turn and upgrade controls are visible across images. Disabled-looking presentation observed; actual input blocking and causes unknown.
- Empty: outlined unoccupied weapon/storage slots observed in Pilot. Its visible Page 1 of 0 is recorded without guessing intended pagination behavior.
- Loading/error: unknown. Region Destroyed by Vek is a game-world condition, not an application error.
- Modal: Weapon effects visually dominates a dimmed board and has Continue. Actual focus trapping, pause and dismissal behavior unknown.

## Motion

Role, trigger, properties, timing, interruption and completion are unknown. Rain streaks or outcome illustrations in one frame are not animation evidence.

## Evidence

https://interfaceingame.com/screenshots/into-the-breach-main-menu/

https://interfaceingame.com/screenshots/into-the-breach-combat/

https://interfaceingame.com/screenshots/into-the-breach-pilot/

https://interfaceingame.com/screenshots/into-the-breach-weapon-effects/

https://interfaceingame.com/screenshots/into-the-breach-region/

## Boundary

- Observed: five opened images, their visible labels, borders, fills, cells, tile markers, empty slots and explanation layout.
- Inferred: semantic ownership, secondary progression responsibility and modal-like visual relationship; no implementation tree was extracted.
- Unknown: behavior, state transitions, platform internals, motion, source revision, original capture dates and asset licensing. No recording, hierarchy capture or source implementation paths available.
- Reuse restrictions: this is locally authored analysis, not an asset pack. No screenshots, crops, pixel fonts, icons or game artwork are stored in this repository. Links do not grant reuse rights; obtain separate permission for protected assets. No visual values are promoted into shared Layout policy.
- `consumer_reference: not_applicable` - evidence-only Game UI record, not a consumer visual profile or reusable implementation.
