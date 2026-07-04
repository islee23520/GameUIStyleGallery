---
type: Layout Pattern
name: box
title: box
category: Containment
description: Wrap content with predictable internal spacing.
primary_spatial_problem: Wrap content with predictable internal spacing.
secondary_spatial_problems: none
layout_axis: block
content_shape: mixed
responsiveness: fixed
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://every-layout.dev/layouts/
---

# box

## When To Use

Use this pattern when you need to wrap content with predictable internal spacing.

## HTML

```html
<aside class="box" aria-labelledby="box-heading">
    <h2 id="box-heading">Support window</h2>
    <p>Responses resume Monday at 09:00.</p>
</aside>
```

## CSS

```css
.box {
    box-sizing: border-box;
    display: block;
    padding: 1rem;
}
```

## Failure Mode

If the core layout declarations are removed, `box` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
