import type {Metadata} from 'next';
import {Checklist} from '@/components/checklist';
export const metadata:Metadata={title:'Tu plan B para ir a la universidad',description:'Descarga un checklist gratuito para preparar una alternativa si cancelan tu traslado universitario en Lima.',alternates:{canonical:'/guia'}};
export default function Page(){return <main id="contenido" className="container"><section className="page-intro compact"><div className="eyebrow">TU GUÍA GRATUITA</div><h1>El viaje puede cambiar.<br/><span>Tu plan B empieza aquí.</span></h1><p>Un checklist sencillo, descargable y sin registro obligatorio.</p></section><Checklist/></main>}
