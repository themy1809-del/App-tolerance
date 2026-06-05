/* Bổ sung Tier 1 chuẩn cho app Dung sai:
   API 650 (bồn) · ASME VIII §UG-80 (bồn áp lực) · ISO 5817 (cấp mối hàn) · TCVN
   Load SAU tolerances-data.js — tự append vào window.APP_DATA. */
(function(){
  if (!window.APP_DATA) window.APP_DATA = { standards: [], applicability: [], tolerances: [] };
  const D = window.APP_DATA;

  /* === Thêm vào standards list === */
  const newStds = [
    { code: 'API 650:2020',
      title: { vi: 'API 650 — Welded Tanks for Oil Storage', en: 'API 650 — Welded Tanks for Oil Storage' },
      region: 'US', edition: '2020 (13th Ed.)' },
    { code: 'ASME VIII Div.1:2023',
      title: { vi: 'ASME VIII Div.1 — Bồn áp lực (UG-80 dung sai)', en: 'ASME VIII Div.1 — Pressure Vessels' },
      region: 'US', edition: '2023' },
    { code: 'ISO 5817:2023',
      title: { vi: 'ISO 5817 — Cấp chất lượng mối hàn B/C/D', en: 'ISO 5817 — Weld quality levels' },
      region: 'INT', edition: '2023' },
    { code: 'TCVN 5575:2012',
      title: { vi: 'TCVN 5575 — Kết cấu thép — Tiêu chuẩn thiết kế', en: 'TCVN 5575 — Steel design code' },
      region: 'VN', edition: '2012' },
    { code: 'TCVN 170:2007',
      title: { vi: 'TCVN 170 — Kết cấu thép — Gia công, lắp ráp & nghiệm thu', en: 'TCVN 170 — Steel fabrication & acceptance' },
      region: 'VN', edition: '2007' }
  ];
  newStds.forEach(s => {
    if (!D.standards.some(x => x.code === s.code)) D.standards.push(s);
  });

  /* === Helper === */
  const T = (vi, en) => ({ vi, en });

  /* === Tolerances list (rules) === */
  const newRules = [
    /* --------- API 650 — TANK --------- */
    { id: 'api650-shell-diam',
      standard: 'API 650:2020', region: 'US',
      category: 'tank', element: 'shell', feature: 'roundness',
      title: T('Bồn — Sai lệch đường kính shell','Tank shell diameter deviation'),
      sketch: 'tank_round',
      permitted: { kind: 'FORMULA', expression: 'min(D/200, 25)', unit: 'mm',
        variables: [{ key: 'D', label: T('D đường kính bồn (mm)','D = shell diameter (mm)') }] },
      acceptance: T('|R đo − R nominal| ≤ D/200 nhưng không quá 25 mm tại mọi điểm','|R measured − R nominal| ≤ D/200 but ≤ 25 mm at any point'),
      clause: { number: 'API 650 §7.5.4', page: 7, quote: 'The radii measured shall not deviate from the nominal radius by more than 19 mm to 25 mm depending on shell diameter.' }
    },
    { id: 'api650-shell-plumb',
      standard: 'API 650:2020', region: 'US',
      category: 'tank', element: 'shell', feature: 'plumb',
      title: T('Bồn — Sai lệch đứng (Plumbness)','Tank shell plumbness'),
      sketch: 'tank_plumb',
      permitted: { kind: 'FORMULA', expression: 'H/200', unit: 'mm',
        variables: [{ key: 'H', label: T('H chiều cao bồn (mm)','H = tank height (mm)') }] },
      acceptance: T('Độ lệch đỉnh shell ≤ H/200','Top-of-shell deviation ≤ H/200'),
      clause: { number: 'API 650 §7.5.3', page: 7 }
    },
    { id: 'api650-bottom-flat',
      standard: 'API 650:2020', region: 'US',
      category: 'tank', element: 'bottom', feature: 'flatness',
      title: T('Bồn — Độ phẳng đáy','Tank bottom flatness'),
      sketch: 'tank_bottom',
      permitted: { kind: 'FIXED', expression: '13', unit: 'mm/3m' },
      acceptance: T('Sai lệch độ phẳng đáy ≤ 13 mm trong 3 m bất kỳ','Bottom flatness ≤ 13 mm in any 3 m'),
      clause: { number: 'API 650 §7.5.6', page: 7 }
    },
    { id: 'api650-bottom-radial',
      standard: 'API 650:2020', region: 'US',
      category: 'tank', element: 'bottom', feature: 'flatness',
      title: T('Bồn — Sai lệch radial đáy','Tank bottom radial slope'),
      permitted: { kind: 'FIXED', expression: '25', unit: 'mm' },
      acceptance: T('Sai lệch độ phẳng theo phương radial ≤ 25 mm trên toàn đáy','Bottom radial flatness ≤ 25 mm overall'),
      clause: { number: 'API 650 §7.5.6', page: 7 }
    },
    { id: 'api650-roof-slope',
      standard: 'API 650:2020', region: 'US',
      category: 'tank', element: 'roof', feature: 'position',
      title: T('Bồn — Sai lệch mái cone','Cone roof slope deviation'),
      permitted: { kind: 'REF', expression: T('Theo bản vẽ thiết kế','Per design drawing') },
      acceptance: T('Sai lệch dốc mái ≤ 25 mm so với bản vẽ','Roof slope ≤ 25 mm vs design'),
      clause: { number: 'API 650 §7.5.7', page: 7 }
    },
    { id: 'api650-anchor',
      standard: 'API 650:2020', region: 'US',
      category: 'tank', element: 'anchor', feature: 'position',
      title: T('Bồn — Vị trí bu lông neo','Anchor bolt position'),
      permitted: { kind: 'FIXED', expression: '3', unit: 'mm' },
      acceptance: T('Vị trí bu lông neo ±3 mm theo radial, ±6 mm theo chu vi','Anchor bolt radial ±3 mm, circumferential ±6 mm'),
      clause: { number: 'API 650 §7.5.5' }
    },

    /* --------- ASME VIII §UG-80 — PRESSURE VESSEL --------- */
    { id: 'asme-ug80-oor',
      standard: 'ASME VIII Div.1:2023', region: 'US',
      category: 'vessel', element: 'shell', feature: 'roundness',
      title: T('Bồn áp lực — Out-of-roundness (UG-80(a))','Pressure vessel out-of-roundness'),
      sketch: 'vessel_oor',
      permitted: { kind: 'FORMULA', expression: 'D/100', unit: 'mm',
        variables: [{ key: 'D', label: T('D đường kính danh nghĩa (mm)','D nominal diameter (mm)') }] },
      acceptance: T('|D max − D min| ≤ 1% × D nominal · áp lực trong: chặt hơn 0.5%','|Dmax − Dmin| ≤ 1% × D nominal · internal pressure: 0.5%'),
      clause: { number: 'ASME VIII Div.1 UG-80(a)', page: 80, quote: 'The difference between the maximum and minimum inside diameters at any cross section shall not exceed 1% of the nominal diameter.' }
    },
    { id: 'asme-ug80-ext-oor',
      standard: 'ASME VIII Div.1:2023', region: 'US',
      category: 'vessel', element: 'shell', feature: 'roundness',
      title: T('Bồn chịu áp lực ngoài — OOR chặt hơn','External pressure OOR stricter'),
      permitted: { kind: 'REF', expression: T('Theo Figure UG-80.1 — phụ thuộc t/D','Per Figure UG-80.1 — depends on t/D') },
      acceptance: T('Bồn chịu áp lực NGOÀI — chặt hơn 0.5-1% tuỳ t/D — phải kiểm theo Figure UG-80.1','External pressure vessel — stricter 0.5-1% depending on t/D'),
      clause: { number: 'ASME VIII Div.1 UG-80(b)', page: 80 }
    },
    { id: 'asme-uw35-undercut',
      standard: 'ASME VIII Div.1:2023', region: 'US',
      category: 'weld', element: 'butt', feature: 'undercut',
      title: T('Mối hàn bồn — Undercut (UW-35)','Pressure vessel weld undercut'),
      permitted: { kind: 'FORMULA', expression: 'min(0.8, t*0.1)', unit: 'mm',
        variables: [{ key: 't', label: T('t chiều dày tấm (mm)','t = plate thickness (mm)') }] },
      acceptance: T('Cháy chân ≤ 0.8 mm hoặc ≤ 10% × t, lấy nhỏ hơn','Undercut ≤ 0.8 mm or ≤ 10% × t, whichever smaller'),
      clause: { number: 'ASME VIII Div.1 UW-35', page: 35 }
    },
    { id: 'asme-uw35-reinf',
      standard: 'ASME VIII Div.1:2023', region: 'US',
      category: 'weld', element: 'butt', feature: 'reinforcement',
      title: T('Mối hàn bồn — Reinforcement (UW-35)','PV weld reinforcement'),
      sketch: 'weld_reinforcement',
      permitted: { kind: 'TABLE', bandVar: 't',
        bands: [
          { lo: 0, hi: 13, label: 't ≤ 13 mm' },
          { lo: 13, hi: 25, label: '13 < t ≤ 25 mm' },
          { lo: 25, hi: 9999, label: 't > 25 mm' }
        ],
        sets: [
          { name: 'All', cells: ['3','4','6'], unit: 'mm' }
        ]
      },
      acceptance: T('Lồi mối hàn ≤ 3/4/6 mm theo Table UW-35.1','Reinforcement ≤ 3/4/6 mm per UW-35.1'),
      clause: { number: 'ASME VIII Div.1 UW-35 Table', page: 35 }
    },
    { id: 'asme-uw35-concav',
      standard: 'ASME VIII Div.1:2023', region: 'US',
      category: 'weld', element: 'butt', feature: 'concavity',
      title: T('Mối hàn bồn — Lõm gốc','PV root concavity'),
      permitted: { kind: 'FIXED', expression: '1.5', unit: 'mm' },
      acceptance: T('Lõm gốc ≤ 1.5 mm — nếu tổng còn ≥ chiều dày thiết kế thì OK','Root concavity ≤ 1.5 mm — if remaining wall ≥ design thickness, OK'),
      clause: { number: 'ASME VIII Div.1 UW-35(d)', page: 35 }
    },

    /* --------- ISO 5817 — WELD QUALITY LEVELS --------- */
    { id: 'iso5817-B-undercut',
      standard: 'ISO 5817:2023', region: 'INT',
      category: 'weld', element: 'butt', feature: 'undercut',
      title: T('ISO 5817 Cấp B — Undercut (chặt nhất)','ISO 5817 B — Undercut'),
      sketch: 'weld_undercut',
      permitted: { kind: 'FIXED', expression: '0.5', unit: 'mm' },
      acceptance: T('Cấp B (stringent) cho mỏi cao, biến đổi tải: cháy chân ≤ 0.5 mm','Quality level B for high fatigue: undercut ≤ 0.5 mm'),
      clause: { number: 'ISO 5817:2023 §5.10', quote: 'Continuous undercut, intermittent undercut: h ≤ 0.5 mm (B), 1 mm (C+D for t≥3)' }
    },
    { id: 'iso5817-C-undercut',
      standard: 'ISO 5817:2023', region: 'INT',
      category: 'weld', element: 'butt', feature: 'undercut',
      title: T('ISO 5817 Cấp C — Undercut (mặc định)','ISO 5817 C — Undercut'),
      sketch: 'weld_quality',
      permitted: { kind: 'FORMULA', expression: 'min(0.5, t*0.1)', unit: 'mm',
        variables: [{ key: 't', label: T('t = chiều dày tấm (mm)','t = plate thickness (mm)') }] },
      acceptance: T('Cấp C (intermediate) — mặc định cho kết cấu chính: cháy chân ≤ 0.5 mm hoặc 0.1t','Quality level C — default for main structure'),
      clause: { number: 'ISO 5817:2023 §5.10' }
    },
    { id: 'iso5817-D-undercut',
      standard: 'ISO 5817:2023', region: 'INT',
      category: 'weld', element: 'butt', feature: 'undercut',
      title: T('ISO 5817 Cấp D — Undercut (kết cấu phụ)','ISO 5817 D — Undercut'),
      permitted: { kind: 'FORMULA', expression: 'min(1.0, t*0.1)', unit: 'mm',
        variables: [{ key: 't', label: T('t = chiều dày tấm (mm)','t = plate thickness (mm)') }] },
      acceptance: T('Cấp D (moderate) — kết cấu phụ trợ: cháy chân ≤ 1 mm hoặc 0.1t','Quality level D — auxiliary structure'),
      clause: { number: 'ISO 5817:2023 §5.10' }
    },
    { id: 'iso5817-reinf',
      standard: 'ISO 5817:2023', region: 'INT',
      category: 'weld', element: 'butt', feature: 'reinforcement',
      title: T('ISO 5817 — Reinforcement (lồi mặt)','ISO 5817 — Excess weld metal'),
      sketch: 'weld_reinforcement',
      permitted: { kind: 'MULTI',
        sets: [
          { name: 'Cấp B', expression: '1 + 0.1·b', unit: 'mm, max 5 mm' },
          { name: 'Cấp C', expression: '1 + 0.15·b', unit: 'mm, max 7 mm' },
          { name: 'Cấp D', expression: '1 + 0.25·b', unit: 'mm, max 10 mm' }
        ] },
      acceptance: T('Lồi mặt h theo công thức 1 + k×b — k phụ thuộc cấp B/C/D','Excess metal h = 1 + k·b — k depends on quality level'),
      clause: { number: 'ISO 5817:2023 §5.10' }
    },
    { id: 'iso5817-porosity',
      standard: 'ISO 5817:2023', region: 'INT',
      category: 'weld', element: 'butt', feature: 'porosity',
      title: T('ISO 5817 — Lỗ rỗ (porosity)','ISO 5817 — Porosity'),
      permitted: { kind: 'MULTI',
        sets: [
          { name: 'Cấp B', expression: '≤ 0.2·s, max Ø3 mm' },
          { name: 'Cấp C', expression: '≤ 0.3·s, max Ø4 mm' },
          { name: 'Cấp D', expression: '≤ 0.4·s, max Ø5 mm' }
        ] },
      acceptance: T('s = chiều dày mối hàn. Single pore Ø nhỏ hơn theo cấp B/C/D','s = weld thickness. Single pore Ø varies by quality level'),
      clause: { number: 'ISO 5817:2023 Table 1' }
    },

    /* --------- TCVN --------- */
    { id: 'tcvn5575-length',
      standard: 'TCVN 5575:2012', region: 'VN',
      category: 'fabrication', element: 'beam', feature: 'length',
      title: T('TCVN — Sai lệch chiều dài cấu kiện','Member length deviation'),
      sketch: 'tcvn_assembly',
      permitted: { kind: 'TABLE', bandVar: 'L',
        bands: [
          { lo: 0, hi: 6000, label: 'L ≤ 6 m' },
          { lo: 6000, hi: 15000, label: '6 < L ≤ 15 m' },
          { lo: 15000, hi: 99999, label: 'L > 15 m' }
        ],
        sets: [{ name: 'TCVN', cells: ['5','10','15'], unit: 'mm' }]
      },
      acceptance: T('Sai lệch chiều dài tối đa ±5/10/15 mm theo dải L','Length deviation max ±5/10/15 mm by L range'),
      clause: { number: 'TCVN 170:2007 Bảng 3', page: 5 }
    },
    { id: 'tcvn-column-plumb',
      standard: 'TCVN 170:2007', region: 'VN',
      category: 'erection', element: 'column', feature: 'plumb',
      title: T('TCVN — Độ thẳng đứng cột (lắp ráp)','TCVN — Column plumbness (erection)'),
      sketch: 'column_plumb',
      permitted: { kind: 'FORMULA', expression: 'H/1000', unit: 'mm',
        variables: [{ key: 'H', label: T('H chiều cao cột (mm)','H = column height (mm)') }] },
      acceptance: T('Độ lệch đỉnh ≤ H/1000 nhưng ≤ 35 mm','Plumb out ≤ H/1000 but ≤ 35 mm'),
      clause: { number: 'TCVN 170:2007 §6.3', page: 12 }
    },
    { id: 'tcvn-floor-flat',
      standard: 'TCVN 170:2007', region: 'VN',
      category: 'fabrication', element: 'floor', feature: 'flatness',
      title: T('TCVN — Độ phẳng sàn thi công','Floor flatness'),
      sketch: 'floor_flatness',
      permitted: { kind: 'FIXED', expression: '6', unit: 'mm/2m' },
      acceptance: T('Δ ≤ 6 mm trên đoạn 2 m bất kỳ','Δ ≤ 6 mm in any 2 m'),
      clause: { number: 'TCVN 170:2007 §7.4' }
    }
  ];

  /* Merge into APP_DATA.tolerances */
  newRules.forEach(r => {
    if (!D.tolerances.some(x => x.id === r.id)) D.tolerances.push(r);
  });

  /* Add applicability if helper exists */
  if (D.applicability && D.applicability.length === 0) D.applicability.push(
    { feature: 'roundness', categories: ['tank','vessel'] },
    { feature: 'plumb', categories: ['column','tank'] }
  );

  console.log('Tier 1 standards loaded:', newRules.length, 'new rules,', newStds.length, 'new standards');
})();
