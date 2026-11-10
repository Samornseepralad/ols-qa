# Spec — testing-ticket: one authoritative statement per rule

## Source
- S1 after-6 static review P1 (`WORKFLOW.md:109`): "Keep one authoritative statement per rule and make other places a one-line pointer; trim QA closing to checkbox + link."
- S2 inventory on `origin/main` (f18f85d) — see the table below; line numbers are before the change.

## Inventory (rule → kept place → pointer places)

| Rule | Kept (where it runs) | Pointer places |
|------|----------------------|----------------|
| Figma design comparison | WORKFLOW Phase B step 4 (reference exists) · execute-and-summarize E0 (compare) · F *Design + depth reconciliation* (check) | SKILL.md:24 · WORKFLOW:109 (*Discipline*) · WORKFLOW:337 (*QA closing*) · WORKFLOW:445 (MUST/NEVER) |
| Login by command, never a login window or a password | WORKFLOW Phase D *Fresh login* | SKILL.md:27 · WORKFLOW:148 (Phase A field) · WORKFLOW:121 (*Refusal-first*) · WORKFLOW:419 (MUST/NEVER) · session-intake.md:18 · playwright-discipline.md:45 · execute-and-summarize.md:63 |
| AC/EC 7-layer coverage gate | WORKFLOW Phase B step 3 (layers 1–2) · execute-and-summarize *Cover every enumerated AC/EC id* (3–5) · F *AC/EC coverage reconciliation* (6–7) | WORKFLOW:107 (*Discipline* index) · WORKFLOW:335 (*QA closing*) · WORKFLOW:420 (MUST/NEVER) |
| E2 root-cause investigation | execute-and-summarize E2 | WORKFLOW:100–101 (*Discipline*) · WORKFLOW:362 (*QA closing*) · WORKFLOW:434 (MUST/NEVER) |
| E3 non-PASS challenge gate | execute-and-summarize E3 | WORKFLOW:103–105 (*Discipline*) · WORKFLOW:363 (*QA closing*) · WORKFLOW:435 (MUST/NEVER) |
| Depth gates (customer-escape-prevention) | Phase B step 5 · Phase D *Session preflight* · E0 · F *Design + depth reconciliation* | SKILL.md:25 · WORKFLOW:111–112 (*Discipline*) · WORKFLOW:338–347 (*QA closing*) |
| Test through the real steps | execute-and-summarize *Real surface* (L66) | WORKFLOW:94 (*Discipline*) · WORKFLOW:425 (MUST/NEVER) |
| Story evidence 5-step / pre-delivery 7-layer gates | `qa-evidence-gates.md` (shared reference) | WORKFLOW:348–360 (*QA closing*) · WORKFLOW:426 (MUST/NEVER) |
| Cross-ticket conflict check | WORKFLOW *QA closing* intro (`qa-closing-shared.md`) | WORKFLOW:369 (*QA closing* checkbox) · WORKFLOW:459 (MUST/NEVER) |
| Phase C confirm gate | WORKFLOW Phase C | SKILL.md:30 · WORKFLOW:87 · WORKFLOW:421 · session-intake.md *Confirmation gate* (already pointers — unchanged) |

## Rules
- R1 — Each rule in the inventory must have its full statement only at its kept place(s); every pointer place must be one line (one bullet, one table row, or one sentence) that names the rule and links to the kept place.
- R2 — No clause may be lost: a clause that appears only at a pointer place must be moved into the kept place before the pointer is shortened (for example, the password clause into *Fresh login*, `superpowers:systematic-debugging` into E2, "a coverage gap, never a product FAILED" into *Cover every enumerated AC/EC id*, "confirm defect only while the expected is not superseded" into E3, "unspecified behaviour is a question, never a verdict" (customer-escape-prevention §8) into E0).
- R3 — *QA closing* must be a checklist where each item is one line: a checkbox, the gate's name, and a link to where the gate is stated.
- R4 — MUST/NEVER rows that become pointers must keep their *Because* text (the rationale is not stated elsewhere).
- R5 — `skills/testing-ticket-workflow/SKILL.md` § Contents must not be edited.
- R6 — Shared references under `references/` (used by other workflows) must not be edited in this change.

## Done when
- Every pointer place in the inventory is one line with a link; *QA closing* items are one line each.
- A clause-by-clause check (tasks T5) shows every clause removed from a pointer place exists at the kept place.
- `bash scripts/run-test-suites.sh` passes; `bash scripts/check-no-secrets.sh <changed files>` is clean.
- WORKFLOW.md line count goes down (459 before).
