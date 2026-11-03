import {supabaseURL,supabasePublishableKey} from '@/lib/supabase/config';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
export async function serverClient() {
  const jar=await cookies();
  return createServerClient(supabaseURL,supabasePublishableKey,{
    cookies:{getAll:()=>jar.getAll(),setAll:items=>{try{items.forEach(({name,value,options})=>jar.set(name,value,options));}catch{ /* proxy refreshes cookies in Server Components */ }}}
  });
}
