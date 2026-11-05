# Spec — r6 tc-api-prep: Phase G1 branch when the .md / .csv export cannot be written

Status: draft for owner review · from A-results A2 row 3 (partly confirmed) · skill text only · no env access · must stay within existing size limits

## Why

`skills/procedures/tc-api-prep-workflow/WORKFLOW.md:245-253` (Phase G1) writes the markdown file (step 1) and the CSV (step 2) with no branch for a failed write.
Only the xlsx step has a failure branch (`:249`: openpyxl missing or failing -> warn and ask before falling back to CSV).
A second net exists: G-verify (`:285-289`) re-opens the file path, with a checklist and at most 3 fix rounds then STOP (`:299`: max 3 rounds, then STOP).
So the gap is real but partial: the failure would surface only after the run already told the user the paths (`:253`).
Precedent for the wording: the Confluence branch at `:282-283` ("... fails -> STOP: deliver the G1 file instead, report the exact error, and do not say 'commented'").

## Rules

- **R1** — When writing `references/{SCOPE}_API_TC.md` or `.csv` fails (permission, missing folder, disk, any error), the system must STOP, report the exact error text and the exact path it tried, and must not say the file is ready or give a download path for it.
  (source: `WORKFLOW.md:247-248,253`; wording model `:282-283`)
- **R2** — After that STOP, the system must offer two ways forward: write to the workspace root, or to a path the user names; it writes only after the user picks one.
  (source: owner brief 2026-11-05; the offer is new text, no existing source)
- **R3** — When delivery is A or both and the G1 file failed, delivery A (the Jira comment, G2) may still proceed without the attachment; the comment must not mention an attachment, and no `__ATT1_ID__` placeholder is used (no file -> no placeholder).
  (source: `WORKFLOW.md:262,267`: "no file -> no placeholder", Pattern D)
- **R4** — The xlsx branch (`:249`) stays unchanged; R1 covers `.md` and `.csv` only.
- **R5** — G-verify stays the second net and is not edited; the new branch is a first net before the paths are announced. (source: `WORKFLOW.md:285-289`)
- **R6** — The edit must add at most a few lines to `WORKFLOW.md` (364 lines now; skill-lint limit 500; file is 21989 bytes). No new reference file.

## Owner questions

- Q1: R3 under `both` — should the run pause for the user's choice (R2) before G2, or post the comment first? Default proposed: ask R2 first, because the user may want the attachment.

## Done when

- R1/R2: G1 has a numbered failure step with STOP, exact error, exact path, workspace-root-or-user-path offer, "do not say the file is ready".
- R3: the step says delivery A may continue without attachment.
- R4/R5: xlsx sentence and G-verify text byte-identical.
- R6: `wc -l` of WORKFLOW.md <= 370; skill-lint passes.
- `bash scripts/run-test-suites.sh` exits 0.
