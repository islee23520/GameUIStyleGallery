---
type: Reference Record
title: "Frostpunk - instrument panels and event decisions"
description: "Draft pixel-based record of four opened building, expedition, message and event-choice screenshots."
domain: game-ui
lifecycle: experimental
---

# Frostpunk

Primary role: gallery evidence record. Status: draft; static visual evidence only.

## Identity

- Source: Interface In Game, four Frostpunk screenshot posts, all opened with an image-read tool.
- Representative post: https://interfaceingame.com/screenshots/frostpunk-the-londoners-steal-supplies/
- Additional posts: https://interfaceingame.com/screenshots/frostpunk-coal-mine/ ; https://interfaceingame.com/screenshots/frostpunk-lost-expedition/ ; https://interfaceingame.com/screenshots/frostpunk-message/
- Research capture/retrieval and inspection: 2026-09-06. Previously saved downloads reused. Original gameplay capture dates: unknown.
- Source revision/game build: unknown; no implementation source inspected.

## Player task

- Primary: `dialog`, represented by The londoners steal supplies: decide how to respond to the caught thief through three visible choices and an emphasized consequence line.
- Justified secondary on that same surface: `narrative`, because related people, event title and authored situation text present the reason for the choice. Background city resource/condition regions are separately `hud`, not evidence that the entire event is a HUD control.
- Lost expedition similarly composes `dialog` with `narrative` through reunion text, illustration and two choices. Message is `dialog`, a single-OK notice of an unfulfilled commitment and consequences.
- Coal mine is separately `hud` with an `input-surface` secondary in its building workforce/operation controls: read current function/resources while adjusting the selected facility.
- Classes follow the local Game UI classification table, not genre or source element tags.

## Presentation

- `textural`: frost/weather treatment around the city and coarse black brush-like event edges recur, distinct from clear type and linework.
- `framed`: Coal mine groups image, state, tabs, output and workforce inside one outlined shell; Message uses a double ornamental boundary and attached envelope medallion; event buttons have layered edges.
- `industrial`: temperature gauges, heater symbols, resource instruments and operation/workforce controls recur alongside the city machinery. Ornamental linework coexists with these instruments; this tag does not describe every decorative motif.

## Hierarchy

Visual role analysis, not implementation hierarchy:

- Root: full captured game surface.
- Layer: city/exploration scene behind persistent edge HUD; event or message presentation above a visibly softened/darkened background.
- Screen: selected Coal mine information, Lost expedition decision, Message acknowledgment, and thief-event decision.
- Region: city HUD owns top resources/large central temperature, left objectives/notifications and bottom Hope/Discontent. Coal mine's right panel owns picture, operational state, tabs, resource and workforce groups.
- Component: event illustration/people and title/body lead into consequence text and choices; Message couples an envelope emblem, heading, red outcomes and OK within one shell.
- Control: event choice plates, OK, facility tabs and workforce adjustment controls are visible. Runtime ownership, focus trapping and sorting order: unknown.

## Platform

Engine, UI framework, text system, packages/runtime versions, OS and hardware: unknown. Frost/blur appearance does not identify shaders, render pipelines or framework APIs.

## Surface

- Four images, each 1920x1080 (16:9).
- Observed relationship: city-relative markers plus overlay HUD and building panel; modal-like centered message/event presentation retains a background world.
- Technical render space, native resolution, safe area, scaling and other aspect ratios: unknown. Visual blur does not prove a particular post-processing implementation.

## Input

- Visible affordances: two expedition choices, three thief-event choices, one OK button, facility tabs and workforce controls.
- Supported or exercised modes: unknown; no pointer, keyboard, gamepad or touch input was run.
- Initial focus, navigation, cancellation, focus return, tooltip triggering and rebinding: unknown. Teal emphasis on a choice does not establish whether it is selected, hovered or focused.

## States

- Captured: Coal mine marked Functioning; expedition reunion with two choices; Guard Stations not built notice; caught-thief event with three choices.
- Default: complete baseline behavior unknown.
- Selected: teal choice emphasis and a highlighted facility tab observed; interaction cause unknown.
- Disabled: dim workforce/control surfaces appear, but actual disabled behavior and requirements are unknown. Do not equate every unhighlighted event choice with disabled.
- Empty: displayed workforce zero values are observed resource counts, not proof of an empty-state UI.
- Loading/error: unknown. Failed guard-station commitment is an in-world outcome, not an application error.
- Modal: Message and events are visually foregrounded over softened backgrounds; actual input capture, pause, cancellation and dismissal policies unknown.

## Motion

Role, trigger, properties, timing, interruption and completion: all unknown. Snow/frost or blurred scenery in stills does not prove particle motion, transition timing or interruption behavior.

## Evidence

https://interfaceingame.com/screenshots/frostpunk-coal-mine/

https://interfaceingame.com/screenshots/frostpunk-lost-expedition/

https://interfaceingame.com/screenshots/frostpunk-message/

https://interfaceingame.com/screenshots/frostpunk-the-londoners-steal-supplies/

## Boundary

- Observed: four opened screenshots, their material-looking surfaces, instrument hierarchy, selected-building groups, event people/text/choices and message consequence colors.
- Inferred: semantic hierarchy, modal-like visual layer, and player-task classes. No source tree or runtime state machine was inspected.
- Unknown: original capture dates, build/platform, interaction, motion, full state coverage and asset licensing. Recordings, hierarchy captures and relevant source implementation paths were unavailable.
- Reuse restrictions: locally authored analysis only; no screenshot/crop, portrait, event illustration, UI ornament, icon, font or texture copied into this repository. Public URLs are not a reuse license; separate clearance is necessary for protected assets. This record grants no decorative defaults to reusable Layout.
- `consumer_reference: not_applicable` - observational Game UI evidence, not a consumer profile or executable implementation handoff.
