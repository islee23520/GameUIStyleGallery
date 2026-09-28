---
type: Domain Guide
title: Unity uGUI Game UI Implementation
description: Canvas, prefab, input, state, and performance workflow for implementing the Interface In Game catalog with Unity uGUI.
domain: game-ui
lifecycle: experimental
provenance_kind: local
platform: Unity uGUI
platform_version: Unity 6000.3 source boundary; samples compile-checked with Unity 6000.7.0a5
reviewed_on: 2026-09-28
---

# Unity uGUI Game UI Implementation

Primary role: Unity implementation guide for game-interface briefs.

## Repository Boundary

The [Interface In Game catalog](../interfaceingame/index.md) supplies screenshot and video metadata, not Unity hierarchies, behavior, or licensed art. These samples implement local StyleGallery player-task and layer roles; they do not reconstruct any game's proprietary interface. Build a brief from [Element Patterns](../interfaceingame/elements.md) before choosing a prefab structure.

## Version Boundary

The [Unity UI Systems](ui-systems.md) comparison pins uGUI source to [`Unity-Technologies/uGUI@9edb4420267b6652090ece4c28c38bd98746a68e`](https://github.com/Unity-Technologies/uGUI/tree/9edb4420267b6652090ece4c28c38bd98746a68e). The sample scripts were batchmode-compiled in Unity 6000.7.0a5 with `com.unity.ugui` 2.0.0 and `com.unity.inputsystem` 1.14.2. That compile is not a Play Mode interaction test, nor a guarantee for another editor or package version. Record the exact versions of the consuming project.

## Reusable Method

1. Name the player's question, primary [player-task class](../classification.md), state list, and input modes. Separate site labels from local interpretation.
2. Choose a persistent HUD, replaceable screen, modal, system, transient, or world-linked owner per [Screen Hierarchy](../screen-hierarchy.md). Split Canvases where independently changing geometry would otherwise rebuild a large Canvas.
3. Create one prefab for each reusable screen with serialized references to its controls. Keep game state outside the view; call presenter methods when values change rather than rebuilding UI each frame.
4. Use [UIScreen](samples/ugui/Runtime/UIScreen.cs) for screen visibility and [UIScreenRouter](samples/ugui/Runtime/UIScreenRouter.cs) for push/pop. Wire modal first focus, cancellation, and focus return. A game's own input layer can call `HandleCancel()` when the legacy input manager is disabled.
5. Put an `EventSystem` in the scene, with the input module matching the project's active input system. Provide explicit `Selectable` navigation for irregular grids and verify pointer, keyboard, gamepad, and touch independently.
6. Use `CanvasScaler` and [SafeAreaFitter](samples/ugui/Runtime/SafeAreaFitter.cs) as a starting point; inspect real output at 16:9, 21:9, 4:3, and a notched mobile aspect. A 1920x1080 reference is a sample, not a universal resolution.
7. Update HUD values on model events. For large item collections, use [PooledGridView](samples/ugui/Runtime/PooledGridView.cs), profile its visible-cell count, and preserve selection by item identity when items reorder.
8. Use TextMesh Pro for text, real localization tables for shipped strings, and sprite atlases appropriate to the consuming game's rights. Test long translated strings and missing glyphs.
9. In the consuming Unity project, enter Play Mode, exercise every supported input mode and state, capture `uloop screenshot` evidence, and verify focus, sorting, raycasts, and teardown in the running scene.

## Canvas Layer Plan

The [Editor builder](samples/ugui/Editor/GameUIRootBuilder.cs) creates these sample layers through **Tools > StyleGallery > Create Game UI Root**. The HUD raycaster is disabled; enable it only for a genuinely interactive HUD. System dialogs may need a blocker above loading. World-linked UI needs its own camera/render-space plan.

| Layer | Sample Canvas | Sorting order | Typical content | Input rule |
| --- | --- | ---: | --- | --- |
| HUD Layer | `Canvas_HUD` | 0 | Vitals, objective, world status | No raycasts unless interactive |
| Screen Host | `Canvas_Screens` | 10 | Menus, inventory, map, settings | One selected screen and explicit focus |
| Modal Layer | `Canvas_Modal` | 20 | Confirmation, dialogue, tutorial step | Blocks lower-layer interaction |
| Persistent Services | `Canvas_System` | 30 | Loading, connection error, toast | Block only when the state requires it |

All four use Screen Space Overlay, `CanvasScaler.ScaleWithScreenSize`, 1920x1080 reference resolution, and width/height match 0.5. [SafeAreaFitter](samples/ugui/Runtime/SafeAreaFitter.cs) anchors a `SafeArea` child. This is a demonstrator; measured device and content constraints decide production values.

## Element To uGUI Recipe

The mappings are local implementation hypotheses, not claims about how the source games were built. Screen-layer entries are prefabs with `UIScreen` unless a project already has a screen owner.

| Site element | Layer | Starting components / owner | Sample |
| --- | --- | --- | --- |
| `main-menu` | Screens | Buttons, vertical layout, selected first action | `UIScreenRouter` |
| `in-game` | HUD | Images, TMP labels, non-blocking raycaster | `HudResourceBar` |
| `overlay` | Modal or transient | `CanvasGroup`, blocker, explicit first focus | `UIScreen` |
| `settings` | Screens | Toggles, sliders, tab panels, apply/cancel | `TabGroup` |
| `stats` | Screens | TMP values and comparison regions | `TabGroup` |
| `progress` | HUD or Screens | Filled Image and numerical value | `HudResourceBar` |
| `character` | Screens | Equipment regions, optional separate preview camera | `UIScreen` |
| `inventory` | Screens | `ScrollRect`, cell prefab, selection owner | `PooledGridView`, `InventorySlotCell` |
| `tutorial` | Modal or transient | Highlight, prompt, success gate | `UIScreen` |
| `map` | Screens | Pan/zoom surface, filters, gamepad cursor | `UIScreen` |
| `store` | Screens | Offer cells, price, owned state, confirm modal | `PooledGridView`, `UIScreen` |
| `quest` | Screens or HUD | Objective list and tracked marker | `PooledGridView` |
| `level-selection` | Screens | Navigable tile/list and lock explanation | `PooledGridView` |
| `loading` | System | Progress Image, TMP status, input blocker | `HudResourceBar` |
| `start-screen` | Screens | Start action and sign-in status | `UIScreenRouter` |
| `dialogue` | Modal or HUD | Speaker, TMP line, choice buttons | `UIScreen` |
| `skill-tree` | Screens | Explicit graph navigation and node state | `UIScreen` |
| `credits` | Screens | `ScrollRect`, TMP attribution, return action | `UIScreen` |
| `scoreboard` | Screens or Modal | Ranked rows and local-player highlight | `PooledGridView` |
| `lobby` | Screens | Party rows, ready state, connection status | `UIScreen` |
| `game-over` | Modal | Outcome, safe first selection, retry/quit | `UIScreenRouter` |

## Samples

Copy [Runtime](samples/ugui/Runtime/) and [Editor](samples/ugui/Editor/) into a Unity project's `Assets/GameUI/` folders; Unity compiles the `Editor` folder separately. Add the uGUI and Input System packages if that project uses the latter. The editor command builds the four Canvas layers and one EventSystem. Assign an initial screen, its first selected control, and the EventSystem in the Inspector; use Buttons to call `Push`, `Pop`, or `Replace` through a project presenter. Set `isModal` on overlay prefabs and include a blocker Graphic that intercepts pointer input. Wire [HudResourceBar](samples/ugui/Runtime/HudResourceBar.cs) to filled Images (`Image.Type.Filled`) and a TMP label, then call `Set(current, max)` only when the value changes. Put [SafeAreaFitter](samples/ugui/Runtime/SafeAreaFitter.cs) on the `SafeArea` RectTransform. Assign Toggles, pages, and focus targets to [TabGroup](samples/ugui/Runtime/TabGroup.cs). For inventory, assign a `ScrollRect` content and viewport, a cell prefab with [InventorySlotCell](samples/ugui/Runtime/InventorySlotCell.cs), and provide item data via `InventorySlotCell.Source` before calling `SetItemCount`.

These are instructional starting points, not a complete game framework: no input rebinding UI, localization tables, persistence, addressable loading, screen-reader integration, or purchase logic is provided. Do not use static `InventorySlotCell.Source` across independently owned inventories without replacing it with a project-specific data owner.

## Failure Modes

| Symptom | Likely owner | Check |
| --- | --- | --- |
| Buttons cannot be selected with gamepad | EventSystem/input module | Active module, navigation edges, first selection, and action map |
| Click reaches gameplay behind a dialog | Modal Canvas and blocker | Sorting, `GraphicRaycaster`, blocker raycast target, `CanvasGroup.blocksRaycasts` |
| Selection disappears after pop | Screen router/prefab lifecycle | Opener still active; restored selection belongs to revealed screen |
| UI clips on a notch or ultrawide display | Safe area and anchors | `SafeArea` rect, layout min sizes, each aspect ratio |
| Inventory spikes on filter changes | Grid presenter | Cell count, Canvas rebuild, binding only visible cells |
| World prompt drifts from its target | World-linked owner | Camera, render mode, projection and off-screen clamp |

## Opinionated Guidance

Keep screen ownership explicit: persistent HUD is not a menu, a modal is not merely a higher sorting order, and a temporary toast should not steal focus. Profile Canvas rebuilds before splitting every widget into its own Canvas. Prefer serialized Inspector references over scene-wide searches in runtime UI code.

## Platform-Specific Guidance

For the new Input System, use `InputSystemUIInputModule` and let a project input action call `UIScreenRouter.HandleCancel()`; the sample's legacy polling is conditionally compiled under `ENABLE_LEGACY_INPUT_MANAGER`. Do not add two EventSystems. If a project mixes UI Toolkit and uGUI, assign sorting, input, and focus transfer to a named bridge owner rather than assuming equivalent trees; see [Unity UI Systems](ui-systems.md).

## Unsupported Absolutes

- The screenshot archive does not reveal Unity usage, Canvas count, prefab hierarchy, input implementation, or performance of any source game.
- One reference resolution, navigation layout, or stack implementation does not fit every genre and device.
- Passing batchmode compilation does not prove visual quality or interaction correctness.

## Verification Contract

In the actual Unity Editor Play Mode, open and close each screen repeatedly; test keyboard, gamepad, pointer, and touch where supported; check initial focus, wrap policy, cancel/back, modal blocking, and focus return. Test empty, loading, error, disabled, long localized text, 16:9, 21:9, 4:3, and a notched safe area. Capture live `uloop screenshot` images of those states and profile redraw and allocations on target hardware. Record any untested mode as unknown rather than passing it by inference.

## Source, License, And Attribution

The component architecture is locally authored. [Unity uGUI source at the pinned revision](https://github.com/Unity-Technologies/uGUI/tree/9edb4420267b6652090ece4c28c38bd98746a68e) informs the component boundary; [Interface In Game](https://interfaceingame.com/) supplies only linked metadata. No game screenshot, icon, font, or other protected asset is bundled with the samples.

## IA Navigation

Parent: [Game UI](../index.md).
Next: [Interface In Game Catalog](../interfaceingame/index.md).
