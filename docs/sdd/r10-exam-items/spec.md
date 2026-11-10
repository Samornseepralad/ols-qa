# Spec — r10 exam items (after-6 with-skill misses)

## Sources
- S1 after-6 grades, with-skill side resolved by `keys/*.json`: `evals/helix-skill-eval-2026-11-05-after6/grade/<skill>.json` (evidence repo `ols-qa-evidence`).
- S2 the run outputs `runs_clean/<skill>/with_skill-p?r?.md` in the same folder.
- S3 the skill text the runs read: helix `8e10230` (`CLEAN_RUN.md:7`), byte-identical to ols-qa `origin/main` for every file named below.
- S4 Owner, 10/Nov/2026: every skill passes the exit gate; criteria never loosened.

## Classification (gap = edit · variance = record only)

| # | Skill · run | Exam item (S1) | Grader evidence (S1) | Skill text (S3) | Class |
|---|---|---|---|---|---|
| 1 | tc-review p2r1, p2r2 | "BR-1 reported as conflicting with AC_01; BR-2 not mentioned at all" | "BR-2 named: 'BR-2 ... is not reported'" | `SKILL.md:140-144` says leave a non-conflicting rule out of Need Improve and no "spec notes" section; unlike the struck-through rule just above it ("not even as 'correctly not covered'") it never forbids naming the rule in a closing or self-check note. Both runs named BR-2 only in such a note. | gap |
| 2 | tc-review p2r1 | "No invented numbers in suggestions (any missing value marked confirm with dev/PO)" | "'at least 21 posts' not marked confirm with dev/PO" | `SKILL.md:220-228` covers values computed from row data, AC wording, and values no source gives; it is silent on a boundary inferred from AC wording ("past 20" → 21). The run called it "derived from 'past 20'"; p2r3 treated the same boundary as unknown. | gap |
| 3 | catch-ai p1r1 | "Does not claim 3 mistakes; states the count that survived" | "The sum of Defects and Unsourced claims is 3, which equals your claim" | `SKILL.md:97` triggers the red flag when "any tally, or their sum" equals the claim; `SKILL.md:188` then makes the agent print `Count equals the claim; re-verified once from step 1.` even when only the sum matched and the Defect tally (1) did not. p1r3 passed by adding "I did not match your count of 3". | gap |
| 4 | helix p2r2 | "If it asks, asks exactly one clarifying question" | "asks env URL/account AND Figma node of /profile" | `skills/helix/SKILL.md:39` tells the router to "Put any other missing item (URL, browser, design node) into one sentence of that question" — exactly the compound question that failed. That wording comes from owner-approved `docs/sdd/r7-skill-gaps-after5/spec.md:12` (R6, "the missing items go in one sentence") and is asserted by `tools/r7-helix-one-question/check.test.js:26`. | gap — spec conflict resolved by owner 10/Nov/2026: "แก้ R6 ตามข้อสอบ (แนะนำ)" |
| 5 | retest-bug p1r2 | "header lines … Date YYYY-MM-DD …" | "*Date:* [not in mock — fill from the run date]; not YYYY-MM-DD" | `comment-and-post.md:43` gives `*Date:* {YYYY-MM-DD}` but never says where the date comes from, so an offline run treated it as missing input. | gap |
| 6 | retest-bug p1r3 | "ONE approval request naming: comment …, transition …, assign, notify #qa-results to qa_owner_1" | "Bundle lacks assign step; notify recipient only 'resolved from the guide'" | `comment-and-post.md:346-349` lists "each assign (ticket + person, Step 8c) · each notify (channel + resolved recipient, Step 9)"; `closeout-and-notify.md:72` assigns on PASSED and FAILED; `closeout-and-notify.md:156` resolves the recipient from the ticket field before the popup. p1r1 and p1r2 passed. | variance |
| 7 | retest-bug p2r2 | "queued decision offers only A … or B … (no C confirm defect)" | "Popup lists A, B and C (confirm defect) for AC2" | `execute-and-evidence.md:187-192` forbids C for a superseded task AC and while supersession is unresolved. p2r1 and p2r3 passed. | variance |
| 8 | retest-bug p2r3 | "Design ref line names the dialog/catalogue node and 'none, asked {who} {date}' for the Archived tab" | "Design ref: 'Archived tab: none exists in the linked file' no asked/who/date" | `comment-and-post.md:41` gives the all-or-none forms and `:145` the per-case node form, but no form for a round where some screens have a node and others have none. | gap |
| 9 | tc-fe-prep p1r1 | "Step 4.5 term table has ที่มา on every row" | "term table last row Type has ที่มา '—'" | `design-and-review.md:327-330` lists every term "where a Thai-vs-English choice was made" with ที่มา glossary/fallback/user; it does not say that fixed import-field values (Qase Type/Status) are not such terms, so the run listed them and had no provenance to give. | gap |
| 10 | testing-ticket p2r3 | "VPN: required — office profile, with stop-and-report if environment unreachable in Phase D (WORKFLOW.md:146)" | "VPN: if network errors appear, re-check VPN first (no stop-and-report)" | `WORKFLOW.md:128` states stop-and-report, but the plan template `WORKFLOW.md:230` leaves the VPN note free text, so the run wrote a different consequence there. | gap |

## Rules
- R1 (item 1) — When a business rule or ticket comment does not conflict with any AC/EC, the review must not name it anywhere: not in Need Improve, not in a notes section, not in a closing or self-check line.
- R2 (item 2) — When a suggestion needs a boundary or count that the reader would infer from AC wording (e.g. "past 20" → 21) rather than read from it, the suggestion must mark that value "confirm with dev/PO"; only values stated in the AC/EC or computed from the row's own data go in unmarked.
- R3 (item 3) — When only the sum of tallies (not the Defect tally) equals the claimed number, the report must state the Defect count against the claim (e.g. "Defects: 1, not the 3 claimed") and the exit line must say which tally matched.
- R4 (item 4) — When the router must ask, its one question must ask for one item; other missing items wait for the routed workflow's own intake, never folded into the same question. Owner decision 10/Nov/2026 ("แก้ R6 ตามข้อสอบ (แนะนำ)"): r7 R6 is amended to match, and `tools/r7-helix-one-question/check.test.js` changes with it (the "one sentence" assertion becomes "one item" plus a ban on the withdrawn wording).
- R5 (item 5) — The retest header `Date:` must be the date the cases ran, written YYYY-MM-DD; in a dry run or an offline round it is the session's current date. It is never a placeholder.
- R6 (item 8) — When some screens have a design node and others have none, the `Design ref:` line must name each node with its case(s) and, for each screen without one, `none, asked {who} {YYYY-MM-DD}`.
- R7 (item 9) — Values fixed by the import format (Qase Type and Status values) are column values, not terms; they must not appear in the Step 4.5 term table.
- R8 (item 10) — When VPN is required, the plan's VPN line must state the Phase D consequence from WORKFLOW.md: environment unreachable → stop and report, nothing marked PASSED.
- R9 (items 6, 7) — No edit; the rules already exist and are stated plainly. Recorded as variance in the L9 ledger.

## Edge cases
- Item 1: a non-conflicting rule the user asks about by name — the answer to that question may name it; the review report still does not.
- Item 6/8: who to ask for a missing design is the person or channel that assigned the retest (Step 2d); unchanged.

## Done when
- Each of R1–R8 is in the file named in its row, as one changed or added sentence; for R4 also r7 R6 and its test.
- `comment-and-post.md` keeps its line numbering (`tools/retest-case-plan-rules/check.test.js` D2 pins line 330).
- `skills/tc-review-workflow/SKILL.md` is ≤ 403 lines.
- `bash scripts/run-test-suites.sh` passes and `bash scripts/check-no-secrets.sh <changed files>` is clean.
