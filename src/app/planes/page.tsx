import type {Metadata} from 'next';
import {ParticipationPlans} from '@/components/sites/cobrapp/participation-plans';
export const metadata:Metadata={title:'Planes y formas de participar',description:'Explora UniRide como visitante, pasajero o conductor. Compara funciones y estima tus aportes de transporte.',alternates:{canonical:'/planes'}};
export default function PlansPage(){return <main id="contenido" className="replica-page"><ParticipationPlans/></main>;}
