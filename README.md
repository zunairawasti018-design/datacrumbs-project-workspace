# Fieldnotes

A responsive project-planning workspace for the DataCrumbs full-stack app roadmap. Includes Supabase email/password authentication, protected dashboard routes, user-owned milestone CRUD, row-level security, and Zod-validated API payloads.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and fill in the Supabase project URL and anon key.
3. Run `supabase/schema.sql` in the Supabase SQL editor.
4. Enable email/password authentication in Supabase, then run `npm run dev`.
5. Run the validation suite with `npm test`.

The dashboard and auth require a configured Supabase project. The API returns `401` for unauthenticated requests and uses both explicit user filters and database RLS to enforce ownership.