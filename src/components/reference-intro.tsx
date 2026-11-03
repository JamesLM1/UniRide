'use client';
import {useEffect} from 'react';
import {MapPin} from 'lucide-react';
export function ReferenceIntro(){
 useEffect(()=>{const id=setTimeout(()=>document.documentElement.classList.remove('uniride-intro'),1500);return()=>clearTimeout(id);},[]);
 return <div className="reference-splash" aria-hidden="true"><span><MapPin size={48} strokeWidth={2.4}/></span></div>;
}
