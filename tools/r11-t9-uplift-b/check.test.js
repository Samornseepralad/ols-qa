#!/usr/bin/env node
'use strict';
// Rule-text test (spec docs/sdd/r11-t9-uplift-b R1–R31).
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
const R = 'references/';
const H = 'skills/helix/SKILL.md';
const C = 'skills/catch-ai-workflow/SKILL.md';
const A = 'skills/tc-api-prep-workflow/SKILL.md';
const W = 'skills/procedures/tc-api-prep-workflow/WORKFLOW.md';
const WG = 'skills/procedures/tc-api-prep-workflow/phase-g-deliver.md';
const T = 'skills/tc-review-workflow/SKILL.md';
const desc = (p) => flat(rd(p).split('---')[1].split(/description: \|-?/)[1].split('metadata:')[0]).trim();
const nlines = (p) => rd(p).replace(/\n$/, '').split('\n').length;

// R1 ADF re-post stated — covered by lane A (docs/sdd/r11-t9-uplift-a), not edited here
// R2 round caps split by scope — covered by lane A (docs/sdd/r11-t9-uplift-a), not edited here
t('R3 skill-rules-style meta line quotes no soft phrase (:23 is lane A R7)', () => { lacks(R + 'skill-rules-style.md', /should consider|might want to/); has(R + 'skill-rules-style.md', /Write every safety gate as MUST \/ NEVER with its condition/); });
// R4 session-closing next step: row or Next: none' — covered by lane A (docs/sdd/r11-t9-uplift-a), not edited here
// R5 verify checklist names the condition' — covered by lane A (docs/sdd/r11-t9-uplift-a), not edited here
t('R6 no second routing table; todo branches', () => {
  lacks(R + 'skill-invocation-discipline.md', /\| Situation \| Command \||if the platform supports/);
  has(R + 'skill-invocation-discipline.md', /skill-routing\.md § Primary menu/);
  has(R + 'skill-invocation-discipline.md', /with no todo tool, list the phases in chat/);
});
t('R7–R9 one-phrase rewrites', () => {
  lacks(R + 'long-workflow-todos.md', /Suggested items/);
  lacks(R + 'customer-escape-prevention.md', /typically a mobile|may not be PASSED/);
  lacks(R + 'csv-export-rules.md', /you MAY run/);
});
t('R10 intent-shortcuts one-row test', () => { lacks(R + 'intent-shortcuts.md', /confidence is high/); has(R + 'intent-shortcuts.md', /exactly one row below matches the message; when two rows match, ask one question/); });
t('R11 Swagger-only exception in rationalizations and WORKFLOW MUST row', () => {
  has(R + 'agent-rationalizations.md', /unless the user says the spec exists only in Swagger; then Swagger is both/);
  has(W, /Swagger counts as both only when the user says the spec lives there/);
});
t('R12 helix: skill-rules-style for wording only, one-item rule wins', () => { lacks(H, /before asking the user or stopping on a missing input/); has(H, /for refusal wording only; its multi-item Missing list never overrides the one-item rule/); });
t('R13 helix: unreadable-file row covers all routing-path files', () => has(H, /menu-text\.md, skill-routing\.md or helix-session-constraints\.md cannot be read .* If intent-shortcuts\.md or proactive-qa-triggers\.md cannot be read instead, name it, skip Opening step 1 or 3, and show the menu/));
t('R14 helix description names TC change format; ≤ 155 lines', () => { assert.ok(/TC change format/.test(desc(H))); assert.ok(nlines(H) <= 155, `${nlines(H)} lines`); });
t('R15 catch-ai step 5 split into sub-items', () => has(C, /classify each item\. - a\. Classes: .* - b\. Output: .* - c\. 🔴 An unsourced claim .* - d\. When any tally/));
t('R16 catch-ai read-only gate covers later checks (step 4 + MUST row)', () => {
  has(C, /Read-only inspection only, in this step and in every later check \(step 7, \[Hedged conclusions\]/);
  has(C, /during any step \(Procedure 4 and 7, Hedged conclusions rule 3\) without the owner's yes/);
});
t('R17 catch-ai step 7 points to Hedged rules 3–4', () => { has(C, /dig until `Confirmed`, or hold it open as a Question, per \[Hedged conclusions\]\([^)]*\) rules 3–4/); lacks(C, /keep digging down the layers until the cause is `Confirmed`/); });
t('R18 catch-ai defect/non-pass group is conditional', () => {
  const s = flat(rd(C));
  const every = s.slice(s.indexOf('**Read for every audit:**'), s.indexOf('**Read only when the audit target needs it.**'));
  for (const f of ['bug-priority-matrix', 'defect-report-completeness', 'non-pass-challenge-gate', 'qa-debug-discipline']) assert.ok(!every.includes(f), `${f} still in every-audit group`);
  has(C, /\*Defect or non-pass verdict in scope:\*/);
});
t('R19 catch-ai "cleared to send"; description ≤ 1000 chars', () => { lacks(C, /may this verdict be sent/); has(C, /is this verdict cleared to send now\?/); assert.ok(desc(C).length <= 1000, `${desc(C).length} chars`); });
t('R20 tc-api description: informal/Thai trigger and push; ≤ 1024', () => { const d = desc(A); assert.ok(/even if they do not say Swagger or TC/.test(d) && /เขียนเทสเคส API/.test(d)); assert.ok(d.length <= 1024); });
t('R21 tc-api "another skill owns it"', () => { lacks(A, /another skill may own it/); has(A, /another skill owns it/); });
t('R22 tc-api API mapping for Test Steps and CSV names', () => { has(A, /Test Data \(method, path, headers, body\) is the step and Expected Result leads with the status code/); has(A, /`\{ISSUE_KEY\}_FE_TC` file names become `references\/\{SCOPE\}_API_TC\.csv`/); });
t('R23 tc-review language follows the user per user-communication.md', () => { lacks(T, /stay English per/); has(T, /Helix menus, intake questions and the thread question follow the user's language per/); });
t('R24 tc-review bullet measure', () => { lacks(T, /Keep each bullet tight/); has(T, /One finding per bullet, at most two lines plus its Suggest line/); });
t('R25 tc-review delivered review = matrix + two lists', () => has(T, /The delivered review is the Step 2 matrix, then two short lists/));
t('R26 tc-review MUST row and command do not restate Step 5', () => { lacks(T, /whoever invoked it, ask only the thread, never invent/); lacks('commands/tc-review.md', /refusal-first gate, traceability matrix/); has('commands/tc-review.md', /Every review rule lives only in the workflow's SKILL\.md/); });
// R27 withdrawn: tools/skill-lint must-read-depth needs those links (spec amendment).
t('R28 caps: tc-review ≤ 403, tc-api WORKFLOW ≤ 370', () => { assert.ok(nlines(T) <= 403, `${nlines(T)}`); assert.ok(nlines(W) <= 370, `${nlines(W)}`); });
t('R29 soft-phrase sweep: instruction-context "may"/"optionally"/"suggest" rewrites', () => {
  lacks(R + 'defect-report-completeness.md', /you may state one path/);
  lacks(R + 'intake-one-pager.md', /You may reference/);
  has(R + 'non-pass-challenge-gate.md', /the app can be correct and/);
  lacks(R + 'qa-evidence-gates.md', /may make a cut|may show \*\*only real/);
  lacks(R + 'test-md-format.md', /Optionally group/);
  lacks(R + 'swagger-diff-phase.md', /Optional new row/);
  lacks(W, /Optional: if user gave a Jira story key/);
  lacks(T, /could be suggested|suggest adding it/);
});
t('R30 catch-ai coverage gaps never counted as defects', () => has(C, /each requirement or AC with no check at any level is a Coverage gap, listed apart from defects and never counted as one/));
t('R32 Pattern B uploads a base64 .xlsx as bytes; G2 sets window.__files', () => {
  has(R + 'jira-fast-publish.md', /encoding: 'base64'/);
  has(R + 'jira-fast-publish.md', /function uploadFile\(name, content, encoding\)/);
  has(R + 'jira-fast-publish.md', /uploadFile\(f\.name, f\.data, f\.encoding\)/);
  has(WG, /one `window\.__files` entry per file this run generated \(an `\.xlsx` as base64/);
});
if (fail) { console.log(`\n${fail} failed`); process.exit(1); }
console.log('\nall passed');
