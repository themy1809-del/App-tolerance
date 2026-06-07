/* Sketches cho app Lượng dư + Sai hỏng */
window.LD_SK = {};
(function(){
  var S = window.LD_SK;

  /* ===== ALLOWANCE SKETCHES ===== */
  S.shrink_trans = function(){ return '<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#0c447c" font-weight="800">CO RÚT NGANG SAU HÀN</text>'
    + '<rect x="60" y="60" width="180" height="40" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="260" y="60" width="180" height="40" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<line x1="240" y1="60" x2="240" y2="100" stroke="#0c447c" stroke-dasharray="3,2"/>'
    + '<line x1="260" y1="60" x2="260" y2="100" stroke="#0c447c" stroke-dasharray="3,2"/>'
    + '<text x="250" y="55" text-anchor="middle" font-size="10" fill="#0c447c">trước hàn</text>'
    + '<text x="250" y="115" text-anchor="middle" font-size="11" fill="#1b2430" font-weight="700">khoảng cách lý thuyết</text>'
    + '<rect x="60" y="170" width="175" height="40" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="265" y="170" width="175" height="40" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="235" y="170" width="30" height="40" fill="#cea24a"/>'
    + '<line x1="235" y1="155" x2="235" y2="220" stroke="#aa4322" stroke-dasharray="3,2"/>'
    + '<line x1="265" y1="155" x2="265" y2="220" stroke="#aa4322" stroke-dasharray="3,2"/>'
    + '<text x="250" y="150" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="800">SAU HÀN — co lại S_t</text>'
    + '<line x1="170" y1="225" x2="240" y2="225" stroke="#aa4322" stroke-width="2" marker-end="url(#arr)"/>'
    + '<line x1="330" y1="225" x2="260" y2="225" stroke="#aa4322" stroke-width="2" marker-end="url(#arr)"/>'
    + '<defs><marker id="arr" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8" fill="#aa4322"/></marker></defs>'
    + '<text x="250" y="250" text-anchor="middle" font-size="11" fill="#3b6d11" font-weight="700">📐 Cộng S_t vào blank để bù co rút</text>'
    + '</svg>'; };

  S.shrink_long = function(){ return '<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#0c447c" font-weight="800">CO RÚT DỌC — dầm I tổ hợp</text>'
    + '<rect x="50" y="60" width="400" height="15" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="50" y="125" width="400" height="15" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="240" y="75" width="20" height="50" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="50" y="73" width="400" height="3" fill="#cea24a"/>'
    + '<rect x="50" y="124" width="400" height="3" fill="#cea24a"/>'
    + '<text x="250" y="40" text-anchor="middle" font-size="10" fill="#5f6b7a">trước hàn L</text>'
    + '<line x1="50" y1="170" x2="50" y2="190" stroke="#0c447c"/>'
    + '<line x1="450" y1="170" x2="450" y2="190" stroke="#0c447c"/>'
    + '<line x1="50" y1="180" x2="450" y2="180" stroke="#0c447c" marker-end="url(#arrL)" marker-start="url(#arrLs)"/>'
    + '<text x="250" y="195" text-anchor="middle" font-size="12" fill="#0c447c" font-weight="800">L</text>'
    + '<rect x="55" y="220" width="390" height="15" fill="#cdd6df" stroke="#aa4322" stroke-width="1.5"/>'
    + '<text x="250" y="245" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="700">SAU HÀN: L - S_l (co dọc theo trục)</text>'
    + '<text x="250" y="265" text-anchor="middle" font-size="10" fill="#3b6d11">📐 S_l ≈ 0.0002L đơn / 0.0005L đôi cánh</text>'
    + '<defs><marker id="arrL" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8" fill="#0c447c"/></marker>'
    + '<marker id="arrLs" markerWidth="10" markerHeight="8" refX="0" refY="4" orient="auto"><path d="M10,0 L0,4 L10,8" fill="#0c447c"/></marker></defs>'
    + '</svg>'; };

  S.thermal = function(){ return '<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#0c447c" font-weight="800">GIÃN NỞ NHIỆT — α × ΔT × L</text>'
    + '<rect x="50" y="60" width="350" height="30" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<text x="225" y="80" text-anchor="middle" font-size="11" fill="#1b2430">20°C — chiều dài L</text>'
    + '<rect x="50" y="120" width="370" height="30" fill="#fcd5b5" stroke="#aa4322"/>'
    + '<text x="235" y="140" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="700">50°C — L + ΔL</text>'
    + '<line x1="400" y1="60" x2="400" y2="170" stroke="#aa4322" stroke-dasharray="3,2"/>'
    + '<line x1="420" y1="120" x2="420" y2="170" stroke="#aa4322" stroke-dasharray="3,2"/>'
    + '<line x1="400" y1="170" x2="420" y2="170" stroke="#aa4322" stroke-width="2" marker-start="url(#arrTs)" marker-end="url(#arrT)"/>'
    + '<text x="410" y="190" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">ΔL</text>'
    + '<text x="250" y="220" text-anchor="middle" font-size="11" fill="#3b6d11" font-weight="700">📐 Thép: α = 12 µm/m/°C — Δ tăng 30°C trên 10m = 3.6mm</text>'
    + '<text x="250" y="245" text-anchor="middle" font-size="10" fill="#5f6b7a">Quan trọng khi lắp ráp mùa khô (35°C) vs đêm lắp ráp (10°C)</text>'
    + '<defs><marker id="arrT" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8" fill="#aa4322"/></marker>'
    + '<marker id="arrTs" markerWidth="10" markerHeight="8" refX="0" refY="4" orient="auto"><path d="M10,0 L0,4 L10,8" fill="#aa4322"/></marker></defs>'
    + '</svg>'; };

  S.machining = function(){ return '<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#0c447c" font-weight="800">LƯỢNG DƯ GIA CÔNG</text>'
    + '<rect x="100" y="80" width="300" height="100" fill="#888780" stroke="#1b2430"/>'
    + '<rect x="115" y="95" width="270" height="70" fill="#cdd6df" stroke="#0c447c" stroke-width="2"/>'
    + '<text x="250" y="135" text-anchor="middle" font-size="12" fill="#0c447c" font-weight="800">KÍCH THƯỚC THIẾT KẾ</text>'
    + '<g stroke="#aa4322" stroke-width="2" stroke-dasharray="4,3">'
    + '<line x1="100" y1="95" x2="115" y2="95"/><line x1="385" y1="95" x2="400" y2="95"/>'
    + '<line x1="100" y1="165" x2="115" y2="165"/><line x1="385" y1="165" x2="400" y2="165"/>'
    + '</g>'
    + '<text x="60" y="100" font-size="10" fill="#aa4322" font-weight="700">m_face</text>'
    + '<text x="60" y="170" font-size="10" fill="#aa4322" font-weight="700">m_face</text>'
    + '<text x="250" y="60" text-anchor="middle" font-size="11" fill="#5f6b7a">BLANK THÔ (cắt CNC)</text>'
    + '<text x="250" y="205" text-anchor="middle" font-size="11" fill="#3b6d11" font-weight="700">📐 Mỗi mặt phay/tiện: 2-3mm · Mỗi mặt mài: 0.5-1mm</text>'
    + '<text x="250" y="230" text-anchor="middle" font-size="10" fill="#0c447c">Cộng vào kích thước cắt thô để đạt design size sau machining</text>'
    + '</svg>'; };

  S.bend = function(){ return '<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#0c447c" font-weight="800">LƯỢNG DƯ GẬP TÔN — BEND ALLOWANCE</text>'
    + '<g transform="translate(150,60)">'
    + '<path d="M 0 0 L 0 100 Q 0 130 30 130 L 100 130" stroke="#888780" stroke-width="20" fill="none" stroke-linejoin="round"/>'
    + '<path d="M 8 0 L 8 100 Q 8 122 30 122 L 100 122" stroke="#aa4322" stroke-width="1.5" stroke-dasharray="3,2" fill="none"/>'
    + '<circle cx="30" cy="100" r="3" fill="#0c447c"/>'
    + '<text x="40" y="100" font-size="11" fill="#0c447c" font-weight="700">R (trong)</text>'
    + '<text x="-10" y="-10" font-size="11" fill="#0c447c">L1</text>'
    + '<text x="105" y="135" font-size="11" fill="#0c447c">L2</text>'
    + '<path d="M 8 105 A 16 16 0 0 1 25 122" stroke="#aa4322" fill="none" stroke-width="2"/>'
    + '<text x="32" y="118" font-size="10" fill="#aa4322" font-weight="700">θ</text>'
    + '</g>'
    + '<text x="250" y="235" text-anchor="middle" font-size="12" fill="#3b6d11" font-weight="800">BA = (π/180) × θ × (R + K × t)</text>'
    + '<text x="250" y="252" text-anchor="middle" font-size="10" fill="#5f6b7a">K = 0.33 thép mềm · 0.40 trung bình · 0.50 cứng</text>'
    + '</svg>'; };

  S.springback = function(){ return '<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#0c447c" font-weight="800">SPRING-BACK — gập quá để đạt góc</text>'
    + '<g transform="translate(120,60)">'
    + '<text x="60" y="-5" text-anchor="middle" font-size="11" fill="#0c447c">đang gập</text>'
    + '<path d="M 0 80 L 50 80 L 50 30" stroke="#aa4322" stroke-width="3" fill="none"/>'
    + '<path d="M 25 80 A 25 25 0 0 0 50 55" stroke="#aa4322" stroke-width="1.5" stroke-dasharray="2,2" fill="none"/>'
    + '<text x="30" y="55" font-size="10" fill="#aa4322" font-weight="700">θ_gập = 95°</text>'
    + '</g>'
    + '<g transform="translate(300,60)">'
    + '<text x="60" y="-5" text-anchor="middle" font-size="11" fill="#0f6e56">sau khi nhả lực</text>'
    + '<path d="M 0 80 L 50 80 L 53 33" stroke="#0f6e56" stroke-width="3" fill="none"/>'
    + '<text x="30" y="55" font-size="10" fill="#0f6e56" font-weight="700">θ_thật = 90°</text>'
    + '<path d="M 53 33 L 50 30" stroke="#aa4322" stroke-dasharray="2,1"/>'
    + '<text x="65" y="35" font-size="9" fill="#aa4322">Δθ ≈ 5°</text>'
    + '</g>'
    + '<text x="250" y="200" text-anchor="middle" font-size="12" fill="#3b6d11" font-weight="800">Phải gập THÊM 3-8° để bù spring-back</text>'
    + '<text x="250" y="222" text-anchor="middle" font-size="10" fill="#5f6b7a">θ_over phụ thuộc R, σ_y, t · Thép cường độ cao spring-back lớn hơn</text>'
    + '<text x="250" y="245" text-anchor="middle" font-size="10" fill="#0c447c">📐 Thử 1 mẫu trước → đo angle → điều chỉnh chương trình gập</text>'
    + '</svg>'; };

  S.kerf = function(){ return '<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#0c447c" font-weight="800">KERF — bề rộng cắt mất</text>'
    + '<rect x="50" y="80" width="180" height="60" fill="#888780" stroke="#1b2430"/>'
    + '<rect x="270" y="80" width="180" height="60" fill="#888780" stroke="#1b2430"/>'
    + '<rect x="230" y="80" width="40" height="60" fill="#aa4322" opacity="0.4"/>'
    + '<rect x="230" y="80" width="40" height="60" fill="none" stroke="#aa4322" stroke-dasharray="4,2"/>'
    + '<text x="250" y="73" text-anchor="middle" font-size="10" fill="#aa4322" font-weight="700">w_kerf</text>'
    + '<line x1="230" y1="155" x2="270" y2="155" stroke="#aa4322" stroke-width="2" marker-start="url(#kk1)" marker-end="url(#kk2)"/>'
    + '<text x="250" y="170" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="800">k</text>'
    + '<g font-size="11" fill="#1b2430">'
    + '<text x="60" y="200" font-weight="700">⚡ Plasma:</text><text x="160" y="200">1.5 - 3 mm</text>'
    + '<text x="60" y="220" font-weight="700">🔥 Oxy-flame:</text><text x="160" y="220">3 - 5 mm</text>'
    + '<text x="60" y="240" font-weight="700">💎 Laser:</text><text x="160" y="240">0.2 - 0.5 mm</text>'
    + '<text x="60" y="260" font-weight="700">🔨 Cưa lưỡi:</text><text x="160" y="260">4 - 6 mm</text>'
    + '</g>'
    + '<defs><marker id="kk1" markerWidth="10" markerHeight="8" refX="0" refY="4" orient="auto"><path d="M10,0 L0,4 L10,8" fill="#aa4322"/></marker>'
    + '<marker id="kk2" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8" fill="#aa4322"/></marker></defs>'
    + '</svg>'; };

  S.bevel = function(){ return '<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#0c447c" font-weight="800">VÁT MÉP V-BUTT — chuẩn bị groove</text>'
    + '<polygon points="50,60 245,60 220,180 50,180" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<polygon points="255,60 450,60 450,180 280,180" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<line x1="245" y1="60" x2="220" y2="180" stroke="#aa4322" stroke-width="2"/>'
    + '<line x1="255" y1="60" x2="280" y2="180" stroke="#aa4322" stroke-width="2"/>'
    + '<rect x="220" y="170" width="60" height="10" fill="#888780" stroke="#aa4322" stroke-width="1.5"/>'
    + '<text x="250" y="50" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="700">α (60-70°)</text>'
    + '<text x="250" y="195" text-anchor="middle" font-size="10" fill="#aa4322" font-weight="700">root face (1-2mm)</text>'
    + '<line x1="245" y1="180" x2="255" y2="180" stroke="#0c447c" stroke-width="3"/>'
    + '<text x="280" y="178" font-size="10" fill="#0c447c">khe (2-4mm)</text>'
    + '<line x1="40" y1="60" x2="40" y2="180" stroke="#0c447c" stroke-width="1" marker-start="url(#bb1)" marker-end="url(#bb2)"/>'
    + '<text x="32" y="125" text-anchor="end" font-size="11" fill="#0c447c" font-weight="800">t</text>'
    + '<text x="250" y="235" text-anchor="middle" font-size="11" fill="#3b6d11" font-weight="800">📐 Lượng dư = diện tích groove cần đắp bằng kim loại hàn</text>'
    + '<text x="250" y="255" text-anchor="middle" font-size="10" fill="#5f6b7a">ISO 9692-1 — phụ thuộc phương pháp + t</text>'
    + '<defs><marker id="bb1" markerWidth="10" markerHeight="8" refX="0" refY="4" orient="auto"><path d="M10,0 L0,4 L10,8" fill="#0c447c"/></marker>'
    + '<marker id="bb2" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8" fill="#0c447c"/></marker></defs>'
    + '</svg>'; };

  /* ===== DEFECT SKETCHES ===== */
  S.def_undercut = function(){ return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
    + '<rect x="50" y="100" width="400" height="60" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<path d="M 200 100 Q 250 70 300 100 L 300 130 L 200 130 Z" fill="#cea24a" stroke="#7c4a00"/>'
    + '<path d="M 190 100 Q 195 110 205 100" stroke="#aa4322" stroke-width="2.5" fill="none"/>'
    + '<path d="M 295 100 Q 305 110 310 100" stroke="#aa4322" stroke-width="2.5" fill="none"/>'
    + '<circle cx="200" cy="105" r="14" fill="none" stroke="#aa4322" stroke-width="2"/>'
    + '<text x="200" y="180" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">CHÁY CHÂN — rãnh khuyết tại chân hàn</text>'
    + '<text x="200" y="205" text-anchor="middle" font-size="10" fill="#5f6b7a">Đo bằng undercut gauge · ISO 5817: B ≤ 0.5mm · C ≤ 1mm</text>'
    + '</svg>'; };

  S.def_porosity = function(){ return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
    + '<rect x="50" y="80" width="400" height="80" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="50" y="105" width="400" height="30" fill="#cea24a" stroke="#7c4a00"/>'
    + '<g fill="#1b2430">'
    + '<circle cx="100" cy="115" r="3"/><circle cx="140" cy="120" r="4"/>'
    + '<circle cx="180" cy="118" r="2.5"/><circle cx="225" cy="122" r="5"/>'
    + '<circle cx="270" cy="115" r="3.5"/><circle cx="315" cy="120" r="2.5"/>'
    + '<circle cx="360" cy="118" r="4"/><circle cx="400" cy="122" r="3"/>'
    + '</g>'
    + '<text x="250" y="180" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">RỖ KHÍ — lỗ tròn trong mối hàn</text>'
    + '<text x="250" y="205" text-anchor="middle" font-size="10" fill="#5f6b7a">Phát hiện qua RT (X-quang) · ISO 5817: B Ø≤0.2s, max 3</text>'
    + '</svg>'; };

  S.def_crack_hot = function(){ return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
    + '<rect x="50" y="80" width="400" height="80" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="50" y="105" width="400" height="30" fill="#cea24a" stroke="#7c4a00"/>'
    + '<line x1="80" y1="120" x2="420" y2="120" stroke="#aa4322" stroke-width="2.5"/>'
    + '<text x="250" y="180" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">NỨT NÓNG — centerline crack</text>'
    + '<text x="250" y="205" text-anchor="middle" font-size="10" fill="#5f6b7a">Nứt dọc trục ngay khi nguội · ISO 5817: TUYỆT ĐỐI KHÔNG</text>'
    + '</svg>'; };

  S.def_crack_cold = function(){ return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
    + '<rect x="50" y="80" width="400" height="80" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="50" y="105" width="400" height="30" fill="#cea24a" stroke="#7c4a00"/>'
    + '<g stroke="#aa4322" stroke-width="2" fill="none">'
    + '<path d="M 100 105 L 110 90 L 105 85"/>'
    + '<path d="M 180 135 L 175 155 L 180 160"/>'
    + '<path d="M 280 105 L 285 90"/>'
    + '<path d="M 360 135 L 365 152"/>'
    + '</g>'
    + '<text x="250" y="180" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">NỨT NGUỘI — H₂ delayed cracking</text>'
    + '<text x="250" y="205" text-anchor="middle" font-size="10" fill="#5f6b7a">Xuất hiện 48-72h sau hàn · trong HAZ · cần UT sau 48h</text>'
    + '</svg>'; };

  // Helper: default defect sketch for the rest
  var defNames = ['def_lof','def_lop','def_slag','def_spatter','def_distort_i','def_warp','def_misalign','def_arc_strike','def_crater','def_blow','def_lamellar','def_reheat','def_mill_scale','def_rust','def_consum','def_preheat','def_sequence'];
  defNames.forEach(function(name){
    if (S[name]) return;
    var label = name.replace('def_','').replace(/_/g,' ');
    S[name] = function(){ return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
      + '<rect x="50" y="80" width="400" height="80" fill="#cdd6df" stroke="#5f6b7a"/>'
      + '<rect x="50" y="105" width="400" height="30" fill="#cea24a" stroke="#7c4a00"/>'
      + '<text x="250" y="125" text-anchor="middle" font-size="11" fill="#1b2430" font-weight="700">[' + label.toUpperCase() + ']</text>'
      + '<text x="250" y="190" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="700">Xem mô tả + biện pháp khắc phục bên dưới</text>'
      + '</svg>'; };
  });

  /* === Override generic defect placeholders with real SVG === */
  S.def_lof = function(){ return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">KHÔNG NGẤU — LACK OF FUSION</text>'
    + '<polygon points="60,170 245,170 250,80 60,80" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<polygon points="255,80 440,80 440,170 250,170" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<path d="M 250 80 L 250 170 L 230 170 L 230 80 Z" fill="#cea24a" stroke="#7c4a00"/>'
    + '<path d="M 250 80 L 260 70 L 250 60 L 240 70 Z" fill="#cea24a" stroke="#7c4a00"/>'
    + '<line x1="247" y1="100" x2="247" y2="160" stroke="#aa4322" stroke-width="2.5" stroke-dasharray="5,3"/>'
    + '<text x="280" y="125" font-size="11" fill="#aa4322" font-weight="700">→ KHÔNG NGẤU</text>'
    + '<text x="280" y="140" font-size="10" fill="#aa4322">không nóng chảy với kim loại cơ bản</text>'
    + '<text x="250" y="200" text-anchor="middle" font-size="11" fill="#3b6d11" font-weight="700">📡 Phát hiện qua UT (siêu âm) hoặc cắt mặt cắt macro</text>'
    + '<text x="250" y="222" text-anchor="middle" font-size="10" fill="#5f6b7a">ISO 5817: TUYỆT ĐỐI KHÔNG cho phép cấp B/C/D</text>'
    + '</svg>'; };

  S.def_lop = function(){ return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">KHÔNG THẤU — LACK OF PENETRATION (root)</text>'
    + '<polygon points="60,170 245,170 245,60 60,60" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<polygon points="255,60 440,60 440,170 255,170" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<path d="M 245 60 Q 250 50 255 60 L 255 130 L 245 130 Z" fill="#cea24a" stroke="#7c4a00"/>'
    + '<rect x="245" y="130" width="10" height="40" fill="#fff" stroke="#aa4322" stroke-width="2" stroke-dasharray="3,2"/>'
    + '<text x="280" y="155" font-size="11" fill="#aa4322" font-weight="800">→ ROOT không hàn</text>'
    + '<text x="280" y="170" font-size="10" fill="#aa4322">khe root không kín, không thấu</text>'
    + '<text x="250" y="200" text-anchor="middle" font-size="11" fill="#3b6d11" font-weight="700">📡 UT từ mặt sau · RT thấy đường tối thẳng</text>'
    + '<text x="250" y="222" text-anchor="middle" font-size="10" fill="#5f6b7a">CJP: 0% LOP · PJP: tuỳ thiết kế (50-75% t)</text>'
    + '</svg>'; };

  S.def_slag = function(){ return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">XỈ KẸT — SLAG INCLUSION</text>'
    + '<rect x="60" y="80" width="380" height="80" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="60" y="100" width="380" height="40" fill="#cea24a" stroke="#7c4a00"/>'
    + '<g fill="#1b2430">'
    + '<rect x="130" y="115" width="18" height="6" rx="2"/>'
    + '<rect x="200" y="118" width="22" height="7" rx="2"/>'
    + '<rect x="290" y="113" width="14" height="5" rx="2"/>'
    + '<rect x="350" y="120" width="20" height="6" rx="2"/>'
    + '</g>'
    + '<text x="250" y="185" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="700">XỈ MÀU ĐEN hình NGẪU NHIÊN (không tròn như rỗ)</text>'
    + '<text x="250" y="205" text-anchor="middle" font-size="10" fill="#3b6d11">📡 RT: vùng đen méo · UT echo yếu hơn vùng rỗ</text>'
    + '<text x="250" y="225" text-anchor="middle" font-size="10" fill="#5f6b7a">ISO 5817: B ≤ 0.4s, max 4 · C ≤ 0.4s, max 6</text>'
    + '</svg>'; };

  S.def_spatter = function(){ return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#854f0b" font-weight="800">VĂNG TIA — SPATTER (mức độ thấp)</text>'
    + '<rect x="60" y="100" width="380" height="60" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="60" y="120" width="380" height="20" fill="#cea24a" stroke="#7c4a00"/>'
    + '<g fill="#888780" stroke="#5f6b7a" stroke-width="0.5">'
    + '<circle cx="90" cy="90" r="3"/><circle cx="110" cy="78" r="2"/>'
    + '<circle cx="155" cy="172" r="2.5"/><circle cx="185" cy="180" r="3"/>'
    + '<circle cx="240" cy="85" r="2"/><circle cx="270" cy="78" r="2.5"/>'
    + '<circle cx="320" cy="175" r="2"/><circle cx="370" cy="170" r="3"/>'
    + '<circle cx="400" cy="85" r="2"/>'
    + '</g>'
    + '<text x="250" y="205" text-anchor="middle" font-size="11" fill="#854f0b" font-weight="700">Hạt kim loại nóng bắn ra ngoài đường hàn</text>'
    + '<text x="250" y="225" text-anchor="middle" font-size="10" fill="#5f6b7a">Cosmetic — không ảnh hưởng cơ tính nhưng cần mài sạch trước sơn</text>'
    + '</svg>'; };

  S.def_distort_i = function(){ return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">MÉO CÁNH I — flange distortion sau hàn</text>'
    + '<g transform="translate(150,50)"><text x="60" y="-5" text-anchor="middle" font-size="10" fill="#5f6b7a">trước hàn (đúng)</text>'
    + '<rect x="0" y="0" width="120" height="10" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="55" y="10" width="10" height="100" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="0" y="110" width="120" height="10" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '</g>'
    + '<g transform="translate(330,50)"><text x="60" y="-5" text-anchor="middle" font-size="10" fill="#aa4322">sau hàn (méo)</text>'
    + '<path d="M 0 5 Q 60 -10 120 5 L 120 12 Q 60 -2 0 12 Z" fill="#cdd6df" stroke="#aa4322" stroke-width="1.5"/>'
    + '<rect x="55" y="10" width="10" height="100" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<path d="M 0 115 Q 60 130 120 115 L 120 122 Q 60 138 0 122 Z" fill="#cdd6df" stroke="#aa4322" stroke-width="1.5"/>'
    + '<path d="M 5 -5 L 5 5" stroke="#aa4322" stroke-width="2"/><polygon points="5,5 2,-2 8,-2" fill="#aa4322"/>'
    + '<path d="M 115 -5 L 115 5" stroke="#aa4322" stroke-width="2"/><polygon points="115,5 112,-2 118,-2" fill="#aa4322"/>'
    + '</g>'
    + '<text x="250" y="195" text-anchor="middle" font-size="11" fill="#3b6d11" font-weight="700">📐 Sai dung sai EN 10034 (out-of-square + flatness)</text>'
    + '<text x="250" y="215" text-anchor="middle" font-size="10" fill="#aa4322" font-weight="600">⚠ Khắc phục: sequence 1-3-2-4 + strong-back fix</text>'
    + '</svg>'; };

  S.def_warp = function(){ return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">CONG VÊNH TẤM — plate warpage</text>'
    + '<path d="M 60 130 Q 250 70 440 130 L 440 145 Q 250 85 60 145 Z" fill="#cdd6df" stroke="#aa4322" stroke-width="1.5"/>'
    + '<line x1="60" y1="140" x2="440" y2="140" stroke="#0c447c" stroke-dasharray="4,3"/>'
    + '<text x="50" y="143" text-anchor="end" font-size="10" fill="#0c447c">phẳng lý thuyết</text>'
    + '<g stroke="#cea24a" stroke-width="3" fill="#cea24a">'
    + '<line x1="100" y1="155" x2="100" y2="165"/><line x1="180" y1="155" x2="180" y2="165"/>'
    + '<line x1="260" y1="155" x2="260" y2="165"/><line x1="340" y1="155" x2="340" y2="165"/>'
    + '<text x="220" y="180" font-size="10" fill="#cea24a" font-weight="700">các mối hàn parallel</text>'
    + '</g>'
    + '<text x="250" y="205" text-anchor="middle" font-size="11" fill="#3b6d11" font-weight="700">⚠ Skip welding 100mm hàn / 200mm bỏ + symmetric 2 mặt</text>'
    + '<text x="250" y="225" text-anchor="middle" font-size="10" fill="#5f6b7a">EN 10029: Class N ≤ 8mm/1m · Class S chặt hơn 50%</text>'
    + '</svg>'; };

  S.def_misalign = function(){ return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">LỆCH TÂM — HIGH-LOW MISALIGNMENT</text>'
    + '<rect x="60" y="100" width="190" height="35" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="250" y="115" width="190" height="35" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<path d="M 245 100 Q 250 88 255 115" fill="#cea24a" stroke="#7c4a00"/>'
    + '<line x1="60" y1="100" x2="245" y2="100" stroke="#0c447c" stroke-dasharray="3,2"/>'
    + '<line x1="255" y1="115" x2="440" y2="115" stroke="#aa4322" stroke-dasharray="3,2"/>'
    + '<line x1="248" y1="100" x2="248" y2="115" stroke="#aa4322" stroke-width="3"/>'
    + '<text x="280" y="110" font-size="13" fill="#aa4322" font-weight="800">Δ (high-low)</text>'
    + '<text x="250" y="190" text-anchor="middle" font-size="11" fill="#3b6d11" font-weight="700">📐 Δ ≤ 0.1t hoặc ≤ 3mm (lấy giá trị nhỏ hơn)</text>'
    + '<text x="250" y="210" text-anchor="middle" font-size="10" fill="#5f6b7a">AWS D1.1 §5.21 · ASME UG-33 — Tack weld 4-6 điểm × 25mm trước hàn</text>'
    + '</svg>'; };

  S.def_arc_strike = function(){ return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">HỒ QUANG LẠC — ARC STRIKE</text>'
    + '<rect x="60" y="80" width="380" height="90" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="60" y="120" width="380" height="15" fill="#cea24a" stroke="#7c4a00"/>'
    + '<text x="250" y="129" text-anchor="middle" font-size="10" fill="#fff">đường hàn đúng vị trí</text>'
    + '<g transform="translate(170,95)">'
    + '<circle r="8" fill="#aa4322"/><circle r="12" fill="none" stroke="#aa4322" stroke-width="1.5" stroke-dasharray="2,2"/>'
    + '<text x="0" y="-18" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="800">⚡ ARC STRIKE</text>'
    + '</g>'
    + '<g transform="translate(360,98)">'
    + '<circle r="6" fill="#aa4322"/><circle r="10" fill="none" stroke="#aa4322" stroke-width="1.5" stroke-dasharray="2,2"/>'
    + '<text x="0" y="-15" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="800">⚡</text>'
    + '</g>'
    + '<text x="250" y="195" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="700">⚠ Vùng cứng đột ngột do nguội nhanh — có thể nứt</text>'
    + '<text x="250" y="215" text-anchor="middle" font-size="10" fill="#3b6d11">Mài sạch 1.5mm + UT 100% vùng đó · Khởi động trên runoff tab</text>'
    + '</svg>'; };

  S.def_crater = function(){ return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">LÕM CUỐI ĐƯỜNG — CRATER (crack)</text>'
    + '<rect x="60" y="80" width="380" height="80" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="60" y="105" width="350" height="30" fill="#cea24a" stroke="#7c4a00"/>'
    + '<path d="M 410 105 Q 405 120 400 135 Q 395 120 410 135 Z" fill="#888780" stroke="#aa4322" stroke-width="1.5"/>'
    + '<g stroke="#aa4322" stroke-width="2" fill="none">'
    + '<path d="M 400 110 L 405 100"/>'
    + '<path d="M 405 125 L 415 130"/>'
    + '<path d="M 400 135 L 395 145"/>'
    + '</g>'
    + '<text x="380" y="175" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="800">crater + nứt sao</text>'
    + '<text x="250" y="195" text-anchor="middle" font-size="11" fill="#3b6d11" font-weight="700">⚠ Crater fill: đắp ngược 5-10mm trước khi tắt hồ quang</text>'
    + '<text x="250" y="215" text-anchor="middle" font-size="10" fill="#5f6b7a">Máy hàn có chế độ "crater fill" tự động · AWS D1.1 §7.19</text>'
    + '</svg>'; };

  S.def_blow = function(){ return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#854f0b" font-weight="800">THỔI TỪ — MAGNETIC ARC BLOW</text>'
    + '<rect x="60" y="80" width="380" height="100" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="60" y="110" width="380" height="20" fill="#cea24a" stroke="#7c4a00"/>'
    + '<g transform="translate(250,80)">'
    + '<line x1="0" y1="0" x2="0" y2="30" stroke="#1b2430" stroke-width="2"/>'
    + '<polygon points="-3,0 3,0 0,-15" fill="#1b2430"/>'
    + '<text x="-30" y="-5" font-size="10" fill="#1b2430">điện cực</text>'
    + '</g>'
    + '<g transform="translate(290,118)">'
    + '<path d="M 0 -8 Q 30 -20 50 -10" stroke="#aa4322" stroke-width="2.5" fill="none"/>'
    + '<polygon points="50,-10 47,-15 53,-13" fill="#aa4322"/>'
    + '<text x="55" y="-12" font-size="11" fill="#aa4322" font-weight="800">arc bị thổi</text>'
    + '</g>'
    + '<g transform="translate(80,140)" font-size="9" fill="#0c447c">'
    + '<text font-weight="700">⊕ tiếp đất</text>'
    + '</g>'
    + '<text x="250" y="200" text-anchor="middle" font-size="11" fill="#3b6d11" font-weight="700">⚠ Đổi sang AC · 2 đầu tiếp đất · Wraparound cable</text>'
    + '<text x="250" y="220" text-anchor="middle" font-size="10" fill="#5f6b7a">Chỉ xảy ra với DC + thép từ tính · không xảy ra với INOX, nhôm</text>'
    + '</svg>'; };

  S.def_lamellar = function(){ return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">XÉ LỚP — LAMELLAR TEARING</text>'
    + '<rect x="60" y="80" width="380" height="100" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<g stroke="#888780" stroke-width="0.5">'
    + '<line x1="60" y1="100" x2="440" y2="100"/><line x1="60" y1="120" x2="440" y2="120"/>'
    + '<line x1="60" y1="140" x2="440" y2="140"/><line x1="60" y1="160" x2="440" y2="160"/>'
    + '</g>'
    + '<rect x="180" y="50" width="80" height="35" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<polygon points="180,80 190,85 200,80 210,85 220,80 230,85 240,80 250,85 260,80" fill="#cea24a"/>'
    + '<g stroke="#aa4322" stroke-width="2" fill="none">'
    + '<line x1="120" y1="120" x2="180" y2="120"/>'
    + '<line x1="260" y1="140" x2="340" y2="140"/>'
    + '<line x1="160" y1="160" x2="240" y2="160"/>'
    + '</g>'
    + '<g stroke="#aa4322" stroke-width="1" fill="#aa4322">'
    + '<line x1="220" y1="40" x2="220" y2="55" marker-end="url(#zarr)"/>'
    + '<text x="225" y="35" font-size="10" font-weight="700">tải Z (vuông tấm)</text>'
    + '</g>'
    + '<defs><marker id="zarr" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto"><path d="M8,0 L0,3 L8,6" fill="#aa4322"/></marker></defs>'
    + '<text x="250" y="200" text-anchor="middle" font-size="11" fill="#3b6d11" font-weight="700">⚠ Đặt Z25/Z35 (EN 10164) cho t≥25mm với T-joint chịu Z-load</text>'
    + '<text x="250" y="220" text-anchor="middle" font-size="10" fill="#5f6b7a">Nứt theo mặt cán + dưới HAZ · UT straight beam phát hiện</text>'
    + '</svg>'; };

  S.def_reheat = function(){ return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">REHEAT CRACK — nứt khi PWHT</text>'
    + '<rect x="60" y="80" width="380" height="80" fill="#fcd5b5" stroke="#aa4322"/>'
    + '<rect x="60" y="105" width="380" height="30" fill="#cea24a" stroke="#7c4a00"/>'
    + '<g stroke="#aa4322" stroke-width="2" fill="none">'
    + '<line x1="180" y1="100" x2="190" y2="115"/>'
    + '<line x1="320" y1="100" x2="315" y2="115"/>'
    + '<text x="250" y="98" text-anchor="middle" font-size="10" fill="#aa4322" font-weight="700">nứt trong HAZ</text>'
    + '</g>'
    + '<g transform="translate(380,55)">'
    + '<rect x="0" y="0" width="60" height="20" fill="#aa4322"/>'
    + '<text x="30" y="14" text-anchor="middle" font-size="10" fill="#fff" font-weight="700">650°C</text>'
    + '</g>'
    + '<text x="250" y="190" text-anchor="middle" font-size="11" fill="#3b6d11" font-weight="700">⚠ Cr-Mo steel + PWHT — heating rate ≤ 100°C/h</text>'
    + '<text x="250" y="210" text-anchor="middle" font-size="10" fill="#5f6b7a">Holding 600-650°C × 2.5min/mm · L-grade ít risk hơn</text>'
    + '</svg>'; };

  S.def_mill_scale = function(){ return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#854f0b" font-weight="800">VẢY CÁN — MILL SCALE</text>'
    + '<rect x="60" y="80" width="180" height="80" fill="#1b2430" stroke="#5f6b7a"/>'
    + '<text x="150" y="125" text-anchor="middle" font-size="12" fill="#fff" font-weight="700">vảy đen</text>'
    + '<text x="150" y="142" text-anchor="middle" font-size="10" fill="#fff">FeO/Fe₃O₄</text>'
    + '<text x="150" y="175" text-anchor="middle" font-size="10" fill="#aa4322" font-weight="700">CHƯA sạch</text>'
    + '<rect x="260" y="80" width="180" height="80" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<text x="350" y="125" text-anchor="middle" font-size="12" fill="#1b2430" font-weight="700">kim loại sáng</text>'
    + '<text x="350" y="142" text-anchor="middle" font-size="10" fill="#1b2430">Sa 2.5 — sạch</text>'
    + '<text x="350" y="175" text-anchor="middle" font-size="10" fill="#0f6e56" font-weight="700">✓ ĐỦ ĐIỀU KIỆN HÀN</text>'
    + '<text x="250" y="205" text-anchor="middle" font-size="11" fill="#3b6d11" font-weight="700">📐 Mài cơ học 25mm 2 bên + lau aceton trước hàn</text>'
    + '<text x="250" y="225" text-anchor="middle" font-size="10" fill="#5f6b7a">ISO 8501-1 Sa 2.5 — không còn vảy cán + chỉ vết nhẹ</text>'
    + '</svg>'; };

  S.def_rust = function(){ return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">GỈ THÉP — RUST</text>'
    + '<rect x="60" y="80" width="380" height="80" fill="#a35317" stroke="#5f6b7a"/>'
    + '<g fill="#7c4a00">'
    + '<circle cx="100" cy="100" r="4"/><circle cx="150" cy="120" r="5"/>'
    + '<circle cx="220" cy="115" r="3"/><circle cx="280" cy="105" r="6"/>'
    + '<circle cx="350" cy="125" r="4"/><circle cx="400" cy="135" r="3"/>'
    + '</g>'
    + '<text x="250" y="195" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="700">⚠ Hydrogen + Porosity nếu hàn trực tiếp</text>'
    + '<text x="250" y="215" text-anchor="middle" font-size="10" fill="#3b6d11">Sandblast Sa 2.5 + sấy 100°C/30 phút trước hàn</text>'
    + '</svg>'; };

  S.def_consum = function(){ return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">SAI LOẠI QUE/DÂY HÀN</text>'
    + '<g transform="translate(60,55)">'
    + '<rect x="0" y="0" width="120" height="100" fill="#0f6e56"/>'
    + '<text x="60" y="20" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">ĐÚNG</text>'
    + '<text x="60" y="50" text-anchor="middle" font-size="13" fill="#fff" font-weight="800">E7018-1</text>'
    + '<text x="60" y="68" text-anchor="middle" font-size="9" fill="#fff">Low-Hydrogen</text>'
    + '<text x="60" y="85" text-anchor="middle" font-size="9" fill="#fff">cho S355</text>'
    + '</g>'
    + '<g transform="translate(220,55)"><text x="30" y="55" text-anchor="middle" font-size="30" fill="#aa4322">⇄</text></g>'
    + '<g transform="translate(320,55)">'
    + '<rect x="0" y="0" width="120" height="100" fill="#aa4322"/>'
    + '<text x="60" y="20" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">SAI</text>'
    + '<text x="60" y="50" text-anchor="middle" font-size="13" fill="#fff" font-weight="800">E6013</text>'
    + '<text x="60" y="68" text-anchor="middle" font-size="9" fill="#fff">cellulose</text>'
    + '<text x="60" y="85" text-anchor="middle" font-size="9" fill="#fff">→ KHÔNG ĐẠT CVN</text>'
    + '</g>'
    + '<text x="250" y="200" text-anchor="middle" font-size="11" fill="#3b6d11" font-weight="700">📐 FIFO + tag MTC + welder check trước hàn</text>'
    + '<text x="250" y="220" text-anchor="middle" font-size="10" fill="#5f6b7a">AWS A5.x · ASME IX · Sấy que SMAW low-H 350°C/2h</text>'
    + '</svg>'; };

  S.def_preheat = function(){ return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">PREHEAT — quên/sai nhiệt độ</text>'
    + '<g transform="translate(80,60)">'
    + '<rect x="0" y="0" width="120" height="80" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<text x="60" y="25" text-anchor="middle" font-size="12" fill="#1b2430">t = 40 mm</text>'
    + '<text x="60" y="50" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="700">NHIỆT: 20°C</text>'
    + '<text x="60" y="68" text-anchor="middle" font-size="10" fill="#aa4322">QUÊN preheat</text>'
    + '</g>'
    + '<text x="225" y="105" text-anchor="middle" font-size="30" fill="#aa4322">⇒</text>'
    + '<g transform="translate(260,60)">'
    + '<rect x="0" y="0" width="120" height="80" fill="#fcd5b5" stroke="#aa4322"/>'
    + '<text x="60" y="25" text-anchor="middle" font-size="12" fill="#1b2430">t = 40 mm</text>'
    + '<text x="60" y="50" text-anchor="middle" font-size="11" fill="#0f6e56" font-weight="700">NHIỆT: 150°C</text>'
    + '<text x="60" y="68" text-anchor="middle" font-size="10" fill="#0f6e56">Preheat ĐÚNG</text>'
    + '</g>'
    + '<g transform="translate(400,60)" font-size="16">🔥</g>'
    + '<text x="250" y="180" text-anchor="middle" font-size="11" fill="#3b6d11" font-weight="700">📐 t=20mm → 100°C · t=40mm → 150°C · t=60mm → 200°C</text>'
    + '<text x="250" y="200" text-anchor="middle" font-size="10" fill="#5f6b7a">AWS D1.1 §5.6 Table 5.8 · Đo bằng pen-type IR 50mm từ joint</text>'
    + '<text x="250" y="220" text-anchor="middle" font-size="10" fill="#aa4322" font-weight="700">⚠ Quên preheat = NỨT NGUỘI sau 48-72h</text>'
    + '</svg>'; };

  S.def_sequence = function(){ return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
    + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">WELDING SEQUENCE — thứ tự hàn</text>'
    + '<g transform="translate(40,50)">'
    + '<text x="100" y="-5" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="700">SAI: hàn từ 1 đầu</text>'
    + '<rect x="0" y="0" width="200" height="60" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<g font-size="11" fill="#aa4322" font-weight="800">'
    + '<text x="20" y="35">1</text><text x="50" y="35">2</text>'
    + '<text x="80" y="35">3</text><text x="110" y="35">4</text>'
    + '<text x="140" y="35">5</text><text x="170" y="35">6</text>'
    + '</g>'
    + '<path d="M 200 40 Q 230 60 200 80" stroke="#aa4322" stroke-width="2" fill="none"/>'
    + '<text x="100" y="80" text-anchor="middle" font-size="10" fill="#aa4322">⇒ biến dạng tích lũy</text>'
    + '</g>'
    + '<g transform="translate(280,50)">'
    + '<text x="100" y="-5" text-anchor="middle" font-size="11" fill="#0f6e56" font-weight="700">ĐÚNG: skip/symmetric</text>'
    + '<rect x="0" y="0" width="200" height="60" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<g font-size="11" fill="#0f6e56" font-weight="800">'
    + '<text x="20" y="35">1</text><text x="50" y="35">4</text>'
    + '<text x="80" y="35">2</text><text x="110" y="35">5</text>'
    + '<text x="140" y="35">3</text><text x="170" y="35">6</text>'
    + '</g>'
    + '<text x="100" y="80" text-anchor="middle" font-size="10" fill="#0f6e56">⇒ biến dạng bù trừ</text>'
    + '</g>'
    + '<text x="250" y="195" text-anchor="middle" font-size="11" fill="#3b6d11" font-weight="700">📐 Hàn xen kẽ + symmetric quanh neutral axis</text>'
    + '<text x="250" y="215" text-anchor="middle" font-size="10" fill="#5f6b7a">AWS D1.1 Annex K · Welding sequence drawing bắt buộc trước thi công</text>'
    + '</svg>'; };

  console.log('LD_SK loaded:', Object.keys(S).length, 'sketches (defects upgraded to real SVG)');

(function(){
  var S = window.LD_SK;
  function box(title, body, footer){
    return '<svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">'
      + '<text x="250" y="20" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">' + title + '</text>'
      + body
      + (footer ? '<text x="250" y="225" text-anchor="middle" font-size="10" fill="#3b6d11" font-weight="700">📖 ' + footer + '</text>' : '')
      + '</svg>';
  }

  /* ===== PAINT SKETCHES ===== */
  S.def_blister = function(){ return box('PHỒNG SƠN — BLISTERING',
    '<rect x="60" y="80" width="380" height="100" fill="#185fa5"/>'
    + '<g fill="#cdd6df" stroke="#1b2430">'
    + '<ellipse cx="130" cy="120" rx="15" ry="8"/>'
    + '<ellipse cx="220" cy="130" rx="22" ry="11"/>'
    + '<ellipse cx="310" cy="115" rx="18" ry="9"/>'
    + '<ellipse cx="390" cy="135" rx="14" ry="7"/>'
    + '</g>'
    + '<text x="250" y="200" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">Lớp sơn xanh + bong bóng chứa nước/khí ở dưới</text>',
    'ISO 4628-2 · Tách bằng dao thử nghiệm — bên trong có ẩm'); };

  S.def_runs = function(){ return box('CHẢY SƠN — RUNS/SAGS',
    '<rect x="60" y="60" width="380" height="120" fill="#185fa5"/>'
    + '<g fill="#0a3a6b">'
    + '<path d="M 130 60 L 130 175 L 142 180 L 150 175 L 150 60 Z"/>'
    + '<path d="M 230 60 L 230 165 L 240 178 L 250 165 L 250 60 Z"/>'
    + '<path d="M 340 60 L 340 170 L 350 180 L 360 170 L 360 60 Z"/>'
    + '</g>'
    + '<text x="250" y="200" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">Sơn chảy thành đường rủ dọc → giọt cuối</text>',
    'Phun 2 lớp mỏng thay 1 lớp dày'); };

  S.def_orange_peel = function(){ return box('VỎ CAM — ORANGE PEEL',
    '<rect x="60" y="80" width="380" height="100" fill="#fcd5b5"/>'
    + '<g fill="#cea24a" opacity="0.6">'
    + Array.from({length:30}, function(_,i){
        var cx = 70 + (i%10)*38;
        var cy = 90 + Math.floor(i/10)*30;
        return '<circle cx="'+cx+'" cy="'+cy+'" r="'+(4+(i%3))+'"/>';
      }).join('')
    + '</g>'
    + '<text x="250" y="200" text-anchor="middle" font-size="11" fill="#854f0b" font-weight="700">Bề mặt nhô lồi như vỏ cam</text>',
    'Cosmetic — không ảnh hưởng bảo vệ ăn mòn'); };

  S.def_pinhole = function(){ return box('LỖ KIM — PINHOLE',
    '<rect x="60" y="80" width="380" height="100" fill="#0c447c"/>'
    + '<g fill="#aa4322">'
    + '<circle cx="110" cy="110" r="2"/><circle cx="160" cy="125" r="1.5"/>'
    + '<circle cx="210" cy="105" r="2"/><circle cx="260" cy="135" r="1.5"/>'
    + '<circle cx="310" cy="115" r="2"/><circle cx="360" cy="130" r="2"/>'
    + '<circle cx="400" cy="110" r="1.5"/>'
    + '</g>'
    + '<text x="250" y="200" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">Lỗ nhỏ xuyên màng sơn — phát hiện qua HOLIDAY DETECTOR</text>',
    'NACE SP0188 · 67.5V/mil thicker than 250µm'); };

  S.def_fisheye = function(){ return box('MẮT CÁ — FISH-EYE',
    '<rect x="60" y="80" width="380" height="100" fill="#185fa5"/>'
    + '<g>'
    + '<circle cx="160" cy="125" r="12" fill="#0a3a6b" stroke="#fff" stroke-width="1.5"/>'
    + '<circle cx="160" cy="125" r="3" fill="#fff"/>'
    + '<circle cx="260" cy="115" r="10" fill="#0a3a6b" stroke="#fff" stroke-width="1.5"/>'
    + '<circle cx="260" cy="115" r="3" fill="#fff"/>'
    + '<circle cx="360" cy="130" r="11" fill="#0a3a6b" stroke="#fff" stroke-width="1.5"/>'
    + '<circle cx="360" cy="130" r="3" fill="#fff"/>'
    + '</g>'
    + '<text x="250" y="200" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">Vùng tròn lõm có tâm — do silicone/dầu</text>',
    'Compressor cần water/oil trap'); };

  S.def_dft = function(){ return box('DFT — DRY FILM THICKNESS',
    '<rect x="60" y="80" width="380" height="80" fill="#0c447c"/>'
    + '<g transform="translate(150,40)">'
    + '<rect x="0" y="0" width="80" height="40" fill="#fff" stroke="#1b2430"/>'
    + '<text x="40" y="14" text-anchor="middle" font-size="9" fill="#1b2430" font-weight="700">Elcometer 456</text>'
    + '<text x="40" y="30" text-anchor="middle" font-size="13" fill="#0f6e56" font-weight="800">280 µm</text>'
    + '</g>'
    + '<line x1="190" y1="80" x2="190" y2="160" stroke="#aa4322" stroke-width="2" marker-start="url(#dftA1)" marker-end="url(#dftA2)"/>'
    + '<defs><marker id="dftA1" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto"><path d="M8,0 L0,3 L8,6" fill="#aa4322"/></marker>'
    + '<marker id="dftA2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#aa4322"/></marker></defs>'
    + '<text x="200" y="125" font-size="11" fill="#aa4322" font-weight="800">DFT thực tế</text>'
    + '<text x="250" y="195" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">ISO 19840 — đo 5 điểm/1m²</text>',
    'Spec ISO 12944 C5-M: DFT ≥ 320µm cho biển'); };

  S.def_adhesion = function(){ return box('MẤT BÁM — ADHESION FAILURE',
    '<rect x="60" y="120" width="380" height="60" fill="#888780" stroke="#5f6b7a"/>'
    + '<rect x="60" y="90" width="200" height="30" fill="#185fa5"/>'
    + '<path d="M 260 90 L 280 70 L 320 75 L 340 85 L 360 70 L 380 80 L 420 65 L 440 85 L 440 120 L 260 120 Z" fill="#185fa5"/>'
    + '<text x="160" y="160" text-anchor="middle" font-size="10" fill="#fff" font-weight="700">sơn còn bám</text>'
    + '<text x="350" y="60" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="800">sơn bong khỏi thép</text>',
    'Pull-off test ISO 4624 — yêu cầu ≥ 5 MPa epoxy'); };

  S.def_rust_bleed = function(){ return box('GỈ THẤM QUA — RUST BLEED',
    '<rect x="60" y="80" width="380" height="100" fill="#185fa5"/>'
    + '<g fill="#a35317">'
    + '<ellipse cx="130" cy="130" rx="12" ry="18"/>'
    + '<ellipse cx="240" cy="115" rx="10" ry="15"/>'
    + '<ellipse cx="340" cy="135" rx="14" ry="20"/>'
    + '<ellipse cx="400" cy="120" rx="9" ry="12"/>'
    + '</g>'
    + '<text x="250" y="200" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">Vết gỉ nâu thấm xuyên màng sơn</text>',
    'Sandblast lại từ Sa 2.5 + đo salt < 50mg/m²'); };

  S.def_crack_paint = function(){ return box('NỨT SƠN — CRACKING',
    '<rect x="60" y="80" width="380" height="100" fill="#0f6e56"/>'
    + '<g stroke="#1b2430" stroke-width="1" fill="none">'
    + '<path d="M 80 100 L 130 130 L 100 170"/>'
    + '<path d="M 130 130 L 180 110 L 220 150"/>'
    + '<path d="M 180 110 L 230 90 L 280 130"/>'
    + '<path d="M 230 90 L 300 100 L 350 130 L 380 90"/>'
    + '<path d="M 280 130 L 330 160 L 380 140"/>'
    + '<path d="M 350 130 L 410 110 L 430 160"/>'
    + '</g>'
    + '<text x="250" y="200" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">Mạng nứt nhỏ — DFT quá dày hoặc UV</text>',
    'ISO 4628-4 · Polyurethane aliphatic chống UV'); };

  S.def_chalk = function(){ return box('PHẤN HOÁ — CHALKING',
    '<rect x="60" y="80" width="380" height="100" fill="#5f6b7a"/>'
    + '<rect x="60" y="80" width="380" height="100" fill="#fff" opacity="0.4"/>'
    + '<text x="250" y="135" text-anchor="middle" font-size="14" fill="#cdd6df" font-weight="800">phấn trắng mờ</text>'
    + '<text x="250" y="155" text-anchor="middle" font-size="10" fill="#cdd6df">do UV bào mòn alkyd</text>'
    + '<text x="250" y="200" text-anchor="middle" font-size="11" fill="#1b2430" font-weight="700">Lau bằng khăn trắng → có bột màu sơn</text>',
    'ISO 4628-6 · Dùng aliphatic PU cho ngoài trời'); };

  S.def_color = function(){ return box('SAI MÀU — COLOR MISMATCH',
    '<rect x="60" y="80" width="180" height="100" fill="#185fa5"/>'
    + '<rect x="260" y="80" width="180" height="100" fill="#2c70b8"/>'
    + '<text x="150" y="135" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">RAL 5010</text>'
    + '<text x="350" y="135" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">RAL 5012</text>'
    + '<line x1="250" y1="60" x2="250" y2="200" stroke="#aa4322" stroke-width="2" stroke-dasharray="4,3"/>'
    + '<text x="250" y="200" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="700">2 lot sơn khác nhau</text>',
    'ISO 3668 · Đặt cùng lot cho cả công trình'); };

  S.def_dirt = function(){ return box('BỤI/LÔNG KẸT — INCLUSIONS',
    '<rect x="60" y="80" width="380" height="100" fill="#185fa5"/>'
    + '<g fill="#1b2430">'
    + '<line x1="120" y1="100" x2="135" y2="110" stroke="#1b2430" stroke-width="1.5"/>'
    + '<circle cx="180" cy="130" r="2"/>'
    + '<line x1="220" y1="115" x2="245" y2="135" stroke="#1b2430" stroke-width="1"/>'
    + '<circle cx="290" cy="115" r="1.5"/>'
    + '<line x1="320" y1="140" x2="340" y2="125" stroke="#1b2430" stroke-width="1"/>'
    + '<circle cx="380" cy="130" r="2"/>'
    + '</g>'
    + '<text x="250" y="200" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">Bụi, sợi vải, côn trùng dính vào sơn ướt</text>',
    'Phòng sơn cần HEPA filter + áo coverall'); };

  S.def_dew = function(){ return box('ĐỌNG SƯƠNG — DEW POINT FAIL',
    '<rect x="60" y="80" width="380" height="80" fill="#cdd6df"/>'
    + '<g fill="#185fa5" opacity="0.7">'
    + Array.from({length:25}, function(_,i){
        var cx = 70 + (i%10)*38;
        var cy = 90 + Math.floor(i/10)*30;
        return '<circle cx="'+cx+'" cy="'+cy+'" r="'+(2+(i%2))+'"/>';
      }).join('')
    + '</g>'
    + '<text x="250" y="175" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="800">Bề mặt thép có nước đọng</text>'
    + '<text x="250" y="200" text-anchor="middle" font-size="10" fill="#1b2430">T_surface < T_dew + 3°C → KHÔNG ĐƯỢC SƠN</text>',
    'ISO 8502-4 · Phải có psychrometer đo trước sơn'); };

  S.def_bleed = function(){ return box('BLEED MÀU — TOPCOAT BLEED',
    '<rect x="60" y="100" width="380" height="40" fill="#a35317"/>'
    + '<text x="250" y="125" text-anchor="middle" font-size="10" fill="#fff">primer red oxide</text>'
    + '<rect x="60" y="80" width="380" height="20" fill="#fcd5b5" opacity="0.7"/>'
    + '<text x="250" y="95" text-anchor="middle" font-size="10" fill="#854f0b">topcoat sáng bị thấm màu</text>'
    + '<text x="250" y="200" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="700">Topcoat solvent hoà tan primer</text>',
    'Dùng sealer giữa primer + topcoat'); };

  /* ===== DIMENSIONAL DEFECT SKETCHES ===== */
  S.def_twist = function(){ return box('VẶN — TWIST',
    '<g transform="translate(100,90)">'
    + '<path d="M 0 0 L 300 -15 L 300 25 L 0 40 Z" fill="#cdd6df" stroke="#aa4322" stroke-width="1.5"/>'
    + '<line x1="0" y1="20" x2="300" y2="5" stroke="#0c447c" stroke-dasharray="3,2"/>'
    + '<text x="-10" y="20" text-anchor="end" font-size="10" fill="#0c447c">đúng</text>'
    + '<text x="305" y="-5" font-size="10" fill="#aa4322" font-weight="700">vặn lên</text>'
    + '<text x="305" y="40" font-size="10" fill="#aa4322" font-weight="700">vặn xuống</text>'
    + '</g>'
    + '<text x="250" y="200" text-anchor="middle" font-size="11" fill="#3b6d11" font-weight="700">Cấu kiện không nằm thẳng trên 4 điểm tựa</text>',
    'EN 1090-2 §11.2.4 · cold straightening sau hàn'); };

  S.def_sweep = function(){ return box('CONG NGANG — SWEEP',
    '<path d="M 60 130 Q 250 80 440 130 L 440 145 Q 250 95 60 145 Z" fill="#cdd6df" stroke="#aa4322" stroke-width="1.5"/>'
    + '<line x1="60" y1="138" x2="440" y2="138" stroke="#0c447c" stroke-dasharray="4,3"/>'
    + '<text x="50" y="142" text-anchor="end" font-size="10" fill="#0c447c">trục thẳng</text>'
    + '<text x="250" y="80" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="700">cong theo trục z-z (trục yếu)</text>'
    + '<text x="250" y="200" text-anchor="middle" font-size="11" fill="#3b6d11" font-weight="700">Dầm cong sang ngang, không nằm trên trục</text>',
    'EN 10034 Table 2 · ≤ L/1000'); };

  S.def_camber_wrong = function(){ return box('CAMBER SAI CHIỀU — REVERSE CAMBER',
    '<g transform="translate(60,90)">'
    + '<text x="190" y="-5" text-anchor="middle" font-size="11" fill="#0f6e56" font-weight="700">ĐÚNG (camber lên)</text>'
    + '<path d="M 0 30 Q 190 0 380 30 L 380 40 Q 190 10 0 40 Z" fill="#cdd6df" stroke="#0f6e56"/>'
    + '<text x="-10" y="35" text-anchor="end" font-size="10" fill="#0f6e56">TOP ↑</text>'
    + '</g>'
    + '<g transform="translate(60,160)">'
    + '<path d="M 0 0 Q 190 30 380 0 L 380 10 Q 190 40 0 10 Z" fill="#cdd6df" stroke="#aa4322"/>'
    + '<text x="190" y="50" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="700">SAI: camber xuống (lật ngược)</text>'
    + '</g>'
    + '<text x="250" y="225" text-anchor="middle" font-size="10" fill="#3b6d11" font-weight="700">📐 Đánh dấu ↑ TOP rõ ràng trên cánh</text>'); };

  S.def_hole_pos = function(){ return box('LỖ SAI VỊ TRÍ — HOLE POSITION',
    '<rect x="80" y="80" width="160" height="100" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<circle cx="120" cy="120" r="6" fill="#1b2430"/>'
    + '<circle cx="200" cy="120" r="6" fill="#1b2430"/>'
    + '<circle cx="160" cy="160" r="6" fill="#1b2430"/>'
    + '<rect x="280" y="80" width="160" height="100" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<circle cx="320" cy="115" r="6" fill="#1b2430"/>'
    + '<circle cx="405" cy="125" r="6" fill="#1b2430"/>'
    + '<circle cx="365" cy="170" r="6" fill="#1b2430"/>'
    + '<g stroke="#aa4322" stroke-width="1.5" stroke-dasharray="2,2" fill="none">'
    + '<circle cx="320" cy="120" r="10"/><circle cx="400" cy="120" r="10"/><circle cx="360" cy="160" r="10"/>'
    + '</g>'
    + '<text x="160" y="200" text-anchor="middle" font-size="11" fill="#0f6e56" font-weight="700">part 1 đúng</text>'
    + '<text x="360" y="200" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="700">part 2 lệch — KHÔNG LẮP ĐƯỢC</text>',
    'Drill jig + trial assembly trước nhân bản'); };

  S.def_len_wrong = function(){ return box('SAI CHIỀU DÀI — LENGTH OUT',
    '<rect x="60" y="100" width="380" height="30" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<line x1="60" y1="140" x2="60" y2="160" stroke="#0c447c"/>'
    + '<line x1="440" y1="140" x2="440" y2="160" stroke="#0c447c"/>'
    + '<line x1="60" y1="150" x2="440" y2="150" stroke="#0c447c" marker-end="url(#lwa)" marker-start="url(#lwas)"/>'
    + '<text x="250" y="170" text-anchor="middle" font-size="11" fill="#0c447c" font-weight="700">L_thực</text>'
    + '<defs><marker id="lwa" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8" fill="#0c447c"/></marker>'
    + '<marker id="lwas" markerWidth="10" markerHeight="8" refX="0" refY="4" orient="auto"><path d="M10,0 L0,4 L10,8" fill="#0c447c"/></marker></defs>'
    + '<line x1="60" y1="90" x2="60" y2="70" stroke="#aa4322"/>'
    + '<line x1="420" y1="90" x2="420" y2="70" stroke="#aa4322"/>'
    + '<line x1="60" y1="80" x2="420" y2="80" stroke="#aa4322" stroke-dasharray="3,2"/>'
    + '<text x="240" y="65" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="700">L_spec</text>',
    'EN 1090-2 Table B.5 · ±2mm (≤2m) đến ±25mm (>20m)'); };

  S.def_gap = function(){ return box('KHE HỞ BÍCH — FLANGE GAP',
    '<rect x="120" y="60" width="20" height="140" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="60" y="60" width="60" height="20" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="60" y="180" width="60" height="20" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="380" y="60" width="20" height="140" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="400" y="60" width="40" height="20" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="400" y="180" width="40" height="20" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<rect x="140" y="80" width="240" height="100" fill="#0f6e56" opacity="0.3"/>'
    + '<text x="260" y="135" text-anchor="middle" font-size="11" fill="#1b2430" font-weight="700">gasket</text>'
    + '<g stroke="#aa4322" stroke-width="2">'
    + '<line x1="160" y1="100" x2="180" y2="100"/>'
    + '<line x1="170" y1="95" x2="170" y2="105"/>'
    + '</g>'
    + '<text x="220" y="100" font-size="11" fill="#aa4322" font-weight="800">gap > 1mm</text>',
    'ASME B16.5 · Feeler gauge < 0.5mm sau siết'); };

  S.def_shrink_uneq = function(){ return box('CO RÚT KHÔNG ĐỀU',
    '<g transform="translate(60,80)">'
    + '<path d="M 0 30 L 380 0 L 380 60 L 0 30 Z" fill="#cdd6df" stroke="#aa4322"/>'
    + '<line x1="0" y1="30" x2="380" y2="30" stroke="#0c447c" stroke-dasharray="4,3"/>'
    + '<text x="-5" y="35" text-anchor="end" font-size="10" fill="#0c447c">tim đúng</text>'
    + '<text x="385" y="5" font-size="10" fill="#aa4322" font-weight="700">co nhiều</text>'
    + '<text x="385" y="65" font-size="10" fill="#aa4322" font-weight="700">co ít</text>'
    + '</g>'
    + '<text x="250" y="200" text-anchor="middle" font-size="11" fill="#3b6d11" font-weight="700">Hàn 1 bên trước → cấu kiện lệch tâm sau hàn</text>',
    'Balanced welding + pre-set ngược 30-50%'); };

  S.def_stack_up = function(){ return box('STACK-UP DUNG SAI',
    '<g transform="translate(50,80)">'
    + '<rect x="0" y="20" width="80" height="40" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<text x="40" y="44" text-anchor="middle" font-size="10" fill="#1b2430">±0.1</text>'
    + '<rect x="85" y="20" width="80" height="40" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<text x="125" y="44" text-anchor="middle" font-size="10" fill="#1b2430">±0.1</text>'
    + '<rect x="170" y="20" width="80" height="40" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<text x="210" y="44" text-anchor="middle" font-size="10" fill="#1b2430">±0.1</text>'
    + '<rect x="255" y="20" width="80" height="40" fill="#cdd6df" stroke="#5f6b7a"/>'
    + '<text x="295" y="44" text-anchor="middle" font-size="10" fill="#1b2430">±0.1</text>'
    + '<text x="170" y="85" text-anchor="middle" font-size="12" fill="#aa4322" font-weight="800">Σ = ±0.4 (worst case) · ±0.2 (RSS)</text>'
    + '</g>'
    + '<text x="250" y="200" text-anchor="middle" font-size="11" fill="#3b6d11" font-weight="700">Tổng dung sai chuỗi: Sum vs RSS</text>',
    'ASME Y14.5 · RSS chính xác hơn khi nhiều part'); };

  console.log('LD_SK extended:', Object.keys(S).length, 'sketches');
})();

})();
