import {NextResponse} from 'next/server';
import {z} from 'zod';
import {isSameOriginRequest} from '@/lib/request-origin.mjs';
import {serverClient} from '@/lib/supabase/server';
const schema=z.object({name:z.string().trim().min(2).max(80),email:z.email().max(254),phone:z.string().max(25).regex(/^[+0-9 ()-]*$/).default(''),role:z.enum(['interested','passenger','driver','support']),message:z.string().trim().min(10).max(2000),privacy:z.literal(true),website:z.string().max(200).default('')});
export async function POST(req:Request){
  if(!isSameOriginRequest(req))return NextResponse.json({error:'Origen no permitido.'},{status:403});
  if(Number(req.headers.get('content-length')||0)>16384)return NextResponse.json({error:'La consulta es demasiado extensa.'},{status:413});
  const reader=req.body?.getReader();if(!reader)return NextResponse.json({error:'Faltan los datos de la consulta.'},{status:400});
  let body='';let bytes=0;const decoder=new TextDecoder();
  try{while(true){const{done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>16384){await reader.cancel();return NextResponse.json({error:'La consulta es demasiado extensa.'},{status:413});}body+=decoder.decode(value,{stream:true});}body+=decoder.decode();}catch{return NextResponse.json({error:'No pudimos leer la consulta.'},{status:400});}
  const parsed=schema.safeParse((()=>{try{return JSON.parse(body);}catch{return null;}})());
  if(!parsed.success)return NextResponse.json({error:'Revisa el nombre, correo, mensaje y consentimiento.'},{status:400});
  const input=parsed.data;const sb=await serverClient();
  const{data,error}=await sb.rpc('submit_contact',{p_name:input.name,p_email:input.email,p_phone:input.phone,p_visitor_role:input.role,p_message:input.message,p_privacy_consent:input.privacy,p_website:input.website});
  if(error)return NextResponse.json({error:'No pudimos guardar tu consulta. Inténtalo más tarde.'},{status:503});
  if(!data?.accepted)return NextResponse.json({error:'Se alcanzó el límite temporal de consultas. Inténtalo en una hora.'},{status:429,headers:{'Retry-After':'3600'}});
  return NextResponse.json({accepted:true},{headers:{'Cache-Control':'no-store'}});
}
