# Game UI

Game UI owns engine-neutral guidance for game-interface purpose, presentation, screen hierarchy, and evidence records, plus named engine implementation guides.

## Scope Boundary

In scope: player-task classification, screen and overlay hierarchy, reusable reference metadata, state coverage, cross-engine comparison vocabulary, and engine-specific implementation guidance.

Out of scope: reusable Layout CSS, universal visual prescriptions, and treating one engine's scene graph or API as a cross-engine requirement.

## Evidence And Research Boundary

The player-task classes and classification axes are a local taxonomy proposed for StyleGallery review, not a universal ontology.

References are gathered by hand from sources whose terms allow it. This domain stores no third-party screenshot archives, crawled records, or media; it keeps locally authored analysis only.

## Start Here

| Task | Route |
| --- | --- |
| Choose by player task and ownership. | [Game UI Decision Tree](decision-tree.md) |
| Compose all ten player-task classes with failure cases. | [Game UI Screen Recipes](screen-recipes.md) |
| Record input, state, hierarchy, and teardown evidence. | [Game UI Verification Workflow](verification-workflow.md) |

These workflows and worked cases are usable experimental guidance. Expected-result tables are test designs; actual product, engine, and reader evidence must be recorded separately. Review on a failed task, a source change, or a changed ownership contract.

## Available Guides

- [Game UI Classification](classification.md) separates player purpose from visual language, input, state, and motion.
- [Game UI Screen Hierarchy](screen-hierarchy.md) defines engine-neutral layers from application shell to atomic control.
- [Game UI Reference Record](reference-record.md) provides the minimum evidence schema for gallery entries.
- [Game UI Element Patterns](elements.md) maps 21 common game UI elements to local player tasks and failure cases.
- [Unity UI Architecture](unity/architecture.md) maps the hierarchy roles to Unity Scenes, Canvas layers, prefabs, runtime instances, input, and motion ownership.
- [Unity uGUI Game UI Implementation](unity/ugui-implementation.md) gives Canvas, input, focus, and component recipes with compilable samples.
- [Unity UI Systems](unity/ui-systems.md) compares uGUI, UI Toolkit, and NGUI ownership and capability shapes at pinned sources.
- [Unity CLI Loop](unity/cli-loop.md) defines a source-pinned command loop for Unity UI inspection and stack-specific interaction evidence.
- [Unity Repository Map](unity/repository-map.md) maps the public Unity-Technologies repository snapshot by UI relevance, authority, and lifecycle.
- [Unity Organization Compressed Wiki](unity/org-wiki.md) routes all 804 captured public repositories through a tracked inventory and bounded exclusive clusters.

## Domain Contract

Game UI describes interface purpose, screen composition, and how named engines can realize that model. Platform Guides cover non-game platform conventions; Layout owns portable spatial patterns.

## IA Navigation

Parent: [StyleGallery](../index.md).
Next: [Game UI Decision Tree](decision-tree.md).
