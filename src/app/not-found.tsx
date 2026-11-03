import Link from 'next/link';
import {MapPin,ArrowRight} from 'lucide-react';
export default function NotFound(){return <main id="contenido" className="empty-page container"><MapPin size={60}/><div className="eyebrow">404 · NOS SALIMOS DE LA RUTA</div><h1>Esta parada no existe.</h1><p>Vuelve al inicio para encontrar tu siguiente destino.</p><Link href="/" className="button">Volver al inicio <ArrowRight size={18}/></Link></main>}
