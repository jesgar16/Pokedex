const CACHE = 'pokedex-v2';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;

  // La IA siempre va por red (nunca se cachea, lleva la clave)
  if (url.hostname === 'api.anthropic.com') return;

  // Datos, sprites y gritos de PokéAPI: cache-first (los pokémones no cambian)
  const esPokeapi = url.hostname === 'pokeapi.co' || url.hostname === 'raw.githubusercontent.com';

  e.respondWith(
    caches.match(e.request).then(hit => {
      if (hit) return hit;
      return fetch(e.request).then(resp => {
        if (resp.ok && (esPokeapi || url.origin === self.location.origin || url.hostname === 'fonts.gstatic.com' || url.hostname === 'fonts.googleapis.com')) {
          const copia = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, copia));
        }
        return resp;
      }).catch(() => hit);
    })
  );
});
