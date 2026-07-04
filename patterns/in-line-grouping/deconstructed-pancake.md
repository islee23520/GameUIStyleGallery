---
type: Layout Pattern
name: deconstructed-pancake
title: deconstructed-pancake
category: In-line grouping
description: Let equal cards stretch in a row and stack naturally when narrow.
primary_spatial_problem: Let equal cards stretch in a row and stack naturally when narrow.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: wrap
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://web.dev/articles/one-line-layouts
---

# deconstructed-pancake

## When To Use

Use this pattern when you need to let equal cards stretch in a row and stack naturally when narrow.

## HTML

```html
<section class="deconstructed_pancake" aria-label="Plan comparison">
    <article class="deconstructed_pancake_item">Solo plan</article>
    <article class="deconstructed_pancake_item">Studio plan</article>
    <article class="deconstructed_pancake_item">Agency plan</article>
</section>
```

## CSS

```css
.deconstructed_pancake {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.deconstructed_pancake_item {
    flex: 1 1 16rem;
}
```

## Failure Mode

If the core layout declarations are removed, `deconstructed_pancake` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
