# Spec — r7 skill gaps after after-5

Status: owner approved the direction 5/Nov 2.30 PM ("แก้สกิลที่เห็นชัด + ซ่อมตัววัดเวลา", then "แก้มาทั้งหมด"). Evidence: `ols-qa-evidence/evals/helix-skill-eval-2026-11-05-after5/` (`grade/*.json`, `data/after-5/findings.json`, `runs_clean/`).

## Rules (skill text, each one line in the named file)

- **R1 create-bug** — When the user pastes board-search results, Phase B2 shall accept them only if they show the query terms, the scope (open and closed, summary and comments) and the result per candidate; otherwise it shall re-run or ask. Source: `findings.json` create-bug-workflow#0; both frozen prompts paste results (`prompts_only/create-bug-workflow.json` ids 1, 2).
  Amended by `docs/sdd/r11-skill-fixes-g1` R4 (11/Nov/2026): a paste is accepted with the query terms, the open and closed state and a result per candidate; when it does not state that comments were searched, the Board check line says `comment scope not stated`, the agent asks once and keeps the draft, and Phase D does not create that candidate until comments are confirmed searched or the search is re-run over them.
- **R2 tc-review** — When the review still exceeds the platform limit (Discord 2,000 characters) after tightening, Step 5 item 5 shall stop, show the count and ask: split into numbered posts, or which findings to cut; nothing is sent before the answer. Source: `findings.json` tc-review-workflow#0, `skills/tc-review-workflow/SKILL.md:288-290`.
- **R3 testing-ticket** — The plan shall always show 2 parallel lanes (one account per lane, QA-L1/QA-L2) and an explicit starting-state check line. Source: after-5 grade, testing-ticket p1r1 (no starting-state check) and p1r3 (1 lane).
- **R4 tc-api-prep** — The coverage-review block shall contain an endpoint matrix table before "Ready for draft: YES", and within each module the 2xx cases shall come first. Source: after-5 grade, tc-api-prep p1r2 (no matrix) and p1r3 (TC_API_Books_19 HTTP 200 after 4xx rows).
- **R5 retest-bug** — A decision about an AC/ER that the PO superseded shall offer only A (adjust) and B (re-test); option C (confirm defect) shall not appear. Source: after-5 grade, retest-bug p2r2; rule already in PR #92 but missed in 1 of 3 runs — the task finds why.
- **R6 helix** — When it must ask, it shall ask exactly one question, and that question asks for one item; other missing items wait for the routed workflow's intake (never folded into the same question, never a numbered list of asks). Source: after-5 grade, helix p2r3; amended by owner decision 10/Nov/2026 ("แก้ R6 ตามข้อสอบ (แนะนำ)") after the after-6 grade failed helix p2r2 for asking env URL/account and Figma node in one question (`docs/sdd/r10-exam-items` R4). Earlier wording "the missing items go in one sentence" is withdrawn.
- **R7 tc-fe-prep** — Within each test-type group rows shall be ordered AC ascending, then EC ascending. Source: after-5 grade, tc-fe-prep p1r1 (AC_03 before AC_01).

## Rules (evaluation tooling, in `ols-qa-evidence`, not the public repo)

- **R8** — Each prompt of a run shall be its own agent session and the timer shall start before the agent reads any file; a run file without that is rejected by `build_data`. Source: after-5 p2 durations 2–8 s with `shared_session`.
- **R9** — After a grade file is written the main thread shall check skill name, pair count (6) and item counts against `exam/` before the file counts. Source: after-5 tc-fe-prep grade overwritten to 1 pair.

## Out of scope

- The Exit gate and the time ceiling (28/Oct owner decision) — the owner is told the ceiling is a min over noisy n=2 rounds and decides.
- Static-score differences (judge noise, unproven).

## Owner questions (defaults taken)

- Q1: R5 — if the existing rule is clear and the miss is run noise, keep the text and report it. Default: report only.
- Q2: after-6 runs only the skills changed by R1–R7 if time runs out. Default: yes.

## Done when

R1–R7 each have a test that fails first and passes after (`tools/<name>/check.test.js`), PRs merged with CI green, helix synced and `helix-parity` OK; R8–R9 implemented in the after-6 folder; `bash scripts/run-test-suites.sh` exits 0.
