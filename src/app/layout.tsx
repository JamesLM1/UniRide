import type {Metadata,Viewport} from 'next';
import './globals.css';
import './replica.css';
import './devices.css';
import './replica-scenes.css';
import './subpage-scenes.css';
import './navigation.css';
import './interface-fixes.css';
import {Navigation,Footer} from '@/components/navigation';
import {Chat} from '@/components/chat';
import {Consent} from '@/components/consent';
import {ReferenceInteractions} from '@/components/reference-interactions';
import {ReferenceIntro} from '@/components/reference-intro';
import {siteURL} from '@/lib/config';
export const metadata:Metadata={metadataBase:new URL(siteURL),title:{default:'UniRide · Conectamos tu ruta, compartimos el viaje',template:'%s | UniRide'},description:'Organiza tu movilidad universitaria en Lima. Explora el prototipo de viajes compartidos de UniRide, calcula tus gastos y prepara un plan B para llegar a clases.',applicationName:'UniRide',alternates:{canonical:'/'},openGraph:{type:'website',locale:'es_PE',siteName:'UniRide',title:'UniRide · Tu campus está más cerca cuando compartes la ruta.',description:'Movilidad universitaria, rutas compartidas y un plan B para tu día a día en Lima.',images:[{url:'/opengraph-image',width:1200,height:630}]},twitter:{card:'summary_large_image'},robots:{index:true,follow:true},verification:process.env.GOOGLE_SITE_VERIFICATION?{google:process.env.GOOGLE_SITE_VERIFICATION}:undefined};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#0d3b33'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es-PE" data-scroll-behavior="smooth" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:"try{if(!sessionStorage.getItem('uniride-intro')&&!matchMedia('(prefers-reduced-motion:reduce)').matches){sessionStorage.setItem('uniride-intro','1');document.documentElement.classList.add('uniride-intro')}var t=localStorage.getItem('uniride-theme');document.documentElement.dataset.theme=t==='dark'||t==='light'?t:matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}catch(e){}"}}/></head><body><ReferenceIntro/><a href="#contenido" className="skip-link">Saltar al contenido</a><Navigation/>{children}<ReferenceInteractions/><Footer/><Chat/><Consent/></body></html>}
