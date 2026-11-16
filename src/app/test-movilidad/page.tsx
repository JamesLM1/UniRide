import type {Metadata} from 'next';
import {Circle,Clock3,MapPin,Wallet,CheckCircle2,ExternalLink,ClipboardList,Route,MessageCircleQuestion} from 'lucide-react';
import {LeadForm} from '@/components/lead-form';
import {mobilityTestURL} from '@/components/sites/cobrapp/mobility-test';
import styles from './page.module.css';

export const metadata:Metadata={
 title:'Lead Magnet · Test gratuito de movilidad universitaria',
 description:'Organiza tu traslado con el lead magnet de UniRide: test gratuito sobre rutas, gastos e imprevistos.',
 alternates:{canonical:'/test-movilidad'}
};
const answers=['Decido cómo ir al momento de salir','Tengo una ruta, pero la hora varía','Planeo mi ruta y mi hora de salida'];
const topics=[
 {Icon:MapPin,title:'Tu ruta',text:'Reconoce qué puedes organizar antes de salir de casa.'},
 {Icon:Wallet,title:'Tus gastos',text:'Reflexiona sobre cuánto te cuesta el trayecto completo.'},
 {Icon:Clock3,title:'Los imprevistos',text:'Piensa cómo reaccionarías si cambia tu viaje a última hora.'}
];
const steps=[
 {number:'01',Icon:ClipboardList,title:'Completa tu ficha',text:'Indica tus datos de contacto y revisa una orientación inicial sobre tu traslado.'},
 {number:'02',Icon:MessageCircleQuestion,title:'Responde el formulario',text:'Accede a Google Forms y completa las preguntas de movilidad universitaria.'},
 {number:'03',Icon:Route,title:'Prepara tu próxima ruta',text:'Usa las ideas del cuestionario para revisar tu tiempo, tus gastos y un posible plan B.'}
];
export default function MobilityTestPage(){
 return <main id="contenido" className={styles.landing}>
  <section className={styles.hero} aria-labelledby="test-title">
   <div className={styles.intro}>
    <p className={styles.kicker}>LEAD MAGNET · TEST GRATUITO UNIRIDE</p>
    <h1 id="test-title">¿Qué tan estresante es <span>llegar a tu universidad?</span></h1>
    <p className={styles.lead}>Descubre qué hábitos de movilidad puedes mejorar antes de salir al campus. Responde preguntas sobre tu ruta, tus gastos y los imprevistos que aparecen en el camino.</p>
    <ul className={styles.benefits}>
     <li><CheckCircle2 size={19}/> Diagnóstico inicial gratuito</li>
     <li><CheckCircle2 size={19}/> Preguntas sobre tus hábitos de traslado</li>
     <li><CheckCircle2 size={19}/> Sin descargar la aplicación</li>
     <li><CheckCircle2 size={19}/> Formulario oficial de UniRide en Google Forms</li>
    </ul>
    <p className={styles.note}>UniRide es un proyecto académico. El test ofrece orientación general, no garantiza viajes, seguridad ni puntualidad.</p>
   </div>
   <div className={styles.formCard}><LeadForm variant="test" source="web"/></div>
  </section>
  <section className={styles.steps} aria-labelledby="steps-title">
   <div className={styles.sectionHead}><p className={styles.caption}>CÓMO FUNCIONA</p><h2 id="steps-title">Tres pasos para conocer mejor tu movilidad</h2><p>Una experiencia sencilla: tu ficha inicial, el formulario y recomendaciones que puedes considerar en tu próximo trayecto.</p></div>
   <ol className={styles.stepsList}>{steps.map(({number,Icon,title,text})=><li key={number}><span className={styles.number}>{number}</span><Icon size={27} aria-hidden="true"/><h3>{title}</h3><p>{text}</p></li>)}</ol>
  </section>
  <section className={styles.details} aria-labelledby="preview-title">
   <div className={styles.preview}>
    <p className={styles.caption}>VISTA PREVIA · PREGUNTA DEL TEST</p>
    <h2 id="preview-title">¿Cómo te organizas para salir hacia tu campus?</h2>
    <ul className={styles.answers}>{answers.map(answer=><li key={answer}><Circle size={18} aria-hidden="true"/>{answer}</li>)}</ul>
    <p className={styles.previewNote}>Esta es una muestra de las preguntas. Responde el formulario completo en Google Forms.</p>
    <a href={mobilityTestURL} target="_blank" rel="noopener noreferrer" className={styles.formLink}>Abrir el cuestionario <ExternalLink size={16}/></a>
   </div>
   <div className={styles.topics}><h2>¿Qué aspectos revisarás?</h2>
    <ul>{topics.map(({Icon,title,text})=><li key={title}><Icon size={24} aria-hidden="true"/><div><h3>{title}</h3><p>{text}</p></div></li>)}</ul>
    <div className={styles.notePanel}><strong>¿Necesitas una alternativa para llegar a clases?</strong><p>Recuerda revisar la hora de salida, el costo total y un plan B para cambios imprevistos.</p></div>
   </div>
  </section>
 </main>;
}
