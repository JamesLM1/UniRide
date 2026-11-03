create index reviews_author_idx on public.reviews (author_id);
create policy leads_no_direct_access on public.leads for all to anon, authenticated using (false) with check (false);
create policy chat_quota_no_direct_access on public.chat_rate_limit for all to anon, authenticated using (false) with check (false);
create policy lead_limit_no_direct_access on uniride_private.lead_rate_limit for all to anon, authenticated using (false) with check (false);
