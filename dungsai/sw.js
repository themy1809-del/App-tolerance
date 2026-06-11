/* Service worker — offline + tự cập nhật khi online (network-first) */
const CACHE = "tol-cache-v14";
const ASSETS = [
  "./", "index.html", "tolerances-data.js", "tolerances-tier1.js", "tolerances-tier2.js", "tolerances-tier3.js", "tolerances-tier4-mech.js", "sketches.js", "sketches-v2.js", "sketches-v3-mech.js", "sketch-bind.js", "sketch-overlay.js", "smart-search.js", "../photo-tool.js", "../report.js", "manifest.webmanifest",
  "../icons/icon-192.png", "../icons/icon-512.png", "../icons/icon-180.png", "../icons/maskable-512.png"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("tol-cache-") && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
/* Network-first: luôn lấy bản mới khi có mạng, offline thì dùng cache */
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(resp => {
      const cp = resp.clone();
      caches.open(CACHE).then(c => c.put(e.request, cp));
      return resp;
    }).catch(() => caches.match(e.request).then(r => r || caches.match("index.html")))
  );
});
