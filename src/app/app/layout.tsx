import type {Metadata} from 'next';
import {redirect} from 'next/navigation';
import {serverClient} from '@/lib/supabase/server';
export const metadata:Metadata={title:'Mi UniRide',robots:{index:false,follow:false}};
export default async function Layout({children}:{children:React.ReactNode}){const sb=await serverClient();const{data:{user},error}=await sb.auth.getUser();if(error||!user)redirect('/ingresar');return children;}
