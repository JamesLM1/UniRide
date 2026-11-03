import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowUpRight} from 'lucide-react';
import {articles} from '@/lib/articles';
import {blogTopics} from '@/lib/blog-topics';
import {siteURL} from '@/lib/config';
import {ReferenceClosing} from '@/components/sites/cobrapp/reference-closing';
import styles from '@/components/sites/cobrapp/blog.module.css';
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return blogTopics.map(t=>({slug:t.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const{slug}=await params;const topic=blogTopics.find(t=>t.slug===slug);return {title:topic?topic.name+' · Blog UniRide':'Categoría no encontrada',description:topic?.description,alternates:{canonical:'/blog/categoria/'+slug}};}
export default async function Category({params}:Props){const{slug}=await params;const topic=blogTopics.find(t=>t.slug===slug);if(!topic)notFound();const list=articles.filter(a=>(topic.categories as readonly string[]).includes(a.category));return <main id="contenido" className="replica-page">
 <div className="container reference-subpage-top"><nav className="reference-subpage-crumb" aria-label="Migas de pan"><Link href="/">Inicio</Link><span>›</span><Link href="/blog">Blog</Link><span>›</span><span>{topic.name}</span></nav><div className="reference-subpage-hero category-reference-hero"><div className="reference-subpage-copy"><p className="eyebrow">CATEGORÍA</p><h1>{topic.name}</h1><p className="reference-subpage-lead">{topic.intro}</p><p className="category-reference-count">{list.length} ARTÍCULOS</p></div><div className="category-reference-sheet" data-tilt><header><span>FICHA</span><span>{list.length} ARTÍCULOS</span></header><div className="category-reference-lines">{list.slice(0,3).map(a=><div key={a.slug}><s>{a.title}</s><i/><b>{a.readTime}</b></div>)}</div></div></div></div>
 <section className={styles.articles}><div className="container"><h2 className="category-reference-hidden">Artículos de {topic.name}</h2><div className={styles.articleList}>{list.map((a,i)=><article className={styles.articleItem} key={a.slug}><span className={styles.number}>{String(i+1).padStart(2,'0')}</span><div><Link href={'/blog/'+a.slug}><h3>{a.title}</h3></Link><p>{a.description}</p><div className={styles.itemMeta}>{a.publishedAt?new Date(a.publishedAt).toLocaleDateString('es-PE',{day:'numeric',month:'long',year:'numeric',timeZone:'America/Lima'}):''} · {a.readTime}</div><div className={styles.author}>{a.author}</div><a className={styles.source} href={a.source} target="_blank" rel="noopener noreferrer">Leer original en Blogger <ArrowUpRight size={13}/></a></div></article>)}</div></div></section><ReferenceClosing siteURL={siteURL}/>
 </main>;}
