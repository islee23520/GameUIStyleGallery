---
type: Reference Record
title: "Gears Tactics - targeting contracts and character-bound results"
description: "Draft evidence from four opened targeting, enemy-turn, loadout and promotion screenshots, with input and motion limits."
domain: game-ui
lifecycle: experimental
---

# Gears Tactics

Primary role: gallery evidence record. Status: draft; static rendered evidence only.

## Identity

- Source: Interface In Game, four Gears Tactics screenshot posts, each opened with an image-read tool.
- Representative post: https://interfaceingame.com/screenshots/gearstactics_37/
- Additional posts: https://interfaceingame.com/screenshots/gears-tactics-hud/ ; https://interfaceingame.com/screenshots/gears-tactics-loadout/ ; https://interfaceingame.com/screenshots/gears-tactics-character-stats/
- Research capture/retrieval and inspection: 2026-09-06. Saved downloads reused; original gameplay capture dates unknown.
- Game build, source repository and implementation revision: unknown.

## Player task

- Primary: `hud`, represented by gearstactics_37: understand target health, hit calculation, action cost, cooldown, party state and combat events during play.
- Justified secondary on the same targeting surface: `input-surface`, from Disabling Shot confirmation/cancellation and numbered skill controls; `tutorial`, from the explicit Use Disabling Shot objective and explanatory instruction on that captured surface.
- Independent screens: Loadout is `inventory` (character roster, weapon modifications, item preview and stats). Character Stats is `progression`: its actual pixels show PROMOTED!, SKILL POINTS: +2, level progress and combat results beneath two characters. Do not classify it as an ordinary main menu or live HUD based on source tags.
- The other HUD post shows only the ENEMY TURN banner over the battlefield, a narrow `hud` state sample rather than a complete baseline HUD.

## Presentation

- `translucent`: dark calculation/command regions preserve battlefield context in targeting; loadout uses dark panel surfaces against a large weapon scene.
- `framed`: skill sockets, key-hint compartments and weapon-modification image cells have explicit borders; selected controls/cells use brighter edges and fill differences.
- `tactical`: target outline, hit breakdown, action-point/cooldown symbols, threat area and color-differentiated compact combat log form a repeated combat information vocabulary.

## Hierarchy

Observed visual roles, not source ownership:

- Root: full captured game surface.
- Layer: world/weapon/character scene behind information regions; no actual renderer or Canvas layering inspected.
- Screen: enemy-turn display, targeting, loadout and promotion/results.
- Region: targeting puts objective upper-left, party state left, target/calculation central, command and skill row bottom-center, log lower-right, camera/key hints upper-right.
- Component: Disabling Shot region visually owns its description, 1 AP cost, 8 TURNS cooldown and confirm/cancel controls. Loadout's roster and modification grid relate to the large named weapon. Result panels sit directly under their respective characters.
- Control: visible [SPACE] CONFIRM, [ESC] CANCEL and numbered skill sockets; [ESC] BACK and [ENTER] SELECT in Loadout; [ENTER] CONTINUE in results. Runtime input ownership and focus scopes: unknown.

## Platform

Engine, UI framework, text runtime, package/runtime versions, captured OS and hardware: unknown. Keyboard-looking glyphs are not proof of platform internals or complete input support.

## Surface

- Four images, each 1920x1080 (16:9).
- Observed: spatial target/threat indicators plus screen-edge overlays in combat; full-screen item and character-result compositions.
- Technical render space, native resolution, safe area, scaling policy and additional aspect-ratio coverage: unknown.

## Input

- Visible hints: [Q]/[E]/[Z]/[C] and [R] TAC-COM in targeting; [SPACE]/[ESC], function-key weapon hints and numbered skills; loadout/results hints listed above.
- Supported and exercised modes: unknown; no input was run. Hints are observed affordances only, not keyboard/gamepad conformance.
- Initial focus, navigation order, cancellation result, focus return, pointer hover and rebinding: unknown.

## States

- Captured: Disabling Shot aim/confirmation, enemy-turn announcement, selected Stock modification, character promotion/results.
- Default: baseline HUD behavior unknown; the sparse ENEMY TURN frame does not prove when controls hide or reappear.
- Selected: skill [4], confirm border and a Stock cell have visible emphasis; exact focus versus hover cause unknown.
- Disabled: several skill/weapon slots and End Turn are dim or crossed; actual input blocking and reasons unknown.
- Empty: a cosmetic cell bears a plus symbol, but whether it is an empty slot or add action is unknown; empty-inventory behavior not established.
- Loading/error: unknown. Misses in the combat log are game outcomes, not application errors.
- Modal: no input-trapping modal behavior established. The targeting command panel alone is not proof of modality.

## Motion

Role, trigger, properties, timing, interruption and completion: unknown. ENEMY TURN supplies the rendered announcement design, not its transition duration or fade behavior. No combat or promotion animation was viewed.

## Evidence

https://interfaceingame.com/screenshots/gears-tactics-hud/

https://interfaceingame.com/screenshots/gearstactics_37/

https://interfaceingame.com/screenshots/gears-tactics-loadout/

https://interfaceingame.com/screenshots/gears-tactics-character-stats/

## Boundary

- Observed: four opened screenshots, including exact cost/cooldown presentation, keyboard-hint text, short actor/action/target/value log entries and character-bound promotion panels.
- Inferred: semantic hierarchy and player-task classes. Red corner triangles in Loadout are observed shapes; their meaning (new, equipped, notification or otherwise) is unknown.
- Unknown: game build, original capture dates, implementation, input execution, all exceptional states and motion. No recording, hierarchy capture or implementation source paths available.
- Reuse restrictions: locally authored observations only. No game screenshots/crops, portraits, icons, weapon images, textures or fonts copied into the repository. Public reference URLs do not grant asset redistribution rights; licensing remains unknown and requires separate clearance. No game structure or visual defaults become gallery-wide policy.
- `consumer_reference: not_applicable` - a Game UI evidence record without consumer profile values or executable implementation.
