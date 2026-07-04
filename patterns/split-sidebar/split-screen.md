---
type: Layout Pattern
name: split-screen
title: split-screen
category: Split / Sidebar
description: Split a viewport or region into two balanced panes.
primary_spatial_problem: Split a viewport or region into two balanced panes.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: reflow
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://m3.material.io/foundations/adaptive-design/canonical-layouts
---

# split-screen

## When To Use

Use this pattern when you need to split a viewport or region into two balanced panes.

## HTML

```html
<section class="split_screen" aria-label="Compare documents">
    <section class="split_screen_pane">Draft contract</section>
    <section class="split_screen_pane">Reviewed contract</section>
</section>
```

## CSS

```css
.split_screen {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    min-block-size: 100dvh;
}

.split_screen_pane {
    min-inline-size: 0;
}
```

## Failure Mode

If the core layout declarations are removed, `split_screen` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
