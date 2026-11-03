'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

/** Measured pointer response from the reference: 12deg tilt, 4px lift. */
export function ReferenceInteractions(){
 const pathname=usePathname();
 useEffect(()=>{
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  let cancelled=false;let dispose=()=>{};
  void Promise.all([import('gsap'),import('gsap/ScrollTrigger')]).then(([{gsap},{ScrollTrigger}])=>{
   if(cancelled)return;
   gsap.registerPlugin(ScrollTrigger);
   const unbind:(()=>void)[]=[];
   const ctx=gsap.context(()=>{
    if(matchMedia('(hover:hover) and (pointer:fine)').matches)document.querySelectorAll<HTMLElement>('[data-tilt]').forEach(card=>{
     let box=card.getBoundingClientRect();
     gsap.set(card,{transformPerspective:900});
     const rx=gsap.quickTo(card,'rotationX',{duration:.5,ease:'power3'});
     const ry=gsap.quickTo(card,'rotationY',{duration:.5,ease:'power3'});
     const lift=gsap.quickTo(card,'y',{duration:.4,ease:'power3'});
     const enter=()=>{box=card.getBoundingClientRect();lift(-4);card.classList.add('is-lit');};
     const move=(e:PointerEvent)=>{const x=(e.clientX-box.left)/box.width-.5;const y=(e.clientY-box.top)/box.height-.5;rx(-y*12);ry(x*12);card.style.setProperty('--mx',`${(x+.5)*100}%`);card.style.setProperty('--my',`${(y+.5)*100}%`);};
     const leave=()=>{rx(0);ry(0);lift(0);card.classList.remove('is-lit');};
     card.addEventListener('pointerenter',enter);card.addEventListener('pointermove',move);card.addEventListener('pointerleave',leave);
     unbind.push(()=>{card.removeEventListener('pointerenter',enter);card.removeEventListener('pointermove',move);card.removeEventListener('pointerleave',leave);card.classList.remove('is-lit');});
    });
    const numbers=document.querySelector<HTMLElement>('[data-numbers]');
    if(numbers&&numbers.getBoundingClientRect().top>innerHeight){
     const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:numbers,start:'top bottom',end:'bottom top',scrub:.8}});
     numbers.querySelectorAll<HTMLElement>('[data-number]').forEach((item,i)=>{const offset=24+Math.abs(i-1)*16;tl.fromTo(item,{y:offset},{y:-offset,duration:1},0);});
    }
    if(!document.querySelector('.cinema-hero'))document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el=>{gsap.from(el,{opacity:0,y:16,duration:.7,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}});});
    const tracks=Array.from(document.querySelectorAll<HTMLElement>('[data-marquee-track]'));
    const marquee=document.querySelector<HTMLElement>('[data-marquee]');
    if(tracks.length&&marquee){
     const resize=()=>tracks.forEach((track,i)=>{const gap=parseFloat(getComputedStyle(track).gap)||24;const distance=(track.scrollWidth+gap)/2;track.style.animationDuration=(distance/(i%2?28:40))+'s';});
     resize();window.addEventListener('resize',resize,{passive:true});
     let previousY=scrollY,previousTime=performance.now(),timer:ReturnType<typeof setTimeout>|undefined;
     const speed={value:1};
     const apply=()=>tracks.forEach(track=>track.getAnimations().forEach(animation=>animation.updatePlaybackRate(speed.value)));
     const scroll=()=>{const now=performance.now();const velocity=Math.abs(scrollY-previousY)/Math.max(16,now-previousTime)*1000;previousY=scrollY;previousTime=now;const box=marquee.getBoundingClientRect();if(box.bottom<0||box.top>innerHeight)return;gsap.to(speed,{value:gsap.utils.clamp(1,3.2,1+velocity/900),duration:.25,overwrite:true,onUpdate:apply});clearTimeout(timer);timer=setTimeout(()=>gsap.to(speed,{value:1,duration:1.2,overwrite:true,onUpdate:apply}),300);};
     window.addEventListener('scroll',scroll,{passive:true});
     unbind.push(()=>{window.removeEventListener('scroll',scroll);window.removeEventListener('resize',resize);clearTimeout(timer);gsap.killTweensOf(speed);tracks.forEach(track=>{track.style.removeProperty('animation-duration');track.getAnimations().forEach(a=>a.updatePlaybackRate(1));});});
    }
   });
   dispose=()=>{unbind.forEach(fn=>fn());ctx.revert();};
  });
  return()=>{cancelled=true;dispose();};
 },[pathname]);
 return null;
}
