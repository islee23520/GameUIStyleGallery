#!/usr/bin/env node
import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE = "https://interfaceingame.com";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : fallback;
};
const CACHE = path.resolve(ROOT, option("cache", ".omo/cache/interfaceingame"));
const OUT = path.resolve(ROOT, option("out", "game-ui/interfaceingame/data"));
const CONCURRENCY = Number(option("concurrency", "4"));
const OFFLINE = args.includes("--offline");
const REFRESH = args.includes("--refresh");
const RETRIEVED_ON = option("retrieved-on", new Date().toISOString().slice(0, 10));
const HEADERS = { "User-Agent": "StyleGallery game-ui catalog (metadata only)" };
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const exists = async (file) => stat(file).then((s) => s.size > 0, () => false);

async function fetchText(url) {
  let last;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const response = await fetch(url, { headers: HEADERS });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return { text: await response.text(), headers: response.headers };
    } catch (error) {
      last = error;
      await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
    }
  }
  throw new Error(`${url}: ${last?.message}`);
}

async function cached(name, url) {
  const file = path.join(CACHE, `${name}.html`);
  if (!REFRESH && await exists(file)) return readFile(file, "utf8");
  if (OFFLINE) throw new Error(`offline cache miss: ${file}`);
  const { text } = await fetchText(url);
  await writeFile(file, text);
  return text;
}

async function restAll(type, fields) {
  const file = path.join(CACHE, `rest-${type}.json`);
  if (!REFRESH && await exists(file)) return JSON.parse(await readFile(file, "utf8"));
  if (OFFLINE) throw new Error(`offline cache miss: ${file}`);
  const items = [];
  let total = 0;
  for (let page = 1; ; page++) {
    const { text, headers } = await fetchText(`${BASE}/wp-json/wp/v2/${type}?per_page=100&page=${page}&_fields=${fields}`);
    items.push(...JSON.parse(text));
    total = Number(headers.get("x-wp-total"));
    if (page >= Number(headers.get("x-wp-totalpages") || 1)) break;
  }
  const result = { total, items };
  await writeFile(file, JSON.stringify(result));
  return result;
}

const decode = (value) =>
  value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();

const ITEM = /<article\s+class="item \| item--(image|video) \| item--screenshots".*?<\/article>/gs;
const FACET = /href="[^"]*\?(genres|themes|elements)=([a-z0-9-]+)"[^>]*>\s*(?:<span[^>]*>)?([^<]+)</g;

function parseItems(html) {
  const items = [];
  for (const [block, kind] of html.matchAll(ITEM)) {
    const url = block.match(/class="item__title-link"\s+href="([^"]+)"/)?.[1];
    const title = block.match(/<span class="item__title-text">([^<]*)<\/span>/)?.[1];
    const thumb = block.match(/data-src="([^"]+)"/)?.[1] ?? null;
    const video = block.match(/src="(https:\/\/interfaceingame\.com\/[^"#]+\.(?:mp4|webm|mov|mkv))/)?.[1] ?? null;
    items.push({
      slug: url.replace(/\/$/, "").split("/").pop(),
      title: title === undefined ? null : decode(title),
      url,
      elements: [...new Set([...block.matchAll(/\?elements=([a-z0-9-]+)"/g)].map((m) => m[1]))].sort(),
      media_type: kind,
      media_url: kind === "video" ? video : thumb?.replace(/-\d+x\d+(\.\w+)$/, "$1") ?? null,
      thumb_url: kind === "image" ? thumb : null,
    });
  }
  return items;
}

function parseFacets(html, labels) {
  for (const [, taxonomy, slug, label] of html.matchAll(FACET)) {
    labels[taxonomy] ??= {};
    labels[taxonomy][slug] = decode(label);
  }
}

function parseHeader(html) {
  const start = html.indexOf('class="page-header"');
  const header = start >= 0 ? html.slice(start, html.indexOf("</header>", start)) : "";
  const text = header
    .replace(/<svg.*?<\/svg>|<noscript.*?<\/noscript>/gs, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const date = text.match(new RegExp(`\\b(${MONTHS.join("|")}) (\\d{1,2}), (\\d{4})\\b`));
  return {
    release_date: date ? `${date[3]}-${String(MONTHS.indexOf(date[1]) + 1).padStart(2, "0")}-${date[2].padStart(2, "0")}` : null,
    platforms_text: text.match(/Available for (.+)$/)?.[1].trim() ?? null,
  };
}

const facetOf = (classList, prefix) =>
  classList.filter((c) => c.startsWith(`${prefix}-`)).map((c) => c.slice(prefix.length + 1)).sort();

async function crawlGame(game, labels) {
  const link = game.link.replace(/\/$/, "");
  const items = new Map();
  let header;
  for (let page = 1; ; page++) {
    const html = await cached(page === 1 ? game.slug : `${game.slug}__p${page}`, page === 1 ? `${link}/` : `${link}/page/${page}/`);
    if (page === 1) header = parseHeader(html);
    parseFacets(html, labels);
    for (const item of parseItems(html)) if (!items.has(item.slug)) items.set(item.slug, { ...item, game: game.slug });
    if (!html.includes(`${link}/page/${page + 1}/`)) break;
  }
  return { header, items: [...items.values()] };
}

async function pool(list, limit, worker) {
  const results = new Array(list.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (next < list.length) {
        const index = next++;
        results[index] = await worker(list[index]);
      }
    }),
  );
  return results;
}

const lines = (records) => `[\n${records.map((r) => JSON.stringify(r)).join(",\n")}\n]\n`;
const slugify = (label) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function main() {
  if (OFFLINE && REFRESH) throw new Error("--offline and --refresh cannot be combined");
  await mkdir(CACHE, { recursive: true });
  await mkdir(OUT, { recursive: true });
  const rest = await restAll("games", "id,slug,link,title,modified,class_list");
  const articles = await restAll("articles", "id,slug,link,title,date,class_list");
  const labels = {};
  for (const [name, url] of [["_index_home", `${BASE}/`], ["_index_games", `${BASE}/games/`], ["_index_screenshots", `${BASE}/screenshots/`]]) {
    parseFacets(await cached(name, url), labels);
  }

  const crawled = await pool(rest.items, CONCURRENCY, (game) => crawlGame(game, labels));
  const games = [];
  const screenshots = [];
  const platformLabels = {};
  rest.items.forEach((game, index) => {
    const { header, items } = crawled[index];
    const platforms = facetOf(game.class_list, "platforms");
    for (const label of (header.platforms_text ?? "").split(/,\s*/).filter(Boolean)) {
      if (platforms.includes(slugify(label))) platformLabels[slugify(label)] = label;
    }
    games.push({
      id: game.id,
      slug: game.slug,
      title: decode(game.title.rendered),
      url: game.link,
      release_date: header.release_date,
      genres: facetOf(game.class_list, "genres"),
      themes: facetOf(game.class_list, "themes"),
      platforms,
      publishers: facetOf(game.class_list, "publishers"),
      screenshot_count: items.filter((i) => i.media_type === "image").length,
      video_count: items.filter((i) => i.media_type === "video").length,
      source_modified: game.modified,
    });
    screenshots.push(...items);
  });
  games.sort((a, b) => a.slug.localeCompare(b.slug));
  screenshots.sort((a, b) => a.game.localeCompare(b.game) || a.slug.localeCompare(b.slug));
  const publishers = Object.fromEntries([...new Set(games.flatMap((g) => g.publishers))].sort().map((slug) => [slug, null]));
  const sortKeys = (object) => Object.fromEntries(Object.entries(object ?? {}).sort(([a], [b]) => a.localeCompare(b)));

  const taxonomies = {
    source: `${BASE}/`,
    retrieved_on: RETRIEVED_ON,
    note: "Site-local facets. Publisher labels are not exposed by the source and are recorded as null.",
    elements: sortKeys(labels.elements),
    genres: sortKeys(labels.genres),
    themes: sortKeys(labels.themes),
    platforms: sortKeys(platformLabels),
    publishers,
  };
  const articleRecords = articles.items
    .map((a) => ({
      id: a.id,
      slug: a.slug,
      title: decode(a.title.rendered),
      url: a.link,
      date: a.date.slice(0, 10),
      categories: facetOf(a.class_list, "categories"),
    }))
    .sort((a, b) => a.date.localeCompare(b.date) || a.slug.localeCompare(b.slug));
  const manifest = {
    source: `${BASE}/`,
    retrieved_on: RETRIEVED_ON,
    method: "WordPress REST (games, articles) plus paginated game pages; metadata and source URLs only, no media binaries.",
    counts: {
      games: games.length,
      source_reported_games: rest.total,
      screenshots: screenshots.length,
      images: screenshots.filter((s) => s.media_type === "image").length,
      videos: screenshots.filter((s) => s.media_type === "video").length,
      articles: articleRecords.length,
      source_reported_articles: articles.total,
    },
  };

  await writeFile(path.join(OUT, "games.json"), lines(games));
  await writeFile(path.join(OUT, "screenshots.json"), lines(screenshots));
  await writeFile(path.join(OUT, "articles.json"), lines(articleRecords));
  await writeFile(path.join(OUT, "taxonomies.json"), `${JSON.stringify(taxonomies, null, 2)}\n`);
  await writeFile(path.join(OUT, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify(manifest.counts)}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error}\n`);
  process.exit(1);
});
