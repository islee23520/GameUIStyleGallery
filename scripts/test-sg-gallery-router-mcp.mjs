#!/usr/bin/env node

import assert from "node:assert/strict";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";

import { createGalleryRouterServer } from "./sg-gallery-router-mcp.mjs";

const server = createGalleryRouterServer();
const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
const client = new Client({ name: "gallery-router-test", version: "1.0.0" });
try {
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  assert.deepEqual((await client.listTools()).tools.map(tool => tool.name), ["gallery-route"]);

  async function route(area, query) {
    const response = await client.callTool({ name: "gallery-route", arguments: { area, query } });
    assert.notEqual(response.isError, true);
    return JSON.parse(response.content[0].text);
  }
  const game = await route("game-ui", "game interface");
  assert.equal(game.entry, "game-ui/index.md");
  assert.equal(game.external_reference, "https://interfaceingame.com/");
  assert.equal(game.live_lookup_required, true);
  assert.ok(game.matches.length > 0);
  assert.ok(game.matches.every(match => match.domain === "game-ui"));

  const frontend = await route("frontend", "responsive layout");
  assert.equal(frontend.entry, "design-engineering/index.md");
  assert.equal(frontend.external_reference, undefined);
  assert.ok(frontend.matches.length > 0);
  assert.ok(frontend.matches.every(match => ["layout", "design-engineering", "motion", "platform-guides"].includes(match.domain)));

  const empty = await route("game-ui", "zzzzzqqqqq9999");
  assert.deepEqual(empty.matches, []);
  const invalid = await client.callTool({ name: "gallery-route", arguments: { area: "unrelated", query: "layout" } });
  assert.equal(invalid.isError, true);
  console.log("gallery router MCP: game UI, frontend, empty, and invalid routes passed");
} finally {
  await Promise.all([client.close(), server.close()]);
}
