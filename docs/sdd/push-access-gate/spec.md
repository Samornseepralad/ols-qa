# Spec — push-access gate (`scripts/check-push-access.sh`)

Status: owner-approved re-land (2026-11-12: "เขียน spec แล้วเปิด PR ใหม่") of fork PR #87 · offline tests · no env access

Source for every rule: the diff of fork PR Thitic9203/ols-qa#87 at `6b3e9b1` (files
`scripts/check-push-access.sh`, `tools/push-gate/push_access.test.js`, `CLAUDE.md`), plus the review note
on that PR about SSH remotes (R8).

## Rules

- **R1** — เมื่อรัน `bash scripts/check-push-access.sh [remote]` ระบบต้องตรวจ remote ที่ระบุ (ค่าเริ่มต้น `origin`).
- **R2** — เมื่อไม่มี `gh` บน PATH ระบบต้องพิมพ์ `UNCHECKABLE  gh is not installed …` และ exit 2.
- **R3** — เมื่อ URL ของ remote เป็น `https://github.com/<o>/<r>`, `git@github.com:<o>/<r>` หรือ
  `ssh://git@github.com/<o>/<r>` ระบบต้องได้ slug `<o>/<r>` (ตัด `.git` และ `/` ท้าย). เมื่อ URL เป็นแบบอื่นหรือไม่มี
  remote ระบบต้องพิมพ์ `UNCHECKABLE  remote '<remote>' is not a github.com URL: <url|<none>>` และ exit 2.
- **R4** — เมื่อ `gh api user --jq .login` ล้มเหลวหรือว่าง ระบบต้องพิมพ์ `UNCHECKABLE  gh is not signed in …` และ exit 2.
- **R5** — เมื่อ `gh api repos/<slug> --jq .permissions.push` ตอบ `true` ระบบต้องพิมพ์
  `PUSH-OK  <login> can push to <slug>` และ exit 0.
- **R6** — เมื่อคำตอบเป็น `false` ระบบต้องพิมพ์ `NO-PUSH-ACCESS  <login> can only read <slug> — …` และ exit 1.
- **R7** — เมื่อคำตอบเป็นค่าอื่น (ว่าง/ล้มเหลว) ระบบต้องพิมพ์ `UNCHECKABLE  could not read permissions …` และ exit 2 —
  ต้องไม่ถือว่าผ่าน.
- **R8** — The script's header comment and the CLAUDE.md rule must state the measured identity correctly:
  over an HTTPS remote with `gh` as git's credential helper, git pushes with the `gh` account's token; over
  an SSH remote git pushes with the SSH key, so the verdict reports the `gh` account's access, which may
  differ from the key's owner. (Source: review note on #87 — the original comment said git always uses the
  gh token.) Behaviour for SSH remotes stays as in #87 (R3 → R5/R6/R7); only the wording is corrected.
- **R9** — CLAUDE.md §4 ต้องมีกฎ: ก่อนรันเทสต์เพื่อ push และก่อน `git push` ทุกครั้ง รัน
  `bash scripts/check-push-access.sh`; `NO-PUSH-ACCESS`/`UNCHECKABLE` = หยุด บอก user ว่าบัญชี gh ไหนล็อกอิน ห้าม push.
- **R10** — `tools/push-gate/push_access.test.js` ต้องรันสคริปต์กับ `gh` stub บน PATH ที่มีแค่ stub + `git`
  (ไม่ให้ `gh` จริงของ runner ตอบ) และมี known answer: push → PUSH-OK/0; pull-only → NO-PUSH-ACCESS/1;
  ssh remote → slug เดียวกัน/0; ไม่ล็อกอิน → UNCHECKABLE/2; API ล้ม → UNCHECKABLE/2; remote ไม่ใช่ github.com → 2;
  ไม่มี gh → UNCHECKABLE/2.

## Out of scope

- Checking which account an SSH key belongs to (R8 states the limit; no behaviour added).
- Installing a git hook that runs the script automatically.

## Done when

- `node tools/push-gate/push_access.test.js` prints 7 PASS and `all passed`.
- `bash scripts/run-test-suites.sh` and `node tools/sdd-gate/check.js --base origin/main` exit 0 on the code PR.
- The header comment and the CLAUDE.md line no longer claim git always uses the gh token.
