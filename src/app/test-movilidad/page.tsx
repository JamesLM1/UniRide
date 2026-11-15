import type {Metadata} from 'next';
import {Circle, Clock3, MapPin, Wallet} from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Test gratuito de movilidad universitaria',
  description: 'Reflexiona sobre el estrés de tu viaje a la universidad con tres preguntas sobre tu ruta, tus gastos y los imprevistos.',
  alternates: {canonical: '/test-movilidad'},
};

const exampleAnswers = [
  'Decido cómo ir al momento de salir',
  'Tengo una ruta, pero la hora varía',
  'Planeo mi ruta y mi hora de salida',
];

const topics = [
  {Icon: MapPin, title: 'Tu ruta', text: 'Piensa en cuánto de tu traslado puedes planear antes de salir.'},
  {Icon: Wallet, title: 'Tus gastos', text: 'Revisa si tienes claro cuánto te cuesta el trayecto completo.'},
  {Icon: Clock3, title: 'Los imprevistos', text: 'Identifica qué harías si se cancela tu viaje.'},
];

export default function MobilityTestPage() {
  return (
    <main id="contenido" className={styles.landing}>
      <div className={styles.hero}>
        <div className={styles.intro}>
          <p className={styles.kicker}>Test de movilidad universitaria</p>
          <h1>¿Qué tan estresante es <span>llegar a tu universidad?</span></h1>
          <p className={styles.lead}>
            Responde tres preguntas y descubre qué parte de tu viaje al campus puedes preparar mejor.
          </p>
          <p className={styles.instructions}>Usa «Test gratuito» en la cabecera para responder en Google Forms.</p>
        </div>
        <figure className={styles.preview} aria-labelledby="preview-question">
          <figcaption className={styles.caption}>Vista previa · Pregunta 1 de 3</figcaption>
          <h2 id="preview-question">¿Cómo te organizas para salir hacia tu campus?</h2>
          <ul className={styles.answers}>
            {exampleAnswers.map(answer => (
              <li key={answer}><Circle size={18} aria-hidden="true"/>{answer}</li>
            ))}
          </ul>
        </figure>
      </div>
      <section className={styles.topics} aria-labelledby="test-topics">
        <h2 id="test-topics">Qué puedes revisar de tu traslado</h2>
        <ul>
          {topics.map(({Icon, title, text}) => (
            <li key={title}>
              <Icon size={23} aria-hidden="true"/>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
