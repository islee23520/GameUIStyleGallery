#!/usr/bin/env node
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = fs.mkdtempSync(path.join(os.tmpdir(), "gameui-site-"));
try {
  execFileSync(process.execPath, [path.join(root, "scripts/build-site.mjs"), "--out", out], { stdio: "pipe" });
  const { elementSlugs } = await import(pathToFileURL(path.join(root, "gallery-site/elements.mjs")).href);

  const files = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const target = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(target);
      else files.push(path.relative(out, target).split(path.sep).join("/"));
    }
  })(out);
  const fileSet = new Set(files);

  for (const required of ["index.html", "404.html", "showcase/index.html", "docs/index.html", "assets/site.css", "assets/tween.js", "assets/element.js"]) {
    assert.ok(fileSet.has(required), `missing ${required}`);
  }
  assert.ok(!files.some((f) => f.startsWith("catalog/") || f.endsWith(".json")), "the site must not publish catalog records");
  assert.equal(elementSlugs.length, 21);
  for (const slug of elementSlugs) assert.ok(fileSet.has(`elements/${slug}/index.html`), `missing element page ${slug}`);

  const docs = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
      const rel = path.posix.join(dir, entry.name);
      if (entry.isDirectory()) walk(rel);
      else if (entry.name.endsWith(".md")) docs.push(rel);
    }
  })("game-ui");
  for (const doc of docs) assert.ok(fileSet.has(`docs/${doc.replace(/\.md$/, ".html")}`), `missing docs page for ${doc}`);

  const html = files.filter((f) => f.endsWith(".html"));
  const broken = [];
  for (const file of html) {
    const content = fs.readFileSync(path.join(out, file), "utf8");
    assert.ok(!/interfaceingame/i.test(content), `${file} references a removed third-party archive`);
    for (const [, href] of content.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
      const clean = href.replace(/^\//, "");
      const candidates = [clean, `${clean}.html`, path.posix.join(clean, "index.html")];
      if (!candidates.some((c) => fileSet.has(c) || c === "")) broken.push(`${file} -> ${href}`);
    }
  }
  assert.deepEqual(broken, [], "internal links must resolve");

  console.log(`site build test passed: ${html.length} pages, ${elementSlugs.length} element pages, ${docs.length} docs`);
} finally {
  fs.rmSync(out, { recursive: true, force: true });
}
