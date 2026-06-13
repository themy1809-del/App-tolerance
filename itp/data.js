/* ============================================================================
   IG_DATA — THƯ VIỆN CÁCH ĐỌC ITP (Inspection & Test Plan)
   Dạy cách XEM / ĐỌC một ITP cho đúng + ITP dựa trên code nào.
   (Khác với ITP_DATA trong itp-data.js — đó là các ITP mẫu nhúng trong từng module.)

   Điều khoản code đã XÁC MINH nguyên văn từ PDF gốc trong thư mục dự án:
     • AISC 360-16 Chapter N (file Session 2) — N5.1/N5.2, Observe(O)/Perform(P), Bảng N5.4 & N5.6
     • EN 1090-2:2018 (file gốc)            — §4.1.2 EXC1-4, Clause 12, 12.4/12.5, Annex B
     • AWS D1.1:2020 (file Visual Inspection)— CLAUSE 8 INSPECTION, Table 8.1
   ============================================================================ */
window.IG_DATA = {

  /* --- ITP là gì --- */
  intro: {
    what: 'ITP (Inspection & Test Plan — Kế hoạch Kiểm tra & Thử nghiệm) là BẢNG liệt kê theo trình tự mọi điểm kiểm tra/thử nghiệm của một công việc: kiểm cái gì, theo căn cứ nào, tiêu chí đạt là bao nhiêu, ai làm, ai chứng kiến, hồ sơ ra là gì.',
    why: 'ITP là "hợp đồng kiểm tra" giữa nhà sản xuất và khách/TVGS: chốt TRƯỚC khi sản xuất để không tranh cãi lúc nghiệm thu. Nó hiện thực hóa yêu cầu của ISO 9001:2015 §8.5.1 (kiểm soát sản xuất) và §8.6 (chỉ thông qua sản phẩm khi đã hoàn tất các bước kiểm đã hoạch định).',
    when: 'Lập & duyệt ITP TRƯỚC khi bắt đầu sản xuất. Mỗi dự án một ITP riêng (theo spec + EXC + code khách yêu cầu). Khách/TVGS phải ký duyệt; khách có quyền nâng cấp điểm chứng kiến (W → H).'
  },

  /* --- Giải phẫu các cột của 1 ITP: đọc cột nào để biết gì --- */
  COLUMNS: [
    { no: '1', name: 'No. / Item', vi: 'Số thứ tự công đoạn', read: 'Đọc theo TRÌNH TỰ trên xuống = đúng dòng chảy sản xuất. Không nhảy cóc.', ex: '01, 02, 03…' },
    { no: '2', name: 'Activity / Operation', vi: 'Công đoạn / hoạt động kiểm', read: 'Tên việc cần kiểm. ĐỪNG chỉ đọc cột này rồi đi kiểm — phải đọc tiếp cột Tiêu chí + Căn cứ.', ex: 'Kiểm vật tư đầu vào · Fit-up · VT mối hàn · Nghiệm thu kích thước' },
    { no: '3', name: 'Reference / Procedure', vi: 'CĂN CỨ — làm theo gì', read: '★ Đọc để biết LÀM THEO TÀI LIỆU NÀO: code (số điều khoản), spec dự án, bản vẽ, WPS, quy trình. Phải có SỐ điều khoản, không ghi chung chung "theo tiêu chuẩn".', ex: 'AWS D1.1:2020 Cl.8 · EN 1090-2 §12.4 · WPS-012 · Dwg A-101' },
    { no: '4', name: 'Acceptance Criteria', vi: 'TIÊU CHÍ CHẤP NHẬN — đạt là bao nhiêu', read: '★★ Cột QUAN TRỌNG NHẤT: ngưỡng Đạt/Không đạt bằng SỐ + điều khoản. Đọc cột này TRƯỚC khi cầm dụng cụ đo.', ex: 'ISO 5817 mức B · Table 8.1 · sai lệch ±3mm (EN 1090-2 Annex B)' },
    { no: '5', name: 'Inspection / Test Method', vi: 'Phương pháp kiểm / thử', read: 'Kiểm bằng cách nào: ngoại quan VT, đo thước/total station, UT/MT/PT/RT, thử lực…', ex: 'VT · UT · MT · đo total station · momen xoắn' },
    { no: '6', name: 'Extent / Frequency', vi: 'Phạm vi / tần suất', read: 'Kiểm BAO NHIÊU: 100% hay lấy mẫu? Phải khớp EXC/spec — KHÔNG tự ý giảm. NDT theo EXC = EN 1090-2 Bảng 23–24.', ex: '100% · 10% · 1 mẫu/lô · theo EXC' },
    { no: '7', name: 'Records / Format', vi: 'Hồ sơ đầu ra + biểu mẫu', read: 'Bằng chứng phải lưu + đúng MẪU nào. Không có hồ sơ = coi như chưa kiểm.', ex: 'VT report · Dimensional report · Weld map · MTC' },
    { no: '8', name: 'Responsibility', vi: 'Ai THỰC HIỆN', read: 'Bên chịu trách nhiệm làm: tổ sản xuất tự kiểm, QC nhà máy, NDT Level 2…', ex: 'Tổ SX · QC · NDT L2 · Kho' },
    { no: '9', name: 'Intervention Points (H/W/R/S) theo BÊN', read: '★ Cột "luật chơi": mỗi bên (QC nhà máy · Khách · TVGS/TPI · Tư vấn thiết kế) có ký hiệu can thiệp riêng ở mỗi dòng. Xem tab "Điểm H·W·R·S".', vi: 'Điểm dừng/chứng kiến/kiểm hồ sơ/giám sát', ex: 'QC: H · Khách: W · TPI: R' },
    { no: '10', name: 'Remarks', vi: 'Ghi chú', read: 'Điều kiện riêng: thời gian báo trước witness, hold-time NDT, mẫu báo cáo đặc biệt…', ex: 'Báo witness trước 48h · UT sau 48h (thép tôi)' }
  ],

  /* --- Điểm can thiệp: định nghĩa + đọc đúng + hệ quả nếu đọc sai --- */
  POINTS: [
    { k: 'H', name: 'HOLD POINT — Điểm DỪNG', color: '#aa4322', bg: '#fbeae2',
      def: 'Công việc PHẢI DỪNG tại đây; KHÔNG được làm bước tiếp theo cho đến khi bên có thẩm quyền kiểm tra và KÝ THẢ (release).',
      right: 'Thấy H là dừng, mời kiểm, có chữ ký thả mới làm tiếp. Đây là điểm BẮT BUỘC, không waive.',
      wrong: 'Vượt Hold vì gấp tiến độ → vi phạm nặng, thường phải tháo/đục làm lại + mở NCR. Khách có thể từ chối toàn lô.',
      base: 'Cơ sở: ISO 9001:2015 §8.6 — "việc thông qua/chuyển tiếp KHÔNG được tiến hành cho đến khi hoàn tất thoả đáng các sắp xếp đã hoạch định, trừ khi được cấp thẩm quyền phê duyệt".' },
    { k: 'W', name: 'WITNESS POINT — Điểm CHỨNG KIẾN', color: '#8a5a00', bg: '#fdf3e2',
      def: 'Bên liên quan được MỜI đến chứng kiến. Phải gửi thông báo trước đúng hạn hợp đồng (thường 24–48h).',
      right: 'Gửi thông báo đúng hạn + lưu bằng chứng đã mời (email/đơn). Nếu bên được mời KHÔNG đến đúng hẹn → được phép tiếp tục (waive) và ghi nhận.',
      wrong: 'Không gửi thông báo mà tự làm → dù khách vắng vẫn bị bắt lỗi "tự ý nghiệm thu". Ngược lại, nhầm W thành H thì chặn tiến độ oan.',
      base: 'Khác Hold ở chỗ: KHÔNG chặn tiến độ nếu đã báo đúng hạn mà bên mời không tới. Khách có quyền NÂNG W → H theo spec.' },
    { k: 'R', name: 'REVIEW — Kiểm HỒ SƠ', color: '#0c447c', bg: '#e6f0fb',
      def: 'Kiểm tra / phê duyệt tài liệu, hồ sơ, chứng chỉ — không nhất thiết tại hiện trường.',
      right: 'Duyệt MTC/CoC, WPS/PQR, chứng chỉ thợ, tem hiệu chuẩn, dossier cuối… đúng & còn hiệu lực.',
      wrong: 'Bỏ qua review hồ sơ vật liệu → lắp nhầm mác thép/heat number không truy xuất được.',
      base: 'AISC 360-16 N3.2 / N5.2: QAI duyệt MTC & chứng chỉ. EN 10204: chứng từ 3.1 / 3.2.' },
    { k: 'S', name: 'SURVEILLANCE / MONITOR — GIÁM SÁT', color: '#0f6e56', bg: '#e3f6ee',
      def: 'Giám sát ngẫu nhiên, xác suất trong quá trình; KHÔNG chặn tiến độ.',
      right: 'Tuần tra kiểm thông số trong khi sản xuất (preheat, thông số hàn, môi trường sơn…).',
      wrong: 'Hiểu nhầm "giám sát" = không cần làm gì → bỏ lọt sai số tích luỹ trong quá trình.',
      base: 'Tương đương AISC 360-16 N5.4: Observe (O) — "kiểm ngẫu nhiên; không cần dừng chờ". (Spec Mỹ dùng O/P; spec quốc tế dùng H/W/R/S/M.)' }
  ],

  /* Đối chiếu hệ ký hiệu Mỹ (AISC O/P) với hệ H/W/R/S — đã xác minh */
  OP_MAP: {
    note: 'AISC 360-16 Chương N dùng 2 ký hiệu (xác minh nguyên văn Bảng N5.4-1…N5.6-3):',
    rows: [
      { c: 'O', n: 'Observe', d: '"The inspector shall observe these items on a random basis. Operations need not be delayed pending these inspections." → kiểm ngẫu nhiên, không chặn ≈ S/Surveillance.' },
      { c: 'P', n: 'Perform', d: '"These tasks shall be performed for each welded joint or member." → kiểm TỪNG mối/cấu kiện ≈ điểm 100%/Hold.' }
    ]
  },

  /* --- Cách đọc ĐÚNG: 8 nguyên tắc --- */
  READ_RIGHT: [
    { t: 'Đọc NGƯỢC: Tiêu chí + Căn cứ TRƯỚC', d: 'Trước khi kiểm, đọc cột "Acceptance criteria" và "Reference" để biết đạt/không đạt là bao nhiêu và theo điều khoản nào — đừng chỉ đọc tên công đoạn rồi nghiệm thu cảm tính.' },
    { t: 'Kiểm REVISION của ITP và của code', d: 'ITP rev cũ hoặc trích code đời cũ = nghiệm thu sai chuẩn. Đối chiếu rev ITP với rev bản vẽ/spec và phiên bản code (vd AWS D1.1:2020 vs 2015).' },
    { t: 'KHÔNG vượt Hold point', d: 'Gặp H là dừng, có chữ ký thả mới làm tiếp. Vượt H dù gấp tiến độ phải mở NCR và có thể bị từ chối lô.' },
    { t: 'Witness: báo trước đúng hạn + lưu bằng chứng', d: 'Gửi thông báo theo số giờ hợp đồng quy định và lưu email/đơn mời. Có bằng chứng đã mời mới được waive hợp lệ khi khách vắng.' },
    { t: 'Phân biệt rõ BÊN thực hiện vs BÊN chứng kiến', d: 'QC nhà máy (Contractor/Fabricator — AISC: QCI) ≠ QA/TPI/khách (AISC: QAI). Mỗi điểm H/W ghi rõ "của bên nào", đừng gộp.' },
    { t: 'Mỗi dòng phải TRUY XUẤT được trọn chuỗi', d: 'Công đoạn → phương pháp → tiêu chí số + điều khoản → biểu mẫu hồ sơ → người ký. Thiếu một ô là dòng ITP đó chưa dùng được.' },
    { t: 'Tần suất / phạm vi phải khớp EXC/spec', d: 'Vd: phạm vi NDT theo cấp thực hiện EN 1090-2 Bảng 23–24 (EXC1→EXC4 tăng dần). Không tự ý giảm % kiểm.' },
    { t: 'ITP phải được KHÁCH/TVGS duyệt trước sản xuất', d: 'ITP chưa ký duyệt mà đã sản xuất là rủi ro lớn. Khách có quyền nâng W → H và thêm điểm kiểm.' }
  ],

  /* --- Lỗi thường gặp khi đọc/lập ITP --- */
  MISTAKES: [
    { e: 'Chỉ đọc tên công đoạn, bỏ cột tiêu chí', f: 'Luôn đọc kèm Acceptance criteria + Reference; nghiệm thu bằng SỐ, không cảm tính.' },
    { e: 'Nhầm Witness ↔ Hold', f: 'H = bắt buộc dừng chờ thả; W = mời, vắng-đúng-hạn thì waive. Đọc kỹ ký hiệu từng BÊN.' },
    { e: 'Dùng ITP rev cũ / code đời cũ', f: 'Kiểm rev ITP và phiên bản code mỗi lần dùng; thu hồi bản cũ.' },
    { e: 'Không gửi thông báo witness', f: 'Báo trước đúng hạn + lưu bằng chứng mời để được waive hợp lệ.' },
    { e: 'Ô Reference ghi chung chung "theo tiêu chuẩn"', f: 'Ghi SỐ điều khoản cụ thể (vd Table 8.1, §12.4.2) để có căn cứ khi tranh chấp.' },
    { e: 'Vượt Hold point vì gấp tiến độ', f: 'Tuyệt đối không; nếu lỡ vượt phải mở NCR và xin disposition của khách.' },
    { e: 'Tự ý giảm tần suất NDT dưới mức EXC', f: 'Bám EN 1090-2 Bảng 23–24 theo EXC / spec; thay đổi phải được khách duyệt.' },
    { e: 'Sản xuất khi ITP chưa được khách duyệt', f: 'Chốt & ký ITP trước; ghi rõ bên chứng kiến từng điểm.' }
  ],

  /* --- ITP DỰA THEO CODE NÀO (phần "dẫn chứng") — clause đã xác minh --- */
  CODES: [
    { code: 'ISO 9001:2015', area: 'Hệ thống QLCL (nền tảng)', verified: true,
      clause: '§8.5.1 Kiểm soát sản xuất & cung cấp dịch vụ · §8.6 Thông qua sản phẩm/dịch vụ',
      role: 'Gốc rễ của ITP và của Hold point: §8.6 quy định KHÔNG được chuyển tiếp/giao sản phẩm cho đến khi hoàn tất các sắp xếp kiểm đã hoạch định (trừ khi cấp thẩm quyền duyệt). ITP chính là "các sắp xếp đã hoạch định" đó.' },
    { code: 'EN 1090-2:2018', area: 'Thi công kết cấu thép (CE)', verified: true,
      clause: '§4.1.2 Execution class EXC1–EXC4 · Clause 12 "Inspection, testing and correction" · 12.4 Hàn (12.4.2 kiểm sau hàn) · 12.5 Bu lông (12.5.2 dự ứng lực) · Annex B (dung sai hình học)',
      role: 'Cấp KHUNG xác định mỗi dòng ITP cần kiểm gì và TẦN SUẤT bao nhiêu theo cấp thực hiện EXC (độ nghiêm tăng EXC1→EXC4). Annex B cho tiêu chí cột "Acceptance" khâu kích thước. (Xác minh: "Four execution classes 1 to 4, denoted EXC1 to EXC4… strictness increases".)' },
    { code: 'AISC 360-16 — Chapter N', area: 'QC & QA kết cấu thép (Mỹ)', verified: true,
      clause: 'N5.1 Quality Control (QCI) · N5.2 Quality Assurance (QAI) · N5.4 + Bảng N5.4-1…3 (hàn) · N5.6 + Bảng N5.6-1…3 (bu lông) · N3.2 (duyệt MTC) · ký hiệu O (Observe) / P (Perform)',
      role: '"ITP luật hoá" kiểu Mỹ: liệt kê sẵn từng hạng mục kiểm trước/trong/sau cho hàn & bu lông, phân vai QC (nhà máy) vs QA (bên thứ ba/chủ đầu tư). O = kiểm ngẫu nhiên (không dừng); P = kiểm từng mối/cấu kiện. Đối chiếu trực tiếp khi lập cột điểm can thiệp.' },
    { code: 'AISC 303-16', area: 'Code of Standard Practice', verified: true,
      clause: '§4.2.1 chuyển thông tin hợp đồng → bản vẽ shop/erection',
      role: 'Phân định trách nhiệm các bên và cơ sở để QC nhà máy nghiệm thu dựa trên bản vẽ shop/erection (theo User Note của AISC 360 N5.1).' },
    { code: 'AWS D1.1:2020 — Clause 8', area: 'Kiểm tra hàn kết cấu thép', verified: true,
      clause: 'Clause 8 "Inspection" · 8.1 phân vai Contractor’s Inspector (QC) vs Verification Inspector (QA) · Table 8.1 "Visual Inspection Acceptance Criteria"',
      role: 'Căn cứ các dòng ITP khâu hàn theo hệ Mỹ: kiểm trước/trong/sau hàn; Table 8.1 cho tiêu chí cột "Acceptance" của VT mối hàn. (Xác minh: "CLAUSE 8. INSPECTION" + "Visual Inspection Acceptance Criteria".)' },
    { code: 'EN ISO 3834 (-2/-3/-4)', area: 'Yêu cầu chất lượng hàn nóng chảy', verified: false,
      clause: 'Yêu cầu kiểm tra & thử nghiệm trước/trong/sau hàn; kiểm soát WPS/WPQR/thợ hàn',
      role: 'Buộc nhà sản xuất có hệ kiểm tra hàn — căn cứ các dòng ITP khâu hàn theo hệ châu Âu (đi kèm EN 1090-2).' },
    { code: 'EN 10204', area: 'Chứng từ kiểm tra vật liệu', verified: false,
      clause: 'Loại 2.1 / 2.2 / 3.1 / 3.2',
      role: 'Căn cứ cột "Reference/Record" cho khâu vật tư đầu vào: ITP yêu cầu MTC 3.1 (hoặc 3.2) cho thép chịu lực.' },
    { code: 'Spec dự án / Hợp đồng', area: 'Luôn ĐÈ LÊN code', verified: false,
      clause: 'Yêu cầu kỹ thuật riêng của khách + bảng phân bổ điểm chứng kiến',
      role: 'Quyết định bên chứng kiến từng điểm, nâng cấp W→H, biểu mẫu & tần suất riêng. ITP cuối phải được khách/TVGS ký duyệt — spec thắng code khi mạnh hơn.' }
  ],

  /* --- Ví dụ đọc 1 dòng ITP (annotated) --- */
  EXAMPLE: {
    row: {
      no: '07', act: 'Hàn ngấu hoàn toàn (CJP) liên kết bụng–cánh dầm chính',
      ref: 'WPS-012 · AWS D1.1:2020 Cl.8 (hệ Mỹ) hoặc EN 1090-2 §12.4 + ISO 5817 (hệ EN)',
      crit: 'VT: AWS Table 8.1 / ISO 5817 mức B · UT: AWS Cl.8 Part F / ISO 5817 mức B',
      method: 'VT + UT', extent: 'VT 100% · UT theo EXC (EN 1090-2 Bảng 24)',
      record: 'VT report + Weld map + UT report', resp: 'QC (VT) · NDT L2 (UT)',
      points: 'QC nhà máy: P/H (kiểm 100%) · Khách/TPI: W (UT) · Tư vấn: R (hồ sơ)'
    },
    howto: [
      'B1 — Đọc cột Căn cứ: hàn theo WPS-012; nghiệm thu theo AWS D1.1:2020 Cl.8 (hoặc ISO 5817 nếu hệ EN). Kiểm WPS còn hiệu lực + đúng rev.',
      'B2 — Đọc cột Tiêu chí: VT đạt theo Table 8.1, UT đạt mức B. Ghi nhớ NGƯỠNG SỐ trước khi đo.',
      'B3 — Đọc Phương pháp + Tần suất: VT 100% mọi mối; UT theo % của EXC (đừng tự giảm).',
      'B4 — Đọc cột Điểm can thiệp: với QC là P (kiểm từng mối) ~ Hold nội bộ; UT là Witness của khách → phải BÁO TRƯỚC đúng hạn rồi mới làm.',
      'B5 — Đọc Hồ sơ: xuất VT report + weld map + UT report đúng mẫu; chưa có hồ sơ coi như chưa nghiệm thu. Ký xong mới chuyển công đoạn sau (sơn).'
    ]
  },

  /* --- Liên kết các ITP mẫu đã có trong app (itp-data.js nhúng trong module) --- */
  SAMPLES: [
    { t: 'ITP Vật tư đầu vào', url: '../vattu/' },
    { t: 'ITP Công tác hàn', url: '../han/' },
    { t: 'ITP Liên kết bu lông', url: '../bulong/' },
    { t: 'ITP Sơn phủ chống ăn mòn', url: '../son/' },
    { t: 'ITP Kiểm soát kích thước', url: '../dungsai/' },
    { t: 'ITP Nắn chỉnh hỏa công', url: '../hoacong/' },
    { t: 'ITP Đóng gói & xuất hàng', url: '../packing/' },
    { t: 'ITP Xử lý NCR', url: '../luongdu/' }
  ]
};
