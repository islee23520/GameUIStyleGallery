---
type: Layout Pattern
name: sticky-footer
title: sticky-footer
category: Viewport / Shell
description: Keep footer at the bottom when content is short.
primary_spatial_problem: Keep footer at the bottom when content is short.
secondary_spatial_problems: none
layout_axis: block
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://developer.mozilla.org/en-US/docs/Web/CSS/How_to/Layout_cookbook
---

# sticky-footer

## When To Use

Use this pattern when you need to keep footer at the bottom when content is short.

## HTML

```html
<section class="sticky_footer" aria-label="Account setup">
    <header>Account setup</header>
    <main class="sticky_footer_main">Profile fields and preferences</main>
    <footer><button>Save profile</button></footer>
</section>
```

## CSS

```css
.sticky_footer {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-block-size: 100dvh;
}

.sticky_footer_main {
    min-block-size: 0;
}
```

## Failure Mode

If the core layout declarations are removed, `sticky_footer` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
