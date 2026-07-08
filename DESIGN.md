---
type: Design System
title: GPTaku Profile Page Design System
description: Local visual contract for the gptaku_ai public profile homepage.
---

# GPTaku Profile Page Design System

This design system governs `profiles/gptaku-ai/`. It does not redefine the reusable StyleGallery layout pattern library. Reusable layout CSS still follows the repo rule that layout owns structure while brand, color, typography, surface, and motion stay local to the profile page.

The profile page keeps semantic HTML in `profiles/gptaku-ai/index.html` and local visual rules in `profiles/gptaku-ai/styles.css`.

## 1. Atmosphere & Identity

The page feels like a warm terminal room with a mascot at the center. The profile photo is the visual contract: code texture in the dark, an amber neon ring, a coral pixel character, and outlined GPTAKU lettering. The signature is a terminal-native black canvas with one warm glow, used to introduce `gptaku_ai` as a Korean AI educator, Claude Code operator, and public builder.

## 2. Color

### Palette

| Role | Token | Light | Dark | Usage |
|------|-------|-------|------|-------|
| Surface/base | `--surface-base` | `#17110D` | `#0D0B09` | Full page canvas |
| Surface/raised | `--surface-raised` | `#21160F` | `#17110D` | Local panels and content surfaces |
| Surface/code | `--surface-code` | `#2B1A10` | `#140F0B` | Terminal bands and code-texture areas |
| Text/primary | `--text-primary` | `#FFF7E8` | `#FFF7E8` | Main headings and important body |
| Text/secondary | `--text-secondary` | `#D8C7B5` | `#D8C7B5` | Body and supporting copy |
| Text/muted | `--text-muted` | `#9B8A78` | `#9B8A78` | Captions, metadata, low-emphasis labels |
| Border/subtle | `--border-subtle` | `#4A3526` | `#2E2118` | Structural dividers |
| Border/glow | `--border-glow` | `#8C5E32` | `#6A431F` | Amber rim borders |
| Accent/primary | `--accent-amber` | `#FFB35C` | `#FFB35C` | Links, focus, primary CTA, ring glow |
| Accent/secondary | `--accent-coral` | `#E97A55` | `#E97A55` | Mascot tint, small highlights |
| Accent/soft | `--accent-soft` | `#FFD28A` | `#FFD28A` | Small glow and highlight text |
| Text/on accent | `--text-on-amber` | `#1A1009` | `#1A1009` | Text on primary amber controls |

### Rules

- `--accent-amber` is the only dominant accent and comes from the profile photo ring.
- `--accent-coral` appears only where the mascot tone needs to echo the image.
- No blue, purple, or generic AI-gradient accent is allowed on this page.
- The full page stays in one dark theme. Sections may shift tone but must not invert to a light theme.

## 3. Typography

### Scale

| Level | Size | Weight | Line Height | Tracking | Usage |
|-------|------|--------|-------------|----------|-------|
| Display | `clamp(48px, 8vw, 92px)` | 800 | 0.96 | 0 | Main profile name |
| H1 | `clamp(36px, 5vw, 64px)` | 760 | 1.04 | 0 | Major page headings |
| H2 | `clamp(28px, 4vw, 44px)` | 720 | 1.12 | 0 | Section headings |
| H3 | `22px` | 680 | 1.2 | 0 | Card titles |
| Body/lg | `20px` | 420 | 1.65 | 0 | Lead paragraphs |
| Body | `16px` | 400 | 1.7 | 0 | Default text |
| Body/sm | `14px` | 420 | 1.55 | 0 | Secondary text |
| Caption | `12px` | 650 | 1.35 | `0.08em` | Short labels |
| Code | `13px` | 500 | 1.5 | 0 | Evidence and post metadata |

### Font Stack

- Primary: `Geist`, `Satoshi`, `Pretendard`, `Apple SD Gothic Neo`, `Malgun Gothic`, system sans-serif
- Mono: `JetBrains Mono`, `SFMono-Regular`, `Consolas`, monospace

### Rules

- Korean text must wrap naturally, with `word-break: keep-all` on headings, lead copy, and body copy.
- Body text never drops below 14px.
- Letter spacing remains 0 except for short caption labels.

## 4. Spacing & Layout

### Base Unit

All spacing derives from a 4px base.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | `4px` | Tight inline spacing |
| `--space-2` | `8px` | Small chips and nav gaps |
| `--space-3` | `12px` | Compact card interior |
| `--space-4` | `16px` | Standard local padding |
| `--space-5` | `20px` | Small section spacing |
| `--space-6` | `24px` | Default card padding |
| `--space-8` | `32px` | Section item groups |
| `--space-10` | `40px` | Major internal gaps |
| `--space-12` | `48px` | Section rhythm |
| `--space-16` | `64px` | Page-level rhythm |
| `--space-20` | `80px` | Hero and major bands |

### Grid

- Max content width: `1180px`
- Column system: CSS grid with intrinsic `minmax()` tracks, no viewport-only brittle widths.
- Mobile: single column below `760px`.
- StyleGallery layout ideas used by the page: `sticky-aside`, `content-limiter`, `switcher`, and `cluster`.
- Sticky navigation offsets hash targets with `scroll-padding-block-start` and `scroll-margin-block-start`.

### Rules

- Layout class names describe spatial responsibility.
- Decorative surface rules stay in page-specific classes, not in reusable StyleGallery pattern files.
- Focus order follows DOM order.

## 5. Components

### Neon Profile Masthead

- **Structure**: header, profile copy, CTA cluster, profile image figure, evidence rail.
- **Variants**: desktop split, mobile stacked.
- **Spacing**: `--space-8`, `--space-10`, `--space-16`.
- **States**: CTA hover, active, focus-visible.
- **Accessibility**: one `h1`, meaningful image alt, links have visible focus.
- **Motion**: only transform and opacity transitions; reduced motion disables entrance animation.

### Terminal Panel

- **Structure**: panel header, mono metadata row, content body.
- **Variants**: source note, post signal, project link.
- **Spacing**: `--space-5`, `--space-6`.
- **States**: hover border brightens for links only.
- **Accessibility**: panel links remain semantic anchors.
- **Motion**: border and transform on hover, no infinite motion.

### Signal Grid

- **Structure**: asymmetric CSS grid of content cards.
- **Variants**: wide primary card and compact supporting cards.
- **Spacing**: `--space-4`, `--space-6`.
- **States**: static for text cards, hover only when a card is a link.
- **Accessibility**: headings are ordered and scannable.
- **Motion**: none by default.

### Contact Strip

- **Structure**: short intro, mail link, Threads link.
- **Variants**: wide desktop row, mobile stack.
- **Spacing**: `--space-6`, `--space-8`.
- **States**: focus-visible and active on links.
- **Accessibility**: mail link exposes the public contact from the profile.
- **Motion**: button press only.

## 6. Motion & Interaction

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Micro | `140ms` | `ease-out` | Link and button feedback |
| Standard | `240ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Card hover lift |
| Emphasis | `560ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Initial masthead reveal |

### Rules

- Animate page entrance and positional movement only with `opacity` and `transform`; color, border, and background may use 140ms micro feedback on interactive controls.
- Respect `prefers-reduced-motion`.
- Motion must communicate affordance, hierarchy, or page entrance.
- No scroll hijack, cursor gimmick, or decorative looping animation.
- Hash navigation must keep target headings below the sticky nav.

## 7. Depth & Surface

### Strategy

Use a mixed but restrained strategy: tonal shift first, amber rim second, soft glow only around the profile-photo signature.

| Level | Value | Usage |
|-------|-------|-------|
| Canvas | `--surface-base` | Full page |
| Raised | `--surface-raised` with `--border-subtle` | Panels |
| Code | `--surface-code` plus repeating code texture | Hero and terminal notes |
| Glow | `0 0 42px rgba(255, 179, 92, 0.26)` | Profile image and primary CTA only |

### Rules

- Cards use 8px radius or less unless they are the circular profile-photo frame.
- No generic gradient orbs or bokeh blobs.
- The profile photo is the hero visual asset and must remain inspectable.
