import type {Metadata} from 'next';
import {Dashboard,type View} from '@/components/dashboard';
export const metadata:Metadata={title:'Demo interactiva del proyecto',robots:{index:false,follow:false},alternates:{canonical:'/demo'}};
export default async function Page({searchParams}:{searchParams:Promise<{view?:string}>}){const{view}=await searchParams;return <Dashboard demo view={(['rutas','publicar','solicitudes','perfil'].includes(view||'')?view:'rutas') as View}/>}
