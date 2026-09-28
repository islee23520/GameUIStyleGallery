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
  const { genreWireframes, inputTargetWireframes } = await import(pathToFileURL(path.join(root, "gallery-site/genre-wireframes.mjs")).href);
  const { strategyGames } = await import(pathToFileURL(path.join(root, "gallery-site/pc-strategy-states.mjs")).href);

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
  for (const [section, entries] of [["genres", genreWireframes], ["platforms", inputTargetWireframes]]) {
    assert.ok(fileSet.has(`${section}/index.html`), `missing ${section} index`);
    for (const [slug, regions] of Object.entries(entries)) {
      assert.ok(regions.length > 0, `${section}/${slug}: no proposed regions`);
      const target = `${section}/${slug}/index.html`;
      assert.ok(fileSet.has(target), `missing ${target}`);
      const body = fs.readFileSync(path.join(out, target), "utf8");
      assert.ok(body.includes('class="viewport genre-viewport"'), `${target}: missing wireframe`);
      assert.ok(body.includes("Observed Screens") || section === "platforms", `${target}: missing observation boundary`);
    }
  }
  assert.ok(fileSet.has("strategy/index.html"), "missing PC strategy index");
  assert.ok(fileSet.has("strategy/norland/index.html"), "missing Norland wireframe");
  const norland = fs.readFileSync(path.join(out, "strategy/norland/index.html"), "utf8");
  assert.ok(norland.includes('data-view="settlement"') && norland.includes('data-view="world"'), "Norland must distinguish its game views");
  assert.ok(norland.includes('id="detail"') && norland.includes('id="veil"'), "Norland must distinguish panels and overlays");
  assert.ok(fs.readFileSync(path.join(out, "strategy/index.html"), "utf8").includes('href="/strategy/norland/"'), "strategy index must link Norland");
  assert.ok(fileSet.has("assets/pc-strategy.js"), "missing strategy state controller");
  for (const [slug, spec] of Object.entries(strategyGames)) {
    const relative = `strategy/${slug}/index.html`;
    assert.ok(fileSet.has(relative), `missing ${relative}`);
    const content = fs.readFileSync(path.join(out, relative), "utf8");
    const embedded = content.match(/<script type="application\/json" id="pc-strategy-spec">([^<]+)<\/script>/)?.[1];
    assert.ok(embedded, `${relative}: missing state payload`);
    const delivered = JSON.parse(embedded);
    assert.deepEqual(delivered.states.map(({ id }) => id), spec.states.map(({ id }) => id));
    assert.equal(new Set(delivered.states.map(({ id }) => id)).size, spec.states.length);
    for (const { id } of spec.states) assert.ok(content.includes(`data-strategy-state="${id}"`), `${relative}: no control for ${id}`);
    for (const required of ["loading", "empty", "error", "confirm"]) assert.ok(delivered.states.some(({ id }) => id === required), `${relative}: missing ${required}`);
    assert.ok(content.includes('aria-pressed="false"'));
    assert.ok(!/<(?:img|video|source)\b[^>]*\bsrc=/i.test(content), `${relative}: copied media`);
  }
  assert.ok(strategyGames["total-war-warhammer-iii"].states.some(({ surface }) => surface === "campaign"));
  assert.ok(strategyGames["total-war-warhammer-iii"].states.some(({ surface }) => surface === "battle"));

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
