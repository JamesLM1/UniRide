import type {Metadata} from 'next';
import {PasswordUpdate} from '@/components/password-update';
export const metadata:Metadata={title:'Actualizar contraseña',robots:{index:false,follow:false},alternates:{canonical:'/actualizar-clave'}};
export default function Page(){return <PasswordUpdate/>}
