#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = path.join(root, "game-ui/interfaceingame/data");
const load = (name) => JSON.parse(fs.readFileSync(path.join(data, `${name}.json`), "utf8"));
const [games, captures, articles, taxonomies, manifest] =
  ["games", "screenshots", "articles", "taxonomies", "manifest"].map(load);
const unique = (values, name) => assert.equal(new Set(values).size, values.length, `${name} must be unique`);
const sourceUrl = (value) => assert.ok(
  typeof value === "string" && value.startsWith("https://interfaceingame.com/"),
  `invalid source URL: ${value}`,
);

unique(games.map((game) => game.slug), "game slugs");
unique(captures.map((capture) => capture.slug), "capture slugs");
unique(articles.map((article) => article.slug), "article slugs");
assert.equal(games.length, manifest.counts.games);
assert.equal(games.length, manifest.counts.source_reported_games);
assert.equal(articles.length, manifest.counts.articles);
assert.equal(articles.length, manifest.counts.source_reported_articles);
assert.equal(captures.length, manifest.counts.screenshots);

const byGame = new Map(games.map((game) => [game.slug, { images: 0, videos: 0 }]));
for (const game of games) {
  sourceUrl(game.url);
  for (const [field, taxonomy] of [
    ["genres", "genres"], ["themes", "themes"], ["platforms", "platforms"], ["publishers", "publishers"],
  ]) {
    for (const slug of game[field]) assert.ok(Object.hasOwn(taxonomies[taxonomy], slug), `${game.slug}: unknown ${taxonomy} ${slug}`);
  }
}
for (const capture of captures) {
  sourceUrl(capture.url);
  sourceUrl(capture.media_url);
  assert.ok(byGame.has(capture.game), `${capture.slug}: missing game`);
  assert.ok(capture.media_type === "image" || capture.media_type === "video", `${capture.slug}: unknown media type`);
  for (const element of capture.elements) assert.ok(Object.hasOwn(taxonomies.elements, element), `${capture.slug}: unknown element ${element}`);
  if (capture.media_type === "image") sourceUrl(capture.thumb_url);
  byGame.get(capture.game)[capture.media_type === "image" ? "images" : "videos"]++;
}
for (const article of articles) sourceUrl(article.url);
for (const game of games) {
  const actual = byGame.get(game.slug);
  assert.equal(game.screenshot_count, actual.images, `${game.slug}: image count`);
  assert.equal(game.video_count, actual.videos, `${game.slug}: video count`);
}
assert.equal(captures.filter((item) => item.media_type === "image").length, manifest.counts.images);
assert.equal(captures.filter((item) => item.media_type === "video").length, manifest.counts.videos);
console.log(`PASS ${games.length} games, ${captures.length} captures (${manifest.counts.images} images, ${manifest.counts.videos} videos), ${articles.length} articles`);
