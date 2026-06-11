/* ============================================================================
   MODULE QC FIT-UP — GÁ LẮP TRƯỚC HÀN (module độc lập)
   Nguồn ĐÃ XÁC MINH từ PDF gốc: AWS D1.1:2020 — 7.21, 7.21.1, 7.21.1.1,
   7.21.3, 7.21.4, Figure 7.3, 5.4.1.7. Tham chiếu thêm: ISO 9692-1 (chuẩn bị
   mép), ISO 5817 5071 (lệch mép theo hệ EN), WPS của từng mối.
   ============================================================================ */
(function () {
  const B = (vi, en) => ({ vi, en });
  const num = v => (isFinite(v) ? Math.round(v * 100) / 100 : v);

  const RULES = [
    {
      id: "fu_fillet", sk: "fitgap",
      title: B("Khe hở chân — mối hàn GÓC (AWS 7.21.1)", "Fillet weld assembly root opening"),
      criteria: B("Các bản ghép áp sát hết mức. Khe hở ≤ 5mm. Riêng thép dày ≥ 75mm không ép khít được: cho phép tới 8mm NẾU có backing phù hợp (flux, băng thủy tinh, bột sắt hoặc lớp lót hydro thấp). QUAN TRỌNG: khe hở > 2mm → cạnh fillet phải TĂNG THÊM đúng bằng khe hở (hoặc chứng minh đủ throat).",
        "Gap ≤ 5mm; ≥75mm thick parts up to 8mm WITH suitable backing. Gap > 2mm → fillet leg increased by gap amount."),
      measure: B("Đo bằng thước lá (feeler) hoặc thước côn (taper gauge) tại nhiều điểm dọc mối; ghi giá trị LỚN NHẤT.", "Feeler/taper gauge at multiple points; record the maximum."),
      quote: "The root opening shall not exceed 3/16 in [5 mm]... a maximum root opening of 5/16 in [8 mm] may be used, provided suitable backing is used. If the separation is greater than 1/16 in [2 mm], the legs of the fillet weld shall be increased by the amount of the root opening. — AWS D1.1:2020, 7.21.1",
      calc: {
        inputs: [
          { k: "g", label: B("Khe hở đo được (mm)", "Measured gap (mm)"), def: 1.5 },
          { k: "z", label: B("Cạnh fillet thiết kế z (mm)", "Design leg z (mm)"), def: 6 },
          { k: "thick", label: B("Thép ≥75mm + có backing? (1/0)", "≥75mm + backing? (1/0)"), def: 0 }
        ],
        evaluate(v) {
          const lim = v.thick ? 8 : 5;
          const legReq = v.g > 2 ? v.z + v.g : v.z;
          return {
            limitText: `Khe hở ≤ ${lim} mm` + (v.g > 2 ? ` · cạnh fillet yêu cầu = ${v.z} + ${num(v.g)} = ${num(legReq)} mm` : ""),
            detail: `Đo ${v.g} mm` + (v.g > 2 ? " (>2mm → phải tăng cạnh hàn)" : ""),
            pass: v.g <= lim
          };
        }
      }
    },
    {
      id: "fu_align", sk: "hilo",
      title: B("Lệch mép mối GIÁP MỐI — hi-lo (AWS 7.21.3)", "Butt joint alignment / hi-lo"),
      criteria: B("Lệch tâm so với vị trí lý thuyết ≤ 10% chiều dày bản MỎNG hơn, tối đa 3mm — lấy giá trị NHỎ hơn. Khi nắn chỉnh: độ nghiêng kéo về không quá 12mm trên 300mm (1:25). Đo theo đường tâm bản trừ khi bản vẽ chỉ khác.",
        "Offset ≤ min(10% of thinner part, 3mm). Correction slope ≤ 12mm per 300mm."),
      measure: B("Bắc thước thẳng qua mối nối, đo bậc lệch bằng thước lá hoặc dưỡng hi-lo (kiểu ống dùng dưỡng chuyên dụng).", "Straightedge across joint + feeler, or hi-lo gauge."),
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
      title: B("Kích thước rãnh hàn so với bản vẽ (AWS 7.21.4.1, Fig 7.3)", "Groove dimensions vs detail"),
      criteria: B("Sai lệch cho phép so với bản vẽ (as fit-up): • Root face: ±2mm • Khe hở gốc KHÔNG backing: ±2mm • Khe hở gốc CÓ backing: +6mm/−2mm • Góc rãnh: +10°/−5°. Vượt mức phải trình Engineer hoặc sửa trước khi hàn.",
        "Root face ±2mm; root opening ±2mm (no backing) / +6−2mm (backing); groove angle +10°/−5°."),
      measure: B("Góc vát đo bằng dưỡng góc/thước đo góc vạn năng áp sát mép vát; khe hở bằng taper gauge; root face bằng thước cặp mỏ nhọn.", "Bevel gauge/protractor for angle; taper gauge for opening; caliper for root face."),
      quote: "(1) Root face of joint ±1/16 in [2 mm]; (2) Root opening without backing ±1/16 in [2 mm], with backing +1/4 in [6 mm] −1/16 in [2 mm]; (3) Groove angle of joint +10°, −5°. — AWS D1.1:2020, Figure 7.3",
      calc: {
        inputs: [
          { k: "gd", label: B("Khe hở thiết kế (mm)", "Design opening (mm)"), def: 3 },
          { k: "gm", label: B("Khe hở đo (mm)", "Measured opening (mm)"), def: 4 },
          { k: "bk", label: B("Có backing? (1/0)", "Backing? (1/0)"), def: 0 },
          { k: "ad", label: B("Góc thiết kế (°)", "Design angle (°)"), def: 60 },
          { k: "am", label: B("Góc đo (°)", "Measured angle (°)"), def: 62 },
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
      title: B("Khe hở mặt áp (faying surface) — AWS 7.21.1.1", "Faying surface separation"),
      criteria: B("Khe hở giữa các mặt áp của mối hàn nút/rãnh (plug/slot) và mối giáp mối đặt trên backing: ≤ 2mm. CẤM nhét tấm chêm (filler plates) trừ khi có trên bản vẽ hoặc Engineer duyệt.",
        "Separation ≤ 2mm. Filler plates prohibited unless specified/approved."),
      measure: B("Thước lá luồn quanh chu vi mặt áp; điểm dày nhất là giá trị ghi nhận.", "Feeler gauge around faying perimeter; record max."),
      quote: "The separation between faying surfaces of plug and slot welds, and of butt joints landing on a backing, shall not exceed 1/16 in [2 mm]... The use of filler plates shall be prohibited except as specified on the drawings or as specially approved by the Engineer. — AWS D1.1:2020, 7.21.1.1",
      calc: {
        inputs: [{ k: "s", label: B("Khe hở đo (mm)", "Measured separation (mm)"), def: 1 }],
        evaluate(v) { return { limitText: "≤ 2 mm", detail: `Đo ${v.s} mm`, pass: v.s <= 2 }; }
      }
    },
    {
      id: "fu_var", sk: "fitgap",
      title: B("Biến thiên khe hở dọc mối — hàn máy (AWS 5.4.1.7)", "Root opening variation — mechanized welding"),
      criteria: B("Hàn tự động/cơ giới FCAW, GMAW, SAW: chênh lệch khe hở (lớn nhất − nhỏ nhất) dọc mối ≤ 3mm. Vượt phải sửa cục bộ trước khi hàn.",
        "Mechanized FCAW/GMAW/SAW: gap variation (max − min) ≤ 3mm."),
      measure: B("Đo khe hở mỗi 300–500mm dọc mối, ghi min & max.", "Measure every 300–500mm along joint; record min & max."),
      quote: "...for automatic or mechanized welding using FCAW, GMAW, and SAW processes, the maximum root opening variation (minimum to maximum opening as fit-up) may not exceed 1/8 in [3 mm]. — AWS D1.1:2020, 5.4.1.7",
      calc: {
        inputs: [
          { k: "mx", label: B("Khe hở lớn nhất (mm)", "Max gap (mm)"), def: 4 },
          { k: "mn", label: B("Khe hở nhỏ nhất (mm)", "Min gap (mm)"), def: 2.5 }
        ],
        evaluate(v) { const d = v.mx - v.mn; return { limitText: "Biến thiên ≤ 3 mm", detail: `${v.mx} − ${v.mn} = ${num(d)} mm`, pass: d <= 3 }; }
      }
    },
    {
      id: "fu_en", sk: "hilo",
      title: B("Hệ EN: lệch mép theo ISO 5817 (5071)", "EN system: misalignment per ISO 5817"),
      criteria: B("Dự án châu Âu dùng ISO 5817 Table 1 No.3.1 (t > 3mm): mức D: h ≤ 0.25t, max 5mm · C: h ≤ 0.15t, max 4mm · B: h ≤ 0.1t, max 3mm. Mức theo EXC (EXC2→C...).",
        "EN projects: D ≤0.25t max5 · C ≤0.15t max4 · B ≤0.1t max3 (ISO 5817 5071)."),
      measure: B("Cách đo như hi-lo AWS: thước thẳng + thước lá.", "Same as AWS hi-lo: straightedge + feeler."),
      quote: "5071 Linear misalignment between plates (t > 3): D: h ≤ 0,25 t but max. 5 mm; C: h ≤ 0,15 t, but max. 4 mm; B: h ≤ 0,1 t, but max. 3 mm — ISO 5817:2023, Table 1 No.3.1 (đã xác minh)",
      calc: {
        inputs: [
          { k: "t", label: B("Chiều dày bản mỏng t (mm)", "Thinner t (mm)"), def: 12 },
          { k: "h", label: B("Lệch mép đo (mm)", "Measured offset (mm)"), def: 1.5 },
          { k: "lv", label: B("Mức (1=B,2=C,3=D)", "Level (1=B,2=C,3=D)"), def: 2 }
        ],
        evaluate(v) {
          const L = { 1: Math.min(0.1 * v.t, 3), 2: Math.min(0.15 * v.t, 4), 3: Math.min(0.25 * v.t, 5) };
          const name = { 1: "B", 2: "C", 3: "D" }[v.lv] || "C"; const lim = L[v.lv] ?? L[2];
          return { limitText: `Mức ${name}: h ≤ ${num(lim)} mm (B≤${num(L[1])} · C≤${num(L[2])} · D≤${num(L[3])})`, detail: `Đo ${v.h} mm`, pass: v.h <= lim };
        }
      }
    }
  ];

  const FIXES = [
    { p: B("Khe hở rãnh quá lớn", "Excess root opening"), f: B("Được ĐẮP SỬA (buttering) về đúng kích thước trước khi hàn nối — chỉ khi khe hở ≤ 2× chiều dày bản mỏng hoặc ≤ 20mm (lấy nhỏ hơn). Lớn hơn: phải Engineer duyệt. TUYỆT ĐỐI không nhét que hàn/thanh thép vào khe.", "Buttering up to min(2×t, 20mm); beyond → Engineer. NEVER insert rods/bars."), ref: "AWS 7.21.4.2 / 7.21.4.3" },
    { p: B("Lệch mép quá giới hạn", "Excess misalignment"), f: B("Nắn chỉnh từ từ, độ nghiêng kéo về ≤ 12mm/300mm; không gò nguội quá mạnh gây biến cứng vùng mép.", "Draw in gradually, slope ≤ 12/300."), ref: "AWS 7.21.3" },
    { p: B("Góc vát thiếu / root face quá dày", "Insufficient bevel / thick root face"), f: B("Mài hoặc dũi mở thêm đúng góc WPS rồi kiểm lại bằng dưỡng; root face đưa về giá trị bản vẽ ±2mm.", "Grind/gouge to WPS angle; dress root face."), ref: "AWS Fig 7.3 / ISO 9692-1" },
    { p: B("Tack hàn nứt / quá nhỏ", "Cracked/undersized tacks"), f: B("Mài bỏ tack lỗi, hàn lại theo WPS bởi thợ có chứng chỉ; tack nằm trong mối hàn chính phải đạt chất lượng như mối chính.", "Remove defective tacks; re-tack per WPS."), ref: "AWS 7.18" },
    { p: B("Bề mặt rãnh bẩn (gỉ, sơn, dầu, ẩm)", "Contaminated joint faces"), f: B("Mài sạch tới kim loại sáng 25mm hai bên + lau dung môi; bề mặt ẩm phải sấy/khò trước khi hàn.", "Grind bright 25mm both sides + solvent wipe; dry if damp."), ref: "AWS 7.14" },
    { p: B("Gá ép cứng gây ứng suất / quên lượng dư co rút", "Over-restraint / no shrinkage allowance"), f: B("Dùng đồ gá/nêm/bu lông giữ vị trí; chừa lượng dư co rút theo tính toán (xem module Lượng dư); trình tự hàn cân đối.", "Jigs with shrinkage allowance; balanced sequence."), ref: "AWS 7.21.6" }
  ];

  const CHECKLIST = [
    { phase: B("TRƯỚC KHI GÁ", "BEFORE FIT-UP"), icon: "📋", items: [
      { t: B("Bản vẽ rev mới nhất + WPS đúng liên kết có tại vị trí; hiểu rõ loại rãnh, khe hở, góc, root face yêu cầu", "Latest drawing + correct WPS at station"), ref: "WPS / bản vẽ" },
      { t: B("Vật liệu đúng mác (kiểm mark/heat no.), mép cắt đạt chất lượng (không cháy khía sâu)", "Correct material; cut-edge quality OK"), ref: "EN 1090-2 6.4 / AWS 7.14" },
      { t: B("Bề mặt rãnh + 25mm hai bên sạch: không gỉ, sơn, dầu, ẩm", "Joint faces + 25mm clean & dry"), ref: "AWS 7.14" },
      { t: B("Dụng cụ đo sẵn sàng: taper/feeler gauge, dưỡng góc, thước thẳng, thước cặp", "Gauges ready: taper, feeler, bevel, straightedge"), ref: "—" }
    ]},
    { phase: B("KHI GÁ — ĐO 5 THÔNG SỐ", "DURING FIT-UP"), icon: "📐", items: [
      { t: B("Khe hở gốc trong dung sai (calculator tab Kiểm tra) — đo nhiều điểm dọc mối", "Root opening within tolerance — multiple points"), ref: "AWS 7.21.1 / Fig 7.3" },
      { t: B("Lệch mép (hi-lo) ≤ min(10%t; 3mm) — hoặc theo ISO 5817 nếu dự án EN", "Hi-lo within limit"), ref: "AWS 7.21.3 / ISO 5817 5071" },
      { t: B("Góc rãnh +10°/−5° và root face ±2mm so bản vẽ", "Groove angle & root face within Fig 7.3"), ref: "AWS Fig 7.3" },
      { t: B("Hàn máy (SAW/FCAW/GMAW): biến thiên khe hở dọc mối ≤ 3mm", "Mechanized: gap variation ≤ 3mm"), ref: "AWS 5.4.1.7" },
      { t: B("Tack: đủ dài/size, không nứt, bởi thợ có chứng chỉ, vị trí không trùng điểm dừng xấu", "Tacks sized, sound, by qualified welder"), ref: "AWS 7.18" },
      { t: B("Backing (nếu dùng): áp khít ≤ 2mm, vật liệu tương thích, nối backing đúng quy định", "Backing tight ≤2mm, compatible"), ref: "AWS 7.21.1.1 / 7.10" }
    ]},
    { phase: B("NGHIỆM THU TRƯỚC KHI THẢ HÀN", "RELEASE TO WELD"), icon: "✅", items: [
      { t: B("Mối quan trọng / EXC3-4: lập biên bản fit-up (in từ nút 🖨) + QC ký xác nhận", "Critical joints: fit-up report signed"), ref: "ITP điểm W/H" },
      { t: B("Lưu kết quả đo vào Nhật ký QC (nút 💾 ở calculator) để truy xuất", "Save results to QC Log"), ref: "Nhật ký QC" },
      { t: B("Gá kẹp giữ vị trí chắc chắn + đã tính lượng dư co rút", "Restraint adequate + shrinkage allowed"), ref: "AWS 7.21.6" },
      { t: B("Điều kiện hàn sẵn sàng: preheat (nếu cần), che chắn gió → bàn giao thợ hàn", "Welding conditions ready → release"), ref: "AWS 7.12 / Table 5.8" }
    ]}
  ];

  /* ---------- QUY TRÌNH KIỂM TRA FIT-UP — các bước (giống phong cách Packing) ---------- */
  const STEPS = [
    { t: B("Nhận diện mối hàn & lấy chuẩn", "Identify joint & references"),
      d: B("Xác định mối hàn theo weld map; mở bản vẽ + WPS đúng liên kết: loại rãnh (V/bevel/fillet), khe hở, góc vát, root face yêu cầu. KHÔNG gá theo trí nhớ.", "Identify joint per weld map; pull drawing + WPS: groove type, gap, angle, root face."),
      tool: B("Bản vẽ rev mới nhất + WPS (tra nhanh trong Thư viện WPS)", "Drawing + WPS") },
    { t: B("Kiểm vật liệu & chất lượng mép cắt", "Material & cut-edge check"),
      d: B("Mác thép + heat number khớp; mép cắt không cháy khía sâu, không tách lớp lộ mép; vát đúng phương pháp (máy cắt/mài).", "Grade + heat no. match; cut edges sound, bevel by proper method."),
      tool: B("MTC + đèn soi + kính lúp", "MTC + lamp") },
    { t: B("Làm sạch rãnh hàn", "Clean the joint"),
      d: B("Mài sạch tới kim loại sáng 25mm hai bên rãnh: hết gỉ, sơn, dầu, ẩm. Bề mặt ướt phải sấy/khò trước.", "Grind bright 25mm both sides: no rust, paint, oil, moisture."),
      tool: B("Máy mài + bàn chải sắt + dung môi lau", "Grinder + wire brush + solvent") },
    { t: B("Gá sơ bộ + căn chỉnh", "Pre-assemble & align"),
      d: B("Đưa về đúng vị trí bằng đồ gá/nêm/bu lông kẹp; CHỪA LƯỢNG DƯ co rút theo tính toán (đừng gá đúng kích thước hoàn thiện!); kéo chỉnh lệch mép với độ nghiêng ≤ 12mm/300mm.", "Position with jigs/wedges; allow weld shrinkage; draw-in slope ≤ 12/300."),
      tool: B("Đồ gá, nêm, máy thủy bình · lượng dư: module Lượng dư", "Jigs + shrinkage calculator") },
    { t: B("ĐO 5 THÔNG SỐ — Đạt/Không đạt", "Measure the 5 parameters"),
      d: B("① Khe hở chân ② Lệch mép hi-lo ③ Góc rãnh + root face ④ Khe hở mặt áp ⑤ Biến thiên khe hở (hàn máy). Đo nhiều điểm dọc mối, nhập số vào tab Kiểm tra để ra kết luận từng mục.", "Gap, hi-lo, angle + root face, faying gap, gap variation — multiple points, evaluate in Inspect tab."),
      tool: B("Taper gauge, thước lá, dưỡng góc, thước thẳng → tab 📐 Kiểm tra", "Gauges → Inspect tab") },
    { t: B("Hàn đính (tack)", "Tack welding"),
      d: B("Tack theo WPS bởi thợ CÓ CHỨNG CHỈ: đủ chiều dài/size, khoảng cách đều, không đặt tại góc/điểm giao; soi từng tack — nứt là mài bỏ hàn lại.", "Tacks per WPS by qualified welder; inspect each — cracked tacks removed."),
      tool: B("WPS + đèn soi + kính lúp", "WPS + lamp") },
    { t: B("Xử lý điểm KHÔNG ĐẠT", "Rectify failures"),
      d: B("Theo đúng tab Xử lý lỗi: khe hở lớn → buttering trong giới hạn; góc thiếu → mài mở; lệch mép → nắn từ từ. Sửa xong ĐO LẠI từ bước 5.", "Per Fixes tab; re-measure after rectification."),
      tool: B("Tab 🔧 Xử lý lỗi + máy mài/máy dũi", "Fixes tab + grinder/gouger") },
    { t: B("Nghiệm thu & thả hàn", "Accept & release to weld"),
      d: B("Mối quan trọng/EXC3-4: lập BIÊN BẢN FIT-UP có chữ ký (điểm W/H theo ITP hàn); lưu kết quả vào Nhật ký QC + chụp ảnh; xác nhận preheat/che chắn sẵn sàng rồi bàn giao thợ hàn.", "Critical joints: signed fit-up report (ITP W/H point); save to QC Log + photos; confirm preheat → release."),
      tool: B("☑️ Checklist → 🖨 In biên bản · 📷 Đo ảnh · Nhật ký QC", "Checklist print + photo + log") }
  ];

  window.FU_DATA = { STEPS, RULES, FIXES, CHECKLIST,
    intro: B("Fit-up đạt thì mối hàn mới có cơ hội đạt — kiểm TRƯỚC khi hàn, sau khi hàn không sửa được gốc nữa. Giá trị chuẩn lấy theo WPS/bản vẽ; dung sai dưới đây theo AWS D1.1:2020 (đã đối chiếu PDF gốc) + ISO 5817:2023 cho dự án EN.",
      "Good fit-up enables good welds. Inspect BEFORE welding. Tolerances per AWS D1.1:2020 (verified) + ISO 5817:2023 for EN projects.")
  };
})();
