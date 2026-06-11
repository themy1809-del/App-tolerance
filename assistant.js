/* ============================================================================
   QC ASSISTANT — trợ lý giải quyết vấn đề ở trang chủ
   Tầng 1 (cục bộ, offline): hiểu câu hỏi → kế hoạch kiểm tra từng bước,
   tính số liệu thật từ dataset đã nạp (ISO 13920, Fp,C...), link đúng module.
   Tầng 2 (tùy chọn): gọi Claude API nếu người dùng đã lưu API key.
   API:  QCAssistant.answer(question)  -> HTML string | null (không phải câu hỏi)
         QCAssistant.askClaude(question, ctxText, key) -> Promise<string>
   ============================================================================ */
(function () {
  const norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[đĐ]/g, 'd').toLowerCase();
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- nhận diện ---------- */
  function parseLen(q) {
    const m = q.match(/(\d+(?:[.,]\d+)?)\s*(mm|cm|m)\b/i);
    if (!m) return null;
    let v = parseFloat(m[1].replace(',', '.'));
    const u = m[2].toLowerCase();
    if (u === 'm') v *= 1000; else if (u === 'cm') v *= 10;
    return { mm: v, raw: m[0] };
  }
  const ENT = [
    { k: 'truss', re: /truss|trust|vi keo|gian( |$)|gian thep|keo thep/, vi: 'giàn / vì kèo' },
    { k: 'beam', re: /dam |dam$|girder|beam|xa go/, vi: 'dầm' },
    { k: 'column', re: /cot |cot$|column/, vi: 'cột' },
    { k: 'weld', re: /moi han|han |han$|weld|undercut|ro khi|ngau/, vi: 'mối hàn' },
    { k: 'paint', re: /son |son$|paint|dft|be mat|sa 2|phun bi|phun cat/, vi: 'sơn phủ' },
    { k: 'bolt', re: /bu long|bulong|bolt|xiet|momen|sieт|siet/, vi: 'bu lông' },
    { k: 'material', re: /vat tu|thep tam|nhap kho|mtc|ton |ban ma/, vi: 'vật tư' }
  ];
  const INT = [
    { k: 'inspect', re: /kiem tra|nghiem thu|inspect|check|lam (the )?nao|nhu the nao|cach (do|kiem)|do (the |nhu the )?nao|quy trinh/ },
    { k: 'tolerance', re: /dung sai|cho phep|tolerance|gioi han|lech bao nhieu/ },
    { k: 'defect', re: /loi |bi (nut|ro|cong|venh|chay|phong|bong)|defect|nut |khac phuc|nguyen nhan|sai hong/ },
    { k: 'torque', re: /xiet|momen|luc (cang|xiet)|turn.of.nut|preload/ }
  ];
  function detect(qn) {
    const ent = ENT.find(e => e.re.test(qn));
    const intent = INT.find(i => i.re.test(qn));
    return { ent: ent ? ent.k : null, entVi: ent ? ent.vi : '', intent: intent ? intent.k : null };
  }
  function isQuestion(q) {
    const qn = norm(q);
    if (q.trim().length < 12) return false;
    return /\?|nhu the nao|lam sao|the nao|cach nao|kiem tra gi|can (kiem tra|do|lam)|quy trinh|huong dan|bao nhieu|cach do|cach kiem|nen dung|chon (phuong phap|cach)/.test(qn)
      || (detect(qn).ent && detect(qn).intent);
  }

  /* ---------- tính số liệu thật từ dataset ---------- */
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

  /* ---------- khối kết quả ---------- */
  const step = (n, html) => `<div style="display:flex;gap:10px;padding:9px 0;border-top:1px solid #eef1f5"><div style="width:24px;height:24px;border-radius:50%;background:#0c447c;color:#fff;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;flex:none">${n}</div><div style="font-size:13.5px;flex:1">${html}</div></div>`;
  const lk = (url, label) => `<a href="${url}" style="color:#0c447c;font-weight:700;text-decoration:underline dotted">${label}</a>`;
  const hi = t => `<b style="background:#fdf3e2;padding:1px 6px;border-radius:5px;color:#6b4700">${t}</b>`;

  /* ---------- playbooks ---------- */
  function planStructure(entVi, len) {
    const L = len ? len.mm : null;
    const iso = L ? iso13920(L) : null;
    let s = [], n = 0;
    s.push(step(++n, `<b>Chuẩn bị:</b> bản vẽ rev mới nhất, xác định class dung sai (EXC / ISO 13920 A–D / Essential–Functional theo hợp đồng), dụng cụ đã hiệu chuẩn. Checklist đầy đủ: ${lk('dungsai/', 'Dung sai → tab Checklist')}.`));
    if (L) {
      s.push(step(++n, `<b>Đo chiều dài tổng ${len.raw}:</b> thước cuộn có chứng chỉ, kéo đủ lực căng. ${iso ? `Dung sai ISO 13920 (dải ${iso.band} mm): class B ${hi('±' + iso.B + 'mm')} · C ${hi('±' + iso.C + 'mm')} · D ${hi('±' + iso.D + 'mm')}.` : ''} Đánh giá Đạt/Không đạt tự động: ${lk('dungsai/', 'mở Tra cứu Dung sai')}.`));
      s.push(step(++n, `<b>Bù nhiệt độ — quan trọng với cấu kiện dài:</b> thép giãn ~12µm/m/°C → với ${len.raw}, chênh 10°C lệch tới ${hi('±' + thermal(L, 10) + 'mm')}. Ghi nhiệt độ lúc đo và quy về 20°C: ${lk('luongdu/', 'calculator Giãn nở nhiệt')}.`));
    } else {
      s.push(step(++n, `<b>Đo kích thước tổng:</b> chiều dài, chiều cao, khoảng cách nút — so dung sai theo class trong ${lk('dungsai/', 'module Dung sai')}.`));
    }
    s.push(step(++n, `<b>Độ thẳng / độ vồng (camber) / độ võng:</b> căng dây hoặc máy thủy bình tại giữa nhịp và các điểm nút, cấu kiện kê tự do không tải. Tra giới hạn (vd cong vênh, camber) trong ${lk('dungsai/', 'Dung sai')} — có hình cách đo từng mục.`));
    s.push(step(++n, `<b>Mối hàn 100% VT:</b> nứt, undercut, rỗ, kích thước fillet theo AWS D1.1 Table 8.1 / ISO 5817 (B/C/D theo EXC) — calculator + hình cách đo: ${lk('han/', 'QC Hàn → Ngoại quan')}. NDT bổ sung theo EXC: ${lk('han/', 'QC Hàn → NDT')}.`));
    s.push(step(++n, `<b>Liên kết bu lông (nếu ${entVi} ghép nối):</b> lực căng + phương pháp xiết theo hệ EN/AISC của hợp đồng: ${lk('bulong/', 'QC Bu lông')}.`));
    s.push(step(++n, `<b>Sơn phủ:</b> DFT theo ISO 19840 (4 điều kiện a–d), ngoại quan lỗi sơn: ${lk('son/', 'QC Sơn → DFT')}.`));
    s.push(step(++n, `<b>Hồ sơ:</b> tick checklist trong từng module → bấm 🖨 In/PDF ra biểu mẫu có chữ ký. Điểm không đạt → tạo NCR nháp 1 chạm trong ${lk('luongdu/', 'Lượng dư & Sai hỏng')}.`));
    return { title: `Kế hoạch kiểm tra ${entVi}${len ? ' dài ' + len.raw : ''}`, body: s.join('') };
  }
  function planWeld(len) {
    let s = [], n = 0;
    s.push(step(++n, `<b>Trước hàn:</b> WPS đúng liên kết (${lk('wps/', 'Thư viện WPS')}), thợ hàn có chứng chỉ, fit-up trong dung sai, que sấy đúng — checklist: ${lk('han/', 'QC Hàn → Checklist')}.`));
    s.push(step(++n, `<b>VT 100% sau khi nguội:</b> nứt (cấm tuyệt đối), undercut, rỗ, biên dạng, size fillet — nhập số đo là ra Đạt/Không đạt: ${lk('han/', 'QC Hàn → Ngoại quan')}.`));
    s.push(step(++n, `<b>Cách đo từng khuyết tật:</b> mỗi tiêu chí có hình vẽ dụng cụ (V-WAC, fillet gauge, cam gauge) + các bước đo trong phần chi tiết.`));
    s.push(step(++n, `<b>Đo trên ảnh:</b> chụp khuyết tật kèm thước → hiệu chuẩn → đo → gửi thẳng vào calculator: ${lk('han/', 'QC Hàn → Đo ảnh')}.`));
    s.push(step(++n, `<b>NDT bổ sung:</b> chờ đủ hold time (8–24h theo Q và chiều dày), phạm vi % theo EXC — bảng đã xác minh: ${lk('han/', 'QC Hàn → NDT')}.`));
    return { title: 'Quy trình kiểm tra mối hàn', body: s.join('') };
  }
  function planPaint() {
    let s = [], n = 0;
    s.push(step(++n, `<b>Trước phun:</b> dầu mỡ (SSPC-SP1), sau phun đạt cấp sạch (thường Sa 2½) + độ nhám replica tape + muối Bresle ≤ giới hạn: ${lk('son/', 'QC Sơn → Bề mặt')}.`));
    s.push(step(++n, `<b>Điều kiện môi trường:</b> Ts ≥ điểm sương +3°C, RH ≤ 85% — nhập 3 số là ra ĐƯỢC/KHÔNG ĐƯỢC sơn: ${lk('son/', 'QC Sơn → Môi trường')}.`));
    s.push(step(++n, `<b>DFT theo ISO 19840:</b> dán toàn bộ số đọc vào ô tính — app kiểm đủ 4 điều kiện (trung bình, 80%, dải 80–100% dưới 20%, max): ${lk('son/', 'QC Sơn → DFT')}.`));
    s.push(step(++n, `<b>Bám dính / holiday</b> nếu spec yêu cầu: cross-cut, pull-off — có hình cách làm: ${lk('son/', 'QC Sơn → Kiểm tra')}.`));
    s.push(step(++n, `<b>Lỗi sơn:</b> tra 16 lỗi kèm nguyên nhân – khắc phục – ảnh thật: ${lk('son/', 'QC Sơn → Lỗi sơn')}.`));
    return { title: 'Quy trình kiểm tra sơn phủ', body: s.join('') };
  }
  function planBolt(len) {
    let s = [], n = 0;
    s.push(step(++n, `<b>Chọn hệ theo hợp đồng:</b> EN 1090-2 (Fp,C + k-class) hay AISC/RCSC (Tb + turn-of-nut) — 2 hệ KHÔNG dùng lẫn: ${lk('bulong/', 'QC Bu lông → Lực xiết')}.`));
    s.push(step(++n, `<b>Tính momen/góc xoay:</b> nhập đường kính + cấp bền (+ km từ CoC nếu hệ EN) là ra momen bước 1/bước 2 hoặc góc xoay.`));
    s.push(step(++n, `<b>Quy tắc cứng:</b> khe hở ≤2mm trước căng, xoay đai ốc, trình tự cứng→mềm, bu lông tháo sau căng phải loại: ${lk('bulong/', 'tab Quy tắc')}.`));
    s.push(step(++n, `<b>Nghiệm thu:</b> ngoại quan 100% (ren nhô ≥1 bước), HRC kiểm 100% chuôi đứt, lấy mẫu theo Annex M: ${lk('bulong/', 'tab Kiểm tra')} + checklist in PDF.`));
    return { title: 'Quy trình xiết & nghiệm thu bu lông', body: s.join('') };
  }
  function planMaterial() {
    let s = [], n = 0;
    s.push(step(++n, `<b>Hồ sơ:</b> MTC EN 10204 3.1, heat number khớp vật tư, cơ tính/hóa học đạt mác: ${lk('vattu/', 'Kiểm tra Vật tư')}.`));
    s.push(step(++n, `<b>Ngoại quan + kích thước:</b> cấp gỉ A/B, chiều dày theo EN 10029 — mỗi vật tư có sketch cách đo đúng vị trí.`));
    s.push(step(++n, `<b>Checklist nghiệm thu đầu vào</b> 16 mục + in biểu mẫu PDF ngay trong trang Vật tư.`));
    return { title: 'Quy trình nghiệm thu vật tư đầu vào', body: s.join('') };
  }
  function planDefect(q, hits) {
    let s = [], n = 0;
    s.push(step(++n, `<b>Nhận diện lỗi:</b> so ảnh thật + triệu chứng trong ${lk('luongdu/', 'Lượng dư & Sai hỏng → tab Sai hỏng')} (45 lỗi, lọc theo mức độ).`));
    s.push(step(++n, `<b>Đo mức độ:</b> đo trực tiếp hoặc ${lk('han/', 'Đo ảnh')} → so giới hạn chấp nhận B/C/D ngay trong từng lỗi.`));
    s.push(step(++n, `<b>Nguyên nhân gốc:</b> mỗi lỗi có phân tích Ishikawa 5M+1E + biện pháp khắc phục cụ thể.`));
    s.push(step(++n, `<b>Không đạt:</b> bấm "Tạo NCR nháp" — biên bản đầy đủ tự sinh, copy dán vào biểu mẫu.`));
    return { title: 'Xử lý lỗi / sai hỏng', body: s.join('') };
  }

  /* ---------- trả lời ---------- */
  window.QCAssistant = {
    isQuestion,
    answer(q) {
      if (!isQuestion(q)) return null;
      const qn = norm(q);
      const { ent, entVi, intent } = detect(qn);
      const len = parseLen(q);
      let plan = null;
      if (intent === 'defect' && ent !== 'paint') plan = planDefect(q);
      else if (ent === 'truss' || ent === 'beam' || ent === 'column') plan = planStructure(entVi, len);
      else if (ent === 'weld') plan = planWeld(len);
      else if (ent === 'paint') plan = planPaint();
      else if (ent === 'bolt' || intent === 'torque') plan = planBolt(len);
      else if (ent === 'material') plan = planMaterial();
      else if (intent) plan = planStructure('cấu kiện', len); /* câu hỏi kiểm tra chung */
      if (!plan) return null;
      return `<div style="background:#fff;border:1px solid #dfe5ec;border-left:4px solid #0c447c;border-radius:14px;padding:16px 18px;margin-bottom:14px;box-shadow:0 1px 2px rgba(18,30,48,.06),0 8px 28px rgba(18,30,48,.08)">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
          <span style="font-size:20px">🤖</span>
          <b style="font-size:15.5px;color:#0c447c">${esc(plan.title)}</b>
          <span style="margin-left:auto;font-size:10.5px;font-weight:800;background:#e6f0fb;color:#0c447c;padding:3px 8px;border-radius:6px">TRỢ LÝ QC · OFFLINE</span>
        </div>
        ${plan.body}
        <div style="font-size:11px;color:#8b97a3;margin-top:10px;border-top:1px solid #eef1f5;padding-top:8px">⚠ Kế hoạch gợi ý tự động từ dữ liệu đã xác minh trong app — luôn đối chiếu spec hợp đồng của dự án. Giá trị chính thức nằm trong từng module (có trích dẫn điều khoản).</div>
      </div>`;
    },

    /* Tầng 2 — Claude API (tùy chọn, cần API key người dùng tự nhập) */
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
          system: 'Bạn là trợ lý QC kết cấu thép của DaiDung. Trả lời NGẮN GỌN bằng tiếng Việt, theo bước đánh số, nêu tiêu chuẩn áp dụng (EN 1090-2, ISO 5817:2023, AWS D1.1, ISO 19840, AISC/RCSC...) và nhắc người dùng đối chiếu module tương ứng trong app (Dung sai, QC Hàn, QC Sơn, QC Bu lông, Vật tư, Lượng dư). Không bịa số liệu tiêu chuẩn; nếu không chắc hãy nói rõ.',
          messages: [{ role: 'user', content: 'Câu hỏi: ' + q + (ctxText ? '\n\nDữ liệu liên quan trong app:\n' + ctxText : '') }]
        })
      });
      if (!res.ok) throw new Error('API ' + res.status + (res.status === 401 ? ' — API key sai/hết hạn' : ''));
      const j = await res.json();
      return (j.content || []).map(c => c.text || '').join('\n');
    }
  };
})();
