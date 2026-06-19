/* DaiDung QC Suite - Service Worker (NETWORK-FIRST, whole app)
   Author: Dau The My.
   Online: always fetch fresh from network (no stale), also store cache.
   Offline: fall back to cached version (real offline for all pages + images).
   Update: new SW activates immediately + clears ALL old caches.
   Skips: POST (AI calls) and cross-origin requests (proxy qc-ai). */
const CACHE = 'daidung-qc-v2026-06-19-login2';

self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil((async function () {
    const keys = await caches.keys();
    await Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', function (e) {
  const req = e.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  if (url.origin !== self.location.origin) return;
  e.respondWith((async function () {
    try {
      const fresh = await fetch(req);
      if (fresh && fresh.status === 200 && fresh.type === 'basic') {
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone()).catch(function () {});
      }
      return fresh;
    } catch (err) {
      const cached = await caches.match(req);
      if (cached) return cached;
      if (req.mode === 'navigate') {
        const home = (await caches.match('./')) || (await caches.match('index.html'));
        if (home) return home;
      }
      throw err;
    }
  })());
});

self.addEventListener('message', function (e) {
  if (e.data === 'skipWaiting') self.skipWaiting();
});
