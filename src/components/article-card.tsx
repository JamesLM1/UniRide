import Link from 'next/link';
import {ArrowUpRight,Clock3} from 'lucide-react';
import type {Article} from '@/lib/articles';
import {EditorialArt} from './route-art';
export function ArticleCard({article,index=0}:{article:Article,index?:number}){return <Link href={'/blog/'+article.slug} className="article-card">{index===0?<div className="article-image"><img src="/images/plan-b.png" alt="Estudiante reorganizando su ruta tras una cancelación" loading="lazy"/></div>:<EditorialArt variant={index%3}/>}<div className="article-card-content"><div className="article-meta"><span>{article.category}</span><small><Clock3 size={12}/>{article.readTime}</small></div><h3>{article.title}</h3><p>{article.description}</p><span className="text-link">Leer la guía <ArrowUpRight size={17}/></span></div></Link>}
