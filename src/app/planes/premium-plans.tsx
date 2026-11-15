'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight, BadgeCheck, BellRing, CalendarDays,
  Check, ChevronRight, Clock3, Crown, Gem, HeartHandshake,
  MapPinned, Route, ShieldCheck, Sparkles, Star,
  TrendingUp, Users, Wallet, X,
} from 'lucide-react';
import { mobilityTestURL } from '@/components/sites/cobrapp/mobility-test';
import styles from './premium-plans.module.css';

type Period = 'monthly' | 'annual';
type PlanId = 'smart' | 'pro' | 'elite';

const plans = [
  {
    id: 'smart' as const,
    title: 'SMART',
    summary: 'Conecta, descubre y organiza tus viajes',
    monthly: 5,
    icon: Star,
    features: [
      'Explorar viajes hacia tu universidad',
      'Gestionar reservas y confirmaciones',
      'Consultar tu historial de viajes',
      'Acceder a recursos básicos de movilidad',
    ],
  },
  {
    id: 'pro' as const,
    title: 'PRO',
    summary: 'Organiza mejor tus traslados al campus',
    monthly: 10,
    icon: Crown,
    features: [
      'Todo lo propuesto en Smart',
      'Planificador inteligente semanal',
      'Historial y análisis de traslados',
      'Recordatorios y seguimiento de viajes',
      'Sugerencias para organizar tu ruta',
    ],
  },
  {
    id: 'elite' as const,
    title: 'ELITE',
    summary: 'La experiencia más completa con IA',
    monthly: 20,
    icon: Gem,
    features: [
      'Todo lo propuesto en Pro',
      'Coincidencias predictivas de viajes',
      'Sugerencias de rutas según el tráfico',
      'Estimaciones de disponibilidad',
      'Recomendaciones personalizadas con IA',
    ],
  },
];

const comparison: { feature: string; smart: boolean; pro: boolean; elite: boolean }[] = [
  { feature: 'Buscar viajes universitarios', smart: true, pro: true, elite: true },
  { feature: 'Gestionar reservas y confirmaciones', smart: true, pro: true, elite: true },
  { feature: 'Consultar historial de viajes', smart: true, pro: true, elite: true },
  { feature: 'Planificador semanal inteligente', smart: false, pro: true, elite: true },
  { feature: 'Recordatorios de viajes', smart: false, pro: true, elite: true },
  { feature: 'Análisis y seguimiento de traslados', smart: false, pro: true, elite: true },
  { feature: 'Coincidencias predictivas con IA', smart: false, pro: false, elite: true },
  { feature: 'Sugerencias según tráfico y disponibilidad', smart: false, pro: false, elite: true },
];

const quickFeatures = [
  { icon: Route, title: 'Buscar viajes', text: 'Explora propuestas de viajes compartidos hacia tu campus.' },
  { icon: CalendarDays, title: 'Planificar tu semana', text: 'Prepara con anticipación tus próximos traslados universitarios.' },
  { icon: BellRing, title: 'Organizar reservas', text: 'Centraliza la información de tus viajes y confirmaciones.' },
  { icon: Sparkles, title: 'Explorar funciones con IA', text: 'Conoce las recomendaciones previstas para los planes avanzados.' },
];

const faqs = [
  {
    question: '¿Ya puedo pagar un plan Smart, Pro o Elite?',
    answer: 'Todavía no. Esta página presenta un modelo de suscripción propuesto para UniRide en el contexto académico. No hay cobros ni una pasarela de pago habilitada.',
  },
  {
    question: '¿Qué significa la prueba de 14 días?',
    answer: 'Es una propuesta de prueba de Smart por 14 días, vinculada en el modelo comercial a la meta de cinco viajes exitosos. Su activación automática aún no está implementada.',
  },
  {
    question: '¿El importe anual tiene descuento?',
    answer: 'No se ha definido un descuento anual. El selector muestra una referencia equivalente a doce mensualidades para facilitar la comparación.',
  },
  {
    question: '¿UniRide cobra el importe de cada viaje?',
    answer: 'No. Los aportes por trayecto son diferentes de las membresías propuestas: cada conductor define el aporte de su viaje. Esta versión no procesa pagos.',
  },
];

const featuresTitle = [
  { icon: MapPinned, title: 'Movilidad universitaria' },
  { icon: HeartHandshake, title: 'Viajes compartidos' },
  { icon: ShieldCheck, title: 'Planificación informada' },
  { icon: TrendingUp, title: 'Crecimiento inteligente' },
];

export function PremiumPlans() {
  const [period, setPeriod] = useState<Period>('monthly');
  const [selected, setSelected] = useState<PlanId | null>(null);
  const selectedPlan = plans.find(plan => plan.id === selected);

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="planes-title">
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}><Sparkles size={15} /> UNIRIDE · PROPUESTA PREMIUM</span>
            <h1 id="planes-title">Tu camino al campus, <em>a tu manera.</em></h1>
            <p>Organiza tus viajes, planifica mejor tu semana y descubre cómo la movilidad compartida puede evolucionar con herramientas inteligentes.</p>
            <div className={styles.heroActions}>
              <a href="#comparar-planes" className={styles.heroPrimary}>Explorar planes <ArrowRight size={18} /></a>
              <a href={mobilityTestURL} className={styles.heroSecondary} target="_blank" rel="noopener noreferrer">Test gratuito <ChevronRight size={17} /></a>
            </div>
            <p className={styles.heroDisclaimer}>Precios y beneficios referenciales. Proyecto académico UniRide.</p>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.photoFrame}>
              <Image src="/images/estudiante-campus.webp" width={740} height={600} alt="Estudiante universitario organizando un viaje cerca del campus" className={styles.campusImage} priority />
            </div>
            <div className={styles.floatingInfo}><MapPinned size={19} /><span>Tu próxima ruta empieza aquí</span></div>
            <div className={styles.orbit} aria-hidden="true"><Route size={22} /></div>
          </div>
        </div>
        <div className={styles.heroFeatureRow}>
          {featuresTitle.map(item => {
            const Icon = item.icon;
            return <div key={item.title}><Icon size={22} aria-hidden="true"/><span>{item.title}</span></div>;
          })}
        </div>
      </section>

      <section id="comparar-planes" className={styles.pricing} aria-labelledby="pricing-title">
        <div className={styles.sectionIntro}>
          <span className={styles.overline}>PLANES PENSADOS PARA TI</span>
          <h2 id="pricing-title">Elige el plan ideal para <span>tu vida universitaria</span></h2>
          <p>Compara las tres propuestas de UniRide. Smart, Pro y Elite ofrecen distintos niveles de planificación y servicios previstos.</p>
          <div className={styles.periodSwitch} role="group" aria-label="Periodo de comparación de precios">
            <button type="button" className={period === 'monthly' ? styles.activePeriod : ''} aria-pressed={period === 'monthly'} onClick={() => setPeriod('monthly')}>Pago mensual</button>
            <button type="button" className={period === 'annual' ? styles.activePeriod : ''} aria-pressed={period === 'annual'} onClick={() => setPeriod('annual')}>Referencia anual</button>
          </div>
          <p className={styles.periodHint}>El cálculo anual equivale a 12 mensualidades. No se aplica un descuento no confirmado.</p>
        </div>

        <div className={styles.cardGrid}>
          {plans.map(plan => {
            const Icon = plan.icon;
            return (
              <article className={`${styles.planCard} ${styles[plan.id]}`} key={plan.id}>
                {plan.id === 'pro' && <div className={styles.popular}>MÁS DESTACADO</div>}
                <div className={styles.cardHeading}>
                  <div className={styles.planSymbol}><Icon size={28} strokeWidth={2.2} aria-hidden="true" /></div>
                  <h3>Plan {plan.title}</h3>
                  <p>{plan.summary}</p>
                </div>
                <div className={styles.priceTag}>
                  <span className={styles.currency}>S/</span>
                  <strong>{(period === 'monthly' ? plan.monthly : plan.monthly * 12).toFixed(2)}</strong>
                  <span className={styles.unit}>/{period === 'monthly' ? 'mes' : 'año'}</span>
                </div>
                <ul className={styles.included}>
                  {plan.features.map(feature => <li key={feature}><Check size={18} strokeWidth={3} aria-hidden="true" />{feature}</li>)}
                </ul>
                <button type="button" className={styles.chooseButton} aria-pressed={selected === plan.id} onClick={() => setSelected(plan.id)}>
                  {selected === plan.id ? 'Seleccionado' : `Explorar Plan ${plan.title}`} <ArrowRight size={18} />
                </button>
              </article>
            );
          })}
        </div>
        {selectedPlan && (
          <div className={styles.selection} role="status" aria-live="polite">
            <div className={styles.selectionIcon}><BadgeCheck size={26} /></div>
            <div>
              <strong>Has seleccionado el Plan {selectedPlan.title}</strong>
              <p>Esta es una selección informativa. Aún no se activa una membresía ni se realiza un cobro.</p>
            </div>
            <a href={mobilityTestURL} target="_blank" rel="noopener noreferrer">Comenzar con el test <ArrowRight size={17} /></a>
          </div>
        )}
        <p className={styles.pricingNote}>Los planes son parte del modelo de negocio en validación académica. El acceso al prototipo actual es gratuito.</p>
      </section>

      <section className={styles.assurance} aria-label="Detalles del modelo propuesto">
        <div><Clock3 size={27}/><span><strong>14 días</strong><small>Prueba Smart propuesta</small></span></div>
        <div><BadgeCheck size={27}/><span><strong>5 viajes</strong><small>Meta de activación propuesta</small></span></div>
        <div><Users size={27}/><span><strong>Para universitarios</strong><small>Movilidad compartida en Lima</small></span></div>
        <div><ShieldCheck size={27}/><span><strong>Sin cobros activos</strong><small>Propuesta transparente</small></span></div>
      </section>

      <section className={styles.explore} aria-labelledby="explore-title">
        <div className={styles.sectionIntro}>
          <span className={styles.overline}>MUCHO MÁS QUE UNA RUTA</span>
          <h2 id="explore-title">¿Qué podrás hacer con <span>UniRide?</span></h2>
          <p>Estas son algunas de las experiencias actuales y las funciones propuestas para los distintos niveles de servicio.</p>
        </div>
        <div className={styles.featureGrid}>
          {quickFeatures.map(item => {
            const Icon = item.icon;
            return <div className={styles.featureTile} key={item.title}><div className={styles.featureIcon}><Icon size={22}/></div><div><strong>{item.title}</strong><p>{item.text}</p></div></div>;
          })}
        </div>
      </section>

      <section className={styles.compare} aria-labelledby="compare-title">
        <div className={styles.compareHeader}>
          <div><span className={styles.overline}>COMPARA BENEFICIOS</span><h2 id="compare-title">Un plan para cada forma de viajar</h2></div>
          <span className={styles.comparePill}>Funciones previstas · sujeto a validación</span>
        </div>
        <div className={styles.tableScroll}>
          <table className={styles.comparisonTable}>
            <caption>Comparación de los beneficios propuestos para Smart, Pro y Elite</caption>
            <thead><tr><th scope="col">Funcionalidad</th><th scope="col">SMART</th><th scope="col">PRO</th><th scope="col">ELITE</th></tr></thead>
            <tbody>{comparison.map(row=><tr key={row.feature}>
              <th scope="row">{row.feature}</th>
              {(['smart','pro','elite'] as const).map(key=><td key={key}>{row[key] ? <Check size={20} aria-label="Propuesto" className={styles.check}/> : <X size={17} aria-label="No incluido" className={styles.cross}/>}</td>)}
            </tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className={styles.finalSection}>
        <div className={styles.faq}>
          <span className={styles.overline}>RESOLVEMOS TUS DUDAS</span>
          <h2>Preguntas frecuentes</h2>
          {faqs.map(item=><details key={item.question}>
            <summary>{item.question}<span aria-hidden="true">+</span></summary>
            <p>{item.answer}</p>
          </details>)}
        </div>
        <div className={styles.finalCard}>
          <div className={styles.finalIcon}><Wallet size={32}/></div>
          <span className={styles.overline}>TU SIGUIENTE PASO</span>
          <h2>Descubre cómo mejorar tus viajes al campus</h2>
          <p>Empieza con el test gratuito de movilidad, conoce tus hábitos de traslado y explora lo que UniRide podría ofrecerte.</p>
          <a href={mobilityTestURL} target="_blank" rel="noopener noreferrer" className={styles.finalButton}>Realizar test gratuito <ArrowRight size={19}/></a>
          <small>El test es gratuito y se abre en Google Forms.</small>
        </div>
      </section>
      <div className={styles.legalFooter}><Link href="/">← Volver a inicio</Link><span>UniRide · Proyecto académico de movilidad universitaria · Lima, Perú</span></div>
    </div>
  );
}
