---
type: Game UI Observation
title: Norland Combat Preparation And Tutorial Observation
description: Firsthand element-level observations of Norland's army, battle simulator, and tutorial, with the actual battlefield explicitly not observed.
domain: game-ui
lifecycle: experimental
provenance_kind: local
---

# Norland: Combat Preparation, Not Yet Combat

This report records a **2026-09-29 firsthand Windows App RDP session** in Norland, launched from Steam on Windows with `-debug`. It follows the [Norland UI layer wireframe](https://gameuigallery.linalab.io/strategy/norland/) but does **not** validate a combat representation. The game was observed at a 1568 × 980 capture size using mouse input. The screenshots and action log are held locally under `.omo/evidence/norland-ui/`, outside the public site and Git. This page contains original written analysis only.

**Result:** No manual battle, battlefield game view, deployment, targeting, tactical pause, or battle-result screen was reached. The `Battle Simulator` in Pretty Debug calculated aggregate statistics; it did not open the battlefield in the observed run. Do not use the simulator or campaign map frames as proof of the manual combat UI.

## Observed route and evidence ledger

| Step | Action and visible result | Local evidence |
| --- | --- | --- |
| 1 | Loaded the earlier settlement and opened the army management panel. Four lord portraits were present, but its warrior count was zero, so this was not a ready-to-fight army. | `combat-army-roster.png` |
| 2 | Changed Steam launch options to `-debug`; the live `Norland.exe` command line included that flag. The player opened Pretty Debug with `Ctrl+D` after the RDP background shortcut did not reach the game. | `combat-debug-menu.png` and process command line captured in the session |
| 3 | Opened `Battle Simulator` in Pretty Debug. Its setup displayed attacker/defender sides, weapon, armor, shield, commander, command skill, soldiers, combat skill, morale, repeat count, and a ticket factor. | `combat-simulator-setup.png` |
| 4 | Started a simulation. The statistics panel reported a win ratio, average duration, and each side's wins, deaths, retreats and immobilization. No battlefield was shown. | `combat-simulator-statistics.png` |
| 5 | Created a separate new game using the `Prisoner` start scenario, placed a Hall, and opened its army panel. Five warriors were visible. No existing save was deliberately overwritten. | `combat-prisoner-start.png`, `combat-prisoner-army-5.png` |
| 6 | Opened the world map and selected visible markers and the player's city; this remained the campaign/world view. An attack assignment and manual-battle transition did not appear in the captured sequence. | `combat-prisoner-world.png`, `combat-world-selected.png`, `combat-city-army.png` |
| 7 | Inspected the tutorial overlay. Its visible next task was to build a library; a building-construction instruction was layered over the campaign map. Attempts to advance and select construction controls did not establish a completed checklist or a battle unlock. | `combat-tutorial-overlay-latest.png`, `tutorial-build-next.png` |

The filenames are provenance pointers, **not published images**. Several capture attempts returned `effect: unverifiable`; a click is counted as a transition only when the following screenshot visibly changed. The many intermediate frames are not independent game states. The battle simulator's statistics screen can be identified as a developer experiment, not as the manual battle's outcome UI.

## Elements and their game information

| Element or region | Information visible in this session | Mechanism supported by observation | Unknown or not proven |
| --- | --- | --- | --- |
| Army panel entry in the settlement HUD | Opens the army/warrior management surface over the settlement. | The bottom command launches a management panel without replacing the settlement game view. | Exact hotkey, focus return and availability outside the tutorial. |
| Lord cards in the army panel | Individual portrait/name rows for available lords; an earlier settlement showed four. | Clicking a row changes the selected character/detail surface. A portrait is not itself a fighting unit card. | Which lord is eligible to command, selection persistence, and leadership calculations. |
| Warrior count and rows | Earlier army: zero warriors. New `Prisoner` start: five warriors in the roster. | Army composition is data-dependent, not inferred from the campaign map marker. The count and rows must be checked before assuming an attack is possible. | Which subset was assigned to a squad or actually sent on an expedition. |
| Create squad / army actions | A squad-related command appeared in the army management area. | The command is an army-preparation action, distinct from a tactical battlefield order. A recorded click did not establish a newly formed deployed squad. | Required leader, minimum strength, equipment gate, disabled reason and resulting squad state. |
| World map and city selection panel | Provinces, settlement markers and a selected-place panel over the world map. | This is the **campaign game view**. Clicking places changes world selection information; it is not the battlefield. | Whether a selected marker was the scenario's bandit camp, attack-button eligibility, travel time or encounter resolution. |
| Tutorial notice and instruction overlay | Library-construction objective and a separate `building construction` help surface visible over the campaign map. | Tutorial content may cover and sequence other interaction, but the capture does not prove a hard combat lock. The checklist did not visibly complete. | Whether finishing this objective is mandatory for attacking the camp. |
| Pretty Debug container | Debug tabs and a battle-simulator section opened after `-debug` plus `Ctrl+D`. | It is a developer tool layered on top of the existing game scene; its controls are not the standard player-facing combat HUD. | How debug actions affect campaign state or achievement flags beyond the publisher's description. |
| Simulator attacker and defender setup | Side-specific weapon/armor/shield, commander toggle and skills, soldiers, morale, repeat count and ticket factor controls. | These inputs parameterize repeated **simulated** battles and their aggregate calculation. The panel is a test harness, not unit deployment onto terrain. | Exact numeric formulas, default values across versions, and effect of each slider. |
| Simulator statistics | Win ratio, average duration, and attacker/defender wins, deaths, retreat and immobilization rates. | Starting the simulator produced aggregate output in place. The visible statistics are not a captured combat-resolution screen from a played battle. | Per-run variance and whether a particular test setup could transition to a rendered battle. |

## Game view versus overlay ownership

The settlement with the Hall and characters is one spatial game view. The world map with city/province markers is another. Army management and selected-city details are **UI panels over those views**; tutorial instructions are a separate notice/help layer. Pretty Debug and its simulator are developer overlays. None of these is the rendered tactical battlefield. This distinction matters before cataloging health bars, order cursors, deployment slots, time controls, or combat results: they are **not observed** here.

The [Total War WARHAMMER III state brief](total-war-warhammer-iii.md) proposes a campaign/battle split for a different title. It offers comparison questions but supplies no evidence for Norland's battlefield layout or controls. The existing [Norland wireframe](https://gameuigallery.linalab.io/strategy/norland/) covers observed settlement/world layer ownership, not a verified combat state.

## Next capture needed to complete the combat reference

From the `Prisoner` scenario, confirm the tutorial checklist's completion condition, identify the bandit camp marker by its panel title, form and assign a squad, issue an attack, and wait for the encounter choice. Capture the manual-versus-auto-resolve choice before choosing manual battle. Only then record the battlefield frame, unit selection, commands, target feedback, speed/pause, and exit/result. If the choice is unavailable, capture its disabled reason rather than inferring a battle HUD.

The [official startup-settings description](https://wiki.hoodedhorse.com/Norland/Startup_settings) says the `Prisoner` scenario begins with five warriors and a six-bandit camp; its wiki page was not directly rechecked because it returned a challenge, so that description is a **source lead**, while the five visible warriors were independently confirmed in game. The [Steam beginner guide](https://steamcommunity.com/sharedfiles/filedetails/?id=3291875729) describes manual-versus-auto resolution after an army arrives, but that later screen was not reached. The [Patch 41 developer-mode notes](https://steamdb.info/patchnotes/20340937/) describe `-debug`, `Ctrl+D`, and the simulator; our own session verified the flag, menu and statistics behavior, not every claim in the notes.

`consumer_reference: consumer-reference/agent-native/registry.json` (repository-wide handoff pointer, no consumer profile selected). No design-terminology records were used. The assessment is deliberately incomplete as a **battle UI reference** and complete only as a record of the preparatory screens reached.
