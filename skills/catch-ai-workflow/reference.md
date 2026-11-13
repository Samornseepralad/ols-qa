# CatchAI Reference

## Contents

- [Review targets and their governing source](#review-targets-and-their-governing-source)
- [Evidence standard](#evidence-standard)
- [Audit dimensions](#audit-dimensions)
- [Coverage matrix](#coverage-matrix)
- [Severity](#severity)
- [Verdict](#verdict)
- [Remediation and prevention](#remediation-and-prevention)
- [Result quality gate in an audit](#result-quality-gate-in-an-audit)
- [Report template](#report-template)

## Review targets and their governing source

| Target | What to audit | Governing source |
|---|---|---|
| Your own prior work | Files written, commands run, numbers quoted, conclusions asserted | The file on disk, the real command output, the ticket, the original request |
| Document / deliverable | Facts, figures, structure, terminology, completeness, internal consistency | The system it describes, the data it cites, sibling documents, the house convention |
| System / feature under test | Behaviour, UI, API responses, data, error paths, non-functional bars | Spec, Figma, acceptance criteria, OpenAPI/Swagger, DB schema, design tokens |
| Test artifacts | Test cases, coverage, assertions, CI gates | The requirement each case traces to; the run's real output |

A source *governs* a claim only when it defines what that claim should be. A file timestamp does not govern a "generated on" line. A sibling page does not govern this page's numbers.

## Evidence standard

Every reported item carries all five, or it is not reported:

- **Expected** — the required value or behaviour, quoted verbatim, **with its governing source** (`Figma: <frame>`, `AC-3`, `swagger:/v1/users`, `path:line`).
- **Actual** — what was observed, quoted verbatim, with where (`path:line`, URL, endpoint, command).
- **Reproduce** — the exact steps, command, or request that shows it again.
- **Environment** — branch/commit, environment, browser/viewport, data set — whenever the result can differ by any of them.
- **Impact** — who or what breaks, concretely.

## Audit dimensions

| Dimension | What to look for |
|---|---|
| Correctness of facts and numbers | Figures, dates, versions, paths, identifiers, calculations, quoted output that disagree with the governing source |
| Spec conformance | Labels, copy, field names, states, validation, flows — character-exact, including whitespace and punctuation |
| Completeness | Requested items not delivered; required caveats omitted; steps silently skipped; scope quietly narrowed |
| Coverage gaps | Requirements with no matching check; untested error paths, boundaries, permissions, empty and max states |
| Consistency | Statements conflicting with each other, with the code, with sibling documents, or with earlier established facts; terminology drift |
| Evidence and assumptions | Claims of "passing", "safe", "deployed", "verified" with nothing behind them |
| Data integrity | Rounding, totals, aggregation windows, timezone and locale, sorting and paging that change the answer |
| Non-functional bars | Accessibility, responsive behaviour, contrast, touch targets, performance budgets, security boundaries — whenever the work touches an interface |
| Regression risk | What else consumes the changed code, field, prop, route, or token — and whether that path was checked |
| Document quality | Structure matching sibling pages, heading hierarchy, unresolved placeholders, dead links, stale figures, mixed conventions |

## Coverage matrix

Build this before writing the report.

| Requirement / area | Checked by | Level | Gap |
|---|---|---|---|
| `<requirement or path>` | `<test, command, manual check, or "none">` | unit / integration / E2E / manual / none | `<what nothing covers>` |

Weight depth by risk: business-critical paths, error handling, boundaries, security boundaries, and data integrity earn real coverage; trivial accessors, framework code, and one-off scripts do not. Every area at level **none** is a coverage gap — reported separately from defects, because a gap is missing information, not a failure.

## Severity

| Severity | Meaning |
|---|---|
| Blocker | Blocks release or makes the deliverable unusable; data loss, security exposure, broken primary flow |
| Major | Core behaviour or a stated requirement is wrong; a correct-looking number is actually wrong; a stated quality bar is missed ("it works" but below the bar its source sets) |
| Minor | Real but contained — cosmetic drift, wording, non-blocking inconsistency |
| Question | Expected or actual side unconfirmed; needs the spec owner or missing access |

An **unsourced claim** is its own class when the deliverable declares where its content comes from — the finding is "this line is traceable to nothing". It keeps its severity — Major when the claim is load-bearing and Minor when it is incidental (load-bearing = a reader acts on it: a figure, a support/compatibility list, a requirement; incidental = attribution or metadata such as owner or author) — and is reported on its own tally ("Unsourced claims: N"); it is not added to the Defect count. Its correction is always "cite the source or remove the line". Never pair it with an asserted true value you could not observe; that value is a separate Question.

## Verdict

| Verdict | When |
|---|---|
| PASSED | Every checked item matched its governing source, and no coverage gap is Blocker or Major (a gap ranks as its item would if defective) |
| PWMI (PASSED WITH MINOR ISSUE) | At least one defect confirmed and none reaches FAILED: every product bug's matrix row is Lowest / Low / Medium ([bug-priority-matrix.md](../../references/bug-priority-matrix.md) § Hard rule), and every other finding is Minor |
| FAILED | A product bug whose matrix row is High / Highest; a Blocker or Major finding where no matrix row applies; or a result that changes between identical runs |
| BLOCKED | The expected side could not be confirmed for a material part of the scope (defined below) |
| No issue found | Checks ran, nothing survived verification — not the same as "did not check" |

A test case with an open coverage gap follows [bug-priority-matrix.md](../../references/bug-priority-matrix.md) § Hard rule: BLOCKED with what is missing, never PASSED with a caveat; the PASSED row's gap test applies to a document or your own prior work.

**Severity → matrix → verdict.** Blocker / Major / Minor rank findings inside this report. When a
defect is a product bug (a system or feature under test, or a test verdict being audited), its Priority
comes from the matrix cheat-sheet and the matrix decides the verdict — Lowest / Low / Medium → PWMI,
High / Highest → FAILED; cite the row as the matrix's *Verdict line format* does. If the matrix row and
the severity label disagree, the matrix wins and the label is corrected to match. For a document or
your own prior work (no matrix row applies), the severity decides: Blocker or Major → FAILED, Minor only → PWMI.

**Material part of the scope** = any inventory item that, if it were defective, would be Blocker or
Major (a primary flow, a load-bearing figure, a support/compatibility statement, a stated requirement). Unconfirmable items of Minor
impact only do not make the run BLOCKED — give the verdict for the rest and list each of them as a Question.

## Remediation and prevention

Every defect gets two answers: what fixes this instance, and what stops it from coming back. Both are sourced.

### Root cause before fix

Ask "why does this happen?" until the answer stops moving. Stop at the layer that owns the behaviour, not the layer where it surfaced. The answer has stopped moving when either (a) the owning layer is named with evidence — the file:line, config key, data row, or document section that produces the behaviour — or (b) the next "why" points outside the code, config, data, or documents the owner controls (an external system or vendor); in case (b) name that boundary and treat what lies beyond it as a Question.

| Fix aimed at | Example | Verdict |
|---|---|---|
| The symptom | Deduplicate the list in the UI component | Rejected — the duplicate rows still exist |
| The place it surfaced | Round the number on the report line | Rejected — every other consumer stays wrong |
| The owning layer | Fix the JOIN that multiplies rows | Accepted |

When the cause cannot be reached — not reproducible, no access, external system — say so and recommend the instrumentation that would catch it next time.

### Prevention layers

Pick the cheapest layer that makes recurrence impossible, not merely unlikely. Higher in this table is stronger.

| Layer | Makes recurrence | Use when |
|---|---|---|
| Type or schema constraint | Impossible to express | The wrong state can be modelled away |
| Database constraint / migration | Impossible to store | Data integrity, uniqueness, referential rules |
| Lint or static rule | Impossible to merge | The mistake has a syntactic signature |
| Regression test | Caught before merge | Behaviour can be asserted — must fail without the fix |
| CI gate | Caught before deploy | Coverage, contract, budget, or conformance thresholds |
| Runtime validation at the boundary | Caught before damage | Input from users, external APIs, files, config |
| Monitoring or alert | Caught after the fact | Nothing earlier can observe it |
| Documentation or convention note | Relies on people remembering | Nothing above applies — state that this is the weakest layer |

A finding closed with only a documentation note must say so plainly: recurrence is not prevented, only signposted.

### Citation rules

1. **Open the source in this session.** A citation you did not read is fabrication.
2. **Quote the sentence that carries the rule**, not a paraphrase of the page's title.
3. **Record version and date** — "React 19.2 docs, accessed 2026-09-10". Behaviour changes between versions; an unversioned citation is not usable. This applies to external documents; a workspace or skill file is cited by path and heading (`path:line`), never by commit hash.
4. **Prefer the source that governs the claim** over the one that merely mentions it: the language spec over a blog, the framework's own docs over a Stack Overflow answer, the project's own convention file over a general standard.
5. **When nothing governs it, label it `Judgment`** and state the trade-off. Judgment is legitimate; judgment disguised as a standard is not.

### Standard source registry

Match the claim to the authority that actually defines it.

| Domain | Authority to cite |
|---|---|
| Web accessibility | W3C WCAG success criteria; WAI-ARIA Authoring Practices |
| Web platform behaviour | The relevant W3C/WHATWG spec; MDN for practical reference |
| HTTP, URI, JSON, auth protocols | The IETF RFC that defines it; OAuth/OIDC specifications |
| Application security | OWASP Top 10, OWASP ASVS, OWASP cheat sheets; CWE for weakness classification |
| A library or framework | That project's own official documentation, at the version in use, plus its changelog and migration guide |
| A language feature | The language specification or the official language reference |
| An API you consume | Its OpenAPI/Swagger document or official API reference |
| Data shape and constraints | The DB schema, migration files, or the contract in the repository |
| Testing terminology and levels | ISTQB glossary; the test framework's own documentation |
| Product behaviour | The spec, acceptance criteria, Figma frame, or ticket — the same governing sources used for findings |
| Repository convention | The project's own CLAUDE.md, AGENTS.md, ADRs, style guide, or lint configuration |

### Remediation entry template

```
Fix (Recommendation | Judgment)
- Root cause: <the owning layer and why it produces this> — Confirmed | Suspected | Unknown (only Confirmed closes the defect)
- Change: <the concrete edit, file, or configuration>
- Sources:
  - <title>, <exact section or heading> — <URL> (version <x>, accessed <YYYY-MM-DD>) | <path:line, heading> for a workspace file
    > "<quoted sentence that carries the rule>"
- Prevention: <layer from the table> — <the specific test, constraint, rule, or gate>
- Verification: <command or check that proves the fix, and its expected output>
- Trade-off: <what this costs; required when labelled Judgment>
```

## Result quality gate in an audit

How [SKILL.md § Result quality gate](SKILL.md#result-quality-gate-mandatory-before-an-audited-verdict-is-confirmed-low-freedom) runs when the audit does not own the run.

- Result lines: write one final result line per case from the audited run's log (its own words, older lines marked `superseded`) and keep them in the report's record.
- Mechanical layers: run `node tools/result-gate/check.js` with the arguments in [its step 2](../../references/result-quality-gate.md#how-to-run-it) when it exists; walk the judgement layers; paste the checker's last output line (or the counted hand check) into the round's record.
- No `tools/result-gate/` in the workspace → walk all 20 layers by hand, count them, and say in the record that the check was by hand ([dependencies.md](../../references/dependencies.md), in-repo guard tools).
- Checker exits 2 (the audit input has no results.jsonl / cases.json / env-map.json / types.json, so nothing was checked — not a pass) → walk the 20 layers by hand on the audited run's log and record `checker had no input; by hand`.
- A layer that asks for an action (layer 14 step 6, layer 18) or that a pre-run check decides (account source, session/build preflight, fixture) is judged from what the audited run recorded; the read-only rule wins, so this audit never creates data. Nothing recorded → the layer is red for that case: BLOCKED for sending.
- **Flaky case** (the run log shows a different result between identical runs): the verdict the source supports is FAILED (layer 16), and an earlier PASSED for that case is a Defect in the audited work.
  - Write that verdict in the correction and in the case line as `FAILED (intermittent, {failed_attempts} of {attempts})` — never "not confirmable", never BLOCKED alone.
  - The gate runs on that FAILED line like on any other; a red layer adds its hold beside the verdict, named: `TC-n — FAILED (intermittent, 1 of 2) per run log · BLOCKED for sending: layer 17, no accepted clip`. It never becomes PASSED.
- **Claim matches its source, evidence not in the audit input** (the audited work says PASSED and the run log line says PASS): the claim is checked-clean: count it as Clean.
  - Evidence the audit input does not include is not proof that none exists: list `evidence not provided for TC-n` once under coverage gaps as a Question, not as a Defect — unless the audited work itself states evidence it does not have.
  - The gate's red layer (for example layer 9) still holds that case BLOCKED for sending, with its reason, in the gate record. Same for a layer whose evidence the audited run never recorded.

## Report template

```
Verdict: PASSED | PWMI | FAILED | BLOCKED | No issue found
Scope: <what was audited> · Out of scope: <what was not>
Result quality gate: <checker's last output line | by hand, N layers × M cases | N/A — no test verdict in scope>

## Classification
| # | Item | Expected + source | Actual | Class |
Defects (actual ≠ sourced expected): N · Unsourced claims: N · Questions: N · Clean: N
<after a red-flag re-run only: the exit line from SKILL.md § Red flags>

## Defects
### 1. [Blocker] <short title>
- Expected: "<verbatim>" (source: <Figma frame / AC-3 / path:line>)
- Actual:   "<verbatim>" (<path:line / URL / endpoint>)
- Reproduce: <steps or command>
- Environment: <branch/commit, env, viewport>
- Impact: <who or what breaks>
- Correction: <the proposed fix, or the corrected statement — applied only after the owner approves it>

## Unsourced claims (not in the Defect count)
- [Major | Minor] "<verbatim line>" (<path:line>) — Correction: cite the source or remove the line

## Questions (expected or actual side unconfirmed)
- <item> — need <source or access> to confirm <exact point>

## Coverage gaps
- <requirement> — no check at any level

## Remediation
One remediation entry (template above) per defect, same number.

## Checked, no issue found
- <item> — verified against <source>
```

Nothing survived → write `No issue found.`, then what was checked against which source.

A hedged conclusion in the audited work goes under Defects as `[<severity>] Hedged conclusion — <the claim>`: Actual = the hedged sentence verbatim, Correction = the `Confirmed` answer with its artifact (SKILL.md § Hedged conclusions).
