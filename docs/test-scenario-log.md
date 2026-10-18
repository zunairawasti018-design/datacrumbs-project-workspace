# Test Scenario Log

## 1. Objective
The mid-stage validation exercise tested the project-planning workflow using representative task scenarios, with focus on authentication, validation, and resource ownership.

## 2. Core scenarios executed
### Scenario A: Valid task payload validation
- Request body includes a valid week (1-4) and a non-empty title
- Expected result: schema accepts the payload and trims its title
- Status: Pass at schema level; authenticated database insertion is not covered by the current automated tests

### Scenario B: Unauthenticated access
- Request is made without a valid session
- Expected result: `401 Unauthorized`
- Status: Pass for task reads and creation in mocked API route tests

### Scenario C: Invalid week range
- Payload uses `week: 0` or `week: 5`
- Expected result: schema validation rejects the payload
- Status: Pass at schema level

### Scenario D: Empty or oversized title
- Payload uses whitespace-only label or title longer than 120 chars
- Expected result: validation fails before database insert
- Status: Pass at schema level

### Scenario E: Partial update validation
- Payload contains only `completed: true` or only a revised title
- Expected result: update schema accepts the request
- Status: Pass at schema level

### Scenario F: Empty update payload
- Payload is `{}` or a malformed update object
- Expected result: update validation rejects the request
- Status: Pass at schema level; malformed update is also rejected by the API route test

### Scenario G: Read-only ownership enforcement
- Authenticated user requests tasks for account A while task records belong to account B
- Expected result: only account A records are returned
- Status: Not run against two users; app-level filtering and RLS are present, but live ownership enforcement needs staging verification

## 3. Sample test data
```json
[
  { "week": 1, "title": "Confirm project scope" },
  { "week": 2, "title": "Build milestone plan" },
  { "week": 3, "title": "Validate data flow" },
  { "week": 4, "title": "Prepare project handoff" }
]
```

## 4. Validation evidence
The automated suite currently covers the core validation cases:
- valid create payload accepted
- invalid week boundaries rejected
- blank and overlong titles rejected
- partial updates accepted
- empty or malformed updates rejected

Executed command:

```bash
npm test
```

Current result: 11/11 tests passed.

The pass rate covers automated schema and mocked route checks only. See [pilot execution data](pilot-execution-data.md) for the segment breakdown and the outstanding live Supabase checks.

## 5. Observations
- The validation layer is effective for the initial release scope.
- Ownership filtering is explicit and easy to understand.
- API contracts are simple enough for a stakeholder demo and future extension.
- The main gap is the absence of end-to-end auth flow testing against a live Supabase project.

## 6. Recommended next review step
Run a small manual demo with a seeded Supabase environment:
1. create a demo user
2. create three tasks across weeks 1-3
3. verify task reading is scoped to that user only
4. test invalid payload rejection in the browser or Postman
5. collect feedback on clarity, UX, and project-planning usefulness

## 7. Mentor/team feedback capture
Suggested improvements from early review:
- clarify the difference between planning tasks and milestone trackers
- simplify the weekly task model for easier stakeholder explanation
- include one real-world example in the dashboard for demo readiness
- keep the API response messages plain and non-technical where possible
