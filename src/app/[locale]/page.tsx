import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {LandingExperience} from '@/components/sites/cobrapp/landing-experience';
import {siteURL} from '@/lib/config';
export const dynamicParams=false;
export function generateStaticParams(){return[{locale:'en'},{locale:'pt'}];}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const{locale}=await params;return{title:locale==='pt'?'Rotas compartilhadas para universitários em Lima':'Shared routes for university students in Lima',description:locale==='pt'?'Conheça o protótipo acadêmico UniRide, compare seus gastos e prepare um plano B.':'Explore the UniRide academic prototype, compare your commuting costs and prepare a backup plan.',alternates:{canonical:'/'+locale,languages:{'es-PE':'/','en':'/en','pt-BR':'/pt'}}};}
export default async function Page({params}:{params:Promise<{locale:string}>}){const{locale}=await params;if(locale!=='en'&&locale!=='pt')notFound();return <LandingExperience siteURL={siteURL} locale={locale}/>}
