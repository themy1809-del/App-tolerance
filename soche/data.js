/* ============================================================================
   MODULE QC SƠ CHẾ — cắt / vát mép / nắn / khoan lỗ (trước gá hàn)
   ĐÃ XÁC MINH từ PDF: EN 1090-2:2018+A1:2024 — 6.4.3 + Table 9 (chất lượng
   mặt cắt theo EXC), 6.4.4 (độ cứng mép ≤450 HV10), 6.6 + Table 11 (khe hở lỗ).
   Công thức dải ISO 9013:2017 (u, Rz5 theo chiều dày): THAM KHẢO — chưa có PDF.
   ============================================================================ */
(function () {
  const B = (vi, en) => ({ vi, en });
  const num = v => (isFinite(v) ? Math.round(v * 100) / 100 : v);

  /* ISO 9013 — công thức giới hạn theo dải (a = chiều dày cắt, mm) */
  const U_RANGE = { 1: a => 0.05 + 0.003 * a, 2: a => 0.15 + 0.007 * a, 3: a => 0.4 + 0.01 * a, 4: a => 0.8 + 0.02 * a, 5: a => 1.2 + 0.035 * a };
  const RZ_RANGE = { 1: a => 10 + 0.6 * a, 2: a => 40 + 0.8 * a, 3: a => 70 + 1.2 * a, 4: a => 110 + 1.8 * a };
  /* EN 1090-2 Table 9 (đã xác minh): EXC2 → u Range 5, Rz5 Range 4 · EXC3/4 → u Range 4, Rz5 Range 4 */
  const EXC_CUT = { 2: { u: 5, rz: 4 }, 3: { u: 4, rz: 4 }, 4: { u: 4, rz: 4 } };
  /* EN 1090-2 Table 11 (đã xác minh): khe hở danh nghĩa lỗ tròn thường */
  function holeClearance(d) { return d <= 14 ? 1 : (d <= 24 ? 2 : 3); }

  const STEPS = [
    { t: B("Nhận diện & truy xuất vật liệu", "Material traceability"), d: B("Trước khi cắt: kiểm mác thép + heat number đúng phiếu; SANG SỐ (chuyển mark) sang từng phôi trước khi tách tấm — mất truy xuất là lỗi hệ thống nặng.", "Verify grade + heat no.; transfer marks BEFORE cutting."), tool: B("Phiếu cắt + bút sơn/đột số", "Cut list + marker/stamp") },
    { t: B("Kiểm máy & thông số cắt", "Machine & parameters"), d: B("Plasma/oxy/laser: đúng chương trình nesting (đã cộng kerf + lượng dư co rút), khí đúng áp, mũi cắt không mòn.", "Correct nesting (kerf + shrink allowance), gas pressure, nozzle condition."), tool: B("Module Lượng dư → kerf", "Allowance module") },
    { t: B("Cắt + kiểm mặt cắt", "Cut + inspect surfaces"), d: B("Mặt cắt nhiệt để làm MÉP TỰ DO phải đạt Table 9 theo EXC: vuông góc u + độ nhám Rz5 (calculator tab Kiểm tra); sạch xỉ bám (dross); không khía sâu.", "Free edges per Table 9 (u, Rz5 by EXC); dross removed; no deep notches."), tool: B("Thước vuông + thước lá; so mẫu nhám", "Square + feeler; roughness comparator") },
    { t: B("Độ cứng mép cắt (thép ≤ S460)", "Edge hardness"), d: B("Mép tự do ≤ 450 HV10 — quy trình cắt phải được kiểm năng lực (4 mẫu × 4 điểm đo); cứng quá → gia nhiệt trước khi cắt hoặc mài bỏ lớp cứng.", "≤450 HV10; verify process capability; preheat or grind if exceeded."), tool: B("Máy đo độ cứng (kiểm năng lực định kỳ)", "Hardness tester") },
    { t: B("Vát mép theo WPS", "Bevel per WPS"), d: B("Góc vát + root face đúng WPS (dung sai fit-up: góc +10°/−5°, root face ±2mm); mài sạch lớp cháy nếu spec yêu cầu.", "Angle + root face per WPS (fit-up tolerances apply)."), tool: B("Dưỡng góc → kiểm tiếp ở QC Fit-up", "Bevel gauge → Fit-up module") },
    { t: B("Khoan/đột lỗ", "Holing"), d: B("Đường kính lỗ = d bu lông + khe hở Table 11 (M12-14: +1 · M16-24: +2 · M27+: +3mm); vị trí nhóm lỗ theo bản vẽ; mép lỗ sạch bavia; đột chỉ trong phạm vi cho phép theo EXC/chiều dày.", "Hole dia = bolt + Table 11 clearance; deburred; punching limits per EXC."), tool: B("Calculator lỗ ở tab Kiểm tra + thước cặp", "Hole calculator + caliper") },
    { t: B("Nắn thẳng / nắn phẳng", "Straightening"), d: B("Nắn cơ/nhiệt sau cắt nếu cong vênh; nhiệt độ nắn nóng theo mác thép (thường ≤650°C thép thường — theo quy trình); kiểm độ thẳng theo class trong module Dung sai.", "Mechanical/flame straightening per procedure; check straightness in Tolerance module."), tool: B("Dây căng/máy thủy bình → module Dung sai", "Line/level → Tolerance module") },
    { t: B("Bàn giao sang gá", "Release to fit-up"), d: B("Phôi đủ mark truy xuất, kích thước blank trong dung sai (đã gồm lượng dư), mép đạt → chuyển QC Fit-up; ghi nhật ký.", "Marked, in-tolerance blanks → Fit-up; log results."), tool: B("☑️ Checklist + Nhật ký QC", "Checklist + QC Log") }
  ];

  const RULES = [
    {
      id: "sc_u",
      title: B("Vuông góc mặt cắt u — Table 9 + ISO 9013", "Cut squareness u"),
      criteria: B("Mép tự do (không hàn tiếp): EXC2 → u Range 5; EXC3/4 → u Range 4 (EN 1090-2 Table 9 — đã xác minh). Giới hạn theo chiều dày a: Range 4: u ≤ 0.8+0.02a · Range 5: u ≤ 1.2+0.035a (mm — công thức ISO 9013, tham khảo).",
        "Free edges: EXC2 → Range 5; EXC3/4 → Range 4. Range 4: ≤0.8+0.02a; Range 5: ≤1.2+0.035a."),
      measure: B("Áp thước vuông vào mặt tấm, đo khe lớn nhất giữa thước và mặt cắt bằng thước lá, tại điểm đại diện (vùng xấu nhất).", "Square against face; feeler max gap at representative (worst) spot."),
      quote: "Table 9 — Quality of the cut surfaces: EXC2: u Range 5, Rz5 Range 4; EXC3 and EXC4: u Range 4, Rz5 Range 4. — EN 1090-2:2018+A1:2024 (đã xác minh)",
      calc: {
        inputs: [
          { k: "exc", label: B("EXC (2/3/4)", "EXC"), def: 2 },
          { k: "a", label: B("Chiều dày cắt a (mm)", "Cut thickness (mm)"), def: 20 },
          { k: "u", label: B("u đo được (mm)", "Measured u (mm)"), def: 1.2 }
        ],
        evaluate(v) {
          const cfg = EXC_CUT[Math.round(v.exc)] || EXC_CUT[2];
          const lim = U_RANGE[cfg.u](v.a);
          return { limitText: `EXC${Math.round(v.exc)} → u Range ${cfg.u}: ≤ ${num(lim)} mm (a=${v.a})`, detail: `Đo ${v.u} mm`, pass: v.u <= lim };
        }
      }
    },
    {
      id: "sc_rz",
      title: B("Độ nhám mặt cắt Rz5 — Table 9 + ISO 9013", "Cut roughness Rz5"),
      criteria: B("EXC2/3/4 → Rz5 Range 4: Rz5 ≤ 110 + 1.8a (µm) — công thức ISO 9013 (tham khảo); hiện trường thường so bằng mẫu chuẩn nhám.",
        "Range 4: Rz5 ≤ 110 + 1.8a µm; field check by comparator."),
      measure: B("So mẫu chuẩn (comparator) hoặc máy đo nhám cầm tay trên đoạn giữa chiều dày.", "Comparator or portable tester at mid-thickness."),
      quote: "Table 9: Rz5 Range 4 cho EXC2/3/4 — EN 1090-2 (đã xác minh); công thức dải theo ISO 9013:2017 (tham khảo)",
      calc: {
        inputs: [
          { k: "a", label: B("Chiều dày cắt a (mm)", "Thickness (mm)"), def: 20 },
          { k: "rz", label: B("Rz5 đo được (µm)", "Measured Rz5 (µm)"), def: 120 }
        ],
        evaluate(v) {
          const lim = RZ_RANGE[4](v.a);
          return { limitText: `Range 4: Rz5 ≤ ${num(lim)} µm (a=${v.a})`, detail: `Đo ${v.rz} µm`, pass: v.rz <= lim };
        }
      }
    },
    {
      id: "sc_hv",
      title: B("Độ cứng mép tự do — 6.4.4", "Free-edge hardness"),
      criteria: B("Thép carbon ≤ S460: độ cứng mép tự do ≤ 450 HV10. Kiểm NĂNG LỰC quy trình (4 mẫu × 4 điểm) chứ không đo từng mép; quá cứng → gia nhiệt trước cắt hoặc mài bỏ lớp cứng.",
        "≤450 HV10 for ≤S460; capability check 4 samples × 4 tests; preheat or machine off if exceeded."),
      measure: B("Máy đo HV10 theo EN ISO 6507 tại các vị trí dễ biến cứng (góc, điểm bắt lửa).", "HV10 per EN ISO 6507 at susceptible spots."),
      quote: "For carbon steels ≤ S460 the hardness of free edge surfaces shall be no more than 450 (HV10)... four samples... four local hardness tests... — EN 1090-2, 6.4.4 (đã xác minh)",
      calc: {
        inputs: [{ k: "hv", label: B("HV10 đo được", "Measured HV10"), def: 380 }],
        evaluate(v) { return { limitText: "≤ 450 HV10", detail: `Đo ${v.hv} HV10`, pass: v.hv <= 450 }; }
      }
    },
    {
      id: "sc_hole",
      title: B("Đường kính lỗ bu lông — Table 11", "Bolt hole diameter"),
      criteria: B("Lỗ tròn thường: đường kính danh nghĩa = d bu lông + khe hở: M12–14: +1mm · M16–24: +2mm · M27 trở lên: +3mm (đã xác minh). Tháp/cột anten: giảm 0.5mm. Lỗ oversize/slotted theo bảng riêng.",
        "Normal round holes: clearance +1 (M12-14), +2 (M16-24), +3 (M27+)."),
      measure: B("Thước cặp đo 2 phương vuông góc; lỗ phải tròn đều, sạch bavia, không cháy loang (cắt nhiệt lỗ chỉ khi được phép).", "Caliper in 2 directions; round, deburred."),
      quote: "Table 11 — Nominal clearances: Normal round holes: 1 mm (d ≤ 14), 2 mm (16–24), 3 mm (≥ 27). — EN 1090-2 (đã xác minh)",
      calc: {
        inputs: [
          { k: "d", label: B("Đường kính bu lông d (mm)", "Bolt dia (mm)"), def: 20 },
          { k: "m", label: B("Đường kính lỗ đo (mm)", "Measured hole (mm)"), def: 22.3 }
        ],
        evaluate(v) {
          const nom = v.d + holeClearance(v.d);
          const dev = v.m - nom;
          /* dung sai gia công lỗ: theo ISO 286 H13 thực hành; ở đây so danh nghĩa +0.5/-0 thực dụng */
          return { limitText: `Lỗ danh nghĩa = ${v.d} + ${holeClearance(v.d)} = ${nom} mm (chấp nhận thực hành: ${nom} ÷ ${nom + 0.5} mm)`, detail: `Đo ${v.m} mm (lệch ${num(dev)})`, pass: v.m >= nom - 0.01 && v.m <= nom + 0.5 };
        }
      }
    }
  ];

  const CHECKLIST = [
    { phase: B("TRƯỚC KHI CẮT", "BEFORE CUTTING"), icon: "📋", items: [
      { t: B("Mác thép + heat number khớp phiếu cắt; sang số truy xuất sang từng phôi", "Grade/heat verified; marks transferred"), ref: "EN 1090-2 6.2" },
      { t: B("Nesting đã cộng kerf + lượng dư co rút/gia công", "Nesting includes kerf + allowances"), ref: B("Module Lượng dư", "Allowance module") },
      { t: B("Máy cắt: mũi/bép đạt, khí đúng áp, chương trình đúng rev bản vẽ", "Machine ready, correct program rev"), ref: B("Quy trình máy", "Machine procedure") }
    ]},
    { phase: B("SAU CẮT / VÁT / LỖ", "AFTER CUT / BEVEL / HOLES"), icon: "✂️", items: [
      { t: B("Mặt cắt đạt u + Rz5 theo EXC (calculator); sạch dross, không khía sâu", "Cut surfaces per Table 9; dross-free"), ref: "EN 1090-2 Table 9" },
      { t: B("Kích thước blank đúng phiếu (đã gồm lượng dư)", "Blank dims per cut list"), ref: B("Phiếu cắt", "Cut list") },
      { t: B("Vát mép: góc + root face theo WPS", "Bevel per WPS"), ref: B("WPS / QC Fit-up", "WPS") },
      { t: B("Lỗ: đường kính = d + khe hở Table 11, vị trí đúng bản vẽ, sạch bavia", "Holes per Table 11, positions per drawing"), ref: "EN 1090-2 Table 11" },
      { t: B("Độ cứng mép trong năng lực quy trình đã kiểm (≤450 HV10)", "Hardness within verified capability"), ref: "EN 1090-2 6.4.4" }
    ]},
    { phase: B("NẮN & BÀN GIAO", "STRAIGHTEN & RELEASE"), icon: "✅", items: [
      { t: B("Nắn thẳng/phẳng đạt class (đo trong module Dung sai); nắn nóng đúng nhiệt độ quy trình", "Straightness per class; flame temp per procedure"), ref: B("Module Dung sai", "Tolerance module") },
      { t: B("Mark truy xuất còn rõ sau toàn bộ sơ chế", "Marks legible after processing"), ref: "EN 1090-2 6.2" },
      { t: B("Lưu kết quả vào Nhật ký QC; phôi lỗi cách ly + NCR", "Log results; quarantine + NCR for rejects"), ref: B("Nhật ký / NCR", "Log / NCR") }
    ]}
  ];

  window.SC_DATA = { STEPS, RULES, CHECKLIST };
})();
