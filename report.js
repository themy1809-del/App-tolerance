/* ============================================================================
   QC REPORT — in báo cáo checklist dạng biểu mẫu công ty (dùng chung mọi module)
   Cách dùng:
     QCReport.print({
       module: 'QC Hàn', color: '#7c2d12',
       title: 'BÁO CÁO CHECKLIST QC HÀN',
       groups: [{ name: 'TRƯỚC KHI HÀN', items: [{ ok:true, text:'...', ref:'AWS...' }] }]
     })
   Mở cửa sổ in của trình duyệt → người dùng chọn "Save as PDF" hoặc in giấy.
   ============================================================================ */
(function () {
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  window.QCReport = {
    print: function (o) {
      var color = o.color || '#0c447c';
      var today = new Date();
      var dateStr = today.toLocaleDateString('vi-VN') + ' ' + today.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
      var done = 0, total = 0;
      (o.groups || []).forEach(function (g) { g.items.forEach(function (it) { total++; if (it.ok) done++; }); });

      var rows = (o.groups || []).map(function (g) {
        return '<tr class="grp"><td colspan="3">' + esc(g.name) + '</td></tr>' +
          g.items.map(function (it, i) {
            return '<tr><td class="ck">' + (it.ok ? '☑' : '☐') + '</td><td>' + esc(it.text) + '</td><td class="rf">' + esc(it.ref || '') + '</td></tr>';
          }).join('');
      }).join('');

      var html = '<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>' + esc(o.title || 'Báo cáo QC') + '</title><style>' +
        '@page{size:A4;margin:14mm}' +
        'body{font-family:"Segoe UI",Arial,sans-serif;color:#1b2430;font-size:12.5px;line-height:1.5;margin:0}' +
        '.head{display:flex;align-items:center;gap:12px;border-bottom:3px solid ' + color + ';padding-bottom:10px;margin-bottom:14px}' +
        '.logo{width:46px;height:46px;border-radius:10px;background:' + color + ';color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:17px;flex:none}' +
        '.co{font-size:13px;font-weight:800}.co small{display:block;font-weight:400;color:#5f6b7a;font-size:10.5px}' +
        '.tt{margin-left:auto;text-align:right}.tt h1{margin:0;font-size:16px;color:' + color + '}.tt .sub{font-size:10.5px;color:#5f6b7a}' +
        '.meta{width:100%;border-collapse:collapse;margin-bottom:12px;font-size:12px}' +
        '.meta td{border:1px solid #cdd6df;padding:6px 9px}.meta .k{background:#f1f4f8;font-weight:700;width:130px;white-space:nowrap}' +
        'table.body{width:100%;border-collapse:collapse;font-size:12px}' +
        'table.body td{border:1px solid #cdd6df;padding:6px 8px;vertical-align:top}' +
        'tr.grp td{background:' + color + ';color:#fff;font-weight:800;letter-spacing:.4px;font-size:11.5px}' +
        'td.ck{width:26px;text-align:center;font-size:15px}td.rf{width:200px;font-size:10.5px;color:#445;font-weight:600}' +
        '.sum{margin:10px 0 14px;font-size:12.5px;font-weight:700}' +
        '.sig{display:flex;gap:14px;margin-top:26px;page-break-inside:avoid}' +
        '.sig div{flex:1;text-align:center;font-size:11.5px;font-weight:700}' +
        '.sig .ln{margin-top:58px;border-top:1px dotted #8b97a3;padding-top:5px;font-weight:400;color:#5f6b7a;font-size:10.5px}' +
        '.note{margin-top:12px;font-size:10px;color:#8b97a3}' +
        '@media print{.noprint{display:none}}' +
        '.noprint{position:fixed;top:10px;right:10px;padding:10px 18px;background:' + color + ';color:#fff;border:0;border-radius:9px;font-weight:800;cursor:pointer;font-size:13px}' +
        '</style></head><body>' +
        '<button class="noprint" onclick="window.print()">🖨 In / Lưu PDF</button>' +
        '<div class="head"><div class="logo">DD</div>' +
        '<div class="co">DAIDUNG METALLIC MANUFACTURE<br>CONSTRUCTION &amp; TRADE CORPORATION<small>QC Suite — ' + esc(o.module || '') + '</small></div>' +
        '<div class="tt"><h1>' + esc(o.title || 'BÁO CÁO QC') + '</h1><div class="sub">' + esc(dateStr) + '</div></div></div>' +
        '<table class="meta"><tr><td class="k">Dự án / Project</td><td></td><td class="k">Mã cấu kiện / Item</td><td></td></tr>' +
        '<tr><td class="k">Vị trí / Location</td><td></td><td class="k">Bản vẽ / Drawing</td><td></td></tr></table>' +
        '<div class="sum">Kết quả: ' + done + '/' + total + ' mục đạt' + (done === total && total > 0 ? ' — HOÀN THÀNH ✓' : '') + '</div>' +
        '<table class="body">' + rows + '</table>' +
        '<div class="sig"><div>NGƯỜI KIỂM TRA<div class="ln">Ký, ghi rõ họ tên</div></div>' +
        '<div>QC TRƯỞNG<div class="ln">Ký, ghi rõ họ tên</div></div>' +
        '<div>KHÁCH HÀNG / TVGS<div class="ln">Ký, ghi rõ họ tên</div></div></div>' +
        '<div class="note">Báo cáo tạo tự động từ DaiDung QC Suite — ' + esc(dateStr) + '. Tham chiếu tiêu chuẩn ghi tại từng mục.</div>' +
        '</body></html>';

      var w = window.open('', '_blank');
      if (!w) { alert('Trình duyệt chặn pop-up — cho phép pop-up để in báo cáo.'); return; }
      w.document.write(html);
      w.document.close();
      w.focus();
      setTimeout(function () { try { w.print(); } catch (e) {} }, 400);
    }
  };
})();
