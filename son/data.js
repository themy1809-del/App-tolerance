/* ============================================================================
   MODULE SƠN — DỮ LIỆU QC SƠN PHỦ KẾT CẤU THÉP
   v1.0 — Nguồn:
   - EN 1090-2:2018+A1:2024, 10.2 + Table 22 (preparation grade — đã xác minh)
   - ISO 8501-1 (cấp làm sạch), ISO 8501-3 (P1–P3), ISO 8502 (muối/bụi),
     ISO 8503 (độ nhám), ISO 8504 (phương pháp chuẩn bị)
   - ISO 19840 (đo DFT), SSPC-PA2 (thực hành Mỹ)
   - ISO 4624 (pull-off), ISO 2409 (cross-cut), ISO 4628 (đánh giá xuống cấp)
   - ISO 12944-1/-2/-5:2017/2018 (hệ sơn bảo vệ)
   Lưu ý: các mục không có PDF gốc trong dự án được đánh dấu soft:true —
   đối chiếu bản gốc trước khi dùng làm căn cứ nghiệm thu chính thức.
   ============================================================================ */
(function () {
  const B = (vi, en) => ({ vi, en });

  /* ---------- 1. CHUẨN BỊ BỀ MẶT ---------- */
  const SURFACE = {
    rustGrades: {
      title: B("Cấp gỉ ban đầu của thép — ISO 8501-1", "Initial rust grades — ISO 8501-1"),
      rows: [
        { g: "A", d: B("Bề mặt phủ kín vảy cán (mill scale) bám chắc, hầu như không gỉ", "Steel surface largely covered with adhering mill scale, little if any rust") },
        { g: "B", d: B("Bắt đầu gỉ, vảy cán bắt đầu bong", "Steel surface which has begun to rust and from which mill scale has begun to flake") },
        { g: "C", d: B("Vảy cán đã gỉ hết hoặc cạo được, có ít rỗ nhìn thấy", "Mill scale rusted away or can be scraped, slight pitting visible") },
        { g: "D", d: B("Vảy cán gỉ hết, rỗ gỉ nhìn thấy rõ toàn bề mặt", "Mill scale rusted away, general pitting visible") }
      ],
      ref: "ISO 8501-1, mục 4 — so sánh bằng ảnh chuẩn", soft: true
    },
    blastGrades: {
      title: B("Cấp làm sạch bề mặt — ISO 8501-1", "Surface cleanliness grades — ISO 8501-1"),
      rows: [
        { g: "Sa 1", m: B("Phun hạt nhẹ", "Light blast-cleaning"), d: B("Loại bỏ vảy cán, gỉ, sơn cũ, tạp chất BÁM LỎNG", "Loose mill scale, rust, paint coatings and foreign matter removed"), use: B("Ít dùng cho sơn hệ bảo vệ", "Rarely specified for protective systems") },
        { g: "Sa 2", m: B("Phun hạt kỹ", "Thorough blast-cleaning"), d: B("Loại bỏ HẦU HẾT vảy cán, gỉ, sơn, tạp chất; phần còn lại phải bám chắc", "Most mill scale, rust, coatings removed; residues firmly adhering"), use: B("Hệ sơn yêu cầu thấp", "Lower-demand systems") },
        { g: "Sa 2½", m: B("Phun hạt rất kỹ", "Very thorough blast-cleaning"), d: B("Chỉ còn vết bẩn dạng đốm/sọc nhẹ (light shadows/stains); ≥ 95% sạch", "Remaining traces only as slight stains in form of spots or stripes"), use: B("⭐ Cấp PHỔ BIẾN NHẤT cho sơn epoxy/zinc-rich kết cấu thép", "Most common grade for structural steel coating") },
        { g: "Sa 3", m: B("Phun hạt tới thép sạch trắng", "Blast to visually clean steel"), d: B("Bề mặt kim loại sạch đồng nhất, không vết bẩn", "Uniform metallic colour, free of all visible contamination"), use: B("Môi trường cực khắc nghiệt (CX, Im), metallizing", "Extreme environments (CX, Im), metal spray") },
        { g: "St 2", m: B("Cạo/chải tay kỹ", "Thorough hand/power tool cleaning"), d: B("Loại bỏ lớp bám lỏng bằng dụng cụ tay/máy", "Loose layers removed by hand/power tools"), use: B("Sửa chữa cục bộ, vùng khó tiếp cận", "Touch-up, limited access") },
        { g: "St 3", m: B("Cạo/chải máy rất kỹ", "Very thorough hand/power tool cleaning"), d: B("Như St 2 nhưng bề mặt có ánh kim rõ", "As St 2 but with pronounced metallic sheen"), use: B("Sửa chữa cục bộ chất lượng cao hơn", "Higher-quality touch-up") }
      ],
      ref: "ISO 8501-1 — đánh giá bằng mắt so với ảnh chuẩn, NGAY TRƯỚC khi sơn", soft: true
    },
    prepGrades: {
      title: B("Cấp chuẩn bị mối hàn/cạnh P1–P3 — EN 1090-2 Table 22 (đã xác minh)", "Preparation grades P1–P3 — EN 1090-2 Table 22 (verified)"),
      note: B("EN 1090-2, 10.2: nếu tuổi thọ chống ăn mòn & cấp ăn mòn được chỉ định, cấp chuẩn bị theo EN ISO 8501-3 phải theo Table 22. Nếu không chỉ định: áp dụng P1.",
        "EN 1090-2, 10.2: where expected life & corrosivity category specified, preparation grade per EN ISO 8501-3 shall accord with Table 22. Otherwise P1 applies."),
      rows: [
        { life: B("> 15 năm", "> 15 years"), cat: "C1", p: "P1" },
        { life: B("> 15 năm", "> 15 years"), cat: "C2–C3", p: "P2" },
        { life: B("> 15 năm", "> 15 years"), cat: B("Trên C3", "Above C3"), p: B("P2 hoặc P3 theo chỉ định", "P2 or P3 as specified") },
        { life: B("7–15 năm", "7–15 years"), cat: "C1–C3", p: "P1" },
        { life: B("7–15 năm", "7–15 years"), cat: B("Trên C3", "Above C3"), p: "P2" },
        { life: B("< 7 năm", "< 7 years"), cat: B("Mọi cấp", "All"), p: "P1" }
      ],
      pDesc: [
        { p: "P1", d: B("Chuẩn bị nhẹ: sạch spatter BÁM LỎNG, mép cắt chỉ cần làm cùn (deburr), mối hàn không cần sửa biên dạng", "Light: free of loose spatter; edges deburred; no weld profile dressing") },
        { p: "P2", d: B("Chuẩn bị kỹ: sạch spatter rời + bám nhẹ; mài bỏ cạnh sắc mối hàn; mép cắt vê tròn/vát ≥ 1mm mỗi phía; crater hở đủ cho sơn thấm", "Thorough: loose + lightly adhering spatter removed; sharp weld profiles dressed; edges rounded/chamfered ≥ 1mm each side") },
        { p: "P3", d: B("Chuẩn bị rất kỹ: sạch TOÀN BỘ spatter; mối hàn mài trơn (hoặc bo tròn/vát 3 đường); KHÔNG còn rỗ nhìn thấy; mép tròn r ≥ 2mm hoặc vát 3 đường ≥ 2mm mỗi phía. Lưu ý: P3 có thể không đạt được với thép < 3mm", "Very thorough: ALL spatter removed; weld topography smooth; no visible pores; edges rounded r ≥ 2mm or 3-pass chamfered ≥ 2mm each side") }
      ],
      quote: "Table 22 (EN 1090-2): >15 years: C1→P1, C2-C3→P2, above C3→P2 or P3; 7-15 years: C1-C3→P1, above C3→P2; <7 years→P1. — ISO 8501-3:2025 Table 1: P3 'Surface shall be free of all welding spatter... Edges shall be rounded with a radius of not less than 2 mm or by 3 passes chamfering at least 2 mm from each side.'",
      ref: "EN 1090-2:2018+A1:2024, 10.2 & Table 22 + ISO 8501-3:2025, Table 1 — cả hai đã đối chiếu bản gốc PDF"
    },
    profile: {
      title: B("Độ nhám bề mặt sau phun — ISO 8503", "Surface profile after blasting — ISO 8503"),
      rows: [
        { g: B("Mịn (Fine)", "Fine"), d: B("Profile ≤ segment 1 comparator; Ry5 khoảng 25–60 µm", "Profile up to comparator segment 1 (~25–60 µm)") },
        { g: B("Trung bình (Medium)", "Medium"), d: B("Ry5 khoảng 60–100 µm — ⭐ phổ biến cho hệ sơn kết cấu (NDFT 200–320 µm)", "~60–100 µm — common for structural systems") },
        { g: B("Thô (Coarse)", "Coarse"), d: B("Ry5 khoảng 100–150 µm — cho hệ sơn dày, metallizing", "~100–150 µm — thick systems, metal spray") }
      ],
      note: B("Đo bằng comparator (ISO 8503-1/-2), replica tape (ISO 8503-5) hoặc stylus. Profile quá thô → đỉnh nhọn xuyên màng sơn (rust rash); quá mịn → giảm bám dính.",
        "Measure by comparator, replica tape (ISO 8503-5) or stylus. Too coarse → peaks penetrate film; too smooth → poor adhesion."),
      ref: "ISO 8503-1/-2/-5", soft: true
    },
    contamination: {
      title: B("Tạp chất bề mặt trước sơn — ISO 8502", "Surface contamination before painting — ISO 8502"),
      rows: [
        { t: B("Muối hòa tan (Bresle test)", "Soluble salts (Bresle)"), lim: B("Thông dụng: ≤ 50 mg/m² NaCl tương đương cho hệ ngâm nước/zinc-rich; ≤ 100 mg/m² môi trường khí quyển (giới hạn cụ thể theo spec sơn/dự án)", "Typical: ≤ 50 mg/m² for immersion/zinc-rich; ≤ 100 mg/m² atmospheric (per project/PDS)"), m: "ISO 8502-6 + 8502-9" },
        { t: B("Bụi (dust tape test)", "Dust (tape test)"), lim: B("Thông dụng: cấp bụi ≤ 2 và cỡ hạt ≤ class 2 (so ảnh chuẩn)", "Typical: dust quantity rating ≤ 2, size class ≤ 2"), m: "ISO 8502-3" },
        { t: B("Dầu mỡ", "Oil & grease"), lim: B("Không nhìn thấy / không phát hiện (test nước phun, UV, dung môi)", "None visible/detectable"), m: B("Đánh giá trực quan / SSPC-SP1 làm sạch dung môi trước phun hạt", "Visual / SSPC-SP1 solvent clean before blasting") }
      ],
      ref: "ISO 8502 series", soft: true
    }
  };

  /* ---------- 2. ĐIỀU KIỆN MÔI TRƯỜNG ---------- */
  const ENV = {
    rules: [
      { t: B("Nhiệt độ bề mặt thép ≥ điểm sương + 3°C", "Steel temperature ≥ dew point + 3°C"), d: B("Quy tắc nền tảng chống ngưng tụ ẩm trên bề mặt khi phun hạt VÀ khi sơn. Đo bằng nhiệt kế tiếp xúc bề mặt + máy đo điểm sương (hoặc whirling hygrometer + bảng tra).", "Fundamental anti-condensation rule for blasting AND painting."), ref: "ISO 8502-4 / thực hành ISO 12944-7; PDS từng hãng sơn" },
      { t: B("Độ ẩm tương đối RH ≤ 85%", "Relative humidity ≤ 85%"), d: B("Giới hạn phổ biến khi phun hạt & sơn (một số sơn đặc biệt: ethyl silicate zinc cần RH ≥ 50% để đóng rắn — đọc PDS!).", "Common limit for blasting & painting (note: ethyl silicate zinc needs RH ≥ 50% to cure — read PDS!)."), ref: "ISO 12944-7 / PDS" },
      { t: B("Nhiệt độ không khí & bề mặt trong dải PDS", "Air & surface temp within PDS range"), d: B("Epoxy thông dụng: tối thiểu +5°C (loại đông cứng nhanh có thể −5°C); tối đa bề mặt thường 40–50°C. Dưới nhiệt độ tối thiểu → không đóng rắn, bám dính kém.", "Typical epoxy: min +5°C; max surface 40–50°C. Below min → no cure."), ref: B("PDS nhà sản xuất (Jotun/Hempel/International...)", "Manufacturer PDS") },
      { t: B("Không sơn khi: mưa/sương mù, gió mạnh, bề mặt ướt", "No painting in rain/fog, strong wind, wet surface"), d: B("Phun ngoài trời gió mạnh → dry spray + overspray. Che chắn hoặc dừng thi công.", "Strong wind outdoors → dry spray + overspray."), ref: "ISO 12944-7" },
      { t: B("Thời gian phủ lại (overcoat interval) đúng PDS", "Overcoat intervals per PDS"), d: B("Tối thiểu & tối đa theo nhiệt độ. Quá hạn tối đa (đặc biệt epoxy/PU) → phải tạo nhám (sweep blast/sand). Zinc silicate trước khi phủ phải đạt độ cứng & xử lý zinc salts.", "Min & max per temperature. Exceeded max → abrade before overcoating."), ref: "PDS" }
    ],
    measure: B("Tần suất đo thông dụng: đầu ca + mỗi 2–4 giờ, và khi thời tiết thay đổi. Ghi: nhiệt độ khí, nhiệt độ thép, RH, điểm sương, chênh lệch Ts−Td.",
      "Typical frequency: start of shift + every 2–4 h and on weather change. Record: air temp, steel temp, RH, dew point, Ts−Td.")
  };

  /* ---------- 3. DFT — CHIỀU DÀY MÀNG SƠN ---------- */
  const DFT = {
    iso19840: {
      title: B("Quy tắc nghiệm thu DFT — ISO 19840:2012, mục 9 (ĐÃ XÁC MINH bản gốc)", "DFT acceptance — ISO 19840:2012, Clause 9 (verified)"),
      rules: [
        B("a) TRUNG BÌNH cộng của mọi giá trị DFT đơn lẻ ≥ NDFT (chiều dày danh nghĩa).", "a) Arithmetic mean of all individual DFT ≥ NDFT."),
        B("b) MỌI giá trị đơn lẻ ≥ 80% NDFT.", "b) All individual values ≥ 80% NDFT."),
        B("c) Số điểm có giá trị trong khoảng 80%–100% NDFT phải DƯỚI 20% tổng số điểm đo.", "c) Readings between 80% and 100% NDFT must be FEWER than 20% of total measurements."),
        B("d) Mọi giá trị ≤ chiều dày tối đa quy định; nếu spec không nêu → theo ISO 12944-5 (thông lệ ≤ 3× NDFT).", "d) All values ≤ specified maximum; if unspecified see ISO 12944-5 (commonly ≤ 3× NDFT)."),
        B("Hiệu chỉnh độ nhám (Table 2): trừ vào TỪNG số đọc — Fine 10 µm · Medium 25 µm · Coarse 40 µm; KHÔNG RÕ profile → 25 µm.", "Roughness correction (Table 2) subtracted from EACH reading — Fine 10 · Medium 25 · Coarse 40 µm; unknown profile → 25 µm."),
        B("Hiệu chuẩn (6.2): kiểm trên tấm thép trần (zero) + foil chuẩn trên và dưới dải NDFT; kiểm lại sau loạt đo — lệch thì LOẠI kết quả.", "Verify on uncoated plate (zero) + foils above/below NDFT; re-verify after series — out of range → reject results."),
        B("Điểm không đạt được đo lại 1 lần trong phạm vi 10mm (6.3); số lần thay tối đa theo Table 1 và phải ghi vào báo cáo.", "Failed reading may be re-measured once within 10mm (6.3); max replacements per Table 1, recorded in report.")
      ],
      sampling: B("Số điểm đo tối thiểu (Table 1 — đã xác minh): ≤1m²: 5 điểm · 1–3m²: 10 · 3–10m²: 15 · 10–30m²: 20 · 30–100m²: 30 · trên 100m²: +10 điểm cho mỗi 100m². Khu vực khó (sườn, bracket, ống đính kèm) đo BỔ SUNG theo diện tích của nó.",
        "Minimum measurements (Table 1 — verified): ≤1m²: 5 · 1–3: 10 · 3–10: 15 · 10–30: 20 · 30–100: 30 · above 100m²: +10 per 100m². Difficult areas measured additionally."),
      quote: "9 a) the arithmetic mean of all the individual dry-film thicknesses shall be equal to or greater than the NDFT; b) all individual dry-film thicknesses shall be equal to or above 80 % of the NDFT; c) individual dry-film thicknesses between 80 % of the NDFT and the NDFT are acceptable provided that the number of these measurements is less than 20 % of the total number; d) all individual dry-film thicknesses shall be less than or equal to the specified maximum.",
      ref: "ISO 19840:2012, Clause 6–9, Tables 1–2 — đã đối chiếu bản gốc PDF"
    },
    sspc: {
      title: B("SSPC-PA2 (thực hành Mỹ)", "SSPC-PA2 (US practice)"),
      rules: [
        B("Gage reading: 1 số đọc. Spot measurement: trung bình ≥ 3 số đọc trong vòng tròn Ø 4cm.", "Spot = average of ≥ 3 gage readings within 4 cm circle."),
        B("Area: 5 spot trong mỗi 10 m² (100 ft²); kết cấu < 30 m² đo từng 10 m²; lớn hơn: lấy mẫu ngẫu nhiên theo PA2.", "5 spots per 10 m² (100 ft²); sampling per PA2 for large areas."),
        B("Mặc định (Restriction Level 3): spot trong khoảng 80–120% của dải DFT quy định; trung bình area trong dải quy định. Hợp đồng có thể chỉ định Level 1–5 khác.", "Default Level 3: spots within 80–120% of specified range; area average within range. Levels 1–5 selectable by contract.")
      ],
      ref: "SSPC-PA2:2022 — Procedure for Determining Conformance to Dry Coating Thickness Requirements", soft: true
    }
  };

  /* ---------- 4. KIỂM TRA KHÁC (bám dính, holiday, cure) ---------- */
  const TESTS = [
    {
      id: "pulloff", name: B("Độ bám dính kéo nhổ (Pull-off)", "Pull-off adhesion"), std: "ISO 4624 / ASTM D4541",
      crit: B("Giá trị thông dụng cho hệ sơn kết cấu: ≥ 3 MPa (C3–C5); hệ ngâm nước/đặc biệt ≥ 5 MPa. GIÁ TRỊ CHÍNH THỨC theo spec dự án/PDS. Ghi cả kiểu phá hủy (adhesive/cohesive/glue).",
        "Common: ≥ 3 MPa (C3–C5); immersion ≥ 5 MPa. Official value per project spec/PDS. Record failure mode."),
      how: B("Dán dolly Ø 20mm bằng keo epoxy, chờ đóng rắn, kéo bằng máy thủy lực vuông góc. Test phá hủy → sửa lại điểm test.", "Glue 20mm dolly, pull perpendicular with hydraulic tester. Destructive — repair test spots."),
      soft: true
    },
    {
      id: "crosscut", name: B("Rạch ô vuông (Cross-cut)", "Cross-cut test"), std: "ISO 2409 / ASTM D3359",
      crit: B("Phân loại 0–5: Class 0 (mép cắt hoàn toàn nhẵn) & Class 1 (bong < 5% diện tích ô) thường ĐẠT. Khoảng cách rạch theo DFT: ≤ 60µm → 1mm; 61–120µm → 2mm; 121–250µm → 3mm. KHÔNG áp dụng cho DFT > 250µm (dùng pull-off).",
        "Class 0–1 usually PASS. Cut spacing: ≤60µm→1mm; 61–120→2mm; 121–250→3mm. Not for DFT > 250µm — use pull-off."),
      how: B("Rạch 6 đường × 2 hướng vuông góc, chải/dán băng keo chuẩn, so ảnh chuẩn ISO 2409.", "6 cuts × 2 directions, brush/tape, compare with ISO 2409 chart."),
      soft: true
    },
    {
      id: "holiday", name: B("Dò lỗ kim (Holiday/Pinhole)", "Holiday detection"), std: "ISO 29601 / NACE SP0188 / ASTM D5162",
      crit: B("Hệ ngâm nước/chôn đất: 0 holiday. Điện áp thử (high-voltage spark, DFT > 500µm): thông dụng 5V/µm; low-voltage wet sponge (≤ 500µm): 9–90V theo DFT. Điện áp đúng để không đánh thủng màng tốt.",
        "Immersion/buried: zero holidays. HV spark ~5V/µm (>500µm); wet sponge 9–90V (≤500µm)."),
      how: B("Quét đầu dò đều khắp bề mặt, đánh dấu điểm kêu, sửa & test lại.", "Scan entire surface, mark alarms, repair & retest."),
      soft: true
    },
    {
      id: "cure", name: B("Kiểm tra đóng rắn & ngoại quan màng", "Cure & film appearance"), std: B("PDS / ISO 12944-7", "PDS / ISO 12944-7"),
      crit: B("Màng đều màu, không lỗi (chảy, lỗ kim, bụi bám, dry spray...); đủ thời gian đóng rắn trước nghiệm thu/vận chuyển; zinc silicate: test MEK rub (ASTM D4752) độ cứng đạt mức 4–5.",
        "Uniform film, defect-free; cured before handling; zinc silicate: MEK rub test (ASTM D4752) rating 4–5."),
      how: B("Quan sát dưới ánh sáng đủ; kiểm tra theo checklist lỗi sơn (tab Lỗi sơn).", "Visual under adequate light; see defect tab."),
      soft: true
    }
  ];

  /* ---------- 5. LỖI SƠN (DEFECTS) ---------- */
  const DEFECTS = [
    { id: "sag", name: B("Chảy sơn (Sagging/Runs)", "Sagging / runs"), grp: "APP",
      sym: B("Vệt chảy, giọt đọng trên bề mặt đứng", "Curtains, drips on vertical surfaces"),
      cause: B("Sơn quá dày 1 lượt; pha loãng quá mức; súng quá gần; nhiệt độ thấp làm sơn lâu khô", "Excessive wet film; over-thinning; gun too close; low temp"),
      fix: B("Còn ướt: lăn/chải lại. Đã khô: mài phẳng + sơn lại", "Wet: re-brush. Dry: sand flat + recoat"),
      accept: B("Thường không chấp nhận ở bề mặt hoàn thiện; mức độ theo spec ngoại quan dự án", "Generally rejected on finish surfaces") },
    { id: "orange", name: B("Da cam (Orange peel)", "Orange peel"), grp: "APP",
      sym: B("Bề mặt lồi lõm như vỏ cam", "Dimpled texture like orange skin"),
      cause: B("Atomize kém (áp lực thấp, sơn đặc), súng xa, dung môi bay quá nhanh", "Poor atomization, gun too far, fast solvent"),
      fix: B("Nhẹ: chấp nhận được nếu DFT đạt. Nặng: mài + sơn lại", "Light: acceptable if DFT ok. Heavy: sand + recoat"),
      accept: B("Chấp nhận nếu DFT & độ che phủ đạt, trừ khi spec ngoại quan cao", "Acceptable if DFT met unless high cosmetic spec") },
    { id: "pinhole", name: B("Lỗ kim (Pinholes)", "Pinholes"), grp: "FILM",
      sym: B("Lỗ nhỏ li ti xuyên màng", "Tiny holes through film"),
      cause: B("Khí/dung môi thoát khi màng đang khô; sơn lên bề mặt rỗ/zinc silicate không mist coat; nhiệt độ cao", "Solvent/air escape; porous substrate or zinc silicate without mist coat; high temp"),
      fix: B("Mài + sơn lại; trên zinc silicate: mist coat trước full coat", "Sand + recoat; mist coat over zinc silicate"),
      accept: B("Hệ ngâm/chôn: 0 (holiday test). Khí quyển: theo spec, thường phải sửa", "Immersion: zero. Atmospheric: per spec") },
    { id: "crater", name: B("Mắt cá / lõm tròn (Fish eyes/Cratering)", "Fish eyes / cratering"), grp: "FILM",
      sym: B("Lõm tròn, giữa thường lộ nền", "Round depressions exposing substrate"),
      cause: B("Nhiễm dầu/silicone/mỡ trên bề mặt hoặc trong khí nén", "Oil/silicone contamination on surface or in air supply"),
      fix: B("Dừng, tìm nguồn nhiễm (tách dầu máy nén!), làm sạch dung môi, sơn lại", "Stop, find source (compressor oil trap!), solvent clean, recoat"),
      accept: B("Không chấp nhận — phải sửa", "Not acceptable — repair") },
    { id: "blister", name: B("Phồng rộp (Blistering)", "Blistering"), grp: "FAIL",
      sym: B("Bọng phồng chứa lỏng/khí dưới màng", "Dome-shaped blisters under film"),
      cause: B("Muối hòa tan dưới màng (osmotic); ẩm khi sơn; dung môi kẹt; ngâm nước sớm", "Soluble salts (osmosis); moisture during application; retained solvent"),
      fix: B("Đánh giá theo ISO 4628-2 (mật độ 2-5, cỡ 2-5); cạo bỏ vùng phồng tới mép bám chắc, xử lý bề mặt + muối, sơn lại", "Rate per ISO 4628-2; remove to sound edge, treat salts, recoat"),
      accept: B("Mức 0 (không phồng) khi nghiệm thu mới; bảo hành theo ISO 4628-2", "Zero at handover; warranty per ISO 4628-2") },
    { id: "crack", name: B("Nứt màng (Cracking)", "Cracking"), grp: "FAIL",
      sym: B("Vết nứt trên/xuyên màng (đánh giá ISO 4628-4)", "Cracks in/through film (ISO 4628-4)"),
      cause: B("Màng quá dày (nhất là zinc silicate > 2× NDFT); sơn cứng phủ trên sơn mềm; thời tiết/UV; co ngót", "Excess DFT (esp. zinc silicate); hard over soft coat; weathering"),
      fix: B("Loại bỏ vùng nứt tới lớp bám chắc/thép, sơn lại đúng hệ", "Remove to sound coat/steel, reinstate system"),
      accept: B("Mức 0 khi nghiệm thu", "Zero at handover") },
    { id: "flake", name: B("Bong tróc (Flaking/Peeling)", "Flaking / peeling"), grp: "FAIL",
      sym: B("Màng tách khỏi nền hoặc giữa các lớp (ISO 4628-5)", "Film detaches from substrate or between coats (ISO 4628-5)"),
      cause: B("Bề mặt bẩn/nhám kém; quá hạn overcoat; amine blush epoxy không xử lý; ngưng tụ giữa các lớp", "Poor prep; exceeded overcoat window; amine blush; condensation between coats"),
      fix: B("Cạo tới mép bám chắc (feather edge), xử lý bề mặt, sơn lại", "Remove to sound edge, prep, recoat"),
      accept: B("Không chấp nhận", "Not acceptable") },
    { id: "rust_rash", name: B("Gỉ điểm xuyên màng (Rust rash/spotting)", "Rust rash / spotting"), grp: "FAIL",
      sym: B("Chấm gỉ li ti xuyên màng (đánh giá Ri theo ISO 4628-3)", "Pinpoint rust through film (Ri rating ISO 4628-3)"),
      cause: B("DFT thiếu trên đỉnh profile thô; profile quá thô so với NDFT; bỏ sót stripe coat cạnh/bu lông", "Low DFT over coarse profile peaks; missed stripe coats"),
      fix: B("Làm sạch điểm gỉ, sơn dặm đủ DFT", "Spot clean, touch-up to DFT"),
      accept: B("Ri 0 khi nghiệm thu mới (ISO 4628-3)", "Ri 0 at handover (ISO 4628-3)") },
    { id: "dryspray", name: B("Phun khô (Dry spray)", "Dry spray"), grp: "APP",
      sym: B("Bề mặt nhám cát, xốp, kém bóng", "Sandy, rough, porous surface"),
      cause: B("Súng quá xa/gió mạnh; dung môi bay trước khi hạt sơn chạm bề mặt; nhiệt độ cao", "Gun too far/wind; solvent flash-off before droplets land; heat"),
      fix: B("Nhẹ: chà nhám tạo phẳng + sơn phủ. Nặng: loại bỏ + sơn lại", "Light: sand + overcoat. Heavy: remove + recoat"),
      accept: B("Không chấp nhận trên diện rộng — màng xốp giảm bảo vệ", "Not acceptable extensively — porous film") },
    { id: "overspray", name: B("Bụi sơn bám (Overspray)", "Overspray"), grp: "APP",
      sym: B("Hạt sơn khô bám lên bề mặt đã sơn xung quanh", "Dry paint particles on adjacent surfaces"),
      cause: B("Không che chắn; gió; phun quá áp", "No masking; wind; over-pressure"),
      fix: B("Còn mềm: lau dung môi. Khô: chà nhám mịn", "Soft: solvent wipe. Dry: fine sand"),
      accept: B("Theo spec ngoại quan; phải xử lý nếu ảnh hưởng lớp kế/bám bẩn", "Per cosmetic spec") },
    { id: "popping", name: B("Nổ dung môi (Solvent popping)", "Solvent popping"), grp: "FILM",
      sym: B("Bọt vỡ li ti, miệng núi lửa nhỏ", "Burst bubbles, small craters"),
      cause: B("Dung môi kẹt thoát ra khi bề mặt đã se: màng quá dày, nhiệt cao, sai thinner, không đủ flash-off giữa các passes", "Trapped solvent escaping after skin-over: too thick, heat, wrong thinner"),
      fix: B("Mài + sơn lại với WFT/thinner/flash-off đúng", "Sand + recoat with correct WFT/thinner/flash-off"),
      accept: B("Không chấp nhận — màng bị xuyên thủng cục bộ", "Not acceptable") },
    { id: "wrinkle", name: B("Nhăn màng (Wrinkling)", "Wrinkling"), grp: "FILM",
      sym: B("Bề mặt nhăn nheo khi khô", "Wrinkled skin on drying"),
      cause: B("Màng quá dày khô mặt trước khô sâu (alkyd); nhiệt cao; sơn lớp kế quá sớm", "Surface dries before bulk (alkyds, heat, premature recoat)"),
      fix: B("Loại bỏ + sơn lại đúng WFT", "Remove + recoat at correct WFT"),
      accept: B("Không chấp nhận", "Not acceptable") },
    { id: "chalk", name: B("Phấn hóa (Chalking)", "Chalking"), grp: "AGE",
      sym: B("Bột phấn trên mặt sơn (ISO 4628-6), phai màu", "Powder on surface (ISO 4628-6), fading"),
      cause: B("UV phân hủy nhựa epoxy (epoxy ngoài trời LUÔN phấn hóa); chọn sai topcoat", "UV degradation of epoxy binder; wrong topcoat outdoors"),
      fix: B("Rửa sạch phấn, kiểm tra DFT còn lại, phủ PU/acrylic chống UV", "Wash off, check residual DFT, overcoat with PU/acrylic"),
      accept: B("Hiện tượng lão hóa — đánh giá theo bảo hành; phòng bằng topcoat PU", "Ageing phenomenon — prevent with PU topcoat") },
    { id: "amine", name: B("Mồ hôi amine (Amine blush)", "Amine blush"), grp: "FILM",
      sym: B("Màng epoxy có lớp nhờn/mờ như sáp", "Greasy/waxy haze on epoxy"),
      cause: B("Epoxy đóng rắn ở nhiệt thấp + ẩm cao → amine carbamate trên bề mặt → lớp kế không bám", "Epoxy curing in cold + humid → carbamate layer → poor intercoat adhesion"),
      fix: B("Rửa nước ấm + chà; bắt buộc trước khi sơn lớp kế", "Wash with warm water + abrade before next coat"),
      accept: B("Phải loại bỏ trước lớp kế — nếu không sẽ bong tróc giữa lớp", "Must remove before overcoating") },
    { id: "zincsalt", name: B("Muối kẽm (Zinc salts/white rust)", "Zinc salts / white rust"), grp: "FILM",
      sym: B("Lớp trắng xám trên sơn giàu kẽm/mạ kẽm để lâu", "White deposits on aged zinc-rich/galvanized"),
      cause: B("Zinc phản ứng với ẩm + CO2 khi chưa phủ lớp kế", "Zinc reacts with moisture + CO2 before overcoating"),
      fix: B("Rửa nước áp lực + chà nylon; kiểm sạch trước khi phủ", "Pressure wash + nylon brush before overcoat"),
      accept: B("Phải loại bỏ trước lớp kế", "Remove before overcoating") },
    { id: "lowdft", name: B("DFT thiếu / quá dày", "Low / excessive DFT"), grp: "FILM",
      sym: B("Đo DFT dưới 80% NDFT hoặc vượt max spec", "DFT below 80% NDFT or above max"),
      cause: B("Kỹ thuật phun không đều; bỏ sót stripe coat; đè nhiều passes góc/cạnh", "Uneven application; missed stripes; corner build-up"),
      fix: B("Thiếu: sơn bổ sung (xem overcoat window). Quá dày: đánh giá nguy cơ nứt/dung môi kẹt theo PDS — có thể phải loại bỏ", "Low: additional coat. High: assess per PDS — may remove"),
      accept: B("Theo quy tắc ISO 19840 (trung bình ≥ NDFT, đơn lẻ ≥ 80%) — xem tab DFT", "Per ISO 19840 rules — see DFT tab") }
  ];

  /* ---------- 6. HỆ SƠN ISO 12944 ---------- */
  const ISO12944 = {
    cats: [
      { c: "C1", env: B("Trong nhà khô, sạch (văn phòng, trường học)", "Heated buildings, clean atmospheres") },
      { c: "C2", env: B("Khí quyển ô nhiễm thấp, nông thôn", "Low pollution, rural areas") },
      { c: "C3", env: B("Đô thị & công nghiệp vừa, ven biển độ mặn thấp", "Urban/industrial moderate, low-salinity coastal") },
      { c: "C4", env: B("Công nghiệp, ven biển độ mặn vừa", "Industrial, coastal moderate salinity") },
      { c: "C5", env: B("Công nghiệp khắc nghiệt ẩm cao, ven biển độ mặn cao", "Very high industrial humidity, high-salinity coastal") },
      { c: "CX", env: B("Ngoài khơi, nhiệt đới ẩm cực khắc nghiệt", "Offshore, extreme tropical") },
      { c: "Im1–Im4", env: B("Ngâm nước ngọt / biển / chôn đất / + bảo vệ cathodic", "Immersion fresh/sea water, buried, with CP") }
    ],
    durability: {
      note: B("Tuổi thọ hệ sơn theo ISO 12944-1:2017 — KHÔNG phải thời gian bảo hành, là khoảng kỹ thuật đến lần bảo trì lớn đầu tiên (Ri3).", "Durability per ISO 12944-1:2017 — technical range to first major maintenance (Ri3), not a warranty."),
      rows: [
        { k: "Low (L)", v: B("≤ 7 năm", "≤ 7 years") },
        { k: "Medium (M)", v: B("7–15 năm", "7–15 years") },
        { k: "High (H)", v: B("15–25 năm", "15–25 years") },
        { k: "Very High (VH)", v: B("> 25 năm", "> 25 years") }
      ]
    },
    systems: [
      { c: "C2 M", s: B("1×80µm alkyd primer + 1×80µm alkyd topcoat (160µm)", "Alkyd 2×80µm (160µm)") },
      { c: "C3 H", s: B("Epoxy zinc-rich 60 + epoxy MIO 100 + PU 60 (NDFT 220µm)", "Zn-epoxy 60 + epoxy MIO 100 + PU 60 (220µm)") },
      { c: "C4 H", s: B("Epoxy zinc-rich 60 + epoxy 140 + PU 60 (NDFT 260µm)", "Zn-epoxy 60 + epoxy 140 + PU 60 (260µm)") },
      { c: "C5 H", s: B("Epoxy zinc-rich 80 + epoxy MIO 160 + PU 80 (NDFT 320µm)", "Zn-epoxy 80 + epoxy MIO 160 + PU 80 (320µm)") },
      { c: "Im2", s: B("Epoxy không dung môi 2×200µm hoặc epoxy GF (NDFT ≥ 400µm) + holiday test", "Solvent-free epoxy 2×200µm (≥400µm) + holiday test") }
    ],
    sysNote: B("Hệ ví dụ minh họa theo ISO 12944-5:2018 — hệ chính thức phải lấy theo spec dự án & PDS hãng sơn.", "Illustrative examples per ISO 12944-5:2018 — official system per project spec & PDS."),
    soft: true
  };

  /* ---------- 7. CHECKLIST QC SƠN ---------- */
  const CHECKLIST = [
    {
      phase: B("TRƯỚC PHUN HẠT / SƠN", "BEFORE BLASTING / PAINTING"), icon: "📋",
      items: [
        { t: B("Spec hệ sơn + PDS + MSDS có tại hiện trường; sơn đúng mã, còn hạn, đúng batch", "Coating spec + PDS at site; correct product, in date, batch recorded"), ref: "ISO 12944-7" },
        { t: B("Bề mặt đã xử lý P1/P2/P3 đúng yêu cầu: mài mép, bỏ spatter, mài mối hàn", "P-grade achieved: edges, spatter, weld dressing"), ref: "EN 1090-2 Table 22 / ISO 8501-3" },
        { t: B("Tẩy dầu mỡ trước phun hạt (solvent clean)", "Degrease before blasting (solvent clean)"), ref: "SSPC-SP1" },
        { t: B("Hạt mài sạch, khô, đúng cỡ; khí nén không dầu/nước (blotter test)", "Abrasive clean/dry/graded; compressed air oil/water-free (blotter test)"), ref: "ISO 11124/11126; ASTM D4285" },
        { t: B("Đo điều kiện: Ts ≥ Td + 3°C, RH ≤ 85%, nhiệt độ trong dải PDS", "Environment: Ts ≥ Td+3°C, RH ≤ 85%, temps per PDS"), ref: "ISO 8502-4" },
        { t: B("Sau phun: cấp sạch đạt (Sa 2½...), profile đạt (replica tape), bụi ≤ cấp 2, muối ≤ giới hạn", "After blast: cleanliness, profile, dust ≤ 2, salts within limit"), ref: "ISO 8501-1 / 8503-5 / 8502-3 / 8502-9" },
        { t: B("Sơn lớp lót trong 4 giờ (hoặc trước khi gỉ lại / theo spec) sau phun hạt", "Prime within 4 h (or before re-rusting / per spec) after blasting"), ref: B("Thực hành phổ biến / spec dự án", "Common practice / project spec") }
      ]
    },
    {
      phase: B("TRONG KHI SƠN", "DURING PAINTING"), icon: "🎨",
      items: [
        { t: B("Trộn đúng tỷ lệ A:B, khuấy máy, đúng induction time & pot life", "Mix ratio correct, mechanical stir, induction time & pot life observed"), ref: "PDS" },
        { t: B("Stripe coat bằng chổi/rulo cho cạnh, bu lông, mối hàn, góc khuất TRƯỚC lớp phun", "Stripe coat edges, bolts, welds, corners before spray coat"), ref: "ISO 12944-7" },
        { t: B("Kiểm WFT bằng lược đo trong khi phun (WFT = NDFT/%VS × 100)", "Check WFT with comb during spraying"), ref: "ISO 2808" },
        { t: B("Theo dõi điều kiện môi trường mỗi 2–4h; dừng khi vượt giới hạn", "Monitor environment every 2–4 h; stop if out of limits"), ref: "ISO 8502-4" },
        { t: B("Tuân thủ thời gian phủ lại min/max theo nhiệt độ thực tế", "Observe min/max overcoat intervals at actual temp"), ref: "PDS" }
      ]
    },
    {
      phase: B("SAU KHI SƠN / NGHIỆM THU", "AFTER PAINTING / ACCEPTANCE"), icon: "✅",
      items: [
        { t: B("DFT từng lớp + tổng: trung bình ≥ NDFT, đơn lẻ ≥ 80% NDFT, ≤ max", "DFT per coat + total: mean ≥ NDFT, individual ≥ 80%, ≤ max"), ref: "ISO 19840 / SSPC-PA2" },
        { t: B("Ngoại quan 100%: không chảy, lỗ kim, dry spray, bụi bám, lộ nền, phồng", "Visual 100%: no sags, pinholes, dry spray, contamination, misses, blisters"), ref: "ISO 12944-7" },
        { t: B("Bám dính (nếu spec yêu cầu): pull-off ≥ giá trị spec / cross-cut Class 0–1", "Adhesion (if specified): pull-off ≥ spec / cross-cut 0–1"), ref: "ISO 4624 / ISO 2409" },
        { t: B("Holiday test cho hệ ngâm/chôn: 0 lỗi", "Holiday test for immersion/buried: zero defects"), ref: "ISO 29601" },
        { t: B("Sửa chữa vùng lỗi/hư hại vận chuyển theo quy trình sửa được duyệt", "Repair defects/transit damage per approved procedure"), ref: B("Spec dự án", "Project spec") },
        { t: B("Hồ sơ: nhật ký sơn (điều kiện, batch, DFT), báo cáo kiểm tra, ảnh", "Records: daily log (conditions, batches, DFT), inspection reports, photos"), ref: "ISO 12944-8" }
      ]
    }
  ];

  window.SON_DATA = { version: "1.0", SURFACE, ENV, DFT, TESTS, DEFECTS, ISO12944, CHECKLIST };
})();
