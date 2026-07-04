#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { patterns, samples } from "./pattern-data.mjs";

const root = process.cwd();
const patternsDir = path.join(root, "patterns");

function rule(selector, declarations) {
  const body = Object.entries(declarations)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([property, value]) => `    ${property}: ${value};`)
    .join("\n");
  return `${selector} {\n${body}\n}`;
}

function sampleHtml(slug) {
  const html = samples[slug];
  if (!html) throw new Error(`missing sample HTML for ${slug}`);
  return html.trim();
}

function slugDir(category) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function normalize(raw) {
  const [slug, category, problem, axis, responsiveness, source, rawRules, scrollOwnership] = raw;
  const css = rawRules.map(([selector, declarations]) => rule(selector, declarations)).join("\n\n");
  return { axis, category, css, problem, responsiveness, scrollOwnership, slug, source };
}

function render(raw) {
  const pattern = normalize(raw);
  const rootClass = pattern.slug.replaceAll("-", "_");
  const html = sampleHtml(pattern.slug);
  return [
    "---",
    "type: Layout Pattern",
    `name: ${pattern.slug}`,
    `title: ${pattern.slug}`,
    `category: ${pattern.category}`,
    `description: ${pattern.problem}`,
    `primary_spatial_problem: ${pattern.problem}`,
    "secondary_spatial_problems: none",
    `layout_axis: ${pattern.axis}`,
    "content_shape: mixed",
    `responsiveness: ${pattern.responsiveness}`,
    "constraints: Uses only local class hooks and explicit layout constraints.",
    `scroll_ownership: ${pattern.scrollOwnership ?? "No internal scroll container."}`,
    `source_lineage: ${pattern.source}`,
    "---",
    "",
    `# ${pattern.slug}`,
    "",
    "## When To Use",
    "",
    `Use this pattern when you need to ${pattern.problem.charAt(0).toLowerCase()}${pattern.problem.slice(1)}`,
    "",
    "## HTML",
    "",
    "```html",
    html,
    "```",
    "",
    "## CSS",
    "",
    "```css",
    pattern.css,
    "```",
    "",
    "## Failure Mode",
    "",
    `If the core layout declarations are removed, \`${rootClass}\` stops preserving its primary spatial responsibility and its children fall back to ordinary document flow.`,
    "",
    "## Accessibility Notes",
    "",
    "Keep semantic elements and reading order in the HTML. The layout classes only control spatial behavior and do not replace landmarks, headings, links, buttons, or form controls.",
    "",
  ].join("\n");
}

fs.rmSync(patternsDir, { force: true, recursive: true });
for (const pattern of patterns) {
  const [slug, category] = pattern;
  const dir = path.join(patternsDir, slugDir(category));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${slug}.md`), render(pattern));
}

for (const category of [...new Set(patterns.map(([, category]) => category))]) {
  const categoryPatterns = patterns.filter(([, patternCategory]) => patternCategory === category);
  const dir = path.join(patternsDir, slugDir(category));
  fs.writeFileSync(
    path.join(dir, "index.md"),
    [
      `# ${category}`,
      "",
      ...categoryPatterns.map(([slug, , problem]) => `- [${slug}](${slug}.md) - ${problem}`),
      "",
    ].join("\n"),
  );
}

fs.writeFileSync(
  path.join(patternsDir, "index.md"),
  [
    "# Pattern Categories",
    "",
    ...[...new Set(patterns.map(([, category]) => category))]
      .map((category) => `- [${category}](${slugDir(category)}/index.md)`),
    "",
  ].join("\n"),
);

fs.writeFileSync(
  path.join(root, "CATALOG.md"),
  [
    "---",
    "type: Catalog",
    "title: Layout Pattern Catalog",
    "description: Generated index of layout-gallery patterns.",
    "---",
    "",
    "# Layout Pattern Catalog",
    "",
    "Generated from `scripts/generate-patterns.mjs` and `scripts/pattern-data.mjs`.",
    "",
    "## Planning Layer",
    "",
    "- [Layout Planning Guide](GUIDE.md) - Pre-design entry point for choosing and composing patterns.",
    "- [Decision Tree](guides/decision-tree.md) - Question-driven route from screen constraints to pattern categories.",
    "- [Layout Brief](guides/layout-brief.md) - Questions to answer before selecting a pattern stack.",
    "- [Layout Recipes](recipes/index.md) - Screen-level compositions built from reusable patterns.",
    "",
    "## Patterns",
    "",
    ...patterns.map(([slug, category, problem]) => `- [${slug}](patterns/${slugDir(category)}/${slug}.md) - ${category}: ${problem}`),
    "",
  ].join("\n"),
);

console.log(`generated ${patterns.length} patterns`);
