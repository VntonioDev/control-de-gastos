const CACHE_NAME = 'gastos-v2';

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Obliga al nuevo Service Worker a instalarse inmediatamente
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // Borra el caché antiguo
          }
        })
      );
    })
  );
  self.clients.claim(); // Toma el control de la página inmediatamente
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
