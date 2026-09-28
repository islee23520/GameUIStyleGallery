#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.resolve(root, process.argv.includes("--out") ? process.argv[process.argv.indexOf("--out") + 1] : "dist/site");
const repoBlob = "https://github.com/islee23520/GameUIStyleGallery/blob/main/";
const { elements, stateLabels, demoLabels } = await import(pathToFileURL(path.join(root, "gallery-site/elements.mjs")).href);
const { genreWireframes, inputTargetWireframes } = await import(pathToFileURL(path.join(root, "gallery-site/genre-wireframes.mjs")).href);
const { strategyGames } = await import(pathToFileURL(path.join(root, "gallery-site/pc-strategy-states.mjs")).href);

const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const readJson = (relative) => JSON.parse(read(relative));
const esc = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const write = (relative, content) => {
  const target = path.join(out, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
};

const elementsDoc = read("game-ui/elements.md");
const mapRows = [...elementsDoc.matchAll(/^\| `([a-z-]+)` \| ([^|]+) \| `([a-z-]+)` \| ([^|]+) \| ([^|]+) \|$/gm)].map((m) => ({
  slug: m[1],
  label: m[2].trim(),
  primary: m[3],
  secondary: m[4].trim(),
  layer: m[5].trim(),
}));
const mapBySlug = new Map(mapRows.map((row) => [row.slug, row]));

function guideFor(slug) {
  const start = elementsDoc.indexOf(`(\`${slug}\`)`);
  const section = elementsDoc.slice(start, elementsDoc.indexOf("\n### ", start + 1) > 0 ? elementsDoc.indexOf("\n### ", start + 1) : elementsDoc.indexOf("\n## ", start));
  const field = (name) => section.match(new RegExp(`^- ${name}: (.+)$`, "m"))?.[1] ?? "";
  const sentence = (value) => value.charAt(0).toUpperCase() + value.slice(1);
  return {
    question: sentence(field("Player question")),
    jobs: field("Jobs"),
    states: field("States"),
    input: field("Input and focus"),
    failures: field("Failure modes"),
  };
}

const classLabels = {
  navigation: "Navigation",
  hud: "HUD",
  dialog: "Dialog",
  progression: "Progression",
  inventory: "Inventory",
  commerce: "Commerce",
  tutorial: "Tutorial",
  narrative: "Narrative",
  "system-status": "System status",
};

const byClass = new Map();
for (const element of elements) {
  const row = mapBySlug.get(element.slug);
  if (!row) throw new Error(`elements.md Element Map has no row for ${element.slug}`);
  element.label = row.label;
  element.map = row;
  element.guide = guideFor(element.slug);
  if (!byClass.has(row.primary)) byClass.set(row.primary, []);
  byClass.get(row.primary).push(element);
}

const docPaths = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    const rel = path.posix.join(dir, entry.name);
    if (entry.isDirectory()) walk(rel);
    else if (entry.name.endsWith(".md")) docPaths.push(rel);
  }
})("game-ui");
docPaths.sort();
const docHref = (repoPath) => `/docs/${repoPath.replace(/\.md$/, "")}.html`;

function inline(text, fromPath) {
  let html = esc(text);
  html = html.replace(/`([^`]+)`/g, (_, code) => `<code>${code}</code>`);
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    const raw = href.replace(/&amp;/g, "&");
    if (/^https?:\/\//.test(raw)) return `<a href="${esc(raw)}" rel="noopener">${label}</a>`;
    if (raw.startsWith("#")) return `<a href="${esc(raw)}">${label}</a>`;
    const [target, hash = ""] = raw.split("#");
    const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(fromPath), target));
    if (resolved.startsWith("game-ui/") && resolved.endsWith(".md")) return `<a href="${docHref(resolved)}${hash ? `#${hash}` : ""}">${label}</a>`;
    return `<a href="${repoBlob}${esc(resolved)}" rel="noopener">${label}</a>`;
  });
  return html;
}

function slugifyHeading(text) {
  return text.toLowerCase().replace(/[`*]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function markdown(source, fromPath) {
  const lines = source.replace(/^---\n[\s\S]*?\n---\n/, "").split("\n");
  const html = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const body = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) body.push(lines[i++]);
      i++;
      html.push(`<pre><code${lang ? ` data-lang="${esc(lang)}"` : ""}>${esc(body.join("\n"))}</code></pre>`);
      continue;
    }
    const heading = line.match(/^(#{1,4}) (.+)$/);
    if (heading) {
      const level = heading[1].length;
      html.push(`<h${level} id="${slugifyHeading(heading[2])}">${inline(heading[2], fromPath)}</h${level}>`);
      i++;
      continue;
    }
    if (line.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) rows.push(lines[i++]);
      const cells = (row) => row.trim().slice(1, -1).split(/(?<!\\)\|/).map((cell) => cell.trim().replace(/\\\|/g, "|"));
      const [head, , ...body] = rows;
      html.push(`<table><thead><tr>${cells(head).map((c) => `<th>${inline(c, fromPath)}</th>`).join("")}</tr></thead><tbody>${body.map((row) => `<tr>${cells(row).map((c) => `<td>${inline(c, fromPath)}</td>`).join("")}</tr>`).join("")}</tbody></table>`);
      continue;
    }
    if (/^(\s*)[-*] /.test(line) || /^\d+\. /.test(line)) {
      const ordered = /^\d+\. /.test(line);
      const items = [];
      while (i < lines.length && (/^[-*] /.test(lines[i]) || /^\d+\. /.test(lines[i]) || /^\s{2,}\S/.test(lines[i]))) {
        if (/^\s{2,}\S/.test(lines[i]) && items.length) items[items.length - 1] += ` ${lines[i].trim()}`;
        else items.push(lines[i].replace(/^([-*]|\d+\.) /, ""));
        i++;
      }
      const tag = ordered ? "ol" : "ul";
      html.push(`<${tag}>${items.map((item) => `<li>${inline(item, fromPath)}</li>`).join("")}</${tag}>`);
      continue;
    }
    if (line.startsWith("> ")) {
      const quote = [];
      while (i < lines.length && lines[i].startsWith("> ")) quote.push(lines[i++].slice(2));
      html.push(`<blockquote><p>${inline(quote.join(" "), fromPath)}</p></blockquote>`);
      continue;
    }
    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,4} |```|\||[-*] |\d+\. |> )/.test(lines[i])) para.push(lines[i++]);
    html.push(`<p>${inline(para.join(" "), fromPath)}</p>`);
  }
  return html.join("\n");
}

const docTitle = (repoPath) => {
  const source = read(repoPath);
  return source.match(/^title: (.+)$/m)?.[1] ?? source.match(/^# (.+)$/m)?.[1] ?? repoPath;
};

const guideLinks = [
  ["Element patterns", "game-ui/elements.md"],
  ["Genre guide index", "game-ui/genres/index.md"],
  ["PC strategy comparison", "game-ui/strategy/index.md"],
  ["Input and screen targets", "game-ui/platforms/index.md"],
  ["Unity uGUI implementation", "game-ui/unity/ugui-implementation.md"],
  ["Unity UI systems", "game-ui/unity/ui-systems.md"],
  ["Classification", "game-ui/classification.md"],
  ["Decision tree", "game-ui/decision-tree.md"],
  ["Screen recipes", "game-ui/screen-recipes.md"],
  ["Verification workflow", "game-ui/verification-workflow.md"],
  ["All documents", "docs-index"],
];

function nav(current) {
  const item = (href, label, key) => `<li><a class="nav-item" href="${href}"${key === current ? ' aria-current="page"' : ""}>${esc(label)}</a></li>`;
  const groups = [...byClass.entries()]
    .map(([cls, list]) => `<div class="nav-group"><h2>${esc(classLabels[cls] ?? cls)}</h2><ul>${list.map((e) => item(`/elements/${e.slug}/`, e.label, `element:${e.slug}`)).join("")}</ul></div>`)
    .join("");
  const guides = guideLinks.map(([label, target]) => item(target === "docs-index" ? "/docs/" : docHref(target), label, target === "docs-index" ? "docs" : `doc:${target}`)).join("");
  return `<nav class="shell-nav" aria-label="Site">
  <div class="brand-row"><a class="brand" href="/">Game UI <strong>Gallery</strong></a></div>
  <button class="btn btn-ghost nav-toggle" type="button" aria-expanded="false" aria-controls="nav-body">Menu</button>
  <div class="nav-body" id="nav-body">
    <div class="nav-group"><h2>Browse</h2><ul>${item("/", "Overview", "home")}${item("/genres/", "Genres", "genres")}${item("/platforms/", "Input targets", "platforms")}${item("/strategy/", "PC strategy", "strategy")}${item("/showcase/", "Primitives", "showcase")}</ul></div>
    ${groups}
    <div class="nav-group"><h2>Guides</h2><ul>${guides}</ul></div>
  </div>
</nav>`;
}

function page({ title, description, current, body, scripts = [] }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} | Game UI Gallery</title>
<meta name="description" content="${esc(description)}">
<link rel="stylesheet" href="/assets/site.css">
<script type="module" src="/assets/shell.js"></script>
${scripts.map((src) => `<script type="module" src="${src}"></script>`).join("\n")}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="shell">
${nav(current)}
<main class="shell-main" id="main">
${body}
<footer class="footer">Wireframes, patterns, and samples are locally authored; no third-party screenshots or records are stored. Source: <a href="https://github.com/islee23520/GameUIStyleGallery" rel="noopener">GameUIStyleGallery</a>.</footer>
</main>
</div>
</body>
</html>
`;
}

function region(r, index, controlIndex) {
  const [x, y, w, h] = r.box;
  const style = `left:${x}%;top:${y}%;width:${w}%;height:${h}%`;
  if (r.kind === "bar") {
    return `<div class="wf wf-bar" data-kind="bar" data-fill="${r.fill}" style="${style}" role="img" aria-label="${esc(r.label)} bar"><span class="wf-fill wf-fill-trail" style="transform:scaleX(${r.fill})"></span><span class="wf-fill" style="transform:scaleX(${r.fill})"></span><span>${esc(r.label)}</span></div>`;
  }
  if (r.kind === "control") {
    return `<div class="wf" data-kind="control" data-index="${controlIndex}" id="wf-c-${controlIndex}" role="button" aria-label="${esc(r.label)}"${r.lockable ? ' data-lockable="true"' : ""} style="${style}">${esc(r.label)}</div>`;
  }
  return `<div class="wf" data-kind="${r.kind}" style="${style}">${esc(r.label)}</div>`;
}

function specials(element) {
  const box = (x, y, w, h) => `left:${x}%;top:${y}%;width:${w}%;height:${h}%`;
  switch (element.demo) {
    case "tabs":
      return `<div class="wf wf-window" data-kind="panel" style="${box(6, 20, 88, 60)}"><div class="wf-strip" style="width:${element.tabs.length * 100}%">${element.tabs
        .map((tab) => `<div class="wf-page"><strong>${esc(tab)}</strong><span>Option row</span><span>Option row</span><span>Slider row</span></div>`)
        .join("")}</div></div>`;
    case "carousel":
      return `<div class="wf wf-window" data-kind="panel" style="${box(18, 10, 44, 70)}"><div class="wf-strip" style="width:${element.carousel.length * 100}%">${element.carousel
        .map((name) => `<div class="wf-page wf-card"><span class="wf-portrait">Model preview</span><strong>${esc(name)}</strong></div>`)
        .join("")}</div></div>`;
    case "grid": {
      const cells = Array.from({ length: 40 }, (_, i) => `<span class="wf-cell">${i === 0 ? "New" : i % 7 === 3 ? "x3" : ""}</span>`).join("");
      return `<div class="wf wf-window" data-kind="panel" style="${box(6, 16, 60, 76)}"><div class="wf-track wf-grid" data-max="60" style="height:250%">${cells}</div></div>`;
    }
    case "scroll":
      return `<div class="wf wf-window" data-kind="panel" style="${box(20, 6, 60, 76)}"><div class="wf-track wf-credits" data-max="66.67" style="height:300%">${element.lines
        .map((line) => `<div><strong>${esc(line)}</strong><span>Name Surname</span><span>Name Surname</span></div>`)
        .join("")}</div></div>`;
    case "pan":
      return `<div class="wf-map" aria-hidden="true"><span style="${box(20, 30, 10, 8)}">Camp</span><span style="${box(48, 52, 12, 8)}">Relay</span><span style="${box(66, 26, 12, 8)}">Waypoint</span><span style="${box(34, 70, 10, 8)}">Ruins</span><i style="${box(49, 48, 2, 3.5)}"></i></div><div class="wf" data-kind="label" data-zoom style="${box(6, 86, 14, 6)}">Zoom 1.0x</div>`;
    case "typewriter":
      return `<div class="wf wf-line" data-kind="panel" style="${box(22, 62, 70, 22)}"><span></span><span class="wf-ghost">${esc(element.line)}</span></div>`;
    case "rank":
      return `<div class="wf wf-rows" data-kind="panel" style="${box(6, 18, 88, 64)}">${element.rows.map((row, i) => `<div class="wf-row"><span>${i + 1}</span><span>${esc(row)}</span></div>`).join("")}</div>`;
    case "coach":
      return `<div class="wf-pointer" aria-hidden="true">Tap here</div>`;
    default:
      return "";
  }
}

function viewportHtml(element) {
  let controlIndex = 0;
  const regions = element.regions
    .filter((r) => !(element.demo === "pan" && r.label.startsWith("Zoom")))
    .map((r, i) => region(r, i, r.kind === "control" ? controlIndex++ : -1))
    .join("");
  const [title, text] = element.modalText ?? ["Quit to title?", "Unsaved progress since the last checkpoint is lost."];
  const actions = element.modalActions ?? ["Cancel", "Confirm"];
  return `<div class="viewport" tabindex="0" role="application" aria-roledescription="wireframe" aria-label="${esc(element.label)} wireframe. Arrow keys move focus, Enter activates, Escape cancels." data-state="${element.states[0]}">
  <div class="safe-area" aria-hidden="true"></div>
  ${specials(element)}
  ${regions}
  <div class="wf-banner" data-for="loading">Loading</div>
  <div class="wf-banner" data-for="empty">Nothing here yet</div>
  <div class="wf-banner" data-for="error">Could not load. Retry</div>
  <div class="wf-banner" data-for="offline">Offline. Some content is unavailable</div>
  <div class="wf-overlay"><div class="wf-backdrop"></div><div class="wf-modal" role="dialog" aria-label="${esc(title)}"><strong>${esc(title)}</strong><span>${esc(text)}</span><div class="wf-modal-actions">${actions.map((a, i) => `<span role="button" id="wf-m-${i}">${esc(a)}</span>`).join("")}</div></div></div>
  <div class="focus-frame" aria-hidden="true"></div>
</div>`;
}

function miniWire(element) {
  return `<div class="mini-wire" aria-hidden="true">${element.regions.map((r) => `<span style="left:${r.box[0]}%;top:${r.box[1]}%;width:${r.box[2]}%;height:${r.box[3]}%"></span>`).join("")}</div>`;
}

const easeOptions = ["linear", "inQuad", "outQuad", "inOutQuad", "outCubic", "inOutCubic", "outQuart", "outBack"];

function elementPage(element) {
  const g = element.guide;
  const sampleLinks = element.unity.map((file) => `<li><a href="${repoBlob}game-ui/unity/samples/ugui/${file === "GameUIRootBuilder.cs" ? "Editor" : "Runtime"}/${file}" rel="noopener"><code>${esc(file)}</code></a></li>`).join("");
  const body = `<p class="crumbs"><a href="/">Overview</a> / ${esc(classLabels[element.map.primary] ?? element.map.primary)}</p>
<header class="element-head">
  <h1 class="display">${esc(element.label)}</h1>
  <p class="lead">${esc(g.question)}</p>
  <p class="meta">Primary class <code>${esc(element.map.primary)}</code>. Layer: ${esc(element.map.layer)}.</p>
</header>
<section class="workbench" aria-label="Wireframe and tween demo">
  <div class="workbench-grid">
    <div class="stage">
      <div class="device">${viewportHtml(element)}</div>
      <p class="keys">Click the wireframe, then use <kbd>Arrow</kbd> keys to move focus, <kbd>Enter</kbd> to activate, <kbd>Esc</kbd> to cancel.</p>
      <div class="field"><span class="field-label" id="state-label">Screen state</span>
        <div class="pill-group" role="radiogroup" aria-labelledby="state-label">${element.states.map((s, i) => `<button type="button" class="pill" role="radio" aria-checked="${i === 0}" data-state-option="${s}">${esc(stateLabels[s] ?? s)}</button>`).join("")}</div>
      </div>
    </div>
    <aside class="panel inspector" aria-labelledby="inspector-title">
      <h2 id="inspector-title">Tween inspector</h2>
      <p class="meta" id="demo-label">${esc(demoLabels[element.demo])}</p>
      <div class="field"><label for="ease">Ease</label><select id="ease">${easeOptions.map((e) => `<option value="${e}">${e}</option>`).join("")}</select></div>
      <canvas class="curve" id="curve" width="560" height="192" aria-label="Easing curve with the current progress marker" role="img"></canvas>
      <div class="field"><label for="duration">Duration (s)</label><input id="duration" type="number" min="0" max="10" step="0.05" inputmode="decimal"></div>
      <dl class="readout">
        <div><dt>Value</dt><dd id="readout-value">0.000</dd></div>
        <div><dt>Target</dt><dd id="readout-target">0.000</dd></div>
        <div><dt>Status</dt><dd id="readout-status">idle</dd></div>
        <div><dt>Elapsed</dt><dd id="readout-elapsed">0.000 s</dd></div>
      </dl>
      <div class="btn-row">
        <button type="button" class="btn btn-primary" data-act="play">Play</button>
        <button type="button" class="btn" data-act="interrupt">Interrupt</button>
        <button type="button" class="btn" data-act="complete">Complete</button>
        <button type="button" class="btn" data-act="kill">Kill</button>
      </div>
      <label class="toggle"><input type="checkbox" id="reduced"> Reduced motion</label>
      <p class="meta">Interrupt retargets from the current value, never jumping back. Complete snaps to the end and fires once. Kill stops without a callback. Same contract as <code>UITween.cs</code>.</p>
      <p class="sr-only" aria-live="polite" id="live"></p>
    </aside>
  </div>
</section>
<section class="guide-grid" aria-label="Pattern guidance">
  <div class="panel"><h3>Jobs</h3><p>${esc(g.jobs)}</p></div>
  <div class="panel"><h3>Required states</h3><p>${esc(g.states)}</p></div>
  <div class="panel"><h3>Input and focus</h3><p>${esc(g.input)}</p></div>
  <div class="panel"><h3>Failure modes</h3><p>${esc(g.failures)}</p></div>
  <div class="panel"><h3>Unity uGUI samples</h3><ul>${sampleLinks}</ul><p class="meta">Guide: <a href="${docHref("game-ui/unity/ugui-implementation.md")}">Unity uGUI implementation</a></p></div>
</section>
<script type="application/json" id="element-spec">${JSON.stringify({ slug: element.slug, demo: element.demo, cancel: element.cancel, tabs: element.tabs, carousel: element.carousel, line: element.line, autoOpen: element.autoOpen ?? false }).replace(/</g, "\\u003c")}</script>`;
  return page({ title: element.label, description: `${element.label} game UI pattern: wireframe, states, tween demo, and Unity uGUI samples.`, current: `element:${element.slug}`, body, scripts: ["/assets/element.js"] });
}

function homePage() {
  const groups = [...byClass.entries()]
    .map(([cls, list]) => `<h2>${esc(classLabels[cls] ?? cls)}</h2><ul class="element-grid">${list
      .map((e) => `<li><a class="element-card" href="/elements/${e.slug}/">${miniWire(e)}<h3>${esc(e.label)}</h3><p class="meta">${esc(e.guide.question)}</p></a></li>`)
      .join("")}</ul>`)
    .join("");
  const body = `<section class="hero">
  <h1 class="display">Game UI patterns you can see move.</h1>
  <p class="lead">Wireframes, states, and interruptible tweens for 21 game interface elements, mapped to Unity uGUI samples.</p>
  <div class="btn-row"><a class="btn btn-primary" href="/genres/">Compare genres</a><a class="btn" href="/platforms/">Choose an input target</a><a class="btn" href="/elements/in-game/">Open the HUD demo</a></div>
</section>
${groups}`;
  return page({ title: "Overview", description: "Game UI element patterns with wireframes, tween demos, and Unity uGUI samples.", current: "home", body });
}

function proposalFrame(regions, label) {
  const needsLegend = (r) => r.kind === "bar" || r.h < 9 || r.w < 15;
  const boxes = regions.map((r) => `<div class="genre-region" data-kind="${esc(r.kind)}" aria-label="${esc(r.label)}" style="left:${r.x}%;top:${r.y}%;width:${r.w}%;height:${r.h}%">${needsLegend(r) ? "" : esc(r.label)}</div>`).join("");
  const legend = regions.filter(needsLegend);
  return `<div class="device"><div class="viewport genre-viewport" role="img" aria-label="Proposed ${esc(label)} layout"><div class="safe-area" aria-hidden="true"></div>${boxes}</div></div>${legend.length ? `<p class="genre-legend"><strong>Small regions:</strong> ${legend.map((r) => esc(r.label)).join(" · ")}</p>` : ""}`;
}

function briefList(dir, wireframes) {
  return Object.entries(wireframes).map(([slug, regions]) => {
    const file = `game-ui/${dir}/${slug}.md`;
    if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing brief: ${file}`);
    return { slug, file, title: docTitle(file), regions };
  });
}

function briefIndex(dir, wireframes, title, summary) {
  const cards = briefList(dir, wireframes).map(({ slug, title: name, regions }) => `<li><a class="element-card" href="/${dir}/${slug}/">${proposalFrame(regions, name)}<h2>${esc(name)}</h2><span class="meta">Read observations and inspect a proposed layout</span></a></li>`).join("");
  return page({ title, description: summary, current: dir, body: `<h1 class="display">${esc(title)}</h1><p class="lead">${esc(summary)}</p><ul class="element-grid genre-grid">${cards}</ul>` });
}

function briefPage(dir, slug, wireframes) {
  const file = `game-ui/${dir}/${slug}.md`;
  const title = docTitle(file);
  const regions = wireframes[slug];
  const source = read(file);
  const content = markdown(source.replace(/^---\n[\s\S]*?\n---\n\s*# [^\n]+\n/, ""), file);
  const proposal = dir === "genres" ? "The regions below are a locally designed hypothesis. The cited stills establish only what appears in those samples, not input or motion behavior." : "This is an input and viewing target, not a claim that the cited games are exclusive to one store or device.";
  const body = `<p class="crumbs"><a href="/${dir}/">${dir === "genres" ? "Genres" : "Input targets"}</a> / ${esc(title)}</p><h1 class="display">${esc(title)}</h1><p class="lead">${esc(proposal)}</p><div class="genre-stage">${proposalFrame(regions, title)}</div><article class="prose">${content}</article>`;
  return page({ title, description: `${title}: bounded observations and a proposed layout.`, current: dir, body });
}

function pcStrategyPage(slug, spec) {
  const controls = spec.states.map((state) => `<button type="button" data-strategy-state="${esc(state.id)}" aria-pressed="false">${esc(state.label)}</button>`).join("");
  const sources = spec.sources.map(([label, url]) => `<li><a href="${esc(url)}" rel="noopener">${esc(label)}</a></li>`).join("");
  const body = `<p class="crumbs"><a href="/strategy/">PC strategy</a> / ${esc(spec.title)}</p>
<h1 class="display">${esc(spec.title)}</h1>
<p class="lead">${esc(spec.intro)}</p>
<p class="meta">Original wireframes. These task and state examples are not screenshots or replicas of shipped game UI.</p>
<div class="strategy-workbench">
  <aside class="panel strategy-state-rail" aria-label="Example states"><h2>Example states</h2><div role="group" aria-label="Select state">${controls}</div></aside>
  <section class="strategy-main" aria-label="PC-first strategy wireframe">
    <div class="device"><div class="viewport strategy-frame" id="strategy-frame" aria-label="Strategy state wireframe"></div></div>
    <div class="panel strategy-detail"><p class="mono" id="strategy-context"></p><h2 id="strategy-state-heading"></h2><p id="strategy-state-description"></p><div class="btn-row" id="strategy-actions"></div><span class="sr-only" aria-live="polite" id="strategy-announcement"></span></div>
  </section>
</div>
<section class="prose"><h2>Evidence boundary</h2><p>Official publisher descriptions establish subject matter and game modes, not these panel coordinates, control behavior, error states, or timing. Those are locally authored design examples for PC mouse and keyboard review.</p><ul>${sources}</ul><p><a href="${docHref(`game-ui/strategy/${slug}.md`)}">Read the state-by-state brief</a></p></section>
<script type="application/json" id="pc-strategy-spec">${JSON.stringify({ ...spec, slug }).replace(/</g, "\\u003c")}</script>`;
  return page({ title: `${spec.title} PC UI states`, description: spec.intro, current: "strategy", body, scripts: ["/assets/pc-strategy.js"] });
}

function pcStrategyIndex() {
  const cards = Object.entries(strategyGames).map(([slug, spec]) => `<li><a class="element-card" href="/strategy/${slug}/"><h2>${esc(spec.title)}</h2><span class="meta">${esc(spec.short)}</span><span>${spec.states.length} proposed states · PC-first</span></a></li>`).join("");
  const body = `<h1 class="display">PC strategy state studies</h1><p class="lead">Compare character-and-realm decisions with a separate campaign-and-battle command model. Every frame is an original wireframe, not an asset or pixel copy.</p><ul class="element-grid genre-grid">${cards}</ul><p><a href="${docHref("game-ui/strategy/index.md")}">Read the family comparison</a></p>`;
  return page({ title: "PC strategy studies", description: "CK3 and Total War WARHAMMER III interactive PC strategy wireframes", current: "strategy", body });
}

function showcasePage() {
  const body = `<h1 class="display">Primitives</h1>
<p class="lead">Every reusable primitive from DESIGN.md in its states, used to verify the system before product pages.</p>
<div class="showcase-grid">
  <div class="panel"><h3>Buttons</h3><div class="btn-row"><button class="btn btn-primary" type="button">Primary</button><button class="btn" type="button">Secondary</button><button class="btn btn-ghost" type="button">Ghost</button><button class="btn" type="button" disabled>Disabled</button></div></div>
  <div class="panel"><h3>Pills and tags</h3><div class="pill-group"><button class="pill" type="button" aria-pressed="false">Filter</button><button class="pill" type="button" aria-pressed="true">Selected filter</button><span class="tag">Tag</span><span class="tag">Main menu</span></div></div>
  <div class="panel"><h3>Nav items</h3><ul class="source-list"><li><a class="nav-item" href="#">Default</a></li><li><a class="nav-item" href="#" aria-current="page">Current page</a></li></ul></div>
  <div class="panel"><h3>Inputs</h3><div class="field"><label for="s-in">Duration (s)</label><input id="s-in" type="number" value="0.35"></div><input class="search" type="search" placeholder="Search field" aria-label="Search field example"></div>
  <div class="panel"><h3>Capture card</h3><ul class="result-grid"><li class="capture-card"><h3>Ability wheel</h3><p class="meta">Reference title</p><div class="pill-group"><span class="tag">In game</span></div><a href="#">Open reference</a></li></ul></div>
  <div class="panel"><h3>Empty state</h3><div class="empty-state">No items match these filters.</div></div>
</div>`;
  return page({ title: "Primitives", description: "Design system primitives and states.", current: "showcase", body });
}

function docsIndexPage() {
  const groups = new Map();
  for (const doc of docPaths) {
    const dir = path.posix.dirname(doc);
    if (!groups.has(dir)) groups.set(dir, []);
    groups.get(dir).push(doc);
  }
  const body = `<h1 class="display">Game UI documents</h1><p class="lead">The governed Markdown corpus of the Game UI domain, rendered for reading.</p>${[...groups.entries()]
    .map(([dir, docs]) => `<h2>${esc(dir)}</h2><ul class="source-list">${docs.map((d) => `<li><a href="${docHref(d)}">${esc(docTitle(d))}</a> <span class="meta">${esc(d)}</span></li>`).join("")}</ul>`)
    .join("")}`;
  return page({ title: "Documents", description: "Game UI domain documents.", current: "docs", body });
}

function docPage(repoPath) {
  const body = `<p class="crumbs"><a href="/docs/">Documents</a> / ${esc(repoPath)}</p><article class="prose">${markdown(read(repoPath), repoPath)}</article><p class="meta"><a href="${repoBlob}${repoPath}" rel="noopener">View source on GitHub</a></p>`;
  return page({ title: docTitle(repoPath), description: `Game UI document ${repoPath}.`, current: `doc:${repoPath}`, body });
}

function notFoundPage() {
  return page({ title: "Not found", description: "Page not found.", current: "", body: `<h1 class="display">This screen does not exist.</h1><p class="lead">The link may be old. Start from the overview.</p><div class="btn-row"><a class="btn btn-primary" href="/">Overview</a><a class="btn" href="/docs/">Documents</a></div>` });
}

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
fs.cpSync(path.join(root, "gallery-site/assets"), path.join(out, "assets"), { recursive: true });
write("index.html", homePage());
for (const element of elements) write(`elements/${element.slug}/index.html`, elementPage(element));
write("genres/index.html", briefIndex("genres", genreWireframes, "Genre UI patterns", "Genre tags overlap. Compare the observed screens, then test a layout proposal for your game's actual task."));
for (const slug of Object.keys(genreWireframes)) write(`genres/${slug}/index.html`, briefPage("genres", slug, genreWireframes));
write("platforms/index.html", briefIndex("platforms", inputTargetWireframes, "Input and screen targets", "Adapt each genre to mouse and keyboard, controller and TV, handheld, or touch; these are viewing contexts, not store exclusivity."));
for (const slug of Object.keys(inputTargetWireframes)) write(`platforms/${slug}/index.html`, briefPage("platforms", slug, inputTargetWireframes));
write("strategy/index.html", pcStrategyIndex());
for (const [slug, spec] of Object.entries(strategyGames)) write(`strategy/${slug}/index.html`, pcStrategyPage(slug, spec));
write("showcase/index.html", showcasePage());
write("docs/index.html", docsIndexPage());
for (const doc of docPaths) write(docHref(doc).slice(1), docPage(doc));
write("404.html", notFoundPage());
process.stdout.write(`${JSON.stringify({ out: path.relative(root, out), elements: elements.length, docs: docPaths.length })}\n`);
