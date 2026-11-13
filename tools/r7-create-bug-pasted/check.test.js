#!/usr/bin/env node
'use strict';
// Rule-text test (spec docs/sdd/r7-skill-gaps-after5 R1): create-bug Phase B2 accepts pasted
// board-search results only when they show query terms, scope and a result per candidate.
// Amended by docs/sdd/r11-skill-fixes-g1 R4: scope = open and closed; a paste that does not state
// comment scope is flagged on the Board check line and asked once, and its create is held.
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const P = 'skills/procedures/create-bug-workflow/WORKFLOW.md';
const S = ['phase-b2-board-check.md', 'phase-b3-falsification.md'].map((f) => fs.readFileSync(path.join(root, P.replace('WORKFLOW.md', f)), 'utf8')).join('\n');
const start = S.indexOf('## 🔴 GATE: Phase B2');
const end = S.indexOf('## 🔴 GATE: Phase B3 — Falsification');
const b2 = S.slice(start, end).replace(/\s+/g, ' ');
let fail = 0;
function t(name, fn) {
  try { fn(); console.log(`PASS  ${name}`); } catch (e) { fail += 1; console.log(`FAIL  ${name}\n      ${e.message}`); }
}
t('B2 section found', () => assert.ok(start > 0 && end > start, 'B2 section not found'));
t('R1 names pasted results', () => assert.ok(/pasted/i.test(b2), 'B2 does not mention pasted search results'));
t('R1 requires the query terms', () => assert.ok(/pasted[^.]*query terms/i.test(b2), 'no "query terms" requirement for pasted results'));
t('R1 requires the scope: open and closed (amended r11 R4)', () => {
  assert.ok(/pasted[^.]*open and closed/i.test(b2), 'pasted-results rule lacks open and closed scope');
});
t('r11 R4 unstated comment scope: flagged, asked once, draft kept, create held', () => {
  assert.ok(/comment scope not stated[^.]*Board check line and ask once[^.]*summary and comments; do not hold the draft/i.test(b2), 'no comment-scope flag + ask-once + keep-draft');
  assert.ok(/Phase D does not create that candidate until/.test(b2), 'Phase D create not held');
});
t('R1 requires a result per candidate', () => assert.ok(/(a|one) result (for|per) (each|every) candidate|result per candidate/i.test(b2), 'no result-per-candidate requirement'));
t('R1 otherwise re-run or ask', () => assert.ok(/pasted[^]*(re-run|run the search)[^]*(or ask|ask the user)/i.test(b2), 'no re-run-or-ask fallback'));
t('existing B2 labels kept', () => {
  assert.ok(/Conflict — not a bug/.test(b2) && /Duplicate — already open/.test(b2) && /BLOCKED \(board search not run\)/.test(b2));
});
t('size: WORKFLOW.md under 500 lines', () => assert.ok(S.split('\n').length <= 500));
console.log(fail ? `\n${fail} FAILED` : '\nall passed');
process.exit(fail ? 1 : 0);
