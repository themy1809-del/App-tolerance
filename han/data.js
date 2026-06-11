/* ============================================================================
   MODULE HÀN — DỮ LIỆU KIỂM TRA MỐI HÀN (QC Welding)
   v1.0 — Nguồn đã xác minh từ bản gốc:
   - AWS D1.1/D1.1M:2020, Table 8.1 (Visual Inspection Acceptance Criteria, tr.239)
   - EN 1090-2:2018+A1:2024, 7.6.1 (mức chất lượng ISO 5817 theo EXC),
     Table 23 (hold time), Table 24 (phạm vi NDT bổ sung)
   - EN ISO 5817:2023, Table 1 (mức B/C/D)
   - JASS 6 (tham khảo thực hành Nhật)
   Cách thêm rule mới: copy 1 object trong WELD_VT, sửa id/std/title/criteria,
   thêm calc nếu cần (inputs[] + evaluate(vals) trả {limitText, pass}).
   ============================================================================ */
(function () {
  const B = (vi, en) => ({ vi, en });

  /* ---------- 1. TIÊU CHUẨN ---------- */
  const STDS = [
    { code: "AWS D1.1:2020", region: "US", title: B("Quy phạm hàn kết cấu — Thép", "Structural Welding Code — Steel") },
    { code: "ISO 5817:2023", region: "ISO", title: B("Mức chất lượng khuyết tật mối hàn (B/C/D)", "Quality levels for imperfections (B/C/D)") },
    { code: "EN 1090-2:2018+A1:2024", region: "EU", title: B("Thi công kết cấu thép — Yêu cầu kỹ thuật", "Execution of steel structures") },
    { code: "JASS 6", region: "JP", title: B("Tiêu chuẩn kiến trúc Nhật — Công tác thép", "Japanese Architectural Standard — Steel Work") }
  ];

  /* ---------- 2. MAP EXC -> ISO 5817 (EN 1090-2, 7.6.1 — đã xác minh) ---------- */
  const EXC_MAP = {
    note: B("EN 1090-2:2018+A1:2024, mục 7.6.1 — không xét 'Incorrect toe' (505) và 'Micro lack of fusion' (401).",
      "EN 1090-2:2018+A1:2024, 7.6.1 — 'Incorrect toe' (505) and 'Micro lack of fusion' (401) are not taken into account."),
    rows: [
      { exc: "EXC1", level: "D", extra: B("", "") },
      { exc: "EXC2", level: "C", extra: B("Riêng Overlap (506), Stray arc (601), End crater pipe (2025): cho phép mức D", "Level D allowed for Overlap (506), Stray arc (601), End crater pipe (2025)") },
      { exc: "EXC3", level: "B", extra: B("", "") },
      { exc: "EXC4", level: "B+", extra: B("Tối thiểu như EXC3, kèm yêu cầu bổ sung cho mối hàn được chỉ định", "EXC3 minimum plus additional requirements for identified welds") }
    ],
    quote: "a) EXC1 quality level D; b) EXC2 quality level C except quality level D for 'Overlap' (506), 'Stray arc' (601) and 'End crater pipe' (2025); c) EXC3 quality level B. For EXC4 the weld shall meet the requirements of EXC3 as a minimum."
  };

  /* ---------- 3. KIỂM TRA NGOẠI QUAN (VT) ----------
     group: CRACK | UNDERCUT | POROSITY | PROFILE | SIZE | FUSION | OTHER  */
  const num = v => (isFinite(v) ? Math.round(v * 100) / 100 : v);

  const WELD_VT = [
    /* ========== AWS D1.1:2020 — Table 8.1 (đã xác minh nguyên văn) ========== */
    {
      id: "aws_crack", std: "AWS D1.1:2020", group: "CRACK", load: B("Tĩnh + Mỏi", "Static + Cyclic"),
      title: B("(1) Nứt — cấm tuyệt đối", "(1) Crack prohibition"),
      criteria: B("Mọi vết nứt đều KHÔNG CHẤP NHẬN, bất kể kích thước hay vị trí.",
        "Any crack shall be unacceptable, regardless of size or location."),
      acceptance: B("Không có nứt → ĐẠT. Có nứt (bất kỳ) → KHÔNG ĐẠT, phải xử lý theo 8.9 (loại bỏ + hàn lại + kiểm tra lại).",
        "No crack → PASS. Any crack → FAIL; repair per 8.9 then re-inspect."),
      clause: { ref: "AWS D1.1:2020, Table 8.1(1), p.239", quote: "Any crack shall be unacceptable, regardless of size or location." }
    },
    {
      id: "aws_fusion", std: "AWS D1.1:2020", group: "FUSION", load: B("Tĩnh + Mỏi", "Static + Cyclic"),
      title: B("(2) Ngấu giữa kim loại hàn / kim loại nền", "(2) Weld/base metal fusion"),
      criteria: B("Phải ngấu hoàn toàn giữa các lớp hàn kề nhau và giữa kim loại hàn với kim loại nền.",
        "Complete fusion shall exist between adjacent layers of weld metal and between weld metal and base metal."),
      acceptance: B("Quan sát không thấy thiếu ngấu bề mặt (cold lap, thiếu chảy mép) → ĐẠT.",
        "No visible lack of fusion at surface → PASS."),
      clause: { ref: "AWS D1.1:2020, Table 8.1(2), p.239", quote: "Complete fusion shall exist between adjacent layers of weld metal and between weld metal and base metal." }
    },
    {
      id: "aws_crater", std: "AWS D1.1:2020", group: "PROFILE", load: B("Tĩnh + Mỏi", "Static + Cyclic"),
      title: B("(3) Lõm cuối đường hàn (crater)", "(3) Crater cross section"),
      criteria: B("Mọi crater phải được điền đầy đủ kích thước mối hàn quy định — trừ đầu mút của mối hàn gián đoạn nằm ngoài chiều dài hiệu dụng.",
        "All craters shall be filled to provide the specified weld size, except ends of intermittent fillet welds outside their effective length."),
      acceptance: B("Crater được điền đầy (đủ size) → ĐẠT.", "Craters filled to specified size → PASS."),
      clause: { ref: "AWS D1.1:2020, Table 8.1(3), p.239", quote: "All craters shall be filled to provide the specified weld size, except for the ends of intermittent fillet welds outside of their effective length." }
    },
    {
      id: "aws_time", std: "AWS D1.1:2020", group: "OTHER", load: B("Tĩnh + Mỏi", "Static + Cyclic"),
      title: B("(5) Thời điểm kiểm tra VT", "(5) Time of inspection"),
      criteria: B("Kiểm tra ngay sau khi mối hàn nguội về nhiệt độ môi trường. RIÊNG thép ASTM A514, A517, A709 Gr.HPS 690W: phải kiểm tra KHÔNG SỚM HƠN 48 GIỜ sau khi hàn xong (nguy cơ nứt trễ do hydro).",
        "Inspection may begin after welds cool to ambient. For ASTM A514, A517, A709 HPS 690W: not less than 48 hours after completion (delayed hydrogen cracking)."),
      acceptance: B("Đúng thời điểm kiểm tra theo loại thép → kết quả VT có hiệu lực.", "Inspection timed per steel grade → VT valid."),
      clause: { ref: "AWS D1.1:2020, Table 8.1(5), p.239", quote: "Acceptance criteria for ASTM A514, A517, and A709 Grade HPS 100W [HPS 690W] steels shall be based on visual inspection performed not less than 48 hours after completion of the weld." }
    },
    {
      id: "aws_undersize", std: "AWS D1.1:2020", group: "SIZE", load: B("Tĩnh + Mỏi", "Static + Cyclic"),
      title: B("(6) Mối hàn góc thiếu kích thước", "(6) Undersized fillet welds"),
      criteria: B("Cho phép hụt size không cần sửa: size quy định L ≤ 5mm → hụt tối đa U = 2mm; L = 6mm → U = 2.5mm; L ≥ 8mm → U = 3mm. Phần hụt size không vượt quá 10% chiều dài mối hàn. Cấm hụt size tại 2 đầu mối hàn bụng–cánh dầm trong đoạn dài bằng 2 lần bề rộng cánh.",
        "Allowed undersize without correction: L ≤ 5mm → U ≤ 2mm; L = 6mm → U ≤ 2.5mm; L ≥ 8mm → U ≤ 3mm. Undersize portion ≤ 10% of weld length. Prohibited at girder web-to-flange weld ends for 2× flange width."),
      acceptance: B("Đo bằng thước hàn (fillet gauge): size đo ≥ L − U và tổng đoạn hụt ≤ 10% chiều dài → ĐẠT.",
        "Measured size ≥ L − U and undersize portion ≤ 10% of length → PASS."),
      clause: { ref: "AWS D1.1:2020, Table 8.1(6), p.239", quote: "L ≤ 3/16[5] → U ≤ 1/16[2]; 1/4[6] → 3/32[2.5]; ≥ 5/16[8] → 1/8[3]. In all cases, the undersize portion of the weld shall not exceed 10% of the weld length." },
      calc: {
        inputs: [
          { k: "L", label: B("Size quy định L (mm)", "Specified size L (mm)"), def: 6 },
          { k: "m", label: B("Size đo được (mm)", "Measured size (mm)"), def: 5.5 },
          { k: "pct", label: B("% chiều dài bị hụt size", "% of length undersized"), def: 5 }
        ],
        evaluate(v) {
          const U = v.L <= 5 ? 2 : (v.L <= 6 ? 2.5 : 3);
          const minOk = v.m >= v.L - U, lenOk = v.pct <= 10;
          return {
            limitText: `U cho phép = ${U} mm → size tối thiểu = ${num(v.L - U)} mm; đoạn hụt ≤ 10%`,
            detail: `Size đo ${v.m} mm ${minOk ? "≥" : "<"} ${num(v.L - U)} mm; đoạn hụt ${v.pct}% ${lenOk ? "≤" : ">"} 10%`,
            pass: minOk && lenOk
          };
        }
      }
    },
    {
      id: "aws_undercut_static", std: "AWS D1.1:2020", group: "UNDERCUT", load: B("Tĩnh", "Static"),
      title: B("(7A) Cháy chân — kết cấu chịu tải tĩnh", "(7A) Undercut — statically loaded"),
      criteria: B("Vật liệu dày t < 25mm: undercut ≤ 1mm; ngoại lệ cho phép ≤ 2mm với tổng chiều dài cộng dồn ≤ 50mm trong bất kỳ 300mm. Vật liệu t ≥ 25mm: undercut ≤ 2mm với mọi chiều dài.",
        "t < 25mm: undercut ≤ 1mm, except ≤ 2mm allowed for accumulated length up to 50mm in any 300mm. t ≥ 25mm: ≤ 2mm for any length."),
      acceptance: B("Đo bằng thước đo undercut (V-WAC/pit gauge). Sâu nhất ≤ giới hạn → ĐẠT.",
        "Measure with undercut gauge. Max depth ≤ limit → PASS."),
      clause: { ref: "AWS D1.1:2020, Table 8.1(7A), p.239", quote: "For material less than 1 in [25 mm] thick, undercut shall not exceed 1/32 in [1 mm]... For material equal to or greater than 1 in [25 mm] thick, undercut shall not exceed 1/16 in [2 mm] for any length of weld." },
      calc: {
        inputs: [
          { k: "t", label: B("Chiều dày vật liệu t (mm)", "Material thickness t (mm)"), def: 12 },
          { k: "d", label: B("Độ sâu undercut đo được (mm)", "Measured undercut depth (mm)"), def: 0.8 },
          { k: "acc", label: B("Tổng dài đoạn 1–2mm trong 300mm (mm)", "Accumulated 1–2mm length in 300mm (mm)"), def: 0 }
        ],
        evaluate(v) {
          if (v.t >= 25) return { limitText: "t ≥ 25mm → giới hạn 2 mm", detail: `Đo ${v.d} mm`, pass: v.d <= 2 };
          if (v.d <= 1) return { limitText: "t < 25mm → giới hạn 1 mm", detail: `Đo ${v.d} mm ≤ 1 mm`, pass: true };
          if (v.d <= 2) return { limitText: "1–2mm chỉ chấp nhận khi tổng dài ≤ 50mm/300mm", detail: `Đo ${v.d} mm; tổng dài ${v.acc} mm ${v.acc <= 50 ? "≤" : ">"} 50 mm`, pass: v.acc <= 50 };
          return { limitText: "Tối đa tuyệt đối 2 mm", detail: `Đo ${v.d} mm > 2 mm`, pass: false };
        }
      }
    },
    {
      id: "aws_undercut_cyclic", std: "AWS D1.1:2020", group: "UNDERCUT", load: B("Mỏi", "Cyclic"),
      title: B("(7B) Cháy chân — kết cấu chịu tải mỏi", "(7B) Undercut — cyclically loaded"),
      criteria: B("Cấu kiện chính, mối hàn VUÔNG GÓC với ứng suất kéo: undercut ≤ 0.25mm. Các trường hợp còn lại: ≤ 1mm.",
        "Primary members, weld transverse to tensile stress: ≤ 0.25mm (0.01 in). All other cases: ≤ 1mm."),
      acceptance: B("Sâu nhất ≤ giới hạn theo hướng ứng suất → ĐẠT.", "Max depth ≤ limit per stress direction → PASS."),
      clause: { ref: "AWS D1.1:2020, Table 8.1(7B), p.239", quote: "In primary members, undercut shall be no more than 0.01 in [0.25 mm] deep when the weld is transverse to tensile stress... 1/32 in [1 mm] deep for all other cases." },
      calc: {
        inputs: [
          { k: "trans", label: B("Vuông góc ứng suất kéo? (1=có,0=không)", "Transverse to tension? (1/0)"), def: 1 },
          { k: "d", label: B("Độ sâu undercut (mm)", "Undercut depth (mm)"), def: 0.2 }
        ],
        evaluate(v) {
          const lim = v.trans ? 0.25 : 1;
          return { limitText: `Giới hạn ${lim} mm`, detail: `Đo ${v.d} mm`, pass: v.d <= lim };
        }
      }
    },
    {
      id: "aws_porosity_static", std: "AWS D1.1:2020", group: "POROSITY", load: B("Tĩnh", "Static"),
      title: B("(8A) Rỗ khí — tải tĩnh", "(8A) Porosity — statically loaded"),
      criteria: B("Mối hàn ngấu hoàn toàn (CJP) giáp mối VUÔNG GÓC ứng suất kéo: KHÔNG được có rỗ ống (piping porosity) nhìn thấy. Mối hàn khác + hàn góc: tổng đường kính rỗ ≥ 1mm không vượt 10mm trong mỗi 25mm dài và không vượt 20mm trong mỗi 300mm.",
        "CJP groove butt welds transverse to tensile stress: no visible piping porosity. Other groove + fillet welds: sum of visible piping porosity ≥ 1mm dia. ≤ 10mm per 25mm and ≤ 20mm per 300mm."),
      acceptance: B("Đếm + đo đường kính các rỗ ≥ 1mm trên đoạn xấu nhất → so giới hạn.",
        "Count/measure pores ≥ 1mm on worst segment vs limits."),
      clause: { ref: "AWS D1.1:2020, Table 8.1(8A), p.240", quote: "...the sum of the visible piping porosity 1/32 in [1 mm] or greater in diameter shall not exceed 3/8 in [10 mm] in any linear inch of weld and shall not exceed 3/4 in [20 mm] in any 12 in [300 mm] length of weld." },
      calc: {
        inputs: [
          { k: "cjp", label: B("CJP giáp mối chịu kéo ngang? (1/0)", "CJP butt transverse tension? (1/0)"), def: 0 },
          { k: "s25", label: B("Tổng Ø rỗ trong 25mm xấu nhất (mm)", "Sum Ø in worst 25mm (mm)"), def: 4 },
          { k: "s300", label: B("Tổng Ø rỗ trong 300mm xấu nhất (mm)", "Sum Ø in worst 300mm (mm)"), def: 8 }
        ],
        evaluate(v) {
          if (v.cjp) return { limitText: "CJP chịu kéo ngang: 0 rỗ ống nhìn thấy", detail: (v.s25 > 0 || v.s300 > 0) ? "Có rỗ" : "Không rỗ", pass: v.s25 <= 0 && v.s300 <= 0 };
          return { limitText: "≤ 10mm/25mm và ≤ 20mm/300mm", detail: `${v.s25}mm/25mm; ${v.s300}mm/300mm`, pass: v.s25 <= 10 && v.s300 <= 20 };
        }
      }
    },
    {
      id: "aws_porosity_cyclic", std: "AWS D1.1:2020", group: "POROSITY", load: B("Mỏi", "Cyclic"),
      title: B("(8B/8C) Rỗ khí — tải mỏi", "(8B/8C) Porosity — cyclically loaded"),
      criteria: B("Hàn góc: tần suất rỗ ống ≤ 1 rỗ/100mm; đường kính tối đa 2.5mm (ngoại lệ sườn tăng cứng–bụng: như quy tắc 10mm/25mm & 20mm/300mm). CJP giáp mối chịu kéo ngang: KHÔNG rỗ ống; groove khác: ≤ 1 rỗ/100mm, Ø ≤ 2.5mm.",
        "Fillet: piping porosity frequency ≤ 1 per 100mm, max dia 2.5mm (exception stiffener-to-web welds: 10mm/25mm & 20mm/300mm rule). CJP butt transverse tension: no piping porosity; other grooves: ≤ 1/100mm, Ø ≤ 2.5mm."),
      acceptance: B("Đếm tần suất + đo Ø lớn nhất → so giới hạn.", "Check frequency + max dia vs limits."),
      clause: { ref: "AWS D1.1:2020, Table 8.1(8B)(8C), p.240", quote: "The frequency of piping porosity in fillet welds shall not exceed one in each 4 in [100 mm] of weld length and the maximum diameter shall not exceed 3/32 in [2.5 mm]." },
      calc: {
        inputs: [
          { k: "freq", label: B("Số rỗ trong 100mm xấu nhất", "Pores in worst 100mm"), def: 1 },
          { k: "dia", label: B("Ø rỗ lớn nhất (mm)", "Max pore dia (mm)"), def: 2 }
        ],
        evaluate(v) {
          return { limitText: "≤ 1 rỗ/100mm và Ø ≤ 2.5mm", detail: `${v.freq} rỗ/100mm; Ø max ${v.dia}mm`, pass: v.freq <= 1 && v.dia <= 2.5 };
        }
      }
    },
    {
      id: "aws_profile", std: "AWS D1.1:2020", group: "PROFILE", load: B("Tĩnh + Mỏi", "Static + Cyclic"),
      title: B("(4) Biên dạng mối hàn (theo 7.23)", "(4) Weld profiles (per 7.23)"),
      criteria: B("Biên dạng phải phù hợp mục 7.23: mặt hàn góc thường phẳng hoặc hơi lồi; phần lồi gia cường mối giáp mối ≤ 3mm (1/8 in); chuyển tiếp mép trơn tru, không chờm phủ (overlap).",
        "Profiles per 7.23: fillet faces flat to slightly convex; groove weld reinforcement ≤ 3mm (1/8 in); smooth transition, no overlap."),
      acceptance: B("Gia cường ≤ 3mm, không overlap, chuyển tiếp trơn → ĐẠT.", "Reinforcement ≤ 3mm, no overlap, smooth transition → PASS."),
      clause: { ref: "AWS D1.1:2020, Table 8.1(4) & 7.23", quote: "Weld profiles shall be in conformance with 7.23." },
      calc: {
        inputs: [{ k: "r", label: B("Chiều cao gia cường đo (mm)", "Measured reinforcement (mm)"), def: 2 }],
        evaluate(v) { return { limitText: "Gia cường ≤ 3 mm", detail: `Đo ${v.r} mm`, pass: v.r <= 3 }; }
      }
    },

    /* ========== ISO 5817:2023 — Table 1 (mức B/C/D) ==========
       LIMS: {D,C,B} mỗi mức là hàm (t,a,b,s,h...) trả {lim, txt} hoặc null = cấm */
    {
      id: "iso_crack", std: "ISO 5817:2023", group: "CRACK", load: B("Mọi mức", "All levels"),
      title: B("100 — Nứt", "100 — Crack"),
      criteria: B("Không cho phép ở cả 3 mức B, C, D (trừ nứt tế vi crater 104x xét riêng).",
        "Not permitted at levels B, C and D."),
      acceptance: B("Không nứt → ĐẠT mọi mức.", "No crack → PASS all levels."),
      clause: { ref: "ISO 5817:2023, Table 1 No.1 (100)", quote: "Cracks: not permitted (B, C, D)." }
    },
    {
      id: "iso_undercut", std: "ISO 5817:2023", group: "UNDERCUT", load: B("B/C/D", "B/C/D"),
      title: B("5011/5012 — Cháy chân liên tục/gián đoạn", "5011/5012 — Continuous/intermittent undercut"),
      criteria: B("t > 3mm: mức D: h ≤ 0.2t, max 1mm · mức C: h ≤ 0.1t, max 0.5mm · mức B: h ≤ 0.05t, max 0.5mm. Yêu cầu chuyển tiếp trơn tru.",
        "t > 3mm: D: h ≤ 0.2t max 1mm · C: h ≤ 0.1t max 0.5mm · B: h ≤ 0.05t max 0.5mm. Smooth transition required."),
      acceptance: B("Độ sâu h ≤ giới hạn theo mức yêu cầu → ĐẠT.", "Depth h ≤ limit of required level → PASS."),
      clause: { ref: "ISO 5817:2023, Table 1 No.1.7 (5011, 5012)", quote: "D: h ≤ 0,2 × t but max. 1 mm; C: h ≤ 0,1 × t but max. 0,5 mm; B: h ≤ 0,05 × t but max. 0,5 mm" },
      calc: {
        inputs: [
          { k: "t", label: B("Chiều dày t (mm)", "Thickness t (mm)"), def: 10 },
          { k: "h", label: B("Độ sâu undercut h (mm)", "Undercut depth h (mm)"), def: 0.4 },
          { k: "lv", label: B("Mức yêu cầu (1=B,2=C,3=D)", "Level (1=B,2=C,3=D)"), def: 2 }
        ],
        evaluate(v) {
          const L = { 1: Math.min(0.05 * v.t, 0.5), 2: Math.min(0.1 * v.t, 0.5), 3: Math.min(0.2 * v.t, 1) };
          const name = { 1: "B", 2: "C", 3: "D" }[v.lv] || "C";
          const lim = L[v.lv] ?? L[2];
          return { limitText: `Mức ${name}: h ≤ ${num(lim)} mm (B≤${num(L[1])} · C≤${num(L[2])} · D≤${num(L[3])})`, detail: `Đo h = ${v.h} mm`, pass: v.h <= lim };
        }
      }
    },
    {
      id: "iso_excess_butt", std: "ISO 5817:2023", group: "PROFILE", load: B("B/C/D", "B/C/D"),
      title: B("502 — Gia cường quá cao (hàn giáp mối)", "502 — Excess weld metal (butt weld)"),
      criteria: B("D: h ≤ 1mm + 0.25b, max 10mm · C: h ≤ 1mm + 0.15b, max 7mm · B: h ≤ 1mm + 0.1b, max 5mm (b = bề rộng mối hàn).",
        "D: h ≤ 1 + 0.25b max 10 · C: h ≤ 1 + 0.15b max 7 · B: h ≤ 1 + 0.1b max 5 (b = weld width)."),
      acceptance: B("h ≤ giới hạn mức yêu cầu → ĐẠT.", "h within level limit → PASS."),
      clause: { ref: "ISO 5817:2023, Table 1 No.1.9 (502)", quote: "D: h ≤ 1 mm + 0,25 b, max 10 mm; C: h ≤ 1 mm + 0,15 b, max 7 mm; B: h ≤ 1 mm + 0,1 b, max 5 mm" },
      calc: {
        inputs: [
          { k: "b", label: B("Bề rộng mối hàn b (mm)", "Weld width b (mm)"), def: 14 },
          { k: "h", label: B("Chiều cao gia cường h (mm)", "Excess height h (mm)"), def: 2.5 },
          { k: "lv", label: B("Mức (1=B,2=C,3=D)", "Level (1=B,2=C,3=D)"), def: 2 }
        ],
        evaluate(v) {
          const L = { 1: Math.min(1 + 0.1 * v.b, 5), 2: Math.min(1 + 0.15 * v.b, 7), 3: Math.min(1 + 0.25 * v.b, 10) };
          const name = { 1: "B", 2: "C", 3: "D" }[v.lv] || "C"; const lim = L[v.lv] ?? L[2];
          return { limitText: `Mức ${name}: h ≤ ${num(lim)} mm`, detail: `Đo h = ${v.h} mm`, pass: v.h <= lim };
        }
      }
    },
    {
      id: "iso_convex_fillet", std: "ISO 5817:2023", group: "PROFILE", load: B("B/C/D", "B/C/D"),
      title: B("503 — Lồi quá mức (hàn góc)", "503 — Excessive convexity (fillet)"),
      criteria: B("D: h ≤ 1mm + 0.25b, max 5mm · C: h ≤ 1mm + 0.15b, max 4mm · B: h ≤ 1mm + 0.1b, max 3mm.",
        "D: h ≤ 1 + 0.25b max 5 · C: h ≤ 1 + 0.15b max 4 · B: h ≤ 1 + 0.1b max 3."),
      acceptance: B("h ≤ giới hạn → ĐẠT.", "h within limit → PASS."),
      clause: { ref: "ISO 5817:2023, Table 1 No.1.10 (503)", quote: "D: h ≤ 1 mm + 0,25 b, max 5 mm; C: h ≤ 1 mm + 0,15 b, max 4 mm; B: h ≤ 1 mm + 0,1 b, max 3 mm" },
      calc: {
        inputs: [
          { k: "b", label: B("Bề rộng mặt hàn b (mm)", "Face width b (mm)"), def: 10 },
          { k: "h", label: B("Độ lồi h (mm)", "Convexity h (mm)"), def: 2 },
          { k: "lv", label: B("Mức (1=B,2=C,3=D)", "Level"), def: 2 }
        ],
        evaluate(v) {
          const L = { 1: Math.min(1 + 0.1 * v.b, 3), 2: Math.min(1 + 0.15 * v.b, 4), 3: Math.min(1 + 0.25 * v.b, 5) };
          const name = { 1: "B", 2: "C", 3: "D" }[v.lv] || "C"; const lim = L[v.lv] ?? L[2];
          return { limitText: `Mức ${name}: h ≤ ${num(lim)} mm`, detail: `Đo h = ${v.h} mm`, pass: v.h <= lim };
        }
      }
    },
    {
      id: "iso_excess_pen", std: "ISO 5817:2023", group: "PROFILE", load: B("B/C/D", "B/C/D"),
      title: B("504 — Chân ngấu quá mức (excess penetration)", "504 — Excess penetration"),
      criteria: B("t > 3mm — D: h ≤ 1mm + 1.0b, max 5mm · C: h ≤ 1mm + 0.45b, max 4mm · B: h ≤ 1mm + 0.2b, max 3mm (b = bề rộng chân ngấu). LƯU Ý: bản 2023 đổi mức C từ 0.6b (bản 2014) xuống 0.45b.",
        "t > 3mm — D: h ≤ 1 + 1.0b max 5 · C: h ≤ 1 + 0.45b max 4 · B: h ≤ 1 + 0.2b max 3. NOTE: 2023 edition tightened level C from 0.6b to 0.45b."),
      acceptance: B("h ≤ giới hạn → ĐẠT.", "h within limit → PASS."),
      clause: { ref: "ISO 5817:2023, Table 1 No.1.11 (504) — đã xác minh bản gốc", quote: "D: h ≤ 1,0 b + 1 mm, but max. 5 mm; C: h ≤ 0,45 b + 1 mm, but max. 4 mm; B: h ≤ 0,2 b + 1 mm, but max. 3 mm" },
      calc: {
        inputs: [
          { k: "b", label: B("Bề rộng chân ngấu b (mm)", "Root bead width b (mm)"), def: 4 },
          { k: "h", label: B("Chiều cao chân ngấu h (mm)", "Penetration height h (mm)"), def: 2 },
          { k: "lv", label: B("Mức (1=B,2=C,3=D)", "Level"), def: 2 }
        ],
        evaluate(v) {
          const L = { 1: Math.min(1 + 0.2 * v.b, 3), 2: Math.min(1 + 0.45 * v.b, 4), 3: Math.min(1 + 1.0 * v.b, 5) };
          const name = { 1: "B", 2: "C", 3: "D" }[v.lv] || "C"; const lim = L[v.lv] ?? L[2];
          return { limitText: `Mức ${name}: h ≤ ${num(lim)} mm`, detail: `Đo h = ${v.h} mm`, pass: v.h <= lim };
        }
      }
    },
    {
      id: "iso_overlap", std: "ISO 5817:2023", group: "PROFILE", load: B("B/C/D", "B/C/D"),
      title: B("506 — Chờm phủ (overlap)", "506 — Overlap"),
      criteria: B("D: h ≤ 0.2b · C và B: KHÔNG cho phép. (EN 1090-2: EXC2 được phép áp mức D cho 506.)",
        "D: h ≤ 0.2b · C and B: not permitted. (EN 1090-2 allows level D for 506 at EXC2.)"),
      acceptance: B("Mức C/B: không có overlap → ĐẠT. Mức D: h ≤ 0.2b.", "C/B: none → PASS. D: h ≤ 0.2b."),
      clause: { ref: "ISO 5817:2023, Table 1 No.1.12 (506)", quote: "D: h ≤ 0,2 b; C: not permitted; B: not permitted" }
    },
    {
      id: "iso_sagging", std: "ISO 5817:2023", group: "PROFILE", load: B("B/C/D", "B/C/D"),
      title: B("509/511 — Lõm bề mặt / điền không đầy rãnh", "509/511 — Sagging / incompletely filled groove"),
      criteria: B("Khuyết tật dạng ngắn: D: h ≤ 0.25t, max 2mm · C: h ≤ 0.1t, max 1mm · B: h ≤ 0.05t, max 0.5mm. Yêu cầu chuyển tiếp trơn.",
        "Short imperfections: D: h ≤ 0.25t max 2 · C: h ≤ 0.1t max 1 · B: h ≤ 0.05t max 0.5. Smooth transition."),
      acceptance: B("h ≤ giới hạn mức → ĐẠT.", "h within limit → PASS."),
      clause: { ref: "ISO 5817:2023, Table 1 No.1.14/1.16 (509, 511)", quote: "D: h ≤ 0,25 t, max 2 mm; C: h ≤ 0,1 t, max 1 mm; B: h ≤ 0,05 t, max 0,5 mm" },
      calc: {
        inputs: [
          { k: "t", label: B("Chiều dày t (mm)", "Thickness t (mm)"), def: 10 },
          { k: "h", label: B("Độ lõm h (mm)", "Depth h (mm)"), def: 0.5 },
          { k: "lv", label: B("Mức (1=B,2=C,3=D)", "Level"), def: 2 }
        ],
        evaluate(v) {
          const L = { 1: Math.min(0.05 * v.t, 0.5), 2: Math.min(0.1 * v.t, 1), 3: Math.min(0.25 * v.t, 2) };
          const name = { 1: "B", 2: "C", 3: "D" }[v.lv] || "C"; const lim = L[v.lv] ?? L[2];
          return { limitText: `Mức ${name}: h ≤ ${num(lim)} mm`, detail: `Đo h = ${v.h} mm`, pass: v.h <= lim };
        }
      }
    },
    {
      id: "iso_burnthrough", std: "ISO 5817:2023", group: "OTHER", load: B("B/C/D", "B/C/D"),
      title: B("510 — Thủng (burn-through)", "510 — Burn-through"),
      criteria: B("KHÔNG cho phép ở cả 3 mức B, C, D.", "Not permitted at B, C and D."),
      acceptance: B("Không thủng → ĐẠT.", "No burn-through → PASS."),
      clause: { ref: "ISO 5817:2023, Table 1 No.1.15 (510)", quote: "Burn-through: not permitted (B, C, D)." }
    },
    {
      id: "iso_pore", std: "ISO 5817:2023", group: "POROSITY", load: B("B/C/D", "B/C/D"),
      title: B("2017 — Rỗ khí bề mặt", "2017 — Surface pore"),
      criteria: B("t > 3mm — Hàn giáp mối: D: d ≤ 0.3s, max 3mm · C: d ≤ 0.2s, max 2mm · B: KHÔNG cho phép. Hàn góc: thay s bằng a (chiều dày tính toán).",
        "t > 3mm — Butt: D: d ≤ 0.3s max 3 · C: d ≤ 0.2s max 2 · B: not permitted. Fillet: use a instead of s."),
      acceptance: B("Đường kính rỗ d ≤ giới hạn (mức B: không rỗ) → ĐẠT.", "Pore dia within limit (B: none) → PASS."),
      clause: { ref: "ISO 5817:2023, Table 1 No.1.3 (2017)", quote: "D: d ≤ 0,3 s (0,3 a), max 3 mm; C: d ≤ 0,2 s (0,2 a), max 2 mm; B: not permitted" },
      calc: {
        inputs: [
          { k: "s", label: B("Chiều dày mối hàn s/a (mm)", "Weld throat s/a (mm)"), def: 8 },
          { k: "d", label: B("Ø rỗ lớn nhất d (mm)", "Max pore dia d (mm)"), def: 1.5 },
          { k: "lv", label: B("Mức (1=B,2=C,3=D)", "Level"), def: 2 }
        ],
        evaluate(v) {
          if (v.lv == 1) return { limitText: "Mức B: không cho phép rỗ bề mặt", detail: `Đo d = ${v.d} mm`, pass: v.d <= 0 };
          const lim = v.lv == 2 ? Math.min(0.2 * v.s, 2) : Math.min(0.3 * v.s, 3);
          return { limitText: `Mức ${v.lv == 2 ? "C" : "D"}: d ≤ ${num(lim)} mm`, detail: `Đo d = ${v.d} mm`, pass: v.d <= lim };
        }
      }
    },
    {
      id: "iso_throat_under", std: "ISO 5817:2023", group: "SIZE", load: B("B/C/D", "B/C/D"),
      title: B("5213 — Thiếu chiều dày tính toán (hàn góc)", "5213 — Insufficient throat thickness (fillet)"),
      criteria: B("Khuyết tật ngắn: D: h ≤ 0.3mm + 0.1a, max 2mm · C: h ≤ 0.3mm + 0.1a, max 1mm · B: KHÔNG cho phép.",
        "Short imperfections: D: h ≤ 0.3 + 0.1a max 2 · C: h ≤ 0.3 + 0.1a max 1 · B: not permitted."),
      acceptance: B("Hụt throat h ≤ giới hạn → ĐẠT.", "Throat shortfall within limit → PASS."),
      clause: { ref: "ISO 5817:2023, Table 1 No.1.17 (5213)", quote: "D: h ≤ 0,3 mm + 0,1 a, max 2 mm; C: h ≤ 0,3 mm + 0,1 a, max 1 mm; B: not permitted" },
      calc: {
        inputs: [
          { k: "a", label: B("Throat danh nghĩa a (mm)", "Nominal throat a (mm)"), def: 6 },
          { k: "h", label: B("Mức hụt h (mm)", "Shortfall h (mm)"), def: 0.5 },
          { k: "lv", label: B("Mức (1=B,2=C,3=D)", "Level"), def: 2 }
        ],
        evaluate(v) {
          if (v.lv == 1) return { limitText: "Mức B: không cho phép", detail: `h = ${v.h} mm`, pass: v.h <= 0 };
          const lim = v.lv == 2 ? Math.min(0.3 + 0.1 * v.a, 1) : Math.min(0.3 + 0.1 * v.a, 2);
          return { limitText: `Mức ${v.lv == 2 ? "C" : "D"}: h ≤ ${num(lim)} mm`, detail: `Đo h = ${v.h} mm`, pass: v.h <= lim };
        }
      }
    },
    {
      id: "iso_asym", std: "ISO 5817:2023", group: "SIZE", load: B("B/C/D", "B/C/D"),
      title: B("512 — Hàn góc lệch cạnh quá mức", "512 — Excessive asymmetry of fillet weld"),
      criteria: B("Trường hợp không quy định lệch cạnh chủ ý: D: h ≤ 2mm + 0.2a · C: h ≤ 2mm + 0.15a · B: h ≤ 1.5mm + 0.15a.",
        "Where asymmetry not specified: D: h ≤ 2 + 0.2a · C: h ≤ 2 + 0.15a · B: h ≤ 1.5 + 0.15a."),
      acceptance: B("Chênh lệch 2 cạnh h (z1−z2) ≤ giới hạn → ĐẠT.", "Leg difference within limit → PASS."),
      clause: { ref: "ISO 5817:2023, Table 1 No.1.18 (512)", quote: "D: h ≤ 2 mm + 0,2 a; C: h ≤ 2 mm + 0,15 a; B: h ≤ 1,5 mm + 0,15 a" },
      calc: {
        inputs: [
          { k: "a", label: B("Throat a (mm)", "Throat a (mm)"), def: 6 },
          { k: "h", label: B("Chênh lệch cạnh h (mm)", "Leg difference h (mm)"), def: 2 },
          { k: "lv", label: B("Mức (1=B,2=C,3=D)", "Level"), def: 2 }
        ],
        evaluate(v) {
          const L = { 1: 1.5 + 0.15 * v.a, 2: 2 + 0.15 * v.a, 3: 2 + 0.2 * v.a };
          const name = { 1: "B", 2: "C", 3: "D" }[v.lv] || "C"; const lim = L[v.lv] ?? L[2];
          return { limitText: `Mức ${name}: h ≤ ${num(lim)} mm`, detail: `Đo h = ${v.h} mm`, pass: v.h <= lim };
        }
      }
    },
    {
      id: "iso_stray", std: "ISO 5817:2023", group: "OTHER", load: B("B/C/D", "B/C/D"),
      title: B("601 — Vết hồ quang lạc (stray arc)", "601 — Stray arc"),
      criteria: B("Mức D: cho phép NẾU tính chất kim loại nền không bị ảnh hưởng. Mức C, B: KHÔNG cho phép. (EN 1090-2: EXC2 áp mức D cho 601.)",
        "D: permitted if parent metal properties not affected. C, B: not permitted."),
      acceptance: B("Không có vết hồ quang ngoài rãnh hàn → ĐẠT mức B/C.", "No arc strikes outside groove → PASS B/C."),
      clause: { ref: "ISO 5817:2023, Table 1 No.3.1 (601)", quote: "D: Permitted, if the properties of the parent metal are not affected; C, B: not permitted" }
    },
    {
      id: "iso_spatter", std: "ISO 5817:2023", group: "OTHER", load: B("B/C/D", "B/C/D"),
      title: B("602 — Bắn tóe (spatter)", "602 — Spatter"),
      criteria: B("Mức chấp nhận phụ thuộc ứng dụng (vd: chuẩn bị sơn phủ, mỏi). Thực hành: phải làm sạch spatter bám dính trước sơn — xem EN ISO 8501-3 (P2/P3 yêu cầu loại bỏ).",
        "Acceptance depends on application (e.g., coating, fatigue). Practice: adherent spatter must be removed before coating — see EN ISO 8501-3 (P2/P3)."),
      acceptance: B("Theo yêu cầu hợp đồng/spec sơn; mặc định loại bỏ spatter bám.", "Per contract/coating spec; default remove adherent spatter."),
      clause: { ref: "ISO 5817:2023, Table 1 No.3.2 (602)", quote: "Acceptance depends on application, e.g. material, corrosion protection." }
    },
    {
      id: "iso_pen402", std: "ISO 5817:2023", group: "FUSION", load: B("B/C/D", "B/C/D"),
      title: B("402 — Không ngấu hết (incomplete penetration)", "402 — Lack of penetration"),
      criteria: B("Mối nối ngấu một phần (PJP): khuyết tật ngắn — D: h ≤ 0.2s (hoặc 0.2i), max 2mm · C: h ≤ 0.1s (hoặc 0.1i), max 1.5mm · B: KHÔNG cho phép. Mối giáp mối ngấu hoàn toàn: D: h ≤ 0.2t max 2mm (khuyết tật ngắn); C, B: không cho phép.",
        "Partial penetration joints: short imperfections — D: h ≤ 0.2s (or 0.2i) max 2 · C: h ≤ 0.1s (or 0.1i) max 1.5 · B: not permitted. Full-penetration butt: D only, h ≤ 0.2t max 2."),
      acceptance: B("Chỉ áp dụng khi thiết kế không yêu cầu ngấu hoàn toàn. CJP mức C/B: mọi thiếu ngấu → KHÔNG ĐẠT.",
        "Applies only where full penetration not required. CJP at C/B: any lack of penetration → FAIL."),
      clause: { ref: "ISO 5817:2023, Table 1 No.2.13 (402) — đã xác minh bản gốc", quote: "D: Short imperfections: h ≤ 0,2 s or h ≤ 0,2 i, but max. 2 mm; C: h ≤ 0,1 s or h ≤ 0,1 i, but max. 1,5 mm; B: Not permitted" }
    },

    /* ========== JASS 6 (thực hành Nhật — tham khảo) ========== */
    {
      id: "jass_undercut", std: "JASS 6", group: "UNDERCUT", load: B("Thực hành JP", "JP practice"),
      title: B("Cháy chân theo JASS 6", "Undercut per JASS 6"),
      criteria: B("Thực hành JASS 6 (AIJ): undercut ≤ 0.3mm cho mối hàn quan trọng chịu kéo; ≤ 0.5mm cho vị trí khác; tổng chiều dài bị giới hạn theo spec dự án.",
        "JASS 6 practice (AIJ): undercut ≤ 0.3mm for critical tension welds; ≤ 0.5mm elsewhere; accumulated length limited per project spec."),
      acceptance: B("Theo spec dự án Nhật (thường dẫn JASS 6 / AIJ). Đối chiếu bản vẽ trước khi áp dụng.",
        "Per Japanese project spec (JASS 6 / AIJ). Verify with project drawings."),
      clause: { ref: "JASS 6 — Steel Work (AIJ), mục kiểm tra ngoại quan mối hàn", quote: "Tham khảo thực hành; PDF JASS 6 trong thư mục dự án là bản scan — đối chiếu trực tiếp khi cần trích dẫn chính thức.", soft: true },
      calc: {
        inputs: [
          { k: "crit", label: B("Mối hàn chịu kéo quan trọng? (1/0)", "Critical tension weld? (1/0)"), def: 1 },
          { k: "d", label: B("Độ sâu undercut (mm)", "Undercut depth (mm)"), def: 0.3 }
        ],
        evaluate(v) {
          const lim = v.crit ? 0.3 : 0.5;
          return { limitText: `Giới hạn ${lim} mm`, detail: `Đo ${v.d} mm`, pass: v.d <= lim };
        }
      }
    }
  ];

  /* ---------- 4. NDT ---------- */
  const NDT = {
    methods: [
      {
        id: "vt", name: "VT", full: B("Kiểm tra ngoại quan", "Visual Testing"),
        scope: B("100% mối hàn, trước mọi NDT khác", "100% of welds, before all other NDT"),
        std: B("Quy trình: EN ISO 17637 / AWS D1.1 Cl.8.9 · Chấp nhận: ISO 5817 / AWS Table 8.1", "Procedure: EN ISO 17637 / AWS D1.1 Cl.8.9 · Acceptance: ISO 5817 / AWS Table 8.1"),
        detect: B("Nứt bề mặt, undercut, rỗ bề mặt, biên dạng, kích thước, crater", "Surface cracks, undercut, surface porosity, profile, size, craters"),
        note: B("Dụng cụ: thước hàn (fillet/cam gauge), thước undercut, đèn ≥ 350 lux (ISO 17637 yêu cầu ≥ 350 lux, nên ≥ 500).", "Tools: fillet/cam gauge, undercut gauge, illumination ≥ 350 lux per ISO 17637 (500 recommended).")
      },
      {
        id: "mt", name: "MT", full: B("Kiểm tra bột từ", "Magnetic Particle Testing"),
        scope: B("Khuyết tật bề mặt + gần bề mặt, thép từ tính", "Surface + near-surface, ferromagnetic steel"),
        std: B("Quy trình: EN ISO 17638 / AWS D1.1 Cl.8.10 · Chấp nhận: EN ISO 23278 (mức 2X theo EXC) / AWS Table 8.1", "Procedure: EN ISO 17638 / AWS D1.1 Cl.8.10 · Acceptance: EN ISO 23278 / AWS Table 8.1"),
        detect: B("Nứt bề mặt/sát bề mặt, thiếu ngấu lộ mép", "Surface/near-surface cracks, lack of fusion at surface"),
        note: B("AWS: tiêu chí đánh giá MT giống VT (Table 8.1). Nhạy hơn VT với nứt nhỏ.", "AWS: MT evaluated per Table 8.1 (same as VT). More sensitive than VT for fine cracks.")
      },
      {
        id: "pt", name: "PT", full: B("Kiểm tra thẩm thấu", "Penetrant Testing"),
        scope: B("Khuyết tật hở bề mặt, mọi vật liệu", "Surface-breaking defects, any material"),
        std: B("Quy trình: EN ISO 3452-1 / AWS D1.1 Cl.8.10 · Chấp nhận: EN ISO 23277 / AWS Table 8.1", "Procedure: EN ISO 3452-1 · Acceptance: EN ISO 23277 / AWS Table 8.1"),
        detect: B("Nứt hở, rỗ hở, thiếu ngấu hở bề mặt", "Open cracks, open pores, surface-breaking LOF"),
        note: B("Dùng khi không áp dụng được MT (thép không từ tính, hình học phức tạp).", "Use where MT not applicable (non-magnetic, complex geometry).")
      },
      {
        id: "ut", name: "UT", full: B("Kiểm tra siêu âm", "Ultrasonic Testing"),
        scope: B("Khuyết tật bên trong, t ≥ 8mm (EN ISO 17640); AWS: groove CJP t ≥ 8mm (5/16 in)", "Internal defects; t ≥ 8mm typical"),
        std: B("Quy trình: EN ISO 17640 / AWS D1.1 Cl.8 Part F · Chấp nhận: EN ISO 11666 (mức 2/3) / AWS Table 8.2 (tĩnh) & 8.3 (mỏi)", "Procedure: EN ISO 17640 / AWS D1.1 Cl.8 Part F · Acceptance: EN ISO 11666 / AWS Tables 8.2, 8.3"),
        detect: B("Thiếu ngấu, nứt trong, xỉ kẹt, rỗ chùm bên trong", "Internal LOF, cracks, slag, clustered porosity"),
        note: B("AWS Table 8.2: phân loại chỉ thị Class A–D theo dB so với mức chuẩn, theo chiều dày & góc đầu dò. Class A: loại bỏ vô điều kiện.", "AWS Table 8.2 classifies indications Class A–D by dB rating vs weld size & probe angle.")
      },
      {
        id: "rt", name: "RT", full: B("Chụp ảnh phóng xạ", "Radiographic Testing"),
        scope: B("Khuyết tật thể tích bên trong, chủ yếu mối giáp mối", "Internal volumetric defects, mainly butt welds"),
        std: B("Quy trình: EN ISO 17636-1/-2 / AWS D1.1 Cl.8 Part E · Chấp nhận: EN ISO 10675-1 / AWS 8.12", "Procedure: EN ISO 17636 / AWS D1.1 Cl.8 Part E · Acceptance: EN ISO 10675-1 / AWS 8.12"),
        detect: B("Rỗ khí, xỉ kẹt, thiếu ngấu, nứt (tùy hướng)", "Porosity, slag, LOF, cracks (orientation-dependent)"),
        note: B("AWS 8.12.1: tải tĩnh — khuyết tật dài > 20mm cấm; quy tắc kích thước theo E (kích thước mối hàn).", "AWS 8.12.1: discontinuity limits scale with weld size E.")
      }
    ],
    holdTime: {
      title: B("Thời gian chờ tối thiểu trước NDT bổ sung — EN 1090-2, Table 23 (đã xác minh)", "Minimum hold times before supplementary NDT — EN 1090-2 Table 23 (verified)"),
      note: B("Tính từ lúc hàn xong. Q = nhiệt lượng đường hàn (kJ/mm); a/s = chiều dày mối hàn. Áp dụng khi gia nhiệt sơ bộ theo Method A của EN 1011-2:2001 Annex C. Thép cường độ cao có bảng riêng theo loại que (G46/E46 → G89/E89).",
        "Measured from weld completion. Q = heat input (kJ/mm); a/s = weld size. Applies with preheat per EN 1011-2:2001 Annex C Method A."),
      rows: [
        { size: "a hoặc s ≤ 6 mm", q: B("Mọi Q", "All Q"), grade: "S275–S460", time: B("Chỉ cần nguội (cooling period only)", "Cooling period only") },
        { size: "6 < a hoặc s ≤ 12 mm", q: "Q ≤ 3", grade: "S275–S460", time: B("8 giờ", "8 h") },
        { size: "6 < a hoặc s ≤ 12 mm", q: "Q > 3", grade: "S275–S460", time: B("16 giờ", "16 h") },
        { size: "a hoặc s > 12 mm", q: "Q ≤ 3", grade: "S275–S460", time: B("16 giờ", "16 h") },
        { size: "a hoặc s > 12 mm", q: "Q > 3", grade: "S275–S460", time: B("24 giờ", "24 h") }
      ],
      quote: "Table 23 — Minimum hold times. The supplementary NDT of a weld shall generally not be completed until after the minimum hold time after welding shown in Table 23."
    },
    extent: {
      title: B("Phạm vi NDT bổ sung định kỳ — EN 1090-2, Table 24 (đã xác minh)", "Extent of routine supplementary NDT — EN 1090-2 Table 24 (verified)"),
      note: B("EXC4: tối thiểu bằng EXC3. Thép ≥ S420: mối giáp mối ngang & cruciform EXC1 tăng lên 10%. a = throat, t = chiều dày lớn nhất.",
        "EXC4: at least EXC3 percentages. Steel ≥ S420: transverse butt/cruciform at EXC1 becomes 10%."),
      rows: [
        { type: B("Mối giáp mối ngang & ngấu một phần trong mối nối giáp mối (chịu kéo)", "Transverse butt & partial-penetration butt joints"), exc1: "0%", exc2: "10%", exc3: "20%" },
        { type: B("Mối giáp mối ngang & ngấu một phần: mối nối chữ thập (cruciform)", "Transverse butt & partial penetration: cruciform joints"), exc1: "0%", exc2: "10%", exc3: "20%" },
        { type: B("Mối giáp mối ngang & ngấu một phần: mối nối chữ T", "Transverse butt & partial penetration: T joints"), exc1: "0%", exc2: "5%", exc3: "10%" },
        { type: B("Hàn góc ngang với a > 12mm hoặc t > 30mm", "Transverse fillet welds a > 12mm or t > 30mm"), exc1: "0%", exc2: "5%", exc3: "10%" },
        { type: B("Hàn góc ngang với a ≤ 12mm và t ≤ 30mm", "Transverse fillet welds a ≤ 12mm and t ≤ 30mm"), exc1: "0%", exc2: "0%", exc3: "5%" },
        { type: B("Hàn dọc ngấu hoàn toàn bụng–cánh trên dầm cầu trục", "Full-pen longitudinal web-to-top-flange welds of crane girders"), exc1: "0%", exc2: "10%", exc3: "20%" },
        { type: B("Hàn dọc khác, hàn sườn tăng cứng, mối hàn chịu nén", "Other longitudinal welds, stiffeners, compression welds"), exc1: "0%", exc2: "0%", exc3: "5%" }
      ],
      quote: "Table 24 — Extent of routine supplementary NDT (shop and site welds, EXC1/EXC2/EXC3)."
    },
    personnel: B("Nhân sự NDT (MT/PT/UT/RT): chứng chỉ theo EN ISO 9712 tối thiểu Level 2 (EN 1090-2, 12.4.2.1). Giám sát hàn: IWE/IWT/IWS theo EXC (EN 1090-2 Table 14/15); AWS: CWI theo AWS QC1, NDT theo ASNT SNT-TC-1A.",
      "NDT personnel: EN ISO 9712 Level 2 minimum (EN 1090-2, 12.4.2.1). Welding coordination: IWE/IWT/IWS per EXC; AWS: CWI per AWS QC1, NDT per ASNT SNT-TC-1A.")
  };

  /* ---------- 5. CHECKLIST QC HÀN ---------- */
  const CHECKLIST = [
    {
      phase: B("TRƯỚC KHI HÀN", "BEFORE WELDING"), icon: "📋",
      items: [
        { t: B("WPS đã phê duyệt, có tại vị trí hàn, đúng cho liên kết (vật liệu/chiều dày/tư thế/quy trình)", "Approved WPS available at workstation, correct for joint"), ref: "AWS D1.1 Cl.6 / EN ISO 15614-1" },
        { t: B("Thợ hàn có chứng chỉ còn hiệu lực đúng phạm vi (quy trình, tư thế, chiều dày)", "Welder qualification valid for scope (process, position, thickness)"), ref: "AWS D1.1 Cl.6 / EN ISO 9606-1" },
        { t: B("Vật liệu nền đúng mác + có MTC; vật liệu hàn đúng WPS, còn hạn", "Base material grade + MTC; consumables per WPS, in date"), ref: "EN 1090-2 Cl.5 / EN 10204 3.1" },
        { t: B("Que hàn hydro thấp (E7018...): sấy & bảo quản tủ giữ nhiệt theo khuyến cáo NSX; kiểm soát thời gian phơi ngoài", "Low-hydrogen electrodes: baking & holding oven per manufacturer; exposure time controlled"), ref: "AWS D1.1 Cl.5.3" },
        { t: B("Gá lắp (fit-up): khe hở chân, góc vát, độ lệch mép trong dung sai WPS/bản vẽ", "Fit-up: root gap, bevel angle, misalignment within WPS/drawing tolerance"), ref: "AWS D1.1 Cl.7.21 / ISO 9692" },
        { t: B("Hàn đính (tack): đủ kích thước, không nứt, bởi thợ có chứng chỉ; tack lỗi phải loại bỏ", "Tack welds: sized, crack-free, by qualified welder; defective tacks removed"), ref: "AWS D1.1 Cl.7.18 / EN 1090-2 7.5.7" },
        { t: B("Bề mặt rãnh hàn sạch: không dầu mỡ, gỉ, sơn, ẩm trong phạm vi quy định", "Joint surfaces clean: no oil, rust, paint, moisture"), ref: "AWS D1.1 Cl.7.14 / EN 1090-2 7.5.1" },
        { t: B("Gia nhiệt sơ bộ đúng nhiệt độ tối thiểu theo chiều dày + mác thép (đo bằng bút nhiệt/IR cách mép ≥ 75mm)", "Preheat at minimum temp per thickness + grade (measured ≥ 75mm from joint)"), ref: "AWS D1.1 Table 5.8 / EN 1011-2" },
        { t: B("Che chắn thời tiết: hàn có khí bảo vệ (GMAW/FCAW-G) gió ≤ 8 km/h (5 mph); không hàn khi bề mặt ướt", "Weather protection: gas-shielded processes wind ≤ 8 km/h; no welding on wet surfaces"), ref: "AWS D1.1 Cl.7.12" },
        { t: B("Nhiệt độ môi trường ≥ −18°C (0°F); thép phải được làm ấm nếu dưới giới hạn WPS", "Ambient ≥ −18°C; warm steel if below WPS limit"), ref: "AWS D1.1 Cl.7.12.2" }
      ]
    },
    {
      phase: B("TRONG KHI HÀN", "DURING WELDING"), icon: "⚡",
      items: [
        { t: B("Thông số trong dải WPS: dòng điện, điện áp, tốc độ hàn, loại/lưu lượng khí", "Parameters within WPS range: current, voltage, travel speed, gas type/flow"), ref: "AWS D1.1 Cl.6 / EN ISO 15614-1" },
        { t: B("Nhiệt độ giữa các lớp (interpass) không vượt mức tối đa WPS", "Interpass temperature within WPS maximum"), ref: "AWS D1.1 Cl.5.7" },
        { t: B("Làm sạch xỉ/spatter giữa các lớp; kiểm tra lớp lót trước khi hàn lớp kế", "Interpass cleaning; root/intermediate passes inspected before next pass"), ref: "AWS D1.1 Cl.7.30" },
        { t: B("Trình tự hàn kiểm soát biến dạng & ứng suất dư theo kế hoạch hàn", "Welding sequence per plan to control distortion & residual stress"), ref: "EN 1090-2 7.5.8" },
        { t: B("Dũi chân (back gouging) đạt kim loại sạch trước khi hàn mặt sau (CJP 2 phía)", "Back gouging to sound metal before second side (CJP)"), ref: "AWS D1.1 Cl.7.22" },
        { t: B("Không mồi hồ quang ngoài rãnh hàn (stray arc); nếu có phải mài + kiểm tra nứt", "No arc strikes outside groove; grind + crack check if occurred"), ref: "AWS D1.1 Cl.7.28 / ISO 5817 (601)" }
      ]
    },
    {
      phase: B("SAU KHI HÀN", "AFTER WELDING"), icon: "✅",
      items: [
        { t: B("VT 100% mối hàn sau khi nguội (A514/A517/A709 HPS 690W: chờ ≥ 48h)", "VT 100% after cooling (A514/A517/HPS 690W: ≥ 48h wait)"), ref: "AWS D1.1 Table 8.1(5)" },
        { t: B("Đo kích thước: size hàn góc (gauge), chiều dài, vị trí theo bản vẽ", "Dimensional: fillet size (gauge), length, location per drawing"), ref: "AWS D1.1 Table 8.1(6)" },
        { t: B("Chờ đủ hold time trước NDT bổ sung (EN: Table 23 — 8/16/24h theo size & Q)", "Hold time before supplementary NDT (EN Table 23 — 8/16/24h)"), ref: "EN 1090-2 12.4.2.2, Table 23" },
        { t: B("NDT đúng phương pháp + phạm vi theo EXC/spec (EN Table 24; AWS theo hợp đồng)", "NDT method + extent per EXC/spec (EN Table 24)"), ref: "EN 1090-2 12.4.2.3, Table 24" },
        { t: B("Sửa lỗi theo quy trình được duyệt; mối sửa kiểm tra lại 100% bằng phương pháp ban đầu", "Repairs per approved procedure; re-inspect 100% by original method"), ref: "AWS D1.1 Cl.7.25 / EN 1090-2 7.6.5" },
        { t: B("Truy xuất: đóng dấu/ghi nhận thợ hàn theo mối hàn (EXC3/4 bắt buộc theo dõi)", "Traceability: welder ID per weld (mandatory EXC3/4)"), ref: "EN 1090-2 7.5.6" },
        { t: B("Hồ sơ: báo cáo VT/NDT, bản đồ mối hàn, WPS/WPQR, chứng chỉ thợ, MTC", "Records: VT/NDT reports, weld map, WPS/WPQR, welder certs, MTC"), ref: "EN 1090-2 Cl.12 / AWS D1.1 Cl.8" }
      ]
    }
  ];

  /* ---------- 6. KÝ HIỆU HÀN ---------- */
  const SYMBOLS = [
    { id: "fillet", name: B("Hàn góc (Fillet)", "Fillet weld"), aws: "▷ (tam giác)", iso: "▷",
      desc: B("Tam giác vuông trên đường tham chiếu. Số bên trái: size (z hoặc a). ISO: a6 = throat 6mm, z8 = cạnh 8mm. AWS: số là cạnh (leg). Ký hiệu dưới đường = phía mũi tên; trên đường = phía bên kia (AWS) / đường đứt nét (ISO).",
        "Right triangle on reference line. Left number: size. ISO: a6 = 6mm throat, z8 = 8mm leg. AWS: number = leg size.") },
    { id: "butt_v", name: B("Giáp mối vát V", "Single-V butt"), aws: "V", iso: "V",
      desc: B("Ký hiệu V mở lên. Kèm: góc vát tổng, khe hở chân (root gap), độ tù (root face) ghi trong ký hiệu hoặc WPS.", "V symbol. With groove angle, root gap, root face per symbol or WPS.") },
    { id: "butt_bevel", name: B("Giáp mối vát nửa V (Bevel)", "Single-bevel butt"), aws: "⌐V nửa", iso: "⌐",
      desc: B("Chỉ một cạnh vát. Mũi tên gãy (broken arrow) chỉ vào chi tiết được vát.", "One edge bevelled. Broken arrow points to bevelled member.") },
    { id: "butt_u", name: B("Giáp mối vát U / J", "Single-U / J butt"), aws: "U, J", iso: "U, J",
      desc: B("Rãnh U (2 cạnh) hoặc J (1 cạnh) cho chiều dày lớn — ít kim loại hàn hơn V.", "U (both edges) or J (one edge) for thick sections.") },
    { id: "pjp_cjp", name: B("CJP / PJP", "CJP / PJP"), aws: "CJP trong đuôi / (E) PJP", iso: "s + ký hiệu",
      desc: B("CJP = ngấu hoàn toàn (AWS: ghi 'CJP' trong đuôi ký hiệu hoặc B-U4a...). PJP: ghi kích thước ngấu hiệu dụng (E) / ISO: s = độ sâu ngấu.", "CJP = complete joint penetration. PJP: effective throat (E) / ISO: s = penetration depth.") },
    { id: "all_around", name: B("Hàn vòng quanh", "Weld all around"), aws: "○ tại gãy mũi tên", iso: "○",
      desc: B("Vòng tròn tại điểm gãy giữa mũi tên và đường tham chiếu: hàn liên tục quanh chu vi.", "Circle at arrow/reference junction: weld continuously around perimeter.") },
    { id: "field", name: B("Hàn tại công trường", "Field weld"), aws: "⚑ cờ", iso: "⚑",
      desc: B("Cờ đen tại điểm gãy: mối hàn thực hiện tại công trường (không phải xưởng).", "Flag at junction: weld made at site, not shop.") },
    { id: "intermittent", name: B("Hàn gián đoạn", "Intermittent weld"), aws: "z6 50-150", iso: "z6 n×50(100)",
      desc: B("ISO: z6 3×50(100) = size 6, 3 đoạn 50mm, khoảng trống 100mm. AWS: 6 50-150 = size 6, đoạn 50, BƯỚC (pitch) 150 tính tâm-tâm. Lưu ý khác nhau: ISO ghi khe hở, AWS ghi bước!",
        "ISO: z6 3×50(100) = 3 segments of 50 with 100 gap. AWS: 50-150 = length 50, pitch 150 center-to-center. Note the difference!") },
    { id: "contour", name: B("Ký hiệu hoàn thiện bề mặt", "Contour & finish"), aws: "—, ◡, M/G/C", iso: "—, ◡",
      desc: B("Gạch ngang = phẳng; cung = lồi/lõm. Chữ kèm (AWS): G = mài, M = gia công cơ, C = đục. Đặt trên ký hiệu hàn.", "Flat/convex/concave contour. AWS letters: G grind, M machine, C chip.") },
    { id: "iso_dashed", name: B("Khác biệt ISO 2553 vs AWS A2.4", "ISO 2553 vs AWS A2.4"), aws: "2 phía đường tham chiếu", iso: "Đường đứt nét",
      desc: B("ISO 2553: có đường đứt nét song song — ký hiệu trên nét đứt = phía bên kia. AWS A2.4: không có nét đứt; dưới đường = phía mũi tên, trên đường = phía kia. ĐỌC NHẦM HỆ → HÀN SAI PHÍA!",
        "ISO 2553 uses dashed identification line for other side. AWS: below line = arrow side, above = other side. Mixing conventions causes wrong-side welds!") }
  ];

  /* (FIT-UP đã tách thành module riêng /fitup/ theo yêu cầu) */
  const FITUP_MOVED = {
    intro: B("Fit-up đạt thì mối hàn mới có cơ hội đạt. Kiểm TRƯỚC khi hàn — sau khi hàn xong không sửa được gốc nữa. Giá trị chuẩn lấy theo WPS/bản vẽ; dung sai cho phép dưới đây theo AWS D1.1:2020 (đã đối chiếu PDF gốc).",
      "Good fit-up enables good welds. Inspect BEFORE welding. Design values per WPS/drawing; tolerances per AWS D1.1:2020 (verified)."),
    rules: [
      {
        id: "fu_fillet", sk: "fitgap",
        title: B("Khe hở chân — mối hàn GÓC (7.21.1)", "Fillet weld assembly root opening (7.21.1)"),
        criteria: B("Các bản ghép áp sát hết mức. Khe hở ≤ 5mm. Riêng thép dày ≥ 75mm không ép khít được: cho phép tới 8mm NẾU có backing phù hợp (flux, băng thủy tinh, bột sắt hoặc lớp hàn lót hydro thấp). QUAN TRỌNG: khe hở > 2mm → cạnh fillet phải TĂNG THÊM đúng bằng khe hở (hoặc chứng minh đủ throat).",
          "Parts in close contact. Gap ≤ 5mm; ≥75mm thick parts up to 8mm WITH suitable backing. Gap > 2mm → fillet leg increased by the gap amount."),
        quote: "The root opening shall not exceed 3/16 in [5 mm]... a maximum root opening of 5/16 in [8 mm] may be used, provided suitable backing is used. If the separation is greater than 1/16 in [2 mm], the legs of the fillet weld shall be increased by the amount of the root opening. — AWS D1.1:2020, 7.21.1",
        calc: {
          inputs: [
            { k: "g", label: B("Khe hở đo được (mm)", "Measured gap (mm)"), def: 1.5 },
            { k: "z", label: B("Cạnh fillet thiết kế z (mm)", "Design leg z (mm)"), def: 6 },
            { k: "thick", label: B("Thép dày ≥75mm + có backing? (1/0)", "≥75mm + backing? (1/0)"), def: 0 }
          ],
          evaluate(v) {
            const lim = v.thick ? 8 : 5;
            const legReq = v.g > 2 ? v.z + v.g : v.z;
            return {
              limitText: `Khe hở ≤ ${lim} mm` + (v.g > 2 ? ` · cạnh fillet yêu cầu = ${v.z} + ${num(v.g)} = ${num(legReq)} mm` : ""),
              detail: `Đo ${v.g} mm` + (v.g > 2 ? ` (>2mm → phải tăng cạnh)` : ""),
              pass: v.g <= lim
            };
          }
        }
      },
      {
        id: "fu_align", sk: "hilo",
        title: B("Lệch mép mối GIÁP MỐI — hi-lo (7.21.3)", "Butt joint alignment / hi-lo (7.21.3)"),
        criteria: B("Lệch tâm so với vị trí lý thuyết ≤ 10% chiều dày bản MỎNG hơn, tối đa 3mm — lấy giá trị NHỎ hơn. Khi nắn chỉnh: độ nghiêng kéo về không quá 12mm trên 300mm (1:25). Đo theo đường tâm bản trừ khi bản vẽ chỉ khác.",
          "Offset ≤ 10% of thinner part or 3mm, whichever is smaller. Correction slope ≤ 12mm in 300mm."),
        quote: "...the offset from the theoretical alignment shall not exceed 10% of the thickness of the thinner part joined, or 1/8 in [3 mm], whichever is smaller... the parts shall not be drawn in to a greater slope than 1/2 in [12 mm] in 12 in [300 mm]. — AWS D1.1:2020, 7.21.3",
        calc: {
          inputs: [
            { k: "t", label: B("Chiều dày bản mỏng hơn (mm)", "Thinner part t (mm)"), def: 12 },
            { k: "h", label: B("Lệch mép đo được (mm)", "Measured offset (mm)"), def: 1 }
          ],
          evaluate(v) {
            const lim = Math.min(0.1 * v.t, 3);
            return { limitText: `Giới hạn = min(10%×${v.t}; 3) = ${num(lim)} mm`, detail: `Đo ${v.h} mm`, pass: v.h <= lim };
          }
        }
      },
      {
        id: "fu_groove", sk: "bevel",
        title: B("Kích thước rãnh hàn so với bản vẽ (7.21.4.1, Fig 7.3)", "Groove dimensions vs detail (Fig 7.3)"),
        criteria: B("Sai lệch cho phép so với bản vẽ (as fit-up): • Root face: ±2mm • Khe hở gốc KHÔNG backing: ±2mm • Khe hở gốc CÓ backing: +6mm/−2mm • Góc rãnh: +10°/−5°. Vượt các mức này phải trình Engineer duyệt hoặc sửa.",
          "Permitted deviations: root face ±2mm; root opening ±2mm (no backing) / +6−2mm (with backing); groove angle +10°/−5°."),
        quote: "(1) Root face of joint ±1/16 in [2 mm]; (2) Root opening without backing ±1/16 in [2 mm], with backing +1/4 in [6 mm] −1/16 in [2 mm]; (3) Groove angle of joint +10° −5°. — AWS D1.1:2020, Figure 7.3",
        calc: {
          inputs: [
            { k: "gd", label: B("Khe hở thiết kế (mm)", "Design root opening (mm)"), def: 3 },
            { k: "gm", label: B("Khe hở đo (mm)", "Measured opening (mm)"), def: 4 },
            { k: "bk", label: B("Có backing? (1/0)", "Backing? (1/0)"), def: 0 },
            { k: "ad", label: B("Góc rãnh thiết kế (°)", "Design angle (°)"), def: 60 },
            { k: "am", label: B("Góc rãnh đo (°)", "Measured angle (°)"), def: 62 },
            { k: "fd", label: B("Root face thiết kế (mm)", "Design root face (mm)"), def: 2 },
            { k: "fm", label: B("Root face đo (mm)", "Measured root face (mm)"), def: 2.5 }
          ],
          evaluate(v) {
            const dg = v.gm - v.gd, da = v.am - v.ad, df = v.fm - v.fd;
            const gOk = v.bk ? (dg <= 6 && dg >= -2) : (Math.abs(dg) <= 2);
            const aOk = da <= 10 && da >= -5;
            const fOk = Math.abs(df) <= 2;
            return {
              limitText: `Khe hở: ${v.bk ? "+6/−2" : "±2"}mm · Góc: +10/−5° · Root face: ±2mm`,
              detail: `Δkhe hở ${num(dg)}mm ${gOk ? "✓" : "✗"} · Δgóc ${num(da)}° ${aOk ? "✓" : "✗"} · Δroot face ${num(df)}mm ${fOk ? "✓" : "✗"}`,
              pass: gOk && aOk && fOk
            };
          }
        }
      },
      {
        id: "fu_faying", sk: "fitgap",
        title: B("Khe hở mặt áp (faying surface) — 7.21.1.1", "Faying surface separation (7.21.1.1)"),
        criteria: B("Khe hở giữa các mặt áp của mối hàn nút/rãnh (plug/slot) và mối giáp mối đặt trên backing: ≤ 2mm. CẤM nhét tấm chêm (filler plates) trừ khi có trên bản vẽ hoặc Engineer duyệt.",
          "Separation ≤ 2mm for plug/slot welds and butt joints on backing. Filler plates prohibited unless specified/approved."),
        quote: "The separation between faying surfaces of plug and slot welds, and of butt joints landing on a backing, shall not exceed 1/16 in [2 mm]... The use of filler plates shall be prohibited except as specified on the drawings or as specially approved by the Engineer. — AWS D1.1:2020, 7.21.1.1",
        calc: {
          inputs: [{ k: "s", label: B("Khe hở đo (mm)", "Measured separation (mm)"), def: 1 }],
          evaluate(v) { return { limitText: "≤ 2 mm", detail: `Đo ${v.s} mm`, pass: v.s <= 2 }; }
        }
      },
      {
        id: "fu_var", sk: "fitgap",
        title: B("Biến thiên khe hở dọc mối — hàn máy (5.4.1.7)", "Root opening variation — mechanized welding"),
        criteria: B("Với hàn tự động/cơ giới FCAW, GMAW, SAW: chênh lệch khe hở (max − min) dọc mối hàn ≤ 3mm. Lớn hơn phải sửa cục bộ trước khi hàn.",
          "For automatic/mechanized FCAW, GMAW, SAW: root opening variation (max − min) ≤ 3mm; correct locally if exceeded."),
        quote: "...for automatic or mechanized welding using FCAW, GMAW, and SAW processes, the maximum root opening variation (minimum to maximum opening as fit-up) may not exceed 1/8 in [3 mm]. — AWS D1.1:2020, 5.4.1.7",
        calc: {
          inputs: [
            { k: "mx", label: B("Khe hở lớn nhất (mm)", "Max gap (mm)"), def: 4 },
            { k: "mn", label: B("Khe hở nhỏ nhất (mm)", "Min gap (mm)"), def: 2.5 }
          ],
          evaluate(v) { const d = v.mx - v.mn; return { limitText: "Biến thiên ≤ 3 mm", detail: `${v.mx} − ${v.mn} = ${num(d)} mm`, pass: d <= 3 }; }
        }
      }
    ],
    fixes: [
      { p: B("Khe hở rãnh quá lớn", "Excess root opening"), f: B("Được ĐẮP SỬA (buttering) về đúng kích thước trước khi hàn nối — chỉ khi khe hở ≤ 2× chiều dày bản mỏng hoặc ≤ 20mm (lấy nhỏ hơn). Lớn hơn nữa: phải có Engineer duyệt. TUYỆT ĐỐI không nhét que hàn/thanh thép vào khe.", "Buttering allowed up to min(2×t, 20mm); beyond → Engineer approval. NEVER insert rods/bars."), ref: "AWS 7.21.4.2/7.21.4.3" },
      { p: B("Lệch mép quá giới hạn", "Excess misalignment"), f: B("Nắn chỉnh từ từ, độ nghiêng kéo về ≤ 12mm/300mm; không gò nguội quá tay làm biến cứng vùng mép.", "Draw in gradually, slope ≤ 12/300."), ref: "AWS 7.21.3" },
      { p: B("Góc vát thiếu / root face quá dày", "Insufficient bevel / thick root face"), f: B("Mài/dũi mở thêm đúng góc WPS rồi kiểm lại bằng dưỡng; root face mài xuống giá trị bản vẽ ±2mm.", "Grind/gouge to WPS angle; dress root face to drawing ±2mm."), ref: "AWS Fig 7.3" },
      { p: B("Tack hàn nứt / quá nhỏ", "Cracked/undersized tacks"), f: B("Mài bỏ tack lỗi, hàn lại bằng thợ có chứng chỉ theo WPS; tack nằm trong mối hàn chính phải đạt chất lượng như mối chính.", "Remove defective tacks; re-tack per WPS by qualified welder."), ref: "AWS 7.18" },
      { p: B("Gá ép cứng gây ứng suất", "Over-restrained assembly"), f: B("Dùng đồ gá/nêm/bu lông giữ vị trí, chừa lượng dư co rút theo tính toán; trình tự hàn cân đối để tránh nứt do kẹp cứng.", "Use jigs with shrinkage allowance; balanced sequence."), ref: "AWS 7.21.6 + module Lượng dư" }
    ]
  };

  void FITUP_MOVED;
  window.HAN_DATA = { version: "1.1", STDS, EXC_MAP, WELD_VT, NDT, CHECKLIST, SYMBOLS };
})();
