# Intent — helix-auto-sync

Written in the originator's own words, before `spec.md`. Spec: docs/sdd/ai-native-sdlc-alignment R1.

## What is wanted

Shared skill changes merged into ols-qa reach Helix by themselves, so the OLS agent's skill gate (S9) never stops orders because Helix fell behind. Owner, 12 Nov 2026: "ทุกอย่างไม่รอเรา หาทางจัดการมาให้เรา".

## Why

On 12 Nov 2026 four ols-qa PRs were merged on GitHub without the post-merge Helix sync, and every OLS order stopped for hours (`skills out of sync (6)`).

## Constraints

Free only (both repos public; runs on the company VM with its existing gh token). Never push Helix main directly (ruleset with 3 required checks); one sync PR. Reworded rule lines still need the owner's approval each time. The S9 gate stays fail-closed.

## Reviewed by owner on 2026-11-12

2026-11-12 — the owner approved the helix-auto-sync plan in the OLS session (popup: "อนุมัติ ทำตามแผน", credential/merge answers recorded in pluton-ai-agent docs/sdd/helix-auto-sync).
