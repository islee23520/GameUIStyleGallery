---
type: Domain Guide
title: Unity Game UI
description: Navigable hub for Unity implementation guidance and Unity organization snapshot discovery.
domain: game-ui
lifecycle: experimental
---

# Unity Game UI

Primary role: Unity implementation and discovery hub.

## Question To Route Matrix

Use the narrowest row that answers the question. Each default discovery route stays at ten or fewer repositories; widen through the compressed wiki only when the first route does not resolve the question.

| Question | Default route | Default candidate ceiling | Required return |
| --- | --- | ---: | --- |
| Which Unity UI stack owns this screen? | [Unity UI Systems](ui-systems.md) | 3 system sources | [Unity UI Architecture](architecture.md) |
| Where is current uGUI or UI Toolkit implementation evidence? | [Repository Map: concentrated UI signals](repository-map.md#concentrated-ui-signals) | 3 authority leads | [Unity UI Systems](ui-systems.md) |
| Which current sample demonstrates a bounded UI task? | [Repository Map: primary UI sources](repository-map.md#primary-ui-sources) | 4 current/sample leads | [Unity UI Architecture](architecture.md) |
| Is a named repository authority, example, historical, adjacent, forked, or archived? | [Unity Repository Map](repository-map.md) | 1 named repository | [Unity UI Systems](ui-systems.md) |
| Which engine subject constrains the UI problem? | [Unity Organization Compressed Wiki](org-wiki.md#bounded-cluster-deep-dives) | 3–7 leads per cluster | [Unity UI Architecture](architecture.md) |
| Which repositories match a term such as Canvas, Safe Area, XR, or Input? | [Unity Organization Term Lexicon](org-term-lexicon.md) | 12 examples maximum, usually fewer | [Unity Repository Map](repository-map.md) |
| How do I collect reproducible source evidence? | [Unity CLI Loop](cli-loop.md) | 1 pinned repository | [Game UI Reference Record](../reference-record.md) |
| Does a character or world-animation problem need the 3D path? | [Unity 3D Animation](animation/animation-3d.md) | 3–7 animation leads | [Unity Animation Systems](animation/index.md) |
| Does a sprite or skeletal-2D problem need the 2D path? | [Unity 2D Animation](animation/animation-2d.md) | 3–7 2D leads | [Unity Animation Systems](animation/index.md) |
| Who owns bootstrap, additive scene loading, persistent services, and unload? | [Unity Scene Systems](scene/index.md) | 1 scene-lifetime map | [Unity UI Architecture](architecture.md) |
| Should an object stay an asset, instance, variant, nested prefab, or pooled runtime object? | [Unity Prefab Systems](prefab/index.md) | 1 prefab-lifetime map | [Unity UI Architecture](architecture.md) |

Stars, organization placement, archive state, and recent pushes never select the route or establish authority.

## Repository Boundary

This subtree maps engine-neutral Game UI responsibilities into named Unity UI stacks and bounded engine-system guides, beginning with animation, then routes a bounded public-organization snapshot for discovery. It is independent research, is not affiliated with or endorsed by Unity Technologies, and does not turn repository placement into implementation authority.

## Reusable Method

Choose a reading order from the question you need to answer. Keep implementation evidence and organization discovery evidence separate, and return to the engine-neutral record before publishing a gallery conclusion.

## Band 2a — Unity UI Implementation

- [Unity UI Systems](ui-systems.md): choose or identify uGUI, UI Toolkit, NGUI, or a mixed stack.
- [Unity UI Architecture](architecture.md): map neutral ownership roles to Unity lifetime, roots, sorting, input, focus, scaling, motion, and teardown.
- [Unity CLI Loop](cli-loop.md): collect source-pinned command-line evidence and state what it cannot prove.

### Reading Order A — Implement

1. If the player task or hierarchy is unclear, start with the engine-neutral [Game UI Classification](../classification.md), [Screen Hierarchy](../screen-hierarchy.md), and [Reference Record](../reference-record.md).
2. Choose or identify the stack in [Unity UI Systems](ui-systems.md).
3. Assign ownership in [Unity UI Architecture](architecture.md).
4. Gather bounded evidence with [Unity CLI Loop](cli-loop.md).
5. Complete the engine-neutral [Game UI Reference Record](../reference-record.md).

## Band 2b — Unity Engine Systems

- [Unity Animation Systems](animation/index.md): choose the 2D or 3D path and assign world, character, content, camera, scene, prefab, and UI-handoff ownership.
- [Unity Scene Systems](scene/index.md): assign bootstrap, additive composition, `DontDestroyOnLoad`, activation, unload, and teardown ownership.
- [Unity Prefab Systems](prefab/index.md): assign asset, instance, variant, nested prefab, unpack, runtime instantiation, pooling, and teardown ownership.
- Content (planned): a future pack may cover content delivery without expanding the top-level domain list.

### Reading Order B — Animate

1. Start at [Unity Animation Systems](animation/index.md) and use its 2D-versus-3D decision gate.
2. Follow [Unity 3D Animation](animation/animation-3d.md) for Animator, Avatar, rigging, Timeline, and Cinemachine responsibilities, or [Unity 2D Animation](animation/animation-2d.md) for flipbook, SpriteRenderer, Sprite Skin, bones, sorting, and Tilemap coupling.
3. Return to [Unity UI Architecture](architecture.md) only for UI motion ownership and the explicit handoff between gameplay animation and interface state.
4. Pin repository, Unity, and installed package versions at use time before treating a discovery lead as evidence.

### Reading Order C — Compose And Instantiate

1. Start at [Unity Scene Systems](scene/index.md) when the question concerns bootstrap, additive scene composition, persistent services, activation, or unload.
2. Start at [Unity Prefab Systems](prefab/index.md) when the question concerns reusable assets, variants, nested prefabs, unpacking, runtime instantiation, pooling, or teardown.
3. Record the scene owner and prefab owner separately; a scene placement does not transfer source-asset ownership to the scene.
4. Return to [Unity UI Architecture](architecture.md) for screen, input, focus, and UI-root lifetime, and pin version-specific evidence before publishing a conclusion.

## Band 3 — Unity Organization Discovery

> **Discovery is not authority.** Organization membership, names, stars, recent pushes, and metadata matches are leads. Pin a relevant source revision and return to the implementation guides before making an architecture claim.

- [Unity Repository Map](repository-map.md): find likely authority, example, historical, or adjacent repositories.
- [Unity Organization Compressed Wiki](org-wiki.md): browse the complete 804-row snapshot through bounded clusters without generating per-repository pages.
- [Unity Organization Term Lexicon](org-term-lexicon.md): start from a system or engineering term and locate snapshot matches.

### Reading Order C — Discover

1. Start with a system or term in [Unity UI Systems](ui-systems.md) or the [Unity Organization Term Lexicon](org-term-lexicon.md).
2. Use the [Unity Repository Map](repository-map.md) to classify the repository's authority and lifecycle.
3. Use the [Compressed Wiki](org-wiki.md) and lexicon to widen or narrow the search.
4. Pin the exact repository SHA, Unity version, package version, and relevant path.
5. Return to [Unity UI Architecture](architecture.md) and test the lead against explicit ownership responsibilities.

## Opinionated Guidance

Use organization discovery to find evidence, never to choose a stack by popularity. A Unity implementation conclusion should name the engine-neutral responsibility, the selected stack, the exact owner, and the evidence surface that supports it.

## Platform-Specific Guidance

Record mixed-stack bridge points explicitly. A project can use uGUI, UI Toolkit, NGUI, IMGUI, native platform UI, or custom rendering in different surfaces; the hub does not imply one application-wide choice.

## Unsupported Absolutes

- Do not claim Unity affiliation, endorsement, authorship, support, or currency from organization placement.
- Do not treat the 804-row snapshot as a current support catalog.
- Do not create one page per captured repository.
- Do not import reusable Layout CSS or product visual defaults into this subtree.

## Verification Contract

An implementation route is complete only when the stack, ownership, version, source revision, runtime evidence, and unknowns are recorded. A discovery route is complete only when the lead is pinned and evaluated through the implementation guides.

## Source, License, And Attribution

This is a locally authored routing page over the tracked Unity Game UI corpus. Repository licenses and reuse terms remain repository-specific. Unity names are used descriptively without affiliation claims.

## IA Navigation

Parent: [Game UI](../index.md).
Next: [Unity UI Systems](ui-systems.md).
