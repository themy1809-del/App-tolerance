/* Lượng dư + Nguyên nhân sai hỏng — dữ liệu kết cấu thép */
window.LD_DATA = {

  /* ===== A. LƯỢNG DƯ — Allowance formulas ===== */
  allowance: [
    {
      id: 'weld-shrink-trans',
      cat: 'weld',
      title: 'Co rút hàn ngang (transverse shrinkage)',
      desc: 'Mối hàn co lại theo phương vuông góc với đường hàn. Càng nhiều lớp càng co nhiều.',
      formula: 'S_t = k × t',
      vars: [
        {key:'t', label:'Chiều dày tấm t (mm)', def:12, unit:'mm'},
        {key:'k', label:'Hệ số co (V-butt SMAW ≈ 0.2 · FCAW ≈ 0.15 · SAW ≈ 0.10)', def:0.20, unit:''}
      ],
      calc: (v) => ({ value: v.k * v.t, unit: 'mm', note: 'Lượng dư khi cắt blank: tăng kích thước bằng S_t' }),
      ref: 'AWS D1.1 Annex K · The Procedure Handbook of Arc Welding (Lincoln)',
      sketch: 'shrink_trans'
    },
    {
      id: 'weld-shrink-long',
      cat: 'weld',
      title: 'Co rút hàn dọc (longitudinal shrinkage)',
      desc: 'Mối hàn co theo trục đường hàn. Đáng kể cho dầm dài, dầm I tổ hợp hàn.',
      formula: 'S_l = 0.0002 × L (cho hàn dọc đơn) · 0.0005 × L (hàn đôi cánh)',
      vars: [
        {key:'L', label:'Chiều dài hàn L (mm)', def:6000, unit:'mm'},
        {key:'k', label:'Hệ số (0.0002 đơn / 0.0005 đôi)', def:0.0002, unit:''}
      ],
      calc: (v) => ({ value: v.k * v.L, unit: 'mm', note: 'Cộng vào chiều dài blank trước hàn' }),
      ref: 'AWS D1.1 Annex K Table K.2',
      sketch: 'shrink_long'
    },
    {
      id: 'thermal-expand',
      cat: 'thermal',
      title: 'Giãn nở nhiệt (thermal expansion)',
      desc: 'Vật liệu thép giãn 12 µm/m mỗi 1°C. Quan trọng khi lắp ráp 4 mùa Việt Nam (chênh 25-40°C).',
      formula: 'ΔL = α × ΔT × L',
      vars: [
        {key:'L', label:'Chiều dài L (mm)', def:10000, unit:'mm'},
        {key:'dT', label:'Chênh lệch nhiệt độ ΔT (°C)', def:30, unit:'°C'},
        {key:'a', label:'Hệ số giãn nở α (× 10⁻⁶/°C)', def:12, unit:'1e-6/°C'}
      ],
      calc: (v) => ({ value: v.a * 1e-6 * v.dT * v.L, unit: 'mm', note: 'Thép thường α=12 · INOX 17 · Nhôm 23' }),
      ref: 'AISC Steel Construction Manual · TCVN 5575:2012',
      sketch: 'thermal'
    },
    {
      id: 'machining-allow',
      cat: 'mach',
      title: 'Lượng dư gia công (machining stock)',
      desc: 'Phải để dư khi cắt blank để bù lượng phay/mài bề mặt đạt độ chính xác cuối.',
      formula: 'm = m_face × n_face',
      vars: [
        {key:'m_face', label:'Mỗi mặt phay/mài (mm): phay 2-3 · mài 0.5-1', def:2.5, unit:'mm'},
        {key:'n_face', label:'Số mặt gia công', def:2, unit:''}
      ],
      calc: (v) => ({ value: v.m_face * v.n_face, unit: 'mm', note: 'Cộng vào kích thước cắt thô (rough blank)' }),
      ref: 'ISO 286 + Shigley\'s Mechanical Eng. Design',
      sketch: 'machining'
    },
    {
      id: 'bend-allow',
      cat: 'form',
      title: 'Lượng dư gập tôn (bend allowance)',
      desc: 'Chiều dài tâm trung hoà khi gập. Cần để tính chiều dài blank chính xác.',
      formula: 'BA = (π/180) × θ × (R + k × t)',
      vars: [
        {key:'theta', label:'Góc gập θ (°)', def:90, unit:'°'},
        {key:'R', label:'Bán kính trong R (mm)', def:5, unit:'mm'},
        {key:'t', label:'Chiều dày t (mm)', def:3, unit:'mm'},
        {key:'k', label:'Hệ số tâm trung hoà K (thép mềm 0.33 · cứng 0.5)', def:0.40, unit:''}
      ],
      calc: (v) => ({ value: (Math.PI/180) * v.theta * (v.R + v.k * v.t), unit: 'mm', note: 'Chiều dài blank = L1 + L2 + BA - 2 × (R+t)' }),
      ref: 'ASME B89 + Steel Sheet Forming Handbook',
      sketch: 'bend'
    },
    {
      id: 'spring-back',
      cat: 'form',
      title: 'Spring-back gập (đàn hồi ngược)',
      desc: 'Sau khi gập, tôn nảy lại 1 phần. Phải gập quá để đạt góc thiết kế.',
      formula: 'θ_over = θ × (1 + R × σ_y / (E × t))',
      vars: [
        {key:'theta', label:'Góc thiết kế θ (°)', def:90, unit:'°'},
        {key:'R', label:'Bán kính R (mm)', def:5, unit:'mm'},
        {key:'sy', label:'Giới hạn chảy σ_y (MPa)', def:355, unit:'MPa'},
        {key:'E', label:'Modulus E (MPa)', def:200000, unit:'MPa'},
        {key:'t', label:'Chiều dày t (mm)', def:3, unit:'mm'}
      ],
      calc: (v) => {
        var ratio = 3 * v.R * v.sy / (v.E * v.t) - 4 * Math.pow(v.R * v.sy / (v.E * v.t), 3);
        var overAngle = v.theta * (1 + ratio);
        return { value: overAngle, unit: '°', note: 'Phải gập đến góc này để sau spring-back được θ = ' + v.theta + '°' };
      },
      ref: 'Marciniak Mechanics of Sheet Metal Forming',
      sketch: 'springback'
    },
    {
      id: 'cut-kerf',
      cat: 'cut',
      title: 'Kerf cắt (cutting kerf)',
      desc: 'Bề rộng rãnh cắt mà dao/lửa loại bỏ. Phải bù khi nesting + cắt blank.',
      formula: 'k = w_kerf (theo phương pháp cắt)',
      vars: [
        {key:'k', label:'Bề rộng kerf (mm): Plasma 1.5-3 · Oxy 3-5 · Laser 0.2-0.5 · Cưa 4-6', def:2.5, unit:'mm'}
      ],
      calc: (v) => ({ value: v.k, unit: 'mm', note: 'Cộng kerf vào mỗi đường cắt khi nesting' }),
      ref: 'ISO 9013 — Cut quality grades',
      sketch: 'kerf'
    },
    {
      id: 'bevel-prep',
      cat: 'weld',
      title: 'Vát mép & root face (groove preparation)',
      desc: 'Chuẩn bị mép trước hàn butt joint — góc vát + root face + khe hở.',
      formula: 'Loss = t × tan(α/2) × 2 (mỗi mặt)',
      vars: [
        {key:'t', label:'Chiều dày t (mm)', def:20, unit:'mm'},
        {key:'alpha', label:'Góc vát rãnh α (°)', def:60, unit:'°'},
        {key:'root', label:'Root face (mm)', def:2, unit:'mm'},
        {key:'gap', label:'Khe hở gốc (mm)', def:3, unit:'mm'}
      ],
      calc: (v) => {
        var area_per_side = 0.5 * (v.t - v.root) * (v.t - v.root) * Math.tan(v.alpha/2 * Math.PI/180);
        return { value: 2 * area_per_side, unit: 'mm²', note: 'Diện tích cần bù bằng kim loại đắp · Khe ' + v.gap + 'mm · Root ' + v.root + 'mm' };
      },
      ref: 'AWS D1.1 Fig 3.4 + ISO 9692-1',
      sketch: 'bevel'
    }
  ],

  /* ===== B. NGUYÊN NHÂN SAI HỎNG — Defect root cause matrix ===== */
  defects: [
    { id:'undercut', cat:'weld', rootCause:'man', name:'Cháy chân (Undercut)', severity:'medium',
      symptom:'Rãnh khuyết tại chân mối hàn, song song mối hàn',
      causes:['Dòng hàn I quá cao','Hồ quang dài (V cao)','Tốc độ di chuyển nhanh','Góc que/đầu hàn sai','Không lưu vũ chuyển trên kim loại cơ bản'],
      remedies:['Giảm I 10-20A','Hạ chiều dài hồ quang','Chậm lại 10-15%','Chỉnh góc 70-80° cho fillet','Lưu chuyển tại chân 1-2 giây'],
      ref:'AWS D1.1 §7.16 + ISO 5817 §5.10', sketch:'def_undercut' },

    { id:'porosity', cat:'weld', rootCause:'material', name:'Rỗ khí (Porosity)', severity:'high',
      symptom:'Lỗ tròn nhỏ trên hoặc trong mối hàn — phát hiện qua RT/UT',
      causes:['Que/dây ẩm','Khí bảo vệ kém (rò rỉ, thiếu lưu lượng)','Bề mặt dơ (dầu, rỉ, sơn, nước)','Hồ quang dài (V cao)','Gió thổi tan khí bảo vệ'],
      remedies:['Sấy que SMAW 250°C/1h, dây MIG kín trong tủ sấy','Kiểm gas: 15-20 L/min · ống không gấp','Mài + lau aceton 25mm 2 bên đường hàn','Hạ V hồ quang','Che chắn gió < 3 m/s'],
      ref:'AWS D1.1 §7.18 + ISO 5817 §5.4', sketch:'def_porosity' },

    { id:'crack-hot', cat:'weld', rootCause:'method', name:'Nứt nóng (Hot crack / Solidification crack)', severity:'critical',
      symptom:'Nứt dọc theo trục mối hàn ngay khi nguội. Centerline crack đặc trưng.',
      causes:['Tỷ số chiều rộng/chiều cao W/D < 1.4','Tốc độ di chuyển nhanh','Hàm lượng S, P cao trong vật liệu','Mặt cắt mối hàn không cân (concave)','Cốt liệu bẩn'],
      remedies:['Tăng W bằng dao động','Giảm tốc độ — tăng heat input','Chọn que/dây low-S (< 0.025%)','Đảm bảo profile lồi nhẹ (convex)','Vệ sinh mép kỹ'],
      ref:'AWS D1.1 §7.14 + Lincoln Procedure Handbook ch.6.3', sketch:'def_crack_hot' },

    { id:'crack-cold', cat:'weld', rootCause:'method', name:'Nứt nguội (Cold crack / Hydrogen-induced)', severity:'critical',
      symptom:'Nứt xuất hiện 48-72h SAU khi hàn. Thường tại HAZ. Cần kiểm UT sau 48h.',
      causes:['H₂ khuếch tán: que ẩm, vật liệu ẩm','Tốc độ nguội nhanh','Restraint cao (cấu kiện cứng)','Carbon equivalent CE > 0.45','Thiếu preheat'],
      remedies:['Preheat: t=20mm → 100°C · t=40mm → 150°C · t=60mm → 200°C','Dùng que low-H (< 5 ml H₂/100g)','Sấy que 350°C/2h, lưu thùng 150°C','Post-weld heat treatment 200-250°C × 1h/25mm','Giảm restraint bằng sequence'],
      ref:'AWS D1.1 §5.6 Preheat table 5.8 + EN 1011-2', sketch:'def_crack_cold' },

    { id:'lack-fusion', cat:'weld', rootCause:'man', name:'Không ngấu (Lack of Fusion / Incomplete Fusion)', severity:'high',
      symptom:'Mối hàn không nóng chảy với kim loại cơ bản. Phát hiện qua UT.',
      causes:['Dòng hàn I thấp','Góc que sai','Tốc độ quá nhanh','Mép vát không sạch (xỉ, rỉ, sơn)','Khoảng cách điện cực CTWD lớn'],
      remedies:['Tăng I 15-25%','Chỉnh góc 75-80° hướng vào root','Giảm tốc độ','Mài lại mép vát đến kim loại sáng','Giữ CTWD 12-20mm cho MIG'],
      ref:'AWS D1.1 §7.15 + ISO 5817 §5.7', sketch:'def_lof' },

    { id:'lack-penetration', cat:'weld', rootCause:'method', name:'Không thấu (Lack of Penetration / Incomplete Penetration)', severity:'high',
      symptom:'Phần root joint không hàn ngấu hoàn toàn. Đáng kể với CJP.',
      causes:['Khe hở gốc quá hẹp (< 2mm)','Root face quá lớn (> 2mm)','Dòng hàn thấp','Tốc độ nhanh','Que/dây quá lớn cho rãnh'],
      remedies:['Mở khe gốc 3-5mm','Mài root face xuống ≤ 1.5mm','Tăng I 20%','Hàn lớp gốc chậm + lưu chuyển','Đổi que nhỏ hơn (Ø2.5 thay Ø3.2)'],
      ref:'AWS D1.1 §7.13 + EN 287-1', sketch:'def_lop' },

    { id:'slag-inclusion', cat:'weld', rootCause:'man', name:'Xỉ kẹt (Slag Inclusion)', severity:'medium',
      symptom:'Xỉ bị giam giữa các lớp hàn. Phát hiện qua RT (vùng tối không tròn như rỗ).',
      causes:['Vệ sinh xỉ kém giữa lớp','Profile lớp lõm (concave)','Hàn ngược chiều với lớp trước','Tốc độ quá chậm tạo xỉ chìm','Que/dây dòng quá thấp'],
      remedies:['Đánh xỉ + đánh thép bằng bàn chải kim','Giữ profile lồi nhẹ','Hàn cùng chiều với lớp trước','Tăng I tăng tốc nhẹ','Đảo chỉ điều chỉnh'],
      ref:'AWS D1.1 §7.21 + ISO 5817 §5.3', sketch:'def_slag' },

    { id:'spatter', cat:'weld', rootCause:'machine', name:'Văng tia (Spatter)', severity:'low',
      symptom:'Hạt kim loại nóng văng ra ngoài đường hàn — gây ảnh hưởng surface',
      causes:['Dòng hàn quá cao','CTWD quá dài (MIG)','Cường độ dòng âm (DCEN sai)','Khí bảo vệ thiếu CO₂ (chỉ Argon)'],
      remedies:['Giảm I 10-15A','Giữ CTWD 12-15mm','Đảo polarity sang DCEP','Đổi gas mix 82%Ar + 18%CO₂ cho MAG','Phun anti-spatter spray'],
      ref:'AWS D1.1 §7.5 + Lincoln Welding Handbook', sketch:'def_spatter' },

    { id:'distortion-i', cat:'distort', rootCause:'method', name:'Méo cánh I (I-section Distortion)', severity:'high',
      symptom:'Cánh trên/dưới bị cong vào, bụng vênh. Gây sai dung sai EN 10034.',
      causes:['Hàn liên tục 1 cánh không xen kẽ','Heat input quá lớn','Không có sequence','Không gá định vị','Hàn cùng phía liên tiếp'],
      remedies:['Sequence 1-3-2-4: hàn xen kẽ 2 cánh','Heat input ≤ 2.5 kJ/mm','Gá fix bằng strong-back kẹp','Hàn từ giữa ra 2 đầu','Pre-cambering trước hàn (chỉnh hình ngược)'],
      ref:'AWS D1.1 Annex K + EN 1090-2 §7.5', sketch:'def_distort_i' },

    { id:'distortion-plate', cat:'distort', rootCause:'method', name:'Cong vênh tấm (Plate Warpage)', severity:'medium',
      symptom:'Tấm bị cong khi hàn nhiều mối song song. Khó kiểm phẳng EN 10029.',
      causes:['Heat input tập trung 1 vùng','Tấm mỏng (t < 8mm)','Không cố định khi hàn','Hàn liên tục 1 mặt'],
      remedies:['Phân nhóm hàn (skip welding) 100mm-bỏ 200mm','Dùng tấm balance dày hơn','Kẹp gá lên bàn nguội','Hàn song song 2 mặt cùng lúc','Sau hàn: cold straightening máy ép'],
      ref:'AWS D1.1 Annex K Fig K.5', sketch:'def_warp' },

    { id:'misalign', cat:'fit', rootCause:'man', name:'Lệch tâm mối ghép (Misalignment / High-low)', severity:'medium',
      symptom:'Hai tấm không cùng cốt khi hàn butt joint. Chênh > 0.1t hoặc 3mm.',
      causes:['Fit-up trước hàn sai','Tack weld không đủ chắc','Tấm có dung sai dày lớn','Co rút khi hàn lệch'],
      remedies:['Kiểm fit-up trước hàn: ≤ 1mm','Tack weld 4-6 điểm × 25mm','Đảo tấm cùng dày','Symmetric welding 2 bên','Sửa bằng mài + đắp lại nếu Δ > t/10'],
      ref:'AWS D1.1 §5.21 + ASME UG-33', sketch:'def_misalign' },

    { id:'arc-strike', cat:'weld', rootCause:'man', name:'Hồ quang lạc (Arc Strike)', severity:'high',
      symptom:'Vết hồ quang ngoài đường hàn — vùng đó cứng do tôi tự nhiên, có thể nứt sau.',
      causes:['Khởi động hồ quang trên kim loại cơ bản','Cáp tiếp đất tiếp xúc kém','Que rơi'],
      remedies:['Khởi động trên runoff tab (mép thừa)','Kiểm tiếp đất tốt','Mài sạch vết hồ quang lạc 1.5mm + UT vùng đó','Treo que đúng cách'],
      ref:'AWS D1.1 §5.29 + EN 1090-2 §7.5.7', sketch:'def_arc_strike' },

    { id:'craters', cat:'weld', rootCause:'man', name:'Lõm cuối đường (Crater)', severity:'medium',
      symptom:'Vết lõm tại điểm dừng hàn — dễ nứt crater.',
      causes:['Tắt hồ quang đột ngột','Không lưu chuyển đắp đầy','Dòng hàn dừng nhanh'],
      remedies:['Crater fill: lưu chuyển + giảm dần I','Đắp ngược lại 5-10mm trước khi tắt','Dùng máy có chế độ crater fill','Mài lõm + đắp lại'],
      ref:'AWS D1.1 §7.19', sketch:'def_crater' },

    { id:'magnetic-blow', cat:'weld', rootCause:'machine', name:'Thổi từ (Magnetic Arc Blow)', severity:'medium',
      symptom:'Hồ quang bị "đẩy" lệch khỏi đường hàn, đặc biệt DC + sắt từ.',
      causes:['Cáp tiếp đất 1 phía','Hàn DC trên thép cao tự cảm ứng','Cuối tấm dày'],
      remedies:['Đặt tiếp đất 2 đầu của workpiece','Đổi AC khi DC bị thổi','Bọc dây cáp wraparound workpiece','Skewbed welding tách rời cuối tấm','Hàn xen kẽ 2 chiều'],
      ref:'AWS Welding Handbook Vol.2 ch.6', sketch:'def_blow' },

    { id:'lamellar-tear', cat:'parent', rootCause:'material', name:'Lamellar Tearing (xé lớp kim loại cơ bản)', severity:'critical',
      symptom:'Nứt theo phương song song mặt cán, dưới HAZ. Xảy ra với joints T-,L- transverse loading.',
      causes:['Vật liệu không Z-quality (Z15/Z25/Z35)','Restraint Z cao','Hydrogen','Vật liệu dày + lớp xen kẽ S/MnS'],
      remedies:['Đặt mua Z25 trở lên cho t ≥ 25mm','Thay đổi thiết kế giảm Z-loading','Buttering surface với điện cực mềm trước hàn','Preheat 150°C','Inspection UT đặc biệt straight-beam'],
      ref:'EN 10164 Z-grades + AWS D1.1 §C-5.16', sketch:'def_lamellar' },

    { id:'reheat-crack', cat:'pwht', rootCause:'method', name:'Reheat Crack (PWHT cracking)', severity:'high',
      symptom:'Nứt trong HAZ khi PWHT (post-weld heat treatment) 550-700°C',
      causes:['Vật liệu có V, Mo, Cr cao (Cr-Mo steels)','PWHT quá chậm hoặc nhiệt độ sai','Stress concentration tại notch','Thiết kế welded joint phức tạp'],
      remedies:['Heating rate ≤ 100°C/h cho t < 25mm · ≤ 50°C/h cho t > 50mm','Holding 600-650°C × 2.5 min/mm','Stress-relief grinding trước PWHT','Sử dụng L-grade (low carbon) cho Cr-Mo'],
      ref:'ASME VIII Div.1 UCS-56 + WRC Bulletin', sketch:'def_reheat' },

    { id:'mill-scale', cat:'parent', rootCause:'method', name:'Vảy cán còn lại (Mill Scale)', severity:'medium',
      symptom:'Vảy đen FeO/Fe₃O₄ trên mặt thép cán nóng → mối hàn rỗ, không ngấu.',
      causes:['Không cạo vảy trước hàn','Sandblast Sa 2.5 không đạt','Lưu kho lâu ngoài trời','Mép cắt còn vảy'],
      remedies:['Mài cơ học 25mm 2 bên đường hàn đến kim loại sáng','Sandblast Sa 2.5 (ISO 8501-1) trước hàn','Lau aceton sau mài','Cắt plasma > mài thay vì oxy + mài'],
      ref:'ISO 8501-1 + AWS D1.1 §5.15', sketch:'def_mill_scale' },

    { id:'rust', cat:'parent', rootCause:'env', name:'Gỉ kim loại cơ bản (Rust on parent metal)', severity:'medium',
      symptom:'Lớp gỉ ẩm trên mép vát → H₂ + porosity + giảm strength',
      causes:['Lưu kho ngoài trời > 6 tháng','Mặt bị nước/mưa','Sandblast không sạch','Vận chuyển không bảo vệ'],
      remedies:['Sandblast Sa 2.5 toàn diện','Sấy nóng 100°C/30 phút trước hàn','Bảo quản trong nhà có thông gió','Sơn lót zinc primer ngay sau sandblast','Bọc nilon nếu chứa ngoài'],
      ref:'ISO 8501-1 + EN ISO 12944', sketch:'def_rust' },

    { id:'wrong-electrode', cat:'consum', rootCause:'man', name:'Sai loại que/dây (Wrong consumable)', severity:'high',
      symptom:'Mối hàn có cơ tính khác hợp đồng — không đạt CVN, không đạt sức bền',
      causes:['Lấy nhầm thùng que','Que/dây hết hạn + không sấy','Quên ghi rõ ban đầu','Trộn nhiều loại trong 1 thùng'],
      remedies:['Tag que rõ ràng theo MTC','FIFO (first in first out) khi xuất kho','Welder check trước hàn','PQR/WPS rõ ràng','In-process audit của QC'],
      ref:'AWS A5.x specifications + ASME IX', sketch:'def_consum' },

    { id:'preheat-fail', cat:'pwht', rootCause:'man', name:'Quên/sai preheat', severity:'critical',
      symptom:'Nứt H₂ sau 48-72h hoặc HAZ quá cứng > 350 HV',
      causes:['Người hàn quên đo nhiệt độ','Đo bằng nhiệt kế tiếp xúc sai','Crayon nhiệt độ hết hạn','Thiếu thiết bị (gas heater)'],
      remedies:['Đo bằng pen-type IR 50mm từ joint TRƯỚC khi hàn','Crayon Tempil chính xác ±5°C','Heating blanket cho dày > 40mm','HOLD inspection point cho t > 25mm','Training thợ hàn về CE/preheat'],
      ref:'AWS D1.1 §5.6 + EN 1011-2', sketch:'def_preheat' },

    { id:'wrong-sequence', cat:'distort', rootCause:'method', name:'Sai sequence hàn', severity:'high',
      symptom:'Biến dạng tổng thể quá lớn, không thể chỉnh thẳng sau',
      causes:['Hàn theo thứ tự ngẫu nhiên','Không có sequence drawing','Quá nhiều thợ làm song song không phối hợp','Hàn từ đầu đến cuối theo 1 chiều'],
      remedies:['Welding sequence drawing rõ trước thi công','Hàn xen kẽ 1-3-2-4','Hàn từ giữa ra 2 đầu','Symmetric về 2 phía neutral axis','Pre-camber tính trước'],
      ref:'AWS D1.1 Annex K + AISC Quality Manual', sketch:'def_sequence' },

    /* ========== PAINT / COATING DEFECTS (ISO 12944, SSPC, NACE) ========== */
    { id:'paint-blister', cat:'paint', rootCause:'env', name:'Phồng sơn (Blistering)', severity:'high',
      symptom:'Bong bóng tròn phồng lên trên màng sơn — chứa nước hoặc khí ở dưới',
      causes:['Bề mặt không sạch (dầu, muối, ẩm)','Sơn lên bề mặt ẩm/nước đọng','DFT quá dày (overcoat)','Sơn lên thép nóng > 50°C','Khoảng cách lớp không đủ (recoat window)'],
      remedies:['Sandblast Sa 2.5 + đo độ muối ≤ 50 mg/m²','Đo điểm sương dew point — nhiệt bề mặt > +3°C dew','Tuân thủ DFT max của TDS sơn','Đợi thép nguội < 40°C mới sơn','Tuân thủ recoat min/max window'],
      ref:'ISO 4628-2 + SSPC-VIS 2',
      refImg:'https://upload.wikimedia.org/wikipedia/commons/0/01/Paint_blister.jpg',
      sketch:'def_blister' },

    { id:'paint-runs', cat:'paint', rootCause:'man', name:'Chảy sơn (Runs / Sags)', severity:'medium',
      symptom:'Đường rủ / giọt sơn chảy xuống — thường ở mép, góc',
      causes:['Sơn nhiều lớp 1 lần (DFT quá cao)','Pha loãng quá nhiều thinner','Súng phun quá gần / quá chậm','Bề mặt nghiêng + sơn không thixotropic','Nhiệt độ thấp + độ nhớt thấp'],
      remedies:['Phun 2 lớp mỏng thay 1 lớp dày','Đúng tỷ lệ thinner theo TDS','CTS distance 20-30cm + tốc độ đều','Quay tròn cấu kiện khi sơn mặt nghiêng','Nâng nhiệt độ phun hoặc đổi sơn high-build'],
      ref:'ISO 4628-x + SSPC-VIS 2',
      refImg:'https://upload.wikimedia.org/wikipedia/commons/5/52/Paint_run_defect.jpg',
      sketch:'def_runs' },

    { id:'paint-orange-peel', cat:'paint', rootCause:'machine', name:'Vỏ cam (Orange Peel)', severity:'low',
      symptom:'Bề mặt sơn không phẳng, có texture giống vỏ cam',
      causes:['Súng phun quá xa (CTS > 40cm)','Áp suất phun thấp','Sơn quá đặc/ít thinner','Nhiệt độ ambient cao → sơn khô trước khi flow','Đầu súng quá nhỏ'],
      remedies:['Giữ CTS 20-25cm','Tăng áp suất phun (40-60 psi)','Pha thinner đúng tỷ lệ','Sơn vào sáng sớm hoặc chiều mát','Đổi đầu súng phù hợp viscosity'],
      ref:'ISO 4628-x',
      refImg:'https://upload.wikimedia.org/wikipedia/commons/4/4c/Orange_peel_paint.jpg',
      sketch:'def_orange_peel' },

    { id:'paint-pinhole', cat:'paint', rootCause:'method', name:'Lỗ kim (Pinhole / Pinpoint)', severity:'high',
      symptom:'Lỗ nhỏ xuyên qua màng sơn — phát hiện qua holiday detector',
      causes:['Sơn quá đặc → bọt khí không thoát','Sandblast còn pit sâu','Phun lớp dày 1 lần','Sơn lên bề mặt nóng','Thinner sai loại'],
      remedies:['Pha loãng + agitate sơn đều','Sandblast lại + filler pit > 50µm','Phun 2-3 lớp mỏng','Đợi bề mặt < 40°C','Dùng thinner đúng TDS'],
      ref:'NACE SP0188 (holiday testing) + ISO 4628',
      refImg:'https://upload.wikimedia.org/wikipedia/commons/0/0f/Pinhole_corrosion.jpg',
      sketch:'def_pinhole' },

    { id:'paint-fish-eye', cat:'paint', rootCause:'machine', name:'Mắt cá (Fish-eye / Cratering)', severity:'medium',
      symptom:'Vết tròn lõm như mắt cá, có chấm tâm — do bề mặt bị dính dầu/silicone',
      causes:['Dầu mỡ silicone từ khí nén','Tay người vô tình chạm','Súng phun bị nhiễm silicone từ shop trước','Compressor không có water/oil trap'],
      remedies:['Lắp filter oil/water trên khí nén','Cấm chạm tay vào bề mặt đã sandblast','Vệ sinh súng phun trước khi đổi sơn','Mài + sơn lại vùng fish-eye'],
      ref:'SSPC-VIS 2 + NACE Coating Inspector',
      refImg:'https://upload.wikimedia.org/wikipedia/commons/2/20/Fisheye_paint_defect.jpg',
      sketch:'def_fisheye' },

    { id:'paint-dft-low', cat:'paint', rootCause:'measurement', name:'DFT thiếu (Dry Film Thickness < spec)', severity:'high',
      symptom:'Đo bằng PIG/Elcometer ra giá trị < spec → không đủ bảo vệ ăn mòn',
      causes:['Phun quá nhanh / mỏng','Sơn pha loãng quá','Áp suất thấp','Không đo trong quá trình','Người phun thiếu kinh nghiệm'],
      remedies:['Phun chậm hơn, overlap 50%','Đo wet film thickness ngay sau phun bằng comb','Đo DFT sau khô bằng máy magnetic / eddy current','Sơn thêm lớp tới đạt spec','Train thợ phun + nghiệm thu từng lớp'],
      ref:'ISO 19840 + SSPC-PA 2 (DFT measurement)',
      refImg:'https://upload.wikimedia.org/wikipedia/commons/8/81/Coating_thickness_gauge.jpg',
      sketch:'def_dft' },

    { id:'paint-dft-high', cat:'paint', rootCause:'measurement', name:'DFT thừa (DFT > max spec)', severity:'medium',
      symptom:'Sơn quá dày → giảm độ dẻo, dễ nứt, lâu khô, có thể tổng ƯS nội',
      causes:['Phun chồng quá nhiều lớp','Sơn high-build không pha loãng','Không đo trong quá trình'],
      remedies:['Mài chip lớp thừa nếu quá max + 25%','Theo dõi WFT mỗi lớp','Đo DFT cumulative — không vượt max của TDS'],
      ref:'ISO 19840 + ISO 12944-7',
      refImg:'',
      sketch:'def_dft' },

    { id:'paint-adhesion', cat:'paint', rootCause:'method', name:'Mất bám (Adhesion failure)', severity:'critical',
      symptom:'Sơn bong khỏi bề mặt thép — pull-off test < spec',
      causes:['Bề mặt không sạch (oil, salt, scale)','Profile bề mặt < spec (Rz < 50µm)','Sơn không tương thích với primer','Recoat window vượt quá','Nhiệt độ sơn ngoài spec'],
      remedies:['Sandblast lại Sa 2.5 + đo profile Rz 50-80µm','Bridge test tương thích primer-topcoat','Sơn trong recoat window (4-24h tùy sơn)','Pull-off test (ISO 4624) ≥ 5 MPa cho epoxy','Salt contamination ≤ 50 mg/m² (ISO 8502-9)'],
      ref:'ISO 4624 + ISO 16276',
      refImg:'https://upload.wikimedia.org/wikipedia/commons/d/df/Paint_peeling.jpg',
      sketch:'def_adhesion' },

    { id:'paint-rust-bleed', cat:'paint', rootCause:'method', name:'Gỉ thấm qua (Rust bleeding / Rust spot)', severity:'high',
      symptom:'Vết gỉ vàng/nâu thấm qua lớp sơn — sandblast còn vảy hoặc thép tự gỉ trong primer',
      causes:['Sandblast chưa sạch ISO Sa 2.5','Thép ẩm khi sơn primer','Không đủ thời gian khô primer','Salt residue dưới sơn'],
      remedies:['Re-blast vùng đó + sơn lại từ primer','Đo salt < 50 mg/m² trước primer','Sấy bề mặt + đo dew point','Sandblast trong vòng 4h là sơn primer ngay (no flash rust)'],
      ref:'ISO 8501-1 + ISO 8502-9',
      refImg:'https://upload.wikimedia.org/wikipedia/commons/b/b5/Rust_bleeding.jpg',
      sketch:'def_rust_bleed' },

    { id:'paint-cracking', cat:'paint', rootCause:'material', name:'Nứt sơn (Cracking / Crazing)', severity:'medium',
      symptom:'Mạng nứt nhỏ trên màng sơn',
      causes:['DFT quá dày','Sơn cũ hết hạn','UV exposure trên sơn không UV-resistant','Topcoat khác hệ với undercoat','Cấu kiện chịu ƯS sau khi sơn'],
      remedies:['Tuân thủ DFT max của TDS','Kiểm hạn sử dụng sơn','Dùng polyurethane / aliphatic cho topcoat ngoài trời','Bridge test 1 mẫu trước khi sơn cả lô'],
      ref:'ISO 4628-4 + ASTM D661',
      refImg:'https://upload.wikimedia.org/wikipedia/commons/8/8d/Paint_crack.jpg',
      sketch:'def_crack_paint' },

    { id:'paint-chalk', cat:'paint', rootCause:'material', name:'Phấn hoá (Chalking)', severity:'low',
      symptom:'Bột trắng trên bề mặt sơn — sau UV exposure dài',
      causes:['Topcoat alkyd / amino UV xấu','Pigment kém','Sơn rẻ ngoài trời'],
      remedies:['Sạch bằng nước + bàn chải mềm + recoat','Đổi sang aliphatic polyurethane cho ngoài trời','Theo ISO 12944-2: C5-M cho biển'],
      ref:'ISO 4628-6 + ISO 12944',
      refImg:'https://upload.wikimedia.org/wikipedia/commons/1/1a/Chalking_paint.jpg',
      sketch:'def_chalk' },

    { id:'paint-color', cat:'paint', rootCause:'material', name:'Sai màu / Đốm (Color mismatch / Mottling)', severity:'low',
      symptom:'Màu không đồng đều, có đốm sáng tối, không khớp RAL spec',
      causes:['Trộn nhiều mẻ sơn khác lot','Khuấy chưa đều','Pigment lắng','Áp suất phun thay đổi'],
      remedies:['Đặt sơn cùng lot cho cả công trình','Khuấy 5-10 phút bằng máy mixer','Đo RAL bằng spectrometer','Đảm bảo áp suất ổn định'],
      ref:'ISO 3668 (color matching)',
      refImg:'',
      sketch:'def_color' },

    { id:'paint-dirty-inclusion', cat:'paint', rootCause:'env', name:'Bụi/lông kẹt trong sơn (Inclusions)', severity:'medium',
      symptom:'Bụi, lông tóc, côn trùng kẹt trong màng sơn ướt',
      causes:['Phòng sơn không sạch / có gió','Sơn ngoài trời có gió bụi','Quần áo người sơn rụng xơ','Súng phun bẩn'],
      remedies:['Phòng sơn kín + filter khí HEPA','Sơn trong nhà / có lều che','Quần áo coverall đặc dùng cho sơn','Lọc sơn qua mesh 100 trước khi rót súng'],
      ref:'ISO 12944-7',
      refImg:'',
      sketch:'def_dirt' },

    { id:'paint-dew-point', cat:'paint', rootCause:'env', name:'Đọng sương / Dew Point fail', severity:'critical',
      symptom:'Nước đọng trên bề mặt thép khi sơn → blistering + adhesion fail',
      causes:['Nhiệt độ bề mặt ≤ dew point + 3°C','Sơn vào sáng sớm khi sương','Độ ẩm > 85%','Không đo nhiệt độ + dew point trước sơn'],
      remedies:['Phải có psychrometer đo Tdew, Tsurface, RH','Quy tắc: Tsurface ≥ Tdew + 3°C MỚI được sơn','RH ≤ 85% (tuỳ TDS)','Sấy bề mặt bằng heat blower hoặc đợi nắng lên'],
      ref:'ISO 8502-4 + SSPC-PA Guide',
      refImg:'https://upload.wikimedia.org/wikipedia/commons/9/97/Psychrometric_chart.png',
      sketch:'def_dew' },

    { id:'paint-bleeding-thru', cat:'paint', rootCause:'material', name:'Bleeding qua màu (Topcoat bleed)', severity:'medium',
      symptom:'Màu primer thấm qua topcoat — đặc biệt với red oxide primer dưới topcoat sáng',
      causes:['Topcoat solvent mạnh hoà tan primer','Primer chưa khô đủ','Sơn nhiều lớp solvent-based liên tiếp'],
      remedies:['Dùng sealer giữa primer và topcoat','Đợi primer khô hoàn toàn','Đổi sang primer light color','Topcoat 2 lớp che bleed'],
      ref:'TDS primer + topcoat',
      refImg:'',
      sketch:'def_bleed' },

    /* ========== DIMENSIONAL DEFECTS ========== */
    { id:'dim-twist', cat:'dim', rootCause:'method', name:'Vặn (Twist) — không phẳng theo chiều dài', severity:'high',
      symptom:'Cấu kiện I/box bị xoắn — không nằm thẳng trên 4 điểm',
      causes:['Hàn không cân 2 bên','Cắt 4 cánh không đối xứng','Không gá fix khi hàn dài','Heat input không đều'],
      remedies:['Sequence hàn xen kẽ 2 bên','Cắt CNC đảm bảo đối xứng','Strong-back fix toàn chiều dài','Cold straightening sau hàn'],
      ref:'EN 1090-2 §11.2.4 + EN 10034',
      refImg:'',
      sketch:'def_twist' },

    { id:'dim-sweep', cat:'dim', rootCause:'method', name:'Cong ngang (Sweep)', severity:'medium',
      symptom:'Dầm cong theo trục yếu z-z thay vì trục chính y-y',
      causes:['Cắt blank không thẳng','Hàn 1 cánh trước cánh kia','Vận chuyển sai','Lệch cẩu khi nâng'],
      remedies:['Cắt CNC + kiểm thẳng trước hàn','Hàn xen kẽ 2 cánh','Vận chuyển có gá đỡ ≥ 3 điểm','Cẩu 2 điểm với spreader bar'],
      ref:'EN 10034 Table 2',
      refImg:'',
      sketch:'def_sweep' },

    { id:'dim-camber-wrong', cat:'dim', rootCause:'man', name:'Camber sai chiều (Reverse camber)', severity:'high',
      symptom:'Dầm camber ngược hướng thiết kế (lên thành xuống)',
      causes:['Đọc bản vẽ sai','Lật cấu kiện khi vận chuyển','Hiểu nhầm camber up/down','Không có marker chiều camber'],
      remedies:['Đánh dấu mũi tên ↑ "TOP" trên cánh trên','Camber drawing rõ ràng có mũi tên','Cẩu + lắp đúng chiều','Inspection bằng template trước erection'],
      ref:'AISC 303 + AASHTO LRFD',
      refImg:'',
      sketch:'def_camber_wrong' },

    { id:'dim-hole-pos', cat:'dim', rootCause:'machine', name:'Lỗ sai vị trí (Hole position out)', severity:'high',
      symptom:'Lỗ bulông không khớp với cấu kiện đối — không lắp được',
      causes:['Drill template sai','Bản vẽ thiếu chuẩn datum','CNC misalign','Không kiểm trước assembly'],
      remedies:['Drill jig + template đối chiếu','Vẽ rõ datum A/B','Calibration CNC định kỳ','Trial assembly 1 cặp trước khi nhân bản'],
      ref:'EN 1090-2 §6.6 + AISC 303 §6.4',
      refImg:'',
      sketch:'def_hole_pos' },

    { id:'dim-length-wrong', cat:'dim', rootCause:'measurement', name:'Chiều dài sai (Length out of tol)', severity:'high',
      symptom:'Chiều dài đo bằng thước thép > / < spec',
      causes:['Cắt sai dim','Co rút hàn không bù','Thước thép giãn nở nhiệt','Đọc thước sai'],
      remedies:['Calibration thước thép định kỳ','Bù co rút hàn 0.0002L','Đo lúc nhiệt độ ổn định','Verify bằng laser distance meter'],
      ref:'EN 1090-2 Table B.5 + ISO 13920',
      refImg:'',
      sketch:'def_len_wrong' },

    { id:'dim-gap-flange', cat:'dim', rootCause:'machine', name:'Khe hở mối ghép bích (Flange gap)', severity:'high',
      symptom:'Khe giữa 2 bích lắp ghép > 1mm sau khi siết bulông',
      causes:['Bích không phẳng (warp > 1mm)','Hàn bích vào pipe lệch','Gá không vuông góc','Tấm gasket không đều'],
      remedies:['Mài bích để đạt phẳng < 0.5mm','Hàn bích trên jig vuông góc','Kiểm gap bằng feeler gauge < 0.5mm sau siết','Dùng gasket độ dày đều'],
      ref:'ASME B16.5 + EN 1092-1',
      refImg:'',
      sketch:'def_gap' },

    { id:'dim-shrink-uneq', cat:'dim', rootCause:'method', name:'Co rút không đều (Unequal shrinkage)', severity:'medium',
      symptom:'Cấu kiện sau hàn lệch tâm so với trục lý thuyết',
      causes:['Hàn 1 bên trước bên kia','Heat input không cân','Không pre-set ngược','Sequence sai'],
      remedies:['Balanced welding 2 bên 1 lúc','Pre-set ngược 30-50% co dự kiến','Sequence drawing rõ','Đo + correct sau mỗi lớp'],
      ref:'AWS D1.1 Annex K',
      refImg:'',
      sketch:'def_shrink_uneq' },

    { id:'dim-stack-up', cat:'dim', rootCause:'method', name:'Stack-up dung sai (Cumulative tolerance)', severity:'medium',
      symptom:'Nhiều dim cộng dồn vượt dung sai tổng — assembly không khớp',
      causes:['Không tính tolerance stack-up','Chain dimensioning thay vì baseline','Mỗi part đạt riêng nhưng sum sai','Không hiểu Sum vs RSS'],
      remedies:['Tính stack-up: Worst Case (sum) hoặc RSS (sqrt sum sq)','Đặt critical dim với baseline + GD&T','Tuỳ Cp/Cpk dùng method nào','Verify bằng trial fit-up'],
      ref:'ASME Y14.5 + ISO 14405',
      refImg:'',
      sketch:'def_stack_up' },

    { id:'dim-baseplate', cat:'dim', rootCause:'method', name:'Base plate lệch (Anchor mismatch)', severity:'critical',
      symptom:'Cột không lắp vào base plate vì bulông neo không khớp lỗ',
      causes:['Đổ bê tông cẩu thả không theo bản vẽ','Template không có khi đổ móng','Bulông neo bị đẩy lệch khi đầm bê tông','Không có survey trước erection'],
      remedies:['Template thép bắt buộc khi đổ móng','Survey base position trước cẩu cột','Lỗ oversize trên base plate (+6mm)','Grouting sau cùng để bù lệch nhỏ'],
      ref:'AISC 303 §7.5 + EN 1090-2 §11.2',
      refImg:'',
      sketch:'anchor_bolt_pattern' }
  ]
};

console.log('LD_DATA loaded:', window.LD_DATA.allowance.length, 'formulas +', window.LD_DATA.defects.length, 'defects');
