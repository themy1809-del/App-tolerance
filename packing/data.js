/* ============================================================================
   MODULE PACKING — KIỂM TRA ĐÓNG GÓI / XUẤT HÀNG KẾT CẤU THÉP
   v1.0 — Tham chiếu: CTU Code 2014 (IMO/ILO/UNECE — đóng hàng đơn vị vận tải),
   EN 12195-1 (tính lực chằng buộc), ISO 780:2015 (ký hiệu handling),
   ISPM 15 (gỗ đóng kiện xuất khẩu). THAM KHẢO — đối chiếu spec hợp đồng
   + yêu cầu hãng tàu/khách hàng của từng lô.
   ============================================================================ */
(function () {
  const B = (vi, en) => ({ vi, en });

  /* ---------- 1. QUY TRÌNH ĐÓNG HÀNG (các bước) ---------- */
  const STEPS = [
    { t: B("Nghiệm thu hoàn tất TRƯỚC khi đóng", "Final acceptance BEFORE packing"),
      d: B("Cấu kiện đã qua đủ: kích thước – hàn – bu lông – sơn; mọi NCR đã đóng; sơn khô đủ thời gian vận chuyển (theo PDS, thường ≥7 ngày epoxy). KHÔNG đóng hàng chưa nghiệm thu.", "All QC complete, NCRs closed, paint cured per PDS."),
      tool: B("Hồ sơ QC từng module + chữ ký QC trưởng", "QC records + sign-off") },
    { t: B("Đối chiếu Packing List", "Verify against packing list"),
      d: B("Đếm và quét từng piece mark khớp packing list; phụ kiện rời (bu lông, tấm mã, ốc vít) đếm đủ, đóng thùng riêng kèm DANH MỤC dán trong + ngoài thùng.", "Each piece mark counted vs packing list; loose items boxed with itemized list inside + outside."),
      tool: B("Packing list bản mới nhất + bút đánh dấu", "Latest packing list") },
    { t: B("Vệ sinh + touch-up", "Clean + touch-up"),
      d: B("Thổi bụi/hạt mài còn sót trong hộp kín, lau dầu; dặm sơn các điểm trầy do bốc xếp nội bộ TRƯỚC khi bọc (sau khi đóng kiện không sửa được nữa).", "Clean out grit, touch-up handling damage BEFORE wrapping."),
      tool: B("Sơn touch-up đúng hệ + cọ", "Touch-up paint kit") },
    { t: B("Bảo vệ chi tiết nhạy cảm", "Protect sensitive parts"),
      d: B("Ren bu lông neo: bôi mỡ + bịt ống nhựa/băng; mặt bích gia công: bôi chống gỉ + ốp gỗ/nhựa; chi tiết máy: bọc VCI/PE chống ẩm; mép sắc bo che để không cứa dây lashing.", "Threads greased + capped; machined faces protected; VCI wrap; sharp edges covered."),
      tool: B("Mỡ bảo quản, nắp ren, giấy VCI, nẹp góc", "Grease, caps, VCI, edge protectors") },
    { t: B("Đóng bundle / kiện", "Bundle / crate"),
      d: B("Cấu kiện nhỏ cùng loại bó bundle: kê gỗ giữa các lớp, đai thép ≥2 vị trí (≤1.5m một đai), nặng ≤ giới hạn cẩu của cảng. Hàng xuất khẩu: gỗ kê/kiện phải có DẤU IPPC (ISPM 15) — thiếu dấu là bị giữ tại cảng đến.", "Bundles strapped ≥2 points; export timber MUST bear IPPC stamp (ISPM 15)."),
      tool: B("Đai thép + máy siết, gỗ ISPM 15", "Steel strap tensioner, ISPM-15 timber") },
    { t: B("Tem nhãn + shipping mark", "Labels + shipping marks"),
      d: B("Dán tem từng kiện (tab Tem nhãn) ở 2 mặt đối diện + ký hiệu handling ISO 780; kiện ≥ 1 tấn đánh dấu trọng tâm CoG và điểm móc cẩu.", "Label 2 opposite faces + ISO 780 symbols; mark CoG & sling points for heavy packages."),
      tool: B("Tem in sẵn + sơn stencil", "Printed labels + stencil") },
    { t: B("Xếp lên phương tiện + lashing", "Stow + lash"),
      d: B("Theo nguyên tắc tab Sắp xếp (nặng dưới, CoG giữa, dunnage thẳng hàng) rồi chằng buộc theo tab Lashing; chèn kín khe hở chống xê dịch.", "Stow per rules, lash per lashing tab, fill gaps."),
      tool: B("Dây chằng có nhãn LC/STF, tăng đơ, nẹp góc, gỗ chèn", "Rated lashings, tensioners, edge protectors, dunnage") },
    { t: B("Chụp ảnh hồ sơ TỪNG LỚP", "Photo record EVERY layer"),
      d: B("Chụp: kiện trước khi đóng nắp → từng lớp xếp → lashing hoàn chỉnh → container trống trước khi đóng → cửa đóng + SEAL. Ảnh là bằng chứng duy nhất khi hàng hư hỏng/khiếu nại bảo hiểm.", "Photograph every stage incl. empty container + seal — sole evidence for insurance claims."),
      tool: B("Tab 📷 Ảnh đóng hàng — lưu kèm số kiện/container", "Photo tab — saved with package/container no.") },
    { t: B("Hồ sơ xuất", "Shipping dossier"),
      d: B("Biên bản nghiệm thu packing (in từ Checklist) + packing list ký + ảnh + số seal + biên bản bàn giao vận tải.", "Packing acceptance report + signed list + photos + seal no. + handover record."),
      tool: B("🖨 In/PDF từ tab Checklist", "Print from Checklist tab") }
  ];

  /* ---------- 2. TEM NHÃN ---------- */
  const LABEL = {
    content: [
      { k: B("Tên dự án + số hợp đồng", "Project + contract no."), r: true },
      { k: B("Piece mark / số kiện (kiện x / tổng y)", "Piece mark / case no. (x of y)"), r: true },
      { k: B("Trọng lượng tịnh NW / cả bì GW (kg)", "Net / gross weight"), r: true },
      { k: B("Kích thước D × R × C (mm)", "Dimensions L×W×H"), r: true },
      { k: B("Người nhận / cảng đến (shipping mark)", "Consignee / destination port"), r: true },
      { k: B("Xuất xứ (Made in Vietnam)", "Country of origin"), r: true },
      { k: B("Ngày đóng + người kiểm", "Packing date + inspector"), r: false },
      { k: B("QR code → packing list điện tử (khuyến nghị)", "QR → e-packing list (recommended)"), r: false }
    ],
    rules: [
      B("Dán/sơn stencil ở 2 MẶT ĐỐI DIỆN của kiện, chiều cao dễ đọc, không dán lên mối nối nắp.", "Mark 2 opposite faces, readable height, not across lid joints."),
      B("Mực/sơn chịu nước; tem giấy phải ép nhựa hoặc bỏ túi PE dán kín.", "Waterproof ink; paper labels laminated or in sealed pouch."),
      B("Kiện ≥ 1 tấn: vẽ thêm ký hiệu trọng tâm CoG và điểm móc cẩu ở đúng vị trí thật.", "≥1t packages: CoG + sling-point symbols at TRUE positions."),
      B("Gỗ kiện xuất khẩu: dấu IPPC (ISPM 15) phải nhìn thấy được từ ngoài, 2 mặt.", "Export timber: visible IPPC stamp on 2 faces.")
    ],
    symbols: [
      { id: "up", name: B("Chiều đứng — This way up", "This way up"), iso: "ISO 780 No.13" },
      { id: "fragile", name: B("Dễ vỡ — Fragile", "Fragile"), iso: "ISO 780 No.1" },
      { id: "dry", name: B("Tránh mưa — Keep dry", "Keep dry"), iso: "ISO 780 No.6" },
      { id: "cog", name: B("Trọng tâm — Centre of gravity", "Centre of gravity"), iso: "ISO 780 No.7" },
      { id: "sling", name: B("Vị trí móc cáp — Sling here", "Sling here"), iso: "ISO 780 No.5" },
      { id: "nohook", name: B("Cấm móc trực tiếp — Use no hooks", "Use no hooks"), iso: "ISO 780 No.2" },
      { id: "noforks", name: B("Cấm xỉa nĩa phía này — No forklift here", "No forklift this side"), iso: "ISO 780 No.16" },
      { id: "stack", name: B("Giới hạn chồng kiện — Stacking limit", "Stacking limitation"), iso: "ISO 780 No.10" }
    ],
    ref: "ISO 780:2015 — Distribution packaging, graphical symbols for handling and storage"
  };

  /* ---------- 3. SẮP XẾP (STOWAGE) ---------- */
  const STOW = [
    { t: B("Nặng dưới — nhẹ trên, dài dưới — ngắn trên", "Heavy low, light high"),
      d: B("Lớp dưới cùng là cấu kiện nặng/dài nhất; không đặt kiện nặng đè lên kiện yếu hơn; tôn/xà gồ bundle đặt trên cùng.", "Heaviest/longest at bottom; never heavy on weak.") },
    { t: B("Trọng tâm CoG vào GIỮA phương tiện", "CoG centred"),
      d: B("Phân bố để CoG nằm giữa chiều dài và trục giữa container/xe; container: lệch tâm quá → bị từ chối tại cảng (trục xe quá tải). Tải tập trung phải kê dunnage để rải tải xuống sàn.", "CoG mid-length & mid-width; concentrated loads spread by dunnage.") },
    { t: B("Dunnage (gỗ kê) đúng cách", "Proper dunnage"),
      d: B("Gỗ kê cùng cao độ, thẳng hàng đứng giữa các lớp (trên–dưới trùng vị trí); tối thiểu 2 thanh/cấu kiện, đặt gần điểm cẩu; KHÔNG kê lên bụng tấm mỏng.", "Aligned vertically between layers, ≥2 per piece near lifting points.") },
    { t: B("Không vượt giới hạn", "Within limits"),
      d: B("Tổng tải ≤ payload container/xe (container 20' ≈ 28t nhưng đường bộ VN giới hạn thấp hơn — kiểm quy định tuyến); tải sàn điểm ≤ cho phép; chiều cao xếp không vượt vạch.", "≤ payload & floor load; check road weight limits.") },
    { t: B("Chèn kín khe hở", "Fill the gaps"),
      d: B("Khe hở giữa hàng và vách phải chèn gỗ/túi khí (dunnage bag) — hàng xê dịch là nguyên nhân hư hỏng số 1 trong container; khe < 10cm mới được phép để trống (CTU Code).", "Brace all gaps with timber/airbags; movement is damage cause #1.") },
    { t: B("Hàng nhô khỏi sàn xe (OOG)", "Over-length / OOG"),
      d: B("Cấu kiện dài nhô đuôi xe: cờ đỏ + đèn ban đêm theo luật GT; nhô khỏi flat-rack phải khai OOG với hãng tàu trước.", "Flag overhangs; declare OOG to carrier.") }
  ];

  /* ---------- 4. LASHING ---------- */
  const LASH = {
    methods: [
      { id: "topover", name: B("Top-over (chằng qua nóc)", "Top-over lashing"),
        d: B("Dây vắt QUA hàng, 2 đầu neo xuống sàn — giữ hàng bằng cách TĂNG MA SÁT (ép hàng xuống). Hiệu quả nhất khi dây gần vuông góc sàn (α ≥ 75°); α < 30° gần như vô dụng.", "Strap over cargo pressing it down (friction). Best at α ≥ 75° to deck."),
        use: B("Bundle, kiện gỗ, cấu kiện không có điểm chằng", "Bundles, crates, cargo without lashing points") },
      { id: "loop", name: B("Loop (chằng vòng)", "Loop lashing"),
        d: B("Dây vòng qua hàng và quay về CÙNG MỘT BÊN sàn — chặn hàng xê dịch NGANG về phía đối diện. Luôn dùng THEO CẶP (mỗi bên 1 vòng) và ≥ 2 cặp mỗi cấu kiện dài.", "Loop around cargo back to same side — blocks sideways movement. Always in pairs."),
        use: B("Ống, dầm tròn, bundle dài trên flat-rack/xe sàn", "Pipes, long bundles on flat racks") },
      { id: "direct", name: B("Direct / cross (chằng chéo trực tiếp)", "Direct / cross lashing"),
        d: B("Dây nối từ ĐIỂM CHẰNG trên hàng xuống điểm neo sàn, bố trí chéo đối xứng 4 góc — giữ bằng chính lực căng dây, hiệu quả nhất cho hàng nặng. Góc dây so sàn 30–60° là tối ưu.", "From cargo lashing points to deck anchors, symmetric — best for heavy items at 30–60°."),
        use: B("Cấu kiện nặng có lỗ/tai chằng, máy móc", "Heavy items with lashing points, machinery") },
      { id: "corner", name: B("Bảo vệ cạnh (edge protector)", "Edge protection"),
        d: B("BẮT BUỘC ốp nẹp góc tại mọi điểm dây qua cạnh thép sắc: bảo vệ dây không bị cứa đứt + bảo vệ sơn không bị xiết hỏng + phân bố lực căng đều 2 nhánh.", "Mandatory at every sharp edge: protects strap, paint, and equalizes tension."),
        use: B("Mọi kiểu chằng bằng dây vải/đai", "All web lashing") }
    ],
    rules: [
      B("Chỉ dùng dây/xích có NHÃN định mức: LC (lashing capacity, daN) và STF (lực căng tăng đơ) — dây không nhãn, rách, đứt sợi → LOẠI.", "Only rated lashings with LC/STF label; discard damaged/unlabelled."),
      B("Số lượng tối thiểu 2 dây cho mọi cấu kiện; cộng thêm theo trọng lượng — tính chính xác số dây theo EN 12195-1 (hoặc bảng hãng vận tải).", "Minimum 2 lashings; exact count per EN 12195-1."),
      B("Lực giữ phải chống được: phanh gấp 0.8G về trước, 0.5G ngang/lùi (đường bộ, EN 12195-1) — đường biển cao hơn theo CTU Code.", "Restrain 0.8g forward / 0.5g sideways (road); sea per CTU Code."),
      B("Không nối 2 dây với nhau, không xoắn dây, tăng đơ siết căng và KHÓA; kiểm tra + siết lại sau 50–100km đầu (dây vải chùng).", "No joining/twisting; re-tension after first 50–100 km."),
      B("Điểm neo sàn phải đủ định mức (container góc ISO ≈ 1000daN/điểm sàn thường) — không móc vào vách tôn container.", "Anchor points rated; never lash to container side walls."),
      B("Hàng trên flat-rack đi biển: lashing + chèn phải chịu nghiêng ±30° — yêu cầu phương án chằng buộc được duyệt trước.", "Sea flat-rack: survive ±30° roll; approved securing plan required.")
    ],
    ref: "CTU Code 2014 (IMO/ILO/UNECE) · EN 12195-1:2010 · hướng dẫn hãng tàu"
  };

  /* ---------- 5. CHECKLIST NGHIỆM THU PACKING ---------- */
  const CHECKLIST = [
    { phase: B("TRƯỚC KHI ĐÓNG", "BEFORE PACKING"), icon: "📋", items: [
      { t: B("Toàn bộ cấu kiện đã nghiệm thu QC (kích thước/hàn/sơn), NCR đã đóng, sơn khô đủ ngày theo PDS", "All QC passed, NCRs closed, paint cured"), ref: B("Hồ sơ QC nội bộ", "QC records") },
      { t: B("Piece mark từng cây rõ ràng, khớp 100% packing list bản mới nhất", "Piece marks match latest packing list 100%"), ref: B("Packing list", "Packing list") },
      { t: B("Phụ kiện rời đếm đủ, đóng thùng riêng + danh mục trong & ngoài thùng", "Loose items counted, boxed with list inside & outside"), ref: B("Danh mục phụ kiện", "Itemized list") },
      { t: B("Gỗ kê/kiện có dấu IPPC (ISPM 15) cho hàng xuất khẩu — nhìn thấy từ ngoài", "Export timber bears visible IPPC stamp"), ref: "ISPM 15" },
      { t: B("Touch-up sơn hoàn tất TRƯỚC khi bọc; điểm trầy mới phát hiện đã xử lý", "Touch-up done before wrapping"), ref: B("PDS hệ sơn", "Coating PDS") }
    ]},
    { phase: B("BẢO VỆ & ĐÓNG KIỆN", "PROTECTION & CRATING"), icon: "📦", items: [
      { t: B("Ren bôi mỡ + bịt đầu; mặt bích gia công có ốp bảo vệ; chi tiết máy bọc VCI/PE", "Threads greased+capped; machined faces protected; VCI wrap"), ref: B("Spec bảo quản", "Preservation spec") },
      { t: B("Điểm tiếp xúc giữa cấu kiện có lót (cao su/vải/gỗ mềm) — không cấn trầy sơn", "Contact points padded — no paint damage"), ref: B("Thực hành", "Practice") },
      { t: B("Bundle: gỗ kê giữa các lớp thẳng hàng, đai thép ≥2 vị trí, siết căng", "Bundles: aligned dunnage, ≥2 straps tensioned"), ref: "CTU Code" },
      { t: B("Trọng lượng từng kiện ≤ sức cẩu cảng đến (hỏi forwarder nếu >10t)", "Package weight within destination port crane capacity"), ref: B("Forwarder", "Forwarder") }
    ]},
    { phase: B("TEM NHÃN", "MARKING"), icon: "🏷️", items: [
      { t: B("Tem đủ nội dung bắt buộc (dự án, piece mark, NW/GW, kích thước, kiện x/y, cảng đến, xuất xứ)", "Labels complete (project, marks, weights, dims, x/y, destination, origin)"), ref: B("Spec hợp đồng", "Contract spec") },
      { t: B("Dán/sơn 2 mặt đối diện, chống nước, đọc được từ xa", "2 opposite faces, waterproof, readable"), ref: "ISO 780" },
      { t: B("Ký hiệu handling đúng: chiều đứng, tránh mưa, CoG + điểm móc cẩu (kiện ≥1t)", "Handling symbols incl. CoG & sling points for ≥1t"), ref: "ISO 780:2015" }
    ]},
    { phase: B("SẮP XẾP & LASHING", "STOWAGE & LASHING"), icon: "🔗", items: [
      { t: B("Nặng dưới nhẹ trên, CoG giữa, không vượt payload + giới hạn đường bộ", "Heavy low, CoG centred, within payload & road limits"), ref: "CTU Code" },
      { t: B("Dunnage thẳng hàng giữa các lớp, đủ 2 thanh/cây, khe hở đã chèn kín", "Dunnage aligned, gaps braced"), ref: "CTU Code" },
      { t: B("Dây chằng có nhãn LC/STF còn hạn, không hư hỏng; đủ số lượng (≥2 + theo trọng lượng)", "Rated lashings, sufficient count"), ref: "EN 12195-1" },
      { t: B("Nẹp góc tại MỌI cạnh sắc dây đi qua; tăng đơ siết căng + khóa", "Edge protectors at every sharp edge; tensioners locked"), ref: "EN 12195-1" },
      { t: B("Hàng nhô/quá khổ: cờ báo + khai OOG với hãng vận tải", "Overhang flagged; OOG declared"), ref: B("Luật GT + hãng tàu", "Road law + carrier") }
    ]},
    { phase: B("TRƯỚC KHI XUẤT", "BEFORE DISPATCH"), icon: "🚛", items: [
      { t: B("Ảnh hồ sơ đủ: từng kiện → từng lớp xếp → lashing → container trống → đóng cửa + seal", "Full photo record incl. empty container & seal"), ref: B("Tab 📷 Ảnh đóng hàng", "Photo tab") },
      { t: B("Packing list cuối khớp thực tế 100%, có chữ ký QC + kho", "Final packing list signed, matches reality"), ref: B("Packing list", "Packing list") },
      { t: B("Số seal ghi vào biên bản + chụp ảnh seal đã bấm", "Seal no. recorded + photographed"), ref: B("Biên bản bàn giao", "Handover record") },
      { t: B("Biên bản nghiệm thu packing in + ký (nút 🖨 bên trên)", "Packing acceptance report printed & signed"), ref: B("Biểu mẫu app", "App form") }
    ]}
  ];

  window.PK_DATA = { STEPS, LABEL, STOW, LASH, CHECKLIST,
    note: B("Tham chiếu CTU Code/EN 12195-1/ISO 780/ISPM 15 — đối chiếu yêu cầu riêng của hợp đồng, hãng tàu và nước nhập khẩu cho từng lô hàng.",
      "Refs are industry codes — always check contract, carrier and import-country requirements per shipment.")
  };
})();
