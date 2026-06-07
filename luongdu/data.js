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
    { id:'undercut', cat:'weld', name:'Cháy chân (Undercut)', severity:'medium',
      symptom:'Rãnh khuyết tại chân mối hàn, song song mối hàn',
      causes:['Dòng hàn I quá cao','Hồ quang dài (V cao)','Tốc độ di chuyển nhanh','Góc que/đầu hàn sai','Không lưu vũ chuyển trên kim loại cơ bản'],
      remedies:['Giảm I 10-20A','Hạ chiều dài hồ quang','Chậm lại 10-15%','Chỉnh góc 70-80° cho fillet','Lưu chuyển tại chân 1-2 giây'],
      ref:'AWS D1.1 §7.16 + ISO 5817 §5.10', sketch:'def_undercut' },

    { id:'porosity', cat:'weld', name:'Rỗ khí (Porosity)', severity:'high',
      symptom:'Lỗ tròn nhỏ trên hoặc trong mối hàn — phát hiện qua RT/UT',
      causes:['Que/dây ẩm','Khí bảo vệ kém (rò rỉ, thiếu lưu lượng)','Bề mặt dơ (dầu, rỉ, sơn, nước)','Hồ quang dài (V cao)','Gió thổi tan khí bảo vệ'],
      remedies:['Sấy que SMAW 250°C/1h, dây MIG kín trong tủ sấy','Kiểm gas: 15-20 L/min · ống không gấp','Mài + lau aceton 25mm 2 bên đường hàn','Hạ V hồ quang','Che chắn gió < 3 m/s'],
      ref:'AWS D1.1 §7.18 + ISO 5817 §5.4', sketch:'def_porosity' },

    { id:'crack-hot', cat:'weld', name:'Nứt nóng (Hot crack / Solidification crack)', severity:'critical',
      symptom:'Nứt dọc theo trục mối hàn ngay khi nguội. Centerline crack đặc trưng.',
      causes:['Tỷ số chiều rộng/chiều cao W/D < 1.4','Tốc độ di chuyển nhanh','Hàm lượng S, P cao trong vật liệu','Mặt cắt mối hàn không cân (concave)','Cốt liệu bẩn'],
      remedies:['Tăng W bằng dao động','Giảm tốc độ — tăng heat input','Chọn que/dây low-S (< 0.025%)','Đảm bảo profile lồi nhẹ (convex)','Vệ sinh mép kỹ'],
      ref:'AWS D1.1 §7.14 + Lincoln Procedure Handbook ch.6.3', sketch:'def_crack_hot' },

    { id:'crack-cold', cat:'weld', name:'Nứt nguội (Cold crack / Hydrogen-induced)', severity:'critical',
      symptom:'Nứt xuất hiện 48-72h SAU khi hàn. Thường tại HAZ. Cần kiểm UT sau 48h.',
      causes:['H₂ khuếch tán: que ẩm, vật liệu ẩm','Tốc độ nguội nhanh','Restraint cao (cấu kiện cứng)','Carbon equivalent CE > 0.45','Thiếu preheat'],
      remedies:['Preheat: t=20mm → 100°C · t=40mm → 150°C · t=60mm → 200°C','Dùng que low-H (< 5 ml H₂/100g)','Sấy que 350°C/2h, lưu thùng 150°C','Post-weld heat treatment 200-250°C × 1h/25mm','Giảm restraint bằng sequence'],
      ref:'AWS D1.1 §5.6 Preheat table 5.8 + EN 1011-2', sketch:'def_crack_cold' },

    { id:'lack-fusion', cat:'weld', name:'Không ngấu (Lack of Fusion / Incomplete Fusion)', severity:'high',
      symptom:'Mối hàn không nóng chảy với kim loại cơ bản. Phát hiện qua UT.',
      causes:['Dòng hàn I thấp','Góc que sai','Tốc độ quá nhanh','Mép vát không sạch (xỉ, rỉ, sơn)','Khoảng cách điện cực CTWD lớn'],
      remedies:['Tăng I 15-25%','Chỉnh góc 75-80° hướng vào root','Giảm tốc độ','Mài lại mép vát đến kim loại sáng','Giữ CTWD 12-20mm cho MIG'],
      ref:'AWS D1.1 §7.15 + ISO 5817 §5.7', sketch:'def_lof' },

    { id:'lack-penetration', cat:'weld', name:'Không thấu (Lack of Penetration / Incomplete Penetration)', severity:'high',
      symptom:'Phần root joint không hàn ngấu hoàn toàn. Đáng kể với CJP.',
      causes:['Khe hở gốc quá hẹp (< 2mm)','Root face quá lớn (> 2mm)','Dòng hàn thấp','Tốc độ nhanh','Que/dây quá lớn cho rãnh'],
      remedies:['Mở khe gốc 3-5mm','Mài root face xuống ≤ 1.5mm','Tăng I 20%','Hàn lớp gốc chậm + lưu chuyển','Đổi que nhỏ hơn (Ø2.5 thay Ø3.2)'],
      ref:'AWS D1.1 §7.13 + EN 287-1', sketch:'def_lop' },

    { id:'slag-inclusion', cat:'weld', name:'Xỉ kẹt (Slag Inclusion)', severity:'medium',
      symptom:'Xỉ bị giam giữa các lớp hàn. Phát hiện qua RT (vùng tối không tròn như rỗ).',
      causes:['Vệ sinh xỉ kém giữa lớp','Profile lớp lõm (concave)','Hàn ngược chiều với lớp trước','Tốc độ quá chậm tạo xỉ chìm','Que/dây dòng quá thấp'],
      remedies:['Đánh xỉ + đánh thép bằng bàn chải kim','Giữ profile lồi nhẹ','Hàn cùng chiều với lớp trước','Tăng I tăng tốc nhẹ','Đảo chỉ điều chỉnh'],
      ref:'AWS D1.1 §7.21 + ISO 5817 §5.3', sketch:'def_slag' },

    { id:'spatter', cat:'weld', name:'Văng tia (Spatter)', severity:'low',
      symptom:'Hạt kim loại nóng văng ra ngoài đường hàn — gây ảnh hưởng surface',
      causes:['Dòng hàn quá cao','CTWD quá dài (MIG)','Cường độ dòng âm (DCEN sai)','Khí bảo vệ thiếu CO₂ (chỉ Argon)'],
      remedies:['Giảm I 10-15A','Giữ CTWD 12-15mm','Đảo polarity sang DCEP','Đổi gas mix 82%Ar + 18%CO₂ cho MAG','Phun anti-spatter spray'],
      ref:'AWS D1.1 §7.5 + Lincoln Welding Handbook', sketch:'def_spatter' },

    { id:'distortion-i', cat:'distort', name:'Méo cánh I (I-section Distortion)', severity:'high',
      symptom:'Cánh trên/dưới bị cong vào, bụng vênh. Gây sai dung sai EN 10034.',
      causes:['Hàn liên tục 1 cánh không xen kẽ','Heat input quá lớn','Không có sequence','Không gá định vị','Hàn cùng phía liên tiếp'],
      remedies:['Sequence 1-3-2-4: hàn xen kẽ 2 cánh','Heat input ≤ 2.5 kJ/mm','Gá fix bằng strong-back kẹp','Hàn từ giữa ra 2 đầu','Pre-cambering trước hàn (chỉnh hình ngược)'],
      ref:'AWS D1.1 Annex K + EN 1090-2 §7.5', sketch:'def_distort_i' },

    { id:'distortion-plate', cat:'distort', name:'Cong vênh tấm (Plate Warpage)', severity:'medium',
      symptom:'Tấm bị cong khi hàn nhiều mối song song. Khó kiểm phẳng EN 10029.',
      causes:['Heat input tập trung 1 vùng','Tấm mỏng (t < 8mm)','Không cố định khi hàn','Hàn liên tục 1 mặt'],
      remedies:['Phân nhóm hàn (skip welding) 100mm-bỏ 200mm','Dùng tấm balance dày hơn','Kẹp gá lên bàn nguội','Hàn song song 2 mặt cùng lúc','Sau hàn: cold straightening máy ép'],
      ref:'AWS D1.1 Annex K Fig K.5', sketch:'def_warp' },

    { id:'misalign', cat:'fit', name:'Lệch tâm mối ghép (Misalignment / High-low)', severity:'medium',
      symptom:'Hai tấm không cùng cốt khi hàn butt joint. Chênh > 0.1t hoặc 3mm.',
      causes:['Fit-up trước hàn sai','Tack weld không đủ chắc','Tấm có dung sai dày lớn','Co rút khi hàn lệch'],
      remedies:['Kiểm fit-up trước hàn: ≤ 1mm','Tack weld 4-6 điểm × 25mm','Đảo tấm cùng dày','Symmetric welding 2 bên','Sửa bằng mài + đắp lại nếu Δ > t/10'],
      ref:'AWS D1.1 §5.21 + ASME UG-33', sketch:'def_misalign' },

    { id:'arc-strike', cat:'weld', name:'Hồ quang lạc (Arc Strike)', severity:'high',
      symptom:'Vết hồ quang ngoài đường hàn — vùng đó cứng do tôi tự nhiên, có thể nứt sau.',
      causes:['Khởi động hồ quang trên kim loại cơ bản','Cáp tiếp đất tiếp xúc kém','Que rơi'],
      remedies:['Khởi động trên runoff tab (mép thừa)','Kiểm tiếp đất tốt','Mài sạch vết hồ quang lạc 1.5mm + UT vùng đó','Treo que đúng cách'],
      ref:'AWS D1.1 §5.29 + EN 1090-2 §7.5.7', sketch:'def_arc_strike' },

    { id:'craters', cat:'weld', name:'Lõm cuối đường (Crater)', severity:'medium',
      symptom:'Vết lõm tại điểm dừng hàn — dễ nứt crater.',
      causes:['Tắt hồ quang đột ngột','Không lưu chuyển đắp đầy','Dòng hàn dừng nhanh'],
      remedies:['Crater fill: lưu chuyển + giảm dần I','Đắp ngược lại 5-10mm trước khi tắt','Dùng máy có chế độ crater fill','Mài lõm + đắp lại'],
      ref:'AWS D1.1 §7.19', sketch:'def_crater' },

    { id:'magnetic-blow', cat:'weld', name:'Thổi từ (Magnetic Arc Blow)', severity:'medium',
      symptom:'Hồ quang bị "đẩy" lệch khỏi đường hàn, đặc biệt DC + sắt từ.',
      causes:['Cáp tiếp đất 1 phía','Hàn DC trên thép cao tự cảm ứng','Cuối tấm dày'],
      remedies:['Đặt tiếp đất 2 đầu của workpiece','Đổi AC khi DC bị thổi','Bọc dây cáp wraparound workpiece','Skewbed welding tách rời cuối tấm','Hàn xen kẽ 2 chiều'],
      ref:'AWS Welding Handbook Vol.2 ch.6', sketch:'def_blow' },

    { id:'lamellar-tear', cat:'parent', name:'Lamellar Tearing (xé lớp kim loại cơ bản)', severity:'critical',
      symptom:'Nứt theo phương song song mặt cán, dưới HAZ. Xảy ra với joints T-,L- transverse loading.',
      causes:['Vật liệu không Z-quality (Z15/Z25/Z35)','Restraint Z cao','Hydrogen','Vật liệu dày + lớp xen kẽ S/MnS'],
      remedies:['Đặt mua Z25 trở lên cho t ≥ 25mm','Thay đổi thiết kế giảm Z-loading','Buttering surface với điện cực mềm trước hàn','Preheat 150°C','Inspection UT đặc biệt straight-beam'],
      ref:'EN 10164 Z-grades + AWS D1.1 §C-5.16', sketch:'def_lamellar' },

    { id:'reheat-crack', cat:'pwht', name:'Reheat Crack (PWHT cracking)', severity:'high',
      symptom:'Nứt trong HAZ khi PWHT (post-weld heat treatment) 550-700°C',
      causes:['Vật liệu có V, Mo, Cr cao (Cr-Mo steels)','PWHT quá chậm hoặc nhiệt độ sai','Stress concentration tại notch','Thiết kế welded joint phức tạp'],
      remedies:['Heating rate ≤ 100°C/h cho t < 25mm · ≤ 50°C/h cho t > 50mm','Holding 600-650°C × 2.5 min/mm','Stress-relief grinding trước PWHT','Sử dụng L-grade (low carbon) cho Cr-Mo'],
      ref:'ASME VIII Div.1 UCS-56 + WRC Bulletin', sketch:'def_reheat' },

    { id:'mill-scale', cat:'parent', name:'Vảy cán còn lại (Mill Scale)', severity:'medium',
      symptom:'Vảy đen FeO/Fe₃O₄ trên mặt thép cán nóng → mối hàn rỗ, không ngấu.',
      causes:['Không cạo vảy trước hàn','Sandblast Sa 2.5 không đạt','Lưu kho lâu ngoài trời','Mép cắt còn vảy'],
      remedies:['Mài cơ học 25mm 2 bên đường hàn đến kim loại sáng','Sandblast Sa 2.5 (ISO 8501-1) trước hàn','Lau aceton sau mài','Cắt plasma > mài thay vì oxy + mài'],
      ref:'ISO 8501-1 + AWS D1.1 §5.15', sketch:'def_mill_scale' },

    { id:'rust', cat:'parent', name:'Gỉ kim loại cơ bản (Rust on parent metal)', severity:'medium',
      symptom:'Lớp gỉ ẩm trên mép vát → H₂ + porosity + giảm strength',
      causes:['Lưu kho ngoài trời > 6 tháng','Mặt bị nước/mưa','Sandblast không sạch','Vận chuyển không bảo vệ'],
      remedies:['Sandblast Sa 2.5 toàn diện','Sấy nóng 100°C/30 phút trước hàn','Bảo quản trong nhà có thông gió','Sơn lót zinc primer ngay sau sandblast','Bọc nilon nếu chứa ngoài'],
      ref:'ISO 8501-1 + EN ISO 12944', sketch:'def_rust' },

    { id:'wrong-electrode', cat:'consum', name:'Sai loại que/dây (Wrong consumable)', severity:'high',
      symptom:'Mối hàn có cơ tính khác hợp đồng — không đạt CVN, không đạt sức bền',
      causes:['Lấy nhầm thùng que','Que/dây hết hạn + không sấy','Quên ghi rõ ban đầu','Trộn nhiều loại trong 1 thùng'],
      remedies:['Tag que rõ ràng theo MTC','FIFO (first in first out) khi xuất kho','Welder check trước hàn','PQR/WPS rõ ràng','In-process audit của QC'],
      ref:'AWS A5.x specifications + ASME IX', sketch:'def_consum' },

    { id:'preheat-fail', cat:'pwht', name:'Quên/sai preheat', severity:'critical',
      symptom:'Nứt H₂ sau 48-72h hoặc HAZ quá cứng > 350 HV',
      causes:['Người hàn quên đo nhiệt độ','Đo bằng nhiệt kế tiếp xúc sai','Crayon nhiệt độ hết hạn','Thiếu thiết bị (gas heater)'],
      remedies:['Đo bằng pen-type IR 50mm từ joint TRƯỚC khi hàn','Crayon Tempil chính xác ±5°C','Heating blanket cho dày > 40mm','HOLD inspection point cho t > 25mm','Training thợ hàn về CE/preheat'],
      ref:'AWS D1.1 §5.6 + EN 1011-2', sketch:'def_preheat' },

    { id:'wrong-sequence', cat:'distort', name:'Sai sequence hàn', severity:'high',
      symptom:'Biến dạng tổng thể quá lớn, không thể chỉnh thẳng sau',
      causes:['Hàn theo thứ tự ngẫu nhiên','Không có sequence drawing','Quá nhiều thợ làm song song không phối hợp','Hàn từ đầu đến cuối theo 1 chiều'],
      remedies:['Welding sequence drawing rõ trước thi công','Hàn xen kẽ 1-3-2-4','Hàn từ giữa ra 2 đầu','Symmetric về 2 phía neutral axis','Pre-camber tính trước'],
      ref:'AWS D1.1 Annex K + AISC Quality Manual', sketch:'def_sequence' }
  ]
};

console.log('LD_DATA loaded:', window.LD_DATA.allowance.length, 'formulas +', window.LD_DATA.defects.length, 'defects');
