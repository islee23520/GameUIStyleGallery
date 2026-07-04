---
type: Layout Pattern
name: badge-list
title: badge-list
category: In-line grouping
description: Align item labels with trailing counts.
primary_spatial_problem: Align item labels with trailing counts.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://developer.mozilla.org/en-US/docs/Web/CSS/How_to/Layout_cookbook
---

# badge-list

## When To Use

Use this pattern when you need to align item labels with trailing counts.

## HTML

```html
<section class="badge_list" aria-label="Repository counts">
    <div class="badge_list_item"><span>Open issues</span><span>12</span></div>
    <div class="badge_list_item"><span>Pull requests</span><span>4</span></div>
    <div class="badge_list_item"><span>Reviews waiting</span><span>7</span></div>
</section>
```

## CSS

```css
.badge_list {
    display: grid;
    gap: 0.5rem;
}

.badge_list_item {
    align-items: center;
    display: flex;
    gap: 0.75rem;
    justify-content: space-between;
}
```

## Failure Mode

If the core layout declarations are removed, `badge_list` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
