const PAGE_SIZE = 48;
const facetLabels = { element: "Element", genre: "Genre", theme: "Theme", platform: "Platform" };

const els = {
  q: document.getElementById("q"),
  filters: document.getElementById("filters"),
  count: document.getElementById("count"),
  results: document.getElementById("results"),
  prev: document.getElementById("prev"),
  next: document.getElementById("next"),
  page: document.getElementById("page"),
};

const params = new URLSearchParams(location.search);
const state = {
  q: params.get("q") ?? "",
  page: Number(params.get("page") ?? 1),
  selected: Object.fromEntries(Object.keys(facetLabels).map((facet) => [facet, new Set((params.get(facet) ?? "").split(",").filter(Boolean))])),
};

const text = (tag, className, value) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  node.textContent = value;
  return node;
};

function syncUrl() {
  const next = new URLSearchParams();
  if (state.q) next.set("q", state.q);
  for (const [facet, values] of Object.entries(state.selected)) if (values.size) next.set(facet, [...values].join(","));
  if (state.page > 1) next.set("page", String(state.page));
  history.replaceState(null, "", `${location.pathname}${next.toString() ? `?${next}` : ""}`);
}

function renderFilters(data) {
  els.filters.replaceChildren();
  for (const [facet, entries] of Object.entries(data.facets)) {
    const group = document.createElement("div");
    group.className = "pill-group";
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", facetLabels[facet]);
    group.append(text("span", "field-label", facetLabels[facet]));
    for (const [key, label] of entries) {
      const pill = text("button", "pill", label);
      pill.type = "button";
      pill.setAttribute("aria-pressed", String(state.selected[facet].has(key)));
      pill.addEventListener("click", () => {
        const set = state.selected[facet];
        if (set.has(key)) set.delete(key);
        else set.add(key);
        pill.setAttribute("aria-pressed", String(set.has(key)));
        state.page = 1;
        update(data);
      });
      group.append(pill);
    }
    els.filters.append(group);
  }
}

function matches(data, capture) {
  const [gameIndex, title, , elementIdx] = capture;
  const game = data.games[gameIndex];
  const [gameTitle, , , genres, themes, platforms] = game;
  const q = state.q.trim().toLowerCase();
  if (q && !title.toLowerCase().includes(q) && !gameTitle.toLowerCase().includes(q)) return false;
  const { element, genre, theme, platform } = state.selected;
  if (element.size && !elementIdx.some((i) => element.has(data.facets.element[i]?.[0]))) return false;
  if (genre.size && !genres.some((g) => genre.has(g))) return false;
  if (theme.size && !themes.some((t) => theme.has(t))) return false;
  if (platform.size && !platforms.some((p) => platform.has(p))) return false;
  return true;
}

function card(data, capture) {
  const [gameIndex, title, url, elementIdx, isVideo] = capture;
  const [gameTitle, , year, genres] = data.games[gameIndex];
  const genreLabels = new Map(data.facets.genre);
  const li = document.createElement("li");
  li.className = "capture-card";
  li.append(text("h3", "", title));
  li.append(text("p", "meta", `${gameTitle}${year ? `, ${year}` : ""}`));
  const tags = document.createElement("div");
  tags.className = "pill-group";
  for (const i of elementIdx) tags.append(text("span", "tag", data.facets.element[i]?.[1] ?? "Untagged"));
  if (isVideo) tags.append(text("span", "tag", "Video"));
  li.append(tags);
  if (genres.length) li.append(text("p", "meta", genres.map((g) => genreLabels.get(g) ?? g).join(", ")));
  const link = text("a", "", "Open source capture");
  link.href = url;
  link.rel = "noopener";
  link.target = "_blank";
  li.append(link);
  return li;
}

function update(data) {
  const filtered = data.captures.filter((capture) => matches(data, capture));
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  state.page = Math.min(Math.max(1, state.page), pages);
  const slice = filtered.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);
  els.results.replaceChildren(...slice.map((capture) => card(data, capture)));
  if (!filtered.length) {
    const empty = text("li", "empty-state", "No captures match these filters. Clear a filter or search for a game title.");
    els.results.append(empty);
  }
  els.count.textContent = `${filtered.length.toLocaleString("en-US")} of ${data.captures.length.toLocaleString("en-US")} captures`;
  els.page.textContent = `Page ${state.page} of ${pages}`;
  els.prev.disabled = state.page <= 1;
  els.next.disabled = state.page >= pages;
  syncUrl();
}

async function init() {
  let data;
  try {
    const response = await fetch("/catalog/data.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    data = await response.json();
  } catch (error) {
    els.count.textContent = `The catalog could not load (${error.message}). Reload to retry.`;
    return;
  }
  els.q.value = state.q;
  renderFilters(data);
  let timer = 0;
  els.q.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      state.q = els.q.value;
      state.page = 1;
      update(data);
    }, 120);
  });
  els.prev.addEventListener("click", () => {
    state.page -= 1;
    update(data);
    els.results.scrollIntoView({ block: "start" });
  });
  els.next.addEventListener("click", () => {
    state.page += 1;
    update(data);
    els.results.scrollIntoView({ block: "start" });
  });
  update(data);
}

init();
