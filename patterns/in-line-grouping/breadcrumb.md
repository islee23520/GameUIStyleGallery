---
type: Layout Pattern
name: breadcrumb
title: breadcrumb
category: In-line grouping
description: Lay out hierarchy links compactly with wrapping.
primary_spatial_problem: Lay out hierarchy links compactly with wrapping.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: wrap
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://developer.mozilla.org/en-US/docs/Web/CSS/How_to/Layout_cookbook
---

# breadcrumb

## When To Use

Use this pattern when you need to lay out hierarchy links compactly with wrapping.

## HTML

```html
<nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="#">Workspace</a>
    <a href="#">Projects</a>
    <span>Layout gallery</span>
</nav>
```

## CSS

```css
.breadcrumb {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}
```

## Failure Mode

If the core layout declarations are removed, `breadcrumb` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
