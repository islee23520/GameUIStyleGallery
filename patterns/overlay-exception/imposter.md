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

## Core Properties

- `display`, `inset`, `place-items`, `position`, `z-index` define the spatial behavior for this pattern.

## Properties That Break The Layout If Removed

- Removing `display`, `inset`, `place-items`, `position`, `z-index` changes the pattern from its documented layout responsibility back toward ordinary flow or an unsafe fixed arrangement.

## Constraints And Change Points

- fixed responsiveness is part of the contract; change sizing values only when the new minimum, maximum, or wrap point is documented with the pattern.
- Keep the HTML class hooks and CSS selectors in one-to-one agreement.

## Scroll Ownership

No internal scroll container.

## Accessibility And Source Order Notes

Keep semantic elements, DOM order, reading order, and focus order independent from the visual placement created by the layout classes.

## Browser And Fallback Notes

The CSS uses modern grid, flex, intrinsic sizing, logical properties, or positioning. If a target browser cannot support a property, fall back to ordinary block flow before adding decorative or script-driven layout behavior.

## Composition Notes

Use `imposter` as the stable pattern root and compose additional layout behavior outside that root unless the child class is part of the documented relationship.

## Anti-patterns

- Do not add color, border, shadow, typography, or animation rules to reusable pattern CSS.
- Do not use this pattern to repair unclear HTML structure; make the DOM roles legible first.
