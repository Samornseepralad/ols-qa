# Spec — after-13 root-cause fixes

Source for every rule: the RCA files in ols-qa-evidence `docs/helix-quality/wayfinder-token-diet/tickets/rca/<skill>.md`, written from the after-12 data (`evals/helix-skill-eval-2026-11-12-after12/`) and checked against helix 18200e2. Each RCA lists the deduction, its path:line, the scorers who raised it (3/3 or 2/3), the fix and the expected gain. A lane applies the fixes its RCA calls "proposed fix set". Fixes the RCA marks as noise or speculative are left out.

## Rules

- **R1 catch-ai-workflow.** When the skill is scored, the system must not lose d7/d9 points for the hedge rule being copied in several places, the collapsed Rationalizations table, or the missing Because column. The pre-delivery layers must say which of them apply to a document audit. Runs must cite internal files by path and heading, not by commit. (rca/catch-ai-workflow.md)
- **R2 create-bug-workflow.** `worked-example.md` must not contradict refusal-first. `phase-d-create.md` must offer "Go back". The WORKFLOW frontmatter must not be duplicated, QA closing must not be pointer-only, the Severity rule must exist in one place, and the SKILL.md out-of-scope list must keep "only when". Phase E is relabelled as the RCA proposes, and the 2 ols-qa tests that slice on "## Phase E — Falsification" are updated to match (owner approved 12/Nov). (rca/create-bug-workflow.md)
- **R3 helix.** The router must not list the 9 gate links that the skill-lint one-hop rule does not need. The description must contain no angle brackets (`<workflow>` → `{workflow}`), and must carry the trigger phrases that are now only in metadata. (rca/helix.md)
- **R4 retest-bug-workflow.** The AC2 decision must refuse any third option, not only "C confirm defect". Step 2d must give the `none, asked {who} {date}` header. `project-config-template.md:66` must not map a code mismatch straight to FAILED. The login block must exist once. `commands/retest-bug.md` must not offer to waive the 6d approval. Pinned lines stay byte-identical, and WORKFLOW stays ≤ 500 lines. (rca/retest-bug-workflow.md)
- **R5 tc-api-prep-workflow.** The SKILL.md link list must keep only what skill-lint needs (stub lines start with "Open"). The duplicate QA-closing pointer goes, the Test.md name must not use `{ISSUE_KEY}`, and the phase-g "may" is made definite, with its 2 pinned tests updated to match (owner approved 12/Nov). (rca/tc-api-prep-workflow.md)
- **R6 tc-fe-prep-workflow.** The 2 verified P1s (openpyxl auto-install, markdown-template TC_ prefix and bullet) must be gone. The 2.5a stop text must ask for the glossary line. The reviewer-count text at `design-and-review.md:273` must match the original rule (`ab9a377^:275`): one reviewer by default and ≥ 2 per round only on a thorough request. The 🔴 STOP markers and the 3/3 contradictions listed in the RCA must be fixed. (rca/tc-fe-prep-workflow.md)
- **R7 tc-review-workflow.** The notify wording rule must be named where it is used, and the design cross-check must have a default. The coverage layers that apply to a document review must be listed, and layer 6 must not contradict `SKILL.md:133-141`. Execution-only file names are written without links. (rca/tc-review-workflow.md)
- **R8 testing-ticket-workflow.** `test-execution-plan-template.md:29` must not let a scenario drop a width row. The unrun-row line at `:33` must be fail-closed. Mandatory evidence gates must link to real anchors and stay conditional. The MUST/NEVER rows that copy `customer-escape-prevention.md:214-227` are replaced by a link. (rca/testing-ticket-workflow.md)
- **R9 shared references.** Only one lane edits csv-export-rules, jira-comment-post-review, jira-fast-publish, qa-closing-shared, session-closing, qa-evidence-coverage, workspace-guide-discovery and long-workflow-todos. Each edit is additive and scoped to the skill that needs it, and the PD3 wording swap is not made.
- **R10 harness (ols-qa-evidence, after-13 folder only).** `build_data.py` must take findings from all 3 scorings, deduplicated, and must read verdicts from `verify/<skill>.json`. Its tests must prove that a P1 found only by scoring 2 is counted until it is refuted.

## Edge cases

- If a fix would push a skill's mandatory reads above 50% of baseline, the lane stops and reports. It does not drop a gate to make room.
- A test that pins the edited text is updated only under R2 and R5. Any other pinned test means the lane stops and reports.

## Done when

- Every lane PR is merged with ols-qa CI green (sdd-gate, node-tests, skill-lint).
- helix is synced with parity 0 against ols-qa, and the frozen SHA passes the helix test suite.
- graph_v2 shows every skill ≤ 50% of baseline, direct and via the router.
- The static pre-flight (one darwin scoring per skill) meets the predicted table in T7b.
