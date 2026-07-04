---
type: Layout Pattern
name: line-up
title: line-up
category: Stacking
description: Keep card footer actions aligned at the bottom.
primary_spatial_problem: Keep card footer actions aligned at the bottom.
secondary_spatial_problems: none
layout_axis: block
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://web.dev/articles/one-line-layouts
---

# line-up

## When To Use

Use this pattern when you need to keep card footer actions aligned at the bottom.

## HTML

```html
<article class="line_up" aria-labelledby="line-up-title">
    <section class="line_up_body"><h2 id="line-up-title">Implementation proposal</h2><p>Variable-length summary copy sits above the aligned action row.</p></section>
    <footer class="line_up_footer"><button>Review proposal</button></footer>
</article>
```

## CSS

```css
.line_up {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.line_up_body {
    min-block-size: 0;
}

.line_up_footer {
    margin-block-start: auto;
}
```

## Failure Mode

If the core layout declarations are removed, `line_up` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
