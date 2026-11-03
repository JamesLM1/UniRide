import {notFound} from 'next/navigation';
import {Dashboard,type View} from '@/components/dashboard';
export default async function Page({params}:{params:Promise<{view:string}>}){const{view}=await params;if(!['rutas','publicar','solicitudes','perfil'].includes(view))notFound();return <Dashboard view={view as View}/>}
