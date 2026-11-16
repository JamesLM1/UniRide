'use client';
import {useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight,Check,Mail} from 'lucide-react';
import {mobilityTestURL} from '@/components/sites/cobrapp/mobility-test';

type Variant='updates'|'test';
const challengeTips:Record<string,string>={
 late:'Anticipar tu salida y revisar los tiempos puede ayudarte a tomar decisiones con menos apuro.',
 expense:'Registrar el costo completo de ida y vuelta ayuda a comparar alternativas.',
 changes:'Tener un plan B y confirmar los acuerdos antes de salir te ayuda a organizarte.',
 coordination:'Verifica el horario, el punto de encuentro y la confirmación del viaje.',
 routes:'Compara recorridos y transbordos antes de elegir una alternativa.'
};
export function LeadForm({source='web',variant='updates'}:{source?:string;variant?:Variant}) {
 const [busy,setBusy]=useState(false);
 const [message,setMessage]=useState('');
 const [done,setDone]=useState(false);
 const [challenge,setChallenge]=useState('');
 const isTest=variant==='test';

 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();setBusy(true);setMessage('');
  const f=new FormData(e.currentTarget);
  const payload={name:f.get('name'),email:f.get('email'),privacy:f.get('privacy')==='on',marketing:f.get('marketing')==='on',website:f.get('website'),source};
  let saved=false;
  try{
   const controller=new AbortController();
   const timer=setTimeout(()=>controller.abort(),5000);
   try{
    const res=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal});
    if(!res.ok){const data=await res.json().catch(()=>({error:'No se pudo guardar el registro.'}));throw new Error(data.error||'No se pudo enviar.');}
    saved=true;
   } finally {clearTimeout(timer);}
   if(!isTest){setDone(true);setMessage('Gracias. Tu solicitud fue recibida. Esta versión no envía un correo automático.');}
  }catch(err){
   if(!isTest)setMessage(err instanceof Error?err.message:'No se pudo enviar. Intenta otra vez.');
  }finally{
   if(isTest){
    // El cuestionario no depende de la disponibilidad del registro de leads.
    // Nunca se afirma que el registro se guardó si el servidor lo rechazó.
    setMessage(saved?'Registro guardado. Abriendo el cuestionario…':'El registro de contacto no se pudo confirmar. El cuestionario se abrirá igualmente.');
    setDone(true);
    window.location.assign(mobilityTestURL);
   }
   setBusy(false);
  }
 }

 return <div className={'lead-form-wrap'+(isTest?' lead-form-test':'')}>
  <div className="eyebrow"><Mail size={15}/>{isTest?' LEAD MAGNET · UNIRIDE':' SIGAMOS EN RUTA'}</div>
  <h3>{isTest?'Completa tu acceso al test gratuito':'¿Te avisamos de las novedades?'}</h3>
  <p>{isTest?'Cuéntanos un poco sobre tu trayecto. Después podrás responder el cuestionario de movilidad universitaria en Google Forms.':'Déjanos tu correo si quieres conocer avances del proyecto. Es opcional: tu resultado y la guía ya están disponibles.'}</p>
  {done?<div className="success-message" role="status"><Check size={20}/><span>{message}{isTest&&<> <a href={mobilityTestURL}>Abrir Google Forms</a></>}</span></div>
  :<form className="stack-form" onSubmit={submit}>
   <div className="field-row">
    <label>Tu nombre<input name="name" placeholder="¿Cómo te llamas?" maxLength={80} autoComplete="given-name" required/></label>
    <label>Correo electrónico<input name="email" type="email" placeholder="tu@correo.com" maxLength={254} autoComplete="email" required/></label>
   </div>
   {isTest&&<>
    <div className="lead-form-mini-title"><span>Tu viaje a la universidad</span><small>Ficha previa · 2 preguntas</small></div>
    <div className="field-row">
     <label>¿A qué universidad vas?
      <select name="university" defaultValue="" required>
       <option value="" disabled>Selecciona una opción</option>
       <option>UPC</option><option>PUCP</option><option>UNMSM</option><option>UNI</option><option>UPN</option><option>UTP</option><option>USIL</option><option>Otra universidad o instituto</option>
      </select>
     </label>
     <label>¿Qué transporte usas más?
      <select name="transport" defaultValue="" required>
       <option value="" disabled>Selecciona una opción</option>
       <option>Bus o combi</option><option>Metropolitano o corredor</option><option>Tren</option><option>Taxi o aplicativo</option><option>Auto propio</option><option>Viaje compartido</option><option>A pie, bicicleta u otro</option>
      </select>
     </label>
    </div>
    <label>¿Qué se te complica más al llegar a clases?
     <select name="challenge" value={challenge} required onChange={e=>setChallenge(e.target.value)}>
      <option value="" disabled>Elige tu principal dificultad</option>
      <option value="late">Llegar tarde o calcular la hora de salida</option>
      <option value="expense">Los gastos diarios de movilidad</option>
      <option value="changes">Cancelaciones y cambios inesperados</option>
      <option value="coordination">Coordinar un viaje con otras personas</option>
      <option value="routes">Encontrar rutas y reducir transbordos</option>
     </select>
    </label>
    {challenge&&<div className="lead-form-check-tip" role="status"><strong>Consejo inicial:</strong> {challengeTips[challenge]}</div>}
    <p className="lead-form-small-note">Esta ficha ofrece orientación inicial en pantalla. Las respuestas sobre universidad y transporte no se guardan ni se transfieren automáticamente a Google Forms; el test oficial se responde allí.</p>
   </>}
   <div className="honeypot" aria-hidden="true"><label>Sitio web<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
   <label className="checkbox-label"><input type="checkbox" name="privacy" required/><span>He leído el <Link href="/privacidad">aviso de privacidad</Link> y autorizo el intento de registro de mis datos de contacto.</span></label>
   <label className="checkbox-label"><input type="checkbox" name="marketing"/><span>Quiero recibir novedades de UniRide cuando el equipo habilite sus comunicaciones (opcional).</span></label>
   <button className="button" type="submit" disabled={busy}>{busy?'Validando…':isTest?'Continuar al test en Google Forms':'Enviar mi interés'} <ArrowUpRight size={17}/></button>
   {isTest&&<p className="lead-form-small-note">El test se abrirá aunque el sistema de registro de contactos no esté disponible. También puedes <a href={mobilityTestURL} target="_blank" rel="noopener noreferrer">abrir directamente el cuestionario</a>.</p>}
   {message&&<p className="form-message error" role="alert">{message}</p>}
  </form>}
 </div>;
}
