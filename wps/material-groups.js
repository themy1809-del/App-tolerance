/* Cẩm nang Nhóm vật liệu hàn — ASME IX P-Number & M-Number system
   Giúp công nhân biết que/dây họ đang hàn thuộc nhóm vật liệu nào.
   Reference: ASME Section IX QW/QB-422 Material Groupings */
window.WPS_MATGROUPS = [

  /* ===== P-NO 1 — CARBON STEEL ===== */
  { group: 'P-No. 1', subgroup: 'Group 1',
    name: 'Thép cacbon thường — Low strength',
    yield: '≤ 290 MPa (42 ksi)',
    materials: [
      'ASTM A36 / A36M (thép kết cấu thông dụng)',
      'ASTM A283 Gr.C/D (tấm bồn áp lực thấp)',
      'ASTM A53 Gr.A/B (ống đen)',
      'ASTM A106 Gr.A/B (ống áp lực)',
      'ASTM A285 Gr.A/B/C (tấm bồn áp lực)',
      'ASTM A516 Gr.55/60/65 (tấm bồn áp lực)',
      'EN S235JR / S235J0 / S235J2',
      'JIS SS400 / SM400A/B/C',
      'GB Q235A/B/C/D',
      'TCVN CCT34 / CCT38'
    ],
    consumables: 'E6010, E6011, E6013, E7016, E7018, ER70S-3/-6, E70T-1, F7A0-EM12K (SAW)',
    color: '#0c447c',
    notes: 'Nhóm dùng nhiều nhất trong kết cấu thép · CE ≤ 0.42 → KHÔNG cần preheat (t<25mm)'
  },

  { group: 'P-No. 1', subgroup: 'Group 2',
    name: 'Thép cacbon trung bình — Medium strength',
    yield: '290-414 MPa (42-60 ksi)',
    materials: [
      'ASTM A572 Gr.42/50/55/60/65 (HSLA)',
      'ASTM A992 (W-shape Wide Flange)',
      'ASTM A516 Gr.70 (bồn áp lực thông dụng)',
      'ASTM A106 Gr.C (ống áp lực)',
      'EN S275JR / S275J0 / S275J2',
      'EN S355JR / S355J0 / S355J2 / S355K2',
      'JIS SM490A/B/C, SM520B/C, SN490B/C',
      'GB Q345 / Q355 / Q390',
      'TCVN BCT38 / CCT42'
    ],
    consumables: 'E7016, E7018, E7018-1, ER70S-6, E71T-1/-9, F7A2-EM12K (SAW)',
    color: '#185fa5',
    notes: 'Phổ biến cho nhà cao tầng, cầu, PEB · CE 0.42-0.48 → preheat 50-100°C cho t≥25mm'
  },

  { group: 'P-No. 1', subgroup: 'Group 3',
    name: 'Thép cacbon cường độ cao',
    yield: '414-485 MPa (60-70 ksi)',
    materials: [
      'ASTM A572 Gr.65 (HSLA cường độ cao)',
      'ASTM A537 Cl.1/2 (bồn áp lực)',
      'ASTM A678 Gr.A/B/C',
      'EN S420N / S420NL / S420M',
      'EN S460N / S460NL / S460M'
    ],
    consumables: 'E8016-C3, E8018-C3, ER80S-G',
    color: '#7c3f00',
    notes: 'Cường độ cao cần preheat bắt buộc 100-150°C · Low-H electrode bắt buộc'
  },

  /* ===== P-NO 8 (M-8) — AUSTENITIC STAINLESS STEEL ===== */
  { group: 'P-No. 8 / M-8', subgroup: 'Group I',
    name: 'Inox Austenitic — Chrome-Nickel chuẩn (300 series)',
    yield: '170-205 MPa',
    materials: [
      'ASTM A240 304 / 304L (UNS S30400 / S30403) — phổ biến nhất',
      'ASTM A240 316 / 316L (UNS S31600 / S31603) — chịu chloride tốt',
      'ASTM A240 321 (UNS S32100) — ổn định với Ti',
      'ASTM A240 347 (UNS S34700) — ổn định với Nb',
      'A312 TP304/304L/316/316L (ống inox)',
      'EN 1.4301 / 1.4307 (= 304/304L)',
      'EN 1.4401 / 1.4404 (= 316/316L)',
      'JIS SUS304 / SUS304L / SUS316 / SUS316L'
    ],
    consumables: 'AWS A5.4 E308L-16/-17, E316L-16/-17 (SMAW) · A5.9 ER308L, ER316L (GTAW/GMAW) · A5.22 E308LT1-1/-4 (FCAW)',
    color: '#0f6e56',
    notes: 'GTAW/SMAW phổ biến · KHÔNG preheat (≤ 150°C max) · Khí Ar 100% cho GTAW · 98%Ar+2%O₂ cho GMAW'
  },

  { group: 'P-No. 8 / M-8', subgroup: 'Group II',
    name: 'Inox Austenitic — chịu nhiệt cao',
    yield: '205-275 MPa',
    materials: [
      'ASTM A240 309S / 310S (chịu nhiệt 1000-1100°C)',
      'ASTM A240 309H / 310H (cường độ cao nhiệt độ cao)',
      'A312 TP309S / TP310S (ống chịu nhiệt)',
      'EN 1.4828 / 1.4845 (= 309/310)'
    ],
    consumables: 'E309L-16, ER309L (dissimilar weld + lining), E310-16, ER310',
    color: '#0f6e56',
    notes: 'Dùng cho lò nung, ống khói nhiệt độ cao · Đặc biệt 309L cho buttering thép carbon + lining inox'
  },

  { group: 'P-No. 8 / M-8', subgroup: 'Group III',
    name: 'Inox đặc biệt (super austenitic)',
    yield: '275-310 MPa',
    materials: [
      'ASTM A240 904L / N08904',
      'Avesta 254 SMO (UNS S31254) — siêu chịu chloride',
      'AL-6XN (UNS N08367)',
      '20Cr-32Ni-Mo'
    ],
    consumables: 'ENiCrMo-3, ERNiCrMo-3 (Inconel 625) cho 254 SMO',
    color: '#0f6e56',
    notes: 'Dùng cho nước biển, khí có Cl⁻ cao · Đắt tiền · Cần consumable Ni-base'
  },

  /* ===== P-NO 10H — DUPLEX STAINLESS STEEL ===== */
  { group: 'P-No. 10H', subgroup: '—',
    name: 'Duplex / Super-Duplex Stainless',
    yield: '450-550 MPa',
    materials: [
      'ASTM A240 2205 (UNS S32205 / S31803) — Duplex chuẩn',
      'ASTM A240 2507 (UNS S32750) — Super Duplex',
      'ASTM A240 2304 (UNS S32304) — Lean Duplex',
      'EN 1.4462 (= 2205)',
      'EN 1.4410 (= 2507)'
    ],
    consumables: 'AWS A5.4 E2209-16 (SMAW), A5.9 ER2209 (GTAW) cho 2205 · E2594-16, ER2594 cho 2507',
    color: '#7c3f00',
    notes: 'Cân bằng ferrite/austenite 50/50 · Heat input quan trọng: 0.5-2.5 kJ/mm · KHÔNG preheat'
  },

  /* ===== P-NO 41-49 — NICKEL ALLOYS ===== */
  { group: 'P-No. 41', subgroup: '—',
    name: 'Nickel-Copper alloy (Monel)',
    yield: '170-345 MPa',
    materials: [
      'Monel 400 (UNS N04400)',
      'ASTM B127 / B164 / B165 / B564'
    ],
    consumables: 'ENiCu-7, ERNiCu-7 (Monel filler)',
    color: '#5f4ab7',
    notes: 'Chống ăn mòn nước biển + axit · Đắt, không hàn được với carbon steel trực tiếp'
  },

  { group: 'P-No. 42', subgroup: '—',
    name: 'Nickel chunks (Pure Nickel)',
    yield: '120-150 MPa',
    materials: [
      'Nickel 200 (UNS N02200) / Nickel 201 (N02201)',
      'ASTM B160 / B161 / B162'
    ],
    consumables: 'ENi-1, ERNi-1',
    color: '#5f4ab7',
    notes: 'Dùng cho công nghiệp xà phòng, chloride caustic'
  },

  { group: 'P-No. 43', subgroup: '—',
    name: 'Nickel-Chromium-Iron (Inconel 600/625/800)',
    yield: '170-415 MPa',
    materials: [
      'Inconel 600 (UNS N06600) — chịu oxidation cao',
      'Inconel 625 (UNS N06625) — chống ăn mòn xuất sắc',
      'Inconel 800 / 800H / 800HT (UNS N08800)',
      'ASTM B166 / B167 / B168 / B423 / B564'
    ],
    consumables: 'ENiCrFe-3 (Inconel 182), ERNiCr-3 (Inconel 82), ENiCrMo-3 (Inconel 112), ERNiCrMo-3 (Inconel 625)',
    color: '#5f4ab7',
    notes: 'Dùng cho lò nung công nghiệp, refinery · Hàn được với carbon steel dùng làm cladding'
  },

  /* ===== P-NO 21-25 — ALUMINUM ===== */
  { group: 'P-No. 22', subgroup: '—',
    name: 'Aluminum 5xxx series (Al-Mg)',
    yield: '125-275 MPa',
    materials: [
      'AA 5083 (UNS A95083) — đóng tàu, bồn LNG',
      'AA 5052 (UNS A95052)',
      'AA 5086 / 5454 / 5456'
    ],
    consumables: 'ER5183, ER5356 (GMAW/GTAW · khí Ar 100% hoặc Ar+He)',
    color: '#854f0b',
    notes: 'Không hàn được điện cực — chỉ GTAW/GMAW · Khí trơ bắt buộc · Spool gun cho dây mềm'
  },

  { group: 'P-No. 23', subgroup: '—',
    name: 'Aluminum 6xxx series (Al-Mg-Si)',
    yield: '270-310 MPa',
    materials: [
      'AA 6061 (UNS A96061) — phổ biến nhất',
      'AA 6063 (kết cấu thanh nhôm)',
      'AA 6082'
    ],
    consumables: 'ER4043, ER4047 (filler), ER5356',
    color: '#854f0b',
    notes: 'Có thể aging cứng sau hàn · Cần đúng filler để không nứt'
  },

  /* ===== P-NO 5A/5B — Cr-Mo alloy ===== */
  { group: 'P-No. 5A', subgroup: '—',
    name: 'Cr-Mo steel (≤ 3% Cr)',
    yield: '275-415 MPa',
    materials: [
      'ASTM A335 P11 (1.25Cr-0.5Mo) — ống chịu nhiệt',
      'ASTM A335 P22 (2.25Cr-1Mo) — phổ biến refinery',
      'ASTM A387 Gr.11/22 Cl.1/2 (tấm chịu nhiệt)',
      'EN 13CrMo4-5 (1.7335) / 10CrMo9-10 (1.7380)'
    ],
    consumables: 'E8018-B2 / B2L (P11), E9018-B3 / B3L (P22)',
    color: '#aa4322',
    notes: '⚠ Preheat bắt buộc 200-250°C · PWHT 690-720°C × 2 phút/mm thickness · Low-H bắt buộc'
  },

  { group: 'P-No. 5B', subgroup: '—',
    name: 'Cr-Mo steel (3-9% Cr)',
    yield: '415-690 MPa',
    materials: [
      'ASTM A335 P5 (5Cr-0.5Mo)',
      'ASTM A335 P9 (9Cr-1Mo)',
      'ASTM A335 P91 (9Cr-1Mo-V) — Grade 91, phổ biến nhiệt cao'
    ],
    consumables: 'E502-15/-16 (P5), E505-15/-16 (P9), E9018-B9 / E9015-B9 (P91)',
    color: '#aa4322',
    notes: '⚠⚠ Preheat 200-250°C · PWHT 750-780°C bắt buộc · Test hardness ≤ 250 HV sau PWHT'
  },

  /* ===== STRUCTURAL / WEATHERING ===== */
  { group: 'P-No. 1', subgroup: 'Special (Weathering)',
    name: 'Thép chịu thời tiết (Corten-A/B)',
    yield: '345-485 MPa',
    materials: [
      'ASTM A588 Gr.A/B/C/K (Cor-Ten A/B)',
      'ASTM A242 (Cor-Ten)',
      'ASTM A709 Gr.50W / 50WT3 (cầu)',
      'EN S355J0W / S355J2W (Cor-Ten EU)',
      'JIS SMA400AW / SMA490AW / SMA570W'
    ],
    consumables: 'E7018-W1, E8018-W2, ER80S-Ni1 (≥ 0.4% Cu trong filler)',
    color: '#854f0b',
    notes: 'Tạo lớp rỉ patina bảo vệ → không cần sơn · Quan trọng: filler phải có Cu để patina đều màu'
  }
];

console.log('WPS_MATGROUPS loaded:', window.WPS_MATGROUPS.length, 'material groups');
