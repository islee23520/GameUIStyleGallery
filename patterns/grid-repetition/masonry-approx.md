---
type: Layout Pattern
name: masonry-approx
title: masonry-approx
category: Grid / Repetition
description: Approximate staggered content with columns when exact row alignment is not needed.
primary_spatial_problem: Approximate staggered content with columns when exact row alignment is not needed.
secondary_spatial_problems: none
layout_axis: block
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://developer.mozilla.org/en-US/docs/Web/CSS/How_to/Layout_cookbook
---

# masonry-approx

## When To Use

Use this pattern when you need to approximate staggered content with columns when exact row alignment is not needed.

## HTML

```html
<section class="masonry_approx" aria-label="Research notes">
    <article>Interview excerpt with a longer observation.</article>
    <article>Short survey result.</article>
    <article>Workshop synthesis note.</article>
</section>
```

## CSS

```css
.masonry_approx {
    column-gap: 1rem;
    column-width: 14rem;
}
```

## Failure Mode

If the core layout declarations are removed, `masonry_approx` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
