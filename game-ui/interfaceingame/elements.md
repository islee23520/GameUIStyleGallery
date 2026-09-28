---
type: Domain Guide
title: Interface In Game Element Patterns
description: Player-task mapping, required states, input contracts, and failure modes for the 21 Interface In Game screenshot elements.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# Interface In Game Element Patterns

Primary role: element-to-player-task pattern guide.

## Repository Boundary

Interface In Game tags each screenshot with one or more site-local Elements. This guide maps those 21 facets onto the local [Game UI Classification](../classification.md) and [Game UI Screen Hierarchy](../screen-hierarchy.md) so a reviewer can move from an archive search to an implementation brief. The mapping is a local interpretation, not the site's ontology and not a universal taxonomy.

The archive is static evidence. A capture shows one rendered frame or a short clip; it does not show focus order, input modes, timing, localization, or engine structure. Counts come from the 2026-09-28 snapshot in [the catalog data](data/manifest.json); see [Genre And Element Matrix](genre-element-matrix.md) for generated coverage, co-occurrence, and genre lift.

## Reusable Method

1. Search the archive by element, then narrow by genre or theme in the [game catalog](catalog.md).
2. Open at least three captures from different games before naming a pattern; one title is an anecdote.
3. Assign one local primary player-task class per surface using the Element Map below, then record secondary classes only for regions that genuinely compose them.
4. Place the surface on a hierarchy layer before choosing components; layer decides sorting, input blocking, and lifetime.
5. Write the state list and input contract from this guide into the brief, then mark which states the captures actually show.
6. Hand the brief to the engine guide, for Unity uGUI the [Unity uGUI Game UI Implementation](../unity/ugui-implementation.md).

## Element Map

Counts are capture items (images plus videos) carrying the element at the 2026-09-28 snapshot; one capture can carry several elements.

| Element | Site label | Captures | Local primary class | Frequent secondary classes | Hierarchy layer |
| --- | --- | ---: | --- | --- | --- |
| `main-menu` | Menu | 6248 | `navigation` | `inventory`, `commerce`, `progression` | Screen Host |
| `in-game` | In game | 5314 | `hud` | `tutorial`, `narrative`, `input-surface` | HUD Layer and World-Linked UI |
| `overlay` | Overlay | 3021 | `dialog` | `hud`, `tutorial`, `progression` | Modal Layer or Transient Layer |
| `stats` | Stats | 2020 | `progression` | `inventory`, `hud` | Screen Host region |
| `settings` | Settings | 1886 | `navigation` | `system-status`, `input-surface` | Screen Host |
| `progress` | Progress | 1400 | `progression` | `hud`, `commerce` | Screen Host or Transient Layer |
| `character` | Character | 1336 | `inventory` | `progression`, `commerce` | Screen Host |
| `inventory` | Inventory | 1266 | `inventory` | `commerce`, `progression` | Screen Host |
| `tutorial` | Tutorial | 891 | `tutorial` | `hud`, `dialog` | Transient Layer or Modal Layer |
| `store` | Store | 724 | `commerce` | `inventory`, `dialog` | Screen Host |
| `quest` | Quest | 716 | `progression` | `navigation`, `narrative` | Screen Host or HUD Layer |
| `map` | Map | 591 | `navigation` | `hud`, `progression` | Screen Host or HUD Layer |
| `level-selection` | Level selection | 568 | `navigation` | `progression` | Screen Host |
| `loading` | Loading | 486 | `system-status` | `tutorial`, `narrative` | Persistent Services |
| `start-screen` | Start screen | 477 | `system-status` | `navigation` | Screen Host |
| `dialogue` | Dialogue | 426 | `narrative` | `dialog`, `hud` | Modal Layer or HUD Layer |
| `skill-tree` | Skill tree | 272 | `progression` | `inventory` | Screen Host |
| `credits` | Credits | 255 | `narrative` | `system-status` | Screen Host |
| `scoreboard` | Scoreboard | 223 | `progression` | `hud` | Modal Layer or Screen Host |
| `lobby` | Lobby | 217 | `system-status` | `navigation`, `inventory` | Screen Host |
| `game-over` | Game over | 215 | `progression` | `navigation`, `dialog` | Modal Layer |

## Element Guidance

Each entry lists the player question, what the surface must do, the states a brief must name, the input contract, frequent failure modes, and three source captures from different games. The source captures are citation links only.

### Menu (`main-menu`)

- Player question: where can I go next, and what is new since I left?
- Jobs: expose top-level destinations, show the current selection, surface unread or new content, and preserve the last-used destination.
- States: default, selected, disabled or locked with reason, badge or new, loading remote content, offline.
- Input and focus: initial focus on the primary action or the last-used item; directional navigation wraps only when the layout reads as a loop; cancel opens the quit confirmation at the root and returns one level elsewhere; focus returns to the item that opened a submenu.
- Failure modes: focus lost after a submenu closes; locked items that cannot be focused so their reason is never read; remote banners that shift navigation order while loading.
- Examples: [Red Dead Redemption 2 - Challenges](https://interfaceingame.com/screenshots/rdr2_22/), [KartRider Rush+ - Festive Perk Tips](https://interfaceingame.com/screenshots/kartrider-rush-festive-perk-tips/), [Borderlands 4 - Boss](https://interfaceingame.com/screenshots/borderlands-4-boss/).

### In game (`in-game`)

- Player question: what is happening during play right now?
- Jobs: show vitals, resources, objectives, threats, and context actions without blocking the play space.
- States: nominal, warning, critical, hidden or minimal HUD, cinematic, paused.
- Input and focus: the HUD normally takes no focus and no pointer raycasts; context prompts follow the active input device glyphs; interaction prompts are world-linked and must clamp to the safe area.
- Failure modes: HUD text rebuilt every frame; raycast-blocking HUD graphics swallowing world clicks; prompts showing keyboard glyphs while a gamepad is active.
- Examples: [Red Dead Redemption 2 - No HUD](https://interfaceingame.com/screenshots/rdr2_107/), [KartRider Rush+ - Boost](https://interfaceingame.com/screenshots/kartrider-rush-boost/), [Borderlands 4 - HUD](https://interfaceingame.com/screenshots/borderlands-4-hud/).

### Overlay (`overlay`)

- Player question: what needs my attention on top of the current screen?
- Jobs: interrupt or annotate the underlying surface, state the consequence of each choice, and restore the underlying surface exactly.
- States: open, confirming, busy, error, dismissed; stacked overlays.
- Input and focus: modal overlays trap focus and block input below; transient overlays never take focus; cancel dismisses when dismissal is safe; focus returns to the opener.
- Failure modes: input leaking to the screen underneath; two overlays open at once without a stack owner; confirm as the default on destructive actions.
- Examples: [KartRider Rush+ - BFF System Update](https://interfaceingame.com/screenshots/kartrider-rush-bff-system-update/), [Monster Hunter: World - Group list](https://interfaceingame.com/screenshots/monster-hunter-world-group-list/), [The Outer Worlds - Tutorial](https://interfaceingame.com/screenshots/the-outer-worlds-tutorial-8/).

### Stats (`stats`)

- Player question: how strong am I and what changed?
- Jobs: present attributes, derived values, and deltas against a compared item or previous state.
- States: default, comparing, increased, decreased, capped, unknown or locked.
- Input and focus: rows are focusable when they expose explanations; the comparison source is explicit; tooltips open on focus as well as hover.
- Failure modes: color-only deltas; long localized attribute names truncated; explanations reachable only by mouse hover.
- Examples: [Cyberpunk 2077 - Scan people](https://interfaceingame.com/screenshots/cyberpunk-2077-scan-people/), [Legends of Runeterra Mobile - Magic](https://interfaceingame.com/screenshots/legends-of-runeterra-mobile-magic/), [Mario Kart Tour - Player Profile](https://interfaceingame.com/screenshots/mario-kart-tour-player-profile/).

### Settings (`settings`)

- Player question: how do I make the game work for me?
- Jobs: group options into tabs or categories, preview effects where possible, apply or revert safely, and explain restart requirements.
- States: default, changed but unapplied, applied, requires restart, unsupported on this device, reset to default.
- Input and focus: tabs switch with shoulder buttons or keys as well as pointer; each control is reachable by directional navigation; leaving with unapplied changes prompts once.
- Failure modes: slider values changed by navigation input; a display change without a timed revert; tabs that reset focus to the first control on every switch.
- Examples: [KartRider Rush+ - Select a gender](https://interfaceingame.com/screenshots/kartrider-rush-select-a-gender/), [Cyberpunk 2077 - Control scheme](https://interfaceingame.com/screenshots/cyberpunk-2077-control-scheme/), [Borderlands 4 - Accessibility](https://interfaceingame.com/screenshots/borderlands-4-accessibility/).

### Progress (`progress`)

- Player question: what did I unlock or how far have I advanced?
- Jobs: show before and after values, rewards, and next goals; allow skipping long reward sequences.
- States: counting, completed, reward granted, level up, capped, skipped.
- Input and focus: a single confirm advances or skips; skipping lands on the final values, never a partial state.
- Failure modes: skip leaving counters mid-animation; reward sequences that cannot be interrupted; results screens with no route back to the next action.
- Examples: [KartRider Rush+ - Complete](https://interfaceingame.com/screenshots/kartrider-rush-complete/), [Honkai Impact 3rd - Achievement Unlocked](https://interfaceingame.com/screenshots/honkai-impact-3rd-achievement-unlocked/), [Legends of Runeterra Mobile - Victory](https://interfaceingame.com/screenshots/legends-of-runeterra-mobile-victory/).

### Character (`character`)

- Player question: who am I playing and how are they equipped or dressed?
- Jobs: select or customize a character, preview the result, and connect equipment and stats.
- States: default, previewing, locked, owned, equipped, unsaved changes.
- Input and focus: preview rotation uses a dedicated input that does not steal navigation; the confirm action is reachable without scrolling.
- Failure modes: 3D preview capturing all input; preview lighting differing from gameplay; unsaved appearance changes lost on cancel without warning.
- Examples: [KartRider Rush+ - Badge](https://interfaceingame.com/screenshots/kartrider-rush-badge/), [Cyberpunk 2077 - Appearance](https://interfaceingame.com/screenshots/cyberpunk-2077-appearance/), [Borderlands 4 - Character Selection](https://interfaceingame.com/screenshots/borderlands-4-character-selection/).

### Inventory (`inventory`)

- Player question: what do I own, equip, compare, or discard?
- Jobs: list, filter, sort, compare, and act on items; show capacity.
- States: empty, filtered empty, selected, equipped, new, locked, over capacity, loading.
- Input and focus: grid navigation keeps position after sorting when the item still exists; context actions open on confirm and close on cancel; comparison follows focus.
- Failure modes: rebuilding every slot on each change; focus jumping to the first slot after an item is consumed; hover-only comparison.
- Examples: [KartRider Rush+ - Karts to park](https://interfaceingame.com/screenshots/kartrider-rush-karts-to-park/), [Monster Hunter: World - Stickers](https://interfaceingame.com/screenshots/monster-hunter-world-stickers/), [Borderlands 4 - Backpack](https://interfaceingame.com/screenshots/borderlands-4-backpack/).

### Tutorial (`tutorial`)

- Player question: what should I learn or do now?
- Jobs: teach one action at a time, point at the relevant control or world object, and confirm success.
- States: shown, waiting for action, succeeded, skipped, repeated from a help menu.
- Input and focus: forced steps block only unrelated input; prompts show the active device glyph; the tutorial can be reopened later.
- Failure modes: coach marks pointing at controls that moved on another aspect ratio; forced steps that dead-end when the player already knows the action.
- Examples: [Cyberpunk 2077 - Layer indication](https://interfaceingame.com/screenshots/cyberpunk-2077-layer-indication/), [Borderlands 4 - Hint](https://interfaceingame.com/screenshots/borderlands-4-hint/), [STAR WARS Zero Company - Tutorial](https://interfaceingame.com/screenshots/star-wars-zero-company-tutorial/).

### Store (`store`)

- Player question: what can I acquire and at what cost?
- Jobs: show offers, prices in the right currency, ownership, and the exact purchase outcome.
- States: available, owned, insufficient currency, limited time, purchasing, purchase failed, restored.
- Input and focus: purchase confirmation is a separate modal with cancel as the safe default; price and currency are readable at focus time.
- Failure modes: double purchase from repeated confirm; stale prices after a platform price fetch; no state for a failed transaction.
- Examples: [The Seven Deadly Sins: Grand Cross - Discount Equipment Bundle](https://interfaceingame.com/screenshots/the-seven-deadly-sins-grand-cross-discount-equipment-bundle/), [Borderlands 4 - Store](https://interfaceingame.com/screenshots/borderlands-4-store/), [STAR WARS Zero Company - Store](https://interfaceingame.com/screenshots/star-wars-zero-company-store/).

### Quest (`quest`)

- Player question: what am I trying to achieve and where?
- Jobs: list active, available, and completed objectives; track one; route to the map.
- States: active, tracked, completed, failed, locked, new.
- Input and focus: tracking toggles on a dedicated action; the tracked objective also appears in the HUD; the map route returns to the same quest.
- Failure modes: HUD and journal disagree on the tracked quest; completed quests mixed into the active list.
- Examples: [KartRider Rush+ - Custom Kart Contest](https://interfaceingame.com/screenshots/kartrider-rush-custom-kart-contest/), [Monster Hunter: World - Select difficulty](https://interfaceingame.com/screenshots/monster-hunter-world-select-difficulty/), [Borderlands 4 - Contracts](https://interfaceingame.com/screenshots/borderlands-4-contracts/).

### Map (`map`)

- Player question: where am I and where can I go?
- Jobs: show position, orientation, points of interest, and a route; support pan, zoom, filter, and waypoint.
- States: default, zooming, filtered, waypoint set, fog or undiscovered, fast travel unavailable.
- Input and focus: a cursor or focus target exists for gamepad; pan and zoom have separate inputs; legend filters are reachable without a pointer.
- Failure modes: pointer-only map interactions; minimap and full map using different icon meanings.
- Examples: [Red Dead Redemption 2 - Map](https://interfaceingame.com/screenshots/rdr2_135/), [Borderlands 4 - Map](https://interfaceingame.com/screenshots/borderlands-4-map/), [STAR WARS Zero Company - Map](https://interfaceingame.com/screenshots/star-wars-zero-company-map/).

### Level selection (`level-selection`)

- Player question: which stage or mission do I play next?
- Jobs: show unlocked and locked levels, completion, rewards, and requirements.
- States: locked with reason, unlocked, completed, perfect, new, recommended.
- Input and focus: initial focus on the next recommended level; locked levels are focusable to read the requirement.
- Failure modes: focus starting at the first level after every return; requirement shown only on hover.
- Examples: [KartRider Rush+ - Select level](https://interfaceingame.com/screenshots/kartrider-rush-select-level/), [Cyberpunk 2077 - Lifepath](https://interfaceingame.com/screenshots/cyberpunk-2077-lifepath/), [STAR WARS Zero Company - Missions](https://interfaceingame.com/screenshots/star-wars-zero-company-missions/).

### Loading (`loading`)

- Player question: is the game working and how long will this take?
- Jobs: show continuous activity, optional progress, and useful content such as tips; hand off cleanly to the next screen.
- States: indeterminate, determinate, stalled, failed with retry, complete.
- Input and focus: input is blocked except for skip or cancel where supported; the loading layer sits above every screen and below system dialogs.
- Failure modes: a frozen frame during synchronous loads; tips that change faster than they can be read; a loading layer left active after an error.
- Examples: [Red Dead Redemption 2 - Loading](https://interfaceingame.com/screenshots/red-dead-redemption-2-loading/), [KartRider Rush+ - Loading race](https://interfaceingame.com/screenshots/kartrider-rush-loading-race/), [Borderlands 4 - Loading](https://interfaceingame.com/screenshots/borderlands-4-loading/).

### Start screen (`start-screen`)

- Player question: is the game ready to start?
- Jobs: present the title, detect the active input device, and move to sign-in or the main menu.
- States: attract, waiting for input, signing in, sign-in failed, update required.
- Input and focus: any supported device can start; the device that pressed start becomes the active profile device.
- Failure modes: a start prompt showing the wrong device glyph; ignoring input during logo animation with no feedback.
- Examples: [Red Dead Redemption 2 - Logo](https://interfaceingame.com/screenshots/red-dead-redemption-2-logo/), [KartRider Rush+ - Start](https://interfaceingame.com/screenshots/kartrider-rush-start/), [Borderlands 4 - Logo](https://interfaceingame.com/screenshots/borderlands-4-logo/).

### Dialogue (`dialogue`)

- Player question: who is speaking and how do I respond?
- Jobs: show speaker, line, and choices; support subtitles, history, and pacing controls.
- States: line revealing, line complete, choice pending, timed choice, auto-advance, skipped.
- Input and focus: confirm completes the reveal before advancing; choices are navigable in reading order; timed choices show remaining time without relying on color.
- Failure modes: one press both completing and skipping a line; subtitles unreadable over bright scenes; choice focus defaulting to a consequential option.
- Examples: [KartRider Rush+ - Dialogue](https://interfaceingame.com/screenshots/kartrider-rush-dialogue/), [Cyberpunk 2077 - Attention](https://interfaceingame.com/screenshots/cyberpunk-2077-attention/), [Dragon Age: The Veilguard - Dialogue](https://interfaceingame.com/screenshots/dragon-age-the-veilguard-dialogue/).

### Skill tree (`skill-tree`)

- Player question: how can I improve and what does it cost?
- Jobs: show nodes, dependencies, costs, current points, and the effect of each node.
- States: locked, available, purchased, maxed, insufficient points, respec pending.
- Input and focus: directional navigation follows the visual graph, not the data order; purchase needs a hold or confirm to avoid accidents.
- Failure modes: navigation jumping between unrelated branches; dependency lines readable only by color.
- Examples: [Doom Eternal - Select upgrade](https://interfaceingame.com/screenshots/doom-eternal-select-upgrade/), [Borderlands 4 - Skill Tree](https://interfaceingame.com/screenshots/borderlands-4-skill-tree/), [STAR WARS Zero Company - Skill Tree](https://interfaceingame.com/screenshots/star-wars-zero-company-skill-tree/).

### Credits (`credits`)

- Player question: who made this and when does it end?
- Jobs: scroll or page long attribution, allow speed-up or skip, and return to the correct screen.
- States: scrolling, accelerated, paused, skipped, finished.
- Input and focus: hold to accelerate and a separate skip; the return route is the screen that opened the credits.
- Failure modes: unskippable first-run credits with no feedback; text drawn as one huge texture that blurs on scale.
- Examples: [Monster Hunter: World - Credits](https://interfaceingame.com/screenshots/monster-hunter-world-credits/), [Borderlands 4 - Credits](https://interfaceingame.com/screenshots/borderlands-4-credits/), [STAR WARS Zero Company - Credits](https://interfaceingame.com/screenshots/star-wars-zero-company-credits/).

### Scoreboard (`scoreboard`)

- Player question: how am I doing compared with others?
- Jobs: rank players or teams, highlight the local player, and show the metric that decides rank.
- States: live, final, tied, disconnected player, loading remote data.
- Input and focus: a hold-to-show scoreboard releases input when the button is released; the local row is highlighted without color alone.
- Failure modes: live scoreboard rebuilding every frame; long player names breaking column alignment.
- Examples: [KartRider Rush+ - Race rank](https://interfaceingame.com/screenshots/kartrider-rush-race-rank/), [Marvel Rivals - Scoreboard](https://interfaceingame.com/screenshots/marvel-rivals-scoreboard/), [It Takes Two - PvP Scoreboard](https://interfaceingame.com/screenshots/it-takes-two-pvp-scoreboard/).

### Lobby (`lobby`)

- Player question: who am I playing with and are we ready?
- Jobs: show party members, readiness, mode, and matchmaking status; allow loadout changes while waiting.
- States: searching, found, ready, not ready, member left, timed out, error.
- Input and focus: ready is a toggle with a clear state; leaving the lobby confirms when it cancels a party.
- Failure modes: matchmaking status only in an animated spinner; party changes that reset the local player's focus.
- Examples: [KartRider Rush+ - Lobby](https://interfaceingame.com/screenshots/kartrider-rush-lobby/), [Tom Clancy's Ghost Recon: Breakpoint - Setting up match](https://interfaceingame.com/screenshots/tom-clancys-ghost-recon-breakpoint-setting-up-match/), [Super Mario Party - Choose a side](https://interfaceingame.com/screenshots/super-mario-party-choose-a-side/).

### Game over (`game-over`)

- Player question: what happened and what can I do now?
- Jobs: state the outcome, show the cause where known, and offer retry, checkpoint, or quit.
- States: defeat, victory, checkpoint available, retry cost, quitting.
- Input and focus: initial focus on the least destructive useful action, usually retry; input is ignored briefly after the screen appears to avoid accidental skips.
- Failure modes: a button press from gameplay immediately choosing an option; quit placed where retry usually sits.
- Examples: [Red Dead Redemption 2 - Game Over](https://interfaceingame.com/screenshots/rdr2_76/), [Dragon Age: The Veilguard - Game Over](https://interfaceingame.com/screenshots/dragon-age-the-veilguard-game-over/), [Doom: The Dark Ages - Game Over](https://interfaceingame.com/screenshots/doom-the-dark-ages-game-over/).

## Opinionated Guidance

- Start from the player question, not the site facet; `overlay` and `main-menu` are presentation facets that can hide very different tasks.
- Treat co-occurring elements as composition evidence: `overlay` with `in-game` is usually a modal or transient layer above play, while `stats` with `main-menu` is usually a region of a menu screen.
- Name the layer before choosing components, because sorting, raycast blocking, and focus trapping follow from the layer.
- Prefer captures from several genres before generalizing; genre lift in the matrix shows where an element is over-represented in this archive.

## Platform-Specific Guidance

Engine guides translate the Element Map into concrete structures. For Unity uGUI, use [Unity uGUI Game UI Implementation](../unity/ugui-implementation.md), which maps each element to a Canvas layer, components, and sample scripts. Other engines should add a sibling guide rather than extending this page.

## Unsupported Absolutes

- A site facet is not a player task; one facet can map to several local classes.
- A capture does not prove focus behavior, input support, or timing.
- High capture counts show archive coverage, not design quality or market prevalence.
- A mapping in this guide is not a requirement for any specific game.

## Verification Contract

For each surface built from this guide, record: the local primary class, the hierarchy layer, every listed state with evidence or an explicit unknown, and the input contract exercised with every supported device. Reject a brief that cites fewer than three captures from different games for a pattern claim.

## Source, License, And Attribution

Element, genre, and theme facets and all capture links come from [Interface In Game](https://interfaceingame.com/). Screenshots and videos belong to their respective publishers and developers; this repository stores links and metadata only, never the media. The mappings, states, input contracts, and failure modes are locally authored analysis.

## IA Navigation

Parent: [Interface In Game Catalog](index.md).
Next: [Genre And Element Matrix](genre-element-matrix.md).
