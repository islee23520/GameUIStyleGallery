# Game UI

Game UI owns engine-neutral guidance for game-interface purpose, presentation, screen hierarchy, and evidence records, plus named engine implementation guides for UI and game-engine subsystems such as animation.

## Scope Boundary

In scope: player-task classification, screen and overlay hierarchy, reusable reference metadata, state coverage, cross-engine comparison vocabulary, and engine-specific implementation guidance, including animation and future scene, prefab, and content-system packs under named engines.

Out of scope: reusable Layout CSS, universal visual prescriptions, and treating one engine's scene graph or API as a cross-engine requirement.

## Evidence And Research Boundary

The player-task classes and classification axes are a local taxonomy proposed for StyleGallery review, not Interface In Game's universal ontology.

Interface In Game was reviewed on 2026-07-14 through its [home page](https://interfaceingame.com/), [games index](https://interfaceingame.com/games/), and representative records for [Team Fortress 2](https://interfaceingame.com/games/team-fortress-2/), [Genshin Impact (Mobile)](https://interfaceingame.com/games/genshin-impact-mobile/), and [Gris](https://interfaceingame.com/games/gris/). In this bounded sample, the site exposed site-local facets such as Genres, Themes, and Platforms, while screenshots used Elements. The sample informs the local separation of player task from other axes; it does not cover the archive or establish the site's full information model.

## Band 1 — Engine-Neutral Game UI

- [Game UI Classification](classification.md) separates player purpose from visual language, input, state, and motion.
- [Game UI Screen Hierarchy](screen-hierarchy.md) defines engine-neutral layers from application shell to atomic control.
- [Game UI Reference Record](reference-record.md) provides the minimum evidence schema for gallery entries.

## Band 2 — Unity Implementation

Enter through the [Unity Game UI hub](unity/index.md) for UI stack selection, architecture ownership, engine animation routes, CLI evidence, and implementation reading order. The first engine-system pack separates [Unity 3D animation](unity/animation/animation-3d.md) from [Unity 2D animation](unity/animation/animation-2d.md).

## Band 3 — Unity Organization Discovery

Enter through the [Unity Game UI hub](unity/index.md) for the repository map, compressed 804-repository snapshot wiki, term lexicon, authority boundary, and discovery reading order.

## Domain Contract

Game UI describes interface purpose, screen composition, and how named engines can realize that model. Platform Guides cover non-game platform conventions; Layout owns portable spatial patterns.

## IA Navigation

Parent: [StyleGallery](../index.md).
Next: [Game UI Classification](classification.md).
