import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const requiredTermFields = [
  "term",
  "aliases",
  "definition",
  "game_ui_use",
  "not_that",
  "match_count",
  "primary_cluster_histogram",
  "ui_relevance_histogram",
  "examples",
];
const requiredLexiconSections = [
  "Repository Boundary",
  "Reusable Method",
  "Opinionated Guidance",
  "Platform-Specific Guidance",
  "Unsupported Absolutes",
  "Verification Contract",
  "Source, License, And Attribution",
  "IA Navigation",
];

function parseArguments(arguments_) {
  const options = {
    index: path.join(root, "game-ui", "unity", "data", "unity-org-term-index.json"),
    lexicon: path.join(root, "game-ui", "unity", "org-term-lexicon.md"),
    inventory: path.join(root, "game-ui", "unity", "data", "unity-technologies-public-repositories.json"),
  };
  for (let index = 0; index < arguments_.length; index += 1) {
    const argument = arguments_[index];
    if (argument === "--json") continue;
    if (argument === "--index" || argument === "--lexicon" || argument === "--inventory") {
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

function validateIndex(index, inventory) {
  requireCondition(index && typeof index === "object", "term index must be an object");
  requireCondition(index.snapshot && typeof index.snapshot === "object", "snapshot metadata missing");
  requireCondition(index.snapshot.capture_timestamp === "2026-07-14T12:59:16Z", "snapshot timestamp mismatch");
  requireCondition(index.snapshot.repository_count === 804, "snapshot repository_count must be 804");
  requireCondition(Array.isArray(index.terms) && index.terms.length >= 20, "expected at least 20 terms");
  requireCondition(Array.isArray(inventory) && inventory.length === 804, "inventory must contain 804 rows");

  const terms = new Set();
  let exampleCount = 0;
  for (const term of index.terms) {
    requireCondition(term && typeof term === "object", "term entry must be an object");
    for (const field of requiredTermFields) {
      requireCondition(Object.hasOwn(term, field), `term missing field ${field}: ${term.term || "<unknown>"}`);
    }
    requireCondition(typeof term.term === "string" && term.term.trim(), "term name must be non-empty");
    requireCondition(!terms.has(term.term), `duplicate term: ${term.term}`);
    terms.add(term.term);
    requireCondition(Array.isArray(term.aliases), `aliases must be an array: ${term.term}`);
    requireCondition(Number.isInteger(term.match_count) && term.match_count >= 0, `match_count invalid: ${term.term}`);
    requireCondition(Array.isArray(term.examples), `examples must be an array: ${term.term}`);
    requireCondition(term.examples.length <= 12, `examples exceed 12: ${term.term}`);
    requireCondition(term.examples.length <= term.match_count, `examples longer than match_count: ${term.term}`);
    for (const example of term.examples) {
      requireCondition(typeof example.full_name === "string", `example full_name missing: ${term.term}`);
      requireCondition(
        example.full_name.startsWith("Unity-Technologies/"),
        `example outside Unity-Technologies: ${example.full_name}`,
      );
      requireCondition(example.full_name !== "tasharen/ngui", "NGUI must not appear as inventory example");
      requireCondition(
        example.html_url === `https://github.com/${example.full_name}`,
        `example URL mismatch: ${example.full_name}`,
      );
      exampleCount += 1;
    }
  }

  requireCondition(terms.has("NGUI"), "NGUI external term required");
  requireCondition(terms.has("UnityCsReference"), "UnityCsReference term required");
  requireCondition(terms.has("uGUI"), "uGUI term required");
  requireCondition(terms.has("UI Toolkit"), "UI Toolkit term required");

  return { termCount: terms.size, exampleCount };
}

function validateLexicon(lexicon) {
  requireCondition(typeof lexicon === "string" && lexicon.includes("---"), "lexicon frontmatter missing");
  requireCondition(lexicon.includes("domain: game-ui"), "lexicon domain must be game-ui");
  requireCondition(lexicon.includes("lifecycle: experimental"), "lexicon lifecycle must be experimental");
  requireCondition(!lexicon.includes(".omo/"), "tracked lexicon must not depend on .omo/");
  requireCondition(!/\/Users\/[A-Za-z0-9._-]+/.test(lexicon), "absolute home path leaked into lexicon");
  requireCondition(lexicon.includes("Independent research"), "non-affiliation label missing");
  requireCondition(lexicon.includes("tasharen/ngui") || lexicon.includes("NGUI"), "NGUI external note missing");
  requireCondition(lexicon.includes("unity-org-term-index.json"), "term index link missing");
  for (const section of requiredLexiconSections) {
    requireCondition(lexicon.includes(`## ${section}`), `missing section: ${section}`);
  }
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const index = JSON.parse(await readFile(options.index, "utf8"));
  const inventory = JSON.parse(await readFile(options.inventory, "utf8"));
  const lexicon = await readFile(options.lexicon, "utf8");
  const stats = validateIndex(index, inventory);
  validateLexicon(lexicon);
  const result = { ok: true, ...stats, repositoryCount: 804 };
  if (process.argv.includes("--json")) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(`ok: ${stats.termCount} terms, ${stats.exampleCount} examples, inventory 804`);
  }
}

main().catch((error) => {
  console.error(String(error && error.message ? error.message : error));
  process.exitCode = 1;
});
