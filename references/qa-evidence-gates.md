# QA evidence gates (before completion claims)

Adapted from evidence-before-claims discipline for **QA deliverables**. Use with [verify-closing-checklist.md](verify-closing-checklist.md).

## Contents

- [Gate function](#gate-function)
- [Claim → evidence map](#claim--evidence-map)
- [Related: moved sections](#related-moved-sections)
- [MP4 evidence — 7-layer quality + correctness defense gate (mandatory, fail-closed)](#mp4-evidence--7-layer-quality--correctness-defense-gate-mandatory-fail-closed)
- [Wording red flags](#wording-red-flags)
- [Workflow pointers](#workflow-pointers)
- [Evidence must be a real FE screen — a raw-data page is never evidence](#evidence-must-be-a-real-fe-screen--a-raw-data-page-is-never-evidence)

## Gate function

Before claiming **passed**, **posted**, **created**, **retest complete**, or **tests done**:

1. **IDENTIFY** — What check proves this? (command, URL re-read, file exists)  
2. **RUN** — Execute it fresh in this session (not an earlier turn)  
3. **READ** — Full output or visible UI state  
4. **MATCH** — Does evidence support the exact claim?  
5. **CLAIM** — State result **with** evidence snippet or path  

Skip a step → treat as unverified.

## Claim → evidence map

| Claim | Requires | Not sufficient |
|-------|----------|----------------|
| Playwright / tests passed | Test runner exit 0 + summary shows 0 failed for in-scope tests | “Should pass”, prior run, agent said success |
| Playwright failed | Failing test name + log/trace path or screenshot | Vague “broken” |
| Jira comment posted | GET issue or open UI — body visible, row count matches draft, **no literal `<br>`/HTML**, numbered items on own lines, CSV attached if generated | POST API 201 only, MCP “success”, unchecked comment |
| Jira transition done | Issue status in UI/API matches target transition | Transition API called once |
| CSV/Excel exported | File exists in workspace + row count = approved table | Wrote path without opening file |
| Retest PASSED | Evidence in comment matches checks in [retest-fix-intake.md](retest-fix-intake.md) plan | Dev said fixed |
| Retest FAILED | Failing check documented with evidence | Assumed still broken |
| Bug created | Issue URL returns title + body matching approved draft | Create API returned id only |
| Coverage review complete | Posted review block with **Ready for draft: YES** + coverage delta | “Looks complete” |
| Environment reachable | URL load or curl returns expected status (not CF block) | VPN “should” work |

## Related gates (split into their own files)

- Capture scope, still spec, MP4 7-layer gate → [qa-evidence-capture.md](qa-evidence-capture.md)
- Re-recording delivered evidence (R1–R6) → [qa-evidence-rerecord.md](qa-evidence-rerecord.md)
- AC/EC & bug-detail coverage, pre-delivery 7-layer gate → [qa-evidence-coverage.md](qa-evidence-coverage.md)

## Wording red flags

Do not use without fresh evidence in the **same** turn:

- should, probably, seems, likely, I believe  
- Done!, Perfect!, Great!, Successfully! (before gate 5)  
- Posted (without URL re-read)  
- All tests pass (without runner output)

## Workflow pointers

| Workflow | Extra gate |
|----------|------------|
| TC FE / API | Coverage review YES + delta before full draft; TC FE also requires Step 7.5 four-axis final report **PASS** before close |
| Testing ticket | Playwright preflight YES before run (see also [playwright-preflight.md](playwright-preflight.md), linked from that skill's SKILL.md); F1–F3 before external update; **pre-delivery 7-layer gate green before any post/sheet/notify** |
| Retest | Plan posted before execute; v2/v3 format locked; **pre-delivery 7-layer gate green before the comment goes out** |
| Create bug | Phase C confirm before create; URL verify after |
| Re-record delivered evidence | **R1–R6 above**: read the old run's own result, prove the ER is demonstrable before the take, budget single-use fixtures, assert in the recorder, replace by file id, read back and compare |
| Catch AI (audit) | Coverage reconciliation (enumerated == classified) before drafting; **pre-delivery 7-layer gate green — read as a second QA or another AI with only the report — before the audit is shown**; every root cause carries a [root-cause-investigation.md](root-cause-investigation.md) confidence label |

## Evidence must be a real FE screen — a raw-data page is never evidence

Every evidence file, whatever the format, must show **only real front-end screens of the system under
test**. One frame that is not a system screen fails the item outright: re-capture it, never trim it
out, then review the whole file again before delivering.

Never acceptable in evidence:

- a browser page showing a raw API response (JSON, a `Pretty-print` toggle, a body starting `{"items":[`)
- developer tooling — DevTools, Network, Console, a terminal, an API client
- any application that is not the system under test, the desktop, an editor
- a blank page, a stuck loading state, or a half-rendered screen — **check the last frame of every clip**

If what the case needs to prove has no screen that shows it, use the screen that surfaces the same
value (a count rendered on a detail page, a status chip, a toast). If none exists, the case is
**BLOCKED and goes to the PO** — a raw-data page is not a substitute.

## Related: moved sections

These sections moved; follow the link:

- [Story-testing evidence-completeness gate (5-step, per story)](qa-evidence-capture.md#story-testing-evidence-completeness-gate-5-step-per-story)
- [Capture scope — every role, every step, every target the ticket names](qa-evidence-capture.md#capture-scope--every-role-every-step-every-target-the-ticket-names)
- [Capture red flags — STOP, this recording is not evidence yet](qa-evidence-capture.md#capture-red-flags--stop-this-recording-is-not-evidence-yet)
- [Still spec — the screenshots carry most of the verdicts, so they get a floor too](qa-evidence-capture.md#still-spec--the-screenshots-carry-most-of-the-verdicts-so-they-get-a-floor-too)
- [Capture spec — the pipeline layers 1 / 1b / 1c are measured against](qa-evidence-capture.md#capture-spec--the-pipeline-layers-1--1b--1c-are-measured-against)
- [Re-recording evidence that was already delivered — 6-layer gate (mandatory, fail-closed)](qa-evidence-rerecord.md#re-recording-evidence-that-was-already-delivered--6-layer-gate-mandatory-fail-closed)
- [Why R2 exists — the shape it keeps catching](qa-evidence-rerecord.md#why-r2-exists--the-shape-it-keeps-catching)
- [Fixture selection when the demonstration burns the fixture](qa-evidence-rerecord.md#fixture-selection-when-the-demonstration-burns-the-fixture)
- [Replacing the delivered file without breaking anything](qa-evidence-rerecord.md#replacing-the-delivered-file-without-breaking-anything)
- [AC/EC & bug-detail coverage — 7-layer completeness defense gate (mandatory, fail-closed)](qa-evidence-coverage.md#acec--bug-detail-coverage--7-layer-completeness-defense-gate-mandatory-fail-closed)
- [Coverage red flags — STOP, you are about to pass on partial coverage](qa-evidence-coverage.md#coverage-red-flags--stop-you-are-about-to-pass-on-partial-coverage)
- [Pre-delivery completeness — 7-layer defense gate (before handing results to the requester)](qa-evidence-coverage.md#pre-delivery-completeness--7-layer-defense-gate-before-handing-results-to-the-requester)
- [Adversarial review pass — read your own deliverable as the reviewer hunting for the shortcut](qa-evidence-coverage.md#adversarial-review-pass--read-your-own-deliverable-as-the-reviewer-hunting-for-the-shortcut)

## MP4 evidence — 7-layer quality + correctness defense gate (mandatory, fail-closed)

See also [qa-evidence-capture.md](qa-evidence-capture.md#mp4-evidence--7-layer-quality--correctness-defense-gate-mandatory-fail-closed) — this section moved there.
