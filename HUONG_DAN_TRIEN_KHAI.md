# Hướng dẫn triển khai — Web App Tra Cứu Dung Sai (PWA)
*Deployment guide — Tolerance Lookup Web App*

App này là **PWA**: một web app tĩnh, cả đội mở chung 1 đường link, **cài được lên điện thoại, chạy offline**, không cần đăng nhập. Bạn (người bảo trì) cập nhật dữ liệu trong app rồi đăng lại link là mọi người thấy bản mới.

Thư mục cần triển khai: **`webapp/`** (gồm `index.html`, `tolerances-data.js`, `manifest.webmanifest`, `sw.js`, `icons/`).

---

## 1. Xem thử ngay trên máy
Nhấn đúp **`webapp/index.html`** → mở bằng trình duyệt. Mọi tính năng chạy được (tra cứu, tính, đánh giá, quản trị). *Lưu ý: chạy bằng file trên máy thì chưa “cài lên điện thoại” và service worker offline chưa bật — cần đăng lên 1 link (bước 2).*

## 2. Đăng lên 1 đường link (khuyến nghị: Netlify Drop — miễn phí, 1 phút)
1. Vào **https://app.netlify.com/drop**
2. **Kéo–thả nguyên thư mục `webapp/`** vào trang đó.
3. Netlify tạo ngay một link HTTPS, ví dụ `https://ten-cua-ban.netlify.app` → chia sẻ link này cho cả đội.
4. **Cập nhật về sau**: sửa dữ liệu (mục 4) → kéo–thả lại thư mục `webapp/` để ghi đè.

**Phương án khác (tuỳ hạ tầng):**
- **GitHub Pages**: đẩy thư mục `webapp/` lên repo → bật Pages. Miễn phí, có HTTPS.
- **Máy chủ nội bộ công ty** (IIS / Apache / Nginx): copy `webapp/` vào thư mục web. Dùng trong mạng LAN. *Để cài được lên điện thoại (PWA) cần HTTPS — nếu chỉ HTTP nội bộ thì vẫn dùng được trên trình duyệt, chỉ không “Add to Home screen” đầy đủ.*
- Bất kỳ static host nào (Vercel, Cloudflare Pages, Firebase Hosting…).

## 3. Cài lên điện thoại (sau khi có link HTTPS)
- **Android (Chrome)**: mở link → menu ⋮ → **Cài ứng dụng / Add to Home screen**.
- **iPhone (Safari)**: mở link → nút **Chia sẻ** → **Thêm vào MH chính / Add to Home Screen**.
- Sau khi cài: mở như app thật, **chạy offline**, có icon riêng.

## 4. Cập nhật / thêm tiêu chuẩn (chỉ người bảo trì)
1. Trong app, vào tab **🛠️ Quản trị**.
2. Lần đầu: **tạo mã PIN 4 số** (lưu trên máy bạn). Các lần sau nhập PIN để mở khoá.
3. **＋ Thêm dòng** hoặc **Sửa / Xoá** dòng có sẵn. Loại dung sai:
   - `FORMULA`: nhập biểu thức (vd `h/300`) + khai báo biến.
   - `FIXED`: giá trị cố định (vd `6`).
   - `REF`: tham chiếu định tính (không tính số).
   - `TABLE`: bảng theo dải + Class (sửa qua ô JSON).
   - Mỗi dòng **bắt buộc** có *Số điều khoản* (dẫn chứng) và *Tiêu chí chấp nhận (VI)*.
4. Bấm **💾 Lưu vào máy** để lưu tạm trên thiết bị bạn.
5. Bấm **⬇ Xuất dữ liệu (.js)** → tải về file `tolerances-data.js` mới → **thay file cũ trong `webapp/`** → **đăng lại link** (mục 2). Cả đội sẽ thấy bản cập nhật.
   - Cần khôi phục: **↺ Khôi phục gốc**. Cần nạp lại file: **⬆ Nhập dữ liệu**.

> Mô hình: *bạn chỉnh → Xuất → đăng lại* giữ một “nguồn đúng” duy nhất tại đường link cho cả đội.

## 5. Độ tin cậy dữ liệu
- **Đã đối chiếu PDF**: ISO 13920:2023 (Bảng 1/2/3), EN 1090-2 Annex B, EN 1090-4 Table D.1, AISC 303 §7.13, AWS D1.1 (undercut/reinforcement/root concavity).
- **Gắn ⚠ — cần đối chiếu bản gốc**: MBMA 2012, JASS 6.
- Kết quả chỉ mang tính tra cứu; khi nghiệm thu ưu tiên *execution specification / hợp đồng* và bản tiêu chuẩn gốc có kiểm soát (AISC §1.9: không quy định ≠ bằng 0).

## 6. Danh sách file
```
webapp/
├─ index.html              ← app (giao diện mới, mobile-first)
├─ tolerances-data.js      ← DỮ LIỆU dung sai (bạn cập nhật ở đây / hoặc xuất từ app)
├─ manifest.webmanifest    ← cấu hình PWA
├─ sw.js                   ← service worker (chạy offline)
└─ icons/                  ← icon ứng dụng
```
