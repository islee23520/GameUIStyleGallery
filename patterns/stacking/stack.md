---
type: Layout Pattern
name: stack
title: stack
category: Stacking
description: Create consistent vertical rhythm between direct children.
primary_spatial_problem: Create consistent vertical rhythm between direct children.
secondary_spatial_problems: none
layout_axis: block
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://every-layout.dev/layouts/stack/
---

# stack

## When To Use

Use this pattern when you need to create consistent vertical rhythm between direct children.

## HTML

```html
<section class="stack" aria-labelledby="stack-heading">
    <h2 id="stack-heading">Release checklist</h2>
    <p>Review copy, verify forms, and publish the notes in order.</p>
    <button>Start review</button>
</section>
```

## CSS

```css
.stack {
    display: grid;
    gap: 1rem;
}
```

## Failure Mode

If the core layout declarations are removed, `stack` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
