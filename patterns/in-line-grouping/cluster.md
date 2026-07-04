---
type: Layout Pattern
name: cluster
title: cluster
category: In-line grouping
description: Keep related items together while allowing wrapping.
primary_spatial_problem: Keep related items together while allowing wrapping.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: wrap
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://every-layout.dev/layouts/
---

# cluster

## When To Use

Use this pattern when you need to keep related items together while allowing wrapping.

## HTML

```html
<nav class="cluster" aria-label="Project actions">
    <a href="#">Backlog</a>
    <a href="#">Milestones</a>
    <a href="#">Roadmap</a>
</nav>
```

## CSS

```css
.cluster {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: flex-start;
}
```

## Failure Mode

If the core layout declarations are removed, `cluster` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
