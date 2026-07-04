---
type: Layout Pattern
name: fixed-sidenav-shell
title: fixed-sidenav-shell
category: Viewport / Shell
description: Keep side navigation stable while main content scrolls.
primary_spatial_problem: Keep side navigation stable while main content scrolls.
secondary_spatial_problems: none
layout_axis: both
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: Pattern owns the named scroll container.
source_lineage: https://carbondesignsystem.com/elements/2x-grid/overview/
---

# fixed-sidenav-shell

## When To Use

Use this pattern when you need to keep side navigation stable while main content scrolls.

## HTML

```html
<section class="fixed_sidenav_shell" aria-label="Settings">
    <nav class="fixed_sidenav_shell_list"><a href="#">Profile</a><a href="#">Billing</a></nav>
    <main class="fixed_sidenav_shell_main">Editable settings form scrolls independently</main>
</section>
```

## CSS

```css
.fixed_sidenav_shell {
    display: grid;
    grid-template-columns: 16rem minmax(0, 1fr);
    max-block-size: 100dvh;
}

.fixed_sidenav_shell_list {
    min-block-size: 0;
}

.fixed_sidenav_shell_main {
    overflow: auto;
}
```

## Failure Mode

If the core layout declarations are removed, `fixed_sidenav_shell` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
