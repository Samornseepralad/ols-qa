# Spec — r6 create-bug: show the Needs Review draft; create the issue before attaching images

Status: R1–R4 owner-approved 2026-10-28 (decision: a Needs Review candidate is shown as a draft, labelled, not filed) ·
R5–R8 from the round-6 root-cause note (Jira Cloud OpenAPI, read 2026-11-05) · skill text only · no env access

## Why

1. Round-5 close, after-4 grade: `create-bug-workflow` lost 5 expected items (p1 #2 #4 #5, p2 #4 #5) because
   `skills/create-bug-workflow/SKILL.md:46` and `skills/procedures/create-bug-workflow/WORKFLOW.md:232-234` say a Needs Review
   candidate is "not drafted", so the user never sees the draft.
2. `WORKFLOW.md:324` says "Attach screenshots to Jira before embedding them", but the attachments endpoint is
   `POST /rest/api/3/issue/{issueIdOrKey}/attachments` ("The ID or key of the issue that attachments are added to"), so for a
   brand-new bug (no key yet) the order cannot be followed.

## Rules

- **R1** — เมื่อ candidate ถูกติด **Needs Review** ในเฟส E ระบบต้องร่าง body ตาม bug-draft-template แล้วแสดงใต้ confirm block
  ติดป้าย `Needs Review — not filed` พร้อมคำถามที่ค้าง; ต้องไม่ข้ามการร่างเพราะ Needs Review.
  (source: `WORKFLOW.md:232-234`, `SKILL.md:46`; owner decision 2026-10-28, `rootcause-create-bug-after4.md` option b)
- **R2** — The system must not file, create or count a Needs Review candidate: `confirm` creates only Confirmed/Likely
  items; the `Bug count` line counts only those. (source: `WORKFLOW.md:253-254`, `:268`)
- **R3** — When the user answers a Needs Review question, the system must re-check that candidate in Phase E and, if it becomes
  Confirmed or Likely, show the Phase C confirm block again before any create. (source: `WORKFLOW.md:234,239`)
- **R4** — When every candidate is Dropped the system writes no draft; when every remaining candidate is Needs Review it must
  still show the labelled drafts and ask for the answers (not `confirm`). (source: `SKILL.md:46`)
- **R5** — When filing a NEW bug that needs screenshots, the system must create the issue first with a body that has no
  image embed, then upload the attachments to the returned key, then update the body to embed them bare (`!file.png!`),
  then re-fetch the issue and verify the embeds rendered. "Attach before embed" applies only to an issue that already
  has a key. (source: `WORKFLOW.md:324`; Jira Cloud OpenAPI `issueIdOrKey`, B-rootcause.md section 9)
- **R6** — When the issue was created but an attachment upload fails (any non-2xx), the system must show the error
  verbatim, tell the user the issue key that now exists, and ask: retry / leave the image out (embed line removed, shown
  again for confirm) / attach by hand; it must not continue on its own. (source: `WORKFLOW.md:327-331`)
- **R7** — The system must keep embeds bare (`!file.png!`, no width parameter) and run the retest-guard `img-width-param`
  scan (or check by hand and say so). (source: `WORKFLOW.md:324,330-331`)
- **R8** — `references/bug-draft-template.md:90` ("attach to the issue first") must agree with R5 for a new bug.
  (source: `bug-draft-template.md:90`)

## Not changed / BLOCKED part

- Frozen expected items are not edited. Items p1 #2 ("Board check 1 searched / 0 dropped / 1 to file, Bug count 1") and
  p2 #4 ("… 3 searched / 1 dropped / 1 to file, Bug count 1") need a Needs Review candidate to count as "to file";
  R2 (owner decision: nothing is filed until answered) says it is not counted. That count part is BLOCKED for the owner.

## Done when

- R1: WORKFLOW Phase E Needs Review rule says "drafted and shown, labelled Needs Review — not filed".
- R2: confirm-block text says Needs Review is excluded from `Bug count` and from `confirm`.
- R3: the go-back line still re-checks and re-shows the confirm block.
- R4: SKILL.md:46 no longer says Needs Review writes no draft.
- R5: WORKFLOW images paragraph has the create → attach → update-embed → re-fetch order and the "has a key" scope.
- R6: the issue-created-attach-failed branch names the key and the three choices.
- R7: bare-embed and `img-width-param` sentences still present.
- R8: bug-draft-template line agrees with R5.
- `bash scripts/run-test-suites.sh` exits 0.
