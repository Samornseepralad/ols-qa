#!/usr/bin/env node
'use strict';
// Rule-text test (spec docs/sdd/r6-tc-api-prep-export-failure-branch R1-R6).
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const root = path.join(__dirname, '..', '..');
const WF_PATH = 'skills/procedures/tc-api-prep-workflow/WORKFLOW.md';
const WF = fs.readFileSync(path.join(root, WF_PATH), 'utf8');
const g1 = WF.slice(WF.indexOf('### G1 '), WF.indexOf('### G2 '));
// Owner Q2 (11/Nov/2026, docs/sdd/r11-skill-fixes-g2 R14): the freeze ends at ### G3, so ## MUST / NEVER is editable.
const gverify = WF.slice(WF.indexOf('### G-verify'), WF.indexOf('### G3'));
let fail = 0;
function t(name, fn) {
  try { fn(); console.log(`PASS  ${name}`); } catch (e) { fail += 1; console.log(`FAIL  ${name}\n      ${e.message}`); }
}
function base() {
  try { return execFileSync('git', ['show', `origin/main:${WF_PATH}`], { cwd: root, encoding: 'utf8' }); }
  catch (e) { return null; }
}
t('R1 G1 has a failure step: STOP, exact error, exact path, not say ready', () => {
  assert.ok(/Write failure/.test(g1), 'no "Write failure" step in G1');
  assert.ok(/STOP/.test(g1), 'no STOP in G1');
  assert.ok(/exact error/i.test(g1), 'no "exact error"');
  assert.ok(/exact path/i.test(g1), 'no "exact path"');
  assert.ok(/(do not|never) (say|tell)[^.]*ready/i.test(g1), 'no "do not say ... ready"');
  assert.ok(/\.md/.test(g1) && /\.csv/.test(g1));
});
t('R2 offers workspace root or user-named path, writes only after the pick', () => {
  assert.ok(/workspace root/i.test(g1), 'no "workspace root"');
  assert.ok(/path the user names/i.test(g1), 'no user-named path offer');
  assert.ok(/only after the user picks/i.test(g1), 'no "only after the user picks"');
  assert.ok(/before G2/.test(g1), 'Q1 decision (ask before G2) missing');
});
t('R3 delivery A may continue without attachment, no placeholder', () => {
  assert.ok(/without the attachment/i.test(g1), 'no "without the attachment"');
  assert.ok(/__ATT1_ID__/.test(g1), 'placeholder rule missing');
});
t('R4 xlsx sentence unchanged', () => {
  const s = 'When openpyxl is missing or fails, warn the user and ask before falling back to CSV — never silently produce CSV when xlsx was requested.';
  assert.ok(g1.includes(s));
  const b = base(); if (!b) return console.log('      (origin/main unavailable — skipped)');
  assert.ok(b.includes(s));
});
t('R5 G-verify (up to ### G3) byte-identical to origin/main', () => {
  const b = base(); if (!b) return console.log('      (origin/main unavailable — skipped)');
  assert.ok(WF.indexOf('### G3') > WF.indexOf('### G-verify'), '### G3 must follow ### G-verify');
  assert.strictEqual(gverify, b.slice(b.indexOf('### G-verify'), b.indexOf('### G3')));
});
t('R6 WORKFLOW.md within 370 lines', () => {
  const n = WF.split('\n').length - (WF.endsWith('\n') ? 1 : 0);
  assert.ok(n <= 370, `${n} lines`);
});
console.log(fail ? `\n${fail} FAILED` : '\nall passed');
process.exit(fail ? 1 : 0);
