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
  const hubPath = path.join(root, "game-ui", "unity", "index.md");
  const repositoryMapPath = path.join(root, "game-ui", "unity", "repository-map.md");
  const wikiPath = path.join(root, "game-ui", "unity", "org-wiki.md");
  const inventory = JSON.parse(await readFile(inventoryPath, "utf8"));
  const hub = await readFile(hubPath, "utf8");
  const repositoryMap = await readFile(repositoryMapPath, "utf8");
  const wiki = await readFile(wikiPath, "utf8");
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "unity-org-wiki-validator-"));

  try {
    await writeFile(path.join(tempRoot, "inventory.json"), JSON.stringify(inventory));
    await writeFile(path.join(tempRoot, "wiki.md"), wiki);
    const fixtures = [
      ["wrong count", inventory.slice(1), hub, repositoryMap, wiki, "expected 804 repositories"],
      ["duplicate repository", [...inventory.slice(0, -1), inventory[0]], hub, repositoryMap, wiki, "duplicate repository identity"],
      ["NGUI inside org", [...inventory.slice(0, -1), { ...inventory.at(-1), id: 999999999, full_name: "tasharen/ngui", html_url: "https://github.com/tasharen/ngui" }], hub, repositoryMap, wiki, "NGUI must remain external"],
      ["invalid cluster", [{ ...inventory[0], primary_cluster: "unverified" }, ...inventory.slice(1)], hub, repositoryMap, wiki, "invalid primary_cluster"],
      ["absolute path", inventory, hub, repositoryMap, `${wiki}\n/Users/example/private\n`, "absolute home path"],
      ["wiki data drift", inventory, hub, repositoryMap, wiki.replaceAll("**804**", "**803**"), "wiki must state the 804-row boundary"],
      ["hub bypass", inventory, hub.replace("repository-map.md#concentrated-ui-signals", "org-wiki.md"), repositoryMap, wiki, "hub bypasses the concentrated repository route"],
      ["missing primary signal", inventory, hub, repositoryMap.replace("/BagelGame)", "/BagelGame-missing)"), wiki, "repository map missing concentrated signal"],
      ["missing cluster deep dive", inventory, hub, repositoryMap, wiki.replace("### platform-mobile", "### platform-mobile-missing"), "wiki missing cluster deep dive"],
      ["cluster lead overflow", inventory, hub, repositoryMap, wiki.replace("Return to [Unity UI Systems](ui-systems.md) to classify", "| [ExtraOne](https://github.com/Unity-Technologies/ExtraOne) | fixture |\n| [ExtraTwo](https://github.com/Unity-Technologies/ExtraTwo) | fixture |\nReturn to [Unity UI Systems](ui-systems.md) to classify"), "cluster lead count out of bounds"],
      ["primary pin drift", inventory, hub, repositoryMap.replaceAll("5d0348bfa013f3c76299dd582c90a7549f66abce", "0000000000000000000000000000000000000000"), wiki, "primary source pin drift"],
    ];

    for (const [name, candidateInventory, candidateHub, candidateRepositoryMap, candidateWiki, expected] of fixtures) {
      await writeFile(path.join(tempRoot, "inventory.json"), JSON.stringify(candidateInventory));
      await writeFile(path.join(tempRoot, "hub.md"), candidateHub);
      await writeFile(path.join(tempRoot, "repository-map.md"), candidateRepositoryMap);
      await writeFile(path.join(tempRoot, "wiki.md"), candidateWiki);
      const result = spawnSync(process.execPath, [validator, "--json", "--hub", path.join(tempRoot, "hub.md"), "--inventory", path.join(tempRoot, "inventory.json"), "--repository-map", path.join(tempRoot, "repository-map.md"), "--wiki", path.join(tempRoot, "wiki.md")], { cwd: root, encoding: "utf8" });
      assert.notEqual(result.status, 0, `${name} fixture unexpectedly passed`);
      assert.match(`${result.stdout}${result.stderr}`, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${name} fixture failed for the wrong reason`);
    }

    const result = run(root);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    console.log("Unity org wiki validator fixtures passed: 11 negative, 1 positive.");
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

await main();
