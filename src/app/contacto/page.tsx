import type {Metadata} from 'next';
import {ContactExperience} from '@/components/sites/cobrapp/contact-experience';
export const metadata:Metadata={title:'Contacto con el equipo UniRide',description:'Deja una consulta privada sobre el proyecto de movilidad universitaria UniRide.',alternates:{canonical:'/contacto'}};
export default function ContactPage(){return <ContactExperience/>;}
