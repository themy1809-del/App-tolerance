/* DaiDung QC Suite - Service Worker (HYBRID: nhanh + vẫn cập nhật)
   Author: Dau The My.
   - Ảnh / JS / CSS / font (ít đổi): CACHE-FIRST → mở TỨC THÌ từ bộ nhớ, không chờ mạng.
   - HTML / điều hướng: NETWORK-FIRST có giới hạn 2.5s → luôn lấy nội dung mới khi mạng ổn,
     mạng chậm thì rơi về bản đã lưu (không treo).
   - Đổi phiên bản CACHE mỗi lần phát hành: activate sẽ xoá cache cũ → tài nguyên tải mới.
   - Bỏ qua: POST (gọi AI) và request khác origin (proxy qc-ai). */
const CACHE = 'daidung-qc-v2026-07-13-ai';
const ASSET = /\.(?:js|css|jpg|jpeg|png|webp|gif|svg|ico|woff2?|ttf|json|webmanifest)(?:\?|$)/i;

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

  /* ----- Tài nguyên tĩnh: CACHE-FIRST (mở tức thì) ----- */
  if (ASSET.test(url.pathname)) {
    e.respondWith((async function () {
      const cached = await caches.match(req);
      if (cached) return cached;
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.status === 200 && fresh.type === 'basic') {
          const c = await caches.open(CACHE);
          c.put(req, fresh.clone()).catch(function () {});
        }
        return fresh;
      } catch (err) {
        return cached || Response.error();
      }
    })());
    return;
  }

  /* ----- HTML / điều hướng: NETWORK-FIRST, giới hạn 2.5s ----- */
  e.respondWith((async function () {
    try {
      const fresh = await Promise.race([
        fetch(req),
        new Promise(function (_, rej) { setTimeout(function () { rej(new Error('timeout')); }, 2500); })
      ]);
      if (fresh && fresh.status === 200 && fresh.type === 'basic') {
        const c = await caches.open(CACHE);
        c.put(req, fresh.clone()).catch(function () {});
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
