import type {Metadata} from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
 ArrowRight,ArrowUpRight,CalendarDays,Clock3,Video,Check,
 GraduationCap,ShieldCheck,Wallet,Route,MapPin,MessagesSquare,
 BellRing,CarFront,Users,Gift,ExternalLink,Timer,HeartHandshake
} from 'lucide-react';
import {WebinarCountdown} from './countdown';
import {Reveal,NumberTicker,AuroraBackground} from '@/components/sites/cobrapp/agency-motion';
import {WebinarRegistrationForm} from './registration-form';
import styles from './page.module.css';

export const metadata:Metadata={
 title:'Webinar gratuito · UniRide',
 description:'Conoce cómo organizar tu movilidad al campus, comparar gastos y preparar un plan B. Webinar de UniRide con fecha referencial de demostración, sin convocatoria confirmada.',
 alternates:{canonical:'/webinar'},
 openGraph:{title:'Webinar UniRide · Viaja al campus con más calma',description:'Aprende a planificar rutas, gastos e imprevistos con UniRide. Inscripción simulada. Fecha pendiente de confirmación.'}
};
const topics=[
 {Icon:Route,title:'Organiza tu traslado',description:'Planifica tu salida y confirma los acuerdos sin depender de mensajes dispersos.'},
 {Icon:ShieldCheck,title:'Verifica a tus compañeros',description:'Conoce qué revisar antes de coordinar viajes con estudiantes universitarios.'},
 {Icon:Wallet,title:'Compara tiempo y gastos',description:'Evalúa el costo total de viajar y los aportes de cada pasajero.'},
 {Icon:MapPin,title:'Elige rutas y horarios',description:'Revisa alternativas que se ajusten a tu campus y a tus clases.'},
 {Icon:BellRing,title:'Prepara un plan B',description:'Descubre cómo reaccionar ante cancelaciones y cambios inesperados.'}
];
const problems=[
 {icon:'💬',text:'Coordinas viajes en grupos de WhatsApp'},
 {icon:'❌',text:'Te cancelan a último minuto'},
 {icon:'🚕',text:'Gastas en taxis de emergencia'},
 {icon:'⏰',text:'Llegas tarde a clases o evaluaciones'},
 {icon:'🚏',text:'Sientes inseguridad en los paraderos'},
 {icon:'🤝',text:'Pierdes tiempo acordando tarifas'}
];
const results=[
 {value:'93 %',count:'27 de 29',text:'Mostró interés en una aplicación de viajes compartidos entre estudiantes verificados.'},
 {value:'93 %',count:'27 de 29',text:'Valoró disponer de alternativas cuando se cancela un viaje.'},
 {value:'76 %',count:'22 de 29',text:'Consideró importante reservar con anticipación y conocer el precio.'}
];

export default function WebinarPage(){
 return <main id="contenido" className={styles.page}>
  <section className={styles.hero} aria-labelledby="webinar-title">
   <div className={styles.heroPattern} aria-hidden="true"/><AuroraBackground/>
   <div className={styles.heroContent}>
    <div className={styles.heroCopy}>
     <p className={styles.eyebrow}>MOVILIDAD UNIVERSITARIA EN LIMA · EXPERIENCIA DE WEBINAR</p>
     <h1 id="webinar-title">Tu viaje al campus, <span>con más calma y menos gasto.</span></h1>
     <p className={styles.heroDescription}>Aprende a comparar rutas y gastos, coordinar viajes con tus compañeros y preparar un plan B para llegar mejor a clases.</p>
     <div className={styles.eventMeta}>
      <span><CalendarDays size={17}/> Jueves 10 de diciembre de 2026 (fecha demo)</span>
      <span><Clock3 size={17}/> 7:00 p. m. · Perú</span>
      <span><Video size={17}/> Online · Gratis</span>
     </div>
     <WebinarCountdown/>
     <div className={styles.heroActions}>
      <a href="#inscripcion" className={styles.primaryAction}>Probar inscripción <ArrowRight size={18}/></a>
      <a href="#temario" className={styles.secondaryAction}>Ver el temario <ArrowRight size={16}/></a>
     </div>
     <figure className={styles.heroVisual}>
      <Image src="/images/estudiante-campus.webp" alt="Estudiante universitaria usando su teléfono para organizar un recorrido hacia el campus" fill sizes="(max-width:900px) 100vw, 610px"/>
      <figcaption><GraduationCap size={16}/> UniRide · Movilidad universitaria en Lima</figcaption>
     </figure>
    </div>

    <aside className={styles.signup} id="inscripcion" aria-labelledby="signup-title">
     <div className={styles.signupTop}>
      <span className={styles.signupIcon}><CalendarDays size={23}/></span>
      <div><p className={styles.signupEyebrow}>VISTA PREVIA DEL FORMULARIO</p><h2 id="signup-title">Conoce cómo <span>inscribirte</span></h2></div>
     </div>
     <p className={styles.signupExplanation}>Formulario de prueba visual. Esta página no confirma una reserva ni almacena datos.</p>
     <WebinarRegistrationForm/>
    </aside>
   </div>
   <svg className={styles.wave} viewBox="0 0 1440 150" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 49C185 7 312 17 495 59C716 111 878 170 1098 112C1250 71 1352 25 1440 24V150H0Z" fill="#e8f3fa"/>
    <path d="M0 70C193 10 338 37 538 85C782 150 1010 170 1191 117C1307 84 1384 58 1440 43V150H0Z" fill="#fff"/>
   </svg>
  </section>

  <section className={styles.trust} aria-label="Tres motivos para participar">
   <div className={styles.container}>
    <div><GraduationCap size={22}/><span>Para estudiantes universitarios</span></div>
    <div><Timer size={22}/><span>Consejos para tu día a día</span></div>
    <div><HeartHandshake size={22}/><span>Bienestar y puntualidad</span></div>
   </div>
  </section>

  <section className={styles.themes} id="temario" aria-labelledby="temario-title">
   <div className={styles.container}>
    <header className={styles.sectionHeading}>
     <p className={styles.sectionKicker}>01 · CONTENIDO DEL WEBINAR</p>
     <h2 id="temario-title">En este webinar aprenderás</h2>
     <p>Cinco herramientas para organizar tu ruta con más claridad y reducir imprevistos.</p>
    </header>
    <Reveal><div className={styles.themeGrid}>
     {topics.map(({Icon,title,description},i)=><article className={styles.themeCard} key={title}>
      <div className={styles.themeNumber}>0{i+1}</div>
      <span className={styles.themeIcon}><Icon size={26}/></span>
      <h3>{title}</h3>
      <p>{description}</p>
     </article>)}
    </div></Reveal>
   </div>
  </section>

  <section className={styles.problems} aria-labelledby="situaciones-title">
   <div className={styles.container}>
    <header className={styles.sectionHeading}>
     <p className={styles.sectionKicker}>02 · TU DÍA A DÍA</p>
     <h2 id="situaciones-title">¿Alguna de estas situaciones te resulta familiar?</h2>
     <p>Hablaremos de problemas que pueden complicar el traslado a clases.</p>
    </header>
    <Reveal><div className={styles.problemGrid}>
     {problems.map(item=><article key={item.text}><span aria-hidden="true">{item.icon}</span><h3>{item.text}</h3></article>)}
    </div></Reveal>
   </div>
  </section>

  <section className={styles.organizerSection} aria-label="Organizador y recursos">
   <div className={styles.container}>
    <div className={styles.infoGrid}>
     <article className={styles.infoCard}>
      <p className={styles.sectionKicker}>03 · SOBRE EL PROYECTO</p>
      <h2>¿Quién organiza este webinar?</h2>
      <span className={styles.wordmark}>Uni<span>Ride</span></span>
      <h3>UniRide · Movilidad universitaria</h3>
      <p>Somos un proyecto académico de movilidad colaborativa para estudiantes de Lima. Nuestro prototipo plantea verificación con correo institucional y coordinación de viajes compartidos hacia el campus.</p>
      <div className={styles.chips}><span>Verificación universitaria</span><span>Movilidad colaborativa</span><span>Proyecto UPC</span></div>
     </article>
     <article className={styles.resourceCard}>
      <p className={styles.sectionKicker}>04 · MATERIAL COMPLEMENTARIO</p>
      <h2><Gift size={25}/> Recursos para tu próximo viaje</h2>
      <ul>
       <li><Check size={18}/><span><strong><Link href="/guia">Checklist de viaje universitario <ArrowUpRight size={14}/></Link></strong><small>Organiza tu traslado paso a paso.</small></span></li>
       <li><Check size={18}/><span><strong>Guía breve de rutas y horarios</strong><small>Ideas para comparar alternativas y planificar tu salida.</small></span></li>
       <li><Check size={18}/><span><strong>Beneficio de bienvenida de S/ 5</strong><small>Propuesta para cuando se habilite la promoción; no vigente.</small></span></li>
      </ul>
     </article>
    </div>
   </div>
  </section>

  <section className={styles.results} aria-labelledby="resultados-title">
   <div className={styles.container}>
    <header className={styles.sectionHeading}>
     <p className={styles.sectionKicker}>05 · INVESTIGACIÓN UNIVERSITARIA</p>
     <h2 id="resultados-title">Lo que nos contaron otros estudiantes</h2>
     <p>Resultados de una encuesta académica proporcionados por el equipo UniRide.</p>
    </header>
    <Reveal><div className={styles.resultsGrid}>
     {results.map(x=><article key={x.text}><strong><NumberTicker value={parseInt(x.value,10)} suffix=" %"/></strong><span>{x.count}</span><p>{x.text}</p></article>)}
    </div></Reveal>
    <p className={styles.source}>Fuente: encuesta de UniRide a 29 estudiantes. Datos aportados por el proyecto, no verificados independientemente.</p>
   </div>
  </section>

  <section className={styles.final}>
   <div className={styles.container}>
    <div>
     <p className={styles.finalKicker}>WEBINAR · PROTOTIPO UNIRIDE</p>
     <h2>Tu camino al campus empieza antes de salir.</h2>
     <p>Fecha referencial del prototipo: 10 de diciembre de 2026, 7:00 p. m. (Lima). No confirmada.</p>
    </div>
    <a href="#inscripcion" className={styles.finalButton}>Probar formulario <ArrowUpRight size={18}/></a>
   </div>
  </section>
 </main>;
}
