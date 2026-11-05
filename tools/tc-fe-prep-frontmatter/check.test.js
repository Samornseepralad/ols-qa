#!/usr/bin/env node
'use strict';
// Rule-text test (spec docs/sdd/r6-tc-fe-prep-single-frontmatter R1-R3).
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const WF_PATH = 'skills/procedures/tc-fe-prep-workflow/WORKFLOW.md';
const WF = fs.readFileSync(path.join(root, WF_PATH), 'utf8');
const SKILL = fs.readFileSync(path.join(root, 'skills/tc-fe-prep-workflow/SKILL.md'), 'utf8');
let fail = 0;
function t(name, fn) {
  try { fn(); console.log(`PASS  ${name}`); } catch (e) { fail += 1; console.log(`FAIL  ${name}\n      ${e.message}`); }
}
t('R1 WORKFLOW.md has no frontmatter and no description block', () => {
  assert.ok(!WF.startsWith('---'), 'WORKFLOW.md still opens with ---');
  assert.ok(!/^description:/m.test(WF), 'WORKFLOW.md still has description:');
  assert.ok(!/^name: tc-fe-prep-workflow/m.test(WF), 'WORKFLOW.md still has name:');
});
t('R1 SKILL.md keeps name, description and triggers', () => {
  assert.ok(/^name: tc-fe-prep-workflow/m.test(SKILL));
  assert.ok(/^description:/m.test(SKILL));
  assert.ok(/proactive_triggers/.test(SKILL));
});
t('R2 pointer line to SKILL.md in retest-bug style', () => {
  const head = WF.split('\n').slice(0, 4).join('\n');
  assert.ok(/Not a skill entry — the skill name, description and triggers live only in \[SKILL\.md\]\(\.\.\/\.\.\/tc-fe-prep-workflow\/SKILL\.md\)/.test(head), 'pointer missing in first lines');
  assert.ok(fs.existsSync(path.join(root, 'skills/procedures/tc-fe-prep-workflow', '../../tc-fe-prep-workflow/SKILL.md')));
});
t('R3 body from "# TC FE Prep Workflow" is byte-identical to origin/main', () => {
  const { execFileSync } = require('child_process');
  let base;
  try { base = execFileSync('git', ['show', `origin/main:${WF_PATH}`], { cwd: root, encoding: 'utf8' }); }
  catch (e) { console.log('      (origin/main unavailable — skipped)'); return; }
  const cut = (s) => s.slice(s.indexOf('# TC FE Prep Workflow'));
  assert.strictEqual(cut(WF), cut(base));
});
t('R4 Contents heading within first 25 lines', () => {
  const i = WF.split('\n').findIndex((l) => /^## Contents/.test(l));
  assert.ok(i >= 0 && i < 25, `Contents at line ${i + 1}`);
});
console.log(fail ? `\n${fail} FAILED` : '\nall passed');
process.exit(fail ? 1 : 0);
