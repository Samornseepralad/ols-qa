// Spec: docs/sdd/ai-native-sdlc-alignment R5 — known-answer series for the CI failure-rate band.
'use strict';
const assert = require('assert');
const { execFileSync } = require('child_process');
const path = require('path');
const m = require('./check.js');

// Build gh-shaped runs: one UTC day per entry, `fails` failures out of `total` finished runs.
const DAY = 86400000;
const END = Date.parse('2026-11-30T12:00:00Z');
function series(days) { // days: [{fails,total}], last entry = END day
  const runs = [];
  let id = 1000;
  days.forEach((d, i) => {
    const t = END - (days.length - 1 - i) * DAY;
    for (let k = 0; k < d.total; k++) {
      runs.push({ databaseId: id++, conclusion: k < d.fails ? 'failure' : 'success',
        createdAt: new Date(t).toISOString(), headBranch: 'main' });
    }
  });
  return runs;
}
// Baseline: 12 days alternating 0/10 and 2/10 failures -> rates 0, 0.2 -> mean 0.1, population sd 0.1.
const base = Array.from({ length: 12 }, (_, i) => ({ fails: i % 2 ? 2 : 0, total: 10 }));
const withLatest = (fails) => m.analyze(series([...base, { fails, total: 10 }]));

// flat low rate -> log
let a = withLatest(1);
assert.strictEqual(a.status, 'measured');
assert.strictEqual(a.tier, 'log');
assert.ok(Math.abs(a.mean - 0.1) < 1e-9 && Math.abs(a.sd - 0.1) < 1e-9, `mean/sd ${a.mean} ${a.sd}`);
assert.ok(Math.abs(a.z - 0) < 1e-9);

// spike at exactly 2 sigma (rate 0.3) -> diagnose, with the latest day's failing run ids
a = withLatest(3);
assert.strictEqual(a.tier, 'diagnose');
assert.deepStrictEqual(a.failingRunIds.length, 3);
const out2 = m.render(a);
assert.ok(out2.includes('diagnose'));
for (const id of a.failingRunIds) assert.ok(out2.includes(String(id)));
assert.ok(!out2.includes('# Intent'), 'diagnose must not print a proposal');

// spike at 3 sigma (rate 0.4) -> propose, intent.md text in the template format, review date blank
a = withLatest(4);
assert.strictEqual(a.tier, 'propose');
const out3 = m.render(a);
for (const h of ['# Intent', '## What is wanted', '## Why', '## Constraints', '## Reviewed by owner on <date>']) {
  assert.ok(out3.includes(h), `missing ${h}`);
}
assert.ok(/mean 10\.0%/.test(out3) && /sd 10\.0%/.test(out3) && /40\.0%/.test(out3), 'evidence numbers');
assert.ok(out3.split('## Reviewed by owner on <date>')[1].trim() === '', 'review date left blank');

// below 1 sigma and a good day (0 failures, z=-1) -> log, never an alarm on improvement
assert.strictEqual(withLatest(0).tier, 'log');

// fewer than 7 days of data -> not measured, no number
a = m.analyze(series([{ fails: 0, total: 10 }, { fails: 1, total: 10 }, { fails: 9, total: 10 }]));
assert.strictEqual(a.status, 'not measured');
assert.ok(!('tier' in a) && !('z' in a) && !('mean' in a));
assert.ok(!/\d\.\d%/.test(m.render(a)), 'no percentage printed when not measured');
assert.strictEqual(m.analyze([]).status, 'not measured');

// 6 days = still not measured, 7 days = measured
assert.strictEqual(m.analyze(series(Array.from({ length: 6 }, () => ({ fails: 1, total: 10 })))).status, 'not measured');
assert.strictEqual(m.analyze(series(Array.from({ length: 7 }, () => ({ fails: 1, total: 10 })))).status, 'measured');

// runs older than 30 days fall out of the window; cancelled / unfinished runs are not counted
const old = series([{ fails: 10, total: 10 }]).map((r) => ({ ...r, createdAt: new Date(END - 45 * DAY).toISOString() }));
const noise = [{ databaseId: 1, conclusion: 'cancelled', createdAt: new Date(END).toISOString(), headBranch: 'x' },
  { databaseId: 2, conclusion: '', createdAt: new Date(END).toISOString(), headBranch: 'x' }];
a = m.analyze([...old, ...noise, ...series([...base, { fails: 1, total: 10 }])]);
assert.strictEqual(a.days, 13, 'old and unfinished runs excluded');
assert.strictEqual(a.tier, 'log');

// flat zero baseline (sd 0) does not divide by zero: one failure in ten is a floor-sized sd, not infinity
a = m.analyze(series([...Array.from({ length: 12 }, () => ({ fails: 0, total: 10 })), { fails: 0, total: 10 }]));
assert.strictEqual(a.tier, 'log');
assert.ok(Number.isFinite(a.z));

// gh JSON parser: array ok; garbage / non-array not ok
assert.strictEqual(m.parseRuns('[{"conclusion":"success","createdAt":"2026-11-01T00:00:00Z"}]').ok, true);
assert.strictEqual(m.parseRuns('nope').ok, false);
assert.strictEqual(m.parseRuns('{}').ok, false);

// gh missing -> readRuns not ok -> report says not measured (exit 0, nothing thrown)
assert.strictEqual(m.readRuns(process.cwd(), '/nonexistent/gh-binary').ok, false);
const cleanEnv = { PATH: path.dirname(process.execPath) };
const cli = execFileSync(process.execPath, [path.join(__dirname, 'check.js')], { env: cleanEnv, encoding: 'utf8' });
assert.ok(/not measured/.test(cli), 'CLI without gh prints not measured');

console.log('ci-band: all assertions passed');
