# Hướng dẫn bật AI cho MỌI NGƯỜI (proxy giữ key)

**Vấn đề:** khi gửi link app cho người khác, phần **"✨ Hỏi thêm AI"** (Gemini/Claude) không chạy — vì API key lưu riêng trong máy từng người (localStorage), **không đi theo link**. Nhúng key thẳng vào web công khai trên GitHub thì lộ key → bị khóa + người lạ xài hết quota.

**Giải pháp:** dựng một **proxy** nhỏ giữ key **ở server**. App gọi proxy → proxy thêm key → gọi AI → trả lời. Key không bao giờ lộ ra ngoài, và **ai mở link cũng hỏi được AI mà không cần cài key**.

> Trợ lý **offline** (hỏi-đáp có trích dẫn tiêu chuẩn) thì luôn chạy sẵn cho mọi người — phần này chỉ để bật thêm **AI thật** (LLM).

Dùng **Cloudflare Worker** (miễn phí, ổn định nhất về CORS). Làm 1 lần ~10 phút, toàn bộ trên trình duyệt.

---

## Bước 0 — Lấy API key (nếu chưa có)

- **Gemini (Google) — MIỄN PHÍ:** vào https://aistudio.google.com/apikey → **Create API key** → copy chuỗi bắt đầu bằng `AIza...`
- (Hoặc Claude `sk-ant-...` / ChatGPT `sk-...` nếu bạn có.)

---

## Bước 1 — Tạo tài khoản Cloudflare (miễn phí)

1. Vào https://dash.cloudflare.com/sign-up → đăng ký bằng email → xác nhận email.

## Bước 2 — Tạo Worker

1. Trong dashboard, menu trái chọn **Workers & Pages**.
2. Bấm **Create** → **Create Worker**.
3. Đặt tên, ví dụ `qc-ai` (URL sẽ là `https://qc-ai.<tên-tài-khoản>.workers.dev`).
4. Bấm **Deploy** (deploy bản mẫu trước đã).

## Bước 3 — Dán code proxy

1. Bấm **Edit code** (hoặc **</> Edit**).
2. **Xóa hết** code mẫu trong khung bên trái.
3. Mở file **`webapp/proxy/worker.js`** (trong thư mục app), copy **TOÀN BỘ** → dán vào.
4. (Khuyến nghị) sửa danh sách `ALLOWED_ORIGINS` ở đầu file cho khớp nơi bạn đặt app. Mặc định đã có sẵn GitHub Pages của bạn: `https://themy1809-del.github.io`.
5. Bấm **Deploy**.

## Bước 4 — Nạp API key làm SECRET (quan trọng nhất)

1. Quay lại trang Worker → tab **Settings** → mục **Variables and Secrets** (hoặc **Variables**).
2. Bấm **+ Add**.
   - **Type:** chọn **Secret** (để key được mã hóa, không ai xem lại được).
   - **Variable name:** gõ chính xác `AI_KEY`
   - **Value:** dán API key của bạn (`AIza...` / `sk-ant-...` / `sk-...`)
3. Bấm **Deploy** / **Save**.

## Bước 5 — Kiểm tra proxy sống chưa

1. Copy URL Worker (dạng `https://qc-ai.<tên>.workers.dev`).
2. Mở URL đó trên trình duyệt → thấy `{"ok":true,"msg":"Proxy AI đang chạy..."}` là **đã chạy**.

## Bước 6 — Gắn URL proxy vào app

1. Mở file **`webapp/assistant.js`**.
2. Tìm dòng (gần đầu, trong `window.QCAssistant = {`):
   ```js
   PROXY_URL: '',
   ```
3. Dán URL Worker vào giữa 2 dấu nháy:
   ```js
   PROXY_URL: 'https://qc-ai.tentaikhoan.workers.dev',
   ```
4. Lưu file.

## Bước 7 — Đẩy lên & kiểm tra

1. Chạy **`Cap-nhat-GitHub.bat`** để đẩy app lên GitHub.
2. Mở app, bấm **Ctrl+F5** (xóa cache).
3. **Thử trên máy/điện thoại KHÁC** (hoặc cửa sổ ẩn danh, chưa từng cài key): gõ câu hỏi → bấm **✨ Hỏi thêm AI** → AI trả lời ngay, **không cần cài key**. ✅

---

## Cách hoạt động (tóm tắt)

```
Người dùng (không có key)
        │  hỏi
        ▼
   App (PROXY_URL)
        │  gửi {câu hỏi}  — KHÔNG có key
        ▼
 Cloudflare Worker  ──(thêm AI_KEY bí mật)──►  Gemini/Claude/OpenAI
        ▲                                         │
        └─────────────  trả lời  ◄────────────────┘
```

- Ai có **key riêng** trên máy (đã bấm "✨ Cài AI") → app vẫn dùng key riêng của họ (không qua proxy).
- Ai **không có key** → app tự dùng proxy chung. Mọi người đều hỏi được.

## Bảo mật & chi phí

- **Key được giấu** trong Secret của Worker — không lộ trong mã nguồn công khai.
- **`ALLOWED_ORIGINS`** trong `worker.js` chỉ cho domain app của bạn gọi proxy → chặn web lạ xài chùa.
- **Miễn phí:** Cloudflare Workers cho **100.000 lượt/ngày**; Gemini có gói miễn phí. Quá nhiều thì thêm giới hạn (Rate Limiting) trong Cloudflare.
- Muốn **đổi key** sau này: chỉ sửa Secret `AI_KEY` trong Worker, **không phải đụng app**.

## Gặp lỗi?

| Hiện tượng | Cách xử lý |
|---|---|
| Mở URL Worker báo `Chưa cấu hình AI_KEY` | Chưa thêm Secret `AI_KEY` (Bước 4) — kiểm tra tên đúng chính tả. |
| App báo `Proxy AI 403` | Origin của app chưa nằm trong `ALLOWED_ORIGINS` — thêm domain vào `worker.js`, Deploy lại. |
| App báo `Proxy AI 500/502` | Key sai/hết hạn hoặc hết quota — kiểm tra lại API key trong Secret. |
| Vẫn đòi cài key | Chưa dán đúng `PROXY_URL` trong `assistant.js`, hoặc chưa Ctrl+F5. |

---

*File liên quan: `webapp/proxy/worker.js` (code proxy) · `webapp/assistant.js` (dòng `PROXY_URL`).*
