import type {Metadata} from 'next';
import {articles} from '@/lib/articles';
import {BlogIndex} from '@/components/sites/cobrapp/blog-index';
export const metadata:Metadata={title:'Blog de movilidad universitaria en Lima',description:'Los 12 artículos del equipo UniRide: rutas, seguridad, viajes compartidos, cancelaciones, puntualidad y presupuesto universitario en Lima.',alternates:{canonical:'/blog'}};
export default function Blog(){const summaries=articles.map(({sections,blocks,...summary})=>summary);return <BlogIndex articles={summaries}/>;}
