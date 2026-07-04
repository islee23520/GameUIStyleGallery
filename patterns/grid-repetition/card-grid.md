---
type: Layout Pattern
name: card-grid
title: card-grid
category: Grid / Repetition
description: Align repeating cards in rows and columns.
primary_spatial_problem: Align repeating cards in rows and columns.
secondary_spatial_problems: none
layout_axis: both
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://developer.mozilla.org/en-US/docs/Web/CSS/How_to/Layout_cookbook
---

# card-grid

## When To Use

Use this pattern when you need to align repeating cards in rows and columns.

## HTML

```html
<section class="card_grid" aria-label="Project cards">
    <article>Design audit</article>
    <article>Analytics migration</article>
    <article>Onboarding rewrite</article>
</section>
```

## CSS

```css
.card_grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr));
}
```

## Failure Mode

If the core layout declarations are removed, `card_grid` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
