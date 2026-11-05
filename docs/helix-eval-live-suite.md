# Helix eval: one repeatable round, and the live-suite rule

Spec: [docs/sdd/ai-native-sdlc-alignment](sdd/ai-native-sdlc-alignment/spec.md) R3. This page is a procedure pointer. The round files, prompts and grades live in the private evidence repo; this public repo holds no run data.

## 1. Run one round (manual or local only)

Round folder, in the evidence repo (path placeholder `<EVIDENCE_REPO>`):

```
<EVIDENCE_REPO>/evals/helix-skill-eval-<date>-after<N>/
```

Open that folder's `ROUND.md` and follow its steps 0 to 8 in order. `ROUND.md` is the source of truth for the steps. This page does not restate or replace them. Start a new round by copying the previous `after<N-1>` folder pattern.

Rules every round follows:

- n = 3 runs per prompt. A skill is judged on all 3, not the best one.
- One agent session per prompt. Never share a session between prompts.
- Timer first. Start the timer before the agent reads any file. A run file without a timer started this way is rejected by the round's `build_data` step.
- Grade file validator. After a grade file is written, the main thread checks skill name, pair count and item counts against the round's `exam/` before the file counts. A grade file that fails is rewritten, not patched by hand.
- Trigger judge. Trigger (does the right skill fire) is graded by the round's trigger judge, separate from the content grade.
- Results are computed by the round's generator from the run files. Nothing is typed by hand.

## 2. Live-suite rule

The prompt set is a live suite, not a frozen list:

1. Every escaped defect adds a test prompt. When a defect reaches a user or a reviewer that the suite did not catch, a prompt that reproduces it is added to the next round before that round runs.
2. Each round reviews the prompts that no longer discriminate (every skill passes them in all 3 runs across recent rounds). The reviewer proposes keep, tighten or retire. Retiring a prompt is the owner's call and is recorded in the round's decision log.
3. Prompts added by rule 1 are marked with the defect they came from, so a later review can tell why they exist.

## 3. Cost rule

Eval rounds run only manually or locally. CI runs and API-billed runs of the eval are NOT allowed: they spend organization money, which needs a per-case written approval (global cost rule). Do not add the eval to a CI workflow.

## 4. What this page does not change

The frozen Exit gate (R13 of the Helix skill quality spec, owner decision 28 Oct 2026) and its time ceiling are not changed by this page. Gate definitions stay in [docs/sdd/helix-skill-quality/spec.md](sdd/helix-skill-quality/spec.md).
