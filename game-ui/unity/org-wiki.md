---
type: Domain Guide
title: Unity Organization Compressed Wiki
description: Independent cluster index over a tracked snapshot of 804 public Unity-Technologies repositories for bounded Game UI source discovery.
domain: game-ui
lifecycle: experimental
platform: Unity-Technologies public GitHub organization
platform_version: public repository snapshot captured 2026-07-14T12:59:16Z
reviewed_on: 2026-07-15
---

# Unity Organization Compressed Wiki

Primary role: bounded organization-wide source discovery for Unity Game UI research.

> **Independent research — not affiliated with or endorsed by Unity Technologies. Snapshot evidence, not a support-status catalog.**

> **Discovery is not authority.** A cluster or repository row is a route to inspect, not implementation guidance. Pin the relevant SHA and version, then return through [Unity UI Systems](ui-systems.md) and [Unity UI Architecture](architecture.md).

This locally authored index compresses **804** public repositories into one tracked data inventory and 20 exclusive primary clusters. It is not produced, sponsored, endorsed, or maintained by Unity Technologies. Organization placement does not establish authorship of forked, mirrored, vendored, or third-party content. Each repository retains its own license and terms.

The machine-readable source is [`data/unity-technologies-public-repositories.json`](data/unity-technologies-public-repositories.json). It records one row per captured public repository, including stable identity, repository URL, raw fork/archive/template state, default branch and observed HEAD when resolved, snapshot time, license metadata, UI relevance, and one exclusive `primary_cluster`.

The source snapshot was captured at `2026-07-14T12:59:16Z`. The pre-projection inventory SHA-256 was `8291b471251053a8921651eb7c791d13a4794984b73670a51cdb1116deb49657`.

## Repository Boundary

The inventory covers the public Unity-Technologies organization snapshot and no other owner. NGUI and other third-party sources remain outside its counts. Public organization metadata is discovery evidence; it is not an affiliation, authorship, quality, or support claim.

## Reusable Method

1. Start with [Unity UI Systems](ui-systems.md) for a current system-choice decision.
2. Use the [Unity Repository Map](repository-map.md) to find UI authority, examples, adjacent evidence, and historical material.
3. Use this page when a UI question depends on a broader engine subject such as rendering, input, ECS, networking, XR, platform integration, services, or tooling.
4. Open the tracked inventory for individual repository URLs and captured metadata.
5. Before turning a repository observation into guidance, resolve and pin the exact Unity/package version and source revision.

The evidence order is: versioned Unity manuals and package changelogs; SHA-pinned implementation source; current version-bounded examples; dated announcements; historical demos; then community anecdotes. Stars, recent pushes, and organization placement are discovery signals, not authority or support status.

## Exclusive Cluster Index

First match wins. Fork and archive gates precede subjects; UI authority precedes adjacent technical subjects; technical subjects precede generic samples; the residual is an explicit covered value.

| Primary cluster | Repositories | Game UI use boundary |
| --- | ---: | --- |
| `meta-forks-mirrors` | 356 | Discovery only. GitHub `fork: true` does not establish first-party authority. |
| `meta-archived-historical` | 32 | Archaeology and migration context, not current guidance. |
| `game-ui-primary` | 9 | Explicit UI sources/examples; refine lifecycle and version before use. |
| `graphics-rendering` | 38 | Rendering constraints, shaders, pipelines, VFX, materials, and display behavior. |
| `ecs-dots` | 22 | Data-oriented runtime architecture that can constrain UI state flow. |
| `networking` | 21 | Multiplayer state, transport, lobby, relay, matchmaking, and server flows. |
| `xr-ar` | 25 | Spatial interaction, device input, world-space presentation, and XR constraints. |
| `ml-ai` | 23 | ML, inference, perception, and synthetic-data context; no UI defaults. |
| `robotics` | 6 | Simulation and operator-interface observations only. |
| `2d` | 7 | Sprite, tilemap, 2D package, and pixel-oriented implementation context. |
| `animation` | 10 | Timeline, rigging, Cinemachine, and animation-system dependencies. |
| `audio` | 3 | Audio/DSP and spatial-audio state dependencies. |
| `physics` | 1 | Physics-system context only. |
| `editor-tooling` | 29 | Authoring, profiling, build, package, recorder, and asset-tooling surfaces. |
| `ci-infra` | 2 | Build and test infrastructure; not product UI evidence. |
| `language-runtime` | 3 | Runtime, compilation, scripting, and serialization dependencies. |
| `services-cloud` | 3 | Authentication, economy, analytics, leaderboard, and remote-service states. |
| `platform-mobile` | 9 | Native integration, safe areas, packaging, device constraints, and platform input. |
| `samples-templates` | 30 | Observation-only examples without a stronger subject assignment. |
| `other-mixed-or-insufficient-metadata` | 175 | Covered residual; no speculative subject claim. |
| **Total** | **804** | Exactly one primary cluster per tracked row. |

`localization-text` remains a reserved search facet with zero primary rows in this snapshot. A zero primary count does not prove absence; use UI relevance and repository-specific inspection.

## Bounded Cluster Deep Dives

Each route below exposes three to seven leads from its inventory cluster. The list is intentionally selective: it teaches how to enter the cluster, not how to reproduce all 804 rows in prose.

### game-ui-primary

**Game UI use boundary:** Start here for explicit UI system source, UI/input integration, or clearly scoped UI examples. Refine every lead through the repository-map disposition because this cluster mixes current sources, current samples, and historical demos.

| Lead repository | Bounded use |
| --- | --- |
| [uGUI](https://github.com/Unity-Technologies/uGUI) | Match the package revision before tracing Canvas, Graphic, EventSystem, controls, scrolling, or TMP. |
| [InputSystem](https://github.com/Unity-Technologies/InputSystem) | Inspect UI input-module and action-map integration; it does not own rendering or layout. |
| [BagelGame](https://github.com/Unity-Technologies/BagelGame) | Observe a Unity 6.3 UI Toolkit game sample without turning sample structure into authority. |
| [ui-toolkit-manual-code-examples](https://github.com/Unity-Technologies/ui-toolkit-manual-code-examples) | Find narrow documentation examples for UXML, USS, binding, and custom controls. |
| [a11y-public-sample](https://github.com/Unity-Technologies/a11y-public-sample) | Inspect a version-bounded uGUI accessibility sample, then test on live assistive technology. |
| [UIElementsExamples](https://github.com/Unity-Technologies/UIElementsExamples) | Use only for historical editor/UIElements technique lineage. |
| [UIToolkitUnityRoyaleRuntimeDemo](https://github.com/Unity-Technologies/UIToolkitUnityRoyaleRuntimeDemo) | Use only as a dated runtime UI Toolkit observation. |

Return to [Unity UI Systems](ui-systems.md) to classify the stack, then [Unity UI Architecture](architecture.md) to assign ownership.

### platform-mobile

**Game UI use boundary:** Use this cluster for native packaging, notifications, platform services, device logging, and mobile performance constraints that can change UI states or verification. It does not contain the tracked NotchSafeAreaSample, which is routed separately by UI relevance.

| Lead repository | Bounded use |
| --- | --- |
| [com.unity.mobile.notifications](https://github.com/Unity-Technologies/com.unity.mobile.notifications) | Trace notification-driven state entry and platform permission dependencies. |
| [com.unity.mobile.logcat](https://github.com/Unity-Technologies/com.unity.mobile.logcat) | Gather Android device logs for UI/input failures; editor tooling is not runtime UI. |
| [BackgroundDownload](https://github.com/Unity-Technologies/BackgroundDownload) | Inspect mobile background-transfer constraints that may drive progress/error UI. |
| [GooglePlayLicenseVerification](https://github.com/Unity-Technologies/GooglePlayLicenseVerification) | Treat license results as an external state dependency, not a screen design. |
| [jpt-mobile-perf-runner](https://github.com/Unity-Technologies/jpt-mobile-perf-runner) | Use for device performance-test context, not UI architecture. |

For safe-area discovery, open [NotchSafeAreaSample in the concentrated adjacent table](repository-map.md#ui-adjacent-references) and verify it on current target devices. Return to [Unity UI Architecture](architecture.md) for ownership and device-state handling.

### editor-tooling

**Game UI use boundary:** Use this cluster to understand authoring, profiling, build, audit, and capture workflows. An editor window, inspector, or UI Toolkit editor surface is not evidence for runtime product UI.

| Lead repository | Bounded use |
| --- | --- |
| [ProjectAuditor](https://github.com/Unity-Technologies/ProjectAuditor) | Find project-analysis workflows that may expose UI asset or performance debt. |
| [MemorySnapshotDataTools](https://github.com/Unity-Technologies/MemorySnapshotDataTools) | Investigate memory evidence behind interface regressions without borrowing its editor UI. |
| [BuildReportInspector](https://github.com/Unity-Technologies/BuildReportInspector) | Inspect build-report authoring surfaces and packaging evidence. |
| [AssetBundles-Browser](https://github.com/Unity-Technologies/AssetBundles-Browser) | Study asset-bundle authoring workflow only; do not infer runtime screen ownership. |
| [GenericFrameRecorder](https://github.com/Unity-Technologies/GenericFrameRecorder) | Use capture tooling as evidence support, not as product UI guidance. |

Return to [Unity UI Architecture](architecture.md); runtime owners must be demonstrated in the player build, not inferred from editor tooling.

### graphics-rendering

**Game UI use boundary:** Use this cluster only for display, render-pipeline, shader, vector, pixel-density, and composition constraints that affect interface output. It does not choose a UI stack or visual style.

| Lead repository | Bounded use |
| --- | --- |
| [Graphics](https://github.com/Unity-Technologies/Graphics) | Match the render-pipeline/version line before tracing display or composition constraints. |
| [vector-graphics-samples](https://github.com/Unity-Technologies/vector-graphics-samples) | Inspect vector asset/rendering behavior that can constrain UI assets. |
| [2d-pixel-perfect](https://github.com/Unity-Technologies/2d-pixel-perfect) | Evaluate pixel-density and camera constraints for pixel-oriented interfaces. |
| [2d-renderer-samples](https://github.com/Unity-Technologies/2d-renderer-samples) | Observe 2D renderer behavior without treating samples as UI authority. |
| [Industry-Product-Configurator](https://github.com/Unity-Technologies/Industry-Product-Configurator) | Use only as a product/rendering observation in its own template context. |

Return to [Unity UI Systems](ui-systems.md) for stack responsibilities and [Unity UI Architecture](architecture.md) for display/sorting ownership.

### xr-ar

**Game UI use boundary:** Use this cluster for world-space presentation, spatial interaction, device input, ray interaction, locomotion, and headset constraints. XR samples do not establish a universal screen hierarchy or comfort result.

| Lead repository | Bounded use |
| --- | --- |
| [XR-Interaction-Toolkit-Examples](https://github.com/Unity-Technologies/XR-Interaction-Toolkit-Examples) | Inspect version-bounded spatial interaction and world-space UI observations. |
| [arfoundation-samples](https://github.com/Unity-Technologies/arfoundation-samples) | Trace AR session/device constraints that can drive overlay states. |
| [VR-Spectator-Sample](https://github.com/Unity-Technologies/VR-Spectator-Sample) | Study spectator/display composition in its sample context. |
| [EditorXR](https://github.com/Unity-Technologies/EditorXR) | Historical/editor spatial interaction research; not runtime product UI authority. |
| [XRLineRenderer](https://github.com/Unity-Technologies/XRLineRenderer) | Inspect a narrow spatial pointer/line rendering dependency. |

Return to [Unity UI Architecture](architecture.md) to record world-space root, input owner, focus/selection transfer, camera, sorting, and teardown.

### Residual, Fork, And Archive Noise

Do not browse the 175-row residual, 356 forks, or 32 archive-gated rows as default guidance. Open a named row only when a concrete question or term points to it, preserve raw fork/archive provenance, assign a repository-map disposition, pin the relevant source, and return to the architecture/system route. No per-repository prose pages are generated from these groups.

## UI Authority Route

The current source triangle is deliberately split:

- [`uGUI`](https://github.com/Unity-Technologies/uGUI) owns the GameObject/Canvas UI package source and current TextMesh Pro source. Use the package version in the target project and a matching SHA.
- [`UnityCsReference`](https://github.com/Unity-Technologies/UnityCsReference) contains the broad UI Toolkit reference implementation within engine C# reference source; it is not a package mirror.
- [`InputSystem`](https://github.com/Unity-Technologies/InputSystem) owns UI-input integration such as action maps and `InputSystemUIInputModule`, not rendering or layout.

Open UnityCsReference as a Unity-engine C# study and reference textbook surface when tracing module architecture, ownership boundaries, and version-pinned implementation paths. It is valuable for readers who already know C# and want to study how Unity's managed engine layer is organized; it is not a learn-C#-from-zero or general-purpose C# curriculum. Read a branch or SHA matched to the target Unity version line, and treat the repository as reference source rather than a package mirror or the complete engine: native/C++ implementation remains outside this corpus.

Current scoped examples include [`BagelGame`](https://github.com/Unity-Technologies/BagelGame), [`ui-toolkit-manual-code-examples`](https://github.com/Unity-Technologies/ui-toolkit-manual-code-examples), and [`a11y-public-sample`](https://github.com/Unity-Technologies/a11y-public-sample). Preserve each example's recorded Unity/package baseline.

Historical UIElements/UI Toolkit conference and runtime demos remain historical even if unarchived or recently pushed. [`com.unity.uiwidgets`](https://github.com/Unity-Technologies/com.unity.uiwidgets) is a separate archived framework, not UI Toolkit.

NGUI is third-party [`tasharen/ngui`](https://github.com/tasharen/ngui). It is outside the Unity-Technologies 804-repository inventory and appears only as a separately pinned migration comparison in [Unity UI Systems](ui-systems.md).

## Opinionated Guidance

- Use `game-ui-primary` only as a candidate route; open the repository-map lifecycle disposition before citing it.
- Prefer a matching release or Unity-version SHA over a mutable default-branch HEAD for implementation claims.
- Keep engine-subject clusters as dependency context. They do not supply visual defaults or universal Game UI rules.
- Treat stars, recent pushes, and repository names as discovery signals only.

## Platform-Specific Guidance

- Match uGUI and UnityCsReference source to the target Unity editor/package line.
- Match Input System evidence to the project's installed package version and UI module configuration.
- Revalidate XR, mobile, safe-area, HDR, and native-integration examples on the target device and render pipeline.
- Preserve each sample's recorded Unity version even when its repository is unarchived or recently pushed.

## Residual And Provenance Policy

The 175-row residual means the bounded metadata classifier selected no earlier cluster. It does not mean irrelevant, empty, undocumented, or free of UI evidence. Curated overrides must be versioned and must recompute the full partition; do not edit cluster counts by hand.

Raw `fork`, `archived`, and `is_template` values remain in the inventory. GitHub's fork flag is not a complete authorship model: non-fork repositories can still describe themselves as mirrors, forks, or vendored sources. Treat provenance as unresolved until repository evidence establishes it.

## Completeness And Refresh Limits

- The snapshot excludes private, deleted, transferred, and non-default-branch-only material.
- An Aside Browser membership re-check at `2026-07-15T07:58:42Z` completed all 9 populated pages and confirmed `public_repos=804`, with page 10 empty: 0 repositories added, 0 removed, 0 fork-state flips, and 0 archive-state flips. It observed 15 star-count drifts and 10 `pushed_at` drifts, so the tracked inventory was not rewritten because membership was unchanged.
- Five stored tree scans were truncated and two zero-size repositories returned tree-fetch errors; absence claims do not rely on those trees.
- Some repository HEADs, versions, licenses, lifecycle statements, and replacement paths remain unresolved.
- X/Twitter evidence was unavailable during the research session. No post, handle, date, URL, or quotation is inferred from that absence.
- The taxonomy is metadata-first. The residual protects against false precision; it is not editorial completion for 175 individual repositories.

Refresh by rebuilding the complete public inventory, preserving stable identities and raw lifecycle fields, rerunning the exclusive classifier, validating all 804 assignments, reviewing changed authority records, and updating the snapshot identity. Never hand-edit one count without recomputing the whole partition.

## Unsupported Absolutes

- “In the Unity-Technologies organization” does not mean Unity authored every file.
- “Unarchived” or “recently pushed” does not mean current or supported.
- “No UI signal” does not prove a repository contains no interface code.
- The 175-row residual does not mean the repositories are irrelevant or unclassifiable with deeper evidence.
- This snapshot does not establish the contents of private, deleted, transferred, or non-default branches.

## Verification Contract

Run `node scripts/validate-unity-org-wiki.mjs --json` and `node scripts/test-validate-unity-org-wiki.mjs`. A refreshed publication must retain 804 unique identities for this snapshot, preserve the exclusive cluster sum, keep NGUI external, and update the page, data, snapshot identity, and tests together.

## Source, License, And Attribution

- Inventory basis: public GitHub repository metadata and captured default-branch inspection at `2026-07-14T12:59:16Z`.
- Membership re-check: Aside Browser membership re-check completed at `2026-07-15T07:58:42Z`; membership and fork/archive states were stable against the tracked inventory.
- Inventory identity before tracked projection: SHA-256 `8291b471251053a8921651eb7c791d13a4794984b73670a51cdb1116deb49657`.
- Repository licenses and reuse terms differ. Follow each repository's recorded and current license before copying code or assets.
- Reuse form: locally authored taxonomy, discovery index, and metadata projection; no Unity logos, trade dress, or first-person organizational voice.

## Review Trigger

Revisit this experimental page when the public snapshot is refreshed, a current UI authority source changes ownership or lifecycle, high-value unresolved HEAD/version fields are pinned, curated residual overrides are accepted, or verified social evidence materially changes the source-ranking discussion.

Implementation handoff: Unity public-repository inventory and compressed discovery index.

Consumer reference: `not_applicable`

Consumer reference reason: This implementation adds repository provenance and discovery evidence, not consumer-specific visual or component guidance.

## IA Navigation

Parent: [Unity Game UI](index.md).
Next: [Unity Game UI](index.md).
