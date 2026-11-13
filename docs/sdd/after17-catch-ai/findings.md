# Findings ledger — after17-catch-ai

Columns: id · source (round/scorer, level; `D` = darwin deduction) · state at origin/main `e5c8b164` · rule · fix (`path:line` and commit are filled in the code PR description). States: OPEN, FIXED-BEFORE (already fixed, pinned), #250 (fixed by ols-qa PR 250), OUT.

| id | finding | source | state | rule |
|---|---|---|---|---|
| CA-1 | NOT-for clause names skill ids only (SKILL.md:6) | a12 s1 P3, s3 P2; a13 s3 P3; a15 s1/s3 P3 | OPEN | R1 |
| CA-2 | command description carries no trigger phrases (catch-ai.md:3) | a11 s1/s2/s3; a12 s2 | OPEN | R1 |
| CA-3 | command NOT-for omits tc-review (catch-ai.md:4) | a13 s2 P2 | OPEN | R1 |
| CA-4 | command "before reading anything" vs SKILL.md:20 (catch-ai.md:9) | a13 s1 P3, s2 P2 | OPEN | R1 |
| CA-5 | Refusal-first is not first in the checklist (SKILL.md:46-47) | a13 s2 P2 | OPEN | R2 |
| CA-6 | Dependencies section sits last, checklist runs it first (SKILL.md:264) | a15 s2 P3 | OPEN | R2 |
| CA-7 | "Copy this block" vs host todo list (SKILL.md:41, 239) | a13 s1 P3 | OPEN | R2 |
| CA-8 | sections interleave step numbers, order must be rebuilt | a14 s2 D2; a15 s2 D2 | OPEN | R2 |
| CA-9 | Refusal-first has no 🔴/STOP marker (SKILL.md:81) | a11 s2 P2; a13 s1 P3 | OPEN | R3 |
| CA-10 | scope fixed by the agent alone, no correction point (SKILL.md:91) | a13 s3 P3 | OPEN | R3 |
| CA-11 | CHECKPOINT has no branch for decline / no answer (SKILL.md:105) | a15 s1 P2 | OPEN | R3 |
| CA-12 | non-pass-challenge-gate § 4 waits for a decision, SKILL.md silent (SKILL.md:253) | a15 s2 P2 | OPEN | R3 |
| CA-13 | `Procedure [high freedom]` label (SKILL.md:89) | a13 s2/s3; a15 s1/s2 | OPEN | R4 |
| CA-14 | step 4 packs inspection, read-only rule, approval in one chain (SKILL.md:94) | a12 s2 P3 | OPEN | R4 |
| CA-15 | hedged conclusion counts in Defects but tally label says "actual ≠ sourced expected" (SKILL.md:96-97) | a13 s3 P3 | OPEN | R4 |
| CA-16 | 600+ char single-line rules: exit rule, flaky/evidence cases, layer map, read groups | a11 s1/s2/s3; a12 s3; a13 s1; a14 s1/s2/s3; a15 s2/s3 | OPEN | R4 |
| CA-17 | count-survives / hedge rule restated in many sections | a11-a15 P2/P3, D7 | OPEN (command copy); other copies verified pointers | R4 |
| CA-18 | N/A test sits at the end of the gate section (SKILL.md:201) | a13 s1 P2 | OPEN | R5 |
| CA-19 | checker exits 2 on an audit input: no branch (SKILL.md:186-194) | a13 s3 P1, s2 P2 | OPEN | R5 |
| CA-20 | whose result lines an audit writes is unsaid (SKILL.md:187) | a13 s3 P2 | OPEN | R5 |
| CA-21 | layers 14 step 6 / 18 / pre-run layers vs the read-only rule | a15 s1 P2; a14 s3 P2 | OPEN | R5 |
| CA-22 | checker arguments elided (SKILL.md:188) | a13 s1 P3 | OPEN | R5 |
| CA-23 | no rule for a target spanning read groups (SKILL.md:251) | a11 s1 P2 | OPEN | R6 |
| CA-24 | every-audit reads not marked skippable for a document-only audit | a15 s2 P3; a11 s3 P2 | OPEN | R6 |
| CA-25 | conditional refs carry write steps, not marked out of scope | a15 s3 P3 | OPEN | R6 |
| CA-26 | Dependencies omit Atlassian MCP / Figma rows | a14 s1 P3 | OPEN | R6 |
| CA-27 | reference.md PASSED row vs bug-priority-matrix § Hard rule on coverage gaps (reference.md:75) | a15 s3 P2; a14 s2 P2 | OPEN | R7 |
| CA-28 | skill-routing.md:65 "rewrite the audited work" vs CHECKPOINT | a15 s1 P3 | OPEN | R7 |
| CA-29 | bug-priority-matrix "Used by" omits catch-ai (shared, #250 file) | a15 s3 P3 | OPEN | R7 |
| CA-30 | qa-evidence-capture.md:52 one product's role ids | a14 s3 P3 | OPEN | R8 |
| CA-31 | qa-evidence-coverage.md:69 "an OLS bug", out-of-repo tool without fallback | a13 s2 P2, s3 P3; a14 s1 P2 | OPEN | R8 |
| CA-32 | dependencies.md:49 debugging fallback, host-specific install hint | a14 s2/s3 P3 | OPEN | R8 |
| CA-33 | root-cause-investigation § 1 browser sweep has no document-audit mapping | a15 s3 P2 | OPEN | R8 |
| CA-34 | customer-escape-prevention.md:217 and :228 duplicate rows | a14 s3 P3 | OPEN | R8 |
| CA-35 | one-product env term "PD3" in shared refs | a13 s3 P3; a15 s1/s2 P3 | FIXED-BEFORE (0 hits) | R8 |
| CA-36 | hedge grep: word boundaries, 6 banned terms, "same family" | a13 s2/s3; a14 s1/s2/s3 | FIXED-BEFORE (SKILL.md:117) | R9 |
| CA-37 | layer 5 unreachable for a document audit | a13 s2 P1 | FIXED-BEFORE (SKILL.md:243) | R9 |
| CA-38 | qa-evidence-gates.md:70 vs conditional coverage read | a12 s1/s2/s3 | FIXED-BEFORE (SKILL.md:242) | R9 |
| CA-39 | report template lacks count line, Unsourced section, root-cause label, gate line | a15 s1 P1, s2, s3 | FIXED-BEFORE (reference.md:170-175; after16-catch-ai) | R9 |
| CA-40 | MUST/NEVER Because column; rationalizations run-on | a11-a12 | FIXED-BEFORE (SKILL.md:155-166, 222) | R9 |
| CA-41 | two `Verdict:` lines | a13 s3; a14 s1/s2/s3 | FIXED-BEFORE (SKILL.md:216) | R9 |
| CA-42 | "(9 steps — keep the todo list)" | a12 s2/s3 | FIXED-BEFORE (SKILL.md:239) | R9 |
| CA-43 | reference.md:76 `§ PWMI` points to no heading | a13 s3 P3 | OPEN | R7 |
| CA-44 | defect-report-completeness repro matrix / resolution options absent | a14 s3 P2 | FIXED-BEFORE (SKILL.md:253) | R9 |
| CA-45 | session-closing Catch AI row; verify-closing skip; qa-evidence-gates stubs and local-memory line; pre-run capture tools dependency; 20-layer gate on a document | a12 s1/s3; a13 s2/s1; a14 s3 | FIXED-BEFORE / #250 | R9 |
| CA-46 | quick_validate.py needs PyYAML | a11 s1 P2; a12 s2 P3 | OUT (env; verified with venv) | - |
| CA-47 | hedge grep matches normative "should be"; a Correction needs a plain form | a14 s2 P2 | OPEN | R4 |
| CA-48 | proactive_triggers key | owner 13/Nov | OUT (main thread, cross-skill) | - |
