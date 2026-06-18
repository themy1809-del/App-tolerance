/* ============================================================================
   Cloudflare Worker — PROXY AI + ĐĂNG NHẬP cho "DaiDung QC Suite"
   ----------------------------------------------------------------------------
   Worker này làm 3 việc:
     1) /        (POST {q,ctx})  → Proxy AI (giữ API key ở server, biến AI_KEY)
     2) /login   (POST {name,phone,code}) → Kiểm tra MÃ đăng nhập của từng người,
                  ghi NHẬT KÝ ai đã vào (tên, SĐT, mã, thời gian).
     3) /admin?pw=...  (GET) → Trang xem ai đã đăng nhập (chỉ bạn xem, có mật khẩu).

   CÁCH TRIỂN KHAI:
     1) dash.cloudflare.com → Workers & Pages → mở Worker qc-ai → Edit code
     2) Dán TOÀN BỘ file này → Deploy
     3) (Đã có) Secret AI_KEY cho phần AI. (Tùy chọn) Secret ADMIN_PW cho /admin.
     4) (Tùy chọn, để LƯU LỊCH SỬ) tạo KV namespace rồi gắn binding tên LOG
        — xem HUONG_DAN_DANG_NHAP.md. Không gắn KV thì đăng nhập vẫn chạy,
        chỉ là không lưu lại lịch sử (ghi tạm ra Console).
   ============================================================================ */

/* ====== DANH SÁCH MÃ ĐĂNG NHẬP — MỖI NGƯỜI 1 MÃ ======
   • THÊM người : thêm 1 dòng   'MÃ_RIÊNG': 'Tên người',
   • KHÓA người : xóa dòng của họ (hoặc thêm // ở đầu) rồi bấm Deploy lại.
   • Mã nên khó đoán (vd 6 số, hoặc chữ+số). KHÔNG chia sẻ file này công khai.
   ⚠ ĐỔI mã quản trị mẫu bên dưới thành mã của riêng bạn. */
const USERS = {
  '247365': 'Quản trị (Đậu Thế Mỹ) — đổi mã này',
  // '123456': 'Nguyễn Văn A',
  // '654321': 'Trần Thị B',
};

/* Mật khẩu mở trang /admin. ĐỔI thành của bạn (hoặc đặt Secret ADMIN_PW trong Worker). */
const ADMIN_PW_DEFAULT = 'doithanhmatkhaucuaban';

/* Chỉ các domain dưới đây được gọi Worker (chống người lạ xài chùa).
   So khớp theo tiền tố nên '.github.io' phủ mọi repo của bạn. */
const ALLOWED_ORIGINS = [
  'https://themy1809-del.github.io', // GitHub Pages của bạn
  'http://localhost',
  'http://127.0.0.1'
];

/* Cho phép mở app bằng file:// (Origin = "null") khi test trên máy. Đặt false để siết chặt. */
const ALLOW_FILE_NULL = true;

/* Prompt hệ thống — định hướng trợ lý, giữ ở server để kiểm soát chung (đồng bộ với app) */
const SYS = 'Bạn là trợ lý QC kết cấu thép của DaiDung. Trả lời bằng tiếng Việt, TẬN TÌNH theo bước đánh số (làm gì, dụng cụ gì, ghi chép gì), nêu tiêu chuẩn áp dụng (EN 1090-2, ISO 5817:2023, AWS D1.1, ISO 19840, AISC/RCSC...) và nhắc đối chiếu module tương ứng trong app (Dung sai, QC Hàn, QC Sơn, QC Bu lông, Vật tư, Lượng dư, WPS). Không bịa số liệu tiêu chuẩn; nếu không chắc hãy nói rõ. Người hỏi có thể dùng từ ngữ đời thường, không chuyên — hãy hiểu ý và trả lời dễ hiểu. Câu hỏi ngoài lĩnh vực QC/kết cấu thép vẫn trả lời hữu ích. QUAN TRỌNG: trả lời NGẮN GỌN, đi thẳng vào việc, tối đa ~250 từ — người hỏi đang đứng ở xưởng cần đáp án nhanh.';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = (url.pathname.replace(/\/+$/, '') || '/');
    const origin = request.headers.get('Origin') || '';
    const ok = originAllowed(origin);
    const cors = corsHeaders(origin, ok);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    /* ---------- TRANG THEO DÕI: GET /admin?pw=... ---------- */
    if (path === '/admin') return adminPage(request, env, url);

    /* ---------- ĐĂNG NHẬP: POST /login {name,phone,code} ---------- */
    if (path === '/login') {
      if (request.method !== 'POST') return json({ ok: false, error: 'Chỉ nhận POST' }, 405, cors);
      if (!ok) return json({ ok: false, error: 'Origin không được phép' }, 403, cors);
      let b = {};
      try { b = await request.json(); } catch (e) {}
      const name = String(b.name || '').trim().slice(0, 60);
      const phone = String(b.phone || '').replace(/[^\d+ .-]/g, '').trim().slice(0, 20);
      const code = String(b.code || '').trim().slice(0, 40);
      if (!name || !phone || !code) return json({ ok: false, error: 'Thiếu tên / SĐT / mã.' }, 400, cors);
      const who = USERS[code];
      if (!who) return json({ ok: false, error: 'Mã không đúng hoặc đã bị khóa.' }, 401, cors);
      const rec = {
        name, phone, code, who, ts: Date.now(),
        ip: request.headers.get('CF-Connecting-IP') || '',
        ua: (request.headers.get('User-Agent') || '').slice(0, 140)
      };
      try {
        if (env && env.LOG) {
          await env.LOG.put('log:' + rec.ts + ':' + Math.random().toString(36).slice(2, 7),
            JSON.stringify(rec), { expirationTtl: 60 * 60 * 24 * 180 }); // giữ ~180 ngày
        } else {
          console.log('LOGIN', JSON.stringify(rec));
        }
      } catch (e) { console.log('LOG_ERR', String(e)); }
      return json({ ok: true, name: who }, 200, cors);
    }

    /* ---------- AI PROXY (mặc định, POST /) ---------- */
    if (request.method === 'GET') return json({ ok: true, msg: 'Proxy AI đang chạy. Gửi POST {q, ctx}.' }, 200, cors);
    if (request.method !== 'POST') return json({ error: 'Chỉ nhận POST' }, 405, cors);
    if (!ok) return json({ error: 'Origin không được phép: ' + (origin || '(trống)') }, 403, cors);

    const key = env && env.AI_KEY;
    if (!key) return json({ error: 'Server chưa cấu hình AI_KEY (vào Worker → Settings → Variables thêm Secret AI_KEY).' }, 500, cors);

    let body = {};
    try { body = await request.json(); } catch (e) {}
    const q = String(body.q || '').slice(0, 2000);
    const ctx = String(body.ctx || '').slice(0, 4000);
    if (!q) return json({ error: 'Thiếu câu hỏi (q).' }, 400, cors);

    const USER = 'Câu hỏi: ' + q + (ctx ? '\n\nDữ liệu liên quan trong app:\n' + ctx : '');
    try {
      const text = await callAI(key, USER);
      return json({ text }, 200, cors);
    } catch (e) {
      return json({ error: String((e && e.message) || e) }, 502, cors);
    }
  }
};

/* ---------- Trang /admin: xem ai đã đăng nhập ---------- */
async function adminPage(request, env, url) {
  const htmlHeaders = { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' };
  const pw = url.searchParams.get('pw') || '';
  const real = (env && env.ADMIN_PW) || ADMIN_PW_DEFAULT;
  if (!pw || pw !== real) {
    return new Response('<!doctype html><meta charset="utf-8"><body style="font-family:system-ui;background:#0e1521;color:#e6ecf4;padding:30px">'
      + '<h3>Cần mật khẩu</h3><p>Mở: <code>' + escapeHtml(url.origin) + '/admin?pw=MẬT_KHẨU</code></p></body>', { status: 401, headers: htmlHeaders });
  }
  let items = [];
  let kvOn = !!(env && env.LOG);
  if (kvOn) {
    try {
      const list = await env.LOG.list({ prefix: 'log:', limit: 1000 });
      for (const k of list.keys) {
        const v = await env.LOG.get(k.name);
        if (v) { try { items.push(JSON.parse(v)); } catch (e) {} }
      }
      items.sort((a, b) => b.ts - a.ts);
    } catch (e) { kvOn = false; }
  }
  // gom số người (theo SĐT) và số lượt
  const phones = {};
  items.forEach(r => { phones[r.phone] = (phones[r.phone] || 0) + 1; });
  const rows = items.map(r =>
    '<tr><td>' + fmt(r.ts) + '</td><td>' + escapeHtml(r.name) + '</td><td>' + escapeHtml(r.phone)
    + '</td><td>' + escapeHtml(r.who || '') + '</td><td>' + escapeHtml(r.code) + '</td><td>' + escapeHtml(r.ip || '') + '</td></tr>'
  ).join('') || '<tr><td colspan="6" style="color:#8aa">Chưa có lượt đăng nhập nào.</td></tr>';
  const banner = kvOn ? '' :
    '<div style="background:#3a2a10;border:1px solid #6a521e;color:#f0cf86;padding:10px 13px;border-radius:10px;margin:0 0 14px;font-size:13px">'
    + '⚠ Chưa bật KV (binding <b>LOG</b>) nên KHÔNG lưu lịch sử — đăng nhập vẫn chạy nhưng chỉ ghi tạm ra Console. '
    + 'Xem HUONG_DAN_DANG_NHAP.md để bật KV (lưu ~180 ngày).</div>';
  const html = '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
    + '<title>Theo dõi đăng nhập — DaiDung QC</title>'
    + '<style>body{font-family:-apple-system,system-ui,Arial;margin:0;background:#0e1521;color:#e6ecf4}'
    + 'header{background:linear-gradient(180deg,#1b2a4a,#13203b);padding:14px 18px;font-weight:800;font-size:16px}'
    + '.w{max-width:920px;margin:0 auto;padding:16px}'
    + '.cards{display:flex;gap:12px;margin:0 0 16px;flex-wrap:wrap}'
    + '.c{background:#161e2b;border:1px solid #28323f;border-radius:12px;padding:12px 16px;min-width:120px}'
    + '.c .n{font-size:24px;font-weight:800;color:#7fd1a6}.c .l{font-size:12px;color:#9fb2bd}'
    + 'table{width:100%;border-collapse:collapse;font-size:13.5px;background:#161e2b;border-radius:12px;overflow:hidden}'
    + 'th,td{padding:9px 11px;border-bottom:1px solid #28323f;text-align:left;white-space:nowrap}'
    + 'th{color:#9fb2bd;font-size:11px;text-transform:uppercase;letter-spacing:.04em;background:#13203b}'
    + 'tr:last-child td{border-bottom:0}</style>'
    + '<header>📋 DaiDung QC — Theo dõi đăng nhập</header><div class="w">'
    + banner
    + '<div class="cards"><div class="c"><div class="n">' + Object.keys(phones).length + '</div><div class="l">Người (theo SĐT)</div></div>'
    + '<div class="c"><div class="n">' + items.length + '</div><div class="l">Lượt đăng nhập</div></div></div>'
    + '<table><tr><th>Thời gian</th><th>Tên</th><th>SĐT</th><th>Nhãn mã</th><th>Mã</th><th>IP</th></tr>' + rows + '</table>'
    + '<p style="color:#6b7787;font-size:12px;margin-top:16px">Tác giả: Đậu Thế Mỹ · DaiDung QC Suite</p></div>';
  return new Response(html, { status: 200, headers: htmlHeaders });
}
function fmt(ts) { try { return new Date(ts).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }); } catch (e) { return new Date(ts).toISOString(); } }
function escapeHtml(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

/* ---------- CORS + Origin ---------- */
function originAllowed(origin) {
  if (!origin) return true;                 // gọi không kèm Origin (curl/test nội bộ)
  if (origin === 'null') return ALLOW_FILE_NULL;
  return ALLOWED_ORIGINS.some(o => o && origin.startsWith(o));
}
function corsHeaders(origin, ok) {
  const allow = (ok && origin && origin !== 'null') ? origin : (ALLOWED_ORIGINS[0] || '*');
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}
function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...cors }
  });
}

/* ---------- Gọi AI: tự nhận diện hãng theo đầu key ---------- */
async function callAI(key, USER) {
  /* GEMINI (AIza...) — miễn phí; thử lần lượt vài model cho chắc */
  if (/^AIza/.test(key)) {
    const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
    let last = '0';
    for (const mdl of models) {
      const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + mdl + ':generateContent', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYS }] },
          contents: [{ role: 'user', parts: [{ text: USER }] }],
          generationConfig: mdl.includes('2.5')
            ? { maxOutputTokens: 900, thinkingConfig: { thinkingBudget: 0 } }
            : { maxOutputTokens: 900 }
        })
      });
      if (r.ok) {
        const j = await r.json();
        const txt = (((j.candidates || [])[0] || {}).content || { parts: [] }).parts.map(p => p.text || '').join('\n');
        if (txt) return txt + '\n\n— Gemini ' + mdl.replace('gemini-', '');
      }
      last = String(r.status);
      if (![400, 403, 404, 429, 500, 503, 504].includes(r.status)) break;
    }
    throw new Error('Gemini lỗi (' + last + ')');
  }
  /* CLAUDE (sk-ant-...) */
  if (/^sk-ant-/.test(key)) {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 1200, system: SYS, messages: [{ role: 'user', content: USER }] })
    });
    if (!r.ok) throw new Error('Claude lỗi (' + r.status + ')');
    const j = await r.json();
    return (j.content || []).map(c => c.text || '').join('\n');
  }
  /* CHATGPT (sk-...) */
  if (/^sk-/.test(key)) {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'authorization': 'Bearer ' + key },
      body: JSON.stringify({ model: 'gpt-4o-mini', max_tokens: 1200, messages: [{ role: 'system', content: SYS }, { role: 'user', content: USER }] })
    });
    if (!r.ok) throw new Error('ChatGPT lỗi (' + r.status + ')');
    const j = await r.json();
    return (((j.choices || [])[0] || {}).message || {}).content || '(không có nội dung)';
  }
  throw new Error('AI_KEY không nhận diện được hãng (cần AIza... / sk-ant-... / sk-...)');
}
