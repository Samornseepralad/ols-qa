# Spec — after-16 tc-api-prep-workflow fixes

Evidence: ols-qa-evidence `evals/helix-skill-eval-2026-11-13-after15/verify/tc-api-prep-workflow.json` (V) and `verify/tc-fe-prep-workflow.json` (VF). Finding lines refer to helix `7b126d1`; the same text is at the ols-qa paths below (origin/main 3bbc3b18).

## Scope

Files: `skills/tc-api-prep-workflow/SKILL.md`, `skills/procedures/tc-api-prep-workflow/{WORKFLOW,phase-f-draft,phase-g-deliver}.md`, and the shared `references/dependencies.md` (Jira REST credentials row only), `references/qa-closing-shared.md` (Jira comment item only), `references/qa-evidence-gates.md` ("Jira comment posted" row only). Role: the agent running the skill.

## Rules

- **R1 REST credentials are a fallback-only dependency for browser-session publishers (P1 `#0`, `tc-fe-prep-workflow#s3-0`).** When tc-api-prep records delivery A, the system must not check the Jira REST credentials row before Phase D; it must check it only when Phase G2 step 4 falls back to REST, and a failed check there stays a 🔴 STOP. When tc-fe-prep runs, the system must never require that row (tc-fe-prep never curls). The dependencies.md row must state this browser-session fallback for tc-api-prep and tc-fe-prep, and must keep the token check unchanged for every other skill that lists it (testing-ticket, retest-bug, create-bug). Source: V evidence SKILL.md:60, WORKFLOW.md:126, dependencies.md:59, phase-g-deliver.md:39; VF evidence tc-fe SKILL.md:112, dependencies.md:4, jira-fast-publish.md:10.
- **R2 Phase F routes scope/source changes back to Phase D (P1 `#s2-0`).** When, at the Phase F draft gate, the user changes the scope or a source (API spec, Swagger) or rejects the whole draft, the system must return to Phase D with the change and re-run Phase E (new **Ready for draft: YES**) before posting a new draft; it must never apply such a change as row edits. Row edits within the reviewed scope keep the current Phase F loop. Source: V evidence phase-f-draft.md:27, :29; phase-e-review.md:37.
- **R3 Attachment check only when a file was generated (P1 `#s3-0`).** When a Jira comment is posted with no CSV/Excel generated in the run (tc-api comment-only A, Pattern D), the shared closing item and the "Jira comment posted" evidence row must not require an attachment; when a file was generated they must still require it attached. Both lines must agree with jira-comment-post-review.md §5 ("when CSV/Excel was generated"). Source: V evidence qa-closing-shared.md:19, qa-evidence-gates.md:37, phase-g-deliver.md:37, :89.
- **R4 Byte budget.** Total bytes of the edited files must not exceed the before total (48,657 bytes for the 7 files). No MUST / NEVER / 🔴 / STOP / GATE line removed.

## Done when

- R1: tc-api SKILL.md credentials line names G2 step 4 as its check point; WORKFLOW Phase C checks each row at the point it names; dependencies.md row states the tc-api/tc-fe browser-session fallback; curl check text unchanged.
- R2: phase-f-draft.md Go back names the Phase D + Phase E route for scope/source change or whole-draft rejection.
- R3: qa-closing-shared.md:19 and qa-evidence-gates.md:37 say the attachment is required when a file was generated.
- R4: bytes after ≤ 48,657; `bash scripts/run-test-suites.sh` and `node tools/sdd-gate/check.js` pass.
