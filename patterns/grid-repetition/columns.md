---
type: Layout Pattern
name: columns
title: columns
category: Grid / Repetition
description: Flow long content into balanced text columns.
primary_spatial_problem: Flow long content into balanced text columns.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://developer.mozilla.org/en-US/docs/Web/CSS/How_to/Layout_cookbook
---

# columns

## When To Use

Use this pattern when you need to flow long content into balanced text columns.

## HTML

```html
<article class="columns" aria-labelledby="columns-heading">
    <h2 id="columns-heading">Release notes</h2>
    <p>Several short updates can flow into balanced columns when there is room.</p>
    <p>When the container narrows, the same content returns to a single column.</p>
</article>
```

## CSS

```css
.columns {
    column-gap: 2rem;
    column-width: 18rem;
    columns: 18rem;
}
```

## Failure Mode

If the core layout declarations are removed, `columns` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
