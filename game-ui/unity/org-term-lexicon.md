---
type: Domain Guide
title: Unity Organization Term Lexicon
description: Word-based decomposition of Unity-Technologies public repository insights for Game UI discovery, indexed from the tracked 804-row snapshot.
domain: game-ui
lifecycle: experimental
platform: Unity-Technologies public GitHub organization
platform_version: public repository snapshot captured 2026-07-14T12:59:16Z
reviewed_on: 2026-07-15
---

# Unity Organization Term Lexicon

Primary role: decompose Unity organization repository insights into individual terms so readers can look up a word, not only a cluster.

> **Independent research — not affiliated with or endorsed by Unity Technologies. Snapshot evidence, not a support-status catalog.**

> **Discovery is not authority.** Use a term to find a lead, verify it in the [Repository Map](repository-map.md), pin the relevant SHA and version, then return through [Unity UI Systems](ui-systems.md) and [Unity UI Architecture](architecture.md) before making an implementation claim.

This page is a **term index**, not a second encyclopedia and not 804 repository pages. Each entry defines one word or short phrase, states when a Game UI engineer should open related repositories, states what the word must not be stretched into, and points at inventory matches from the tracked snapshot.

Machine companion: [`data/unity-org-term-index.json`](data/unity-org-term-index.json).  
Repository inventory: [`data/unity-technologies-public-repositories.json`](data/unity-technologies-public-repositories.json).  
Cluster route: [Unity Organization Compressed Wiki](org-wiki.md).  
UI authority route: [Unity Repository Map](repository-map.md) and [Unity UI Systems](ui-systems.md).

For UI-shaped terms, start with the concentrated 13-row projection in the [Repository Map](repository-map.md#concentrated-ui-signals). The examples below may narrow that set, but they do not add repositories or alter machine-counted matches.

## Repository Boundary

- Terms are derived from the public Unity-Technologies organization snapshot captured at `2026-07-14T12:59:16Z` (804 repositories).
- Match counts use repository **name, description, topics, primary cluster, and UI relevance** heuristics. They do **not** re-scan default-branch file trees.
- A match count of `0` means the term did not appear in that metadata surface for this snapshot. The term may still be real in manuals, package APIs, or path-level UI scans recorded elsewhere.
- NGUI is third-party and is listed only as an external comparison term. It is never part of the 804-row inventory count.
- Organization placement, stars, and match counts are discovery signals. They are not authorship, support, or quality claims.

## Reusable Method

1. Start from the player or engineering question as a **word** (for example `Canvas`, `Netcode`, `Safe Area`).
2. Read that term's definition, Game UI use, and "not that" boundary below.
3. Open the JSON companion for example repository URLs and histograms.
4. Route UI-system decisions through [Unity UI Systems](ui-systems.md) and lifecycle through [Unity Repository Map](repository-map.md).
5. Before citing any repository as guidance, pin Unity/package version and source revision.

Reading order for evidence: versioned manuals and package docs → SHA-pinned implementation source → current version-bounded examples → dated announcements → historical demos → community anecdotes.

## How To Read A Term Entry

| Field | Meaning |
| --- | --- |
| **Term** | Canonical word or short phrase |
| **Aliases** | Common spellings in repo names and docs |
| **Definition** | What the word means in this inventory |
| **Game UI use** | When to open related sources |
| **Not that** | Forbidden overclaim |
| **Matches** | How many of 804 rows matched metadata heuristics |
| **Examples** | Highest-signal matched repositories (when any) |

## Core UI System Terms

### uGUI

- **Aliases:** ugui, com.unity.ugui
- **Definition:** Unity GameObject/Canvas UI package source and runtime system.
- **Game UI use:** Inspect Canvas, Graphic, EventSystem, Selectable, ScrollRect, or TMP-in-uGUI source.
- **Not that:** Not UI Toolkit; not NGUI; not a visual style guide.
- **Matches:** 1 (authority repository itself dominates the name surface)
- **Examples:** [Unity-Technologies/uGUI](https://github.com/Unity-Technologies/uGUI)

### UI Toolkit

- **Aliases:** uitoolkit, ui-toolkit
- **Definition:** Managed UI system built on VisualElement trees, UXML, and USS for editor and runtime UI.
- **Game UI use:** Panel/UIDocument architecture, runtime or editor UI Toolkit questions, current samples such as BagelGame.
- **Not that:** Not uGUI Canvas; not archived UIWidgets; not a CSS design system for StyleGallery Layout.
- **Matches:** 24 metadata hits (includes samples and adjacent wording)
- **Start with:** [BagelGame](https://github.com/Unity-Technologies/BagelGame), [ui-toolkit-manual-code-examples](https://github.com/Unity-Technologies/ui-toolkit-manual-code-examples), [UIToolkitUnityRoyaleRuntimeDemo](https://github.com/Unity-Technologies/UIToolkitUnityRoyaleRuntimeDemo) (historical baseline)

### UIElements

- **Aliases:** uielements
- **Definition:** Historical and namespace lineage name for material now usually productized as UI Toolkit.
- **Game UI use:** Older demos, Unite samples, and engine module paths still named UIElements.
- **Not that:** Not a separate current product stack; unarchived status does not modernize a 2019–2020 baseline.
- **Matches:** 3
- **Examples:** [UIElementsExamples](https://github.com/Unity-Technologies/UIElementsExamples), Unite CPH/LA demos

### UIDocument

- **Aliases:** uidocument
- **Definition:** Attachment of a VisualTreeAsset-derived VisualElement tree to Panel Settings.
- **Game UI use:** Map engine-neutral screen hierarchy onto UI Toolkit document ownership ([architecture.md](architecture.md)).
- **Not that:** Not a Canvas; VisualElement children are not Transform children.
- **Matches:** 0 in name/description metadata — use [UnityCsReference](https://github.com/Unity-Technologies/UnityCsReference) path pins in [ui-systems.md](ui-systems.md)

### VisualElement

- **Aliases:** visualelement
- **Definition:** Node type in the UI Toolkit visual tree.
- **Game UI use:** Hierarchy, layout, focus, and binding ownership questions.
- **Not that:** Not GameObject/RectTransform; not NGUI UIWidget.
- **Matches:** 0 in metadata — path-level authority only

### UXML

- **Aliases:** uxml
- **Definition:** Markup for UI Toolkit visual trees.
- **Game UI use:** Document structure and control composition examples.
- **Not that:** Not uGUI prefab hierarchy; tree-scan hits elsewhere do not appear in this metadata count.
- **Matches:** 0 in metadata

### USS

- **Aliases:** uss
- **Definition:** Style sheet language for UI Toolkit presentation.
- **Game UI use:** Style resolution and separation of presentation from layout ownership.
- **Not that:** Not StyleGallery Layout CSS; not product visual defaults.
- **Matches:** 0 in metadata

### Canvas

- **Aliases:** canvas
- **Definition:** uGUI rendering and hierarchy host for Graphic components.
- **Game UI use:** Screen layering, rebuild, and raycast ownership for GameObject UI.
- **Not that:** Not UI Toolkit Panel.
- **Matches:** 0 in metadata — see uGUI source and architecture guide

### EventSystem

- **Aliases:** eventsystem
- **Definition:** uGUI input routing host that runs an active BaseInputModule.
- **Game UI use:** Click, drag, select, and navigation ownership for Canvas UI.
- **Not that:** Not NGUI UICamera; not UI Toolkit Panel focus by itself.
- **Matches:** 0 in metadata

### Input System

- **Aliases:** inputsystem, input-system
- **Definition:** Package for devices, actions, and UI integration modules.
- **Game UI use:** UI action maps, gamepad-as-cursor, `InputSystemUIInputModule`.
- **Not that:** Not a layout system; not the complete UI Toolkit input story alone.
- **Matches:** 4
- **Examples:** [InputSystem](https://github.com/Unity-Technologies/InputSystem)

### Panel

- **Aliases:** panel, runtimepanel
- **Definition:** UI Toolkit host for a VisualElement tree, repaint, focus, and events.
- **Game UI use:** Architecture claims against UnityCsReference `Modules/UIElements`.
- **Not that:** Not uGUI Canvas; pin Unity version branch.
- **Matches:** 0 in metadata

### IMGUI

- **Aliases:** imgui, ongui
- **Definition:** Immediate-mode GUI used in editor tooling and legacy runtime paths.
- **Game UI use:** Editor tool UI and compare-table context.
- **Not that:** Not modern runtime HUD default; Input System compatibility limits apply.
- **Matches:** 0 in metadata

### TextMesh Pro

- **Aliases:** textmeshpro, tmp, textmesh
- **Definition:** Text stack currently sourced under the uGUI package tree in this org snapshot.
- **Game UI use:** Text rendering and TMP package manual claims via uGUI paths.
- **Not that:** No standalone TextMeshPro org source repository in the 804-row inventory.
- **Matches:** 0 in metadata

### Localization

- **Aliases:** localization, i18n, l10n
- **Definition:** Locale and string-delivery concerns, often package- or sample-hosted.
- **Game UI use:** Cross-cutting evidence for language, fallback, and RTL/font work.
- **Not that:** Exclusive taxonomy keeps `localization-text` as a reserved zero-primary facet; that is not proof the org has no localization assets.
- **Matches:** 0 in metadata name surface

### Accessibility

- **Aliases:** accessibility, a11y
- **Definition:** Assistive technology and focus-order evidence layer.
- **Game UI use:** Version-pinned a11y samples and manuals.
- **Not that:** Stack choice alone does not prove assistive-technology outcomes.
- **Matches:** 1
- **Examples:** [a11y-public-sample](https://github.com/Unity-Technologies/a11y-public-sample)

### UIWidgets

- **Aliases:** uiwidgets
- **Definition:** Separate Flutter-derived UI framework historically published under the org and later archived/redirected.
- **Game UI use:** Historical or successor-lineage research only.
- **Not that:** Not UI Toolkit; not current general Game UI authority.
- **Matches:** 1
- **Examples:** [com.unity.uiwidgets](https://github.com/Unity-Technologies/com.unity.uiwidgets)

### NGUI

- **Aliases:** ngui
- **Definition:** Third-party GameObject UI stack owned outside Unity-Technologies.
- **Game UI use:** Migration and ownership comparison only, via separately pinned `tasharen/ngui`.
- **Not that:** Never counted inside the 804 inventory.
- **Matches:** 0 inside org inventory (by design)

### UnityCsReference

- **Aliases:** unitycsreference, cs reference
- **Definition:** Engine and editor C# reference source, including UIElements modules.
- **Game UI use:** Unity-engine C# study surface for module architecture, ownership, and version-pinned implementation paths. Valuable for readers who already know C#.
- **Not that:** Not a package mirror; not the complete engine (native/C++ remains outside); not a learn-C#-from-zero curriculum; do not treat mutable `master` as a version pin.
- **Matches:** 1
- **Examples:** [UnityCsReference](https://github.com/Unity-Technologies/UnityCsReference)

## Engine Subject Terms

### Entities / ECS / DOTS

- **Aliases:** entities, ecs, dots
- **Definition:** Data-oriented ECS runtime and samples.
- **Game UI use:** State ownership and performance context that can constrain UI update flow; DotsUI is observation only.
- **Not that:** Not the general UI system contract.
- **Matches:** 24
- **Examples:** [EntityComponentSystemSamples](https://github.com/Unity-Technologies/EntityComponentSystemSamples)

### Burst

- **Aliases:** burst
- **Definition:** HPC# compiler/runtime used with Jobs/Entities workloads.
- **Game UI use:** Runtime constraint context near ECS UI observations.
- **Not that:** Not a UI framework.
- **Matches:** 4

### Netcode

- **Aliases:** netcode
- **Definition:** Multiplayer networking packages and samples.
- **Game UI use:** Lobby, session, replication, and networked HUD observation.
- **Not that:** Not layout authority.
- **Matches:** 9
- **Examples:** [com.unity.netcode.gameobjects](https://github.com/Unity-Technologies/com.unity.netcode.gameobjects)

### Multiplayer

- **Aliases:** multiplayer
- **Definition:** Broader multiplayer samples, RFCs, and session services.
- **Game UI use:** Session and menu flow discovery.
- **Not that:** Org membership is not a design system.
- **Matches:** 23

### XR

- **Aliases:** xr, openxr
- **Definition:** Cross-reality devices, interaction, and samples.
- **Game UI use:** Spatial UI, ray/direct interaction, device constraints.
- **Not that:** XRI demo prefabs are not flat-menu style authority.
- **Matches:** 27

### AR Foundation

- **Aliases:** arfoundation, ar-foundation
- **Definition:** AR package samples and device integration.
- **Game UI use:** Mobile/spatial presentation constraints affecting HUD and world UI.
- **Not that:** Not a UI toolkit replacement.
- **Matches:** 5
- **Examples:** [arfoundation-samples](https://github.com/Unity-Technologies/arfoundation-samples)

### HDRP / URP / Graphics

- **Aliases:** hdrp, urp, graphics, srp
- **Definition:** Render pipeline and graphics package/sample umbrella.
- **Game UI use:** UI shaders, cameras, HDR, and display constraints.
- **Not that:** Pipeline samples are not UI system specifications; truncated graphics trees forbid strong absence claims.
- **Matches:** HDRP 4 · URP 3 · Graphics 43 (overlapping metadata)

### Shader Graph

- **Aliases:** shadergraph, shader-graph
- **Definition:** Node-based shader authoring packages and samples.
- **Game UI use:** Custom UI materials only when that is the claim.
- **Not that:** Editor demos are not runtime HUD specs.
- **Matches:** 5

### Cinemachine / Timeline

- **Aliases:** cinemachine, timeline
- **Definition:** Camera rigs and sequencing systems.
- **Game UI use:** Cinematic menus and timed presentation dependencies.
- **Not that:** Not layout ownership or a control library.
- **Matches:** Cinemachine 2 · Timeline 3

### ML-Agents / Sentis

- **Aliases:** ml-agents, sentis, barracuda
- **Definition:** Learning and inference toolkits.
- **Game UI use:** Debug visualization context only.
- **Not that:** High stars do not create UI authority.
- **Matches:** ML-Agents 9 · Sentis/Barracuda 5
- **Examples:** [ml-agents](https://github.com/Unity-Technologies/ml-agents)

### Robotics

- **Aliases:** robotics, ros, urdf
- **Definition:** ROS/robotics simulation hubs and importers.
- **Game UI use:** Operator UI observations only.
- **Not that:** Not game HUD defaults.
- **Matches:** 8

### 2D / Physics / Audio

- **Aliases:** 2d, sprite, tilemap, physics, navmesh, audio
- **Definition:** Domain packages and samples adjacent to presentation or diegetic coupling.
- **Game UI use:** 2D presentation constraints; rare physics/audio coupling.
- **Not that:** Not general UI system ownership.
- **Matches:** 2D 11 · Physics 7 · Audio 5

### Mono / IL2CPP / Package

- **Aliases:** mono, il2cpp, com.unity, package
- **Definition:** Runtime, AOT, and package-shaped repository surfaces.
- **Game UI use:** Platform packaging and package-version pins; UnityCsReference for managed engine study.
- **Not that:** Forked mono paths are not HUD specs; package presence is not support status.
- **Matches:** Mono 5 · Package 102 · IL2CPP 0 in metadata

### Cloud / UGS / Addressables / Asset Bundle

- **Aliases:** ugs, services, cloud, addressables, assetbundle
- **Definition:** Services and content-delivery surfaces that often host UI asset lifecycle.
- **Game UI use:** Login, economy, remote config, async load/unload of UI content.
- **Not that:** Service sample UI is product observation, not StyleGallery visual defaults.
- **Matches:** Cloud/UGS 24 · Addressables 3 · Asset Bundle 3

## Provenance And Lifecycle Terms

### Sample / Demo / Template / Starter

- **Definition:** Teaching and demonstration repositories.
- **Game UI use:** Observation unless lifecycle-refined as a current explicit example.
- **Not that:** Recent push does not rewrite the recorded Unity baseline.
- **Matches:** 99

### Editor / Profiler / CI

- **Definition:** Authoring tools, performance tools, and infrastructure.
- **Game UI use:** Separate editor UITK/IMGUI from runtime player UI; CI is out of normative Game UI scope.
- **Not that:** Editor-or-incidental UITK is not player HUD authority.
- **Matches:** Editor 54 · Profiler 6 · CI/Infra 11

### Fork / Archive

- **Definition:** Provenance and lifecycle flags (mechanical or semantic).
- **Game UI use:** Discovery filters only.
- **Not that:** `fork=false` does not prove Unity authored every file; unarchived does not prove current support.
- **Matches:** Fork 100 · Archive 32

### Safe Area / World Space

- **Definition:** Display cutouts and 3D-world UI presentation.
- **Game UI use:** Mobile edge insets; stack choice for spatial UI.
- **Not that:** Claims must stay version- and stack-specific.
- **Matches:** Safe Area 2 · World Space 1

## Opinionated Guidance

- Prefer **one term → one decision**, then open at most a handful of pinned repositories.
- When match count is `0`, do not invent inventory hits; jump to manuals or SHA-pinned path evidence in [ui-systems.md](ui-systems.md).
- When match count is high (`Sample`, `Package`, `Fork`), treat the term as a **filter**, not as authority.
- Keep UnityCsReference as the managed-engine C# study surface; keep uGUI as package source; keep Input System as UI-input bridge.
- Rebuild [`data/unity-org-term-index.json`](data/unity-org-term-index.json) when the 804-row inventory snapshot is refreshed; do not hand-edit match counts.

## Platform-Specific Guidance

- Match every implementation claim to a Unity editor line and package version, not only to a term name.
- Mobile terms (safe area, Android, iOS) require device-class verification beyond repository metadata.
- XR and AR terms require device and interaction-stack pins.
- Runtime and scripting terms (Mono, IL2CPP) are packaging constraints, not UI ownership.

## Unsupported Absolutes

- “The inventory mentions this word” does not mean the repository is a current UI authority.
- “Match count is zero” does not mean the concept is absent from Unity.
- “High stars” does not mean Game UI should copy the sample.
- “In Unity-Technologies” does not mean Unity authored every vendored or forked file.
- This lexicon does not replace manuals, package changelogs, or runtime verification.

## Verification Contract

1. `node scripts/validate-unity-org-wiki.mjs --json` — inventory and org-wiki cluster integrity.
2. `node scripts/validate-unity-org-terms.mjs --json` — term index shape, snapshot identity, and lexicon leaf presence.
3. `node scripts/validate-domains.mjs --json` and `node scripts/validate-links.mjs --json` after leaf registration changes.
4. Spot-check: pick three terms, open their JSON examples, confirm URLs resolve to `Unity-Technologies/*` except the external NGUI note.

## Source, License, And Attribution

- Snapshot: public GitHub metadata and exclusive cluster projection at `2026-07-14T12:59:16Z`.
- Inventory identity before tracked projection: SHA-256 `8291b471251053a8921651eb7c791d13a4794984b73670a51cdb1116deb49657`.
- Reuse form: locally authored term definitions and heuristic match index; each repository keeps its own license.
- No Unity logos, trade dress, or first-person organizational voice.

## Review Trigger

Refresh this page when the public inventory snapshot changes, term match rules are recomputed, a UI authority repository changes lifecycle, or path-level UI scans are promoted into tracked term evidence.

Implementation handoff: Unity public-repository term lexicon for Game UI discovery.

Consumer reference: `not_applicable`

Consumer reference reason: This page indexes repository vocabulary and discovery routes, not consumer-specific visual or component guidance.

## IA Navigation

Parent: [Unity Game UI](index.md).
Previous: [Unity Organization Compressed Wiki](org-wiki.md).  
Next: [Unity Game UI](index.md).
