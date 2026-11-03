import { NextResponse } from 'next/server';
import { serverClient } from '@/lib/supabase/server';
export async function GET(request:Request) {
 const url=new URL(request.url);const code=url.searchParams.get('code');
 if(code){const sb=await serverClient();const {error}=await sb.auth.exchangeCodeForSession(code);if(!error)return NextResponse.redirect(new URL(url.searchParams.get('next')==='/actualizar-clave'?'/actualizar-clave':'/app/perfil',url.origin));}
 return NextResponse.redirect(new URL('/ingresar?error=confirmacion',url.origin));
}
