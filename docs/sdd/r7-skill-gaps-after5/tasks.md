# Tasks — r7

| Task | What | Rules | Test that fails first | Done when |
| --- | --- | --- | --- | --- |
| T1 | create-bug B2 pasted-results rule | R1 | `tools/r7-create-bug-pasted/check.test.js` | green |
| T2 | tc-review Step 5 over-limit branch | R2 | `tools/r7-tc-review-limit/check.test.js` | green |
| T3 | testing-ticket 2 lanes + starting-state line | R3 | `tools/r7-testing-ticket-lanes/check.test.js` | green |
| T4 | tc-api-prep matrix + 2xx first | R4 | `tools/r7-tc-api-prep-matrix/check.test.js` | green |
| T5 | retest-bug option C miss: find cause, fix or report | R5 | `tools/r7-retest-no-c/check.test.js` | green or reported |
| T6 | helix one-question wording | R6 | `tools/r7-helix-one-question/check.test.js` | green |
| T7 | tc-fe-prep AC ascending line | R7 | `tools/r7-tc-fe-prep-order/check.test.js` | green |
| T8 | after-6 setup: timer first, one agent per prompt, grade validator | R8, R9 | selftest | folder ready |
| T9 | sync helix, parity | all | `helix-parity.sh` | OK |
