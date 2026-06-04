/* Cổng mật khẩu — chạy TRƯỚC khi load app.
   LƯU Ý: kiểm tra phía client, KHÔNG phải bảo mật thật.
   Mã nguồn có thể đọc được — chỉ ngăn truy cập tình cờ.        */
(function(){
  const PW = '1234';
  const KEY = 'wps_auth_v1';
  if (sessionStorage.getItem(KEY) === 'ok' || localStorage.getItem(KEY) === 'ok') return;

  // Build overlay
  const css = `
  .gate-ovl{position:fixed;inset:0;z-index:9999;background:linear-gradient(160deg,#0c447c,#082d54);
    display:flex;align-items:center;justify-content:center;padding:20px;color:#fff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif}
  .gate-card{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);backdrop-filter:blur(10px);
    border-radius:18px;padding:28px 26px;max-width:360px;width:100%;text-align:center}
  .gate-em{font-size:48px;line-height:1;margin-bottom:10px}
  .gate-h{font-size:18px;font-weight:800;margin:0 0 4px}
  .gate-s{font-size:13px;opacity:.8;margin:0 0 18px}
  .gate-card input{width:100%;padding:14px 16px;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.1);
    color:#fff;border-radius:12px;font-size:22px;font-weight:700;text-align:center;letter-spacing:8px;font-family:inherit;
    -webkit-text-security:disc;outline:none}
  .gate-card input:focus{border-color:#fff;background:rgba(255,255,255,.18)}
  .gate-card input::placeholder{color:rgba(255,255,255,.4);letter-spacing:2px;font-weight:400;font-size:14px}
  .gate-btn{width:100%;margin-top:12px;padding:13px;background:#fff;color:#0c447c;border:0;border-radius:12px;
    font-size:15px;font-weight:800;cursor:pointer;font-family:inherit}
  .gate-btn:active{transform:scale(.98)}
  .gate-err{margin-top:10px;font-size:12.5px;color:#ffb8b8;min-height:18px}
  .gate-rem{display:flex;align-items:center;justify-content:center;gap:6px;margin-top:14px;font-size:12.5px;opacity:.85;cursor:pointer}
  .gate-rem input{width:auto;padding:0;-webkit-text-security:none;font-size:14px;letter-spacing:0;text-align:left;background:transparent;border:0}
  .gate-back{position:fixed;top:14px;left:14px;color:#fff;padding:6px 12px;border-radius:8px;background:rgba(255,255,255,.12);text-decoration:none;font-size:13px;font-weight:600}
  body.gated{overflow:hidden}
  body.gated > *:not(.gate-ovl):not(.gate-back){filter:blur(8px);pointer-events:none;user-select:none}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  document.body.classList.add('gated');

  const ovl = document.createElement('div');
  ovl.className = 'gate-ovl';
  ovl.innerHTML = `
    <a class="gate-back" href="../">← Trang chủ</a>
    <div class="gate-card">
      <div class="gate-em">🔒</div>
      <h2 class="gate-h">Thư viện WPS</h2>
      <p class="gate-s">Khu vực nội bộ — nhập mật khẩu để vào</p>
      <input id="gatePw" type="password" inputmode="numeric" placeholder="••••" maxlength="20" autocomplete="off">
      <button class="gate-btn" id="gateOk">Mở khoá</button>
      <div class="gate-err" id="gateErr"></div>
      <label class="gate-rem"><input type="checkbox" id="gateRem"> Nhớ máy này (không hỏi lại)</label>
    </div>
  `;
  document.body.appendChild(ovl);

  const inp = document.getElementById('gatePw');
  const err = document.getElementById('gateErr');
  const rem = document.getElementById('gateRem');
  inp.focus();

  function submit(){
    if (inp.value === PW){
      (rem.checked ? localStorage : sessionStorage).setItem(KEY, 'ok');
      ovl.remove();
      document.body.classList.remove('gated');
    } else {
      err.textContent = 'Sai mật khẩu, thử lại.';
      inp.value = ''; inp.focus();
      setTimeout(()=>err.textContent='', 1800);
    }
  }
  document.getElementById('gateOk').addEventListener('click', submit);
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
})();
