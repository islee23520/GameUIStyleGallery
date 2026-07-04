---
type: Layout Pattern
name: content-limiter
title: content-limiter
category: Containment
description: Keep prose width readable inside fluid containers.
primary_spatial_problem: Keep prose width readable inside fluid containers.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: fluid
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://design-system.service.gov.uk/styles/layout/
---

# content-limiter

## When To Use

Use this pattern when you need to keep prose width readable inside fluid containers.

## HTML

```html
<article class="content_limiter" aria-labelledby="limiter-heading">
    <h2 id="limiter-heading">Incident summary</h2>
    <p>The report keeps a comfortable measure even inside a wide dashboard shell.</p>
</article>
```

## CSS

```css
.content_limiter {
    margin-inline: auto;
    max-inline-size: 70ch;
    padding-inline: 1rem;
}
```

## Failure Mode

If the core layout declarations are removed, `content_limiter` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
