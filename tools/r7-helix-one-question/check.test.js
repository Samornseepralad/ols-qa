#!/usr/bin/env node
'use strict';
// Rule-text test (spec docs/sdd/r7-skill-gaps-after5 R6): when the Helix router must ask, it asks exactly one question.
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const root = path.join(__dirname, '..', '..');
const P = 'skills/helix/SKILL.md';
const S = fs.readFileSync(path.join(root, P), 'utf8');
const opening = S.slice(S.indexOf('## Opening'), S.indexOf('## Discipline'));
const routing = S.slice(S.indexOf('## Routing'), S.indexOf('## QA closing'));
let fail = 0;
function t(name, fn) {
  try { fn(); console.log(`PASS  ${name}`); } catch (e) { fail += 1; console.log(`FAIL  ${name}\n      ${e.message}`); }
}
function base(p) {
  try { return execFileSync('git', ['show', `origin/main:${p}`], { cwd: root, encoding: 'utf8' }); } catch (e) { return null; }
}
const flat = (s) => s.replace(/\s+/g, ' ');
t('R6 the one-question rule is stated in Opening, before any route is loaded', () => {
  assert.ok(/exactly one question/i.test(opening), 'Opening has no "exactly one question" rule');
});
t('R6 (amended 10/Nov/2026, r10-exam-items R4) the one question asks for one item; others go to the routed workflow, never a numbered list', () => {
  const o = flat(opening);
  assert.ok(/asks for one item/i.test(o), 'no "asks for one item" clause');
  assert.ok(!/into one sentence of that question/i.test(o), 'withdrawn "one sentence" wording still present');
  assert.ok(/numbered list/i.test(o), 'no ban on a numbered list of asks');
  assert.ok(/routed workflow/i.test(o), 'no deferral to the routed workflow intake');
});
t('R6 routing section does not contradict (child intake is the child\'s, not the router\'s)', () => {
  assert.ok(/child workflow handles its own intake/.test(routing));
});
t('routing section and menu text unchanged vs origin/main', () => {
  const b = base(P); if (!b) return console.log('      (origin/main unavailable — skipped)');
  assert.strictEqual(routing, b.slice(b.indexOf('## Routing'), b.indexOf('## QA closing')));
  const m = fs.readFileSync(path.join(root, 'references/menu-text.md'), 'utf8');
  assert.strictEqual(m, base('references/menu-text.md'));
});
t('menu range 1-13 consistent in SKILL.md and menu-text.md', () => {
  const m = fs.readFileSync(path.join(root, 'references/menu-text.md'), 'utf8');
  assert.ok(/13\. \*\*Other\*\*/.test(m));
  assert.ok(!/\b12 \(Other\)|1[–-]12\b/.test(S), 'SKILL.md says 12 for Other');
});
t('size: SKILL.md <= 155 lines, under skill-lint 500', () => {
  assert.ok(S.split('\n').length <= 155);
});
console.log(fail ? `\n${fail} FAILED` : '\nall passed');
process.exit(fail ? 1 : 0);
