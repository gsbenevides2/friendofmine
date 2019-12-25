var CACHE_NAME = 'gsb-132';
var CACHE_FILES = [
 "/",
 "/Ana",
 "/Pati",
 "/Angel",
 "/Ju",
 "/Naty",
 "/scripts.js",
 "/styles.css"
];
console.log(CACHE_NAME)

self.addEventListener('install', function (event) {
 event.waitUntil(
	caches.open(CACHE_NAME).then(function (cache) {
	 return cache.addAll(CACHE_FILES);
	})
 );
});

self.addEventListener('activate', function activator(event) {
 event.waitUntil(
	caches.keys().then(function (keys) {
	 return Promise.all(keys
		.filter(function (key) {
		 return key.indexOf(CACHE_NAME) !== 0;
		})
		.map(function (key) {
		 return caches.delete(key);
		})
	 );
	})
 );
});

self.addEventListener('fetch', function (evt) {
 /*if (evt.request.mode !== 'navigate') {
		return;
	}*/
 evt.respondWith(
	fetch(evt.request)
	.catch(() => {
	 return caches.open(CACHE_NAME)
		.then((cache) => {
		 return cache.match('/');
		});
	})
 );
});

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
workbox.precaching.precacheAndRoute(CACHE_FILES);
if (workbox) {
 console.log(`Yay! Workbox is loaded 🎉`);
} else {
 console.log(`Boo! Workbox didn't load 😬`);
}

// Cache the Google Fonts stylesheets with a stale while revalidate strategy.
workbox.routing.registerRoute(
 /^https:\/\/fonts\.googleapis\.com/,
 new workbox.strategies.StaleWhileRevalidate({
	cacheName: 'google-fonts-stylesheets',
 }),
);

// Cache the Google Fonts webfont files with a cache first strategy for 1 year.
workbox.routing.registerRoute(
 /^https:\/\/fonts\.gstatic\.com/,
 new workbox.strategies.CacheFirst({
	cacheName: 'google-fonts-webfonts',
	plugins: [
	 new workbox.cacheableResponse.Plugin({
		statuses: [0, 200],
	 }),
	 new workbox.expiration.Plugin({
		maxAgeSeconds: 60 * 60 * 24 * 365,
	 }),
	],
 }),
); 


workbox.routing.registerRoute(
 /\.(?:js|css)$/,
 new workbox.strategies.StaleWhileRevalidate(),

); 
workbox.routing.registerRoute(
 /\.(?:png|gif|jpg|jpeg|svg)$/,
 new workbox.strategies.CacheFirst({
	cacheName: 'images',
	plugins: [
	 new workbox.expiration.Plugin({
		maxEntries: 60,
		maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
	 }),
	],
 }),
); 
