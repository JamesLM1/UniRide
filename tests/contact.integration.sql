-- Run against the dedicated UniRide project. All synthetic inserts are rolled back.
begin;
set local role anon;
do $$
declare r jsonb; n integer;
begin
 for n in 1..3 loop
  r:=public.submit_contact('Prueba transaccional','contact-test@example.invalid','','interested','Validación técnica de formulario privado',true,'');
  if r->>'accepted' <> 'true' then raise exception 'contact insert failed'; end if;
 end loop;
 r:=public.submit_contact('Prueba transaccional','contact-test@example.invalid','','interested','Prueba del límite por dirección de correo',true,'');
 if r->>'accepted' <> 'false' then raise exception 'contact quota failed'; end if;
 begin
  perform public.submit_contact('Prueba','bad@example.invalid','','interested','Sin consentimiento para esta solicitud',false,'');
  raise exception 'privacy must reject';
 exception when invalid_parameter_value then null; end;
 begin
  perform 1 from public.contact_messages;
  raise exception 'private contact read must reject';
 exception when insufficient_privilege then null; end;
end $$;
rollback;
