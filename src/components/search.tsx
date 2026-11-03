'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {MapPin,GraduationCap,ArrowRight} from 'lucide-react';
import {districts,campuses} from '@/lib/config';
export function RouteSearch(){const r=useRouter();const[origin,setOrigin]=useState('');const[destination,setDestination]=useState('');return <form className="hero-search" onSubmit={e=>{e.preventDefault();r.push('/app/rutas?'+new URLSearchParams({origin,destination}));}}><label><MapPin size={19}/><span><small>¿DESDE DÓNDE SALES?</small><select aria-label="Distrito de origen" value={origin} onChange={e=>setOrigin(e.target.value)} required><option value="">Elige tu distrito</option>{districts.map(d=><option key={d}>{d}</option>)}</select></span></label><label><GraduationCap size={20}/><span><small>¿CUÁL ES TU DESTINO?</small><select aria-label="Universidad de destino" value={destination} onChange={e=>setDestination(e.target.value)} required><option value="">Elige tu campus</option>{campuses.map(c=><option key={c}>{c}</option>)}</select></span></label><button className="button" type="submit">Buscar ruta <ArrowRight size={18}/></button></form>}
