/* ============================================================================
   Cloudflare Worker — PROXY AI cho "DaiDung QC Suite"
   ----------------------------------------------------------------------------
   MỤC ĐÍCH: giữ API key Ở SERVER (biến môi trường AI_KEY). Nhờ vậy MỌI NGƯỜI
   mở link app đều hỏi được AI mà KHÔNG cần tự cài key. Key KHÔNG bao giờ
   lộ ra trình duyệt / mã nguồn công khai.

   CÁCH TRIỂN KHAI (xem HUONG_DAN_PROXY_AI.md để có hình từng bước):
     1) dash.cloudflare.com → Workers & Pages → Create → Create Worker → Deploy
     2) Edit code → dán TOÀN BỘ file này → Deploy
     3) Worker → Settings → Variables and Secrets → Add → Secret:
          tên  = AI_KEY
          giá trị = API key của bạn
            • AIza...   → Gemini (Google) — MIỄN PHÍ (aistudio.google.com/apikey)
            • sk-ant-... → Claude (Anthropic)
            • sk-...    → ChatGPT (OpenAI)
     4) Sửa ALLOWED_ORIGINS bên dưới cho khớp domain đặt app của bạn
     5) Copy URL Worker (https://ten-app.tai-khoan.workers.dev)
        → dán vào webapp/assistant.js: dòng  PROXY_URL: '...'
        → chạy Cap-nhat-GitHub.bat để đẩy lên
   ============================================================================ */

/* Chỉ các domain dưới đây được gọi proxy (chống người lạ xài chùa key của bạn).
   Sửa cho khớp nơi bạn đặt app. So khớp theo tiền tố nên '.github.io' phủ mọi repo. */
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
    const origin = request.headers.get('Origin') || '';
    const ok = originAllowed(origin);
    const cors = corsHeaders(origin, ok);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
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
