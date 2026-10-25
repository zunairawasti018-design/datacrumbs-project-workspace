# Portfolio Case Study: DataCrumbs Project Workspace

**Executive summary:** DataCrumbs is a lightweight project-planning workspace built to make a four-week delivery roadmap and its milestones visible in one place. The implementation combines a responsive Next.js interface with Supabase authentication and user-scoped task APIs. The current automated validation suite passes 11 of 11 checks across two test files. That is encouraging implementation evidence, but the pilot has not yet verified live Supabase ownership, production SLAs, adoption, or external user feedback.

## The challenge

Project work can become difficult to coordinate when scope, weekly priorities, and completion status are spread across disconnected notes. The project objective was to provide a clear, low-friction workspace that makes the next step visible while establishing a foundation for authenticated, user-owned milestone tracking.

This case study describes the delivered project workspace and its verification evidence. It does not claim measured business impact or validated customer outcomes.

## The solution

The Fieldnotes interface presents a four-week roadmap with phase context and user milestones. Users can sign in or create an account, add milestones to a week, mark work complete, remove milestones, see completion counts, and use the browser print workflow to export the plan.

The application is built with Next.js 15, React 19, TypeScript strict mode, Tailwind CSS 3, Supabase Auth/Postgres, and Zod. Tailwind is wired through PostCSS, scans the source tree, and disables preflight to preserve custom CSS.

## Workflow and technical approach

1. A user authenticates with Supabase email/password.
2. The dashboard loads the user's milestones through the task API.
3. Route handlers verify the authenticated user before accessing task data.
4. Shared Zod schemas validate create/update payloads on the server.
5. Reads, inserts, updates, and deletes include a user ownership filter; database RLS is intended as a second boundary.
6. The UI reflects roadmap, milestone, and completion state.

API behavior includes `401` for unauthenticated requests, `400` for invalid request input, and `404` when an update/delete target is not found for the user. The database/RLS behavior still needs staging verification with distinct accounts.

## Verification and outcomes

| Evidence | Result | What it supports |
| --- | ---: | --- |
| Automated tests | 11 / 11 passed | Current schema validation and mocked route scenarios |
| Test files | 2 / 2 passed | Task schema tests and task API route tests |
| TypeScript check | Passed in the current workspace check | Strict type-checking for the checked source |
| Scenario examples | Auth rejection, boundary validation, trimmed title, partial update, malformed update | Contract and input validation behavior in the tested scope |
| Live Supabase campaign | 0 runs recorded | Not verified |
| External mentor/team feedback | 0 responses recorded | Not collected |
| Runtime latency/availability | Not measured | No production SLA claim can be made |

The automated pass rate is calculated as:

```text
passed automated checks / executed automated checks × 100
11 / 11 × 100 = 100%
```

This is a test pass rate, not a live pilot success rate, reliability metric, user adoption measure, or satisfaction score.

## Strategic findings

- **Ownership-first design is a sound baseline.** Explicit user filters and database RLS can provide layered protection, but the database boundary must be proven in a staging test using two distinct users.
- **The workflow is easy to explain and demonstrate.** The roadmap, milestone actions, completion summary, and print export create a coherent narrow path.
- **The current evidence is strongest at the contract layer.** Schema and mocked route cases pass; end-to-end auth, data persistence, and deployment behavior remain open.
- **Operations need instrumentation and named owners.** Availability, latency, incident response, recovery, and user feedback cannot be evaluated without telemetry and an agreed operating model.
- **Analytics should start with a minimal event plan.** Define purpose, data minimization, retention, and validation before collecting behavior data.

## Limitations and risks

- No live Supabase two-user read/write or RLS exercise is recorded.
- No live campaign segment, sample size, user feedback, or adoption result is recorded.
- No production health-check, request-duration, or error-monitoring evidence is recorded.
- Proposed SLA targets are not measured or contractual guarantees.
- A passing automated suite does not prove accessibility, responsive behavior across devices, or user comprehension.

## Recommended next actions

1. Assign pilot and operational owners, cohort/segment, schedule, stop criteria, and staffed support hours.
2. Run staging sign-in and CRUD smoke tests with two distinct accounts; prove cross-user reads and writes are denied.
3. Run the segment scenario matrix and record executed, passed, failed, blocked, and skipped checks.
4. Instrument agreed health, request duration, and error signals; capture a baseline before evaluating proposed SLAs.
5. Collect domain-lead and pilot-user feedback, then document any copy or workflow changes with before/after rationale.
6. Ask domain leads to score the evidence and record their final evaluation and conditions.

## Portfolio summary

**Role focus:** Full-stack application workflow and pilot readiness
**Problem:** Make project scope, weekly roadmap, and milestones manageable in one workspace.
**Approach:** Authenticated Next.js dashboard, user-scoped task APIs, shared Zod validation, Supabase persistence/RLS, and automated contract checks.
**Verified result:** 11/11 current automated checks passed; strict TypeScript check passed in the current workspace verification.
**Next proof point:** Live two-user staging verification and a feedback-backed pilot segment.

## Executive summary for reuse

DataCrumbs turns a four-week project roadmap into a focused workspace for milestone planning and progress visibility. Its Next.js and Supabase implementation includes authenticated access, user-scoped task operations, shared input validation, and an automated test suite with 11 of 11 checks passing. These results verify the current automated contract scope only. Before broader rollout, the team must demonstrate two-user data isolation in staging, capture real pilot feedback, and instrument availability and latency. The recommended next decision is a controlled staging pilot, not an unqualified production launch.
