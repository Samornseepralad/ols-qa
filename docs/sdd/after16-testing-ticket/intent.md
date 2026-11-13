# Intent — after16-testing-ticket

Written in the originator's own words, before `spec.md`. Spec: docs/sdd/ai-native-sdlc-alignment R1.

## What is wanted

T9 fix lane for `testing-ticket-workflow`: close the after-15 Exit-gate P1 `testing-ticket-workflow#s2-0` at its root cause, and fix the deductions the three after-15 darwin scorings cite (score 81.8 vs best-earlier median 82.2), so the after-16 round passes for this skill.

## Why

after-15 (ols-qa-evidence `evals/helix-skill-eval-2026-11-13-after15/GATE.md:18`) failed testing-ticket on one verified P1 (`verify/testing-ticket-workflow.json`): `references/customer-escape-prevention.md:112,221` say each width runs "as its own lane", while the Phase B step 7 lane plan (`WORKFLOW.md:184` via `parallel-test-lanes.md:58`) puts one screen's widths in one unit, so one lane. The three scorings (`baseline/testing-ticket-workflow{,-s2,-s3}.json`) also deduct for: intake count drift (command lists seven, WORKFLOW six), settle-and-strategize "before the first tool call" vs Run order step 1, the two-strike loop rule vs layer-16 "3 of 3", layer 14 `code_refs` with no branch for a run without product-code access, G8 notify resend with no cap, the Jira "never draft in markdown" line vs the chat-draft rule, and one-product names (`PD3`) plus an undefined "CP grep pattern".

## Constraints

Skill text plus the result-gate checker. Never remove or weaken a gate, evidence rule or approval step; close gaps by adding the missing branch or making lines agree. Keep behaviour of the other skills that read the shared references (retest-bug, review-result, smoke, tc-fe-prep, create-bug and others). Net bytes of each touched mandatory-read file stay the same or lower. No new cost.

## Reviewed by owner on 2026-11-13

Owner directed the T9 after-15 fix lanes ("do not ask questions: decide with the best-sourced option") the same day.
