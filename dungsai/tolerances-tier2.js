/* Tier 2 chuẩn cho app Dung sai:
   GB 50205-2020 (TQ) · AWS D1.5 (cầu) · AISC 360-22 (Mỹ update) · EN 1090-4 (cold-formed) */
(function(){
  if (!window.APP_DATA) window.APP_DATA = { standards: [], applicability: [], tolerances: [] };
  const D = window.APP_DATA;
  const T = (vi, en) => ({ vi, en });

  /* === Standards === */
  const newStds = [
    { code: 'GB 50205-2020',
      title: { vi: 'GB 50205 — Tiêu chuẩn nghiệm thu kết cấu thép TQ', en: 'GB 50205 — Chinese steel structure acceptance' },
      region: 'CN', edition: '2020' },
    { code: 'AWS D1.5:2020',
      title: { vi: 'AWS D1.5 — Bridge Welding Code', en: 'AWS D1.5 Bridge Welding' },
      region: 'US', edition: '2020' },
    { code: 'AISC 360-22',
      title: { vi: 'AISC 360-22 — Specification for Structural Steel Buildings', en: 'AISC 360-22' },
      region: 'US', edition: '2022' },
    { code: 'EN 1090-4:2018',
      title: { vi: 'EN 1090-4 — Cold-formed structural steel elements', en: 'EN 1090-4 Cold-formed' },
      region: 'EU', edition: '2018' }
  ];
  newStds.forEach(s => { if (!D.standards.some(x => x.code===s.code)) D.standards.push(s); });

  /* === Rules === */
  const newRules = [
    /* ===== GB 50205-2020 — Trung Quốc ===== */
    { id: 'gb50205-column-len',
      standard: 'GB 50205-2020', region: 'CN',
      category: 'fabrication', element: 'column', feature: 'length',
      title: T('GB — Chiều dài cột chế tạo','Column length fabrication'),
      sketch: 'beam_straight',
      permitted: { kind: 'REF', expression: '±3 mm (L≤10m) · ±5 mm (10<L≤24m) · ±7 mm (L>24m)', unit: 'mm' },
      acceptance: T('Cột chế tạo: ±3 mm (L≤10) · ±5 mm (10-24) · ±7 mm (>24)','Column fab length: ±3/5/7 mm by L range'),
      clause: { number: 'GB 50205-2020 §8.3.1 Table 8.3.1' }
    },
    { id: 'gb50205-column-plumb',
      standard: 'GB 50205-2020', region: 'CN',
      category: 'erection', element: 'column', feature: 'plumb',
      title: T('GB — Độ thẳng đứng cột lắp ráp','Column plumbness erection'),
      sketch: 'column_plumb',
      permitted: { kind: 'FORMULA', expression: 'min(H/1000, 25)', unit: 'mm',
        variables: [{ key: 'H', label: T('H chiều cao cột (mm)','H = column height (mm)') }] },
      acceptance: T('Độ lệch đỉnh ≤ H/1000 nhưng ≤ 25 mm (chặt hơn EN 1090)','Plumb ≤ H/1000 but ≤ 25 mm'),
      clause: { number: 'GB 50205-2020 §10.3.1' }
    },
    { id: 'gb50205-beam-camber',
      standard: 'GB 50205-2020', region: 'CN',
      category: 'fabrication', element: 'beam', feature: 'straightness',
      title: T('GB — Camber/độ võng dầm chế tạo','GB beam camber'),
      sketch: 'beam_straight',
      permitted: { kind: 'FORMULA', expression: 'L/1000', unit: 'mm',
        variables: [{ key: 'L', label: T('L chiều dài dầm (mm)','L = beam length (mm)') }] },
      acceptance: T('Camber dầm ≤ L/1000, max 10 mm','Beam camber ≤ L/1000, max 10 mm'),
      clause: { number: 'GB 50205-2020 §8.4.1 Table 8.4.1' }
    },
    { id: 'gb50205-flatness',
      standard: 'GB 50205-2020', region: 'CN',
      category: 'fabrication', element: 'plate', feature: 'flatness',
      title: T('GB — Độ phẳng tấm thi công','GB plate flatness'),
      sketch: 'floor_flatness',
      permitted: { kind: 'FIXED', expression: '5', unit: 'mm/1m' },
      acceptance: T('Độ phẳng tấm ≤ 5 mm trên 1 m','Plate flatness ≤ 5 mm in 1 m'),
      clause: { number: 'GB 50205-2020 §8.5' }
    },
    { id: 'gb50205-hole',
      standard: 'GB 50205-2020', region: 'CN',
      category: 'fabrication', element: 'connection', feature: 'position',
      title: T('GB — Vị trí lỗ bu lông','GB bolt hole position'),
      sketch: 'bolt_hole',
      permitted: { kind: 'FIXED', expression: '1.5', unit: 'mm' },
      acceptance: T('Vị trí lỗ ±1.5 mm so với bản vẽ (chặt hơn AISC)','Hole position ±1.5 mm'),
      clause: { number: 'GB 50205-2020 §8.6.1' }
    },
    { id: 'gb50205-weld-undercut',
      standard: 'GB 50205-2020', region: 'CN',
      category: 'weld', element: 'butt', feature: 'undercut',
      title: T('GB — Undercut cấp I/II','GB undercut class I/II'),
      sketch: 'weld_undercut',
      permitted: { kind: 'MULTI',
        sets: [
          { name: 'Cấp I (chính)', expression: '0', unit: 'mm' },
          { name: 'Cấp II (phụ)', expression: '≤ 0.5, max 10% chiều dài' }
        ] },
      acceptance: T('Cấp I: KHÔNG cho phép undercut. Cấp II: ≤ 0.5 mm, không quá 10% chiều dài','Class I: no undercut. Class II: ≤ 0.5 mm, max 10% length'),
      clause: { number: 'GB 50205-2020 §B.0.1' }
    },

    /* ===== AWS D1.5 — Bridge ===== */
    { id: 'd15-camber',
      standard: 'AWS D1.5:2020', region: 'US',
      category: 'bridge', element: 'beam', feature: 'straightness',
      title: T('AWS D1.5 — Cong dầm cầu (camber)','Bridge girder camber'),
      sketch: 'beam_straight',
      permitted: { kind: 'FORMULA', expression: 'L/2000', unit: 'mm',
        variables: [{ key: 'L', label: T('L chiều dài nhịp (mm)','L = span (mm)') }] },
      acceptance: T('Camber dầm cầu ≤ L/2000 (chặt 2× so với building)','Bridge camber ≤ L/2000'),
      clause: { number: 'AWS D1.5 §3.5' }
    },
    { id: 'd15-undercut',
      standard: 'AWS D1.5:2020', region: 'US',
      category: 'weld', element: 'butt', feature: 'undercut',
      title: T('AWS D1.5 — Undercut cầu (chặt nhất)','D1.5 undercut bridge'),
      sketch: 'weld_undercut',
      permitted: { kind: 'FIXED', expression: '0.25', unit: 'mm' },
      acceptance: T('Cầu — undercut TỐI ĐA 0.25 mm vuông góc tải · 1 mm song song','Bridge — max 0.25 mm ⊥ load, 1 mm ∥'),
      clause: { number: 'AWS D1.5 §6.26.2' }
    },
    { id: 'd15-fillet',
      standard: 'AWS D1.5:2020', region: 'US',
      category: 'weld', element: 'fillet', feature: 'reinforcement',
      title: T('AWS D1.5 — Fillet leg cầu','D1.5 fillet leg bridge'),
      sketch: 'fillet_leg',
      permitted: { kind: 'FIXED', expression: '1.6', unit: 'mm' },
      acceptance: T('Underrun fillet leg ≤ 1.6 mm trên ≤ 10% chiều dài (như D1.1)','Underrun ≤ 1.6 mm, ≤ 10% length'),
      clause: { number: 'AWS D1.5 §6.26.1' }
    },

    /* ===== AISC 360-22 ===== */
    { id: 'a360-column-length',
      standard: 'AISC 360-22', region: 'US',
      category: 'fabrication', element: 'column', feature: 'length',
      title: T('AISC 360 — Chiều dài cột finished','AISC column finished length'),
      sketch: 'beam_straight',
      permitted: { kind: 'FORMULA', expression: 'min(1.5, L/0.001*0.001)', unit: 'mm',
        variables: [{ key: 'L', label: T('L chiều dài (mm)','L = length (mm)') }] },
      acceptance: T('Cột mài mặt: −1.5 / +0 mm (chặt) · không mài: ±5 mm','Finished column: −1.5/+0 mm. Unfinished: ±5 mm'),
      clause: { number: 'AISC 360-22 Section M2.7' }
    },
    { id: 'a360-plumb',
      standard: 'AISC 360-22', region: 'US',
      category: 'erection', element: 'column', feature: 'plumb',
      title: T('AISC 360 — Plumb of column','AISC column plumb (erected)'),
      sketch: 'column_plumb',
      permitted: { kind: 'FORMULA', expression: 'min(H/500, 50)', unit: 'mm',
        variables: [{ key: 'H', label: T('H chiều cao cột (mm)','H = column height (mm)') }] },
      acceptance: T('Đỉnh cột lệch ≤ H/500 nhưng ≤ 50 mm','Column top ≤ H/500 but ≤ 50 mm'),
      clause: { number: 'AISC 360-22 + AISC 303 §7.13.1.1' }
    },

    /* ===== EN 1090-4 — Cold-formed ===== */
    { id: 'en1090-4-purlin-straight',
      standard: 'EN 1090-4:2018', region: 'EU',
      category: 'fabrication', element: 'purlin', feature: 'straightness',
      title: T('EN 1090-4 — Cong xà gồ (purlin)','EN 1090-4 purlin straightness'),
      sketch: 'beam_straight',
      permitted: { kind: 'FORMULA', expression: 'L/750', unit: 'mm',
        variables: [{ key: 'L', label: T('L chiều dài xà gồ (mm)','L = purlin length (mm)') }] },
      acceptance: T('Cong toàn xà gồ ≤ L/750','Total bow ≤ L/750'),
      clause: { number: 'EN 1090-4:2018 §10.1' }
    },
    { id: 'en1090-4-section-angle',
      standard: 'EN 1090-4:2018', region: 'EU',
      category: 'fabrication', element: 'purlin', feature: 'squareness',
      title: T('EN 1090-4 — Góc gập section','EN 1090-4 bend angle'),
      permitted: { kind: 'FIXED', expression: '1', unit: '°' },
      acceptance: T('Sai lệch góc gập ≤ ±1°','Bend angle deviation ≤ ±1°'),
      clause: { number: 'EN 1090-4 Table 9' }
    }
  ];

  newRules.forEach(r => { if (!D.tolerances.some(x => x.id===r.id)) D.tolerances.push(r); });

  console.log('Tier 2 loaded:', newRules.length, 'rules,', newStds.length, 'standards');
})();
