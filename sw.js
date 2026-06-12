/* Launcher service worker — v3
   FIX: chỉ xoá cache CỦA LAUNCHER (launcher-*). Trước đây xoá mọi cache
   → phá cache offline của các module con (dungsai/wps/vattu/luongdu/han/son). */
const CACHE = "launcher-v11";

self.addEventListener("install", e => {
  // Không pre-cache — load tươi mỗi lần để tránh kẹt phiên bản cũ
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    // Chỉ xoá cache launcher cũ + cache tolerance đời đầu (tol-cache-v1..v3 trước khi tách SW)
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(k => k !== CACHE && (k.startsWith("launcher-") || /^tol-cache-v[1-3]$/.test(k)))
      .map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const u = new URL(e.request.url);
  // Để sub-apps tự xử (chúng có SW riêng)
  if (['/dungsai/', '/wps/', '/vattu/', '/luongdu/', '/han/', '/son/', '/bulong/', '/packing/', '/fitup/', '/soche/', '/qcdim/', '/hoacong/', '/pbb/', '/fabstation/', '/pbbfab/'].some(p => u.pathname.includes(p))) return;
  // Network-first cho launcher để luôn lấy bản mới
  e.respondWith(
    fetch(e.request).then(r => {
      const cp = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, cp));
      return r;
    }).catch(() => caches.match(e.request))
  );
});
