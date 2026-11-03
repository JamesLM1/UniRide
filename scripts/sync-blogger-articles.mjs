import fs from 'node:fs/promises';
import path from 'node:path';

// The snapshot is the public Blogger feed; the selected order was supplied by the team.
const root = process.cwd();
const snapshot = path.resolve(root, '../work/uniride-blogger-feed.json');
const feed = JSON.parse(await fs.readFile(snapshot, 'utf8'));
const paths = ['como-sobrevivir-financieramente-los','blog-post','rutas-eficientes-en-lima-como-elegir-el','que-es-el-carpooling-y-como-funciona','como-viajar-seguro-en-lima-7-consejos','responsable-academico-jairo-proyecto','estres-por-el-traslado-la-universidad-7','cancelaron-tu-viaje-6-alternativas-para','como-llegar-puntual-la-universidad','viajes-compartidos-entre-universitarios','como-ahorrar-en-transporte','como-llegar-seguro-la-universidad-7'];
const slugs = ['gastos-inesperados-universidad','cancelaron-tu-viaje-plan-b-lima','rutas-eficientes-lima','que-es-carpooling','viajar-seguro-lima','disponibilidad-transporte-lima','estres-traslado-universidad','seis-alternativas-viaje-cancelado','llegar-puntual-universidad','viajes-compartidos-universitarios','ahorrar-transporte-universitario','llegar-seguro-universidad'];
const categories = ['Presupuesto','Plan B','Rutas y horarios','Viajes compartidos','Seguridad','Rutas y horarios','Bienestar','Plan B','Rutas y horarios','Viajes compartidos','Presupuesto','Seguridad'];
const entities = {amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' ',iquest:'¿',iexcl:'¡',aacute:'á',eacute:'é',iacute:'í',oacute:'ó',uacute:'ú',ntilde:'ñ',Aacute:'Á',Eacute:'É',Iacute:'Í',Oacute:'Ó',Uacute:'Ú',Ntilde:'Ñ',uuml:'ü',ndash:'–',mdash:'—',hellip:'…',ldquo:'“',rdquo:'”',lsquo:'‘',rsquo:'’',bull:'•'};
const decode = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (all, x) => x[0] === '#' ? String.fromCodePoint(x[1]?.toLowerCase() === 'x' ? parseInt(x.slice(2),16) : parseInt(x.slice(1),10)) : (entities[x] ?? all));
const clean = (s) => decode(s.replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim();
const articles = paths.map((name,index) => {
  const entry = feed.feed.entry.find(e => e.link.some(l => l.rel === 'alternate' && l.href.endsWith('/'+name+'.html')));
  if (!entry) throw new Error('Missing selected source: '+name);
  const source = entry.link.find(l => l.rel === 'alternate').href;
  const raw = entry.content.$t.replace(/<(script|style|iframe|noscript|form)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,'');
  const title = entry.title.$t.trim() || clean(raw.match(/<h[123]\b[^>]*>([\s\S]*?)<\/h[123]>/i)?.[1] || '') || (index === 2 ? 'Rutas eficientes en Lima: ¿cómo elegir el trayecto que realmente te ahorra tiempo hacia la universidad?' : 'Disponibilidad de transporte en Lima: ¿por qué es tan difícil encontrar movilidad cuando más la necesitas?');
  // A small tokenizer extracts only text and image blocks. No source HTML is executed.
  const blocks = []; let pending=''; let heading=null; let listItem=false;
  const flush = () => { const text=clean(pending); pending=''; if(text && text!==title) blocks.push({type:heading?'heading':listItem?'list-item':'paragraph',text}); };
  for(const token of raw.match(/<[^>]+>|[^<]+/g) || []) {
    if(token.startsWith('<')) {
      const tag=token.match(/^<\/?\s*([\w-]+)/)?.[1]?.toLowerCase();
      const closing=/^<\//.test(token);
      if(/^h[1-6]$/.test(tag||'')){flush(); heading=closing?null:tag;}
      else if(tag==='li'){flush();listItem=!closing;}
      else if(['p','div','br','blockquote','tr','ul','ol','table'].includes(tag)){flush();}
      else if(tag==='img') {flush();const url=decode(token.match(/\bsrc\s*=\s*["']([^"']+)/i)?.[1]||'');if(/^https:\/\//i.test(url)) blocks.push({type:'image',src:url,alt:decode(token.match(/\balt\s*=\s*["']([^"']*)/i)?.[1]||title)});}
      else if(['td','th'].includes(tag))pending+=' | ';
    } else pending+=token;
  }
  flush();
  const paragraphs=blocks.filter(b=>b.type==='paragraph'||b.type==='list-item');
  const description=(paragraphs.find(b=>b.text.length>80)?.text||title).slice(0,210).replace(/\s+\S*$/,'')+'…';
  const sections=[];let section={heading:'',body:[]};
  for(const block of blocks){if(block.type==='heading'){if(section.body.length)sections.push(section);section={heading:block.text,body:[]};}else if(block.text)section.body.push(block.text);}
  if(section.body.length)sections.push(section);
  const references=[];
  for(const match of raw.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a\s*>/gi)){const url=decode(match[1]);const label=clean(match[2]);if(label&&/^https?:\/\//i.test(url)&&!references.some(r=>r.url===url))references.push({label,url});}
  return {slug:slugs[index],title,category:categories[index],description,readTime:Math.max(1,Math.ceil(blocks.map(b=>b.text||'').join(' ').split(/\s+/).length/200))+' min',cover:blocks.find(b=>b.type==='image')?.src||'/images/plan-b.png',source,author:entry.author[0].name.$t,publishedAt:entry.published.$t,collection:index<6?'individual':'equipo',sections,blocks,references};
});
try {
  const mapping=JSON.parse(await fs.readFile(path.join(root,'docs/research/blog/image-map.json'),'utf8'));
  for(const article of articles){article.cover=mapping[article.cover]||article.cover;for(const block of article.blocks)if(block.type==='image')block.src=mapping[block.src]||block.src;}
} catch(error) { if(error.code!=='ENOENT')throw error; }
const current=await fs.readFile(path.join(root,'src/lib/articles.ts'),'utf8');
const faq=current.slice(current.indexOf('export const faqs='));
const types=`export type ArticleBlock = {type:'heading'|'paragraph'|'list-item';text:string}|{type:'image';src:string;alt:string};\nexport type Article={slug:string;title:string;category:string;description:string;readTime:string;cover:string;source?:string;author?:string;publishedAt?:string;collection?:'individual'|'equipo';blocks?:ArticleBlock[];references?:{label:string;url:string}[];sections:{heading:string;body:string[]}[]};\n`;
await fs.writeFile(path.join(root,'src/lib/articles.ts'),types+'export const articles:Article[]='+JSON.stringify(articles,null,2)+';\nexport const getArticle=(slug:string)=>articles.find(a=>a.slug===slug);\n'+faq);
await fs.mkdir(path.join(root,'docs/research/blog'),{recursive:true});
await fs.writeFile(path.join(root,'docs/research/blog/source-catalog.json'),JSON.stringify(articles.map(({blocks,sections,...a})=>({...a,blockCount:blocks.length,wordCount:sections.reduce((n,s)=>n+s.body.join(' ').split(/\s+/).length,0)})),null,2));
console.log('Synced '+articles.length+' source articles.');
console.log(articles.map(a=>a.slug+' | '+a.title+' | '+a.blocks.length).join('\n'));
