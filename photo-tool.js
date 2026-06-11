/* ============================================================================
   PHOTO TOOL — công cụ đo khuyết tật trên ảnh, DÙNG CHUNG cho các module QC.
   Cách dùng:  PhotoTool.mount(containerEl, { key: 'son_photos_v1' })
   - key: tên kho IndexedDB riêng của module (hồ sơ không lẫn nhau)
   - Màu tự ăn theo CSS var --brand / --line / --muted của từng module.
   Lưu ý hiển thị trong UI: đo trên ảnh chỉ THAM KHẢO (sai số góc chụp);
   nghiệm thu chính thức đo bằng dụng cụ.
   ============================================================================ */
(function () {
  function db(key) {
    return new Promise(function (res, rej) {
      var rq = indexedDB.open(key, 1);
      rq.onupgradeneeded = function () { rq.result.createObjectStore('recs', { keyPath: 'id', autoIncrement: true }); };
      rq.onsuccess = function () { res(rq.result); };
      rq.onerror = function () { rej(rq.error); };
    });
  }
  function dbAdd(key, rec) { return db(key).then(function (d) { return new Promise(function (res, rej) { var tx = d.transaction('recs', 'readwrite'); tx.objectStore('recs').add(rec); tx.oncomplete = res; tx.onerror = function () { rej(tx.error); }; }); }); }
  function dbAll(key) { return db(key).then(function (d) { return new Promise(function (res, rej) { var rq = d.transaction('recs').objectStore('recs').getAll(); rq.onsuccess = function () { res(rq.result || []); }; rq.onerror = function () { rej(rq.error); }; }); }); }
  function dbDel(key, id) { return db(key).then(function (d) { return new Promise(function (res, rej) { var tx = d.transaction('recs', 'readwrite'); tx.objectStore('recs').delete(id); tx.oncomplete = res; tx.onerror = function () { rej(tx.error); }; }); }); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  window.PhotoTool = {
    mount: function (el, opts) {
      if (!el || el.dataset.ptInit) return;
      el.dataset.ptInit = '1';
      var KEY = (opts && opts.key) || 'qc_photos_v1';
      var st = { img: null, scale: 0, mode: null, pts: [], cal: null, measures: [] };
      var uid = 'pt' + Math.random().toString(36).slice(2, 7);

      el.innerHTML =
        '<div style="background:#fdf3e2;border:1px solid #f0d9a8;border-left:4px solid #8a5a00;border-radius:10px;padding:10px 12px;font-size:12.5px;color:#6b4700;margin-bottom:10px">⚠ Đo trên ảnh chỉ THAM KHẢO (sai số góc chụp/phối cảnh). Nghiệm thu chính thức đo bằng dụng cụ. Chụp vuông góc, đặt thước/dưỡng cùng mặt phẳng với đối tượng đo.</div>' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">' +
        '<label style="cursor:pointer;padding:10px 14px;border-radius:10px;background:var(--brand,#0c447c);color:#fff;font-weight:700;font-size:13px">📁 Chọn / chụp ảnh<input type="file" id="' + uid + 'File" accept="image/*" capture="environment" style="display:none"></label>' +
        '<button type="button" id="' + uid + 'Cal" style="padding:10px 14px;border:1px solid var(--line,#ddd);border-radius:10px;background:#fff;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit">🎯 Hiệu chuẩn</button>' +
        '<button type="button" id="' + uid + 'Mea" style="padding:10px 14px;border:1px solid var(--line,#ddd);border-radius:10px;background:#fff;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit">📏 Đo</button>' +
        '<button type="button" id="' + uid + 'Clr" style="padding:10px 14px;border:1px solid var(--line,#ddd);border-radius:10px;background:#fff;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit">↺ Xóa đo</button>' +
        '</div>' +
        '<div id="' + uid + 'St" style="font-size:13px;font-weight:700;color:var(--brand,#0c447c);min-height:20px">Bước 1: chọn ảnh có kèm vật chuẩn (thước/dưỡng).</div>' +
        '<canvas id="' + uid + 'Cv" style="width:100%;max-width:760px;display:none;border:1px solid var(--line,#ddd);border-radius:10px;margin-top:10px;cursor:crosshair;touch-action:none"></canvas>' +
        '<div id="' + uid + 'Ls" style="margin-top:8px;font-size:13px"></div>' +
        '<div id="' + uid + 'Sv" style="display:none;margin-top:10px;border-top:1px solid var(--line,#ddd);padding-top:10px">' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">' +
        '<input type="text" id="' + uid + 'Pj" placeholder="Dự án / mã cấu kiện" style="flex:1;min-width:140px;padding:9px 10px;border:1px solid var(--line,#ddd);border-radius:8px;font-size:13px;font-family:inherit">' +
        '<input type="text" id="' + uid + 'Nt" placeholder="Ghi chú (loại lỗi, vị trí...)" style="flex:2;min-width:160px;padding:9px 10px;border:1px solid var(--line,#ddd);border-radius:8px;font-size:13px;font-family:inherit">' +
        '<button type="button" id="' + uid + 'SvBtn" style="padding:9px 14px;border:0;border-radius:8px;background:var(--brand,#0c447c);color:#fff;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit">💾 Lưu</button>' +
        '<button type="button" id="' + uid + 'Ex" style="padding:9px 14px;border:1px solid var(--line,#ddd);border-radius:8px;background:#fff;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit">⬇ Tải ảnh</button>' +
        '</div></div>' +
        '<div style="font-weight:800;color:var(--brand,#0c447c);margin:14px 0 8px;font-size:14px">🗂 Hồ sơ đã lưu (máy này)</div>' +
        '<div id="' + uid + 'Gl" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px"></div>';

      var cv = document.getElementById(uid + 'Cv'), cx = cv.getContext('2d');
      var msg = function (t) { document.getElementById(uid + 'St').textContent = t; };

      function draw() {
        if (!st.img) return;
        cx.clearRect(0, 0, cv.width, cv.height);
        cx.drawImage(st.img, 0, 0, cv.width, cv.height);
        var line = function (a, b, col) {
          cx.strokeStyle = col; cx.lineWidth = 3; cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke();
          [a, b].forEach(function (p) { cx.fillStyle = col; cx.beginPath(); cx.arc(p.x, p.y, 5, 0, 7); cx.fill(); });
        };
        var tag = function (a, b, txt, col) {
          var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
          cx.font = 'bold 16px Arial';
          var tw = cx.measureText(txt).width;
          cx.fillStyle = '#fff'; cx.fillRect(mx - tw / 2 - 5, my - 24, tw + 10, 21);
          cx.strokeStyle = col; cx.lineWidth = 1; cx.strokeRect(mx - tw / 2 - 5, my - 24, tw + 10, 21);
          cx.fillStyle = col; cx.fillText(txt, mx - tw / 2, my - 8);
        };
        if (st.cal) { line(st.cal.a, st.cal.b, '#0f6e56'); tag(st.cal.a, st.cal.b, st.cal.mm + 'mm (chuẩn)', '#0f6e56'); }
        st.measures.forEach(function (m, i) { line(m.a, m.b, '#c0241c'); tag(m.a, m.b, (i + 1) + ': ' + m.mm.toFixed(2) + 'mm', '#c0241c'); });
        st.pts.forEach(function (p) { cx.fillStyle = '#e8b04b'; cx.beginPath(); cx.arc(p.x, p.y, 6, 0, 7); cx.fill(); });
      }
      function list() {
        document.getElementById(uid + 'Ls').innerHTML = st.measures.length
          ? '<b>Kết quả:</b> ' + st.measures.map(function (m, i) { return '#' + (i + 1) + ' = <b style="color:#c0241c">' + m.mm.toFixed(2) + ' mm</b>'; }).join(' · ')
          : '';
      }
      function gallery() {
        dbAll(KEY).then(function (recs) {
          var g = document.getElementById(uid + 'Gl'); if (!g) return;
          g.innerHTML = recs.length ? recs.sort(function (a, b) { return b.ts - a.ts; }).map(function (r) {
            return '<div style="border:1px solid var(--line,#ddd);border-radius:10px;overflow:hidden;background:#fff">' +
              '<img src="' + r.img + '" style="width:100%;display:block;aspect-ratio:4/3;object-fit:cover">' +
              '<div style="padding:7px 9px;font-size:11.5px"><b>' + esc(r.proj || '(chưa ghi)') + '</b><br>' +
              new Date(r.ts).toLocaleDateString('vi-VN') + ' · ' + ((r.mms || []).map(function (m) { return m + 'mm'; }).join(', ') || '—') + '<br>' + esc(r.note || '') +
              '<div style="display:flex;gap:8px;margin-top:5px">' +
              '<a href="' + r.img + '" download="hoso-' + r.id + '.jpg" style="color:var(--brand,#0c447c);font-weight:700;text-decoration:none">⬇ Tải</a>' +
              '<button type="button" data-del="' + r.id + '" style="color:#c0241c;font-weight:700;font-size:11.5px;border:0;background:none;cursor:pointer;font-family:inherit">✕ Xóa</button>' +
              '</div></div></div>';
          }).join('') : '<div style="font-size:12.5px;color:var(--muted,#777)">Chưa có hồ sơ nào.</div>';
          g.querySelectorAll('[data-del]').forEach(function (b) {
            b.onclick = function () { dbDel(KEY, +b.dataset.del).then(gallery); };
          });
        }).catch(function () {});
      }

      document.getElementById(uid + 'File').addEventListener('change', function (e) {
        var f = e.target.files[0]; if (!f) return;
        var img = new Image();
        img.onload = function () {
          st.img = img; st.scale = 0; st.cal = null; st.measures = []; st.pts = []; st.mode = null;
          var sc = Math.min(1, 1280 / img.width);
          cv.width = Math.round(img.width * sc); cv.height = Math.round(img.height * sc);
          cv.style.display = 'block';
          document.getElementById(uid + 'Sv').style.display = 'block';
          draw(); list();
          msg('Bước 2: bấm 🎯 Hiệu chuẩn rồi bấm 2 đầu vật chuẩn.');
          URL.revokeObjectURL(img.src);
        };
        img.src = URL.createObjectURL(f);
      });
      document.getElementById(uid + 'Cal').onclick = function () {
        if (!st.img) return msg('Chọn ảnh trước.');
        st.mode = 'cal'; st.pts = []; msg('Bấm 2 ĐẦU MÚT của vật chuẩn trên ảnh.');
      };
      document.getElementById(uid + 'Mea').onclick = function () {
        if (!st.img) return msg('Chọn ảnh trước.');
        if (!st.scale) return msg('Phải hiệu chuẩn trước khi đo.');
        st.mode = 'm'; st.pts = []; msg('Bấm 2 điểm cần đo.');
      };
      document.getElementById(uid + 'Clr').onclick = function () { st.measures = []; st.pts = []; st.mode = null; draw(); list(); };
      cv.addEventListener('pointerdown', function (ev) {
        if (!st.mode || !st.img) return;
        var r = cv.getBoundingClientRect();
        st.pts.push({ x: (ev.clientX - r.left) * cv.width / r.width, y: (ev.clientY - r.top) * cv.height / r.height });
        draw();
        if (st.pts.length < 2) return;
        var a = st.pts[0], b = st.pts[1], px = Math.hypot(b.x - a.x, b.y - a.y);
        if (st.mode === 'cal') {
          var mm = parseFloat(prompt('Khoảng cách thật giữa 2 điểm (mm):', '10'));
          if (mm > 0 && px > 2) { st.scale = mm / px; st.cal = { a: a, b: b, mm: mm }; msg('Đã hiệu chuẩn: ' + st.scale.toFixed(4) + ' mm/px — bấm 📏 Đo.'); }
          else msg('Hiệu chuẩn không hợp lệ — thử lại.');
          st.mode = null;
        } else {
          var v = px * st.scale;
          st.measures.push({ a: a, b: b, mm: v });
          msg('Kết quả: ' + v.toFixed(2) + ' mm — đo tiếp hoặc 💾 Lưu.');
        }
        st.pts = []; draw(); list();
      });
      document.getElementById(uid + 'SvBtn').onclick = function () {
        if (!st.img) return;
        dbAdd(KEY, {
          ts: Date.now(),
          proj: document.getElementById(uid + 'Pj').value || '',
          note: document.getElementById(uid + 'Nt').value || '',
          mms: st.measures.map(function (m) { return Math.round(m.mm * 100) / 100; }),
          img: cv.toDataURL('image/jpeg', 0.72)
        }).then(function () { msg('✓ Đã lưu hồ sơ vào máy.'); gallery(); })
          .catch(function (e) { msg('Lỗi lưu: ' + e); });
      };
      document.getElementById(uid + 'Ex').onclick = function () {
        var aEl = document.createElement('a');
        aEl.download = 'do-anh-' + Date.now() + '.jpg';
        aEl.href = cv.toDataURL('image/jpeg', 0.85); aEl.click();
      };
      gallery();
    }
  };
})();
