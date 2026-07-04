---
type: Layout Pattern
name: fluid-styles
title: fluid-styles
category: Containment
description: Let a region fill available width without exceeding a readable max.
primary_spatial_problem: Let a region fill available width without exceeding a readable max.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://carbondesignsystem.com/elements/2x-grid/overview/
---

# fluid-styles

## When To Use

Use this pattern when you need to let a region fill available width without exceeding a readable max.

## HTML

```html
<section class="fluid_styles" aria-labelledby="fluid-title">
    <h2 id="fluid-title">Operations overview</h2>
    <p>The region fills the parent without exceeding the shared page measure.</p>
</section>
```

## CSS

```css
.fluid_styles {
    inline-size: min(100%, 72rem);
    margin-inline: auto;
}
```

## Failure Mode

If the core layout declarations are removed, `fluid_styles` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
