---
type: Domain Guide
title: Unity Scene Systems
description: Ownership guide for Unity bootstrap, additive scene composition, persistent services, activation, unload, and teardown.
domain: game-ui
lifecycle: experimental
---

# Unity Scene Systems

Primary role: assign scene composition and lifetime ownership before a UI, gameplay space, or content flow depends on load order.

## Repository Boundary

This page owns Unity scene responsibilities: bootstrap entry, single versus additive loading, active-scene selection, `DontDestroyOnLoad` persistence, scene-local bindings, unload, and shutdown. It does not make a scene the owner of reusable prefab assets, UI focus policy, visual styling, or reusable Layout CSS. Prefab asset and instance lifetime belongs in [Unity Prefab Systems](../prefab/index.md); UI roots and screen lifetime remain in [Unity UI Architecture](../architecture.md).

## Reusable Method

### Scene Lifetime Map

| Responsibility | Recommended owner | Required decision |
| --- | --- | --- |
| Process entry | One bootstrap scene or equivalent startup path | Which object starts loading, and how duplicate bootstrap entry is rejected. |
| Cross-scene services | A deliberately small persistent root | Which services survive scene changes and who destroys them at application or session teardown. |
| Playable spaces and UI shells | Additively loaded scenes when simultaneous composition is required | Load order, activation gate, active scene, and unload trigger. |
| Scene-local references | The scene that serializes the placed objects | How references are rebound after additive load and cleared before unload. |
| Runtime instances | A named spawner, pool, or scene-local owner | Which scene or persistent system releases each instance. |

### Bootstrap And Additive Composition

Use one explicit bootstrap contract. It creates or validates persistent services, starts the first load operation, and remains small enough that re-entering play or loading a content scene directly cannot silently create a second service graph. When scenes load additively, record which scene becomes active because new runtime objects and lighting-sensitive operations can depend on that choice.

Treat loading and activation as separate phases when initialization must finish before presentation. Name the cancellation and failure path: a partially loaded scene must not leave input, cameras, event subscriptions, or loading UI under ambiguous ownership.

### `DontDestroyOnLoad` Lifetime

`DontDestroyOnLoad` changes lifetime; it does not establish uniqueness or teardown. Put persistent objects under a named root, guard against duplicates at the composition boundary, and record which session transition or application shutdown destroys them. Do not move arbitrary scene objects into persistent lifetime merely to preserve a reference.

### Unload And Teardown

Before unloading, stop new work, detach cross-scene observers, release scene-owned pooled instances, clear handles, and restore any authority transferred to the scene. Completion of an unload request is not proof that application-level references were released; verify the owners that can outlive the scene.

## Opinionated Guidance

Prefer a thin bootstrap plus additive, responsibility-named scenes when multiple spaces must coexist. Prefer a single scene when additive composition adds no real lifetime boundary. Persistent roots should contain services that genuinely span scenes, not a miscellaneous collection of objects that were difficult to rebind.

## Platform-Specific Guidance

Scene loading, activation timing, memory release, domain-reload behavior, and editor play-mode options vary by Unity version and project configuration. Test direct scene entry, build startup, interrupted loads, and target-player unload behavior. Verify the installed editor documentation before relying on version-specific async or serialization behavior.

## Unsupported Absolutes

- Do not claim additive scenes are always more scalable or that one scene is always simpler.
- Do not treat `DontDestroyOnLoad` as a singleton guarantee.
- Do not assume unloading a scene releases every referenced asset or managed object immediately.
- Do not make a persistent service graph the implicit owner of every scene object.
- Do not claim Unity affiliation or endorsement.

## Verification Contract

Test cold start, direct content-scene entry, duplicate bootstrap entry, additive load and activation, active-scene selection, load failure or cancellation, reload, unload, persistent-service uniqueness, cross-scene reference cleanup, and application or session teardown. Record Unity version, play-mode settings, load API, scene owners, persistent owners, runtime evidence, and pinned source evidence. Consumer reference: `not_applicable` — docs-only engine guidance does not produce a consumer-reference record.

## Source, License, And Attribution

This is a locally authored synthesis over Unity scene-lifetime concepts and the existing StyleGallery ownership guides. No external repository SHA is asserted here; verify Unity-version-specific behavior against the installed editor and pin any implementation source used as evidence. Unity names are used descriptively without affiliation claims.

## IA Navigation

Parent: [Unity Game UI](../index.md).
Next: [Unity Game UI](../index.md).
