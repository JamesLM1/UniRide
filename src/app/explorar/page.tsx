import type {Metadata} from 'next';
import {RoutePlanner} from '@/components/sites/cobrapp/route-planner';
export const metadata:Metadata={title:'Planifica tu ruta universitaria en Lima',description:'Elige un punto público y tu campus, revisa indicaciones de Google Maps y guarda tu salida en el calendario. Sin compartir tu ubicación.',alternates:{canonical:'/explorar'}};
export default function ExplorePage(){return <RoutePlanner/>;}
