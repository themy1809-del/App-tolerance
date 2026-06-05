/* Dữ liệu kiểm tra vật tư kết cấu thép — đa tiêu chuẩn EN / ASTM / JIS / ISO */
window.VT_DATA = {
  /* =========== CATEGORIES =========== */
  categories: [
    {id:'plate_tol',  name_vi:'Dung sai tấm',     name_en:'Plate tolerance',     icon:'⬜', color:'#0c447c'},
    {id:'section_tol',name_vi:'Dung sai thép hình', name_en:'Section tolerance', icon:'🏗️', color:'#185fa5'},
    {id:'tube_tol',   name_vi:'Dung sai ống/hộp',  name_en:'Tube/HSS tolerance',  icon:'🚰', color:'#7c3f00'},
    {id:'spec',       name_vi:'Spec vật liệu',     name_en:'Material spec',       icon:'🧪', color:'#3b6d11'},
    {id:'cert',       name_vi:'Chứng từ (MTC)',    name_en:'Mill Test Cert',      icon:'📋', color:'#5f6b7a'},
    {id:'surface',    name_vi:'Bề mặt + Gỉ',       name_en:'Surface + Rust',      icon:'🎨', color:'#7a2024'},
    {id:'ndt',        name_vi:'NDT vật tư',         name_en:'NDT incoming',       icon:'📡', color:'#534ab7'}
  ],

  /* =========== STANDARDS =========== */
  standards: [
    {code:'EN 10029',    name:'Tấm thép — Dung sai chiều dày & độ phẳng', region:'EU'},
    {code:'EN 10034',    name:'Thép hình I/H — Dung sai kích thước & hình dáng', region:'EU'},
    {code:'EN 10056',    name:'Thép góc đều/không đều — Dung sai', region:'EU'},
    {code:'EN 10279',    name:'Thép U — Dung sai', region:'EU'},
    {code:'EN 10210-2',  name:'Hollow section nóng — Dung sai', region:'EU'},
    {code:'EN 10219-2',  name:'Hollow section nguội — Dung sai', region:'EU'},
    {code:'EN 10051',    name:'Tấm cuộn cán nóng — Dung sai', region:'EU'},
    {code:'EN 10025-1',  name:'Yêu cầu chung thép kết cấu cán nóng', region:'EU'},
    {code:'EN 10025-2',  name:'Spec thép cacbon kết cấu (S235/S275/S355/S460)', region:'EU'},
    {code:'EN 10204',    name:'Chứng từ kiểm tra (2.1/2.2/3.1/3.2)', region:'EU'},
    {code:'EN 10163',    name:'Cấp bề mặt tấm & thép hình', region:'EU'},
    {code:'EN 10164',    name:'Z-quality — kháng nứt lớp (Z15/Z25/Z35)', region:'EU'},
    {code:'EN 10160',    name:'UT tấm thép', region:'EU'},
    {code:'ASTM A6',     name:'Yêu cầu chung thép cán', region:'US'},
    {code:'ASTM A36',    name:'Thép cacbon kết cấu thường', region:'US'},
    {code:'ASTM A572',   name:'HSLA Gr.42/50/60/65', region:'US'},
    {code:'ASTM A992',   name:'Wide-flange (W-shapes)', region:'US'},
    {code:'ASTM A500',   name:'HSS hộp/ống nguội', region:'US'},
    {code:'ASTM A53',    name:'Ống thép cacbon', region:'US'},
    {code:'ASTM A106',   name:'Ống áp lực', region:'US'},
    {code:'ASTM A516',   name:'Tấm bồn áp lực', region:'US'},
    {code:'ASTM A435',   name:'UT tấm — longitudinal', region:'US'},
    {code:'ASTM A578',   name:'UT tấm — straight beam', region:'US'},
    {code:'JIS G3192',   name:'Dung sai thép hình cán nóng', region:'JP'},
    {code:'JIS G3193',   name:'Dung sai tấm/cuộn cán nóng', region:'JP'},
    {code:'JIS G3101',   name:'SS400 — Thép cấu trúc thường', region:'JP'},
    {code:'JIS G3106',   name:'SM400/SM490 — Thép hàn được', region:'JP'},
    {code:'JIS G3136',   name:'SN400/SN490 — Kháng địa chấn', region:'JP'},
    {code:'JIS G3444',   name:'STK — Ống cấu trúc thường', region:'JP'},
    {code:'JIS G3466',   name:'STKR — Hộp vuông/CN', region:'JP'},
    {code:'GB/T 700',    name:'Q235 — Cacbon thường', region:'CN'},
    {code:'GB/T 1591',   name:'Q345/Q355/Q460 — Hợp kim thấp', region:'CN'},
    {code:'ISO 8501-1',  name:'Cấp gỉ & cấp làm sạch bề mặt', region:'INT'}
  ],

  /* =========== ITEMS =========== */
  items: [
    /* ===== EN 10029 — Tấm dung sai ===== */
    {id:'EN10029-thk-A', cat:'plate_tol', std:'EN 10029',
     title_vi:'Dung sai chiều dày tấm — Cấp A (Class A — chuẩn)',
     title_en:'Plate thickness tolerance — Class A',
     element:'plate', region:'EU',
     spec:[
       {label:'Dày 3 ≤ t < 5 mm', value:'−0.4 / +0.8 mm'},
       {label:'Dày 5 ≤ t < 8 mm', value:'−0.4 / +1.1 mm'},
       {label:'Dày 8 ≤ t < 15 mm',value:'−0.5 / +1.2 mm'},
       {label:'Dày 15 ≤ t < 25 mm',value:'−0.6 / +1.4 mm'},
       {label:'Dày 25 ≤ t < 40 mm',value:'−0.8 / +1.7 mm'},
       {label:'Dày 40 ≤ t < 80 mm',value:'−1.0 / +2.4 mm'},
       {label:'Dày 80 ≤ t < 150 mm',value:'−1.4 / +2.8 mm'}
     ],
     note_vi:'Cấp A là mặc định khi không chỉ định. Có thể đặt Class B (sai lệch ±), C (chỉ + thấp), D (chỉ +).',
     clause:'EN 10029:2010 §7 Table 1'},

    {id:'EN10029-flat', cat:'plate_tol', std:'EN 10029',
     title_vi:'Dung sai độ phẳng tấm — Class N (normal)',
     title_en:'Plate flatness — Class N',
     element:'plate', region:'EU',
     spec:[
       {label:'Dày 3 ≤ t < 5 mm, L ≤ 1500', value:'≤ 9 mm'},
       {label:'Dày 5 ≤ t < 8 mm, L ≤ 2000', value:'≤ 8 mm'},
       {label:'Dày 8 ≤ t < 15 mm, L ≤ 3000',value:'≤ 8 mm'},
       {label:'Dày 15 ≤ t ≤ 25 mm, L ≤ 4000',value:'≤ 9 mm'},
       {label:'Dày > 25 mm, L ≤ 4000',     value:'≤ 9 mm'}
     ],
     note_vi:'Có Class S (special flatness — chặt hơn ~50%) khi yêu cầu. Đo trên đoạn 1000 mm.',
     clause:'EN 10029:2010 §8 Table 4'},

    /* ===== EN 10034 — I/H section ===== */
    {id:'EN10034-Hflange', cat:'section_tol', std:'EN 10034',
     title_vi:'Dung sai chiều rộng cánh thép H/I',
     title_en:'Flange width tolerance — H/I section',
     element:'I-beam, H-beam, IPE, HEA, HEB', region:'EU',
     spec:[
       {label:'Bề rộng cánh b < 110 mm', value:'±2.0 mm'},
       {label:'110 ≤ b < 210 mm',          value:'±3.0 mm'},
       {label:'210 ≤ b < 325 mm',          value:'±4.0 mm'},
       {label:'b ≥ 325 mm',                value:'±5.0 mm'}
     ],
     clause:'EN 10034:1993 Table 1'},

    {id:'EN10034-Hheight', cat:'section_tol', std:'EN 10034',
     title_vi:'Dung sai chiều cao bụng thép H/I',
     title_en:'Web height tolerance — H/I section',
     element:'I-beam, H-beam', region:'EU',
     spec:[
       {label:'Cao h < 180 mm',  value:'±2.0 mm'},
       {label:'180 ≤ h < 400 mm',value:'±3.0 mm'},
       {label:'400 ≤ h < 700 mm',value:'±4.0 mm'},
       {label:'h ≥ 700 mm',     value:'±5.0 mm'}
     ],
     clause:'EN 10034:1993 Table 1'},

    {id:'EN10034-out-of-square', cat:'section_tol', std:'EN 10034',
     title_vi:'Độ không vuông cánh-bụng (out of square)',
     title_en:'Out of square flange/web',
     element:'I-beam, H-beam', region:'EU',
     spec:[
       {label:'k = (k1+k2)', value:'≤ 2% × b nhưng tối thiểu 6.5 mm'}
     ],
     note_vi:'b = bề rộng cánh. Đo tại 1 m từ đầu thanh.',
     clause:'EN 10034:1993 Table 2'},

    {id:'EN10034-web-off', cat:'section_tol', std:'EN 10034',
     title_vi:'Lệch tâm bụng (web off-center)',
     title_en:'Web off-centre',
     element:'I-beam, H-beam', region:'EU',
     spec:[
       {label:'b < 110 mm',value:'≤ 2.5 mm'},
       {label:'b ≥ 110 mm', value:'≤ 3.5 mm'}
     ],
     clause:'EN 10034:1993 Table 2'},

    {id:'EN10034-straight', cat:'section_tol', std:'EN 10034',
     title_vi:'Độ cong dọc theo trục y-y và z-z',
     title_en:'Straightness y-y and z-z',
     element:'I-beam, H-beam', region:'EU',
     spec:[
       {label:'h ≤ 180 mm', value:'0.30% × L'},
       {label:'180 < h ≤ 360 mm',value:'0.15% × L'},
       {label:'h > 360 mm',   value:'0.10% × L'}
     ],
     note_vi:'L = chiều dài thanh. Tốt hơn EN 1090-2 cho phép.',
     clause:'EN 10034:1993 Table 2'},

    /* ===== EN 10056 — Angle ===== */
    {id:'EN10056-leg', cat:'section_tol', std:'EN 10056',
     title_vi:'Dung sai chiều dài cạnh — Thép góc đều',
     title_en:'Leg length tolerance — Equal-leg angle',
     element:'L-angle', region:'EU',
     spec:[
       {label:'Cạnh ≤ 50 mm',  value:'±1.0 mm'},
       {label:'50 < cạnh ≤ 100 mm',value:'±2.0 mm'},
       {label:'100 < cạnh ≤ 150 mm',value:'±3.0 mm'},
       {label:'Cạnh > 150 mm',  value:'±4.0 mm'}
     ],
     clause:'EN 10056-2:1993 Table 1'},

    {id:'EN10056-angle', cat:'section_tol', std:'EN 10056',
     title_vi:'Góc giữa 2 cạnh (sai lệch khỏi 90°)',
     title_en:'Angle between legs',
     element:'L-angle', region:'EU',
     spec:[
       {label:'Tất cả kích cỡ', value:'±30 phút (±0.5°)'}
     ],
     clause:'EN 10056-2:1993 Table 1'},

    /* ===== EN 10210/10219 — Hollow section ===== */
    {id:'EN10210-side', cat:'tube_tol', std:'EN 10210-2',
     title_vi:'Dung sai cạnh ngoài — Ống hộp vuông/CN (hot-finished)',
     title_en:'Outside dimension SHS/RHS hot-finished',
     element:'HSS, SHS, RHS', region:'EU',
     spec:[
       {label:'Cạnh ≤ 100 mm', value:'±1% nhưng ≥ ±0.5 mm'},
       {label:'Cạnh > 100 mm',  value:'±0.8% nhưng ≥ ±0.8 mm'}
     ],
     clause:'EN 10210-2:2019 Table B.3'},

    {id:'EN10210-thk', cat:'tube_tol', std:'EN 10210-2',
     title_vi:'Dung sai chiều dày thành ống hộp (hot-finished)',
     title_en:'Wall thickness HSS hot-finished',
     element:'HSS', region:'EU',
     spec:[
       {label:'Mọi kích cỡ', value:'−10% / +không yêu cầu'}
     ],
     clause:'EN 10210-2:2019 Table B.3'},

    {id:'EN10210-twist', cat:'tube_tol', std:'EN 10210-2',
     title_vi:'Độ xoắn ống hộp (twist)',
     title_en:'Twist HSS',
     element:'HSS, SHS, RHS', region:'EU',
     spec:[
       {label:'Per m', value:'2 mm + 0.5 mm/m'}
     ],
     clause:'EN 10210-2:2019 Table B.3'},

    {id:'EN10210-square', cat:'tube_tol', std:'EN 10210-2',
     title_vi:'Độ vuông góc (cạnh — bán kính góc)',
     title_en:'Squareness of sides',
     element:'SHS, RHS', region:'EU',
     spec:[
       {label:'Sai lệch khỏi 90°', value:'±1°'}
     ],
     clause:'EN 10210-2:2019 Table B.3'},

    {id:'EN10219-side', cat:'tube_tol', std:'EN 10219-2',
     title_vi:'Dung sai cạnh ngoài — Hộp cold-formed',
     title_en:'Outside dim SHS/RHS cold-formed',
     element:'HSS cold-formed', region:'EU',
     spec:[
       {label:'Cạnh ≤ 100 mm', value:'±1% nhưng ≥ ±0.5 mm'},
       {label:'Cạnh > 100 mm', value:'±0.8%'}
     ],
     clause:'EN 10219-2:2019 Table B.4'},

    /* ===== ASTM A6 (general rolled) ===== */
    {id:'ASTM-A6-Hflange', cat:'section_tol', std:'ASTM A6',
     title_vi:'Dung sai cánh W-shape (ASTM A6)',
     title_en:'W-shape flange tolerance',
     element:'W-shape, A992', region:'US',
     spec:[
       {label:'Cánh b ≤ 152 mm (6")', value:'±3.2 mm (1/8")'},
       {label:'152 < b ≤ 305 mm', value:'±4.8 mm (3/16")'},
       {label:'b > 305 mm',  value:'±6.4 mm (1/4")'}
     ],
     clause:'ASTM A6/A6M Table 17'},

    {id:'ASTM-A500-side', cat:'tube_tol', std:'ASTM A500',
     title_vi:'Dung sai HSS ASTM A500 (cạnh)',
     title_en:'A500 HSS outside dimension',
     element:'HSS, RHS, SHS', region:'US',
     spec:[
       {label:'Cạnh ≤ 1.5"', value:'±0.5 mm (±0.020")'},
       {label:'1.5" < cạnh ≤ 2.5"', value:'±0.6 mm'},
       {label:'2.5" < cạnh ≤ 5.5"', value:'±0.75 mm'},
       {label:'5.5" < cạnh ≤ 7.5"', value:'±1.5 mm'},
       {label:'cạnh > 7.5"', value:'±1% nominal'}
     ],
     clause:'ASTM A500-21a §8'},

    /* ===== EN 10025-2 SPECS ===== */
    {id:'S235JR', cat:'spec', std:'EN 10025-2',
     title_vi:'S235JR — Thép cacbon thường, kháng va đập 27J @ 20°C',
     title_en:'S235JR — Mild carbon, 27J@+20°C',
     element:'plate, section, tube', region:'EU',
     spec:[
       {label:'Ký hiệu cũ', value:'Fe 360 B'},
       {label:'C max (16-40 mm)', value:'≤ 0.19%'},
       {label:'Mn max', value:'≤ 1.40%'},
       {label:'S max', value:'≤ 0.045%'},
       {label:'P max', value:'≤ 0.045%'},
       {label:'Cu max', value:'≤ 0.55%'},
       {label:'N max', value:'≤ 0.012%'},
       {label:'Yield ReH (t ≤ 16 mm)', value:'≥ 235 MPa'},
       {label:'Tensile Rm (3<t≤100)', value:'360-510 MPa'},
       {label:'Elongation A (t ≤ 40)', value:'≥ 26%'},
       {label:'Charpy @ +20°C', value:'≥ 27 J'}
     ],
     clause:'EN 10025-2:2019 Table 4 + Table 7'},

    {id:'S355J2', cat:'spec', std:'EN 10025-2',
     title_vi:'S355J2 — Hợp kim thấp, kháng va đập 27J @ -20°C',
     title_en:'S355J2 — Low alloy, 27J@-20°C',
     element:'plate, section, tube', region:'EU',
     spec:[
       {label:'C max (≤ 40 mm)', value:'≤ 0.20%'},
       {label:'Mn max', value:'≤ 1.60%'},
       {label:'Si max', value:'≤ 0.55%'},
       {label:'S max', value:'≤ 0.025%'},
       {label:'P max', value:'≤ 0.025%'},
       {label:'Cu max', value:'≤ 0.55%'},
       {label:'N — không yêu cầu nếu Al ≥ 0.020% hoặc có Nb/Ti/V', value:''},
       {label:'Yield ReH (t ≤ 16 mm)', value:'≥ 355 MPa'},
       {label:'Tensile Rm (3<t≤100)', value:'470-630 MPa'},
       {label:'Elongation A (t ≤ 40)', value:'≥ 22%'},
       {label:'Charpy @ -20°C', value:'≥ 27 J'}
     ],
     note_vi:'Phổ biến nhất cho kết cấu kéo dài làm việc ngoài trời.',
     clause:'EN 10025-2:2019 Table 4 + Table 7'},

    {id:'S275JR', cat:'spec', std:'EN 10025-2',
     title_vi:'S275JR — Trung gian S235/S355, 27J @ +20°C',
     title_en:'S275JR',
     element:'plate, section', region:'EU',
     spec:[
       {label:'C max (≤ 40 mm)', value:'≤ 0.21%'},
       {label:'Yield ReH', value:'≥ 275 MPa'},
       {label:'Tensile Rm', value:'410-560 MPa'},
       {label:'Elongation A', value:'≥ 23%'},
       {label:'Charpy @ +20°C', value:'≥ 27 J'}
     ],
     clause:'EN 10025-2:2019'},

    /* ===== ASTM SPECS ===== */
    {id:'A36', cat:'spec', std:'ASTM A36',
     title_vi:'ASTM A36 — Cacbon thường (≈ S235)',
     title_en:'ASTM A36',
     element:'plate, section', region:'US',
     spec:[
       {label:'C max (t ≤ 19 mm)', value:'≤ 0.25%'},
       {label:'Mn (t > 19 mm)', value:'0.80-1.20%'},
       {label:'Si max', value:'0.40%'},
       {label:'S max', value:'0.05%'},
       {label:'P max', value:'0.04%'},
       {label:'Yield min', value:'≥ 250 MPa (36 ksi)'},
       {label:'Tensile', value:'400-550 MPa (58-80 ksi)'},
       {label:'Elongation 200mm', value:'≥ 20%'},
       {label:'Elongation 50mm', value:'≥ 23%'}
     ],
     clause:'ASTM A36/A36M-19 §6, §7'},

    {id:'A572-50', cat:'spec', std:'ASTM A572',
     title_vi:'ASTM A572 Gr.50 — HSLA (≈ S355)',
     title_en:'ASTM A572 Gr.50',
     element:'plate, section', region:'US',
     spec:[
       {label:'C max', value:'≤ 0.23%'},
       {label:'Mn max', value:'≤ 1.35%'},
       {label:'P max', value:'≤ 0.04%'},
       {label:'S max', value:'≤ 0.05%'},
       {label:'Vanadi (V)', value:'0.01-0.15%'},
       {label:'Yield min', value:'≥ 345 MPa (50 ksi)'},
       {label:'Tensile min', value:'≥ 450 MPa (65 ksi)'},
       {label:'Elongation 200mm', value:'≥ 18%'},
       {label:'Elongation 50mm', value:'≥ 21%'}
     ],
     clause:'ASTM A572/A572M-21'},

    {id:'A992', cat:'spec', std:'ASTM A992',
     title_vi:'ASTM A992 — Wide-flange chuẩn USA',
     title_en:'ASTM A992 — W-shapes',
     element:'W-shape', region:'US',
     spec:[
       {label:'C max', value:'≤ 0.23%'},
       {label:'Mn', value:'0.50-1.50%'},
       {label:'Si max', value:'≤ 0.40%'},
       {label:'V max', value:'≤ 0.15%'},
       {label:'Nb max', value:'≤ 0.05%'},
       {label:'Yield', value:'345-450 MPa (50-65 ksi)'},
       {label:'Tensile min', value:'≥ 450 MPa'},
       {label:'Yield/Tensile ratio', value:'≤ 0.85 (đảm bảo dẻo dai)'},
       {label:'CE max', value:'≤ 0.45%'}
     ],
     note_vi:'Thay thế cho A36 cho thép W. Có CE max để đảm bảo hàn được.',
     clause:'ASTM A992/A992M-20'},

    {id:'A500-B', cat:'spec', std:'ASTM A500',
     title_vi:'ASTM A500 Gr.B — Hộp cold-formed phổ biến',
     title_en:'ASTM A500 Gr.B HSS',
     element:'HSS', region:'US',
     spec:[
       {label:'C max', value:'≤ 0.26%'},
       {label:'Mn max', value:'≤ 1.35%'},
       {label:'P max', value:'≤ 0.035%'},
       {label:'S max', value:'≤ 0.035%'},
       {label:'Yield min', value:'≥ 290 MPa (42 ksi)'},
       {label:'Tensile min', value:'≥ 400 MPa (58 ksi)'},
       {label:'Elongation 50mm', value:'≥ 23%'}
     ],
     clause:'ASTM A500/A500M-21a'},

    {id:'SA516-70', cat:'spec', std:'ASTM A516',
     title_vi:'ASME SA516 Gr.70 — Tấm bồn áp lực (phổ biến)',
     title_en:'ASME SA516 Gr.70 PV plate',
     element:'plate', region:'US',
     spec:[
       {label:'C max (t ≤ 13 mm)', value:'≤ 0.27%'},
       {label:'Mn (t ≤ 13 mm)', value:'0.79-1.30%'},
       {label:'Si', value:'0.13-0.45%'},
       {label:'P max', value:'≤ 0.025%'},
       {label:'S max', value:'≤ 0.025%'},
       {label:'Yield min', value:'≥ 260 MPa (38 ksi)'},
       {label:'Tensile', value:'485-620 MPa (70-90 ksi)'},
       {label:'Elongation 200mm', value:'≥ 17%'}
     ],
     note_vi:'Bắt buộc test Charpy nếu dùng cho ASME VIII Div.1 dày > 25 mm hoặc ngoài trời.',
     clause:'ASTM A516/A516M-21'},

    /* ===== JIS SPECS ===== */
    {id:'SS400', cat:'spec', std:'JIS G3101',
     title_vi:'JIS SS400 — Thép kết cấu thường Nhật',
     title_en:'JIS SS400',
     element:'plate, section', region:'JP',
     spec:[
       {label:'P max', value:'≤ 0.050%'},
       {label:'S max', value:'≤ 0.050%'},
       {label:'Yield (16 < t ≤ 40 mm)', value:'≥ 235 MPa'},
       {label:'Tensile', value:'400-510 MPa'},
       {label:'Elongation (t > 16 mm)', value:'≥ 21%'}
     ],
     note_vi:'KHÔNG yêu cầu test Charpy. Thay thế dần bằng SN400 cho công trình chịu địa chấn.',
     clause:'JIS G3101:2020'},

    {id:'SN400B', cat:'spec', std:'JIS G3136',
     title_vi:'JIS SN400B — Kháng địa chấn (Nhật)',
     title_en:'JIS SN400B',
     element:'plate, section', region:'JP',
     spec:[
       {label:'C max', value:'≤ 0.20%'},
       {label:'Mn', value:'≤ 1.40%'},
       {label:'Yield', value:'235-355 MPa (RANGE)'},
       {label:'Tensile', value:'400-510 MPa'},
       {label:'Y/T ratio', value:'≤ 80%'},
       {label:'Elongation', value:'≥ 22%'},
       {label:'Charpy 0°C', value:'≥ 27 J'},
       {label:'PWHT recovery', value:'≥ 95%'}
     ],
     clause:'JIS G3136:2020'},

    /* ===== EN 10204 — CHỨNG TỪ ===== */
    {id:'cert-2.1', cat:'cert', std:'EN 10204',
     title_vi:'Loại 2.1 — Cam kết nhà sản xuất',
     title_en:'Type 2.1 — Declaration of compliance',
     element:'cert', region:'EU',
     spec:[
       {label:'Nội dung', value:'Cam kết SẢN PHẨM phù hợp với đơn hàng, KHÔNG kèm test results'},
       {label:'Người ký', value:'Nhà sản xuất'},
       {label:'Khi dùng', value:'Vật tư không quan trọng — bolt thường, đệm…'}
     ],
     clause:'EN 10204:2004'},

    {id:'cert-2.2', cat:'cert', std:'EN 10204',
     title_vi:'Loại 2.2 — Test report (không xuất xứ riêng)',
     title_en:'Type 2.2 — Test report',
     element:'cert', region:'EU',
     spec:[
       {label:'Nội dung', value:'Kết quả test PHI-CỤ THỂ — số liệu trung bình lô sản xuất'},
       {label:'Người ký', value:'Nhà sản xuất'},
       {label:'Khi dùng', value:'Vật tư phụ — bracket, gussets phụ'}
     ],
     clause:'EN 10204:2004'},

    {id:'cert-3.1', cat:'cert', std:'EN 10204',
     title_vi:'Loại 3.1 — Inspection certificate (PHỔ BIẾN NHẤT)',
     title_en:'Type 3.1 — Inspection certificate',
     element:'cert', region:'EU',
     spec:[
       {label:'Nội dung', value:'Số liệu test THỰC TẾ trên từng lô/heat — chemistry + cơ tính + nhận dạng'},
       {label:'Người ký', value:'Bộ phận QC ĐỘC LẬP của nhà sản xuất (không thuộc bộ phận sản xuất)'},
       {label:'Khi dùng', value:'BẮT BUỘC cho kết cấu chính, mối hàn quan trọng — vd EN 1090 EXC2+'}
     ],
     note_vi:'Phổ biến nhất ở Việt Nam. Nhớ kiểm tra heat number trùng với mác in trên tấm/thép hình.',
     clause:'EN 10204:2004'},

    {id:'cert-3.2', cat:'cert', std:'EN 10204',
     title_vi:'Loại 3.2 — Có witness/bên thứ 3',
     title_en:'Type 3.2 — Witnessed by 3rd party',
     element:'cert', region:'EU',
     spec:[
       {label:'Nội dung', value:'Như 3.1 + được CHỨNG KIẾN bởi tổ chức kiểm định độc lập (Lloyd, BV, SGS, TÜV…)'},
       {label:'Người ký', value:'QC nhà SX + Inspector bên thứ 3'},
       {label:'Khi dùng', value:'Áp lực cao, nuclear, marine — EN 1090 EXC3+, ASME §VIII'}
     ],
     clause:'EN 10204:2004'},

    /* ===== ISO 8501-1 RUST GRADES ===== */
    {id:'rust-A', cat:'surface', std:'ISO 8501-1',
     title_vi:'Cấp gỉ A — Bề mặt còn vảy cán nguyên (mill scale)',
     title_en:'Rust grade A — Steel surface largely covered with adherent mill scale',
     element:'surface', region:'INT',
     spec:[
       {label:'Mô tả', value:'Bề mặt thép còn phủ đầy lớp vảy cán bám chặt, ít hoặc không gỉ.'},
       {label:'Khi nào gặp', value:'Tấm/thép hình MỚI từ nhà máy, chưa chịu thời tiết.'},
       {label:'Yêu cầu xử lý', value:'Cần thổi cát (Sa 2½) trước khi sơn — không sơn lên vảy cán.'}
     ],
     clause:'ISO 8501-1:2007'},

    {id:'rust-B', cat:'surface', std:'ISO 8501-1',
     title_vi:'Cấp gỉ B — Vảy cán bắt đầu bong + gỉ xuất hiện',
     title_en:'Rust grade B — Mill scale beginning to flake + initial rust',
     element:'surface', region:'INT',
     spec:[
       {label:'Mô tả', value:'Vảy cán đã bắt đầu bong tróc, đốm gỉ xuất hiện rải rác.'},
       {label:'Khi nào gặp', value:'Vật tư bị mưa dầm 1-3 tháng tại bãi.'},
       {label:'Yêu cầu xử lý', value:'Sa 2½ tối thiểu, kiểm tra độ ẩm ≤ 80%.'}
     ],
     clause:'ISO 8501-1:2007'},

    {id:'rust-C', cat:'surface', std:'ISO 8501-1',
     title_vi:'Cấp gỉ C — Vảy đã bay hết, bề mặt gỉ đều',
     title_en:'Rust grade C — Mill scale gone, general rust',
     element:'surface', region:'INT',
     spec:[
       {label:'Mô tả', value:'Vảy cán đã bay sạch, toàn bộ bề mặt phủ gỉ vàng đỏ.'},
       {label:'Khi nào gặp', value:'Vật tư cũ — bãi 6 tháng — 1 năm.'},
       {label:'Yêu cầu xử lý', value:'Sa 2½ hoặc 3 — đảm bảo hết gỉ. Có thể có rỗ nhẹ.'}
     ],
     clause:'ISO 8501-1:2007'},

    {id:'rust-D', cat:'surface', std:'ISO 8501-1',
     title_vi:'Cấp gỉ D — RỖ sâu nhìn rõ',
     title_en:'Rust grade D — Pitting visible',
     element:'surface', region:'INT',
     spec:[
       {label:'Mô tả', value:'Bề mặt đã có rỗ ăn mòn sâu, không phẳng nữa.'},
       {label:'Khi nào gặp', value:'Vật tư cũ > 1 năm, để ngoài trời ven biển.'},
       {label:'Quyết định', value:'⚠ KIỂM TRA siêu âm dày — nếu giảm >10% phải LOẠI BỎ. Nếu OK thì Sa 3.'}
     ],
     clause:'ISO 8501-1:2007'},

    {id:'clean-Sa2.5', cat:'surface', std:'ISO 8501-1',
     title_vi:'Sa 2½ — Very thorough blast (chuẩn cho sơn epoxy)',
     title_en:'Sa 2½ — Very thorough blast-cleaning',
     element:'surface prep', region:'INT',
     spec:[
       {label:'Mô tả', value:'Loại bỏ hầu hết vảy cán, gỉ, sơn cũ. Còn lại chỉ là vết bóng nhẹ.'},
       {label:'Profile', value:'Rz 50-80 µm (cho epoxy/zinc primer)'},
       {label:'Áp dụng cho', value:'Sơn epoxy, zinc-rich, polyurethane (>95% case)'}
     ],
     clause:'ISO 8501-1:2007 + ISO 8501-2'},

    /* ===== EN 10164 — Z quality ===== */
    {id:'Z25', cat:'spec', std:'EN 10164',
     title_vi:'Z25 — Cấp Z trung bình (≥ 15% RA across thickness)',
     title_en:'Z25 — Through-thickness deformation property',
     element:'plate', region:'EU',
     spec:[
       {label:'Reduction of area Z', value:'≥ 15% (Z15) / ≥ 25% (Z25) / ≥ 35% (Z35)'},
       {label:'S max', value:'≤ 0.010% (giảm S để tránh nứt lớp)'},
       {label:'Khi nào dùng', value:'Liên kết T chịu kéo theo phương dày, vd cột chịu nhổ.'}
     ],
     note_vi:'EN 1993 yêu cầu Z25 hoặc Z35 cho mối hàn chữ T có ứng suất ngang.',
     clause:'EN 10164:2018'},

    /* ===== NDT incoming ===== */
    {id:'EN10160-S0-E0', cat:'ndt', std:'EN 10160',
     title_vi:'EN 10160 S0/E0 — UT tấm chấp nhận cao nhất',
     title_en:'EN 10160 S0/E0 — Plate UT highest grade',
     element:'plate UT', region:'EU',
     spec:[
       {label:'S = body', value:'Quality class S0 = không cho phép sai lệch >'},
       {label:'E = edge', value:'Quality class E0 = vùng mép 50 mm chặt hơn'},
       {label:'Combined', value:'Vd S2/E3 cho tấm áp lực, S0/E0 cho nuclear'}
     ],
     note_vi:'4 cấp body: S0 (chặt nhất) → S3 (lỏng nhất). 4 cấp edge: E0 → E3.',
     clause:'EN 10160:1999 §4'}
  ]
};
