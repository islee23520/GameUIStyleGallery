---
type: Layout Pattern
name: frame
title: frame
category: Media / Fit
description: Preserve media aspect ratio in a responsive slot.
primary_spatial_problem: Preserve media aspect ratio in a responsive slot.
secondary_spatial_problems: none
layout_axis: both
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://every-layout.dev/layouts/
---

# frame

## When To Use

Use this pattern when you need to preserve media aspect ratio in a responsive slot.

## HTML

```html
<figure class="frame">
    <img alt="Product walkthrough still">
</figure>
```

## CSS

```css
.frame {
    aspect-ratio: 16 / 9;
    display: grid;
    inline-size: 100%;
    overflow: clip;
}
```

## Failure Mode

If the core layout declarations are removed, `frame` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
