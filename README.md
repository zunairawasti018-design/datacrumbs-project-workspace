# Fieldnotes

A responsive project-planning workspace for the DataCrumbs full-stack app roadmap. Includes Supabase email/password authentication, protected dashboard routes, user-owned milestone CRUD, row-level security, and Zod-validated API payloads.

The application uses strict TypeScript and Tailwind CSS utilities alongside its existing custom CSS. Tailwind's preflight is disabled to preserve the current UI styles.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and fill in the Supabase project URL and anon key.
3. Run `supabase/schema.sql` in the Supabase SQL editor.
4. Enable email/password authentication in Supabase, then run `npm run dev`.
5. Run the validation suite with `npm test`.
6. Run TypeScript validation with `npx tsc --noEmit`.

## Pilot and operations

- [Core operational framework](docs/operational-framework.md)
- [Standardized templates and guidelines](docs/templates-and-guidelines.md)
- [Pilot execution data](docs/pilot-execution-data.md)
- [SLA and QA checklist](docs/sla-checklist.md)
- [Test scenario log](docs/test-scenario-log.md)
- [Standard operating procedures and training handoff](docs/standard-operating-procedures.md)
- [Portfolio case study and executive summary](docs/portfolio-case-study.md)
- [Executive presentation deck](docs/executive-presentation-deck.md)
- [3–5 minute demo video script](docs/demo-video-script.md)

The documented pilot pass rate is based on automated tests with synthetic data. Live Supabase and runtime SLA results still require staging/production measurement.

The dashboard and auth require a configured Supabase project. The API returns `401` for unauthenticated requests and uses both explicit user filters and database RLS to enforce ownership.