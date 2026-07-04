---
type: Layout Pattern
name: super-center
title: super-center
category: Centering
description: Center one region along both axes.
primary_spatial_problem: Center one region along both axes.
secondary_spatial_problems: none
layout_axis: both
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://web.dev/articles/one-line-layouts
---

# super-center

## When To Use

Use this pattern when you need to center one region along both axes.

## HTML

```html
<section class="super_center" aria-labelledby="centered-dialog-title">
    <form aria-labelledby="centered-dialog-title">
        <h2 id="centered-dialog-title">Confirm archive</h2>
        <button>Archive project</button>
    </form>
</section>
```

## CSS

```css
.super_center {
    display: grid;
    min-block-size: 100dvh;
    place-items: center;
}
```

## Failure Mode

If the core layout declarations are removed, `super_center` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
