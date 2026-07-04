---
type: Layout Pattern
name: overlay-stack
title: overlay-stack
category: Overlay / Exception
description: Stack several regions into the same grid cell.
primary_spatial_problem: Stack several regions into the same grid cell.
secondary_spatial_problems: none
layout_axis: both
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://web.dev/articles/one-line-layouts
---

# overlay-stack

## When To Use

Use this pattern when you need to stack several regions into the same grid cell.

## HTML

```html
<section class="overlay_stack" aria-label="Map with controls">
    <figure class="overlay_stack_item">Transit map</figure>
    <form class="overlay_stack_item">Route search controls</form>
</section>
```

## CSS

```css
.overlay_stack {
    display: grid;
}

.overlay_stack_item {
    grid-area: 1 / 1;
}
```

## Failure Mode

If the core layout declarations are removed, `overlay_stack` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
