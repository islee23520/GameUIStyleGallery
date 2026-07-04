---
type: Layout Pattern
name: list-detail
title: list-detail
category: Split / Sidebar
description: Place an explorable list beside its detail region.
primary_spatial_problem: Place an explorable list beside its detail region.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: reflow
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://m3.material.io/foundations/adaptive-design/canonical-layouts
---

# list-detail

## When To Use

Use this pattern when you need to place an explorable list beside its detail region.

## HTML

```html
<section class="list_detail" aria-label="Customer records">
    <nav class="list_detail_list"><a href="#">Acme Co.</a><a href="#">Northwind</a></nav>
    <section class="list_detail_detail">Selected customer timeline</section>
</section>
```

## CSS

```css
.list_detail {
    display: grid;
    gap: 1rem;
    grid-template-columns: minmax(16rem, 24rem) minmax(0, 1fr);
}

.list_detail_list {
    min-inline-size: 0;
}

.list_detail_detail {
    min-inline-size: 0;
}
```

## Failure Mode

If the core layout declarations are removed, `list_detail` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
