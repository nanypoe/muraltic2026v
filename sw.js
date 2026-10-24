const CACHE_NAME = 'mural-tic-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/css/styles.css',
  './assets/js/app.js',
  './assets/data/generalidades.json',
  './assets/data/para_que_sirven.json',
  './assets/data/modulos_actividades.json',
  './assets/data/calendario.json',
  './assets/data/como_ingresar_a_campus.json',
  './assets/data/como_realizar_modulo.json',
  './assets/data/como_realizar_foro.json',
  './assets/data/como_realizar_cuestionario.json',
  './assets/data/credenciales.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);
  if(url.origin !== location.origin) return;
  if(req.url.includes('assets/data/')){
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return fetch(req).then(res => {
          if(res.ok) cache.put(req, res.clone());
          return res;
        }).catch(() => cache.match(req));
      })
    );
    return;
  }
  event.respondWith(
    caches.match(req).then(cached => {
      if(cached) return cached;
      return fetch(req).then(res => {
        if(res.ok){
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
        }
        return res;
      }).catch(()=>cached);
    })
  );
});
