import type {MetadataRoute} from 'next';
import {siteURL} from '@/lib/config';
export default function robots():MetadataRoute.Robots{return{rules:{userAgent:'*',allow:'/',disallow:['/app/','/api/','/ingresar','/demo','/entrega','/actualizar-clave','/auth/']},sitemap:siteURL+'/sitemap.xml'};}
