---
type: Layout Pattern
name: center
title: center
category: Centering
description: Center a block while respecting a maximum measure.
primary_spatial_problem: Center a block while respecting a maximum measure.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://every-layout.dev/layouts/
---

# center

## When To Use

Use this pattern when you need to center a block while respecting a maximum measure.

## HTML

```html
<article class="center" aria-labelledby="center-heading">
    <h2 id="center-heading">Editorial policy</h2>
    <p>Long-form guidance stays readable while the page around it remains fluid.</p>
</article>
```

## CSS

```css
.center {
    margin-inline: auto;
    max-inline-size: 64rem;
    padding-inline: 1rem;
}
```

## Failure Mode

If the core layout declarations are removed, `center` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
