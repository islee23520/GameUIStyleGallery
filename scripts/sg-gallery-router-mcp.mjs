#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const gameRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const webRoot = resolve(process.env.UI_STYLE_GALLERY_ROOT ?? resolve(gameRoot, "../uiStyleGallery"));

async function openCorpus(root) {
  const registryModule = resolve(root, "scripts/agent-native/v2/material-operation-registry.mjs");
  if (!existsSync(registryModule)) throw new Error(`StyleGallery corpus not found at ${root}`);
  const { createMaterialOperationRegistry } = await import(pathToFileURL(registryModule).href);
  const manifest = JSON.parse(readFileSync(resolve(root, "consumer-reference/agent-native/v2/material-registry.json"), "utf8"));
  return { root, registry: createMaterialOperationRegistry({ repositoryRoot: root }), byRef: new Map(manifest.materials.map((item) => [item.stable_ref, item])) };
}

const routes = {
  "game-ui": {
    root: gameRoot,
    domains: new Set(["game-ui"]),
    entry: "game-ui/index.md",
    reference: "https://interfaceingame.com/",
  },
  frontend: {
    root: webRoot,
    domains: new Set(["layout", "design-engineering", "motion", "platform-guides", "design-terminology", "expression"]),
    entry: "design-engineering/index.md",
  },
};

const corpora = new Map();
async function corpusFor(root) {
  if (!corpora.has(root)) corpora.set(root, await openCorpus(root));
  return corpora.get(root);
}

export async function routeGallery({ area, query, limit = 8 }) {
  const route = routes[area];
  const corpus = await corpusFor(route.root);
  const found = corpus.registry.invoke("material-search", { query, limit: 100 });
  if (!found.ok) return found;
  const matches = found.result.results
    .map((item) => ({ item, source: corpus.byRef.get(item.source.stable_ref) }))
    .filter(({ source }) => source && route.domains.has(source.domain))
    .slice(0, limit)
    .map(({ item, source }) => ({ path: source.repository_path, domain: source.domain, title: item.title, reference: item.source.stable_ref }));
  return {
    ok: true,
    area,
    repository_root: corpus.root,
    entry: route.entry,
    query,
    matches,
    ...(route.reference ? { external_reference: route.reference, live_lookup_required: true } : {}),
  };
}

export function createGalleryRouterServer() {
  const server = new McpServer({ name: "StyleGallery Fork Router", version: "2.0.0" });
  server.registerTool("gallery-route", {
    description: "Route game UI questions to GameUIStyleGallery and frontend design questions to the sibling uiStyleGallery; game UI also requires a live Interface In Game lookup.",
    inputSchema: z.strictObject({ area: z.enum(["game-ui", "frontend"]), query: z.string().min(1), limit: z.number().int().min(1).max(20).default(8) }),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  }, async (input) => {
    const result = await routeGallery(input);
    return { content: [{ type: "text", text: JSON.stringify(result) }], ...(result.ok ? {} : { isError: true }) };
  });
  return server;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = createGalleryRouterServer();
  await server.connect(new StdioServerTransport());
}
