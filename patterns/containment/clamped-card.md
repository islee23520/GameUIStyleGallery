---
type: Layout Pattern
name: clamped-card
title: clamped-card
category: Containment
description: Constrain a card to a readable fluid width.
primary_spatial_problem: Constrain a card to a readable fluid width.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://web.dev/articles/one-line-layouts
---

# clamped-card

## When To Use

Use this pattern when you need to constrain a card to a readable fluid width.

## HTML

```html
<article class="clamped_card" aria-labelledby="clamped-title">
    <h2 id="clamped-title">Invite teammate</h2>
    <p>The card grows with the viewport but stops at the intended reading width.</p>
</article>
```

## CSS

```css
.clamped_card {
    inline-size: clamp(16rem, 50vw, 28rem);
    margin-inline: auto;
}
```

## Failure Mode

If the core layout declarations are removed, `clamped_card` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
