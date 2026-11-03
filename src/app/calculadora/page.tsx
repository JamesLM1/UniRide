import type {Metadata} from 'next';
import {Calculator} from '@/components/calculator';
export const metadata:Metadata={title:'Calculadora de gastos en transporte universitario',description:'Compara tu gasto actual de transporte con otra alternativa. Calcula una diferencia mensual estimada con tus propios datos, gratis y sin registro.',alternates:{canonical:'/calculadora'}};
export default function Page(){return <main id="contenido" className="container"><section className="page-intro compact"><div className="eyebrow">CALCULADORA GRATUITA</div><h1>Haz números.<br/><span>Después, elige tu ruta.</span></h1><p>Una estimación simple, con los gastos que tú conoces.</p></section><Calculator/></main>}
