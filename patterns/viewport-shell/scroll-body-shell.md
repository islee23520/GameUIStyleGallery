---
type: Layout Pattern
name: scroll-body-shell
title: scroll-body-shell
category: Viewport / Shell
description: Keep shell regions fixed while only the body scrolls.
primary_spatial_problem: Keep shell regions fixed while only the body scrolls.
secondary_spatial_problems: none
layout_axis: block
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: Pattern owns the named scroll container.
source_lineage: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow
---

# scroll-body-shell

## When To Use

Use this pattern when you need to keep shell regions fixed while only the body scrolls.

## HTML

```html
<section class="scroll_body_shell" aria-label="Inbox">
    <header>Inbox filters</header>
    <main class="scroll_body_shell_body">Message list owns vertical scrolling</main>
    <footer>Selected message actions</footer>
</section>
```

## CSS

```css
.scroll_body_shell {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    max-block-size: 100dvh;
}

.scroll_body_shell_body {
    min-block-size: 0;
    overflow: auto;
}
```

## Failure Mode

If the core layout declarations are removed, `scroll_body_shell` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
