// Service worker for WPS Library (offline shell)
const CACHE = 'wps-v4';
const SHELL = [
  './',
  './index.html',
  './qr.html',
  './app.js',
  './app2.js',
  './app.css',
  './wps-index.json',
  './manifest.webmanifest'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (req.url.endsWith('wps-index.json')) {
    e.respondWith(
      fetch(req).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return r; })
                .catch(() => caches.match(req))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r.ok && new URL(req.url).origin === location.origin) {
        const cp = r.clone();
        caches.open(CACHE).then(c => c.put(req, cp));
      }
      return r;
    }).catch(() => hit))
  );
});
