create table if not exists public.project_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  week smallint not null check (week between 1 and 4),
  title text not null check (char_length(btrim(title)) between 1 and 120),
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists project_tasks_user_week_idx
  on public.project_tasks (user_id, week, created_at);

alter table public.project_tasks enable row level security;

create policy "Users can read their own project tasks"
  on public.project_tasks for select to authenticated
  using (auth.uid() = user_id);

create policy "Users can create their own project tasks"
  on public.project_tasks for insert to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own project tasks"
  on public.project_tasks for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own project tasks"
  on public.project_tasks for delete to authenticated
  using (auth.uid() = user_id);