---
type: Layout Pattern
name: imposter
title: imposter
category: Overlay / Exception
description: Place an overlay region over a parent without changing document order.
primary_spatial_problem: Place an overlay region over a parent without changing document order.
secondary_spatial_problems: none
layout_axis: both
content_shape: mixed
responsiveness: fixed
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://every-layout.dev/layouts/
---

# imposter

## When To Use

Use this pattern when you need to place an overlay region over a parent without changing document order.

## HTML

```html
<section class="imposter" aria-label="Modal placement">
    <dialog open>Unsaved changes confirmation</dialog>
</section>
```

## CSS

```css
.imposter {
    display: grid;
    inset: 0;
    place-items: center;
    position: absolute;
    z-index: 1;
}
```

## Failure Mode

If the core layout declarations are removed, `imposter` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
