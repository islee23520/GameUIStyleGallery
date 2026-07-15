---
type: Domain Guide
title: Unity 3D Animation
description: Ownership guide for Unity character, humanoid, rigged, sequenced, and camera-coupled animation.
domain: game-ui
lifecycle: experimental
---

# Unity 3D Animation

Primary role: assign 3D character and content animation ownership across Animator, Avatar, rigs, prefabs, scenes, Timeline, cameras, and UI handoffs.

## Repository Boundary

This page owns world, character, prop, cutscene, and camera-motion implementation. It does not own UI control transitions, USS transitions, focus, screen lifetime, or reusable Layout CSS. UI state may observe animation events, but [Unity UI Architecture](../architecture.md) remains the UI authority.

## Reusable Method

### Animator And Clip Ownership

- Treat an Animation Clip as authored motion data, not the state machine or lifetime owner.
- Use an Animator Controller to name states, parameters, transitions, blend trees, layer weights, interruption rules, and exit behavior.
- Use blend trees when a continuous parameter genuinely selects or mixes motion; do not hide unrelated gameplay states inside a blend space.
- Give each layer one coherent responsibility. Record its default and runtime weight, blending mode, and whether an Avatar Mask limits affected transforms.
- Treat Animator parameters as a boundary API. Name which gameplay system writes them and which system clears triggers or resets state during teardown.

### Humanoid, Generic, And Legacy Gate

| Rig path | Use when | Ownership caution |
| --- | --- | --- |
| Humanoid | A human-shaped Avatar needs retargeting and humanoid muscle mapping. | Validate Avatar mapping and root transforms; retargeting does not guarantee identical contacts or proportions. |
| Generic | A non-humanoid or project-specific hierarchy needs Animator playback without humanoid retargeting semantics. | Record the animation root and hierarchy contract; prefab/model reimports can invalidate paths. |
| Legacy | Maintaining an existing Animation-component pipeline with an explicit migration constraint. | Treat it as compatibility context, not the default recommendation for new Animator/Mecanim work. |

### Animation Rigging

Animation Rigging constraints add procedural or corrected pose ownership after or around authored animation. Record the rig layer, constraint targets, evaluation order, weight owner, and what happens when a target disappears. It is not a replacement for the gameplay state machine.

### Timeline And Cinemachine Coupling

Timeline owns a bounded sequence when shots, animation tracks, signals, audio, or activation need a shared clock. Cinemachine owns camera selection, framing, blending, and shot behavior; it does not own UI hierarchy or focus. Define who starts, skips, interrupts, and tears down the sequence, and how gameplay and UI regain authority afterward.

### Prefab And Scene Ownership

- The model asset owns imported meshes, rig hierarchy, Avatar configuration, and imported clips.
- The animated-character prefab owns the assembled Animator, controller assignment, rig constraints, gameplay adapters, and stable serialized references.
- The scene owns placement and scene-specific bindings such as Timeline directors, cameras, spawn points, and temporary targets.
- Runtime instances own transient parameters and handles; teardown must unsubscribe signals and release bindings without mutating the source prefab.

### UI Motion Handoff

Project gameplay animation state into a small UI-facing state or event contract. A hit reaction may emit health or status changes, and a cutscene may request HUD suppression, but the Animator or Timeline should not directly own selectable transitions, focus restoration, or screen destruction.

## Opinionated Guidance

Prefer explicit interruption and teardown contracts over transitions that work only when clips finish normally. Keep locomotion, additive reactions, equipment, facial motion, and cutscene overrides separate when they have different state owners or cancellation rules.

## Platform-Specific Guidance

Verify the Unity editor version and installed packages before applying package-specific advice. For Animation Rigging, Timeline, or Cinemachine, inspect the project's package manifest and documentation for that installed version. Model importer, rig, compression, and root-motion behavior must be tested on the actual assets and target build.

## Failure Modes

- Animator root motion and gameplay movement both write position or rotation, producing drift, snapping, or double motion.
- A layer remains at zero or stale weight, or an Avatar Mask affects the wrong transforms.
- Trigger and transition interruption rules create stuck, skipped, or repeated states.
- Rig targets are destroyed or rebound without clearing constraint weights and references.
- Timeline activation, signals, or camera blends survive skip/scene teardown and leave gameplay or UI authority disabled.
- A scene object owns references that should live on the reusable character prefab, or a prefab captures scene-only bindings.

## Evidence Leads

These are non-fork discovery leads from the tracked inventory's `primary_cluster=animation`; they are not pinned implementation authority.

| Lead | Discovery use | Evidence disposition |
| --- | --- | --- |
| [animation-rigging-advanced-character-interaction](https://github.com/Unity-Technologies/animation-rigging-advanced-character-interaction) | Constraint and target interaction concepts. | Pin at use time; classify in the [repository map](../repository-map.md). |
| [animation-rigging-crane-example](https://github.com/Unity-Technologies/animation-rigging-crane-example) | Non-humanoid rigging example. | Pin at use time; verify installed Animation Rigging version. |
| [animation-rigging-workshop-siggraph2019](https://github.com/Unity-Technologies/animation-rigging-workshop-siggraph2019) | Historical workshop lead for rig constraints. | Pin at use time and preserve dated context. |
| [TimelineSignalsTutorial](https://github.com/Unity-Technologies/TimelineSignalsTutorial) | Timeline Signals sequencing lead. | Pin at use time; sample structure is not authority. |
| [Timeline-Cinemachine-Test-Suite](https://github.com/Unity-Technologies/Timeline-Cinemachine-Test-Suite) | Timeline and Cinemachine coupling lead. | Pin at use time; test-suite coverage is not UI ownership. |
| [com.unity.cinemachine](https://github.com/Unity-Technologies/com.unity.cinemachine) | Camera package source discovery. | Match repository revision to installed package version before use. |

## Unsupported Absolutes

- Do not claim Humanoid is better than Generic for every character.
- Do not claim root motion or scripted movement is universally preferable.
- Do not infer current package support from an unarchived repository or recent push.
- Do not treat Timeline, Cinemachine, or Animator as UI authority.

## Verification Contract

Test entry, steady playback, blend boundaries, interruption, disabled objects, missing rig targets, scene unload, prefab re-instantiation, Timeline skip, and camera restoration. Record Unity and installed package versions plus pinned repository/path evidence. Consumer reference: `not_applicable` — docs-only engine guidance does not produce a consumer-reference record.

## Source, License, And Attribution

This is a locally authored synthesis. Repository leads come from the tracked non-fork animation cluster and retain repository-specific licenses. No repository SHA is asserted here; pin the exact revision and relevant path at use time. Unity names are used descriptively without affiliation claims.

## IA Navigation

Parent: [Unity Animation Systems](index.md).
Next: [Unity Animation Systems](index.md).
