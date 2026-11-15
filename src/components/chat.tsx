'use client';

import Link from 'next/link';
import {useState,useRef,useEffect} from 'react';
import {X,ArrowUp,ArrowUpRight,RotateCcw,Maximize2,Minimize2,Sparkles,ShieldCheck} from 'lucide-react';
import {guideAnswer} from '@/lib/guide.mjs';
import s from './chat.module.css';

type Message={id:number;role:'user'|'assistant';text:string;mode?:string;notice?:string;sources?:{title:string;href:string}[]};
const initialMessage:Message={id:0,role:'assistant',text:'¡Hola! Soy Ruti, tu guía de UniRide. Puedo ayudarte a entender cómo se comparte una ruta o a preparar un plan B si tu viaje cambia. ¿Qué te gustaría saber?',mode:'guide'};
const initialSuggestions=['¿Cómo funciona UniRide?','¿Cómo solicito una plaza?','¿Qué hago si cancelan mi viaje?'];

function RutiAvatar() {
  return (
    <svg className={s.mascot} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="23" fill="#c9ece0"/>
      <path d="M9 41c2-6 7-9 15-9s13 3 15 9a23 23 0 0 1-30 0Z" fill="#237967"/>
      <path d="m17 34 7 7 7-7" fill="none" stroke="#fff7d5" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="11" y="14" width="26" height="22" rx="10" fill="#ffedcf" stroke="#19473c" strokeWidth="1.7"/>
      <path d="M11 20v-4a10 10 0 0 1 10-10h6a10 10 0 0 1 10 10v4H11Z" fill="#247963" stroke="#19473c" strokeWidth="1.7"/>
      <path d="M10 20h28" stroke="#19473c" strokeWidth="2.6" strokeLinecap="round"/>
      <path d="M24 9a3.1 3.1 0 0 1 3.1 3.1c0 1.9-3.1 4.4-3.1 4.4s-3.1-2.5-3.1-4.4A3.1 3.1 0 0 1 24 9Z" fill="#ffe291"/>
      <circle cx="24" cy="12" r="1" fill="#247963"/>
      <circle cx="19" cy="25" r="1.65" fill="#19473c"/>
      <circle cx="29" cy="25" r="1.65" fill="#19473c"/>
      <path d="M21 30c1.5 1.8 4.5 1.8 6 0" fill="none" stroke="#19473c" strokeWidth="1.55" strokeLinecap="round"/>
      <path d="M15.5 28h1.5m14 0h1.5" stroke="#e99680" strokeWidth="1.45" strokeLinecap="round"/>
    </svg>
  );
}

export function Chat(){
  const [open,setOpen]=useState(false);
  const [expanded,setExpanded]=useState(false);
  const [mode,setMode]=useState('guide');
  const [ai,setAI]=useState(false);
  const [message,setMessage]=useState('');
  const [busy,setBusy]=useState(false);
  const [messages,setMessages]=useState<Message[]>([initialMessage]);
  const [suggestions,setSuggestions]=useState(initialSuggestions);
  const input=useRef<HTMLInputElement>(null);
  const scrollArea=useRef<HTMLDivElement>(null);
  const launcher=useRef<HTMLButtonElement>(null);
  const activeRequest=useRef<AbortController|null>(null);
  const sending=useRef(false);
  const sequence=useRef(0);
  const returnFocus=useRef<HTMLElement|null>(null);

  useEffect(()=>{
    const show=()=>{returnFocus.current=document.activeElement as HTMLElement;setOpen(true);};
    window.addEventListener('uniride:open-chat',show);
    return()=>{window.removeEventListener('uniride:open-chat',show);activeRequest.current?.abort();};
  },[]);
  useEffect(()=>{
    if(!open)return;
    input.current?.focus({preventScroll:true});
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),5000);
    void fetch('/api/chat',{signal:controller.signal}).then(response=>response.ok?response.json():null).then(data=>{if(data)setMode(data.mode==='ai'?'ai':'guide');}).catch(()=>{}).finally(()=>clearTimeout(timer));
    const closeKey=(event:KeyboardEvent)=>{if(event.key==='Escape'){setOpen(false);(returnFocus.current||launcher.current)?.focus({preventScroll:true});}};
    document.addEventListener('keydown',closeKey);
    return()=>{controller.abort();clearTimeout(timer);document.removeEventListener('keydown',closeKey);};
  },[open]);
  useEffect(()=>{if(open&&scrollArea.current)scrollArea.current.scrollTop=scrollArea.current.scrollHeight;},[messages,busy,open]);

  function close(){setOpen(false);(returnFocus.current||launcher.current)?.focus({preventScroll:true});}
  function reset(){if(sending.current)return;setMessages([initialMessage]);setSuggestions(initialSuggestions);setMessage('');input.current?.focus();}

  async function send(text=message){
    const question=text.trim();if(!question||sending.current)return;
    sending.current=true;setMessage('');setBusy(true);
    setMessages(previous=>[...previous,{id:++sequence.current,role:'user',text:question}]);
    const local=guideAnswer(question);
    setSuggestions([]);
    const controller=new AbortController();activeRequest.current=controller;
    const timer=setTimeout(()=>controller.abort(),ai?26000:5000);
    let reply:Omit<Message,'id'|'role'>;
    let nextSuggestions=local.suggestions;
    try{
      const response=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},signal:controller.signal,body:JSON.stringify({message:question,ai})});
      const data=await response.json();
      if(!response.ok||typeof data.answer!=='string'||!data.answer.trim())throw new Error('No answer');
      reply={text:data.answer,mode:data.mode==='ai'?'ai':'guide',sources:Array.isArray(data.sources)?data.sources.filter((source:{href?:string;title?:string})=>typeof source.href==='string'&&source.href.startsWith('/')&&!source.href.startsWith('//')&&typeof source.title==='string'):local.sources,notice:data.notice};
      if(Array.isArray(data.suggestions))nextSuggestions=data.suggestions.filter((value:unknown)=>typeof value==='string').slice(0,3);
    }catch{
      reply={text:local.answer,mode:'guide',sources:local.sources,notice:'Respondí con la guía local porque no se pudo consultar el servidor.'};
    }finally{clearTimeout(timer);activeRequest.current=null;}
    setMessages(previous=>[...previous,{id:++sequence.current,role:'assistant',...reply}]);
    setSuggestions(nextSuggestions);setBusy(false);sending.current=false;
  }

  return <div className={'chat-container '+s.container}>
    {open&&<section id="uniride-chat" className={s.panel+' '+(expanded?s.expanded:'')} role="dialog" aria-modal="false" aria-labelledby="chat-title">
      <header className={s.header}><div className={s.mark}><RutiAvatar/></div><div className={s.title}><strong id="chat-title">Ruti · Tu guía en ruta</strong><span><i/>{ai&&mode==='ai'?'IA del proyecto':'Guía interactiva de UniRide'}</span></div><div className={s.controls}><button type="button" onClick={reset} disabled={busy} aria-label="Nueva conversación" title="Nueva conversación"><RotateCcw size={15}/></button><button type="button" onClick={()=>setExpanded(!expanded)} aria-expanded={expanded} aria-label={expanded?'Reducir chat':'Ampliar chat'} title={expanded?'Reducir':'Ampliar'}>{expanded?<Minimize2 size={15}/>:<Maximize2 size={15}/>}</button><button type="button" onClick={close} aria-label="Cerrar asistente"><X size={18}/></button></div></header>
      <div className={s.scope}><ShieldCheck size={13}/><span>Te orientamos sin pedir contraseñas ni datos personales.</span></div>
      {mode==='ai'&&<label className={s.aiToggle}><input type="checkbox" checked={ai} onChange={event=>setAI(event.target.checked)} disabled={busy}/><span><Sparkles size={12}/>Usar IA con mi sesión <small>El mensaje se envía a OpenAI.</small></span></label>}
      <div ref={scrollArea} className={s.messages} role="log" aria-live="polite" aria-relevant="additions" aria-label="Conversación con UniRide">{messages.map(item=><div key={item.id} className={s.message+' '+(item.role==='user'?s.user:s.assistant)}><span className={s.speaker}>{item.role==='user'?'Tú':'Ruti'}</span><p>{item.text}</p>{item.sources&&<div className={s.sources}>{item.sources.map(source=><Link key={source.href} href={source.href} onClick={close}>{source.title}<ArrowUpRight size={13}/></Link>)}</div>}{item.notice&&<small className={s.notice}>{item.notice}</small>}{item.mode==='ai'&&<small className={s.notice}><Sparkles size={10}/>Respuesta generada por IA</small>}</div>)}{busy&&<div className={s.typing} role="status" aria-label="Preparando respuesta"><i/><i/><i/><span>Preparando tu respuesta</span></div>}</div>
      {suggestions.length>0&&<div className={s.suggestions} aria-label="Preguntas sugeridas">{suggestions.map(question=><button key={question} type="button" onClick={()=>send(question)} disabled={busy}>{question}<ArrowUpRight size={12}/></button>)}</div>}
      <form className={s.composer} onSubmit={event=>{event.preventDefault();void send();}}><input ref={input} aria-label="Tu pregunta al asistente" value={message} onChange={event=>setMessage(event.target.value)} maxLength={1000} placeholder="Pregunta sobre UniRide…" autoComplete="off"/><button type="submit" disabled={busy||!message.trim()} aria-label="Enviar pregunta"><ArrowUp size={18}/></button></form>
      <footer className={s.footer}>Guía del proyecto · No consulta tus reservas</footer>
    </section>}
    <button ref={launcher} type="button" className={s.launcher} aria-label={open?'Cerrar chat con Ruti':'Abrir chat con Ruti'} aria-controls="uniride-chat" aria-expanded={open} onClick={()=>{if(open)close();else{returnFocus.current=launcher.current;setOpen(true);}}}>{open?<X size={21}/>:<><span className={s.launcherIcon}><RutiAvatar/></span><span>¿Vamos en ruta?<small>Pregúntale a Ruti</small></span><i/></>}</button>
  </div>;
}
