import type {Metadata} from 'next';
import {AboutExperience} from '@/components/sites/cobrapp/about-experience';
export const metadata:Metadata={title:'Nosotros · El equipo de UniRide',description:'Conoce la misión, visión, valores y equipo del proyecto académico UniRide de movilidad universitaria colaborativa en Lima.',alternates:{canonical:'/nosotros'}};
export default function Project(){return <AboutExperience/>;}
