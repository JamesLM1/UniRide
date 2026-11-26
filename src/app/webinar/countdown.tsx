'use client';
import {useEffect,useState} from 'react';
import styles from './page.module.css';

/** Fecha hipotética del prototipo: NO es un evento convocado oficialmente. */
const DEMO_TARGET_ISO='2026-12-10T19:00:00-05:00';
const TARGET=Date.parse(DEMO_TARGET_ISO);
function parts(ms:number){
 const seconds=Math.max(0,Math.floor(ms/1000));
 return [
  {name:'Días',value:Math.floor(seconds/86400)},
  {name:'Horas',value:Math.floor(seconds/3600)%24},
  {name:'Minutos',value:Math.floor(seconds/60)%60},
  {name:'Segundos',value:seconds%60}
 ];
}
export function WebinarCountdown(){
 const [remaining,setRemaining]=useState<number|null>(null);
 useEffect(()=>{
  const update=()=>setRemaining(TARGET-Date.now());
  update();
  const interval=window.setInterval(update,1000);
  return ()=>window.clearInterval(interval);
 },[]);
 const finished=remaining!==null&&remaining<=0;
 return <div className={styles.countdown} aria-label="Contador demostrativo del webinar">
   <p className={styles.countLabel}>{finished?'La fecha referencial ha pasado':'Próximo webinar · cuenta regresiva de ejemplo'}</p>
   {finished? <div className={styles.countFinished} role="status"><strong>Evento sin nueva fecha confirmada</strong><p>La fecha de demostración terminó. No se ha publicado una grabación oficial. Consulta las novedades del proyecto.</p></div>:
   <div className={styles.countGrid} role="timer" aria-live="off">
    {(remaining===null?parts(0):parts(remaining)).map(({name,value})=><div key={name} className={styles.countCell}><strong>{remaining===null?'--':String(value).padStart(2,'0')}</strong><span>{name}</span></div>)}
   </div>}
   <p className={styles.countContext}>Fecha de demostración del diseño: 10 de diciembre de 2026, 7:00 p. m. (Lima). <strong>No es una convocatoria confirmada.</strong></p>
 </div>;
}
