# Core Framework Draft

## 1. System purpose
DataCrumbs is a lightweight project-planning and delivery workspace for the roadmap, milestone, and weekly execution flow. The system is designed to support a single-user or multi-user workspace with strong ownership boundaries and predictable API behavior.

## 2. Primary stack
- Runtime: Node.js
- Application shell: Next.js 15
- API layer: Next.js Route Handlers (Express-compatible patterns when the app is later split into a standalone API service)
- Database: Supabase Postgres
- Auth: Supabase Auth with email/password
- Validation: Zod
- Data access: Supabase client/server wrappers with RLS enabled

## 3. Operational model
The framework follows a simple lifecycle:

1. User authenticates through Supabase Auth.
2. Protected server routes validate the authenticated session.
3. API contracts enforce input validation before database writes.
4. Database inserts and updates are scoped to the authenticated user_id.
5. Row-level security (RLS) ensures enforceable ownership at the database layer.
6. UI components read only the user-owned records and render dashboard state.

This gives both app-level and database-level enforcement, which reduces accidental cross-user access and audit risk.

## 4. Architectural workflow
### Application workflow
- `src/lib/supabase/server.ts` creates a server-side Supabase client for authenticated requests.
- API route handlers in `src/app/api/tasks/route.ts` validate request payloads and protect unauthorized access.
- `src/lib/tasks.ts` defines shared validation schemas for create and update operations.
- `supabase/schema.sql` defines the `public.project_tasks` table and enforces ownership constraints via RLS.

### Request execution pattern
- GET: authenticate user -> fetch tasks by `user_id` -> order by creation date
- POST: authenticate user -> parse JSON -> validate schema -> insert with `user_id` -> return created record
- PUT/PATCH: later endpoint pattern should mirror the same structure: identify record by id + user_id, validate changes, update only allowed fields

### Data ownership rules
Every task is tied to the authenticated user. This is enforced by:
- explicit `.eq("user_id", user.id)` filters in app queries
- database-level RLS policies in Supabase
- selected column-only responses to avoid leaking unnecessary fields

## 5. Recommended Express-style service contract
Although this project currently uses Next.js route handlers, the service boundary is shaped like a clean Express API contract to allow future separation:

- `GET /tasks` -> list tasks for authenticated user
- `POST /tasks` -> create a task for authenticated user
- `PATCH /tasks/:id` -> partial update task if owned by user
- `DELETE /tasks/:id` -> remove task if owned by user

Shared rules across both patterns:
- return 401 for unauthenticated users
- return 400 for malformed payloads
- return 404 for missing or non-owned resources
- return 500 only for unexpected persistence errors

## 6. Security and governance principles
- Treat `user_id` as the system of record for data ownership.
- Validate on the server, not only in the browser.
- Keep database constraints and app validation aligned.
- Prefer slim, explicit route handlers over broad data-access logic.
- Log validation failures and repeated unauthorized access attempts for later monitoring.

## 7. Recommended team workflow
- Frontend and API changes should use shared schemas in `src/lib/tasks.ts`.
- Database migrations or SQL changes should be stored in versioned Supabase SQL scripts.
- Validation should be run through `npm test` before merging feature work.
- New routes should reuse the same authorization and error model as the task API.

## 8. Feedback summary
Domain mentor and team-level feedback for the initial framework:
- Keep the system simple and ownership-first.
- Prioritize low-friction user flows over over-engineering.
- Demonstrate a working workflow with realistic sample data before adding more advanced planning features.
- Keep validation rules small and transparent to reduce confusion during rollout.

## 9. Next stage direction
The next stage should focus on:
- adding a dashboard layer around task completion states
- creating reusable API templates for milestone and sprint objects
- validating a sample user and seeded data flow in Supabase
- collecting task feedback on usability and reporting clarity
