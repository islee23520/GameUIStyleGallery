---
type: Layout Pattern
name: ram-grid
title: ram-grid
category: Grid / Repetition
description: Repeat items into as many useful columns as space allows.
primary_spatial_problem: Repeat items into as many useful columns as space allows.
secondary_spatial_problems: none
layout_axis: both
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://web.dev/articles/one-line-layouts
---

# ram-grid

## When To Use

Use this pattern when you need to repeat items into as many useful columns as space allows.

## HTML

```html
<section class="ram_grid" aria-label="Photo albums">
    <article>Spring launch album</article>
    <article>Customer meetup album</article>
    <article>Workshop album</article>
</section>
```

## CSS

```css
.ram_grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));
}
```

## Failure Mode

If the core layout declarations are removed, `ram_grid` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
