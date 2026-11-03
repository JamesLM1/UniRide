import type {Metadata} from 'next';
import {AuthForm} from '@/components/auth-form';
export const metadata:Metadata={title:'Ingresar o crear cuenta',robots:{index:false,follow:false},alternates:{canonical:'/ingresar'}};
export default function Page(){return <AuthForm/>}
