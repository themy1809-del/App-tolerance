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
    {id:'ndt',        name_vi:'NDT vật tư',         name_en:'NDT incoming',       icon:'📡', color:'#534ab7'},
    {id:'coil',       name_vi:'Coil HGI/GL/PPGL',   name_en:'Coated coils',       icon:'🧻', color:'#0e7490'}
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
    {code:'ISO 8501-1',  name:'Cấp gỉ & cấp làm sạch bề mặt', region:'INT'},
    {code:'AS 1397',     name:'Coil mạ kẽm liên tục (G=YS, Z=khối lượng mạ)', region:'AU'},
    {code:'AS 1365',     name:'Dung sai kích thước coil mạ', region:'AU'},
    {code:'ASTM A653',   name:'Coil mạ kẽm nhúng nóng (HGI)', region:'US'},
    {code:'ASTM A792',   name:'Coil mạ 55% nhôm-kẽm (GL)', region:'US'},
    {code:'ASTM A755',   name:'Coil mạ sơn màu (PPGL)', region:'US'},
    {code:'ASTM A924',   name:'Yêu cầu chung + dung sai coil mạ', region:'US'},
    {code:'JIS G3321',   name:'Coil mạ 55% nhôm-kẽm (GL) — JIS', region:'JP'},
    {code:'JIS G3322',   name:'Coil mạ nhôm-kẽm sơn màu (PPGL) — JIS', region:'JP'}
  ],

  /* =========== ITEMS =========== */
  items: [
    /* ===== COIL HGI / GL / PPGL — TL Kiểm vật tư đầu vào (2022), đã xác minh ===== */
    {id:'COIL-ITP', cat:'coil', std:'TL nội bộ 2022',
     title_vi:'ITP kiểm coil nhập kho — 4 bước (HGI & GL/PPGL)',
     title_en:'Incoming coil ITP — 4 steps',
     element:'coil', region:'INT',
     spec:[
       {label:'1. Ngoại quan', value:'Tối thiểu 1 cuộn/lô (cùng heat no., chiều dày): nhận dạng, móp méo, trầy xước, gỉ, tình trạng bề mặt'},
       {label:'2. Kích thước', value:'Tối thiểu 1 cuộn/lô: chiều dày, khổ rộng, chiều dài'},
       {label:'3. Hồ sơ nhà SX', value:'100%: CO, CQ, MTC — nhận dạng, kích thước, cơ-hóa tính, KHỐI LƯỢNG MẠ'},
       {label:'4. Thử mẫu tại lab', value:'2 mẫu/50 tấn (cùng chiều dày) hoặc theo ITP dự án: hóa nghiệm, kéo, uốn, độ cứng, thử lớp mạ'}
     ],
     note_vi:'Áp dụng chung cho thép tấm/hình/ống và coil. Coil thêm yêu cầu kiểm KHỐI LƯỢNG MẠ so với MTC.',
     clause:'TL Kiểm tra vật tư đầu vào (30/06/2022) mục III–V · đã xác minh'},

    {id:'COIL-HGI', cat:'coil', std:'AS 1397',
     title_vi:'Coil HGI (xà gồ/girt-purlin) — đọc mã & tiêu chí',
     title_en:'HGI coil (girt/purlin) — designation & criteria',
     element:'coil', region:'AU',
     spec:[
       {label:'Cách đọc AS 1397 G450 Z275', value:'G450 = giới hạn chảy 450 MPa · Z275 = 275 g/m² kẽm TỔNG 2 MẶT'},
       {label:'Cách đọc ASTM A653M G340 Z275', value:'Tương tự: G = YS (MPa) · Z = khối lượng mạ kẽm 2 mặt (g/m²)'},
       {label:'Cơ-hóa tính', value:'AS 1397 / ASTM A653 — đối chiếu MTC với spec dự án'},
       {label:'Dung sai kích thước', value:'AS 1365 / ASTM A924'}
     ],
     note_vi:'Z = mạ kẽm thuần (zinc). Kiểm khối lượng mạ bằng thử lab hoặc đo DFT quy đổi.',
     clause:'TL Kiểm tra vật tư đầu vào (2022) mục IV · đã xác minh'},

    {id:'COIL-ZN-DFT', cat:'coil', std:'ASTM A653',
     title_vi:'Quy đổi khối lượng mạ kẽm ↔ chiều dày (HGI)',
     title_en:'Zinc coating mass ↔ thickness conversion',
     element:'coil', region:'US',
     spec:[
       {label:'Hệ số kẽm (A653 mục 8.1.2.2)', value:'1 µm = 7.14 g/m² (mỗi mặt)'},
       {label:'Ví dụ Z275', value:'275/2 = 137.5 g/m²/mặt → DFT = 137.5 ÷ 7.14 ≈ 19.2 µm/mặt'},
       {label:'Cách kiểm nhanh', value:'Đo DFT lớp mạ → nhân 7.14 → so khối lượng mạ ghi trên MTC'}
     ],
     note_vi:'Dùng máy đo DFT từ tính như đo sơn. Giá trị Z là TỔNG 2 MẶT — chia đôi trước khi quy đổi.',
     clause:'ASTM A653/A653M 8.1.2.2 · đã xác minh từ TL 2022'},

    {id:'COIL-GL', cat:'coil', std:'ASTM A792',
     title_vi:'Coil GL/PPGL (tôn bao che) — đọc mã & quy đổi AZ',
     title_en:'GL/PPGL coil (cladding) — designation & AZ conversion',
     element:'coil', region:'US',
     spec:[
       {label:'Cách đọc ASTM A792M G550 AZM150', value:'G550 = YS 550 MPa · AZM150 = 150 g/m² hợp kim 55% nhôm-kẽm TỔNG 2 MẶT'},
       {label:'Hệ số nhôm-kẽm (A792 mục 8.1.2.2)', value:'1 µm = 3.75 g/m² (nhẹ hơn kẽm thuần)'},
       {label:'Ví dụ AZM150', value:'150/2 = 75 g/m²/mặt → DFT = 75 ÷ 3.75 = 20 µm/mặt'},
       {label:'PPGL (sơn màu)', value:'Thêm ASTM A755 (hoặc JIS G3322): kiểm màu, độ bám sơn, độ dày lớp sơn'},
       {label:'Hệ JIS', value:'GL: JIS G3321 · PPGL: JIS G3322'}
     ],
     note_vi:'GL nhẹ + chống ăn mòn tốt hơn kẽm thuần cùng khối lượng. Đừng nhầm hệ số 3.75 (AZ) với 7.14 (Z).',
     clause:'TL Kiểm tra vật tư đầu vào (2022) mục V · đã xác minh'},

    {id:'STEEL-NAME', cat:'cert', std:'Đa hệ',
     title_vi:'Đọc tên mác thép các hệ — đối chiếu MTC nhanh',
     title_en:'Steel grade designation decoder',
     element:'all', region:'INT',
     spec:[
       {label:'EN 10025-2 S355JR', value:'S=kết cấu · 355=YS (MPa) · JR=độ dai va đập 27J @ +20°C (J0: 0°C, J2: −20°C)'},
       {label:'JIS G3101 SS400', value:'SS=kết cấu thường · 400=TS kéo (MPa) — chú ý JIS dùng TS, không phải YS'},
       {label:'JIS G3106 SM490YA', value:'SM=kết cấu hàn · 490=TS · Y=YS nâng cao · A=cấp va đập'},
       {label:'JIS G3444 STK400', value:'STK=ống kết cấu · 400=TS'},
       {label:'GB/T 1591 Q345C', value:'Q=giới hạn chảy (phiên âm TQ) · 345=YS · C=cấp chất lượng A→E (va đập tăng dần)'},
       {label:'ASTM A572 Gr.50', value:'Gr.50 = YS 50 ksi · 1 ksi = 6.895 MPa → 50 ksi ≈ 345 MPa'}
     ],
     note_vi:'Bẫy hay gặp: JIS ghi theo TS (SS400 ≈ YS 245), EN/GB/ASTM ghi theo YS. So MTC phải đúng cột.',
     clause:'TL Kiểm tra vật tư đầu vào (2022) mục III.2 · đã xác minh'},

    /* ===== EN 10029 — Tấm dung sai ===== */
    {id:'EN10029-thk-A', sketch:'plate_thickness', cat:'plate_tol', std:'EN 10029',
     title_vi:'Dung sai chiều dày tấm — Cấp A (Class A — chuẩn)',
     title_en:'Plate thickness tolerance — Class A',
     element:'plate', region:'EU',
     spec:[
       {label:'Dày 3 ≤ t < 5 mm', value:'−0,4 / +0,8 mm'},
       {label:'Dày 5 ≤ t < 8 mm', value:'−0,4 / +1,1 mm'},
       {label:'Dày 8 ≤ t < 15 mm',value:'−0,5 / +1,2 mm'},
       {label:'Dày 15 ≤ t < 25 mm',value:'−0,6 / +1,3 mm'},
       {label:'Dày 25 ≤ t < 40 mm',value:'−0,8 / +1,4 mm'},
       {label:'Dày 40 ≤ t < 80 mm',value:'−1,0 / +1,8 mm'},
       {label:'Dày 80 ≤ t < 150 mm',value:'−1,0 / +2,2 mm'},
       {label:'Dày 150 ≤ t < 250 mm',value:'−1,2 / +2,4 mm'}
     ],
     note_vi:'ĐÃ HIỆU CHỈNH theo PDF gốc EN 10029:1991 (4 dải trên bị sai ở bản nhập trước). Class A là mặc định khi không chỉ định. Dung sai áp dụng ngoài vùng đã mài (ground areas).',
     clause:'EN 10029:1991 Table 1 — đã xác minh nguyên văn từ PDF'},

    {id:'EN10029-thk-BCD', cat:'plate_tol', std:'EN 10029',
     title_vi:'Dung sai chiều dày tấm — Class B / C / D (đủ bảng)',
     title_en:'Plate thickness tolerance — Class B / C / D',
     element:'plate', region:'EU',
     spec:[
       {label:'Ý nghĩa class', value:'B: âm cố định −0,3 · C: không âm (−0) · D: đối xứng ±'},
       {label:'3 ≤ t < 5', value:'B: −0,3/+0,9 · C: −0/+1,2 · D: ±0,6'},
       {label:'5 ≤ t < 8', value:'B: −0,3/+1,2 · C: −0/+1,5 · D: ±0,75'},
       {label:'8 ≤ t < 15', value:'B: −0,3/+1,4 · C: −0/+1,7 · D: ±0,85'},
       {label:'15 ≤ t < 25', value:'B: −0,3/+1,6 · C: −0/+1,9 · D: ±0,95'},
       {label:'25 ≤ t < 40', value:'B: −0,3/+1,9 · C: −0/+2,2 · D: ±1,1'},
       {label:'40 ≤ t < 80', value:'B: −0,3/+2,5 · C: −0/+2,8 · D: ±1,4'},
       {label:'80 ≤ t < 150', value:'B: −0,3/+2,9 · C: −0/+3,2 · D: ±1,6'},
       {label:'150 ≤ t < 250', value:'B: −0,3/+3,3 · C: −0/+3,6 · D: ±1,8'}
     ],
     note_vi:'Chọn class theo đơn hàng: C hay dùng cho tấm cần phay/CNC (không hụt dày); B cho liên kết chịu mỏi. Phạm vi chuẩn: t 3–250mm, rộng ≥600mm, YS <700 MPa.',
     clause:'EN 10029:1991 Table 1 — đã xác minh nguyên văn từ PDF'},

    {id:'EN10029-thkdiff', cat:'plate_tol', std:'EN 10029',
     title_vi:'Chênh lệch chiều dày TRONG 1 TẤM (max)',
     title_en:'Max thickness difference within a plate',
     element:'plate', region:'EU',
     spec:[
       {label:'t 3–5 · rộng <2500', value:'0,8–0,9 mm'},
       {label:'t 8–15 · rộng 600→4000+', value:'0,9 → 1,2 mm'},
       {label:'t 15–25 · rộng 600→4000+', value:'1,0 → 1,4 mm'},
       {label:'t 25–40 · rộng 600→4000+', value:'1,1 → 1,4 mm'},
       {label:'t 40–80 · rộng 600→4000+', value:'1,2 → 1,6 mm'},
       {label:'t 80–150 · rộng 600→4000+', value:'1,3 → 1,7 mm'}
     ],
     note_vi:'Đo nhiều điểm trên cùng 1 tấm — chênh max giữa các điểm không vượt bảng (tăng theo khổ rộng). Hữu ích khi tấm dùng làm bích/bản mã CNC.',
     clause:'EN 10029:1991 Table 1 (cột "Maximum thickness difference within a plate") — đã xác minh'},

    /* ===== EN 10219-2:2019 — ống/hộp hàn cán nguội (đã xác minh từ PDF) ===== */
    {id:'EN10219-dims', cat:'tube_tol', std:'EN 10219-2',
     title_vi:'Hộp/ống cán nguội — dung sai kích thước ngoài & chiều dày',
     title_en:'CFS hollow sections — outside dimensions & thickness',
     element:'tube', region:'EU',
     spec:[
       {label:'Ống tròn — đường kính D', value:'±1% (min ±0,5mm · max ±10mm)'},
       {label:'Hộp — cạnh H,B < 100mm', value:'±1% (min ±0,5mm)'},
       {label:'Hộp — cạnh 100 ≤ H,B ≤ 200', value:'±0,8%'},
       {label:'Hộp — cạnh H,B > 200mm', value:'±0,6%'},
       {label:'Chiều dày T ≤ 5mm', value:'±10%'},
       {label:'Chiều dày T > 5mm', value:'±0,5mm (ống D>406,4: ±10% max ±2mm)'},
       {label:'Méo tròn (out-of-roundness)', value:'2% — áp dụng khi D/T ≤ 100'}
     ],
     note_vi:'Đo kích thước ngoài tại đầu ống. Khối lượng từng cây giao: ±6%.',
     clause:'EN 10219-2:2019 Table 2 — đã xác minh nguyên văn từ PDF'},

    {id:'EN10219-shape', cat:'tube_tol', std:'EN 10219-2',
     title_vi:'Hộp/ống cán nguội — vuông cạnh, lồi lõm, xoắn, thẳng',
     title_en:'CFS hollow — squareness, concavity, twist, straightness',
     element:'tube', region:'EU',
     spec:[
       {label:'Vuông góc cạnh hộp θ', value:'90° ± 1°'},
       {label:'Lồi/lõm mặt hộp (x1, x2)', value:'max 0,8% cạnh — độc lập với dung sai kích thước'},
       {label:'Xoắn (twist V) hộp', value:'2 mm + 0,5 mm/m chiều dài'},
       {label:'Độ thẳng e — hộp chữ nhật/vuông', value:'0,15% tổng chiều dài VÀ 3mm trên mỗi 1m'},
       {label:'Độ thẳng e — ống tròn/elip', value:'0,20% tổng chiều dài VÀ 3mm trên mỗi 1m'}
     ],
     note_vi:'Xoắn: kê một đầu sát bàn máp, đo độ kênh V1 ở đầu kia. Lồi/lõm đo bằng thước thẳng + thước lá giữa mặt.',
     clause:'EN 10219-2:2019 Table 2 — đã xác minh nguyên văn từ PDF'},

    {id:'EN10219-corner', cat:'tube_tol', std:'EN 10219-2',
     title_vi:'Hộp cán nguội — bán kính góc ngoài (C1, C2, R)',
     title_en:'CFS hollow — external corner profile',
     element:'tube', region:'EU',
     spec:[
       {label:'Dày T ≤ 6mm', value:'1,6T → 2,4T'},
       {label:'6 < T ≤ 10mm', value:'2,0T → 3,0T'},
       {label:'T > 10mm', value:'2,4T → 3,6T'}
     ],
     note_vi:'Góc trong PHẢI tròn nhưng không quy định giá trị. Cạnh không nhất thiết tiếp tuyến với cung góc. Quan trọng khi detail mối hàn góc hộp + khe hở bản mã ôm góc.',
     clause:'EN 10219-2:2019 Table 3 — đã xác minh nguyên văn từ PDF'},

    {id:'LEEB-HARDNESS', cat:'spec', std:'ISO 16859-1 / ASTM A956',
     title_vi:'Đo độ cứng hiện trường — phương pháp Leeb (búa bật nảy)',
     title_en:'Field hardness testing — Leeb rebound method',
     element:'all', region:'INT',
     spec:[
       {label:'Nguyên lý', value:'HL = (vận tốc bật lại vR ÷ vận tốc va chạm vA) × 1000 — không thứ nguyên'},
       {label:'Thiết bị phổ biến', value:'Impact device loại D (HLD) — kết quả PHẢI ghi kèm loại đầu đo (vd 520 HLD)'},
       {label:'Chuẩn áp dụng', value:'ISO 16859-1:2015 (quốc tế) / ASTM A956 (dự án Mỹ) — cả 2 có PDF trong dự án'},
       {label:'Khi nào dùng', value:'Kiểm độ cứng mép cắt nhiệt (≤450HV10), HAZ sau hỏa công/hàn sửa, xác minh nhầm mác thép — tại hiện trường không mang mẫu về lab được'}
     ],
     note_vi:'BẪY quy đổi: HL→HV/HB/HRC PHỤ THUỘC vật liệu (bảng quy đổi riêng cho thép C, thép công cụ, gang...). Bề mặt phải mài nhẵn sạch gỉ/sơn; chi tiết mỏng nhẹ phải kê đỡ chặt (coupling) — không thì kết quả thấp giả. Khi tranh chấp → đo lại bằng HV/HB chuẩn tĩnh.',
     clause:'ISO 16859-1:2015 mục 3 Formula (1) — đã xác minh nguyên văn từ PDF'},

    {id:'EN10029-flat', sketch:'plate_flatness', cat:'plate_tol', std:'EN 10029',
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
    {id:'EN10034-Hflange', sketch:'i_flange_width', cat:'section_tol', std:'EN 10034',
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

    {id:'EN10034-Hheight', sketch:'i_web_height', cat:'section_tol', std:'EN 10034',
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

    {id:'EN10034-out-of-square', sketch:'i_out_of_square', cat:'section_tol', std:'EN 10034',
     title_vi:'Độ không vuông cánh-bụng (out of square)',
     title_en:'Out of square flange/web',
     element:'I-beam, H-beam', region:'EU',
     spec:[
       {label:'k = (k1+k2)', value:'≤ 2% × b nhưng tối thiểu 6.5 mm'}
     ],
     note_vi:'b = bề rộng cánh. Đo tại 1 m từ đầu thanh.',
     clause:'EN 10034:1993 Table 2'},

    {id:'EN10034-web-off', sketch:'i_web_offcenter', cat:'section_tol', std:'EN 10034',
     title_vi:'Lệch tâm bụng (web off-center)',
     title_en:'Web off-centre',
     element:'I-beam, H-beam', region:'EU',
     spec:[
       {label:'b < 110 mm',value:'≤ 2.5 mm'},
       {label:'b ≥ 110 mm', value:'≤ 3.5 mm'}
     ],
     clause:'EN 10034:1993 Table 2'},

    {id:'EN10034-straight', sketch:'i_straightness', cat:'section_tol', std:'EN 10034',
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
    {id:'EN10056-leg', sketch:'angle_only_leg', cat:'section_tol', std:'EN 10056',
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

    {id:'EN10056-angle', sketch:'angle_alpha', cat:'section_tol', std:'EN 10056',
     title_vi:'Góc giữa 2 cạnh (sai lệch khỏi 90°)',
     title_en:'Angle between legs',
     element:'L-angle', region:'EU',
     spec:[
       {label:'Tất cả kích cỡ', value:'±30 phút (±0.5°)'}
     ],
     clause:'EN 10056-2:1993 Table 1'},

    /* ===== EN 10210/10219 — Hollow section ===== */
    {id:'EN10210-side', sketch:'hss_outside_only', cat:'tube_tol', std:'EN 10210-2',
     title_vi:'Dung sai cạnh ngoài — Ống hộp vuông/CN (hot-finished)',
     title_en:'Outside dimension SHS/RHS hot-finished',
     element:'HSS, SHS, RHS', region:'EU',
     spec:[
       {label:'Cạnh ≤ 100 mm', value:'±1% nhưng ≥ ±0.5 mm'},
       {label:'Cạnh > 100 mm',  value:'±0.8% nhưng ≥ ±0.8 mm'}
     ],
     clause:'EN 10210-2:2019 Table B.3'},

    {id:'EN10210-thk', sketch:'hss_wall_only', cat:'tube_tol', std:'EN 10210-2',
     title_vi:'Dung sai chiều dày thành ống hộp (hot-finished)',
     title_en:'Wall thickness HSS hot-finished',
     element:'HSS', region:'EU',
     spec:[
       {label:'Mọi kích cỡ', value:'−10% / +không yêu cầu'}
     ],
     clause:'EN 10210-2:2019 Table B.3'},

    {id:'EN10210-twist', sketch:'hss_twist', cat:'tube_tol', std:'EN 10210-2',
     title_vi:'Độ xoắn ống hộp (twist)',
     title_en:'Twist HSS',
     element:'HSS, SHS, RHS', region:'EU',
     spec:[
       {label:'Per m', value:'2 mm + 0.5 mm/m'}
     ],
     clause:'EN 10210-2:2019 Table B.3'},

    {id:'EN10210-square', sketch:'hss_squareness', cat:'tube_tol', std:'EN 10210-2',
     title_vi:'Độ vuông góc (cạnh — bán kính góc)',
     title_en:'Squareness of sides',
     element:'SHS, RHS', region:'EU',
     spec:[
       {label:'Sai lệch khỏi 90°', value:'±1°'}
     ],
     clause:'EN 10210-2:2019 Table B.3'},

    {id:'EN10219-side', sketch:'hss_outside_only', cat:'tube_tol', std:'EN 10219-2',
     title_vi:'Dung sai cạnh ngoài — Hộp cold-formed',
     title_en:'Outside dim SHS/RHS cold-formed',
     element:'HSS cold-formed', region:'EU',
     spec:[
       {label:'Cạnh ≤ 100 mm', value:'±1% nhưng ≥ ±0.5 mm'},
       {label:'Cạnh > 100 mm', value:'±0.8%'}
     ],
     clause:'EN 10219-2:2019 Table B.4'},

    /* ===== ASTM A6 (general rolled) ===== */
    {id:'ASTM-A6-Hflange', sketch:'i_flange_width', cat:'section_tol', std:'ASTM A6',
     title_vi:'Dung sai cánh W-shape (ASTM A6)',
     title_en:'W-shape flange tolerance',
     element:'W-shape, A992', region:'US',
     spec:[
       {label:'Cánh b ≤ 152 mm (6")', value:'±3.2 mm (1/8")'},
       {label:'152 < b ≤ 305 mm', value:'±4.8 mm (3/16")'},
       {label:'b > 305 mm',  value:'±6.4 mm (1/4")'}
     ],
     clause:'ASTM A6/A6M Table 17'},

    {id:'ASTM-A500-side', sketch:'hss_outside_only', cat:'tube_tol', std:'ASTM A500',
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
    {id:'S235JR', sketch:'spec_chemistry', cat:'spec', std:'EN 10025-2',
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

    {id:'S355J2', sketch:'spec_charpy', cat:'spec', std:'EN 10025-2',
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

    {id:'S275JR', sketch:'spec_chemistry', cat:'spec', std:'EN 10025-2',
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
    {id:'A36', sketch:'spec_mech', cat:'spec', std:'ASTM A36',
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

    {id:'A572-50', sketch:'spec_mech', cat:'spec', std:'ASTM A572',
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

    {id:'A992', sketch:'spec_mech', cat:'spec', std:'ASTM A992',
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

    {id:'A500-B', sketch:'spec_mech', cat:'spec', std:'ASTM A500',
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

    {id:'SA516-70', sketch:'spec_charpy', cat:'spec', std:'ASTM A516',
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
    {id:'SS400', sketch:'spec_chemistry', cat:'spec', std:'JIS G3101',
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

    {id:'SN400B', sketch:'spec_charpy', cat:'spec', std:'JIS G3136',
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
    {id:'cert-2.1', sketch:'cert_21', cat:'cert', std:'EN 10204',
     title_vi:'Loại 2.1 — Cam kết nhà sản xuất',
     title_en:'Type 2.1 — Declaration of compliance',
     element:'cert', region:'EU',
     spec:[
       {label:'Nội dung', value:'Cam kết SẢN PHẨM phù hợp với đơn hàng, KHÔNG kèm test results'},
       {label:'Người ký', value:'Nhà sản xuất'},
       {label:'Khi dùng', value:'Vật tư không quan trọng — bolt thường, đệm…'}
     ],
     clause:'EN 10204:2004'},

    {id:'cert-2.2', sketch:'cert_2x', cat:'cert', std:'EN 10204',
     title_vi:'Loại 2.2 — Test report (không xuất xứ riêng)',
     title_en:'Type 2.2 — Test report',
     element:'cert', region:'EU',
     spec:[
       {label:'Nội dung', value:'Kết quả test PHI-CỤ THỂ — số liệu trung bình lô sản xuất'},
       {label:'Người ký', value:'Nhà sản xuất'},
       {label:'Khi dùng', value:'Vật tư phụ — bracket, gussets phụ'}
     ],
     clause:'EN 10204:2004'},

    {id:'cert-3.1', sketch:'cert_doc', cat:'cert', std:'EN 10204',
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

    {id:'cert-3.2', sketch:'cert_3x', cat:'cert', std:'EN 10204',
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
    {id:'rust-A', sketch:'surface_rust_A', cat:'surface', std:'ISO 8501-1',
     title_vi:'Cấp gỉ A — Bề mặt còn vảy cán nguyên (mill scale)',
     title_en:'Rust grade A — Steel surface largely covered with adherent mill scale',
     element:'surface', region:'INT',
     spec:[
       {label:'Mô tả', value:'Bề mặt thép còn phủ đầy lớp vảy cán bám chặt, ít hoặc không gỉ.'},
       {label:'Khi nào gặp', value:'Tấm/thép hình MỚI từ nhà máy, chưa chịu thời tiết.'},
       {label:'Yêu cầu xử lý', value:'Cần thổi cát (Sa 2½) trước khi sơn — không sơn lên vảy cán.'}
     ],
     clause:'ISO 8501-1:2007'},

    {id:'rust-B', sketch:'surface_rust', cat:'surface', std:'ISO 8501-1',
     title_vi:'Cấp gỉ B — Vảy cán bắt đầu bong + gỉ xuất hiện',
     title_en:'Rust grade B — Mill scale beginning to flake + initial rust',
     element:'surface', region:'INT',
     spec:[
       {label:'Mô tả', value:'Vảy cán đã bắt đầu bong tróc, đốm gỉ xuất hiện rải rác.'},
       {label:'Khi nào gặp', value:'Vật tư bị mưa dầm 1-3 tháng tại bãi.'},
       {label:'Yêu cầu xử lý', value:'Sa 2½ tối thiểu, kiểm tra độ ẩm ≤ 80%.'}
     ],
     clause:'ISO 8501-1:2007'},

    {id:'rust-C', sketch:'surface_rust_C', cat:'surface', std:'ISO 8501-1',
     title_vi:'Cấp gỉ C — Vảy đã bay hết, bề mặt gỉ đều',
     title_en:'Rust grade C — Mill scale gone, general rust',
     element:'surface', region:'INT',
     spec:[
       {label:'Mô tả', value:'Vảy cán đã bay sạch, toàn bộ bề mặt phủ gỉ vàng đỏ.'},
       {label:'Khi nào gặp', value:'Vật tư cũ — bãi 6 tháng — 1 năm.'},
       {label:'Yêu cầu xử lý', value:'Sa 2½ hoặc 3 — đảm bảo hết gỉ. Có thể có rỗ nhẹ.'}
     ],
     clause:'ISO 8501-1:2007'},

    {id:'rust-D', sketch:'surface_rust_D', cat:'surface', std:'ISO 8501-1',
     title_vi:'Cấp gỉ D — RỖ sâu nhìn rõ',
     title_en:'Rust grade D — Pitting visible',
     element:'surface', region:'INT',
     spec:[
       {label:'Mô tả', value:'Bề mặt đã có rỗ ăn mòn sâu, không phẳng nữa.'},
       {label:'Khi nào gặp', value:'Vật tư cũ > 1 năm, để ngoài trời ven biển.'},
       {label:'Quyết định', value:'⚠ KIỂM TRA siêu âm dày — nếu giảm >10% phải LOẠI BỎ. Nếu OK thì Sa 3.'}
     ],
     clause:'ISO 8501-1:2007'},

    {id:'clean-Sa2.5', sketch:'surface_profile', cat:'surface', std:'ISO 8501-1',
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
    {id:'Z25', sketch:'z_quality', cat:'spec', std:'EN 10164',
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
    {id:'EN10160-S0-E0', sketch:'ut_plate', cat:'ndt', std:'EN 10160',
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
