---
type: Layout Pattern
name: supporting-pane
title: supporting-pane
category: Split / Sidebar
description: Keep supplemental information beside a primary task.
primary_spatial_problem: Keep supplemental information beside a primary task.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: reflow
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://m3.material.io/foundations/adaptive-design/canonical-layouts
---

# supporting-pane

## When To Use

Use this pattern when you need to keep supplemental information beside a primary task.

## HTML

```html
<section class="supporting_pane" aria-label="Invoice editor">
    <main class="supporting_pane_main">Invoice line-item editor</main>
    <aside class="supporting_pane_summary">Payment summary</aside>
</section>
```

## CSS

```css
.supporting_pane {
    display: grid;
    gap: 1rem;
    grid-template-columns: minmax(0, 1fr) minmax(18rem, 24rem);
}

.supporting_pane_main {
    min-inline-size: 0;
}

.supporting_pane_summary {
    min-inline-size: 0;
}
```

## Failure Mode

If the core layout declarations are removed, `supporting_pane` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
