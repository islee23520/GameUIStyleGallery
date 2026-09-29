# PC Strategy State Studies

Primary role: route to original PC-first strategy wireframes and their evidence boundaries.

These studies are **not reproductions** of any game's shipped interface. Official publisher pages identify gameplay concerns, while the screen regions, coordinates, transitions, loading, empty, and error states are local design hypotheses to exercise before using them in a game.

## Start Here

- [Crusader Kings III](crusader-kings-iii.md): character, dynasty, succession, realm, council, event, and war decisions over a persistent political map.
- [Total War: WARHAMMER III](total-war-warhammer-iii.md): turn-based faction management and a separate real-time battle command shell.
- [Norland combat preparation observation](norland-combat-observation.md): live army roster, developer simulator, and tutorial element inventory; the manual battlefield was **not reached**.
- [Strategy genre brief](../genres/strategy.md): a *different*, small itch.io sample; it is not evidence for either focal game's actual pixels.
- [Mouse and keyboard target](../platforms/mouse-keyboard.md): pointer, hotkeys, focus, and resizable panel constraints.

## Family Comparison

| Family and title | Player's main decision | Proposed UI owner | Evidence boundary |
| --- | --- | --- | --- |
| Paradox: Crusader Kings III | Characters, dynasty, realm and event consequences. | Persistent political map plus one character/task detail pane. | [Publisher overview](https://www.paradoxinteractive.com/games/crusader-kings-iii/about) names these systems, not panel geometry. |
| Paradox: Europa Universalis V | Nation, diplomacy, economy, military logistics. | Persistent national map with a contextual administration pane. | [Publisher overview](https://www.paradoxinteractive.com/games/europa-universalis-v/about) names those systems. |
| Paradox: Victoria 3 | Population, production, reform and diplomacy. | Population/economy lens and drill-down on the map. | [Publisher overview](https://www.paradoxinteractive.com/games/victoria-3) names those systems. |
| Paradox: Hearts of Iron IV | Production, alliances and war direction. | Front/production context instead of the CK3 character pane. | [Publisher page](https://www.paradoxinteractive.com/games/hearts-of-iron-iv) describes the wargame; UI placement not checked. |
| Paradox: Stellaris | Galactic and planetary decisions. | Galaxy-to-system-to-planet drill-down hypothesis. | [Publisher game catalogue](https://www.paradoxinteractive.com/our-games/our-brands); exact UI not checked this session. |
| Total War: WARHAMMER III | Turn-based faction/army decisions and real-time unit commands. | **Two distinct shells**: campaign map and battle field. | [Official game page](https://www.totalwar.com/games/total-war-warhammer-iii/total-war-warhammer-iii); direct page inspection blocked in this session. |
| Total War: PHARAOH | Turn-based empire management and real-time battles. | Campaign/battle split, with historically specific decisions rather than WARHAMMER faction or ability language. | [Official game page](https://www.totalwar.com/games/total-war-pharaoh/total-war-pharaoh); direct page inspection blocked in this session. |

Do not turn the table into a shared theme, art direction, control layout, or claim that all Paradox and Total War games use equivalent interface trees. Even within each family, the player's task selects a different state and ownership boundary.

## Verification Route

Use the [CK3 interactive wireframe](https://gameuigallery.linalab.io/strategy/crusader-kings-iii/) and [WARHAMMER III interactive wireframe](https://gameuigallery.linalab.io/strategy/total-war-warhammer-iii/) to challenge the hypotheses. In an actual PC build, verify map selection, pointer plus keyboard navigation, independent pane scroll, focus return, paused state, loading, empty and error paths, and 1440px and narrower presentation. No publisher art is bundled with these examples.

## IA Navigation

Parent: [Game UI](../index.md).
Next: [Crusader Kings III](crusader-kings-iii.md).
