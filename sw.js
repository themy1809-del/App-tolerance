/* Launcher service worker — caches the chooser page only */
const CACHE = "launcher-v1";
const ASSETS = ["./", "index.html", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/icon-180.png", "icons/maskable-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const u = new URL(e.request.url);
  // Only handle launcher root + own assets — let sub-apps handle their own scopes
  if (u.pathname.startsWith('/dungsai/') || u.pathname.startsWith('/wps/')) return;
  e.respondWith(
    fetch(e.request).then(r => {
      const cp = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, cp));
      return r;
    }).catch(() => caches.match(e.request))
  );
});
