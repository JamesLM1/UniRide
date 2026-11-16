import type {Metadata} from 'next';
import {Circle,Clock3,MapPin,Wallet,CheckCircle2} from 'lucide-react';
import {LeadForm} from '@/components/lead-form';
import styles from './page.module.css';

export const metadata:Metadata={
 title:'Test gratuito de movilidad universitaria',
 description:'Organiza tu traslado al campus con un test gratuito de UniRide sobre rutas, gastos e imprevistos.',
 alternates:{canonical:'/test-movilidad'}
};
const answers=['Decido cómo ir al momento de salir','Tengo una ruta, pero la hora varía','Planeo mi ruta y mi hora de salida'];
const topics=[
 {Icon:MapPin,title:'Tu ruta',text:'Reconoce qué puedes organizar antes de salir.'},
 {Icon:Wallet,title:'Tus gastos',text:'Reflexiona sobre cuánto te cuesta el trayecto completo.'},
 {Icon:Clock3,title:'Los imprevistos',text:'Piensa qué harías si cambia tu viaje a última hora.'}
];
export default function MobilityTestPage(){
 return <main id="contenido" className={styles.landing}>
  <section className={styles.hero} aria-labelledby="test-title">
   <div className={styles.intro}>
    <p className={styles.kicker}>LEAD MAGNET · TEST GRATUITO UNIRIDE</p>
    <h1 id="test-title">¿Qué tan estresante es <span>llegar a tu universidad?</span></h1>
    <p className={styles.lead}>Descubre qué hábitos de movilidad puedes mejorar antes de salir al campus. Responde un breve cuestionario sobre tu ruta, tus gastos y los imprevistos.</p>
    <ul className={styles.benefits}>
     <li><CheckCircle2 size={19}/> Test gratuito de orientación</li>
     <li><CheckCircle2 size={19}/> Preguntas sobre tu movilidad universitaria</li>
     <li><CheckCircle2 size={19}/> Sin necesidad de descargar la aplicación</li>
    </ul>
    <p className={styles.note}>UniRide es un proyecto académico. El test es orientativo y no garantiza viajes, seguridad ni puntualidad.</p>
   </div>
   <div className={styles.formCard}><LeadForm variant="test" source="web"/></div>
  </section>
  <section className={styles.details} aria-labelledby="preview-title">
   <div className={styles.preview}>
    <p className={styles.caption}>VISTA PREVIA · EJEMPLO DE PREGUNTA</p>
    <h2 id="preview-title">¿Cómo te organizas para salir hacia tu campus?</h2>
    <ul className={styles.answers}>{answers.map(answer=><li key={answer}><Circle size={18} aria-hidden="true"/>{answer}</li>)}</ul>
    <p className={styles.previewNote}>Ejemplo ilustrativo. El cuestionario se responde al continuar a Google Forms.</p>
   </div>
   <div className={styles.topics}><h2>¿Qué aspectos revisarás?</h2>
    <ul>{topics.map(({Icon,title,text})=><li key={title}><Icon size={24} aria-hidden="true"/><div><h3>{title}</h3><p>{text}</p></div></li>)}</ul>
   </div>
  </section>
 </main>;
}
