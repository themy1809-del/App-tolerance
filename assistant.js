/* ============================================================================
   QC ASSISTANT v2 — "Bạn cần kiểm tra gì? Tôi sẽ giải quyết giúp bạn."
   Tầng 1 (cục bộ, offline): hiểu câu hỏi đa dạng vấn đề → hướng dẫn TẬN TÌNH
   từng bước (làm gì, bằng dụng cụ gì, ghi chép gì), tự tính số liệu thật từ
   dataset đã nạp, link mở đúng công cụ.
   Tầng 2 (tùy chọn): gọi AI qua API nếu người dùng đã lưu API key.
   ============================================================================ */
(function () {
  const norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[đĐ]/g, 'd').toLowerCase();
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- trích số liệu từ câu hỏi ---------- */
  function parseLen(q) {
    const m = q.match(/(\d+(?:[.,]\d+)?)\s*(mm|cm|m)\b/i);
    if (!m) return null;
    let v = parseFloat(m[1].replace(',', '.'));
    const u = m[2].toLowerCase();
    if (u === 'm') v *= 1000; else if (u === 'cm') v *= 10;
    return { mm: v, raw: m[0] };
  }
  const parseRH = q => { const m = norm(q).match(/(\d{2,3})\s*%/); return m ? +m[1] : null; };
  const parseM = q => { const m = q.match(/M(\d{2})\b/i); return m ? +m[1] : null; };

  /* ---------- nhận diện ---------- */
  const ENT = [
    { k: 'truss', re: /truss|trust|vi keo|gian( |$)|gian thep|keo thep/, vi: 'giàn / vì kèo' },
    { k: 'beam', re: /\bdam\b|girder|beam|xa go/, vi: 'dầm' },
    { k: 'column', re: /\bcot\b|column/, vi: 'cột' },
    { k: 'weld', re: /moi han|\bhan\b|weld|undercut|ngau|que han|fillet/, vi: 'mối hàn' },
    { k: 'paint', re: /\bson\b|paint|dft|be mat|sa 2|phun bi|phun cat|mang son/, vi: 'sơn phủ' },
    { k: 'bolt', re: /bu long|bulong|bolt|\bxiet\b|momen|preload|turn.of.nut/, vi: 'bu lông' },
    { k: 'material', re: /vat tu|thep tam|nhap kho|mtc|ban ma|thep hinh/, vi: 'vật tư' }
  ];
  function detect(qn) {
    const ent = ENT.find(e => e.re.test(qn));
    return { ent: ent ? ent.k : null, entVi: ent ? ent.vi : '' };
  }
  function isQuestion(q) {
    const qn = norm(q);
    if (q.trim().length < 10) return false;
    return /\?|nhu the nao|lam sao|the nao|cach nao|kiem tra gi|can (kiem tra|do|lam|gi)|quy trinh|huong dan|bao nhieu|cach (do|kiem|lam|chon|xu ly)|nen dung|chon (phuong phap|cach|wps)|duoc khong|co (duoc|nen|son|han)|xu ly (sao|the nao)|khac phuc|tai sao|vi sao|giay to|ho so/.test(qn);
  }

  /* ---------- tính số thật từ dataset ---------- */
  function iso13920(Lmm) {
    try {
      const r = (window.APP_DATA.tolerances || []).find(x => x.id === 'iso_linear');
      const p = r.permitted;
      let i = p.ranges.findIndex(b => Lmm > b.from && Lmm <= b.to);
      if (i < 0) i = p.ranges.length - 1;
      return { band: p.ranges[i].l, B: p.cells.B[i], C: p.cells.C[i], D: p.cells.D[i] };
    } catch (e) { return null; }
  }
  const thermal = (Lmm, dT) => Math.round(12e-6 * dT * Lmm * 10) / 10;
  function fpc(d) { try { return { f88: window.BL_DATA.FPC['8.8'][d], f109: window.BL_DATA.FPC['10.9'][d] }; } catch (e) { return null; } }

  /* ---------- khối hiển thị ---------- */
  const step = (n, html) => `<div style="display:flex;gap:10px;padding:9px 0;border-top:1px solid #eef1f5"><div style="width:24px;height:24px;border-radius:50%;background:#0c447c;color:#fff;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;flex:none">${n}</div><div style="font-size:13.5px;flex:1">${html}</div></div>`;
  const sub = t => `<div style="font-size:12px;color:#5d6b7c;margin-top:3px">${t}</div>`;
  const lk = (url, label) => `<a href="${url}" style="color:#0c447c;font-weight:700;text-decoration:underline dotted">${label}</a>`;
  const hi = t => `<b style="background:#fdf3e2;padding:1px 6px;border-radius:5px;color:#6b4700">${t}</b>`;
  const good = t => `<b style="background:#e3f6ee;padding:1px 6px;border-radius:5px;color:#0f6e56">${t}</b>`;
  const bad = t => `<b style="background:#fbeae2;padding:1px 6px;border-radius:5px;color:#aa4322">${t}</b>`;

  /* ============================ PLAYBOOKS ============================ */

  function planStructure(entVi, len) {
    const L = len ? len.mm : null;
    const iso = L ? iso13920(L) : null;
    let s = [], n = 0;
    s.push(step(++n, `<b>Chuẩn bị trước khi đo.</b> Lấy bản vẽ rev mới nhất; xác định class dung sai trong spec (EXC mấy? ISO 13920 class nào?).${sub('🧰 Dụng cụ: thước cuộn có tem hiệu chuẩn, máy thủy bình/total station, dây căng, nhiệt kế. Checklist đầy đủ: ' + lk('dungsai/', 'Dung sai → tab ☑️ Checklist'))}`));
    if (L) {
      s.push(step(++n, `<b>Đo chiều dài tổng ${len.raw}.</b> Kéo thước đủ lực căng, đọc 2 lần lấy trung bình. ${iso ? `Giới hạn ISO 13920 (dải ${iso.band}mm): class B ${hi('±' + iso.B + 'mm')} · C ${hi('±' + iso.C + 'mm')} · D ${hi('±' + iso.D + 'mm')}.` : ''}${sub('📝 Ghi: giá trị đo + vị trí + nhiệt độ lúc đo. Đánh giá tự động: ' + lk('dungsai/', 'mở Tra cứu Dung sai'))}`));
      s.push(step(++n, `<b>Bù nhiệt độ — bắt buộc với cấu kiện dài.</b> Thép giãn ~12µm/m/°C → ${len.raw} chênh 10°C lệch ${hi('±' + thermal(L, 10) + 'mm')}, chênh 15°C lệch ${hi('±' + thermal(L, 15) + 'mm')}. Quy mọi số đo về 20°C.${sub('🧮 Tính nhanh: ' + lk('luongdu/', 'Lượng dư → Giãn nở nhiệt'))}`));
    } else {
      s.push(step(++n, `<b>Đo kích thước tổng:</b> chiều dài, chiều cao, khoảng cách nút/bu lông — so giới hạn theo class trong ${lk('dungsai/', 'module Dung sai')} (mỗi tiêu chí có hình cách đo).`));
    }
    s.push(step(++n, `<b>Đo độ thẳng / độ vồng (camber) / độ võng.</b> Kê cấu kiện tự do (không kẹp, không tải), căng dây hoặc bắn máy tại 2 đầu + giữa nhịp + các điểm nút; độ lệch lớn nhất so với đường chuẩn = giá trị cần so.${sub('📝 Ghi từng vị trí đo. Giới hạn: tra "độ thẳng", "camber" trong ' + lk('dungsai/', 'Dung sai'))}`));
    s.push(step(++n, `<b>Kiểm mối hàn 100% bằng mắt (VT).</b> Soi đèn ≥350 lux dọc mọi đường hàn: nứt (cấm tuyệt đối), undercut, rỗ, size fillet bằng dưỡng.${sub('🧮 Nhập số đo là ra Đạt/Không đạt + hình cách đo từng khuyết tật: ' + lk('han/', 'QC Hàn → Ngoại quan') + ' · NDT bổ sung theo EXC: ' + lk('han/', 'tab NDT'))}`));
    s.push(step(++n, `<b>Liên kết bu lông (nếu ${entVi} ghép nối):</b> đủ số lượng, ren nhô ≥1 bước, lực xiết đúng hệ EN/AISC của hợp đồng.${sub('🧮 Momen + góc xoay: ' + lk('bulong/', 'QC Bu lông → Lực xiết'))}`));
    s.push(step(++n, `<b>Sơn phủ:</b> DFT đo theo ISO 19840 (app kiểm đủ 4 điều kiện), ngoại quan không chảy/lỗ kim/bỏ sót.${sub('🧮 ' + lk('son/', 'QC Sơn → DFT'))}`));
    s.push(step(++n, `<b>Chốt hồ sơ.</b> Tick checklist từng phần → 🖨 In/PDF biểu mẫu chữ ký. Điểm KHÔNG ĐẠT → ${lk('luongdu/', 'tạo NCR nháp 1 chạm')} + cách ly đánh dấu cấu kiện.`));
    return { title: `Kế hoạch kiểm tra ${entVi}${len ? ' dài ' + len.raw : ''}`, body: s.join('') };
  }

  function planWeld() {
    let s = [], n = 0;
    s.push(step(++n, `<b>Trước khi hàn:</b> WPS đúng liên kết có tại máy (${lk('wps/', 'tra Thư viện WPS')}), thợ đúng chứng chỉ, fit-up đạt (khe hở chân, góc vát theo WPS), que hydro thấp đã sấy.${sub('☑️ Checklist 10 mục trước hàn: ' + lk('han/', 'QC Hàn → Checklist'))}`));
    s.push(step(++n, `<b>VT 100% sau khi nguội.</b> Trình tự soi: dọc 2 chân mối hàn → mặt hàn → điểm dừng/crater. Thép A514/A517/HPS 690W phải chờ ${hi('≥ 48h')} mới kiểm.${sub('🧰 Đèn ≥350 lux, kính lúp 5–10×, dưỡng fillet, thước V-WAC')}`));
    s.push(step(++n, `<b>Đo từng khuyết tật đúng cách.</b> Mỗi tiêu chí trong app có hình vẽ dụng cụ + các bước đo + ô nhập số → ĐẠT/KHÔNG ĐẠT theo mức B/C/D (EXC1→D, EXC2→C, EXC3→B).${sub('🧮 ' + lk('han/', 'QC Hàn → Ngoại quan'))}`));
    s.push(step(++n, `<b>Khó đo trực tiếp?</b> Chụp ảnh kèm thước → hiệu chuẩn → đo trên ảnh → gửi thẳng số vào calculator.${sub('📷 ' + lk('han/', 'QC Hàn → Đo ảnh'))}`));
    s.push(step(++n, `<b>NDT bổ sung:</b> chờ đủ hold time (8–24h tùy nhiệt lượng + chiều dày), phạm vi % theo EXC và loại mối hàn (Table 24).${sub('📡 Bảng đã xác minh + tính hold time: ' + lk('han/', 'QC Hàn → NDT / Công cụ'))}`));
    s.push(step(++n, `<b>Kết quả & hồ sơ:</b> mối đạt → đánh dấu; mối hỏng → sửa theo quy trình duyệt, kiểm lại 100% + lập NCR (${lk('luongdu/', 'tạo NCR 1 chạm')}). In checklist thành biểu mẫu chữ ký.`));
    return { title: 'Quy trình kiểm tra mối hàn — từng bước', body: s.join('') };
  }

  function planPaint() {
    let s = [], n = 0;
    s.push(step(++n, `<b>Trước phun hạt:</b> tẩy dầu mỡ (SSPC-SP1), kiểm mép/spatter đạt cấp P theo hợp đồng.${sub('📖 Bảng P1–P3 đã xác minh: ' + lk('son/', 'QC Sơn → Bề mặt'))}`));
    s.push(step(++n, `<b>Sau phun hạt — 4 phép kiểm:</b> ① cấp sạch so ảnh chuẩn (thường Sa 2½) ② độ nhám replica tape (nhớ trừ 50µm đế) ③ bụi tape test ④ muối Bresle.${sub('📐 Hình cách đo từng phép trong tab Bề mặt')}`));
    s.push(step(++n, `<b>Kiểm môi trường TRƯỚC khi mở thùng sơn:</b> đo nhiệt độ khí + RH + nhiệt độ thép tại chỗ lạnh nhất → nhập 3 số vào app → ${good('ĐƯỢC SƠN')} / ${bad('KHÔNG')} tự hiện.${sub('🧮 ' + lk('son/', 'QC Sơn → Môi trường') + ' · đo lại mỗi 2–4h và khi trời đổi')}`));
    s.push(step(++n, `<b>Trong khi sơn:</b> đúng tỷ lệ trộn + pot life, stripe coat cạnh/bu lông/mối hàn TRƯỚC lớp phun, kiểm WFT bằng lược.${sub('☑️ ' + lk('son/', 'Checklist tab'))}`));
    s.push(step(++n, `<b>Đo DFT khi khô:</b> hiệu chuẩn máy bằng foil → đo ≥5 điểm/khu vực (mỗi điểm 3 số đọc) → dán cả loạt số vào app → kiểm đủ 4 điều kiện ISO 19840 tự động.${sub('🧮 ' + lk('son/', 'QC Sơn → DFT'))}`));
    s.push(step(++n, `<b>Lỗi sơn?</b> So ảnh + triệu chứng trong tab Lỗi sơn (16 lỗi) → nguyên nhân → cách sửa → tiêu chí chấp nhận.`));
    return { title: 'Quy trình QC sơn — từng bước', body: s.join('') };
  }

  function planBolt(dia) {
    const f = dia ? fpc(dia) : null;
    let s = [], n = 0;
    s.push(step(++n, `<b>Xác định hệ theo HỢP ĐỒNG:</b> dự án EN → EN 1090-2; dự án Mỹ/PEB → AISC/RCSC. Hai hệ khác cả lực căng lẫn cách xiết — không dùng lẫn.${sub('🔀 Nút gạt EN/AISC: ' + lk('bulong/', 'QC Bu lông → Lực xiết'))}`));
    s.push(step(++n, `<b>Kiểm bộ bu lông trước khi xiết:</b> đồng bộ cùng nhà sản xuất + CoC, đúng k-class cho phương pháp (hệ EN), bôi trơn nguyên xuất xưởng, bảo quản khô.`));
    if (dia && f) s.push(step(++n, `<b>Lực căng M${dia}:</b> hệ EN Fp,C = ${hi(f.f88 + ' kN')} (8.8) / ${hi(f.f109 + ' kN')} (10.9). Nhập km từ CoC vào app → ra momen bước 1 (0.75·Mr,2) và bước 2 (1.10·Mr,2).${sub('🧮 ' + lk('bulong/', 'calculator Lực xiết'))}`));
    else s.push(step(++n, `<b>Tính momen/góc xoay:</b> chọn M + cấp bền (+ km từ CoC nếu EN) → app ra giá trị 2 bước hoặc góc turn-of-nut.${sub('🧮 ' + lk('bulong/', 'calculator Lực xiết'))}`));
    s.push(step(++n, `<b>Xiết đúng trình tự:</b> ép khít khe hở ≤2mm → bước 1 cho TOÀN BỘ bu lông trong liên kết (từ chỗ cứng ra chỗ mềm) → đánh dấu → bước 2.${sub('📜 7 quy tắc bắt buộc: ' + lk('bulong/', 'tab Quy tắc'))}`));
    s.push(step(++n, `<b>Nghiệm thu:</b> ngoại quan 100% (đủ bu lông, ren nhô ≥1 bước, đệm đúng chiều); HRC kiểm 100% chuôi đứt; lấy mẫu kiểm lực theo Annex M.${sub('☑️ Checklist 15 mục + in biểu mẫu: ' + lk('bulong/', 'tab Checklist'))}`));
    return { title: 'Quy trình xiết & nghiệm thu bu lông' + (dia ? ' M' + dia : ''), body: s.join('') };
  }

  function planMaterial() {
    let s = [], n = 0;
    s.push(step(++n, `<b>Đối chiếu hồ sơ TRƯỚC khi dỡ hàng:</b> MTC đúng loại (thường EN 10204 3.1), heat number trên MTC phải khớp số dập trên vật tư, số lượng khớp PO.`));
    s.push(step(++n, `<b>Ngoại quan từng kiện:</b> cấp gỉ A/B đạt (C/D phải báo QC đánh giá), không cong vênh, không khuyết tật bề mặt sâu.${sub('📖 Ảnh chuẩn cấp gỉ: nút tìm ảnh trong ' + lk('son/', 'QC Sơn → Bề mặt'))}`));
    s.push(step(++n, `<b>Đo kích thước đúng vị trí:</b> mỗi loại vật tư có sketch chỉ chỗ đặt thước (tấm đo chiều dày cách mép bao nhiêu, thép hình đo ở đâu).${sub('📐 ' + lk('vattu/', 'Kiểm tra Vật tư') + ' — gõ tên vật tư là ra spec + dung sai')}`));
    s.push(step(++n, `<b>Kiểm bổ sung nếu spec yêu cầu:</b> UT tách lớp tấm dày, đối chứng cơ tính.`));
    s.push(step(++n, `<b>Kết luận:</b> dán nhãn ĐẠT/CHỜ/LOẠI, kê cao lưu kho tách mác thép, tick ${lk('vattu/', 'checklist nghiệm thu')} → in biểu mẫu.`));
    return { title: 'Quy trình nghiệm thu vật tư đầu vào', body: s.join('') };
  }

  function planDefect() {
    let s = [], n = 0;
    s.push(step(++n, `<b>Nhận diện đúng lỗi trước đã.</b> Mở ${lk('luongdu/', 'Lượng dư & Sai hỏng → tab Sai hỏng')}: 45 lỗi có ảnh thật + triệu chứng — lọc theo loại (hàn/kích thước/sơn) cho nhanh.`));
    s.push(step(++n, `<b>Đo mức độ lỗi:</b> đo trực tiếp bằng dụng cụ, hoặc chụp ảnh kèm thước rồi đo trên ảnh (${lk('han/', 'Đo ảnh')}).${sub('📝 Ghi: vị trí, kích thước, số lượng, ảnh chụp')}`));
    s.push(step(++n, `<b>So tiêu chí chấp nhận:</b> mỗi lỗi có bảng B/C/D — nếu trong giới hạn mức yêu cầu thì KHÔNG phải sửa.${sub('🧮 Lỗi hàn/sơn có nút nhảy thẳng sang calculator QC Hàn / QC Sơn')}`));
    s.push(step(++n, `<b>Vượt giới hạn → xử lý:</b> xem mục "Biện pháp khắc phục" của lỗi đó + tìm nguyên nhân gốc theo Ishikawa 5M+1E để không tái diễn.`));
    s.push(step(++n, `<b>Lập NCR:</b> bấm ${hi('📋 Tạo NCR nháp')} trong chi tiết lỗi — biên bản tự sinh đầy đủ, dán vào biểu mẫu. Sửa xong kiểm lại 100% bằng phương pháp ban đầu.`));
    return { title: 'Xử lý lỗi / sai hỏng — từng bước', body: s.join('') };
  }

  /* ----- playbook MỚI: đa dạng vấn đề ----- */
  function planNDT() {
    let s = [], n = 0;
    s.push(step(++n, `<b>Xác định EXC của dự án</b> (ghi trong spec/bản vẽ — EXC2 phổ biến nhất cho nhà xưởng).`));
    s.push(step(++n, `<b>VT 100% luôn làm trước</b> — NDT chỉ bổ sung sau khi ngoại quan đạt.`));
    s.push(step(++n, `<b>Tra phạm vi % theo loại mối hàn (Table 24 — đã xác minh):</b> ví dụ EXC2: giáp mối ngang chịu kéo ${hi('10%')}, chữ T ${hi('5%')}, fillet lớn (a>12 hoặc t>30) ${hi('5%')}, hàn dọc thường ${hi('0%')}. EXC3 gấp đôi.${sub('📡 Bảng đầy đủ: ' + lk('han/', 'QC Hàn → NDT'))}`));
    s.push(step(++n, `<b>Chờ đủ hold time trước khi quét:</b> 8–24h tùy nhiệt lượng Q và chiều dày (Table 23). Nhập U·I·v vào app là ra Q + hold time.${sub('🧮 ' + lk('han/', 'QC Hàn → Công cụ'))}`));
    s.push(step(++n, `<b>Chọn phương pháp đúng khuyết tật:</b> trong lòng mối hàn → UT (t≥8mm); nứt bề mặt thép từ tính → MT; vật liệu không từ → PT; giáp mối cần lưu phim → RT.${sub('Nhân sự: chứng chỉ ISO 9712 Level 2 trở lên')}`));
    s.push(step(++n, `<b>Không đạt:</b> sửa → kiểm lại 100% mối sửa + mở rộng lấy mẫu theo quy định; lưu báo cáo NDT vào hồ sơ nghiệm thu.`));
    return { title: 'NDT mối hàn: làm gì, bao nhiêu %', body: s.join('') };
  }

  function planEnvPaint(q) {
    const rh = parseRH(q);
    let s = [], n = 0;
    if (rh != null) {
      const ok = rh <= 85;
      s.push(step(++n, `<b>Với RH ${rh}% bạn nêu:</b> ${ok ? good('CÒN TRONG GIỚI HẠN (≤85%)') + ' — nhưng phải kiểm thêm điểm sương ở bước 2.' : bad('KHÔNG SƠN ĐƯỢC') + ' — vượt giới hạn RH ≤ 85%. Chờ ráo, hút ẩm hoặc che chắn gia nhiệt rồi đo lại.'}`));
    }
    s.push(step(++n, `<b>Đo đủ 3 thông số tại CHỖ LẠNH NHẤT:</b> nhiệt độ khí (Ta), độ ẩm RH, nhiệt độ bề mặt thép (Ts — nhiệt kế nam châm áp ≥1 phút).${sub('🧰 Whirling hygrometer hoặc máy đo điện tử + nhiệt kế tiếp xúc')}`));
    s.push(step(++n, `<b>Nhập 3 số vào app:</b> tự tính điểm sương Td và kết luận ${good('ĐƯỢC SƠN')} khi Ts ≥ Td + 3°C và RH ≤ 85%.${sub('🧮 ' + lk('son/', 'QC Sơn → Môi trường'))}`));
    s.push(step(++n, `<b>Chưa đạt thì làm gì:</b> chờ nắng lên/quá trưa, che chắn + thổi gió khô, gia nhiệt bề mặt; tuyệt đối không sơn khi bề mặt còn ẩm/ngưng tụ.`));
    s.push(step(++n, `<b>Đo lại mỗi 2–4h</b> và mỗi khi thời tiết đổi; ghi tất cả vào nhật ký sơn (in được từ checklist).`));
    return { title: 'Trời ẩm / mưa — có sơn được không?', body: s.join('') };
  }

  function planPreheat() {
    let s = [], n = 0;
    s.push(step(++n, `<b>Xác định 2 thứ:</b> mác thép (CEV nếu có trên MTC) + chiều dày LỚN NHẤT tại mối nối.`));
    s.push(step(++n, `<b>Tra nhiệt độ tối thiểu:</b> tham khảo nhanh AWS Table 5.8 Cat.B: t≤20mm: 0°C · 20–38: ${hi('10°C')} · 38–65: ${hi('65°C')} · >65: ${hi('110°C')}. Giá trị chính thức theo WPS!${sub('📖 ' + lk('han/', 'QC Hàn → Công cụ → bảng preheat'))}`));
    s.push(step(++n, `<b>Gia nhiệt đúng cách:</b> đèn khò/tấm điện trở, hơ đều 2 phía, vùng rộng ≥75mm quanh mép hàn.`));
    s.push(step(++n, `<b>Đo kiểm:</b> bút nhiệt (temp stick) hoặc súng IR, đo ở mặt ĐỐI DIỆN nguồn nhiệt, cách mép hàn 75mm, NGAY trước khi hàn.`));
    s.push(step(++n, `<b>Duy trì trong suốt quá trình:</b> nhiệt giữa các lớp (interpass) không tụt dưới preheat và không vượt max WPS; trời lạnh/gió phải che chắn.${sub('⚠ Hàn khi thép < -18°C là cấm (AWS 7.12.2)')}`));
    return { title: 'Gia nhiệt sơ bộ (preheat) — làm thế nào', body: s.join('') };
  }

  function planReuseBolt() {
    let s = [], n = 0;
    s.push(step(++n, `<b>Trả lời thẳng:</b> bu lông dự ứng lực ${bad('ĐÃ CĂNG ĐỦ LỰC rồi tháo ra → LOẠI BỎ CẢ BỘ')} (bu lông + đai ốc + đệm), không tái sử dụng — EN 1090-2 mục 8.5.1 quy định rõ.${sub('Lý do: ren và bôi trơn đã biến dạng dẻo, xiết lại không đạt lực căng thiết kế')}`));
    s.push(step(++n, `<b>Ngoại lệ duy nhất:</b> bu lông chỉ dùng GÁ LẮP (chưa căng tới Fp,C) → vẫn dùng được tại vị trí đó trong lần xiết cuối.`));
    s.push(step(++n, `<b>Phân biệt thế nào:</b> kiểm nhật ký xiết; bu lông đã qua bước 2 (đã đánh dấu/chuôi đã đứt với HRC) chắc chắn phải thay.`));
    s.push(step(++n, `<b>Hệ AISC/RCSC:</b> bu lông đen A325 cho phép re-tighten trong một số trường hợp nhưng A490 và bu lông mạ ${bad('không bao giờ')} — an toàn nhất: đã căng là thay.${sub('📜 Chi tiết: ' + lk('bulong/', 'QC Bu lông → Quy tắc'))}`));
    return { title: 'Bu lông tháo ra có dùng lại được không?', body: s.join('') };
  }

  function planWpsPick() {
    let s = [], n = 0;
    s.push(step(++n, `<b>Gom 4 thông tin của mối hàn:</b> ① vật liệu nền (mác thép) ② chiều dày ③ tư thế hàn (1G/2G/3G/6G...) ④ quy trình sẵn có (SMAW/FCAW/SAW/GMAW).`));
    s.push(step(++n, `<b>Mở ${lk('wps/', 'Thư viện WPS')} → "Tìm theo công việc":</b> trả lời 4 câu là app lọc ra WPS phù hợp (75 WPS).`));
    s.push(step(++n, `<b>Kiểm phạm vi áp dụng:</b> chiều dày + đường kính của bạn phải nằm TRONG dải của WPS; vật liệu đúng nhóm.${sub('📋 Nút "Copy thông số" để gửi cho thợ/giám sát')}`));
    s.push(step(++n, `<b>Không có WPS phù hợp:</b> KHÔNG hàn tạm — báo kỹ sư hàn lập WPS mới (kèm PQR nếu ngoài phạm vi đã chứng nhận).`));
    s.push(step(++n, `<b>Tại máy hàn:</b> in QR của WPS dán lên bản vẽ/máy — thợ quét là mở đúng thông số.`));
    return { title: 'Chọn WPS nào cho mối hàn của bạn', body: s.join('') };
  }

  function planShrink(len) {
    const L = len ? len.mm : null;
    let s = [], n = 0;
    s.push(step(++n, `<b>Liệt kê các nguồn co/hao:</b> co rút hàn ngang (mỗi mối giáp mối), co rút dọc, kerf cắt, lượng dư gia công mép.`));
    s.push(step(++n, `<b>Tính từng khoản bằng app:</b> co ngang ≈ k×t mỗi mối (k≈0.1–0.2); co dọc ≈ 0.0002×L${L ? ' → với ' + len.raw + ' ≈ ' + hi(Math.round(0.0002 * L * 10) / 10 + 'mm') : ''}; kerf 1.5–3mm/đường plasma.${sub('🧮 8 calculator: ' + lk('luongdu/', 'Lượng dư → Tính lượng dư'))}`));
    s.push(step(++n, `<b>Cộng tổng vào phôi:</b> blank = kích thước hoàn thiện + Σ co rút + kerf + dư gia công; ghi rõ trên phiếu cắt.`));
    s.push(step(++n, `<b>Sau khi hàn xong đo lại thực tế</b> để hiệu chỉnh hệ số k cho lô sau — mỗi xưởng/quy trình co khác nhau.`));
    return { title: 'Cắt phôi cần để dư bao nhiêu?', body: s.join('') };
  }

  function planFitup() {
    let s = [], n = 0;
    s.push(step(++n, `<b>Lấy chuẩn từ WPS/bản vẽ:</b> khe hở chân, góc vát, root face — fit-up phải nằm trong dải WPS + dung sai AWS Fig 7.3 (khe hở ±2mm, góc +10/−5°, root face ±2mm).${sub('📐 Module riêng đầy đủ: ' + lk('fitup/', 'QC Fit-up'))}`));
    s.push(step(++n, `<b>Đo 5 thông số bằng calculator:</b> khe hở fillet (≤5mm, >2mm phải tăng cạnh hàn), lệch mép hi-lo (≤ min 10%t; 3mm), kích thước rãnh, mặt áp ≤2mm, biến thiên khe hở hàn máy ≤3mm — mỗi mục có hình cách đo + Đạt/Không đạt.${sub('🧮 ' + lk('fitup/', 'QC Fit-up → tab Kiểm tra'))}`));
    s.push(step(++n, `<b>Hàn đính (tack):</b> thợ có chứng chỉ, đủ size, không nứt — tack nứt mài bỏ trước khi hàn chính.`));
    s.push(step(++n, `<b>Làm sạch rãnh:</b> 25mm hai bên sạch dầu/gỉ/sơn/ẩm.`));
    s.push(step(++n, `<b>Khe hở quá lớn?</b> Đắp sửa (buttering) chỉ khi ≤ min(2×t, 20mm); KHÔNG nhét que/thanh thép — xem cách xử lý đúng từng lỗi.${sub('🔧 ' + lk('fitup/', 'QC Fit-up → Xử lý lỗi'))}`));
    s.push(step(++n, `<b>Ghi biên bản fit-up</b> (mối quan trọng/EXC3-4) + lưu Nhật ký QC rồi mới thả hàn.${sub('🖨 In biên bản: ' + lk('fitup/', 'QC Fit-up → Checklist'))}`));
    return { title: 'Kiểm tra gá lắp (fit-up) trước khi hàn', body: s.join('') };
  }

  function planPacking() {
    let s = [], n = 0;
    s.push(step(++n, `<b>Chỉ đóng hàng ĐÃ nghiệm thu:</b> QC đủ các khâu, NCR đóng, sơn khô đủ ngày theo PDS; touch-up trầy xước TRƯỚC khi bọc.${sub('🪜 Quy trình đủ 9 bước: ' + lk('packing/', 'Kiểm tra Packing → Quy trình'))}`));
    s.push(step(++n, `<b>Đối chiếu packing list:</b> đếm từng piece mark; phụ kiện rời đóng thùng riêng kèm danh mục trong + ngoài.`));
    s.push(step(++n, `<b>Bảo vệ trước khi đóng:</b> ren bôi mỡ + bịt đầu, mặt bích ốp che, bọc VCI chống ẩm; hàng xuất khẩu — gỗ kê phải có ${hi('dấu IPPC (ISPM 15)')} kẻo bị giữ tại cảng.`));
    s.push(step(++n, `<b>Tem nhãn 2 mặt đối diện</b> đủ nội dung bắt buộc + ký hiệu ISO 780; kiện ≥1 tấn vẽ thêm CoG + điểm móc cẩu đúng vị trí thật.${sub('🏷️ Bảng nội dung + 8 ký hiệu vẽ sẵn: ' + lk('packing/', 'tab Tem nhãn'))}`));
    s.push(step(++n, `<b>Sắp xếp:</b> nặng dưới – CoG giữa – dunnage thẳng hàng – chèn kín khe hở (hàng xê dịch là nguyên nhân hỏng số 1).${sub('📐 Hình minh họa: ' + lk('packing/', 'tab Sắp xếp'))}`));
    s.push(step(++n, `<b>Lashing đúng kiểu:</b> top-over (ma sát, α≥75°) / loop theo cặp / direct cho hàng nặng có tai chằng — dây có nhãn LC/STF, nẹp góc mọi cạnh sắc, siết lại sau 50–100km đầu.${sub('🔗 4 hình minh họa + quy tắc: ' + lk('packing/', 'tab Lashing'))}`));
    s.push(step(++n, `<b>Chụp ảnh hồ sơ 5 giai đoạn</b> (kiện → từng lớp → lashing → container trống → seal) — lưu trong ${lk('packing/', 'tab 📷 Ảnh hàng')}; đây là bằng chứng bảo hiểm duy nhất.`));
    s.push(step(++n, `<b>Chốt:</b> tick ${lk('packing/', 'Checklist 21 mục')} → 🖨 in Biên bản nghiệm thu packing ký 3 bên + ghi số seal.`));
    return { title: 'Quy trình kiểm tra packing / đóng hàng xuất', body: s.join('') };
  }

  function planRecords() {
    let s = [], n = 0;
    s.push(step(++n, `<b>Vật tư:</b> MTC 3.1 + biên bản nghiệm thu đầu vào (in từ ${lk('vattu/', 'checklist Vật tư')}).`));
    s.push(step(++n, `<b>Hàn:</b> WPS + WPQR, chứng chỉ thợ hàn, bản đồ mối hàn (weld map), báo cáo VT/NDT, biên bản xử lý NCR.`));
    s.push(step(++n, `<b>Kích thước:</b> báo cáo đo (dimensional report) — giá trị đo, giới hạn, kết luận, người đo, kèm trích dẫn điều khoản (nút 📋 Copy trích dẫn trong ${lk('dungsai/', 'Dung sai')}).`));
    s.push(step(++n, `<b>Bu lông:</b> CoC bộ bu lông + km, chứng chỉ cờ lê, biên bản xiết theo liên kết.`));
    s.push(step(++n, `<b>Sơn:</b> nhật ký sơn hằng ngày (điều kiện, batch, WFT), báo cáo DFT, bám dính nếu có.`));
    s.push(step(++n, `<b>Cách làm nhanh bằng app:</b> mỗi module tick checklist → 🖨 In/PDF là có biểu mẫu chữ ký; lỗi → NCR nháp 1 chạm; ảnh hiện trường lưu trong Đo ảnh.`));
    return { title: 'Hồ sơ nghiệm thu cần những gì', body: s.join('') };
  }

  /* ============================ ROUTER ============================ */
  const SPECIALS = [
    { re: /packing|dong (hang|kien|goi|container)|lashing|chang buoc|xuat hang|tem nhan|shipping mark|len cont|dong cont/, fn: () => planPacking() },
    { re: /thao ra.*(dung lai|xai lai|su dung)|dung lai bu long|tai su dung bu long|bu long cu/, fn: () => planReuseBolt() },
    { re: /troi (mua|am|noi)|do am.*(son|cao)|(\d{2,3})\s*%.*son|son.*duoc khong|dew|diem suong/, fn: q => planEnvPaint(q) },
    { re: /gia nhiet|preheat|han.*(troi lanh|mua dong)|nhiet do.*(han|truoc khi han)/, fn: () => planPreheat() },
    { re: /\bndt\b|\but\b|sieu am|tu tinh|tham thau|chup phim|x.?quang|\brt\b|\bmt\b|\bpt\b|bao nhieu (%|phan tram)/, fn: () => planNDT() },
    { re: /chon wps|wps nao|quy trinh han nao|dung wps/, fn: () => planWpsPick() },
    { re: /co rut|cat (phoi|blank)|luong du|phoi.*dai bao nhieu|de du bao nhieu/, fn: (q, len) => planShrink(len) },
    { re: /fit.?up|ga lap|khe ho chan|truoc khi han can|lech mep/, fn: () => planFitup() },
    { re: /ho so|giay to|tai lieu (gi|nao)|bao cao gi|nghiem thu can/, fn: () => planRecords() }
  ];

  window.QCAssistant = {
    isQuestion,
    EXAMPLES: [
      'Giàn 50m kiểm tra như thế nào?',
      'Trời ẩm 90% có sơn được không?',
      'EXC2 phải UT bao nhiêu %?',
      'Bu lông tháo ra dùng lại được không?',
      'Mối hàn bị rỗ khí xử lý sao?',
      'Cắt phôi dầm 12m để dư bao nhiêu?',
      'Chọn WPS nào cho thép S355 dày 20mm?',
      'Đóng hàng xuất cần kiểm tra gì?',
      'Lashing hàng lên container thế nào?',
      'Hồ sơ nghiệm thu cần giấy tờ gì?'
    ],
    answer(q) {
      if (!isQuestion(q)) return null;
      const qn = norm(q);
      const len = parseLen(q);
      const dia = parseM(q);
      let plan = null;
      /* 1) vấn đề đặc thù trước */
      const sp = SPECIALS.find(s => s.re.test(qn));
      if (sp) plan = sp.fn(q, len);
      /* 2) lỗi / sai hỏng */
      if (!plan && /loi |bi (nut|ro|cong|venh|chay|phong|bong|thung)|defect|khac phuc|nguyen nhan|sai hong|xu ly/.test(qn)) plan = planDefect();
      /* 3) theo đối tượng */
      if (!plan) {
        const { ent, entVi } = detect(qn);
        if (ent === 'truss' || ent === 'beam' || ent === 'column') plan = planStructure(entVi, len);
        else if (ent === 'weld') plan = planWeld();
        else if (ent === 'paint') plan = planPaint();
        else if (ent === 'bolt') plan = planBolt(dia);
        else if (ent === 'material') plan = planMaterial();
        else plan = planStructure('cấu kiện', len);
      }
      if (!plan) return null;
      return `<div style="background:#fff;border:1px solid #dfe5ec;border-left:4px solid #0c447c;border-radius:14px;padding:16px 18px;margin-bottom:14px;box-shadow:0 1px 2px rgba(18,30,48,.06),0 8px 28px rgba(18,30,48,.08)">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap">
          <span style="font-size:20px">🤖</span>
          <b style="font-size:15.5px;color:#0c447c">${esc(plan.title)}</b>
          <span style="margin-left:auto;font-size:10.5px;font-weight:800;background:#e6f0fb;color:#0c447c;padding:3px 8px;border-radius:6px">TRỢ LÝ QC · OFFLINE</span>
        </div>
        ${plan.body}
        <div style="font-size:11px;color:#8b97a3;margin-top:10px;border-top:1px solid #eef1f5;padding-top:8px">⚠ Hướng dẫn tự động từ dữ liệu đã xác minh trong app — luôn đối chiếu spec hợp đồng dự án. Giá trị chính thức + trích dẫn điều khoản nằm trong từng module.</div>
      </div>`;
    },

    /* Tầng 2 — AI qua API (tùy chọn, key người dùng tự nhập, lưu riêng máy) */
    async askClaude(q, ctxText, key) {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1200,
          system: 'Bạn là trợ lý QC kết cấu thép của DaiDung. Trả lời bằng tiếng Việt, TẬN TÌNH theo bước đánh số (làm gì, dụng cụ gì, ghi chép gì), nêu tiêu chuẩn áp dụng (EN 1090-2, ISO 5817:2023, AWS D1.1, ISO 19840, AISC/RCSC...) và nhắc đối chiếu module tương ứng trong app (Dung sai, QC Hàn, QC Sơn, QC Bu lông, Vật tư, Lượng dư, WPS). Không bịa số liệu tiêu chuẩn; nếu không chắc hãy nói rõ.',
          messages: [{ role: 'user', content: 'Câu hỏi: ' + q + (ctxText ? '\n\nDữ liệu liên quan trong app:\n' + ctxText : '') }]
        })
      });
      if (!res.ok) throw new Error('API ' + res.status + (res.status === 401 ? ' — API key sai/hết hạn' : ''));
      const j = await res.json();
      return (j.content || []).map(c => c.text || '').join('\n');
    }
  };
})();
