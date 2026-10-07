const CACHE='huanjiu-images-v1';
self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==self.location.origin||req.destination!=='image'||!url.pathname.includes('/media/'))return;
 event.respondWith((async()=>{const cache=await caches.open(CACHE);const hit=await cache.match(req);if(hit)return hit;const response=await fetch(req);if(response.ok){await cache.put(req,response.clone());const keys=await cache.keys();if(keys.length>128)await cache.delete(keys[0]);}return response;})());
});
