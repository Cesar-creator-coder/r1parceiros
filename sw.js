const CACHE_NAME = 'r1-suite-v3';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Estratégia Network First: sempre busca a página atualizada na internet
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
