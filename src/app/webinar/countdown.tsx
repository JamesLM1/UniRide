'use client';
import {useEffect,useState} from 'react';
import styles from './page.module.css';

const EVENT_START=Date.parse('2026-11-19T19:00:00-05:00');
function timeParts(ms:number){
 const secs=Math.max(0,Math.ceil(ms/1000));
 return [
  {name:'Días',value:Math.floor(secs/86400)},
  {name:'Horas',value:Math.floor(secs/3600)%24},
  {name:'Minutos',value:Math.floor(secs/60)%60},
  {name:'Segundos',value:secs%60}
 ];
}
export function WebinarCountdown(){
 const [remaining,setRemaining]=useState<number|null>(null);
 useEffect(()=>{
  const tick=()=>setRemaining(EVENT_START-Date.now());
  tick();
  const interval=window.setInterval(tick,1000);
  return ()=>window.clearInterval(interval);
 },[]);
 return <div className={styles.countdown} aria-label="Cuenta regresiva del webinar">
   <p className={styles.countLabel}>{remaining!==null&&remaining<=0?'Cuenta regresiva del webinar finalizado':'El webinar comienza en'}</p>
   <div className={styles.countGrid} role="timer" aria-live="off">
    {(remaining===null?timeParts(0):timeParts(remaining)).map(({name,value})=>
     <div key={name} className={styles.countCell}>
      <strong>{remaining===null?'--':String(value).padStart(2,'0')}</strong>
      <span>{name}</span>
     </div>
    )}
   </div>
   {remaining!==null&&remaining<=0&&
    <p className={styles.countFinished} role="status">El webinar del 19 de noviembre de 2026 ya finalizó. El contador se mantiene visible en cero como referencia del evento; no hay una nueva fecha anunciada.</p>}
  </div>;
}
