/* Tier 3 chuẩn cho app Dung sai:
   DIN 18800 (Đức cũ) · EN 1993-6 + AISE TR-13 (Crane runway) · AASHTO LRFD (cầu Mỹ) · AS/NZS 5131 (Úc) */
(function(){
  if (!window.APP_DATA) window.APP_DATA = { standards: [], applicability: [], tolerances: [] };
  const D = window.APP_DATA;
  const T = (vi, en) => ({ vi, en });

  const newStds = [
    { code: 'DIN 18800-7:2008',
      title: { vi: 'DIN 18800-7 — Stahlbauten Ausführung (kết cấu thép Đức)', en: 'DIN 18800-7 German steel execution' },
      region: 'EU', edition: '2008' },
    { code: 'EN 1993-6:2007',
      title: { vi: 'EN 1993-6 — Eurocode 3 Crane Runway', en: 'EN 1993-6 Crane Runway' },
      region: 'EU', edition: '2007' },
    { code: 'AISE TR-13:2003',
      title: { vi: 'AISE TR-13 — Mill Building Crane Runway', en: 'AISE Technical Report 13' },
      region: 'US', edition: '2003 R2018' },
    { code: 'AASHTO LRFD:2020',
      title: { vi: 'AASHTO LRFD Bridge Construction Spec (cầu Mỹ)', en: 'AASHTO LRFD Bridge Construction' },
      region: 'US', edition: '2020 (9th)' },
    { code: 'AS/NZS 5131:2016',
      title: { vi: 'AS/NZS 5131 — Steel structures fabrication & erection (Úc/NZ)', en: 'AS/NZS 5131' },
      region: 'AU', edition: '2016' }
  ];
  newStds.forEach(s => { if (!D.standards.some(x => x.code===s.code)) D.standards.push(s); });

  const newRules = [
    /* ===== DIN 18800 ===== */
    { id: 'din-column-plumb',
      standard: 'DIN 18800-7:2008', region: 'EU',
      category: 'erection', element: 'column', feature: 'plumb',
      title: T('DIN — Plumb of column','DIN column plumb'),
      sketch: 'column_plumb',
      permitted: { kind: 'FORMULA', expression: 'H/500', unit: 'mm',
        variables: [{ key: 'H', label: T('H chiều cao cột (mm)','H = column height (mm)') }] },
      acceptance: T('Cột lệch đỉnh ≤ H/500 (= 2× chặt hơn EN 1090 Class 1)','Column plumb ≤ H/500'),
      clause: { number: 'DIN 18800-7 Table 6' }
    },
    { id: 'din-beam-camber',
      standard: 'DIN 18800-7:2008', region: 'EU',
      category: 'fabrication', element: 'beam', feature: 'straightness',
      title: T('DIN — Dầm camber','DIN beam camber'),
      sketch: 'beam_straight',
      permitted: { kind: 'FORMULA', expression: 'L/1000', unit: 'mm',
        variables: [{ key: 'L', label: T('L chiều dài dầm (mm)','L = beam length (mm)') }] },
      acceptance: T('Camber dầm ≤ L/1000','Beam camber ≤ L/1000'),
      clause: { number: 'DIN 18800-7 §B.4' }
    },

    /* ===== EN 1993-6 + AISE TR-13 — Crane Runway ===== */
    { id: 'en1993-6-runway-level',
      standard: 'EN 1993-6:2007', region: 'EU',
      category: 'crane', element: 'runway', feature: 'straightness',
      title: T('EN 1993-6 — Lệch cao độ đường ray cẩu trục','Crane rail level deviation'),
      sketch: 'beam_straight',
      permitted: { kind: 'FORMULA', expression: 'L/1000', unit: 'mm',
        variables: [{ key: 'L', label: T('L khoảng cách 2 cột (mm)','L = span between supports (mm)') }] },
      acceptance: T('Sai lệch cao độ ≤ L/1000, max 10 mm theo phương dọc/ngang','Level dev ≤ L/1000, max 10 mm'),
      clause: { number: 'EN 1993-6 Annex A Table A.1' }
    },
    { id: 'en1993-6-gauge',
      standard: 'EN 1993-6:2007', region: 'EU',
      category: 'crane', element: 'runway', feature: 'gap',
      title: T('EN 1993-6 — Sai lệch khoảng cách 2 ray cẩu','Crane gauge deviation'),
      permitted: { kind: 'FIXED', expression: '10', unit: 'mm' },
      acceptance: T('Sai lệch khoảng cách 2 ray (gauge) ≤ ±10 mm cho L ≤ 16 m','Gauge dev ≤ ±10 mm for L ≤ 16 m'),
      clause: { number: 'EN 1993-6 §A.2.4' }
    },
    { id: 'aise-rail-twist',
      standard: 'AISE TR-13:2003', region: 'US',
      category: 'crane', element: 'rail', feature: 'twist',
      title: T('AISE TR-13 — Xoắn ray cẩu','Crane rail twist'),
      permitted: { kind: 'FIXED', expression: '0.5', unit: '°/m' },
      acceptance: T('Xoắn ray ≤ 0.5° trên 1 m chiều dài','Rail twist ≤ 0.5°/m'),
      clause: { number: 'AISE TR-13 §1.7.5' }
    },
    { id: 'aise-rail-joint',
      standard: 'AISE TR-13:2003', region: 'US',
      category: 'crane', element: 'rail', feature: 'gap',
      title: T('AISE — Khe hở mối nối ray','AISE rail joint gap'),
      permitted: { kind: 'FIXED', expression: '1.6', unit: 'mm' },
      acceptance: T('Khe hở giữa 2 thanh ray ≤ 1.6 mm (1/16")','Gap between rails ≤ 1.6 mm'),
      clause: { number: 'AISE TR-13 §1.7.3' }
    },

    /* ===== AASHTO LRFD — Bridge ===== */
    { id: 'aashto-camber',
      standard: 'AASHTO LRFD:2020', region: 'US',
      category: 'bridge', element: 'beam', feature: 'straightness',
      title: T('AASHTO — Camber dầm cầu thiết kế','AASHTO bridge camber'),
      sketch: 'beam_straight',
      permitted: { kind: 'REF', expression: T('Per design + dead load deflection','Per design + dead load') },
      acceptance: T('Camber sản xuất = camber thiết kế ± 6 mm + L/3000','Fab camber = design ± 6 mm + L/3000'),
      clause: { number: 'AASHTO LRFD §11.4.12.4' }
    },
    { id: 'aashto-girder-sweep',
      standard: 'AASHTO LRFD:2020', region: 'US',
      category: 'bridge', element: 'beam', feature: 'straightness',
      title: T('AASHTO — Sweep ngang dầm cầu','AASHTO horizontal sweep'),
      permitted: { kind: 'FORMULA', expression: 'L/2000', unit: 'mm',
        variables: [{ key: 'L', label: T('L chiều dài nhịp (mm)','L = span (mm)') }] },
      acceptance: T('Sweep ngang ≤ L/2000 nhưng ≤ 9.5 mm (3/8")','Sweep ≤ L/2000 but ≤ 9.5 mm'),
      clause: { number: 'AASHTO LRFD §11.4.12.5' }
    },
    { id: 'aashto-deck-elev',
      standard: 'AASHTO LRFD:2020', region: 'US',
      category: 'bridge', element: 'deck', feature: 'position',
      title: T('AASHTO — Sai lệch cao độ mặt cầu','AASHTO deck elevation'),
      permitted: { kind: 'FIXED', expression: '10', unit: 'mm' },
      acceptance: T('Sai lệch cao độ mặt cầu ≤ ±10 mm vs design','Deck elevation ≤ ±10 mm vs design'),
      clause: { number: 'AASHTO LRFD §11.4.13' }
    },

    /* ===== AS/NZS 5131 — Australian/NZ ===== */
    { id: 'asnzs-column-plumb',
      standard: 'AS/NZS 5131:2016', region: 'AU',
      category: 'erection', element: 'column', feature: 'plumb',
      title: T('AS/NZS — Plumb cột (CC2)','AS/NZS column plumb (CC2)'),
      sketch: 'column_plumb',
      permitted: { kind: 'FORMULA', expression: 'H/500', unit: 'mm',
        variables: [{ key: 'H', label: T('H chiều cao cột (mm)','H = column height (mm)') }] },
      acceptance: T('Construction Category CC2 (mặc định): plumb ≤ H/500','CC2 default: plumb ≤ H/500'),
      clause: { number: 'AS/NZS 5131 §8.3.1 Table 8.3' }
    },
    { id: 'asnzs-beam-camber',
      standard: 'AS/NZS 5131:2016', region: 'AU',
      category: 'fabrication', element: 'beam', feature: 'straightness',
      title: T('AS/NZS — Camber dầm','AS/NZS beam camber'),
      sketch: 'beam_straight',
      permitted: { kind: 'FORMULA', expression: 'L/1000', unit: 'mm',
        variables: [{ key: 'L', label: T('L chiều dài dầm (mm)','L = beam length (mm)') }] },
      acceptance: T('Beam camber ≤ L/1000, max 25 mm','Beam camber ≤ L/1000, max 25 mm'),
      clause: { number: 'AS/NZS 5131 Table 8.2' }
    }
  ];

  newRules.forEach(r => { if (!D.tolerances.some(x => x.id===r.id)) D.tolerances.push(r); });

  console.log('Tier 3 loaded:', newRules.length, 'rules,', newStds.length, 'standards');
})();
