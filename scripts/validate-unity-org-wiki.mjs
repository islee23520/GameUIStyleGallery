import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const expectedCounts = new Map([
  ["meta-forks-mirrors", 356],
  ["meta-archived-historical", 32],
  ["game-ui-primary", 9],
  ["graphics-rendering", 38],
  ["ecs-dots", 22],
  ["networking", 21],
  ["xr-ar", 25],
  ["ml-ai", 23],
  ["robotics", 6],
  ["2d", 7],
  ["animation", 10],
  ["audio", 3],
  ["physics", 1],
  ["editor-tooling", 29],
  ["ci-infra", 2],
  ["language-runtime", 3],
  ["services-cloud", 3],
  ["platform-mobile", 9],
  ["samples-templates", 30],
  ["other-mixed-or-insufficient-metadata", 175],
]);

function parseArguments(arguments_) {
  const options = {
    inventory: path.join(root, "game-ui", "unity", "data", "unity-technologies-public-repositories.json"),
    wiki: path.join(root, "game-ui", "unity", "org-wiki.md"),
  };
  for (let index = 0; index < arguments_.length; index += 1) {
    const argument = arguments_[index];
    if (argument === "--json") continue;
    if (argument === "--inventory" || argument === "--wiki") {
      const value = arguments_[index + 1];
      if (!value) throw new Error(`${argument} requires a path`);
      options[argument.slice(2)] = path.resolve(value);
      index += 1;
      continue;
    }
    throw new Error(`unknown argument: ${argument}`);
  }
  return options;
}

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function validateInventory(inventory) {
  requireCondition(Array.isArray(inventory), "inventory must be a JSON array");
  requireCondition(inventory.length === 804, `expected 804 repositories, got ${inventory.length}`);
  const ids = new Set();
  const names = new Set();
  const counts = new Map([...expectedCounts.keys()].map((cluster) => [cluster, 0]));

  for (const repository of inventory) {
    requireCondition(repository && typeof repository === "object", "repository row must be an object");
    requireCondition(Number.isSafeInteger(repository.id), "repository id must be an integer");
    requireCondition(typeof repository.full_name === "string", "repository full_name must be a string");
    requireCondition(!ids.has(repository.id) && !names.has(repository.full_name), `duplicate repository identity: ${repository.full_name}`);
    requireCondition(repository.full_name !== "tasharen/ngui", "NGUI must remain external to the Unity-Technologies inventory");
    requireCondition(repository.full_name.startsWith("Unity-Technologies/"), `repository outside Unity-Technologies: ${repository.full_name}`);
    requireCondition(repository.html_url === `https://github.com/${repository.full_name}`, `repository URL mismatch: ${repository.full_name}`);
    requireCondition(repository.capture_timestamp === "2026-07-14T12:59:16Z", `snapshot timestamp mismatch: ${repository.full_name}`);
    requireCondition(expectedCounts.has(repository.primary_cluster), `invalid primary_cluster: ${repository.primary_cluster}`);
    ids.add(repository.id);
    names.add(repository.full_name);
    counts.set(repository.primary_cluster, counts.get(repository.primary_cluster) + 1);
  }

  for (const [cluster, expected] of expectedCounts) {
    requireCondition(counts.get(cluster) === expected, `cluster count mismatch for ${cluster}: expected ${expected}, got ${counts.get(cluster)}`);
  }
  return Object.fromEntries(counts);
}

function validateWiki(wiki) {
  requireCondition(wiki.includes("**804**"), "wiki must state the 804-row boundary");
  requireCondition(wiki.includes("Independent research — not affiliated with or endorsed by Unity Technologies"), "wiki must state the non-affiliation boundary");
  requireCondition(wiki.includes("tasharen/ngui") && wiki.includes("outside the Unity-Technologies 804-repository inventory"), "wiki must keep NGUI external");
  requireCondition(wiki.includes("data/unity-technologies-public-repositories.json"), "wiki must link the tracked inventory");
  requireCondition(!wiki.includes(".omo/"), "tracked wiki must not depend on .omo research paths");
  requireCondition(!/(?:\/Users\/|\/home\/|[A-Za-z]:\\Users\\)/.test(wiki), "absolute home path found in wiki");
  for (const [cluster, count] of expectedCounts) {
    requireCondition(wiki.includes(`| \`${cluster}\` | ${count} |`), `wiki cluster table drift: ${cluster}`);
  }
}

async function main() {
  try {
    const options = parseArguments(process.argv.slice(2));
    const [inventoryText, wiki] = await Promise.all([
      readFile(options.inventory, "utf8"),
      readFile(options.wiki, "utf8"),
    ]);
    const counts = validateInventory(JSON.parse(inventoryText));
    validateWiki(wiki);
    console.log(JSON.stringify({ ok: true, repositories: 804, uniqueIds: 804, uniqueNames: 804, clusterTotal: Object.values(counts).reduce((sum, value) => sum + value, 0), counts }, null, 2));
  } catch (error) {
    console.error(JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) }));
    process.exitCode = 1;
  }
}

await main();
