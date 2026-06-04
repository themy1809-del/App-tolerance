/* Thư viện joint codes + tiêu chí ĐẠT theo tiêu chuẩn quốc tế.
   Trích từ AWS D1.1:2020/2025, AWS D1.6:2017, AWS D1.3:2018,
   ASME VIII Div.1 §UW-35, ASME IX:2023, ISO 5817:2023, ISO 9692-1. */

/* =================== JOINT CODES (pre-qualified) ===================
   AWS D1.1 Figure 3.3 — pre-qualified joint details.
   Mỗi entry: code, prep, dims (group_angle, root_opening, root_face), backing, sketch_id. */
window.JOINT_CODES = {
  /* ===== BUTT — Single V Groove ===== */
  "B-U2a": {
    name_vi: "Butt – Single V Groove, có backing (B-U2a)",
    name_en: "Butt – Single V Groove with backing",
    code: "AWS D1.1 Fig.3.3",
    type: "Butt",
    sub: "Single V Groove",
    groove_angle: "45° ± 5°",
    root_opening: "6 mm (1/4\")",
    root_face: "0",
    backing: "Steel backing (giữ lại)",
    weld_type: "CJP (ngấu toàn phần)",
    note: "Cho mọi tư thế. Backing bằng tấm thép cùng vật liệu, hàn xuyên qua."
  },
  "B-U2c": {
    name_vi: "Butt – Single V Groove, có backing, tư thế 1G/2G (B-U2c)",
    name_en: "Butt – Single V Groove with backing, F/H only",
    code: "AWS D1.1 Fig.3.3",
    type: "Butt", sub: "Single V Groove",
    groove_angle: "30° ± 5°",
    root_opening: "10 mm (3/8\")",
    root_face: "0",
    backing: "Steel backing",
    weld_type: "CJP",
    positions: ["1G","2G"],
    note: "Chỉ tư thế phẳng & ngang. Khe hở rộng hơn để ngấu sâu."
  },
  "B-U3a": {
    name_vi: "Butt – Single V Groove, không backing (B-U3a)",
    name_en: "Butt – Single V Groove without backing",
    code: "AWS D1.1 Fig.3.3",
    type: "Butt", sub: "Single V Groove",
    groove_angle: "60° ± 5°",
    root_opening: "2–4 mm",
    root_face: "0–3 mm",
    backing: "Không (back gouge từ phía sau)",
    weld_type: "CJP",
    note: "Phải gouge gốc + hàn lại từ phía sau (back gouge) để đạt CJP."
  },
  "B-U3c": {
    name_vi: "Butt – Single V Groove, không backing, 1G/2G (B-U3c)",
    name_en: "Butt – Single V Groove no backing, F/H only",
    code: "AWS D1.1 Fig.3.3",
    type: "Butt", sub: "Single V Groove",
    groove_angle: "45° ± 5°",
    root_opening: "5–6 mm",
    root_face: "0–3 mm",
    backing: "Không",
    weld_type: "CJP",
    positions: ["1G","2G"]
  },
  /* ===== BUTT — Single Bevel ===== */
  "B-U4a": {
    name_vi: "Butt – Single Bevel Groove, có backing (B-U4a)",
    name_en: "Butt – Single Bevel with backing",
    code: "AWS D1.1 Fig.3.3",
    type: "Butt", sub: "Single Bevel Groove",
    groove_angle: "45° ± 5° (1 mặt)",
    root_opening: "6 mm",
    root_face: "0",
    backing: "Steel backing",
    weld_type: "CJP"
  },
  "B-U5a": {
    name_vi: "Butt – Single Bevel, không backing (B-U5a)",
    code: "AWS D1.1 Fig.3.3",
    type: "Butt", sub: "Single Bevel Groove",
    groove_angle: "45° ± 5°",
    root_opening: "2–4 mm",
    root_face: "0–3 mm",
    backing: "Không"
  },
  /* ===== BUTT — Double V / Double Bevel ===== */
  "B-U6": {
    name_vi: "Butt – Double V Groove (B-U6)",
    code: "AWS D1.1 Fig.3.3",
    type: "Butt", sub: "Double V Groove",
    groove_angle: "60° ± 5° (cả 2 mặt)",
    root_opening: "0–3 mm",
    root_face: "0–3 mm",
    backing: "Không (hàn 2 phía)",
    weld_type: "CJP",
    note: "Dùng cho tấm dày ≥ 25 mm. Hàn xen kẽ 2 mặt giảm méo."
  },
  "B-U8": {
    name_vi: "Butt – Double Bevel Groove (B-U8)",
    code: "AWS D1.1 Fig.3.3",
    type: "Butt", sub: "Double Bevel Groove",
    groove_angle: "45° ± 5° (cả 2 mặt)",
    root_opening: "0–3 mm",
    root_face: "0–3 mm",
    backing: "Không"
  },
  /* ===== PJP ===== */
  "BC-P5": {
    name_vi: "PJP – Single V Groove (BC-P5)",
    code: "AWS D1.1 Fig.3.4",
    type: "Butt/Corner", sub: "PJP – Single V",
    groove_angle: "60° ± 5°",
    root_opening: "0",
    root_face: "Bằng kích thước (S) — thiết kế",
    backing: "Không",
    weld_type: "PJP (ngấu một phần)",
    note: "Effective throat = depth of groove. Phải chỉ định kích thước S trên bản vẽ."
  },
  /* ===== T-CORNER ===== */
  "TC-U4a": {
    name_vi: "T-joint – Single Bevel Groove, có backing (TC-U4a)",
    code: "AWS D1.1 Fig.3.3",
    type: "T/Corner", sub: "Single Bevel Groove",
    groove_angle: "45° ± 5°",
    root_opening: "6 mm",
    root_face: "0",
    backing: "Steel backing",
    weld_type: "CJP",
    note: "Liên kết chữ T ngấu toàn phần — bản vẽ phải ghi rõ CJP."
  },
  "TC-U4b": {
    name_vi: "T-joint – Single Bevel Groove, không backing (TC-U4b)",
    code: "AWS D1.1 Fig.3.3",
    type: "T/Corner", sub: "Single Bevel Groove",
    groove_angle: "45° ± 5°",
    root_opening: "2–4 mm",
    root_face: "0–3 mm",
    backing: "Không (back gouge)"
  },
  /* ===== FILLET ===== */
  "FW": {
    name_vi: "Mối góc Fillet (FW)",
    code: "AWS D1.1 §2.4",
    type: "Fillet",
    sub: "Fillet Weld",
    groove_angle: "—",
    root_opening: "≤ 1.6 mm (giữa 2 mặt tiếp xúc)",
    root_face: "—",
    backing: "—",
    weld_size: "Theo bản vẽ (leg size)",
    note: "Kích thước chân (leg) tối thiểu theo Table 7.7 — dày 6mm cần leg ≥ 5mm; dày 12mm cần leg ≥ 6mm; dày >19mm cần leg ≥ 8mm."
  },
  /* ===== Tubular 6G (pipe) ===== */
  "B-U2-GF": {
    name_vi: "Pipe Butt – V Groove, 6G/6GR (B-U2-GF)",
    code: "AWS D1.1 §10",
    type: "Pipe Butt",
    sub: "Single V Groove",
    groove_angle: "60° ± 5° (37.5° mỗi mặt cho ống)",
    root_opening: "2–4 mm",
    root_face: "1.5–3 mm",
    backing: "Không (root pass GTAW thường)",
    weld_type: "CJP",
    note: "Ống tròn ổn định. Root pass GTAW, fill/cap FCAW."
  }
};

/* =================== TIÊU CHÍ ĐẠT (acceptance criteria) ===================
   Mỗi entry tương ứng với 1 code/standard. Có thể có sub_static / sub_cyclic. */
window.ACCEPTANCE = {
  "AWS D1.1": {
    name_vi: "AWS D1.1 — Kết cấu thép (Structural Steel)",
    table: "Table 8.1 (statically loaded) / Table 8.2 (cyclically loaded)",
    visual: [
      {item:"Nứt (Crack)", limit:"KHÔNG cho phép — bất kỳ vết nứt nào",  pass:"no"},
      {item:"Ngấu (Fusion)", limit:"100% ngấu giữa các đường chạy và vào kim loại cơ bản", pass:"full"},
      {item:"Miệng hố cuối (Crater)", limit:"Tất cả crater phải được điền đầy hoặc xử lý", pass:"filled"},
      {item:"Lỗ rỗ (Porosity) — groove", limit:"CJP: ≤ Ø2.5 mm; tổng diện tích lỗ trong 25 mm bất kỳ ≤ Ø10 mm", pass:"≤Ø2.5"},
      {item:"Lỗ rỗ — fillet", limit:"Ø ≤ 2.5 mm; tổng diện tích ≤ Ø10 mm trong 100 mm", pass:"≤Ø2.5"},
      {item:"Lẫn xỉ (Slag inclusion)", limit:"Tổng chiều dài ≤ 13 mm trong 25 mm; xỉ riêng lẻ ≤ 6 mm", pass:"≤6mm"},
      {item:"Cháy chân (Undercut) — tĩnh", limit:"≤ 1 mm cho bất kỳ chiều dài; ≤ 2 mm nếu chiều dài ≤ 50 mm trên 300 mm", pass:"≤1mm"},
      {item:"Cháy chân — chu kỳ tải", limit:"Vuông góc ứng suất: ≤ 0.25 mm; song song: ≤ 1 mm", pass:"≤0.25mm⊥"},
      {item:"Reinforcement (groove)", limit:"Lồi mặt ≤ 3 mm; lồi gốc (rễ) ≤ 3 mm cho CJP", pass:"≤3mm"},
      {item:"Underfill (lõm/khuyết)", limit:"KHÔNG cho phép — phải hàn đầy đến mặt bằng kim loại cơ bản", pass:"no"},
      {item:"Overlap (gặm mép)", limit:"KHÔNG cho phép — mép hàn không được đè lên kim loại cơ bản chưa nóng chảy", pass:"no"},
      {item:"Profile mặt hàn (Bead profile)", limit:"Đều, không gồ ghề; chuyển tiếp êm; xem Figure 8.1", pass:"smooth"},
      {item:"Bắn xỉ (Spatter)", limit:"Phải gỡ sạch trước khi nghiệm thu", pass:"clean"},
      {item:"Concavity (lõm fillet)", limit:"KHÔNG cho phép cho fillet chịu lực; cho phép có giới hạn cho fillet không chịu lực", pass:"no(load)"}
    ],
    nde: {
      VT: "100% mọi mối hàn",
      UT: "Theo bản vẽ — thường mối hàn CJP chịu kéo",
      RT: "Theo bản vẽ — vùng tới hạn",
      PT_MT: "Theo bản vẽ — phát hiện nứt bề mặt"
    },
    ref_url: ""
  },
  "AWS D1.6": {
    name_vi: "AWS D1.6 — Kết cấu inox (Stainless Steel)",
    table: "§8 — Inspection",
    visual: [
      {item:"Nứt", limit:"KHÔNG cho phép", pass:"no"},
      {item:"Ngấu", limit:"100% ngấu hoàn toàn", pass:"full"},
      {item:"Porosity", limit:"Như D1.1 Table 8.1 — Ø ≤ 2.5 mm", pass:"≤Ø2.5"},
      {item:"Cháy chân (Undercut)", limit:"≤ 0.5 mm cho mọi chiều dày (chặt hơn D1.1)", pass:"≤0.5mm"},
      {item:"Reinforcement", limit:"≤ 3 mm; phải có chuyển tiếp êm", pass:"≤3mm"},
      {item:"Heat tint / Oxide màu", limit:"Phải gỡ bỏ — xanh đậm/tím là quá nóng (mất khả năng chống ăn mòn)", pass:"≤light straw"},
      {item:"Carbide precipitation (sensitization)", limit:"Tránh interpass quá cao (≤ 175°C cho 304/316) — ngăn precipitate ăn mòn liên hạt", pass:"≤175°C interpass"}
    ]
  },
  "AWS D1.3": {
    name_vi: "AWS D1.3 — Tôn mỏng (Sheet Steel < 5 mm)",
    table: "§6",
    visual: [
      {item:"Nứt", limit:"KHÔNG", pass:"no"},
      {item:"Cháy thủng (Burn-through)", limit:"KHÔNG cho phép", pass:"no"},
      {item:"Hợp nhất (Fusion)", limit:"≥ 80% chiều dài liên kết", pass:"≥80%"},
      {item:"Porosity", limit:"Tổng ≤ 6 mm trong 25 mm chiều dài", pass:"≤6mm/25"}
    ]
  },
  "ASME IX": {
    name_vi: "ASME IX + ASME VIII Div.1 — Bồn áp lực (Pressure Vessel)",
    table: "ASME VIII Div.1 §UW-35 / Section IX QW-194",
    visual: [
      {item:"Nứt", limit:"KHÔNG cho phép", pass:"no"},
      {item:"Reinforcement (lồi)", limit:"Theo Table UW-35.1: dày ≤ 13 mm → ≤ 3 mm; 13–25 → ≤ 4 mm; > 25 → ≤ 6 mm", pass:"≤3-6mm"},
      {item:"Undercut", limit:"≤ 0.8 mm hoặc ≤ 10% chiều dày, lấy nhỏ hơn", pass:"≤0.8 or 10%t"},
      {item:"Concavity gốc", limit:"≤ 1.5 mm; nếu cộng chiều dày còn ≥ thiết kế thì OK", pass:"≤1.5mm"},
      {item:"Porosity (RT theo §UW-51)", limit:"Tổng đường kính nhóm: ≤ t/2 trong 12t chiều dài; Ø lớn nhất ≤ 6 mm", pass:"per UW-51"},
      {item:"Slag", limit:"Theo §UW-51 — slag tuyến tính ≤ t/3 mỗi đoạn, ≤ t/3 tổng trong 12t", pass:"per UW-51"}
    ],
    nde: { VT: "100%", RT: "Bắt buộc cho Class 1 (full RT); Class 2 spot RT", UT: "Thay thế RT khi được phép", PT_MT: "Theo §UW-50" }
  },
  "ISO 5817": {
    name_vi: "ISO 5817 — Chất lượng mối hàn (3 cấp B/C/D)",
    table: "ISO 5817:2023",
    visual: [
      {item:"Cấp B (Stringent / nghiêm ngặt)", limit:"Dùng cho kết cấu chịu mỏi/biến đổi tải. Nứt: KHÔNG; Undercut ≤ 0.5 mm; Reinforcement ≤ 1+0.1b mm; Porosity Ø ≤ 0.2s, max 3 mm", pass:"B"},
      {item:"Cấp C (Intermediate / trung bình)", limit:"Mặc định cho kết cấu thông thường. Undercut ≤ 0.5 mm; Reinforcement ≤ 1+0.15b mm; Porosity Ø ≤ 0.3s, max 4 mm", pass:"C"},
      {item:"Cấp D (Moderate / vừa)", limit:"Cho kết cấu phụ. Undercut ≤ 1 mm hoặc 0.1t; Reinforcement ≤ 1+0.25b; Porosity Ø ≤ 0.4s, max 5 mm", pass:"D"}
    ]
  },
  "ISO 15614": { name_vi: "ISO 15614-1 — Qualify quy trình hàn", table: "Tương tự AWS D1.1 — tham chiếu ISO 5817 cho acceptance", ref: "ISO 5817" }
};

/* =================== JOINT TYPE → CODE inference ===================
   Khi WPS không nêu joint code cụ thể, dùng heuristic từ field hiện có. */
window.inferJointCode = function(wps){
  if (!wps) return null;
  const pos = (wps.position||'').toLowerCase();
  const tags = (wps.tags||[]).map(t=>t.toLowerCase());
  const filler = (wps.filler||'').toLowerCase();
  const code = (wps.code||'').toLowerCase();
  // Pipe 6G/6GR → B-U2-GF
  if (/6g/i.test(pos)) return "B-U2-GF";
  // Fillet/T
  if (/^[1-4]?f|^pb$|fillet/i.test(pos) || tags.includes('fillet')) return "FW";
  // PJP
  if (/pjp/i.test(JSON.stringify(wps))) return "BC-P5";
  // T-corner
  if (tags.includes('t,corner,lap') || /t-joint|corner/i.test((wps.tags||[]).join(' '))) return "TC-U4b";
  // Default Butt CJP
  return "B-U3a";
};

/* =================== Resolve acceptance for a WPS ===================
   Map WPS.code → which acceptance entry to use. */
window.resolveAcceptance = function(wps){
  if (!wps || !wps.code) return null;
  const c = wps.code.toUpperCase();
  if (c.includes('D1.6')) return window.ACCEPTANCE['AWS D1.6'];
  if (c.includes('D1.3')) return window.ACCEPTANCE['AWS D1.3'];
  if (c.includes('D1.1')) return window.ACCEPTANCE['AWS D1.1'];
  if (c.includes('ASME')) return window.ACCEPTANCE['ASME IX'];
  if (c.includes('ISO 15614')) return window.ACCEPTANCE['ISO 5817'];
  return window.ACCEPTANCE['AWS D1.1']; // default
};
