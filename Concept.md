---
type: Project Brief
title: GameUIStyleGallery Concept
description: Product definition and stack for the game UI fork of StyleGallery and its public site.
---

# GameUIStyleGallery Concept

GameUIStyleGallery is the game UI fork of StyleGallery. It keeps the governed StyleGallery corpus and validators, and it owns the Game UI domain: player-task classification, locally authored element patterns, and Unity uGUI implementation guidance with compiled samples. Web and frontend guidance is served from the separate upstream clone `uiStyleGallery`; the two are not merged.

The public site `gameuigallery.linalab.io` renders the Game UI domain for people: element pages with wireframes and runnable tween demos that mirror the Unity samples, and the governed Markdown pages. It publishes no third-party screenshots or crawled records; references are gathered by hand from sources whose terms allow it. It is built by `bun run site:build` into `dist/site` and deployed by `linalab-ci` on desktop-bo514et from this repository's `main` branch.

Stack: Markdown corpus with Node.js 22 validators, Bun for installs and scripts, a dependency-free static site generator and vanilla HTML, CSS, and JavaScript for the site, Unity 6 uGUI with TextMeshPro and the Input System for the C# samples, and Docker Compose with nginx and a Cloudflare tunnel for hosting.
