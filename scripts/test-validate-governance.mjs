#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const validator = path.join(root, "scripts", "validate-governance.mjs");
const generatedWarning = "<!-- Generated from `scripts/generate-patterns.mjs` and `scripts/pattern-data.mjs`. Do not hand-edit generated catalog or pattern docs; edit the source files and regenerate. -->";

const files = {
  "AGENTS.md": "# Agent Instructions\n\nSee [Governance, Lifecycle, And Docs-As-Code](GOVERNANCE.md).\n",
  "README.md": "# layout-gallery\n\n- [Governance, Lifecycle, And Docs-As-Code](GOVERNANCE.md)\n",
  "index.md": "# layout-gallery\n\n- [Governance, lifecycle, and docs-as-code](GOVERNANCE.md)\n",
  "CATALOG.md": `# Layout Pattern Catalog\n\n${generatedWarning}\n`,
  "patterns/index.md": `# Pattern Categories\n\n${generatedWarning}\n`,
  "patterns/stacking/index.md": `# Stacking\n\n${generatedWarning}\n`,
  "patterns/stacking/stack.md": [
    "---",
    "lifecycle: generated",
    "generated_from: scripts/generate-patterns.mjs, scripts/pattern-data.mjs",
    "---",
    "",
    "# stack",
    "",
    generatedWarning,
    "",
  ].join("\n"),
  "quality/evidence/executable-evidence.md": [
    "| Claim | Validator or test | CI command | Positive evidence | Negative evidence | Evidence boundary |",
    "| Governance, lifecycle, generated-file, ownership, and stale-content policy remain discoverable and CI-enforced. | `scripts/validate-governance.mjs` and `scripts/test-validate-governance.mjs` | `node scripts/validate-governance.mjs --json`; `node scripts/test-validate-governance.mjs --json` | `GOVERNANCE.md`, `.github/CODEOWNERS`, generated warnings, generated metadata, root links, lifecycle states, stale-audit decision, and CI wiring are present. | Missing governance file, generated warning, generated metadata, CODEOWNERS coverage, or stale policy fixtures must fail. | Proves governance policy is present and linked, not that CODEOWNERS users have verified repository write access. |",
    "",
  ].join("\n"),
  ".github/CODEOWNERS": [
    "* @changeroa",
    "/GOVERNANCE.md @changeroa",
    "/README.md @changeroa",
    "/index.md @changeroa",
    "/AGENTS.md @changeroa",
    "/GUIDE.md @changeroa",
    "/guides/ @changeroa",
    "/recipes/ @changeroa",
    "/quality/ @changeroa",
    "/scripts/pattern-data.mjs @changeroa",
    "/scripts/generate-patterns.mjs @changeroa",
    "/patterns/ @changeroa",
    "/CATALOG.md @changeroa",
    "/.github/workflows/validate.yml @changeroa",
    "/.github/ @changeroa",
    "/scripts/ @changeroa",
    "/scripts/validate-*.mjs @changeroa",
    "/scripts/test-validate-*.mjs @changeroa",
    "",
  ].join("\n"),
  ".github/workflows/validate.yml": [
    "node -c scripts/validate-governance.mjs",
    "node -c scripts/test-validate-governance.mjs",
    "node scripts/validate-governance.mjs --json",
    "node scripts/test-validate-governance.mjs --json",
    "permissions:",
    "contents: read",
    "",
  ].join("\n"),
  "GOVERNANCE.md": [
    "# Governance, Lifecycle, And Docs-As-Code",
    "",
    "| Doc family | Source of truth | Generator | Generated artifacts | Lifecycle state | Stale trigger | Validator | Review owner |",
    "| Root repository guide | `README.md` | Manual | None | `stable` | Source-of-truth route changes, broken root links, or ownership changes. | `scripts/validate-okf.mjs` | Repository governance owner |",
    "| OKF bundle map | `index.md` | Manual | None | `scripts/validate-okf.mjs` | Repository governance owner |",
    "| Agent editing rules | `AGENTS.md` | Manual | None | `scripts/validate-links.mjs` | Repository governance owner |",
    "| Planning guides | `GUIDE.md`, `guides/*.md` | Manual | None | `scripts/validate-okf.mjs` | Planning-doc owner |",
    "| Layout recipes | `recipes/*.md` | Manual | None | `scripts/validate-okf.mjs` | Recipe owner |",
    "| Quality gates and evidence | `quality/**/*.md` | Manual | None | `scripts/validate-okf.mjs` | Quality owner |",
    "| Pattern data and examples | `scripts/pattern-data.mjs` | Manual data source | `patterns/**/*.md` | `generated` output from `stable` source | Source-lineage URL changes, generated drift, category changes, or pattern count changes. | `scripts/validate-patterns.mjs`, `scripts/validate-catalog.mjs`, `scripts/validate-governance.mjs` | Pattern-data owner |",
    "| Pattern generator | `scripts/generate-patterns.mjs` | Manual code source | `patterns/**/*.md` | `stable` generator, `generated` output | Generated structure changes, generated-warning changes, or generated metadata changes. | `node -c scripts/generate-patterns.mjs` | Pattern-data owner |",
    "| Validation scripts | `scripts/validate-*.mjs`, `scripts/test-validate-*.mjs` | Manual code source | CI validation output | `node -c` | Validation owner |",
    "| CI workflow | `.github/workflows/validate.yml` | Manual | GitHub Actions run | GitHub Actions | Repository governance owner |",
    "",
    "## Generated Artifact Policy",
    "Do not hand-edit generated artifacts.",
    "`scripts/pattern-data.mjs`",
    "`scripts/generate-patterns.mjs`",
    "",
    "## Lifecycle States",
    "`draft` `stable` `deprecated` `experimental` `generated`",
    "",
    "## Review Ownership",
    "CODEOWNERS",
    "",
    "## Staleness Control",
    "Decision: no scheduled stale-content workflow yet.",
    "Audit trigger:",
    "node scripts/validate-links.mjs --json",
    "",
  ].join("\n"),
};

const cases = [
  {
    name: "missing_governance",
    omit: ["GOVERNANCE.md"],
    expect: "GOVERNANCE.md: missing file",
  },
  {
    name: "missing_matrix_stale_trigger",
    mutate: {
      "GOVERNANCE.md": files["GOVERNANCE.md"].replace("Generated structure changes, generated-warning changes, or generated metadata changes.", "Generated structure changes."),
    },
    expect: "GOVERNANCE.md: missing Generated structure changes, generated-warning changes, or generated metadata changes.",
  },
  {
    name: "missing_evidence_fixture_coverage",
    mutate: {
      "quality/evidence/executable-evidence.md": "Missing governance file or generated warning fixtures must fail.",
    },
    expect: "quality/evidence/executable-evidence.md: missing Missing governance file, generated warning, generated metadata, CODEOWNERS coverage, or stale policy fixtures must fail.",
  },
  {
    name: "missing_generated_warning",
    mutate: {
      "patterns/stacking/stack.md": [
        "---",
        "lifecycle: generated",
        "generated_from: scripts/generate-patterns.mjs, scripts/pattern-data.mjs",
        "---",
        "",
        "# stack",
        "",
      ].join("\n"),
    },
    expect: "patterns/stacking/stack.md: missing generated warning",
  },
  {
    name: "missing_generated_metadata",
    mutate: {
      "patterns/stacking/stack.md": `# stack\n\n${generatedWarning}\n`,
    },
    expect: "patterns/stacking/stack.md: missing lifecycle: generated",
  },
  {
    name: "missing_codeowners_coverage",
    mutate: {
      ".github/CODEOWNERS": [
        "* @changeroa",
        "/GOVERNANCE.md @changeroa",
        "/scripts/pattern-data.mjs @changeroa",
        "/patterns/ @changeroa",
        "",
      ].join("\n"),
    },
    expect: ".github/CODEOWNERS: missing /README.md @changeroa",
  },
  {
    name: "missing_workflow_permissions",
    mutate: {
      ".github/workflows/validate.yml": [
        "node -c scripts/validate-governance.mjs",
        "node -c scripts/test-validate-governance.mjs",
        "node scripts/validate-governance.mjs --json",
        "node scripts/test-validate-governance.mjs --json",
        "",
      ].join("\n"),
    },
    expect: ".github/workflows/validate.yml: missing permissions:",
  },
  {
    name: "missing_stale_policy",
    mutate: {
      "GOVERNANCE.md": files["GOVERNANCE.md"].replace("Decision: no scheduled stale-content workflow yet.", "Decision: pending."),
    },
    expect: "GOVERNANCE.md: missing Decision: no scheduled stale-content workflow yet.",
  },
  {
    name: "success_path",
    expect: null,
  },
];

function writeFixture(testCase) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), `layout-gallery-governance-${testCase.name}-`));
  const omitted = new Set(testCase.omit ?? []);
  const entries = { ...files, ...(testCase.mutate ?? {}) };
  for (const [relative, content] of Object.entries(entries)) {
    if (omitted.has(relative)) continue;
    const target = path.join(dir, relative);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content);
  }
  return dir;
}

function runCase(testCase) {
  const dir = writeFixture(testCase);
  const result = spawnSync(process.execPath, [validator, "--json"], {
    cwd: dir,
    encoding: "utf8",
  });
  fs.rmSync(dir, { force: true, recursive: true });
  const output = JSON.parse(result.stdout);
  const passed = testCase.expect ? !output.ok && output.failures.includes(testCase.expect) : output.ok;
  return {
    actual: output,
    expected: testCase.expect ?? "ok:true",
    name: testCase.name,
    ok: passed,
  };
}

const results = cases.map(runCase);
const report = {
  ok: results.every((result) => result.ok),
  results,
};

console.log(JSON.stringify(report, null, 2));
process.exit(report.ok ? 0 : 1);
