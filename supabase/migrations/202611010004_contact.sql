begin;

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) between 5 and 254 and email = lower(btrim(email))),
  phone text not null default '' check (char_length(phone) <= 25),
  visitor_role text not null check (visitor_role in ('interested','passenger','driver','support')),
  message text not null check (char_length(message) between 10 and 2000),
  privacy_consent boolean not null check (privacy_consent = true),
  privacy_version text not null default '2026-11-01',
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
revoke all on public.contact_messages from public, anon, authenticated;
create policy contact_messages_no_direct_access on public.contact_messages
for all to anon, authenticated using (false) with check (false);

-- Intentionally anonymous intake. No existing data is returned or updated.
-- Privileged insertion is confined to the non-exposed schema, validated and capped.
create function uniride_private.submit_contact(
  p_name text, p_email text, p_phone text, p_visitor_role text,
  p_message text, p_privacy_consent boolean, p_website text
) returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_email text := lower(btrim(p_email));
  v_limit uniride_private.lead_rate_limit;
  v_email_limit uniride_private.lead_rate_limit;
  v_bucket text;
begin
  if p_website is not null and p_website <> '' then
    return jsonb_build_object('accepted', true);
  end if;
  if p_name is null or char_length(btrim(p_name)) not between 2 and 80
     or v_email is null or char_length(v_email) not between 5 and 254
     or v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
     or p_phone is null or char_length(p_phone) > 25
     or p_phone !~ '^[+0-9 ()-]*$'
     or p_visitor_role is null or p_visitor_role not in ('interested','passenger','driver','support')
     or p_message is null or char_length(btrim(p_message)) not between 10 and 2000
     or p_privacy_consent is distinct from true then
    raise exception using errcode = '22023', message = 'Revisa tus datos, consulta y consentimiento.';
  end if;

  perform pg_advisory_xact_lock(71442027);
  insert into uniride_private.lead_rate_limit values ('contact-global', now(), 0) on conflict do nothing;
  select * into v_limit from uniride_private.lead_rate_limit where bucket = 'contact-global' for update;
  if v_limit.window_start <= now() - interval '1 hour' then
    update uniride_private.lead_rate_limit set window_start = now(), requests = 0 where bucket = 'contact-global';
    v_limit.requests := 0;
  end if;
  if v_limit.requests >= 30 then return jsonb_build_object('accepted', false, 'retry_after', 3600); end if;
  update uniride_private.lead_rate_limit set requests = requests + 1 where bucket = 'contact-global';

  v_bucket := 'contact-email:' || md5(v_email);
  insert into uniride_private.lead_rate_limit values (v_bucket, now(), 0) on conflict do nothing;
  select * into v_email_limit from uniride_private.lead_rate_limit where bucket = v_bucket for update;
  if v_email_limit.window_start > now() - interval '1 hour' and v_email_limit.requests >= 3 then
    return jsonb_build_object('accepted', false, 'retry_after', 3600);
  end if;
  update uniride_private.lead_rate_limit set window_start = now(), requests =
    case when v_email_limit.window_start <= now() - interval '1 hour' then 1 else requests + 1 end
  where bucket = v_bucket;

  insert into public.contact_messages (name,email,phone,visitor_role,message,privacy_consent)
  values (btrim(p_name),v_email,btrim(p_phone),p_visitor_role,btrim(p_message),true);
  return jsonb_build_object('accepted', true);
end;
$$;

create function public.submit_contact(
  p_name text, p_email text, p_phone text default '', p_visitor_role text default 'interested',
  p_message text default '', p_privacy_consent boolean default false, p_website text default ''
) returns jsonb language sql security invoker set search_path = '' as $$
  select uniride_private.submit_contact(p_name,p_email,p_phone,p_visitor_role,p_message,p_privacy_consent,p_website);
$$;
revoke all on function uniride_private.submit_contact(text,text,text,text,text,boolean,text) from public, anon, authenticated;
revoke all on function public.submit_contact(text,text,text,text,text,boolean,text) from public, anon, authenticated;
grant execute on function uniride_private.submit_contact(text,text,text,text,text,boolean,text) to anon, authenticated;
grant execute on function public.submit_contact(text,text,text,text,text,boolean,text) to anon, authenticated;
comment on table public.contact_messages is 'Private academic project contact requests. No messages are sent to third parties or emailed by this schema.';
notify pgrst, 'reload schema';
commit;
