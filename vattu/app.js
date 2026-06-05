/* App vật tư — logic */
let DB = null;
let Q = '';
let F = { cat:'', std:'', region:'' };

if (typeof window !== 'undefined' && window.VT_DATA) { DB = window.VT_DATA; init(); }

function init(){
  buildCatRow();
  buildFilters();
  bindUI();
  render();
  // Deep link ?id=
  const urlId = new URLSearchParams(location.search).get('id');
  if (urlId){ const x = DB.items.find(i => i.id===urlId); if (x) openDetail(x); }
}

function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c])); }
function uniq(a){ return Array.from(new Set(a)); }

function buildCatRow(){
  const row = document.getElementById('catRow');
  row.innerHTML = '<button class="chip on" data-c="">Tất cả</button>' +
    DB.categories.map(c => `<button class="chip" data-c="${c.id}">${c.icon} ${c.name_vi}</button>`).join('');
  row.addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    F.cat = b.dataset.c;
    row.querySelectorAll('.chip').forEach(x => x.classList.toggle('on', x.dataset.c===F.cat));
    render();
  });
}

function buildFilters(){
  const sStd = document.getElementById('fStd');
  uniq(DB.items.map(x => x.std)).sort().forEach(v => {
    const o = document.createElement('option'); o.value=v; o.textContent=v; sStd.appendChild(o);
  });
  const sReg = document.getElementById('fRegion');
  uniq(DB.items.map(x => x.region)).sort().forEach(v => {
    const o = document.createElement('option'); o.value=v; o.textContent=v; sReg.appendChild(o);
  });
}

function bindUI(){
  document.getElementById('q').addEventListener('input', e=>{
    Q = e.target.value.trim().toLowerCase();
    document.getElementById('qClear').style.display = Q?'block':'none';
    render();
  });
  document.getElementById('qClear').addEventListener('click', ()=>{
    document.getElementById('q').value=''; Q=''; document.getElementById('qClear').style.display='none'; render();
  });
  document.getElementById('fStd').addEventListener('change', e => { F.std = e.target.value; render(); });
  document.getElementById('fRegion').addEventListener('change', e => { F.region = e.target.value; render(); });
  document.getElementById('resetBtn').addEventListener('click', resetAll);
  document.addEventListener('keydown', e => { if (e.key==='Escape') closeModal(); });
}

function resetAll(){
  Q=''; F={cat:'',std:'',region:''};
  document.getElementById('q').value=''; document.getElementById('qClear').style.display='none';
  document.getElementById('fStd').value=''; document.getElementById('fRegion').value='';
  document.querySelectorAll('#catRow .chip').forEach(c=>c.classList.toggle('on', c.dataset.c===''));
  render();
}

function isIdle(){ return !Q && !F.cat && !F.std && !F.region; }

function filtered(){
  return DB.items.filter(x => {
    if (F.cat && x.cat!==F.cat) return false;
    if (F.std && x.std!==F.std) return false;
    if (F.region && x.region!==F.region) return false;
    if (Q){
      const hay = (x.id+' '+x.title_vi+' '+x.title_en+' '+x.std+' '+x.element+' '+(x.note_vi||'')).toLowerCase();
      if (!hay.includes(Q)) return false;
    }
    return true;
  });
}

function render(){
  if (isIdle()) renderHome(); else renderResults();
}

function renderHome(){
  document.getElementById('countWrap').style.display='none';
  document.getElementById('results').style.display='none';
  document.getElementById('empty').style.display='none';
  document.getElementById('catSect').style.display='block';
  const grid = document.getElementById('catGrid');
  grid.innerHTML = '';
  DB.categories.forEach(c => {
    const n = DB.items.filter(x => x.cat===c.id).length;
    if (!n) return;
    const tile = document.createElement('button');
    tile.className = 'tile';
    tile.innerHTML = `<div class="em">${c.icon}</div><div class="tt">${esc(c.name_vi)}</div><div class="ds">${esc(c.name_en)}</div><div class="ct">${n} mục</div>`;
    tile.addEventListener('click', () => { F.cat = c.id; document.querySelectorAll('#catRow .chip').forEach(x=>x.classList.toggle('on', x.dataset.c===c.id)); render(); });
    grid.appendChild(tile);
  });
}

function renderResults(){
  const res = filtered();
  document.getElementById('catSect').style.display='none';
  document.getElementById('countWrap').style.display='flex';
  document.getElementById('countTxt').textContent = res.length + ' kết quả';
  const wrap = document.getElementById('results');
  wrap.style.display = 'grid';
  wrap.innerHTML = '';
  if (!res.length){ document.getElementById('empty').style.display='block'; return; }
  document.getElementById('empty').style.display='none';
  res.forEach(x => wrap.appendChild(card(x)));
}

function card(x){
  const cat = DB.categories.find(c => c.id===x.cat) || {};
  const div = document.createElement('div');
  div.className = 'rcard';
  div.innerHTML = `
    <div class="t">${esc(x.title_vi)}</div>
    <div class="m">
      <span class="badge">${esc(cat.icon||'')} ${esc(cat.name_vi||'')}</span>
      <span class="badge">${esc(x.std)}</span>
      <span class="badge region ${esc(x.region)}">${esc(x.region)}</span>
    </div>
    ${x.element?`<div class="desc">${esc(x.element)}</div>`:''}
    ${x.note_vi?`<div class="desc" style="color:#7c4a00">⚠ ${esc(x.note_vi.slice(0,90))}${x.note_vi.length>90?'…':''}</div>`:''}
  `;
  div.addEventListener('click', () => openDetail(x));
  return div;
}

function openDetail(x){
  const cat = DB.categories.find(c => c.id===x.cat) || {};
  const std = DB.standards.find(s => s.code===x.std) || {};
  document.getElementById('dTitle').textContent = x.title_vi;
  document.getElementById('dSub').textContent = `${cat.icon||''} ${cat.name_vi||''} · ${x.std}`;
  let html = '';
  if (x.spec && x.spec.length){
    html += `<table class="spec-table">`;
    x.spec.forEach(s => {
      html += `<tr><th>${esc(s.label)}</th><td>${esc(s.value)}</td></tr>`;
    });
    html += `</table>`;
  }
  if (x.element) html += `<div style="margin-top:10px;font-size:13px;color:var(--muted)">📦 Áp dụng cho: <b style="color:var(--ink)">${esc(x.element)}</b></div>`;
  // Sketch hướng dẫn CÁCH ĐO
  if (x.sketch && window.VT_SKETCH && window.VT_SKETCH[x.sketch]){
    const svg = window.VT_SKETCH[x.sketch]();
    if (svg) html += `<div style="margin-top:14px;background:#fbfdff;border:1px solid #b5d4f4;border-radius:12px;padding:12px 14px"><div style="font-size:11px;font-weight:800;color:#0c447c;letter-spacing:.5px;text-transform:uppercase;margin-bottom:8px">📐 Cách đo thực tế (QC kiểm tra vật tư đầu vào)</div>${svg}</div>`;
  }
  if (x.note_vi) html += `<div class="note">⚠ <b>Lưu ý:</b> ${esc(x.note_vi)}</div>`;
  if (x.clause || std.name){
    html += `<div class="src"><div class="h">📋 NGUỒN / TIÊU CHUẨN</div>`;
    if (x.clause) html += `<div><b>${esc(x.clause)}</b></div>`;
    if (std.name) html += `<div style="color:var(--muted);margin-top:3px">${esc(std.name)} · ${esc(std.region)}</div>`;
    html += `</div>`;
  }
  document.getElementById('dBody').innerHTML = html;
  document.getElementById('dBody').innerHTML = html;
  document.getElementById('ovl').style.display = 'flex';
  const u = new URL(location.href); u.searchParams.set('id', x.id); history.replaceState(null,'',u.toString());
}

function closeModal(){
  document.getElementById('ovl').style.display='none';
  const u = new URL(location.href); u.searchParams.delete('id'); history.replaceState(null,'',u.toString());
}

if ('serviceWorker' in navigator && location.protocol.startsWith('http')){
  navigator.serviceWorker.register('sw.js').catch(()=>{});
}
