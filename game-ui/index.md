# Game UI

Game UI owns engine-neutral guidance for describing game-interface purpose, presentation, screen hierarchy, and evidence records, plus engine-specific implementation guides in named subdirectories.

## Scope Boundary

In scope: player-task classification, screen and overlay hierarchy, reusable reference metadata, state coverage, cross-engine comparison vocabulary, and engine-specific implementation guidance.

Out of scope: reusable Layout CSS, universal visual prescriptions, and treating one engine's scene graph or API as a cross-engine requirement.

## Evidence And Research Boundary

The player-task classes and classification axes in this domain are a local proposed taxonomy for StyleGallery review work. They are not presented as Interface In Game's universal ontology.

Interface In Game was reviewed on 2026-07-14 through its [home page](https://interfaceingame.com/), [games index](https://interfaceingame.com/games/), and representative records for [Team Fortress 2](https://interfaceingame.com/games/team-fortress-2/), [Genshin Impact (Mobile)](https://interfaceingame.com/games/genshin-impact-mobile/), and [Gris](https://interfaceingame.com/games/gris/). In that bounded sample, the site exposed site-local game facets such as Genres, Themes, and Platforms, while individual screenshots used Elements. This representative sampling informs the local separation of player task from other axes; it does not claim archive completeness or establish the site's full information model.

## Available Guides

- [Game UI Classification](classification.md) separates player purpose from visual language, input, state, and motion.
- [Game UI Screen Hierarchy](screen-hierarchy.md) defines engine-neutral layers from application shell to atomic control.
- [Game UI Reference Record](reference-record.md) provides the minimum evidence schema for gallery entries.
- [Unity UI Architecture](unity/architecture.md) maps the hierarchy roles to Unity Scenes, Canvas layers, prefabs, runtime instances, input, and motion ownership.

## Domain Contract

Game UI describes what an interface does, how its screen responsibilities compose, and how a named game engine can realize that model. Platform Guides remain bounded comparisons for non-game platform conventions. Layout remains the owner of portable spatial patterns.

## IA Navigation

Parent: [StyleGallery](../index.md).
Next: [Game UI Classification](classification.md).
