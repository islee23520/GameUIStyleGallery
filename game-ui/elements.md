---
type: Domain Guide
title: Game UI Element Patterns
description: Player-task mapping, required states, input contracts, and failure modes for 21 common game UI elements.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# Game UI Element Patterns

Primary role: element-to-player-task pattern guide.

## Repository Boundary

This guide names 21 recurring game UI elements and maps each onto the local [Game UI Classification](classification.md) and [Game UI Screen Hierarchy](screen-hierarchy.md) so a reviewer can move from a reference to an implementation brief. The element list and mapping are a local working vocabulary, not a universal taxonomy.

A screenshot is static evidence. It shows one rendered frame or a short clip; it does not show focus order, input modes, timing, localization, or engine structure.

## Reusable Method

1. Collect references for the element by hand from sources whose terms allow it, such as games you can play or store pages you browse yourself; do not crawl or scrape.
2. Look at the element in at least three different games before naming a pattern; one title is an anecdote.
3. Assign one local primary player-task class per surface using the Element Map below, then record secondary classes only for regions that genuinely compose them.
4. Place the surface on a hierarchy layer before choosing components; layer decides sorting, input blocking, and lifetime.
5. Write the state list and input contract from this guide into the brief, then mark which states the references actually show.
6. Hand the brief to the engine guide, for Unity uGUI the [Unity uGUI Game UI Implementation](unity/ugui-implementation.md).

## Element Map

| Element | Label | Local primary class | Frequent secondary classes | Hierarchy layer |
| --- | --- | --- | --- | --- |
| `main-menu` | Menu | `navigation` | `inventory`, `commerce`, `progression` | Screen Host |
| `in-game` | In game | `hud` | `tutorial`, `narrative`, `input-surface` | HUD Layer and World-Linked UI |
| `overlay` | Overlay | `dialog` | `hud`, `tutorial`, `progression` | Modal Layer or Transient Layer |
| `stats` | Stats | `progression` | `inventory`, `hud` | Screen Host region |
| `settings` | Settings | `navigation` | `system-status`, `input-surface` | Screen Host |
| `progress` | Progress | `progression` | `hud`, `commerce` | Screen Host or Transient Layer |
| `character` | Character | `inventory` | `progression`, `commerce` | Screen Host |
| `inventory` | Inventory | `inventory` | `commerce`, `progression` | Screen Host |
| `tutorial` | Tutorial | `tutorial` | `hud`, `dialog` | Transient Layer or Modal Layer |
| `store` | Store | `commerce` | `inventory`, `dialog` | Screen Host |
| `quest` | Quest | `progression` | `navigation`, `narrative` | Screen Host or HUD Layer |
| `map` | Map | `navigation` | `hud`, `progression` | Screen Host or HUD Layer |
| `level-selection` | Level selection | `navigation` | `progression` | Screen Host |
| `loading` | Loading | `system-status` | `tutorial`, `narrative` | Persistent Services |
| `start-screen` | Start screen | `system-status` | `navigation` | Screen Host |
| `dialogue` | Dialogue | `narrative` | `dialog`, `hud` | Modal Layer or HUD Layer |
| `skill-tree` | Skill tree | `progression` | `inventory` | Screen Host |
| `credits` | Credits | `narrative` | `system-status` | Screen Host |
| `scoreboard` | Scoreboard | `progression` | `hud` | Modal Layer or Screen Host |
| `lobby` | Lobby | `system-status` | `navigation`, `inventory` | Screen Host |
| `game-over` | Game over | `progression` | `navigation`, `dialog` | Modal Layer |

## Element Guidance

Each entry lists the player question, what the surface must do, the states a brief must name, the input contract, and frequent failure modes.

### Menu (`main-menu`)

- Player question: where can I go next, and what is new since I left?
- Jobs: expose top-level destinations, show the current selection, surface unread or new content, and preserve the last-used destination.
- States: default, selected, disabled or locked with reason, badge or new, loading remote content, offline.
- Input and focus: initial focus on the primary action or the last-used item; directional navigation wraps only when the layout reads as a loop; cancel opens the quit confirmation at the root and returns one level elsewhere; focus returns to the item that opened a submenu.
- Failure modes: focus lost after a submenu closes; locked items that cannot be focused so their reason is never read; remote banners that shift navigation order while loading.

### In game (`in-game`)

- Player question: what is happening during play right now?
- Jobs: show vitals, resources, objectives, threats, and context actions without blocking the play space.
- States: nominal, warning, critical, hidden or minimal HUD, cinematic, paused.
- Input and focus: the HUD normally takes no focus and no pointer raycasts; context prompts follow the active input device glyphs; interaction prompts are world-linked and must clamp to the safe area.
- Failure modes: HUD text rebuilt every frame; raycast-blocking HUD graphics swallowing world clicks; prompts showing keyboard glyphs while a gamepad is active.

### Overlay (`overlay`)

- Player question: what needs my attention on top of the current screen?
- Jobs: interrupt or annotate the underlying surface, state the consequence of each choice, and restore the underlying surface exactly.
- States: open, confirming, busy, error, dismissed; stacked overlays.
- Input and focus: modal overlays trap focus and block input below; transient overlays never take focus; cancel dismisses when dismissal is safe; focus returns to the opener.
- Failure modes: input leaking to the screen underneath; two overlays open at once without a stack owner; confirm as the default on destructive actions.

### Stats (`stats`)

- Player question: how strong am I and what changed?
- Jobs: present attributes, derived values, and deltas against a compared item or previous state.
- States: default, comparing, increased, decreased, capped, unknown or locked.
- Input and focus: rows are focusable when they expose explanations; the comparison source is explicit; tooltips open on focus as well as hover.
- Failure modes: color-only deltas; long localized attribute names truncated; explanations reachable only by mouse hover.

### Settings (`settings`)

- Player question: how do I make the game work for me?
- Jobs: group options into tabs or categories, preview effects where possible, apply or revert safely, and explain restart requirements.
- States: default, changed but unapplied, applied, requires restart, unsupported on this device, reset to default.
- Input and focus: tabs switch with shoulder buttons or keys as well as pointer; each control is reachable by directional navigation; leaving with unapplied changes prompts once.
- Failure modes: slider values changed by navigation input; a display change without a timed revert; tabs that reset focus to the first control on every switch.

### Progress (`progress`)

- Player question: what did I unlock or how far have I advanced?
- Jobs: show before and after values, rewards, and next goals; allow skipping long reward sequences.
- States: counting, completed, reward granted, level up, capped, skipped.
- Input and focus: a single confirm advances or skips; skipping lands on the final values, never a partial state.
- Failure modes: skip leaving counters mid-animation; reward sequences that cannot be interrupted; results screens with no route back to the next action.

### Character (`character`)

- Player question: who am I playing and how are they equipped or dressed?
- Jobs: select or customize a character, preview the result, and connect equipment and stats.
- States: default, previewing, locked, owned, equipped, unsaved changes.
- Input and focus: preview rotation uses a dedicated input that does not steal navigation; the confirm action is reachable without scrolling.
- Failure modes: 3D preview capturing all input; preview lighting differing from gameplay; unsaved appearance changes lost on cancel without warning.

### Inventory (`inventory`)

- Player question: what do I own, equip, compare, or discard?
- Jobs: list, filter, sort, compare, and act on items; show capacity.
- States: empty, filtered empty, selected, equipped, new, locked, over capacity, loading.
- Input and focus: grid navigation keeps position after sorting when the item still exists; context actions open on confirm and close on cancel; comparison follows focus.
- Failure modes: rebuilding every slot on each change; focus jumping to the first slot after an item is consumed; hover-only comparison.

### Tutorial (`tutorial`)

- Player question: what should I learn or do now?
- Jobs: teach one action at a time, point at the relevant control or world object, and confirm success.
- States: shown, waiting for action, succeeded, skipped, repeated from a help menu.
- Input and focus: forced steps block only unrelated input; prompts show the active device glyph; the tutorial can be reopened later.
- Failure modes: coach marks pointing at controls that moved on another aspect ratio; forced steps that dead-end when the player already knows the action.

### Store (`store`)

- Player question: what can I acquire and at what cost?
- Jobs: show offers, prices in the right currency, ownership, and the exact purchase outcome.
- States: available, owned, insufficient currency, limited time, purchasing, purchase failed, restored.
- Input and focus: purchase confirmation is a separate modal with cancel as the safe default; price and currency are readable at focus time.
- Failure modes: double purchase from repeated confirm; stale prices after a platform price fetch; no state for a failed transaction.

### Quest (`quest`)

- Player question: what am I trying to achieve and where?
- Jobs: list active, available, and completed objectives; track one; route to the map.
- States: active, tracked, completed, failed, locked, new.
- Input and focus: tracking toggles on a dedicated action; the tracked objective also appears in the HUD; the map route returns to the same quest.
- Failure modes: HUD and journal disagree on the tracked quest; completed quests mixed into the active list.

### Map (`map`)

- Player question: where am I and where can I go?
- Jobs: show position, orientation, points of interest, and a route; support pan, zoom, filter, and waypoint.
- States: default, zooming, filtered, waypoint set, fog or undiscovered, fast travel unavailable.
- Input and focus: a cursor or focus target exists for gamepad; pan and zoom have separate inputs; legend filters are reachable without a pointer.
- Failure modes: pointer-only map interactions; minimap and full map using different icon meanings.

### Level selection (`level-selection`)

- Player question: which stage or mission do I play next?
- Jobs: show unlocked and locked levels, completion, rewards, and requirements.
- States: locked with reason, unlocked, completed, perfect, new, recommended.
- Input and focus: initial focus on the next recommended level; locked levels are focusable to read the requirement.
- Failure modes: focus starting at the first level after every return; requirement shown only on hover.

### Loading (`loading`)

- Player question: is the game working and how long will this take?
- Jobs: show continuous activity, optional progress, and useful content such as tips; hand off cleanly to the next screen.
- States: indeterminate, determinate, stalled, failed with retry, complete.
- Input and focus: input is blocked except for skip or cancel where supported; the loading layer sits above every screen and below system dialogs.
- Failure modes: a frozen frame during synchronous loads; tips that change faster than they can be read; a loading layer left active after an error.

### Start screen (`start-screen`)

- Player question: is the game ready to start?
- Jobs: present the title, detect the active input device, and move to sign-in or the main menu.
- States: attract, waiting for input, signing in, sign-in failed, update required.
- Input and focus: any supported device can start; the device that pressed start becomes the active profile device.
- Failure modes: a start prompt showing the wrong device glyph; ignoring input during logo animation with no feedback.

### Dialogue (`dialogue`)

- Player question: who is speaking and how do I respond?
- Jobs: show speaker, line, and choices; support subtitles, history, and pacing controls.
- States: line revealing, line complete, choice pending, timed choice, auto-advance, skipped.
- Input and focus: confirm completes the reveal before advancing; choices are navigable in reading order; timed choices show remaining time without relying on color.
- Failure modes: one press both completing and skipping a line; subtitles unreadable over bright scenes; choice focus defaulting to a consequential option.

### Skill tree (`skill-tree`)

- Player question: how can I improve and what does it cost?
- Jobs: show nodes, dependencies, costs, current points, and the effect of each node.
- States: locked, available, purchased, maxed, insufficient points, respec pending.
- Input and focus: directional navigation follows the visual graph, not the data order; purchase needs a hold or confirm to avoid accidents.
- Failure modes: navigation jumping between unrelated branches; dependency lines readable only by color.

### Credits (`credits`)

- Player question: who made this and when does it end?
- Jobs: scroll or page long attribution, allow speed-up or skip, and return to the correct screen.
- States: scrolling, accelerated, paused, skipped, finished.
- Input and focus: hold to accelerate and a separate skip; the return route is the screen that opened the credits.
- Failure modes: unskippable first-run credits with no feedback; text drawn as one huge texture that blurs on scale.

### Scoreboard (`scoreboard`)

- Player question: how am I doing compared with others?
- Jobs: rank players or teams, highlight the local player, and show the metric that decides rank.
- States: live, final, tied, disconnected player, loading remote data.
- Input and focus: a hold-to-show scoreboard releases input when the button is released; the local row is highlighted without color alone.
- Failure modes: live scoreboard rebuilding every frame; long player names breaking column alignment.

### Lobby (`lobby`)

- Player question: who am I playing with and are we ready?
- Jobs: show party members, readiness, mode, and matchmaking status; allow loadout changes while waiting.
- States: searching, found, ready, not ready, member left, timed out, error.
- Input and focus: ready is a toggle with a clear state; leaving the lobby confirms when it cancels a party.
- Failure modes: matchmaking status only in an animated spinner; party changes that reset the local player's focus.

### Game over (`game-over`)

- Player question: what happened and what can I do now?
- Jobs: state the outcome, show the cause where known, and offer retry, checkpoint, or quit.
- States: defeat, victory, checkpoint available, retry cost, quitting.
- Input and focus: initial focus on the least destructive useful action, usually retry; input is ignored briefly after the screen appears to avoid accidental skips.
- Failure modes: a button press from gameplay immediately choosing an option; quit placed where retry usually sits.

## Opinionated Guidance

- Start from the player question, not the element name; `overlay` and `main-menu` are presentation names that can hide very different tasks.
- Treat co-occurring elements as composition evidence: `overlay` with `in-game` is usually a modal or transient layer above play, while `stats` with `main-menu` is usually a region of a menu screen.
- Name the layer before choosing components, because sorting, raycast blocking, and focus trapping follow from the layer.
- Prefer references from several genres before generalizing; an element that dominates one genre may be absent elsewhere.

## Platform-Specific Guidance

Engine guides translate the Element Map into concrete structures. For Unity uGUI, use [Unity uGUI Game UI Implementation](unity/ugui-implementation.md), which maps each element to a Canvas layer, components, and sample scripts. Other engines should add a sibling guide rather than extending this page.

## Unsupported Absolutes

- An element name is not a player task; one element can map to several local classes.
- A screenshot does not prove focus behavior, input support, or timing.
- How often an element appears in a reference set shows coverage of that set, not design quality or market prevalence.
- A mapping in this guide is not a requirement for any specific game.

## Verification Contract

For each surface built from this guide, record: the local primary class, the hierarchy layer, every listed state with evidence or an explicit unknown, and the input contract exercised with every supported device. Reject a brief that cites fewer than three games for a pattern claim.

## Source, License, And Attribution

The element list, mappings, states, input contracts, and failure modes are locally authored. No third-party records, screenshots, or media are stored.

## IA Navigation

Parent: [Game UI](index.md).
Next: [Unity uGUI Game UI Implementation](unity/ugui-implementation.md).
