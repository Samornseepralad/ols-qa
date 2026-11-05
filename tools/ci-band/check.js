#!/usr/bin/env node
/**
 * ci-band — read-only band on one metric: the daily CI test-failure rate, rolling 30 days.
 *
 * Spec: docs/sdd/ai-native-sdlc-alignment R5
 *
 * Usage: node tools/ci-band/check.js
 *   Input: `gh run list --workflow tests.yml --limit 300 --json databaseId,conclusion,createdAt,headBranch`
 *   (all branches; only finished runs with conclusion success|failure count; days are UTC).
 *   Daily rate = failures / finished runs. Window = the 30 days ending on the latest day with data.
 *   Baseline = the window's days EXCLUDING the latest day (so a spike does not widen its own band).
 *   mean and sd (population) come from the baseline; z = (latest - mean) / max(sd, SD_FLOOR).
 *   Tiers (simple sigma tiers; no Western Electric run rules — they need a longer series than 300 runs gives):
 *     z < 2  -> log        (within 2 sigma; includes the 1 sigma band and any improvement)
 *     z >= 2 -> diagnose   (prints the failing run ids of the latest day to look at; read-only)
 *     z >= 3 -> propose    (prints a proposed intent.md text, template format, owner review date blank)
 *   Fewer than 7 days with data, no gh, or gh not signed in => "not measured" (never a number).
 *   Never writes a file, never opens a PR/issue, never triggers a run. Exit 0 whenever the report printed.
 */
'use strict';
const { execFileSync } = require('child_process');

const WINDOW_DAYS = 30;
const MIN_DAYS = 7;
// A flat baseline has sd 0; without a floor any single failure would be an infinite sigma.
// 5 percentage points is a chosen guard, not a measured value.
const SD_FLOOR = 0.05;
const EPS = 1e-9;
const NM = 'not measured';

function cleanEnv() {
  return Object.fromEntries(Object.entries(process.env).filter(([k]) => !k.startsWith('GIT_')));
}

function parseRuns(text) {
  try {
    const runs = JSON.parse(text);
    return Array.isArray(runs) ? { ok: true, runs } : { ok: false };
  } catch {
    return { ok: false };
  }
}

function readRuns(cwd, ghBin = 'gh') {
  try {
    const out = execFileSync(ghBin, ['run', 'list', '--workflow', 'tests.yml', '--limit', '300',
      '--json', 'databaseId,conclusion,createdAt,headBranch'], {
      cwd, encoding: 'utf8', env: cleanEnv(), stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024,
    });
    return parseRuns(out);
  } catch {
    return { ok: false };
  }
}

const day = (iso) => new Date(Date.parse(iso)).toISOString().slice(0, 10);

// Pure. runs: gh-shaped objects. Returns { status:'not measured', days } or the measured band.
function analyze(runs) {
  const done = (runs || []).filter((r) => (r.conclusion === 'success' || r.conclusion === 'failure')
    && Number.isFinite(Date.parse(r.createdAt)));
  if (!done.length) return { status: NM, days: 0 };
  const latestMs = Math.max(...done.map((r) => Date.parse(r.createdAt)));
  const latestDay = day(new Date(latestMs).toISOString());
  const cutoff = Date.parse(`${latestDay}T00:00:00Z`) - (WINDOW_DAYS - 1) * 86400000;
  const byDay = new Map();
  for (const r of done) {
    if (Date.parse(r.createdAt) < cutoff) continue;
    const d = day(r.createdAt);
    const e = byDay.get(d) || { total: 0, fails: 0, ids: [] };
    e.total++;
    if (r.conclusion === 'failure') { e.fails++; e.ids.push(r.databaseId); }
    byDay.set(d, e);
  }
  const days = [...byDay.keys()].sort();
  if (days.length < MIN_DAYS) return { status: NM, days: days.length };
  const rate = (d) => byDay.get(d).fails / byDay.get(d).total;
  const base = days.filter((d) => d !== latestDay).map(rate);
  const mean = base.reduce((a, b) => a + b, 0) / base.length;
  const sd = Math.sqrt(base.reduce((a, b) => a + (b - mean) ** 2, 0) / base.length);
  const latest = rate(latestDay);
  const z = (latest - mean) / Math.max(sd, SD_FLOOR);
  const tier = z >= 3 - EPS ? 'propose' : z >= 2 - EPS ? 'diagnose' : 'log';
  return {
    status: 'measured', days: days.length, latestDay, latest, mean, sd, z, tier,
    latestRuns: byDay.get(latestDay).total, failingRunIds: byDay.get(latestDay).ids,
  };
}

const pct = (v) => `${(v * 100).toFixed(1)}%`;

function proposal(a) {
  return [
    `# Intent — ci-test-failure-rate-${a.latestDay}`,
    '',
    'Proposed by tools/ci-band (read-only detection). Spec: docs/sdd/ai-native-sdlc-alignment R5.',
    '',
    '## What is wanted',
    '',
    'Find why the CI test-failure rate rose and restore it to its usual level.',
    '',
    '## Why',
    '',
    `On ${a.latestDay} (UTC) the test-failure rate was ${pct(a.latest)} (${a.failingRunIds.length} of ${a.latestRuns} finished runs). `
      + `Over the previous ${a.days - 1} days with runs it was mean ${pct(a.mean)}, sd ${pct(a.sd)}: ${a.z.toFixed(1)} sigma above the mean. `
      + `Failing run ids: ${a.failingRunIds.join(', ')}.`,
    '',
    '## Constraints',
    '',
    'Free tier only (no new paid CI minutes). Do not skip, disable or loosen any test to make the rate fall.',
    '',
    '## Reviewed by owner on <date>',
    '',
  ].join('\n');
}

function render(a) {
  if (a.status !== 'measured') {
    return `CI test-failure band: ${NM} (needs gh signed in and at least ${MIN_DAYS} days with finished runs; days found: ${a.days || 0})`;
  }
  const L = [
    `CI test-failure band (tests.yml, ${a.days} days with runs in the last ${WINDOW_DAYS})`,
    `latest day ${a.latestDay}: ${pct(a.latest)} of ${a.latestRuns} runs failed`,
    `baseline: mean ${pct(a.mean)}, sd ${pct(a.sd)} (sd floor ${pct(SD_FLOOR)}); latest is ${a.z.toFixed(2)} sigma`,
    `tier: ${a.tier}`,
  ];
  if (a.tier !== 'log') L.push(`failing run ids to look at (read-only): ${a.failingRunIds.join(', ')}`);
  if (a.tier === 'propose') L.push('', '--- proposed intent.md (not written anywhere) ---', proposal(a));
  return L.join('\n');
}

function main() {
  const r = readRuns(process.cwd());
  console.log(render(r.ok ? analyze(r.runs) : { status: NM, days: 0 }));
  return 0;
}

module.exports = { parseRuns, readRuns, analyze, render, proposal };
if (require.main === module) process.exit(main());
