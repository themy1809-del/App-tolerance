/* ============================================================================
   HÌNH VẼ CÁCH ĐO — module QC Hàn (v2)
   Quy tắc: chỉ nhãn NGẮN trong SVG (chống tràn chữ khi phóng to);
   các bước đo chi tiết nằm ở phần text HAN_MEASURE hiển thị dưới hình.
   ============================================================================ */
(function () {
  const INK = '#1b2430', BRAND = '#7c2d12', DIM = '#aa4322', STEEL = '#cdd6df', WELD = '#e8b04b';
  const S = (inner) => `<svg viewBox="0 0 320 135" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">${inner}</svg>`;
  const plate = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${STEEL}" stroke="${INK}" stroke-width="1.5"/>`;
  const lbl = (x, y, t, c, a) => `<text x="${x}" y="${y}" font-size="11" font-weight="700" fill="${c || DIM}" text-anchor="${a || 'middle'}" font-family="Segoe UI,Arial">${t}</text>`;
  const arrow = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${DIM}" stroke-width="1.3" marker-end="url(#ah)"/>`;
  const DEFS = `<defs><marker id="ah" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="${DIM}"/></marker></defs>`;

  const filletBase = `
    ${plate(40, 95, 240, 22)}
    <rect x="140" y="18" width="22" height="78" fill="${STEEL}" stroke="${INK}" stroke-width="1.5"/>
    <path d="M162,95 L162,62 L196,95 Z" fill="${WELD}" stroke="${INK}" stroke-width="1.5"/>`;

  const buttBase = `
    ${plate(30, 80, 110, 26)} ${plate(180, 80, 110, 26)}
    <path d="M140,106 L148,80 L172,80 L180,106 Z" fill="${WELD}" stroke="${INK}" stroke-width="1.5"/>
    <path d="M141,80 Q160,66 179,80 Z" fill="${WELD}" stroke="${INK}" stroke-width="1.5"/>`;

  window.HAN_SK = {
    undercut: () => S(`${DEFS}${buttBase}
      <path d="M138,80 q4,7 8,1" fill="none" stroke="${INK}" stroke-width="1.6"/>
      <circle cx="142" cy="84" r="7" fill="none" stroke="${DIM}" stroke-width="1.3" stroke-dasharray="3,2"/>
      ${arrow(105, 118, 138, 86)}${lbl(72, 126, 'undercut h', DIM, 'start')}
      <line x1="60" y1="80" x2="120" y2="80" stroke="${INK}" stroke-width=".8" stroke-dasharray="4,3"/>
      ${lbl(230, 40, 'thước V-WAC', BRAND)}`),

    fillet_gauge: () => S(`${DEFS}${filletBase}
      ${arrow(208, 95, 198, 95)}${arrow(150, 50, 161, 61)}
      <line x1="162" y1="62" x2="162" y2="50" stroke="${DIM}" stroke-width="1" stroke-dasharray="3,2"/>
      <line x1="196" y1="95" x2="208" y2="95" stroke="${DIM}" stroke-width="1" stroke-dasharray="3,2"/>
      ${lbl(216, 99, 'z1', DIM, 'start')}${lbl(146, 46, 'z2', DIM, 'end')}
      <line x1="162" y1="95" x2="179" y2="78" stroke="${DIM}" stroke-width="1.3" stroke-dasharray="4,2"/>
      ${lbl(186, 74, 'a = z/√2', DIM, 'start')}
      <path d="M226,28 L276,28 L276,53 L251,53 Z" fill="#fff" stroke="${BRAND}" stroke-width="1.5"/>
      ${lbl(251, 22, 'fillet gauge', BRAND)}`),

    reinforcement: () => S(`${DEFS}${buttBase}
      <line x1="100" y1="80" x2="230" y2="80" stroke="${INK}" stroke-width="1.2"/>
      ${lbl(238, 84, 'thước thẳng', '#5f6b7a', 'start')}
      ${arrow(160, 50, 160, 67)}${lbl(160, 44, 'h', DIM)}
      ${arrow(141, 126, 141, 110)}${arrow(179, 126, 179, 110)}
      <line x1="141" y1="122" x2="179" y2="122" stroke="${DIM}" stroke-width="1"/>
      ${lbl(196, 126, 'b', DIM, 'start')}`),

    porosity: () => S(`${DEFS}
      ${plate(20, 50, 280, 44)}
      <rect x="20" y="59" width="280" height="26" fill="${WELD}" stroke="${INK}" stroke-width="1.2"/>
      <circle cx="70" cy="72" r="3.4" fill="#5a4636"/><circle cx="95" cy="69" r="2.4" fill="#5a4636"/>
      <circle cx="150" cy="74" r="4" fill="#5a4636"/><circle cx="222" cy="70" r="2.8" fill="#5a4636"/>
      <line x1="58" y1="40" x2="108" y2="40" stroke="${DIM}" stroke-width="1.3"/>
      <line x1="58" y1="40" x2="58" y2="55" stroke="${DIM}" stroke-width="1"/><line x1="108" y1="40" x2="108" y2="55" stroke="${DIM}" stroke-width="1"/>
      ${lbl(83, 32, '25 mm xấu nhất', DIM)}
      <line x1="30" y1="110" x2="290" y2="110" stroke="${DIM}" stroke-width="1.3"/>
      <line x1="30" y1="105" x2="30" y2="115" stroke="${DIM}" stroke-width="1"/><line x1="290" y1="105" x2="290" y2="115" stroke="${DIM}" stroke-width="1"/>
      ${lbl(160, 128, 'cộng dồn Ø rỗ ≥ 1mm / 300 mm', DIM)}`),

    crack: () => S(`${DEFS}${buttBase}
      <path d="M158,70 l3,-9 l-5,-8 l4,-9" fill="none" stroke="#c0241c" stroke-width="2"/>
      ${lbl(160, 30, 'nứt — mọi kích thước đều LOẠI', '#c0241c')}
      ${lbl(160, 126, 'nghi ngờ → MT / PT', BRAND)}`),

    crater: () => S(`${DEFS}
      ${plate(20, 70, 280, 36)}
      <rect x="20" y="78" width="190" height="20" fill="${WELD}" stroke="${INK}" stroke-width="1.2"/>
      <path d="M210,78 q14,3 14,10 q0,7 -14,10 Z" fill="#f3d9a8" stroke="${INK}" stroke-width="1.2"/>
      ${arrow(252, 56, 221, 82)}${lbl(240, 48, 'crater lõm', DIM)}
      ${lbl(160, 126, 'so với size bằng gauge', BRAND)}`),

    overlap: () => S(`${DEFS}${filletBase}
      <path d="M196,95 q14,-2 18,5 q-8,5 -18,-1 Z" fill="${WELD}" stroke="${INK}" stroke-width="1.4"/>
      ${arrow(244, 66, 208, 96)}${lbl(238, 50, 'kim loại phủ', DIM)}${lbl(238, 62, 'không ngấu', DIM)}`),

    asym: () => S(`${DEFS}${filletBase}
      ${arrow(208, 95, 198, 95)}<line x1="196" y1="95" x2="208" y2="95" stroke="${DIM}" stroke-width="1" stroke-dasharray="3,2"/>
      ${lbl(216, 99, 'z1', DIM, 'start')}
      ${arrow(150, 50, 161, 61)}<line x1="162" y1="62" x2="162" y2="50" stroke="${DIM}" stroke-width="1" stroke-dasharray="3,2"/>
      ${lbl(146, 46, 'z2', DIM, 'end')}
      ${lbl(240, 32, 'h = |z1 − z2|', BRAND)}`),

    concave: () => S(`${DEFS}
      ${plate(30, 80, 110, 26)} ${plate(180, 80, 110, 26)}
      <path d="M140,106 L148,80 L172,80 L180,106 Z" fill="${WELD}" stroke="${INK}" stroke-width="1.5"/>
      <path d="M141,80 Q160,90 179,80" fill="#fff" stroke="${INK}" stroke-width="1.4"/>
      <line x1="100" y1="80" x2="230" y2="80" stroke="${INK}" stroke-width="1.1"/>
      ${arrow(160, 56, 160, 84)}${lbl(160, 48, 'h', DIM)}
      ${lbl(244, 64, 'thước thẳng', '#5f6b7a')}
      ${lbl(160, 126, '+ thước lá đo khe h', BRAND)}`),

    penetration: () => S(`${DEFS}
      ${plate(30, 40, 110, 26)} ${plate(180, 40, 110, 26)}
      <path d="M140,40 L148,66 L172,66 L180,40 Z" fill="${WELD}" stroke="${INK}" stroke-width="1.5"/>
      <path d="M148,66 Q160,80 172,66 Z" fill="${WELD}" stroke="${INK}" stroke-width="1.5"/>
      ${arrow(206, 90, 166, 75)}${lbl(212, 94, 'h (root)', DIM, 'start')}
      ${arrow(120, 98, 152, 70)}${lbl(110, 110, 'b', DIM)}
      ${lbl(160, 128, 'đo mặt sau mối hàn', BRAND)}`),

    throat: () => S(`${DEFS}${filletBase}
      <path d="M167,90 Q179,74 191,90" fill="none" stroke="#c0241c" stroke-width="1.6" stroke-dasharray="4,2"/>
      <line x1="162" y1="95" x2="176" y2="81" stroke="${DIM}" stroke-width="1.3"/>
      ${lbl(240, 36, 'mặt lõm:', BRAND)}${lbl(240, 50, 'a thực < a', '#c0241c')}
      ${lbl(240, 70, 'đo cam gauge', '#5f6b7a')}`),

    fusion: () => S(`${DEFS}${buttBase}
      <line x1="148" y1="82" x2="150" y2="103" stroke="#c0241c" stroke-width="2.4"/>
      ${arrow(112, 124, 147, 96)}${lbl(98, 130, 'LOF lộ mép', '#c0241c', 'start')}
      ${lbl(160, 34, 'bên trong → kiểm UT', BRAND)}`),

    burn: () => S(`${DEFS}
      ${plate(30, 56, 110, 26)} ${plate(180, 56, 110, 26)}
      <path d="M140,56 L148,82 L172,82 L180,56 Z" fill="${WELD}" stroke="${INK}" stroke-width="1.5"/>
      <ellipse cx="160" cy="82" rx="11" ry="5" fill="#fff" stroke="#c0241c" stroke-width="1.8"/>
      ${arrow(212, 108, 170, 86)}${lbl(226, 116, 'thủng — LOẠI', '#c0241c')}`),

    stray: () => S(`${DEFS}
      ${plate(20, 56, 280, 40)}
      <rect x="20" y="64" width="280" height="24" fill="${WELD}" stroke="${INK}" stroke-width="1.1"/>
      <path d="M236,42 l6,8 l-4,1 l5,7" fill="none" stroke="#c0241c" stroke-width="1.8"/>
      <ellipse cx="242" cy="48" rx="9" ry="5" fill="none" stroke="#c0241c" stroke-width="1.4" stroke-dasharray="3,2"/>
      ${lbl(110, 36, 'hồ quang NGOÀI rãnh hàn', '#c0241c')}
      ${lbl(160, 122, 'mài nhẹ + MT/PT kiểm nứt', BRAND)}`),

    spatter: () => S(`${DEFS}
      ${plate(20, 56, 280, 40)}
      <rect x="20" y="64" width="280" height="24" fill="${WELD}" stroke="${INK}" stroke-width="1.1"/>
      <circle cx="70" cy="46" r="3" fill="#5a4636"/><circle cx="100" cy="40" r="2.2" fill="#5a4636"/>
      <circle cx="215" cy="44" r="2.6" fill="#5a4636"/><circle cx="250" cy="49" r="3.2" fill="#5a4636"/>
      ${lbl(160, 28, 'hạt bắn tóe bám mặt tấm', DIM)}
      ${lbl(160, 122, 'mài sạch trước khi sơn', BRAND)}`)
  };

  /* các bước đo theo id rule (fallback theo group trong index) */
  window.HAN_MEASURE = {
    undercut: {
      vi: '1) Làm sạch + soi đèn ≥350 lux dọc 2 chân mối hàn. 2) Đặt thước undercut (V-WAC/pit gauge) vuông góc mặt tấm tại điểm sâu nhất, đọc h (chính xác 0.1mm). 3) Với giới hạn cộng dồn: đo chiều dài từng đoạn quá 1mm bằng thước lá trong cửa sổ 300mm xấu nhất.',
      en: '1) Clean + inspect ≥350 lux along both toes. 2) Place undercut gauge (V-WAC/pit) perpendicular at deepest point, read h to 0.1mm. 3) For accumulated limits: measure each segment >1mm within worst 300mm window.'
    },
    fillet_gauge: {
      vi: '1) Chọn lá dưỡng fillet gauge đúng size thiết kế L. 2) Áp sát 2 cạnh: khe hở ở cạnh nào → cạnh đó hụt. 3) Đo z1, z2 từng đoạn 50mm dọc mối hàn; ghi đoạn hụt để tính % chiều dài. 4) Mặt lõm: dùng cam gauge đo throat a.',
      en: '1) Select gauge leaf = specified size L. 2) Seat against both legs: gap shows undersize. 3) Measure z1, z2 every 50mm; log undersized portions for % length. 4) Concave face: use cam gauge for throat a.'
    },
    reinforcement: {
      vi: '1) Bắc thước thẳng ngang qua mối hàn, tựa 2 mép tấm. 2) Đo khe hở lớn nhất giữa thước và đỉnh mối hàn bằng thước lá hoặc gauge cao độ → h. 3) Đo bề rộng b bằng thước cặp (mép-mép).',
      en: '1) Bridge straightedge across weld on both plate surfaces. 2) Measure max gap to weld crown with feeler/height gauge → h. 3) Measure width b toe-to-toe with caliper.'
    },
    porosity: {
      vi: '1) Soi tìm rỗ bằng đèn + kính lúp 5–10×. 2) Đo Ø từng rỗ bằng kính lúp chia vạch hoặc dưỡng so lỗ. 3) Chọn cửa sổ 25mm và 300mm XẤU NHẤT, cộng tổng Ø các rỗ ≥1mm rồi so giới hạn.',
      en: '1) Locate pores with lamp + 5–10× magnifier. 2) Measure each pore Ø with graticule magnifier. 3) Take WORST 25mm and 300mm windows, sum Ø of pores ≥1mm vs limits.'
    },
    crack: {
      vi: '1) VT 100% bề mặt + vùng ảnh hưởng nhiệt với đèn ≥350 lux, kính lúp tại điểm dừng/crater. 2) Mọi chỉ thị dạng đường → MT (thép từ tính) hoặc PT để xác nhận. 3) Có nứt = loại vô điều kiện, lập NCR.',
      en: '1) VT 100% of weld + HAZ at ≥350 lux, magnifier at stops/craters. 2) Any linear indication → confirm by MT or PT. 3) Any crack = reject, raise NCR.'
    },
    crater: {
      vi: '1) Kiểm tra mọi điểm kết thúc đường hàn. 2) Đặt gauge size lên crater: nếu hụt dưới size quy định → phải hàn điền đầy (trừ đầu mút hàn gián đoạn ngoài chiều dài hiệu dụng).',
      en: '1) Check every weld termination. 2) Gauge crater vs specified size: underfilled → fill (except intermittent weld ends outside effective length).'
    },
    overlap: { vi: '1) Soi nghiêng ánh sáng dọc chân mối hàn. 2) Dùng que dò/kính lúp xác định mép kim loại phủ lên tấm không ngấu. 3) Đo chiều cao h bằng gauge nếu cần so giới hạn mức D.', en: '1) Raking light along toes. 2) Probe/magnifier to find unfused overlapping metal. 3) Measure h if assessing level D limit.' },
    asym: { vi: '1) Đo cạnh z1 (tấm ngang) và z2 (tấm đứng) bằng fillet gauge tại cùng mặt cắt. 2) h = |z1 − z2|, so với giới hạn theo mức B/C/D (chỉ khi bản vẽ KHÔNG yêu cầu lệch chủ ý).', en: '1) Measure legs z1, z2 with fillet gauge at same section. 2) h = |z1 − z2| vs B/C/D limit (only where asymmetry not specified).' },
    concave: { vi: '1) Bắc thước thẳng ngang mối hàn. 2) Đo độ lõm sâu nhất dưới mặt tấm bằng thước lá → h. 3) So với giới hạn mức theo t.', en: '1) Straightedge across weld. 2) Feeler gauge max depth below plate surface → h. 3) Compare with level limit per t.' },
    penetration: { vi: '1) Tiếp cận mặt sau mối hàn (root). 2) Đo chiều cao lồi h bằng gauge cao độ, bề rộng chân ngấu b bằng thước cặp. 3) So giới hạn mức B/C/D.', en: '1) Access weld root side. 2) Height gauge for h, caliper for root bead width b. 3) Compare with B/C/D limits.' },
    throat: { vi: '1) Dùng cam gauge (con lăn) đo throat thực a_đo của mặt hàn lõm. 2) h = a_thiết kế − a_đo. 3) So giới hạn (mức B không cho phép hụt).', en: '1) Cam gauge actual throat of concave face. 2) h = design a − measured a. 3) Compare (level B: none allowed).' },
    fusion: { vi: '1) VT chỉ phát hiện thiếu ngấu LỘ BỀ MẶT: soi nghiêng ánh sáng dọc mép chảy. 2) Nghi ngờ bên trong → yêu cầu UT theo phạm vi EXC (tab NDT).', en: '1) VT detects only surface-breaking LOF: raking light along fusion lines. 2) Internal suspicion → UT per EXC extent (NDT tab).' },
    burn: { vi: '1) Soi mặt sau mối hàn một phía. 2) Mọi lỗ thủng xuyên = loại; sửa theo quy trình được duyệt rồi kiểm lại 100%.', en: '1) Inspect root side of single-sided welds. 2) Any through-hole = reject; repair per approved procedure, re-inspect 100%.' },
    stray: { vi: '1) Kiểm mặt tấm 2 bên đường hàn trong phạm vi thao tác. 2) Vết hồ quang lạc: mài nhẹ hết vùng cháy + MT/PT kiểm nứt + kiểm độ cứng nếu thép cường độ cao.', en: '1) Check parent metal both sides of weld. 2) Arc strikes: lightly grind + MT/PT for cracks + hardness check for HSS.' },
    spatter: { vi: '1) Cạo thử bằng sủi tay: hạt rơi = bám lỏng, hạt còn = bám chắc. 2) Trước sơn (P2/P3): mài sạch hạt bám chắc, kiểm lại bằng tay vuốt.', en: '1) Scrape test: loose vs adherent. 2) Before coating (P2/P3): grind off adherent spatter, verify by hand.' }
  };

  window.HAN_SK_MAP = {
    aws_crack: 'crack', iso_crack: 'crack',
    aws_fusion: 'fusion', iso_pen402: 'fusion',
    aws_crater: 'crater',
    aws_undersize: 'fillet_gauge',
    aws_undercut_static: 'undercut', aws_undercut_cyclic: 'undercut', iso_undercut: 'undercut', jass_undercut: 'undercut',
    aws_porosity_static: 'porosity', aws_porosity_cyclic: 'porosity', iso_pore: 'porosity',
    aws_profile: 'reinforcement', iso_excess_butt: 'reinforcement', iso_convex_fillet: 'reinforcement',
    iso_excess_pen: 'penetration',
    iso_overlap: 'overlap',
    iso_sagging: 'concave',
    iso_burnthrough: 'burn',
    iso_throat_under: 'throat',
    iso_asym: 'asym',
    iso_stray: 'stray',
    iso_spatter: 'spatter'
  };
})();
