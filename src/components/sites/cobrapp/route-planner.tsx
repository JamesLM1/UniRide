'use client';
import Link from 'next/link';
import {useMemo,useState} from 'react';
import {ArrowUpRight,CalendarDays,Check,ChevronRight,Copy,MapPin,Navigation,Share2,TrainFront,Car,Footprints} from 'lucide-react';
import {origins,destinations,mapsDirections,mapEmbed,routeSummary,calendarPlan} from '@/lib/mobility';
import styles from './route-planner.module.css';

const modes=[{id:'transit',name:'Transporte público',Icon:TrainFront},{id:'driving',name:'En auto',Icon:Car},{id:'walking',name:'A pie',Icon:Footprints}] as const;
export function RoutePlanner(){
 const[originId,setOriginId]=useState(origins[0].id);
 const[destinationId,setDestinationId]=useState(destinations[0].id);
 const[mode,setMode]=useState<'transit'|'driving'|'walking'>('transit');
 const[departure,setDeparture]=useState('');
 const[notice,setNotice]=useState('');
 const[copyText,setCopyText]=useState('');
 const[checked,setChecked]=useState<string[]>([]);
 const origin=origins.find(p=>p.id===originId)??origins[0];
 const destination=destinations.find(p=>p.id===destinationId)??destinations[0];
 const directions=useMemo(()=>mapsDirections(origin,destination,mode),[origin,destination,mode]);
 const frame=useMemo(()=>mapEmbed(destination),[destination]);
 function downloadCalendar(){try{const content=calendarPlan(origin,destination,departure,new Date(),mode);const url=URL.createObjectURL(new Blob([content],{type:'text/calendar;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='uniride-plan-de-salida.ics';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);setNotice('Calendario descargado. Importa el archivo en tu calendario; el recordatorio no reserva un viaje.');}catch(error){setNotice(error instanceof Error?error.message:'No se pudo crear el recordatorio.');}}
 async function share(){let text='';try{text=routeSummary(origin,destination,departure,mode);if(navigator.share){await navigator.share({title:'Mi plan de traslado · UniRide',text});setNotice('Plan compartido mediante la aplicación que elegiste.');}else{await navigator.clipboard.writeText(text);setNotice('Resumen copiado. Tú eliges a quién enviarlo.');}}catch(error){if(error instanceof DOMException&&error.name==='AbortError')return;setCopyText(text);setNotice('Selecciona y copia el resumen de abajo.');}}
 const tasks=['Confirmar el traslado antes de salir','Revisar el punto de encuentro y el recorrido','Guardar una alternativa de transporte'];
 return <main id="contenido" className={styles.page}>
  <section className={'container '+styles.hero}>
   <nav aria-label="Migas de pan" className={styles.breadcrumb}><Link href="/">Inicio</Link><ChevronRight size={13}/><span>Explorar rutas</span></nav>
   <div className={styles.heroGrid}><div><div className={styles.kicker}>DEL IMPREVISTO A UN PLAN</div><h1>Tu ruta empieza<br/>antes de salir.</h1><p>Elige un punto público y tu campus. Revisa el recorrido, prepara una alternativa y guarda tu salida en el calendario.</p><div className={styles.meta}>LIMA · PLANIFICADOR UNIVERSITARIO</div></div><div className={styles.note} aria-hidden="true"><span>Confirmar el traslado</span><span>Revisar el recorrido</span><span>Guardar mi plan B</span><b>Preparado</b></div></div>
  </section>
  <section className={'container '+styles.workspace} aria-labelledby="planner-title">
   <div className={styles.settings}>
    <span className={styles.kicker}>01 · TU RECORRIDO</span><h2 id="planner-title">¿A qué campus vas?</h2>
    <label htmlFor="route-origin"><MapPin size={16}/> Punto de salida público</label><select id="route-origin" value={originId} onChange={e=>{setOriginId(e.target.value);setNotice('');}}>{origins.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select>
    <label htmlFor="route-campus"><Navigation size={16}/> Campus de destino</label><select id="route-campus" value={destinationId} onChange={e=>{setDestinationId(e.target.value);setNotice('');}}>{destinations.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select>
    <fieldset className={styles.transport}><legend>¿Cómo quieres revisar la ruta?</legend>{modes.map(({id,name,Icon})=><label key={id} className={mode===id?styles.selectedMode:''}><input type="radio" name="route-mode" value={id} checked={mode===id} onChange={()=>setMode(id)}/><Icon size={17}/>{name}</label>)}</fieldset>
    <a className={styles.primary} href={directions} target="_blank" rel="noopener noreferrer">Ver indicaciones en Google Maps <ArrowUpRight size={17}/></a>
    <p className={styles.small}>Google Maps se abre en otra pestaña para consultar sus recorridos y condiciones actuales. UniRide no calcula tráfico, tarifas ni una hora de llegada.</p>
   </div>
   <div className={styles.mapPanel}><div className={styles.mapHeading}><span><MapPin size={16}/> {destination.name}</span><span>ZONA DE REFERENCIA</span></div><iframe title={'Mapa de la zona de '+destination.name} src={frame} loading="lazy" referrerPolicy="strict-origin-when-cross-origin"/><div className={styles.mapCaption}><span>Marcador aproximado de la zona; confirma el acceso exacto en las indicaciones.</span><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors · ODbL</a></div></div>
  </section>
  <section className={styles.alt}><div className={'container '+styles.campuses}><header><span className={styles.kicker}>OCHO DESTINOS · UN MISMO PLAN</span><h2>Explora tu campus</h2><p>Selecciona una zona para actualizar el mapa y el destino de tus indicaciones.</p></header><div className={styles.campusGrid}>{destinations.map((p,i)=><button type="button" key={p.id} onClick={()=>{setDestinationId(p.id);setNotice('Destino actualizado: '+p.name+'.');}} aria-pressed={destinationId===p.id}><span>{String(i+1).padStart(2,'0')}</span><strong>{p.name}</strong><ArrowUpRight size={18}/></button>)}</div></div></section>
  <section className={'container '+styles.prepare} aria-labelledby="prepare-title">
   <header><span className={styles.kicker}>02 · DEJA TU SALIDA LISTA</span><h2 id="prepare-title">Un recordatorio.<br/>Una alternativa a mano.</h2><p>La coordinación empieza con una hora clara. Este plan personal no crea solicitudes ni reserva asientos.</p></header>
   <div className={styles.planPaper}><span className={styles.kicker}>MI PLAN DE TRASLADO</span><h3>{origin.name}<span>→</span>{destination.name}</h3><label htmlFor="route-date">Salida prevista · hora de Lima (UTC−5)</label><input id="route-date" type="datetime-local" value={departure} onChange={e=>{setDeparture(e.target.value);setNotice('');}}/><p className={styles.small}>El calendario añade un aviso 30 minutos antes de la salida. No incluye una duración de viaje estimada.</p><div className={styles.actions}><button type="button" className={styles.primary} onClick={downloadCalendar}><CalendarDays size={17}/> Guardar en calendario</button><button type="button" className={styles.secondary} onClick={share}><Share2 size={17}/> Compartir mi plan</button></div><ul className={styles.checklist}>{tasks.map(task=><li key={task}><label><input type="checkbox" checked={checked.includes(task)} onChange={()=>setChecked(v=>v.includes(task)?v.filter(x=>x!==task):[...v,task])}/><span className={styles.checkIcon}><Check size={14}/></span>{task}</label></li>)}</ul><p className={styles.small}>Esta lista permanece solo mientras esta página está abierta.</p></div>
  </section>
  <div className={'container '+styles.feedback}><p role="status" aria-live="polite">{notice}</p>{copyText&&<label className={styles.copyFallback}><Copy size={16}/> Resumen para copiar<textarea readOnly value={copyText} onFocus={e=>e.target.select()} rows={7}/></label>}</div>
  <section className={styles.alt}><div className={'container '+styles.final}><span className={styles.kicker}>03 · COORDINA CON TU COMUNIDAD</span><h2>Comparte una ruta.<br/>Confirma cada paso.</h2><p>Revisa las rutas publicadas en UniRide o prueba el recorrido completo con datos ficticios. La guía te ayuda a preparar tu plan B.</p><div className={styles.actions}><Link className={styles.primary} href="/app/rutas">Buscar rutas en UniRide <ArrowUpRight size={17}/></Link><Link className={styles.secondary} href="/demo">Probar la demo</Link><Link className={styles.textLink} href="/guia">Preparar mi plan B →</Link></div><details className={styles.providers}><summary>Qué servicios se conectan aquí</summary><p>El mapa público es de OpenStreetMap. Las indicaciones se consultan mediante un enlace oficial de Google Maps. El calendario y el resumen se generan en tu navegador. No pedimos tu ubicación GPS ni publicamos este plan.</p><p>Uber, DiDi y Yango son servicios independientes. Esta página no consulta sus tarifas, no reserva viajes y no está asociada con ellos. Compara las condiciones directamente en sus aplicaciones.</p><p><a href="https://developers.google.com/maps/documentation/urls/get-started" target="_blank" rel="noopener noreferrer">Documentación de Google Maps URLs ↗</a> · <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">Datos y licencia de OpenStreetMap ↗</a></p></details></div></section>
 </main>;
}
