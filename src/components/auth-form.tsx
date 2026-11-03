'use client';

import Link from 'next/link';
import {useEffect,useState,type CSSProperties,type FormEvent} from 'react';
import {useRouter} from 'next/navigation';
import {ArrowLeft,ArrowRight,ArrowUpRight,CarFront,Check,Eye,EyeOff,LoaderCircle,Mail,Users} from 'lucide-react';
import {browserClient} from '@/lib/supabase/browser';
import {institutionalEmail} from '@/lib/calculations.mjs';
import s from './auth-form.module.css';

const roles=[
  {value:'passenger',title:'Pasajero',hint:'Busco un asiento',Icon:Users},
  {value:'driver',title:'Conductor',hint:'Comparto mi ruta',Icon:CarFront},
  {value:'both',title:'Ambos',hint:'Las dos opciones',Icon:ArrowUpRight}
];

export function AuthForm({initialMode='login'}:{initialMode?:'login'|'signup'}={}) {
  const signup=initialMode==='signup';
  const [roleChoice,setRoleChoice]=useState('passenger');
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState('');
  const [error,setError]=useState(false);
  const [show,setShow]=useState(false);
  const [emailValue,setEmailValue]=useState('');
  const router=useRouter();
  useEffect(()=>{setMessage('');setError(false);setShow(false);},[initialMode]);

  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(busy)return;
    setMessage('');setBusy(true);setError(false);
    const values=new FormData(event.currentTarget);
    const email=String(values.get('email')||'').trim();
    const password=String(values.get('password')||'');
    try {
      const sb=browserClient();
      if(signup) {
        if(!institutionalEmail(email))throw new Error('Usa un correo de tu universidad (.edu.pe, upn.pe o usil.pe). Puedes explorar la demo sin cuenta.');
        const {data,error:authError}=await sb.auth.signUp({email,password,options:{data:{name:String(values.get('name')||'').trim(),preferred_role:roleChoice},emailRedirectTo:window.location.origin+'/auth/callback'}});
        if(authError)throw authError;
        if(data.session){router.push('/app/perfil');router.refresh();}
        else setMessage('Si el registro pudo procesarse, recibirás un enlace de confirmación. Revisa tu bandeja y spam; confirma tu correo antes de ingresar.');
      } else {
        const {error:authError}=await sb.auth.signInWithPassword({email,password});
        if(authError)throw new Error('No pudimos iniciar sesión. Revisa tus datos y confirma tu correo si aún no lo hiciste.');
        const next=new URLSearchParams(window.location.search).get('next');
        router.push(next?.startsWith('/app/')?next:'/app/rutas');router.refresh();
      }
    } catch(err) {
      setError(true);
      const raw=err instanceof Error?err.message:String((err as {message?:string})?.message||'No se pudo conectar.');
      setMessage(raw.includes('rate limit')?'El envío alcanzó su límite temporal. Espera un momento o utiliza la demo.':raw.includes('Email address')||raw.includes('email_address_not_authorized')?'El servidor de pruebas no puede enviar a ese correo. Puedes explorar la demo; el envío público requiere configurar SMTP.':raw);
    } finally {setBusy(false);}
  }

  async function recoverPassword() {
    if(busy)return;
    setError(false);
    if(!emailValue.trim()){setMessage('Escribe tu correo para solicitar el enlace de recuperación.');return;}
    setMessage('');setBusy(true);
    try {
      const {error:authError}=await browserClient().auth.resetPasswordForEmail(emailValue.trim(),{redirectTo:window.location.origin+'/auth/callback?next=/actualizar-clave'});
      if(authError)throw authError;
      setMessage('Si la cuenta existe y el envío está habilitado, recibirás un enlace para actualizar tu contraseña.');
    } catch {setError(true);setMessage('No se pudo enviar el enlace. Inténtalo más tarde.');}
    finally {setBusy(false);}
  }

  return <main id="contenido" className={s.page} data-mode={initialMode}>
    <div className={s.particles} aria-hidden="true">{Array.from({length:88},(_,i)=><i key={i} style={{left:((i*37.79+7)%100)+'%',top:((i*61.37+3)%100)+'%','--size':(i%5===0?2:1)+'px','--delay':(-i*.73)+'s','--duration':(16+i%13)+'s','--opacity':.12+(i%4)*.065} as CSSProperties}/>)}</div>
    <div className={s.topbar}><Link href="/" className={s.home}><ArrowLeft size={15}/>Inicio</Link><span>Tu comunidad. Tu camino.</span></div>
    <section className={s.content} aria-labelledby="auth-title">
      <Link href="/" className={s.brand} aria-label="UniRide, inicio">Uni<span>Ride</span><i aria-hidden="true"/></Link>
      <div className={s.intro}><h1 id="auth-title">{signup?'Tu próxima ruta empieza aquí.':'Qué bueno verte de nuevo.'}</h1><p>{signup?'Crea tu cuenta y comparte el camino al campus.':'Ingresa a tu cuenta y retoma tu camino.'}</p></div>
      <form key={initialMode} className={s.form} onSubmit={submit} aria-busy={busy}>
        {signup&&<label className={s.field}><span>Tu nombre</span><input name="name" autoComplete="given-name" minLength={2} maxLength={80} placeholder="¿Cómo te llamas?" disabled={busy} required/></label>}
        <label className={s.field}><span>Correo {signup?'universitario':'electrónico'}</span><div className={s.emailInput}><Mail size={16} aria-hidden="true"/><input name="email" type="email" value={emailValue} onChange={event=>setEmailValue(event.target.value)} autoComplete="email" inputMode="email" spellCheck={false} maxLength={254} placeholder={signup?'tu.nombre@universidad.edu.pe':'tu@correo.com'} disabled={busy} required/></div></label>
        <label className={s.field}><span className={s.passwordLabel}>Contraseña{!signup&&<button type="button" onClick={recoverPassword} disabled={busy}>¿La olvidaste?</button>}</span><div className={s.passwordInput}><input name="password" type={show?'text':'password'} autoComplete={signup?'new-password':'current-password'} minLength={signup?12:1} maxLength={128} placeholder={signup?'Al menos 12 caracteres':'Ingresa tu contraseña'} aria-describedby={signup?'password-hint':undefined} disabled={busy} required/><button type="button" onClick={()=>setShow(!show)} aria-pressed={show} aria-label={show?'Ocultar contraseña':'Mostrar contraseña'}>{show?<EyeOff size={17}/>:<Eye size={17}/>}</button></div>{signup&&<small id="password-hint">Usa una contraseña de 12 caracteres o más.</small>}</label>
        {signup&&<fieldset className={s.roles} disabled={busy}><legend>¿Cómo quieres viajar?</legend><div>{roles.map(({value,title,hint,Icon})=><label key={value} className={roleChoice===value?s.roleSelected:''}><input type="radio" name="role" value={value} checked={roleChoice===value} onChange={()=>setRoleChoice(value)}/><span className={s.roleIcon}><Icon size={18}/>{roleChoice===value&&<Check className={s.roleCheck} size={10}/>}</span><strong>{title}</strong><small>{hint}</small></label>)}</div></fieldset>}
        {signup&&<label className={s.consent}><input type="checkbox" disabled={busy} required/><span>He leído las <Link href="/privacidad">condiciones y el aviso de privacidad</Link>. Confirmar mi correo no verifica mi afiliación ni antecedentes.</span></label>}
        {message&&<p id="auth-message" className={s.message+' '+(error?s.error:'')} role={error?'alert':'status'}>{!error&&<Mail size={16} aria-hidden="true"/>}{message}</p>}
        <button className={s.primary} type="submit" disabled={busy}>{busy?<><LoaderCircle size={17} className={s.spinner}/>Conectando…</>:<>{signup?'Crear mi cuenta':'Iniciar sesión'}<ArrowRight size={16}/></>}</button>
      </form>
      <p className={s.switchMode}>{signup?'¿Ya tienes una cuenta?':'¿Todavía no tienes cuenta?'} <Link href={signup?'/ingresar':'/registro'}>{signup?'Inicia sesión':'Únete a UniRide'}<ArrowUpRight size={13}/></Link></p>
      <div className={s.divider}><span>o conoce el proyecto</span></div>
      <Link className={s.secondary} href="/demo">Explorar la demo<ArrowUpRight size={15}/></Link>
      <p className={s.legal}>{signup?'Te enviaremos un enlace para confirmar tu correo universitario.':<>Al continuar, consulta nuestras <Link href="/privacidad">condiciones de uso y privacidad</Link>.</>}</p>
      <p className={s.footnote}><span aria-hidden="true"/>UniRide · Proyecto académico</p>
    </section>
  </main>;
}
