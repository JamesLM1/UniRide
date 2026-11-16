'use client';
import {useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight,Check,Mail} from 'lucide-react';
import {mobilityTestURL} from '@/components/sites/cobrapp/mobility-test';

export function LeadForm({source='web',variant='updates'}:{source?:string;variant?:'updates'|'test'}) {
 const [busy,setBusy]=useState(false);
 const [message,setMessage]=useState('');
 const [done,setDone]=useState(false);
 const isTest=variant==='test';
 async function submit(e:React.FormEvent<HTMLFormElement>) {
  e.preventDefault(); setBusy(true); setMessage('');
  const f=new FormData(e.currentTarget);
  try {
   const res=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
    name:f.get('name'),email:f.get('email'),privacy:f.get('privacy')==='on',
    marketing:f.get('marketing')==='on',website:f.get('website'),source
   })});
   if(!res.ok){const data=await res.json().catch(()=>({error:'No se pudo guardar el registro.'}));throw new Error(data.error||'No se pudo enviar.');}
   setDone(true);
   if(isTest){setMessage('Registro guardado. Abriendo el test gratuito…');window.location.assign(mobilityTestURL);}
   else setMessage('Gracias. Tu solicitud fue recibida. Esta versión no envía un correo automático.');
  } catch(err){setMessage(err instanceof Error?err.message:'No se pudo enviar. Intenta otra vez.');}
  finally{setBusy(false);}
 }
 return <div className={'lead-form-wrap'+(isTest?' lead-form-test':'')}>
  <div className="eyebrow"><Mail size={15}/>{isTest?' TEST GRATUITO UNIRIDE':' SIGAMOS EN RUTA'}</div>
  <h3>{isTest?'Empieza a organizar tu ruta':'¿Te avisamos de las novedades?'}</h3>
  <p>{isTest?'Completa tus datos para acceder al test gratuito de movilidad universitaria. Tras registrar tu solicitud se abrirá Google Forms.':'Déjanos tu correo si quieres conocer avances del proyecto. Es opcional: tu resultado y la guía ya están disponibles.'}</p>
  {done?<div className="success-message" role="status"><Check size={20}/><span>{message}{isTest&&<> <a href={mobilityTestURL}>Abrir test</a></>}</span></div>
  :<form className="stack-form" onSubmit={submit}>
   <div className="field-row"><label>Tu nombre<input name="name" placeholder="¿Cómo te llamas?" maxLength={80} autoComplete="given-name" required/></label><label>Correo electrónico<input name="email" type="email" placeholder="tu@correo.com" maxLength={254} autoComplete="email" required/></label></div>
   <div className="honeypot" aria-hidden="true"><label>Sitio web<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
   <label className="checkbox-label"><input type="checkbox" name="privacy" required/><span>He leído el <Link href="/privacidad">aviso de privacidad</Link> y autorizo guardar mis datos para esta solicitud.</span></label>
   <label className="checkbox-label"><input type="checkbox" name="marketing"/><span>Quiero recibir novedades de UniRide cuando el equipo habilite sus comunicaciones (opcional).</span></label>
   <button className="button" type="submit" disabled={busy}>{busy?'Enviando…':isTest?'Continuar al test':'Enviar mi interés'} <ArrowUpRight size={17}/></button>
   {message&&<p className="form-message error" role="alert">{message}</p>}
  </form>}
 </div>;
}
