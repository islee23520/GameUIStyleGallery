---
type: Layout Pattern
name: media-object
title: media-object
category: Split / Sidebar
description: Align media and descriptive content as a stable pair.
primary_spatial_problem: Align media and descriptive content as a stable pair.
secondary_spatial_problems: none
layout_axis: inline
content_shape: mixed
responsiveness: reflow
constraints: Uses only local class hooks and explicit layout constraints.
scroll_ownership: No internal scroll container.
source_lineage: https://developer.mozilla.org/en-US/docs/Web/CSS/How_to/Layout_cookbook
---

# media-object

## When To Use

Use this pattern when you need to align media and descriptive content as a stable pair.

## HTML

```html
<article class="media_object">
    <figure class="media_object_media"><img alt="Speaker portrait"></figure>
    <div class="media_object_content">
        <h2>Design systems briefing</h2>
        <p>Speaker details align beside the portrait without squeezing the text.</p>
    </div>
</article>
```

## CSS

```css
.media_object {
    align-items: start;
    display: grid;
    gap: 1rem;
    grid-template-columns: auto 1fr;
}

.media_object_media {
    inline-size: 6rem;
}

.media_object_content {
    min-inline-size: 0;
}
```

## Failure Mode

If the core layout declarations are removed, `media_object` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.

## Accessibility Notes

Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.
