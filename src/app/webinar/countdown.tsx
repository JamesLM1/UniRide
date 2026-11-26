'use client';
import {useEffect,useState} from 'react';
import {webinarEvent,webinarTimeParts} from '@/lib/webinar-event.mjs';
import styles from './page.module.css';

const EVENT_START=Date.parse(webinarEvent.startsAt);
export function WebinarCountdown(){
 const [remaining,setRemaining]=useState<number|null>(null);
 useEffect(()=>{
  const tick=()=>setRemaining(EVENT_START-Date.now());
  tick();
  const interval=window.setInterval(tick,1000);
  return ()=>window.clearInterval(interval);
 },[]);
 return <div className={styles.countdown} aria-label="Cuenta regresiva del webinar">
   <p className={styles.countLabel}>{remaining!==null&&remaining<=0?'Fecha de demostración finalizada':'Cuenta regresiva · demostración'}</p>
   <div className={styles.countGrid} role="timer" aria-live="off">
    {webinarTimeParts(remaining??0).map(({name,value})=>
     <div key={name} className={styles.countCell}>
      <strong>{remaining===null?'--':String(value).padStart(2,'0')}</strong>
      <span>{name}</span>
     </div>
    )}
   </div>
   <p className={styles.countFinished}>{remaining!==null&&remaining<=0?'La fecha de demostración terminó. La próxima fecha está por confirmar.':webinarEvent.note}</p>
  </div>;
}
