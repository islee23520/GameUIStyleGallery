---
type: Layout Pattern
name: main-with-rail
title: main-with-rail
category: Split / Sidebar
description: Keep primary content dominant with a narrow secondary rail.
primary_spatial_problem: Keep primary content dominant with a narrow secondary rail.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: reflow
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://design-system.service.gov.uk/styles/layout/
---

# main-with-rail

## When To Use

Use this pattern when you need to keep primary content dominant with a narrow secondary rail.

## HTML

```html
<section class="main_with_rail" aria-label="Documentation page">
    <main class="main_with_rail_main">API reference article</main>
    <aside class="main_with_rail_side">On this page links</aside>
</section>
```

## CSS

```css
.main_with_rail {
    display: grid;
    gap: 1rem;
    grid-template-columns: minmax(0, 2fr) minmax(14rem, 1fr);
}

.main_with_rail_main {
    min-inline-size: 0;
}

.main_with_rail_side {
    min-inline-size: 0;
}
```

## Failure Mode

If the core layout declarations are removed, `main_with_rail` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
