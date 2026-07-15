import { mkdtemp, readFile, rm, writeFile, mkdir } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const validator = path.join(root, "scripts", "validate-unity-org-terms.mjs");

function run(inventory, index, lexicon) {
  return spawnSync(process.execPath, [validator, "--inventory", inventory, "--index", index, "--lexicon", lexicon], {
    encoding: "utf8",
  });
}

async function writeFixture(base, { inventory, index, lexicon }) {
  const inventoryPath = path.join(base, "inventory.json");
  const indexPath = path.join(base, "index.json");
  const lexiconPath = path.join(base, "lexicon.md");
  await writeFile(inventoryPath, JSON.stringify(inventory));
  await writeFile(indexPath, JSON.stringify(index));
  await writeFile(lexiconPath, lexicon);
  return { inventoryPath, indexPath, lexiconPath };
}

function requireFail(result, needle) {
  if (result.status === 0) throw new Error(`expected failure for ${needle}`);
  if (!String(result.stderr || result.stdout).includes(needle)) {
    throw new Error(`expected stderr to include ${needle}, got: ${result.stderr || result.stdout}`);
  }
}

const trackedInventory = JSON.parse(
  await readFile(path.join(root, "game-ui/unity/data/unity-technologies-public-repositories.json"), "utf8"),
);
const trackedIndex = JSON.parse(await readFile(path.join(root, "game-ui/unity/data/unity-org-term-index.json"), "utf8"));
const trackedLexicon = await readFile(path.join(root, "game-ui/unity/org-term-lexicon.md"), "utf8");

const temp = await mkdtemp(path.join(os.tmpdir(), "unity-org-terms-"));
try {
  // Positive tracked surface
  const positive = spawnSync(
    process.execPath,
    [
      validator,
      "--inventory",
      path.join(root, "game-ui/unity/data/unity-technologies-public-repositories.json"),
      "--index",
      path.join(root, "game-ui/unity/data/unity-org-term-index.json"),
      "--lexicon",
      path.join(root, "game-ui/unity/org-term-lexicon.md"),
      "--json",
    ],
    { encoding: "utf8" },
  );
  if (positive.status !== 0) throw new Error(positive.stderr || positive.stdout);

  // Wrong repository count
  {
    const dir = path.join(temp, "count");
    await mkdir(dir, { recursive: true });
    const paths = await writeFixture(dir, {
      inventory: trackedInventory.slice(0, 10),
      index: trackedIndex,
      lexicon: trackedLexicon,
    });
    requireFail(run(paths.inventoryPath, paths.indexPath, paths.lexiconPath), "804");
  }

  // NGUI as example
  {
    const index = structuredClone(trackedIndex);
    index.terms[0].examples.push({
      full_name: "tasharen/ngui",
      html_url: "https://github.com/tasharen/ngui",
      primary_cluster: "game-ui-primary",
      ui_relevance: "primary-ui-source",
    });
    index.terms[0].match_count = Math.max(index.terms[0].match_count, index.terms[0].examples.length);
    index.terms[0].primary_cluster_histogram["game-ui-primary"] = index.terms[0].match_count;
    index.terms[0].ui_relevance_histogram["primary-ui-source"] = index.terms[0].match_count;
    const dir = path.join(temp, "ngui");
    await mkdir(dir, { recursive: true });
    const paths = await writeFixture(dir, { inventory: trackedInventory, index, lexicon: trackedLexicon });
    requireFail(run(paths.inventoryPath, paths.indexPath, paths.lexiconPath), "tasharen/ngui");
  }

  // Missing required term
  {
    const index = structuredClone(trackedIndex);
    index.terms = index.terms.filter((term) => term.term !== "UnityCsReference");
    const dir = path.join(temp, "missing-term");
    await mkdir(dir, { recursive: true });
    const paths = await writeFixture(dir, { inventory: trackedInventory, index, lexicon: trackedLexicon });
    requireFail(run(paths.inventoryPath, paths.indexPath, paths.lexiconPath), "UnityCsReference");
  }

  // Absolute path leak
  {
    const dir = path.join(temp, "abspath");
    await mkdir(dir, { recursive: true });
    const paths = await writeFixture(dir, {
      inventory: trackedInventory,
      index: trackedIndex,
      lexicon: trackedLexicon + "\nSee /Users/example/secret\n",
    });
    requireFail(run(paths.inventoryPath, paths.indexPath, paths.lexiconPath), "absolute home path");
  }

  // .omo dependency
  {
    const dir = path.join(temp, "omo");
    await mkdir(dir, { recursive: true });
    const paths = await writeFixture(dir, {
      inventory: trackedInventory,
      index: trackedIndex,
      lexicon: trackedLexicon.replace("Machine companion:", "See .omo/ulw-research/secret and Machine companion:"),
    });
    requireFail(run(paths.inventoryPath, paths.indexPath, paths.lexiconPath), ".omo");
  }

  // Machine histogram count drift
  {
    const index = structuredClone(trackedIndex);
    index.terms[0].primary_cluster_histogram["game-ui-primary"] += 1;
    const dir = path.join(temp, "histogram-drift");
    await mkdir(dir, { recursive: true });
    const paths = await writeFixture(dir, { inventory: trackedInventory, index, lexicon: trackedLexicon });
    requireFail(run(paths.inventoryPath, paths.indexPath, paths.lexiconPath), "histogram count drift");
  }

  // Human-readable term count drift
  {
    const dir = path.join(temp, "lexicon-count-drift");
    await mkdir(dir, { recursive: true });
    const paths = await writeFixture(dir, {
      inventory: trackedInventory,
      index: trackedIndex,
      lexicon: trackedLexicon.replace("- **Matches:** 1 (authority repository itself dominates the name surface)", "- **Matches:** 2 (fixture drift)"),
    });
    requireFail(run(paths.inventoryPath, paths.indexPath, paths.lexiconPath), "lexicon match count drift");
  }

  console.log("Unity org term validator fixtures passed: 7 negative, 1 positive.");
} finally {
  await rm(temp, { recursive: true, force: true });
}
