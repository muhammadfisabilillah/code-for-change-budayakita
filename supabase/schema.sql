-- ============================================================================
-- BudayaKita Global — Supabase schema
-- Run this in the Supabase SQL editor (or via `supabase db push`).
-- Enables Row Level Security with PUBLIC (anonymous) READ-ONLY access.
-- ============================================================================

-- Needed for gen_random_uuid()
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- 1. countries
-- ---------------------------------------------------------------------------
create table if not exists public.countries (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  iso_code    text not null unique,
  flag_url    text,
  description text,
  created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 2. cultures
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'culture_type') then
    create type public.culture_type as enum ('Food', 'Dance', 'Art', 'Language');
  end if;
end$$;

create table if not exists public.cultures (
  id                    uuid primary key default gen_random_uuid(),
  country_id            uuid not null references public.countries(id) on delete cascade,
  type                  text not null check (type in ('Food', 'Dance', 'Art', 'Language')),
  name                  text not null,
  detail_desc           text,
  media_url             text,
  audio_narration_url   text,
  sign_language_gif_url text,
  created_at            timestamptz not null default now()
);

create index if not exists cultures_country_id_idx on public.cultures (country_id);
create index if not exists cultures_type_idx on public.cultures (type);

-- Natural keys used by the idempotent seeder.
create unique index if not exists cultures_country_name_key
  on public.cultures (country_id, name);

-- ---------------------------------------------------------------------------
-- 3. accessibility_meta
-- ---------------------------------------------------------------------------
create table if not exists public.accessibility_meta (
  id                       uuid primary key default gen_random_uuid(),
  culture_id               uuid not null references public.cultures(id) on delete cascade,
  alt_text                 text not null,
  transcript               text,
  is_high_contrast_safe    boolean not null default false,
  created_at               timestamptz not null default now()
);

create index if not exists accessibility_meta_culture_id_idx
  on public.accessibility_meta (culture_id);

create unique index if not exists accessibility_meta_culture_id_key
  on public.accessibility_meta (culture_id);

-- ---------------------------------------------------------------------------
-- Row Level Security — public read-only
-- ---------------------------------------------------------------------------
alter table public.countries          enable row level security;
alter table public.cultures           enable row level security;
alter table public.accessibility_meta enable row level security;

-- Allow anonymous + authenticated users to READ.
drop policy if exists "Public read countries" on public.countries;
create policy "Public read countries"
  on public.countries for select
  to anon, authenticated
  using (true);

drop policy if exists "Public read cultures" on public.cultures;
create policy "Public read cultures"
  on public.cultures for select
  to anon, authenticated
  using (true);

drop policy if exists "Public read accessibility_meta" on public.accessibility_meta;
create policy "Public read accessibility_meta"
  on public.accessibility_meta for select
  to anon, authenticated
  using (true);

-- NOTE: No INSERT/UPDATE/DELETE policies exist for anon/authenticated,
-- so writes are denied by default. Add admin-only policies if needed.