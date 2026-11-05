# Spec — r9 tc-fe-prep: name the 2a findings at the 2.5a stop

Source: after-7 grade p2r3 (expectations "Flags AC_01 vs AC_02 and EC_01 vs EC_02 as Contradictory in Step 2a and stops at the first gate (2.5a)" and "Does not import rules from DEMO-150 (not provided) — asks or marks BLOCKED"); `skills/procedures/tc-fe-prep-workflow/requirement-gates.md` 2.5a Wait sentence added by PR #112.

- **R1** — At the 2.5a stop the system must say in one line which AC/EC pairs Step 2a found in conflict (ids only, no table) and must name any reference ticket the prompt mentions but did not provide; the 2a.3 decision prompt stays deferred to after 2.5d.
- **R2** — The 2.5a Wait sentence states R1; the r8 test checks stay green.
- **R3** — No other line changes; WORKFLOW.md is not edited.

Done when: a new test fails first on the current file and passes after the edit; full suite rc 0; PR merged; helix parity OK.
