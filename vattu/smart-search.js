/* Tư vấn thông minh cho app vật tư — module độc lập */
(function(){

const norm = s => String(s||'').toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g,'')
  .replace(/đ/g,'d').replace(/Đ/g,'d')
  .replace(/[^\w\s\.\/\-]/g,' ').replace(/\s+/g,' ').trim();

/* Dictionary VI/EN cho ngữ cảnh vật tư đầu vào */
const TERMS = {
  cat: {
    'plate_tol':   ['tam','plate','tam thep','tam day','plate thickness','plate flat'],
    'section_tol': ['thep hinh','i beam','h beam','section','i shape','h shape','ipe','hea','heb'],
    'tube_tol':    ['ong','hss','hop','tube','pipe','ong vuong','ong tron','hollow'],
    'spec':        ['spec','vat lieu','grade','mac','material','chemistry','co tinh','tensile','yield'],
    'cert':        ['mtc','cert','chung tu','chung chi','en 10204','mill cert','heat no'],
    'surface':     ['be mat','gi','rust','surface','sa','blast','sandblast','sa 2','sa 3'],
    'ndt':         ['ut','ndt','sieu am','x quang','rt','non destructive','ultrasonic','radiograph']
  },
  std: {
    'EN 10029':   ['en 10029','tam dung sai','plate tolerance'],
    'EN 10034':   ['en 10034','i beam tolerance','h beam tolerance','i h tolerance'],
    'EN 10056':   ['en 10056','angle','thep goc'],
    'EN 10210-2': ['en 10210','hot finished','nong'],
    'EN 10219-2': ['en 10219','cold formed','nguoi'],
    'EN 10025-2': ['en 10025','s235','s275','s355','s460'],
    'EN 10204':   ['en 10204','cert','mtc','chung tu'],
    'EN 10164':   ['en 10164','z quality','z25','lamellar'],
    'EN 10163':   ['en 10163','surface class'],
    'ASTM A6':    ['astm a6','a6','general rolled'],
    'ASTM A36':   ['a36','astm a36'],
    'ASTM A572':  ['a572','572','hsla'],
    'ASTM A992':  ['a992','992','wide flange','w shape'],
    'ASTM A500':  ['a500','hss','square tube astm'],
    'ASTM A516':  ['a516','sa516','tank plate','bồn'],
    'JIS G3101':  ['ss400','g3101','jis ss400'],
    'JIS G3106':  ['sm400','sm490','g3106'],
    'JIS G3136':  ['sn400','sn490','g3136','seismic'],
    'JIS G3444':  ['stk','g3444','jis tube'],
    'GB/T 1591':  ['q345','q355','q460','gb 1591'],
    'ISO 8501-1': ['iso 8501','rust grade','blast cleaning','sa 2 5']
  },
  element: {
    'plate':  ['tam','plate','tam thep'],
    'beam':   ['dam','i beam','h beam','beam','ipe','hea','heb'],
    'tube':   ['ong','hss','hop','tube','square','rectangular'],
    'angle':  ['thep goc','goc','angle','l shape'],
    'pipe':   ['ong tron','pipe','round tube'],
    'cert':   ['chung tu','mtc','cert'],
    'surface':['be mat','surface','rust','gi']
  }
};

function parsePrompt(text){
  const n = norm(text);
  const found = { cat:null, std:null, element:null, thickness:null, q:[] };
  for (const c of ['cat','std','element']){
    for (const [key, syns] of Object.entries(TERMS[c])){
      for (const syn of syns){
        if (n.includes(syn)){ found[c] = key; break; }
      }
      if (found[c]) break;
    }
  }
  const mm = n.match(/(\d+(?:\.\d+)?)\s*mm/);
  if (mm) found.thickness = parseFloat(mm[1]);
  found.q = n.split(/\s+/).filter(t => t.length > 2);
  return found;
}

function scoreItem(item, p){
  let s = 0;
  const txt = norm(JSON.stringify(item));
  if (p.cat && item.cat === p.cat) s += 3;
  if (p.std && item.std === p.std) s += 3;
  if (p.element && norm(item.element||'').includes(p.element)) s += 2;
  if (p.thickness){
    // try parse thickness range from spec values
    for (const sp of (item.spec||[])){
      const lbl = norm(sp.label||'');
      const m = lbl.match(/(\d+(?:\.\d+)?)\s*[≤<]\s*t\s*[≤<]\s*(\d+(?:\.\d+)?)/);
      if (m && p.thickness >= parseFloat(m[1]) && p.thickness <= parseFloat(m[2])) { s += 2; break; }
    }
  }
  for (const q of p.q){
    if (q.length<3) continue;
    if (txt.includes(q)) s += 1;
  }
  return s;
}

function advise(parsed, matches){
  const lines = [];
  if (!matches.length){
    lines.push('Tôi chưa hiểu rõ. Thử mô tả: <b>loại vật tư</b> (tấm, thép hình, ống), <b>tiêu chuẩn</b> (EN 10025, ASTM A36…), <b>chiều dày</b>.');
    return lines.join('<br>');
  }
  const top = matches[0].x;
  lines.push(`<b>Tôi nghĩ bạn đang hỏi về:</b> ${top.title_vi} — theo ${top.std}.`);
  if (parsed.thickness) lines.push(`Chiều dày: <b>${parsed.thickness} mm</b>`);
  if (top.spec && top.spec.length){
    lines.push(`Dung sai cho phép: <b style="color:#3b6d11">${top.spec[0].value}</b>${top.spec.length>1?` (và ${top.spec.length-1} mức khác)`:''}`);
  }
  if (top.clause) lines.push(`<small style="color:#5f6b7a">Tham chiếu: ${top.clause}</small>`);
  return lines.join('<br>');
}

function runSmart(text){
  const parsed = parsePrompt(text);
  const DB = window.VT_DATA;
  if (!DB) return { parsed, matches: [], err: 'Chưa load dữ liệu' };
  const scored = DB.items.map(x => ({ x, s: scoreItem(x, parsed) }))
    .filter(o => o.s > 0)
    .sort((a,b) => b.s - a.s)
    .slice(0, 15);
  return { parsed, matches: scored };
}

function injectUI(){
  const css = `
  #vtSmartBtn{position:fixed;bottom:24px;right:24px;z-index:80;background:linear-gradient(135deg,#3b6d11,#27500a);color:#fff;border:0;border-radius:50px;padding:14px 22px;font-weight:800;font-size:15px;cursor:pointer;box-shadow:0 8px 24px rgba(39,80,10,.4);font-family:inherit;display:flex;align-items:center;gap:8px}
  #vtSmartBtn:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(39,80,10,.5)}
  @media(max-width:680px){#vtSmartBtn{bottom:24px;padding:12px 18px;font-size:13.5px} #vtSmartBtn .lbl{display:none}}
  #vtSmartOvl{position:fixed;inset:0;z-index:90;background:rgba(15,22,32,.55);display:none;align-items:flex-end;justify-content:center;padding:20px}
  @media(min-width:760px){#vtSmartOvl{align-items:center}}
  #vtSmartOvl.on{display:flex}
  #vtSmartModal{background:#fff;width:100%;max-width:680px;max-height:90vh;overflow:auto;border-radius:18px}
  .vsm-head{background:linear-gradient(135deg,#3b6d11,#27500a);color:#fff;padding:16px 18px;display:flex;align-items:center;gap:10px;border-radius:18px 18px 0 0}
  .vsm-head h3{margin:0;font-size:17px;font-weight:800;flex:1}
  .vsm-head .x{background:rgba(255,255,255,.2);border:0;color:#fff;font-size:20px;padding:5px 12px;border-radius:8px;cursor:pointer;font-family:inherit}
  .vsm-body{padding:16px 18px}
  .vsm-prompt{width:100%;min-height:80px;padding:12px;border:1.5px solid #cdd6df;border-radius:12px;font-size:15px;font-family:inherit;resize:vertical;background:#fafcfe}
  .vsm-prompt:focus{outline:0;border-color:#3b6d11;background:#fff}
  .vsm-examples{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 12px}
  .vsm-examples .ex{background:#eef1f5;border:0;padding:6px 12px;border-radius:999px;font-size:12px;cursor:pointer;color:#33404e;font-family:inherit}
  .vsm-examples .ex:hover{background:#e3f6ee;color:#3b6d11}
  .vsm-go{width:100%;background:linear-gradient(135deg,#3b6d11,#27500a);color:#fff;border:0;border-radius:12px;padding:14px;font-size:15px;font-weight:800;cursor:pointer;font-family:inherit}
  .vsm-advise{background:#f4faf7;border:1px solid #9fe1cb;border-radius:12px;padding:14px;font-size:14px;line-height:1.6;color:#085041;margin-top:14px}
  .vsm-list{margin-top:12px;display:flex;flex-direction:column;gap:8px}
  .vsm-item{background:#fff;border:1px solid #dfe5ec;border-radius:10px;padding:10px 12px;cursor:pointer;display:flex;justify-content:space-between;gap:8px}
  .vsm-item:hover{border-color:#3b6d11;background:#f4faf7}
  .vsm-item .ttl{font-weight:700;font-size:13.5px;color:#1b2430}
  .vsm-item .meta{font-size:11.5px;color:#5f6b7a}
  .vsm-item .score{font-size:11px;font-weight:800;color:#3b6d11;background:#e3f6ee;padding:2px 8px;border-radius:6px}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const btn = document.createElement('button');
  btn.id = 'vtSmartBtn';
  btn.innerHTML = '🪄 <span class="lbl">Tư vấn vật tư</span>';
  document.body.appendChild(btn);

  const ovl = document.createElement('div');
  ovl.id = 'vtSmartOvl';
  ovl.innerHTML = `
    <div id="vtSmartModal">
      <div class="vsm-head">
        <h3>🪄 Tư vấn nhập vật tư</h3>
        <button class="x" type="button">✕</button>
      </div>
      <div class="vsm-body">
        <textarea class="vsm-prompt" id="vtPrompt" placeholder="Ví dụ:
• Tấm S355 dày 15mm — dung sai chiều dày?
• Cert EN 10204 loại nào cho EXC2?
• ASTM A572 — yêu cầu mặt phẳng?
• Rust cấp C có thi công được không?"></textarea>
        <div class="vsm-examples">
          <button class="ex" type="button">Tấm S355 dày 20mm</button>
          <button class="ex" type="button">A992 spec hoá học</button>
          <button class="ex" type="button">MTC EN 10204 3.1</button>
          <button class="ex" type="button">Rust grade C bề mặt</button>
          <button class="ex" type="button">HSS A500 dày 6mm</button>
        </div>
        <button class="vsm-go" id="vtGo">🔍 Tư vấn</button>
        <div id="vtResult"></div>
      </div>
    </div>
  `;
  document.body.appendChild(ovl);

  btn.addEventListener('click', () => {
    ovl.classList.add('on');
    setTimeout(() => document.getElementById('vtPrompt').focus(), 50);
  });
  ovl.querySelector('.x').addEventListener('click', () => ovl.classList.remove('on'));
  ovl.addEventListener('click', e => { if (e.target === ovl) ovl.classList.remove('on'); });
  ovl.querySelectorAll('.vsm-examples .ex').forEach(b => {
    b.addEventListener('click', () => {
      document.getElementById('vtPrompt').value = b.textContent;
      go();
    });
  });
  document.getElementById('vtGo').addEventListener('click', go);
  document.getElementById('vtPrompt').addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'Enter') go();
  });

  function go(){
    const text = document.getElementById('vtPrompt').value.trim();
    if (!text) return;
    const out = document.getElementById('vtResult');
    const r = runSmart(text);
    if (r.err){ out.innerHTML = `<div style="color:#aa4322;padding:10px">${r.err}</div>`; return; }
    let html = `<div class="vsm-advise">${advise(r.parsed, r.matches)}</div>`;
    if (r.matches.length){
      html += `<div class="vsm-list">`;
      r.matches.slice(0, 8).forEach(({ x, s }) => {
        html += `<div class="vsm-item" data-id="${x.id}">
          <div style="flex:1;min-width:0">
            <div class="ttl">${x.title_vi}</div>
            <div class="meta">${x.std} · ${x.element||''} · ${x.region}</div>
          </div>
          <div class="score">★ ${s}</div>
        </div>`;
      });
      html += `</div>`;
    }
    out.innerHTML = html;
    out.querySelectorAll('.vsm-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        const x = window.VT_DATA.items.find(i => i.id === id);
        if (x && typeof openDetail === 'function'){
          ovl.classList.remove('on');
          openDetail(x);
        }
      });
    });
  }
}

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', injectUI);
} else { injectUI(); }

})();
