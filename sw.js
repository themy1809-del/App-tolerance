/* Launcher service worker — v2 — forces clean upgrade từ tolerance SW cũ */
const CACHE = "launcher-v2";

self.addEventListener("install", e => {
  // Không pre-cache — load tươi mỗi lần để tránh kẹt phiên bản cũ
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    // Xoá MỌI cache cũ (tol-cache-v3, launcher-v1, …)
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
    // Force reload tất cả tab đang mở để chuyển sang phiên bản mới
    const clients = await self.clients.matchAll({ type: "window" });
    for (const c of clients) { try { c.navigate(c.url); } catch(_){} }
  })());
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const u = new URL(e.request.url);
  // Để sub-apps tự xử (chúng có SW riêng)
  if (u.pathname.includes('/dungsai/') || u.pathname.includes('/wps/')) return;
  // Network-first cho launcher để luôn lấy bản mới
  e.respondWith(
    fetch(e.request).then(r => {
      const cp = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, cp));
      return r;
    }).catch(() => caches.match(e.request))
  );
});
