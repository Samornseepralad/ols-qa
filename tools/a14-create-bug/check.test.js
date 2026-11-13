#!/usr/bin/env node
'use strict';
// Rule-text test (spec docs/sdd/a14-create-bug R1–R6).
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
const has = (p, re) => assert.ok(re.test(flat(rd(p))), `${p} missing ${re}`);
const lacks = (p, re) => assert.ok(!re.test(flat(rd(p))), `${p} still has ${re}`);
const S = 'skills/create-bug-workflow/SKILL.md';
const P = 'skills/procedures/create-bug-workflow/';

t('R1 Phase C prose follows the user language, keeps labels and confirm', () => {
  has(`${P}phase-c-confirm.md`, /in the user's language \(\[user-communication\.md\]/);
  has(`${P}phase-c-confirm.md`, /keep field names, `Confirmed` \/ `Likely` \/ `Needs Review`, keys and \*\*confirm\*\* as written/);
});
t('R3 posting-discipline labels match the pre-flight', () => {
  lacks(`${P}references/posting-discipline.md`, /module:/);
  has(`${P}references/posting-discipline.md`, /Labels: `bug`, `severity:<Severity>`/);
});
t('R4 duplicate search gives its JQL and exact-title match', () => {
  has(`${P}phase-d-create.md`, /project = <KEY> AND summary ~ "\\"<approved title>\\"" ORDER BY created DESC/);
  has(`${P}phase-d-create.md`, /a match is a summary equal to the approved title/);
});
t('R5 SKILL.md scopes jira-comment-post-review for an issue body', () => {
  has(S, /jira-comment-post-review\.md\]\([^)]*\) \(issue body: pre-post render check, §3, §4; Phase F's 2-round cap\)/);
});
t('R6 shared re-runs go to the reporter or testing-ticket when filing', () => {
  has(`${P}phase-b3-falsification.md`, /Same for re-runs that non-pass-challenge-gate\.md §3 and defect-report-completeness\.md §3a\/§3b ask for/);
});

if (fail) { console.log(`\n${fail} failing`); process.exit(1); }
console.log('\nall a14-create-bug rule checks pass');
