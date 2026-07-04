---
type: Layout Pattern
name: panel-layout
title: panel-layout
category: Viewport / Shell
description: Create predictable main and utility panels.
primary_spatial_problem: Create predictable main and utility panels.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: reflow
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://carbondesignsystem.com/elements/2x-grid/overview/
---

# panel-layout

## When To Use

Use this pattern when you need to create predictable main and utility panels.

## HTML

```html
<section class="panel_layout" aria-label="Console workspace">
    <main class="panel_layout_main">Query editor</main>
    <aside class="panel_layout_side">Execution history</aside>
</section>
```

## CSS

```css
.panel_layout {
    display: grid;
    gap: 1rem;
    grid-template-columns: minmax(0, 1fr) minmax(18rem, 28rem);
}

.panel_layout_main {
    min-inline-size: 0;
}

.panel_layout_side {
    min-inline-size: 0;
}
```

## Failure Mode

If the core layout declarations are removed, `panel_layout` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
