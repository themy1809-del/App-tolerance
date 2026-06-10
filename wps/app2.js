/* WPS Library — Part 2: detail modal + PDF viewer + wizard */

function refreshDStar(){
  const btn = document.getElementById('dStar');
  const on = currentDetailId && FAV.includes(currentDetailId);
  btn.textContent = on?'★':'☆';
  btn.classList.toggle('on', !!on);
}

function openDetail(x){
  currentDetailId = x.id;
  pushRecent(x.id);
  const t = T[LANG];
  const proj = DB.projects.find(p => p.code===x.project);
  document.getElementById('dId').textContent = x.id;
  document.getElementById('dSub').textContent = (x.code||'') + (x.rev?` • Rev ${x.rev}`:'');
  refreshDStar();
  const kv = document.getElementById('dKv');
  const rows = [
    ['code', x.code], ['process', x.process], ['position', x.position],
    ['base_metal', x.base_metal], ['material_group', x.material_group],
    ['thickness', x.thickness], ['diameter', x.diameter],
    ['filler', x.filler], ['f_no', x.f_no], ['size', x.size],
    ['pqr', x.pqr], ['project', proj?`${x.project} — ${LANG==='vi'?proj.name_vi:proj.name_en}`:x.project]
  ].filter(([_,v]) => v && v!=='-');
  kv.innerHTML = rows.map(([k,v])=>{
    if (k==='material_group' && v) {
      const hint = String(v).split(' → ')[0].replace(/'/g, "\\'");
      return `<div class="k">${t.kv[k]||k}</div><div class="v" style="cursor:pointer;color:#7c3f00;text-decoration:underline dotted;font-weight:700" onclick="showMatGroups('${hint}')" title="Click để xem chi tiết nhóm vật liệu">${esc(v)} 📦</div>`;
    }
    return `<div class="k">${t.kv[k]||k}</div><div class="v">${esc(v)}</div>`;
  }).join('');
  if (x.tags && x.tags.length){
    kv.insertAdjacentHTML('beforeend', `<div class="k">${t.kv.tags}</div><div class="v"><div class="tagchips">${x.tags.map(tg=>`<span class="tagchip">${esc(tg)}</span>`).join('')}</div></div>`);
  }
  renderSummary(x);
  // Sketch gallery (form pages with embedded joint sketch)
  const sketchWrap = document.getElementById('dSketches');
  if (x.sketches && x.sketches.length){
    sketchWrap.style.display = 'block';
    sketchWrap.innerHTML = `<div class="sk-h">📐 ${LANG==='vi'?'Hình phác / Form WPS':'Sketches / WPS form'} <span class="sk-ct">${x.sketches.length}</span></div>
      <div class="sk-scroll">` +
      x.sketches.map((s,i)=>`<img class="sk-img" src="sketches/${encodeURIComponent(s)}" alt="sketch ${i+1}" loading="lazy" data-i="${i}">`).join('') +
      `</div>`;
    sketchWrap.querySelectorAll('.sk-img').forEach(img => {
      img.addEventListener('click', () => openSketchZoom(x.sketches, parseInt(img.dataset.i)));
    });
  } else { sketchWrap.style.display = 'none'; sketchWrap.innerHTML = ''; }
  const fileHref = 'files/' + encodeURIComponent(x.file);
  document.getElementById('dOpen').onclick = () => openPdf(x, fileHref);
  document.getElementById('dDl').href = fileHref;
  document.getElementById('dDl').download = x.file;
  document.getElementById('dCard').href = 'welder-card.html?id=' + encodeURIComponent(x.id);
  const dCopyBtn = document.getElementById('dCopy');
  if (dCopyBtn) dCopyBtn.onclick = () => copyWpsSummary(x);
  const pageInfo = x.page ? (x.page_end && x.page_end!==x.page ? ` · ${LANG==='vi'?'trang':'pages'} ${x.page}–${x.page_end}` : ` · ${LANG==='vi'?'trang':'page'} ${x.page}`) : '';
  document.getElementById('dSrc').innerHTML = proj
    ? `<b>${esc(proj.code)}</b> — ${esc(LANG==='vi'?proj.name_vi:proj.name_en)}<br>📄 ${esc(x.file)}${pageInfo}<br><span style="color:var(--muted)">${esc(proj.register_doc||'')}${proj.date?` · ${esc(proj.date)}`:''}</span>`
    : esc(x.file);
  // Skip HEAD check on file:// (CORS blocks it); only check via HTTP
  if (location.protocol.startsWith('http')) {
    fetch(fileHref, { method:'HEAD' })
      .then(r => {
        const miss = document.getElementById('dMiss');
        if (!r.ok){ miss.innerHTML = `<b>${t.missTitle}</b><br>${t.missBody(x.file)}`; miss.style.display = 'block'; }
        else { miss.style.display = 'none'; }
      }).catch(() => {});
  } else { document.getElementById('dMiss').style.display = 'none'; }
  document.getElementById('ovl').style.display = 'flex';
  const u = new URL(location.href); u.searchParams.set('id', x.id); history.replaceState(null, '', u.toString());
}

function closeModal(){
  document.getElementById('ovl').style.display='none';
  currentDetailId = null;
  const u = new URL(location.href); u.searchParams.delete('id'); history.replaceState(null, '', u.toString());
  if (isIdle()) render();
}

/* Copy tóm tắt thông số WPS — dán vào báo cáo/email/Zalo */
function copyWpsSummary(x){
  const proj = (DB.projects||[]).find(p => p.code===x.project);
  const L = [
    (LANG==='vi'?'THÔNG SỐ WPS — ':'WPS SUMMARY — ') + x.id + (x.rev?(' Rev '+x.rev):''),
    ['Code', x.code], ['Process', x.process], ['Position', x.position],
    [LANG==='vi'?'Vật liệu nền':'Base metal', x.base_metal],
    [LANG==='vi'?'Nhóm vật liệu':'Material group', x.material_group],
    [LANG==='vi'?'Chiều dày':'Thickness', x.thickness],
    [LANG==='vi'?'Đường kính':'Diameter', x.diameter],
    [LANG==='vi'?'Vật liệu hàn':'Filler', x.filler],
    ['F-No', x.f_no], ['Size', x.size], ['PQR', x.pqr],
    [LANG==='vi'?'Dự án':'Project', proj ? (x.project+' — '+(LANG==='vi'?proj.name_vi:proj.name_en)) : x.project],
    ['File', x.file + (x.page?(' (tr.'+x.page+(x.page_end&&x.page_end!==x.page?('–'+x.page_end):'')+')'):'')]
  ];
  const txt = L.map(r => Array.isArray(r) ? (r[1] && r[1]!=='-' ? '  ' + r[0] + ': ' + r[1] : null) : r).filter(Boolean).join('\n');
  (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => {
    const b = document.getElementById('bCopy'); if (b){ const o=b.textContent; b.textContent = LANG==='vi'?'✓ Đã copy!':'✓ Copied!'; setTimeout(()=>b.textContent=o, 1500); }
  }).catch(() => prompt('Copy:', txt));
}

/* ============ Wizard ============ */
const WIZ_MATS = [
  {v:'A572', em:'🇺🇸', tt:'ASTM A572 Gr.50', match:/A572/i},
  {v:'A36', em:'📄', tt:'ASTM A36', match:/A36/i},
  {v:'A992', em:'🏗️', tt:'ASTM A992', match:/A992/i},
  {v:'A53', em:'🛢️', tt:'ASTM A53/A106', match:/A53|A106/i},
  {v:'A500', em:'⬜', tt:'ASTM A500', match:/A500/i},
  {v:'SA516', em:'🛢️', tt:'ASME SA516 Gr.70', match:/SA516/i},
  {v:'A240-304', em:'✨', tt:'A240-304 (Stainless)', match:/A240.*304|TP304|304/i},
  {v:'A240-316', em:'✨', tt:'A240-316 (Stainless)', match:/A240.*316|TP316|316/i},
  {v:'S355', em:'🇪🇺', tt:'EN 10025-2 S355J2', match:/S355/i},
  {v:'Q355', em:'🇨🇳', tt:'GB Q355B/C/D', match:/Q3[45]5/i},
  {v:'Q345', em:'🇨🇳', tt:'GB Q345D', match:/Q345/i},
  {v:'SS400', em:'📄', tt:'JIS SS400', match:/SS400|G3101/i},
  {v:'STK400', em:'🚰', tt:'JIS STK400', match:/STK400|G3444/i}
];

const POS_ICONS = {
  '1G':'<svg viewBox="0 0 40 40"><rect x="6" y="20" width="28" height="6" fill="#0c447c"/><line x1="20" y1="14" x2="20" y2="20" stroke="#0c447c" stroke-width="2"/></svg>',
  '2G':'<svg viewBox="0 0 40 40"><rect x="17" y="6" width="6" height="28" fill="#0c447c"/><line x1="11" y1="20" x2="17" y2="20" stroke="#0c447c" stroke-width="2"/></svg>',
  '3G':'<svg viewBox="0 0 40 40"><rect x="17" y="6" width="6" height="28" fill="#0c447c"/><path d="M11 28 L17 22 L17 28 Z" fill="#0c447c"/></svg>',
  '4G':'<svg viewBox="0 0 40 40"><rect x="6" y="14" width="28" height="6" fill="#0c447c"/><line x1="20" y1="20" x2="20" y2="26" stroke="#0c447c" stroke-width="2"/></svg>',
  '5G':'<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="10" fill="none" stroke="#0c447c" stroke-width="4"/></svg>',
  '6G':'<svg viewBox="0 0 40 40"><g transform="rotate(45 20 20)"><circle cx="20" cy="20" r="10" fill="none" stroke="#0c447c" stroke-width="4"/></g></svg>',
  '6GR':'<svg viewBox="0 0 40 40"><g transform="rotate(45 20 20)"><circle cx="20" cy="20" r="10" fill="none" stroke="#0c447c" stroke-width="4"/></g><circle cx="32" cy="20" r="3" fill="#aa4322"/></svg>',
  '1F':'<svg viewBox="0 0 40 40"><rect x="6" y="22" width="28" height="4" fill="#0c447c"/><polygon points="16,18 20,18 20,22" fill="#0c447c"/></svg>',
  '2F':'<svg viewBox="0 0 40 40"><rect x="6" y="22" width="28" height="4" fill="#0c447c"/><rect x="18" y="8" width="4" height="14" fill="#0c447c"/></svg>',
  '3F':'<svg viewBox="0 0 40 40"><rect x="18" y="6" width="4" height="28" fill="#0c447c"/></svg>',
  '4F':'<svg viewBox="0 0 40 40"><rect x="6" y="14" width="28" height="4" fill="#0c447c"/><rect x="18" y="18" width="4" height="14" fill="#0c447c"/></svg>',
  'PA':'<svg viewBox="0 0 40 40"><rect x="6" y="20" width="28" height="6" fill="#0c447c"/><text x="20" y="16" text-anchor="middle" font-size="9" fill="#0c447c" font-weight="700">PA</text></svg>',
  'PC':'<svg viewBox="0 0 40 40"><rect x="17" y="6" width="6" height="28" fill="#0c447c"/><text x="32" y="22" text-anchor="middle" font-size="9" fill="#0c447c" font-weight="700">PC</text></svg>',
  'PF':'<svg viewBox="0 0 40 40"><rect x="17" y="6" width="6" height="28" fill="#0c447c"/><text x="32" y="22" text-anchor="middle" font-size="9" fill="#0c447c" font-weight="700">PF</text></svg>',
  'All':'<svg viewBox="0 0 40 40"><text x="20" y="26" text-anchor="middle" font-size="13" fill="#0c447c" font-weight="800">All</text></svg>'
};
const WIZ_POS = ['1G','2G','3G','4G','5G','6G','6GR','1F','2F','3F','4F','PA','PC','PF','All'];
const WIZ_JOINTS = [
  {v:'butt', em:'═', tt:'Butt / Groove', match:/groove|butt|BW|BU/i},
  {v:'fillet', em:'⌐', tt:'Fillet / T', match:/fillet|FW|^[1-4]?F$/i},
  {v:'corner', em:'┐', tt:'Corner / Lap', match:/corner|lap/i},
  {v:'any', em:'＊', tt:'Any', match:/.*/}
];

let WZ = { step:1, matA:null, matB:null, pos:null, joint:null, thk:null };
function openWiz(){
  WZ = { step:1, matA:null, matB:null, pos:null, joint:null, thk:null };
  document.getElementById('wovl').style.display='flex';
  renderWizStep();
}
function closeWiz(){ document.getElementById('wovl').style.display='none'; }

function renderWizStep(){
  const t = T[LANG].wz;
  document.getElementById('wzTitle').textContent = t.title;
  document.getElementById('wzStepLbl').textContent = t.step(WZ.step);
  document.getElementById('wzSteps').innerHTML = Array.from({length:5},(_,i)=>`<div class="st ${i<WZ.step?'on':''}"></div>`).join('');
  const body = document.getElementById('wzBody');
  let html = '';
  if (WZ.step===1){
    html = `<div class="wiztitle">${t.s1t}</div><div class="wizsub">${t.s1s}</div><div class="wizgrid">`+
      WIZ_MATS.map(m=>`<div class="wizopt ${WZ.matA===m.v?'on':''}" data-v="${m.v}"><div class="icx">${m.em}</div>${esc(m.tt)}</div>`).join('') + `</div>`;
  } else if (WZ.step===2){
    html = `<div class="wiztitle">${t.s2t}</div><div class="wizsub">${t.s2s}</div><div class="wizgrid">`+
      `<div class="wizopt ${WZ.matB==='none'?'on':''}" data-v="none"><div class="icx">↔</div>${esc(t.none)}</div>` +
      WIZ_MATS.map(m=>`<div class="wizopt ${WZ.matB===m.v?'on':''}" data-v="${m.v}"><div class="icx">${m.em}</div>${esc(m.tt)}</div>`).join('') + `</div>`;
  } else if (WZ.step===3){
    html = `<div class="wiztitle">${t.s3t}</div><div class="wizsub">${t.s3s}</div><div class="wizgrid">`+
      WIZ_POS.map(p=>`<div class="wizopt ${WZ.pos===p?'on':''}" data-v="${p}"><div class="icx">${POS_ICONS[p]||p}</div>${p}</div>`).join('') + `</div>`;
  } else if (WZ.step===4){
    html = `<div class="wiztitle">${t.s4t}</div><div class="wizgrid">`+
      WIZ_JOINTS.map(j=>`<div class="wizopt ${WZ.joint===j.v?'on':''}" data-v="${j.v}"><div class="icx" style="font-size:28px">${j.em}</div>${esc(j.tt)}</div>`).join('') + `</div>`;
  } else if (WZ.step===5){
    html = `<div class="wiztitle">${t.s5t}</div><div class="wizsub">${t.s5s}</div>`+
      `<input class="inp" type="number" id="wzThk" min="0" step="0.1" placeholder="mm" value="${WZ.thk||''}" style="font-size:18px;padding:13px;text-align:center" autofocus>`;
  }
  const showBack = WZ.step>1;
  const last = WZ.step===5;
  html += `<div class="wizfoot">${showBack?`<button class="btn ghost" id="wzBack">${t.back}</button>`:''}<button class="btn" id="wzNext">${last?t.go:t.next}</button></div>`;
  body.innerHTML = html;
  body.querySelectorAll('.wizopt').forEach(o=>{
    o.addEventListener('click', ()=>{
      const v = o.dataset.v;
      if (WZ.step===1) WZ.matA = v;
      else if (WZ.step===2) WZ.matB = v;
      else if (WZ.step===3) WZ.pos = v;
      else if (WZ.step===4) WZ.joint = v;
      body.querySelectorAll('.wizopt').forEach(x=>x.classList.toggle('on', x===o));
    });
  });
  if (showBack) document.getElementById('wzBack').addEventListener('click', ()=>{ WZ.step--; renderWizStep(); });
  document.getElementById('wzNext').addEventListener('click', ()=>{
    if (WZ.step===5){ const v = document.getElementById('wzThk').value; WZ.thk = v?parseFloat(v):null; runWizard(); }
    else { WZ.step++; renderWizStep(); }
  });
}

function runWizard(){
  const matA = WIZ_MATS.find(m=>m.v===WZ.matA);
  const matB = WZ.matB && WZ.matB!=='none' ? WIZ_MATS.find(m=>m.v===WZ.matB) : null;
  const joint = WIZ_JOINTS.find(j=>j.v===WZ.joint);
  const scored = DB.items.map(x => {
    let s = 0, pass = true;
    if (matA){ if (matA.match.test(x.base_metal||'')) s += 2; else pass = false; }
    if (matB){ if (matB.match.test(x.base_metal||'')) s += 1; }
    if (WZ.pos && WZ.pos!=='All'){
      const posList = splitPos(x.position);
      if (posList.includes(WZ.pos) || posList.some(p=>p.includes(WZ.pos))) s += 1;
      else if (!posList.length || posList.includes('All')) {}
      else pass = false;
    }
    if (joint && joint.v!=='any'){
      if (joint.match.test(x.position||'') || (x.tags||[]).some(tg=>joint.match.test(tg))) s += 1;
    }
    if (WZ.thk && !thicknessOK(x.thickness, WZ.thk)) pass = false;
    return pass ? { x, s } : null;
  }).filter(Boolean).sort((a,b) => b.s - a.s);
  const results = scored.map(r => ({ ...r.x, _matchScore: r.s }));
  closeWiz();
  resetAll();
  document.getElementById('countWrap').style.display='flex';
  document.getElementById('countTxt').textContent = results.length ? T[LANG].wz.done(results.length) : T[LANG].wz.none_found;
  document.getElementById('favSect').style.display='none';
  document.getElementById('recSect').style.display='none';
  document.getElementById('catSect').style.display='none';
  showList(results);
}

/* ============ PDF viewer + page navigation within a WPS range ============ */
let pdfState = { href:null, page:1, start:1, end:1, hasRange:false };
function openPdf(x, href){
  document.getElementById('pdfNm').textContent = x.id + ' — ' + x.file;
  const start = x.page || 1;
  const end = x.page_end || start;
  pdfState = { href, page:start, start, end, hasRange: !!x.page };
  loadPdfPage();
  document.getElementById('pdfDl').href = href;
  document.getElementById('pdfDl').download = x.file;
  const showPager = pdfState.hasRange && end > start;
  document.getElementById('pdfPrev').style.display = showPager?'inline-block':'none';
  document.getElementById('pdfNext').style.display = showPager?'inline-block':'none';
  document.getElementById('pdfPg').style.display = showPager?'inline-block':'none';
  document.getElementById('pdfw').classList.add('open');
}
function loadPdfPage(){
  const url = pdfState.href + '#page=' + pdfState.page + '&zoom=page-fit';
  document.getElementById('pdfFr').src = url;
  if (pdfState.hasRange) document.getElementById('pdfPg').textContent = `${pdfState.page} / ${pdfState.end}`;
}
function pdfPrev(){ if (pdfState.page > pdfState.start) { pdfState.page--; loadPdfPage(); } }
function pdfNext(){ if (pdfState.page < pdfState.end) { pdfState.page++; loadPdfPage(); } }
function closePdf(){
  document.getElementById('pdfw').classList.remove('open');
  document.getElementById('pdfFr').src = 'about:blank';
}

/* ============ Sketch zoom (fullscreen image viewer) ============ */
let zoomState = { imgs:[], i:0 };
function openSketchZoom(imgs, i){
  zoomState = { imgs, i };
  document.getElementById('szImg').src = 'sketches/' + encodeURIComponent(imgs[i]);
  document.getElementById('szCt').textContent = (i+1) + ' / ' + imgs.length;
  document.getElementById('szPrev').style.display = imgs.length>1?'inline-block':'none';
  document.getElementById('szNext').style.display = imgs.length>1?'inline-block':'none';
  document.getElementById('szWrap').classList.add('open');
}
function closeSketchZoom(){
  document.getElementById('szWrap').classList.remove('open');
  document.getElementById('szImg').src = '';
}
function szNext(){ if (zoomState.i<zoomState.imgs.length-1){ zoomState.i++; openSketchZoom(zoomState.imgs, zoomState.i); } }
function szPrev(){ if (zoomState.i>0){ zoomState.i--; openSketchZoom(zoomState.imgs, zoomState.i); } }

/* ============ Tóm tắt nhanh tiếng Việt ============ */

function matHelp(bm){
  var s = (bm||'').toLowerCase();
  if (/a240|304|tp304/.test(s)) return {icon:'✨', desc:'Inox AUSTENITIC 304 — chống ăn mòn tốt, không từ tính, dùng cho nhà bếp + kiến trúc',
    consum:'E308L / ER308L (TIG, MIG) · 99% Ar + 1% O₂ cho MIG',
    warn:'KHÔNG dùng brush carbon steel → contamination + gỉ'};
  if (/316|tp316/.test(s)) return {icon:'✨', desc:'Inox 316 — có Mo 2-3%, chống pitting + chloride (biển, hoá chất)',
    consum:'E316L / ER316L · gas 98%Ar+2%O₂',
    warn:'316L preferred — tránh sensitization khi hàn'};
  if (/duplex|2205|2507|s32205|s32750/.test(s)) return {icon:'⚡', desc:'Inox DUPLEX 2205 — cường độ gấp 2× của 316L, chống nước biển',
    consum:'E2209-16 / ER2209 (over-alloyed)',
    warn:'⚠ Heat input 0.5-2.5 kJ/mm — sai → mất cân bằng phase'};
  if (/a335|p11|p22|p91|cr.mo/.test(s)) return {icon:'🔥', desc:'Thép Cr-Mo chịu nhiệt áp lực — dùng refinery + power plant',
    consum:'E9018-B3 (P22) · E9015-B9 (P91)',
    warn:'⚠⚠ Preheat 200-250°C + PWHT 690-780°C BẮT BUỘC'};
  if (/a572|a992|s355|q345|sm490|sn490/.test(s)) return {icon:'🏗️', desc:'Thép HSLA cường độ cao (σy 345 MPa) — dùng cho nhà cao tầng, cầu',
    consum:'E7018 / ER70S-6 / E71T-1 (low-H)',
    warn:'CE 0.42-0.48 → preheat 50-100°C nếu t≥25mm'};
  if (/a36|s235|ss400|q235|cct/.test(s)) return {icon:'📄', desc:'Thép carbon thường (σy 235 MPa) — kết cấu phổ thông',
    consum:'E6013, E7016, E7018, ER70S-6',
    warn:'CE ≤ 0.40 → thường KHÔNG cần preheat'};
  if (/a53|a106|stk|api/.test(s)) return {icon:'🛢️', desc:'Ống thép carbon — áp lực và kết cấu',
    consum:'E7018, ER70S-2/-3/-6 cho root',
    warn:'Root pass GTAW + fill SMAW/FCAW phổ biến'};
  if (/a500|a501|hss/.test(s)) return {icon:'⬜', desc:'Hollow Structural Section (HSS) — hộp/ống nguội',
    consum:'E70xx hoặc ER70S-6',
    warn:'Carbon equivalent thấp, không preheat thường'};
  if (/sa516|sa537/.test(s)) return {icon:'🛢️', desc:'Tấm bồn áp lực ASME — A516 Gr.70 phổ biến nhất',
    consum:'E7018-1 (low-H), ER70S-6',
    warn:'Preheat 50-100°C cho t > 20mm · ASME PWHT thường yêu cầu'};
  if (/al|nhom|aluminum|5083|6061/.test(s)) return {icon:'🛩️', desc:'Hợp kim nhôm — Al-Mg (5xxx) hoặc Al-Mg-Si (6xxx)',
    consum:'ER5183/ER5356 (5xxx) · ER4043 (6061)',
    warn:'⚠ Hàn AC TIG để gỡ oxide Al₂O₃ · Distortion cao'};
  if (/monel|inconel|625|800/.test(s)) return {icon:'💎', desc:'Hợp kim Nickel — chống ăn mòn cực cao + nhiệt cao',
    consum:'ERNiCrMo-3 (625), ENiCrFe-3 (600)',
    warn:'⚠ Hot crack risk cao · clean tuyệt đối'};
  return {icon:'🔧', desc:'Xem chi tiết nhóm vật liệu để biết que hàn phù hợp', consum:'', warn:''};
}


function renderSummary(x){
  const w = document.getElementById('dSum'); if (!w) return;
  const procName = ({
    FCAW:'FCAW (dây lõi thuốc)', GMAW:'GMAW/MIG (dây đặc)',
    GTAW:'GTAW/TIG (điện cực vonfram)', SMAW:'SMAW (que hàn)',
    SAW:'SAW (hồ quang chìm)'
  })[normProc(x.process)] || x.process || '—';
  const procIc = ({FCAW:'🔥', GMAW:'⚡', GTAW:'✨', SMAW:'🔌', SAW:'🌊'})[normProc(x.process)] || '🔧';
  const posVi = (x.position||'').replace(/Uphill/gi,'hàn LÊN').replace(/Downhill/gi,'hàn XUỐNG').replace(/All/gi,'mọi tư thế');
  const mats = (x.base_metal||'').split('→').map(s=>s.trim()).filter(Boolean);
  const matsHtml = mats.length>1 ? `${esc(mats[0])} <span style="color:#aa4322;font-weight:800">↔</span> ${esc(mats[1])}` : esc(mats[0]||'—');
  const fillerShort = (x.filler||'').replace(/AWS\s+/,'').split(/\s+/)[0] + (x.size?` · ${x.size}`:'');
  const tiles = [
    {ic:procIc, lb:'Quy trình', val:esc(procName)},
    {ic:'↗', lb:'Tư thế', val:esc(posVi||'—')},
    {ic:'🧵', lb:'Dây/Que hàn', val:esc(fillerShort||'—')},
    {ic:'📏', lb:'Chiều dày (mm)', val:esc(x.thickness||'—')},
    {ic:'📋', lb:'Tiêu chuẩn', val:esc(x.code||'—')}
  ];
  // BIG material banner — Vật liệu = QUAN TRỌNG NHẤT cho thợ hàn
  const mg = x.material_group || '';
  const mgHint = mg.split(' → ')[0];
  const matHint = matHelp(x.base_metal||'');
  const matBanner = `
    <div class="mat-banner" onclick="${mg?`showMatGroups('${mgHint.replace(/'/g,"\\'")}')`:''}" ${mg?'style="cursor:pointer"':''}>
      <div class="mat-icon">${matHint.icon}</div>
      <div class="mat-body">
        <div class="mat-lbl">📦 VẬT LIỆU HÀN — quan trọng nhất với thợ</div>
        <div class="mat-name">${matsHtml || '—'}</div>
        <div class="mat-info">${matHint.desc}${mg?` · <b>${esc(mg)}</b>`:''}${mg?' <span style="background:#fff;color:#7c3f00;padding:1px 7px;border-radius:5px;font-size:11px;margin-left:4px">📖 chi tiết →</span>':''}</div>
        ${matHint.consum ? `<div class="mat-consum">🔥 Que/dây phù hợp: <b>${matHint.consum}</b></div>` : ''}
        ${matHint.warn ? `<div class="mat-warn">⚠ ${matHint.warn}</div>` : ''}
      </div>
    </div>`;
  let html = `<div class="sm-h">📋 Tóm tắt nhanh cho công nhân</div>` + matBanner + `<div class="sm-grid">` +
    tiles.map(t=>`<div class="sm-tile"><div class="sm-ic">${t.ic}</div><div class="sm-lb">${t.lb}</div><div class="sm-val">${t.val}</div></div>`).join('') +
    `</div>`;
  // Welding parameters (if extracted from PDF)
  if (x.params){
    const p = x.params;
    const polarityVi = ({DCEN:'DCEN (cực âm)', DCEP:'DCEP (cực dương)', AC:'AC (xoay chiều)'})[p.current] || p.current || '';
    const paramTiles = [
      p.amps      && {ic:'⚡', lb:'Ampe (A)', val:esc(p.amps), hi:1},
      p.volts     && {ic:'🔌', lb:'Vôn (V)', val:esc(p.volts), hi:1},
      p.travel    && {ic:'🏃', lb:'Tốc độ (mm/min)', val:esc(p.travel)},
      p.heat_input&& {ic:'🔥', lb:'Nhiệt MAX (kJ/mm)', val:esc(p.heat_input)},
      p.preheat   && {ic:'🌡️', lb:'Tiền nhiệt MIN', val:esc(p.preheat)},
      p.interpass && {ic:'♨️', lb:'Interpass MAX', val:esc(p.interpass)},
      p.gas       && {ic:'💨', lb:'Khí bảo vệ', val:esc(p.gas)},
      p.gas_flow  && {ic:'⏱️', lb:'Lưu lượng (LPM)', val:esc(p.gas_flow)},
      polarityVi  && {ic:'⚙️', lb:'Loại dòng', val:esc(polarityVi)},
      p.transfer  && {ic:'💎', lb:'Truyền kim loại', val:esc(p.transfer)}
    ].filter(Boolean);
    if (paramTiles.length){
      html += `<div class="sm-h" style="margin-top:14px;color:#7c2024">🔧 Thông số máy hàn</div><div class="sm-grid">` +
        paramTiles.map(t=>`<div class="sm-tile${t.hi?' hi':''}"><div class="sm-ic">${t.ic}</div><div class="sm-lb">${t.lb}</div><div class="sm-val">${t.val}</div></div>`).join('') +
        `</div>`;
    }
  }
  w.innerHTML = html;
  w.style.display = 'block';
}

function openGlossary(){
  document.getElementById('govl').style.display = 'flex';
  document.getElementById('gSearch').value = '';
  renderGlossary('');
  setTimeout(()=>document.getElementById('gSearch').focus(), 50);
}
function closeGlossary(){ document.getElementById('govl').style.display = 'none'; }
function renderGlossary(q){
  const list = window.WPS_GLOSSARY || [];
  const ql = (q||'').toLowerCase().trim();
  const filtered = ql ? list.filter(it => it.term.toLowerCase().includes(ql) || it.vi.toLowerCase().includes(ql) || (it.note||'').toLowerCase().includes(ql)) : list;
  const body = document.getElementById('gBody');
  if (!filtered.length){ body.innerHTML = '<div style="text-align:center;padding:30px;color:var(--muted)">🔍 Không tìm thấy thuật ngữ phù hợp.</div>'; return; }
  body.innerHTML = filtered.map(it => `<div style="background:#fff;border:1px solid var(--line);border-radius:8px;padding:10px 14px;margin-bottom:8px">
    <div style="font-weight:800;color:var(--brand);font-size:14px">${esc(it.term)}</div>
    <div style="font-size:13px;color:#1b2430;margin-top:4px">${esc(it.vi)}</div>
    ${it.note ? `<div style="font-size:12px;color:var(--muted);margin-top:4px;font-style:italic">${esc(it.note)}</div>` : ''}
  </div>`).join('');
}
function esc(s){ return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
