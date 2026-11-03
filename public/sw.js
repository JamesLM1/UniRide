/* UniRide: optional offline copy of the PUBLIC checklist only.
 * No authentication, private routes, API responses or personal data are cached.
 */
const CACHE_NAME='uniride-public-guide-v1';
const GUIDE_PATH='/guia';
const TEXT_PATH='/guia-plan-b.txt';
const PUBLIC_FILES=[TEXT_PATH,'/icon.svg','/images/uniride-original.png','/sites/cobrapp/fonts/archivo-source.woff2'];

self.addEventListener('install',event=>{event.waitUntil(self.skipWaiting());});
self.addEventListener('activate',event=>{event.waitUntil(self.clients.claim());});

async function publicFetch(url){
  const response=await fetch(url,{credentials:'omit',cache:'reload',headers:{Accept:'text/html,application/javascript,text/css,*/*'}});
  if(!response.ok)throw new Error('No se pudo descargar un recurso público.');
  return response;
}
async function saveGuide(){
  const cache=await caches.open(CACHE_NAME);
  const guideURL=new URL(GUIDE_PATH,self.location.origin).href;
  const guide=await publicFetch(guideURL);
  const html=await guide.clone().text();
  const urls=new Set(PUBLIC_FILES.map(path=>new URL(path,self.location.origin).href));
  const pattern=/(?:src|href)=["']([^"']+)["']/g;
  for(const match of html.matchAll(pattern)){
    try{const url=new URL(match[1].replaceAll('&amp;','&'),self.location.origin);
      if(url.origin===self.location.origin&&url.pathname.startsWith('/_next/static/'))urls.add(url.href);
    }catch{}
  }
  // These are page source assets only, never RSC/API fetch payloads.
  await Promise.all([...urls].slice(0,64).map(async url=>{await cache.put(url,await publicFetch(url));}));
  await cache.put(guideURL,guide);
  const savedAt=new Date().toISOString();
  await cache.put(new URL('/__uniride_public_guide_saved',self.location.origin),new Response(savedAt,{headers:{'Content-Type':'text/plain'}}));
  return savedAt;
}
self.addEventListener('message',event=>{
  const port=event.ports[0];
  if(event.data?.type==='SAVE_PUBLIC_GUIDE')event.waitUntil(saveGuide().then(savedAt=>port?.postMessage({ok:true,savedAt})).catch(()=>port?.postMessage({ok:false,error:'No se completó la descarga. Revisa tu conexión e inténtalo otra vez.'})));
});
self.addEventListener('fetch',event=>{
  const request=event.request;if(request.method!=='GET')return;
  const url=new URL(request.url);if(url.origin!==self.location.origin)return;
  if(request.mode==='navigate'&&url.pathname===GUIDE_PATH){
    event.respondWith(fetch(request).catch(async()=>{
      const cached=await(await caches.open(CACHE_NAME)).match(new URL(GUIDE_PATH,self.location.origin));
      return cached||new Response('La guía aún no se guardó. Conéctate y elige «Guardar mi plan B sin conexión».',{status:503,headers:{'Content-Type':'text/plain;charset=utf-8'}});
    }));return;
  }
  // Cache lookup only. New assets are stored solely by the explicit Save action.
  if(url.pathname.startsWith('/_next/static/')||PUBLIC_FILES.includes(url.pathname)){
    event.respondWith(caches.open(CACHE_NAME).then(async cache=>(await cache.match(request))||fetch(request)));
  }
});
