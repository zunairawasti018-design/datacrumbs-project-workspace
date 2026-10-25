# Standard Operating Procedures & Training Handoff

**Project:** DataCrumbs / Fieldnotes project workspace
**Document status:** Handoff-ready; environment-specific contacts and deployment settings must be completed by the receiving team.
**Applies to:** Local development, staging pilot, and release-readiness review.

## 1. Purpose and service boundary

This guide provides the repeatable workflow for setting up, validating, demonstrating, and handing off the project-planning workspace. The application uses Next.js 15, React, TypeScript, Tailwind CSS, Supabase Auth/Postgres, and Zod validation. It supports sign-in/sign-up and a four-week roadmap with user-owned milestones.

The current automated evidence covers schema validation and mocked API behavior. It does not prove live Supabase behavior, two-user isolation, production performance, availability, or adoption. Keep those items as release gates until tested in the intended environment.

## 2. Roles and responsibilities

| Role | Responsibilities |
| --- | --- |
| Maintainer / developer | Own source changes, dependency/configuration updates, tests, builds, deployment readiness, and technical incident investigation. |
| Pilot operator | Confirm the pilot environment and segment, run the approved scenarios, record counts and outcomes, collect feedback, and pause/escalate when a stop condition is met. |
| Domain lead / evaluator | Review the case study and evidence, assess workflow and operational readiness, record scores and conditions, and make the final evaluation decision. |
| Operational owner (to assign) | Own incident contacts and hours, telemetry, backups, restore exercise, and acceptance of proposed SLAs. |

Record named people, backups, contact channels, and staffed-hour timezone before a live pilot.

## 3. Environment setup procedure

1. Check out the approved project revision and install dependencies with `npm install`.
2. Create the local environment file from the project's environment example. Set only the Supabase project URL and public/anon key needed by the application.
3. Never put a service-role key in a browser-visible variable or commit any secret to source control.
4. Apply `supabase/schema.sql` to the intended Supabase project after reviewing the target environment.
5. Enable email/password authentication in Supabase and configure email confirmation behavior appropriate to the test environment.
6. Start the local app with `npm run dev` and open `/auth`. If credentials are absent, the dashboard setup screen explains the missing setup.
7. For a pilot, use a designated staging project and test accounts; do not use real customer data for synthetic scenario execution.

**Setup acceptance:** the app loads, a test account can authenticate, and schema changes have been applied to the intended project. Live sign-in alone does not verify RLS isolation.

## 4. Standard development and release procedure

For each proposed change:

1. Describe the user workflow or defect being changed and identify affected API/data contracts.
2. Reuse the shared task schemas in `src/lib/tasks.ts`; validate all API input on the server.
3. Keep task reads and mutations scoped to the authenticated user's ID. Maintain database RLS as a separate enforcement boundary.
4. Update directly related tests and operational/UX documentation.
5. Run:

   ```bash
   npm test
   npx tsc --noEmit
   npm run build
   ```

6. Record test/build outcomes for the exact candidate. Resolve failures before release; do not treat skipped tests as passing.
7. Deploy to staging and execute the segment-specific smoke and ownership checks below.
8. Obtain the required release decision from the accountable owner and domain lead before broader rollout.

Tailwind CSS is configured through PostCSS, scans the `src` tree, and has preflight disabled to preserve existing custom CSS. TypeScript strict mode is enabled. Recheck these assumptions if the build configuration changes.

## 5. Pilot execution and quality assurance procedure

### Before a segment starts

- Identify the segment, audience/test accounts, environment, owner, schedule, success criteria, stop conditions, and rollback/stop contact.
- Confirm the test dataset is synthetic or approved for that environment.
- Confirm the app revision, database schema version, and environment are recorded.
- Verify that no production SLA is being inferred from local test data.
- Agree on the scenario set: authentication, valid creation, invalid/boundary input, partial update, deletion if in scope, and two-user read/write isolation.

### During execution

1. Run the approved scenarios against the specified environment.
2. Record each check as passed, failed, blocked, or skipped. Preserve observed behavior and non-sensitive evidence.
3. Do not include passwords, tokens, secrets, or unnecessary personal data in logs or screenshots.
4. For a failed or unexpected result, record a reproducible summary, severity, impact, owner, and next action.
5. Pause the affected segment for any suspected cross-user access, data loss, unresolved critical/high-severity issue, or unclear user impact.

### After execution

- Calculate each segment's automated pass rate as `passed executed checks / all executed checks × 100`.
- List blocked and skipped cases separately; they are not passes.
- Record feedback themes and any resulting copy, analytics, or formula change with rationale and before/after evidence.
- Capture the segment decision (continue, pause, or graduate), decision-maker, date, and remaining conditions.
- Keep the current 11/11 automated suite result labeled as synthetic/mocked evidence, not as live campaign completion.

## 6. User workflow and support procedure

1. Navigate to `/auth`, then choose sign-in or account creation.
2. For a new account requiring confirmation, follow the email confirmation prompt before signing in.
3. On the dashboard, expand a roadmap week and add a milestone with a concise title.
4. Mark milestones complete or remove them as needed. The dashboard calculates completed/total and completion percentage from loaded task records.
5. Use “Export plan” to open the browser print workflow.
6. Sign out using the account control in the sidebar.

### First-line troubleshooting

| Symptom | Check / action |
| --- | --- |
| Setup screen asks to connect workspace | Verify the local environment file has the Supabase URL and anon key, then restart the dev server. |
| Sign-up asks for email confirmation | Confirm the account from the configured email flow, then sign in. Verify the Supabase email/auth configuration if no message arrives. |
| API request returns 401 | Sign in again and confirm the browser has a valid session. |
| Task input returns 400 | Check the required week range (1–4), non-blank title (up to 120 characters), and update shape. |
| Task request returns 404 | Confirm the record exists for the signed-in account; do not attempt to bypass ownership controls. |
| Unexpected persistence error | Record timestamp, environment, endpoint/action, and sanitized error details; escalate to the maintainer. Do not share credentials or tokens. |

If the UI appears stale, reload and verify the account/session before retrying a mutation. Avoid repeated submissions if the outcome is unclear; inspect the record state first.

## 7. Incident and escalation procedure

1. Identify severity and affected users/workflows; prioritize suspected data exposure or data loss.
2. For a suspected ownership issue, stop the affected pilot activity and notify the operational owner immediately.
3. Record detection time, timezone, environment, app revision, impact, and actions taken without including secrets.
4. Acknowledge and update stakeholders according to the operating hours and contact path agreed before pilot launch.
5. Mitigate safely, verify the result, and record resolution and follow-up owner.
6. Complete a post-incident review for Priority 1 events and feed corrective actions into the release checklist.

The acknowledgement and mitigation objectives in [SLA checklist](sla-checklist.md) are proposed targets until operational coverage and monitoring are assigned and agreed.

## 8. Training handoff checklist

### Maintainer / operator walkthrough

- [ ] Explain app architecture, authentication boundary, task API routes, shared Zod schemas, and RLS role.
- [ ] Demonstrate local setup without exposing credentials.
- [ ] Show sign-in, roadmap navigation, task create/complete/delete, and print export.
- [ ] Run the automated test suite and explain what it does and does not cover.
- [ ] Demonstrate how to record a segment result and calculate a pass rate.
- [ ] Review stop conditions, incident escalation, and the proposed SLA status.
- [ ] Confirm trainee can independently repeat setup and the approved smoke checklist.

### Handoff acceptance

- [ ] Receiving owner, backup, and contact channel recorded.
- [ ] Repository revision and target environment recorded.
- [ ] Environment and deployment ownership transferred using the approved secret-management process.
- [ ] Open risks, unverified controls, and next actions reviewed.
- [ ] Training date, attendees, questions, and acceptance/conditions recorded.

**Handoff record**

- Receiving owner / backup:
- Repository revision:
- Environment(s):
- Training date / attendees:
- Open risks and next actions:
- Acceptance decision / conditions:
- Approver / date:

## 9. Related materials

- [Operational SLA and QA checklist](sla-checklist.md)
- [Pilot execution data](pilot-execution-data.md)
- [Test scenario log](test-scenario-log.md)
- [Portfolio case study](portfolio-case-study.md)
- [Executive presentation deck](executive-presentation-deck.md)
- [Demo video script](demo-video-script.md)
