'use client';
import {useEffect,useRef,useState} from 'react';

export function ThermalReceipt({title,rows,message,stamp='Vista previa',footnote,compact=false}:{title:string;rows:{label:string;value:string}[];message?:string;stamp?:string;footnote:string;compact?:boolean}){
 const node=useRef<HTMLDivElement>(null);const[cycle,setCycle]=useState(0);
 useEffect(()=>{const el=node.current;if(!el)return;const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){setCycle(1);observer.disconnect();}},{threshold:.2});observer.observe(el);return()=>observer.disconnect();},[]);
 return <div ref={node} className={'reference-thermal '+(compact?'is-compact':'')}>
  <div className="reference-printer" aria-hidden="true"><i/><span>58 MM · UNI</span><small>IMPRESO ✓</small><b/></div>
  <button className="reference-printer-hit" aria-label="Volver a imprimir la vista previa" onClick={()=>setCycle(n=>n+1)}/>
  <div className="reference-thermal-paper" key={cycle} data-printing={cycle>0}>
   <strong>{title}</strong><dl>{rows.map((r,i)=><div key={i}><dt>{r.label}</dt><dd>{r.value}</dd></div>)}</dl>
   {message!==undefined&&<div className="reference-thermal-message"><b>Mensaje</b><p>{message||'Escribe tu mensaje aquí…'}</p></div>}
   <span className="reference-thermal-stamp">{stamp}</span><p className="reference-thermal-note">{footnote}</p>
  </div><small className="reference-printer-caption">toca la impresora para reimprimir</small>
 </div>;
}
