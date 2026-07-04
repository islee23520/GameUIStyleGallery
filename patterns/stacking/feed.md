---
type: Layout Pattern
name: feed
title: feed
category: Stacking
description: Stack repeated content items with stable rhythm.
primary_spatial_problem: Stack repeated content items with stable rhythm.
secondary_spatial_problems: none
layout_axis: block
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://m3.material.io/foundations/adaptive-design/canonical-layouts
---

# feed

## When To Use

Use this pattern when you need to stack repeated content items with stable rhythm.

## HTML

```html
<section class="feed" aria-label="Activity feed">
    <article>Build completed</article>
    <article>Review requested</article>
    <article>Deployment approved</article>
</section>
```

## CSS

```css
.feed {
    display: grid;
    gap: 1rem;
    grid-auto-rows: minmax(min-content, auto);
}
```

## Failure Mode

If the core layout declarations are removed, `feed` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
