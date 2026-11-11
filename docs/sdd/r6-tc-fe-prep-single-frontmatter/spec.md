# Spec — r6 tc-fe-prep: one frontmatter block only (SKILL.md)

Status: draft for owner review · from A-results A2 row 4 (read 2026-11-05) · skill text only · no env access

## Why

`skills/procedures/tc-fe-prep-workflow/WORKFLOW.md:1-7` repeats the frontmatter of `skills/tc-fe-prep-workflow/SKILL.md:1-16`
(same `name: tc-fe-prep-workflow` and the same `description:` block). Two description copies can drift, and the eval grader flagged it as P1.

## Sourced facts (all re-read in this worktree)

- F1. SKILL.md carries `name`, `description` and `metadata.proactive_triggers` (`SKILL.md:1-16`); WORKFLOW.md carries `name` + `description` only (`WORKFLOW.md:1-6`, closing `---` at :7).
- F2. Other procedures: `content-takedown`, `create-bug`, `review-result`, `test-data-prep`, `testing-ticket` WORKFLOW.md also open with `---` + `name:` + `description:`;
  `tc-api-prep` WORKFLOW.md has `name:` only (then an HTML comment pointing to the SKILL.md description); `retest-bug` WORKFLOW.md has NO frontmatter and opens with `# Retest bug workflow` plus
  "Not a skill entry — the skill name, description and triggers live only in SKILL.md" (`retest-bug-workflow/WORKFLOW.md:1-3`). So the repo is mixed; retest-bug is the existing precedent for "no frontmatter".
- F3. `tools/skill-structure/check.js` (header lines 1-13) checks `proactive_triggers`, `## QA closing`, `Refusal-first`, "do not use" in the first 20 lines — applied to each shipped SKILL.md, not WORKFLOW.md (A-results says helix CI `ci-check-skill-structure.sh` is the same rule set; that script is not in this repo, so not re-read).
- F4. `tools/skill-lint/lint.js`: `description-person` and `description-use-when` filter on `/SKILL.md` only (`:213`, `:237`); `max-lines` (500) covers WORKFLOW.md (tc-fe-prep WORKFLOW is 452 lines, so it only shrinks); `toc` needs a "Contents" section in the first 25 lines after any frontmatter — WORKFLOW has `## Contents` at line 15 and would move to line 8.
- F5. `tools/skill-routing/routing.test.js` reads frontmatter of `skills/<name>/SKILL.md` only (`:105`).
- F6. `grep` for `tc-fe-prep-workflow/WORKFLOW.md` in tools, scripts and docs found no reader that parses WORKFLOW frontmatter (grep run 2026-11-05; scope: tools, scripts, docs; helix repo not searched).

## Rules

- **R1** — When a reader opens `skills/procedures/tc-fe-prep-workflow/WORKFLOW.md`, the system must show one source for name, description and triggers: SKILL.md. The WORKFLOW.md must not repeat the `name:`/`description:` block.
  (source: F1; precedent F2 retest-bug)
- **R2** — The WORKFLOW.md must keep a one-line pointer in the retest-bug style ("Not a skill entry — the skill name, description and triggers live only in SKILL.md", relative link) so the file stays self-explanatory. (source: `retest-bug-workflow/WORKFLOW.md:3`)
- **R3** — The body below the old frontmatter (from `# TC FE Prep Workflow`) must be byte-identical after the edit; no rule text changes. (source: `WORKFLOW.md:9-`)
- **R4** — The change must not trip skill-lint, skill-structure, skill-routing or link-check: Contents still within the first 25 lines, relative link resolves. (source: F3-F5)
- **R5** — The same frontmatter duplication elsewhere (create-bug, testing-ticket, review-result, test-data-prep, content-takedown, tc-api-prep) is NOT touched here. (source: F2; scope bound)

## Owner questions

- Q1: Do you want the other six procedures aligned later (retest-bug style), or kept as is? Not decided; out of scope for this spec.
- Q2: The eval-side failing items for tc-fe-prep are fixed on the eval side (owner decision 2026-11-05), so nothing about them is in this repo.

## Done when

- R1/R2: WORKFLOW.md starts with the pointer line, has no `---` frontmatter, no `description:`.
- R3: `diff` of the body against origin/main shows only removal of lines 1-7 and the added pointer.
  Amended by `docs/sdd/r11-skill-fixes-g1` R13 (11/Nov/2026): the test now checks this against the commit that made the edit (`e1899775` vs its parent), not against `origin/main`, so later rule edits to WORKFLOW.md are not blocked.
- R4: `node tools/skill-lint/lint.js` and `node tools/skill-structure/check.js` exit 0.
- `bash scripts/run-test-suites.sh` exits 0.
