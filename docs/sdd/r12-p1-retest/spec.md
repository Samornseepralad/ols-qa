# Spec — retest-bug: one statement per rule (#0) and named-action delegation (#1)

## Sources
- S1 `retest-bug-workflow#0` (after-9 `findings.json`, ols-qa-evidence `evals/helix-skill-eval-2026-11-10-after9/data/after-9/findings.json`): "Rules restated in up to four places (stub SKILL.md:25, Discipline WORKFLOW.md:118, QA closing :381, MUST/NEVER :488-489); verdict rule likewise at :216, :445, :460, :463." Fix: "Keep one canonical statement per rule … and replace the other copies with a one-line link."
- S2 `retest-bug-workflow#1` (same file): "Delegated-round clause skips the approval wait for post, transition and notify on loose cues such as 'handle it'." Fix: "Require an explicit delegation that names the outward actions (post/transition/notify), and still print the bundle list before executing."
- S3 precedent: `docs/sdd/r10-testing-ticket-one-statement/spec.md` (kept place = where the rule runs; pointer places = one line + link; MUST/NEVER pointers keep their *Because*; no clause lost).
- S4 owner delegation 11/Nov/2026: "ต้องแก้มาทั้งหมด ไม่รอเรา".

## Decisions (agent decision under owner delegation 11/Nov/2026)
- D1 — #0 uses the r10 "stated once" pattern (S3). Design rule kept at WORKFLOW *Step 2d* (does a reference exist; missing → report back, BLOCKED) and execute-and-evidence *4d* (the five-point comparison). Verdict rule kept at WORKFLOW `#verdict-rule` (Step 2, with the "PASSED only if ALL" line above it).
- D2 — #1: an approval wait is skipped only for an outward action (post / transition / notify) that the owner, in this session, explicitly delegated **by name** for this round. Loose cues ("handle it", "don't ask", "don't wait") never skip a write approval. The batched single approval at end of round stays.
- D3 — The shared `references/no-wait-decision-gate.md` layer 19 still lists the loose cues; it is used by other workflows and is out of this change's scope (constraint in intent). The retest clause states that it is narrower than layer 19 for write approvals.

## Inventory (#0) — rule → kept place → pointer places (line numbers before the change)
| Rule | Kept (where it runs) | Pointer places |
|------|----------------------|----------------|
| Design (Figma) comparison / no design → report back + BLOCKED | WORKFLOW Step 2d · execute-and-evidence 4d | SKILL.md:25 (step 3) · WORKFLOW:118–125 (*Discipline*) · WORKFLOW:381 (*QA closing*) · WORKFLOW:488–489 (MUST/NEVER) |
| Verdict rule (ALL items; any difference → PWMI/FAILED by matrix; unverified → BLOCKED) | WORKFLOW:215–216 (`#verdict-rule`) | WORKFLOW:445 · :460 · :463 (MUST/NEVER) |

## Rules
- R1 — When a rule in the inventory is stated, its full statement must appear only at its kept place(s); every pointer place must be one line that names the rule and links to the kept place with the words "stated once at".
- R2 — When a pointer place is shortened, every clause that appeared only there must first exist at the kept place (no clause lost, no rule weakened). Known moves: "node link actually opened" and "per-case mapping stays in the Step 2c plan" into 4d; "Expected Result field id from the project guide" into `#verdict-rule`.
- R3 — When a MUST/NEVER row becomes a pointer, it must keep its *Because* text unchanged — except a *Because* clause that itself restates the rule (row :445 "no 'minor wording' or 'cosmetic' exceptions; its verdict … from the matrix"), which is dropped because the kept place states it; the row keeps "Any text difference is **never PASSED**".
- R4 — The *QA closing* design item must be one line: checkbox, gate name, link.
- R5 — When the owner has not, in this session, explicitly delegated a named outward action (post / transition / notify) for this round, the system must wait for the Step 6d item 4 approval before that action; general cues ("handle it", "don't ask", "don't wait") must not skip a write approval.
- R6 — When a named action is delegated, the system must still print the approval bundle list in chat before executing it, and every format, syntax and readback gate must still run; opening new bugs still needs a live yes.
- R7 — The batched single approval at end of round (Step 6d item 4) must stay.
- R8 — Shared `references/` files, `skills/retest-bug-workflow/SKILL.md` § Contents, and create-bug / tc-fe-prep / tc-review files must not be edited.

## Blocked (R5–R7 not shipped in this change)
- `tools/retest-case-plan-rules/check.test.js` test **D2** pins `comment-and-post.md:330` byte-identical to `origin/main` (spec `docs/sdd/r6-retest-bug-case-plan-and-superseded-c` § *Not changed*: owner decision D2, 2026-11-05 — the delegated-round line "stays AS IS"). R5–R6 change exactly that line, so D2 fails (measured: `FAIL  D2 comment-and-post.md line 330 byte-identical to origin/main`).
- Freeze tests are never edited to get past them (precedent `docs/sdd/r11-t9-uplift-a/intent.md`). Whether the 11/Nov/2026 delegation supersedes D2 — and so whether the D2 guard may be retired — is an **owner decision**. The ready change (comment-and-post.md:328/:330 + R5/R6 assertions) is held on branch `fix/r12-p1-retest-delegation-held`.

## Done when
- `node tools/r12-p1-retest/check.test.js` fails on `origin/main` and passes on the branch (R1–R4, R7; R5–R6 held, see § Blocked).
- `bash scripts/run-test-suites.sh`, `node tools/skill-lint/lint.js`, `node tools/sdd-gate/check.js --base origin/main`, `git ls-files -z | xargs -0 bash scripts/check-no-secrets.sh`, `node tools/postmortem-guard/check.js` all pass.
- A clause-by-clause check (T4) is recorded in the PR body.
