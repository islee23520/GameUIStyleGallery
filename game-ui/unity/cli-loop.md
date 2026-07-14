---
type: Domain Guide
title: Unity CLI Loop
description: Source-pinned workflow for inspecting and exercising Unity Game UI with unity-cli-loop while preserving UI-stack boundaries.
domain: game-ui
lifecycle: experimental
source_repository: https://github.com/hatayama/unity-cli-loop
source_path: README.md
source_revision: 61a0fe6d7da0aa9d0bcbc6d95944dd069c483ff0
platform: Unity 2022.3 or later as stated by the pinned source
platform_version: unity-cli-loop source snapshot 61a0fe6d7da0aa9d0bcbc6d95944dd069c483ff0
reviewed_on: 2026-07-14
---

# Unity CLI Loop

Primary role: Unity command-loop verification guide.

## Repository Boundary

This guide adapts the pinned unity-cli-loop command surface into a bounded Game UI inspection workflow. It documents what the audited source exposes for Editor control, hierarchy inspection, screenshots, uGUI interaction, input injection, and dynamic C# execution. No live Unity project was executed during this source review, so project compatibility and observed runtime results must be supplied by the user of the guide.

## Reusable Method

Use the loop in this order and preserve the evidence from each stage.

1. **Launch the matching Editor.** Run the launch workflow from the Unity project so its recorded Editor version is selected. The pinned README exposes `uloop launch`, project-path selection, build-target selection, and restart behavior in its [direct CLI section](https://github.com/hatayama/unity-cli-loop/blob/61a0fe6d7da0aa9d0bcbc6d95944dd069c483ff0/README.md#direct-cli-usage-advanced).
2. **Compile and clear the evidence surface.** Clear stale console entries when appropriate, run `compile`, wait for domain reload when the task requires it, then collect logs. Do not proceed to UI interaction while compile errors make the runtime state ambiguous.
3. **Inspect hierarchy and find objects.** Use the hierarchy and GameObject search workflows to locate Scenes, Transforms, `Canvas`, `EventSystem`, `UIDocument`, `UIRoot`, `UIPanel`, and other serialized components. The hierarchy service traverses GameObjects and Transforms in [`HierarchyService.cs`](https://github.com/hatayama/unity-cli-loop/blob/61a0fe6d7da0aa9d0bcbc6d95944dd069c483ff0/Packages/src/Editor/Core/CoreTools/HierarchyAnalyzer/HierarchyService.cs#L338-L379). A UI Toolkit VisualElement child is not a Transform child, so finding a `UIDocument` does not enumerate its runtime visual tree.
4. **Enter Play Mode when runtime evidence is required.** Use the Play Mode control workflow before rendering annotations, pointer simulation, runtime-created hierarchy inspection, or input recording. Capture logs immediately after state changes.
5. **Capture the correct screenshot.** An Editor-window screenshot can show editor chrome outside Play Mode. Use the Game View rendering capture and its annotations when coordinates or runtime UI evidence are needed. Keep the pre-action image.
6. **Simulate through the stack-appropriate route.** Use the dedicated uGUI pointer workflow for EventSystem-handled UI. Use Input System mouse or keyboard injection only when the project actually reads that input path. For UI Toolkit or NGUI, combine rendering, component inspection, and narrowly scoped project code while keeping their distinct event routes explicit.
7. **Use dynamic code for targeted inspection or mutation.** Query project state, inspect `UIDocument.rootVisualElement`, or make bounded editor changes with `execute-dynamic-code`. Treat the result as evidence of the code that ran, not as proof that a player-input path was exercised.
8. **Capture the result and save intentionally.** Collect the post-action screenshot and logs, compare the expected state, and explicitly save Scene or prefab changes when the task changed serialized content.

## Stack-Specific Interaction Boundary

| Stack | What the pinned workflow exposes | Required caution |
| --- | --- | --- |
| uGUI | Dedicated annotation scans uGUI `Selectable` and EventSystem handler targets. `simulate-mouse-ui` constructs pointer/drag events and requires Play Mode plus an EventSystem; ordinary Canvas interaction also needs the project's raycast path, commonly an active Graphic Raycaster. See [`UIElementAnnotator.cs`](https://github.com/hatayama/unity-cli-loop/blob/61a0fe6d7da0aa9d0bcbc6d95944dd069c483ff0/Packages/src/Editor/Utils/UIElementAnnotator.cs#L145-L215) and [`SimulateMouseUiTool.cs`](https://github.com/hatayama/unity-cli-loop/blob/61a0fe6d7da0aa9d0bcbc6d95944dd069c483ff0/Packages/src/Editor/Api/McpTools/SimulateMouseUi/SimulateMouseUiTool.cs#L31-L49). | Confirm the active EventSystem, input module, raycaster, blockers, selected object, and target Scene before interpreting a click or drag. |
| UI Toolkit | Rendering capture can show the Game View, and generic hierarchy inspection can find a `UIDocument` component. Dynamic C# can query its runtime `rootVisualElement`. | The VisualElement tree is Panel-owned rather than Transform-owned. At the pinned snapshot, the audited dedicated UI annotations and pointer tool are uGUI/EventSystem-oriented, so VisualElement lookup and manipulation remain project-specific work. |
| NGUI | Rendering capture and generic GameObject/component inspection can locate `UIRoot`, `UIPanel`, widgets, and `UICamera`. Dynamic C# can read or set component state. | NGUI's pinned [`UICamera`](https://github.com/tasharen/ngui/blob/9bbc56f11e0e25b89fd55b9b9bc67ddf1f182fe2/Assets/NGUI/Scripts/UI/UICamera.cs#L13-L43) performs its own raycasts and message dispatch with legacy `UnityEngine.Input` defaults. EventSystem dispatch or New Input System injection does not by itself demonstrate that UICamera processed the same pointer route. |

## Coordinate Contract

Use the `SimX` and `SimY` values returned by the rendering annotation directly with the matching simulation call. They are caller-facing Game View input coordinates with a top-left origin. Do not substitute Transform positions, RectTransform positions, or Editor-window pixels, and do not apply an extra Y-axis flip. Keep the screenshot resolution and Game View state with the coordinate evidence.

## Dynamic-Code Proof Boundary

The pinned dynamic-code skill describes a generic Editor execution mechanism and compilation/error reporting in [`uloop-execute-dynamic-code/SKILL.md`](https://github.com/hatayama/unity-cli-loop/blob/61a0fe6d7da0aa9d0bcbc6d95944dd069c483ff0/.agents/skills/uloop-execute-dynamic-code/SKILL.md#L22-L56). A direct property assignment or callback invocation can prove that the submitted code completed and that the inspected state changed. By itself it does not prove raycast blockers, hover and press transitions, drag thresholds, focus movement, cancellation, pointer capture, or the player's real input path.

## Opinionated Guidance

- Treat compile output, hierarchy output, screenshots, simulated input, and dynamic-code output as separate evidence types.
- Prefer the stack's real input path for behavior verification; reserve direct callbacks for diagnosis or tightly bounded setup.
- Keep before/after screenshots and logs beside the exact command parameters, project path, Unity version, Game View size, and Play Mode state.
- Reinspect the hierarchy after Play Mode begins when runtime-created UI or persistent objects matter.

## Platform-Specific Guidance

- For uGUI, find the Canvas, Graphic Raycaster, EventSystem, active input module, target Selectable or handler, and current selected object before simulation.
- For UI Toolkit, find the UIDocument through the GameObject hierarchy, then inspect the runtime VisualElement tree through project-specific code and record Panel/focus ownership.
- For NGUI, inspect UIRoot, UIPanel, UICamera, widget colliders or raycast configuration, and the legacy-input delegates actually in use.
- For mixed projects, state which tool action targets which input and hierarchy system; do not combine outcomes into one unnamed UI route.

## Unsupported Absolutes

- A successful screenshot does not prove interaction behavior.
- A found UIDocument does not prove that its VisualElement descendants were inspected.
- A direct callback does not prove pointer or keyboard dispatch.
- A changed component field does not prove that the serialized asset was saved.
- A tool command name does not prove that a particular project's packages, input configuration, or custom UI bridge satisfy its prerequisites.

## Verification Contract

For a complete UI loop, retain launch/version evidence, clean compile output, relevant logs, pre-action hierarchy, pre-action rendering screenshot, exact `SimX`/`SimY` or input parameters, the stack-specific input route, post-action screenshot, post-action logs, focus or selected-state evidence, and save confirmation for serialized edits. Repeat the critical interaction after a fresh Play Mode entry when persistence or initialization is part of the claim.

## Source, License, And Attribution

- Adapted source: [hatayama/unity-cli-loop README at `61a0fe6d7da0aa9d0bcbc6d95944dd069c483ff0`](https://github.com/hatayama/unity-cli-loop/blob/61a0fe6d7da0aa9d0bcbc6d95944dd069c483ff0/README.md)
- Source license: [MIT](https://github.com/hatayama/unity-cli-loop/blob/61a0fe6d7da0aa9d0bcbc6d95944dd069c483ff0/LICENSE.md)
- Reuse form: independently authored Game UI verification workflow based on the pinned command documentation and implementation paths; no upstream command output or project asset is reproduced.
- Review boundary: source inspection only; no live Unity project was run for this page.

## IA Navigation

Parent: [Game UI](../index.md).
Next: [Unity Repository Map](repository-map.md).
