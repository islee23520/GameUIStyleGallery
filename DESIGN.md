---
type: Design System
title: GameUIStyleGallery Design System
description: Tokens, primitives, motion, and accessibility contract for the gameuigallery.linalab.io site.
---

# GameUIStyleGallery Design System

## 0. Research Log

- Embedded refs: shortlisted `playstation.md` (gaming channel layout, quiet display type), `raycast.md` (dark developer chrome), `mintlify.md` (documentation reading) -> picked `taste-skill.md` (Layer A) + `playstation.md` (Layer B) because the audience is game UI designers and engineers and the console-store voice carries the domain; `interaction-skill.md` stacks for the tween demos.
- Lazyweb: 4 queries (design system documentation gallery, game store library browse filter, developer docs sidebar code sample, animation playground inspector controls), 11 screens saved, viewed PlayStation Now, Rive, Origami, Segment -> taken: dark browse grid with rail navigation (PlayStation Now), stage-plus-right-inspector for motion tools (Rive, Origami), fixed left navigation with reading column for docs (Segment). Screens stay in `.omo/evidence/gameui-site/lazyweb/`, never shipped.
- StyleGallery patterns (local corpus): `fixed-sidenav-shell` for the site shell (side nav fixed, main column owns scroll), `main-with-rail` for element pages (stage dominant, inspector rail), `ram-grid` for card lists (as many columns as space allows).
- beui.dev sources read: `center-morph-modal` (backdrop fade 0.28 s, surface unfold 0.43 s, content scale 0.88 -> 1 with 0.16 s delay, faster exit 0.1 s, reduced motion = opacity only 0.1-0.14 s), `tabs`, `loader`, `morphing-modal`. Mechanisms are re-expressed through the project tween engine; no beui code is vendored.
- Imagen drafts: `gpt-image-2` via CLIProxy, prompts seeded with the PlayStation tokens (see `.omo/evidence/gameui-site/draft-a-element-page.png`) -> used as the composition contract for the element page if generation succeeded; otherwise recorded as skipped in the QA notes.

## 1. Atmosphere & Identity

A console studio after hours. The chrome is quiet, dark, and precise, so the grayscale wireframes and their moving tweens are the brightest, most alive thing on the screen. The signature is the "power-on" interaction borrowed from the console voice: interactive controls fill with cyan and lift slightly on hover, and every wireframe demo can be interrupted mid-flight to show that nothing ever snaps.

Design read: reference site for game UI designers and Unity engineers, with a quiet console-store language, leaning toward vanilla HTML/CSS/JS, a system type stack, and a single blue accent. Dials: DESIGN_VARIANCE 5, MOTION_INTENSITY 6 (motion is the content of the demos, chrome stays still), VISUAL_DENSITY 5.

## 2. Color

### Palette

| Role | Token | Dark (default) | Light | Usage |
| --- | --- | --- | --- | --- |
| Surface/canvas | --surface-canvas | #0b0c0e | #f5f7fa | Page background |
| Surface/panel | --surface-panel | #131519 | #ffffff | Nav, cards, inspector |
| Surface/raised | --surface-raised | #1b1e24 | #ffffff | Stage frame, modal, popover |
| Surface/sunken | --surface-sunken | #08090b | #eef1f5 | Code blocks, wireframe viewport |
| Text/primary | --text-primary | #f2f4f7 | #1f1f1f | Headlines, body |
| Text/secondary | --text-secondary | #a4abb6 | #555b64 | Captions, metadata |
| Text/tertiary | --text-tertiary | #6f7682 | #7d838c | Disabled, hints |
| Border/default | --border-default | #262a31 | #dde2e8 | Dividers, panel edges |
| Border/subtle | --border-subtle | #1c1f25 | #eceff3 | Soft separations |
| Accent/primary | --accent-primary | #0070cc | #0070cc | Primary action fill, active nav wash |
| Accent/interact | --accent-interact | #1eaedb | #1eaedb | Hover, focus, active only, never at rest |
| Accent/link | --accent-link | #53b1ff | #0068bd | Inline links |
| Status/warning | --status-warning | #e0a33a | #a86b00 | Wireframe warning state |
| Status/error | --status-error | #e5484d | #c81b3a | Wireframe critical/error state |
| Wire/ink | --wire-ink | #d7dbe2 | #2b2f36 | Wireframe strokes and labels |
| Wire/fill | --wire-fill | rgb(215 219 226 / 0.06) | rgb(43 47 54 / 0.05) | Wireframe region fill |
| Wire/fill-strong | --wire-fill-strong | rgb(215 219 226 / 0.16) | rgb(43 47 54 / 0.12) | Selected region, bar fill |
| Wire/focus | --wire-focus | #1eaedb | #0070cc | Gamepad-style focus frame inside the wireframe |

### Rules
- Blue marks the one primary action per view (Play in the inspector, the element CTA on index). Cyan exists only in motion states: hover, focus-visible, active.
- Wireframes stay grayscale; only state semantics (warning, error) and the focus frame carry color, because they encode game state.
- Selected nav item and selected filter pill use an ink wash (`--wire-fill-strong`) plus a check glyph or weight change, never a coloured side border.

## 3. Typography

System stack chosen deliberately: zero font requests (the site is read on console and TV browsers too), and SF Pro / Segoe UI Variable both ship a true weight 300 for the quiet display voice.

| Level | Size | Weight | Line height | Tracking | Usage |
| --- | --- | --- | --- | --- | --- |
| Display | clamp(2.25rem, 4vw, 3.25rem) | 300 | 1.15 | -0.01em | Page title |
| H1 | 2rem | 300 | 1.2 | 0 | Section title |
| H2 | 1.5rem | 400 | 1.25 | 0 | Subsection |
| H3 | 1.125rem | 600 | 1.3 | 0 | Card and panel titles |
| Body | 1rem | 400 | 1.6 | 0 | Default text |
| Body/sm | 0.875rem | 400 | 1.5 | 0 | Metadata |
| Label | 0.8125rem | 600 | 1.3 | 0.01em | Buttons, pills, inspector labels |
| Mono | 0.8125rem | 500 | 1.5 | 0 | Values, code, ease names |

- Sans: `ui-sans-serif, system-ui, -apple-system, "Segoe UI Variable Text", "Segoe UI", Roboto, sans-serif`.
- Mono: `ui-monospace, "SF Mono", "Cascadia Mono", Menlo, monospace`.
- Sentence case everywhere, no all-caps labels (console voice). Body never below 0.875rem.

## 4. Spacing & Layout

Base unit 4px: --space-1 4, --space-2 8, --space-3 12, --space-4 16, --space-5 20, --space-6 24, --space-8 32, --space-10 40, --space-12 48, --space-16 64.

- Shell: `fixed-sidenav-shell`. Side nav 16rem wide at >= 960px, the main column owns vertical scroll; below 960px the nav becomes a top bar with a disclosure menu and the document scrolls.
- Content width: reading column max 72ch; element page stage max 1120px.
- Element page: `main-with-rail`. Stage (wireframe) takes the flexible track, inspector rail 20rem; stacks below the stage under 1100px container width.
- Card lists: `ram-grid` with `repeat(auto-fill, minmax(min(17rem, 100%), 1fr))`.
- Wireframe viewport: fixed 16:9 `aspect-ratio`, internal coordinates in percentages so it scales; safe-area guide inset 4% (dashed).

## 5. Components

### Nav item
- Structure: `<a class="nav-item">` in `<nav>`; group headings per player-task class.
- States: default text-secondary; hover text-primary + ink wash; current page `aria-current="page"` + ink wash + weight 600; focus-visible 2px cyan ring.

### Button
- Variants: primary (blue fill, pill), secondary (panel fill, border-default, pill), ghost (text only).
- States: hover cyan fill + white text + scale 1.04 (the console lift, reduced from 1.2 so inspector rows do not overlap); active scale 0.98; focus-visible 2px cyan ring with 2px offset; disabled 45% opacity, no hover.
- Radius: --radius-full.

### Pill (filter / tag)
- Toggle buttons with `aria-pressed`. Pressed = ink wash + check glyph. Radius full. Tags (non-interactive) use sunken fill.

### Panel
- Surface-panel fill, 1px border-default, --radius-md. Used for inspector, cards, nav.

### Capture card
- Title (H3), subtitle, tags, external link "Open reference" (rel noopener). Text only; no media. Hover: border to accent-interact at 40% and lift translateY(-2px).

### Wireframe stage
- Device frame (surface-raised, radius-lg) containing the 16:9 viewport (surface-sunken). Regions are `<div class="wf-region" role="group" aria-label>` with dashed or solid wire-ink strokes and a small label. Focusable controls inside use `tabindex` roving focus; the focus frame is a 2px `--wire-focus` outline that moves with arrow keys. Escape triggers the element's cancel behavior.
- States via `data-state` on the viewport: default, selected, disabled, loading, empty, error, modal, warning, critical, depending on element.

### Tween inspector
- Rows: ease select, duration number input, current value readout (mono), easing curve canvas (plots the selected ease), buttons Play (primary), Interrupt, Complete, Kill, Reduced-motion toggle.
- Live region announces state changes ("Complete fired", "Killed at 0.42").

### State switcher
- Segmented pill group (`role="radiogroup"`), one per element's required states.

## 6. Motion & Interaction

The site's tween engine (`gallery-site/assets/tween.js`) and the Unity sample `game-ui/unity/samples/ugui/Runtime/UITween.cs` share one contract, so a demo on the site behaves like the Unity code.

| Token | Value | Usage |
| --- | --- | --- |
| --motion-micro | 120ms | Hover, press |
| --motion-standard | 240ms | Tab switch, panel |
| --motion-emphasis | 430ms | Modal surface unfold |
| Ease set | linear, inQuad, outQuad, inOutQuad, outCubic, inOutCubic, outQuart, outBack (overshoot 1.70158) | Identical names in JS and C# |

- Retarget starts from the current value with the original duration; Complete snaps to the end and fires once; Kill stops without callbacks. Reduced motion sets duration 0 (Unity: `UITween.ReducedMotion`).
- Modal demo mechanism (from beui `center-morph-modal`): backdrop opacity 0 -> 1 over 280ms outCubic; surface scale 0.94 -> 1 and opacity over 430ms outCubic; content opacity after 160ms delay; exit 100-140ms. Reduced motion: opacity only.
- Game tweens use duration + ease rather than springs on purpose: they document how Unity tweens behave. Interruptibility is still guaranteed through retarget.
- Only transform and opacity animate (bar fills use `transform: scaleX`). Chrome hover uses CSS transitions with --motion-micro.
- Reduced motion: chrome transitions shorten to opacity cross-fades; demos honor `prefers-reduced-motion` and a manual toggle.

## 7. Depth & Surface

Strategy: tonal-shift plus hairline borders. Canvas < panel < raised by tone; borders 1px border-default; one shadow for raised overlays: `0 12px 32px rgb(0 0 0 / 0.45)` (dark) / `0 12px 32px rgb(15 23 42 / 0.12)` (light).

| Token | Value | Usage |
| --- | --- | --- |
| --radius-sm | 6px | Inputs, tags inside panels |
| --radius-md | 12px | Panels, cards |
| --radius-lg | 20px | Device frame, modal |
| --radius-full | 999px | Buttons, pills |

Nested corners are concentric (viewport radius = frame radius minus frame padding).

## 8. Accessibility Constraints & Accepted Debt

- WCAG 2.2 AA: 4.5:1 body contrast, 3:1 large text and UI strokes, visible focus-visible ring on every control, full keyboard reachability, wireframe demos operable by keyboard (arrow keys, Enter, Escape), `prefers-reduced-motion` respected, `aria-live` announcements for demo state changes.
- No third-party screenshot, video, or crawled record is embedded or published.

| Item | Location | Why accepted | Owner / Exit |
| --- | --- | --- | --- |
| No icon library; text labels and a few CSS glyphs only | Site chrome | Adding an icon dependency needs owner approval; labels keep the UI clear | Site owner; add an icon library when approved |
| Docs rendered with a minimal Markdown renderer | /docs pages | No new dependency; covers headings, lists, tables, code, links used by game-ui docs | Site owner; swap for a full renderer if docs need more syntax |
