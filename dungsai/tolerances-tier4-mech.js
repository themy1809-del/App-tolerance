/* Tier 4 — TIÊU CHUẨN CƠ KHÍ CHẾ TẠO
   ISO 286 (Limits & Fits H6/H7/H8/h6) · ISO 2768 (general tolerances)
   ISO 1101 (GD&T) · ISO 1302 (Surface roughness Ra/Rz)
   ISO 965 (Metric threads) · ASME Y14.5 · DIN 7168 · JIS B 0405 */
(function(){
  if (!window.APP_DATA) window.APP_DATA = { standards: [], applicability: [], tolerances: [] };
  var D = window.APP_DATA;
  var T = function(vi,en){ return {vi:vi, en:en}; };

  // === STANDARDS ===
  var stds = [
    { code:'ISO 286-1:2010', title:T('ISO 286-1 — Hệ thống dung sai ISO (cơ sở)','ISO 286-1 — ISO code system for tolerances (basis)'), region:'INT', edition:'2010' },
    { code:'ISO 286-2:2010', title:T('ISO 286-2 — Bảng dung sai chuẩn cho trục & lỗ','ISO 286-2 — Standard tolerance tables holes/shafts'), region:'INT', edition:'2010' },
    { code:'ISO 2768-1:1989', title:T('ISO 2768-1 — Dung sai chung kích thước tuyến tính & góc','ISO 2768-1 — General tolerances linear & angular'), region:'INT', edition:'1989' },
    { code:'ISO 2768-2:1989', title:T('ISO 2768-2 — Dung sai chung hình dáng & vị trí','ISO 2768-2 — General geometrical tolerances'), region:'INT', edition:'1989' },
    { code:'ISO 1101:2017',  title:T('ISO 1101 — GD&T (geometric tolerancing)','ISO 1101 — Geometrical product specifications'), region:'INT', edition:'2017' },
    { code:'ISO 1302:2002',  title:T('ISO 1302 — Ký hiệu độ nhám bề mặt','ISO 1302 — Surface texture indication'), region:'INT', edition:'2002' },
    { code:'ISO 4287:1997',  title:T('ISO 4287 — Thông số nhám Ra, Rz, Rmax','ISO 4287 — Surface roughness parameters'), region:'INT', edition:'1997' },
    { code:'ISO 965-1:2013', title:T('ISO 965-1 — Ren hệ mét — Dung sai','ISO 965-1 — Metric thread tolerances'), region:'INT', edition:'2013' },
    { code:'ISO 13715:2017', title:T('ISO 13715 — Cạnh sắc / bavia','ISO 13715 — Edges of undefined shape'), region:'INT', edition:'2017' },
    { code:'ASME Y14.5:2018',title:T('ASME Y14.5 — Dimensioning & Tolerancing (GD&T Mỹ)','ASME Y14.5 — Dimensioning & Tolerancing'), region:'US', edition:'2018' },
    { code:'DIN 7168:1991',  title:T('DIN 7168 — Dung sai chung Đức (thay bởi 2768)','DIN 7168 — German general tolerances'), region:'EU', edition:'1991' },
    { code:'JIS B 0405:1991',title:T('JIS B 0405 — Dung sai chung Nhật','JIS B 0405 — Japanese general tolerances'), region:'JP', edition:'1991' }
  ];
  stds.forEach(function(s){ if(!D.standards.some(function(x){return x.code===s.code})) D.standards.push(s); });

  // === RULES ===
  var rules = [
    // ========== ISO 286-2 — LIMITS & FITS (H7/H8/h6 etc) ==========
    { id:'iso286-H7-d6_18',
      standard:'ISO 286-2:2010', region:'INT',
      category:'machining', element:T('Lỗ chính xác (hole) — chốt định vị','Precision hole — dowel pin'), feature:'IT GRADE',
      title:T('Lỗ H7 — Ø3 đến Ø18 mm','H7 hole — Ø3 to Ø18 mm'),
      permitted:{ kind:'TABLE', expression:'+0 / +18 µm (Ø6-10) · +0 / +21 µm (Ø10-18)', unit:'µm' },
      acceptance:T('Lỗ H7: chỉ chiều dương (0 → +IT7). Kiểm bằng pin gauge GO/NO-GO','Hole H7: positive only (0 → +IT7). Check with GO/NO-GO pin gauge'),
      clause:{ number:'ISO 286-2 Table 2', page:8,
        quote:'H7 — fundamental deviation H (lower = 0), grade IT7. For Ø6-10: ES = +15 µm; Ø10-18: ES = +18 µm.' }
    },
    { id:'iso286-H7-d50',
      standard:'ISO 286-2:2010', region:'INT',
      category:'machining', element:T('Lỗ chính xác','Precision hole'), feature:'IT GRADE',
      title:T('Lỗ H7 — Ø30 đến Ø50 mm','H7 hole — Ø30 to Ø50 mm'),
      permitted:{ kind:'TABLE', expression:'+0 / +25 µm', unit:'µm' },
      acceptance:T('Lỗ H7 Ø30-50: 0 → +25 µm. Kiểm bằng caliper điện tử 0.001 hoặc gauge pin','H7 Ø30-50: 0 → +25 µm. Check with digital caliper 0.001 or gauge pin'),
      clause:{ number:'ISO 286-2 Table 2', page:8 }
    },
    { id:'iso286-H8-d50',
      standard:'ISO 286-2:2010', region:'INT',
      category:'machining', element:T('Lỗ trung bình (bulông qua, ren ngoài)','Medium hole (bolt clearance, threading)'), feature:'IT GRADE',
      title:T('Lỗ H8 — Ø30 đến Ø50 mm','H8 hole — Ø30 to Ø50 mm'),
      permitted:{ kind:'TABLE', expression:'+0 / +39 µm', unit:'µm' },
      acceptance:T('Lỗ H8 Ø30-50: 0 → +39 µm. Dùng cho lỗ thoáng, ren ngoài thường, lắp tự do','H8 Ø30-50: 0 → +39 µm. Use for clearance holes, threaded, free fit'),
      clause:{ number:'ISO 286-2 Table 2', page:8,
        quote:'H8 grade IT8: Ø30-50 fundamental deviation H, ES = +39 µm.' }
    },
    { id:'iso286-H11-d50',
      standard:'ISO 286-2:2010', region:'INT',
      category:'machining', element:T('Lỗ thô (hàn, bulông phổ thông)','Coarse hole (welding, common bolts)'), feature:'IT GRADE',
      title:T('Lỗ H11 — Ø30 đến Ø50 mm','H11 hole — Ø30 to Ø50 mm'),
      permitted:{ kind:'TABLE', expression:'+0 / +160 µm', unit:'µm' },
      acceptance:T('H11 Ø30-50: 0 → +0.16 mm. Lỗ khoan thô, lắp bulông không quan trọng','H11 Ø30-50: 0 → +0.16 mm. Rough drilled, non-critical bolt holes'),
      clause:{ number:'ISO 286-2 Table 2', page:8 }
    },
    { id:'iso286-h6-d50',
      standard:'ISO 286-2:2010', region:'INT',
      category:'machining', element:T('Trục chính xác (shaft)','Precision shaft'), feature:'IT GRADE',
      title:T('Trục h6 — Ø30 đến Ø50 mm','h6 shaft — Ø30 to Ø50 mm'),
      permitted:{ kind:'TABLE', expression:'−16 / +0 µm', unit:'µm' },
      acceptance:T('Trục h6 Ø30-50: −16 → 0 µm. Đo bằng panme 0.001 hoặc V-block + indicator','h6 shaft Ø30-50: −16 → 0 µm. Measure with micrometer 0.001 or V-block + indicator'),
      clause:{ number:'ISO 286-2 Table 1', page:5,
        quote:'h6 — fundamental deviation h (upper = 0), grade IT6 = 16 µm.' }
    },
    { id:'iso286-g6-d50',
      standard:'ISO 286-2:2010', region:'INT',
      category:'machining', element:T('Trục lắp lỏng (sliding)','Sliding-fit shaft'), feature:'IT GRADE',
      title:T('Trục g6 — Ø30 đến Ø50 mm','g6 shaft — Ø30 to Ø50 mm'),
      permitted:{ kind:'TABLE', expression:'−25 / −9 µm', unit:'µm' },
      acceptance:T('g6 Ø30-50: −25 → −9 µm. Dùng cho lắp lỏng có dầu bôi trơn','g6 Ø30-50: −25 → −9 µm. For lubricated sliding fit'),
      clause:{ number:'ISO 286-2 Table 1', page:5 }
    },
    { id:'iso286-k6-d50',
      standard:'ISO 286-2:2010', region:'INT',
      category:'machining', element:T('Trục lắp chặt nhẹ (light interference)','Light interference shaft'), feature:'IT GRADE',
      title:T('Trục k6 — Ø30 đến Ø50 mm','k6 shaft — Ø30 to Ø50 mm'),
      permitted:{ kind:'TABLE', expression:'+2 / +18 µm', unit:'µm' },
      acceptance:T('k6 Ø30-50: +2 → +18 µm. Lắp ép nhẹ (bánh răng vào trục, vòng bi không quay)','k6 Ø30-50: +2 → +18 µm. Light press fit (gear on shaft, non-rotating bearing inner)'),
      clause:{ number:'ISO 286-2 Table 1', page:5 }
    },
    { id:'iso286-fit-H7g6',
      standard:'ISO 286-2:2010', region:'INT',
      category:'machining', element:T('Cặp lắp lỗ-trục','Hole-shaft fit'), feature:'FIT',
      title:T('Lắp H7/g6 — Lắp lỏng có hướng dẫn (running fit)','H7/g6 fit — Close running'),
      permitted:{ kind:'TABLE', expression:T('Khe hở 9-50 µm tùy đường kính','Clearance 9-50 µm by diameter'), unit:'µm' },
      acceptance:T('H7/g6: lắp lỏng nhỏ. Có dầu thì trục quay được, không có dầu thì không. Cho cam, trục dẫn hướng.','H7/g6: small clearance. With oil, shaft rotates; without, it sticks. For cams, guide rods.'),
      clause:{ number:'ISO 286-2 Annex A', page:25 }
    },
    { id:'iso286-fit-H7k6',
      standard:'ISO 286-2:2010', region:'INT',
      category:'machining', element:T('Cặp lắp lỗ-trục','Hole-shaft fit'), feature:'FIT',
      title:T('Lắp H7/k6 — Lắp trung gian (transition)','H7/k6 fit — Transition'),
      permitted:{ kind:'TABLE', expression:T('Lúc lỏng -2, lúc chặt +18 µm','Loose -2, tight +18 µm'), unit:'µm' },
      acceptance:T('H7/k6: nhẹ ép, có khi lỏng có khi chặt. Tháo lắp bằng búa nhựa. Bánh răng, vòng bi.','H7/k6: light press, sometimes loose, sometimes tight. Disassemble with rubber mallet. Gears, bearings.'),
      clause:{ number:'ISO 286-2 Annex A', page:25 }
    },
    { id:'iso286-fit-H7p6',
      standard:'ISO 286-2:2010', region:'INT',
      category:'machining', element:T('Cặp lắp lỗ-trục','Hole-shaft fit'), feature:'FIT',
      title:T('Lắp H7/p6 — Lắp chặt (medium drive)','H7/p6 fit — Medium drive press'),
      permitted:{ kind:'TABLE', expression:T('Ép từ +14 đến +35 µm','Press +14 to +35 µm'), unit:'µm' },
      acceptance:T('H7/p6: ép chặt thường xuyên. Cần máy ép thủy lực. Bulông neo trong vỏ, vòng bi quay.','H7/p6: permanent press fit. Hydraulic press needed. Anchor pins in housing, rotating bearings.'),
      clause:{ number:'ISO 286-2 Annex A', page:25 }
    },

    // ========== ISO 2768-1 — GENERAL LINEAR ==========
    { id:'iso2768-f-link',
      standard:'ISO 2768-1:1989', region:'INT',
      category:'machining', element:T('Kích thước thẳng (machined)','Linear machined'), feature:'GENERAL',
      title:T('ISO 2768-f (fine) — kích thước thẳng','ISO 2768-f (fine) — linear'),
      permitted:{ kind:'TABLE',
        expression:T('±0.05 (≤3) · ±0.05 (>3-6) · ±0.1 (>6-30) · ±0.15 (>30-120) · ±0.2 (>120-400)','±0.05 (≤3) ±0.05 (>3-6) ±0.1 (>6-30) ±0.15 (>30-120) ±0.2 (>120-400)'), unit:'mm' },
      acceptance:T('Cấp f (mịn) — phù hợp gia công CNC chính xác cao','Class f (fine) — for high-precision CNC machining'),
      clause:{ number:'ISO 2768-1 Table 1', page:5,
        quote:'Class f (fine): for nominal size 6 to 30 mm, permissible deviation = ±0.1 mm.' }
    },
    { id:'iso2768-m-link',
      standard:'ISO 2768-1:1989', region:'INT',
      category:'machining', element:T('Kích thước thẳng','Linear machined'), feature:'GENERAL',
      title:T('ISO 2768-m (medium) — kích thước thẳng','ISO 2768-m (medium) — linear'),
      permitted:{ kind:'TABLE',
        expression:'±0.1 (≤3) · ±0.1 (3-6) · ±0.2 (6-30) · ±0.3 (30-120) · ±0.5 (120-400) · ±0.8 (400-1000)', unit:'mm' },
      acceptance:T('Cấp m (trung bình) — MẶC ĐỊNH khi bản vẽ không chỉ định cấp dung sai chung','Class m (medium) — DEFAULT when drawing does not specify general tolerance class'),
      clause:{ number:'ISO 2768-1 Table 1', page:5 }
    },
    { id:'iso2768-c-link',
      standard:'ISO 2768-1:1989', region:'INT',
      category:'machining', element:T('Kích thước thẳng','Linear machined'), feature:'GENERAL',
      title:T('ISO 2768-c (coarse) — kích thước thẳng','ISO 2768-c (coarse) — linear'),
      permitted:{ kind:'TABLE',
        expression:'±0.2 (≤3) · ±0.3 (3-6) · ±0.5 (6-30) · ±0.8 (30-120) · ±1.2 (120-400) · ±2.0 (400-1000)', unit:'mm' },
      acceptance:T('Cấp c (thô) — gia công thông thường, hàn, cắt plasma trước machining','Class c (coarse) — common fabrication, welding, plasma-cut before machining'),
      clause:{ number:'ISO 2768-1 Table 1', page:5 }
    },
    { id:'iso2768-v-link',
      standard:'ISO 2768-1:1989', region:'INT',
      category:'machining', element:T('Kích thước thẳng','Linear machined'), feature:'GENERAL',
      title:T('ISO 2768-v (very coarse) — kích thước thẳng','ISO 2768-v (very coarse) — linear'),
      permitted:{ kind:'TABLE',
        expression:'— (≤3) · ±0.5 (3-6) · ±1.0 (6-30) · ±1.5 (30-120) · ±2.5 (120-400)', unit:'mm' },
      acceptance:T('Cấp v (rất thô) — kết cấu thép, cắt thô, hàn không gia công sau','Class v (very coarse) — structural steel, rough-cut, welded without post-machining'),
      clause:{ number:'ISO 2768-1 Table 1', page:5 }
    },
    { id:'iso2768-m-angular',
      standard:'ISO 2768-1:1989', region:'INT',
      category:'machining', element:T('Góc (machined)','Angular'), feature:'GENERAL',
      title:T('ISO 2768-m — góc theo chiều dài cạnh','ISO 2768-m — angular by side length'),
      permitted:{ kind:'TABLE',
        expression:'±1° (cạnh ≤10mm) · ±30\' (10-50) · ±20\' (50-120) · ±10\' (120-400)', unit:'°' },
      acceptance:T('Dung sai góc m: tính theo chiều dài cạnh ngắn nhất tạo nên góc','Angular tolerance m: based on shortest side length forming the angle'),
      clause:{ number:'ISO 2768-1 Table 2', page:6 }
    },

    // ========== ISO 2768-2 — GENERAL FORM & POSITION ==========
    { id:'iso2768-H-flat',
      standard:'ISO 2768-2:1989', region:'INT',
      category:'machining', element:T('Mặt phẳng gia công','Machined plane'), feature:'FLATNESS',
      title:T('ISO 2768-H — Độ phẳng (form, fine class)','ISO 2768-H — Flatness (form, fine)'),
      permitted:{ kind:'TABLE',
        expression:'0.02 (≤10) · 0.05 (>10-30) · 0.1 (>30-100) · 0.2 (>100-300) · 0.3 (>300-1000)', unit:'mm' },
      acceptance:T('Cấp H — gia công CNC. Đo bằng autocollimator hoặc surface plate + dial indicator','Class H — CNC machining. Measure by autocollimator or surface plate + dial indicator'),
      clause:{ number:'ISO 2768-2 Table 1', page:4 }
    },
    { id:'iso2768-K-flat',
      standard:'ISO 2768-2:1989', region:'INT',
      category:'machining', element:T('Mặt phẳng gia công','Machined plane'), feature:'FLATNESS',
      title:T('ISO 2768-K — Độ phẳng (medium)','ISO 2768-K — Flatness (medium)'),
      permitted:{ kind:'TABLE',
        expression:'0.05 (≤10) · 0.1 (>10-30) · 0.2 (>30-100) · 0.4 (>100-300) · 0.6 (>300-1000)', unit:'mm' },
      acceptance:T('Cấp K (mặc định) — phay/bào thường, lắp ráp bình thường','Class K (default) — common milling/planing, normal assembly'),
      clause:{ number:'ISO 2768-2 Table 1', page:4 }
    },
    { id:'iso2768-K-perp',
      standard:'ISO 2768-2:1989', region:'INT',
      category:'machining', element:T('Hai mặt vuông góc','Two perpendicular surfaces'), feature:'PERPENDICULARITY',
      title:T('ISO 2768-K — Độ vuông góc','ISO 2768-K — Perpendicularity'),
      permitted:{ kind:'TABLE',
        expression:'0.4 (≤100) · 0.6 (100-300) · 0.8 (300-1000)', unit:'mm' },
      acceptance:T('Kiểm bằng thước vuông + feeler, hoặc CMM. Tham chiếu trên cạnh dài hơn','Check by square + feeler, or CMM. Reference on the longer edge'),
      clause:{ number:'ISO 2768-2 Table 2', page:5 }
    },
    { id:'iso2768-K-symm',
      standard:'ISO 2768-2:1989', region:'INT',
      category:'machining', element:T('Yếu tố đối xứng (slot, hole pair)','Symmetrical features'), feature:'SYMMETRY',
      title:T('ISO 2768-K — Đối xứng & lệch tâm','ISO 2768-K — Symmetry & coaxiality'),
      permitted:{ kind:'TABLE', expression:'0.6 (≤100) · 0.8 (100-300) · 1.0 (300-1000)', unit:'mm' },
      acceptance:T('Cấp K — đối xứng giữa 2 mặt, đồng tâm 2 lỗ. CMM cho kết quả chính xác nhất','Class K — symmetry between 2 surfaces, coaxiality of 2 holes. CMM most accurate'),
      clause:{ number:'ISO 2768-2 Table 4', page:6 }
    },
    { id:'iso2768-K-runout',
      standard:'ISO 2768-2:1989', region:'INT',
      category:'machining', element:T('Trục quay (rotating shaft)','Rotating shaft'), feature:'RUNOUT',
      title:T('ISO 2768-K — Độ đảo tròn (circular runout)','ISO 2768-K — Circular runout'),
      permitted:{ kind:'TABLE', expression:'0.2 (toàn dải)', unit:'mm' },
      acceptance:T('Đặt trục lên V-block hoặc đầu tâm máy tiện, quay 360° đọc giá trị dao động chỉ thị','Place shaft on V-block or lathe centers, rotate 360°, read indicator deviation'),
      clause:{ number:'ISO 2768-2 Table 4', page:6 }
    },

    // ========== ISO 1101 — GD&T ==========
    { id:'iso1101-flatness',
      standard:'ISO 1101:2017', region:'INT',
      category:'gdt', element:T('Mặt phẳng có GD&T frame','Surface with GD&T frame'), feature:'FLATNESS',
      title:T('GD&T — Độ phẳng (⌭) theo bản vẽ','GD&T — Flatness (⌭) per drawing'),
      permitted:{ kind:'REF', expression:T('Theo giá trị trong khung GD&T','Per value in GD&T frame') },
      acceptance:T('Độ phẳng = khe hở giữa 2 mặt phẳng song song chứa toàn bộ bề mặt. Không phụ thuộc datum.','Flatness = gap between 2 parallel planes containing entire surface. No datum required.'),
      clause:{ number:'ISO 1101 §17.2', page:42,
        quote:'The flatness tolerance defines a tolerance zone limited by two parallel planes a distance t apart.' }
    },
    { id:'iso1101-parallel',
      standard:'ISO 1101:2017', region:'INT',
      category:'gdt', element:T('Mặt phẳng so với datum A','Surface relative to datum A'), feature:'PARALLELISM',
      title:T('GD&T — Độ song song ∥ với datum','GD&T — Parallelism ∥ to datum'),
      permitted:{ kind:'REF', expression:T('Theo giá trị trong khung GD&T (vd: ∥ 0.05 A)','Per value in GD&T frame (e.g.: ∥ 0.05 A)') },
      acceptance:T('Khe hở giữa 2 mặt song song với datum A, cách nhau t. Kiểm bằng surface plate, dial indicator + datum A.','Gap between 2 planes parallel to datum A, distance t. Check with surface plate, dial indicator + datum A.'),
      clause:{ number:'ISO 1101 §18.1', page:44 }
    },
    { id:'iso1101-perp',
      standard:'ISO 1101:2017', region:'INT',
      category:'gdt', element:T('Mặt phẳng vuông góc datum','Surface perpendicular to datum'), feature:'PERPENDICULARITY',
      title:T('GD&T — Độ vuông góc ⟂ với datum','GD&T — Perpendicularity ⟂ to datum'),
      permitted:{ kind:'REF', expression:T('Theo khung GD&T (vd: ⟂ 0.02 A)','Per GD&T frame (e.g.: ⟂ 0.02 A)') },
      acceptance:T('Hai mặt song song vuông góc datum, cách nhau t. Thước vuông + feeler nếu t≥0.05; CMM nếu t<0.05','Two planes ⟂ to datum, distance t. Square + feeler if t≥0.05; CMM if t<0.05'),
      clause:{ number:'ISO 1101 §18.2', page:45 }
    },
    { id:'iso1101-pos',
      standard:'ISO 1101:2017', region:'INT',
      category:'gdt', element:T('Tâm lỗ / điểm trên mặt phẳng','Hole center / point on surface'), feature:'POSITION',
      title:T('GD&T — Vị trí ⊕ (true position)','GD&T — True position ⊕'),
      permitted:{ kind:'REF', expression:T('Theo khung GD&T (vd: ⊕ Ø0.1 A B C)','Per GD&T frame (e.g.: ⊕ Ø0.1 A B C)') },
      acceptance:T('Tâm thực phải nằm trong vùng tròn Ø t quanh vị trí lý thuyết. Cần ≥3 datum đầy đủ để khoá 6 DOF.','True center must lie within Ø t circle around theoretical position. Needs ≥3 datums to lock 6 DOF.'),
      clause:{ number:'ISO 1101 §19.2', page:50,
        quote:'A tolerance zone defined by a cylinder of diameter t whose axis is in the theoretically exact position.' }
    },
    { id:'iso1101-conc',
      standard:'ISO 1101:2017', region:'INT',
      category:'gdt', element:T('Trục đồng tâm với datum','Coaxial axis to datum'), feature:'CONCENTRICITY',
      title:T('GD&T — Đồng tâm ◎','GD&T — Concentricity ◎'),
      permitted:{ kind:'REF', expression:T('Theo khung GD&T (vd: ◎ Ø0.05 A)','Per GD&T frame (e.g.: ◎ Ø0.05 A)') },
      acceptance:T('Trục thực phải nằm trong hình trụ Ø t đồng tâm datum. CMM bắt buộc — không đo được bằng dial.','True axis must lie within cylinder Ø t coaxial with datum. CMM required — cannot measure with dial.'),
      clause:{ number:'ISO 1101 §18.5', page:48 }
    },
    { id:'iso1101-runout',
      standard:'ISO 1101:2017', region:'INT',
      category:'gdt', element:T('Mặt quay quanh trục','Rotating surface around axis'), feature:'RUNOUT',
      title:T('GD&T — Độ đảo tròn ↗ (circular runout)','GD&T — Circular runout ↗'),
      permitted:{ kind:'REF', expression:T('Theo khung GD&T (vd: ↗ 0.05 A)','Per GD&T frame (e.g.: ↗ 0.05 A)') },
      acceptance:T('Sai khác max-min trên dial indicator khi quay 360° quanh datum A. Đo tại nhiều mặt cắt.','Max-min difference on dial indicator when rotating 360° about datum A. Measure at multiple cross-sections.'),
      clause:{ number:'ISO 1101 §20.1', page:54 }
    },

    // ========== ISO 4287 / 1302 — SURFACE ROUGHNESS ==========
    { id:'iso1302-Ra-rough',
      standard:'ISO 4287:1997', region:'INT',
      category:'surface', element:T('Bề mặt thô (cắt, đúc)','Rough surface (cut, cast)'), feature:'ROUGHNESS',
      title:T('Ra 12.5 — Bề mặt thô','Ra 12.5 — Rough'),
      permitted:{ kind:'FIXED', expression:'12.5', unit:'µm' },
      acceptance:T('Ra ≤ 12.5 µm. Mặt đúc khuôn, cắt CNC bằng dao thô, mặt hàn không gia công','Ra ≤ 12.5 µm. Mold-cast, rough CNC, un-machined welded surface'),
      clause:{ number:'ISO 4287 §4.2', page:7 }
    },
    { id:'iso1302-Ra-rough-cnc',
      standard:'ISO 4287:1997', region:'INT',
      category:'surface', element:T('Bề mặt phay/tiện thường','Standard mill/turn surface'), feature:'ROUGHNESS',
      title:T('Ra 3.2 — Phay/tiện thường','Ra 3.2 — Standard mill/turn'),
      permitted:{ kind:'FIXED', expression:'3.2', unit:'µm' },
      acceptance:T('Ra ≤ 3.2 µm. Phay/tiện 2 lần dao, bề mặt cơ khí thông thường. Đo bằng profilometer.','Ra ≤ 3.2 µm. 2-pass mill/turn, common mechanical surface. Measure with profilometer.'),
      clause:{ number:'ISO 4287 §4.2', page:7 }
    },
    { id:'iso1302-Ra-finish',
      standard:'ISO 4287:1997', region:'INT',
      category:'surface', element:T('Bề mặt hoàn thiện','Finished surface'), feature:'ROUGHNESS',
      title:T('Ra 1.6 — Mặt lắp ghép','Ra 1.6 — Mating surface'),
      permitted:{ kind:'FIXED', expression:'1.6', unit:'µm' },
      acceptance:T('Ra ≤ 1.6 µm. Mặt lắp ghép tiếp xúc, lắp lăn nhẹ. Cần 3-4 lần dao tinh hoặc mài.','Ra ≤ 1.6 µm. Mating/sliding surface, light rolling. Needs 3-4 finishing passes or grinding.'),
      clause:{ number:'ISO 4287 §4.2', page:7 }
    },
    { id:'iso1302-Ra-precision',
      standard:'ISO 4287:1997', region:'INT',
      category:'surface', element:T('Bề mặt chính xác','Precision surface'), feature:'ROUGHNESS',
      title:T('Ra 0.8 — Mặt làm việc chính xác','Ra 0.8 — Precision working surface'),
      permitted:{ kind:'FIXED', expression:'0.8', unit:'µm' },
      acceptance:T('Ra ≤ 0.8 µm. Mặt vòng bi, mặt chốt định vị, mặt làm kín O-ring. Cần mài + lapping.','Ra ≤ 0.8 µm. Bearing seat, dowel pin surface, O-ring sealing surface. Needs grinding + lapping.'),
      clause:{ number:'ISO 4287 §4.2', page:7 }
    },
    { id:'iso1302-Ra-mirror',
      standard:'ISO 4287:1997', region:'INT',
      category:'surface', element:T('Bề mặt gương','Mirror finish'), feature:'ROUGHNESS',
      title:T('Ra 0.2 — Hoàn thiện gương','Ra 0.2 — Mirror finish'),
      permitted:{ kind:'FIXED', expression:'0.2', unit:'µm' },
      acceptance:T('Ra ≤ 0.2 µm. Mặt khuôn nhựa, optic, áp lực cao. Cần lapping/polishing chuyên dụng.','Ra ≤ 0.2 µm. Plastic mold, optical, high-pressure. Specialized lapping/polishing required.'),
      clause:{ number:'ISO 4287 §4.2', page:7 }
    },

    // ========== ISO 965 — METRIC THREADS ==========
    { id:'iso965-6H-int',
      standard:'ISO 965-1:2013', region:'INT',
      category:'thread', element:T('Ren trong (đai ốc)','Internal thread (nut)'), feature:'THREAD CLASS',
      title:T('Ren M trong cấp 6H — chuẩn','Internal thread M 6H — standard'),
      permitted:{ kind:'TABLE',
        expression:T('Dung sai cốt trục theo M-size (vd M10: TD₂ = 132 µm)','Pitch dia. tol. by M-size (e.g. M10: TD₂ = 132 µm)'), unit:'µm' },
      acceptance:T('Cấp 6H — mặc định cho ren đai ốc bình thường. Kiểm bằng GO/NO-GO ring/plug gauge ISO 1502','Class 6H — default for normal nut threads. Check with GO/NO-GO ring/plug gauge ISO 1502'),
      clause:{ number:'ISO 965-1 Table 1', page:8,
        quote:'Internal thread tolerance grade 6H provides medium quality for general use.' }
    },
    { id:'iso965-6g-ext',
      standard:'ISO 965-1:2013', region:'INT',
      category:'thread', element:T('Ren ngoài (bulông)','External thread (bolt)'), feature:'THREAD CLASS',
      title:T('Ren M ngoài cấp 6g — chuẩn','External thread M 6g — standard'),
      permitted:{ kind:'TABLE',
        expression:T('Td₂ theo M-size (vd M10×1.5: −32 / −172 µm)','Td₂ by M-size (e.g. M10×1.5: −32 / −172 µm)'), unit:'µm' },
      acceptance:T('Cấp 6g — mặc định cho bulông cấp 8.8/10.9. Kiểm bằng ring gauge GO/NO-GO. Lắp cặp với ren 6H.','Class 6g — default for grade 8.8/10.9 bolts. Check with GO/NO-GO ring gauge. Pairs with 6H thread.'),
      clause:{ number:'ISO 965-1 Table 2', page:9 }
    },

    // ========== ISO 13715 — EDGES ==========
    { id:'iso13715-edge',
      standard:'ISO 13715:2017', region:'INT',
      category:'machining', element:T('Cạnh sắc / bavia','Sharp edges / burr'), feature:'EDGE',
      title:T('Cạnh máy gia công — bavia & vê tròn','Machined edges — burr & rounding'),
      permitted:{ kind:'REF', expression:T('Theo ký hiệu bản vẽ: −0.3 (vê), +0.3 (bavia), ±0.3 (cả hai)','Per drawing symbol: −0.3 (rounded), +0.3 (burr), ±0.3 (either)') },
      acceptance:T('Không có chỉ định → ±0.5 mm. Bavia phải rebo trước lắp ráp. Sharp edge ⌀ < 0.05 mm = cạnh sắc.','No spec → ±0.5 mm. Burr must be deburred before assembly. Sharp edge ⌀ < 0.05 mm.'),
      clause:{ number:'ISO 13715 §5.2', page:6 }
    },

    // ========== ASME Y14.5 ==========
    { id:'asme-flatness',
      standard:'ASME Y14.5:2018', region:'US',
      category:'gdt', element:T('Bề mặt với GD&T frame','Surface with GD&T frame'), feature:'FLATNESS',
      title:T('ASME Y14.5 — Flatness (US GD&T)','ASME Y14.5 — Flatness'),
      permitted:{ kind:'REF', expression:T('Theo khung GD&T trên bản vẽ ANSI','Per ANSI drawing GD&T frame') },
      acceptance:T('Tương đương ISO 1101 nhưng ký hiệu hơi khác. Có RFS/MMC/LMC modifiers.','Equivalent to ISO 1101 but slightly different symbols. Has RFS/MMC/LMC modifiers.'),
      clause:{ number:'ASME Y14.5 §5.4', page:90,
        quote:'Flatness is a condition of a surface having all its elements in one plane.' }
    },

    // ========== JIS B 0405 (general tolerances) ==========
    { id:'jis-b0405-m',
      standard:'JIS B 0405:1991', region:'JP',
      category:'machining', element:T('Kích thước thẳng (Nhật)','Linear (Japan)'), feature:'GENERAL',
      title:T('JIS B 0405-m — Dung sai chung trung bình','JIS B 0405-m — General medium'),
      permitted:{ kind:'TABLE', expression:T('Bản chất tương đương ISO 2768-m','Substantively equivalent to ISO 2768-m'), unit:'mm' },
      acceptance:T('Áp dụng cho bản vẽ Nhật. Khi không chỉ định, cấp m là mặc định.','For Japanese drawings. Class m default when not specified.'),
      clause:{ number:'JIS B 0405 Table 1', page:5 }
    }
  ];

  rules.forEach(function(r){ D.tolerances.push(r); });

  console.log('Tier 4 (Cơ khí) loaded: ' + rules.length + ' rules, ' + stds.length + ' standards');
})();
