# Spec — after17-tc-fe

Sources: ols-qa-evidence origin/main `24eafa3`, `evals/helix-skill-eval-2026-11-1*-after1{1..5}/{baseline,verify,grade}/tc-fe-prep-workflow*.json`. Line numbers refer to ols-qa `e5c8b164`. "Row n" = the lane's open-row list (catalogue in the lane report). Each rule cites the finding round/scoring that raised it.

## Rules

### Stub (`skills/tc-fe-prep-workflow/SKILL.md`)

- **R1 No execution-only bundle.** The stub must not link files whose trigger never fires in TC drafting: the 10 execution references (`:86-95`) and `round-time-contract.md` (`:70`, scoped to retest/testing/smoke). One line routes execution, verdict and defect requests to their skills via `skill-routing.md`. Exception (skill-lint must-read-depth, max 1 hop): `round-time-contract.md`, `qa-debug-discipline.md`, `root-cause-investigation.md` are reached through shared must-read files, so they stay linked with exact triggers ("only if this run executes tests", "when a tool or fetch errors", "before naming a cause"); `test-md-format.md` links in shared files become see-also. (after11 s1#0 s2#2 s3#9; after12 s1#12 s2#9 s3#10; after13 s1#11 s2#10 s3#6; after14 s1#9 s2#8 s3#12; after15 s1#3 s1#15 s2#7 s3#4)
- **R2 Expected-result ban lives where TCs are written.** The 4f author self-check must forbid an Expected Result that only says ถูกต้อง / ครบถ้วน / complete / correct, and require the observable outcome — the rule from `customer-escape-prevention.md` §2. (after13 s3#19; after14 s3#10; after15 s2#6)
- **R3 No dead Test.md trigger.** tc-fe never writes Test.md: drop `SKILL.md:74` and the tc-fe-prep claim in `references/test-md-format.md:95` (tc-api keeps it, its WORKFLOW:109 offers it). (after13 s1#10 s3#14; after15 s1#14 s2#8 s3#9)
- **R4 One read time.** `prerequisites.md` and `jira-formatting.md` are read before Step 0, as `WORKFLOW.md:72-74` says. (after11 s1#1; after15 s3#5)
- **R5 Dependencies name what is used.** Atlassian MCP is for reading the story only; "Qase" is Qase web UI access or a pasted suite list (there is no Qase MCP). (after11 s1#4; after15 s1#19)
- **R6 "Every must-read linked" is true.** Files a step opens (`tc-glossary.md`, `html-draft-template.md`, `html-pre-draft-review-template.md`) are listed with their step. (after14 s3#9)

### Procedure (`WORKFLOW.md`, phase files)

- **R7 Every user-decision stop is marked.** The Step 6 suite / Type-Status stop (`:162`), the Step 6.5 approval gate (`:264`) and the Step 7.5 PASS gate (`:377`) carry `🔴 GATE — STOP`; the suite gate is split into short items. (after12 s2#8; after13 s3#17; after14 s1#14; after15 s2#5)
- **R8 Step 6.5 has a branch for every exit.** Any exit other than 0/3/4 (1, crash, timeout) → nothing is proven; report the output verbatim and stop before anything else touches the sheet. (after13 s2#1)
- **R9 Pre-publish row 2 matches the ADF.** Row 2 is the item-4 attachment links (one per uploaded file); there is no separate heading node (`jira-comment-adf-template.md` node order). (after13 s1#3; after14 s1#10 s2#5)
- **R10 Runtime-neutral wording.** No host tool names in non-rule lines: "the Write tool" → the agent's file-write tool; "in Chrome" → "in the browser" (`WORKFLOW.md:24,53,137,142,146`; `requirement-gates.md:15,124,129,131,153`; html-draft-template "Opening in Chrome" + chat line). (after11 s1#3; after14 s2#9)
- **R11 Chat follows the user's language.** One Discipline line: quoted chat lines are Thai examples, sent in the user's language per `user-communication.md`; deliverables (TCs, comment, Disclaimer, HTML) stay Thai. (after14 s2#7 s3#6; after15 s1#2)
- **R12 No provenance in instructions.** Drop "(owner, 2026-10-14)" at `WORKFLOW.md:284`. (after14 s3#11; after15 s3#8)
- **R13 Readable self-check.** The 4f step-0 self-check (`design-and-review.md:262-267`) is a numbered list. (after15 s1#18)
- **R14 Step 2 output has a format.** One line per AC/EC: `AC_01 → actor · action · expected outcome`, then Description facts. (after15 dim2 s2)
- **R15 Shared escalations do not override Step 7.** A line in Step 7 Go back: escalation rows in `jira-comment-post-review.md` that use MCP, a split comment or drag-and-drop, and `publish-options.md` Option B/C generic steps, do not apply; this step's failure branch and 3-round stop win. (after14 s1#4 s2#0 s3#1; after15 s1#6 s2#0)
### Skill references (`skills/procedures/tc-fe-prep-workflow/references/`)

- **R17 One Tags rule.** `qase-import-format.md:24` and `WORKFLOW.md:184` say what `:198` says: AC/EC label + full criterion text; blank only when the TC has no AC/EC label. (after13 s2#2 s3#4; after14 s1#2 s2#2 s3#3; after15 s1#1 s2#1 s3#2; code check C6)
- **R18 HTML Remark carries blocked cases.** `html-draft-template.md:343` includes the block also when a case is `BLOCKED` with no sheet row, with a `TC {ID} — BLOCKED — {Remark}` example line (design-and-review 3d). (after12 s3#12; after13 s1#4 s2#7 s3#5; after14 s1#6 s2#1 s3#8; after15 s1#4 s2#2 s3#1)
- **R19 Services cell matches the rule.** `html-draft-template.md:327`: 2+ services bold-numbered (`<b>1.</b> A <b>2.</b> B`), per `design-and-review.md:158`. (after13 s2#13 s3#21)
- **R20 Unreadable source card.** `html-pre-draft-review-template.md:387` adds a card for a present-but-unreadable source showing the link and exact error (`requirement-gates.md:92`). (after13 s1#5 s2#8 s3#18; after14 s1#7; after15 s1#5)
- **R21 Markdown template matches the rules.** `markdown-template.md:23` uses `{AC_FULL_TEXT}`; `:41` points to `design-and-review.md` Step 3 (CSV Precondition). (after11 s3#11; after13 s1#13 s2#12 s3#9; after14 s1#11 s2#6; after15 s1#9)
- **R22 Prerequisites agree with Step 7 and CSVs.** `prerequisites.md:22` scopes line 1 to the `.md` / HTML / Jira table (CSVs expand shared prep inline); `:34` fixes a failed post by PUT to the same comment id (Step 7 Go back). (after13 s1#18; after14 s3#2; after15 s1#7)
- **R23 One footer label.** `jira-formatting.md:21` uses the `WORKFLOW.md:308` label. (after13 s1#14 s2#14 s3#8; after15 s1#8 s2#10 s3#6)
- **R24 Draft-only source is the HTML draft.** `tc-final-review-report.md:24` = final approved HTML draft + workspace `.md` / export files. (after13 s1#16 s3#10; after14 s2#11; after15 s1#10 s2#3 s3#7)
- **R25 Worked example shows the current sequence.** `Status` resolved from the glossary (ที่มา = glossary); one line each for Steps 2a, 2.5, 2.6, 4f, 6.5, 7.5. (after13 s1#12; after14 s1#12 s2#12 s3#15; after15 s1#20 s3#10)

- **R16 Glossary deferral wins.** `requirement-gates.md` 2.6.3 states it overrides the generic stop rules of `tc-glossary.md:40,51` for the cases it defers to Step 4.5. (after15 s3#3)

- **R26 Don't-list separable.** `must-never.md` lists all MUST rows, then all MUST NOT rows; rows move unchanged (byte-identical). (after15 dim9 s2)

### Shared references (`references/`) — each file's bytes ≤ before; readers listed in plan.md

- **R27 Glossary ref uses the guide's values.** `tc-glossary.md:5` names the workflow's own project guide (`references/*-guide.md`, § TC glossary); `:32` writes `-o "{GLOSSARY_CSV}"`. (after11 s3#10; after13 s1#9 s2#9 s3#12; after14 s1#8 s2#13; after15 s1#13 s2#4)
- **R28 Handoff never says markdown.** `publish-options.md:88` "paste markdown" → paste the comment body. (after13 s2#6)
- **R29 Upload order current.** `publish-options.md:121`: Draft_Jira, Import_Qase, then each typed CSV (Unit, Integration, System). (after11 s3#13; after13 s1#15 s3#11; after14 s1#13; after15 s1#12)
- **R30 Typed CSV link = ADF placeholder.** `csv-export-rules.md:189-195`: typed CSVs upload in the same Pattern B call; their link is the `__ATT{n}_ID__` node, never a markdown link. (after14 s1#5; after15 s1#11)
- **R31 Fast-publish leads with the capability.** `jira-fast-publish.md:5-9`: the generic criterion first, host tool names only as examples; a 401/403 retry runs once, a second one stops with the error reported (`:169`, `:247`). (after12 s3#14; after13 s1#17 s3#20; after14 s3#14; after15 s1#17 s3#11; after15 dim3 s3)
- **R32 Closing ref does not fix a count.** `qa-closing-shared.md:10`: the skill's own QA closing list (WORKFLOW.md or SKILL.md), no "3–5 items". (after15 s2#11)
- **R33 No host-internal sources.** `bug-priority-matrix.md:116,121`: drop the `CLAUDE.md` link and "Local agent memory" lines from "Used by". (after13 s3#16; after14 s3#13)
- **R34 No stub filler.** `qa-evidence-gates.md:88-145`: 13 of the 14 "moved there" stub headings become one list of links; the MP4 stub stays, because two must-read links in other skills (`review-result-workflow/WORKFLOW.md:317`, `result-quality-gate.md:142`) use its anchor, and pointing them at `qa-evidence-capture.md` breaks skill-lint must-read-depth for 6 skills. (after13 s3#13)
- **R35 Typed-CSV spec once.** `csv-export-rules.md` typed-CSV section links `csv-template-types.md` instead of restating columns (WORKFLOW keeps the Step 6 mapping it executes). (after11 s2#3; after15 s2#9 dim7)

## Owner decisions (not changed here)

- `metadata.proactive_triggers` duplicates the description triggers (after15 dim1; after12 s3#16).
- must-never restates step rules (after11 s1#2; after13 s2#11; after14 s2#14; after15 dim7).
- Rule-line rewords: `must-never.md:57` rebuild list ("Attachments heading", no skip-note / blocked line; after13 s3#7, after15 s3#1); `must-never.md:18` ราชบัณฑิต-first vs glossary-first (after13 s1#8); Bangkok/ICT at `must-never.md:35`, `requirement-gates.md:104` (after14 s3#7, after15 s1#16); "in Chrome" in the `requirement-gates.md:49` GATE line.

## Out of scope

`quick_validate.py` needs PyYAML (environment; after11 s2#4 s3#16). Reviewer-round cuts: done in after16-tc-fe (`bf1f32f8`). Already fixed on `e5c8b164`: BOM, `_FE_TC` names, pip install, PD3, "2.5 skipped", "max 2 rounds", config questions, dependencies Qase row, PUT on fix, ADF example ATT/Remark, glossary-offline report (grader complaint).

## Edge cases

- A run that does execute a case: R1 routing line sends it to testing-ticket / retest-bug; the execution refs stay in those skills' bundles.
- Unit-only run with a BLOCKED case: R18 Remark shows both lines.
- Second 401 at publish: R31 stops; Step 7 reports Not posted.

## Done when

- Each R1–R35 edit is at the cited path; no MUST / NEVER / STOP / GATE / 🔴 line removed (helix `rule-lines: pass`).
- Shared files bytes ≤ before; helix `token-budget: pass`.
- `bash scripts/run-test-suites.sh` passes; `node tools/sdd-gate/check.js` ok.
