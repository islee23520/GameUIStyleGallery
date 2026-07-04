---
type: Layout Pattern
name: holy-grail
title: holy-grail
category: Viewport / Shell
description: Place header, footer, sidebars, and main content in a resilient shell.
primary_spatial_problem: Place header, footer, sidebars, and main content in a resilient shell.
secondary_spatial_problems: none
layout_axis: both
content_shape: mixed
responsiveness: breakpointed
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://web.dev/articles/one-line-layouts
---

# holy-grail

## When To Use

Use this pattern when you need to place header, footer, sidebars, and main content in a resilient shell.

## HTML

```html
<section class="holy_grail" aria-label="News page">
    <header class="holy_grail_header">Daily briefing</header>
    <aside class="holy_grail_left">Topic navigation</aside>
    <main class="holy_grail_main">Lead story and article stream</main>
    <aside class="holy_grail_right">Market snapshot</aside>
    <footer class="holy_grail_footer">Edition links</footer>
</section>
```

## CSS

```css
.holy_grail {
    display: grid;
    gap: 1rem;
    grid-template: "header header header" auto "left main right" 1fr "footer footer footer" auto / minmax(12rem, auto) 1fr minmax(12rem, auto);
    min-block-size: 100dvh;
}

.holy_grail_header {
    grid-area: header;
}

.holy_grail_left {
    grid-area: left;
}

.holy_grail_main {
    grid-area: main;
    min-inline-size: 0;
}

.holy_grail_right {
    grid-area: right;
}

.holy_grail_footer {
    grid-area: footer;
}
```

## Failure Mode

If the core layout declarations are removed, `holy_grail` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
