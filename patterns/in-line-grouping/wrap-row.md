---
type: Layout Pattern
name: wrap-row
title: wrap-row
category: In-line grouping
description: Wrap controls into rows with stable gaps.
primary_spatial_problem: Wrap controls into rows with stable gaps.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: wrap
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://developer.mozilla.org/en-US/docs/Web/CSS/How_to/Layout_cookbook
---

# wrap-row

## When To Use

Use this pattern when you need to wrap controls into rows with stable gaps.

## HTML

```html
<form class="wrap_row" aria-label="Filter tickets">
    <label>Status <select></select></label>
    <label>Owner <select></select></label>
    <button>Apply filters</button>
</form>
```

## CSS

```css
.wrap_row {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}
```

## Failure Mode

If the core layout declarations are removed, `wrap_row` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
