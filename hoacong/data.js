/* ===== HC_DATA — Thư viện Nắn chỉnh Hỏa công =====
   Nguồn chính: QHPS-QAC-F-001 "Tài liệu hướng dẫn Hỏa công nắn phẳng" (15/10/2021) — tài liệu nội bộ, đã xác minh.
   Tham chiếu thêm: EN 1090-2 (nắn nóng phải có quy trình văn bản — tham khảo), ISO 13920 (dung sai sau nắn). */
window.HC_DATA = {
  doc: 'QHPS-QAC-F-001 · 15/10/2021',

  STEPS: [
    { t: '1. Xác định biến dạng', d: 'Đo độ võng / lồi lõm bằng thước thẳng 1m + thước nêm (taper gauge) hoặc căng dây. Ghi giá trị, vị trí, phạm vi. So với dung sai chế tạo (ISO 13920 / EN 1090-2) → chỉ nắn khi VƯỢT dung sai.', ref: 'QHPS-QAC-F-001 mục 8' },
    { t: '2. Lập phương án nắn', d: 'Chọn mẫu gia nhiệt (điểm / đường / chữ V / khối — khuyến cáo dùng GIA NHIỆT THEO ĐƯỜNG), xác định vị trí + trình tự đốt, đánh dấu tuyến và tâm tuyến đốt lên kết cấu trước khi châm lửa.', ref: 'QHPS-QAC-F-001 mục 6, 8' },
    { t: '3. Kiểm điều kiện trước nắn', d: 'Khu vực nắn đã HÀN XONG toàn bộ chi tiết; không nằm trong vùng sắp hàn và không bị nhiệt hàn lân cận ảnh hưởng; nắn TRƯỚC khi thử kín (nếu có), trước kiểm tra — nghiệm thu.', ref: 'QHPS-QAC-F-001 mục 5.1–5.3' },
    { t: '4. Chuẩn bị thiết bị & con người', d: 'Mỏ đốt đúng loại (1 đầu / nhiều đầu theo phương án), bút đo nhiệt hoặc súng IR, dụng cụ làm mát (chỉ nơi cho phép), chỉ dẫn thợ hỏa công các lưu ý trước khi làm. PCCC: bình chữa cháy, dọn vật cháy quanh khu vực.', ref: 'QHPS-QAC-F-001 mục 8' },
    { t: '5. Gia nhiệt theo phương án', d: 'Bắt đầu từ chi tiết có ĐỘ CỨNG LỚN NHẤT. Nhiệt độ vùng đốt ~650°C (thép đỏ sẫm). Chỉ đốt ngấm ¾ chiều dày tấm. Biến dạng nhiều mức khác nhau → nắn từ biến dạng TRUNG BÌNH trước.', ref: 'QHPS-QAC-F-001 mục 6, 7, 9' },
    { t: '6. Kiểm soát trong khi đốt', d: 'KHÔNG làm mát bằng nước/khí nén ở vùng mối hàn nối tấm (tránh tôi cứng, giòn). Mép kết cấu đã cố định → dừng đốt cách mép 300mm. Gia cường: đốt dải ĐỨT ĐOẠN để gia cường không biến dạng theo.', ref: 'QHPS-QAC-F-001 mục 7, chú ý' },
    { t: '7. Nguội & đo lại', d: 'Chờ nguội tự nhiên rồi mới đo. Chưa đạt → đốt dải tiếp theo ở vị trí gián tiếp (không đốt lại chỗ cũ khi chưa nguội). Lặp đến khi đạt dung sai.', ref: 'QHPS-QAC-F-001 mục 13, 20' },
    { t: '8. Nghiệm thu & hồ sơ', d: 'VT bề mặt vùng đốt: không nứt, không cháy lõm; nghi ngờ → MT. Đo kích thước đạt dung sai. Biên bản nắn (vị trí, mẫu gia nhiệt, nhiệt độ, kết quả đo trước/sau) + ảnh, lưu Nhật ký QC.', ref: 'EN 1090-2 (quy trình văn bản) — tham khảo' }
  ],

  /* 4 mẫu gia nhiệt — mục 6 */
  PATTERNS: [
    { id: 'diem', name: 'Gia nhiệt ĐIỂM', use: 'Tôn mỏng lồi lõm cục bộ nhỏ; đốt các điểm Ø15–30 so le quanh tâm lồi', note: 'Điểm cách nhau đều, từ ngoài vào tâm' },
    { id: 'duong', name: 'Gia nhiệt theo ĐƯỜNG ★ khuyến cáo', use: 'Đa số trường hợp: nắn thẳng gia cường, mối hàn nối tấm, mép tự do', note: 'Dải đốt thẳng theo tuyến đã đánh dấu, phía LỒI' },
    { id: 'chuv', name: 'Gia nhiệt chữ V', use: 'Nắn cong dầm/thép hình theo phương cạnh — V mở về phía cần co', note: 'Đáy V ở mép, miệng V hướng bụng cần co ngắn lại' },
    { id: 'khoi', name: 'Gia nhiệt HÌNH KHỐI (tam giác)', use: 'Cạnh hàn với tôn của gia cường; thép hình U đúc, T hàn', note: 'Chiều cao tam giác = 1/3–1/2 chiều cao mép' }
  ],

  /* Trình tự nắn phân đoạn — mục 9, 10 */
  ORDER: [
    '1. Nắn thẳng các kết cấu GIA CƯỜNG (độ cứng lớn nhất làm trước)',
    '2. Nắn biến dạng các mối hàn GÓC (tôn tại khu vực gia cường)',
    '3. Nắn biến dạng mối hàn NỐI TÔN (hàn giáp mối)',
    '4. Nắn phẳng khu vực GIỮA các cơ cấu gia cường (lồi lõm, mất ổn định)',
    '5. Nắn thẳng MÉP TỰ DO của tôn và biến dạng quanh lỗ khoét'
  ],

  /* Phương pháp theo dạng biến dạng — mục 13–22 */
  METHODS: [
    { name: 'Nắn thẳng kết cấu gia cường', how: 'Đốt dải NGANG trên cạnh mép (rộng 20–30mm), khoảng cách giữa các dải 400–600mm. Phần cạnh hàn với tôn: đốt TAM GIÁC cao 1/3–1/2 chiều cao mép. Chưa đạt → đốt dải tiếp ở vị trí gián tiếp.', ref: 'Mục 13' },
    { name: 'Biến dạng vùng hàn cơ cấu gia cường', how: 'Đốt dải DỌC TRỤC cơ cấu gia cường, phía LỒI (đối diện đường hàn). Dải liên tục hay đứt đoạn tùy độ cong vênh. Tôn mỏng: dải gần trục tâm hơn tôn dày. Trong 300mm từ mép tôn KHÔNG đốt.', ref: 'Mục 15' },
    { name: 'Biến dạng do mối hàn nối tấm (giáp mối)', how: 'Đốt các dải SONG SONG với mối hàn, phía LỒI, ~650°C. Biến dạng lớn → dải liên tục; nhỏ → đốt từng đoạn. TUYỆT ĐỐI không làm mát nước/khí nén (tôn dọc mối hàn sẽ bị tôi → giòn).', ref: 'Mục 17' },
    { name: 'Mép tự do tôn bao', how: 'Đốt từng đoạn hoặc theo đường. Mép dài: luôn bắt đầu từ MÉP TẤM, đi theo hướng gia cường vào TÂM tấm. Vùng cách mép cố định 200–300mm dừng.', ref: 'Mục 19' },
    { name: 'Lồi nhỏ và hẹp', how: 'CĐ1: đốt 2–3 dải qua TÂM điểm lồi → chờ nguội. CĐ2: đốt các dải nối tiếp. Chưa đạt → CĐ3, CĐ4: thêm dải bên cạnh chỗ lồi.', ref: 'Mục 20' },
    { name: 'Lồi lõm lớn và rộng', how: 'CĐ1–2: đốt dải DỌC theo kết cấu gia cường. Chỗ cong lớn → CĐ3–4: đổi hướng dải theo hướng tâm phần lồi, thay đổi chiều rộng ngọn lửa. Gia cường: đốt dải ĐỨT ĐOẠN.', ref: 'Mục 22' },
    { name: 'Gãy lớn ở mối hàn góc', how: 'Đốt tôn dọc theo khoảng cách 2 gia cường → ngừng, chờ nguội → đốt tiếp vị trí chưa đốt dọc gia cường. Gãy khác: đốt ngay vùng giữa các gia cường; mép đã cố định → ngừng đốt cách mép 300mm.', ref: 'Mục 12 (chú ý)' }
  ],

  /* Giới hạn cứng — tiêu chí chấp nhận */
  LIMITS: [
    { t: 'Nhiệt độ vùng đốt', v: '~650°C (đỏ sẫm) — không vượt quá', ref: 'QHPS-QAC-F-001 mục 17 · đã xác minh' },
    { t: 'Chiều sâu ngấm nhiệt', v: 'Chỉ đốt ngấm ¾ chiều dày tấm', ref: 'QHPS-QAC-F-001 mục 6 · đã xác minh' },
    { t: 'Làm mát vùng mối hàn nối tấm', v: 'CẤM nước / khí nén — chỉ nguội tự nhiên', ref: 'QHPS-QAC-F-001 mục 17 · đã xác minh' },
    { t: 'Khoảng cách tới mép đã cố định', v: 'Dừng đốt cách mép 300mm (mép tự do tôn bao: 200mm theo hình mục 19)', ref: 'QHPS-QAC-F-001 mục 12, 19 · đã xác minh' },
    { t: 'Dải đốt trên cạnh mép gia cường', v: 'Rộng 20–30mm; khoảng cách dải 400–600mm; tam giác cao 1/3–1/2 mép', ref: 'QHPS-QAC-F-001 mục 13 · đã xác minh' },
    { t: 'Sau nắn — kích thước', v: 'Đạt dung sai chế tạo ISO 13920 / EN 1090-2 Annex B (tra Thư viện Dung sai)', ref: 'ISO 13920:2023 · đã xác minh trong app' },
    { t: 'Sau nắn — bề mặt', v: 'VT 100% vùng đốt: không nứt, không cháy thủng; nghi ngờ nứt → MT', ref: 'Thực hành QC — tham khảo' },
    { t: 'Sau nắn — độ cứng (khi spec yêu cầu)', v: '≤ 450 HV10 vùng ảnh hưởng nhiệt', ref: 'EN 1090-2:2018 mục 6.4.4 · đã xác minh' },
    { t: 'Quy trình', v: 'Nắn nóng phải theo quy trình lập thành văn bản (phương án + nhiệt độ + cách nguội)', ref: 'EN 1090-2 mục 6.5.3 — tham khảo' }
  ],

  CHECKLIST: [
    { ph: 'Trước khi nắn', items: [
      'Đã đo và ghi biến dạng (giá trị + vị trí), xác nhận vượt dung sai mới nắn',
      'Khu vực đã hàn xong hoàn toàn; ngoài vùng ảnh hưởng nhiệt hàn',
      'Chưa thử kín / chưa nghiệm thu (nắn phải làm trước)',
      'Phương án nắn: mẫu gia nhiệt, tuyến đốt đã đánh dấu, trình tự rõ',
      'Thợ hỏa công đã được chỉ dẫn; PCCC sẵn sàng'
    ]},
    { ph: 'Trong khi nắn', items: [
      'Bắt đầu từ chi tiết độ cứng lớn nhất / biến dạng trung bình',
      'Nhiệt độ ~650°C — kiểm bằng bút nhiệt / súng IR, không nung đỏ sáng',
      'Ngấm ¾ chiều dày; đốt phía LỒI',
      'Không làm mát nước/khí nén vùng mối hàn nối tấm',
      'Dừng đốt cách mép cố định 300mm; gia cường đốt dải đứt đoạn'
    ]},
    { ph: 'Sau khi nắn', items: [
      'Nguội tự nhiên hoàn toàn rồi mới đo lại',
      'Kích thước đạt dung sai (ISO 13920 / spec dự án)',
      'VT vùng đốt: không nứt / cháy lõm / thủng — nghi ngờ thì MT',
      'Biên bản nắn + ảnh trước/sau, lưu Nhật ký QC'
    ]}
  ]
};
