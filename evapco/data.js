/* ===== EV_DATA — Thư viện QC dự án EVAPCO =====
   Nguồn: "Hướng dẫn về biện pháp gia công lắp đặt, kiểm soát chất lượng cho dự án EVAPCO"
   (Tài liệu đào tạo thợ ráp — An Hạ, 32 trang) — trích nguyên văn, đã xác minh. */
window.EV_DATA = {
  doc: 'TL đào tạo thợ ráp EVAPCO — An Hạ (32 trang)',

  /* Quy tắc VÀNG toàn dự án (mục Kết luận — nguyên văn) */
  GOLDEN: [
    { t: 'Dưỡng đạt chuẩn TRƯỚC khi lắp', d: 'Toàn bộ hệ khung EVAPCO phải chuẩn bị khung + dưỡng đạt chuẩn trước khi lắp. Hệ lỗ liên kết PHẢI làm dưỡng khoan.' },
    { t: 'Mũi khoan HỆ INCH', d: 'Dự án dùng mũi khoan hệ inch — không thay bằng mũi hệ mét gần đúng.' },
    { t: 'Lượng dư chiều dài khi ráp hoàn thiện', d: 'Khung dài < 9m: để dư chiều dài +1 ~ +3mm. Khung dài > 9m: để dư +5mm (bù co rút hàn).' },
    { t: 'Gông gá chống biến dạng', d: 'Phải đảm bảo biện pháp gông gá — tránh cong vênh, sai kích thước, sai lệch bản mã sau hàn.' }
  ],

  /* Lưu ý theo MÃ SẢN PHẨM (trang 6 — nguyên văn) */
  PRODUCTS: [
    { code: 'FBG', name: 'Khung bệ máy', page: 11,
      rule: 'Liên kết bởi 1 khung DÀI + 1 khung NGẮN → khi ráp hoàn thiện phải ĐẤU NỐI TRỰC TIẾP với nhau (tuyệt đối KHÔNG ráp rời từng khung) để tránh biến dạng, sai kích thước làm đấu nối sau này không đạt.',
      qc: 'Các vị trí gối: hàn xong + visual ĐẠT mới gắn lên bệ máy và gắn tấm mã đỡ. Bắn cao độ các gối bằng thủy bình/toàn đạc TRƯỚC khi chuyển hàn — thường để +1 ~ +2mm.' },
    { code: 'FDB (V cong)', name: 'Khung V cong', page: 13,
      rule: 'Bề mặt V uốn và cây I phải PHẲNG; khi ráp chú ý gông gá để giữ mặt phẳng sau hàn.',
      qc: 'Cắt DƯỠNG LỖ để khoan; khoan final SAU HÀN để thuận tiện kiểm tra.' },
    { code: 'FDB (bát xéo 45°)', name: 'Khung bát xéo 45°', page: 14,
      rule: 'KHÔNG lắp bản mã xéo trước. Trình tự đúng: ráp hoàn thiện các chi tiết trên khung → hàn → visual + nắn chỉnh thẳng → đem về DƯỠNG gắn bản mã xéo → gông gá chuẩn → mới hàn bản mã.',
      qc: 'Sai trình tự này là bản mã xéo lệch hàng loạt.' },
    { code: 'FDB (gối xéo 45°)', name: 'Gối xéo 45°', page: 15,
      rule: 'Tổ hợp 4 GỐI THÀNH 1 HÌNH VUÔNG trước, sau đó mới chuyển hàn.',
      qc: 'Không hàn rời từng gối.' },
    { code: 'PLG', name: 'Hệ khung 2D Plenum', page: 16,
      rule: 'Ráp 100% TRÊN DƯỠNG có sẵn; bản mã liên kết 2 đầu phải gông gá chuẩn chỉnh trước khi hàn.',
      qc: 'Kiểm dưỡng trước mỗi ca; bản mã 2 đầu là điểm soát chính.' },
    { code: 'BSG', name: 'Hệ khung 2D Bunder', page: 17,
      rule: 'Ráp 100% TRÊN DƯỠNG có sẵn; bản mã liên kết 2 đầu gông gá chuẩn trước khi hàn.',
      qc: 'Giống PLG — không ráp ngoài dưỡng.' },
    { code: 'USC', name: 'Cột', page: 18,
      rule: 'Các vị trí gối phải hàn + visual ĐẠT trước khi gắn bản mã liên kết (bản mã đậy nắp).',
      qc: 'Vị trí nối cột: cắt đầu cột bằng gió đá/plasma không đều → nham nhở gây cấn chạm khi lắp dựng + lỗ khoan bị xéo. Mặt cắt đầu cột phải phẳng đều.' },
    { code: 'USG', name: 'Ống giằng cột (Under)', page: 8,
      rule: 'Phải làm DƯỠNG CHUẨN — 2 bát hai đầu không đồng đều rất dễ lệch. Dùng LIVO (ni-vô) để đảm bảo chính xác.',
      qc: 'Kiểm hướng bát + độ đồng phẳng 2 bát trước khi hàn.' },
    { code: 'UUSG', name: 'Giằng ống & khung U chấn', page: 19,
      rule: 'Kiểm kỹ DƯỠNG RÁP; lưu ý HƯỚNG và sự ĐỒNG PHẲNG của bản mã liên kết.',
      qc: 'Bản mã ngược hướng là lỗi đã từng xảy ra — đối chiếu bản vẽ từng tấm.' }
  ],

  /* 9 lỗi thường xuyên xảy ra (trang 1–5 — nguyên văn) */
  ERRORS: [
    { e: 'Khoan lỗ số lượng nhiều bị sai tim, lệch mép', fix: 'Bắt buộc dùng DƯỠNG CHUẨN khi khoan hàng loạt', page: 2 },
    { e: 'Thiếu lỗ', fix: 'Tổ trưởng + giám sát kiểm lại sản phẩm TRƯỚC khi báo QC nghiệm thu', page: 3 },
    { e: 'Còn mill scale (vảy cán) khi lắp', fix: 'Loại bỏ mill scale TRƯỚC khi lắp', page: 4 },
    { e: 'Phôi I tổ hợp không đạt: cánh lớn, cánh nhỏ, lệch ke', fix: 'Kiểm lại phôi 1 lần nữa TRƯỚC khi ráp', page: 5 },
    { e: 'Đính chi tiết lệch mép do đọc bản vẽ chưa chuẩn', fix: 'Tổ trưởng/giám sát soát bản vẽ trước khi đính', page: 6 },
    { e: 'Ống giằng USG: 2 bát không đồng đều, lệch', fix: 'Làm dưỡng chuẩn + dùng livo', page: 8 },
    { e: 'Cắt đầu cột (USC) bằng gió đá/plasma nham nhở → cấn khi lắp dựng, lỗ khoan xéo', fix: 'Mặt cắt phải đều phẳng; sửa mặt cắt trước khi khoan', page: 9 },
    { e: 'Mối đính và khe hở không đạt', fix: 'Dùng livo kiểm + đính lại đúng khe hở', page: 9 },
    { e: 'Đính NGƯỢC bát, ngược bản mã', fix: 'Đối chiếu hướng theo bản vẽ từng tấm trước khi đính', page: 10 }
  ],

  /* Nhắc nhở QC giám sát (tổng hợp từ tài liệu) */
  REMIND: [
    'Tổ trưởng + giám sát PHẢI tự kiểm sản phẩm trước khi gọi QC nghiệm thu — không đẩy lỗi cho QC bắt',
    'Trước khi ráp: kiểm phôi (cánh, ke), sạch mill scale, mặt cắt đầu cột phẳng',
    'Trước khi khoan: có dưỡng khoan + mũi hệ inch + đo kích thước tổng',
    'Trước khi hàn: gông gá đủ, khe hở mối đính đạt, hướng bát/bản mã đúng bản vẽ',
    'Sau hàn: visual đạt rồi mới gắn chi tiết kế tiếp (gối, bản mã đậy nắp...); đo lại kích thước tổng + cao độ gối',
    'Lượng dư chiều dài: <9m để +1~3mm · >9m để +5mm — đo khi ráp hoàn thiện'
  ]
};
