# Demo Video Script: DataCrumbs Pilot Readout

**Target duration:** 4 minutes (within the requested 3–5 minute range)
**Audience:** Domain leads, evaluators, and portfolio reviewers
**Status:** Recording script and storyboard; no video recording is included in this deliverable.

## Recording setup

- Use a configured staging or demo environment and synthetic account/data only.
- Confirm sign-in and task loading before recording; hide email addresses and browser notifications.
- If staging is not available, record the slide-based walkthrough and clearly identify any UI imagery as a screenshot rather than a live system.
- Do not claim live Supabase isolation, production SLAs, user adoption, or external feedback without new evidence.
- Recommended recording: 1080p, readable browser zoom, cursor visible, no secrets or personal data on screen.

## Timed storyboard and narration

### 0:00–0:30 — Opening and objective

**Visual:** Title card: “DataCrumbs — make the next step obvious.” Then show the project workspace.

**Narration:**
“DataCrumbs is a focused project-planning workspace designed to bring a four-week roadmap and its milestones into one clear view. This handoff presents what was built, what the pilot checks verified, and what still needs evidence before a broader rollout. The decision we are asking domain leads to consider is approval for a controlled staging pilot, with clear ownership and acceptance gates.”

### 0:30–1:20 — Product walkthrough

**Visual:** Show the roadmap overview, expand a week, add a synthetic milestone, mark it complete, show completion count, and open print preview if time allows.

**Narration:**
“The dashboard organizes work into four phases: scope and alignment, authentication and data foundation, build, and verification. A user can expand a week, add a milestone, mark it complete, or remove it. The overview reflects completed milestones against the loaded total, and the export action uses the browser’s print workflow. The goal is not to replace every planning tool; it is to make the immediate roadmap and next action easy to see.”

### 1:20–2:05 — Technical workflow and controls

**Visual:** Show a simple diagram or code-free slide: sign-in → authenticated route → Zod validation → owner-scoped database operation.

**Narration:**
“The application uses Next.js and TypeScript, with Supabase authentication and Postgres. Task routes verify the authenticated user, validate input with shared Zod schemas, and scope data operations to that user. Database row-level security is intended as an additional enforcement layer. The repository includes automated checks for unauthenticated requests and invalid input. A two-user staging exercise is still required to demonstrate that one account cannot read or change another account’s records.”

### 2:05–2:50 — Results and honest interpretation

**Visual:** Show the pilot summary: 11 of 11 automated checks passed across two test files; live runs and feedback “not recorded.”

**Narration:**
“The current automated suite reports 11 of 11 checks passing across two test files. The checks cover schema behavior and mocked API routes, including authentication rejection, input boundaries, and partial updates. The pass-rate calculation is eleven passed checks divided by eleven executed checks, or one hundred percent. This number describes the automated test set only. There are no recorded live Supabase campaign runs, external feedback responses, or production latency and availability measurements.”

### 2:50–3:35 — Strategic findings and next steps

**Visual:** Show three cards: strengths, evidence gaps, next-stage gates.

**Narration:**
“The strategic finding is that a narrow roadmap-to-milestone workflow is coherent and has a clear validation boundary. The next proof points are operational: run staging tests with two distinct users, track every scenario by segment, and instrument health and request-duration telemetry before evaluating the proposed service targets. We also need named support contacts, agreed staffed hours, and direct user feedback before treating this as rollout-ready.”

### 3:35–4:00 — Evaluation request

**Visual:** Show evaluation dimensions and decision choices.

**Narration:**
“For the final evaluation, we ask domain leads to score product fit, workflow clarity, implementation quality, data controls, operational readiness, and portfolio communication. Please record the evidence behind each score and any conditions for approval. Our recommendation is a controlled staging pilot—not an unqualified production launch—followed by a decision based on live ownership results, segment outcomes, and feedback. Thank you.”

## Post-recording quality checklist

- [ ] Final duration is between 3:00 and 5:00.
- [ ] Screen content is legible and contains only synthetic data.
- [ ] No credentials, tokens, private email addresses, or personal data are visible or audible.
- [ ] The 11/11 result is described as automated mocked/schema evidence.
- [ ] Live RLS, feedback, and production SLOs are clearly labeled as pending/not measured.
- [ ] The final call to action and evaluation request are included.
- [ ] Captions/transcript are reviewed for accuracy.
- [ ] Recording link, version/date, presenter, and audience are added to the handoff record.

## Recording handoff

- Recording link/location:
- Duration:
- Presenter / date:
- Audience:
- Captions/transcript location:
- Follow-up actions:
