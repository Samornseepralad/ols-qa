# Spec — r11 T9 rubric uplift, lane A

## Sources
- S1 Locked-bundle scorings of the current text (helix `d1616ba`): `evals/helix-preflight-2026-11-11/{create-bug,tc-fe-prep,testing-ticket}-workflow/score-1.json` (`ols-qa-evidence`, pre-flight worktree; retest-bug's scoring was not finished when this spec was written, its soft-wording list was).
- S2 Locked-bundle scorings of the best-earlier text: `evals/helix-skill-best-rescore-2026-11-11-bundle/<skill>/score-{1,2,3}.json` (`ols-qa-evidence` main).
- S3 Rubric: darwin-skill SKILL.md lines 30–107 as cited by `evals/helix-skill-eval-2026-11-10-after9/BRIEF.md:11-12` — dim5: "≥ 3 soft phrases → −3"; dim7: "−1 per redundancy"; dim3: explicit "if X fails → Y".
- S4 Frozen exam `evals/helix-skill-eval-2026-11-10-after9/exam/<skill>.json`. Items that pin text touched here: create-bug "ONE grouped message", "Maximum 2 fix-verify rounds … Stops after round 2"; tc-fe-prep "post-review max 3 rounds"; testing-ticket "ONE grouped message (WORKFLOW.md:160)".
- Every line below was re-read on ols-qa `origin/main` `42088dc8`.

## Rules

Each rule: the scorer's reason (S1 unless marked S2), the line, the expected dim it lifts.

### Shared references (in the bundle of all four skills unless noted)
- **R1** `references/jira-comment-post-review.md:83` — S1 create-bug dim5 "consider ADF for large tables" (soft hit) and P1 dim7 "delete comment, re-post" vs `jira-wiki-vs-markdown.md:69` "edit in place". When a re-read shows missing rows or a truncated table, the fix must PUT the full corrected body to the same comment id; when the re-read still truncates, the body must go as ADF (v3) unless the session has locked the format, in which case the corrected body is handed to the user. The row must not say "consider" or "delete". Lifts dim5, dim7.
- **R2** `references/jira-comment-post-review.md:42-43` — S1 testing-ticket soft hits "(if applicable)" ×2. Each line must state its condition: "when the approved draft has one". Lifts dim5.
- **R3** `references/jira-comment-post-review.md:106,109` — S1 create-bug P2 "switch to ADF via browser conflicts with the session v2/v3 lock"; P1 "Delete comment → re-post". The `<br>` and bold escalation rows must edit the same comment in place and switch format only when the session has not locked v2/v3; otherwise hand the corrected body to the user. Lifts dim7, dim3.
- **R4** `references/jira-comment-post-review.md:18`, `references/skill-rules-style.md:20`, `references/agent-rationalizations.md:56` — S1 create-bug P2 / testing-ticket P2 "fix-verify cap 2 vs 3". The caps are two different loops and both are exam-pinned (S4). Each line must name its loop: the posted-comment re-read loop of jira-comment-post-review = max 3 rounds; the generic side-effect fix-verify of skill-rules-style = max 2 rounds unless the workflow's own step states a cap (which then wins). No number changes. Lifts dim7, dim5.
- **R5** `references/jira-linebreak-conversion.md:50` — S1 create-bug P1 "delete comment, re-convert, re-post". Must read: re-convert and PUT the corrected body to the same comment id (edit in place). Lifts dim7.
- **R6** `references/session-closing.md:29-31` — S1 soft hit "when relevant"; header "Suggest". The next-step line must come from the table; when the finished workflow has no row, write `Next: none`. Header becomes "Next step (one line)". Lifts dim5.
- **R7** `references/skill-rules-style.md:23` — S1 soft hit "**SHOULD** for any approved draft the user will paste to executives". Must become a MUST with its condition (the user says the draft goes to executives or management). Lifts dim5.
- **R8** `references/verify-closing-checklist.md:10` — S1 testing-ticket soft hit "where applicable". Must name the condition: a destination re-read for every external write (post, create, upload, sheet or page update). Lifts dim5.
- **R9** `references/workspace-guide-discovery.md:52,54` — S1 create-bug P2 / testing-ticket P2 "one question at a time" vs Phase A "one grouped message", and template `project-config-template.md` that create-bug and testing-ticket do not ship; S1 retest soft hit "if needed". The no-guide step must defer to the workflow's own intake rule and name each template: retest-bug and tc-fe-prep `references/project-config-template.md`, one question at a time (retest `WORKFLOW.md:175`); testing-ticket `references/workspace-guide-template.md` and create-bug WORKFLOW Phase A, all missing fields in one grouped message. "(create the file if needed)" → "(create the file when it does not exist)". Lifts dim2, dim6, dim5.
- **R10** `references/non-pass-challenge-gate.md:132,137` — S1 retest soft hits "You may proceed", "you may continue". Must read as imperatives with the same condition ("Proceed to the verdict / bug", "For a clearly-confirmed C, continue"). Lifts dim5 (retest, testing-ticket).
- **R11** `references/bug-priority-matrix.md:77-78,81-82` — S1 testing-ticket P1 "coverage gap … PASSED, with the caveat" contradicts `customer-escape-prevention.md:92-95` (a caveat ⇒ never PASSED); P3 "local agent memory `feedback_verdict-rubric`" is not shipped. A coverage gap must be `BLOCKED` with its reason, never PASSED with a caveat (the stricter existing rule wins); the BLOCKED/SKIPPED pointer must link shipped files (`qa-evidence-gates.md`, `customer-escape-prevention.md`). Lifts dim7, dim6 (testing-ticket, retest).
- **R12** `references/dependencies.md:63` — S1 testing-ticket P1 "notify only on an explicit share request" vs `results-update.md` G8 "mandatory when a channel is configured". The row must say: tc-review every run; testing-ticket when the project guide configures a QA notify channel (results-update G8); retest-bug per its closeout; every other workflow only on an explicit share request. Lifts dim3, dim7.
- **R13** `references/playwright-preflight.md:14-15`, `references/round-time-contract.md:57` — S1 testing-ticket P1 / S2 retest dim3 "dead session: log in fresh vs SESSION-DEAD". A failed session probe must return `SESSION-DEAD {account tag}` and be recovered by login-by-command on the main thread (`parallel-test-lanes.md` §3 *Dead session*); the agent never logs in itself. Lifts dim3, dim7 (testing-ticket, retest).
- **R14** `references/parallel-test-lanes.md:40-41,126-127` — S1 testing-ticket P2 "plan (shown, then run — no mid-run confirm gate)" is the retest flow; P3 L126-127 repeats L124 with stale "windows". The parent line must say testing-ticket waits for the Phase C confirm, retest shows then runs; L126-127 deleted. Lifts dim2, dim7.
- **R15** `references/parallel-prep.md:21` — S1 testing-ticket P3 "Phase A intake" vs WORKFLOW Phase B. Must say "intake or context load (testing-ticket: Phase B)". Lifts dim2.
- **R16** `references/test-execution-plan-template.md:62` — S1 testing-ticket P3 "No blocker labels without user ack" implies a mid-run wait. Must say every BLOCKED row carries its cause and is queued for the end decisions popup. Lifts dim4.

### create-bug-workflow
- **R17** `skills/create-bug-workflow/SKILL.md:49` — S1 P1 "says qa-closing-shared includes the cross-ticket conflict check … qa-closing-shared.md:24 says testing-ticket and retest-bug only". Must say the cross-ticket check does not apply here (Phase B2 is the board check). Lifts dim7, dim6.
- **R18** `skills/procedures/create-bug-workflow/WORKFLOW.md:359-366` — S1 P1 dim3 "Phase F has no branch for a created issue whose URL/key cannot be fetched". Add: fetch fails → report the key/URL from tool output as created-unverified with the error verbatim, retry once by another read path, else `Verdict: CREATED n/N — m unverified`; never claim verified. Lifts dim3.
- **R19** `WORKFLOW.md:123,134` — S1 P3 dim4 "A3 hold and A1–A3 Wait are hard stops but not marked". Prefix both with `🔴 STOP —`. Lifts dim4.
- **R20** `WORKFLOW.md:374` — S1 P3 dim7 "two verdict formats". Add one line: the `CREATED n/N` line is create-bug's form of session-closing §5 `Verdict:`. Lifts dim7.

### tc-fe-prep-workflow
- **R21** `skills/tc-fe-prep-workflow/SKILL.md:58` — S1 dim6 evidence "including the cross-ticket conflict check" vs `qa-closing-shared.md:24`. Same fix as R17. Lifts dim6, dim7.
- **R22** soft wording in skill files — S1 dim5 "ac-ec-coverage-review.md:25,26 'may'; jira-formatting.md:77 'may require'; tc-final-review-report.md:69 'may', :93 'suggestions'". Each becomes the condition it stands for, same meaning. Lifts dim5.
- **R23** `references/qase-import-format.md:74` — S1 dim7 "'9-column markdown table'" while `markdown-template.md:21` has 10 columns and `markdown-template.md:33` says "same 10-column schema". Must say the comment table keeps its own schema (link markdown-template) without a column count. Lifts dim7.

### testing-ticket-workflow
- **R24** `skills/procedures/testing-ticket-workflow/execute-and-summarize.md:24`, `WORKFLOW.md:331`, `references/parallel-test-lanes.md:211` — S1 P2 "NOT TESTED still allowed" vs `result-quality-gate.md:48` and `qa-evidence-gates.md:343` (no id left NOT TESTED). The status list is PASSED / PWMI / FAILED / BLOCKED; a scenario not run is `BLOCKED` with its reason. Lifts dim7, dim5.
- **R25** `skills/procedures/testing-ticket-workflow/references/playwright-discipline.md:40` — S1 P3 "reuse storageState only when the user confirms" adds a mid-run wait. Must reuse after the session probe returns the expected user id (WORKFLOW Phase D *Login reuse*). Lifts dim5, dim4.

### retest-bug-workflow
Retest gains come from R1–R5, R7, R9–R11, R13 (all in its bundle; S1 soft list: jira-comment-post-review:83, skill-rules-style:23, non-pass-challenge-gate:132,137, session-closing:29, workspace-guide-discovery:54 — six hits, all removed).

### Test
- **R26** A rule-text test `tools/r11-t9-uplift-a/check.test.js` must fail on the unchanged text and pass after R1–R25: each removed soft phrase or contradicting sentence is absent at its file, and each new sentence is present.

## Rejected or deferred (re-read, not edited)
- create-bug dim1 "WORKFLOW.md repeats the SKILL.md description" — deferred: frontmatter of WORKFLOW.md may be read by tooling (`tools/skill-structure`); changing it is outside a text-only uplift.
- create-bug P2 `bug-draft-template.md:3` (Why-failed line / §5 gate), worked-example `:12`, `:17`, posting-discipline `:6` module label — deferred: each changes a draft template or example and needs its own spec.
- tc-fe-prep dim7 "TC_ prefix", "10-column typed CSV", "Option C Full markdown in chat", round caps in design-and-review (no cap) vs tc-quality-standards (2) — deferred: the canonical schema must be confirmed against `design-and-review.md` Step 3 first; no blind edit.
- testing-ticket P2 `no-wait-decision-gate.md:80` delegation exception — deferred: owner decision (what counts as delegation).
- testing-ticket P2 duplicated bash blocks (WORKFLOW.md:270-282 = parallel-test-lanes.md:110-122) — deferred: the WORKFLOW copy is pinned by login-by-command tests (`tools/login-window-rule`); de-duplicating needs the owner.
- testing-ticket P3 portability (PD3, CF_BYPASS) — deferred to a portability spec.

## Done when
- R1–R25 text is in place on the code PR and R26 passes; it failed before.
- `bash scripts/run-test-suites.sh`, `node tools/skill-lint/lint.js`, `bash scripts/check-no-secrets.sh <changed files>`, `node tools/sdd-gate/check.js --base origin/main` are green.
- No exam-pinned behaviour (S4) is removed; no freeze test is edited.
