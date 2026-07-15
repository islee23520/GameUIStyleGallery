---
type: Domain Guide
title: Unity Prefab Systems
description: Ownership guide for Unity prefab assets, instances, variants, nesting, unpacking, runtime instantiation, pooling, and teardown.
domain: game-ui
lifecycle: experimental
---

# Unity Prefab Systems

Primary role: preserve the boundary between reusable prefab assets and runtime instance lifetime from authoring through teardown.

## Repository Boundary

This page owns prefab asset, instance, override, variant, nested-prefab, unpack, instantiation, pooling, and release decisions. It does not own scene bootstrap, additive load order, UI focus, visual styling, or reusable Layout CSS. Scene composition belongs in [Unity Scene Systems](../scene/index.md); UI-root and screen ownership remain in [Unity UI Architecture](../architecture.md).

## Reusable Method

### Asset-To-Instance Decision Gate

| Need | Route | Ownership caution |
| --- | --- | --- |
| Reuse one authored object graph | Prefab asset and connected instance | Keep intentional instance overrides small and reviewable. |
| Share a base while authoring stable differences | Prefab Variant | Put shared structure in the base; do not build deep inheritance to avoid composition decisions. |
| Compose reusable subgraphs | Nested Prefab | Name which asset owns each nested boundary and serialized reference. |
| Permanently sever asset linkage | Unpack, or unpack completely when nested links must also be removed | Record why future base updates must no longer propagate. |
| Create transient runtime objects | Instantiate through a named factory or spawner | The creator must assign an explicit runtime owner and teardown path. |
| Reuse frequently created objects | Pool behind a reset contract | Returning to the pool replaces destruction but does not replace cleanup. |

### Asset, Variant, And Nested Ownership

The prefab asset owns reusable serialized structure and defaults. A scene instance owns placement and deliberate overrides; it must not become an accidental second source of truth. A variant should represent a stable authored specialization, while a nested prefab should preserve an independently reusable subgraph. Record override ownership before applying changes back to an asset.

### Unpack Boundary

Unpack only when the object must become independently authored and the loss of propagation is intentional. Distinguish unpacking the outer root from completely removing nested prefab connections. Before unpacking, identify the future update path, variant alternative, and references that depend on the current asset boundary.

### Instantiate, Pool, And Teardown

Every runtime instance needs a creator, lifetime owner, and release operation. For ordinary instances, teardown destroys the object after subscriptions, async work, handles, and external registrations are released. For pooled instances, return must disable behavior, unsubscribe observers, cancel outstanding work, clear transient references, restore required defaults, and make double-return detectable. Pool ownership must not silently outlive the scene or session that owns its dependencies.

## Opinionated Guidance

Prefer shallow prefab relationships with explicit composition over deep variant chains. Keep scene overrides exceptional. Use pooling only when measured creation or collection cost justifies the reset contract; a pool is a lifetime system, not a universal performance switch.

## Platform-Specific Guidance

Prefab serialization, override presentation, nested behavior, enter-play-mode settings, and instantiation cost vary by Unity version, asset type, and target platform. Verify editor behavior and target-player profiling with the actual object graph. When using addressable or package-provided instantiation, record the matching release API and installed package version.

## Unsupported Absolutes

- Do not claim variants are always better than composition or duplication.
- Do not unpack merely to make an override warning disappear.
- Do not assume destroying a GameObject releases every external registration or asset handle.
- Do not assume pooled objects are clean because they are inactive.
- Do not claim pooling improves performance without target-player evidence.
- Do not claim Unity affiliation or endorsement.

## Verification Contract

Test asset edits, instance overrides, apply and revert, variant inheritance, nested-prefab edits, outer and complete unpacking, runtime instantiation, disabled and re-enabled state, pool checkout and return, double release, scene unload, session restart, missing dependencies, and final teardown. Record Unity and package versions, asset owner, instance owner, override policy, pool reset contract, release API, runtime profiling, and pinned source evidence. Consumer reference: `not_applicable` — docs-only engine guidance does not produce a consumer-reference record.

## Source, License, And Attribution

This is a locally authored synthesis over Unity prefab-lifetime concepts and the existing StyleGallery ownership guides. No external repository SHA is asserted here; verify Unity-version-specific behavior against the installed editor and pin any implementation source used as evidence. Unity names are used descriptively without affiliation claims.

## IA Navigation

Parent: [Unity Game UI](../index.md).
Next: [Unity Game UI](../index.md).
