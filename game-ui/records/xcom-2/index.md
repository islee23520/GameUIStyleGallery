---
type: Reference Record
title: "XCOM 2 - tactical overlays and framed service records"
description: "Draft pixel-based reference for movement, targeting, equipment restrictions, and memorial framing in five Interface In Game captures."
domain: game-ui
lifecycle: experimental
---

# XCOM 2

Primary role: gallery evidence record. Status: draft; static visual evidence only.

## Identity

- Source: Interface In Game, XCOM 2 screenshot posts; five images opened with an image-read tool.
- Representative post: https://interfaceingame.com/screenshots/xcom-2-fire-weapon/
- Additional posts: https://interfaceingame.com/screenshots/xcom-2-main-menu/ ; https://interfaceingame.com/screenshots/xcom-2-move/ ; https://interfaceingame.com/screenshots/xcom-2-primary-weapon/ ; https://interfaceingame.com/screenshots/xcom-2-soldier-stats/
- Research capture/retrieval and inspection: 2026-09-06. Original gameplay capture dates: unknown. Previously downloaded evidence was reused, not fetched again.
- Game build/source revision: unknown; no source repository or implementation revision inspected.

## Player task

Classification uses the local Game UI player-task table, not the source site's element tags.

- Primary: `hud`, represented by Fire weapon and Move: understand the selected target, hit/damage estimates, movement boundary, and unit state during play.
- Justified secondary on Fire weapon: `input-surface`, because its bottom weapon/action controls are composed with target information. This is a task classification, not proof of any input mode.
- Independent screens, not global secondary labels: Main menu is `navigation`; Primary weapon is `inventory` (weapon selection/restriction/detail); Soldier stats is recorded here as `narrative` (an authored memorial/service-history presentation, including LAST DAY OF SERVICE, LOST TO and CHANGE EPITAPH), not a live health HUD.

## Presentation

- `translucent`: dark panels preserve a view of the soldier/environment on Primary weapon; targeting calculations overlay the combat scene on Fire weapon.
- `framed`: thin cyan outlines and clipped panel corners recur in targeting/equipment; Soldier stats adds a visibly layered metal photo holder and worn photo mat.
- `tactical`: Move uses spatial path/boundary lines, cover shields, segmented unit bars and broken selection brackets; Fire weapon combines reticle, target bar and hit/damage/critical readout.

These are three bounded visual tags, not a claim that every XCOM 2 screen has the same material treatment.

## Hierarchy

Observed visual grouping, not an engine object tree:

- Root role: full captured game surface.
- Layer role: environment behind spatial indicators and screen-edge information; no actual layer IDs or sorting order inspected.
- Screen role: movement HUD, targeting view, equipment selection, main menu, and memorial/service record are separate captured surfaces.
- Region role: on Fire weapon, target indicators occupy the central world subject; the bottom command/calculation region owns its title, explanatory text, hit/damage/critical values and action slots. On Primary weapon, left weapon list and right stats visually belong to the central soldier.
- Component role: unit bar with nearby identity marker; weapon row with image/name/restriction; photo holder with portrait/backdrop and service details.
- Control role: numbered action slots, Fire Weapon command, equipment rows and visible back/previous/next symbols. Runtime control ownership and event routing: unknown.

## Platform

Engine, UI framework, text system, packages, runtime versions, OS and captured hardware: unknown. A game's reputation or translucent appearance is not implementation evidence.

## Surface

- Evidence files: five images, each 1920x1080 (16:9).
- Observed world relationship: combat contains spatially positioned markers plus overlay regions; equipment and menu use full-screen compositions.
- Actual render space (screen-space/world-space UI), projection policy, safe area, native render resolution, scaling and other aspect ratios: unknown.

## Input

- Visible affordances: numbered action hints on combat screenshots; back and character-switch symbols in equipment/service screens.
- Exercised/supported modes: unknown; no pointer, keyboard, gamepad or touch interaction was run.
- Initial focus, navigation algorithm, cancellation behavior, focus return, rebinding: unknown. A bright weapon row shows emphasis, not how it was reached.

## States

- Captured state: movement preview; target aim/calculation display; Assault Rifle highlighted in equipment; memorial details open.
- Default: complete baseline behavior unknown.
- Selected: bright Assault Rifle row and spatial selection brackets observed; selection versus hover/focus cause unknown.
- Disabled: Cannon and Sniper Rifle rows are dim and explicitly say GRENADIER ONLY / SHARPSHOOTER ONLY. Restriction presentation observed; actual input blocking unknown.
- Loading/error: unknown; memorial death-related fields are not application errors.
- Empty: slot outlines are visible in equipment, but empty-inventory behavior unknown.
- Modal: no modal input capture established; panel-like appearance alone does not prove modality.

## Motion

Role, trigger, animated properties, timing, interruption and completion: all unknown. Static targeting and menu scenes do not prove camera transitions, idle animation or value interpolation.

## Evidence

https://interfaceingame.com/screenshots/xcom-2-main-menu/

https://interfaceingame.com/screenshots/xcom-2-move/

https://interfaceingame.com/screenshots/xcom-2-fire-weapon/

https://interfaceingame.com/screenshots/xcom-2-primary-weapon/

https://interfaceingame.com/screenshots/xcom-2-soldier-stats/

## Boundary

- Observed: the shapes, grouping, labels and rendered states described above in five opened screenshots. Every visual claim is bounded to the named post.
- Inferred: semantic hierarchy and player-task ownership are local analysis, not extracted source hierarchy. Memorial classification follows rendered service/death/epitaph labels, not the broad post title.
- Unknown: original capture date, game build, platform, full state matrix, interaction, motion, implementation and asset licenses. No recordings, hierarchy captures or relevant implementation source paths were available.
- Reuse restrictions: locally authored commentary only. Source game images, portraits, icons, logos, textures and fonts were not copied into this repository. Public URLs do not authorize redistribution or asset extraction; separate rights clearance is required. No upstream prose or game implementation is imported as gallery policy.
- `consumer_reference: not_applicable` - an observational Game UI reference record, not a consumer profile or implementation handoff with shared visual defaults.
