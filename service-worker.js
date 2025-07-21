<<<<<<< HEAD
const CACHE_NAME = 'diario-cache-v1';
const PRECACHE_URLS = [
  './',
  './index.html',
  // './app.js',  <-- RIMOSSO per evitare che venga cachato
  './style.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './logo.png',
  './favicon.ico'
];

// Installa e precache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Attiva e rimuovi vecchie cache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

// Risposte alle richieste: cache-first per risorse precache, fallback rete
self.addEventListener('fetch', event => {
  // Evita di cachare app.js
  if (event.request.url.includes('app.js')) {
    return fetch(event.request);
  }

  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;

        return fetch(event.request).then(response => {
          // Verifica validità della risposta
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clona PRIMA di usare la risposta
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseToCache));

          return response;
        });
      })
      .catch(() => {
        // fallback per richieste di navigazione (es. offline)
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      })
  );
});

=======
const CACHE_NAME = 'diario-cache-v1';
const PRECACHE_URLS = [
  './',
  './index.html',
  // './app.js',  <-- RIMOSSO per evitare che venga cachato
  './style.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './logo.png',
  './favicon.ico'
];

// Installa e precache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Attiva e rimuovi vecchie cache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

// Risposte alle richieste: cache-first per risorse precache, fallback rete
self.addEventListener('fetch', event => {
  // Evita di cachare app.js
  if (event.request.url.includes('app.js')) {
    return fetch(event.request);
  }

  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;

        return fetch(event.request).then(response => {
          // Verifica validità della risposta
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clona PRIMA di usare la risposta
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseToCache));

          return response;
        });
      })
      .catch(() => {
        // fallback per richieste di navigazione (es. offline)
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      })
  );
});

>>>>>>> 17b7099ef08e9d061c1bee5e54db399cb90aef4f
