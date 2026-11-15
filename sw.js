const C="berggams-v1";
self.addEventListener("install",e=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(clients.claim()));
self.addEventListener("fetch",e=>{
 if(e.request.method!="GET")return;
 const u=new URL(e.request.url);
 const ok=u.origin==location.origin||/(unpkg\.com|gstatic\.com|fonts\.googleapis\.com|tile\.openstreetmap\.org)$/.test(u.host);
 if(!ok)return;
 e.respondWith(caches.open(C).then(async c=>{
  const m=await c.match(e.request);
  const f=fetch(e.request).then(r=>{if(r&&(r.ok||r.type=="opaque"))c.put(e.request,r.clone());return r}).catch(()=>m);
  return m||f}));
});
