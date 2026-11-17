import type {MetadataRoute} from 'next';
import {articles} from '@/lib/articles';
import {blogTopics} from '@/lib/blog-topics';
import {features} from '@/lib/features';
import {siteURL} from '@/lib/config';
export default function sitemap():MetadataRoute.Sitemap {
 const paths=['','/test-movilidad','/webinar','/como-funciona','/calculadora','/guia','/blog','/nosotros','/privacidad','/contacto','/descargas','/explorar','/en','/pt',...blogTopics.map(t=>'/blog/categoria/'+t.slug),...features.map(f=>'/funciones/'+f.slug),...articles.map(a=>'/blog/'+a.slug)];
 return paths.map(p=>({url:siteURL+p,changeFrequency:p.startsWith('/blog/')?'monthly':'weekly',priority:p===''?1:p.startsWith('/blog/')?.65:.8}));
}
