/* ============================================================================
   QC LOG — NHẬT KÝ KIỂM TRA dùng chung (IndexedDB, lưu trên máy)
   API:
     QCLog.add({module, project, item, result:'PASS'|'FAIL', detail, note})
     QCLog.all() -> Promise<entries[]>
     QCLog.del(id) / QCLog.clear()
     QCLog.saveButton(module, item, pass, detail) -> HTML nút "Lưu vào nhật ký"
       (gắn onclick qua window.qclogSaveFromBtn)
   ============================================================================ */
(function () {
  var KEY = 'qc_log_v1';
  function db() {
    return new Promise(function (res, rej) {
      var rq = indexedDB.open(KEY, 1);
      rq.onupgradeneeded = function () { rq.result.createObjectStore('recs', { keyPath: 'id', autoIncrement: true }); };
      rq.onsuccess = function () { res(rq.result); };
      rq.onerror = function () { rej(rq.error); };
    });
  }
  window.QCLog = {
    add: function (e) {
      e.ts = e.ts || Date.now();
      return db().then(function (d) {
        return new Promise(function (res, rej) {
          var tx = d.transaction('recs', 'readwrite');
          tx.objectStore('recs').add(e);
          tx.oncomplete = res; tx.onerror = function () { rej(tx.error); };
        });
      });
    },
    all: function () {
      return db().then(function (d) {
        return new Promise(function (res, rej) {
          var rq = d.transaction('recs').objectStore('recs').getAll();
          rq.onsuccess = function () { res(rq.result || []); };
          rq.onerror = function () { rej(rq.error); };
        });
      });
    },
    del: function (id) {
      return db().then(function (d) {
        return new Promise(function (res, rej) {
          var tx = d.transaction('recs', 'readwrite');
          tx.objectStore('recs').delete(id);
          tx.oncomplete = res; tx.onerror = function () { rej(tx.error); };
        });
      });
    },
    clear: function () {
      return db().then(function (d) {
        return new Promise(function (res, rej) {
          var tx = d.transaction('recs', 'readwrite');
          tx.objectStore('recs').clear();
          tx.oncomplete = res; tx.onerror = function () { rej(tx.error); };
        });
      });
    },
    /* nút gắn dưới verdict calculator */
    saveButton: function (module, item, pass, detail) {
      var payload = btoa(unescape(encodeURIComponent(JSON.stringify({ module: module, item: item, result: pass ? 'PASS' : 'FAIL', detail: detail || '' }))));
      return '<button type="button" onclick="qclogSaveFromBtn(this)" data-p="' + payload + '" ' +
        'style="display:block;width:100%;margin-top:8px;padding:10px;border:1px dashed #9aa7b3;border-radius:10px;background:#fff;color:#33404e;font-weight:700;font-size:12.5px;cursor:pointer;font-family:inherit">💾 Lưu kết quả vào Nhật ký QC</button>';
    }
  };
  window.qclogSaveFromBtn = function (btn) {
    try {
      var e = JSON.parse(decodeURIComponent(escape(atob(btn.dataset.p))));
      var proj = prompt('Mã dự án / cấu kiện (để truy xuất sau):', localStorage.getItem('qclog_last_proj') || '');
      if (proj === null) return;
      localStorage.setItem('qclog_last_proj', proj);
      e.project = proj;
      window.QCLog.add(e).then(function () {
        btn.textContent = '✓ Đã lưu vào Nhật ký QC';
        btn.style.borderColor = '#0f6e56'; btn.style.color = '#0f6e56';
      });
    } catch (err) { alert('Lỗi lưu: ' + err); }
  };
})();
