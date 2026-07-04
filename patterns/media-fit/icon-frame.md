---
type: Layout Pattern
name: icon-frame
title: icon-frame
category: Media / Fit
description: Keep an icon aligned inside a fixed square slot.
primary_spatial_problem: Keep an icon aligned inside a fixed square slot.
secondary_spatial_problems: none
layout_axis: both
content_shape: mixed
responsiveness: fixed
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://every-layout.dev/layouts/
---

# icon-frame

## When To Use

Use this pattern when you need to keep an icon aligned inside a fixed square slot.

## HTML

```html
<span class="icon_frame" aria-label="Calendar">
    <svg aria-hidden="true" viewBox="0 0 24 24"></svg>
</span>
```

## CSS

```css
.icon_frame {
    block-size: 2.5rem;
    display: grid;
    inline-size: 2.5rem;
    place-items: center;
}
```

## Failure Mode

If the core layout declarations are removed, `icon_frame` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
