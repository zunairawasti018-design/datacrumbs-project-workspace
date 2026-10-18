# Operational SLA & Quality Assurance Checklist

These are proposed pilot operating targets. They are not measured service guarantees until monitoring is enabled and the targets have been reviewed with the team.

## Service targets

| Area | Target | Measurement |
| --- | --- | --- |
| Pilot scenario quality | At least 80% automated scenario pass rate before rollout | Passed checks / executed checks * 100 |
| API responsiveness | p95 under 500 ms for task API requests, excluding Supabase outages | Staging/production request telemetry over a rolling 7-day window |
| Availability | 99.5% monthly availability for the application | Successful health checks / scheduled health checks * 100 |
| Priority-1 incident acknowledgement | Within 30 minutes during staffed operating hours | Incident timestamps |
| Priority-1 mitigation | Within 4 hours during staffed operating hours, or communicate a workaround and update cadence | Incident log |
| Data access | No cross-user reads or writes in staging ownership tests | Two-user RLS test evidence |
| Recovery | Daily database backups enabled and restoration procedure reviewed quarterly | Supabase backup configuration and restore exercise |

## Release readiness checklist

### Build and integration

- [ ] Tailwind CSS and PostCSS are installed and configured.
- [ ] Tailwind scans the `src` tree; existing custom CSS continues to render without preflight resets.
- [ ] TypeScript strict checking passes (`npx tsc --noEmit`).
- [ ] Production build passes (`npm run build`).
- [ ] Automated test suite passes (`npm test`).

### API and data quality

- [ ] Every endpoint verifies the Supabase user before accessing user data.
- [ ] Writes use the authenticated user's ID; clients cannot choose another owner.
- [ ] Zod schemas reject missing, malformed, empty, and out-of-range values.
- [ ] RLS is enabled and tested with two separate accounts in staging.
- [ ] API responses use the agreed 400, 401, 404, and 500 status conventions.
- [ ] No service-role key or other secret is exposed to the browser.

### Pilot and operations

- [ ] Record executed, passed, failed, and skipped scenarios by segment.
- [ ] Confirm the pilot pass rate is at least 80%; investigate and resolve failures before rollout.
- [ ] Distinguish synthetic test results from live usage and production SLAs.
- [ ] Set up health checks and request/availability telemetry before claiming runtime SLAs.
- [ ] Assign an incident contact and record incident timestamps, impact, mitigation, and follow-up.
- [ ] Capture mentor/team feedback, decisions, and owners in the pilot log.
- [ ] Confirm backup configuration and document the recovery contact/path.

## Incident update template

- Incident ID and severity:
- Start time / detected time:
- Affected workflows or segments:
- User/data impact:
- Current status and mitigation:
- Next update time:
- Resolution time:
- Follow-up owner and action:
