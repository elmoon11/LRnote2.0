const CACHE="lrnote-cache-v3";
self.addEventListener("install",event=>{event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(["./","./index.html","./manifest.webmanifest","./icon.svg"]);await self.skipWaiting()})())});
self.addEventListener("activate",event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(key=>key.startsWith("lrnote-cache-")&&key!==CACHE).map(key=>caches.delete(key)));await self.clients.claim()})())});
self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return;event.respondWith((async()=>{const cached=await caches.match(event.request);if(cached)return cached;try{return await fetch(event.request)}catch(error){return cached||Response.error()}})())});
