---
type: Layout Pattern
name: dense-grid
title: dense-grid
category: Grid / Repetition
description: Fill a compact grid with repeated small items.
primary_spatial_problem: Fill a compact grid with repeated small items.
secondary_spatial_problems: none
layout_axis: both
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids
---

# dense-grid

## When To Use

Use this pattern when you need to fill a compact grid with repeated small items.

## HTML

```html
<section class="dense_grid" aria-label="Keyboard shortcuts">
    <kbd>Cmd K</kbd>
    <kbd>Cmd Shift P</kbd>
    <kbd>Esc</kbd>
</section>
```

## CSS

```css
.dense_grid {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
}
```

## Failure Mode

If the core layout declarations are removed, `dense_grid` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
