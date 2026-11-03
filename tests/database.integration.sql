-- Integration tests use isolated, synthetic accounts and always ROLLBACK.
-- Run as the project owner. No messages, credentials or real bookings are created.
begin;
do $$
declare
 driver uuid:=gen_random_uuid(); passenger uuid:=gen_random_uuid(); outsider uuid:=gen_random_uuid();
 ride_id uuid; first_booking uuid; second_booking uuid; result jsonb; n integer;
begin
 insert into auth.users (id,email,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,aud,role)
 values (driver,'uniride-integration-driver@example.invalid',now(),'{"provider":"email"}','{"name":"Conductor de prueba"}','authenticated','authenticated'),
 (passenger,'uniride-integration-passenger@example.invalid',now(),'{"provider":"email"}','{"name":"Pasajero de prueba"}','authenticated','authenticated'),
 (outsider,'uniride-integration-outsider@example.invalid',now(),'{"provider":"email"}','{"name":"Tercero de prueba"}','authenticated','authenticated');
 perform set_config('request.jwt.claims',jsonb_build_object('sub',driver,'role','authenticated','is_anonymous',false)::text,true);
 execute 'set local role authenticated';
 perform public.upsert_profile('Conductor de prueba','UPC','San Miguel','driver');
 result:=public.create_ride('San Miguel','UPC · Monterrico','Plaza pública de prueba',now()+interval '15 minutes',1,5);
 ride_id:=(result->>'id')::uuid;
 begin
  perform public.request_seat(ride_id); raise exception 'TEST: accepted own ride';
 exception when invalid_parameter_value then null; end;
 perform set_config('request.jwt.claims',jsonb_build_object('sub',passenger,'role','authenticated','is_anonymous',false)::text,true);
 perform public.upsert_profile('Pasajero de prueba','UPC','San Miguel','passenger');
 result:=public.request_seat(ride_id); first_booking:=(result->>'id')::uuid;
 if (public.request_seat(ride_id)->>'id')::uuid<>first_booking then raise exception 'TEST: duplicated booking'; end if;
 if (select seats_available from public.rides where id=ride_id)<>1 then raise exception 'TEST: pending consumed seat'; end if;
 perform set_config('request.jwt.claims',jsonb_build_object('sub',outsider,'role','authenticated','is_anonymous',false)::text,true);
 perform public.upsert_profile('Tercero de prueba','UNI','Los Olivos','passenger');
 if (select count(*) from public.profiles where id=passenger)<>0 then raise exception 'TEST: third-party profile leaked'; end if;
 if (select count(*) from public.bookings where id=first_booking)<>0 then raise exception 'TEST: third-party booking leaked'; end if;
 begin perform public.cancel_booking(first_booking); raise exception 'TEST: unauthorized cancellation'; exception when insufficient_privilege then null; end;
 result:=public.request_seat(ride_id); second_booking:=(result->>'id')::uuid;
 perform set_config('request.jwt.claims',jsonb_build_object('sub',driver,'role','authenticated','is_anonymous',false)::text,true);
 perform public.respond_booking(first_booking,true);
 perform public.respond_booking(first_booking,true);
 if (select seats_available from public.rides where id=ride_id)<>0 then raise exception 'TEST: acceptance capacity/idempotency'; end if;
 begin perform public.respond_booking(second_booking,true); raise exception using errcode='ZX001',message='TEST: overbooking allowed'; exception when raise_exception then null; end;
 begin update public.rides set seats_available=7 where id=ride_id; raise exception 'TEST: direct write permitted'; exception when insufficient_privilege then null; end;
 perform set_config('request.jwt.claims',jsonb_build_object('sub',passenger,'role','authenticated','is_anonymous',false)::text,true);
 perform public.cancel_booking(first_booking); perform public.cancel_booking(first_booking);
 if (select seats_available from public.rides where id=ride_id)<>1 then raise exception 'TEST: cancellation restored wrong capacity'; end if;
 perform set_config('request.jwt.claims',jsonb_build_object('sub',driver,'role','authenticated','is_anonymous',false)::text,true);
 perform public.respond_booking(second_booking,true);
 perform public.confirm_trip(second_booking,'start');
 begin perform public.confirm_trip(second_booking,'end'); raise exception using errcode='ZX001',message='TEST: finished without both starts'; exception when raise_exception then null; end;
 perform set_config('request.jwt.claims',jsonb_build_object('sub',outsider,'role','authenticated','is_anonymous',false)::text,true);
 perform public.confirm_trip(second_booking,'start');
 perform public.confirm_trip(second_booking,'end');
 begin perform public.submit_review(second_booking,5); raise exception using errcode='ZX001',message='TEST: review before complete'; exception when raise_exception then null; end;
 perform set_config('request.jwt.claims',jsonb_build_object('sub',driver,'role','authenticated','is_anonymous',false)::text,true);
 result:=public.confirm_trip(second_booking,'end');
 if result->>'booking_status'<>'completed' or result->>'ride_status'<>'completed' then raise exception 'TEST: lifecycle did not complete'; end if;
 perform public.submit_review(second_booking,5); perform public.submit_review(second_booking,1);
 if (select count(*) from public.reviews where booking_id=second_booking and author_id=driver)<>1 then raise exception 'TEST: duplicate review'; end if;
 for n in 1..8 loop if not (public.consume_chat_quota()->>'allowed')::boolean then raise exception 'TEST: quota denied early'; end if; end loop;
 if (public.consume_chat_quota()->>'allowed')::boolean then raise exception 'TEST: quota not enforced'; end if;
 execute 'reset role';
 perform set_config('request.jwt.claims','{"role":"anon"}',true);
 execute 'set local role anon';
 begin perform count(*) from public.profiles; raise exception 'TEST: anonymous profile read'; exception when insufficient_privilege then null; end;
 begin perform public.request_seat(ride_id); raise exception 'TEST: anonymous booking'; exception when insufficient_privilege then null; end;
 result:=public.submit_lead('uniride-integration-lead@example.invalid','Prueba',true,false,'web','');
 if not (result->>'accepted')::boolean then raise exception 'TEST: lead ingestion'; end if;
 begin perform count(*) from public.leads; raise exception 'TEST: anonymous lead disclosure'; exception when insufficient_privilege then null; end;
 execute 'reset role';
 raise notice 'PASS: ownership, RLS, seat capacity, idempotency, two-party lifecycle, review eligibility, chat quota and private leads.';
end;
$$;
select 'PASS: full database workflow; transaction rolled back' as result;
rollback;
