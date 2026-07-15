import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const validator = path.join(root, "scripts", "validate-unity-org-wiki.mjs");

function run(cwd) {
  return spawnSync(process.execPath, [validator, "--json"], { cwd, encoding: "utf8" });
}

async function main() {
  const inventoryPath = path.join(root, "game-ui", "unity", "data", "unity-technologies-public-repositories.json");
  const wikiPath = path.join(root, "game-ui", "unity", "org-wiki.md");
  const inventory = JSON.parse(await readFile(inventoryPath, "utf8"));
  const wiki = await readFile(wikiPath, "utf8");
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "unity-org-wiki-validator-"));

  try {
    await writeFile(path.join(tempRoot, "inventory.json"), JSON.stringify(inventory));
    await writeFile(path.join(tempRoot, "wiki.md"), wiki);
    const fixtures = [
      ["wrong count", inventory.slice(1), wiki, "expected 804 repositories"],
      ["duplicate repository", [...inventory.slice(0, -1), inventory[0]], wiki, "duplicate repository identity"],
      ["NGUI inside org", [...inventory.slice(0, -1), { ...inventory.at(-1), id: 999999999, full_name: "tasharen/ngui", html_url: "https://github.com/tasharen/ngui" }], wiki, "NGUI must remain external"],
      ["invalid cluster", [{ ...inventory[0], primary_cluster: "unverified" }, ...inventory.slice(1)], wiki, "invalid primary_cluster"],
      ["absolute path", inventory, `${wiki}\n/Users/example/private\n`, "absolute home path"],
      ["wiki data drift", inventory, wiki.replaceAll("**804**", "**803**"), "wiki must state the 804-row boundary"],
    ];

    for (const [name, candidateInventory, candidateWiki, expected] of fixtures) {
      await writeFile(path.join(tempRoot, "inventory.json"), JSON.stringify(candidateInventory));
      await writeFile(path.join(tempRoot, "wiki.md"), candidateWiki);
      const result = spawnSync(process.execPath, [validator, "--json", "--inventory", path.join(tempRoot, "inventory.json"), "--wiki", path.join(tempRoot, "wiki.md")], { cwd: root, encoding: "utf8" });
      assert.notEqual(result.status, 0, `${name} fixture unexpectedly passed`);
      assert.match(`${result.stdout}${result.stderr}`, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${name} fixture failed for the wrong reason`);
    }

    const result = run(root);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    console.log("Unity org wiki validator fixtures passed: 6 negative, 1 positive.");
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

await main();
