---
type: Layout Pattern
name: tab-strip
title: tab-strip
category: In-line grouping
description: Keep peer tabs in one stable row that can wrap.
primary_spatial_problem: Keep peer tabs in one stable row that can wrap.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: wrap
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://design-system.service.gov.uk/styles/layout/
---

# tab-strip

## When To Use

Use this pattern when you need to keep peer tabs in one stable row that can wrap.

## HTML

```html
<nav class="tab_strip" aria-label="Report views">
    <a href="#">Summary</a>
    <a href="#">Cohorts</a>
    <a href="#">Exports</a>
</nav>
```

## CSS

```css
.tab_strip {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}
```

## Failure Mode

If the core layout declarations are removed, `tab_strip` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
