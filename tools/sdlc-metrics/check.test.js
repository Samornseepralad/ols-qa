// Spec: docs/sdd/ai-native-sdlc-alignment R4 — known-answer fixture for the SDLC metrics.
'use strict';
const assert = require('assert');
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const m = require('./check.js');

const env = Object.fromEntries(Object.entries(process.env).filter(([k]) => !k.startsWith('GIT_')));
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sdlc-metrics-t-'));
const g = (...a) => execFileSync('git', a, { cwd: dir, encoding: 'utf8', env, stdio: ['ignore', 'pipe', 'pipe'] });
g('init', '-q', '-b', 'main');
g('config', 'user.email', 't@example.invalid');
g('config', 'user.name', 't');
let n = 0;
function commit(file, date) {
  const full = path.join(dir, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, `v${++n}\n`);
  g('add', file);
  const e = { ...env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date };
  execFileSync('git', ['commit', '-q', '-m', `c${n}`], { cwd: dir, env: e, stdio: 'ignore' });
}
// alpha: intent 10:00 -> spec 12:30 (150 min); plan 13:00; spec edited 14:00 and next day (2 rework)
commit('docs/sdd/alpha/intent.md', '2026-11-10T10:00:00Z');
commit('docs/sdd/alpha/spec.md', '2026-11-10T12:30:00Z');
commit('docs/sdd/alpha/plan.md', '2026-11-10T13:00:00Z');
commit('docs/sdd/alpha/spec.md', '2026-11-10T14:00:00Z');
commit('docs/sdd/alpha/spec.md', '2026-11-11T09:00:00Z');
// beta: intent 09:00 -> spec 09:30 (30 min); plan 10:00; no rework
commit('docs/sdd/beta/intent.md', '2026-11-12T09:00:00Z');
commit('docs/sdd/beta/spec.md', '2026-11-12T09:30:00Z');
commit('docs/sdd/beta/plan.md', '2026-11-12T10:00:00Z');
// gamma: legacy folder without intent.md
commit('docs/sdd/gamma/spec.md', '2026-10-01T09:00:00Z');
commit('docs/sdd/gamma/plan.md', '2026-10-01T10:00:00Z');
commit('docs/sdd/gamma/spec.md', '2026-10-02T10:00:00Z');

const entries = m.readSddHistory(dir);
const rows = m.sddMetrics(entries);
const by = Object.fromEntries(rows.map((r) => [r.slug, r]));
assert.deepStrictEqual(rows.map((r) => r.slug), ['alpha', 'beta', 'gamma']);
assert.strictEqual(by.alpha.intentToSpecMin, 150);
assert.strictEqual(by.beta.intentToSpecMin, 30);
assert.strictEqual(by.gamma.intentToSpecMin, null, 'no intent.md = not measured, never 0');
assert.strictEqual(by.alpha.rework, 2);
assert.strictEqual(by.beta.rework, 0);
assert.strictEqual(by.gamma.rework, 1);
assert.strictEqual(m.median([150, 30]), 90);
assert.strictEqual(m.median([]), null);

// canned gh JSON: #1 green 60 min, #2 one failure 120 min, #3 no checks (not measured for CI) 30 min
const prs = [
  { number: 1, createdAt: '2026-11-10T10:00:00Z', mergedAt: '2026-11-10T11:00:00Z',
    statusCheckRollup: [{ conclusion: 'SUCCESS' }, { conclusion: 'SKIPPED' }] },
  { number: 2, createdAt: '2026-11-10T10:00:00Z', mergedAt: '2026-11-10T12:00:00Z',
    statusCheckRollup: [{ conclusion: 'SUCCESS' }, { conclusion: 'FAILURE' }] },
  { number: 3, createdAt: '2026-11-10T10:00:00Z', mergedAt: '2026-11-10T10:30:00Z', statusCheckRollup: [] },
];
const p = m.prMetrics(prs);
assert.strictEqual(p.ciMeasured, 2);
assert.strictEqual(p.ciGreen, 1);
assert.strictEqual(p.ciGreenPct, 50);
assert.strictEqual(p.mergeCount, 3);
assert.strictEqual(p.medianOpenToMergeMin, 60);
assert.strictEqual(m.prMetrics([]).ciGreenPct, null);
assert.strictEqual(m.prMetrics([]).medianOpenToMergeMin, null);

// gh failure degrades to "not measured"
assert.deepStrictEqual(m.parsePrs('not json'), { ok: false });
assert.strictEqual(m.parsePrs(JSON.stringify(prs)).prs.length, 3);
const out = m.render(rows, { ok: false });
assert.ok(/not measured/.test(out), 'unavailable gh must print not measured');
assert.ok(/alpha/.test(out) && /150/.test(out));
assert.ok(!/NaN|undefined/.test(out));
const out2 = m.render(rows, { ok: true, prs });
assert.ok(/50(\.0)?%/.test(out2));

console.log('[sdlc-metrics] ✓ check.test.js — git fixture + canned gh JSON known answers');
