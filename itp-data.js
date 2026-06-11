/* ============================================================================
   ITP DATA — quy trình kiểm soát chất lượng từng mảng (mẫu nội bộ)
   point: H=Hold · W=Witness · R=Review · S=Surveillance
   Phân loại H/W chốt theo hợp đồng từng dự án (khách có quyền nâng W→H).
   ============================================================================ */
(function () {
  window.ITP_DATA = {

    han: {
      module: 'QC Hàn', title: 'ITP — Công tác hàn',
      scope: 'Áp dụng cho hàn kết cấu thép theo EN 1090-2 / AWS D1.1. EXC3-4: các điểm W in đậm thường nâng thành H.',
      stages: [
        { act: 'Duyệt WPS/WPQR + chứng chỉ thợ hàn trước sản xuất', doc: 'EN ISO 15614-1 / AWS D1.1 Cl.6', resp: 'Kỹ sư hàn', check: 'QC trưởng (+ khách duyệt nếu hợp đồng yêu cầu)', point: 'R', record: 'WPS, PQR/WPQR, WQT', tool: { url: '../wps/', label: 'Thư viện WPS' } },
        { act: 'Kiểm vật liệu nền + vật liệu hàn (MTC, CoC, điều kiện sấy que)', doc: 'EN 10204 3.1 / AWS A5.x', resp: 'Kho + QC', check: 'QC', point: 'R', record: 'MTC, CoC, nhật ký sấy que' },
        { act: 'Kiểm gá lắp (fit-up): khe hở chân, góc vát, lệch mép, tack', doc: 'WPS / ISO 9692 / ISO 5817 (5071)', resp: 'Tổ sản xuất', check: 'QC', point: 'W', record: 'Biên bản fit-up (mối quan trọng)', tool: { url: '../han/', label: 'QC Hàn — checklist trước hàn' } },
        { act: 'Gia nhiệt sơ bộ (nếu yêu cầu) + kiểm soát thông số hàn trong quá trình', doc: 'WPS / AWS Table 5.8 / EN 1011-2', resp: 'Thợ hàn + foreman', check: 'QC tuần tra', point: 'S', record: 'Nhật ký hàn (thông số, thợ, mối)' },
        { act: 'VT 100% mối hàn sau khi nguội (A514/HPS 690W: sau ≥48h)', doc: 'AWS Table 8.1 / ISO 5817 theo EXC', resp: 'QC (VT)', check: 'QC trưởng', point: 'H', record: 'Báo cáo VT + weld map', tool: { url: '../han/', label: 'QC Hàn — calculator Đạt/Không đạt' } },
        { act: 'NDT bổ sung (UT/MT/PT) theo phạm vi EXC, sau hold time', doc: 'EN 1090-2 Tables 23–24 / ISO 17640', resp: 'NDT Level 2', check: 'QC trưởng + khách (W theo hợp đồng)', point: 'H', record: 'Báo cáo NDT' },
        { act: 'Xử lý mối không đạt: sửa theo quy trình duyệt + kiểm lại 100%', doc: 'EN 1090-2 7.6.5 / AWS 7.25', resp: 'Sản xuất + QC', check: 'QC trưởng', point: 'H', record: 'NCR + báo cáo kiểm lại', tool: { url: '../luongdu/', label: 'Tạo NCR một chạm' } },
        { act: 'Tổng hợp hồ sơ hàn cuối (dossier)', doc: 'EN 1090-2 Cl.12', resp: 'QC', check: 'QC trưởng + khách/TVGS', point: 'R', record: 'Weld map, VT/NDT, WPS/WQT, MTC, NCR' }
      ]
    },

    son: {
      module: 'QC Sơn', title: 'ITP — Sơn phủ chống ăn mòn',
      scope: 'Áp dụng cho hệ sơn bảo vệ theo ISO 12944 / EN 1090-2 Cl.10. Điểm sau phun hạt là H vì lớp lót sẽ che vĩnh viễn.',
      stages: [
        { act: 'Duyệt hệ sơn + PDS + quy trình sơn; nghiệm thu P-grade mối hàn/cạnh', doc: 'ISO 12944-5 / EN 1090-2 Table 22 / ISO 8501-3', resp: 'QC sơn', check: 'QC trưởng (+ hãng sơn nếu bảo hành liên đới)', point: 'R', record: 'Spec hệ sơn, PDS, biên bản P-grade', tool: { url: '../son/', label: 'QC Sơn — bảng P1–P3' } },
        { act: 'Nghiệm thu bề mặt SAU PHUN HẠT: cấp sạch Sa, độ nhám, bụi, muối', doc: 'ISO 8501-1 / 8503 / 8502', resp: 'Tổ phun + QC', check: 'QC (+ khách W)', point: 'H', record: 'Biên bản bề mặt (4 phép)', tool: { url: '../son/', label: 'hình cách đo 4 phép' } },
        { act: 'Kiểm điều kiện môi trường trước + trong khi sơn (mỗi 2–4h)', doc: 'ISO 8502-4 (Ts ≥ Td+3°C, RH ≤ 85%)', resp: 'QC sơn', check: 'QC', point: 'S', record: 'Nhật ký môi trường', tool: { url: '../son/', label: 'calculator điểm sương' } },
        { act: 'Kiểm từng lớp sơn: trộn/pot life, stripe coat, WFT, thời gian phủ lại', doc: 'PDS từng sản phẩm', resp: 'Thợ sơn + QC', check: 'QC', point: 'W', record: 'Nhật ký sơn theo lớp (batch, WFT)' },
        { act: 'Nghiệm thu DFT tổng + ngoại quan hoàn thiện', doc: 'ISO 19840 Cl.9 (4 điều kiện a–d)', resp: 'QC sơn', check: 'QC trưởng + khách', point: 'H', record: 'Báo cáo DFT + ngoại quan', tool: { url: '../son/', label: 'ô tính DFT tự đánh giá' } },
        { act: 'Bám dính / holiday test (nếu spec yêu cầu)', doc: 'ISO 4624 / ISO 2409 / ISO 29601', resp: 'QC sơn', check: 'QC trưởng (+ khách W)', point: 'W', record: 'Báo cáo bám dính/holiday' },
        { act: 'Sửa lỗi sơn + dặm vá, kiểm lại khu vực sửa', doc: 'Quy trình sửa được duyệt', resp: 'Thợ sơn + QC', check: 'QC', point: 'S', record: 'NCR (nếu có) + biên bản sửa' },
        { act: 'Tổng hợp hồ sơ sơn', doc: 'ISO 12944-8', resp: 'QC', check: 'QC trưởng + khách', point: 'R', record: 'Toàn bộ nhật ký + báo cáo + ảnh' }
      ]
    },

    bulong: {
      module: 'Cách kiểm tra siết bu lông', title: 'ITP — Liên kết bu lông dự ứng lực',
      scope: 'Áp dụng cho liên kết bu lông cường độ cao theo EN 1090-2 Cl.8 / AISC-RCSC (chọn hệ theo hợp đồng).',
      stages: [
        { act: 'Kiểm bộ bu lông nhập: CoC, k-class (EN) / lot test (RCSC), bảo quản', doc: 'EN 14399 / ASTM F3125', resp: 'Kho + QC', check: 'QC', point: 'R', record: 'CoC + biên bản nhập', tool: { url: '../bulong/', label: 'tab Vật tư' } },
        { act: 'Nghiệm thu bề mặt ma sát (liên kết chống trượt) TRƯỚC khi ghép', doc: 'EN 1090-2 8.4 / spec', resp: 'Sản xuất', check: 'QC', point: 'H', record: 'Biên bản bề mặt ma sát' },
        { act: 'Pre-installation verification (hệ RCSC): 3 bộ/lô trong tension calibrator', doc: 'RCSC Section 7', resp: 'QC + tổ lắp', check: 'QC trưởng', point: 'W', record: 'Biên bản kiểm lô' },
        { act: 'Lắp + snug-tight toàn liên kết, khe hở dư ≤ 2mm', doc: 'EN 1090-2 8.3/8.5.1', resp: 'Tổ lắp', check: 'QC', point: 'W', record: 'Checklist lắp' },
        { act: 'Xiết bước 1 + bước 2 đúng phương pháp (momen/góc xoay/HRC/DTI)', doc: 'EN 1090-2 8.5.3–8.5.6 / RCSC 8', resp: 'Tổ lắp', check: 'QC giám sát', point: 'S', record: 'Nhật ký xiết theo liên kết', tool: { url: '../bulong/', label: 'calculator momen + góc xoay' } },
        { act: 'Nghiệm thu sau xiết: ngoại quan 100% + kiểm lực lấy mẫu', doc: 'EN 1090-2 12.5.2 / Annex M', resp: 'QC', check: 'QC trưởng + khách', point: 'H', record: 'Báo cáo nghiệm thu bu lông' },
        { act: 'Hồ sơ bu lông', doc: 'EN 1090-2 Cl.12', resp: 'QC', check: 'QC trưởng', point: 'R', record: 'CoC, chứng chỉ cờ lê, nhật ký, báo cáo' }
      ]
    },

    packing: {
      module: 'Kiểm tra Packing', title: 'ITP — Đóng gói & xuất hàng',
      scope: 'Áp dụng cho đóng kiện, lên container/xe và xuất xưởng. Điểm trước đóng cửa container là H — sau đó không kiểm được nữa.',
      stages: [
        { act: 'Xác nhận toàn bộ cấu kiện đã nghiệm thu + NCR đóng + sơn đủ ngày', doc: 'Hồ sơ QC các khâu', resp: 'QC', check: 'QC trưởng', point: 'H', record: 'Phiếu xác nhận trước đóng', tool: { url: '../packing/', label: 'Quy trình 9 bước' } },
        { act: 'Đối chiếu packing list + phụ kiện rời đóng thùng có danh mục', doc: 'Packing list bản cuối', resp: 'Kho + QC', check: 'QC', point: 'W', record: 'Packing list ký xác nhận' },
        { act: 'Bảo vệ chi tiết (ren/bích/VCI) + gỗ ISPM 15 cho hàng xuất', doc: 'Spec bảo quản / ISPM 15', resp: 'Tổ đóng gói', check: 'QC', point: 'S', record: 'Ảnh + checklist bảo vệ' },
        { act: 'Tem nhãn + shipping mark + ký hiệu ISO 780 (CoG, móc cẩu)', doc: 'ISO 780 / spec hợp đồng', resp: 'Tổ đóng gói', check: 'QC', point: 'W', record: 'Ảnh tem từng kiện', tool: { url: '../packing/', label: 'tab Tem nhãn' } },
        { act: 'Nghiệm thu sắp xếp + lashing TRƯỚC khi đóng cửa container', doc: 'CTU Code / EN 12195-1', resp: 'Tổ xếp hàng', check: 'QC (+ khách/giám định W theo hợp đồng)', point: 'H', record: 'Biên bản lashing + ảnh từng lớp', tool: { url: '../packing/', label: 'tab Lashing — 4 kiểu có hình' } },
        { act: 'Đóng cửa + bấm seal + chụp ảnh seal', doc: 'Quy trình xuất hàng', resp: 'Kho + tài xế', check: 'QC chứng kiến', point: 'W', record: 'Số seal + ảnh' },
        { act: 'Hồ sơ xuất hàng', doc: 'Hợp đồng', resp: 'QC + chứng từ', check: 'QC trưởng', point: 'R', record: 'Biên bản packing + ảnh + packing list + seal' }
      ]
    },

    dungsai: {
      module: 'Dung sai kích thước', title: 'ITP — Kiểm soát kích thước & hình học',
      scope: 'Áp dụng cho đo kiểm kích thước trong chế tạo và nghiệm thu cuối theo EN 1090-2 Annex B / ISO 13920 / AISC / JASS 6.',
      stages: [
        { act: 'Duyệt class dung sai theo hợp đồng (EXC / ISO 13920 A–D / Essential–Functional) + kế hoạch đo', doc: 'Spec hợp đồng / bản vẽ', resp: 'Kỹ sư QC', check: 'QC trưởng', point: 'R', record: 'Bảng class áp dụng + kế hoạch đo', tool: { url: '../dungsai/', label: 'Dung sai — tab Tiêu chuẩn (gợi ý theo dự án)' } },
        { act: 'Kiểm dụng cụ đo: tem hiệu chuẩn còn hạn (thước cuộn, caliper, máy thủy bình/total station)', doc: 'ISO 17123 / quy trình hiệu chuẩn', resp: 'QC', check: 'QC trưởng', point: 'R', record: 'Sổ theo dõi hiệu chuẩn' },
        { act: 'Đo kiểm trong chế tạo: sau cắt, sau gá, sau hàn (kiểm soát co rút/biến dạng)', doc: 'Bản vẽ + lượng dư đã duyệt', resp: 'Sản xuất tự kiểm', check: 'QC tuần tra', point: 'S', record: 'Phiếu tự kiểm theo công đoạn', tool: { url: '../luongdu/', label: 'calculator lượng dư co rút' } },
        { act: 'Nghiệm thu kích thước CUỐI từng cấu kiện: dài/cao, độ thẳng, camber, vuông góc, vị trí lỗ (bù nhiệt độ khi đo)', doc: 'EN 1090-2 Annex B / ISO 13920', resp: 'QC', check: 'QC trưởng (+ khách W theo hợp đồng)', point: 'H', record: 'Dimensional report + trích dẫn điều khoản', tool: { url: '../dungsai/', label: 'calculator Đạt/Không đạt + copy trích dẫn' } },
        { act: 'Lắp thử (trial assembly / pre-fit) nếu hợp đồng yêu cầu', doc: 'Spec hợp đồng', resp: 'Sản xuất + QC', check: 'QC trưởng + khách', point: 'W', record: 'Biên bản lắp thử + ảnh' },
        { act: 'Xử lý không đạt: nắn sửa theo quy trình duyệt + đo lại 100% hạng mục hỏng', doc: 'EN 1090-2 12.3', resp: 'Sản xuất + QC', check: 'QC trưởng', point: 'H', record: 'NCR + báo cáo đo lại' },
        { act: 'Tổng hợp hồ sơ kích thước', doc: 'EN 1090-2 Cl.12', resp: 'QC', check: 'QC trưởng + khách', point: 'R', record: 'Bộ dimensional report theo cấu kiện' }
      ]
    },

    luongdu: {
      module: 'Lượng dư & Sai hỏng', title: 'ITP — Quy trình xử lý sự không phù hợp (NCR)',
      scope: 'Quy trình kiểm soát khi phát hiện sai hỏng ở bất kỳ công đoạn nào — từ phát hiện đến đóng NCR và phân tích nguyên nhân gốc.',
      stages: [
        { act: 'Phát hiện & nhận diện lỗi: so triệu chứng + ảnh thật, đo mức độ', doc: 'Thư viện 45 lỗi + tiêu chí B/C/D', resp: 'Người phát hiện + QC', check: 'QC', point: 'S', record: 'Ảnh + số đo ban đầu', tool: { url: '../luongdu/', label: 'tab Sai hỏng — 45 lỗi' } },
        { act: 'Cách ly & đánh dấu cấu kiện không phù hợp (tag NCR, khu vực riêng)', doc: 'Quy trình NCR nội bộ', resp: 'QC', check: 'QC trưởng', point: 'H', record: 'Tag + sổ cách ly' },
        { act: 'Lập NCR: mô tả, tiêu chuẩn tham chiếu, mức vượt', doc: 'Biểu mẫu NCR', resp: 'QC', check: 'QC trưởng', point: 'R', record: 'NCR đã đánh số', tool: { url: '../luongdu/', label: 'nút Tạo NCR nháp một chạm' } },
        { act: 'Quyết định xử lý: sửa (rework/repair) / chấp nhận nguyên trạng (concession — phải có khách duyệt) / loại bỏ', doc: 'Spec hợp đồng', resp: 'QC trưởng + kỹ thuật', check: 'Khách hàng (với concession)', point: 'H', record: 'NCR phần disposition có chữ ký' },
        { act: 'Thực hiện sửa theo quy trình được duyệt (WPS sửa nếu liên quan hàn)', doc: 'Quy trình sửa + WPS', resp: 'Sản xuất', check: 'QC giám sát', point: 'S', record: 'Nhật ký sửa' },
        { act: 'Kiểm tra lại 100% bằng phương pháp ban đầu (+NDT nếu là mối hàn)', doc: 'Tiêu chuẩn gốc của hạng mục', resp: 'QC', check: 'QC trưởng (+ khách W)', point: 'H', record: 'Báo cáo kiểm lại → đóng NCR' },
        { act: 'Phân tích nguyên nhân gốc (Ishikawa 5M+1E) + hành động phòng ngừa', doc: 'Thư viện 5M+1E', resp: 'QC + sản xuất', check: 'QC trưởng', point: 'R', record: 'CAPA / biên bản họp chất lượng', tool: { url: '../luongdu/', label: 'tab Thư viện 5M+1E' } }
      ]
    },

    hoacong: {
      module: 'Hỏa công nắn phẳng', title: 'ITP — Nắn chỉnh hỏa công',
      scope: 'Kiểm soát nắn nóng kết cấu biến dạng sau hàn theo TL Hỏa công nội bộ — từ đo biến dạng đến nghiệm thu sau nắn.',
      stages: [
        { act: 'Đo & lập danh sách biến dạng vượt dung sai (giá trị, vị trí, phạm vi)', doc: 'ISO 13920 / spec dự án', resp: 'QC', check: 'QC trưởng', point: 'R', record: 'Phiếu đo trước nắn + ảnh', tool: { url: '../hoacong/', label: 'Thư viện Hỏa công' } },
        { act: 'Lập phương án nắn: mẫu gia nhiệt (điểm/đường/V/khối), tuyến đốt đánh dấu, trình tự', doc: 'TL Hỏa công nội bộ mục 6, 8', resp: 'Kỹ thuật + QC', check: 'QC trưởng DUYỆT', point: 'H', record: 'Phương án nắn có chữ ký' },
        { act: 'Kiểm điều kiện trước nắn: khu vực đã hàn xong, ngoài vùng nhiệt hàn, TRƯỚC thử kín/nghiệm thu', doc: 'TL Hỏa công nội bộ mục 5.1–5.3', resp: 'QC', check: 'QC', point: 'H', record: 'Xác nhận trên phương án' },
        { act: 'Chỉ dẫn thợ hỏa công + chuẩn bị PCCC, mỏ đốt, bút nhiệt/súng IR', doc: 'TL Hỏa công nội bộ mục 8', resp: 'Tổ trưởng', check: 'QC', point: 'S', record: 'Biên bản toolbox' },
        { act: 'Gia nhiệt theo phương án: ~650°C, ngấm ¾ chiều dày, phía lồi, từ chi tiết cứng nhất; cấm làm mát nước vùng mối nối', doc: 'TL Hỏa công nội bộ mục 6, 9, 17', resp: 'Thợ hỏa công', check: 'QC GIÁM SÁT', point: 'W', record: 'Nhật ký nắn (nhiệt độ, vị trí)' },
        { act: 'Nguội tự nhiên → đo lại kích thước + VT vùng đốt (không nứt; nghi ngờ → MT)', doc: 'ISO 13920 + EN 1090-2 6.4.4 (≤450HV10 khi yêu cầu)', resp: 'QC', check: 'QC trưởng', point: 'H', record: 'Phiếu đo sau nắn', tool: { url: '../hoacong/', label: 'Calculator đánh giá sau nắn' } },
        { act: 'Biên bản nắn hoàn chỉnh (trước/sau + ảnh) — lưu hồ sơ, nhật ký QC', doc: 'EN 1090-2 6.5.3 (quy trình văn bản)', resp: 'QC', check: 'QC trưởng', point: 'R', record: 'Biên bản A4 + Nhật ký QC' }
      ]
    },

    wps: {
      module: 'Thư viện WPS', title: 'ITP — Kiểm soát quy trình hàn (WPS/PQR/WQT)',
      scope: 'Quy trình lập, chứng nhận, ban hành và kiểm soát tài liệu hàn trước & trong sản xuất.',
      stages: [
        { act: 'Lập pWPS (WPS sơ bộ) cho liên kết mới theo yêu cầu thiết kế', doc: 'EN ISO 15609-1 / AWS D1.1 Cl.6', resp: 'Kỹ sư hàn', check: 'QC trưởng', point: 'R', record: 'pWPS' },
        { act: 'Hàn mẫu chứng nhận PQR + thử cơ tính/NDT tại lab', doc: 'EN ISO 15614-1 / AWS D1.1 Cl.6', resp: 'Thợ hàn + lab', check: 'Giám định/khách CHỨNG KIẾN theo hợp đồng', point: 'H', record: 'PQR/WPQR + báo cáo thử' },
        { act: 'Ban hành WPS chính thức từ PQR đạt; kiểm tra phạm vi áp dụng (dày, vật liệu, tư thế)', doc: 'EN ISO 15612/15614', resp: 'Kỹ sư hàn', check: 'QC trưởng duyệt', point: 'R', record: 'WPS có số rev + chữ ký', tool: { url: '../wps/', label: 'Thư viện WPS — 75 WPS' } },
        { act: 'Thi tay nghề thợ hàn (WQT) đúng phạm vi WPS sẽ dùng', doc: 'EN ISO 9606-1 / AWS D1.1 Cl.6', resp: 'Thợ hàn', check: 'QC + giám định (W)', point: 'W', record: 'Chứng chỉ WQT + sổ theo dõi hiệu lực' },
        { act: 'Phân phối WPS tới máy hàn (bản in/QR), thu hồi bản cũ khi có rev mới', doc: 'Kiểm soát tài liệu ISO 9001', resp: 'QC', check: 'QC tuần tra', point: 'S', record: 'Danh sách phân phối + QR', tool: { url: '../wps/', label: 'in QR dán bản vẽ' } },
        { act: 'Giám sát tuân thủ WPS trong sản xuất (thông số, vật liệu hàn, preheat)', doc: 'WPS đang hiệu lực', resp: 'Foreman + QC', check: 'QC', point: 'S', record: 'Nhật ký hàn' },
        { act: 'Rà soát định kỳ: WQT hết hạn, WPS rev cũ, nhu cầu WPS mới', doc: 'EN ISO 9606-1 (hiệu lực 2-3 năm)', resp: 'Kỹ sư hàn', check: 'QC trưởng', point: 'R', record: 'Báo cáo rà soát quý' }
      ]
    },

    vattu: {
      module: 'Kiểm tra Vật tư', title: 'ITP — Vật tư đầu vào',
      scope: 'Áp dụng cho thép tấm/hình, vật liệu hàn, bu lông, sơn nhập kho.',
      stages: [
        { act: 'Kiểm hồ sơ trước dỡ hàng: MTC 3.1, CO/CQ, số lượng theo PO', doc: 'EN 10204 / PO', resp: 'Kho', check: 'QC', point: 'R', record: 'Bộ MTC + phiếu nhập' },
        { act: 'Đối chiếu heat number trên vật tư ↔ MTC', doc: 'EN 10025-1 §10', resp: 'QC', check: 'QC', point: 'H', record: 'Biên bản đối chiếu (không khớp → cách ly)' },
        { act: 'Ngoại quan: cấp gỉ, cong vênh, khuyết tật bề mặt', doc: 'ISO 8501-1 / EN 10163', resp: 'QC', check: 'QC', point: 'W', record: 'Checklist nghiệm thu đầu vào', tool: { url: '../vattu/', label: 'sketch cách đo từng vật tư' } },
        { act: 'Đo kích thước lấy mẫu (chiều dày, tiết diện) theo dung sai giao hàng', doc: 'EN 10029 / EN 10034 / ASTM A6', resp: 'QC', check: 'QC trưởng (lô lớn)', point: 'W', record: 'Phiếu đo kích thước' },
        { act: 'Kiểm bổ sung nếu spec: UT tách lớp, đối chứng cơ tính', doc: 'EN 10160 / spec', resp: 'NDT/Lab', check: 'QC trưởng', point: 'H', record: 'Báo cáo UT/thử nghiệm' },
        { act: 'Kết luận nhập kho: dán nhãn ĐẠT/CHỜ/LOẠI + lưu kho đúng quy cách', doc: 'Quy trình kho', resp: 'Kho + QC', check: 'QC', point: 'R', record: 'Phiếu nhập kho + biên bản' }
      ]
    }
  };
})();
