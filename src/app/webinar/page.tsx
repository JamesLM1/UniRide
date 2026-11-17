import type {Metadata} from 'next';
import Link from 'next/link';
import {
 ArrowRight,ArrowUpRight,CalendarDays,Clock3,Video,Check,
 GraduationCap,ShieldCheck,Wallet,Route,MapPin,MessagesSquare,
 BellRing,CarFront,Users,Gift,ExternalLink,BookOpen,Timer,HeartHandshake
} from 'lucide-react';
import {WebinarCountdown} from './countdown';
import styles from './page.module.css';

const signupURL='https://docs.google.com/forms/d/e/1FAIpQLSd4VxaOfgOSahu2oIg4FYtMARhnwKA1IfPd2NJYOLOkaOhl4Q/viewform';
const blogURL='https://uniride-movilidad-universitaria.blogspot.com/';

export const metadata:Metadata={
 title:'Webinar gratuito · UniRide',
 description:'Webinar UniRide: organiza tu traslado universitario, compara gastos y prepara un plan B. Jueves 19 de noviembre de 2026 a las 7:00 p. m. (Perú).',
 alternates:{canonical:'/webinar'},
 openGraph:{
  title:'Webinar gratuito de movilidad universitaria | UniRide',
  description:'Descubre cómo llegar al campus con más calma y menos gastos. 19 de noviembre, 7:00 p. m. (hora de Lima).'
 }
};

const themes=[
 {Icon:Route,title:'Organiza tu traslado',text:'Planifica la salida y confirma los acuerdos de tu viaje sin depender de mensajes dispersos.'},
 {Icon:ShieldCheck,title:'Revisa la identidad universitaria',text:'Conoce la verificación por correo institucional y las precauciones antes de compartir un viaje.'},
 {Icon:Wallet,title:'Compara tiempo y gastos',text:'Evalúa el costo total del trayecto y cómo se organiza un aporte entre pasajeros.'},
 {Icon:MapPin,title:'Elige rutas y horarios',text:'Revisa alternativas que se ajusten a tus clases y a tu campus.'},
 {Icon:BellRing,title:'Prepara un plan B',text:'Aprende a reaccionar si cancelan el viaje o cambia la hora de salida.'}
];
const situations=[
 {emoji:'💬',title:'Coordinas viajes en grupos de WhatsApp'},
 {emoji:'❌',title:'Te cancelan a último minuto'},
 {emoji:'🚕',title:'Gastas en taxis de emergencia'},
 {emoji:'⏰',title:'Llegas tarde a clases o evaluaciones'},
 {emoji:'🚏',title:'Sientes inseguridad al esperar en paraderos'},
 {emoji:'🤝',title:'Pierdes tiempo negociando tarifas'}
];
const results=[
 {stat:'93 %',figure:'27 de 29',description:'Mostró interés en una app de viajes compartidos entre estudiantes verificados.'},
 {stat:'93 %',figure:'27 de 29',description:'Valoró la posibilidad de contar con alternativas ante una cancelación.'},
 {stat:'76 %',figure:'22 de 29',description:'Consideró importante reservar con anticipación y conocer el precio.'}
];

export default function WebinarPage(){
 return <main id="contenido" className={styles.page}>
  <div className={styles.shell}>
   <div className={styles.eventHead}>
    <div className={styles.brandPanel}>
     <span className={styles.brand}>Uni<span>Ride</span></span>
     <span className={styles.eventEdition}>ENCUENTRO UNIVERSITARIO · LIMA</span>
    </div>
    <div className={styles.eventMeta} aria-label="Datos del evento">
     <span><CalendarDays size={17} aria-hidden="true"/> Jueves 19 de noviembre</span>
     <span><Clock3 size={17} aria-hidden="true"/> 7:00 p. m. · Perú</span>
     <span><Video size={17} aria-hidden="true"/> Webinar gratuito</span>
    </div>
   </div>

   <section className={styles.hero} aria-labelledby="webinar-title">
    <div className={styles.heroCopy}>
     <div className={styles.eyebrow}><span className={styles.signal}/> WEBINAR EN VIVO · UNIRIDE</div>
     <h1 id="webinar-title">Llega a tu universidad con <span>más calma y menos gasto.</span></h1>
     <p className={styles.heroLead}>Aprende a comparar rutas y gastos, coordinar viajes compartidos y preparar un plan B para cuando tu traslado cambie.</p>
     <WebinarCountdown/>
     <div className={styles.heroLinks}>
      <a className={styles.primaryLink} href="#inscripcion">Reserva tu lugar gratis <ArrowRight size={17}/></a>
      <a className={styles.secondaryLink} href="#temario">Ver el temario <ArrowRight size={15}/></a>
     </div>
    </div>

    <figure className={styles.heroPhoto}>
     <img
      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1100&q=85"
      alt="Estudiantes universitarios conversando y trabajando juntos"
      loading="eager"
     />
     <figcaption><GraduationCap size={17}/> Movilidad universitaria en Lima</figcaption>
    </figure>

    <aside id="inscripcion" className={styles.signup} aria-label="Inscripción al webinar">
     <div className={styles.signupIcon}><CalendarDays size={25}/></div>
     <span className={styles.signupKicker}>INSCRIPCIÓN ABIERTA</span>
     <h2>Reserva tu lugar <span>¡es gratis!</span></h2>
     <p>Completa el formulario oficial de UniRide para solicitar tu inscripción.</p>
     <div className={styles.formPreview} aria-label="Campos solicitados en Google Forms">
      <div><Users size={17}/><span>Nombre completo</span></div>
      <div><GraduationCap size={17}/><span>Correo universitario</span></div>
      <div><CarFront size={17}/><span>Celular (opcional)</span></div>
     </div>
     <a className={styles.signupButton} href={signupURL} target="_blank" rel="noopener noreferrer">
      Quiero registrarme <ExternalLink size={17}/>
     </a>
     <p className={styles.dataNote}>El registro se completa en Google Forms, no en esta página. Los datos se usarán para gestionar la inscripción al webinar.</p>
     <a className={styles.textLink} href="#temario">Conoce lo que aprenderás <ArrowRight size={14}/></a>
    </aside>
   </section>

   <ul className={styles.trustStrip} aria-label="El webinar está pensado para ti">
    <li><GraduationCap size={19}/> Para estudiantes universitarios</li>
    <li><Timer size={19}/> Consejos aplicables a tu rutina</li>
    <li><HeartHandshake size={19}/> Bienestar y puntualidad</li>
   </ul>

   <section className={styles.section} id="temario" aria-labelledby="temario-title">
    <div className={styles.sectionIntro}>
     <p className={styles.sectionEyebrow}>EL PROGRAMA</p>
     <h2 id="temario-title">En este webinar aprenderás</h2>
     <p>Ideas prácticas para preparar el camino a clases, revisar acuerdos y decidir mejor ante imprevistos.</p>
    </div>
    <div className={styles.themeGrid}>
     {themes.map(({Icon,title,text},i)=>
      <article className={styles.themeCard} key={title}>
       <div className={styles.topicNumber}>0{i+1}</div>
       <span className={styles.themeIcon}><Icon size={25}/></span>
       <h3>{title}</h3>
       <p>{text}</p>
      </article>
     )}
    </div>
   </section>

   <section className={styles.problemSection} aria-labelledby="situaciones-title">
    <div className={styles.sectionIntro}>
     <p className={styles.sectionEyebrow}>PROBLEMAS COTIDIANOS</p>
     <h2 id="situaciones-title">¿Te identificas con alguna de estas situaciones?</h2>
     <p>El webinar parte de dificultades habituales que los universitarios pueden encontrar en su traslado.</p>
    </div>
    <div className={styles.situationGrid}>
     {situations.map(({emoji,title})=><article key={title} className={styles.situationCard}><span aria-hidden="true">{emoji}</span><h3>{title}</h3></article>)}
    </div>
   </section>

   <div className={styles.pair}>
    <section className={styles.organizer} aria-labelledby="organiza-title">
     <div className={styles.sectionEyebrow}>QUIÉNES SOMOS</div>
     <h2 id="organiza-title">¿Quién organiza este webinar?</h2>
     <div className={styles.organizerInfo}>
      <span className={styles.organizerBrand}>Uni<span>Ride</span></span>
      <div>
       <h3>UniRide · Movilidad universitaria</h3>
       <p>Somos un proyecto académico sobre movilidad colaborativa para universitarios de Lima. Nuestro prototipo propone verificación mediante correo institucional y coordinación de viajes compartidos hacia el campus.</p>
      </div>
     </div>
     <div className={styles.chips}><span>Verificación universitaria</span><span>Encuesta académica</span><span>Modelo colaborativo</span></div>
    </section>

    <section className={styles.bonuses} aria-labelledby="bonos-title">
     <div className={styles.sectionEyebrow}>RECURSOS GRATUITOS</div>
     <h2 id="bonos-title"><Gift size={24}/> Llévate herramientas para tu ruta</h2>
     <ul>
      <li><Check size={18}/><span><strong><Link href="/guia">Checklist de viaje universitario <ArrowUpRight size={13}/></Link></strong><small>Organiza tu traslado paso a paso.</small></span></li>
      <li><Check size={18}/><span><strong>Guía breve de rutas y horarios</strong><small>Ideas para planificar tu salida.</small></span></li>
      <li><Check size={18}/><span><strong>Beneficio de bienvenida de S/ 5</strong><small>Promoción propuesta para cuando se habilite; no vigente.</small></span></li>
     </ul>
    </section>
   </div>

   <section className={styles.surveySection} aria-labelledby="encuesta-title">
    <div className={styles.sectionIntro}>
     <p className={styles.sectionEyebrow}>ESCUCHA A LOS ESTUDIANTES</p>
     <h2 id="encuesta-title">Lo que nos contaron otros universitarios</h2>
     <p>Resultados compartidos por el equipo UniRide en sus materiales académicos.</p>
    </div>
    <div className={styles.surveyGrid}>
     {results.map(item=><div className={styles.surveyCard} key={item.description}>
      <strong>{item.stat}</strong>
      <span>{item.figure}</span>
      <p>{item.description}</p>
     </div>)}
    </div>
    <p className={styles.source}>Fuente: encuesta del equipo UniRide a 29 estudiantes. Cifras proporcionadas por el proyecto y no verificadas de forma independiente.</p>
   </section>

   <section className={styles.finalCta} aria-labelledby="cta-title">
    <div>
     <p className={styles.finalEyebrow}>NOS VEMOS EN EL WEBINAR</p>
     <h2 id="cta-title">Tu camino al campus empieza antes de salir.</h2>
     <p>Jueves 19 de noviembre · 7:00 p. m. (hora de Lima). Inscripción gratuita mediante Google Forms.</p>
    </div>
    <a href={signupURL} target="_blank" rel="noopener noreferrer" className={styles.finalButton}>Inscribirme gratis <ArrowUpRight size={19}/></a>
   </section>

   <footer className={styles.webinarFooter}>
    <span className={styles.footerBrand}>Uni<span>Ride</span></span>
    <p>Proyecto académico UPC · Movilidad universitaria en Lima.</p>
    <div><Link href="/">Volver a Inicio</Link><a href={blogURL} target="_blank" rel="noopener noreferrer">Blog UniRide</a><Link href="/privacidad">Privacidad</Link></div>
   </footer>
  </div>
 </main>;
}
