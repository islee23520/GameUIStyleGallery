---
type: Layout Pattern
name: cover
title: cover
category: Viewport / Shell
description: Keep a central region balanced between optional header and footer.
primary_spatial_problem: Keep a central region balanced between optional header and footer.
secondary_spatial_problems: none
layout_axis: block
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://every-layout.dev/layouts/
---

# cover

## When To Use

Use this pattern when you need to keep a central region balanced between optional header and footer.

## HTML

```html
<section class="cover" aria-labelledby="cover-title">
    <header><p>Step 2 of 4</p></header>
    <main><h1 id="cover-title">Choose a billing profile</h1></main>
    <footer><button>Continue</button></footer>
</section>
```

## CSS

```css
.cover {
    display: grid;
    gap: 1rem;
    grid-template-rows: auto 1fr auto;
    min-block-size: 100dvh;
    padding: 1rem;
}
```

## Failure Mode

If the core layout declarations are removed, `cover` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
