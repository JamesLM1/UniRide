-- UniRide academic prototype. No users, journeys, reviews or operational claims seeded.
-- All application writes go through audited RPCs. RLS is additional read isolation.
-- seats is total capacity; seats_available is maintained only under a ride row lock.
begin;

create schema if not exists uniride_private;
revoke all on schema uniride_private from public, anon, authenticated;
grant usage on schema uniride_private to anon, authenticated;
-- Keep uniride_private OUT of the project's exposed Data API schemas.

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '' check (char_length(name) <= 80),
  university text not null default '' check (char_length(university) <= 120),
  district text not null default '' check (char_length(district) <= 80),
  role text not null default 'passenger' check (role in ('passenger','driver','both')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.rides (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid not null references public.profiles(id) on delete cascade,
  origin_district text not null check (char_length(btrim(origin_district)) between 2 and 80),
  destination_campus text not null check (char_length(btrim(destination_campus)) between 2 and 120),
  meeting_point text not null check (char_length(btrim(meeting_point)) between 2 and 200),
  departure_at timestamptz not null,
  seats smallint not null check (seats between 1 and 7),
  seats_available smallint not null check (seats_available between 0 and seats),
  price numeric(6,2) not null check (price >= 0 and price <= 100),
  status text not null default 'open' check (status in ('open','in_progress','completed','cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index rides_feed_idx on public.rides (departure_at, origin_district, destination_campus) where status = 'open';
create index rides_driver_idx on public.rides (driver_id, departure_at desc);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  ride_id uuid not null references public.rides(id) on delete cascade,
  passenger_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','accepted','cancelled','completed')),
  -- The agreed contribution cannot change after the request is made.
  price_snapshot numeric(6,2) not null check (price_snapshot between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (ride_id, passenger_id)
);
create index bookings_passenger_idx on public.bookings (passenger_id, created_at desc);
create index bookings_ride_status_idx on public.bookings (ride_id, status);

create table public.trip_confirmations (
  booking_id uuid not null references public.bookings(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  primary key (booking_id, user_id),
  check (ended_at is null or ended_at >= started_at)
);
create index trip_confirmations_user_idx on public.trip_confirmations (user_id);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  subject_id uuid not null references public.profiles(id) on delete cascade,
  rating smallint not null check (rating between 1 and 5),
  created_at timestamptz not null default now(),
  unique (booking_id, author_id),
  check (author_id <> subject_id)
);
create index reviews_subject_idx on public.reviews (subject_id);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (char_length(email) between 5 and 254 and email = lower(btrim(email))),
  name text not null default '' check (char_length(name) <= 80),
  source text not null default 'web' check (char_length(source) <= 80),
  privacy_consent boolean not null check (privacy_consent = true),
  privacy_version text not null,
  marketing_opt_in boolean not null default false,
  marketing_opt_in_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (marketing_opt_in = (marketing_opt_in_at is not null))
);

-- No raw IPs and no client-selected quota owner. JWT identity is authoritative.
create table public.chat_rate_limit (
  user_id uuid primary key references auth.users(id) on delete cascade,
  minute_start timestamptz not null,
  minute_count integer not null default 0 check (minute_count >= 0),
  day_start date not null,
  day_count integer not null default 0 check (day_count >= 0)
);
create table uniride_private.lead_rate_limit (
  bucket text primary key,
  window_start timestamptz not null,
  requests integer not null check (requests >= 0)
);

alter table public.profiles enable row level security;
alter table public.rides enable row level security;
alter table public.bookings enable row level security;
alter table public.trip_confirmations enable row level security;
alter table public.reviews enable row level security;
alter table public.leads enable row level security;
alter table public.chat_rate_limit enable row level security;
alter table uniride_private.lead_rate_limit enable row level security;


commit;
