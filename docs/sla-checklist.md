# Operational SLA & Quality Assurance Checklist

## Purpose and current status

Use this checklist to decide whether a pilot segment is ready to start, continue, or graduate to broader rollout. The targets below are proposed operating objectives, not measured or contractual guarantees. Do not report an SLA as met until its measurement source is active and evidence has been recorded for the stated period.

Current evidence and open work:

- Tailwind CSS is configured through PostCSS, scans `src`, and has preflight disabled to preserve existing custom styles.
- TypeScript strict checking and the automated test suite passed in the current workspace check; the suite reported 11 tests across 2 files.
- The recorded 11/11 automated results use synthetic data and mocked API dependencies. They are not live campaign, adoption, production-availability, or latency results.
- Live Supabase ownership/RLS checks, production telemetry, and external pilot feedback are still pending.

See [pilot execution data](pilot-execution-data.md) and [test scenario log](test-scenario-log.md) for scenario-level evidence.

## Proposed service targets

| Area | Proposed target | Measurement and reporting rule | Current status |
| --- | --- | --- | --- |
| Automated scenario quality | At least 80% pass rate for each rollout segment | Passed executed checks / all executed checks × 100. Report skipped checks separately; a skipped check is never a pass. | 11/11 automated checks pass; segment-level live campaign not run |
| Critical-path readiness | No open critical or high-severity defects at segment launch | Triage each failure and record severity, owner, disposition, and retest evidence. The overall pass-rate target does not waive this gate. | Pending live staging execution |
| Task API responsiveness | p95 below 500 ms over a rolling 7-day window | Measure server-side task API request duration; report request count, endpoint, period, and dependency errors alongside p95. | Not measured; telemetry not configured |
| Application availability | At least 99.5% per calendar month | Successful scheduled health checks / total scheduled health checks × 100. Publish the check interval, outages, and any exclusions with the result. | Not measured; health checks not configured |
| Priority-1 acknowledgement | Within 30 minutes during staffed operating hours | Incident detected/received timestamp to first acknowledgement; record operating-hours coverage and timezone before pilot launch. | Coverage and contact not assigned |
| Priority-1 mitigation | Mitigate within 4 hours during staffed operating hours, or publish a workaround and update cadence | Incident start to mitigation/workaround timestamp; record updates and resolution separately. | Not measured |
| User data isolation | Zero cross-user reads or writes in staging ownership tests | Test read and mutation attempts using two distinct accounts and retain pass/fail evidence. | Not run against live Supabase |
| Recovery readiness | Daily database backups enabled; recovery procedure reviewed quarterly | Retain backup configuration evidence and the date/outcome of the latest restore exercise. | Configuration and restore exercise to verify |

Before pilot launch, assign an operational owner, incident contact, staffed hours/timezone, health-check owner, and telemetry destination. Until agreed and instrumented, keep the targets labeled “proposed.”

## Integrated workflow and release gates

### 1. Prepare the change

- [x] Tailwind CSS and PostCSS are installed/configured; Tailwind scans the `src` tree.
- [x] Tailwind preflight is disabled so existing custom CSS is not reset.
- [x] TypeScript `strict` mode is enabled.
- [ ] Run `npx tsc --noEmit` for the release candidate and retain the result.
- [ ] Run `npm test` for the release candidate and retain the test count and result.
- [ ] Run `npm run build` and resolve build failures before deployment.
- [ ] Review changed UI copy for plain language, consistent labels, and clear empty/error/success states.

The checked configuration items reflect repository configuration. Check the command-level items only after running them for the candidate being released.

### 2. Execute the pilot by segment

- [ ] Define each campaign segment, cohort size, start/end date, owner, and rollback/stop contact before execution.
- [ ] Run authentication and authorization cases for each segment, including unauthenticated requests.
- [ ] Run valid, invalid, boundary, malformed, and empty-payload cases for the segment's workflows.
- [ ] For Supabase-backed segments, test two-user reads and writes and confirm RLS prevents cross-user access.
- [ ] Record executed, passed, failed, blocked, and skipped checks separately in the pilot log.
- [ ] Calculate a pass rate per segment using executed checks only; document the denominator and test environment.
- [ ] Pause rollout for unresolved critical/high defects, failed ownership checks, or missing required evidence.

### 3. Review copy, analytics, and calculations

- [ ] Capture user/reviewer feedback by segment, including the exact copy or workflow step that caused friction.
- [ ] Define an analytics event dictionary before enabling tracking: event name, purpose, required properties, owner, and retention.
- [ ] Minimize analytics data; do not collect secrets, task contents, or direct identifiers unless explicitly required and approved.
- [ ] Validate event delivery and deduplication in a non-production environment before using the metrics for decisions.
- [ ] Recalculate pilot metrics from recorded counts; show numerator, denominator, time window, segment, and exclusions.
- [ ] Make copy, tracking, or formula changes only with a recorded rationale, owner, and before/after comparison.
- [ ] Do not infer user adoption or satisfaction from automated test pass rate.

### 4. Establish operations before broader rollout

- [ ] Assign a named primary/backup incident contact and publish staffed hours with timezone.
- [ ] Enable and verify health checks, request-duration telemetry, and error monitoring in the target environment.
- [ ] Record a baseline period and request/sample counts before evaluating latency or availability targets.
- [ ] Document incident severity definitions, escalation route, status-update channel, and user communication owner.
- [ ] Confirm daily backup settings and identify the person responsible for the quarterly restore exercise.
- [ ] Review this checklist with the delivery team and record accepted targets, exceptions, owners, and review date.

## Incident handling

For each incident, record detection and acknowledgement times, severity, affected segments/workflows, user and data impact, mitigation, next update time, resolution, and follow-up owner. For Priority 1 incidents, start the response clock when the incident is detected or reported during agreed staffed hours. If a target cannot be met, notify affected stakeholders with the current impact, workaround, and next update time.

### Incident record

- Incident ID and severity:
- Start time / detected time (include timezone):
- Affected workflows or segments:
- User/data impact:
- Acknowledgement time and owner:
- Current status and mitigation/workaround:
- Next update time:
- Resolution time:
- Follow-up owner and action:

## Pilot decision record

- Segment / environment:
- Measurement period:
- Executed / passed / failed / blocked / skipped checks:
- Pass-rate calculation:
- Open critical/high issues:
- Latency sample count and p95 (if instrumented):
- Availability numerator / denominator (if instrumented):
- Feedback themes and resulting copy/product decisions:
- Decision (start / continue / pause / graduate):
- Decision owner and date:
