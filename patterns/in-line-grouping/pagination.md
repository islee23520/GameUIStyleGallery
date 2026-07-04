---
type: Layout Pattern
name: pagination
title: pagination
category: In-line grouping
description: Lay out page controls as a bounded wrapping row.
primary_spatial_problem: Lay out page controls as a bounded wrapping row.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: wrap
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://developer.mozilla.org/en-US/docs/Web/CSS/How_to/Layout_cookbook
---

# pagination

## When To Use

Use this pattern when you need to lay out page controls as a bounded wrapping row.

## HTML

```html
<nav class="pagination" aria-label="Search results pages">
    <a href="#">Previous</a>
    <a href="#">Page 4</a>
    <a href="#">Next</a>
</nav>
```

## CSS

```css
.pagination {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
}
```

## Failure Mode

If the core layout declarations are removed, `pagination` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
