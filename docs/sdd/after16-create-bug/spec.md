# Spec — after16-create-bug

Sources: ols-qa-evidence `evals/helix-skill-eval-2026-11-13-after15/` — `GATE.md:12`, `verify/create-bug-workflow.json` (`#0`, `#s3-0` CONFIRMED), darwin scorings `baseline/create-bug-workflow{,-s2,-s3}.json` (s1, s2, s3). Line numbers refer to helix `7b126d1`.

## Rules

- **R1 Phase C confirm cannot be waived.** When the user asks to skip approval, or a shared reference says approval may be waived (`agent-rationalizations.md:11`, `helix-session-constraints.md:10`, `skill-invocation-discipline.md:11`), the skill must still show the Phase C block and wait for **confirm**; `phase-c-confirm.md` must say so in words (source: verify `#0`; s1 dim4).
- **R2 Phase D GitHub search can fail.** When `gh issue create` exits non-zero, the skill must run the `gh issue list` title search before anything else: an equal title → this run's issue (record the URL, no second create); none → not created; the search itself fails → 🔴 STOP, report that bug's outcome as unknown (never "not created") and ask the user to check the repo before any retry. Phase F must report unknown outcomes as such (source: verify `#s3-0`; s3 dim3).
- **R3 Examples agree with their templates.** The worked example's Board check line must carry the B2 and B3 counts the Phase C template names, and its Phase F step must use `gh issue view --json`; the draft template's Confidence line must list Needs Review (source: s1/s3 dim5).
- **R4 One GitHub body rule.** The `gh issue create` example must pass the body by HEREDOC, as posting-discipline says; the GitHub section must say how screenshots go in (gh uploads no files) (source: s2 dim5, s2 dim3).
- **R5 Failure branches named.** The metadata-failure bullet must name a failing `gh label list`; Jira with no Atlassian MCP from the start must reach item 4's path list without a failed call (source: s1 dim3, s2 dim3).
- **R6 Offsets from restated text only.** Bytes added by R1-R5 must be offset by dropping text another create-bug line already states: the phase-d v2 rationale sentence, the bug-draft-template repeated quote/question lines, the posting-discipline HEREDOC and post-create bullets (now in phase-d / phase-f), and the worked-example Needs Review lesson (restates `phase-e-falsification.md:32-33`; s2 dim7). `SKILL.md` keeps its phase and test-round links: skill-lint requires every must-read at ≤ 1 hop (`tools/skill-lint`, 6 NEW violations when removed) (source: s1/s2/s3 dim7, lint run 13/Nov/2026).
- **R7 Size and rule lines.** Total bytes of the touched files after ≤ before; no MUST / NEVER / 🔴 / STOP / GATE line changed or removed; pinned tests unchanged (source: lane brief, owner token rule).

## Out of scope

Renaming `phase-e-falsification.md` (s1-s3 dim2/dim6; a rename needs owner approval, global rule 5). Shared references (other lanes). dim8 deductions for the cited matrix line and the B2/A3 questions: both are required gates (`WORKFLOW.md:89`, `phase-b2-board-check.md:24-27`). Time row (see PR report).

## Edge cases

- Search fails after a timeout → outcome unknown, not "not created", no retry.
- A user who says "just post it" still gets the confirm block once.

## Done when

- `phase-c-confirm.md` carries the no-waiver sentence naming the three shared lines.
- `phase-d-create.md` GitHub gate has the search-fails STOP; Phase F item 5 names unknown outcomes.
- Worked example, draft template, gh example, label and no-MCP branches match R3-R5; offsets per R6, SKILL.md unchanged.
- Touched-file bytes ≤ before; `bash scripts/run-test-suites.sh` passes; a new `tools/a16-create-bug` test pins R1-R6.
