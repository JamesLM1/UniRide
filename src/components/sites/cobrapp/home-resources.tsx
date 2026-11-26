'use client';

import Link from 'next/link';
import {ArrowRight,BookOpen,Calculator,GraduationCap,MessageCircle,Navigation,ShieldCheck} from 'lucide-react';
import {OfflineGuide} from './offline-guide';
import styles from './lab11-home.module.css';

const resources = [
  {title:'Guía del Plan B',text:'Confirma qué cambió, compara alternativas y avisa a tu equipo. Un checklist para llevar contigo.',icon:BookOpen,href:'/guia',label:'Preparar mi plan B'},
  {title:'Calculadora de gastos',text:'Compara dos alternativas con tus propios costos y el mismo número de trayectos.',icon:Calculator,href:'/calculadora',label:'Comparar mis gastos'},
  {title:'Contenido para el camino',text:'Consejos del equipo sobre puntualidad, cancelaciones, viajes compartidos y presupuesto.',icon:GraduationCap,href:'/blog',label:'Leer el blog'},
  {title:'Pregúntale a Ruti',text:'Abre nuestro asistente para orientarte sobre UniRide y sus guías. No consulta tus reservas.',icon:MessageCircle,href:null,label:'Conversar con Ruti'},
  {title:'Conoce la privacidad',text:'Revisa cómo se usan los datos del perfil, las solicitudes y las confirmaciones del prototipo.',icon:ShieldCheck,href:'/privacidad',label:'Revisar la privacidad'},
  {title:'Explora antes de salir',text:'Consulta el mapa, abre indicaciones y prepara un recordatorio para tu próximo traslado.',icon:Navigation,href:'/explorar',label:'Explorar mi ruta'}
];

export function HomeResources(){
  return <>
    <section id="recursos" className={styles.resourcesSection} aria-labelledby="recursos-titulo">
      <div className="container">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>PREPARA TU SIGUIENTE SALIDA</p>
          <h2 id="recursos-titulo">Más recursos para <span>organizar tu camino.</span></h2>
          <p>Empieza con una herramienta útil. Puedes explorar estos recursos sin contratar un plan.</p>
        </div>
        <div className={styles.resourcesGrid}>{resources.map(({title,text,icon:Icon,href,label})=><article className={styles.resourceCard} key={title}>
          <Icon size={25} aria-hidden="true"/><h3>{title}</h3><p>{text}</p>
          {href?<Link href={href}>{label}<ArrowRight size={16}/></Link>:<button type="button" onClick={()=>window.dispatchEvent(new Event('uniride:open-chat'))}>{label}<ArrowRight size={16}/></button>}
        </article>)}</div>
      </div>
    </section>
    <section id="plan-b" className={styles.planSection} aria-label="Guarda tu Plan B"><div className="container"><OfflineGuide/></div></section>
  </>;
}
