import Link from 'next/link';
import Image from 'next/image';
import {QRCodeSVG} from 'qrcode.react';
import {
  ArrowRight, Bell, BookOpen, CalendarDays, CarFront, CheckCircle2, Clock3,
  Download, GraduationCap, Handshake, HeartHandshake, MapPin, MessageCircle,
  Play, Route, ShieldCheck, Sparkles, Target, Users, Wallet
} from 'lucide-react';
import {TeamSection} from './team-section';
import styles from './lab11-home.module.css';

const figmaURL = 'https://www.figma.com/design/EHMJtEVMXvPWpxgxVKUQ2Z/Untitled?node-id=0-1&t=reCxmGRqsSyahWq7-1';

const values = [
  {title:'Confianza', description:'Información clara del recorrido y de sus acuerdos.', icon:Handshake},
  {title:'Comunidad', description:'Estudiantes que se organizan y se ayudan entre sí.', icon:Users},
  {title:'Responsabilidad', description:'Decisiones informadas y respeto por lo acordado.', icon:ShieldCheck},
  {title:'Accesibilidad', description:'Opciones y aportes visibles antes de solicitar un asiento.', icon:Wallet},
  {title:'Innovación', description:'Tecnología útil para simplificar el traslado al campus.', icon:Sparkles}
];

const steps = [
  {number:'01',title:'Encuentra tu viaje',description:'Busca por origen, campus y horario. Compara las rutas disponibles antes de elegir.',image:'/images/prototipo-viajes.webp',alt:'Mockup de UniRide con viajes universitarios disponibles.'},
  {number:'02',title:'Solicita y confirma tu asiento',description:'Envía tu solicitud. La reserva se confirma cuando el conductor la acepta.',image:'/images/prototipo-reserva.webp',alt:'Mockup de UniRide con una reserva confirmada.'},
  {number:'03',title:'Comparte y califica',description:'Coordina el punto de encuentro, registra el recorrido y valora la experiencia al terminar.',image:'/images/prototipo-viaje-finalizado.webp',alt:'Mockup de UniRide al finalizar y calificar un viaje.'}
];

const functions = [
  {title:'Viajes y reservas',text:'Consulta horarios, puntos de encuentro y solicitudes desde una misma experiencia.',icon:Route,href:'/funciones/solicitudes',label:'Ver el flujo'},
  {title:'Comunidad universitaria',text:'Un espacio para compartir avisos, recomendaciones y experiencias entre estudiantes.',icon:Users,href:'/demo',label:'Explorar la demo'},
  {title:'Ruti te acompaña',text:'El asistente orienta sobre funciones, dudas frecuentes y alternativas de movilidad.',icon:MessageCircle,href:'/guia',label:'Conocer la guía'},
  {title:'Plan B',text:'Prepara una alternativa ante cancelaciones, cambios de horario o imprevistos.',icon:ShieldCheck,href:'/guia',label:'Abrir mi plan B'},
  {title:'Organiza tus horarios',text:'Visualiza la propuesta de recorridos frecuentes y planificación semanal.',icon:CalendarDays,href:'/como-funciona',label:'Cómo funciona'},
  {title:'Conoce los planes',text:'Compara las propuestas Free, Smart, Pro y Elite del laboratorio.',icon:GraduationCap,href:'/planes',label:'Comparar planes'}
];

export function Lab11Home(){
  return <main id="contenido" className={styles.home}>
    <section className={styles.hero} aria-labelledby="inicio-titulo">
      <div className={styles.heroGlow} aria-hidden="true"/>
      <div className={'container '+styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>PROYECTO ACADÉMICO UPC · MOVILIDAD UNIVERSITARIA EN LIMA</p>
          <h1 id="inicio-titulo">UniRide, tu viaje <span>compartido al campus.</span></h1>
          <p className={styles.heroLead}>Conectamos estudiantes que recorren caminos similares para organizar viajes al campus, coordinar reservas y compartir los acuerdos de cada recorrido.</p>
          <div className={styles.heroActions}>
            <Link href="#proyecto" className={styles.primary}>Conoce UniRide <ArrowRight size={18}/></Link>
            <Link href="/demo" className={styles.secondary}>Explorar prototipo</Link>
          </div>
          <p className={styles.disclaimer}>UniRide es un prototipo académico. No opera viajes ni garantiza disponibilidad, seguridad o puntualidad.</p>
        </div>
        <div className={styles.heroMedia}>
          <Image src="/images/estudiante-campus.webp" width={1120} height={630} alt="Ilustración de una estudiante utilizando su teléfono en el campus universitario" priority sizes="(max-width: 780px) 92vw, 48vw"/>
          <span className={styles.heroTag}><CarFront size={17}/> Tu campus, tu comunidad</span>
        </div>
      </div>
    </section>

    <section id="proyecto" className={styles.section} aria-labelledby="proyecto-titulo">
      <div className="container">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>PRESENTACIÓN DEL PROYECTO</p>
          <h2 id="proyecto-titulo">Una mejor forma de <span>organizar el camino.</span></h2>
          <p>UniRide es una propuesta universitaria de movilidad compartida en Lima. Reúne rutas, horarios, puntos de encuentro y solicitudes en un mismo lugar para que la coordinación sea más sencilla.</p>
        </div>
        <div className={styles.proposalGrid}>
          <article className={styles.proposalMain}>
            <div className={styles.proposalIcon}><Target size={29}/></div>
            <h3>Nuestra propuesta de valor</h3>
            <p>Ayudarte a encontrar estudiantes con recorridos compatibles, revisar las condiciones del viaje y coordinarlo sin perder la información entre distintos mensajes.</p>
            <div className={styles.pillRow}><span><MapPin size={15}/> Rutas y campus</span><span><Clock3 size={15}/> Horarios claros</span><span><MessageCircle size={15}/> Coordinación</span></div>
          </article>
          <div className={styles.proposalSide}>
            <article><CheckCircle2 size={23}/><div><h3>Antes de salir</h3><p>Compara origen, destino, hora, plazas y aporte.</p></div></article>
            <article><CarFront size={23}/><div><h3>Durante el viaje</h3><p>Revisa el punto de encuentro y el estado del recorrido.</p></div></article>
            <article><HeartHandshake size={23}/><div><h3>Después de llegar</h3><p>Califica tu experiencia y sigue conectado a la comunidad.</p></div></article>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.sectionAlt} aria-labelledby="identidad-titulo">
      <div className="container">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>QUIÉNES SOMOS</p>
          <h2 id="identidad-titulo">Nuestra <span>misión, visión y valores.</span></h2>
          <p>Estos principios orientan el diseño de UniRide y las decisiones que buscamos validar con estudiantes.</p>
        </div>
        <div className={styles.missionGrid}>
          <article className={styles.missionCard}><div className={styles.roundIcon}><Target size={25}/></div><h3>Misión</h3><p>Facilitar la organización de viajes compartidos entre universitarios mediante una experiencia digital colaborativa, con información clara y acuerdos responsables.</p></article>
          <article className={styles.missionCard}><div className={styles.roundIcon}><GraduationCap size={25}/></div><h3>Visión</h3><p>Contribuir a una comunidad universitaria más conectada, donde compartir una ruta sea una alternativa accesible, bien organizada y cada vez más confiable.</p></article>
        </div>
        <div className={styles.valuesGrid}>{values.map(({title,description,icon:Icon})=><article key={title} className={styles.valueCard}><Icon size={24}/><h3>{title}</h3><p>{description}</p></article>)}</div>
      </div>
    </section>

    <section id="como-funciona" className={styles.section} aria-labelledby="funciona-titulo">
      <div className="container">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>EXPERIENCIA EN LA APP</p>
          <h2 id="funciona-titulo">De buscar un viaje a <span>llegar al campus.</span></h2>
          <p>Estas son pantallas ilustrativas del prototipo desarrollado para los laboratorios de UniRide.</p>
        </div>
        <div className={styles.steps}>{steps.map(step=><article className={styles.step} key={step.number}>
          <div className={styles.stepTop}><span>{step.number}</span><h3>{step.title}</h3></div>
          <div className={styles.phoneShot}><Image src={step.image} width={402} height={874} alt={step.alt} sizes="(max-width: 650px) 65vw, 250px"/></div>
          <p>{step.description}</p>
        </article>)}</div>
      </div>
    </section>

    <section className={styles.videoSection} aria-labelledby="video-titulo">
      <div className={'container '+styles.videoGrid}>
        <div className={styles.videoWrap}>
          <iframe title="Video externo de referencia U-Carpool de la Pontificia Universidad Católica del Perú" loading="lazy" src="https://www.youtube-nocookie.com/embed/5J72BkzL--s" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/>
        </div>
        <div className={styles.videoCopy}>
          <span className={styles.roundIcon}><Play size={24}/></span>
          <p className={styles.eyebrow}>VIDEO DE PRESENTACIÓN</p>
          <h2 id="video-titulo">La movilidad compartida empieza con <span>una buena conexión.</span></h2>
          <p>Este espacio está reservado para el video oficial de presentación de UniRide, siguiendo el ejemplo del Laboratorio 11.</p>
          <p className={styles.videoNote}>Video temporal de referencia: «U-Carpool», PUCP. Es un proyecto externo, no una demostración de UniRide.</p>
        </div>
      </div>
    </section>

    <TeamSection/>

    <section id="funcionalidades" className={styles.sectionAlt} aria-labelledby="funciones-titulo">
      <div className="container">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>TODO EN UN SOLO LUGAR</p>
          <h2 id="funciones-titulo">Más herramientas para <span>tu vida universitaria.</span></h2>
          <p>Las funciones y planes que plantea nuestro prototipo conectan movilidad, comunicación y comunidad.</p>
        </div>
        <div className={styles.functionsGrid}>{functions.map(({title,text,icon:Icon,href,label})=><article key={title} className={styles.functionCard}>
          <span className={styles.functionIcon}><Icon size={24}/></span><h3>{title}</h3><p>{text}</p>
          <Link href={href}>{label}<ArrowRight size={16}/></Link>
        </article>)}</div>
      </div>
    </section>

    <section id="casos-de-uso" className={styles.section} aria-labelledby="casos-titulo">
      <div className="container">
        <div className={styles.sectionHead}><p className={styles.eyebrow}>PARA QUIÉN ES UNIRIDE</p><h2 id="casos-titulo">Pensado para estudiantes <span>con rutas en común.</span></h2></div>
        <div className={styles.cases}>
          <article><GraduationCap size={26}/><h3>Estudias y vas al campus</h3><p>Revisa opciones compatibles con tu horario de clases y tu sede universitaria.</p></article>
          <article><Users size={26}/><h3>Compartes tu recorrido</h3><p>Organiza un trayecto que ya realizas, indicando horario, plazas y aporte.</p></article>
          <article><BookOpen size={26}/><h3>Tu ruta cambió</h3><p>Consulta recomendaciones y prepara un plan B cuando surge un imprevisto.</p></article>
        </div>
      </div>
    </section>


    <section id="descargar-app" className={styles.downloadSection} aria-labelledby="descarga-titulo">
      <div className={'container '+styles.downloadContainer}>
        <div className={styles.downloadLanding}>
          <div className={styles.downloadIntro}>
            <p className={styles.downloadKicker}>APP UNIRIDE</p>
            <h2 id="descarga-titulo">Descarga la app <span>gratis</span></h2>
            <p>Tu aliada para organizar viajes compartidos al campus, coordinar rutas, reservar asientos y compartir gastos con otros estudiantes.</p>
            <ul className={styles.downloadBenefits}>
              <li><CheckCircle2 size={21}/> Rutas universitarias y horarios</li>
              <li><CheckCircle2 size={21}/> Solicitudes y reservas rápidas</li>
              <li><CheckCircle2 size={21}/> Ahorro compartido en cada viaje</li>
              <li><CheckCircle2 size={21}/> Comunidad estudiantil verificada</li>
              <li><CheckCircle2 size={21}/> Alertas y recordatorios de viaje</li>
            </ul>
          </div>
          <div className={styles.downloadArtwork}>
            <div className={styles.downloadStudentPhoto}>
              <Image src="/images/estudiante-campus.webp" fill alt="Estudiante universitaria usando su celular junto al campus" sizes="(max-width: 760px) 85vw, 480px"/>
            </div>
            <div className={styles.downloadPhoneFrame}>
              <div className={styles.downloadPhoneNotch} aria-hidden="true"/>
              <div className={styles.downloadPhoneScreen}>
                <Image src="/images/prototipo-inicio.webp" fill alt="Pantalla del prototipo móvil UniRide" sizes="(max-width: 760px) 180px, 240px"/>
              </div>
            </div>
          </div>
          <aside className={styles.downloadStores} aria-label="Opciones para conocer UniRide">
            <h3>¡Descárgala <span>ahora!</span></h3>
            <p>Disponible en:</p>
            <div className={styles.storeBadge} aria-label="Google Play, lanzamiento próximamente"><span className={styles.playMark} aria-hidden="true">▶</span><span><small>Próximamente en</small><strong>Google Play</strong></span></div>
            <div className={styles.storeBadge} aria-label="App Store, lanzamiento próximamente"><span className={styles.appleMark} aria-hidden="true">●</span><span><small>Próximamente en</small><strong>App Store</strong></span></div>
            <a href="https://uniride-movilidad.vercel.app/descargas" className={styles.qrCard}>
              <QRCodeSVG value="https://uniride-movilidad.vercel.app/descargas" size={108} level="M" bgColor="#ffffff" fgColor="#051b3f" marginSize={2}/>
              <span><strong>Escanea el QR</strong><small>y conoce nuestra demo desde tu celular</small></span>
            </a>
            <p className={styles.downloadDisclosure}>UniRide es un prototipo académico, todavía no está publicado en las tiendas.</p>
            <a href={figmaURL} target="_blank" rel="noopener noreferrer" className={styles.downloadDemoLink}>Explorar el prototipo <ArrowRight size={15}/></a>
          </aside>
        </div>
        <div className={styles.downloadFeatureRail} aria-label="Beneficios de UniRide">
          <span><MapPin size={30}/> Planificación<br/>de rutas</span>
          <span><Users size={30}/> Comunidad<br/>verificada</span>
          <span><Wallet size={30}/> Ahorro<br/>compartido</span>
          <span><CalendarDays size={30}/> Reservas<br/>rápidas</span>
          <span><Bell size={30}/> Alertas<br/>útiles</span>
        </div>
        <div className={styles.downloadHow}>
          <div className={styles.downloadHowTitle}><h3>Descargar la app <span>es muy fácil</span></h3><ArrowRight size={34}/></div>
          <div className={styles.downloadHowStep}><b>1</b><div><strong>Elige tu tienda</strong><span className={styles.storeGlyphs} aria-hidden="true"><span className={styles.playMark}>▶</span><span className={styles.appleMark}>●</span></span></div></div>
          <div className={styles.downloadHowStep}><b>2</b><Download size={37}/><strong>Descarga UniRide</strong></div>
          <div className={styles.downloadHowStep}><b>3</b><CheckCircle2 size={39}/><strong>Regístrate y empieza hoy</strong></div>
        </div>
        <p className={styles.downloadStepsNote}>Estos son los pasos previstos para el lanzamiento. Mientras tanto, puedes conocer la experiencia en el <a href={figmaURL} target="_blank" rel="noopener noreferrer">prototipo interactivo de Figma</a>.</p>
      </div>
    </section>

    <section id="preguntas-frecuentes" className={styles.faqSection}>
      <div className="container">
        <div className={styles.sectionHead}><p className={styles.eyebrow}>RESOLVEMOS TUS DUDAS</p><h2>Preguntas frecuentes</h2></div>
        <div className={styles.faqs}>
          <details><summary>¿UniRide ya ofrece viajes reales?</summary><p>No. Es un proyecto académico y sus pantallas muestran escenarios de prueba.</p></details>
          <details><summary>¿Cómo se confirma una reserva?</summary><p>En el flujo propuesto, primero envías la solicitud y la reserva queda confirmada cuando el conductor la acepta.</p></details>
          <details><summary>¿Qué hace Ruti?</summary><p>Ruti orienta al usuario sobre el prototipo, preguntas frecuentes y alternativas de traslado. No sustituye la verificación de información ni un servicio de emergencia.</p></details>
          <details><summary>¿Puedo descargar la app?</summary><p>Por ahora puedes abrir el prototipo de Figma y la demostración web. No hay una aplicación publicada en tiendas.</p></details>
        </div>
        <p className={styles.faqExtra}>¿Tienes otra consulta? <Link href="/contacto">Contáctanos <ArrowRight size={15}/></Link></p>
      </div>
    </section>
  </main>;
}
