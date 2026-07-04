---
type: Layout Pattern
name: grid-wrapper
title: grid-wrapper
category: Grid / Repetition
description: Center grid tracks while allowing full-width breakout tracks.
primary_spatial_problem: Center grid tracks while allowing full-width breakout tracks.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://developer.mozilla.org/en-US/docs/Web/CSS/How_to/Layout_cookbook
---

# grid-wrapper

## When To Use

Use this pattern when you need to center grid tracks while allowing full-width breakout tracks.

## HTML

```html
<section class="grid_wrapper" aria-label="Marketing page">
    <main class="grid_wrapper_main">Centered campaign copy</main>
</section>
```

## CSS

```css
.grid_wrapper {
    display: grid;
    grid-template-columns: 1fr minmax(0, 64rem) 1fr;
}

.grid_wrapper_main {
    grid-column: 2;
}
```

## Failure Mode

If the core layout declarations are removed, `grid_wrapper` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
