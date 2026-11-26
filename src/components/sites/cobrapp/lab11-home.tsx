import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, BookOpen, CalendarDays, CarFront, CheckCircle2, Clock3,
  Download, GraduationCap, Handshake, HeartHandshake, MapPin, MessageCircle,
  Play, Route, ShieldCheck, Sparkles, Target, Users, Wallet
} from 'lucide-react';
import {TeamSection} from './team-section';
import styles from './lab11-home.module.css';

const qrRows = ["111111100000011101110011001111111","100000100110111110100111101000001","101110100110110110101001101011101","101110100010011111101010001011101","101110100111111001111011001011101","100000101110101110010110101000001","111111101010101010101010101111111","000000000011001111100110100000000","100101101100111000000101110100000","000100010011110011001100111100011","111011100000111010110100101110101","100001000101010110111111001011010","000011111000001010111010111001010","011100010110101101101110111011011","001100100000100111010001111010110","001001001111110011001110001000010","110110110000011101001100001011010","101110000110110011000001100101010","110010111110000011001100001000101","101001001101011000011011011100000","011101110101110001001000010000011","000110011000111101010000111001011","111100111110111010110010001110101","011110010111101100111110001011010","101110101111110001000100111111010","000000001111110001011111100011001","111111100111010011101010101011110","100000101001101011101110100010000","101110100101101100101000111111001","101110101000110110110010101010010","101110100101101110011001000010101","100000100001101001011101100001000","111111101011011110110100111011010"];

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
      <div className="container">
        <div className={styles.downloadLanding}>
          <div className={styles.downloadIntro}>
            <p className={styles.eyebrow}>APP UNIRIDE · EXPERIENCIA MÓVIL</p>
            <h2 id="descarga-titulo">Tu camino al campus, <span>en tu celular.</span></h2>
            <p>Descubre cómo UniRide ayuda a organizar viajes compartidos, buscar rutas compatibles y coordinar reservas entre estudiantes.</p>
            <ul className={styles.downloadBenefits}>
              <li><CheckCircle2 size={20}/> Rutas y horarios universitarios</li>
              <li><CheckCircle2 size={20}/> Solicitudes y reservas</li>
              <li><CheckCircle2 size={20}/> Comunidad estudiantil</li>
              <li><CheckCircle2 size={20}/> Alertas y acompañamiento de Ruti</li>
            </ul>
            <a href={figmaURL} target="_blank" rel="noopener noreferrer" className={styles.primary}>Explorar el prototipo <ArrowRight size={18}/></a>
          </div>
          <div className={styles.downloadArtwork}>
            <div className={styles.downloadCampus}>
              <Image src="/images/estudiante-campus.webp" fill sizes="(max-width: 900px) 90vw, 490px" alt="Ilustración de una estudiante universitaria utilizando su teléfono cerca del campus"/>
            </div>
            <div className={styles.tiltPhone} aria-label="Vista del prototipo de UniRide en un teléfono inclinado">
              <div className={styles.tiltScreen}>
                <Image src="/images/prototipo-inicio.webp" fill sizes="(max-width: 650px) 165px, 245px" alt="Pantalla inicial del prototipo móvil UniRide"/>
              </div>
            </div>
            <span className={styles.artworkPin}><MapPin size={20}/> Tu ruta al campus</span>
          </div>
          <aside className={styles.downloadStores} aria-label="Disponibilidad de la aplicación">
            <h3>¡Conoce UniRide <span>ahora!</span></h3>
            <p>Disponible como prototipo interactivo</p>
            <div className={styles.storeBadge} aria-label="Google Play, próximamente"><span className={styles.playMark}>▶</span><span><small>Próximamente en</small><strong>Google Play</strong></span></div>
            <div className={styles.storeBadge} aria-label="App Store, próximamente"><span className={styles.appleMark}>●</span><span><small>Próximamente en</small><strong>App Store</strong></span></div>
            <a href="https://uniride-movilidad.vercel.app/descargas" className={styles.qrCard}>
              <svg viewBox="0 0 41 41" role="img" aria-label="Código QR para abrir la página de UniRide en el teléfono" shapeRendering="crispEdges">
                <rect width="41" height="41" fill="#fff"/>
                {qrRows.map((line,y)=>Array.from(line).map((c,x)=>c==='1'?<rect key={x+'-'+y} x={x+4} y={y+4} width="1" height="1" fill="#051b3f"/>:null))}
              </svg>
              <span><strong>Escanea el QR</strong><small>y abre nuestra demo desde tu celular</small></span>
            </a>
            <p className={styles.downloadDisclosure}>Proyecto académico en desarrollo. Aún no se encuentra publicado en las tiendas de aplicaciones.</p>
          </aside>
        </div>
        <div className={styles.downloadFeatureRail} aria-label="Beneficios de UniRide">
          <span><Route size={25}/> Planificación de rutas</span>
          <span><Users size={25}/> Comunidad</span>
          <span><Wallet size={25}/> Ahorro compartido</span>
          <span><CalendarDays size={25}/> Reservas</span>
          <span><ShieldCheck size={25}/> Información clara</span>
        </div>
        <div className={styles.downloadHow}>
          <div><h3>Empezar es <span>muy fácil</span></h3><p>Por ahora, prueba la experiencia en Figma o en nuestra demo web.</p></div>
          <div className={styles.downloadHowStep}><b>1</b><span>Abre el prototipo móvil</span></div>
          <div className={styles.downloadHowStep}><b>2</b><span>Explora las pantallas de UniRide</span></div>
          <div className={styles.downloadHowStep}><b>3</b><span>Conoce y simula los viajes</span></div>
          <Link href="/demo" className={styles.howLink}>Abrir demo <ArrowRight size={17}/></Link>
        </div>
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
