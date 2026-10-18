# Pilot Execution Data

## Pilot summary

| Measure | Result | Target | Assessment |
| --- | ---: | ---: | --- |
| Automated checks passed | 11 / 11 (100%) | At least 80% | Met |
| Test suites passed | 2 / 2 | All selected suites | Met |
| Live Supabase campaign runs | 0 | Schedule before production rollout | Not measured |
| External mentor/team feedback responses | 0 | Collect during the next review | Pending |

The pilot used synthetic task data and automated route/schema tests. The 100% figure is the automated check pass rate, not a production success rate or a measure of user adoption. Live Supabase behavior and external feedback remain unverified.

## Scenario results

| Segment | Scenario | Expected outcome | Result |
| --- | --- | --- | --- |
| Authentication | Unauthenticated task read | `401 Unauthorized` | Pass |
| Authentication | Unauthenticated task creation | `401 Unauthorized` | Pass |
| Input validation | Valid task payload is accepted and title is trimmed | Parsed task has normalized title | Pass |
| Input validation | Week below the allowed range | Rejected | Pass |
| Input validation | Week above the allowed range | Rejected | Pass |
| Input validation | Whitespace-only title | Rejected | Pass |
| Input validation | Title above 120 characters | Rejected | Pass |
| Input validation | Partial completion update | Accepted | Pass |
| Input validation | Partial title update | Accepted | Pass |
| Input validation | Empty update | Rejected | Pass |
| API validation | Invalid task payload or malformed update | `400 Bad Request` with validation error | Pass |

Sample campaign records used for planning and demos:

```json
[
  { "week": 1, "title": "Confirm project scope" },
  { "week": 2, "title": "Build milestone plan" },
  { "week": 3, "title": "Validate data flow" },
  { "week": 4, "title": "Prepare project handoff" }
]
```

## Metric formula

```text
Automated pass rate = passed automated checks / executed automated checks * 100
Pilot result = 11 / 11 * 100 = 100%
```

The target is met when the pass rate is at least 80%. A skipped or unexecuted check is not counted as a pass; record it separately and resolve it before release.

## Reproduction

```bash
npm test
```

Recorded result: 2 test files passed, 11 tests passed. These results validate the current automated scenarios only; they do not replace a live two-user Supabase ownership/RLS test.

## Pilot follow-up

- Run a staging smoke test with two separate Supabase users and seeded tasks.
- Verify each user can only read and change their own records.
- Collect mentor/team feedback using the template below and record decisions before rollout.
- Capture response-time and availability data from a deployed environment before claiming those SLAs are met.

### Feedback capture template

| Reviewer / segment | Date | What worked | Friction or defect | Suggested change | Decision / owner |
| --- | --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending | Pending |
