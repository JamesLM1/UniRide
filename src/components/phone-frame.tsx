'use client';

import {useEffect,useRef,useState,type ReactNode} from 'react';

/** Body: 71.9 × 150 mm. Display: 1206 × 2622. Apple iPhone 18 Pro specs. */
export function PhoneFrame({children,className='',baseWidth=220}:{children:ReactNode;className?:string;baseWidth?:number}){
  const viewport=useRef<HTMLDivElement>(null);
  const[scale,setScale]=useState(1);
  useEffect(()=>{
    const node=viewport.current;if(!node)return;
    const observer=new ResizeObserver(([entry])=>setScale(entry.contentRect.width/baseWidth));
    observer.observe(node);return()=>observer.disconnect();
  },[baseWidth]);
  return <div className={className+' iphone-device'} data-device-model="iPhone 18 Pro">
    <i className="device-side device-action" aria-hidden="true"/><i className="device-side device-volume" aria-hidden="true"/><i className="device-side device-power" aria-hidden="true"/>
    <div ref={viewport} className="device-viewport"><div className="device-canvas" style={{width:baseWidth,height:baseWidth*2622/1206,transform:`scale(${scale})`}}>{children}</div></div>
    <span className="device-island" aria-hidden="true"><i/></span><span className="device-home" aria-hidden="true"/>
  </div>;
}
