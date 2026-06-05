/* Sketches engineering style cho app Dung sai — sát thực tế, sắc nét.
   Steel hatching · dimension lines ISO 129 · tool icons · annotation tiếng Việt. */

const DSDEFS = `<defs>
  <pattern id="dsHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <line x1="0" y1="0" x2="0" y2="6" stroke="#5f6b7a" stroke-width="0.6" opacity="0.45"/>
  </pattern>
  <pattern id="dsHatchD" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <line x1="0" y1="0" x2="0" y2="5" stroke="#2c2c2a" stroke-width="0.7" opacity="0.7"/>
  </pattern>
  <pattern id="weldHatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
    <line x1="0" y1="0" x2="0" y2="4" stroke="#a9781a" stroke-width="0.8"/>
  </pattern>
  <pattern id="concrete" width="12" height="12" patternUnits="userSpaceOnUse">
    <circle cx="3" cy="3" r="1" fill="#9aa7b3"/>
    <circle cx="8" cy="9" r="1.2" fill="#888780"/>
    <circle cx="11" cy="2" r="0.8" fill="#888780"/>
  </pattern>
  <marker id="dsAh"  markerWidth="9" markerHeight="7" refX="8.5" refY="3.5" orient="auto"><path d="M0,0 L9,3.5 L0,7 z" fill="#0c447c"/></marker>
  <marker id="dsAhs" markerWidth="9" markerHeight="7" refX="0.5" refY="3.5" orient="auto"><path d="M9,0 L0,3.5 L9,7 z" fill="#0c447c"/></marker>
  <marker id="dsAhR" markerWidth="9" markerHeight="7" refX="8.5" refY="3.5" orient="auto"><path d="M0,0 L9,3.5 L0,7 z" fill="#aa4322"/></marker>
  <marker id="dsAhsR" markerWidth="9" markerHeight="7" refX="0.5" refY="3.5" orient="auto"><path d="M9,0 L0,3.5 L9,7 z" fill="#aa4322"/></marker>
  <linearGradient id="dsSteelG" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#e8ecf0"/><stop offset="0.5" stop-color="#cdd6df"/><stop offset="1" stop-color="#9aa7b3"/>
  </linearGradient>
  <linearGradient id="weldBead" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#f0c14b"/><stop offset="1" stop-color="#a9781a"/>
  </linearGradient>
</defs>`;

function dsDimH(x1, x2, y, label, color){
  const c = color || '#0c447c';
  return `<g>
    <line x1="${x1}" y1="${y-4}" x2="${x1}" y2="${y+4}" stroke="${c}" stroke-width="1"/>
    <line x1="${x2}" y1="${y-4}" x2="${x2}" y2="${y+4}" stroke="${c}" stroke-width="1"/>
    <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${c}" stroke-width="1" marker-start="url(#dsAhs)" marker-end="url(#dsAh)"/>
    <text x="${(x1+x2)/2}" y="${y-7}" text-anchor="middle" font-size="12" fill="${c}" font-weight="700">${label}</text>
  </g>`;
}
function dsDimV(y1, y2, x, label, color){
  const c = color || '#0c447c';
  return `<g>
    <line x1="${x-4}" y1="${y1}" x2="${x+4}" y2="${y1}" stroke="${c}" stroke-width="1"/>
    <line x1="${x-4}" y1="${y2}" x2="${x+4}" y2="${y2}" stroke="${c}" stroke-width="1"/>
    <line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${c}" stroke-width="1" marker-start="url(#dsAhs)" marker-end="url(#dsAh)"/>
    <text x="${x+6}" y="${(y1+y2)/2+4}" font-size="12" fill="${c}" font-weight="700">${label}</text>
  </g>`;
}
function dsCaption(text){
  return `<rect x="0" y="240" width="500" height="40" fill="#eef4fa" stroke="none"/>
    <text x="250" y="262" text-anchor="middle" font-size="11.5" fill="#0c447c" font-weight="600">${text}</text>`;
}

window.DS_SKETCH = {

/* ===== CỘT — Plumb / verticality ===== */
column_plumb: () => `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">${DSDEFS}
  <rect x="30" y="220" width="440" height="40" fill="url(#concrete)" stroke="#5f6b7a"/>
  <rect x="160" y="216" width="180" height="6" fill="#888780"/>
  <text x="60" y="245" font-size="11" fill="#5f6b7a" font-weight="700">MÓNG BÊ TÔNG</text>
  <g transform="translate(220,40) rotate(2.2 25 90)">
    <rect x="0" y="0" width="50" height="180" fill="url(#dsSteelG)" stroke="#5f6b7a" stroke-width="1.5"/>
    <rect x="0" y="0" width="50" height="180" fill="url(#dsHatch)" opacity="0.45"/>
    <rect x="8" y="0" width="34" height="180" fill="none" stroke="#5f6b7a" stroke-width="0.7"/>
  </g>
  <line x1="240" y1="40" x2="240" y2="220" stroke="#0c447c" stroke-width="1.4" stroke-dasharray="6,4"/>
  <text x="237" y="38" text-anchor="end" font-size="11" fill="#0c447c" font-weight="700">tim đứng</text>
  <line x1="248" y1="60" x2="270" y2="60" stroke="#aa4322" stroke-width="2.5" marker-end="url(#dsAhR)"/>
  <text x="280" y="58" font-size="13" fill="#aa4322" font-weight="800">e (plumb out)</text>
  <text x="280" y="74" font-size="11" fill="#aa4322" font-weight="600">đo trên đỉnh cột</text>
  <g transform="translate(190,170)">
    <rect x="0" y="0" width="35" height="50" fill="#fff" stroke="#1b2430"/>
    <text x="17" y="18" text-anchor="middle" font-size="9" fill="#1b2430" font-weight="700">QUẢ DỌI</text>
    <text x="17" y="32" text-anchor="middle" font-size="9" fill="#1b2430" font-weight="700">/ LASER</text>
    <line x1="17" y1="40" x2="17" y2="48" stroke="#0c447c" stroke-width="1.5"/>
    <circle cx="17" cy="48" r="2" fill="#0c447c"/>
  </g>
  ${dsDimV(40, 220, 410, 'H (cao cột)', '#0c447c')}
  ${dsCaption('EN 1090-2 §11.2 · AISC 303 §7.13 — Đo e ở đỉnh, so với chân cột. Giới hạn: H/300 hoặc H/500')}
</svg>`,

/* ===== DẦM — Straightness (Beam straightness/camber) ===== */
beam_straight: () => `<svg viewBox="0 0 500 270" xmlns="http://www.w3.org/2000/svg">${DSDEFS}
  <path d="M 40 100 Q 250 75 460 100 L 460 130 Q 250 105 40 130 Z" fill="url(#dsSteelG)" stroke="#5f6b7a" stroke-width="1"/>
  <path d="M 40 100 Q 250 75 460 100 L 460 130 Q 250 105 40 130 Z" fill="url(#dsHatch)" opacity="0.45"/>
  <text x="250" y="155" text-anchor="middle" font-size="11" fill="#5f6b7a" font-weight="600">DẦM I (mặt bên — cong)</text>
  <line x1="40" y1="130" x2="460" y2="130" stroke="#0c447c" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="55" y="148" font-size="11" fill="#0c447c">đường tim lý thuyết</text>
  <line x1="250" y1="130" x2="250" y2="93" stroke="#aa4322" stroke-width="2.5" marker-end="url(#dsAhsR)"/>
  <text x="268" y="113" font-size="13" fill="#aa4322" font-weight="800">f</text>
  <text x="280" y="113" font-size="11" fill="#aa4322" font-weight="600">(võng/camber)</text>
  ${dsDimH(40, 460, 185, 'L', '#0c447c')}
  <g transform="translate(40,120)" stroke="#1b2430" stroke-width="2.5">
    <line x1="0" y1="0" x2="0" y2="14"/>
    <line x1="-4" y1="14" x2="4" y2="14"/>
  </g>
  <g transform="translate(460,120)" stroke="#1b2430" stroke-width="2.5">
    <line x1="0" y1="0" x2="0" y2="14"/>
    <line x1="-4" y1="14" x2="4" y2="14"/>
  </g>
  <text x="60" y="215" font-size="11" fill="#3b6d11" font-weight="600">📐 Căng dây thép từ 2 đầu → đo võng giữa = f bằng thước căn lá</text>
  ${dsCaption('EN 1090-2 §11 — f ≤ L/1000 (Class 1) · AWS D1.1 §5.23 — f ≤ L/1000')}
</svg>`,

/* ===== TẤM SÀN — Flatness ===== */
floor_flatness: () => `<svg viewBox="0 0 500 270" xmlns="http://www.w3.org/2000/svg">${DSDEFS}
  <path d="M 30 150 Q 130 130 230 155 Q 330 175 460 145" fill="none" stroke="#5f6b7a" stroke-width="20" stroke-linecap="round"/>
  <text x="250" y="155" text-anchor="middle" font-size="12" fill="#fff" font-weight="700">TẤM SÀN (nhìn cắt ngang)</text>
  <line x1="30" y1="120" x2="460" y2="120" stroke="#1b2430" stroke-width="3"/>
  <text x="80" y="115" font-size="11" fill="#1b2430" font-weight="700">THƯỚC THẲNG 2 m (straightedge)</text>
  <line x1="230" y1="120" x2="230" y2="148" stroke="#aa4322" stroke-width="2.5"/>
  <text x="240" y="135" font-size="12" fill="#aa4322" font-weight="800">Δ</text>
  <g transform="translate(260,90)">
    <rect x="0" y="0" width="60" height="3" fill="#888780"/>
    <line x1="3" y1="3" x2="3" y2="12" stroke="#5f5e5a" stroke-width="2"/>
    <line x1="13" y1="3" x2="13" y2="14" stroke="#5f5e5a" stroke-width="2"/>
    <line x1="23" y1="3" x2="23" y2="16" stroke="#5f5e5a" stroke-width="2"/>
    <text x="68" y="13" font-size="10" fill="#5f5e5a">căn lá feeler</text>
  </g>
  <text x="50" y="210" font-size="11" fill="#3b6d11" font-weight="600">📐 Đặt thước thẳng 2 m lên sàn — đo khe lớn nhất bằng căn lá</text>
  ${dsCaption('EN 1090-2 Table D.1.8 — Δ ≤ 6 mm trên 2 m (sàn thi công) · ≤ 4 mm cho sàn finish')}
</svg>`,

/* ===== LIÊN KẾT BU LÔNG — Hole position ===== */
bolt_hole: () => `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">${DSDEFS}
  <rect x="60" y="50" width="380" height="170" fill="url(#dsSteelG)" stroke="#5f6b7a" stroke-width="1.5"/>
  <rect x="60" y="50" width="380" height="170" fill="url(#dsHatch)" opacity="0.4"/>
  <g fill="#1b2430">
    <circle cx="130" cy="100" r="10"/><circle cx="250" cy="100" r="10"/><circle cx="370" cy="100" r="10"/>
    <circle cx="130" cy="170" r="10"/><circle cx="250" cy="170" r="10"/><circle cx="370" cy="170" r="10"/>
  </g>
  <g fill="#fff">
    <circle cx="130" cy="100" r="5"/><circle cx="250" cy="100" r="5"/><circle cx="370" cy="100" r="5"/>
    <circle cx="130" cy="170" r="5"/><circle cx="250" cy="170" r="5"/><circle cx="370" cy="170" r="5"/>
  </g>
  ${dsDimH(130, 250, 30, 'p (pitch)', '#0c447c')}
  ${dsDimH(250, 370, 30, 'p', '#0c447c')}
  ${dsDimV(100, 170, 30, 'g (gauge)', '#3b6d11')}
  <line x1="60" y1="100" x2="130" y2="100" stroke="#aa4322" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="62" y="92" font-size="11" fill="#aa4322" font-weight="700">e₁ (edge)</text>
  <line x1="130" y1="50" x2="130" y2="100" stroke="#aa4322" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="65" y="240" font-size="11" fill="#3b6d11" font-weight="600">📐 Đo: khoảng cách lỗ-lỗ (p, g), lỗ-mép (e₁, e₂). Sai ±2 mm — đo bằng thước cuộn</text>
  ${dsCaption('EN 1090-2 Table D.1.4 · AISC 303 §7.11 — Pitch ±2 mm · edge distance ±2 mm')}
</svg>`,

/* ===== MỐI HÀN — Undercut ===== */
weld_undercut: () => `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">${DSDEFS}
  <rect x="40" y="120" width="200" height="50" fill="url(#dsSteelG)" stroke="#5f6b7a"/>
  <rect x="40" y="120" width="200" height="50" fill="url(#dsHatch)" opacity="0.45"/>
  <rect x="260" y="120" width="200" height="50" fill="url(#dsSteelG)" stroke="#5f6b7a"/>
  <rect x="260" y="120" width="200" height="50" fill="url(#dsHatch)" opacity="0.45"/>
  <path d="M 240 120 Q 250 100 260 120" fill="url(#weldBead)" stroke="#7c4a00" stroke-width="1.2"/>
  <path d="M 230 121 Q 240 132 250 121" fill="#aa4322" opacity="0.6"/>
  <text x="180" y="140" font-size="11" fill="#1b2430" font-weight="600">Kim loại</text>
  <text x="280" y="140" font-size="11" fill="#1b2430" font-weight="600">Kim loại</text>
  <line x1="234" y1="120" x2="234" y2="128" stroke="#aa4322" stroke-width="1.5"/>
  <line x1="246" y1="120" x2="246" y2="128" stroke="#aa4322" stroke-width="1.5"/>
  <text x="200" y="190" font-size="13" fill="#aa4322" font-weight="800">UNDERCUT (Cháy chân)</text>
  <line x1="220" y1="195" x2="240" y2="125" stroke="#aa4322" stroke-width="0.8" stroke-dasharray="2,2"/>
  ${dsDimV(120, 128, 320, 'h', '#aa4322')}
  <text x="335" y="125" font-size="11" fill="#aa4322" font-weight="700">(độ sâu cháy)</text>
  <g transform="translate(80,200)">
    <rect x="0" y="0" width="80" height="5" fill="#888780"/>
    <path d="M 5 5 L 8 25 L 11 5" fill="none" stroke="#1b2430" stroke-width="1.5"/>
    <text x="20" y="20" font-size="10" fill="#1b2430" font-weight="600">UNDERCUT GAUGE</text>
  </g>
  ${dsCaption('AWS D1.1 §8.1: h ≤ 1 mm (tĩnh) · ≤ 0.25 mm (chu kỳ) · ISO 5817 B: ≤ 0.5 mm')}
</svg>`,

/* ===== MỐI HÀN FILLET — Leg + throat ===== */
fillet_leg: () => `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">${DSDEFS}
  <rect x="40" y="170" width="420" height="40" fill="url(#dsSteelG)" stroke="#5f6b7a"/>
  <rect x="40" y="170" width="420" height="40" fill="url(#dsHatch)" opacity="0.45"/>
  <rect x="230" y="40" width="40" height="130" fill="url(#dsSteelG)" stroke="#5f6b7a"/>
  <rect x="230" y="40" width="40" height="130" fill="url(#dsHatch)" opacity="0.45"/>
  <path d="M 230 170 L 230 120 L 180 170 Z" fill="url(#weldBead)" stroke="#7c4a00" stroke-width="1"/>
  <path d="M 230 170 L 230 120 L 230 120 Q 210 145 180 170 Z" fill="url(#weldHatch)" opacity="0.7"/>
  <path d="M 270 170 L 270 120 L 320 170 Z" fill="url(#weldBead)" stroke="#7c4a00" stroke-width="1"/>
  <line x1="178" y1="170" x2="178" y2="120" stroke="#0c447c" stroke-width="1.5" marker-start="url(#dsAh)" marker-end="url(#dsAhs)"/>
  <text x="160" y="148" text-anchor="end" font-size="13" fill="#0c447c" font-weight="800">leg z</text>
  <line x1="180" y1="172" x2="230" y2="172" stroke="#0c447c" stroke-width="1.5" marker-start="url(#dsAhs)" marker-end="url(#dsAh)"/>
  <text x="205" y="190" text-anchor="middle" font-size="13" fill="#0c447c" font-weight="800">leg z</text>
  <line x1="190" y1="155" x2="230" y2="155" stroke="#aa4322" stroke-width="1.5"/>
  <text x="210" y="148" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="700">throat a = 0.7z</text>
  <g transform="translate(330,90)">
    <rect x="0" y="0" width="80" height="65" fill="#fff" stroke="#1b2430"/>
    <text x="40" y="15" text-anchor="middle" font-size="9" fill="#1b2430" font-weight="700">FILLET</text>
    <text x="40" y="28" text-anchor="middle" font-size="9" fill="#1b2430" font-weight="700">WELD GAUGE</text>
    <path d="M 20 35 L 20 55 L 40 55 Z" fill="none" stroke="#aa4322" stroke-width="1.5"/>
    <text x="50" y="50" font-size="9" fill="#aa4322" font-weight="700">z = ?</text>
  </g>
  ${dsCaption('AWS D1.1 §7.8 Table 7.7 — leg theo bản vẽ · Underrun ≤ 1.6 mm trên 10% chiều dài')}
</svg>`,

/* ===== MỐI HÀN — Reinforcement / Convexity ===== */
weld_reinforcement: () => `<svg viewBox="0 0 500 270" xmlns="http://www.w3.org/2000/svg">${DSDEFS}
  <rect x="40" y="140" width="200" height="50" fill="url(#dsSteelG)" stroke="#5f6b7a"/>
  <rect x="40" y="140" width="200" height="50" fill="url(#dsHatch)" opacity="0.45"/>
  <rect x="260" y="140" width="200" height="50" fill="url(#dsSteelG)" stroke="#5f6b7a"/>
  <rect x="260" y="140" width="200" height="50" fill="url(#dsHatch)" opacity="0.45"/>
  <path d="M 230 140 Q 250 95 270 140" fill="url(#weldBead)" stroke="#7c4a00" stroke-width="1.2"/>
  <path d="M 230 140 Q 250 95 270 140" fill="url(#weldHatch)" opacity="0.6"/>
  <line x1="220" y1="140" x2="280" y2="140" stroke="#0c447c" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="215" y="143" text-anchor="end" font-size="10" fill="#0c447c">mặt kim loại</text>
  <line x1="250" y1="140" x2="250" y2="95" stroke="#aa4322" stroke-width="2.5"/>
  <line x1="246" y1="95" x2="254" y2="95" stroke="#aa4322" stroke-width="2"/>
  <text x="270" y="100" font-size="13" fill="#aa4322" font-weight="800">h (reinf.)</text>
  <text x="270" y="115" font-size="11" fill="#aa4322" font-weight="600">lồi mặt mối hàn</text>
  <g transform="translate(340,170)">
    <rect x="0" y="0" width="80" height="40" fill="#fff" stroke="#1b2430"/>
    <text x="40" y="15" text-anchor="middle" font-size="9" fill="#1b2430" font-weight="700">WELD PROFILE</text>
    <text x="40" y="28" text-anchor="middle" font-size="9" fill="#1b2430" font-weight="700">GAUGE</text>
  </g>
  <text x="50" y="215" font-size="11" fill="#3b6d11" font-weight="600">📐 Đo bằng đồng hồ profile / weld gauge. Lồi phải có chuyển tiếp êm</text>
  ${dsCaption('AWS D1.1 §8.1: h ≤ 3 mm · ASME UW-35: dày≤13 mm → ≤3 · 13-25 → ≤4 · >25 → ≤6')}
</svg>`,

/* ===== ĐỘ TRÒN BỒN (Tank roundness API 650) ===== */
tank_round: () => `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">${DSDEFS}
  <circle cx="250" cy="135" r="95" fill="none" stroke="#0c447c" stroke-width="1.2" stroke-dasharray="5,3"/>
  <text x="345" y="92" font-size="10" fill="#0c447c">vòng tròn lý thuyết</text>
  <path d="M 250 40 Q 360 75 345 135 Q 360 195 250 230 Q 140 195 155 135 Q 140 75 250 40 Z" fill="url(#dsSteelG)" stroke="#5f6b7a" stroke-width="1.5"/>
  <path d="M 250 40 Q 360 75 345 135 Q 360 195 250 230 Q 140 195 155 135 Q 140 75 250 40 Z" fill="url(#dsHatch)" opacity="0.4"/>
  <text x="250" y="138" text-anchor="middle" font-size="13" fill="#1b2430" font-weight="700">BỒN (méo)</text>
  <line x1="155" y1="135" x2="345" y2="135" stroke="#aa4322" stroke-width="1.5" marker-start="url(#dsAhsR)" marker-end="url(#dsAhR)"/>
  <text x="250" y="125" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">D max</text>
  <line x1="250" y1="40" x2="250" y2="230" stroke="#0c447c" stroke-width="1.5" marker-start="url(#dsAhs)" marker-end="url(#dsAh)"/>
  <text x="258" y="80" font-size="13" fill="#0c447c" font-weight="800">D min</text>
  <text x="40" y="252" font-size="11" fill="#3b6d11" font-weight="600">📐 Đo 4 đường kính (mỗi 45°) — tìm D max và D min</text>
  ${dsCaption('API 650 §7.5.4: D max − D min ≤ 1% × D nominal (≤25.4 mm)')}
</svg>`,

/* ===== ASME VIII §UG-80 Out-of-roundness ===== */
vessel_oor: () => `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">${DSDEFS}
  <circle cx="250" cy="140" r="100" fill="none" stroke="#0c447c" stroke-width="1.2" stroke-dasharray="6,3"/>
  <ellipse cx="250" cy="140" rx="105" ry="92" fill="url(#dsSteelG)" stroke="#5f6b7a" stroke-width="1.5"/>
  <ellipse cx="250" cy="140" rx="105" ry="92" fill="url(#dsHatch)" opacity="0.4"/>
  <text x="250" y="143" text-anchor="middle" font-size="12" fill="#1b2430" font-weight="700">BỒN ÁP LỰC</text>
  <line x1="145" y1="140" x2="355" y2="140" stroke="#aa4322" stroke-width="1.5" marker-start="url(#dsAhsR)" marker-end="url(#dsAhR)"/>
  <text x="250" y="132" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="700">D max (ngang)</text>
  <line x1="250" y1="48" x2="250" y2="232" stroke="#0c447c" stroke-width="1.5" marker-start="url(#dsAhs)" marker-end="url(#dsAh)"/>
  <text x="265" y="80" font-size="11" fill="#0c447c" font-weight="700">D min (đứng)</text>
  <g transform="translate(40,200)">
    <text font-size="11" fill="#1b2430" font-weight="700">Công thức ASME UG-80:</text>
    <text y="16" font-size="13" fill="#aa4322" font-weight="800">D max − D min ≤ 1% × D nominal</text>
  </g>
  ${dsCaption('ASME VIII Div.1 §UG-80(a) — Đối với bồn áp lực ngoài (ext. pressure): chặt hơn')}
</svg>`,

/* ===== ISO 5817 Quality levels B/C/D ===== */
weld_quality: () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${DSDEFS}
  <g transform="translate(20,50)">
    <rect x="0" y="0" width="145" height="160" fill="#fafcfe" stroke="#5f6b7a"/>
    <text x="72" y="22" text-anchor="middle" font-size="14" fill="#0f6e56" font-weight="800">CẤP B</text>
    <text x="72" y="38" text-anchor="middle" font-size="10" fill="#5f6b7a">Stringent — nghiêm</text>
    <rect x="20" y="55" width="105" height="20" fill="url(#dsSteelG)" stroke="#5f6b7a"/>
    <rect x="20" y="80" width="105" height="20" fill="url(#dsSteelG)" stroke="#5f6b7a"/>
    <path d="M 70 55 Q 78 45 86 55" fill="url(#weldBead)" stroke="#7c4a00" stroke-width="0.8"/>
    <text x="72" y="125" text-anchor="middle" font-size="10" fill="#1b2430" font-weight="700">Undercut ≤ 0.5 mm</text>
    <text x="72" y="140" text-anchor="middle" font-size="10" fill="#1b2430">Reinf ≤ 1+0.1b</text>
    <text x="72" y="155" text-anchor="middle" font-size="10" fill="#aa4322" font-weight="700">Mỏi cao, biến đổi tải</text>
  </g>
  <g transform="translate(180,50)">
    <rect x="0" y="0" width="145" height="160" fill="#fff7e0" stroke="#5f6b7a"/>
    <text x="72" y="22" text-anchor="middle" font-size="14" fill="#854f0b" font-weight="800">CẤP C</text>
    <text x="72" y="38" text-anchor="middle" font-size="10" fill="#5f6b7a">Intermediate — TB</text>
    <rect x="20" y="55" width="105" height="20" fill="url(#dsSteelG)" stroke="#5f6b7a"/>
    <rect x="20" y="80" width="105" height="20" fill="url(#dsSteelG)" stroke="#5f6b7a"/>
    <path d="M 65 55 Q 78 42 91 55" fill="url(#weldBead)" stroke="#7c4a00" stroke-width="0.8"/>
    <text x="72" y="125" text-anchor="middle" font-size="10" fill="#1b2430" font-weight="700">Undercut ≤ 0.5 mm</text>
    <text x="72" y="140" text-anchor="middle" font-size="10" fill="#1b2430">Reinf ≤ 1+0.15b</text>
    <text x="72" y="155" text-anchor="middle" font-size="10" fill="#854f0b" font-weight="700">Kết cấu thường (mặc định)</text>
  </g>
  <g transform="translate(340,50)">
    <rect x="0" y="0" width="145" height="160" fill="#fbeae2" stroke="#5f6b7a"/>
    <text x="72" y="22" text-anchor="middle" font-size="14" fill="#7a2024" font-weight="800">CẤP D</text>
    <text x="72" y="38" text-anchor="middle" font-size="10" fill="#5f6b7a">Moderate — vừa</text>
    <rect x="20" y="55" width="105" height="20" fill="url(#dsSteelG)" stroke="#5f6b7a"/>
    <rect x="20" y="80" width="105" height="20" fill="url(#dsSteelG)" stroke="#5f6b7a"/>
    <path d="M 60 55 Q 78 38 96 55" fill="url(#weldBead)" stroke="#7c4a00" stroke-width="0.8"/>
    <text x="72" y="125" text-anchor="middle" font-size="10" fill="#1b2430" font-weight="700">Undercut ≤ 1 mm (0.1t)</text>
    <text x="72" y="140" text-anchor="middle" font-size="10" fill="#1b2430">Reinf ≤ 1+0.25b</text>
    <text x="72" y="155" text-anchor="middle" font-size="10" fill="#7a2024" font-weight="700">Kết cấu phụ trợ</text>
  </g>
  ${dsCaption('ISO 5817:2023 — Chọn cấp theo loại tải · b=bề rộng mối hàn · t=chiều dày')}
</svg>`,

/* ===== TANK VERTICAL — Plumb */
tank_plumb: () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${DSDEFS}
  <rect x="20" y="240" width="460" height="20" fill="url(#concrete)" stroke="#5f6b7a"/>
  <g transform="translate(180,30) rotate(2 70 105)">
    <rect x="0" y="0" width="140" height="210" fill="url(#dsSteelG)" stroke="#5f6b7a" stroke-width="1.5"/>
    <rect x="0" y="0" width="140" height="210" fill="url(#dsHatch)" opacity="0.4"/>
    <ellipse cx="70" cy="0" rx="70" ry="8" fill="#9aa7b3" stroke="#5f6b7a" stroke-width="1"/>
    <ellipse cx="70" cy="210" rx="70" ry="8" fill="#888780" stroke="#5f6b7a" stroke-width="1"/>
  </g>
  <text x="250" y="160" text-anchor="middle" font-size="13" fill="#1b2430" font-weight="700">BỒN ĐỨNG</text>
  <line x1="250" y1="30" x2="250" y2="240" stroke="#0c447c" stroke-width="1.4" stroke-dasharray="6,4"/>
  <text x="247" y="28" text-anchor="end" font-size="11" fill="#0c447c" font-weight="700">tim đứng (lý thuyết)</text>
  <line x1="258" y1="40" x2="278" y2="40" stroke="#aa4322" stroke-width="2.5" marker-end="url(#dsAhR)"/>
  <text x="285" y="38" font-size="13" fill="#aa4322" font-weight="800">e</text>
  <text x="285" y="52" font-size="10" fill="#aa4322" font-weight="600">độ lệch đỉnh</text>
  ${dsDimV(30, 240, 425, 'H', '#0c447c')}
  <text x="50" y="275" font-size="11" fill="#3b6d11" font-weight="600">📐 Đo bằng laser theodolite hoặc quả dọi từ đỉnh shell xuống</text>
  ${dsCaption('API 650 §7.5.3 — e ≤ 1/200 H (= 25 mm cho bồn cao 5m)')}
</svg>`,

/* ===== TANK BOTTOM FLATNESS ===== */
tank_bottom: () => `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">${DSDEFS}
  <path d="M 40 180 Q 100 200 160 180 Q 220 165 280 185 Q 340 200 400 175 L 460 180" fill="none" stroke="#5f6b7a" stroke-width="15"/>
  <rect x="40" y="195" width="420" height="40" fill="url(#concrete)" stroke="#5f6b7a"/>
  <text x="80" y="220" font-size="11" fill="#fff" font-weight="700">NỀN MÓNG</text>
  <text x="250" y="100" text-anchor="middle" font-size="13" fill="#1b2430" font-weight="700">ĐÁY BỒN</text>
  <line x1="40" y1="160" x2="460" y2="160" stroke="#0c447c" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="50" y="153" font-size="11" fill="#0c447c">mặt phẳng lý thuyết</text>
  <line x1="220" y1="160" x2="220" y2="178" stroke="#aa4322" stroke-width="2.5"/>
  <text x="235" y="173" font-size="12" fill="#aa4322" font-weight="800">δ (lồi lên)</text>
  <line x1="335" y1="160" x2="335" y2="178" stroke="#aa4322" stroke-width="2.5"/>
  <text x="345" y="170" font-size="12" fill="#aa4322" font-weight="800">δ</text>
  ${dsDimH(40, 460, 130, 'Khoảng đo 3 m', '#0c447c')}
  ${dsCaption('API 650 §7.5.6 — δ ≤ 13 mm trên 3 m bất kỳ · ≤ 25 mm cho radial')}
</svg>`,

/* ===== TCVN — assembly tolerance ===== */
tcvn_assembly: () => `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">${DSDEFS}
  <rect x="60" y="60" width="380" height="160" fill="url(#dsSteelG)" stroke="#5f6b7a" stroke-width="1.5"/>
  <rect x="60" y="60" width="380" height="160" fill="url(#dsHatch)" opacity="0.4"/>
  <text x="250" y="145" text-anchor="middle" font-size="14" fill="#1b2430" font-weight="700">KẾT CẤU THÉP</text>
  <text x="250" y="165" text-anchor="middle" font-size="11" fill="#5f6b7a">(theo TCVN 5575:2012)</text>
  ${dsDimH(60, 440, 40, 'L (chiều dài)', '#0c447c')}
  ${dsDimV(60, 220, 470, 'H', '#0c447c')}
  <g transform="translate(80,235)">
    <text font-size="10" fill="#aa4322" font-weight="700">Dung sai chung TCVN:</text>
    <text y="13" font-size="10" fill="#1b2430">• L ≤ 6 m: ±5 mm · 6-15 m: ±10 mm · &gt;15 m: ±15 mm</text>
  </g>
  ${dsCaption('TCVN 5575:2012 + TCVN 170:2007 — Tuân thủ luật Việt Nam cho dự án trong nước')}
</svg>`,

none: () => ''
};
