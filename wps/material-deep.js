/* Phân tích chuyên sâu nhóm vật liệu — Chemistry, weldability, why grouped */
window.WPS_MATDEEP = {

  /* Tham số chung — logic ASME IX grouping */
  intro: {
    title: 'Tại sao ASME nhóm vật liệu?',
    body: [
      'ASME Section IX QW/QB-422 nhóm vật liệu để GIẢM số WPS cần qualified.',
      'Vật liệu cùng nhóm có: thành phần hoá học tương tự + hành vi luyện kim tương tự khi hàn + đáp ứng nhiệt giống nhau.',
      'Hệ quả: 1 PQR qualified cho vật liệu này → áp dụng được cho mọi vật liệu khác cùng nhóm (cùng P-No + cùng Group).',
      'NHƯNG: filler metal vẫn phải theo từng material thực tế (vd 304 → 308L; 316 → 316L; 316 + 304 → 309L)'
    ]
  },

  groups: {

    /* ===== P-NO 1 — CARBON STEEL ===== */
    'P-1': {
      title: 'P-No. 1 — Thép Cacbon (Carbon Steel)',
      chemistry: {
        C:    '0.10 - 0.30%',
        Mn:   '0.30 - 1.65%',
        Si:   '≤ 0.50%',
        S:    '≤ 0.045% (S thấp = ít nứt)',
        P:    '≤ 0.045%',
        other: 'Có thể có Cu, Cr, Ni, Mo, V, Nb < 0.5% (HSLA)'
      },
      whyGrouped: [
        'CE (Carbon Equivalent) tương đương — phản ứng nhiệt khi hàn giống nhau',
        'Đều là ferritic structure (BCC) — co rút như nhau khi nguội',
        'Cùng phản ứng với Hydrogen — risk nứt nguội tỷ lệ thuận CE',
        'Chia thành G1/G2/G3 theo Yield Strength — vì preheat + filler tăng theo σ_y'
      ],
      g1vsG2vsG3: {
        'Group 1 (σy ≤ 290 MPa)': 'CE ≤ 0.40 → KHÔNG preheat (t<25mm) · Filler E60xx/E70xx · Hàn dễ nhất',
        'Group 2 (σy 290-414)':   'CE 0.40-0.48 → preheat 50-100°C cho t≥25mm · Filler E70xx-1 / E80xx · Hàn vừa',
        'Group 3 (σy 414-485)':   'CE > 0.48 → preheat 100-150°C BẮT BUỘC · Filler E80xx-C3 · Low-H bắt buộc, cẩn thận'
      },
      mechanical: {
        UTS: '400-690 MPa',
        Yield: '235-485 MPa',
        Elongation: '20-26% (A5)',
        CVN: '27-60 J @ −20°C / −40°C'
      },
      weldability: 9,  // 1-10
      pitfalls: [
        '⚠ CE > 0.45 mà không preheat → nứt nguội H₂ sau 48-72h',
        '⚠ Que ẩm trên carbon thường → porosity cluster',
        '⚠ Hàn trên thép gỉ/dầu/nước → porosity + LOF',
        '⚠ Heat input quá cao (> 4 kJ/mm) → HAZ thô + giảm CVN',
        '✓ Always: kiểm CE từ MTC trước khi quyết định preheat'
      ],
      symbol: '🔧',
      color: '#0c447c'
    },

    /* ===== P-NO 8 — AUSTENITIC STAINLESS ===== */
    'P-8': {
      title: 'P-No. 8 (M-8) — Inox Austenitic (Cr-Ni)',
      chemistry: {
        C:    '≤ 0.08% (304) · ≤ 0.030% (304L low-carbon)',
        Cr:   '16-26% (chính)',
        Ni:   '8-22% (chính) — ổn định pha austenite (FCC)',
        Mo:   '2-4% (chỉ 316/317 — chống pitting)',
        Mn:   '≤ 2%',
        N:    '0.10-0.25% (đôi khi)',
        other: 'Ti, Nb cho grade 321/347 (ổn định carbide)'
      },
      whyGrouped: [
        'Cấu trúc FCC austenitic — không có phase transformation khi nguội',
        'Không tôi cứng, KHÔNG preheat, KHÔNG PWHT (trừ case ứng suất rất cao)',
        'CTE (giãn nở nhiệt) gấp 1.5× thép carbon → distortion lớn hơn',
        'Conductivity nhiệt thấp 30% so carbon → mối hàn nóng hơn, lan rộng hơn',
        'Group I/II/III chia theo % Cr-Ni và ứng dụng (chuẩn / chịu nhiệt / super austenitic)'
      ],
      g1vsG2vsG3: {
        'M-8 Group I (304/316 family)':  'Cr 16-20%, Ni 8-14% · Phổ biến nhất · 304: nhà bếp, kết cấu nhẹ · 316: hoá chất, biển',
        'M-8 Group II (309/310)':         'Cr 20-26%, Ni 12-22% · Chịu nhiệt 1000-1100°C · Dùng cho lò nung + buttering',
        'M-8 Group III (904L, 254 SMO)':  'Mo 4-6%, Ni 18-25% · Super austenitic chống Cl⁻ tột bậc · Filler Ni-base bắt buộc'
      },
      mechanical: {
        UTS: '485-620 MPa (cao hơn carbon nhẹ)',
        Yield: '170-290 MPa (mềm)',
        Elongation: '40-60% (dẻo rất cao)',
        CVN: 'Tốt @ -196°C (LNG)'
      },
      weldability: 8,
      pitfalls: [
        '⚠ Sensitization 425-870°C: C kết tủa với Cr ở grain boundary → intergranular corrosion. Dùng 304L thay 304',
        '⚠ Heat input > 1.5 kJ/mm + dùng 304 → sensitization + Cr depletion HAZ',
        '⚠ Distortion gấp 2× carbon — phải sequence + jig + skip welding',
        '⚠ Khí bảo vệ MIG dùng 100% CO₂ → Cr loss + spatter. Phải dùng 98%Ar+2%O₂ hoặc 99%Ar+1%O₂',
        '⚠ Trộn lẫn brush thép carbon ↔ stainless → contamination → gỉ "rouging"',
        '✓ Backing gas Ar 100% cho root pass — ngăn oxidation back-bead',
        '✓ Interpass < 150°C để giữ corrosion resistance'
      ],
      symbol: '✨',
      color: '#0f6e56'
    },

    /* ===== P-NO 10H — DUPLEX ===== */
    'P-10H': {
      title: 'P-No. 10H — Duplex / Super-Duplex Stainless',
      chemistry: {
        C:    '≤ 0.030%',
        Cr:   '21-26% (cao)',
        Ni:   '4.5-7% (thấp hơn austenitic)',
        Mo:   '2.5-4.5%',
        N:    '0.14-0.32% (rất quan trọng → ổn định austenite)'
      },
      whyGrouped: [
        'Cấu trúc 50% ferrite + 50% austenite (microstructure 50/50)',
        'Kết hợp ưu điểm: cường độ cao như ferritic + chống ăn mòn như austenitic',
        'σ_y = 450-550 MPa — gấp 2× của 316L',
        'PREN > 35 (Pitting Resistance Equiv. = Cr + 3.3Mo + 16N) → chống nước biển'
      ],
      keyFact: 'Cân bằng phase 50/50 RẤT QUAN TRỌNG — heat input sai → mất cân bằng → giảm corrosion + giảm độ dẻo',
      mechanical: {
        UTS: '620-880 MPa',
        Yield: '450-690 MPa (gấp 2× austenitic)',
        Elongation: '25-35%',
        Hardness: '≤ 310 HV (sau hàn)'
      },
      weldability: 6,
      pitfalls: [
        '⚠⚠ Heat input PHẢI trong khoảng 0.5 - 2.5 kJ/mm — quá thấp → ferritic-dominant + nứt · quá cao → austenitic-dominant + chống ăn mòn kém',
        '⚠ Interpass ≤ 150°C để giữ cân bằng phase',
        '⚠ Khí backing Ar + N₂ 95/5 — N giữ austenite',
        '⚠ Filler PHẢI over-alloyed (2209 cho 2205, 2594 cho 2507) → bù Ni loss khi hàn',
        '⚠ Tránh 700-900°C — kết tủa sigma phase (giòn)',
        '⚠ PWHT không cần — chỉ làm hỏng phase balance',
        '✓ Test ferrite content sau hàn bằng Feritscope → 30-70%'
      ],
      symbol: '⚡',
      color: '#7c3f00'
    },

    /* ===== P-NO 5A/5B — Cr-Mo ===== */
    'P-5': {
      title: 'P-No. 5A/5B — Cr-Mo Steel (Chịu nhiệt áp lực)',
      chemistry: {
        C:    '0.05 - 0.15%',
        Cr:   '0.5 - 9% (Cr cao = chịu nhiệt cao)',
        Mo:   '0.5 - 1.0% (chịu creep)',
        V:    '0.18-0.25% (Grade P91 / B9)',
        Nb:   '0.06-0.10% (Grade P91)'
      },
      whyGrouped: [
        'Thiết kế cho nhiệt độ cao 400-600°C trong refinery + power plant',
        'Cr tạo lớp oxide Cr₂O₃ bảo vệ tránh sulfidation',
        'Mo tăng creep strength (đặc biệt cho boiler tube)',
        '5A = ≤ 3% Cr · 5B = 3-9% Cr (chịu nhiệt cao hơn)',
        'V trong P91 → tạo VC carbide rất bền — temper resistance cao'
      ],
      g1vsG2vsG3: {
        'P-5A (1.25Cr-0.5Mo / P11)': 'Operating ≤ 450°C · PWHT 690-720°C',
        'P-5A (2.25Cr-1Mo / P22)':    'Operating ≤ 525°C · PWHT 690-720°C · Phổ biến refinery',
        'P-5B (9Cr-1Mo-V / P91)':     'Operating ≤ 600°C · PWHT 750-780°C · Boiler USC'
      },
      mechanical: {
        UTS: '415-690 MPa',
        Yield: '275-485 MPa',
        Operating: '450-600°C',
        'Creep limit': '≥ 100,000 hours @ design temp'
      },
      weldability: 4,
      pitfalls: [
        '⚠⚠⚠ Preheat 200-250°C BẮT BUỘC — không thể bỏ qua',
        '⚠⚠ PWHT 690-780°C × 2 phút/mm thickness BẮT BUỘC',
        '⚠⚠ Heating rate ≤ 100°C/h (t<25) hoặc ≤ 50°C/h (t>50) — quá nhanh → reheat crack',
        '⚠ Low-H electrode bắt buộc — H₂ + thép alloy → nứt cold + reheat',
        '⚠ Hardness sau PWHT phải ≤ 250 HV (P22) / ≤ 280 HV (P91)',
        '⚠ Inter-pass temperature 200-300°C — đừng để nguội xuống thấp',
        '⚠ P91: tránh delta-ferrite formation — không over-temper',
        '✓ Filler tương xứng: P11 → E8018-B2 · P22 → E9018-B3 · P91 → E9015-B9'
      ],
      symbol: '🔥',
      color: '#aa4322'
    },

    /* ===== P-NO 41-43 — NICKEL ALLOYS ===== */
    'P-4x': {
      title: 'P-No. 41-49 — Nickel Alloys (Monel/Inconel)',
      chemistry: {
        Ni:   '32 - 99% (Nickel base)',
        Cr:   '0 - 30% (Inconel/Hastelloy)',
        Mo:   '0 - 17% (chống pitting)',
        Cu:   '20-30% (Monel 400)',
        Fe:   '0 - 30%',
        other: 'Co, W, Ti, Al (Hastelloy)'
      },
      whyGrouped: [
        'Ni là matrix chính → kháng ăn mòn xuất sắc trong nhiều môi trường',
        'Monel 400 (Ni-Cu): chống nước biển + axit HF',
        'Inconel 600 (Ni-Cr-Fe): chịu nhiệt oxidation 1100°C',
        'Inconel 625 (Ni-Cr-Mo): chống pitting + crevice + nhiệt',
        'Inconel 718: hardenable nickel — tuabin máy bay'
      ],
      mechanical: {
        UTS: '485-1240 MPa',
        Yield: '170-1100 MPa',
        Elongation: '30-50%'
      },
      weldability: 5,
      pitfalls: [
        '⚠ Hot cracking risk RẤT CAO — Ni alloy nhạy với S, P, Pb trên bề mặt',
        '⚠ Sluggish weld pool — heat input phải thấp, travel chậm',
        '⚠ Penetration kém — phải mài góc rộng + nhiều lớp',
        '⚠ Backing Ar 100% bắt buộc — không có CO₂ vào',
        '⚠ Không weave > 3× wire dia — sigma phase + porosity',
        '✓ Filler over-alloyed: Inconel 82/182 (cho 600), Inconel 625 (cho 625)',
        '✓ Clean tuyệt đối — wipe với MEK/acetone trước hàn'
      ],
      symbol: '💎',
      color: '#5f4ab7'
    },

    /* ===== P-NO 22-25 — ALUMINUM ===== */
    'P-2x': {
      title: 'P-No. 22-25 — Aluminum Alloys',
      chemistry: {
        Al:   '88 - 99%',
        Mg:   '0.5-5% (5xxx series — strain hardening)',
        Si:   '0.4-1.2% (6xxx — age hardening với Mg)',
        Cu:   '4-6% (2xxx — không hàn được)',
        Zn:   '5-8% (7xxx — khó hàn)'
      },
      whyGrouped: [
        '5xxx (P-22): Al-Mg, strain hardening, hàn tốt, không tôi sau hàn',
        '6xxx (P-23): Al-Mg-Si, precipitation hardening, hàn được + có thể aging sau',
        '2xxx và 7xxx: KHÔNG hàn được (crack + reduce strength)',
        'Conductivity nhiệt rất cao → cần Amp cao + tốc độ nhanh',
        'Oxide Al₂O₃ trên bề mặt nóng chảy 2050°C — phải gỡ bằng AC TIG hoặc DCEP'
      ],
      mechanical: {
        UTS: '170-310 MPa',
        Yield: '70-275 MPa',
        Conductivity: '60% IACS (rất cao — cần heat input lớn)'
      },
      weldability: 7,
      pitfalls: [
        '⚠ Bề mặt oxide PHẢI gỡ ngay trước hàn — bàn chải INOX riêng',
        '⚠ Hàn AC TIG (giải pháp tốt nhất) hoặc DCEP MIG (spool gun)',
        '⚠ Filler theo grade: 4043 cho 6061 · 5183/5356 cho 5083',
        '⚠ Không backing copper (nóng chảy + bám vào Al) — dùng ceramic backing',
        '⚠ Distortion lớn do CTE cao (23 µm/m/°C, gấp 2× thép)',
        '⚠ Sau hàn 6061 → mất 50% strength tại HAZ, cần aging 175°C × 8h để khôi phục',
        '✓ Khí Ar 100% cho mỏng · Ar+He cho dày (>10mm) — He tăng heat input'
      ],
      symbol: '🛩️',
      color: '#854f0b'
    }
  },

  /* === COMPARISON TABLE === */
  comparison: [
    { feature: 'Carbon Equivalent (CE)',  p1:'0.30-0.55', p8:'N/A (austenitic)', p10h:'N/A', p5:'0.55-0.85', p4x:'N/A', p2x:'N/A' },
    { feature: 'Preheat',                  p1:'50-150°C tuỳ CE', p8:'Không (≤150°C)', p10h:'Không', p5:'200-250°C', p4x:'Không thường', p2x:'Không' },
    { feature: 'PWHT',                     p1:'Khi t > 38mm', p8:'Không (trừ ứng suất cao)', p10h:'KHÔNG (phá phase)', p5:'BẮT BUỘC', p4x:'Stress relief tuỳ alloy', p2x:'Aging cho 6xxx' },
    { feature: 'Heat Input (kJ/mm)',       p1:'1.0-4.0',     p8:'0.5-2.5',  p10h:'0.5-2.5 RẤT QUAN TRỌNG', p5:'1.0-2.5', p4x:'0.5-2.0', p2x:'1.0-3.0' },
    { feature: 'Interpass max',            p1:'250°C',       p8:'150°C',    p10h:'150°C',  p5:'300°C', p4x:'200°C', p2x:'120°C' },
    { feature: 'Shielding gas',            p1:'CO₂ / Ar+CO₂', p8:'98%Ar+2%O₂ / 99%Ar+1%CO₂', p10h:'97.5%Ar+2.5%N₂', p5:'Ar+CO₂', p4x:'Ar 100%', p2x:'Ar (AC TIG)' },
    { feature: 'Filler over-alloy?',       p1:'Match',       p8:'L-grade ưu tiên', p10h:'Over-alloyed (2209/2594)', p5:'Match', p4x:'82/625 cho overlay', p2x:'4043/5356' },
    { feature: 'Distortion risk',          p1:'⭐⭐',         p8:'⭐⭐⭐ (CTE cao)', p10h:'⭐⭐⭐', p5:'⭐⭐', p4x:'⭐⭐', p2x:'⭐⭐⭐⭐ (CTE rất cao)' },
    { feature: 'Crack sensitivity',        p1:'⭐⭐ (H₂)',    p8:'⭐ (hot crack 304 nếu C cao)', p10h:'⭐⭐ (sigma 700-900°C)', p5:'⭐⭐⭐⭐ (reheat + H₂)', p4x:'⭐⭐⭐⭐ (hot crack)', p2x:'⭐⭐ (hot crack 6xxx)' },
    { feature: 'Cost ratio (vs A36=1)',    p1:'1.0',         p8:'4-6×',     p10h:'8-12×',  p5:'3-5×',  p4x:'15-50×', p2x:'2-4×' }
  ]
};

console.log('WPS_MATDEEP loaded:', Object.keys(window.WPS_MATDEEP.groups).length, 'deep analyses + comparison table');
