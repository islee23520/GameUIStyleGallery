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
    hub: path.join(root, "game-ui", "unity", "index.md"),
    inventory: path.join(root, "game-ui", "unity", "data", "unity-technologies-public-repositories.json"),
    repositoryMap: path.join(root, "game-ui", "unity", "repository-map.md"),
    wiki: path.join(root, "game-ui", "unity", "org-wiki.md"),
  };
  for (let index = 0; index < arguments_.length; index += 1) {
    const argument = arguments_[index];
    if (argument === "--json") continue;
    if (argument === "--hub" || argument === "--inventory" || argument === "--repository-map" || argument === "--wiki") {
      const value = arguments_[index + 1];
      if (!value) throw new Error(`${argument} requires a path`);
      options[argument.slice(2).replace("-map", "Map")] = path.resolve(value);
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

function validateSignalConcentration(inventory, repositoryMap) {
  const relevanceClasses = ["primary-ui-source", "ui-adjacent-reference"];
  for (const relevance of relevanceClasses) {
    const repositories = inventory.filter((repository) => repository.ui_relevance === relevance);
    const expected = relevance === "primary-ui-source" ? 8 : 5;
    requireCondition(repositories.length === expected, `${relevance} count mismatch: expected ${expected}, got ${repositories.length}`);
    for (const repository of repositories) {
      requireCondition(!repository.fork && !repository.archived, `default signal table contains fork/archive candidate: ${repository.full_name}`);
      requireCondition(repositoryMap.includes(`/${repository.name})`), `repository map missing concentrated signal: ${repository.full_name}`);
    }
  }
  requireCondition(repositoryMap.includes("## Concentrated UI Signals"), "repository map missing concentrated UI signal section");
  requireCondition(repositoryMap.includes("### Primary UI Sources"), "repository map missing primary UI source table");
  requireCondition(repositoryMap.includes("### UI-Adjacent References"), "repository map missing UI-adjacent table");
  requireCondition((repositoryMap.match(/\[UI Systems\]\(ui-systems\.md\) → \[Architecture\]\(architecture\.md\)/g) || []).length >= 13, "each concentrated signal must return through systems and architecture");
  const pinSection = repositoryMap.match(/## Selective Evidence Pins\n([\s\S]*?)(?=\n## |$)/);
  requireCondition(pinSection, "repository map missing selective evidence pins");
  for (const repository of inventory.filter((candidate) => candidate.ui_relevance === "primary-ui-source")) {
    requireCondition(typeof repository.head_sha === "string" && /^[0-9a-f]{40}$/.test(repository.head_sha), `primary source missing captured HEAD: ${repository.full_name}`);
    requireCondition(pinSection[1].includes(`| ${repository.name} |`), `primary source missing pin row: ${repository.full_name}`);
    requireCondition(pinSection[1].includes(repository.head_sha), `primary source pin drift: ${repository.full_name}`);
  }
  requireCondition(pinSection[1].includes("At use time, verify") || repositoryMap.includes("At use time, verify"), "pin table missing verification-at-use contract");
}

function validateHub(hub) {
  requireCondition(hub.includes("## Question To Route Matrix"), "Unity hub missing question-to-route matrix");
  requireCondition(hub.includes("candidate ceiling"), "Unity hub must state bounded candidate ceilings");
  requireCondition(hub.includes("Stars, organization placement, archive state, and recent pushes never select the route"), "Unity hub must reject metadata popularity as authority");
  requireCondition(hub.includes("repository-map.md#concentrated-ui-signals"), "Unity hub bypasses the concentrated repository route");
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
  const deepDiveLimits = new Map([
    ["game-ui-primary", [3, 7]],
    ["platform-mobile", [3, 7]],
    ["editor-tooling", [3, 7]],
    ["graphics-rendering", [3, 7]],
    ["xr-ar", [3, 7]],
  ]);
  requireCondition(wiki.includes("## Bounded Cluster Deep Dives"), "wiki missing bounded cluster deep dives");
  for (const [cluster, [minimum, maximum]] of deepDiveLimits) {
    const match = wiki.match(new RegExp(`### ${cluster}\\n([\\s\\S]*?)(?=\\n### |\\n## |$)`));
    requireCondition(match, `wiki missing cluster deep dive: ${cluster}`);
    requireCondition(match[1].includes("Game UI use boundary"), `cluster deep dive missing use boundary: ${cluster}`);
    requireCondition(match[1].includes("Return to"), `cluster deep dive missing architecture return: ${cluster}`);
    const leadCount = (match[1].match(/^\| \[[^\]]+\]\(https:\/\/github\.com\/Unity-Technologies\//gm) || []).length;
    requireCondition(leadCount >= minimum && leadCount <= maximum, `cluster lead count out of bounds for ${cluster}: ${leadCount}`);
  }
  requireCondition(wiki.includes("### Residual, Fork, And Archive Noise"), "wiki missing residual/fork/archive noise guidance");
  requireCondition(wiki.includes("No per-repository prose pages are generated"), "wiki must prohibit residual encyclopedia expansion");
}

async function main() {
  try {
    const options = parseArguments(process.argv.slice(2));
    const [hub, inventoryText, repositoryMap, wiki] = await Promise.all([
      readFile(options.hub, "utf8"),
      readFile(options.inventory, "utf8"),
      readFile(options.repositoryMap, "utf8"),
      readFile(options.wiki, "utf8"),
    ]);
    const inventory = JSON.parse(inventoryText);
    const counts = validateInventory(inventory);
    validateHub(hub);
    validateSignalConcentration(inventory, repositoryMap);
    validateWiki(wiki);
    console.log(JSON.stringify({ ok: true, repositories: 804, uniqueIds: 804, uniqueNames: 804, clusterTotal: Object.values(counts).reduce((sum, value) => sum + value, 0), counts }, null, 2));
  } catch (error) {
    console.error(JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) }));
    process.exitCode = 1;
  }
}

await main();
