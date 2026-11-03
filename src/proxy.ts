import {supabaseURL,supabasePublishableKey} from '@/lib/supabase/config';
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
export async function proxy(request:NextRequest) {
  let response=NextResponse.next({request});
  const supabase=createServerClient(supabaseURL,supabasePublishableKey,{cookies:{
    getAll:()=>request.cookies.getAll(),setAll(items){items.forEach(({name,value})=>request.cookies.set(name,value));response=NextResponse.next({request});items.forEach(({name,value,options})=>response.cookies.set(name,value,options));}
  }});
  const {data}=await supabase.auth.getClaims();
  if(!data?.claims && request.nextUrl.pathname.startsWith('/app')) {
    const url=request.nextUrl.clone();url.pathname='/ingresar';url.searchParams.set('next',request.nextUrl.pathname);
    const redirect=NextResponse.redirect(url);response.cookies.getAll().forEach(c=>redirect.cookies.set(c));return redirect;
  }
  return response;
}
export const config={matcher:['/app/:path*','/api/chat']};
