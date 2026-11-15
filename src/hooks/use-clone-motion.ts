'use client';
import {useEffect,type RefObject} from 'react';

export function useCloneMotion(ref:RefObject<HTMLElement|null>,setProof:(n:number)=>void,setTour:(n:number)=>void){
 useEffect(()=>{
  let cancelled=false;let dispose=()=>{};
  void Promise.all([import('gsap'),import('gsap/ScrollTrigger')]).then(([g,s])=>{
   if(cancelled||!ref.current)return;
   const gsap=g.gsap;const ScrollTrigger=s.ScrollTrigger;
   gsap.registerPlugin(ScrollTrigger);ScrollTrigger.config({ignoreMobileResize:true});
   const ctx=gsap.context(()=>{
    const mm=gsap.matchMedia();
    mm.add('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)',()=>{
     const main=ref.current;
     if(!main)return;
     const styles=document.body.style;
     const moveGrid=(event:PointerEvent)=>{
      if(event.pointerType!=='mouse')return;
      styles.setProperty('--landing-grid-x',`${(event.clientX/innerWidth-.5)*24}px`);
      styles.setProperty('--landing-grid-y',`${(event.clientY/innerHeight-.5)*24}px`);
     };
     const resetGrid=()=>{
      styles.removeProperty('--landing-grid-x');
      styles.removeProperty('--landing-grid-y');
     };
     main.addEventListener('pointermove',moveGrid,{passive:true});
     main.addEventListener('pointerleave',resetGrid);
     return ()=>{
      main.removeEventListener('pointermove',moveGrid);
      main.removeEventListener('pointerleave',resetGrid);
      resetGrid();
     };
    });
    mm.add('(prefers-reduced-motion:no-preference)',()=>{
     gsap.from('.cinema-intro > *',{y:20,opacity:0,duration:.7,delay:document.documentElement.classList.contains('uniride-intro')?1.15:0,stagger:.08,ease:'power2.out',clearProps:'transform,opacity'});
     gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el=>{
      gsap.from(el,{y:16,opacity:0,duration:.7,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}});
     });
     gsap.utils.toArray<HTMLElement>('h2:has([data-word])').forEach(heading=>{
      if(heading.getBoundingClientRect().top<innerHeight)return;
      gsap.from(heading.querySelectorAll('[data-word]'),{opacity:0,y:parseFloat(getComputedStyle(heading).fontSize)*.7,rotation:2,duration:.7,ease:'back.out(1.6)',stagger:.035,scrollTrigger:{trigger:heading,start:'top 88%',once:true}});
     });
     gsap.from('.day-progress',{scaleY:0,transformOrigin:'center top',scrollTrigger:{trigger:'.day-timeline',start:'top 80%',end:'bottom 50%',scrub:.4}});
     gsap.to('.day-coin',{y:()=>Math.max(0,(ref.current?.querySelector('.day-timeline')?.clientHeight||0)-48),ease:'none',scrollTrigger:{trigger:'.day-timeline',start:'top 80%',end:'bottom 50%',scrub:.4,invalidateOnRefresh:true}});
     gsap.timeline({scrollTrigger:{trigger:'.message-bridge',start:'top 75%',end:'bottom 35%',scrub:.45}}).to('.bridge-paper',{x:-32,rotation:-7,opacity:.3},0).fromTo('.bridge-digital',{x:36,y:20,rotation:7,opacity:0},{x:0,y:0,rotation:0,opacity:1},.12);
    });
    mm.add('(min-width:801px) and (prefers-reduced-motion:no-preference)',()=>{
     gsap.utils.toArray<HTMLElement>('.proof-step').forEach((el,i)=>ScrollTrigger.create({trigger:el,start:'top 60%',end:'bottom 60%',onEnter:()=>setProof(i),onEnterBack:()=>setProof(i)}));
    });
    mm.add('(prefers-reduced-motion:no-preference)',()=>{
     const screens=gsap.utils.toArray<HTMLElement>('.tour-screen'),copies=gsap.utils.toArray<HTMLElement>('.tour-copy');
     gsap.set(screens.slice(1),{autoAlpha:0});gsap.set(copies.slice(1),{autoAlpha:0});
     const tour=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{id:'uniride-tour',trigger:'.tour-pinned',start:'top 70px',end:'+=300%',pin:true,scrub:.5,anticipatePin:1,invalidateOnRefresh:true,onUpdate:self=>setTour(Math.min(2,Math.floor(self.progress*3)))}});
     for(let i=0;i<3;i++){
      if(i>0){tour.to(screens[i-1],{autoAlpha:0,yPercent:-8,scale:.96,duration:.2},i).to(copies[i-1],{autoAlpha:0,y:-24,duration:.15},i)
       .fromTo(screens[i],{autoAlpha:0,yPercent:10,rotationX:8,scale:1,transformPerspective:900},{autoAlpha:1,yPercent:0,rotationX:0,duration:.2,ease:'back.out(1.2)'},i+.03)
       .fromTo(copies[i],{autoAlpha:0,y:32},{autoAlpha:1,y:0,duration:.15,ease:'power2.out'},i+.08);}
      const pieces=screens[i]?.querySelectorAll('.module-label,.module-route-card,.module-person,.module-booking-paper,.module-budget-inputs,.module-saving,.module-bars,.module-action');
      if(pieces?.length)tour.fromTo(pieces,{opacity:0,y:20},{opacity:1,y:0,duration:.12,stagger:.06,ease:'power2.out'},i+.15);
     }
     tour.to('.module-device',{rotationY:6,duration:3},0);
    });
   },ref);
   dispose=()=>ctx.revert();
   void document.fonts.ready.then(()=>{if(!cancelled)ScrollTrigger.refresh();});
  });
  return()=>{cancelled=true;dispose();};
 },[ref,setProof,setTour]);
}
export async function jumpToTour(index:number){
 const{ScrollTrigger}=await import('gsap/ScrollTrigger');const trigger=ScrollTrigger.getById('uniride-tour');
 if(trigger)window.scrollTo({top:trigger.start+(trigger.end-trigger.start)*((index+.25)/3),behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
 else document.getElementById('tour-uniride')?.scrollIntoView({behavior:'smooth'});
}
