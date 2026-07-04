---
type: Layout Pattern
name: step-nav
title: step-nav
category: Stacking
description: Present sequential steps with consistent vertical rhythm.
primary_spatial_problem: Present sequential steps with consistent vertical rhythm.
secondary_spatial_problems: none
layout_axis: block
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://design-system.service.gov.uk/styles/layout/
---

# step-nav

## When To Use

Use this pattern when you need to present sequential steps with consistent vertical rhythm.

## HTML

```html
<nav class="step_nav" aria-label="Checkout steps">
    <a href="#">Shipping address</a>
    <a href="#">Payment method</a>
    <a href="#">Order review</a>
</nav>
```

## CSS

```css
.step_nav {
    display: grid;
    gap: 0.75rem;
    margin-block: 1rem;
}
```

## Failure Mode

If the core layout declarations are removed, `step_nav` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
