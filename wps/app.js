/* WPS Library — main logic (Part 1: state + filtering + rendering + wizard) */
let DB = null;
let LANG = localStorage.getItem('wps_lang') || 'vi';
let Q = '';
let F = { proc:'', proj:'', code:'', pos:'', mat:'', thk:'' };
let FAV = JSON.parse(localStorage.getItem('wps_fav') || '[]');
let REC = JSON.parse(localStorage.getItem('wps_rec') || '[]');
let currentDetailId = null;

const T = {
  vi:{
    title:'Thư Viện WPS', sub:'Welding Procedure Specifications',
    hd:'Tra cứu nhanh WPS đã có', hsub:'Không cần nhớ số WPS — bấm "Tìm theo công việc" hoặc chọn nhóm bên dưới.',
    placeholder:'Tìm WPS… (số, vật liệu, PQR, code…)',
    more:'Bộ lọc nâng cao',
    aWiz:'Tìm theo công việc', aWizD:'Trả lời 4 câu → ra WPS',
    aQr:'In QR cho WPS', aQrD:'Dán lên bản vẽ / phiếu',
    aAll:'Xem toàn bộ',
    lProj:'Dự án', lCode:'Code / Tiêu chuẩn', lPos:'Tư thế', lMat:'Vật liệu cơ bản', lThk:'Chiều dày (mm)',
    all:'— Tất cả —', count:n=>`${n} kết quả`, reset:'Đặt lại bộ lọc',
    empty:'Không tìm thấy WPS phù hợp.',
    bOpen:'Xem PDF', bDl:'Tải về', bShare:'Chép link', bSrc:'NGUỒN / SOURCE', bBack:'Đóng',
    procAll:'Tất cả quy trình',
    lFav:'Yêu thích', lRec:'Mở gần đây', lCat:'Mục lục theo nhóm',
    kv:{rev:'Rev', code:'Code', process:'Quy trình', position:'Tư thế', base_metal:'Vật liệu', material_group:'Nhóm vật liệu',
        thickness:'Chiều dày (mm)', diameter:'Đường kính', filler:'Que/Dây hàn', f_no:'F-No', size:'Cỡ', pqr:'PQR', project:'Dự án', tags:'Thẻ'},
    ftr:'DaiDung Metallic — App Tra cứu Dung sai &amp; WPS',
    missTitle:'⚠ File PDF chưa có trong thư mục files/',
    missBody:n=>`Bỏ file <b>${n}</b> vào <code>webapp/wps/files/</code> rồi tải lại trang.`,
    copyDone:'Đã chép link!',
    wz:{
      title:'Tìm WPS theo công việc',
      step:n=>`Bước ${n} / 5`,
      s1t:'Bạn đang hàn vật liệu gì?', s1s:'Chọn vật liệu chính.',
      s2t:'Hàn với vật liệu nào nữa? (tuỳ chọn)', s2s:'Bỏ qua nếu hàn cùng vật liệu.',
      s3t:'Tư thế hàn?', s3s:'Chọn tư thế gần nhất.',
      s4t:'Kiểu mối hàn?', s4s:'',
      s5t:'Chiều dày (mm)?', s5s:'Nhập chiều dày kết cấu/ống.',
      none:'(Cùng vật liệu / Bỏ qua)',
      next:'Tiếp →', back:'← Quay lại', go:'Tìm WPS',
      done:n=>`Tìm thấy ${n} WPS phù hợp`, none_found:'Không có WPS khớp. Thử nới điều kiện ở Bộ lọc.'
    }
  },
  en:{
    title:'WPS Library', sub:'Welding Procedure Specifications',
    hd:'Quickly look up existing WPS', hsub:'No need to remember WPS numbers — tap "Find by job" or pick a category below.',
    placeholder:'Search WPS…', more:'Advanced filters',
    aWiz:'Find by job', aWizD:'Answer 4 quick questions',
    aQr:'Print QR codes', aQrD:'Stick on drawings / work orders',
    aAll:'Show all',
    lProj:'Project', lCode:'Code / Standard', lPos:'Position', lMat:'Base metal', lThk:'Thickness (mm)',
    all:'— All —', count:n=>`${n} result${n!==1?'s':''}`, reset:'Reset filters',
    empty:'No matching WPS found.',
    bOpen:'View PDF', bDl:'Download', bShare:'Copy link', bSrc:'SOURCE', bBack:'Back',
    procAll:'All processes', lFav:'Favorites', lRec:'Recent', lCat:'Browse by category',
    kv:{rev:'Rev', code:'Code', process:'Process', position:'Position', base_metal:'Base metal', material_group:'Material group',
        thickness:'Thickness (mm)', diameter:'Diameter', filler:'Filler', f_no:'F-No', size:'Size', pqr:'PQR', project:'Project', tags:'Tags'},
    ftr:'DaiDung Metallic — Tolerance &amp; WPS Lookup App',
    missTitle:'⚠ PDF not yet in files/', missBody:n=>`Drop <b>${n}</b> into <code>webapp/wps/files/</code>.`,
    copyDone:'Link copied!',
    wz:{
      title:'Find WPS by job', step:n=>`Step ${n} / 5`,
      s1t:'What are you welding?', s1s:'Pick the main base metal.',
      s2t:'Welding to which other material? (optional)', s2s:'Skip if same as A.',
      s3t:'Welding position?', s3s:'Pick the closest position.',
      s4t:'Joint type?', s4s:'',
      s5t:'Thickness (mm)?', s5s:'Enter thickness.',
      none:'(Same material / Skip)',
      next:'Next →', back:'← Back', go:'Find WPS',
      done:n=>`Found ${n} matching WPS`, none_found:'No match. Try loosening filters.'
    }
  }
};

function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c])); }
function uniq(a){ return Array.from(new Set(a)); }
function normProc(p){
  const s = String(p||'').toUpperCase();
  if (s.includes('+')) return s.replace(/\s/g,'');
  if (s.includes('TIG')) return 'GTAW';
  if (s.includes('GTAW')) return 'GTAW';
  if (s.includes('FCAW')) return 'FCAW';
  if (s.includes('GMAW')) return 'GMAW';
  if (s.includes('SMAW')) return 'SMAW';
  if (s.includes('SAW')) return 'SAW';
  return s.split(' ')[0];
}
function splitPos(p){ if (!p) return []; return String(p).split(/[;,]+/).map(s=>s.trim()).filter(Boolean); }
function shortMat(m){ if (!m) return ''; return m.split(/[→\(]/)[0].trim().split(',')[0].trim(); }
function short(c){ if (!c) return ''; return c.replace(/Structural Welding Code.*/i,'').replace(/Section/i,'§').trim(); }

function getCategories(){
  return [
    {em:'🚰', tt:'Ống 6G / 6GR', ds:LANG==='vi'?'Hàn ống mọi tư thế':'All-position pipe', match:i => /6G/i.test(i.position||'')},
    {em:'✨', tt:'Stainless 304/316', ds:LANG==='vi'?'Inox không gỉ':'Stainless steel', match:i => /A240|TP304|TP316|304|316/i.test(i.base_metal||'')},
    {em:'🔗', tt:LANG==='vi'?'Dissimilar':'Dissimilar metals', ds:LANG==='vi'?'Hàn khác vật liệu':'Different metals', match:i => /→/.test(i.base_metal||'') || (i.tags||[]).includes('dissimilar')},
    {em:'🧱', tt:'S355J2 / EN 10025', ds:'European carbon steel', match:i => /S355|EN 10025/i.test(i.base_metal||'')},
    {em:'🇨🇳', tt:'Q345D / Q355', ds:'GB/T 1591 / 8183', match:i => /Q3[45]5|GB\/T 1591|GB\/T 8183/i.test(i.base_metal||'')},
    {em:'🇺🇸', tt:'A572 Gr.50', ds:'ASTM A572', match:i => /A572/i.test(i.base_metal||'')},
    {em:'🏗️', tt:'A992', ds:'Wide-flange shapes', match:i => /A992/i.test(i.base_metal||'')},
    {em:'🛢️', tt:'A53 / A106 / A500', ds:LANG==='vi'?'Ống thép thông dụng':'Common pipe', match:i => /A53|A106|A500/i.test(i.base_metal||'')},
    {em:'📄', tt:'SS400 / A36', ds:LANG==='vi'?'Thép cán nóng thông dụng':'Common mild steel', match:i => /SS400|A36/i.test(i.base_metal||'')},
    {em:'🛢️', tt:'SA516 Gr.70', ds:LANG==='vi'?'Bồn áp lực':'Pressure vessel', match:i => /SA516/i.test(i.base_metal||'')},
    {em:'⚡', tt:'Combo', ds:LANG==='vi'?'Hai quy trình':'Two processes', match:i => /\+/.test(i.process||'')},
    {em:'🥧', tt:LANG==='vi'?'Mối góc/Fillet':'Fillet weld', ds:'1F-4F, PB', match:i => /F$|^[1-4]?F$/i.test(i.position||'') || (i.tags||[]).some(x=>/fillet/i.test(x))}
  ];
}

// Use inline WPS_DB if loaded (works via file:// without server), else fetch JSON
if (typeof window !== 'undefined' && window.WPS_DB) {
  DB = window.WPS_DB; init();
} else {
  fetch('wps-index.json?v=' + Date.now())
    .then(r => r.json())
    .then(d => { DB = d; init(); })
    .catch(e => { document.getElementById('results').innerHTML = '<div class="empty"><div class="lg">⚠️</div>Lỗi tải: ' + e + '</div>'; });
}

function init(){
  applyLang(); buildProcRow(); buildFilterOptions(); bindUI(); render();
  const urlId = new URLSearchParams(location.search).get('id');
  if (urlId) { const x = DB.items.find(i => i.id === urlId); if (x) openDetail(x); }
}

function applyLang(){
  const t = T[LANG];
  document.documentElement.lang = LANG;
  document.getElementById('lvi').classList.toggle('on', LANG==='vi');
  document.getElementById('len').classList.toggle('on', LANG==='en');
  const setText = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  setText('aTitle', t.title); setText('aSub', t.sub);
  setText('hHd', t.hd); setText('hSub', t.hsub);
  document.getElementById('q').placeholder = t.placeholder;
  setText('moreLabel', t.more);
  setText('lProj', t.lProj); setText('lCode', t.lCode); setText('lPos', t.lPos); setText('lMat', t.lMat); setText('lThk', t.lThk);
  setText('emptyTxt', t.empty);
  setText('bOpen', t.bOpen); setText('bDl', t.bDl); setText('bShare', t.bShare); setText('bSrc', t.bSrc); setText('bBack', t.bBack);
  setText('resetBtn', t.reset);
  document.getElementById('ftrTxt').innerHTML = t.ftr;
  setText('aWiz', t.aWiz); setText('aWizD', t.aWizD);
  setText('aQr', t.aQr); setText('aQrD', t.aQrD);
  setText('aAll', t.aAll); setText('lFav', t.lFav); setText('lRec', t.lRec); setText('lCat', t.lCat);
  ['fProj','fCode','fPos','fMat'].forEach(id=>{ const s=document.getElementById(id); if (s.options[0]) s.options[0].text=t.all; });
  const allChip = document.querySelector('.chip[data-proc=""]'); if (allChip) allChip.textContent = t.procAll;
  if (DB) document.getElementById('aAllD').textContent = DB.items.length + ' WPS';
}

function buildProcRow(){
  const t = T[LANG];
  const procs = uniq(DB.items.map(x => normProc(x.process))).sort();
  const row = document.getElementById('procRow');
  row.innerHTML = '';
  row.appendChild(chip('', t.procAll, true));
  procs.forEach(p => row.appendChild(chip(p, p, false)));
  row.addEventListener('click', e => {
    const c = e.target.closest('.chip'); if (!c) return;
    F.proc = c.dataset.proc;
    row.querySelectorAll('.chip').forEach(x => x.classList.toggle('on', x.dataset.proc===F.proc));
    render();
  });
}
function chip(val, lbl, on){ const b = document.createElement('button'); b.className = 'chip' + (on?' on':''); b.dataset.proc = val; b.textContent = lbl; return b; }

function buildFilterOptions(){
  fillSel('fProj', DB.projects.map(p => ({v:p.code, t:p.code + ' — ' + (LANG==='vi'?p.name_vi:p.name_en)})));
  fillSel('fCode', uniq(DB.items.map(x=>x.code).filter(Boolean)).sort().map(v=>({v,t:v})));
  fillSel('fPos', uniq(DB.items.flatMap(x => splitPos(x.position))).sort().map(v=>({v,t:v})));
  fillSel('fMat', uniq(DB.items.map(x => shortMat(x.base_metal)).filter(Boolean)).sort().map(v=>({v,t:v})));
}
function fillSel(id, opts){
  const sel = document.getElementById(id);
  const keep = sel.options[0]; sel.innerHTML = ''; sel.appendChild(keep);
  opts.forEach(o => { const op=document.createElement('option'); op.value=o.v; op.textContent=o.t; sel.appendChild(op); });
}

function bindUI(){
  document.getElementById('q').addEventListener('input', e=>{ Q=e.target.value.trim().toLowerCase(); document.getElementById('qClear').style.display=Q?'block':'none'; render(); });
  document.getElementById('qClear').addEventListener('click', ()=>{ document.getElementById('q').value=''; Q=''; document.getElementById('qClear').style.display='none'; render(); });
  document.getElementById('fProj').addEventListener('change', e => { F.proj = e.target.value; render(); });
  document.getElementById('fCode').addEventListener('change', e => { F.code = e.target.value; render(); });
  document.getElementById('fPos').addEventListener('change', e => { F.pos = e.target.value; render(); });
  document.getElementById('fMat').addEventListener('change', e => { F.mat = e.target.value; render(); });
  document.getElementById('fThk').addEventListener('input', e => { F.thk = e.target.value; render(); });
  document.getElementById('resetBtn').addEventListener('click', resetAll);
  document.getElementById('bAll').addEventListener('click', ()=>{ resetAll(); renderAll(); });
  document.getElementById('bWizard').addEventListener('click', openWiz);
  document.getElementById('lvi').addEventListener('click', ()=>setLang('vi'));
  document.getElementById('len').addEventListener('click', ()=>setLang('en'));
  document.addEventListener('keydown', e => {
    if (e.key==='Escape'){ closeModal(); closePdf(); closeWiz(); }
    if (e.key==='ArrowLeft' && pdfState.hasRange && document.getElementById('pdfw').classList.contains('open')) pdfPrev();
    if (e.key==='ArrowRight' && pdfState.hasRange && document.getElementById('pdfw').classList.contains('open')) pdfNext();
  });
  document.getElementById('dStar').addEventListener('click', ()=>{ if (currentDetailId) { toggleFav(currentDetailId); refreshDStar(); } });
  document.getElementById('dShare').addEventListener('click', ()=>{
    if (!currentDetailId) return;
    const url = location.origin + location.pathname + '?id=' + encodeURIComponent(currentDetailId);
    navigator.clipboard?.writeText(url).then(()=>{
      const b = document.getElementById('bShare'); const old = b.textContent;
      b.textContent = T[LANG].copyDone; setTimeout(()=>{ b.textContent = old; }, 1500);
    });
  });
  const pp = document.getElementById('pdfPrev'); if (pp) pp.addEventListener('click', pdfPrev);
  const pn = document.getElementById('pdfNext'); if (pn) pn.addEventListener('click', pdfNext);
}

function setLang(l){ LANG=l; localStorage.setItem('wps_lang', l); applyLang(); buildProcRow(); buildFilterOptions(); render(); }

function resetAll(){
  Q=''; F={proc:'',proj:'',code:'',pos:'',mat:'',thk:''};
  document.getElementById('q').value=''; document.getElementById('qClear').style.display='none';
  document.getElementById('fProj').value=''; document.getElementById('fCode').value='';
  document.getElementById('fPos').value=''; document.getElementById('fMat').value=''; document.getElementById('fThk').value='';
  document.querySelectorAll('#procRow .chip').forEach(c=>c.classList.toggle('on', c.dataset.proc===''));
  render();
}

function isIdle(){ return !Q && !F.proc && !F.proj && !F.code && !F.pos && !F.mat && !F.thk; }

function filtered(){
  return DB.items.filter(x => {
    if (F.proc && normProc(x.process)!==F.proc) return false;
    if (F.proj && x.project!==F.proj) return false;
    if (F.code && x.code!==F.code) return false;
    if (F.pos && !splitPos(x.position).includes(F.pos)) return false;
    if (F.mat && shortMat(x.base_metal)!==F.mat) return false;
    if (F.thk){ const t=parseFloat(F.thk); if (!isNaN(t) && !thicknessOK(x.thickness, t)) return false; }
    if (Q){
      const hay = (x.id+' '+x.code+' '+x.process+' '+x.position+' '+x.base_metal+' '+x.material_group+' '+x.filler+' '+x.pqr+' '+x.project+' '+(x.tags||[]).join(' ')).toLowerCase();
      if (!hay.includes(Q)) return false;
    }
    return true;
  });
}

function thicknessOK(range, t){
  if (!range) return true;
  const s = range.toString();
  if (/unlimited/i.test(s) && /3[–-]/.test(s)) return t >= 3;
  const m = s.match(/(\d+(?:\.\d+)?)\s*[–\-toĐếnđến]+\s*(\d+(?:\.\d+)?)/);
  if (m) return t >= parseFloat(m[1]) && t <= parseFloat(m[2]);
  const m2 = s.match(/(\d+(?:\.\d+)?)\s*[–\-]\s*(unlimited|all)/i);
  if (m2) return t >= parseFloat(m2[1]);
  return true;
}

function render(){
  if (isIdle()) {
    document.getElementById('countWrap').style.display = 'none';
    document.getElementById('results').style.display = 'none';
    document.getElementById('empty').style.display = 'none';
    renderHome();
  } else {
    document.getElementById('favSect').style.display = 'none';
    document.getElementById('recSect').style.display = 'none';
    document.getElementById('catSect').style.display = 'none';
    renderResults();
  }
}

function renderHome(){
  const favSect = document.getElementById('favSect');
  const favItems = FAV.map(id => DB.items.find(x => x.id===id)).filter(Boolean);
  if (favItems.length){ favSect.style.display='block'; document.getElementById('ctFav').textContent=favItems.length; const g=document.getElementById('favGrid'); g.innerHTML=''; favItems.forEach(x=>g.appendChild(card(x))); } else favSect.style.display='none';
  const recSect = document.getElementById('recSect');
  const recItems = REC.map(id => DB.items.find(x => x.id===id)).filter(Boolean).slice(0,6);
  if (recItems.length){ recSect.style.display='block'; document.getElementById('ctRec').textContent=recItems.length; const g=document.getElementById('recGrid'); g.innerHTML=''; recItems.forEach(x=>g.appendChild(card(x))); } else recSect.style.display='none';
  document.getElementById('catSect').style.display='block';
  const catGrid = document.getElementById('catGrid');
  catGrid.innerHTML = '';
  getCategories().forEach(c => {
    const n = DB.items.filter(c.match).length;
    if (!n) return;
    const tile = document.createElement('button');
    tile.className = 'tile';
    tile.innerHTML = `<div class="em">${c.em}</div><div class="tt">${esc(c.tt)}</div><div class="ds">${esc(c.ds)}</div><div class="ct">${n} WPS</div>`;
    tile.addEventListener('click', () => renderCategoryResults(c));
    catGrid.appendChild(tile);
  });
}

function renderCategoryResults(c){
  document.getElementById('favSect').style.display='none';
  document.getElementById('recSect').style.display='none';
  document.getElementById('catSect').style.display='none';
  const list = DB.items.filter(c.match);
  document.getElementById('countWrap').style.display='flex';
  document.getElementById('countTxt').textContent = (LANG==='vi'?'Nhóm: ':'Category: ') + c.tt + ' — ' + T[LANG].count(list.length);
  showList(list);
}

function renderResults(){
  const res = filtered();
  document.getElementById('countWrap').style.display='flex';
  document.getElementById('countTxt').textContent = T[LANG].count(res.length);
  showList(res);
}

function renderAll(){
  document.getElementById('favSect').style.display='none';
  document.getElementById('recSect').style.display='none';
  document.getElementById('catSect').style.display='none';
  document.getElementById('countWrap').style.display='flex';
  document.getElementById('countTxt').textContent = T[LANG].count(DB.items.length);
  showList(DB.items);
}

function showList(list){
  const wrap = document.getElementById('results');
  wrap.style.display = 'grid';
  wrap.innerHTML = '';
  if (list.length===0){ document.getElementById('empty').style.display='block'; return; }
  document.getElementById('empty').style.display='none';
  list.forEach(x => wrap.appendChild(card(x)));
}

function card(x){
  const proc = normProc(x.process);
  const div = document.createElement('div');
  div.className = 'rcard';
  const isFav = FAV.includes(x.id);
  const pagesPill = x.page ? `<span class="badge" title="${LANG==='vi'?'Trang trong PDF':'Pages in PDF'}">📄 ${x.page_end && x.page_end!==x.page ? x.page+'–'+x.page_end : x.page}</span>` : '';
  div.innerHTML = `
    <button class="star ${isFav?'on':''}" title="Yêu thích">${isFav?'★':'☆'}</button>
    <div class="rtop">
      <div class="t">${esc(x.id)}</div>
      <div class="rev">Rev ${esc(x.rev||'-')}</div>
    </div>
    <div class="m">
      <span class="badge proc ${proc}">${esc(proc)}</span>
      <span class="badge">${esc(short(x.code))}</span>
      ${x.position?`<span class="badge">${esc(x.position)}</span>`:''}
      <span class="badge proj">${esc(x.project)}</span>
      ${pagesPill}
      ${x._matchScore?`<span class="badge match">★ ${x._matchScore}/5</span>`:''}
    </div>
    <div class="info">
      ${x.base_metal?`<div class="info-row"><b>${T[LANG].kv.base_metal}:</b> ${esc(x.base_metal)}</div>`:''}
      ${x.thickness?`<div class="info-row"><b>${T[LANG].kv.thickness}:</b> ${esc(x.thickness)}</div>`:''}
      ${x.filler?`<div class="info-row"><b>${T[LANG].kv.filler}:</b> ${esc(x.filler)}</div>`:''}
      ${x.pqr?`<div class="info-row"><b>${T[LANG].kv.pqr}:</b> ${esc(x.pqr)}</div>`:''}
    </div>
    ${x.sketches && x.sketches.length ? `<img class="ck-thumb" src="sketches/${encodeURIComponent(x.sketches[0])}" alt="sketch" loading="lazy">` : ''}
  `;
  div.querySelector('.star').addEventListener('click', e=>{ e.stopPropagation(); toggleFav(x.id); render(); });
  div.addEventListener('click', () => openDetail(x));
  return div;
}

function toggleFav(id){
  const i = FAV.indexOf(id);
  if (i>=0) FAV.splice(i,1); else FAV.push(id);
  localStorage.setItem('wps_fav', JSON.stringify(FAV));
}
function pushRecent(id){
  REC = [id, ...REC.filter(x=>x!==id)].slice(0, 12);
  localStorage.setItem('wps_rec', JSON.stringify(REC));
}

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('sw.js').catch(()=>{});
}
