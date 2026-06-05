/* Sketch SVG — Bản vẽ kỹ thuật mô tả CÁCH ĐO thực tế khi QC kiểm tra vật tư đầu vào.
   Style: steel hatching, dimension lines chuẩn ISO 129, caliper/micrometer/eke icon. */

/* Shared <defs>: hatching cho thép + arrow heads + caliper icon */
const DEFS = `<defs>
  <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <line x1="0" y1="0" x2="0" y2="6" stroke="#5f6b7a" stroke-width="0.6" opacity="0.5"/>
  </pattern>
  <pattern id="hatchD" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <line x1="0" y1="0" x2="0" y2="5" stroke="#2c2c2a" stroke-width="0.7" opacity="0.65"/>
  </pattern>
  <marker id="ah" markerWidth="9" markerHeight="7" refX="8.5" refY="3.5" orient="auto"><path d="M0,0 L9,3.5 L0,7 z" fill="#0c447c"/></marker>
  <marker id="ahs" markerWidth="9" markerHeight="7" refX="0.5" refY="3.5" orient="auto"><path d="M9,0 L0,3.5 L9,7 z" fill="#0c447c"/></marker>
  <marker id="ahR" markerWidth="9" markerHeight="7" refX="8.5" refY="3.5" orient="auto"><path d="M0,0 L9,3.5 L0,7 z" fill="#aa4322"/></marker>
  <marker id="ahsR" markerWidth="9" markerHeight="7" refX="0.5" refY="3.5" orient="auto"><path d="M9,0 L0,3.5 L9,7 z" fill="#aa4322"/></marker>
  <linearGradient id="steelG" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#e8ecf0"/><stop offset="0.5" stop-color="#cdd6df"/><stop offset="1" stop-color="#9aa7b3"/>
  </linearGradient>
  <linearGradient id="caliperJaw" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#888780"/><stop offset="1" stop-color="#5f5e5a"/>
  </linearGradient>
</defs>`;

/* Caliper icon — đầu kẹp ngoài đo đối tượng tại (x,y), chiều rộng w */
function caliperOuter(x, y, w){
  return `<g transform="translate(${x-w/2},${y-25})">
    <rect x="0" y="0" width="${w}" height="6" fill="url(#caliperJaw)" stroke="#2c2c2a" stroke-width="0.5"/>
    <rect x="0" y="6" width="6" height="18" fill="url(#caliperJaw)" stroke="#2c2c2a" stroke-width="0.5"/>
    <rect x="${w-6}" y="6" width="6" height="18" fill="url(#caliperJaw)" stroke="#2c2c2a" stroke-width="0.5"/>
  </g>`;
}

/* Dimension line chuẩn ISO 129: tick perpendicular ở 2 đầu */
function dimH(x1, x2, y, label, color){
  const c = color || '#0c447c';
  return `<g>
    <line x1="${x1}" y1="${y-4}" x2="${x1}" y2="${y+4}" stroke="${c}" stroke-width="1"/>
    <line x1="${x2}" y1="${y-4}" x2="${x2}" y2="${y+4}" stroke="${c}" stroke-width="1"/>
    <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${c}" stroke-width="1" marker-start="url(#ahs)" marker-end="url(#ah)"/>
    <text x="${(x1+x2)/2}" y="${y-7}" text-anchor="middle" font-size="12" fill="${c}" font-weight="700">${label}</text>
  </g>`;
}
function dimV(y1, y2, x, label, color){
  const c = color || '#0c447c';
  return `<g>
    <line x1="${x-4}" y1="${y1}" x2="${x+4}" y2="${y1}" stroke="${c}" stroke-width="1"/>
    <line x1="${x-4}" y1="${y2}" x2="${x+4}" y2="${y2}" stroke="${c}" stroke-width="1"/>
    <line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${c}" stroke-width="1" marker-start="url(#ahs)" marker-end="url(#ah)"/>
    <text x="${x+6}" y="${(y1+y2)/2+4}" font-size="12" fill="${c}" font-weight="700">${label}</text>
  </g>`;
}

/* Caption ở chân sketch */
function caption(text){
  return `<rect x="0" y="240" width="500" height="40" fill="#f4faf7" stroke="none"/>
    <text x="250" y="262" text-anchor="middle" font-size="11.5" fill="#0f6e56" font-weight="600">${text}</text>`;
}

window.VT_SKETCH = {

/* ===== TẤM (PLATE) ===== */
plate_thickness: () => `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <rect x="40" y="100" width="420" height="40" fill="url(#steelG)" stroke="#5f6b7a" stroke-width="1"/>
  <rect x="40" y="100" width="420" height="40" fill="url(#hatch)" opacity="0.6"/>
  <text x="250" y="125" text-anchor="middle" font-size="13" fill="#1b2430" font-weight="700">TẤM THÉP (mặt cắt)</text>
  <line x1="220" y1="80" x2="220" y2="160" stroke="#aa4322" stroke-width="1.5" stroke-dasharray="3,3"/>
  <line x1="280" y1="80" x2="280" y2="160" stroke="#aa4322" stroke-width="1.5" stroke-dasharray="3,3"/>
  <text x="250" y="73" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="700">VỊ TRÍ ĐO</text>
  ${caliperOuter(250, 100, 60)}
  ${dimV(100, 140, 180, 't', '#0c447c')}
  <text x="125" y="200" font-size="11" fill="#3b6d11" font-weight="600">📐 Đo cách mép ≥ 25 mm — 5 điểm/tấm — lấy trung bình</text>
  <text x="125" y="218" font-size="11" fill="#3b6d11" font-weight="600">🛠 Dụng cụ: micrometer (chính xác 0.01 mm)</text>
  ${caption('EN 10029 §7 · ASTM A6 §13 — Đo đúng chỗ là nguyên tắc tối quan trọng')}
</svg>`,

plate_flatness: () => `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <path d="M 40 165 Q 250 138 460 165 L 460 195 L 40 195 Z" fill="url(#steelG)" stroke="#5f6b7a" stroke-width="1"/>
  <path d="M 40 165 Q 250 138 460 165 L 460 195 L 40 195 Z" fill="url(#hatch)" opacity="0.5"/>
  <text x="250" y="186" text-anchor="middle" font-size="11" fill="#1b2430" font-weight="600">TẤM (bị vênh nhẹ)</text>
  <line x1="40" y1="148" x2="460" y2="148" stroke="#1b2430" stroke-width="4"/>
  <rect x="38" y="143" width="10" height="14" fill="#5f5e5a"/>
  <rect x="452" y="143" width="10" height="14" fill="#5f5e5a"/>
  <text x="100" y="138" font-size="12" fill="#0c447c" font-weight="700">THƯỚC THẲNG (≥ 1000 mm)</text>
  <line x1="250" y1="148" x2="250" y2="138" stroke="#aa4322" stroke-width="2.5"/>
  <line x1="245" y1="138" x2="255" y2="138" stroke="#aa4322" stroke-width="2"/>
  <text x="295" y="135" font-size="13" fill="#aa4322" font-weight="700">Δ max</text>
  <g transform="translate(310,115)">
    <rect x="0" y="0" width="60" height="3" fill="#888780"/>
    <line x1="3" y1="3" x2="3" y2="12" stroke="#5f5e5a" stroke-width="2"/>
    <line x1="13" y1="3" x2="13" y2="14" stroke="#5f5e5a" stroke-width="2"/>
    <line x1="23" y1="3" x2="23" y2="16" stroke="#5f5e5a" stroke-width="2"/>
    <text x="68" y="13" font-size="10" fill="#5f5e5a">căn lá feeler</text>
  </g>
  <text x="40" y="222" font-size="11" fill="#3b6d11" font-weight="600">📐 Đặt thước thẳng trên mặt tấm. Đo khe lớn nhất bằng căn lá (feeler gauge)</text>
  <text x="40" y="238" font-size="11" fill="#3b6d11" font-weight="600">🛠 Dụng cụ: thước thẳng phẳng + bộ căn lá 0.05-3 mm</text>
  ${caption('EN 10029 §8 — Class N (chuẩn) hoặc Class S (chặt hơn 50%)')}
</svg>`,

plate_squareness: () => `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <rect x="100" y="50" width="300" height="160" fill="url(#steelG)" stroke="#5f6b7a" stroke-width="1.5"/>
  <rect x="100" y="50" width="300" height="160" fill="url(#hatch)" opacity="0.45"/>
  <line x1="100" y1="50" x2="400" y2="210" stroke="#aa4322" stroke-width="2.5"/>
  <line x1="400" y1="50" x2="100" y2="210" stroke="#0c447c" stroke-width="2.5"/>
  <circle cx="100" cy="50" r="4" fill="#1b2430"/>
  <circle cx="400" cy="50" r="4" fill="#1b2430"/>
  <circle cx="100" cy="210" r="4" fill="#1b2430"/>
  <circle cx="400" cy="210" r="4" fill="#1b2430"/>
  <text x="250" y="38" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">d1</text>
  <text x="250" y="225" text-anchor="middle" font-size="13" fill="#0c447c" font-weight="800">d2</text>
  <text x="250" y="135" text-anchor="middle" font-size="15" fill="#1b2430" font-weight="800">Δ = |d1 − d2|</text>
  <text x="100" y="248" font-size="11" fill="#3b6d11" font-weight="600">📐 Đo 2 đường chéo bằng thước cuộn — chênh lệch nhỏ = tấm vuông</text>
  ${caption('Áp dụng: tấm trên 2 m × 2 m — chuyên gia làm 4 điểm góc trước')}
</svg>`,

/* ===== I/H SECTION ===== */
i_section_dims: () => `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <rect x="170" y="60" width="160" height="20" fill="url(#steelG)" stroke="#5f6b7a" stroke-width="1"/>
  <rect x="170" y="60" width="160" height="20" fill="url(#hatch)" opacity="0.5"/>
  <rect x="170" y="220" width="160" height="20" fill="url(#steelG)" stroke="#5f6b7a" stroke-width="1"/>
  <rect x="170" y="220" width="160" height="20" fill="url(#hatch)" opacity="0.5"/>
  <rect x="240" y="80" width="20" height="140" fill="url(#steelG)" stroke="#5f6b7a" stroke-width="1"/>
  <rect x="240" y="80" width="20" height="140" fill="url(#hatch)" opacity="0.5"/>
  ${dimH(170, 330, 40, 'b', '#0c447c')}
  ${dimV(60, 240, 370, 'h', '#0c447c')}
  ${dimV(60, 80, 145, 'tf', '#3b6d11')}
  ${dimH(240, 260, 150, 'tw', '#aa4322')}
  <circle cx="170" cy="60" r="3" fill="#aa4322"/>
  <circle cx="330" cy="60" r="3" fill="#aa4322"/>
  <circle cx="240" cy="80" r="3" fill="#aa4322"/>
  <circle cx="260" cy="80" r="3" fill="#aa4322"/>
  <text x="40" y="270" font-size="11" fill="#3b6d11" font-weight="600">📐 Đo b, h, tf, tw bằng caliper tại 3 vị trí: 2 đầu + giữa thanh — lấy trung bình</text>
  <text x="40" y="288" font-size="11" fill="#3b6d11" font-weight="600">🛠 Caliper số (digital vernier) 0-300 mm, độ chính xác 0.02 mm</text>
  ${caption('EN 10034:1993 Table 1 — Đo tại 1 m từ đầu thanh để tránh khuyết tật đầu nóng')}
</svg>`,

i_out_of_square: () => `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <rect x="160" y="50" width="200" height="20" fill="url(#steelG)" stroke="#5f6b7a"/>
  <rect x="160" y="50" width="200" height="20" fill="url(#hatch)" opacity="0.5"/>
  <rect x="160" y="220" width="200" height="20" fill="url(#steelG)" stroke="#5f6b7a"/>
  <rect x="160" y="220" width="200" height="20" fill="url(#hatch)" opacity="0.5"/>
  <rect x="246" y="70" width="18" height="150" fill="url(#steelG)" stroke="#5f6b7a"/>
  <rect x="246" y="70" width="18" height="150" fill="url(#hatch)" opacity="0.5"/>
  <g stroke="#0c447c" stroke-width="3" fill="none">
    <line x1="100" y1="70" x2="100" y2="220"/>
    <line x1="100" y1="70" x2="155" y2="70"/>
  </g>
  <rect x="98" y="68" width="7" height="7" fill="#0c447c"/>
  <text x="65" y="148" font-size="11" fill="#0c447c" font-weight="700">EKE 90°</text>
  <line x1="360" y1="50" x2="380" y2="50" stroke="#aa4322" stroke-width="3" marker-end="url(#ahR)"/>
  <text x="385" y="48" font-size="12" fill="#aa4322" font-weight="800">k₁</text>
  <line x1="360" y1="240" x2="380" y2="240" stroke="#aa4322" stroke-width="3" marker-end="url(#ahR)"/>
  <text x="385" y="247" font-size="12" fill="#aa4322" font-weight="800">k₂</text>
  <text x="40" y="270" font-size="11" fill="#3b6d11" font-weight="600">📐 Áp eke vuông vào bụng. Đo khoảng cách k₁ + k₂ ở mép cánh xa</text>
  <text x="40" y="288" font-size="11" fill="#3b6d11" font-weight="600">🛠 Eke kim loại + thước căn lá hoặc thước thẳng có chia li</text>
  ${caption('EN 10034 Table 2 — k₁+k₂ ≤ 2% × b (tối thiểu 6.5 mm)')}
</svg>`,

i_web_offcenter: () => `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <rect x="130" y="60" width="240" height="22" fill="url(#steelG)" stroke="#5f6b7a"/>
  <rect x="130" y="60" width="240" height="22" fill="url(#hatch)" opacity="0.5"/>
  <rect x="130" y="200" width="240" height="22" fill="url(#steelG)" stroke="#5f6b7a"/>
  <rect x="130" y="200" width="240" height="22" fill="url(#hatch)" opacity="0.5"/>
  <rect x="280" y="82" width="18" height="118" fill="url(#steelG)" stroke="#aa4322" stroke-width="2"/>
  <rect x="280" y="82" width="18" height="118" fill="url(#hatch)" opacity="0.5"/>
  <line x1="250" y1="40" x2="250" y2="245" stroke="#0c447c" stroke-width="1.2" stroke-dasharray="6,3"/>
  <text x="245" y="35" text-anchor="end" font-size="11" fill="#0c447c" font-weight="600">tim cánh (lý thuyết)</text>
  <line x1="289" y1="40" x2="289" y2="245" stroke="#aa4322" stroke-width="1.2" stroke-dasharray="6,3"/>
  <text x="295" y="35" font-size="11" fill="#aa4322" font-weight="600">tim bụng (thực)</text>
  ${dimH(250, 289, 140, 'e', '#aa4322')}
  <text x="40" y="270" font-size="11" fill="#3b6d11" font-weight="600">📐 Đo từ tim cánh đến tim bụng (e) bằng caliper hoặc thước cuộn</text>
  <text x="40" y="288" font-size="11" fill="#3b6d11" font-weight="600">⚠ Web lệch → khi hàn dễ tạo ứng suất lệch tâm, kết cấu yếu ngang</text>
  ${caption('EN 10034 Table 2 — b<110 → e ≤ 2.5 mm · b≥110 → e ≤ 3.5 mm')}
</svg>`,

i_straightness: () => `<svg viewBox="0 0 500 270" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <path d="M 40 110 Q 250 75 460 110 L 460 135 Q 250 100 40 135 Z" fill="url(#steelG)" stroke="#5f6b7a" stroke-width="1"/>
  <path d="M 40 110 Q 250 75 460 110 L 460 135 Q 250 100 40 135 Z" fill="url(#hatch)" opacity="0.45"/>
  <text x="250" y="160" text-anchor="middle" font-size="11" fill="#5f6b7a" font-weight="600">THANH I (mặt bên — bị cong/võng)</text>
  <line x1="40" y1="135" x2="460" y2="135" stroke="#0c447c" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="55" y="153" font-size="11" fill="#0c447c">đường tim lý thuyết (thẳng)</text>
  <line x1="250" y1="135" x2="250" y2="93" stroke="#aa4322" stroke-width="2.5" marker-end="url(#ahsR)"/>
  <text x="268" y="113" font-size="13" fill="#aa4322" font-weight="800">f (camber)</text>
  ${dimH(40, 460, 190, 'L (toàn chiều dài)', '#0c447c')}
  <text x="40" y="220" font-size="11" fill="#3b6d11" font-weight="600">📐 Căng dây thép từ 2 đầu, đo võng giữa = f. Hoặc đặt trên thước thẳng</text>
  <text x="40" y="237" font-size="11" fill="#3b6d11" font-weight="600">🛠 Dây thép φ0.5 + bộ đệm bằng nhau ở 2 đầu + thước căn lá</text>
  ${caption('EN 10034 — h≤180 → f ≤ 0.30%L · 180<h≤360 → 0.15%L · h>360 → 0.10%L')}
</svg>`,

/* ===== THÉP GÓC ===== */
angle_leg: () => `<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <polygon points="140,50 165,50 165,200 290,200 290,225 140,225" fill="url(#steelG)" stroke="#5f6b7a" stroke-width="1"/>
  <polygon points="140,50 165,50 165,200 290,200 290,225 140,225" fill="url(#hatch)" opacity="0.5"/>
  ${dimV(50, 225, 110, 'L₁', '#0c447c')}
  ${dimH(140, 290, 255, 'L₂', '#0c447c')}
  <path d="M 165 100 A 50 50 0 0 0 215 50" fill="none" stroke="#aa4322" stroke-width="2"/>
  <text x="215" y="93" font-size="13" fill="#aa4322" font-weight="800">α = 90° ± 30'</text>
  <g transform="translate(330,140)">
    <rect x="0" y="0" width="40" height="60" fill="none" stroke="#1b2430" stroke-width="1.2"/>
    <text x="20" y="20" text-anchor="middle" font-size="9" fill="#1b2430" font-weight="700">BEVEL</text>
    <text x="20" y="35" text-anchor="middle" font-size="9" fill="#1b2430" font-weight="700">PROTRACTOR</text>
    <line x1="20" y1="40" x2="20" y2="55" stroke="#aa4322" stroke-width="1.5"/>
    <line x1="20" y1="55" x2="35" y2="55" stroke="#aa4322" stroke-width="1.5"/>
  </g>
  <text x="40" y="275" font-size="11" fill="#3b6d11" font-weight="600">📐 Đo L₁, L₂ bằng caliper từ góc tới đầu cạnh. Góc α bằng bevel protractor</text>
  ${caption('EN 10056-2 Table 1 — Cạnh ≤50 mm: ±1.0 · ≤100: ±2.0 · ≤150: ±3.0 · >150: ±4.0')}
</svg>`,

/* ===== HSS / TUBE ===== */
hss_outside: () => `<svg viewBox="0 0 500 310" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <rect x="150" y="60" width="200" height="140" fill="url(#steelG)" stroke="#5f6b7a" stroke-width="1.5"/>
  <rect x="150" y="60" width="200" height="140" fill="url(#hatch)" opacity="0.5"/>
  <rect x="162" y="72" width="176" height="116" fill="#fafcfe" stroke="#5f6b7a" stroke-width="0.5"/>
  ${dimH(150, 350, 38, 'B', '#0c447c')}
  ${dimV(60, 200, 370, 'H', '#0c447c')}
  <line x1="155" y1="66" x2="155" y2="195" stroke="#aa4322" stroke-width="0.8" stroke-dasharray="2,2"/>
  <line x1="345" y1="66" x2="345" y2="195" stroke="#aa4322" stroke-width="0.8" stroke-dasharray="2,2"/>
  ${dimH(150, 162, 80, 't', '#aa4322')}
  <g stroke="#1b2430" stroke-width="0.5" fill="#888780">
    <rect x="138" y="58" width="6" height="14"/>
    <rect x="138" y="186" width="6" height="14"/>
    <rect x="356" y="58" width="6" height="14"/>
    <rect x="356" y="186" width="6" height="14"/>
  </g>
  <text x="125" y="115" text-anchor="end" font-size="11" fill="#aa4322" font-weight="700">4 điểm</text>
  <text x="125" y="128" text-anchor="end" font-size="11" fill="#aa4322" font-weight="700">đo dày</text>
  <text x="40" y="240" font-size="11" fill="#3b6d11" font-weight="600">📐 Đo B, H bằng caliper TẠI 4 VỊ TRÍ trên chiều dài (đầu + 1/4 + giữa + 3/4)</text>
  <text x="40" y="258" font-size="11" fill="#3b6d11" font-weight="600">📐 Đo dày t tại 4 góc bằng micrometer hoặc UT (vì cản trở bên trong)</text>
  ${caption('EN 10210-2 / EN 10219-2 / ASTM A500 — Sai lệch cạnh ±1% · dày −10%/+không yêu cầu')}
</svg>`,

hss_twist: () => `<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <rect x="30" y="80" width="440" height="80" fill="#fafcfe" stroke="#5f6b7a" stroke-width="1"/>
  <text x="50" y="100" font-size="11" fill="#5f6b7a" font-weight="700">BÀN PHẲNG (surface plate)</text>
  <rect x="30" y="155" width="440" height="6" fill="#888780"/>
  <g transform="translate(50,115)">
    <rect x="0" y="0" width="380" height="40" fill="url(#steelG)" stroke="#5f6b7a" stroke-width="1" transform="rotate(-1.5)"/>
    <rect x="0" y="0" width="380" height="40" fill="url(#hatch)" opacity="0.5" transform="rotate(-1.5)"/>
    <text x="190" y="25" text-anchor="middle" font-size="12" fill="#1b2430" font-weight="700">HSS (bị xoắn)</text>
  </g>
  <circle cx="50" cy="161" r="5" fill="#3b6d11"/>
  <text x="40" y="180" text-anchor="middle" font-size="11" fill="#3b6d11" font-weight="700">đặt sát</text>
  <line x1="430" y1="161" x2="430" y2="145" stroke="#aa4322" stroke-width="3"/>
  <text x="445" y="155" font-size="13" fill="#aa4322" font-weight="800">Δ</text>
  <g transform="translate(440,165)">
    <rect x="0" y="0" width="40" height="3" fill="#888780"/>
    <line x1="3" y1="3" x2="3" y2="13" stroke="#5f5e5a" stroke-width="2"/>
    <line x1="13" y1="3" x2="13" y2="11" stroke="#5f5e5a" stroke-width="2"/>
  </g>
  <text x="40" y="220" font-size="11" fill="#3b6d11" font-weight="600">📐 Đặt 1 đầu HSS sát bàn phẳng. Đo khe hở ở đầu kia bằng feeler</text>
  <text x="40" y="238" font-size="11" fill="#3b6d11" font-weight="600">🛠 Bàn phẳng cấp 1 + căn lá. Hoặc dùng dial gauge trên bệ chuyển dịch</text>
  ${caption('EN 10210-2 Table B.3 — Twist ≤ 2 mm + 0.5 mm/m chiều dài')}
</svg>`,

hss_squareness: () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <rect x="160" y="60" width="200" height="170" fill="url(#steelG)" stroke="#5f6b7a" stroke-width="1.5"/>
  <rect x="160" y="60" width="200" height="170" fill="url(#hatch)" opacity="0.45"/>
  <rect x="172" y="72" width="176" height="146" fill="#fff"/>
  <g stroke="#0c447c" stroke-width="2.5" fill="none">
    <line x1="90" y1="60" x2="90" y2="230"/>
    <line x1="90" y1="60" x2="160" y2="60"/>
  </g>
  <rect x="86" y="56" width="9" height="9" fill="#0c447c"/>
  <text x="55" y="148" font-size="11" fill="#0c447c" font-weight="700">EKE</text>
  <path d="M 165 76 A 18 18 0 0 0 178 60" fill="none" stroke="#aa4322" stroke-width="2"/>
  <text x="210" y="65" font-size="13" fill="#aa4322" font-weight="800">≤ 1°</text>
  <text x="210" y="80" font-size="11" fill="#aa4322" font-weight="600">(90° ± 1°)</text>
  <text x="40" y="255" font-size="11" fill="#3b6d11" font-weight="600">📐 Áp eke vào 1 cạnh → đo độ hở/lệch ở cạnh vuông góc</text>
  ${caption('EN 10210-2 / EN 10219-2 — Squareness ≤ ±1°')}
</svg>`,

spec_chemistry: () => `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <rect x="30" y="30" width="440" height="200" fill="#fff" stroke="#5f6b7a" stroke-width="1.2"/>
  <rect x="30" y="30" width="440" height="30" fill="#0c447c"/>
  <text x="250" y="50" text-anchor="middle" font-size="13" fill="#fff" font-weight="700">PHÂN TÍCH HOÁ HỌC — SPECTROMETER</text>
  <g font-size="11" fill="#1b2430">
    <text x="50" y="80" font-weight="700">Nguyên tố</text>
    <text x="180" y="80" font-weight="700">Đo được</text>
    <text x="290" y="80" font-weight="700">Yêu cầu</text>
    <text x="410" y="80" font-weight="700">Kết quả</text>
    <line x1="40" y1="86" x2="460" y2="86" stroke="#dfe5ec"/>
    <text x="50" y="108">Carbon C</text><text x="180" y="108">0.18 %</text><text x="290" y="108">≤ 0.20 %</text><text x="410" y="108" fill="#0f6e56" font-weight="700">✓ ĐẠT</text>
    <text x="50" y="128">Mangan Mn</text><text x="180" y="128">1.42 %</text><text x="290" y="128">≤ 1.60 %</text><text x="410" y="128" fill="#0f6e56" font-weight="700">✓ ĐẠT</text>
    <text x="50" y="148">Lưu huỳnh S</text><text x="180" y="148">0.012 %</text><text x="290" y="148">≤ 0.025 %</text><text x="410" y="148" fill="#0f6e56" font-weight="700">✓ ĐẠT</text>
    <text x="50" y="168">Phốt pho P</text><text x="180" y="168">0.018 %</text><text x="290" y="168">≤ 0.025 %</text><text x="410" y="168" fill="#0f6e56" font-weight="700">✓ ĐẠT</text>
    <text x="50" y="188">Silic Si</text><text x="180" y="188">0.38 %</text><text x="290" y="188">≤ 0.55 %</text><text x="410" y="188" fill="#0f6e56" font-weight="700">✓ ĐẠT</text>
    <text x="50" y="208">Nito N</text><text x="180" y="208">0.008 %</text><text x="290" y="208">≤ 0.012 %</text><text x="410" y="208" fill="#0f6e56" font-weight="700">✓ ĐẠT</text>
  </g>
  ${caption('So từng nguyên tố với spec — KHÔNG được bỏ qua nguyên tố nào')}
</svg>`,

spec_mech: () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <line x1="40" y1="60" x2="40" y2="220" stroke="#1b2430" stroke-width="1.5" marker-start="url(#ahs)"/>
  <line x1="40" y1="220" x2="460" y2="220" stroke="#1b2430" stroke-width="1.5" marker-end="url(#ah)"/>
  <text x="20" y="55" font-size="11" fill="#1b2430" font-weight="700">σ (MPa)</text>
  <text x="470" y="215" font-size="11" fill="#1b2430" font-weight="700">ε (%)</text>
  <path d="M 40 220 L 80 90 L 110 80 Q 140 78 200 95 Q 280 120 360 175 L 400 220" fill="none" stroke="#185fa5" stroke-width="2.5"/>
  <circle cx="80" cy="90" r="4" fill="#aa4322"/>
  <text x="90" y="85" font-size="11" fill="#aa4322" font-weight="700">Yield ReH</text>
  <text x="90" y="100" font-size="10" fill="#aa4322">≥ 355 MPa (S355)</text>
  <circle cx="200" cy="95" r="4" fill="#0f6e56"/>
  <text x="210" y="91" font-size="11" fill="#0f6e56" font-weight="700">Tensile Rm</text>
  <text x="210" y="106" font-size="10" fill="#0f6e56">470-630 MPa</text>
  <text x="365" y="240" font-size="11" fill="#aa4322" font-weight="700">A = elongation ≥ 22%</text>
  ${caption('ISO 6892 / ASTM E8 — Phải có cert kèm sample location')}
</svg>`,

spec_charpy: () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <ellipse cx="120" cy="150" rx="60" ry="70" fill="none" stroke="#5f6b7a" stroke-width="2"/>
  <line x1="120" y1="80" x2="120" y2="60" stroke="#5f6b7a" stroke-width="2"/>
  <rect x="105" y="40" width="30" height="22" fill="url(#steelG)" stroke="#5f6b7a"/>
  <line x1="120" y1="150" x2="120" y2="170" stroke="#aa4322" stroke-width="3"/>
  <polygon points="120,170 110,175 130,175" fill="#aa4322"/>
  <text x="200" y="60" font-size="13" fill="#1b2430" font-weight="700">CHARPY V-NOTCH</text>
  <text x="200" y="78" font-size="11" fill="#5f6b7a">Búa đập — đo năng lượng hấp thụ</text>
  <g transform="translate(290,110)">
    <rect x="0" y="0" width="120" height="40" fill="url(#steelG)" stroke="#1b2430" stroke-width="1.2"/>
    <rect x="0" y="0" width="120" height="40" fill="url(#hatchD)" opacity="0.4"/>
    <polygon points="60,0 56,8 64,8" fill="#aa4322"/>
    <text x="60" y="55" text-anchor="middle" font-size="10" fill="#aa4322" font-weight="700">notch V 45° × 2mm</text>
    <text x="60" y="-8" text-anchor="middle" font-size="11" fill="#1b2430" font-weight="700">10 × 10 × 55 mm</text>
  </g>
  <text x="200" y="200" font-size="12" fill="#1b2430" font-weight="700">Yêu cầu (S355J2):</text>
  <text x="200" y="218" font-size="12" fill="#aa4322" font-weight="700">≥ 27 J @ −20°C (3 mẫu, TB)</text>
  ${caption('ISO 148-1 / ASTM E23 — Bắt buộc cho thép ngoài trời, mác J2/K2/L có dấu này')}
</svg>`,

cert_doc: () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <rect x="60" y="20" width="380" height="240" fill="#fff" stroke="#5f6b7a" stroke-width="1.2"/>
  <rect x="60" y="20" width="380" height="38" fill="#3b6d11"/>
  <text x="250" y="44" text-anchor="middle" font-size="13" fill="#fff" font-weight="700">MILL TEST CERTIFICATE — EN 10204 §3.1</text>
  <g font-size="11" fill="#1b2430">
    <text x="80" y="78" font-weight="700">Heat No.:</text>
    <text x="170" y="78" font-weight="800" fill="#aa4322">2024-1156-A</text>
    <text x="290" y="78" font-weight="700">Mác:</text>
    <text x="335" y="78" font-weight="800">S355J2+N</text>
    <text x="80" y="96">Kích thước: 12 × 1500 × 6000 mm · 10 tấm</text>
    <text x="80" y="124" font-weight="700" fill="#0c447c">Hoá học (%)</text>
    <text x="80" y="143">C 0.18 · Mn 1.42 · Si 0.38 · P 0.018 · S 0.012 · Cu 0.21 · N 0.008</text>
    <text x="80" y="165" font-weight="700" fill="#0c447c">Cơ tính</text>
    <text x="80" y="183">ReH 378 MPa · Rm 545 MPa · A 26% · CVN -20°C: 65/70/62 J</text>
    <text x="80" y="205" font-weight="700" fill="#0c447c">Xử lý nhiệt</text>
    <text x="80" y="223">Normalizing 920°C · Air cooled</text>
  </g>
  <g transform="translate(330,178)">
    <circle r="32" fill="none" stroke="#aa4322" stroke-width="1.5"/>
    <text y="-5" text-anchor="middle" font-size="10" fill="#aa4322" font-weight="800">QC INDEP.</text>
    <text y="10" text-anchor="middle" font-size="10" fill="#aa4322" font-weight="800">SIGNED</text>
  </g>
  ${caption('Heat No. PHẢI trùng mác in trên từng tấm — không trùng → trả về NM')}
</svg>`,

cert_21: () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <rect x="60" y="20" width="380" height="240" fill="#fff" stroke="#5f6b7a" stroke-width="1.2"/>
  <rect x="60" y="20" width="380" height="38" fill="#b4b2a9"/>
  <text x="250" y="44" text-anchor="middle" font-size="13" fill="#fff" font-weight="700">DECLARATION — EN 10204 §2.1</text>
  <g font-size="11" fill="#1b2430">
    <text x="80" y="80" font-weight="700">Loại đơn giản nhất — chỉ cam kết</text>
    <text x="80" y="105">"Sản phẩm phù hợp đơn hàng" — KHÔNG kèm bất kỳ kết quả test nào</text>
    <text x="80" y="135" font-weight="700" fill="#aa4322">⚠ Hầu như KHÔNG có giá trị kiểm chứng</text>
    <text x="80" y="160" font-weight="700" fill="#0c447c">Khi dùng:</text>
    <text x="80" y="180">• Vật tư không chịu lực: vòng đệm, đinh ốc thường</text>
    <text x="80" y="197">• Tem dán, sơn lót, vật liệu phụ</text>
    <text x="80" y="220" font-weight="700" fill="#aa4322">TUYỆT ĐỐI không dùng cho thép kết cấu chính</text>
  </g>
  ${caption('Bậc thấp nhất — chỉ là tuyên bố không kèm bằng chứng')}
</svg>`,

cert_2x: () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <rect x="60" y="20" width="380" height="240" fill="#fff" stroke="#5f6b7a" stroke-width="1.2"/>
  <rect x="60" y="20" width="380" height="38" fill="#888780"/>
  <text x="250" y="44" text-anchor="middle" font-size="13" fill="#fff" font-weight="700">TEST REPORT — EN 10204 §2.2</text>
  <g font-size="11" fill="#1b2430">
    <text x="80" y="80" font-weight="700">PHI-cụ thể (non-specific)</text>
    <text x="80" y="100">Số liệu test TRUNG BÌNH lô sản xuất, KHÔNG kèm heat number</text>
    <text x="80" y="125" font-weight="700" fill="#aa4322">⚠ KHÔNG truy xuất được heat cụ thể</text>
    <text x="80" y="150" font-weight="700" fill="#0c447c">Khi nào dùng:</text>
    <text x="80" y="170">• Vật tư phụ trợ (bracket, gusset không chịu lực)</text>
    <text x="80" y="187">• Bu lông cấp thường không yêu cầu trace</text>
    <text x="80" y="220" font-weight="700" fill="#aa4322">KHÔNG dùng cho kết cấu chính EN 1090 EXC2+</text>
  </g>
  ${caption('Hiếm dùng ở Việt Nam — chỉ ASTM cho phép với vật tư phụ')}
</svg>`,

cert_3x: () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <rect x="60" y="20" width="380" height="240" fill="#fff" stroke="#5f6b7a" stroke-width="1.2"/>
  <rect x="60" y="20" width="380" height="38" fill="#aa4322"/>
  <text x="250" y="44" text-anchor="middle" font-size="13" fill="#fff" font-weight="700">INSPECTION CERT — EN 10204 §3.2 (3rd party)</text>
  <g font-size="11" fill="#1b2430">
    <text x="80" y="80">Như §3.1 — kết quả test thực tế trên từng heat</text>
    <text x="80" y="100" font-weight="700" fill="#aa4322">+ Được CHỨNG KIẾN bởi bên thứ 3 độc lập:</text>
    <g font-size="11" fill="#0c447c" font-weight="600">
      <text x="100" y="125">• Lloyd's Register (LR)</text>
      <text x="100" y="143">• Bureau Veritas (BV)</text>
      <text x="100" y="161">• SGS</text>
      <text x="100" y="179">• TÜV Süd / TÜV Rheinland</text>
      <text x="100" y="197">• DNV-GL</text>
    </g>
    <text x="80" y="225" font-weight="700">Khi dùng: áp lực cao, nuclear, marine, EN 1090 EXC3+, ASME §VIII</text>
  </g>
  ${caption('§3.2 = §3.1 + dấu/chữ ký bên thứ 3 — đắt nhất, chỉ dùng khi bắt buộc')}
</svg>`,

surface_rust: () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <rect x="20" y="50" width="105" height="105" fill="#9aa7b3" stroke="#5f6b7a"/>
  <rect x="135" y="50" width="105" height="105" fill="#a07a52" stroke="#5f6b7a"/>
  <rect x="250" y="50" width="105" height="105" fill="#7c4a2e" stroke="#5f6b7a"/>
  <rect x="365" y="50" width="105" height="105" fill="#4a2c1a" stroke="#5f6b7a"/>
  <g fill="#1b2430" font-size="13" font-weight="800" text-anchor="middle">
    <text x="72" y="40">A</text><text x="187" y="40">B</text>
    <text x="302" y="40">C</text><text x="417" y="40">D</text>
  </g>
  <g fill="#1b2430" font-size="11" font-weight="600" text-anchor="middle">
    <text x="72" y="175">Vảy cán nguyên</text>
    <text x="187" y="175">Vảy bong + gỉ đốm</text>
    <text x="302" y="175">Gỉ phủ toàn bộ</text>
    <text x="417" y="175">RỖ ăn mòn ⚠</text>
  </g>
  <g fill="#0c447c" font-size="11" font-weight="700" text-anchor="middle">
    <text x="72" y="205">→ Sa 2½</text><text x="187" y="205">→ Sa 2½</text>
    <text x="302" y="205">→ Sa 2½/3</text><text x="417" y="205" fill="#aa4322">→ UT + Sa 3</text>
  </g>
  <text x="40" y="235" font-size="11" fill="#3b6d11" font-weight="600">📐 So với ảnh chuẩn ISO 8501-1. Chụp ảnh kèm thước/coin để báo cáo</text>
  ${caption('Cấp D bắt buộc đo UT chiều dày trước khi nhận — giảm >10% → loại bỏ')}
</svg>`,

surface_profile: () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <line x1="40" y1="115" x2="460" y2="115" stroke="#0c447c" stroke-width="0.8" stroke-dasharray="3,2"/>
  <text x="50" y="110" font-size="10" fill="#0c447c">đỉnh (peak)</text>
  <line x1="40" y1="180" x2="460" y2="180" stroke="#0c447c" stroke-width="0.8" stroke-dasharray="3,2"/>
  <text x="50" y="195" font-size="10" fill="#0c447c">đáy (valley)</text>
  <path d="M 40 150 L 70 118 L 100 165 L 130 122 L 160 173 L 190 120 L 220 168 L 250 115 L 280 175 L 310 122 L 340 168 L 370 115 L 400 175 L 430 122 L 460 158" fill="none" stroke="#1b2430" stroke-width="2"/>
  <rect x="40" y="180" width="420" height="35" fill="url(#hatchD)" opacity="0.5"/>
  <text x="100" y="205" font-size="11" fill="#5f6b7a" font-weight="700">THÉP NỀN</text>
  ${dimV(115, 180, 250, 'Rz', '#aa4322')}
  <text x="40" y="248" font-size="11" fill="#3b6d11" font-weight="600">📐 Đo Rz bằng profile gauge / replica tape trong 5 vị trí</text>
  ${caption('ISO 8503 — Sơn epoxy: Rz 50-80 µm · zinc-rich: 40-65 µm')}
</svg>`,

ut_plate: () => `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <rect x="40" y="120" width="420" height="70" fill="url(#steelG)" stroke="#5f6b7a" stroke-width="1"/>
  <rect x="40" y="120" width="420" height="70" fill="url(#hatch)" opacity="0.5"/>
  <text x="250" y="160" text-anchor="middle" font-size="13" fill="#1b2430" font-weight="700">TẤM THÉP</text>
  <ellipse cx="200" cy="160" rx="8" ry="3" fill="#aa4322" opacity="0.7"/>
  <text x="220" y="158" font-size="10" fill="#aa4322" font-weight="700">khuyết tật lamination</text>
  <g transform="translate(225,75)">
    <rect x="0" y="0" width="60" height="40" fill="#534ab7" stroke="#26215c" stroke-width="1.5" rx="3"/>
    <rect x="6" y="-20" width="48" height="22" fill="#534ab7" stroke="#26215c" stroke-width="1.5" rx="2"/>
    <text x="30" y="22" text-anchor="middle" font-size="10" fill="#fff" font-weight="700">PROBE UT</text>
    <text x="30" y="34" text-anchor="middle" font-size="8" fill="#fff">5 MHz</text>
  </g>
  <line x1="245" y1="118" x2="245" y2="190" stroke="#aa4322" stroke-width="1" stroke-dasharray="2,2"/>
  <line x1="265" y1="118" x2="265" y2="190" stroke="#aa4322" stroke-width="1" stroke-dasharray="2,2"/>
  <text x="290" y="153" font-size="10" fill="#aa4322" font-weight="700">sóng siêu âm</text>
  ${caption('EN 10160 / ASTM A435-578 — Quality class S0-S3 (body) + E0-E3 (edge)')}
</svg>`,

z_quality: () => `<svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <rect x="60" y="80" width="380" height="80" fill="url(#steelG)" stroke="#5f6b7a" stroke-width="1.5"/>
  <rect x="60" y="80" width="380" height="80" fill="url(#hatch)" opacity="0.5"/>
  <text x="250" y="60" text-anchor="middle" font-size="12" fill="#1b2430" font-weight="700">TẤM CHỊU TẢI THEO PHƯƠNG DÀY (Z)</text>
  <line x1="250" y1="30" x2="250" y2="78" stroke="#aa4322" stroke-width="3" marker-end="url(#ahR)"/>
  <text x="260" y="50" font-size="13" fill="#aa4322" font-weight="800">Tải kéo Z (qua dày)</text>
  <line x1="200" y1="115" x2="290" y2="135" stroke="#aa4322" stroke-width="2.5"/>
  <text x="305" y="135" font-size="11" fill="#aa4322" font-weight="700">⚠ NỨT LỚP (lamellar tearing)</text>
  <g transform="translate(60,190)">
    <text font-size="11" fill="#1b2430" font-weight="700">Yêu cầu Z-quality theo EN 10164:</text>
    <text y="18" font-size="11" fill="#0c447c">• Z15: ≥ 15% RA — kết cấu thường</text>
    <text y="34" font-size="11" fill="#0c447c" font-weight="700">• Z25: ≥ 25% RA — phổ biến cho T-joint chịu kéo</text>
    <text y="50" font-size="11" fill="#0c447c">• Z35: ≥ 35% RA — kết cấu áp lực</text>
  </g>
  ${caption('EN 1993 — Z25/Z35 cho T-joint có tải kéo theo phương dày tấm')}
</svg>`,

pipe_dim: () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${DEFS}
  <circle cx="250" cy="140" r="80" fill="url(#steelG)" stroke="#5f6b7a" stroke-width="1.5"/>
  <circle cx="250" cy="140" r="80" fill="url(#hatch)" opacity="0.45"/>
  <circle cx="250" cy="140" r="68" fill="#fafcfe" stroke="#5f6b7a" stroke-width="0.5"/>
  <line x1="170" y1="140" x2="330" y2="140" stroke="#0c447c" stroke-width="1.5" marker-start="url(#ahs)" marker-end="url(#ah)"/>
  <text x="250" y="135" text-anchor="middle" font-size="13" fill="#0c447c" font-weight="800">OD (đường kính ngoài)</text>
  <line x1="182" y1="140" x2="194" y2="140" stroke="#aa4322" stroke-width="2.5"/>
  <text x="190" y="125" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="700">t</text>
  <text x="40" y="245" font-size="11" fill="#3b6d11" font-weight="600">📐 Đo OD bằng caliper. Dày = UT (cản trở bên trong)</text>
  ${caption('EN 10210/10219 — Đo 2 hướng vuông góc → tính độ tròn (ovality)')}
</svg>`,

none: () => ''
};
