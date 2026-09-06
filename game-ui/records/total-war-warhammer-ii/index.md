---
type: Reference Record
title: "Total War WARHAMMER II - unit-card apparatus and event documents"
description: "Draft reference from three opened battle, armour-event and unit-information screenshots, with an explicit embedded-document boundary."
domain: game-ui
lifecycle: experimental
---

# Total War: WARHAMMER II

Primary role: gallery evidence record. Status: draft; static visual evidence only.

## Identity

- Source: Interface In Game, three Total War: WARHAMMER II screenshot posts, all opened with an image-read tool.
- Representative post: https://interfaceingame.com/screenshots/total-war-warhammer-ii-fight/
- Additional posts: https://interfaceingame.com/screenshots/total-war-warhammer-ii-unit-information/ ; https://interfaceingame.com/screenshots/total-war-warhammer-ii-armour-gained/
- Research capture/retrieval and inspection: 2026-09-06. Saved downloads reused. Original gameplay capture dates: unknown.
- Game build/source revision: unknown. The legal footer in Unit information is visible content, not an implementation or build identifier.

## Player task

- Primary: `hud`, represented by Fight: read battlefield unit flags/bars, selected character, army-card condition, timer and minimap during play.
- Justified secondary on Fight: `input-surface`, because the lower command buttons and unit-card selection affordances compose control with state monitoring.
- Independent surfaces: Armour gained is `progression` (newly gained equipment/event outcome) with an `inventory` secondary in the same panel's item name, effects and associated lord. Background campaign HUD and event list are distinct regions.
- Unit information is a separately bounded `tutorial` reference surface: learn the named unit's role and statistics through explanatory text and icon/value/bar rows. It is not evidence of a combat HUD merely because the campaign remains behind it.
- Classes use the local Game UI table. The source site's overlay/stats/inventory tags are not copied as player-task classes.

## Presentation

- `framed`: Fight joins large portrait, unit cards and command buttons within an elaborate lower apparatus; its minimap and overhead bars have explicit rims. Armour gained uses a framed document and event column.
- `textural`: worn metal-like surfaces, paper-like event fill and dark marble-like Unit information background are visible, without proof of their rendering implementation.
- `fantasy-ornamental`: repeated gold flourishes, crests, decorated ribbons and medallions in Fight and ornamented document dividers in Armour gained. Different campaign/battle captures need not share an identical skin.

## Hierarchy

Observed role model, not a verified engine hierarchy:

- Root: full captured game surface.
- Layer: battlefield/campaign behind spatial unit/location indicators and edge apparatus; an information window or event document overlaps the campaign in separate captures.
- Screen: battle HUD, campaign equipment-gain event and unit-information document.
- Region: Fight has top timer/controls, upper-right minimap, lower-left large character portrait, lower-center unit-card rail and command strip. Armour gained puts event messages on the right and the opened item's document immediately beside them.
- Component: unit cards combine picture, top count/bar, attached status tabs and bottom type icons; portrait has a backdrop, large round rim and smaller top medallion. Event document combines item icon/name, flavor text, signed effects and associated lord portrait/name.
- Control: framed battle commands, event check/magnifier symbols, window close and scrollbar are visible. Actual event routing, scene ownership and layer sorting: unknown.

## Platform

Engine, UI framework, text runtime, packages/runtime versions, OS and hardware: unknown. Unit information visibly contains Legal, Privacy Policy, Terms of Service and Cookie Policy footer chrome, but WebView, embedded browser or external document technology is **unknown**. Its appearance is not framework evidence.

## Surface

- Three evidence images, each 1920x1080 (16:9).
- Observed: spatial flags/bars over units with overlay battle controls; campaign document and event surfaces over map context.
- Technical render space, native resolution, safe area, scaling and other aspect ratios: unknown. The large Unit information document is not treated as a universal game HUD layout.

## Input

- Visible affordances: unit cards, command plates, time-control symbols, close, scrollbar, event check and magnifier.
- Supported/exercised modes: unknown; no pointer, keyboard, gamepad or touch actions were run.
- Initial focus, navigation, cancellation, focus return, scrolling, drag selection and rapid selection changes: unknown.

## States

- Captured: battle with overhead bars/flags and lower unit cards; Unit information open for SKINK COHORT (JAVELINS); Armour Gained detail beside event messages.
- Default: baseline behavior unknown.
- Selected: bright outlines and differentiated unit-card fills are visible, but exact hover/focus/selection mapping unknown.
- Disabled: dim command faces are visible; whether and why they block input is unknown.
- Empty/loading/error: unknown. Red unit-card overlays and green warning triangles are observed, but their specific game-state meanings are not guessed.
- Modal: Unit information visually overlaps the campaign and has a close control; actual focus trapping/modality unknown. Armour gained's acknowledgment and persistence policy also unknown.

## Motion

Role, trigger, properties, timing, interruption and completion: unknown. A timer and playback controls are rendered, but do not prove actual timing, pause behavior, card animations or event transitions.

## Evidence

https://interfaceingame.com/screenshots/total-war-warhammer-ii-unit-information/

https://interfaceingame.com/screenshots/total-war-warhammer-ii-fight/

https://interfaceingame.com/screenshots/total-war-warhammer-ii-armour-gained/

## Boundary

- Observed: three opened images; material-looking frames, unit-card/portrait assemblies, icon/value/bar rows and event list-to-detail composition. Armour +4 and Leadership -8 are visible effects, not independently verified applied game state.
- Inferred: semantic ownership and task classes. Unit information's web-like legal chrome is a deliberate boundary case: decorative marble alone does not establish tactical game grammar.
- Unknown: original capture date, build, implementation, input/state behavior, motion and asset licenses. No recording, hierarchy capture or relevant source implementation paths available.
- Reuse restrictions: locally authored commentary only; no screenshot/crop, card art, portrait, crest, icon, texture or font is copied into this repository. Public URLs are not permission to redistribute or extract game assets. Separate rights clearance is required; nothing here imports source hierarchy or decorative defaults as shared gallery policy.
- `consumer_reference: not_applicable` - an observational Game UI record without consumer profile values or implementation changes.
