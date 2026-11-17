'use client';

import {useState,type FormEvent} from 'react';
import {UserRound,GraduationCap,Phone,CheckCircle2,Send} from 'lucide-react';
import styles from './page.module.css';

export function WebinarRegistrationForm(){
 const [validated,setValidated]=useState(false);
 function handleSubmit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();
  // Demostración local: los datos nunca se envían ni se almacenan.
  setValidated(true);
 }
 return <form className={styles.registrationForm} onSubmit={handleSubmit} onChange={()=>setValidated(false)}>
  <label className={styles.inputWrap}>
   <span>Nombre completo <em>*</em></span>
   <span className={styles.inputControl}><UserRound size={17} aria-hidden="true"/>
    <input type="text" name="name" autoComplete="name" maxLength={100} placeholder="Escribe tu nombre completo" required/>
   </span>
  </label>
  <label className={styles.inputWrap}>
   <span>Correo universitario <em>*</em></span>
   <span className={styles.inputControl}><GraduationCap size={17} aria-hidden="true"/>
    <input type="email" name="email" autoComplete="email" maxLength={254} placeholder="nombre@universidad.edu.pe" required/>
   </span>
  </label>
  <label className={styles.inputWrap}>
   <span>Celular <small>(opcional)</small></span>
   <span className={styles.inputControl}><Phone size={17} aria-hidden="true"/>
    <input type="tel" name="phone" autoComplete="tel" inputMode="tel" maxLength={20} placeholder="Tu número de celular"/>
   </span>
  </label>
  <button type="submit" className={styles.signupButton}>Quiero registrarme <Send size={17}/></button>
  {validated&&<p className={styles.formDemoSuccess} role="status"><CheckCircle2 size={18} aria-hidden="true"/><span>Datos validados en la demostración. No se ha registrado ni enviado una inscripción real.</span></p>}
  <p className={styles.formDisclosure}>Formulario de demostración. Los datos ingresados no se guardan ni se envían a un servidor.</p>
 </form>;
}
