---
type: Layout Pattern
name: sticky-header
title: sticky-header
category: Viewport / Shell
description: Keep a header visible above a scrolling content region.
primary_spatial_problem: Keep a header visible above a scrolling content region.
secondary_spatial_problems: none
layout_axis: block
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position
---

# sticky-header

## When To Use

Use this pattern when you need to keep a header visible above a scrolling content region.

## HTML

```html
<header class="sticky_header">
    <nav aria-label="Repository"><a href="#">Code</a><a href="#">Issues</a><a href="#">Pull requests</a></nav>
</header>
```

## CSS

```css
.sticky_header {
    inset-block-start: 0;
    position: sticky;
    z-index: 1;
}
```

## Failure Mode

If the core layout declarations are removed, `sticky_header` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
