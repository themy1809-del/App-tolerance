/* ============================================================================
   ISO 13920:2023 — Dung sai chung cho kết cấu hàn
   (General tolerances for welded constructions: lengths, angles, shape & position)
   Tác giả app: Đậu Thế Mỹ.
   ----------------------------------------------------------------------------
   GHI CHÚ BẢN QUYỀN: chỉ lưu GIÁ TRỊ dung sai (dữ kiện) + vị trí trích dẫn
   (điều khoản/bảng) + mô tả bằng lời. KHÔNG chép nguyên văn bảng/đoạn của ISO.
   ISO 13920 là tài liệu CÓ BẢN QUYỀN — khi nghiệm thu phải đối chiếu bản gốc.
   Mọi rule đánh dấu needsVerify:true (⚠ cần kiểm chứng bản gốc).
   Load SAU tolerances-data.js — tự append vào window.APP_DATA.
   ============================================================================ */
(function () {
  if (!window.APP_DATA) window.APP_DATA = { standards: [], applicability: [], tolerances: [] };
  const D = window.APP_DATA;
  const T = (vi, en) => ({ vi, en });
  const STD = 'ISO 13920:2023';

  if (!D.standards.some(x => x.code === STD)) {
    D.standards.push({
      code: STD,
      title: T('ISO 13920 — Dung sai chung cho kết cấu hàn (chiều dài, góc, hình dạng & vị trí)',
               'ISO 13920 — General tolerances for welded constructions'),
      region: 'INT', edition: '2023 (2nd ed.)'
    });
  }

  /* Khoảng kích thước danh nghĩa l (mm) — Bảng 1 (kích thước dài) */
  const linRanges = [
    { from: 0, to: 30, l: '2–30' }, { from: 30, to: 120, l: '30–120' }, { from: 120, to: 400, l: '120–400' },
    { from: 400, to: 1000, l: '400–1000' }, { from: 1000, to: 2000, l: '1000–2000' }, { from: 2000, to: 4000, l: '2000–4000' },
    { from: 4000, to: 8000, l: '4000–8000' }, { from: 8000, to: 12000, l: '8000–12000' }, { from: 12000, to: 16000, l: '12000–16000' },
    { from: 16000, to: 20000, l: '16000–20000' }, { from: 20000, to: 1e9, l: '>20000' }
  ];
  /* Khoảng cạnh dài bề mặt l (mm) — Bảng 3 (độ thẳng/phẳng/song song) */
  const formRanges = [
    { from: 0, to: 120, l: '≤120' }, { from: 120, to: 400, l: '120–400' }, { from: 400, to: 1000, l: '400–1000' },
    { from: 1000, to: 2000, l: '1000–2000' }, { from: 2000, to: 4000, l: '2000–4000' }, { from: 4000, to: 8000, l: '4000–8000' },
    { from: 8000, to: 12000, l: '8000–12000' }, { from: 12000, to: 16000, l: '12000–16000' }, { from: 16000, to: 20000, l: '16000–20000' },
    { from: 20000, to: 1e9, l: '>20000' }
  ];
  /* Khoảng chiều dài cạnh ngắn l (mm) — Bảng 2 (góc) */
  const angRanges = [
    { from: 0, to: 400, l: 'l≤400' }, { from: 400, to: 1000, l: '400<l≤1000' }, { from: 1000, to: 1e9, l: 'l>1000' }
  ];

  const rules = [
    /* ---- Bảng 1: kích thước dài, cấp A–D ---- */
    {
      id: 'iso13920-linear', standard: STD, region: 'INT', category: 'FABRICATION', feature: 'LENGTH',
      element: T('Kết cấu hàn — kích thước dài', 'Welded construction — linear size'),
      title: T('Dung sai kích thước dài (Bảng 1 · cấp A–D)', 'Linear dimension tolerance (Table 1 · class A–D)'),
      permitted: {
        kind: 'TABLE', unit: 'mm', bandVar: 'L',
        bandLabel: T('Kích thước danh nghĩa l (mm)', 'Nominal size l (mm)'),
        classes: ['A', 'B', 'C', 'D'], ranges: linRanges,
        cells: {
          A: ['1', '1', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
          B: ['1', '2', '2', '3', '4', '6', '8', '10', '12', '14', '16'],
          C: ['1', '3', '4', '6', '8', '11', '14', '18', '21', '24', '27'],
          D: ['1', '4', '7', '9', '12', '16', '21', '27', '32', '36', '40']
        }
      },
      acceptance: T('Chọn cấp (A khít nhất → D thô nhất). Nhập kích thước danh nghĩa l, rồi nhập SAI LỆCH đo (đo − danh nghĩa): |sai lệch| ≤ t(cấp, l) → ĐẠT.',
                    'Pick class (A finest → D coarsest). Enter nominal size l then measured DEVIATION: |dev| ≤ t(class,l) → PASS.'),
      clause: { number: 'ISO 13920:2023, 4.1 / Bảng 1', page: 2 }, needsVerify: true
    },
    /* ---- Bảng 2: góc, cấp A–D (quy đổi mm/m × chiều dài cạnh) ---- */
    {
      id: 'iso13920-angular', standard: STD, region: 'INT', category: 'FABRICATION', feature: 'ANGULAR',
      element: T('Kết cấu hàn — kích thước góc', 'Welded construction — angular'),
      title: T('Dung sai góc (Bảng 2 · cấp A–D)', 'Angular tolerance (Table 2 · class A–D)'),
      permitted: {
        kind: 'TABLE', unit: 'mm', bandVar: 'L',
        bandLabel: T('Chiều dài cạnh ngắn l (mm)', 'Shorter leg length l (mm)'),
        classes: ['A', 'B', 'C', 'D'], ranges: angRanges,
        cells: {
          A: ['6*L/1000', '4.5*L/1000', '3*L/1000'],
          B: ['13*L/1000', '9*L/1000', '6*L/1000'],
          C: ['18*L/1000', '13*L/1000', '9*L/1000'],
          D: ['26*L/1000', '22*L/1000', '18*L/1000']
        }
      },
      acceptance: T('Đo theo cạnh NGẮN của góc. Nhập chiều dài cạnh ngắn l và độ lệch đo (mm, khe hở ở đầu cạnh): |độ lệch| ≤ t → ĐẠT. Quy đổi góc: A ±20′/±15′/±10′ · B ±45′/±30′/±20′ · C ±1°/±45′/±30′ · D ±1°30′/±1°15′/±1° (theo 3 khoảng l).',
                    'Measure on SHORTER leg. t = (mm/m)×leg(m). Degree equivalents: A ±20′/15′/10′; B ±45′/30′/20′; C ±1°/45′/30′; D ±1°30′/1°15′/1°.'),
      clause: { number: 'ISO 13920:2023, 4.2 / Bảng 2', page: 3 }, needsVerify: true
    },
    /* ---- Bảng 3: độ thẳng, cấp E–H ---- */
    {
      id: 'iso13920-straight', standard: STD, region: 'INT', category: 'FABRICATION', feature: 'STRAIGHTNESS',
      element: T('Kết cấu hàn — bề mặt/cạnh', 'Welded construction — surface/edge'),
      title: T('Dung sai độ thẳng (Bảng 3 · cấp E–H)', 'Straightness tolerance (Table 3 · class E–H)'),
      permitted: {
        kind: 'TABLE', unit: 'mm', bandVar: 'L',
        bandLabel: T('Cạnh dài của bề mặt l (mm)', 'Longer side l (mm)'),
        classes: ['E', 'F', 'G', 'H'], ranges: formRanges,
        cells: {
          E: ['0.5', '1', '1.5', '2', '3', '4', '5', '6', '7', '8'],
          F: ['1', '1.5', '3', '4.5', '6', '8', '10', '12', '14', '16'],
          G: ['1.5', '3', '5.5', '9', '11', '16', '20', '22', '25', '25'],
          H: ['2.5', '5', '9', '14', '18', '26', '32', '36', '40', '40']
        }
      },
      acceptance: T('Dùng thước thẳng/dây căng đo khe hở lớn nhất hmax−hmin. Nhập cạnh dài l và giá trị đo: khe hở ≤ t(cấp, l) → ĐẠT. (t là giá trị TỐI ĐA, không phải ±.)',
                    'hmax−hmin ≤ t(class,l) → PASS. t is a MAX value (not ±).'),
      clause: { number: 'ISO 13920:2023, 4.3 / Bảng 3', page: 4 }, needsVerify: true
    },
    /* ---- Bảng 3: độ phẳng, cấp E–H ---- */
    {
      id: 'iso13920-flat', standard: STD, region: 'INT', category: 'FABRICATION', feature: 'FLATNESS',
      element: T('Kết cấu hàn — bề mặt', 'Welded construction — surface'),
      title: T('Dung sai độ phẳng (Bảng 3 · cấp E–H)', 'Flatness tolerance (Table 3 · class E–H)'),
      permitted: {
        kind: 'TABLE', unit: 'mm', bandVar: 'L',
        bandLabel: T('Cạnh dài của bề mặt l (mm)', 'Longer side l (mm)'),
        classes: ['E', 'F', 'G', 'H'], ranges: formRanges,
        cells: {
          E: ['0.5', '1', '1.5', '2', '3', '4', '5', '6', '7', '8'],
          F: ['1', '1.5', '3', '4.5', '6', '8', '10', '12', '14', '16'],
          G: ['1.5', '3', '5.5', '9', '11', '16', '20', '22', '25', '25'],
          H: ['2.5', '5', '9', '14', '18', '26', '32', '36', '40', '40']
        }
      },
      acceptance: T('Đo độ lệch lớn nhất của bề mặt so với mặt phẳng chuẩn. Nhập cạnh dài l và giá trị đo: độ lệch ≤ t(cấp, l) → ĐẠT. (t là giá trị TỐI ĐA, không phải ±.)',
                    'Max surface deviation ≤ t(class,l) → PASS. t is a MAX value.'),
      clause: { number: 'ISO 13920:2023, 4.3 / Bảng 3', page: 4 }, needsVerify: true
    },
    /* ---- Bảng 3: độ song song, cấp E–H ---- */
    {
      id: 'iso13920-parallel', standard: STD, region: 'INT', category: 'FABRICATION', feature: 'PARALLELISM',
      element: T('Kết cấu hàn — hai mặt/cạnh', 'Welded construction — two faces/edges'),
      title: T('Dung sai độ song song (Bảng 3 · cấp E–H)', 'Parallelism tolerance (Table 3 · class E–H)'),
      permitted: {
        kind: 'TABLE', unit: 'mm', bandVar: 'L',
        bandLabel: T('Cạnh dài của bề mặt l (mm)', 'Longer side l (mm)'),
        classes: ['E', 'F', 'G', 'H'], ranges: formRanges,
        cells: {
          E: ['0.5', '1', '1.5', '2', '3', '4', '5', '6', '7', '8'],
          F: ['1', '1.5', '3', '4.5', '6', '8', '10', '12', '14', '16'],
          G: ['1.5', '3', '5.5', '9', '11', '16', '20', '22', '25', '25'],
          H: ['2.5', '5', '9', '14', '18', '26', '32', '36', '40', '40']
        }
      },
      acceptance: T('Đo chênh lệch khoảng cách giữa hai mặt/cạnh trên chiều dài l. Nhập cạnh dài l và giá trị đo: chênh lệch ≤ t(cấp, l) → ĐẠT. (t là giá trị TỐI ĐA, không phải ±.)',
                    'Distance variation between two faces ≤ t(class,l) → PASS. t is a MAX value.'),
      clause: { number: 'ISO 13920:2023, 4.3 / Bảng 3', page: 4 }, needsVerify: true
    }
  ];

  rules.forEach(r => { if (!D.tolerances.some(x => x.id === r.id)) D.tolerances.push(r); });
})();
