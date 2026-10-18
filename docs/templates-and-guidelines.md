# Standardized Templates & Guidelines

## 1. API request template
Use the same pattern for all authenticated endpoints:

```ts
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = createTaskSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("project_tasks")
    .insert({ ...parsed.data, user_id: user.id })
    .select("id, week, title, completed, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
```

## 2. Validation standard
All payloads should be validated with Zod before database access. The validation layer should:
- trim and normalize strings
- enforce numeric bounds and required ranges
- reject empty or malformed structures
- return structured errors for UI feedback

Example schema:

```ts
export const createTaskSchema = z.object({
  week: z.number().int().min(1).max(4),
  title: z.string().trim().min(1).max(120),
});
```

## 3. Database pattern
Use a table model with explicit ownership fields and safe indexing:

```sql
create table if not exists public.project_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  week smallint not null check (week between 1 and 4),
  title text not null check (char_length(btrim(title)) between 1 and 120),
  completed boolean not null default false,
  created_at timestamptz not null default now()
);
```

Recommended rules:
- create indexes on `user_id` and common query filters
- keep all writes scoped to `user_id`
- prefer row-level security for final enforcement

## 4. Data access guideline
For every collection endpoint:
- verify auth user
- filter with `eq("user_id", user.id)`
- order results deterministically
- select only needed columns

For every mutation endpoint:
- verify auth user
- validate request payload
- insert or update only the current user's row
- return the serialized object

## 5. Error handling template
Use a predictable error contract across the app:

```json
{ "error": "Unauthorized" }
```

or

```json
{ "error": { "fieldErrors": { "title": ["Required"] } } }
```

Recommended statuses:
- `400`: invalid JSON, bad schema, malformed payload
- `401`: unauthenticated request
- `404`: resource not found or not owned by current user
- `500`: unexpected persistence or server issue

## 6. UI workflow guidance
When building the dashboard or operations panel:
- show loading and empty states for tasks
- inform users when filters or payload data are invalid
- keep task actions consistent with the data model
- use a single source of truth for task validation fields

## 7. Testing checklist
Before merging a route or feature:
- verify unauthenticated requests are rejected
- verify valid payloads pass schema validation
- verify invalid payloads are rejected
- verify the database write includes the authenticated `user_id`
- verify only the authenticated user's rows are returned

## 8. Reviewer template
Use this standard review comment format for feature or route reviews:

- Objective: what problem this change solves
- Ownership check: who is allowed to access and modify each record
- Validation check: which schema or checks protect the input
- Error handling: which status codes and messages are returned
- Test coverage: which scenarios were exercised

## 9. Mentor feedback integration
The initial guidance from the project mentors emphasizes:
- keep the workflow narrow and easy to explain
- think in terms of user-owned data, not generic records
- make each API route easy to test and easy to demo
- prefer strong validation and digestible error feedback over broad abstraction
