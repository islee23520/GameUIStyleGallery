---
type: Reference Record
title: "Sid Meier's Civilization VI - map markers and local explanations"
description: "Draft record of three opened map, production and main-menu screenshots, separating visible callouts from unverified interaction."
domain: game-ui
lifecycle: experimental
---

# Sid Meier's Civilization VI

Primary role: gallery evidence record. Status: draft; static visual evidence only.

## Identity

- Source: Interface In Game, three Sid Meier's Civilization VI screenshot posts, each opened with an image-read tool.
- Representative post: https://interfaceingame.com/screenshots/sid-meiers-civilization-vi-map/
- Additional posts: https://interfaceingame.com/screenshots/sid-meiers-civilization-vi-choose-production/ ; https://interfaceingame.com/screenshots/sid-meiers-civilization-vi-main-menu/
- Research capture/retrieval and inspection: 2026-09-06, reusing saved downloads. Original gameplay capture dates: unknown.
- Main menu visibly displays 1.0.0.110 (253607). Other images' game builds, implementation source revision and demo/retail identity: unknown. Buy It Now is visible but is not sufficient to establish an edition.

## Player task

- Primary: `hud`, represented by Map: understand the current map, selected unit, terrain detail, resources and ongoing research/civic progress.
- Justified secondary on Map: `input-surface`, from unit command controls composed with the unit information region. The technology/civic tracker is a separately classifiable `progression` region showing current advancement, not a reason to label every map marker as progression.
- Independent surfaces: Choose production is `inventory` (choose what to add/build for a city, with available options, costs and turn estimates) with an `input-surface` secondary in its selection controls; its visible Purchase tabs are commerce affordances, but an opened shop/transaction state is not shown, so `commerce` is not assigned to the whole capture. Main menu is `navigation`.
- These are local task classifications, not the source site's map/stats tags or a universal taxonomy for 4X games.

## Presentation

- `textural`: parchment-like map margins and illustrated linework surround colored terrain; the main menu repeats historical map/compass imagery.
- `framed`: gold/brown-edged blue panels, medallion controls, unit portrait frame and miniature map frame recur in Map and Choose production.
- `icon-led`: resources, city/unit/map pins and command medallions repeat icon-plus-value or icon-plus-label groupings. Typography remains important, but icons provide a consistent identity channel across regions.

## Hierarchy

Observed semantic grouping, not an extracted object tree:

- Root: full captured game surface.
- Layer: map/terrain under geographic markers and overlay edge regions; light tooltip-like plates above their nearby subjects.
- Screen: world map, city production overlay, and main menu.
- Region: Map has top resource strip, upper-left progress tracker, lower-left minimap and lower-right selected-unit/commands. Choose production adds a right-side list beside the selected city's map context.
- Component: city name banner and geographic markers stay near locations; production row combines icon/name/turn count; Warrior description is spatially adjacent to that row. Terrain description is near the map cursor. Main menu Game Options has a nearby short explanatory plate.
- Control: production options/tabs, menu entries, unit medallions and turn affordance. Actual ownership, layout hierarchy and popup anchoring code: unknown.

## Platform

Engine, UI framework, text runtime, package/runtime versions, OS and hardware: unknown. Exit to Desktop is rendered in Main menu, but does not identify the captured OS or prove input compatibility.

## Surface

- Three evidence images, each 1920x1080 (16:9).
- Observed relationship: geographic markers over map plus screen-edge panels; full-screen map-themed menu; local callouts overlap nearby map/list content.
- Technical render space, native resolution, safe area, scaling, tooltip collision rules and additional aspect-ratio support: unknown.

## Input

- Visible affordances: cursor near Warrior and terrain; command icons; menu entries and contextual descriptions. A pointer visible in a still is not an exercised input mode.
- Supported/exercised pointer, keyboard, gamepad or touch modes: unknown.
- Initial focus, navigation, cancellation, focus return, hover delay, tooltip pinning and activation: unknown.

## States

- Captured: map with terrain callout, city production list with Warrior callout, menu with Game Options explanation.
- Default: baseline behavior unknown.
- Selected: city boundary and list/menu emphasis observed; exact hover/focus/selection cause unknown.
- Disabled: Settler row appears dim in Choose production; actual blocking and reason unknown.
- Empty/loading/error: unknown. Uncolored map areas are not an empty-state or loading-state UI claim.
- Modal: production is a side-panel composition, not proven input-trapping modality. Callout presence does not prove a modal.

## Motion

Role, trigger, properties, timing, interruption and completion are unknown. No map zoom, tooltip delay, menu animation or transition was exercised or viewed in a recording.

## Evidence

https://interfaceingame.com/screenshots/sid-meiers-civilization-vi-map/

https://interfaceingame.com/screenshots/sid-meiers-civilization-vi-choose-production/

https://interfaceingame.com/screenshots/sid-meiers-civilization-vi-main-menu/

## Boundary

- Observed: three opened screenshots, map materials/markers, icon-value resource strip, framed unit detail and adjacent light callouts; the menu build label is scoped to that image.
- Inferred: semantic roles and task classification; city-production inventory classification applies the local own/acquire/improve question without claiming a conventional character backpack.
- Unknown: platform internals, original capture dates, build continuity, actual input/state transitions, motion and asset licenses. No recordings, hierarchy captures or relevant implementation source paths available. Not every visible callout has an arrow tail; none is invented here.
- Reuse restrictions: locally authored analysis, no game screenshots/crops, map art, logos, icons, portraits, font or texture assets copied into this repository. Public source URLs do not grant redistribution rights; separate permission is required. No game-specific style is promoted as shared Layout policy.
- `consumer_reference: not_applicable` - evidence-only Game UI record, not a consumer visual profile or implementation artifact.
