#!/usr/bin/env node
'use strict';
// Rule-text test (spec docs/sdd/r11-skill-fixes-g1 R1–R12).
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const rd = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const CB = ['phase-b2-board-check.md', 'phase-e-falsification.md', 'phase-c-confirm.md', 'phase-d-create.md', 'phase-f-close.md', 'WORKFLOW.md'].map((f) => rd(`skills/procedures/create-bug-workflow/${f}`)).join('\n');
const FE = 'skills/procedures/tc-fe-prep-workflow/';
const FE_WF = rd(`${FE}WORKFLOW.md`);
const RG = rd(`${FE}requirement-gates.md`);
const DR = rd(`${FE}design-and-review.md`);
const FE_SKILL = rd('skills/tc-fe-prep-workflow/SKILL.md');
// Step 5 lives in notify.md (owner 13/Nov/2026); SKILL.md + notify.md are checked as one workflow.
const TR = rd('skills/tc-review-workflow/SKILL.md') + '\n' + rd('skills/tc-review-workflow/notify.md');
const EE = rd('skills/procedures/retest-bug-workflow/execute-and-evidence.md');
const flat = (s) => s.replace(/\s+/g, ' ');
const lines = (s) => s.split('\n');
let fail = 0;
function t(name, fn) {
  try { fn(); console.log(`PASS  ${name}`); } catch (e) { fail += 1; console.log(`FAIL  ${name}\n      ${e.message}`); }
}
const has = (s, re) => assert.ok(re.test(flat(s)), `missing ${re}`);
const lacks = (s, re) => assert.ok(!re.test(flat(s)), `still has ${re}`);
const section = (s, from, to) => {
  const a = s.indexOf(from); const b = s.indexOf(to, a + 1);
  assert.ok(a >= 0 && b > a, `section ${from} not found`);
  return s.slice(a, b);
};

// create-bug
t('R1 hedged expected side: not drafted, not sent to Phase B3, reported as BLOCKED question', () => {
  const rf = section(CB, '## Refusal-first', '**MUST re-check the tracker');
  has(rf, /do not draft or file it/i);
  has(rf, /do not send it to Phase B3/i);
  has(rf, /BLOCKED: spec unconfirmed/);
  has(rf, /names the hedge and the (authoritative )?source needed/i);
});
t('R2 Needs Review never holds a hedged expected side; drafted, shown, not counted kept', () => {
  has(CB, /\*\*Needs Review\*\*[^]*never a hedged expected side, which stops at Refusal-first/);
  has(CB, /drafted and shown, never filed/);
  has(CB, /not counted in Bug count/);
});
t('R3 reporter-only question with nothing against the defect → Likely, question on the Likely line', () => {
  has(CB, /\*\*Likely\*\*[^]*only the reporter can answer[^]*nothing in the evidence argues against the defect[^]*Likely line/);
  lacks(CB, /a role\/flake question unanswered/);
  has(CB, /\{Confirmed \| Likely — open question: /);
});
t('R4 pasted search: terms, open and closed, result per candidate; comment scope note; draft kept; create held', () => {
  const b2 = section(CB, '## 🔴 GATE: Phase B2', '## Phase B3 — Falsification');
  has(b2, /pasted[^.]*query terms[^.]*open and closed[^.]*result per candidate/i);
  has(b2, /comment scope not stated[^.]*Board check/);
  has(b2, /ask once[^.]*do not hold the draft/i);
  has(b2, /Phase D does not create/);
  has(CB, /Board check: \{[^}]*\}[^\n]*comment scope not stated/);
});

// tc-fe-prep
t('R5 ticket writes the term in Thai → not a 2.6 stop, Step 4.5 question row; empty-cell row kept', () => {
  has(RG, /\| Thai cell empty/);
  has(RG, /ticket itself writes the term in Thai[^|]*\|[^|]*Not a 2\.6 stop[^|]*unchanged[^|]*Step 4\.5/);
  has(DR, /ticket itself writes (the term )?in Thai/);
});
t('R6 Contradictory example: one item sets a limit, another exceeds it (files)', () => {
  const row = lines(RG).find((l) => l.startsWith('| **Contradictory**'));
  assert.ok(row && /ไฟล์/.test(row) && /ครั้งละ 1 ไฟล์/.test(row), 'no one-file vs many-files example');
});
t('R7 Step 5 carries the red STOP gate', () => {
  const s5 = section(FE_WF, '## Step 5 —', '## Step 6 —');
  has(s5, /🔴 GATE — STOP: Step 6 starts only after the user approves this draft in chat\./);
});
t('R8 listed soft-wording hits reworded; Step 6.5 split; QA Owner clause fixed', () => {
  const soft = /\b(may|should|suggest\w*)\b/i;
  const s65 = section(FE_WF, '## Step 6.5', '## Step 7');
  assert.ok(!soft.test(s65), 'Step 6.5 still has may/should/suggest');
  has(s65, /if it is wrong and the QA Owner agrees/i);
  assert.ok((s65.match(/^\d+\. \*\*/gm) || []).length >= 5, 'Rows and run not split into numbered sub-items');
  const g263 = section(RG, '### 2.6.3', '**Wait for the user');
  assert.ok(!soft.test(g263), '2.6.3 table still has may/should/suggest');
  assert.ok(!soft.test(FE_SKILL.split('\n').find((l) => l.includes('proactive-qa-triggers.md'))), 'SKILL.md proactive line soft');
  const dr = lines(DR);
  ['Terms whose glossary row exists', '**Collision rule:**', 'Ensure required data state exists', 'For every such case, do ALL'].forEach((k) => {
    const l = dr.find((x) => x.includes(k));
    assert.ok(l && !soft.test(l), `design-and-review line "${k}" missing or soft`);
  });
  const row = /Glossary term the ticket or a design shows in English/;
  has(RG, row); has(DR, row);
});

// tc-review
t('R9 non-conflicting rule named nowhere: no Sources/inputs, closing or self-check line', () => {
  has(TR, /do not name it anywhere else — no Sources\/inputs line, closing or self-check line/);
});
t('R10 untagged sheet → map by Expected Result vs AC text, inferred, report missing tags once', () => {
  has(TR, /no row carries an AC\/EC tag → map by Expected Result vs AC text, mark each `inferred`[^)]*report the missing tags once under Need Improve/);
});
t('R11 notify run order stated and consistent with items 2 and 7', () => {
  // r12-p1-three R7/R9: items renumbered into execution order (old 1→8→5→7→2→3 is now 1→6).
  has(TR, /Then, in this order \(items 1–6 every send; items 7 and 8 only when correcting a sent message\):/);
});
t('R11 size: tc-review SKILL.md ≤ 403 lines and < 30000 bytes', () => {
  assert.ok(lines(TR).length <= 403, `${lines(TR).length} lines`);
  assert.ok(Buffer.byteLength(TR) < 30000, `${Buffer.byteLength(TR)} bytes`);
});

// retest
t('R12 one-sentence unresolved-supersession rule; old repeated sentence gone', () => {
  has(EE, /Same while supersession is \*\*unresolved\*\* \(a newer ticket, comment or design that may supersede the expected is not yet confirmed or ruled out\): A · B only — \*\*C confirm defect\*\* is offered only once the AC\/EC check is confirmed authoritative\./);
  lacks(EE, /the menu is still A · B only — never \*\*C confirm defect\*\* while/);
});

console.log(fail ? `\n${fail} FAILED` : '\nall passed');
process.exit(fail ? 1 : 0);
