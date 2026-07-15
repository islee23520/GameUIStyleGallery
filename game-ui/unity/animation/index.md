---
type: Domain Guide
title: Unity Animation Systems
description: Decision hub for Unity world, character, content, camera, and UI-handoff animation ownership.
domain: game-ui
lifecycle: experimental
---

# Unity Animation Systems

Primary role: route Unity animation work to a 2D or 3D implementation path without merging engine animation into interface-motion guidance.

## Repository Boundary

This guide owns engine implementation knowledge for Animator/Mecanim, clips, layers, Avatars, humanoid and generic rigs, Animation Rigging, Timeline, Cinemachine as a camera-motion director, and Unity 2D Animation concepts. It also owns the handoff from world or character animation into UI state.

It does not own selectable transitions, USS transitions, reusable Layout CSS, visual styling, or interface-motion vocabulary. Those UI implementation concerns remain in [Unity UI Systems](../ui-systems.md) and [Unity UI Architecture](../architecture.md). Use the StyleGallery [Motion domain](../../../motion/index.md) only to name and review interface motion; it is not a substitute for Unity animation-system ownership.

## Reusable Method

### 2D Versus 3D Decision Gate

| Dominant authored asset and runtime responsibility | Route | Do not infer |
| --- | --- | --- |
| Skinned mesh, humanoid or generic Avatar, retargeting, root motion, rig constraints, character-camera sequence | [Unity 3D Animation](animation-3d.md) | That every non-humanoid prop needs a Humanoid Avatar. |
| Sprite frame sequence, SpriteRenderer swap, Sprite Skin deformation, 2D bones, Tilemap or sprite sorting | [Unity 2D Animation](animation-2d.md) | That 2D visuals remove the need for Animator state ownership. |
| UI control transition, screen entrance, USS transition, menu feedback | [Unity UI Architecture](../architecture.md#motion-ownership) and [Motion](../../../motion/index.md) | That world-animation systems should own interface lifetime or focus. |
| Mixed scene with 2D presentation and 3D rigs/cameras | Choose by the owner of each animated object, then record the bridge | That one project must choose a single global path. |

### Reading Order

1. Classify the animated object and state owner with the gate above.
2. Read the [3D path](animation-3d.md) or [2D path](animation-2d.md).
3. Use the [organization wiki animation and 2d clusters](../org-wiki.md#exclusive-cluster-index) only for discovery leads.
4. Apply the [repository-map disposition](../repository-map.md) and pin the exact repository revision, Unity version, installed package version, and relevant paths at use time.
5. Return to [Unity UI Architecture](../architecture.md) to document only the UI handoff: events, state projection, interruption, focus, and teardown.

## Opinionated Guidance

Choose ownership before choosing assets or tools. An Animator state, Timeline sequence, rig constraint, camera shot, and UI transition can all react to the same gameplay event, but they should not silently control one another's lifetime.

## Platform-Specific Guidance

Package availability, serialization, import behavior, rendering, and performance can vary by Unity editor and package version. Verify the installed package manifest and target-player behavior; repository names and organization membership are discovery metadata, not proof of current support.

## Unsupported Absolutes

- Do not claim 2D or 3D is universally simpler, faster, or more maintainable.
- Do not call Cinemachine a UI authority; it directs cameras and shots.
- Do not treat Timeline as the owner of every animation state.
- Do not merge the StyleGallery Motion domain into Unity character or world animation.
- Do not claim Unity affiliation or endorsement.

## Verification Contract

Record the animated object, authored asset type, state owner, playback owner, scene or prefab owner, camera coupling, UI handoff, interruption behavior, teardown behavior, Unity version, installed package versions, and pinned evidence. Consumer reference: `not_applicable` — docs-only engine guidance does not produce a consumer-reference record.

## Source, License, And Attribution

This is a locally authored synthesis over the tracked Unity organization inventory and existing StyleGallery ownership guides. Inventory animation and 2d clusters are discovery-only. External package documentation must be verified against the installed package version at use time. Unity names are used descriptively without affiliation claims.

## IA Navigation

Parent: [Unity Game UI](../index.md).
Next: [Unity 3D Animation](animation-3d.md).
