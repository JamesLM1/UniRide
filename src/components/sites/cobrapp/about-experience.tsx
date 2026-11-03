'use client';

import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {ArrowUpRight,Check,ChevronRight,Eye,Handshake,Leaf,Route,ShieldCheck,Target,Users,Wallet} from 'lucide-react';
import s from './about.module.css';
import {TeamSection} from './team-section';

const values=[
  {title:'Seguridad',icon:ShieldCheck,text:'Promover decisiones informadas y acuerdos claros antes de compartir el traslado. La verificación documental es una propuesta por implementar.'},
  {title:'Confianza',icon:Handshake,text:'Coordinar con transparencia: revisar el perfil, respetar lo acordado y avisar si cambia el viaje.'},
  {title:'Colaboración',icon:Users,text:'Conectar estudiantes que recorren caminos similares y construir una comunidad que comparta responsabilidades.'},
  {title:'Accesibilidad',icon:Wallet,text:'Facilitar la organización del traslado y mostrar el aporte propuesto antes de solicitar una plaza.'},
  {title:'Innovación sostenible',icon:Leaf,text:'Explorar tecnología útil y un mejor aprovechamiento de los recorridos. El impacto ambiental todavía debe medirse.'}
];
const stages=[
  {label:'El problema',title:'Una mañana que cambia de plan.',text:'Cancelaciones, esperas y mensajes dispersos pueden complicar el traslado a clases.'},
  {label:'La propuesta',title:'Una comunidad, una misma ruta.',text:'UniRide plantea reunir perfiles, rutas, horarios y aportes para coordinar un viaje compartido.'},
  {label:'El prototipo',title:'Un flujo que puedes explorar.',text:'La web permite probar solicitudes, aceptación de plazas y confirmaciones de inicio y final.'},
  {label:'El siguiente paso',title:'Validar antes de prometer.',text:'Las metas de crecimiento, verificaciones, pagos e inteligencia predictiva siguen sujetas a validación e implementación.'}
];

export function AboutExperience(){
  const root=useRef<HTMLElement>(null);
  const[printCycle,setPrintCycle]=useState(0);
  const[printing,setPrinting]=useState(false);
  const[printSeen,setPrintSeen]=useState(false);
  useEffect(()=>{
    const node=root.current;if(!node)return;
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    node.dataset.motion='ready';
    const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.setAttribute('data-visible','true');observer.unobserve(entry.target);}});},{threshold:.12});
    node.querySelectorAll('[data-about-reveal]').forEach(el=>observer.observe(el));
    const receiptObserver=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){setPrintSeen(true);setPrintCycle(1);receiptObserver.disconnect();}},{threshold:.2});
    const scene=node.querySelector('[data-about-printer]');if(scene)receiptObserver.observe(scene);
    return()=>{observer.disconnect();receiptObserver.disconnect();};
  },[]);
  useEffect(()=>{if(!printSeen||matchMedia('(prefers-reduced-motion: reduce)').matches)return;setPrinting(true);const timer=setTimeout(()=>setPrinting(false),1900);return()=>clearTimeout(timer);},[printSeen,printCycle]);
  const replay=()=>{setPrintSeen(true);setPrintCycle(c=>c+1);};
  return <main id="contenido" ref={root} className={s.page}>
    <section className={'container '+s.hero}>
      <nav className={s.crumbs} aria-label="Migas de pan"><ol><li><Link href="/">Inicio</Link></li><li><ChevronRight size={12}/><span aria-current="page">Nosotros</span></li></ol></nav>
      <div className={s.heroPage}><div className={s.heroGrid}>
        <div className={s.heroCopy}>
          <p className={s.meta}>Quiénes somos <span aria-hidden="true"/></p>
          <h1>La tecnología<br/>que <span>transforma</span><br/>tu ruta al campus</h1>
          <p className={s.lead}>UniRide nace para transformar la forma en que los universitarios organizan sus traslados. Somos un proyecto académico de movilidad colaborativa: conectamos tu ruta y exploramos una mejor forma de compartir el viaje.</p>
        </div>
        <div className={s.scene} data-about-printer>
          <span className={s.projectMark}><img src="/images/uniride-original.png" alt="UniRide" width={56} height={56}/></span>
          <div key={printCycle} className={s.printerStack+' '+(printSeen?s.printing:'')}>
            <div className={s.printer} aria-hidden="true"><span className={s.printerTop}/><span className={s.window}><span className={s.roll}/></span><span className={s.printerLabel}>58 mm · UNI</span><span className={s.printerStatus}>{printing?'Imprimiendo':'Impreso ✓'}</span><span className={s.led}/><span className={s.teeth}/><span className={s.mouth}/></div>
            <button type="button" className={s.printerHit} onClick={replay} disabled={printing} aria-label="Volver a imprimir la ficha de UniRide"/>
            <div className={s.receipt}>
              <p className={s.receiptTitle}><strong>UNIRIDE</strong></p><p className={s.receiptSub}>Ficha del proyecto</p><hr/>
              <div className={s.receiptRow}><span>Proyecto</span><b>Académico</b></div>
              <div className={s.receiptRow+' '+s.receiptTotal}><span>Servicio comercial</span><b>NO</b></div><hr/>
              <div className={s.receiptRow}><span>Comunidad</span><b>Universitaria</b></div>
              <div className={s.receiptRow}><span>Ciudad</span><b>Lima, Perú</b></div>
              <div className={s.receiptRow}><span>Equipo</span><b>6 integrantes</b></div>
              <div className={s.receiptRow}><span>Entorno</span><b>Web + demo</b></div>
              <p className={s.receiptStamp}><span>Prototipo académico</span></p>
              <p className={s.receiptFoot}>Conectamos tu ruta,<br/>compartimos el viaje.</p>
            </div>
            <p className={s.printerHint}>toca la impresora para reimprimir</p>
          </div>
          <span className={s.srOnly} aria-live="polite">{printing?'Imprimiendo ficha del proyecto':'Ficha del proyecto impresa'}</span>
        </div>
      </div></div>
    </section>
    <section className={s.altSection} aria-label="Misión y visión"><div className="container"><div className={s.missionGrid}>
      <article className={s.tabCard+' '+s.missionCard} data-about-reveal><span className={s.tabIcon}><Target size={21}/></span><h2>Nuestra misión</h2><p>Transformar la forma en que los universitarios se transportan mediante una aplicación colaborativa que conecte estudiantes con conductores de su comunidad, con rutas organizadas y aportes claros. La propuesta busca una movilidad más accesible, confiable y responsable.</p><small>La verificación de conductores forma parte de la propuesta, no de una función actualmente habilitada.</small></article>
      <article className={s.tabCard+' '+s.visionCard} data-about-reveal><span className={s.tabIcon}><Eye size={21}/></span><h2>Nuestra visión</h2><p>Ser una plataforma de referencia en movilidad universitaria colaborativa en Latinoamérica, formando comunidades conectadas y promoviendo traslados más seguros y sostenibles. Queremos que compartir una ruta sea una decisión informada y una experiencia mejor organizada.</p><small>Una visión de futuro: todavía no representa liderazgo, cobertura ni resultados alcanzados.</small></article>
    </div></div></section>
    <section className={s.valuesSection} aria-labelledby="valores"><div className="container"><div className={s.sectionHead}><p className={s.meta}>Lo que nos mueve</p><h2 id="valores">Nuestros <span>valores</span></h2></div>
      <ul className={s.valueTickets} aria-label="Los cinco valores de UniRide">{values.map((v,i)=><li key={v.title} data-about-reveal><article className={s.valueTicket}><p className={s.ticketHead} aria-hidden="true"><span>Valor 0{i+1}</span><span>UniRide</span></p><hr/><v.icon className={s.valueIcon} size={21}/><h3>{v.title}</h3><p>{v.text}</p></article></li>)}</ul>
    </div></section>
    <TeamSection/>
    <section className={s.scopeSection} aria-labelledby="alcance"><div className="container"><div className={s.sectionHead}><p className={s.meta}>De la idea a la prueba</p><h2 id="alcance">Un proyecto que avanza<br/><span>con los pies en la ruta</span></h2></div><ol className={s.timeline}>{stages.map((stage,i)=><li key={stage.label} data-about-reveal><span className={s.timelineDot}>{i===2?<Check size={14}/>:String(i+1).padStart(2,'0')}</span><div><small>{stage.label}</small><h3>{stage.title}</h3><p>{stage.text}</p></div></li>)}</ol><div className={s.scopeActions}><Link href="/demo" className="r-button"><Route size={16}/>Explorar el prototipo</Link><Link href="/como-funciona" className="r-button secondary">Conocer el flujo <ArrowUpRight size={16}/></Link></div></div></section>
    <div className={'container '+s.finalNote}><hr/><p>UniRide es un prototipo académico. No es un operador comercial, no verifica licencias o antecedentes ni procesa pagos. La inteligencia predictiva y la reasignación automática son propuestas futuras. Las metas de los laboratorios no son métricas de uso reales.</p></div>
  </main>;
}
