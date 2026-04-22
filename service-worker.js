const CACHE_NAME = 'ams-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/AMS%20LOGO%20chr.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});