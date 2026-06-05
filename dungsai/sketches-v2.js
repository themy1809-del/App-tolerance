/* Sketches v2 — Bản vẽ kỹ thuật polish cao cho app Dung sai.
   Steel hatching · gradient lighting · realistic tool icons · ISO-129 dimensions. */
(function(){
  if (!window.DS_SKETCH) window.DS_SKETCH = {};

  const D2 = `<defs>
    <pattern id="v2h" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="#5f6b7a" stroke-width="0.5" opacity="0.5"/>
    </pattern>
    <pattern id="v2hD" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="5" stroke="#2c2c2a" stroke-width="0.7" opacity="0.65"/>
    </pattern>
    <pattern id="v2wH" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
      <line x1="0" y1="0" x2="0" y2="4" stroke="#7c4a00" stroke-width="0.7" opacity="0.85"/>
    </pattern>
    <pattern id="v2cn" width="14" height="14" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="4" r="1.2" fill="#888780"/>
      <circle cx="9" cy="10" r="1.4" fill="#5f5e5a"/>
      <circle cx="12" cy="3" r="0.9" fill="#888780"/>
    </pattern>
    <marker id="v2ah" markerWidth="10" markerHeight="8" refX="9.5" refY="4" orient="auto">
      <path d="M0,0 L10,4 L0,8 z" fill="#0c447c"/>
    </marker>
    <marker id="v2ahs" markerWidth="10" markerHeight="8" refX="0.5" refY="4" orient="auto">
      <path d="M10,0 L0,4 L10,8 z" fill="#0c447c"/>
    </marker>
    <marker id="v2ahR" markerWidth="10" markerHeight="8" refX="9.5" refY="4" orient="auto">
      <path d="M0,0 L10,4 L0,8 z" fill="#aa4322"/>
    </marker>
    <marker id="v2ahsR" markerWidth="10" markerHeight="8" refX="0.5" refY="4" orient="auto">
      <path d="M10,0 L0,4 L10,8 z" fill="#aa4322"/>
    </marker>
    <linearGradient id="v2sG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#eef1f4"/>
      <stop offset="0.4" stop-color="#cdd6df"/>
      <stop offset="1" stop-color="#888780"/>
    </linearGradient>
    <linearGradient id="v2sH" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#eef1f4"/>
      <stop offset="0.4" stop-color="#cdd6df"/>
      <stop offset="1" stop-color="#888780"/>
    </linearGradient>
    <radialGradient id="v2bead" cx="0.5" cy="0.3" r="0.7">
      <stop offset="0" stop-color="#fbe07d"/>
      <stop offset="0.5" stop-color="#cea24a"/>
      <stop offset="1" stop-color="#7c4a00"/>
    </radialGradient>
  </defs>`;

  const dH = (x1,x2,y,lab,col) => {
    const c = col || '#0c447c';
    return `<g>
      <line x1="${x1}" y1="${y-5}" x2="${x1}" y2="${y+5}" stroke="${c}" stroke-width="1.1"/>
      <line x1="${x2}" y1="${y-5}" x2="${x2}" y2="${y+5}" stroke="${c}" stroke-width="1.1"/>
      <line x1="${x1+1}" y1="${y}" x2="${x2-1}" y2="${y}" stroke="${c}" stroke-width="1.1" marker-start="url(#v2ahs)" marker-end="url(#v2ah)"/>
      <text x="${(x1+x2)/2}" y="${y-8}" text-anchor="middle" font-size="12" fill="${c}" font-weight="800">${lab}</text>
    </g>`;
  };
  const dV = (y1,y2,x,lab,col) => {
    const c = col || '#0c447c';
    return `<g>
      <line x1="${x-5}" y1="${y1}" x2="${x+5}" y2="${y1}" stroke="${c}" stroke-width="1.1"/>
      <line x1="${x-5}" y1="${y2}" x2="${x+5}" y2="${y2}" stroke="${c}" stroke-width="1.1"/>
      <line x1="${x}" y1="${y1+1}" x2="${x}" y2="${y2-1}" stroke="${c}" stroke-width="1.1" marker-start="url(#v2ahs)" marker-end="url(#v2ah)"/>
      <text x="${x+7}" y="${(y1+y2)/2+5}" font-size="12" fill="${c}" font-weight="800">${lab}</text>
    </g>`;
  };
  const cap = txt => `<rect x="0" y="252" width="500" height="38" fill="#eef4fa"/>
    <text x="250" y="274" text-anchor="middle" font-size="11.5" fill="#0c447c" font-weight="600">${txt}</text>`;

  const S = window.DS_SKETCH;

  /* ===== COLUMN PLUMB — 2 axis (đo theo cả 2 phương) ===== */
  S.column_plumb_2axis = () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${D2}
    <rect x="20" y="240" width="460" height="22" fill="url(#v2cn)" stroke="#5f6b7a"/>
    <text x="40" y="256" font-size="10" fill="#5f6b7a" font-weight="700">MÓNG BÊ TÔNG</text>
    <g transform="translate(195,40) rotate(2.5 30 100)">
      <rect x="0" y="0" width="60" height="200" fill="url(#v2sG)" stroke="#5f6b7a" stroke-width="1.5"/>
      <rect x="0" y="0" width="60" height="200" fill="url(#v2h)" opacity="0.45"/>
      <rect x="10" y="0" width="40" height="200" fill="none" stroke="#5f6b7a" stroke-width="0.5"/>
    </g>
    <line x1="225" y1="40" x2="225" y2="240" stroke="#0c447c" stroke-width="1.4" stroke-dasharray="6,3"/>
    <text x="222" y="35" text-anchor="end" font-size="11" fill="#0c447c" font-weight="700">tim Y</text>
    <line x1="240" y1="60" x2="265" y2="60" stroke="#aa4322" stroke-width="2.5" marker-end="url(#v2ahR)"/>
    <text x="275" y="62" font-size="12" fill="#aa4322" font-weight="800">eX</text>
    <g transform="translate(360,90)">
      <rect x="0" y="0" width="70" height="100" fill="#fff" stroke="#1b2430" stroke-width="1.2"/>
      <text x="35" y="14" text-anchor="middle" font-size="9" fill="#1b2430" font-weight="700">LASER</text>
      <text x="35" y="28" text-anchor="middle" font-size="9" fill="#1b2430" font-weight="700">THEODOLITE</text>
      <circle cx="35" cy="55" r="11" fill="none" stroke="#aa4322" stroke-width="1.5"/>
      <line x1="35" y1="44" x2="35" y2="66" stroke="#aa4322"/>
      <line x1="24" y1="55" x2="46" y2="55" stroke="#aa4322"/>
      <line x1="35" y1="66" x2="35" y2="85" stroke="#aa4322" stroke-width="2"/>
    </g>
    <text x="370" y="225" text-anchor="middle" font-size="10" fill="#1b2430" font-weight="700">eY → đo</text>
    <text x="370" y="238" text-anchor="middle" font-size="10" fill="#1b2430" font-weight="700">phương ⊥</text>
    ${dV(40, 240, 130, 'H', '#0c447c')}
    ${cap('EN 1090-2 §11.2 — eX² + eY² ≤ H/300² · Đo 2 phương vuông góc')}
  </svg>`;

  /* ===== BEAM CAMBER vs LOAD ===== */
  S.beam_camber_load = () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${D2}
    <line x1="40" y1="120" x2="460" y2="120" stroke="#0c447c" stroke-width="1.5" stroke-dasharray="6,3"/>
    <path d="M 40 120 Q 250 90 460 120 L 460 145 Q 250 115 40 145 Z" fill="url(#v2sG)" stroke="#5f6b7a" stroke-width="1"/>
    <path d="M 40 120 Q 250 90 460 120 L 460 145 Q 250 115 40 145 Z" fill="url(#v2h)" opacity="0.4"/>
    <text x="55" y="115" font-size="11" fill="#0c447c" font-weight="700">tim ngang (lý thuyết)</text>
    <text x="250" y="170" text-anchor="middle" font-size="11" fill="#5f6b7a" font-weight="600">DẦM (chưa tải — camber lên)</text>
    <line x1="250" y1="120" x2="250" y2="92" stroke="#0f6e56" stroke-width="2.5" marker-end="url(#v2ahsR)"/>
    <text x="270" y="105" font-size="13" fill="#0f6e56" font-weight="800">+ camber</text>
    <path d="M 40 195 Q 250 230 460 195 L 460 220 Q 250 255 40 220 Z" fill="url(#v2sG)" stroke="#5f6b7a" stroke-width="1"/>
    <path d="M 40 195 Q 250 230 460 195 L 460 220 Q 250 255 40 220 Z" fill="url(#v2h)" opacity="0.4"/>
    <text x="250" y="250" text-anchor="middle" font-size="11" fill="#5f6b7a" font-weight="600">DẦM (chịu tải chết — võng xuống)</text>
    <g transform="translate(180,170)" stroke="#aa4322" stroke-width="2" fill="#aa4322">
      <line x1="0" y1="0" x2="0" y2="20" marker-end="url(#v2ahR)"/>
      <line x1="35" y1="0" x2="35" y2="20" marker-end="url(#v2ahR)"/>
      <line x1="70" y1="0" x2="70" y2="20" marker-end="url(#v2ahR)"/>
      <line x1="105" y1="0" x2="105" y2="20" marker-end="url(#v2ahR)"/>
      <line x1="140" y1="0" x2="140" y2="20" marker-end="url(#v2ahR)"/>
      <text x="-12" y="-3" font-size="10" font-weight="700">w (tải chết)</text>
    </g>
    ${dH(40, 460, 60, 'L', '#0c447c')}
    ${cap('Camber sản xuất = camber thiết kế + DL deflection · AISC, AASHTO')}
  </svg>`;

  /* ===== FILLET WELD DETAIL — leg + throat + concavity ===== */
  S.fillet_detail = () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${D2}
    <rect x="40" y="180" width="420" height="40" fill="url(#v2sG)" stroke="#5f6b7a"/>
    <rect x="40" y="180" width="420" height="40" fill="url(#v2h)" opacity="0.45"/>
    <rect x="225" y="40" width="40" height="140" fill="url(#v2sG)" stroke="#5f6b7a"/>
    <rect x="225" y="40" width="40" height="140" fill="url(#v2h)" opacity="0.45"/>
    <path d="M 225 180 L 225 120 L 165 180 Z" fill="url(#v2bead)" stroke="#7c4a00" stroke-width="1.2"/>
    <path d="M 225 180 L 225 120 Q 195 145 165 180 Z" fill="url(#v2wH)" opacity="0.5"/>
    <path d="M 265 180 L 265 120 L 325 180 Z" fill="url(#v2bead)" stroke="#7c4a00" stroke-width="1.2"/>
    <path d="M 265 180 L 265 120 Q 295 145 325 180 Z" fill="url(#v2wH)" opacity="0.5"/>
    <line x1="163" y1="180" x2="163" y2="120" stroke="#0c447c" stroke-width="1.5" marker-start="url(#v2ah)" marker-end="url(#v2ahs)"/>
    <text x="143" y="155" text-anchor="end" font-size="13" fill="#0c447c" font-weight="800">z (leg)</text>
    <line x1="165" y1="182" x2="225" y2="182" stroke="#0c447c" stroke-width="1.5" marker-start="url(#v2ahs)" marker-end="url(#v2ah)"/>
    <text x="195" y="200" text-anchor="middle" font-size="13" fill="#0c447c" font-weight="800">z (leg)</text>
    <line x1="180" y1="155" x2="220" y2="155" stroke="#aa4322" stroke-width="2"/>
    <line x1="180" y1="151" x2="180" y2="159" stroke="#aa4322" stroke-width="1.5"/>
    <line x1="220" y1="151" x2="220" y2="159" stroke="#aa4322" stroke-width="1.5"/>
    <text x="200" y="148" text-anchor="middle" font-size="12" fill="#aa4322" font-weight="800">a (throat)</text>
    <text x="120" y="135" font-size="10" fill="#3b6d11" font-weight="600">throat lý thuyết</text>
    <text x="120" y="148" font-size="10" fill="#3b6d11" font-weight="600">a = 0.7 × z</text>
    <g transform="translate(360,80)">
      <rect x="0" y="0" width="100" height="80" fill="#fff" stroke="#1b2430" stroke-width="1.2"/>
      <text x="50" y="14" text-anchor="middle" font-size="9" fill="#1b2430" font-weight="700">FILLET WELD</text>
      <text x="50" y="27" text-anchor="middle" font-size="9" fill="#1b2430" font-weight="700">GAUGE</text>
      <path d="M 30 38 L 30 65 L 70 65 Z" fill="none" stroke="#aa4322" stroke-width="1.5"/>
      <text x="20" y="55" font-size="9" fill="#aa4322" font-weight="700">z=?</text>
    </g>
    ${cap('AWS D1.1 §7.8 · z theo bản vẽ · underrun ≤ 1.6 mm trên ≤ 10% chiều dài')}
  </svg>`;

  /* ===== BUTT CJP CROSS-SECTION ===== */
  S.butt_cjp = () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${D2}
    <rect x="40" y="130" width="200" height="60" fill="url(#v2sG)" stroke="#5f6b7a"/>
    <rect x="40" y="130" width="200" height="60" fill="url(#v2h)" opacity="0.45"/>
    <rect x="260" y="130" width="200" height="60" fill="url(#v2sG)" stroke="#5f6b7a"/>
    <rect x="260" y="130" width="200" height="60" fill="url(#v2h)" opacity="0.45"/>
    <path d="M 240 130 Q 250 90 260 130 L 260 190 Q 250 200 240 190 Z" fill="url(#v2bead)" stroke="#7c4a00"/>
    <path d="M 240 130 Q 250 90 260 130 L 260 190 Q 250 200 240 190 Z" fill="url(#v2wH)" opacity="0.5"/>
    <line x1="232" y1="130" x2="268" y2="130" stroke="#0c447c" stroke-width="1" stroke-dasharray="3,2"/>
    <text x="228" y="133" text-anchor="end" font-size="10" fill="#0c447c">mặt kim loại</text>
    <line x1="250" y1="130" x2="250" y2="92" stroke="#aa4322" stroke-width="2"/>
    <line x1="245" y1="92" x2="255" y2="92" stroke="#aa4322" stroke-width="2"/>
    <text x="290" y="95" font-size="13" fill="#aa4322" font-weight="800">h (reinforcement)</text>
    <line x1="232" y1="190" x2="268" y2="190" stroke="#0c447c" stroke-width="1" stroke-dasharray="3,2"/>
    <line x1="250" y1="190" x2="250" y2="202" stroke="#3b6d11" stroke-width="2"/>
    <text x="290" y="207" font-size="12" fill="#3b6d11" font-weight="800">root reinforcement</text>
    <line x1="40" y1="220" x2="240" y2="220" stroke="#5f6b7a" stroke-width="0.8"/>
    <line x1="260" y1="220" x2="460" y2="220" stroke="#5f6b7a" stroke-width="0.8"/>
    ${dV(130, 190, 30, 't', '#0c447c')}
    ${cap('AWS D1.1 §8.1 — Reinf ≤ 3 mm · Root reinf ≤ 3 mm cho CJP · ISO 5817 phân cấp B/C/D')}
  </svg>`;

  /* ===== WELD POROSITY ===== */
  S.weld_porosity = () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${D2}
    <rect x="40" y="100" width="420" height="120" fill="url(#v2sG)" stroke="#5f6b7a"/>
    <rect x="40" y="100" width="420" height="120" fill="url(#v2h)" opacity="0.45"/>
    <rect x="40" y="145" width="420" height="30" fill="url(#v2bead)" stroke="#7c4a00"/>
    <rect x="40" y="145" width="420" height="30" fill="url(#v2wH)" opacity="0.6"/>
    <text x="250" y="200" text-anchor="middle" font-size="12" fill="#1b2430" font-weight="700">MỐI HÀN (mặt cắt — phát hiện qua RT/UT)</text>
    <g fill="#1b2430">
      <circle cx="120" cy="158" r="2"/>
      <circle cx="140" cy="160" r="1.5"/>
      <circle cx="170" cy="156" r="3"/>
      <circle cx="200" cy="161" r="1.2"/>
      <circle cx="250" cy="158" r="4"/>
      <circle cx="310" cy="160" r="2.5"/>
      <circle cx="340" cy="156" r="1.8"/>
      <circle cx="380" cy="159" r="2.2"/>
      <circle cx="410" cy="161" r="1.5"/>
    </g>
    <circle cx="250" cy="158" r="14" fill="none" stroke="#aa4322" stroke-width="2"/>
    <text x="250" y="80" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">⌀ lớn nhất</text>
    <line x1="248" y1="84" x2="248" y2="142" stroke="#aa4322" stroke-width="1" stroke-dasharray="2,2"/>
    <g transform="translate(50,235)" font-size="11" fill="#1b2430">
      <text font-weight="700">ISO 5817:</text>
      <text x="70" font-weight="700" fill="#0f6e56">B: Ø≤0.2s, max 3</text>
      <text x="200" font-weight="700" fill="#854f0b">C: Ø≤0.3s, max 4</text>
      <text x="330" font-weight="700" fill="#aa4322">D: Ø≤0.4s, max 5</text>
    </g>
    ${cap('s = chiều dày mối hàn · Đo qua RT (phim X-quang) hoặc UT phased array')}
  </svg>`;

  /* ===== WELD CRACK TYPES ===== */
  S.weld_crack = () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${D2}
    <rect x="40" y="120" width="420" height="80" fill="url(#v2sG)" stroke="#5f6b7a"/>
    <rect x="40" y="120" width="420" height="80" fill="url(#v2h)" opacity="0.45"/>
    <rect x="40" y="145" width="420" height="30" fill="url(#v2bead)" stroke="#7c4a00"/>
    <rect x="40" y="145" width="420" height="30" fill="url(#v2wH)" opacity="0.6"/>
    <path d="M 100 145 L 95 175" stroke="#aa4322" stroke-width="2" fill="none"/>
    <text x="100" y="130" text-anchor="middle" font-size="10" fill="#aa4322" font-weight="700">longitudinal</text>
    <path d="M 200 160 L 240 158" stroke="#aa4322" stroke-width="2" fill="none"/>
    <text x="220" y="130" text-anchor="middle" font-size="10" fill="#aa4322" font-weight="700">transverse</text>
    <path d="M 320 145 L 320 175" stroke="#aa4322" stroke-width="2" fill="none"/>
    <text x="320" y="130" text-anchor="middle" font-size="10" fill="#aa4322" font-weight="700">crater</text>
    <path d="M 420 165 Q 425 178 410 195 Q 405 215 415 220" stroke="#aa4322" stroke-width="2" fill="none"/>
    <text x="430" y="160" text-anchor="middle" font-size="10" fill="#aa4322" font-weight="700">underbead</text>
    <rect x="40" y="225" width="420" height="40" fill="#fbeae2" stroke="#aa4322" stroke-width="1.2"/>
    <text x="250" y="240" text-anchor="middle" font-size="13" fill="#aa4322" font-weight="800">⚠ MỌI CẤP CHẤT LƯỢNG (B/C/D): NỨT — TUYỆT ĐỐI KHÔNG CHO PHÉP</text>
    <text x="250" y="256" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="600">Phát hiện qua VT/PT/MT — đào sạch + hàn lại ngay</text>
  </svg>`;

  /* ===== ANCHOR BOLT PATTERN ===== */
  S.anchor_bolt_pattern = () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${D2}
    <rect x="80" y="60" width="340" height="180" fill="url(#v2cn)" stroke="#5f6b7a"/>
    <text x="100" y="78" font-size="11" fill="#1b2430" font-weight="700">MÓNG BÊ TÔNG (top view)</text>
    <rect x="180" y="115" width="140" height="70" fill="url(#v2sG)" stroke="#0c447c" stroke-width="1.5"/>
    <text x="250" y="155" text-anchor="middle" font-size="11" fill="#1b2430" font-weight="700">BASE PLATE</text>
    <g fill="#1b2430">
      <circle cx="200" cy="130" r="6"/><circle cx="300" cy="130" r="6"/>
      <circle cx="200" cy="170" r="6"/><circle cx="300" cy="170" r="6"/>
    </g>
    <g fill="#fff">
      <circle cx="200" cy="130" r="3"/><circle cx="300" cy="130" r="3"/>
      <circle cx="200" cy="170" r="3"/><circle cx="300" cy="170" r="3"/>
    </g>
    ${dH(200, 300, 100, 'p', '#0c447c')}
    ${dV(130, 170, 340, 'g', '#0c447c')}
    <line x1="180" y1="130" x2="200" y2="130" stroke="#aa4322" stroke-width="1" stroke-dasharray="3,2"/>
    <text x="155" y="130" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="700">e₁</text>
    <text x="100" y="265" font-size="11" fill="#3b6d11" font-weight="600">📐 Đo từ tâm anchor đến tâm anchor (p, g) + lỗ đến mép base plate (e₁)</text>
    ${cap('AISC 303 §7.5: bolt circle ±3 mm · TCVN: ±2 mm. Sai làm base plate không khớp')}
  </svg>`;

  /* ===== BOLT TURN-OF-NUT ===== */
  S.bolt_turn_nut = () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${D2}
    <g transform="translate(120,80)">
      <rect x="0" y="0" width="80" height="120" fill="url(#v2sG)" stroke="#5f6b7a"/>
      <rect x="0" y="0" width="80" height="120" fill="url(#v2h)" opacity="0.45"/>
      <text x="40" y="65" text-anchor="middle" font-size="11" fill="#1b2430" font-weight="700">Mặt bích A</text>
    </g>
    <g transform="translate(200,80)">
      <rect x="0" y="0" width="80" height="120" fill="url(#v2sG)" stroke="#5f6b7a"/>
      <rect x="0" y="0" width="80" height="120" fill="url(#v2h)" opacity="0.45"/>
      <text x="40" y="65" text-anchor="middle" font-size="11" fill="#1b2430" font-weight="700">Mặt bích B</text>
    </g>
    <line x1="105" y1="140" x2="290" y2="140" stroke="#1b2430" stroke-width="4"/>
    <g transform="translate(285,128)">
      <polygon points="0,12 5,5 15,5 20,12 15,19 5,19" fill="#5f5e5a" stroke="#1b2430" stroke-width="1.2"/>
      <text x="10" y="32" text-anchor="middle" font-size="9" fill="#1b2430" font-weight="700">NUT</text>
    </g>
    <g transform="translate(290,135)">
      <circle r="22" fill="none" stroke="#aa4322" stroke-width="2.5"/>
      <line x1="0" y1="-22" x2="0" y2="-15" stroke="#aa4322" stroke-width="2"/>
      <line x1="22" y1="0" x2="15" y2="0" stroke="#aa4322" stroke-width="2"/>
      <path d="M 0,-22 A 22 22 0 0 1 22 0" fill="none" stroke="#0f6e56" stroke-width="3"/>
      <text x="35" y="-5" font-size="12" fill="#0f6e56" font-weight="800">1/3 vòng</text>
      <text x="35" y="8" font-size="10" fill="#0f6e56" font-weight="600">(120°)</text>
    </g>
    <text x="40" y="245" font-size="11" fill="#3b6d11" font-weight="600">📐 Sau snug-tight, vặn thêm theo Table J3.1: dài ≤ 4d → 1/3 vòng · 4-8d → 1/2 · 8-12d → 2/3</text>
    ${cap('AISC 360-22 §J3.7 — Turn-of-nut method · Pretension đủ ngấu nhờ vặn thêm')}
  </svg>`;

  /* ===== SLOT HOLE TYPES ===== */
  S.slot_hole = () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${D2}
    <rect x="40" y="60" width="420" height="170" fill="url(#v2sG)" stroke="#5f6b7a"/>
    <rect x="40" y="60" width="420" height="170" fill="url(#v2h)" opacity="0.4"/>
    <g fill="#1b2430">
      <circle cx="100" cy="110" r="14"/>
      <text x="100" y="160" text-anchor="middle" font-size="11" font-weight="700">STD (chuẩn)</text>
      <text x="100" y="178" text-anchor="middle" font-size="10" fill="#0c447c">d_h = d_b + 2mm</text>
    </g>
    <g fill="#1b2430">
      <circle cx="220" cy="110" r="16"/>
      <text x="220" y="160" text-anchor="middle" font-size="11" font-weight="700">OVS (oversize)</text>
      <text x="220" y="178" text-anchor="middle" font-size="10" fill="#854f0b">d_h = d_b + 4-8mm</text>
    </g>
    <g fill="#1b2430">
      <rect x="320" y="100" width="40" height="20" rx="10"/>
      <text x="340" y="160" text-anchor="middle" font-size="11" font-weight="700">SSL (short slot)</text>
      <text x="340" y="178" text-anchor="middle" font-size="10" fill="#3b6d11">+25% diameter</text>
    </g>
    <g fill="#1b2430">
      <rect x="395" y="100" width="70" height="20" rx="10"/>
      <text x="430" y="160" text-anchor="middle" font-size="11" font-weight="700">LSL (long slot)</text>
      <text x="430" y="178" text-anchor="middle" font-size="10" fill="#aa4322">+250% diameter</text>
    </g>
    <text x="40" y="245" font-size="11" fill="#3b6d11" font-weight="600">📐 SSL/LSL chỉ dùng khi cần dung sai lắp ghép — OVS cho cột Anchor</text>
    ${cap('AISC 360 Table J3.3 · EN 1993-1-8 — Slot phải đi đôi với hardened washer')}
  </svg>`;

  /* ===== CUT EDGE QUALITY (flame/plasma) ===== */
  S.cut_edge = () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${D2}
    <rect x="40" y="120" width="180" height="100" fill="url(#v2sG)" stroke="#5f6b7a"/>
    <rect x="40" y="120" width="180" height="100" fill="url(#v2h)" opacity="0.45"/>
    <path d="M 220 120 L 218 130 L 222 145 L 219 160 L 222 175 L 218 190 L 222 205 L 220 220" stroke="#1b2430" stroke-width="2" fill="none"/>
    <text x="130" y="170" text-anchor="middle" font-size="12" fill="#1b2430" font-weight="700">FLAME CUT (mép)</text>
    <text x="130" y="105" text-anchor="middle" font-size="10" fill="#aa4322" font-weight="700">RAGGED — không OK</text>
    <rect x="280" y="120" width="180" height="100" fill="url(#v2sG)" stroke="#5f6b7a"/>
    <rect x="280" y="120" width="180" height="100" fill="url(#v2h)" opacity="0.45"/>
    <line x1="278" y1="120" x2="278" y2="220" stroke="#1b2430" stroke-width="2"/>
    <text x="370" y="170" text-anchor="middle" font-size="12" fill="#1b2430" font-weight="700">PLASMA / SAU MÀI</text>
    <text x="370" y="105" text-anchor="middle" font-size="10" fill="#0f6e56" font-weight="700">SMOOTH — OK</text>
    <g transform="translate(225,150)">
      <line x1="0" y1="-5" x2="0" y2="5" stroke="#aa4322" stroke-width="2"/>
      <line x1="10" y1="-5" x2="10" y2="5" stroke="#aa4322" stroke-width="2"/>
      <text x="5" y="-10" text-anchor="middle" font-size="11" fill="#aa4322" font-weight="800">Rz</text>
    </g>
    <text x="40" y="245" font-size="11" fill="#3b6d11" font-weight="600">📐 Đo độ nhám Rz bằng profile gauge. EN 1090 EXC2: Rz ≤ 200 µm · EXC3: ≤ 70 µm</text>
    ${cap('EN 1090-2 §6.5 + ISO 9013 — Cut quality U1/U2/U3/U4 theo Rz')}
  </svg>`;

  /* ===== JOINT OFFSET / HIGH-LOW ===== */
  S.joint_offset = () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${D2}
    <rect x="40" y="120" width="210" height="50" fill="url(#v2sG)" stroke="#5f6b7a"/>
    <rect x="40" y="120" width="210" height="50" fill="url(#v2h)" opacity="0.45"/>
    <rect x="250" y="135" width="210" height="50" fill="url(#v2sG)" stroke="#5f6b7a"/>
    <rect x="250" y="135" width="210" height="50" fill="url(#v2h)" opacity="0.45"/>
    <path d="M 245 120 Q 250 95 255 135 L 255 170 Q 250 185 245 170 Z" fill="url(#v2bead)" stroke="#7c4a00"/>
    <line x1="40" y1="120" x2="245" y2="120" stroke="#0c447c" stroke-width="0.8" stroke-dasharray="3,2"/>
    <line x1="255" y1="135" x2="460" y2="135" stroke="#aa4322" stroke-width="0.8" stroke-dasharray="3,2"/>
    <line x1="250" y1="120" x2="250" y2="135" stroke="#aa4322" stroke-width="3"/>
    <line x1="245" y1="135" x2="255" y2="135" stroke="#aa4322" stroke-width="2"/>
    <text x="295" y="123" font-size="13" fill="#aa4322" font-weight="800">Δ (high-low)</text>
    <text x="40" y="250" font-size="11" fill="#3b6d11" font-weight="600">📐 Đo độ chênh mặt khi 2 tấm không cùng cốt → Δ ≤ 0.1t hoặc 3 mm</text>
    ${cap('ASME UG-33 + AWS D1.1 §5.21 — Δ ≤ 0.1t hoặc 3 mm. Mài sửa nếu lệch')}
  </svg>`;

  /* ===== TANK CIRCUMFERENCE ===== */
  S.tank_circumference = () => `<svg viewBox="0 0 500 290" xmlns="http://www.w3.org/2000/svg">${D2}
    <circle cx="250" cy="140" r="95" fill="url(#v2sG)" stroke="#5f6b7a" stroke-width="1.5"/>
    <circle cx="250" cy="140" r="95" fill="url(#v2h)" opacity="0.4"/>
    <circle cx="250" cy="140" r="80" fill="#fff" stroke="#5f6b7a" stroke-width="0.5"/>
    <text x="250" y="145" text-anchor="middle" font-size="13" fill="#1b2430" font-weight="700">BỒN (top view)</text>
    <g stroke="#aa4322" stroke-width="2" fill="none" stroke-dasharray="6,3">
      <circle cx="250" cy="140" r="95"/>
    </g>
    <g transform="translate(345,90)">
      <rect x="0" y="0" width="80" height="60" fill="#fff" stroke="#1b2430" stroke-width="1.2"/>
      <text x="40" y="14" text-anchor="middle" font-size="9" fill="#1b2430" font-weight="700">STEEL TAPE</text>
      <text x="40" y="28" text-anchor="middle" font-size="9" fill="#1b2430" font-weight="700">π × D</text>
      <text x="40" y="48" text-anchor="middle" font-size="10" fill="#aa4322" font-weight="700">P = ?</text>
    </g>
    <text x="40" y="245" font-size="11" fill="#3b6d11" font-weight="600">📐 Quấn dây thép quanh chu vi P → D = P/π. Đo ở 3 cao độ khác nhau</text>
    ${cap('API 650 §7.5.4 — Chu vi ngoài kiểm độ tròn của shell từng tầng (ring)')}
  </svg>`;

  console.log('Sketches v2 loaded:', Object.keys(S).length, 'total sketches available');
})();
