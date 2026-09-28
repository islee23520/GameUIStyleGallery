---
type: Domain Guide
title: Total War WARHAMMER III PC UI State Brief
description: Original PC-first campaign and battle wireframe states with explicit evidence limits.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# Total War: WARHAMMER III PC UI State Brief

Primary role: original PC-first two-shell strategy and battle example.

## Repository Boundary

The [official WARHAMMER III game page](https://www.totalwar.com/games/total-war-warhammer-iii/total-war-warhammer-iii) describes armies, factions and battles. The [official PHARAOH page](https://www.totalwar.com/games/total-war-pharaoh/total-war-pharaoh) distinguishes turn-based empire management and real-time battles. Those pages were not directly inspectable in this session (HTTP 429), so neither is treated as pixel, screenshot, exact-version or control evidence. The proposed wireframes below are original and contain no copied game art or data.

## Reusable Method

1. Assign the turn-based campaign map and real-time battle field separate render and input owners.
2. Keep campaign selection/recruitment in contextual panes; do not carry campaign resource controls into live battle.
3. In battle, keep selected units, abilities and time controls next to the field while preserving the visible deployment area.
4. Make pause, destructive confirmation, loading, empty and recoverable error states explicit.
5. Validate the proposed commands in a real game rather than promoting these placeholder labels to game-specific facts.

## State Examples

| State ID | Player task | Proposed owner | Safe return |
| --- | --- | --- | --- |
| `campaign` | Review territories, factions, armies and current turn. | Campaign map and resource/alert context. | Select settlement or army. |
| `settlement` | Compare growth and construction. | Settlement detail and construction queue beside map. | Close selection. |
| `army` | Inspect unit composition and movement. | Army roster and movement context beside map. | Close selection. |
| `diplomacy` | Review proposed terms and response. | Negotiation task pane. | Back without accepting. |
| `recruitment` | Compare role, upkeep and turns. | Available units and queue. | Remove or return. |
| `end-turn` | See that submitted turn is processing. | System processing state; duplicate action disabled. | Wait. |
| `deployment` | Place units before combat. | Battlefield, deploy boundary, roster and formations. | Start battle when ready. |
| `battle` | Command units in real time. | Battlefield, unit cards and ability command strip. | Pause or inspect unit. |
| `ability` | Inspect cost and target before committing. | Battlefield target preview and selected unit. | Cancel targeting. |
| `pause` | Inspect and resume a halted simulation. | Blocking tactical pause overlay. | Resume. |
| `result` | Review outcome, losses and next step. | Result summary before campaign return. | Return to campaign. |
| `confirm` | Decide whether to leave battle. | Blocking confirmation; cancel first. | Cancel or quit. |
| `loading` | Follow campaign-to-battle handoff. | System transition replacing stale campaign controls. | Wait. |
| `empty` | Understand unavailable recruitment. | Requirement explanation beside empty queue. | View requirements or return. |
| `error` | Recover an unavailable command. | Preserve last selection, retry or return. | Retry or return. |

## Opinionated Guidance

The campaign/battle boundary is the key design decision. Campaign has geographic and economic context with selected-settlement and army panes. Battle instead needs a readable field, unit roster and immediate commands. A shared visual skin does not imply a shared component lifetime or input module. Reveal dangerous consequences before a confirmation; never let a paused or loading screen send an underlying map or unit command.

## Platform-Specific Guidance

PC pointer and hotkey density are the initial target, described in [Mouse and keyboard UI](../platforms/mouse-keyboard.md). Scaling the entire desktop UI down is not a handheld design. Test each state independently if a controller, handheld or touch target is added.

## Unsupported Absolutes

- The wireframes are not a claim about the shipped game's exact panel positions or factions.
- Placeholder values, error states and button text do not come from official screenshots.
- The PHARAOH comparison establishes the two-mode task split only, not WARHAMMER-specific art or abilities.

## Verification Contract

On the [interactive WARHAMMER III example](https://gameuigallery.linalab.io/strategy/total-war-warhammer-iii/), switch between campaign and battle, inspect settlement and army selections, pause battle, cancel targeting, and exercise loading/empty/error. In a real PC game, verify command ownership, pointer/keyboard focus, modal blocking, text scale and repeat open/close at desktop and narrower widths.

## Source, License, And Attribution

The official pages linked above provide bounded product context. All regions and transitions are locally authored; no screenshot, icon, faction artwork, logo or proprietary interface geometry is stored.

## IA Navigation

Parent: [PC Strategy State Studies](index.md).
Next: [Game UI](../index.md).
