# Tasks — after16-testing-ticket

| # | Task | Rule | Failing check first | Done when |
|---|------|------|---------------------|-----------|
| 1 | Widths own row, share the screen's lane | R1 | `grep -c "own lane" references/customer-escape-prevention.md` = 2 | = 0; both lines say row |
| 2 | Settle order + layer-16 exemption | R2, R3 | `:3` says "before the first tool call" | names session-start skills; §4 exempts layer 16 |
| 3 | Command intake six fields | R4 | `:3` lists Figma among intake items | six fields, Figma at Phase B |
| 4 | G8 two-strike exit | R5 | `:211` "send again" with no cap | `Notify: NOT sent` line + owner question |
| 5 | Layer 14 no-repo-access form + checker | R6 | new test "no repo access form passes" fails | test passes; free-text test refuses |
| 6 | Jira draft vs post body | R7 | no line separates chat draft from post body | sentence added, Never line kept |
| 7 | Portable wording | R8 | `grep -c PD3` > 0 in two files | 0; CP grep removed |
| 8 | Bytes + all suites | R9 | — | bytes ≤ before; suites + sdd-gate green |
