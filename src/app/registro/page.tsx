import type {Metadata} from 'next';
import {AuthForm} from '@/components/auth-form';
export const metadata:Metadata={title:'Crear cuenta universitaria',robots:{index:false,follow:false},alternates:{canonical:'/registro'}};
export default function RegisterPage(){return <AuthForm initialMode="signup"/>;}
