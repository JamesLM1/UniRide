begin;
create function uniride_private.require_user() returns uuid
language plpgsql stable security definer set search_path = '' as $$
declare v_uid uuid := auth.uid();
begin
  if v_uid is null or coalesce((auth.jwt()->>'is_anonymous')::boolean, false)
     or not exists (select 1 from auth.users u where u.id = v_uid and u.email_confirmed_at is not null) then
    raise exception using errcode = '42501', message = 'Inicia sesion con un correo confirmado.';
  end if;
  return v_uid;
end;
$$;

create function uniride_private.can_read_profile(p_profile_id uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select auth.uid() is not null and (
    p_profile_id = auth.uid() or exists (
      select 1 from public.bookings b join public.rides r on r.id = b.ride_id
      where b.status in ('pending','accepted') and r.status in ('open','in_progress')
        and ((b.passenger_id = auth.uid() and r.driver_id = p_profile_id)
          or (r.driver_id = auth.uid() and b.passenger_id = p_profile_id))
    )
  );
$$;

create policy profiles_read on public.profiles for select to authenticated
using (uniride_private.can_read_profile(id));
create policy rides_read on public.rides for select to authenticated
using ((select auth.uid()) is not null);
create policy bookings_read on public.bookings for select to authenticated
using (passenger_id = (select auth.uid()) or exists (
  select 1 from public.rides r where r.id = ride_id and r.driver_id = (select auth.uid())
));
create policy confirmations_read on public.trip_confirmations for select to authenticated
using (exists (select 1 from public.bookings b join public.rides r on r.id = b.ride_id
  where b.id = booking_id and (b.passenger_id = (select auth.uid()) or r.driver_id = (select auth.uid()))));
create policy reviews_read on public.reviews for select to authenticated
using (author_id = (select auth.uid()) or subject_id = (select auth.uid()));
-- leads/chat_rate_limit deliberately have no SELECT or write policy for clients.

create function uniride_private.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  -- Metadata is display text only. Never derive privileges or verification from it.
  insert into public.profiles (id, name)
  values (new.id, left(btrim(coalesce(new.raw_user_meta_data->>'name', '')), 80))
  on conflict (id) do nothing;
  return new;
end;
$$;
create trigger uniride_profile_on_signup after insert on auth.users
for each row execute function uniride_private.handle_new_user();

create function uniride_private.upsert_profile(p_name text, p_university text, p_district text, p_role text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_uid uuid := uniride_private.require_user(); v_profile public.profiles;
begin
  if p_name is null or char_length(btrim(p_name)) not between 2 and 80
     or p_university is null or char_length(btrim(p_university)) not between 2 and 120
     or p_district is null or char_length(btrim(p_district)) not between 2 and 80
     or p_role is null or p_role not in ('passenger','driver','both') then
    raise exception using errcode = '22023', message = 'Completa nombre, universidad, distrito y rol validos.';
  end if;
  insert into public.profiles (id, name, university, district, role)
  values (v_uid, btrim(p_name), btrim(p_university), btrim(p_district), p_role)
  on conflict (id) do update set name = excluded.name, university = excluded.university,
    district = excluded.district, role = excluded.role, updated_at = now()
  returning * into v_profile;
  return to_jsonb(v_profile);
end;
$$;

create function uniride_private.get_driver_profile(p_driver_id uuid) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare v_uid uuid := uniride_private.require_user(); v_result jsonb;
begin
  -- Only a driver who has published a ride is discoverable; no user directory.
  select jsonb_build_object('id', p.id, 'display_name', coalesce(nullif(split_part(p.name, ' ', 1), ''), 'UniRider'),
    'university', p.university, 'rating', (select round(avg(rv.rating), 1) from public.reviews rv where rv.subject_id = p.id),
    'review_count', (select count(*) from public.reviews rv where rv.subject_id = p.id))
  into v_result from public.profiles p
  where p.id = p_driver_id and exists (select 1 from public.rides r where r.driver_id = p.id);
  if v_result is null then
    raise exception using errcode = 'P0002', message = 'Perfil no disponible.';
  end if;
  return v_result;
end;
$$;

create function uniride_private.create_ride(p_origin_district text, p_destination_campus text,
  p_meeting_point text, p_departure_at timestamptz, p_seats integer, p_price numeric)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_uid uuid := uniride_private.require_user(); v_ride public.rides;
begin
  if not exists (select 1 from public.profiles p where p.id = v_uid and p.role in ('driver','both')
    and char_length(p.name) >= 2 and char_length(p.university) >= 2 and char_length(p.district) >= 2) then
    raise exception using errcode = '42501', message = 'Completa un perfil de conductor antes de publicar.';
  end if;
  if p_origin_district is null or char_length(btrim(p_origin_district)) not between 2 and 80
    or p_destination_campus is null or char_length(btrim(p_destination_campus)) not between 2 and 120
    or p_meeting_point is null or char_length(btrim(p_meeting_point)) not between 2 and 200
    or p_departure_at is null or p_departure_at <= now() or p_departure_at > now() + interval '90 days'
    or p_seats is null or p_seats not between 1 and 7
    or p_price is null or not (p_price between 0 and 100) or p_price <> round(p_price, 2) then
    raise exception using errcode = '22023', message = 'Ruta, fecha, plazas o aporte no validos.';
  end if;
  -- Bound per-account write volume without accepting client-supplied identity.
  perform pg_advisory_xact_lock(hashtextextended(v_uid::text, 101));
  if (select count(*) from public.rides r where r.driver_id = v_uid and r.created_at > now() - interval '1 day') >= 20 then
    raise exception using errcode = 'P0001', message = 'Limite diario de publicaciones alcanzado.';
  end if;
  insert into public.rides (driver_id, origin_district, destination_campus, meeting_point,
    departure_at, seats, seats_available, price)
  values (v_uid, btrim(p_origin_district), btrim(p_destination_campus), btrim(p_meeting_point),
    p_departure_at, p_seats, p_seats, p_price) returning * into v_ride;
  return to_jsonb(v_ride);
end;
$$;

create function uniride_private.request_seat(p_ride_id uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare v_uid uuid := uniride_private.require_user(); v_ride public.rides; v_booking public.bookings;
begin
  if not exists (select 1 from public.profiles p where p.id = v_uid and char_length(p.name) >= 2
    and char_length(p.university) >= 2 and char_length(p.district) >= 2) then
    raise exception using errcode = '42501', message = 'Completa tu perfil antes de solicitar una plaza.';
  end if;
  select * into v_ride from public.rides where id = p_ride_id for update;
  if not found then raise exception using errcode = 'P0002', message = 'Ruta no disponible.'; end if;
  if v_ride.driver_id = v_uid then raise exception using errcode = '22023', message = 'No puedes solicitar tu propia ruta.'; end if;
  select * into v_booking from public.bookings where ride_id = p_ride_id and passenger_id = v_uid;
  if found and v_booking.status in ('pending','accepted','completed') then return to_jsonb(v_booking); end if;
  if v_ride.status <> 'open' or v_ride.departure_at <= now() or v_ride.seats_available = 0 then
    raise exception using errcode = 'P0001', message = 'La ruta ya no admite solicitudes.';
  end if;
  insert into public.bookings (ride_id, passenger_id, price_snapshot)
  values (p_ride_id, v_uid, v_ride.price)
  on conflict (ride_id, passenger_id) do update set status = 'pending', price_snapshot = excluded.price_snapshot, updated_at = now()
  returning * into v_booking;
  return to_jsonb(v_booking);
end;
$$;

create function uniride_private.respond_booking(p_booking_id uuid, p_accept boolean) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare v_uid uuid := uniride_private.require_user(); v_ride_id uuid; v_ride public.rides; v_booking public.bookings;
begin
  if p_accept is null then raise exception using errcode = '22023', message = 'Indica aceptar o rechazar.'; end if;
  select ride_id into v_ride_id from public.bookings where id = p_booking_id;
  select * into v_ride from public.rides where id = v_ride_id for update;
  if not found or v_ride.driver_id <> v_uid then
    raise exception using errcode = '42501', message = 'Solicitud no disponible para este usuario.';
  end if;
  -- All booking writers acquire the ride lock BEFORE touching a booking.
  select * into v_booking from public.bookings where id = p_booking_id for update;
  if (p_accept and v_booking.status = 'accepted') or (not p_accept and v_booking.status = 'cancelled') then
    return to_jsonb(v_booking);
  end if;
  if v_booking.status <> 'pending' or v_ride.status <> 'open' or v_ride.departure_at <= now() then
    raise exception using errcode = 'P0001', message = 'La solicitud ya no se puede responder.';
  end if;
  if p_accept then
    if v_ride.seats_available < 1 then raise exception using errcode = 'P0001', message = 'No quedan plazas.'; end if;
    update public.rides set seats_available = seats_available - 1, updated_at = now() where id = v_ride_id;
  end if;
  update public.bookings set status = case when p_accept then 'accepted' else 'cancelled' end,
    updated_at = now() where id = p_booking_id returning * into v_booking;
  return to_jsonb(v_booking);
end;
$$;

create function uniride_private.cancel_booking(p_booking_id uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare v_uid uuid := uniride_private.require_user(); v_ride_id uuid; v_ride public.rides; v_booking public.bookings;
begin
  select ride_id into v_ride_id from public.bookings where id = p_booking_id;
  select * into v_ride from public.rides where id = v_ride_id for update;
  select * into v_booking from public.bookings where id = p_booking_id for update;
  if not found or (v_booking.passenger_id <> v_uid and v_ride.driver_id <> v_uid) then
    raise exception using errcode = '42501', message = 'Reserva no disponible para este usuario.';
  end if;
  if v_booking.status = 'cancelled' then return to_jsonb(v_booking); end if;
  if v_ride.status <> 'open' or v_booking.status not in ('pending','accepted') then
    raise exception using errcode = 'P0001', message = 'No se puede cancelar un trayecto iniciado o finalizado.';
  end if;
  if v_booking.status = 'accepted' then
    update public.rides set seats_available = seats_available + 1, updated_at = now() where id = v_ride_id;
  end if;
  update public.bookings set status = 'cancelled', updated_at = now() where id = p_booking_id returning * into v_booking;
  return to_jsonb(v_booking);
end;
$$;

create function uniride_private.cancel_ride(p_ride_id uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare v_uid uuid := uniride_private.require_user(); v_ride public.rides;
begin
  select * into v_ride from public.rides where id = p_ride_id for update;
  if not found or v_ride.driver_id <> v_uid then
    raise exception using errcode = '42501', message = 'Ruta no disponible para este usuario.';
  end if;
  if v_ride.status = 'cancelled' then return to_jsonb(v_ride); end if;
  if v_ride.status <> 'open' then raise exception using errcode = 'P0001', message = 'Solo puedes cancelar rutas no iniciadas.'; end if;
  update public.bookings set status = 'cancelled', updated_at = now() where ride_id = p_ride_id and status in ('pending','accepted');
  update public.rides set status = 'cancelled', seats_available = seats, updated_at = now()
  where id = p_ride_id returning * into v_ride;
  return to_jsonb(v_ride);
end;
$$;

create function uniride_private.confirm_trip(p_booking_id uuid, p_phase text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare v_uid uuid := uniride_private.require_user(); v_ride_id uuid; v_ride public.rides;
  v_booking public.bookings; v_started integer; v_ended integer;
begin
  if p_phase is null or p_phase not in ('start','end') then
    raise exception using errcode = '22023', message = 'Fase de confirmacion no valida.';
  end if;
  select ride_id into v_ride_id from public.bookings where id = p_booking_id;
  select * into v_ride from public.rides where id = v_ride_id for update;
  select * into v_booking from public.bookings where id = p_booking_id for update;
  if not found or (v_uid <> v_ride.driver_id and v_uid <> v_booking.passenger_id) then
    raise exception using errcode = '42501', message = 'Reserva no disponible para este usuario.';
  end if;
  if v_booking.status not in ('accepted','completed') or v_ride.status not in ('open','in_progress','completed') then
    raise exception using errcode = 'P0001', message = 'Se necesita una reserva aceptada.';
  end if;
  if v_booking.status <> 'completed' then
    if p_phase = 'start' then
      if now() < v_ride.departure_at - interval '30 minutes' then
        raise exception using errcode = 'P0001', message = 'Confirma el inicio como maximo 30 minutos antes de la salida.';
      end if;
      insert into public.trip_confirmations (booking_id, user_id) values (p_booking_id, v_uid)
      on conflict (booking_id, user_id) do nothing;
      -- The first start confirmation freezes capacity and all remaining pending requests.
      update public.rides set status = 'in_progress', updated_at = now() where id = v_ride_id and status = 'open';
      update public.bookings set status = 'cancelled', updated_at = now() where ride_id = v_ride_id and status = 'pending';
    else
      select count(*) into v_started from public.trip_confirmations where booking_id = p_booking_id;
      if v_started <> 2 then raise exception using errcode = 'P0001', message = 'Ambas personas deben confirmar el inicio primero.'; end if;
      update public.trip_confirmations set ended_at = coalesce(ended_at, now())
      where booking_id = p_booking_id and user_id = v_uid;
      if not found then raise exception using errcode = 'P0001', message = 'Confirma primero tu inicio.'; end if;
      select count(*) into v_ended from public.trip_confirmations where booking_id = p_booking_id and ended_at is not null;
      if v_ended = 2 then
        update public.bookings set status = 'completed', updated_at = now() where id = p_booking_id;
        if not exists (select 1 from public.bookings where ride_id = v_ride_id and status = 'accepted') then
          update public.rides set status = 'completed', updated_at = now() where id = v_ride_id;
        end if;
      end if;
    end if;
  end if;
  select count(*), count(ended_at) into v_started, v_ended from public.trip_confirmations where booking_id = p_booking_id;
  return jsonb_build_object('booking_id', p_booking_id, 'started_count', v_started, 'ended_count', v_ended,
    'booking_status', (select status from public.bookings where id = p_booking_id),
    'ride_status', (select status from public.rides where id = v_ride_id));
end;
$$;

create function uniride_private.submit_review(p_booking_id uuid, p_rating integer) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare v_uid uuid := uniride_private.require_user(); v_ride_id uuid; v_ride public.rides;
  v_booking public.bookings; v_review public.reviews; v_subject uuid;
begin
  if p_rating is null or p_rating not between 1 and 5 then raise exception using errcode = '22023', message = 'La valoracion debe estar entre 1 y 5.'; end if;
  select ride_id into v_ride_id from public.bookings where id = p_booking_id;
  select * into v_ride from public.rides where id = v_ride_id for update;
  select * into v_booking from public.bookings where id = p_booking_id;
  if not found or (v_uid <> v_ride.driver_id and v_uid <> v_booking.passenger_id) then
    raise exception using errcode = '42501', message = 'Reserva no disponible para este usuario.';
  end if;
  if v_booking.status <> 'completed' or (select count(*) from public.trip_confirmations where booking_id = p_booking_id and ended_at is not null) <> 2 then
    raise exception using errcode = 'P0001', message = 'Ambas personas deben confirmar el final antes de valorar.';
  end if;
  v_subject := case when v_uid = v_ride.driver_id then v_booking.passenger_id else v_ride.driver_id end;
  insert into public.reviews (booking_id, author_id, subject_id, rating) values (p_booking_id, v_uid, v_subject, p_rating)
  on conflict (booking_id, author_id) do nothing;
  select * into v_review from public.reviews where booking_id = p_booking_id and author_id = v_uid;
  return to_jsonb(v_review);
end;
$$;

create function uniride_private.submit_lead(p_email text, p_name text, p_privacy_consent boolean,
  p_marketing_opt_in boolean, p_source text, p_website text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare v_email text := lower(btrim(p_email)); v_global uniride_private.lead_rate_limit;
  v_email_bucket text; v_email_limit uniride_private.lead_rate_limit; v_existing public.leads;
begin
  if p_website is not null and p_website <> '' then return jsonb_build_object('accepted', true); end if;
  if v_email is null or char_length(v_email) not between 5 and 254
    or v_email !~ '^[A-Za-z0-9.!#$%&*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$'
    or p_name is null or char_length(btrim(p_name)) > 80
    or p_source is null or char_length(p_source) > 80
    or p_privacy_consent is distinct from true or p_marketing_opt_in is null then
    raise exception using errcode = '22023', message = 'Revisa el correo y acepta el aviso de privacidad.';
  end if;
  -- Anonymous clients have no trustworthy IP/identity in SQL. Bound total ingestion and
  -- per-email attempts; these are abuse caps, NOT a claim of verified email ownership.
  -- Return the same success shape for new, existing and throttled addresses.
  perform pg_advisory_xact_lock(71442026);
  insert into uniride_private.lead_rate_limit values ('global', now(), 0) on conflict do nothing;
  select * into v_global from uniride_private.lead_rate_limit where bucket = 'global' for update;
  if v_global.window_start <= now() - interval '1 hour' then
    update uniride_private.lead_rate_limit set window_start = now(), requests = 0 where bucket = 'global';
    v_global.requests := 0;
  end if;
  if v_global.requests >= 100 then return jsonb_build_object('accepted', true); end if;
  update uniride_private.lead_rate_limit set requests = requests + 1 where bucket = 'global';
  v_email_bucket := 'email:' || md5(v_email);
  insert into uniride_private.lead_rate_limit values (v_email_bucket, now(), 0) on conflict do nothing;
  select * into v_email_limit from uniride_private.lead_rate_limit where bucket = v_email_bucket for update;
  if v_email_limit.window_start > now() - interval '1 hour' and v_email_limit.requests >= 2 then
    return jsonb_build_object('accepted', true);
  end if;
  update uniride_private.lead_rate_limit set window_start = now(), requests =
    case when v_email_limit.window_start <= now() - interval '1 hour' then 1 else requests + 1 end
  where bucket = v_email_bucket;
  -- Never let an anonymous caller change someone else's existing consent record.
  insert into public.leads (email, name, source, privacy_consent, privacy_version, marketing_opt_in, marketing_opt_in_at)
  values (v_email, btrim(p_name), p_source, true, '2026-11-01', p_marketing_opt_in,
    case when p_marketing_opt_in then now() else null end) on conflict (email) do nothing;
  return jsonb_build_object('accepted', true);
end;
$$;

create function uniride_private.consume_chat_quota() returns jsonb
language plpgsql security definer set search_path = '' as $$
declare v_uid uuid := uniride_private.require_user(); v_now timestamptz := now();
  v_day date := (now() at time zone 'UTC')::date; v_quota public.chat_rate_limit; v_retry integer;
begin
  insert into public.chat_rate_limit (user_id, minute_start, minute_count, day_start, day_count)
  values (v_uid, v_now, 0, v_day, 0) on conflict (user_id) do nothing;
  select * into v_quota from public.chat_rate_limit where user_id = v_uid for update;
  if v_quota.day_start <> v_day then v_quota.day_start := v_day; v_quota.day_count := 0; end if;
  if v_quota.minute_start <= v_now - interval '1 minute' then v_quota.minute_start := v_now; v_quota.minute_count := 0; end if;
  if v_quota.day_count >= 80 then
    v_retry := greatest(1, ceil(extract(epoch from (((v_day + 1)::timestamp at time zone 'UTC') - v_now)))::integer);
    return jsonb_build_object('allowed', false, 'retry_after', v_retry, 'remaining_daily', 0);
  end if;
  if v_quota.minute_count >= 8 then
    v_retry := greatest(1, ceil(extract(epoch from (v_quota.minute_start + interval '1 minute' - v_now)))::integer);
    return jsonb_build_object('allowed', false, 'retry_after', v_retry, 'remaining_daily', 80 - v_quota.day_count);
  end if;
  update public.chat_rate_limit set minute_start = v_quota.minute_start, minute_count = v_quota.minute_count + 1,
    day_start = v_quota.day_start, day_count = v_quota.day_count + 1 where user_id = v_uid;
  return jsonb_build_object('allowed', true, 'retry_after', 0, 'remaining_daily', 79 - v_quota.day_count);
end;
$$;

-- Public APIs are SECURITY INVOKER wrappers. Privileged bodies live in a non-exposed schema.
create function public.upsert_profile(p_name text, p_university text, p_district text, p_role text)
returns jsonb language sql security invoker set search_path = '' as $$
  select uniride_private.upsert_profile(p_name, p_university, p_district, p_role);
$$;
create function public.get_driver_profile(p_driver_id uuid)
returns jsonb language sql stable security invoker set search_path = '' as $$ select uniride_private.get_driver_profile(p_driver_id); $$;
create function public.create_ride(p_origin_district text, p_destination_campus text, p_meeting_point text,
  p_departure_at timestamptz, p_seats integer, p_price numeric)
returns jsonb language sql security invoker set search_path = '' as $$
  select uniride_private.create_ride(p_origin_district, p_destination_campus, p_meeting_point, p_departure_at, p_seats, p_price);
$$;
create function public.request_seat(p_ride_id uuid)
returns jsonb language sql security invoker set search_path = '' as $$ select uniride_private.request_seat(p_ride_id); $$;
create function public.respond_booking(p_booking_id uuid, p_accept boolean)
returns jsonb language sql security invoker set search_path = '' as $$ select uniride_private.respond_booking(p_booking_id, p_accept); $$;
create function public.cancel_booking(p_booking_id uuid)
returns jsonb language sql security invoker set search_path = '' as $$ select uniride_private.cancel_booking(p_booking_id); $$;
create function public.cancel_ride(p_ride_id uuid)
returns jsonb language sql security invoker set search_path = '' as $$ select uniride_private.cancel_ride(p_ride_id); $$;
create function public.confirm_trip(p_booking_id uuid, p_phase text)
returns jsonb language sql security invoker set search_path = '' as $$ select uniride_private.confirm_trip(p_booking_id, p_phase); $$;
create function public.submit_review(p_booking_id uuid, p_rating integer)
returns jsonb language sql security invoker set search_path = '' as $$ select uniride_private.submit_review(p_booking_id, p_rating); $$;
create function public.submit_lead(p_email text, p_name text default '', p_privacy_consent boolean default false,
  p_marketing_opt_in boolean default false, p_source text default 'web', p_website text default '')
returns jsonb language sql security invoker set search_path = '' as $$
  select uniride_private.submit_lead(p_email, p_name, p_privacy_consent, p_marketing_opt_in, p_source, p_website);
$$;
create function public.consume_chat_quota()
returns jsonb language sql security invoker set search_path = '' as $$ select uniride_private.consume_chat_quota(); $$;

-- Explicit Data API grants are required independently of RLS (October 2026 change).
revoke all on public.profiles, public.rides, public.bookings, public.trip_confirmations,
  public.reviews, public.leads, public.chat_rate_limit from public, anon, authenticated;
grant select on public.profiles, public.rides, public.bookings, public.trip_confirmations, public.reviews to authenticated;
revoke all on uniride_private.lead_rate_limit from public, anon, authenticated;

-- Default PostgreSQL EXECUTE to PUBLIC must never leave a definer callable anonymously.
revoke all on all functions in schema uniride_private from public, anon, authenticated;
grant execute on function uniride_private.can_read_profile(uuid) to authenticated;
grant execute on function uniride_private.upsert_profile(text,text,text,text),
  uniride_private.get_driver_profile(uuid), uniride_private.create_ride(text,text,text,timestamptz,integer,numeric),
  uniride_private.request_seat(uuid), uniride_private.respond_booking(uuid,boolean),
  uniride_private.cancel_booking(uuid), uniride_private.cancel_ride(uuid), uniride_private.confirm_trip(uuid,text),
  uniride_private.submit_review(uuid,integer), uniride_private.consume_chat_quota() to authenticated;
grant execute on function uniride_private.submit_lead(text,text,boolean,boolean,text,text) to anon, authenticated;

revoke all on function public.upsert_profile(text,text,text,text), public.get_driver_profile(uuid),
  public.create_ride(text,text,text,timestamptz,integer,numeric), public.request_seat(uuid),
  public.respond_booking(uuid,boolean), public.cancel_booking(uuid), public.cancel_ride(uuid),
  public.confirm_trip(uuid,text), public.submit_review(uuid,integer), public.consume_chat_quota(),
  public.submit_lead(text,text,boolean,boolean,text,text) from public, anon, authenticated;
grant execute on function public.upsert_profile(text,text,text,text), public.get_driver_profile(uuid),
  public.create_ride(text,text,text,timestamptz,integer,numeric), public.request_seat(uuid),
  public.respond_booking(uuid,boolean), public.cancel_booking(uuid), public.cancel_ride(uuid),
  public.confirm_trip(uuid,text), public.submit_review(uuid,integer), public.consume_chat_quota() to authenticated;
grant execute on function public.submit_lead(text,text,boolean,boolean,text,text) to anon, authenticated;

comment on table public.profiles is 'Academic prototype: university/role are self-declared, not institutional or driver verification.';
comment on table public.leads is 'Private expression of interest. Marketing opt-in is a request, not verified email ownership; no mail is sent by this schema.';
comment on column public.rides.price is 'Proposed shared contribution in PEN; no payment is processed.';
comment on function public.submit_lead(text,text,boolean,boolean,text,text) is 'Uniform accepted response avoids email enumeration. Deliver guide immediately; do not claim a confirmation email was sent.';

notify pgrst, 'reload schema';
commit;
