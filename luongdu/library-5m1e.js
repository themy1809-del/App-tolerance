/* Thư viện 5M+1E — Phân tích chuyên sâu nguyên nhân gốc cho QC kết cấu thép */
window.LD_LIB = [
  {
    id: 'man',
    icon: '👷',
    color: '#aa4322',
    name: 'MAN — CON NGƯỜI',
    nameEn: 'Man / People',
    short: 'Tay nghề, đào tạo, ý thức, mệt mỏi, áp lực, giao tiếp',
    definition: 'Mọi sai sót có nguyên nhân từ con người: kỹ năng thiếu hụt, kiến thức không đủ, ý thức kém, áp lực thời gian, mệt mỏi, hoặc giao tiếp/bàn giao thông tin sai. Trong kết cấu thép — chiếm 20-30% lỗi.',
    subFactors: [
      {name: 'Kỹ năng (Skill)', desc: 'Thợ hàn không đạt chứng chỉ AWS/ASME IX/ISO 9606 cho vị trí hàn (3G/4G/6G)'},
      {name: 'Kiến thức (Knowledge)', desc: 'Không hiểu WPS, ký hiệu GD&T, code requirements'},
      {name: 'Ý thức (Attitude)', desc: 'Bỏ qua bước kiểm tra, không tuân thủ PPE, chủ quan với QC'},
      {name: 'Thể trạng (Fitness)', desc: 'Mệt mỏi sau 8h, làm overtime, thiếu ngủ, hangover'},
      {name: 'Giao tiếp (Communication)', desc: 'Bàn giao ca không rõ, drawing revision không kịp cập nhật'},
      {name: 'Đào tạo (Training)', desc: 'Chưa có training mới khi đổi WPS, đổi vật liệu, đổi code'}
    ],
    commonFailures: [
      'Quên preheat dù WPS yêu cầu',
      'Hàn sai loại que (lấy nhầm thùng)',
      'Đọc bản vẽ sai chiều camber',
      'Fit-up sai → high-low > 3mm',
      'Khởi động hồ quang trên kim loại cơ bản (arc strike)',
      'Không vệ sinh xỉ giữa các lớp hàn',
      'Đo bằng caliper không calibrate',
      'Bỏ qua kiểm dim trước phun sơn'
    ],
    prevention: [
      {tool: 'Welder Qualification', desc: 'Cấp chứng chỉ AWS QC7 / ASME IX cho từng vị trí 3G/4G/6G + theo dõi hạn 6 tháng', ref: 'AWS QC7 + ASME IX'},
      {tool: 'TWI / OJT', desc: 'On-the-job training 2-4 tuần với mentor + log book đánh giá', ref: 'ISO 9001 §7.2'},
      {tool: 'Visual Aid / OPL', desc: 'One-Point Lesson dán tại trạm: hình + 5 bước + tiêu chí đạt', ref: 'Lean Standard Work'},
      {tool: 'Toolbox Talk', desc: 'Họp 10-15 phút đầu ca: an toàn + QC focus của ngày', ref: 'OSHA / ISO 45001'},
      {tool: 'Skill Matrix', desc: 'Bảng đánh giá L1/L2/L3/L4 mỗi tháng cho từng kỹ năng', ref: 'Lean 6 Sigma'},
      {tool: 'Poka-Yoke', desc: 'Thiết kế dụng cụ "không thể làm sai" — gauge, jig, color-code', ref: 'Shigeo Shingo'}
    ],
    controls: [
      'Hold-point inspection bởi QC sau mỗi công đoạn quan trọng',
      'Random audit 5% mối hàn theo NDE plan',
      'KPI: % rework / số chứng chỉ hết hạn / điểm skill matrix',
      'CCTV tại tổ hàn — random review',
      'Pre-job briefing 5 phút trước ca + sign-off',
      'Daily quality huddle 8h sáng'
    ],
    isoRefs: [
      {code: 'ISO 9606-1', title: 'Qualification testing of welders — Fusion welding'},
      {code: 'AWS QC7', title: 'Standard for AWS Certified Welders'},
      {code: 'ISO 14732', title: 'Welding personnel — Qualification for mechanized/automatic welding'},
      {code: 'ISO 9001 §7.2', title: 'Competence requirements'},
      {code: 'AWS B5.1', title: 'Welding Inspector qualification (CWI)'}
    ],
    kpis: [
      'Welder Qualification Rate ≥ 95% (đạt first attempt)',
      'Rework rate < 3% theo từng thợ',
      'Repeat defect ratio < 5% (cùng thợ + cùng defect)',
      'Training hours / quarter ≥ 8h per welder'
    ]
  },

  {
    id: 'machine',
    icon: '⚙️',
    color: '#5f4ab7',
    name: 'MACHINE — MÁY MÓC & THIẾT BỊ',
    nameEn: 'Machine / Equipment',
    short: 'Máy hàn, CNC, jig, gauge, compressor, crane, calibration, bảo trì',
    definition: 'Mọi sai sót do thiết bị: máy chưa calibrate, hết hạn bảo trì, tool wear, jig lệch, hoặc thiết bị không phù hợp công việc. Chiếm 10-20% lỗi.',
    subFactors: [
      {name: 'Welding Equipment', desc: 'Máy hàn không ổn định I/V, ground cable kém, output drift'},
      {name: 'CNC / Cutting', desc: 'Plasma/oxy cutter lệch trục, mép cắt nhám > Rz spec'},
      {name: 'Jig / Fixture', desc: 'Jig bị mài mòn, không vuông, không đảm bảo repeatable'},
      {name: 'Measurement Tools', desc: 'Caliper, micrometer, level, theodolite hết hạn calibration'},
      {name: 'Air System', desc: 'Compressor không có oil/water trap → fish-eye sơn'},
      {name: 'Material Handling', desc: 'Crane không cân, sling cũ, không spreader bar gây sweep'},
      {name: 'Heat Treatment Oven', desc: 'PWHT oven thermocouple sai, heating rate không kiểm soát'}
    ],
    commonFailures: [
      'Máy hàn output drift → I không ổn → undercut/spatter',
      'CNC plasma sai trục → mép cắt taper',
      'Caliper 0.02 dùng cho dung sai 0.05 (resolution không đủ)',
      'Compressor không trap → fish-eye trong sơn',
      'Cẩu 1 điểm dầm 15m → sweep + twist',
      'PWHT oven nhiệt độ không đều → reheat crack',
      'Jig fillet weld bị mài mòn → throat thiếu',
      'Drill jig dùng quá lâu → lỗ to + lệch'
    ],
    prevention: [
      {tool: 'TPM (Total Productive Maintenance)', desc: 'Daily/weekly/monthly maintenance check theo schedule', ref: 'JIPM'},
      {tool: 'Calibration Program', desc: 'Mọi dụng cụ đo có cal-cert hạn ≤ 1 năm, dán nhãn ngày cal', ref: 'ISO 17025'},
      {tool: 'Preventive Maintenance', desc: 'Lịch PM theo manufacturer + log book ghi mỗi lần', ref: 'ISO 9001 §7.1.5'},
      {tool: 'OEE Tracking', desc: 'Đo Overall Equipment Effectiveness cho máy quan trọng', ref: 'Lean'},
      {tool: 'Tool Life Management', desc: 'Đánh dấu drill bit, fillet jig, cutting tip → thay theo cycles', ref: 'TPM Pillar'},
      {tool: 'Daily Pre-Operation Check', desc: 'Welder kiểm máy 5 phút đầu ca theo checklist', ref: 'ISO 3834'}
    ],
    controls: [
      'Calibration sticker — màu xanh còn hạn / đỏ hết hạn → cấm dùng',
      'PM schedule trên Gantt chart hiển thị tại xưởng',
      'Random verification: QC kiểm 1 máy/tuần xem cal có còn đúng',
      'Failure log + MTBF trend cho từng máy',
      'Equipment register: mã, ngày mua, manufacturer, calibration interval',
      'Audit ISO 9001 hàng năm bao gồm toàn bộ measurement equipment'
    ],
    isoRefs: [
      {code: 'ISO 17025', title: 'Calibration laboratory requirements'},
      {code: 'ISO 9001 §7.1.5', title: 'Monitoring & measuring resources'},
      {code: 'ISO 3834-2', title: 'Quality requirements for fusion welding — equipment'},
      {code: 'ASME B89.1.9', title: 'Gage Blocks calibration'},
      {code: 'JIS B 7503', title: 'Dial indicators calibration'}
    ],
    kpis: [
      'Calibration on-time rate ≥ 98%',
      'OEE (Overall Equipment Effectiveness) > 75%',
      'MTBF (Mean Time Between Failures) trending up',
      'Equipment-caused defect rate < 5%'
    ]
  },

  {
    id: 'material',
    icon: '📦',
    color: '#854f0b',
    name: 'MATERIAL — VẬT LIỆU',
    nameEn: 'Material',
    short: 'Thép, que/dây hàn, gas, sơn, bulông, gasket — chất lượng, MTC, FIFO, sấy',
    definition: 'Mọi sai sót do nguyên vật liệu: sai grade, hết hạn, ẩm, không có MTC, sai lot, hoặc bị nhiễm bẩn trong lưu kho. Chiếm 10-15% lỗi.',
    subFactors: [
      {name: 'Base Metal (Thép tấm/hình)', desc: 'Sai grade (S355 ↔ S275), không Z-quality, MTC giả'},
      {name: 'Welding Consumable', desc: 'Que ẩm, dây hết hạn, gas mix sai (Ar/CO2 ratio), flux ẩm'},
      {name: 'Bolt & Fastener', desc: 'Cấp 8.8/10.9 không đúng, mạ kẽm thiếu, nut không có washer phẳng'},
      {name: 'Coating Material', desc: 'Sơn hết hạn, primer/topcoat khác hệ, thinner sai loại'},
      {name: 'Gas (Shielding)', desc: 'Argon thay vì Ar/CO2, áp suất sai, cylinder cũ có ẩm'},
      {name: 'Consumable Storage', desc: 'Tủ sấy không đủ nhiệt, kho ẩm > 70%, không có FIFO'}
    ],
    commonFailures: [
      'Cấp thép sai → cường độ không đạt cho thiết kế',
      'Que SMAW ẩm → porosity + nứt H₂',
      'Tấm dày không có Z-quality → lamellar tearing',
      'Sơn hết hạn → adhesion fail, chalking nhanh',
      'Bulông 8.8 lẫn vào 10.9 → không đạt preload',
      'Gas chỉ Argon (không CO2) cho carbon steel → arc bị nhảy',
      'Không sandblast sạch mill scale → porosity + LOF',
      'Thiếu MTC khi audit khách hàng'
    ],
    prevention: [
      {tool: 'Mill Test Certificate (MTC)', desc: 'Mọi heat/lot phải có EN 10204 3.1 hoặc 3.2', ref: 'EN 10204'},
      {tool: 'Incoming Inspection (IMI)', desc: 'Kiểm vật liệu trước nhập kho theo checklist từng category', ref: 'ISO 9001 §8.4'},
      {tool: 'FIFO (First In First Out)', desc: 'Tem ngày nhập + xuất kho theo thứ tự cũ trước', ref: 'Lean Inventory'},
      {tool: 'Consumable Drying', desc: 'Sấy SMAW low-H 350°C/2h + lưu trong tủ giữ nóng 150°C', ref: 'AWS A5.1'},
      {tool: 'Heat Number Traceability', desc: 'Mã heat khắc/sơn trên mỗi cấu kiện → trace ngược tới MTC', ref: 'EN 1090-2'},
      {tool: 'Approved Vendor List', desc: 'Chỉ mua từ vendor đã audit + sample test', ref: 'ISO 9001 §8.4'},
      {tool: 'Material Segregation', desc: 'Khu kho riêng cho từng grade, màu code khác nhau', ref: '5S + ISO 9001'}
    ],
    controls: [
      'Receiving inspection report cho mỗi lô nhập',
      'PMI (Positive Material Identification) — XRF spectrometer cho thép quan trọng',
      'Random retest 1 mẫu/heat (CVN, tensile) tại lab độc lập',
      'Stamp/tag heat number lên cấu kiện cuối — không bao giờ tách ra',
      'Audit kho hàng tháng — check FIFO + nhiệt độ + RH',
      'Reject log cho material không đạt + tỷ lệ reject theo vendor'
    ],
    isoRefs: [
      {code: 'EN 10204', title: 'Inspection documents — types of inspection certs'},
      {code: 'EN 10164', title: 'Steel with improved Z-direction properties'},
      {code: 'EN 10025', title: 'Hot-rolled products of structural steels'},
      {code: 'AWS A5.x', title: 'Specifications for welding consumables'},
      {code: 'ASTM E1417', title: 'Liquid Penetrant testing'},
      {code: 'ISO 9001 §8.4', title: 'Control of externally provided processes/products'}
    ],
    kpis: [
      'Vendor on-time delivery ≥ 95%',
      'Material non-conformance < 2% nhập kho',
      'Heat traceability 100% cho cấu kiện chính',
      'MTC compliance 100% (không có nhập kho nếu thiếu MTC)'
    ]
  },

  {
    id: 'method',
    icon: '📋',
    color: '#0c447c',
    name: 'METHOD — PHƯƠNG PHÁP & QUY TRÌNH',
    nameEn: 'Method / Process',
    short: 'WPS, PQR, drawing, sequence, surface prep, NDE plan, ITP, work instruction',
    definition: 'Mọi sai sót do quy trình: WPS không đầy đủ, sequence sai, thiếu surface prep, NDE plan thiếu hold-point, ITP không rõ. ĐÂY LÀ NGUYÊN NHÂN LỚN NHẤT — chiếm 30-40% lỗi trong xưởng kết cấu thép.',
    subFactors: [
      {name: 'Welding Procedure (WPS)', desc: 'WPS không đầy đủ Amp/Volt/Travel, không qualified PQR'},
      {name: 'Sequence Drawing', desc: 'Không có thứ tự hàn → distortion + residual stress'},
      {name: 'Fit-up Procedure', desc: 'Không tiêu chuẩn root gap, không tack weld guideline'},
      {name: 'Surface Preparation', desc: 'Thiếu Sa 2.5, không đo profile Rz, không cleanup'},
      {name: 'NDE Plan', desc: 'Không có ITP, thiếu hold-point, sampling rate sai'},
      {name: 'Heat Treatment', desc: 'PWHT cycle sai, heating rate quá nhanh, holding sai'},
      {name: 'Drawing Control', desc: 'Revision không cập nhật, BOM không khớp drawing'},
      {name: 'Erection Sequence', desc: 'Không có erection drawing, thứ tự lắp sai'}
    ],
    commonFailures: [
      'WPS thiếu preheat → nứt H₂ cấu kiện dày',
      'Không sequence → méo I-section',
      'Surface prep chỉ wire-brush thay Sa 2.5 → sơn bong',
      'NDE plan không có hold-point root pass → defect lan các lớp',
      'PWHT heating quá nhanh > 200°C/h → reheat crack',
      'Drawing Rev A đã thay bằng Rev B nhưng xưởng dùng Rev A',
      'BOM thiếu strong-back → distortion',
      'Erection không có temporary bracing → cột nghiêng'
    ],
    prevention: [
      {tool: 'WPS + PQR', desc: 'Mọi mối hàn phải có WPS qualified bởi PQR theo ASME IX/ISO 15614', ref: 'ISO 15614'},
      {tool: 'ITP (Inspection Test Plan)', desc: 'Plan ghi rõ inspection mỗi công đoạn, hold-point, witness-point', ref: 'ISO 9001 §8.6'},
      {tool: 'Method Statement', desc: 'Mô tả phương pháp thi công + tools + safety + QC', ref: 'EN 1090-2'},
      {tool: 'Document Control', desc: 'Mọi drawing/spec phải có Rev, sign-off, distribution list', ref: 'ISO 9001 §7.5'},
      {tool: 'Sequence Drawing', desc: 'Numbered welding sequence với arrows + balance check', ref: 'AWS D1.1 Annex K'},
      {tool: 'Setup Sheet / Work Instruction', desc: 'Tại mỗi trạm có 1-page WI với hình + step + parameters', ref: 'Lean Standard Work'},
      {tool: 'Procedure Audit', desc: 'Audit định kỳ tuân thủ WPS thực tế vs WPS document', ref: 'ISO 9001 §9.2'}
    ],
    controls: [
      'Sign-off hold-point trước khi chuyển công đoạn',
      'WPS check daily tại trạm: thợ có WPS in tay không?',
      'Drawing register: hiển thị rev hiện hành tại workshop entrance',
      'Process audit 1 lần/tuần — kiểm WPS adherence',
      'NCR (Non-conformance Report) cho mọi deviation',
      'Management Review hàng tháng nhìn lại NCR theo cause category'
    ],
    isoRefs: [
      {code: 'ISO 15614', title: 'Welding Procedure Qualification (WPQR)'},
      {code: 'ISO 15609', title: 'WPS specification'},
      {code: 'ASME IX', title: 'Welding & brazing qualifications (US)'},
      {code: 'ISO 3834-2', title: 'Comprehensive quality requirements for welding'},
      {code: 'EN 1090-2', title: 'Execution of steel structures'},
      {code: 'AWS D1.1', title: 'Structural Welding Code — Steel'},
      {code: 'ISO 9001 §8.5', title: 'Production & service provision'}
    ],
    kpis: [
      'WPS coverage 100% cho mọi joint type',
      'Procedure adherence > 95% (audit findings)',
      'Drawing accuracy: 0 RFI do drawing sai',
      'NCR trend giảm theo quý',
      'Hold-point compliance 100% (no skip)'
    ]
  },

  {
    id: 'measurement',
    icon: '📏',
    color: '#0f6e56',
    name: 'MEASUREMENT — ĐO LƯỜNG & KIỂM TRA',
    nameEn: 'Measurement / Inspection',
    short: 'Calibration, MSA, gauge R&R, NDE, traceability đo, statistical analysis',
    definition: 'Mọi sai sót do hệ thống đo: dụng cụ chưa calibrate, đo sai cách, gauge R&R kém, NDE thiếu sensitivity, sai thước tham chiếu. Quan trọng nhất với precision parts.',
    subFactors: [
      {name: 'Gauge Calibration', desc: 'Caliper, micrometer, level, theta, gauge block hết hạn cal'},
      {name: 'Measurement Method', desc: 'Đo sai vị trí (vd: chiều cao H đo không tại neutral axis)'},
      {name: 'Operator Influence', desc: '2 người đo khác kết quả — bias / reproducibility kém'},
      {name: 'NDE Sensitivity', desc: 'UT probe không match, RT film grade D, PT thiếu thời gian dwell'},
      {name: 'Reference Standards', desc: 'Block calibration không trace đến NIST'},
      {name: 'Environmental Drift', desc: 'Caliper giãn nở khi đo lúc 35°C ngoài trời (chuẩn 20°C)'}
    ],
    commonFailures: [
      'Đo dim lỗ H7 bằng caliper 0.05 → không đủ resolution',
      'Đo plumb cột không có theodolite — chỉ ước lượng mắt',
      'UT phát hiện rỗ nhưng không calibrate trên block IIW',
      'DFT đo 5 điểm/m² thay 5 điểm/spot (ISO 19840)',
      '2 QC đo same camber khác 5mm — gauge R&R fail',
      'PT thiếu 10 phút dwell time → bỏ sót nứt mảnh',
      'Đo nhiệt độ preheat bằng tay → 50°C nói thành 100°C',
      'Caliper digital pin yếu → reading drift 0.1mm'
    ],
    prevention: [
      {tool: 'Calibration Program', desc: 'Mọi gauge có cal-cert hạn ≤ 1 năm, NIST traceable', ref: 'ISO 17025'},
      {tool: 'MSA (Measurement System Analysis)', desc: 'Gage R&R study mỗi 6 tháng cho gauge quan trọng', ref: 'AIAG MSA'},
      {tool: 'NDE Procedure Qualification', desc: 'Mỗi NDE method có procedure qualified + Level II/III inspector', ref: 'SNT-TC-1A'},
      {tool: 'Reference Block', desc: 'Block calibration cho UT (IIW, V1, V2) + RT (IQI penetrameter)', ref: 'ISO 2400 + ASTM E747'},
      {tool: 'Temperature Compensation', desc: 'Đo ở 20°C ±2°C hoặc compensate cho thép α=12 µm/m/°C', ref: 'ISO 1'},
      {tool: 'Visual Standards', desc: 'AWS VWAC visual gauge + ISO 5817 reference defect samples', ref: 'AWS QC1'}
    ],
    controls: [
      'Calibration sticker — không dùng nếu hết hạn',
      'Daily verification: gauge zero check trước ca',
      'Gage R&R study cho critical dim với 10 parts × 3 operators × 2 trials',
      'NDE inspector qualification SNT-TC-1A Level II minimum',
      'Standard Operating Procedure (SOP) cho mỗi loại đo',
      'Cross-check: 2 inspector độc lập đo same critical dim'
    ],
    isoRefs: [
      {code: 'ISO 17025', title: 'Testing & calibration laboratories'},
      {code: 'AIAG MSA', title: 'Measurement Systems Analysis (Gage R&R)'},
      {code: 'SNT-TC-1A', title: 'Personnel qualification & certification in NDT'},
      {code: 'ISO 9712', title: 'NDT — Qualification & certification of NDT personnel'},
      {code: 'ISO 19840', title: 'DFT measurement on rough surfaces'},
      {code: 'AWS QC1', title: 'Standard for AWS Certification of Welding Inspectors'}
    ],
    kpis: [
      'Gauge calibration on-time rate ≥ 98%',
      'Gage R&R %GR&R < 10% (acceptable) / < 30% (marginal)',
      'NDE inspector qualification 100% current',
      'False reject rate (Type I) < 5% / False accept (Type II) < 1%'
    ]
  },

  {
    id: 'env',
    icon: '🌦️',
    color: '#3b6d11',
    name: 'ENVIRONMENT — MÔI TRƯỜNG',
    nameEn: 'Environment / Mother Nature',
    short: 'Nhiệt độ, độ ẩm, gió, bụi, ánh sáng, không gian làm việc, an toàn',
    definition: 'Mọi sai sót do điều kiện môi trường: nhiệt độ ngoài spec, độ ẩm cao gây ẩm que, gió thổi tan gas, bụi vào sơn, ánh sáng kém gây miss visual defect. Ảnh hưởng lớn cho sơn + hàn outdoor.',
    subFactors: [
      {name: 'Nhiệt độ ambient', desc: 'Thép < 5°C khó hàn (cần preheat) · sơn < 10°C khó cure'},
      {name: 'Độ ẩm RH', desc: 'RH > 85% → ẩm que/dây + flash rust sau sandblast'},
      {name: 'Dew Point', desc: 'T_surface ≤ T_dew → nước đọng → blistering sơn'},
      {name: 'Gió (Wind)', desc: 'Gió > 3 m/s → thổi tan shielding gas → porosity'},
      {name: 'Bụi (Dust)', desc: 'Bụi vào sơn ướt → dirty inclusion · bụi vào root pass → porosity'},
      {name: 'Ánh sáng (Lighting)', desc: 'Workshop < 500 lux khó visual inspect mối hàn'},
      {name: 'Không gian (Workspace)', desc: 'Chật chội khó access hàn 4G/6G + khó NDE'},
      {name: 'Tiếng ồn (Noise)', desc: '> 85 dBA gây nhầm lệnh + mệt mỏi sớm'}
    ],
    commonFailures: [
      'Sơn lúc sáng sớm sương → blistering trong 1 tháng',
      'Hàn outdoor không che gió → porosity tăng 3-5×',
      'Sandblast xong để qua đêm → flash rust → sơn không bám',
      'PWHT outdoor lúc mưa → cooling rate quá nhanh',
      'Workshop tối phía góc → miss undercut khi visual',
      'Hàn trong tank kín không thông gió → fume + thiếu O₂',
      'Mùa hè 38°C đo dim bằng thước thép → giãn 0.5mm/m'
    ],
    prevention: [
      {tool: 'Climate Control', desc: 'Workshop có HVAC giữ 20-25°C / RH < 70%', ref: 'ISO 12944-7'},
      {tool: 'Weather Station', desc: 'Psychrometer + nhiệt kế + anemometer tại site đo trước mỗi ca', ref: 'ISO 8502-4'},
      {tool: 'Wind Shielding', desc: 'Lều che hoặc tarp khi hàn outdoor + gió > 3 m/s', ref: 'AWS D1.1 §5.13'},
      {tool: 'Dust Control', desc: 'Booth sơn HEPA filter + áo coverall sạch + nền ẩm', ref: 'ISO 12944'},
      {tool: 'Lighting Standard', desc: 'Workshop ≥ 500 lux / Inspection area ≥ 1000 lux / 5500K daylight', ref: 'EN 12464-1'},
      {tool: '5S + Workspace Layout', desc: 'Sắp xếp hợp lý cho thao tác + dụng cụ trong tầm tay 30cm', ref: '5S + Ergonomics'},
      {tool: 'Safety + Ventilation', desc: 'Confined space permit + LEV ≥ 0.5 m/s gần hàn', ref: 'OSHA + ISO 45001'}
    ],
    controls: [
      'Daily climate log: T, RH, dew point, wind tại site',
      'Stop work khi RH > 85% hoặc T_surface ≤ T_dew + 3°C cho sơn',
      'Wind speed log khi hàn outdoor; stop nếu > 3 m/s (FCAW) hoặc 5 m/s (SMAW có flux)',
      'Lux meter check tại inspection station hàng quý',
      'Air quality monitor trong xưởng hàn (CO, NO2, O3)',
      'Heat stress check khi T > 33°C — schedule work/rest cycle'
    ],
    isoRefs: [
      {code: 'ISO 8502-4', title: 'Conditions for application of paints (dew point)'},
      {code: 'ISO 12944-7', title: 'Painting — Execution and supervision'},
      {code: 'EN 12464-1', title: 'Lighting of indoor work places'},
      {code: 'ISO 45001', title: 'Occupational health & safety management'},
      {code: 'AWS D1.1 §5.13', title: 'Environmental conditions for welding'},
      {code: 'OSHA 29 CFR 1910', title: 'Occupational safety & health standards'}
    ],
    kpis: [
      'Stop-work due to env < 5% of planned time',
      'Painting reject due to env < 2%',
      'Heat stress incidents = 0',
      'Lux compliance ≥ 95% measurement points'
    ]
  }
];

console.log('LD_LIB loaded:', window.LD_LIB.length, '5M+1E categories');
