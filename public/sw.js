var CACHE_NAME="gsb-122",CACHE_FILES=["/","/Pati","/Angel","/Ju","/Naty","/scripts.js","/styles.css"];console.log(CACHE_NAME),self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE_NAME).then(function(e){return e.addAll(CACHE_FILES)}))}),self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(e){return Promise.all(e.filter(function(e){return 0!==e.indexOf(CACHE_NAME)}).map(function(e){return caches.delete(e)}))}))}),self.addEventListener("fetch",function(e){e.respondWith(fetch(e.request).catch(()=>caches.open(CACHE_NAME).then(e=>e.match("/"))))}),importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"),workbox.precaching.precacheAndRoute(CACHE_FILES),workbox?console.log("Yay! Workbox is loaded 🎉"):console.log("Boo! Workbox didn't load 😬"),workbox.routing.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new workbox.strategies.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets"})),workbox.routing.registerRoute(/^https:\/\/fonts\.gstatic\.com/,new workbox.strategies.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new workbox.cacheableResponse.Plugin({statuses:[0,200]}),new workbox.expiration.Plugin({maxAgeSeconds:31536e3})]})),workbox.routing.registerRoute(/\.(?:js|css)$/,new workbox.strategies.StaleWhileRevalidate),workbox.routing.registerRoute(/\.(?:png|gif|jpg|jpeg|svg)$/,new workbox.strategies.CacheFirst({cacheName:"images",plugins:[new workbox.expiration.Plugin({maxEntries:60,maxAgeSeconds:2592e3})]}));