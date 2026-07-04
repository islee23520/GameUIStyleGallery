---
type: Layout Pattern
name: sticky-aside
title: sticky-aside
category: Split / Sidebar
description: Keep related aside content visible during long reads.
primary_spatial_problem: Keep related aside content visible during long reads.
secondary_spatial_problems: none
layout_axis: block
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position
---

# sticky-aside

## When To Use

Use this pattern when you need to keep related aside content visible during long reads.

## HTML

```html
<section class="sticky_aside" aria-label="Long article">
    <main class="sticky_aside_main">Article sections continue down the page.</main>
    <aside class="sticky_aside_side">Table of contents</aside>
</section>
```

## CSS

```css
.sticky_aside {
    align-items: start;
    display: grid;
    gap: 1rem;
    grid-template-columns: minmax(0, 1fr) 16rem;
}

.sticky_aside_main {
    min-inline-size: 0;
}

.sticky_aside_side {
    inset-block-start: 1rem;
    position: sticky;
}
```

## Failure Mode

If the core layout declarations are removed, `sticky_aside` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
