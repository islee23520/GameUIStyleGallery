---
type: Layout Pattern
name: twelve-span-grid
title: twelve-span-grid
category: Grid / Repetition
description: Provide a twelve-column placement scaffold.
primary_spatial_problem: Provide a twelve-column placement scaffold.
secondary_spatial_problems: none
layout_axis: both
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://web.dev/articles/one-line-layouts
---

# twelve-span-grid

## When To Use

Use this pattern when you need to provide a twelve-column placement scaffold.

## HTML

```html
<section class="twelve_span_grid" aria-label="Dashboard modules">
    <article class="twelve_span_grid_item">Revenue module</article>
    <article class="twelve_span_grid_item">Retention module</article>
    <article class="twelve_span_grid_item">Pipeline module</article>
</section>
```

## CSS

```css
.twelve_span_grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(12, minmax(0, 1fr));
}

.twelve_span_grid_item {
    grid-column: span 4;
}
```

## Failure Mode

If the core layout declarations are removed, `twelve_span_grid` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
