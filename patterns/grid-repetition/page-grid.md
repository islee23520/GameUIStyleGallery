---
type: Layout Pattern
name: page-grid
title: page-grid
category: Grid / Repetition
description: Align page content to margins, gutters, and a central track.
primary_spatial_problem: Align page content to margins, gutters, and a central track.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://carbondesignsystem.com/elements/2x-grid/overview/
---

# page-grid

## When To Use

Use this pattern when you need to align page content to margins, gutters, and a central track.

## HTML

```html
<section class="page_grid" aria-label="Article page">
    <main class="page_grid_content">Centered article track with fluid outer gutters</main>
</section>
```

## CSS

```css
.page_grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: minmax(1rem, 1fr) minmax(0, 72rem) minmax(1rem, 1fr);
}

.page_grid_content {
    grid-column: 2;
}
```

## Failure Mode

If the core layout declarations are removed, `page_grid` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
