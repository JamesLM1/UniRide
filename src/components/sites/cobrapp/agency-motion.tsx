'use client';
import {useEffect,useRef,useState,type ReactNode,type PointerEvent} from 'react';
import Image from 'next/image';
import {motion,useInView,useReducedMotion,useScroll,useTransform,useMotionValueEvent,animate,useMotionValue} from 'motion/react';
import {ArrowRight,MapPin,CarFront,CheckCircle2} from 'lucide-react';
import Lenis from 'lenis';

type RevealProps={children:ReactNode;className?:string;delay?:number;stagger?:boolean};
export function Reveal({children,className='',delay=0,stagger=false}:RevealProps){
 const reduced=useReducedMotion();
 return <motion.div className={className} initial={reduced?false:{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
  viewport={{once:true,amount:0.14}} transition={{duration:reduced?0:.55,delay:reduced?0:delay,ease:[.21,1,.25,1]}}>
  {children}</motion.div>;
}
export function WordReveal({prefix,accent}: {prefix:string;accent:string}){
 const reduce=useReducedMotion();
 return <h1 id="inicio-titulo" className="agency-headline" aria-label={prefix+' '+accent}>
  {[{words:prefix,accent:false},{words:accent,accent:true}].map((part,j)=><span key={j} className={part.accent?'agency-headline-accent':''}>
   {part.words.split(' ').map((word,i)=><motion.span key={i} aria-hidden="true" className="agency-word" initial={reduce?false:{y:'90%',opacity:0}}
    animate={{y:0,opacity:1}} transition={{delay:reduce?0:(i+j*4)*.075,duration:reduce?0:.6,ease:[.16,1,.3,1]}}>{word}&nbsp;</motion.span>)}
  </span>)}
 </h1>;
}
export function SmoothScroll(){
 useEffect(()=>{
  if(typeof window==='undefined'||window.matchMedia('(prefers-reduced-motion: reduce)').matches||window.matchMedia('(pointer: coarse)').matches)return;
  const lenis=new Lenis({duration:1.05, smoothWheel:true});
  let raf=0;
  const frame=(time:number)=>{lenis.raf(time);raf=requestAnimationFrame(frame)};
  raf=requestAnimationFrame(frame);
  return ()=>{cancelAnimationFrame(raf);lenis.destroy()};
 },[]);
 return null;
}
export function AuroraBackground(){const reduce=useReducedMotion();return <div className={'agency-aurora '+(reduce?'is-static':'')} aria-hidden="true"><i/><i/><i/><span className="agency-grain"/></div>}
export function FloatingHeroArt(){
 const reduced=useReducedMotion();
 const ref=useRef<HTMLDivElement>(null);
 const {scrollYProgress}=useScroll({target:ref,offset:['start start','end start']});
 const translateY=useTransform(scrollYProgress,[0,1],[0,reduced?0:70]);
 return <div ref={ref} className="agency-hero-art">
   <div className="agency-campus-card"><Image src="/images/estudiante-campus.webp" alt="Estudiante universitaria organizando su camino al campus de Lima" fill priority sizes="(max-width: 760px) 92vw, 48vw"/></div>
   <motion.div className="agency-hero-phone" style={{y:translateY}} aria-label="Vista previa del aplicativo UniRide">
     <div className="agency-phone-screen"><Image src="/images/prototipo-inicio.webp" alt="Pantalla de inicio del prototipo de UniRide" fill sizes="(max-width: 760px) 170px, 210px"/></div>
   </motion.div>
   <motion.div className="agency-hero-float-card" initial={reduced?false:{opacity:0,x:24}} animate={{opacity:1,x:0}} transition={{delay:.55,duration:.7}}>
    <MapPin size={18}/><span><b>Rutas compartidas</b><small>Campus y horarios en un lugar</small></span></motion.div>
   <motion.div className="agency-hero-float-card second" initial={reduced?false:{opacity:0,x:-24}} animate={{opacity:1,x:0}} transition={{delay:.85,duration:.7}}>
    <CheckCircle2 size={19}/><span><b>Reserva coordinada</b><small>Información antes de salir</small></span></motion.div>
 </div>;
}
export type StoryStep={number:string;title:string;description:string;image:string;alt:string};
export function ScrollStory({steps}: {steps:StoryStep[]}){
 const ref=useRef<HTMLDivElement>(null);const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start center','end center']});
 const [current,setCurrent]=useState(0);
 useMotionValueEvent(scrollYProgress,'change',v=>{const next=Math.min(2,Math.max(0,Math.floor(v*3)));setCurrent(old=>old===next?old:next)});
 return <div ref={ref} className="agency-story">
   <div className="agency-story-sticky">
    <div className="agency-story-device">
     {steps.map((step,i)=><motion.div key={step.number} className="agency-story-screen" initial={false}
       animate={{opacity:current===i?1:0,scale:current===i?1:.97}} transition={{duration:reduced?0:.35}}
       style={{pointerEvents:current===i?'auto':'none'}} aria-hidden={current!==i}>
       <Image src={step.image} fill alt={step.alt} sizes="(max-width: 760px) 210px, 260px"/>
      </motion.div>)}
    </div>
    <div className="agency-story-label"><CarFront size={17}/> Experiencia móvil UniRide <span>0{current+1} / 03</span></div>
   </div>
   <div className="agency-story-steps">
     {steps.map((step,i)=><div className={'agency-story-copy '+(current===i?'is-active':'')} key={step.number}>
       <small>ETAPA {step.number}</small><h3>{step.title}</h3><p>{step.description}</p>
       <a href="/demo">Explorar en el prototipo <ArrowRight size={16}/></a>
     </div>)}
   </div>
 </div>;
}
export function NumberTicker({value,suffix='',prefix=''}:{value:number;suffix?:string;prefix?:string}){
 const ref=useRef<HTMLSpanElement>(null),inView=useInView(ref,{once:true,margin:'-20px'});
 const reduced=useReducedMotion(),num=useMotionValue(0),[shown,setShown]=useState(reduced?value:0);
 useEffect(()=>{if(!inView)return;if(reduced){setShown(value);return;}const ctrl=animate(num,value,{duration:1.25,ease:'easeOut'});return ()=>ctrl.stop()},[inView,reduced,value,num]);
 useMotionValueEvent(num,'change',v=>setShown(Math.round(v)));
 return <span ref={ref} className="agency-number" aria-label={prefix+value+suffix}>{prefix}{shown}{suffix}</span>;
}
export function ShinyText({children}:{children:ReactNode}){return <span className="agency-shiny-text">{children}</span>};


export function SpotlightCard({children,className=''}:{children:ReactNode;className?:string}){
 const ref=useRef<HTMLDivElement>(null);
 const [hovered,setHovered]=useState(false);
 const reduced=useReducedMotion();
 const onMove=(event:PointerEvent<HTMLDivElement>)=>{
  if(reduced||!ref.current)return;
  const rect=ref.current.getBoundingClientRect();
  ref.current.style.setProperty('--spot-x',((event.clientX-rect.left)/rect.width*100)+'%');
  ref.current.style.setProperty('--spot-y',((event.clientY-rect.top)/rect.height*100)+'%');
 };
 return <div ref={ref} className={'agency-spotlight '+className} onPointerMove={onMove} onPointerEnter={()=>setHovered(true)} onPointerLeave={()=>setHovered(false)} data-hovered={hovered?'true':'false'}>{children}</div>;
}
