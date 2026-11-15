import type { Metadata } from 'next';
import { PremiumPlans } from './premium-plans';

export const metadata: Metadata = {
  title: 'Planes Premium | Smart, Pro y Elite',
  description: 'Conoce la propuesta de planes Smart, Pro y Elite de UniRide para organizar tus viajes universitarios en Lima. Precios referenciales.',
  alternates: { canonical: '/planes' },
};

export default function PlansPage() {
  return <main id="contenido"><PremiumPlans /></main>;
}
