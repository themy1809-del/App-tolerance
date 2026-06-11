const CACHE = 'vt-v7';
const SHELL = ['./', './index.html', './app.js', './app.css', './data.js', './sketches.js', './smart-search.js', '../photo-tool.js', '../report.js', '../itp.js', '../itp-data.js', './manifest.webmanifest'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k=>k.startsWith('vt-') && k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
    if (r.ok && new URL(e.request.url).origin === location.origin){ const cp=r.clone(); caches.open(CACHE).then(c=>c.put(e.request, cp)); }
    return r;
  }).catch(()=>hit)));
});
