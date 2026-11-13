# Spec — after16-testing-ticket

Sources: ols-qa-evidence `evals/helix-skill-eval-2026-11-13-after15/` — `GATE.md:18`, `verify/testing-ticket-workflow.json` (`#s2-0` CONFIRMED), darwin scorings `baseline/testing-ticket-workflow.json` (k1), `-s2.json` (k2), `-s3.json` (k3). Line numbers refer to helix `7b126d1`, same text at ols-qa origin/main `3bbc3b18`.

## Rules

- **R1 Widths are rows, not lanes.** When a reference states how in-scope widths are run, it must say each width is its own **row** (plan and results) and must not say each width is its own lane; it must name that one screen's widths share that screen's unit and lane (`parallel-test-lanes.md` §2). Applies to `customer-escape-prevention.md:112` and `:221` (source: verify `#s2-0`; agrees with `WORKFLOW.md:226,409`, `parallel-test-lanes.md:58`, retest `WORKFLOW.md:285`).
- **R2 Settle order matches Run order.** `settle-and-strategize.md` must say settle runs after the session-start context skills and before any other tool call (source: k1/k3 P3 `settle-and-strategize.md:3` vs `WORKFLOW.md:53-54`).
- **R3 Two-strike rule vs reproduction.** `settle-and-strategize.md` §4 must state that reproducing a product FAILED to the layer-16 count (3 of 3) is not a blind retry; the two-strike stop still covers tool, login and empty-result failures (source: k3 P2 `settle-and-strategize.md:29` vs `result-quality-gate.md:193`).
- **R4 Intake count agrees.** `commands/testing-ticket.md` must list the six Phase A fields and say the design (Figma) reference is gathered at Phase B (source: k1/k2/k3 P3 `commands/testing-ticket.md:3` vs `:9`, `WORKFLOW.md:131`).
- **R5 G8 resend has an exit.** When the notify helper returns the same skip or transport-unavailable result twice after the input was re-checked, the run must stop retrying (settle-and-strategize §4), put `Notify: NOT sent — {checked cause}` on the G7 line and ask the owner; the round must stay open until the send succeeds (source: k2 P2 `results-update.md:211`).
- **R6 Layer 14 with no code access.** When the run has no read access to the product repository, a BLOCKED or FAILED line must carry `code_refs: ["not checked — no repo access ({who can grant it})"]`; the checker must accept exactly that form in place of a `path:line` and must still refuse an empty or free-text `code_refs`; `ticket_refs` stays required (source: k1 P1, k2/k3 P2 `result-quality-gate.md:180`; mirrors `root-cause-investigation.md` "not checked" rule).
- **R7 Jira draft vs post body.** `jira-wiki-vs-markdown.md` must say the markdown chat draft shown for review is not the post body, and the post body is written in the endpoint's syntax before posting — so it agrees with `jira-linebreak-conversion.md:5,37-41` and `results-update.md:60`; the existing "Never draft in markdown" line stays (source: k2/k3 P2 `jira-wiki-vs-markdown.md:8`).
- **R8 Portable wording.** `playwright-preflight.md` and `qa-debug-discipline.md` must not name one product's environment (`PD3`); `playwright-preflight.md:8` must not cite the undefined "CP grep pattern" (source: k1 dim5, k2 P2/P3, k3 P2).
- **R9 Size and other readers.** Every touched mandatory-read file's bytes after ≤ before; no MUST / NEVER / 🔴 / STOP / GATE meaning is removed (a reworded rule line is listed for the helix rule-line register); every other skill that reads a touched reference keeps its behaviour (source: owner T9 rule, brief §4).

## Out of scope

Narrow-width rows BLOCKED by construction (k1 P1 `qa-evidence-capture.md:115`): needs a recorder/capture-spec change, reported to the main thread. Bundle size / architecture (dim7), bug question asked twice (k3 P3), timing (reported separately).

## Done when

- R1: `grep -n "own lane" references/customer-escape-prevention.md` returns nothing and both lines say "own row".
- R2–R3: settle-and-strategize names the session-start skills and the layer-16 exemption.
- R4: command lists six fields; Figma at Phase B.
- R5: G8 bullet names the two-strike stop and the `Notify: NOT sent` line.
- R6: new check.test.js cases pass (accepted form; free text refused); layer 14 text names the form.
- R7, R8: lines changed as stated.
- R9: byte table in the code PR; `bash scripts/run-test-suites.sh` and `node tools/sdd-gate/check.js` green.
