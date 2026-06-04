# Thư viện WPS — Hướng dẫn

## Mở app
- **PC / Laptop:** mở `webapp/wps/index.html`
- **Điện thoại (sau khi đẩy GitHub):** mở `https://<github-pages>/wps/` → bấm "Cài đặt" để dùng như app riêng (PWA, chạy offline)

## 4 cách tra cứu WPS (không cần nhớ số)

### 1️⃣ Tìm theo công việc (Wizard)
Bấm nút **🧰 Tìm theo công việc** — trả lời 5 câu:
1. Vật liệu chính (A572, A36, SS400, S355J2, A240-304…)
2. Vật liệu thứ hai (nếu hàn 2 vật liệu khác nhau, hoặc bỏ qua)
3. Tư thế (1G, 2G, 3G, 4G, 5G, 6G, 6GR, 1F-4F, PA/PC/PF…) — có **hình minh hoạ trực quan**
4. Kiểu mối (Butt, Fillet/T, Corner/Lap)
5. Chiều dày (mm)

→ Trả ra danh sách WPS xếp hạng theo độ khớp (★ 1/5 → 5/5).

### 2️⃣ Mục lục theo nhóm
Trên trang chủ có các nút bự (mosaic):
- 🚰 Ống 6G/6GR · ✨ Stainless 304/316 · 🔗 Dissimilar
- 🧱 S355J2 · 🇨🇳 Q345D/Q355 · 🇺🇸 A572 Gr.50 · 🏗️ A992
- 🛢️ A53/A106/A500 · 📄 SS400/A36 · 🛢️ SA516 Gr.70
- ⚡ Combo (FCAW+SAW) · 🥧 Fillet

Bấm 1 phát ra ngay danh sách WPS thuộc nhóm.

### 3️⃣ Yêu thích ★ + Gần đây
- Bấm ngôi sao ☆ trên card hoặc trong modal → đánh dấu yêu thích.
- Các WPS yêu thích & 6 WPS mở gần đây luôn hiện lên đầu trang chủ.
- Lưu trong trình duyệt (localStorage) — không cần đăng nhập, không đồng bộ giữa máy.

### 4️⃣ QR code dán bản vẽ
- Mở `qr.html` (nút **🔳 In QR cho WPS** trên trang chủ).
- Lọc theo dự án/quy trình → bấm **🖨️ In** → cắt từng ô → dán lên bản vẽ shop / phiếu công việc / tag vật liệu.
- Công nhân quét QR bằng camera điện thoại → mở thẳng WPS đó (qua deep-link `?id=…`).

## Tìm thông thường
- Ô tìm kiếm trên cùng: gõ số WPS, vật liệu, PQR, code, F-No, filler…
- Chip lọc quy trình (FCAW/SAW/GTAW…) ngay dưới ô search.
- Bộ lọc nâng cao: lọc theo dự án + code + tư thế + vật liệu + chiều dày.

---

## Cách 1 — Thêm 1 WPS mới (thủ công)

1. **Bỏ file PDF** vào `webapp/wps/files/` (giữ tên gốc cho gọn).
2. **Mở `wps-index.json`**, thêm entry vào mảng `items`:

```json
{
  "id": "WPS-DD-FCAW-999",
  "rev": "0",
  "code": "AWS D1.1:2020",
  "process": "FCAW",
  "position": "1G; 2G",
  "base_metal": "ASTM A572 Gr.50",
  "material_group": "Any Group I, II",
  "thickness": "3–25",
  "diameter": "All",
  "filler": "AWS A5.20 E71T-1C",
  "f_no": "6",
  "size": "Ø1.2",
  "pqr": "PQR-DD-FCAW-999",
  "project": "APF",
  "file": "WPS-DD-FCAW-999.pdf",
  "page": 1,
  "tags": ["fillet"]
}
```

3. (Tuỳ chọn) Nếu file PDF gốc chứa **nhiều WPS** (kiểu compilation), điền `"page": N` — app sẽ mở PDF nhảy thẳng đến trang đó.
4. Chạy `Cap-nhat-GitHub.bat` để đẩy lên.

## Cách 2 — Nhờ Claude đọc PDF tự điền

Mở chat mới trong project **App tolerance**, gửi tin nhắn:

> Đọc file PDF mới `tên-file.pdf` trong `webapp/wps/files/`, trích xuất metadata và thêm entry mới vào `wps-index.json`.

Claude sẽ đọc PDF, đọc bảng register / header, suy ra `process / position / base_metal / thickness / filler / pqr`, rồi append vào `items`.

## Trường dữ liệu (schema)

| Trường            | Bắt buộc | Ý nghĩa |
|-------------------|----------|---------|
| `id`              | ✅       | Số WPS (cũng là khoá deep-link `?id=…`) |
| `rev`             | ✅       | Revision |
| `code`            | ✅       | Tiêu chuẩn áp dụng — AWS D1.1 / ASME IX / ISO 15614 … |
| `process`         | ✅       | SMAW / GMAW / FCAW / GTAW (TIG) / SAW / hoặc combo (`FCAW + SAW`) |
| `position`        | ✅       | Tư thế — 1G, 2G, 3G, 4G, 5G, 6G, 6GR, 1F-4F, PA-PF, … (phân cách `;` hoặc `,`) |
| `base_metal`      | ✅       | Spec/grade vật liệu cơ bản. Dùng `→` để báo dissimilar (vd `A36 → A572`). |
| `material_group`  |          | P-No / M-No / ISO/TR 15608 group |
| `thickness`       |          | Phạm vi chiều dày (mm) — dạng `a–b` để bộ lọc “chiều dày” hoạt động |
| `diameter`        |          | Phạm vi đường kính |
| `filler`          | ✅       | AWS class / tên thương mại |
| `f_no`            |          | F-No |
| `size`            |          | Cỡ dây / cỡ que |
| `pqr`             | ✅       | Số PQR tham chiếu |
| `project`         | ✅       | Mã dự án (`APF`, `PHD`, `SAN`, `VEC`, …) — phải khớp 1 entry trong mảng `projects` |
| `file`            | ✅       | Tên file PDF trong `files/` |
| `page`            |          | Trang mở mặc định trong PDF (nếu file là compilation) |
| `tags`            |          | Mảng tag tự do — hiển thị ở modal, hỗ trợ tìm kiếm, tham gia phân loại |

## Thêm 1 dự án mới

Vào `wps-index.json`, append vào mảng `projects`:

```json
{
  "code": "ABC",
  "name_vi": "Tên dự án tiếng Việt",
  "name_en": "Project name in English",
  "file": "DDC-QAQC-ABC26-WPS-001.pdf",
  "register_doc": "DDC-QAQC-ABC26-WPS-001 Rev 0",
  "date": "2026-01-15"
}
```

---

## ⚠ Dung lượng file — GitHub Pages

- GitHub giới hạn **mỗi file ≤ 100 MB**; repo nên < 1 GB.
- File PDF compilation lớn (>100MB) **không đẩy được**. Hai cách xử lý:
  1. **Nén PDF** (giảm độ phân giải ảnh) — kéo-thả file vào `compress-pdf.bat` (cần cài Ghostscript: https://ghostscript.com/releases). Mức `/screen` giảm 70–80%.
  2. **Tách thành PDF riêng cho mỗi WPS** (≈ 0,1–0,5 MB/file) — đúng kiểu thư viện gốc, mỗi entry trỏ đến file riêng. Dùng `pdftk` hoặc Ghostscript:
     ```bash
     gs -dBATCH -dNOPAUSE -dFirstPage=10 -dLastPage=15 -sDEVICE=pdfwrite -sOutputFile=WPS-DD-FCAW-999.pdf input.pdf
     ```

## Cấu trúc thư mục

```
webapp/wps/
├── index.html              ← Trang chính (HTML thuần, gọn)
├── app.js                  ← Logic JS
├── app.css                 ← Style
├── qr.html                 ← Trang in QR code A4
├── wps-index.json          ← Database WPS (74 entries × 4 dự án)
├── manifest.webmanifest    ← PWA manifest
├── sw.js                   ← Service worker (offline)
├── compress-pdf.bat        ← Nén PDF lớn (kéo-thả)
├── HUONG_DAN_THEM_WPS.md   ← File này
└── files/                  ← Các PDF WPS (đã nén)
```

## Triển khai

Sau khi sửa, chạy `Cap-nhat-GitHub.bat` ở `webapp/` để commit + push lên GitHub Pages.
