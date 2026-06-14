/* Hình minh hoạ cảnh sản xuất có CÔNG NHÂN cho 12 công đoạn + banner dây chuyền (SVG).
   Tác giả: Đậu Thế Mỹ. Thay bằng ẢNH THẬT: đặt images/buoc-1.jpg ... buoc-12.jpg. */
(function(){
  const NS = 'xmlns="http://www.w3.org/2000/svg"';
  const open = (vb) => `<svg viewBox="${vb}" ${NS} preserveAspectRatio="xMidYMid meet" style="width:100%;height:auto;display:block">`;
  const frame = '<rect x="1" y="1" width="318" height="178" rx="12" fill="#f8fafc" stroke="#e2e8f0"/><rect x="2" y="150" width="316" height="28" fill="#eef2f7"/><line x1="2" y1="150" x2="318" y2="150" stroke="#cbd5e1"/>';
  const cap = (t) => `<text x="160" y="170" font-size="11" text-anchor="middle" fill="#475569" font-weight="600">${t}</text>`;
  /* Công nhân: mũ bảo hộ vàng + áo phản quang cam. x,y = tâm thân; s = tỉ lệ; f=1 lật mặt */
  const W = (x,y,s,f) => `<g transform="translate(${x},${y}) scale(${(f?-s:s)},${s})">
    <ellipse cx="0" cy="48" rx="15" ry="3" fill="#0f172a" opacity="0.12"/>
    <rect x="-7" y="26" width="6" height="18" rx="2.5" fill="#1f2937"/><rect x="1" y="26" width="6" height="18" rx="2.5" fill="#1f2937"/>
    <rect x="-9" y="43" width="9" height="4" rx="2" fill="#0f172a"/><rect x="0" y="43" width="9" height="4" rx="2" fill="#0f172a"/>
    <rect x="-13" y="3" width="5" height="22" rx="2.5" fill="#f97316"/><rect x="8" y="3" width="5" height="22" rx="2.5" fill="#f97316"/>
    <circle cx="-10.5" cy="26" r="3" fill="#f1c27d"/><circle cx="10.5" cy="26" r="3" fill="#f1c27d"/>
    <rect x="-10" y="2" width="20" height="26" rx="6" fill="#f97316"/>
    <rect x="-10" y="11" width="20" height="3.2" fill="#fde68a"/><rect x="-10" y="18" width="20" height="3.2" fill="#fde68a"/>
    <circle cx="0" cy="-7" r="7.5" fill="#f1c27d"/>
    <path d="M-9 -8 a9 9 0 0 1 18 0 Z" fill="#facc15"/><rect x="-11" y="-8" width="22" height="3" rx="1.5" fill="#eab308"/></g>`;
  const lbl = (x,y,t,c) => `<text x="${x}" y="${y}" font-size="9" fill="${c||'#334155'}" font-weight="600">${t}</text>`;
  const D = {};

  /* 1 — Vật tư: công nhân đo dày tấm + kiểm MTC, kho tấm */
  D[1] = open('0 0 320 180')+frame+
    '<rect x="150" y="118" width="150" height="10" fill="#94a3b8" stroke="#475569"/><rect x="150" y="106" width="150" height="10" fill="#cbd5e1" stroke="#475569"/><rect x="150" y="94" width="150" height="10" fill="#94a3b8" stroke="#475569"/>'+
    '<path d="M146 92 V128 M141 92 H151 M141 128 H151" stroke="#dc2626" stroke-width="2" fill="none"/>'+lbl(120,86,'đo dày','#dc2626')+
    '<rect x="232" y="40" width="56" height="44" rx="3" fill="#fff" stroke="#1f9d57" stroke-width="2"/><line x1="240" y1="52" x2="280" y2="52" stroke="#94a3b8"/><line x1="240" y1="62" x2="280" y2="62" stroke="#94a3b8"/><text x="260" y="78" font-size="11" text-anchor="middle" fill="#1f9d57">MTC ✓</text>'+
    W(70,100,1.05,0)+cap('Kiểm vật tư: đo chiều dày + đối chiếu MTC')+'</svg>';

  /* 2 — Sơ chế: máy cắt CNC + tia lửa, công nhân vận hành */
  D[2] = open('0 0 320 180')+frame+
    '<rect x="120" y="60" width="180" height="14" fill="#334155"/><rect x="118" y="74" width="184" height="6" fill="#1e293b"/>'+
    '<rect x="150" y="112" width="150" height="26" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>'+
    '<rect x="200" y="74" width="10" height="36" fill="#64748b"/><path d="M205 110 l-5 10 5 4 5 -4 z" fill="#f59e0b"/>'+
    '<g stroke="#fbbf24" stroke-width="1.5"><path d="M205 122 l-8 8"/><path d="M205 122 l8 8"/><path d="M205 124 l0 10"/></g>'+lbl(214,118,'cắt','#b45309')+
    W(80,112,1.05,0)+cap('Sơ chế: cắt / khoan / vát mép trên máy')+'</svg>';

  /* 3 — Ráp thô: bàn gá, hai tấm, công nhân canh khe hở */
  D[3] = open('0 0 320 180')+frame+
    '<rect x="120" y="128" width="190" height="8" fill="#334155"/>'+
    '<rect x="150" y="98" width="70" height="28" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/><rect x="232" y="98" width="70" height="28" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/>'+
    '<path d="M226 96 V128" stroke="#dc2626" stroke-width="2"/>'+lbl(206,90,'khe hở','#dc2626')+
    W(80,108,1.05,0)+cap('Ráp thô (fit-up): gá định vị, đo khe hở/lệch mép')+'</svg>';

  /* 4 — Hàn thô: công nhân hàn hồ quang (mặt nạ + tia lửa) + máy hàn */
  D[4] = open('0 0 320 180')+frame+
    '<rect x="160" y="116" width="150" height="22" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>'+
    '<rect x="40" y="92" width="30" height="46" rx="3" fill="#334155"/><rect x="46" y="100" width="18" height="10" fill="#22c55e"/><path d="M70 110 q40 6 92 8" stroke="#0f172a" stroke-width="2" fill="none"/>'+
    '<g><circle cx="155" cy="120" r="2.5" fill="#fbbf24"/><path d="M150 116 l-6 -5 M155 113 l0 -7 M160 116 l6 -5" stroke="#fbbf24" stroke-width="1.5"/></g>'+
    W(110,108,1.05,0)+'<rect x="102" y="92" width="16" height="12" rx="2" fill="#1e293b"/>'+lbl(120,150,'',null)+
    cap('Hàn thô: thợ hàn chứng chỉ, đúng WPS, gia nhiệt')+'</svg>';

  /* 5 — Nắn & cưa: dầm cong trên gối, công nhân hơ nhiệt + dây căng */
  D[5] = open('0 0 320 180')+frame+
    '<rect x="150" y="120" width="12" height="18" fill="#475569"/><rect x="288" y="120" width="12" height="18" fill="#475569"/>'+
    '<path d="M150 116 Q230 98 300 116" fill="none" stroke="#94a3b8" stroke-width="9"/>'+
    '<line x1="150" y1="104" x2="300" y2="104" stroke="#dc2626" stroke-width="1.3" stroke-dasharray="4"/>'+lbl(232,100,'dây căng','#dc2626')+
    '<path d="M120 108 l16 0" stroke="#64748b" stroke-width="3"/><path d="M136 104 l8 4 -8 4 z" fill="#f59e0b"/><path d="M146 106 l5 -4 M150 110 l5 -2" stroke="#fbbf24" stroke-width="1.3"/>'+
    W(82,108,1.05,0)+cap('Nắn nhiệt khử biến dạng + đo độ thẳng')+'</svg>';

  /* 6 — Ráp hoàn thiện: dầm I + sườn + lỗ, công nhân lắp & đo */
  D[6] = open('0 0 320 180')+frame+
    '<rect x="150" y="70" width="150" height="9" fill="#94a3b8" stroke="#475569"/><rect x="218" y="79" width="9" height="50" fill="#94a3b8" stroke="#475569"/><rect x="150" y="129" width="150" height="9" fill="#94a3b8" stroke="#475569"/>'+
    '<path d="M185 79 L203 79 L203 129 Z" fill="#cbd5e1" stroke="#1f9d57" stroke-width="1.5"/>'+lbl(176,96,'sườn','#1f9d57')+
    '<circle cx="262" cy="104" r="4.5" fill="#fff" stroke="#dc2626" stroke-width="1.5"/><circle cx="277" cy="104" r="4.5" fill="#fff" stroke="#dc2626" stroke-width="1.5"/>'+lbl(286,92,'lỗ','#dc2626')+
    W(86,108,1.05,0)+cap('Ráp hoàn thiện: lắp chi tiết, kiểm lỗ & kích thước')+'</svg>';

  /* 7 — Hàn hoàn thiện: công nhân NDT (đầu dò) + soi VT */
  D[7] = open('0 0 320 180')+frame+
    '<rect x="150" y="118" width="160" height="20" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/><path d="M222 118 q6 -9 12 0" fill="#f59e0b"/>'+
    '<rect x="214" y="100" width="24" height="13" rx="2" fill="#1d4ed8"/><path d="M226 113 V118" stroke="#1d4ed8" stroke-width="2"/>'+lbl(244,98,'đầu dò UT','#1d4ed8')+
    '<rect x="140" y="40" width="42" height="28" rx="3" fill="#fff" stroke="#1d4ed8"/><path d="M146 64 l8 -4 8 6 8 -8 8 6" fill="none" stroke="#1d4ed8" stroke-width="1.5"/>'+lbl(140,38,'kết quả NDT','#1d4ed8')+
    W(86,110,1.05,0)+cap('Hàn hoàn thiện: VT 100% + NDT theo cấp EXC')+'</svg>';

  /* 8 — SP hoàn thiện: 2 công nhân kéo thước đo dầm */
  D[8] = open('0 0 320 180')+frame+
    '<rect x="70" y="118" width="220" height="14" fill="#94a3b8" stroke="#475569"/>'+
    '<path d="M70 100 Q180 90 290 100" fill="none" stroke="#1d4ed8" stroke-width="1.3" stroke-dasharray="3"/>'+lbl(150,86,'camber','#1d4ed8')+
    '<path d="M70 138 H290 M70 134 V142 M290 134 V142" stroke="#dc2626" stroke-width="1.5"/>'+lbl(150,150,'chiều dài L','#dc2626')+
    W(46,108,0.92,0)+W(312,108,0.92,1)+cap('SP hoàn thiện: đo tổng thể, camber, độ vuông')+'</svg>';

  /* 9 — Ráp thử: bản nối + bu lông, công nhân xỏ bu lông */
  D[9] = open('0 0 320 180')+frame+
    '<rect x="150" y="104" width="70" height="24" fill="#94a3b8" stroke="#475569"/><rect x="240" y="104" width="62" height="24" fill="#94a3b8" stroke="#475569"/>'+
    '<rect x="214" y="98" width="44" height="36" fill="#cbd5e1" stroke="#475569" stroke-width="1.5" opacity="0.9"/>'+
    '<circle cx="226" cy="110" r="3.4" fill="#1e293b"/><circle cx="238" cy="110" r="3.4" fill="#1e293b"/><circle cx="226" cy="122" r="3.4" fill="#1e293b"/><circle cx="238" cy="122" r="3.4" fill="#1e293b"/>'+
    lbl(212,92,'bu lông + match-mark','#334155')+
    W(86,110,1.05,0)+cap('Ráp thử: xỏ bu lông kiểm thông lỗ, đánh dấu')+'</svg>';

  /* 10 — Bắn bi: công nhân phun làm sạch bề mặt (vòi + bụi hạt) */
  D[10] = open('0 0 320 180')+frame+
    '<rect x="170" y="96" width="130" height="40" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>'+
    '<path d="M170 136 l7 -7 7 7 7 -7 7 7 7 -7 7 7 7 -7 7 7 7 -7 7 7 7 -7 7 7 7 -7" fill="none" stroke="#1f9d57" stroke-width="1.4"/>'+
    '<path d="M120 104 l40 6" stroke="#334155" stroke-width="4"/><g fill="#94a3b8"><circle cx="166" cy="106" r="1.6"/><circle cx="172" cy="112" r="1.6"/><circle cx="178" cy="108" r="1.6"/><circle cx="170" cy="118" r="1.6"/><circle cx="180" cy="116" r="1.6"/></g>'+lbl(196,90,'Sa 2½','#334155')+
    W(82,108,1.05,0)+'<circle cx="82" cy="93" r="9" fill="#1e293b"/>'+cap('Bắn bi: làm sạch & tạo nhám trước sơn')+'</svg>';

  /* 11 — Sơn/Mạ: công nhân phun sơn (súng + sương) + đo DFT */
  D[11] = open('0 0 320 180')+frame+
    '<rect x="180" y="86" width="120" height="46" fill="#cbd5e1" stroke="#475569"/><rect x="180" y="86" width="120" height="10" fill="#1f9d57"/><rect x="180" y="96" width="120" height="6" fill="#60a5fa"/>'+
    '<path d="M120 100 l34 2" stroke="#334155" stroke-width="4"/><path d="M154 102 l26 -10 0 24 z" fill="#93c5fd" opacity="0.55"/>'+
    '<rect x="246" y="56" width="40" height="20" rx="3" fill="#fff" stroke="#dc2626" stroke-width="2"/><text x="266" y="70" font-size="9" text-anchor="middle" fill="#dc2626">DFT</text><path d="M266 76 V86" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="2"/>'+
    W(82,108,1.05,0)+cap('Sơn / mạ kẽm đúng hệ + đo chiều dày (DFT)')+'</svg>';

  /* 12 — Đóng gói: kiện hàng + xe nâng + công nhân dán nhãn */
  D[12] = open('0 0 320 180')+frame+
    '<rect x="120" y="96" width="96" height="42" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/><path d="M120 110 H216 M120 126 H216" stroke="#92400e" stroke-width="3"/><rect x="146" y="104" width="44" height="26" fill="#fff" stroke="#1f9d57" stroke-width="1.5"/><text x="168" y="121" font-size="9" text-anchor="middle" fill="#1f9d57">Mark No.</text>'+
    '<g><rect x="248" y="104" width="34" height="22" rx="2" fill="#f59e0b"/><rect x="244" y="112" width="6" height="22" fill="#1e293b"/><circle cx="252" cy="140" r="6" fill="#0f172a"/><circle cx="276" cy="140" r="6" fill="#0f172a"/><path d="M244 112 l-10 -2" stroke="#334155" stroke-width="3"/></g>'+lbl(244,98,'xe nâng','#92400e')+
    W(84,108,1.05,0)+cap('Đóng gói: nhãn, đệm, chằng buộc, packing list')+'</svg>';

  /* ===== BANNER: dây chuyền sản xuất tổng thể (12 trạm) ===== */
  const st = (x,t) => `<g transform="translate(${x},0)">
      <rect x="-30" y="78" width="60" height="34" rx="4" fill="#fff" stroke="#cbd5e1"/>
      ${W(0,70,0.62,0)}
      <text x="0" y="124" font-size="9" text-anchor="middle" fill="#334155" font-weight="700">${t}</text></g>`;
  const names = ['Vật tư','Sơ chế','Ráp thô','Hàn thô','Nắn/cưa','Ráp HT','Hàn HT','SP HT','Ráp thử','Bắn bi','Sơn/mạ','Đóng gói'];
  let stations = '';
  for (let i=0;i<12;i++){ const x = 70 + i*70; stations += st(x, (i+1)+'. '+names[i]); if(i<11){ stations += `<path d="M${x+34} 95 H${x+36}" stroke="#1f9d57" stroke-width="0"/><path d="M${x+33} 95 l8 0 m-3 -3 l3 3 -3 3" stroke="#1f9d57" stroke-width="2" fill="none"/>`; } }
  window.QT_BANNER = open('0 0 920 150')+
    '<rect x="0" y="0" width="920" height="150" rx="12" fill="#f1f5f9"/>'+
    '<rect x="20" y="18" width="880" height="10" rx="3" fill="#334155"/><rect x="40" y="28" width="6" height="14" fill="#475569"/><rect x="874" y="28" width="6" height="14" fill="#475569"/>'+
    '<text x="56" y="14" font-size="9" fill="#64748b">cầu trục (gantry)</text>'+
    '<rect x="20" y="128" width="880" height="16" rx="3" fill="#e2e8f0"/><text x="30" y="140" font-size="8" fill="#94a3b8">DÂY CHUYỀN SẢN XUẤT — VẬT TƯ → ĐÓNG GÓI</text>'+
    stations + '</svg>';

  window.QT_DIAGRAMS = D;
})();
