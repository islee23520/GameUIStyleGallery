---
type: Planning Guide
title: Layout Brief Template
description: Questions to answer before selecting a layout pattern stack.
---

# Layout Brief Template

Use this template before choosing patterns. The answer should describe spatial responsibility, not visual style.

## Screen

- What is the screen type?
- What is the primary user task?
- What is the primary content?
- What is the supporting content?

## Source Order

- Does DOM order match reading order?
- Does visual order match focus order?
- Which landmarks, headings, lists, links, buttons, or form controls are required before layout classes?

## Scroll Ownership

- What owns scrolling?
- Is there one scroll container or more than one?
- Which regions stay fixed, sticky, or static?
- Where is height determined?

## Constraints

- What are the minimum and maximum inline sizes?
- Which gaps are stable across the screen?
- Which regions may shrink, wrap, or overflow?
- Which values are product tokens, and which are browser mechanics?

## Responsiveness

- Is this a viewport-level problem or a component-local problem?
- Can the layout adapt through intrinsic sizing before adding breakpoints?
- Should container queries be used instead of viewport breakpoints?
- What changes at narrow, medium, and roomy container sizes?

## Content Stress

- What happens when content is empty?
- What happens with long labels?
- What happens with long paragraphs?
- What happens with an unbroken string?
- Does the layout survive `ltr` and `rtl` direction?

## Candidate Pattern Stack

Record the initial pattern stack and why each pattern is responsible for a specific spatial problem.

```txt
Screen type:
Primary task:
Primary content:
Supporting content:
Scroll owner:
Pattern stack:
Constraints:
Change points:
Patterns rejected:
```
