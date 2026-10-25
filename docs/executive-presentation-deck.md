# Executive Presentation Deck: DataCrumbs Pilot Readout

**Audience:** Domain leads and final evaluators
**Recommended length:** 7–10 minutes plus questions
**Status:** Slide-ready Markdown source; replace no evidence with estimates.
**Decision requested:** Approve a controlled staging pilot and confirm its acceptance criteria, owners, and final evaluation process.

---

## Slide 1 — DataCrumbs: make the next step obvious

**A focused workspace for project scope, weekly roadmap, and milestone progress**

- Four-week planning flow
- Authenticated workspace
- User-owned milestones
- Validation-first API foundation

**Speaker note:** This is a project-planning workspace and pilot-readiness effort. Today’s decision is whether the evidence supports a controlled next-stage pilot, not whether production SLAs have already been met.

---

## Slide 2 — The problem and intended outcome

- Project scope and next actions can become fragmented across notes and tools.
- The product focuses the plan into four weeks with explicit phase context.
- Milestones make progress visible without introducing a broad project-management system.
- The design goal is a low-friction, ownership-aware workflow.

**Success should mean:** users can understand the next step, manage milestones, and trust that account data remains isolated.

**Speaker note:** These are product goals; user comprehension and trust still need direct pilot feedback.

---

## Slide 3 — What was delivered

- Sign-in and account creation using Supabase Auth
- Four-week roadmap dashboard
- Milestone create, complete, and delete actions
- Completion count and percentage derived from task records
- Browser print workflow for plan export
- Next.js route handlers with shared Zod validation
- Tailwind/PostCSS integration and strict TypeScript configuration

**Speaker note:** Show the real dashboard if the approved demo environment is available. The current interface needs configured Supabase credentials for the authenticated workflow.

---

## Slide 4 — How the workflow is protected

```text
User sign-in
    ↓
Authenticated Next.js route
    ↓
Server-side Zod validation
    ↓
User-scoped task query or mutation
    ↓
Supabase Postgres + RLS
```

- API checks the authenticated user before task access.
- Queries and mutations filter by the authenticated user ID.
- Database RLS is designed as a separate enforcement boundary.
- Live two-user RLS verification remains open.

**Speaker note:** The code has application-level ownership filters; do not represent database isolation as proven until the staging test has been completed.

---

## Slide 5 — Pilot evidence

| Measure | Observed result |
| --- | --- |
| Automated checks | 11/11 passed (100%) |
| Test files | 2/2 passed |
| Live Supabase campaign | 0 runs recorded |
| External feedback responses | 0 recorded |
| Production latency/availability | Not measured |

**Metric:** `passed checks / executed checks × 100 = 11 / 11 × 100 = 100%`

**Interpretation:** automated schema and mocked-route checks pass. This is not a production success, reliability, adoption, or satisfaction rate.

**Speaker note:** State the limits next to the number; the caveat is part of the result, not a footnote.

---

## Slide 6 — Strategic findings and remaining gaps

**Findings**
- The narrow roadmap-to-milestone workflow is coherent and demonstrable.
- Shared validation and explicit owner filters create a clear API contract.
- Current automated evidence supports schema and mocked-route behavior.

**Gaps**
- No live two-user ownership/RLS result
- No deployed telemetry or measured SLA
- No external pilot feedback or adoption data
- No confirmed operational contacts/coverage

**Speaker note:** Do not generalize beyond these findings. The next phase is evidence collection in staging.

---

## Slide 7 — Recommended next step and operating gates

1. Name the pilot owner, operational contact, staffed hours, and escalation route.
2. Run staging sign-in and CRUD scenarios with two distinct users.
3. Record per-segment pass/fail/blocked/skipped counts and resolve critical/high defects.
4. Enable agreed health, latency, and error telemetry before evaluating SLAs.
5. Collect feedback and document copy/product changes with rationale.

**Proposed gates:** at least 80% scenario pass rate per segment; no open critical/high defects; zero cross-user reads/writes; operational and support ownership agreed.

---

## Slide 8 — Domain-lead evaluation and decision

**Please score each dimension (1 = not met, 5 = strong evidence):**

| Dimension | Score (1–5) | Evidence / comment |
| --- | --- | --- |
| Product/problem fit |  |  |
| Workflow clarity and usability |  |  |
| Technical implementation |  |  |
| Data ownership and quality controls |  |  |
| Pilot and operational readiness |  |  |
| Portfolio communication |  |  |

**Final decision:** ☐ Approve controlled staging pilot ☐ Approve with conditions ☐ Revise and resubmit
**Required conditions / actions:**
**Evaluator(s) / date:**

**Speaker note:** Invite domain leads to identify the evidence required for the final score and record a decision owner and due date for each condition.

---

## Presentation delivery checklist

- Confirm environment credentials and a test account before showing interactive screens.
- Use synthetic records; do not expose user credentials, access tokens, or personal data.
- If the live app is unavailable, use screenshots or a recorded UI walkthrough and label it as such.
- Keep test results and unverified production claims visibly separate.
- Capture domain-lead scores, conditions, owners, and final decision after the session.

Related: [portfolio case study](portfolio-case-study.md), [SOP and training handoff](standard-operating-procedures.md), [demo video script](demo-video-script.md).
