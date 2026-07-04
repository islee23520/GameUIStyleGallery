---
type: Layout Pattern
name: switcher
title: switcher
category: Split / Sidebar
description: Switch equal regions from row to stack without a viewport breakpoint.
primary_spatial_problem: Switch equal regions from row to stack without a viewport breakpoint.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: wrap
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://every-layout.dev/layouts/
---

# switcher

## When To Use

Use this pattern when you need to switch equal regions from row to stack without a viewport breakpoint.

## HTML

```html
<section class="switcher" aria-label="Pricing tiers">
    <article class="switcher_item">Starter plan</article>
    <article class="switcher_item">Team plan</article>
    <article class="switcher_item">Enterprise plan</article>
</section>
```

## CSS

```css
.switcher {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.switcher_item {
    flex-basis: calc((40rem - 100%) * 999);
    flex-grow: 1;
}
```

## Failure Mode

If the core layout declarations are removed, `switcher` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
