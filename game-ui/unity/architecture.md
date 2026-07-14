---
type: Domain Guide
title: Unity UI Architecture
description: Unity-specific mapping from engine-neutral game UI hierarchy to Scenes, Canvas layers, prefabs, runtime instances, and motion ownership.
domain: game-ui
lifecycle: experimental
source_repository: https://github.com/annulusgames/UGUIAnimationSamples
source_path: README.md
source_revision: 343c8110e5683be209cc01ccb4cb986175e61643
platform: Unity uGUI and legacy Unity UI stacks
platform_version: verify-per-entry
reviewed_on: 2026-07-13
---

# Unity UI Architecture

Primary role: Unity hierarchy and implementation guide.

## Repository Boundary

This page maps the engine-neutral [Game UI Screen Hierarchy](../screen-hierarchy.md) to Unity concepts. It does not define game UI classification, require one universal Scene or Canvas structure, or treat a sample repository as a complete production architecture.

## Reusable Method

Inspect a Unity UI reference in this order:

1. Record the Unity editor and UI package versions.
2. Identify the Scene or persistent bootstrap object that owns UI lifetime.
3. Locate root Canvas, UIDocument, or legacy NGUI panel boundaries.
4. Identify screen, HUD, modal, transient, and world-space hosts.
5. Trace prefab assets, nested prefabs, variants, scene instances, and runtime-created instances.
6. Record sorting, input routing, focus, scaling, animation, and teardown ownership.
7. Compare the rendered result with the engine-neutral Game UI record.

## Scene And Runtime Hierarchy

Unity's Hierarchy window shows GameObjects in the loaded Scene, including prefab instances. It does not by itself reveal asset ownership, runtime-created objects, persistent objects from another Scene, or the complete navigation policy.

```text
Bootstrap or Loaded Scene
├── Persistent UI Services
│   ├── EventSystem or Input Router
│   ├── Loading and Blocking Host
│   └── Notification Host
├── Screen-Space UI Root
│   ├── Screen Canvas or UIDocument
│   ├── HUD Canvas
│   ├── Modal Canvas
│   └── Transient Effects Canvas
└── World-Space UI Roots
    ├── Markers
    ├── Labels
    └── Interaction Prompts
```

Treat this as a responsibility map. A project may combine or split these roots according to rebuild cost, sorting, camera setup, lifetime, input, and team ownership.

## Prefab Hierarchy

| Unity concept | What it represents | Review question |
| --- | --- | --- |
| Prefab asset | Reusable serialized GameObject hierarchy | What stable responsibility does the asset own? |
| Prefab instance | Scene or runtime occurrence linked to an asset | Which properties are overrides, and who owns its lifetime? |
| Nested prefab | Prefab instance preserved inside another prefab | Does nesting express reuse or hide cross-component coupling? |
| Prefab variant | Asset inheriting from another prefab | Are differences intentional variants or accumulated overrides? |
| Unpacked object | Hierarchy no longer linked as an instance | Was the loss of inheritance deliberate and recorded? |
| Runtime instance | Object created during play | Where is it parented, initialized, focused, pooled, and destroyed? |

Use prefab boundaries for stable ownership and reuse. Do not create a prefab for every visual node, and do not let a large screen prefab silently own global routing, data services, or unrelated modal layers.

## Canvas And Layer Ownership

| Layer responsibility | Typical Unity realization | Evidence to capture |
| --- | --- | --- |
| Persistent services | DontDestroyOnLoad root or bootstrap Scene | Creation order, duplicate prevention, teardown policy |
| Active screen | Screen prefab under a screen host | Navigation boundary, initial focus, close behavior |
| HUD | Dedicated Canvas or stable subtree | Camera relationship, update ownership, visibility policy |
| Modal | Sorting layer with blocker and popup stack | Raycast blocking, stacking, cancellation, focus return |
| Transient feedback | Pooled toast, tooltip, reward, or effect host | Sorting, pooling, interruption, time source |
| World-linked UI | World Space Canvas or camera-projected element | Target loss, occlusion, distance, camera switching |

Nested Canvases can isolate rebuild and sorting behavior, but they also create additional ownership and ordering decisions. Record why a Canvas boundary exists rather than treating each panel as a new Canvas by default.

## Component Hierarchy

A reusable Unity UI component commonly separates these roles:

```text
Component Prefab Root
├── Layout Root
├── Visual States
├── Content Bindings
├── Interaction Target
├── Optional Feedback Effects
└── Component Controller
```

- `RectTransform` hierarchy expresses layout and parenting, not business ownership by itself.
- `CanvasGroup` may coordinate visibility, interaction, and raycast blocking; verify all three properties.
- `Selectable` navigation and EventSystem state require keyboard and gamepad evidence, not only pointer behavior.
- ScrollRect structures should make viewport, content, scrollbar, cell reuse, and scroll ownership explicit.
- Text components require localization, fallback, wrapping, material, and dynamic-size evidence.

## Motion Ownership

The pinned UGUI Animation Samples snapshot uses Unity `2022.3.7f1`, uGUI `1.0.0`, and TextMesh Pro `3.0.7`. Its four sample Scenes cover hover, button, text, and toggle motion. LitMotion drives the sample motion, while the text example also uses UniTask for button-click subscriptions. Each Scene contains a Screen Space Overlay Canvas, Canvas Scaler, and EventSystem.

Use this snapshot as focused evidence for component interaction motion, not as a scene or prefab architecture template. It does not establish keyboard or gamepad coverage, responsive behavior, multi-Scene lifetime, or production teardown policy. Most hover and button scripts cancel motion handles during `OnDestroy`; the two toggle scripts do not, so the snapshot does not support a universal cancellation claim.

Record whether motion is owned by Animator, a tween library, Timeline, a custom update loop, or a mixed system. For every transition, identify the trigger, animated properties, time source, cancellation behavior, disabled-object behavior, completion callback, and final state. A parent screen transition must not leave child controls focused, interactive, or visually stale.

## Opinionated Guidance

- Separate Scene lifetime, layer lifetime, screen lifetime, and component lifetime.
- Prefer a small number of named layer hosts over ad hoc sorting overrides across unrelated prefabs.
- Keep screen prefabs focused on one primary player task; route global blockers and notifications through explicit hosts.
- Use nested prefabs and variants when inheritance is intentional and reviewable, not merely to reduce duplication at any cost.
- Capture both Prefab Mode and runtime Hierarchy evidence because either view alone is incomplete.

## Platform-Specific Guidance

- Record whether the entry uses uGUI, UI Toolkit, legacy NGUI, or a mixed stack.
- For uGUI, capture Canvas render mode, Canvas Scaler settings, sorting configuration, Graphic Raycaster, EventSystem, and relevant input module.
- For UI Toolkit, capture Panel Settings, UIDocument ownership, visual tree source, style-sheet sources, focus behavior, and runtime document lifecycle.
- For legacy or mixed stacks, name the bridge points, camera and sorting relationships, input ownership, and migration limits.
- Recheck behavior against the current Unity Manual and package documentation for the recorded version.

## Unsupported Absolutes

- Do not require one Canvas for an entire application or one Canvas per screen.
- Do not equate Scene hierarchy order with render order, input priority, or lifetime ownership.
- Do not assume a prefab instance is unchanged; inspect overrides and variants.
- Do not call a UI responsive because Canvas Scaler is present.
- Do not infer runtime behavior from YAML, asset paths, or prefab names alone.
- Do not claim one animation system is faster or easier to maintain without measurements and project constraints.

## Verification Contract

Open the target Scene and Prefab Mode, then enter Play Mode. Capture the loaded Scene hierarchy, persistent objects, root UI hosts, prefab instance links and overrides, Canvas settings, sorting, EventSystem selection, and runtime-created objects. Exercise scene changes, repeated screen open and close, nested modals, focus return, safe areas, long localized text, paused or scaled time, and interrupted transitions.

Repository YAML and metadata can establish hierarchy leads, but rendered appearance and runtime ownership remain unverified until Editor and Play Mode evidence is attached.

## Source, License, And Attribution

- Public sample reference: [annulusgames/UGUIAnimationSamples](https://github.com/annulusgames/UGUIAnimationSamples/tree/343c8110e5683be209cc01ccb4cb986175e61643)
- Snapshot: `343c8110e5683be209cc01ccb4cb986175e61643`
- Snapshot license: [The Unlicense](https://github.com/annulusgames/UGUIAnimationSamples/blob/343c8110e5683be209cc01ccb4cb986175e61643/LICENSE)
- Unity Manual: [Manage GameObjects in the Hierarchy window](https://docs.unity3d.com/Manual/Hierarchy.html)
- Unity Manual: [Prefabs](https://docs.unity3d.com/Manual/Prefabs.html)
- Unity Manual: [Create prefabs](https://docs.unity3d.com/Manual/CreatingPrefabs.html)
- Unity UI package manual: [Canvas](https://docs.unity3d.com/Packages/com.unity.ugui@latest/index.html?subfolder=/manual/UICanvas.html)
- Reuse form: independent, project-neutral architecture and review method; no game assets or upstream implementation samples are reproduced.

## IA Navigation

Parent: [Game UI](../index.md).
Next: [Platform Guides](../../platform-guides/index.md).
