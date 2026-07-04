---
type: Layout Pattern
name: sidebar
title: sidebar
category: Split / Sidebar
description: Let a narrow sidebar and wider content wrap when space is tight.
primary_spatial_problem: Let a narrow sidebar and wider content wrap when space is tight.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: wrap
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://every-layout.dev/layouts/sidebar/
---

# sidebar

## When To Use

Use this pattern when you need to let a narrow sidebar and wider content wrap when space is tight.

## HTML

```html
<section class="sidebar" aria-labelledby="sidebar-title">
    <article class="sidebar_primary">
        <h2 id="sidebar-title">Quarterly planning notes</h2>
        <p>The main article keeps priority when the available inline space changes.</p>
    </article>
    <aside class="sidebar_secondary">Meeting agenda and owners</aside>
</section>
```

## CSS

```css
.sidebar {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.sidebar_primary {
    flex-basis: 0;
    flex-grow: 999;
    min-inline-size: 16rem;
}

.sidebar_secondary {
    flex-basis: 18rem;
    flex-grow: 1;
}
```

## Failure Mode

If the core layout declarations are removed, `sidebar` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
