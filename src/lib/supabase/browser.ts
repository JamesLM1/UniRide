import { createBrowserClient } from '@supabase/ssr';
import {supabaseURL,supabasePublishableKey} from './config';
let client: ReturnType<typeof createBrowserClient> | undefined;
export function browserClient() {
  const url=supabaseURL;
  const key=supabasePublishableKey;
  if(!url || !key) throw new Error('Falta configurar Supabase. Revisa el archivo .env.local.');
  return client ??= createBrowserClient(url,key);
}
