/* ============================================================================
   MODULE BU LÔNG — LIÊN KẾT BU LÔNG KẾT CẤU THÉP
   v1.0 — Nguồn ĐÃ XÁC MINH từ PDF gốc:
   EN 1090-2:2018+A1:2024, Clause 8 (Tables 18–21) + 12.5
   Tham khảo bổ sung: EN 14399 (HR/HRC/HV), EN 15048, ASTM F3125/RCSC.
   ============================================================================ */
(function () {
  const B = (vi, en) => ({ vi, en });

  /* Table 18 — Fp,C [kN] (đã xác minh nguyên văn) */
  const DIA = [12, 14, 16, 18, 20, 22, 24, 27, 30, 36];
  const FPC = {
    "8.8":  { 12: 47, 14: 65, 16: 88, 18: 108, 20: 137, 22: 170, 24: 198, 27: 257, 30: 314, 36: 458 },
    "10.9": { 12: 59, 14: 81, 16: 110, 18: 134, 20: 172, 22: 212, 24: 247, 27: 321, 30: 393, 36: 572 }
  };
  /* Table 20 — 0,75·Mr,1 [Nm] bước 1 combined (đã xác minh nguyên văn) */
  const M75 = {
    "8.8":  { 12: 53, 14: 85, 16: 132, 18: 182, 20: 258, 22: 351, 24: 446, 27: 652, 30: 886, 36: 1548 },
    "10.9": { 12: 67, 14: 106, 16: 165, 18: 227, 20: 322, 22: 439, 24: 557, 27: 815, 30: 1107, 36: 1935 }
  };

  const METHODS = [
    {
      id: "torque", name: B("Phương pháp Momen (Torque method)", "Torque method"), kclass: "K2",
      how: B("2 bước, momen tăng liên tục & êm: Bước 1 — đặt cờ lê ở ~0.75·Mr,2, xong TOÀN BỘ bu lông trong liên kết rồi mới sang bước 2. Bước 2 — đặt cờ lê ở 1.10·Mr,2. Trong đó Mr,2 = km·d·Fp,C với km theo k-class K2 do nhà sản xuất công bố.",
        "2 steps, smooth continuous torque: Step 1 — ~0.75·Mr,2 for ALL bolts in the connection; Step 2 — 1.10·Mr,2. Mr,2 = km·d·Fp,C with km per declared k-class K2."),
      note: B("Cờ lê lực chính xác ±4% (EN ISO 6789), kiểm mỗi lần đổi chiều dài ống hơi và sau sự cố (rơi, va đập, quá tải). Được dùng súng xung (impact) cho bước 1.",
        "Torque wrench ±4% (EN ISO 6789); check after incidents & air-hose change. Impact wrench allowed for step 1 only."),
      quote: "a) a first tightening step: the wrench shall be set to a torque value of about 0,75 Mr,i... b) a second tightening step: the wrench shall be set to a torque value of 1,10 Mr,i. — EN 1090-2, 8.5.3"
    },
    {
      id: "combined", name: B("Phương pháp Kết hợp (Combined method)", "Combined method"), kclass: "K2 hoặc K1",
      how: B("Bước 1 — xiết momen ~0.75·Mr,1 (đơn giản hóa: 0.094·d·Fp,C — tra Table 20), xong toàn bộ bu lông trong liên kết. ĐÁNH DẤU vị trí đai ốc so với ren bằng bút/sơn. Bước 2 — xoay thêm đai ốc theo Table 21: Σt < 2d → 60° (1/6 vòng) · 2d ≤ Σt < 6d → 90° (1/4 vòng) · 6d ≤ Σt ≤ 10d → 120° (1/3 vòng).",
        "Step 1 — torque ~0.75·Mr,1 (simplified 0.094·d·Fp,C, Table 20) for all bolts; MARK nut position. Step 2 — additional rotation per Table 21: Σt<2d→60°; 2d≤Σt<6d→90°; 6d≤Σt≤10d→120°."),
      note: B("Σt = tổng chiều dày các bản ghép kể cả đệm. Cờ lê bước 1 chỉ cần ±10%, kiểm định hằng năm. Mặt tựa không vuông góc trục bu lông → góc xoay phải xác định bằng thí nghiệm.",
        "Σt = total grip incl. washers. Step-1 wrench ±10%, yearly check. Non-perpendicular bearing surfaces → determine rotation by test."),
      quote: "Table 21 — Additional rotation for the second step in the combined method (8.8 and 10.9 bolts): t < 2d → 60° (1/6); 2d ≤ t < 6d → 90° (1/4); 6d ≤ t ≤ 10d → 120° (1/3). — EN 1090-2, 8.5.4"
    },
    {
      id: "hrc", name: B("Phương pháp HRC (bu lông đứt chuôi — TC bolt)", "HRC method (tension control bolt)"), kclass: "K0 (đai ốc HRD) hoặc K2",
      how: B("Dùng súng chuyên dụng 2 đầu khẩu đồng trục: khẩu ngoài vặn đai ốc, khẩu trong giữ chuôi spline. Bước 1 — xiết tới khi khẩu ngoài ngừng quay (lặp lại nếu spec yêu cầu), xong toàn bộ bu lông trong liên kết. Bước 2 — xiết tiếp tới khi CHUÔI SPLINE ĐỨT tại cổ đứt (break-neck) → đạt lực căng.",
        "Special shear wrench with 2 co-axial sockets. Step 1 — until outer socket stops; complete all bolts. Step 2 — until spline end SHEARS OFF at break-neck → preload achieved."),
      note: B("Thiết bị KHÔNG cần hiệu chuẩn — lực căng do chính bu lông kiểm soát (hình học cổ đứt + bôi trơn xuất xưởng). Không đủ chỗ thao tác súng → chuyển sang torque method với k-class K2 hoặc DTI.",
        "No equipment calibration — preload controlled by bolt itself. No access → fall back to torque method (K2 info) or DTI."),
      quote: "The bolting assembly installation is complete when the spline end shears off at the break-neck section. — EN 1090-2, 8.5.5"
    },
    {
      id: "dti", name: B("Vòng đệm báo lực DTI (Direct Tension Indicator)", "Direct tension indicator (DTI)"), kclass: "K2, K1 hoặc K0",
      how: B("Vòng đệm có vấu lồi (EN 14399-9) đặt dưới đầu bu lông hoặc đai ốc. Xiết tới khi khe hở vấu giảm về mức quy định — kiểm bằng THƯỚC LÁ theo hướng dẫn EN 14399-9: số khe từ chối thước lá phải đạt số lượng quy định.",
        "Protrusion washer (EN 14399-9) under head or nut. Tighten until protrusion gap reduces to specified value — verify with FEELER GAUGE per EN 14399-9."),
      note: B("Phối hợp đệm/đai ốc đúng cấu hình EN 14399-9. Phù hợp khi không kiểm soát được momen (ma sát thay đổi).",
        "Correct washer/nut configuration per EN 14399-9. Suitable where torque control unreliable."),
      quote: "EN 1090-2, 8.5.6 + EN 14399-9"
    }
  ];

  const RULES = [
    { t: B("Lực căng tối thiểu danh nghĩa Fp,C = 0.7·fub·As", "Nominal minimum preload Fp,C = 0.7·fub·As"),
      d: B("Áp dụng cho mọi liên kết chống trượt và liên kết dự ứng lực khác trừ khi spec nêu mức thấp hơn (khi đó phải nêu rõ bộ bu lông, phương pháp xiết, thông số và yêu cầu kiểm tra).", "For all slip-resistant and other preloaded connections unless lower level specified."),
      ref: "EN 1090-2, 8.5.1 + Table 18" },
    { t: B("Trước khi căng: khe hở dư ≤ 2mm", "Before preloading: residual gap ≤ 2mm"),
      d: B("Các bản ghép phải áp khít theo 8.3 (snug-tight); khe hở dư tối đa 2mm, phải xử lý cấu kiện nếu vượt.", "Components fitted snug-tight per 8.3; residual gap limited to 2mm."),
      ref: "EN 1090-2, 8.5.1" },
    { t: B("Xiết bằng cách XOAY ĐAI ỐC; trình tự từ chỗ cứng → chỗ mềm", "Tighten by NUT rotation; sequence rigid → least rigid"),
      d: B("Chỉ xoay đầu bu lông khi không tiếp cận được đai ốc (cần biện pháp bổ sung/hiệu chuẩn Annex H). Cả 2 bước đều đi từ phần cứng nhất của liên kết ra phần mềm nhất; có thể cần hơn 1 vòng lặp để đều lực.", "Rotate bolt head only if nut inaccessible. Both steps progress from most rigid part; more than one cycle may be needed."),
      ref: "EN 1090-2, 8.5.1" },
    { t: B("Bu lông đã căng đủ lực rồi tháo ra → LOẠI BỎ cả bộ", "Assembly tightened to min preload then un-tightened → DISCARD"),
      d: B("Không tái sử dụng. Bu lông chỉ dùng gá lắp (chưa căng đủ Fp,C) vẫn dùng được tại vị trí đó.", "No reuse. Fit-up bolts not tightened to Fp,C remain usable in place."),
      ref: "EN 1090-2, 8.5.1" },
    { t: B("Không thay đổi bôi trơn xuất xưởng", "No alteration to as-delivered lubrication"),
      d: B("Trừ khi dùng DTI hoặc hiệu chuẩn Annex H. Trì hoãn xiết trong điều kiện không kiểm soát → phải kiểm tra lại tình trạng bôi trơn.", "Unless DTI or Annex H. Delayed tightening in uncontrolled exposure → re-check lubrication."),
      ref: "EN 1090-2, 8.5.1" },
    { t: B("Bu lông KHÔNG dự ứng lực: xiết snug-tight", "Non-preloaded bolts: snug-tight"),
      d: B("Đủ chặt bằng sức người với cờ lê thường hoặc điểm súng xung bắt đầu dội — cẩn thận tránh xiết quá bu lông ngắn và M12; đi từ phần cứng nhất, có thể cần hơn 1 lượt.", "Firmly drawn together; avoid over-tightening short bolts/M12; from most rigid part, may need more than one cycle."),
      ref: "EN 1090-2, 8.3" },
    { t: B("Chiều dài bu lông: ren nhô khỏi đai ốc + ren trong chiều dài kẹp theo 8.2.2", "Bolt length: protrusion & thread engagement per 8.2.2"),
      d: B("Sau khi xiết, đầu bu lông phải nhô tối thiểu 1 bước ren ngoài mặt đai ốc; số ren tự do trong chiều dài kẹp theo loại liên kết (chịu cắt/dự ứng lực) — xem 8.2.2.", "After tightening: ≥ 1 full thread beyond nut face; free threads in grip per connection type — see 8.2.2."),
      ref: "EN 1090-2, 8.2.2" }
  ];

  const INSPECT = [
    { t: B("Trước xiết: kiểm bộ bu lông + chứng chỉ", "Before: assemblies + certificates"),
      d: B("Đúng hệ (HR/HV/HRC theo EN 14399, SB theo EN 15048), đúng k-class cho phương pháp xiết (Table 19), CoC nhà sản xuất, bảo quản khô + nguyên bôi trơn, đai ốc quay trơn tay (kiểm xác suất).", "Correct system & k-class (Table 19), manufacturer CoC, dry storage with original lube, free-running nut sample check.") },
    { t: B("Trong xiết: đúng quy trình 2 bước + trình tự", "During: 2-step process + sequence"),
      d: B("Bước 1 xong toàn bộ liên kết mới sang bước 2; combined: kiểm vạch dấu trước khi xoay thêm; ghi thông số cờ lê + tem hiệu chuẩn còn hạn.", "Step 1 completed for whole connection before step 2; combined: marking checked; wrench settings + calibration recorded.") },
    { t: B("Sau xiết: kiểm tra theo 12.5.2 (EXC2/3/4)", "After: inspection per 12.5.2 (EXC2/3/4)"),
      d: B("Kiểm ngoại quan 100% (đủ bu lông, ren nhô, đệm đúng); kiểm lực/momen theo phương án lấy mẫu tuần tự Annex M cho số liên kết quy định theo EXC; HRC: 100% chuôi đã đứt; DTI: kiểm thước lá theo EN 14399-9; combined: kiểm vạch dấu góc xoay.", "100% visual; preload checks per sequential sampling (Annex M) by EXC; HRC: 100% spline sheared; DTI: feeler gauge; combined: rotation marks.") },
    { t: B("Xử lý không đạt", "Non-conformance"),
      d: B("Xiết thiếu → xiết bổ sung đúng phương pháp; quá lực/đã tháo sau căng → thay cả bộ; ghi NCR và kiểm mở rộng theo phương án lấy mẫu.", "Under-tightened → re-tighten; over/un-tightened → replace assembly; NCR + extended sampling.") }
  ];

  const MATERIALS = [
    { t: "EN 14399-3 / -7 (HR)", d: B("Bộ bu lông dự ứng lực hệ HR (8.8/10.9) — đầu lục giác / đầu chìm; dùng với đệm theo -5/-6.", "HR system preloading assemblies (8.8/10.9).") },
    { t: "EN 14399-4 / -8 (HV)", d: B("Hệ HV 10.9 (phổ biến ở Đức/EU) — chú ý quy tắc đệm và chiều dài ren khác hệ HR.", "HV system 10.9 — different washer/thread rules vs HR.") },
    { t: "EN 14399-10 (HRC)", d: B("Bu lông đứt chuôi (tension control) k-class K0/K2 — xiết bằng súng shear wrench.", "Tension-control (HRC) assemblies K0/K2.") },
    { t: "EN 14399-9 (DTI)", d: B("Vòng đệm báo lực kiểu vấu nén.", "Compressible direct tension indicators.") },
    { t: "EN 15048 (SB)", d: B("Bộ bu lông KHÔNG dự ứng lực (structural bolting SB) — chỉ xiết snug-tight.", "Non-preloaded structural bolting (SB).") },
    { t: "ASTM F3125", d: B("Dự án chuẩn Mỹ: gộp A325/A490 (Gr. A325 ≈ 8.8, A490 ≈ 10.9); xiết theo RCSC — turn-of-nut, DTI, TC bolt, calibrated wrench. KHÔNG trộn lẫn hệ EN và ASTM trong cùng liên kết.", "US projects: F3125 Gr. A325/A490 per RCSC. Do not mix EN & ASTM systems in one joint.") }
  ];

  const CHECKLIST = [
    { phase: B("TRƯỚC KHI XIẾT", "BEFORE"), icon: "📋", items: [
      { t: B("Bộ bu lông đồng bộ (bu lông + đai ốc + đệm cùng nhà sản xuất, cùng lô), đúng hệ và k-class theo phương pháp xiết (Table 19)", "Matched assemblies, correct system & k-class (Table 19)"), ref: "EN 1090-2 8.5.1, Table 19 / EN 14399-1" },
      { t: B("CoC/DoP nhà sản xuất, km công bố (K2), hạn dùng bôi trơn; bảo quản khô, không rỉ, không bụi bẩn", "CoC, declared km (K2), lubrication intact; dry storage"), ref: "EN 14399 / EN 1090-2 8.1" },
      { t: B("Lỗ bu lông đúng dung sai (EN 1090-2 Table 11); bề mặt ma sát đúng cấp xử lý nếu liên kết chống trượt", "Holes per Table 11; faying surfaces per slip class"), ref: "EN 1090-2 6.6 / 8.4" },
      { t: B("Bản ghép áp khít, khe hở dư ≤ 2mm trước khi căng", "Snug fit, residual gap ≤ 2mm"), ref: "EN 1090-2 8.5.1" },
      { t: B("Cờ lê lực: tem hiệu chuẩn còn hạn, ±4% (torque) / ±10% (bước 1 combined)", "Wrench calibration ±4% / ±10%"), ref: "EN 1090-2 8.5.1 / EN ISO 6789" }
    ]},
    { phase: B("TRONG KHI XIẾT", "DURING"), icon: "🔧", items: [
      { t: B("Xoay đai ốc (không xoay đầu bu lông trừ khi bất khả kháng + có biện pháp)", "Rotate nut (not head unless unavoidable)"), ref: "EN 1090-2 8.5.1" },
      { t: B("Trình tự: từ phần cứng nhất → mềm nhất; bước 1 xong TOÀN BỘ liên kết mới sang bước 2", "Sequence rigid → flexible; step 1 complete before step 2"), ref: "EN 1090-2 8.5.1/8.5.3" },
      { t: B("Combined: đánh dấu đai ốc/ren sau bước 1; xoay thêm đúng góc Table 21", "Combined: mark after step 1; rotate per Table 21"), ref: "EN 1090-2 8.5.4" },
      { t: B("Momen đúng giá trị: bước 1 ≈ 0.75·Mr,2 — bước 2 = 1.10·Mr,2 (torque method)", "Correct torque: 0.75/1.10·Mr,2"), ref: "EN 1090-2 8.5.3" },
      { t: B("Ghi nhật ký: liên kết, số bu lông, thiết bị, giá trị đặt, người xiết", "Log: joint, bolts, equipment, settings, operator"), ref: "EN 1090-2 Cl.12.5" }
    ]},
    { phase: B("SAU KHI XIẾT / NGHIỆM THU", "AFTER"), icon: "✅", items: [
      { t: B("Ngoại quan 100%: đủ bu lông, ren nhô ≥ 1 bước ren khỏi đai ốc, đệm đúng vị trí/chiều", "100% visual: complete, protrusion ≥ 1 thread, washers correct"), ref: "EN 1090-2 8.2.2 / 12.5.1" },
      { t: B("HRC: 100% chuôi spline đã đứt; DTI: kiểm khe vấu bằng thước lá; combined: kiểm vạch góc xoay", "HRC: 100% splines sheared; DTI: feeler gauge; combined: rotation marks"), ref: "EN 1090-2 12.5.2" },
      { t: B("Kiểm lực/momen xác suất theo phương án lấy mẫu tuần tự (Annex M) theo EXC", "Preload sampling per Annex M by EXC"), ref: "EN 1090-2 12.5.2" },
      { t: B("Bu lông đã căng bị tháo → loại bỏ cả bộ, thay mới", "Un-tightened after preload → discard assembly"), ref: "EN 1090-2 8.5.1" },
      { t: B("Hồ sơ: báo cáo xiết + kiểm tra, chứng chỉ thiết bị, CoC bu lông, NCR nếu có", "Records: tightening + inspection reports, certs, NCR"), ref: "EN 1090-2 Cl.12" }
    ]}
  ];

  /* ===== HỆ MỸ — AISC 360 Table J3.1/J3.1M + RCSC =====
     Tb = lực căng tối thiểu (0.7 Fu·As làm tròn). THAM KHẢO — đối chiếu
     AISC 360/RCSC bản gốc trước khi nghiệm thu chính thức (chưa có PDF trong dự án). */
  const AISC = {
    soft: true,
    metricDia: [16, 20, 22, 24, 27, 30, 36],
    Tb_M: { /* kN — AISC Table J3.1M */
      A325M: { 16: 91, 20: 142, 22: 176, 24: 205, 27: 267, 30: 326, 36: 475 },
      A490M: { 16: 114, 20: 179, 22: 221, 24: 257, 27: 334, 30: 408, 36: 595 }
    },
    impDia: ['1/2"', '5/8"', '3/4"', '7/8"', '1"', '1-1/8"', '1-1/4"', '1-3/8"', '1-1/2"'],
    Tb_I: { /* kips — AISC Table J3.1 */
      A325: [12, 19, 28, 39, 51, 64, 81, 97, 118],
      A490: [15, 24, 35, 49, 64, 80, 102, 121, 148]
    },
    turnOfNut: [ /* RCSC Table 8.2 — cả 2 mặt vuông góc trục bu lông */
      { cond: B("Chiều dài bu lông L ≤ 4d", "Bolt length L ≤ 4d"), turn: B("1/3 vòng (120°)", "1/3 turn (120°)") },
      { cond: B("4d < L ≤ 8d", "4d < L ≤ 8d"), turn: B("1/2 vòng (180°)", "1/2 turn (180°)") },
      { cond: B("8d < L ≤ 12d", "8d < L ≤ 12d"), turn: B("2/3 vòng (240°)", "2/3 turn (240°)") }
    ],
    methods: [
      { n: B("Turn-of-nut (xoay đai ốc)", "Turn-of-nut"), d: B("Xiết snug-tight → đánh dấu → xoay thêm theo RCSC Table 8.2 (theo CHIỀU DÀI bu lông L/d — KHÁC EN dùng tổng chiều dày kẹp Σt). Dung sai góc: ±30° khi ≤ 1/2 vòng; ±45° khi > 1/2 vòng. Mặt nghiêng không đệm vát → tăng góc theo bảng.", "Snug → mark → rotate per RCSC Table 8.2 (based on bolt LENGTH — unlike EN's grip Σt). Tolerance ±30°/±45°.") },
      { n: B("Calibrated wrench (cờ lê hiệu chuẩn)", "Calibrated wrench"), d: B("Hiệu chuẩn HẰNG NGÀY bằng thiết bị đo lực (Skidmore-Wilhelm) với ≥ 3 bu lông mỗi lô: momen đặt phải cho lực ≥ 1.05×Tb. KHÔNG dùng bảng momen in sẵn/công thức chung — RCSC cấm.", "DAILY calibration with tension calibrator, ≥3 bolts/lot, wrench set ≥1.05×Tb. Published torque tables prohibited by RCSC.") },
      { n: B("Twist-off (TC bolt — F1852/F2280)", "Twist-off tension-control"), d: B("Tương đương HRC của EN: xiết tới khi đứt chuôi spline. Kiểm tra trước lắp (pre-installation verification) 3 bộ/lô trong thiết bị đo lực.", "Equivalent to EN HRC: tighten until spline shears. Pre-installation verification 3/lot.") },
      { n: B("DTI (ASTM F959)", "Direct tension indicator (F959)"), d: B("Vòng đệm vấu — kiểm khe bằng thước lá; số khe từ chối theo số vấu của đệm.", "Protrusion washer — feeler gauge refusals per washer type.") }
    ],
    notes: B("Snug-tight theo RCSC = lực đủ ép khít các bản (vài nhát súng xung hoặc hết sức cờ lê thường). Mọi bu lông phải snug toàn liên kết trước khi căng. Pre-installation verification: 3 bộ/lô thử trong tension calibrator trước khi dùng.",
      "RCSC snug-tight = plies in firm contact. Snug whole joint before pretensioning. Pre-installation verification: 3 assemblies/lot in tension calibrator."),
    ref: "AISC 360 Table J3.1/J3.1M · RCSC Specification (2020) Section 8 · ASTM F3125"
  };

  window.BL_DATA = { DIA, FPC, M75, METHODS, RULES, INSPECT, MATERIALS, CHECKLIST, AISC,
    quotes: {
      fpc: "Unless otherwise specified, the nominal minimum preloading force Fp,C specified in Table 18 shall be taken as: Fp,C = 0,7 fub As — EN 1090-2, 8.5.1",
      t18: "Table 18 — Values of the nominal minimum preloading force Fp,C in [kN] — đã xác minh nguyên văn từ PDF",
      t19: "Table 19 — k-classes for tightening methods: Torque → K2; Combined → K2 or K1; HRC → K0 with HRD nut only or K2; DTI → K2, K1 or K0",
      t20: "Table 20 — Torque moment 0,75 Mr,1 [Nm] for the first step in the combined method — đã xác minh nguyên văn",
      t21: "Table 21 — Additional rotation: t < 2d → 60° (1/6); 2d ≤ t < 6d → 90° (1/4); 6d ≤ t ≤ 10d → 120° (1/3)"
    }
  };
})();
