# Spec — after-14 tc-api-prep-workflow fixes

Evidence: ols-qa-evidence `evals/helix-skill-eval-2026-11-12-after13/` at commit 2662068 — `GATE.md` tc-api rows, `verify/tc-api-prep-workflow.json` (V), and the three static scorings `baseline/tc-api-prep-workflow.json` (S1), `-s2.json` (S2), `-s3.json` (S3). Paths below are ols-qa paths at origin/main ade53c10.

## Scope

Files: `skills/tc-api-prep-workflow/SKILL.md` and `skills/procedures/tc-api-prep-workflow/**`. Not `references/dependencies.md` (other lane) or any other shared file. Role: the agent running the skill.

## Rules

- **R1 Delivery-scoped dependency checks (verified P1).** When a run starts, the system must not check the Atlassian MCP, Jira REST credentials, openpyxl or systematic-debugging rows before step 1. When Phase C records the delivery, the system must check, before Phase D, every row that delivery uses: Atlassian MCP, Jira REST credentials and `superpowers:systematic-debugging` when the delivery includes A; Python 3 + openpyxl when it includes an Excel file. A failed check for a row the delivery uses must still be a stop (dependencies.md:4). A delivery-B run without Excel must never be stopped by, or asked for, Jira credentials. The use-time re-check before the REST fallback (phase-g-deliver.md:38-40) must stay. Source: V (SKILL.md:56, :58-60; WORKFLOW.md:27, :103-126); S1 and S3 P1 at SKILL.md:56.
- **R2 One start order.** SKILL.md step 1 (session-start-context) must be the first action with no dependency step before it. Source: S1 dim2 and S3 dim2 / P3 SKILL.md:22 ("before step 1" vs "before any other work").
- **R3 One Phase F header.** The Phase F draft template must carry an **Out of scope** line (the Phase E out-of-scope list, or none) and bold header cells. markdown-template.md must not hold a second, different set of header lines. Source: S1, S2, S3 P2 phase-f-draft.md:9/:14 (api-tc-guidelines.md:19 requires the out-of-scope header line); S2, S3 P3 phase-f-draft.md:18 (delivery-options.md:33 bold headers).
- **R4 Marked Phase E gate.** The "no full table until Ready for draft: YES" line must carry the 🔴 STOP marker. Source: S1 P3, S2 P2 phase-e-review.md:27.
- **R5 FE-only template not opened.** SKILL.md must not send an API run to csv-template-types.md at Phase G1; it must say the file is TC FE only and is never opened by this skill. The link stays because csv-export-rules.md:5 links it and skill-lint requires one hop. Source: S1, S2, S3 P2 SKILL.md:39.
- **R6 Named file cases in Phase G.** When delivery A has more than 50 rows, G2 must state the attachment offer (delivery-options.md:45) and that an accepted offer writes the file by G1 and attaches it; the `__ATT1_ID__` clause must name that case. When a Confluence-only update fails, the fallback file must be the G1 default CSV with its path told to the user. Source: S1 P2 delivery-options.md:45, S1/S2 P3 phase-g-deliver.md:31, S3 P2 phase-g-deliver.md:51.
- **R7 Phase D status rules agree.** The only-`default`/no-responses STOP must apply only when the API spec also states no status for that case; otherwise the spec value is used as in spec-coverage-review.md:28. Validation rows must allow 422 when Swagger lists it. Source: S3 P2 phase-d-scope-design.md:17, :14; api-tc-guidelines.md:26.
- **R8 Parse failure.** When the spec loads but does not parse as OpenAPI, the system must stop, report the parser error and ask for a valid export; it must never infer endpoints from partial text. Source: S2 P2 WORKFLOW.md:68.
- **R9 Worked example consistent.** Row count must add up, Expected Result must lead with `HTTP`, and an abbreviated column snippet must say so. Source: S1 P3 worked-example.md:26, S2 P3 :27, S3 P2 :4.
- **R10 Less repeated text, smaller output.** The progress-checklist lines that runs copy into chat must not repeat the phase file names or "(mandatory)"; delivery-options.md must link to the xlsx-fallback and `<br>` rules at their point of use instead of restating them; SKILL.md must not list default-columns.md twice; "Already fix" becomes "Already fixed". No gate, approval step or evidence rule may be removed. Source: GATE.md:36 (output bytes 9,362 → 9,524); S2/S3 P3 WORKFLOW.md:184, :187, :89; S1/S3 dim7.
- **R11 Byte budget.** The total bytes of the edited files must not exceed the before total (44,831 bytes for the 13 files under the two paths).

## Done when

- R1: SKILL.md § Dependencies names no row for step 1; WORKFLOW Phase C runs the delivery-scoped checks before Phase D; phase-g-deliver.md:38-40 unchanged in meaning.
- R2: SKILL.md has no "before step 1" text.
- R3: phase-f-draft.md template has `**Out of scope:**` and bold headers; markdown-template.md links to it.
- R4: phase-e-review.md gate line starts with 🔴.
- R5: SKILL.md says csv-template-types.md is TC FE only and never opened here; skill-lint 0 new.
- R6–R9: each named line changed as stated.
- R10–R11: bytes after ≤ bytes before; all ols-qa CI suites, skill-lint, routing test, secret guard and sdd-gate pass.
