#!/usr/bin/env node
'use strict';
// Rule-text test (spec docs/sdd/r12-p1-retest R1–R4, R7): after-9 P1 retest-bug-workflow#0 and #1.
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const rd = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const flat = (s) => s.replace(/\s+/g, ' ');
let fail = 0;
function t(name, fn) {
  try { fn(); console.log(`PASS  ${name}`); } catch (e) { fail += 1; console.log(`FAIL  ${name}\n      ${e.message}`); }
}
const P = 'skills/procedures/retest-bug-workflow/';
const STUB = 'skills/retest-bug-workflow/SKILL.md';
const WF = `${P}WORKFLOW.md`;
const EX = `${P}execute-and-evidence.md`;
const CP = `${P}comment-and-post.md`;
const BUNDLE = [STUB, WF, EX, CP, `${P}closeout-and-notify.md`];
const count = (re) => BUNDLE.reduce((n, f) => n + (flat(rd(f)).match(new RegExp(re.source, 'g')) || []).length, 0);
const once = (re, where) => {
  const n = count(re);
  assert.strictEqual(n, 1, `${re} appears ${n}× across the retest bundle (want exactly 1)`);
  assert.ok(re.test(flat(rd(where))), `${re} is not at its kept place ${where}`);
};
const lines = (p) => rd(p).split('\n');
const lineWith = (p, re) => lines(p).find((l) => re.test(l)) || '';

// R1 — design rule: full text exactly once at its kept places.
t('R1 five-point design comparison stated once (execute-and-evidence 4d)', () => {
  once(/elements present · text char-exact · order\/position/, EX);
});
t('R1 missing-design report-back stated once (WORKFLOW Step 2d)', () => {
  once(/report it back to the person or channel that assigned this retest/, WF);
  once(/Never assume a label, an order, or a layout/, WF);
  assert.strictEqual(count(/person\/channel that assigned/), 0, 'MUST row still restates the report-back rule');
  assert.strictEqual(count(/no design, no verdict/), 0, 'Discipline paragraph still restates the design rule');
});
// R1 — verdict rule: full text exactly once at #verdict-rule.
t('R1 verdict rule stated once (WORKFLOW #verdict-rule)', () => {
  once(/Lowest \/ Low \/ Medium → PWMI/, WF);
  once(/no "minor wording" or "cosmetic" exception/, WF);
  assert.strictEqual(count(/no "minor wording" or "cosmetic" exceptions/), 0, 'MUST row still restates minor-wording clause');
  assert.strictEqual(count(/PASSED only when ALL items are met/), 0, 'MUST row still restates the ALL-items clause');
  assert.strictEqual(count(/neither is a PASS and neither is dropped/), 0, 'MUST row still restates partial-coverage clause');
});
// R1/R4 — pointer places are one line with "stated once at" + link.
t('R1 stub step 3 is a one-line pointer', () => {
  const l = lineWith(STUB, /^3\. /);
  assert.ok(/stated once at/.test(l) && /#design-reference-gate/.test(l) && /#design-comparison/.test(l), `stub step 3: ${l.slice(0, 160)}`);
  assert.ok(!/reported back/.test(l), 'stub step 3 still restates the report-back clause');
});
t('R1 Discipline design paragraph is a one-line pointer', () => {
  const l = lineWith(WF, /^\*\*Compare against the design \(Figma\)/);
  assert.ok(/stated once at/.test(l) && /#design-reference-gate/.test(l), `Discipline: ${l.slice(0, 160)}`);
});
t('R4 QA closing design item is one line with a pointer', () => {
  const l = lineWith(WF, /^- \[ \] \*\*Design \(Figma\) comparison ran/);
  assert.ok(/stated once at/.test(l) && !/five points compared/.test(l), `QA closing: ${l.slice(0, 160)}`);
});
// R3 — MUST rows become pointers and keep their Because.
t('R3 design MUST rows are pointers keeping Because', () => {
  const a = lineWith(WF, /^\| MUST compare every UI case against its \*\*design node\*\*/);
  const b = lineWith(WF, /^\| MUST report a missing design reference/);
  assert.ok(/stated once at/.test(a) && /`figma` appeared zero times in the set that shipped the escapes/.test(a), `row 488: ${a.slice(0, 160)}`);
  assert.ok(/stated once at/.test(b) && /it produces both phantom bugs and false passes \(PM-006\)/.test(b), `row 489: ${b.slice(0, 160)}`);
});
t('R3 verdict MUST rows are pointers keeping Because', () => {
  const a = lineWith(WF, /^\| MUST compare actual text against the Expected Result field/);
  const b = lineWith(WF, /^\| MUST verdict from the bug's OWN expected results/);
  const c = lineWith(WF, /^\| MUST NOT post PASSED on partial coverage/);
  for (const [n, l] of [['445', a], ['460', b], ['463', c]]) assert.ok(/stated once at/.test(l) && /#verdict-rule/.test(l), `row ${n}: ${l.slice(0, 160)}`);
  assert.ok(/Bug details are the contract; a partial match is never PASSED \(user rule 2026-07-15\)/.test(b), 'row 460 lost Because');
  assert.ok(/"Fixed except one point" hidden as a caveat is misread as a full pass/.test(c), 'row 463 lost Because');
});
// R2 — clauses moved to kept places, none lost.
t('R2 clauses moved into kept places', () => {
  assert.ok(/node link actually opened/.test(flat(rd(EX))), '4d missing "node link actually opened"');
  assert.ok(/per-case mapping stays in the Step 2c plan/.test(flat(rd(EX))), '4d missing per-case mapping clause');
  assert.ok(/field id from the project guide/.test(lineWith(WF, /id="verdict-rule"/)), '#verdict-rule missing field-id clause');
  assert.ok(/<a id="design-reference-gate"><\/a>/.test(rd(WF)), 'Step 2d anchor missing');
  assert.ok(/<a id="design-comparison"><\/a>/.test(rd(EX)), '4d anchor missing');
});
// R5–R7 — #1 delegated rounds.
// R5–R6 (#1 named-action delegation) are held: comment-and-post.md:330 is frozen by owner decision D2
// (tools/retest-case-plan-rules/check.test.js D2). See spec § Blocked. Their assertions live on
// branch fix/r12-p1-retest-delegation-held until the owner decides.
t('R7 batched single approval at end of round stays', () => {
  assert.ok(/nothing is posted, transitioned or notified until item 4's approval is in/.test(flat(rd(CP))), 'Step 6d gate changed');
});

console.log(fail ? `\n${fail} FAILED` : '\nall passed');
process.exit(fail ? 1 : 0);
