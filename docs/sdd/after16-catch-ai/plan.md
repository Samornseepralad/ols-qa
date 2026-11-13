# Plan — after16-catch-ai

## Files

- `skills/catch-ai-workflow/reference.md` — § Report template, § Remediation entry template, offsets.
- `skills/catch-ai-workflow/SKILL.md` — offsets only (progress-checklist pointers the Must-read list already gives).

## Approach

Add to the template: `Result quality gate:` line under Scope; `## Classification` (step-5 table header) with the count line and the exit-line slot under it; `## Unsourced claims (not in the Defect count)`. Replace the template's second remediation copy with "One remediation entry (template above) per defect"; move its workspace-file citation form into the entry's Sources line; add the label to the entry's Root cause line.

Offsets (restated text only): the rationale "Judging correctness is only half the audit."; "Your own earlier message never governs anything." (SKILL step 3 says it); "An unreached cause is a Question, never a guessed fix." (SKILL step 7 says it); the file's intro line; a shorter No-issue / hedged-conclusion note; progress-checklist file pointers repeated in § Must-read files.

Rejected: a pre-delivery 7-layer line — no step asks for it in the report; adds bytes with no source.

## Time (84 s vs ceiling 71 s)

after-15 `runs_clean/catch-ai-workflow` headers: p1 = 77 / 66 / 75 s, p2 = 249 / 141 / 91 s; median of 6 = (77 + 91) / 2 = 84. p2 audits test verdicts, so the 20-layer result-quality gate runs by hand for every case plus the defect / non-pass group — all gates. p2r1 (249 s, 21 tool calls) cites `result-quality-gate.md` ×2, `non-pass-challenge-gate.md` ×3, `root-cause-investigation.md` ×2: re-opening, which no line mandates. Nothing mandatory is redundant, so no time change.

## Libraries

None. No new cost.

## What could break

`tools/catch-ai-unsourced-wording`, `tools/r11-t9-uplift-b` pin text — run every suite.
