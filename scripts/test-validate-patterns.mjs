#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const validator = path.join(root, "scripts", "validate-patterns.mjs");
const cases = [
  {
    name: "missing_metadata",
    file: "patterns/stacking/bad.md",
    content: "# Bad\n\n## HTML\n\n```html\n<div></div>\n```\n\n## CSS\n\n```css\n.bad {\n    display: grid;\n}\n```\n\n## Failure Mode\n\nBad.\n\n## Accessibility Notes\n\nBad.\n",
    expect: "missing frontmatter",
  },
  {
    name: "unsorted_css",
    file: "patterns/stacking/bad.md",
    content: pattern("bad", "Stacking", ".bad {\n    width: 100%;\n    display: grid;\n}"),
    expect: "declarations are not alphabetical",
  },
  {
    name: "forbidden_property",
    file: "patterns/stacking/bad.md",
    content: pattern("bad", "Stacking", ".bad {\n    background: red;\n    display: grid;\n}"),
    expect: "forbidden decorative property",
  },
  {
    name: "id_selector",
    file: "patterns/stacking/bad.md",
    content: pattern("bad", "Stacking", "#bad {\n    display: grid;\n}"),
    expect: "selector uses id",
  },
  {
    name: "missing_html_block",
    file: "patterns/stacking/bad.md",
    content: pattern("bad", "Stacking", ".bad {\n    display: grid;\n}", ""),
    expect: "missing html code block",
  },
  {
    name: "missing_css_block",
    file: "patterns/stacking/bad.md",
    content: pattern("bad", "Stacking", "", "<section class=\"bad\"></section>"),
    expect: "missing css code block",
  },
  {
    name: "missing_css_hook_in_html",
    file: "patterns/stacking/bad.md",
    content: pattern("bad", "Stacking", ".bad {\n    display: grid;\n}\n\n.bad_item {\n    display: grid;\n}"),
    expect: "is missing from HTML block",
  },
  {
    name: "unused_html_class",
    file: "patterns/stacking/bad.md",
    content: pattern("bad", "Stacking", ".bad {\n    display: grid;\n}", "<section class=\"bad\"><div class=\"bad_extra\"></div></section>"),
    expect: "has no CSS rule",
  },
  {
    name: "placeholder_html",
    file: "patterns/stacking/bad.md",
    content: pattern("bad", "Stacking", ".bad {\n    display: grid;\n}", "<section class=\"bad\"><article>First item</article></section>"),
    expect: "placeholder sample phrase",
  },
  {
    name: "success_path",
    file: "patterns/stacking/good.md",
    content: pattern("good", "Stacking", ".good {\n    display: grid;\n    gap: 1rem;\n}", "<section class=\"good\"><article>Quarterly review</article></section>"),
    expect: null,
  },
];

function pattern(name, category, css, html = `<section class="${name}"></section>`) {
  const cssBlock = css ? `\n\`\`\`css\n${css}\n\`\`\`\n` : "\n";
  return `---\nname: ${name}\ncategory: ${category}\nprimary_spatial_problem: Test spatial problem.\nsecondary_spatial_problems: none\nlayout_axis: block\ncontent_shape: mixed\nresponsiveness: fluid\nconstraints: Test constraints.\nscroll_ownership: No internal scroll container.\nsource_lineage: test\n---\n\n# ${name}\n\n## When To Use\n\nUse for validation tests.\n\n## HTML\n\n\`\`\`html\n${html}\n\`\`\`\n\n## CSS\n${cssBlock}\n## Failure Mode\n\nBad layout.\n\n## Accessibility Notes\n\nKeep semantic order.\n`;
}

function runCase(testCase) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), `layout-gallery-${testCase.name}-`));
  const absolute = path.join(dir, testCase.file);
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  fs.writeFileSync(absolute, testCase.content);
  const result = spawnSync(process.execPath, [validator, "--min-count", "1", "--json"], {
    cwd: dir,
    encoding: "utf8",
  });
  fs.rmSync(dir, { force: true, recursive: true });
  const output = JSON.parse(result.stdout);
  const passed = testCase.expect ? !output.ok && output.failures.some((failure) => failure.includes(testCase.expect)) : output.ok;
  return {
    name: testCase.name,
    ok: passed,
    expected: testCase.expect ?? "ok:true",
    actual: output,
  };
}

const results = cases.map(runCase);
const report = {
  ok: results.every((result) => result.ok),
  results,
};

console.log(JSON.stringify(report, null, 2));
process.exit(report.ok ? 0 : 1);
