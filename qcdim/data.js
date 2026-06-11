/* ============================================================================
   MODULE QC DIM — KIỂM TRA KÍCH THƯỚC SAU HÀN (công đoạn 5)
   Giới hạn chi tiết theo class tra trong THƯ VIỆN Dung sai (../dungsai/ —
   có trích dẫn điều khoản đã xác minh). Bảng ISO 13920:2023 nhúng sẵn
   (đã xác minh từ PDF) cho calculator nhanh.
   ============================================================================ */
(function () {
  const B = (vi, en) => ({ vi, en });
  const num = v => (isFinite(v) ? Math.round(v * 100) / 100 : v);

  const ISO_RANGES = [
    { from: 2, to: 30, l: "2–30" }, { from: 30, to: 120, l: "30–120" }, { from: 120, to: 400, l: "120–400" },
    { from: 400, to: 1000, l: "400–1000" }, { from: 1000, to: 2000, l: "1000–2000" }, { from: 2000, to: 4000, l: "2000–4000" },
    { from: 4000, to: 8000, l: "4000–8000" }, { from: 8000, to: 12000, l: "8000–12000" }, { from: 12000, to: 16000, l: "12000–16000" },
    { from: 16000, to: 20000, l: "16000–20000" }, { from: 20000, to: 1e12, l: ">20000" }
  ];
  const ISO_CELLS = { A: [1,1,1,2,3,4,5,6,7,8,9], B: [1,2,2,3,4,6,8,10,12,14,16], C: [1,3,4,6,8,11,14,18,21,24,27], D: [1,4,7,9,12,16,21,27,32,36,40] };
  function iso13920(Lmm, cls) {
    let i = ISO_RANGES.findIndex(b => Lmm > b.from && Lmm <= b.to);
    if (i < 0) i = ISO_RANGES.length - 1;
    return { band: ISO_RANGES[i].l, lim: (ISO_CELLS[cls] || ISO_CELLS.C)[i] };
  }

  const STEPS = [
    { t: B("Lập kế hoạch đo + chốt class", "Measurement plan + class"),
      d: B("Liệt kê hạng mục đo của cấu kiện (dài, cao, camber, vuông góc, vị trí lỗ/chi tiết) theo bản vẽ; chốt class dung sai theo HỢP ĐỒNG (EXC → EN 1090-2 Annex B, hoặc ISO 13920 A–D, hoặc AISC).", "List items per drawing; fix tolerance class per contract."),
      tool: B("Bản vẽ + Thư viện Dung sai (giới hạn + trích dẫn từng hạng mục)", "Drawing + Tolerance library") },
    { t: B("Dụng cụ đo hiệu chuẩn", "Calibrated instruments"),
      d: B("Thước cuộn/caliper/máy thủy bình/total station còn tem hiệu chuẩn; thước cuộn dài kiểm lực căng tiêu chuẩn.", "Valid calibration; tape tension."),
      tool: B("Sổ hiệu chuẩn + tem trên dụng cụ", "Calibration records") },
    { t: B("Điều kiện đo", "Measuring conditions"),
      d: B("Cấu kiện NGUỘI hoàn toàn sau hàn; kê tự do trên gối (không kẹp, không tải); ghi nhiệt độ — đo dài phải bù giãn nở (~12µm/m/°C, quy về 20°C); làm sạch điểm đặt thước.", "Fully cooled, freely supported, temperature recorded & corrected."),
      tool: B("Nhiệt kế + gối kê + calculator giãn nhiệt (Lượng dư)", "Thermometer + supports") },
    { t: B("Đo kích thước tổng", "Overall dimensions"),
      d: B("Chiều dài/cao/rộng, khoảng cách trục, khẩu độ — đọc 2 lần lấy trung bình, ghi kèm VỊ TRÍ đo + nhiệt độ; nhập vào calculator tab Kiểm tra để ra Đạt/Không đạt.", "Lengths/axes; 2 readings; evaluate in Inspect tab."),
      tool: B("Thước cuộn chứng chỉ → calculator ISO 13920", "Tape → ISO 13920 calculator") },
    { t: B("Độ thẳng · camber · vuông góc", "Straightness · camber · squareness"),
      d: B("Căng dây/máy đo tại 2 đầu + giữa nhịp (+ các điểm nút); camber đo khi KHÔNG tải; khung kéo 2 đường chéo. Giới hạn từng hạng mục tra Thư viện Dung sai (vd độ thẳng, camber theo Annex B có hình cách đo).", "Wire/instrument at ends + midspan; camber unloaded; diagonals for frames."),
      tool: B("Dây căng / máy thủy bình → Thư viện Dung sai", "Wire/level → library") },
    { t: B("Vị trí lỗ + chi tiết hàn kèm", "Holes & attachments"),
      d: B("Đo từ MỘT datum thống nhất (không đo chuyền); nhóm lỗ liên kết, sườn, bản mã, tai cẩu so bản vẽ.", "From single datum; hole groups, stiffeners, gussets vs drawing."),
      tool: B("Thước + dưỡng; khe hở lỗ: QC Sơ chế Table 11", "Tape + templates") },
    { t: B("Xử lý KHÔNG ĐẠT", "Rectify failures"),
      d: B("Nắn cơ/nhiệt theo quy trình duyệt (nhiệt độ nắn nóng giới hạn theo mác thép) → ĐO LẠI 100% hạng mục hỏng; vượt khả năng nắn → NCR + quyết định xử lý.", "Straighten per approved procedure → re-measure 100%; else NCR."),
      tool: B("Quy trình nắn + NCR một chạm (Lượng dư)", "Straightening procedure + NCR") },
    { t: B("Dimensional report + bàn giao", "Report & release"),
      d: B("Biên bản đo: giá trị – giới hạn – kết luận – người đo – nhiệt độ (in từ Checklist); copy trích dẫn điều khoản từ Thư viện vào hồ sơ; lưu Nhật ký QC; đạt mới chuyển Ráp thử/Coating.", "Dimensional report + clause citation; QC log; release to next stage."),
      tool: B("🖨 In biên bản + 📋 Copy trích dẫn (Thư viện) + Nhật ký", "Print + citation + log") }
  ];

  const RULES = [
    {
      id: "qd_len",
      title: B("Kích thước dài — ISO 13920 class A–D", "Linear dimension — ISO 13920"),
      criteria: B("Sai lệch so danh nghĩa ≤ giá trị bảng theo class + dải kích thước (bảng đã xác minh, nhúng sẵn). Dự án EN dùng Annex B: tra hạng mục tương ứng trong Thư viện Dung sai.",
        "Deviation ≤ table value per class & size band."),
      measure: B("Đọc 2 lần lấy trung bình; đo dài >10m bù nhiệt về 20°C trước khi nhập.", "Average of 2 readings; temperature-correct long dims."),
      quote: "ISO 13920:2023 Table 1 — đã xác minh từ PDF (xem Thư viện Dung sai để có trích dẫn đầy đủ)",
      calc: {
        inputs: [
          { k: "L", label: B("Danh nghĩa (mm)", "Nominal (mm)"), def: 12000 },
          { k: "m", label: B("Đo được — đã bù nhiệt (mm)", "Measured, corrected (mm)"), def: 12008 },
          { k: "cls", label: B("Class (1=A,2=B,3=C,4=D)", "Class"), def: 2 }
        ],
        evaluate(v) {
          const cl = ["A","B","C","D"][Math.min(Math.max(Math.round(v.cls),1),4)-1];
          const r = iso13920(v.L, cl);
          const dev = Math.abs(v.m - v.L);
          return { limitText: `Class ${cl}, dải ${r.band}mm → ±${r.lim} mm`, detail: `|${v.m} − ${v.L}| = ${num(dev)} mm`, pass: dev <= r.lim };
        }
      }
    },
    {
      id: "qd_straight",
      title: B("Độ thẳng / camber — theo giới hạn thư viện", "Straightness / camber"),
      criteria: B("Đo độ lệch lớn nhất so dây căng/đường chuẩn. Giới hạn phổ biến EN 1090-2 Annex B (essential): L/750 — NHƯNG hạng mục cụ thể (dầm, cột, camber đặt sẵn) phải tra đúng điều khoản trong Thư viện Dung sai rồi nhập giới hạn vào đây.",
        "Max offset vs stretched wire. Common essential limit L/750 — verify exact clause in library."),
      measure: B("Dây căng 2 đầu (hoặc máy), đo khe lớn nhất ở giữa bằng thước; camber đo khi cấu kiện không tải, kê tự do.", "Wire between ends; max gap at midspan; camber unloaded."),
      quote: "EN 1090-2 Annex B — tra điều khoản + trích dẫn trong Thư viện Dung sai",
      calc: {
        inputs: [
          { k: "L", label: B("Chiều dài đoạn đo L (mm)", "Length L (mm)"), def: 12000 },
          { k: "f", label: B("Độ lệch đo được (mm)", "Measured offset (mm)"), def: 12 },
          { k: "n", label: B("Mẫu số giới hạn L/n (mặc định 750)", "Limit divisor n (default 750)"), def: 750 }
        ],
        evaluate(v) {
          const lim = v.L / (v.n || 750);
          return { limitText: `L/${v.n || 750} = ${num(lim)} mm`, detail: `Đo ${v.f} mm`, pass: v.f <= lim };
        }
      }
    },
    {
      id: "qd_diag",
      title: B("Vuông góc — chênh hai đường chéo", "Squareness — diagonals"),
      criteria: B("|d1 − d2| so dung sai bản vẽ; không ghi → tham chiếu ISO 13920 class B cho chiều dài đường chéo.", "|d1−d2| vs drawing; else ISO 13920 B reference."),
      measure: B("Cùng thước, cùng lực căng, cùng người đo cho cả 2 đường chéo.", "Same tape/tension/person both diagonals."),
      quote: "Thực hành + ISO 13920 Table 1 (đã xác minh)",
      calc: {
        inputs: [
          { k: "d1", label: B("Đường chéo 1 (mm)", "Diagonal 1"), def: 13416 },
          { k: "d2", label: B("Đường chéo 2 (mm)", "Diagonal 2"), def: 13424 },
          { k: "tol", label: B("Dung sai bản vẽ (0 = ISO B)", "Drawing tol (0 = ISO B)"), def: 0 }
        ],
        evaluate(v) {
          const d = Math.abs(v.d1 - v.d2);
          const ref = iso13920(Math.max(v.d1, v.d2), "B").lim;
          const lim = v.tol > 0 ? v.tol : ref;
          return { limitText: v.tol > 0 ? `|Δd| ≤ ${v.tol} mm (bản vẽ)` : `|Δd| ≤ ${ref} mm (ISO 13920 B)`, detail: `|Δd| = ${num(d)} mm`, pass: d <= lim };
        }
      }
    },
    {
      id: "qd_pos",
      title: B("Vị trí lỗ / chi tiết từ datum", "Position from datum"),
      criteria: B("Sai lệch vị trí ≤ dung sai bản vẽ (không ghi → tra điều khoản Annex B trong Thư viện rồi nhập).", "Deviation ≤ drawing tolerance (else Annex B via library)."),
      measure: B("Mọi vị trí đo từ MỘT datum — đo chuyền là tích lũy sai số.", "All from ONE datum."),
      quote: "EN 1090-2 Annex B — qua Thư viện Dung sai",
      calc: {
        inputs: [
          { k: "d", label: B("Thiết kế từ datum (mm)", "Design (mm)"), def: 3000 },
          { k: "m", label: B("Đo được (mm)", "Measured (mm)"), def: 3002 },
          { k: "tol", label: B("Dung sai ± (mm)", "Tol ± (mm)"), def: 3 }
        ],
        evaluate(v) {
          const dev = Math.abs(v.m - v.d);
          return { limitText: `±${v.tol} mm`, detail: `Lệch ${num(dev)} mm`, pass: dev <= v.tol };
        }
      }
    }
  ];

  const CHECKLIST = [
    { phase: B("CHUẨN BỊ ĐO", "PREPARE"), icon: "📋", items: [
      { t: B("Kế hoạch đo + class dung sai chốt theo hợp đồng (ghi rõ điều khoản áp dụng)", "Plan + class fixed per contract"), ref: B("Thư viện Dung sai", "Tolerance library") },
      { t: B("Dụng cụ còn tem hiệu chuẩn", "Instruments in calibration"), ref: "ISO 17123" },
      { t: B("Cấu kiện nguội hoàn toàn, kê tự do; nhiệt độ ghi nhận", "Cooled, freely supported; temp recorded"), ref: B("Điều kiện đo", "Conditions") }
    ]},
    { phase: B("ĐO KIỂM", "MEASURE"), icon: "📏", items: [
      { t: B("Kích thước tổng (dài/cao/khẩu độ) — bù nhiệt, 2 lần đọc, trong dung sai class", "Overall dims corrected, within class"), ref: "ISO 13920 / Annex B" },
      { t: B("Độ thẳng + camber (không tải) trong giới hạn điều khoản", "Straightness + camber within clause"), ref: "EN 1090-2 Annex B" },
      { t: B("Vuông góc: chênh 2 đường chéo đạt", "Diagonals OK"), ref: B("Bản vẽ / ISO 13920", "Drawing") },
      { t: B("Vị trí nhóm lỗ + chi tiết hàn kèm từ datum đúng bản vẽ", "Holes & attachments from datum"), ref: B("Bản vẽ", "Drawing") },
      { t: B("Kết quả lưu Nhật ký QC (nút 💾 ở calculator)", "Results saved to QC log"), ref: B("Nhật ký", "Log") }
    ]},
    { phase: B("KẾT LUẬN", "CONCLUDE"), icon: "✅", items: [
      { t: B("Điểm không đạt: nắn theo quy trình + đo lại 100%, hoặc NCR", "Failures: straighten + re-measure, or NCR"), ref: "EN 1090-2 12.3" },
      { t: B("Dimensional report in + ký (kèm trích dẫn điều khoản)", "Report signed with citations"), ref: B("🖨 nút In", "Print") },
      { t: B("Đạt → bàn giao Ráp thử / Coating; mark còn rõ", "Release to next stage; marks legible"), ref: B("Quy trình", "Flow") }
    ]}
  ];

  window.QD_DATA = { STEPS, RULES, CHECKLIST };
})();
