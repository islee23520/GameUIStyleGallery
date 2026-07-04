---
type: Layout Pattern
name: split-nav
title: split-nav
category: In-line grouping
description: Separate primary and secondary nav actions in one row.
primary_spatial_problem: Separate primary and secondary nav actions in one row.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: wrap
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://developer.mozilla.org/en-US/docs/Web/CSS/How_to/Layout_cookbook
---

# split-nav

## When To Use

Use this pattern when you need to separate primary and secondary nav actions in one row.

## HTML

```html
<nav class="split_nav" aria-label="Documentation">
    <section class="split_nav_primary"><a href="#">Guides</a><a href="#">API</a></section>
    <section class="split_nav_secondary"><a href="#">Sign in</a></section>
</nav>
```

## CSS

```css
.split_nav {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.split_nav_primary {
    display: flex;
    gap: 0.75rem;
}

.split_nav_secondary {
    margin-inline-start: auto;
}
```

## Failure Mode

If the core layout declarations are removed, `split_nav` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
