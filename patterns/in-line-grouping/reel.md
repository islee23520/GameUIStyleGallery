---
type: Layout Pattern
name: reel
title: reel
category: In-line grouping
description: Let a row scroll horizontally instead of wrapping.
primary_spatial_problem: Let a row scroll horizontally instead of wrapping.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: scroll
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: Pattern owns the named scroll container.
source_lineage: https://every-layout.dev/layouts/
---

# reel

## When To Use

Use this pattern when you need to let a row scroll horizontally instead of wrapping.

## HTML

```html
<section class="reel" aria-label="Upcoming events">
    <article>Design critique</article>
    <article>Planning workshop</article>
    <article>Launch review</article>
</section>
```

## CSS

```css
.reel {
    display: grid;
    gap: 1rem;
    grid-auto-columns: minmax(14rem, 35%);
    grid-auto-flow: column;
    overflow-x: auto;
}
```

## Failure Mode

If the core layout declarations are removed, `reel` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
