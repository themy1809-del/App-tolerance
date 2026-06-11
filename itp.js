/* ============================================================================
   QC ITP — QUY TRÌNH KIỂM SOÁT CHẤT LƯỢNG (Inspection & Test Plan) dùng chung
   Cách dùng:  QCITP.mount(containerEl, ITP_DATA.han, { color:'#7c2d12' })
   Điểm kiểm soát:
     H = Hold      — DỪNG, phải nghiệm thu đạt mới được làm tiếp
     W = Witness   — mời chứng kiến (báo trước), vắng mặt vẫn được làm tiếp
     R = Review    — kiểm tra hồ sơ/tài liệu
     S = Surveillance — giám sát xác suất trong quá trình
   ============================================================================ */
(function () {
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var PT = {
    H: { name: 'HOLD', vi: 'Dừng chờ nghiệm thu', bg: '#fbeae2', fg: '#aa4322' },
    W: { name: 'WITNESS', vi: 'Mời chứng kiến', bg: '#fdf3e2', fg: '#8a5a00' },
    R: { name: 'REVIEW', vi: 'Kiểm hồ sơ', bg: '#e6f0fb', fg: '#0c447c' },
    S: { name: 'SURV.', vi: 'Giám sát xác suất', bg: '#e3f6ee', fg: '#0f6e56' }
  };
  function badge(p) {
    var t = PT[p] || PT.S;
    return '<span style="display:inline-block;font-size:10px;font-weight:800;padding:3px 8px;border-radius:6px;background:' + t.bg + ';color:' + t.fg + ';letter-spacing:.3px;white-space:nowrap">' + p + ' · ' + t.name + '</span>';
  }

  window.QCITP = {
    mount: function (el, data, opts) {
      if (!el || !data) return;
      var color = (opts && opts.color) || '#0c447c';
      var html =
        '<div style="background:#fff;border:1px solid #e4e9f0;border-radius:14px;padding:14px 16px;margin-bottom:12px">' +
        '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px">' +
        '<b style="font-size:15px;color:' + color + '">' + esc(data.title) + '</b>' +
        '<button type="button" id="itpPrint" style="margin-left:auto;padding:8px 14px;border:0;border-radius:9px;background:' + color + ';color:#fff;font-weight:700;font-size:12.5px;cursor:pointer;font-family:inherit">🖨 In ITP</button></div>' +
        '<div style="font-size:12px;color:#5d6b7c">' + esc(data.scope || '') + '</div>' +
        '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:9px">' +
        Object.keys(PT).map(function (k) { return badge(k) + '<span style="font-size:11px;color:#5d6b7c;margin-right:8px;align-self:center">' + PT[k].vi + '</span>'; }).join('') +
        '</div></div>';

      html += data.stages.map(function (st, i) {
        return '<div style="background:#fff;border:1px solid #e4e9f0;border-radius:14px;margin-bottom:10px;overflow:hidden">' +
          '<div style="display:flex;align-items:center;gap:10px;padding:11px 14px;background:#f7f9fc;border-bottom:1px solid #eef1f5">' +
          '<div style="width:26px;height:26px;border-radius:50%;background:' + color + ';color:#fff;font-weight:800;font-size:12px;display:flex;align-items:center;justify-content:center;flex:none">' + (i + 1) + '</div>' +
          '<b style="font-size:14px;flex:1">' + esc(st.act) + '</b>' + badge(st.point) + '</div>' +
          '<div style="padding:10px 14px;display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px 14px;font-size:12.5px">' +
          '<div><span style="color:#8b97a7;font-weight:700;font-size:10.5px;text-transform:uppercase;letter-spacing:.4px;display:block">Căn cứ</span>' + esc(st.doc) + '</div>' +
          '<div><span style="color:#8b97a7;font-weight:700;font-size:10.5px;text-transform:uppercase;letter-spacing:.4px;display:block">Thực hiện</span>' + esc(st.resp) + '</div>' +
          '<div><span style="color:#8b97a7;font-weight:700;font-size:10.5px;text-transform:uppercase;letter-spacing:.4px;display:block">Kiểm tra / nghiệm thu</span>' + esc(st.check) + '</div>' +
          '<div><span style="color:#8b97a7;font-weight:700;font-size:10.5px;text-transform:uppercase;letter-spacing:.4px;display:block">Hồ sơ đầu ra</span>' + esc(st.record) + '</div>' +
          '</div>' +
          (st.tool ? '<div style="padding:0 14px 11px;font-size:12px"><a href="' + st.tool.url + '" style="color:' + color + ';font-weight:700;text-decoration:underline dotted">🧰 ' + esc(st.tool.label) + '</a></div>' : '') +
          '</div>';
      }).join('');

      html += '<div style="background:#fdf3e2;border:1px solid #f0d9a8;border-left:4px solid #8a5a00;padding:10px 12px;font-size:12px;color:#6b4700;border-radius:10px">' +
        '⚠ ITP mẫu nội bộ — phân loại điểm H/W và bên chứng kiến (khách hàng/TVGS/đăng kiểm) phải chốt theo HỢP ĐỒNG từng dự án trước khi sản xuất. Khách hàng có quyền nâng W thành H.</div>';

      el.innerHTML = html;
      var btn = el.querySelector('#itpPrint');
      if (btn) btn.onclick = function () {
        if (!window.QCReport) return alert('Thiếu report.js');
        QCReport.print({
          module: data.module || '', color: color,
          title: 'ITP — ' + (data.title || 'QUY TRÌNH KIỂM SOÁT CHẤT LƯỢNG'),
          groups: [{
            name: 'CÁC ĐIỂM KIỂM SOÁT (H=Hold · W=Witness · R=Review · S=Surveillance)',
            items: data.stages.map(function (st, i) {
              return { ok: false, text: (i + 1) + '. [' + st.point + '] ' + st.act + ' — Thực hiện: ' + st.resp + ' · Kiểm: ' + st.check + ' · Hồ sơ: ' + st.record, ref: st.doc };
            })
          }]
        });
      };
    }
  };
})();
