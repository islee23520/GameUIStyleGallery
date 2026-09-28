#!/usr/bin/env node

import assert from "node:assert/strict";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";

import { createGalleryRouterServer } from "./sg-gallery-router-mcp.mjs";

const gameRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const webRoot = resolve(process.env.UI_STYLE_GALLERY_ROOT ?? resolve(gameRoot, "../uiStyleGallery"));
const server = createGalleryRouterServer();
const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
const client = new Client({ name: "gallery-router-test", version: "1.0.0" });
try {
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  assert.deepEqual((await client.listTools()).tools.map((tool) => tool.name), ["gallery-route"]);

  async function route(area, query) {
    const response = await client.callTool({ name: "gallery-route", arguments: { area, query } });
    assert.notEqual(response.isError, true, response.content?.[0]?.text);
    return JSON.parse(response.content[0].text);
  }

  const game = await route("game-ui", "inventory element patterns");
  assert.equal(game.repository_root, gameRoot);
  assert.equal(game.entry, "game-ui/index.md");
  assert.equal(game.external_reference, "https://interfaceingame.com/");
  assert.ok(game.matches.length > 0);
  assert.ok(game.matches.every((match) => match.domain === "game-ui"));

  const frontend = await route("frontend", "responsive layout");
  assert.equal(frontend.repository_root, webRoot);
  assert.notEqual(frontend.repository_root, gameRoot);
  assert.equal(frontend.external_reference, undefined);
  assert.ok(frontend.matches.length > 0);
  assert.ok(frontend.matches.every((match) => match.domain !== "game-ui"));

  assert.deepEqual((await route("game-ui", "zzzzzqqqqq9999")).matches, []);
  const invalid = await client.callTool({ name: "gallery-route", arguments: { area: "unrelated", query: "layout" } });
  assert.equal(invalid.isError, true);
  console.log(`gallery router MCP passed: game-ui -> ${gameRoot}, frontend -> ${webRoot}`);
} finally {
  await Promise.all([client.close(), server.close()]);
}
