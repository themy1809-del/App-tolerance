/* Tư vấn thông minh — module độc lập.
   Inject 1 nút floating + modal vào trang dung sai.
   Phân tích prompt VI/EN → suy luận filter + ranking các tiêu chí khớp. */
(function(){

/* ===== Dictionary VI/EN — chuẩn hoá về key chuẩn ===== */
const norm = s => String(s||'').toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g,'')
  .replace(/đ/g,'d').replace(/Đ/g,'d')
  .replace(/[^\w\s\.\/\-]/g,' ').replace(/\s+/g,' ').trim();

const TERMS = {
  /* Loại cấu kiện (element) */
  element: {
    'column':   ['cot','cot thep','cot hop','cot tron','column','columns','box column','pillar','tru'],
    'beam':     ['dam','xa ho','xa go','xa','rafter','beam','beams','girder','girders','i beam','h beam'],
    'truss':    ['vi keo','dan','dan vi keo','truss','trusses','lattice','dan thep','dan mai'],
    'plate':    ['tam','tam thep','plate','plates','sheet','tam day'],
    'tube':     ['ong','ong thep','ong vuong','ong tron','tube','tubular','pipe','hollow section','rhs','shs','chs'],
    'angle':    ['thep goc','goc','angle'],
    'channel':  ['thep u','u','channel','c shape'],
    'frame':    ['khung','khung thep','frame','khung portal','portal'],
    'connection':['lien ket','moi noi','noi','connection','joint','splice','bu long','bolted','welded joint'],
    'baseplate':['ban de','base plate','baseplate','footing','base'],
    'roof':     ['mai','mai ton','hệ mai','roof','roofing'],
    'floor':    ['san','san deck','deck','floor','flooring'],
    'wall':     ['vach','tuong','wall','panel'],
    'stair':    ['cau thang','stair','staircase'],
    'rail':     ['lan can','rail','railing','handrail'],
    'crane':    ['cau truc','dam crane','crane','runway'],
    'tank':     ['bon','silo','tank','vessel','bồn'],
    'cladding': ['cladding','vach ngoai','panel ngoai'],
    'purlin':   ['xa go phu','purlin']
  },
  /* Đặc trưng (feature) — kiểu sai lệch */
  feature: {
    'straightness':['thang','do thang','straightness','plumb','plumbness','straight','plumbness','plumb out','nghieng','lech'],
    'flatness':    ['phang','do phang','flatness','flat','planarity'],
    'squareness':  ['vuong','do vuong','squareness','square','perpendicularity'],
    'twist':       ['xoan','venh','twist','warp','warping','vẹo'],
    'parallelism': ['song song','parallel','parallelism'],
    'length':      ['chieu dai','dai','length','overall length'],
    'height':      ['chieu cao','cao','height','elevation'],
    'width':       ['chieu rong','rong','width','breadth'],
    'thickness':   ['chieu day','day','thickness'],
    'diameter':    ['duong kinh','dia','diameter','od','id'],
    'position':    ['vi tri','position','location','offset'],
    'gap':         ['khe','khe ho','khoang cach','gap','clearance','rootgap'],
    'fit':         ['lap rap','assembly','fit up','fit-up','khop'],
    'alignment':   ['can chinh','alignment','align','co tim','lech tim','misalignment'],
    'undercut':    ['chay chan','undercut'],
    'reinforcement':['loi mat','reinforcement','lồi','convexity','overlap'],
    'porosity':    ['ro khi','porosity','rỗ'],
    'crack':       ['nut','crack','cracking','fissure'],
    'concavity':   ['lom','concavity','lõm']
  },
  /* Tiêu chuẩn */
  standard: {
    'EN 1090-2:2018+A1:2024': ['en','en 1090','en1090','chau au','europe','european','eu','en-1090'],
    'ISO 13920:2023':         ['iso 13920','iso13920','iso','iso13920:2023'],
    'AWS D1.1/D1.1M:2020':    ['aws','aws d1.1','d1.1','d11','aws d1 1','american welding'],
    'AISC 303-16':            ['aisc','aisc 303','american institute steel'],
    'JASS6 (1996/2007/2018)':['jass','jass6','jass 6','nhat','japan','japanese'],
    'MBMA Common Industry Practices (2012/2018)':['mbma','metal building','pre-engineered']
  },
  /* Class / cấp */
  class: {
    'Class 1': ['class 1','c1','cấp 1','functional class 1','cap 1'],
    'Class 2': ['class 2','c2','cấp 2','functional class 2','cap 2'],
    'Essential': ['essential','thiet yeu','thiết yếu','co ban','basic']
  }
};

/* ===== Phân tích prompt → trích các entity ===== */
function parsePrompt(text){
  const n = norm(text);
  const tokens = n.split(/\s+/);
  const found = { element:null, feature:null, standard:null, class:null,
                  thickness:null, value:null, q:[] };

  /* Element / feature / standard / class */
  for (const cat of ['element','feature','standard','class']){
    for (const [key, syns] of Object.entries(TERMS[cat])){
      for (const syn of syns){
        if (n.includes(syn)){ found[cat] = key; break; }
      }
      if (found[cat]) break;
    }
  }

  /* Số kèm "mm" hoặc đứng riêng → coi là measured value hoặc thickness */
  const mmMatch = n.match(/(\d+(?:\.\d+)?)\s*mm/);
  if (mmMatch) found.thickness = parseFloat(mmMatch[1]);
  const numMatch = [...n.matchAll(/\b(\d+(?:\.\d+)?)\b/g)].map(m=>parseFloat(m[1]));
  if (numMatch.length){ found.value = numMatch[numMatch.length-1]; if (!found.thickness && numMatch.length>=2) found.thickness = numMatch[0]; }

  /* Free-text tokens */
  found.q = tokens.filter(t=>t.length>2);

  return found;
}

/* ===== Score 1 tolerance rule với entity đã trích ===== */
function scoreRule(rule, parsed){
  let s = 0;
  const txt = norm(JSON.stringify(rule));
  if (parsed.element && (norm(rule.element||'').includes(norm(parsed.element)) || txt.includes(parsed.element))) s += 3;
  if (parsed.feature && (rule.feature===parsed.feature || txt.includes(parsed.feature))) s += 3;
  if (parsed.standard && rule.standard===parsed.standard) s += 2;
  /* Free text matching */
  for (const q of (parsed.q||[])){
    if (q.length<3) continue;
    if (txt.includes(q)) s += 1;
  }
  return s;
}

/* ===== Run search ===== */
function runSmart(text){
  const parsed = parsePrompt(text);
  const DB = window.APP_DATA;
  if (!DB) return { parsed, matches:[], err:'Chưa tải xong dữ liệu' };
  const rules = DB.tolerances||[];
  const scored = rules.map(r => ({ r, s: scoreRule(r, parsed) }))
                       .filter(x => x.s > 0)
                       .sort((a,b) => b.s - a.s)
                       .slice(0, 20);
  return { parsed, matches: scored };
}

/* ===== Tạo lời khuyên ngắn từ kết quả ===== */
function advise(parsed, matches){
  const lines = [];
  if (matches.length === 0){
    lines.push('Tôi chưa hiểu rõ câu hỏi. Thử mô tả: <b>loại cấu kiện</b> (cột, dầm, tấm…), <b>đặc trưng</b> (độ thẳng, vênh, vuông…), <b>tiêu chuẩn</b> (EN/ISO/AWS).');
    return lines.join('<br>');
  }
  const top = matches[0].r;
  const tx = o => (o && (o.vi||o.en)) || '';
  lines.push(`<b>Tôi nghĩ bạn đang hỏi về:</b> ${tx(top.title)} — theo ${top.standard}.`);
  if (parsed.element) lines.push(`Cấu kiện: <b>${parsed.element}</b>${parsed.thickness?` · chiều dày <b>${parsed.thickness} mm</b>`:''}`);
  if (parsed.feature) lines.push(`Đặc trưng: <b>${parsed.feature}</b>`);
  if (top.permitted){
    const p = top.permitted;
    let perm = '';
    if (p.kind==='FORMULA') perm = `±${p.expression} ${p.unit||''}`;
    else if (p.kind==='FIXED') perm = `±${p.expression} ${p.unit||''}`;
    else if (p.kind==='TABLE') perm = `bảng theo ${p.bandVar}`;
    else perm = p.expression||'tham chiếu định tính';
    lines.push(`Dung sai cho phép: <b style="color:#185fa5">${perm}</b>`);
  }
  if (parsed.value && top.permitted && top.permitted.kind==='FORMULA' && parsed.thickness){
    /* Try simple eval for common h variable */
    try {
      const expr = top.permitted.expression
        .replace(/\bh\b/g, parsed.thickness)
        .replace(/\bb\b/g, parsed.thickness)
        .replace(/\bL\b/g, parsed.thickness);
      const limit = Function(`return (${expr})`)();
      if (!isNaN(limit)){
        const status = Math.abs(parsed.value) <= limit ? 'ĐẠT' : 'KHÔNG ĐẠT';
        const color = status==='ĐẠT'?'#0f6e56':'#aa4322';
        lines.push(`Giá trị đo <b>${parsed.value} mm</b> · giới hạn ±<b>${limit.toFixed(2)}</b> mm → <b style="color:${color}">${status}</b>`);
      }
    } catch(e){}
  }
  if (top.clause){ lines.push(`<small style="color:#5f6b7a">Tham chiếu: ${top.clause.number||''}${top.clause.page?` · trang ${top.clause.page}`:''}</small>`); }
  return lines.join('<br>');
}

/* ===== Inject UI ===== */
function injectUI(){
  const css = `
  #smartBtn{position:fixed;bottom:24px;right:24px;z-index:80;background:linear-gradient(135deg,#7f77dd,#534ab7);color:#fff;border:0;border-radius:50px;padding:14px 22px;font-weight:800;font-size:15px;cursor:pointer;box-shadow:0 8px 24px rgba(83,74,183,.4);font-family:inherit;display:flex;align-items:center;gap:8px}
  #smartBtn:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(83,74,183,.5)}
  @media(max-width:680px){ #smartBtn{bottom:80px;padding:12px 18px;font-size:13.5px} #smartBtn .lbl{display:none} }
  #smartOvl{position:fixed;inset:0;z-index:90;background:rgba(15,22,32,.55);display:none;align-items:flex-end;justify-content:center;padding:20px}
  @media(min-width:760px){#smartOvl{align-items:center}}
  #smartOvl.on{display:flex}
  #smartModal{background:#fff;width:100%;max-width:680px;max-height:90vh;overflow:auto;border-radius:18px;padding:0;box-shadow:0 20px 60px rgba(0,0,0,.3)}
  .sm-head{background:linear-gradient(135deg,#7f77dd,#534ab7);color:#fff;padding:16px 18px;display:flex;align-items:center;gap:10px;border-radius:18px 18px 0 0}
  .sm-head h3{margin:0;font-size:17px;font-weight:800;flex:1}
  .sm-head .x{background:rgba(255,255,255,.2);border:0;color:#fff;font-size:20px;padding:5px 12px;border-radius:8px;cursor:pointer;font-family:inherit}
  .sm-body{padding:16px 18px}
  .sm-prompt{width:100%;min-height:80px;padding:12px;border:1.5px solid #cdd6df;border-radius:12px;font-size:15px;font-family:inherit;resize:vertical;background:#fafcfe}
  .sm-prompt:focus{outline:0;border-color:#7f77dd;background:#fff}
  .sm-examples{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 12px}
  .sm-examples .ex{background:#eef1f5;border:0;padding:6px 12px;border-radius:999px;font-size:12px;cursor:pointer;color:#33404e;font-family:inherit}
  .sm-examples .ex:hover{background:#e6f1fb;color:#0c447c}
  .sm-go{width:100%;background:linear-gradient(135deg,#7f77dd,#534ab7);color:#fff;border:0;border-radius:12px;padding:14px;font-size:15px;font-weight:800;cursor:pointer;font-family:inherit}
  .sm-go:active{transform:scale(.99)}
  .sm-result{margin-top:14px}
  .sm-advise{background:#f5f3ff;border:1px solid #cecbf6;border-radius:12px;padding:14px;font-size:14px;line-height:1.6;color:#26215c}
  .sm-list{margin-top:12px;display:flex;flex-direction:column;gap:8px}
  .sm-item{background:#fff;border:1px solid #dfe5ec;border-radius:10px;padding:10px 12px;cursor:pointer;transition:.12s;display:flex;justify-content:space-between;align-items:flex-start;gap:8px}
  .sm-item:hover{border-color:#7f77dd;background:#fafcfe}
  .sm-item .ttl{font-weight:700;font-size:13.5px;color:#1b2430;margin-bottom:2px}
  .sm-item .meta{font-size:11.5px;color:#5f6b7a}
  .sm-item .score{font-size:11px;font-weight:800;color:#534ab7;background:#eeedfe;padding:2px 8px;border-radius:6px;white-space:nowrap}
  .sm-parsed{margin-top:8px;font-size:11.5px;color:#5f6b7a;background:#fafcfe;border-radius:8px;padding:6px 10px}
  .sm-parsed b{color:#534ab7}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* Button */
  const btn = document.createElement('button');
  btn.id = 'smartBtn';
  btn.innerHTML = '🪄 <span class="lbl">Tư vấn thông minh</span>';
  btn.title = 'Tư vấn thông minh';
  document.body.appendChild(btn);

  /* Modal */
  const ovl = document.createElement('div');
  ovl.id = 'smartOvl';
  ovl.innerHTML = `
    <div id="smartModal">
      <div class="sm-head">
        <h3>🪄 Tư vấn thông minh</h3>
        <button class="x" type="button" onclick="this.closest('#smartOvl').classList.remove('on')">✕</button>
      </div>
      <div class="sm-body">
        <textarea class="sm-prompt" id="smPrompt" placeholder="Hỏi tôi bằng tiếng Việt, ví dụ:
• Cột thép hộp EN 1090, dung sai độ thẳng?
• Dầm I dày 12mm bị vênh 3mm có đạt không?
• Tấm 20mm, độ phẳng theo ISO 13920?"></textarea>
        <div class="sm-examples">
          <button class="ex" type="button">Cột thép độ thẳng EN 1090</button>
          <button class="ex" type="button">Tấm 20mm phẳng ISO</button>
          <button class="ex" type="button">Dầm vuông AISC</button>
          <button class="ex" type="button">Khe hở mối hàn fillet</button>
          <button class="ex" type="button">Dầm dài 6m sai lệch ±3mm</button>
        </div>
        <button class="sm-go" id="smGo">🔍 Tư vấn</button>
        <div class="sm-result" id="smResult"></div>
      </div>
    </div>
  `;
  document.body.appendChild(ovl);
  ovl.addEventListener('click', e => { if (e.target===ovl) ovl.classList.remove('on'); });

  /* Handlers */
  btn.addEventListener('click', () => {
    ovl.classList.add('on');
    setTimeout(()=>document.getElementById('smPrompt').focus(), 50);
  });
  ovl.querySelectorAll('.sm-examples .ex').forEach(b => {
    b.addEventListener('click', () => {
      document.getElementById('smPrompt').value = b.textContent;
      go();
    });
  });
  document.getElementById('smGo').addEventListener('click', go);
  document.getElementById('smPrompt').addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'Enter'){ go(); }
  });

  function go(){
    const text = document.getElementById('smPrompt').value.trim();
    if (!text) return;
    const out = document.getElementById('smResult');
    const r = runSmart(text);
    if (r.err){ out.innerHTML = `<div style="color:#aa4322">${r.err}</div>`; return; }
    let html = `<div class="sm-advise">${advise(r.parsed, r.matches)}</div>`;
    /* parsed entities */
    const ents = [];
    if (r.parsed.element) ents.push(`element=<b>${r.parsed.element}</b>`);
    if (r.parsed.feature) ents.push(`feature=<b>${r.parsed.feature}</b>`);
    if (r.parsed.standard) ents.push(`code=<b>${r.parsed.standard}</b>`);
    if (r.parsed.thickness) ents.push(`dày=<b>${r.parsed.thickness}mm</b>`);
    if (r.parsed.value) ents.push(`đo=<b>${r.parsed.value}</b>`);
    if (ents.length) html += `<div class="sm-parsed">📋 ${ents.join(' · ')}</div>`;
    /* list */
    if (r.matches.length){
      html += `<div class="sm-list">`;
      r.matches.slice(0,8).forEach(({r:rule, s}) => {
        const tx = o => (o && (o.vi||o.en)) || '—';
        html += `<div class="sm-item" data-id="${rule.id||''}">
          <div style="flex:1;min-width:0">
            <div class="ttl">${tx(rule.title)}</div>
            <div class="meta">${rule.standard} · ${rule.element||''} · ${tx(rule.acceptance).slice(0,80)}</div>
          </div>
          <div class="score">★ ${s}</div>
        </div>`;
      });
      html += `</div>`;
    }
    out.innerHTML = html;
    /* click result → navigate to that rule */
    out.querySelectorAll('.sm-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        if (typeof selectedId !== 'undefined' && typeof render === 'function'){
          try {
            const rule = (window.APP_DATA.tolerances||[]).find(r => r.id===id);
            if (rule){
              if (typeof F !== 'undefined') { F.std = rule.standard; }
              window.selectedId = id;
              window.browseAll = true;
              render();
              ovl.classList.remove('on');
              if (window.innerWidth < 980) document.body.classList.add('detail-open');
            }
          } catch(e){ console.error(e); }
        }
      });
    });
  }
}

/* Đợi DOM + APP_DATA sẵn sàng rồi inject */
if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', injectUI);
} else {
  injectUI();
}

})();
