#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { createMaterialOperationRegistry } from "./agent-native/v2/material-operation-registry.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(resolve(root, "consumer-reference/agent-native/v2/material-registry.json"), "utf8"));
const registry = createMaterialOperationRegistry({ repositoryRoot: root });
const routes = {
  "game-ui": { domains: new Set(["game-ui"]), entry: "game-ui/index.md", reference: "https://interfaceingame.com/" },
  frontend: { domains: new Set(["layout", "design-engineering", "motion", "platform-guides"]), entry: "design-engineering/index.md" },
};

export function routeGallery({ area, query, limit = 8 }) {
  const route = routes[area];
  const found = registry.invoke("material-search", { query, limit: 100 });
  if (!found.ok) return found;
  const byRef = new Map(manifest.materials.map(item => [item.stable_ref, item]));
  const matches = found.result.results
    .map(item => ({ item, source: byRef.get(item.source.stable_ref) }))
    .filter(({ source }) => source && route.domains.has(source.domain))
    .slice(0, limit)
    .map(({ item, source }) => ({ path: source.repository_path, domain: source.domain, title: item.title, reference: item.source.stable_ref }));
  return { ok: true, area, entry: route.entry, query, matches,
    ...(route.reference ? { external_reference: route.reference, live_lookup_required: true } : {}) };
}

export function createGalleryRouterServer() {
  const server = new McpServer({ name: "StyleGallery Fork Router", version: "1.0.0" });
  server.registerTool("gallery-route", {
    description: "Route game UI or frontend design questions to governed StyleGallery source paths; game UI also requires a live Interface In Game lookup.",
    inputSchema: z.strictObject({ area: z.enum(["game-ui", "frontend"]), query: z.string().min(1), limit: z.number().int().min(1).max(20).default(8) }),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  }, async (input) => {
    const result = routeGallery(input);
    return { content: [{ type: "text", text: JSON.stringify(result) }], ...(result.ok ? {} : { isError: true }) };
  });
  return server;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = createGalleryRouterServer();
  await server.connect(new StdioServerTransport());
}
