---
type: Project Brief
title: GameUIStyleGallery Concept
description: Product definition and stack for the game UI fork of StyleGallery and its public site.
---

# GameUIStyleGallery Concept

GameUIStyleGallery is the game UI fork of StyleGallery. It keeps the governed StyleGallery corpus and validators, and it owns the Game UI domain: player-task classification, the Interface In Game catalog (401 games, 16305 captures, metadata and source links only), element patterns, and Unity uGUI implementation guidance with compiled samples. Web and frontend guidance is served from the separate upstream clone `uiStyleGallery`; the two are not merged.

The public site `gameuigallery.linalab.io` renders the Game UI domain for people: element pages with wireframes and runnable tween demos that mirror the Unity samples, a filterable Interface In Game catalog browser that links to source screenshots without copying them, and the governed Markdown pages. It is built by `bun run site:build` into `dist/site` and deployed by `linalab-ci` on desktop-bo514et from this repository's `main` branch.

Stack: Markdown corpus with Node.js 22 validators, Bun for installs and scripts, a dependency-free static site generator and vanilla HTML, CSS, and JavaScript for the site, Unity 6 uGUI with TextMeshPro and the Input System for the C# samples, and Docker Compose with nginx and a Cloudflare tunnel for hosting.
