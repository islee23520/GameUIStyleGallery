---
type: Planning Guide
title: Layout Brief Template
description: Questions to answer before selecting a layout pattern stack.
---

# Layout Brief Template

Use this template before choosing patterns. The answer should describe spatial responsibility, not visual style.

## Screen

- What is the screen type?
- What is the primary user task?
- What is the primary content?
- What is the supporting content?

## Source Order

- Does DOM order match reading order?
- Does visual order match focus order?
- Which landmarks, headings, lists, links, buttons, or form controls are required before layout classes?

## Scroll Ownership

- What owns scrolling?
- Is there one scroll container or more than one?
- Which regions stay fixed, sticky, or static?
- Where is height determined?

## Constraints

- What are the minimum and maximum inline sizes?
- Which gaps are stable across the screen?
- Which regions may shrink, wrap, or overflow?
- Which values are product tokens, and which are browser mechanics?

## Responsiveness

- Is this a viewport-level problem or a component-local problem?
- Can the layout adapt through intrinsic sizing before adding breakpoints?
- Should container queries be used instead of viewport breakpoints?
- What changes at narrow, medium, and roomy container sizes?

## Content Stress

- What happens when content is empty?
- What happens with long labels?
- What happens with long paragraphs?
- What happens with an unbroken string?
- Does the layout survive `ltr` and `rtl` direction?

## Candidate Pattern Stack

Record the initial pattern stack and why each pattern is responsible for a specific spatial problem.

```txt
Screen type:
Primary task:
Primary content:
Supporting content:
Scroll owner:
Pattern boundary:
Pattern stack:
Layout owner:
Core layout declarations:
Demo or product styling excluded:
Constraints:
Change points:
Likely breaking content case:
Patterns rejected:
```

Short examples:

- New pattern: `Pattern boundary: repeated layout failure`, `Layout owner: tab_strip owns inline overflow`, `Demo or product styling excluded: active tab color`.
- Recipe composition: `Pattern boundary: recipe composition`, `Pattern stack: fixed-sidenav-shell, content-limiter, stack`, `Patterns rejected: new settings-page pattern`.
- Product styling: `Pattern boundary: product styling`, `Core layout declarations: card-grid placement only`, `Demo or product styling excluded: shadows, radius, color accents`.

Minimal code example:

```html
<section class="settings_shell" aria-label="Settings">
    <nav class="settings_shell_nav" aria-label="Settings sections"></nav>
    <main class="settings_shell_scroll_area"></main>
</section>
```

```css
.settings_shell {
    block-size: 100dvb;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
}

.settings_shell_scroll_area {
    min-block-size: 0;
    overflow: auto;
}
```

In this example, `settings_shell` owns viewport sizing and columns, `settings_shell_scroll_area` owns scrolling, and visual treatment such as active nav color, borders, shadows, and typography stays outside the reusable layout CSS.

Failure example:

```css
/* Avoid: overflow is named, but the grid child may refuse to shrink. */
.settings_shell_scroll_area {
    overflow: auto;
}
```

```css
/* Prefer: the scroll owner can shrink inside the shell track. */
.settings_shell_scroll_area {
    min-block-size: 0;
    overflow: auto;
}
```

Styling boundary example:

```css
/* Avoid in reusable pattern CSS: layout and product styling are mixed. */
.settings_shell_scroll_area {
    background: var(--panel-background);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    min-block-size: 0;
    overflow: auto;
}
```

```css
/* Prefer in reusable pattern CSS: only the scroll responsibility remains. */
.settings_shell_scroll_area {
    min-block-size: 0;
    overflow: auto;
}
```
